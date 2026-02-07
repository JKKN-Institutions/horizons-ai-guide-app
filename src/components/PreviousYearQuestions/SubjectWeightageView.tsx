import { ArrowLeft, BookOpen, TrendingUp, BarChart3, Stethoscope, Brain, FlaskConical, Pill, Microscope, Heart, Shield, Scale, Syringe, Bone, Eye, Ear, Baby, Radiation, Scissors, Activity } from 'lucide-react';
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
  totalQuestions: number;
  weightage: number;
  category: 'Pre-Clinical' | 'Para-Clinical' | 'Clinical';
}

const neetPgSubjects: SubjectCard[] = [
  // Pre-Clinical
  { name: 'Anatomy', icon: Bone, color: 'text-amber-600', bgColor: 'bg-amber-50', description: 'Master Anatomy with highly-effective, structured topic-wise analysis and weightage trends.', totalQuestions: 82, weightage: 8.5, category: 'Pre-Clinical' },
  { name: 'Physiology', icon: Activity, color: 'text-blue-600', bgColor: 'bg-blue-50', description: 'Comprehensive Physiology coverage — CVS, Renal, Endocrine and CNS systems.', totalQuestions: 70, weightage: 7.2, category: 'Pre-Clinical' },
  { name: 'Biochemistry', icon: FlaskConical, color: 'text-rose-600', bgColor: 'bg-rose-50', description: 'Ace Biochemistry with molecular biology, metabolism and clinical correlations.', totalQuestions: 52, weightage: 5.4, category: 'Pre-Clinical' },

  // Para-Clinical
  { name: 'Pharmacology', icon: Pill, color: 'text-green-600', bgColor: 'bg-green-50', description: 'Complete Pharmacology — ANS, CNS, Chemotherapy and Autacoids.', totalQuestions: 69, weightage: 7.1, category: 'Para-Clinical' },
  { name: 'Pathology', icon: Microscope, color: 'text-purple-600', bgColor: 'bg-purple-50', description: 'Ace Pathology with general pathology, hematology and neoplasia focus areas.', totalQuestions: 55, weightage: 5.7, category: 'Para-Clinical' },
  { name: 'Microbiology', icon: Microscope, color: 'text-teal-600', bgColor: 'bg-teal-50', description: 'In-depth Microbiology — bacteriology, virology, parasitology and immunology.', totalQuestions: 53, weightage: 5.5, category: 'Para-Clinical' },
  { name: 'Forensic Medicine', icon: Scale, color: 'text-indigo-600', bgColor: 'bg-indigo-50', description: 'FMT made simpler — identification, toxicology and medical jurisprudence.', totalQuestions: 43, weightage: 4.4, category: 'Para-Clinical' },
  { name: 'Social & Preventive Medicine', icon: Shield, color: 'text-cyan-600', bgColor: 'bg-cyan-50', description: 'Score high with biostatistics, epidemiology and national health programs.', totalQuestions: 63, weightage: 6.5, category: 'Para-Clinical' },

  // Clinical
  { name: 'Medicine', icon: Stethoscope, color: 'text-red-600', bgColor: 'bg-red-50', description: 'Get mentored on cardiology, endocrinology, neurology and infectious diseases.', totalQuestions: 84, weightage: 8.7, category: 'Clinical' },
  { name: 'Surgery', icon: Scissors, color: 'text-orange-600', bgColor: 'bg-orange-50', description: 'Complete Surgery syllabus — GI, urology, endocrine and trauma.', totalQuestions: 52, weightage: 5.4, category: 'Clinical' },
  { name: 'Obstetrics & Gynaecology', icon: Baby, color: 'text-pink-600', bgColor: 'bg-pink-50', description: 'Learn AtoZ of OBG — normal labour, high-risk pregnancy and gynaecological oncology.', totalQuestions: 52, weightage: 5.4, category: 'Clinical' },
  { name: 'Pediatrics', icon: Baby, color: 'text-sky-600', bgColor: 'bg-sky-50', description: 'Become a pediatrics expert with neonatology, immunization and growth topics.', totalQuestions: 52, weightage: 5.4, category: 'Clinical' },
  { name: 'Orthopedics', icon: Bone, color: 'text-yellow-700', bgColor: 'bg-yellow-50', description: 'Boost preparation with fractures, bone tumors and spine disorders.', totalQuestions: 41, weightage: 4.2, category: 'Clinical' },
  { name: 'Dermatology & Venereology', icon: Heart, color: 'text-fuchsia-600', bgColor: 'bg-fuchsia-50', description: 'Master Dermatology with papulosquamous, vesiculobullous and STD coverage.', totalQuestions: 40, weightage: 4.1, category: 'Clinical' },
  { name: 'Ophthalmology', icon: Eye, color: 'text-violet-600', bgColor: 'bg-violet-50', description: 'Best-in-class comprehensive study material for lens, glaucoma and retina.', totalQuestions: 45, weightage: 4.6, category: 'Clinical' },
  { name: 'ENT', icon: Ear, color: 'text-emerald-600', bgColor: 'bg-emerald-50', description: 'Make ENT easier with otology, rhinology and laryngology topics.', totalQuestions: 34, weightage: 3.5, category: 'Clinical' },
  { name: 'Anaesthesia', icon: Syringe, color: 'text-slate-600', bgColor: 'bg-slate-50', description: 'Learn general & regional anaesthesia, pain management and critical care.', totalQuestions: 30, weightage: 3.1, category: 'Clinical' },
  { name: 'Radiology', icon: Radiation, color: 'text-lime-700', bgColor: 'bg-lime-50', description: 'Enrich preparation with X-ray, CT, MRI and nuclear medicine topics.', totalQuestions: 31, weightage: 3.2, category: 'Clinical' },
  { name: 'Psychiatry', icon: Brain, color: 'text-rose-500', bgColor: 'bg-rose-50', description: 'Learn mood disorders, psychotic disorders and psychopharmacology.', totalQuestions: 38, weightage: 3.9, category: 'Clinical' },
];

const categories = ['Pre-Clinical', 'Para-Clinical', 'Clinical'] as const;
const categoryColors: Record<string, string> = {
  'Pre-Clinical': 'from-blue-500 to-cyan-500',
  'Para-Clinical': 'from-purple-500 to-pink-500',
  'Clinical': 'from-emerald-500 to-teal-500',
};

export const SubjectWeightageView = ({ examId, examName, onBack, onSelectSubject }: SubjectWeightageViewProps) => {
  const totalQuestions = neetPgSubjects.reduce((s, sub) => s + sub.totalQuestions, 0);

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
                <div className="text-xl font-bold">{totalQuestions}</div>
                <div className="text-[10px] text-white/70 uppercase tracking-wider">Questions</div>
              </div>
              <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-2 text-center border border-white/20">
                <div className="text-xl font-bold">200</div>
                <div className="text-[10px] text-white/70 uppercase tracking-wider">Total Marks</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigate Quickly */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card className="border-gray-100 rounded-2xl shadow-sm">
          <CardContent className="p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">Navigate Quickly</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <a key={cat} href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 border-gray-200">
                    {cat}
                  </Badge>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
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
            transition={{ delay: catIdx * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("w-1 h-6 rounded-full bg-gradient-to-b", categoryColors[category])} />
              <h4 className="text-lg font-bold text-gray-800">{category} Subjects</h4>
              <Badge variant="secondary" className="text-xs">{subjects.length} subjects</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjects.map((subject, sIdx) => {
                const Icon = subject.icon;
                return (
                  <motion.div
                    key={subject.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: catIdx * 0.1 + sIdx * 0.04 }}
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
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-bold text-gray-800 uppercase text-sm tracking-wide">{subject.name}</h5>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{subject.description}</p>
                            <div className="flex items-center gap-3 mt-3">
                              <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                                <BarChart3 className="w-3 h-3 text-gray-400" />
                                {subject.weightage}% weightage
                              </span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                                <BookOpen className="w-3 h-3 text-gray-400" />
                                {subject.totalQuestions} Qs
                              </span>
                            </div>
                          </div>
                          <TrendingUp className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors shrink-0 mt-1" />
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
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
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
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
