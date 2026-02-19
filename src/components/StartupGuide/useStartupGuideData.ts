import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  field: string;
  subDomain: string;
  location: string;
  experience: string;
}

export interface WeeklyTask {
  day: number;
  taskTitle: string;
  taskDescription: string;
  goal: string;
  isCompleted: boolean;
}

export interface DetectedProblem {
  problemStatement: string;
  painScore: number;
  targetCustomer: string;
  marketSize: number;
  uniqueness: number;
  existingGaps: number;
  validated: boolean;
}

export interface Survey {
  id: string;
  questions: any[];
  shareLink: string;
  problemStatement: string;
  targetCustomer: string;
  responseCount: number;
}

export interface ProductRoadmap {
  mvpTitle: string;
  mvpDescription: string;
  buildTool: string;
  businessModel: string;
  weeklySteps: { week: number; title: string; actions: string[] }[];
  recommendedTools: { name: string; purpose: string }[];
}

export interface StartupScore {
  total: number;
  onboarding: number;
  tasks: number;
  problem: number;
  survey: number;
  mvp: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// ===== ALL DATA STORED IN LOCALSTORAGE — NO DATABASE NEEDED =====
const KEY = 'vazhikatti_startup_v2';

interface AllData {
  profile: UserProfile | null;
  tasks: WeeklyTask[];
  reflections: Record<string, string>;
  problem: DetectedProblem | null;
  survey: Survey | null;
  roadmap: ProductRoadmap | null;
  chatHistory: ChatMessage[];
  score: StartupScore;
}

const emptyData: AllData = {
  profile: null,
  tasks: [],
  reflections: {},
  problem: null,
  survey: null,
  roadmap: null,
  chatHistory: [],
  score: { total: 0, onboarding: 0, tasks: 0, problem: 0, survey: 0, mvp: 0 },
};

function load(): AllData {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...emptyData, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load startup data:', e);
  }
  return { ...emptyData };
}

function save(data: AllData) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save startup data:', e);
  }
}

function calcScore(d: AllData): StartupScore {
  const onboarding = d.profile ? 10 : 0;
  const tasks = Math.min(35, d.tasks.filter(t => t.isCompleted).length * 5);
  const problem = d.problem ? 15 : 0;
  const surveyBase = d.survey ? 10 : 0;
  const surveyResponses = Math.min(20, Math.floor((d.survey?.responseCount || 0) / 5) * 5);
  const survey = surveyBase + surveyResponses;
  const mvp = d.roadmap ? 10 : 0;
  const total = onboarding + tasks + problem + survey + mvp;
  return { total, onboarding, tasks, problem, survey, mvp };
}

export const useStartupGuideData = () => {
  const [data, setData] = useState<AllData>(load);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState('Student');
  const [loading] = useState(false);

  // Get user name from Supabase auth (this always works, no new tables needed)
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        setUserName(
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email?.split('@')[0] ||
          'Student'
        );
      }
    }).catch(() => {});
  }, []);

  // Auto-save to localStorage on every change
  useEffect(() => {
    save(data);
  }, [data]);

  // --- Mutation helpers ---

  const saveProfile = useCallback(async (p: UserProfile) => {
    setData(prev => {
      const next = { ...prev, profile: p };
      next.score = calcScore(next);
      return next;
    });
  }, []);

  const saveTasks = useCallback(async (newTasks: WeeklyTask[]) => {
    setData(prev => {
      const next = { ...prev, tasks: newTasks };
      next.score = calcScore(next);
      return next;
    });
  }, []);

  const completeTask = useCallback(async (day: number) => {
    setData(prev => {
      const next = {
        ...prev,
        tasks: prev.tasks.map(t => t.day === day ? { ...t, isCompleted: true } : t),
      };
      next.score = calcScore(next);
      return next;
    });
  }, []);

  const saveReflection = useCallback(async (day: number, text: string) => {
    setData(prev => {
      const next = {
        ...prev,
        reflections: { ...prev.reflections, [String(day)]: text },
        tasks: prev.tasks.map(t => t.day === day ? { ...t, isCompleted: true } : t),
      };
      next.score = calcScore(next);
      return next;
    });
  }, []);

  const saveProblem = useCallback(async (p: DetectedProblem) => {
    setData(prev => {
      const next = { ...prev, problem: p };
      next.score = calcScore(next);
      return next;
    });
  }, []);

  const saveSurvey = useCallback(async (questions: any[], problemStatement: string, targetCustomer: string) => {
    const shareLink = `${window.location.origin}/survey/${userId || 'demo'}`;
    const surveyObj: Survey = {
      id: crypto.randomUUID(),
      questions,
      shareLink,
      problemStatement,
      targetCustomer,
      responseCount: 0,
    };
    setData(prev => {
      const next = { ...prev, survey: surveyObj };
      next.score = calcScore(next);
      return next;
    });
  }, [userId]);

  const saveRoadmap = useCallback(async (r: ProductRoadmap) => {
    setData(prev => {
      const next = { ...prev, roadmap: r };
      next.score = calcScore(next);
      return next;
    });
  }, []);

  const saveChatMessage = useCallback(async (role: 'user' | 'assistant', content: string) => {
    setData(prev => ({
      ...prev,
      chatHistory: [...prev.chatHistory, { role, content, timestamp: new Date().toISOString() }],
    }));
  }, []);

  const refreshSurveyCount = useCallback(async () => {
    // In localStorage mode, count stays manual. Users can increment for testing.
  }, []);

  const loadAllData = useCallback(async () => {
    setData(load());
  }, []);

  // --- Computed ---
  const reflectionCount = Object.keys(data.reflections).length;
  const onboardingComplete = !!data.profile;
  const currentDay = Math.min(data.tasks.filter(t => t.isCompleted).length + 1, 8);
  const allReflectionsDone = reflectionCount >= 7;
  const surveyUnlocked = allReflectionsDone;
  const buildUnlocked = (data.survey?.responseCount || 0) >= 20;

  return {
    userId,
    userName,
    loading,
    profile: data.profile,
    tasks: data.tasks,
    reflections: data.reflections,
    problem: data.problem,
    survey: data.survey,
    roadmap: data.roadmap,
    chatHistory: data.chatHistory,
    score: data.score,
    onboardingComplete,
    currentDay,
    allReflectionsDone,
    surveyUnlocked,
    buildUnlocked,
    saveProfile,
    saveTasks,
    completeTask,
    saveReflection,
    saveProblem,
    saveSurvey,
    saveRoadmap,
    saveChatMessage,
    refreshSurveyCount,
    loadAllData,
  };
};
