import { useState, useEffect, useCallback } from 'react';
import { CategoryType } from '@/components/GovernmentJobs/types';

const STORAGE_KEY = 'govt_mock_test_scores';

export interface GovtMockTestScore {
  id: string;
  category: CategoryType;
  categoryLabel: string;
  date: string;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  percentage: number;
  timeTaken: number; // seconds spent
  timeAllotted: number; // total seconds
  subjectWise: Record<string, { total: number; correct: number }>;
  difficultyWise: Record<string, { total: number; correct: number }>;
}

export const useGovtMockTestScores = () => {
  const [scores, setScores] = useState<GovtMockTestScore[]>([]);

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
      console.error('Error loading govt mock test scores:', error);
    }
  }, []);

  // Save to localStorage
  const saveToStorage = useCallback((newScores: GovtMockTestScore[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newScores));
    } catch (error) {
      console.error('Error saving govt mock test scores:', error);
    }
  }, []);

  const addScore = useCallback((score: Omit<GovtMockTestScore, 'id' | 'date'>) => {
    const newScore: GovtMockTestScore = {
      ...score,
      id: `gscore_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
    };
    
    setScores(prev => {
      const newScores = [newScore, ...prev];
      saveToStorage(newScores);
      return newScores;
    });
    
    return newScore;
  }, [saveToStorage]);

  const getScoresByCategory = useCallback((category: CategoryType) => {
    return scores.filter(s => s.category === category);
  }, [scores]);

  const getBestScore = useCallback((category?: CategoryType) => {
    const filtered = category ? scores.filter(s => s.category === category) : scores;
    if (filtered.length === 0) return null;
    return filtered.reduce((best, current) => 
      current.percentage > best.percentage ? current : best
    );
  }, [scores]);

  const getRecentScores = useCallback((limit: number = 10) => {
    return scores.slice(0, limit);
  }, [scores]);

  const getAveragePercentage = useCallback((category?: CategoryType) => {
    const filtered = category ? scores.filter(s => s.category === category) : scores;
    if (filtered.length === 0) return 0;
    const total = filtered.reduce((sum, s) => sum + s.percentage, 0);
    return Math.round(total / filtered.length);
  }, [scores]);

  const getCategoryStats = useCallback(() => {
    const stats: Record<string, { attempts: number; avgPercentage: number; bestPercentage: number }> = {};
    
    scores.forEach(score => {
      if (!stats[score.category]) {
        stats[score.category] = { attempts: 0, avgPercentage: 0, bestPercentage: 0 };
      }
      stats[score.category].attempts++;
      stats[score.category].avgPercentage += score.percentage;
      if (score.percentage > stats[score.category].bestPercentage) {
        stats[score.category].bestPercentage = score.percentage;
      }
    });

    Object.keys(stats).forEach(cat => {
      stats[cat].avgPercentage = Math.round(stats[cat].avgPercentage / stats[cat].attempts);
    });

    return stats;
  }, [scores]);

  const getImprovementTrend = useCallback((category?: CategoryType) => {
    const filtered = category ? scores.filter(s => s.category === category) : scores;
    if (filtered.length < 2) return null;
    
    // Compare last 5 attempts average with previous 5
    const recent = filtered.slice(0, 5);
    const previous = filtered.slice(5, 10);
    
    if (previous.length === 0) return null;
    
    const recentAvg = recent.reduce((sum, s) => sum + s.percentage, 0) / recent.length;
    const previousAvg = previous.reduce((sum, s) => sum + s.percentage, 0) / previous.length;
    
    return {
      change: Math.round(recentAvg - previousAvg),
      recentAvg: Math.round(recentAvg),
      previousAvg: Math.round(previousAvg),
    };
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
    getScoresByCategory,
    getBestScore,
    getRecentScores,
    getAveragePercentage,
    getCategoryStats,
    getImprovementTrend,
    clearAllScores,
    deleteScore,
    totalAttempts: scores.length,
  };
};
