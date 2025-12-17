export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  type: 'jkkn' | 'government' | 'corporate' | 'ngo';
  amount: string;
  eligibility: string[];
  deadline: string;
  deadlineStatus: 'closing-soon' | 'one-month' | 'open' | 'coming-soon' | 'always-open';
  educationLevel: string[];
  category: string[];
  incomeLimit?: string;
  gender: 'all' | 'female' | 'male';
  state: string;
  description: string;
  applicationUrl: string;
  helpline?: string;
  documents: string[];
  howToApply: string[];
  benefits: {
    label: string;
    value: string;
  }[];
}

export interface ScholarshipFilters {
  types: string[];
  educationLevels: string[];
  categories: string[];
  incomeRange: string;
  gender: string;
  state: string;
  searchQuery: string;
}

export const scholarshipTypes = [
  { id: 'government', label: 'Government' },
  { id: 'corporate', label: 'Corporate/Private' },
  { id: 'jkkn', label: 'JKKN Exclusive' },
  { id: 'ngo', label: 'NGO/Trust' },
  { id: 'international', label: 'International' },
];

export const educationLevels = [
  { id: '12th-studying', label: '12th Studying' },
  { id: '12th-passed', label: '12th Passed' },
  { id: 'ug', label: 'Undergraduate (UG)' },
  { id: 'pg', label: 'Postgraduate (PG)' },
  { id: 'diploma', label: 'Diploma' },
  { id: 'professional', label: 'Professional (MBBS/Eng)' },
];

export const categories = [
  { id: 'sc', label: 'SC (Scheduled Caste)' },
  { id: 'st', label: 'ST (Scheduled Tribe)' },
  { id: 'obc', label: 'OBC' },
  { id: 'bc-mbc', label: 'BC / MBC / DNC' },
  { id: 'general', label: 'General / OC' },
  { id: 'ews', label: 'EWS' },
  { id: 'minority', label: 'Minority' },
];

export const incomeRanges = [
  { id: 'below-1', label: 'Below ₹1 Lakh' },
  { id: '1-2.5', label: '₹1 - 2.5 Lakh' },
  { id: '2.5-5', label: '₹2.5 - 5 Lakh' },
  { id: '5-8', label: '₹5 - 8 Lakh' },
  { id: 'above-8', label: 'Above ₹8 Lakh' },
];

export const genderOptions = [
  { id: 'all', label: 'All' },
  { id: 'female', label: 'Female Only' },
  { id: 'male', label: 'Male Only' },
];
