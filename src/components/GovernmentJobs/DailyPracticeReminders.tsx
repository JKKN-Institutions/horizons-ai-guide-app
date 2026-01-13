import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bell, 
  BellRing, 
  Clock, 
  Target, 
  Trash2, 
  Plus,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Flame
} from 'lucide-react';
import { toast } from 'sonner';

interface Reminder {
  id: string;
  title: string;
  time: string;
  days: string[];
  category: string;
  isActive: boolean;
  createdAt: Date;
}

import { Language } from '@/hooks/useLanguage';

interface DailyPracticeRemindersProps {
  language?: Language;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAYS_TA = ['திங்', 'செவ்', 'புத', 'வியா', 'வெள்', 'சனி', 'ஞாயி'];

const categoryOptions = [
  { value: 'gk', label: 'General Knowledge', labelTa: 'பொது அறிவு' },
  { value: 'math', label: 'Mathematics', labelTa: 'கணிதம்' },
  { value: 'reasoning', label: 'Reasoning', labelTa: 'பகுத்தறிவு' },
  { value: 'english', label: 'English', labelTa: 'ஆங்கிலம்' },
  { value: 'current', label: 'Current Affairs', labelTa: 'நடப்பு நிகழ்வுகள்' },
  { value: 'mock', label: 'Mock Test', labelTa: 'போலி தேர்வு' }
];

export const DailyPracticeReminders = ({ language = 'en' }: DailyPracticeRemindersProps) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    time: '09:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    category: 'gk'
  });

  // Load reminders from localStorage
  useEffect(() => {
    const savedReminders = localStorage.getItem('govtExamReminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
    const savedNotifications = localStorage.getItem('govtExamNotificationsEnabled');
    if (savedNotifications) {
      setNotificationsEnabled(JSON.parse(savedNotifications));
    }
    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // Save reminders to localStorage
  useEffect(() => {
    localStorage.setItem('govtExamReminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('govtExamNotificationsEnabled', JSON.stringify(notificationsEnabled));
  }, [notificationsEnabled]);

  // Check and trigger notifications
  useEffect(() => {
    if (!notificationsEnabled || notificationPermission !== 'granted') return;

    const checkReminders = () => {
      const now = new Date();
      const currentDay = DAYS[now.getDay() === 0 ? 6 : now.getDay() - 1];
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      reminders.forEach(reminder => {
        if (reminder.isActive && reminder.days.includes(currentDay) && reminder.time === currentTime) {
          showNotification(reminder);
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [reminders, notificationsEnabled, notificationPermission]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        toast.success(language === 'ta' ? 'அறிவிப்புகள் இயக்கப்பட்டன!' : 'Notifications enabled!');
      } else {
        toast.error(language === 'ta' ? 'அறிவிப்பு அனுமதி மறுக்கப்பட்டது' : 'Notification permission denied');
      }
    } else {
      toast.error(language === 'ta' ? 'இந்த உலாவியில் அறிவிப்புகள் ஆதரிக்கப்படவில்லை' : 'Notifications not supported in this browser');
    }
  };

  const showNotification = (reminder: Reminder) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(
        language === 'ta' ? '📚 பயிற்சி நேரம்!' : '📚 Practice Time!',
        {
          body: reminder.title,
          icon: '/favicon.ico',
          tag: reminder.id,
          requireInteraction: true
        }
      );

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  };

  const addReminder = () => {
    if (!newReminder.title.trim()) {
      toast.error(language === 'ta' ? 'தலைப்பை உள்ளிடவும்' : 'Please enter a title');
      return;
    }
    if (newReminder.days.length === 0) {
      toast.error(language === 'ta' ? 'குறைந்தது ஒரு நாளையாவது தேர்ந்தெடுக்கவும்' : 'Please select at least one day');
      return;
    }

    const reminder: Reminder = {
      id: Date.now().toString(),
      title: newReminder.title,
      time: newReminder.time,
      days: newReminder.days,
      category: newReminder.category,
      isActive: true,
      createdAt: new Date()
    };

    setReminders(prev => [...prev, reminder]);
    setNewReminder({ title: '', time: '09:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], category: 'gk' });
    setShowAddForm(false);
    toast.success(language === 'ta' ? 'நினைவூட்டல் சேர்க்கப்பட்டது!' : 'Reminder added!');
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => 
      r.id === id ? { ...r, isActive: !r.isActive } : r
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    toast.success(language === 'ta' ? 'நினைவூட்டல் நீக்கப்பட்டது' : 'Reminder deleted');
  };

  const toggleDay = (day: string) => {
    setNewReminder(prev => ({
      ...prev,
      days: prev.days.includes(day) 
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const activeReminders = reminders.filter(r => r.isActive).length;
  const getCategoryLabel = (value: string) => {
    const cat = categoryOptions.find(c => c.value === value);
    return language === 'ta' ? cat?.labelTa : cat?.label;
  };

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-500 rounded-lg">
              <BellRing className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">
                {language === 'ta' ? 'தினசரி பயிற்சி நினைவூட்டல்கள்' : 'Daily Practice Reminders'}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'ta' 
                  ? `${activeReminders} செயலில் உள்ள நினைவூட்டல்கள்`
                  : `${activeReminders} Active Reminders`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {notificationPermission !== 'granted' ? (
              <Button 
                size="sm" 
                onClick={requestNotificationPermission}
                className="bg-violet-500 hover:bg-violet-600"
              >
                <Bell className="h-4 w-4 mr-1" />
                {language === 'ta' ? 'இயக்கு' : 'Enable'}
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                  className="data-[state=checked]:bg-violet-500"
                />
                <Label className="text-sm">
                  {notificationsEnabled 
                    ? (language === 'ta' ? 'ஆன்' : 'On')
                    : (language === 'ta' ? 'ஆஃப்' : 'Off')}
                </Label>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Notification Status */}
        {notificationPermission !== 'granted' && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">
              {language === 'ta' 
                ? 'நினைவூட்டல்களைப் பெற அறிவிப்புகளை இயக்கவும்'
                : 'Enable notifications to receive reminders'}
            </span>
          </div>
        )}

        {notificationPermission === 'granted' && notificationsEnabled && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm">
              {language === 'ta' 
                ? 'அறிவிப்புகள் செயலில் உள்ளன! நீங்கள் நினைவூட்டல்களைப் பெறுவீர்கள்.'
                : 'Notifications active! You\'ll receive reminders on schedule.'}
            </span>
          </div>
        )}

        {/* Add New Reminder Form */}
        <AnimatePresence>
          {showAddForm ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <Card className="p-4 bg-white dark:bg-gray-800">
                <div className="space-y-4">
                  <div>
                    <Label>{language === 'ta' ? 'தலைப்பு' : 'Title'}</Label>
                    <Input
                      placeholder={language === 'ta' ? 'எ.கா., GK பயிற்சி' : 'e.g., GK Practice'}
                      value={newReminder.title}
                      onChange={e => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{language === 'ta' ? 'நேரம்' : 'Time'}</Label>
                      <Input
                        type="time"
                        value={newReminder.time}
                        onChange={e => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>{language === 'ta' ? 'வகை' : 'Category'}</Label>
                      <Select 
                        value={newReminder.category} 
                        onValueChange={v => setNewReminder(prev => ({ ...prev, category: v }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map(cat => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {language === 'ta' ? cat.labelTa : cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>{language === 'ta' ? 'நாட்கள்' : 'Days'}</Label>
                    <div className="flex gap-1 mt-2">
                      {DAYS.map((day, idx) => (
                        <Button
                          key={day}
                          size="sm"
                          variant={newReminder.days.includes(day) ? 'default' : 'outline'}
                          onClick={() => toggleDay(day)}
                          className={`flex-1 text-xs px-1 ${
                            newReminder.days.includes(day) 
                              ? 'bg-violet-500 hover:bg-violet-600' 
                              : ''
                          }`}
                        >
                          {language === 'ta' ? DAYS_TA[idx] : day}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-violet-500 hover:bg-violet-600"
                      onClick={addReminder}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      {language === 'ta' ? 'சேர்' : 'Add'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowAddForm(false)}
                    >
                      {language === 'ta' ? 'ரத்து' : 'Cancel'}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            <Button
              variant="outline"
              className="w-full border-dashed border-2 border-violet-300 hover:border-violet-500 hover:bg-violet-50"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              {language === 'ta' ? 'புதிய நினைவூட்டல் சேர்' : 'Add New Reminder'}
            </Button>
          )}
        </AnimatePresence>

        {/* Reminders List */}
        <ScrollArea className="h-[280px]">
          <div className="space-y-3">
            {reminders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>{language === 'ta' ? 'நினைவூட்டல்கள் இல்லை' : 'No reminders yet'}</p>
                <p className="text-sm mt-1">
                  {language === 'ta' 
                    ? 'உங்கள் தினசரி பயிற்சி அட்டவணையை அமைக்கவும்'
                    : 'Set up your daily practice schedule'}
                </p>
              </div>
            ) : (
              reminders.map(reminder => (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Card className={`p-4 ${reminder.isActive ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-900 opacity-60'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{reminder.title}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {getCategoryLabel(reminder.category)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {reminder.time}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Target className="h-3 w-3" />
                            {reminder.days.length} {language === 'ta' ? 'நாட்கள்' : 'days'}
                          </span>
                        </div>

                        <div className="flex gap-1 mt-2">
                          {DAYS.map((day, idx) => (
                            <span
                              key={day}
                              className={`text-xs px-1.5 py-0.5 rounded ${
                                reminder.days.includes(day)
                                  ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300'
                                  : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
                              }`}
                            >
                              {language === 'ta' ? DAYS_TA[idx] : day}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Switch
                          checked={reminder.isActive}
                          onCheckedChange={() => toggleReminder(reminder.id)}
                          className="data-[state=checked]:bg-violet-500"
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteReminder(reminder.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t">
          <div className="text-center p-3 rounded-lg bg-white/60 dark:bg-gray-800/60">
            <div className="text-2xl font-bold text-violet-600">{reminders.length}</div>
            <div className="text-xs text-muted-foreground">
              {language === 'ta' ? 'மொத்தம்' : 'Total'}
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/60 dark:bg-gray-800/60">
            <div className="text-2xl font-bold text-violet-600">{activeReminders}</div>
            <div className="text-xs text-muted-foreground">
              {language === 'ta' ? 'செயலில்' : 'Active'}
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/60 dark:bg-gray-800/60">
            <div className="flex items-center justify-center gap-1">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="text-2xl font-bold text-violet-600">
                {reminders.reduce((sum, r) => sum + r.days.length, 0)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {language === 'ta' ? 'வாராந்திர' : 'Weekly'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
