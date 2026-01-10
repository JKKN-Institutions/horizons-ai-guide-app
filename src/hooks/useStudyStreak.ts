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
});

export const useStudyStreak = () => {
  const [data, setData] = useState<StudyStreakData>(getDefaultData());
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Check and update streak based on current date
        const updatedData = validateStreak(parsed);
        setData(updatedData);
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

  // Validate and potentially reset streak if a day was missed
  const validateStreak = (storedData: StudyStreakData): StudyStreakData => {
    if (!storedData.lastPracticeDate) return storedData;

    const today = getDateString(new Date());
    const lastPractice = storedData.lastPracticeDate;

    if (lastPractice === today) {
      // Already practiced today
      return storedData;
    }

    const yesterday = getDateString(new Date(Date.now() - 24 * 60 * 60 * 1000));

    if (lastPractice === yesterday) {
      // Practiced yesterday, streak is still valid
      return storedData;
    }

    // Streak broken - reset current streak but keep best streak
    return {
      ...storedData,
      currentStreak: 0,
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
