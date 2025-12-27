import { useMemo } from 'react';
import { 
  Trophy, TrendingUp, TrendingDown, Clock, Target, Award,
  Calendar, Trash2, Medal, Zap, BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
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
import { useMockTestScores, MockTestScore } from '@/hooks/useMockTestScores';

interface MockTestLeaderboardProps {
  language?: 'en' | 'ta';
}

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

  const recentScores = getRecentScores(10);
  const bestScore = getBestScore();
  const avgAccuracy = getAverageAccuracy();
  const avgScore = getAverageScore();

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

        {/* Recent Attempts */}
        <div className="mb-2">
          <h4 className="font-semibold text-foreground flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            {language === 'en' ? 'Recent Attempts' : 'சமீபத்திய முயற்சிகள்'}
          </h4>
        </div>

        <ScrollArea className="h-[320px] pr-4">
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
      </CardContent>
    </Card>
  );
};

export default MockTestLeaderboard;
