import { Category } from '@/types/jobPortal';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Laptop, Megaphone, Calculator, HeartPulse, Factory, 
  Headphones, Store, GraduationCap, Wrench, Building, Truck, Users 
} from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}

const iconMap: Record<string, React.ElementType> = {
  laptop: Laptop,
  megaphone: Megaphone,
  calculator: Calculator,
  'heart-pulse': HeartPulse,
  factory: Factory,
  headphones: Headphones,
  store: Store,
  'graduation-cap': GraduationCap,
  wrench: Wrench,
  building: Building,
  truck: Truck,
  users: Users,
};

export const CategoryFilter = ({ categories, selected, onSelect }: CategoryFilterProps) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-3">
        <button
          onClick={() => onSelect(null)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
            !selected 
              ? 'bg-primary text-primary-foreground shadow-md' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          All Jobs
        </button>
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || Laptop;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id === selected ? null : cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selected === cat.id 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.name}
              {cat.jobs_count > 0 && (
                <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                  {cat.jobs_count}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
