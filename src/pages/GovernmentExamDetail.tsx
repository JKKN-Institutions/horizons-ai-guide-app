import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, BookOpen, FileText, Play, ChevronDown,
  Check, X, Eye, EyeOff, Download, Award, Clock,
  Banknote, GraduationCap, Users, Target, Sparkles,
  RotateCcw, ChevronRight, CircleCheck, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { getCategoryById, getExamById, Question } from '@/data/government-exams-data';
import { GovtMockTest, generateGovtExamPDF } from '@/components/GovernmentExams';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type Tab = 'overview' | 'syllabus' | 'pyq' | 'pattern';

const GovernmentExamDetail = () => {
  const { categoryId, examId } = useParams<{ categoryId: string; examId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const ta = language === 'ta';

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());
  const [showMockTest, setShowMockTest] = useState(false);

  const category = getCategoryById(categoryId || '');
  const exam = getExamById(categoryId || '', examId || '');

  // PYQ grouped by subject
  const pyqBySubject = useMemo(() => {
    if (!exam) return {};
    const g: Record<string, Question[]> = {};
    exam.pyq.forEach(q => { if (!g[q.subject]) g[q.subject] = []; g[q.subject].push(q); });
    return g;
  }, [exam]);

  // PYQ stats
  const pyqStats = useMemo(() => {
    const total = exam?.pyq.length || 0;
    const attempted = Object.keys(selectedAnswers).length;
    const revealed = revealedAnswers.size;
    const correct = Object.entries(selectedAnswers).filter(([qid, ans]) => {
      const q = exam?.pyq.find(p => p.id === qid);
      return q && q.answer === ans;
    }).length;
    return { total, attempted, revealed, correct };
  }, [exam, selectedAnswers, revealedAnswers]);

  // Syllabus stats
  const syllabusStats = useMemo(() => {
    if (!exam) return { sections: 0, topics: 0 };
    let sections = 0, topics = 0;
    Object.values(exam.syllabus).forEach(secs => {
      sections += secs.length;
      secs.forEach(s => { topics += s.topics.length; });
    });
    return { sections, topics };
  }, [exam]);

  if (!category || !exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-sm text-gray-500 font-medium">{ta ? 'தேர்வு கிடைக்கவில்லை' : 'Exam not found'}</p>
          <Button variant="link" className="mt-2 text-sm" onClick={() => navigate(-1)}>{ta ? 'பின் செல்' : 'Go back'}</Button>
        </div>
      </div>
    );
  }

  const toggleSection = (id: string) => {
    const s = new Set(expandedSections);
    s.has(id) ? s.delete(id) : s.add(id);
    setExpandedSections(s);
  };

  const handleAnswer = (qid: string, idx: number) => {
    if (!revealedAnswers.has(qid)) setSelectedAnswers(p => ({ ...p, [qid]: idx }));
  };

  const toggleReveal = (qid: string) => {
    const s = new Set(revealedAnswers);
    s.has(qid) ? s.delete(qid) : s.add(qid);
    setRevealedAnswers(s);
  };

  const resetPYQ = () => {
    setSelectedAnswers({});
    setRevealedAnswers(new Set());
  };

  const handleDownloadPDF = async (type: 'syllabus' | 'pyq') => {
    toast.loading(`Generating PDF...`);
    await generateGovtExamPDF({ type, exam, category, language: language as 'en' | 'ta' });
    toast.dismiss();
    toast.success('PDF downloaded!');
  };

  if (showMockTest) return <GovtMockTest exam={exam} category={category} onClose={() => setShowMockTest(false)} />;

  const tabs: { key: Tab; label: string; labelTa: string; icon: typeof BookOpen; count?: number }[] = [
    { key: 'overview', label: 'Overview', labelTa: 'கண்ணோட்டம்', icon: FileText },
    { key: 'syllabus', label: 'Syllabus', labelTa: 'பாடத்திட்டம்', icon: BookOpen, count: syllabusStats.topics },
    { key: 'pyq', label: 'PYQ', labelTa: 'PYQ', icon: Target, count: exam.pyq.length },
    { key: 'pattern', label: 'Pattern', labelTa: 'வடிவம்', icon: Award },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* ──── HEADER ──── */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 pt-3 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-[15px] font-bold truncate">{ta ? exam.nameTamil : exam.name}</h1>
              <p className="text-xs text-white/40">{ta ? exam.nameTamil : exam.name} • {category.icon} {ta ? category.nameTamil : category.name}</p>
            </div>
          </div>
          {/* Quick stats */}
          <div className="flex gap-2">
            {[
              { icon: '💰', value: exam.salary, label: ta ? 'சம்பளம்' : 'Salary' },
              { icon: '🎓', value: ta ? exam.qualificationTamil : exam.qualification, label: ta ? 'தகுதி' : 'Eligibility' },
              { icon: '👤', value: exam.age, label: ta ? 'வயது' : 'Age' },
            ].map((s, i) => (
              <div key={i} className="flex-1 bg-white/5 rounded-lg p-2 text-center border border-white/5">
                <p className="text-xs font-semibold text-white/80 truncate">{s.value}</p>
                <p className="text-xs text-white/30 uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ──── TAB BAR ──── */}
      <div className="container mx-auto px-4 -mt-0">
        <div className="flex bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-1 border border-gray-100 dark:border-slate-700 mb-4 mt-3">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} className={cn(
              "flex-1 flex flex-col items-center gap-0.5 py-2 rounded-xl text-xs font-bold transition-all",
              activeTab === t.key ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md" : "text-gray-400"
            )}>
              <t.icon className="w-3.5 h-3.5" />
              <span>{ta ? t.labelTa : t.label}</span>
              {t.count !== undefined && t.count > 0 && <span className="text-xs opacity-60">{t.count}</span>}
            </button>
          ))}
        </div>

        {/* ════════════════════════════
             TAB: OVERVIEW
           ════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-3">
            {/* Key info */}
            <Card><CardContent className="p-4 space-y-3">
              {[
                { label: ta ? 'தகுதி' : 'Qualification', value: ta ? exam.qualificationTamil : exam.qualification },
                { label: ta ? 'வயது வரம்பு' : 'Age Limit', value: exam.age },
                { label: ta ? 'சம்பளம்' : 'Salary', value: exam.salary, accent: true },
                { label: ta ? 'தேர்வு முறை' : 'Selection Process', value: ta ? exam.selectionProcessTamil : exam.selectionProcess },
              ].map((r, i) => (
                <div key={i} className="flex justify-between items-start gap-4">
                  <span className="text-xs text-gray-400 flex-shrink-0">{r.label}</span>
                  <span className={cn("text-xs font-semibold text-right", r.accent ? "text-emerald-600" : "text-gray-800 dark:text-gray-200")}>{r.value}</span>
                </div>
              ))}
            </CardContent></Card>

            {/* Posts */}
            {exam.posts && exam.posts.length > 0 && (
              <Card><CardContent className="p-4">
                <p className="text-xs font-bold text-gray-700 dark:text-gray-200 mb-2">{ta ? 'பதவிகள்' : 'Posts Available'}</p>
                <div className="flex flex-wrap gap-1.5">
                  {(ta ? exam.postsTamil || exam.posts : exam.posts).map((p, i) => (
                    <span key={i} className="text-xs font-medium px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">{p}</span>
                  ))}
                </div>
              </CardContent></Card>
            )}

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button className="h-11 rounded-xl text-xs font-bold" onClick={() => setShowMockTest(true)}>
                <Play className="w-3.5 h-3.5 mr-1.5" /> {ta ? 'மாக் டெஸ்ட்' : 'Mock Test'}
              </Button>
              <Button variant="outline" className="h-11 rounded-xl text-xs font-bold" onClick={() => setActiveTab('pyq')}>
                <Target className="w-3.5 h-3.5 mr-1.5" /> PYQ ({exam.pyq.length})
              </Button>
              <Button variant="outline" className="h-11 rounded-xl text-xs font-bold" onClick={() => handleDownloadPDF('syllabus')}>
                <Download className="w-3.5 h-3.5 mr-1.5" /> {ta ? 'பாடத்திட்டம் PDF' : 'Syllabus PDF'}
              </Button>
              <Button variant="outline" className="h-11 rounded-xl text-xs font-bold" onClick={() => setActiveTab('syllabus')}>
                <BookOpen className="w-3.5 h-3.5 mr-1.5" /> {ta ? 'பாடத்திட்டம்' : 'Syllabus'} ({syllabusStats.topics})
              </Button>
            </div>
          </div>
        )}

        {/* ════════════════════════════
             TAB: SYLLABUS
           ════════════════════════════ */}
        {activeTab === 'syllabus' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-gray-400">{syllabusStats.sections} {ta ? 'பிரிவுகள்' : 'sections'} • {syllabusStats.topics} {ta ? 'தலைப்புகள்' : 'topics'}</p>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 rounded-lg" onClick={() => handleDownloadPDF('syllabus')}>
                <Download className="w-3.5 h-3.5" /> PDF
              </Button>
            </div>
            {Object.entries(exam.syllabus).length === 0 ? (
              <Card><CardContent className="p-10 text-center">
                <BookOpen className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400 font-medium">{ta ? 'பாடத்திட்டம் விரைவில் சேர்க்கப்படும்' : 'Syllabus coming soon'}</p>
              </CardContent></Card>
            ) : (
              Object.entries(exam.syllabus).map(([key, sections]) => (
                sections.map((section, sIdx) => (
                  <Card key={`${key}-${sIdx}`} className="overflow-hidden">
                    <button className="w-full p-3.5 text-left flex items-center gap-3" onClick={() => toggleSection(`${key}-${sIdx}`)}>
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-4 h-4 text-indigo-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-100 truncate">{section.title}</p>
                        <p className="text-xs text-gray-400">{section.topics.length} {ta ? 'தலைப்புகள்' : 'topics'}</p>
                      </div>
                      <ChevronDown className={cn("w-4 h-4 text-gray-300 transition-transform", expandedSections.has(`${key}-${sIdx}`) && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {expandedSections.has(`${key}-${sIdx}`) && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="px-3.5 pb-3.5 border-t border-gray-50 dark:border-slate-800 pt-2.5">
                            <ul className="space-y-1.5">
                              {section.topics.map((topic, tIdx) => (
                                <li key={tIdx} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                  <span className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                                  <span>{topic.name}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                ))
              ))
            )}
          </div>
        )}

        {/* ════════════════════════════
             TAB: PYQ (PREVIOUS YEAR QUESTIONS)
           ════════════════════════════ */}
        {activeTab === 'pyq' && (
          <div>
            {exam.pyq.length === 0 ? (
              /* ── Empty state ── */
              <Card><CardContent className="p-10 text-center">
                <Target className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-500 mb-1">{ta ? 'PYQ கேள்விகள் விரைவில்' : 'Previous Year Questions Coming Soon'}</p>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">{ta ? 'இந்த தேர்வுக்கான முந்தைய ஆண்டு கேள்விகளை விரைவில் சேர்ப்போம்.' : 'We are preparing previous year questions for this exam. Check back soon.'}</p>
                <Button variant="outline" size="sm" className="mt-4 text-xs rounded-lg" onClick={() => setShowMockTest(true)}>
                  <Play className="w-3.5 h-3.5 mr-1.5" /> {ta ? 'மாக் டெஸ்ட் முயற்சிக்க' : 'Try Mock Test Instead'}
                </Button>
              </CardContent></Card>
            ) : (
              <>
                {/* ── PYQ Progress Bar ── */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-3.5 border border-gray-100 dark:border-slate-700 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs font-bold text-gray-800 dark:text-white">{ta ? 'உங்கள் முன்னேற்றம்' : 'Your Progress'}</p>
                      <p className="text-xs text-gray-400">{pyqStats.attempted}/{pyqStats.total} {ta ? 'பதில் அளித்தது' : 'answered'} • {pyqStats.correct} {ta ? 'சரி' : 'correct'}</p>
                    </div>
                    <div className="flex gap-2">
                      {pyqStats.attempted > 0 && (
                        <button onClick={resetPYQ} className="text-xs font-semibold text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors">
                          <RotateCcw className="w-3.5 h-3.5" /> {ta ? 'மீட்டமை' : 'Reset'}
                        </button>
                      )}
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1 rounded-lg" onClick={() => handleDownloadPDF('pyq')}>
                        <Download className="w-3.5 h-3.5" /> PDF
                      </Button>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500 to-green-600"
                      style={{ width: `${pyqStats.total > 0 ? (pyqStats.revealed / pyqStats.total) * 100 : 0}%` }}
                    />
                  </div>
                  {/* Score display */}
                  {pyqStats.revealed > 0 && (
                    <div className="flex gap-3 mt-2">
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1"><CircleCheck className="w-3.5 h-3.5" /> {pyqStats.correct} {ta ? 'சரி' : 'correct'}</span>
                      <span className="text-xs text-red-500 font-bold flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {pyqStats.revealed - pyqStats.correct} {ta ? 'தவறு' : 'wrong'}</span>
                      <span className="text-xs text-gray-400">{pyqStats.total - pyqStats.revealed} {ta ? 'மீதம்' : 'remaining'}</span>
                    </div>
                  )}
                </div>

                {/* ── Subject-wise question groups ── */}
                {Object.entries(pyqBySubject).map(([subject, questions]) => (
                  <div key={subject} className="mb-5">
                    <div className="flex items-center gap-2 mb-2.5 px-1">
                      <FileText className="w-3.5 h-3.5 text-indigo-500" />
                      <h3 className="text-xs font-bold text-gray-700 dark:text-gray-200">{subject}</h3>
                      <span className="text-xs text-gray-400 ml-auto">{questions.length} {ta ? 'கேள்விகள்' : 'questions'}</span>
                    </div>

                    <div className="space-y-2.5">
                      {questions.map((q, qIdx) => {
                        const isRevealed = revealedAnswers.has(q.id);
                        const selected = selectedAnswers[q.id];
                        const isCorrect = selected === q.answer;
                        const hasAnswered = selected !== undefined;

                        return (
                          <motion.div key={q.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(qIdx * 0.03, 0.2) }}>
                            <div className={cn(
                              "rounded-2xl border p-4 transition-all",
                              isRevealed
                                ? isCorrect
                                  ? "border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-900"
                                  : "border-red-200 bg-red-50/50 dark:bg-red-950/20 dark:border-red-900"
                                : "border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800/50"
                            )}>
                              {/* Question */}
                              <div className="flex items-start gap-2.5 mb-3">
                                <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-slate-700 w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0">
                                  {qIdx + 1}
                                </span>
                                <p className="text-[12px] font-medium text-gray-800 dark:text-gray-100 leading-relaxed">
                                  {ta && q.questionTamil ? q.questionTamil : q.question}
                                </p>
                              </div>

                              {/* Options */}
                              <div className="space-y-1.5 ml-8">
                                {q.options.map((opt, oIdx) => {
                                  const isSelected = selected === oIdx;
                                  const isAnswer = q.answer === oIdx;

                                  let style = "border-gray-100 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-500";
                                  if (isRevealed) {
                                    if (isAnswer) style = "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30";
                                    else if (isSelected) style = "border-red-400 bg-red-50 dark:bg-red-900/30";
                                    else style = "border-gray-100 dark:border-slate-700 opacity-50";
                                  } else if (isSelected) {
                                    style = "border-blue-400 bg-blue-50 dark:bg-blue-900/20";
                                  }

                                  return (
                                    <button
                                      key={oIdx}
                                      onClick={() => handleAnswer(q.id, oIdx)}
                                      disabled={isRevealed}
                                      className={cn("w-full text-left px-3 py-2.5 rounded-xl border text-xs transition-all flex items-center gap-2.5", style)}
                                    >
                                      <span className={cn(
                                        "w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0",
                                        isRevealed && isAnswer ? "border-emerald-500 bg-emerald-500 text-white" :
                                        isRevealed && isSelected ? "border-red-500 bg-red-500 text-white" :
                                        isSelected ? "border-blue-500 bg-blue-500 text-white" :
                                        "border-gray-300 dark:border-gray-600 text-gray-400"
                                      )}>
                                        {isRevealed && isAnswer ? <Check className="w-3.5 h-3.5" /> :
                                         isRevealed && isSelected ? <X className="w-3.5 h-3.5" /> :
                                         String.fromCharCode(65 + oIdx)}
                                      </span>
                                      <span className="flex-1 text-gray-700 dark:text-gray-200">{opt}</span>
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Footer: difficulty + show answer */}
                              <div className="flex items-center justify-between mt-3 ml-8">
                                <div className="flex items-center gap-2">
                                  <span className={cn("text-xs font-bold px-2 py-0.5 rounded-md",
                                    q.difficulty === 'Easy' ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20" :
                                    q.difficulty === 'Medium' ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20" :
                                    "bg-red-50 text-red-600 dark:bg-red-900/20"
                                  )}>{q.difficulty}</span>
                                  {q.year && <span className="text-xs text-gray-400">{q.year}</span>}
                                </div>
                                <button onClick={() => toggleReveal(q.id)} disabled={!hasAnswered && !isRevealed}
                                  className={cn("text-xs font-semibold flex items-center gap-1 transition-colors",
                                    !hasAnswered && !isRevealed ? "text-gray-300 cursor-not-allowed" :
                                    isRevealed ? "text-gray-400 hover:text-gray-600" : "text-blue-500 hover:text-blue-700"
                                  )}>
                                  {isRevealed ? <><EyeOff className="w-3.5 h-3.5" /> {ta ? 'மறை' : 'Hide'}</> : <><Eye className="w-3.5 h-3.5" /> {ta ? 'விடை காண்' : 'Check Answer'}</>}
                                </button>
                              </div>

                              {/* Explanation */}
                              <AnimatePresence>
                                {isRevealed && q.explanation && (
                                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                    <div className="mt-3 ml-8 p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900">
                                      <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                                        <span className="font-bold">{ta ? 'விளக்கம்: ' : 'Explanation: '}</span>
                                        {q.explanation}
                                      </p>
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
                ))}

                {/* Bottom: Mock Test CTA */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-4 text-center">
                  <p className="text-xs font-bold text-white mb-1">{ta ? 'முழு பயிற்சி தேர்வு எழுத விரும்புகிறீர்களா?' : 'Ready for a full practice test?'}</p>
                  <p className="text-xs text-white/40 mb-3">{ta ? 'நேர அடிப்படையிலான மாக் டெஸ்ட் முயற்சிக்கவும்' : 'Take a timed mock test with all available questions'}</p>
                  <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100 text-xs font-bold rounded-xl" onClick={() => setShowMockTest(true)}>
                    <Play className="w-3.5 h-3.5 mr-1.5" /> {ta ? 'மாக் டெஸ்ட் தொடங்கு' : 'Start Mock Test'}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ════════════════════════════
             TAB: EXAM PATTERN
           ════════════════════════════ */}
        {activeTab === 'pattern' && (
          <div>
            {exam.examPattern && exam.examPattern.length > 0 ? (
              <div className="space-y-2.5">
                {exam.examPattern.map((p, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-4">
                      <h4 className="text-xs font-bold text-gray-800 dark:text-gray-100 mb-3">{ta ? p.paperTamil : p.paper}</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: ta ? 'மதிப்பெண்கள்' : 'Marks', value: p.marks, color: 'text-indigo-600' },
                          { label: ta ? 'நேரம்' : 'Duration', value: p.duration, color: 'text-amber-600' },
                          { label: ta ? 'கேள்விகள்' : 'Questions', value: p.questions, color: 'text-emerald-600' },
                        ].map((s, i) => (
                          <div key={i} className="text-center bg-gray-50 dark:bg-slate-800/50 rounded-xl p-2.5">
                            <p className={cn("text-sm font-extrabold", s.color)}>{s.value}</p>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card><CardContent className="p-10 text-center">
                <Award className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400 font-medium">{ta ? 'தேர்வு வடிவம் விரைவில்' : 'Exam pattern coming soon'}</p>
              </CardContent></Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernmentExamDetail;
