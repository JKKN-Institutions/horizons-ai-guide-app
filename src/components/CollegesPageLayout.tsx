import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PillNavigation } from '@/components/PillNavigation';
import { supabase } from '@/integrations/supabase/client';

interface CollegesPageLayoutProps {
  activeTab: string;
  children: React.ReactNode;
}

export const CollegesPageLayout = ({ activeTab, children }: CollegesPageLayoutProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // Even if Supabase fails, clear local state
    }
    // Clear any local storage
    localStorage.removeItem('vzk_student_profile');
    // Redirect to home
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50/50 to-amber-50/30">
      {/* ═══ COMPACT HEADER ═══ */}
      <header className="bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-800 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=200&fit=crop&auto=format" alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" loading="lazy" />
        <div className="px-3 py-2.5 md:px-6 md:py-4 flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white/80 hover:text-white hover:bg-white/15 rounded-lg h-9 w-9 flex-shrink-0"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-sm md:text-xl font-bold text-white leading-tight">
              EduNavigator
            </h1>
            <p className="text-[10px] md:text-sm text-amber-300 leading-tight">
              Career & Higher Studies Guide
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/15 hover:bg-red-500/80 active:bg-red-600 text-white text-xs font-semibold transition-all flex-shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* ═══ STICKY NAVIGATION ═══ */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-2 py-1.5 md:px-4 md:py-2 flex items-center gap-1.5">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 flex-shrink-0 rounded-lg hover:bg-emerald-50 text-emerald-700"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4" />
          </Button>
          <div className="flex-1 overflow-hidden">
            <PillNavigation activeTab={activeTab} />
          </div>
        </div>
      </div>

      {/* ═══ SCROLLABLE CONTENT ═══ */}
      <main className="px-3 py-3 md:px-4 md:py-6 max-w-7xl mx-auto" id="colleges-content-scroll">
        {children}
      </main>
    </div>
  );
};
