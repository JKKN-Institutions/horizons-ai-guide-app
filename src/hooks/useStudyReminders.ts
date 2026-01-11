import { useState, useEffect, useCallback } from 'react';

interface ReminderSettings {
  enabled: boolean;
  studyTime: string; // HH:MM format
  reminderMinutesBefore: number;
  selectedDays: number[]; // 0 = Sunday, 1 = Monday, etc.
  examName: string;
}

interface ScheduledReminder {
  id: string;
  dayNumber: number;
  date: string;
  scheduledTime: Date;
  topics: string[];
  notified: boolean;
}

const STORAGE_KEY = 'pyq_study_reminders';
const SCHEDULED_KEY = 'pyq_scheduled_reminders';

export const useStudyReminders = () => {
  const [settings, setSettings] = useState<ReminderSettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return getDefaultSettings();
      }
    }
    return getDefaultSettings();
  });

  const [scheduledReminders, setScheduledReminders] = useState<ScheduledReminder[]>(() => {
    const stored = localStorage.getItem(SCHEDULED_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');

  function getDefaultSettings(): ReminderSettings {
    return {
      enabled: false,
      studyTime: '18:00',
      reminderMinutesBefore: 15,
      selectedDays: [1, 2, 3, 4, 5, 6], // Monday to Saturday
      examName: ''
    };
  }

  // Check notification permission on mount
  useEffect(() => {
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Save scheduled reminders to localStorage
  useEffect(() => {
    localStorage.setItem(SCHEDULED_KEY, JSON.stringify(scheduledReminders));
  }, [scheduledReminders]);

  // Request notification permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.log('Notifications not supported');
      return false;
    }

    if (Notification.permission === 'granted') {
      setPermissionStatus('granted');
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
      return permission === 'granted';
    }

    setPermissionStatus('denied');
    return false;
  }, []);

  // Send a notification
  const sendNotification = useCallback((title: string, body: string, tag?: string) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    const notification = new Notification(title, {
      body,
      icon: '/favicon.ico',
      tag: tag || 'study-reminder',
      requireInteraction: false,
      silent: false
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    // Auto close after 10 seconds
    setTimeout(() => notification.close(), 10000);
  }, []);

  // Update settings
  const updateSettings = useCallback((updates: Partial<ReminderSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  // Enable reminders with permission check
  const enableReminders = useCallback(async (): Promise<boolean> => {
    const granted = await requestPermission();
    if (granted) {
      updateSettings({ enabled: true });
      return true;
    }
    return false;
  }, [requestPermission, updateSettings]);

  // Disable reminders
  const disableReminders = useCallback(() => {
    updateSettings({ enabled: false });
    setScheduledReminders([]);
  }, [updateSettings]);

  // Schedule reminders based on study plan
  const scheduleReminders = useCallback((schedule: {
    day: number;
    date: string;
    topics: { topicName: string }[];
  }[]) => {
    if (!settings.enabled) return;

    const [hours, minutes] = settings.studyTime.split(':').map(Number);
    const reminderOffset = settings.reminderMinutesBefore * 60 * 1000;
    
    const newReminders: ScheduledReminder[] = schedule.map((day, idx) => {
      const dayDate = new Date();
      dayDate.setDate(dayDate.getDate() + idx);
      dayDate.setHours(hours, minutes, 0, 0);
      
      const reminderTime = new Date(dayDate.getTime() - reminderOffset);
      
      return {
        id: `reminder-${day.day}-${Date.now()}`,
        dayNumber: day.day,
        date: day.date,
        scheduledTime: reminderTime,
        topics: day.topics.map(t => t.topicName),
        notified: false
      };
    });

    setScheduledReminders(newReminders);
  }, [settings.enabled, settings.studyTime, settings.reminderMinutesBefore]);

  // Check and trigger due reminders
  useEffect(() => {
    if (!settings.enabled || scheduledReminders.length === 0) return;

    const checkReminders = () => {
      const now = new Date();
      
      scheduledReminders.forEach(reminder => {
        if (reminder.notified) return;
        
        const reminderTime = new Date(reminder.scheduledTime);
        const timeDiff = reminderTime.getTime() - now.getTime();
        
        // Trigger if within 1 minute of scheduled time
        if (timeDiff <= 60000 && timeDiff > -60000) {
          const topicsList = reminder.topics.slice(0, 2).join(', ');
          const moreTopics = reminder.topics.length > 2 ? ` +${reminder.topics.length - 2} more` : '';
          
          sendNotification(
            `📚 Study Time in ${settings.reminderMinutesBefore} minutes!`,
            `Day ${reminder.dayNumber}: ${topicsList}${moreTopics}`,
            `reminder-${reminder.id}`
          );
          
          // Mark as notified
          setScheduledReminders(prev => 
            prev.map(r => r.id === reminder.id ? { ...r, notified: true } : r)
          );
        }
      });
    };

    // Check every 30 seconds
    const interval = setInterval(checkReminders, 30000);
    checkReminders(); // Check immediately

    return () => clearInterval(interval);
  }, [settings.enabled, settings.reminderMinutesBefore, scheduledReminders, sendNotification]);

  // Get next scheduled reminder
  const getNextReminder = useCallback((): ScheduledReminder | null => {
    const now = new Date();
    const upcoming = scheduledReminders
      .filter(r => !r.notified && new Date(r.scheduledTime) > now)
      .sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime());
    
    return upcoming[0] || null;
  }, [scheduledReminders]);

  // Test notification
  const testNotification = useCallback(() => {
    sendNotification(
      '🎉 Test Notification',
      'Study reminders are working! You\'ll receive reminders before each study session.',
      'test-notification'
    );
  }, [sendNotification]);

  // Clear all reminders
  const clearReminders = useCallback(() => {
    setScheduledReminders([]);
  }, []);

  return {
    settings,
    updateSettings,
    permissionStatus,
    requestPermission,
    enableReminders,
    disableReminders,
    scheduleReminders,
    scheduledReminders,
    getNextReminder,
    testNotification,
    clearReminders,
    sendNotification
  };
};
