import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'govt_study_streak';

export interface Achievement {
  id: string;
  title: string;
  titleTamil: string;
  description: string;
  descriptionTamil: string;
  icon: string;
  requiredStreak: number;
  unlockedAt?: string;
}

export interface StudyStreakData {
  currentStreak: number;
  bestStreak: number;
  lastPracticeDate: string | null;
  totalDaysPracticed: number;
  achievements: string[]; // IDs of unlocked achievements
  practiceHistory: string[]; // Array of ISO date strings (date only)
  freezesAvailable: number; // Number of streak freezes available
  freezesUsed: string[]; // Dates when freeze was used
  lastFreezeEarned: string | null; // Date when last freeze was earned
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    title: 'First Step',
    titleTamil: 'முதல் அடி',
    description: 'Complete your first practice session',
    descriptionTamil: 'உங்கள் முதல் பயிற்சியை முடிக்கவும்',
    icon: '🌱',
    requiredStreak: 1,
  },
  {
    id: 'getting_started',
    title: 'Getting Started',
    titleTamil: 'தொடக்கம்',
    description: '3-day practice streak',
    descriptionTamil: '3 நாள் தொடர் பயிற்சி',
    icon: '🔥',
    requiredStreak: 3,
  },
  {
    id: 'week_warrior',
    title: 'Week Warrior',
    titleTamil: 'வாரப் போராளி',
    description: '7-day practice streak',
    descriptionTamil: '7 நாள் தொடர் பயிற்சி',
    icon: '⚡',
    requiredStreak: 7,
  },
  {
    id: 'dedicated_learner',
    title: 'Dedicated Learner',
    titleTamil: 'அர்ப்பணிப்பான மாணவர்',
    description: '14-day practice streak',
    descriptionTamil: '14 நாள் தொடர் பயிற்சி',
    icon: '📚',
    requiredStreak: 14,
  },
  {
    id: 'consistent_champion',
    title: 'Consistent Champion',
    titleTamil: 'நிலையான சாம்பியன்',
    description: '21-day practice streak',
    descriptionTamil: '21 நாள் தொடர் பயிற்சி',
    icon: '🏆',
    requiredStreak: 21,
  },
  {
    id: 'month_master',
    title: 'Month Master',
    titleTamil: 'மாத நிபுணர்',
    description: '30-day practice streak',
    descriptionTamil: '30 நாள் தொடர் பயிற்சி',
    icon: '👑',
    requiredStreak: 30,
  },
  {
    id: 'unstoppable',
    title: 'Unstoppable',
    titleTamil: 'நிறுத்த முடியாதவர்',
    description: '60-day practice streak',
    descriptionTamil: '60 நாள் தொடர் பயிற்சி',
    icon: '💎',
    requiredStreak: 60,
  },
  {
    id: 'legendary',
    title: 'Legendary',
    titleTamil: 'புகழ்பெற்றவர்',
    description: '100-day practice streak',
    descriptionTamil: '100 நாள் தொடர் பயிற்சி',
    icon: '🌟',
    requiredStreak: 100,
  },
];

const getDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const getDefaultData = (): StudyStreakData => ({
  currentStreak: 0,
  bestStreak: 0,
  lastPracticeDate: null,
  totalDaysPracticed: 0,
  achievements: [],
  practiceHistory: [],
  freezesAvailable: 1, // Start with 1 free freeze
  freezesUsed: [],
  lastFreezeEarned: null,
});

const MAX_FREEZES = 3; // Maximum freezes a user can stockpile
const FREEZE_EARN_STREAK = 7; // Earn a freeze every 7-day streak

export const useStudyStreak = () => {
  const [data, setData] = useState<StudyStreakData>(getDefaultData());
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [freezeUsedToday, setFreezeUsedToday] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure freeze fields exist for backwards compatibility
        const withFreezeFields = {
          ...getDefaultData(),
          ...parsed,
          freezesAvailable: parsed.freezesAvailable ?? 1,
          freezesUsed: parsed.freezesUsed ?? [],
          lastFreezeEarned: parsed.lastFreezeEarned ?? null,
        };
        // Check and update streak based on current date
        const { data: updatedData, freezeUsed } = validateStreak(withFreezeFields);
        setData(updatedData);
        setFreezeUsedToday(freezeUsed);
        saveToStorage(updatedData);
      }
    } catch (error) {
      console.error('Error loading study streak:', error);
    }
  }, []);

  const saveToStorage = (newData: StudyStreakData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (error) {
      console.error('Error saving study streak:', error);
    }
  };

  // Validate and potentially reset streak if a day was missed (with freeze protection)
  const validateStreak = (storedData: StudyStreakData): { data: StudyStreakData; freezeUsed: boolean } => {
    if (!storedData.lastPracticeDate) return { data: storedData, freezeUsed: false };

    const today = getDateString(new Date());
    const lastPractice = storedData.lastPracticeDate;

    if (lastPractice === today) {
      // Already practiced today
      return { data: storedData, freezeUsed: false };
    }

    const yesterday = getDateString(new Date(Date.now() - 24 * 60 * 60 * 1000));

    if (lastPractice === yesterday) {
      // Practiced yesterday, streak is still valid
      return { data: storedData, freezeUsed: false };
    }

    // Check if we missed exactly one day and can use a freeze
    const twoDaysAgo = getDateString(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000));
    
    if (lastPractice === twoDaysAgo && storedData.freezesAvailable > 0 && !storedData.freezesUsed.includes(yesterday)) {
      // Auto-use freeze to protect the streak
      return {
        data: {
          ...storedData,
          freezesAvailable: storedData.freezesAvailable - 1,
          freezesUsed: [...storedData.freezesUsed, yesterday].slice(-30), // Keep last 30 days
          lastPracticeDate: yesterday, // Pretend we practiced yesterday
        },
        freezeUsed: true,
      };
    }

    // Streak broken - reset current streak but keep best streak
    return {
      data: {
        ...storedData,
        currentStreak: 0,
      },
      freezeUsed: false,
    };
  };

  const recordPractice = useCallback(() => {
    const today = getDateString(new Date());
    
    setData(prev => {
      // Already practiced today
      if (prev.lastPracticeDate === today) {
        return prev;
      }

      const yesterday = getDateString(new Date(Date.now() - 24 * 60 * 60 * 1000));
      const isConsecutive = prev.lastPracticeDate === yesterday || prev.lastPracticeDate === null;

      let newStreak = isConsecutive ? prev.currentStreak + 1 : 1;
      const newBestStreak = Math.max(prev.bestStreak, newStreak);

      // Check if user earned a new freeze (every 7-day streak milestone)
      let newFreezesAvailable = prev.freezesAvailable;
      let newLastFreezeEarned = prev.lastFreezeEarned;
      
      if (newStreak > 0 && newStreak % FREEZE_EARN_STREAK === 0 && newFreezesAvailable < MAX_FREEZES) {
        const streakMilestone = `${newStreak}`;
        if (newLastFreezeEarned !== streakMilestone) {
          newFreezesAvailable = Math.min(MAX_FREEZES, newFreezesAvailable + 1);
          newLastFreezeEarned = streakMilestone;
        }
      }

      // Check for new achievements
      const newlyUnlocked: Achievement[] = [];
      const updatedAchievements = [...prev.achievements];

      ACHIEVEMENTS.forEach(achievement => {
        if (!prev.achievements.includes(achievement.id) && newStreak >= achievement.requiredStreak) {
          updatedAchievements.push(achievement.id);
          newlyUnlocked.push({
            ...achievement,
            unlockedAt: new Date().toISOString(),
          });
        }
      });

      if (newlyUnlocked.length > 0) {
        setNewAchievements(newlyUnlocked);
      }

      const newData: StudyStreakData = {
        currentStreak: newStreak,
        bestStreak: newBestStreak,
        lastPracticeDate: today,
        totalDaysPracticed: prev.practiceHistory.includes(today) 
          ? prev.totalDaysPracticed 
          : prev.totalDaysPracticed + 1,
        achievements: updatedAchievements,
        practiceHistory: prev.practiceHistory.includes(today)
          ? prev.practiceHistory
          : [...prev.practiceHistory, today].slice(-365), // Keep last year
        freezesAvailable: newFreezesAvailable,
        freezesUsed: prev.freezesUsed,
        lastFreezeEarned: newLastFreezeEarned,
      };

      saveToStorage(newData);
      return newData;
    });
  }, []);

  const clearNewAchievements = useCallback(() => {
    setNewAchievements([]);
  }, []);

  const getUnlockedAchievements = useCallback((): Achievement[] => {
    return ACHIEVEMENTS.filter(a => data.achievements.includes(a.id));
  }, [data.achievements]);

  const getNextAchievement = useCallback((): Achievement | null => {
    return ACHIEVEMENTS.find(a => !data.achievements.includes(a.id)) || null;
  }, [data.achievements]);

  const hasPracticedToday = useCallback((): boolean => {
    const today = getDateString(new Date());
    return data.lastPracticeDate === today;
  }, [data.lastPracticeDate]);

  const getWeeklyProgress = useCallback((): boolean[] => {
    const result: boolean[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = getDateString(date);
      result.push(data.practiceHistory.includes(dateStr));
    }
    
    return result;
  }, [data.practiceHistory]);

  const resetStreak = useCallback(() => {
    const newData = getDefaultData();
    setData(newData);
    saveToStorage(newData);
  }, []);

  return {
    ...data,
    freezeUsedToday,
    maxFreezes: MAX_FREEZES,
    freezeEarnStreak: FREEZE_EARN_STREAK,
    recordPractice,
    newAchievements,
    clearNewAchievements,
    getUnlockedAchievements,
    getNextAchievement,
    hasPracticedToday,
    getWeeklyProgress,
    resetStreak,
  };
};
