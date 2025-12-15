import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pause, Loader2, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface QuestionOption {
  label: string;
  text: string;
  trait: string;
}

interface Question {
  scenario: string;
  options: QuestionOption[];
  transition: string;
}

const assessmentNames: Record<string, string> = {
  psychometric: 'Psychometric Assessment',
  career_interest: 'Career Interest Inventory',
  emotional_intelligence: 'Emotional Intelligence',
  skill_gap: 'Skill Gap Analysis',
};

const totalQuestions: Record<string, number> = {
  psychometric: 60,
  career_interest: 40,
  emotional_intelligence: 35,
  skill_gap: 50,
};

const transitions = [
  "Great choice! Let's explore more...",
  "Interesting perspective! Now imagine this...",
  "Well thought! Here's another scenario...",
  "That tells us a lot about you! Moving on...",
  "Perfect! Let's dive deeper...",
];

const TakeAssessment = () => {
  const { type } = useParams<{ type: string }>();
  const [searchParams] = useSearchParams();
  const attemptId = searchParams.get('attemptId');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Array<{ answer: string; trait: string }>>([]);
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionText, setTransitionText] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isReturningUser, setIsReturningUser] = useState(false);

  const total = totalQuestions[type || ''] || 40;

  useEffect(() => {
    if (!user || !attemptId || !type) {
      navigate('/career-assessment/colleges');
      return;
    }
    loadProgress();
  }, [user, attemptId, type]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadProgress = async () => {
    try {
      // Get attempt data
      const { data: attempt, error: attemptError } = await supabase
        .from('user_assessment_attempts')
        .select('*')
        .eq('id', attemptId)
        .single();

      if (attemptError || !attempt) {
        toast({ title: "Error", description: "Assessment not found", variant: "destructive" });
        navigate('/career-assessment/colleges');
        return;
      }

      setCurrentQuestion(attempt.current_question);

      // Get all previous questions from this user for this assessment type
      const { data: history } = await supabase
        .from('user_question_history')
        .select('question_text')
        .eq('user_id', user?.id || '')
        .eq('assessment_type', type as 'psychometric' | 'career_interest' | 'emotional_intelligence' | 'skill_gap');

      const prevQuestions = history?.map(h => h.question_text) || [];
      setPreviousQuestions(prevQuestions);
      
      if (prevQuestions.length > 0 && attempt.current_question === 0) {
        setIsReturningUser(true);
      }

      // Get answered questions for this attempt
      const { data: answeredQuestions } = await supabase
        .from('user_question_history')
        .select('*')
        .eq('attempt_id', attemptId)
        .not('user_answer', 'is', null)
        .order('created_at');

      if (answeredQuestions) {
        const loadedAnswers = answeredQuestions.map(q => ({
          answer: q.user_answer || '',
          trait: (q.options as any)?.find((o: any) => o.label === q.user_answer)?.trait || ''
        }));
        setAnswers(loadedAnswers);
      }

      // Generate first question
      await generateQuestion(attempt.current_question + 1, prevQuestions);
    } catch (error) {
      console.error('Error loading progress:', error);
      toast({ title: "Error", description: "Failed to load assessment", variant: "destructive" });
    }
  };

  const generateQuestion = async (questionNumber: number, prevQuestions: string[]) => {
    setLoading(true);
    try {
      const response = await supabase.functions.invoke('career-assessment', {
        body: {
          action: 'generate_question',
          assessmentType: type,
          previousQuestions: prevQuestions,
          questionNumber,
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      setQuestion(response.data.question);

      // Store question in history
      const questionHash = btoa(response.data.question.scenario.substring(0, 50));
      await supabase.from('user_question_history').insert([{
        user_id: user?.id || '',
        assessment_type: type as 'psychometric' | 'career_interest' | 'emotional_intelligence' | 'skill_gap',
        attempt_id: attemptId,
        question_text: response.data.question.scenario,
        question_hash: questionHash,
        options: response.data.question.options,
      }]);

      setPreviousQuestions(prev => [...prev, response.data.question.scenario]);
    } catch (error) {
      console.error('Error generating question:', error);
      toast({
        title: "Error",
        description: "Failed to generate question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (option: QuestionOption) => {
    if (submitting) return;
    
    setSelectedAnswer(option.label);
    setSubmitting(true);

    const newAnswers = [...answers, { answer: option.label, trait: option.trait }];
    setAnswers(newAnswers);

    // Update question history with answer
    await supabase
      .from('user_question_history')
      .update({ user_answer: option.label, answered_at: new Date().toISOString() })
      .eq('attempt_id', attemptId)
      .eq('question_text', question?.scenario);

    // Update attempt progress
    await supabase
      .from('user_assessment_attempts')
      .update({ current_question: currentQuestion + 1 })
      .eq('id', attemptId);

    // Check if assessment complete
    if (currentQuestion + 1 >= total) {
      await completeAssessment(newAnswers);
      return;
    }

    // Show transition
    setTransitionText(question?.transition || transitions[currentQuestion % transitions.length]);
    setShowTransition(true);
    
    setTimeout(async () => {
      setShowTransition(false);
      setSelectedAnswer(null);
      setCurrentQuestion(prev => prev + 1);
      await generateQuestion(currentQuestion + 2, previousQuestions);
      setSubmitting(false);
    }, 1500);
  };

  const completeAssessment = async (finalAnswers: Array<{ answer: string; trait: string }>) => {
    setLoading(true);
    try {
      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('user_id', user?.id)
        .maybeSingle();

      // Generate results
      const response = await supabase.functions.invoke('career-assessment', {
        body: {
          action: 'generate_results',
          assessmentType: type,
          userName: profile?.display_name || 'Student',
          answers: finalAnswers,
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      // Save results
      await supabase
        .from('user_assessment_attempts')
        .update({
          completed_at: new Date().toISOString(),
          score: response.data.results,
          narrative_result: response.data.results.careerStory,
        })
        .eq('id', attemptId);

      toast({
        title: "Assessment Complete!",
        description: "Your personalized career report is ready.",
      });

      navigate(`/career-assessment/results/${attemptId}`);
    } catch (error) {
      console.error('Error completing assessment:', error);
      toast({
        title: "Error",
        description: "Failed to generate results. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePause = async () => {
    await supabase
      .from('user_assessment_attempts')
      .update({ is_paused: true })
      .eq('id', attemptId);

    toast({
      title: "Assessment Paused",
      description: "Your progress has been saved. Continue anytime!",
    });

    navigate('/career-assessment/colleges');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion) / total) * 100;

  if (loading && !question) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#FF6B35] mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">
            {isReturningUser 
              ? "Welcome back! Generating fresh questions for you..." 
              : "Preparing your assessment..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A2E1F]/5 to-background">
      {/* Header */}
      <header className="bg-[#0A2E1F] text-white py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={handlePause}
              >
                <Pause className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-semibold">{assessmentNames[type || '']}</h1>
                <p className="text-sm text-white/70">
                  Chapter {currentQuestion + 1} of {total}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-mono">{formatTime(elapsedTime)}</span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="mt-4 h-2 bg-white/20" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {isReturningUser && currentQuestion === 0 && (
          <div className="mb-6 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-lg p-4 text-center">
            <p className="text-sm font-medium text-[#0A2E1F]">
              🎉 Welcome back! Here's a fresh set of questions to explore new dimensions.
            </p>
          </div>
        )}

        {showTransition ? (
          <div className="flex items-center justify-center min-h-[400px] animate-fade-in">
            <div className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <p className="text-xl font-medium text-[#0A2E1F]">{transitionText}</p>
              <Loader2 className="h-6 w-6 animate-spin text-[#FF6B35] mx-auto mt-4" />
            </div>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-10 w-10 animate-spin text-[#FF6B35] mx-auto mb-4" />
              <p className="text-muted-foreground">Generating your next scenario...</p>
            </div>
          </div>
        ) : question ? (
          <div className="space-y-6 animate-fade-in">
            {/* Scenario Card */}
            <Card className="border-l-4 border-l-[#0A2E1F] bg-white shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#0A2E1F]/10 rounded-full">
                    <BookOpen className="h-6 w-6 text-[#0A2E1F]" />
                  </div>
                  <p className="text-lg leading-relaxed text-foreground flex-1">
                    {question.scenario}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleAnswer(option)}
                  disabled={submitting}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    selectedAnswer === option.label
                      ? 'border-[#FF6B35] bg-[#FF6B35]/10 scale-[1.02]'
                      : 'border-border hover:border-[#FF6B35]/50 hover:bg-muted/50'
                  } ${submitting && selectedAnswer !== option.label ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                      selectedAnswer === option.label
                        ? 'bg-[#FF6B35] text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {option.label}
                    </span>
                    <span className="text-foreground">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Help Text */}
            <p className="text-center text-sm text-muted-foreground">
              Choose the option that best describes how you would react
            </p>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default TakeAssessment;
