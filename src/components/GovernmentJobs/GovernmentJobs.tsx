import { useState, useMemo } from 'react';
import { 
  Search, Calendar, IndianRupee, Users, ExternalLink, 
  ChevronDown, ChevronUp, Bookmark, Shield, Building2, 
  Train, FileText, Landmark, MapPin, GraduationCap, Briefcase, X,
  BookOpen, Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { governmentExams, categoryInfo } from './governmentExamsData';
import { GovernmentExam, CategoryType, SalaryRangeType, StatusType } from './types';
import { PreparationTipsSection } from './PreparationTipsSection';
import { SalaryComparisonChart } from './SalaryComparisonChart';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

export const GovernmentJobs = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedStatus, setSelectedStatus] = useState<StatusType>('all');
  const [expandedExam, setExpandedExam] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const [savedExams, setSavedExams] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('govtJobs_saved') || '[]'); } catch { return []; }
  });

  const toggleSave = (examId: string) => {
    setSavedExams(prev => {
      const updated = prev.includes(examId) ? prev.filter(id => id !== examId) : [...prev, examId];
      localStorage.setItem('govtJobs_saved', JSON.stringify(updated));
      return updated;
    });
  };

  const filteredExams = useMemo(() => {
    return governmentExams.filter(exam => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!exam.name.toLowerCase().includes(q) && !exam.nameTamil.includes(q) && !exam.description.toLowerCase().includes(q)) return false;
      }
      if (selectedCategory !== 'all' && exam.category !== selectedCategory) return false;
      if (selectedStatus !== 'all' && exam.applicationStatus !== selectedStatus) return false;
      return true;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  const formatSalary = (min: number, max: number) => {
    const fmt = (n: number) => n >= 100000 ? `₹${(n/100000).toFixed(1)}L` : `₹${(n/1000).toFixed(0)}K`;
    return `${fmt(min)} - ${fmt(max)}`;
  };

  const statusBadge = (status: string) => {
    if (status === 'open') return <Badge className="bg-green-100 text-green-700 text-[10px] border-0">🟢 {language === 'ta' ? 'திறந்தது' : 'Open'}</Badge>;
    if (status === 'upcoming') return <Badge className="bg-amber-100 text-amber-700 text-[10px] border-0">🟡 {language === 'ta' ? 'வரவிருக்கிறது' : 'Upcoming'}</Badge>;
    return <Badge className="bg-red-100 text-red-700 text-[10px] border-0">🔴 {language === 'ta' ? 'மூடப்பட்டது' : 'Closed'}</Badge>;
  };

  const catEmojis: Record<string, string> = { defence: '🪖', railway: '🚂', ssc: '📋', banking: '🏦', state: '🏛️', central: '🇮🇳' };
  const catLabels: Record<string, { en: string; ta: string }> = {
    all: { en: 'All', ta: 'அனைத்தும்' },
    defence: { en: 'Defence', ta: 'பாதுகாப்பு' },
    railway: { en: 'Railway', ta: 'ரயில்வே' },
    ssc: { en: 'SSC', ta: 'SSC' },
    banking: { en: 'Banking', ta: 'வங்கி' },
    state: { en: 'TN State', ta: 'மாநிலம்' },
    central: { en: 'Central', ta: 'மத்திய' },
  };

  return (
    <div className="space-y-4">
      {/* ── TITLE ── */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
          <Landmark className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-lg text-gray-800">
            {language === 'ta' ? 'அரசு வேலைகள்' : 'Government Jobs'}
          </h2>
          <p className="text-xs text-gray-500">
            {language === 'ta' ? '12ஆம் வகுப்பு தகுதி மட்டும் — பட்டம் தேவையில்லை!' : '12th Pass only — No graduation needed!'}
          </p>
        </div>
        <Badge className="ml-auto bg-green-100 text-green-700 border-0 text-xs">
          {governmentExams.length} {language === 'ta' ? 'தேர்வுகள்' : 'exams'}
        </Badge>
      </div>

      {/* ── CATEGORY PILLS ── */}
      <div className="overflow-x-auto pb-1 -mx-1 px-1">
        <div className="flex gap-2 min-w-max">
          {(['all', 'defence', 'railway', 'ssc', 'banking', 'state', 'central'] as CategoryType[]).map((cat) => {
            const isActive = selectedCategory === cat;
            const label = language === 'ta' ? catLabels[cat]?.ta : catLabels[cat]?.en;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-sm whitespace-nowrap transition-all",
                  isActive
                    ? "bg-amber-600 text-white border-amber-600 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-amber-300 hover:bg-amber-50"
                )}
              >
                {cat !== 'all' && <span>{catEmojis[cat]}</span>}
                <span className="font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STATUS QUICK FILTERS ── */}
      <div className="flex gap-2">
        {([
          { id: 'all', label: language === 'ta' ? 'அனைத்தும்' : 'All' },
          { id: 'open', label: language === 'ta' ? '🟢 திறந்தது' : '🟢 Open' },
          { id: 'upcoming', label: language === 'ta' ? '🟡 விரைவில்' : '🟡 Upcoming' },
        ] as { id: StatusType; label: string }[]).map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedStatus(s.id)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
              selectedStatus === s.id
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ── SEARCH ── */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder={language === 'ta' ? 'தேர்வுகளைத் தேடுங்கள்...' : 'Search exams (NDA, Railway, SSC)...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-10 bg-white border-gray-200 rounded-xl shadow-sm text-sm"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-3.5 h-3.5 text-gray-400" />
          </button>
        )}
      </div>

      {/* ── RESULTS COUNT ── */}
      <div className="text-xs text-gray-500">
        {language === 'ta'
          ? `${governmentExams.length} இல் ${filteredExams.length} காட்டப்படுகிறது`
          : `Showing ${filteredExams.length} of ${governmentExams.length}`}
      </div>

      {/* ── EXAM CARDS ── */}
      {filteredExams.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-xl border border-gray-100">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-500 text-sm">{language === 'ta' ? 'தேர்வுகள் கிடைக்கவில்லை' : 'No exams found'}</p>
          <Button variant="link" className="text-amber-600 text-sm mt-2" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedStatus('all'); }}>
            {language === 'ta' ? 'வடிகட்டிகளை அழி' : 'Clear filters'}
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredExams.map((exam) => {
            const info = categoryInfo[exam.category as keyof typeof categoryInfo];
            const isExpanded = expandedExam === exam.id;
            const isSaved = savedExams.includes(exam.id);

            return (
              <Card key={exam.id} className={cn("border-l-4 transition-all hover:shadow-md", info?.borderColor || 'border-gray-300')}>
                <CardContent className="p-4">
                  {/* Top row: name + status + save */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-base">{info?.emoji}</span>
                        <h3 className="font-bold text-sm text-gray-800">{exam.name}</h3>
                        {statusBadge(exam.applicationStatus)}
                      </div>
                      <p className="text-xs text-gray-500 font-tamil">{exam.nameTamil}</p>
                    </div>
                    <button onClick={() => toggleSave(exam.id)} className={cn("p-1.5 rounded-full transition-all", isSaved ? "text-amber-500" : "text-gray-300 hover:text-amber-400")}>
                      <Bookmark className={cn("w-4 h-4", isSaved && "fill-current")} />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mb-3">{exam.description}</p>

                  {/* Key info grid */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <GraduationCap className="h-3.5 w-3.5 mx-auto mb-0.5 text-green-600" />
                      <div className="text-[10px] font-semibold text-gray-700">{exam.qualification}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <Users className="h-3.5 w-3.5 mx-auto mb-0.5 text-blue-600" />
                      <div className="text-[10px] font-semibold text-gray-700">{exam.ageMin}-{exam.ageMax} yrs</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <IndianRupee className="h-3.5 w-3.5 mx-auto mb-0.5 text-amber-600" />
                      <div className="text-[10px] font-semibold text-gray-700">{formatSalary(exam.salaryMin, exam.salaryMax)}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <Calendar className="h-3.5 w-3.5 mx-auto mb-0.5 text-purple-600" />
                      <div className="text-[10px] font-semibold text-gray-700">
                        {exam.nextExamDate ? new Date(exam.nextExamDate).toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }) : 'TBA'}
                      </div>
                    </div>
                  </div>

                  {/* Expand/collapse details */}
                  <button
                    onClick={() => setExpandedExam(isExpanded ? null : exam.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {isExpanded ? (language === 'ta' ? 'மறை' : 'Hide Details') : (language === 'ta' ? 'மேலும் காண' : 'View Details')}
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="pt-3 mt-2 border-t border-gray-100 space-y-3">
                      {/* Exam Pattern */}
                      <div>
                        <h5 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-1">
                          <FileText className="h-3.5 w-3.5" /> {language === 'ta' ? 'தேர்வு முறை' : 'Exam Pattern'}
                        </h5>
                        <p className="text-xs text-gray-600 bg-gray-50 rounded-lg p-2.5">{exam.examPattern}</p>
                      </div>

                      {/* Selection Process */}
                      <div>
                        <h5 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-1">
                          <GraduationCap className="h-3.5 w-3.5" /> {language === 'ta' ? 'தேர்வு செயல்முறை' : 'Selection Process'}
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {exam.selectionProcess.map((step, i) => (
                            <Badge key={i} variant="outline" className="text-[10px] bg-white">{i + 1}. {step}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* Posts */}
                      {exam.posts && (
                        <div>
                          <h5 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-1">
                            <Briefcase className="h-3.5 w-3.5" /> {language === 'ta' ? 'பதவிகள்' : 'Available Posts'}
                          </h5>
                          <div className="flex flex-wrap gap-1.5">
                            {exam.posts.map((post, i) => (
                              <Badge key={i} className="bg-gray-100 text-gray-700 text-[10px] border-0">{post}</Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Apply Button */}
                      <Button
                        className={cn("w-full text-white text-sm", exam.applicationStatus === 'closed' ? 'bg-gray-400' : `bg-gradient-to-r ${info?.color || 'from-amber-600 to-orange-600'} hover:opacity-90`)}
                        onClick={() => window.open(exam.applyLink, '_blank')}
                        disabled={exam.applicationStatus === 'closed'}
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-2" />
                        {exam.applicationStatus === 'closed' ? (language === 'ta' ? 'மூடப்பட்டது' : 'Closed')
                          : exam.applicationStatus === 'upcoming' ? (language === 'ta' ? 'அதிகாரப்பூர்வ தளம்' : 'Official Website')
                          : (language === 'ta' ? 'இப்போது விண்ணப்பிக்கவும்' : 'Apply Now')}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* ── MORE TOOLS (collapsed) ── */}
      <button
        onClick={() => setShowMore(!showMore)}
        className="w-full flex items-center justify-center gap-2 py-3 bg-white rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-all"
      >
        <BookOpen className="w-4 h-4" />
        {showMore ? (language === 'ta' ? 'மறை' : 'Hide') : (language === 'ta' ? 'மேலும்' : 'More')}: {language === 'ta' ? 'சம்பள ஒப்பீடு & தயாரிப்பு குறிப்புகள்' : 'Salary Comparison & Prep Tips'}
        {showMore ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {showMore && (
        <div className="space-y-4">
          <SalaryComparisonChart />
          <PreparationTipsSection />
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
            <p className="text-xs text-amber-700">
              💡 {language === 'ta' ? 'தேதிகள் தற்காலிகமானவை. அதிகாரப்பூர்வ இணையதளத்தில் சரிபார்க்கவும்.' : 'Dates are tentative. Always verify from official websites.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernmentJobs;
