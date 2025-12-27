import { useState, useMemo } from 'react';
import { Timer, Shuffle, BookOpen, Play, Settings } from 'lucide-react';
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

  // Reset topic when subject changes
  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    setSelectedTopic('all');
  };

  // Get available questions based on filters - must be before early return
  const availableQuestions = useMemo(() => {
    if (!exam) return [];
    return pyqQuestions.filter(q => {
      const matchesExam = q.examId === exam.id;
      const matchesYear = selectedYear === 'all' || q.year.toString() === selectedYear;
      const matchesSubject = selectedSubject === 'all' || q.subject === selectedSubject;
      const matchesTopic = selectedTopic === 'all' || q.topic === selectedTopic;
      const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
      return matchesExam && matchesYear && matchesSubject && matchesTopic && matchesDifficulty;
    });
  }, [exam?.id, selectedYear, selectedSubject, selectedTopic, selectedDifficulty]);

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

  const sortedYears = [...exam.years].sort((a, b) => b - a);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-primary" />
            Configure Mock Test
          </DialogTitle>
          <DialogDescription>
            Customize your {exam.name.en} mock test settings
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
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
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
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
      </DialogContent>
    </Dialog>
  );
};

export default MockTestConfigDialog;
