import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scholarship } from './types';
import { Star, Building2, Landmark, Heart, CheckCircle2, FileText, Calendar, Link as LinkIcon, Phone, BookOpen, ExternalLink, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ScholarshipDetailModalProps {
  scholarship: Scholarship | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const typeConfig = {
  jkkn: { icon: Star, label: 'JKKN Exclusive', color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  government: { icon: Landmark, label: 'Government', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  corporate: { icon: Building2, label: 'Corporate', color: 'text-purple-600', bgColor: 'bg-purple-50' },
  ngo: { icon: Heart, label: 'NGO/Trust', color: 'text-orange-600', bgColor: 'bg-orange-50' }
};

const deadlineConfig = {
  'closing-soon': { label: 'Closing Soon', color: 'text-red-600 bg-red-100', days: '< 7 days left' },
  'one-month': { label: '1 Month Left', color: 'text-yellow-600 bg-yellow-100', days: '< 30 days left' },
  'open': { label: 'Open', color: 'text-green-600 bg-green-100', days: '> 30 days left' },
  'coming-soon': { label: 'Coming Soon', color: 'text-gray-600 bg-gray-100', days: 'Opening soon' },
  'always-open': { label: 'Always Open', color: 'text-green-600 bg-green-100', days: 'No deadline' }
};

export const ScholarshipDetailModal = ({ scholarship, open, onOpenChange }: ScholarshipDetailModalProps) => {
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();

  if (!scholarship) return null;

  const config = typeConfig[scholarship.type];
  const deadlineInfo = deadlineConfig[scholarship.deadlineStatus];
  const Icon = config.icon;

  const handleSave = () => {
    setSaved(!saved);
    toast({
      title: saved ? "Removed from saved" : "Saved for later",
      description: saved ? "Scholarship removed from your list" : "You can find this in your saved scholarships",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className={cn("p-2 rounded-lg", config.bgColor)}>
                <Icon className={cn("h-5 w-5", config.color)} />
              </div>
              <Badge variant="outline" className={config.bgColor}>
                {config.label}
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSave}
              className={saved ? "text-yellow-600" : "text-muted-foreground"}
            >
              <Bookmark className={cn("h-5 w-5", saved && "fill-yellow-600")} />
              {saved ? "Saved" : "Save"}
            </Button>
          </div>
          <DialogTitle className="text-xl mt-4">{scholarship.name}</DialogTitle>
          <p className="text-muted-foreground">{scholarship.provider}</p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Amount Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4">
            <h4 className="font-semibold flex items-center gap-2 mb-3">
              💰 SCHOLARSHIP AMOUNT
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {scholarship.benefits.map((benefit, idx) => (
                <div key={idx} className="flex justify-between items-center py-1 border-b border-border/50 last:border-0">
                  <span className="text-muted-foreground">{benefit.label}</span>
                  <span className="font-semibold">{benefit.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div className="bg-muted/30 rounded-xl p-4">
            <h4 className="font-semibold flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              ELIGIBILITY CRITERIA
            </h4>
            <div className="space-y-2">
              {scholarship.eligibility.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-muted/30 rounded-xl p-4">
            <h4 className="font-semibold flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-blue-500" />
              REQUIRED DOCUMENTS
            </h4>
            <ul className="space-y-1">
              {scholarship.documents.map((doc, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">•</span>
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* Important Dates */}
          <div className="bg-muted/30 rounded-xl p-4">
            <h4 className="font-semibold flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5 text-purple-500" />
              IMPORTANT DATES
            </h4>
            <div className="flex items-center justify-between">
              <span>Application Deadline</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{scholarship.deadline}</span>
                <Badge className={deadlineInfo.color}>{deadlineInfo.days}</Badge>
              </div>
            </div>
          </div>

          {/* How to Apply */}
          <div className="bg-muted/30 rounded-xl p-4">
            <h4 className="font-semibold flex items-center gap-2 mb-3">
              <BookOpen className="h-5 w-5 text-emerald-500" />
              HOW TO APPLY
            </h4>
            <ol className="space-y-2">
              {scholarship.howToApply.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-medium">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              className="flex-1 bg-[#FF6B35] hover:bg-[#FF6B35]/90"
              onClick={() => window.open(scholarship.applicationUrl, '_blank')}
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              Apply on Official Portal
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
            {scholarship.helpline && (
              <Button variant="outline" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Helpline: {scholarship.helpline}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
