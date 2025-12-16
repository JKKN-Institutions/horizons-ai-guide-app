import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Compass, Heart, BarChart3, Clock, HelpCircle, CheckCircle2, ArrowLeft, Trophy, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type AssessmentType = 'psychometric' | 'career_interest' | 'emotional_intelligence' | 'skill_gap';

interface AssessmentCard {
  id: AssessmentType;
  title: string;
  description: string;
  duration: string;
  questions: number;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
}

const assessmentCards: AssessmentCard[] = [
  {
    id: 'psychometric',
    title: 'Psychometric Assessment',
    description: 'Deep dive into personality, values, interests and work style',
    duration: '45 min',
    questions: 60,
    icon: Brain,
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-100',
  },
  {
    id: 'career_interest',
    title: 'Career Interest Inventory',
    description: 'Identify career interests and match with suitable job roles',
    duration: '20 min',
    questions: 40,
    icon: Compass,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    id: 'emotional_intelligence',
    title: 'Emotional Intelligence',
    description: 'Evaluate emotional awareness, empathy and interpersonal skills',
    duration: '25 min',
    questions: 35,
    icon: Heart,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'skill_gap',
    title: 'Skill Gap Analysis',
    description: 'Identify gaps between current skills and industry requirements',
    duration: '30 min',
    questions: 50,
    icon: BarChart3,
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-100',
  },
];

const CareerAssessmentColleges = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [completedAssessments, setCompletedAssessments] = useState<AssessmentType[]>([]);
  const [inProgressAssessments, setInProgressAssessments] = useState<Record<AssessmentType, { attemptId: string; progress: number }>>({} as any);
  const [loading, setLoading] = useState(true);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    if (user) {
      fetchUserProgress();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserProgress = async () => {
    try {
      const { data: attempts, error } = await supabase
        .from('user_assessment_attempts')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const completed: AssessmentType[] = [];
      const inProgress: Record<AssessmentType, { attemptId: string; progress: number }> = {} as any;
      let totalScore = 0;
      let scoreCount = 0;

      attempts?.forEach((attempt) => {
        const type = attempt.assessment_type as AssessmentType;
        if (attempt.completed_at) {
          if (!completed.includes(type)) {
            completed.push(type);
            if (attempt.score && typeof attempt.score === 'object' && 'overallScore' in attempt.score) {
              totalScore += (attempt.score as any).overallScore;
              scoreCount++;
            }
          }
        } else if (!inProgress[type]) {
          inProgress[type] = {
            attemptId: attempt.id,
            progress: attempt.total_questions > 0 
              ? Math.round((attempt.current_question / attempt.total_questions) * 100)
              : 0
          };
        }
      });

      setCompletedAssessments(completed);
      setInProgressAssessments(inProgress);
      setOverallScore(scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartAssessment = async (assessment: AssessmentCard) => {
    // NO LOGIN REQUIRED - support both logged-in (cloud saved) and anonymous (this device)
    if (!attemptId && inProgressAssessments[assessment.id]) {
      navigate(`/career-assessment/take/${assessment.id}?attemptId=${inProgressAssessments[assessment.id].attemptId}`);
      return;
    }

    if (!user) {
      const uuid = (globalThis.crypto as any)?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(16).slice(2)}`;
      const localAttemptId = `local_${uuid}`;

      const countKey = `college_attempt_count_${assessment.id}`;
      const nextAttemptNumber = (parseInt(localStorage.getItem(countKey) || '0', 10) || 0) + 1;
      localStorage.setItem(countKey, String(nextAttemptNumber));

      localStorage.setItem(
        `college_assessment_attempt_${localAttemptId}`,
        JSON.stringify({
          id: localAttemptId,
          type: assessment.id,
          attemptNumber: nextAttemptNumber,
          totalQuestions: assessment.questions,
          currentQuestion: 0,
          answers: [],
          previousQuestions: [],
          elapsedTime: 0,
          startedAt: new Date().toISOString(),
          isPaused: false,
        })
      );
      localStorage.setItem(`college_active_attempt_${assessment.id}`, localAttemptId);

      navigate(`/career-assessment/take/${assessment.id}?attemptId=${localAttemptId}`);
      return;
    }

    // Logged-in flow (saved in backend)
    if (inProgressAssessments[assessment.id]) {
      navigate(`/career-assessment/take/${assessment.id}?attemptId=${inProgressAssessments[assessment.id].attemptId}`);
      return;
    }

    const { data: existingAttempts } = await supabase
      .from('user_assessment_attempts')
      .select('attempt_number')
      .eq('user_id', user.id)
      .eq('assessment_type', assessment.id)
      .order('attempt_number', { ascending: false })
      .limit(1);

    const attemptNumber = (existingAttempts?.[0]?.attempt_number || 0) + 1;

    const { data: newAttempt, error } = await supabase
      .from('user_assessment_attempts')
      .insert({
        user_id: user.id,
        assessment_type: assessment.id,
        attempt_number: attemptNumber,
        total_questions: assessment.questions,
        current_question: 0,
      })
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to start assessment. Please try again.",
        variant: "destructive",
      });
      return;
    }

    navigate(`/career-assessment/take/${assessment.id}?attemptId=${newAttempt.id}`);
  };

  const isCompleted = (id: AssessmentType) => completedAssessments.includes(id);
  const isInProgress = (id: AssessmentType) => !!inProgressAssessments[id];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-[#0A2E1F] text-white py-6">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10 mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold italic mb-2">
            Career Assessment Center for College Learners
          </h1>
          <p className="text-white/80 text-lg">
            Discover your strengths, interests and career readiness for your professional journey
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Choose Your Assessment</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {assessmentCards.map((assessment) => {
                const Icon = assessment.icon;
                const completed = isCompleted(assessment.id);
                const inProgress = isInProgress(assessment.id);

                return (
                  <Card 
                    key={assessment.id} 
                    className="border-l-4 border-l-[#0A2E1F] hover:shadow-lg transition-shadow relative overflow-hidden"
                  >
                    {completed && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                          <CheckCircle2 className="h-3 w-3" />
                          Completed
                        </span>
                      </div>
                    )}
                    {inProgress && !completed && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1 rounded-full">
                          <Clock className="h-3 w-3" />
                          In Progress
                        </span>
                      </div>
                    )}
                    
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${assessment.bgColor}`}>
                          <Icon className={`h-6 w-6 ${assessment.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{assessment.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {assessment.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {assessment.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <HelpCircle className="h-4 w-4" />
                          {assessment.questions} questions
                        </span>
                      </div>

                      {inProgress && !completed && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{inProgressAssessments[assessment.id].progress}%</span>
                          </div>
                          <Progress value={inProgressAssessments[assessment.id].progress} className="h-2" />
                        </div>
                      )}
                      
                      <Button 
                        className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
                        onClick={() => handleStartAssessment(assessment)}
                      >
                        {completed ? 'Retake Assessment' : inProgress ? 'Continue Assessment' : 'Start Assessment'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <Card className="sticky top-4 border-l-4 border-l-[#FFB800]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-[#FFB800]" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">{completedAssessments.length}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-orange-600">
                      {4 - completedAssessments.length}
                    </div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Career Readiness</span>
                    <span className="font-semibold">{overallScore}%</span>
                  </div>
                  <Progress value={overallScore} className="h-3" />
                </div>

                {completedAssessments.length > 0 && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/career-assessment/results')}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    View All Results
                  </Button>
                )}

                {completedAssessments.length > 0 && (
                  <Button 
                    className="w-full bg-[#0A2E1F] hover:bg-[#0A2E1F]/90"
                    onClick={() => navigate('/career-assessment/story')}
                  >
                    Read Your Career Story
                  </Button>
                )}

                {completedAssessments.length < 4 && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm font-medium mb-1">Recommended Next:</p>
                    <p className="text-sm text-muted-foreground">
                      {assessmentCards.find(a => !completedAssessments.includes(a.id))?.title}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerAssessmentColleges;
