import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, BarChart3, Bell, Bookmark, Lightbulb, CalendarCheck, FileText, TrendingUp, Flame } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { universities } from '@/data/university-entrance-data';
import { UniversityCard } from './UniversityCard';
import { QuickToolCard } from './QuickToolCard';

export const UniversityEntranceExams = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.nameTamil.includes(searchQuery) ||
    uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.examName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          Complete guide with syllabus, pattern & previous questions
        </p>
      </div>

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
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search universities, exams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl"
        />
      </div>

      {/* University Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUniversities.map((university) => (
          <UniversityCard
            key={university.id}
            university={university}
            onClick={() => navigate(`/tn-university-entrance/${university.id}`)}
          />
        ))}
      </div>

      {filteredUniversities.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No universities found matching your search.</p>
        </div>
      )}
    </div>
  );
};
