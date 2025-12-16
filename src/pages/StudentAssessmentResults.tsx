import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Share2, Star, Target, TrendingUp, Calendar, Briefcase, GraduationCap, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const streamNames: Record<string, string> = {
  pcm: "Science (PCM)",
  pcb: "Science (PCB)",
  pcmb: "Science (PCMB)",
  commerce: "Commerce",
  arts: "Arts / Humanities"
};

interface CourseRecommendation {
  rank: number;
  name: string;
  matchPercentage: number;
  careers: string[];
  salaryRange: string;
  whyMatch: string;
}

interface Results {
  profile: {
    title: string;
    description: string;
  };
  topCourses: CourseRecommendation[];
  strengths: string[];
  growthAreas: string[];
  actionPlan: Array<{
    month: number;
    title: string;
    tasks: string[];
  }>;
}

export default function StudentAssessmentResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const { attemptId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Results | null>(null);
  const [attempt, setAttempt] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (!attemptId) return;

    // Anonymous/local results route (TakeStudentAssessment navigates to /results/local)
    if (attemptId === 'local' || !user) {
      loadLocalResults();
      return;
    }

    loadResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, attemptId]);

  const loadLocalResults = () => {
    try {
      const state = location.state as any;

      const streamFromState = state?.stream as string | undefined;
      const resultsFromState = state?.results as Results | undefined;

      const profileRaw = localStorage.getItem('student_profile');
      const profile = profileRaw ? JSON.parse(profileRaw) : null;
      const streamFromProfile = profile?.stream as string | undefined;

      const stream = streamFromState || streamFromProfile;

      const storedResultsRaw = stream ? localStorage.getItem(`assessment_results_${stream}`) : null;
      const storedResults = storedResultsRaw ? (JSON.parse(storedResultsRaw) as Results) : null;

      const finalResults = resultsFromState || storedResults;

      if (!finalResults || !stream) {
        setResults(null);
        setLoading(false);
        return;
      }

      setResults(finalResults);

      const completedAttempts = parseInt(localStorage.getItem('completed_attempts') || '1', 10) || 1;
      setAttempt({ stream, attempt_number: completedAttempts });
      setUserName('Student');
    } catch (error) {
      console.error('Error loading local results:', error);
      toast({
        title: 'Error',
        description: 'Failed to load results.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadResults = async () => {
    try {
      const { data: attemptData, error } = await supabase
        .from('student_assessment_attempts')
        .select('*')
        .eq('id', attemptId)
        .single();

      if (error) throw error;

      setAttempt(attemptData);
      if (attemptData.course_recommendations) {
        setResults(attemptData.course_recommendations as unknown as Results);
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('user_id', user?.id)
        .maybeSingle();

      setUserName(profile?.display_name || "Student");
    } catch (error) {
      console.error('Error loading results:', error);
      toast({
        title: "Error",
        description: "Failed to load results.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Career Assessment Results",
          text: `I discovered my ideal courses after 12th! My top match is ${results?.topCourses[0]?.name}`,
          url: shareUrl
        });
      } catch {
        // ignore share cancel
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Share this link with others."
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your personalized results...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Results not found</p>
          <Button onClick={() => navigate('/career-assessment/12th-learners')}>
            Take Assessment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-[#0A2E1F] text-white py-6">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/career-assessment/12th-learners')}
            className="text-white hover:text-white/80 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Assessment
          </Button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-playfair text-3xl font-bold">Your Career Discovery Report</h1>
              <p className="text-white/80 mt-1">
                {streamNames[attempt?.stream || 'pcm']} Student • Attempt #{attempt?.attempt_number || 1}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 border-l-4 border-l-primary overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-transparent p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="font-playfair text-2xl font-bold text-foreground">{results.profile.title}</h2>
                <p className="text-muted-foreground mt-2 leading-relaxed">{results.profile.description}</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Your Top Matching Courses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.topCourses.slice(0, 10).map((course, index) => (
                  <Card key={index} className="border-l-4 border-l-orange-400">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                              #{course.rank}
                            </span>
                            <h3 className="font-semibold text-lg text-foreground">{course.name}</h3>
                          </div>
                          <div className="mb-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm text-muted-foreground">Match:</span>
                              <Progress value={course.matchPercentage} className="h-2 flex-1 max-w-[200px]" />
                              <span className="text-sm font-semibold text-primary">{course.matchPercentage}%</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{course.whyMatch}</p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Careers:</span>
                              <span className="text-foreground">{course.careers.join(', ')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4 text-green-500" />
                              <span className="text-green-600 font-medium">{course.salaryRange}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Your 3-Month Action Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {results.actionPlan.map((month) => (
                    <div key={month.month} className="border-l-2 border-primary pl-4">
                      <h3 className="font-semibold text-foreground mb-2">
                        Month {month.month}: {month.title}
                      </h3>
                      <ul className="space-y-1">
                        {month.tasks.map((task, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Your Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {results.strengths.map((strength, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="text-foreground">{strength}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Growth Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {results.growthAreas.map((area, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span className="text-foreground">{area}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-foreground mb-2">Want different insights?</h3>
                <p className="text-sm text-muted-foreground mb-4">Take the assessment again for fresh perspectives</p>
                <Button onClick={() => navigate('/career-assessment/12th-learners')} className="w-full bg-primary hover:bg-primary/90">
                  Take Another Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
