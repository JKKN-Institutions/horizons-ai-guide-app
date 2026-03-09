import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useStudentProfile, STREAM_INFO, StudentProfile } from '@/hooks/useStudentProfile';
import { StudentOnboarding } from '@/components/Onboarding/StudentOnboarding';
import { governmentExams } from '@/components/GovernmentJobs/governmentExamsData';
import { governmentExamCategories } from '@/data/government-exams-data';
import { supabase } from '@/integrations/supabase/client';
import {
  LogOut, User, ArrowLeft, Settings, BookOpen, Target, Play,
  CalendarClock, Banknote, ChevronRight, Clock, Sparkles,
  RefreshCcw, GraduationCap, TrendingUp, ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;

const getDetail = (id: string) => {
  for (const c of governmentExamCategories) {
    const f = c.exams.find(e => e.id === id);
    if (f) return { cat: c.id, id: f.id, pyq: f.pyq.length, topics: Object.values(f.syllabus).reduce((t, s) => t + s.reduce((a, x) => a + x.topics.length, 0), 0) };
  }
  return null;
};

const StudentDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { profile, loading, saveProfile, clearProfile, hasProfile } = useStudentProfile();
  const [displayName, setDisplayName] = useState('Student');

  useEffect(() => {
    const fetchName = async () => {
      if (!user) return;
      if (user.user_metadata?.full_name) { setDisplayName(user.user_metadata.full_name); return; }
      const { data: p } = await supabase.from('profiles').select('display_name').eq('user_id', user.id).maybeSingle();
      if (p?.display_name) { setDisplayName(p.display_name); return; }
      const { data: r } = await supabase.from('registrations_12th').select('full_name').eq('email', user.email).maybeSingle();
      if (r?.full_name) { setDisplayName(r.full_name); return; }
      if (user.email) setDisplayName(user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1));
    };
    fetchName();
  }, [user]);

  // Show onboarding if no profile
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!hasProfile || !profile) {
    return (
      <StudentOnboarding
        displayName={displayName}
        onComplete={(p: StudentProfile) => saveProfile(p)}
      />
    );
  }

  // ═══ PERSONALIZED DASHBOARD ═══
  const streamInfo = STREAM_INFO[profile.stream];
  const savedExamData = governmentExams.filter(e => profile.savedExams.includes(e.id));
  const now = Date.now();

  // Sort saved exams by nearest date
  const sortedExams = [...savedExamData].sort((a, b) => {
    const da = a.nextExamDate ? new Date(a.nextExamDate).getTime() : Infinity;
    const db = b.nextExamDate ? new Date(b.nextExamDate).getTime() : Infinity;
    return da - db;
  });

  // Next upcoming exam
  const nextExam = sortedExams.find(e => e.nextExamDate && new Date(e.nextExamDate).getTime() > now);
  const nextExamDays = nextExam?.nextExamDate ? Math.ceil((new Date(nextExam.nextExamDate).getTime() - now) / 86400000) : null;

  // Total topics and PYQ across saved exams
  let totalTopics = 0, totalPYQ = 0;
  profile.savedExams.forEach(id => {
    const d = getDetail(id);
    if (d) { totalTopics += d.topics; totalPYQ += d.pyq; }
  });

  const greetHour = new Date().getHours();
  const greet = greetHour < 12 ? 'Good Morning' : greetHour < 17 ? 'Good Afternoon' : 'Good Evening';
  const greetTa = greetHour < 12 ? 'காலை வணக்கம்' : greetHour < 17 ? 'மதிய வணக்கம்' : 'மாலை வணக்கம்';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── HEADER ── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/')} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <p className="text-base font-bold text-gray-900">My Dashboard</p>
            <p className="text-xs text-gray-500">{streamInfo.label} · {profile.savedExams.length} exams</p>
          </div>
          <button onClick={() => clearProfile()} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100" title="Re-personalize">
            <RefreshCcw className="w-4 h-4 text-gray-500" />
          </button>
          {user && (
            <button onClick={async () => { await signOut(); navigate('/'); }} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100" title="Logout">
              <LogOut className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-5 max-w-lg space-y-5">

        {/* ── GREETING CARD ── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full -ml-8 -mb-8" />
          <div className="relative z-10">
            <p className="text-sm text-gray-400">{greet} · {greetTa}</p>
            <h1 className="text-2xl font-extrabold mt-1">{displayName} 👋</h1>
            <div className="flex items-center gap-2 mt-3">
              <span className={cn("text-xs font-bold px-3 py-1 rounded-full", streamInfo.bg, streamInfo.color)}>
                {streamInfo.icon} {streamInfo.label}
              </span>
              <span className="text-xs text-gray-400">· {profile.studyHours}h/day study plan</span>
            </div>
          </div>
        </motion.div>

        {/* ── NEXT EXAM COUNTDOWN ── */}
        {nextExam && nextExamDays !== null && nextExamDays > 0 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className={cn("rounded-2xl p-4 border-2", nextExamDays <= 30 ? "border-rose-300 bg-rose-50" : nextExamDays <= 90 ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50")}>
            <div className="flex items-center gap-3">
              <div className={cn("w-14 h-14 rounded-xl flex flex-col items-center justify-center", nextExamDays <= 30 ? "bg-rose-500" : nextExamDays <= 90 ? "bg-amber-500" : "bg-emerald-500")}>
                <span className="text-xl font-extrabold text-white leading-none">{nextExamDays}</span>
                <span className="text-[8px] font-bold text-white/80 uppercase">days</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Next Exam</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{nextExam.name}</p>
                <p className="text-xs text-gray-500">
                  {nextExam.nextExamDate && new Date(nextExam.nextExamDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </motion.div>
        )}

        {/* ── QUICK STATS ── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-3 gap-2.5">
          <div className="bg-white rounded-xl border border-gray-200 p-3.5 text-center">
            <BookOpen className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
            <p className="text-lg font-extrabold text-gray-900">{totalTopics}</p>
            <p className="text-xs text-gray-500">Topics</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-3.5 text-center">
            <Target className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <p className="text-lg font-extrabold text-gray-900">{totalPYQ}</p>
            <p className="text-xs text-gray-500">PYQ</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-3.5 text-center">
            <GraduationCap className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <p className="text-lg font-extrabold text-gray-900">{profile.savedExams.length}</p>
            <p className="text-xs text-gray-500">My Exams</p>
          </div>
        </motion.div>

        {/* ── YOUR EXAMS ── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-800">Your Exams</h2>
            <button onClick={() => navigate('/government-exams')} className="text-xs font-semibold text-blue-600 flex items-center gap-1">
              Browse All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {sortedExams.map((exam, i) => {
              const detail = getDetail(exam.id);
              const examDate = exam.nextExamDate ? new Date(exam.nextExamDate) : null;
              const days = examDate ? Math.ceil((examDate.getTime() - now) / 86400000) : null;

              return (
                <motion.div key={exam.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.05 }}
                  className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-all">
                  {/* Exam header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className={cn("w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0",
                      exam.applicationStatus === 'open' ? "bg-emerald-500 animate-pulse" :
                      exam.applicationStatus === 'upcoming' ? "bg-amber-400" : "bg-gray-300"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900">{exam.name}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1"><Banknote className="w-3.5 h-3.5 text-emerald-500" />{fmt(exam.salaryMin)}–{fmt(exam.salaryMax)}</span>
                        {days !== null && days > 0 && (
                          <span className={cn("flex items-center gap-1 font-bold", days <= 30 ? "text-rose-500" : days <= 90 ? "text-amber-500" : "text-gray-400")}>
                            <CalendarClock className="w-3.5 h-3.5" />{days}d left
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    {detail && detail.topics > 0 && (
                      <button onClick={() => navigate(`/government-exams/${detail.cat}/${detail.id}`)} className="flex items-center justify-center gap-1.5 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-all active:scale-95">
                        <BookOpen className="w-3.5 h-3.5" /> Syllabus
                      </button>
                    )}
                    {detail && detail.pyq > 0 && (
                      <button onClick={() => navigate(`/government-exams/${detail.cat}/${detail.id}`)} className="flex items-center justify-center gap-1.5 h-10 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700 hover:bg-amber-100 transition-all active:scale-95">
                        <Target className="w-3.5 h-3.5" /> PYQ
                      </button>
                    )}
                    {detail && detail.pyq > 0 ? (
                      <button onClick={() => navigate(`/government-exams/${detail.cat}/${detail.id}`)} className="flex items-center justify-center gap-1.5 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-all active:scale-95">
                        <Play className="w-3.5 h-3.5" /> Mock
                      </button>
                    ) : (
                      <button onClick={() => window.open(exam.applyLink, '_blank')} className="flex items-center justify-center gap-1.5 h-10 rounded-xl bg-gray-100 border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-200 transition-all active:scale-95">
                        <ExternalLink className="w-3.5 h-3.5" /> Site
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {sortedExams.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
              <p className="text-gray-400 text-3xl mb-2">📋</p>
              <p className="text-sm font-medium text-gray-500">No exams saved yet</p>
              <button onClick={() => navigate('/government-exams')} className="text-sm font-bold text-blue-600 mt-2">Browse Exams</button>
            </div>
          )}
        </motion.div>

        {/* ── QUICK NAVIGATION ── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <h2 className="text-sm font-bold text-gray-800 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: 'Government Exams', icon: '🏛️', path: '/government-exams', desc: '25 exams with syllabus' },
              { label: 'Entrance Exams', icon: '📝', path: '/career-assessment/colleges/entrance-exams', desc: '39 entrance exams' },
              { label: 'Course Explorer', icon: '📚', path: '/career-assessment/colleges/course-explorer', desc: '144 courses' },
              { label: 'University Hub', icon: '🎓', path: '/career-assessment/colleges/tn-university', desc: 'TN universities' },
              ...(profile.goal === 'govt_job' || profile.goal === 'both' ? [
                { label: 'Govt Jobs (Tab)', icon: '💼', path: '/career-assessment/colleges/govt-jobs', desc: 'Apply for jobs' },
              ] : []),
              ...(profile.goal === 'higher_studies' || profile.goal === 'both' ? [
                { label: 'Scholarships', icon: '🎯', path: '/career-assessment/colleges/scholarships', desc: 'Find scholarships' },
              ] : []),
            ].map((item, i) => (
              <button key={i} onClick={() => navigate(item.path)}
                className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-3.5 hover:shadow-md hover:border-gray-300 transition-all text-left active:scale-[0.98]">
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate">{item.label}</p>
                  <p className="text-xs text-gray-400 truncate">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── RE-PERSONALIZE ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <button onClick={() => clearProfile()} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-dashed border-gray-300 text-sm font-semibold text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-all">
            <RefreshCcw className="w-4 h-4" /> Change My Preferences
          </button>
        </motion.div>

        {/* ── FOOTER ── */}
        <div className="text-center pb-4">
          <p className="text-xs text-gray-400">Personalized for {streamInfo.label} students in Tamil Nadu</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
