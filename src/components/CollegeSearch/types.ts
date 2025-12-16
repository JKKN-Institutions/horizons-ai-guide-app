export interface College {
  id: string;
  name: string;
  type: 'government' | 'government-aided' | 'private' | 'autonomous';
  category: CollegeCategory;
  naacGrade?: string;
  establishedYear?: number;
  courses: string;
  contact?: string;
  website?: string;
  feeRange?: string;
  address?: string;
  accreditation?: string;
  isJKKN?: boolean;
  placementStats?: string;
  facilities?: string[];
}

export type CollegeCategory = 
  | 'arts_science'
  | 'medical'
  | 'dental'
  | 'allied_health'
  | 'pharmacy'
  | 'nursing'
  | 'engineering'
  | 'agricultural'
  | 'education'
  | 'law'
  | 'hotel_management'
  | 'management'
  | 'fine_arts'
  | 'physical_education'
  | 'polytechnic';

export interface CategoryInfo {
  id: CollegeCategory;
  name: string;
  icon: string;
  order: number;
}

export const COLLEGE_CATEGORIES: CategoryInfo[] = [
  { id: 'arts_science', name: 'Arts and Science Colleges', icon: '🏛️', order: 1 },
  { id: 'medical', name: 'Medical Colleges (MBBS)', icon: '⚕️', order: 2 },
  { id: 'dental', name: 'Dental Colleges', icon: '🦷', order: 3 },
  { id: 'allied_health', name: 'Allied Health Sciences (AHS)', icon: '🏥', order: 4 },
  { id: 'pharmacy', name: 'Pharmacy Colleges', icon: '💊', order: 5 },
  { id: 'nursing', name: 'Nursing Colleges', icon: '👩‍⚕️', order: 6 },
  { id: 'engineering', name: 'Engineering Colleges', icon: '⚙️', order: 7 },
  { id: 'agricultural', name: 'Agricultural Colleges', icon: '🌾', order: 8 },
  { id: 'education', name: 'Education Colleges (B.Ed)', icon: '📚', order: 9 },
  { id: 'law', name: 'Law Colleges', icon: '⚖️', order: 10 },
  { id: 'hotel_management', name: 'Hotel Management Colleges', icon: '🏨', order: 11 },
  { id: 'management', name: 'Management/Business Colleges', icon: '💼', order: 12 },
  { id: 'fine_arts', name: 'Fine Arts Colleges', icon: '🎨', order: 13 },
  { id: 'physical_education', name: 'Physical Education Colleges', icon: '🏋️', order: 14 },
  { id: 'polytechnic', name: 'Polytechnic Colleges', icon: '🔬', order: 15 },
];

export const TAMIL_NADU_DISTRICTS = [
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 
  'Tirunelveli', 'Erode', 'Vellore', 'Thoothukudi', 'Dindigul',
  'Thanjavur', 'Ranipet', 'Sivaganga', 'Karur', 'Tirupur',
  'Nagapattinam', 'Cuddalore', 'Kanchipuram', 'Tiruvallur', 'Virudhunagar',
  'Namakkal', 'Krishnagiri', 'Theni', 'Perambalur', 'Ariyalur',
  'Nilgiris', 'Ramanathapuram', 'Villupuram', 'Tiruvannamalai', 'Pudukkottai',
  'Dharmapuri', 'Kanyakumari', 'Kallakurichi', 'Chengalpattu', 'Tenkasi',
  'Tirupattur', 'Mayiladuthurai', 'Thiruvarur'
].sort();

export const COLLEGE_TYPE_INFO = {
  government: { label: 'Government', color: 'bg-green-500', badge: '🟢' },
  'government-aided': { label: 'Government-Aided', color: 'bg-blue-500', badge: '🔵' },
  private: { label: 'Private', color: 'bg-orange-500', badge: '🟠' },
  autonomous: { label: 'Autonomous', color: 'bg-purple-500', badge: '🟣' },
};

export const JKKN_COLLEGES: Partial<Record<CollegeCategory, College>> = {
  arts_science: {
    id: 'jkkn_arts_science',
    name: 'JKKN College of Arts and Science',
    type: 'private',
    category: 'arts_science',
    naacGrade: 'A+',
    establishedYear: 1985,
    courses: 'B.Sc, B.Com, BCA, BBA, M.Sc, M.Com, MBA',
    contact: '04286-220700',
    website: 'www.jkkn.ac.in',
    feeRange: '₹25,000 - ₹75,000 per year',
    accreditation: 'Autonomous',
    isJKKN: true,
    placementStats: '85% placement rate',
    facilities: ['Library', 'Labs', 'Hostel', 'Sports Complex', 'Cafeteria'],
  },
  pharmacy: {
    id: 'jkkn_pharmacy',
    name: 'JKKN College of Pharmacy',
    type: 'private',
    category: 'pharmacy',
    naacGrade: 'A',
    establishedYear: 1992,
    courses: 'B.Pharm, D.Pharm, M.Pharm, Pharm.D',
    contact: '04286-220701',
    website: 'www.jkknpharmacy.ac.in',
    feeRange: '₹50,000 - ₹1,50,000 per year',
    accreditation: 'PCI Approved',
    isJKKN: true,
    placementStats: '90% placement rate',
  },
  dental: {
    id: 'jkkn_dental',
    name: 'JKKN Dental College and Hospital',
    type: 'private',
    category: 'dental',
    naacGrade: 'A',
    establishedYear: 2006,
    courses: 'BDS, MDS',
    contact: '04286-220702',
    website: 'www.jkkndental.ac.in',
    feeRange: '₹3,00,000 - ₹8,00,000 per year',
    accreditation: 'DCI Approved',
    isJKKN: true,
    placementStats: '95% placement rate',
  },
  nursing: {
    id: 'jkkn_nursing',
    name: 'JKKN College of Nursing',
    type: 'private',
    category: 'nursing',
    naacGrade: 'A',
    establishedYear: 2008,
    courses: 'B.Sc Nursing, M.Sc Nursing, GNM, ANM',
    contact: '04286-220703',
    website: 'www.jkknnursing.ac.in',
    feeRange: '₹40,000 - ₹1,20,000 per year',
    accreditation: 'INC Approved',
    isJKKN: true,
    placementStats: '92% placement rate',
  },
  engineering: {
    id: 'jkkn_engineering',
    name: 'JKKN College of Engineering and Technology',
    type: 'private',
    category: 'engineering',
    naacGrade: 'A',
    establishedYear: 2009,
    courses: 'B.E/B.Tech (CSE, ECE, EEE, Mech, Civil), M.E/M.Tech',
    contact: '04286-220704',
    website: 'www.jkknengg.ac.in',
    feeRange: '₹60,000 - ₹1,50,000 per year',
    accreditation: 'NBA Accredited, AICTE Approved',
    isJKKN: true,
    placementStats: '88% placement rate',
  },
  allied_health: {
    id: 'jkkn_allied_health',
    name: 'JKKN Institute of Allied Health Sciences',
    type: 'private',
    category: 'allied_health',
    naacGrade: 'A',
    establishedYear: 2012,
    courses: 'B.Sc MLT, B.Sc Radiology, B.Sc Optometry, B.Sc Cardiac Technology',
    contact: '04286-220705',
    website: 'www.jkknalliedhealth.ac.in',
    feeRange: '₹45,000 - ₹1,00,000 per year',
    accreditation: 'University Affiliated',
    isJKKN: true,
    placementStats: '87% placement rate',
  },
  agricultural: {
    id: 'jkkn_agricultural',
    name: 'JKKN College of Agricultural Science',
    type: 'private',
    category: 'agricultural',
    naacGrade: 'A',
    establishedYear: 2015,
    courses: 'B.Sc Agriculture, B.Sc Horticulture, M.Sc Agriculture',
    contact: '04286-220706',
    website: 'www.jkknagriculture.ac.in',
    feeRange: '₹50,000 - ₹1,00,000 per year',
    accreditation: 'ICAR Approved',
    isJKKN: true,
    placementStats: '80% placement rate',
  },
  education: {
    id: 'jkkn_education',
    name: 'JKKN College of Education',
    type: 'private',
    category: 'education',
    naacGrade: 'A',
    establishedYear: 2010,
    courses: 'B.Ed, M.Ed, D.El.Ed',
    contact: '04286-220707',
    website: 'www.jkkneducation.ac.in',
    feeRange: '₹35,000 - ₹75,000 per year',
    accreditation: 'NCTE Approved',
    isJKKN: true,
    placementStats: '85% placement rate',
  },
};
