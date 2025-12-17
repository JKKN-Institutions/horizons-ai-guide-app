import { Star, Landmark, Building2, Handshake, CheckCircle2, Calendar, ExternalLink, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scholarship } from './types';
import { cn } from '@/lib/utils';

interface CategoryScholarshipListProps {
  scholarships: Scholarship[];
  category: 'jkkn' | 'government' | 'corporate' | 'ngo';
  onViewDetails: (scholarship: Scholarship) => void;
}

const categoryConfig = {
  jkkn: {
    title: 'JKKN Exclusive Scholarships',
    subtitle: 'Exclusive scholarships for JKKN college students',
    icon: Star,
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-l-emerald-500',
    badgeBg: 'bg-emerald-100 text-emerald-700'
  },
  government: {
    title: 'Government Scholarships',
    subtitle: 'Tamil Nadu & Central Government schemes',
    icon: Landmark,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-l-blue-500',
    badgeBg: 'bg-blue-100 text-blue-700'
  },
  corporate: {
    title: 'Corporate Scholarships',
    subtitle: 'Sponsored by leading companies and foundations',
    icon: Building2,
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-l-purple-500',
    badgeBg: 'bg-purple-100 text-purple-700'
  },
  ngo: {
    title: 'NGO & Trust Scholarships',
    subtitle: 'Supported by charitable organizations and foundations',
    icon: Handshake,
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-l-orange-500',
    badgeBg: 'bg-orange-100 text-orange-700'
  }
};

const getDeadlineIndicator = (status: Scholarship['deadlineStatus']) => {
  switch (status) {
    case 'closing-soon':
      return { color: 'bg-red-500', text: 'Closing Soon', textColor: 'text-red-600' };
    case 'one-month':
      return { color: 'bg-yellow-500', text: '1 Month Left', textColor: 'text-yellow-600' };
    case 'open':
      return { color: 'bg-green-500', text: 'Open', textColor: 'text-green-600' };
    case 'always-open':
      return { color: 'bg-emerald-500', text: 'Always Open', textColor: 'text-emerald-600' };
    case 'coming-soon':
      return { color: 'bg-gray-400', text: 'Coming Soon', textColor: 'text-gray-600' };
    default:
      return { color: 'bg-gray-400', text: 'Unknown', textColor: 'text-gray-600' };
  }
};

export const CategoryScholarshipList = ({ scholarships, category, onViewDetails }: CategoryScholarshipListProps) => {
  const config = categoryConfig[category];
  const Icon = config.icon;

  if (scholarships.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-xl">
        <p className="text-lg text-muted-foreground">No scholarships found in this category</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Category Header */}
      <div className={cn('p-4 rounded-xl', config.bgColor)}>
        <div className="flex items-center gap-3">
          <Icon className={cn('h-6 w-6', config.iconColor)} />
          <div>
            <h3 className="font-semibold text-lg text-foreground">{config.title}</h3>
            <p className="text-sm text-muted-foreground">{config.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Scholarship Cards Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {scholarships.map((scholarship) => {
          const deadline = getDeadlineIndicator(scholarship.deadlineStatus);
          
          return (
            <div
              key={scholarship.id}
              className={cn(
                'bg-card rounded-xl border shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden',
                'border-l-4',
                config.borderColor
              )}
            >
              <div className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <Badge className={cn('mb-2 text-xs', config.badgeBg)}>
                      {category === 'jkkn' && '⭐ JKKN Exclusive'}
                      {category === 'government' && '🏛️ Government'}
                      {category === 'corporate' && '🏢 Corporate'}
                      {category === 'ngo' && '🤝 NGO/Trust'}
                    </Badge>
                    <h4 className="font-semibold text-foreground leading-tight">{scholarship.name}</h4>
                    {category !== 'jkkn' && (
                      <p className="text-sm text-muted-foreground mt-1">{scholarship.provider}</p>
                    )}
                  </div>
                </div>

                {/* Amount */}
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <span className="text-lg">💰</span>
                  <span>{scholarship.amount}</span>
                </div>

                {/* Eligibility */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Eligibility:</p>
                  <div className="space-y-1">
                    {scholarship.eligibility.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits (for JKKN) */}
                {category === 'jkkn' && scholarship.benefits && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Benefits:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {scholarship.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx}>• {benefit.label}: {benefit.value}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Documents (for Government) */}
                {category === 'government' && scholarship.documents && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Documents Required:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {scholarship.documents.slice(0, 5).map((doc, idx) => (
                        <li key={idx}>• {doc}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Deadline */}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Deadline: {scholarship.deadline}</span>
                  <span className={cn('flex items-center gap-1 text-xs font-medium', deadline.textColor)}>
                    <span className={cn('w-2 h-2 rounded-full', deadline.color)}></span>
                    {deadline.text}
                  </span>
                </div>

                {/* Apply URL for Government/Corporate/NGO */}
                {category !== 'jkkn' && scholarship.applicationUrl && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ExternalLink className="h-4 w-4" />
                    <span className="truncate">{scholarship.applicationUrl.replace('https://', '')}</span>
                  </div>
                )}

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
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => window.open(scholarship.applicationUrl, '_blank')}
                  >
                    Apply Now →
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
