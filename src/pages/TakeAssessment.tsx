import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Pause, Loader2, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Json } from '@/integrations/supabase/types';

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

type AssessmentType = 'psychometric' | 'career_interest' | 'emotional_intelligence' | 'skill_gap';

type LocalAttempt = {
  id: string;
  type: AssessmentType;
  attemptNumber: number;
  totalQuestions: number;
  currentQuestion: number;
  answers: Array<{ answer: string; trait: string }>;
  previousQuestions: string[];
  elapsedTime: number;
  startedAt: string;
  completedAt?: string;
  results?: any;
  isPaused?: boolean;
};

const assessmentNames: Record<string, string> = {
  psychometric: 'Psychometric Assessment',
  career_interest: 'Career Interest Inventory',
  emotional_intelligence: 'Emotional Intelligence',
  skill_gap: 'Skill Gap Analysis',
};

const totalQuestions: Record<AssessmentType, number> = {
  psychometric: 60,
  career_interest: 40,
  emotional_intelligence: 35,
  skill_gap: 50,
};

const transitions = [
  "Great choice! Let's explore more...",
  'Interesting perspective! Now imagine this...',
  "Well thought! Here's another scenario...",
  'That tells us a lot about you! Moving on...',
  "Perfect! Let's dive deeper...",
];

const localAttemptKey = (attemptId: string) => `college_assessment_attempt_${attemptId}`;

const readLocalAttempt = (attemptId: string): LocalAttempt | null => {
  try {
    const raw = localStorage.getItem(localAttemptKey(attemptId));
    return raw ? (JSON.parse(raw) as LocalAttempt) : null;
  } catch {
    return null;
  }
};

const writeLocalAttempt = (attemptId: string, next: LocalAttempt) => {
  localStorage.setItem(localAttemptKey(attemptId), JSON.stringify(next));
};

const TakeAssessment = () => {
  const { type } = useParams<{ type: AssessmentType }>();
  const [searchParams] = useSearchParams();
  const attemptId = searchParams.get('attemptId');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const isLocalAttempt = Boolean(attemptId && attemptId.startsWith('local_'));
  const assessmentType = type;

  const total = assessmentType ? totalQuestions[assessmentType] : 40;

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

  useEffect(() => {
    if (!attemptId || !assessmentType) {
      navigate('/career-assessment/colleges');
      return;
    }

    if (!user && !isLocalAttempt) {
      navigate('/career-assessment/colleges');
      return;
    }

    loadProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, attemptId, assessmentType]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadProgress = async () => {
    try {
      if (!attemptId || !assessmentType) return;

      if (isLocalAttempt) {
        const localAttempt = readLocalAttempt(attemptId);
        if (!localAttempt) {
          toast({ title: 'Error', description: 'Assessment not found', variant: 'destructive' });
          navigate('/career-assessment/colleges');
          return;
        }

        setCurrentQuestion(localAttempt.currentQuestion);
        setAnswers(localAttempt.answers || []);
        setPreviousQuestions(localAttempt.previousQuestions || []);
        setElapsedTime(localAttempt.elapsedTime || 0);

        if ((localAttempt.previousQuestions || []).length > 0 && localAttempt.currentQuestion === 0) {
          setIsReturningUser(true);
        }

        await generateQuestion(localAttempt.currentQuestion + 1, localAttempt.previousQuestions || []);
        return;
      }

      // Logged-in mode
      const { data: attempt, error: attemptError } = await supabase
        .from('user_assessment_attempts')
        .select('*')
        .eq('id', attemptId)
        .single();

      if (attemptError || !attempt) {
        toast({ title: 'Error', description: 'Assessment not found', variant: 'destructive' });
        navigate('/career-assessment/colleges');
        return;
      }

      setCurrentQuestion(attempt.current_question);

      const { data: history } = await supabase
        .from('user_question_history')
        .select('question_text')
        .eq('user_id', user?.id || '')
        .eq('assessment_type', assessmentType);

      const prevQuestions = history?.map((h) => h.question_text) || [];
      setPreviousQuestions(prevQuestions);

      if (prevQuestions.length > 0 && attempt.current_question === 0) {
        setIsReturningUser(true);
      }

      const { data: answeredQuestions } = await supabase
        .from('user_question_history')
        .select('*')
        .eq('attempt_id', attemptId)
        .not('user_answer', 'is', null)
        .order('created_at');

      if (answeredQuestions) {
        const loadedAnswers = answeredQuestions.map((q) => ({
          answer: q.user_answer || '',
          trait: (q.options as any)?.find((o: any) => o.label === q.user_answer)?.trait || '',
        }));
        setAnswers(loadedAnswers);
      }

      await generateQuestion(attempt.current_question + 1, prevQuestions);
    } catch (error) {
      console.error('Error loading progress:', error);
      toast({ title: 'Error', description: 'Failed to load assessment', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const persistLocal = (partial: Partial<LocalAttempt>) => {
    if (!attemptId || !assessmentType || !isLocalAttempt) return;
    const current = readLocalAttempt(attemptId);
    if (!current) return;

    const next: LocalAttempt = {
      ...current,
      ...partial,
      elapsedTime: partial.elapsedTime ?? elapsedTime,
      currentQuestion: partial.currentQuestion ?? currentQuestion,
      answers: partial.answers ?? answers,
      previousQuestions: partial.previousQuestions ?? previousQuestions,
    };

    writeLocalAttempt(attemptId, next);
  };

  const generateQuestion = async (questionNumber: number, prevQuestions: string[]) => {
    setLoading(true);
    try {
      const response = await supabase.functions.invoke('career-assessment', {
        body: {
          action: 'generate_question',
          assessmentType,
          previousQuestions: prevQuestions,
          questionNumber,
        },
      });

      if (response.error) throw new Error(response.error.message);

      const nextQuestion: Question = response.data.question;
      setQuestion(nextQuestion);

      // Store question
      if (!isLocalAttempt) {
        const questionHash = btoa(nextQuestion.scenario.substring(0, 50));
        await supabase.from('user_question_history').insert([
          {
            user_id: user?.id || '',
            assessment_type: assessmentType as 'psychometric' | 'career_interest' | 'emotional_intelligence' | 'skill_gap',
            attempt_id: attemptId,
            question_text: nextQuestion.scenario,
            question_hash: questionHash,
            options: nextQuestion.options as unknown as Json,
          },
        ]);

        setPreviousQuestions((prev) => [...prev, nextQuestion.scenario]);
      } else {
        setPreviousQuestions((prev) => {
          const next = [...prev, nextQuestion.scenario];
          persistLocal({ previousQuestions: next });
          return next;
        });
      }
    } catch (error) {
      console.error('Error generating question:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate question. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (option: QuestionOption) => {
    if (submitting || !attemptId || !assessmentType) return;

    setSelectedAnswer(option.label);
    setSubmitting(true);

    const newAnswers = [...answers, { answer: option.label, trait: option.trait }];
    setAnswers(newAnswers);

    if (!isLocalAttempt) {
      await supabase
        .from('user_question_history')
        .update({ user_answer: option.label, answered_at: new Date().toISOString() })
        .eq('attempt_id', attemptId)
        .eq('question_text', question?.scenario);

      await supabase.from('user_assessment_attempts').update({ current_question: currentQuestion + 1 }).eq('id', attemptId);
    } else {
      persistLocal({
        answers: newAnswers,
        currentQuestion: currentQuestion + 1,
        elapsedTime,
      });
    }

    if (currentQuestion + 1 >= total) {
      await completeAssessment(newAnswers);
      return;
    }

    setTransitionText(question?.transition || transitions[currentQuestion % transitions.length]);
    setShowTransition(true);

    setTimeout(async () => {
      setShowTransition(false);
      setSelectedAnswer(null);
      setCurrentQuestion((prev) => prev + 1);
      await generateQuestion(currentQuestion + 2, previousQuestions);
      setSubmitting(false);

      if (isLocalAttempt) {
        persistLocal({
          currentQuestion: currentQuestion + 1,
          elapsedTime,
        });
      }
    }, 1500);
  };

  const completeAssessment = async (finalAnswers: Array<{ answer: string; trait: string }>) => {
    setLoading(true);
    try {
      let userName = 'Explorer';

      if (!isLocalAttempt) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('user_id', user?.id)
          .maybeSingle();
        userName = profile?.display_name || 'Student';
      }

      const response = await supabase.functions.invoke('career-assessment', {
        body: {
          action: 'generate_results',
          assessmentType,
          userName,
          answers: finalAnswers,
        },
      });

      if (response.error) throw new Error(response.error.message);

      if (!isLocalAttempt) {
        await supabase
          .from('user_assessment_attempts')
          .update({
            completed_at: new Date().toISOString(),
            score: response.data.results,
            narrative_result: response.data.results.careerStory,
          })
          .eq('id', attemptId);
      } else {
        const attempt = readLocalAttempt(attemptId);
        if (attempt) {
          writeLocalAttempt(attemptId, {
            ...attempt,
            completedAt: new Date().toISOString(),
            results: response.data.results,
            isPaused: false,
            elapsedTime,
            currentQuestion: total,
            answers: finalAnswers,
          });
          localStorage.removeItem(`college_active_attempt_${assessmentType}`);
        }
      }

      toast({
        title: 'Assessment Complete!',
        description: 'Your personalized career report is ready.',
      });

      navigate(`/career-assessment/results/${attemptId}`);
    } catch (error) {
      console.error('Error completing assessment:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate results. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePause = async () => {
    if (!attemptId || !assessmentType) return;

    if (!isLocalAttempt) {
      await supabase.from('user_assessment_attempts').update({ is_paused: true }).eq('id', attemptId);
    } else {
      persistLocal({
        isPaused: true,
        elapsedTime,
      });
      localStorage.setItem(`college_active_attempt_${assessmentType}`, attemptId);
    }

    toast({
      title: 'Assessment Paused',
      description: 'Your progress has been saved. Continue anytime!',
    });

    navigate('/career-assessment/colleges');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentQuestion / total) * 100;

  if (loading && !question) {
    return (
      <div className="min-h-screen bg-background page-transition flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#FF6B35] mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">
            {isReturningUser ? 'Welcome back! Generating fresh questions for you...' : 'Preparing your assessment...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A2E1F]/5 to-background page-transition">
      <header className="bg-[#0A2E1F] text-white py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={handlePause}>
                <Pause className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-semibold">{assessmentType ? assessmentNames[assessmentType] : 'Assessment'}</h1>
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
            <Card className="border-l-4 border-l-[#0A2E1F] bg-white shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#0A2E1F]/10 rounded-full">
                    <BookOpen className="h-6 w-6 text-[#0A2E1F]" />
                  </div>
                  <p className="text-lg leading-relaxed text-foreground flex-1">{question.scenario}</p>
                </div>
              </CardContent>
            </Card>

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
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                        selectedAnswer === option.label
                          ? 'bg-[#FF6B35] text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {option.label}
                    </span>
                    <span className="text-foreground">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground">Choose the option that best describes how you would react</p>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default TakeAssessment;
