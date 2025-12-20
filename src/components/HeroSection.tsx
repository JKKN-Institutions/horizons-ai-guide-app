import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Briefcase, GraduationCap } from "lucide-react";
import heroCampus from "@/assets/hero-campus.jpg";
import { useChatModal } from "@/hooks/useChatModal";

const HeroSection = () => {
  const navigate = useNavigate();
  const { openChat } = useChatModal();

  return (
    <section className="relative min-h-[calc(100vh-140px)] flex items-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroCampus})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-green-800/90 to-emerald-900/85"></div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-400/15 to-orange-500/5 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-400/10 to-teal-500/5 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 py-8 lg:py-10">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Left Content - 3 columns */}
          <div className="lg:col-span-3 text-white">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm text-amber-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-amber-400/30 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              JKKN CAREER PATH - 2026-2032
            </span>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold italic mb-2 animate-fade-up tracking-tight" style={{ animationDelay: '0.1s' }}>
              JKKN AI Horizons:
            </h1>

            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold italic mb-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Discover, Design, Do
              </span>
            </h2>

            <p className="font-tamil text-lg md:text-xl lg:text-2xl text-emerald-100/90 mb-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              கண்டறி, வடிவமை, செய்
            </p>

            <p className="text-base md:text-lg text-emerald-50/80 max-w-2xl mb-6 leading-relaxed animate-fade-up" style={{ animationDelay: '0.4s' }}>
              Empowering JKKN Learners & 12th Learners with AI-powered career guidance, skill development and placement opportunities across 9 institutions.
            </p>

            <div className="flex flex-wrap gap-3 mb-6 animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <Button 
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-5 py-5 text-sm rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105"
                onClick={() => navigate("/register/12th-learner?redirect=/career-assessment/12th-learners")}
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Register as 12th Learner
              </Button>
              <Button 
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-5 py-5 text-sm rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105"
                onClick={() => navigate("/register/learner")}
              >
                <Users className="w-4 h-4 mr-2" />
                Register as JKKN Learner
              </Button>
              <Button 
                className="bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white hover:text-emerald-800 font-semibold px-5 py-5 text-sm rounded-xl transition-all duration-300 hover:scale-105"
                onClick={() => navigate("/register/employer")}
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Register as Employee
              </Button>
            </div>

            <div className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: '0.6s' }}>
              <span className="text-xs text-emerald-100/70">AI-powered guidance for every Learner journey</span>
              <Button 
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 text-xs rounded-full px-4 py-1.5 transition-all duration-300 group"
                onClick={openChat}
              >
                <Sparkles className="w-3 h-3 mr-1.5 group-hover:animate-pulse" />
                Try JKKN AI Assistant
              </Button>
            </div>
          </div>

          {/* Right Sidebar - 2 columns */}
          <div className="lg:col-span-2 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-5 space-y-4 border border-white/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-serif text-lg font-bold text-gray-800">
                  Who is this for?
                </h3>
              </div>

              <div className="space-y-2">
                <div className="group flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 hover:border-amber-300 transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-200 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">12th Learners</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Discover careers, explore courses, and plan your future with AI guidance.
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 hover:border-emerald-300 transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Learners</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Find your dream job, build skills, and connect with top employers.
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:border-blue-300 transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Employers</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Hire talented graduates from JKKN's 9 institutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
