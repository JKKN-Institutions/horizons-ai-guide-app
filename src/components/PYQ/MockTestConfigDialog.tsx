import { useState, useMemo } from 'react';
import { Timer, Shuffle, Play, Settings, RotateCcw, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PYQExam, PYQQuestion, pyqQuestions } from '@/data/pyq-database';

interface MockTestConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exam: PYQExam | null;
  onStartTest: (questions: PYQQuestion[], duration: number) => void;
}

export const MockTestConfigDialog = ({
  open,
  onOpenChange,
  exam,
  onStartTest,
}: MockTestConfigDialogProps) => {
  const [questionCount, setQuestionCount] = useState(30);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [shuffleQuestions, setShuffleQuestions] = useState(true);
  const [timeMultiplier, setTimeMultiplier] = useState(1);

  // Get available topics based on selected subject - must be before early return
  const availableTopics = useMemo(() => {
    if (!exam) return [];
    const topics = pyqQuestions
      .filter(q => {
        const matchesExam = q.examId === exam.id;
        const matchesSubject = selectedSubject === 'all' || q.subject === selectedSubject;
        return matchesExam && matchesSubject;
      })
      .map(q => q.topic)
      .filter((topic, index, self) => topic && self.indexOf(topic) === index)
      .sort();
    return topics;
  }, [exam?.id, selectedSubject]);

  // Get available subtopics based on selected topic - must be before early return
  const availableSubtopics = useMemo(() => {
    if (!exam) return [];
    const subtopics = pyqQuestions
      .filter(q => {
        const matchesExam = q.examId === exam.id;
        const matchesSubject = selectedSubject === 'all' || q.subject === selectedSubject;
        const matchesTopic = selectedTopic === 'all' || q.topic === selectedTopic;
        return matchesExam && matchesSubject && matchesTopic;
      })
      .map(q => q.subtopic)
      .filter((subtopic, index, self) => subtopic && self.indexOf(subtopic) === index)
      .sort();
    return subtopics;
  }, [exam?.id, selectedSubject, selectedTopic]);

  // Reset topic and subtopic when subject changes
  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    setSelectedTopic('all');
    setSelectedSubtopic('all');
  };

  // Reset subtopic when topic changes
  const handleTopicChange = (value: string) => {
    setSelectedTopic(value);
    setSelectedSubtopic('all');
  };

  // Get available questions based on filters - must be before early return
  const availableQuestions = useMemo(() => {
    if (!exam) return [];
    return pyqQuestions.filter(q => {
      const matchesExam = q.examId === exam.id;
      const matchesYear = selectedYear === 'all' || q.year.toString() === selectedYear;
      const matchesSubject = selectedSubject === 'all' || q.subject === selectedSubject;
      const matchesTopic = selectedTopic === 'all' || q.topic === selectedTopic;
      const matchesSubtopic = selectedSubtopic === 'all' || q.subtopic === selectedSubtopic;
      const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
      return matchesExam && matchesYear && matchesSubject && matchesTopic && matchesSubtopic && matchesDifficulty;
    });
  }, [exam?.id, selectedYear, selectedSubject, selectedTopic, selectedSubtopic, selectedDifficulty]);

  if (!exam) return null;

  const maxQuestions = Math.min(availableQuestions.length, 100);
  const adjustedQuestionCount = Math.min(questionCount, maxQuestions);
  
  // Calculate test duration (2 mins per question * multiplier)
  const baseDuration = Math.ceil(adjustedQuestionCount * 2);
  const testDuration = Math.ceil(baseDuration * timeMultiplier);

  const handleStartTest = () => {
    let selectedQuestions = [...availableQuestions];
    
    if (shuffleQuestions) {
      selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5);
    }
    
    selectedQuestions = selectedQuestions.slice(0, adjustedQuestionCount);
    
    onStartTest(selectedQuestions, testDuration);
    onOpenChange(false);
  };

  const handleResetFilters = () => {
    setSelectedYear('all');
    setSelectedSubject('all');
    setSelectedTopic('all');
    setSelectedSubtopic('all');
    setSelectedDifficulty('all');
  };

  const activeFilterCount = [
    selectedYear !== 'all',
    selectedSubject !== 'all',
    selectedTopic !== 'all',
    selectedSubtopic !== 'all',
    selectedDifficulty !== 'all'
  ].filter(Boolean).length;

  const hasActiveFilters = activeFilterCount > 0;

  const sortedYears = [...exam.years].sort((a, b) => b - a);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-primary" />
            Configure Mock Test
            {hasActiveFilters && (
              <Badge variant="default" className="ml-auto text-xs">
                {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Customize your {exam.name.en} mock test settings
          </DialogDescription>
        </DialogHeader>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 items-center flex-shrink-0">
            {selectedYear !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1 pr-1">
                Year: {selectedYear}
                <button 
                  onClick={() => setSelectedYear('all')}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedSubject !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1 pr-1">
                {selectedSubject}
                <button 
                  onClick={() => handleSubjectChange('all')}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedTopic !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1 pr-1">
                {selectedTopic}
                <button 
                  onClick={() => handleTopicChange('all')}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedSubtopic !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1 pr-1">
                {selectedSubtopic}
                <button 
                  onClick={() => setSelectedSubtopic('all')}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedDifficulty !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1 pr-1">
                {selectedDifficulty}
                <button 
                  onClick={() => setSelectedDifficulty('all')}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleResetFilters}
              className="h-6 px-2 text-xs"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Clear All
            </Button>
          </div>
        )}

        <ScrollArea className="flex-1 max-h-[60vh] pr-4">
          <div className="space-y-6 py-2">
          {/* Year Selection */}
          <div className="space-y-2">
            <Label>Year</Label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {sortedYears.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject Selection */}
          <div className="space-y-2">
            <Label>Subject</Label>
            <Select value={selectedSubject} onValueChange={handleSubjectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {exam.subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Topic Selection */}
          <div className="space-y-2">
            <Label>Topic</Label>
            <Select value={selectedTopic} onValueChange={handleTopicChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                {availableTopics.map(topic => (
                  <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subtopic Selection */}
          <div className="space-y-2">
            <Label>Subtopic</Label>
            <Select value={selectedSubtopic} onValueChange={setSelectedSubtopic}>
              <SelectTrigger>
                <SelectValue placeholder="Select subtopic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subtopics</SelectItem>
                {availableSubtopics.map(subtopic => (
                  <SelectItem key={subtopic} value={subtopic}>{subtopic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-2">
            <Label>Difficulty Level</Label>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Question Count */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Number of Questions</Label>
              <Badge variant="secondary">{adjustedQuestionCount} questions</Badge>
            </div>
            <Slider
              value={[adjustedQuestionCount]}
              onValueChange={([val]) => setQuestionCount(val)}
              min={5}
              max={maxQuestions}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              {availableQuestions.length} questions available with current filters
            </p>
          </div>

          {/* Time Multiplier */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Time Limit</Label>
              <Badge variant="secondary">{testDuration} mins</Badge>
            </div>
            <Slider
              value={[timeMultiplier]}
              onValueChange={([val]) => setTimeMultiplier(val)}
              min={0.5}
              max={2}
              step={0.25}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              {timeMultiplier < 1 ? 'Less time (harder)' : timeMultiplier > 1 ? 'More time (easier)' : 'Standard time'} 
              {' • '}{Math.round(testDuration / adjustedQuestionCount * 60)}s per question
            </p>
          </div>

          {/* Shuffle Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Shuffle className="w-4 h-4" />
                Shuffle Questions
              </Label>
              <p className="text-xs text-muted-foreground">Randomize question order</p>
            </div>
            <Switch checked={shuffleQuestions} onCheckedChange={setShuffleQuestions} />
          </div>

          {/* Test Summary */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Test Summary
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Questions: <strong>{adjustedQuestionCount}</strong></div>
              <div>Duration: <strong>{testDuration} mins</strong></div>
              <div>Max Marks: <strong>{adjustedQuestionCount * 4}</strong></div>
              <div>Negative: <strong>-1 per wrong</strong></div>
            </div>
          </div>

          {/* Start Button */}
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleStartTest}
            disabled={availableQuestions.length < 5}
          >
            <Play className="w-4 h-4 mr-2" />
            Start Mock Test
          </Button>
          
          {availableQuestions.length < 5 && (
            <p className="text-xs text-destructive text-center">
              Need at least 5 questions to start a test. Try adjusting filters.
            </p>
          )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MockTestConfigDialog;
