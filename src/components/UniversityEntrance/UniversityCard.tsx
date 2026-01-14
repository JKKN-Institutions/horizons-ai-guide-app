import { MapPin, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { University } from '@/data/university-entrance-data';

interface UniversityCardProps {
  university: University;
  onClick: () => void;
}

export const UniversityCard = ({ university, onClick }: UniversityCardProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  };

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Logo Placeholder */}
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"
            style={{ backgroundColor: university.logoColor }}
          >
            {getInitials(university.name)}
          </div>
          
          <div className="flex-1 min-w-0">
            {/* University Name */}
            <h3 className="font-bold text-foreground text-base leading-tight group-hover:text-[#6a0dad] transition-colors">
              {university.name}
            </h3>
            <p className="text-sm text-muted-foreground font-tamil mt-0.5 truncate">
              {university.nameTamil}
            </p>
            
            {/* Location */}
            <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{university.location}</span>
            </div>
            
            {/* Exam Badge */}
            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#6a0dad]/10 text-[#6a0dad] dark:bg-[#6a0dad]/20">
                <GraduationCap className="h-3.5 w-3.5" />
                {university.examName}
              </span>
            </div>
          </div>
        </div>
        
        {/* Course count */}
        {university.courses.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{university.courses.length}</span> courses available
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
