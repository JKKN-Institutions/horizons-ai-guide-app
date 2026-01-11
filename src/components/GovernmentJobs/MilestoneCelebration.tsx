import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Crown, Medal, Sparkles, X } from 'lucide-react';

interface MilestoneCelebrationProps {
  milestone: 50 | 75 | 90 | 100 | null;
  language: 'en' | 'ta';
  onClose: () => void;
}

const MILESTONE_CONFIG = {
  50: {
    icon: Medal,
    title: { en: 'Halfway There!', ta: 'பாதி வழி!' },
    subtitle: { en: "You've unlocked 50% of all achievements", ta: 'நீங்கள் 50% சாதனைகளை திறந்துள்ளீர்கள்' },
    message: { en: 'Keep up the great work!', ta: 'சிறந்த வேலையை தொடருங்கள்!' },
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    particles: ['✨', '🎯', '📚'],
  },
  75: {
    icon: Star,
    title: { en: 'Achievement Star!', ta: 'சாதனை நட்சத்திரம்!' },
    subtitle: { en: "You've unlocked 75% of all achievements", ta: 'நீங்கள் 75% சாதனைகளை திறந்துள்ளீர்கள்' },
    message: { en: "You're almost at the top!", ta: 'நீங்கள் கிட்டத்தட்ட உச்சியில் உள்ளீர்கள்!' },
    gradient: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-50 to-orange-50',
    particles: ['⭐', '🌟', '✨'],
  },
  90: {
    icon: Trophy,
    title: { en: 'Elite Achiever!', ta: 'உயரிய சாதனையாளர்!' },
    subtitle: { en: "You've unlocked 90% of all achievements", ta: 'நீங்கள் 90% சாதனைகளை திறந்துள்ளீர்கள்' },
    message: { en: 'The final stretch awaits!', ta: 'இறுதி நேர் காத்திருக்கிறது!' },
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    particles: ['🏆', '👑', '💎'],
  },
  100: {
    icon: Crown,
    title: { en: 'Achievement Master!', ta: 'சாதனை மாஸ்டர்!' },
    subtitle: { en: "You've unlocked ALL achievements!", ta: 'நீங்கள் அனைத்து சாதனைகளையும் திறந்துள்ளீர்கள்!' },
    message: { en: 'You are legendary!', ta: 'நீங்கள் புராணமானவர்!' },
    gradient: 'from-yellow-400 via-amber-500 to-orange-500',
    bgGradient: 'from-yellow-50 via-amber-50 to-orange-50',
    particles: ['👑', '🏆', '💎', '⭐'],
  },
};

export const MilestoneCelebration = ({ milestone, language, onClose }: MilestoneCelebrationProps) => {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (milestone) {
      setShowParticles(true);
      const timer = setTimeout(() => setShowParticles(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [milestone]);

  if (!milestone) return null;

  const config = MILESTONE_CONFIG[milestone];
  const IconComponent = config.icon;

  return (
    <Dialog open={!!milestone} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-sm p-0 overflow-hidden border-0 bg-transparent shadow-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`relative rounded-2xl bg-gradient-to-br ${config.bgGradient} p-6 border shadow-xl overflow-hidden`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors z-20"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>

          {/* Floating particles */}
          <AnimatePresence>
            {showParticles && (
              <>
                {config.particles.map((particle, i) => (
                  <motion.span
                    key={i}
                    initial={{ 
                      opacity: 0, 
                      y: 50, 
                      x: (i - 1) * 40,
                      scale: 0 
                    }}
                    animate={{ 
                      opacity: [0, 1, 1, 0], 
                      y: [-20, -60, -100],
                      scale: [0, 1.2, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.2,
                      ease: 'easeOut'
                    }}
                    className="absolute left-1/2 top-1/2 text-2xl pointer-events-none"
                  >
                    {particle}
                  </motion.span>
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Decorative rings */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full border-4 border-white/20 opacity-50" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full border-4 border-white/20 opacity-30" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Icon with glow effect */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="relative mb-4"
            >
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${config.gradient} blur-xl opacity-40 scale-150`} />
              <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}>
                <IconComponent className="h-10 w-10 text-white" />
              </div>
            </motion.div>

            {/* Milestone badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${config.gradient} text-white text-sm font-semibold mb-3 shadow-md`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {milestone}% {language === 'ta' ? 'மைல்கல்' : 'Milestone'}
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl font-bold text-gray-800 mb-1"
            >
              {config.title[language]}
            </motion.h3>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-600 mb-2"
            >
              {config.subtitle[language]}
            </motion.p>

            {/* Message */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs text-gray-500 italic mb-4"
            >
              {config.message[language]}
            </motion.p>

            {/* Progress visualization */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="w-full h-2 bg-white/60 rounded-full overflow-hidden mb-4"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${milestone}%` }}
                transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
                className={`h-full bg-gradient-to-r ${config.gradient} rounded-full`}
              />
            </motion.div>

            {/* Continue button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                onClick={onClose}
                className={`bg-gradient-to-r ${config.gradient} text-white hover:opacity-90 transition-opacity`}
              >
                {language === 'ta' ? 'தொடர்க' : 'Continue'}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
