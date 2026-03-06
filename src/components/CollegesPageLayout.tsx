import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PillNavigation } from '@/components/PillNavigation';

interface CollegesPageLayoutProps {
  activeTab: string;
  children: React.ReactNode;
}

export const CollegesPageLayout = ({ activeTab, children }: CollegesPageLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50/50 to-amber-50/30">
      {/* ═══ Header — compact on mobile ═══ */}
      <header className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-green-700 to-emerald-800">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400/20 to-orange-500/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-400/20 to-teal-500/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/2" />
        </div>
        
        <div className="container mx-auto px-4 py-3 md:py-5 relative z-10">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white/80 hover:text-white hover:bg-white/15 rounded-xl transition-all h-9 w-9 flex-shrink-0"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-base md:text-xl lg:text-2xl font-serif font-bold text-white tracking-tight leading-tight truncate">
                EduNavigator
              </h1>
              <p className="text-xs md:text-sm text-amber-300 truncate">
                Find your way through career & higher studies
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ Sticky Navigation Tabs ═══ */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="container mx-auto px-2 md:px-4 py-2">
          <PillNavigation activeTab={activeTab} />
        </div>
      </div>

      {/* ═══ Content — full scroll, good padding ═══ */}
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-6" id="colleges-content-scroll">
        {children}
      </div>
    </div>
  );
};
