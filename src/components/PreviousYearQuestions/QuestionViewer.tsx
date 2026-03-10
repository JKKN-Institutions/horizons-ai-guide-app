import { useState } from 'react';
import { ArrowLeft, Eye, BookOpen, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { getTopicQuestions, PYQQuestion } from './pyqQuestionsData';

interface QuestionViewerProps {
  examId: string;
  examName: string;
  subject: string;
  topicName: string;
  onBack: () => void;
}

export const QuestionViewer = ({ examId, examName, subject, topicName, onBack }: QuestionViewerProps) => {
  const questions = getTopicQuestions(examId, subject, topicName);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [showAll, setShowAll] = useState(false);

  const toggleAnswer = (qId: number) => {
    setRevealedAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleShowAll = () => {
    if (showAll) {
      setRevealedAnswers({});
      setShowAll(false);
    } else {
      const all: Record<number, boolean> = {};
      questions.forEach(q => { all[q.id] = true; });
      setRevealedAnswers(all);
      setShowAll(true);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">Questions for "{topicName}" coming soon!</p>
        <p className="text-gray-400 text-sm mt-1">We're adding PYQs for all topics. Check back later.</p>
        <Button variant="outline" size="sm" className="mt-4 rounded-xl" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Button variant="ghost" size="sm" className="mb-3 text-gray-600 hover:text-gray-800 rounded-xl -ml-2" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Topics
        </Button>

        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-2xl p-5 text-white">
          <p className="text-blue-200 text-sm font-medium">{examName} → {subject}</p>
          <h3 className="text-xl md:text-2xl font-bold mt-1">{topicName}</h3>
          <p className="text-blue-100 text-sm mt-1">Previous Year Questions with Answers</p>
          <div className="flex gap-3 mt-4">
            <div className="bg-white/15 backdrop-blur rounded-xl px-3 py-2 text-center border border-white/20">
              <div className="text-lg font-bold">{questions.length}</div>
              <div className="text-xs text-white/70 uppercase tracking-wider">Questions</div>
            </div>
          </div>
        </div>

        {/* Show/Hide All Answers */}
        <div className="flex justify-end mt-3">
          <Button
            onClick={handleShowAll}
            variant="outline"
            size="sm"
            className="rounded-xl text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            {showAll ? <ChevronUp className="w-3.5 h-3.5 mr-1" /> : <Eye className="w-3.5 h-3.5 mr-1" />}
            {showAll ? 'Hide All Answers' : 'Show All Answers'}
          </Button>
        </div>
      </motion.div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((q, qIdx) => {
          const isRevealed = revealedAnswers[q.id];
          const correctLetter = String.fromCharCode(65 + q.answer);

          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qIdx * 0.04 }}
            >
              <Card className="overflow-hidden rounded-xl border border-gray-200">
                <CardContent className="p-0">
                  {/* Question Header */}
                  <div className="px-4 pt-4 pb-2">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-lg">
                        Q{qIdx + 1}
                      </span>
                      <Badge variant="outline" className="text-[10px] border-amber-300 text-amber-700 bg-amber-50 font-semibold">
                        <Clock className="w-2.5 h-2.5 mr-0.5" />
                        {q.exam}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-gray-800 leading-relaxed">{q.question}</p>
                  </div>

                  {/* Options */}
                  <div className="px-4 pb-3 space-y-1.5">
                    {q.options.map((opt, oIdx) => {
                      const letter = String.fromCharCode(65 + oIdx);
                      const isCorrectOption = q.answer === oIdx;

                      return (
                        <div
                          key={oIdx}
                          className={cn(
                            "px-3 py-2.5 rounded-xl border-2 flex items-center gap-3 text-sm transition-all",
                            isRevealed && isCorrectOption
                              ? "border-green-400 bg-green-50"
                              : "border-gray-200 bg-white"
                          )}
                        >
                          <span className={cn(
                            "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                            isRevealed && isCorrectOption
                              ? "bg-green-500 text-white"
                              : "bg-gray-100 text-gray-500"
                          )}>
                            {letter}
                          </span>
                          <span className={cn(
                            "flex-1",
                            isRevealed && isCorrectOption && "font-semibold text-green-800"
                          )}>
                            {opt}
                          </span>
                          {isRevealed && isCorrectOption && (
                            <span className="text-green-600 text-xs font-bold">✅ Correct</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Show Answer Button */}
                  <button
                    onClick={() => toggleAnswer(q.id)}
                    className={cn(
                      "w-full border-t text-sm font-semibold py-3 transition-all flex items-center justify-center gap-2",
                      isRevealed
                        ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                        : "bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border-blue-100 text-blue-600"
                    )}
                  >
                    {isRevealed ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Answer: ({correctLetter}) {q.options[q.answer]}
                        <span className="text-[10px] ml-1 opacity-60">— tap to hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        Show Answer
                      </>
                    )}
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Back Button */}
      <div className="text-center pt-2 pb-4">
        <Button variant="outline" className="rounded-xl" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Topics
        </Button>
      </div>
    </div>
  );
};
