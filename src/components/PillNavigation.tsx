import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { GraduationCap, Building2, Bookmark, Calculator, FileText, Users, BookOpen, LucideIcon, Landmark, School } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  activeColor: string;
  activeBg: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface PillNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems: NavItem[] = [
  {
    id: 'assessments',
    label: 'Career Assessments',
    shortLabel: 'Assessments',
    icon: GraduationCap,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#2E7D32] to-[#1B5E20]',
  },
  {
    id: 'colleges',
    label: 'Find Colleges',
    shortLabel: 'Colleges',
    icon: Building2,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#1976D2] to-[#1565C0]',
  },
  {
    id: 'scholarships',
    label: 'Scholarship Finder',
    shortLabel: 'Scholarships',
    icon: Bookmark,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#F59E0B] to-[#D97706]',
  },
  {
    id: 'educutoff',
    label: 'EduCutoff Calculator',
    shortLabel: 'EduCutoff',
    icon: Calculator,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#7B1FA2] to-[#6A1B9A]',
  },
  {
    id: 'entranceexams',
    label: 'Entrance Exams',
    shortLabel: 'Exams',
    icon: FileText,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#E65100] to-[#BF360C]',
  },
  {
    id: 'counselling',
    label: 'Counseling Simulator',
    shortLabel: 'Counseling',
    icon: Users,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#00897B] to-[#00695C]',
    isFeatured: true,
  },
  {
    id: 'pyq',
    label: 'Previous Year Questions',
    shortLabel: 'PYQ',
    icon: BookOpen,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#C62828] to-[#B71C1C]',
    isNew: true,
  },
  {
    id: 'govtjobs',
    label: 'Government Jobs',
    shortLabel: 'Govt Jobs',
    icon: Landmark,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#5D4037] to-[#4E342E]',
    isNew: true,
  },
  {
    id: 'tnuniversity',
    label: 'TN University Exams',
    shortLabel: 'TN Univ',
    icon: School,
    activeColor: 'text-white',
    activeBg: 'bg-gradient-to-r from-[#6a0dad] to-[#9333ea]',
    isNew: true,
  },
];

export const PillNavigation = ({ activeTab, onTabChange }: PillNavigationProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [clickedTab, setClickedTab] = useState<string | null>(null);

  const handleTabClick = (tabId: string) => {
    setClickedTab(tabId);
    onTabChange(tabId);
    // Reset animation after bounce completes
    setTimeout(() => setClickedTab(null), 300);
  };

  useEffect(() => {
    const activeButton = buttonRefs.current.get(activeTab);
    const nav = navRef.current;
    
    if (activeButton && nav) {
      const navRect = nav.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      
      setIndicatorStyle({
        left: buttonRect.left - navRect.left,
        width: buttonRect.width,
      });
    }
  }, [activeTab]);

  // Update indicator on resize
  useEffect(() => {
    const handleResize = () => {
      const activeButton = buttonRefs.current.get(activeTab);
      const nav = navRef.current;
      
      if (activeButton && nav) {
        const navRect = nav.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        
        setIndicatorStyle({
          left: buttonRect.left - navRect.left,
          width: buttonRect.width,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  const activeItem = navItems.find(item => item.id === activeTab);

  return (
    <div className="flex justify-center mb-8 overflow-x-auto pb-2">
      <nav 
        ref={navRef}
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
                ref={(el) => {
                  if (el) buttonRefs.current.set(item.id, el);
                }}
                onClick={() => handleTabClick(item.id)}
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
                ref={(el) => {
                  if (el) buttonRefs.current.set(item.id, el);
                }}
                onClick={() => handleTabClick(item.id)}
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
