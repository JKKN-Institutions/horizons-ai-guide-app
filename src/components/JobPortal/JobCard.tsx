import { Job } from '@/types/jobPortal';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, Banknote, GraduationCap, Phone, MessageCircle, 
  Calendar, Clock, Star, Briefcase, Users, Building2, Heart
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from '@/hooks/useLanguage';

interface JobCardProps {
  job: Job;
  isSaved?: boolean;
  onSave?: () => void;
  onUnsave?: () => void;
  onCall?: () => void;
  onWhatsApp?: () => void;
  onClick?: () => void;
}

export const JobCard = ({ job, isSaved, onSave, onUnsave, onCall, onWhatsApp, onClick }: JobCardProps) => {
  const { t, language } = useLanguage();

  const formatSalary = (min: number | null, max: number | null, type: string) => {
    if (!min && !max) return language === 'ta' ? 'வெளிப்படுத்தவில்லை' : 'Not disclosed';
    const formatNum = (n: number) => n >= 100000 ? `₹${(n/100000).toFixed(1)}L` : `₹${n.toLocaleString('en-IN')}`;
    const suffix = type === 'yearly' ? t('jobportal.perYear') : type === 'daily' ? t('jobportal.perDay') : t('jobportal.perMonth');
    if (min && max) return `${formatNum(min)} - ${formatNum(max)}${suffix}`;
    if (min) return `${formatNum(min)}+${suffix}`;
    return `${formatNum(max!)} ${language === 'ta' ? 'வரை' : 'Up to'}${suffix}`;
  };

  const formatExperience = (min: number, max: number | null) => {
    if (min === 0 && !max) return t('jobportal.fresher');
    if (min === 0 && max) return `0-${max} ${t('jobportal.years')}`;
    if (min && max) return `${min}-${max} ${t('jobportal.years')}`;
    return `${min}+ ${t('jobportal.years')}`;
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${job.phone_primary}`;
    onCall?.();
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const phone = job.whatsapp_number || job.phone_primary;
    const message = `Hi, I'm interested in the ${job.title} position at ${job.company_name}.`;
    window.open(`https://wa.me/91${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    onWhatsApp?.();
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    isSaved ? onUnsave?.() : onSave?.();
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4"
      style={{ borderLeftColor: job.is_featured ? '#f59e0b' : '#e5e7eb' }}
      onClick={onClick}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground line-clamp-1">{job.title}</h3>
              {job.is_featured && (
                <Badge className="bg-amber-500 text-white text-[10px] px-1.5">
                  <Star className="w-3 h-3 mr-0.5" />
                  {t('jobportal.featured')}
                </Badge>
              )}
            </div>
            <p className="text-sm text-primary font-medium flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              {job.company_name}
            </p>
          </div>
          <button 
            onClick={handleSaveToggle}
            className={`p-2 rounded-full transition-colors ${isSaved ? 'text-red-500 bg-red-50' : 'text-muted-foreground hover:bg-muted'}`}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick Info */}
        <div className="space-y-2 text-sm mb-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{job.city}, {job.state}</span>
          </div>
          <div className="flex items-center gap-2 text-primary font-medium">
            <Banknote className="w-4 h-4 flex-shrink-0" />
            <span>{formatSalary(job.salary_min, job.salary_max, job.salary_type)}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Briefcase className="w-4 h-4" />
              <span>{formatExperience(job.experience_min, job.experience_max)}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <GraduationCap className="w-4 h-4" />
              <span className="line-clamp-1">{job.qualification || (language === 'ta' ? 'ஏதேனும்' : 'Any')}</span>
            </div>
          </div>
        </div>

        {/* Walk-in Badge */}
        {job.is_walkin && job.interview_start_date && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-2 mb-3">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              {t('jobportal.walkin')}: {new Date(job.interview_start_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              {job.interview_end_date && job.interview_end_date !== job.interview_start_date && 
                ` - ${new Date(job.interview_end_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`
              }
            </div>
            {job.interview_start_time && (
              <div className="flex items-center gap-1 text-green-600 dark:text-green-500 text-xs mt-1">
                <Clock className="w-3 h-3" />
                {job.interview_start_time.slice(0, 5)} - {job.interview_end_time?.slice(0, 5)}
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge variant="outline" className="text-xs">
            {job.job_type.replace('-', ' ')}
          </Badge>
          {job.vacancies > 1 && (
            <Badge variant="secondary" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              {job.vacancies} {language === 'ta' ? 'இடங்கள்' : 'openings'}
            </Badge>
          )}
        </div>

        {/* Contact Buttons */}
        <div className="flex gap-2 pt-3 border-t">
          <Button 
            onClick={handleCall}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-11"
          >
            <Phone className="w-4 h-4 mr-2" />
            {t('jobportal.callNow')}
          </Button>
          <Button 
            onClick={handleWhatsApp}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white h-11"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {t('jobportal.whatsapp')}
          </Button>
        </div>

        {/* Posted time */}
        <p className="text-xs text-muted-foreground text-center mt-2">
          {t('jobportal.postedAgo')} {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
        </p>
      </CardContent>
    </Card>
  );
};
