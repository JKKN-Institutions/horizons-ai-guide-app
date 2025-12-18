import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, SlidersHorizontal, Sparkles, ClipboardList, Scale, X, FileDown } from 'lucide-react';
import { ScholarshipFilters } from './ScholarshipFilters';
import { ScholarshipDetailModal } from './ScholarshipDetailModal';
import { CategoryButtons } from './CategoryButtons';
import { CategoryScholarshipList } from './CategoryScholarshipList';
import { EligibilityChecker } from './EligibilityChecker';
import { ApplicationTracker, TrackerContext } from './ApplicationTracker';
import { ScholarshipComparison } from './ScholarshipComparison';
import { scholarships, getJKKNScholarships, getGovernmentScholarships, getCorporateScholarships, getNGOScholarships } from './scholarshipData';
import { Scholarship, ScholarshipFilters as FiltersType } from './types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { generateScholarshipPDF } from './generateScholarshipPDF';
import { toast as sonnerToast } from 'sonner';

const defaultFilters: FiltersType = {
  types: [],
  educationLevels: [],
  categories: [],
  incomeRange: '',
  gender: 'all',
  state: 'all',
  searchQuery: ''
};

type CategoryType = 'jkkn' | 'government' | 'corporate' | 'ngo';

export const ScholarshipFinder = () => {
  const [filters, setFilters] = useState<FiltersType>(defaultFilters);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('jkkn');
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');
  const [user, setUser] = useState<any>(null);
  const [trackedIds, setTrackedIds] = useState<Set<string>>(new Set());
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      fetchTrackedScholarships(user.id);
    }
  };

  const fetchTrackedScholarships = async (userId: string) => {
    const { data } = await supabase
      .from('scholarship_applications')
      .select('scholarship_id')
      .eq('user_id', userId);
    if (data) {
      setTrackedIds(new Set(data.map(d => d.scholarship_id)));
    }
  };

  const saveScholarship = async (scholarship: Scholarship) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to track scholarships",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('scholarship_applications')
        .insert({
          user_id: user.id,
          scholarship_id: scholarship.id,
          scholarship_name: scholarship.name,
          scholarship_provider: scholarship.provider,
          scholarship_amount: scholarship.amount,
          scholarship_deadline: scholarship.deadline,
          status: 'saved'
        });

      if (error) {
        if (error.code === '23505') {
          toast({ title: "Already Tracked", description: "This scholarship is already in your tracker" });
          return;
        }
        throw error;
      }

      setTrackedIds(prev => new Set([...prev, scholarship.id]));
      toast({ title: "Saved!", description: "Added to your application tracker" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save scholarship", variant: "destructive" });
    }
  };

  const isScholarshipTracked = (scholarshipId: string) => trackedIds.has(scholarshipId);

  const handleCompareToggle = (scholarshipId: string) => {
    setCompareIds(prev => {
      const next = new Set(prev);
      if (next.has(scholarshipId)) {
        next.delete(scholarshipId);
      } else if (next.size < 4) {
        next.add(scholarshipId);
      } else {
        toast({ title: "Limit Reached", description: "You can compare up to 4 scholarships at a time" });
      }
      return next;
    });
  };

  const compareScholarships = useMemo(() => 
    scholarships.filter(s => compareIds.has(s.id)), 
    [compareIds]
  );

  const categoryCounts = useMemo(() => ({
    jkkn: getJKKNScholarships().length,
    government: getGovernmentScholarships().length,
    corporate: getCorporateScholarships().length,
    ngo: getNGOScholarships().length
  }), []);

  const stats = useMemo(() => ({
    total: scholarships.length,
    government: getGovernmentScholarships().length,
    corporate: getCorporateScholarships().length,
    jkkn: getJKKNScholarships().length
  }), []);

  const filteredScholarships = useMemo(() => {
    let result = scholarships.filter(s => s.type === activeCategory);

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.provider.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
      );
    }

    // Education level filter
    if (filters.educationLevels.length > 0) {
      result = result.filter(s => 
        s.educationLevel.some(level => filters.educationLevels.includes(level))
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(s => 
        s.category.some(cat => filters.categories.includes(cat))
      );
    }

    // Gender filter
    if (filters.gender !== 'all') {
      result = result.filter(s => s.gender === 'all' || s.gender === filters.gender);
    }

    // State filter
    if (filters.state && filters.state !== 'all') {
      result = result.filter(s => s.state === filters.state);
    }

    // Sort
    if (sortBy === 'deadline') {
      const order = { 'closing-soon': 1, 'one-month': 2, 'open': 3, 'always-open': 4, 'coming-soon': 5 };
      result.sort((a, b) => order[a.deadlineStatus] - order[b.deadlineStatus]);
    } else if (sortBy === 'amount') {
      result.sort((a, b) => {
        const getAmount = (s: Scholarship) => {
          const match = s.amount.match(/[\d,]+/);
          return match ? parseInt(match[0].replace(/,/g, '')) : 0;
        };
        return getAmount(b) - getAmount(a);
      });
    }

    return result;
  }, [filters, sortBy, activeCategory]);

  const handleViewDetails = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setIsDetailOpen(true);
  };

  return (
    <TrackerContext.Provider value={{ saveScholarship, isScholarshipTracked }}>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2 className="font-playfair text-3xl font-bold text-[#1B5E20]">
            🎓 Scholarship Finder
          </h2>
          <p className="text-lg text-[#B8860B] font-tamil">
            உதவித்தொகை கண்டுபிடிப்பான்
          </p>
          <p className="text-[#4B5563] max-w-2xl mx-auto mb-4">
            Discover scholarships you're eligible for - Government schemes, corporate programs, and exclusive JKKN scholarships
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button 
              onClick={() => setIsEligibilityOpen(true)}
              className="btn-fresh-primary shadow-lg"
              size="lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Check My Eligibility (AI-Powered)
            </Button>
            <Button 
              onClick={() => setActiveTab('tracker')}
              className="btn-fresh-secondary"
              size="lg"
            >
              <ClipboardList className="w-5 h-5 mr-2" />
              My Applications ({trackedIds.size})
            </Button>
            {compareIds.size > 0 && (
              <Button 
                onClick={() => setIsCompareOpen(true)}
                size="lg"
                className="btn-fresh-primary"
              >
                <Scale className="w-5 h-5 mr-2" />
                Compare ({compareIds.size})
              </Button>
            )}
            <Button 
              onClick={() => {
                if (filteredScholarships.length === 0) {
                  sonnerToast.error('No scholarships to download');
                  return;
                }
                generateScholarshipPDF(filteredScholarships);
                sonnerToast.success(`Downloaded ${filteredScholarships.length} scholarships as PDF!`);
              }}
              size="lg"
              variant="outline"
              className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9]"
            >
              <FileDown className="w-5 h-5 mr-2" />
              Download PDF ({filteredScholarships.length})
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-6">
            <div className="fresh-stat-card">
              <div className="text-2xl font-bold text-[#F59E0B]">{stats.total}+</div>
              <div className="text-sm text-[#6B7280]">Total Scholarships</div>
            </div>
            <div className="fresh-stat-card">
              <div className="text-2xl font-bold text-[#1976D2]">{stats.government}+</div>
              <div className="text-sm text-[#6B7280]">Government Schemes</div>
            </div>
            <div className="fresh-stat-card">
              <div className="text-2xl font-bold text-[#7B1FA2]">{stats.corporate}+</div>
              <div className="text-sm text-[#6B7280]">Corporate Programs</div>
            </div>
            <div className="fresh-stat-card">
              <div className="text-2xl font-bold text-[#2E7D32]">{stats.jkkn}+</div>
              <div className="text-sm text-[#6B7280]">JKKN Exclusive</div>
            </div>
          </div>
        </div>

        {/* Tabs for Browse/Track */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="fresh-tabs-container grid w-full max-w-md mx-auto grid-cols-2 bg-white/95 p-1 rounded-2xl shadow-md border border-[#C8E6C9]">
            <TabsTrigger value="browse" className="fresh-tab-btn flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#2E7D32] data-[state=active]:to-[#1B5E20] data-[state=active]:text-white text-[#4B5563]">
              <Search className="w-4 h-4" />
              Browse Scholarships
            </TabsTrigger>
            <TabsTrigger value="tracker" className="fresh-tab-btn flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#2E7D32] data-[state=active]:to-[#1B5E20] data-[state=active]:text-white text-[#4B5563]">
              <ClipboardList className="w-4 h-4" />
              My Tracker ({trackedIds.size})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="mt-6">
            {/* Category Buttons */}
            <CategoryButtons 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              counts={categoryCounts}
            />

            {/* Search and Sort Bar */}
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search scholarships..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="amount">Amount (High to Low)</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filter Scholarships</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4">
                      <ScholarshipFilters 
                        filters={filters} 
                        onFilterChange={setFilters}
                        onClear={() => setFilters(defaultFilters)}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex gap-6 mt-6">
              {/* Filters Sidebar - Desktop */}
              <div className="hidden lg:block w-72 flex-shrink-0">
                <div className="sticky top-4">
                  <ScholarshipFilters 
                    filters={filters} 
                    onFilterChange={setFilters}
                    onClear={() => setFilters(defaultFilters)}
                  />
                </div>
              </div>

              {/* Scholarships List */}
              <div className="flex-1">
                {filteredScholarships.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl border border-[#C8E6C9] shadow-md">
                    <p className="text-lg text-[#4B5563]">No scholarships found matching your criteria</p>
                    <Button 
                      className="mt-4 btn-fresh-secondary"
                      onClick={() => setFilters(defaultFilters)}
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <CategoryScholarshipList
                    scholarships={filteredScholarships}
                    category={activeCategory}
                    onViewDetails={handleViewDetails}
                    selectedForCompare={compareIds}
                    onCompareToggle={handleCompareToggle}
                  />
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tracker" className="mt-6">
            <ApplicationTracker scholarships={scholarships} />
          </TabsContent>
        </Tabs>

        {/* Detail Modal */}
        <ScholarshipDetailModal
          scholarship={selectedScholarship}
          open={isDetailOpen}
          onOpenChange={setIsDetailOpen}
        />

        {/* Eligibility Checker Modal */}
        <EligibilityChecker
          open={isEligibilityOpen}
          onOpenChange={setIsEligibilityOpen}
          scholarships={scholarships}
        />

        {/* Comparison Modal */}
        <ScholarshipComparison
          scholarships={compareScholarships}
          open={isCompareOpen}
          onOpenChange={setIsCompareOpen}
          onRemove={(id) => setCompareIds(prev => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          })}
        />
      </div>
    </TrackerContext.Provider>
  );
};
