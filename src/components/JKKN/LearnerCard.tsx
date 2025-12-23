import { User, MapPin, Calendar, Github, Linkedin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Learner {
  id: string;
  learner_number: number;
  name: string;
  email: string;
  phone: string;
  photo_url?: string;
  college: string;
  course: string;
  branch: string;
  year_of_study: string;
  graduation_year: number;
  skills: string[];
  career_interest?: string;
  linkedin_url?: string;
  github_url?: string;
  registered_at: string;
}

interface LearnerCardProps {
  learner: Learner;
  isNew?: boolean;
}

export function LearnerCard({ learner, isNew }: LearnerCardProps) {
  return (
    <div 
      className={`fresh-card group relative ${isNew ? 'ring-2 ring-fresh-gold-dark animate-pulse' : ''}`}
    >
      {isNew && (
        <div className="absolute -top-2 -right-2 bg-fresh-gold-dark text-white text-xs font-bold px-2 py-1 rounded-full">
          NEW
        </div>
      )}
      
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          {learner.photo_url ? (
            <img 
              src={learner.photo_url} 
              alt={learner.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-fresh-green-medium/20"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-fresh-green-medium to-fresh-green-dark flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 bg-fresh-gold-dark text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            #{learner.learner_number}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-foreground truncate">{learner.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
            <MapPin className="w-3.5 h-3.5" />
            {learner.college}
          </p>
          <p className="text-sm text-fresh-green-medium font-medium mt-1">
            {learner.course} - {learner.branch}
          </p>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {learner.year_of_study} Year • Batch {learner.graduation_year}
            </span>
          </div>
        </div>
      </div>

      {/* Skills */}
      {learner.skills && learner.skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {learner.skills.slice(0, 5).map((skill, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="bg-fresh-green-bg text-fresh-green-dark text-xs"
            >
              {skill}
            </Badge>
          ))}
          {learner.skills.length > 5 && (
            <Badge variant="outline" className="text-xs">
              +{learner.skills.length - 5} more
            </Badge>
          )}
        </div>
      )}

      {/* Career Interest */}
      {learner.career_interest && (
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          🎯 {learner.career_interest}
        </p>
      )}

      {/* Social Links */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex gap-2">
          {learner.linkedin_url && (
            <a 
              href={learner.linkedin_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5]/20 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {learner.github_url && (
            <a 
              href={learner.github_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {new Date(learner.registered_at).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </span>
      </div>
    </div>
  );
}
