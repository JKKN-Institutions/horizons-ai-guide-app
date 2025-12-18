import { Star, Landmark, Building2, Handshake } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryButtonsProps {
  activeCategory: 'jkkn' | 'government' | 'corporate' | 'ngo';
  onCategoryChange: (category: 'jkkn' | 'government' | 'corporate' | 'ngo') => void;
  counts: {
    jkkn: number;
    government: number;
    corporate: number;
    ngo: number;
  };
}

const categories = [
  {
    id: 'jkkn' as const,
    label: 'JKKN Exclusive',
    icon: Star,
    activeColor: 'bg-emerald-500 text-white border-emerald-500',
    inactiveColor: 'bg-white text-emerald-600 border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50',
    iconColor: 'text-emerald-500',
    activeIconColor: 'text-white'
  },
  {
    id: 'government' as const,
    label: 'Government Scholarship',
    icon: Landmark,
    activeColor: 'bg-blue-500 text-white border-blue-500',
    inactiveColor: 'bg-white text-blue-600 border-blue-300 hover:border-blue-500 hover:bg-blue-50',
    iconColor: 'text-blue-500',
    activeIconColor: 'text-white'
  },
  {
    id: 'corporate' as const,
    label: 'Corporate Scholarship',
    icon: Building2,
    activeColor: 'bg-purple-500 text-white border-purple-500',
    inactiveColor: 'bg-white text-purple-600 border-purple-300 hover:border-purple-500 hover:bg-purple-50',
    iconColor: 'text-purple-500',
    activeIconColor: 'text-white'
  },
  {
    id: 'ngo' as const,
    label: 'NGO/Trust Scholarship',
    icon: Handshake,
    activeColor: 'bg-orange-500 text-white border-orange-500',
    inactiveColor: 'bg-white text-orange-600 border-orange-300 hover:border-orange-500 hover:bg-orange-50',
    iconColor: 'text-orange-500',
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
                ? `${category.activeColor} shadow-lg` 
                : 'bg-white/95 backdrop-blur-sm border-slate-200 hover:border-slate-300 text-slate-700'
            )}
          >
            <Icon className={cn('h-6 w-6', isActive ? category.activeIconColor : category.iconColor)} />
            <span className={cn(
              'font-semibold text-sm text-center leading-tight',
              isActive ? 'text-white' : 'text-slate-700'
            )}>{category.label}</span>
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full font-medium',
              isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            )}>
              ({count})
            </span>
          </button>
        );
      })}
    </div>
  );
};
