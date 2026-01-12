import React, { useState, useCallback } from 'react';
import { Bell, BellOff, Clock, Calendar, Volume2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface ReminderSettings {
  enabled: boolean;
  studyTime: string;
  reminderMinutesBefore: number;
  selectedDays: number[];
  examName: string;
}

interface NextReminder {
  dayNumber: number;
  date: string;
  scheduledTime: Date;
  topics: string[];
}

interface StudyReminderSettingsProps {
  language: 'en' | 'ta';
  settings: ReminderSettings;
  permissionStatus: NotificationPermission;
  onUpdateSettings: (updates: Partial<ReminderSettings>) => void;
  onEnableReminders: () => Promise<boolean>;
  onDisableReminders: () => void;
  onTestNotification: () => void;
  nextReminder: NextReminder | null;
}

const DAYS_OF_WEEK = [
  { en: 'Sun', ta: 'ஞாயி', value: 0 },
  { en: 'Mon', ta: 'திங்', value: 1 },
  { en: 'Tue', ta: 'செவ்', value: 2 },
  { en: 'Wed', ta: 'புத', value: 3 },
  { en: 'Thu', ta: 'வியா', value: 4 },
  { en: 'Fri', ta: 'வெள்', value: 5 },
  { en: 'Sat', ta: 'சனி', value: 6 },
];

const REMINDER_INTERVALS = [5, 10, 15, 30, 60];

const translations = {
  en: {
    title: 'Study Reminders',
    description: 'Get notified before your study sessions',
    enableReminders: 'Enable Reminders',
    disableReminders: 'Disable Reminders',
    studyTime: 'Daily Study Time',
    reminderBefore: 'Remind me before',
    minutes: 'minutes',
    selectDays: 'Study Days',
    testNotification: 'Test Notification',
    nextReminder: 'Next Reminder',
    permissionDenied: 'Notifications blocked. Please enable in browser settings.',
    permissionPending: 'Click enable to allow notifications',
    noUpcoming: 'No upcoming reminders',
    at: 'at',
    day: 'Day',
  },
  ta: {
    title: 'படிப்பு நினைவூட்டல்கள்',
    description: 'உங்கள் படிப்பு நேரத்திற்கு முன் அறிவிக்கப்படும்',
    enableReminders: 'நினைவூட்டல்களை இயக்கு',
    disableReminders: 'நினைவூட்டல்களை நிறுத்து',
    studyTime: 'தினசரி படிப்பு நேரம்',
    reminderBefore: 'முன்கூட்டியே நினைவூட்டு',
    minutes: 'நிமிடங்கள்',
    selectDays: 'படிப்பு நாட்கள்',
    testNotification: 'சோதனை அறிவிப்பு',
    nextReminder: 'அடுத்த நினைவூட்டல்',
    permissionDenied: 'அறிவிப்புகள் தடுக்கப்பட்டுள்ளன. உலாவி அமைப்புகளில் இயக்கவும்.',
    permissionPending: 'அறிவிப்புகளை அனுமதிக்க இயக்கு என்பதைக் கிளிக் செய்யவும்',
    noUpcoming: 'வரவிருக்கும் நினைவூட்டல்கள் இல்லை',
    at: 'மணிக்கு',
    day: 'நாள்',
  },
};

export const StudyReminderSettings: React.FC<StudyReminderSettingsProps> = ({
  language,
  settings,
  permissionStatus,
  onUpdateSettings,
  onEnableReminders,
  onDisableReminders,
  onTestNotification,
  nextReminder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnabling, setIsEnabling] = useState(false);
  const t = translations[language];

  const handleEnableClick = useCallback(async () => {
    setIsEnabling(true);
    try {
      await onEnableReminders();
    } finally {
      setIsEnabling(false);
    }
  }, [onEnableReminders]);

  const toggleDay = useCallback((dayValue: number) => {
    const newDays = settings.selectedDays.includes(dayValue)
      ? settings.selectedDays.filter(d => d !== dayValue)
      : [...settings.selectedDays, dayValue].sort((a, b) => a - b);
    onUpdateSettings({ selectedDays: newDays });
  }, [settings.selectedDays, onUpdateSettings]);

  const formatTime = useCallback((date: Date) => {
    return new Date(date).toLocaleTimeString(language === 'ta' ? 'ta-IN' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [language]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-primary/5 transition-colors rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {settings.enabled ? (
                  <div className="p-2 rounded-full bg-primary/20">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                ) : (
                  <div className="p-2 rounded-full bg-muted">
                    <BellOff className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <CardTitle className="text-base">{t.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {settings.enabled && (
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    <Clock className="h-3 w-3 mr-1" />
                    {settings.studyTime}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-6 pt-2">
            {/* Permission Status */}
            {permissionStatus === 'denied' && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{t.permissionDenied}</span>
              </div>
            )}

            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch
                  checked={settings.enabled}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleEnableClick();
                    } else {
                      onDisableReminders();
                    }
                  }}
                  disabled={isEnabling || permissionStatus === 'denied'}
                />
                <Label className="font-medium">
                  {settings.enabled ? t.disableReminders : t.enableReminders}
                </Label>
              </div>
              {settings.enabled && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onTestNotification}
                  className="gap-2"
                >
                  <Volume2 className="h-4 w-4" />
                  {t.testNotification}
                </Button>
              )}
            </div>

            {settings.enabled && (
              <>
                {/* Study Time */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    {t.studyTime}
                  </Label>
                  <Input
                    type="time"
                    value={settings.studyTime}
                    onChange={(e) => onUpdateSettings({ studyTime: e.target.value })}
                    className="w-full max-w-[200px]"
                  />
                </div>

                {/* Reminder Before */}
                <div className="space-y-2">
                  <Label>{t.reminderBefore}</Label>
                  <div className="flex flex-wrap gap-2">
                    {REMINDER_INTERVALS.map((interval) => (
                      <Button
                        key={interval}
                        variant={settings.reminderMinutesBefore === interval ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onUpdateSettings({ reminderMinutesBefore: interval })}
                        className="min-w-[60px]"
                      >
                        {interval} {t.minutes.slice(0, 3)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Study Days */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    {t.selectDays}
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS_OF_WEEK.map((day) => (
                      <Button
                        key={day.value}
                        variant={settings.selectedDays.includes(day.value) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleDay(day.value)}
                        className={cn(
                          "min-w-[50px]",
                          settings.selectedDays.includes(day.value) && "bg-primary"
                        )}
                      >
                        {day[language]}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Next Reminder */}
                <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {t.nextReminder}
                  </Label>
                  {nextReminder ? (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {t.day} {nextReminder.dayNumber} - {formatTime(nextReminder.scheduledTime)}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {nextReminder.topics.slice(0, 2).join(', ')}
                        {nextReminder.topics.length > 2 && ` +${nextReminder.topics.length - 2} more`}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">{t.noUpcoming}</p>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
