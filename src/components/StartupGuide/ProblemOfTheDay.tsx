import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Search, Lightbulb, Send, CheckCircle2 } from 'lucide-react';
import { getDailyProblem } from './data/quizData';
import { toast } from 'sonner';

interface ProblemOfTheDayProps {
  onSubmit: () => void;
}

export const ProblemOfTheDay = ({ onSubmit }: ProblemOfTheDayProps) => {
  const problem = getDailyProblem();
  const [solution, setSolution] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (solution.trim().length < 20) {
      toast.error('Write at least 20 characters for your solution.');
      return;
    }
    setSubmitted(true);
    onSubmit();
    toast.success('+15 XP! Problem of the Day submitted!');
  };

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-500/5 to-indigo-500/5">
        <CardTitle className="text-sm flex items-center gap-2">
          <Search className="w-4 h-4 text-blue-500" /> Problem of the Day
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-sm font-medium text-foreground leading-relaxed">{problem.problem}</p>
        </div>

        <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-2">
          📊 <span className="font-medium">Context:</span> {problem.context}
        </div>

        {!showHint && !submitted && (
          <Button variant="ghost" size="sm" className="text-xs" onClick={() => setShowHint(true)}>
            <Lightbulb className="w-3 h-3 mr-1.5 text-amber-500" /> Show Hint
          </Button>
        )}

        {showHint && (
          <div className="bg-amber-500/5 rounded-lg p-2 border border-amber-500/10">
            <p className="text-xs text-amber-700 dark:text-amber-400">💡 {problem.hint}</p>
          </div>
        )}

        {!submitted ? (
          <>
            <Textarea
              placeholder="Your solution idea... Think about: Who is the customer? What's the simplest first version? How would you test it?"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="min-h-[80px] text-sm"
            />
            <Button className="w-full" size="sm" onClick={handleSubmit} disabled={solution.trim().length < 20}>
              <Send className="w-3 h-3 mr-1.5" /> Submit Solution (+15 XP)
            </Button>
          </>
        ) : (
          <div className="bg-emerald-500/5 rounded-lg p-3 border border-emerald-500/10 text-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Solution submitted!</p>
            <p className="text-xs text-muted-foreground mt-1">Come back tomorrow for a new problem.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
