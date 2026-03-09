import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export type StudentStream = 'pcm' | 'pcb' | 'pcmb' | 'commerce' | 'arts';

export interface StudentProfile {
  stream: StudentStream;
  goal: 'govt_job' | 'higher_studies' | 'both';
  savedExams: string[];
  studyHours: number;
  displayName: string;
}

const STORAGE_KEY = 'vzk_student_profile';

export const STREAM_INFO: Record<StudentStream, { label: string; tamil: string; icon: string; color: string; bg: string; subjects: string }> = {
  pcm:      { label: 'Science (PCM)', tamil: 'அறிவியல் (PCM)', icon: '⚙️', color: 'text-blue-700', bg: 'bg-blue-50', subjects: 'Physics, Chemistry, Maths' },
  pcb:      { label: 'Science (PCB)', tamil: 'அறிவியல் (PCB)', icon: '🧬', color: 'text-emerald-700', bg: 'bg-emerald-50', subjects: 'Physics, Chemistry, Biology' },
  pcmb:     { label: 'Science (PCMB)', tamil: 'அறிவியல் (PCMB)', icon: '🔬', color: 'text-violet-700', bg: 'bg-violet-50', subjects: 'Physics, Chemistry, Maths, Biology' },
  commerce: { label: 'Commerce', tamil: 'வணிகவியல்', icon: '💼', color: 'text-amber-700', bg: 'bg-amber-50', subjects: 'Accountancy, Economics, Commerce' },
  arts:     { label: 'Arts / Humanities', tamil: 'கலை / மானுடவியல்', icon: '📚', color: 'text-rose-700', bg: 'bg-rose-50', subjects: 'History, Geography, Political Science' },
};

export const useStudentProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load profile
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      // Try Supabase first (for logged-in users)
      if (user) {
        try {
          const { data } = await supabase
            .from('student_profiles')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle();

          if (data) {
            const localData = localStorage.getItem(STORAGE_KEY);
            const local = localData ? JSON.parse(localData) : {};
            setProfile({
              stream: data.stream as StudentStream,
              goal: local.goal || 'both',
              savedExams: data.entrance_exams || local.savedExams || [],
              studyHours: local.studyHours || 3,
              displayName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student',
            });
            setLoading(false);
            return;
          }
        } catch {
          // Supabase error — fall through to localStorage
        }
      }

      // Fallback to localStorage (for guests or if Supabase fails)
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setProfile(JSON.parse(stored));
        } catch {
          setProfile(null);
        }
      }
      setLoading(false);
    };

    load();
  }, [user]);

  // Save profile
  const saveProfile = useCallback(async (newProfile: StudentProfile) => {
    // Always save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    setProfile(newProfile);

    // Also save to Supabase if logged in
    if (user) {
      try {
        await supabase.from('student_profiles').upsert({
          user_id: user.id,
          stream: newProfile.stream,
          entrance_exams: newProfile.savedExams,
          specific_interests: [newProfile.goal],
          marks_range: `${newProfile.studyHours}hrs`,
        }, { onConflict: 'user_id' });
      } catch {
        // Supabase save failed — localStorage is the backup
      }
    }
  }, [user]);

  // Clear profile (for re-onboarding)
  const clearProfile = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(null);
    if (user) {
      try {
        await supabase.from('student_profiles').delete().eq('user_id', user.id);
      } catch { /* ignore */ }
    }
  }, [user]);

  return { profile, loading, saveProfile, clearProfile, hasProfile: !!profile };
};
