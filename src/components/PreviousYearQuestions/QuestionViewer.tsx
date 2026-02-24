import { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Eye, EyeOff, BookOpen, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const handleSelectOption = (qId: number, optIndex: number) => {
    if (showAnswers[qId]) return; // Don't allow change after reveal
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const handleRevealAnswer = (qId: number) => {
    setShowAnswers(prev => ({ ...prev, [qId]: true }));
  };

  const handleShowAll = () => {
    setShowAllAnswers(true);
    const all: Record<number, boolean> = {};
    questions.forEach(q => { all[q.id] = true; });
    setShowAnswers(all);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = questions.filter(q => selectedAnswers[q.id] === q.answer && showAnswers[q.id]).length;
  const revealedCount = Object.keys(showAnswers).length;

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

          {/* Stats */}
          <div className="flex gap-3 mt-4">
            <div className="bg-white/15 backdrop-blur rounded-xl px-3 py-2 text-center border border-white/20">
              <div className="text-lg font-bold">{questions.length}</div>
              <div className="text-[9px] text-white/70 uppercase tracking-wider">Questions</div>
            </div>
            <div className="bg-white/15 backdrop-blur rounded-xl px-3 py-2 text-center border border-white/20">
              <div className="text-lg font-bold">{answeredCount}</div>
              <div className="text-[9px] text-white/70 uppercase tracking-wider">Attempted</div>
            </div>
            {revealedCount > 0 && (
              <div className="bg-white/15 backdrop-blur rounded-xl px-3 py-2 text-center border border-white/20">
                <div className="text-lg font-bold">{correctCount}/{revealedCount}</div>
                <div className="text-[9px] text-white/70 uppercase tracking-wider">Correct</div>
              </div>
            )}
          </div>
        </div>

        {/* Show All Answers Button */}
        {!showAllAnswers && (
          <div className="flex justify-end mt-3">
            <Button
              onClick={handleShowAll}
              variant="outline"
              size="sm"
              className="rounded-xl text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Eye className="w-3.5 h-3.5 mr-1" /> Show All Answers
            </Button>
          </div>
        )}
      </motion.div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((q, qIdx) => {
          const isRevealed = showAnswers[q.id];
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.answer;

          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qIdx * 0.04 }}
            >
              <Card className={cn(
                "overflow-hidden rounded-xl border transition-all",
                isRevealed && isCorrect && userAnswer !== undefined ? "border-green-300 bg-green-50/30" :
                isRevealed && !isCorrect && userAnswer !== undefined ? "border-red-300 bg-red-50/30" :
                "border-gray-200"
              )}>
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
                      {isRevealed && userAnswer !== undefined && (
                        <Badge variant="outline" className={cn(
                          "text-[10px] font-semibold",
                          isCorrect ? "border-green-300 text-green-700 bg-green-50" : "border-red-300 text-red-700 bg-red-50"
                        )}>
                          {isCorrect ? "✓ Correct" : "✗ Wrong"}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm font-medium text-gray-800 leading-relaxed">{q.question}</p>
                  </div>

                  {/* Options */}
                  <div className="px-4 pb-3 space-y-2">
                    {q.options.map((opt, oIdx) => {
                      const letter = String.fromCharCode(65 + oIdx); // A, B, C, D
                      const isSelected = userAnswer === oIdx;
                      const isCorrectOption = q.answer === oIdx;
                      const showResult = isRevealed;

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(q.id, oIdx)}
                          className={cn(
                            "w-full text-left px-3 py-2.5 rounded-xl border-2 transition-all flex items-center gap-3 text-sm",
                            // Default
                            !isSelected && !showResult && "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50",
                            // Selected but not revealed
                            isSelected && !showResult && "border-blue-400 bg-blue-50",
                            // Revealed - correct answer
                            showResult && isCorrectOption && "border-green-400 bg-green-50",
                            // Revealed - wrong selection
                            showResult && isSelected && !isCorrectOption && "border-red-400 bg-red-50",
                            // Revealed - not selected, not correct
                            showResult && !isSelected && !isCorrectOption && "border-gray-200 bg-gray-50 opacity-60",
                            // Disable pointer after reveal
                            showResult && "cursor-default"
                          )}
                        >
                          <span className={cn(
                            "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                            !isSelected && !showResult && "bg-gray-100 text-gray-500",
                            isSelected && !showResult && "bg-blue-500 text-white",
                            showResult && isCorrectOption && "bg-green-500 text-white",
                            showResult && isSelected && !isCorrectOption && "bg-red-500 text-white",
                            showResult && !isSelected && !isCorrectOption && "bg-gray-200 text-gray-400",
                          )}>
                            {showResult && isCorrectOption ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : showResult && isSelected && !isCorrectOption ? (
                              <XCircle className="w-4 h-4" />
                            ) : (
                              letter
                            )}
                          </span>
                          <span className={cn(
                            "flex-1",
                            showResult && isCorrectOption && "font-semibold text-green-800",
                            showResult && isSelected && !isCorrectOption && "text-red-700 line-through",
                          )}>
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Check Answer Button */}
                  {!isRevealed && (
                    <button
                      onClick={() => handleRevealAnswer(q.id)}
                      disabled={userAnswer === undefined}
                      className={cn(
                        "w-full border-t text-sm font-semibold py-2.5 transition-colors flex items-center justify-center gap-1.5",
                        userAnswer !== undefined
                          ? "bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border-blue-100 text-blue-600 cursor-pointer"
                          : "bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed"
                      )}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {userAnswer !== undefined ? "Check Answer" : "Select an option first"}
                    </button>
                  )}

                  {/* Answer Revealed - Correct Answer Display */}
                  {isRevealed && (
                    <div className={cn(
                      "border-t px-4 py-2.5 text-xs font-medium",
                      isCorrect || userAnswer === undefined ? "bg-green-50 border-green-200 text-green-700" : "bg-amber-50 border-amber-200 text-amber-700"
                    )}>
                      ✅ Correct Answer: <strong>({String.fromCharCode(65 + q.answer)}) {q.options[q.answer]}</strong>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Score Summary */}
      {revealedCount === questions.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="border-2 border-blue-300 rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="text-4xl mb-2">
                {correctCount >= questions.length * 0.8 ? '🎉' : correctCount >= questions.length * 0.5 ? '👍' : '💪'}
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {correctCount}/{questions.length} Correct
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {correctCount >= questions.length * 0.8 ? 'Excellent! You know this topic well!' :
                 correctCount >= questions.length * 0.5 ? 'Good job! Keep practicing!' :
                 'Keep studying — you\'ll get better!'}
              </p>
              <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden max-w-xs mx-auto">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    correctCount >= questions.length * 0.8 ? "bg-green-500" :
                    correctCount >= questions.length * 0.5 ? "bg-amber-500" : "bg-red-400"
                  )}
                  style={{ width: `${(correctCount / questions.length) * 100}%` }}
                />
              </div>
              <Button variant="outline" className="mt-4 rounded-xl" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Topics
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
