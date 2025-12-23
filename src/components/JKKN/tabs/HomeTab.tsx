import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Briefcase, 
  BookOpen, 
  Trophy, 
  ChevronRight, 
  MapPin, 
  Clock, 
  Users,
  Star,
  Calendar,
  GraduationCap
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Json } from '@/integrations/supabase/types';

interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string | null;
  type: string;
  skills_required: string[];
  stipend_min: number | null;
  stipend_max: number | null;
  salary_min: number | null;
  salary_max: number | null;
  work_mode: string | null;
}

interface Course {
  id: string;
  title: string;
  category: string;
  level: string | null;
  duration_hours: number | null;
  rating: number | null;
  students_count: number | null;
  is_free: boolean | null;
}

interface Hackathon {
  id: string;
  title: string;
  type: string;
  organizer: string | null;
  registration_deadline: string | null;
  prize_pool: string | null;
  mode: string | null;
}

interface LearnerProfile {
  skills: string[];
  branch: string;
  college: string;
  name: string;
}

export function HomeTab() {
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile | null>(null);
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [upcomingHackathons, setUpcomingHackathons] = useState<Hackathon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Check if learner is registered (using localStorage for demo)
      const learnerEmail = localStorage.getItem('jkkn_learner_email');
      
      if (learnerEmail) {
        const { data: learnerData } = await supabase
          .from('learners')
          .select('name, skills, branch, college')
          .eq('email', learnerEmail)
          .maybeSingle();

        if (learnerData) {
          setLearnerProfile({
            name: learnerData.name,
            skills: Array.isArray(learnerData.skills) 
              ? (learnerData.skills as Json[]).map(s => String(s)) 
              : [],
            branch: learnerData.branch,
            college: learnerData.college,
          });
        }
      }

      // Fetch jobs
      const { data: jobs } = await supabase
        .from('jkkn_jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (jobs) {
        setRecommendedJobs(jobs.map(job => ({
          ...job,
          skills_required: Array.isArray(job.skills_required) 
            ? (job.skills_required as Json[]).map(s => String(s)) 
            : [],
        })));
      }

      // Fetch courses
      const { data: courses } = await supabase
        .from('courses')
        .select('*')
        .order('students_count', { ascending: false })
        .limit(4);

      if (courses) {
        setRecommendedCourses(courses);
      }

      // Fetch hackathons
      const { data: hackathons } = await supabase
        .from('competitions')
        .select('*')
        .order('registration_deadline', { ascending: true })
        .limit(3);

      if (hackathons) {
        setUpcomingHackathons(hackathons);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return 'Not disclosed';
    if (min && max) return `₹${(min/1000).toFixed(0)}k - ₹${(max/1000).toFixed(0)}k`;
    if (min) return `₹${(min/1000).toFixed(0)}k+`;
    return `Up to ₹${(max!/1000).toFixed(0)}k`;
  };

  const getDaysUntil = (dateString: string | null) => {
    if (!dateString) return null;
    const deadline = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Closed';
    if (diffDays === 0) return 'Today!';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-6">
        <Skeleton className="h-24 w-full rounded-xl" />
        <div className="space-y-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Card */}
      <Card className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white border-0 shadow-lg">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-1">
                {learnerProfile 
                  ? `Welcome back, ${learnerProfile.name.split(' ')[0]}!` 
                  : 'Find Your Perfect Opportunity'}
              </h2>
              <p className="text-white/80 text-sm">
                {learnerProfile
                  ? `Personalized picks based on your ${learnerProfile.branch} background`
                  : 'Register to get AI-powered recommendations'}
              </p>
              {learnerProfile && learnerProfile.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {learnerProfile.skills.slice(0, 4).map((skill, i) => (
                    <Badge key={i} className="bg-white/20 text-white text-xs border-0">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <Briefcase className="w-6 h-6 mx-auto mb-2 text-[#2E7D32]" />
            <p className="text-xl font-bold text-gray-900">{recommendedJobs.length}+</p>
            <p className="text-xs text-gray-500">Jobs</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-xl font-bold text-gray-900">{recommendedCourses.length}+</p>
            <p className="text-xs text-gray-500">Courses</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-amber-500" />
            <p className="text-xl font-bold text-gray-900">{upcomingHackathons.length}</p>
            <p className="text-xs text-gray-500">Hackathons</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Jobs */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#2E7D32]" />
            Recommended Jobs
          </h3>
          <Link to="/jkkn?tab=jobs" className="text-[#2E7D32] text-sm font-medium flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="space-y-3">
          {recommendedJobs.slice(0, 3).map((job) => (
            <Card key={job.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{job.title}</h4>
                    <p className="text-sm text-gray-500">{job.company_name}</p>
                  </div>
                  <Badge 
                    className={`text-xs ${
                      job.type === 'internship' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {job.type}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                  {job.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                  )}
                  {job.work_mode && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {job.work_mode}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {job.skills_required.slice(0, 2).map((skill, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-gray-100">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-[#2E7D32]">
                    {job.type === 'internship' 
                      ? formatSalary(job.stipend_min, job.stipend_max)
                      : formatSalary(job.salary_min, job.salary_max)
                    }
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trending Courses */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Trending Courses
          </h3>
          <Link to="/jkkn?tab=learn" className="text-[#2E7D32] text-sm font-medium flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          <div className="flex gap-3">
            {recommendedCourses.map((course) => (
              <Card key={course.id} className="border-0 shadow-sm min-w-[200px] flex-shrink-0">
                <CardContent className="p-4">
                  <Badge 
                    className={`text-xs mb-2 ${
                      course.is_free 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {course.is_free ? 'Free' : 'Premium'}
                  </Badge>
                  <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                    {course.title}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">{course.category}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {course.rating && (
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {course.rating}
                      </span>
                    )}
                    {course.students_count && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {course.students_count > 1000 
                          ? `${(course.students_count/1000).toFixed(1)}k` 
                          : course.students_count}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Hackathons */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Upcoming Hackathons
          </h3>
          <Link to="/jkkn?tab=hackathons" className="text-[#2E7D32] text-sm font-medium flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="space-y-3">
          {upcomingHackathons.map((hackathon) => {
            const daysLeft = getDaysUntil(hackathon.registration_deadline);
            const isUrgent = daysLeft && !daysLeft.includes('Closed') && 
              (daysLeft.includes('Today') || parseInt(daysLeft) <= 7);
            
            return (
              <Card key={hackathon.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{hackathon.title}</h4>
                      <p className="text-sm text-gray-500">{hackathon.organizer}</p>
                    </div>
                    {daysLeft && (
                      <Badge 
                        className={`text-xs ${
                          isUrgent 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        <Calendar className="w-3 h-3 mr-1" />
                        {daysLeft}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {hackathon.type}
                      </Badge>
                      {hackathon.mode && (
                        <Badge variant="outline" className="text-xs">
                          {hackathon.mode}
                        </Badge>
                      )}
                    </div>
                    {hackathon.prize_pool && (
                      <span className="text-sm font-semibold text-amber-600">
                        {hackathon.prize_pool}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Not Registered CTA */}
      {!learnerProfile && (
        <Card className="bg-gradient-to-r from-[#E8F5E9] to-[#C8E6C9] border-0">
          <CardContent className="p-5 text-center">
            <GraduationCap className="w-10 h-10 mx-auto mb-3 text-[#2E7D32]" />
            <h3 className="font-bold text-gray-900 mb-1">Get Personalized Recommendations</h3>
            <p className="text-sm text-gray-600 mb-4">
              Register as a JKKN learner to receive AI-powered job and course suggestions
            </p>
            <Link to="/jkkn/register">
              <button className="bg-[#2E7D32] text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#1B5E20] transition-colors">
                Register Now
              </button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}