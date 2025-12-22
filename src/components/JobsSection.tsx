import { Button } from "@/components/ui/button";
import { MapPin, Banknote, GraduationCap, Briefcase, ArrowRight, Building2, Sparkles, TrendingUp, Brain, Cloud, Shield, Zap, HeartPulse, Megaphone } from "lucide-react";

const industryTrends = [
  { name: "AI & Machine Learning", growth: "+42%", icon: Brain, color: "from-violet-500 to-purple-600" },
  { name: "Cloud Computing", growth: "+38%", icon: Cloud, color: "from-sky-500 to-blue-600" },
  { name: "Cybersecurity", growth: "+35%", icon: Shield, color: "from-red-500 to-rose-600" },
  { name: "Electric Vehicles", growth: "+48%", icon: Zap, color: "from-emerald-500 to-green-600" },
  { name: "Healthcare Tech", growth: "+32%", icon: HeartPulse, color: "from-pink-500 to-rose-500" },
  { name: "Digital Marketing", growth: "+28%", icon: Megaphone, color: "from-amber-500 to-orange-600" },
];

const jobs = [
  {
    title: "AI/ML Engineer",
    company: "Infosys",
    location: "Bangalore",
    salary: "₹8-15 LPA",
    requirement: "B.Tech/M.Tech",
    type: "Full-time",
    isHot: true,
  },
  {
    title: "Data Scientist",
    company: "Wipro",
    location: "Hyderabad",
    salary: "₹10-18 LPA",
    requirement: "M.Sc/M.Tech",
    type: "Full-time",
    isHot: true,
  },
  {
    title: "Cloud Architect",
    company: "TCS",
    location: "Chennai",
    salary: "₹12-22 LPA",
    requirement: "B.Tech + AWS/Azure",
    type: "Full-time",
    isHot: true,
  },
  {
    title: "Cybersecurity Analyst",
    company: "HCL Technologies",
    location: "Noida",
    salary: "₹7-14 LPA",
    requirement: "B.Tech + Certifications",
    type: "Full-time",
    isHot: true,
  },
  {
    title: "Full Stack Developer",
    company: "Cognizant",
    location: "Pune",
    salary: "₹6-12 LPA",
    requirement: "B.Tech/BCA",
    type: "Full-time",
    isHot: false,
  },
  {
    title: "Healthcare Data Analyst",
    company: "Apollo Hospitals",
    location: "Chennai",
    salary: "₹5-9 LPA",
    requirement: "B.Sc + Analytics",
    type: "Full-time",
    isHot: false,
  },
  {
    title: "Electric Vehicle Engineer",
    company: "Tata Motors",
    location: "Pune",
    salary: "₹8-16 LPA",
    requirement: "B.Tech Mechanical/EV",
    type: "Full-time",
    isHot: true,
  },
  {
    title: "Digital Marketing Manager",
    company: "Flipkart",
    location: "Bangalore",
    salary: "₹6-12 LPA",
    requirement: "MBA Marketing",
    type: "Full-time",
    isHot: false,
  },
];

const JobsSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id="jobs">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-green-800 to-emerald-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-400/10 to-orange-500/5 rounded-full blur-3xl transform -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-emerald-400/10 to-teal-500/5 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-14">
          <div>
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-amber-400/30">
              <Briefcase className="w-4 h-4" />
              India's Job Market 2026
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold italic text-white">
              Trending Career Opportunities
            </h2>
            <p className="text-emerald-100/80 mt-3 max-w-xl">
              Explore high-demand roles in AI, Cloud, EV, Healthcare & more
            </p>
          </div>
          <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-6 py-6 rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all duration-300 group">
            View All Jobs
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Industry Trends Stats */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">Industry Growth Trends 2026</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industryTrends.map((trend, index) => (
              <div
                key={trend.name}
                className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${trend.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <trend.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs text-emerald-100/70 mb-1 line-clamp-1">{trend.name}</p>
                <p className="text-xl font-bold text-emerald-400">{trend.growth}</p>
                <p className="text-[10px] text-emerald-100/50">Job Growth</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-up hover:-translate-y-2 relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hot badge */}
              {job.isHot && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                    <Sparkles className="w-3 h-3" />
                    Hot
                  </span>
                </div>
              )}

              {/* Company icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-7 h-7 text-emerald-600" />
              </div>

              <h3 className="font-serif text-xl font-bold text-gray-800 mb-1 group-hover:text-emerald-700 transition-colors">
                {job.title}
              </h3>
              <p className="text-emerald-600 font-semibold mb-4">{job.company}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-gray-500" />
                  </div>
                  {job.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Banknote className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="font-semibold text-gray-800">{job.salary}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                  </div>
                  {job.requirement}
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl py-5 shadow-lg shadow-amber-200 hover:shadow-amber-300 transition-all duration-300">
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
