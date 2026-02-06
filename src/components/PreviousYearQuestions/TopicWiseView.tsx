import { ArrowLeft, BookOpen, TrendingUp, TrendingDown, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { examTopicData } from './topicWiseData';

interface TopicWiseViewProps {
  examId: string;
  examName: string;
  subject: string;
  onBack: () => void;
  onViewQuestions?: (topic: string) => void;
}

export const TopicWiseView = ({ examId, examName, subject, onBack, onViewQuestions }: TopicWiseViewProps) => {
  const subjectData = examTopicData[examId]?.[subject];

  if (!subjectData) {
    return (
      <div className="text-center py-16">
        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">Topic data for {subject} coming soon!</p>
        <Button variant="outline" size="sm" className="mt-4 rounded-xl" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Go Back
        </Button>
      </div>
    );
  }

  const totalQuestions = subjectData.reduce((sum, sec) => sum + sec.topics.reduce((s, t) => s + t.total, 0), 0);
  const totalTopics = subjectData.reduce((sum, sec) => sum + sec.topics.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Button variant="ghost" size="sm" className="mb-3 text-gray-600 hover:text-gray-800 rounded-xl -ml-2" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to {examName}
        </Button>

        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-2xl p-5 md:p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-blue-200 text-sm font-medium">{examName}</p>
              <h3 className="text-2xl font-bold">{subject} — Topic-wise PYQ Analysis</h3>
              <p className="text-blue-100 text-sm mt-1">Chapter-wise weightage & trends</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-2 text-center border border-white/20">
                <div className="text-xl font-bold">{totalQuestions}</div>
                <div className="text-[10px] text-white/70 uppercase tracking-wider">Questions</div>
              </div>
              <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-2 text-center border border-white/20">
                <div className="text-xl font-bold">{totalTopics}</div>
                <div className="text-[10px] text-white/70 uppercase tracking-wider">Topics</div>
              </div>
              <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-2 text-center border border-white/20">
                <div className="text-xl font-bold">{subjectData.length}</div>
                <div className="text-[10px] text-white/70 uppercase tracking-wider">Sections</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sections */}
      {subjectData.map((section, sIdx) => (
        <motion.div
          key={section.section}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sIdx * 0.08 }}
        >
          <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500" />
            {section.section}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {section.topics.map((topic) => (
              <Card
                key={topic.name}
                className={cn(
                  "overflow-hidden border transition-all hover:shadow-md rounded-xl",
                  topic.syllabusTag
                    ? "bg-blue-50/50 border-blue-100"
                    : "bg-white border-gray-100"
                )}
              >
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <h5 className="font-semibold text-gray-800 text-sm leading-tight flex-1">{topic.name}</h5>
                      {topic.syllabusTag && (
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] px-2 py-0.5 shrink-0 font-semibold rounded-md border",
                            topic.syllabusTag === 'Out of Syllabus'
                              ? "border-green-300 text-green-600 bg-green-50"
                              : "border-orange-300 text-orange-600 bg-orange-50"
                          )}
                        >
                          {topic.syllabusTag}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-3 flex-wrap">
                      <span className="font-semibold text-gray-700">2026:</span>
                      <span>Total: {topic.total}</span>
                      <span className="text-gray-300">·</span>
                      <span>Avg: {topic.avg}</span>
                      <span className="text-gray-300">·</span>
                      <span>Weightage: {topic.weightage}%</span>
                      {topic.trend !== 0 && (
                        <span className={cn(
                          "font-semibold ml-1 flex items-center gap-0.5",
                          topic.trend > 0 ? "text-green-600" : "text-red-500"
                        )}>
                          {topic.trend > 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {topic.trend > 0 ? '+' : ''}{topic.trend.toFixed(2)}%
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onViewQuestions?.(topic.name)}
                    className="w-full bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border-t border-blue-100 text-blue-600 font-semibold text-sm py-2.5 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Questions
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
