import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { entranceExams, examCategories } from './examData';
import { EntranceExam } from './types';
import { cn } from '@/lib/utils';
import { format, parse, isValid, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

interface ExamCalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ExamDate {
  date: Date;
  exam: EntranceExam;
  type: 'registration' | 'exam' | 'result';
}

const parseExamDate = (dateStr: string): Date | null => {
  // Try to parse various date formats
  const formats = [
    'MMMM yyyy',
    'MMMM d, yyyy',
    'MMM yyyy',
    'd MMMM yyyy',
  ];
  
  for (const fmt of formats) {
    try {
      const parsed = parse(dateStr.split(' - ')[0].split(' & ')[0], fmt, new Date());
      if (isValid(parsed)) {
        return parsed;
      }
    } catch {
      continue;
    }
  }
  
  // Try extracting month and year
  const monthYearMatch = dateStr.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s*(\d{4})/i);
  if (monthYearMatch) {
    const parsed = parse(`${monthYearMatch[1]} 15, ${monthYearMatch[2]}`, 'MMMM d, yyyy', new Date());
    if (isValid(parsed)) {
      return parsed;
    }
  }
  
  return null;
};

export const ExamCalendar = ({ isOpen, onClose }: ExamCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0, 1)); // January 2025
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const allExamDates = useMemo(() => {
    const dates: ExamDate[] = [];
    
    entranceExams.forEach(exam => {
      const regDate = parseExamDate(exam.importantDates.registration);
      const examDate = parseExamDate(exam.importantDates.examDate);
      const resultDate = parseExamDate(exam.importantDates.resultDate);
      
      if (regDate) {
        dates.push({ date: regDate, exam, type: 'registration' });
      }
      if (examDate) {
        dates.push({ date: examDate, exam, type: 'exam' });
      }
      if (resultDate) {
        dates.push({ date: resultDate, exam, type: 'result' });
      }
    });
    
    return dates;
  }, []);

  const monthExamDates = useMemo(() => {
    return allExamDates.filter(ed => isSameMonth(ed.date, currentMonth));
  }, [allExamDates, currentMonth]);

  const daysWithExams = useMemo(() => {
    const days = new Set<string>();
    monthExamDates.forEach(ed => {
      days.add(format(ed.date, 'yyyy-MM-dd'));
    });
    return days;
  }, [monthExamDates]);

  const selectedDateExams = useMemo(() => {
    if (!selectedDate) return [];
    return allExamDates.filter(ed => isSameDay(ed.date, selectedDate));
  }, [selectedDate, allExamDates]);

  const getTypeColor = (type: 'registration' | 'exam' | 'result') => {
    switch (type) {
      case 'registration':
        return 'bg-[#1976D2] text-white';
      case 'exam':
        return 'bg-[#D32F2F] text-white';
      case 'result':
        return 'bg-[#2E7D32] text-white';
    }
  };

  const getTypeLabel = (type: 'registration' | 'exam' | 'result') => {
    switch (type) {
      case 'registration':
        return 'Registration';
      case 'exam':
        return 'Exam Date';
      case 'result':
        return 'Results';
    }
  };

  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#1B5E20]">
            <CalendarIcon className="h-5 w-5" />
            Entrance Exams Calendar 2025
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Calendar Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="font-semibold text-lg text-[#1B5E20]">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              modifiers={{
                hasExam: (date) => daysWithExams.has(format(date, 'yyyy-MM-dd'))
              }}
              modifiersStyles={{
                hasExam: {
                  backgroundColor: '#E8F5E9',
                  fontWeight: 'bold',
                  border: '2px solid #2E7D32',
                  borderRadius: '50%'
                }
              }}
              className="rounded-md border border-[#C8E6C9]"
            />

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-[#1976D2]"></div>
                <span className="text-xs text-[#6B7280]">Registration</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-[#D32F2F]"></div>
                <span className="text-xs text-[#6B7280]">Exam</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-[#2E7D32]"></div>
                <span className="text-xs text-[#6B7280]">Results</span>
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div>
            <h3 className="font-semibold text-[#1B5E20] mb-3">
              {selectedDate 
                ? `Events on ${format(selectedDate, 'MMMM d, yyyy')}`
                : `Events in ${format(currentMonth, 'MMMM yyyy')}`
              }
            </h3>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {(selectedDate ? selectedDateExams : monthExamDates).length === 0 ? (
                <p className="text-[#6B7280] text-center py-4">
                  No exam events {selectedDate ? 'on this date' : 'this month'}
                </p>
              ) : (
                (selectedDate ? selectedDateExams : monthExamDates)
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((ed, idx) => {
                    const categoryInfo = examCategories.find(c => c.id === ed.exam.category);
                    return (
                      <Card key={`${ed.exam.id}-${ed.type}-${idx}`} className="border-l-4 border-[#2E7D32]">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-[#1F2937]">{ed.exam.name}</p>
                              <p className="text-xs text-[#6B7280]">{ed.exam.conductingBody}</p>
                              <p className="text-xs text-[#4B5563] mt-1">
                                {format(ed.date, 'MMM d, yyyy')}
                              </p>
                            </div>
                            <div className="flex flex-col gap-1 items-end">
                              <Badge className={cn('text-xs', getTypeColor(ed.type))}>
                                {getTypeLabel(ed.type)}
                              </Badge>
                              <Badge className={cn('text-xs', categoryInfo?.bgColor, categoryInfo?.color)}>
                                {categoryInfo?.icon}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
              )}
            </div>

            {selectedDate && (
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full border-[#C8E6C9] text-[#2E7D32]"
                onClick={() => setSelectedDate(undefined)}
              >
                Show all events for {format(currentMonth, 'MMMM')}
              </Button>
            )}
          </div>
        </div>

        {/* Upcoming Exams Summary */}
        <div className="mt-4 pt-4 border-t border-[#E8F5E9]">
          <h4 className="font-semibold text-[#1B5E20] mb-3">📅 Upcoming Major Exams</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['JEE Main', 'NEET UG', 'BITSAT', 'CAT'].map(examName => {
              const exam = entranceExams.find(e => e.name === examName);
              if (!exam) return null;
              return (
                <div key={examName} className="bg-[#FFF8E1] rounded-lg p-3 text-center">
                  <p className="font-semibold text-[#1F2937] text-sm">{exam.name}</p>
                  <p className="text-xs text-[#F59E0B]">{exam.importantDates.examDate}</p>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
