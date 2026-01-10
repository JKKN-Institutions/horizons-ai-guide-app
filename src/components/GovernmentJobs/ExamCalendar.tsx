import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Calendar as CalendarIcon, Clock, Bell, BellRing, ChevronLeft, ChevronRight,
  AlertTriangle, CheckCircle2, ExternalLink, Shield, Train, FileText,
  Landmark, MapPin, Building2
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { governmentExams } from './governmentExamsData';
import { GovernmentExam } from './types';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, 
  isSameMonth, isSameDay, isToday, differenceInDays, parseISO, isValid } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface ExamReminder {
  examId: string;
  examName: string;
  date: string;
  type: 'exam' | 'deadline';
}

const REMINDERS_STORAGE_KEY = 'govt_exam_reminders';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'defence': return Shield;
    case 'railway': return Train;
    case 'ssc': return FileText;
    case 'banking': return Landmark;
    case 'state': return MapPin;
    case 'central': return Building2;
    default: return CalendarIcon;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'defence': return '#8B5CF6';
    case 'railway': return '#F97316';
    case 'ssc': return '#3B82F6';
    case 'banking': return '#10B981';
    case 'state': return '#EC4899';
    case 'central': return '#6366F1';
    default: return '#6B7280';
  }
};

export const ExamCalendar = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [reminders, setReminders] = useState<ExamReminder[]>([]);

  // Load reminders from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(REMINDERS_STORAGE_KEY);
      if (stored) {
        setReminders(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading reminders:', error);
    }
  }, []);

  // Save reminders to localStorage
  const saveReminders = (newReminders: ExamReminder[]) => {
    setReminders(newReminders);
    localStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(newReminders));
  };

  // Get exams with valid dates
  const examsWithDates = useMemo(() => {
    return governmentExams
      .filter(exam => exam.nextExamDate)
      .map(exam => ({
        ...exam,
        examDate: parseISO(exam.nextExamDate!),
      }))
      .filter(exam => isValid(exam.examDate));
  }, []);

  // Get exams for selected month
  const monthExams = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return examsWithDates.filter(
      exam => exam.examDate >= start && exam.examDate <= end
    );
  }, [examsWithDates, currentMonth]);

  // Get upcoming exams (next 30 days)
  const upcomingExams = useMemo(() => {
    const today = new Date();
    return examsWithDates
      .filter(exam => {
        const daysUntil = differenceInDays(exam.examDate, today);
        return daysUntil >= 0 && daysUntil <= 30;
      })
      .sort((a, b) => a.examDate.getTime() - b.examDate.getTime())
      .slice(0, 5);
  }, [examsWithDates]);

  // Get exams for selected date
  const selectedDateExams = useMemo(() => {
    if (!selectedDate) return [];
    return examsWithDates.filter(exam => isSameDay(exam.examDate, selectedDate));
  }, [examsWithDates, selectedDate]);

  // Calendar days
  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    
    // Pad start of month
    const startPadding = start.getDay();
    const paddedDays: (Date | null)[] = Array(startPadding).fill(null);
    
    return [...paddedDays, ...days];
  }, [currentMonth]);

  // Get exams for a specific day
  const getExamsForDay = (date: Date) => {
    return examsWithDates.filter(exam => isSameDay(exam.examDate, date));
  };

  // Toggle reminder
  const toggleReminder = (exam: GovernmentExam & { examDate: Date }) => {
    const existingIndex = reminders.findIndex(r => r.examId === exam.id);
    
    if (existingIndex >= 0) {
      const newReminders = reminders.filter(r => r.examId !== exam.id);
      saveReminders(newReminders);
      toast({
        title: language === 'ta' ? 'நினைவூட்டல் அகற்றப்பட்டது' : 'Reminder Removed',
        description: exam.name,
      });
    } else {
      const newReminder: ExamReminder = {
        examId: exam.id,
        examName: exam.name,
        date: exam.nextExamDate!,
        type: 'exam',
      };
      saveReminders([...reminders, newReminder]);
      toast({
        title: language === 'ta' ? 'நினைவூட்டல் சேர்க்கப்பட்டது' : 'Reminder Added',
        description: exam.name,
      });
    }
  };

  // Check if exam has reminder
  const hasReminder = (examId: string) => {
    return reminders.some(r => r.examId === examId);
  };

  // Get countdown text
  const getCountdown = (examDate: Date) => {
    const days = differenceInDays(examDate, new Date());
    if (days < 0) return language === 'ta' ? 'முடிந்தது' : 'Passed';
    if (days === 0) return language === 'ta' ? 'இன்று!' : 'Today!';
    if (days === 1) return language === 'ta' ? 'நாளை!' : 'Tomorrow!';
    return language === 'ta' ? `${days} நாட்கள்` : `${days} days`;
  };

  // Get countdown color
  const getCountdownColor = (examDate: Date) => {
    const days = differenceInDays(examDate, new Date());
    if (days < 0) return 'text-gray-400';
    if (days <= 3) return 'text-red-600';
    if (days <= 7) return 'text-orange-600';
    if (days <= 14) return 'text-amber-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <CalendarIcon className="h-5 w-5 text-white" />
            </div>
            {language === 'ta' ? 'தேர்வு காலண்டர்' : 'Exam Calendar'}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Upcoming Exams with Countdown */}
      <Card className="border-orange-200 bg-orange-50/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2 text-orange-700">
            <Clock className="h-4 w-4" />
            {language === 'ta' ? 'வரவிருக்கும் தேர்வுகள் (30 நாட்கள்)' : 'Upcoming Exams (30 Days)'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingExams.length > 0 ? (
            <div className="space-y-3">
              {upcomingExams.map((exam, index) => {
                const Icon = getCategoryIcon(exam.category);
                const daysUntil = differenceInDays(exam.examDate, new Date());
                
                return (
                  <motion.div
                    key={exam.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border shadow-sm"
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${getCategoryColor(exam.category)}15` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: getCategoryColor(exam.category) }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm truncate">
                        {language === 'ta' ? exam.nameTamil : exam.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(exam.examDate, 'dd MMM yyyy')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getCountdownColor(exam.examDate)}`}>
                        {getCountdown(exam.examDate)}
                      </p>
                      {daysUntil <= 7 && daysUntil >= 0 && (
                        <Badge variant="destructive" className="text-xs animate-pulse">
                          {language === 'ta' ? 'விரைவில்!' : 'Soon!'}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleReminder(exam)}
                      className={hasReminder(exam.id) ? 'text-orange-500' : 'text-gray-400'}
                    >
                      {hasReminder(exam.id) ? (
                        <BellRing className="h-4 w-4" />
                      ) : (
                        <Bell className="h-4 w-4" />
                      )}
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">
              {language === 'ta' ? 'அடுத்த 30 நாட்களில் தேர்வுகள் இல்லை' : 'No exams in the next 30 days'}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">
              {format(currentMonth, 'MMMM yyyy')}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(new Date())}
              >
                {language === 'ta' ? 'இன்று' : 'Today'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }
              
              const dayExams = getExamsForDay(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isCurrentDay = isToday(day);
              
              return (
                <motion.button
                  key={day.toISOString()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDate(isSelected ? null : day)}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all ${
                    isSelected 
                      ? 'bg-blue-500 text-white' 
                      : isCurrentDay 
                        ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500' 
                        : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-sm font-medium">{format(day, 'd')}</span>
                  {dayExams.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {dayExams.slice(0, 3).map((exam, i) => (
                        <div
                          key={exam.id}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: getCategoryColor(exam.category) }}
                        />
                      ))}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Exams */}
      <AnimatePresence>
        {selectedDate && selectedDateExams.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="border-purple-200 bg-purple-50/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-purple-700">
                  <CalendarIcon className="h-4 w-4" />
                  {format(selectedDate, 'EEEE, dd MMMM yyyy')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedDateExams.map(exam => {
                    const Icon = getCategoryIcon(exam.category);
                    return (
                      <div
                        key={exam.id}
                        className="flex items-center gap-3 p-3 bg-white rounded-xl border"
                      >
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${getCategoryColor(exam.category)}15` }}
                        >
                          <Icon className="h-5 w-5" style={{ color: getCategoryColor(exam.category) }} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 text-sm">
                            {language === 'ta' ? exam.nameTamil : exam.name}
                          </p>
                          <p className="text-xs text-gray-500">{exam.qualification}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleReminder(exam)}
                            className={hasReminder(exam.id) ? 'text-orange-500' : 'text-gray-400'}
                          >
                            {hasReminder(exam.id) ? <BellRing className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(exam.applyLink, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Month Summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            {language === 'ta' ? 'இந்த மாத சுருக்கம்' : 'This Month Summary'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {monthExams.length > 0 ? (
            <ScrollArea className="h-48">
              <div className="space-y-2">
                {monthExams.map(exam => {
                  const Icon = getCategoryIcon(exam.category);
                  return (
                    <div
                      key={exam.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${getCategoryColor(exam.category)}15` }}
                      >
                        <Icon className="h-4 w-4" style={{ color: getCategoryColor(exam.category) }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm truncate">
                          {language === 'ta' ? exam.nameTamil : exam.name}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {format(exam.examDate, 'dd MMM')}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-center text-gray-500 py-4">
              {language === 'ta' ? 'இந்த மாதம் தேர்வுகள் இல்லை' : 'No exams this month'}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Active Reminders */}
      {reminders.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 text-amber-700">
              <BellRing className="h-4 w-4" />
              {language === 'ta' ? 'செயலில் உள்ள நினைவூட்டல்கள்' : 'Active Reminders'} ({reminders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-32">
              <div className="space-y-2">
                {reminders.map(reminder => (
                  <div
                    key={reminder.examId}
                    className="flex items-center justify-between p-2 bg-white rounded-lg border"
                  >
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{reminder.examName}</p>
                      <p className="text-xs text-gray-500">{reminder.date}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newReminders = reminders.filter(r => r.examId !== reminder.examId);
                        saveReminders(newReminders);
                      }}
                      className="text-red-500 hover:text-red-600"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
