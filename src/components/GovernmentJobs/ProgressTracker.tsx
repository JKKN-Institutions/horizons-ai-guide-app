import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  TrendingUp, Calendar, Clock, Target, Award, Flame, BarChart3,
  ChevronLeft, ChevronRight, Activity
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, parseISO, isSameDay, isWithinInterval, subWeeks, subMonths } from 'date-fns';
import { useStudyStreak, ACHIEVEMENTS } from '@/hooks/useStudyStreak';

import { Language } from '@/hooks/useLanguage';

interface ProgressTrackerProps {
  language: Language;
}

interface DailyProgress {
  date: string;
  studyMinutes: number;
  activitiesCompleted: number;
  questionsAnswered: number;
  mockTestsTaken: number;
}

interface WeeklyStats {
  week: string;
  totalMinutes: number;
  totalActivities: number;
  avgDailyMinutes: number;
  streakDays: number;
}

const STORAGE_KEY = 'govt_progress_history';

const getStoredProgress = (): DailyProgress[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
};

// Aggregate data from various localStorage sources
const aggregateProgressData = (): DailyProgress[] => {
  const existingProgress = getStoredProgress();
  const progressMap = new Map<string, DailyProgress>();
  
  // Load existing data into map
  existingProgress.forEach(p => {
    progressMap.set(p.date, p);
  });

  // Get practice schedules
  try {
    const schedules = localStorage.getItem('govt_practice_schedules');
    if (schedules) {
      const parsed = JSON.parse(schedules);
      parsed.forEach((schedule: any) => {
        if (schedule.completed && schedule.date) {
          const existing = progressMap.get(schedule.date) || {
            date: schedule.date,
            studyMinutes: 0,
            activitiesCompleted: 0,
            questionsAnswered: 0,
            mockTestsTaken: 0,
          };
          existing.activitiesCompleted += 1;
          existing.studyMinutes += schedule.duration || 0;
          if (schedule.type === 'mock-test') {
            existing.mockTestsTaken += 1;
          }
          progressMap.set(schedule.date, existing);
        }
      });
    }
  } catch {}

  // Get mock test scores
  try {
    const mockScores = localStorage.getItem('govt_mock_test_scores');
    if (mockScores) {
      const parsed = JSON.parse(mockScores);
      parsed.forEach((score: any) => {
        if (score.date) {
          const dateStr = score.date.split('T')[0];
          const existing = progressMap.get(dateStr) || {
            date: dateStr,
            studyMinutes: 0,
            activitiesCompleted: 0,
            questionsAnswered: 0,
            mockTestsTaken: 0,
          };
          existing.questionsAnswered += score.totalQuestions || 0;
          existing.studyMinutes += Math.round((score.timeTaken || 0) / 60);
          progressMap.set(dateStr, existing);
        }
      });
    }
  } catch {}

  // Get streak data for practice history
  try {
    const streakData = localStorage.getItem('govt_study_streak');
    if (streakData) {
      const parsed = JSON.parse(streakData);
      if (parsed.practiceHistory) {
        parsed.practiceHistory.forEach((dateStr: string) => {
          if (!progressMap.has(dateStr)) {
            progressMap.set(dateStr, {
              date: dateStr,
              studyMinutes: 30, // Default practice time
              activitiesCompleted: 1,
              questionsAnswered: 0,
              mockTestsTaken: 0,
            });
          }
        });
      }
    }
  } catch {}

  // Convert to array and sort
  const result = Array.from(progressMap.values()).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Save aggregated data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(result));

  return result;
};

export const ProgressTracker = ({ language }: ProgressTrackerProps) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [activeTab, setActiveTab] = useState('overview');
  const streakData = useStudyStreak();

  const progressData = useMemo(() => aggregateProgressData(), []);

  // Filter data based on time range
  const filteredData = useMemo(() => {
    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case '7d':
        startDate = subDays(now, 7);
        break;
      case '30d':
        startDate = subDays(now, 30);
        break;
      case '90d':
        startDate = subDays(now, 90);
        break;
      default:
        return progressData;
    }

    return progressData.filter(p => new Date(p.date) >= startDate);
  }, [progressData, timeRange]);

  // Generate chart data with all days in range (including zeros)
  const chartData = useMemo(() => {
    const now = new Date();
    let days: number;

    switch (timeRange) {
      case '7d':
        days = 7;
        break;
      case '30d':
        days = 30;
        break;
      case '90d':
        days = 90;
        break;
      default:
        days = 30;
    }

    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(now, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayData = filteredData.find(p => p.date === dateStr);

      result.push({
        date: dateStr,
        displayDate: format(date, 'MMM d'),
        shortDate: format(date, 'd'),
        studyMinutes: dayData?.studyMinutes || 0,
        studyHours: Math.round((dayData?.studyMinutes || 0) / 60 * 10) / 10,
        activitiesCompleted: dayData?.activitiesCompleted || 0,
        questionsAnswered: dayData?.questionsAnswered || 0,
        mockTestsTaken: dayData?.mockTestsTaken || 0,
        hasPracticed: (dayData?.studyMinutes || 0) > 0,
      });
    }

    return result;
  }, [filteredData, timeRange]);

  // Weekly aggregated data
  const weeklyData = useMemo(() => {
    const weeks: WeeklyStats[] = [];
    const now = new Date();
    const numWeeks = timeRange === '7d' ? 1 : timeRange === '30d' ? 4 : timeRange === '90d' ? 12 : 8;

    for (let i = numWeeks - 1; i >= 0; i--) {
      const weekStart = startOfWeek(subWeeks(now, i), { weekStartsOn: 1 });
      const weekEnd = endOfWeek(subWeeks(now, i), { weekStartsOn: 1 });
      const weekLabel = `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d')}`;

      const weekData = filteredData.filter(p => {
        const date = parseISO(p.date);
        return isWithinInterval(date, { start: weekStart, end: weekEnd });
      });

      const totalMinutes = weekData.reduce((sum, d) => sum + d.studyMinutes, 0);
      const totalActivities = weekData.reduce((sum, d) => sum + d.activitiesCompleted, 0);
      const streakDays = weekData.length;

      weeks.push({
        week: weekLabel,
        totalMinutes,
        totalActivities,
        avgDailyMinutes: streakDays > 0 ? Math.round(totalMinutes / 7) : 0,
        streakDays,
      });
    }

    return weeks;
  }, [filteredData, timeRange]);

  // Summary statistics
  const stats = useMemo(() => {
    const totalMinutes = filteredData.reduce((sum, d) => sum + d.studyMinutes, 0);
    const totalActivities = filteredData.reduce((sum, d) => sum + d.activitiesCompleted, 0);
    const totalQuestions = filteredData.reduce((sum, d) => sum + d.questionsAnswered, 0);
    const totalMockTests = filteredData.reduce((sum, d) => sum + d.mockTestsTaken, 0);
    const activeDays = filteredData.filter(d => d.studyMinutes > 0).length;
    const avgDailyMinutes = activeDays > 0 ? Math.round(totalMinutes / activeDays) : 0;

    // Calculate trend (compare last 7 days to previous 7 days)
    const now = new Date();
    const last7Days = progressData.filter(p => {
      const date = new Date(p.date);
      return date >= subDays(now, 7);
    });
    const prev7Days = progressData.filter(p => {
      const date = new Date(p.date);
      return date >= subDays(now, 14) && date < subDays(now, 7);
    });

    const last7Total = last7Days.reduce((sum, d) => sum + d.studyMinutes, 0);
    const prev7Total = prev7Days.reduce((sum, d) => sum + d.studyMinutes, 0);
    const trend = prev7Total > 0 ? Math.round(((last7Total - prev7Total) / prev7Total) * 100) : 0;

    return {
      totalMinutes,
      totalHours: Math.round(totalMinutes / 60 * 10) / 10,
      totalActivities,
      totalQuestions,
      totalMockTests,
      activeDays,
      avgDailyMinutes,
      trend,
    };
  }, [filteredData, progressData]);

  // Streak calendar data
  const streakCalendar = useMemo(() => {
    const now = new Date();
    const days = [];
    
    for (let i = 34; i >= 0; i--) {
      const date = subDays(now, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const hasPracticed = streakData.practiceHistory.includes(dateStr);
      
      days.push({
        date: dateStr,
        day: format(date, 'd'),
        weekday: format(date, 'EEE'),
        hasPracticed,
        isToday: i === 0,
      });
    }

    return days;
  }, [streakData.practiceHistory]);

  const t_text = {
    title: language === 'ta' ? 'முன்னேற்ற கண்காணிப்பு' : 'Progress Tracker',
    overview: language === 'ta' ? 'மேலோட்டம்' : 'Overview',
    studyTime: language === 'ta' ? 'படிப்பு நேரம்' : 'Study Time',
    activities: language === 'ta' ? 'செயல்பாடுகள்' : 'Activities',
    streakHistory: language === 'ta' ? 'ஸ்ட்ரீக் வரலாறு' : 'Streak History',
    totalStudyHours: language === 'ta' ? 'மொத்த படிப்பு மணி' : 'Total Study Hours',
    activeDays: language === 'ta' ? 'செயலில் உள்ள நாட்கள்' : 'Active Days',
    avgDaily: language === 'ta' ? 'சராசரி தினசரி' : 'Avg Daily',
    questionsAnswered: language === 'ta' ? 'பதிலளித்த கேள்விகள்' : 'Questions Answered',
    mockTests: language === 'ta' ? 'மாக் தேர்வுகள்' : 'Mock Tests',
    currentStreak: language === 'ta' ? 'தற்போதைய ஸ்ட்ரீக்' : 'Current Streak',
    bestStreak: language === 'ta' ? 'சிறந்த ஸ்ட்ரீக்' : 'Best Streak',
    weeklyTrend: language === 'ta' ? 'வாராந்திர போக்கு' : 'Weekly Trend',
    dailyProgress: language === 'ta' ? 'தினசரி முன்னேற்றம்' : 'Daily Progress',
    hours: language === 'ta' ? 'மணி' : 'hrs',
    minutes: language === 'ta' ? 'நிமிடம்' : 'min',
    days: language === 'ta' ? 'நாட்கள்' : 'days',
    last7Days: language === 'ta' ? 'கடந்த 7 நாட்கள்' : 'Last 7 Days',
    last30Days: language === 'ta' ? 'கடந்த 30 நாட்கள்' : 'Last 30 Days',
    last90Days: language === 'ta' ? 'கடந்த 90 நாட்கள்' : 'Last 90 Days',
    allTime: language === 'ta' ? 'அனைத்து நேரமும்' : 'All Time',
    compared: language === 'ta' ? 'முந்தைய வாரத்துடன் ஒப்பிடும்போது' : 'vs previous week',
    practiceCalendar: language === 'ta' ? 'பயிற்சி நாட்காட்டி' : 'Practice Calendar',
    achievements: language === 'ta' ? 'சாதனைகள்' : 'Achievements',
    unlocked: language === 'ta' ? 'திறக்கப்பட்டது' : 'Unlocked',
    locked: language === 'ta' ? 'பூட்டப்பட்டது' : 'Locked',
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            {t_text.title}
          </CardTitle>
          <Select value={timeRange} onValueChange={(v: any) => setTimeRange(v)}>
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">{t_text.last7Days}</SelectItem>
              <SelectItem value="30d">{t_text.last30Days}</SelectItem>
              <SelectItem value="90d">{t_text.last90Days}</SelectItem>
              <SelectItem value="all">{t_text.allTime}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-xs text-blue-600">{t_text.totalStudyHours}</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">{stats.totalHours}</p>
            {stats.trend !== 0 && (
              <p className={`text-xs mt-1 ${stats.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.trend > 0 ? '↑' : '↓'} {Math.abs(stats.trend)}% {t_text.compared}
              </p>
            )}
          </div>
          <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-green-600" />
              <span className="text-xs text-green-600">{t_text.activeDays}</span>
            </div>
            <p className="text-2xl font-bold text-green-700">{stats.activeDays}</p>
            <p className="text-xs text-green-600 mt-1">{stats.avgDailyMinutes} {t_text.minutes}/day</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-purple-600" />
              <span className="text-xs text-purple-600">{t_text.questionsAnswered}</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">{stats.totalQuestions}</p>
            <p className="text-xs text-purple-600 mt-1">{stats.totalMockTests} {t_text.mockTests}</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="h-4 w-4 text-orange-600" />
              <span className="text-xs text-orange-600">{t_text.currentStreak}</span>
            </div>
            <p className="text-2xl font-bold text-orange-700">{streakData.currentStreak} 🔥</p>
            <p className="text-xs text-orange-600 mt-1">{t_text.bestStreak}: {streakData.bestStreak}</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview" className="text-xs">{t_text.overview}</TabsTrigger>
            <TabsTrigger value="study" className="text-xs">{t_text.studyTime}</TabsTrigger>
            <TabsTrigger value="streak" className="text-xs">{t_text.streakHistory}</TabsTrigger>
            <TabsTrigger value="achievements" className="text-xs">{t_text.achievements}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* Daily Progress Chart */}
            <div className="p-4 bg-gray-50 rounded-xl border">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                {t_text.dailyProgress}
              </h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorStudy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorActivities" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey={timeRange === '7d' ? 'displayDate' : 'shortDate'} 
                      fontSize={10} 
                      tick={{ fill: '#6b7280' }}
                      interval={timeRange === '90d' ? 6 : timeRange === '30d' ? 3 : 0}
                    />
                    <YAxis fontSize={10} tick={{ fill: '#6b7280' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        fontSize: '12px'
                      }}
                      formatter={(value: number, name: string) => {
                        if (name === 'studyMinutes') return [`${value} min`, t_text.studyTime];
                        if (name === 'activitiesCompleted') return [value, t_text.activities];
                        return [value, name];
                      }}
                      labelFormatter={(label) => label}
                    />
                    <Legend 
                      iconType="circle"
                      formatter={(value) => {
                        if (value === 'studyMinutes') return t_text.studyTime;
                        if (value === 'activitiesCompleted') return t_text.activities;
                        return value;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="studyMinutes" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorStudy)" 
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="activitiesCompleted" 
                      stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#colorActivities)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Weekly Trend */}
            {weeklyData.length > 1 && (
              <div className="p-4 bg-gray-50 rounded-xl border">
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  {t_text.weeklyTrend}
                </h3>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="week" 
                        fontSize={9} 
                        tick={{ fill: '#6b7280' }}
                        angle={-20}
                        textAnchor="end"
                        height={50}
                      />
                      <YAxis fontSize={10} tick={{ fill: '#6b7280' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb',
                          fontSize: '12px'
                        }}
                      />
                      <Bar 
                        dataKey="totalMinutes" 
                        fill="#3b82f6" 
                        radius={[4, 4, 0, 0]}
                        name={t_text.studyTime}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="study" className="space-y-4 mt-4">
            {/* Study Hours Line Chart */}
            <div className="p-4 bg-gray-50 rounded-xl border">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                {t_text.studyTime} ({t_text.minutes})
              </h3>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey={timeRange === '7d' ? 'displayDate' : 'shortDate'} 
                      fontSize={10} 
                      tick={{ fill: '#6b7280' }}
                      interval={timeRange === '90d' ? 6 : timeRange === '30d' ? 3 : 0}
                    />
                    <YAxis fontSize={10} tick={{ fill: '#6b7280' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        fontSize: '12px'
                      }}
                      formatter={(value: number) => [`${value} min`, t_text.studyTime]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="studyMinutes" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6', r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Questions & Mock Tests */}
            <div className="p-4 bg-gray-50 rounded-xl border">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                {t_text.questionsAnswered} & {t_text.mockTests}
              </h3>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey={timeRange === '7d' ? 'displayDate' : 'shortDate'} 
                      fontSize={10} 
                      tick={{ fill: '#6b7280' }}
                      interval={timeRange === '90d' ? 6 : timeRange === '30d' ? 3 : 0}
                    />
                    <YAxis fontSize={10} tick={{ fill: '#6b7280' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        fontSize: '12px'
                      }}
                    />
                    <Legend iconType="circle" />
                    <Bar 
                      dataKey="questionsAnswered" 
                      fill="#f59e0b" 
                      radius={[2, 2, 0, 0]}
                      name={t_text.questionsAnswered}
                    />
                    <Bar 
                      dataKey="mockTestsTaken" 
                      fill="#ec4899" 
                      radius={[2, 2, 0, 0]}
                      name={t_text.mockTests}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="streak" className="space-y-4 mt-4">
            {/* Practice Calendar (Last 35 days) */}
            <div className="p-4 bg-gray-50 rounded-xl border">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t_text.practiceCalendar}
              </h3>
              <div className="grid grid-cols-7 gap-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="text-center text-[10px] text-gray-500 py-1">
                    {language === 'ta' ? day.charAt(0) : day.slice(0, 2)}
                  </div>
                ))}
                {streakCalendar.map((day, i) => (
                  <motion.div
                    key={day.date}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.01 }}
                    className={`
                      aspect-square rounded-md flex items-center justify-center text-xs font-medium
                      ${day.isToday ? 'ring-2 ring-blue-500 ring-offset-1' : ''}
                      ${day.hasPracticed 
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white' 
                        : 'bg-gray-200 text-gray-500'}
                    `}
                    title={day.date}
                  >
                    {day.day}
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-gradient-to-br from-green-400 to-emerald-500" />
                  <span>{language === 'ta' ? 'பயிற்சி செய்தது' : 'Practiced'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-gray-200" />
                  <span>{language === 'ta' ? 'தவறியது' : 'Missed'}</span>
                </div>
              </div>
            </div>

            {/* Streak Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 text-center">
                <p className="text-2xl font-bold text-orange-600">{streakData.currentStreak}</p>
                <p className="text-xs text-orange-600">{t_text.currentStreak}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-center">
                <p className="text-2xl font-bold text-purple-600">{streakData.bestStreak}</p>
                <p className="text-xs text-purple-600">{t_text.bestStreak}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-center">
                <p className="text-2xl font-bold text-blue-600">{streakData.totalDaysPracticed}</p>
                <p className="text-xs text-blue-600">{t_text.activeDays}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-4">
            <ScrollArea className="h-[300px]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ACHIEVEMENTS.map((achievement) => {
                  const isUnlocked = streakData.achievements.includes(achievement.id);
                  return (
                    <motion.div
                      key={achievement.id}
                      whileHover={{ scale: 1.02 }}
                      className={`
                        p-3 rounded-xl border text-center transition-all
                        ${isUnlocked 
                          ? 'bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-300' 
                          : 'bg-gray-100 border-gray-200 opacity-60'}
                      `}
                    >
                      <div className={`text-3xl mb-2 ${isUnlocked ? '' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <p className={`text-sm font-medium ${isUnlocked ? 'text-amber-800' : 'text-gray-500'}`}>
                        {language === 'ta' ? achievement.titleTamil : achievement.title}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1">
                        {achievement.requiredStreak} {t_text.days}
                      </p>
                      <Badge 
                        variant="outline" 
                        className={`mt-2 text-[10px] ${isUnlocked ? 'border-green-500 text-green-600' : ''}`}
                      >
                        {isUnlocked ? t_text.unlocked : t_text.locked}
                      </Badge>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
