import { useRef, useEffect, useState } from 'react';
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
}

interface PillNavigationProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
}

const navItems: NavItem[] = [
  { id: 'assessments', label: 'Career Assessments', shortLabel: 'Assessments', icon: GraduationCap, activeColor: 'text-white', activeBg: 'bg-emerald-700', route: '/career-assessment/colleges' },
  { id: 'colleges', label: 'Find Colleges', shortLabel: 'Colleges', icon: Building2, activeColor: 'text-white', activeBg: 'bg-blue-700', route: '/career-assessment/colleges/find-colleges' },
  { id: 'scholarships', label: 'Scholarships', shortLabel: 'Scholarships', icon: Bookmark, activeColor: 'text-white', activeBg: 'bg-amber-600', route: '/career-assessment/colleges/scholarships' },
  { id: 'educutoff', label: 'Cutoff & Predictor', shortLabel: 'Cutoff', icon: Calculator, activeColor: 'text-white', activeBg: 'bg-purple-700', route: '/career-assessment/colleges/educutoff' },
  { id: 'entranceexams', label: 'Entrance Exams', shortLabel: 'Exams', icon: FileText, activeColor: 'text-white', activeBg: 'bg-orange-700', route: '/career-assessment/colleges/entrance-exams' },
  { id: 'govtjobs', label: 'Govt Jobs', shortLabel: 'Govt Jobs', icon: Landmark, activeColor: 'text-white', activeBg: 'bg-stone-700', route: '/career-assessment/colleges/govt-jobs', isNew: true },
  { id: 'tnuniversity', label: 'TN University', shortLabel: 'TN Univ', icon: School, activeColor: 'text-white', activeBg: 'bg-violet-700', route: '/career-assessment/colleges/tn-university', isNew: true },
  { id: 'courseexplorer', label: 'Course Explorer', shortLabel: 'Courses', icon: Compass, activeColor: 'text-white', activeBg: 'bg-cyan-700', route: '/career-assessment/colleges/course-explorer', isNew: true },
  { id: 'startup', label: 'Startup Guide', shortLabel: 'Startup', icon: Rocket, activeColor: 'text-white', activeBg: 'bg-pink-700', route: '/career-assessment/colleges/startup', isNew: true },
];

export const PillNavigation = ({ activeTab, onTabChange }: PillNavigationProps) => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to active tab on mount
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const activeEl = activeRef.current;
      const scrollLeft = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
    }
  }, [activeTab]);

  const handleTabClick = (item: NavItem) => {
    navigate(item.route);
    onTabChange?.(item.id);
  };

  return (
    <div ref={scrollRef} className="overflow-x-auto scrollbar-none -mx-1">
      <div className="flex items-center gap-1 px-1 min-w-max">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              ref={isActive ? activeRef : undefined}
              onClick={() => handleTabClick(item)}
              className={cn(
                'relative flex items-center gap-1.5 rounded-lg font-medium whitespace-nowrap flex-shrink-0',
                'transition-all duration-150 active:scale-95',
                // Mobile: bigger touch targets (min 44px height)
                'px-2.5 py-2 text-[11px]',
                // Desktop: slightly bigger
                'md:px-3.5 md:py-2.5 md:text-sm',
                isActive
                  ? `${item.activeBg} text-white shadow-md`
                  : 'text-gray-600 bg-gray-50 border border-gray-200 active:bg-gray-100'
              )}
            >
              <Icon className={cn('w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0', isActive ? 'text-white' : 'text-gray-500')} />
              <span className="md:hidden">{item.shortLabel}</span>
              <span className="hidden md:inline">{item.label}</span>
              
              {item.isNew && !isActive && (
                <span className="absolute -top-1 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export { navItems };
