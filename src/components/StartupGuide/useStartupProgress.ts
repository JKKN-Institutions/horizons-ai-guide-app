import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

const STORAGE_KEY = 'startup_progress';

interface StartupProgressState {
  xp: number;
  streak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  currentStage: number;
  completedLessons: number[];
  completedScenarios: number[];
  quizScores: { date: string; score: number; total: number }[];
  problemsSubmitted: string[];
}

const defaultState: StartupProgressState = {
  xp: 0,
  streak: 0,
  longestStreak: 0,
  lastActivityDate: null,
  currentStage: 1,
  completedLessons: [],
  completedScenarios: [],
  quizScores: [],
  problemsSubmitted: [],
};

const getLocalState = (): StartupProgressState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (parsed.lastActivityDate && parsed.lastActivityDate !== today && parsed.lastActivityDate !== yesterday) {
        parsed.streak = 0;
      }
      return { ...defaultState, ...parsed };
    }
  } catch {}
  return defaultState;
};

export const useStartupProgress = () => {
  const [user, setUser] = useState<User | null>(null);
  const [state, setState] = useState<StartupProgressState>(getLocalState);
  const [synced, setSynced] = useState(false);

  // Safely get auth user without requiring AuthProvider
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load from Supabase if authenticated
  useEffect(() => {
    if (!user || synced) return;
    
    const loadFromDB = async () => {
      try {
        const { data } = await supabase
          .from('startup_progress')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (data) {
          const dbState: StartupProgressState = {
            xp: data.xp,
            streak: data.current_streak,
            longestStreak: data.longest_streak,
            lastActivityDate: data.last_activity_date,
            currentStage: data.current_stage,
            completedLessons: data.lessons_completed || [],
            completedScenarios: [],
            quizScores: [],
            problemsSubmitted: [],
          };
          const local = getLocalState();
          const merged: StartupProgressState = {
            xp: Math.max(dbState.xp, local.xp),
            streak: Math.max(dbState.streak, local.streak),
            longestStreak: Math.max(dbState.longestStreak, local.longestStreak),
            lastActivityDate: dbState.lastActivityDate || local.lastActivityDate,
            currentStage: Math.max(dbState.currentStage, local.currentStage),
            completedLessons: [...new Set([...dbState.completedLessons, ...local.completedLessons])],
            completedScenarios: [...new Set([...dbState.completedScenarios, ...local.completedScenarios])],
            quizScores: local.quizScores.length > dbState.quizScores.length ? local.quizScores : dbState.quizScores,
            problemsSubmitted: [...new Set([...dbState.problemsSubmitted, ...local.problemsSubmitted])],
          };
          setState(merged);
        }
      } catch (error) {
        console.error('Error loading startup progress:', error);
      }
      setSynced(true);
    };

    loadFromDB();
  }, [user, synced]);

  // Save to localStorage always
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Sync to Supabase on state change (debounced)
  useEffect(() => {
    if (!user || !synced) return;

    const timer = setTimeout(async () => {
      try {
        await supabase
          .from('startup_progress')
          .upsert({
            user_id: user.id,
            xp: state.xp,
            current_streak: state.streak,
            longest_streak: state.longestStreak,
            last_activity_date: state.lastActivityDate,
            current_stage: state.currentStage,
            lessons_completed: state.completedLessons,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });

        if (state.quizScores.length > 0) {
          const latest = state.quizScores[state.quizScores.length - 1];
          await supabase
            .from('startup_quiz_scores')
            .upsert({
              user_id: user.id,
              quiz_type: 'money_minute',
              score: latest.score,
              total_questions: latest.total,
              quiz_date: latest.date,
            }, { onConflict: 'user_id,quiz_date' });
        }

        const scores = getReadinessScores(state);
        for (const [dimension, score] of Object.entries(scores)) {
          await supabase
            .from('startup_readiness_scores')
            .upsert({
              user_id: user.id,
              dimension,
              score,
              updated_at: new Date().toISOString(),
            }, { onConflict: 'user_id,dimension' });
        }
      } catch (error) {
        console.error('Error syncing startup progress:', error);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [user, synced, state]);

  const addXP = useCallback((amount: number) => {
    setState(prev => {
      const today = new Date().toISOString().split('T')[0];
      const isNewDay = prev.lastActivityDate !== today;
      const newStreak = isNewDay ? prev.streak + 1 : prev.streak;
      return {
        ...prev,
        xp: prev.xp + amount,
        streak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastActivityDate: today,
      };
    });
  }, []);

  const completeLesson = useCallback((lessonId: number) => {
    setState(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const newCompleted = [...prev.completedLessons, lessonId];
      let newStage = prev.currentStage;
      if (newCompleted.filter(l => l <= 10).length >= 8 && newStage < 2) newStage = 2;
      if (newCompleted.filter(l => l > 10 && l <= 15).length >= 4 && newStage < 3) newStage = 3;
      return { ...prev, completedLessons: newCompleted, currentStage: newStage };
    });
    addXP(25);
  }, [addXP]);

  const completeScenario = useCallback((scenarioId: number) => {
    setState(prev => {
      if (prev.completedScenarios.includes(scenarioId)) return prev;
      return { ...prev, completedScenarios: [...prev.completedScenarios, scenarioId] };
    });
    addXP(20);
  }, [addXP]);

  const completeQuiz = useCallback((score: number, total: number) => {
    const today = new Date().toISOString().split('T')[0];
    setState(prev => ({
      ...prev,
      quizScores: [...prev.quizScores, { date: today, score, total }],
    }));
    addXP(score * 10);
  }, [addXP]);

  const submitProblem = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    setState(prev => {
      if (prev.problemsSubmitted.includes(today)) return prev;
      return { ...prev, problemsSubmitted: [...prev.problemsSubmitted, today] };
    });
    addXP(15);
  }, [addXP]);

  const readinessScores = getReadinessScores(state);
  const overallScore = Math.round(Object.values(readinessScores).reduce((sum, v) => sum + v, 0) / 10);

  return {
    ...state,
    addXP,
    completeLesson,
    completeScenario,
    completeQuiz,
    submitProblem,
    readinessScores,
    overallScore,
  };
};

function getReadinessScores(state: StartupProgressState) {
  return {
    'Problem Identification': Math.min(100, state.problemsSubmitted.length * 15 + state.completedLessons.filter(l => l >= 11 && l <= 15).length * 10),
    'Solution Design': Math.min(100, state.completedLessons.filter(l => l >= 16 && l <= 20).length * 20),
    'Financial Literacy': Math.min(100, state.quizScores.reduce((sum, q) => sum + q.score * 15, 0)),
    'Communication': Math.min(100, state.completedLessons.length * 3),
    'Market Awareness': Math.min(100, state.problemsSubmitted.length * 10 + state.completedLessons.length * 2),
    'Team Building': Math.min(100, state.completedScenarios.filter(s => s === 4).length * 50),
    'Resilience': Math.min(100, state.completedScenarios.length * 15),
    'Execution Skills': Math.min(100, (state.completedLessons.length + state.completedScenarios.length) * 5),
    'Legal/Regulatory': Math.min(100, state.quizScores.reduce((sum, q) => sum + q.score * 10, 0)),
    'Network Strength': Math.min(100, state.streak * 5),
  };
}
