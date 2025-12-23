import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, IndianRupee, Clock, Briefcase, ExternalLink, Flame, Bookmark, BookmarkCheck, X, Building2, TrendingUp, Users } from 'lucide-react';
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

const jobFilters = [
  { name: 'All', icon: Briefcase, gradient: 'from-[#2E7D32] to-[#4CAF50]' },
  { name: 'Internship', icon: TrendingUp, gradient: 'from-blue-500 to-indigo-600' },
  { name: 'Full-time', icon: Building2, gradient: 'from-purple-500 to-pink-600' },
  { name: 'WFH', icon: Users, gradient: 'from-orange-500 to-red-600' },
];

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
      <div className="p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-24 h-10 rounded-full flex-shrink-0" />
          ))}
        </div>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-40 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-5 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Colorful Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-5 text-white shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-6 h-6" />
            <span className="text-sm font-medium text-white/80">Career Opportunities</span>
          </div>
          <h2 className="text-2xl font-bold">Jobs & Internships</h2>
          <p className="text-sm text-white/80 mt-1">Find your dream career opportunity</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 text-white text-center shadow-md">
          <p className="text-2xl font-bold">{jobs.length}+</p>
          <p className="text-xs text-blue-100">Total Jobs</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 text-white text-center shadow-md">
          <p className="text-2xl font-bold">{jobs.filter(j => j.type === 'internship').length}</p>
          <p className="text-xs text-purple-100">Internships</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-3 text-white text-center shadow-md">
          <p className="text-2xl font-bold">{jobs.filter(j => j.is_featured).length}</p>
          <p className="text-xs text-emerald-100">Featured</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-3 rounded-xl border-gray-200 bg-white shadow-sm"
          />
        </div>
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl relative shadow-sm">
              <Filter className="w-5 h-5" />
              {getActiveFiltersCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full flex items-center justify-center">
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
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
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
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 gap-1">
              <MapPin className="w-3 h-3" />
              {locationFilter}
              <button onClick={() => setLocationFilter('All Locations')} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {experienceFilter !== 'all' && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 gap-1">
              {experienceLevels.find(l => l.value === experienceFilter)?.label}
              <button onClick={() => setExperienceFilter('all')} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Colorful Filter Chips */}
      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {jobFilters.map((filter) => {
          const IconComponent = filter.icon;
          const isActive = activeFilter === filter.name;
          return (
            <button
              key={filter.name}
              onClick={() => setActiveFilter(filter.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all shadow-sm ${
                isActive
                  ? `bg-gradient-to-r ${filter.gradient} text-white shadow-md scale-105`
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {filter.name}
            </button>
          );
        })}
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500 font-medium">{filteredJobs.length}+ Jobs Available</p>

      {/* Job Cards */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const isInternship = job.type.toLowerCase() === 'internship';
          const gradientClass = isInternship 
            ? 'from-blue-500 to-indigo-600' 
            : 'from-purple-500 to-pink-600';
          
          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              {/* Colorful Top Banner */}
              <div className={`h-2 bg-gradient-to-r ${gradientClass}`} />
              
              <div className="p-4">
                <div className="flex gap-3">
                  {/* Company Logo with Gradient Border */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradientClass} p-0.5 flex-shrink-0`}>
                    <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center overflow-hidden">
                      {job.company_logo_url ? (
                        <img src={job.company_logo_url} alt={job.company_name} className="w-full h-full object-contain" />
                      ) : (
                        <Briefcase className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Job Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900 truncate">{job.title}</h3>
                          {job.is_featured && (
                            <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs border-0">
                              <Flame className="w-3 h-3 mr-1" />
                              Hot
                            </Badge>
                          )}
                        </div>
                        <p className={`text-sm font-semibold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                          {job.company_name}
                        </p>
                      </div>
                      <button
                        onClick={() => handleBookmark(job.id, job.title)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        {isJobBookmarked(job.id) ? (
                          <BookmarkCheck className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Bookmark className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
                      {job.location && (
                        <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                      )}
                      {(formatSalary(job.salary_min, job.salary_max) || formatSalary(job.stipend_min, job.stipend_max, true)) && (
                        <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          <IndianRupee className="w-3 h-3" />
                          {formatSalary(job.salary_min, job.salary_max) || formatSalary(job.stipend_min, job.stipend_max, true)}
                        </span>
                      )}
                    </div>

                    {job.eligibility && (
                      <p className="text-xs text-gray-500 mt-2 truncate">{job.eligibility}</p>
                    )}

                    {job.application_deadline && (
                      <div className="flex items-center gap-1 text-xs text-orange-600 mt-1 font-medium">
                        <Clock className="w-3 h-3" />
                        Deadline: {new Date(job.application_deadline).toLocaleDateString()}
                      </div>
                    )}

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {job.skills_required.slice(0, 3).map((skill, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5"
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
                        className={`mt-3 border-2 hover:text-white ${
                          isInternship 
                            ? 'border-blue-500 text-blue-600 hover:bg-blue-500' 
                            : 'border-purple-500 text-purple-600 hover:bg-purple-500'
                        }`}
                      >
                        View Details
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <Briefcase className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">No jobs found</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
