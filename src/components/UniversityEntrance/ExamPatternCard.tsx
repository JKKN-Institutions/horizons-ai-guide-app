import { Clock, FileText, XCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExamPattern } from '@/data/university-entrance-data';

interface ExamPatternCardProps {
  pattern: ExamPattern;
}

export const ExamPatternCard = ({ pattern }: ExamPatternCardProps) => {
  return (
    <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#6a0dad] to-[#9333ea] text-white p-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Exam Pattern / தேர்வு முறை
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-[#6a0dad]">{pattern.totalQuestions}</p>
            <p className="text-xs text-muted-foreground">Questions</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-[#6a0dad]">{pattern.totalMarks}</p>
            <p className="text-xs text-muted-foreground">Marks</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <Clock className="h-4 w-4 text-[#6a0dad]" />
              <p className="text-lg font-bold text-[#6a0dad]">{pattern.duration}</p>
            </div>
            <p className="text-xs text-muted-foreground">Duration</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 text-center">
            {pattern.negativeMarking ? (
              <div className="flex items-center justify-center gap-1">
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium text-red-500">Yes</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-green-500">No</span>
              </div>
            )}
            <p className="text-xs text-muted-foreground">Negative Marking</p>
          </div>
        </div>

        {/* Mode */}
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3">
          <p className="text-sm">
            <span className="font-semibold text-amber-700 dark:text-amber-400">Mode:</span>{' '}
            <span className="text-foreground">{pattern.mode}</span>
          </p>
        </div>

        {/* Section Breakdown */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">Section Breakup</h4>
          <div className="space-y-3">
            {pattern.sections.map((section, index) => {
              const percentage = (section.marks / pattern.totalMarks) * 100;
              return (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="font-medium text-foreground">{section.name}</span>
                      <span className="text-muted-foreground ml-2 text-xs">({section.nameTamil})</span>
                    </div>
                    <span className="font-semibold text-[#6a0dad]">{section.questions} Qs / {section.marks} marks</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#6a0dad] to-[#9333ea] rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
