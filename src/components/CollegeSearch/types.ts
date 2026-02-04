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

// Namakkal District Colleges - Complete List
export const NAMAKKAL_FEATURED_COLLEGES: College[] = [
  // ============================================
  // 1. GOVERNMENT COLLEGES
  // ============================================
  {
    id: 'arignar_anna_govt_arts',
    name: 'Arignar Anna Government Arts College, Namakkal',
    type: 'government',
    category: 'arts_science',
    courses: 'B.A, B.Sc, B.Com, M.A, M.Sc, M.Com',
    address: 'Sanniyasikaradu, Namakkal',
    feeRange: '₹1,000 - ₹5,000 per year',
  },
  {
    id: 'nkr_govt_arts_women',
    name: 'NKR Government Arts College for Women, Namakkal',
    type: 'government',
    category: 'arts_science',
    courses: 'B.A, B.Sc, B.Com, BCA, M.A, M.Sc',
    address: 'Trichy Road, Namakkal',
    feeRange: '₹1,000 - ₹5,000 per year',
  },
  {
    id: 'thiruvalluvar_govt_arts',
    name: 'Thiruvalluvar Government Arts College, Rasipuram',
    type: 'government',
    category: 'arts_science',
    courses: 'B.A, B.Sc, B.Com, M.A, M.Sc',
    address: 'Andagalur Gate, Rasipuram',
    feeRange: '₹1,000 - ₹5,000 per year',
  },
  {
    id: 'govt_arts_science_komarapalayam',
    name: 'Government Arts and Science College, Komarapalayam',
    type: 'government',
    category: 'arts_science',
    courses: 'B.A, B.Sc, B.Com, M.A, M.Sc',
    address: 'Komarapalayam',
    feeRange: '₹1,000 - ₹5,000 per year',
  },
  {
    id: 'govt_arts_science_senthamangalam',
    name: 'Government Arts and Science College, Senthamangalam',
    type: 'government',
    category: 'arts_science',
    courses: 'B.A, B.Sc, B.Com',
    address: 'Senthamangalam',
    feeRange: '₹1,000 - ₹5,000 per year',
  },
  {
    id: 'govt_medical_college_namakkal',
    name: 'Government Medical College, Namakkal',
    type: 'government',
    category: 'medical',
    courses: 'MBBS',
    address: 'Siluvampatti, Namakkal',
    feeRange: '₹15,000 - ₹25,000 per year',
    accreditation: 'NMC Approved',
  },
  {
    id: 'govt_law_college_namakkal',
    name: 'Government Law College, Namakkal',
    type: 'government',
    category: 'law',
    courses: 'B.A. LL.B (5 Year), LL.B (3 Year)',
    address: 'Namakkal',
    feeRange: '₹2,000 - ₹10,000 per year',
    accreditation: 'Bar Council of India Approved',
  },
  {
    id: 'vcri_namakkal',
    name: 'Veterinary College and Research Institute (VCRI), Namakkal',
    type: 'government',
    category: 'agricultural',
    courses: 'B.V.Sc & A.H, M.V.Sc, Ph.D',
    address: 'TANUVAS constituent',
    feeRange: '₹5,000 - ₹15,000 per year',
    accreditation: 'VCI Approved, TANUVAS Affiliated',
  },
  {
    id: 'govt_college_education_komarapalayam',
    name: 'Government College of Education, Komarapalayam',
    type: 'government',
    category: 'education',
    courses: 'B.Ed, M.Ed',
    address: 'Komarapalayam',
    feeRange: '₹2,000 - ₹8,000 per year',
    accreditation: 'NCTE Approved',
  },
  {
    id: 'govt_polytechnic_mohanur',
    name: 'Government Polytechnic College, Mohanur',
    type: 'government',
    category: 'polytechnic',
    courses: 'Diploma in Mechanical, Civil, ECE, EEE',
    address: 'Mohanur',
    feeRange: '₹2,000 - ₹5,000 per year',
    accreditation: 'AICTE Approved',
  },

  // ============================================
  // 2. AIDED COLLEGES
  // ============================================
  {
    id: 'kandaswami_kandars_college',
    name: "Kandaswami Kandar's College, Velur",
    type: 'government-aided',
    category: 'arts_science',
    courses: 'B.A, B.Sc, B.Com, BCA, M.A, M.Sc, M.Com',
    address: 'Paramathi Velur',
    feeRange: '₹5,000 - ₹25,000 per year',
  },
  {
    id: 'jkkn_aided_arts_science',
    name: 'J.K.K. Nataraja (JKKN) College of Arts & Science, Komarapalayam',
    type: 'government-aided',
    category: 'arts_science',
    courses: 'B.A, B.Sc, B.Com, BCA, BBA, M.A, M.Sc, M.Com',
    address: 'Komarapalayam (Operates both Aided and Self-Financing streams)',
    feeRange: '₹5,000 - ₹25,000 per year',
    isJKKN: true,
  },

  // ============================================
  // 3. AUTONOMOUS COLLEGES - Arts & Science
  // ============================================
  {
    id: 'jkkn_autonomous_arts_science',
    name: 'J.K.K. Nataraja (JKKN) College of Arts & Science',
    type: 'autonomous',
    category: 'arts_science',
    courses: 'B.Sc, B.Com, BCA, BBA, M.Sc, M.Com, MBA',
    address: 'Komarapalayam',
    feeRange: '₹25,000 - ₹75,000 per year',
    isJKKN: true,
  },
  {
    id: 'ksr_arts_science',
    name: 'K.S.R. College of Arts & Science, Tiruchengode',
    type: 'autonomous',
    category: 'arts_science',
    courses: 'B.Sc, B.Com, BCA, BBA, M.Sc, M.Com, MBA',
    address: 'Tiruchengode',
    feeRange: '₹30,000 - ₹80,000 per year',
  },
  {
    id: 'selvamm_arts_science',
    name: 'Selvamm Arts and Science College, Namakkal',
    type: 'autonomous',
    category: 'arts_science',
    courses: 'B.A, B.Sc, B.Com, BCA, M.A, M.Sc',
    address: 'Namakkal',
    feeRange: '₹20,000 - ₹50,000 per year',
  },
  {
    id: 'vivekanandha_arts_science',
    name: 'Vivekanandha College (VICAS), Elayampalayam',
    type: 'autonomous',
    category: 'arts_science',
    courses: 'B.A, B.Sc, B.Com, BCA, BBA, M.A, M.Sc, M.Com',
    address: 'Elayampalayam',
    feeRange: '₹25,000 - ₹70,000 per year',
  },
  {
    id: 'mahendra_arts_science',
    name: 'Mahendra Arts and Science College, Kalipatti',
    type: 'autonomous',
    category: 'arts_science',
    courses: 'B.Sc, B.Com, BCA, BBA, M.Sc, M.Com',
    address: 'Kalipatti',
    feeRange: '₹20,000 - ₹50,000 per year',
  },
  {
    id: 'sengunthar_arts_science',
    name: 'Sengunthar Arts and Science College',
    type: 'autonomous',
    category: 'arts_science',
    courses: 'B.A, B.Sc, B.Com, BCA, M.A, M.Sc',
    address: 'Tiruchengode',
    feeRange: '₹20,000 - ₹50,000 per year',
  },
  {
    id: 'muthayammal_arts_science',
    name: 'Muthayammal College of Arts & Science',
    type: 'autonomous',
    category: 'arts_science',
    courses: 'B.A, B.Sc, B.Com, BCA, M.A, M.Sc',
    address: 'Rasipuram',
    feeRange: '₹20,000 - ₹50,000 per year',
  },

  // ============================================
  // 3. AUTONOMOUS COLLEGES - Engineering & Technology
  // ============================================
  {
    id: 'excel_engineering',
    name: 'Excel Engineering College, Pallakkapalayam',
    type: 'autonomous',
    category: 'engineering',
    courses: 'B.E/B.Tech (CSE, ECE, EEE, Mech, Civil), M.E/M.Tech',
    address: 'Pallakkapalayam',
    feeRange: '₹50,000 - ₹1,20,000 per year',
    accreditation: 'AICTE Approved',
  },
  {
    id: 'paavai_engineering',
    name: 'Paavai Engineering College, Pachal',
    type: 'autonomous',
    category: 'engineering',
    courses: 'B.E/B.Tech (CSE, IT, ECE, EEE, Mech, Civil), M.E/M.Tech',
    address: 'Pachal',
    feeRange: '₹55,000 - ₹1,20,000 per year',
    accreditation: 'AICTE Approved, NBA Accredited',
  },
  {
    id: 'ksrct',
    name: 'K.S. Rangasamy College of Technology (KSRCT)',
    type: 'autonomous',
    category: 'engineering',
    courses: 'B.E/B.Tech (CSE, IT, ECE, EEE, Mech, Civil, AI&ML), M.E/M.Tech, MBA',
    address: 'Tiruchengode',
    feeRange: '₹70,000 - ₹1,50,000 per year',
    accreditation: 'NBA Accredited, AICTE Approved',
  },
  {
    id: 'ksr_engineering',
    name: 'K.S.R. College of Engineering, Tiruchengode',
    type: 'autonomous',
    category: 'engineering',
    courses: 'B.E/B.Tech (CSE, ECE, EEE, Mech, Civil), M.E/M.Tech',
    address: 'Tiruchengode',
    feeRange: '₹60,000 - ₹1,20,000 per year',
    accreditation: 'AICTE Approved',
  },
  {
    id: 'mahendra_engineering',
    name: 'Mahendra Engineering College, Mallasamudram',
    type: 'autonomous',
    category: 'engineering',
    courses: 'B.E/B.Tech (CSE, ECE, EEE, Mech, Civil), M.E/M.Tech',
    address: 'Mallasamudram',
    feeRange: '₹50,000 - ₹1,00,000 per year',
    accreditation: 'AICTE Approved',
  },
  {
    id: 'muthayammal_engineering',
    name: 'Muthayammal Engineering College, Rasipuram',
    type: 'autonomous',
    category: 'engineering',
    courses: 'B.E/B.Tech (CSE, ECE, EEE, Mech, Civil), M.E/M.Tech',
    address: 'Rasipuram',
    feeRange: '₹50,000 - ₹1,00,000 per year',
    accreditation: 'AICTE Approved',
  },
  {
    id: 'sengunthar_engineering',
    name: 'Sengunthar Engineering College, Tiruchengode',
    type: 'autonomous',
    category: 'engineering',
    courses: 'B.E/B.Tech (CSE, ECE, EEE, Mech), M.E/M.Tech',
    address: 'Tiruchengode',
    feeRange: '₹50,000 - ₹1,00,000 per year',
    accreditation: 'AICTE Approved',
  },
  {
    id: 'vivekanandha_engineering_women',
    name: 'Vivekanandha College of Engineering for Women',
    type: 'autonomous',
    category: 'engineering',
    courses: 'B.E/B.Tech (CSE, ECE, EEE), M.E/M.Tech',
    address: 'Elayampalayam',
    feeRange: '₹50,000 - ₹1,00,000 per year',
    accreditation: 'AICTE Approved',
  },

  // ============================================
  // 4. PRIVATE (SELF-FINANCING) COLLEGES - Arts & Science
  // ============================================
  {
    id: 'jkkn_sf_arts_science',
    name: 'JKKN College of Arts & Science (Self-finance stream)',
    type: 'private',
    category: 'arts_science',
    courses: 'B.Sc, B.Com, BCA, BBA, M.Sc, M.Com',
    address: 'Komarapalayam',
    feeRange: '₹25,000 - ₹75,000 per year',
    isJKKN: true,
  },
  {
    id: 'pgp_arts_science',
    name: 'PGP College of Arts & Science, Namakkal',
    type: 'private',
    category: 'arts_science',
    courses: 'B.A, B.Sc, B.Com, BCA, M.A, M.Sc',
    address: 'Namakkal',
    feeRange: '₹20,000 - ₹50,000 per year',
  },
  {
    id: 'trinity_college_women',
    name: 'Trinity College for Women, Namakkal',
    type: 'private',
    category: 'arts_science',
    courses: 'B.A, B.Sc, B.Com, BCA',
    address: 'Namakkal',
    feeRange: '₹20,000 - ₹45,000 per year',
  },
  {
    id: 'kavithas_arts_science',
    name: "Kavitha's College of Arts & Science, Tiruchengode",
    type: 'private',
    category: 'arts_science',
    courses: 'B.A, B.Sc, B.Com, BCA',
    address: 'Tiruchengode',
    feeRange: '₹18,000 - ₹40,000 per year',
  },
  {
    id: 'ssm_arts_science',
    name: 'SSM College of Arts & Science, Komarapalayam',
    type: 'private',
    category: 'arts_science',
    courses: 'B.A, B.Sc, B.Com, BCA, BBA',
    address: 'Komarapalayam',
    feeRange: '₹20,000 - ₹45,000 per year',
  },
  {
    id: 'loyola_college_mettala',
    name: 'Loyola College, Mettala',
    type: 'private',
    category: 'arts_science',
    courses: 'B.A, B.Sc, B.Com',
    address: 'Mettala',
    feeRange: '₹15,000 - ₹35,000 per year',
  },

  // ============================================
  // 4. PRIVATE (SELF-FINANCING) COLLEGES - Engineering
  // ============================================
  {
    id: 'jkkn_engineering',
    name: 'JKKN College of Engineering & Technology, Komarapalayam',
    type: 'private',
    category: 'engineering',
    courses: 'B.E/B.Tech (CSE, ECE, EEE, Mech, Civil), M.E/M.Tech',
    address: 'Komarapalayam',
    feeRange: '₹60,000 - ₹1,50,000 per year',
    accreditation: 'NBA Accredited, AICTE Approved',
    isJKKN: true,
  },
  {
    id: 'gnanamani_tech',
    name: 'Gnanamani College of Technology, Pachal',
    type: 'private',
    category: 'engineering',
    courses: 'B.E/B.Tech (CSE, ECE, EEE, Mech, Civil), M.E/M.Tech',
    address: 'Pachal',
    feeRange: '₹50,000 - ₹1,00,000 per year',
    accreditation: 'AICTE Approved',
  },
  {
    id: 'selvam_tech',
    name: 'Selvam College of Technology, Namakkal',
    type: 'private',
    category: 'engineering',
    courses: 'B.E/B.Tech (CSE, ECE, Mech, Civil)',
    address: 'Namakkal',
    feeRange: '₹45,000 - ₹90,000 per year',
    accreditation: 'AICTE Approved',
  },
  {
    id: 'king_tech',
    name: 'King College of Technology, Nallur',
    type: 'private',
    category: 'engineering',
    courses: 'B.E/B.Tech (CSE, ECE, EEE, Mech)',
    address: 'Nallur',
    feeRange: '₹45,000 - ₹90,000 per year',
    accreditation: 'AICTE Approved',
  },

  // ============================================
  // 4. PRIVATE - Medical & Health Sciences
  // ============================================
  {
    id: 'jkkn_dental',
    name: 'JKKN Dental College, Komarapalayam',
    type: 'private',
    category: 'dental',
    courses: 'BDS, MDS',
    address: 'Komarapalayam',
    feeRange: '₹3,00,000 - ₹8,00,000 per year',
    accreditation: 'DCI Approved',
    isJKKN: true,
  },
  {
    id: 'jkkn_pharmacy',
    name: 'JKKN College of Pharmacy, Komarapalayam',
    type: 'private',
    category: 'pharmacy',
    courses: 'B.Pharm, D.Pharm, M.Pharm, Pharm.D',
    address: 'Komarapalayam',
    feeRange: '₹50,000 - ₹1,50,000 per year',
    accreditation: 'PCI Approved',
    isJKKN: true,
  },
  {
    id: 'jkkn_nursing',
    name: 'JKKN College of Nursing, Komarapalayam',
    type: 'private',
    category: 'nursing',
    courses: 'B.Sc Nursing, M.Sc Nursing, GNM, ANM',
    address: 'Komarapalayam',
    feeRange: '₹40,000 - ₹1,20,000 per year',
    accreditation: 'INC Approved',
    isJKKN: true,
  },
  {
    id: 'ksr_dental',
    name: 'K.S.R. Institute of Dental Science & Research, Tiruchengode',
    type: 'private',
    category: 'dental',
    courses: 'BDS, MDS',
    address: 'Tiruchengode',
    feeRange: '₹3,50,000 - ₹9,00,000 per year',
    accreditation: 'DCI Approved',
  },
  {
    id: 'vivekanandha_dental',
    name: 'Vivekanandha Dental College, Tiruchengode',
    type: 'private',
    category: 'dental',
    courses: 'BDS, MDS',
    address: 'Tiruchengode',
    feeRange: '₹3,00,000 - ₹8,00,000 per year',
    accreditation: 'DCI Approved',
  },
  {
    id: 'vivekanandha_nursing',
    name: 'Vivekanandha College of Nursing, Tiruchengode',
    type: 'private',
    category: 'nursing',
    courses: 'B.Sc Nursing, M.Sc Nursing, GNM',
    address: 'Tiruchengode',
    feeRange: '₹40,000 - ₹1,00,000 per year',
    accreditation: 'INC Approved',
  },
  {
    id: 'vivekanandha_pharmacy',
    name: 'Vivekanandha College of Pharmacy, Tiruchengode',
    type: 'private',
    category: 'pharmacy',
    courses: 'B.Pharm, D.Pharm, M.Pharm',
    address: 'Tiruchengode',
    feeRange: '₹50,000 - ₹1,20,000 per year',
    accreditation: 'PCI Approved',
  },
  {
    id: 'excel_siddha',
    name: 'Excel Medical & Paramedical Institutions (Siddha)',
    type: 'private',
    category: 'medical',
    courses: 'BSMS (Siddha Medicine)',
    address: 'Pallakkapalayam',
    feeRange: '₹1,00,000 - ₹2,50,000 per year',
  },
  {
    id: 'excel_homeopathy',
    name: 'Excel Medical & Paramedical Institutions (Homeopathy)',
    type: 'private',
    category: 'medical',
    courses: 'BHMS (Homeopathy)',
    address: 'Pallakkapalayam',
    feeRange: '₹1,00,000 - ₹2,50,000 per year',
  },
  {
    id: 'excel_bpt',
    name: 'Excel Medical & Paramedical Institutions (Physiotherapy)',
    type: 'private',
    category: 'allied_health',
    courses: 'BPT (Physiotherapy)',
    address: 'Pallakkapalayam',
    feeRange: '₹80,000 - ₹1,50,000 per year',
  },

  // ============================================
  // 5. AGRICULTURE & SPECIALIZED COLLEGES
  // ============================================
  {
    id: 'pgp_agricultural',
    name: 'PGP College of Agricultural Sciences, Vettambadi',
    type: 'private',
    category: 'agricultural',
    courses: 'B.Sc Agriculture, B.Sc Horticulture',
    address: 'Vettambadi (Affiliated with TNAU)',
    feeRange: '₹50,000 - ₹1,00,000 per year',
    accreditation: 'TNAU Affiliated',
  },
  {
    id: 'paavai_agricultural',
    name: 'Paavai Institutions (Agriculture Engineering), Pachal',
    type: 'private',
    category: 'agricultural',
    courses: 'B.Tech Agricultural Engineering',
    address: 'Pachal',
    feeRange: '₹50,000 - ₹1,00,000 per year',
    accreditation: 'TNAU Affiliated',
  },
  {
    id: 'vcri_laddivadi',
    name: 'Veterinary College and Research Institute (VCRI), Laddivadi',
    type: 'government',
    category: 'agricultural',
    courses: 'B.V.Sc & A.H, M.V.Sc',
    address: 'Laddivadi, Namakkal',
    feeRange: '₹5,000 - ₹15,000 per year',
    accreditation: 'VCI Approved, TANUVAS Affiliated',
  },
];
