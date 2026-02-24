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
    title: "TNEA 2026 Counselling Schedule Released",
    titleTamil: "TNEA 2026 கலந்தாய்வு அட்டவணை வெளியானது",
    date: "2026-01-18",
    type: "important",
    link: "/tn-university-entrance/exam-calendar"
  },
  {
    id: 2,
    title: "Anna University Cutoffs Updated for 2024",
    titleTamil: "அண்ணா பல்கலைக்கழக கட்ஆஃப் 2024 புதுப்பிக்கப்பட்டது",
    date: "2026-01-15",
    type: "update",
    link: "/tn-university-entrance/anna-university"
  },
  {
    id: 3,
    title: "New Courses Added: AI & Data Science",
    titleTamil: "புதிய படிப்புகள்: AI & தரவு அறிவியல்",
    date: "2026-01-12",
    type: "new",
    link: "/tn-university-entrance"
  },
  {
    id: 4,
    title: "Scholarship Applications Open for SC/ST Students",
    titleTamil: "SC/ST மாணவர்களுக்கான உதவித்தொகை விண்ணப்பங்கள் திறக்கப்பட்டன",
    date: "2026-01-10",
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
      <section className="relative bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 py-10 md:py-14 px-4 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span className="text-white/90 text-sm font-medium">{universities.length}+ Universities • {totalCourses}+ Courses</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                Your Complete Guide to<br className="hidden md:block" /> TN Government College Admissions
              </h2>
              <p className="text-emerald-100/80 text-sm md:text-base max-w-xl leading-relaxed">
                Find your dream government college, check eligibility, view cutoffs, and track admission deadlines — all in one place.
              </p>
            </div>

            {/* Stats cards on hero */}
            <div className="grid grid-cols-2 gap-3 md:w-64 shrink-0">
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-white">{universities.length}+</p>
                <p className="text-[11px] text-emerald-200 uppercase tracking-wider">Universities</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-white">{totalCourses}+</p>
                <p className="text-[11px] text-emerald-200 uppercase tracking-wider">Courses</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-[11px] text-emerald-200 uppercase tracking-wider">Colleges</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-amber-300">Free</p>
                <p className="text-[11px] text-emerald-200 uppercase tracking-wider">100% Free</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-7 relative z-20">
        <div className="grid grid-cols-2 gap-4">
          {/* Explore Colleges */}
          <button
            onClick={() => navigate('/tn-university-entrance/browse')}
            className="group bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 p-5 flex items-center gap-4 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
              <Building2 className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-sm md:text-base text-gray-800">Explore Colleges</h3>
              <p className="text-xs text-gray-500">Browse all TN universities & courses</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-300 ml-auto group-hover:text-emerald-500 transition-colors shrink-0" />
          </button>

          {/* Admission Calendar */}
          <button
            onClick={() => navigate('/tn-university-entrance/exam-calendar')}
            className="group bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl hover:border-amber-200 transition-all duration-300 p-5 flex items-center gap-4 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
              <Calendar className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-sm md:text-base text-gray-800">Admission Calendar</h3>
              <p className="text-xs text-gray-500">Important dates & deadlines</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-300 ml-auto group-hover:text-amber-500 transition-colors shrink-0" />
          </button>
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
            <p>© 2026 TN Admissions Guide. Made with ❤️ for Tamil Nadu students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
