import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Trophy, Star, Flame, Clock, Target, BookOpen, Award,
  Zap, Crown, Medal, Sparkles, Gift, CheckCircle2, ChevronRight,
  Brain, GraduationCap, Calendar, TrendingUp, Lock, Package
} from 'lucide-react';
import { toast } from 'sonner';

const COLLECTIONS_KEY = 'govt_achievement_collections';

interface AchievementCollection {
  id: string;
  name: string;
  nameTa: string;
  description: string;
  descriptionTa: string;
  icon: string;
  achievementIds: string[];
  bonusReward: {
    type: 'badge' | 'title' | 'points';
    value: string;
    valueTa: string;
    points: number;
  };
  gradient: string;
  borderColor: string;
}

interface AchievementCollectionsProps {
  language: 'en' | 'ta';
  unlockedAchievementIds: string[];
}

const COLLECTIONS: AchievementCollection[] = [
  {
    id: 'time_master',
    name: 'Time Master Collection',
    nameTa: 'நேர மாஸ்டர் தொகுப்பு',
    description: 'Complete all study hour achievements',
    descriptionTa: 'அனைத்து படிப்பு மணி நேர சாதனைகளை முடிக்கவும்',
    icon: 'clock',
    achievementIds: ['first_hour', 'study_5h', 'study_10h', 'study_25h', 'study_50h', 'study_100h', 'study_200h'],
    bonusReward: { type: 'title', value: '⏰ Time Lord', valueTa: '⏰ நேர இறைவன்', points: 500 },
    gradient: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-300',
  },
  {
    id: 'streak_champion',
    name: 'Streak Champion Collection',
    nameTa: 'தொடர் சாம்பியன் தொகுப்பு',
    description: 'Complete all streak achievements',
    descriptionTa: 'அனைத்து தொடர் சாதனைகளை முடிக்கவும்',
    icon: 'flame',
    achievementIds: ['streak_3', 'streak_7', 'streak_14', 'streak_30', 'streak_60'],
    bonusReward: { type: 'title', value: '🔥 Streak Legend', valueTa: '🔥 தொடர் புராணம்', points: 400 },
    gradient: 'from-orange-500 to-red-600',
    borderColor: 'border-orange-300',
  },
  {
    id: 'test_warrior',
    name: 'Test Warrior Collection',
    nameTa: 'தேர்வு போர்வீரர் தொகுப்பு',
    description: 'Complete all mock test achievements',
    descriptionTa: 'அனைத்து போலி தேர்வு சாதனைகளை முடிக்கவும்',
    icon: 'brain',
    achievementIds: ['test_1', 'test_5', 'test_10', 'test_25', 'perfect_1', 'perfect_5'],
    bonusReward: { type: 'title', value: '🧠 Test Genius', valueTa: '🧠 தேர்வு மேதை', points: 450 },
    gradient: 'from-purple-500 to-pink-600',
    borderColor: 'border-purple-300',
  },
  {
    id: 'goal_crusher',
    name: 'Goal Crusher Collection',
    nameTa: 'இலக்கு நொறுக்கி தொகுப்பு',
    description: 'Complete all goal achievements',
    descriptionTa: 'அனைத்து இலக்கு சாதனைகளை முடிக்கவும்',
    icon: 'target',
    achievementIds: ['goal_1', 'goal_4', 'goal_12', 'goal_streak_4'],
    bonusReward: { type: 'title', value: '🎯 Goal Master', valueTa: '🎯 இலக்கு மாஸ்டர்', points: 300 },
    gradient: 'from-green-500 to-emerald-600',
    borderColor: 'border-green-300',
  },
  {
    id: 'special_elite',
    name: 'Elite Scholar Collection',
    nameTa: 'உயர் மாணவர் தொகுப்பு',
    description: 'Complete all special achievements',
    descriptionTa: 'அனைத்து சிறப்பு சாதனைகளை முடிக்கவும்',
    icon: 'star',
    achievementIds: ['active_7', 'active_30', 'questions_100', 'questions_500'],
    bonusReward: { type: 'title', value: '⭐ Elite Scholar', valueTa: '⭐ உயர் மாணவர்', points: 350 },
    gradient: 'from-amber-500 to-yellow-600',
    borderColor: 'border-amber-300',
  },
  {
    id: 'starter_pack',
    name: 'Starter Pack',
    nameTa: 'தொடக்க பொதி',
    description: 'Unlock one achievement from each category',
    descriptionTa: 'ஒவ்வொரு வகையிலும் ஒரு சாதனையை திறக்கவும்',
    icon: 'gift',
    achievementIds: ['first_hour', 'streak_3', 'test_1', 'goal_1', 'active_7'],
    bonusReward: { type: 'badge', value: '🌟 Rising Star', valueTa: '🌟 உயரும் நட்சத்திரம்', points: 100 },
    gradient: 'from-cyan-500 to-teal-600',
    borderColor: 'border-cyan-300',
  },
];

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
    gift: <Gift className={className} />,
    package: <Package className={className} />,
  };
  return icons[iconName] || <Award className={className} />;
};

export const AchievementCollections = ({ language, unlockedAchievementIds }: AchievementCollectionsProps) => {
  const [completedCollections, setCompletedCollections] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<AchievementCollection | null>(null);
  const [newlyCompleted, setNewlyCompleted] = useState<string | null>(null);

  // Load completed collections
  useEffect(() => {
    try {
      const stored = localStorage.getItem(COLLECTIONS_KEY);
      if (stored) {
        setCompletedCollections(JSON.parse(stored));
      }
    } catch {}
  }, []);

  // Check for newly completed collections
  useEffect(() => {
    const newCompletions: string[] = [];

    COLLECTIONS.forEach(collection => {
      const isComplete = collection.achievementIds.every(id => 
        unlockedAchievementIds.includes(id)
      );
      const wasAlreadyComplete = completedCollections.includes(collection.id);

      if (isComplete && !wasAlreadyComplete) {
        newCompletions.push(collection.id);
      }
    });

    if (newCompletions.length > 0) {
      const updatedCompleted = [...completedCollections, ...newCompletions];
      setCompletedCollections(updatedCompleted);
      localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(updatedCompleted));

      // Show celebration for first new completion
      const firstNew = COLLECTIONS.find(c => c.id === newCompletions[0]);
      if (firstNew) {
        setNewlyCompleted(firstNew.id);
        toast.success(
          language === 'ta'
            ? `🎁 தொகுப்பு முடிந்தது: ${firstNew.nameTa}! +${firstNew.bonusReward.points} புள்ளிகள்`
            : `🎁 Collection Complete: ${firstNew.name}! +${firstNew.bonusReward.points} points`,
          { duration: 5000 }
        );
      }
    }
  }, [unlockedAchievementIds, completedCollections, language]);

  const getCollectionProgress = (collection: AchievementCollection) => {
    const completed = collection.achievementIds.filter(id => 
      unlockedAchievementIds.includes(id)
    ).length;
    return {
      completed,
      total: collection.achievementIds.length,
      percent: (completed / collection.achievementIds.length) * 100,
    };
  };

  const totalBonusPoints = COLLECTIONS
    .filter(c => completedCollections.includes(c.id))
    .reduce((sum, c) => sum + c.bonusReward.points, 0);

  return (
    <>
      <Card className="border border-gray-200 bg-gradient-to-br from-white to-purple-50/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-purple-500" />
              {language === 'ta' ? 'சாதனை தொகுப்புகள்' : 'Achievement Collections'}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-purple-300 text-purple-700">
                {completedCollections.length} / {COLLECTIONS.length}
              </Badge>
              {totalBonusPoints > 0 && (
                <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                  +{totalBonusPoints} {language === 'ta' ? 'புள்ளிகள்' : 'pts'}
                </Badge>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {language === 'ta'
              ? 'தொகுப்புகளை முடித்து போனஸ் வெகுமதிகளைப் பெறுங்கள்'
              : 'Complete collections to earn bonus rewards'}
          </p>
        </CardHeader>

        <CardContent className="space-y-3">
          {COLLECTIONS.map((collection, index) => {
            const progress = getCollectionProgress(collection);
            const isComplete = completedCollections.includes(collection.id);
            const isNew = newlyCompleted === collection.id;

            return (
              <motion.div
                key={collection.id}
                initial={isNew ? { scale: 0.95, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: isNew ? 0.2 : 0 }}
                className={`relative p-3 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
                  isComplete 
                    ? `bg-gradient-to-r ${collection.gradient} bg-opacity-10 ${collection.borderColor}`
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCollection(collection)}
              >
                {isNew && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-[10px] font-semibold rounded-full"
                  >
                    NEW!
                  </motion.div>
                )}

                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isComplete 
                      ? `bg-gradient-to-br ${collection.gradient} text-white shadow-md`
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {isComplete 
                      ? getIcon(collection.icon, 'h-6 w-6')
                      : <Lock className="h-5 w-5" />
                    }
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-medium truncate ${isComplete ? 'text-gray-800' : 'text-gray-600'}`}>
                        {language === 'ta' ? collection.nameTa : collection.name}
                      </h4>
                      <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={progress.percent} 
                        className={`h-1.5 flex-1 ${isComplete ? 'bg-white/30' : 'bg-gray-100'}`}
                      />
                      <span className={`text-xs shrink-0 ${isComplete ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                        {progress.completed}/{progress.total}
                      </span>
                    </div>

                    {/* Reward preview */}
                    {isComplete ? (
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        <span className="text-[10px] text-gray-600">
                          {language === 'ta' ? collection.bonusReward.valueTa : collection.bonusReward.value}
                        </span>
                      </div>
                    ) : (
                      <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                        <Gift className="h-3 w-3" />
                        {language === 'ta' ? 'வெகுமதி:' : 'Reward:'} +{collection.bonusReward.points} {language === 'ta' ? 'புள்ளிகள்' : 'pts'}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>

      {/* Collection Detail Modal */}
      <Dialog open={!!selectedCollection} onOpenChange={() => setSelectedCollection(null)}>
        <DialogContent className="max-w-md">
          {selectedCollection && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${selectedCollection.gradient} text-white`}>
                    {getIcon(selectedCollection.icon, 'h-4 w-4')}
                  </div>
                  {language === 'ta' ? selectedCollection.nameTa : selectedCollection.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {language === 'ta' ? selectedCollection.descriptionTa : selectedCollection.description}
                </p>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{language === 'ta' ? 'முன்னேற்றம்' : 'Progress'}</span>
                    <span className="font-medium">
                      {getCollectionProgress(selectedCollection).completed} / {getCollectionProgress(selectedCollection).total}
                    </span>
                  </div>
                  <Progress 
                    value={getCollectionProgress(selectedCollection).percent} 
                    className="h-2"
                  />
                </div>

                {/* Achievement List */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">
                    {language === 'ta' ? 'தேவையான சாதனைகள்' : 'Required Achievements'}
                  </h4>
                  <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                    {selectedCollection.achievementIds.map(id => {
                      const isUnlocked = unlockedAchievementIds.includes(id);
                      return (
                        <div 
                          key={id}
                          className={`flex items-center gap-2 p-2 rounded-lg ${
                            isUnlocked ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                          }`}
                        >
                          {isUnlocked ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                          ) : (
                            <Lock className="h-4 w-4 text-gray-400 shrink-0" />
                          )}
                          <span className={`text-sm ${isUnlocked ? 'text-green-700' : 'text-gray-500'}`}>
                            {id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reward Section */}
                <div className={`p-4 rounded-xl bg-gradient-to-r ${selectedCollection.gradient} text-white`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="h-5 w-5" />
                    <span className="font-medium">
                      {language === 'ta' ? 'போனஸ் வெகுமதி' : 'Bonus Reward'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold">
                        {language === 'ta' ? selectedCollection.bonusReward.valueTa : selectedCollection.bonusReward.value}
                      </p>
                      <p className="text-sm opacity-80">
                        +{selectedCollection.bonusReward.points} {language === 'ta' ? 'போனஸ் புள்ளிகள்' : 'bonus points'}
                      </p>
                    </div>
                    {completedCollections.includes(selectedCollection.id) && (
                      <div className="bg-white/20 rounded-full p-2">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Status */}
                {completedCollections.includes(selectedCollection.id) ? (
                  <div className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                    <Sparkles className="h-5 w-5 text-green-600" />
                    <span className="text-green-700 font-medium">
                      {language === 'ta' ? 'தொகுப்பு முடிந்தது!' : 'Collection Complete!'}
                    </span>
                  </div>
                ) : (
                  <p className="text-center text-sm text-muted-foreground">
                    {language === 'ta'
                      ? `வெகுமதியைப் பெற ${getCollectionProgress(selectedCollection).total - getCollectionProgress(selectedCollection).completed} சாதனைகள் தேவை`
                      : `${getCollectionProgress(selectedCollection).total - getCollectionProgress(selectedCollection).completed} more achievements needed for reward`
                    }
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
