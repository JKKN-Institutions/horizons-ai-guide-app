import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, XCircle, Flag, ChevronLeft, ChevronRight, Trophy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { universities, PreviousQuestion } from '@/data/university-entrance-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import confetti from 'canvas-confetti';

interface MockTestConfig {
  universityId: string;
  courseId: string;
  questionCount: number;
  timeLimit: number; // in minutes
}

interface Answer {
  questionIndex: number;
  selectedOption: number | null;
  isMarked: boolean;
}

const STORAGE_KEY = 'tn-mock-test-scores';

export const TNMockTest = () => {
  const navigate = useNavigate();
  const [isConfiguring, setIsConfiguring] = useState(true);
  const [config, setConfig] = useState<MockTestConfig>({
    universityId: '',
    courseId: '',
    questionCount: 10,
    timeLimit: 15,
  });
  const [questions, setQuestions] = useState<PreviousQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0, unattempted: 0 });

  const selectedUniversity = universities.find(u => u.id === config.universityId);
  const availableCourses = selectedUniversity?.courses || [];

  // Timer
  useEffect(() => {
    if (!isConfiguring && !isSubmitted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isConfiguring, isSubmitted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTest = () => {
    const university = universities.find(u => u.id === config.universityId);
    const course = university?.courses.find(c => c.id === config.courseId);
    
    if (!course) return;

    const allQuestions = course.previousQuestions;
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(config.questionCount, allQuestions.length));
    
    setQuestions(selected);
    setAnswers(selected.map((_, i) => ({ questionIndex: i, selectedOption: null, isMarked: false })));
    setTimeRemaining(config.timeLimit * 60);
    setIsConfiguring(false);
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers(prev => prev.map((a, i) => 
      i === currentIndex ? { ...a, selectedOption: optionIndex } : a
    ));
  };

  const toggleMark = () => {
    setAnswers(prev => prev.map((a, i) => 
      i === currentIndex ? { ...a, isMarked: !a.isMarked } : a
    ));
  };

  const handleSubmit = useCallback(() => {
    let correct = 0, wrong = 0, unattempted = 0;
    const topicWise: Record<string, { correct: number; wrong: number; total: number }> = {};
    
    answers.forEach((answer, index) => {
      const question = questions[index];
      const topic = question.topic;
      
      if (!topicWise[topic]) {
        topicWise[topic] = { correct: 0, wrong: 0, total: 0 };
      }
      topicWise[topic].total++;
      
      if (answer.selectedOption === null) {
        unattempted++;
      } else if (answer.selectedOption === question.correctAnswer) {
        correct++;
        topicWise[topic].correct++;
      } else {
        wrong++;
        topicWise[topic].wrong++;
      }
    });

    setScore({ correct, wrong, unattempted });
    setIsSubmitted(true);

    // Save score with topic-wise breakdown
    const stored = localStorage.getItem(STORAGE_KEY);
    const scores = stored ? JSON.parse(stored) : [];
    scores.push({
      universityId: config.universityId,
      courseId: config.courseId,
      correct,
      wrong,
      unattempted,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
      date: new Date().toISOString(),
      topicWise,
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));

    // Celebrate if good score
    if (correct / questions.length >= 0.7) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [answers, questions, config]);

  const resetTest = () => {
    setIsConfiguring(true);
    setIsSubmitted(false);
    setQuestions([]);
    setAnswers([]);
    setCurrentIndex(0);
  };

  if (isConfiguring) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-lg mx-auto space-y-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          <div className="text-center">
            <h1 className="text-2xl font-bold">📝 Mock Test</h1>
            <p className="text-muted-foreground font-tamil">போலித் தேர்வு</p>
          </div>

          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label>University</Label>
                <Select value={config.universityId} onValueChange={(v) => setConfig({ ...config, universityId: v, courseId: '' })}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select university" />
                  </SelectTrigger>
                  <SelectContent>
                    {universities.map(uni => (
                      <SelectItem key={uni.id} value={uni.id}>{uni.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Course</Label>
                <Select value={config.courseId} onValueChange={(v) => setConfig({ ...config, courseId: v })} disabled={!config.universityId}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCourses.map(course => (
                      <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Number of Questions</Label>
                <Select value={config.questionCount.toString()} onValueChange={(v) => setConfig({ ...config, questionCount: parseInt(v) })}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 15, 20, 25].map(n => (
                      <SelectItem key={n} value={n.toString()}>{n} Questions</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Time Limit</Label>
                <Select value={config.timeLimit.toString()} onValueChange={(v) => setConfig({ ...config, timeLimit: parseInt(v) })}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 15, 20, 30, 45, 60].map(n => (
                      <SelectItem key={n} value={n.toString()}>{n} Minutes</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={startTest} 
                className="w-full bg-[#6a0dad] hover:bg-[#5a0b9d] rounded-xl"
                disabled={!config.universityId || !config.courseId}
              >
                Start Mock Test
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    const percentage = Math.round((score.correct / questions.length) * 100);
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-lg mx-auto space-y-6">
          <div className="text-center space-y-4">
            <Trophy className="h-16 w-16 mx-auto text-amber-500" />
            <h1 className="text-2xl font-bold">Test Completed!</h1>
            <p className="text-muted-foreground">தேர்வு முடிந்தது!</p>
          </div>

          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <div className="text-5xl font-bold text-[#6a0dad]">{percentage}%</div>
                <p className="text-muted-foreground">Score</p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <CheckCircle className="h-6 w-6 mx-auto text-green-600 mb-1" />
                  <div className="text-xl font-bold text-green-600">{score.correct}</div>
                  <div className="text-xs text-muted-foreground">Correct</div>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <XCircle className="h-6 w-6 mx-auto text-red-600 mb-1" />
                  <div className="text-xl font-bold text-red-600">{score.wrong}</div>
                  <div className="text-xs text-muted-foreground">Wrong</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="h-6 w-6 mx-auto bg-slate-300 rounded-full mb-1" />
                  <div className="text-xl font-bold text-slate-600">{score.unattempted}</div>
                  <div className="text-xs text-muted-foreground">Skipped</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={resetTest} className="flex-1 gap-2 rounded-xl">
                  <RotateCcw className="h-4 w-4" /> Retry
                </Button>
                <Button onClick={() => navigate(-1)} className="flex-1 bg-[#6a0dad] hover:bg-[#5a0b9d] rounded-xl">
                  Done
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Review Answers */}
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Review Answers</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {questions.map((q, idx) => {
                  const userAnswer = answers[idx].selectedOption;
                  const isCorrect = userAnswer === q.correctAnswer;
                  return (
                    <div key={idx} className={`p-3 rounded-xl border ${isCorrect ? 'border-green-300 bg-green-50 dark:bg-green-900/20' : 'border-red-300 bg-red-50 dark:bg-red-900/20'}`}>
                      <p className="text-sm font-medium mb-1">Q{idx + 1}. {q.question.slice(0, 60)}...</p>
                      <p className="text-xs text-muted-foreground">
                        Your answer: {userAnswer !== null ? q.options[userAnswer] : 'Skipped'} 
                        {!isCorrect && ` | Correct: ${q.options[q.correctAnswer]}`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-lg mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-sm">
            Q {currentIndex + 1}/{questions.length}
          </Badge>
          <Badge className={`${timeRemaining < 60 ? 'bg-red-500' : 'bg-[#6a0dad]'} text-white`}>
            <Clock className="h-3 w-3 mr-1" />
            {formatTime(timeRemaining)}
          </Badge>
        </div>

        <Progress value={(currentIndex + 1) / questions.length * 100} className="h-2" />

        {/* Question Navigation */}
        <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
          {questions.map((_, idx) => {
            const ans = answers[idx];
            let bgClass = 'bg-slate-200 dark:bg-slate-700';
            if (ans.selectedOption !== null) bgClass = 'bg-green-500 text-white';
            if (ans.isMarked) bgClass = 'bg-amber-500 text-white';
            if (idx === currentIndex) bgClass += ' ring-2 ring-[#6a0dad]';
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`min-w-8 h-8 rounded-lg text-xs font-medium ${bgClass}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Question Card */}
        <Card className="rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-4">
              <Badge className={currentQuestion.difficulty === 'Easy' ? 'bg-green-500' : currentQuestion.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-red-500'}>
                {currentQuestion.difficulty}
              </Badge>
              <Button variant="ghost" size="sm" onClick={toggleMark} className={currentAnswer.isMarked ? 'text-amber-500' : ''}>
                <Flag className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-foreground font-medium mb-5">{currentQuestion.question}</p>

            <div className="space-y-2">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    currentAnswer.selectedOption === idx 
                      ? 'border-[#6a0dad] bg-[#6a0dad]/10' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-[#6a0dad]'
                  }`}
                >
                  <span className="font-semibold text-muted-foreground mr-2">({String.fromCharCode(97 + idx)})</span>
                  {option}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))} disabled={currentIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#6a0dad] hover:bg-[#5a0b9d]">Submit Test</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Test?</DialogTitle>
              </DialogHeader>
              <p className="text-muted-foreground">
                Answered: {answers.filter(a => a.selectedOption !== null).length}/{questions.length}<br />
                Marked for review: {answers.filter(a => a.isMarked).length}
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">Cancel</Button>
                <Button onClick={handleSubmit} className="flex-1 bg-[#6a0dad]">Confirm Submit</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))} disabled={currentIndex === questions.length - 1}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
