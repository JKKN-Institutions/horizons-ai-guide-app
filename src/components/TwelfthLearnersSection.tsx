import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, School, ExternalLink, GraduationCap } from "lucide-react";

// Import institution logos
import casLogo from "@/assets/institutions/jkkn-cas-logo.png";
import enggLogo from "@/assets/institutions/jkkn-engg-logo.svg";
import pharmacyLogo from "@/assets/institutions/jkkn-pharmacy-logo.png";
import dentalLogo from "@/assets/institutions/jkkn-dental-logo.png";
import nursingLogo from "@/assets/institutions/jkkn-nursing-logo.png";
import ahsLogo from "@/assets/institutions/jkkn-ahs-logo.png";
import eduLogo from "@/assets/institutions/jkkn-edu-logo.png";

const benefits = [
  "Career aptitude assessments tailored for 12th Learners",
  "Explore 100+ career options across Science, Commerce, and Arts",
  "Course and college suggestions based on your interests",
  "Scholarship and financial support information",
  "Guidance on JKKN and external admission processes",
];

const institutions = [
  { 
    name: "JKKN College of Arts & Science", 
    url: "https://cas.jkkn.ac.in/",
    logo: casLogo,
    color: "from-blue-500 to-indigo-600"
  },
  { 
    name: "JKKN College of Engineering and Technology", 
    url: "https://engg.jkkn.ac.in/",
    logo: enggLogo,
    color: "from-emerald-500 to-green-600"
  },
  { 
    name: "JKKN College of Pharmacy", 
    url: "https://pharmacy.jkkn.ac.in/",
    logo: pharmacyLogo,
    color: "from-purple-500 to-violet-600"
  },
  { 
    name: "JKKN Dental College and Hospital", 
    url: "https://dental.jkkn.ac.in/",
    logo: dentalLogo,
    color: "from-rose-500 to-pink-600"
  },
  { 
    name: "JKKN College of Nursing", 
    url: "https://nursing.sresakthimayeil.jkkn.ac.in/",
    logo: nursingLogo,
    color: "from-red-500 to-rose-600"
  },
  { 
    name: "JKKN College of Allied Health Science", 
    url: "https://ahs.jkkn.ac.in/",
    logo: ahsLogo,
    color: "from-teal-500 to-cyan-600"
  },
  { 
    name: "JKKN College of Education", 
    url: "https://edu.jkkn.ac.in/",
    logo: eduLogo,
    color: "from-amber-500 to-orange-600"
  },
  { 
    name: "JKKN Matriculation Higher Secondary School", 
    url: "https://school.jkkn.ac.in/",
    logo: null, // School uses a different modern website without traditional logo
    color: "from-pink-500 to-rose-600"
  },
];

const TwelfthLearnersSection = () => {
  const navigate = useNavigate();

  const handleInstitutionClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-green-800 to-emerald-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-400/10 to-orange-500/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-400/10 to-teal-500/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
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

            <ul className="space-y-4 mb-10">
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

          {/* Right Card - Institutions */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200">
                <School className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-gray-800">
                  JKKN Institutions
                </h3>
                <p className="text-gray-500 text-sm">
                  8 institutions. One integrated platform.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {institutions.map((institution, index) => (
                <button
                  key={index}
                  onClick={() => handleInstitutionClick(institution.url)}
                  className="group w-full text-left px-4 py-3.5 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-100 hover:border-emerald-300 hover:from-emerald-50 hover:to-green-50 transition-all duration-300 animate-fade-up flex items-center gap-3 hover:shadow-lg hover:shadow-emerald-100"
                  style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                >
                  {/* Logo or Fallback Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-md border border-gray-100 group-hover:scale-110 transition-transform duration-300 overflow-hidden`}>
                    {institution.logo ? (
                      <img 
                        src={institution.logo} 
                        alt={`${institution.name} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${institution.color} flex items-center justify-center`}>
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  <span className="flex-1 text-gray-700 font-medium text-sm group-hover:text-emerald-700 transition-colors">
                    {institution.name}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwelfthLearnersSection;
