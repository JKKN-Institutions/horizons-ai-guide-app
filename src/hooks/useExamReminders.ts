import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export interface ExamReminder {
  id: string;
  universityId: string;
  universityName: string;
  examName: string;
  event: string;
  eventTamil: string;
  date: string;
  reminderDate: string; // ISO date string for when to remind
  reminderTime: string; // HH:mm format
  isActive: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'tn-exam-reminders';
const NOTIFICATION_CHECK_KEY = 'tn-exam-last-notification-check';

export const useExamReminders = () => {
  const [reminders, setReminders] = useState<ExamReminder[]>([]);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  // Load reminders from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setReminders(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse reminders:', e);
      }
    }

    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  }, [reminders]);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      toast.error('Your browser does not support notifications');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        toast.success('Notifications enabled! You will receive exam reminders.');
        return true;
      } else if (permission === 'denied') {
        toast.error('Notifications blocked. Please enable them in browser settings.');
        return false;
      }
      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      toast.error('Failed to request notification permission');
      return false;
    }
  }, []);

  // Add a new reminder
  const addReminder = useCallback((reminder: Omit<ExamReminder, 'id' | 'createdAt' | 'isActive'>) => {
    const newReminder: ExamReminder = {
      ...reminder,
      id: `${reminder.universityId}-${reminder.event}-${Date.now()}`,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    setReminders(prev => {
      // Check if similar reminder already exists
      const exists = prev.some(
        r => r.universityId === reminder.universityId && 
             r.event === reminder.event &&
             r.reminderDate === reminder.reminderDate
      );
      
      if (exists) {
        toast.info('A similar reminder already exists');
        return prev;
      }

      toast.success(`Reminder set for ${reminder.event}`);
      return [...prev, newReminder];
    });

    return newReminder;
  }, []);

  // Remove a reminder
  const removeReminder = useCallback((id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    toast.success('Reminder removed');
  }, []);

  // Toggle reminder active state
  const toggleReminder = useCallback((id: string) => {
    setReminders(prev => 
      prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r)
    );
  }, []);

  // Update reminder
  const updateReminder = useCallback((id: string, updates: Partial<ExamReminder>) => {
    setReminders(prev => 
      prev.map(r => r.id === id ? { ...r, ...updates } : r)
    );
  }, []);

  // Get reminders for a specific university
  const getRemindersForUniversity = useCallback((universityId: string) => {
    return reminders.filter(r => r.universityId === universityId);
  }, [reminders]);

  // Check if reminder exists for an event
  const hasReminder = useCallback((universityId: string, event: string) => {
    return reminders.some(
      r => r.universityId === universityId && r.event === event && r.isActive
    );
  }, [reminders]);

  // Check and trigger due reminders
  const checkDueReminders = useCallback(() => {
    if (notificationPermission !== 'granted') return;

    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Get last check time to avoid duplicate notifications
    const lastCheck = localStorage.getItem(NOTIFICATION_CHECK_KEY);
    const lastCheckDate = lastCheck ? new Date(lastCheck) : new Date(0);

    reminders.forEach(reminder => {
      if (!reminder.isActive) return;
      
      if (reminder.reminderDate === today && reminder.reminderTime <= currentTime) {
        // Check if we've already notified for this reminder today
        const reminderCheckKey = `${reminder.id}-${today}`;
        const alreadyNotified = localStorage.getItem(reminderCheckKey);
        
        if (!alreadyNotified) {
          // Show notification
          new Notification(`📅 Exam Reminder: ${reminder.universityName}`, {
            body: `${reminder.event} - ${reminder.date}\n${reminder.examName}`,
            icon: '/favicon.ico',
            tag: reminder.id,
            requireInteraction: true,
          });

          // Mark as notified for today
          localStorage.setItem(reminderCheckKey, 'true');
        }
      }
    });

    localStorage.setItem(NOTIFICATION_CHECK_KEY, now.toISOString());
  }, [reminders, notificationPermission]);

  // Set up periodic check for due reminders
  useEffect(() => {
    // Check immediately
    checkDueReminders();

    // Check every minute
    const interval = setInterval(checkDueReminders, 60000);

    return () => clearInterval(interval);
  }, [checkDueReminders]);

  // Clear old/past reminders
  const clearPastReminders = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    setReminders(prev => prev.filter(r => r.reminderDate >= today));
  }, []);

  return {
    reminders,
    notificationPermission,
    requestPermission,
    addReminder,
    removeReminder,
    toggleReminder,
    updateReminder,
    getRemindersForUniversity,
    hasReminder,
    clearPastReminders,
  };
};
