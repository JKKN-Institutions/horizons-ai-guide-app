export interface EntranceExam {
  id: string;
  name: string;
  fullForm: string;
  conductingBody: string;
  examMode: string;
  duration: string;
  syllabus: string[];
  eligibility: string[];
  importantDates: {
    registration: string;
    examDate: string;
    resultDate: string;
  };
  applicationFee: {
    general: string;
    scst: string;
  };
  collegesAccepting: string[];
  officialWebsite: string;
  syllabusUrl?: string;
  category: ExamCategory;
}

export type ExamCategory = 
  | 'engineering'
  | 'medical'
  | 'management'
  | 'design'
  | 'agriculture'
  | 'other';

export interface CategoryInfo {
  id: ExamCategory;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}
