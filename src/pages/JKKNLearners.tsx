import { useState, useEffect } from 'react';
import { Search, Filter, Users, GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { JKKNNavbar } from '@/components/JKKN/JKKNNavbar';
import { LearnerCard } from '@/components/JKKN/LearnerCard';
import { supabase } from '@/integrations/supabase/client';
import { jkknColleges } from '@/constants/jkkn-colleges';
import { Skeleton } from '@/components/ui/skeleton';

interface Learner {
  id: string;
  learner_number: number;
  name: string;
  email: string;
  phone: string;
  photo_url?: string;
  college: string;
  course: string;
  branch: string;
  year_of_study: string;
  graduation_year: number;
  skills: string[];
  career_interest?: string;
  linkedin_url?: string;
  github_url?: string;
  registered_at: string;
}

export default function JKKNLearners() {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [newLearnerId, setNewLearnerId] = useState<string | null>(null);

  useEffect(() => {
    fetchLearners();
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel('learners-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'learners'
        },
        (payload) => {
          const newLearner = payload.new as Learner;
          setNewLearnerId(newLearner.id);
          setLearners(prev => [newLearner, ...prev]);
          
          // Remove highlight after 5 seconds
          setTimeout(() => setNewLearnerId(null), 5000);
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
      
      setLearners((data || []).map(l => ({
        ...l,
        skills: (l.skills as string[]) || []
      })));
    } catch (error) {
      console.error('Error fetching learners:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLearners = learners.filter(learner => {
    const matchesSearch = 
      learner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      learner.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (learner.skills || []).some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCollege = collegeFilter === 'all' || learner.college === collegeFilter;
    const matchesCourse = courseFilter === 'all' || learner.course === courseFilter;
    
    return matchesSearch && matchesCollege && matchesCourse;
  });

  const selectedCollegeData = jkknColleges.find(c => c.name === collegeFilter);
  const availableCourses = collegeFilter === 'all' 
    ? [...new Set(jkknColleges.flatMap(c => c.courses))]
    : selectedCollegeData?.courses || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-fresh-green-bg via-white to-fresh-gold-light">
      <JKKNNavbar />
      
      {/* Header */}
      <div className="fresh-page-header mx-4 mt-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <Users className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              JKKN Learners Directory
            </h1>
            <p className="text-fresh-gold-medium font-tamil mt-1">
              ஜேகேகேஎன் மாணவர் அடைவு
            </p>
          </div>
        </div>
        <p className="text-white/80 mt-4 max-w-2xl">
          Discover talented students from all JKKN colleges. Newest registrations appear first!
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, branch, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 fresh-input"
                />
              </div>
            </div>
            <Select value={collegeFilter} onValueChange={(v) => { setCollegeFilter(v); setCourseFilter('all'); }}>
              <SelectTrigger className="fresh-input">
                <SelectValue placeholder="All Colleges" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colleges</SelectItem>
                {jkknColleges.map((college) => (
                  <SelectItem key={college.name} value={college.name}>
                    {college.short_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="fresh-input">
                <SelectValue placeholder="All Courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {availableCourses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredLearners.length}</span> learners
          </p>
          <div className="flex items-center gap-2 text-sm text-fresh-green-medium">
            <GraduationCap className="w-4 h-4" />
            Sorted by newest first
          </div>
        </div>

        {/* Learners Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Skeleton className="w-16 h-16 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredLearners.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No learners found
            </h3>
            <p className="text-muted-foreground">
              {searchQuery || collegeFilter !== 'all' || courseFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Be the first to register!'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLearners.map((learner) => (
              <LearnerCard 
                key={learner.id} 
                learner={learner}
                isNew={learner.id === newLearnerId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
