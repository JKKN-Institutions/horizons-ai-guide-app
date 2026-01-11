import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, Star, Flame, Clock, Target, BookOpen, Award,
  Zap, Crown, Medal, Sparkles, Lock, CheckCircle2,
  TrendingUp, Calendar, Brain, GraduationCap, Share2
} from 'lucide-react';
import { toast } from 'sonner';
import { AchievementShareCard } from './AchievementShareCard';
import { MilestoneCelebration } from './MilestoneCelebration';
import { AchievementCollections } from './AchievementCollections';

const ACHIEVEMENTS_KEY = 'govt_study_achievements';
const UNLOCKED_KEY = 'govt_unlocked_achievements';
const MILESTONES_KEY = 'govt_achievement_milestones';

const MILESTONE_THRESHOLDS = [50, 75, 90, 100] as const;
type MilestoneType = typeof MILESTONE_THRESHOLDS[number];

interface Achievement {
  id: string;
  name: string;
  nameTa: string;
  description: string;
  descriptionTa: string;
  icon: string;
  category: 'hours' | 'streak' | 'tests' | 'goals' | 'special';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  requirement: number;
  checkFn: (stats: StudyStats) => number;
}

interface StudyStats {
  totalHours: number;
  currentStreak: number;
  longestStreak: number;
  mockTestsCompleted: number;
  perfectScores: number;
  goalsAchieved: number;
  goalsSet: number;
  daysActive: number;
  questionsAnswered: number;
  weeklyGoalStreak: number;
}

interface UnlockedAchievement {
  id: string;
  unlockedAt: string;
  notified: boolean;
}

interface StudyAchievementsProps {
  language: 'en' | 'ta';
}

const ACHIEVEMENTS: Achievement[] = [
  // Hours-based achievements
  { id: 'first_hour', name: 'First Step', nameTa: 'முதல் அடி', description: 'Study for 1 hour', descriptionTa: '1 மணி நேரம் படிக்கவும்', icon: 'clock', category: 'hours', tier: 'bronze', requirement: 1, checkFn: (s) => s.totalHours },
  { id: 'study_5h', name: 'Getting Started', nameTa: 'தொடக்கம்', description: 'Study for 5 hours', descriptionTa: '5 மணி நேரம் படிக்கவும்', icon: 'clock', category: 'hours', tier: 'bronze', requirement: 5, checkFn: (s) => s.totalHours },
  { id: 'study_10h', name: 'Dedicated Learner', nameTa: 'அர்ப்பணிப்புள்ள கற்பவர்', description: 'Study for 10 hours', descriptionTa: '10 மணி நேரம் படிக்கவும்', icon: 'clock', category: 'hours', tier: 'silver', requirement: 10, checkFn: (s) => s.totalHours },
  { id: 'study_25h', name: 'Serious Scholar', nameTa: 'தீவிர மாணவர்', description: 'Study for 25 hours', descriptionTa: '25 மணி நேரம் படிக்கவும்', icon: 'book', category: 'hours', tier: 'silver', requirement: 25, checkFn: (s) => s.totalHours },
  { id: 'study_50h', name: 'Study Master', nameTa: 'படிப்பு மாஸ்டர்', description: 'Study for 50 hours', descriptionTa: '50 மணி நேரம் படிக்கவும்', icon: 'book', category: 'hours', tier: 'gold', requirement: 50, checkFn: (s) => s.totalHours },
  { id: 'study_100h', name: 'Century Club', nameTa: 'நூற்றாண்டு கிளப்', description: 'Study for 100 hours', descriptionTa: '100 மணி நேரம் படிக்கவும்', icon: 'trophy', category: 'hours', tier: 'platinum', requirement: 100, checkFn: (s) => s.totalHours },
  { id: 'study_200h', name: 'Legend', nameTa: 'புராணம்', description: 'Study for 200 hours', descriptionTa: '200 மணி நேரம் படிக்கவும்', icon: 'crown', category: 'hours', tier: 'diamond', requirement: 200, checkFn: (s) => s.totalHours },

  // Streak achievements
  { id: 'streak_3', name: 'Consistent', nameTa: 'நிலையான', description: '3-day study streak', descriptionTa: '3 நாள் படிப்பு தொடர்', icon: 'flame', category: 'streak', tier: 'bronze', requirement: 3, checkFn: (s) => s.longestStreak },
  { id: 'streak_7', name: 'Weekly Warrior', nameTa: 'வாராந்திர போர்வீரர்', description: '7-day study streak', descriptionTa: '7 நாள் படிப்பு தொடர்', icon: 'flame', category: 'streak', tier: 'silver', requirement: 7, checkFn: (s) => s.longestStreak },
  { id: 'streak_14', name: 'Two Week Champion', nameTa: 'இரண்டு வார சாம்பியன்', description: '14-day study streak', descriptionTa: '14 நாள் படிப்பு தொடர்', icon: 'flame', category: 'streak', tier: 'gold', requirement: 14, checkFn: (s) => s.longestStreak },
  { id: 'streak_30', name: 'Monthly Master', nameTa: 'மாதாந்திர மாஸ்டர்', description: '30-day study streak', descriptionTa: '30 நாள் படிப்பு தொடர்', icon: 'flame', category: 'streak', tier: 'platinum', requirement: 30, checkFn: (s) => s.longestStreak },
  { id: 'streak_60', name: 'Unstoppable', nameTa: 'தடுக்க முடியாதது', description: '60-day study streak', descriptionTa: '60 நாள் படிப்பு தொடர்', icon: 'zap', category: 'streak', tier: 'diamond', requirement: 60, checkFn: (s) => s.longestStreak },

  // Mock test achievements
  { id: 'test_1', name: 'Test Taker', nameTa: 'தேர்வு எழுதுபவர்', description: 'Complete 1 mock test', descriptionTa: '1 போலி தேர்வை முடிக்கவும்', icon: 'brain', category: 'tests', tier: 'bronze', requirement: 1, checkFn: (s) => s.mockTestsCompleted },
  { id: 'test_5', name: 'Practice Pro', nameTa: 'பயிற்சி நிபுணர்', description: 'Complete 5 mock tests', descriptionTa: '5 போலி தேர்வுகளை முடிக்கவும்', icon: 'brain', category: 'tests', tier: 'silver', requirement: 5, checkFn: (s) => s.mockTestsCompleted },
  { id: 'test_10', name: 'Test Expert', nameTa: 'தேர்வு நிபுணர்', description: 'Complete 10 mock tests', descriptionTa: '10 போலி தேர்வுகளை முடிக்கவும்', icon: 'brain', category: 'tests', tier: 'gold', requirement: 10, checkFn: (s) => s.mockTestsCompleted },
  { id: 'test_25', name: 'Exam Veteran', nameTa: 'தேர்வு மூத்தவர்', description: 'Complete 25 mock tests', descriptionTa: '25 போலி தேர்வுகளை முடிக்கவும்', icon: 'graduation', category: 'tests', tier: 'platinum', requirement: 25, checkFn: (s) => s.mockTestsCompleted },
  { id: 'perfect_1', name: 'Perfect Score', nameTa: 'சரியான மதிப்பெண்', description: 'Get 100% on a mock test', descriptionTa: 'போலி தேர்வில் 100% பெறுங்கள்', icon: 'star', category: 'tests', tier: 'gold', requirement: 1, checkFn: (s) => s.perfectScores },
  { id: 'perfect_5', name: 'Perfectionist', nameTa: 'பூரணமானவர்', description: 'Get 5 perfect scores', descriptionTa: '5 சரியான மதிப்பெண்கள் பெறுங்கள்', icon: 'star', category: 'tests', tier: 'diamond', requirement: 5, checkFn: (s) => s.perfectScores },

  // Goal achievements
  { id: 'goal_1', name: 'Goal Getter', nameTa: 'இலக்கை அடைபவர்', description: 'Achieve 1 weekly goal', descriptionTa: '1 வாராந்திர இலக்கை அடையுங்கள்', icon: 'target', category: 'goals', tier: 'bronze', requirement: 1, checkFn: (s) => s.goalsAchieved },
  { id: 'goal_4', name: 'Monthly Achiever', nameTa: 'மாதாந்திர சாதனையாளர்', description: 'Achieve 4 weekly goals', descriptionTa: '4 வாராந்திர இலக்குகளை அடையுங்கள்', icon: 'target', category: 'goals', tier: 'silver', requirement: 4, checkFn: (s) => s.goalsAchieved },
  { id: 'goal_12', name: 'Quarter Champion', nameTa: 'காலாண்டு சாம்பியன்', description: 'Achieve 12 weekly goals', descriptionTa: '12 வாராந்திர இலக்குகளை அடையுங்கள்', icon: 'trophy', category: 'goals', tier: 'gold', requirement: 12, checkFn: (s) => s.goalsAchieved },
  { id: 'goal_streak_4', name: 'Consistent Achiever', nameTa: 'நிலையான சாதனையாளர்', description: '4 consecutive weekly goals', descriptionTa: 'தொடர்ச்சியான 4 வாராந்திர இலக்குகள்', icon: 'trending', category: 'goals', tier: 'platinum', requirement: 4, checkFn: (s) => s.weeklyGoalStreak },

  // Special achievements
  { id: 'active_7', name: 'Active Learner', nameTa: 'சுறுசுறுப்பான கற்பவர்', description: 'Study on 7 different days', descriptionTa: '7 வெவ்வேறு நாட்களில் படிக்கவும்', icon: 'calendar', category: 'special', tier: 'bronze', requirement: 7, checkFn: (s) => s.daysActive },
  { id: 'active_30', name: 'Dedicated Student', nameTa: 'அர்ப்பணிப்புள்ள மாணவர்', description: 'Study on 30 different days', descriptionTa: '30 வெவ்வேறு நாட்களில் படிக்கவும்', icon: 'calendar', category: 'special', tier: 'gold', requirement: 30, checkFn: (s) => s.daysActive },
  { id: 'questions_100', name: 'Question Hunter', nameTa: 'கேள்வி வேட்டைக்காரர்', description: 'Answer 100 questions', descriptionTa: '100 கேள்விகளுக்கு பதிலளிக்கவும்', icon: 'brain', category: 'special', tier: 'silver', requirement: 100, checkFn: (s) => s.questionsAnswered },
  { id: 'questions_500', name: 'Knowledge Seeker', nameTa: 'அறிவு தேடுபவர்', description: 'Answer 500 questions', descriptionTa: '500 கேள்விகளுக்கு பதிலளிக்கவும்', icon: 'brain', category: 'special', tier: 'platinum', requirement: 500, checkFn: (s) => s.questionsAnswered },
];

const TIER_CONFIG = {
  bronze: { bg: 'from-amber-600 to-amber-700', border: 'border-amber-300', text: 'text-amber-700', lightBg: 'bg-amber-50' },
  silver: { bg: 'from-gray-400 to-gray-500', border: 'border-gray-300', text: 'text-gray-600', lightBg: 'bg-gray-50' },
  gold: { bg: 'from-yellow-400 to-amber-500', border: 'border-yellow-300', text: 'text-yellow-700', lightBg: 'bg-yellow-50' },
  platinum: { bg: 'from-cyan-400 to-blue-500', border: 'border-cyan-300', text: 'text-cyan-700', lightBg: 'bg-cyan-50' },
  diamond: { bg: 'from-purple-400 to-pink-500', border: 'border-purple-300', text: 'text-purple-700', lightBg: 'bg-purple-50' },
};

const getIcon = (iconName: string, className: string) => {
  const icons: Record<string, React.ReactNode> = {
    clock: <Clock className={className} />,
    book: <BookOpen className={className} />,
    trophy: <Trophy className={className} />,
    crown: <Crown className={className} />,
    flame: <Flame className={className} />,
    zap: <Zap className={className} />,
    brain: <Brain className={className} />,
    graduation: <GraduationCap className={className} />,
    star: <Star className={className} />,
    target: <Target className={className} />,
    trending: <TrendingUp className={className} />,
    calendar: <Calendar className={className} />,
    medal: <Medal className={className} />,
  };
  return icons[iconName] || <Award className={className} />;
};

export const StudyAchievements = ({ language }: StudyAchievementsProps) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<UnlockedAchievement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([]);
  const [shareAchievement, setShareAchievement] = useState<Achievement | null>(null);
  const [shareUnlockedAt, setShareUnlockedAt] = useState<string | undefined>();
  const [celebratingMilestone, setCelebratingMilestone] = useState<MilestoneType | null>(null);
  const [achievedMilestones, setAchievedMilestones] = useState<MilestoneType[]>([]);

  const stats = useMemo((): StudyStats => {
    let totalMinutes = 0;
    let daysActive = new Set<string>();
    let mockTestsCompleted = 0;
    let perfectScores = 0;
    let questionsAnswered = 0;
    let goalsAchieved = 0;
    let goalsSet = 0;
    let currentStreak = 0;
    let longestStreak = 0;
    let weeklyGoalStreak = 0;

    try {
      // Get study hours from practice schedules
      const schedules = localStorage.getItem('govt_practice_schedules');
      if (schedules) {
        const parsed = JSON.parse(schedules);
        Object.values(parsed).forEach((daySchedules: any) => {
          if (Array.isArray(daySchedules)) {
            daySchedules.forEach((s: any) => {
              if (s.completed && s.date) {
                totalMinutes += s.duration || 30;
                daysActive.add(s.date);
              }
            });
          }
        });
      }

      // Get mock test data
      const mockScores = localStorage.getItem('govt_mock_test_scores');
      if (mockScores) {
        const scores = JSON.parse(mockScores);
        mockTestsCompleted = scores.length;
        perfectScores = scores.filter((s: any) => s.accuracy === 100).length;
        questionsAnswered = scores.reduce((sum: number, s: any) => sum + (s.total_questions || 0), 0);
        scores.forEach((s: any) => {
          if (s.created_at) daysActive.add(s.created_at.split('T')[0]);
        });
      }

      // Get streak data
      const streakData = localStorage.getItem('govt_study_streak');
      if (streakData) {
        const streak = JSON.parse(streakData);
        currentStreak = streak.currentStreak || 0;
        longestStreak = streak.longestStreak || streak.currentStreak || 0;
      }

      // Get weekly goals history
      const goalsHistory = localStorage.getItem('govt_weekly_goals_history');
      if (goalsHistory) {
        const history = JSON.parse(goalsHistory);
        goalsSet = history.filter((h: any) => h.goalTarget).length;
        goalsAchieved = history.filter((h: any) => h.achieved).length;
        
        // Calculate weekly goal streak
        let streak = 0;
        for (const week of history) {
          if (week.achieved) streak++;
          else break;
        }
        weeklyGoalStreak = streak;
      }
    } catch (error) {
      console.error('Error calculating stats:', error);
    }

    return {
      totalHours: totalMinutes / 60,
      currentStreak,
      longestStreak: Math.max(longestStreak, currentStreak),
      mockTestsCompleted,
      perfectScores,
      goalsAchieved,
      goalsSet,
      daysActive: daysActive.size,
      questionsAnswered,
      weeklyGoalStreak,
    };
  }, []);

  // Load unlocked achievements and milestones
  useEffect(() => {
    try {
      const stored = localStorage.getItem(UNLOCKED_KEY);
      if (stored) {
        setUnlockedAchievements(JSON.parse(stored));
      }
      const storedMilestones = localStorage.getItem(MILESTONES_KEY);
      if (storedMilestones) {
        setAchievedMilestones(JSON.parse(storedMilestones));
      }
    } catch {}
  }, []);

  // Check for newly unlocked achievements
  useEffect(() => {
    const newUnlocks: string[] = [];
    const updatedUnlocked = [...unlockedAchievements];

    ACHIEVEMENTS.forEach(achievement => {
      const currentValue = achievement.checkFn(stats);
      const isUnlocked = currentValue >= achievement.requirement;
      const wasAlreadyUnlocked = unlockedAchievements.some(u => u.id === achievement.id);

      if (isUnlocked && !wasAlreadyUnlocked) {
        updatedUnlocked.push({
          id: achievement.id,
          unlockedAt: new Date().toISOString(),
          notified: false,
        });
        newUnlocks.push(achievement.id);
      }
    });

    if (newUnlocks.length > 0) {
      setUnlockedAchievements(updatedUnlocked);
      setNewlyUnlocked(newUnlocks);
      localStorage.setItem(UNLOCKED_KEY, JSON.stringify(updatedUnlocked));

      // Show toast for new achievements
      newUnlocks.forEach(id => {
        const achievement = ACHIEVEMENTS.find(a => a.id === id);
        if (achievement) {
          toast.success(
            language === 'ta' 
              ? `🏆 சாதனை திறக்கப்பட்டது: ${achievement.nameTa}!`
              : `🏆 Achievement Unlocked: ${achievement.name}!`,
            { duration: 4000 }
          );
        }
      });
    }
  }, [stats, unlockedAchievements, language]);

  // Check for milestone achievements
  useEffect(() => {
    const totalCount = ACHIEVEMENTS.length;
    const currentPercent = (unlockedAchievements.length / totalCount) * 100;

    for (const threshold of MILESTONE_THRESHOLDS) {
      if (currentPercent >= threshold && !achievedMilestones.includes(threshold)) {
        // New milestone reached!
        const updatedMilestones = [...achievedMilestones, threshold];
        setAchievedMilestones(updatedMilestones);
        localStorage.setItem(MILESTONES_KEY, JSON.stringify(updatedMilestones));
        
        // Trigger celebration with slight delay for effect
        setTimeout(() => {
          setCelebratingMilestone(threshold);
        }, 500);
        
        break; // Only celebrate one milestone at a time
      }
    }
  }, [unlockedAchievements, achievedMilestones]);

  const categories = [
    { id: 'all', label: language === 'ta' ? 'அனைத்தும்' : 'All', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'hours', label: language === 'ta' ? 'மணிநேரம்' : 'Hours', icon: <Clock className="h-4 w-4" /> },
    { id: 'streak', label: language === 'ta' ? 'தொடர்' : 'Streak', icon: <Flame className="h-4 w-4" /> },
    { id: 'tests', label: language === 'ta' ? 'தேர்வுகள்' : 'Tests', icon: <Brain className="h-4 w-4" /> },
    { id: 'goals', label: language === 'ta' ? 'இலக்குகள்' : 'Goals', icon: <Target className="h-4 w-4" /> },
    { id: 'special', label: language === 'ta' ? 'சிறப்பு' : 'Special', icon: <Star className="h-4 w-4" /> },
  ];

  const filteredAchievements = ACHIEVEMENTS.filter(a => 
    selectedCategory === 'all' || a.category === selectedCategory
  );

  const unlockedCount = unlockedAchievements.length;
  const totalCount = ACHIEVEMENTS.length;
  const progressPercent = (unlockedCount / totalCount) * 100;

  return (
    <Card className="border border-gray-200 bg-gradient-to-br from-white to-amber-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            {language === 'ta' ? 'சாதனைகள்' : 'Achievements'}
          </CardTitle>
          <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white">
            {unlockedCount} / {totalCount}
          </Badge>
        </div>
        {/* Progress with Milestone Markers */}
        <div className="mt-2 relative">
          <div className="relative">
            <Progress value={progressPercent} className="h-3 bg-amber-100" />
            {/* Milestone markers */}
            <div className="absolute inset-0 flex items-center pointer-events-none">
              {MILESTONE_THRESHOLDS.slice(0, -1).map((threshold) => (
                <div
                  key={threshold}
                  className="absolute h-full flex items-center"
                  style={{ left: `${threshold}%` }}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      scale: achievedMilestones.includes(threshold) ? [1, 1.2, 1] : 1,
                    }}
                    className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${
                      achievedMilestones.includes(threshold)
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                        : progressPercent >= threshold - 5
                        ? 'bg-amber-200'
                        : 'bg-gray-200'
                    }`}
                    title={`${threshold}% ${language === 'ta' ? 'மைல்கல்' : 'Milestone'}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <p className="text-xs text-muted-foreground">
              {language === 'ta' 
                ? `${Math.round(progressPercent)}% சாதனைகள் திறக்கப்பட்டன`
                : `${Math.round(progressPercent)}% achievements unlocked`}
            </p>
            {/* Next milestone indicator */}
            {progressPercent < 100 && (
              <p className="text-xs text-muted-foreground">
                {(() => {
                  const nextMilestone = MILESTONE_THRESHOLDS.find(t => progressPercent < t);
                  if (!nextMilestone) return null;
                  const remaining = Math.ceil((nextMilestone / 100) * totalCount) - unlockedCount;
                  return language === 'ta' 
                    ? `${nextMilestone}% வரை ${remaining} தேவை`
                    : `${remaining} to ${nextMilestone}%`;
                })()}
              </p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Category Filters */}
        <div className="flex gap-1 overflow-x-auto pb-2">
          {categories.map(cat => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="gap-1.5 whitespace-nowrap text-xs"
            >
              {cat.icon}
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <div className="text-lg font-bold text-blue-700">{stats.totalHours.toFixed(0)}h</div>
            <div className="text-[10px] text-blue-600">{language === 'ta' ? 'படிப்பு' : 'Study'}</div>
          </div>
          <div className="p-2 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-100">
            <div className="text-lg font-bold text-orange-700">{stats.longestStreak}</div>
            <div className="text-[10px] text-orange-600">{language === 'ta' ? 'சிறந்த தொடர்' : 'Best Streak'}</div>
          </div>
          <div className="p-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
            <div className="text-lg font-bold text-green-700">{stats.mockTestsCompleted}</div>
            <div className="text-[10px] text-green-600">{language === 'ta' ? 'தேர்வுகள்' : 'Tests'}</div>
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {filteredAchievements.map((achievement, index) => {
            const unlockedData = unlockedAchievements.find(u => u.id === achievement.id);
            const isUnlocked = !!unlockedData;
            const isNew = newlyUnlocked.includes(achievement.id);
            const currentValue = achievement.checkFn(stats);
            const progress = Math.min(100, (currentValue / achievement.requirement) * 100);
            const tierConfig = TIER_CONFIG[achievement.tier];

            const handleShareClick = (e: React.MouseEvent) => {
              e.stopPropagation();
              if (isUnlocked) {
                setShareAchievement(achievement);
                setShareUnlockedAt(unlockedData?.unlockedAt);
              }
            };

            return (
              <motion.div
                key={achievement.id}
                initial={isNew ? { scale: 0.8, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: isNew ? index * 0.1 : 0 }}
                className={`relative p-3 rounded-xl border transition-all group ${
                  isUnlocked 
                    ? `${tierConfig.lightBg} ${tierConfig.border} cursor-pointer hover:shadow-md` 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
                onClick={handleShareClick}
              >
                {isNew && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </motion.div>
                )}

                {/* Share button for unlocked achievements */}
                {isUnlocked && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/80 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    onClick={handleShareClick}
                    title={language === 'ta' ? 'பகிர்' : 'Share'}
                  >
                    <Share2 className="h-3 w-3 text-gray-600" />
                  </motion.button>
                )}

                <div className="flex flex-col items-center text-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    isUnlocked 
                      ? `bg-gradient-to-br ${tierConfig.bg} text-white shadow-md` 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {isUnlocked 
                      ? getIcon(achievement.icon, 'h-5 w-5') 
                      : <Lock className="h-5 w-5" />
                    }
                  </div>
                  
                  <span className={`text-xs font-medium ${isUnlocked ? tierConfig.text : 'text-gray-500'}`}>
                    {language === 'ta' ? achievement.nameTa : achievement.name}
                  </span>
                  
                  <span className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">
                    {language === 'ta' ? achievement.descriptionTa : achievement.description}
                  </span>

                  {!isUnlocked && (
                    <div className="w-full mt-2">
                      <Progress value={progress} className="h-1 bg-gray-200" />
                      <span className="text-[9px] text-gray-400 mt-0.5">
                        {currentValue.toFixed(0)} / {achievement.requirement}
                      </span>
                    </div>
                  )}

                  <Badge 
                    variant="outline" 
                    className={`mt-1 text-[9px] px-1.5 py-0 ${
                      isUnlocked ? tierConfig.border : 'border-gray-300'
                    }`}
                  >
                    {achievement.tier.toUpperCase()}
                  </Badge>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tier Legend */}
        <div className="flex justify-center gap-2 pt-2 border-t border-gray-100">
          {Object.entries(TIER_CONFIG).map(([tier, config]) => (
            <div key={tier} className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${config.bg}`} />
              <span className="text-[10px] text-gray-500 capitalize">{tier}</span>
            </div>
          ))}
        </div>

        {/* Share hint */}
        <p className="text-center text-[10px] text-muted-foreground">
          {language === 'ta' 
            ? '💡 திறக்கப்பட்ட சாதனையை பகிர கிளிக் செய்யவும்' 
            : '💡 Click on an unlocked achievement to share it'}
        </p>
      </CardContent>

      {/* Achievement Collections Section */}
      <div className="px-6 pb-6">
        <AchievementCollections 
          language={language} 
          unlockedAchievementIds={unlockedAchievements.map(u => u.id)} 
        />
      </div>

      {/* Share Modal */}
      {shareAchievement && (
        <AchievementShareCard
          achievement={shareAchievement}
          stats={stats}
          unlockedAt={shareUnlockedAt}
          language={language}
          isOpen={!!shareAchievement}
          onClose={() => setShareAchievement(null)}
        />
      )}

      {/* Milestone Celebration Modal */}
      <MilestoneCelebration
        milestone={celebratingMilestone}
        language={language}
        onClose={() => setCelebratingMilestone(null)}
      />
    </Card>
  );
};
