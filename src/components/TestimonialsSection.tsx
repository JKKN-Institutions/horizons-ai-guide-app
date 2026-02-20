import { Quote, Star, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "T.Gokilavani",
    role: "Class 12, Government Higher Secondary School, Veppadai",
    quote: "This app helped me understand my strengths and explore suitable career options.",
    avatar: "TG",
    color: "from-pink-500 to-rose-500",
    rating: 5,
    date: "28/01/2026"
  },
  {
    name: "Chandru.S",
    role: "Class 12, Government Boys Higher Secondary School, Kumarapalayam",
    quote: "I was confused about my future before using this app. Now I feel more confident in my choices.",
    avatar: "CS",
    color: "from-violet-500 to-purple-500",
    rating: 5,
    date: "06/01/2026"
  },
  {
    name: "K. Karthick",
    role: "Class 12, Pallipalayam Boys Higher Secondary School",
    quote: "The power of AI combined with expert guidance made me realize the importance of choosing the right career path early. VAZHIKATTI is a game-changer.",
    avatar: "KK",
    color: "from-blue-500 to-cyan-500",
    rating: 5,
    date: "28/11/2025"
  },
  {
    name: "M.G. Bharanee Dharan",
    role: "Class 12, Government Higher Secondary School (Boys), Chithode",
    quote: "Thanks to the career discovery sessions, I now have a clear roadmap for my future. The AI assistant helped me understand which courses align with my interests.",
    avatar: "MB",
    color: "from-emerald-500 to-teal-500",
    rating: 5,
    date: "05/12/2025"
  },
  {
    name: "Mahalakshmi.V",
    role: "Class 12, Government Higher Secondary School, Anupparpalayam, Tirupur",
    quote: "VAZHIKATTI opened my eyes to career options I never knew existed. The AI assessment matched me with courses that truly fit my skills, and now I have a clear plan for my future after 12th.",
    avatar: "MV",
    color: "from-orange-500 to-amber-500",
    rating: 5,
    date: "08/01/2026"
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-green-800 to-emerald-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-400/10 to-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-400/10 to-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-amber-400/30">
            <Sparkles className="w-4 h-4" />
            Success Stories
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold italic text-white mb-4">
            What Our 12th Learners Say
          </h2>
          <p className="text-emerald-100/70 max-w-2xl mx-auto text-lg">
            Real reflections from Learners who experienced JKKN100 and discovered new AI-powered career possibilities.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white/95 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-up hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Decorative gradient line */}
              <div className={`absolute top-0 left-6 right-6 h-1 bg-gradient-to-r ${testimonial.color} rounded-full opacity-80`} />
              
              {/* Quote icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${testimonial.color} mb-5 shadow-lg`}>
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Quote text */}
              <p className="text-gray-600 mb-6 leading-relaxed text-base">
                "{testimonial.quote}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{testimonial.name}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{testimonial.role}</p>
                  {testimonial.date && (
                    <p className="text-xs text-gray-400 mt-0.5">{testimonial.date}</p>
                  )}
                </div>
              </div>

              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: "500+", label: "Students Guided" },
            { value: "50+", label: "Schools Reached" },
            { value: "98%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <div key={index} className="text-center animate-fade-up" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-emerald-200/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
