import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Loader2, RefreshCw, CheckCircle, XCircle, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { universities } from '@/data/university-entrance-data';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  difficulty: string;
}

const TOPICS = [
  'Quantitative Aptitude',
  'Logical Reasoning',
  'Verbal Ability',
  'Data Interpretation',
  'General Awareness',
  'English Comprehension',
  'Computer Basics',
  'Current Affairs',
  'Analytical Skills',
  'Problem Solving',
];

export const AIQuestionGenerator = () => {
  const navigate = useNavigate();
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [topic, setTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, attempted: 0 });

  const university = universities.find(u => u.id === selectedUniversity);
  const courses = university?.courses || [];

  const generateQuestions = async () => {
    const finalTopic = topic === 'custom' ? customTopic : topic;
    
    if (!selectedUniversity || !selectedCourse || !finalTopic) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsGenerating(true);
    setQuestions([]);
    setCurrentIndex(0);
    setScore({ correct: 0, attempted: 0 });

    try {
      const { data, error } = await supabase.functions.invoke('generate-tn-questions', {
        body: {
          universityName: university?.name,
          courseName: courses.find(c => c.id === selectedCourse)?.name,
          topic: finalTopic,
          difficulty,
          count: questionCount,
        },
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.questions && Array.isArray(data.questions)) {
        setQuestions(data.questions);
        toast.success(`Generated ${data.questions.length} questions!`);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate questions');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (showAnswer) return;
    setSelectedOption(optionIndex);
    setShowAnswer(true);
    
    const isCorrect = optionIndex === questions[currentIndex].correctAnswer;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      attempted: prev.attempted + 1,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setSelectedOption(null);
      setShowAnswer(false);
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-lg mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <div className="text-center">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-[#6a0dad]" />
            AI Question Generator
          </h1>
          <p className="text-muted-foreground font-tamil">AI கேள்வி உருவாக்கி</p>
          <p className="text-sm text-muted-foreground mt-1">
            Generate fresh practice questions using AI
          </p>
        </div>

        {/* Configuration */}
        {questions.length === 0 && (
          <Card className="rounded-2xl">
            <CardContent className="p-5 space-y-4">
              <div className="space-y-2">
                <Label>University</Label>
                <Select value={selectedUniversity} onValueChange={(v) => { setSelectedUniversity(v); setSelectedCourse(''); }}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select university" />
                  </SelectTrigger>
                  <SelectContent>
                    {universities.map(uni => (
                      <SelectItem key={uni.id} value={uni.id}>{uni.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Course</Label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse} disabled={!selectedUniversity}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Topic</Label>
                <Select value={topic} onValueChange={setTopic}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {TOPICS.map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                    <SelectItem value="custom">Custom Topic...</SelectItem>
                  </SelectContent>
                </Select>
                {topic === 'custom' && (
                  <Input
                    placeholder="Enter custom topic"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    className="rounded-xl mt-2"
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select value={difficulty} onValueChange={(v) => setDifficulty(v as 'Easy' | 'Medium' | 'Hard')}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Questions</Label>
                  <Select value={questionCount.toString()} onValueChange={(v) => setQuestionCount(parseInt(v))}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[3, 5, 10].map(n => (
                        <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={generateQuestions} 
                className="w-full bg-[#6a0dad] hover:bg-[#5a0b9d] rounded-xl gap-2"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Questions
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isGenerating && (
          <Card className="rounded-2xl">
            <CardContent className="p-8 text-center">
              <Loader2 className="h-12 w-12 mx-auto animate-spin text-[#6a0dad] mb-4" />
              <p className="font-medium">Generating questions...</p>
              <p className="text-sm text-muted-foreground">This may take a few seconds</p>
            </CardContent>
          </Card>
        )}

        {/* Questions Display */}
        {questions.length > 0 && currentQuestion && (
          <>
            {/* Score Bar */}
            <div className="flex items-center justify-between bg-muted/50 p-3 rounded-xl">
              <span className="text-sm">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <Badge variant="outline" className="gap-1">
                Score: {score.correct}/{score.attempted}
              </Badge>
            </div>

            {/* Question Card */}
            <Card className="rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={
                    currentQuestion.difficulty === 'Easy' ? 'bg-green-500' :
                    currentQuestion.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-red-500'
                  }>
                    {currentQuestion.difficulty}
                  </Badge>
                  <Badge variant="outline">{currentQuestion.topic}</Badge>
                </div>

                <p className="text-foreground font-medium mb-5">{currentQuestion.question}</p>

                <div className="space-y-2 mb-5">
                  {currentQuestion.options.map((option, idx) => {
                    const isCorrect = idx === currentQuestion.correctAnswer;
                    const isSelected = idx === selectedOption;
                    
                    let optionClass = 'border border-slate-200 dark:border-slate-700 hover:border-[#6a0dad]';
                    
                    if (showAnswer) {
                      if (isCorrect) {
                        optionClass = 'border-2 border-green-500 bg-green-50 dark:bg-green-900/20';
                      } else if (isSelected && !isCorrect) {
                        optionClass = 'border-2 border-red-500 bg-red-50 dark:bg-red-900/20';
                      }
                    } else if (isSelected) {
                      optionClass = 'border-[#6a0dad] bg-[#6a0dad]/10';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(idx)}
                        disabled={showAnswer}
                        className={`w-full text-left p-4 rounded-xl transition-all ${optionClass}`}
                      >
                        <span className="font-semibold text-muted-foreground mr-2">
                          ({String.fromCharCode(97 + idx)})
                        </span>
                        {option}
                        {showAnswer && isCorrect && (
                          <CheckCircle className="inline h-4 w-4 ml-2 text-green-600" />
                        )}
                        {showAnswer && isSelected && !isCorrect && (
                          <XCircle className="inline h-4 w-4 ml-2 text-red-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {!showAnswer && (
                  <Button
                    variant="outline"
                    onClick={() => setShowAnswer(true)}
                    className="w-full"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Show Answer
                  </Button>
                )}

                {showAnswer && (
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-800 dark:text-green-300">
                      <span className="font-semibold">Answer: </span>
                      ({String.fromCharCode(97 + currentQuestion.correctAnswer)}) {currentQuestion.options[currentQuestion.correctAnswer]}
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-400 mt-2">
                      <span className="font-semibold">Explanation: </span>
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              {currentIndex === questions.length - 1 ? (
                <Button
                  onClick={() => {
                    setQuestions([]);
                    setCurrentIndex(0);
                    setScore({ correct: 0, attempted: 0 });
                  }}
                  className="gap-1 bg-[#6a0dad] hover:bg-[#5a0b9d]"
                >
                  <RefreshCw className="h-4 w-4" />
                  New Questions
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="gap-1 bg-[#6a0dad] hover:bg-[#5a0b9d]"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
