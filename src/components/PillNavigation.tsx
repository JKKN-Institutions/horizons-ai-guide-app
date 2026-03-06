import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { GraduationCap, Building2, Bookmark, Calculator, FileText, BookOpen, LucideIcon, Landmark, School, Compass, Rocket } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  activeColor: string;
  activeBg: string;
  route: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface PillNavigationProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
}

const navItems: NavItem[] = [
  {
    id: 'assessments',
    label: 'Career Assessments',
    shortLabel: 'Assessments',
    icon: GraduationCap,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#2E7D32] to-[#1B5E20]',
    route: '/career-assessment/colleges',
  },
  {
    id: 'colleges',
    label: 'Find Colleges',
    shortLabel: 'Colleges',
    icon: Building2,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#1976D2] to-[#1565C0]',
    route: '/career-assessment/colleges/find-colleges',
  },
  {
    id: 'scholarships',
    label: 'Scholarship Finder',
    shortLabel: 'Scholarships',
    icon: Bookmark,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#F59E0B] to-[#D97706]',
    route: '/career-assessment/colleges/scholarships',
  },
  {
    id: 'educutoff',
    label: 'Cutoff & College Predictor',
    shortLabel: 'Cutoff',
    icon: Calculator,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#7B1FA2] to-[#6A1B9A]',
    route: '/career-assessment/colleges/educutoff',
  },
  {
    id: 'entranceexams',
    label: 'Entrance Exams',
    shortLabel: 'Exams',
    icon: FileText,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#E65100] to-[#BF360C]',
    route: '/career-assessment/colleges/entrance-exams',
  },
  {
    id: 'pyq',
    label: 'Previous Year Questions',
    shortLabel: 'PYQ',
    icon: BookOpen,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#C62828] to-[#B71C1C]',
    route: '/career-assessment/colleges/pyq',
    isNew: true,
  },
  {
    id: 'govtjobs',
    label: 'Government Jobs',
    shortLabel: 'Govt Jobs',
    icon: Landmark,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#5D4037] to-[#4E342E]',
    route: '/career-assessment/colleges/govt-jobs',
    isNew: true,
  },
  {
    id: 'tnuniversity',
    label: 'TN University Exams',
    shortLabel: 'TN Univ',
    icon: School,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#6a0dad] to-[#9333ea]',
    route: '/career-assessment/colleges/tn-university',
    isNew: true,
  },
  {
    id: 'courseexplorer',
    label: 'Course Explorer',
    shortLabel: 'Courses',
    icon: Compass,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#0891B2] to-[#0E7490]',
    route: '/career-assessment/colleges/course-explorer',
    isNew: true,
  },
  {
    id: 'startup',
    label: 'Startup Guide',
    shortLabel: 'Startup',
    icon: Rocket,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#E91E63] to-[#C2185B]',
    route: '/career-assessment/colleges/startup',
    isNew: true,
  },
];

export const PillNavigation = ({ activeTab, onTabChange }: PillNavigationProps) => {
  const navigate = useNavigate();
  const [clickedTab, setClickedTab] = useState<string | null>(null);

  const handleTabClick = (item: NavItem) => {
    setClickedTab(item.id);
    navigate(item.route);
    onTabChange?.(item.id);
    setTimeout(() => setClickedTab(null), 300);
  };

  return (
    <div className="overflow-x-auto scrollbar-none -mx-1">
      <nav className="flex items-center gap-1.5 px-1 min-w-max md:flex-wrap md:justify-center md:min-w-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item)}
              className={cn(
                'relative flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 rounded-xl font-semibold text-xs md:text-sm',
                'transition-all duration-200 ease-out whitespace-nowrap flex-shrink-0',
                'active:scale-95',
                clickedTab === item.id && 'animate-bounce-pop',
                isActive
                  ? `${item.activeBg} ${item.activeColor} shadow-md`
                  : 'text-[#1F2937] hover:bg-slate-100 border border-slate-200 bg-white'
              )}
            >
              <Icon 
                className={cn(
                  'w-4 h-4 flex-shrink-0',
                  isActive ? 'text-white' : 'text-[#2E7D32]'
                )} 
              />
              <span className="hidden md:inline">{item.label}</span>
              <span className="md:hidden">{item.shortLabel}</span>
              
              {item.isNew && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[8px] font-bold px-1 py-0 rounded-full shadow-sm leading-tight">
                  N
                </span>
              )}
            </button>
          );
        })}
      </nav>
      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export { navItems };
