import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'pyq_bookmarked_questions';

export const usePYQBookmarks = () => {
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setBookmarkedQuestions(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading bookmarked questions:', error);
    }
  }, []);

  // Save to localStorage whenever bookmarks change
  const saveToStorage = useCallback((questions: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
    } catch (error) {
      console.error('Error saving bookmarked questions:', error);
    }
  }, []);

  const toggleBookmark = useCallback((questionId: string) => {
    setBookmarkedQuestions(prev => {
      const newBookmarks = prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId];
      saveToStorage(newBookmarks);
      return newBookmarks;
    });
  }, [saveToStorage]);

  const isBookmarked = useCallback((questionId: string) => {
    return bookmarkedQuestions.includes(questionId);
  }, [bookmarkedQuestions]);

  const clearAllBookmarks = useCallback(() => {
    setBookmarkedQuestions([]);
    saveToStorage([]);
  }, [saveToStorage]);

  return {
    bookmarkedQuestions,
    toggleBookmark,
    isBookmarked,
    clearAllBookmarks,
    bookmarkCount: bookmarkedQuestions.length,
  };
};
