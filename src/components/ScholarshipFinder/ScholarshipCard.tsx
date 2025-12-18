import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Scholarship } from './types';
import { useTracker } from './ApplicationTracker';
import { Star, Building2, Landmark, Heart, Calendar, CheckCircle2, ExternalLink, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  onViewDetails: (scholarship: Scholarship) => void;
  isSelected?: boolean;
  onSelectChange?: (selected: boolean) => void;
  showCompareCheckbox?: boolean;
}

const typeConfig = {
  jkkn: {
    icon: Star,
    label: 'JKKN Exclusive',
    color: 'text-[#2E7D32]',
    bgColor: 'bg-[#E8F5E9]',
    borderColor: 'border-l-[#2E7D32]',
    badgeClass: 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]'
  },
  government: {
    icon: Landmark,
    label: 'Government',
    color: 'text-[#1976D2]',
    bgColor: 'bg-[#E3F2FD]',
    borderColor: 'border-l-[#1976D2]',
    badgeClass: 'bg-[#E3F2FD] text-[#1976D2] border-[#90CAF9]'
  },
  corporate: {
    icon: Building2,
    label: 'Corporate',
    color: 'text-[#7B1FA2]',
    bgColor: 'bg-[#F3E5F5]',
    borderColor: 'border-l-[#7B1FA2]',
    badgeClass: 'bg-[#F3E5F5] text-[#7B1FA2] border-[#CE93D8]'
  },
  ngo: {
    icon: Heart,
    label: 'NGO/Trust',
    color: 'text-[#F59E0B]',
    bgColor: 'bg-[#FFF8E1]',
    borderColor: 'border-l-[#F59E0B]',
    badgeClass: 'bg-[#FFF8E1] text-[#F59E0B] border-[#FFE082]'
  }
};

const deadlineConfig = {
  'closing-soon': { label: 'Closing Soon', color: 'bg-red-100 text-red-700', icon: '🔴' },
  'one-month': { label: '1 Month Left', color: 'bg-yellow-100 text-yellow-700', icon: '🟡' },
  'open': { label: 'Open', color: 'bg-green-100 text-green-700', icon: '🟢' },
  'coming-soon': { label: 'Coming Soon', color: 'bg-gray-100 text-gray-600', icon: '⚪' },
  'always-open': { label: 'Always Open', color: 'bg-green-100 text-green-700', icon: '🟢' }
};

export const ScholarshipCard = ({ 
  scholarship, 
  onViewDetails,
  isSelected = false,
  onSelectChange,
  showCompareCheckbox = false
}: ScholarshipCardProps) => {
  const config = typeConfig[scholarship.type];
  const deadlineInfo = deadlineConfig[scholarship.deadlineStatus];
  const Icon = config.icon;
  const tracker = useTracker();
  const isTracked = tracker?.isScholarshipTracked(scholarship.id) || false;

  return (
    <Card className={cn(
      "border-l-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white",
      config.borderColor,
      isSelected && "ring-2 ring-[#2E7D32]"
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {showCompareCheckbox && (
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked) => onSelectChange?.(checked as boolean)}
                className="mt-0.5"
              />
            )}
            <Badge variant="outline" className={cn("text-xs font-medium", config.badgeClass)}>
              <Icon className="h-3 w-3 mr-1" />
              {config.label}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn("text-xs", deadlineInfo.color)}>
              {deadlineInfo.icon} {deadlineInfo.label}
            </Badge>
            {tracker && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7",
                  isTracked ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
                onClick={() => !isTracked && tracker.saveScholarship(scholarship)}
                disabled={isTracked}
              >
                {isTracked ? (
                  <BookmarkCheck className="h-4 w-4" />
                ) : (
                  <BookmarkPlus className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>
        
        <h3 className="font-semibold text-lg mt-3 text-[#1F2937] leading-tight">
          {scholarship.name}
        </h3>
        <p className="text-sm text-[#6B7280]">{scholarship.provider}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Amount */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <span className="font-bold text-lg text-[#2E7D32]">{scholarship.amount}</span>
        </div>

        {/* Eligibility */}
        <div className="space-y-2">
          {scholarship.eligibility.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-[#2E7D32] flex-shrink-0" />
              <span className="text-[#4B5563]">{item}</span>
            </div>
          ))}
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-2 text-sm text-[#6B7280]">
          <Calendar className="h-4 w-4" />
          <span>Deadline: {scholarship.deadline}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9]"
            onClick={() => onViewDetails(scholarship)}
          >
            View Details
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B8860B] text-white"
            onClick={() => window.open(scholarship.applicationUrl, '_blank')}
          >
            Apply <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
