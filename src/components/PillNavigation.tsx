import { useState } from 'react';
import { cn } from '@/lib/utils';
import { GraduationCap, Building2, Bookmark, LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  activeColor: string;
}

interface PillNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems: NavItem[] = [
  {
    id: 'assessments',
    label: 'Career Assessments',
    icon: GraduationCap,
    activeColor: 'text-emerald-600',
  },
  {
    id: 'colleges',
    label: 'Find Colleges',
    icon: Building2,
    activeColor: 'text-blue-600',
  },
  {
    id: 'scholarships',
    label: 'Scholarship Finder',
    icon: Bookmark,
    activeColor: 'text-amber-600',
  },
];

export const PillNavigation = ({ activeTab, onTabChange }: PillNavigationProps) => {
  return (
    <div className="flex justify-center mb-8">
      <nav className="inline-flex items-center gap-1 p-1.5 bg-gray-100/80 backdrop-blur-md rounded-full shadow-sm">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'relative flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm',
                'transition-all duration-300 ease-out',
                'hover:scale-105',
                isActive
                  ? `bg-white shadow-md ${item.activeColor}`
                  : 'text-gray-600 hover:bg-gray-200/70'
              )}
            >
              <Icon 
                className={cn(
                  'w-4 h-4 transition-colors duration-300',
                  isActive ? item.activeColor : 'text-gray-400'
                )} 
              />
              <span className="hidden sm:inline whitespace-nowrap">{item.label}</span>
              <span className="sm:hidden whitespace-nowrap">
                {item.id === 'assessments' ? 'Assessments' : item.id === 'colleges' ? 'Colleges' : 'Scholarships'}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
