import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame, Calendar, Trophy, Star, Zap, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import confetti from 'canvas-confetti';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalActiveDays: number;
  weeklyActivity: boolean[];
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  name: string;
  nameTamil: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  requiredStreak: number;
}

const STORAGE_KEY = 'tn-study-streaks';

const ACHIEVEMENTS: Achievement[] = [
  { id: '3day', name: 'Getting Started', nameTamil: 'தொடக்கம்', description: '3-day streak', icon: '🌱', requiredStreak: 3 },
  { id: '7day', name: 'Week Warrior', nameTamil: 'வார வீரர்', description: '7-day streak', icon: '⚡', requiredStreak: 7 },
  { id: '14day', name: 'Two Week Champion', nameTamil: 'இரண்டு வார சாம்பியன்', description: '14-day streak', icon: '🔥', requiredStreak: 14 },
  { id: '30day', name: 'Monthly Master', nameTamil: 'மாத மாஸ்டர்', description: '30-day streak', icon: '👑', requiredStreak: 30 },
  { id: '60day', name: 'Dedication Legend', nameTamil: 'அர்ப்பணிப்பு பாரம்பரியம்', description: '60-day streak', icon: '💎', requiredStreak: 60 },
  { id: '100day', name: 'Century Hero', nameTamil: 'நூற்றாண்டு வீரர்', description: '100-day streak', icon: '🏆', requiredStreak: 100 },
];

const getDefaultData = (): StreakData => ({
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: '',
  totalActiveDays: 0,
  weeklyActivity: Array(7).fill(false),
  achievements: [],
});

export const StudyStreaks = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<StreakData>(getDefaultData());
  const [showCelebration, setShowCelebration] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as StreakData;
        checkAndUpdateStreak(parsed);
      } catch (e) {
        console.error('Failed to load streak data:', e);
        setData(getDefaultData());
      }
    } else {
      setData(getDefaultData());
    }
  };

  const checkAndUpdateStreak = (existingData: StreakData) => {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = existingData.lastActiveDate;
    
    if (lastActive === today) {
      setData(existingData);
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak = existingData.currentStreak;
    
    if (lastActive === yesterdayStr) {
      // Continuing streak
      newStreak = existingData.currentStreak;
    } else if (lastActive !== today) {
      // Streak broken
      newStreak = 0;
    }

    setData({
      ...existingData,
      currentStreak: newStreak,
      weeklyActivity: updateWeeklyActivity(existingData.weeklyActivity, lastActive),
    });
  };

  const updateWeeklyActivity = (activity: boolean[], lastActive: string): boolean[] => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const newActivity = [...activity];
    
    // Reset old data if week changed
    const lastDate = lastActive ? new Date(lastActive) : null;
    if (lastDate) {
      const daysSinceLast = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysSinceLast >= 7) {
        return Array(7).fill(false);
      }
    }
    
    return newActivity;
  };

  const recordActivity = () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (data.lastActiveDate === today) {
      return; // Already recorded today
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak = 1;
    if (data.lastActiveDate === yesterdayStr) {
      newStreak = data.currentStreak + 1;
    }

    const newLongest = Math.max(data.longestStreak, newStreak);
    const dayOfWeek = new Date().getDay();
    const newWeeklyActivity = [...data.weeklyActivity];
    newWeeklyActivity[dayOfWeek] = true;

    // Check for new achievements
    const newAchievements = [...data.achievements];
    let unlocked: Achievement | null = null;
    
    for (const achievement of ACHIEVEMENTS) {
      if (newStreak >= achievement.requiredStreak && !newAchievements.find(a => a.id === achievement.id)) {
        const unlockedAchievement = { ...achievement, unlockedAt: new Date().toISOString() };
        newAchievements.push(unlockedAchievement);
        unlocked = unlockedAchievement;
      }
    }

    const newData: StreakData = {
      currentStreak: newStreak,
      longestStreak: newLongest,
      lastActiveDate: today,
      totalActiveDays: data.totalActiveDays + 1,
      weeklyActivity: newWeeklyActivity,
      achievements: newAchievements,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    setData(newData);

    // Celebrate
    setShowCelebration(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });

    if (unlocked) {
      setNewAchievement(unlocked);
      setTimeout(() => {
        confetti({ particleCount: 100, spread: 100, origin: { y: 0.5 } });
      }, 500);
    }

    setTimeout(() => {
      setShowCelebration(false);
      setNewAchievement(null);
    }, 3000);
  };

  const isActiveToday = data.lastActiveDate === new Date().toISOString().split('T')[0];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayIndex = new Date().getDay();

  const nextAchievement = ACHIEVEMENTS.find(a => a.requiredStreak > data.currentStreak);
  const progressToNext = nextAchievement 
    ? Math.round((data.currentStreak / nextAchievement.requiredStreak) * 100)
    : 100;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-lg mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <div className="text-center">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <Flame className="h-6 w-6 text-orange-500" />
            Study Streaks
          </h1>
          <p className="text-muted-foreground font-tamil">படிப்பு தொடர்ச்சி</p>
        </div>

        {/* Current Streak */}
        <Card className="rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
          <CardContent className="p-6 text-center">
            <Flame className="h-12 w-12 mx-auto mb-2" />
            <div className="text-5xl font-bold mb-1">{data.currentStreak}</div>
            <p className="text-orange-100">Day Streak</p>
            
            {!isActiveToday && (
              <Button 
                onClick={recordActivity}
                className="mt-4 bg-white text-orange-600 hover:bg-orange-50"
              >
                <Zap className="h-4 w-4 mr-2" />
                Mark Today Complete
              </Button>
            )}
            
            {isActiveToday && (
              <Badge className="mt-4 bg-white/20 text-white">
                ✓ Today's activity recorded!
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Celebration */}
        {showCelebration && (
          <Card className="rounded-2xl border-green-300 bg-green-50 dark:bg-green-900/20">
            <CardContent className="p-4 text-center">
              <p className="text-green-700 dark:text-green-300 font-semibold">
                🎉 Great job! Keep it up!
              </p>
              {newAchievement && (
                <div className="mt-2">
                  <span className="text-2xl">{newAchievement.icon}</span>
                  <p className="font-bold text-green-800 dark:text-green-200">
                    Achievement Unlocked: {newAchievement.name}!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="rounded-xl">
            <CardContent className="p-4 text-center">
              <Trophy className="h-5 w-5 mx-auto text-amber-500 mb-1" />
              <div className="text-xl font-bold">{data.longestStreak}</div>
              <p className="text-xs text-muted-foreground">Longest Streak</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl">
            <CardContent className="p-4 text-center">
              <Calendar className="h-5 w-5 mx-auto text-blue-500 mb-1" />
              <div className="text-xl font-bold">{data.totalActiveDays}</div>
              <p className="text-xs text-muted-foreground">Total Active Days</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Activity */}
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              This Week
            </h3>
            <div className="flex justify-between">
              {daysOfWeek.map((day, idx) => (
                <div key={day} className="text-center">
                  <p className={`text-xs mb-1 ${idx === todayIndex ? 'font-bold text-[#6a0dad]' : 'text-muted-foreground'}`}>
                    {day}
                  </p>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    data.weeklyActivity[idx] 
                      ? 'bg-green-500 text-white' 
                      : idx === todayIndex
                        ? 'border-2 border-dashed border-[#6a0dad]'
                        : 'bg-muted'
                  }`}>
                    {data.weeklyActivity[idx] ? '✓' : ''}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Achievement */}
        {nextAchievement && (
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Gift className="h-4 w-4 text-[#6a0dad]" />
                Next Achievement
              </h3>
              <div className="flex items-center gap-4">
                <div className="text-3xl">{nextAchievement.icon}</div>
                <div className="flex-1">
                  <p className="font-medium">{nextAchievement.name}</p>
                  <p className="text-xs text-muted-foreground">{nextAchievement.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={progressToNext} className="flex-1 h-2" />
                    <span className="text-xs font-medium">{data.currentStreak}/{nextAchievement.requiredStreak}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Achievements */}
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500" />
              Achievements
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {ACHIEVEMENTS.map((achievement) => {
                const unlocked = data.achievements.find(a => a.id === achievement.id);
                return (
                  <div
                    key={achievement.id}
                    className={`text-center p-3 rounded-xl ${
                      unlocked 
                        ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800' 
                        : 'bg-muted opacity-50'
                    }`}
                  >
                    <div className={`text-2xl ${unlocked ? '' : 'grayscale'}`}>{achievement.icon}</div>
                    <p className="text-xs font-medium mt-1">{achievement.name}</p>
                    <p className="text-[10px] text-muted-foreground">{achievement.requiredStreak} days</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
