import { Button } from "@/components/ui/button";
import { MapPin, Banknote, GraduationCap } from "lucide-react";

const jobs = [
  {
    title: "Software Developer",
    company: "TCS",
    location: "Chennai",
    salary: "₹4-6 LPA",
    requirement: "Fresher",
  },
  {
    title: "Staff Nurse",
    company: "Apollo Hospitals",
    location: "Coimbatore",
    salary: "₹3-4 LPA",
    requirement: "B.Sc Nursing",
  },
  {
    title: "Clerk",
    company: "HDFC Bank",
    location: "Tamil Nadu",
    salary: "₹3-4 LPA",
    requirement: "Any Graduate",
  },
  {
    title: "Sales Executive",
    company: "Retail Partner",
    location: "Multiple Locations",
    salary: "₹15,000/month",
    requirement: "12th Pass",
  },
];

const JobsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-jkkn-dark" id="jobs">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold italic text-primary-foreground">
            Latest Job Openings
          </h2>
          <Button className="bg-jkkn-green-light hover:bg-jkkn-green-light/80 text-primary-foreground">
            View All Jobs
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="font-serif text-lg font-semibold text-card-foreground mb-2">
                {job.title}
              </h3>
              <p className="text-primary font-medium mb-4">{job.company}</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Banknote className="w-4 h-4" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GraduationCap className="w-4 h-4" />
                  {job.requirement}
                </div>
              </div>

              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                View Details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
