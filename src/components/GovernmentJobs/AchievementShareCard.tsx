import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { 
  Share2, X, Twitter, Facebook, Linkedin, Link2, Copy, 
  Check, Download, Trophy, Flame, Clock, Star, Target,
  Brain, Crown, Zap, BookOpen, TrendingUp, Calendar,
  Medal, Award, GraduationCap
} from 'lucide-react';
import { toast } from 'sonner';

interface Achievement {
  id: string;
  name: string;
  nameTa: string;
  description: string;
  descriptionTa: string;
  icon: string;
  category: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
}

interface StudyStats {
  totalHours: number;
  longestStreak: number;
  mockTestsCompleted: number;
  goalsAchieved: number;
}

interface AchievementShareCardProps {
  achievement: Achievement;
  stats: StudyStats;
  unlockedAt?: string;
  language: 'en' | 'ta';
  isOpen: boolean;
  onClose: () => void;
}

const TIER_CONFIG = {
  bronze: { bg: 'from-amber-600 to-amber-700', gradient: 'from-amber-100 to-orange-100', text: 'text-amber-700', accent: '#D97706' },
  silver: { bg: 'from-gray-400 to-gray-500', gradient: 'from-gray-100 to-slate-100', text: 'text-gray-600', accent: '#6B7280' },
  gold: { bg: 'from-yellow-400 to-amber-500', gradient: 'from-yellow-100 to-amber-100', text: 'text-yellow-700', accent: '#F59E0B' },
  platinum: { bg: 'from-cyan-400 to-blue-500', gradient: 'from-cyan-100 to-blue-100', text: 'text-cyan-700', accent: '#06B6D4' },
  diamond: { bg: 'from-purple-400 to-pink-500', gradient: 'from-purple-100 to-pink-100', text: 'text-purple-700', accent: '#A855F7' },
};

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
  };
  return icons[iconName] || <Award className={className} />;
};

export const AchievementShareCard = ({ 
  achievement, 
  stats, 
  unlockedAt, 
  language, 
  isOpen, 
  onClose 
}: AchievementShareCardProps) => {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const tierConfig = TIER_CONFIG[achievement.tier];

  const shareText = language === 'ta'
    ? `🏆 நான் "${achievement.nameTa}" சாதனையை திறந்தேன்! ${stats.totalHours.toFixed(0)} மணி நேர படிப்பு, ${stats.longestStreak} நாள் தொடர். #JKKNCareer #StudyGoals`
    : `🏆 I unlocked the "${achievement.name}" achievement! ${stats.totalHours.toFixed(0)}h of study, ${stats.longestStreak}-day streak. #JKKNCareer #StudyGoals`;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareText + '\n' + shareUrl);
      setCopied(true);
      toast.success(language === 'ta' ? 'இணைப்பு நகலெடுக்கப்பட்டது!' : 'Link copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(language === 'ta' ? 'நகலெடுக்க முடியவில்லை' : 'Failed to copy');
    }
  };

  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin' | 'whatsapp') => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodeURIComponent(achievement.name)}&summary=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
    toast.success(language === 'ta' ? 'பகிர்வு சாளரம் திறக்கப்பட்டது!' : 'Share window opened!');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: language === 'ta' ? achievement.nameTa : achievement.name,
          text: shareText,
          url: shareUrl,
        });
        toast.success(language === 'ta' ? 'வெற்றிகரமாக பகிரப்பட்டது!' : 'Shared successfully!');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast.error(language === 'ta' ? 'பகிர முடியவில்லை' : 'Failed to share');
        }
      }
    }
  };

  const formattedDate = unlockedAt 
    ? new Date(unlockedAt).toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="p-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              {language === 'ta' ? 'சாதனையை பகிர்' : 'Share Achievement'}
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Shareable Card Preview */}
        <div className="px-4 pb-2">
          <motion.div
            ref={cardRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${tierConfig.gradient} p-5 border-2 shadow-lg`}
            style={{ borderColor: tierConfig.accent }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <div className={`w-full h-full rounded-full bg-gradient-to-br ${tierConfig.bg} blur-2xl`} />
            </div>
            <div className="absolute bottom-0 left-0 w-24 h-24 opacity-10">
              <div className={`w-full h-full rounded-full bg-gradient-to-tr ${tierConfig.bg} blur-xl`} />
            </div>

            {/* Card Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Logo/Brand */}
              <div className="flex items-center gap-1 mb-4">
                <span className="text-xs font-semibold text-gray-600">JKKN</span>
                <span className="text-xs text-gray-400">AI Career Hub</span>
              </div>

              {/* Achievement Icon */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br ${tierConfig.bg} text-white shadow-xl mb-4`}
              >
                {getIcon(achievement.icon, 'h-10 w-10')}
              </motion.div>

              {/* Achievement Name */}
              <h3 className={`text-xl font-bold ${tierConfig.text} mb-1`}>
                {language === 'ta' ? achievement.nameTa : achievement.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {language === 'ta' ? achievement.descriptionTa : achievement.description}
              </p>

              {/* Tier Badge */}
              <Badge 
                className={`mb-4 text-white bg-gradient-to-r ${tierConfig.bg}`}
              >
                {achievement.tier.toUpperCase()} {language === 'ta' ? 'நிலை' : 'TIER'}
              </Badge>

              {/* Stats Row */}
              <div className="flex items-center justify-center gap-4 py-3 px-4 bg-white/60 rounded-xl w-full mb-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-800">{stats.totalHours.toFixed(0)}h</div>
                  <div className="text-[10px] text-gray-500">{language === 'ta' ? 'படிப்பு' : 'Study'}</div>
                </div>
                <div className="w-px h-8 bg-gray-300" />
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-800">{stats.longestStreak}</div>
                  <div className="text-[10px] text-gray-500">{language === 'ta' ? 'தொடர்' : 'Streak'}</div>
                </div>
                <div className="w-px h-8 bg-gray-300" />
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-800">{stats.mockTestsCompleted}</div>
                  <div className="text-[10px] text-gray-500">{language === 'ta' ? 'தேர்வுகள்' : 'Tests'}</div>
                </div>
              </div>

              {/* Unlocked Date */}
              {formattedDate && (
                <p className="text-xs text-gray-500">
                  {language === 'ta' ? 'திறக்கப்பட்டது: ' : 'Unlocked: '}
                  {formattedDate}
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Share Options */}
        <div className="p-4 bg-gray-50 border-t space-y-4">
          {/* Social Media Buttons */}
          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="outline"
              className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2] hover:text-[#1DA1F2]"
              onClick={() => handleShare('twitter')}
            >
              <Twitter className="h-5 w-5" />
              <span className="text-[10px]">Twitter</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-[#1877F2]/10 hover:border-[#1877F2] hover:text-[#1877F2]"
              onClick={() => handleShare('facebook')}
            >
              <Facebook className="h-5 w-5" />
              <span className="text-[10px]">Facebook</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-[#0A66C2]/10 hover:border-[#0A66C2] hover:text-[#0A66C2]"
              onClick={() => handleShare('linkedin')}
            >
              <Linkedin className="h-5 w-5" />
              <span className="text-[10px]">LinkedIn</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-[#25D366]/10 hover:border-[#25D366] hover:text-[#25D366]"
              onClick={() => handleShare('whatsapp')}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="text-[10px]">WhatsApp</span>
            </Button>
          </div>

          {/* Copy Link Section */}
          <div className="flex gap-2">
            <Input 
              value={shareText.substring(0, 50) + '...'} 
              readOnly 
              className="text-sm bg-white"
            />
            <Button
              variant="outline"
              className="shrink-0 gap-2"
              onClick={handleCopyLink}
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              {copied 
                ? (language === 'ta' ? 'நகலெடுக்கப்பட்டது' : 'Copied') 
                : (language === 'ta' ? 'நகலெடு' : 'Copy')
              }
            </Button>
          </div>

          {/* Native Share (if available) */}
          {typeof navigator !== 'undefined' && navigator.share && (
            <Button 
              className="w-full gap-2" 
              onClick={handleNativeShare}
            >
              <Share2 className="h-4 w-4" />
              {language === 'ta' ? 'மேலும் விருப்பங்கள்...' : 'More Options...'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
