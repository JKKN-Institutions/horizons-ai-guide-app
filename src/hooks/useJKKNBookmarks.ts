import { useState, useEffect, useCallback } from 'react';

const JOBS_STORAGE_KEY = 'jkkn_bookmarked_jobs';
const COURSES_STORAGE_KEY = 'jkkn_bookmarked_courses';

export const useJKKNBookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());
  const [bookmarkedCourses, setBookmarkedCourses] = useState<Set<string>>(new Set());

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedJobs = localStorage.getItem(JOBS_STORAGE_KEY);
      if (storedJobs) {
        setBookmarkedJobs(new Set(JSON.parse(storedJobs)));
      }
      const storedCourses = localStorage.getItem(COURSES_STORAGE_KEY);
      if (storedCourses) {
        setBookmarkedCourses(new Set(JSON.parse(storedCourses)));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  }, []);

  const toggleJobBookmark = useCallback((jobId: string) => {
    setBookmarkedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify([...newSet]));
      return newSet;
    });
  }, []);

  const toggleCourseBookmark = useCallback((courseId: string) => {
    setBookmarkedCourses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify([...newSet]));
      return newSet;
    });
  }, []);

  const isJobBookmarked = useCallback((jobId: string) => {
    return bookmarkedJobs.has(jobId);
  }, [bookmarkedJobs]);

  const isCourseBookmarked = useCallback((courseId: string) => {
    return bookmarkedCourses.has(courseId);
  }, [bookmarkedCourses]);

  const getBookmarkedJobsCount = useCallback(() => {
    return bookmarkedJobs.size;
  }, [bookmarkedJobs]);

  const getBookmarkedCoursesCount = useCallback(() => {
    return bookmarkedCourses.size;
  }, [bookmarkedCourses]);

  return {
    bookmarkedJobs,
    bookmarkedCourses,
    toggleJobBookmark,
    toggleCourseBookmark,
    isJobBookmarked,
    isCourseBookmarked,
    getBookmarkedJobsCount,
    getBookmarkedCoursesCount,
  };
};
