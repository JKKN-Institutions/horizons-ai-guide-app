import { useState } from 'react';
import { MapPin, Heart, GraduationCap, Award, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { University } from '@/data/university-entrance-data';
import { cn } from '@/lib/utils';

interface UniversityCardProps {
  university: University;
  onClick: () => void;
}

// Mock data for NAAC and NIRF - in production, this would come from the university data
const getAccreditation = (name: string): { naac?: string; nirf?: number } => {
  const accreditations: Record<string, { naac?: string; nirf?: number }> = {
    'IIT Madras': { naac: 'A++', nirf: 1 },
    'Indian Institute of Technology Madras': { naac: 'A++', nirf: 1 },
    'NIT Trichy': { naac: 'A++', nirf: 9 },
    'National Institute of Technology Tiruchirappalli': { naac: 'A++', nirf: 9 },
    'IIM Trichy': { naac: 'A++', nirf: 12 },
    'Anna University': { naac: 'A++', nirf: 15 },
    'University of Madras': { naac: 'A++', nirf: 18 },
    'Bharathiar University': { naac: 'A++', nirf: 25 },
    'Bharathidasan University': { naac: 'A+', nirf: 32 },
    'Madurai Kamaraj University': { naac: 'A+', nirf: 45 },
    'Alagappa University': { naac: 'A+', nirf: 52 },
    'Annamalai University': { naac: 'A+', nirf: 58 },
    'Periyar University': { naac: 'A', nirf: 65 },
    'Tamil University': { naac: 'A' },
    'IIITDM Kancheepuram': { naac: 'A', nirf: 78 },
  };
  
  // Check for partial matches
  for (const [key, value] of Object.entries(accreditations)) {
    if (name.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(name.toLowerCase())) {
      return value;
    }
  }
  
  return {};
};

export const UniversityCard = ({ university, onClick }: UniversityCardProps) => {
  const [isShortlisted, setIsShortlisted] = useState(() => {
    const saved = localStorage.getItem('shortlisted_universities');
    if (saved) {
      const list = JSON.parse(saved) as string[];
      return list.includes(university.id);
    }
    return false;
  });

  const handleShortlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const saved = localStorage.getItem('shortlisted_universities');
    let list: string[] = saved ? JSON.parse(saved) : [];
    
    if (isShortlisted) {
      list = list.filter(id => id !== university.id);
    } else {
      list.push(university.id);
    }
    
    localStorage.setItem('shortlisted_universities', JSON.stringify(list));
    setIsShortlisted(!isShortlisted);
  };

  const getInitials = (name: string) => {
    return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  };

  const accreditation = getAccreditation(university.name);

  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700",
        "shadow-sm hover:shadow-lg transition-all duration-300",
        "hover:-translate-y-1 hover:border-emerald-200 dark:hover:border-emerald-700",
        "group overflow-hidden"
      )}
    >
      <CardContent className="p-5">
        <div className="flex gap-4">
          {/* Logo Section - Left */}
          <div className="shrink-0">
            {university.logo ? (
              <div className="w-[60px] h-[60px] rounded-xl bg-white border border-slate-100 dark:border-slate-600 flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                <img 
                  src={university.logo} 
                  alt={`${university.name} logo`}
                  className="w-full h-full object-contain p-1.5"
                />
              </div>
            ) : (
              <div 
                className="w-[60px] h-[60px] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:shadow-md transition-shadow"
                style={{ backgroundColor: university.logoColor }}
              >
                {getInitials(university.name)}
              </div>
            )}
          </div>
          
          {/* Content Section - Middle */}
          <div className="flex-1 min-w-0 space-y-2">
            {/* University Name */}
            <div>
              <h3 className="font-semibold text-foreground text-base leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                {university.name}
              </h3>
              <p className="text-sm text-muted-foreground font-tamil mt-0.5 line-clamp-1">
                {university.nameTamil}
              </p>
            </div>
            
            {/* Location */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{university.location}</span>
            </div>
            
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-1.5">
              {accreditation.naac && (
                <Badge 
                  variant="secondary" 
                  className="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700 text-xs px-2 py-0.5 font-medium"
                >
                  <Award className="h-3 w-3 mr-1" />
                  NAAC {accreditation.naac}
                </Badge>
              )}
              {accreditation.nirf && (
                <Badge 
                  variant="secondary" 
                  className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 text-xs px-2 py-0.5 font-medium"
                >
                  <Trophy className="h-3 w-3 mr-1" />
                  NIRF #{accreditation.nirf}
                </Badge>
              )}
              {/* Exam Badge */}
              <Badge 
                variant="outline" 
                className="text-xs px-2 py-0.5 font-medium border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300"
              >
                <GraduationCap className="h-3 w-3 mr-1" />
                {university.examName}
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Bottom Actions Row */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
          <div className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{university.courses.length}</span> courses available
          </div>
          
          <div className="flex items-center gap-2">
            {/* Shortlist Button */}
            <button
              onClick={handleShortlist}
              className={cn(
                "p-2 rounded-full transition-all duration-200",
                isShortlisted 
                  ? "bg-red-50 dark:bg-red-900/30 text-red-500" 
                  : "bg-slate-50 dark:bg-slate-700 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
              )}
              aria-label={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
            >
              <Heart 
                className={cn("h-4 w-4 transition-transform", isShortlisted && "fill-current scale-110")} 
              />
            </button>
            
            {/* View Courses Button */}
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-4 text-xs font-medium shadow-sm hover:shadow-md transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              View Courses
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
