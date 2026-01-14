import { LucideIcon } from 'lucide-react';

interface QuickToolCardProps {
  icon: LucideIcon;
  title: string;
  titleTamil: string;
  onClick: () => void;
  color?: string;
}

export const QuickToolCard = ({ icon: Icon, title, titleTamil, onClick, color = '#6a0dad' }: QuickToolCardProps) => {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-w-[100px] group"
    >
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-foreground whitespace-nowrap">{title}</p>
        <p className="text-xs text-muted-foreground font-tamil">{titleTamil}</p>
      </div>
    </button>
  );
};
