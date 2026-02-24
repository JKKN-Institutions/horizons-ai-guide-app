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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50/50 to-amber-50/30 page-transition">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-green-700 to-emerald-800">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-500/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-teal-500/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/2" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.04%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        </div>
        
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <Button 
            variant="ghost" 
            className="text-white/80 hover:text-white hover:bg-white/15 mb-6 rounded-xl transition-all duration-300 group"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>
          
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-3">
              Career Assessment Center for Learners
            </h1>
            <p className="text-lg md:text-xl text-amber-300 font-tamil mb-4">
              கல்லூரி கற்றவர்களுக்கான வாழ்க்கை மதிப்பீட்டு மையம்
            </p>
            <p className="text-emerald-100/90 text-base md:text-lg max-w-2xl leading-relaxed">
              Discover your strengths, interests and find the perfect college for your future
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-br from-emerald-50 via-green-50/50 to-amber-50/30 rounded-t-[2rem]" />
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <PillNavigation activeTab={activeTab} />
        {children}
      </div>
    </div>
  );
};
