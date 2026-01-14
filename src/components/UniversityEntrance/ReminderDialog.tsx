import { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Bell, Calendar, Clock, BellRing } from 'lucide-react';
import { useExamReminders } from '@/hooks/useExamReminders';

interface ReminderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventData: {
    universityId: string;
    universityName: string;
    examName: string;
    event: string;
    eventTamil: string;
    date: string;
  } | null;
}

const ReminderDialog = ({ open, onOpenChange, eventData }: ReminderDialogProps) => {
  const { addReminder, requestPermission, notificationPermission } = useExamReminders();
  const [reminderOption, setReminderOption] = useState('1day');
  const [customDate, setCustomDate] = useState('');
  const [reminderTime, setReminderTime] = useState('09:00');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!eventData) return null;

  // Parse the event date to get a reference date
  const getEventDate = () => {
    // Try to parse dates like "January 2026" or "March 2026 (Last Saturday)"
    const monthMatch = eventData.date.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s*(\d{4})?/);
    if (monthMatch) {
      const month = monthMatch[1];
      const year = monthMatch[2] || '2026';
      const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
      // Default to 15th of the month
      return new Date(parseInt(year), monthIndex, 15);
    }
    return new Date();
  };

  const eventDate = getEventDate();

  const getReminderDate = () => {
    switch (reminderOption) {
      case '1day':
        return format(subDays(eventDate, 1), 'yyyy-MM-dd');
      case '3days':
        return format(subDays(eventDate, 3), 'yyyy-MM-dd');
      case '1week':
        return format(subDays(eventDate, 7), 'yyyy-MM-dd');
      case '2weeks':
        return format(subDays(eventDate, 14), 'yyyy-MM-dd');
      case 'custom':
        return customDate;
      default:
        return format(subDays(eventDate, 1), 'yyyy-MM-dd');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Request permission if not granted
    if (notificationPermission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) {
        setIsSubmitting(false);
        return;
      }
    }

    const reminderDate = getReminderDate();

    addReminder({
      universityId: eventData.universityId,
      universityName: eventData.universityName,
      examName: eventData.examName,
      event: eventData.event,
      eventTamil: eventData.eventTamil,
      date: eventData.date,
      reminderDate,
      reminderTime,
    });

    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Set Reminder
          </DialogTitle>
          <DialogDescription>
            Get notified about this exam event
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Event Info */}
          <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="font-medium">{eventData.event}</div>
            <div className="text-sm text-muted-foreground">{eventData.eventTamil}</div>
            <div className="text-sm mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {eventData.date}
            </div>
            <div className="text-sm text-primary mt-1">
              {eventData.universityName} • {eventData.examName}
            </div>
          </div>

          {/* Reminder Options */}
          <div className="space-y-3">
            <Label>Remind me</Label>
            <RadioGroup value={reminderOption} onValueChange={setReminderOption}>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="1day" />
                  <span className="text-sm">1 day before</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="3days" />
                  <span className="text-sm">3 days before</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="1week" />
                  <span className="text-sm">1 week before</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="2weeks" />
                  <span className="text-sm">2 weeks before</span>
                </label>
              </div>
              <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                <RadioGroupItem value="custom" />
                <span className="text-sm">Custom date</span>
              </label>
            </RadioGroup>

            {reminderOption === 'custom' && (
              <div className="space-y-2">
                <Label htmlFor="custom-date">Select Date</Label>
                <Input
                  id="custom-date"
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  min={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
            )}
          </div>

          {/* Reminder Time */}
          <div className="space-y-2">
            <Label htmlFor="reminder-time" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Reminder Time
            </Label>
            <Input
              id="reminder-time"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
            />
          </div>

          {/* Permission Warning */}
          {notificationPermission === 'denied' && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
              ⚠️ Notifications are blocked. Please enable them in your browser settings to receive reminders.
            </div>
          )}

          {notificationPermission === 'default' && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700">
              💡 We'll ask for notification permission when you set the reminder.
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || (reminderOption === 'custom' && !customDate)}
            className="gap-2"
          >
            <BellRing className="w-4 h-4" />
            {isSubmitting ? 'Setting...' : 'Set Reminder'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReminderDialog;
