import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "R. Priya",
    role: "Class 12, JKKN Rangammal Girls Higher Secondary School, Kumarapalayam",
    quote: "The JKKN100 workshop opened my eyes to so many career possibilities I never knew existed. The AI-powered assessments helped me discover my true strengths.",
  },
  {
    name: "R. Josmitha",
    role: "Class 12, Sankagiri Girls Higher Secondary School",
    quote: "I learned how AI is transforming various fields from healthcare to finance. This platform made me confident about pursuing a career in technology.",
  },
  {
    name: "K. Karthick",
    role: "Class 12, Pallipalayam Boys Higher Secondary School",
    quote: "The power of AI combined with expert guidance made me realize the importance of choosing the right career path early. JKKN AI Horizons is a game-changer.",
  },
  {
    name: "M.G. Bharanee Dharan",
    role: "Class 12, Government Higher Secondary School (Boys), Chithode",
    quote: "Thanks to the career discovery sessions, I now have a clear roadmap for my future. The AI assistant helped me understand which courses align with my interests.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="font-serif text-3xl md:text-4xl font-bold italic text-primary-foreground mb-4">
            What Our 12th Learners Say
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Real reflections from Learners who experienced JKKN100 and discovered new AI-powered career possibilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="w-8 h-8 text-secondary/30 mb-4" />
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
