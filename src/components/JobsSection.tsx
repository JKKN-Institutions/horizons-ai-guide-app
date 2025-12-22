import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Banknote, GraduationCap, Briefcase, ArrowRight, Building2, Sparkles, TrendingUp, Brain, Cloud, Shield, Zap, HeartPulse, Megaphone, X, Search, ChevronLeft, ChevronRight, Bookmark } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const industryTrends = [
  { id: "ai", name: "AI & Machine Learning", growth: "+42%", value: 42, icon: Brain, color: "from-violet-500 to-purple-600", barColor: "bg-gradient-to-r from-violet-500 to-purple-500" },
  { id: "cloud", name: "Cloud Computing", growth: "+38%", value: 38, icon: Cloud, color: "from-sky-500 to-blue-600", barColor: "bg-gradient-to-r from-sky-500 to-blue-500" },
  { id: "cybersecurity", name: "Cybersecurity", growth: "+35%", value: 35, icon: Shield, color: "from-red-500 to-rose-600", barColor: "bg-gradient-to-r from-red-500 to-rose-500" },
  { id: "ev", name: "Electric Vehicles", growth: "+48%", value: 48, icon: Zap, color: "from-emerald-500 to-green-600", barColor: "bg-gradient-to-r from-emerald-500 to-green-500" },
  { id: "healthcare", name: "Healthcare Tech", growth: "+32%", value: 32, icon: HeartPulse, color: "from-pink-500 to-rose-500", barColor: "bg-gradient-to-r from-pink-500 to-rose-400" },
  { id: "marketing", name: "Digital Marketing", growth: "+28%", value: 28, icon: Megaphone, color: "from-amber-500 to-orange-600", barColor: "bg-gradient-to-r from-amber-500 to-orange-500" },
];

const cities = [
  "All Locations",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Mumbai",
  "Pune",
  "Delhi",
  "Noida",
  "Gurgaon",
  "Coimbatore",
  "Kolkata",
];

const jobs = [
  // AI & Machine Learning
  { title: "AI/ML Engineer", company: "Infosys", location: "Bangalore", salary: "₹8-15 LPA", requirement: "B.Tech/M.Tech", type: "Full-time", isHot: true, sector: "ai" },
  { title: "Data Scientist", company: "Wipro", location: "Hyderabad", salary: "₹10-18 LPA", requirement: "M.Sc/M.Tech", type: "Full-time", isHot: true, sector: "ai" },
  { title: "Machine Learning Engineer", company: "Google", location: "Bangalore", salary: "₹25-45 LPA", requirement: "M.Tech + Experience", type: "Full-time", isHot: true, sector: "ai" },
  { title: "AI Research Scientist", company: "Microsoft", location: "Hyderabad", salary: "₹20-35 LPA", requirement: "PhD/M.Tech", type: "Full-time", isHot: true, sector: "ai" },
  { title: "NLP Engineer", company: "Amazon", location: "Bangalore", salary: "₹15-28 LPA", requirement: "M.Tech + Python", type: "Full-time", isHot: false, sector: "ai" },
  
  // Cloud Computing
  { title: "Cloud Architect", company: "TCS", location: "Chennai", salary: "₹12-22 LPA", requirement: "B.Tech + AWS/Azure", type: "Full-time", isHot: true, sector: "cloud" },
  { title: "Full Stack Developer", company: "Cognizant", location: "Pune", salary: "₹6-12 LPA", requirement: "B.Tech/BCA", type: "Full-time", isHot: false, sector: "cloud" },
  { title: "DevOps Engineer", company: "Accenture", location: "Mumbai", salary: "₹8-16 LPA", requirement: "B.Tech + DevOps", type: "Full-time", isHot: true, sector: "cloud" },
  { title: "AWS Solutions Architect", company: "Deloitte", location: "Gurgaon", salary: "₹18-30 LPA", requirement: "AWS Certified", type: "Full-time", isHot: true, sector: "cloud" },
  { title: "Cloud Security Engineer", company: "IBM", location: "Bangalore", salary: "₹14-24 LPA", requirement: "B.Tech + Security", type: "Full-time", isHot: false, sector: "cloud" },
  
  // Cybersecurity
  { title: "Cybersecurity Analyst", company: "HCL Technologies", location: "Noida", salary: "₹7-14 LPA", requirement: "B.Tech + Certifications", type: "Full-time", isHot: true, sector: "cybersecurity" },
  { title: "Security Operations Engineer", company: "Cisco", location: "Bangalore", salary: "₹12-20 LPA", requirement: "B.Tech + CISSP", type: "Full-time", isHot: true, sector: "cybersecurity" },
  { title: "Penetration Tester", company: "Paytm", location: "Noida", salary: "₹10-18 LPA", requirement: "CEH Certified", type: "Full-time", isHot: false, sector: "cybersecurity" },
  { title: "Information Security Manager", company: "HDFC Bank", location: "Mumbai", salary: "₹15-25 LPA", requirement: "MBA + CISM", type: "Full-time", isHot: true, sector: "cybersecurity" },
  
  // Electric Vehicles
  { title: "Electric Vehicle Engineer", company: "Tata Motors", location: "Pune", salary: "₹8-16 LPA", requirement: "B.Tech Mechanical/EV", type: "Full-time", isHot: true, sector: "ev" },
  { title: "Battery Systems Engineer", company: "Ola Electric", location: "Bangalore", salary: "₹10-18 LPA", requirement: "B.Tech + Battery Tech", type: "Full-time", isHot: true, sector: "ev" },
  { title: "EV Powertrain Engineer", company: "Mahindra Electric", location: "Chennai", salary: "₹9-15 LPA", requirement: "B.Tech Electrical", type: "Full-time", isHot: true, sector: "ev" },
  { title: "Charging Infrastructure Lead", company: "Ather Energy", location: "Bangalore", salary: "₹12-20 LPA", requirement: "B.Tech + Experience", type: "Full-time", isHot: false, sector: "ev" },
  { title: "EV Software Developer", company: "TVS Motor", location: "Chennai", salary: "₹8-14 LPA", requirement: "B.Tech CS/IT", type: "Full-time", isHot: false, sector: "ev" },
  
  // Healthcare Tech
  { title: "Healthcare Data Analyst", company: "Apollo Hospitals", location: "Chennai", salary: "₹5-9 LPA", requirement: "B.Sc + Analytics", type: "Full-time", isHot: false, sector: "healthcare" },
  { title: "Medical AI Developer", company: "Practo", location: "Bangalore", salary: "₹12-20 LPA", requirement: "B.Tech + Healthcare", type: "Full-time", isHot: true, sector: "healthcare" },
  { title: "Health Informatics Specialist", company: "Fortis", location: "Delhi", salary: "₹8-14 LPA", requirement: "MHA/MBA Healthcare", type: "Full-time", isHot: false, sector: "healthcare" },
  { title: "Telemedicine Platform Lead", company: "1mg", location: "Gurgaon", salary: "₹15-25 LPA", requirement: "B.Tech + Experience", type: "Full-time", isHot: true, sector: "healthcare" },
  { title: "Clinical Data Manager", company: "Max Healthcare", location: "Delhi", salary: "₹6-11 LPA", requirement: "Life Sciences Degree", type: "Full-time", isHot: false, sector: "healthcare" },
  
  // Digital Marketing
  { title: "Digital Marketing Manager", company: "Flipkart", location: "Bangalore", salary: "₹6-12 LPA", requirement: "MBA Marketing", type: "Full-time", isHot: false, sector: "marketing" },
  { title: "SEO Specialist", company: "Zomato", location: "Gurgaon", salary: "₹5-10 LPA", requirement: "Any Graduate + SEO", type: "Full-time", isHot: false, sector: "marketing" },
  { title: "Performance Marketing Lead", company: "Swiggy", location: "Bangalore", salary: "₹12-20 LPA", requirement: "MBA + Google Ads", type: "Full-time", isHot: true, sector: "marketing" },
  { title: "Social Media Manager", company: "Myntra", location: "Bangalore", salary: "₹6-10 LPA", requirement: "Any Graduate", type: "Full-time", isHot: false, sector: "marketing" },
  { title: "Content Marketing Head", company: "Nykaa", location: "Mumbai", salary: "₹10-18 LPA", requirement: "MBA + Content", type: "Full-time", isHot: true, sector: "marketing" },
];

const JobsSection = () => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("All Locations");
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const jobsPerPage = 8;

  // Check auth state and load saved jobs
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id ?? null);
      if (session?.user?.id) {
        loadSavedJobs(session.user.id);
      } else {
        setSavedJobs(new Set());
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id ?? null);
      if (session?.user?.id) {
        loadSavedJobs(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadSavedJobs = async (uid: string) => {
    const { data, error } = await supabase
      .from('saved_jobs')
      .select('job_title, job_company')
      .eq('user_id', uid);
    
    if (!error && data) {
      const savedSet = new Set(data.map(job => `${job.job_title}-${job.job_company}`));
      setSavedJobs(savedSet);
    }
  };

  const getJobKey = (job: typeof jobs[0]) => `${job.title}-${job.company}`;

  const toggleSaveJob = async (job: typeof jobs[0]) => {
    if (!userId) {
      toast({
        title: "Login Required",
        description: "Please login to save jobs",
        variant: "destructive",
      });
      return;
    }

    const jobKey = getJobKey(job);
    setIsLoading(jobKey);

    if (savedJobs.has(jobKey)) {
      // Unsave job
      const { error } = await supabase
        .from('saved_jobs')
        .delete()
        .eq('user_id', userId)
        .eq('job_title', job.title)
        .eq('job_company', job.company);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to remove job from saved list",
          variant: "destructive",
        });
      } else {
        setSavedJobs(prev => {
          const next = new Set(prev);
          next.delete(jobKey);
          return next;
        });
        toast({
          title: "Job Removed",
          description: "Job removed from your saved list",
        });
      }
    } else {
      // Save job
      const { error } = await supabase
        .from('saved_jobs')
        .insert({
          user_id: userId,
          job_title: job.title,
          job_company: job.company,
          job_location: job.location,
          job_salary: job.salary,
          job_requirement: job.requirement,
          job_sector: job.sector,
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save job",
          variant: "destructive",
        });
      } else {
        setSavedJobs(prev => new Set(prev).add(jobKey));
        toast({
          title: "Job Saved",
          description: "Job added to your saved list",
        });
      }
    }
    setIsLoading(null);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSector = selectedSector ? job.sector === selectedSector : true;
    const matchesLocation = selectedLocation === "All Locations" ? true : job.location === selectedLocation;
    const matchesSearch = searchQuery 
      ? job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesSector && matchesSearch && matchesLocation;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  const selectedTrend = industryTrends.find(t => t.id === selectedSector);

  const clearFilters = () => {
    setSelectedSector(null);
    setSearchQuery("");
    setSelectedLocation("All Locations");
    setCurrentPage(1);
  };

  // Reset to page 1 when filters change
  const handleSectorChange = (sector: string | null) => {
    setSelectedSector(sector);
    setCurrentPage(1);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const hasActiveFilters = selectedSector || searchQuery || selectedLocation !== "All Locations";
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
          <div className="flex items-center gap-3">
            <Link to="/saved-jobs">
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold px-5 py-6 rounded-xl transition-all duration-300">
                <Bookmark className="w-4 h-4 mr-2" />
                Saved Jobs
              </Button>
            </Link>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-6 py-6 rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all duration-300 group">
              View All Jobs
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Industry Trends Stats */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-semibold text-white">Industry Growth Trends 2026</h3>
            </div>
            <p className="text-xs text-emerald-100/60">Click to filter jobs by sector</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industryTrends.map((trend, index) => (
              <button
                key={trend.id}
                onClick={() => handleSectorChange(selectedSector === trend.id ? null : trend.id)}
                className={`group text-left bg-white/10 backdrop-blur-sm border rounded-xl p-4 transition-all duration-300 animate-fade-up cursor-pointer ${
                  selectedSector === trend.id 
                    ? "border-amber-400 bg-white/20 ring-2 ring-amber-400/50" 
                    : "border-white/20 hover:bg-white/20"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${trend.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <trend.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-100/70 line-clamp-1">{trend.name}</p>
                    <p className="text-lg font-bold text-white">{trend.growth}</p>
                  </div>
                </div>
                {/* Animated Progress Bar */}
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${trend.barColor} rounded-full transition-all duration-1000 ease-out`}
                    style={{ 
                      width: `${(trend.value / 50) * 100}%`,
                      animation: `growBar 1.5s ease-out ${index * 0.15}s forwards`,
                    }}
                  />
                </div>
                <p className="text-[10px] text-emerald-100/50 mt-2">Projected Job Growth</p>
              </button>
            ))}
          </div>
        </div>

        {/* Search Box and Location Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search jobs by title, company..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-12 pr-10 py-6 bg-white/95 backdrop-blur-sm border-0 rounded-xl text-gray-800 placeholder:text-gray-400 shadow-lg focus-visible:ring-2 focus-visible:ring-amber-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Location Dropdown */}
          <Select value={selectedLocation} onValueChange={handleLocationChange}>
            <SelectTrigger className="w-full sm:w-[200px] py-6 bg-white/95 backdrop-blur-sm border-0 rounded-xl text-gray-800 shadow-lg focus:ring-2 focus:ring-amber-400">
              <MapPin className="w-4 h-4 text-gray-400 mr-2" />
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent className="bg-white border-0 shadow-xl rounded-xl z-50">
              {cities.map((city) => (
                <SelectItem 
                  key={city} 
                  value={city}
                  className="hover:bg-emerald-50 focus:bg-emerald-50 cursor-pointer"
                >
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active Filter Indicator */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-3 animate-fade-in">
            <span className="text-white/80 text-sm">Active filters:</span>
            
            {selectedTrend && (
              <span className={`inline-flex items-center gap-2 bg-gradient-to-r ${selectedTrend.color} text-white text-sm font-semibold px-4 py-2 rounded-full`}>
                <selectedTrend.icon className="w-4 h-4" />
                {selectedTrend.name}
                <button 
                  onClick={() => setSelectedSector(null)}
                  className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            
            {selectedLocation !== "All Locations" && (
              <span className="inline-flex items-center gap-2 bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                <MapPin className="w-3.5 h-3.5" />
                {selectedLocation}
                <button 
                  onClick={() => setSelectedLocation("All Locations")}
                  className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            
            {searchQuery && (
              <span className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full">
                <Search className="w-3.5 h-3.5" />
                "{searchQuery}"
                <button 
                  onClick={() => setSearchQuery("")}
                  className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            
            <span className="text-white/60 text-sm">({filteredJobs.length} jobs found)</span>
            
            <button
              onClick={clearFilters}
              className="text-amber-300 hover:text-amber-200 text-sm underline underline-offset-2 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedJobs.map((job, index) => {
            const jobKey = getJobKey(job);
            const isSaved = savedJobs.has(jobKey);
            const isSaving = isLoading === jobKey;
            
            return (
              <div
                key={`${job.title}-${job.company}-${index}`}
                className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-up hover:-translate-y-2 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Top badges row */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  {/* Bookmark button */}
                  <button
                    onClick={() => toggleSaveJob(job)}
                    disabled={isSaving}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSaved 
                        ? "bg-amber-500 text-white shadow-md" 
                        : "bg-gray-100 text-gray-400 hover:bg-amber-100 hover:text-amber-500"
                    } ${isSaving ? "opacity-50" : ""}`}
                    title={isSaved ? "Remove from saved" : "Save job"}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                  </button>
                  
                  {/* Hot badge */}
                  {job.isHot && (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                      <Sparkles className="w-3 h-3" />
                      Hot
                    </span>
                  )}
                </div>

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
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page 
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0" 
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  }
                >
                  {page}
                </Button>
              ))}
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-white/60 text-sm">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredJobs.length)} of {filteredJobs.length} jobs
            </p>
          </div>
        )}

        {/* No jobs message */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/70 text-lg">No jobs found matching your criteria. Try adjusting your filters.</p>
            <Button 
              variant="outline" 
              className="mt-4 border-white/30 text-white hover:bg-white/10"
              onClick={clearFilters}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobsSection;