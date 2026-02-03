import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Sparkles } from "lucide-react";

const events = [
  {
    title: "JKKN Mega Job Fair 2025",
    date: "15 Feb 2025",
    location: "JKKN Campus, Komarapalayam",
  },
  {
    title: "Career Guidance Workshop for 12th Learners",
    date: "20 Feb 2025",
    location: "Rangammal Girls Higher Secondary School",
  },
  {
    title: "Healthcare Career Summit",
    date: "5 Mar 2025",
    location: "JKKN College of Nursing",
  },
];

const exampleQuestions = [
  "What can I do after 12th Science (PCB)?",
  "How do I improve my resume for IT jobs?",
  "Tell me about JKKN Nursing courses.",
];

const EventsAndAISection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30" id="events">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Events Section */}
          <div className="animate-fade-up">
            <h2 className="font-serif text-3xl md:text-4xl font-bold italic text-foreground mb-8">
              Upcoming Events & Job Fairs
            </h2>

            <div className="space-y-4">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="font-serif text-lg font-semibold text-card-foreground mb-3">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-secondary" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-secondary" />
                      {event.location}
                    </div>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Register
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* AI Assistant Card */}
          <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-card rounded-2xl p-8 shadow-elevated h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center animate-pulse-slow">
                  <Sparkles className="w-6 h-6 text-accent-foreground" />
                </div>
                <h2 className="font-serif text-2xl font-bold italic text-card-foreground">
                  Meet Your AI Career Guide
                </h2>
              </div>

              <p className="text-muted-foreground mb-6">
                Get instant answers to all your career questions. Our AI Assistant is available 24/7 to help you navigate your career journey.
              </p>

              <div className="bg-primary/5 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium text-foreground mb-3">
                  Example questions you can ask:
                </p>
                <ul className="space-y-2">
                  {exampleQuestions.map((question, index) => (
                    <li
                      key={index}
                      className="text-sm text-muted-foreground bg-background rounded-lg px-4 py-2"
                    >
                      "{question}"
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg">
                <Sparkles className="w-5 h-5 mr-2" />
                Open VAZHIKATTI AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsAndAISection;
