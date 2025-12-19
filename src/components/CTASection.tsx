import { ArrowRight, Sparkles, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.1)_100%)]" />
      
      {/* Floating icons */}
      <div className="absolute top-10 left-[15%] animate-bounce" style={{ animationDelay: "0s", animationDuration: "3s" }}>
        <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
          <GraduationCap className="w-6 h-6 text-white/80" />
        </div>
      </div>
      <div className="absolute bottom-20 right-[20%] animate-bounce" style={{ animationDelay: "1s", animationDuration: "3.5s" }}>
        <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
          <Briefcase className="w-6 h-6 text-white/80" />
        </div>
      </div>
      <div className="absolute top-1/3 right-[10%] animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "4s" }}>
        <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
          <Sparkles className="w-6 h-6 text-white/80" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium text-white">Start Your Journey Today</span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Ready to Shape Your{" "}
            <span className="relative">
              <span className="relative z-10">Future?</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-accent/40 -rotate-1" />
            </span>
          </h2>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of students who have discovered their perfect career path with JKKN. 
            Take the first step towards a brighter tomorrow.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg"
              onClick={() => navigate("/register/12th-learner")}
              className="group relative bg-white text-primary hover:bg-white px-8 py-6 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)] active:scale-95 overflow-hidden"
            >
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <GraduationCap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative">Register as Learner</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate("/register/employer")}
              className="group relative border-2 border-white/30 bg-white/5 text-white hover:bg-white/15 hover:border-white/60 px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
            >
              {/* Glow pulse effect */}
              <span className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
              <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
              <Briefcase className="w-5 h-5 mr-2 group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">Partner With Us</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm mb-4">Trusted by leading institutions and companies</p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/40">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm">50+ Partner Companies</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-sm">10,000+ Alumni Network</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-sm">95% Placement Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
