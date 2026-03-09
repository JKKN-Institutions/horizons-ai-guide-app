import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Search, BookOpen, Users, Banknote,
  GraduationCap, ChevronRight, ChevronDown, FileText,
  CalendarClock, X, ExternalLink, Star,
  Target, Play, ArrowUpRight, AlertTriangle,
  Sparkles, MapPin, Briefcase, Clock, Shield,
  Award, TrendingUp, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/useLanguage';
import { governmentExamCategories } from '@/data/government-exams-data';
import { governmentExams } from '@/components/GovernmentJobs/governmentExamsData';
import { cn } from '@/lib/utils';

const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;

const CAT: Record<string, { icon: string; label: string; ta: string; accent: string; bg: string; dot: string }> = {
  defence:  { icon: '🎖️', label: 'Defence & Paramilitary', ta: 'பாதுகாப்பு & துணை ராணுவம்', accent: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30', dot: 'bg-amber-500' },
  railway:  { icon: '🚆', label: 'Indian Railways', ta: 'இந்திய ரயில்வே', accent: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-950/30', dot: 'bg-rose-500' },
  ssc:      { icon: '📝', label: 'Staff Selection Commission', ta: 'SSC', accent: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30', dot: 'bg-blue-500' },
  banking:  { icon: '🏦', label: 'Banking & Insurance', ta: 'வங்கி & காப்பீடு', accent: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30', dot: 'bg-emerald-500' },
  state:    { icon: '🏛️', label: 'Tamil Nadu State Govt', ta: 'தமிழ்நாடு மாநில அரசு', accent: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/30', dot: 'bg-violet-500' },
  central:  { icon: '🇮🇳', label: 'Other Central Govt', ta: 'பிற மத்திய அரசு', accent: 'text-sky-600', bg: 'bg-sky-50 dark:bg-sky-950/30', dot: 'bg-sky-500' },
};

const getDetail = (id: string) => { for (const c of governmentExamCategories) { const f = c.exams.find(e => e.id === id); if (f) return { cat: c.id, id: f.id, pyq: f.pyq.length, topics: Object.values(f.syllabus).reduce((t, s) => t + s.reduce((a, x) => a + x.topics.length, 0), 0) }; } return null; };

type Scope = 'all' | 'defence' | 'railway' | 'ssc' | 'banking' | 'state' | 'central';

const GovernmentExams = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = language === 'ta';

  const [search, setSearch] = useState('');
  const [scope, setScope] = useState<Scope>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

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
    <div className="min-h-screen">
      {/* ──────────── HEADER ──────────── */}
      <div className="border-b border-gray-100/60 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="flex-1">
            <h1 className="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight">{t ? 'அரசு தேர்வுகள்' : 'Government Exams'}</h1>
            <p className="text-[10px] text-gray-400 tracking-wide">{t ? '12ஆம் வகுப்பு தேர்ச்சி • 31 தேர்வுகள்' : '12th Pass Eligible • 31 Exams'}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-4 pb-8">

        {/* ──────────── HERO STATS ──────────── */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {[
            { value: '31', label: t ? 'தேர்வுகள்' : 'Exams', sub: t ? 'மொத்தம்' : 'Total' },
            { value: String(openCount), label: t ? 'திறந்தது' : 'Open', sub: t ? 'விண்ணப்பிக்கலாம்' : 'Apply now' },
            { value: String(totalPYQ), label: 'PYQ', sub: t ? 'கேள்விகள்' : 'Questions' },
            { value: '6', label: t ? 'வகைகள்' : 'Sectors', sub: t ? 'துறைகள்' : 'Categories' },
          ].map((s, i) => (
            <div key={i} className="text-center py-3 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
              <p className="text-xl font-extrabold text-gray-900 dark:text-white leading-none">{s.value}</p>
              <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ──────────── OPEN APPLICATIONS ──────────── */}
        {openCount > 0 && !search && scope === 'all' && (
          <div className="mb-5 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">{t ? 'விண்ணப்பம் திறக்கப்பட்டுள்ளது' : 'Applications Open'}</p>
            </div>
            <div className="space-y-2">
              {governmentExams.filter(e => e.applicationStatus === 'open').slice(0, 4).map(e => {
                const c = CAT[e.category];
                return (
                  <button key={e.id} onClick={() => window.open(e.applyLink, '_blank')} className="w-full flex items-center gap-3 bg-white dark:bg-slate-900 rounded-xl px-3 py-2.5 border border-emerald-100 dark:border-emerald-900/50 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all text-left group">
                    <span className="text-base">{c?.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-gray-900 dark:text-white truncate">{e.name}</p>
                      <p className="text-[10px] text-gray-400">{fmt(e.salaryMin)} – {fmt(e.salaryMax)}/{t ? 'மா' : 'mo'}</p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ──────────── SEARCH ──────────── */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 dark:text-gray-600" />
          <Input
            placeholder={t ? 'தேர்வுகள் தேடுங்கள்...' : 'Search exams...'}
            value={search} onChange={e => setSearch(e.target.value)}
            className="pl-10 pr-10 h-11 text-sm rounded-xl bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-800 focus:border-gray-400 dark:focus:border-slate-600 placeholder:text-gray-300 dark:placeholder:text-gray-600"
          />
          {search && <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X className="h-4 w-4 text-gray-300" /></button>}
        </div>

        {/* ──────────── CATEGORY FILTER ──────────── */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-5 -mx-1 px-1 scrollbar-hide">
          <button onClick={() => setScope('all')} className={cn("px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border", scope === 'all' ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white" : "bg-white dark:bg-slate-900 text-gray-500 border-gray-200 dark:border-slate-800 hover:border-gray-300")}>
            {t ? 'அனைத்தும்' : 'All'} · 31
          </button>
          {Object.entries(CAT).map(([key, c]) => {
            const count = governmentExams.filter(e => e.category === key).length;
            return (
              <button key={key} onClick={() => setScope(scope === key ? 'all' : key as Scope)} className={cn("flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border", scope === key ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white" : "bg-white dark:bg-slate-900 text-gray-500 border-gray-200 dark:border-slate-800 hover:border-gray-300")}>
                {c.icon} {t ? c.ta.split(' ')[0] : c.label.split(' ')[0]} · {count}
              </button>
            );
          })}
        </div>

        {/* ──────────── EXAM CARDS ──────────── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-300 dark:text-gray-600 text-4xl mb-3">∅</p>
            <p className="text-sm text-gray-400 font-medium">{t ? 'தேர்வுகள் கிடைக்கவில்லை' : 'No exams found'}</p>
            <button onClick={() => { setSearch(''); setScope('all'); }} className="text-xs text-blue-500 font-semibold mt-2">{t ? 'அனைத்தும்' : 'Clear filters'}</button>
          </div>
        ) : (
          Object.entries(grouped).map(([cat, exams]) => {
            const c = CAT[cat];
            if (!c) return null;
            return (
              <div key={cat} className="mb-6">
                {/* Category header */}
                <div className="flex items-center gap-2.5 mb-3 px-1">
                  <span className="text-lg">{c.icon}</span>
                  <div className="flex-1">
                    <h2 className="text-[13px] font-bold text-gray-800 dark:text-gray-100">{t ? c.ta : c.label}</h2>
                    <p className="text-[10px] text-gray-400">{exams.length} {t ? 'தேர்வுகள்' : 'exams'} · {exams.filter(e => e.applicationStatus === 'open').length} {t ? 'திறந்தது' : 'open'}</p>
                  </div>
                </div>

                {/* Exam cards */}
                <div className="space-y-2">
                  {exams.map((exam, idx) => {
                    const detail = getDetail(exam.id);
                    const isOpen = expanded === exam.id;
                    const examDate = exam.nextExamDate ? new Date(exam.nextExamDate) : null;
                    const daysLeft = examDate ? Math.ceil((examDate.getTime() - Date.now()) / 86400000) : null;

                    return (
                      <motion.div
                        key={exam.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(idx * 0.03, 0.2) }}
                      >
                        <div className={cn(
                          "rounded-2xl border transition-all duration-200",
                          isOpen ? "border-gray-300 dark:border-slate-600 shadow-lg" : "border-gray-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700"
                        )}>
                          {/* Card header — always visible */}
                          <button className="w-full p-4 text-left" onClick={() => setExpanded(isOpen ? null : exam.id)}>
                            <div className="flex items-start gap-3">
                              {/* Status dot */}
                              <div className="mt-1.5 flex-shrink-0">
                                <div className={cn("w-2.5 h-2.5 rounded-full", exam.applicationStatus === 'open' ? "bg-emerald-500 animate-pulse" : exam.applicationStatus === 'upcoming' ? "bg-amber-400" : "bg-gray-300 dark:bg-gray-600")} />
                              </div>

                              <div className="flex-1 min-w-0">
                                {/* Name row */}
                                <div className="flex items-center gap-2 mb-0.5">
                                  <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white truncate leading-tight">{exam.name}</h3>
                                </div>
                                <p className="text-[10px] text-gray-400 mb-2">{exam.nameTamil}</p>

                                {/* Stats row */}
                                <div className="flex items-center gap-3 text-[10px] text-gray-500 dark:text-gray-400">
                                  <span className="flex items-center gap-1"><Banknote className="w-3 h-3 text-emerald-500" /> {fmt(exam.salaryMin)}–{fmt(exam.salaryMax)}</span>
                                  <span className="flex items-center gap-1"><Users className="w-3 h-3 text-blue-400" /> {exam.ageMin}–{exam.ageMax}y</span>
                                  {examDate && daysLeft !== null && daysLeft > 0 && (
                                    <span className={cn("flex items-center gap-1 font-semibold", daysLeft <= 30 ? "text-rose-500" : "text-gray-400")}>
                                      <CalendarClock className="w-3 h-3" /> {daysLeft}d
                                    </span>
                                  )}
                                </div>
                              </div>

                              <ChevronDown className={cn("w-4 h-4 text-gray-300 dark:text-gray-600 transition-transform mt-1 flex-shrink-0", isOpen && "rotate-180")} />
                            </div>
                          </button>

                          {/* Expanded content */}
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                <div className="px-4 pb-4 pt-0 border-t border-gray-50 dark:border-slate-800/50 mt-0">
                                  <div className="pt-3 space-y-3">
                                    {/* Description */}
                                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">{exam.description}</p>

                                    {/* Info grid */}
                                    <div className="grid grid-cols-3 gap-2">
                                      <div className="rounded-xl bg-gray-50 dark:bg-slate-900 p-2.5 text-center">
                                        <p className="text-[10px] font-bold text-gray-700 dark:text-gray-200">{exam.qualification}</p>
                                        <p className="text-[8px] text-gray-400 uppercase tracking-wider mt-0.5">{t ? 'தகுதி' : 'Eligibility'}</p>
                                      </div>
                                      <div className="rounded-xl bg-gray-50 dark:bg-slate-900 p-2.5 text-center">
                                        <p className="text-[10px] font-bold text-emerald-600">{fmt(exam.salaryMin)}–{fmt(exam.salaryMax)}</p>
                                        <p className="text-[8px] text-gray-400 uppercase tracking-wider mt-0.5">{t ? 'சம்பளம்' : 'Salary/mo'}</p>
                                      </div>
                                      <div className="rounded-xl bg-gray-50 dark:bg-slate-900 p-2.5 text-center">
                                        <p className="text-[10px] font-bold text-gray-700 dark:text-gray-200">{exam.examPattern}</p>
                                        <p className="text-[8px] text-gray-400 uppercase tracking-wider mt-0.5">{t ? 'தேர்வு' : 'Pattern'}</p>
                                      </div>
                                    </div>

                                    {/* Selection process */}
                                    <div className="flex items-center gap-1 flex-wrap">
                                      {exam.selectionProcess.map((step, i) => (
                                        <span key={i} className="flex items-center gap-1">
                                          <span className="text-[9px] font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-lg">{step}</span>
                                          {i < exam.selectionProcess.length - 1 && <span className="text-gray-300 dark:text-gray-600 text-[8px]">→</span>}
                                        </span>
                                      ))}
                                    </div>

                                    {/* Posts */}
                                    {exam.posts && exam.posts.length > 0 && (
                                      <div className="flex gap-1.5 flex-wrap">
                                        {exam.posts.map((p, i) => (
                                          <span key={i} className="text-[9px] font-medium px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">{p}</span>
                                        ))}
                                      </div>
                                    )}

                                    {/* Actions */}
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                      {detail && detail.topics > 0 && (
                                        <button onClick={() => navigate(`/government-exams/${detail.cat}/${detail.id}`)} className="flex items-center justify-center gap-1.5 h-10 rounded-xl border border-gray-200 dark:border-slate-700 text-[11px] font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                                          <BookOpen className="w-3.5 h-3.5 text-indigo-500" /> {t ? 'பாடத்திட்டம்' : 'Syllabus'} <span className="text-gray-400">({detail.topics})</span>
                                        </button>
                                      )}
                                      {detail && detail.pyq > 0 && (
                                        <button onClick={() => navigate(`/government-exams/${detail.cat}/${detail.id}`)} className="flex items-center justify-center gap-1.5 h-10 rounded-xl border border-gray-200 dark:border-slate-700 text-[11px] font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                                          <Target className="w-3.5 h-3.5 text-amber-500" /> PYQ <span className="text-gray-400">({detail.pyq})</span>
                                        </button>
                                      )}
                                      {detail && detail.pyq > 0 && (
                                        <button onClick={() => navigate(`/government-exams/${detail.cat}/${detail.id}`)} className="flex items-center justify-center gap-1.5 h-10 rounded-xl border border-gray-200 dark:border-slate-700 text-[11px] font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                                          <Play className="w-3.5 h-3.5 text-emerald-500" /> {t ? 'மாக் டெஸ்ட்' : 'Mock Test'}
                                        </button>
                                      )}
                                      <button
                                        onClick={() => exam.applicationStatus !== 'closed' && window.open(exam.applyLink, '_blank')}
                                        disabled={exam.applicationStatus === 'closed'}
                                        className={cn("flex items-center justify-center gap-1.5 h-10 rounded-xl text-[11px] font-semibold transition-colors",
                                          exam.applicationStatus === 'open' ? "bg-emerald-600 text-white hover:bg-emerald-700" :
                                          exam.applicationStatus === 'upcoming' ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100" :
                                          "bg-gray-100 dark:bg-slate-800 text-gray-400 cursor-not-allowed"
                                        )}
                                      >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        {exam.applicationStatus === 'open' ? (t ? 'விண்ணப்பிக்க' : 'Apply Now') : exam.applicationStatus === 'upcoming' ? (t ? 'தளம்' : 'Official Site') : (t ? 'மூடப்பட்டது' : 'Closed')}
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

        {/* ──────────── STUDY RESOURCES ──────────── */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-800 dark:text-white">{t ? 'படிப்பு வளங்கள்' : 'Study Resources'}</h2>
            <p className="text-[10px] text-gray-400">{t ? 'பாடத்திட்டம், PYQ & மாக் டெஸ்ட்' : 'Syllabus, PYQ & Mock Tests'}</p>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {governmentExamCategories.map(category => {
              const pyq = category.exams.reduce((a, e) => a + e.pyq.length, 0);
              const topics = category.exams.reduce((a, e) => a + Object.values(e.syllabus).reduce((t, s) => t + s.reduce((x, y) => x + y.topics.length, 0), 0), 0);
              const c = CAT[category.id];
              return (
                <button key={category.id} onClick={() => navigate(`/government-exams/${category.id}`)} className="text-left rounded-2xl border border-gray-100 dark:border-slate-800 p-3.5 hover:border-gray-300 dark:hover:border-slate-600 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">{category.icon}</span>
                    <h3 className="text-[11px] font-bold text-gray-800 dark:text-gray-100 truncate">{t ? category.nameTamil.split('&')[0].trim() : category.name.split('&')[0].trim()}</h3>
                  </div>
                  <div className="flex gap-3 text-[9px] text-gray-400 mb-2">
                    <span><span className="font-bold text-gray-600 dark:text-gray-300">{category.exams.length}</span> {t ? 'தேர்வு' : 'exams'}</span>
                    <span><span className="font-bold text-indigo-500">{topics}</span> {t ? 'தலைப்பு' : 'topics'}</span>
                    <span><span className="font-bold text-amber-500">{pyq}</span> PYQ</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-semibold text-gray-400 group-hover:text-blue-500 transition-colors">
                    {t ? 'திறக்க' : 'Open'} <ChevronRight className="w-3 h-3" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ──────────── FOOTER NOTE ──────────── */}
        <div className="mt-8 text-center">
          <p className="text-[9px] text-gray-300 dark:text-gray-700 leading-relaxed max-w-xs mx-auto">
            {t ? 'தேதிகள் மற்றும் தகுதிகள் மாறக்கூடும். விண்ணப்பிக்கும் முன் அதிகாரப்பூர்வ தளத்தில் சரிபார்க்கவும்.' : 'Dates and eligibility are subject to change. Always verify from official government websites before applying.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GovernmentExams;
