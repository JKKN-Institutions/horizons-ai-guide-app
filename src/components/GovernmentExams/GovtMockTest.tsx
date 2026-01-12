import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, ChevronLeft, ChevronRight, Flag, CheckCircle, XCircle, Trophy, RotateCcw, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/hooks/useLanguage';
import { Exam, Question, Category } from '@/data/government-exams-data';
import confetti from 'canvas-confetti';

interface GovtMockTestProps {
  exam: Exam;
  category: Category;
  onClose: () => void;
}

interface TestQuestion extends Question {
  marked: boolean;
  answered: boolean;
  selectedOption?: number;
}

const GovtMockTest = ({ exam, category, onClose }: GovtMockTestProps) => {
  const { language } = useLanguage();
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0, unattempted: 0 });
  const [showNavPanel, setShowNavPanel] = useState(false);

  // Initialize test
  useEffect(() => {
    if (exam.pyq.length === 0) return;
    
    const shuffled = [...exam.pyq]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(25, exam.pyq.length))
      .map(q => ({ ...q, marked: false, answered: false, selectedOption: undefined }));
    
    setQuestions(shuffled);
    setTimeLeft(shuffled.length * 60); // 1 minute per question
  }, [exam.pyq]);

  // Timer
  useEffect(() => {
    if (isSubmitted || questions.length === 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isSubmitted, questions.length]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionIndex: number) => {
    if (isSubmitted) return;
    
    setQuestions(prev => prev.map((q, idx) => 
      idx === currentIndex 
        ? { ...q, selectedOption: optionIndex, answered: true }
        : q
    ));
  };

  const handleMark = () => {
    setQuestions(prev => prev.map((q, idx) => 
      idx === currentIndex ? { ...q, marked: !q.marked } : q
    ));
  };

  const handleSubmit = useCallback(() => {
    const correct = questions.filter(q => q.selectedOption === q.answer).length;
    const incorrect = questions.filter(q => q.answered && q.selectedOption !== q.answer).length;
    const unattempted = questions.filter(q => !q.answered).length;
    
    setScore({ correct, incorrect, unattempted });
    setIsSubmitted(true);
    
    if (correct >= questions.length * 0.7) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [questions]);

  const handleRetry = () => {
    const shuffled = [...exam.pyq]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(25, exam.pyq.length))
      .map(q => ({ ...q, marked: false, answered: false, selectedOption: undefined }));
    
    setQuestions(shuffled);
    setCurrentIndex(0);
    setTimeLeft(shuffled.length * 60);
    setIsSubmitted(false);
    setScore({ correct: 0, incorrect: 0, unattempted: 0 });
  };

  if (exam.pyq.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className={`bg-gradient-to-r ${category.color} text-white p-4`}>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-bold mb-2">{language === 'ta' ? 'கேள்விகள் விரைவில்' : 'Questions Coming Soon'}</h2>
              <p className="text-muted-foreground mb-4">
                {language === 'ta' 
                  ? 'இந்த தேர்வுக்கான மாதிரி தேர்வு கேள்விகள் விரைவில் சேர்க்கப்படும்.'
                  : 'Mock test questions for this exam will be added soon.'}
              </p>
              <Button onClick={onClose}>{language === 'ta' ? 'திரும்பு' : 'Go Back'}</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (isSubmitted) {
    const percentage = Math.round((score.correct / questions.length) * 100);
    const isPassed = percentage >= 40;
    
    return (
      <div className="min-h-screen bg-background">
        <div className={`bg-gradient-to-r ${category.color} text-white p-4`}>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-bold">{language === 'ta' ? 'தேர்வு முடிவுகள்' : 'Test Results'}</h1>
          </div>
        </div>
        
        <div className="container max-w-2xl mx-auto p-4 space-y-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <Card className={isPassed ? 'border-emerald-300 bg-emerald-50/50 dark:bg-emerald-900/20' : 'border-red-300 bg-red-50/50 dark:bg-red-900/20'}>
              <CardContent className="p-6 text-center">
                <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-4 ${isPassed ? 'bg-emerald-100 dark:bg-emerald-800' : 'bg-red-100 dark:bg-red-800'}`}>
                  {isPassed ? (
                    <Trophy className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <h2 className="text-3xl font-bold text-foreground">{percentage}%</h2>
                <p className="text-lg text-muted-foreground mb-2">
                  {score.correct} / {questions.length} {language === 'ta' ? 'சரி' : 'Correct'}
                </p>
                <Badge variant={isPassed ? 'default' : 'destructive'} className="text-sm">
                  {isPassed ? (language === 'ta' ? 'தேர்ச்சி!' : 'Passed!') : (language === 'ta' ? 'தோல்வி' : 'Need Improvement')}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
          
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-emerald-200">
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-6 w-6 mx-auto text-emerald-600 mb-1" />
                <p className="text-2xl font-bold text-emerald-600">{score.correct}</p>
                <p className="text-xs text-muted-foreground">{language === 'ta' ? 'சரி' : 'Correct'}</p>
              </CardContent>
            </Card>
            <Card className="border-red-200">
              <CardContent className="p-4 text-center">
                <XCircle className="h-6 w-6 mx-auto text-red-600 mb-1" />
                <p className="text-2xl font-bold text-red-600">{score.incorrect}</p>
                <p className="text-xs text-muted-foreground">{language === 'ta' ? 'தவறு' : 'Wrong'}</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="h-6 w-6 mx-auto rounded-full border-2 border-gray-400 mb-1" />
                <p className="text-2xl font-bold text-gray-600">{score.unattempted}</p>
                <p className="text-xs text-muted-foreground">{language === 'ta' ? 'முயற்சிக்கவில்லை' : 'Skipped'}</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{language === 'ta' ? 'விடைகள் விமர்சனம்' : 'Answer Review'}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 max-h-80 overflow-y-auto space-y-3">
              {questions.map((q, idx) => {
                const isCorrect = q.selectedOption === q.answer;
                const wasAnswered = q.answered;
                
                return (
                  <div key={q.id} className={`p-3 rounded-lg border ${wasAnswered ? (isCorrect ? 'border-emerald-200 bg-emerald-50/50 dark:bg-emerald-900/20' : 'border-red-200 bg-red-50/50 dark:bg-red-900/20') : 'border-gray-200 bg-gray-50/50 dark:bg-gray-800/50'}`}>
                    <p className="text-sm font-medium text-foreground mb-2">
                      Q{idx + 1}. {language === 'ta' && q.questionTamil ? q.questionTamil : q.question}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">{language === 'ta' ? 'உங்கள் பதில்:' : 'Your answer:'}</span>
                      <span className={wasAnswered ? (isCorrect ? 'text-emerald-600' : 'text-red-600') : 'text-gray-500'}>
                        {wasAnswered ? q.options[q.selectedOption!] : (language === 'ta' ? 'முயற்சிக்கவில்லை' : 'Not attempted')}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="flex items-center gap-2 text-xs mt-1">
                        <span className="text-muted-foreground">{language === 'ta' ? 'சரியான பதில்:' : 'Correct:'}</span>
                        <span className="text-emerald-600 font-medium">{q.options[q.answer]}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              {language === 'ta' ? 'மூடு' : 'Close'}
            </Button>
            <Button onClick={handleRetry} className="flex-1 gap-2">
              <RotateCcw className="h-4 w-4" />
              {language === 'ta' ? 'மீண்டும் முயற்சி' : 'Retry'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className={`bg-gradient-to-r ${category.color} text-white p-3 sticky top-0 z-20`}>
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20 gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{language === 'ta' ? 'வெளியேறு' : 'Exit'}</span>
          </Button>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className={`font-mono font-bold ${timeLeft < 60 ? 'text-red-200 animate-pulse' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowNavPanel(!showNavPanel)}
            className="text-white hover:bg-white/20"
          >
            {currentIndex + 1}/{questions.length}
          </Button>
        </div>
        <Progress value={progress} className="h-1 mt-2 bg-white/30" />
      </div>

      {/* Navigation Panel */}
      <AnimatePresence>
        {showNavPanel && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-muted/50 border-b overflow-hidden"
          >
            <div className="p-3">
              <div className="flex flex-wrap gap-2 justify-center">
                {questions.map((q, idx) => {
                  let bgClass = 'bg-muted hover:bg-muted/80';
                  if (q.answered) bgClass = 'bg-emerald-500 text-white';
                  if (q.marked) bgClass = 'bg-amber-500 text-white';
                  if (idx === currentIndex) bgClass += ' ring-2 ring-primary';
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => { setCurrentIndex(idx); setShowNavPanel(false); }}
                      className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${bgClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-center gap-4 mt-3 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-emerald-500" /> {language === 'ta' ? 'பதிலளித்தது' : 'Answered'}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-amber-500" /> {language === 'ta' ? 'குறிக்கப்பட்டது' : 'Marked'}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-muted border" /> {language === 'ta' ? 'பதிலளிக்கவில்லை' : 'Unanswered'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question */}
      <div className="flex-1 p-4 pb-24 overflow-y-auto">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <Badge variant="outline" className="text-xs">
                  {currentQuestion.subject} • {currentQuestion.difficulty}
                </Badge>
                <Button
                  variant={currentQuestion.marked ? 'default' : 'ghost'}
                  size="sm"
                  onClick={handleMark}
                  className={`gap-1 ${currentQuestion.marked ? 'bg-amber-500 hover:bg-amber-600' : ''}`}
                >
                  <Flag className="h-3 w-3" />
                  {currentQuestion.marked ? (language === 'ta' ? 'குறிக்கப்பட்டது' : 'Marked') : (language === 'ta' ? 'குறி' : 'Mark')}
                </Button>
              </div>
              
              <p className="text-base font-medium text-foreground mb-6">
                {language === 'ta' && currentQuestion.questionTamil 
                  ? currentQuestion.questionTamil 
                  : currentQuestion.question}
              </p>
              
              <div className="space-y-3">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = currentQuestion.selectedOption === idx;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-3 ${
                        isSelected 
                          ? 'border-primary bg-primary/10 ring-2 ring-primary' 
                          : 'border-muted bg-muted/30 hover:bg-muted/50'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted border'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 text-foreground">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-3 safe-area-inset-bottom">
        <div className="flex items-center justify-between gap-2 max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            {language === 'ta' ? 'முந்தைய' : 'Prev'}
          </Button>
          
          {currentIndex === questions.length - 1 ? (
            <Button onClick={handleSubmit} className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700">
              <CheckCircle className="h-4 w-4" />
              {language === 'ta' ? 'சமர்ப்பி' : 'Submit Test'}
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
              className="flex-1 gap-1"
            >
              {language === 'ta' ? 'அடுத்து' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GovtMockTest;
