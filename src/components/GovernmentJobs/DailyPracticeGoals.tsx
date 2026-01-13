import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Target, Clock, FileQuestion, Edit2, Check, Trophy, Flame, TrendingUp, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const STORAGE_KEY = 'govt_daily_practice_goals';
const PROGRESS_KEY = 'govt_daily_practice_progress';

export type GoalType = 'time' | 'questions';

export interface DailyGoal {
  id: string;
  type: GoalType;
  target: number;
  label: string;
  labelTamil: string;
  createdAt: string;
}

export interface DailyProgress {
  date: string;
  goals: {
    [goalId: string]: {
      current: number;
      completed: boolean;
    };
  };
}

import { Language } from '@/hooks/useLanguage';

interface DailyPracticeGoalsProps {
  language: Language;
  questionsCompleted?: number;
  minutesPracticed?: number;
}

const PRESET_GOALS = {
  time: [15, 30, 45, 60, 90, 120],
  questions: [5, 10, 15, 20, 25, 50],
};

const getDateString = (): string => new Date().toISOString().split('T')[0];

export const DailyPracticeGoals = ({ 
  language, 
  questionsCompleted = 0, 
  minutesPracticed = 0 
}: DailyPracticeGoalsProps) => {
  const [goals, setGoals] = useState<DailyGoal[]>([]);
  const [progress, setProgress] = useState<DailyProgress | null>(null);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<DailyGoal | null>(null);
  
  // New goal form state
  const [newGoalType, setNewGoalType] = useState<GoalType>('questions');
  const [newGoalTarget, setNewGoalTarget] = useState<number>(10);
  const [customTarget, setCustomTarget] = useState<string>('');

  // Load goals and progress from localStorage
  useEffect(() => {
    try {
      const storedGoals = localStorage.getItem(STORAGE_KEY);
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals));
      }

      const storedProgress = localStorage.getItem(PROGRESS_KEY);
      if (storedProgress) {
        const parsedProgress = JSON.parse(storedProgress) as DailyProgress;
        // Reset progress if it's a new day
        if (parsedProgress.date !== getDateString()) {
          const newProgress: DailyProgress = {
            date: getDateString(),
            goals: {},
          };
          setProgress(newProgress);
          localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
        } else {
          setProgress(parsedProgress);
        }
      } else {
        const newProgress: DailyProgress = {
          date: getDateString(),
          goals: {},
        };
        setProgress(newProgress);
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
      }
    } catch (error) {
      console.error('Error loading goals:', error);
    }
  }, []);

  // Update progress based on external data
  useEffect(() => {
    if (!progress || goals.length === 0) return;

    const updatedGoals = { ...progress.goals };
    let hasChanges = false;

    goals.forEach((goal) => {
      const currentProgress = goal.type === 'questions' ? questionsCompleted : minutesPracticed;
      const wasCompleted = updatedGoals[goal.id]?.completed || false;
      const isNowCompleted = currentProgress >= goal.target;

      if (!updatedGoals[goal.id] || updatedGoals[goal.id].current !== currentProgress) {
        updatedGoals[goal.id] = {
          current: currentProgress,
          completed: isNowCompleted,
        };
        hasChanges = true;
      }

      // Show celebration toast when goal is newly completed
      if (!wasCompleted && isNowCompleted) {
        toast.success(
          language === 'ta' 
            ? `🎉 இலக்கு அடையப்பட்டது: ${goal.labelTamil}` 
            : `🎉 Goal achieved: ${goal.label}`
        );
      }
    });

    if (hasChanges) {
      const newProgress = { ...progress, goals: updatedGoals };
      setProgress(newProgress);
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
    }
  }, [questionsCompleted, minutesPracticed, goals, progress, language]);

  const addGoal = () => {
    const target = customTarget ? parseInt(customTarget, 10) : newGoalTarget;
    
    if (isNaN(target) || target <= 0) {
      toast.error(language === 'ta' ? 'செல்லுபடியான இலக்கை உள்ளிடவும்' : 'Please enter a valid target');
      return;
    }

    const newGoal: DailyGoal = {
      id: `goal_${Date.now()}`,
      type: newGoalType,
      target,
      label: newGoalType === 'time' 
        ? `${target} minutes per day` 
        : `${target} questions per day`,
      labelTamil: newGoalType === 'time' 
        ? `நாளுக்கு ${target} நிமிடங்கள்` 
        : `நாளுக்கு ${target} கேள்விகள்`,
      createdAt: new Date().toISOString(),
    };

    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGoals));

    // Initialize progress for new goal
    if (progress) {
      const currentProgress = newGoalType === 'questions' ? questionsCompleted : minutesPracticed;
      const newProgress = {
        ...progress,
        goals: {
          ...progress.goals,
          [newGoal.id]: {
            current: currentProgress,
            completed: currentProgress >= target,
          },
        },
      };
      setProgress(newProgress);
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
    }

    setIsAddingGoal(false);
    setCustomTarget('');
    toast.success(language === 'ta' ? 'இலக்கு சேர்க்கப்பட்டது!' : 'Goal added!');
  };

  const updateGoal = (goalId: string, newTarget: number) => {
    const updatedGoals = goals.map((g) =>
      g.id === goalId
        ? {
            ...g,
            target: newTarget,
            label: g.type === 'time' 
              ? `${newTarget} minutes per day` 
              : `${newTarget} questions per day`,
            labelTamil: g.type === 'time' 
              ? `நாளுக்கு ${newTarget} நிமிடங்கள்` 
              : `நாளுக்கு ${newTarget} கேள்விகள்`,
          }
        : g
    );
    setGoals(updatedGoals);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGoals));
    setEditingGoal(null);
    toast.success(language === 'ta' ? 'இலக்கு புதுப்பிக்கப்பட்டது!' : 'Goal updated!');
  };

  const deleteGoal = (goalId: string) => {
    const updatedGoals = goals.filter((g) => g.id !== goalId);
    setGoals(updatedGoals);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGoals));
    
    if (progress) {
      const { [goalId]: removed, ...remainingGoals } = progress.goals;
      const newProgress = { ...progress, goals: remainingGoals };
      setProgress(newProgress);
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
    }
    
    toast.success(language === 'ta' ? 'இலக்கு நீக்கப்பட்டது' : 'Goal removed');
  };

  const resetDailyProgress = () => {
    if (!progress) return;
    
    const resetGoals: DailyProgress['goals'] = {};
    goals.forEach((goal) => {
      resetGoals[goal.id] = { current: 0, completed: false };
    });
    
    const newProgress: DailyProgress = {
      date: getDateString(),
      goals: resetGoals,
    };
    setProgress(newProgress);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
    toast.success(language === 'ta' ? 'இன்றைய முன்னேற்றம் மீட்டமைக்கப்பட்டது' : "Today's progress reset");
  };

  const completedGoalsCount = useMemo(() => {
    if (!progress) return 0;
    return Object.values(progress.goals).filter((g) => g.completed).length;
  }, [progress]);

  const allGoalsCompleted = goals.length > 0 && completedGoalsCount === goals.length;

  const getGoalProgress = (goal: DailyGoal): number => {
    if (!progress || !progress.goals[goal.id]) return 0;
    return Math.min(100, (progress.goals[goal.id].current / goal.target) * 100);
  };

  const getGoalCurrent = (goal: DailyGoal): number => {
    if (!progress || !progress.goals[goal.id]) return 0;
    return progress.goals[goal.id].current;
  };

  return (
    <Card className="border border-gray-200 bg-gradient-to-br from-white to-blue-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            {language === 'ta' ? 'தினசரி பயிற்சி இலக்குகள்' : 'Daily Practice Goals'}
          </CardTitle>
          {goals.length > 0 && (
            <Badge 
              variant={allGoalsCompleted ? 'default' : 'secondary'}
              className={allGoalsCompleted ? 'bg-green-500' : ''}
            >
              {completedGoalsCount}/{goals.length} {language === 'ta' ? 'முடிந்தது' : 'done'}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* All Goals Completed Banner */}
        <AnimatePresence>
          {allGoalsCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 flex items-center gap-3"
            >
              <div className="text-2xl">🎉</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-700">
                  {language === 'ta' 
                    ? 'அனைத்து இலக்குகளும் இன்று நிறைவேற்றப்பட்டன!' 
                    : 'All goals completed for today!'}
                </p>
                <p className="text-xs text-green-600">
                  {language === 'ta' ? 'அற்புதமான வேலை! 🌟' : 'Amazing work! 🌟'}
                </p>
              </div>
              <Trophy className="h-6 w-6 text-green-500" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Goals List */}
        {goals.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <Target className="h-10 w-10 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">
              {language === 'ta' 
                ? 'இலக்குகள் எதுவும் அமைக்கப்படவில்லை' 
                : 'No goals set yet'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {language === 'ta' 
                ? 'உங்கள் தினசரி பயிற்சி இலக்கை சேர்க்கவும்' 
                : 'Add your daily practice target'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {goals.map((goal) => {
              const progressPercent = getGoalProgress(goal);
              const current = getGoalCurrent(goal);
              const isCompleted = progress?.goals[goal.id]?.completed || false;

              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg border transition-all ${
                    isCompleted 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {goal.type === 'time' ? (
                        <Clock className={`h-4 w-4 ${isCompleted ? 'text-green-500' : 'text-blue-500'}`} />
                      ) : (
                        <FileQuestion className={`h-4 w-4 ${isCompleted ? 'text-green-500' : 'text-purple-500'}`} />
                      )}
                      <span className="text-sm font-medium text-gray-700">
                        {language === 'ta' ? goal.labelTamil : goal.label}
                      </span>
                      {isCompleted && (
                        <Badge className="bg-green-100 text-green-700 text-xs px-1.5">
                          <Check className="h-3 w-3" />
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => setEditingGoal(goal)}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-sm">
                          <DialogHeader>
                            <DialogTitle>
                              {language === 'ta' ? 'இலக்கை திருத்து' : 'Edit Goal'}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <Label>
                                {language === 'ta' ? 'புதிய இலக்கு' : 'New Target'}
                              </Label>
                              <Input
                                type="number"
                                defaultValue={goal.target}
                                min={1}
                                className="mt-1"
                                onChange={(e) => {
                                  const value = parseInt(e.target.value, 10);
                                  if (!isNaN(value) && value > 0) {
                                    setEditingGoal({ ...goal, target: value });
                                  }
                                }}
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                {goal.type === 'time' 
                                  ? (language === 'ta' ? 'நிமிடங்கள்' : 'minutes')
                                  : (language === 'ta' ? 'கேள்விகள்' : 'questions')
                                }
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                className="flex-1"
                                onClick={() => editingGoal && updateGoal(editingGoal.id, editingGoal.target)}
                              >
                                {language === 'ta' ? 'சேமி' : 'Save'}
                              </Button>
                              <Button 
                                variant="destructive"
                                onClick={() => {
                                  deleteGoal(goal.id);
                                  setEditingGoal(null);
                                }}
                              >
                                {language === 'ta' ? 'நீக்கு' : 'Delete'}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{current} / {goal.target}</span>
                      <span>{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          isCompleted 
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                            : goal.type === 'time'
                              ? 'bg-gradient-to-r from-blue-400 to-blue-500'
                              : 'bg-gradient-to-r from-purple-400 to-purple-500'
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Add Goal Dialog */}
        <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full gap-2">
              <Target className="h-4 w-4" />
              {language === 'ta' ? 'இலக்கு சேர்' : 'Add Goal'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                {language === 'ta' ? 'புதிய இலக்கு' : 'New Goal'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>{language === 'ta' ? 'இலக்கு வகை' : 'Goal Type'}</Label>
                <Select value={newGoalType} onValueChange={(v) => setNewGoalType(v as GoalType)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="questions">
                      <div className="flex items-center gap-2">
                        <FileQuestion className="h-4 w-4 text-purple-500" />
                        {language === 'ta' ? 'கேள்விகள்' : 'Questions'}
                      </div>
                    </SelectItem>
                    <SelectItem value="time">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        {language === 'ta' ? 'நேரம்' : 'Time'}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>{language === 'ta' ? 'இலக்கை தேர்ந்தெடுக்கவும்' : 'Select Target'}</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {PRESET_GOALS[newGoalType].map((preset) => (
                    <Button
                      key={preset}
                      variant={newGoalTarget === preset && !customTarget ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setNewGoalTarget(preset);
                        setCustomTarget('');
                      }}
                    >
                      {preset}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>{language === 'ta' ? 'அல்லது தனிப்பயன் இலக்கு' : 'Or Custom Target'}</Label>
                <Input
                  type="number"
                  placeholder={newGoalType === 'time' ? '45' : '25'}
                  value={customTarget}
                  onChange={(e) => setCustomTarget(e.target.value)}
                  min={1}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {newGoalType === 'time' 
                    ? (language === 'ta' ? 'நிமிடங்கள்/நாள்' : 'minutes/day')
                    : (language === 'ta' ? 'கேள்விகள்/நாள்' : 'questions/day')
                  }
                </p>
              </div>

              <Button className="w-full" onClick={addGoal}>
                {language === 'ta' ? 'இலக்கை சேர்' : 'Add Goal'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reset Progress Button */}
        {goals.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-xs text-gray-500 hover:text-gray-700"
            onClick={resetDailyProgress}
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            {language === 'ta' ? "இன்றைய முன்னேற்றத்தை மீட்டமை" : "Reset today's progress"}
          </Button>
        )}

        {/* Tips */}
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start gap-2">
            <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-blue-700">
                {language === 'ta' ? 'உதவிக்குறிப்பு' : 'Pro Tip'}
              </p>
              <p className="text-xs text-blue-600">
                {language === 'ta' 
                  ? 'சிறிய, நிலையான இலக்குகளுடன் தொடங்குங்கள். நீங்கள் மேம்படும்போது படிப்படியாக அவற்றை அதிகரிக்கவும்.' 
                  : 'Start with small, consistent goals. Gradually increase them as you improve.'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
