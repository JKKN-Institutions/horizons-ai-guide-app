import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Clock, HelpCircle, CheckCircle2, ArrowLeft, Trophy, BookOpen, MessageCircle, Mic, Sparkles, Radio, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CollegeSearch } from '@/components/CollegeSearch';
import { ScholarshipFinder } from '@/components/ScholarshipFinder';
import { EduCutoff } from '@/components/EduCutoff';
import { PillNavigation } from '@/components/PillNavigation';

type AssessmentType = 'career_chat' | 'industry_trends' | 'emotional_intelligence' | 'skill_gap';
type DbAssessmentType = 'career_interest' | 'emotional_intelligence' | 'skill_gap' | 'psychometric';

interface AssessmentCard {
  id: AssessmentType;
  title: string;
  description: string;
  duration: string;
  questions: number | string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  isChat?: boolean;
  isExternal?: boolean;
  secondaryIcon?: React.ElementType;
}

const assessmentCards: AssessmentCard[] = [
  {
    id: 'career_chat',
    title: 'Career AI Chat',
    description: 'Chat with AI Career Counselor - Ask any career-related questions instantly',
    duration: 'Available 24/7',
    questions: 'Unlimited',
    icon: MessageCircle,
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-100',
    isChat: true,
    secondaryIcon: Mic,
  },
  {
    id: 'industry_trends',
    title: 'Industry Trends & Insights',
    description: 'Real-time job market analytics, salary benchmarks & future career predictions',
    duration: 'Live Data',
    questions: 'AI-Powered',
    icon: BarChart3,
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    isExternal: true,
    secondaryIcon: Target,
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
  const [activeTab, setActiveTab] = useState('assessments');

  // Dynamic button colors based on active tab
  const getButtonColor = () => {
    switch (activeTab) {
      case 'assessments':
        return 'bg-emerald-600 hover:bg-emerald-700';
      case 'colleges':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'scholarships':
        return 'bg-pink-600 hover:bg-pink-700';
      case 'educutoff':
        return 'bg-violet-600 hover:bg-violet-700';
      default:
        return 'bg-emerald-600 hover:bg-emerald-700';
    }
  };

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
    // Handle Career AI Chat separately
    if (assessment.isChat) {
      navigate('/career-assessment/chat');
      return;
    }

    // Handle Industry Trends separately (external page)
    if (assessment.isExternal) {
      navigate('/career-assessment/industry-trends');
      return;
    }

    // NO LOGIN REQUIRED - support both logged-in (cloud saved) and anonymous (this device)
    // Check for in-progress assessment first
    if (inProgressAssessments[assessment.id]) {
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

    // Logged-in flow (saved in backend) - create new attempt
    const { data: existingAttempts } = await supabase
      .from('user_assessment_attempts')
      .select('attempt_number')
      .eq('user_id', user.id)
      .eq('assessment_type', assessment.id as DbAssessmentType)
      .order('attempt_number', { ascending: false })
      .limit(1);

    const attemptNumber = (existingAttempts?.[0]?.attempt_number || 0) + 1;

    const { data: newAttempt, error } = await supabase
      .from('user_assessment_attempts')
      .insert({
        user_id: user.id,
        assessment_type: assessment.id as DbAssessmentType,
        attempt_number: attemptNumber,
        total_questions: typeof assessment.questions === 'number' ? assessment.questions : 0,
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
    <div className="premium-page-bg min-h-screen">
      {/* Header */}
      <header className="premium-page-header">
        <div className="container mx-auto px-4 relative z-10">
          <Button 
            variant="ghost" 
            className="text-white/80 hover:text-white hover:bg-white/10 mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1>Career Assessment Center for College Learners</h1>
          <p className="tamil-title font-tamil">
            கல்லூரி கற்றவர்களுக்கான வாழ்க்கை மதிப்பீட்டு மையம்
          </p>
          <p className="subtitle">
            Discover your strengths, interests and find the perfect college for your future
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <PillNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'assessments' && (
          <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
              <div className="dark-section-header mb-6">
                <div className="icon-box text-white"><Target /></div>
                <h2>Choose Your Assessment</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {assessmentCards.map((assessment) => {
                  const Icon = assessment.icon;
                  const completed = isCompleted(assessment.id);
                  const inProgress = isInProgress(assessment.id);

                  return (
                    <Card 
                      key={assessment.id} 
                      className="glass-card-premium dark-card-orange hover:shadow-premium transition-all relative overflow-hidden"
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
                            <CardTitle className="text-lg card-heading">{assessment.title}</CardTitle>
                            <CardDescription className="mt-1 card-body">
                              {assessment.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm card-muted mb-4">
                          {assessment.isChat ? (
                            <>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                Unlimited
                              </span>
                              <span className="flex items-center gap-1">
                                <Mic className="h-4 w-4" />
                                Voice Support
                              </span>
                            </>
                          ) : assessment.isExternal ? (
                            <>
                              <span className="flex items-center gap-1">
                                <Radio className="h-4 w-4" />
                                {assessment.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Sparkles className="h-4 w-4" />
                                {assessment.questions} Insights
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {assessment.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <HelpCircle className="h-4 w-4" />
                                {assessment.questions} questions
                              </span>
                            </>
                          )}
                        </div>

                        {inProgress && !completed && !assessment.isExternal && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1 card-body">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{inProgressAssessments[assessment.id].progress}%</span>
                            </div>
                            <Progress value={inProgressAssessments[assessment.id].progress} className="h-2" />
                          </div>
                        )}
                        
                        <Button 
                          className={`w-full ${getButtonColor()} text-white`}
                          onClick={() => handleStartAssessment(assessment)}
                        >
                          {assessment.isChat ? 'Start Chat' : assessment.isExternal ? 'View Insights →' : completed ? 'Retake Assessment' : inProgress ? 'Continue Assessment' : 'Start Assessment'}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              <Card className="glass-card-premium dark-card-gold sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 card-heading text-lg">
                    <Trophy className="h-5 w-5 text-premium-gold" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="dark-stat-card p-3">
                      <div className="text-2xl font-bold text-emerald-400">{completedAssessments.length}</div>
                      <div className="text-xs dark-body-muted">Completed</div>
                    </div>
                    <div className="dark-stat-card p-3">
                      <div className="text-2xl font-bold text-orange-400">
                        {4 - completedAssessments.length}
                      </div>
                      <div className="text-xs dark-body-muted">Pending</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="dark-body-muted">Career Readiness</span>
                      <span className="font-semibold text-white">{overallScore}%</span>
                    </div>
                    <div className="progress-premium">
                      <div className="progress-bar-premium" style={{ width: `${overallScore}%` }} />
                    </div>
                  </div>

                  {completedAssessments.length > 0 && (
                    <Button 
                      className="w-full btn-premium-secondary"
                      onClick={() => navigate('/career-assessment/results')}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      View All Results
                    </Button>
                  )}

                  {completedAssessments.length > 0 && (
                    <Button 
                      className="w-full btn-premium-primary"
                      onClick={() => navigate('/career-assessment/story')}
                    >
                      Read Your Career Story
                    </Button>
                  )}

                  {completedAssessments.length < 4 && (
                    <div className="dark-stat-card p-3">
                      <p className="text-sm font-medium mb-1 text-white">Recommended Next:</p>
                      <p className="text-sm dark-body-muted">
                        {assessmentCards.find(a => !completedAssessments.includes(a.id))?.title}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'colleges' && <CollegeSearch />}

        {activeTab === 'scholarships' && <ScholarshipFinder />}

        {activeTab === 'educutoff' && <EduCutoff />}
      </div>
    </div>
  );
};

export default CareerAssessmentColleges;
