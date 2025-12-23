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
import { 
  getQuestionsByStream, 
  selectQuestionsForUser, 
  calculateTraitScores, 
  getTopTraits, 
  getCourseRecommendations,
  type Question 
} from "@/constants/questions";
import type { StreamType } from "@/constants/questions/types";

type StudentStream = Database['public']['Enums']['student_stream'];

const validStreams: StudentStream[] = ['pcm', 'pcb', 'pcmb', 'commerce', 'arts'];

const streamNames: Record<string, string> = {
  pcm: "Science (PCM)",
  pcb: "Science (PCB)",
  pcmb: "Science (PCMB)",
  commerce: "Commerce",
  arts: "Arts / Humanities"
};

const TOTAL_QUESTIONS = 20;

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
  const { user } = useAuth();
  const streamParam = searchParams.get('stream') || 'pcm';
  const stream: StudentStream = validStreams.includes(streamParam as StudentStream) 
    ? (streamParam as StudentStream) 
    : 'pcm';

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [transition, setTransition] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [needsReset, setNeedsReset] = useState(false);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize assessment - NO LOGIN REQUIRED
  useEffect(() => {
    initializeAssessment();
  }, [stream, user]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const initializeAssessment = async () => {
    setLoading(true);
    
    try {
      // Get all questions for this stream
      const allQuestions = getQuestionsByStream(stream as StreamType);
      
      let seenQuestionIds: string[] = [];
      
      if (user) {
        // Get seen questions from database for logged-in users
        const { data: historyData } = await supabase
          .from('student_question_history')
          .select('question_hash')
          .eq('user_id', user.id)
          .eq('stream', stream);
        
        seenQuestionIds = historyData?.map(h => h.question_hash) || [];
        
        // Check for paused attempt
        const { data: pausedAttempt } = await supabase
          .from('student_assessment_attempts')
          .select('*')
          .eq('user_id', user.id)
          .eq('stream', stream)
          .eq('is_paused', true)
          .maybeSingle();

        if (pausedAttempt) {
          // Resume paused attempt
          setAttemptId(pausedAttempt.id);
          const savedQuestions = pausedAttempt.questions_json as unknown as Question[];
          const savedAnswers = (pausedAttempt.answers_json as unknown as Record<string, string>) || {};
          setQuestions(savedQuestions || []);
          setAnswers(savedAnswers);
          setCurrentQuestionIndex(pausedAttempt.current_question);
          setLoading(false);
          return;
        }
        
        // Create new attempt
        const { data: attempts } = await supabase
          .from('student_assessment_attempts')
          .select('attempt_number')
          .eq('user_id', user.id)
          .eq('stream', stream)
          .order('attempt_number', { ascending: false })
          .limit(1);

        const newAttemptNumber = (attempts && attempts.length > 0) ? attempts[0].attempt_number + 1 : 1;

        const { data: newAttempt } = await supabase
          .from('student_assessment_attempts')
          .insert({
            user_id: user.id,
            stream: stream,
            attempt_number: newAttemptNumber,
            total_questions: TOTAL_QUESTIONS
          })
          .select()
          .single();

        if (newAttempt) {
          setAttemptId(newAttempt.id);
        }
      } else {
        // Get seen questions from localStorage for anonymous users
        const localHistory = localStorage.getItem(`seen_questions_${stream}`);
        seenQuestionIds = localHistory ? JSON.parse(localHistory) : [];
      }

      // Select questions user hasn't seen
      const { questions: selectedQuestions, needsReset: resetNeeded } = selectQuestionsForUser(
        allQuestions, 
        seenQuestionIds, 
        TOTAL_QUESTIONS
      );

      if (resetNeeded) {
        setNeedsReset(true);
        // Clear history for fresh start
        if (user) {
          await supabase
            .from('student_question_history')
            .delete()
            .eq('user_id', user.id)
            .eq('stream', stream);
        } else {
          localStorage.removeItem(`seen_questions_${stream}`);
        }
        toast({
          title: "Fresh Start! 🎉",
          description: "You've seen all our questions! Starting with a fresh set.",
        });
      }

      setQuestions(selectedQuestions);
      
      // Save selected questions to attempt
      if (user && attemptId) {
        await supabase
          .from('student_assessment_attempts')
          .update({ questions_json: selectedQuestions as unknown as Json })
          .eq('id', attemptId);
      }
    } catch (error) {
      console.error('Error initializing assessment:', error);
      toast({
        title: "Error",
        description: "Failed to load questions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (questionId: string, optionId: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(o => o.id === optionId);
    
    if (!selectedOption) return;

    // Save answer
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    // Track seen question
    if (user) {
      // Save to database
      await supabase
        .from('student_question_history')
        .insert({
          user_id: user.id,
          attempt_id: attemptId,
          stream: stream,
          question_text: currentQuestion.scenario,
          question_hash: questionId,
          options: currentQuestion.options as unknown as Json,
          user_answer: optionId,
          answered_at: new Date().toISOString()
        });

      // Update attempt progress
      if (attemptId) {
        await supabase
          .from('student_assessment_attempts')
          .update({
            current_question: currentQuestionIndex + 1,
            answers_json: newAnswers as unknown as Json
          })
          .eq('id', attemptId);
      }
    } else {
      // Save to localStorage for anonymous users
      const localHistory = localStorage.getItem(`seen_questions_${stream}`);
      const seenIds = localHistory ? JSON.parse(localHistory) : [];
      seenIds.push(questionId);
      localStorage.setItem(`seen_questions_${stream}`, JSON.stringify(seenIds));
      localStorage.setItem(`current_answers_${stream}`, JSON.stringify(newAnswers));
    }

    // Check if assessment is complete
    if (currentQuestionIndex >= TOTAL_QUESTIONS - 1) {
      await completeAssessment(newAnswers);
    } else {
      // Show transition and move to next question
      setTransition(transitions[Math.floor(Math.random() * transitions.length)]);
      setTimeout(() => {
        setTransition(null);
        setCurrentQuestionIndex(prev => prev + 1);
      }, 1200);
    }
  };

  const completeAssessment = async (finalAnswers: Record<string, string>) => {
    setLoading(true);
    
    try {
      // Calculate results locally
      const traitScores = calculateTraitScores(questions, finalAnswers);
      const topTraits = getTopTraits(traitScores);
      const recommendations = getCourseRecommendations(stream as StreamType, traitScores);

      const results = {
        topTraits,
        traitScores,
        recommendations,
        completedAt: new Date().toISOString()
      };

      if (user && attemptId) {
        // Save results to database
        await supabase
          .from('student_assessment_attempts')
          .update({
            completed_at: new Date().toISOString(),
            is_paused: false,
            course_recommendations: results as unknown as Json
          })
          .eq('id', attemptId);

        // Update completed attempts count
        navigate(`/career-assessment/12th-learners/results/${attemptId}`);
      } else {
        // Save results to localStorage and navigate with results in state
        const localAttempts = localStorage.getItem('completed_attempts');
        const newCount = (localAttempts ? parseInt(localAttempts) : 0) + 1;
        localStorage.setItem('completed_attempts', newCount.toString());
        localStorage.setItem(`assessment_results_${stream}`, JSON.stringify(results));
        
        navigate('/career-assessment/12th-learners/results/local', { state: { results, stream } });
      }
    } catch (error) {
      console.error('Error completing assessment:', error);
      toast({
        title: "Error",
        description: "Failed to generate results. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePause = async () => {
    if (user && attemptId) {
      await supabase
        .from('student_assessment_attempts')
        .update({
          is_paused: true,
          current_question: currentQuestionIndex,
          answers_json: answers as unknown as Json,
          questions_json: questions as unknown as Json
        })
        .eq('id', attemptId);
    } else {
      // Save progress to localStorage
      localStorage.setItem(`paused_assessment_${stream}`, JSON.stringify({
        questions,
        answers,
        currentQuestionIndex,
        elapsedTime
      }));
    }
    navigate('/career-assessment/12th-learners');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background page-transition flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground">
            Preparing your personalized questions...
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            This will only take a moment
          </p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background page-transition flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Unable to load questions
          </h2>
          <p className="text-muted-foreground mb-6">Please try again</p>
          <Button 
            onClick={() => initializeAssessment()}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;

  return (
    <div className="min-h-screen bg-background page-transition">
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
                <p className="text-sm text-white/70">Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/70">Time: {formatTime(elapsedTime)}</p>
            </div>
          </div>
          <Progress 
            value={progress} 
            className="mt-3 h-2 bg-white/20"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Transition message */}
        {transition && (
          <div className="text-center py-16">
            <p className="text-xl font-medium text-primary animate-pulse">{transition}</p>
          </div>
        )}

        {/* Question display */}
        {!transition && currentQuestion && (
          <div className="space-y-6">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Scenario {currentQuestionIndex + 1}
                  </span>
                </div>
                <p className="text-lg text-foreground leading-relaxed">
                  {currentQuestion.scenario}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <Card
                  key={option.id}
                  className="cursor-pointer transition-all hover:shadow-md hover:border-primary"
                  onClick={() => handleAnswer(currentQuestion.id, option.id)}
                >
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-bold text-primary">{option.id}</span>
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
