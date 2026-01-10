import { useMemo } from 'react';
import { motion } from 'framer-motion';
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
  Trophy, Target, TrendingUp, TrendingDown, Trash2, Clock,
  BarChart3, History, Award, Medal, ChevronUp, ChevronDown,
  Shield, Train, FileText, Landmark, MapPin, Building2
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, LineChart, Line
} from 'recharts';
import { useLanguage } from '@/hooks/useLanguage';
import { useGovtMockTestScores, GovtMockTestScore } from '@/hooks/useGovtMockTestScores';
import { categoryInfo } from './governmentExamsData';
import { format } from 'date-fns';

const CATEGORY_COLORS: Record<string, string> = {
  defence: '#8B5CF6',
  railway: '#F97316',
  ssc: '#3B82F6',
  banking: '#10B981',
  state: '#EC4899',
  central: '#6366F1',
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'defence': return Shield;
    case 'railway': return Train;
    case 'ssc': return FileText;
    case 'banking': return Landmark;
    case 'state': return MapPin;
    case 'central': return Building2;
    default: return Target;
  }
};

export const GovtMockTestProgress = () => {
  const { language } = useLanguage();
  const {
    scores,
    totalAttempts,
    getRecentScores,
    getBestScore,
    getAveragePercentage,
    getCategoryStats,
    getImprovementTrend,
    clearAllScores,
    deleteScore,
  } = useGovtMockTestScores();

  const recentScores = getRecentScores(20);
  const bestScore = getBestScore();
  const avgPercentage = getAveragePercentage();
  const categoryStats = getCategoryStats();
  const improvementTrend = getImprovementTrend();

  // Performance trend data for chart
  const trendData = useMemo(() => {
    return recentScores.slice(0, 10).reverse().map((score, index) => ({
      attempt: index + 1,
      percentage: score.percentage,
      category: score.categoryLabel,
      date: format(new Date(score.date), 'MMM dd'),
    }));
  }, [recentScores]);

  // Category-wise performance data
  const categoryChartData = useMemo(() => {
    return Object.entries(categoryStats).map(([cat, stats]) => ({
      category: categoryInfo[cat as keyof typeof categoryInfo]?.label || cat,
      avgPercentage: stats.avgPercentage,
      bestPercentage: stats.bestPercentage,
      attempts: stats.attempts,
      fill: CATEGORY_COLORS[cat] || '#6B7280',
    }));
  }, [categoryStats]);

  // Subject-wise performance aggregation
  const subjectPerformance = useMemo(() => {
    const subjects: Record<string, { total: number; correct: number }> = {};
    scores.forEach(score => {
      Object.entries(score.subjectWise).forEach(([subject, data]) => {
        if (!subjects[subject]) {
          subjects[subject] = { total: 0, correct: 0 };
        }
        subjects[subject].total += data.total;
        subjects[subject].correct += data.correct;
      });
    });
    return Object.entries(subjects).map(([subject, data]) => ({
      subject,
      accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      questions: data.total,
    })).sort((a, b) => b.accuracy - a.accuracy);
  }, [scores]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPercentageColor = (pct: number) => {
    if (pct >= 80) return 'text-green-600';
    if (pct >= 60) return 'text-blue-600';
    if (pct >= 40) return 'text-amber-600';
    return 'text-red-600';
  };

  const getMedalIcon = (rank: number) => {
    if (rank === 0) return <Medal className="h-4 w-4 text-yellow-500" />;
    if (rank === 1) return <Medal className="h-4 w-4 text-gray-400" />;
    if (rank === 2) return <Medal className="h-4 w-4 text-amber-600" />;
    return null;
  };

  if (totalAttempts === 0) {
    return (
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {language === 'ta' ? 'இன்னும் முயற்சிகள் இல்லை' : 'No Attempts Yet'}
          </h3>
          <p className="text-gray-500 text-sm">
            {language === 'ta' 
              ? 'உங்கள் முன்னேற்றத்தைக் கண்காணிக்க மாக் டெஸ்ட் எடுக்கவும்'
              : 'Take a mock test to start tracking your progress'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            {language === 'ta' ? 'உங்கள் முன்னேற்றம்' : 'Your Progress'}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <History className="h-3 w-3" />
              {totalAttempts} {language === 'ta' ? 'முயற்சிகள்' : 'attempts'}
            </Badge>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {language === 'ta' ? 'அனைத்து வரலாற்றையும் அழிக்கவா?' : 'Clear All History?'}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {language === 'ta' 
                      ? 'இது உங்கள் அனைத்து மாக் டெஸ்ட் முடிவுகளையும் நீக்கும். இது செயல்தவிர்க்க முடியாது.'
                      : 'This will permanently delete all your mock test results. This action cannot be undone.'}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{language === 'ta' ? 'ரத்து' : 'Cancel'}</AlertDialogCancel>
                  <AlertDialogAction onClick={clearAllScores} className="bg-red-500 hover:bg-red-600">
                    {language === 'ta' ? 'அழி' : 'Delete'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 border border-yellow-200 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-xs text-gray-500">
                {language === 'ta' ? 'சிறந்த மதிப்பெண்' : 'Best Score'}
              </span>
            </div>
            <p className="text-2xl font-bold text-yellow-600">
              {bestScore?.percentage || 0}%
            </p>
            {bestScore && (
              <p className="text-xs text-gray-400 truncate">{bestScore.categoryLabel}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-gray-500">
                {language === 'ta' ? 'சராசரி' : 'Average'}
              </span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{avgPercentage}%</p>
            <p className="text-xs text-gray-400">{totalAttempts} tests</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 border border-green-200 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              {improvementTrend && improvementTrend.change >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className="text-xs text-gray-500">
                {language === 'ta' ? 'போக்கு' : 'Trend'}
              </span>
            </div>
            {improvementTrend ? (
              <>
                <p className={`text-2xl font-bold ${improvementTrend.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {improvementTrend.change >= 0 ? '+' : ''}{improvementTrend.change}%
                </p>
                <p className="text-xs text-gray-400">
                  {language === 'ta' ? 'சமீபத்திய vs முந்தைய' : 'recent vs previous'}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-400">
                {language === 'ta' ? 'அதிக தரவு தேவை' : 'Need more data'}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-4 border border-purple-200 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <Award className="h-4 w-4 text-purple-500" />
              <span className="text-xs text-gray-500">
                {language === 'ta' ? 'வகைகள்' : 'Categories'}
              </span>
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {Object.keys(categoryStats).length}
            </p>
            <p className="text-xs text-gray-400">
              {language === 'ta' ? 'பயிற்சி செய்யப்பட்டது' : 'practiced'}
            </p>
          </motion.div>
        </div>

        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="trends" className="text-xs gap-1">
              <TrendingUp className="h-3 w-3" />
              {language === 'ta' ? 'போக்குகள்' : 'Trends'}
            </TabsTrigger>
            <TabsTrigger value="categories" className="text-xs gap-1">
              <BarChart3 className="h-3 w-3" />
              {language === 'ta' ? 'வகைகள்' : 'Categories'}
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs gap-1">
              <History className="h-3 w-3" />
              {language === 'ta' ? 'வரலாறு' : 'History'}
            </TabsTrigger>
          </TabsList>

          {/* Trends Tab */}
          <TabsContent value="trends">
            <div className="space-y-6">
              {trendData.length > 0 && (
                <div className="bg-white rounded-xl p-4 border">
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">
                    {language === 'ta' ? 'செயல்திறன் போக்கு' : 'Performance Trend'}
                  </h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="colorPercentage" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#9CA3AF" />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} stroke="#9CA3AF" />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-2 rounded-lg shadow-lg border text-xs">
                                <p className="font-semibold">{data.category}</p>
                                <p className="text-purple-600">{data.percentage}%</p>
                                <p className="text-gray-400">{data.date}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="percentage" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorPercentage)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Subject Performance */}
              {subjectPerformance.length > 0 && (
                <div className="bg-white rounded-xl p-4 border">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    {language === 'ta' ? 'பாட வாரியான துல்லியம்' : 'Subject-wise Accuracy'}
                  </h4>
                  <div className="space-y-2">
                    {subjectPerformance.slice(0, 6).map((subject, index) => (
                      <div key={subject.subject} className="flex items-center gap-3">
                        <span className="text-xs text-gray-600 w-28 truncate">{subject.subject}</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${subject.accuracy}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`h-full rounded-full ${
                              subject.accuracy >= 70 ? 'bg-green-500' :
                              subject.accuracy >= 50 ? 'bg-blue-500' :
                              subject.accuracy >= 30 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                          />
                        </div>
                        <span className={`text-xs font-semibold w-12 text-right ${getPercentageColor(subject.accuracy)}`}>
                          {subject.accuracy}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <div className="space-y-4">
              {categoryChartData.length > 0 && (
                <div className="bg-white rounded-xl p-4 border">
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">
                    {language === 'ta' ? 'வகை வாரியான செயல்திறன்' : 'Category-wise Performance'}
                  </h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={categoryChartData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} stroke="#9CA3AF" />
                      <YAxis dataKey="category" type="category" tick={{ fontSize: 9 }} width={80} stroke="#9CA3AF" />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-2 rounded-lg shadow-lg border text-xs">
                                <p className="font-semibold">{data.category}</p>
                                <p>Avg: <span className="text-blue-600">{data.avgPercentage}%</span></p>
                                <p>Best: <span className="text-green-600">{data.bestPercentage}%</span></p>
                                <p className="text-gray-400">{data.attempts} attempts</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="avgPercentage" fill="#3B82F6" radius={[0, 4, 4, 0]} name="Average" />
                      <Bar dataKey="bestPercentage" fill="#10B981" radius={[0, 4, 4, 0]} name="Best" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Category Cards */}
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(categoryStats).map(([cat, stats]) => {
                  const Icon = getCategoryIcon(cat);
                  const info = categoryInfo[cat as keyof typeof categoryInfo];
                  return (
                    <motion.div
                      key={cat}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-3 rounded-xl border-2 ${info?.bgColor} ${info?.borderColor}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-4 w-4" style={{ color: CATEGORY_COLORS[cat] }} />
                        <span className="text-sm font-medium text-gray-700">{info?.label}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-gray-500">{language === 'ta' ? 'முயற்சிகள்' : 'Attempts'}</p>
                          <p className="font-bold text-gray-700">{stats.attempts}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'ta' ? 'சிறந்தது' : 'Best'}</p>
                          <p className={`font-bold ${getPercentageColor(stats.bestPercentage)}`}>
                            {stats.bestPercentage}%
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <ScrollArea className="h-80 pr-4">
              <div className="space-y-3">
                {recentScores.map((score, index) => {
                  const Icon = getCategoryIcon(score.category);
                  return (
                    <motion.div
                      key={score.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-xl p-4 border hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {getMedalIcon(index)}
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${CATEGORY_COLORS[score.category]}20` }}
                          >
                            <Icon className="h-5 w-5" style={{ color: CATEGORY_COLORS[score.category] }} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 text-sm">{score.categoryLabel}</h4>
                            <p className="text-xs text-gray-400">
                              {format(new Date(score.date), 'MMM dd, yyyy • hh:mm a')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-xl font-bold ${getPercentageColor(score.percentage)}`}>
                            {score.percentage}%
                          </p>
                          <p className="text-xs text-gray-500">
                            {score.correct}/{score.totalQuestions}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 text-gray-500">
                            <Clock className="h-3 w-3" />
                            {formatTime(score.timeTaken)}
                          </span>
                          <span className="text-green-600">✓ {score.correct}</span>
                          <span className="text-red-600">✗ {score.incorrect}</span>
                          {score.unattempted > 0 && (
                            <span className="text-gray-400">○ {score.unattempted}</span>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteScore(score.id)}
                          className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
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
