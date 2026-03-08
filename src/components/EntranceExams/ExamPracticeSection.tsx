import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, ChevronDown, ChevronUp, BarChart3, 
  Target, Flame, Sparkles 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuestionViewer } from '@/components/PreviousYearQuestions/QuestionViewer';
import { TopicWiseView } from '@/components/PreviousYearQuestions/TopicWiseView';
import { SubjectWeightageView } from '@/components/PreviousYearQuestions/SubjectWeightageView';

const examIdToPyqMap: Record<string, string> = {
  'jee-main': 'jee-main', 'jee-advanced': 'jee-advanced',
  'neet-ug': 'neet', 'bitsat': 'bitsat', 'viteee': 'viteee',
  'srmjeee': 'srmjeee', 'mht-cet': 'mht-cet',
  'comedk': 'comedk', 'wb-jee': 'wb-jee',
};

const examsWithQuestions = ['jee-main', 'neet'];
const examsWithTopicData = ['jee-main', 'jee-advanced', 'neet', 'bitsat', 'viteee', 'mht-cet', 'comedk', 'wb-jee'];

const examSubjects: Record<string, string[]> = {
  'jee-main': ['Physics', 'Chemistry', 'Mathematics'],
  'jee-advanced': ['Physics', 'Chemistry', 'Mathematics'],
  'neet': ['Physics', 'Chemistry', 'Biology'],
  'bitsat': ['Physics', 'Chemistry', 'Mathematics'],
  'viteee': ['Physics', 'Chemistry', 'Mathematics'],
  'srmjeee': ['Physics', 'Chemistry', 'Mathematics'],
  'mht-cet': ['Mathematics', 'Physics', 'Chemistry'],
  'comedk': ['Physics', 'Chemistry', 'Mathematics'],
  'wb-jee': ['Physics', 'Chemistry', 'Mathematics'],
};

interface ExamPracticeSectionProps {
  examId: string;
  examName: string;
}

type PracticeView = 'menu' | 'subject-pick' | 'topics' | 'questions' | 'weightage';

export const ExamPracticeSection = ({ examId, examName }: ExamPracticeSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState<PracticeView>('menu');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  const pyqId = examIdToPyqMap[examId] || examId;
  const hasQuestions = examsWithQuestions.includes(pyqId);
  const hasTopicData = examsWithTopicData.includes(pyqId);
  const subjects = examSubjects[pyqId] || [];

  if (!hasQuestions && !hasTopicData) return null;

  const resetToMenu = () => { setActiveView('menu'); setSelectedSubject(''); setSelectedTopic(''); };

  const icon = (s: string) => s === 'Physics' ? '⚡' : s === 'Chemistry' ? '🧪' : s === 'Mathematics' ? '📐' : s === 'Biology' ? '🧬' : '📖';

  return (
    <div className="border-t border-dashed border-[#C8E6C9] pt-3 mt-3">
      {/* Toggle */}
      <button
        onClick={() => { setIsOpen(!isOpen); if (!isOpen) resetToMenu(); }}
        className={cn(
          "w-full flex items-center justify-between p-3 rounded-xl text-left transition-all",
          isOpen ? "bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200" 
                 : "bg-gradient-to-r from-gray-50 to-gray-100 hover:from-indigo-50 hover:to-purple-50 border border-gray-200 hover:border-indigo-200"
        )}
      >
        <div className="flex items-center gap-2.5">
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", isOpen ? "bg-indigo-500 text-white" : "bg-indigo-100 text-indigo-600")}>
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-sm text-gray-800">📝 Practice & Preparation</div>
            <div className="text-[10px] text-gray-500">{hasQuestions ? 'PYQ Questions • ' : ''}Topic Analysis • Weightage</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isOpen && hasQuestions && (
            <Badge className="bg-emerald-100 text-emerald-700 text-[10px] border-0"><Sparkles className="w-3 h-3 mr-0.5" /> Practice</Badge>
          )}
          {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-3">
          {/* MENU */}
          {activeView === 'menu' && (
            <div className="space-y-3">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {subjects.map((s) => (
                  <div key={s} className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 border border-gray-100 text-xs font-medium text-gray-700 flex-shrink-0">
                    <span>{icon(s)}</span> {s}
                  </div>
                ))}
              </div>
              {hasQuestions && (
                <Button onClick={() => setActiveView('subject-pick')} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-5 rounded-xl shadow-md text-sm">
                  <Target className="w-4 h-4 mr-2" /> Practice Previous Year Questions
                </Button>
              )}
              <div className="grid grid-cols-2 gap-2">
                {hasTopicData && (
                  <Button variant="outline" onClick={() => setActiveView('weightage')} className="border-purple-200 text-purple-700 hover:bg-purple-50 py-4 rounded-xl text-xs">
                    <BarChart3 className="w-3.5 h-3.5 mr-1" /> Subject Weightage
                  </Button>
                )}
                {hasTopicData && (
                  <Button variant="outline" onClick={() => setActiveView('subject-pick')} className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 py-4 rounded-xl text-xs">
                    <Flame className="w-3.5 h-3.5 mr-1" /> Topic Analysis
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* SUBJECT PICKER */}
          {activeView === 'subject-pick' && (
            <div>
              <button onClick={resetToMenu} className="flex items-center gap-1 text-xs text-indigo-600 font-medium mb-3 hover:text-indigo-800">← Back</button>
              <p className="text-xs text-gray-500 font-medium mb-2">Choose a subject:</p>
              <div className="space-y-2">
                {subjects.map((subject) => (
                  <button key={subject} onClick={() => { setSelectedSubject(subject); setActiveView('topics'); }}
                    className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all text-left">
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{icon(subject)}</span>
                      <span className="font-medium text-sm text-gray-800">{subject}</span>
                    </div>
                    <span className="text-indigo-500 text-xs font-medium">View →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TOPIC-WISE VIEW */}
          {activeView === 'topics' && selectedSubject && (
            <TopicWiseView
              examId={pyqId}
              examName={examName}
              subject={selectedSubject}
              onBack={() => { setActiveView('subject-pick'); setSelectedSubject(''); }}
              onViewQuestions={hasQuestions ? (topicName: string) => { setSelectedTopic(topicName); setActiveView('questions'); } : undefined}
            />
          )}

          {/* QUESTION VIEWER */}
          {activeView === 'questions' && selectedSubject && selectedTopic && (
            <QuestionViewer
              examId={pyqId}
              examName={examName}
              subject={selectedSubject}
              topicName={selectedTopic}
              onBack={() => { setActiveView('topics'); setSelectedTopic(''); }}
            />
          )}

          {/* SUBJECT WEIGHTAGE */}
          {activeView === 'weightage' && (
            <SubjectWeightageView
              examId={pyqId}
              examName={examName}
              onBack={resetToMenu}
              onSelectSubject={(subject: string) => { setSelectedSubject(subject); setActiveView('topics'); }}
            />
          )}
        </div>
      )}
    </div>
  );
};
