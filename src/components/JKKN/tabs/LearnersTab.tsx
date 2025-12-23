import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Trophy, Clock, Linkedin, Github, ChevronDown, Users, X, SlidersHorizontal } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Json } from '@/integrations/supabase/types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Learner {
  id: string;
  learner_number: number;
  name: string;
  email: string;
  phone: string;
  photo_url: string | null;
  college: string;
  course: string;
  branch: string;
  year_of_study: string;
  graduation_year: number;
  skills: string[];
  career_interest: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  registered_at: string;
}

const branchFilters = ['All', 'CSE', 'IT', 'ECE', 'MCA', 'EEE', 'Mech'];

export function LearnersTab() {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [displayCount, setDisplayCount] = useState(10);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  
  // Advanced filters
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  useEffect(() => {
    fetchLearners();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('learners-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'learners' },
        (payload) => {
          const newLearner = payload.new as Learner;
          newLearner.skills = Array.isArray(newLearner.skills) ? newLearner.skills : [];
          setLearners((prev) => [newLearner, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLearners = async () => {
    try {
      const { data, error } = await supabase
        .from('learners')
        .select('*')
        .order('registered_at', { ascending: false });

      if (error) throw error;

      const formattedLearners = (data || []).map((learner) => ({
        ...learner,
        skills: Array.isArray(learner.skills) ? (learner.skills as Json[]).map(s => String(s)) : [],
      }));

      setLearners(formattedLearners as Learner[]);
    } catch (error) {
      console.error('Error fetching learners:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Extract unique values for filters
  const uniqueColleges = useMemo(() => {
    return [...new Set(learners.map(l => l.college))].filter(Boolean).sort();
  }, [learners]);

  const uniqueSkills = useMemo(() => {
    const allSkills = learners.flatMap(l => l.skills);
    return [...new Set(allSkills)].filter(Boolean).sort();
  }, [learners]);

  const uniqueYears = useMemo(() => {
    return [...new Set(learners.map(l => l.year_of_study))].filter(Boolean).sort();
  }, [learners]);

  const activeFiltersCount = selectedColleges.length + selectedSkills.length + selectedYears.length;

  const filteredLearners = learners.filter((learner) => {
    // Text search - matches name, skills, or college
    const matchesSearch =
      searchQuery === '' ||
      learner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      learner.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      learner.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      learner.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Branch filter
    const matchesBranch =
      activeFilter === 'All' ||
      learner.branch.toUpperCase().includes(activeFilter);

    // College filter
    const matchesCollege =
      selectedColleges.length === 0 ||
      selectedColleges.includes(learner.college);

    // Skills filter
    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some(skill => learner.skills.includes(skill));

    // Year filter
    const matchesYear =
      selectedYears.length === 0 ||
      selectedYears.includes(learner.year_of_study);

    return matchesSearch && matchesBranch && matchesCollege && matchesSkills && matchesYear;
  });

  const displayedLearners = filteredLearners.slice(0, displayCount);

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const registered = new Date(dateString);
    const diffMs = now.getTime() - registered.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just Now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  const clearAllFilters = () => {
    setSelectedColleges([]);
    setSelectedSkills([]);
    setSelectedYears([]);
    setActiveFilter('All');
    setSearchQuery('');
  };

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex gap-3">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar with Filter Button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by name, skills, college..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-3 rounded-xl border-gray-200 bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
        
        {/* Filter Button */}
        <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-xl border-gray-200 relative"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2E7D32] text-white text-xs rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl h-[80vh]">
            <SheetHeader className="pb-4">
              <div className="flex items-center justify-between">
                <SheetTitle>Filter Learners</SheetTitle>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-[#2E7D32]">
                    Clear All
                  </Button>
                )}
              </div>
            </SheetHeader>
            
            <ScrollArea className="h-[calc(100%-120px)] pr-4">
              {/* College Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">College</h4>
                <div className="space-y-2">
                  {uniqueColleges.map((college) => (
                    <div key={college} className="flex items-center space-x-3">
                      <Checkbox
                        id={`college-${college}`}
                        checked={selectedColleges.includes(college)}
                        onCheckedChange={() => toggleFilter(college, selectedColleges, setSelectedColleges)}
                      />
                      <Label 
                        htmlFor={`college-${college}`} 
                        className="text-sm text-gray-700 cursor-pointer flex-1"
                      >
                        {college}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {uniqueSkills.slice(0, 20).map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleFilter(skill, selectedSkills, setSelectedSkills)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedSkills.includes(skill)
                          ? 'bg-[#2E7D32] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year of Study Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Year of Study</h4>
                <div className="flex flex-wrap gap-2">
                  {uniqueYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => toggleFilter(year, selectedYears, setSelectedYears)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedYears.includes(year)
                          ? 'bg-[#2E7D32] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollArea>

            <SheetFooter className="pt-4 border-t">
              <Button 
                onClick={() => setFilterSheetOpen(false)} 
                className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
              >
                Show {filteredLearners.length} Results
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Branch Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {branchFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === filter
                ? 'bg-[#2E7D32] text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedColleges.map(college => (
            <Badge 
              key={college} 
              variant="secondary" 
              className="bg-[#E8F5E9] text-[#2E7D32] gap-1 pr-1"
            >
              {college.length > 20 ? college.slice(0, 20) + '...' : college}
              <button 
                onClick={() => setSelectedColleges(prev => prev.filter(c => c !== college))}
                className="ml-1 p-0.5 hover:bg-[#2E7D32]/10 rounded-full"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {selectedSkills.map(skill => (
            <Badge 
              key={skill} 
              variant="secondary" 
              className="bg-blue-50 text-blue-700 gap-1 pr-1"
            >
              {skill}
              <button 
                onClick={() => setSelectedSkills(prev => prev.filter(s => s !== skill))}
                className="ml-1 p-0.5 hover:bg-blue-100 rounded-full"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {selectedYears.map(year => (
            <Badge 
              key={year} 
              variant="secondary" 
              className="bg-purple-50 text-purple-700 gap-1 pr-1"
            >
              {year}
              <button 
                onClick={() => setSelectedYears(prev => prev.filter(y => y !== year))}
                className="ml-1 p-0.5 hover:bg-purple-100 rounded-full"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Count */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{filteredLearners.length} Learners Found</span>
        {activeFiltersCount > 0 && (
          <button onClick={clearAllFilters} className="text-[#2E7D32] font-medium">
            Clear Filters
          </button>
        )}
      </div>

      {/* Learner Cards */}
      <div className="space-y-3">
        {displayedLearners.map((learner, index) => (
          <Link
            key={learner.id}
            to={`/jkkn/learner/${learner.id}`}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow block"
          >
            <div className="flex gap-3">
              {/* Rank Badge */}
              <div className="flex flex-col items-center gap-1">
                <span className={`text-lg font-bold ${index < 3 ? 'text-2xl' : 'text-gray-400 text-sm'}`}>
                  {getRankBadge(index)}
                </span>
              </div>

              {/* Avatar */}
              <Avatar className="w-14 h-14 border-2 border-[#2E7D32]/20">
                <AvatarImage src={learner.photo_url || undefined} />
                <AvatarFallback className="bg-[#E8F5E9] text-[#2E7D32] font-semibold">
                  {learner.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 truncate">{learner.name}</h3>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {getTimeAgo(learner.registered_at)}
                  </span>
                </div>
                
                <p className="text-sm text-[#2E7D32] font-medium">
                  {learner.course} {learner.branch} | {learner.year_of_study}
                </p>
                
                <p className="text-xs text-gray-500 truncate">{learner.college}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {learner.skills.slice(0, 3).map((skill, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-[#E8F5E9] text-[#2E7D32] text-xs px-2 py-0.5"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {learner.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      +{learner.skills.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex gap-2 mt-2">
                  {learner.linkedin_url && (
                    <a
                      href={learner.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 bg-[#0077B5]/10 rounded-md hover:bg-[#0077B5]/20 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-[#0077B5]" />
                    </a>
                  )}
                  {learner.github_url && (
                    <a
                      href={learner.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <Github className="w-4 h-4 text-gray-700" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More */}
      {displayCount < filteredLearners.length && (
        <Button
          variant="outline"
          onClick={() => setDisplayCount((prev) => prev + 10)}
          className="w-full py-3 border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9]"
        >
          <ChevronDown className="w-4 h-4 mr-2" />
          Load More
        </Button>
      )}

      {filteredLearners.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="mb-2">No learners found</p>
          {activeFiltersCount > 0 && (
            <Button variant="link" onClick={clearAllFilters} className="text-[#2E7D32]">
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
