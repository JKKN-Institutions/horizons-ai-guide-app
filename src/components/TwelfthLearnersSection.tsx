import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, GraduationCap } from "lucide-react";

const benefits = [
  "Career aptitude assessments tailored for 12th Learners",
  "Explore 100+ career options across Science, Commerce, and Arts",
  "Course and college suggestions based on your interests",
  "Scholarship and financial support information",
  "Guidance on admission processes",
];

const TwelfthLearnersSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-green-800 to-emerald-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-400/10 to-orange-500/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-400/10 to-teal-500/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Content */}
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-amber-400/30">
              <GraduationCap className="w-4 h-4" />
              For 12th Learners
            </span>
            
            <h2 className="font-serif text-4xl md:text-5xl font-bold italic text-white mb-6">
              Confused About Your Future After 12th?
            </h2>
            <p className="text-emerald-100/80 text-lg md:text-xl mb-10 leading-relaxed">
              AI Horizons is designed especially for 12th Learners who want clarity about their career path. Our AI-powered platform helps you discover your strengths and find the perfect course.
            </p>

            <ul className="space-y-4 mb-10 text-left max-w-xl mx-auto">
              {benefits.map((benefit, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-4 animate-fade-up bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-emerald-50/90 text-base">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button 
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/register/12th-learner?redirect=/career-assessment/12th-learners")}
            >
              Start Your Career Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwelfthLearnersSection;
