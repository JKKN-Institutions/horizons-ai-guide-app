import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, ArrowRight, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { courseDatabase, Course } from '@/data/courseDatabase';
import { useAuth } from '@/hooks/useAuth';

interface Recommendation {
  course: Course;
  reason: string;
  reasonTamil: string;
  priority: 'high' | 'medium' | 'low';
}

const DashboardRecommendations = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch student profile to get stream
        const { data: profile } = await supabase
          .from('student_profiles')
          .select('stream, specific_interests')
          .eq('user_id', user.id)
          .single();

        // Fetch completed assessments for recommendations
        const { data: attempts } = await supabase
          .from('student_assessment_attempts')
          .select('course_recommendations, stream')
          .eq('user_id', user.id)
          .not('completed_at', 'is', null)
          .order('completed_at', { ascending: false })
          .limit(1);

        let stream = profile?.stream || 'pcm';
        let recommendedCourseIds: string[] = [];

        // Get course recommendations from latest assessment
        if (attempts && attempts.length > 0 && attempts[0].course_recommendations) {
          const courseRecs = attempts[0].course_recommendations as any[];
          recommendedCourseIds = courseRecs.slice(0, 5).map((c: any) => c.courseId || c.id);
          stream = attempts[0].stream;
        }

        // Build recommendations based on stream
        const streamCourses = courseDatabase.filter(c => c.stream === stream);

        const recs: Recommendation[] = [];

        // Add assessment-based recommendations first
        if (recommendedCourseIds.length > 0) {
          recommendedCourseIds.forEach((id, index) => {
            const course = courseDatabase.find(c => c.id === id);
            if (course && index < 3) {
              recs.push({
                course,
                reason: 'Based on your assessment results',
                reasonTamil: 'உங்கள் மதிப்பீட்டின் அடிப்படையில்',
                priority: 'high',
              });
            }
          });
        }

        // Add trending courses in the stream
        const trendingCourses = streamCourses
          .filter(c => !recommendedCourseIds.includes(c.id))
          .slice(0, 3 - recs.length);

        trendingCourses.forEach(course => {
          recs.push({
            course,
            reason: 'High demand in job market',
            reasonTamil: 'வேலைச் சந்தையில் அதிக தேவை',
            priority: 'medium',
          });
        });

        // Fallback to popular courses if no recommendations yet
        if (recs.length === 0) {
          const popularCourses = courseDatabase.slice(0, 3);

          popularCourses.forEach(course => {
            recs.push({
              course,
              reason: 'Popular choice among students',
              reasonTamil: 'மாணவர்களிடையே பிரபலமான தேர்வு',
              priority: 'low',
            });
          });
        }

        setRecommendations(recs);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'medium':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <Card className="border-border">
        <CardContent className="py-8">
          <div className="flex items-center justify-center">
            <Sparkles className="h-5 w-5 animate-pulse text-primary" />
            <span className="ml-2 text-muted-foreground">Loading recommendations...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          Recommended For You
          <span className="text-sm font-normal text-muted-foreground font-tamil ml-auto">
            உங்களுக்கான பரிந்துரைகள்
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.length === 0 ? (
          <div className="text-center py-6">
            <Lightbulb className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">
              Complete an assessment to get personalized recommendations
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3"
              onClick={() => navigate('/career-assessment/12th-learners')}
            >
              Take Assessment
            </Button>
          </div>
        ) : (
          <>
            {recommendations.map((rec, index) => (
              <div 
                key={rec.course.id}
                className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer group"
                onClick={() => navigate('/career-assessment/ai-predictor')}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm truncate">{rec.course.name}</p>
                      <Badge className={`${getPriorityColor(rec.priority)} text-[10px] shrink-0`}>
                        {rec.priority === 'high' ? 'Best Match' : rec.priority === 'medium' ? 'Trending' : 'Popular'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{rec.course.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {rec.course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        {rec.course.feesRange}
                      </span>
                    </div>
                    <p className="text-[10px] text-primary mt-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {rec.reason}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                </div>
              </div>
            ))}

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/career-assessment/ai-predictor')}
            >
              Explore All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardRecommendations;
