import { Landmark, Building2, Handshake, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryButtonsProps {
  activeCategory: 'government' | 'corporate' | 'ngo' | 'sports';
  onCategoryChange: (category: 'government' | 'corporate' | 'ngo' | 'sports') => void;
  counts: {
    government: number;
    corporate: number;
    ngo: number;
    sports: number;
  };
}

const categories = [
  {
    id: 'government' as const,
    label: 'Government Scholarship',
    icon: Landmark,
    activeColor: 'bg-gradient-to-r from-[#1976D2] to-[#1565C0] text-white border-[#1976D2] shadow-lg shadow-[#1976D2]/30',
    inactiveColor: 'bg-white text-[#1976D2] border-[#90CAF9] hover:border-[#1976D2] hover:bg-[#E3F2FD]',
    iconColor: 'text-[#1976D2]',
    activeIconColor: 'text-white'
  },
  {
    id: 'corporate' as const,
    label: 'Corporate Scholarship',
    icon: Building2,
    activeColor: 'bg-gradient-to-r from-[#7B1FA2] to-[#6A1B9A] text-white border-[#7B1FA2] shadow-lg shadow-[#7B1FA2]/30',
    inactiveColor: 'bg-white text-[#7B1FA2] border-[#CE93D8] hover:border-[#7B1FA2] hover:bg-[#F3E5F5]',
    iconColor: 'text-[#7B1FA2]',
    activeIconColor: 'text-white'
  },
  {
    id: 'ngo' as const,
    label: 'NGO/Trust Scholarship',
    icon: Handshake,
    activeColor: 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white border-[#F59E0B] shadow-lg shadow-[#F59E0B]/30',
    inactiveColor: 'bg-white text-[#F59E0B] border-[#FFE082] hover:border-[#F59E0B] hover:bg-[#FFF8E1]',
    iconColor: 'text-[#F59E0B]',
    activeIconColor: 'text-white'
  },
  {
    id: 'sports' as const,
    label: 'Sports Scholarship',
    icon: Trophy,
    activeColor: 'bg-gradient-to-r from-[#E53935] to-[#C62828] text-white border-[#E53935] shadow-lg shadow-[#E53935]/30',
    inactiveColor: 'bg-white text-[#E53935] border-[#FFCDD2] hover:border-[#E53935] hover:bg-[#FFEBEE]',
    iconColor: 'text-[#E53935]',
    activeIconColor: 'text-white'
  }
];

export const CategoryButtons = ({ activeCategory, onCategoryChange, counts }: CategoryButtonsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        const Icon = category.icon;
        const count = counts[category.id];
        
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300',
              'hover:scale-[1.03] hover:shadow-lg',
              isActive 
                ? category.activeColor 
                : category.inactiveColor
            )}
          >
            <Icon className={cn('h-6 w-6', isActive ? category.activeIconColor : category.iconColor)} />
            <span className={cn(
              'font-semibold text-sm text-center leading-tight',
              isActive ? 'text-white' : 'text-[#1F2937]'
            )}>{category.label}</span>
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full font-medium',
              isActive ? 'bg-white/20 text-white' : 'bg-[#E8F5E9] text-[#2E7D32]'
            )}>
              ({count})
            </span>
          </button>
        );
      })}
    </div>
  );
};
