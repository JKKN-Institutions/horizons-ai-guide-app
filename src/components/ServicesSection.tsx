import { Brain, Compass, Briefcase, BookOpen, Users, MessageCircle } from "lucide-react";

const services = [
  {
    title: "Career Assessment",
    description: "AI-powered psychometric tests to discover your personality, strengths, and best-fit careers.",
    icon: Brain,
    gradient: "from-amber-400 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200 hover:border-amber-400",
    shadowColor: "shadow-amber-100",
  },
  {
    title: "Career Path Finder",
    description: "Explore what to do after 10th & 12th, with clear education paths mapped to real careers.",
    icon: Compass,
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200 hover:border-emerald-400",
    shadowColor: "shadow-emerald-100",
  },
  {
    title: "Job Portal",
    description: "Apply to curated jobs, internships, and 12th-pass roles with a single profile.",
    icon: Briefcase,
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200 hover:border-blue-400",
    shadowColor: "shadow-blue-100",
  },
  {
    title: "Skill Development",
    description: "Learn technical, communication, and life skills with focused courses and practice tasks.",
    icon: BookOpen,
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-50 to-violet-50",
    borderColor: "border-purple-200 hover:border-purple-400",
    shadowColor: "shadow-purple-100",
  },
  {
    title: "Expert Counseling",
    description: "Book one-on-one sessions with Senior Learners and counselors to clarify doubts.",
    icon: Users,
    gradient: "from-rose-500 to-pink-600",
    bgGradient: "from-rose-50 to-pink-50",
    borderColor: "border-rose-200 hover:border-rose-400",
    shadowColor: "shadow-rose-100",
  },
  {
    title: "AI Career Assistant",
    description: "Ask JKKN AI anything about careers, courses, jobs, or JKKN admissions—24/7.",
    icon: MessageCircle,
    gradient: "from-teal-500 to-cyan-600",
    bgGradient: "from-teal-50 to-cyan-50",
    borderColor: "border-teal-200 hover:border-teal-400",
    shadowColor: "shadow-teal-100",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30" id="services">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Compass className="w-4 h-4" />
            Complete Support System
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            Your Complete Career Journey
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From self-discovery to job offers, JKKN AI Horizons supports every stage of your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative bg-gradient-to-br ${service.bgGradient} rounded-2xl p-7 border-2 ${service.borderColor} transition-all duration-500 hover:shadow-xl hover:${service.shadowColor} hover:-translate-y-2 animate-fade-up overflow-hidden cursor-pointer`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Decorative gradient orb */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
              
              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="relative font-serif text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                {service.title}
              </h3>
              
              <p className="relative text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Hover arrow indicator */}
              <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 shadow-md">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
