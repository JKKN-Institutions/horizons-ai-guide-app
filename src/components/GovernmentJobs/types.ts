import { Language } from '@/hooks/useLanguage';

export interface GovernmentExam {
  id: string;
  name: string;
  nameTamil: string;
  category: 'defence' | 'railway' | 'ssc' | 'banking' | 'state' | 'central';
  qualification: string;
  ageMin: number;
  ageMax: number;
  salaryMin: number;
  salaryMax: number;
  examPattern: string;
  selectionProcess: string[];
  applyLink: string;
  nextExamDate: string | null;
  applicationStatus: 'open' | 'upcoming' | 'closed';
  description: string;
  posts?: string[];
}

export type CategoryType = 'all' | 'defence' | 'railway' | 'ssc' | 'banking' | 'state' | 'central';
export type SalaryRangeType = 'all' | '15k-25k' | '25k-40k' | '40k+';
export type StatusType = 'all' | 'open' | 'upcoming' | 'closed';

// Helper type for bilingual components - uses Language but treats non-en/ta as 'en' for display
export type BilingualLanguage = Language;
