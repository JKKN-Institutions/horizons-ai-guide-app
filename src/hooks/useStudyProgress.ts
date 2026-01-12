import { useState, useEffect, useCallback } from 'react';

interface TopicProgress {
  topicId: string;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

interface DayProgress {
  dayNumber: number;
  date: string;
  topics: TopicProgress[];
  completedAt?: string;
}

interface StudyProgress {
  examId: string;
  planGeneratedAt: string;
  totalDays: number;
  completedDays: number;
  totalTopics: number;
  completedTopics: number;
  days: DayProgress[];
  lastUpdated: string;
  celebratedMilestones: number[];
}

const STORAGE_KEY = 'pyq_study_progress';
const MILESTONES = [25, 50, 75, 100] as const;
type Milestone = typeof MILESTONES[number];

export const useStudyProgress = (examId: string) => {
  const [progress, setProgress] = useState<StudyProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingMilestone, setPendingMilestone] = useState<Milestone | null>(null);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const allProgress: Record<string, StudyProgress> = JSON.parse(stored);
        if (allProgress[examId]) {
          // Ensure celebratedMilestones exists for older data
          const loadedProgress = allProgress[examId];
          if (!loadedProgress.celebratedMilestones) {
            loadedProgress.celebratedMilestones = [];
          }
          setProgress(loadedProgress);
        }
      }
    } catch (error) {
      console.error('Error loading study progress:', error);
    } finally {
      setIsLoading(false);
    }
  }, [examId]);

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress: StudyProgress) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const allProgress: Record<string, StudyProgress> = stored ? JSON.parse(stored) : {};
      allProgress[examId] = { ...newProgress, lastUpdated: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
      setProgress(allProgress[examId]);
    } catch (error) {
      console.error('Error saving study progress:', error);
    }
  }, [examId]);

  // Check for new milestones
  const checkMilestone = useCallback((completedTopics: number, totalTopics: number, celebratedMilestones: number[]): Milestone | null => {
    if (totalTopics === 0) return null;
    
    const percentage = Math.round((completedTopics / totalTopics) * 100);
    
    for (const milestone of MILESTONES) {
      if (percentage >= milestone && !celebratedMilestones.includes(milestone)) {
        return milestone;
      }
    }
    return null;
  }, []);

  // Initialize progress for a new plan
  const initializeProgress = useCallback((schedule: { day: number; date: string; topics: { topicId: string }[] }[]) => {
    const newProgress: StudyProgress = {
      examId,
      planGeneratedAt: new Date().toISOString(),
      totalDays: schedule.length,
      completedDays: 0,
      totalTopics: schedule.reduce((sum, day) => sum + day.topics.length, 0),
      completedTopics: 0,
      days: schedule.map(day => ({
        dayNumber: day.day,
        date: day.date,
        topics: day.topics.map(t => ({
          topicId: t.topicId,
          completed: false
        }))
      })),
      lastUpdated: new Date().toISOString(),
      celebratedMilestones: []
    };
    saveProgress(newProgress);
    return newProgress;
  }, [examId, saveProgress]);

  // Toggle topic completion
  const toggleTopicComplete = useCallback((dayNumber: number, topicId: string) => {
    if (!progress) return;

    const updatedDays = progress.days.map(day => {
      if (day.dayNumber !== dayNumber) return day;
      
      return {
        ...day,
        topics: day.topics.map(topic => {
          if (topic.topicId !== topicId) return topic;
          
          return {
            ...topic,
            completed: !topic.completed,
            completedAt: !topic.completed ? new Date().toISOString() : undefined
          };
        })
      };
    });

    // Recalculate completed counts
    let completedTopics = 0;
    let completedDays = 0;

    updatedDays.forEach(day => {
      const allTopicsCompleted = day.topics.every(t => t.completed);
      const dayCompletedTopics = day.topics.filter(t => t.completed).length;
      completedTopics += dayCompletedTopics;
      
      if (allTopicsCompleted && day.topics.length > 0) {
        completedDays++;
        if (!day.completedAt) {
          day.completedAt = new Date().toISOString();
        }
      } else {
        day.completedAt = undefined;
      }
    });

    // Check for new milestones
    const newMilestone = checkMilestone(completedTopics, progress.totalTopics, progress.celebratedMilestones);
    let updatedCelebratedMilestones = progress.celebratedMilestones;
    
    if (newMilestone) {
      updatedCelebratedMilestones = [...progress.celebratedMilestones, newMilestone];
      setPendingMilestone(newMilestone);
    }

    saveProgress({
      ...progress,
      days: updatedDays,
      completedDays,
      completedTopics,
      celebratedMilestones: updatedCelebratedMilestones
    });
  }, [progress, saveProgress, checkMilestone]);

  // Mark entire day as complete/incomplete
  const toggleDayComplete = useCallback((dayNumber: number) => {
    if (!progress) return;

    const dayIndex = progress.days.findIndex(d => d.dayNumber === dayNumber);
    if (dayIndex === -1) return;

    const day = progress.days[dayIndex];
    const allCompleted = day.topics.every(t => t.completed);
    const newCompletedState = !allCompleted;

    const updatedDays = [...progress.days];
    updatedDays[dayIndex] = {
      ...day,
      completedAt: newCompletedState ? new Date().toISOString() : undefined,
      topics: day.topics.map(topic => ({
        ...topic,
        completed: newCompletedState,
        completedAt: newCompletedState ? new Date().toISOString() : undefined
      }))
    };

    // Recalculate completed counts
    let completedTopics = 0;
    let completedDays = 0;

    updatedDays.forEach(d => {
      const allTopicsCompleted = d.topics.every(t => t.completed);
      completedTopics += d.topics.filter(t => t.completed).length;
      if (allTopicsCompleted && d.topics.length > 0) {
        completedDays++;
      }
    });

    // Check for new milestones
    const newMilestone = checkMilestone(completedTopics, progress.totalTopics, progress.celebratedMilestones);
    let updatedCelebratedMilestones = progress.celebratedMilestones;
    
    if (newMilestone) {
      updatedCelebratedMilestones = [...progress.celebratedMilestones, newMilestone];
      setPendingMilestone(newMilestone);
    }

    saveProgress({
      ...progress,
      days: updatedDays,
      completedDays,
      completedTopics,
      celebratedMilestones: updatedCelebratedMilestones
    });
  }, [progress, saveProgress, checkMilestone]);

  // Add notes to a topic
  const addTopicNotes = useCallback((dayNumber: number, topicId: string, notes: string) => {
    if (!progress) return;

    const updatedDays = progress.days.map(day => {
      if (day.dayNumber !== dayNumber) return day;
      
      return {
        ...day,
        topics: day.topics.map(topic => {
          if (topic.topicId !== topicId) return topic;
          return { ...topic, notes };
        })
      };
    });

    saveProgress({
      ...progress,
      days: updatedDays
    });
  }, [progress, saveProgress]);

  // Get progress for a specific day
  const getDayProgress = useCallback((dayNumber: number): DayProgress | undefined => {
    return progress?.days.find(d => d.dayNumber === dayNumber);
  }, [progress]);

  // Get overall progress percentage
  const getOverallProgress = useCallback((): number => {
    if (!progress || progress.totalTopics === 0) return 0;
    return Math.round((progress.completedTopics / progress.totalTopics) * 100);
  }, [progress]);

  // Check if a topic is completed
  const isTopicCompleted = useCallback((dayNumber: number, topicId: string): boolean => {
    const day = progress?.days.find(d => d.dayNumber === dayNumber);
    if (!day) return false;
    const topic = day.topics.find(t => t.topicId === topicId);
    return topic?.completed || false;
  }, [progress]);

  // Check if a day is completed
  const isDayCompleted = useCallback((dayNumber: number): boolean => {
    const day = progress?.days.find(d => d.dayNumber === dayNumber);
    if (!day || day.topics.length === 0) return false;
    return day.topics.every(t => t.completed);
  }, [progress]);

  // Get day completion percentage
  const getDayCompletionPercent = useCallback((dayNumber: number): number => {
    const day = progress?.days.find(d => d.dayNumber === dayNumber);
    if (!day || day.topics.length === 0) return 0;
    return Math.round((day.topics.filter(t => t.completed).length / day.topics.length) * 100);
  }, [progress]);

  // Reset all progress
  const resetProgress = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const allProgress: Record<string, StudyProgress> = JSON.parse(stored);
        delete allProgress[examId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
      }
      setProgress(null);
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  }, [examId]);

  // Get current streak (consecutive completed days)
  const getCurrentStreak = useCallback((): number => {
    if (!progress) return 0;
    
    let streak = 0;
    for (const day of progress.days) {
      if (day.topics.every(t => t.completed)) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }, [progress]);

  // Dismiss milestone celebration
  const dismissMilestone = useCallback(() => {
    setPendingMilestone(null);
  }, []);

  return {
    progress,
    isLoading,
    initializeProgress,
    toggleTopicComplete,
    toggleDayComplete,
    addTopicNotes,
    getDayProgress,
    getOverallProgress,
    isTopicCompleted,
    isDayCompleted,
    getDayCompletionPercent,
    resetProgress,
    getCurrentStreak,
    pendingMilestone,
    dismissMilestone
  };
};
