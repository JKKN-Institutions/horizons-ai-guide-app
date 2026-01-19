import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, BarChart3, Bell, Bookmark, Lightbulb, CalendarCheck, FileText, TrendingUp, Flame, Sparkles, Gift, MessageSquare, Target, Trophy, GraduationCap, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { universities } from '@/data/university-entrance-data';
import { UniversityCard } from './UniversityCard';
import { QuickToolCard } from './QuickToolCard';
import { StudentProfileForm } from './StudentProfileForm';
import { EligibleUniversities } from './EligibleUniversities';
import { checkEligibility } from './EligibilityChecker';
import { StudentProfile, EligibilityResult } from './eligibilityTypes';

export const UniversityEntranceExams = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'eligibility' | 'browse'>('eligibility');
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [eligibilityResults, setEligibilityResults] = useState<EligibilityResult[]>([]);

  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.nameTamil.includes(searchQuery) ||
    uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.examName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProfileComplete = (profile: StudentProfile) => {
    setStudentProfile(profile);
    const results = checkEligibility(profile);
    setEligibilityResults(results);
  };

  const handleReset = () => {
    setStudentProfile(null);
    setEligibilityResults([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center justify-center gap-2">
          🏛️ TN University Entrance Exams
        </h2>
        <p className="text-muted-foreground font-tamil mt-1">
          தமிழ்நாடு பல்கலைக்கழக நுழைவுத் தேர்வுகள்
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Find eligible universities based on your 12th marks & community
        </p>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="eligibility" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Check Eligibility</span>
            <span className="hidden sm:inline text-xs font-tamil">(தகுதி சோதனை)</span>
          </TabsTrigger>
          <TabsTrigger value="browse" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Browse All</span>
            <span className="hidden sm:inline text-xs font-tamil">(அனைத்தும்)</span>
          </TabsTrigger>
        </TabsList>

        {/* Eligibility Tab */}
        <TabsContent value="eligibility" className="space-y-6">
          {!studentProfile ? (
            <StudentProfileForm onProfileComplete={handleProfileComplete} />
          ) : (
            <EligibleUniversities 
              profile={studentProfile}
              results={eligibilityResults}
              onReset={handleReset}
            />
          )}
        </TabsContent>

        {/* Browse Tab */}
        <TabsContent value="browse" className="space-y-6">
          {/* Quick Tools - Row 1 */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <QuickToolCard
              icon={Calendar}
              title="Exam Calendar"
              titleTamil="தேர்வு நாட்காட்டி"
              onClick={() => navigate('/tn-university-entrance/exam-calendar')}
              color="#6a0dad"
            />
            <QuickToolCard
              icon={BarChart3}
              title="Compare"
              titleTamil="ஒப்பீடு"
              onClick={() => navigate('/tn-university-entrance/compare')}
              color="#059669"
            />
            <QuickToolCard
              icon={Bell}
              title="Reminders"
              titleTamil="நினைவூட்டல்"
              onClick={() => navigate('/tn-university-entrance/my-reminders')}
              color="#f59e0b"
            />
          </div>

          {/* Quick Tools - Row 2 */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <QuickToolCard
              icon={Bookmark}
              title="Saved Questions"
              titleTamil="சேமித்த கேள்விகள்"
              onClick={() => navigate('/tn-university-entrance/saved-questions')}
              color="#dc2626"
            />
            <QuickToolCard
              icon={Lightbulb}
              title="Prep Tips"
              titleTamil="தயாரிப்பு குறிப்புகள்"
              onClick={() => navigate('/tn-university-entrance/preparation-tips')}
              color="#0891b2"
            />
            <QuickToolCard
              icon={CalendarCheck}
              title="Study Planner"
              titleTamil="படிப்பு திட்டம்"
              onClick={() => navigate('/tn-university-entrance/study-planner')}
              color="#7c3aed"
            />
          </div>

          {/* Quick Tools - Row 3: New Features */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <QuickToolCard
              icon={FileText}
              title="Mock Test"
              titleTamil="போலித் தேர்வு"
              onClick={() => navigate('/tn-university-entrance/mock-test')}
              color="#16a34a"
            />
            <QuickToolCard
              icon={TrendingUp}
              title="Analytics"
              titleTamil="பகுப்பாய்வு"
              onClick={() => navigate('/tn-university-entrance/analytics')}
              color="#2563eb"
            />
            <QuickToolCard
              icon={Flame}
              title="Streaks"
              titleTamil="தொடர்ச்சி"
              onClick={() => navigate('/tn-university-entrance/streaks')}
              color="#ea580c"
            />
            <QuickToolCard
              icon={Sparkles}
              title="AI Questions"
              titleTamil="AI கேள்விகள்"
              onClick={() => navigate('/tn-university-entrance/ai-questions')}
              color="#8b5cf6"
            />
          </div>

          {/* Quick Tools - Row 4 */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <QuickToolCard
              icon={Gift}
              title="Daily Challenge"
              titleTamil="தினசரி சவால்"
              onClick={() => navigate('/tn-university-entrance/daily-challenge')}
              color="#ec4899"
            />
            <QuickToolCard
              icon={MessageSquare}
              title="Forum"
              titleTamil="கலந்துரையாடல்"
              onClick={() => navigate('/tn-university-entrance/forum')}
              color="#14b8a6"
            />
            <QuickToolCard
              icon={Target}
              title="Weak Topics"
              titleTamil="பலவீன தலைப்புகள்"
              onClick={() => navigate('/tn-university-entrance/weak-topics')}
              color="#f97316"
            />
            <QuickToolCard
              icon={Trophy}
              title="Leaderboard"
              titleTamil="தரவரிசை"
              onClick={() => navigate('/tn-university-entrance/leaderboard')}
              color="#eab308"
            />
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search universities... (பல்கலைக்கழகங்களைத் தேடுங்கள்)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-between px-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {filteredUniversities.length} Universities
            </span>
            <span>
              {filteredUniversities.reduce((acc, uni) => acc + uni.courses.length, 0)} Courses
            </span>
          </div>

          {/* Universities Grid */}
          {filteredUniversities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUniversities.map((university) => (
                <UniversityCard 
                  key={university.id} 
                  university={university} 
                  onClick={() => navigate(`/tn-university-entrance/${university.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No universities found</p>
              <p className="text-sm">Try a different search term</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
