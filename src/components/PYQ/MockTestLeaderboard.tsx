import { useMemo, useState } from 'react';
import { 
  Trophy, TrendingUp, TrendingDown, Clock, Target, Award,
  Calendar, Trash2, Zap, BarChart3, LineChart as LineChartIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  Cell,
  Legend,
} from 'recharts';
import { useMockTestScores, MockTestScore } from '@/hooks/useMockTestScores';

interface MockTestLeaderboardProps {
  language?: 'en' | 'ta';
}

const SUBJECT_COLORS: Record<string, string> = {
  physics: '#8b5cf6',
  chemistry: '#06b6d4',
  mathematics: '#f59e0b',
  biology: '#10b981',
  general: '#6366f1',
};

const chartConfig = {
  accuracy: { label: 'Accuracy', color: 'hsl(var(--primary))' },
  score: { label: 'Score', color: 'hsl(262 83% 58%)' },
  physics: { label: 'Physics', color: '#8b5cf6' },
  chemistry: { label: 'Chemistry', color: '#06b6d4' },
  mathematics: { label: 'Mathematics', color: '#f59e0b' },
  biology: { label: 'Biology', color: '#10b981' },
  general: { label: 'General', color: '#6366f1' },
};

export const MockTestLeaderboard = ({ language = 'en' }: MockTestLeaderboardProps) => {
  const { 
    scores, 
    getRecentScores, 
    getBestScore, 
    getAverageAccuracy, 
    getAverageScore,
    clearAllScores,
    deleteScore,
    totalAttempts 
  } = useMockTestScores();
  
  const [activeTab, setActiveTab] = useState('history');

  const recentScores = getRecentScores(10);
  const bestScore = getBestScore();
  const avgAccuracy = getAverageAccuracy();
  const avgScore = getAverageScore();

  // Performance trend over time
  const performanceTrendData = useMemo(() => {
    return scores
      .slice(0, 10)
      .reverse()
      .map((score, index) => ({
        attempt: `#${index + 1}`,
        date: new Date(score.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        accuracy: score.accuracy,
        score: Math.round((score.obtainedMarks / score.totalMarks) * 100),
        correct: score.correct,
        incorrect: score.incorrect,
      }));
  }, [scores]);

  // Subject-wise aggregated performance
  const subjectPerformanceData = useMemo(() => {
    const subjectStats: Record<string, { total: number; correct: number; attempts: number }> = {};
    
    scores.forEach(score => {
      Object.entries(score.subjectWise || {}).forEach(([subject, data]) => {
        const normalizedSubject = subject.toLowerCase();
        if (!subjectStats[normalizedSubject]) {
          subjectStats[normalizedSubject] = { total: 0, correct: 0, attempts: 0 };
        }
        subjectStats[normalizedSubject].total += data.total;
        subjectStats[normalizedSubject].correct += data.correct;
        subjectStats[normalizedSubject].attempts += 1;
      });
    });

    return Object.entries(subjectStats)
      .filter(([_, data]) => data.total > 0)
      .map(([subject, data]) => ({
        subject: subject.charAt(0).toUpperCase() + subject.slice(1),
        accuracy: Math.round((data.correct / data.total) * 100),
        questions: data.total,
        correct: data.correct,
        color: SUBJECT_COLORS[subject] || '#6366f1',
      }));
  }, [scores]);

  // Subject-wise trend over time
  const subjectTrendData = useMemo(() => {
    return scores
      .slice(0, 8)
      .reverse()
      .map((score, index) => {
        const entry: Record<string, any> = {
          attempt: `#${index + 1}`,
          date: new Date(score.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        };
        
        Object.entries(score.subjectWise || {}).forEach(([subject, data]) => {
          const normalizedSubject = subject.toLowerCase();
          entry[normalizedSubject] = data.total > 0 
            ? Math.round((data.correct / data.total) * 100) 
            : 0;
        });
        
        return entry;
      });
  }, [scores]);

  // Get unique subjects from all scores
  const allSubjects = useMemo(() => {
    const subjects = new Set<string>();
    scores.forEach(score => {
      Object.keys(score.subjectWise || {}).forEach(subject => {
        subjects.add(subject.toLowerCase());
      });
    });
    return Array.from(subjects);
  }, [scores]);

  const performanceTrend = useMemo(() => {
    if (scores.length < 2) return 'neutral';
    const recent = scores.slice(0, 3);
    const older = scores.slice(3, 6);
    if (older.length === 0) return 'neutral';
    
    const recentAvg = recent.reduce((sum, s) => sum + s.accuracy, 0) / recent.length;
    const olderAvg = older.reduce((sum, s) => sum + s.accuracy, 0) / older.length;
    
    if (recentAvg > olderAvg + 5) return 'up';
    if (recentAvg < olderAvg - 5) return 'down';
    return 'neutral';
  }, [scores]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short',
      year: '2-digit'
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-emerald-600 bg-emerald-50';
    if (accuracy >= 60) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreGradient = (index: number) => {
    if (index === 0) return 'from-amber-400 to-yellow-500';
    if (index === 1) return 'from-gray-300 to-gray-400';
    if (index === 2) return 'from-amber-600 to-amber-700';
    return 'from-slate-200 to-slate-300';
  };

  const getMedalIcon = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  if (totalAttempts === 0) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-50 to-gray-100 overflow-hidden">
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            {language === 'en' ? 'No Mock Tests Yet' : 'இதுவரை சோதனைகள் இல்லை'}
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            {language === 'en' 
              ? 'Complete a mock test to see your scores and track your progress here!'
              : 'உங்கள் மதிப்பெண்களைக் காண சோதனையை முடிக்கவும்!'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-white">
                {language === 'en' ? 'Mock Test Leaderboard' : 'சோதனை தரவரிசை'}
              </CardTitle>
              <p className="text-white/80 text-sm mt-0.5">
                {language === 'en' ? `${totalAttempts} attempts` : `${totalAttempts} முயற்சிகள்`}
              </p>
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white/80 hover:text-white hover:bg-white/20"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                {language === 'en' ? 'Clear All' : 'அனைத்தையும் அழி'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear All Scores?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all your mock test history. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearAllScores} className="bg-red-600 hover:bg-red-700">
                  Clear All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">
                {language === 'en' ? 'Best Score' : 'சிறந்த மதிப்பெண்'}
              </span>
            </div>
            <div className="text-2xl font-bold text-emerald-700">
              {bestScore?.obtainedMarks || 0}/{bestScore?.totalMarks || 0}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">
                {language === 'en' ? 'Avg Accuracy' : 'சராசரி துல்லியம்'}
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-700">{avgAccuracy}%</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-medium text-purple-700">
                {language === 'en' ? 'Avg Score' : 'சராசரி மதிப்பெண்'}
              </span>
            </div>
            <div className="text-2xl font-bold text-purple-700">{avgScore}</div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
            <div className="flex items-center gap-2 mb-2">
              {performanceTrend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              ) : performanceTrend === 'down' ? (
                <TrendingDown className="w-4 h-4 text-red-600" />
              ) : (
                <Zap className="w-4 h-4 text-amber-600" />
              )}
              <span className="text-xs font-medium text-amber-700">
                {language === 'en' ? 'Trend' : 'போக்கு'}
              </span>
            </div>
            <div className={`text-lg font-bold ${
              performanceTrend === 'up' ? 'text-emerald-600' :
              performanceTrend === 'down' ? 'text-red-600' : 'text-amber-600'
            }`}>
              {performanceTrend === 'up' ? (language === 'en' ? 'Improving!' : 'முன்னேற்றம்!') :
               performanceTrend === 'down' ? (language === 'en' ? 'Needs Work' : 'பயிற்சி தேவை') :
               (language === 'en' ? 'Steady' : 'நிலையான')}
            </div>
          </div>
        </div>

        {/* Tabs for History and Charts */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-slate-100">
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'History' : 'வரலாறு'}</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <LineChartIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'Trends' : 'போக்குகள்'}</span>
            </TabsTrigger>
            <TabsTrigger value="subjects" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'Subjects' : 'பாடங்கள்'}</span>
            </TabsTrigger>
          </TabsList>

          {/* History Tab */}
          <TabsContent value="history" className="mt-0">
            <ScrollArea className="h-[360px] pr-4">
              <div className="space-y-3">
                {recentScores.map((score, index) => (
                  <div 
                    key={score.id}
                    className="group relative bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank Badge */}
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getScoreGradient(index)} flex items-center justify-center shadow-md text-white font-bold text-sm`}>
                        {getMedalIcon(index)}
                      </div>

                      {/* Main Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground truncate">
                            {score.examName}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {score.totalQuestions} Qs
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(score.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(score.timeTaken)}
                          </span>
                        </div>
                      </div>

                      {/* Score & Accuracy */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">
                          {score.obtainedMarks}/{score.totalMarks}
                        </div>
                        <Badge className={`${getAccuracyColor(score.accuracy)} border-0 text-xs`}>
                          {score.accuracy}% accuracy
                        </Badge>
                      </div>

                      {/* Delete Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-red-600"
                        onClick={() => deleteScore(score.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Correct: {score.correct}</span>
                        <span>Wrong: {score.incorrect}</span>
                        <span>Skipped: {score.unattempted}</span>
                      </div>
                      <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                        <div 
                          className="bg-emerald-500 transition-all"
                          style={{ width: `${(score.correct / score.totalQuestions) * 100}%` }}
                        />
                        <div 
                          className="bg-red-500 transition-all"
                          style={{ width: `${(score.incorrect / score.totalQuestions) * 100}%` }}
                        />
                        <div 
                          className="bg-gray-400 transition-all"
                          style={{ width: `${(score.unattempted / score.totalQuestions) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="mt-0">
            <div className="space-y-6">
              {/* Accuracy Trend Chart */}
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-4 border border-gray-100">
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  {language === 'en' ? 'Accuracy Over Time' : 'நேர அடிப்படையில் துல்லியம்'}
                </h4>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                  <AreaChart data={performanceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(262 83% 58%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(262 83% 58%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 11 }} 
                      tickLine={false}
                      axisLine={false}
                      className="text-muted-foreground"
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      tick={{ fontSize: 11 }} 
                      tickLine={false}
                      axisLine={false}
                      className="text-muted-foreground"
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="hsl(262 83% 58%)" 
                      strokeWidth={2}
                      fill="url(#accuracyGradient)" 
                    />
                  </AreaChart>
                </ChartContainer>
              </div>

              {/* Subject-wise Trend Chart */}
              {allSubjects.length > 0 && (
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-4 border border-gray-100">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <LineChartIcon className="w-4 h-4 text-primary" />
                    {language === 'en' ? 'Subject-wise Trends' : 'பாட வாரியான போக்குகள்'}
                  </h4>
                  <ChartContainer config={chartConfig} className="h-[220px] w-full">
                    <LineChart data={subjectTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 11 }} 
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        domain={[0, 100]} 
                        tick={{ fontSize: 11 }} 
                        tickLine={false}
                        axisLine={false}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      {allSubjects.map((subject) => (
                        <Line
                          key={subject}
                          type="monotone"
                          dataKey={subject}
                          name={subject.charAt(0).toUpperCase() + subject.slice(1)}
                          stroke={SUBJECT_COLORS[subject] || '#6366f1'}
                          strokeWidth={2}
                          dot={{ fill: SUBJECT_COLORS[subject] || '#6366f1', strokeWidth: 0, r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      ))}
                    </LineChart>
                  </ChartContainer>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Subjects Tab */}
          <TabsContent value="subjects" className="mt-0">
            <div className="space-y-6">
              {/* Subject-wise Bar Chart */}
              {subjectPerformanceData.length > 0 ? (
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-4 border border-gray-100">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    {language === 'en' ? 'Subject-wise Accuracy' : 'பாட வாரியான துல்லியம்'}
                  </h4>
                  <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <BarChart data={subjectPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="subject" 
                        tick={{ fontSize: 11 }} 
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        domain={[0, 100]} 
                        tick={{ fontSize: 11 }} 
                        tickLine={false}
                        axisLine={false}
                      />
                      <ChartTooltip 
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white rounded-lg shadow-lg border p-3">
                              <p className="font-semibold text-foreground">{data.subject}</p>
                              <p className="text-sm text-muted-foreground">
                                Accuracy: <span className="font-medium text-foreground">{data.accuracy}%</span>
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Questions: <span className="font-medium text-foreground">{data.questions}</span>
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Correct: <span className="font-medium text-emerald-600">{data.correct}</span>
                              </p>
                            </div>
                          );
                        }}
                      />
                      <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                        {subjectPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-8 border border-gray-100 text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    {language === 'en' 
                      ? 'No subject-wise data available yet. Complete more tests to see insights!'
                      : 'பாட தரவு இன்னும் கிடைக்கவில்லை!'}
                  </p>
                </div>
              )}

              {/* Subject Performance Cards */}
              {subjectPerformanceData.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {subjectPerformanceData.map((subject) => (
                    <div 
                      key={subject.subject}
                      className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: subject.color }}
                        />
                        <span className="font-medium text-foreground text-sm">{subject.subject}</span>
                      </div>
                      <div className="text-2xl font-bold" style={{ color: subject.color }}>
                        {subject.accuracy}%
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {subject.correct}/{subject.questions} correct
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MockTestLeaderboard;
