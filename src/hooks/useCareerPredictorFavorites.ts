import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'career_predictor_favorites';
const NOTES_STORAGE_KEY = 'career_predictor_notes';
const FOLDERS_STORAGE_KEY = 'career_predictor_folders';
const COURSE_FOLDERS_STORAGE_KEY = 'career_predictor_course_folders';

export interface Folder {
  id: string;
  name: string;
  color: string;
  createdAt: number;
}

const DEFAULT_COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // amber
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#F97316', // orange
];

export const useCareerPredictorFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [folders, setFolders] = useState<Folder[]>([]);
  const [courseFolders, setCourseFolders] = useState<Record<string, string>>({}); // courseId -> folderId

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
      const storedFolders = localStorage.getItem(FOLDERS_STORAGE_KEY);
      if (storedFolders) {
        setFolders(JSON.parse(storedFolders));
      }
      const storedCourseFolders = localStorage.getItem(COURSE_FOLDERS_STORAGE_KEY);
      if (storedCourseFolders) {
        setCourseFolders(JSON.parse(storedCourseFolders));
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
        // Also remove notes and folder assignment when unfavoriting
        setNotes(prevNotes => {
          const newNotes = { ...prevNotes };
          delete newNotes[courseId];
          localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(newNotes));
          return newNotes;
        });
        setCourseFolders(prevCF => {
          const newCF = { ...prevCF };
          delete newCF[courseId];
          localStorage.setItem(COURSE_FOLDERS_STORAGE_KEY, JSON.stringify(newCF));
          return newCF;
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
    setCourseFolders({});
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify({}));
    localStorage.setItem(COURSE_FOLDERS_STORAGE_KEY, JSON.stringify({}));
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

  // Folder management
  const createFolder = useCallback((name: string, color?: string) => {
    const newFolder: Folder = {
      id: `folder_${Date.now()}`,
      name: name.trim().slice(0, 30),
      color: color || DEFAULT_COLORS[folders.length % DEFAULT_COLORS.length],
      createdAt: Date.now(),
    };
    setFolders(prev => {
      const updated = [...prev, newFolder];
      localStorage.setItem(FOLDERS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    return newFolder.id;
  }, [folders.length]);

  const renameFolder = useCallback((folderId: string, newName: string) => {
    setFolders(prev => {
      const updated = prev.map(f => 
        f.id === folderId ? { ...f, name: newName.trim().slice(0, 30) } : f
      );
      localStorage.setItem(FOLDERS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteFolder = useCallback((folderId: string) => {
    setFolders(prev => {
      const updated = prev.filter(f => f.id !== folderId);
      localStorage.setItem(FOLDERS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    // Remove folder assignment from all courses in this folder
    setCourseFolders(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(courseId => {
        if (updated[courseId] === folderId) {
          delete updated[courseId];
        }
      });
      localStorage.setItem(COURSE_FOLDERS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateFolderColor = useCallback((folderId: string, color: string) => {
    setFolders(prev => {
      const updated = prev.map(f => 
        f.id === folderId ? { ...f, color } : f
      );
      localStorage.setItem(FOLDERS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const assignCourseToFolder = useCallback((courseId: string, folderId: string | null) => {
    setCourseFolders(prev => {
      const updated = { ...prev };
      if (folderId) {
        updated[courseId] = folderId;
      } else {
        delete updated[courseId];
      }
      localStorage.setItem(COURSE_FOLDERS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getCourseFolder = useCallback((courseId: string) => {
    return courseFolders[courseId] || null;
  }, [courseFolders]);

  const getCoursesInFolder = useCallback((folderId: string | null) => {
    if (folderId === null) {
      // Return courses not in any folder
      return [...favorites].filter(courseId => !courseFolders[courseId]);
    }
    return Object.entries(courseFolders)
      .filter(([_, folder]) => folder === folderId)
      .map(([courseId]) => courseId)
      .filter(courseId => favorites.has(courseId));
  }, [courseFolders, favorites]);

  const getFolderById = useCallback((folderId: string) => {
    return folders.find(f => f.id === folderId) || null;
  }, [folders]);

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
    // Folder exports
    folders,
    createFolder,
    renameFolder,
    deleteFolder,
    updateFolderColor,
    assignCourseToFolder,
    getCourseFolder,
    getCoursesInFolder,
    getFolderById,
    courseFolders,
  };
};
