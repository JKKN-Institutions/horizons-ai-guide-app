import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Calendar, Trophy, Star, Shield, Sparkles, X, ChevronRight, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/hooks/useLanguage';
import { useDailyLoginRewards, DailyReward, WeeklyReward } from '@/hooks/useDailyLoginRewards';
import confetti from 'canvas-confetti';

const DailyLoginRewards: React.FC = () => {
  const { language } = useLanguage();
  const {
    data,
    showRewardModal,
    pendingReward,
    isNewDay,
    claimDailyReward,
    claimWeeklyReward,
    closeRewardModal,
    getClaimableRewardsCount,
    getConsecutiveDayBonus,
  } = useDailyLoginRewards();

  const [showPanel, setShowPanel] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (isNewDay && getClaimableRewardsCount() > 0) {
      setShowWelcome(true);
      const timer = setTimeout(() => setShowWelcome(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isNewDay, getClaimableRewardsCount]);

  const handleClaimReward = (reward: DailyReward | WeeklyReward) => {
    if ('day' in reward) {
      claimDailyReward(reward.day);
    } else {
      claimWeeklyReward(reward.week);
    }
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF6347', '#00CED1', '#9370DB'],
    });
  };

  const bonusMultiplier = getConsecutiveDayBonus();
  const claimableCount = getClaimableRewardsCount();
  const completedWeeks = Math.floor(data.totalLogins / 7);

  const getRewardIcon = (reward: DailyReward | WeeklyReward) => {
    const type = 'day' in reward ? reward.type : reward.type;
    switch (type) {
      case 'xp':
      case 'mega_xp':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'freeze':
      case 'freeze_pack':
        return <Shield className="h-5 w-5 text-cyan-500" />;
      case 'badge':
      case 'special_badge':
        return <Trophy className="h-5 w-5 text-amber-500" />;
      case 'bonus':
        return <Sparkles className="h-5 w-5 text-purple-500" />;
      case 'mystery':
        return <Gift className="h-5 w-5 text-pink-500" />;
      default:
        return <Star className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-20 right-4 z-40 md:bottom-6"
      >
        <Button
          onClick={() => setShowPanel(true)}
          className="relative h-14 w-14 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 shadow-lg hover:shadow-xl"
        >
          <Gift className="h-6 w-6 text-white" />
          {claimableCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center"
            >
              {claimableCount}
            </motion.span>
          )}
        </Button>
      </motion.div>

      {/* Welcome Toast */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-4 left-1/2 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3"
          >
            <Gift className="h-5 w-5" />
            <span className="font-medium">
              {language === 'ta' 
                ? `நாள் ${data.currentStreak}! உங்கள் வெகுமதிகளைப் பெறுங்கள்!` 
                : `Day ${data.currentStreak}! Claim your rewards!`}
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 p-1"
              onClick={() => setShowWelcome(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rewards Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center"
            onClick={() => setShowPanel(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white dark:bg-gray-900 w-full md:w-[500px] md:rounded-2xl rounded-t-2xl max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">
                        {language === 'ta' ? 'தினசரி வெகுமதிகள்' : 'Daily Rewards'}
                      </h2>
                      <p className="text-sm text-white/80">
                        {language === 'ta' 
                          ? `${data.currentStreak} நாள் தொடர்` 
                          : `${data.currentStreak} day streak`}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={() => setShowPanel(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="bg-white/10 rounded-lg p-2 text-center">
                    <p className="text-2xl font-bold">{data.totalLogins}</p>
                    <p className="text-[10px] text-white/70">
                      {language === 'ta' ? 'மொத்த நாட்கள்' : 'Total Days'}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 text-center">
                    <p className="text-2xl font-bold">{data.longestStreak}</p>
                    <p className="text-[10px] text-white/70">
                      {language === 'ta' ? 'சிறந்த தொடர்' : 'Best Streak'}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 text-center">
                    <p className="text-2xl font-bold">{data.totalXPEarned}</p>
                    <p className="text-[10px] text-white/70">
                      {language === 'ta' ? 'மொத்த XP' : 'Total XP'}
                    </p>
                  </div>
                </div>

                {/* Bonus Multiplier */}
                {bonusMultiplier > 1 && (
                  <div className="mt-3 bg-white/20 rounded-lg p-2 flex items-center justify-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-300" />
                    <span className="text-sm font-medium">
                      {language === 'ta' 
                        ? `${bonusMultiplier}x போனஸ் பெருக்கி செயலில்!` 
                        : `${bonusMultiplier}x Bonus Multiplier Active!`}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 overflow-y-auto max-h-[50vh]">
                {/* Weekly Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {language === 'ta' ? 'வாரப் பயணம்' : 'Weekly Journey'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {data.weeklyProgress}/7 {language === 'ta' ? 'நாட்கள்' : 'days'}
                    </span>
                  </div>
                  <Progress value={(data.weeklyProgress / 7) * 100} className="h-2" />
                </div>

                {/* Daily Rewards Grid */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-500" />
                    {language === 'ta' ? 'தினசரி வெகுமதிகள்' : 'Daily Rewards'}
                  </h3>
                  <div className="grid grid-cols-7 gap-2">
                    {data.dailyRewards.map((reward) => {
                      const isAvailable = reward.day <= data.weeklyProgress;
                      const isClaimed = reward.claimed;
                      const isToday = reward.day === data.weeklyProgress;

                      return (
                        <motion.button
                          key={reward.day}
                          whileHover={isAvailable && !isClaimed ? { scale: 1.05 } : {}}
                          whileTap={isAvailable && !isClaimed ? { scale: 0.95 } : {}}
                          onClick={() => isAvailable && !isClaimed && handleClaimReward(reward)}
                          disabled={!isAvailable || isClaimed}
                          className={`relative aspect-square rounded-xl flex flex-col items-center justify-center p-1 transition-all ${
                            isClaimed
                              ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-400'
                              : isToday
                              ? 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 border-2 border-amber-400 shadow-lg'
                              : isAvailable
                              ? 'bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 cursor-pointer hover:shadow-md'
                              : 'bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 opacity-50'
                          }`}
                        >
                          <span className="text-lg">{reward.icon}</span>
                          <span className="text-[8px] font-medium text-gray-600 dark:text-gray-400 mt-0.5">
                            {language === 'ta' ? `நாள் ${reward.day}` : `Day ${reward.day}`}
                          </span>
                          {isClaimed && (
                            <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 rounded-xl">
                              <span className="text-green-600 text-lg">✓</span>
                            </div>
                          )}
                          {isToday && !isClaimed && (
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Weekly Rewards */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <Crown className="h-4 w-4 text-purple-500" />
                    {language === 'ta' ? 'வாரப் போனஸ்கள்' : 'Weekly Bonuses'}
                  </h3>
                  <div className="space-y-2">
                    {data.weeklyRewards.map((reward) => {
                      const isAvailable = reward.week <= completedWeeks;
                      const isClaimed = reward.claimed;

                      return (
                        <motion.div
                          key={reward.week}
                          whileHover={isAvailable && !isClaimed ? { scale: 1.02 } : {}}
                          className={`relative flex items-center gap-3 p-3 rounded-xl transition-all ${
                            isClaimed
                              ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200'
                              : isAvailable
                              ? 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-300 cursor-pointer'
                              : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 opacity-60'
                          }`}
                        >
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            isClaimed ? 'bg-purple-200' : isAvailable ? 'bg-purple-100' : 'bg-gray-200'
                          }`}>
                            <span className="text-xl">{reward.icon}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                              {language === 'ta' ? `வாரம் ${reward.week}` : `Week ${reward.week}`}
                            </p>
                            <p className="text-xs text-gray-500">
                              {language === 'ta' ? reward.labelTa : reward.label}
                            </p>
                          </div>
                          {isClaimed ? (
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                              {language === 'ta' ? 'பெறப்பட்டது' : 'Claimed'}
                            </Badge>
                          ) : isAvailable ? (
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                              onClick={() => handleClaimReward(reward)}
                            >
                              {language === 'ta' ? 'பெறு' : 'Claim'}
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          ) : (
                            <Badge variant="outline" className="text-gray-500">
                              {Math.max(0, reward.week * 7 - data.totalLogins)} {language === 'ta' ? 'நாட்கள் மீதம்' : 'days left'}
                            </Badge>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reward Claim Modal */}
      <Dialog open={showRewardModal} onOpenChange={closeRewardModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {language === 'ta' ? '🎉 வெகுமதி பெறப்பட்டது!' : '🎉 Reward Claimed!'}
            </DialogTitle>
          </DialogHeader>
          {pendingReward && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center py-6"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="h-24 w-24 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mb-4"
              >
                <span className="text-5xl">{pendingReward.icon}</span>
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'ta' ? pendingReward.labelTa : pendingReward.label}
              </h3>
              <p className="text-sm text-gray-500 text-center">
                {language === 'ta' 
                  ? 'தொடர்ந்து வாருங்கள் மேலும் வெகுமதிகளைப் பெறுங்கள்!' 
                  : 'Keep coming back to earn more rewards!'}
              </p>
              <Button
                className="mt-6 bg-gradient-to-r from-amber-500 to-orange-500"
                onClick={closeRewardModal}
              >
                {language === 'ta' ? 'அருமை!' : 'Awesome!'}
              </Button>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DailyLoginRewards;
