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
  preparationTips?: PreparationTips;
  state?: IndianState;
  hasJKKN?: boolean; // Flag to show JKKN badge
  jkknColleges?: string[]; // JKKN colleges for this exam
}

export interface PreparationTips {
  recommendedBooks: string[];
  onlineCourses: string[];
  studyStrategy: string[];
  importantTopics: string[];
}

export type ExamCategory = 
  | 'engineering'
  | 'medical'
  | 'management'
  | 'design'
  | 'agriculture'
  | 'other';

export type IndianState = 
  | 'all'
  | 'andhra-pradesh'
  | 'assam'
  | 'bihar'
  | 'chhattisgarh'
  | 'delhi'
  | 'goa'
  | 'gujarat'
  | 'haryana'
  | 'himachal-pradesh'
  | 'jharkhand'
  | 'karnataka'
  | 'kerala'
  | 'madhya-pradesh'
  | 'maharashtra'
  | 'manipur'
  | 'meghalaya'
  | 'mizoram'
  | 'nagaland'
  | 'odisha'
  | 'punjab'
  | 'rajasthan'
  | 'sikkim'
  | 'tamil-nadu'
  | 'telangana'
  | 'tripura'
  | 'uttar-pradesh'
  | 'uttarakhand'
  | 'west-bengal'
  | 'national';

export interface StateInfo {
  id: IndianState;
  label: string;
  shortCode: string;
}

export interface CategoryInfo {
  id: ExamCategory;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}
