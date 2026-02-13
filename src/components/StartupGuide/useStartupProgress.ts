import { useState, useEffect, useCallback } from 'react';

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

export const useStartupProgress = () => {
  const [state, setState] = useState<StartupProgressState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Check streak continuity
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (parsed.lastActivityDate && parsed.lastActivityDate !== today && parsed.lastActivityDate !== yesterday) {
          parsed.streak = 0; // Reset streak if gap > 1 day
        }
        return { ...defaultState, ...parsed };
      }
    } catch {}
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

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
      // Auto-advance stage based on lesson completion
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

  // Readiness scores derived from activity
  const readinessScores = {
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
