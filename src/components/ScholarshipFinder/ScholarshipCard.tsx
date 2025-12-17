import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scholarship } from './types';
import { Star, Building2, Landmark, Heart, Calendar, CheckCircle2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  onViewDetails: (scholarship: Scholarship) => void;
}

const typeConfig = {
  jkkn: {
    icon: Star,
    label: 'JKKN Exclusive',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-l-emerald-500',
    badgeClass: 'bg-emerald-100 text-emerald-700 border-emerald-200'
  },
  government: {
    icon: Landmark,
    label: 'Government',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-l-blue-500',
    badgeClass: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  corporate: {
    icon: Building2,
    label: 'Corporate',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-l-purple-500',
    badgeClass: 'bg-purple-100 text-purple-700 border-purple-200'
  },
  ngo: {
    icon: Heart,
    label: 'NGO/Trust',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-l-orange-500',
    badgeClass: 'bg-orange-100 text-orange-700 border-orange-200'
  }
};

const deadlineConfig = {
  'closing-soon': { label: 'Closing Soon', color: 'bg-red-100 text-red-700', icon: '🔴' },
  'one-month': { label: '1 Month Left', color: 'bg-yellow-100 text-yellow-700', icon: '🟡' },
  'open': { label: 'Open', color: 'bg-green-100 text-green-700', icon: '🟢' },
  'coming-soon': { label: 'Coming Soon', color: 'bg-gray-100 text-gray-600', icon: '⚪' },
  'always-open': { label: 'Always Open', color: 'bg-green-100 text-green-700', icon: '🟢' }
};

export const ScholarshipCard = ({ scholarship, onViewDetails }: ScholarshipCardProps) => {
  const config = typeConfig[scholarship.type];
  const deadlineInfo = deadlineConfig[scholarship.deadlineStatus];
  const Icon = config.icon;

  return (
    <Card className={cn(
      "border-l-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1",
      config.borderColor
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="outline" className={cn("text-xs font-medium", config.badgeClass)}>
            <Icon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
          <Badge variant="outline" className={cn("text-xs", deadlineInfo.color)}>
            {deadlineInfo.icon} {deadlineInfo.label}
          </Badge>
        </div>
        
        <h3 className="font-semibold text-lg mt-3 text-foreground leading-tight">
          {scholarship.name}
        </h3>
        <p className="text-sm text-muted-foreground">{scholarship.provider}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Amount */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <span className="font-bold text-lg text-primary">{scholarship.amount}</span>
        </div>

        {/* Eligibility */}
        <div className="space-y-2">
          {scholarship.eligibility.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Deadline: {scholarship.deadline}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(scholarship)}
          >
            View Details
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-[#FF6B35] hover:bg-[#FF6B35]/90"
            onClick={() => window.open(scholarship.applicationUrl, '_blank')}
          >
            Apply <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
