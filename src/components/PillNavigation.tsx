import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { GraduationCap, Building2, Bookmark, Calculator, FileText, Users, BookOpen, LucideIcon, Landmark, School, Compass } from 'lucide-react';

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
    label: 'EduCutoff Calculator',
    shortLabel: 'EduCutoff',
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
    id: 'counselling',
    label: 'Counseling Simulator',
    shortLabel: 'Counseling',
    icon: Users,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#00897B] to-[#00695C]',
    route: '/career-assessment/colleges/counselling',
    isFeatured: true,
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
    <div className="flex justify-center mb-8 overflow-x-auto pb-2">
      <nav 
        className="relative inline-flex flex-wrap justify-center items-center gap-2 p-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200"
      >
        {/* Main tools row */}
        <div className="flex items-center gap-1 flex-wrap justify-center">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                className={cn(
                  'relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm',
                  'transition-all duration-200 ease-out',
                  'hover:scale-105 active:scale-95',
                  clickedTab === item.id && 'animate-bounce-pop',
                  isActive
                    ? `${item.activeBg} ${item.activeColor} shadow-md`
                    : 'text-[#1F2937] hover:bg-slate-100 border border-slate-200'
                )}
              >
                <Icon 
                  className={cn(
                    'w-4 h-4 transition-colors duration-300',
                    isActive ? 'text-white' : 'text-[#2E7D32]'
                  )} 
                />
                <span className="hidden md:inline whitespace-nowrap">{item.label}</span>
                <span className="md:hidden whitespace-nowrap">{item.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Divider with label */}
        <div className="flex items-center gap-2 px-2">
          <div className="h-px w-6 bg-slate-300" />
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">More Tools</span>
          <div className="h-px w-6 bg-slate-300" />
        </div>

        {/* More tools row */}
        <div className="flex items-center gap-1 flex-wrap justify-center">
          {navItems.slice(5).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                className={cn(
                  'relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm',
                  'transition-all duration-200 ease-out',
                  'hover:scale-105 active:scale-95',
                  clickedTab === item.id && 'animate-bounce-pop',
                  isActive
                    ? `${item.activeBg} ${item.activeColor} shadow-md`
                    : 'text-[#1F2937] hover:bg-slate-100 border border-slate-200'
                )}
              >
                <Icon 
                  className={cn(
                    'w-4 h-4 transition-colors duration-300',
                    isActive ? 'text-white' : item.id === 'counselling' ? 'text-teal-600' : 'text-rose-600'
                  )} 
                />
                <span className="hidden md:inline whitespace-nowrap">{item.label}</span>
                <span className="md:hidden whitespace-nowrap">{item.shortLabel}</span>
                
                {/* Featured/New badges */}
                {item.isFeatured && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-[8px] text-white">★</span>
                  </span>
                )}
                {item.isNew && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export { navItems };
