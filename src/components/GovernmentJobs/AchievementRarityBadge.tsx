import { motion } from 'framer-motion';
import { Users, Crown, Gem, Star, Sparkles, Circle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Language } from '@/hooks/useLanguage';

interface AchievementRarityBadgeProps {
  unlockPercent: number;
  totalUnlocks: number;
  language: Language;
  compact?: boolean;
}

type RarityTier = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

interface RarityConfig {
  tier: RarityTier;
  label: string;
  labelTa: string;
  icon: React.ReactNode;
  gradient: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
}

const getRarityConfig = (percent: number): RarityConfig => {
  if (percent <= 1) {
    return {
      tier: 'legendary',
      label: 'Legendary',
      labelTa: 'புராணம்',
      icon: <Crown className="h-3 w-3" />,
      gradient: 'from-amber-400 via-yellow-300 to-amber-400',
      textColor: 'text-amber-600',
      bgColor: 'bg-gradient-to-r from-amber-100 to-yellow-100',
      borderColor: 'border-amber-300',
      glowColor: 'shadow-amber-200',
    };
  }
  if (percent <= 5) {
    return {
      tier: 'epic',
      label: 'Epic',
      labelTa: 'காவியம்',
      icon: <Gem className="h-3 w-3" />,
      gradient: 'from-purple-400 via-pink-400 to-purple-400',
      textColor: 'text-purple-600',
      bgColor: 'bg-gradient-to-r from-purple-100 to-pink-100',
      borderColor: 'border-purple-300',
      glowColor: 'shadow-purple-200',
    };
  }
  if (percent <= 15) {
    return {
      tier: 'rare',
      label: 'Rare',
      labelTa: 'அரிது',
      icon: <Star className="h-3 w-3" />,
      gradient: 'from-blue-400 via-cyan-400 to-blue-400',
      textColor: 'text-blue-600',
      bgColor: 'bg-gradient-to-r from-blue-100 to-cyan-100',
      borderColor: 'border-blue-300',
      glowColor: 'shadow-blue-200',
    };
  }
  if (percent <= 35) {
    return {
      tier: 'uncommon',
      label: 'Uncommon',
      labelTa: 'அசாதாரணம்',
      icon: <Sparkles className="h-3 w-3" />,
      gradient: 'from-green-400 via-emerald-400 to-green-400',
      textColor: 'text-green-600',
      bgColor: 'bg-gradient-to-r from-green-100 to-emerald-100',
      borderColor: 'border-green-300',
      glowColor: 'shadow-green-200',
    };
  }
  return {
    tier: 'common',
    label: 'Common',
    labelTa: 'பொதுவான',
    icon: <Circle className="h-3 w-3" />,
    gradient: 'from-gray-300 via-gray-200 to-gray-300',
    textColor: 'text-gray-600',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-300',
    glowColor: 'shadow-gray-200',
  };
};

export const AchievementRarityBadge = ({ 
  unlockPercent, 
  totalUnlocks, 
  language, 
  compact = false 
}: AchievementRarityBadgeProps) => {
  const rarity = getRarityConfig(unlockPercent);
  
  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1 rounded-full border ${rarity.bgColor} ${rarity.borderColor} ${rarity.textColor} ${
        compact ? 'px-1.5 py-0.5' : 'px-2 py-0.5'
      } ${rarity.tier === 'legendary' ? `shadow-sm ${rarity.glowColor}` : ''}`}
    >
      {rarity.tier === 'legendary' && (
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          {rarity.icon}
        </motion.div>
      )}
      {rarity.tier !== 'legendary' && rarity.icon}
      
      {!compact && (
        <span className="text-[9px] font-medium">
          {language === 'ta' ? rarity.labelTa : rarity.label}
        </span>
      )}
      
      <span className="text-[8px] opacity-75">
        {unlockPercent.toFixed(1)}%
      </span>
    </motion.div>
  );

  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 font-medium">
                {rarity.icon}
                <span>{language === 'ta' ? rarity.labelTa : rarity.label}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>
                  {language === 'ta' 
                    ? `${totalUnlocks} பயனர்கள் திறந்துள்ளனர்`
                    : `${totalUnlocks} users unlocked`}
                </span>
              </div>
              <div className="text-muted-foreground">
                {language === 'ta'
                  ? `பயனர்களில் ${unlockPercent.toFixed(1)}%`
                  : `${unlockPercent.toFixed(1)}% of users`}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};

export const getRarityTier = getRarityConfig;
