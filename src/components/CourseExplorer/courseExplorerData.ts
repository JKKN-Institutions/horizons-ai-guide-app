export interface CourseInfo {
  id: string;
  name: string;
  shortName: string;
  duration: string;
  entrance: string;
  entranceRequired: boolean;
  fee: string;
  salaryRange: string;
  demandLevel: number;
  description: string;
  careers: string[];
  topColleges: string[];
  skills: string[];
  hot?: boolean;
  neetCutoff?: string;
  abroadOptions?: string;
  passRate?: string;
  path?: string[];
  globalRecognition?: boolean;
  eligibility?: string;
}

export interface CourseCategory {
  name: string;
  icon: string;
  courses: CourseInfo[];
}

export interface GroupCourses {
  categories: CourseCategory[];
}

export interface StreamGroup {
  code: string;
  subjects: string[];
  careers: string[];
  courseCount: number;
  popular?: boolean;
  badge?: string;
}

export interface StreamData {
  title: string;
  subtitle: string;
  color: string;
  bgClass: string;
  borderClass: string;
  accentClass: string;
  textClass: string;
  selectedBorder: string;
  selectedBg: string;
  dotClass: string;
  tagBg: string;
  tagText: string;
  groups: StreamGroup[];
}

export const streamsData: Record<string, StreamData> = {
  science_maths: {
    title: "🔬 Science - Maths Based",
    subtitle: "100 Series",
    color: "blue",
    bgClass: "bg-blue-50",
    borderClass: "border-blue-200",
    accentClass: "bg-blue-600",
    textClass: "text-blue-600",
    selectedBorder: "border-blue-500",
    selectedBg: "bg-blue-50",
    dotClass: "bg-blue-400",
    tagBg: "bg-blue-100",
    tagText: "text-blue-700",
    groups: [
      { code: "101", subjects: ["Physics", "Chemistry", "Statistics", "Mathematics"], careers: ["Engineering", "B.Sc Maths", "Data Science"], courseCount: 45 },
      { code: "102", subjects: ["Physics", "Chemistry", "Computer Science", "Mathematics"], careers: ["Software Engineer", "IT", "AI/ML"], courseCount: 52, popular: true },
      { code: "103", subjects: ["Physics", "Chemistry", "Biology", "Mathematics"], careers: ["Engineering", "Medical", "Research"], courseCount: 85, badge: "Most Flexible" },
      { code: "104", subjects: ["Physics", "Chemistry", "Bio-Chemistry", "Mathematics"], careers: ["Biochemistry", "Pharma", "Research"], courseCount: 38 },
      { code: "105", subjects: ["Physics", "Chemistry", "English", "Mathematics"], careers: ["Engineering", "Technical Writing"], courseCount: 42 },
      { code: "106", subjects: ["Physics", "Chemistry", "Mathematics", "Home Science"], careers: ["Food Tech", "Nutrition"], courseCount: 40 },
    ],
  },
  science_biology: {
    title: "🧬 Science - Biology Based",
    subtitle: "200 Series",
    color: "green",
    bgClass: "bg-emerald-50",
    borderClass: "border-emerald-200",
    accentClass: "bg-emerald-600",
    textClass: "text-emerald-600",
    selectedBorder: "border-emerald-500",
    selectedBg: "bg-emerald-50",
    dotClass: "bg-emerald-400",
    tagBg: "bg-emerald-100",
    tagText: "text-emerald-700",
    groups: [
      { code: "201", subjects: ["Physics", "Chemistry", "Biology", "Computer Science"], careers: ["Bioinformatics", "Health IT"], courseCount: 48 },
      { code: "202", subjects: ["Physics", "Chemistry", "Biology", "Micro-Biology"], careers: ["Microbiologist", "Lab Scientist"], courseCount: 42 },
      { code: "203", subjects: ["Physics", "Chemistry", "Biology", "Bio-Chemistry"], careers: ["Biochemist", "Pharma R&D"], courseCount: 40 },
      { code: "204", subjects: ["Physics", "Chemistry", "Biology", "Nursing"], careers: ["Nursing", "Healthcare"], courseCount: 35 },
      { code: "205", subjects: ["Physics", "Chemistry", "Biology", "Nutrition & Dietetics"], careers: ["Dietitian", "Food Science"], courseCount: 32 },
      { code: "206", subjects: ["Physics", "Chemistry", "Biology", "English"], careers: ["Medical Writing", "Healthcare"], courseCount: 38 },
      { code: "207", subjects: ["Physics", "Chemistry", "Biology", "Home Science"], careers: ["Nutrition", "Food Tech"], courseCount: 34 },
      { code: "208", subjects: ["Physics", "Chemistry", "Botany", "Zoology"], careers: ["MBBS", "BDS", "Nursing", "Pharmacy"], courseCount: 65, popular: true, badge: "Most Popular" },
    ],
  },
  commerce: {
    title: "💼 Commerce",
    subtitle: "300 Series",
    color: "orange",
    bgClass: "bg-amber-50",
    borderClass: "border-amber-200",
    accentClass: "bg-amber-600",
    textClass: "text-amber-600",
    selectedBorder: "border-amber-500",
    selectedBg: "bg-amber-50",
    dotClass: "bg-amber-400",
    tagBg: "bg-amber-100",
    tagText: "text-amber-700",
    groups: [
      { code: "301", subjects: ["Statistics", "Economics", "Commerce", "Accountancy"], careers: ["CA", "Banking", "Finance"], courseCount: 55 },
      { code: "302", subjects: ["Computer Science", "Economics", "Commerce", "Accountancy"], careers: ["CA", "FinTech", "Analytics"], courseCount: 62, popular: true, badge: "High Demand" },
      { code: "303", subjects: ["English", "Economics", "Commerce", "Accountancy"], careers: ["CA", "Marketing"], courseCount: 50 },
      { code: "304", subjects: ["History", "Economics", "Commerce", "Accountancy"], careers: ["CA", "Law", "UPSC"], courseCount: 85, badge: "UPSC Friendly" },
      { code: "305", subjects: ["Economics", "Political Science", "Commerce", "Accountancy"], careers: ["Civil Services", "Policy"], courseCount: 58 },
      { code: "306", subjects: ["Economics", "Commerce", "Accountancy", "Ethics"], careers: ["Civil Services", "HR"], courseCount: 52 },
      { code: "307", subjects: ["Economics", "Commerce", "Accountancy", "Advanced Language"], careers: ["CA", "Translation"], courseCount: 48 },
      { code: "308", subjects: ["Economics", "Commerce", "Accountancy", "Business Maths"], careers: ["CA", "Finance", "Actuary"], courseCount: 54 },
    ],
  },
  arts: {
    title: "📚 Arts / Humanities",
    subtitle: "400 Series",
    color: "purple",
    bgClass: "bg-purple-50",
    borderClass: "border-purple-200",
    accentClass: "bg-purple-600",
    textClass: "text-purple-600",
    selectedBorder: "border-purple-500",
    selectedBg: "bg-purple-50",
    dotClass: "bg-purple-400",
    tagBg: "bg-purple-100",
    tagText: "text-purple-700",
    groups: [
      { code: "401", subjects: ["Statistics", "Geography", "History", "Economics"], careers: ["Data + Govt Jobs", "UPSC"], courseCount: 62 },
      { code: "402", subjects: ["Computer Science", "Geography", "History", "Economics"], careers: ["IT + Govt Jobs", "GIS"], courseCount: 68, badge: "Tech + Arts" },
      { code: "403", subjects: ["Geography", "English", "History", "Economics"], careers: ["Journalism", "UPSC", "Media"], courseCount: 58 },
      { code: "404", subjects: ["Geography", "History", "Economics", "Political Science"], careers: ["UPSC/IAS", "Law", "Journalism"], courseCount: 72, popular: true, badge: "Best for UPSC" },
      { code: "405", subjects: ["Geography", "History", "Economics", "Ethics"], careers: ["UPSC", "Social Work"], courseCount: 55 },
      { code: "406", subjects: ["Geography", "History", "Economics", "Advanced Language"], careers: ["Translation", "UPSC"], courseCount: 52 },
    ],
  },
  vocational: {
    title: "🛠️ Vocational",
    subtitle: "Technical",
    color: "teal",
    bgClass: "bg-teal-50",
    borderClass: "border-teal-200",
    accentClass: "bg-teal-600",
    textClass: "text-teal-600",
    selectedBorder: "border-teal-500",
    selectedBg: "bg-teal-50",
    dotClass: "bg-teal-400",
    tagBg: "bg-teal-100",
    tagText: "text-teal-700",
    groups: [
      { code: "VOC", subjects: ["Computer Science", "Electronics", "Automobile", "Others"], careers: ["Technician", "IT Support"], courseCount: 35 },
    ],
  },
};

// Shared courses for science-maths groups
const engineeringCourses: CourseCategory = {
  name: "Engineering & Technology",
  icon: "🔧",
  courses: [
    { id: "btech-cse", name: "B.Tech Computer Science", shortName: "B.Tech CSE", duration: "4 years", entrance: "JEE Main / TNEA", entranceRequired: true, fee: "₹1-15 Lakhs", salaryRange: "₹4-25 LPA", demandLevel: 5, description: "Learn software development, algorithms, AI/ML, and computer systems.", careers: ["Software Engineer", "Data Scientist", "AI Engineer", "System Architect"], topColleges: ["IIT Madras", "Anna University", "VIT", "SRM", "PSG Tech"], skills: ["Programming", "DSA", "System Design", "Cloud Computing"] },
    { id: "btech-ece", name: "B.Tech Electronics & Communication", shortName: "B.Tech ECE", duration: "4 years", entrance: "JEE Main / TNEA", entranceRequired: true, fee: "₹1-12 Lakhs", salaryRange: "₹4-18 LPA", demandLevel: 4, description: "Study electronic circuits, communication systems, and signal processing.", careers: ["Electronics Engineer", "VLSI Designer", "Network Engineer"], topColleges: ["IIT Madras", "CEG Anna Univ", "PSG Tech"], skills: ["Circuit Design", "VLSI", "Embedded Systems"] },
    { id: "btech-mech", name: "B.Tech Mechanical Engineering", shortName: "B.Tech Mech", duration: "4 years", entrance: "JEE Main / TNEA", entranceRequired: true, fee: "₹1-10 Lakhs", salaryRange: "₹4-15 LPA", demandLevel: 3, description: "Design and build mechanical systems, automobiles, and industrial machinery.", careers: ["Design Engineer", "Manufacturing Engineer", "Automobile Engineer"], topColleges: ["IIT Madras", "CEG", "PSG Tech", "TCE"], skills: ["CAD/CAM", "Thermodynamics", "Manufacturing"] },
    { id: "btech-civil", name: "B.Tech Civil Engineering", shortName: "B.Tech Civil", duration: "4 years", entrance: "JEE Main / TNEA", entranceRequired: true, fee: "₹1-8 Lakhs", salaryRange: "₹4-12 LPA", demandLevel: 3, description: "Build infrastructure - roads, bridges, buildings, and water systems.", careers: ["Structural Engineer", "Construction Manager", "Urban Planner"], topColleges: ["IIT Madras", "CEG", "GCT Coimbatore"], skills: ["AutoCAD", "Structural Analysis", "Surveying"] },
    { id: "btech-ai", name: "B.Tech AI & Data Science", shortName: "B.Tech AI/DS", duration: "4 years", entrance: "JEE Main / TNEA", entranceRequired: true, fee: "₹2-15 Lakhs", salaryRange: "₹6-35 LPA", demandLevel: 5, hot: true, description: "Specialize in artificial intelligence, machine learning, and big data analytics.", careers: ["AI Engineer", "ML Engineer", "Data Scientist"], topColleges: ["IIT Madras", "Anna Univ", "VIT", "SRM"], skills: ["Python", "TensorFlow", "Deep Learning", "Statistics"] },
    { id: "btech-eee", name: "B.Tech Electrical Engineering", shortName: "B.Tech EEE", duration: "4 years", entrance: "JEE Main / TNEA", entranceRequired: true, fee: "₹1-10 Lakhs", salaryRange: "₹4-15 LPA", demandLevel: 4, description: "Work with power systems, electrical machines, and renewable energy.", careers: ["Power Engineer", "Electrical Design", "TNEB"], topColleges: ["IIT Madras", "CEG", "PSG", "GCT"], skills: ["Power Systems", "Control Systems", "PLC"] },
  ],
};

const architectureCourses: CourseCategory = {
  name: "Architecture & Design",
  icon: "🏛️",
  courses: [
    { id: "barch", name: "Bachelor of Architecture", shortName: "B.Arch", duration: "5 years", entrance: "NATA / JEE Paper 2", entranceRequired: true, fee: "₹2-15 Lakhs", salaryRange: "₹4-20 LPA", demandLevel: 4, description: "Design buildings, spaces, and urban environments with creativity and engineering.", careers: ["Architect", "Interior Designer", "Urban Planner"], topColleges: ["SAP Chennai", "SRM", "Anna Univ"], skills: ["AutoCAD", "3D Modeling", "Design Thinking"] },
  ],
};

const pureScienceCourses: CourseCategory = {
  name: "Pure Sciences",
  icon: "🔬",
  courses: [
    { id: "bsc-maths", name: "B.Sc Mathematics", shortName: "B.Sc Maths", duration: "3 years", entrance: "Merit Based", entranceRequired: false, fee: "₹15K-2 Lakhs", salaryRange: "₹3-12 LPA", demandLevel: 3, description: "Deep study of pure and applied mathematics with research opportunities.", careers: ["Data Analyst", "Actuary", "Professor"], topColleges: ["Loyola", "Presidency", "Stella Maris", "MCC"], skills: ["Mathematical Analysis", "Statistics", "Problem Solving"] },
    { id: "bsc-physics", name: "B.Sc Physics", shortName: "B.Sc Physics", duration: "3 years", entrance: "Merit Based", entranceRequired: false, fee: "₹15K-2 Lakhs", salaryRange: "₹3-15 LPA", demandLevel: 3, description: "Study fundamental physics and prepare for research at ISRO, DRDO, BARC.", careers: ["Scientist", "Professor", "ISRO/DRDO"], topColleges: ["Loyola", "Central Universities"], skills: ["Quantum Mechanics", "Lab Skills", "Research"] },
    { id: "bsc-cs", name: "B.Sc Computer Science", shortName: "B.Sc CS", duration: "3 years", entrance: "Merit Based", entranceRequired: false, fee: "₹30K-3 Lakhs", salaryRange: "₹3-12 LPA", demandLevel: 4, description: "Learn programming, software development, and computer fundamentals.", careers: ["Software Developer", "Web Developer", "IT Support"], topColleges: ["Loyola", "MCC", "Stella Maris"], skills: ["Programming", "Web Development", "Database"] },
    { id: "bca", name: "BCA - Computer Applications", shortName: "BCA", duration: "3 years", entrance: "Merit Based", entranceRequired: false, fee: "₹50K-4 Lakhs", salaryRange: "₹3-10 LPA", demandLevel: 4, description: "Application-focused computer science degree for IT industry entry.", careers: ["Software Developer", "App Developer", "Web Developer"], topColleges: ["Christ", "Loyola", "SRM", "VIT"], skills: ["Java", "Web Technologies", "Database"] },
  ],
};

const defenseCourses: CourseCategory = {
  name: "Defense Services",
  icon: "🎖️",
  courses: [
    { id: "nda", name: "NDA - National Defence Academy", shortName: "NDA", duration: "3 years", entrance: "UPSC NDA Exam", entranceRequired: true, fee: "Free (Govt)", salaryRange: "₹6-15 LPA", demandLevel: 4, description: "Join Indian Army, Navy, or Air Force as an officer.", careers: ["Army Officer", "Navy Officer", "Air Force Officer"], topColleges: ["NDA Khadakwasla"], skills: ["Physical Fitness", "Leadership", "Discipline"], eligibility: "Age 16.5-19.5 years, Unmarried" },
    { id: "merchant-navy", name: "Merchant Navy", shortName: "Merchant Navy", duration: "3-4 years", entrance: "IMU CET", entranceRequired: true, fee: "₹5-15 Lakhs", salaryRange: "₹8-40 LPA", demandLevel: 4, description: "Work on commercial ships, travel the world, and earn high salaries.", careers: ["Deck Officer", "Marine Engineer", "Ship Captain"], topColleges: ["IMU Chennai", "TMI Pune"], skills: ["Navigation", "Maritime Engineering", "Leadership"] },
  ],
};

// Medical courses for biology groups
const medicalCourses: CourseCategory = {
  name: "Medical (NEET Required)",
  icon: "🏥",
  courses: [
    { id: "mbbs", name: "MBBS - Bachelor of Medicine", shortName: "MBBS", duration: "5.5 years", entrance: "NEET UG", entranceRequired: true, fee: "₹50K-1 Crore", salaryRange: "₹8-100+ LPA", demandLevel: 5, hot: true, description: "Become a doctor. India's most prestigious medical degree.", careers: ["Doctor", "Surgeon", "Specialist", "Researcher"], topColleges: ["JIPMER", "MMC Chennai", "CMC Vellore", "Stanley"], skills: ["Clinical Skills", "Diagnosis", "Patient Care"], neetCutoff: "550-650 (Govt), 400-500 (Private)" },
    { id: "bds", name: "BDS - Dental Surgery", shortName: "BDS", duration: "5 years", entrance: "NEET UG", entranceRequired: true, fee: "₹3-50 Lakhs", salaryRange: "₹5-40 LPA", demandLevel: 4, description: "Become a dentist. Good work-life balance and own practice potential.", careers: ["Dentist", "Orthodontist", "Oral Surgeon"], topColleges: ["Govt Dental Chennai", "SRM Dental", "Saveetha"], skills: ["Dental Procedures", "Patient Care", "Surgery"], neetCutoff: "450-520 (Govt)" },
    { id: "bams", name: "BAMS - Ayurvedic Medicine", shortName: "BAMS", duration: "5.5 years", entrance: "NEET UG", entranceRequired: true, fee: "₹2-25 Lakhs", salaryRange: "₹4-25 LPA", demandLevel: 3, description: "Practice traditional Ayurvedic medicine with modern integration.", careers: ["Ayurvedic Doctor", "Wellness Consultant"], topColleges: ["Govt Ayurveda College", "AVP Coimbatore"], skills: ["Ayurveda", "Herbal Medicine", "Patient Care"], neetCutoff: "350-450" },
    { id: "bvsc", name: "BVSc - Veterinary Science", shortName: "BVSc", duration: "5 years", entrance: "NEET UG", entranceRequired: true, fee: "₹1-20 Lakhs", salaryRange: "₹5-25 LPA", demandLevel: 3, description: "Treat animals - pets, livestock, wildlife. Growing field.", careers: ["Veterinarian", "Animal Surgeon", "Wildlife Doctor"], topColleges: ["TANUVAS Chennai", "KVASU Kerala"], skills: ["Animal Care", "Surgery", "Diagnosis"], neetCutoff: "500-550" },
  ],
};

const nursingCourses: CourseCategory = {
  name: "Nursing & Patient Care",
  icon: "💉",
  courses: [
    { id: "bsc-nursing", name: "B.Sc Nursing", shortName: "B.Sc Nursing", duration: "4 years", entrance: "State Entrance / Merit", entranceRequired: false, fee: "₹1-8 Lakhs", salaryRange: "₹3-6 LPA (India), ₹30-60 LPA (Abroad)", demandLevel: 5, hot: true, description: "High global demand career. Work in India or abroad with excellent pay.", careers: ["Staff Nurse", "ICU Nurse", "International Nurse"], topColleges: ["CMC Vellore", "AIIMS", "Apollo"], skills: ["Patient Care", "Clinical Skills", "Emergency Care"], abroadOptions: "UK, USA, Canada, Australia, Gulf" },
    { id: "gnm", name: "GNM - General Nursing", shortName: "GNM", duration: "3 years", entrance: "Merit Based", entranceRequired: false, fee: "₹50K-3 Lakhs", salaryRange: "₹2.5-4 LPA", demandLevel: 4, description: "Diploma nursing course for quick hospital job entry.", careers: ["Staff Nurse", "Community Nurse"], topColleges: ["Govt Nursing Schools"], skills: ["Basic Nursing", "Patient Care", "First Aid"] },
  ],
};

const pharmacyCourses: CourseCategory = {
  name: "Pharmacy",
  icon: "💊",
  courses: [
    { id: "bpharm", name: "B.Pharm - Bachelor of Pharmacy", shortName: "B.Pharm", duration: "4 years", entrance: "State / GPAT", entranceRequired: false, fee: "₹2-10 Lakhs", salaryRange: "₹3-15 LPA", demandLevel: 4, description: "Work in pharma industry, drug development, or medical stores.", careers: ["Pharmacist", "Drug Inspector", "Clinical Research"], topColleges: ["JSS Ooty", "MMC", "SRM"], skills: ["Drug Knowledge", "Chemistry", "Quality Control"] },
    { id: "dpharm", name: "D.Pharm - Diploma in Pharmacy", shortName: "D.Pharm", duration: "2 years", entrance: "Merit Based", entranceRequired: false, fee: "₹50K-3 Lakhs", salaryRange: "₹2-4 LPA", demandLevel: 3, description: "Quick entry into pharmacy profession. Own medical shop possible.", careers: ["Pharmacist", "Medical Store Owner"], topColleges: ["Govt Polytechnics"], skills: ["Drug Dispensing", "Inventory"] },
  ],
};

const alliedHealthCourses: CourseCategory = {
  name: "Allied Health (No NEET)",
  icon: "🩺",
  courses: [
    { id: "bpt", name: "BPT - Physiotherapy", shortName: "BPT", duration: "4.5 years", entrance: "State Entrance", entranceRequired: false, fee: "₹2-10 Lakhs", salaryRange: "₹3-20 LPA", demandLevel: 4, description: "Help patients recover from injuries and disabilities.", careers: ["Physiotherapist", "Sports Physio", "Own Clinic"], topColleges: ["CMC Vellore", "SRM", "Saveetha"], skills: ["Manual Therapy", "Exercise Prescription", "Rehabilitation"] },
    { id: "bsc-mlt", name: "B.Sc MLT - Medical Lab Technology", shortName: "B.Sc MLT", duration: "3 years", entrance: "Merit Based", entranceRequired: false, fee: "₹1-5 Lakhs", salaryRange: "₹2.5-10 LPA", demandLevel: 4, description: "Work in diagnostic labs conducting medical tests.", careers: ["Lab Technician", "Pathology Tech"], topColleges: ["CMC Vellore", "JIPMER", "Apollo"], skills: ["Lab Techniques", "Sample Analysis"] },
    { id: "bsc-radiology", name: "B.Sc Radiology & Imaging", shortName: "B.Sc Radiology", duration: "3 years", entrance: "Merit Based", entranceRequired: false, fee: "₹1-5 Lakhs", salaryRange: "₹3-12 LPA", demandLevel: 4, description: "Operate X-ray, CT, MRI machines in hospitals.", careers: ["X-Ray Technician", "CT Tech", "MRI Tech"], topColleges: ["CMC Vellore", "JIPMER", "Fortis"], skills: ["Imaging Equipment", "Radiation Safety", "Anatomy"] },
    { id: "bsc-optometry", name: "B.Sc Optometry", shortName: "B.Sc Optometry", duration: "4 years", entrance: "Merit Based", entranceRequired: false, fee: "₹1-6 Lakhs", salaryRange: "₹3-10 LPA", demandLevel: 3, description: "Test vision and prescribe glasses. Own optical shop possible.", careers: ["Optometrist", "Vision Therapist"], topColleges: ["Sankara Nethralaya", "LV Prasad"], skills: ["Eye Testing", "Lens Fitting"] },
  ],
};

const lifeScienceCourses: CourseCategory = {
  name: "Life Sciences",
  icon: "🧬",
  courses: [
    { id: "bsc-biotech", name: "B.Sc Biotechnology", shortName: "B.Sc Biotech", duration: "3 years", entrance: "Merit Based", entranceRequired: false, fee: "₹1-5 Lakhs", salaryRange: "₹3-12 LPA", demandLevel: 4, description: "Work in biotech industry, research labs, and pharma R&D.", careers: ["Biotech Researcher", "Lab Scientist", "R&D"], topColleges: ["VIT", "SRM", "Anna Univ"], skills: ["Molecular Biology", "Genetic Engineering", "Bioinformatics"] },
    { id: "bsc-micro", name: "B.Sc Microbiology", shortName: "B.Sc Micro", duration: "3 years", entrance: "Merit Based", entranceRequired: false, fee: "₹50K-3 Lakhs", salaryRange: "₹3-10 LPA", demandLevel: 3, description: "Study microorganisms for healthcare, food, and environmental industries.", careers: ["Microbiologist", "QC Analyst", "Food Technologist"], topColleges: ["Loyola", "MCC", "Presidency"], skills: ["Microbial Culture", "Lab Safety", "Quality Control"] },
  ],
};

// Commerce courses
const professionalCourses: CourseCategory = {
  name: "Professional Courses",
  icon: "💼",
  courses: [
    { id: "ca", name: "CA - Chartered Accountant", shortName: "CA", duration: "4-5 years", entrance: "CA Foundation Exam", entranceRequired: true, fee: "₹1-2 Lakhs (total)", salaryRange: "₹7-50 LPA", demandLevel: 5, hot: true, description: "India's most prestigious accounting qualification. High demand & salary.", careers: ["Auditor", "Tax Consultant", "CFO", "Own Practice"], topColleges: ["ICAI (Self-study)"], skills: ["Accounting", "Taxation", "Auditing", "Financial Analysis"], passRate: "8-10%", path: ["CA Foundation", "CA Intermediate", "3 Year Articleship", "CA Final"] },
    { id: "cs", name: "CS - Company Secretary", shortName: "CS", duration: "3-4 years", entrance: "CSEET", entranceRequired: true, fee: "₹50K-1.5 Lakhs", salaryRange: "₹5-30 LPA", demandLevel: 4, description: "Corporate governance expert. Work with boards of directors.", careers: ["Company Secretary", "Compliance Officer", "Legal Advisor"], topColleges: ["ICSI (Self-study)"], skills: ["Corporate Law", "Compliance", "Governance"], passRate: "15-20%" },
    { id: "cma", name: "CMA - Cost & Management Accountant", shortName: "CMA", duration: "3-4 years", entrance: "CMA Foundation", entranceRequired: true, fee: "₹50K-1 Lakh", salaryRange: "₹5-25 LPA", demandLevel: 4, description: "Cost accounting and management specialist for industries.", careers: ["Cost Accountant", "Management Accountant", "Financial Controller"], topColleges: ["ICMAI (Self-study)"], skills: ["Cost Accounting", "Budgeting", "Financial Planning"], passRate: "12-15%" },
    { id: "acca", name: "ACCA - UK Accounting", shortName: "ACCA", duration: "2-3 years", entrance: "Direct Entry", entranceRequired: false, fee: "₹3-5 Lakhs", salaryRange: "₹8-40 LPA", demandLevel: 4, description: "Global accounting qualification. Valid in 180+ countries.", careers: ["Global Accountant", "Finance Manager"], topColleges: ["ACCA Approved Centers"], skills: ["International Accounting", "IFRS", "Audit"], globalRecognition: true },
  ],
};

const ugCommerceCourses: CourseCategory = {
  name: "Undergraduate Degrees",
  icon: "🎓",
  courses: [
    { id: "bcom", name: "B.Com - Bachelor of Commerce", shortName: "B.Com", duration: "3 years", entrance: "Merit Based", entranceRequired: false, fee: "₹15K-3 Lakhs", salaryRange: "₹3-8 LPA", demandLevel: 4, description: "Foundation for commerce careers. Combine with CA/CS for best results.", careers: ["Accountant", "Bank Jobs", "CA/CS Path"], topColleges: ["Loyola", "Stella Maris", "MCC", "Presidency"], skills: ["Accounting", "Economics", "Business Law"] },
    { id: "bba", name: "BBA - Business Administration", shortName: "BBA", duration: "3 years", entrance: "Merit / Entrance", entranceRequired: false, fee: "₹1-8 Lakhs", salaryRange: "₹4-12 LPA", demandLevel: 4, description: "Management fundamentals for future MBA or business roles.", careers: ["Management Trainee", "Marketing Executive", "Entrepreneur"], topColleges: ["Christ", "Symbiosis", "NMIMS", "Loyola"], skills: ["Management", "Marketing", "HR", "Communication"] },
    { id: "bca-comm", name: "BCA - Computer Applications", shortName: "BCA", duration: "3 years", entrance: "Merit Based", entranceRequired: false, fee: "₹1-5 Lakhs", salaryRange: "₹3-10 LPA", demandLevel: 4, description: "IT degree for commerce students who want tech careers.", careers: ["Software Developer", "Web Developer", "IT Analyst"], topColleges: ["Christ", "VIT", "SRM"], skills: ["Programming", "Web Development", "Database"] },
    { id: "ba-economics", name: "B.A Economics", shortName: "B.A Econ", duration: "3 years", entrance: "Merit / CUET", entranceRequired: false, fee: "₹20K-5 Lakhs", salaryRange: "₹4-15 LPA", demandLevel: 4, description: "Study economic theory and policy. Great for UPSC and RBI.", careers: ["Economist", "Policy Analyst", "RBI Officer", "UPSC"], topColleges: ["St. Stephen's", "Presidency", "Loyola"], skills: ["Economic Analysis", "Statistics", "Policy"] },
  ],
};

// Arts courses
const artsProfessionalCourses: CourseCategory = {
  name: "Professional Paths",
  icon: "⚖️",
  courses: [
    { id: "ba-llb", name: "BA LLB - Law", shortName: "BA LLB", duration: "5 years", entrance: "CLAT / AILET", entranceRequired: true, fee: "₹1-15 Lakhs", salaryRange: "₹5-50 LPA", demandLevel: 5, description: "Integrated law degree. High-demand profession with diverse career paths.", careers: ["Lawyer", "Judge", "Legal Advisor", "Corporate Counsel"], topColleges: ["NLU Delhi", "NLSIU Bangalore", "NALSAR", "TNDALU"], skills: ["Legal Research", "Argumentation", "Contract Law"] },
    { id: "upsc-prep", name: "UPSC Civil Services", shortName: "UPSC/IAS", duration: "1-3 years prep", entrance: "UPSC CSE", entranceRequired: true, fee: "₹50K-3 Lakhs (coaching)", salaryRange: "₹8-20 LPA + Perks", demandLevel: 5, hot: true, description: "India's most prestigious exam. Become IAS, IPS, IFS officer.", careers: ["IAS Officer", "IPS Officer", "IFS Officer", "IRS Officer"], topColleges: ["Self-study / Coaching"], skills: ["Current Affairs", "Essay Writing", "General Studies", "Optional Subject"] },
  ],
};

const artsUGCourses: CourseCategory = {
  name: "Undergraduate Degrees",
  icon: "🎓",
  courses: [
    { id: "ba-english", name: "B.A English Literature", shortName: "B.A English", duration: "3 years", entrance: "Merit / CUET", entranceRequired: false, fee: "₹15K-3 Lakhs", salaryRange: "₹3-12 LPA", demandLevel: 3, description: "Study literature, develop communication and critical thinking skills.", careers: ["Content Writer", "Editor", "Teacher", "Journalist"], topColleges: ["Loyola", "Stella Maris", "MCC", "Presidency"], skills: ["Writing", "Critical Analysis", "Communication"] },
    { id: "ba-history", name: "B.A History", shortName: "B.A History", duration: "3 years", entrance: "Merit / CUET", entranceRequired: false, fee: "₹15K-2 Lakhs", salaryRange: "₹3-10 LPA", demandLevel: 3, description: "Study Indian and world history. Excellent for UPSC preparation.", careers: ["UPSC", "Historian", "Professor", "Museum Curator"], topColleges: ["St. Stephen's", "Hindu College", "Presidency"], skills: ["Research", "Analysis", "Writing"] },
    { id: "ba-polsci", name: "B.A Political Science", shortName: "B.A Pol Sci", duration: "3 years", entrance: "Merit / CUET", entranceRequired: false, fee: "₹15K-3 Lakhs", salaryRange: "₹3-12 LPA", demandLevel: 3, description: "Study governance, politics, and international relations.", careers: ["UPSC", "Policy Analyst", "Political Journalist", "Diplomat"], topColleges: ["St. Stephen's", "LSR", "JNU", "Presidency"], skills: ["Political Analysis", "Public Speaking", "Research"] },
    { id: "bjmc", name: "BJMC - Journalism & Mass Comm", shortName: "BJMC", duration: "3 years", entrance: "Merit / Entrance", entranceRequired: false, fee: "₹1-8 Lakhs", salaryRange: "₹3-15 LPA", demandLevel: 4, description: "Become a journalist, anchor, or media professional.", careers: ["TV Journalist", "Reporter", "PR Manager", "Content Creator"], topColleges: ["IIMC", "AJK MCRC", "Asian College"], skills: ["Reporting", "Video Production", "Social Media"] },
    { id: "bsw", name: "BSW - Social Work", shortName: "BSW", duration: "3 years", entrance: "Merit Based", entranceRequired: false, fee: "₹15K-2 Lakhs", salaryRange: "₹3-8 LPA", demandLevel: 3, description: "Work for social change, NGOs, and community development.", careers: ["Social Worker", "NGO Manager", "Community Developer", "Counselor"], topColleges: ["TISS", "Loyola", "MCC"], skills: ["Empathy", "Community Engagement", "Counseling"] },
  ],
};

// Vocational courses
const vocationalCourses: CourseCategory = {
  name: "Diploma & Vocational",
  icon: "🛠️",
  courses: [
    { id: "diploma-cs", name: "Diploma in Computer Engineering", shortName: "Diploma CS", duration: "3 years", entrance: "Merit Based", entranceRequired: false, fee: "₹20K-2 Lakhs", salaryRange: "₹2-6 LPA", demandLevel: 4, description: "Hands-on computer skills for IT support and junior dev roles.", careers: ["IT Technician", "Web Developer", "Help Desk"], topColleges: ["Govt Polytechnics", "Private Polytechnics"], skills: ["Hardware", "Networking", "Programming"] },
    { id: "diploma-elec", name: "Diploma in Electronics", shortName: "Diploma ECE", duration: "3 years", entrance: "Merit Based", entranceRequired: false, fee: "₹20K-2 Lakhs", salaryRange: "₹2-5 LPA", demandLevel: 3, description: "Electronics repair, installation, and maintenance.", careers: ["Electronics Technician", "IoT Installer", "Repair Specialist"], topColleges: ["Govt Polytechnics"], skills: ["Circuit Repair", "Soldering", "Testing"] },
    { id: "diploma-auto", name: "Diploma in Automobile Engineering", shortName: "Diploma Auto", duration: "3 years", entrance: "Merit Based", entranceRequired: false, fee: "₹20K-2 Lakhs", salaryRange: "₹2-6 LPA", demandLevel: 3, description: "Work with automobiles, EV technology, and workshops.", careers: ["Auto Technician", "Service Advisor", "EV Specialist"], topColleges: ["Govt Polytechnics", "Private Colleges"], skills: ["Engine Repair", "Diagnostics", "EV Systems"] },
    { id: "iti", name: "ITI - Industrial Training", shortName: "ITI", duration: "1-2 years", entrance: "Merit Based", entranceRequired: false, fee: "₹5K-50K", salaryRange: "₹1.5-4 LPA", demandLevel: 3, description: "Quick skill-based training for trade jobs.", careers: ["Electrician", "Fitter", "Welder", "Plumber"], topColleges: ["Govt ITIs across TN"], skills: ["Trade Skills", "Safety", "Tools"] },
  ],
};

// Map group codes to course categories
export const getCoursesForGroup = (groupCode: string): CourseCategory[] => {
  const code = parseInt(groupCode);

  // Science - Maths (100 series)
  if (code >= 101 && code <= 106) {
    return [engineeringCourses, architectureCourses, pureScienceCourses, defenseCourses];
  }

  // Science - Biology (200 series)
  if (code >= 201 && code <= 208) {
    const categories = [medicalCourses, nursingCourses, pharmacyCourses, alliedHealthCourses, lifeScienceCourses];
    // Group 201 has CS, add some tech courses
    if (code === 201) {
      categories.push(pureScienceCourses);
    }
    return categories;
  }

  // Commerce (300 series)
  if (code >= 301 && code <= 308) {
    return [professionalCourses, ugCommerceCourses];
  }

  // Arts (400 series)
  if (code >= 401 && code <= 406) {
    return [artsProfessionalCourses, artsUGCourses];
  }

  // Vocational
  if (groupCode === "VOC") {
    return [vocationalCourses, pureScienceCourses];
  }

  return [];
};

export const boards = [
  { id: "tn", name: "Tamil Nadu State Board", icon: "🏛️", isDefault: true },
  { id: "cbse", name: "CBSE", icon: "📘" },
  { id: "icse", name: "ICSE", icon: "📗" },
  { id: "other", name: "Other", icon: "📚" },
];
