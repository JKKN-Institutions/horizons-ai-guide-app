import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Search, BookOpen, Users, Banknote,
  GraduationCap, ChevronRight, ChevronDown, FileText,
  CalendarClock, Flame, X, ExternalLink, Star, Clock,
  Trophy, Target, Zap, BookMarked, Play, Shield, Train,
  Building2, Landmark, Briefcase, Timer, ArrowUpRight,
  CheckCircle2, AlertTriangle, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/useLanguage';
import { governmentExamCategories, getCategoryById } from '@/data/government-exams-data';
import { governmentExams } from '@/components/GovernmentJobs/governmentExamsData';
import { cn } from '@/lib/utils';

type ViewTab = 'all' | 'central' | 'state';

const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;

// Map exam IDs to their detailed data category for syllabus/PYQ links
const getExamDetailLink = (examId: string): { categoryId: string; examId: string } | null => {
  for (const cat of governmentExamCategories) {
    const found = cat.exams.find(e => e.id === examId);
    if (found) return { categoryId: cat.id, examId: found.id };
  }
  return null;
};

// Get PYQ count for an exam from detailed data
const getExamPYQCount = (examId: string): number => {
  for (const cat of governmentExamCategories) {
    const found = cat.exams.find(e => e.id === examId);
    if (found) return found.pyq.length;
  }
  return 0;
};

// Get syllabus topic count for an exam from detailed data
const getExamSyllabusCount = (examId: string): number => {
  for (const cat of governmentExamCategories) {
    const found = cat.exams.find(e => e.id === examId);
    if (found) {
      return Object.values(found.syllabus).reduce((total, sections) => {
        return total + sections.reduce((acc, section) => acc + section.topics.length, 0);
      }, 0);
    }
  }
  return 0;
};

const categoryStyles: Record<string, { emoji: string; color: string; bg: string; border: string; accent: string; label: string; labelTa: string }> = {
  defence: { emoji: '🛡️', color: 'from-orange-500 to-amber-600', bg: 'bg-orange-50', border: 'border-orange-200', accent: 'text-orange-700', label: 'Defence & Paramilitary', labelTa: 'பாதுகாப்பு' },
  railway: { emoji: '🚂', color: 'from-red-500 to-rose-600', bg: 'bg-red-50', border: 'border-red-200', accent: 'text-red-700', label: 'Railway', labelTa: 'ரயில்வே' },
  ssc: { emoji: '📋', color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50', border: 'border-blue-200', accent: 'text-blue-700', label: 'SSC', labelTa: 'SSC' },
  banking: { emoji: '🏦', color: 'from-emerald-500 to-green-600', bg: 'bg-emerald-50', border: 'border-emerald-200', accent: 'text-emerald-700', label: 'Banking', labelTa: 'வங்கி' },
  state: { emoji: '🏛️', color: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', border: 'border-violet-200', accent: 'text-violet-700', label: 'TN State', labelTa: 'தமிழ்நாடு' },
  central: { emoji: '🏢', color: 'from-cyan-500 to-teal-600', bg: 'bg-cyan-50', border: 'border-cyan-200', accent: 'text-cyan-700', label: 'Central Govt', labelTa: 'மத்திய அரசு' },
};

const centralCategories = ['defence', 'railway', 'ssc', 'banking', 'central'];
const stateCategories = ['state'];

const GovernmentExams = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const ta = language === 'ta';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<ViewTab>('all');
  const [expandedExam, setExpandedExam] = useState<string | null>(null);

  // Categorized exams
  const centralExams = useMemo(() => governmentExams.filter(e => centralCategories.includes(e.category)), []);
  const stateExams = useMemo(() => governmentExams.filter(e => stateCategories.includes(e.category)), []);
  const openExams = useMemo(() => governmentExams.filter(e => e.applicationStatus === 'open'), []);
  const upcomingExams = useMemo(() => governmentExams.filter(e => e.applicationStatus === 'upcoming'), []);

  // Search filtered
  const searchFiltered = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return governmentExams.filter(e =>
      e.name.toLowerCase().includes(q) || e.nameTamil.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      (e.posts && e.posts.some(p => p.toLowerCase().includes(q)))
    );
  }, [searchQuery]);

  // Total PYQ count
  const totalPYQ = useMemo(() => {
    return governmentExamCategories.reduce((total, cat) =>
      total + cat.exams.reduce((acc, exam) => acc + exam.pyq.length, 0), 0);
  }, []);

  // Group exams by category
  const groupByCategory = (exams: typeof governmentExams) => {
    const groups: Record<string, typeof governmentExams> = {};
    exams.forEach(e => {
      if (!groups[e.category]) groups[e.category] = [];
      groups[e.category].push(e);
    });
    return groups;
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EXAM CARD — the core visual unit
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const ExamCard = ({ exam, index = 0 }: { exam: typeof governmentExams[0]; index?: number }) => {
    const style = categoryStyles[exam.category];
    const detail = getExamDetailLink(exam.id);
    const pyqCount = getExamPYQCount(exam.id);
    const syllabusCount = getExamSyllabusCount(exam.id);
    const examDate = exam.nextExamDate ? new Date(exam.nextExamDate) : null;
    const daysLeft = examDate ? Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null;
    const isExpanded = expandedExam === exam.id;

    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.35 }}
      >
        <Card className={cn(
          "overflow-hidden transition-all duration-300 border bg-white dark:bg-slate-800",
          isExpanded ? "shadow-xl ring-2 ring-indigo-100 dark:ring-indigo-900" : "hover:shadow-lg",
          style?.border
        )}>
          {/* ── Top accent bar ── */}
          <div className={cn("h-1.5 bg-gradient-to-r", style?.color)} />

          <CardContent className="p-0">
            {/* ── MAIN CARD ── */}
            <div className="p-4" onClick={() => setExpandedExam(isExpanded ? null : exam.id)}>
              {/* Row 1: Category + Status */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{style?.emoji}</span>
                  <span className={cn("text-[10px] font-bold uppercase tracking-wider", style?.accent)}>
                    {ta ? style?.labelTa : style?.label}
                  </span>
                </div>
                {exam.applicationStatus === 'open' ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-white bg-emerald-500 px-2.5 py-1 rounded-full animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" /> {ta ? 'விண்ணப்பிக்கலாம்' : 'APPLY NOW'}
                  </span>
                ) : exam.applicationStatus === 'upcoming' ? (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                    <Clock className="w-3 h-3" /> {ta ? 'வரவிருக்கிறது' : 'UPCOMING'}
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">{ta ? 'மூடப்பட்டது' : 'CLOSED'}</span>
                )}
              </div>

              {/* Row 2: Exam Name */}
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white leading-tight mb-0.5">
                {exam.name}
              </h3>
              <p className="text-[11px] text-gray-400 mb-3">{exam.nameTamil}</p>

              {/* Row 3: Key Stats - Big visual pills */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-2.5 text-center border border-emerald-100 dark:border-emerald-800">
                  <Banknote className="w-4 h-4 mx-auto text-emerald-600 mb-1" />
                  <div className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300">{fmt(exam.salaryMin)}–{fmt(exam.salaryMax)}</div>
                  <div className="text-[8px] text-emerald-500 uppercase tracking-wide font-semibold">{ta ? 'மாத சம்பளம்' : 'Monthly Salary'}</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-2.5 text-center border border-blue-100 dark:border-blue-800">
                  <Users className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                  <div className="text-[11px] font-extrabold text-blue-700 dark:text-blue-300">{exam.ageMin}–{exam.ageMax} {ta ? 'வயது' : 'Years'}</div>
                  <div className="text-[8px] text-blue-500 uppercase tracking-wide font-semibold">{ta ? 'வயது வரம்பு' : 'Age Limit'}</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-2.5 text-center border border-purple-100 dark:border-purple-800">
                  <GraduationCap className="w-4 h-4 mx-auto text-purple-600 mb-1" />
                  <div className="text-[11px] font-extrabold text-purple-700 dark:text-purple-300">{exam.qualification}</div>
                  <div className="text-[8px] text-purple-500 uppercase tracking-wide font-semibold">{ta ? 'தகுதி' : 'Eligibility'}</div>
                </div>
              </div>

              {/* Row 4: Exam date + Pattern + Expand hint */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-wrap">
                  {examDate && (
                    <div className="flex items-center gap-1.5">
                      <CalendarClock className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                        {examDate.toLocaleDateString(ta ? 'ta-IN' : 'en-IN', { month: 'short', year: 'numeric' })}
                      </span>
                      {daysLeft !== null && daysLeft > 0 && daysLeft <= 60 && (
                        <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full",
                          daysLeft <= 15 ? "bg-red-100 text-red-600" : daysLeft <= 30 ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-500")}>
                          {daysLeft}d
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <FileText className="w-3 h-3" />
                    {exam.examPattern}
                  </div>
                </div>
                <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform duration-300", isExpanded && "rotate-180")} />
              </div>
            </div>

            {/* ── EXPANDED SECTION ── */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-3 border-t border-gray-100 dark:border-slate-700 pt-3">
                    {/* Description */}
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{exam.description}</p>

                    {/* Selection Process */}
                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-3">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">{ta ? 'தேர்வு முறை' : 'Selection Process'}</p>
                      <div className="flex items-center gap-1 flex-wrap">
                        {exam.selectionProcess.map((step, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-600 px-2 py-1 rounded-lg border border-gray-200 dark:border-slate-500">
                              {step}
                            </span>
                            {i < exam.selectionProcess.length - 1 && <ChevronRight className="w-3 h-3 text-gray-300" />}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Posts */}
                    {exam.posts && exam.posts.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">{ta ? 'பதவிகள்' : 'Available Posts'}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {exam.posts.map((post, i) => (
                            <span key={i} className="text-[10px] px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium border border-indigo-100 dark:border-indigo-800">
                              {post}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── ACTION BUTTONS — THE MOST IMPORTANT PART ── */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {/* Syllabus */}
                      {detail && syllabusCount > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-12 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 flex flex-col items-center gap-0.5 text-indigo-700 dark:text-indigo-300"
                          onClick={(e) => { e.stopPropagation(); navigate(`/government-exams/${detail.categoryId}/${detail.examId}`); }}
                        >
                          <div className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold">{ta ? 'பாடத்திட்டம்' : 'Syllabus'}</span>
                          </div>
                          <span className="text-[9px] text-indigo-400">{syllabusCount} {ta ? 'தலைப்புகள்' : 'Topics'}</span>
                        </Button>
                      )}

                      {/* PYQ */}
                      {detail && pyqCount > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-12 rounded-xl border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/30 flex flex-col items-center gap-0.5 text-amber-700 dark:text-amber-300"
                          onClick={(e) => { e.stopPropagation(); navigate(`/government-exams/${detail.categoryId}/${detail.examId}`); }}
                        >
                          <div className="flex items-center gap-1.5">
                            <Target className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold">PYQ</span>
                          </div>
                          <span className="text-[9px] text-amber-400">{pyqCount} {ta ? 'கேள்விகள்' : 'Questions'}</span>
                        </Button>
                      )}

                      {/* Mock Test */}
                      {detail && pyqCount > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-12 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 flex flex-col items-center gap-0.5 text-emerald-700 dark:text-emerald-300"
                          onClick={(e) => { e.stopPropagation(); navigate(`/government-exams/${detail.categoryId}/${detail.examId}`); }}
                        >
                          <div className="flex items-center gap-1.5">
                            <Play className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold">{ta ? 'மாக் டெஸ்ட்' : 'Mock Test'}</span>
                          </div>
                          <span className="text-[9px] text-emerald-400">{ta ? 'இப்போது தொடங்கு' : 'Start Now'}</span>
                        </Button>
                      )}

                      {/* Apply / Official Site */}
                      <Button
                        size="sm"
                        className={cn(
                          "h-12 rounded-xl flex flex-col items-center gap-0.5 text-white",
                          exam.applicationStatus === 'open'
                            ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-200 dark:shadow-none"
                            : exam.applicationStatus === 'upcoming'
                              ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                              : "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                        )}
                        onClick={(e) => { e.stopPropagation(); exam.applicationStatus !== 'closed' && window.open(exam.applyLink, '_blank'); }}
                        disabled={exam.applicationStatus === 'closed'}
                      >
                        <div className="flex items-center gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-bold">
                            {exam.applicationStatus === 'open' ? (ta ? 'விண்ணப்பிக்க' : 'Apply Now')
                              : exam.applicationStatus === 'upcoming' ? (ta ? 'அதிகாரப்பூர்வ தளம்' : 'Official Site')
                              : (ta ? 'மூடப்பட்டது' : 'Closed')}
                          </span>
                        </div>
                        {exam.applicationStatus === 'open' && (
                          <span className="text-[9px] text-white/70">{ta ? 'கடைசி தேதி சரிபார்க்கவும்' : 'Check last date'}</span>
                        )}
                      </Button>
                    </div>

                    {/* No syllabus/PYQ message */}
                    {!detail && (
                      <div className="text-center py-2 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                        <p className="text-[11px] text-gray-500">
                          {ta ? '📚 பாடத்திட்டம் & PYQ விரைவில் சேர்க்கப்படும்' : '📚 Syllabus & PYQ coming soon'}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CATEGORY GROUP
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const CategoryGroup = ({ category, exams }: { category: string; exams: typeof governmentExams }) => {
    const style = categoryStyles[category];
    if (!style) return null;
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2.5 mb-3">
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm bg-gradient-to-br shadow-md", style.color)}>
            {style.emoji}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-800 dark:text-white">{ta ? style.labelTa : style.label}</h3>
            <p className="text-[10px] text-gray-400">{exams.length} {ta ? 'தேர்வுகள்' : 'exams'} • {exams.filter(e => e.applicationStatus === 'open').length} {ta ? 'திறந்தது' : 'open'}</p>
          </div>
        </div>
        <div className="space-y-3">
          {exams.map((exam, i) => <ExamCard key={exam.id} exam={exam} index={i} />)}
        </div>
      </div>
    );
  };

  // Which exams to show
  const displayExams = searchFiltered ?? (
    activeTab === 'central' ? centralExams :
    activeTab === 'state' ? stateExams :
    governmentExams
  );

  const displayGrouped = groupByCategory(displayExams);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-6">
      {/* ═══════════════════════════════════════════════
           HEADER — Dark, bold, commanding
         ═══════════════════════════════════════════════ */}
      <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 pt-4 pb-5 relative z-10">
          {/* Nav */}
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white/50 hover:text-white hover:bg-white/10 h-8 w-8 rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-black tracking-tight">{ta ? 'அரசு தேர்வுகள்' : 'Govt Exam Hub'}</h1>
              <p className="text-[10px] text-white/40 font-medium">{ta ? '12ஆம் வகுப்பு — பட்டம் தேவையில்லை' : '12th Pass — No Degree Required'}</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
            <Input
              placeholder={ta ? 'NDA, ரயில்வே, TNPSC தேடுங்கள்...' : 'Search NDA, Railway, TNPSC, SSC, Banking...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 h-10 bg-white/8 border-white/10 text-white placeholder:text-white/25 rounded-xl text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* ── HERO STATS ── */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white/6 backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/5">
              <div className="text-lg font-black text-white">{governmentExams.length}</div>
              <div className="text-[8px] text-white/35 uppercase tracking-wider font-bold">{ta ? 'தேர்வுகள்' : 'Exams'}</div>
            </div>
            <div className="bg-emerald-500/15 rounded-xl p-2.5 text-center border border-emerald-400/15">
              <div className="text-lg font-black text-emerald-400">{openExams.length}</div>
              <div className="text-[8px] text-emerald-400/60 uppercase tracking-wider font-bold">{ta ? 'திறந்தது' : 'Open'}</div>
            </div>
            <div className="bg-amber-500/15 rounded-xl p-2.5 text-center border border-amber-400/15">
              <div className="text-lg font-black text-amber-400">{totalPYQ}</div>
              <div className="text-[8px] text-amber-400/60 uppercase tracking-wider font-bold">PYQ</div>
            </div>
            <div className="bg-blue-500/15 rounded-xl p-2.5 text-center border border-blue-400/15">
              <div className="text-lg font-black text-blue-400">6</div>
              <div className="text-[8px] text-blue-400/60 uppercase tracking-wider font-bold">{ta ? 'வகைகள்' : 'Categories'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* ═══════════════════════════════════════════════
             QUICK ACTION CARDS
           ═══════════════════════════════════════════════ */}
        <div className="grid grid-cols-4 gap-2 -mt-3 mb-5 relative z-20">
          {[
            { icon: BookMarked, label: ta ? 'பாடத்திட்டம்' : 'Syllabus', labelShort: ta ? 'பாடம்' : 'Syllabus', color: 'bg-indigo-500', action: () => document.getElementById('exam-list')?.scrollIntoView({ behavior: 'smooth' }) },
            { icon: Target, label: ta ? 'PYQ' : 'PYQ', labelShort: 'PYQ', color: 'bg-amber-500', action: () => document.getElementById('exam-list')?.scrollIntoView({ behavior: 'smooth' }) },
            { icon: Play, label: ta ? 'மாக் டெஸ்ட்' : 'Mock Test', labelShort: ta ? 'மாக்' : 'Mock', color: 'bg-emerald-500', action: () => document.getElementById('exam-list')?.scrollIntoView({ behavior: 'smooth' }) },
            { icon: Zap, label: ta ? 'விண்ணப்பி' : 'Apply', labelShort: ta ? 'விண்ணப்பி' : 'Apply', color: 'bg-rose-500', action: () => document.getElementById('open-section')?.scrollIntoView({ behavior: 'smooth' }) },
          ].map((item, i) => (
            <motion.button
              key={i}
              onClick={item.action}
              className="bg-white dark:bg-slate-800 rounded-xl p-3 text-center shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all hover:-translate-y-0.5"
              whileTap={{ scale: 0.95 }}
            >
              <div className={cn("w-9 h-9 rounded-xl mx-auto flex items-center justify-center text-white mb-1.5 shadow-md", item.color)}>
                <item.icon className="w-4 h-4" />
              </div>
              <p className="text-[10px] font-bold text-gray-700 dark:text-gray-200 leading-tight">{item.labelShort}</p>
            </motion.button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════
             📅 TNPSC 2026 ANNUAL PLANNER — THE CENTERPIECE
           ═══════════════════════════════════════════════ */}
        {!searchQuery && (
          <div className="mb-6">
            <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-2xl overflow-hidden shadow-xl shadow-purple-200/50 dark:shadow-none">
              {/* Planner Header */}
              <div className="p-4 pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-sm">🏛️</div>
                  <div>
                    <h2 className="text-sm font-black text-white tracking-tight">{ta ? 'TNPSC 2026 வருடாந்திர திட்டம்' : 'TNPSC 2026 Annual Planner'}</h2>
                    <p className="text-[9px] text-white/50 font-medium">{ta ? 'வெளியிட்ட தேதி: 03.12.2025 | tnpsc.gov.in' : 'Published: 03.12.2025 | tnpsc.gov.in'}</p>
                  </div>
                </div>
              </div>

              {/* Exam Timeline Cards */}
              <div className="px-3 pb-3 space-y-1.5">
                {[
                  { id: 'tnpsc-cts-non-interview', sno: 1, name: ta ? 'CTS (நேர்காணல் அல்லாத)' : 'CTS (Non-Interview Posts)', nameFull: 'Combined Technical Services', notify: '20.05.2026', exam: '03.08.2026', days: 7, qual: ta ? 'பி.இ./பி.டெக்' : 'B.E./B.Tech', color: 'from-cyan-400 to-blue-500' },
                  { id: 'tnpsc-group1', sno: 2, name: ta ? 'குரூப் I (CCSE-I)' : 'Group I (CCSE-I)', nameFull: 'Combined Civil Services – I', notify: '23.06.2026', exam: '06.09.2026', days: 1, qual: ta ? 'பட்டப்படிப்பு' : 'Any Degree', color: 'from-amber-400 to-orange-500' },
                  { id: 'tnpsc-cts-diploma', sno: 3, name: ta ? 'CTS (டிப்ளோமா/ITI)' : 'CTS (Diploma/ITI Level)', nameFull: 'Combined Technical Services', notify: '07.07.2026', exam: '20.09.2026', days: 7, qual: ta ? 'டிப்ளோமா/ITI' : 'Diploma/ITI', color: 'from-teal-400 to-emerald-500' },
                  { id: 'tnpsc-group2', sno: 4, name: ta ? 'குரூப் II & IIA (CCSE-II)' : 'Group II & IIA (CCSE-II)', nameFull: 'Combined Civil Services – II', notify: '11.08.2026', exam: '25.10.2026', days: 1, qual: ta ? 'பட்டப்படிப்பு' : 'Any Degree', color: 'from-rose-400 to-pink-500' },
                  { id: 'tnpsc-cts-interview', sno: 5, name: ta ? 'CTS (நேர்காணல்)' : 'CTS (Interview Posts)', nameFull: 'Combined Technical Services', notify: '31.08.2026', exam: '14.11.2026', days: 4, qual: ta ? 'பி.இ./பி.டெக்' : 'B.E./B.Tech', color: 'from-blue-400 to-indigo-500' },
                  { id: 'tnpsc-group4', sno: 6, name: ta ? 'குரூப் IV (CCSE-IV)' : 'Group IV (CCSE-IV)', nameFull: 'Combined Civil Services – IV', notify: '06.10.2026', exam: '20.12.2026', days: 1, qual: ta ? 'SSLC/12th' : 'SSLC/12th Pass', color: 'from-emerald-400 to-green-500' },
                ].map((item) => {
                  const detail = getExamDetailLink(item.id);
                  return (
                    <motion.div
                      key={item.sno}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: item.sno * 0.06 }}
                      className="bg-white/10 backdrop-blur-sm hover:bg-white/15 rounded-xl p-3 transition-all cursor-pointer border border-white/5"
                      onClick={() => detail ? navigate(`/government-exams/${detail.categoryId}/${detail.examId}`) : null}
                    >
                      <div className="flex items-start gap-2.5">
                        {/* Number badge */}
                        <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black text-white bg-gradient-to-br flex-shrink-0 shadow-md", item.color)}>
                          {item.sno}
                        </div>
                        <div className="flex-1 min-w-0">
                          {/* Exam name */}
                          <p className="text-[12px] font-bold text-white leading-tight">{item.name}</p>
                          <p className="text-[9px] text-white/40 mb-1.5">{item.qual}</p>
                          {/* Dates row */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-amber-300 bg-amber-400/15 px-1.5 py-0.5 rounded">
                              <FileText className="w-2.5 h-2.5" /> {ta ? 'அறிவிப்பு' : 'Notify'}: {item.notify}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-300 bg-emerald-400/15 px-1.5 py-0.5 rounded">
                              <CalendarClock className="w-2.5 h-2.5" /> {ta ? 'தேர்வு' : 'Exam'}: {item.exam}
                            </span>
                            <span className="text-[9px] font-semibold text-white/40 bg-white/5 px-1.5 py-0.5 rounded">
                              {item.days} {ta ? 'நாட்கள்' : item.days === 1 ? 'Day' : 'Days'}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-white/30 flex-shrink-0 mt-1" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Planner footer */}
              <div className="px-4 pb-3">
                <div className="bg-white/5 rounded-lg px-3 py-2 flex items-start gap-2">
                  <AlertTriangle className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-[9px] text-white/40 leading-relaxed">
                    {ta
                      ? 'இது தற்காலிக திட்டம். தேதிகள் மாறலாம். அறிவிப்பு வெளியாகும் வரை tnpsc.gov.in பார்வையிடவும்.'
                      : 'Tentative planner. Dates may change. Check tnpsc.gov.in for official notifications.'}
                  </p>
                </div>
                <Button
                  size="sm"
                  className="w-full mt-2 h-9 bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold rounded-xl border border-white/10"
                  onClick={() => window.open('https://tnpsc.gov.in', '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-1.5" /> {ta ? 'TNPSC அதிகாரப்பூர்வ தளம்' : 'Visit TNPSC Official Website'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════
             🔥 OPEN APPLICATIONS — URGENCY SECTION
           ═══════════════════════════════════════════════ */}
        {openExams.length > 0 && !searchQuery && (
          <div id="open-section" className="mb-6">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-4 text-white shadow-xl shadow-emerald-200/50 dark:shadow-none">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-5 h-5" />
                <h2 className="text-sm font-black uppercase tracking-wide">{ta ? '🔥 இப்போதே விண்ணப்பிக்கலாம்!' : '🔥 Apply Now — Don\'t Miss Out!'}</h2>
              </div>
              <div className="space-y-2">
                {openExams.slice(0, 5).map(exam => {
                  const style = categoryStyles[exam.category];
                  return (
                    <button
                      key={exam.id}
                      className="w-full flex items-center gap-3 bg-white/15 hover:bg-white/25 rounded-xl px-3 py-2.5 transition-all text-left"
                      onClick={() => window.open(exam.applyLink, '_blank')}
                    >
                      <span className="text-lg">{style?.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-bold truncate">{exam.name}</p>
                        <p className="text-[10px] text-white/60">{fmt(exam.salaryMin)}–{fmt(exam.salaryMax)} / {ta ? 'மாதம்' : 'month'}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/60 flex-shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════
             TAB NAVIGATION: Central | State | All
           ═══════════════════════════════════════════════ */}
        <div id="exam-list" className="mb-4">
          {!searchQuery && (
            <div className="flex gap-1.5 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl mb-4">
              {([
                { key: 'all' as ViewTab, label: ta ? 'அனைத்தும்' : 'All Exams', count: governmentExams.length },
                { key: 'central' as ViewTab, label: ta ? 'மத்திய அரசு' : 'Central Govt', count: centralExams.length },
                { key: 'state' as ViewTab, label: ta ? 'மாநில அரசு' : 'State Govt', count: stateExams.length },
              ]).map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "flex-1 py-2.5 rounded-lg text-xs font-bold transition-all",
                    activeTab === tab.key
                      ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  )}
                >
                  {tab.label}
                  <span className={cn("ml-1 text-[9px] px-1.5 py-0.5 rounded-full",
                    activeTab === tab.key ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300" : "bg-gray-200 dark:bg-slate-600 text-gray-400"
                  )}>{tab.count}</span>
                </button>
              ))}
            </div>
          )}

          {/* Search results indicator */}
          {searchQuery && (
            <div className="flex items-center gap-2 mb-3">
              <p className="text-xs text-gray-500">
                {searchFiltered?.length || 0} {ta ? 'முடிவுகள்' : 'results'} for "<span className="font-bold text-gray-700">{searchQuery}</span>"
              </p>
              <button onClick={() => setSearchQuery('')} className="text-[11px] text-indigo-500 font-semibold">{ta ? 'அழி' : 'Clear'}</button>
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════
             EXAM CARDS — Grouped by Category
           ═══════════════════════════════════════════════ */}
        {displayExams.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{ta ? 'தேர்வுகள் கிடைக்கவில்லை' : 'No exams found'}</p>
            <p className="text-xs text-gray-400 mt-1">{ta ? 'வேறு வார்த்தையை முயற்சிக்கவும்' : 'Try a different search term'}</p>
            <Button variant="link" className="text-indigo-500 text-xs mt-3" onClick={() => setSearchQuery('')}>
              {ta ? 'அனைத்தும் காட்டு' : 'Show all exams'}
            </Button>
          </div>
        ) : (
          <div>
            {Object.entries(displayGrouped).map(([category, exams]) => (
              <CategoryGroup key={category} category={category} exams={exams} />
            ))}
          </div>
        )}

        {/* ═══════════════════════════════════════════════
             STUDY RESOURCES — Quick access to detailed pages
           ═══════════════════════════════════════════════ */}
        <div className="mt-8 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-black text-gray-800 dark:text-white">{ta ? 'பாடத்திட்டம் & PYQ தொகுப்பு' : 'Syllabus & PYQ Collection'}</h3>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {governmentExamCategories.map((category) => {
              const totalQ = category.exams.reduce((acc, e) => acc + e.pyq.length, 0);
              const totalTopics = category.exams.reduce((acc, e) =>
                acc + Object.values(e.syllabus).reduce((t, s) =>
                  t + s.reduce((a, sec) => a + sec.topics.length, 0), 0), 0);
              const style = categoryStyles[category.id];
              return (
                <Card
                  key={category.id}
                  className={cn("cursor-pointer hover:shadow-lg transition-all border-2 hover:scale-[1.02]", style?.border, style?.bg, "dark:bg-slate-800/50")}
                  onClick={() => navigate(`/government-exams/${category.id}`)}
                >
                  <CardContent className="p-3.5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm bg-gradient-to-br shadow-md", style?.color)}>
                        {category.icon}
                      </div>
                      <h4 className="font-bold text-[11px] text-gray-800 dark:text-gray-100 flex-1">
                        {ta ? category.nameTamil : category.name}
                      </h4>
                    </div>
                    <div className="flex gap-3 mb-2">
                      <div className="text-[10px]">
                        <span className="font-bold text-gray-700 dark:text-gray-200">{category.exams.length}</span>
                        <span className="text-gray-400 ml-0.5">{ta ? 'தேர்வுகள்' : 'exams'}</span>
                      </div>
                      <div className="text-[10px]">
                        <span className="font-bold text-amber-600">{totalQ}</span>
                        <span className="text-gray-400 ml-0.5">PYQ</span>
                      </div>
                      <div className="text-[10px]">
                        <span className="font-bold text-indigo-600">{totalTopics}</span>
                        <span className="text-gray-400 ml-0.5">{ta ? 'தலைப்பு' : 'topics'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">
                      {ta ? 'படிக்க தொடங்கு' : 'Start Studying'} <ChevronRight className="w-3 h-3" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
             PREPARATION TIPS
           ═══════════════════════════════════════════════ */}
        <div className="bg-gradient-to-br from-slate-800 to-gray-900 rounded-2xl p-4 mt-6 text-white">
          <h4 className="text-xs font-black uppercase tracking-wider mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400" /> {ta ? 'தினசரி படிப்பு குறிப்புகள்' : 'Daily Study Blueprint'}
          </h4>
          <div className="space-y-2">
            {(ta ? [
              { icon: '📖', text: 'முதலில் பாடத்திட்டத்தை முழுமையாகப் படிக்கவும்' },
              { icon: '⏰', text: 'தினமும் குறைந்தது 2 மணி நேரம் ஒதுக்கவும்' },
              { icon: '✍️', text: 'ஒவ்வொரு நாளும் PYQ 10 கேள்விகள் தீர்க்கவும்' },
              { icon: '🎯', text: 'வாரம் ஒரு முறை மாக் டெஸ்ட் எழுதுங்கள்' },
              { icon: '📰', text: 'தினமும் தேசிய செய்திகள் படிக்கவும் (Current Affairs)' },
            ] : [
              { icon: '📖', text: 'Start with full syllabus — know every topic before studying' },
              { icon: '⏰', text: 'Dedicate minimum 2 hours every day — consistency wins' },
              { icon: '✍️', text: 'Solve 10 PYQ questions daily — builds real exam readiness' },
              { icon: '🎯', text: 'Take 1 full mock test every week — track your improvement' },
              { icon: '📰', text: 'Read daily news for Current Affairs — 30% of most exams' },
            ]).map((tip, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-white/5 rounded-lg px-3 py-2">
                <span className="text-sm mt-0.5">{tip.icon}</span>
                <p className="text-[11px] text-white/70 leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 text-center pb-4">
          <p className="text-[10px] text-gray-400">
            ⚠️ {ta
              ? 'தேதிகள் & தகுதிகள் மாறலாம். விண்ணப்பிக்கும் முன் அதிகாரப்பூர்வ தளத்தில் சரிபார்க்கவும்.'
              : 'Dates & eligibility may change. Always verify from official websites before applying.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GovernmentExams;
