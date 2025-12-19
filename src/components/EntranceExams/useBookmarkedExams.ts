import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'bookmarked_exams';

export const useBookmarkedExams = () => {
  const [bookmarkedExams, setBookmarkedExams] = useState<Set<string>>(new Set());

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setBookmarkedExams(new Set(parsed));
      }
    } catch (error) {
      console.error('Error loading bookmarked exams:', error);
    }
  }, []);

  // Save to localStorage whenever bookmarks change
  const saveToStorage = useCallback((exams: Set<string>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...exams]));
    } catch (error) {
      console.error('Error saving bookmarked exams:', error);
    }
  }, []);

  const toggleBookmark = useCallback((examId: string) => {
    setBookmarkedExams(prev => {
      const newSet = new Set(prev);
      if (newSet.has(examId)) {
        newSet.delete(examId);
      } else {
        newSet.add(examId);
      }
      saveToStorage(newSet);
      return newSet;
    });
  }, [saveToStorage]);

  const isBookmarked = useCallback((examId: string) => {
    return bookmarkedExams.has(examId);
  }, [bookmarkedExams]);

  const getBookmarkedCount = useCallback(() => {
    return bookmarkedExams.size;
  }, [bookmarkedExams]);

  const clearAllBookmarks = useCallback(() => {
    setBookmarkedExams(new Set());
    saveToStorage(new Set());
  }, [saveToStorage]);

  return {
    bookmarkedExams,
    toggleBookmark,
    isBookmarked,
    getBookmarkedCount,
    clearAllBookmarks,
  };
};
