import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Calendar, ExternalLink, Bookmark, ChevronRight,
  GraduationCap, X, Shield, Train, FileText, Landmark,
  Flag, Users, Banknote, Clock, Target
} from 'lucide-react';
import { governmentExams } from './governmentExamsData';
import { CategoryType, StatusType } from './types';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

const CAT: Record<string, {
  icon: typeof Shield; label: string; ta: string;
  pillActive: string; cardIcon: string; cardBg: string;
}> = {
  defence: { icon: Shield, label: 'Defence', ta: 'பாதுகாப்பு', pillActive: 'bg-emerald-600 text-white border-emerald-600', cardIcon: 'text-emerald-600', cardBg: 'bg-emerald-50' },
  railway: { icon: Train, label: 'Railway', ta: 'ரயில்வே', pillActive: 'bg-blue-600 text-white border-blue-600', cardIcon: 'text-blue-600', cardBg: 'bg-blue-50' },
  ssc: { icon: FileText, label: 'SSC', ta: 'SSC', pillActive: 'bg-violet-600 text-white border-violet-600', cardIcon: 'text-violet-600', cardBg: 'bg-violet-50' },
  state: { icon: Landmark, label: 'TN State', ta: 'தமிழ்நாடு', pillActive: 'bg-rose-600 text-white border-rose-600', cardIcon: 'text-rose-600', cardBg: 'bg-rose-50' },
  central: { icon: Flag, label: 'Central Govt', ta: 'மத்திய அரசு', pillActive: 'bg-amber-600 text-white border-amber-600', cardIcon: 'text-amber-600', cardBg: 'bg-amber-50' },
};

const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;

export const GovernmentJobs = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const ta = language === 'ta';

  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState<CategoryType>('all');
  const [activeStatus, setActiveStatus] = useState<StatusType>('all');
  const [savedSet, setSavedSet] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => setSavedSet(prev => {
    const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s;
  });

  const filtered = useMemo(() => governmentExams.filter(e => {
    if (search) { const q = search.toLowerCase(); if (!e.name.toLowerCase().includes(q) && !e.nameTamil.includes(q) && !e.description.toLowerCase().includes(q)) return false; }
    if (activeCat !== 'all' && e.category !== activeCat) return false;
    if (activeStatus !== 'all' && e.applicationStatus !== activeStatus) return false;
    return true;
  }), [search, activeCat, activeStatus]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    governmentExams.forEach(e => { c[e.category] = (c[e.category] || 0) + 1; });
    return c;
  }, []);

  const openCount = useMemo(() => governmentExams.filter(e => e.applicationStatus === 'open').length, []);
  const topSalary = useMemo(() => Math.max(...governmentExams.map(e => e.salaryMax)), []);

  return (
    <div className="space-y-6">

      {/* ══════════ HERO BANNER ══════════ */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white leading-tight">
                {ta ? 'அரசு வேலை வாய்ப்புகள்' : 'Government Job Opportunities'}
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                {ta ? '12ஆம் வகுப்பு தகுதி • பட்டம் தேவையில்லை' : '12th Pass Eligible • No Degree Required'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { val: governmentExams.length, label: ta ? 'தேர்வுகள்' : 'Exams', color: 'text-white' },
              { val: openCount, label: ta ? 'திறப்பு' : 'Open Now', color: 'text-emerald-400' },
              { val: 5, label: ta ? 'பிரிவுகள்' : 'Sectors', color: 'text-blue-400' },
              { val: fmt(topSalary), label: ta ? 'அதிகபட்சம்' : 'Top Salary', color: 'text-amber-400' },
            ].map((s, i) => (
              <div key={i} className="bg-white/[0.05] border border-white/[0.08] rounded-xl py-3 px-2 text-center">
                <div className={cn("text-xl font-black leading-none", s.color)}>{s.val}</div>
                <div className="text-xs text-slate-500 mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ CATEGORY PILLS ══════════ */}
      <div className="overflow-x-auto -mx-3 px-3 pb-1">
        <div className="flex gap-2.5 min-w-max">
          <button onClick={() => setActiveCat('all')} className={cn(
            "px-5 py-2.5 rounded-xl text-sm font-bold border transition-all whitespace-nowrap",
            activeCat === 'all'
              ? "bg-slate-800 text-white border-slate-800 shadow-md"
              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
          )}>
            {ta ? 'அனைத்தும்' : 'All'} ({governmentExams.length})
          </button>

          {Object.entries(CAT).map(([key, cfg]) => {
            const Icon = cfg.icon;
            const active = activeCat === key;
            return (
              <button key={key} onClick={() => setActiveCat(key as CategoryType)} className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all whitespace-nowrap",
                active ? cfg.pillActive + " shadow-md" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              )}>
                <Icon className="w-4 h-4" />
                {ta ? cfg.ta : cfg.label} ({counts[key] || 0})
              </button>
            );
          })}
        </div>
      </div>

      {/* ══════════ SEARCH BAR ══════════ */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={ta ? 'தேர்வைத் தேடுங்கள் (NDA, TNPSC, SSC...)' : 'Search exams (NDA, TNPSC, Railway, SSC...)'}
          className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2">
            <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
          </button>
        )}
      </div>

      {/* ══════════ STATUS FILTER + COUNT ══════════ */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {([
            { id: 'all' as StatusType, label: ta ? 'அனைத்தும்' : 'All' },
            { id: 'open' as StatusType, label: ta ? '🟢 திறப்பு' : '🟢 Open Now' },
            { id: 'upcoming' as StatusType, label: ta ? '🟡 விரைவில்' : '🟡 Upcoming' },
          ]).map(s => (
            <button key={s.id} onClick={() => setActiveStatus(s.id)} className={cn(
              "px-4 py-2 rounded-xl text-sm font-semibold transition-all border",
              activeStatus === s.id
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
            )}>
              {s.label}
            </button>
          ))}
        </div>
        <span className="text-sm text-slate-400">
          {filtered.length} {ta ? 'தேர்வுகள்' : 'results'}
        </span>
      </div>

      {/* ══════════ EXAM CARDS ══════════ */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-100">
          <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <p className="text-base text-slate-500 font-medium">{ta ? 'தேர்வுகள் கிடைக்கவில்லை' : 'No exams match your filters'}</p>
          <button onClick={() => { setSearch(''); setActiveCat('all'); setActiveStatus('all'); }}
            className="text-sm text-amber-600 font-bold mt-3 hover:underline">
            {ta ? 'வடிகட்டிகளை அழி' : 'Reset all filters'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((exam, idx) => {
            const cfg = CAT[exam.category] || CAT.central;
            const Icon = cfg.icon;
            const isSaved = savedSet.has(exam.id);
            const isOpen = exam.applicationStatus === 'open';
            const isUpcoming = exam.applicationStatus === 'upcoming';

            return (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.03, 0.15), duration: 0.3 }}
              >
                <div className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-200 overflow-hidden">

                  {/* status bar */}
                  <div className={cn("h-1.5", isOpen ? 'bg-emerald-500' : isUpcoming ? 'bg-amber-400' : 'bg-slate-200')} />

                  <div className="p-5">
                    {/* ── Header Row ── */}
                    <div className="flex items-start gap-4">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", cfg.cardBg)}>
                        <Icon className={cn("w-6 h-6", cfg.cardIcon)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-slate-800 leading-snug">{exam.name}</h3>
                        <p className="text-sm text-slate-400 font-tamil mt-0.5">{exam.nameTamil}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {isOpen && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                            {ta ? 'திறப்பு' : 'Open'}
                          </span>
                        )}
                        {isUpcoming && (
                          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                            {ta ? 'விரைவில்' : 'Upcoming'}
                          </span>
                        )}
                        {!isOpen && !isUpcoming && (
                          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold">
                            {ta ? 'முடிவு' : 'Closed'}
                          </span>
                        )}
                        <button onClick={() => toggleSave(exam.id)} className={cn(
                          "p-2 rounded-xl transition-all",
                          isSaved ? "text-amber-500 bg-amber-50" : "text-slate-300 hover:text-amber-400 hover:bg-slate-50"
                        )}>
                          <Bookmark className={cn("w-5 h-5", isSaved && "fill-current")} />
                        </button>
                      </div>
                    </div>

                    {/* ── Description ── */}
                    <p className="text-sm text-slate-500 mt-3 leading-relaxed">{exam.description}</p>

                    {/* ── Key Info Grid ── */}
                    <div className="grid grid-cols-2 gap-2.5 mt-4">
                      <div className="flex items-center gap-2.5 bg-emerald-50 rounded-xl px-3 py-2.5">
                        <Banknote className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div>
                          <p className="text-xs text-emerald-600 font-medium">{ta ? 'சம்பளம்' : 'Salary'}</p>
                          <p className="text-sm font-bold text-emerald-800">{fmt(exam.salaryMin)} – {fmt(exam.salaryMax)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 bg-blue-50 rounded-xl px-3 py-2.5">
                        <Users className="w-5 h-5 text-blue-600 shrink-0" />
                        <div>
                          <p className="text-xs text-blue-600 font-medium">{ta ? 'வயது' : 'Age Limit'}</p>
                          <p className="text-sm font-bold text-blue-800">{exam.ageMin} – {exam.ageMax} {ta ? 'வயது' : 'years'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 bg-violet-50 rounded-xl px-3 py-2.5">
                        <GraduationCap className="w-5 h-5 text-violet-600 shrink-0" />
                        <div>
                          <p className="text-xs text-violet-600 font-medium">{ta ? 'தகுதி' : 'Qualification'}</p>
                          <p className="text-sm font-bold text-violet-800">{exam.qualification}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 bg-rose-50 rounded-xl px-3 py-2.5">
                        <Calendar className="w-5 h-5 text-rose-600 shrink-0" />
                        <div>
                          <p className="text-xs text-rose-600 font-medium">{ta ? 'அடுத்த தேர்வு' : 'Next Exam'}</p>
                          <p className="text-sm font-bold text-rose-800">
                            {exam.nextExamDate
                              ? new Date(exam.nextExamDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
                              : (ta ? 'அறிவிக்கப்படும்' : 'To Be Announced')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ── Posts ── */}
                    {exam.posts && exam.posts.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs text-slate-400 font-semibold mb-1.5">{ta ? 'பதவிகள்' : 'AVAILABLE POSTS'}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {exam.posts.map((p, i) => (
                            <span key={i} className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">{p}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── Action Buttons ── */}
                    <div className="flex gap-3 mt-5">
                      {isOpen ? (
                        <a href={exam.applyLink} target="_blank" rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors shadow-sm">
                          <ExternalLink className="w-4 h-4" />
                          {ta ? 'இப்போது விண்ணப்பி' : 'Apply Now'}
                        </a>
                      ) : isUpcoming ? (
                        <a href={exam.applyLink} target="_blank" rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-colors">
                          <Clock className="w-4 h-4" />
                          {ta ? 'அதிகாரப்பூர்வ தளம்' : 'Visit Official Site'}
                        </a>
                      ) : (
                        <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-400 text-sm font-bold cursor-default">
                          {ta ? 'விண்ணப்பம் மூடப்பட்டது' : 'Applications Closed'}
                        </div>
                      )}

                      <button
                        onClick={() => navigate(`/government-exams/${exam.category}/${exam.id}`)}
                        className="flex items-center gap-1.5 px-5 py-3 rounded-xl border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-sm font-bold text-slate-700 transition-all"
                      >
                        {ta ? 'பாடத்திட்டம் & PYQ' : 'Syllabus & PYQ'}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ══════════ FOOTER ══════════ */}
      <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-4 text-center">
        <p className="text-sm text-amber-700 font-medium">
          💡 {ta
            ? 'தேதிகள் மாறக்கூடும். எப்போதும் அதிகாரப்பூர்வ இணையதளத்தில் சரிபார்க்கவும்.'
            : 'Dates are tentative. Always verify from official websites before applying.'}
        </p>
      </div>
    </div>
  );
};

export default GovernmentJobs;
