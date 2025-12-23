import { useState, useEffect } from 'react';
import { Search, Briefcase, Filter, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { JKKNNavbar } from '@/components/JKKN/JKKNNavbar';
import { JobCard } from '@/components/JKKN/JobCard';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface JKKNJob {
  id: string;
  company_name: string;
  company_logo_url?: string;
  title: string;
  description?: string;
  type: string;
  work_mode?: string;
  location?: string;
  stipend_min?: number;
  stipend_max?: number;
  salary_min?: number;
  salary_max?: number;
  duration?: string;
  skills_required: string[];
  eligibility?: string;
  application_deadline?: string;
  apply_link?: string;
  is_featured?: boolean;
  created_at: string;
}

export default function JKKNJobs() {
  const [jobs, setJobs] = useState<JKKNJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [workModeFilter, setWorkModeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jkkn_jobs')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setJobs((data || []).map(j => ({
        ...j,
        skills_required: (j.skills_required as string[]) || []
      })));
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const locations = [...new Set(jobs.map(j => j.location).filter(Boolean))];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.skills_required || []).some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    const matchesWorkMode = workModeFilter === 'all' || job.work_mode === workModeFilter;
    const matchesLocation = locationFilter === 'all' || job.location === locationFilter;
    
    return matchesSearch && matchesType && matchesWorkMode && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-fresh-green-bg via-white to-fresh-gold-light">
      <JKKNNavbar />
      
      {/* Header */}
      <div className="fresh-page-header mx-4 mt-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <Briefcase className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Jobs & Internships
            </h1>
            <p className="text-fresh-gold-medium font-tamil mt-1">
              வேலைவாய்ப்புகள் & பயிற்சிகள்
            </p>
          </div>
        </div>
        <p className="text-white/80 mt-4 max-w-2xl">
          Explore opportunities from top companies. Apply directly - no login required!
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Type Tabs */}
        <Tabs value={typeFilter} onValueChange={setTypeFilter} className="mb-6">
          <TabsList className="bg-white shadow-lg p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-fresh-green-medium data-[state=active]:text-white">
              All
            </TabsTrigger>
            <TabsTrigger value="Full-time" className="data-[state=active]:bg-fresh-green-medium data-[state=active]:text-white">
              Full-time
            </TabsTrigger>
            <TabsTrigger value="Internship" className="data-[state=active]:bg-fresh-green-medium data-[state=active]:text-white">
              Internship
            </TabsTrigger>
            <TabsTrigger value="Part-time" className="data-[state=active]:bg-fresh-green-medium data-[state=active]:text-white">
              Part-time
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by title, company, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 fresh-input"
                />
              </div>
            </div>
            <Select value={workModeFilter} onValueChange={setWorkModeFilter}>
              <SelectTrigger className="fresh-input">
                <SelectValue placeholder="Work Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                <SelectItem value="On-site">On-site</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="fresh-input">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location!}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredJobs.length}</span> opportunities
          </p>
        </div>

        {/* Jobs Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Skeleton className="w-14 h-14 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No jobs found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
