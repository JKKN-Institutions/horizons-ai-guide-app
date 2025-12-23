// Tamil Nadu Engineering College Data with realistic cutoffs
export interface College {
  id: string;
  name: string;
  shortName: string;
  location: string;
  type: 'Government' | 'Government-Aided' | 'Self-Financing' | 'Deemed';
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

// Realistic Tamil Nadu Colleges
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
      {
        id: 'cse',
        name: 'Computer Science Engineering',
        shortName: 'CSE',
        seats: 120,
        cutoffs: { oc: 150, bc: 280, mbc: 420, sc: 1200, st: 2500 },
        avgPackage: '₹18 LPA',
        topRecruiters: ['Google', 'Microsoft', 'Amazon', 'TCS']
      },
      {
        id: 'ece',
        name: 'Electronics & Communication',
        shortName: 'ECE',
        seats: 120,
        cutoffs: { oc: 320, bc: 580, mbc: 850, sc: 2100, st: 4500 },
        avgPackage: '₹12 LPA',
        topRecruiters: ['Qualcomm', 'Intel', 'Samsung', 'Infosys']
      },
      {
        id: 'eee',
        name: 'Electrical & Electronics',
        shortName: 'EEE',
        seats: 90,
        cutoffs: { oc: 580, bc: 920, mbc: 1400, sc: 3200, st: 6000 },
        avgPackage: '₹10 LPA',
        topRecruiters: ['L&T', 'Siemens', 'ABB', 'Schneider']
      },
      {
        id: 'mech',
        name: 'Mechanical Engineering',
        shortName: 'MECH',
        seats: 120,
        cutoffs: { oc: 450, bc: 780, mbc: 1100, sc: 2800, st: 5500 },
        avgPackage: '₹8 LPA',
        topRecruiters: ['Ashok Leyland', 'TVS', 'Hyundai', 'Caterpillar']
      },
      {
        id: 'civil',
        name: 'Civil Engineering',
        shortName: 'CIVIL',
        seats: 90,
        cutoffs: { oc: 680, bc: 1100, mbc: 1600, sc: 3800, st: 7000 },
        avgPackage: '₹6 LPA',
        topRecruiters: ['L&T', 'Shapoorji', 'Sobha', 'Prestige']
      }
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
      {
        id: 'cse',
        name: 'Computer Science Engineering',
        shortName: 'CSE',
        seats: 60,
        cutoffs: { oc: 280, bc: 520, mbc: 780, sc: 1800, st: 3800 },
        avgPackage: '₹15 LPA',
        topRecruiters: ['Amazon', 'Flipkart', 'Zoho', 'Wipro']
      },
      {
        id: 'ece',
        name: 'Electronics & Communication',
        shortName: 'ECE',
        seats: 90,
        cutoffs: { oc: 420, bc: 720, mbc: 1050, sc: 2400, st: 5000 },
        avgPackage: '₹10 LPA',
        topRecruiters: ['Texas Instruments', 'Bosch', 'Nokia', 'HCL']
      },
      {
        id: 'aero',
        name: 'Aeronautical Engineering',
        shortName: 'AERO',
        seats: 60,
        cutoffs: { oc: 380, bc: 680, mbc: 980, sc: 2200, st: 4800 },
        avgPackage: '₹9 LPA',
        topRecruiters: ['HAL', 'ISRO', 'Airbus', 'Boeing']
      }
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
      {
        id: 'cse',
        name: 'Computer Science Engineering',
        shortName: 'CSE',
        seats: 60,
        cutoffs: { oc: 850, bc: 1400, mbc: 2100, sc: 4500, st: 8000 },
        avgPackage: '₹10 LPA',
        topRecruiters: ['TCS', 'Infosys', 'Cognizant', 'Wipro']
      },
      {
        id: 'ece',
        name: 'Electronics & Communication',
        shortName: 'ECE',
        seats: 60,
        cutoffs: { oc: 1200, bc: 1900, mbc: 2800, sc: 5500, st: 9500 },
        avgPackage: '₹7 LPA',
        topRecruiters: ['Infosys', 'Wipro', 'Tech Mahindra']
      },
      {
        id: 'mech',
        name: 'Mechanical Engineering',
        shortName: 'MECH',
        seats: 90,
        cutoffs: { oc: 1500, bc: 2400, mbc: 3500, sc: 6800, st: 11000 },
        avgPackage: '₹5.5 LPA',
        topRecruiters: ['TVS', 'Mahindra', 'Bajaj']
      }
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
      {
        id: 'cse',
        name: 'Computer Science Engineering',
        shortName: 'CSE',
        seats: 60,
        cutoffs: { oc: 1100, bc: 1800, mbc: 2600, sc: 5200, st: 9000 },
        avgPackage: '₹8 LPA',
        topRecruiters: ['TCS', 'Infosys', 'CTS', 'Accenture']
      },
      {
        id: 'ece',
        name: 'Electronics & Communication',
        shortName: 'ECE',
        seats: 60,
        cutoffs: { oc: 1600, bc: 2500, mbc: 3600, sc: 6500, st: 10500 },
        avgPackage: '₹6 LPA',
        topRecruiters: ['Wipro', 'HCL', 'Tech Mahindra']
      },
      {
        id: 'mech',
        name: 'Mechanical Engineering',
        shortName: 'MECH',
        seats: 90,
        cutoffs: { oc: 2000, bc: 3200, mbc: 4500, sc: 8000, st: 13000 },
        avgPackage: '₹5 LPA',
        topRecruiters: ['Ashok Leyland', 'Mahindra', 'L&T']
      }
    ]
  },
  {
    id: 'tce',
    name: 'Thiagarajar College of Engineering',
    shortName: 'TCE',
    location: 'Madurai',
    type: 'Government-Aided',
    naacGrade: 'A++',
    ranking: 5,
    placementRate: 85,
    avgPackage: '₹9 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs', 'Incubation'],
    branches: [
      {
        id: 'cse',
        name: 'Computer Science Engineering',
        shortName: 'CSE',
        seats: 120,
        cutoffs: { oc: 520, bc: 880, mbc: 1300, sc: 3000, st: 6000 },
        avgPackage: '₹12 LPA',
        topRecruiters: ['Amazon', 'Microsoft', 'Zoho', 'PayPal']
      },
      {
        id: 'it',
        name: 'Information Technology',
        shortName: 'IT',
        seats: 60,
        cutoffs: { oc: 680, bc: 1100, mbc: 1650, sc: 3600, st: 7000 },
        avgPackage: '₹10 LPA',
        topRecruiters: ['Zoho', 'Freshworks', 'TCS', 'Infosys']
      },
      {
        id: 'ece',
        name: 'Electronics & Communication',
        shortName: 'ECE',
        seats: 120,
        cutoffs: { oc: 780, bc: 1300, mbc: 1950, sc: 4200, st: 8000 },
        avgPackage: '₹8 LPA',
        topRecruiters: ['Qualcomm', 'Texas Instruments', 'Bosch']
      }
    ]
  },
  {
    id: 'psg',
    name: 'PSG College of Technology',
    shortName: 'PSG Tech',
    location: 'Coimbatore',
    type: 'Government-Aided',
    naacGrade: 'A++',
    ranking: 6,
    placementRate: 90,
    avgPackage: '₹11 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs', 'Industry Tie-ups'],
    branches: [
      {
        id: 'cse',
        name: 'Computer Science Engineering',
        shortName: 'CSE',
        seats: 120,
        cutoffs: { oc: 380, bc: 680, mbc: 1000, sc: 2400, st: 5000 },
        avgPackage: '₹14 LPA',
        topRecruiters: ['Google', 'Amazon', 'Microsoft', 'Zoho']
      },
      {
        id: 'ece',
        name: 'Electronics & Communication',
        shortName: 'ECE',
        seats: 120,
        cutoffs: { oc: 620, bc: 1050, mbc: 1550, sc: 3500, st: 6800 },
        avgPackage: '₹10 LPA',
        topRecruiters: ['Intel', 'Qualcomm', 'Samsung', 'Bosch']
      },
      {
        id: 'mech',
        name: 'Mechanical Engineering',
        shortName: 'MECH',
        seats: 180,
        cutoffs: { oc: 850, bc: 1400, mbc: 2100, sc: 4500, st: 8500 },
        avgPackage: '₹7 LPA',
        topRecruiters: ['TVS', 'Caterpillar', 'Ashok Leyland', 'L&T']
      }
    ]
  },
  {
    id: 'ssn',
    name: 'SSN College of Engineering',
    shortName: 'SSNCE',
    location: 'Chennai',
    type: 'Self-Financing',
    naacGrade: 'A++',
    ranking: 7,
    placementRate: 95,
    avgPackage: '₹12 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs', 'Incubation'],
    branches: [
      {
        id: 'cse',
        name: 'Computer Science Engineering',
        shortName: 'CSE',
        seats: 180,
        cutoffs: { oc: 200, bc: 380, mbc: 580, sc: 1500, st: 3200 },
        avgPackage: '₹16 LPA',
        topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs']
      },
      {
        id: 'ece',
        name: 'Electronics & Communication',
        shortName: 'ECE',
        seats: 180,
        cutoffs: { oc: 380, bc: 680, mbc: 1000, sc: 2400, st: 5000 },
        avgPackage: '₹11 LPA',
        topRecruiters: ['Qualcomm', 'Texas Instruments', 'Intel', 'Samsung']
      },
      {
        id: 'eee',
        name: 'Electrical & Electronics',
        shortName: 'EEE',
        seats: 120,
        cutoffs: { oc: 580, bc: 980, mbc: 1450, sc: 3200, st: 6200 },
        avgPackage: '₹9 LPA',
        topRecruiters: ['Schneider', 'ABB', 'Siemens', 'L&T']
      }
    ]
  },
  {
    id: 'vit',
    name: 'VIT Chennai',
    shortName: 'VIT Chennai',
    location: 'Chennai',
    type: 'Deemed',
    naacGrade: 'A++',
    ranking: 8,
    placementRate: 88,
    avgPackage: '₹10 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs', 'International Tie-ups'],
    branches: [
      {
        id: 'cse',
        name: 'Computer Science Engineering',
        shortName: 'CSE',
        seats: 240,
        cutoffs: { oc: 450, bc: 780, mbc: 1150, sc: 2800, st: 5500 },
        avgPackage: '₹12 LPA',
        topRecruiters: ['Amazon', 'Microsoft', 'Deloitte', 'Capgemini']
      },
      {
        id: 'aiml',
        name: 'CSE (AI & ML)',
        shortName: 'CSE-AIML',
        seats: 120,
        cutoffs: { oc: 350, bc: 620, mbc: 920, sc: 2200, st: 4500 },
        avgPackage: '₹14 LPA',
        topRecruiters: ['Google', 'Amazon', 'NVIDIA', 'Intel']
      },
      {
        id: 'ece',
        name: 'Electronics & Communication',
        shortName: 'ECE',
        seats: 180,
        cutoffs: { oc: 680, bc: 1100, mbc: 1650, sc: 3800, st: 7200 },
        avgPackage: '₹9 LPA',
        topRecruiters: ['Qualcomm', 'Bosch', 'Samsung', 'Sony']
      }
    ]
  },
  {
    id: 'srm',
    name: 'SRM Institute of Science and Technology',
    shortName: 'SRM',
    location: 'Chennai',
    type: 'Deemed',
    naacGrade: 'A++',
    ranking: 9,
    placementRate: 85,
    avgPackage: '₹9 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs', 'Research Centers'],
    branches: [
      {
        id: 'cse',
        name: 'Computer Science Engineering',
        shortName: 'CSE',
        seats: 300,
        cutoffs: { oc: 600, bc: 1000, mbc: 1500, sc: 3500, st: 6800 },
        avgPackage: '₹10 LPA',
        topRecruiters: ['Amazon', 'Flipkart', 'Infosys', 'TCS']
      },
      {
        id: 'csespec',
        name: 'CSE (Specializations)',
        shortName: 'CSE-Spec',
        seats: 180,
        cutoffs: { oc: 520, bc: 880, mbc: 1300, sc: 3000, st: 5800 },
        avgPackage: '₹11 LPA',
        topRecruiters: ['Microsoft', 'Oracle', 'SAP', 'Adobe']
      },
      {
        id: 'ece',
        name: 'Electronics & Communication',
        shortName: 'ECE',
        seats: 240,
        cutoffs: { oc: 850, bc: 1400, mbc: 2100, sc: 4600, st: 8500 },
        avgPackage: '₹8 LPA',
        topRecruiters: ['Samsung', 'LG', 'Nokia', 'Ericsson']
      }
    ]
  },
  {
    id: 'jkkn',
    name: 'JKKN College of Engineering & Technology',
    shortName: 'JKKN Eng',
    location: 'Namakkal',
    type: 'Self-Financing',
    naacGrade: 'A',
    ranking: 15,
    placementRate: 85,
    avgPackage: '₹6.5 LPA',
    facilities: ['Library', 'Hostel', 'Sports', 'WiFi', 'Labs', 'Industry Connect'],
    branches: [
      {
        id: 'cse',
        name: 'Computer Science Engineering',
        shortName: 'CSE',
        seats: 120,
        cutoffs: { oc: 2500, bc: 4000, mbc: 5500, sc: 9000, st: 15000 },
        avgPackage: '₹8 LPA',
        topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'HCL']
      },
      {
        id: 'ece',
        name: 'Electronics & Communication',
        shortName: 'ECE',
        seats: 60,
        cutoffs: { oc: 3500, bc: 5500, mbc: 7500, sc: 12000, st: 18000 },
        avgPackage: '₹5.5 LPA',
        topRecruiters: ['Infosys', 'Wipro', 'Tech Mahindra']
      },
      {
        id: 'mech',
        name: 'Mechanical Engineering',
        shortName: 'MECH',
        seats: 60,
        cutoffs: { oc: 4500, bc: 7000, mbc: 9500, sc: 15000, st: 22000 },
        avgPackage: '₹4.5 LPA',
        topRecruiters: ['TVS', 'Ashok Leyland', 'L&T']
      },
      {
        id: 'civil',
        name: 'Civil Engineering',
        shortName: 'CIVIL',
        seats: 60,
        cutoffs: { oc: 5000, bc: 8000, mbc: 11000, sc: 17000, st: 25000 },
        avgPackage: '₹4 LPA',
        topRecruiters: ['L&T', 'Shapoorji', 'Prestige']
      }
    ]
  }
];

// Seat allocation algorithm
export const simulateSeatAllocation = (
  studentRank: number,
  category: 'oc' | 'bc' | 'mbc' | 'sc' | 'st',
  preferences: CollegePreference[]
): AllotmentResult => {
  // Sort preferences by priority
  const sortedPrefs = [...preferences].sort((a, b) => a.priority - b.priority);
  
  for (const pref of sortedPrefs) {
    const college = tneaColleges.find(c => c.id === pref.collegeId);
    if (!college) continue;
    
    const branch = college.branches.find(b => b.id === pref.branchId);
    if (!branch) continue;
    
    const cutoff = branch.cutoffs[category];
    
    // Check if rank is within cutoff (lower rank = better)
    if (studentRank <= cutoff) {
      // Simulate seat availability (85% chance of getting seat if within cutoff)
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
  category: 'oc' | 'bc' | 'mbc' | 'sc' | 'st'
): { college: College; eligibleBranches: Branch[] }[] => {
  const eligible: { college: College; eligibleBranches: Branch[] }[] = [];
  
  for (const college of tneaColleges) {
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
export const getRankPercentile = (rank: number, totalStudents: number = 250000): number => {
  return Math.round(((totalStudents - rank) / totalStudents) * 100 * 100) / 100;
};

// Get tier classification
export const getTierClassification = (rank: number): {
  tier: string;
  description: string;
  color: string;
} => {
  if (rank <= 500) {
    return { tier: 'Tier 1', description: 'Top Government Colleges', color: 'text-emerald-600' };
  } else if (rank <= 2000) {
    return { tier: 'Tier 2', description: 'Premium Aided Colleges', color: 'text-blue-600' };
  } else if (rank <= 5000) {
    return { tier: 'Tier 3', description: 'Good Self-Financing Colleges', color: 'text-purple-600' };
  } else if (rank <= 15000) {
    return { tier: 'Tier 4', description: 'Average Colleges', color: 'text-amber-600' };
  } else {
    return { tier: 'Tier 5', description: 'Entry Level Colleges', color: 'text-gray-600' };
  }
};
