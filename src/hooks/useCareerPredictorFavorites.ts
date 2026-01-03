import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'career_predictor_favorites';

export const useCareerPredictorFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(new Set(JSON.parse(stored)));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  const toggleFavorite = useCallback((courseId: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...newSet]));
      return newSet;
    });
  }, []);

  const isFavorite = useCallback((courseId: string) => {
    return favorites.has(courseId);
  }, [favorites]);

  const getFavoritesCount = useCallback(() => {
    return favorites.size;
  }, [favorites]);

  const clearAllFavorites = useCallback(() => {
    setFavorites(new Set());
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoritesCount,
    clearAllFavorites,
  };
};
