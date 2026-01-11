import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, TrendingUp, Target, Flame, Clock, 
  BarChart2, Zap, ArrowRight, CheckCircle2, AlertTriangle
} from 'lucide-react';

interface WeeklyProgress {
  weekStart: string;
  totalMinutes: number;
  dailyBreakdown: { [date: string]: number };
  goalId: string | null;
  goalTarget: number | null;
  achieved: boolean;
}

interface MockTestScore {
  score: number;
  total_questions: number;
  accuracy: number;
  category: string;
  created_at: string;
}

interface SuggestionType {
  hours: number;
  label: string;
  reason: string;
  confidence: 'high' | 'medium' | 'low';
  icon: 'conservative' | 'balanced' | 'ambitious' | 'streak' | 'improvement';
  priority: number;
}

interface SmartGoalSuggestionsProps {
  language: 'en' | 'ta';
  weeklyHistory: WeeklyProgress[];
  onSelectGoal: (hours: number) => void;
}

export const SmartGoalSuggestions = ({ 
  language, 
  weeklyHistory,
  onSelectGoal 
}: SmartGoalSuggestionsProps) => {
  
  const suggestions = useMemo(() => {
    const result: SuggestionType[] = [];
    
    // Get mock test data for performance analysis
    let mockScores: MockTestScore[] = [];
    try {
      const stored = localStorage.getItem('govt_mock_test_scores');
      if (stored) mockScores = JSON.parse(stored);
    } catch {}

    // Calculate historical averages
    const historicalWeeks = weeklyHistory.filter(w => w.totalMinutes > 0);
    const avgMinutes = historicalWeeks.length > 0 
      ? historicalWeeks.reduce((sum, w) => sum + w.totalMinutes, 0) / historicalWeeks.length 
      : 0;
    const avgHours = Math.round((avgMinutes / 60) * 10) / 10;

    // Calculate recent trend (last 4 weeks vs previous 4 weeks)
    const recent4 = historicalWeeks.slice(0, 4);
    const previous4 = historicalWeeks.slice(4, 8);
    const recentAvg = recent4.length > 0 
      ? recent4.reduce((sum, w) => sum + w.totalMinutes, 0) / recent4.length / 60
      : 0;
    const previousAvg = previous4.length > 0 
      ? previous4.reduce((sum, w) => sum + w.totalMinutes, 0) / previous4.length / 60
      : 0;
    const trendDirection = recentAvg > previousAvg ? 'up' : recentAvg < previousAvg ? 'down' : 'stable';
    const trendPercent = previousAvg > 0 ? Math.round(((recentAvg - previousAvg) / previousAvg) * 100) : 0;

    // Calculate goal achievement rate
    const goalsWithTargets = weeklyHistory.filter(w => w.goalTarget);
    const achievedGoals = goalsWithTargets.filter(w => w.achieved);
    const achievementRate = goalsWithTargets.length > 0 
      ? achievedGoals.length / goalsWithTargets.length 
      : 0;

    // Calculate consistency (standard deviation of study hours)
    const hoursArr = historicalWeeks.map(w => w.totalMinutes / 60);
    const stdDev = hoursArr.length > 1 
      ? Math.sqrt(hoursArr.reduce((sum, h) => sum + Math.pow(h - avgHours, 2), 0) / hoursArr.length)
      : 0;
    const isConsistent = stdDev < avgHours * 0.3;

    // Calculate best week performance
    const bestWeek = historicalWeeks.length > 0 
      ? Math.max(...historicalWeeks.map(w => w.totalMinutes)) / 60 
      : 10;

    // Calculate streak data
    let currentStreak = 0;
    for (const week of weeklyHistory) {
      if (week.achieved) currentStreak++;
      else break;
    }

    // Performance trend from mock tests
    const recentMocks = mockScores.slice(0, 10);
    const avgAccuracy = recentMocks.length > 0
      ? recentMocks.reduce((sum, m) => sum + m.accuracy, 0) / recentMocks.length
      : 0;
    const isHighPerformer = avgAccuracy >= 70;
    const needsImprovement = avgAccuracy > 0 && avgAccuracy < 50;

    // Generate suggestions based on analysis
    if (historicalWeeks.length === 0) {
      // New user - suggest starter goals
      result.push({
        hours: 5,
        label: language === 'ta' ? 'ஆரம்பிப்பவர்' : 'Starter',
        reason: language === 'ta' 
          ? 'புதிதாக தொடங்குவோருக்கு பரிந்துரைக்கப்படுகிறது'
          : 'Recommended for beginners',
        confidence: 'medium',
        icon: 'conservative',
        priority: 2
      });
      result.push({
        hours: 10,
        label: language === 'ta' ? 'சமநிலை' : 'Balanced',
        reason: language === 'ta' 
          ? 'வாரத்திற்கு சராசரி ~1.5 மணி/நாள்'
          : 'Average ~1.5h/day through the week',
        confidence: 'high',
        icon: 'balanced',
        priority: 1
      });
      result.push({
        hours: 15,
        label: language === 'ta' ? 'தீவிரம்' : 'Intensive',
        reason: language === 'ta' 
          ? 'தீவிர தேர்வு தயாரிப்புக்கு'
          : 'For intensive exam preparation',
        confidence: 'low',
        icon: 'ambitious',
        priority: 3
      });
    } else {
      // 1. Conservative suggestion (slightly below average)
      if (avgHours > 2) {
        const conservativeHours = Math.round(avgHours * 0.85 * 2) / 2;
        result.push({
          hours: Math.max(5, conservativeHours),
          label: language === 'ta' ? 'பாதுகாப்பான' : 'Safe Pick',
          reason: language === 'ta' 
            ? `உங்கள் சராசரியை விட 15% குறைவு - எளிதாக அடையலாம்`
            : `15% below your average - easier to achieve`,
          confidence: 'high',
          icon: 'conservative',
          priority: achievementRate < 0.5 ? 1 : 3
        });
      }

      // 2. Match average (balanced)
      if (avgHours >= 3) {
        const balancedHours = Math.round(avgHours * 2) / 2;
        result.push({
          hours: balancedHours,
          label: language === 'ta' ? 'உங்கள் சராசரி' : 'Your Average',
          reason: language === 'ta' 
            ? `கடந்த ${historicalWeeks.length} வாரங்களின் சராசரி`
            : `Based on your last ${historicalWeeks.length} weeks`,
          confidence: isConsistent ? 'high' : 'medium',
          icon: 'balanced',
          priority: 2
        });
      }

      // 3. Growth suggestion (10-20% increase)
      if (trendDirection === 'up' || achievementRate >= 0.7) {
        const growthHours = Math.round(avgHours * 1.15 * 2) / 2;
        result.push({
          hours: Math.min(40, growthHours),
          label: language === 'ta' ? 'வளர்ச்சி' : 'Growth',
          reason: language === 'ta' 
            ? trendDirection === 'up' 
              ? `📈 உங்கள் படிப்பு ${Math.abs(trendPercent)}% அதிகரித்துள்ளது!`
              : `${Math.round(achievementRate * 100)}% இலக்குகளை அடைந்தீர்கள் - உயர்த்துங்கள்!`
            : trendDirection === 'up'
              ? `📈 Your study time is up ${Math.abs(trendPercent)}%!`
              : `${Math.round(achievementRate * 100)}% goals achieved - time to level up!`,
          confidence: 'medium',
          icon: 'improvement',
          priority: 1
        });
      }

      // 4. Streak-based suggestion
      if (currentStreak >= 2) {
        const streakBonus = Math.min(5, currentStreak);
        const streakHours = Math.round((avgHours + streakBonus) * 2) / 2;
        result.push({
          hours: Math.min(45, streakHours),
          label: language === 'ta' ? 'தொடர் போனஸ்' : 'Streak Boost',
          reason: language === 'ta' 
            ? `🔥 ${currentStreak} வாரத் தொடர் - சவாலுக்கு தயாரா?`
            : `🔥 ${currentStreak}-week streak! Ready for a challenge?`,
          confidence: 'medium',
          icon: 'streak',
          priority: 2
        });
      }

      // 5. Ambitious suggestion (match best week)
      if (bestWeek > avgHours * 1.2 && bestWeek <= 50) {
        result.push({
          hours: Math.round(bestWeek * 2) / 2,
          label: language === 'ta' ? 'சிறந்த வாரம்' : 'Best Week',
          reason: language === 'ta' 
            ? `உங்கள் சிறந்த செயல்திறனை சவால் செய்யுங்கள்`
            : `Challenge yourself to match your peak`,
          confidence: 'low',
          icon: 'ambitious',
          priority: 4
        });
      }

      // 6. Performance-based adjustment
      if (needsImprovement && avgHours > 10) {
        // Suggest focusing on quality over quantity
        const focusedHours = Math.round(avgHours * 0.7 * 2) / 2;
        result.push({
          hours: Math.max(5, focusedHours),
          label: language === 'ta' ? 'தரத்தில் கவனம்' : 'Quality Focus',
          reason: language === 'ta' 
            ? `குறைவாக படித்து, சிறப்பாக கற்றுக்கொள்ளுங்கள்`
            : `Less hours, deeper learning`,
          confidence: 'medium',
          icon: 'conservative',
          priority: 1
        });
      }

      // 7. Catch-up suggestion if trending down
      if (trendDirection === 'down' && Math.abs(trendPercent) > 20) {
        result.push({
          hours: Math.round(previousAvg * 2) / 2,
          label: language === 'ta' ? 'மீண்டும் பாதையில்' : 'Get Back on Track',
          reason: language === 'ta' 
            ? `⚠️ படிப்பு நேரம் ${Math.abs(trendPercent)}% குறைந்துள்ளது`
            : `⚠️ Study time dropped ${Math.abs(trendPercent)}%`,
          confidence: 'medium',
          icon: 'improvement',
          priority: 1
        });
      }
    }

    // Sort by priority and deduplicate similar hours
    const seen = new Set<number>();
    return result
      .sort((a, b) => a.priority - b.priority)
      .filter(s => {
        // Avoid duplicate or very similar hours
        const rounded = Math.round(s.hours);
        if (seen.has(rounded)) return false;
        seen.add(rounded);
        return true;
      })
      .slice(0, 4); // Max 4 suggestions
  }, [weeklyHistory, language]);

  const getIconComponent = (icon: SuggestionType['icon']) => {
    switch (icon) {
      case 'conservative': return <Target className="h-4 w-4" />;
      case 'balanced': return <BarChart2 className="h-4 w-4" />;
      case 'ambitious': return <Zap className="h-4 w-4" />;
      case 'streak': return <Flame className="h-4 w-4" />;
      case 'improvement': return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getConfidenceColor = (confidence: SuggestionType['confidence']) => {
    switch (confidence) {
      case 'high': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const getCardGradient = (icon: SuggestionType['icon']) => {
    switch (icon) {
      case 'conservative': return 'from-blue-50 to-cyan-50 border-blue-200 hover:border-blue-300';
      case 'balanced': return 'from-indigo-50 to-purple-50 border-indigo-200 hover:border-indigo-300';
      case 'ambitious': return 'from-orange-50 to-red-50 border-orange-200 hover:border-orange-300';
      case 'streak': return 'from-amber-50 to-orange-50 border-amber-200 hover:border-amber-300';
      case 'improvement': return 'from-green-50 to-emerald-50 border-green-200 hover:border-green-300';
    }
  };

  if (suggestions.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-4 w-4 text-purple-500" />
        <span className="text-sm font-medium text-gray-700">
          {language === 'ta' ? 'AI பரிந்துரைகள்' : 'Smart Suggestions'}
        </span>
        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
          {language === 'ta' ? 'உங்கள் வரலாற்றின் அடிப்படையில்' : 'Based on your history'}
        </Badge>
      </div>

      <div className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={`${suggestion.hours}-${index}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-xl border cursor-pointer transition-all bg-gradient-to-r ${getCardGradient(suggestion.icon)}`}
            onClick={() => onSelectGoal(suggestion.hours)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  suggestion.icon === 'streak' ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' :
                  suggestion.icon === 'ambitious' ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white' :
                  suggestion.icon === 'improvement' ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white' :
                  suggestion.icon === 'balanced' ? 'bg-gradient-to-br from-indigo-400 to-purple-500 text-white' :
                  'bg-gradient-to-br from-blue-400 to-cyan-500 text-white'
                }`}>
                  {getIconComponent(suggestion.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-gray-800">
                      {suggestion.hours}h
                    </span>
                    <Badge className={`text-[10px] ${getConfidenceColor(suggestion.confidence)}`}>
                      {suggestion.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {suggestion.reason}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
              >
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {weeklyHistory.length > 0 && (
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {language === 'ta' ? 'சராசரி:' : 'Avg:'} {
                (weeklyHistory.filter(w => w.totalMinutes > 0).reduce((sum, w) => sum + w.totalMinutes, 0) / 
                Math.max(1, weeklyHistory.filter(w => w.totalMinutes > 0).length) / 60).toFixed(1)
              }h/wk
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {language === 'ta' ? 'வெற்றி:' : 'Achieved:'} {
                weeklyHistory.filter(w => w.goalTarget).length > 0
                  ? Math.round(weeklyHistory.filter(w => w.achieved).length / 
                    weeklyHistory.filter(w => w.goalTarget).length * 100)
                  : 0
              }%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
