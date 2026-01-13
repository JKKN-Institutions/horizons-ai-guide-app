import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, Crown, Medal, Star, Flame, Clock,
  Target, TrendingUp, Users, RefreshCw, Loader2,
  Award, Sparkles, Upload, Calendar
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const ACHIEVEMENTS_KEY = 'govt_study_achievements';
const UNLOCKED_KEY = 'govt_unlocked_achievements';

interface LeaderboardEntry {
  id: string;
  user_id: string;
  display_name: string;
  total_achievements: number;
  bronze_count: number;
  silver_count: number;
  gold_count: number;
  platinum_count: number;
  diamond_count: number;
  total_study_hours: number;
  longest_streak: number;
  mock_tests_completed: number;
  goals_achieved: number;
  achievement_points: number;
  week_start: string | null;
  updated_at: string;
}

import { Language } from '@/hooks/useLanguage';

interface AchievementLeaderboardProps {
  language: Language;
}

const TIER_POINTS = {
  bronze: 10,
  silver: 25,
  gold: 50,
  platinum: 100,
  diamond: 200,
};

export const AchievementLeaderboard = ({ language }: AchievementLeaderboardProps) => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('week');
  const [isLoading, setIsLoading] = useState(true);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Calculate local stats for syncing
  const calculateLocalStats = () => {
    let totalHours = 0;
    let longestStreak = 0;
    let mockTestsCompleted = 0;
    let goalsAchieved = 0;
    let bronzeCount = 0;
    let silverCount = 0;
    let goldCount = 0;
    let platinumCount = 0;
    let diamondCount = 0;

    try {
      // Study hours
      const schedules = localStorage.getItem('govt_practice_schedules');
      if (schedules) {
        const parsed = JSON.parse(schedules);
        Object.values(parsed).forEach((daySchedules: any) => {
          if (Array.isArray(daySchedules)) {
            daySchedules.forEach((s: any) => {
              if (s.completed) totalHours += (s.duration || 30) / 60;
            });
          }
        });
      }

      // Mock tests
      const mockScores = localStorage.getItem('govt_mock_test_scores');
      if (mockScores) {
        mockTestsCompleted = JSON.parse(mockScores).length;
      }

      // Streak
      const streakData = localStorage.getItem('govt_study_streak');
      if (streakData) {
        const streak = JSON.parse(streakData);
        longestStreak = streak.longestStreak || streak.currentStreak || 0;
      }

      // Goals
      const goalsHistory = localStorage.getItem('govt_weekly_goals_history');
      if (goalsHistory) {
        goalsAchieved = JSON.parse(goalsHistory).filter((h: any) => h.achieved).length;
      }

      // Unlocked achievements
      const unlockedStr = localStorage.getItem(UNLOCKED_KEY);
      if (unlockedStr) {
        const unlocked = JSON.parse(unlockedStr);
        // Count by tier based on achievement IDs
        unlocked.forEach((u: any) => {
          const id = u.id;
          if (id.includes('study_200h') || id.includes('streak_60') || id.includes('perfect_5')) {
            diamondCount++;
          } else if (id.includes('study_100h') || id.includes('streak_30') || id.includes('test_25') || id.includes('goal_streak_4')) {
            platinumCount++;
          } else if (id.includes('study_50h') || id.includes('streak_14') || id.includes('test_10') || id.includes('goal_12') || id.includes('active_30') || id.includes('perfect_1')) {
            goldCount++;
          } else if (id.includes('study_10h') || id.includes('study_25h') || id.includes('streak_7') || id.includes('test_5') || id.includes('goal_4') || id.includes('questions_100')) {
            silverCount++;
          } else {
            bronzeCount++;
          }
        });
      }
    } catch (error) {
      console.error('Error calculating local stats:', error);
    }

    const totalAchievements = bronzeCount + silverCount + goldCount + platinumCount + diamondCount;
    const achievementPoints = 
      bronzeCount * TIER_POINTS.bronze +
      silverCount * TIER_POINTS.silver +
      goldCount * TIER_POINTS.gold +
      platinumCount * TIER_POINTS.platinum +
      diamondCount * TIER_POINTS.diamond;

    return {
      totalHours,
      longestStreak,
      mockTestsCompleted,
      goalsAchieved,
      bronzeCount,
      silverCount,
      goldCount,
      platinumCount,
      diamondCount,
      totalAchievements,
      achievementPoints,
    };
  };

  // Sync local progress to database
  const syncProgress = async () => {
    if (!user) {
      toast.error(language === 'ta' ? 'உள்நுழைக தேவை' : 'Please login to sync');
      return;
    }

    setIsSyncing(true);
    try {
      const stats = calculateLocalStats();
      const now = new Date();
      const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
      
      // Check if user already has an entry for this week
      const { data: existing } = await supabase
        .from('user_achievement_progress')
        .select('id')
        .eq('user_id', user.id)
        .gte('week_start', weekStart.toISOString().split('T')[0])
        .maybeSingle();

      const displayName = user.email?.split('@')[0] || 'Anonymous';

      if (existing) {
        // Update existing entry
        await supabase
          .from('user_achievement_progress')
          .update({
            display_name: displayName,
            total_achievements: stats.totalAchievements,
            bronze_count: stats.bronzeCount,
            silver_count: stats.silverCount,
            gold_count: stats.goldCount,
            platinum_count: stats.platinumCount,
            diamond_count: stats.diamondCount,
            total_study_hours: stats.totalHours,
            longest_streak: stats.longestStreak,
            mock_tests_completed: stats.mockTestsCompleted,
            goals_achieved: stats.goalsAchieved,
            achievement_points: stats.achievementPoints,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id);
      } else {
        // Insert new entry
        await supabase
          .from('user_achievement_progress')
          .insert({
            user_id: user.id,
            display_name: displayName,
            total_achievements: stats.totalAchievements,
            bronze_count: stats.bronzeCount,
            silver_count: stats.silverCount,
            gold_count: stats.goldCount,
            platinum_count: stats.platinumCount,
            diamond_count: stats.diamondCount,
            total_study_hours: stats.totalHours,
            longest_streak: stats.longestStreak,
            mock_tests_completed: stats.mockTestsCompleted,
            goals_achieved: stats.goalsAchieved,
            achievement_points: stats.achievementPoints,
            week_start: weekStart.toISOString().split('T')[0],
          });
      }

      toast.success(language === 'ta' ? 'முன்னேற்றம் ஒத்திசைக்கப்பட்டது!' : 'Progress synced!');
      fetchLeaderboard();
    } catch (error) {
      console.error('Error syncing progress:', error);
      toast.error(language === 'ta' ? 'ஒத்திசைவு தோல்வி' : 'Sync failed');
    } finally {
      setIsSyncing(false);
    }
  };

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('user_achievement_progress')
        .select('*')
        .order('achievement_points', { ascending: false })
        .order('total_achievements', { ascending: false })
        .limit(100);

      // Apply time filter
      const now = new Date();
      if (timeFilter === 'week') {
        const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
        query = query.gte('week_start', weekStart.toISOString().split('T')[0]);
      } else if (timeFilter === 'month') {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        query = query.gte('week_start', monthStart.toISOString().split('T')[0]);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Aggregate by user (get best scores)
      const userBest = new Map<string, LeaderboardEntry>();
      (data || []).forEach((entry: LeaderboardEntry) => {
        const existing = userBest.get(entry.user_id);
        if (!existing || entry.achievement_points > existing.achievement_points) {
          userBest.set(entry.user_id, entry);
        }
      });

      const aggregated = Array.from(userBest.values())
        .sort((a, b) => b.achievement_points - a.achievement_points);

      setLeaderboard(aggregated);

      // Find user's rank
      if (user) {
        const userIndex = aggregated.findIndex(e => e.user_id === user.id);
        setUserRank(userIndex !== -1 ? userIndex + 1 : null);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      toast.error(language === 'ta' ? 'லீடர்போர்டு ஏற்ற முடியவில்லை' : 'Failed to load leaderboard');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [timeFilter]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBackground = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return 'bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-300 ring-2 ring-purple-400';
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-100 to-amber-50 border-yellow-300';
      case 2: return 'bg-gradient-to-r from-gray-100 to-gray-50 border-gray-300';
      case 3: return 'bg-gradient-to-r from-amber-100 to-orange-50 border-amber-300';
      default: return 'bg-white border-gray-200';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getTierBadges = (entry: LeaderboardEntry) => {
    const badges = [];
    if (entry.diamond_count > 0) badges.push({ tier: 'diamond', count: entry.diamond_count, color: 'from-purple-400 to-pink-500' });
    if (entry.platinum_count > 0) badges.push({ tier: 'platinum', count: entry.platinum_count, color: 'from-cyan-400 to-blue-500' });
    if (entry.gold_count > 0) badges.push({ tier: 'gold', count: entry.gold_count, color: 'from-yellow-400 to-amber-500' });
    if (entry.silver_count > 0) badges.push({ tier: 'silver', count: entry.silver_count, color: 'from-gray-300 to-gray-400' });
    if (entry.bronze_count > 0) badges.push({ tier: 'bronze', count: entry.bronze_count, color: 'from-amber-600 to-amber-700' });
    return badges.slice(0, 3);
  };

  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  const localStats = useMemo(() => calculateLocalStats(), []);

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">
                {language === 'ta' ? 'சாதனை லீடர்போர்டு' : 'Achievement Leaderboard'}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'ta' 
                  ? `${leaderboard.length} போட்டியாளர்கள்`
                  : `${leaderboard.length} Competitors`}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={syncProgress}
              disabled={isSyncing || !user}
              className="gap-1"
            >
              <Upload className={`h-4 w-4 ${isSyncing ? 'animate-bounce' : ''}`} />
              {language === 'ta' ? 'ஒத்திசை' : 'Sync'}
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={fetchLeaderboard}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Time Filter */}
        <Tabs value={timeFilter} onValueChange={(v) => setTimeFilter(v as typeof timeFilter)}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="week" className="gap-1 text-xs">
              <Calendar className="h-3 w-3" />
              {language === 'ta' ? 'இந்த வாரம்' : 'This Week'}
            </TabsTrigger>
            <TabsTrigger value="month" className="gap-1 text-xs">
              <Calendar className="h-3 w-3" />
              {language === 'ta' ? 'இந்த மாதம்' : 'This Month'}
            </TabsTrigger>
            <TabsTrigger value="all" className="gap-1 text-xs">
              <Sparkles className="h-3 w-3" />
              {language === 'ta' ? 'எல்லா காலமும்' : 'All Time'}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Your Stats Preview */}
        {user && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-purple-800">
                {language === 'ta' ? 'உங்கள் புள்ளிவிவரங்கள்' : 'Your Stats'}
              </span>
              {userRank && (
                <Badge className="bg-purple-500">
                  #{userRank} {language === 'ta' ? 'தரவரிசை' : 'Rank'}
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <div className="text-xl font-bold text-purple-700">{localStats.totalAchievements}</div>
                <div className="text-xs text-purple-600">{language === 'ta' ? 'சாதனைகள்' : 'Badges'}</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-700">{localStats.achievementPoints}</div>
                <div className="text-xs text-purple-600">{language === 'ta' ? 'புள்ளிகள்' : 'Points'}</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-700">{localStats.longestStreak}</div>
                <div className="text-xs text-purple-600">{language === 'ta' ? 'நீண்ட தொடர்' : 'Best Streak'}</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-700">{Math.round(localStats.totalHours)}</div>
                <div className="text-xs text-purple-600">{language === 'ta' ? 'மணிநேரம்' : 'Hours'}</div>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>{language === 'ta' ? 'இன்னும் தரவு இல்லை' : 'No data yet'}</p>
            <p className="text-sm mt-1">
              {language === 'ta' 
                ? 'உங்கள் முன்னேற்றத்தை ஒத்திசைத்து லீடர்போர்டில் இடம்பிடியுங்கள்!'
                : 'Sync your progress to appear on the leaderboard!'}
            </p>
            {user && (
              <Button onClick={syncProgress} className="mt-4 gap-2" disabled={isSyncing}>
                <Upload className="h-4 w-4" />
                {language === 'ta' ? 'இப்போது ஒத்திசை' : 'Sync Now'}
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {topThree.length > 0 && (
              <div className="flex justify-center items-end gap-3 py-6">
                {/* 2nd Place */}
                {topThree[1] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`text-center ${user && topThree[1].user_id === user.id ? 'ring-2 ring-purple-400 rounded-xl p-2' : ''}`}
                  >
                    <Avatar className="h-12 w-12 mx-auto border-4 border-gray-300">
                      <AvatarFallback className="bg-gray-200 text-gray-700 text-sm">
                        {getInitials(topThree[1].display_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-2">
                      <Medal className="h-5 w-5 mx-auto text-gray-400" />
                      <p className="text-xs font-medium truncate max-w-[70px]">{topThree[1].display_name}</p>
                      <p className="text-lg font-bold text-gray-600">{topThree[1].achievement_points}</p>
                      <div className="flex justify-center gap-0.5 mt-1">
                        {getTierBadges(topThree[1]).map((b, i) => (
                          <div key={i} className={`w-4 h-4 rounded-full bg-gradient-to-br ${b.color} flex items-center justify-center`}>
                            <span className="text-[8px] text-white font-bold">{b.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="h-14 w-16 bg-gray-300 rounded-t-lg mt-2" />
                  </motion.div>
                )}

                {/* 1st Place */}
                {topThree[0] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center -mt-4 ${user && topThree[0].user_id === user.id ? 'ring-2 ring-purple-400 rounded-xl p-2' : ''}`}
                  >
                    <div className="relative">
                      <Avatar className="h-14 w-14 mx-auto border-4 border-yellow-400">
                        <AvatarFallback className="bg-yellow-200 text-yellow-700">
                          {getInitials(topThree[0].display_name)}
                        </AvatarFallback>
                      </Avatar>
                      <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
                    </div>
                    <div className="mt-2">
                      <Crown className="h-6 w-6 mx-auto text-yellow-500" />
                      <p className="text-sm font-medium truncate max-w-[80px]">{topThree[0].display_name}</p>
                      <p className="text-xl font-bold text-yellow-600">{topThree[0].achievement_points}</p>
                      <div className="flex justify-center gap-0.5 mt-1">
                        {getTierBadges(topThree[0]).map((b, i) => (
                          <div key={i} className={`w-5 h-5 rounded-full bg-gradient-to-br ${b.color} flex items-center justify-center`}>
                            <span className="text-[9px] text-white font-bold">{b.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="h-20 w-18 bg-yellow-400 rounded-t-lg mt-2" />
                  </motion.div>
                )}

                {/* 3rd Place */}
                {topThree[2] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`text-center ${user && topThree[2].user_id === user.id ? 'ring-2 ring-purple-400 rounded-xl p-2' : ''}`}
                  >
                    <Avatar className="h-10 w-10 mx-auto border-4 border-amber-400">
                      <AvatarFallback className="bg-amber-200 text-amber-700 text-sm">
                        {getInitials(topThree[2].display_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-2">
                      <Medal className="h-4 w-4 mx-auto text-amber-600" />
                      <p className="text-xs font-medium truncate max-w-[60px]">{topThree[2].display_name}</p>
                      <p className="text-lg font-bold text-amber-600">{topThree[2].achievement_points}</p>
                      <div className="flex justify-center gap-0.5 mt-1">
                        {getTierBadges(topThree[2]).map((b, i) => (
                          <div key={i} className={`w-4 h-4 rounded-full bg-gradient-to-br ${b.color} flex items-center justify-center`}>
                            <span className="text-[8px] text-white font-bold">{b.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="h-10 w-14 bg-amber-400 rounded-t-lg mt-2" />
                  </motion.div>
                )}
              </div>
            )}

            {/* Rest of Leaderboard */}
            <ScrollArea className="h-[220px]">
              <div className="space-y-2">
                {rest.map((entry, idx) => {
                  const isCurrentUser = user && entry.user_id === user.id;
                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                    >
                      <Card className={`p-3 border ${getRankBackground(idx + 4, isCurrentUser)}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 flex justify-center">
                            {getRankIcon(idx + 4)}
                          </div>
                          
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-purple-100 text-purple-700 text-sm">
                              {getInitials(entry.display_name)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium truncate text-sm">{entry.display_name}</span>
                              {isCurrentUser && (
                                <Badge variant="secondary" className="text-xs bg-purple-200 text-purple-700">
                                  {language === 'ta' ? 'நீங்கள்' : 'You'}
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-1 mt-1">
                              {getTierBadges(entry).map((b, i) => (
                                <div key={i} className={`px-1.5 py-0.5 rounded text-[10px] font-medium bg-gradient-to-r ${b.color} text-white`}>
                                  {b.count}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-purple-600">{entry.achievement_points}</div>
                            <div className="text-xs text-muted-foreground">
                              {entry.total_achievements} {language === 'ta' ? 'சாதனை' : 'badges'}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollArea>
          </>
        )}

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t">
          <div className="text-center p-3 rounded-lg bg-white/60">
            <div className="flex items-center justify-center gap-1">
              <Users className="h-4 w-4 text-purple-600" />
              <span className="text-xl font-bold text-purple-600">{leaderboard.length}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {language === 'ta' ? 'போட்டியாளர்கள்' : 'Competitors'}
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/60">
            <div className="flex items-center justify-center gap-1">
              <Award className="h-4 w-4 text-purple-600" />
              <span className="text-xl font-bold text-purple-600">
                {leaderboard[0]?.achievement_points || 0}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {language === 'ta' ? 'சிறந்த புள்ளி' : 'Top Points'}
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/60">
            <div className="flex items-center justify-center gap-1">
              <Star className="h-4 w-4 text-purple-600" />
              <span className="text-xl font-bold text-purple-600">
                {leaderboard.reduce((sum, e) => sum + e.total_achievements, 0)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {language === 'ta' ? 'மொத்த சாதனை' : 'Total Badges'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
