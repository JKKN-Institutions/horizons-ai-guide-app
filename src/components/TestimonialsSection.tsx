import { Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    name: "T.Gokilavani",
    role: "Class 12, Government Higher Secondary School, Veppadai",
    quote: "This app helped me understand my strengths and explore suitable career options.",
    avatar: "TG",
    color: "bg-pink-500",
    date: "28/01/2026"
  },
  {
    name: "Chandru.S",
    role: "Class 12, Government Boys Higher Secondary School, Kumarapalayam",
    quote: "I was confused about my future before using this app. Now I feel more confident in my choices.",
    avatar: "CS",
    color: "bg-violet-500",
    date: "06/01/2026"
  },
  {
    name: "K. Karthick",
    role: "Class 12, Pallipalayam Boys Higher Secondary School",
    quote: "The power of AI combined with expert guidance made me realize the importance of choosing the right career path early. VAZHIKATTI is a game-changer.",
    avatar: "KK",
    color: "bg-blue-500",
    date: "28/11/2025"
  },
  {
    name: "M.G. Bharanee Dharan",
    role: "Class 12, Government Higher Secondary School (Boys), Chithode",
    quote: "Thanks to the career discovery sessions, I now have a clear roadmap for my future. The AI assistant helped me understand which courses align with my interests.",
    avatar: "MB",
    color: "bg-emerald-500",
    date: "05/12/2025"
  },
  {
    name: "Mahalakshmi.V",
    role: "Class 12, Government Higher Secondary School, Anupparpalayam, Tirupur",
    quote: "VAZHIKATTI opened my eyes to career options I never knew existed. The AI assessment matched me with courses that truly fit my skills, and now I have a clear plan for my future after 12th.",
    avatar: "MV",
    color: "bg-orange-500",
    date: "08/01/2026"
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = testimonials.length;
  const indexRef = useRef(activeIndex);
  indexRef.current = activeIndex;

  const goTo = (index: number) => {
    setActiveIndex(((index % totalSlides) + totalSlides) % totalSlides);
  };

  const prev = () => goTo(indexRef.current - 1);
  const next = () => goTo(indexRef.current + 1);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(id);
  }, [isPaused, totalSlides]);

  // Get 3 visible cards (circular)
  const getVisible = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(testimonials[(activeIndex + i) % totalSlides]);
    }
    return items;
  };

  const visible = getVisible();

  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            Success Stories
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            What Our Learners Say
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm">
            Real feedback from students who discovered their career path with VAZHIKATTI.
          </p>
        </div>

        {/* Cards */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute -left-4 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute -right-4 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>

          {/* Cards grid - 1 on mobile, 3 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {visible.map((t, index) => (
              <div
                key={`${activeIndex}-${index}`}
                className="animate-fade-in"
              >
                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-900 text-sm leading-relaxed flex-1 mb-4">
                    "{t.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-semibold text-xs">{t.avatar}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-black text-sm">{t.name}</p>
                      <p className="text-xs text-gray-700 leading-snug">{t.role}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{t.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-emerald-600" : "w-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 md:gap-14 mt-10 pt-8 border-t border-gray-100">
          {[
            { value: "500+", label: "Students Guided" },
            { value: "50+", label: "Schools Reached" },
            { value: "98%", label: "Satisfaction Rate" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-xl md:text-2xl font-bold text-emerald-700">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
