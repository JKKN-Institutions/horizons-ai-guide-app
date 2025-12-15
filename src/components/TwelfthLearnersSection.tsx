import { Button } from "@/components/ui/button";
import { CheckCircle, School } from "lucide-react";

const benefits = [
  "Career aptitude assessments tailored for 12th Learners",
  "Explore 100+ career options across Science, Commerce, and Arts",
  "Course and college suggestions based on your interests",
  "Scholarship and financial support information",
  "Guidance on JKKN and external admission processes",
];

const institutions = [
  "JKKN College of Arts & Science",
  "JKKN College of Engineering and Technology",
  "JKKN College of Pharmacy",
  "JKKN Dental College and Hospital",
  "JKKN College of Nursing",
  "JKKN College of Allied Health Science",
  "JKKN College of Education",
  "JKKN Rangammal Girls Higher Secondary School",
  "JKKN Matric School",
];

const TwelfthLearnersSection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="animate-fade-up">
            <h2 className="font-serif text-3xl md:text-4xl font-bold italic mb-6">
              Confused About Your Future After 12th?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              JKKN AI Horizons is designed especially for 12th Learners who want clarity about their career path. Our AI-powered platform helps you discover your strengths and find the perfect course.
            </p>

            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/90">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg">
              Start Your Career Journey
            </Button>
          </div>

          {/* Right Card */}
          <div className="bg-primary/50 border-2 border-jkkn-green-light rounded-2xl p-6 md:p-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-4">
              <School className="w-8 h-8 text-accent" />
              <h3 className="font-serif text-xl font-bold text-accent">
                JKKN Institutions Supporting Your Journey
              </h3>
            </div>
            <p className="text-primary-foreground/70 mb-6">
              9 institutions. One integrated AI-powered career platform.
            </p>

            <div className="space-y-3">
              {institutions.map((institution, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-3 rounded-lg bg-primary/80 border border-jkkn-green-light text-primary-foreground text-sm hover:bg-jkkn-green-light/50 transition-all duration-200 animate-fade-up"
                  style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                >
                  {institution}
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
