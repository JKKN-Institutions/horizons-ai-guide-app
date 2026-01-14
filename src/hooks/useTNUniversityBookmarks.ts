import { useState, useEffect } from 'react';

interface BookmarkedQuestion {
  id: string;
  universityId: string;
  universityName: string;
  courseId: string;
  courseName: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  bookmarkedAt: string;
}

const STORAGE_KEY = 'tn-university-bookmarked-questions';

export const useTNUniversityBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkedQuestion[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse bookmarks:', e);
        setBookmarks([]);
      }
    }
  }, []);

  const saveBookmarks = (newBookmarks: BookmarkedQuestion[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
  };

  const addBookmark = (bookmark: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    topic: string;
    universityId: string;
    courseId: string;
    year?: string;
    universityName?: string;
    courseName?: string;
  }) => {
    const exists = bookmarks.some(b => b.id === bookmark.id);
    if (exists) return;

    const newBookmark: BookmarkedQuestion = {
      id: bookmark.id,
      universityId: bookmark.universityId,
      universityName: bookmark.universityName || '',
      courseId: bookmark.courseId,
      courseName: bookmark.courseName || '',
      question: bookmark.question,
      options: bookmark.options,
      correctAnswer: bookmark.correctAnswer,
      explanation: bookmark.explanation,
      topic: bookmark.topic,
      difficulty: bookmark.difficulty,
      bookmarkedAt: new Date().toISOString(),
    };

    saveBookmarks([...bookmarks, newBookmark]);
  };

  const removeBookmark = (questionId: string) => {
    saveBookmarks(bookmarks.filter(b => b.id !== questionId));
  };

  const isBookmarked = (questionId: string) => {
    return bookmarks.some(b => b.id === questionId);
  };

  const toggleBookmark = (bookmark: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    topic: string;
    universityId: string;
    courseId: string;
    year?: string;
    universityName?: string;
    courseName?: string;
  }) => {
    if (isBookmarked(bookmark.id)) {
      removeBookmark(bookmark.id);
      return false;
    } else {
      addBookmark(bookmark);
      return true;
    }
  };

  const clearAllBookmarks = () => {
    saveBookmarks([]);
  };

  const getBookmarksByUniversity = (universityId: string) => {
    return bookmarks.filter(b => b.universityId === universityId);
  };

  const getBookmarksByCourse = (courseId: string) => {
    return bookmarks.filter(b => b.courseId === courseId);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
    clearAllBookmarks,
    getBookmarksByUniversity,
    getBookmarksByCourse,
    totalBookmarks: bookmarks.length,
  };
};

export type { BookmarkedQuestion };
