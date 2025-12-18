import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { GraduationCap, Building2, Bookmark, Calculator, LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  activeColor: string;
  activeBg: string;
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
    activeColor: 'text-emerald-600',
    activeBg: 'bg-emerald-50',
  },
  {
    id: 'colleges',
    label: 'Find Colleges',
    shortLabel: 'Colleges',
    icon: Building2,
    activeColor: 'text-blue-600',
    activeBg: 'bg-blue-50',
  },
  {
    id: 'scholarships',
    label: 'Scholarship Finder',
    shortLabel: 'Scholarships',
    icon: Bookmark,
    activeColor: 'text-amber-600',
    activeBg: 'bg-amber-50',
  },
  {
    id: 'educutoff',
    label: 'EduCutoff Calculator',
    shortLabel: 'EduCutoff',
    icon: Calculator,
    activeColor: 'text-violet-600',
    activeBg: 'bg-violet-50',
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
    <div className="flex justify-center mb-8">
      <nav 
        ref={navRef}
        className="relative inline-flex items-center gap-1 p-1.5 bg-gray-100/80 backdrop-blur-md rounded-full shadow-sm"
      >
        {/* Sliding indicator */}
        <div
          className={cn(
            'absolute top-1.5 bottom-1.5 rounded-full bg-white shadow-md',
            'transition-all duration-300 ease-out',
            activeItem?.activeBg
          )}
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            transform: 'translateZ(0)', // GPU acceleration
          }}
        />
        
        {navItems.map((item) => {
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
                'relative z-10 flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm',
                'transition-all duration-150 ease-out',
                'hover:scale-105 active:scale-95',
                clickedTab === item.id && 'animate-bounce-pop',
                isActive
                  ? item.activeColor
                  : 'text-gray-600 hover:text-gray-800'
              )}
            >
              <Icon 
                className={cn(
                  'w-4 h-4 transition-colors duration-300',
                  isActive ? item.activeColor : 'text-gray-400'
                )} 
              />
              <span className="hidden sm:inline whitespace-nowrap">{item.label}</span>
              <span className="sm:hidden whitespace-nowrap">{item.shortLabel}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
