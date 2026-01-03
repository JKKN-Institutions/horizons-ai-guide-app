import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'career_predictor_favorites';
const NOTES_STORAGE_KEY = 'career_predictor_notes';

export const useCareerPredictorFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(new Set(JSON.parse(stored)));
      }
      const storedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
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
        // Also remove notes when unfavoriting
        setNotes(prevNotes => {
          const newNotes = { ...prevNotes };
          delete newNotes[courseId];
          localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(newNotes));
          return newNotes;
        });
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
    setNotes({});
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify({}));
  }, []);

  const getNote = useCallback((courseId: string) => {
    return notes[courseId] || '';
  }, [notes]);

  const setNote = useCallback((courseId: string, note: string) => {
    // Limit note length to 500 characters
    const sanitizedNote = note.slice(0, 500);
    setNotes(prev => {
      const newNotes = { ...prev };
      if (sanitizedNote.trim()) {
        newNotes[courseId] = sanitizedNote;
      } else {
        delete newNotes[courseId];
      }
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(newNotes));
      return newNotes;
    });
  }, []);

  const hasNote = useCallback((courseId: string) => {
    return !!notes[courseId]?.trim();
  }, [notes]);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoritesCount,
    clearAllFavorites,
    notes,
    getNote,
    setNote,
    hasNote,
  };
};
