import { Brain, Compass, Briefcase, BookOpen, Users, MessageCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      title: t('services.careerAssessment'),
      description: t('services.careerAssessmentDesc'),
      icon: Brain,
      gradient: "from-amber-400 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
      borderColor: "border-amber-200 hover:border-amber-400",
      shadowColor: "shadow-amber-100",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop&auto=format",
    },
    {
      title: t('services.jobPortal'),
      description: t('services.jobPortalDesc'),
      icon: Briefcase,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200 hover:border-blue-400",
      shadowColor: "shadow-blue-100",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=200&fit=crop&auto=format",
    },
    {
      title: t('services.skillDevelopment'),
      description: t('services.skillDevelopmentDesc'),
      icon: BookOpen,
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
      borderColor: "border-purple-200 hover:border-purple-400",
      shadowColor: "shadow-purple-100",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&auto=format",
    },
    {
      title: t('services.expertCounseling'),
      description: t('services.expertCounselingDesc'),
      icon: Users,
      gradient: "from-rose-500 to-pink-600",
      bgGradient: "from-rose-50 to-pink-50",
      borderColor: "border-rose-200 hover:border-rose-400",
      shadowColor: "shadow-rose-100",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=200&fit=crop&auto=format",
    },
    {
      title: t('services.aiAssistant'),
      description: t('services.aiAssistantDesc'),
      icon: MessageCircle,
      gradient: "from-teal-500 to-cyan-600",
      bgGradient: "from-teal-50 to-cyan-50",
      borderColor: "border-teal-200 hover:border-teal-400",
      shadowColor: "shadow-teal-100",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30" id="services">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Compass className="w-4 h-4" />
            {t('services.badge')}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            {t('services.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('services.description')}
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
              
              {/* Service Image */}
              {service.image && (
                <div className="relative w-full h-32 rounded-xl overflow-hidden mb-4 -mt-1">
                  <img src={service.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.bgGradient} opacity-30`} />
                </div>
              )}
              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 -mt-10 ml-2 border-4 border-white`}>
                <service.icon className="w-7 h-7 text-white" />
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
