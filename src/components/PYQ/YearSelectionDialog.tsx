import { useState } from 'react';
import { Download, Loader2, Calendar, CheckCircle2, Circle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PYQExam, PYQQuestion, pyqQuestions } from '@/data/pyq-database';

interface YearSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exam: PYQExam | null;
  onDownload: (exam: PYQExam, selectedYears: number[]) => Promise<void>;
}

export const YearSelectionDialog = ({
  open,
  onOpenChange,
  exam,
  onDownload,
}: YearSelectionDialogProps) => {
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!exam) return null;

  // Get question counts per year
  const yearQuestionCounts = exam.years.reduce((acc, year) => {
    const count = pyqQuestions.filter(
      (q) => q.examId === exam.id && q.year === year
    ).length;
    acc[year] = count;
    return acc;
  }, {} as Record<number, number>);

  const totalSelectedQuestions = selectedYears.reduce(
    (sum, year) => sum + (yearQuestionCounts[year] || 0),
    0
  );

  const allYearsSelected = selectedYears.length === exam.years.length;

  const handleToggleYear = (year: number) => {
    setSelectedYears((prev) =>
      prev.includes(year)
        ? prev.filter((y) => y !== year)
        : [...prev, year].sort((a, b) => b - a)
    );
  };

  const handleSelectAll = () => {
    if (allYearsSelected) {
      setSelectedYears([]);
    } else {
      setSelectedYears([...exam.years].sort((a, b) => b - a));
    }
  };

  const handleDownload = async () => {
    if (selectedYears.length === 0) return;
    setIsDownloading(true);
    try {
      await onDownload(exam, selectedYears);
      onOpenChange(false);
      setSelectedYears([]);
    } finally {
      setIsDownloading(false);
    }
  };

  const sortedYears = [...exam.years].sort((a, b) => b - a);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Download {exam.name.en}
          </DialogTitle>
          <DialogDescription>
            Select years to include in your PDF download
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Select All Option */}
          <div
            className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors"
            onClick={handleSelectAll}
          >
            <div className="flex items-center gap-3">
              <Checkbox
                checked={allYearsSelected}
                onCheckedChange={handleSelectAll}
              />
              <div>
                <p className="font-medium text-sm">Download All Years</p>
                <p className="text-xs text-muted-foreground">
                  Complete question bank ({exam.years.length} years)
                </p>
              </div>
            </div>
            <Badge variant="secondary">
              {pyqQuestions.filter((q) => q.examId === exam.id).length} Qs
            </Badge>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or select specific years
              </span>
            </div>
          </div>

          {/* Year Selection Grid */}
          <ScrollArea className="h-[200px] pr-4">
            <div className="grid grid-cols-2 gap-2">
              {sortedYears.map((year) => {
                const isSelected = selectedYears.includes(year);
                const questionCount = yearQuestionCounts[year] || 0;

                return (
                  <div
                    key={year}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                    onClick={() => handleToggleYear(year)}
                  >
                    <div className="flex items-center gap-2">
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      ) : (
                        <Circle className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="font-medium">{year}</span>
                    </div>
                    <Badge
                      variant={questionCount > 0 ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {questionCount} Qs
                    </Badge>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Selection Summary */}
          {selectedYears.length > 0 && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Selected:</span>
                <span className="font-medium">
                  {selectedYears.length} year{selectedYears.length > 1 ? 's' : ''} • {totalSelectedQuestions} questions
                </span>
              </div>
            </div>
          )}

          {/* Download Button */}
          <Button
            className="w-full"
            onClick={handleDownload}
            disabled={selectedYears.length === 0 || isDownloading}
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
                {selectedYears.length > 0 && (
                  <span className="ml-1">({totalSelectedQuestions} questions)</span>
                )}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
