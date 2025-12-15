import { Brain, Compass, Briefcase, BookOpen, Users, MessageCircle } from "lucide-react";

const services = [
  {
    title: "Career Assessment",
    description: "AI-powered psychometric tests to discover your personality, strengths, and best-fit careers.",
    icon: Brain,
    accent: "secondary",
  },
  {
    title: "Career Path Finder",
    description: "Explore what to do after 10th & 12th, with clear education paths mapped to real careers.",
    icon: Compass,
    accent: "primary",
  },
  {
    title: "Job Portal",
    description: "Apply to curated jobs, internships, and 12th-pass roles with a single profile.",
    icon: Briefcase,
    accent: "primary",
  },
  {
    title: "Skill Development",
    description: "Learn technical, communication, and life skills with focused courses and practice tasks.",
    icon: BookOpen,
    accent: "primary",
  },
  {
    title: "Expert Counseling",
    description: "Book one-on-one sessions with Senior Learners and counselors to clarify doubts.",
    icon: Users,
    accent: "secondary",
  },
  {
    title: "AI Career Assistant",
    description: "Ask JKKN AI anything about careers, courses, jobs, or JKKN admissions—24/7.",
    icon: MessageCircle,
    accent: "accent",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30" id="services">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Complete Career Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From self-discovery to job offers, JKKN AI Horizons supports every stage of your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 border-l-4 border-secondary animate-fade-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                service.accent === 'secondary' ? 'bg-secondary/10' :
                service.accent === 'accent' ? 'bg-accent/20' : 'bg-primary/10'
              }`}>
                <service.icon className={`w-7 h-7 ${
                  service.accent === 'secondary' ? 'text-secondary' :
                  service.accent === 'accent' ? 'text-accent-foreground' : 'text-primary'
                }`} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-card-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
