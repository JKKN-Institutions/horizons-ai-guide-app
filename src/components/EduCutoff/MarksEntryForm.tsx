import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { StudentGroup, MarksEntry, ArtsSubject, VocationalStream } from './types';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface MarksEntryFormProps {
  group: StudentGroup;
  onMarksChange: (marks: Record<string, number | null>) => void;
}

const artsSubjects: ArtsSubject[] = [
  { id: 'history', name: 'History', selected: false },
  { id: 'geography', name: 'Geography', selected: false },
  { id: 'political_science', name: 'Political Science', selected: false },
  { id: 'economics', name: 'Economics', selected: false },
  { id: 'sociology', name: 'Sociology', selected: false },
  { id: 'psychology', name: 'Psychology', selected: false },
  { id: 'philosophy', name: 'Philosophy', selected: false },
  { id: 'home_science', name: 'Home Science', selected: false },
  { id: 'fine_arts', name: 'Fine Arts', selected: false },
];

const vocationalStreams: VocationalStream[] = [
  { id: 'computer_science', name: 'Computer Science' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'automobile', name: 'Automobile' },
  { id: 'electrical', name: 'Electrical' },
  { id: 'agriculture', name: 'Agriculture' },
  { id: 'office_management', name: 'Office Management' },
  { id: 'nursing_assistant', name: 'Nursing Assistant' },
  { id: 'tourism_travel', name: 'Tourism & Travel' },
];

const getSubjectsForGroup = (group: StudentGroup): MarksEntry[] => {
  switch (group) {
    case 'pcm':
      return [
        { subject: 'Mathematics', marks: null, maxMarks: 100, icon: '📘' },
        { subject: 'Physics', marks: null, maxMarks: 100, icon: '📗' },
        { subject: 'Chemistry', marks: null, maxMarks: 100, icon: '📕' },
      ];
    case 'pcb':
      return [
        { subject: 'Physics', marks: null, maxMarks: 100, icon: '📗' },
        { subject: 'Chemistry', marks: null, maxMarks: 100, icon: '📕' },
        { subject: 'Biology', marks: null, maxMarks: 100, icon: '🧬' },
      ];
    case 'pcmb':
      return [
        { subject: 'Mathematics', marks: null, maxMarks: 100, icon: '📘' },
        { subject: 'Physics', marks: null, maxMarks: 100, icon: '📗' },
        { subject: 'Chemistry', marks: null, maxMarks: 100, icon: '📕' },
        { subject: 'Biology', marks: null, maxMarks: 100, icon: '🧬' },
      ];
    case 'commerce':
      return [
        { subject: 'Accountancy', marks: null, maxMarks: 100, icon: '📊' },
        { subject: 'Business Studies', marks: null, maxMarks: 100, icon: '📈' },
        { subject: 'Economics', marks: null, maxMarks: 100, icon: '📉' },
      ];
    default:
      return [];
  }
};

const getEligibleCoursesText = (group: StudentGroup): string => {
  switch (group) {
    case 'pcm':
      return 'Engineering (B.E/B.Tech), B.Sc Physics/Chemistry/Maths, BCA, B.Arch, Pilot Training, Merchant Navy, Defence, NDA';
    case 'pcb':
      return 'MBBS, BDS, BAMS, BHMS, B.Pharm, B.Sc Nursing, Physiotherapy, MLT, B.Sc Agriculture, Veterinary, Biotechnology';
    case 'pcmb':
      return 'All Engineering + Medical courses, B.Sc (All Sciences), Agriculture, Biotechnology, Research';
    case 'commerce':
      return 'B.Com, BBA, BCA, CA Foundation, CS, CMA, Banking, B.Sc Statistics, Economics Honours, Hotel Management';
    case 'arts':
      return 'BA (All Subjects), BSW, B.Ed, LLB, Journalism, Mass Communication, Public Administration, Library Science, Tourism';
    case 'vocational':
      return 'Diploma Engineering, Polytechnic, ITI, B.Voc, Skill Development Programs, Apprenticeship, Direct B.E (Lateral Entry)';
    default:
      return '';
  }
};

export const MarksEntryForm = ({ group, onMarksChange }: MarksEntryFormProps) => {
  const [marks, setMarks] = useState<Record<string, number | null>>({});
  const [neetScore, setNeetScore] = useState<number | null>(null);
  const [languageMarks, setLanguageMarks] = useState<Record<string, number | null>>({});
  const [selectedArtsSubjects, setSelectedArtsSubjects] = useState<string[]>([]);
  const [artsMarks, setArtsMarks] = useState<Record<string, number | null>>({});
  const [vocationalStream, setVocationalStream] = useState<string>('');
  const [vocationalMarks, setVocationalMarks] = useState<Record<string, number | null>>({});

  const subjects = getSubjectsForGroup(group);

  useEffect(() => {
    // Reset marks when group changes
    setMarks({});
    setNeetScore(null);
    setLanguageMarks({});
    setSelectedArtsSubjects([]);
    setArtsMarks({});
    setVocationalStream('');
    setVocationalMarks({});
  }, [group]);

  useEffect(() => {
    const allMarks: Record<string, number | null> = {
      ...marks,
      ...languageMarks,
      ...artsMarks,
      ...vocationalMarks,
    };
    if (neetScore !== null) {
      allMarks.neet = neetScore;
    }
    onMarksChange(allMarks);
  }, [marks, neetScore, languageMarks, artsMarks, vocationalMarks, onMarksChange]);

  const handleMarkChange = (subject: string, value: string) => {
    const numValue = value === '' ? null : Math.min(100, Math.max(0, parseInt(value) || 0));
    setMarks(prev => ({ ...prev, [subject]: numValue }));
  };

  const handleLanguageChange = (subject: string, value: string) => {
    const numValue = value === '' ? null : Math.min(100, Math.max(0, parseInt(value) || 0));
    setLanguageMarks(prev => ({ ...prev, [subject]: numValue }));
  };

  const handleArtsSubjectToggle = (subjectId: string) => {
    setSelectedArtsSubjects(prev => {
      if (prev.includes(subjectId)) {
        return prev.filter(id => id !== subjectId);
      }
      if (prev.length < 4) {
        return [...prev, subjectId];
      }
      return prev;
    });
  };

  const handleArtsMarkChange = (subject: string, value: string) => {
    const numValue = value === '' ? null : Math.min(100, Math.max(0, parseInt(value) || 0));
    setArtsMarks(prev => ({ ...prev, [subject]: numValue }));
  };

  const handleVocationalMarkChange = (field: string, value: string) => {
    const numValue = value === '' ? null : Math.min(100, Math.max(0, parseInt(value) || 0));
    setVocationalMarks(prev => ({ ...prev, [field]: numValue }));
  };

  const isValidMark = (value: number | null) => value !== null && value >= 0 && value <= 100;

  const renderInput = (
    label: string,
    icon: string,
    value: number | null,
    onChange: (value: string) => void,
    maxMarks: number = 100
  ) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium flex items-center gap-2">
        <span>{icon}</span> {label}
      </Label>
      <div className="relative">
        <Input
          type="number"
          min={0}
          max={maxMarks}
          placeholder={`/${maxMarks}`}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'text-lg font-semibold pr-10',
            value !== null && (isValidMark(value) ? 'border-green-500' : 'border-red-500')
          )}
        />
        {value !== null && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isValidMark(value) ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (group === 'arts') {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6 animate-fade-in">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            📝 Step 2: Enter Your 12th Marks (Arts/Humanities)
          </h3>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-3 block">SELECT YOUR SUBJECTS (Choose 3-4)</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {artsSubjects.map((subject) => (
                <div key={subject.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={subject.id}
                    checked={selectedArtsSubjects.includes(subject.id)}
                    onCheckedChange={() => handleArtsSubjectToggle(subject.id)}
                    disabled={!selectedArtsSubjects.includes(subject.id) && selectedArtsSubjects.length >= 4}
                  />
                  <label
                    htmlFor={subject.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {subject.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {selectedArtsSubjects.length > 0 && (
            <div>
              <Label className="text-sm font-medium mb-3 block">ENTER MARKS FOR SELECTED SUBJECTS:</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedArtsSubjects.map((subjectId) => {
                  const subject = artsSubjects.find(s => s.id === subjectId);
                  return subject ? (
                    <div key={subjectId}>
                      {renderInput(
                        subject.name,
                        '📜',
                        artsMarks[subjectId] ?? null,
                        (v) => handleArtsMarkChange(subjectId, v)
                      )}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-pink-50 rounded-lg">
          <p className="text-sm text-pink-800">
            <strong>ELIGIBLE COURSES:</strong> {getEligibleCoursesText(group)}
          </p>
        </div>
      </div>
    );
  }

  if (group === 'vocational') {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6 animate-fade-in">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            📝 Step 2: Enter Your 12th Marks (Vocational)
          </h3>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-3 block">SELECT YOUR VOCATIONAL STREAM:</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {vocationalStreams.map((stream) => (
                <label
                  key={stream.id}
                  className={cn(
                    'flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all',
                    vocationalStream === stream.id
                      ? 'border-gray-600 bg-gray-100'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <input
                    type="radio"
                    name="vocational_stream"
                    value={stream.id}
                    checked={vocationalStream === stream.id}
                    onChange={(e) => setVocationalStream(e.target.value)}
                    className="sr-only"
                  />
                  <span className={cn(
                    'w-4 h-4 rounded-full border-2',
                    vocationalStream === stream.id
                      ? 'border-gray-600 bg-gray-600'
                      : 'border-gray-300'
                  )} />
                  <span className="text-sm">{stream.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">ENTER YOUR MARKS:</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {renderInput(
                'Theory',
                '📚',
                vocationalMarks.theory ?? null,
                (v) => handleVocationalMarkChange('theory', v)
              )}
              {renderInput(
                'Practical',
                '🔧',
                vocationalMarks.practical ?? null,
                (v) => handleVocationalMarkChange('practical', v)
              )}
              {renderInput(
                'Overall %',
                '📊',
                vocationalMarks.overall ?? null,
                (v) => handleVocationalMarkChange('overall', v)
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-800">
            <strong>ELIGIBLE COURSES:</strong> {getEligibleCoursesText(group)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 animate-fade-in">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          📝 Step 2: Enter Your 12th Marks ({group.toUpperCase()})
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">CORE SUBJECTS</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {subjects.map((subject) => (
              <div key={subject.subject}>
                {renderInput(
                  subject.subject,
                  subject.icon,
                  marks[subject.subject] ?? null,
                  (v) => handleMarkChange(subject.subject, v),
                  subject.maxMarks
                )}
              </div>
            ))}
          </div>
        </div>

        {(group === 'pcm' || group === 'pcmb') && (
          <div>
            <Label className="text-sm font-medium text-gray-500 mb-3 block">
              LANGUAGE SUBJECTS (Optional - for University Cutoff)
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderInput(
                'Tamil/Hindi',
                '📙',
                languageMarks.tamil ?? null,
                (v) => handleLanguageChange('tamil', v)
              )}
              {renderInput(
                'English',
                '📓',
                languageMarks.english ?? null,
                (v) => handleLanguageChange('english', v)
              )}
            </div>
          </div>
        )}

        {(group === 'pcb' || group === 'pcmb') && (
          <div>
            <Label className="text-sm font-medium text-gray-500 mb-3 block">
              NEET SCORE (For Medical Admissions)
            </Label>
            <div className="max-w-xs">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <span>🏥</span> NEET Score (If appeared)
                </Label>
                <Input
                  type="number"
                  min={0}
                  max={720}
                  placeholder="/720"
                  value={neetScore ?? ''}
                  onChange={(e) => {
                    const val = e.target.value === '' ? null : Math.min(720, Math.max(0, parseInt(e.target.value) || 0));
                    setNeetScore(val);
                  }}
                  className="text-lg font-semibold"
                />
              </div>
            </div>
          </div>
        )}

        {group === 'commerce' && (
          <div>
            <Label className="text-sm font-medium text-gray-500 mb-3 block">
              OPTIONAL (If applicable)
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderInput(
                'Commerce/Maths',
                '📘',
                marks.commerce_maths ?? null,
                (v) => handleMarkChange('commerce_maths', v)
              )}
              {renderInput(
                'Computer Science',
                '📓',
                marks.computer_science ?? null,
                (v) => handleMarkChange('computer_science', v)
              )}
            </div>
          </div>
        )}
      </div>

      <div className={cn(
        'mt-6 p-4 rounded-lg',
        group === 'pcm' ? 'bg-blue-50' :
        group === 'pcb' ? 'bg-green-50' :
        group === 'pcmb' ? 'bg-purple-50' :
        group === 'commerce' ? 'bg-orange-50' : 'bg-gray-50'
      )}>
        <p className={cn(
          'text-sm',
          group === 'pcm' ? 'text-blue-800' :
          group === 'pcb' ? 'text-green-800' :
          group === 'pcmb' ? 'text-purple-800' :
          group === 'commerce' ? 'text-orange-800' : 'text-gray-800'
        )}>
          <strong>ELIGIBLE COURSES:</strong> {getEligibleCoursesText(group)}
        </p>
      </div>
    </div>
  );
};
