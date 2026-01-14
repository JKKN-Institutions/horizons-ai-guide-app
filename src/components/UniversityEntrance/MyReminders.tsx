import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Bell, 
  BellOff, 
  Calendar, 
  Clock, 
  Trash2, 
  ArrowLeft,
  BellRing,
  CheckCircle2,
  Settings
} from 'lucide-react';
import { useExamReminders } from '@/hooks/useExamReminders';
import { format, isPast, parseISO } from 'date-fns';

const MyReminders = () => {
  const navigate = useNavigate();
  const { 
    reminders, 
    removeReminder, 
    toggleReminder, 
    notificationPermission,
    requestPermission,
    clearPastReminders 
  } = useExamReminders();

  const activeReminders = reminders.filter(r => r.isActive);
  const inactiveReminders = reminders.filter(r => !r.isActive);
  const pastReminders = reminders.filter(r => isPast(parseISO(r.reminderDate)));

  const handleEnableNotifications = async () => {
    await requestPermission();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/tn-university-entrance/exam-calendar')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                My Reminders
              </h1>
              <p className="text-sm text-muted-foreground">என் நினைவூட்டல்கள்</p>
            </div>
            {pastReminders.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Clear Past
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear Past Reminders?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove {pastReminders.length} reminder(s) that have already passed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={clearPastReminders}>
                      Clear
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-6">
        {/* Notification Permission Banner */}
        {notificationPermission !== 'granted' && (
          <Card className="mb-6 border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <BellOff className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-amber-800">Notifications Not Enabled</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    Enable notifications to receive exam reminders on time.
                  </p>
                </div>
                <Button 
                  size="sm" 
                  onClick={handleEnableNotifications}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  Enable
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-primary">
                {activeReminders.length}
              </div>
              <div className="text-xs text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-muted-foreground">
                {inactiveReminders.length}
              </div>
              <div className="text-xs text-muted-foreground">Paused</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-green-600">
                {reminders.length}
              </div>
              <div className="text-xs text-muted-foreground">Total</div>
            </CardContent>
          </Card>
        </div>

        {/* Reminders List */}
        {reminders.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-medium mb-1">No Reminders Set</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Go to the Exam Calendar to set reminders for important dates
              </p>
              <Button onClick={() => navigate('/tn-university-entrance/exam-calendar')}>
                <Calendar className="w-4 h-4 mr-2" />
                View Exam Calendar
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {reminders
              .sort((a, b) => new Date(a.reminderDate).getTime() - new Date(b.reminderDate).getTime())
              .map(reminder => {
                const reminderDate = parseISO(reminder.reminderDate);
                const isPastReminder = isPast(reminderDate);

                return (
                  <Card 
                    key={reminder.id}
                    className={`transition-all ${!reminder.isActive ? 'opacity-60' : ''} ${isPastReminder ? 'border-muted' : ''}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Status Icon */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          isPastReminder 
                            ? 'bg-green-100 text-green-600' 
                            : reminder.isActive 
                              ? 'bg-primary/10 text-primary' 
                              : 'bg-muted text-muted-foreground'
                        }`}>
                          {isPastReminder ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <BellRing className="w-5 h-5" />
                          )}
                        </div>

                        {/* Reminder Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-medium">{reminder.event}</h3>
                              <p className="text-xs text-muted-foreground">{reminder.eventTamil}</p>
                            </div>
                            {isPastReminder ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Completed
                              </Badge>
                            ) : (
                              <Switch
                                checked={reminder.isActive}
                                onCheckedChange={() => toggleReminder(reminder.id)}
                              />
                            )}
                          </div>

                          <div className="mt-2 text-sm text-primary font-medium">
                            {reminder.universityName}
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {format(reminderDate, 'MMM d, yyyy')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {reminder.reminderTime}
                            </span>
                          </div>

                          <div className="mt-2 text-xs text-muted-foreground">
                            Event: {reminder.date}
                          </div>
                        </div>

                        {/* Delete Button */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Reminder?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the reminder for "{reminder.event}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => removeReminder(reminder.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        )}

        {/* Tips Card */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4" />
              Tips
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Keep browser notifications enabled for timely alerts</li>
              <li>• Set reminders at least 1 week before application deadlines</li>
              <li>• You can pause reminders without deleting them</li>
              <li>• Reminders work even when the app is closed (if notifications are enabled)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyReminders;
