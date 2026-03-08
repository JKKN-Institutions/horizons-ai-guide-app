import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Search, BookOpen, Users, Banknote, Sparkles,
  GraduationCap, ChevronRight, ChevronDown, FileText,
  CalendarClock, Flame, X, ExternalLink, Star, Clock, Filter, Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/useLanguage';
import { governmentExamCategories } from '@/data/government-exams-data';
import { governmentExams } from '@/components/GovernmentJobs/governmentExamsData';
import { cn } from '@/lib/utils';

type CategoryFilter = 'all' | 'defence' | 'railway' | 'ssc' | 'banking' | 'state' | 'central';
type StatusFilter = 'all' | 'open' | 'upcoming' | 'closed';
type SortOption = 'salary-high' | 'salary-low' | 'deadline' | 'name';

const categoryMeta: Record<string, { emoji: string; gradient: string; border: string; bg: string; text: string; label: string; labelTa: string }> = {
  defence: { emoji: '🛡️', gradient: 'from-amber-500 to-yellow-600', border: 'border-l-amber-500', bg: 'bg-amber-50', text: 'text-amber-700', label: 'Defence & Paramilitary', labelTa: 'பாதுகாப்பு & துணை ராணுவம்' },
  railway: { emoji: '🚂', gradient: 'from-red-500 to-rose-600', border: 'border-l-red-500', bg: 'bg-red-50', text: 'text-red-700', label: 'Railway Jobs', labelTa: 'ரயில்வே வேலைகள்' },
  ssc: { emoji: '📋', gradient: 'from-blue-500 to-indigo-600', border: 'border-l-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', label: 'SSC', labelTa: 'SSC' },
  banking: { emoji: '🏦', gradient: 'from-emerald-500 to-green-600', border: 'border-l-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Banking & Insurance', labelTa: 'வங்கி & காப்பீடு' },
  state: { emoji: '🏛️', gradient: 'from-teal-500 to-cyan-600', border: 'border-l-teal-500', bg: 'bg-teal-50', text: 'text-teal-700', label: 'TN State Govt', labelTa: 'தமிழ்நாடு மாநில அரசு' },
  central: { emoji: '🏢', gradient: 'from-purple-500 to-violet-600', border: 'border-l-purple-500', bg: 'bg-purple-50', text: 'text-purple-700', label: 'Other Central Govt', labelTa: 'பிற மத்திய அரசு' },
};

const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;

const GovernmentExams = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = language === 'ta';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('deadline');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(Object.keys(categoryMeta)));

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  // Open applications  
  const openExams = useMemo(() => governmentExams.filter(e => e.applicationStatus === 'open'), []);

  // Filtered exams
  const filteredExams = useMemo(() => {
    let exams = [...governmentExams];
    if (selectedCategory !== 'all') exams = exams.filter(e => e.category === selectedCategory);
    if (selectedStatus !== 'all') exams = exams.filter(e => e.applicationStatus === selectedStatus);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      exams = exams.filter(e =>
        e.name.toLowerCase().includes(q) || e.nameTamil.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        (e.posts && e.posts.some(p => p.toLowerCase().includes(q)))
      );
    }
    switch (sortBy) {
      case 'salary-high': exams.sort((a, b) => b.salaryMax - a.salaryMax); break;
      case 'salary-low': exams.sort((a, b) => a.salaryMin - b.salaryMin); break;
      case 'name': exams.sort((a, b) => a.name.localeCompare(b.name)); break;
      default:
        exams.sort((a, b) => {
          if (!a.nextExamDate && !b.nextExamDate) return 0;
          if (!a.nextExamDate) return 1;
          if (!b.nextExamDate) return -1;
          return new Date(a.nextExamDate).getTime() - new Date(b.nextExamDate).getTime();
        });
    }
    return exams;
  }, [selectedCategory, selectedStatus, searchQuery, sortBy]);

  // Group by category
  const groupedExams = useMemo(() => {
    const groups: Record<string, typeof filteredExams> = {};
    filteredExams.forEach(e => {
      if (!groups[e.category]) groups[e.category] = [];
      groups[e.category].push(e);
    });
    return groups;
  }, [filteredExams]);

  const categoryCounts = useMemo(() => {
    const c: Record<string, number> = { all: governmentExams.length };
    governmentExams.forEach(e => { c[e.category] = (c[e.category] || 0) + 1; });
    return c;
  }, []);

  const findDetailedExam = (examId: string) => {
    for (const cat of governmentExamCategories) {
      const found = cat.exams.find(e => e.id === examId);
      if (found) return { categoryId: cat.id, examId: found.id };
    }
    return null;
  };

  const isSearchActive = searchQuery.trim() || selectedCategory !== 'all' || selectedStatus !== 'all';

  // ─── Exam Card Component ───
  const ExamCard = ({ exam }: { exam: typeof governmentExams[0] }) => {
    const meta = categoryMeta[exam.category];
    const detail = findDetailedExam(exam.id);
    const examDate = exam.nextExamDate ? new Date(exam.nextExamDate) : null;
    const daysLeft = examDate ? Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null;

    const statusColor = exam.applicationStatus === 'open' ? 'bg-emerald-500' : exam.applicationStatus === 'upcoming' ? 'bg-amber-500' : 'bg-gray-400';
    const statusLabel = exam.applicationStatus === 'open' ? (t ? 'திறந்தது' : 'Open') : exam.applicationStatus === 'upcoming' ? (t ? 'வரும்' : 'Upcoming') : (t ? 'முடிந்தது' : 'Closed');

    return (
      <Card className={cn("border-l-4 hover:shadow-md transition-all bg-white dark:bg-slate-800", meta?.border)}>
        <CardContent className="p-3.5">
          {/* Row 1: Name + Status */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-lg flex-shrink-0">{meta?.emoji}</span>
            <h3 className="font-bold text-[13px] text-gray-800 dark:text-gray-100 flex-1 min-w-0 truncate">{exam.name}</h3>
            <span className={cn("flex items-center gap-1 text-[10px] font-medium text-white px-2 py-0.5 rounded-full flex-shrink-0", statusColor)}>
              <span className="w-1 h-1 rounded-full bg-white/70 inline-block" />
              {statusLabel}
            </span>
          </div>
          <p className="text-[11px] text-gray-400 mb-2.5 ml-7">{exam.nameTamil}</p>

          {/* Row 2: Key Info Chips */}
          <div className="flex flex-wrap gap-1.5 ml-7 mb-2.5">
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 font-medium">
              <Banknote className="w-3 h-3" /> {fmt(exam.salaryMin)}–{fmt(exam.salaryMax)}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium">
              <Users className="w-3 h-3" /> {exam.ageMin}–{exam.ageMax} {t ? 'வயது' : 'yrs'}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-medium">
              <GraduationCap className="w-3 h-3" /> {exam.qualification}
            </span>
            {examDate && (
              <span className={cn("inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-md font-medium",
                daysLeft && daysLeft <= 15 ? "bg-red-50 text-red-600" : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300")}>
                <CalendarClock className="w-3 h-3" />
                {examDate.toLocaleDateString(t ? 'ta-IN' : 'en-IN', { month: 'short', year: 'numeric' })}
                {daysLeft && daysLeft > 0 && ` (${daysLeft}d)`}
              </span>
            )}
          </div>

          {/* Row 3: Posts */}
          {exam.posts && exam.posts.length > 0 && (
            <div className="flex flex-wrap gap-1 ml-7 mb-2.5">
              {exam.posts.slice(0, 3).map((p, i) => (
                <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400">{p}</span>
              ))}
              {exam.posts.length > 3 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-400">+{exam.posts.length - 3}</span>}
            </div>
          )}

          {/* Row 4: Actions */}
          <div className="flex gap-2 ml-7">
            {detail && (
              <Button
                size="sm" variant="outline"
                className="flex-1 text-[11px] h-8 rounded-lg border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400"
                onClick={() => navigate(`/government-exams/${detail.categoryId}/${detail.examId}`)}
              >
                <BookOpen className="w-3 h-3 mr-1" /> {t ? 'பாடத்திட்டம் & PYQ' : 'Syllabus & PYQ'}
              </Button>
            )}
            <Button
              size="sm"
              className={cn("flex-1 text-[11px] h-8 rounded-lg text-white",
                exam.applicationStatus === 'open' ? "bg-emerald-600 hover:bg-emerald-700"
                : exam.applicationStatus === 'upcoming' ? "bg-amber-500 hover:bg-amber-600"
                : "bg-gray-300 cursor-not-allowed"
              )}
              onClick={() => exam.applicationStatus !== 'closed' && window.open(exam.applyLink, '_blank')}
              disabled={exam.applicationStatus === 'closed'}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              {exam.applicationStatus === 'open' ? (t ? 'விண்ணப்பி' : 'Apply')
                : exam.applicationStatus === 'upcoming' ? (t ? 'தளம்' : 'Website')
                : (t ? 'மூடப்பட்டது' : 'Closed')}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* ═══════ HEADER ═══════ */}
      <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full -translate-y-1/3 translate-x-1/4 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-500/10 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 pt-4 pb-6 relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8 rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-bold">{t ? 'அரசு தேர்வுகள் & வேலைகள்' : 'Government Exams & Jobs'}</h1>
              <p className="text-white/50 text-[11px]">{t ? '12ஆம் வகுப்பு தேர்ச்சி — பட்டம் தேவையில்லை' : '12th Pass — No Degree Required'}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-amber-400">{governmentExams.length}</div>
              <div className="text-[10px] text-white/40">{t ? 'தேர்வுகள்' : 'Exams'}</div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <Input
              placeholder={t ? 'NDA, ரயில்வே, SSC தேடுங்கள்...' : 'Search NDA, Railway, SSC, Banking...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 h-10 bg-white/8 border-white/10 text-white placeholder:text-white/30 rounded-xl text-sm focus:bg-white/12 focus:border-white/25"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Quick Stats Row */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedStatus('open')}
              className={cn("flex-1 rounded-xl p-2.5 text-center transition-all border",
                selectedStatus === 'open' ? "bg-emerald-500/20 border-emerald-400/30" : "bg-white/5 border-white/5 hover:bg-white/8")}
            >
              <div className="text-base font-bold text-emerald-400">{openExams.length}</div>
              <div className="text-[9px] text-white/40">{t ? '🟢 திறந்தது' : '🟢 Open Now'}</div>
            </button>
            <button
              onClick={() => setSelectedStatus('upcoming')}
              className={cn("flex-1 rounded-xl p-2.5 text-center transition-all border",
                selectedStatus === 'upcoming' ? "bg-amber-500/20 border-amber-400/30" : "bg-white/5 border-white/5 hover:bg-white/8")}
            >
              <div className="text-base font-bold text-amber-400">{governmentExams.filter(e => e.applicationStatus === 'upcoming').length}</div>
              <div className="text-[9px] text-white/40">{t ? '🟡 வரும்' : '🟡 Upcoming'}</div>
            </button>
            <button
              onClick={() => { setSelectedStatus('all'); setSelectedCategory('all'); }}
              className={cn("flex-1 rounded-xl p-2.5 text-center transition-all border",
                selectedStatus === 'all' && selectedCategory === 'all' ? "bg-white/10 border-white/15" : "bg-white/5 border-white/5 hover:bg-white/8")}
            >
              <div className="text-base font-bold text-white/80">{governmentExams.length}</div>
              <div className="text-[9px] text-white/40">{t ? '📋 அனைத்தும்' : '📋 All'}</div>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        {/* ═══════ CATEGORY PILLS ═══════ */}
        <div className="overflow-x-auto -mx-1 px-1 mb-3">
          <div className="flex gap-2 min-w-max pb-2">
            {Object.entries(categoryMeta).map(([key, meta]) => {
              const isActive = selectedCategory === key;
              const count = categoryCounts[key] || 0;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(isActive ? 'all' : key as CategoryFilter)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border",
                    isActive
                      ? `bg-gradient-to-r ${meta.gradient} text-white border-transparent shadow-md`
                      : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-gray-300"
                  )}
                >
                  {meta.emoji} {t ? meta.labelTa.split(' ')[0] : meta.label.split(' ')[0]}
                  <span className={cn("text-[9px] px-1 py-0.5 rounded-full", isActive ? "bg-white/20" : "bg-gray-100 dark:bg-slate-700 text-gray-500")}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort bar */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] text-gray-400">
            {t ? `${filteredExams.length} தேர்வுகள்` : `${filteredExams.length} exams`}
            {isSearchActive && <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedStatus('all'); }} className="text-indigo-500 ml-2 underline">{t ? 'அழி' : 'Clear'}</button>}
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-[11px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-2 py-1 text-gray-500 outline-none"
          >
            <option value="deadline">{t ? 'தேதி' : 'By Date'}</option>
            <option value="salary-high">{t ? 'அதிக ₹' : 'Salary ↓'}</option>
            <option value="salary-low">{t ? 'குறைந்த ₹' : 'Salary ↑'}</option>
            <option value="name">A–Z</option>
          </select>
        </div>

        {/* ═══════ OPEN APPLICATIONS ALERT ═══════ */}
        {!isSearchActive && openExams.length > 0 && (
          <div className="mb-5">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl border border-emerald-200/80 dark:border-emerald-800 p-3.5">
              <div className="flex items-center gap-2 mb-2.5">
                <Flame className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-200">{t ? 'இப்போது விண்ணப்பிக்கலாம்!' : 'Apply Now — Open Applications!'}</span>
              </div>
              <div className="space-y-1.5">
                {openExams.slice(0, 4).map(exam => {
                  const meta = categoryMeta[exam.category];
                  return (
                    <div key={exam.id} className="flex items-center gap-2.5 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 cursor-pointer hover:shadow-sm transition-all" onClick={() => window.open(exam.applyLink, '_blank')}>
                      <span className="text-sm">{meta?.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-gray-800 dark:text-gray-200 truncate">{exam.name}</p>
                        <p className="text-[9px] text-gray-400">{fmt(exam.salaryMin)}–{fmt(exam.salaryMax)}</p>
                      </div>
                      <ExternalLink className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═══════ EXAM LISTINGS ═══════ */}
        {filteredExams.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-sm text-gray-500 font-medium">{t ? 'தேர்வுகள் கிடைக்கவில்லை' : 'No exams found'}</p>
            <Button variant="link" className="text-indigo-500 text-xs mt-2" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedStatus('all'); }}>
              {t ? 'அனைத்தும் காட்டு' : 'Show all exams'}
            </Button>
          </div>
        ) : selectedCategory !== 'all' || isSearchActive ? (
          // Flat list when filtering
          <div className="space-y-2.5">
            {filteredExams.map((exam, i) => (
              <motion.div key={exam.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.02, 0.2) }}>
                <ExamCard exam={exam} />
              </motion.div>
            ))}
          </div>
        ) : (
          // Grouped by category when showing all
          <div className="space-y-5">
            {Object.entries(groupedExams).map(([cat, exams]) => {
              const meta = categoryMeta[cat];
              const isOpen = expandedCategories.has(cat);
              if (!meta) return null;
              return (
                <div key={cat}>
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(cat)}
                    className={cn("w-full flex items-center gap-3 p-3 rounded-xl mb-2 transition-all", meta.bg, "dark:bg-slate-800/50 hover:shadow-sm")}
                  >
                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center text-white text-lg bg-gradient-to-br shadow-sm", meta.gradient)}>
                      {meta.emoji}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className={cn("text-sm font-bold", meta.text, "dark:text-gray-100")}>{t ? meta.labelTa : meta.label}</h3>
                      <p className="text-[10px] text-gray-500">{exams.length} {t ? 'தேர்வுகள்' : 'exams'}</p>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2.5 pb-2">
                          {exams.map((exam, i) => (
                            <motion.div key={exam.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                              <ExamCard exam={exam} />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══════ STUDY RESOURCES ═══════ */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">{t ? 'படிப்பு வளங்கள் & PYQ' : 'Study Materials & PYQ'}</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {governmentExamCategories.map((category) => (
              <Card
                key={category.id}
                className={cn("cursor-pointer hover:shadow-md transition-all border hover:scale-[1.02]", category.borderColor, category.bgColor, "dark:bg-slate-800/50")}
                onClick={() => navigate(`/government-exams/${category.id}`)}
              >
                <CardContent className="p-3 text-center">
                  <div className={cn("text-2xl mb-1 w-9 h-9 mx-auto rounded-lg flex items-center justify-center bg-gradient-to-br text-white shadow-sm", category.color)}>
                    {category.icon}
                  </div>
                  <h4 className="font-bold text-[10px] text-gray-800 dark:text-gray-100 leading-tight">
                    {t ? category.nameTamil.split(' ')[0] : category.name.split(' ')[0]}
                  </h4>
                  <div className="flex items-center justify-center gap-0.5 mt-1 text-[9px] text-indigo-600 dark:text-indigo-400 font-medium">
                    PYQ <ChevronRight className="w-2.5 h-2.5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ═══════ TIPS ═══════ */}
        <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200/50 dark:border-indigo-800 rounded-xl p-3.5">
          <h4 className="text-[11px] font-bold text-indigo-800 dark:text-indigo-200 mb-1.5 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5" /> {t ? 'படிப்பு குறிப்புகள்' : 'Quick Tips'}
          </h4>
          <div className="grid grid-cols-2 gap-1.5">
            {(t ? ['✅ பாடத்திட்டத்தை படிக்கவும்', '✅ தினமும் 2 மணி நேரம்', '✅ PYQ தீர்க்கவும்', '✅ மாக் டெஸ்ட் எழுதுங்கள்']
              : ['✅ Study the full syllabus', '✅ 2 hours daily practice', '✅ Solve PYQ papers', '✅ Take mock tests regularly']
            ).map((tip, i) => (
              <p key={i} className="text-[10px] text-indigo-700/70 dark:text-indigo-300/70">{tip}</p>
            ))}
          </div>
        </div>

        <div className="mt-3 mb-6 text-center">
          <p className="text-[10px] text-gray-400">
            💡 {t ? 'தேதிகள் மாறலாம். அதிகாரப்பூர்வ தளங்களில் சரிபார்க்கவும்.' : 'Dates may change. Verify from official government websites.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GovernmentExams;
