import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Trophy, Star, Zap, Target, Award, Gift, 
  ChevronRight, Calendar, TrendingUp, Crown, Medal,
  Sparkles, Heart, Shield, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  target: number;
  xp: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  avatar: string;
  isCurrentUser?: boolean;
}

const STORAGE_KEY = 'vazhikatti_study_streak';

const StudyStreakGamification: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [lastStudyDate, setLastStudyDate] = useState<string | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [dailyGoalProgress, setDailyGoalProgress] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setStreak(data.streak || 0);
      setTotalXP(data.totalXP || 0);
      setLevel(Math.floor((data.totalXP || 0) / 500) + 1);
      setLastStudyDate(data.lastStudyDate);
      setDailyGoalProgress(data.dailyGoalProgress || 0);
    }
  }, []);

  const saveProgress = (updates: Partial<{ streak: number; totalXP: number; lastStudyDate: string; dailyGoalProgress: number }>) => {
    const current = {
      streak,
      totalXP,
      lastStudyDate,
      dailyGoalProgress,
      ...updates
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  };

  const claimDailyReward = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    let newStreak = streak;
    if (lastStudyDate === yesterday) {
      newStreak = streak + 1;
    } else if (lastStudyDate !== today) {
      newStreak = 1;
    }
    
    const xpGained = 50 + (newStreak * 10);
    const newXP = totalXP + xpGained;
    
    setStreak(newStreak);
    setTotalXP(newXP);
    setLevel(Math.floor(newXP / 500) + 1);
    setLastStudyDate(today);
    setShowReward(true);
    
    saveProgress({ streak: newStreak, totalXP: newXP, lastStudyDate: today });
    
    setTimeout(() => setShowReward(false), 3000);
  };

  const badges: Badge[] = [
    { id: 'first-login', name: 'First Steps', description: 'Started your journey', icon: <Star className="h-5 w-5" />, unlocked: true, progress: 1, target: 1, xp: 50, rarity: 'common' },
    { id: 'streak-3', name: 'Consistent', description: '3-day study streak', icon: <Flame className="h-5 w-5" />, unlocked: streak >= 3, progress: Math.min(streak, 3), target: 3, xp: 100, rarity: 'common' },
    { id: 'streak-7', name: 'Week Warrior', description: '7-day study streak', icon: <Shield className="h-5 w-5" />, unlocked: streak >= 7, progress: Math.min(streak, 7), target: 7, xp: 250, rarity: 'rare' },
    { id: 'streak-14', name: 'Dedication', description: '14-day study streak', icon: <Award className="h-5 w-5" />, unlocked: streak >= 14, progress: Math.min(streak, 14), target: 14, xp: 500, rarity: 'epic' },
    { id: 'streak-30', name: 'Monthly Master', description: '30-day study streak', icon: <Crown className="h-5 w-5" />, unlocked: streak >= 30, progress: Math.min(streak, 30), target: 30, xp: 1000, rarity: 'legendary' },
    { id: 'xp-1000', name: 'Rising Star', description: 'Earned 1000 XP', icon: <TrendingUp className="h-5 w-5" />, unlocked: totalXP >= 1000, progress: Math.min(totalXP, 1000), target: 1000, xp: 150, rarity: 'rare' },
    { id: 'level-5', name: 'Scholar', description: 'Reached Level 5', icon: <Medal className="h-5 w-5" />, unlocked: level >= 5, progress: Math.min(level, 5), target: 5, xp: 300, rarity: 'epic' },
    { id: 'level-10', name: 'Expert', description: 'Reached Level 10', icon: <Trophy className="h-5 w-5" />, unlocked: level >= 10, progress: Math.min(level, 10), target: 10, xp: 750, rarity: 'legendary' },
  ];

  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Priya S.', xp: 15420, streak: 45, avatar: '👩‍🎓' },
    { rank: 2, name: 'Karthik R.', xp: 12350, streak: 38, avatar: '👨‍💻' },
    { rank: 3, name: 'Divya M.', xp: 11200, streak: 32, avatar: '👩‍🔬' },
    { rank: 4, name: 'Arun K.', xp: 9850, streak: 28, avatar: '🧑‍🎓' },
    { rank: 5, name: 'You', xp: totalXP, streak: streak, avatar: '🌟', isCurrentUser: true },
    { rank: 6, name: 'Lakshmi P.', xp: 7600, streak: 21, avatar: '👩‍💼' },
    { rank: 7, name: 'Vijay N.', xp: 6400, streak: 18, avatar: '👨‍🎓' },
  ].sort((a, b) => b.xp - a.xp).map((e, i) => ({ ...e, rank: i + 1 }));

  const getRarityColor = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 border-gray-300 text-gray-700';
      case 'rare': return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'epic': return 'bg-purple-100 border-purple-300 text-purple-700';
      case 'legendary': return 'bg-amber-100 border-amber-300 text-amber-700';
    }
  };

  const xpToNextLevel = (level * 500) - totalXP;
  const levelProgress = ((totalXP % 500) / 500) * 100;

  const canClaimToday = lastStudyDate !== new Date().toDateString();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg">
                <Flame className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-orange-600 transition-colors">
                  Study Streak & XP
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Build streaks, earn XP, unlock badges & compete!
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="font-bold text-orange-600">{streak}</span>
                    <span className="text-xs text-muted-foreground">day streak</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold text-yellow-600">{totalXP}</span>
                    <span className="text-xs text-muted-foreground">XP</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Study Streak & Gamification
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Stats Overview */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span className="text-3xl font-bold text-orange-600">{streak}</span>
                </div>
                <div className="text-xs text-orange-700">Day Streak</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 border-yellow-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span className="text-3xl font-bold text-yellow-600">{totalXP}</span>
                </div>
                <div className="text-xs text-yellow-700">Total XP</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Crown className="h-5 w-5 text-purple-500" />
                  <span className="text-3xl font-bold text-purple-600">{level}</span>
                </div>
                <div className="text-xs text-purple-700">Level</div>
              </CardContent>
            </Card>
          </div>

          {/* Level Progress */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Level {level}</span>
                <span className="text-sm text-muted-foreground">{xpToNextLevel} XP to Level {level + 1}</span>
              </div>
              <Progress value={levelProgress} className="h-2" />
            </CardContent>
          </Card>

          {/* Daily Claim Button */}
          <AnimatePresence>
            {showReward && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
              >
                <motion.div 
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl text-center shadow-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: 3, duration: 0.3 }}
                >
                  <Sparkles className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Reward Claimed! 🎉</h3>
                  <p className="text-lg">+{50 + streak * 10} XP</p>
                  <p className="text-sm text-muted-foreground mt-1">Streak: {streak} days</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button 
            className="w-full h-14 text-lg bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            onClick={claimDailyReward}
            disabled={!canClaimToday}
          >
            {canClaimToday ? (
              <>
                <Gift className="h-5 w-5 mr-2" />
                Claim Daily Reward (+{50 + streak * 10} XP)
              </>
            ) : (
              <>
                <Clock className="h-5 w-5 mr-2" />
                Already Claimed Today
              </>
            )}
          </Button>

          <Tabs defaultValue="badges">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="badges">
                <Award className="h-4 w-4 mr-2" />
                Badges
              </TabsTrigger>
              <TabsTrigger value="leaderboard">
                <Trophy className="h-4 w-4 mr-2" />
                Leaderboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="badges" className="space-y-3 mt-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`${!badge.unlocked && 'opacity-60'}`}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${badge.unlocked ? getRarityColor(badge.rarity) : 'bg-gray-100 text-gray-400'}`}>
                        {badge.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm">{badge.name}</h4>
                          <Badge variant="outline" className={`text-xs ${getRarityColor(badge.rarity)}`}>
                            {badge.rarity}
                          </Badge>
                          {badge.unlocked && <Badge className="text-xs bg-green-100 text-green-700">+{badge.xp} XP</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                        {!badge.unlocked && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>Progress</span>
                              <span>{badge.progress}/{badge.target}</span>
                            </div>
                            <Progress value={(badge.progress / badge.target) * 100} className="h-1" />
                          </div>
                        )}
                      </div>
                      {badge.unlocked && (
                        <div className="text-green-500">
                          <Star className="h-5 w-5 fill-current" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-2 mt-4">
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`${entry.isCurrentUser && 'ring-2 ring-primary bg-primary/5'}`}>
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        entry.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                        entry.rank === 2 ? 'bg-gray-100 text-gray-700' :
                        entry.rank === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {entry.rank}
                      </div>
                      <div className="text-2xl">{entry.avatar}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{entry.name}</h4>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Zap className="h-3 w-3 text-yellow-500" />
                            {entry.xp.toLocaleString()} XP
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="h-3 w-3 text-orange-500" />
                            {entry.streak} days
                          </span>
                        </div>
                      </div>
                      {entry.rank <= 3 && (
                        <Trophy className={`h-5 w-5 ${
                          entry.rank === 1 ? 'text-yellow-500' :
                          entry.rank === 2 ? 'text-gray-400' :
                          'text-orange-500'
                        }`} />
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudyStreakGamification;
