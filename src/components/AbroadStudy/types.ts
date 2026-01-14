export interface Country {
  id: string;
  name: { en: string; ta: string };
  flag: string;
  universities: number;
  avgTuition: string;
  avgLiving: string;
  workHours: string;
  prDuration: string;
  popularCourses: string[];
  requirements: string[];
  topUniversities: string[];
  scholarships: string[];
  gradient: string;
}

export interface QuizAnswer {
  questionId: string;
  answer: string;
}

export interface University {
  id: string;
  name: string;
  country: string;
  ranking: number;
  tuition: string;
  acceptance: string;
  scholarships: string[];
  courses: string[];
}

export interface DocumentItem {
  id: string;
  name: string;
  required: boolean;
  description: string;
  tips: string;
}

export interface BudgetItem {
  category: string;
  amount: number;
  currency: string;
}
