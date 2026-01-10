import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, ChevronDown } from "lucide-react";
import heroCampus from "@/assets/hero-campus.jpg";
import { useChatModal } from "@/hooks/useChatModal";
import { useLanguage } from "@/hooks/useLanguage";

const HeroSection = () => {
  const navigate = useNavigate();
  const { openChat } = useChatModal();
  const { t, language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.4;

  return (
    <section className="relative h-[calc(100vh-180px)] min-h-[500px] flex items-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ 
          backgroundImage: `url(${heroCampus})`,
          transform: `translateY(${parallaxOffset}px) scale(1.1)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-green-800/90 to-emerald-900/85"></div>
        {/* Decorative elements with subtle floating animation */}
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-400/15 to-orange-500/5 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"
          style={{ 
            animation: 'float-slow 20s ease-in-out infinite',
          }} 
        />
        <div 
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-400/10 to-teal-500/5 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"
          style={{ 
            animation: 'float-slow 25s ease-in-out infinite reverse',
          }} 
        />
        <div 
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
          style={{ 
            animation: 'pulse-subtle 8s ease-in-out infinite',
          }} 
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        
        {/* CSS for animations */}
        <style>{`
          @keyframes float-slow {
            0%, 100% { transform: translate(25%, -25%) scale(1); }
            50% { transform: translate(20%, -20%) scale(1.05); }
          }
          @keyframes pulse-subtle {
            0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
          }
        `}</style>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-white space-y-5">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm text-amber-300 px-4 py-2 rounded-full text-sm font-semibold border border-amber-400/30 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              {t('hero.badge')}
            </span>

            <div className="space-y-3">
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold italic animate-fade-up tracking-tight" style={{ animationDelay: '0.1s' }}>
                {t('hero.title')}
              </h1>

              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold italic animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  {t('hero.subtitle')}
                </span>
              </h2>

              <p className="font-tamil text-lg md:text-xl lg:text-2xl text-emerald-100/90 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                {t('hero.tamilSubtitle')}
              </p>
            </div>

            <p className="text-base md:text-lg text-emerald-50/80 max-w-2xl leading-relaxed animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap justify-center gap-3 animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <Button 
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-5 py-3 text-sm rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105"
                onClick={() => navigate("/register/12th-learner?redirect=/career-assessment/12th-learners")}
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                {t('hero.register12th')}
              </Button>
            </div>

          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 animate-fade-up" style={{ animationDelay: '0.8s' }}>
        <button 
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors duration-300 group cursor-pointer"
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-wider font-medium">{t('hero.exploreMore')}</span>
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/60 transition-all duration-300 group-hover:bg-white/10">
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
