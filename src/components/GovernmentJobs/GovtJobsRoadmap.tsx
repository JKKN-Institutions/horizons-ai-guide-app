import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props { ta: boolean; }

/* ── Data ── */
const PATHS = [
  {
    id: 'written',
    label: '📝 Written Exam Path',
    ta: '📝 எழுத்துத் தேர்வு பாதை',
    desc: 'Competitive written exam → Physical (if applicable) → Selection',
    descTa: 'போட்டித் தேர்வு → உடல் தகுதி (தேவைப்பட்டால்) → தேர்வு',
    color: 'from-blue-600 to-indigo-700',
    borderColor: 'border-blue-400',
    dotColor: 'bg-blue-500',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-700',
    central: [
      { name: 'SSC CHSL', ta: 'SSC CHSL', role: 'LDC, DEO, PA/SA', salary: '₹25K–81K' },
      { name: 'SSC MTS', ta: 'SSC MTS', role: 'Multi Tasking Staff, Havaldar', salary: '₹18K–56K' },
      { name: 'SSC GD Constable', ta: 'SSC GD', role: 'CAPFs, NIA, SSF Constable', salary: '₹21K–69K' },
      { name: 'SSC Stenographer', ta: 'SSC ஸ்டெனோ', role: 'Stenographer Grade C & D', salary: '₹25K–81K' },
      { name: 'RRB NTPC', ta: 'RRB NTPC', role: 'Ticket Collector, Clerk, Station Master', salary: '₹35K–1.1L' },
      { name: 'RRB Group D', ta: 'RRB குரூப் D', role: 'Track Maintainer, Pointsman, Helper', salary: '₹18K–56K' },
      { name: 'RPF Constable', ta: 'RPF காவலர்', role: 'Railway Protection Force', salary: '₹21K–69K' },
    ],
    state: [
      { name: 'TNPSC Group 4 / VAO', ta: 'TNPSC குரூப் 4', role: 'VAO, Junior Asst, Typist', salary: '₹19K–62K' },
      { name: 'TN Police Constable', ta: 'TN போலீஸ்', role: 'Police Constable, Jail Warder, Fireman', salary: '₹22K–70K' },
      { name: 'TN Forest Guard', ta: 'TN வனக் காவலர்', role: 'Forest Guard (TNFUSRC)', salary: '₹20K–63K' },
    ],
    defence: [
      { name: 'NDA', ta: 'NDA', role: 'Army/Navy/Air Force Officer', salary: '₹56K+' },
      { name: 'Agniveer Army', ta: 'அக்னிவீர்', role: 'GD, Technical, Clerk/SKT', salary: '₹30K–40K' },
      { name: 'Agniveer Navy', ta: 'அக்னிவீர் நேவி', role: 'SSR / MR', salary: '₹30K' },
      { name: 'Agniveer Air Force', ta: 'விமானப்படை', role: 'Group X & Y trades', salary: '₹30K' },
      { name: 'Coast Guard Navik', ta: 'கடலோர காவல்', role: 'Navik GD / DB', salary: '₹21K–69K' },
      { name: 'BSF/CRPF/CISF', ta: 'BSF/CRPF/CISF', role: 'Border & Central Police Forces', salary: '₹23K–69K' },
    ],
  },
  {
    id: 'merit',
    label: '🏆 No-Exam (Merit) Path',
    ta: '🏆 தேர்வு இல்லாத (தகுதி) பாதை',
    desc: '10th/12th marks → Merit list → Direct selection (No competitive exam!)',
    descTa: '10/12ஆம் வகுப்பு மதிப்பெண் → தகுதிப் பட்டியல் → நேரடி தேர்வு',
    color: 'from-emerald-600 to-teal-700',
    borderColor: 'border-emerald-400',
    dotColor: 'bg-emerald-500',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    central: [
      { name: 'India Post GDS', ta: 'இந்திய தபால் GDS', role: 'Branch Postmaster, ABPM, Dak Sevak', salary: '₹10K–29K' },
    ],
    state: [],
    defence: [],
  },
];

const STEPS = [
  { num: 1, icon: '🎓', title: 'Complete 12th / 10th', ta: '12 / 10ஆம் வகுப்பு முடிக்கவும்', desc: 'Pass your board exam. Score well — some exams require 50–60% marks.', descTa: 'வகுப்புத் தேர்வை முடிக்கவும். நல்ல மதிப்பெண் பெறுங்கள்.', color: 'bg-slate-700' },
  { num: 2, icon: '🔍', title: 'Choose Your Path', ta: 'உங்கள் பாதையைத் தேர்வு செய்யுங்கள்', desc: 'Written Exam path OR No-Exam Merit path. Central, State, or Defence.', descTa: 'எழுத்துத் தேர்வு அல்லது தகுதி பாதை. மத்திய, மாநிலம் அல்லது பாதுகாப்பு.', color: 'bg-blue-600' },
  { num: 3, icon: '📋', title: 'Check Eligibility', ta: 'தகுதியை சரிபார்க்கவும்', desc: 'Age limit, education, physical standards (for defence/police), category relaxations.', descTa: 'வயது வரம்பு, கல்வி, உடல் தகுதி, இடஒதுக்கீடு தளர்வுகள்.', color: 'bg-violet-600' },
  { num: 4, icon: '📝', title: 'Apply Online', ta: 'ஆன்லைனில் விண்ணப்பிக்கவும்', desc: 'Apply on official website (ssc.nic.in, tnpsc.gov.in, joinindianarmy.nic.in, etc.)', descTa: 'அதிகாரப்பூர்வ இணையதளத்தில் விண்ணப்பிக்கவும்.', color: 'bg-amber-600' },
  { num: 5, icon: '📚', title: 'Prepare & Study', ta: 'படிக்கவும் தயாராகவும்', desc: 'Study syllabus, practice PYQs, take mock tests. 3–6 months dedicated prep.', descTa: 'பாடத்திட்டம் படிக்கவும், முந்தைய வினாக்கள் பயிற்சி செய்யவும்.', color: 'bg-rose-600' },
  { num: 6, icon: '✍️', title: 'Clear Written Exam / Merit', ta: 'எழுத்துத் தேர்வு / தகுதி', desc: 'Written exam (CBT/OMR) for most. Merit-based selection for GDS, Apprentice.', descTa: 'பெரும்பாலானவற்றுக்கு எழுத்துத் தேர்வு. GDS-க்கு தகுதி அடிப்படை.', color: 'bg-indigo-600' },
  { num: 7, icon: '💪', title: 'Physical & Skill Tests', ta: 'உடல் & திறன் தேர்வுகள்', desc: 'Running, height, chest (defence/police). Typing/steno test (SSC/KVS). Some exams skip this.', descTa: 'ஓட்டம், உயரம் (பாதுகாப்பு/போலீஸ்). தட்டச்சு (SSC/KVS). சில தேர்வுகளுக்கு இது இல்லை.', color: 'bg-teal-600' },
  { num: 8, icon: '📂', title: 'Document Verification', ta: 'ஆவண சரிபார்ப்பு', desc: 'Original certificates: 10th/12th marksheet, caste, ID proof, photo, medical certificate.', descTa: 'அசல் சான்றிதழ்கள்: மார்க்ஷீட், சாதி, அடையாளம், புகைப்படம்.', color: 'bg-cyan-600' },
  { num: 9, icon: '🏥', title: 'Medical Exam & Joining', ta: 'மருத்துவப் பரிசோதனை & சேர்க்கை', desc: 'Pass medical fitness → Receive appointment letter → Join duty → Govt Job Secured! 🎉', descTa: 'மருத்துவ தகுதி → நியமன கடிதம் → பணியில் சேர → அரசு வேலை! 🎉', color: 'bg-emerald-600' },
];

const KEY_FACTS = [
  { icon: '💰', text: 'Salary: ₹18,000 to ₹1,00,000+/month', ta: 'சம்பளம்: ₹18,000 - ₹1,00,000+/மாதம்' },
  { icon: '📜', text: 'No degree required — 10th/12th pass is enough', ta: 'பட்டம் தேவையில்லை — 10/12ஆம் வகுப்பு தேர்ச்சி போதுமானது' },
  { icon: '🏠', text: 'Job security + pension + housing + medical benefits', ta: 'வேலை பாதுகாப்பு + ஓய்வூதியம் + வீடு + மருத்துவ நலன்கள்' },
  { icon: '📅', text: 'Exams happen every year — multiple attempts allowed', ta: 'தேர்வுகள் ஒவ்வொரு ஆண்டும் — பல முயற்சிகள் அனுமதி' },
];

/* ── Component ── */
export const GovtJobsRoadmap = ({ ta }: Props) => {
  const [expandedPath, setExpandedPath] = useState<string | null>(null);
  const [showSteps, setShowSteps] = useState(false);

  return (
    <div className="space-y-4">

      {/* ═══ KEY FACTS BAR ═══ */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-xs font-bold text-amber-800 mb-2.5 tracking-wide uppercase">{ta ? '📌 முக்கிய தகவல்கள்' : '📌 Key Facts'}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {KEY_FACTS.map((f, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-amber-900">
              <span className="text-base leading-none mt-0.5">{f.icon}</span>
              <span className="leading-snug">{ta ? f.ta : f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ TWO PATHS — WRITTEN vs NO-EXAM ═══ */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-slate-800 px-1">
          {ta ? '🛣️ இரண்டு பாதைகள் — உங்களுக்கு எது சரி?' : '🛣️ Two Paths — Which one is right for you?'}
        </h3>

        {PATHS.map((path) => {
          const isOpen = expandedPath === path.id;
          const allExams = [...path.central, ...path.state, ...path.defence];

          return (
            <div key={path.id} className={cn("rounded-2xl border overflow-hidden transition-all", isOpen ? path.borderColor : 'border-slate-200')}>
              <button
                onClick={() => setExpandedPath(isOpen ? null : path.id)}
                className={cn("w-full p-4 flex items-center gap-3 text-left transition-all", isOpen ? `bg-gradient-to-r ${path.color} text-white` : 'bg-white hover:bg-slate-50')}
              >
                <div className="flex-1">
                  <p className={cn("font-bold text-sm", isOpen ? 'text-white' : 'text-slate-800')}>
                    {ta ? path.ta : path.label}
                  </p>
                  <p className={cn("text-xs mt-0.5", isOpen ? 'text-white/80' : 'text-slate-500')}>
                    {ta ? path.descTa : path.desc}
                  </p>
                </div>
                <div className={cn("flex items-center gap-1.5 shrink-0 text-xs font-bold px-3 py-1.5 rounded-full", isOpen ? 'bg-white/20 text-white' : `${path.bgLight} ${path.textColor}`)}>
                  {allExams.length} {ta ? 'தேர்வுகள்' : 'exams'}
                  {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </div>
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
                    <div className="p-4 pt-2 space-y-4 bg-white">

                      {/* Central Govt */}
                      {path.central.length > 0 && (
                        <div>
                          <p className="text-xs font-bold text-slate-500 mb-2 tracking-wide uppercase flex items-center gap-1.5">🇮🇳 {ta ? 'மத்திய அரசு' : 'Central Government'}</p>
                          <div className="space-y-1.5">
                            {path.central.map((e) => (
                              <div key={e.name} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className={cn("w-2 h-2 rounded-full shrink-0", path.dotColor)} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-slate-800 truncate">{ta ? e.ta : e.name}</p>
                                  <p className="text-xs text-slate-500 truncate">{e.role}</p>
                                </div>
                                <span className="text-xs font-bold text-emerald-600 shrink-0">{e.salary}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* State Govt */}
                      {path.state.length > 0 && (
                        <div>
                          <p className="text-xs font-bold text-slate-500 mb-2 tracking-wide uppercase flex items-center gap-1.5">🏛️ {ta ? 'தமிழ்நாடு மாநில அரசு' : 'Tamil Nadu State Government'}</p>
                          <div className="space-y-1.5">
                            {path.state.map((e) => (
                              <div key={e.name} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className={cn("w-2 h-2 rounded-full shrink-0", path.dotColor)} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-slate-800 truncate">{ta ? e.ta : e.name}</p>
                                  <p className="text-xs text-slate-500 truncate">{e.role}</p>
                                </div>
                                <span className="text-xs font-bold text-emerald-600 shrink-0">{e.salary}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Defence */}
                      {path.defence.length > 0 && (
                        <div>
                          <p className="text-xs font-bold text-slate-500 mb-2 tracking-wide uppercase flex items-center gap-1.5">🎖️ {ta ? 'பாதுகாப்பு படைகள்' : 'Defence & Paramilitary Forces'}</p>
                          <div className="space-y-1.5">
                            {path.defence.map((e) => (
                              <div key={e.name} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className={cn("w-2 h-2 rounded-full shrink-0", path.dotColor)} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-slate-800 truncate">{ta ? e.ta : e.name}</p>
                                  <p className="text-xs text-slate-500 truncate">{e.role}</p>
                                </div>
                                <span className="text-xs font-bold text-emerald-600 shrink-0">{e.salary}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {path.id === 'merit' && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <p className="text-xs text-emerald-800 leading-snug">
                            {ta ? '🎯 தேர்வு இல்லை! 10ஆம் வகுப்பு மதிப்பெண்கள் மட்டுமே முக்கியம். Railway Apprentice-க்கு ITI + 10th மதிப்பெண் சராசரி.' : '🎯 No exam needed! Your 10th class marks are your ticket. Railway Apprentice uses 10th + ITI marks average.'}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* ═══ 9-STEP JOURNEY ═══ */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        <button
          onClick={() => setShowSteps(!showSteps)}
          className="w-full p-4 flex items-center gap-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white text-left"
        >
          <span className="text-lg">🗺️</span>
          <div className="flex-1">
            <p className="font-bold text-sm">{ta ? 'முழு பயணம் — 9 படிகள்' : 'Complete Journey — 9 Steps to Govt Job'}</p>
            <p className="text-xs text-slate-400 mt-0.5">{ta ? '12ஆம் வகுப்பு → அரசு வேலை பெற்றது!' : '12th Pass → Govt Job Secured!'}</p>
          </div>
          {showSteps ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
        </button>

        <AnimatePresence>
          {showSteps && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-white">
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-[17px] top-5 bottom-5 w-0.5 bg-gradient-to-b from-slate-300 via-blue-300 to-emerald-400" />

                  <div className="space-y-1">
                    {STEPS.map((step, idx) => (
                      <motion.div
                        key={step.num}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.2 }}
                        className="relative flex items-start gap-4 py-2.5"
                      >
                        <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0 z-10 shadow-md", step.color)}>
                          {step.num}
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{step.icon}</span>
                            <p className="text-sm font-bold text-slate-800">{ta ? step.ta : step.title}</p>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{ta ? step.descTa : step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Final success */}
                  <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-lg shadow-lg">
                        🎉
                      </div>
                      <div>
                        <p className="font-extrabold text-emerald-800 text-sm">
                          {ta ? 'அரசு வேலை பெற்றது!' : 'Government Job Secured!'}
                        </p>
                        <p className="text-xs text-emerald-600 mt-0.5">
                          {ta ? 'சம்பளம் + ஓய்வூதியம் + வீடு + மருத்துவம் + வேலை பாதுகாப்பு' : 'Salary + Pension + Housing + Medical + Job Security for life'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
