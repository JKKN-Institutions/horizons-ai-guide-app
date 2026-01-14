import { useState } from 'react';
import { Eye, EyeOff, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PreviousQuestion } from '@/data/university-entrance-data';

interface PYQSectionProps {
  questions: PreviousQuestion[];
}

export const PYQSection = ({ questions }: PYQSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  if (questions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Previous year questions coming soon...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500 text-white';
      case 'Medium': return 'bg-amber-500 text-white';
      case 'Hard': return 'bg-red-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    setShowAnswer(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
      setSelectedOption(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowAnswer(false);
      setSelectedOption(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <div className="flex items-center gap-2">
          <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
            {currentQuestion.difficulty}
          </Badge>
          <Badge variant="outline">{currentQuestion.topic}</Badge>
        </div>
      </div>

      {/* Question Card */}
      <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
        <CardContent className="p-5">
          {/* Question */}
          <p className="text-foreground font-medium text-lg mb-5">
            Q{currentIndex + 1}. {currentQuestion.question}
          </p>

          {/* Options */}
          <div className="space-y-2 mb-5">
            {currentQuestion.options.map((option, idx) => {
              const isCorrect = idx === currentQuestion.correctAnswer;
              const isSelected = idx === selectedOption;
              
              let optionClass = 'border border-slate-200 dark:border-slate-700 hover:border-[#6a0dad] hover:bg-[#6a0dad]/5';
              
              if (showAnswer) {
                if (isCorrect) {
                  optionClass = 'border-2 border-green-500 bg-green-50 dark:bg-green-900/20';
                } else if (isSelected && !isCorrect) {
                  optionClass = 'border-2 border-red-500 bg-red-50 dark:bg-red-900/20';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  disabled={showAnswer}
                  className={`w-full text-left p-4 rounded-xl transition-all ${optionClass} ${showAnswer ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <span className="font-semibold text-muted-foreground mr-2">
                    ({String.fromCharCode(97 + idx)})
                  </span>
                  <span className="text-foreground">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Show/Hide Answer Button */}
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

          {/* Explanation */}
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
        <Button
          onClick={handleNext}
          disabled={currentIndex === questions.length - 1}
          className="gap-1 bg-[#6a0dad] hover:bg-[#5a0b9d]"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
