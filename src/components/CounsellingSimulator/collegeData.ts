// ============= COMPREHENSIVE COUNSELLING DATA =============
// Supports TNEA (Engineering), NEET UG (Medical), JoSAA (IIT/NIT)

export type CounsellingType = 'tnea' | 'neet' | 'josaa';

// ============= COMMON INTERFACES =============
export interface College {
  id: string;
  name: string;
  shortName: string;
  location: string;
  type: 'Government' | 'Government-Aided' | 'Self-Financing' | 'Deemed' | 'Central' | 'State' | 'AIIMS' | 'JIPMER' | 'IIT' | 'NIT' | 'IIIT' | 'GFTI';
  naacGrade?: string;
  ranking?: number;
  branches: Branch[];
  facilities: string[];
  placementRate?: number;
  avgPackage?: string;
}

export interface Branch {
  id: string;
  name: string;
  shortName: string;
  seats: number;
  cutoffs: {
    oc: number;
    bc: number;
    mbc: number;
    sc: number;
    st: number;
  };
  avgPackage?: string;
  topRecruiters?: string[];
}

export interface StudentProfile {
  rank: number;
  category: 'oc' | 'bc' | 'mbc' | 'sc' | 'st';
  gender: 'male' | 'female';
  community: string;
  preferences: CollegePreference[];
}

export interface CollegePreference {
  collegeId: string;
  branchId: string;
  priority: number;
}

export interface AllotmentResult {
  status: 'allotted' | 'not-allotted' | 'waitlisted';
  college?: College;
  branch?: Branch;
  round: number;
  message: string;
}

// ============= TNEA COLLEGES (25+ Tamil Nadu Engineering Colleges) =============
export const tneaColleges: College[] = [
  {
    id: 'ceg',
    name: 'College of Engineering, Guindy',
    shortName: 'CEG',
    location: 'Chennai',
    type: 'Government',
    naacGrade: 'A++',
    ranking: 1,
    placementRate: 92,
    avgPackage: '₹12 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 120, cutoffs: { oc: 150, bc: 280, mbc: 420, sc: 1200, st: 2500 }, avgPackage: '₹18 LPA', topRecruiters: ['Google', 'Microsoft', 'Amazon', 'TCS'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 120, cutoffs: { oc: 320, bc: 580, mbc: 850, sc: 2100, st: 4500 }, avgPackage: '₹12 LPA', topRecruiters: ['Qualcomm', 'Intel', 'Samsung', 'Infosys'] },
      { id: 'eee', name: 'Electrical & Electronics', shortName: 'EEE', seats: 90, cutoffs: { oc: 580, bc: 920, mbc: 1400, sc: 3200, st: 6000 }, avgPackage: '₹10 LPA', topRecruiters: ['L&T', 'Siemens', 'ABB', 'Schneider'] },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'MECH', seats: 120, cutoffs: { oc: 450, bc: 780, mbc: 1100, sc: 2800, st: 5500 }, avgPackage: '₹8 LPA', topRecruiters: ['Ashok Leyland', 'TVS', 'Hyundai', 'Caterpillar'] },
      { id: 'civil', name: 'Civil Engineering', shortName: 'CIVIL', seats: 90, cutoffs: { oc: 680, bc: 1100, mbc: 1600, sc: 3800, st: 7000 }, avgPackage: '₹6 LPA', topRecruiters: ['L&T', 'Shapoorji', 'Sobha', 'Prestige'] }
    ]
  },
  {
    id: 'mit',
    name: 'Madras Institute of Technology',
    shortName: 'MIT',
    location: 'Chennai',
    type: 'Government',
    naacGrade: 'A+',
    ranking: 2,
    placementRate: 88,
    avgPackage: '₹10 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 60, cutoffs: { oc: 280, bc: 520, mbc: 780, sc: 1800, st: 3800 }, avgPackage: '₹15 LPA', topRecruiters: ['Amazon', 'Flipkart', 'Zoho', 'Wipro'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 90, cutoffs: { oc: 420, bc: 720, mbc: 1050, sc: 2400, st: 5000 }, avgPackage: '₹10 LPA', topRecruiters: ['Texas Instruments', 'Bosch', 'Nokia', 'HCL'] },
      { id: 'aero', name: 'Aeronautical Engineering', shortName: 'AERO', seats: 60, cutoffs: { oc: 380, bc: 680, mbc: 980, sc: 2200, st: 4800 }, avgPackage: '₹9 LPA', topRecruiters: ['HAL', 'ISRO', 'Airbus', 'Boeing'] }
    ]
  },
  {
    id: 'act',
    name: 'Alagappa Chettiar College of Engineering',
    shortName: 'ACCE',
    location: 'Karaikudi',
    type: 'Government',
    naacGrade: 'A',
    ranking: 3,
    placementRate: 82,
    avgPackage: '₹8 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'Labs'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 60, cutoffs: { oc: 850, bc: 1400, mbc: 2100, sc: 4500, st: 8000 }, avgPackage: '₹10 LPA', topRecruiters: ['TCS', 'Infosys', 'Cognizant', 'Wipro'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 60, cutoffs: { oc: 1200, bc: 1900, mbc: 2800, sc: 5500, st: 9500 }, avgPackage: '₹7 LPA', topRecruiters: ['Infosys', 'Wipro', 'Tech Mahindra'] },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'MECH', seats: 90, cutoffs: { oc: 1500, bc: 2400, mbc: 3500, sc: 6800, st: 11000 }, avgPackage: '₹5.5 LPA', topRecruiters: ['TVS', 'Mahindra', 'Bajaj'] }
    ]
  },
  {
    id: 'gce-salem',
    name: 'Government College of Engineering, Salem',
    shortName: 'GCE Salem',
    location: 'Salem',
    type: 'Government',
    naacGrade: 'A',
    ranking: 4,
    placementRate: 78,
    avgPackage: '₹6.5 LPA',
    facilities: ['Library', 'Hostel', 'Labs'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 60, cutoffs: { oc: 1100, bc: 1800, mbc: 2600, sc: 5200, st: 9000 }, avgPackage: '₹8 LPA', topRecruiters: ['TCS', 'Infosys', 'CTS', 'Accenture'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 60, cutoffs: { oc: 1600, bc: 2500, mbc: 3600, sc: 6500, st: 10500 }, avgPackage: '₹6 LPA', topRecruiters: ['Wipro', 'HCL', 'Tech Mahindra'] },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'MECH', seats: 90, cutoffs: { oc: 2000, bc: 3200, mbc: 4500, sc: 8000, st: 13000 }, avgPackage: '₹5 LPA', topRecruiters: ['Ashok Leyland', 'Mahindra', 'L&T'] }
    ]
  },
  {
    id: 'gce-tirunelveli',
    name: 'Government College of Engineering, Tirunelveli',
    shortName: 'GCE Tirunelveli',
    location: 'Tirunelveli',
    type: 'Government',
    naacGrade: 'A',
    ranking: 5,
    placementRate: 75,
    avgPackage: '₹6 LPA',
    facilities: ['Library', 'Hostel', 'Labs', 'Sports'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 60, cutoffs: { oc: 1300, bc: 2100, mbc: 3000, sc: 5800, st: 10000 }, avgPackage: '₹7.5 LPA', topRecruiters: ['TCS', 'Infosys', 'Wipro'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 60, cutoffs: { oc: 1800, bc: 2900, mbc: 4200, sc: 7200, st: 12000 }, avgPackage: '₹5.5 LPA', topRecruiters: ['HCL', 'Tech Mahindra'] },
      { id: 'eee', name: 'Electrical & Electronics', shortName: 'EEE', seats: 60, cutoffs: { oc: 2200, bc: 3500, mbc: 5000, sc: 8500, st: 14000 }, avgPackage: '₹5 LPA', topRecruiters: ['L&T', 'ABB'] }
    ]
  },
  {
    id: 'gce-bargur',
    name: 'Government College of Engineering, Bargur',
    shortName: 'GCE Bargur',
    location: 'Bargur',
    type: 'Government',
    naacGrade: 'B+',
    ranking: 6,
    placementRate: 70,
    avgPackage: '₹5.5 LPA',
    facilities: ['Library', 'Hostel', 'Labs'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 60, cutoffs: { oc: 1800, bc: 2900, mbc: 4200, sc: 7500, st: 13000 }, avgPackage: '₹6.5 LPA', topRecruiters: ['TCS', 'Infosys'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 60, cutoffs: { oc: 2500, bc: 4000, mbc: 5800, sc: 9500, st: 16000 }, avgPackage: '₹5 LPA', topRecruiters: ['Wipro', 'HCL'] },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'MECH', seats: 60, cutoffs: { oc: 3200, bc: 5200, mbc: 7500, sc: 12000, st: 20000 }, avgPackage: '₹4.5 LPA', topRecruiters: ['TVS', 'L&T'] }
    ]
  },
  {
    id: 'tce',
    name: 'Thiagarajar College of Engineering',
    shortName: 'TCE',
    location: 'Madurai',
    type: 'Government-Aided',
    naacGrade: 'A++',
    ranking: 7,
    placementRate: 85,
    avgPackage: '₹9 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs', 'Incubation'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 120, cutoffs: { oc: 520, bc: 880, mbc: 1300, sc: 3000, st: 6000 }, avgPackage: '₹12 LPA', topRecruiters: ['Amazon', 'Microsoft', 'Zoho', 'PayPal'] },
      { id: 'it', name: 'Information Technology', shortName: 'IT', seats: 60, cutoffs: { oc: 680, bc: 1100, mbc: 1650, sc: 3600, st: 7000 }, avgPackage: '₹10 LPA', topRecruiters: ['Zoho', 'Freshworks', 'TCS', 'Infosys'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 120, cutoffs: { oc: 780, bc: 1300, mbc: 1950, sc: 4200, st: 8000 }, avgPackage: '₹8 LPA', topRecruiters: ['Qualcomm', 'Texas Instruments', 'Bosch'] }
    ]
  },
  {
    id: 'psg',
    name: 'PSG College of Technology',
    shortName: 'PSG Tech',
    location: 'Coimbatore',
    type: 'Government-Aided',
    naacGrade: 'A++',
    ranking: 8,
    placementRate: 90,
    avgPackage: '₹11 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs', 'Industry Tie-ups'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 120, cutoffs: { oc: 380, bc: 680, mbc: 1000, sc: 2400, st: 5000 }, avgPackage: '₹14 LPA', topRecruiters: ['Google', 'Amazon', 'Microsoft', 'Zoho'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 120, cutoffs: { oc: 620, bc: 1050, mbc: 1550, sc: 3500, st: 6800 }, avgPackage: '₹10 LPA', topRecruiters: ['Intel', 'Qualcomm', 'Samsung', 'Bosch'] },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'MECH', seats: 180, cutoffs: { oc: 850, bc: 1400, mbc: 2100, sc: 4500, st: 8500 }, avgPackage: '₹7 LPA', topRecruiters: ['TVS', 'Caterpillar', 'Ashok Leyland', 'L&T'] },
      { id: 'prod', name: 'Production Engineering', shortName: 'PROD', seats: 60, cutoffs: { oc: 1200, bc: 1900, mbc: 2800, sc: 5600, st: 10000 }, avgPackage: '₹6.5 LPA', topRecruiters: ['TVS', 'Bosch', 'L&T'] }
    ]
  },
  {
    id: 'cit',
    name: 'Coimbatore Institute of Technology',
    shortName: 'CIT',
    location: 'Coimbatore',
    type: 'Government-Aided',
    naacGrade: 'A+',
    ranking: 9,
    placementRate: 82,
    avgPackage: '₹8 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 90, cutoffs: { oc: 750, bc: 1250, mbc: 1850, sc: 4000, st: 7500 }, avgPackage: '₹10 LPA', topRecruiters: ['Zoho', 'TCS', 'Infosys', 'Cognizant'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 90, cutoffs: { oc: 1100, bc: 1800, mbc: 2650, sc: 5200, st: 9500 }, avgPackage: '₹7 LPA', topRecruiters: ['Bosch', 'Samsung', 'HCL'] },
      { id: 'eee', name: 'Electrical & Electronics', shortName: 'EEE', seats: 60, cutoffs: { oc: 1400, bc: 2250, mbc: 3300, sc: 6200, st: 11000 }, avgPackage: '₹6 LPA', topRecruiters: ['L&T', 'Schneider', 'ABB'] }
    ]
  },
  {
    id: 'kongu',
    name: 'Kongu Engineering College',
    shortName: 'Kongu',
    location: 'Erode',
    type: 'Self-Financing',
    naacGrade: 'A+',
    ranking: 10,
    placementRate: 85,
    avgPackage: '₹7 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs', 'Industry Connect'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 180, cutoffs: { oc: 1200, bc: 1950, mbc: 2850, sc: 5500, st: 10000 }, avgPackage: '₹9 LPA', topRecruiters: ['Zoho', 'TCS', 'Infosys', 'Wipro'] },
      { id: 'it', name: 'Information Technology', shortName: 'IT', seats: 120, cutoffs: { oc: 1500, bc: 2400, mbc: 3500, sc: 6500, st: 12000 }, avgPackage: '₹7.5 LPA', topRecruiters: ['TCS', 'Infosys', 'CTS'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 180, cutoffs: { oc: 1800, bc: 2900, mbc: 4200, sc: 7800, st: 14000 }, avgPackage: '₹6 LPA', topRecruiters: ['HCL', 'Wipro', 'Tech Mahindra'] },
      { id: 'aiml', name: 'CSE (AI & ML)', shortName: 'AI-ML', seats: 60, cutoffs: { oc: 1000, bc: 1600, mbc: 2400, sc: 4800, st: 8500 }, avgPackage: '₹10 LPA', topRecruiters: ['Amazon', 'Zoho', 'Freshworks'] }
    ]
  },
  {
    id: 'ssn',
    name: 'SSN College of Engineering',
    shortName: 'SSNCE',
    location: 'Chennai',
    type: 'Self-Financing',
    naacGrade: 'A++',
    ranking: 11,
    placementRate: 95,
    avgPackage: '₹12 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs', 'Incubation'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 180, cutoffs: { oc: 200, bc: 380, mbc: 580, sc: 1500, st: 3200 }, avgPackage: '₹16 LPA', topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 180, cutoffs: { oc: 380, bc: 680, mbc: 1000, sc: 2400, st: 5000 }, avgPackage: '₹11 LPA', topRecruiters: ['Qualcomm', 'Texas Instruments', 'Intel', 'Samsung'] },
      { id: 'eee', name: 'Electrical & Electronics', shortName: 'EEE', seats: 120, cutoffs: { oc: 580, bc: 980, mbc: 1450, sc: 3200, st: 6200 }, avgPackage: '₹9 LPA', topRecruiters: ['Schneider', 'ABB', 'Siemens', 'L&T'] },
      { id: 'it', name: 'Information Technology', shortName: 'IT', seats: 120, cutoffs: { oc: 250, bc: 450, mbc: 680, sc: 1700, st: 3600 }, avgPackage: '₹14 LPA', topRecruiters: ['Google', 'Amazon', 'Oracle', 'SAP'] }
    ]
  },
  {
    id: 'vit',
    name: 'VIT Chennai',
    shortName: 'VIT Chennai',
    location: 'Chennai',
    type: 'Deemed',
    naacGrade: 'A++',
    ranking: 12,
    placementRate: 88,
    avgPackage: '₹10 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs', 'International Tie-ups'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 240, cutoffs: { oc: 450, bc: 780, mbc: 1150, sc: 2800, st: 5500 }, avgPackage: '₹12 LPA', topRecruiters: ['Amazon', 'Microsoft', 'Deloitte', 'Capgemini'] },
      { id: 'aiml', name: 'CSE (AI & ML)', shortName: 'CSE-AIML', seats: 120, cutoffs: { oc: 350, bc: 620, mbc: 920, sc: 2200, st: 4500 }, avgPackage: '₹14 LPA', topRecruiters: ['Google', 'Amazon', 'NVIDIA', 'Intel'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 180, cutoffs: { oc: 680, bc: 1100, mbc: 1650, sc: 3800, st: 7200 }, avgPackage: '₹9 LPA', topRecruiters: ['Qualcomm', 'Bosch', 'Samsung', 'Sony'] },
      { id: 'ds', name: 'CSE (Data Science)', shortName: 'CSE-DS', seats: 60, cutoffs: { oc: 400, bc: 700, mbc: 1050, sc: 2500, st: 5000 }, avgPackage: '₹13 LPA', topRecruiters: ['Amazon', 'IBM', 'Deloitte'] }
    ]
  },
  {
    id: 'srm',
    name: 'SRM Institute of Science and Technology',
    shortName: 'SRM',
    location: 'Chennai',
    type: 'Deemed',
    naacGrade: 'A++',
    ranking: 13,
    placementRate: 85,
    avgPackage: '₹9 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs', 'Research Centers'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 300, cutoffs: { oc: 600, bc: 1000, mbc: 1500, sc: 3500, st: 6800 }, avgPackage: '₹10 LPA', topRecruiters: ['Amazon', 'Flipkart', 'Infosys', 'TCS'] },
      { id: 'csespec', name: 'CSE (Specializations)', shortName: 'CSE-Spec', seats: 180, cutoffs: { oc: 520, bc: 880, mbc: 1300, sc: 3000, st: 5800 }, avgPackage: '₹11 LPA', topRecruiters: ['Microsoft', 'Oracle', 'SAP', 'Adobe'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 240, cutoffs: { oc: 850, bc: 1400, mbc: 2100, sc: 4600, st: 8500 }, avgPackage: '₹8 LPA', topRecruiters: ['Samsung', 'LG', 'Nokia', 'Ericsson'] }
    ]
  },
  {
    id: 'srmrmp',
    name: 'SRM Ramapuram',
    shortName: 'SRM RMP',
    location: 'Chennai',
    type: 'Deemed',
    naacGrade: 'A+',
    ranking: 14,
    placementRate: 80,
    avgPackage: '₹7.5 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 180, cutoffs: { oc: 1500, bc: 2400, mbc: 3500, sc: 6500, st: 12000 }, avgPackage: '₹8.5 LPA', topRecruiters: ['TCS', 'Infosys', 'Wipro', 'CTS'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 120, cutoffs: { oc: 2200, bc: 3500, mbc: 5100, sc: 8500, st: 15000 }, avgPackage: '₹6.5 LPA', topRecruiters: ['HCL', 'Wipro'] }
    ]
  },
  {
    id: 'sathyabama',
    name: 'Sathyabama Institute of Science and Technology',
    shortName: 'Sathyabama',
    location: 'Chennai',
    type: 'Deemed',
    naacGrade: 'A',
    ranking: 15,
    placementRate: 78,
    avgPackage: '₹6.5 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'Labs'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 240, cutoffs: { oc: 1800, bc: 2900, mbc: 4200, sc: 7500, st: 13000 }, avgPackage: '₹7.5 LPA', topRecruiters: ['TCS', 'Infosys', 'Wipro'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 180, cutoffs: { oc: 2500, bc: 4000, mbc: 5800, sc: 9500, st: 16000 }, avgPackage: '₹6 LPA', topRecruiters: ['HCL', 'Tech Mahindra'] },
      { id: 'aiml', name: 'CSE (AI & ML)', shortName: 'AI-ML', seats: 60, cutoffs: { oc: 1500, bc: 2400, mbc: 3500, sc: 6500, st: 11000 }, avgPackage: '₹8 LPA', topRecruiters: ['TCS', 'Infosys'] }
    ]
  },
  {
    id: 'saveetha',
    name: 'Saveetha Engineering College',
    shortName: 'Saveetha',
    location: 'Chennai',
    type: 'Self-Financing',
    naacGrade: 'A+',
    ranking: 16,
    placementRate: 82,
    avgPackage: '₹6 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'Labs', 'WiFi'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 180, cutoffs: { oc: 2000, bc: 3200, mbc: 4600, sc: 8000, st: 14000 }, avgPackage: '₹7 LPA', topRecruiters: ['TCS', 'Infosys', 'Wipro'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 120, cutoffs: { oc: 2800, bc: 4500, mbc: 6500, sc: 10500, st: 18000 }, avgPackage: '₹5.5 LPA', topRecruiters: ['HCL', 'Wipro'] }
    ]
  },
  {
    id: 'jkkn',
    name: 'JKKN College of Engineering & Technology',
    shortName: 'JKKN Eng',
    location: 'Namakkal',
    type: 'Self-Financing',
    naacGrade: 'A',
    ranking: 17,
    placementRate: 85,
    avgPackage: '₹6.5 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs', 'Industry Connect'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 120, cutoffs: { oc: 2500, bc: 4000, mbc: 5500, sc: 9000, st: 15000 }, avgPackage: '₹8 LPA', topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'HCL'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 60, cutoffs: { oc: 3500, bc: 5500, mbc: 7500, sc: 12000, st: 18000 }, avgPackage: '₹5.5 LPA', topRecruiters: ['Infosys', 'Wipro', 'Tech Mahindra'] },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'MECH', seats: 60, cutoffs: { oc: 4500, bc: 7000, mbc: 9500, sc: 15000, st: 22000 }, avgPackage: '₹4.5 LPA', topRecruiters: ['TVS', 'Ashok Leyland', 'L&T'] },
      { id: 'civil', name: 'Civil Engineering', shortName: 'CIVIL', seats: 60, cutoffs: { oc: 5000, bc: 8000, mbc: 11000, sc: 17000, st: 25000 }, avgPackage: '₹4 LPA', topRecruiters: ['L&T', 'Shapoorji', 'Prestige'] }
    ]
  },
  {
    id: 'kce',
    name: 'Karpagam College of Engineering',
    shortName: 'KCE',
    location: 'Coimbatore',
    type: 'Self-Financing',
    naacGrade: 'A',
    ranking: 18,
    placementRate: 78,
    avgPackage: '₹5.5 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'Labs'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 120, cutoffs: { oc: 3000, bc: 4800, mbc: 7000, sc: 11000, st: 18000 }, avgPackage: '₹6.5 LPA', topRecruiters: ['TCS', 'Infosys', 'Wipro'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 90, cutoffs: { oc: 4000, bc: 6500, mbc: 9000, sc: 14000, st: 22000 }, avgPackage: '₹5 LPA', topRecruiters: ['HCL', 'Wipro'] }
    ]
  },
  {
    id: 'bannari',
    name: 'Bannari Amman Institute of Technology',
    shortName: 'BIT',
    location: 'Erode',
    type: 'Self-Financing',
    naacGrade: 'A++',
    ranking: 19,
    placementRate: 88,
    avgPackage: '₹8 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs', 'Incubation'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 180, cutoffs: { oc: 900, bc: 1500, mbc: 2200, sc: 4500, st: 8000 }, avgPackage: '₹10 LPA', topRecruiters: ['Zoho', 'Amazon', 'TCS', 'Infosys'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 120, cutoffs: { oc: 1400, bc: 2300, mbc: 3400, sc: 6200, st: 11000 }, avgPackage: '₹7 LPA', topRecruiters: ['Bosch', 'Samsung', 'HCL'] },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'MECH', seats: 120, cutoffs: { oc: 1800, bc: 2900, mbc: 4200, sc: 7500, st: 13000 }, avgPackage: '₹5.5 LPA', topRecruiters: ['TVS', 'L&T', 'Caterpillar'] },
      { id: 'aiml', name: 'CSE (AI & ML)', shortName: 'AI-ML', seats: 60, cutoffs: { oc: 750, bc: 1250, mbc: 1850, sc: 3800, st: 7000 }, avgPackage: '₹11 LPA', topRecruiters: ['Amazon', 'Zoho', 'Freshworks'] }
    ]
  },
  {
    id: 'snsce',
    name: 'SNS College of Engineering',
    shortName: 'SNSCE',
    location: 'Coimbatore',
    type: 'Self-Financing',
    naacGrade: 'A+',
    ranking: 20,
    placementRate: 80,
    avgPackage: '₹6 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'Labs'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 180, cutoffs: { oc: 2200, bc: 3500, mbc: 5100, sc: 8500, st: 15000 }, avgPackage: '₹7 LPA', topRecruiters: ['TCS', 'Infosys', 'Wipro'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 120, cutoffs: { oc: 3200, bc: 5200, mbc: 7500, sc: 12000, st: 20000 }, avgPackage: '₹5.5 LPA', topRecruiters: ['HCL', 'Tech Mahindra'] }
    ]
  },
  {
    id: 'kpriet',
    name: 'KPR Institute of Engineering and Technology',
    shortName: 'KPRIET',
    location: 'Coimbatore',
    type: 'Self-Financing',
    naacGrade: 'A++',
    ranking: 21,
    placementRate: 90,
    avgPackage: '₹7.5 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs', 'Industry Connect'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 180, cutoffs: { oc: 1100, bc: 1800, mbc: 2600, sc: 5200, st: 9500 }, avgPackage: '₹9 LPA', topRecruiters: ['Zoho', 'TCS', 'Infosys', 'Amazon'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 120, cutoffs: { oc: 1600, bc: 2600, mbc: 3800, sc: 7000, st: 12500 }, avgPackage: '₹6.5 LPA', topRecruiters: ['Bosch', 'Samsung', 'HCL'] },
      { id: 'aiml', name: 'CSE (AI & ML)', shortName: 'AI-ML', seats: 60, cutoffs: { oc: 900, bc: 1500, mbc: 2200, sc: 4500, st: 8000 }, avgPackage: '₹10 LPA', topRecruiters: ['Amazon', 'Zoho', 'Freshworks'] }
    ]
  },
  {
    id: 'kumaraguru',
    name: 'Kumaraguru College of Technology',
    shortName: 'KCT',
    location: 'Coimbatore',
    type: 'Self-Financing',
    naacGrade: 'A++',
    ranking: 22,
    placementRate: 88,
    avgPackage: '₹8.5 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs', 'Research'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 180, cutoffs: { oc: 800, bc: 1350, mbc: 2000, sc: 4200, st: 7800 }, avgPackage: '₹11 LPA', topRecruiters: ['Zoho', 'Amazon', 'Microsoft', 'TCS'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 120, cutoffs: { oc: 1200, bc: 2000, mbc: 2900, sc: 5800, st: 10500 }, avgPackage: '₹8 LPA', topRecruiters: ['Bosch', 'Qualcomm', 'Samsung'] },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'MECH', seats: 120, cutoffs: { oc: 1600, bc: 2600, mbc: 3800, sc: 7200, st: 13000 }, avgPackage: '₹6 LPA', topRecruiters: ['TVS', 'Caterpillar', 'L&T'] },
      { id: 'aiml', name: 'CSE (AI & ML)', shortName: 'AI-ML', seats: 60, cutoffs: { oc: 650, bc: 1100, mbc: 1650, sc: 3500, st: 6500 }, avgPackage: '₹12 LPA', topRecruiters: ['Amazon', 'Google', 'Zoho'] }
    ]
  },
  {
    id: 'vel-tech',
    name: 'Vel Tech Rangarajan Dr.Sagunthala R&D Institute',
    shortName: 'Vel Tech',
    location: 'Chennai',
    type: 'Deemed',
    naacGrade: 'A+',
    ranking: 23,
    placementRate: 75,
    avgPackage: '₹5.5 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'Labs'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 240, cutoffs: { oc: 2800, bc: 4500, mbc: 6500, sc: 10500, st: 18000 }, avgPackage: '₹6.5 LPA', topRecruiters: ['TCS', 'Infosys', 'Wipro'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 180, cutoffs: { oc: 3800, bc: 6000, mbc: 8500, sc: 13500, st: 22000 }, avgPackage: '₹5 LPA', topRecruiters: ['HCL', 'Tech Mahindra'] }
    ]
  },
  {
    id: 'rajalakshmi',
    name: 'Rajalakshmi Engineering College',
    shortName: 'REC',
    location: 'Chennai',
    type: 'Self-Financing',
    naacGrade: 'A+',
    ranking: 24,
    placementRate: 85,
    avgPackage: '₹7 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 180, cutoffs: { oc: 1400, bc: 2300, mbc: 3400, sc: 6200, st: 11000 }, avgPackage: '₹9 LPA', topRecruiters: ['Amazon', 'TCS', 'Infosys', 'Zoho'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 120, cutoffs: { oc: 2000, bc: 3200, mbc: 4700, sc: 8000, st: 14000 }, avgPackage: '₹6.5 LPA', topRecruiters: ['Bosch', 'Samsung', 'HCL'] },
      { id: 'aiml', name: 'CSE (AI & ML)', shortName: 'AI-ML', seats: 60, cutoffs: { oc: 1100, bc: 1800, mbc: 2700, sc: 5200, st: 9500 }, avgPackage: '₹10 LPA', topRecruiters: ['Amazon', 'Zoho', 'Freshworks'] }
    ]
  },
  {
    id: 'meenakshi',
    name: 'Meenakshi Sundararajan Engineering College',
    shortName: 'MSEC',
    location: 'Chennai',
    type: 'Self-Financing',
    naacGrade: 'A',
    ranking: 25,
    placementRate: 80,
    avgPackage: '₹6 LPA',
    facilities: ['Library', 'Hostel', 'Labs', 'WiFi'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 120, cutoffs: { oc: 1800, bc: 2900, mbc: 4200, sc: 7500, st: 13000 }, avgPackage: '₹7.5 LPA', topRecruiters: ['TCS', 'Infosys', 'Wipro', 'CTS'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 90, cutoffs: { oc: 2500, bc: 4000, mbc: 5800, sc: 9500, st: 16000 }, avgPackage: '₹5.5 LPA', topRecruiters: ['HCL', 'Wipro'] }
    ]
  }
];

// ============= NEET UG MEDICAL COLLEGES (India-wide) =============
export const neetColleges: College[] = [
  // AIIMS Institutions
  {
    id: 'aiims-delhi',
    name: 'All India Institute of Medical Sciences, New Delhi',
    shortName: 'AIIMS Delhi',
    location: 'New Delhi',
    type: 'AIIMS',
    naacGrade: 'A++',
    ranking: 1,
    placementRate: 100,
    avgPackage: '₹15 LPA',
    facilities: ['Research', 'Super Specialty', 'PG Programs', 'Hostel'],
    branches: [
      { id: 'mbbs', name: 'MBBS', shortName: 'MBBS', seats: 107, cutoffs: { oc: 50, bc: 120, mbc: 200, sc: 800, st: 2000 }, avgPackage: '₹15 LPA', topRecruiters: ['Govt Hospitals', 'Private Hospitals', 'Research'] }
    ]
  },
  {
    id: 'aiims-jodhpur',
    name: 'AIIMS Jodhpur',
    shortName: 'AIIMS Jodhpur',
    location: 'Jodhpur',
    type: 'AIIMS',
    naacGrade: 'A+',
    ranking: 2,
    placementRate: 100,
    avgPackage: '₹12 LPA',
    facilities: ['Research', 'Super Specialty', 'Hostel'],
    branches: [
      { id: 'mbbs', name: 'MBBS', shortName: 'MBBS', seats: 125, cutoffs: { oc: 200, bc: 450, mbc: 700, sc: 2500, st: 5000 }, avgPackage: '₹12 LPA', topRecruiters: ['Govt Hospitals', 'Private Hospitals'] }
    ]
  },
  {
    id: 'aiims-bhopal',
    name: 'AIIMS Bhopal',
    shortName: 'AIIMS Bhopal',
    location: 'Bhopal',
    type: 'AIIMS',
    naacGrade: 'A+',
    ranking: 3,
    placementRate: 100,
    avgPackage: '₹12 LPA',
    facilities: ['Research', 'Super Specialty', 'Hostel'],
    branches: [
      { id: 'mbbs', name: 'MBBS', shortName: 'MBBS', seats: 120, cutoffs: { oc: 250, bc: 500, mbc: 800, sc: 2800, st: 5500 }, avgPackage: '₹12 LPA', topRecruiters: ['Govt Hospitals', 'Private Hospitals'] }
    ]
  },
  {
    id: 'aiims-rishikesh',
    name: 'AIIMS Rishikesh',
    shortName: 'AIIMS Rishikesh',
    location: 'Rishikesh',
    type: 'AIIMS',
    naacGrade: 'A',
    ranking: 4,
    placementRate: 100,
    avgPackage: '₹11 LPA',
    facilities: ['Research', 'Hostel'],
    branches: [
      { id: 'mbbs', name: 'MBBS', shortName: 'MBBS', seats: 125, cutoffs: { oc: 300, bc: 600, mbc: 900, sc: 3200, st: 6000 }, avgPackage: '₹11 LPA', topRecruiters: ['Govt Hospitals'] }
    ]
  },
  // JIPMER
  {
    id: 'jipmer',
    name: 'JIPMER Puducherry',
    shortName: 'JIPMER',
    location: 'Puducherry',
    type: 'JIPMER',
    naacGrade: 'A++',
    ranking: 5,
    placementRate: 100,
    avgPackage: '₹14 LPA',
    facilities: ['Research', 'Super Specialty', 'PG Programs', 'Hostel'],
    branches: [
      { id: 'mbbs', name: 'MBBS', shortName: 'MBBS', seats: 200, cutoffs: { oc: 150, bc: 350, mbc: 550, sc: 2000, st: 4000 }, avgPackage: '₹14 LPA', topRecruiters: ['Govt Hospitals', 'Research'] }
    ]
  },
  // Top Government Medical Colleges
  {
    id: 'mmc-chennai',
    name: 'Madras Medical College',
    shortName: 'MMC',
    location: 'Chennai',
    type: 'Government',
    naacGrade: 'A+',
    ranking: 6,
    placementRate: 95,
    avgPackage: '₹10 LPA',
    facilities: ['Hostel', 'Research', 'Specialty Departments'],
    branches: [
      { id: 'mbbs', name: 'MBBS', shortName: 'MBBS', seats: 250, cutoffs: { oc: 400, bc: 800, mbc: 1200, sc: 4000, st: 8000 }, avgPackage: '₹10 LPA', topRecruiters: ['Govt Hospitals', 'Private Hospitals'] }
    ]
  },
  {
    id: 'smc-chennai',
    name: 'Stanley Medical College',
    shortName: 'Stanley',
    location: 'Chennai',
    type: 'Government',
    naacGrade: 'A',
    ranking: 7,
    placementRate: 92,
    avgPackage: '₹9 LPA',
    facilities: ['Hostel', 'Labs'],
    branches: [
      { id: 'mbbs', name: 'MBBS', shortName: 'MBBS', seats: 200, cutoffs: { oc: 500, bc: 1000, mbc: 1500, sc: 5000, st: 10000 }, avgPackage: '₹9 LPA', topRecruiters: ['Govt Hospitals'] }
    ]
  },
  {
    id: 'kmc-chennai',
    name: 'Kilpauk Medical College',
    shortName: 'KMC',
    location: 'Chennai',
    type: 'Government',
    naacGrade: 'A',
    ranking: 8,
    placementRate: 90,
    avgPackage: '₹8.5 LPA',
    facilities: ['Hostel', 'Labs'],
    branches: [
      { id: 'mbbs', name: 'MBBS', shortName: 'MBBS', seats: 150, cutoffs: { oc: 600, bc: 1200, mbc: 1800, sc: 5500, st: 11000 }, avgPackage: '₹8.5 LPA', topRecruiters: ['Govt Hospitals'] }
    ]
  },
  {
    id: 'gmc-madurai',
    name: 'Government Medical College, Madurai',
    shortName: 'GMC Madurai',
    location: 'Madurai',
    type: 'Government',
    naacGrade: 'A',
    ranking: 9,
    placementRate: 88,
    avgPackage: '₹8 LPA',
    facilities: ['Hostel', 'Labs'],
    branches: [
      { id: 'mbbs', name: 'MBBS', shortName: 'MBBS', seats: 150, cutoffs: { oc: 700, bc: 1400, mbc: 2100, sc: 6000, st: 12000 }, avgPackage: '₹8 LPA', topRecruiters: ['Govt Hospitals'] }
    ]
  },
  {
    id: 'gmc-coimbatore',
    name: 'Government Medical College, Coimbatore',
    shortName: 'GMC CBE',
    location: 'Coimbatore',
    type: 'Government',
    naacGrade: 'A',
    ranking: 10,
    placementRate: 88,
    avgPackage: '₹8 LPA',
    facilities: ['Hostel', 'Labs'],
    branches: [
      { id: 'mbbs', name: 'MBBS', shortName: 'MBBS', seats: 150, cutoffs: { oc: 750, bc: 1500, mbc: 2200, sc: 6500, st: 13000 }, avgPackage: '₹8 LPA', topRecruiters: ['Govt Hospitals'] }
    ]
  },
  {
    id: 'gmc-salem',
    name: 'Government Medical College, Salem',
    shortName: 'GMC Salem',
    location: 'Salem',
    type: 'Government',
    naacGrade: 'B+',
    ranking: 11,
    placementRate: 85,
    avgPackage: '₹7 LPA',
    facilities: ['Hostel', 'Labs'],
    branches: [
      { id: 'mbbs', name: 'MBBS', shortName: 'MBBS', seats: 150, cutoffs: { oc: 900, bc: 1800, mbc: 2700, sc: 7500, st: 15000 }, avgPackage: '₹7 LPA', topRecruiters: ['Govt Hospitals'] }
    ]
  },
  {
    id: 'gmc-tirunelveli',
    name: 'Tirunelveli Medical College',
    shortName: 'TMC',
    location: 'Tirunelveli',
    type: 'Government',
    naacGrade: 'A',
    ranking: 12,
    placementRate: 87,
    avgPackage: '₹7.5 LPA',
    facilities: ['Hostel', 'Labs'],
    branches: [
      { id: 'mbbs', name: 'MBBS', shortName: 'MBBS', seats: 150, cutoffs: { oc: 850, bc: 1700, mbc: 2500, sc: 7000, st: 14000 }, avgPackage: '₹7.5 LPA', topRecruiters: ['Govt Hospitals'] }
    ]
  },
  {
    id: 'gmc-thanjavur',
    name: 'Thanjavur Medical College',
    shortName: 'TVMC',
    location: 'Thanjavur',
    type: 'Government',
    naacGrade: 'A',
    ranking: 13,
    placementRate: 86,
    avgPackage: '₹7.5 LPA',
    facilities: ['Hostel', 'Labs'],
    branches: [
      { id: 'mbbs', name: 'MBBS', shortName: 'MBBS', seats: 150, cutoffs: { oc: 800, bc: 1600, mbc: 2400, sc: 6800, st: 13500 }, avgPackage: '₹7.5 LPA', topRecruiters: ['Govt Hospitals'] }
    ]
  },
  // Deemed Medical Colleges
  {
    id: 'cmc-vellore',
    name: 'Christian Medical College, Vellore',
    shortName: 'CMC Vellore',
    location: 'Vellore',
    type: 'Deemed',
    naacGrade: 'A++',
    ranking: 14,
    placementRate: 98,
    avgPackage: '₹12 LPA',
    facilities: ['Research', 'Super Specialty', 'Hostel', 'International Exchange'],
    branches: [
      { id: 'mbbs', name: 'MBBS', shortName: 'MBBS', seats: 100, cutoffs: { oc: 100, bc: 250, mbc: 400, sc: 1500, st: 3000 }, avgPackage: '₹12 LPA', topRecruiters: ['CMC Hospitals', 'International Hospitals'] }
    ]
  },
  {
    id: 'srm-mc',
    name: 'SRM Medical College Hospital',
    shortName: 'SRM Medical',
    location: 'Chennai',
    type: 'Deemed',
    naacGrade: 'A',
    ranking: 15,
    placementRate: 85,
    avgPackage: '₹8 LPA',
    facilities: ['Hostel', 'Labs', 'Hospital'],
    branches: [
      { id: 'mbbs', name: 'MBBS', shortName: 'MBBS', seats: 250, cutoffs: { oc: 2000, bc: 4000, mbc: 6000, sc: 15000, st: 30000 }, avgPackage: '₹8 LPA', topRecruiters: ['Private Hospitals'] }
    ]
  },
  {
    id: 'saveetha-mc',
    name: 'Saveetha Medical College',
    shortName: 'Saveetha Medical',
    location: 'Chennai',
    type: 'Deemed',
    naacGrade: 'A',
    ranking: 16,
    placementRate: 82,
    avgPackage: '₹7 LPA',
    facilities: ['Hostel', 'Labs', 'Hospital'],
    branches: [
      { id: 'mbbs', name: 'MBBS', shortName: 'MBBS', seats: 250, cutoffs: { oc: 2500, bc: 5000, mbc: 7500, sc: 18000, st: 35000 }, avgPackage: '₹7 LPA', topRecruiters: ['Private Hospitals'] }
    ]
  },
  {
    id: 'meenakshi-mc',
    name: 'Meenakshi Medical College',
    shortName: 'MMCH',
    location: 'Kanchipuram',
    type: 'Deemed',
    naacGrade: 'A',
    ranking: 17,
    placementRate: 80,
    avgPackage: '₹6.5 LPA',
    facilities: ['Hostel', 'Labs', 'Hospital'],
    branches: [
      { id: 'mbbs', name: 'MBBS', shortName: 'MBBS', seats: 150, cutoffs: { oc: 3000, bc: 6000, mbc: 9000, sc: 20000, st: 40000 }, avgPackage: '₹6.5 LPA', topRecruiters: ['Private Hospitals'] }
    ]
  },
  // JKKN Medical Colleges
  {
    id: 'jkkn-dental',
    name: 'JKKN Dental College',
    shortName: 'JKKN Dental',
    location: 'Namakkal',
    type: 'Self-Financing',
    naacGrade: 'A',
    ranking: 18,
    placementRate: 85,
    avgPackage: '₹5 LPA',
    facilities: ['Hostel', 'Labs', 'Dental Hospital'],
    branches: [
      { id: 'bds', name: 'BDS', shortName: 'BDS', seats: 100, cutoffs: { oc: 5000, bc: 10000, mbc: 15000, sc: 35000, st: 60000 }, avgPackage: '₹5 LPA', topRecruiters: ['Dental Clinics', 'Hospitals'] }
    ]
  },
  {
    id: 'jkkn-nursing',
    name: 'JKKN College of Nursing',
    shortName: 'JKKN Nursing',
    location: 'Namakkal',
    type: 'Self-Financing',
    naacGrade: 'A',
    ranking: 19,
    placementRate: 90,
    avgPackage: '₹4 LPA',
    facilities: ['Hostel', 'Labs', 'Hospital Training'],
    branches: [
      { id: 'bsc-nursing', name: 'B.Sc Nursing', shortName: 'BSc Nursing', seats: 60, cutoffs: { oc: 8000, bc: 16000, mbc: 24000, sc: 50000, st: 80000 }, avgPackage: '₹4 LPA', topRecruiters: ['Hospitals', 'Healthcare Centers'] }
    ]
  },
  {
    id: 'jkkn-pharmacy',
    name: 'JKKN College of Pharmacy',
    shortName: 'JKKN Pharmacy',
    location: 'Namakkal',
    type: 'Self-Financing',
    naacGrade: 'A',
    ranking: 20,
    placementRate: 85,
    avgPackage: '₹4.5 LPA',
    facilities: ['Hostel', 'Labs', 'Research'],
    branches: [
      { id: 'bpharm', name: 'B.Pharm', shortName: 'B.Pharm', seats: 60, cutoffs: { oc: 6000, bc: 12000, mbc: 18000, sc: 40000, st: 70000 }, avgPackage: '₹4.5 LPA', topRecruiters: ['Pharma Companies', 'Hospitals'] }
    ]
  }
];

// ============= JoSAA IIT/NIT COLLEGES =============
export const josaaColleges: College[] = [
  // IITs
  {
    id: 'iit-bombay',
    name: 'Indian Institute of Technology Bombay',
    shortName: 'IIT Bombay',
    location: 'Mumbai',
    type: 'IIT',
    naacGrade: 'A++',
    ranking: 1,
    placementRate: 98,
    avgPackage: '₹25 LPA',
    facilities: ['Research', 'Incubation', 'Hostel', 'Sports', 'International Exchange'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 110, cutoffs: { oc: 100, bc: 180, mbc: 280, sc: 600, st: 1200 }, avgPackage: '₹45 LPA', topRecruiters: ['Google', 'Microsoft', 'Apple', 'Goldman Sachs'] },
      { id: 'ee', name: 'Electrical Engineering', shortName: 'EE', seats: 140, cutoffs: { oc: 200, bc: 350, mbc: 500, sc: 1000, st: 2000 }, avgPackage: '₹28 LPA', topRecruiters: ['Intel', 'Qualcomm', 'Samsung'] },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'MECH', seats: 160, cutoffs: { oc: 400, bc: 700, mbc: 1000, sc: 2000, st: 4000 }, avgPackage: '₹20 LPA', topRecruiters: ['Mercedes', 'Tata Motors', 'L&T'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 70, cutoffs: { oc: 150, bc: 280, mbc: 400, sc: 850, st: 1700 }, avgPackage: '₹35 LPA', topRecruiters: ['Apple', 'Qualcomm', 'NVIDIA'] }
    ]
  },
  {
    id: 'iit-delhi',
    name: 'Indian Institute of Technology Delhi',
    shortName: 'IIT Delhi',
    location: 'New Delhi',
    type: 'IIT',
    naacGrade: 'A++',
    ranking: 2,
    placementRate: 97,
    avgPackage: '₹24 LPA',
    facilities: ['Research', 'Incubation', 'Hostel', 'Sports'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 95, cutoffs: { oc: 110, bc: 200, mbc: 300, sc: 650, st: 1300 }, avgPackage: '₹42 LPA', topRecruiters: ['Google', 'Facebook', 'Microsoft', 'Amazon'] },
      { id: 'ee', name: 'Electrical Engineering', shortName: 'EE', seats: 140, cutoffs: { oc: 220, bc: 380, mbc: 550, sc: 1100, st: 2200 }, avgPackage: '₹26 LPA', topRecruiters: ['Intel', 'Texas Instruments'] },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'MECH', seats: 130, cutoffs: { oc: 450, bc: 780, mbc: 1100, sc: 2200, st: 4400 }, avgPackage: '₹18 LPA', topRecruiters: ['Maruti', 'Honda', 'L&T'] }
    ]
  },
  {
    id: 'iit-madras',
    name: 'Indian Institute of Technology Madras',
    shortName: 'IIT Madras',
    location: 'Chennai',
    type: 'IIT',
    naacGrade: 'A++',
    ranking: 3,
    placementRate: 96,
    avgPackage: '₹22 LPA',
    facilities: ['Research', 'Incubation', 'Hostel', 'Sports', 'Research Park'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 85, cutoffs: { oc: 130, bc: 230, mbc: 340, sc: 720, st: 1450 }, avgPackage: '₹40 LPA', topRecruiters: ['Google', 'Microsoft', 'Adobe', 'Amazon'] },
      { id: 'ee', name: 'Electrical Engineering', shortName: 'EE', seats: 120, cutoffs: { oc: 250, bc: 430, mbc: 620, sc: 1250, st: 2500 }, avgPackage: '₹24 LPA', topRecruiters: ['Intel', 'TI', 'Qualcomm'] },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'MECH', seats: 120, cutoffs: { oc: 500, bc: 850, mbc: 1200, sc: 2400, st: 4800 }, avgPackage: '₹16 LPA', topRecruiters: ['Ashok Leyland', 'TVS', 'Caterpillar'] },
      { id: 'aero', name: 'Aerospace Engineering', shortName: 'AERO', seats: 50, cutoffs: { oc: 380, bc: 660, mbc: 950, sc: 1900, st: 3800 }, avgPackage: '₹18 LPA', topRecruiters: ['ISRO', 'HAL', 'Airbus'] }
    ]
  },
  {
    id: 'iit-kanpur',
    name: 'Indian Institute of Technology Kanpur',
    shortName: 'IIT Kanpur',
    location: 'Kanpur',
    type: 'IIT',
    naacGrade: 'A++',
    ranking: 4,
    placementRate: 95,
    avgPackage: '₹21 LPA',
    facilities: ['Research', 'Incubation', 'Hostel', 'Sports'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 80, cutoffs: { oc: 140, bc: 250, mbc: 370, sc: 780, st: 1560 }, avgPackage: '₹38 LPA', topRecruiters: ['Google', 'Microsoft', 'Oracle'] },
      { id: 'ee', name: 'Electrical Engineering', shortName: 'EE', seats: 110, cutoffs: { oc: 280, bc: 480, mbc: 690, sc: 1380, st: 2760 }, avgPackage: '₹22 LPA', topRecruiters: ['Intel', 'Samsung'] }
    ]
  },
  {
    id: 'iit-kharagpur',
    name: 'Indian Institute of Technology Kharagpur',
    shortName: 'IIT KGP',
    location: 'Kharagpur',
    type: 'IIT',
    naacGrade: 'A++',
    ranking: 5,
    placementRate: 94,
    avgPackage: '₹20 LPA',
    facilities: ['Research', 'Hostel', 'Sports', 'Largest Campus'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 85, cutoffs: { oc: 160, bc: 280, mbc: 420, sc: 880, st: 1760 }, avgPackage: '₹36 LPA', topRecruiters: ['Google', 'Amazon', 'Microsoft'] },
      { id: 'ee', name: 'Electrical Engineering', shortName: 'EE', seats: 130, cutoffs: { oc: 320, bc: 550, mbc: 790, sc: 1580, st: 3160 }, avgPackage: '₹20 LPA', topRecruiters: ['Intel', 'TI'] },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'MECH', seats: 140, cutoffs: { oc: 600, bc: 1020, mbc: 1460, sc: 2920, st: 5840 }, avgPackage: '₹15 LPA', topRecruiters: ['Tata Steel', 'L&T'] }
    ]
  },
  {
    id: 'iit-roorkee',
    name: 'Indian Institute of Technology Roorkee',
    shortName: 'IIT Roorkee',
    location: 'Roorkee',
    type: 'IIT',
    naacGrade: 'A++',
    ranking: 6,
    placementRate: 93,
    avgPackage: '₹18 LPA',
    facilities: ['Research', 'Hostel', 'Sports', 'Historic Campus'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 90, cutoffs: { oc: 180, bc: 320, mbc: 470, sc: 980, st: 1960 }, avgPackage: '₹32 LPA', topRecruiters: ['Google', 'Microsoft', 'Uber'] },
      { id: 'ee', name: 'Electrical Engineering', shortName: 'EE', seats: 120, cutoffs: { oc: 380, bc: 650, mbc: 940, sc: 1880, st: 3760 }, avgPackage: '₹18 LPA', topRecruiters: ['Intel', 'Power Grid'] },
      { id: 'civil', name: 'Civil Engineering', shortName: 'CIVIL', seats: 100, cutoffs: { oc: 700, bc: 1190, mbc: 1700, sc: 3400, st: 6800 }, avgPackage: '₹12 LPA', topRecruiters: ['L&T', 'NHAI'] }
    ]
  },
  {
    id: 'iit-guwahati',
    name: 'Indian Institute of Technology Guwahati',
    shortName: 'IIT Guwahati',
    location: 'Guwahati',
    type: 'IIT',
    naacGrade: 'A++',
    ranking: 7,
    placementRate: 92,
    avgPackage: '₹17 LPA',
    facilities: ['Research', 'Hostel', 'Sports', 'Scenic Campus'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 80, cutoffs: { oc: 200, bc: 350, mbc: 520, sc: 1080, st: 2160 }, avgPackage: '₹30 LPA', topRecruiters: ['Google', 'Amazon', 'Microsoft'] },
      { id: 'ee', name: 'Electrical Engineering', shortName: 'EE', seats: 100, cutoffs: { oc: 420, bc: 720, mbc: 1030, sc: 2060, st: 4120 }, avgPackage: '₹16 LPA', topRecruiters: ['Intel', 'Qualcomm'] }
    ]
  },
  // NITs
  {
    id: 'nit-trichy',
    name: 'National Institute of Technology Tiruchirappalli',
    shortName: 'NIT Trichy',
    location: 'Tiruchirappalli',
    type: 'NIT',
    naacGrade: 'A++',
    ranking: 8,
    placementRate: 95,
    avgPackage: '₹14 LPA',
    facilities: ['Research', 'Hostel', 'Sports', 'Labs'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 100, cutoffs: { oc: 1200, bc: 2000, mbc: 2900, sc: 5800, st: 11600 }, avgPackage: '₹20 LPA', topRecruiters: ['Google', 'Amazon', 'Microsoft', 'Zoho'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 130, cutoffs: { oc: 1800, bc: 3000, mbc: 4300, sc: 8600, st: 17200 }, avgPackage: '₹14 LPA', topRecruiters: ['Qualcomm', 'Intel', 'Samsung'] },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'MECH', seats: 120, cutoffs: { oc: 3500, bc: 5800, mbc: 8300, sc: 16600, st: 33200 }, avgPackage: '₹10 LPA', topRecruiters: ['TVS', 'L&T', 'Caterpillar'] },
      { id: 'eee', name: 'Electrical & Electronics', shortName: 'EEE', seats: 100, cutoffs: { oc: 2400, bc: 4000, mbc: 5700, sc: 11400, st: 22800 }, avgPackage: '₹12 LPA', topRecruiters: ['Schneider', 'ABB', 'L&T'] }
    ]
  },
  {
    id: 'nit-surathkal',
    name: 'National Institute of Technology Karnataka',
    shortName: 'NIT Surathkal',
    location: 'Surathkal',
    type: 'NIT',
    naacGrade: 'A++',
    ranking: 9,
    placementRate: 94,
    avgPackage: '₹13 LPA',
    facilities: ['Research', 'Hostel', 'Beach Campus'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 90, cutoffs: { oc: 1400, bc: 2300, mbc: 3300, sc: 6600, st: 13200 }, avgPackage: '₹18 LPA', topRecruiters: ['Google', 'Microsoft', 'Amazon'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 120, cutoffs: { oc: 2100, bc: 3500, mbc: 5000, sc: 10000, st: 20000 }, avgPackage: '₹12 LPA', topRecruiters: ['Intel', 'Samsung'] }
    ]
  },
  {
    id: 'nit-warangal',
    name: 'National Institute of Technology Warangal',
    shortName: 'NIT Warangal',
    location: 'Warangal',
    type: 'NIT',
    naacGrade: 'A++',
    ranking: 10,
    placementRate: 93,
    avgPackage: '₹12 LPA',
    facilities: ['Research', 'Hostel', 'Sports'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 100, cutoffs: { oc: 1600, bc: 2700, mbc: 3900, sc: 7800, st: 15600 }, avgPackage: '₹16 LPA', topRecruiters: ['Google', 'Amazon', 'Microsoft'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 120, cutoffs: { oc: 2400, bc: 4000, mbc: 5700, sc: 11400, st: 22800 }, avgPackage: '₹11 LPA', topRecruiters: ['Qualcomm', 'Intel'] }
    ]
  },
  {
    id: 'nit-calicut',
    name: 'National Institute of Technology Calicut',
    shortName: 'NIT Calicut',
    location: 'Calicut',
    type: 'NIT',
    naacGrade: 'A+',
    ranking: 11,
    placementRate: 92,
    avgPackage: '₹11 LPA',
    facilities: ['Research', 'Hostel', 'Sports'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 90, cutoffs: { oc: 1900, bc: 3200, mbc: 4600, sc: 9200, st: 18400 }, avgPackage: '₹14 LPA', topRecruiters: ['Google', 'Amazon', 'TCS'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 110, cutoffs: { oc: 2800, bc: 4700, mbc: 6700, sc: 13400, st: 26800 }, avgPackage: '₹10 LPA', topRecruiters: ['Intel', 'Samsung'] }
    ]
  },
  {
    id: 'nit-rourkela',
    name: 'National Institute of Technology Rourkela',
    shortName: 'NIT Rourkela',
    location: 'Rourkela',
    type: 'NIT',
    naacGrade: 'A+',
    ranking: 12,
    placementRate: 91,
    avgPackage: '₹11 LPA',
    facilities: ['Research', 'Hostel', 'Sports'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 100, cutoffs: { oc: 2200, bc: 3700, mbc: 5300, sc: 10600, st: 21200 }, avgPackage: '₹13 LPA', topRecruiters: ['Amazon', 'Microsoft', 'TCS'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 120, cutoffs: { oc: 3200, bc: 5400, mbc: 7700, sc: 15400, st: 30800 }, avgPackage: '₹9 LPA', topRecruiters: ['Intel', 'Samsung'] }
    ]
  },
  // IIITs
  {
    id: 'iiit-hyderabad',
    name: 'IIIT Hyderabad',
    shortName: 'IIIT Hyderabad',
    location: 'Hyderabad',
    type: 'IIIT',
    naacGrade: 'A++',
    ranking: 13,
    placementRate: 98,
    avgPackage: '₹22 LPA',
    facilities: ['Research', 'Incubation', 'Hostel'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 200, cutoffs: { oc: 300, bc: 520, mbc: 750, sc: 1500, st: 3000 }, avgPackage: '₹35 LPA', topRecruiters: ['Google', 'Microsoft', 'Facebook', 'Apple'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 100, cutoffs: { oc: 600, bc: 1020, mbc: 1460, sc: 2920, st: 5840 }, avgPackage: '₹20 LPA', topRecruiters: ['Qualcomm', 'Intel', 'NVIDIA'] }
    ]
  },
  {
    id: 'iiit-bangalore',
    name: 'IIIT Bangalore',
    shortName: 'IIIT Bangalore',
    location: 'Bangalore',
    type: 'IIIT',
    naacGrade: 'A+',
    ranking: 14,
    placementRate: 96,
    avgPackage: '₹18 LPA',
    facilities: ['Research', 'Hostel', 'Industry Connect'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 180, cutoffs: { oc: 500, bc: 850, mbc: 1220, sc: 2440, st: 4880 }, avgPackage: '₹28 LPA', topRecruiters: ['Google', 'Amazon', 'Microsoft'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 90, cutoffs: { oc: 900, bc: 1530, mbc: 2190, sc: 4380, st: 8760 }, avgPackage: '₹16 LPA', topRecruiters: ['Qualcomm', 'Intel'] }
    ]
  },
  {
    id: 'iiit-delhi',
    name: 'IIIT Delhi',
    shortName: 'IIIT Delhi',
    location: 'New Delhi',
    type: 'IIIT',
    naacGrade: 'A+',
    ranking: 15,
    placementRate: 95,
    avgPackage: '₹16 LPA',
    facilities: ['Research', 'Hostel', 'Incubation'],
    branches: [
      { id: 'cse', name: 'Computer Science Engineering', shortName: 'CSE', seats: 250, cutoffs: { oc: 700, bc: 1190, mbc: 1700, sc: 3400, st: 6800 }, avgPackage: '₹24 LPA', topRecruiters: ['Google', 'Amazon', 'Microsoft', 'Adobe'] },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 120, cutoffs: { oc: 1200, bc: 2040, mbc: 2920, sc: 5840, st: 11680 }, avgPackage: '₹14 LPA', topRecruiters: ['Qualcomm', 'Intel', 'Samsung'] }
    ]
  }
];

// ============= HELPER FUNCTIONS =============

// Get colleges by counselling type
export const getCollegesByType = (type: CounsellingType): College[] => {
  switch (type) {
    case 'tnea': return tneaColleges;
    case 'neet': return neetColleges;
    case 'josaa': return josaaColleges;
    default: return tneaColleges;
  }
};

// Seat allocation algorithm
export const simulateSeatAllocation = (
  studentRank: number,
  category: 'oc' | 'bc' | 'mbc' | 'sc' | 'st',
  preferences: CollegePreference[],
  counsellingType: CounsellingType = 'tnea'
): AllotmentResult => {
  const colleges = getCollegesByType(counsellingType);
  const sortedPrefs = [...preferences].sort((a, b) => a.priority - b.priority);
  
  for (const pref of sortedPrefs) {
    const college = colleges.find(c => c.id === pref.collegeId);
    if (!college) continue;
    
    const branch = college.branches.find(b => b.id === pref.branchId);
    if (!branch) continue;
    
    const cutoff = branch.cutoffs[category];
    
    if (studentRank <= cutoff) {
      const seatAvailable = Math.random() < 0.85;
      
      if (seatAvailable) {
        return {
          status: 'allotted',
          college,
          branch,
          round: 1,
          message: `Congratulations! You have been allotted ${branch.name} at ${college.name}`
        };
      } else {
        return {
          status: 'waitlisted',
          college,
          branch,
          round: 1,
          message: `You are waitlisted for ${branch.name} at ${college.name}. Better luck in next round!`
        };
      }
    }
  }
  
  return {
    status: 'not-allotted',
    round: 1,
    message: 'No seat allotted. Your rank does not meet the cutoff for your preferences. Consider adding more options.'
  };
};

// Get eligible colleges for a rank
export const getEligibleColleges = (
  rank: number,
  category: 'oc' | 'bc' | 'mbc' | 'sc' | 'st',
  counsellingType: CounsellingType = 'tnea'
): { college: College; eligibleBranches: Branch[] }[] => {
  const colleges = getCollegesByType(counsellingType);
  const eligible: { college: College; eligibleBranches: Branch[] }[] = [];
  
  for (const college of colleges) {
    const eligibleBranches = college.branches.filter(
      branch => rank <= branch.cutoffs[category]
    );
    
    if (eligibleBranches.length > 0) {
      eligible.push({ college, eligibleBranches });
    }
  }
  
  return eligible.sort((a, b) => (a.college.ranking || 99) - (b.college.ranking || 99));
};

// Get rank percentile
export const getRankPercentile = (rank: number, counsellingType: CounsellingType = 'tnea'): number => {
  const totalStudents = counsellingType === 'tnea' ? 250000 : 
                         counsellingType === 'neet' ? 2000000 : 
                         150000; // JoSAA
  return Math.round(((totalStudents - rank) / totalStudents) * 100 * 100) / 100;
};

// Get tier classification
export const getTierClassification = (rank: number, counsellingType: CounsellingType = 'tnea'): {
  tier: string;
  description: string;
  color: string;
} => {
  if (counsellingType === 'tnea') {
    if (rank <= 500) return { tier: 'Tier 1', description: 'Top Government Colleges', color: 'text-emerald-600' };
    if (rank <= 2000) return { tier: 'Tier 2', description: 'Premium Aided Colleges', color: 'text-blue-600' };
    if (rank <= 5000) return { tier: 'Tier 3', description: 'Good Self-Financing Colleges', color: 'text-purple-600' };
    if (rank <= 15000) return { tier: 'Tier 4', description: 'Average Colleges', color: 'text-amber-600' };
    return { tier: 'Tier 5', description: 'Entry Level Colleges', color: 'text-gray-600' };
  } else if (counsellingType === 'neet') {
    if (rank <= 100) return { tier: 'Tier 1', description: 'AIIMS & JIPMER', color: 'text-emerald-600' };
    if (rank <= 1000) return { tier: 'Tier 2', description: 'Top Government Medical Colleges', color: 'text-blue-600' };
    if (rank <= 10000) return { tier: 'Tier 3', description: 'Good Government Colleges', color: 'text-purple-600' };
    if (rank <= 50000) return { tier: 'Tier 4', description: 'State Medical Colleges', color: 'text-amber-600' };
    return { tier: 'Tier 5', description: 'Private Medical Colleges', color: 'text-gray-600' };
  } else { // JoSAA
    if (rank <= 500) return { tier: 'Tier 1', description: 'Top 5 IITs', color: 'text-emerald-600' };
    if (rank <= 2000) return { tier: 'Tier 2', description: 'Other IITs', color: 'text-blue-600' };
    if (rank <= 5000) return { tier: 'Tier 3', description: 'Top NITs & IIITs', color: 'text-purple-600' };
    if (rank <= 15000) return { tier: 'Tier 4', description: 'Other NITs', color: 'text-amber-600' };
    return { tier: 'Tier 5', description: 'Other GFTIs', color: 'text-gray-600' };
  }
};

// Counselling type info
export const getCounsellingInfo = (type: CounsellingType) => {
  switch (type) {
    case 'tnea':
      return {
        name: 'TNEA Counselling',
        fullName: 'Tamil Nadu Engineering Admissions',
        color: 'from-teal-500 to-cyan-600',
        maxRank: 250000,
        examName: 'TNEA Rank',
        description: 'Tamil Nadu Engineering Admission counselling for B.E/B.Tech courses'
      };
    case 'neet':
      return {
        name: 'NEET UG Counselling',
        fullName: 'National Eligibility cum Entrance Test',
        color: 'from-rose-500 to-pink-600',
        maxRank: 2000000,
        examName: 'NEET Rank',
        description: 'Medical admission counselling for MBBS, BDS, and allied health sciences'
      };
    case 'josaa':
      return {
        name: 'JoSAA Counselling',
        fullName: 'Joint Seat Allocation Authority',
        color: 'from-indigo-500 to-violet-600',
        maxRank: 150000,
        examName: 'JEE Advanced/Mains Rank',
        description: 'Admission to IITs, NITs, IIITs, and GFTIs based on JEE rank'
      };
  }
};
