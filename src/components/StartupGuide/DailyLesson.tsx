import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, ChevronLeft, ChevronRight, CheckCircle2, Lightbulb, PenLine, Brain, Lock } from 'lucide-react';
import { dailyLessons, getLessonsByStage } from './data/lessonsData';
import { toast } from 'sonner';

interface DailyLessonProps {
  completedLessons: number[];
  onCompleteLesson: (lessonId: number) => void;
  currentStage: number;
}

export const DailyLesson = ({ completedLessons, onCompleteLesson, currentStage }: DailyLessonProps) => {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [showReflection, setShowReflection] = useState(false);

  const availableLessons = dailyLessons.filter(l => l.stage <= currentStage);
  const lesson = selectedLesson !== null ? dailyLessons.find(l => l.id === selectedLesson) : null;
  const progress = (completedLessons.length / dailyLessons.length) * 100;

  const handleComplete = () => {
    if (lesson && journalEntry.trim().length >= 10) {
      onCompleteLesson(lesson.id);
      setJournalEntry('');
      setShowReflection(false);
      setSelectedLesson(null);
      toast.success(`+25 XP! Lesson "${lesson.title}" completed!`);
    } else {
      toast.error('Write at least 10 characters in your journal to complete the lesson.');
    }
  };

  if (lesson) {
    const isCompleted = completedLessons.includes(lesson.id);
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => setSelectedLesson(null)} className="text-xs">
          <ChevronLeft className="w-3 h-3 mr-1" /> Back to Lessons
        </Button>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-[10px]">Stage {lesson.stage}</Badge>
              <Badge className="text-[10px] bg-orange-100 text-orange-700 border border-orange-200/50">{lesson.category}</Badge>
              {isCompleted && <Badge className="text-[10px] bg-orange-500/10 text-orange-600"><CheckCircle2 className="w-3 h-3 mr-1" />Done</Badge>}
            </div>
            <CardTitle className="text-base">Lesson {lesson.id}: {lesson.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{lesson.content}</p>

            {/* Micro Task */}
            <div className="bg-gradient-to-r from-amber-50/80 to-orange-50/50 rounded-lg p-3 border border-amber-200/40">
              <p className="text-xs font-semibold text-amber-700 flex items-center gap-1.5 mb-1">
                <PenLine className="w-3.5 h-3.5" /> Today's Micro-Task
              </p>
              <p className="text-sm text-foreground">{lesson.microTask}</p>
            </div>

            {/* Journal Entry */}
            {!isCompleted && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Your Entrepreneurship Journal
                </label>
                <Textarea
                  placeholder="Write your response to the micro-task here..."
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  className="min-h-[80px] text-sm"
                />
              </div>
            )}

            {/* Reflection */}
            {!showReflection && !isCompleted && (
              <Button variant="outline" size="sm" className="text-xs w-full" onClick={() => setShowReflection(true)}>
                <Brain className="w-3 h-3 mr-1.5" /> Show Reflection Question
              </Button>
            )}
            {showReflection && (
              <div className="bg-orange-50/80 rounded-lg p-3 border border-orange-200/40">
                <p className="text-xs font-semibold text-orange-700 flex items-center gap-1.5 mb-1">
                  <Lightbulb className="w-3.5 h-3.5" /> Reflection
                </p>
                <p className="text-sm text-foreground italic">{lesson.reflection}</p>
              </div>
            )}

            {!isCompleted && (
              <Button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-md shadow-orange-500/20" onClick={handleComplete} disabled={journalEntry.trim().length < 10}>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Complete Lesson (+25 XP)
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Lesson List View
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground">Mastery Path</h3>
          <p className="text-xs text-muted-foreground">{completedLessons.length}/{dailyLessons.length} lessons completed</p>
        </div>
        <Badge variant="secondary" className="text-xs">{Math.round(progress)}%</Badge>
      </div>
      <Progress value={progress} className="h-2" />

      <div className="space-y-2">
        {[1, 2, 3].map(stage => {
          const stageLessons = getLessonsByStage(stage);
          const stageCompleted = stageLessons.filter(l => completedLessons.includes(l.id)).length;
          const isLocked = stage > currentStage;

          return (
            <Card key={stage} className={`border-border/50 ${isLocked ? 'opacity-50' : ''}`}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {isLocked ? <Lock className="w-4 h-4 text-muted-foreground" /> : <BookOpen className="w-4 h-4 text-orange-600" />}
                    <span className="text-xs font-semibold text-foreground">Stage {stage}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{stageCompleted}/{stageLessons.length}</span>
                </div>
                {!isLocked && (
                  <div className="grid grid-cols-1 gap-1.5">
                    {stageLessons.map(lesson => {
                      const done = completedLessons.includes(lesson.id);
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson.id)}
                          className={`text-left p-2 rounded-md text-xs flex items-center gap-2 transition-colors ${done ? 'bg-orange-500/5 text-orange-700 dark:text-orange-400' : 'bg-muted/30 hover:bg-muted/60 text-foreground'}`}
                        >
                          {done ? <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground" />}
                          <span className="truncate">{lesson.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
