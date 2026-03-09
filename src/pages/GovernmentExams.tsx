import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Search, BookOpen, Users, Banknote,
  GraduationCap, ChevronRight, ChevronDown, FileText,
  CalendarClock, Flame, X, ExternalLink, Star,
  Trophy, Target, Play, ArrowUpRight, AlertTriangle,
  Clock, Sparkles, LayoutGrid, Calendar, Library
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/useLanguage';
import { governmentExamCategories } from '@/data/government-exams-data';
import { governmentExams } from '@/components/GovernmentJobs/governmentExamsData';
import { cn } from '@/lib/utils';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TYPES & CONSTANTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
type MainTab = 'exams' | 'tnpsc' | 'study';
type ExamScope = 'all' | 'central' | 'state';

const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;

const catStyle: Record<string, { emoji: string; gradient: string; border: string; bg: string; text: string; label: string; ta: string }> = {
  defence: { emoji: '🛡️', gradient: 'from-orange-500 to-amber-600', border: 'border-l-orange-400', bg: 'bg-orange-50', text: 'text-orange-700', label: 'Defence', ta: 'பாதுகாப்பு' },
  railway: { emoji: '🚂', gradient: 'from-red-500 to-rose-600', border: 'border-l-red-400', bg: 'bg-red-50', text: 'text-red-700', label: 'Railway', ta: 'ரயில்வே' },
  ssc:     { emoji: '📋', gradient: 'from-blue-500 to-indigo-600', border: 'border-l-blue-400', bg: 'bg-blue-50', text: 'text-blue-700', label: 'SSC', ta: 'SSC' },
  banking: { emoji: '🏦', gradient: 'from-emerald-500 to-green-600', border: 'border-l-emerald-400', bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Banking', ta: 'வங்கி' },
  state:   { emoji: '🏛️', gradient: 'from-violet-500 to-purple-600', border: 'border-l-violet-400', bg: 'bg-violet-50', text: 'text-violet-700', label: 'TN State', ta: 'தமிழ்நாடு' },
  central: { emoji: '🏢', gradient: 'from-cyan-500 to-teal-600', border: 'border-l-cyan-400', bg: 'bg-cyan-50', text: 'text-cyan-700', label: 'Central', ta: 'மத்திய அரசு' },
};

const centralCats = ['defence', 'railway', 'ssc', 'banking', 'central'];

// Helper: link exam to its detail page
const getDetailLink = (examId: string) => {
  for (const cat of governmentExamCategories) {
    const found = cat.exams.find(e => e.id === examId);
    if (found) return { categoryId: cat.id, examId: found.id };
  }
  return null;
};
const getPYQCount = (examId: string) => {
  for (const cat of governmentExamCategories) {
    const f = cat.exams.find(e => e.id === examId);
    if (f) return f.pyq.length;
  }
  return 0;
};
const getSyllabusCount = (examId: string) => {
  for (const cat of governmentExamCategories) {
    const f = cat.exams.find(e => e.id === examId);
    if (f) return Object.values(f.syllabus).reduce((t, s) => t + s.reduce((a, sec) => a + sec.topics.length, 0), 0);
  }
  return 0;
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const GovernmentExams = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const ta = language === 'ta';

  const [mainTab, setMainTab] = useState<MainTab>('exams');
  const [examScope, setExamScope] = useState<ExamScope>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedExam, setExpandedExam] = useState<string | null>(null);

  const openCount = useMemo(() => governmentExams.filter(e => e.applicationStatus === 'open').length, []);
  const totalPYQ = useMemo(() => governmentExamCategories.reduce((t, c) => t + c.exams.reduce((a, e) => a + e.pyq.length, 0), 0), []);

  // Filter exams
  const filteredExams = useMemo(() => {
    let exams = [...governmentExams];
    if (examScope === 'central') exams = exams.filter(e => centralCats.includes(e.category));
    if (examScope === 'state') exams = exams.filter(e => e.category === 'state');
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      exams = exams.filter(e => e.name.toLowerCase().includes(q) || e.nameTamil.includes(q) || e.description.toLowerCase().includes(q) || (e.posts?.some(p => p.toLowerCase().includes(q))));
    }
    return exams;
  }, [examScope, searchQuery]);

  // Group by category
  const grouped = useMemo(() => {
    const g: Record<string, typeof filteredExams> = {};
    filteredExams.forEach(e => { if (!g[e.category]) g[e.category] = []; g[e.category].push(e); });
    return g;
  }, [filteredExams]);

  // ── EXAM CARD ──
  const ExamCard = ({ exam, idx = 0 }: { exam: typeof governmentExams[0]; idx?: number }) => {
    const s = catStyle[exam.category];
    const detail = getDetailLink(exam.id);
    const pyq = getPYQCount(exam.id);
    const syllabus = getSyllabusCount(exam.id);
    const d = exam.nextExamDate ? new Date(exam.nextExamDate) : null;
    const days = d ? Math.ceil((d.getTime() - Date.now()) / 86400000) : null;
    const open = expandedExam === exam.id;

    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(idx * 0.03, 0.25) }}>
        <Card className={cn("overflow-hidden border-l-4 transition-all bg-white dark:bg-slate-800", s?.border, open && "shadow-lg ring-1 ring-indigo-100 dark:ring-indigo-900")}>
          <div className={cn("h-1 bg-gradient-to-r", s?.gradient)} />
          <CardContent className="p-0">
            {/* Clickable header */}
            <button className="w-full p-3.5 text-left" onClick={() => setExpandedExam(open ? null : exam.id)}>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-lg">{s?.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[13px] font-extrabold text-gray-900 dark:text-white truncate">{exam.name}</h3>
                    {exam.applicationStatus === 'open' && <span className="text-[9px] font-bold text-white bg-emerald-500 px-2 py-0.5 rounded-full animate-pulse">{ta ? 'விண்ணப்பிக்கலாம்' : 'OPEN'}</span>}
                    {exam.applicationStatus === 'upcoming' && <span className="text-[9px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">{ta ? 'வரும்' : 'UPCOMING'}</span>}
                  </div>
                  <p className="text-[10px] text-gray-400">{exam.nameTamil}</p>
                </div>
                <ChevronDown className={cn("w-4 h-4 text-gray-300 transition-transform flex-shrink-0", open && "rotate-180")} />
              </div>
              {/* Key stats row */}
              <div className="flex gap-2 flex-wrap">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">💰 {fmt(exam.salaryMin)}–{fmt(exam.salaryMax)}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">👤 {exam.ageMin}–{exam.ageMax}{ta ? ' வயது' : 'y'}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">🎓 {exam.qualification}</span>
                {d && days !== null && days > 0 && days <= 90 && (
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md", days <= 15 ? "bg-red-100 text-red-600" : "bg-amber-50 text-amber-600")}>📅 {days}d</span>
                )}
              </div>
            </button>

            {/* Expanded */}
            <AnimatePresence>
              {open && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="px-3.5 pb-3.5 space-y-2.5 border-t border-gray-100 dark:border-slate-700 pt-2.5">
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">{exam.description}</p>
                    {/* Selection process */}
                    <div className="flex items-center gap-1 flex-wrap">
                      {exam.selectionProcess.map((step, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span className="text-[9px] font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded">{step}</span>
                          {i < exam.selectionProcess.length - 1 && <ChevronRight className="w-2.5 h-2.5 text-gray-300" />}
                        </span>
                      ))}
                    </div>
                    {/* Posts */}
                    {exam.posts && <div className="flex gap-1 flex-wrap">{exam.posts.slice(0, 5).map((p, i) => <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 font-medium">{p}</span>)}{exam.posts.length > 5 && <span className="text-[9px] px-2 py-0.5 rounded bg-gray-100 text-gray-400">+{exam.posts.length - 5}</span>}</div>}
                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {detail && syllabus > 0 && (
                        <Button size="sm" variant="outline" className="h-10 rounded-xl text-[10px] font-bold border-indigo-200 text-indigo-600 hover:bg-indigo-50" onClick={(e) => { e.stopPropagation(); navigate(`/government-exams/${detail.categoryId}/${detail.examId}`); }}>
                          <BookOpen className="w-3 h-3 mr-1" /> {ta ? 'பாடத்திட்டம்' : 'Syllabus'} ({syllabus})
                        </Button>
                      )}
                      {detail && pyq > 0 && (
                        <Button size="sm" variant="outline" className="h-10 rounded-xl text-[10px] font-bold border-amber-200 text-amber-600 hover:bg-amber-50" onClick={(e) => { e.stopPropagation(); navigate(`/government-exams/${detail.categoryId}/${detail.examId}`); }}>
                          <Target className="w-3 h-3 mr-1" /> PYQ ({pyq})
                        </Button>
                      )}
                      {detail && pyq > 0 && (
                        <Button size="sm" variant="outline" className="h-10 rounded-xl text-[10px] font-bold border-emerald-200 text-emerald-600 hover:bg-emerald-50" onClick={(e) => { e.stopPropagation(); navigate(`/government-exams/${detail.categoryId}/${detail.examId}`); }}>
                          <Play className="w-3 h-3 mr-1" /> {ta ? 'மாக் டெஸ்ட்' : 'Mock Test'}
                        </Button>
                      )}
                      <Button size="sm" className={cn("h-10 rounded-xl text-[10px] font-bold text-white", exam.applicationStatus === 'open' ? "bg-emerald-600 hover:bg-emerald-700" : exam.applicationStatus === 'upcoming' ? "bg-amber-500 hover:bg-amber-600" : "bg-gray-300 cursor-not-allowed")} onClick={(e) => { e.stopPropagation(); exam.applicationStatus !== 'closed' && window.open(exam.applyLink, '_blank'); }} disabled={exam.applicationStatus === 'closed'}>
                        <ExternalLink className="w-3 h-3 mr-1" /> {exam.applicationStatus === 'open' ? (ta ? 'விண்ணப்பி' : 'Apply Now') : exam.applicationStatus === 'upcoming' ? (ta ? 'தளம்' : 'Website') : (ta ? 'மூடப்பட்டது' : 'Closed')}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RENDER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-8">
      {/* ════ HEADER ════ */}
      <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 pt-4 pb-4 relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white/50 hover:text-white hover:bg-white/10 h-8 w-8 rounded-lg"><ArrowLeft className="h-4 w-4" /></Button>
            <div className="flex-1">
              <h1 className="text-lg font-black">{ta ? 'அரசு தேர்வுகள்' : 'Govt Exam Hub'}</h1>
              <p className="text-[10px] text-white/40">{ta ? '12ஆம் வகுப்பு — பட்டம் தேவையில்லை' : '12th Pass • No Degree Required'}</p>
            </div>
          </div>
          {/* Stats */}
          <div className="flex gap-2">
            {[
              { v: governmentExams.length, l: ta ? 'தேர்வுகள்' : 'Exams', c: 'text-white' },
              { v: openCount, l: ta ? 'திறந்தது' : 'Open', c: 'text-emerald-400' },
              { v: totalPYQ, l: 'PYQ', c: 'text-amber-400' },
              { v: governmentExamCategories.length, l: ta ? 'வகைகள்' : 'Categories', c: 'text-blue-400' },
            ].map((s, i) => (
              <div key={i} className="flex-1 bg-white/5 rounded-lg p-2 text-center border border-white/5">
                <div className={cn("text-base font-black", s.c)}>{s.v}</div>
                <div className="text-[8px] text-white/30 font-bold uppercase">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════ MAIN TABS ════ */}
      <div className="container mx-auto px-4">
        <div className="flex gap-0 bg-white dark:bg-slate-800 rounded-2xl shadow-lg -mt-3 mb-4 p-1 relative z-20 border border-gray-100 dark:border-slate-700">
          {([
            { key: 'exams' as MainTab, icon: LayoutGrid, label: ta ? 'தேர்வுகள்' : 'All Exams' },
            { key: 'tnpsc' as MainTab, icon: Calendar, label: ta ? 'TNPSC 2026' : 'TNPSC 2026' },
            { key: 'study' as MainTab, icon: Library, label: ta ? 'பாடம் & PYQ' : 'Syllabus & PYQ' },
          ]).map(t => (
            <button
              key={t.key}
              onClick={() => setMainTab(t.key)}
              className={cn("flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all",
                mainTab === t.key ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <t.icon className="w-3.5 h-3.5" /> {t.label}
            </button>
          ))}
        </div>

        {/* ════════════════════════════════════════
             TAB 1: ALL EXAMS
           ════════════════════════════════════════ */}
        {mainTab === 'exams' && (
          <div>
            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <Input placeholder={ta ? 'NDA, SSC, TNPSC தேடுங்கள்...' : 'Search NDA, SSC, TNPSC, Railway...'} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 pr-8 h-9 text-sm rounded-xl border-gray-200 dark:border-slate-700" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="h-3.5 w-3.5 text-gray-400" /></button>}
            </div>
            {/* Scope filter */}
            <div className="flex gap-1.5 mb-4">
              {([
                { k: 'all' as ExamScope, l: ta ? 'அனைத்தும்' : 'All', c: governmentExams.length },
                { k: 'central' as ExamScope, l: ta ? 'மத்திய அரசு' : 'Central Govt', c: governmentExams.filter(e => centralCats.includes(e.category)).length },
                { k: 'state' as ExamScope, l: ta ? 'மாநில அரசு' : 'State Govt', c: governmentExams.filter(e => e.category === 'state').length },
              ]).map(f => (
                <button key={f.k} onClick={() => setExamScope(f.k)} className={cn("flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                  examScope === f.k ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 border-gray-800 dark:border-gray-200" : "bg-white dark:bg-slate-800 text-gray-500 border-gray-200 dark:border-slate-700"
                )}>
                  {f.l} <span className="text-[9px] ml-1 opacity-60">({f.c})</span>
                </button>
              ))}
            </div>

            {/* Open now alert */}
            {openCount > 0 && !searchQuery && (
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-3.5 mb-4 shadow-lg shadow-emerald-100 dark:shadow-none">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-4 h-4 text-white" />
                  <span className="text-xs font-black text-white uppercase">{ta ? '🔥 இப்போது விண்ணப்பிக்கலாம்!' : '🔥 Applications Open!'}</span>
                </div>
                <div className="space-y-1.5">
                  {governmentExams.filter(e => e.applicationStatus === 'open').slice(0, 4).map(e => (
                    <button key={e.id} className="w-full flex items-center gap-2 bg-white/15 hover:bg-white/25 rounded-lg px-2.5 py-2 transition-all text-left" onClick={() => window.open(e.applyLink, '_blank')}>
                      <span className="text-sm">{catStyle[e.category]?.emoji}</span>
                      <span className="flex-1 text-[11px] font-bold text-white truncate">{e.name}</span>
                      <span className="text-[9px] text-white/50">{fmt(e.salaryMin)}–{fmt(e.salaryMax)}</span>
                      <ArrowUpRight className="w-3 h-3 text-white/40" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Exam cards grouped */}
            {filteredExams.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-sm text-gray-500 font-medium">{ta ? 'கிடைக்கவில்லை' : 'No exams found'}</p>
                <Button variant="link" className="text-indigo-500 text-xs mt-2" onClick={() => { setSearchQuery(''); setExamScope('all'); }}>{ta ? 'அனைத்தும் காட்டு' : 'Show all'}</Button>
              </div>
            ) : (
              Object.entries(grouped).map(([cat, exams]) => {
                const s = catStyle[cat];
                if (!s) return null;
                return (
                  <div key={cat} className="mb-5">
                    <div className={cn("flex items-center gap-2 mb-2 p-2 rounded-lg", s.bg, "dark:bg-slate-800/50")}>
                      <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm bg-gradient-to-br shadow", s.gradient)}>{s.emoji}</div>
                      <div className="flex-1">
                        <h3 className={cn("text-xs font-black", s.text, "dark:text-gray-100")}>{ta ? s.ta : s.label}</h3>
                        <p className="text-[9px] text-gray-400">{exams.length} {ta ? 'தேர்வுகள்' : 'exams'}</p>
                      </div>
                    </div>
                    <div className="space-y-2.5">{exams.map((e, i) => <ExamCard key={e.id} exam={e} idx={i} />)}</div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ════════════════════════════════════════
             TAB 2: TNPSC 2026 ANNUAL PLANNER
           ════════════════════════════════════════ */}
        {mainTab === 'tnpsc' && (
          <div>
            <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-2xl overflow-hidden shadow-xl mb-5">
              <div className="p-4 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-xl">🏛️</div>
                  <div>
                    <h2 className="text-base font-black text-white">{ta ? 'TNPSC 2026 வருடாந்திர திட்டம்' : 'TNPSC 2026 Annual Planner'}</h2>
                    <p className="text-[10px] text-white/40">{ta ? 'வெளியிட்ட தேதி: 03.12.2025 • tnpsc.gov.in' : 'Published: 03.12.2025 • tnpsc.gov.in'}</p>
                  </div>
                </div>
              </div>
              <div className="px-3 pb-3 space-y-2">
                {[
                  { id: 'tnpsc-cts-non-interview', sno: 1, name: ta ? 'CTS (நேர்காணல் அல்லாத)' : 'CTS (Non-Interview Posts)', notify: '20.05.2026', exam: '03.08.2026', days: 7, qual: ta ? 'B.E./B.Tech' : 'B.E./B.Tech', salary: '₹36.9K–₹1.17L', color: 'from-cyan-400 to-blue-500' },
                  { id: 'tnpsc-group1', sno: 2, name: ta ? 'குரூப் I (CCSE-I)' : 'Group I (CCSE-I)', notify: '23.06.2026', exam: '06.09.2026', days: 1, qual: ta ? 'பட்டப்படிப்பு' : 'Any Degree', salary: '₹56.1K–₹2.11L', color: 'from-amber-400 to-orange-500' },
                  { id: 'tnpsc-cts-diploma', sno: 3, name: ta ? 'CTS (டிப்ளோமா/ITI)' : 'CTS (Diploma/ITI)', notify: '07.07.2026', exam: '20.09.2026', days: 7, qual: ta ? 'டிப்ளோமா/ITI' : 'Diploma/ITI', salary: '₹20K–₹72K', color: 'from-teal-400 to-emerald-500' },
                  { id: 'tnpsc-group2', sno: 4, name: ta ? 'குரூப் II & IIA (CCSE-II)' : 'Group II & IIA (CCSE-II)', notify: '11.08.2026', exam: '25.10.2026', days: 1, qual: ta ? 'பட்டப்படிப்பு' : 'Any Degree', salary: '₹36.9K–₹1.2L', color: 'from-rose-400 to-pink-500' },
                  { id: 'tnpsc-cts-interview', sno: 5, name: ta ? 'CTS (நேர்காணல்)' : 'CTS (Interview Posts)', notify: '31.08.2026', exam: '14.11.2026', days: 4, qual: ta ? 'B.E./B.Tech' : 'B.E./B.Tech', salary: '₹56.1K–₹1.77L', color: 'from-blue-400 to-indigo-500' },
                  { id: 'tnpsc-group4', sno: 6, name: ta ? 'குரூப் IV (CCSE-IV)' : 'Group IV (CCSE-IV)', notify: '06.10.2026', exam: '20.12.2026', days: 1, qual: ta ? 'SSLC/12th' : 'SSLC/12th', salary: '₹19.5K–₹62K', color: 'from-emerald-400 to-green-500' },
                ].map(item => {
                  const detail = getDetailLink(item.id);
                  const pyq = getPYQCount(item.id);
                  const syll = getSyllabusCount(item.id);
                  return (
                    <motion.div key={item.sno} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: item.sno * 0.06 }}>
                      <div className="bg-white/10 hover:bg-white/15 rounded-xl p-3 transition-all border border-white/5">
                        <div className="flex items-start gap-2.5">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black text-white bg-gradient-to-br shadow-md flex-shrink-0", item.color)}>{item.sno}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-bold text-white">{item.name}</p>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="text-[9px] text-white/50">🎓 {item.qual}</span>
                              <span className="text-[9px] text-emerald-300">💰 {item.salary}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                              <span className="text-[9px] font-semibold text-amber-300 bg-amber-400/15 px-1.5 py-0.5 rounded">📝 {ta ? 'அறிவிப்பு' : 'Notify'}: {item.notify}</span>
                              <span className="text-[9px] font-semibold text-emerald-300 bg-emerald-400/15 px-1.5 py-0.5 rounded">📅 {ta ? 'தேர்வு' : 'Exam'}: {item.exam}</span>
                              <span className="text-[9px] text-white/30 bg-white/5 px-1.5 py-0.5 rounded">{item.days}{ta ? ' நாட்கள்' : item.days === 1 ? ' Day' : ' Days'}</span>
                            </div>
                            {/* Quick actions */}
                            {detail && (
                              <div className="flex gap-2 mt-2">
                                {syll > 0 && <button className="text-[9px] font-bold text-indigo-300 bg-indigo-400/15 px-2 py-1 rounded-lg hover:bg-indigo-400/25 transition-all flex items-center gap-1" onClick={() => navigate(`/government-exams/${detail.categoryId}/${detail.examId}`)}>
                                  <BookOpen className="w-2.5 h-2.5" /> {ta ? 'பாடத்திட்டம்' : 'Syllabus'} ({syll})
                                </button>}
                                {pyq > 0 && <button className="text-[9px] font-bold text-amber-300 bg-amber-400/15 px-2 py-1 rounded-lg hover:bg-amber-400/25 transition-all flex items-center gap-1" onClick={() => navigate(`/government-exams/${detail.categoryId}/${detail.examId}`)}>
                                  <Target className="w-2.5 h-2.5" /> PYQ ({pyq})
                                </button>}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="px-3 pb-3">
                <div className="bg-white/5 rounded-lg px-3 py-2 flex items-start gap-2 mb-2">
                  <AlertTriangle className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-[9px] text-white/40">{ta ? 'தற்காலிக திட்டம். தேதிகள் மாறலாம். tnpsc.gov.in சரிபார்க்கவும்.' : 'Tentative planner. Dates may change. Check tnpsc.gov.in'}</p>
                </div>
                <Button size="sm" className="w-full h-9 bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold rounded-xl border border-white/10" onClick={() => window.open('https://tnpsc.gov.in', '_blank')}>
                  <ExternalLink className="w-3 h-3 mr-1.5" /> {ta ? 'TNPSC தளம்' : 'TNPSC Official Website'}
                </Button>
              </div>
            </div>

            {/* Other TN State exams */}
            <h3 className="text-xs font-black text-gray-800 dark:text-white mb-2 flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-violet-500" /> {ta ? 'பிற தமிழ்நாடு தேர்வுகள்' : 'Other TN State Exams'}</h3>
            <div className="space-y-2.5">
              {governmentExams.filter(e => e.category === 'state' && !e.id.startsWith('tnpsc')).map((e, i) => <ExamCard key={e.id} exam={e} idx={i} />)}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════
             TAB 3: SYLLABUS & PYQ
           ════════════════════════════════════════ */}
        {mainTab === 'study' && (
          <div>
            {/* Summary */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl p-3 text-white text-center shadow-lg">
                <BookOpen className="w-5 h-5 mx-auto mb-1 opacity-80" />
                <div className="text-xl font-black">{governmentExamCategories.reduce((t, c) => t + c.exams.reduce((a, e) => a + Object.values(e.syllabus).reduce((s, sec) => s + sec.reduce((x, y) => x + y.topics.length, 0), 0), 0), 0)}</div>
                <div className="text-[9px] text-white/60 uppercase font-bold">{ta ? 'பாட தலைப்புகள்' : 'Syllabus Topics'}</div>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-3 text-white text-center shadow-lg">
                <Target className="w-5 h-5 mx-auto mb-1 opacity-80" />
                <div className="text-xl font-black">{totalPYQ}</div>
                <div className="text-[9px] text-white/60 uppercase font-bold">{ta ? 'PYQ கேள்விகள்' : 'PYQ Questions'}</div>
              </div>
            </div>

            {/* Category study cards */}
            <div className="space-y-3">
              {governmentExamCategories.map(category => {
                const totalQ = category.exams.reduce((a, e) => a + e.pyq.length, 0);
                const totalTopics = category.exams.reduce((a, e) => a + Object.values(e.syllabus).reduce((t, s) => t + s.reduce((x, y) => x + y.topics.length, 0), 0), 0);
                const s = catStyle[category.id];
                return (
                  <Card key={category.id} className={cn("cursor-pointer hover:shadow-lg transition-all border-l-4", s?.border)} onClick={() => navigate(`/government-exams/${category.id}`)}>
                    <CardContent className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg bg-gradient-to-br shadow-md", s?.gradient)}>{category.icon}</div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-gray-800 dark:text-white">{ta ? category.nameTamil : category.name}</h4>
                          <div className="flex gap-3 mt-1">
                            <span className="text-[10px] text-gray-500"><span className="font-bold text-gray-700 dark:text-gray-200">{category.exams.length}</span> {ta ? 'தேர்வுகள்' : 'exams'}</span>
                            <span className="text-[10px] text-gray-500"><span className="font-bold text-indigo-600">{totalTopics}</span> {ta ? 'தலைப்புகள்' : 'topics'}</span>
                            <span className="text-[10px] text-gray-500"><span className="font-bold text-amber-600">{totalQ}</span> PYQ</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                      </div>
                      {/* Exam list */}
                      <div className="flex flex-wrap gap-1.5 mt-2.5 ml-13">
                        {category.exams.map(exam => {
                          const ep = exam.pyq.length;
                          return (
                            <button key={exam.id} className="text-[9px] font-medium px-2 py-1 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all flex items-center gap-1" onClick={(e) => { e.stopPropagation(); navigate(`/government-exams/${category.id}/${exam.id}`); }}>
                              {ta ? exam.nameTamil.split('(')[0].trim() : exam.name.split('(')[0].trim()}
                              {ep > 0 && <span className="text-amber-500 font-bold">{ep}Q</span>}
                            </button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Daily tips */}
            <div className="bg-gradient-to-br from-gray-800 to-slate-900 rounded-2xl p-4 mt-5 text-white">
              <h4 className="text-[11px] font-black uppercase tracking-wider mb-2.5 flex items-center gap-2"><Star className="w-3.5 h-3.5 text-amber-400" /> {ta ? 'தினசரி படிப்பு குறிப்புகள்' : 'Daily Study Tips'}</h4>
              <div className="grid grid-cols-1 gap-1.5">
                {(ta ? ['📖 பாடத்திட்டத்தை முழுமையாகப் படிக்கவும்', '⏰ தினமும் 2 மணி நேரம் ஒதுக்கவும்', '✍️ தினமும் 10 PYQ கேள்விகள் தீர்க்கவும்', '🎯 வாரம் ஒரு மாக் டெஸ்ட் எழுதுங்கள்', '📰 தினமும் Current Affairs படிக்கவும்']
                  : ['📖 Study the full syllabus — know every topic', '⏰ 2 hours daily — consistency beats intensity', '✍️ Solve 10 PYQ questions every single day', '🎯 1 full mock test every week', '📰 Daily current affairs — 30% of most exams']).map((t, i) => (
                  <p key={i} className="text-[10px] text-white/60 bg-white/5 rounded-lg px-3 py-1.5">{t}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer disclaimer */}
        <div className="mt-5 text-center">
          <p className="text-[9px] text-gray-400">⚠️ {ta ? 'தேதிகள் மாறலாம். அதிகாரப்பூர்வ தளங்களில் சரிபார்க்கவும்.' : 'Dates may change. Always verify from official websites.'}</p>
        </div>
      </div>
    </div>
  );
};

export default GovernmentExams;
