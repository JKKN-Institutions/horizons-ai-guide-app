import { MapPin, Clock, Briefcase, ExternalLink, Star, IndianRupee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface JKKNJob {
  id: string;
  company_name: string;
  company_logo_url?: string;
  title: string;
  description?: string;
  type: string;
  work_mode?: string;
  location?: string;
  stipend_min?: number;
  stipend_max?: number;
  salary_min?: number;
  salary_max?: number;
  duration?: string;
  skills_required: string[];
  eligibility?: string;
  application_deadline?: string;
  apply_link?: string;
  is_featured?: boolean;
  created_at: string;
}

interface JobCardProps {
  job: JKKNJob;
}

export function JobCard({ job }: JobCardProps) {
  const isInternship = job.type === 'Internship';
  const salaryMin = isInternship ? job.stipend_min : job.salary_min;
  const salaryMax = isInternship ? job.stipend_max : job.salary_max;

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Not Disclosed';
    if (min && max) return `₹${(min / 1000).toFixed(0)}K - ₹${(max / 1000).toFixed(0)}K`;
    if (min) return `₹${(min / 1000).toFixed(0)}K+`;
    return `Up to ₹${(max! / 1000).toFixed(0)}K`;
  };

  return (
    <div className={`fresh-card group ${job.is_featured ? 'fresh-card-gold' : ''}`}>
      {job.is_featured && (
        <div className="flex items-center gap-1 text-fresh-gold-dark text-sm font-semibold mb-3">
          <Star className="w-4 h-4 fill-fresh-gold-dark" />
          Featured
        </div>
      )}
      
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fresh-green-bg to-fresh-gold-light flex items-center justify-center overflow-hidden shrink-0">
          {job.company_logo_url ? (
            <img 
              src={job.company_logo_url} 
              alt={job.company_name}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <Briefcase className="w-6 h-6 text-fresh-green-medium" />
          )}
        </div>

        {/* Job Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-lg text-foreground group-hover:text-fresh-green-medium transition-colors line-clamp-1">
                {job.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {job.company_name}
              </p>
            </div>
            <Badge 
              variant={isInternship ? "secondary" : "default"}
              className={isInternship 
                ? "bg-blue-100 text-blue-700 shrink-0" 
                : "bg-fresh-green-bg text-fresh-green-dark shrink-0"
              }
            >
              {job.type}
            </Badge>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
        {job.location && (
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {job.location}
          </span>
        )}
        {job.work_mode && (
          <span className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            {job.work_mode}
          </span>
        )}
        {job.duration && (
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {job.duration}
          </span>
        )}
      </div>

      {/* Salary */}
      <div className="mt-3 flex items-center gap-1 text-fresh-green-dark font-semibold">
        <IndianRupee className="w-4 h-4" />
        {formatSalary(salaryMin, salaryMax)}
        <span className="text-muted-foreground font-normal text-sm">
          /{isInternship ? 'month' : 'year'}
        </span>
      </div>

      {/* Skills */}
      {job.skills_required && job.skills_required.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {job.skills_required.slice(0, 4).map((skill, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs"
            >
              {skill}
            </Badge>
          ))}
          {job.skills_required.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{job.skills_required.length - 4}
            </Badge>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {job.application_deadline && (
            <span>
              Apply by {new Date(job.application_deadline).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short'
              })}
            </span>
          )}
        </div>
        <Button 
          size="sm" 
          className="bg-fresh-green-medium hover:bg-fresh-green-dark"
          onClick={() => job.apply_link && window.open(job.apply_link, '_blank')}
        >
          Apply Now
          <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </div>
    </div>
  );
}
