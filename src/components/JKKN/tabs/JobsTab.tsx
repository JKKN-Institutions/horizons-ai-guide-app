import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, IndianRupee, Clock, Briefcase, ExternalLink, Flame, Bookmark, BookmarkCheck, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useJKKNBookmarks } from '@/hooks/useJKKNBookmarks';
import { toast } from 'sonner';

interface Job {
  id: string;
  company_name: string;
  company_logo_url: string | null;
  title: string;
  description: string | null;
  type: string;
  work_mode: string | null;
  location: string | null;
  salary_min: number | null;
  salary_max: number | null;
  stipend_min: number | null;
  stipend_max: number | null;
  skills_required: string[];
  eligibility: string | null;
  application_deadline: string | null;
  apply_link: string | null;
  is_featured: boolean | null;
  created_at: string;
}

const tamilNaduCities = [
  'All Locations',
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Tiruchirappalli',
  'Salem',
  'Tirunelveli',
  'Erode',
  'Vellore',
  'Thoothukudi',
  'Thanjavur',
  'Dindigul',
  'Hosur',
];

const experienceLevels = [
  { value: 'all', label: 'All Experience' },
  { value: 'fresher', label: 'Fresher (0-1 yr)' },
  { value: 'junior', label: 'Junior (1-3 yrs)' },
  { value: 'mid', label: 'Mid-level (3-5 yrs)' },
  { value: 'senior', label: 'Senior (5+ yrs)' },
];

const jobFilters = ['All', 'Internship', 'Full-time', 'WFH'];

const sampleJobs: Job[] = [
  {
    id: '1',
    company_name: 'TCS',
    company_logo_url: null,
    title: 'Software Developer Trainee',
    description: 'Join TCS as a fresher and work on cutting-edge technologies',
    type: 'full-time',
    work_mode: 'Hybrid',
    location: 'Chennai, Tamil Nadu',
    salary_min: 350000,
    salary_max: 450000,
    stipend_min: null,
    stipend_max: null,
    skills_required: ['Java', 'Python', 'SQL', 'Problem Solving'],
    eligibility: 'B.E/B.Tech with 60% and above',
    application_deadline: '2025-01-15',
    apply_link: '#',
    is_featured: true,
    created_at: new Date().toISOString(),
  },
];

export function JobsTab() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const { isJobBookmarked, toggleJobBookmark } = useJKKNBookmarks();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jkkn_jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedJobs = (data || []).map((job) => ({
        ...job,
        skills_required: Array.isArray(job.skills_required) ? (job.skills_required as any[]).map(s => String(s)) : [],
      }));

      setJobs(formattedJobs.length > 0 ? (formattedJobs as Job[]) : sampleJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs(sampleJobs);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'Internship' && job.type.toLowerCase() === 'internship') ||
      (activeFilter === 'Full-time' && job.type.toLowerCase() === 'full-time') ||
      (activeFilter === 'WFH' && job.work_mode?.toLowerCase().includes('remote'));

    const matchesLocation =
      locationFilter === 'All Locations' ||
      job.location?.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesExperience = experienceFilter === 'all' || (() => {
      const eligibility = job.eligibility?.toLowerCase() || '';
      switch (experienceFilter) {
        case 'fresher':
          return eligibility.includes('fresher') || eligibility.includes('0-1') || eligibility.includes('final year');
        case 'junior':
          return eligibility.includes('1-3') || eligibility.includes('1-2');
        case 'mid':
          return eligibility.includes('3-5') || eligibility.includes('3+');
        case 'senior':
          return eligibility.includes('5+') || eligibility.includes('senior');
        default:
          return true;
      }
    })();

    return matchesSearch && matchesFilter && matchesLocation && matchesExperience;
  });

  const formatSalary = (min?: number | null, max?: number | null, isStipend = false) => {
    if (!min && !max) return null;
    const label = isStipend ? '/month' : '/year';
    if (min && max) return `₹${(min / 1000).toFixed(0)}K - ₹${(max / 1000).toFixed(0)}K${label}`;
    if (min) return `₹${(min / 1000).toFixed(0)}K+${label}`;
    if (max) return `Up to ₹${(max / 1000).toFixed(0)}K${label}`;
    return null;
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (locationFilter !== 'All Locations') count++;
    if (experienceFilter !== 'all') count++;
    return count;
  };

  const clearFilters = () => {
    setLocationFilter('All Locations');
    setExperienceFilter('all');
  };

  const handleBookmark = (jobId: string, jobTitle: string) => {
    toggleJobBookmark(jobId);
    if (isJobBookmarked(jobId)) {
      toast.success('Job removed from bookmarks');
    } else {
      toast.success(`"${jobTitle}" saved to bookmarks`);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex gap-3">
              <Skeleton className="w-14 h-14 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
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
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-3 rounded-xl border-gray-200 bg-white"
          />
        </div>
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl relative">
              <Filter className="w-5 h-5" />
              {getActiveFiltersCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2E7D32] text-white text-xs rounded-full flex items-center justify-center">
                  {getActiveFiltersCount()}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                <span>Filter Jobs</span>
                {getActiveFiltersCount() > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-500">
                    <X className="w-4 h-4 mr-1" /> Clear All
                  </Button>
                )}
              </SheetTitle>
            </SheetHeader>
            <div className="py-6 space-y-6">
              {/* Location Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Location (Tamil Nadu)</label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {tamilNaduCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {city}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Experience Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Experience Level</label>
                <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]" 
                onClick={() => setIsFilterOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters Display */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap gap-2">
          {locationFilter !== 'All Locations' && (
            <Badge variant="secondary" className="bg-[#E8F5E9] text-[#2E7D32] gap-1">
              <MapPin className="w-3 h-3" />
              {locationFilter}
              <button onClick={() => setLocationFilter('All Locations')} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {experienceFilter !== 'all' && (
            <Badge variant="secondary" className="bg-[#E8F5E9] text-[#2E7D32] gap-1">
              {experienceLevels.find(l => l.value === experienceFilter)?.label}
              <button onClick={() => setExperienceFilter('all')} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {jobFilters.map((filter) => (
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

      {/* Count */}
      <p className="text-sm text-gray-500">{filteredJobs.length}+ Jobs Available</p>

      {/* Job Cards */}
      <div className="space-y-3">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex gap-3">
              {/* Company Logo */}
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                {job.company_logo_url ? (
                  <img src={job.company_logo_url} alt={job.company_name} className="w-full h-full object-contain" />
                ) : (
                  <Briefcase className="w-6 h-6 text-gray-400" />
                )}
              </div>

              {/* Job Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 truncate">{job.title}</h3>
                      {job.is_featured && (
                        <Badge className="bg-orange-100 text-orange-600 text-xs">
                          <Flame className="w-3 h-3 mr-1" />
                          Hot
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-[#2E7D32] font-medium">{job.company_name}</p>
                  </div>
                  {/* Bookmark Button */}
                  <button
                    onClick={() => handleBookmark(job.id, job.title)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    {isJobBookmarked(job.id) ? (
                      <BookmarkCheck className="w-5 h-5 text-[#2E7D32]" />
                    ) : (
                      <Bookmark className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
                  {job.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                  )}
                  {(formatSalary(job.salary_min, job.salary_max) || formatSalary(job.stipend_min, job.stipend_max, true)) && (
                    <span className="flex items-center gap-1">
                      <IndianRupee className="w-3 h-3" />
                      {formatSalary(job.salary_min, job.salary_max) || formatSalary(job.stipend_min, job.stipend_max, true)}
                    </span>
                  )}
                </div>

                {job.eligibility && (
                  <p className="text-xs text-gray-500 mt-1 truncate">{job.eligibility}</p>
                )}

                {job.application_deadline && (
                  <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                    <Clock className="w-3 h-3" />
                    Deadline: {new Date(job.application_deadline).toLocaleDateString()}
                  </div>
                )}

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {job.skills_required.slice(0, 3).map((skill, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* View Details Button */}
                <Link to={`/jkkn/job/${job.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 text-[#2E7D32] border-[#2E7D32] hover:bg-[#E8F5E9]"
                  >
                    View Details
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No jobs found</p>
        </div>
      )}
    </div>
  );
}
