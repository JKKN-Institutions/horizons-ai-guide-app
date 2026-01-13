import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  Calendar, Clock, FileQuestion, Target, TrendingUp, Trophy,
  Flame, Award, Download, BarChart3, PieChartIcon, FileDown
} from 'lucide-react';
import { useGovtMockTestScores, GovtMockTestScore } from '@/hooks/useGovtMockTestScores';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';
import { generateSummaryReportPDF } from './generateSummaryReportPDF';
import { toast } from 'sonner';

import { Language } from '@/hooks/useLanguage';

interface StudySummaryReportsProps {
  language: Language;
}

const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

interface DailyStats {
  date: string;
  displayDate: string;
  questions: number;
  timeMinutes: number;
  goalsCompleted: number;
  totalGoals: number;
}

const getStoredDailyProgress = (): Record<string, { questions: number; time: number; goalsCompleted: number; totalGoals: number }> => {
  try {
    const stored = localStorage.getItem('govt_study_history');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {}
  return {};
};

const updateStudyHistory = (date: string, questions: number, time: number, goalsCompleted: number, totalGoals: number) => {
  const history = getStoredDailyProgress();
  history[date] = { questions, time, goalsCompleted, totalGoals };
  localStorage.setItem('govt_study_history', JSON.stringify(history));
};

export const StudySummaryReports = ({ language }: StudySummaryReportsProps) => {
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const { scores } = useGovtMockTestScores();
  const { practiceHistory, totalDaysPracticed, currentStreak, bestStreak } = useStudyStreak();

  // Calculate date ranges
  const dateRanges = useMemo(() => {
    const today = new Date();
    return {
      week: {
        start: startOfWeek(today, { weekStartsOn: 1 }),
        end: endOfWeek(today, { weekStartsOn: 1 }),
      },
      month: {
        start: startOfMonth(today),
        end: endOfMonth(today),
      },
    };
  }, []);

  // Filter scores by period
  const periodScores = useMemo(() => {
    const range = dateRanges[period];
    return scores.filter(score => {
      const scoreDate = parseISO(score.date);
      return isWithinInterval(scoreDate, { start: range.start, end: range.end });
    });
  }, [scores, period, dateRanges]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalQuestions = periodScores.reduce((sum, s) => sum + s.totalQuestions, 0);
    const totalCorrect = periodScores.reduce((sum, s) => sum + s.correct, 0);
    const totalTimeSeconds = periodScores.reduce((sum, s) => sum + s.timeTaken, 0);
    const avgAccuracy = periodScores.length > 0 
      ? Math.round(periodScores.reduce((sum, s) => sum + s.percentage, 0) / periodScores.length)
      : 0;
    
    // Count practice days in period
    const range = dateRanges[period];
    const practiceDaysInPeriod = practiceHistory.filter(dateStr => {
      const date = parseISO(dateStr);
      return isWithinInterval(date, { start: range.start, end: range.end });
    }).length;

    // Calculate total days in period
    const totalDaysInPeriod = period === 'week' ? 7 : new Date(range.end).getDate();

    return {
      totalQuestions,
      totalCorrect,
      totalTimeMinutes: Math.round(totalTimeSeconds / 60),
      totalTimeHours: (totalTimeSeconds / 3600).toFixed(1),
      avgAccuracy,
      testsCompleted: periodScores.length,
      practiceDays: practiceDaysInPeriod,
      totalDays: totalDaysInPeriod,
      consistencyRate: Math.round((practiceDaysInPeriod / totalDaysInPeriod) * 100),
    };
  }, [periodScores, practiceHistory, period, dateRanges]);

  // Daily breakdown for charts
  const dailyBreakdown = useMemo(() => {
    const range = dateRanges[period];
    const days: DailyStats[] = [];
    let currentDate = new Date(range.start);

    while (currentDate <= range.end && currentDate <= new Date()) {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      const dayScores = scores.filter(s => s.date.startsWith(dateStr));
      
      days.push({
        date: dateStr,
        displayDate: format(currentDate, period === 'week' ? 'EEE' : 'MMM d'),
        questions: dayScores.reduce((sum, s) => sum + s.totalQuestions, 0),
        timeMinutes: Math.round(dayScores.reduce((sum, s) => sum + s.timeTaken, 0) / 60),
        goalsCompleted: 0, // Would need goal tracking per day
        totalGoals: 0,
      });
      
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }
    
    return days;
  }, [scores, period, dateRanges]);

  // Category breakdown
  const categoryBreakdown = useMemo(() => {
    const breakdown: Record<string, { questions: number; correct: number; time: number }> = {};
    
    periodScores.forEach(score => {
      if (!breakdown[score.categoryLabel]) {
        breakdown[score.categoryLabel] = { questions: 0, correct: 0, time: 0 };
      }
      breakdown[score.categoryLabel].questions += score.totalQuestions;
      breakdown[score.categoryLabel].correct += score.correct;
      breakdown[score.categoryLabel].time += score.timeTaken;
    });

    return Object.entries(breakdown).map(([category, data]) => ({
      category: category.length > 12 ? category.substring(0, 12) + '...' : category,
      fullCategory: category,
      questions: data.questions,
      accuracy: data.questions > 0 ? Math.round((data.correct / data.questions) * 100) : 0,
      timeMinutes: Math.round(data.time / 60),
    }));
  }, [periodScores]);

  // Accuracy trend data
  const accuracyTrend = useMemo(() => {
    return periodScores.slice().reverse().map((score, index) => ({
      attempt: index + 1,
      accuracy: score.percentage,
      date: format(parseISO(score.date), 'MMM d'),
    }));
  }, [periodScores]);

  const StatCard = ({ 
    icon: Icon, 
    value, 
    label, 
    sublabel,
    color 
  }: { 
    icon: typeof Calendar; 
    value: string | number; 
    label: string; 
    sublabel?: string;
    color: string;
  }) => (
    <div className={`p-4 rounded-xl border bg-gradient-to-br ${color}`}>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/80 rounded-lg">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm opacity-80">{label}</p>
          {sublabel && <p className="text-xs opacity-60">{sublabel}</p>}
        </div>
      </div>
    </div>
  );

  const handleExportPDF = () => {
    toast.info(language === 'en' ? 'Generating PDF...' : 'PDF உருவாக்கப்படுகிறது...');
    
    try {
      generateSummaryReportPDF({
        period,
        dateRange: dateRanges[period],
        summaryStats,
        dailyBreakdown: dailyBreakdown.map(d => ({
          displayDate: d.displayDate,
          questions: d.questions,
          timeMinutes: d.timeMinutes
        })),
        categoryBreakdown: categoryBreakdown.map(c => ({
          fullCategory: c.fullCategory,
          questions: c.questions,
          accuracy: c.accuracy,
          timeMinutes: c.timeMinutes
        })),
        streakData: {
          currentStreak,
          bestStreak,
          totalDaysPracticed
        },
        language
      });
      
      toast.success(language === 'en' ? 'PDF downloaded successfully!' : 'PDF வெற்றிகரமாக பதிவிறக்கம் செய்யப்பட்டது!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error(language === 'en' ? 'Failed to generate PDF' : 'PDF உருவாக்க முடியவில்லை');
    }
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            {language === 'ta' ? 'படிப்பு சுருக்க அறிக்கைகள்' : 'Study Summary Reports'}
          </CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <Tabs value={period} onValueChange={(v) => setPeriod(v as 'week' | 'month')}>
              <TabsList className="h-9">
                <TabsTrigger value="week" className="text-sm">
                  {language === 'ta' ? 'வாரம்' : 'This Week'}
                </TabsTrigger>
                <TabsTrigger value="month" className="text-sm">
                  {language === 'ta' ? 'மாதம்' : 'This Month'}
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              className="gap-2 bg-gradient-to-r from-blue-50 to-green-50 hover:from-blue-100 hover:to-green-100 border-blue-200"
            >
              <FileDown className="h-4 w-4 text-blue-600" />
              <span className="hidden sm:inline">
                {language === 'ta' ? 'PDF பதிவிறக்கம்' : 'Export PDF'}
              </span>
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          {format(dateRanges[period].start, 'MMM d')} - {format(dateRanges[period].end, 'MMM d, yyyy')}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            icon={FileQuestion}
            value={summaryStats.totalQuestions}
            label={language === 'ta' ? 'கேள்விகள்' : 'Questions'}
            sublabel={`${summaryStats.totalCorrect} ${language === 'ta' ? 'சரி' : 'correct'}`}
            color="from-blue-50 to-blue-100 border-blue-200 text-blue-800"
          />
          <StatCard
            icon={Clock}
            value={summaryStats.totalTimeMinutes < 60 
              ? `${summaryStats.totalTimeMinutes}m` 
              : `${summaryStats.totalTimeHours}h`}
            label={language === 'ta' ? 'படிப்பு நேரம்' : 'Study Time'}
            sublabel={`${summaryStats.testsCompleted} ${language === 'ta' ? 'தேர்வுகள்' : 'tests'}`}
            color="from-green-50 to-green-100 border-green-200 text-green-800"
          />
          <StatCard
            icon={Target}
            value={`${summaryStats.avgAccuracy}%`}
            label={language === 'ta' ? 'சராசரி துல்லியம்' : 'Avg Accuracy'}
            sublabel={summaryStats.avgAccuracy >= 70 ? '🎯 Great!' : '📈 Keep going!'}
            color="from-amber-50 to-amber-100 border-amber-200 text-amber-800"
          />
          <StatCard
            icon={Flame}
            value={`${summaryStats.practiceDays}/${summaryStats.totalDays}`}
            label={language === 'ta' ? 'பயிற்சி நாட்கள்' : 'Practice Days'}
            sublabel={`${summaryStats.consistencyRate}% ${language === 'ta' ? 'நிலைத்தன்மை' : 'consistency'}`}
            color="from-purple-50 to-purple-100 border-purple-200 text-purple-800"
          />
        </div>

        {/* Streak & Achievement Banner */}
        <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span className="text-2xl font-bold text-orange-600">{currentStreak}</span>
                </div>
                <p className="text-xs text-orange-700">
                  {language === 'ta' ? 'தற்போதைய தொடர்' : 'Current Streak'}
                </p>
              </div>
              <div className="h-10 w-px bg-orange-200" />
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  <span className="text-2xl font-bold text-amber-600">{bestStreak}</span>
                </div>
                <p className="text-xs text-amber-700">
                  {language === 'ta' ? 'சிறந்த தொடர்' : 'Best Streak'}
                </p>
              </div>
              <div className="h-10 w-px bg-orange-200" />
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Award className="h-5 w-5 text-green-500" />
                  <span className="text-2xl font-bold text-green-600">{totalDaysPracticed}</span>
                </div>
                <p className="text-xs text-green-700">
                  {language === 'ta' ? 'மொத்த நாட்கள்' : 'Total Days'}
                </p>
              </div>
            </div>
            <Badge className={`${summaryStats.consistencyRate >= 70 ? 'bg-green-500' : summaryStats.consistencyRate >= 50 ? 'bg-amber-500' : 'bg-gray-500'}`}>
              {summaryStats.consistencyRate >= 70 
                ? (language === 'ta' ? '🌟 சிறப்பு!' : '🌟 Excellent!')
                : summaryStats.consistencyRate >= 50
                  ? (language === 'ta' ? '👍 நல்லது!' : '👍 Good!')
                  : (language === 'ta' ? '💪 மேம்படுத்தவும்' : '💪 Keep improving!')}
            </Badge>
          </div>
        </div>

        {/* Charts Section */}
        {periodScores.length > 0 ? (
          <div className="space-y-6">
            {/* Daily Activity Chart */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {language === 'ta' ? 'தினசரி செயல்பாடு' : 'Daily Activity'}
              </h3>
              <div className="h-48 bg-gray-50 rounded-lg p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="displayDate" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      formatter={(value: number, name: string) => [
                        value,
                        name === 'questions' 
                          ? (language === 'ta' ? 'கேள்விகள்' : 'Questions')
                          : (language === 'ta' ? 'நிமிடங்கள்' : 'Minutes')
                      ]}
                    />
                    <Bar dataKey="questions" fill="#3B82F6" radius={[4, 4, 0, 0]} name="questions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Accuracy Trend */}
            {accuracyTrend.length > 1 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  {language === 'ta' ? 'துல்லியம் போக்கு' : 'Accuracy Trend'}
                </h3>
                <div className="h-48 bg-gray-50 rounded-lg p-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={accuracyTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                        formatter={(value: number) => [`${value}%`, language === 'ta' ? 'துல்லியம்' : 'Accuracy']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="accuracy" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        dot={{ fill: '#10B981', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Category Breakdown */}
            {categoryBreakdown.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <PieChartIcon className="h-4 w-4" />
                    {language === 'ta' ? 'வகை வாரியாக' : 'By Category'}
                  </h3>
                  <div className="h-48 bg-gray-50 rounded-lg p-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryBreakdown}
                          dataKey="questions"
                          nameKey="category"
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {categoryBreakdown.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    {language === 'ta' ? 'வகை துல்லியம்' : 'Category Accuracy'}
                  </h3>
                  <div className="space-y-3 bg-gray-50 rounded-lg p-3">
                    {categoryBreakdown.map((cat, index) => (
                      <div key={cat.fullCategory}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600 truncate max-w-[120px]" title={cat.fullCategory}>
                            {cat.category}
                          </span>
                          <span className="font-medium">{cat.accuracy}%</span>
                        </div>
                        <Progress 
                          value={cat.accuracy} 
                          className="h-2"
                          style={{ 
                            '--progress-background': CHART_COLORS[index % CHART_COLORS.length] 
                          } as React.CSSProperties}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <FileQuestion className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">
              {language === 'ta' 
                ? 'இந்த காலத்தில் தரவு இல்லை. மாக் டெஸ்ட் எடுக்கவும்!' 
                : 'No data for this period. Take a mock test to get started!'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {language === 'ta' 
                ? 'உங்கள் முன்னேற்றம் இங்கே காண்பிக்கப்படும்' 
                : 'Your progress will be displayed here'}
            </p>
          </div>
        )}

        {/* Weekly/Monthly Comparison */}
        {summaryStats.testsCompleted > 0 && (
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-3">
              {language === 'ta' ? '📊 விரைவு பார்வை' : '📊 Quick Insights'}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-blue-600">
                  {language === 'ta' ? 'சராசரி தேர்வு நேரம்' : 'Avg test duration'}
                </p>
                <p className="font-semibold text-blue-800">
                  {Math.round(summaryStats.totalTimeMinutes / summaryStats.testsCompleted)} {language === 'ta' ? 'நிமிடங்கள்' : 'mins'}
                </p>
              </div>
              <div>
                <p className="text-blue-600">
                  {language === 'ta' ? 'தேர்வுக்கு கேள்விகள்' : 'Questions per test'}
                </p>
                <p className="font-semibold text-blue-800">
                  {Math.round(summaryStats.totalQuestions / summaryStats.testsCompleted)}
                </p>
              </div>
              <div>
                <p className="text-blue-600">
                  {language === 'ta' ? 'வெற்றி விகிதம்' : 'Success rate'}
                </p>
                <p className="font-semibold text-blue-800">
                  {summaryStats.totalQuestions > 0 
                    ? Math.round((summaryStats.totalCorrect / summaryStats.totalQuestions) * 100)
                    : 0}%
                </p>
              </div>
              <div>
                <p className="text-blue-600">
                  {language === 'ta' ? 'படிப்பு நாட்கள்' : 'Active days'}
                </p>
                <p className="font-semibold text-blue-800">
                  {summaryStats.practiceDays} / {summaryStats.totalDays}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tips based on performance */}
        <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
          <div className="flex items-start gap-2">
            <span className="text-lg">💡</span>
            <div>
              <p className="text-xs font-medium text-green-700">
                {language === 'ta' ? 'பரிந்துரை' : 'Recommendation'}
              </p>
              <p className="text-xs text-green-600">
                {summaryStats.consistencyRate < 50 
                  ? (language === 'ta' 
                      ? 'தினமும் பயிற்சி செய்ய முயற்சிக்கவும். சிறிய படிகள் கூட பெரிய முன்னேற்றத்திற்கு வழிவகுக்கும்!'
                      : 'Try to practice daily. Even small steps lead to big progress!')
                  : summaryStats.avgAccuracy < 60
                    ? (language === 'ta'
                        ? 'அடிப்படைகளில் கவனம் செலுத்துங்கள். ஒவ்வொரு தவறான பதிலையும் மறுபரிசீலனை செய்யுங்கள்.'
                        : 'Focus on fundamentals. Review each wrong answer carefully.')
                    : (language === 'ta'
                        ? 'சிறப்பான முன்னேற்றம்! கடினமான கேள்விகளை முயற்சிக்க தயாராகுங்கள்.'
                        : 'Great progress! You\'re ready to try harder questions.')}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
