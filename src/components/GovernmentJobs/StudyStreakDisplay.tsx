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
import { Flame, Trophy, Target, Calendar, Award, Sparkles, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useStudyStreak, ACHIEVEMENTS, Achievement } from '@/hooks/useStudyStreak';

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

// Motivational messages based on streak
const getMotivationalMessage = (streak: number, practicedToday: boolean, language: string): { message: string; icon: string } => {
  if (!practicedToday) {
    const messages = language === 'ta' ? [
      { message: 'இன்று பயிற்சி செய்து உங்கள் தொடரை பாதுகாக்கவும்! 💪', icon: '⏰' },
      { message: 'உங்கள் கனவு வேலை காத்திருக்கிறது - இன்று படிக்கத் தொடங்குங்கள்!', icon: '🎯' },
      { message: 'ஒவ்வொரு நாளும் முக்கியம் - இப்போது தொடங்குங்கள்!', icon: '🚀' },
    ] : [
      { message: "Practice today to protect your streak! 💪", icon: '⏰' },
      { message: "Your dream job awaits - start studying today!", icon: '🎯' },
      { message: "Every day counts - start now!", icon: '🚀' },
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  if (streak === 0) {
    return language === 'ta' 
      ? { message: 'இன்று முதல் நாளாக தொடங்குங்கள்!', icon: '🌱' }
      : { message: "Start your first day today!", icon: '🌱' };
  }

  if (streak >= 100) {
    return language === 'ta'
      ? { message: 'நீங்கள் ஒரு புராணமாகிவிட்டீர்கள்! தொடருங்கள்!', icon: '🌟' }
      : { message: "You're a legend! Keep the momentum!", icon: '🌟' };
  }

  if (streak >= 60) {
    return language === 'ta'
      ? { message: 'நம்பமுடியாத அர்ப்பணிப்பு! நீங்கள் நிறுத்த முடியாதவர்!', icon: '💎' }
      : { message: "Incredible dedication! You're unstoppable!", icon: '💎' };
  }

  if (streak >= 30) {
    return language === 'ta'
      ? { message: 'ஒரு முழு மாதம்! உங்கள் நிலைத்தன்மை தோற்கடிக்க முடியாதது!', icon: '👑' }
      : { message: "A full month! Your consistency is unmatched!", icon: '👑' };
  }

  if (streak >= 21) {
    return language === 'ta'
      ? { message: 'பழக்கம் உருவாகிவிட்டது! வெற்றி நெருங்கிவிட்டது!', icon: '🏆' }
      : { message: "Habit formed! Success is within reach!", icon: '🏆' };
  }

  if (streak >= 14) {
    return language === 'ta'
      ? { message: 'இரண்டு வாரங்கள்! அற்புதமான முன்னேற்றம்!', icon: '📚' }
      : { message: "Two weeks strong! Amazing progress!", icon: '📚' };
  }

  if (streak >= 7) {
    return language === 'ta'
      ? { message: 'ஒரு வாரம் முடிந்தது! நீங்கள் ஒரு போராளி!', icon: '⚡' }
      : { message: "One week done! You're a warrior!", icon: '⚡' };
  }

  if (streak >= 3) {
    return language === 'ta'
      ? { message: 'நல்ல தொடக்கம்! தொடர்ந்து முன்னேறுங்கள்!', icon: '🔥' }
      : { message: "Great start! Keep pushing forward!", icon: '🔥' };
  }

  return language === 'ta'
    ? { message: 'நல்ல வேலை! நாளை மீண்டும் வாருங்கள்!', icon: '✨' }
    : { message: "Good job! Come back tomorrow!", icon: '✨' };
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

  const motivationalMessage = useMemo(() => 
    getMotivationalMessage(currentStreak, practicedToday, language),
    [currentStreak, practicedToday, language]
  );

  const progressToNextAchievement = useMemo(() => {
    if (!nextAchievement) return 100;
    return Math.min(100, (currentStreak / nextAchievement.requiredStreak) * 100);
  }, [currentStreak, nextAchievement]);

  const dayLabels = useMemo(() => {
    const days = language === 'ta' 
      ? ['ஞா', 'தி', 'செ', 'பு', 'வி', 'வெ', 'ச']
      : ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const today = new Date().getDay();
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const dayIndex = (today - i + 7) % 7;
      result.push(days[dayIndex]);
    }
    return result;
  }, [language]);

  const weeklyCompletionCount = weeklyProgress.filter(Boolean).length;

  return (
    <>
      <AchievementUnlockedModal 
        achievements={newAchievements} 
        onClose={clearNewAchievements} 
      />

      <Card className="border border-gray-200 bg-gradient-to-br from-white to-orange-50/30">
        <CardContent className="p-4">
          {/* Motivational Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 p-3 rounded-lg flex items-center gap-3 ${
              practicedToday 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
                : 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200'
            }`}
          >
            <span className="text-2xl">{motivationalMessage.icon}</span>
            <div className="flex-1">
              <p className={`text-sm font-medium ${practicedToday ? 'text-green-700' : 'text-amber-700'}`}>
                {motivationalMessage.message}
              </p>
            </div>
            {practicedToday && (
              <Badge className="bg-green-100 text-green-700 border-green-300">
                ✓ {language === 'ta' ? 'இன்று முடிந்தது' : 'Done Today'}
              </Badge>
            )}
          </motion.div>

          {/* Streak Display */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div 
                className={`p-3 rounded-xl ${currentStreak > 0 ? 'bg-gradient-to-br from-orange-100 to-red-100' : 'bg-gray-100'}`}
                animate={currentStreak > 0 ? { scale: [1, 1.05, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Flame className={`h-6 w-6 ${currentStreak > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
              </motion.div>
              <div>
                <p className="text-sm text-gray-500">
                  {language === 'ta' ? 'தற்போதைய தொடர்' : 'Current Streak'}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-800">{currentStreak}</span>
                  <span className="text-sm font-normal text-gray-500">
                    {language === 'ta' ? 'நாட்கள்' : 'days'}
                  </span>
                  {currentStreak >= 7 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-1"
                    >
                      🔥
                    </motion.span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <TrendingUp className="h-3 w-3 text-purple-500" />
                <p className="text-xs text-gray-400">
                  {language === 'ta' ? 'சிறந்த தொடர்' : 'Best Streak'}
                </p>
              </div>
              <p className="text-xl font-bold text-purple-600">{bestStreak}</p>
            </div>
          </div>

          {/* Weekly Progress with enhanced visual */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">
                {language === 'ta' ? 'இந்த வாரம்' : 'This Week'}
              </p>
              <Badge variant="secondary" className="text-xs">
                {weeklyCompletionCount}/7 {language === 'ta' ? 'நாட்கள்' : 'days'}
              </Badge>
            </div>
            <div className="flex justify-between gap-1.5">
              {weeklyProgress.map((practiced, index) => (
                <motion.div 
                  key={index} 
                  className="flex-1 text-center"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div
                    className={`h-10 rounded-lg flex flex-col items-center justify-center text-xs font-medium transition-all duration-300 ${
                      practiced
                        ? 'bg-gradient-to-b from-green-400 to-green-500 text-white shadow-md shadow-green-200'
                        : index === 6
                          ? 'bg-amber-50 text-amber-600 border-2 border-dashed border-amber-300'
                          : 'bg-gray-50 text-gray-400 border border-gray-100'
                    }`}
                  >
                    {practiced ? '✓' : dayLabels[index]}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Next Achievement Progress */}
          {nextAchievement && (
            <div className="mb-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <motion.span 
                    className="text-xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                  >
                    {nextAchievement.icon}
                  </motion.span>
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      {language === 'ta' ? nextAchievement.titleTamil : nextAchievement.title}
                    </span>
                    <p className="text-xs text-gray-500">
                      {language === 'ta' ? 'அடுத்த சாதனை' : 'Next Achievement'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-amber-600">
                    {currentStreak}/{nextAchievement.requiredStreak}
                  </span>
                  <p className="text-xs text-gray-500">
                    {nextAchievement.requiredStreak - currentStreak} {language === 'ta' ? 'மீதம்' : 'to go'}
                  </p>
                </div>
              </div>
              <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNextAchievement}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                />
              </div>
            </div>
          )}

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-gradient-to-b from-blue-50 to-blue-100/50 rounded-xl border border-blue-100">
              <Calendar className="h-4 w-4 text-blue-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-800">{totalDaysPracticed}</p>
              <p className="text-xs text-gray-500">{language === 'ta' ? 'மொத்த நாட்கள்' : 'Total Days'}</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-b from-amber-50 to-amber-100/50 rounded-xl border border-amber-100">
              <Trophy className="h-4 w-4 text-amber-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-800">{unlockedAchievements.length}/{ACHIEVEMENTS.length}</p>
              <p className="text-xs text-gray-500">{language === 'ta' ? 'சாதனைகள்' : 'Badges'}</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-b from-green-50 to-green-100/50 rounded-xl border border-green-100">
              <Target className="h-4 w-4 text-green-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-800">{practicedToday ? '✓' : '○'}</p>
              <p className="text-xs text-gray-500">{language === 'ta' ? 'இன்று' : 'Today'}</p>
            </div>
          </div>

          {/* Unlocked Badges Preview */}
          {unlockedAchievements.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <p className="text-sm font-medium text-gray-700">
                  {language === 'ta' ? 'சம்பாதித்த பேட்ஜ்கள்' : 'Earned Badges'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {unlockedAchievements.slice(0, 5).map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-200 flex items-center justify-center text-lg shadow-sm cursor-pointer"
                    title={language === 'ta' ? achievement.titleTamil : achievement.title}
                  >
                    {achievement.icon}
                  </motion.div>
                ))}
                {unlockedAchievements.length > 5 && (
                  <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-xs font-medium text-gray-500">
                    +{unlockedAchievements.length - 5}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* View All Achievements */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full gap-2 bg-white hover:bg-gray-50">
                <Award className="h-4 w-4" />
                {language === 'ta' ? 'அனைத்து சாதனைகளும்' : 'View All Badges'}
                <Badge variant="secondary" className="ml-auto text-xs">
                  {unlockedAchievements.length}/{ACHIEVEMENTS.length}
                </Badge>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  {language === 'ta' ? 'சாதனை பேட்ஜ்கள்' : 'Achievement Badges'}
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-80 pr-4">
                <div className="space-y-3">
                  {ACHIEVEMENTS.map((achievement) => {
                    const isUnlocked = unlockedAchievements.some(a => a.id === achievement.id);
                    return (
                      <motion.div
                        key={achievement.id}
                        whileHover={{ scale: 1.01 }}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                          isUnlocked
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm'
                            : 'bg-gray-50 border-gray-100 opacity-60'
                        }`}
                      >
                        <div className={`text-2xl p-2 rounded-full ${
                          isUnlocked 
                            ? 'bg-white shadow-sm' 
                            : 'bg-gray-100 grayscale'
                        }`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-800">
                              {language === 'ta' ? achievement.titleTamil : achievement.title}
                            </h4>
                            {isUnlocked && (
                              <Badge className="text-xs bg-green-100 text-green-700 border-green-200">
                                ✓ {language === 'ta' ? 'திறக்கப்பட்டது' : 'Unlocked'}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            {language === 'ta' ? achievement.descriptionTamil : achievement.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-medium ${isUnlocked ? 'text-green-600' : 'text-gray-400'}`}>
                            {achievement.requiredStreak}
                          </p>
                          <p className="text-xs text-gray-400">
                            {language === 'ta' ? 'நாட்கள்' : 'days'}
                          </p>
                        </div>
                      </motion.div>
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
