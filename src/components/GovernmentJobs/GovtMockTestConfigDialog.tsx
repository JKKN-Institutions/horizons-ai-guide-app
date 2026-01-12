import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  Play, BookOpen, ChevronDown, Target, Filter, X, Check, Sparkles
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { CategoryType } from './types';
import { categoryInfo } from './governmentExamsData';

// Syllabus structure for each category
export interface Topic {
  id: string;
  name: string;
  nameTamil: string;
  subtopics?: string[];
}

export interface Subject {
  id: string;
  name: string;
  nameTamil: string;
  topics: Topic[];
}

export interface CategorySyllabus {
  category: CategoryType;
  subjects: Subject[];
}

// Default syllabus data - can be expanded
export const govtExamSyllabus: CategorySyllabus[] = [
  {
    category: 'defence',
    subjects: [
      {
        id: 'gk',
        name: 'General Knowledge',
        nameTamil: 'பொது அறிவு',
        topics: [
          { id: 'current-affairs', name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்' },
          { id: 'indian-history', name: 'Indian History', nameTamil: 'இந்திய வரலாறு' },
          { id: 'geography', name: 'Geography', nameTamil: 'புவியியல்' },
          { id: 'indian-polity', name: 'Indian Polity', nameTamil: 'இந்திய அரசியல்' },
          { id: 'defence-forces', name: 'Defence Forces', nameTamil: 'பாதுகாப்புப் படைகள்' },
        ],
      },
      {
        id: 'math',
        name: 'Mathematics',
        nameTamil: 'கணிதம்',
        topics: [
          { id: 'arithmetic', name: 'Arithmetic', nameTamil: 'எண்கணிதம்' },
          { id: 'algebra', name: 'Algebra', nameTamil: 'இயற்கணிதம்' },
          { id: 'geometry', name: 'Geometry', nameTamil: 'வடிவியல்' },
          { id: 'trigonometry', name: 'Trigonometry', nameTamil: 'முக்கோணவியல்' },
        ],
      },
      {
        id: 'reasoning',
        name: 'Reasoning',
        nameTamil: 'தர்க்கம்',
        topics: [
          { id: 'verbal-reasoning', name: 'Verbal Reasoning', nameTamil: 'சொல் தர்க்கம்' },
          { id: 'non-verbal', name: 'Non-Verbal Reasoning', nameTamil: 'சொல்லாத தர்க்கம்' },
        ],
      },
    ],
  },
  {
    category: 'railway',
    subjects: [
      {
        id: 'gk',
        name: 'General Knowledge',
        nameTamil: 'பொது அறிவு',
        topics: [
          { id: 'current-affairs', name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்' },
          { id: 'indian-railways', name: 'Indian Railways', nameTamil: 'இந்திய ரயில்வே' },
          { id: 'indian-history', name: 'Indian History', nameTamil: 'இந்திய வரலாறு' },
          { id: 'geography', name: 'Geography', nameTamil: 'புவியியல்' },
        ],
      },
      {
        id: 'math',
        name: 'Mathematics',
        nameTamil: 'கணிதம்',
        topics: [
          { id: 'number-system', name: 'Number System', nameTamil: 'எண் முறை' },
          { id: 'percentage', name: 'Percentage', nameTamil: 'சதவீதம்' },
          { id: 'time-work', name: 'Time & Work', nameTamil: 'நேரம் & வேலை' },
          { id: 'ratio-proportion', name: 'Ratio & Proportion', nameTamil: 'விகிதம் & விகிதாசாரம்' },
        ],
      },
      {
        id: 'reasoning',
        name: 'Reasoning',
        nameTamil: 'தர்க்கம்',
        topics: [
          { id: 'analogies', name: 'Analogies', nameTamil: 'ஒப்புமைகள்' },
          { id: 'coding-decoding', name: 'Coding-Decoding', nameTamil: 'குறியாக்கம்' },
          { id: 'series', name: 'Series', nameTamil: 'தொடர்' },
        ],
      },
    ],
  },
  {
    category: 'ssc',
    subjects: [
      {
        id: 'gk',
        name: 'General Knowledge',
        nameTamil: 'பொது அறிவு',
        topics: [
          { id: 'current-affairs', name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்' },
          { id: 'indian-polity', name: 'Indian Polity', nameTamil: 'இந்திய அரசியல்' },
          { id: 'economics', name: 'Economics', nameTamil: 'பொருளாதாரம்' },
          { id: 'science', name: 'General Science', nameTamil: 'பொது அறிவியல்' },
        ],
      },
      {
        id: 'english',
        name: 'English',
        nameTamil: 'ஆங்கிலம்',
        topics: [
          { id: 'grammar', name: 'Grammar', nameTamil: 'இலக்கணம்' },
          { id: 'vocabulary', name: 'Vocabulary', nameTamil: 'சொற்களஞ்சியம்' },
          { id: 'comprehension', name: 'Comprehension', nameTamil: 'படிப்பறிவு' },
        ],
      },
      {
        id: 'math',
        name: 'Quantitative Aptitude',
        nameTamil: 'அளவு திறன்',
        topics: [
          { id: 'arithmetic', name: 'Arithmetic', nameTamil: 'எண்கணிதம்' },
          { id: 'data-interpretation', name: 'Data Interpretation', nameTamil: 'தரவு விளக்கம்' },
          { id: 'algebra', name: 'Algebra', nameTamil: 'இயற்கணிதம்' },
        ],
      },
      {
        id: 'reasoning',
        name: 'Reasoning',
        nameTamil: 'தர்க்கம்',
        topics: [
          { id: 'verbal-reasoning', name: 'Verbal Reasoning', nameTamil: 'சொல் தர்க்கம்' },
          { id: 'non-verbal', name: 'Non-Verbal Reasoning', nameTamil: 'சொல்லாத தர்க்கம்' },
        ],
      },
    ],
  },
  {
    category: 'banking',
    subjects: [
      {
        id: 'gk',
        name: 'General/Banking Awareness',
        nameTamil: 'பொது/வங்கி விழிப்புணர்வு',
        topics: [
          { id: 'banking-terms', name: 'Banking Terms', nameTamil: 'வங்கி சொற்கள்' },
          { id: 'rbi', name: 'RBI & Monetary Policy', nameTamil: 'RBI & நாணயக் கொள்கை' },
          { id: 'current-affairs', name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்' },
          { id: 'financial-awareness', name: 'Financial Awareness', nameTamil: 'நிதி விழிப்புணர்வு' },
        ],
      },
      {
        id: 'english',
        name: 'English Language',
        nameTamil: 'ஆங்கில மொழி',
        topics: [
          { id: 'reading-comprehension', name: 'Reading Comprehension', nameTamil: 'படிப்பறிவு' },
          { id: 'cloze-test', name: 'Cloze Test', nameTamil: 'இடைவெளி சோதனை' },
          { id: 'error-spotting', name: 'Error Spotting', nameTamil: 'பிழை கண்டறிதல்' },
        ],
      },
      {
        id: 'quant',
        name: 'Quantitative Aptitude',
        nameTamil: 'அளவு திறன்',
        topics: [
          { id: 'simplification', name: 'Simplification', nameTamil: 'எளிமைப்படுத்தல்' },
          { id: 'number-series', name: 'Number Series', nameTamil: 'எண் தொடர்' },
          { id: 'data-interpretation', name: 'Data Interpretation', nameTamil: 'தரவு விளக்கம்' },
        ],
      },
      {
        id: 'reasoning',
        name: 'Reasoning Ability',
        nameTamil: 'தர்க்க திறன்',
        topics: [
          { id: 'puzzles', name: 'Puzzles', nameTamil: 'புதிர்கள்' },
          { id: 'seating-arrangement', name: 'Seating Arrangement', nameTamil: 'இருக்கை ஏற்பாடு' },
          { id: 'syllogism', name: 'Syllogism', nameTamil: 'முடிவு' },
        ],
      },
    ],
  },
  {
    category: 'state',
    subjects: [
      {
        id: 'gk',
        name: 'General Knowledge',
        nameTamil: 'பொது அறிவு',
        topics: [
          { id: 'tn-history', name: 'Tamil Nadu History', nameTamil: 'தமிழ்நாடு வரலாறு' },
          { id: 'tn-geography', name: 'Tamil Nadu Geography', nameTamil: 'தமிழ்நாடு புவியியல்' },
          { id: 'current-affairs', name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்' },
          { id: 'tn-polity', name: 'TN Administration', nameTamil: 'தமிழ்நாடு நிர்வாகம்' },
        ],
      },
      {
        id: 'tamil',
        name: 'Tamil Language',
        nameTamil: 'தமிழ் மொழி',
        topics: [
          { id: 'grammar', name: 'Tamil Grammar', nameTamil: 'தமிழ் இலக்கணம்' },
          { id: 'literature', name: 'Tamil Literature', nameTamil: 'தமிழ் இலக்கியம்' },
          { id: 'comprehension', name: 'Comprehension', nameTamil: 'படிப்பறிவு' },
        ],
      },
      {
        id: 'aptitude',
        name: 'Aptitude & Reasoning',
        nameTamil: 'திறன் & தர்க்கம்',
        topics: [
          { id: 'mental-ability', name: 'Mental Ability', nameTamil: 'மன திறன்' },
          { id: 'quantitative', name: 'Quantitative Aptitude', nameTamil: 'அளவு திறன்' },
        ],
      },
    ],
  },
  {
    category: 'central',
    subjects: [
      {
        id: 'gk',
        name: 'General Knowledge',
        nameTamil: 'பொது அறிவு',
        topics: [
          { id: 'current-affairs', name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்' },
          { id: 'indian-polity', name: 'Indian Polity', nameTamil: 'இந்திய அரசியல்' },
          { id: 'indian-history', name: 'Indian History', nameTamil: 'இந்திய வரலாறு' },
          { id: 'science', name: 'General Science', nameTamil: 'பொது அறிவியல்' },
        ],
      },
      {
        id: 'reasoning',
        name: 'Reasoning',
        nameTamil: 'தர்க்கம்',
        topics: [
          { id: 'verbal', name: 'Verbal Reasoning', nameTamil: 'சொல் தர்க்கம்' },
          { id: 'non-verbal', name: 'Non-Verbal', nameTamil: 'சொல்லாத தர்க்கம்' },
        ],
      },
      {
        id: 'english',
        name: 'English',
        nameTamil: 'ஆங்கிலம்',
        topics: [
          { id: 'grammar', name: 'Grammar', nameTamil: 'இலக்கணம்' },
          { id: 'vocabulary', name: 'Vocabulary', nameTamil: 'சொற்களஞ்சியம்' },
        ],
      },
    ],
  },
];

interface GovtMockTestConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: CategoryType | null;
  useAI: boolean;
  onStartTest: (selectedSubjects: string[], selectedTopics: string[]) => void;
}

export const GovtMockTestConfigDialog = ({
  open,
  onOpenChange,
  category,
  useAI,
  onStartTest,
}: GovtMockTestConfigDialogProps) => {
  const { language } = useLanguage();
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string>>(new Set());
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());
  const [difficulty, setDifficulty] = useState<string>('all');
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());

  const syllabus = useMemo(() => {
    return govtExamSyllabus.find(s => s.category === category);
  }, [category]);

  const info = category ? categoryInfo[category] : null;

  const toggleSubject = (subjectId: string) => {
    const newSelected = new Set(selectedSubjects);
    if (newSelected.has(subjectId)) {
      newSelected.delete(subjectId);
      // Also remove all topics from this subject
      const subject = syllabus?.subjects.find(s => s.id === subjectId);
      if (subject) {
        const newTopics = new Set(selectedTopics);
        subject.topics.forEach(t => newTopics.delete(t.id));
        setSelectedTopics(newTopics);
      }
    } else {
      newSelected.add(subjectId);
    }
    setSelectedSubjects(newSelected);
  };

  const toggleTopic = (topicId: string, subjectId: string) => {
    const newTopics = new Set(selectedTopics);
    if (newTopics.has(topicId)) {
      newTopics.delete(topicId);
    } else {
      newTopics.add(topicId);
      // Auto-select the parent subject
      if (!selectedSubjects.has(subjectId)) {
        setSelectedSubjects(prev => new Set(prev).add(subjectId));
      }
    }
    setSelectedTopics(newTopics);
  };

  const toggleExpandSubject = (subjectId: string) => {
    const newExpanded = new Set(expandedSubjects);
    if (newExpanded.has(subjectId)) {
      newExpanded.delete(subjectId);
    } else {
      newExpanded.add(subjectId);
    }
    setExpandedSubjects(newExpanded);
  };

  const selectAll = () => {
    if (!syllabus) return;
    const allSubjects = new Set(syllabus.subjects.map(s => s.id));
    const allTopics = new Set(syllabus.subjects.flatMap(s => s.topics.map(t => t.id)));
    setSelectedSubjects(allSubjects);
    setSelectedTopics(allTopics);
  };

  const clearAll = () => {
    setSelectedSubjects(new Set());
    setSelectedTopics(new Set());
  };

  const handleStartTest = () => {
    onStartTest(Array.from(selectedSubjects), Array.from(selectedTopics));
    onOpenChange(false);
  };

  const hasSelection = selectedSubjects.size > 0 || selectedTopics.size > 0;

  if (!category || !syllabus) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] flex flex-col bg-background">
        <DialogHeader className="pb-2">
          <DialogTitle className="flex items-center gap-3 text-lg">
            <div className={`p-2 rounded-lg ${info?.bgColor}`}>
              <BookOpen className="h-5 w-5" style={{ color: info?.borderColor?.replace('border-', '') }} />
            </div>
            <div>
              <span>{info?.label}</span>
              {useAI && (
                <Badge className="ml-2 bg-purple-100 text-purple-700 border-purple-200">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI
                </Badge>
              )}
            </div>
          </DialogTitle>
          <DialogDescription>
            {language === 'ta' 
              ? 'நீங்கள் பயிற்சி செய்ய விரும்பும் பாடங்களையும் தலைப்புகளையும் தேர்ந்தெடுக்கவும்'
              : 'Select the subjects and topics you want to practice'}
          </DialogDescription>
        </DialogHeader>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 py-2 border-b">
          <Button variant="outline" size="sm" onClick={selectAll} className="gap-1.5 text-xs">
            <Check className="h-3 w-3" />
            {language === 'ta' ? 'அனைத்தும்' : 'Select All'}
          </Button>
          {hasSelection && (
            <Button variant="ghost" size="sm" onClick={clearAll} className="gap-1.5 text-xs text-muted-foreground">
              <X className="h-3 w-3" />
              {language === 'ta' ? 'அழி' : 'Clear'}
            </Button>
          )}
          <div className="ml-auto flex items-center gap-2">
            <Label className="text-xs text-muted-foreground">
              {language === 'ta' ? 'கடினம்:' : 'Difficulty:'}
            </Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-[100px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="all">{language === 'ta' ? 'அனைத்தும்' : 'All'}</SelectItem>
                <SelectItem value="easy">{language === 'ta' ? 'எளிது' : 'Easy'}</SelectItem>
                <SelectItem value="medium">{language === 'ta' ? 'நடுத்தரம்' : 'Medium'}</SelectItem>
                <SelectItem value="hard">{language === 'ta' ? 'கடினம்' : 'Hard'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Subject & Topic Selection */}
        <ScrollArea className="flex-1 pr-4 -mr-4">
          <div className="space-y-3 py-3">
            {syllabus.subjects.map((subject) => (
              <Collapsible
                key={subject.id}
                open={expandedSubjects.has(subject.id)}
                onOpenChange={() => toggleExpandSubject(subject.id)}
              >
                <div className={`rounded-lg border transition-colors ${
                  selectedSubjects.has(subject.id) 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-muted-foreground/30'
                }`}>
                  <div className="flex items-center gap-3 p-3">
                    <Checkbox
                      id={subject.id}
                      checked={selectedSubjects.has(subject.id)}
                      onCheckedChange={() => toggleSubject(subject.id)}
                      className="data-[state=checked]:bg-primary"
                    />
                    <Label 
                      htmlFor={subject.id} 
                      className="flex-1 font-medium cursor-pointer"
                    >
                      {language === 'ta' ? subject.nameTamil : subject.name}
                    </Label>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          expandedSubjects.has(subject.id) ? 'rotate-180' : ''
                        }`} />
                      </Button>
                    </CollapsibleTrigger>
                  </div>

                  <CollapsibleContent>
                    <div className="px-3 pb-3 pt-1 border-t border-border/50">
                      <div className="grid grid-cols-2 gap-2">
                        {subject.topics.map((topic) => (
                          <motion.label
                            key={topic.id}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                              selectedTopics.has(topic.id)
                                ? 'bg-primary/10 text-primary'
                                : 'hover:bg-muted'
                            }`}
                          >
                            <Checkbox
                              checked={selectedTopics.has(topic.id)}
                              onCheckedChange={() => toggleTopic(topic.id, subject.id)}
                              className="h-4 w-4 data-[state=checked]:bg-primary"
                            />
                            <span className="text-sm">
                              {language === 'ta' ? topic.nameTamil : topic.name}
                            </span>
                          </motion.label>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>

        {/* Selection Summary & Start Button */}
        <div className="pt-3 border-t space-y-3">
          {hasSelection && (
            <div className="flex flex-wrap gap-1.5">
              {Array.from(selectedSubjects).slice(0, 3).map(id => {
                const subject = syllabus.subjects.find(s => s.id === id);
                return (
                  <Badge key={id} variant="secondary" className="gap-1 text-xs">
                    {language === 'ta' ? subject?.nameTamil : subject?.name}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => toggleSubject(id)}
                    />
                  </Badge>
                );
              })}
              {selectedSubjects.size > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{selectedSubjects.size - 3} {language === 'ta' ? 'மேலும்' : 'more'}
                </Badge>
              )}
            </div>
          )}

          <Button 
            onClick={handleStartTest} 
            className="w-full gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            disabled={!hasSelection}
          >
            <Play className="h-4 w-4" />
            {language === 'ta' 
              ? `மாக் டெஸ்ட் தொடங்கு${hasSelection ? ` (${selectedSubjects.size} பாடங்கள்)` : ''}`
              : `Start Mock Test${hasSelection ? ` (${selectedSubjects.size} subjects)` : ''}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
