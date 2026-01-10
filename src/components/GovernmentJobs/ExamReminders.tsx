import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, BellRing, Calendar, Clock, X, Check, 
  AlertTriangle, Trash2, Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { governmentExams } from './governmentExamsData';
import { useLanguage } from '@/hooks/useLanguage';

interface Reminder {
  examId: string;
  examName: string;
  examNameTamil: string;
  examDate: string;
  reminderDate: string;
  isEnabled: boolean;
  daysBefore: number;
}

interface ExamRemindersProps {
  savedExams: string[];
}

export const ExamReminders = ({ savedExams }: ExamRemindersProps) => {
  const { language } = useLanguage();
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const stored = localStorage.getItem('govtJobs_reminders');
    return stored ? JSON.parse(stored) : [];
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem('govtJobs_notifications') === 'true';
  });

  // Get saved exams with upcoming dates
  const savedExamsWithDates = savedExams
    .map(id => governmentExams.find(e => e.id === id))
    .filter(exam => exam && exam.nextExamDate)
    .map(exam => exam!);

  useEffect(() => {
    localStorage.setItem('govtJobs_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('govtJobs_notifications', notificationsEnabled.toString());
  }, [notificationsEnabled]);

  // Check for upcoming reminders
  useEffect(() => {
    if (!notificationsEnabled) return;

    const checkReminders = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      reminders.forEach(reminder => {
        if (!reminder.isEnabled) return;
        
        const examDate = new Date(reminder.examDate);
        const daysUntil = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (daysUntil === reminder.daysBefore) {
          toast.info(
            language === 'ta' 
              ? `📅 ${reminder.examNameTamil} - ${reminder.daysBefore} நாட்களில் தேர்வு!`
              : `📅 ${reminder.examName} - Exam in ${reminder.daysBefore} days!`,
            { duration: 10000 }
          );
        }
      });
    };

    checkReminders();
    const interval = setInterval(checkReminders, 1000 * 60 * 60); // Check every hour
    return () => clearInterval(interval);
  }, [reminders, notificationsEnabled, language]);

  const addReminder = (examId: string, daysBefore: number) => {
    const exam = governmentExams.find(e => e.id === examId);
    if (!exam || !exam.nextExamDate) return;

    const examDate = new Date(exam.nextExamDate);
    const reminderDate = new Date(examDate);
    reminderDate.setDate(reminderDate.getDate() - daysBefore);

    const newReminder: Reminder = {
      examId,
      examName: exam.name,
      examNameTamil: exam.nameTamil,
      examDate: exam.nextExamDate,
      reminderDate: reminderDate.toISOString().split('T')[0],
      isEnabled: true,
      daysBefore,
    };

    setReminders(prev => {
      // Remove existing reminder for same exam and daysBefore
      const filtered = prev.filter(r => !(r.examId === examId && r.daysBefore === daysBefore));
      return [...filtered, newReminder];
    });

    toast.success(
      language === 'ta'
        ? `✅ ${exam.nameTamil} - ${daysBefore} நாட்கள் முன் நினைவூட்டல் அமைக்கப்பட்டது`
        : `✅ Reminder set for ${exam.name} - ${daysBefore} days before`
    );
  };

  const removeReminder = (examId: string, daysBefore: number) => {
    setReminders(prev => prev.filter(r => !(r.examId === examId && r.daysBefore === daysBefore)));
    toast.info(language === 'ta' ? 'நினைவூட்டல் நீக்கப்பட்டது' : 'Reminder removed');
  };

  const toggleReminder = (examId: string, daysBefore: number) => {
    setReminders(prev => prev.map(r => 
      r.examId === examId && r.daysBefore === daysBefore
        ? { ...r, isEnabled: !r.isEnabled }
        : r
    ));
  };

  const hasReminder = (examId: string, daysBefore: number) => {
    return reminders.some(r => r.examId === examId && r.daysBefore === daysBefore);
  };

  const getDaysUntilExam = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDate = new Date(dateStr);
    return Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const reminderOptions = [7, 15, 30];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2 relative"
        >
          {reminders.filter(r => r.isEnabled).length > 0 ? (
            <BellRing className="h-4 w-4 text-amber-600" />
          ) : (
            <Bell className="h-4 w-4" />
          )}
          {language === 'ta' ? 'நினைவூட்டல்கள்' : 'Reminders'}
          {reminders.filter(r => r.isEnabled).length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-amber-500">
              {reminders.filter(r => r.isEnabled).length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <BellRing className="h-5 w-5 text-amber-600" />
            {language === 'ta' ? 'தேர்வு நினைவூட்டல்கள்' : 'Exam Reminders'}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-4">
          <div className="space-y-6 pr-4">
            {/* Notifications Toggle */}
            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {language === 'ta' ? 'அறிவிப்புகள்' : 'Notifications'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {language === 'ta' ? 'தேர்வு நினைவூட்டல்களைப் பெறுங்கள்' : 'Get exam reminders'}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Saved Exams with Dates */}
            {savedExamsWithDates.length === 0 ? (
              <Card className="border-dashed border-2">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">
                    {language === 'ta' 
                      ? 'வரவிருக்கும் தேதிகளுடன் சேமிக்கப்பட்ட தேர்வுகள் இல்லை'
                      : 'No saved exams with upcoming dates'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {language === 'ta'
                      ? 'நினைவூட்டல்களை அமைக்க தேர்வுகளை சேமிக்கவும்'
                      : 'Save exams to set reminders'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700">
                  {language === 'ta' ? 'உங்கள் சேமிக்கப்பட்ட தேர்வுகள்' : 'Your Saved Exams'}
                </h4>
                
                {savedExamsWithDates.map(exam => {
                  const daysUntil = getDaysUntilExam(exam.nextExamDate!);
                  const isPast = daysUntil < 0;

                  return (
                    <Card 
                      key={exam.id}
                      className={`${isPast ? 'opacity-60 bg-gray-50' : 'bg-white'}`}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-start justify-between">
                          <div>
                            <p className="font-semibold">
                              {language === 'ta' ? exam.nameTamil : exam.name}
                            </p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              {formatDate(exam.nextExamDate!)}
                            </div>
                          </div>
                          {!isPast && (
                            <Badge 
                              className={
                                daysUntil <= 7 
                                  ? 'bg-red-100 text-red-700'
                                  : daysUntil <= 30
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-green-100 text-green-700'
                              }
                            >
                              {daysUntil} {language === 'ta' ? 'நாட்கள்' : 'days'}
                            </Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      
                      {!isPast && (
                        <CardContent className="pt-2">
                          <p className="text-xs text-gray-600 mb-2">
                            {language === 'ta' ? 'நினைவூட்டல் அமை:' : 'Set reminder:'}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {reminderOptions.map(days => {
                              const isSet = hasReminder(exam.id, days);
                              const isDisabled = daysUntil < days;

                              return (
                                <Button
                                  key={days}
                                  size="sm"
                                  variant={isSet ? "default" : "outline"}
                                  disabled={isDisabled}
                                  onClick={() => 
                                    isSet 
                                      ? removeReminder(exam.id, days)
                                      : addReminder(exam.id, days)
                                  }
                                  className={`gap-1 ${
                                    isSet 
                                      ? 'bg-amber-500 hover:bg-amber-600' 
                                      : ''
                                  }`}
                                >
                                  {isSet ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <Bell className="h-3 w-3" />
                                  )}
                                  {days} {language === 'ta' ? 'நாட்கள் முன்' : 'days before'}
                                </Button>
                              );
                            })}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Active Reminders */}
            {reminders.length > 0 && (
              <div className="space-y-4 mt-6">
                <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                  <BellRing className="h-4 w-4 text-amber-600" />
                  {language === 'ta' ? 'செயலில் உள்ள நினைவூட்டல்கள்' : 'Active Reminders'}
                </h4>
                
                {reminders.map((reminder, idx) => (
                  <motion.div
                    key={`${reminder.examId}-${reminder.daysBefore}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      reminder.isEnabled 
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={reminder.isEnabled}
                        onCheckedChange={() => toggleReminder(reminder.examId, reminder.daysBefore)}
                      />
                      <div>
                        <p className={`text-sm font-medium ${!reminder.isEnabled && 'text-gray-400'}`}>
                          {language === 'ta' ? reminder.examNameTamil : reminder.examName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {reminder.daysBefore} {language === 'ta' ? 'நாட்கள் முன்' : 'days before'} • {formatDate(reminder.examDate)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeReminder(reminder.examId, reminder.daysBefore)}
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
