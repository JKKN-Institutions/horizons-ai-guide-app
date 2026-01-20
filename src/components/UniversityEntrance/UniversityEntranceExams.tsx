import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Calendar, BarChart3, Bell, GraduationCap, 
  CheckCircle, Building2, ChevronRight, Star, Clock, 
  TrendingUp, Users, ArrowRight, Sparkles, Quote, ArrowLeft
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { universities } from '@/data/university-entrance-data';
import { UniversityCard } from './UniversityCard';
import { StudentProfileForm } from './StudentProfileForm';
import { EligibleUniversities } from './EligibleUniversities';
import { checkEligibility } from './EligibilityChecker';
import { StudentProfile, EligibilityResult } from './eligibilityTypes';
import { useLanguage } from '@/hooks/useLanguage';
import GlobalLanguageSelector from '@/components/GlobalLanguageSelector';

// Success stories data
const successStories = [
  {
    id: 1,
    name: "Priya Selvaraj",
    nameTamil: "பிரியா செல்வராஜ்",
    college: "Anna University, Chennai",
    course: "B.E. Computer Science",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    quote: "This app helped me find the right course based on my 12th marks. Got admission in my dream college!",
    quoteTamil: "இந்த ஆப் எனது 12ஆம் வகுப்பு மதிப்பெண்களின் அடிப்படையில் சரியான படிப்பைக் கண்டறிய உதவியது."
  },
  {
    id: 2,
    name: "Karthik Murugan",
    nameTamil: "கார்த்திக் முருகன்",
    college: "Madurai Kamaraj University",
    course: "B.Sc. Physics",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik",
    quote: "The cutoff analyzer saved me so much time. I knew exactly which colleges I could get into.",
    quoteTamil: "கட்ஆஃப் பகுப்பாய்வி எனக்கு நிறைய நேரத்தைச் சேமித்தது."
  },
  {
    id: 3,
    name: "Lakshmi Devi",
    nameTamil: "லக்ஷ்மி தேவி",
    college: "Bharathiar University",
    course: "B.Com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshmi",
    quote: "As a first-generation learner, I had no guidance. This app was my complete guide!",
    quoteTamil: "முதல் தலைமுறை மாணவியாக எனக்கு வழிகாட்டுதல் இல்லை. இந்த ஆப் என் முழு வழிகாட்டி!"
  }
];

// Recent updates data
const recentUpdates = [
  {
    id: 1,
    title: "TNEA 2025 Counselling Schedule Released",
    titleTamil: "TNEA 2025 கலந்தாய்வு அட்டவணை வெளியானது",
    date: "2025-01-18",
    type: "important",
    link: "/tn-university-entrance/exam-calendar"
  },
  {
    id: 2,
    title: "Anna University Cutoffs Updated for 2024",
    titleTamil: "அண்ணா பல்கலைக்கழக கட்ஆஃப் 2024 புதுப்பிக்கப்பட்டது",
    date: "2025-01-15",
    type: "update",
    link: "/tn-university-entrance/anna-university"
  },
  {
    id: 3,
    title: "New Courses Added: AI & Data Science",
    titleTamil: "புதிய படிப்புகள்: AI & தரவு அறிவியல்",
    date: "2025-01-12",
    type: "new",
    link: "/tn-university-entrance"
  },
  {
    id: 4,
    title: "Scholarship Applications Open for SC/ST Students",
    titleTamil: "SC/ST மாணவர்களுக்கான உதவித்தொகை விண்ணப்பங்கள் திறக்கப்பட்டன",
    date: "2025-01-10",
    type: "important",
    link: "/scholarships"
  }
];

export const UniversityEntranceExams = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showEligibility, setShowEligibility] = useState(false);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [eligibilityResults, setEligibilityResults] = useState<EligibilityResult[]>([]);
  const [currentStory, setCurrentStory] = useState(0);

  const handleProfileComplete = (profile: StudentProfile) => {
    setStudentProfile(profile);
    const results = checkEligibility(profile);
    setEligibilityResults(results);
  };

  const handleReset = () => {
    setStudentProfile(null);
    setEligibilityResults([]);
    setShowEligibility(false);
  };

  const totalCourses = universities.reduce((acc, uni) => acc + uni.courses.length, 0);

  // If showing eligibility checker
  if (showEligibility) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg">TN Admissions</h1>
                <p className="text-xs text-muted-foreground font-tamil">தமிழ்நாடு சேர்க்கை</p>
              </div>
            </div>
            <GlobalLanguageSelector />
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            onClick={handleReset}
            className="mb-4"
          >
            ← Back to Home
          </Button>
          
          {!studentProfile ? (
            <StudentProfileForm onProfileComplete={handleProfileComplete} />
          ) : (
            <EligibleUniversities 
              profile={studentProfile}
              results={eligibilityResults}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/career-assessment/colleges')} className="h-10 w-10 rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">TN Admissions</h1>
              <p className="text-xs text-muted-foreground font-tamil">தமிழ்நாடு சேர்க்கை</p>
            </div>
          </div>
          <GlobalLanguageSelector />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-2xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            {universities.length}+ Universities • {totalCourses}+ Courses
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
            Your Complete Guide to TN Government College Admissions
          </h2>
          <p className="text-lg text-muted-foreground font-tamil mb-2">
            தமிழ்நாடு அரசு கல்லூரி சேர்க்கைக்கான முழுமையான வழிகாட்டி
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find your dream government college, check eligibility, view cutoffs, and track admission deadlines — all in one place.
          </p>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {/* Check Eligibility */}
          <Card 
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20"
            onClick={() => setShowEligibility(true)}
          >
            <CardContent className="p-4 md:p-6 text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 rounded-2xl bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle className="h-7 w-7 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-semibold text-sm md:text-base mb-1">Check Eligibility</h3>
              <p className="text-xs text-muted-foreground font-tamil">தகுதி சரிபார்க்க</p>
            </CardContent>
          </Card>

          {/* Explore Colleges */}
          <Card 
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20"
            onClick={() => navigate('/tn-university-entrance/browse')}
          >
            <CardContent className="p-4 md:p-6 text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 rounded-2xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building2 className="h-7 w-7 md:h-8 md:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-sm md:text-base mb-1">Explore Colleges</h3>
              <p className="text-xs text-muted-foreground font-tamil">கல்லூரிகளை ஆராய</p>
            </CardContent>
          </Card>

          {/* View Cutoffs */}
          <Card 
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20"
            onClick={() => navigate('/tn-university-entrance/compare')}
          >
            <CardContent className="p-4 md:p-6 text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 rounded-2xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="h-7 w-7 md:h-8 md:w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-sm md:text-base mb-1">View Cutoffs</h3>
              <p className="text-xs text-muted-foreground font-tamil">கட்ஆஃப் பார்க்க</p>
            </CardContent>
          </Card>

          {/* Admission Calendar */}
          <Card 
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20"
            onClick={() => navigate('/tn-university-entrance/exam-calendar')}
          >
            <CardContent className="p-4 md:p-6 text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 rounded-2xl bg-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="h-7 w-7 md:h-8 md:w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-sm md:text-base mb-1">Admission Calendar</h3>
              <p className="text-xs text-muted-foreground font-tamil">சேர்க்கை நாட்காட்டி</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted/30 rounded-2xl p-4 md:p-6">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-foreground">{universities.length}+</p>
            <p className="text-sm text-muted-foreground">Universities</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-foreground">{totalCourses}+</p>
            <p className="text-sm text-muted-foreground">Courses</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-foreground">500+</p>
            <p className="text-sm text-muted-foreground">Colleges</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-foreground">Free</p>
            <p className="text-sm text-muted-foreground">100% Free</p>
          </div>
        </div>
      </section>

      {/* Quick Stats - Real-time Admission Statistics */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Quick Stats
            </h3>
            <p className="text-sm text-muted-foreground font-tamil">நேரடி புள்ளிவிவரங்கள்</p>
          </div>
          <Badge variant="secondary" className="animate-pulse">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
            Live
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Admission Statistics */}
          <Card className="border-primary/20">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                Admission Statistics 2025
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Applications Received</span>
                  <span className="font-semibold text-foreground">2,45,000+</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Seats Filled</span>
                  <span className="font-semibold text-foreground">1,85,000</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '65%' }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average Cutoff (OC)</span>
                  <span className="font-semibold text-foreground">185.5</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t">
                  <div className="text-center">
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">↑ 12%</p>
                    <p className="text-xs text-muted-foreground">Engineering</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">↑ 8%</p>
                    <p className="text-xs text-muted-foreground">Medical</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-orange-600 dark:text-orange-400">↑ 15%</p>
                    <p className="text-xs text-muted-foreground">Arts & Science</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trending Courses */}
          <Card className="border-primary/20">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Trending Courses
              </h4>
              <div className="space-y-3">
                {[
                  { name: 'B.E. Computer Science', demand: 95, growth: '+25%', color: 'bg-primary' },
                  { name: 'B.E. AI & Data Science', demand: 92, growth: '+45%', color: 'bg-emerald-500' },
                  { name: 'MBBS', demand: 90, growth: '+8%', color: 'bg-rose-500' },
                  { name: 'B.E. Electronics & Comm.', demand: 85, growth: '+12%', color: 'bg-orange-500' },
                  { name: 'B.Sc. Computer Science', demand: 80, growth: '+18%', color: 'bg-violet-500' },
                ].map((course, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground w-5">{index + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{course.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {course.growth}
                        </Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className={`${course.color} h-1.5 rounded-full transition-all`} style={{ width: `${course.demand}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-4 text-primary"
                onClick={() => navigate('/tn-university-entrance/browse')}
              >
                View All Courses <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Recent Updates
            </h3>
            <p className="text-sm text-muted-foreground font-tamil">சமீபத்திய செய்திகள்</p>
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="space-y-3">
          {recentUpdates.map((update) => (
            <Card 
              key={update.id} 
              className="cursor-pointer hover:shadow-md transition-all"
              onClick={() => navigate(update.link)}
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  update.type === 'important' ? 'bg-destructive' :
                  update.type === 'new' ? 'bg-primary' : 'bg-secondary'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-1">{update.title}</p>
                  <p className="text-xs text-muted-foreground font-tamil line-clamp-1">{update.titleTamil}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                  <Clock className="h-3 w-3" />
                  {new Date(update.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Success Stories Carousel */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Success Stories
            </h3>
            <p className="text-sm text-muted-foreground font-tamil">வெற்றிக் கதைகள்</p>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-none">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img 
                src={successStories[currentStory].image}
                alt={successStories[currentStory].name}
                className="w-20 h-20 rounded-full border-4 border-primary/20"
              />
              <div className="flex-1 text-center md:text-left">
                <Quote className="h-8 w-8 text-primary/30 mb-2 mx-auto md:mx-0" />
                <p className="text-muted-foreground mb-2 italic">
                  "{successStories[currentStory].quote}"
                </p>
                <p className="text-xs text-muted-foreground font-tamil mb-3">
                  "{successStories[currentStory].quoteTamil}"
                </p>
                <div>
                  <p className="font-semibold">{successStories[currentStory].name}</p>
                  <p className="text-sm text-muted-foreground">
                    {successStories[currentStory].course} • {successStories[currentStory].college}
                  </p>
                </div>
              </div>
            </div>

            {/* Carousel dots */}
            <div className="flex justify-center gap-2 mt-6">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStory ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button 
            variant="outline" 
            className="h-auto py-3 flex flex-col items-center gap-1"
            onClick={() => navigate('/tn-university-entrance/mock-test')}
          >
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-xs">Mock Tests</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-3 flex flex-col items-center gap-1"
            onClick={() => navigate('/tn-university-entrance/study-planner')}
          >
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-xs">Study Planner</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-3 flex flex-col items-center gap-1"
            onClick={() => navigate('/tn-university-entrance/forum')}
          >
            <Users className="h-5 w-5 text-primary" />
            <span className="text-xs">Forum</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-3 flex flex-col items-center gap-1"
            onClick={() => navigate('/scholarships')}
          >
            <Star className="h-5 w-5 text-primary" />
            <span className="text-xs">Scholarships</span>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/tn-university-entrance/browse" className="hover:text-primary transition">All Universities</a></li>
                <li><a href="/tn-university-entrance/exam-calendar" className="hover:text-primary transition">Exam Calendar</a></li>
                <li><a href="/scholarships" className="hover:text-primary transition">Scholarships</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" onClick={(e) => { e.preventDefault(); setShowEligibility(true); }} className="hover:text-primary transition">Eligibility Checker</a></li>
                <li><a href="/tn-university-entrance/compare" className="hover:text-primary transition">Compare Colleges</a></li>
                <li><a href="/tn-university-entrance/mock-test" className="hover:text-primary transition">Mock Tests</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/tn-university-entrance/forum" className="hover:text-primary transition">Community Forum</a></li>
                <li><a href="#" className="hover:text-primary transition">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">About</h4>
              <p className="text-sm text-muted-foreground">
                Free admission guidance for 12th standard students in Tamil Nadu.
              </p>
              <p className="text-xs text-muted-foreground font-tamil mt-2">
                தமிழ்நாட்டில் 12ஆம் வகுப்பு மாணவர்களுக்கான இலவச சேர்க்கை வழிகாட்டல்.
              </p>
            </div>
          </div>

          <div className="border-t mt-6 pt-6 text-center text-sm text-muted-foreground">
            <p>© 2025 TN Admissions Guide. Made with ❤️ for Tamil Nadu students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
