import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { getDailyQuiz, type QuizQuestion } from './data/quizData';
import { toast } from 'sonner';

interface MoneyMinuteQuizProps {
  onComplete: (score: number, total: number) => void;
}

export const MoneyMinuteQuiz = ({ onComplete }: MoneyMinuteQuizProps) => {
  const [questions] = useState<QuizQuestion[]>(() => getDailyQuiz(3));
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];

  const handleAnswer = (optionIndex: number) => {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);
    if (optionIndex === q.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
      const finalScore = selected === q.correctAnswer ? score + 0 : score; // score already updated
      onComplete(score, questions.length);
      toast.success(`Money Minute: ${score}/${questions.length} correct! +${score * 10} XP`);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <Card className="border-border/50">
        <CardContent className="p-6 text-center space-y-3">
          <Trophy className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-foreground">Money Minute Complete!</h3>
          <div className="text-3xl font-bold text-primary">{score}/{questions.length}</div>
          <p className="text-sm text-muted-foreground">
            {score === questions.length ? '🔥 Perfect! You\'re a financial wizard!' :
              score >= 2 ? '👏 Great job! Keep building your financial IQ.' :
                '📚 Keep learning — financial literacy is a superpower!'}
          </p>
          <Button variant="outline" size="sm" onClick={handleRestart}>
            <RotateCcw className="w-3 h-3 mr-1.5" /> Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-500" /> Money Minute Quiz
          </CardTitle>
          <Badge variant="secondary" className="text-[10px]">{currentQ + 1}/{questions.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Badge className="text-[10px] bg-primary/10 text-primary">{q.category}</Badge>
        <p className="text-sm font-medium text-foreground">{q.question}</p>

        <div className="space-y-2">
          {q.options.map((option, i) => {
            const isCorrect = i === q.correctAnswer;
            const isSelected = i === selected;
            let className = 'w-full text-left p-3 rounded-lg border text-sm transition-all ';

            if (answered) {
              if (isCorrect) className += 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';
              else if (isSelected) className += 'border-destructive bg-destructive/10 text-destructive';
              else className += 'border-border/50 text-muted-foreground opacity-50';
            } else {
              className += 'border-border hover:border-primary/50 hover:bg-primary/5 text-foreground cursor-pointer';
            }

            return (
              <button key={i} className={className} onClick={() => handleAnswer(i)} disabled={answered}>
                <div className="flex items-center gap-2">
                  {answered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                  {answered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />}
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
            💡 {q.explanation}
          </div>
        )}

        {answered && (
          <Button className="w-full" size="sm" onClick={handleNext}>
            {currentQ < questions.length - 1 ? (
              <>Next Question <ArrowRight className="w-3 h-3 ml-1.5" /></>
            ) : (
              <>See Results <Trophy className="w-3 h-3 ml-1.5" /></>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
