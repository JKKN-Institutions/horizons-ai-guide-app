import { ArrowLeft, BarChart3, Lightbulb, Target, TrendingUp, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SubjectWeightageViewProps {
  examId: string;
  examName: string;
  onBack: () => void;
  onSelectSubject: (subject: string) => void;
}

interface SubjectWeight {
  name: string;
  icon: string;
  marks: number;
  questions: number;
  importance: 'Very High' | 'High' | 'Moderate';
  keyTopics: string[];
  color: string;
  bgColor: string;
}

interface ExamWeightageData {
  totalMarks: number;
  totalQuestions: number;
  duration: string;
  subjects: SubjectWeight[];
  tips: string[];
}

// ──── EXAM DATA ────

const examWeightageMap: Record<string, ExamWeightageData> = {
  'jee-main': {
    totalMarks: 300, totalQuestions: 75, duration: '3 Hours',
    subjects: [
      { name: 'Physics', icon: '⚡', marks: 100, questions: 25, importance: 'Very High', keyTopics: ['Mechanics', 'Electrodynamics', 'Modern Physics', 'Optics', 'Thermodynamics'], color: 'text-blue-700', bgColor: 'bg-blue-50' },
      { name: 'Chemistry', icon: '🧪', marks: 100, questions: 25, importance: 'High', keyTopics: ['Organic Chemistry', 'Physical Chemistry', 'Inorganic Chemistry', 'Coordination Compounds'], color: 'text-emerald-700', bgColor: 'bg-emerald-50' },
      { name: 'Mathematics', icon: '📐', marks: 100, questions: 25, importance: 'Very High', keyTopics: ['Calculus', 'Algebra', 'Coordinate Geometry', 'Probability & Statistics', 'Trigonometry'], color: 'text-purple-700', bgColor: 'bg-purple-50' },
    ],
    tips: ['Focus on NCERT for Chemistry basics', 'Practice 50+ problems daily in Maths', 'Solve previous 10 years papers', 'Attempt mock tests weekly'],
  },
  'jee-advanced': {
    totalMarks: 360, totalQuestions: 54, duration: '3 Hrs each (Paper 1 & 2)',
    subjects: [
      { name: 'Physics', icon: '⚡', marks: 120, questions: 18, importance: 'Very High', keyTopics: ['Mechanics', 'Electromagnetism', 'Optics', 'Modern Physics', 'Waves'], color: 'text-blue-700', bgColor: 'bg-blue-50' },
      { name: 'Chemistry', icon: '🧪', marks: 120, questions: 18, importance: 'High', keyTopics: ['Organic Mechanisms', 'Thermodynamics', 'Electrochemistry', 'Chemical Bonding'], color: 'text-emerald-700', bgColor: 'bg-emerald-50' },
      { name: 'Mathematics', icon: '📐', marks: 120, questions: 18, importance: 'Very High', keyTopics: ['Calculus', 'Complex Numbers', 'Matrices', 'Probability', 'Vectors'], color: 'text-purple-700', bgColor: 'bg-purple-50' },
    ],
    tips: ['Conceptual clarity > rote learning', 'JEE Advanced tests application, not memory', 'Solve IIT past papers (2010-2025)', 'Time management is critical — practice under timed conditions'],
  },
  'neet': {
    totalMarks: 720, totalQuestions: 180, duration: '3 Hours 20 Mins',
    subjects: [
      { name: 'Physics', icon: '⚡', marks: 180, questions: 45, importance: 'High', keyTopics: ['Mechanics', 'Electrostatics', 'Optics', 'Modern Physics', 'Magnetism'], color: 'text-blue-700', bgColor: 'bg-blue-50' },
      { name: 'Chemistry', icon: '🧪', marks: 180, questions: 45, importance: 'High', keyTopics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Biomolecules'], color: 'text-emerald-700', bgColor: 'bg-emerald-50' },
      { name: 'Biology', icon: '🧬', marks: 360, questions: 90, importance: 'Very High', keyTopics: ['Human Physiology', 'Genetics', 'Ecology', 'Cell Biology', 'Plant Physiology', 'Biotechnology'], color: 'text-rose-700', bgColor: 'bg-rose-50' },
    ],
    tips: ['Biology = 50% of marks — master NCERT line by line', 'Chemistry NCERT is sufficient for 80% questions', 'Practice Physics numericals daily', 'Revise diagrams and flowcharts for Biology'],
  },
  'neet-pg': {
    totalMarks: 800, totalQuestions: 200, duration: '3.5 Hours',
    subjects: [
      { name: 'Medicine', icon: '🩺', marks: 200, questions: 50, importance: 'Very High', keyTopics: ['Cardiology', 'Neurology', 'Infectious Disease', 'Endocrinology', 'Dermatology'], color: 'text-red-700', bgColor: 'bg-red-50' },
      { name: 'Surgery', icon: '🔪', marks: 180, questions: 45, importance: 'Very High', keyTopics: ['GI Surgery', 'Trauma', 'Orthopaedics', 'Urology', 'Anaesthesia'], color: 'text-orange-700', bgColor: 'bg-orange-50' },
      { name: 'Pharmacology', icon: '💊', marks: 80, questions: 20, importance: 'High', keyTopics: ['Antimicrobials', 'CNS Drugs', 'Cardiovascular Drugs', 'Autonomic Nervous System'], color: 'text-green-700', bgColor: 'bg-green-50' },
      { name: 'Pathology', icon: '🔬', marks: 100, questions: 25, importance: 'High', keyTopics: ['Hematology', 'Neoplasia', 'Immunopathology', 'General Pathology'], color: 'text-purple-700', bgColor: 'bg-purple-50' },
      { name: 'OBG', icon: '🤱', marks: 120, questions: 30, importance: 'High', keyTopics: ['Obstetric Emergencies', 'Labour', 'Gynae Malignancies', 'Contraception'], color: 'text-pink-700', bgColor: 'bg-pink-50' },
      { name: 'Microbiology', icon: '🦠', marks: 80, questions: 20, importance: 'High', keyTopics: ['Bacteriology', 'Virology', 'Immunology', 'Mycology'], color: 'text-teal-700', bgColor: 'bg-teal-50' },
    ],
    tips: ['Medicine + Surgery = 50% of paper — prioritize these', 'Focus on high-yield image-based questions', 'Use question banks with explanations', 'Revise Pharmacology tables weekly'],
  },
  'bitsat': {
    totalMarks: 390, totalQuestions: 130, duration: '3 Hours',
    subjects: [
      { name: 'Physics', icon: '⚡', marks: 120, questions: 40, importance: 'High', keyTopics: ['Mechanics', 'Electrostatics', 'Modern Physics', 'Optics'], color: 'text-blue-700', bgColor: 'bg-blue-50' },
      { name: 'Chemistry', icon: '🧪', marks: 120, questions: 40, importance: 'High', keyTopics: ['Organic', 'Physical', 'Inorganic Chemistry'], color: 'text-emerald-700', bgColor: 'bg-emerald-50' },
      { name: 'Mathematics', icon: '📐', marks: 120, questions: 40, importance: 'Very High', keyTopics: ['Calculus', 'Algebra', 'Probability', 'Trigonometry'], color: 'text-purple-700', bgColor: 'bg-purple-50' },
    ],
    tips: ['Speed is key — 3 mins per question average', 'NCERT + BITSAT specific practice', 'English & Logical Reasoning are bonus sections', 'Attempt all — no negative for bonus questions'],
  },
};

// Fallback for exams without specific data
const getExamData = (examId: string): ExamWeightageData | null => {
  return examWeightageMap[examId] || null;
};

const importanceBadge = (level: string) => {
  const config: Record<string, string> = {
    'Very High': 'bg-red-100 text-red-700',
    'High': 'bg-amber-100 text-amber-700',
    'Moderate': 'bg-blue-100 text-blue-700',
  };
  return config[level] || 'bg-gray-100 text-gray-700';
};

// ──── COMPONENT ────

export const SubjectWeightageView = ({ examId, examName, onBack, onSelectSubject }: SubjectWeightageViewProps) => {
  const data = getExamData(examId);

  if (!data) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 -ml-2">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
        </Button>
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
          <BarChart3 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h3 className="font-bold text-gray-700 text-lg">{examName}</h3>
          <p className="text-sm text-gray-500 mt-1">Subject weightage data coming soon</p>
          <p className="text-xs text-gray-400 mt-2 font-tamil">பாட எடை தரவு விரைவில் வரும்</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-4 md:p-5 text-white">
        <p className="text-indigo-200 text-xs font-medium uppercase tracking-wider">{examName}</p>
        <h3 className="text-xl md:text-2xl font-bold mt-1">Subject-Wise Weightage</h3>
        <p className="text-indigo-200 text-xs mt-1 font-tamil">பாட வாரியான முக்கியத்துவம்</p>

        <div className="flex gap-3 mt-4">
          {[
            { val: data.totalMarks, label: 'Total Marks' },
            { val: data.totalQuestions, label: 'Questions' },
            { val: data.duration, label: 'Duration' },
          ].map((s, i) => (
            <div key={i} className="bg-white/15 backdrop-blur rounded-xl px-3 py-2 text-center border border-white/20 flex-1">
              <div className="text-base font-bold">{s.val}</div>
              <div className="text-xs text-white/70 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Cards */}
      <div className="space-y-3">
        {data.subjects.map((subject, i) => {
          const percentage = Math.round((subject.marks / data.totalMarks) * 100);
          return (
            <button
              key={subject.name}
              onClick={() => onSelectSubject(subject.name)}
              className={cn(
                "w-full text-left p-4 rounded-xl border-2 transition-all",
                "hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]",
                subject.bgColor, `${subject.bgColor.replace('bg-', 'border-').replace('-50', '-200')}`
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-2xl mt-0.5">{subject.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={cn("font-bold text-base", subject.color)}>{subject.name}</span>
                      <Badge className={cn("text-[10px] border-0", importanceBadge(subject.importance))}>
                        {subject.importance}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-600">
                      <span>{subject.marks} marks</span>
                      <span>•</span>
                      <span>{subject.questions} questions</span>
                      <span>•</span>
                      <span className="font-semibold">{percentage}%</span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-white rounded-full mt-2 overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full transition-all", subject.color.replace('text-', 'bg-'))}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    {/* Key Topics */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {subject.keyTopics.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] bg-white/80 rounded-full px-2 py-0.5 text-gray-600">{t}</span>
                      ))}
                      {subject.keyTopics.length > 4 && (
                        <span className="text-[10px] text-gray-400">+{subject.keyTopics.length - 4} more</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-gray-300 mt-2">→</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tips */}
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
        <h4 className="font-bold text-amber-800 text-sm flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4" /> Preparation Tips
        </h4>
        <ul className="space-y-1.5">
          {data.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-amber-700">
              <span className="text-amber-500 mt-0.5">✅</span> {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
