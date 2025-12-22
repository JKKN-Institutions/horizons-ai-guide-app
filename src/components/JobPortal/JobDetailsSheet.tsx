import { Job } from '@/types/jobPortal';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, Banknote, GraduationCap, Phone, MessageCircle, Mail,
  Calendar, Clock, Star, Briefcase, Users, Building2, Heart,
  FileText, CheckCircle, ExternalLink, Share2
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface JobDetailsSheetProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved?: boolean;
  onSave?: () => void;
  onUnsave?: () => void;
  onCall?: () => void;
  onWhatsApp?: () => void;
}

const formatSalary = (min: number | null, max: number | null, type: string) => {
  if (!min && !max) return 'Not disclosed';
  const formatNum = (n: number) => n >= 100000 ? `₹${(n/100000).toFixed(1)}L` : `₹${n.toLocaleString('en-IN')}`;
  const suffix = type === 'yearly' ? '/year' : type === 'daily' ? '/day' : '/month';
  if (min && max) return `${formatNum(min)} - ${formatNum(max)}${suffix}`;
  if (min) return `${formatNum(min)}+${suffix}`;
  return `Up to ${formatNum(max!)}${suffix}`;
};

const formatExperience = (min: number, max: number | null) => {
  if (min === 0 && !max) return 'Fresher';
  if (min === 0 && max) return `0-${max} years`;
  if (min && max) return `${min}-${max} years`;
  return `${min}+ years`;
};

export const JobDetailsSheet = ({ 
  job, isOpen, onClose, isSaved, onSave, onUnsave, onCall, onWhatsApp 
}: JobDetailsSheetProps) => {
  if (!job) return null;

  const handleCall = () => {
    window.location.href = `tel:${job.phone_primary}`;
    onCall?.();
  };

  const handleWhatsApp = () => {
    const phone = job.whatsapp_number || job.phone_primary;
    const message = `Hi, I'm interested in the ${job.title} position at ${job.company_name}.`;
    window.open(`https://wa.me/91${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    onWhatsApp?.();
  };

  const handleShare = async () => {
    const shareData = {
      title: `${job.title} at ${job.company_name}`,
      text: `Check out this job: ${job.title} at ${job.company_name} in ${job.city}`,
      url: window.location.href,
    };
    if (navigator.share) {
      await navigator.share(shareData);
    }
  };

  const openMaps = () => {
    const address = encodeURIComponent(job.full_address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl overflow-hidden p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 border-b bg-card sticky top-0 z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <SheetTitle className="text-lg text-left">{job.title}</SheetTitle>
                  {job.is_featured && (
                    <Badge className="bg-amber-500 text-white text-[10px]">
                      <Star className="w-3 h-3 mr-0.5" />
                      Featured
                    </Badge>
                  )}
                </div>
                <p className="text-primary font-medium flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {job.company_name}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => isSaved ? onUnsave?.() : onSave?.()}
                  className={`p-2 rounded-full ${isSaved ? 'text-red-500 bg-red-50' : 'text-muted-foreground bg-muted'}`}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
                <button onClick={handleShare} className="p-2 rounded-full text-muted-foreground bg-muted">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* Key Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/50 p-3 rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <Banknote className="w-4 h-4" />
                  Salary
                </div>
                <p className="font-semibold text-primary">
                  {formatSalary(job.salary_min, job.salary_max, job.salary_type)}
                </p>
                {job.is_salary_negotiable && (
                  <p className="text-xs text-muted-foreground">Negotiable</p>
                )}
              </div>
              <div className="bg-muted/50 p-3 rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <Briefcase className="w-4 h-4" />
                  Experience
                </div>
                <p className="font-semibold">{formatExperience(job.experience_min, job.experience_max)}</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <GraduationCap className="w-4 h-4" />
                  Qualification
                </div>
                <p className="font-semibold text-sm">{job.qualification || 'Any'}</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <Users className="w-4 h-4" />
                  Vacancies
                </div>
                <p className="font-semibold">{job.vacancies} opening{job.vacancies > 1 ? 's' : ''}</p>
              </div>
            </div>

            {/* Walk-in Details */}
            {job.is_walkin && job.interview_start_date && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Walk-in Interview
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {new Date(job.interview_start_date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                    {job.interview_end_date && job.interview_end_date !== job.interview_start_date && 
                      ` to ${new Date(job.interview_end_date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}`
                    }
                  </p>
                  {job.interview_start_time && (
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {job.interview_start_time.slice(0, 5)} - {job.interview_end_time?.slice(0, 5)}
                    </p>
                  )}
                  {job.interview_venue && (
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      {job.interview_venue}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Location */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </h4>
              <p className="text-sm text-muted-foreground mb-2">{job.full_address}</p>
              <Button variant="outline" size="sm" onClick={openMaps} className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Open in Google Maps
              </Button>
            </div>

            <Separator />

            {/* Job Description */}
            {job.description && (
              <div>
                <h4 className="font-semibold mb-2">Job Description</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{job.description}</p>
              </div>
            )}

            {/* Responsibilities */}
            {job.responsibilities && (
              <div>
                <h4 className="font-semibold mb-2">Responsibilities</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{job.responsibilities}</p>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && (
              <div>
                <h4 className="font-semibold mb-2">Requirements</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{job.requirements}</p>
              </div>
            )}

            {/* Documents Required */}
            {job.documents_required && job.documents_required.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Documents Required
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.documents_required.map((doc, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Benefits</h4>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((benefit, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      ✓ {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-3">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  {job.contact_person}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  {job.phone_primary}
                  {job.phone_secondary && ` / ${job.phone_secondary}`}
                </p>
                {job.email && (
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {job.email}
                  </p>
                )}
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center pt-4">
              Posted {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
            </p>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t bg-card flex gap-3 sticky bottom-0">
            <Button onClick={handleCall} className="flex-1 h-12 bg-primary hover:bg-primary/90">
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
            <Button onClick={handleWhatsApp} className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white">
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
