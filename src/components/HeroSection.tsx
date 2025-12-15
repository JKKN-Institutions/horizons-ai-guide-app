import { Button } from "@/components/ui/button";
import { Sparkles, Users, Briefcase, GraduationCap } from "lucide-react";
import heroCampus from "@/assets/hero-campus.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroCampus})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 py-12">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Left Content - 3 columns */}
          <div className="lg:col-span-3 text-primary-foreground">
            <span className="inline-block bg-secondary/20 text-secondary px-4 py-1 rounded-full text-sm font-semibold mb-6 animate-fade-up">
              JKKN CAREER PATH - 2026-2032
            </span>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold italic mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              JKKN AI Horizons:
            </h1>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold italic text-accent mb-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Discover, Design, Do
            </h2>

            <p className="font-tamil text-xl md:text-2xl text-primary-foreground/90 mb-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              கண்டறி, வடிவமை, செய்
            </p>

            <p className="text-lg text-primary-foreground/80 max-w-2xl mb-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              Empowering JKKN Learners & 12th Learners with AI-powered career guidance, skill development and placement opportunities across 9 institutions.
            </p>

            <div className="flex flex-wrap gap-4 mb-8 animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-6 py-6 text-base">
                <GraduationCap className="w-5 h-5 mr-2" />
                Register as 12th Learner
              </Button>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-6 py-6 text-base">
                <Users className="w-5 h-5 mr-2" />
                Register as Learner
              </Button>
              <Button className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold px-6 py-6 text-base">
                <Briefcase className="w-5 h-5 mr-2" />
                Register as Employer
              </Button>
            </div>

            <div className="flex items-center gap-4 animate-fade-up" style={{ animationDelay: '0.6s' }}>
              <span className="text-sm text-primary-foreground/70">AI-powered guidance for every Learner journey</span>
              <Button variant="outline" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Try JKKN AI Assistant
              </Button>
            </div>
          </div>

          {/* Right Sidebar - 2 columns */}
          <div className="lg:col-span-2 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-card rounded-2xl shadow-elevated p-6 space-y-6">
              <h3 className="font-serif text-xl font-semibold text-card-foreground mb-4">
                Who is this for?
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-secondary" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Confused about what to do after 12th? Discover careers, explore courses, and plan your future with AI guidance.
                  </p>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Find your dream job, build in-demand skills, and connect with top employers across India.
                  </p>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Hire talented graduates and 12th Learners from JKKN's 9 institutions through a curated, AI-informed talent pool.
                  </p>
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
