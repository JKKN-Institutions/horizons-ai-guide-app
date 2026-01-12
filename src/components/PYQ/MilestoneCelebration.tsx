import React, { useEffect, useState, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Sparkles, Rocket, Crown, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface MilestoneCelebrationProps {
  milestone: 25 | 50 | 75 | 100 | null;
  language: 'en' | 'ta';
  onClose: () => void;
}

const STORAGE_KEY = 'pyq-milestone-sound-enabled';

const MILESTONE_CONFIG = {
  25: {
    icon: Star,
    title: { en: 'Great Start!', ta: 'சிறந்த தொடக்கம்!' },
    message: { 
      en: "You've completed 25% of your study plan. Keep the momentum going!", 
      ta: 'உங்கள் படிப்புத் திட்டத்தின் 25% முடிந்தது. வேகத்தை தொடருங்கள்!' 
    },
    gradient: 'from-amber-400 to-orange-500',
    bgGradient: 'from-amber-50 to-orange-50',
    confettiColors: ['#f59e0b', '#fb923c', '#fbbf24'],
    soundFrequency: 523.25 // C5
  },
  50: {
    icon: Trophy,
    title: { en: 'Halfway There!', ta: 'பாதி வழி!' },
    message: { 
      en: "Amazing! You've reached the halfway mark. You're doing incredible!", 
      ta: 'அற்புதம்! நீங்கள் பாதி அடையாளத்தை அடைந்துவிட்டீர்கள். நீங்கள் நம்பமுடியாத அளவு செயல்படுகிறீர்கள்!' 
    },
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50',
    confettiColors: ['#3b82f6', '#6366f1', '#8b5cf6'],
    soundFrequency: 659.25 // E5
  },
  75: {
    icon: Rocket,
    title: { en: 'Almost There!', ta: 'கிட்டத்தட்ட முடிந்தது!' },
    message: { 
      en: "75% complete! You're in the final stretch. Push through!", 
      ta: '75% முடிந்தது! நீங்கள் இறுதி நீட்சியில் இருக்கிறீர்கள். தொடருங்கள்!' 
    },
    gradient: 'from-purple-500 to-pink-600',
    bgGradient: 'from-purple-50 to-pink-50',
    confettiColors: ['#a855f7', '#ec4899', '#d946ef'],
    soundFrequency: 783.99 // G5
  },
  100: {
    icon: Crown,
    title: { en: 'Champion!', ta: 'சாம்பியன்!' },
    message: { 
      en: "🎉 You've completed 100% of your study plan! You're ready to conquer!", 
      ta: '🎉 உங்கள் படிப்புத் திட்டத்தின் 100% முடிந்தது! நீங்கள் வெற்றி பெற தயார்!' 
    },
    gradient: 'from-yellow-400 via-amber-500 to-orange-600',
    bgGradient: 'from-yellow-50 via-amber-50 to-orange-50',
    confettiColors: ['#fbbf24', '#f59e0b', '#eab308', '#facc15'],
    soundFrequency: 1046.50 // C6
  }
};

// Web Audio API celebration sound generator
const playCelebrationSound = (milestone: 25 | 50 | 75 | 100) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const config = MILESTONE_CONFIG[milestone];
    const baseFreq = config.soundFrequency;

    // Create a pleasant ascending arpeggio
    const notes = milestone === 100 
      ? [baseFreq, baseFreq * 1.25, baseFreq * 1.5, baseFreq * 2, baseFreq * 2.5] 
      : [baseFreq, baseFreq * 1.25, baseFreq * 1.5];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      const startTime = ctx.currentTime + i * 0.12;
      const duration = milestone === 100 ? 0.4 : 0.25;
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    });

    // Add a subtle shimmer for 100% milestone
    if (milestone === 100) {
      setTimeout(() => {
        const shimmerOsc = ctx.createOscillator();
        const shimmerGain = ctx.createGain();
        shimmerOsc.connect(shimmerGain);
        shimmerGain.connect(ctx.destination);
        shimmerOsc.type = 'triangle';
        shimmerOsc.frequency.value = baseFreq * 3;
        shimmerGain.gain.setValueAtTime(0.08, ctx.currentTime);
        shimmerGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        shimmerOsc.start();
        shimmerOsc.stop(ctx.currentTime + 0.6);
      }, 500);
    }
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
};

export const MilestoneCelebration: React.FC<MilestoneCelebrationProps> = ({
  milestone,
  language,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored !== null ? stored === 'true' : true;
  });

  const handleSoundToggle = useCallback((enabled: boolean) => {
    setSoundEnabled(enabled);
    localStorage.setItem(STORAGE_KEY, String(enabled));
  }, []);

  useEffect(() => {
    if (milestone) {
      setIsVisible(true);
      triggerConfetti(milestone);
      if (soundEnabled) {
        playCelebrationSound(milestone);
      }
    }
  }, [milestone, soundEnabled]);

  const triggerConfetti = (ms: 25 | 50 | 75 | 100) => {
    const config = MILESTONE_CONFIG[ms];
    const duration = ms === 100 ? 4000 : 2500;
    const end = Date.now() + duration;

    const colors = config.confettiColors;

    // Initial burst
    confetti({
      particleCount: ms === 100 ? 150 : 80,
      spread: 70,
      origin: { y: 0.6 },
      colors
    });

    // For 100%, do a continuous celebration
    if (ms === 100) {
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } else {
      // Secondary burst for other milestones
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 100,
          origin: { y: 0.7 },
          colors
        });
      }, 300);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  const replayEffects = useCallback(() => {
    if (milestone) {
      triggerConfetti(milestone);
      if (soundEnabled) {
        playCelebrationSound(milestone);
      }
    }
  }, [milestone, soundEnabled]);

  if (!milestone) return null;

  const config = MILESTONE_CONFIG[milestone];
  const IconComponent = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <Dialog open={isVisible} onOpenChange={handleClose}>
          <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className={`relative bg-gradient-to-br ${config.bgGradient} p-6`}
            >
              {/* Sound Toggle - Top Right */}
              <div className="absolute top-3 right-3 z-10">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-gray-600" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-gray-400" />
                  )}
                  <Switch
                    id="milestone-sound"
                    checked={soundEnabled}
                    onCheckedChange={handleSoundToggle}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-white/15"
                  animate={{ scale: [1.2, 1, 1.2] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                />
              </div>

              {/* Content */}
              <div className="relative text-center space-y-4">
                {/* Icon */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center"
                >
                  <div className={`p-4 rounded-full bg-gradient-to-br ${config.gradient} shadow-lg`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                {/* Percentage */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className={`text-5xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}
                >
                  {milestone}%
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-gray-800"
                >
                  {config.title[language]}
                </motion.h2>

                {/* Message */}
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-600 text-sm leading-relaxed"
                >
                  {config.message[language]}
                </motion.p>

                {/* Progress indicator */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="w-full h-2 bg-white/50 rounded-full overflow-hidden"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${milestone}%` }}
                    transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                    className={`h-full bg-gradient-to-r ${config.gradient} rounded-full`}
                  />
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row gap-2 justify-center pt-2"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={replayEffects}
                    className="text-gray-600"
                  >
                    <Sparkles className="w-4 h-4 mr-1" />
                    {language === 'en' ? 'Replay' : 'மீண்டும்'}
                  </Button>
                  <Button
                    onClick={handleClose}
                    className={`bg-gradient-to-r ${config.gradient} text-white hover:opacity-90 transition-opacity`}
                  >
                    {language === 'en' ? 'Continue Learning' : 'படிப்பைத் தொடர்'}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
