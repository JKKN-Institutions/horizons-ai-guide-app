import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Pause, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Database, Json } from "@/integrations/supabase/types";

type StudentStream = Database['public']['Enums']['student_stream'];

const validStreams: StudentStream[] = ['pcm', 'pcb', 'pcmb', 'commerce', 'arts'];

interface QuestionOption {
  label: string;
  text: string;
  traits: string[];
}

interface Question {
  scenario: string;
  question: string;
  options: QuestionOption[];
}

const streamNames: Record<string, string> = {
  pcm: "Science (PCM)",
  pcb: "Science (PCB)",
  pcmb: "Science (PCMB)",
  commerce: "Commerce",
  arts: "Arts / Humanities"
};

const TOTAL_QUESTIONS = 30;

const transitions = [
  "Great choice! Let's explore more...",
  "Interesting! Now imagine this...",
  "Good thinking! Here's another scenario...",
  "Excellent! Let's see how you handle this...",
  "Nice! Moving on to something different...",
  "Well done! Consider this situation...",
  "Perfect! Here's a new challenge...",
  "Good answer! What about this...",
];

export default function TakeStudentAssessment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const streamParam = searchParams.get('stream') || 'pcm';
  const stream: StudentStream = validStreams.includes(streamParam as StudentStream) 
    ? (streamParam as StudentStream) 
    : 'pcm';
  

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Array<{ question: string; answer: string; traits: string[] }>>([]);
  const [transition, setTransition] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      console.log('TakeStudentAssessment: Not logged in, saving redirect URL and going to auth');
      localStorage.setItem('redirectAfterLogin', `/career-assessment/12th-learners/take?stream=${stream}`);
      toast({
        title: "Please login first",
        description: "You need to be logged in to take the assessment.",
      });
      navigate('/auth');
    }
  }, [user, authLoading, navigate, stream]);

  useEffect(() => {
    if (user && !authLoading) {
      console.log('TakeStudentAssessment: User is logged in, initializing assessment for stream:', stream);
      initializeAssessment();
    }
  }, [user, authLoading, stream]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const initializeAssessment = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Initializing assessment for stream:', stream, 'user:', user?.id);
      
      // Get user profile
      const { data: profileData, error: profileError } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
      }
      
      console.log('Profile data:', profileData);
      setProfile(profileData);

      // Get ALL previous questions from this user for this stream
      const { data: historyData, error: historyError } = await supabase
        .from('student_question_history')
        .select('question_text')
        .eq('user_id', user?.id)
        .eq('stream', stream);

      if (historyError) {
        console.error('History fetch error:', historyError);
      }

      const prevQuestions = historyData?.map(h => h.question_text) || [];
      console.log('Previous questions count:', prevQuestions.length);
      setPreviousQuestions(prevQuestions);

      // Check for paused attempt
      const { data: pausedAttempt, error: pausedError } = await supabase
        .from('student_assessment_attempts')
        .select('*')
        .eq('user_id', user?.id)
        .eq('stream', stream)
        .eq('is_paused', true)
        .maybeSingle();

      if (pausedError) {
        console.error('Paused attempt fetch error:', pausedError);
      }

      if (pausedAttempt) {
        console.log('Found paused attempt:', pausedAttempt.id);
        setAttemptId(pausedAttempt.id);
        setQuestionNumber(pausedAttempt.current_question + 1);
        if (Array.isArray(pausedAttempt.answers_json)) {
          setAnswers(pausedAttempt.answers_json as Array<{ question: string; answer: string; traits: string[] }>);
        }
        
        // Resume from where they left off
        setLoading(false);
        await generateQuestion(pausedAttempt.current_question + 1, prevQuestions);
      } else {
        // Create new attempt
        const { data: attempts } = await supabase
          .from('student_assessment_attempts')
          .select('attempt_number')
          .eq('user_id', user?.id)
          .eq('stream', stream)
          .order('attempt_number', { ascending: false })
          .limit(1);

        const newAttemptNumber = (attempts && attempts.length > 0) ? attempts[0].attempt_number + 1 : 1;
        console.log('Creating new attempt #', newAttemptNumber);

        const { data: newAttempt, error: createError } = await supabase
          .from('student_assessment_attempts')
          .insert({
            user_id: user?.id,
            stream: stream,
            attempt_number: newAttemptNumber,
            total_questions: TOTAL_QUESTIONS
          })
          .select()
          .single();

        if (createError) {
          console.error('Create attempt error:', createError);
          throw createError;
        }
        
        console.log('New attempt created:', newAttempt.id);
        setAttemptId(newAttempt.id);
        setLoading(false);
        await generateQuestion(1, prevQuestions);
      }
    } catch (error) {
      console.error('Error initializing assessment:', error);
      setError('Failed to start assessment. Please try again.');
      toast({
        title: "Error",
        description: "Failed to start assessment. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const generateQuestion = async (qNum: number, prevQs: string[]) => {
    setGenerating(true);
    setError(null);
    
    try {
      console.log('Generating question #', qNum, 'for stream:', stream);
      console.log('Previous questions to avoid:', prevQs.length);
      
      const { data, error: invokeError } = await supabase.functions.invoke('student-assessment', {
        body: {
          action: 'generate_question',
          stream,
          previousQuestions: prevQs,
          questionNumber: qNum,
          marksRange: profile?.marks_range,
          interests: profile?.specific_interests
        }
      });

      console.log('Edge function response:', { data, error: invokeError });

      if (invokeError) {
        console.error('Edge function error:', invokeError);
        throw new Error(invokeError.message || 'Failed to generate question');
      }

      if (!data || !data.scenario || !data.question || !data.options) {
        console.error('Invalid question data:', data);
        throw new Error('Invalid question format received');
      }

      setCurrentQuestion(data);
      setQuestionNumber(qNum);
      console.log('Question generated successfully:', data.question.substring(0, 50));
    } catch (error) {
      console.error('Error generating question:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate question';
      setError(errorMessage);
      toast({
        title: "Error generating question",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleAnswer = async (option: QuestionOption) => {
    if (!currentQuestion || !attemptId) return;

    const questionText = `${currentQuestion.scenario} ${currentQuestion.question}`;
    const questionHash = btoa(questionText).slice(0, 50);

    // Save to history
    const { error: historyError } = await supabase
      .from('student_question_history')
      .insert([{
        user_id: user?.id as string,
        attempt_id: attemptId,
        stream: stream,
        question_text: questionText,
        question_hash: questionHash,
        options: currentQuestion.options as unknown as Json,
        user_answer: option.label,
        answered_at: new Date().toISOString()
      }]);
    
    if (historyError) console.error('History save error:', historyError);

    const newAnswers = [...answers, {
      question: questionText,
      answer: option.text,
      traits: option.traits
    }];
    setAnswers(newAnswers);

    // Update attempt progress
    await supabase
      .from('student_assessment_attempts')
      .update({
        current_question: questionNumber,
        answers_json: newAnswers
      })
      .eq('id', attemptId);

    // Update previous questions
    const newPrevQuestions = [...previousQuestions, questionText];
    setPreviousQuestions(newPrevQuestions);

    if (questionNumber >= TOTAL_QUESTIONS) {
      // Complete assessment
      await completeAssessment(newAnswers);
    } else {
      // Show transition and generate next question
      setTransition(transitions[Math.floor(Math.random() * transitions.length)]);
      setTimeout(async () => {
        setTransition(null);
        await generateQuestion(questionNumber + 1, newPrevQuestions);
      }, 1500);
    }
  };

  const completeAssessment = async (finalAnswers: Array<{ question: string; answer: string; traits: string[] }>) => {
    setGenerating(true);
    try {
      const { data: results, error } = await supabase.functions.invoke('student-assessment', {
        body: {
          action: 'generate_results',
          stream,
          marksRange: profile?.marks_range,
          interests: profile?.specific_interests,
          answers: finalAnswers
        }
      });

      if (error) throw error;

      // Save results
      await supabase
        .from('student_assessment_attempts')
        .update({
          completed_at: new Date().toISOString(),
          is_paused: false,
          course_recommendations: results
        })
        .eq('id', attemptId);

      navigate(`/career-assessment/12th-learners/results/${attemptId}`);
    } catch (error) {
      console.error('Error completing assessment:', error);
      toast({
        title: "Error",
        description: "Failed to generate results. Please try again.",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  const handlePause = async () => {
    if (attemptId) {
      await supabase
        .from('student_assessment_attempts')
        .update({
          is_paused: true,
          answers_json: answers
        })
        .eq('id', attemptId);
    }
    navigate('/career-assessment/12th-learners');
  };

  // Show loading during auth check
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground">
            AI is preparing your personalized questions based on your {streamNames[stream]} background...
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            This may take a few moments
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[#0A2E1F] text-white py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePause}
                className="text-white hover:text-white/80"
              >
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
              <div>
                <h1 className="font-semibold">{streamNames[stream]} Assessment</h1>
                <p className="text-sm text-white/70">Chapter {questionNumber} of {TOTAL_QUESTIONS}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/70">Time: {formatTime(elapsedTime)}</p>
            </div>
          </div>
          <Progress 
            value={(questionNumber / TOTAL_QUESTIONS) * 100} 
            className="mt-3 h-2 bg-white/20"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Error state */}
        {error && !generating && (
          <div className="text-center py-16">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Sorry, we couldn't generate questions
            </h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button 
              onClick={() => generateQuestion(questionNumber, previousQuestions)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}

        {/* Generating state */}
        {generating && (
          <div className="text-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground">
              {questionNumber === 1 
                ? `AI is preparing your personalized questions based on your ${streamNames[stream]} background...`
                : questionNumber >= TOTAL_QUESTIONS 
                  ? "Analyzing your responses and generating personalized recommendations..."
                  : "Generating your next scenario..."}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {previousQuestions.length > 0 && questionNumber < TOTAL_QUESTIONS
                ? "Making sure this question is unique for you!"
                : "This may take a moment..."}
            </p>
          </div>
        )}

        {/* Transition message */}
        {transition && !generating && (
          <div className="text-center py-16">
            <p className="text-xl font-medium text-primary animate-pulse">{transition}</p>
          </div>
        )}

        {/* Question display */}
        {currentQuestion && !generating && !transition && !error && (
          <div className="space-y-6">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Scenario {questionNumber}
                  </span>
                </div>
                <p className="text-lg text-foreground leading-relaxed mb-4">
                  {currentQuestion.scenario}
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {currentQuestion.question}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <Card
                  key={option.label}
                  className="cursor-pointer transition-all hover:shadow-md hover:border-primary"
                  onClick={() => handleAnswer(option)}
                >
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-bold text-primary">{option.label}</span>
                    </div>
                    <p className="text-foreground pt-2">{option.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
