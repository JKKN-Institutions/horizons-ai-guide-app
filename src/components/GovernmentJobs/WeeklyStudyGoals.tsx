import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
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
import { 
  Target, Clock, Calendar, Edit3, Trash2, Plus, Trophy, 
  TrendingUp, CheckCircle2, AlertCircle, Flame, BarChart3,
  ChevronRight, Star, Award, Bell, BellOff, BellRing
} from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { startOfWeek, endOfWeek, format, isWithinInterval, subWeeks, addWeeks, isSameWeek, getDay } from 'date-fns';
import { SmartGoalSuggestions } from './SmartGoalSuggestions';

const STORAGE_KEY = 'govt_weekly_study_goals';
const HISTORY_KEY = 'govt_weekly_goals_history';
const REMINDER_KEY = 'govt_weekly_goal_reminders';
const LAST_REMINDER_KEY = 'govt_weekly_last_reminder';

interface WeeklyGoal {
  id: string;
  targetHours: number;
  weekStart: string;
  createdAt: string;
}

interface WeeklyProgress {
  weekStart: string;
  totalMinutes: number;
  dailyBreakdown: { [date: string]: number };
  goalId: string | null;
  goalTarget: number | null;
  achieved: boolean;
}

interface ReminderSettings {
  enabled: boolean;
  notificationsEnabled: boolean;
  reminderDays: number[]; // 0=Sunday, 1=Monday, etc. Default: Wed(3), Fri(5)
  lastShownDate: string | null;
}

interface WeeklyStudyGoalsProps {
  language: 'en' | 'ta';
}

const PRESET_HOURS = [5, 10, 15, 20, 25, 30, 35, 40];

const getWeekStart = (date: Date = new Date()): string => {
  return format(startOfWeek(date, { weekStartsOn: 1 }), 'yyyy-MM-dd');
};

const getWeekEnd = (date: Date = new Date()): string => {
  return format(endOfWeek(date, { weekStartsOn: 1 }), 'yyyy-MM-dd');
};

export const WeeklyStudyGoals = ({ language }: WeeklyStudyGoalsProps) => {
  const [currentGoal, setCurrentGoal] = useState<WeeklyGoal | null>(null);
  const [weeklyHistory, setWeeklyHistory] = useState<WeeklyProgress[]>([]);
  const [isSettingGoal, setIsSettingGoal] = useState(false);
  const [selectedHours, setSelectedHours] = useState<number>(10);
  const [customHours, setCustomHours] = useState<string>('');
  const [showHistory, setShowHistory] = useState(false);
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>({
    enabled: true,
    notificationsEnabled: false,
    reminderDays: [3, 5], // Wednesday and Friday
    lastShownDate: null,
  });
  const [showReminderSettings, setShowReminderSettings] = useState(false);
  const [behindScheduleWarning, setBehindScheduleWarning] = useState<{
    show: boolean;
    hoursNeeded: number;
    daysLeft: number;
  } | null>(null);

  // Load data from localStorage and aggregate study time
  useEffect(() => {
    loadGoalData();
    loadReminderSettings();
    aggregateWeeklyProgress();
  }, []);

  const loadGoalData = () => {
    try {
      const storedGoal = localStorage.getItem(STORAGE_KEY);
      if (storedGoal) {
        const goal = JSON.parse(storedGoal) as WeeklyGoal;
        // Check if goal is for current week
        if (goal.weekStart === getWeekStart()) {
          setCurrentGoal(goal);
        } else {
          // Archive old goal and clear
          archiveGoal(goal);
          setCurrentGoal(null);
        }
      }

      const storedHistory = localStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        setWeeklyHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Error loading weekly goals:', error);
    }
  };

  const loadReminderSettings = () => {
    try {
      const stored = localStorage.getItem(REMINDER_KEY);
      if (stored) {
        setReminderSettings(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading reminder settings:', error);
    }
  };

  const saveReminderSettings = (settings: ReminderSettings) => {
    setReminderSettings(settings);
    localStorage.setItem(REMINDER_KEY, JSON.stringify(settings));
  };

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      toast.error(language === 'ta' ? 'இந்த உலாவி அறிவிப்புகளை ஆதரிக்காது' : 'This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  };

  const toggleNotifications = async () => {
    if (!reminderSettings.notificationsEnabled) {
      const granted = await requestNotificationPermission();
      if (granted) {
        saveReminderSettings({ ...reminderSettings, notificationsEnabled: true });
        toast.success(language === 'ta' ? 'அறிவிப்புகள் இயக்கப்பட்டன!' : 'Notifications enabled!');
      } else {
        toast.error(language === 'ta' ? 'அறிவிப்பு அனுமதி மறுக்கப்பட்டது' : 'Notification permission denied');
      }
    } else {
      saveReminderSettings({ ...reminderSettings, notificationsEnabled: false });
      toast.success(language === 'ta' ? 'அறிவிப்புகள் முடக்கப்பட்டன' : 'Notifications disabled');
    }
  };

  const toggleReminderDay = (day: number) => {
    const newDays = reminderSettings.reminderDays.includes(day)
      ? reminderSettings.reminderDays.filter(d => d !== day)
      : [...reminderSettings.reminderDays, day].sort();
    saveReminderSettings({ ...reminderSettings, reminderDays: newDays });
  };

  const aggregateWeeklyProgress = () => {
    try {
      const schedules = localStorage.getItem('govt_practice_schedules');
      const mockScores = localStorage.getItem('govt_mock_test_scores');
      
      const dailyMinutes: { [date: string]: number } = {};
      
      // Aggregate from practice schedules
      if (schedules) {
        const parsedSchedules = JSON.parse(schedules);
        Object.values(parsedSchedules).forEach((daySchedules: any) => {
          if (Array.isArray(daySchedules)) {
            daySchedules.forEach((schedule: any) => {
              if (schedule.completed && schedule.date) {
                const date = schedule.date;
                dailyMinutes[date] = (dailyMinutes[date] || 0) + (schedule.duration || 30);
              }
            });
          }
        });
      }

      // Aggregate from mock test scores (estimate 20 mins per test)
      if (mockScores) {
        const scores = JSON.parse(mockScores);
        scores.forEach((score: any) => {
          if (score.created_at) {
            const date = score.created_at.split('T')[0];
            dailyMinutes[date] = (dailyMinutes[date] || 0) + 20;
          }
        });
      }

      // Calculate current week's total
      const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
      const currentWeekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
      
      let currentWeekMinutes = 0;
      const currentWeekBreakdown: { [date: string]: number } = {};
      
      Object.entries(dailyMinutes).forEach(([date, minutes]) => {
        const dateObj = new Date(date);
        if (isWithinInterval(dateObj, { start: currentWeekStart, end: currentWeekEnd })) {
          currentWeekMinutes += minutes;
          currentWeekBreakdown[date] = minutes;
        }
      });

      // Update current week progress in history
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      let history: WeeklyProgress[] = storedHistory ? JSON.parse(storedHistory) : [];
      
      const currentWeekIndex = history.findIndex(h => h.weekStart === getWeekStart());
      const storedGoal = localStorage.getItem(STORAGE_KEY);
      const goal = storedGoal ? JSON.parse(storedGoal) : null;
      
      const currentWeekProgress: WeeklyProgress = {
        weekStart: getWeekStart(),
        totalMinutes: currentWeekMinutes,
        dailyBreakdown: currentWeekBreakdown,
        goalId: goal?.id || null,
        goalTarget: goal?.targetHours || null,
        achieved: goal ? (currentWeekMinutes / 60) >= goal.targetHours : false,
      };

      if (currentWeekIndex >= 0) {
        history[currentWeekIndex] = currentWeekProgress;
      } else {
        history.unshift(currentWeekProgress);
      }

      // Keep only last 12 weeks
      history = history.slice(0, 12);
      
      setWeeklyHistory(history);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error aggregating weekly progress:', error);
    }
  };

  const archiveGoal = (goal: WeeklyGoal) => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      let history: WeeklyProgress[] = storedHistory ? JSON.parse(storedHistory) : [];
      
      const weekIndex = history.findIndex(h => h.weekStart === goal.weekStart);
      if (weekIndex >= 0) {
        history[weekIndex].goalId = goal.id;
        history[weekIndex].goalTarget = goal.targetHours;
        history[weekIndex].achieved = (history[weekIndex].totalMinutes / 60) >= goal.targetHours;
      }
      
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error archiving goal:', error);
    }
  };

  const setWeeklyGoal = () => {
    const hours = customHours ? parseFloat(customHours) : selectedHours;
    
    if (isNaN(hours) || hours <= 0 || hours > 100) {
      toast.error(language === 'ta' ? 'செல்லுபடியான மணிநேரத்தை உள்ளிடவும்' : 'Please enter valid hours (1-100)');
      return;
    }

    const newGoal: WeeklyGoal = {
      id: `weekly_${Date.now()}`,
      targetHours: hours,
      weekStart: getWeekStart(),
      createdAt: new Date().toISOString(),
    };

    setCurrentGoal(newGoal);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newGoal));
    setIsSettingGoal(false);
    setCustomHours('');
    
    toast.success(
      language === 'ta' 
        ? `வாராந்திர இலக்கு ${hours} மணி நேரம் அமைக்கப்பட்டது!` 
        : `Weekly goal set: ${hours} hours!`
    );

    // Update history with new goal
    aggregateWeeklyProgress();
  };

  const updateGoal = (newHours: number) => {
    if (!currentGoal) return;
    
    const updatedGoal = { ...currentGoal, targetHours: newHours };
    setCurrentGoal(updatedGoal);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGoal));
    
    toast.success(language === 'ta' ? 'இலக்கு புதுப்பிக்கப்பட்டது!' : 'Goal updated!');
    aggregateWeeklyProgress();
  };

  const deleteGoal = () => {
    setCurrentGoal(null);
    localStorage.removeItem(STORAGE_KEY);
    toast.success(language === 'ta' ? 'இலக்கு நீக்கப்பட்டது' : 'Goal removed');
    aggregateWeeklyProgress();
  };

  const currentWeekProgress = useMemo(() => {
    return weeklyHistory.find(h => h.weekStart === getWeekStart());
  }, [weeklyHistory]);

  const currentHours = (currentWeekProgress?.totalMinutes || 0) / 60;
  const progressPercent = currentGoal ? Math.min(100, (currentHours / currentGoal.targetHours) * 100) : 0;
  const isGoalAchieved = currentGoal && currentHours >= currentGoal.targetHours;
  const hoursRemaining = currentGoal ? Math.max(0, currentGoal.targetHours - currentHours) : 0;

  const weeklyStats = useMemo(() => {
    const goalsSet = weeklyHistory.filter(w => w.goalTarget).length;
    const goalsAchieved = weeklyHistory.filter(w => w.achieved).length;
    const totalHours = weeklyHistory.reduce((sum, w) => sum + w.totalMinutes / 60, 0);
    const avgHours = weeklyHistory.length > 0 ? totalHours / weeklyHistory.length : 0;
    
    // Calculate streak of consecutive achieved weeks
    let streak = 0;
    for (const week of weeklyHistory) {
      if (week.achieved) streak++;
      else break;
    }

    return { goalsSet, goalsAchieved, totalHours, avgHours, streak };
  }, [weeklyHistory]);

  // Check if user is behind schedule and should show reminder
  useEffect(() => {
    if (!currentGoal || !reminderSettings.enabled) {
      setBehindScheduleWarning(null);
      return;
    }

    const today = new Date();
    const dayOfWeek = getDay(today);
    const todayStr = format(today, 'yyyy-MM-dd');
    
    // Check if today is a reminder day
    if (!reminderSettings.reminderDays.includes(dayOfWeek)) {
      return;
    }

    // Check if we already showed reminder today
    const lastReminder = localStorage.getItem(LAST_REMINDER_KEY);
    if (lastReminder === todayStr) {
      return;
    }

    // Calculate progress and expected progress
    const currentHoursNow = (currentWeekProgress?.totalMinutes || 0) / 60;
    const weekEndDate = endOfWeek(today, { weekStartsOn: 1 });
    const daysLeft = Math.ceil((weekEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate expected progress (linear pace)
    const weekStartDate = startOfWeek(today, { weekStartsOn: 1 });
    const daysPassed = Math.ceil((today.getTime() - weekStartDate.getTime()) / (1000 * 60 * 60 * 24));
    const expectedHours = (currentGoal.targetHours / 7) * daysPassed;
    
    // If behind by more than 20% of expected
    const behindThreshold = expectedHours * 0.8;
    
    if (currentHoursNow < behindThreshold && currentHoursNow < currentGoal.targetHours) {
      const hoursNeeded = currentGoal.targetHours - currentHoursNow;
      
      setBehindScheduleWarning({
        show: true,
        hoursNeeded: Math.round(hoursNeeded * 10) / 10,
        daysLeft,
      });

      // Show toast notification
      toast.warning(
        language === 'ta' 
          ? `⚠️ இலக்கை அடைய ${hoursNeeded.toFixed(1)} மணி நேரம் தேவை!` 
          : `⚠️ ${hoursNeeded.toFixed(1)}h needed to reach your weekly goal!`,
        {
          duration: 5000,
          description: language === 'ta' 
            ? `${daysLeft} நாட்கள் மீதம்` 
            : `${daysLeft} days remaining`,
        }
      );

      // Try to send browser notification
      if (reminderSettings.notificationsEnabled && 'Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification(
            language === 'ta' ? 'படிப்பு இலக்கு நினைவூட்டல்' : 'Study Goal Reminder',
            {
              body: language === 'ta' 
                ? `இலக்கை அடைய ${hoursNeeded.toFixed(1)} மணி நேரம் தேவை. ${daysLeft} நாட்கள் மீதம்!`
                : `You need ${hoursNeeded.toFixed(1)} more hours to reach your goal. ${daysLeft} days left!`,
              icon: '📚',
              tag: 'weekly-goal-reminder',
            }
          );
        }
      }

      // Mark reminder as shown today
      localStorage.setItem(LAST_REMINDER_KEY, todayStr);
    }
  }, [currentGoal, currentWeekProgress, reminderSettings, language]);

  const getDayName = (date: string, lang: 'en' | 'ta') => {
    const dayNames = {
      en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      ta: ['ஞா', 'தி', 'செ', 'பு', 'வி', 'வெ', 'ச']
    };
    const dayIndex = new Date(date).getDay();
    return dayNames[lang][dayIndex];
  };

  const getReminderDayLabel = (day: number) => {
    const dayNames = {
      en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      ta: ['ஞா', 'தி', 'செ', 'பு', 'வி', 'வெ', 'ச']
    };
    return dayNames[language][day];
  };

  return (
    <Card className="border border-gray-200 bg-gradient-to-br from-white to-indigo-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-500" />
            {language === 'ta' ? 'வாராந்திர படிப்பு இலக்குகள்' : 'Weekly Study Goals'}
          </CardTitle>
          {weeklyStats.streak > 0 && (
            <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white gap-1">
              <Flame className="h-3 w-3" />
              {weeklyStats.streak} {language === 'ta' ? 'வாரம்' : 'week'} {language === 'ta' ? 'தொடர்' : 'streak'}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setShowReminderSettings(!showReminderSettings)}
          >
            {reminderSettings.enabled ? (
              <BellRing className="h-4 w-4 text-indigo-500" />
            ) : (
              <BellOff className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'MMM d')} - {format(endOfWeek(new Date(), { weekStartsOn: 1 }), 'MMM d, yyyy')}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Reminder Settings Panel */}
        <AnimatePresence>
          {showReminderSettings && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-amber-600" />
                    <span className="font-medium text-amber-800">
                      {language === 'ta' ? 'நினைவூட்டல் அமைப்புகள்' : 'Reminder Settings'}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReminderSettings(false)}
                    className="h-7 w-7 p-0"
                  >
                    ×
                  </Button>
                </div>

                <div className="space-y-3">
                  {/* Enable/Disable Reminders */}
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-amber-700">
                      {language === 'ta' ? 'நினைவூட்டல்களை இயக்கு' : 'Enable Reminders'}
                    </Label>
                    <Switch
                      checked={reminderSettings.enabled}
                      onCheckedChange={(checked) => saveReminderSettings({ ...reminderSettings, enabled: checked })}
                    />
                  </div>

                  {reminderSettings.enabled && (
                    <>
                      {/* Browser Notifications */}
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm text-amber-700">
                            {language === 'ta' ? 'உலாவி அறிவிப்புகள்' : 'Browser Notifications'}
                          </Label>
                          <p className="text-xs text-amber-600">
                            {language === 'ta' ? 'பின்னணியில் அறிவிப்புகளைப் பெறுங்கள்' : 'Get notified even when tab is closed'}
                          </p>
                        </div>
                        <Switch
                          checked={reminderSettings.notificationsEnabled}
                          onCheckedChange={toggleNotifications}
                        />
                      </div>

                      {/* Reminder Days */}
                      <div>
                        <Label className="text-sm text-amber-700 mb-2 block">
                          {language === 'ta' ? 'நினைவூட்டல் நாட்கள்' : 'Reminder Days'}
                        </Label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5, 6, 0].map((day) => (
                            <button
                              key={day}
                              onClick={() => toggleReminderDay(day)}
                              className={`w-9 h-9 rounded-full text-xs font-medium transition-all ${
                                reminderSettings.reminderDays.includes(day)
                                  ? 'bg-amber-500 text-white shadow-md'
                                  : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'
                              }`}
                            >
                              {getReminderDayLabel(day)}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-amber-600 mt-2">
                          {language === 'ta' 
                            ? 'இந்த நாட்களில் நீங்கள் பின்தங்கியிருந்தால் நினைவூட்டல் பெறுவீர்கள்' 
                            : "You'll get reminders on these days if you're behind schedule"}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Behind Schedule Warning */}
        <AnimatePresence>
          {behindScheduleWarning?.show && !isGoalAchieved && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-amber-800">
                    {language === 'ta' ? '⚠️ இலக்கை அடைய பின்தங்கியுள்ளீர்கள்!' : '⚠️ You\'re Behind Schedule!'}
                  </p>
                  <p className="text-sm text-amber-700 mt-1">
                    {language === 'ta' 
                      ? `இலக்கை அடைய ${behindScheduleWarning.hoursNeeded} மணி நேரம் தேவை. ${behindScheduleWarning.daysLeft} நாட்கள் மீதம்.`
                      : `You need ${behindScheduleWarning.hoursNeeded}h more to reach your goal. ${behindScheduleWarning.daysLeft} days left.`}
                  </p>
                  <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {language === 'ta' 
                      ? `நாளுக்கு ~${(behindScheduleWarning.hoursNeeded / behindScheduleWarning.daysLeft).toFixed(1)} மணி படிக்கவும்`
                      : `Study ~${(behindScheduleWarning.hoursNeeded / behindScheduleWarning.daysLeft).toFixed(1)}h per day to catch up`}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBehindScheduleWarning(null)}
                  className="h-7 w-7 p-0"
                >
                  ×
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Goal Achievement Banner */}
        <AnimatePresence>
          {isGoalAchieved && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-green-700">
                    {language === 'ta' ? '🎉 வாராந்திர இலக்கு அடையப்பட்டது!' : '🎉 Weekly Goal Achieved!'}
                  </p>
                  <p className="text-sm text-green-600">
                    {language === 'ta' 
                      ? `${currentHours.toFixed(1)} மணி நேரம் படித்தீர்கள்` 
                      : `You studied ${currentHours.toFixed(1)} hours this week`}
                  </p>
                </div>
                <Award className="h-8 w-8 text-green-500" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current Goal Display */}
        {currentGoal ? (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-indigo-500" />
                  <span className="font-medium text-indigo-700">
                    {language === 'ta' ? 'இந்த வார இலக்கு' : 'This Week\'s Goal'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Edit3 className="h-4 w-4 text-indigo-500" />
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
                          <Label>{language === 'ta' ? 'புதிய இலக்கு (மணி)' : 'New Target (hours)'}</Label>
                          <Input
                            type="number"
                            defaultValue={currentGoal.targetHours}
                            min={1}
                            max={100}
                            step={0.5}
                            className="mt-1"
                            id="edit-goal-hours"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1"
                            onClick={() => {
                              const input = document.getElementById('edit-goal-hours') as HTMLInputElement;
                              const value = parseFloat(input.value);
                              if (!isNaN(value) && value > 0) {
                                updateGoal(value);
                              }
                            }}
                          >
                            {language === 'ta' ? 'சேமி' : 'Save'}
                          </Button>
                          <Button variant="destructive" onClick={deleteGoal}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-indigo-700">
                  {currentHours.toFixed(1)}
                  <span className="text-lg font-normal text-indigo-500"> / {currentGoal.targetHours}h</span>
                </div>
                <p className="text-sm text-indigo-600 mt-1">
                  {isGoalAchieved 
                    ? (language === 'ta' ? '✨ இலக்கை தாண்டினீர்கள்!' : '✨ You exceeded your goal!')
                    : (language === 'ta' 
                        ? `${hoursRemaining.toFixed(1)} மணி நேரம் மீதமுள்ளது` 
                        : `${hoursRemaining.toFixed(1)} hours remaining`)}
                </p>
              </div>

              <Progress 
                value={progressPercent} 
                className="h-3 bg-indigo-100"
              />
              <div className="flex justify-between text-xs text-indigo-600 mt-1">
                <span>0h</span>
                <span>{Math.round(progressPercent)}%</span>
                <span>{currentGoal.targetHours}h</span>
              </div>
            </div>

            {/* Daily Breakdown */}
            {currentWeekProgress && Object.keys(currentWeekProgress.dailyBreakdown).length > 0 && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  {language === 'ta' ? 'தினசரி பிரிவு' : 'Daily Breakdown'}
                </h4>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const date = format(addWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), 0), 'yyyy-MM-dd');
                    const dayDate = new Date(startOfWeek(new Date(), { weekStartsOn: 1 }));
                    dayDate.setDate(dayDate.getDate() + i);
                    const dateStr = format(dayDate, 'yyyy-MM-dd');
                    const minutes = currentWeekProgress.dailyBreakdown[dateStr] || 0;
                    const hours = minutes / 60;
                    const maxHeight = 40;
                    const height = Math.min(maxHeight, (hours / 4) * maxHeight);
                    const isToday = format(new Date(), 'yyyy-MM-dd') === dateStr;
                    
                    return (
                      <div key={i} className="text-center">
                        <div className="h-10 flex items-end justify-center">
                          <div 
                            className={`w-full max-w-6 rounded-t transition-all ${
                              isToday ? 'bg-indigo-500' : 'bg-indigo-300'
                            }`}
                            style={{ height: `${Math.max(2, height)}px` }}
                          />
                        </div>
                        <div className={`text-[10px] mt-1 ${isToday ? 'font-bold text-indigo-600' : 'text-gray-500'}`}>
                          {getDayName(dateStr, language)}
                        </div>
                        {minutes > 0 && (
                          <div className="text-[9px] text-gray-400">
                            {hours.toFixed(1)}h
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <Target className="h-12 w-12 mx-auto mb-3 text-indigo-200" />
            <p className="text-gray-600 mb-1">
              {language === 'ta' 
                ? 'இந்த வாரத்திற்கு இலக்கு அமைக்கவில்லை' 
                : 'No goal set for this week'}
            </p>
            <p className="text-sm text-gray-400 mb-4">
              {language === 'ta' 
                ? 'வாராந்திர படிப்பு மணிநேர இலக்கை அமைக்கவும்' 
                : 'Set a weekly study hour target to track progress'}
            </p>
            <Button 
              onClick={() => setIsSettingGoal(true)}
              className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              <Plus className="h-4 w-4" />
              {language === 'ta' ? 'இலக்கை அமை' : 'Set Weekly Goal'}
            </Button>
          </div>
        )}

        {/* Set Goal Dialog */}
        <Dialog open={isSettingGoal} onOpenChange={setIsSettingGoal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-indigo-500" />
                {language === 'ta' ? 'வாராந்திர இலக்கை அமை' : 'Set Weekly Goal'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
              {/* Smart Suggestions Section */}
              <SmartGoalSuggestions
                language={language}
                weeklyHistory={weeklyHistory}
                onSelectGoal={(hours) => {
                  setSelectedHours(hours);
                  setCustomHours('');
                }}
              />

              <div className="border-t border-gray-200 pt-4">
                <Label className="text-sm font-medium">
                  {language === 'ta' ? 'வார இலக்கு மணிநேரங்கள்' : 'Weekly Target Hours'}
                </Label>
                <p className="text-xs text-muted-foreground mb-3">
                  {language === 'ta' 
                    ? 'இந்த வாரம் எத்தனை மணி நேரம் படிக்க விரும்புகிறீர்கள்?' 
                    : 'How many hours do you want to study this week?'}
                </p>
                
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {PRESET_HOURS.map(hours => (
                    <Button
                      key={hours}
                      variant={selectedHours === hours && !customHours ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setSelectedHours(hours);
                        setCustomHours('');
                      }}
                      className="text-sm"
                    >
                      {hours}h
                    </Button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {language === 'ta' ? 'அல்லது' : 'or'}
                  </span>
                  <Input
                    type="number"
                    placeholder={language === 'ta' ? 'தனிப்பயன் மணி' : 'Custom hours'}
                    value={customHours}
                    onChange={(e) => setCustomHours(e.target.value)}
                    min={1}
                    max={100}
                    step={0.5}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="p-3 bg-indigo-50 rounded-lg">
                <p className="text-sm text-indigo-700">
                  {language === 'ta' ? '💡 உதவிக்குறிப்பு:' : '💡 Tip:'}{' '}
                  {language === 'ta' 
                    ? 'ஒரு நாளைக்கு 1-2 மணி நேரம் படிப்பது = வாரத்திற்கு 7-14 மணி நேரம்' 
                    : '1-2 hours/day = 7-14 hours/week. Start small!'}
                </p>
              </div>

              <Button onClick={setWeeklyGoal} className="w-full gap-2">
                <CheckCircle2 className="h-4 w-4" />
                {language === 'ta' 
                  ? `${customHours || selectedHours} மணி நேர இலக்கை அமை` 
                  : `Set ${customHours || selectedHours}h Goal`}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg text-center border border-blue-100">
            <div className="text-lg font-bold text-blue-700">{weeklyStats.totalHours.toFixed(0)}h</div>
            <div className="text-[10px] text-blue-600">
              {language === 'ta' ? 'மொத்த படிப்பு' : 'Total Study'}
            </div>
          </div>
          <div className="p-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg text-center border border-green-100">
            <div className="text-lg font-bold text-green-700">{weeklyStats.goalsAchieved}</div>
            <div className="text-[10px] text-green-600">
              {language === 'ta' ? 'அடைந்த இலக்குகள்' : 'Goals Achieved'}
            </div>
          </div>
          <div className="p-2 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg text-center border border-purple-100">
            <div className="text-lg font-bold text-purple-700">{weeklyStats.avgHours.toFixed(1)}h</div>
            <div className="text-[10px] text-purple-600">
              {language === 'ta' ? 'சராசரி/வாரம்' : 'Avg/Week'}
            </div>
          </div>
          <div className="p-2 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg text-center border border-orange-100">
            <div className="text-lg font-bold text-orange-700">{weeklyStats.streak}</div>
            <div className="text-[10px] text-orange-600">
              {language === 'ta' ? 'வார தொடர்' : 'Week Streak'}
            </div>
          </div>
        </div>

        {/* History Toggle */}
        {weeklyHistory.length > 1 && (
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowHistory(!showHistory)}
              className="w-full justify-between text-gray-600"
            >
              <span className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                {language === 'ta' ? 'முந்தைய வாரங்கள்' : 'Previous Weeks'}
              </span>
              <ChevronRight className={`h-4 w-4 transition-transform ${showHistory ? 'rotate-90' : ''}`} />
            </Button>

            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                    {weeklyHistory.slice(1).map((week, index) => (
                      <div 
                        key={week.weekStart}
                        className={`p-2 rounded-lg border text-sm flex items-center justify-between ${
                          week.achieved 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {week.achieved ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : week.goalTarget ? (
                            <AlertCircle className="h-4 w-4 text-gray-400" />
                          ) : (
                            <div className="h-4 w-4" />
                          )}
                          <span className="text-gray-600">
                            {format(new Date(week.weekStart), 'MMM d')} - {format(addWeeks(new Date(week.weekStart), 0).setDate(new Date(week.weekStart).getDate() + 6), 'MMM d')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {(week.totalMinutes / 60).toFixed(1)}h
                          </span>
                          {week.goalTarget && (
                            <span className="text-xs text-gray-400">
                              / {week.goalTarget}h
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Quick Actions */}
        {!currentGoal && (
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-400" />
              {language === 'ta' 
                ? 'படிப்பு திட்டமிடுதலில் செயல்பாடுகளை நிறைவு செய்யுங்கள்' 
                : 'Complete activities in Study Planner to track hours'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
