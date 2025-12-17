import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Search, Filter, Star, Landmark, Building2, Heart, SlidersHorizontal } from 'lucide-react';
import { ScholarshipFilters } from './ScholarshipFilters';
import { ScholarshipCard } from './ScholarshipCard';
import { ScholarshipDetailModal } from './ScholarshipDetailModal';
import { scholarships, getJKKNScholarships, getGovernmentScholarships, getCorporateScholarships, getNGOScholarships } from './scholarshipData';
import { Scholarship, ScholarshipFilters as FiltersType } from './types';

const defaultFilters: FiltersType = {
  types: [],
  educationLevels: [],
  categories: [],
  incomeRange: '',
  gender: 'all',
  state: 'all',
  searchQuery: ''
};

export const ScholarshipFinder = () => {
  const [filters, setFilters] = useState<FiltersType>(defaultFilters);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const stats = useMemo(() => ({
    total: scholarships.length,
    government: getGovernmentScholarships().length,
    corporate: getCorporateScholarships().length,
    jkkn: getJKKNScholarships().length
  }), []);

  const filteredScholarships = useMemo(() => {
    let result = [...scholarships];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.provider.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (filters.types.length > 0) {
      result = result.filter(s => filters.types.includes(s.type));
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
  }, [filters, sortBy]);

  const jkknScholarships = filteredScholarships.filter(s => s.type === 'jkkn');
  const governmentScholarships = filteredScholarships.filter(s => s.type === 'government');
  const corporateScholarships = filteredScholarships.filter(s => s.type === 'corporate');
  const ngoScholarships = filteredScholarships.filter(s => s.type === 'ngo');

  const handleViewDetails = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setIsDetailOpen(true);
  };

  const renderScholarshipSection = (
    scholarships: Scholarship[],
    title: string,
    icon: React.ReactNode,
    bgColor: string
  ) => {
    if (scholarships.length === 0) return null;
    
    return (
      <div className="space-y-4">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${bgColor}`}>
          {icon}
          <h3 className="font-semibold text-foreground">{title}</h3>
          <span className="text-sm text-muted-foreground">({scholarships.length})</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scholarships.map(scholarship => (
            <ScholarshipCard 
              key={scholarship.id} 
              scholarship={scholarship} 
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h2 className="font-playfair text-3xl font-bold text-foreground">
          🎓 Scholarship Finder
        </h2>
        <p className="text-lg text-muted-foreground">
          உதவித்தொகை கண்டுபிடிப்பான்
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover scholarships you're eligible for - Government schemes, corporate programs, and exclusive JKKN scholarships
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.total}+</div>
            <div className="text-sm text-muted-foreground">Total Scholarships</div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.government}+</div>
            <div className="text-sm text-muted-foreground">Government Schemes</div>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.corporate}+</div>
            <div className="text-sm text-muted-foreground">Corporate Programs</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">{stats.jkkn}+</div>
            <div className="text-sm text-muted-foreground">JKKN Exclusive</div>
          </div>
        </div>
      </div>

      {/* Search and Sort Bar */}
      <div className="flex flex-col md:flex-row gap-4">
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
      <div className="flex gap-6">
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

        {/* Scholarships Grid */}
        <div className="flex-1 space-y-8">
          {filteredScholarships.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-xl">
              <p className="text-lg text-muted-foreground">No scholarships found matching your criteria</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setFilters(defaultFilters)}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {renderScholarshipSection(
                jkknScholarships,
                'JKKN EXCLUSIVE',
                <Star className="h-5 w-5 text-emerald-600" />,
                'bg-emerald-50'
              )}
              
              {renderScholarshipSection(
                governmentScholarships,
                'GOVERNMENT SCHOLARSHIPS',
                <Landmark className="h-5 w-5 text-blue-600" />,
                'bg-blue-50'
              )}
              
              {renderScholarshipSection(
                corporateScholarships,
                'CORPORATE SCHOLARSHIPS',
                <Building2 className="h-5 w-5 text-purple-600" />,
                'bg-purple-50'
              )}
              
              {renderScholarshipSection(
                ngoScholarships,
                'NGO/TRUST SCHOLARSHIPS',
                <Heart className="h-5 w-5 text-orange-600" />,
                'bg-orange-50'
              )}
            </>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <ScholarshipDetailModal
        scholarship={selectedScholarship}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
};
