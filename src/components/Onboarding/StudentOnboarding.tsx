import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Sparkles, BookOpen, Target, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StudentProfile, StudentStream, STREAM_INFO } from '@/hooks/useStudentProfile';
import { governmentExams } from '@/components/GovernmentJobs/governmentExamsData';

interface Props {
  onComplete: (profile: StudentProfile) => void;
  displayName?: string;
}

// Exams recommended per stream
const STREAM_EXAMS: Record<StudentStream, string[]> = {
  pcm: ['nda', 'coast-guard-navik', 'agniveer-army', 'agniveer-navy', 'agniveer-airforce', 'ssc-chsl', 'ssc-gd', 'rrb-ntpc', 'rrb-group-d', 'rpf-constable', 'bsf-constable'],
  pcb: ['ssc-chsl', 'ssc-mts', 'rrb-ntpc', 'rrb-group-d', 'tnpsc-group4', 'tn-police-constable', 'tn-forest-guard', 'india-post-gds', 'railway-apprentice'],
  pcmb: ['nda', 'coast-guard-navik', 'agniveer-army', 'ssc-chsl', 'ssc-gd', 'rrb-ntpc', 'tnpsc-group4', 'tn-police-constable', 'tn-forest-guard', 'india-post-gds'],
  commerce: ['ssc-chsl', 'ssc-stenographer', 'ssc-mts', 'rrb-ntpc', 'tnpsc-group4', 'vao', 'india-post-gds', 'kvs-non-teaching', 'nvs-lab-attendant', 'army-clerk'],
  arts: ['ssc-mts', 'ssc-gd', 'rrb-group-d', 'tnpsc-group4', 'vao', 'tn-police-constable', 'india-post-gds', 'rpf-constable', 'fci-watchman'],
};

const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;

export const StudentOnboarding = ({ onComplete, displayName = 'Student' }: Props) => {
  const [step, setStep] = useState(0);
  const [stream, setStream] = useState<StudentStream | null>(null);
  const [goal, setGoal] = useState<'govt_job' | 'higher_studies' | 'both' | null>(null);
  const [savedExams, setSavedExams] = useState<string[]>([]);
  const [studyHours, setStudyHours] = useState(3);

  const totalSteps = 3;
  const progress = ((step + 1) / totalSteps) * 100;

  const canNext = step === 0 ? !!stream : step === 1 ? !!goal : savedExams.length > 0;

  const handleFinish = () => {
    if (!stream || !goal) return;
    onComplete({
      stream,
      goal,
      savedExams,
      studyHours,
      displayName,
    });
  };

  const recommendedExams = stream ? governmentExams.filter(e => STREAM_EXAMS[stream]?.includes(e.id)) : [];

  const toggleExam = (id: string) => {
    setSavedExams(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ── Progress Bar ── */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="h-1 bg-gray-100">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-r-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        <div className="container mx-auto px-5 py-3 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Step {step + 1} of {totalSteps}</p>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-700">
              <ChevronLeft className="w-3.5 h-3.5" /> Back
            </button>
          )}
        </div>
      </div>

      {/* ── Content Area ── */}
      <div className="flex-1 container mx-auto px-5 py-6 max-w-lg">
        <AnimatePresence mode="wait">
          {/* ═══ STEP 1: Choose Your Stream ═══ */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-extrabold text-gray-900">Hey {displayName}!</h1>
                    <p className="text-sm text-gray-500">Let's personalize your experience</p>
                  </div>
                </div>
                <h2 className="text-lg font-bold text-gray-800 mt-5">What's your 12th stream?</h2>
                <p className="text-sm text-gray-500">This decides which exams & courses you'll see</p>
              </div>

              <div className="space-y-2.5">
                {(Object.entries(STREAM_INFO) as [StudentStream, typeof STREAM_INFO[StudentStream]][]).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => setStream(key)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all",
                      stream === key
                        ? "border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-100"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    )}
                  >
                    <span className="text-2xl">{info.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900">{info.label}</p>
                      <p className="text-xs text-gray-500">{info.subjects}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{info.tamil}</p>
                    </div>
                    {stream === key && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ═══ STEP 2: What's Your Goal ═══ */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">What's your goal after 12th?</h2>
                    <p className="text-sm text-gray-500">We'll show only what matters to you</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'govt_job' as const, icon: '🏛️', label: 'Government Job', tamil: 'அரசு வேலை', desc: 'SSC, Railway, TNPSC, Defence, Banking — stable career with pension' },
                  { id: 'higher_studies' as const, icon: '🎓', label: 'Higher Studies', tamil: 'மேற்படிப்பு', desc: 'Engineering, Medical, Law, CA/CS, B.Sc, BBA — college entrance exams' },
                  { id: 'both' as const, icon: '🎯', label: 'Both — Keep All Options Open', tamil: 'இரண்டும் — அனைத்து வாய்ப்புகளும்', desc: 'See everything — govt jobs + entrance exams + courses' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setGoal(opt.id)}
                    className={cn(
                      "w-full flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all",
                      goal === opt.id
                        ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-100"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    )}
                  >
                    <span className="text-3xl mt-0.5">{opt.icon}</span>
                    <div className="flex-1">
                      <p className="text-base font-bold text-gray-900">{opt.label}</p>
                      <p className="text-xs text-gray-400 mb-1">{opt.tamil}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{opt.desc}</p>
                    </div>
                    {goal === opt.id && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              {/* Study hours slider */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-bold text-gray-800">Daily study time</p>
                    <p className="text-xs text-gray-500">For exam preparation</p>
                  </div>
                  <span className="ml-auto text-lg font-extrabold text-gray-900">{studyHours}h</span>
                </div>
                <input
                  type="range" min={1} max={8} value={studyHours}
                  onChange={e => setStudyHours(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1.5">
                  <span>1 hr</span><span>4 hrs</span><span>8 hrs</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══ STEP 3: Pick Your Exams ═══ */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">Pick your exams</h2>
                    <p className="text-sm text-gray-500">Select exams you want to prepare for</p>
                  </div>
                </div>
                {stream && (
                  <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Showing {recommendedExams.length} exams recommended for {STREAM_INFO[stream].label}
                  </p>
                )}
              </div>

              {savedExams.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-amber-600">{savedExams.length}</span>
                  <span className="text-gray-500">exams selected</span>
                </div>
              )}

              <div className="space-y-2">
                {recommendedExams.map(exam => {
                  const selected = savedExams.includes(exam.id);
                  return (
                    <button
                      key={exam.id}
                      onClick={() => toggleExam(exam.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all",
                        selected
                          ? "border-amber-400 bg-amber-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all",
                        selected ? "bg-amber-500 border-amber-500" : "border-gray-300"
                      )}>
                        {selected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{exam.name}</p>
                        <p className="text-xs text-gray-500">{fmt(exam.salaryMin)}–{fmt(exam.salaryMax)}/mo · {exam.qualification}</p>
                      </div>
                      {exam.applicationStatus === 'open' && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full flex-shrink-0">OPEN</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {recommendedExams.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                  <p className="text-sm">Select your stream first to see exams</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Bottom Action Bar ── */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-5 py-4 safe-area-inset-bottom">
        <button
          onClick={() => {
            if (step < totalSteps - 1) setStep(s => s + 1);
            else handleFinish();
          }}
          disabled={!canNext}
          className={cn(
            "w-full h-14 rounded-2xl text-base font-bold flex items-center justify-center gap-2 transition-all",
            canNext
              ? "bg-gray-900 text-white shadow-lg hover:bg-gray-800 active:scale-[0.98]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
        >
          {step < totalSteps - 1 ? (
            <>Continue <ChevronRight className="w-5 h-5" /></>
          ) : (
            <><Sparkles className="w-5 h-5" /> Build My Dashboard</>
          )}
        </button>
        {step === 2 && savedExams.length === 0 && (
          <p className="text-xs text-gray-400 text-center mt-2">Select at least 1 exam to continue</p>
        )}
      </div>
    </div>
  );
};
