import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Clock, HelpCircle, CheckCircle2, ArrowLeft, Trophy, BookOpen, MessageCircle, Mic, Sparkles, Radio, Target, Brain, Lightbulb, Zap } from 'lucide-react';
import { IndustryTrendsModal } from '@/components/IndustryTrendsModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CollegesPageLayout } from '@/components/CollegesPageLayout';


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

// Career Booster cards - same style as assessment cards
interface BoosterCard {
  id: string;
  title: string;
  description: string;
  badge1: string;
  badge2: string;
  icon: React.ElementType;
  cardGradient: string;
  iconGradient: string;
  buttonGradient: string;
  buttonText: string;
  badge1Icon: React.ElementType;
  badge2Icon: React.ElementType;
}

const boosterCards: BoosterCard[] = [
  {
    id: 'ai_predictor',
    title: 'AI Career Predictor',
    description: 'Get AI-powered career predictions based on your interests and skills',
    badge1: 'Personalized',
    badge2: 'Smart Tips',
    icon: Brain,
    cardGradient: 'bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 border-2 border-purple-200/60 hover:border-purple-300 hover:shadow-[0_8px_30px_rgba(147,51,234,0.2)]',
    iconGradient: 'bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg shadow-purple-200',
    buttonGradient: 'bg-gradient-to-r from-purple-500 via-violet-500 to-purple-500 hover:from-purple-600 hover:via-violet-600 hover:to-purple-600 text-white shadow-purple-200 hover:shadow-purple-300',
    buttonText: 'Get Predictions',
    badge1Icon: Sparkles,
    badge2Icon: Lightbulb,
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
  const [showIndustryTrendsModal, setShowIndustryTrendsModal] = useState(false);
  const getButtonColor = () => {
    switch (activeTab) {
      case 'assessments':
        return 'bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] hover:from-[#1B5E20] hover:to-[#004D40]';
      case 'colleges':
        return 'bg-gradient-to-r from-[#1976D2] to-[#1565C0] hover:from-[#1565C0] hover:to-[#0D47A1]';
      case 'scholarships':
        return 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309]';
      case 'educutoff':
        return 'bg-gradient-to-r from-[#7B1FA2] to-[#6A1B9A] hover:from-[#6A1B9A] hover:to-[#4A148C]';
      case 'entranceexams':
        return 'bg-gradient-to-r from-[#E65100] to-[#BF360C] hover:from-[#BF360C] hover:to-[#8D2900]';
      default:
        return 'bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] hover:from-[#1B5E20] hover:to-[#004D40]';
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

    // Handle Industry Trends separately (show modal instead of navigating)
    if (assessment.isExternal) {
      setShowIndustryTrendsModal(true);
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
    <CollegesPageLayout activeTab="assessments">
      {/* Industry Trends Modal */}
      <IndustryTrendsModal 
        open={showIndustryTrendsModal} 
        onOpenChange={setShowIndustryTrendsModal} 
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="fresh-section-header mb-6">
            <div className="icon-box text-white"><Target /></div>
            <h2>Choose Your Assessment</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {assessmentCards.map((assessment, index) => {
              const Icon = assessment.icon;
              const completed = isCompleted(assessment.id);
              const inProgress = isInProgress(assessment.id);

              const cardGradient = assessment.isChat 
                ? 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-200/60 hover:border-orange-300 hover:shadow-[0_8px_30px_rgba(251,146,60,0.2)]'
                : 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-2 border-emerald-200/60 hover:border-emerald-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.2)]';

              const iconGradient = assessment.isChat
                ? 'bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg shadow-orange-200'
                : 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-200';

              return (
                <Card 
                  key={assessment.id} 
                  className={`${cardGradient} rounded-2xl transition-all duration-300 relative overflow-hidden group hover:scale-[1.02] hover:-translate-y-1`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity ${assessment.isChat ? 'bg-orange-300' : 'bg-emerald-300'}`} />
                  
                  {completed && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Completed
                      </span>
                    </div>
                  )}
                  {inProgress && !completed && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-400 to-amber-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                        <Clock className="h-3.5 w-3.5" />
                        In Progress
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className={`p-3.5 rounded-xl ${iconGradient} transform group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 pt-1">
                        <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">{assessment.title}</CardTitle>
                        <CardDescription className="mt-2 text-gray-600 leading-relaxed">
                          {assessment.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <div className="flex items-center gap-4 text-sm mb-5">
                      {assessment.isChat ? (
                        <>
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-orange-700 font-medium shadow-sm">
                            <MessageCircle className="h-4 w-4" />
                            Unlimited
                          </span>
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-orange-700 font-medium shadow-sm">
                            <Mic className="h-4 w-4" />
                            Voice Support
                          </span>
                        </>
                      ) : assessment.isExternal ? (
                        <>
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-emerald-700 font-medium shadow-sm">
                            <Radio className="h-4 w-4" />
                            {assessment.duration}
                          </span>
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-emerald-700 font-medium shadow-sm">
                            <Sparkles className="h-4 w-4" />
                            {assessment.questions} Insights
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-gray-600 font-medium shadow-sm">
                            <Clock className="h-4 w-4" />
                            {assessment.duration}
                          </span>
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-gray-600 font-medium shadow-sm">
                            <HelpCircle className="h-4 w-4" />
                            {assessment.questions} questions
                          </span>
                        </>
                      )}
                    </div>

                    {inProgress && !completed && !assessment.isExternal && (
                      <div className="mb-5 bg-white/60 backdrop-blur-sm rounded-xl p-3">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-bold text-gray-800">{inProgressAssessments[assessment.id].progress}%</span>
                        </div>
                        <Progress value={inProgressAssessments[assessment.id].progress} className="h-2.5" />
                      </div>
                    )}
                    
                    <Button 
                      className={`w-full py-6 text-base font-semibold rounded-xl shadow-lg transition-all duration-300 ${
                        assessment.isChat 
                          ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-600 hover:via-amber-600 hover:to-orange-600 text-white shadow-orange-200 hover:shadow-orange-300'
                          : 'bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 hover:from-emerald-700 hover:via-green-700 hover:to-emerald-700 text-white shadow-emerald-200 hover:shadow-emerald-300'
                      } group-hover:shadow-xl`}
                      onClick={() => handleStartAssessment(assessment)}
                    >
                      {assessment.isChat ? 'Start Chat' : assessment.isExternal ? 'View Insights →' : completed ? 'Retake Assessment' : inProgress ? 'Continue Assessment' : 'Start Assessment'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Career Booster Section */}
          <div className="fresh-section-header mb-6 mt-10">
            <div className="icon-box bg-gradient-to-br from-purple-500 to-violet-600 text-white"><Brain /></div>
            <h2>Career Boosting</h2>
            <p className="text-sm text-gray-500 ml-auto">Personalized tips, skill recommendations & action plans</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {boosterCards.map((booster, index) => {
              const Icon = booster.icon;
              const Badge1Icon = booster.badge1Icon;
              const Badge2Icon = booster.badge2Icon;

              return (
                <Card 
                  key={booster.id} 
                  className={`${booster.cardGradient} rounded-2xl transition-all duration-300 relative overflow-hidden group hover:scale-[1.02] hover:-translate-y-1`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity ${booster.id === 'ai_predictor' ? 'bg-purple-300' : 'bg-blue-300'}`} />
                  
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className={`p-3.5 rounded-xl ${booster.iconGradient} transform group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 pt-1">
                        <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">{booster.title}</CardTitle>
                        <CardDescription className="mt-2 text-gray-600 leading-relaxed">
                          {booster.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <div className="flex items-center gap-4 text-sm mb-5">
                      <span className={`flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full font-medium shadow-sm ${booster.id === 'ai_predictor' ? 'text-purple-700' : 'text-blue-700'}`}>
                        <Badge1Icon className="h-4 w-4" />
                        {booster.badge1}
                      </span>
                      <span className={`flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full font-medium shadow-sm ${booster.id === 'ai_predictor' ? 'text-purple-700' : 'text-blue-700'}`}>
                        <Badge2Icon className="h-4 w-4" />
                        {booster.badge2}
                      </span>
                    </div>
                    
                    <Button 
                      className={`w-full py-6 text-base font-semibold rounded-xl shadow-lg transition-all duration-300 ${booster.buttonGradient} group-hover:shadow-xl`}
                      onClick={() => navigate(booster.id === 'ai_predictor' ? '/career-assessment/ai-predictor' : '/career-assessment/ai-predictor')}
                    >
                      {booster.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80">
          <Card className="fresh-card fresh-card-gold sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 fresh-card-title text-lg">
                <Trophy className="h-5 w-5 text-fresh-gold-dark" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="fresh-stat-card p-3">
                  <div className="text-2xl font-bold text-[#2E7D32]">{completedAssessments.length}</div>
                  <div className="text-xs fresh-muted">Completed</div>
                </div>
                <div className="fresh-stat-card p-3">
                  <div className="text-2xl font-bold text-[#F59E0B]">
                    {assessmentCards.length - completedAssessments.length}
                  </div>
                  <div className="text-xs fresh-muted">Pending</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="fresh-muted">Career Readiness</span>
                  <span className="font-semibold text-[#1B5E20]">{overallScore}%</span>
                </div>
                <div className="fresh-progress">
                  <div className="fresh-progress-bar" style={{ width: `${overallScore}%` }} />
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

              {completedAssessments.length < assessmentCards.length && (
                <div className="fresh-stat-card p-3">
                  <p className="text-sm font-medium mb-1 text-[#1B5E20]">Recommended Next:</p>
                  <p className="text-sm fresh-muted">
                    {assessmentCards.find(a => !completedAssessments.includes(a.id))?.title}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </CollegesPageLayout>
  );
};

export default CareerAssessmentColleges;
