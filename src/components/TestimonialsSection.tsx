import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    name: "T.Gokilavani",
    role: "Class 12, Government Higher Secondary School, Veppadai",
    quote: "This app helped me understand my strengths and explore suitable career options.",
    avatar: "TG",
    gradient: "from-rose-400 to-pink-500",
    date: "28/01/2026"
  },
  {
    name: "Chandru.S",
    role: "Class 12, Government Boys Higher Secondary School, Kumarapalayam",
    quote: "I was confused about my future before using this app. Now I feel more confident in my choices.",
    avatar: "CS",
    gradient: "from-violet-400 to-purple-500",
    date: "06/01/2026"
  },
  {
    name: "K. Karthick",
    role: "Class 12, Pallipalayam Boys Higher Secondary School",
    quote: "The power of AI combined with expert guidance made me realize the importance of choosing the right career path early. VAZHIKATTI is a game-changer.",
    avatar: "KK",
    gradient: "from-blue-400 to-indigo-500",
    date: "28/11/2025"
  },
  {
    name: "M.G. Bharanee Dharan",
    role: "Class 12, Government Higher Secondary School (Boys), Chithode",
    quote: "Thanks to the career discovery sessions, I now have a clear roadmap for my future. The AI assistant helped me understand which courses align with my interests.",
    avatar: "MB",
    gradient: "from-emerald-400 to-green-500",
    date: "05/12/2025"
  },
  {
    name: "Mahalakshmi.V",
    role: "Class 12, Government Higher Secondary School, Anupparpalayam, Tirupur",
    quote: "VAZHIKATTI opened my eyes to career options I never knew existed. The AI assessment matched me with courses that truly fit my skills, and now I have a clear plan for my future after 12th.",
    avatar: "MV",
    gradient: "from-amber-400 to-orange-500",
    date: "08/01/2026"
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = testimonials.length;

  const goTo = (index: number) => {
    setActiveIndex(((index % totalSlides) + totalSlides) % totalSlides);
  };

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveIndex(p => (p + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(id);
  }, [isPaused, totalSlides]);

  const getVisible = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(testimonials[(activeIndex + i) % totalSlides]);
    }
    return items;
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-emerald-900">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(16,185,129,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(245,158,11,0.15) 0%, transparent 50%)'
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            What Our Learners Say
          </h2>
          <p className="text-emerald-200/70 max-w-md mx-auto">
            Real feedback from students across Tamil Nadu
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative max-w-5xl mx-auto px-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Arrows */}
          <button
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {getVisible().map((t, index) => (
              <div key={`${activeIndex}-${index}`} className="testimonial-slide">
                <div className="bg-white rounded-2xl p-6 h-full flex flex-col shadow-lg shadow-black/10">
                  {/* Top: quote icon + stars */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center shadow-sm`}>
                      <Quote className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-[15px] leading-relaxed text-gray-700 flex-1 mb-5">
                    "{t.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-bold text-xs">{t.avatar}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900 text-[14px]">{t.name}</p>
                      <p className="text-[12px] text-gray-500 leading-tight mt-0.5">{t.role}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{t.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 h-2 bg-amber-400"
                    : "w-2 h-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-10 md:gap-20 mt-12">
          {[
            { value: "500+", label: "Students Guided" },
            { value: "50+", label: "Schools Reached" },
            { value: "98%", label: "Satisfaction Rate" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-emerald-300/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonial-slide {
          animation: slideUp 0.5s ease-out;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
