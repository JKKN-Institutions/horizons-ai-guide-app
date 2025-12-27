import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'pyq_mock_test_scores';

export interface MockTestScore {
  id: string;
  examId: string;
  examName: string;
  date: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  totalMarks: number;
  obtainedMarks: number;
  accuracy: number;
  timeTaken: number;
  timePerQuestion: number;
  subjectWise: Record<string, { total: number; correct: number; incorrect: number; unattempted: number }>;
  difficultyWise: Record<string, { total: number; correct: number }>;
}

export const useMockTestScores = () => {
  const [scores, setScores] = useState<MockTestScore[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setScores(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading mock test scores:', error);
    }
  }, []);

  // Save to localStorage
  const saveToStorage = useCallback((newScores: MockTestScore[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newScores));
    } catch (error) {
      console.error('Error saving mock test scores:', error);
    }
  }, []);

  const addScore = useCallback((score: Omit<MockTestScore, 'id' | 'date'>) => {
    const newScore: MockTestScore = {
      ...score,
      id: `score_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
    };
    
    setScores(prev => {
      const newScores = [newScore, ...prev];
      saveToStorage(newScores);
      return newScores;
    });
    
    return newScore;
  }, [saveToStorage]);

  const getScoresByExam = useCallback((examId: string) => {
    return scores.filter(s => s.examId === examId);
  }, [scores]);

  const getBestScore = useCallback((examId?: string) => {
    const filtered = examId ? scores.filter(s => s.examId === examId) : scores;
    if (filtered.length === 0) return null;
    return filtered.reduce((best, current) => 
      current.obtainedMarks > best.obtainedMarks ? current : best
    );
  }, [scores]);

  const getRecentScores = useCallback((limit: number = 10) => {
    return scores.slice(0, limit);
  }, [scores]);

  const getAverageScore = useCallback((examId?: string) => {
    const filtered = examId ? scores.filter(s => s.examId === examId) : scores;
    if (filtered.length === 0) return 0;
    const total = filtered.reduce((sum, s) => sum + s.obtainedMarks, 0);
    return Math.round(total / filtered.length);
  }, [scores]);

  const getAverageAccuracy = useCallback((examId?: string) => {
    const filtered = examId ? scores.filter(s => s.examId === examId) : scores;
    if (filtered.length === 0) return 0;
    const total = filtered.reduce((sum, s) => sum + s.accuracy, 0);
    return Math.round(total / filtered.length);
  }, [scores]);

  const clearAllScores = useCallback(() => {
    setScores([]);
    saveToStorage([]);
  }, [saveToStorage]);

  const deleteScore = useCallback((scoreId: string) => {
    setScores(prev => {
      const newScores = prev.filter(s => s.id !== scoreId);
      saveToStorage(newScores);
      return newScores;
    });
  }, [saveToStorage]);

  return {
    scores,
    addScore,
    getScoresByExam,
    getBestScore,
    getRecentScores,
    getAverageScore,
    getAverageAccuracy,
    clearAllScores,
    deleteScore,
    totalAttempts: scores.length,
  };
};
