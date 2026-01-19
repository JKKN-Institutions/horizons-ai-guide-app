// Student Eligibility Types for TN University Entrance

export type Stream = 'Science' | 'Commerce' | 'Arts';

export type Community = 'OC' | 'BC' | 'BCM' | 'MBC' | 'DNC' | 'SC' | 'SCA' | 'ST';

export interface StudentMarks {
  maths?: number;
  physics?: number;
  chemistry?: number;
  biology?: number;
  tamil?: number;
  english?: number;
  accountancy?: number;
  businessStudies?: number;
  economics?: number;
  [key: string]: number | undefined;
}

export interface StudentProfile {
  marks: StudentMarks;
  community: Community;
  stream: Stream;
  totalMarks: number;
  engineeringCutoff: number;
  medicalCutoff: number;
}

export interface EligibilityResult {
  universityId: string;
  universityName: string;
  universityNameTamil: string;
  universityLocation: string;
  universityLogo?: string;
  logoColor: string;
  eligibleCourses: EligibleCourseResult[];
}

export interface EligibleCourseResult {
  courseId: string;
  courseName: string;
  courseNameTamil: string;
  courseType: 'UG' | 'PG' | 'Research' | 'Super-Specialty';
  admissionMode: string;
  eligibilityStatus: 'eligible' | 'borderline' | 'not_eligible';
  yourCutoff?: number;
  requiredCutoff?: number;
  reasons: string[];
  chanceLevel: 'High' | 'Medium' | 'Low';
}

export interface CourseRequirement {
  requiredSubjects: string[];
  minMarksMap: Record<Community, number>;
  admissionMode: string;
  courseType: 'Engineering' | 'Medical/Para' | 'Science' | 'Commerce' | 'Arts' | 'General';
}

// Calculate Engineering Cutoff: Maths + (Physics/2) + (Chemistry/2)
export const calculateEngineeringCutoff = (marks: StudentMarks): number => {
  const maths = marks.maths ?? 0;
  const physics = marks.physics ?? 0;
  const chemistry = marks.chemistry ?? 0;
  
  if (maths === 0 || physics === 0 || chemistry === 0) return 0;
  
  return Math.round((maths + (physics / 2) + (chemistry / 2)) * 100) / 100;
};

// Calculate Medical Cutoff: Biology + (Physics/2) + (Chemistry/2)
export const calculateMedicalCutoff = (marks: StudentMarks): number => {
  const biology = marks.biology ?? 0;
  const physics = marks.physics ?? 0;
  const chemistry = marks.chemistry ?? 0;
  
  if (biology === 0 || physics === 0 || chemistry === 0) return 0;
  
  return Math.round((biology + (physics / 2) + (chemistry / 2)) * 100) / 100;
};

// Calculate total marks
export const calculateTotalMarks = (marks: StudentMarks): number => {
  return Object.values(marks).reduce((sum, val) => sum + (val ?? 0), 0);
};

// Get minimum passing marks (35 for TN Board)
export const MIN_PASS_MARKS = 35;

// Check if student passed all subjects
export const hasPassedAllSubjects = (marks: StudentMarks): boolean => {
  return Object.values(marks).every(val => val === undefined || val >= MIN_PASS_MARKS);
};

// Community labels in Tamil
export const communityLabels: Record<Community, { en: string; ta: string }> = {
  OC: { en: 'General / OC', ta: 'பொது / OC' },
  BC: { en: 'Backward Class', ta: 'பிற்படுத்தப்பட்ட வகுப்பு' },
  BCM: { en: 'BC Muslim', ta: 'BC முஸ்லிம்' },
  MBC: { en: 'Most Backward Class', ta: 'மிகவும் பிற்படுத்தப்பட்ட வகுப்பு' },
  DNC: { en: 'Denotified Communities', ta: 'விடுவிக்கப்பட்ட சமூகங்கள்' },
  SC: { en: 'Scheduled Caste', ta: 'ஆதிதிராவிடர்' },
  SCA: { en: 'Scheduled Caste Arunthathiyar', ta: 'அருந்ததியர்' },
  ST: { en: 'Scheduled Tribe', ta: 'பழங்குடியினர்' },
};

// Stream labels in Tamil
export const streamLabels: Record<Stream, { en: string; ta: string; icon: string }> = {
  Science: { en: 'Science (PCM/PCB/PCMB)', ta: 'அறிவியல்', icon: '🔬' },
  Commerce: { en: 'Commerce', ta: 'வணிகவியல்', icon: '💼' },
  Arts: { en: 'Arts/Humanities', ta: 'கலை', icon: '📖' },
};
