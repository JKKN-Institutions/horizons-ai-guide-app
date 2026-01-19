import { universities, University, Course } from '@/data/university-entrance-data';
import {
  StudentProfile,
  EligibilityResult,
  EligibleCourseResult,
  Community,
  MIN_PASS_MARKS,
  hasPassedAllSubjects,
} from './eligibilityTypes';

// Course type requirements mapping
interface CourseTypeConfig {
  requiredSubjects: string[];
  usesEngineeringCutoff: boolean;
  usesMedicalCutoff: boolean;
}

const getCourseTypeConfig = (courseName: string): CourseTypeConfig => {
  const lowerName = courseName.toLowerCase();
  
  // Engineering courses
  if (lowerName.includes('b.e') || lowerName.includes('b.tech') || lowerName.includes('engineering') || 
      lowerName.includes('m.e') || lowerName.includes('m.tech') || lowerName.includes('mca') ||
      lowerName.includes('bca') || lowerName.includes('computer') || lowerName.includes('software')) {
    return {
      requiredSubjects: ['maths', 'physics', 'chemistry'],
      usesEngineeringCutoff: true,
      usesMedicalCutoff: false,
    };
  }
  
  // Medical/Para-medical courses
  if (lowerName.includes('mbbs') || lowerName.includes('bds') || lowerName.includes('nursing') ||
      lowerName.includes('pharmacy') || lowerName.includes('physiotherapy') || lowerName.includes('medical') ||
      lowerName.includes('bpt') || lowerName.includes('b.sc nursing') || lowerName.includes('paramedical')) {
    return {
      requiredSubjects: ['biology', 'physics', 'chemistry'],
      usesEngineeringCutoff: false,
      usesMedicalCutoff: true,
    };
  }
  
  // Life Sciences / Biology courses
  if (lowerName.includes('life science') || lowerName.includes('biotechnology') || lowerName.includes('microbiology') ||
      lowerName.includes('biochemistry') || lowerName.includes('zoology') || lowerName.includes('botany') ||
      lowerName.includes('genetics') || lowerName.includes('agriculture') || lowerName.includes('veterinary')) {
    return {
      requiredSubjects: ['biology', 'chemistry'],
      usesEngineeringCutoff: false,
      usesMedicalCutoff: true,
    };
  }
  
  // Commerce courses
  if (lowerName.includes('b.com') || lowerName.includes('bba') || lowerName.includes('mba') ||
      lowerName.includes('commerce') || lowerName.includes('accounting') || lowerName.includes('finance') ||
      lowerName.includes('management')) {
    return {
      requiredSubjects: ['accountancy'],
      usesEngineeringCutoff: false,
      usesMedicalCutoff: false,
    };
  }
  
  // Science courses (general)
  if (lowerName.includes('b.sc') || lowerName.includes('m.sc') || lowerName.includes('physics') ||
      lowerName.includes('chemistry') || lowerName.includes('mathematics')) {
    return {
      requiredSubjects: ['physics', 'chemistry'],
      usesEngineeringCutoff: false,
      usesMedicalCutoff: false,
    };
  }
  
  // Arts/Humanities courses - no specific subject requirements
  return {
    requiredSubjects: [],
    usesEngineeringCutoff: false,
    usesMedicalCutoff: false,
  };
};

// Get minimum marks requirement based on community
const getMinMarksForCommunity = (community: Community): number => {
  const minMarksMap: Record<Community, number> = {
    OC: 50,
    BC: 45,
    BCM: 45,
    MBC: 40,
    DNC: 40,
    SC: 35,
    SCA: 35,
    ST: 35,
  };
  return minMarksMap[community];
};

// Check if student meets subject requirements
const checkSubjectEligibility = (
  profile: StudentProfile,
  requiredSubjects: string[]
): { isEligible: boolean; reasons: string[] } => {
  const reasons: string[] = [];
  let isEligible = true;

  for (const subject of requiredSubjects) {
    const mark = profile.marks[subject];
    
    if (mark === undefined) {
      isEligible = false;
      reasons.push(`Missing required subject: ${subject}`);
    } else if (mark < MIN_PASS_MARKS) {
      isEligible = false;
      reasons.push(`Failed in ${subject} (${mark}/100)`);
    }
  }

  return { isEligible, reasons };
};

// Determine chance level based on cutoff comparison
const determineChanceLevel = (
  yourCutoff: number,
  requiredCutoff: number
): 'High' | 'Medium' | 'Low' => {
  const difference = yourCutoff - requiredCutoff;
  
  if (difference >= 10) return 'High';
  if (difference >= 0) return 'Medium';
  return 'Low';
};

// Get estimated cutoff requirement for a course based on community
const getEstimatedCutoff = (
  course: Course,
  community: Community,
  usesEngineeringCutoff: boolean
): number | undefined => {
  // If course has cutoff data, use it
  if (course.cutoffs && course.cutoffs.length > 0) {
    const latestCutoff = course.cutoffs[0]; // Most recent year
    const communityKey = community === 'OC' ? 'general' : 
                         community === 'BC' || community === 'BCM' ? 'obc' :
                         community === 'MBC' || community === 'DNC' ? 'bcMbc' :
                         community === 'SC' || community === 'SCA' ? 'sc' : 'st';
    
    const cutoffValue = latestCutoff[communityKey as keyof typeof latestCutoff];
    if (typeof cutoffValue === 'number') return cutoffValue;
    if (typeof cutoffValue === 'string') return parseFloat(cutoffValue) || undefined;
  }
  
  // Fallback: Estimate based on course type and community
  if (usesEngineeringCutoff) {
    const baseCutoffs: Record<Community, number> = {
      OC: 180,
      BC: 170,
      BCM: 165,
      MBC: 160,
      DNC: 155,
      SC: 140,
      SCA: 135,
      ST: 130,
    };
    return baseCutoffs[community];
  }
  
  return undefined;
};

// Check eligibility for a single course
const checkCourseEligibility = (
  profile: StudentProfile,
  course: Course,
  university: University
): EligibleCourseResult | null => {
  const config = getCourseTypeConfig(course.name);
  const { isEligible, reasons } = checkSubjectEligibility(profile, config.requiredSubjects);
  
  // Get minimum marks requirement
  const minMarks = getMinMarksForCommunity(profile.community);
  
  // Calculate your cutoff
  let yourCutoff: number | undefined;
  if (config.usesEngineeringCutoff) {
    yourCutoff = profile.engineeringCutoff;
  } else if (config.usesMedicalCutoff) {
    yourCutoff = profile.medicalCutoff;
  }
  
  // Get required cutoff for this course
  const requiredCutoff = getEstimatedCutoff(course, profile.community, config.usesEngineeringCutoff);
  
  // Determine eligibility status
  let eligibilityStatus: 'eligible' | 'borderline' | 'not_eligible' = 'eligible';
  let chanceLevel: 'High' | 'Medium' | 'Low' = 'High';
  
  if (!isEligible) {
    eligibilityStatus = 'not_eligible';
    chanceLevel = 'Low';
  } else if (yourCutoff !== undefined && requiredCutoff !== undefined) {
    if (yourCutoff >= requiredCutoff) {
      chanceLevel = determineChanceLevel(yourCutoff, requiredCutoff);
    } else if (yourCutoff >= requiredCutoff - 10) {
      eligibilityStatus = 'borderline';
      chanceLevel = 'Low';
      reasons.push(`Your cutoff (${yourCutoff}) is slightly below requirement (${requiredCutoff})`);
    } else {
      eligibilityStatus = 'not_eligible';
      chanceLevel = 'Low';
      reasons.push(`Your cutoff (${yourCutoff}) is below requirement (${requiredCutoff})`);
    }
  }
  
  // Only return eligible or borderline courses
  if (eligibilityStatus === 'not_eligible' && reasons.length > 1) {
    return null;
  }
  
  // Determine admission mode
  let admissionMode = 'Direct Merit';
  if (config.usesEngineeringCutoff) {
    admissionMode = 'TNEA Counseling';
  } else if (config.usesMedicalCutoff) {
    admissionMode = 'NEET-Based Counseling';
  } else if (course.type === 'PG') {
    admissionMode = 'Entrance Exam';
  }
  
  return {
    courseId: course.id,
    courseName: course.name,
    courseNameTamil: course.nameTamil,
    courseType: course.type,
    admissionMode,
    eligibilityStatus,
    yourCutoff,
    requiredCutoff,
    reasons,
    chanceLevel,
  };
};

// Main eligibility checker function
export const checkEligibility = (profile: StudentProfile): EligibilityResult[] => {
  const results: EligibilityResult[] = [];
  
  for (const university of universities) {
    const eligibleCourses: EligibleCourseResult[] = [];
    
    for (const course of university.courses) {
      const courseResult = checkCourseEligibility(profile, course, university);
      if (courseResult) {
        eligibleCourses.push(courseResult);
      }
    }
    
    // Only include universities with at least one eligible course
    if (eligibleCourses.length > 0) {
      results.push({
        universityId: university.id,
        universityName: university.name,
        universityNameTamil: university.nameTamil,
        universityLocation: university.location,
        universityLogo: university.logo,
        logoColor: university.logoColor,
        eligibleCourses: eligibleCourses.sort((a, b) => {
          // Sort by chance level (High > Medium > Low)
          const chancePriority = { High: 0, Medium: 1, Low: 2 };
          return chancePriority[a.chanceLevel] - chancePriority[b.chanceLevel];
        }),
      });
    }
  }
  
  // Sort universities by number of high-chance courses
  return results.sort((a, b) => {
    const aHighChance = a.eligibleCourses.filter(c => c.chanceLevel === 'High').length;
    const bHighChance = b.eligibleCourses.filter(c => c.chanceLevel === 'High').length;
    return bHighChance - aHighChance;
  });
};
