import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, IndianRupee, Clock, Briefcase, ExternalLink, Flame } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

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

const jobFilters = ['All', 'Internship', 'Full-time', 'WFH'];

export function JobsTab() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

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

      setJobs(formattedJobs as Job[]);
    } catch (error) {
      console.error('Error fetching jobs:', error);
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

    return matchesSearch && matchesFilter;
  });

  const formatSalary = (min?: number | null, max?: number | null, isStipend = false) => {
    if (!min && !max) return null;
    const label = isStipend ? '/month' : '/year';
    if (min && max) return `₹${(min / 1000).toFixed(0)}K - ₹${(max / 1000).toFixed(0)}K${label}`;
    if (min) return `₹${(min / 1000).toFixed(0)}K+${label}`;
    if (max) return `Up to ₹${(max / 1000).toFixed(0)}K${label}`;
    return null;
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
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl">
          <Filter className="w-5 h-5" />
        </Button>
      </div>

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
