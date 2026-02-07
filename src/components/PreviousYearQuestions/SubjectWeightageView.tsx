import { ArrowLeft, BookOpen, TrendingUp, BarChart3, Stethoscope, Brain, FlaskConical, Pill, Microscope, Heart, Shield, Scale, Syringe, Bone, Eye, Ear, Baby, Radiation, Scissors, Activity, Info, Lightbulb, Target, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SubjectWeightageViewProps {
  examId: string;
  examName: string;
  onBack: () => void;
  onSelectSubject: (subject: string) => void;
}

interface SubjectCard {
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  description: string;
  questionRange: string;
  importance: 'Very High' | 'High' | 'Moderate' | 'Low';
  category: 'Pre-Clinical' | 'Para-Clinical' | 'Clinical';
}

const importanceConfig = {
  'Very High': { bg: 'bg-rose-600', text: 'text-white', border: 'border-rose-700' },
  'High': { bg: 'bg-amber-500', text: 'text-white', border: 'border-amber-600' },
  'Moderate': { bg: 'bg-blue-500', text: 'text-white', border: 'border-blue-600' },
  'Low': { bg: 'bg-emerald-600', text: 'text-white', border: 'border-emerald-700' },
};

const neetPgSubjects: SubjectCard[] = [
  // Pre-Clinical
  { name: 'Anatomy', icon: Bone, color: 'text-amber-600', bgColor: 'bg-amber-50', description: 'Moderately important; often tested through applied and image-based questions.', questionRange: '15–17', importance: 'Moderate', category: 'Pre-Clinical' },
  { name: 'Physiology', icon: Activity, color: 'text-blue-600', bgColor: 'bg-blue-50', description: 'Moderately important; cardiac and respiratory physiology remain favorites.', questionRange: '15–17', importance: 'Moderate', category: 'Pre-Clinical' },
  { name: 'Biochemistry', icon: FlaskConical, color: 'text-rose-600', bgColor: 'bg-rose-50', description: 'Moderate; metabolic pathways, enzymes, and molecular biology are high-yield.', questionRange: '12–15', importance: 'Moderate', category: 'Pre-Clinical' },

  // Para-Clinical
  { name: 'Pathology', icon: Microscope, color: 'text-purple-600', bgColor: 'bg-purple-50', description: 'High importance; both conceptual and image-based questions are frequent.', questionRange: '25', importance: 'High', category: 'Para-Clinical' },
  { name: 'Pharmacology', icon: Pill, color: 'text-green-600', bgColor: 'bg-green-50', description: 'High importance; antimicrobials, mechanisms of action, and side effects dominate.', questionRange: '20', importance: 'High', category: 'Para-Clinical' },
  { name: 'Microbiology', icon: Microscope, color: 'text-teal-600', bgColor: 'bg-teal-50', description: 'High importance; bacteriology, virology, and immunology are repeatedly tested.', questionRange: '20', importance: 'High', category: 'Para-Clinical' },
  { name: 'Forensic Medicine', icon: Scale, color: 'text-indigo-600', bgColor: 'bg-indigo-50', description: 'Lower weightage but easy scoring if revised well.', questionRange: '10', importance: 'Low', category: 'Para-Clinical' },
  { name: 'Social & Preventive Medicine', icon: Shield, color: 'text-cyan-600', bgColor: 'bg-cyan-50', description: 'High importance; epidemiology, biostatistics, and national programs are must-do.', questionRange: '25', importance: 'High', category: 'Para-Clinical' },

  // Clinical
  { name: 'Medicine', icon: Stethoscope, color: 'text-red-600', bgColor: 'bg-red-50', description: 'Very high importance; cardiology, neurology, infectious diseases, and systemic medicine are all heavily tested. Includes Dermatology & Psychiatry.', questionRange: '45–50', importance: 'Very High', category: 'Clinical' },
  { name: 'Surgery', icon: Scissors, color: 'text-orange-600', bgColor: 'bg-orange-50', description: 'Very high importance; trauma, GI surgery, orthopedics basics, and perioperative care feature regularly. Includes Orthopedics & Anesthesia.', questionRange: '45', importance: 'Very High', category: 'Clinical' },
  { name: 'Obstetrics & Gynaecology', icon: Baby, color: 'text-pink-600', bgColor: 'bg-pink-50', description: 'High importance; labor, obstetric emergencies, and gynecological malignancies are frequently asked.', questionRange: '30–35', importance: 'High', category: 'Clinical' },
  { name: 'Pediatrics', icon: Baby, color: 'text-sky-600', bgColor: 'bg-sky-50', description: 'Moderate; vaccines, growth & development, and neonatology are crucial.', questionRange: '15', importance: 'Moderate', category: 'Clinical' },
  { name: 'Ophthalmology', icon: Eye, color: 'text-violet-600', bgColor: 'bg-violet-50', description: 'Low weightage but image-based questions are common.', questionRange: '10', importance: 'Low', category: 'Clinical' },
  { name: 'ENT', icon: Ear, color: 'text-emerald-600', bgColor: 'bg-emerald-50', description: 'Low weightage; quick revision can fetch easy marks.', questionRange: '10', importance: 'Low', category: 'Clinical' },
  { name: 'Orthopedics', icon: Bone, color: 'text-yellow-700', bgColor: 'bg-yellow-50', description: 'Low weightage; fractures and bone tumors are exam favorites.', questionRange: '10', importance: 'Low', category: 'Clinical' },
  { name: 'Dermatology & Venereology', icon: Heart, color: 'text-fuchsia-600', bgColor: 'bg-fuchsia-50', description: 'Moderate; image-based questions on common skin disorders.', questionRange: '8–10', importance: 'Moderate', category: 'Clinical' },
  { name: 'Radiology', icon: Radiation, color: 'text-lime-700', bgColor: 'bg-lime-50', description: 'Moderate; X-rays, CT, and MRI image identification is frequent.', questionRange: '12–15', importance: 'Moderate', category: 'Clinical' },
  { name: 'Psychiatry', icon: Brain, color: 'text-rose-500', bgColor: 'bg-rose-50', description: 'Moderate; diagnostic criteria and common therapies are tested.', questionRange: '8–10', importance: 'Moderate', category: 'Clinical' },
  { name: 'Anaesthesia', icon: Syringe, color: 'text-slate-600', bgColor: 'bg-slate-50', description: 'Moderate; basics of anesthesia, CPR, and perioperative care are key.', questionRange: '8–10', importance: 'Moderate', category: 'Clinical' },
];

const categories = ['Pre-Clinical', 'Para-Clinical', 'Clinical'] as const;
const categoryColors: Record<string, string> = {
  'Pre-Clinical': 'from-blue-500 to-cyan-500',
  'Para-Clinical': 'from-purple-500 to-pink-500',
  'Clinical': 'from-emerald-500 to-teal-500',
};

export const SubjectWeightageView = ({ examId, examName, onBack, onSelectSubject }: SubjectWeightageViewProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Button variant="ghost" size="sm" className="mb-3 text-gray-600 hover:text-gray-800 rounded-xl -ml-2" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
        </Button>

        <div className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 rounded-2xl p-5 md:p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-emerald-200 text-sm font-medium">{examName}</p>
              <h3 className="text-2xl font-bold">Subject-Wise Weightage for NEET PG 2026</h3>
              <p className="text-emerald-100 text-sm mt-1">Stay up to date on what's happening in the NEET-PG Exam</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-2 text-center border border-white/20">
                <div className="text-xl font-bold">{neetPgSubjects.length}</div>
                <div className="text-[10px] text-white/70 uppercase tracking-wider">Subjects</div>
              </div>
              <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-2 text-center border border-white/20">
                <div className="text-xl font-bold">~200</div>
                <div className="text-[10px] text-white/70 uppercase tracking-wider">Questions</div>
              </div>
              <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-2 text-center border border-white/20">
                <div className="text-xl font-bold">800</div>
                <div className="text-[10px] text-white/70 uppercase tracking-wider">Total Marks</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Intro Content */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card className="border-gray-100 rounded-2xl shadow-sm">
          <CardContent className="p-5 md:p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              If you are preparing for <span className="font-semibold text-gray-900">NEET PG 2026</span>, you must be aware of the fact that it is never about how many hours you put in. It is more about how effectively you leverage whatever time you get. What makes a topper stand out is how much effort and dedication they invest in <span className="font-semibold text-emerald-600">high-yield subjects</span>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              With typically <span className="font-semibold text-gray-900">200 questions spread across 19 subjects</span>, every aspirant has one question in mind: <span className="italic text-gray-600">Where should I spend most of my time?</span>
            </p>
            <p className="text-gray-700 leading-relaxed">
              Not every subject should be given equal importance. While subjects like <span className="font-semibold text-rose-600">Medicine</span> and <span className="font-semibold text-orange-600">Surgery</span> can decide half your score, others like Ophthalmology and ENT might have fewer questions. However, the latter subjects can still make a big difference when it comes to rank.
            </p>

            {/* Prep Tips */}
            <div className="space-y-5 mt-4 pt-4 border-t border-gray-100">
              <div>
                <h5 className="font-bold text-gray-800 text-lg mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  How to Use the Weightage in Your Preparation
                </h5>
                <p className="text-gray-600 text-sm">Understanding the numbers is only half the battle. The real trick is knowing how to plan around them.</p>
              </div>

              <div>
                <h6 className="font-bold text-gray-800 mb-1.5 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  Allocate Time Proportionally
                </h6>
                <p className="text-gray-600 text-sm leading-relaxed">
                  As all the subjects don't hold equal importance in the exam, you must also not treat all the subjects equally. It's advised that you spend maximum time on subjects including <span className="font-semibold">Medicine, Surgery, OBSGYN, Pathology, Pharmacology, and PSM</span>. These subjects are known to cover half the paper.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mt-2">
                  And short subjects like ENT, Ophthalmology, and Forensic Medicine might seem small and insignificant, but they can help you score extra crucial marks if you revise them strategically in the final weeks.
                </p>
              </div>

              <div>
                <h6 className="font-bold text-gray-800 mb-1.5 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  Focus on Integration
                </h6>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Recent NEET PG papers are highly integrated. For example, a clinical case of pneumonia may require knowledge of Medicine, Microbiology, and Pharmacology in a single question. So, study in a way that connects subjects rather than treating them in isolation.
                </p>
              </div>

              <div>
                <h6 className="font-bold text-gray-800 mb-1.5 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  Rely on PYQs as a Guide
                </h6>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Previous year questions aren't just practice — they are a roadmap. Many concepts repeat year after year. Antimicrobial drugs in Pharmacology, reproductive physiology in OBG, or cardiac conditions in Medicine are recurring themes that should always be high on your list.
                </p>
              </div>

              <div>
                <h6 className="font-bold text-gray-800 mb-1.5 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  Revise Short Subjects Before the Exam
                </h6>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Unlike common thinking, short subjects can act as rank differentiators. Just a quick 10–15-day revision cycle for subjects including Ophthalmology, ENT, Forensic Medicine, and Dermatology can do wonders for your score.
                </p>
              </div>
            </div>

            {/* Wrapping Up */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h5 className="font-bold text-gray-800 text-lg mb-2">Wrapping Up</h5>
              <p className="text-gray-600 text-sm leading-relaxed">
                If you wish to succeed in NEET PG 2026, give up on the perception of reading everything under the sun. You should focus on revising what matters the most and in the most effective manner.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mt-2">
                Once you understand the subject-wise weightage, you can easily plan your study hours in a way that maximises marks and minimizes wasted effort.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2 font-medium">
                You must focus on high-weightage subjects, revise short subjects, and use previous years' questions to stay exam-oriented.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigate Quickly */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Navigate:</span>
          {categories.map(cat => (
            <a key={cat} href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`}>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 border-gray-200">
                {cat}
              </Badge>
            </a>
          ))}
          <a href="#exam-pattern">
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 border-gray-200">
              Exam Pattern
            </Badge>
          </a>
        </div>
      </motion.div>

      {/* Subject Cards by Category */}
      {categories.map((category, catIdx) => {
        const subjects = neetPgSubjects.filter(s => s.category === category);
        return (
          <motion.div
            key={category}
            id={category.toLowerCase().replace(/\s+/g, '-')}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIdx * 0.1 + 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("w-1 h-6 rounded-full bg-gradient-to-b", categoryColors[category])} />
              <h4 className="text-lg font-bold text-gray-800">{category} Subjects</h4>
              <Badge variant="secondary" className="text-xs">{subjects.length} subjects</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjects.map((subject, sIdx) => {
                const Icon = subject.icon;
                const imp = importanceConfig[subject.importance];
                return (
                  <motion.div
                    key={subject.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: catIdx * 0.1 + sIdx * 0.04 + 0.1 }}
                  >
                    <Card
                      className="group border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden"
                      onClick={() => onSelectSubject(subject.name)}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className={cn("p-3 rounded-xl shrink-0", subject.bgColor)}>
                            <Icon className={cn("w-6 h-6", subject.color)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h5 className="font-bold text-gray-800 uppercase text-sm tracking-wide">{subject.name}</h5>
                              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md border", imp.bg, imp.text, imp.border)}>
                                {subject.importance}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{subject.description}</p>
                            <div className="flex items-center gap-3 mt-3">
                              <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                                <BookOpen className="w-3 h-3 text-gray-400" />
                                {subject.questionRange} Questions
                              </span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-blue-600 font-medium group-hover:underline">
                                View Topics →
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      })}

      {/* Exam Pattern Info */}
      <motion.div id="exam-pattern" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="border-gray-100 rounded-2xl shadow-sm bg-gradient-to-br from-gray-50 to-white">
          <CardContent className="p-5">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-500" />
              NEET PG 2026 Exam Pattern
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Total Questions', value: '200' },
                { label: 'Duration', value: '3 hrs 30 min' },
                { label: 'Marking', value: '+4 / -1' },
                { label: 'Mode', value: 'Computer-Based' },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-gray-800">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              In total, the paper will have <span className="font-semibold text-gray-700">~200 questions</span>, with clinical and image-based cases forming a significant portion.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};