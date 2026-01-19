import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileText, Lightbulb, Play, RotateCcw, Trophy, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { universities } from '@/data/university-entrance-data';
import { ExamPatternCard } from './ExamPatternCard';
import { SyllabusAccordion } from './SyllabusAccordion';
import { PYQSection } from './PYQSection';
import { SeatMatrixCutoffs } from './SeatMatrixCutoffs';

type QuizMode = 'browse' | 'quiz';

export const CourseDetail = () => {
  const { universityId, courseId } = useParams<{ universityId: string; courseId: string }>();
  const navigate = useNavigate();
  const [quizMode, setQuizMode] = useState<QuizMode>('browse');
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const university = universities.find(u => u.id === universityId);
  const course = university?.courses.find(c => c.id === courseId);

  if (!university || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Course Not Found</h1>
          <p className="text-muted-foreground mb-4">The course you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/career-assessment/colleges')}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const startQuizMode = () => {
    setQuizMode('quiz');
    setQuizScore({ correct: 0, total: 0 });
    setQuizAnswers({});
  };

  const endQuizMode = () => {
    setQuizMode('browse');
  };

  const handleQuizAnswer = (questionId: string, selectedIndex: number, isCorrect: boolean) => {
    if (quizAnswers[questionId] === undefined) {
      setQuizAnswers(prev => ({ ...prev, [questionId]: selectedIndex }));
      setQuizScore(prev => ({
        correct: isCorrect ? prev.correct + 1 : prev.correct,
        total: prev.total + 1
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/tn-university-entrance/${universityId}`)}
          className="gap-2 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {university.name}
        </Button>

        {/* Course Header */}
        <div className="flex items-start gap-4">
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
            style={{ backgroundColor: university.logoColor }}
          >
            {course.name.slice(0, 3)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary">{course.type}</Badge>
              <Badge className="bg-[#6a0dad]/10 text-[#6a0dad] dark:bg-[#9333ea]/20 dark:text-[#c084fc]">
                {university.examName}
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-1">
              {course.name}
            </h1>
            <p className="text-muted-foreground font-tamil text-lg">{course.nameTamil}</p>
          </div>
        </div>

        {/* Exam Pattern */}
        <ExamPatternCard pattern={course.examPattern} />

        {/* Seat Matrix & Cutoffs - Show before tabs if available */}
        {(course.seatMatrix || course.cutoffs) && (
          <SeatMatrixCutoffs 
            seatMatrix={course.seatMatrix} 
            cutoffs={course.cutoffs} 
            courseName={course.name} 
          />
        )}

        {/* Tabs */}
        <Tabs defaultValue="syllabus" className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
            <TabsTrigger 
              value="syllabus" 
              className="gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Syllabus</span>
            </TabsTrigger>
            <TabsTrigger 
              value="pyq" 
              className="gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">PYQ</span>
              <Badge variant="secondary" className="ml-1 text-xs">
                {course.previousQuestions.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="tips" 
              className="gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">Tips</span>
            </TabsTrigger>
          </TabsList>

          {/* Syllabus Tab */}
          <TabsContent value="syllabus" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  📚 Complete Syllabus
                </h3>
                <Badge variant="outline">
                  {course.syllabus.reduce((acc, unit) => acc + unit.expectedQuestions, 0)} Questions
                </Badge>
              </div>
              <SyllabusAccordion syllabus={course.syllabus} />
            </div>
          </TabsContent>

          {/* PYQ Tab */}
          <TabsContent value="pyq" className="mt-4">
            <div className="space-y-4">
              {/* Quiz Mode Controls */}
              <Card className="bg-gradient-to-r from-[#6a0dad]/10 to-[#9333ea]/10 dark:from-[#6a0dad]/20 dark:to-[#9333ea]/20 border-[#6a0dad]/30 rounded-xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        {quizMode === 'quiz' ? (
                          <>
                            <Target className="h-5 w-5 text-[#6a0dad]" />
                            Quiz Mode Active
                          </>
                        ) : (
                          <>
                            <Play className="h-5 w-5 text-[#6a0dad]" />
                            Practice Mode
                          </>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {quizMode === 'quiz' 
                          ? `Score: ${quizScore.correct}/${quizScore.total} correct`
                          : 'Start a timed quiz or browse questions'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {quizMode === 'quiz' ? (
                        <>
                          <Button variant="outline" onClick={endQuizMode} className="gap-1">
                            <RotateCcw className="h-4 w-4" />
                            End Quiz
                          </Button>
                          {quizScore.total === course.previousQuestions.length && (
                            <Badge className="bg-green-500 text-white px-3 py-2 text-sm">
                              <Trophy className="h-4 w-4 mr-1" />
                              {Math.round((quizScore.correct / quizScore.total) * 100)}%
                            </Badge>
                          )}
                        </>
                      ) : (
                        <Button onClick={startQuizMode} className="gap-2 bg-[#6a0dad] hover:bg-[#5a0b9d]">
                          <Play className="h-4 w-4" />
                          Start Quiz
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Questions */}
              {quizMode === 'quiz' ? (
                <QuizModeSection 
                  questions={course.previousQuestions}
                  answers={quizAnswers}
                  onAnswer={handleQuizAnswer}
                />
              ) : (
                <PYQSection questions={course.previousQuestions} />
              )}
            </div>
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                💡 Preparation Tips / தயாரிப்பு குறிப்புகள்
              </h3>
              {course.tips.length > 0 ? (
                <div className="space-y-3">
                  {course.tips.map((tip, index) => (
                    <Card key={index} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#6a0dad]/10 flex items-center justify-center shrink-0">
                          <span className="text-[#6a0dad] font-bold text-sm">{index + 1}</span>
                        </div>
                        <p className="text-foreground">{tip}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <p>Tips coming soon...</p>
                </div>
              )}

              {/* Section-wise Topics Quick Reference */}
              <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl mt-6">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-foreground mb-3">📊 Section-wise Topics</h4>
                  <div className="space-y-3">
                    {course.examPattern.sections.map((section, idx) => (
                      <div key={idx} className="border-b border-slate-100 dark:border-slate-700 last:border-0 pb-3 last:pb-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-foreground">{section.name}</span>
                          <Badge variant="secondary">{section.questions} Qs</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {section.topics.map((topic, topicIdx) => (
                            <span 
                              key={topicIdx}
                              className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-muted-foreground"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Quiz Mode Component
interface QuizModeSectionProps {
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    topic: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  }>;
  answers: Record<string, number>;
  onAnswer: (questionId: string, selectedIndex: number, isCorrect: boolean) => void;
}

const QuizModeSection = ({ questions, answers, onAnswer }: QuizModeSectionProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500 text-white';
      case 'Medium': return 'bg-amber-500 text-white';
      case 'Hard': return 'bg-red-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="space-y-4">
      {questions.map((question, index) => {
        const userAnswer = answers[question.id];
        const hasAnswered = userAnswer !== undefined;
        const isCorrect = userAnswer === question.correctAnswer;

        return (
          <Card 
            key={question.id} 
            className={`bg-white dark:bg-slate-800 border rounded-2xl overflow-hidden transition-all ${
              hasAnswered 
                ? isCorrect 
                  ? 'border-green-500 dark:border-green-600' 
                  : 'border-red-500 dark:border-red-600'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <CardContent className="p-5">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Question {index + 1}</span>
                <div className="flex items-center gap-2">
                  <Badge className={getDifficultyColor(question.difficulty)}>
                    {question.difficulty}
                  </Badge>
                  <Badge variant="outline">{question.topic}</Badge>
                </div>
              </div>

              {/* Question Text */}
              <p className="text-foreground font-medium text-lg mb-4">
                {question.question}
              </p>

              {/* Options */}
              <div className="space-y-2">
                {question.options.map((option, optionIdx) => {
                  const isSelected = userAnswer === optionIdx;
                  const isCorrectOption = optionIdx === question.correctAnswer;
                  
                  let optionClass = 'border border-slate-200 dark:border-slate-700 hover:border-[#6a0dad] hover:bg-[#6a0dad]/5';
                  
                  if (hasAnswered) {
                    if (isCorrectOption) {
                      optionClass = 'border-2 border-green-500 bg-green-50 dark:bg-green-900/20';
                    } else if (isSelected && !isCorrectOption) {
                      optionClass = 'border-2 border-red-500 bg-red-50 dark:bg-red-900/20';
                    } else {
                      optionClass = 'border border-slate-200 dark:border-slate-700 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optionIdx}
                      onClick={() => {
                        if (!hasAnswered) {
                          onAnswer(question.id, optionIdx, optionIdx === question.correctAnswer);
                        }
                      }}
                      disabled={hasAnswered}
                      className={`w-full text-left p-4 rounded-xl transition-all ${optionClass} ${hasAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <span className="font-semibold text-muted-foreground mr-2">
                        ({String.fromCharCode(97 + optionIdx)})
                      </span>
                      <span className="text-foreground">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation (shown after answering) */}
              {hasAnswered && (
                <div className={`mt-4 p-4 rounded-xl border ${
                  isCorrect 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                    : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
                }`}>
                  <p className="text-sm">
                    <span className="font-semibold">
                      {isCorrect ? '✓ Correct!' : '✗ Incorrect.'}
                    </span>{' '}
                    <span className="text-muted-foreground">
                      {question.explanation}
                    </span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
