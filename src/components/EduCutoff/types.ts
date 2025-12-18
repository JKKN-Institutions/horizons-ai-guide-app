export type StudentGroup = 'pcm' | 'pcb' | 'pcmb' | 'commerce' | 'arts' | 'vocational';

export type Category = 'OC' | 'BC' | 'BCM' | 'MBC' | 'DNC' | 'SC' | 'SCA' | 'ST' | 'EWS';

export interface GroupInfo {
  id: StudentGroup;
  name: string;
  icon: string;
  subjects: string[];
  careers: string[];
  color: string;
  bgColor: string;
}

export interface MarksEntry {
  subject: string;
  marks: number | null;
  maxMarks: number;
  icon: string;
}

export interface CutoffResult {
  tneaCutoff?: number;
  overallPercentage: number;
  percentile: number;
  neetScore?: number;
}

export interface EligibleCourse {
  id: string;
  name: string;
  fullName: string;
  icon: string;
  collegeCount: number;
  eligibilityStatus: 'eligible' | 'borderline' | 'not_eligible';
  cutoffRequired?: number;
  userCutoff?: number;
  note?: string;
  entranceExam?: string;
  isJKKN?: boolean;
  fee?: string;
  placement?: string;
}

export interface VocationalStream {
  id: string;
  name: string;
}

export interface ArtsSubject {
  id: string;
  name: string;
  selected: boolean;
}
