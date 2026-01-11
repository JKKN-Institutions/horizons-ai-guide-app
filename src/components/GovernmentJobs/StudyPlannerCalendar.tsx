import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Calendar as CalendarIcon, FileDown, Plus, Trash2, Clock, Target,
  BookOpen, GraduationCap, AlertCircle, CheckCircle2, Copy, Repeat,
  Zap, Sparkles
} from 'lucide-react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore, parseISO, getDay, addWeeks, startOfWeek, endOfWeek } from 'date-fns';
import { governmentExams } from './governmentExamsData';
import { generateStudyPlannerPDF } from './generateStudyPlannerPDF';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface StudyPlannerCalendarProps {
  language: 'en' | 'ta';
}

interface PracticeSchedule {
  id: string;
  date: string;
  title: string;
  titleTamil: string;
  type: 'practice' | 'revision' | 'mock-test' | 'rest';
  subject?: string;
  duration?: number; // in minutes
  completed: boolean;
}

interface ScheduleTemplate {
  id: string;
  name: string;
  nameTamil: string;
  description: string;
  descriptionTamil: string;
  icon: string;
  pattern: 'weekday' | 'weekend' | 'alternate' | 'custom';
  weekdays: number[]; // 0=Sunday, 1=Monday, etc.
  activities: Array<{
    title: string;
    titleTamil: string;
    type: 'practice' | 'revision' | 'mock-test' | 'rest';
    subject: string;
    duration: number;
  }>;
}

// Predefined templates
const SCHEDULE_TEMPLATES: ScheduleTemplate[] = [
  {
    id: 'weekday-intensive',
    name: 'Weekday Intensive',
    nameTamil: 'வார நாள் தீவிரம்',
    description: 'Focused study on weekdays with rest on weekends',
    descriptionTamil: 'வார நாட்களில் கவனம் செலுத்தும் படிப்பு, வார இறுதியில் ஓய்வு',
    icon: '📚',
    pattern: 'weekday',
    weekdays: [1, 2, 3, 4, 5], // Mon-Fri
    activities: [
      { title: 'GK Practice', titleTamil: 'பொது அறிவு பயிற்சி', type: 'practice', subject: 'gk', duration: 45 },
      { title: 'Math Problems', titleTamil: 'கணித கேள்விகள்', type: 'practice', subject: 'math', duration: 60 },
    ],
  },
  {
    id: 'weekend-warrior',
    name: 'Weekend Warrior',
    nameTamil: 'வார இறுதி போராளி',
    description: 'Intensive mock tests and revision on weekends',
    descriptionTamil: 'வார இறுதியில் தீவிர மாக் தேர்வுகள் மற்றும் திருத்தம்',
    icon: '🏆',
    pattern: 'weekend',
    weekdays: [0, 6], // Sat-Sun
    activities: [
      { title: 'Full Mock Test', titleTamil: 'முழு மாக் தேர்வு', type: 'mock-test', subject: 'all', duration: 120 },
      { title: 'Weekly Revision', titleTamil: 'வார திருத்தம்', type: 'revision', subject: 'all', duration: 90 },
    ],
  },
  {
    id: 'alternate-day',
    name: 'Alternate Day Study',
    nameTamil: 'மாற்று நாள் படிப்பு',
    description: 'Study one day, rest the next for balanced preparation',
    descriptionTamil: 'ஒரு நாள் படிப்பு, அடுத்த நாள் ஓய்வு - சமநிலையான தயாரிப்பு',
    icon: '⚖️',
    pattern: 'alternate',
    weekdays: [1, 3, 5], // Mon, Wed, Fri
    activities: [
      { title: 'Mixed Practice', titleTamil: 'கலப்பு பயிற்சி', type: 'practice', subject: 'all', duration: 90 },
    ],
  },
  {
    id: 'daily-consistent',
    name: 'Daily Consistency',
    nameTamil: 'தினசரி நிலைத்தன்மை',
    description: 'Short daily sessions for steady progress',
    descriptionTamil: 'நிலையான முன்னேற்றத்திற்கு குறுகிய தினசரி அமர்வுகள்',
    icon: '🔥',
    pattern: 'custom',
    weekdays: [0, 1, 2, 3, 4, 5, 6], // All days
    activities: [
      { title: 'Quick Review', titleTamil: 'விரைவு மதிப்பாய்வு', type: 'practice', subject: 'all', duration: 30 },
    ],
  },
  {
    id: 'exam-prep-mode',
    name: 'Exam Prep Mode',
    nameTamil: 'தேர்வு தயாரிப்பு முறை',
    description: 'Intensive preparation with daily mock tests',
    descriptionTamil: 'தினசரி மாக் தேர்வுகளுடன் தீவிர தயாரிப்பு',
    icon: '🎯',
    pattern: 'custom',
    weekdays: [1, 2, 3, 4, 5, 6], // Mon-Sat
    activities: [
      { title: 'Morning Revision', titleTamil: 'காலை திருத்தம்', type: 'revision', subject: 'all', duration: 45 },
      { title: 'Afternoon Mock', titleTamil: 'மதியம் மாக்', type: 'mock-test', subject: 'all', duration: 90 },
    ],
  },
  {
    id: 'subject-rotation',
    name: 'Subject Rotation',
    nameTamil: 'பாட சுழற்சி',
    description: 'Different subject focus each weekday',
    descriptionTamil: 'ஒவ்வொரு வார நாளிலும் வெவ்வேறு பாட கவனம்',
    icon: '🔄',
    pattern: 'weekday',
    weekdays: [1, 2, 3, 4, 5],
    activities: [
      { title: 'Subject Focus', titleTamil: 'பாட கவனம்', type: 'practice', subject: 'all', duration: 60 },
    ],
  },
];

const SCHEDULE_TYPES = [
  { value: 'practice', label: 'Practice', labelTa: 'பயிற்சி', color: 'bg-blue-500' },
  { value: 'revision', label: 'Revision', labelTa: 'திருத்தம்', color: 'bg-purple-500' },
  { value: 'mock-test', label: 'Mock Test', labelTa: 'மாக் தேர்வு', color: 'bg-orange-500' },
  { value: 'rest', label: 'Rest Day', labelTa: 'ஓய்வு நாள்', color: 'bg-green-500' },
];

const SUBJECTS = [
  { value: 'gk', label: 'General Knowledge', labelTa: 'பொது அறிவு' },
  { value: 'math', label: 'Mathematics', labelTa: 'கணிதம்' },
  { value: 'reasoning', label: 'Reasoning', labelTa: 'நியாயம்' },
  { value: 'english', label: 'English', labelTa: 'ஆங்கிலம்' },
  { value: 'polity', label: 'Polity', labelTa: 'அரசியல்' },
  { value: 'all', label: 'All Subjects', labelTa: 'அனைத்து பாடங்கள்' },
];

const WEEKDAY_SUBJECTS = ['gk', 'math', 'reasoning', 'english', 'polity'];

const getStoredSchedules = (): PracticeSchedule[] => {
  try {
    const stored = localStorage.getItem('govt_practice_schedules');
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
};

const saveSchedules = (schedules: PracticeSchedule[]) => {
  localStorage.setItem('govt_practice_schedules', JSON.stringify(schedules));
};

export const StudyPlannerCalendar = ({ language }: StudyPlannerCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [schedules, setSchedules] = useState<PracticeSchedule[]>(getStoredSchedules());
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ScheduleTemplate | null>(null);
  const [templateWeeks, setTemplateWeeks] = useState(2);
  const [templateStartDate, setTemplateStartDate] = useState<Date>(new Date());
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([]);
  
  // Form state
  const [newSchedule, setNewSchedule] = useState({
    title: '',
    type: 'practice' as 'practice' | 'revision' | 'mock-test' | 'rest',
    subject: 'all',
    duration: 60,
  });

  // Get upcoming exams with dates
  const upcomingExams = useMemo(() => {
    return governmentExams
      .filter(exam => exam.nextExamDate)
      .map(exam => ({
        id: exam.id,
        name: language === 'ta' ? exam.nameTamil : exam.name,
        date: exam.nextExamDate!,
        status: exam.applicationStatus,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 10);
  }, [language]);

  // Get schedules for selected date
  const selectedDateSchedules = useMemo(() => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    return schedules.filter(s => s.date === dateStr);
  }, [schedules, selectedDate]);

  // Get exams for selected date
  const selectedDateExams = useMemo(() => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    return upcomingExams.filter(e => e.date === dateStr);
  }, [upcomingExams, selectedDate]);

  // Calendar day modifiers
  const calendarModifiers = useMemo(() => {
    const examDays: Date[] = upcomingExams.map(e => parseISO(e.date));
    const practiceDays: Date[] = schedules.filter(s => s.type === 'practice').map(s => parseISO(s.date));
    const mockTestDays: Date[] = schedules.filter(s => s.type === 'mock-test').map(s => parseISO(s.date));
    const revisionDays: Date[] = schedules.filter(s => s.type === 'revision').map(s => parseISO(s.date));
    
    return { exam: examDays, practice: practiceDays, mockTest: mockTestDays, revision: revisionDays };
  }, [upcomingExams, schedules]);

  const handleAddSchedule = () => {
    if (!newSchedule.title.trim()) {
      toast.error(language === 'en' ? 'Please enter a title' : 'தலைப்பை உள்ளிடவும்');
      return;
    }

    const schedule: PracticeSchedule = {
      id: Date.now().toString(),
      date: format(selectedDate, 'yyyy-MM-dd'),
      title: newSchedule.title,
      titleTamil: newSchedule.title, // User enters in their preferred language
      type: newSchedule.type,
      subject: newSchedule.subject,
      duration: newSchedule.duration,
      completed: false,
    };

    const updated = [...schedules, schedule];
    setSchedules(updated);
    saveSchedules(updated);
    setNewSchedule({ title: '', type: 'practice', subject: 'all', duration: 60 });
    setShowAddForm(false);
    toast.success(language === 'en' ? 'Schedule added!' : 'அட்டவணை சேர்க்கப்பட்டது!');
  };

  const handleDeleteSchedule = (id: string) => {
    const updated = schedules.filter(s => s.id !== id);
    setSchedules(updated);
    saveSchedules(updated);
    toast.success(language === 'en' ? 'Schedule removed' : 'அட்டவணை நீக்கப்பட்டது');
  };

  const handleToggleComplete = (id: string) => {
    const updated = schedules.map(s => 
      s.id === id ? { ...s, completed: !s.completed } : s
    );
    setSchedules(updated);
    saveSchedules(updated);
  };

  // Apply template to generate recurring schedules
  const handleApplyTemplate = () => {
    if (!selectedTemplate) return;

    const newSchedules: PracticeSchedule[] = [];
    const startDate = templateStartDate;
    const weekdaysToUse = selectedWeekdays.length > 0 ? selectedWeekdays : selectedTemplate.weekdays;

    // Generate schedules for the specified number of weeks
    for (let week = 0; week < templateWeeks; week++) {
      const weekStart = addWeeks(startDate, week);
      
      weekdaysToUse.forEach((dayOfWeek, dayIndex) => {
        // Find the date for this day of week in the current week
        const daysFromStart = (dayOfWeek - getDay(weekStart) + 7) % 7;
        const targetDate = addDays(weekStart, daysFromStart);
        
        // Skip past dates
        if (isBefore(targetDate, new Date()) && !isToday(targetDate)) return;

        selectedTemplate.activities.forEach((activity, actIndex) => {
          // For subject rotation template, rotate subjects by day
          let subject = activity.subject;
          if (selectedTemplate.id === 'subject-rotation') {
            subject = WEEKDAY_SUBJECTS[dayIndex % WEEKDAY_SUBJECTS.length];
          }

          const schedule: PracticeSchedule = {
            id: `template_${Date.now()}_${week}_${dayOfWeek}_${actIndex}`,
            date: format(targetDate, 'yyyy-MM-dd'),
            title: language === 'ta' ? activity.titleTamil : activity.title,
            titleTamil: activity.titleTamil,
            type: activity.type,
            subject,
            duration: activity.duration,
            completed: false,
          };
          newSchedules.push(schedule);
        });
      });
    }

    // Merge with existing schedules (avoid duplicates on same date)
    const updated = [...schedules];
    newSchedules.forEach(newSch => {
      const existingOnDate = updated.filter(s => s.date === newSch.date);
      const isDuplicate = existingOnDate.some(s => 
        s.title === newSch.title && s.type === newSch.type
      );
      if (!isDuplicate) {
        updated.push(newSch);
      }
    });

    setSchedules(updated);
    saveSchedules(updated);
    setShowTemplateDialog(false);
    setSelectedTemplate(null);
    setSelectedWeekdays([]);
    
    toast.success(
      language === 'en' 
        ? `Added ${newSchedules.length} scheduled activities for ${templateWeeks} weeks!` 
        : `${templateWeeks} வாரங்களுக்கு ${newSchedules.length} திட்டமிடப்பட்ட செயல்பாடுகள் சேர்க்கப்பட்டன!`
    );
  };

  const toggleWeekday = (day: number) => {
    setSelectedWeekdays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const getWeekdayName = (day: number, short = false) => {
    const names = {
      en: short ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      ta: short ? ['ஞா', 'தி', 'செ', 'பு', 'வி', 'வெ', 'ச'] : ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'],
    };
    return names[language][day];
  };

  const handleExportPDF = () => {
    toast.info(language === 'en' ? 'Generating study planner...' : 'படிப்பு திட்டம் உருவாக்கப்படுகிறது...');
    
    try {
      generateStudyPlannerPDF({
        month: currentMonth,
        schedules,
        upcomingExams,
        language,
      });
      toast.success(language === 'en' ? 'Study planner downloaded!' : 'படிப்பு திட்டம் பதிவிறக்கம் செய்யப்பட்டது!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error(language === 'en' ? 'Failed to generate PDF' : 'PDF உருவாக்க முடியவில்லை');
    }
  };

  const getTypeConfig = (type: string) => {
    return SCHEDULE_TYPES.find(t => t.value === type) || SCHEDULE_TYPES[0];
  };

  const getSubjectLabel = (subject: string) => {
    const sub = SUBJECTS.find(s => s.value === subject);
    return language === 'ta' ? sub?.labelTa : sub?.label;
  };

  // Calculate monthly statistics
  const monthlyStats = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const monthSchedules = schedules.filter(s => {
      const date = parseISO(s.date);
      return date >= monthStart && date <= monthEnd;
    });
    
    const completed = monthSchedules.filter(s => s.completed).length;
    const total = monthSchedules.length;
    const practiceMinutes = monthSchedules
      .filter(s => s.completed && s.duration)
      .reduce((sum, s) => sum + (s.duration || 0), 0);

    return { completed, total, practiceMinutes };
  }, [schedules, currentMonth]);

  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-indigo-500" />
            {language === 'ta' ? 'படிப்பு திட்டமிடுதல் நாட்காட்டி' : 'Study Planner Calendar'}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border-amber-200"
                >
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <span className="hidden sm:inline">
                    {language === 'ta' ? 'டெம்ப்ளேட்' : 'Templates'}
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Repeat className="h-5 w-5 text-amber-500" />
                    {language === 'ta' ? 'மீண்டும் நிகழும் அட்டவணை டெம்ப்ளேட்கள்' : 'Recurring Schedule Templates'}
                  </DialogTitle>
                </DialogHeader>
                
                <ScrollArea className="max-h-[60vh] pr-4">
                  {!selectedTemplate ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4">
                      {SCHEDULE_TEMPLATES.map((template) => (
                        <motion.button
                          key={template.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedTemplate(template);
                            setSelectedWeekdays(template.weekdays);
                          }}
                          className="p-4 rounded-xl border-2 border-gray-200 hover:border-amber-300 bg-gradient-to-br from-white to-gray-50 text-left transition-all"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{template.icon}</span>
                            <div>
                              <p className="font-semibold text-gray-800">
                                {language === 'ta' ? template.nameTamil : template.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {template.weekdays.map(d => getWeekdayName(d, true)).join(', ')}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">
                            {language === 'ta' ? template.descriptionTamil : template.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {template.activities.map((act, i) => (
                              <Badge key={i} variant="outline" className="text-[10px]">
                                {language === 'ta' ? act.titleTamil : act.title}
                              </Badge>
                            ))}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4 py-4">
                      {/* Selected Template Header */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">{selectedTemplate.icon}</span>
                          <div>
                            <p className="font-bold text-gray-800">
                              {language === 'ta' ? selectedTemplate.nameTamil : selectedTemplate.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {language === 'ta' ? selectedTemplate.descriptionTamil : selectedTemplate.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Duration Selection */}
                      <div>
                        <Label className="text-sm font-medium">
                          {language === 'ta' ? 'எத்தனை வாரங்கள்?' : 'How many weeks?'}
                        </Label>
                        <div className="flex gap-2 mt-2">
                          {[1, 2, 3, 4].map(weeks => (
                            <Button
                              key={weeks}
                              variant={templateWeeks === weeks ? "default" : "outline"}
                              size="sm"
                              onClick={() => setTemplateWeeks(weeks)}
                              className="flex-1"
                            >
                              {weeks} {language === 'ta' ? 'வாரம்' : weeks === 1 ? 'Week' : 'Weeks'}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Weekday Selection */}
                      <div>
                        <Label className="text-sm font-medium">
                          {language === 'ta' ? 'நாட்களை தேர்ந்தெடுக்கவும்' : 'Select Days'}
                        </Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {[0, 1, 2, 3, 4, 5, 6].map(day => (
                            <Button
                              key={day}
                              variant={selectedWeekdays.includes(day) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleWeekday(day)}
                              className="min-w-[60px]"
                            >
                              {getWeekdayName(day, true)}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Activities Preview */}
                      <div>
                        <Label className="text-sm font-medium">
                          {language === 'ta' ? 'செயல்பாடுகள்' : 'Activities per day'}
                        </Label>
                        <div className="space-y-2 mt-2">
                          {selectedTemplate.activities.map((activity, i) => (
                            <div key={i} className="p-2 rounded-lg bg-gray-50 border flex items-center gap-3">
                              <Badge className={getTypeConfig(activity.type).color}>
                                {language === 'ta' 
                                  ? SCHEDULE_TYPES.find(t => t.value === activity.type)?.labelTa 
                                  : SCHEDULE_TYPES.find(t => t.value === activity.type)?.label}
                              </Badge>
                              <span className="font-medium text-sm">
                                {language === 'ta' ? activity.titleTamil : activity.title}
                              </span>
                              <span className="text-xs text-gray-500 ml-auto">
                                {activity.duration} {language === 'ta' ? 'நிமிடம்' : 'min'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <Zap className="h-4 w-4 inline mr-1" />
                          {language === 'ta' 
                            ? `${templateWeeks} வாரங்களில் ${selectedWeekdays.length} நாட்களுக்கு ${selectedWeekdays.length * templateWeeks * selectedTemplate.activities.length} செயல்பாடுகள் சேர்க்கப்படும்`
                            : `This will add ${selectedWeekdays.length * templateWeeks * selectedTemplate.activities.length} activities across ${templateWeeks} weeks on ${selectedWeekdays.length} days each week`}
                        </p>
                      </div>
                    </div>
                  )}
                </ScrollArea>

                <DialogFooter className="gap-2">
                  {selectedTemplate && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedTemplate(null);
                        setSelectedWeekdays([]);
                      }}
                    >
                      {language === 'ta' ? 'பின்னால்' : 'Back'}
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      if (selectedTemplate) {
                        handleApplyTemplate();
                      } else {
                        setShowTemplateDialog(false);
                      }
                    }}
                    disabled={selectedTemplate !== null && selectedWeekdays.length === 0}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  >
                    {selectedTemplate 
                      ? (language === 'ta' ? 'டெம்ப்ளேட் பயன்படுத்து' : 'Apply Template')
                      : (language === 'ta' ? 'மூடு' : 'Close')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              className="gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border-indigo-200"
            >
              <FileDown className="h-4 w-4 text-indigo-600" />
              <span className="hidden sm:inline">
                {language === 'ta' ? 'PDF பதிவிறக்கம்' : 'Export PDF'}
              </span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Monthly Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 text-center">
            <p className="text-2xl font-bold text-blue-700">{monthlyStats.total}</p>
            <p className="text-xs text-blue-600">{language === 'ta' ? 'திட்டமிடப்பட்டது' : 'Scheduled'}</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 text-center">
            <p className="text-2xl font-bold text-green-700">{monthlyStats.completed}</p>
            <p className="text-xs text-green-600">{language === 'ta' ? 'முடிக்கப்பட்டது' : 'Completed'}</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 text-center">
            <p className="text-2xl font-bold text-purple-700">{Math.round(monthlyStats.practiceMinutes / 60)}h</p>
            <p className="text-xs text-purple-600">{language === 'ta' ? 'படிப்பு நேரம்' : 'Study Time'}</p>
          </div>
        </div>

        {/* Calendar */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              onMonthChange={setCurrentMonth}
              className="rounded-lg border pointer-events-auto"
              modifiers={calendarModifiers}
              modifiersClassNames={{
                exam: 'bg-red-100 text-red-900 font-bold',
                practice: 'bg-blue-100 text-blue-900',
                mockTest: 'bg-orange-100 text-orange-900',
                revision: 'bg-purple-100 text-purple-900',
              }}
            />
            
            {/* Legend */}
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 rounded bg-red-500" />
                <span>{language === 'ta' ? 'தேர்வு' : 'Exam'}</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 rounded bg-blue-500" />
                <span>{language === 'ta' ? 'பயிற்சி' : 'Practice'}</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 rounded bg-orange-500" />
                <span>{language === 'ta' ? 'மாக் தேர்வு' : 'Mock Test'}</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 rounded bg-purple-500" />
                <span>{language === 'ta' ? 'திருத்தம்' : 'Revision'}</span>
              </div>
            </div>
          </div>

          {/* Selected Date Details */}
          <div className="flex-1 space-y-4">
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
              <h3 className="font-semibold text-indigo-800 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </h3>
              {isToday(selectedDate) && (
                <Badge className="mt-1 bg-green-500">{language === 'ta' ? 'இன்று' : 'Today'}</Badge>
              )}
            </div>

            {/* Exams on selected date */}
            {selectedDateExams.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-red-700 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {language === 'ta' ? 'தேர்வுகள்' : 'Exams'}
                </h4>
                {selectedDateExams.map(exam => (
                  <div key={exam.id} className="p-2 bg-red-50 rounded-lg border border-red-200">
                    <p className="font-medium text-red-800 text-sm">{exam.name}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Schedules on selected date */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">
                  {language === 'ta' ? 'திட்டமிடப்பட்ட செயல்பாடுகள்' : 'Scheduled Activities'}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="h-7 gap-1"
                >
                  <Plus className="h-3 w-3" />
                  {language === 'ta' ? 'சேர்' : 'Add'}
                </Button>
              </div>

              {/* Add form */}
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-gray-50 rounded-lg border space-y-3"
                >
                  <div>
                    <Label className="text-xs">{language === 'ta' ? 'தலைப்பு' : 'Title'}</Label>
                    <Input
                      value={newSchedule.title}
                      onChange={(e) => setNewSchedule({ ...newSchedule, title: e.target.value })}
                      placeholder={language === 'ta' ? 'எ.கா., GK பயிற்சி' : 'e.g., GK Practice'}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">{language === 'ta' ? 'வகை' : 'Type'}</Label>
                      <Select
                        value={newSchedule.type}
                        onValueChange={(v) => setNewSchedule({ ...newSchedule, type: v as any })}
                      >
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SCHEDULE_TYPES.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {language === 'ta' ? type.labelTa : type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">{language === 'ta' ? 'பாடம்' : 'Subject'}</Label>
                      <Select
                        value={newSchedule.subject}
                        onValueChange={(v) => setNewSchedule({ ...newSchedule, subject: v })}
                      >
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SUBJECTS.map(sub => (
                            <SelectItem key={sub.value} value={sub.value}>
                              {language === 'ta' ? sub.labelTa : sub.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">{language === 'ta' ? 'கால அளவு (நிமிடங்கள்)' : 'Duration (minutes)'}</Label>
                    <Input
                      type="number"
                      value={newSchedule.duration}
                      onChange={(e) => setNewSchedule({ ...newSchedule, duration: parseInt(e.target.value) || 60 })}
                      className="h-8 text-sm"
                      min={15}
                      step={15}
                    />
                  </div>
                  <Button onClick={handleAddSchedule} size="sm" className="w-full">
                    {language === 'ta' ? 'சேர்' : 'Add Schedule'}
                  </Button>
                </motion.div>
              )}

              {/* Schedule list */}
              <ScrollArea className="h-48">
                {selectedDateSchedules.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    {language === 'ta' 
                      ? 'இந்த நாளுக்கு எந்த செயல்பாடும் திட்டமிடப்படவில்லை' 
                      : 'No activities scheduled for this day'}
                  </p>
                ) : (
                  <div className="space-y-2">
                    {selectedDateSchedules.map(schedule => {
                      const typeConfig = getTypeConfig(schedule.type);
                      return (
                        <motion.div
                          key={schedule.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={cn(
                            "p-2 rounded-lg border flex items-center gap-2",
                            schedule.completed ? 'bg-green-50 border-green-200' : 'bg-white'
                          )}
                        >
                          <button
                            onClick={() => handleToggleComplete(schedule.id)}
                            className={cn(
                              "p-1 rounded-full",
                              schedule.completed ? 'text-green-600' : 'text-gray-400 hover:text-green-500'
                            )}
                          >
                            <CheckCircle2 className="h-5 w-5" />
                          </button>
                          <div className="flex-1 min-w-0">
                            <p className={cn(
                              "font-medium text-sm truncate",
                              schedule.completed && 'line-through text-gray-500'
                            )}>
                              {schedule.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Badge className={cn('text-[10px] px-1.5 py-0', typeConfig.color)}>
                                {language === 'ta' ? typeConfig.labelTa : typeConfig.label}
                              </Badge>
                              {schedule.subject && (
                                <span>{getSubjectLabel(schedule.subject)}</span>
                              )}
                              {schedule.duration && (
                                <span className="flex items-center gap-0.5">
                                  <Clock className="h-3 w-3" />
                                  {schedule.duration}m
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteSchedule(schedule.id)}
                            className="p-1 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* Upcoming Exams Section */}
        <div className="pt-4 border-t">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-red-500" />
            {language === 'ta' ? 'வரவிருக்கும் தேர்வுகள்' : 'Upcoming Exams'}
          </h3>
          <ScrollArea className="h-32">
            <div className="space-y-2">
              {upcomingExams.slice(0, 5).map(exam => {
                const examDate = parseISO(exam.date);
                const daysUntil = Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                const isPast = daysUntil < 0;
                
                return (
                  <div
                    key={exam.id}
                    className={cn(
                      "p-2 rounded-lg border flex items-center justify-between",
                      isPast ? 'bg-gray-50 opacity-60' : daysUntil <= 7 ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'
                    )}
                  >
                    <div>
                      <p className="font-medium text-sm">{exam.name}</p>
                      <p className="text-xs text-gray-500">{format(examDate, 'MMM d, yyyy')}</p>
                    </div>
                    <Badge className={cn(
                      isPast ? 'bg-gray-400' : daysUntil <= 7 ? 'bg-red-500' : daysUntil <= 30 ? 'bg-orange-500' : 'bg-blue-500'
                    )}>
                      {isPast 
                        ? (language === 'ta' ? 'முடிந்தது' : 'Passed')
                        : `${daysUntil} ${language === 'ta' ? 'நாட்கள்' : 'days'}`
                      }
                    </Badge>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};
