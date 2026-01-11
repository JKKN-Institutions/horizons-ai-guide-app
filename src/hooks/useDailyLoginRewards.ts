import { useState, useEffect, useCallback } from 'react';

export interface DailyReward {
  day: number;
  type: 'xp' | 'freeze' | 'badge' | 'bonus';
  amount: number;
  label: string;
  labelTa: string;
  icon: string;
  claimed: boolean;
}

export interface WeeklyReward {
  week: number;
  type: 'mega_xp' | 'special_badge' | 'freeze_pack' | 'mystery';
  amount: number;
  label: string;
  labelTa: string;
  icon: string;
  claimed: boolean;
}

export interface LoginRewardsData {
  currentStreak: number;
  longestStreak: number;
  totalLogins: number;
  lastLoginDate: string | null;
  weeklyProgress: number;
  totalXPEarned: number;
  dailyRewards: DailyReward[];
  weeklyRewards: WeeklyReward[];
  claimedDays: string[];
  claimedWeeks: number[];
}

const DAILY_REWARDS_TEMPLATE: Omit<DailyReward, 'claimed'>[] = [
  { day: 1, type: 'xp', amount: 10, label: '10 XP', labelTa: '10 அனுபவம்', icon: '⭐' },
  { day: 2, type: 'xp', amount: 20, label: '20 XP', labelTa: '20 அனுபவம்', icon: '⭐' },
  { day: 3, type: 'xp', amount: 30, label: '30 XP', labelTa: '30 அனுபவம்', icon: '✨' },
  { day: 4, type: 'freeze', amount: 1, label: 'Streak Freeze', labelTa: 'தொடர் உறைநிலை', icon: '🛡️' },
  { day: 5, type: 'xp', amount: 50, label: '50 XP', labelTa: '50 அனுபவம்', icon: '💫' },
  { day: 6, type: 'xp', amount: 75, label: '75 XP', labelTa: '75 அனுபவம்', icon: '🌟' },
  { day: 7, type: 'bonus', amount: 100, label: '100 XP + Badge', labelTa: '100 அனுபவம் + பேட்ஜ்', icon: '🏆' },
];

const WEEKLY_REWARDS_TEMPLATE: Omit<WeeklyReward, 'claimed'>[] = [
  { week: 1, type: 'mega_xp', amount: 200, label: '200 Bonus XP', labelTa: '200 போனஸ் அனுபவம்', icon: '💎' },
  { week: 2, type: 'freeze_pack', amount: 2, label: '2 Streak Freezes', labelTa: '2 தொடர் உறைநிலைகள்', icon: '🛡️🛡️' },
  { week: 3, type: 'special_badge', amount: 1, label: 'Dedicated Learner Badge', labelTa: 'அர்ப்பணிப்பு கற்பவர் பேட்ஜ்', icon: '🎖️' },
  { week: 4, type: 'mystery', amount: 500, label: 'Mystery Box (500 XP)', labelTa: 'மர்ம பெட்டி (500 அனுபவம்)', icon: '🎁' },
];

const STORAGE_KEY = 'govt_daily_login_rewards';

const getDateString = (date: Date = new Date()): string => {
  return date.toISOString().split('T')[0];
};

const getDefaultData = (): LoginRewardsData => ({
  currentStreak: 0,
  longestStreak: 0,
  totalLogins: 0,
  lastLoginDate: null,
  weeklyProgress: 0,
  totalXPEarned: 0,
  dailyRewards: DAILY_REWARDS_TEMPLATE.map(r => ({ ...r, claimed: false })),
  weeklyRewards: WEEKLY_REWARDS_TEMPLATE.map(r => ({ ...r, claimed: false })),
  claimedDays: [],
  claimedWeeks: [],
});

export const useDailyLoginRewards = () => {
  const [data, setData] = useState<LoginRewardsData>(getDefaultData());
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [pendingReward, setPendingReward] = useState<DailyReward | WeeklyReward | null>(null);
  const [isNewDay, setIsNewDay] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as LoginRewardsData;
        const today = getDateString();
        const yesterday = getDateString(new Date(Date.now() - 86400000));
        
        // Check if it's a new day
        if (parsed.lastLoginDate !== today) {
          setIsNewDay(true);
          
          // Check if streak continues or breaks
          if (parsed.lastLoginDate === yesterday) {
            // Streak continues
            const newStreak = parsed.currentStreak + 1;
            const newWeeklyProgress = (parsed.weeklyProgress % 7) + 1;
            
            // Reset daily rewards if completing a new week
            const shouldResetDaily = newWeeklyProgress === 1 && parsed.weeklyProgress === 7;
            
            const updatedData: LoginRewardsData = {
              ...parsed,
              currentStreak: newStreak,
              longestStreak: Math.max(parsed.longestStreak, newStreak),
              totalLogins: parsed.totalLogins + 1,
              lastLoginDate: today,
              weeklyProgress: newWeeklyProgress,
              dailyRewards: shouldResetDaily 
                ? DAILY_REWARDS_TEMPLATE.map(r => ({ ...r, claimed: false }))
                : parsed.dailyRewards,
              claimedDays: [...parsed.claimedDays, today].slice(-60),
            };
            
            setData(updatedData);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
          } else if (parsed.lastLoginDate === null) {
            // First login ever
            const updatedData: LoginRewardsData = {
              ...parsed,
              currentStreak: 1,
              longestStreak: 1,
              totalLogins: 1,
              lastLoginDate: today,
              weeklyProgress: 1,
              claimedDays: [today],
            };
            setData(updatedData);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
          } else {
            // Streak broken
            const updatedData: LoginRewardsData = {
              ...parsed,
              currentStreak: 1,
              totalLogins: parsed.totalLogins + 1,
              lastLoginDate: today,
              weeklyProgress: 1,
              dailyRewards: DAILY_REWARDS_TEMPLATE.map(r => ({ ...r, claimed: false })),
              claimedDays: [...parsed.claimedDays, today].slice(-60),
            };
            setData(updatedData);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
          }
        } else {
          setData(parsed);
        }
      } catch {
        const defaultData = getDefaultData();
        const today = getDateString();
        defaultData.currentStreak = 1;
        defaultData.longestStreak = 1;
        defaultData.totalLogins = 1;
        defaultData.lastLoginDate = today;
        defaultData.weeklyProgress = 1;
        defaultData.claimedDays = [today];
        setData(defaultData);
        setIsNewDay(true);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
      }
    } else {
      const defaultData = getDefaultData();
      const today = getDateString();
      defaultData.currentStreak = 1;
      defaultData.longestStreak = 1;
      defaultData.totalLogins = 1;
      defaultData.lastLoginDate = today;
      defaultData.weeklyProgress = 1;
      defaultData.claimedDays = [today];
      setData(defaultData);
      setIsNewDay(true);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    }
  }, []);

  const claimDailyReward = useCallback((day: number) => {
    if (day > data.weeklyProgress) return null;
    
    const reward = data.dailyRewards.find(r => r.day === day);
    if (!reward || reward.claimed) return null;

    const updatedRewards = data.dailyRewards.map(r => 
      r.day === day ? { ...r, claimed: true } : r
    );

    let xpEarned = 0;
    if (reward.type === 'xp' || reward.type === 'bonus') {
      xpEarned = reward.amount;
    }

    const updatedData: LoginRewardsData = {
      ...data,
      dailyRewards: updatedRewards,
      totalXPEarned: data.totalXPEarned + xpEarned,
    };

    setData(updatedData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    setPendingReward(reward);
    setShowRewardModal(true);

    return reward;
  }, [data]);

  const claimWeeklyReward = useCallback((week: number) => {
    const completedWeeks = Math.floor(data.totalLogins / 7);
    if (week > completedWeeks) return null;
    
    const reward = data.weeklyRewards.find(r => r.week === week);
    if (!reward || reward.claimed) return null;

    const updatedRewards = data.weeklyRewards.map(r => 
      r.week === week ? { ...r, claimed: true } : r
    );

    let xpEarned = 0;
    if (reward.type === 'mega_xp' || reward.type === 'mystery') {
      xpEarned = reward.amount;
    }

    const updatedData: LoginRewardsData = {
      ...data,
      weeklyRewards: updatedRewards,
      claimedWeeks: [...data.claimedWeeks, week],
      totalXPEarned: data.totalXPEarned + xpEarned,
    };

    setData(updatedData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    setPendingReward(reward);
    setShowRewardModal(true);

    return reward;
  }, [data]);

  const closeRewardModal = useCallback(() => {
    setShowRewardModal(false);
    setPendingReward(null);
  }, []);

  const getTodayReward = useCallback((): DailyReward | null => {
    const dayIndex = data.weeklyProgress;
    const reward = data.dailyRewards.find(r => r.day === dayIndex);
    return reward && !reward.claimed ? reward : null;
  }, [data]);

  const getClaimableRewardsCount = useCallback((): number => {
    const unclaimedDaily = data.dailyRewards.filter(
      r => r.day <= data.weeklyProgress && !r.claimed
    ).length;
    
    const completedWeeks = Math.floor(data.totalLogins / 7);
    const unclaimedWeekly = data.weeklyRewards.filter(
      r => r.week <= completedWeeks && !r.claimed
    ).length;

    return unclaimedDaily + unclaimedWeekly;
  }, [data]);

  const getConsecutiveDayBonus = useCallback((): number => {
    // Bonus XP multiplier based on consecutive days
    if (data.currentStreak >= 30) return 3.0;
    if (data.currentStreak >= 14) return 2.0;
    if (data.currentStreak >= 7) return 1.5;
    if (data.currentStreak >= 3) return 1.25;
    return 1.0;
  }, [data.currentStreak]);

  return {
    data,
    showRewardModal,
    pendingReward,
    isNewDay,
    claimDailyReward,
    claimWeeklyReward,
    closeRewardModal,
    getTodayReward,
    getClaimableRewardsCount,
    getConsecutiveDayBonus,
  };
};
