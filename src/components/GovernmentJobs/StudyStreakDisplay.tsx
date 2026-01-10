import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Flame, Trophy, Target, Calendar, Award, X } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useStudyStreak, ACHIEVEMENTS, Achievement } from '@/hooks/useStudyStreak';
import { format } from 'date-fns';

interface AchievementUnlockedModalProps {
  achievements: Achievement[];
  onClose: () => void;
}

const AchievementUnlockedModal = ({ achievements, onClose }: AchievementUnlockedModalProps) => {
  const { language } = useLanguage();

  if (achievements.length === 0) return null;

  return (
    <Dialog open={achievements.length > 0} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {language === 'ta' ? '🎉 சாதனை திறக்கப்பட்டது!' : '🎉 Achievement Unlocked!'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="text-5xl mb-3">{achievement.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {language === 'ta' ? achievement.titleTamil : achievement.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {language === 'ta' ? achievement.descriptionTamil : achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
        <Button onClick={onClose} className="w-full">
          {language === 'ta' ? 'தொடரவும்' : 'Continue'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export const StudyStreakDisplay = () => {
  const { language } = useLanguage();
  const {
    currentStreak,
    bestStreak,
    totalDaysPracticed,
    newAchievements,
    clearNewAchievements,
    getUnlockedAchievements,
    getNextAchievement,
    hasPracticedToday,
    getWeeklyProgress,
  } = useStudyStreak();

  const unlockedAchievements = getUnlockedAchievements();
  const nextAchievement = getNextAchievement();
  const weeklyProgress = getWeeklyProgress();
  const practicedToday = hasPracticedToday();

  const progressToNextAchievement = useMemo(() => {
    if (!nextAchievement) return 100;
    return Math.min(100, (currentStreak / nextAchievement.requiredStreak) * 100);
  }, [currentStreak, nextAchievement]);

  const dayLabels = useMemo(() => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const today = new Date().getDay();
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const dayIndex = (today - i + 7) % 7;
      result.push(days[dayIndex]);
    }
    return result;
  }, []);

  return (
    <>
      <AchievementUnlockedModal 
        achievements={newAchievements} 
        onClose={clearNewAchievements} 
      />

      <Card className="border border-gray-200 bg-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${currentStreak > 0 ? 'bg-orange-50' : 'bg-gray-50'}`}>
                <Flame className={`h-5 w-5 ${currentStreak > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {language === 'ta' ? 'தற்போதைய தொடர்' : 'Current Streak'}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {currentStreak} <span className="text-sm font-normal text-gray-500">{language === 'ta' ? 'நாட்கள்' : 'days'}</span>
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400">
                {language === 'ta' ? 'சிறந்த தொடர்' : 'Best'}
              </p>
              <p className="text-lg font-semibold text-gray-600">{bestStreak}</p>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">
              {language === 'ta' ? 'இந்த வாரம்' : 'This Week'}
            </p>
            <div className="flex justify-between gap-1">
              {weeklyProgress.map((practiced, index) => (
                <div key={index} className="flex-1 text-center">
                  <div
                    className={`h-8 rounded-md flex items-center justify-center text-xs font-medium transition-colors ${
                      practiced
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-gray-50 text-gray-400 border border-gray-100'
                    }`}
                  >
                    {practiced ? '✓' : dayLabels[index]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Achievement Progress */}
          {nextAchievement && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{nextAchievement.icon}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'ta' ? nextAchievement.titleTamil : nextAchievement.title}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {currentStreak}/{nextAchievement.requiredStreak}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNextAchievement}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                />
              </div>
            </div>
          )}

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <Calendar className="h-4 w-4 text-blue-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-800">{totalDaysPracticed}</p>
              <p className="text-xs text-gray-500">{language === 'ta' ? 'மொத்த நாட்கள்' : 'Total Days'}</p>
            </div>
            <div className="text-center p-2 bg-amber-50 rounded-lg">
              <Trophy className="h-4 w-4 text-amber-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-800">{unlockedAchievements.length}</p>
              <p className="text-xs text-gray-500">{language === 'ta' ? 'சாதனைகள்' : 'Achievements'}</p>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <Target className="h-4 w-4 text-green-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-800">{practicedToday ? '✓' : '○'}</p>
              <p className="text-xs text-gray-500">{language === 'ta' ? 'இன்று' : 'Today'}</p>
            </div>
          </div>

          {/* View All Achievements */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Award className="h-4 w-4" />
                {language === 'ta' ? 'அனைத்து சாதனைகளும்' : 'All Achievements'}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {language === 'ta' ? 'சாதனைகள்' : 'Achievements'}
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-80 pr-4">
                <div className="space-y-3">
                  {ACHIEVEMENTS.map((achievement) => {
                    const isUnlocked = unlockedAchievements.some(a => a.id === achievement.id);
                    return (
                      <div
                        key={achievement.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                          isUnlocked
                            ? 'bg-white border-green-200'
                            : 'bg-gray-50 border-gray-100 opacity-60'
                        }`}
                      >
                        <div className={`text-2xl ${!isUnlocked && 'grayscale'}`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-800">
                              {language === 'ta' ? achievement.titleTamil : achievement.title}
                            </h4>
                            {isUnlocked && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                ✓
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            {language === 'ta' ? achievement.descriptionTamil : achievement.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400">
                            {achievement.requiredStreak} {language === 'ta' ? 'நாட்கள்' : 'days'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </>
  );
};
