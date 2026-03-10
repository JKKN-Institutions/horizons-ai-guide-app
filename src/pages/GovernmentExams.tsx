import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Search, BookOpen, Users, Banknote,
  GraduationCap, ChevronRight, ChevronDown, FileText,
  CalendarClock, X, ExternalLink,
  Target, Play, ArrowUpRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/useLanguage';
import { governmentExamCategories } from '@/data/government-exams-data';
import { governmentExams } from '@/components/GovernmentJobs/governmentExamsData';
import { cn } from '@/lib/utils';

const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;

const CAT: Record<string, { icon: string; label: string; ta: string; bg: string }> = {
  defence:  { icon: '🎖️', label: 'Defence & Paramilitary', ta: 'பாதுகாப்பு & துணை ராணுவம்', bg: 'bg-amber-50' },
  railway:  { icon: '🚆', label: 'Indian Railways', ta: 'இந்திய ரயில்வே', bg: 'bg-rose-50' },
  ssc:      { icon: '📝', label: 'Staff Selection Commission', ta: 'SSC', bg: 'bg-blue-50' },
  state:    { icon: '🏛️', label: 'Tamil Nadu State Govt', ta: 'தமிழ்நாடு மாநில அரசு', bg: 'bg-violet-50' },
  central:  { icon: '🇮🇳', label: 'Central Govt & Others', ta: 'மத்திய அரசு & பிற', bg: 'bg-teal-50' },
};

const getDetail = (id: string) => {
  for (const c of governmentExamCategories) {
    const f = c.exams.find(e => e.id === id);
    if (f) return { cat: c.id, id: f.id, pyq: f.pyq.length, topics: Object.values(f.syllabus).reduce((t, s) => t + s.reduce((a, x) => a + x.topics.length, 0), 0) };
  }
  return null;
};

type Scope = 'all' | 'defence' | 'railway' | 'ssc' | 'state' | 'central';

const statusCfg = {
  open:     { label: 'Open',     ta: 'திறக்கப்பட்டது', dot: 'bg-emerald-500 animate-pulse', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', btn: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
  upcoming: { label: 'Upcoming', ta: 'வரவிருக்கிறது',    dot: 'bg-amber-400',                badge: 'bg-amber-100 text-amber-700 border-amber-200',     btn: 'bg-gray-900 hover:bg-gray-800 text-white' },
  closed:   { label: 'Closed',   ta: 'மூடப்பட்டது',     dot: 'bg-gray-300',                  badge: 'bg-gray-100 text-gray-500 border-gray-200',         btn: 'bg-gray-100 text-gray-400 cursor-not-allowed' },
};

const GovernmentExams = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = language === 'ta';

  const [search, setSearch] = useState('');
  const [scope, setScope] = useState<Scope>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const totalExams = governmentExams.length;
  const openCount = useMemo(() => governmentExams.filter(e => e.applicationStatus === 'open').length, []);
  const totalPYQ = useMemo(() => governmentExamCategories.reduce((s, c) => s + c.exams.reduce((a, e) => a + e.pyq.length, 0), 0), []);

  const filtered = useMemo(() => {
    let list = [...governmentExams];
    if (scope !== 'all') list = list.filter(e => e.category === scope);
    if (search.trim()) { const q = search.toLowerCase(); list = list.filter(e => e.name.toLowerCase().includes(q) || e.nameTamil.includes(q) || e.description.toLowerCase().includes(q) || e.posts?.some(p => p.toLowerCase().includes(q))); }
    return list;
  }, [scope, search]);

  const grouped = useMemo(() => {
    const g: Record<string, typeof filtered> = {};
    filtered.forEach(e => { if (!g[e.category]) g[e.category] = []; g[e.category].push(e); });
    return g;
  }, [filtered]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* ── HEADER ── */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/')} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-gray-900">{t ? 'அரசு தேர்வுகள்' : 'Government Exams'}</h1>
            <p className="text-xs text-gray-500">{t ? `12ஆம் வகுப்பு தேர்ச்சி • ${totalExams} தேர்வுகள்` : `12th Pass Eligible • ${totalExams} Exams`}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-4 pb-10">

        {/* ── HERO STATS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
          {[
            { value: String(totalExams), label: t ? 'தேர்வுகள்' : 'Exams', color: 'text-gray-900' },
            { value: String(openCount), label: t ? 'திறந்தது' : 'Open Now', color: 'text-emerald-600' },
            { value: String(totalPYQ), label: 'PYQ', color: 'text-blue-600' },
            { value: '5', label: t ? 'வகைகள்' : 'Sectors', color: 'text-violet-600' },
          ].map((s, i) => (
            <div key={i} className="text-center py-3.5 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <p className={cn("text-xl font-extrabold leading-none", s.color)}>{s.value}</p>
              <p className="text-xs font-medium text-gray-500 mt-1.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── OPEN APPLICATIONS ── */}
        {openCount > 0 && !search && scope === 'all' && (
          <div className="mb-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-sm font-bold text-emerald-800 uppercase tracking-wider">{t ? 'விண்ணப்பம் திறக்கப்பட்டுள்ளது' : 'Applications Open'}</p>
            </div>
            <div className="space-y-2">
              {governmentExams.filter(e => e.applicationStatus === 'open').slice(0, 4).map(e => {
                const c = CAT[e.category];
                return (
                  <button key={e.id} onClick={() => window.open(e.applyLink, '_blank')} className="w-full flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md transition-all text-left group">
                    <span className="text-lg">{c?.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{e.name}</p>
                      <p className="text-xs text-gray-500">{fmt(e.salaryMin)} – {fmt(e.salaryMax)}/{t ? 'மா' : 'mo'}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── SEARCH ── */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t ? 'தேர்வுகள் தேடுங்கள்...' : 'Search exams, posts, sectors...'}
            value={search} onChange={e => setSearch(e.target.value)}
            className="pl-10 pr-10 h-12 text-sm rounded-xl bg-white border-gray-200 focus:border-gray-400 placeholder:text-gray-400 shadow-sm"
          />
          {search && <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X className="h-4 w-4 text-gray-400" /></button>}
        </div>

        {/* ── CATEGORY PILLS ── */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-1 px-1 scrollbar-hide">
          <button onClick={() => setScope('all')} className={cn("px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border shadow-sm", scope === 'all' ? "bg-gray-900 text-white border-gray-900 shadow-md" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400")}>
            {t ? 'அனைத்தும்' : 'All'} · {totalExams}
          </button>
          {Object.entries(CAT).map(([key, c]) => {
            const count = governmentExams.filter(e => e.category === key).length;
            return (
              <button key={key} onClick={() => setScope(scope === key ? 'all' : key as Scope)} className={cn("flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border shadow-sm", scope === key ? "bg-gray-900 text-white border-gray-900 shadow-md" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400")}>
                {c.icon} {t ? c.ta.split(' ')[0] : c.label.split(' ')[0]} · {count}
              </button>
            );
          })}
        </div>

        {/* ── EXAM LIST ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-300 text-5xl mb-3">∅</p>
            <p className="text-sm text-gray-500 font-medium">{t ? 'தேர்வுகள் கிடைக்கவில்லை' : 'No exams found'}</p>
            <button onClick={() => { setSearch(''); setScope('all'); }} className="text-sm text-blue-600 font-bold mt-3">{t ? 'அனைத்தும் காண்க' : 'Clear filters'}</button>
          </div>
        ) : (
          Object.entries(grouped).map(([cat, exams]) => {
            const c = CAT[cat];
            if (!c) return null;
            return (
              <div key={cat} className="mb-7">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-3 px-1">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-lg", c.bg)}>{c.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-sm font-bold text-gray-800">{t ? c.ta : c.label}</h2>
                    <p className="text-xs text-gray-500">{exams.length} {t ? 'தேர்வுகள்' : 'exams'} · {exams.filter(e => e.applicationStatus === 'open').length} {t ? 'திறந்தது' : 'open'}</p>
                  </div>
                </div>

                {/* Exam cards */}
                <div className="space-y-2.5">
                  {exams.map((exam, idx) => {
                    const detail = getDetail(exam.id);
                    const isOpen = expanded === exam.id;
                    const examDate = exam.nextExamDate ? new Date(exam.nextExamDate) : null;
                    const daysLeft = examDate ? Math.ceil((examDate.getTime() - Date.now()) / 86400000) : null;
                    const st = statusCfg[exam.applicationStatus as keyof typeof statusCfg] || statusCfg.closed;

                    return (
                      <motion.div key={exam.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(idx * 0.03, 0.2) }}>
                        <div className={cn("rounded-2xl border bg-white transition-all duration-200", isOpen ? "border-gray-300 shadow-lg ring-1 ring-gray-200" : "border-gray-200 hover:border-gray-300 hover:shadow-md")}>

                          {/* Card Header */}
                          <button className="w-full p-4 text-left" onClick={() => setExpanded(isOpen ? null : exam.id)}>
                            <div className="flex items-start gap-3">
                              <div className="mt-1 flex-shrink-0"><div className={cn("w-3 h-3 rounded-full", st.dot)} /></div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <h3 className="text-sm font-bold text-gray-900 leading-tight">{exam.name}</h3>
                                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", st.badge)}>{t ? st.ta : st.label}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-2">{exam.nameTamil}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-600">
                                  <span className="flex items-center gap-1"><Banknote className="w-3.5 h-3.5 text-emerald-500" /> <span className="font-semibold">{fmt(exam.salaryMin)}–{fmt(exam.salaryMax)}</span></span>
                                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-blue-400" /> {exam.ageMin}–{exam.ageMax} yrs</span>
                                  {examDate && daysLeft !== null && daysLeft > 0 && (
                                    <span className={cn("flex items-center gap-1 font-bold", daysLeft <= 30 ? "text-rose-500" : daysLeft <= 90 ? "text-amber-500" : "text-gray-400")}><CalendarClock className="w-3.5 h-3.5" /> {daysLeft}d</span>
                                  )}
                                </div>
                              </div>
                              <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform mt-1 flex-shrink-0", isOpen && "rotate-180")} />
                            </div>
                          </button>

                          {/* Expanded */}
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                <div className="px-4 pb-5 border-t border-gray-100">
                                  <div className="pt-4 space-y-4">
                                    
                                    {/* Description */}
                                    <p className="text-sm text-gray-600 leading-relaxed">{exam.description}</p>

                                    {/* ── KEY INFO — 2×2 Grid (wider boxes, nothing cut off) ── */}
                                    <div className="grid grid-cols-2 gap-2.5">
                                      <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-100 p-3.5">
                                        <Banknote className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                        <div>
                                          <p className="text-sm font-bold text-emerald-700">{fmt(exam.salaryMin)} – {fmt(exam.salaryMax)}</p>
                                          <p className="text-xs text-emerald-600/70">{t ? 'மாத சம்பளம்' : 'Monthly Salary'}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3 rounded-xl bg-blue-50 border border-blue-100 p-3.5">
                                        <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                        <div>
                                          <p className="text-sm font-bold text-blue-700">{exam.ageMin} – {exam.ageMax} {t ? 'வயது' : 'years'}</p>
                                          <p className="text-xs text-blue-600/70">{t ? 'வயது வரம்பு' : 'Age Limit'}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3 rounded-xl bg-violet-50 border border-violet-100 p-3.5">
                                        <GraduationCap className="w-5 h-5 text-violet-600 flex-shrink-0" />
                                        <div>
                                          <p className="text-sm font-bold text-violet-700">{exam.qualification}</p>
                                          <p className="text-xs text-violet-600/70">{t ? 'கல்வித் தகுதி' : 'Education'}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-100 p-3.5">
                                        <CalendarClock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                        <div>
                                          <p className="text-sm font-bold text-amber-700">
                                            {examDate ? examDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : t ? 'அறிவிக்கப்படும்' : 'TBA'}
                                          </p>
                                          <p className="text-xs text-amber-600/70">{t ? 'தேர்வு தேதி' : 'Exam Date'}</p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* ── EXAM PATTERN — Highlight Bar ── */}
                                    <div className="flex items-center gap-3 bg-gray-900 text-white rounded-xl px-4 py-3">
                                      <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                      <div>
                                        <p className="text-xs font-bold text-white">{exam.examPattern}</p>
                                        <p className="text-xs text-gray-400">{t ? 'தேர்வு முறை' : 'Exam Pattern'}</p>
                                      </div>
                                    </div>

                                    {/* ── SELECTION PROCESS — Numbered Steps ── */}
                                    <div>
                                      <p className="text-xs font-bold text-gray-700 mb-2.5">{t ? 'தேர்வு செயல்முறை' : 'Selection Process'}</p>
                                      <div className="space-y-1.5">
                                        {exam.selectionProcess.map((step: string, i: number) => (
                                          <div key={i} className="flex items-center gap-2.5">
                                            <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                                            <p className="text-sm text-gray-700 font-medium">{step}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* ── POSTS — Clean Badges ── */}
                                    {exam.posts && exam.posts.length > 0 && (
                                      <div>
                                        <p className="text-xs font-bold text-gray-700 mb-2">{t ? 'பதவிகள்' : 'Available Posts'}</p>
                                        <div className="flex gap-2 flex-wrap">
                                          {exam.posts.map((p: string, i: number) => (
                                            <span key={i} className="text-sm font-medium px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">{p}</span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* ── ACTION BUTTONS ── */}
                                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                                      {detail && detail.topics > 0 && (
                                        <button onClick={() => navigate(`/government-exams/${detail.cat}/${detail.id}`)} className="flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-indigo-200 bg-indigo-50 text-sm font-bold text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 transition-all active:scale-95">
                                          <BookOpen className="w-4.5 h-4.5" /> {t ? 'பாடத்திட்டம்' : 'Syllabus'} ({detail.topics})
                                        </button>
                                      )}
                                      {detail && detail.pyq > 0 && (
                                        <button onClick={() => navigate(`/government-exams/${detail.cat}/${detail.id}`)} className="flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-amber-200 bg-amber-50 text-sm font-bold text-amber-700 hover:bg-amber-100 hover:border-amber-300 transition-all active:scale-95">
                                          <Target className="w-4.5 h-4.5" /> PYQ ({detail.pyq})
                                        </button>
                                      )}
                                      {detail && detail.pyq > 0 && (
                                        <button onClick={() => navigate(`/government-exams/${detail.cat}/${detail.id}`)} className="flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-emerald-200 bg-emerald-50 text-sm font-bold text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 transition-all active:scale-95">
                                          <Play className="w-4.5 h-4.5" /> {t ? 'மாக் டெஸ்ட்' : 'Mock Test'}
                                        </button>
                                      )}
                                      <button onClick={() => exam.applicationStatus !== 'closed' && window.open(exam.applyLink, '_blank')} disabled={exam.applicationStatus === 'closed'} className={cn("flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-bold transition-all active:scale-95", st.btn)}>
                                        <ExternalLink className="w-4.5 h-4.5" />
                                        {exam.applicationStatus === 'open' ? (t ? 'விண்ணப்பிக்க' : 'Apply Now') : exam.applicationStatus === 'upcoming' ? (t ? 'அதிகாரப்பூர்வ' : 'Official Site') : (t ? 'மூடப்பட்டது' : 'Closed')}
                                      </button>
                                    </div>

                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}

        {/* ── STUDY RESOURCES ── */}
        <div className="mt-8 pt-6 border-t-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-800">{t ? 'படிப்பு வளங்கள்' : 'Study Resources'}</h2>
            <p className="text-xs text-gray-500">{t ? 'பாடத்திட்டம், PYQ & மாக் டெஸ்ட்' : 'Syllabus, PYQ & Mock Tests'}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {governmentExamCategories.map(category => {
              const pyq = category.exams.reduce((a, e) => a + e.pyq.length, 0);
              const topics = category.exams.reduce((a, e) => a + Object.values(e.syllabus).reduce((t, s) => t + s.reduce((x, y) => x + y.topics.length, 0), 0), 0);
              return (
                <button key={category.id} onClick={() => navigate(`/government-exams/${category.id}`)} className="text-left rounded-2xl border-2 border-gray-200 bg-white p-4 hover:border-gray-400 hover:shadow-lg transition-all group">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-lg">{category.icon}</span>
                    <h3 className="text-xs font-bold text-gray-800 leading-tight">{t ? category.nameTamil.split('&')[0].trim() : category.name.split('&')[0].trim()}</h3>
                  </div>
                  <div className="flex gap-3 text-xs text-gray-500 mb-3">
                    <span><span className="font-bold text-gray-700">{category.exams.length}</span> exams</span>
                    <span><span className="font-bold text-indigo-600">{topics}</span> topics</span>
                    <span><span className="font-bold text-amber-600">{pyq}</span> PYQ</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-400 group-hover:text-blue-600 transition-colors">
                    {t ? 'திறக்க' : 'View All'} <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="mt-8 text-center px-4">
          <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
            {t ? 'தேதிகள் மற்றும் தகுதிகள் மாறக்கூடும். விண்ணப்பிக்கும் முன் அதிகாரப்பூர்வ தளத்தில் சரிபார்க்கவும்.' : 'Dates and eligibility are subject to change. Always verify from official government websites before applying.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GovernmentExams;
