import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Clock, ChevronLeft, ChevronRight, Check, X, AlertTriangle,
  Trophy, Target, Timer, BarChart3, Pause, Play, Flag,
  BookOpen, TrendingUp, TrendingDown, Award, Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { PYQQuestion, PYQExam } from '@/data/pyq-database';
import { useMockTestScores } from '@/hooks/useMockTestScores';

interface MockTestProps {
  exam: PYQExam;
  questions: PYQQuestion[];
  onExit: () => void;
}

interface TestResult {
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  totalMarks: number;
  obtainedMarks: number;
  accuracy: number;
  timeTaken: number;
  timePerQuestion: number;
  subjectWise: Record<string, { total: number; correct: number; incorrect: number; unattempted: number }>;
  difficultyWise: Record<string, { total: number; correct: number }>;
  questionAnalysis: Array<{
    question: PYQQuestion;
    userAnswer: string | null;
    isCorrect: boolean;
    timeTaken: number;
  }>;
}

export const MockTest = ({ exam, questions, onExit }: MockTestProps) => {
  const { addScore } = useMockTestScores();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  const [questionTimes, setQuestionTimes] = useState<Record<string, number>>({});
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState(Date.now());
  
  // Timer state
  const totalTimeInSeconds = exam.duration * 60;
  const [remainingTime, setRemainingTime] = useState(totalTimeInSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [testStartTime] = useState(Date.now());
  
  // Test state
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const currentQuestion = questions[currentIndex];

  // Timer effect
  useEffect(() => {
    if (isPaused || isTestComplete) return;

    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, isTestComplete]);

  // Track time spent on current question
  const saveCurrentQuestionTime = useCallback(() => {
    const timeSpent = Math.floor((Date.now() - currentQuestionStartTime) / 1000);
    setQuestionTimes(prev => ({
      ...prev,
      [currentQuestion.id]: (prev[currentQuestion.id] || 0) + timeSpent
    }));
  }, [currentQuestion?.id, currentQuestionStartTime]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    const percentRemaining = (remainingTime / totalTimeInSeconds) * 100;
    if (percentRemaining > 50) return 'text-emerald-600';
    if (percentRemaining > 25) return 'text-amber-600';
    return 'text-red-600';
  };

  const handleSelectAnswer = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleNavigate = (index: number) => {
    saveCurrentQuestionTime();
    setCurrentIndex(index);
    setCurrentQuestionStartTime(Date.now());
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      handleNavigate(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      handleNavigate(currentIndex - 1);
    }
  };

  const handleMarkForReview = () => {
    setMarkedForReview(prev =>
      prev.includes(currentQuestion.id)
        ? prev.filter(id => id !== currentQuestion.id)
        : [...prev, currentQuestion.id]
    );
  };

  const handleClearAnswer = () => {
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestion.id];
      return newAnswers;
    });
  };

  const handleAutoSubmit = () => {
    toast.warning('Time\'s up! Submitting your test...');
    calculateResults();
  };

  const handleSubmit = () => {
    setShowSubmitDialog(true);
  };

  const confirmSubmit = () => {
    setShowSubmitDialog(false);
    calculateResults();
  };

  const calculateResults = () => {
    saveCurrentQuestionTime();
    
    const totalTimeTaken = Math.floor((Date.now() - testStartTime) / 1000);
    
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    
    const subjectWise: Record<string, { total: number; correct: number; incorrect: number; unattempted: number }> = {};
    const difficultyWise: Record<string, { total: number; correct: number }> = {};
    
    const questionAnalysis = questions.map(q => {
      const userAnswer = answers[q.id] || null;
      const isCorrect = userAnswer === q.correctAnswer;
      const timeTaken = questionTimes[q.id] || 0;
      
      // Count stats
      if (!userAnswer) {
        unattempted++;
      } else if (isCorrect) {
        correct++;
      } else {
        incorrect++;
      }
      
      // Subject-wise
      if (!subjectWise[q.subject]) {
        subjectWise[q.subject] = { total: 0, correct: 0, incorrect: 0, unattempted: 0 };
      }
      subjectWise[q.subject].total++;
      if (!userAnswer) {
        subjectWise[q.subject].unattempted++;
      } else if (isCorrect) {
        subjectWise[q.subject].correct++;
      } else {
        subjectWise[q.subject].incorrect++;
      }
      
      // Difficulty-wise
      if (!difficultyWise[q.difficulty]) {
        difficultyWise[q.difficulty] = { total: 0, correct: 0 };
      }
      difficultyWise[q.difficulty].total++;
      if (isCorrect) {
        difficultyWise[q.difficulty].correct++;
      }
      
      return { question: q, userAnswer, isCorrect, timeTaken };
    });
    
    const attempted = correct + incorrect;
    const obtainedMarks = (correct * 4) - (incorrect * 1);
    const totalMarks = questions.length * 4;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    const timePerQuestion = Math.round(totalTimeTaken / questions.length);
    
    const result: TestResult = {
      totalQuestions: questions.length,
      attempted,
      correct,
      incorrect,
      unattempted,
      totalMarks,
      obtainedMarks: Math.max(0, obtainedMarks),
      accuracy,
      timeTaken: totalTimeTaken,
      timePerQuestion,
      subjectWise,
      difficultyWise,
      questionAnalysis
    };
    
    setTestResult(result);
    
    // Save score to localStorage
    addScore({
      examId: exam.id,
      examName: typeof exam.name === 'string' ? exam.name : exam.name.en,
      totalQuestions: questions.length,
      attempted,
      correct,
      incorrect,
      unattempted,
      totalMarks,
      obtainedMarks: Math.max(0, obtainedMarks),
      accuracy,
      timeTaken: totalTimeTaken,
      timePerQuestion,
      subjectWise,
      difficultyWise,
    });
    
    toast.success('Score saved to your history!');
    setIsTestComplete(true);
  };

  // Question status helpers
  const getQuestionStatus = (questionId: string) => {
    const isAnswered = answers[questionId] !== undefined;
    const isMarked = markedForReview.includes(questionId);
    
    if (isMarked && isAnswered) return 'answered-marked';
    if (isMarked) return 'marked';
    if (isAnswered) return 'answered';
    return 'not-visited';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered': return 'bg-emerald-500 text-white';
      case 'marked': return 'bg-purple-500 text-white';
      case 'answered-marked': return 'bg-blue-500 text-white';
      case 'not-visited': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted';
    }
  };

  const stats = useMemo(() => ({
    answered: Object.keys(answers).length,
    marked: markedForReview.length,
    notVisited: questions.length - Object.keys(answers).length
  }), [answers, markedForReview, questions.length]);

  // Results View
  if (isTestComplete && testResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">{exam.name.en} - Results</h1>
                <p className="text-primary-foreground/80">Mock Test Completed</p>
              </div>
              <Button variant="secondary" onClick={onExit}>
                Exit to Practice
              </Button>
            </div>
          </div>

          {/* Score Card */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-none shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
              <CardContent className="p-6 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">{testResult.obtainedMarks}/{testResult.totalMarks}</div>
                <div className="text-sm opacity-80">Score</div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">{testResult.accuracy}%</div>
                <div className="text-sm opacity-80">Accuracy</div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">{formatTime(testResult.timeTaken)}</div>
                <div className="text-sm opacity-80">Time Taken</div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white">
              <CardContent className="p-6 text-center">
                <Zap className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">{testResult.timePerQuestion}s</div>
                <div className="text-sm opacity-80">Avg per Question</div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Stats */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Question Breakdown */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Question Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span className="font-medium text-emerald-700">Correct</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-emerald-600">{testResult.correct}</span>
                    <span className="text-sm text-emerald-600 ml-1">(+{testResult.correct * 4})</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-red-700">Incorrect</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-red-600">{testResult.incorrect}</span>
                    <span className="text-sm text-red-600 ml-1">(-{testResult.incorrect})</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-700">Unattempted</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-600">{testResult.unattempted}</span>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Attempt Rate</span>
                    <span className="font-medium">{Math.round((testResult.attempted / testResult.totalQuestions) * 100)}%</span>
                  </div>
                  <Progress value={(testResult.attempted / testResult.totalQuestions) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Subject-wise Performance */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Subject-wise Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[280px]">
                  <div className="space-y-3">
                    {Object.entries(testResult.subjectWise).map(([subject, data]) => {
                      const accuracy = data.total - data.unattempted > 0 
                        ? Math.round((data.correct / (data.total - data.unattempted)) * 100) 
                        : 0;
                      return (
                        <div key={subject} className="p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{subject}</span>
                            <Badge variant={accuracy >= 70 ? 'default' : accuracy >= 50 ? 'secondary' : 'destructive'}>
                              {accuracy}%
                            </Badge>
                          </div>
                          <div className="flex gap-2 text-xs">
                            <span className="text-emerald-600">✓ {data.correct}</span>
                            <span className="text-red-600">✗ {data.incorrect}</span>
                            <span className="text-gray-500">○ {data.unattempted}</span>
                          </div>
                          <Progress value={(data.correct / data.total) * 100} className="h-1.5 mt-2" />
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Difficulty Analysis */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Difficulty-wise Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {['Easy', 'Moderate', 'Hard'].map(diff => {
                  const data = testResult.difficultyWise[diff] || { total: 0, correct: 0 };
                  const accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                  const colors = {
                    Easy: 'from-emerald-400 to-emerald-500',
                    Moderate: 'from-amber-400 to-amber-500',
                    Hard: 'from-red-400 to-red-500'
                  };
                  return (
                    <div key={diff} className={`bg-gradient-to-br ${colors[diff as keyof typeof colors]} rounded-xl p-4 text-white text-center`}>
                      <div className="text-sm font-medium opacity-90">{diff}</div>
                      <div className="text-3xl font-bold my-2">{data.correct}/{data.total}</div>
                      <div className="text-sm opacity-80">{accuracy}% accuracy</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Question Review */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Question-wise Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {testResult.questionAnalysis.map((item, idx) => (
                    <div 
                      key={item.question.id}
                      className={`p-4 rounded-lg border ${
                        item.isCorrect 
                          ? 'bg-emerald-50 border-emerald-200' 
                          : item.userAnswer 
                            ? 'bg-red-50 border-red-200'
                            : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold">Q.{idx + 1}</span>
                            <Badge variant="outline" className="text-xs">{item.question.subject}</Badge>
                            <Badge variant="outline" className="text-xs">{item.question.difficulty}</Badge>
                            {item.isCorrect ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : item.userAnswer ? (
                              <X className="w-4 h-4 text-red-600" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {item.question.question.en}
                          </p>
                          <div className="flex gap-4 text-sm">
                            <span>
                              Your Answer: <strong className={item.isCorrect ? 'text-emerald-600' : 'text-red-600'}>
                                {item.userAnswer || 'Not attempted'}
                              </strong>
                            </span>
                            {!item.isCorrect && (
                              <span>
                                Correct: <strong className="text-emerald-600">{item.question.correctAnswer}</strong>
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {item.timeTaken}s
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Test View
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header with Timer */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setShowExitDialog(true)}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Exit
              </Button>
              <div>
                <h1 className="font-semibold text-sm md:text-base">{exam.name.en}</h1>
                <p className="text-xs text-muted-foreground">Mock Test</p>
              </div>
            </div>

            {/* Timer */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-muted ${getTimeColor()}`}>
              <Timer className="w-5 h-5" />
              <span className="font-mono text-lg font-bold">{formatTime(remainingTime)}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0"
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </Button>
            </div>

            <Button onClick={handleSubmit} className="bg-primary">
              Submit Test
            </Button>
          </div>
        </div>
      </header>

      {/* Pause Overlay */}
      {isPaused && (
        <div className="fixed inset-0 bg-background/95 z-40 flex items-center justify-center">
          <Card className="p-8 text-center">
            <Pause className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Test Paused</h2>
            <p className="text-muted-foreground mb-4">Click resume to continue</p>
            <Button onClick={() => setIsPaused(false)}>
              <Play className="w-4 h-4 mr-2" />
              Resume Test
            </Button>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-3 space-y-4">
            {/* Question Card */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Question {currentIndex + 1} of {questions.length}</Badge>
                    <Badge variant="secondary">{currentQuestion.subject}</Badge>
                    <Badge className={
                      currentQuestion.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
                      currentQuestion.difficulty === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }>
                      {currentQuestion.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>+{currentQuestion.marks} / -{currentQuestion.negativeMarks}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-lg mb-6 leading-relaxed">{currentQuestion.question.en}</p>

                <div className="space-y-3">
                  {currentQuestion.options.en.map(option => (
                    <div
                      key={option.id}
                      onClick={() => handleSelectAnswer(option.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        answers[currentQuestion.id] === option.id
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                          answers[currentQuestion.id] === option.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}>
                          {option.id}
                        </div>
                        <span>{option.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleClearAnswer} disabled={!answers[currentQuestion.id]}>
                  Clear
                </Button>
                <Button 
                  variant={markedForReview.includes(currentQuestion.id) ? 'default' : 'outline'}
                  onClick={handleMarkForReview}
                >
                  <Flag className="w-4 h-4 mr-2" />
                  {markedForReview.includes(currentQuestion.id) ? 'Marked' : 'Mark for Review'}
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0}>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={currentIndex === questions.length - 1}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>

          {/* Question Palette */}
          <div className="lg:col-span-1">
            <Card className="border-none shadow-md sticky top-24">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Question Palette</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-emerald-500" />
                    <span>Answered ({stats.answered})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-purple-500" />
                    <span>Marked ({stats.marked})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-muted" />
                    <span>Not Visited ({stats.notVisited})</span>
                  </div>
                </div>

                {/* Question Grid */}
                <ScrollArea className="h-[300px]">
                  <div className="grid grid-cols-5 gap-2">
                    {questions.map((q, idx) => {
                      const status = getQuestionStatus(q.id);
                      return (
                        <button
                          key={q.id}
                          onClick={() => handleNavigate(idx)}
                          className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${getStatusColor(status)} ${
                            idx === currentIndex ? 'ring-2 ring-primary ring-offset-2' : ''
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Submit Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-2 mt-2">
                <p>You have answered <strong>{stats.answered}</strong> out of <strong>{questions.length}</strong> questions.</p>
                {stats.marked > 0 && (
                  <p className="text-amber-600">You have <strong>{stats.marked}</strong> questions marked for review.</p>
                )}
                <p className="text-muted-foreground">Are you sure you want to submit?</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Test</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSubmit}>Submit Test</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Exit Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be lost. Are you sure you want to exit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onExit} className="bg-destructive text-destructive-foreground">
              Exit Test
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MockTest;
