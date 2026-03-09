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

// ═══════════════════════════════════════════════════════════
// COMPLETE COURSE DATABASE — ALL COURSES FOR 12TH PASS
// Organized by category, with every course available in India
// ═══════════════════════════════════════════════════════════

const C = (id: string, name: string, short: string, dur: string, ent: string, entReq: boolean, fee: string, sal: string, dem: number, desc: string, careers: string[], colleges: string[], skills: string[], extra?: Partial<CourseInfo>): CourseInfo => ({
  id, name, shortName: short, duration: dur, entrance: ent, entranceRequired: entReq, fee, salaryRange: sal, demandLevel: dem, description: desc, careers, topColleges: colleges, skills, ...extra
});

// ═══ 1. ENGINEERING & TECHNOLOGY (20 courses) ═══
const engineeringCourses: CourseCategory = {
  name: "Engineering & Technology",
  icon: "🔧",
  courses: [
    C("btech-cse", "B.Tech Computer Science & Engineering", "B.Tech CSE", "4 years", "JEE Main / TNEA", true, "₹1-15L", "₹4-25 LPA", 5, "Software development, algorithms, AI/ML, and computer systems.", ["Software Engineer", "Data Scientist", "AI Engineer", "Full Stack Developer"], ["IIT Madras", "Anna University", "VIT", "SRM", "PSG Tech"], ["Programming", "DSA", "Cloud", "System Design"], { hot: true }),
    C("btech-it", "B.Tech Information Technology", "B.Tech IT", "4 years", "JEE Main / TNEA", true, "₹1-12L", "₹4-20 LPA", 5, "IT systems, networking, cybersecurity, and enterprise solutions.", ["IT Manager", "Cloud Architect", "Cybersecurity Analyst"], ["Anna University", "VIT", "SRM", "SASTRA"], ["Networking", "Cloud", "Cybersecurity"]),
    C("btech-ece", "B.Tech Electronics & Communication", "B.Tech ECE", "4 years", "JEE Main / TNEA", true, "₹1-12L", "₹4-18 LPA", 4, "Electronic circuits, communication systems, VLSI, IoT.", ["VLSI Designer", "Telecom Engineer", "IoT Developer"], ["IIT Madras", "CEG Anna Univ", "PSG Tech", "NIT Trichy"], ["Circuit Design", "VLSI", "Embedded Systems"]),
    C("btech-eee", "B.Tech Electrical & Electronics", "B.Tech EEE", "4 years", "JEE Main / TNEA", true, "₹1-10L", "₹4-15 LPA", 4, "Power systems, electrical machines, renewable energy, smart grids.", ["Power Engineer", "TNEB Engineer", "Renewable Energy"], ["IIT Madras", "CEG", "PSG", "GCT Coimbatore"], ["Power Systems", "Control Systems", "PLC"]),
    C("btech-mech", "B.Tech Mechanical Engineering", "B.Tech Mech", "4 years", "JEE Main / TNEA", true, "₹1-10L", "₹4-15 LPA", 3, "Design machines, automobiles, industrial systems, robotics.", ["Design Engineer", "Automobile Engineer", "Manufacturing"], ["IIT Madras", "CEG", "PSG Tech", "TCE Madurai"], ["CAD/CAM", "Thermodynamics", "Manufacturing"]),
    C("btech-civil", "B.Tech Civil Engineering", "B.Tech Civil", "4 years", "JEE Main / TNEA", true, "₹1-8L", "₹4-12 LPA", 3, "Build infrastructure — roads, bridges, buildings, dams.", ["Structural Engineer", "Construction Manager", "Urban Planner"], ["IIT Madras", "CEG", "GCT Coimbatore", "TCE"], ["AutoCAD", "Structural Analysis", "Surveying"]),
    C("btech-ai", "B.Tech AI & Data Science", "B.Tech AI/DS", "4 years", "JEE Main / TNEA", true, "₹2-15L", "₹6-35 LPA", 5, "Artificial intelligence, machine learning, big data analytics.", ["AI Engineer", "ML Engineer", "Data Scientist"], ["IIT Madras", "Anna Univ", "VIT", "SRM"], ["Python", "TensorFlow", "Deep Learning"], { hot: true }),
    C("btech-chem", "B.Tech Chemical Engineering", "B.Tech Chem", "4 years", "JEE Main / TNEA", true, "₹1-8L", "₹4-15 LPA", 3, "Chemical processes, petroleum refining, pharmaceuticals.", ["Chemical Engineer", "Process Engineer", "Pharma"], ["IIT Madras", "NIT Trichy", "ACT Chennai"], ["Process Design", "Plant Operations", "Safety"]),
    C("btech-biotech", "B.Tech Biotechnology", "B.Tech Biotech", "4 years", "JEE Main / TNEA", true, "₹1-10L", "₹3-15 LPA", 3, "Genetic engineering, bioinformatics, pharmaceutical biotech.", ["Biotech Engineer", "Research Scientist", "Pharma R&D"], ["IIT Madras", "VIT", "SASTRA", "SRM"], ["Genetic Engg", "Bioinformatics", "Cell Biology"]),
    C("btech-food", "B.Tech Food Technology", "B.Tech Food", "4 years", "JEE Main / TNEA", true, "₹1-8L", "₹3-12 LPA", 3, "Food processing, preservation, quality control, packaging.", ["Food Technologist", "Quality Manager", "R&D"], ["NIFTEM", "CFTRI Mysore", "Anna Univ"], ["Food Processing", "Quality Control", "FSSAI"]),
    C("btech-aero", "B.Tech Aeronautical Engineering", "B.Tech Aero", "4 years", "JEE Main / TNEA", true, "₹1-12L", "₹5-20 LPA", 4, "Aircraft design, propulsion, aerodynamics, space technology.", ["Aerospace Engineer", "ISRO/DRDO", "Airline Industry"], ["IIT Madras", "MIT Anna Univ", "IIST"], ["Aerodynamics", "Propulsion", "CAD"]),
    C("btech-auto", "B.Tech Automobile Engineering", "B.Tech Auto", "4 years", "JEE Main / TNEA", true, "₹1-8L", "₹4-15 LPA", 3, "Vehicle design, EV technology, automotive systems.", ["Automobile Engineer", "EV Designer", "Testing Engineer"], ["Anna Univ", "VIT", "SRM", "PSG Tech"], ["Vehicle Dynamics", "EV Systems", "CAD"]),
    C("btech-marine", "B.Tech Marine Engineering", "B.Tech Marine", "4 years", "IMU CET / JEE", true, "₹3-15L", "₹8-40 LPA", 4, "Ship propulsion, marine systems, work on commercial vessels.", ["Marine Engineer", "Ship Superintendent"], ["IMU Chennai", "MERI Mumbai", "TMI Pune"], ["Marine Systems", "Navigation", "Diesel Engines"]),
    C("btech-robo", "B.Tech Robotics & Automation", "B.Tech Robotics", "4 years", "JEE Main / TNEA", true, "₹2-12L", "₹5-20 LPA", 4, "Design robots, automation systems, industrial IoT.", ["Robotics Engineer", "Automation Specialist", "IoT Developer"], ["IIT Madras", "VIT", "SRM", "BITS"], ["ROS", "PLC", "Embedded Systems"], { hot: true }),
    C("btech-biomedical", "B.Tech Biomedical Engineering", "B.Tech Biomed", "4 years", "JEE Main / TNEA", true, "₹1-10L", "₹4-15 LPA", 3, "Medical devices, prosthetics, hospital equipment, health IT.", ["Biomedical Engineer", "Medical Device Designer"], ["IIT Madras", "VIT", "SRM", "Manipal"], ["Medical Devices", "Signal Processing", "Biomaterials"]),
    C("btech-textile", "B.Tech Textile Technology", "B.Tech Textile", "4 years", "JEE Main / TNEA", true, "₹1-6L", "₹3-10 LPA", 2, "Textile manufacturing, fabric design, garment technology.", ["Textile Engineer", "Quality Manager", "Fashion Tech"], ["PSG Tech", "Anna Univ", "Kumaraguru"], ["Fibre Science", "Fabric Design", "Quality"]),
    C("btech-mining", "B.Tech Mining Engineering", "B.Tech Mining", "4 years", "JEE Main", true, "₹1-8L", "₹5-15 LPA", 3, "Mine planning, mineral extraction, safety engineering.", ["Mining Engineer", "Safety Manager", "Geologist"], ["IIT Kharagpur", "ISM Dhanbad", "NIT Surathkal"], ["Mine Planning", "Geology", "Safety"]),
    C("btech-agri", "B.Tech Agricultural Engineering", "B.Tech Agri", "4 years", "JEE Main / ICAR", true, "₹1-6L", "₹3-12 LPA", 3, "Farm machinery, irrigation systems, food processing.", ["Agricultural Engineer", "Farm Manager", "Agri-tech"], ["TNAU Coimbatore", "IIT Kharagpur", "ICAR Colleges"], ["Farm Machinery", "Irrigation", "Soil Science"]),
    C("btech-env", "B.Tech Environmental Engineering", "B.Tech Env", "4 years", "JEE Main / TNEA", true, "₹1-8L", "₹4-12 LPA", 3, "Pollution control, waste management, environmental impact assessment.", ["Environmental Engineer", "EIA Consultant", "Pollution Control"], ["IIT Madras", "NIT Trichy", "Anna Univ"], ["EIA", "Water Treatment", "Waste Management"]),
    C("btech-instru", "B.Tech Instrumentation Engineering", "B.Tech Instru", "4 years", "JEE Main / TNEA", true, "₹1-8L", "₹4-15 LPA", 3, "Sensors, control systems, process automation, IoT.", ["Instrumentation Engineer", "Process Control", "IoT"], ["NIT Trichy", "Anna Univ", "PSG Tech"], ["PLC/SCADA", "Sensors", "Control Systems"]),
  ],
};

// ═══ 2. ARCHITECTURE & DESIGN (5 courses) ═══
const architectureCourses: CourseCategory = {
  name: "Architecture & Design",
  icon: "🏛️",
  courses: [
    C("barch", "Bachelor of Architecture", "B.Arch", "5 years", "NATA / JEE Paper 2", true, "₹2-15L", "₹4-20 LPA", 4, "Design buildings, spaces, and urban environments.", ["Architect", "Urban Planner", "Interior Designer"], ["SAP Chennai", "SRM", "Anna Univ", "NIT Trichy"], ["AutoCAD", "3D Modeling", "Design Thinking"]),
    C("bdes-interior", "B.Des Interior Design", "B.Des Interior", "4 years", "UCEED / NID DAT", true, "₹2-10L", "₹3-15 LPA", 4, "Design interior spaces — homes, offices, retail, hospitality.", ["Interior Designer", "Space Planner", "Set Designer"], ["NID", "CEPT", "SPA Delhi", "Pearl Academy"], ["Space Planning", "3D Visualization", "Material Science"]),
    C("bdes-product", "B.Des Product / Industrial Design", "B.Des Product", "4 years", "UCEED / NID DAT", true, "₹2-12L", "₹4-18 LPA", 4, "Design products — gadgets, furniture, packaging, consumer goods.", ["Product Designer", "UX Designer", "Industrial Designer"], ["IIT Bombay", "NID", "IIITDM Jabalpur"], ["Sketching", "CAD", "Prototyping", "UX"]),
    C("bplan", "B.Plan — Bachelor of Planning", "B.Plan", "4 years", "JEE Main Paper 2", true, "₹1-8L", "₹4-12 LPA", 3, "Urban and regional planning, smart city development.", ["Urban Planner", "Town Planner", "Govt Planning Dept"], ["SPA Delhi", "IIT Kharagpur", "CEPT"], ["Urban Planning", "GIS", "Policy"]),
    C("bdes-fashion", "B.Des Fashion Design", "B.Des Fashion", "4 years", "NIFT / NID DAT", true, "₹2-12L", "₹3-15 LPA", 4, "Fashion design, textile design, garment construction.", ["Fashion Designer", "Stylist", "Fashion Merchandiser"], ["NIFT Chennai", "NIFT Delhi", "Pearl Academy"], ["Pattern Making", "Draping", "CAD", "Textile"]),
  ],
};

// ═══ 3. PURE SCIENCES (15 courses) ═══
const pureScienceCourses: CourseCategory = {
  name: "Pure Sciences & IT",
  icon: "🔬",
  courses: [
    C("bsc-maths", "B.Sc Mathematics", "B.Sc Maths", "3 years", "Merit / CUET", false, "₹15K-2L", "₹3-12 LPA", 3, "Pure and applied mathematics. Excellent for data science & research.", ["Data Analyst", "Actuary", "Professor", "Researcher"], ["Loyola", "Presidency", "Stella Maris", "MCC"], ["Mathematical Analysis", "Statistics", "Problem Solving"]),
    C("bsc-physics", "B.Sc Physics", "B.Sc Physics", "3 years", "Merit / CUET", false, "₹15K-2L", "₹3-15 LPA", 3, "Fundamental physics. Prepare for ISRO, DRDO, BARC, research.", ["Scientist", "ISRO/DRDO", "Professor", "Lab Scientist"], ["Loyola", "Presidency", "Central Universities"], ["Quantum Mechanics", "Lab Skills", "Research"]),
    C("bsc-chemistry", "B.Sc Chemistry", "B.Sc Chemistry", "3 years", "Merit / CUET", false, "₹15K-2L", "₹3-10 LPA", 3, "Study chemical reactions, organic/inorganic chemistry, lab techniques.", ["Chemist", "Pharma R&D", "Quality Control", "Professor"], ["Loyola", "MCC", "Presidency", "Central Universities"], ["Lab Techniques", "Organic Chemistry", "Analysis"]),
    C("bsc-cs", "B.Sc Computer Science", "B.Sc CS", "3 years", "Merit / CUET", false, "₹30K-3L", "₹3-12 LPA", 4, "Programming, software development, databases, web technologies.", ["Software Developer", "Web Developer", "IT Support"], ["Loyola", "MCC", "Stella Maris", "Christ University"], ["Programming", "Web Development", "Database"]),
    C("bca", "BCA — Bachelor of Computer Applications", "BCA", "3 years", "Merit / CUET", false, "₹50K-4L", "₹3-10 LPA", 4, "Application-focused IT degree. Popular alternative to B.Tech.", ["Software Developer", "App Developer", "Web Developer"], ["Christ University", "Loyola", "SRM", "VIT"], ["Java", "Web Tech", "Mobile Apps"]),
    C("bsc-stats", "B.Sc Statistics", "B.Sc Stats", "3 years", "Merit / CUET", false, "₹15K-2L", "₹3-15 LPA", 4, "Statistical methods, probability, data analysis. High demand in analytics.", ["Statistician", "Data Analyst", "Actuary", "Research Analyst"], ["ISI Kolkata", "St. Stephen's", "Loyola"], ["R/Python", "Probability", "Regression"], { hot: true }),
    C("bsc-electronics", "B.Sc Electronics", "B.Sc Electronics", "3 years", "Merit / CUET", false, "₹20K-2L", "₹3-10 LPA", 3, "Electronic circuits, microprocessors, communication systems.", ["Electronics Technician", "Embedded Developer", "IoT"], ["Loyola", "MCC", "Presidency"], ["Circuit Design", "Microprocessor", "IoT"]),
    C("bsc-biotech", "B.Sc Biotechnology", "B.Sc Biotech", "3 years", "Merit / CUET", false, "₹30K-3L", "₹3-12 LPA", 3, "Genetic engineering, molecular biology, bioinformatics.", ["Biotech Researcher", "Lab Scientist", "Pharma R&D"], ["VIT", "SRM", "Loyola", "Christ"], ["Molecular Biology", "Genetics", "Lab Techniques"]),
    C("bsc-micro", "B.Sc Microbiology", "B.Sc Micro", "3 years", "Merit / CUET", false, "₹20K-3L", "₹3-10 LPA", 3, "Study microorganisms — bacteria, viruses, fungi. Lab-intensive.", ["Microbiologist", "Lab Technician", "Quality Control", "Pharma"], ["Loyola", "Presidency", "Central Universities"], ["Microbial Culture", "Lab Techniques", "Food Safety"]),
    C("bsc-biochem", "B.Sc Biochemistry", "B.Sc Biochem", "3 years", "Merit / CUET", false, "₹20K-2L", "₹3-10 LPA", 3, "Chemical processes in living organisms. Bridge between bio & chemistry.", ["Biochemist", "Research Analyst", "Pharma R&D"], ["Presidency", "Loyola", "Central Universities"], ["Enzymology", "Molecular Biology", "Lab Skills"]),
    C("bsc-env", "B.Sc Environmental Science", "B.Sc Env Sci", "3 years", "Merit / CUET", false, "₹15K-2L", "₹3-10 LPA", 3, "Ecology, pollution, conservation, sustainability.", ["Environmental Scientist", "EIA Consultant", "Wildlife Officer"], ["Presidency", "BHU", "Delhi University"], ["Ecology", "EIA", "Conservation"]),
    C("bsc-forensic", "B.Sc Forensic Science", "B.Sc Forensic", "3 years", "Merit / CUET", false, "₹30K-4L", "₹3-12 LPA", 4, "Crime scene investigation, forensic lab analysis, cybercrime.", ["Forensic Scientist", "Forensic Analyst", "Crime Lab", "Cyber Forensic"], ["Gujarat Forensic Sciences Uni", "LNJN NICFS Delhi", "Bundelkhand Univ"], ["DNA Analysis", "Fingerprinting", "Toxicology"]),
    C("bsc-geology", "B.Sc Geology", "B.Sc Geology", "3 years", "Merit / CUET", false, "₹15K-2L", "₹3-12 LPA", 3, "Study earth sciences, minerals, groundwater, petroleum exploration.", ["Geologist", "Mining Consultant", "ONGC/ISRO", "GSI"], ["BHU", "Presidency", "Andhra University"], ["Mineralogy", "Geophysics", "GIS"]),
    C("bsc-food-nutrition", "B.Sc Food Science & Nutrition", "B.Sc Food/Nutrition", "3 years", "Merit / CUET", false, "₹20K-3L", "₹3-10 LPA", 3, "Food processing, nutrition planning, dietetics, food safety.", ["Food Technologist", "Dietitian", "Nutritionist", "FSSAI Inspector"], ["NIFTEM", "Women's Christian College", "Central Universities"], ["Nutrition", "Food Processing", "FSSAI"]),
    C("bsc-animation", "B.Sc Animation & Multimedia", "B.Sc Animation", "3 years", "Merit / Portfolio", false, "₹50K-5L", "₹3-15 LPA", 4, "2D/3D animation, VFX, game design, multimedia production.", ["Animator", "VFX Artist", "Game Designer", "Motion Graphics"], ["Arena", "MAAC", "Frameboxx", "LPU"], ["Maya/Blender", "After Effects", "Game Engines"]),
  ],
};

// ═══ 4. DEFENCE SERVICES (4 courses) ═══
const defenseCourses: CourseCategory = {
  name: "Defence Services",
  icon: "🎖️",
  courses: [
    C("nda", "NDA — National Defence Academy", "NDA", "3 years", "UPSC NDA Exam", true, "Free (Govt)", "₹6-15 LPA", 4, "Become an Army/Navy/Air Force officer. Prestigious career.", ["Army Officer", "Navy Officer", "Air Force Officer"], ["NDA Khadakwasla, Pune"], ["Leadership", "Physical Fitness", "Strategy"], { eligibility: "Age 16.5-19.5, Unmarried" }),
    C("merchant-navy", "Merchant Navy (B.Sc Nautical Science)", "Merchant Navy", "3 years", "IMU CET", true, "₹5-15L", "₹8-40 LPA", 4, "Work on commercial ships. Travel the world, earn high salaries.", ["Deck Officer", "Ship Captain", "Marine Engineer"], ["IMU Chennai", "TMI Pune", "MERI Mumbai"], ["Navigation", "Maritime Law", "Leadership"]),
    C("coast-guard", "Indian Coast Guard (Navik)", "Coast Guard", "Training", "Coast Guard CBT", true, "Free (Govt)", "₹5-12 LPA", 3, "Protect India's coastline. Maritime security & rescue operations.", ["Coast Guard Officer", "Maritime Operations"], ["Coast Guard Academy, Kannur"], ["Maritime Skills", "Fitness", "Rescue"]),
    C("agniveer", "Agniveer (Army/Navy/Air Force)", "Agniveer", "4 years", "Agniveer CEE", true, "Free (Govt)", "₹4-7 LPA", 3, "Short-service military career. Training + combat experience.", ["Soldier", "Technician", "Clerk"], ["Army/Navy/AF Training Centres"], ["Combat", "Technical", "Fitness"]),
  ],
};

// ═══ 5. MEDICAL — NEET REQUIRED (8 courses) ═══
const medicalCourses: CourseCategory = {
  name: "Medical (NEET Required)",
  icon: "🏥",
  courses: [
    C("mbbs", "MBBS — Bachelor of Medicine", "MBBS", "5.5 years", "NEET UG", true, "₹50K-1Cr", "₹8-100+ LPA", 5, "India's most prestigious medical degree. Become a doctor.", ["Doctor", "Surgeon", "Specialist", "Researcher"], ["JIPMER", "MMC Chennai", "CMC Vellore", "Stanley"], ["Clinical Skills", "Diagnosis", "Surgery"], { hot: true, neetCutoff: "550-650 (Govt)" }),
    C("bds", "BDS — Dental Surgery", "BDS", "5 years", "NEET UG", true, "₹3-50L", "₹5-40 LPA", 4, "Become a dentist. Own practice potential, good work-life balance.", ["Dentist", "Orthodontist", "Oral Surgeon"], ["Govt Dental Chennai", "SRM Dental", "Saveetha"], ["Dental Procedures", "Surgery", "Patient Care"], { neetCutoff: "450-520 (Govt)" }),
    C("bams", "BAMS — Ayurvedic Medicine", "BAMS", "5.5 years", "NEET UG", true, "₹2-25L", "₹4-25 LPA", 3, "Practice Ayurveda with modern integration. Own clinic possible.", ["Ayurvedic Doctor", "Wellness Consultant"], ["Govt Ayurveda College", "AVP Coimbatore"], ["Ayurveda", "Herbal Medicine", "Panchakarma"], { neetCutoff: "350-450" }),
    C("bhms", "BHMS — Homeopathic Medicine", "BHMS", "5.5 years", "NEET UG", true, "₹1-20L", "₹3-15 LPA", 3, "Practice homeopathy. Strong demand for alternative medicine.", ["Homeopathic Doctor", "Own Clinic"], ["National Institute of Homeopathy", "Father Muller"], ["Homeopathy", "Materia Medica", "Patient Care"], { neetCutoff: "300-400" }),
    C("bsms", "BSMS — Siddha Medicine", "BSMS", "5.5 years", "NEET UG", true, "₹1-10L", "₹3-12 LPA", 3, "Traditional Siddha medicine — strong in Tamil Nadu.", ["Siddha Doctor", "Govt Hospital", "Own Clinic"], ["Govt Siddha Medical College Chennai", "NIS Chennai"], ["Siddha", "Herbal Medicine", "Traditional Healing"], { neetCutoff: "300-380" }),
    C("bums", "BUMS — Unani Medicine", "BUMS", "5.5 years", "NEET UG", true, "₹1-15L", "₹3-12 LPA", 2, "Practice Unani (Greco-Arabic) traditional medicine.", ["Unani Doctor", "AYUSH Hospital"], ["Ajmal Khan Tibbiya College", "NIUM Bangalore"], ["Unani", "Pharmacology", "Patient Care"], { neetCutoff: "300-380" }),
    C("bnys", "BNYS — Naturopathy & Yoga", "BNYS", "5.5 years", "NEET UG", true, "₹1-10L", "₹3-15 LPA", 3, "Naturopathy, yoga therapy, holistic wellness — growing demand.", ["Naturopath", "Yoga Therapist", "Wellness Centre"], ["GNYMC Coimbatore", "SDM Dharwad"], ["Naturopathy", "Yoga Therapy", "Nutrition"]),
    C("bvsc", "BVSc — Veterinary Science", "BVSc", "5 years", "NEET UG", true, "₹1-20L", "₹5-25 LPA", 3, "Treat animals — pets, livestock, wildlife. Growing field.", ["Veterinarian", "Animal Surgeon", "Wildlife Doctor"], ["TANUVAS Chennai", "KVASU Kerala"], ["Animal Care", "Surgery", "Diagnosis"], { neetCutoff: "500-550" }),
  ],
};

// ═══ 6. NURSING & PATIENT CARE (3 courses) ═══
const nursingCourses: CourseCategory = {
  name: "Nursing & Patient Care",
  icon: "💉",
  courses: [
    C("bsc-nursing", "B.Sc Nursing", "B.Sc Nursing", "4 years", "State Entrance / NEET", false, "₹1-8L", "₹3-6 LPA (India), ₹30-60 LPA (Abroad)", 5, "Highest global demand. Work in India, UK, USA, Canada, Australia, Gulf.", ["Staff Nurse", "ICU Nurse", "International Nurse"], ["CMC Vellore", "AIIMS", "Apollo", "SRM"], ["Patient Care", "Clinical Skills", "Emergency Care"], { hot: true, abroadOptions: "UK, USA, Canada, Australia, Gulf" }),
    C("gnm", "GNM — General Nursing & Midwifery", "GNM", "3 years", "Merit Based", false, "₹50K-3L", "₹2.5-4 LPA", 4, "Diploma nursing — quick hospital job entry.", ["Staff Nurse", "Community Nurse", "Midwife"], ["Govt Nursing Schools across TN"], ["Basic Nursing", "Midwifery", "Patient Care"]),
    C("anm", "ANM — Auxiliary Nurse Midwife", "ANM", "2 years", "Merit Based", false, "₹20K-1.5L", "₹2-3.5 LPA", 3, "Shortest nursing course. Work in PHCs, community health.", ["Community Health Worker", "PHC Nurse", "ANM"], ["Govt ANM Schools", "District Hospitals"], ["Basic Nursing", "Immunization", "Maternal Care"]),
  ],
};

// ═══ 7. PHARMACY (2 courses) ═══
const pharmacyCourses: CourseCategory = {
  name: "Pharmacy",
  icon: "💊",
  courses: [
    C("bpharm", "B.Pharm — Bachelor of Pharmacy", "B.Pharm", "4 years", "State Entrance / Merit", false, "₹1-8L", "₹3-12 LPA", 4, "Work in pharma companies, hospitals, drug research, own medical shop.", ["Pharmacist", "Drug Inspector", "Pharma R&D", "Medical Representative"], ["JSS Ooty", "Manipal", "BITS Pilani", "Madras Medical College"], ["Pharmacology", "Drug Formulation", "Quality Control"]),
    C("dpharm", "D.Pharm — Diploma in Pharmacy", "D.Pharm", "2 years", "Merit Based", false, "₹50K-3L", "₹2-5 LPA", 3, "Quick entry into pharmacy. Open a medical shop with license.", ["Pharmacist", "Medical Shop Owner", "Hospital Pharmacist"], ["Govt Pharmacy Colleges", "Private Colleges"], ["Dispensing", "Drug Knowledge", "Customer Service"]),
  ],
};

// ═══ 8. ALLIED HEALTH SCIENCES (12 courses) ═══
const alliedHealthCourses: CourseCategory = {
  name: "Allied Health Sciences",
  icon: "🩺",
  courses: [
    C("bpt", "BPT — Bachelor of Physiotherapy", "BPT", "4.5 years", "State Entrance / Merit", false, "₹1-8L", "₹3-12 LPA", 4, "Treat injuries, disabilities through exercise and manual therapy.", ["Physiotherapist", "Sports Physio", "Own Clinic"], ["CMC Vellore", "SRM", "SRMC Chennai"], ["Manual Therapy", "Rehabilitation", "Exercise Science"]),
    C("bot", "BOT — Occupational Therapy", "BOT", "4.5 years", "State Entrance / Merit", false, "₹1-6L", "₹3-10 LPA", 3, "Help patients recover daily living skills after illness/injury.", ["Occupational Therapist", "Rehabilitation Specialist"], ["CMC Vellore", "Manipal", "AIIMS"], ["Rehabilitation", "Adaptive Skills", "Patient Care"]),
    C("baslp", "BASLP — Audiology & Speech Therapy", "BASLP", "4 years", "State Entrance / Merit", false, "₹1-6L", "₹3-12 LPA", 4, "Diagnose and treat hearing & speech disorders in all ages.", ["Audiologist", "Speech Therapist", "Own Clinic"], ["AIISH Mysore", "CMC Vellore", "Manipal"], ["Audiology", "Speech Pathology", "Hearing Aids"]),
    C("bsc-mlt", "B.Sc Medical Lab Technology", "B.Sc MLT", "3 years", "Merit Based", false, "₹50K-4L", "₹2.5-8 LPA", 4, "Run diagnostic tests — blood, urine, pathology, microbiology.", ["Lab Technologist", "Pathology Lab", "Hospital Lab"], ["CMC Vellore", "JIPMER", "SRM Medical"], ["Hematology", "Microbiology", "Biochemistry"]),
    C("bsc-radiology", "B.Sc Radiology & Imaging", "B.Sc Radiology", "3 years", "Merit Based", false, "₹50K-4L", "₹3-10 LPA", 4, "Operate X-ray, CT, MRI, Ultrasound machines. High demand.", ["Radiographer", "CT/MRI Technologist", "Sonographer"], ["CMC Vellore", "JIPMER", "SRM", "Apollo"], ["X-ray", "CT Scan", "MRI", "Ultrasound"]),
    C("bsc-optometry", "B.Sc Optometry", "B.Sc Optometry", "4 years", "Merit Based", false, "₹50K-5L", "₹3-10 LPA", 3, "Eye care — vision testing, prescribe glasses, contact lenses.", ["Optometrist", "Eye Clinic", "Lens Specialist"], ["LVPEI Hyderabad", "SRM", "Manipal"], ["Vision Testing", "Contact Lens", "Eye Care"]),
    C("bsc-cardiac", "B.Sc Cardiac Technology", "B.Sc Cardiac", "3 years", "Merit Based", false, "₹50K-4L", "₹3-10 LPA", 4, "ECG, ECHO, cardiac catheterization — support cardiologists.", ["Cardiac Technologist", "ECG Technician", "Cath Lab Tech"], ["CMC Vellore", "JIPMER", "Apollo Hospitals"], ["ECG", "Echocardiography", "Cardiac Care"]),
    C("bsc-respiratory", "B.Sc Respiratory Therapy", "B.Sc Resp Therapy", "3 years", "Merit Based", false, "₹50K-4L", "₹3-10 LPA", 4, "Manage ventilators, oxygen therapy, treat respiratory diseases.", ["Respiratory Therapist", "ICU Specialist", "Ventilator Tech"], ["CMC Vellore", "Manipal", "Apollo"], ["Ventilator Management", "Pulmonary Care", "ICU"]),
    C("bsc-ot-tech", "B.Sc Operation Theatre Technology", "B.Sc OT Tech", "3 years", "Merit Based", false, "₹50K-3L", "₹2.5-8 LPA", 3, "Assist surgeons in operation theatre. Manage OT equipment.", ["OT Technician", "Surgical Assistant", "Hospital OT"], ["CMC Vellore", "JIPMER", "SRM Medical"], ["OT Procedures", "Sterilization", "Surgical Instruments"]),
    C("bsc-dialysis", "B.Sc Dialysis Technology", "B.Sc Dialysis", "3 years", "Merit Based", false, "₹50K-3L", "₹3-8 LPA", 3, "Operate dialysis machines for kidney patients.", ["Dialysis Technician", "Nephrology Unit", "Dialysis Centre"], ["CMC Vellore", "JIPMER", "Apollo"], ["Dialysis Machine", "Patient Care", "Renal Care"]),
    C("bsc-anaesthesia", "B.Sc Anaesthesia Technology", "B.Sc Anaesthesia", "3 years", "Merit Based", false, "₹50K-3L", "₹3-8 LPA", 3, "Assist anesthesiologists during surgery. Monitor vital signs.", ["Anaesthesia Technologist", "OT Support", "ICU"], ["CMC Vellore", "JIPMER", "Apollo", "SRM"], ["Anaesthesia Equipment", "Monitoring", "Emergency"]),
    C("bsc-emergency", "B.Sc Emergency & Trauma Care", "B.Sc Emergency", "3 years", "Merit Based", false, "₹50K-4L", "₹3-10 LPA", 4, "Emergency medical care, ambulance services, disaster management.", ["Emergency Medical Technician", "Trauma Care", "Ambulance"], ["CMC Vellore", "JIPMER", "Apollo", "108 Ambulance"], ["Emergency Care", "Trauma", "CPR/BLS"]),
  ],
};

// ═══ 9. LIFE SCIENCES & AGRICULTURE (8 courses) ═══
const lifeScienceCourses: CourseCategory = {
  name: "Life Sciences & Agriculture",
  icon: "🌿",
  courses: [
    C("bsc-zoology", "B.Sc Zoology", "B.Sc Zoology", "3 years", "Merit / CUET", false, "₹15K-2L", "₹3-10 LPA", 3, "Study animal kingdom — classification, anatomy, ecology.", ["Zoologist", "Wildlife Officer", "Lab Scientist", "Professor"], ["Loyola", "Presidency", "BHU"], ["Animal Taxonomy", "Ecology", "Lab Skills"]),
    C("bsc-botany", "B.Sc Botany", "B.Sc Botany", "3 years", "Merit / CUET", false, "₹15K-2L", "₹3-8 LPA", 2, "Study plants — taxonomy, physiology, ecology, genetics.", ["Botanist", "Forest Officer", "Agriculture Research", "Professor"], ["Presidency", "BHU", "DU"], ["Plant Science", "Taxonomy", "Ecology"]),
    C("bsc-agri", "B.Sc Agriculture", "B.Sc Agriculture", "4 years", "TNAU / ICAR", true, "₹20K-3L", "₹3-12 LPA", 4, "Modern farming, crop science, soil science, agribusiness.", ["Agricultural Officer", "Farm Manager", "Agri-tech Startup", "FCI/NABARD"], ["TNAU Coimbatore", "ICAR Colleges", "UAS Bangalore"], ["Crop Science", "Soil Science", "Agribusiness"], { hot: true }),
    C("bsc-horti", "B.Sc Horticulture", "B.Sc Horticulture", "4 years", "TNAU / State", true, "₹20K-2L", "₹3-10 LPA", 3, "Fruits, vegetables, flowers, landscaping, nursery management.", ["Horticulturist", "Nursery Manager", "Landscape Designer"], ["TNAU", "IIHR Bangalore", "UAS Dharwad"], ["Horticulture", "Landscaping", "Nursery"]),
    C("bsc-forestry", "B.Sc Forestry", "B.Sc Forestry", "4 years", "State / ICAR", true, "₹20K-2L", "₹3-12 LPA", 3, "Forest management, wildlife conservation, timber industry.", ["Forest Officer (IFS)", "Wildlife Manager", "Conservation"], ["FRI Dehradun", "TNAU", "ICAR"], ["Forest Management", "Wildlife", "Conservation"]),
    C("bfsc", "B.F.Sc — Fisheries Science", "B.F.Sc", "4 years", "TNAU / ICAR", true, "₹15K-2L", "₹3-10 LPA", 3, "Aquaculture, fish production, marine biology, fish processing.", ["Fisheries Officer", "Aquaculture Manager", "Marine Biologist"], ["TNJFU Chennai", "CIFE Mumbai", "ICAR"], ["Aquaculture", "Marine Biology", "Fish Processing"]),
    C("bsc-genetics", "B.Sc Genetics", "B.Sc Genetics", "3 years", "Merit / CUET", false, "₹30K-3L", "₹3-12 LPA", 4, "Study genes, heredity, DNA, genetic engineering.", ["Genetic Counselor", "Research Scientist", "Pharma R&D"], ["University of Madras", "Osmania University", "BHU"], ["Molecular Genetics", "Bioinformatics", "Lab Techniques"]),
    C("bsc-home-science", "B.Sc Home Science", "B.Sc Home Sci", "3 years", "Merit / CUET", false, "₹15K-2L", "₹3-8 LPA", 2, "Nutrition, child development, textile, interior decoration, food science.", ["Nutritionist", "Child Development Officer", "ICDS Worker"], ["Lady Irwin College Delhi", "Women's Christian College", "Avinashilingam Univ"], ["Nutrition", "Child Dev", "Food Science"]),
  ],
};

// ═══ 10. PROFESSIONAL COMMERCE (4 courses) ═══
const professionalCourses: CourseCategory = {
  name: "Professional Courses (CA/CS/CMA)",
  icon: "🏆",
  courses: [
    C("ca", "CA — Chartered Accountant", "CA", "4-5 years", "CA Foundation", true, "₹50K-1.5L", "₹7-50 LPA", 5, "India's most prestigious commerce qualification. Finance & audit.", ["Chartered Accountant", "CFO", "Financial Advisor", "Auditor"], ["ICAI (Self-study + Coaching)"], ["Accounting", "Audit", "Taxation", "Finance"], { hot: true, passRate: "5-10% at Final" }),
    C("cs", "CS — Company Secretary", "CS", "3-4 years", "CSEET", true, "₹50K-1.5L", "₹5-30 LPA", 4, "Corporate governance, compliance, board management.", ["Company Secretary", "Compliance Officer", "Legal Advisor"], ["ICSI (Self-study)"], ["Corporate Law", "Compliance", "Governance"], { passRate: "15-20%" }),
    C("cma", "CMA — Cost & Management Accountant", "CMA", "3-4 years", "CMA Foundation", true, "₹30K-1L", "₹5-25 LPA", 4, "Cost accounting, management accounting, financial analysis.", ["Cost Accountant", "Financial Controller", "Budget Analyst"], ["ICMAI (Self-study)"], ["Cost Accounting", "Budgeting", "Financial Analysis"]),
    C("acca", "ACCA — UK Chartered Accountant", "ACCA", "2-3 years", "Registration", false, "₹2-5L", "₹8-35 LPA", 4, "Global accounting qualification. Work worldwide.", ["Global Accountant", "Audit Manager", "Finance Director"], ["ACCA (Online + Coaching)"], ["International Accounting", "IFRS", "Audit"], { globalRecognition: true }),
  ],
};

// ═══ 11. COMMERCE & MANAGEMENT UG (10 courses) ═══
const ugCommerceCourses: CourseCategory = {
  name: "Commerce & Management UG",
  icon: "💼",
  courses: [
    C("bcom", "B.Com — Bachelor of Commerce", "B.Com", "3 years", "Merit / CUET", false, "₹10K-3L", "₹3-8 LPA", 4, "Foundation for CA/CS/CMA/MBA. Accounting, finance, economics.", ["Accountant", "Tax Consultant", "Banking", "Finance"], ["Loyola", "Hindu College", "St. Xavier's", "Christ"], ["Accounting", "Taxation", "Economics"]),
    C("bcom-hons", "B.Com (Honours)", "B.Com Hons", "3 years", "Merit / CUET", false, "₹15K-4L", "₹3-10 LPA", 4, "Deeper specialization in one commerce area. Better placements.", ["Financial Analyst", "Accountant", "Banking", "CA Preparation"], ["SRCC Delhi", "St. Xavier's Mumbai", "Christ Bangalore"], ["Advanced Accounting", "Finance", "Economics"]),
    C("bcom-ca", "B.Com (Computer Applications)", "B.Com CA", "3 years", "Merit", false, "₹15K-3L", "₹3-8 LPA", 4, "Commerce + IT skills. Popular in Tamil Nadu.", ["IT + Accounting", "ERP Consultant", "Data Entry"], ["Loyola", "MCC", "Stella Maris", "Ethiraj"], ["Tally", "SAP", "Advanced Excel", "Accounting"]),
    C("bcom-banking", "B.Com Banking & Insurance", "B.Com Banking", "3 years", "Merit", false, "₹15K-3L", "₹3-8 LPA", 3, "Specialized for banking sector careers.", ["Bank PO/Clerk", "Insurance Agent", "Financial Advisor"], ["Mumbai Univ Colleges", "Ethiraj Chennai"], ["Banking Operations", "Insurance", "Finance"]),
    C("bcom-corpsec", "B.Com Corporate Secretaryship", "B.Com Corp Sec", "3 years", "Merit", false, "₹15K-3L", "₹3-10 LPA", 3, "Corporate compliance, governance — pathway to CS exam.", ["Corporate Secretary", "Compliance Officer", "Legal Aid"], ["University of Madras Colleges", "Loyola"], ["Company Law", "Corporate Governance", "Compliance"]),
    C("bba", "BBA — Bachelor of Business Administration", "BBA", "3 years", "Merit / SET / CUET", false, "₹50K-6L", "₹3-10 LPA", 4, "Business management, entrepreneurship, marketing, HR.", ["Manager", "Marketing Executive", "Entrepreneur", "HR"], ["Christ Bangalore", "Symbiosis Pune", "Loyola", "SRM"], ["Marketing", "Finance", "HR", "Operations"]),
    C("bba-aviation", "BBA Aviation Management", "BBA Aviation", "3 years", "Merit", false, "₹1-6L", "₹3-12 LPA", 3, "Airline management, airport operations, aviation business.", ["Airport Manager", "Airline Operations", "Ground Staff"], ["IGIA Aviation Academy", "Rajiv Gandhi Academy"], ["Aviation Management", "Airport Ops", "Logistics"]),
    C("bba-hospital", "BBA Hospital Administration", "BBA Hospital", "3 years", "Merit", false, "₹50K-5L", "₹3-10 LPA", 3, "Hospital management, healthcare administration.", ["Hospital Administrator", "Health IT Manager", "Clinic Manager"], ["Manipal", "AIIMS", "Apollo Hospitals"], ["Hospital Management", "Health IT", "Operations"]),
    C("bba-llb", "BBA LLB — Integrated Law", "BBA LLB", "5 years", "CLAT / State", true, "₹1-8L", "₹5-25 LPA", 4, "Business + Law. Become a corporate lawyer.", ["Corporate Lawyer", "Legal Advisor", "Business Consultant"], ["NLU Delhi", "NALSAR", "NLSIU Bangalore"], ["Corporate Law", "Business Law", "Contracts"]),
    C("ba-economics", "B.A Economics (Honours)", "B.A Economics", "3 years", "Merit / CUET", false, "₹15K-5L", "₹4-20 LPA", 4, "Economic theory, policy analysis. Gateway to RBI/UPSC/MBA.", ["Economist", "Policy Analyst", "RBI", "UPSC", "Banking"], ["St. Stephen's", "Hindu College", "Presidency", "DSE"], ["Economic Analysis", "Statistics", "Policy"]),
  ],
};

// ═══ 12. LAW (4 courses) ═══
const lawCourses: CourseCategory = {
  name: "Law",
  icon: "⚖️",
  courses: [
    C("ballb", "B.A LLB — Integrated Law", "BA LLB", "5 years", "CLAT / State", true, "₹1-8L", "₹5-25 LPA", 4, "India's most popular law degree. Become a lawyer after 12th.", ["Advocate", "Judge", "Legal Advisor", "Corporate Lawyer"], ["NLSIU Bangalore", "NALSAR", "NLU Delhi", "Tamil Nadu Dr. Ambedkar Law Univ"], ["Constitutional Law", "Criminal Law", "Contracts"]),
    C("bcomllb", "B.Com LLB — Commerce + Law", "B.Com LLB", "5 years", "CLAT / State", true, "₹1-8L", "₹5-20 LPA", 3, "Commerce + Law. Specialize in tax law, corporate law.", ["Tax Lawyer", "Corporate Lawyer", "Company Secretary"], ["NLU Delhi", "GNLU", "Tamil Nadu Dr. Ambedkar Law Univ"], ["Tax Law", "Corporate Law", "Compliance"]),
    C("llb-3yr", "LLB — 3 Year (After Graduation)", "LLB 3yr", "3 years", "University Entrance", true, "₹50K-5L", "₹4-15 LPA", 3, "Law degree after completing any graduation. Traditional route.", ["Advocate", "Legal Advisor", "Judiciary"], ["DU Law Faculty", "GLC Mumbai", "Tamil Nadu Dr. Ambedkar Law Univ"], ["Criminal Law", "Civil Law", "Procedure"]),
    C("bba-llb-law", "BBA LLB — Business Law", "BBA LLB", "5 years", "CLAT / State", true, "₹1-8L", "₹5-25 LPA", 4, "Business + Law combination for corporate legal careers.", ["Corporate Lawyer", "Business Legal", "Compliance"], ["NLSIU", "NALSAR", "NLU Delhi"], ["Business Law", "Corporate Law", "IP Law"]),
  ],
};

// ═══ 13. GOVERNMENT JOBS (4 courses) ═══
const govtJobsCourses: CourseCategory = {
  name: "Government Job Preparation",
  icon: "🇮🇳",
  courses: [
    C("upsc", "UPSC Civil Services (IAS/IPS)", "UPSC", "1-3 years prep", "UPSC CSE", true, "₹50K-5L (coaching)", "₹10-25 LPA", 5, "India's toughest & most prestigious exam. Become IAS/IPS officer.", ["IAS", "IPS", "IFS", "IRS", "IRTS"], ["Shankar IAS", "Vajiram", "Rau's IAS", "Unacademy"], ["General Studies", "CSAT", "Optional Subject"]),
    C("tnpsc", "TNPSC Group 1/2/4", "TNPSC", "6-12 months prep", "TNPSC Exam", true, "₹5K-2L (coaching)", "₹3-12 LPA", 4, "Tamil Nadu state government officer exam.", ["Deputy Collector", "DSP", "VAO", "Junior Assistant"], ["Shankar IAS", "Brain Tree", "THiNK IAS"], ["GK", "Tamil", "Aptitude"]),
    C("banking", "Banking — PO/Clerk", "Banking", "6-12 months prep", "IBPS/SBI", true, "₹5K-1L (coaching)", "₹4-12 LPA", 4, "Bank Probationary Officer and Clerk jobs.", ["Bank PO", "Bank Clerk", "RBI Grade B", "NABARD"], ["Career Power", "Oliveboard", "Unacademy"], ["Reasoning", "Quantitative", "English"]),
    C("ssc", "SSC CGL/CHSL/MTS", "SSC", "6-12 months prep", "SSC Exams", true, "₹5K-1L (coaching)", "₹2.5-8 LPA", 4, "Central govt jobs — ministry offices, courts, embassies.", ["Tax Inspector", "Auditor", "LDC/UDC", "ASI"], ["Unacademy", "Adda247", "Testbook"], ["Maths", "English", "GK", "Reasoning"]),
  ],
};

// ═══ 14. MEDIA & COMMUNICATION (6 courses) ═══
const mediaCourses: CourseCategory = {
  name: "Media & Communication",
  icon: "📺",
  courses: [
    C("bjmc", "BJMC — Journalism & Mass Communication", "BJMC", "3 years", "IPU CET / Merit", false, "₹1-5L", "₹3-15 LPA", 4, "News reporting, TV production, digital media, PR.", ["Journalist", "News Anchor", "PR Manager", "Digital Media"], ["IIMC Delhi", "Asian College of Journalism", "Symbiosis Pune"], ["Writing", "Video Production", "Digital Media"]),
    C("bmm", "BMM — Bachelor of Mass Media", "BMM", "3 years", "Merit / Entrance", false, "₹50K-4L", "₹3-12 LPA", 3, "Advertising, journalism, entertainment, corporate communication.", ["Media Manager", "Ad Executive", "Content Strategist"], ["KC College Mumbai", "St. Xavier's Mumbai"], ["Media Management", "Advertising", "PR"]),
    C("bsc-viscom", "B.Sc Visual Communication", "B.Sc VisCom", "3 years", "Merit Based", false, "₹1-5L", "₹4-18 LPA", 4, "Filmmaking, photography, animation, visual storytelling.", ["Filmmaker", "Photographer", "Video Editor", "Documentary Maker"], ["Loyola", "MOP Vaishnav", "Presidency"], ["Video Production", "Photography", "Editing"]),
    C("bfa", "BFA — Bachelor of Fine Arts", "BFA", "4 years", "Portfolio / Entrance", true, "₹30K-5L", "₹3-15 LPA", 3, "Painting, sculpture, applied arts, graphic design.", ["Artist", "Graphic Designer", "Art Director", "Illustrator"], ["Govt College of Fine Arts Chennai", "JJ School Mumbai", "BHU"], ["Drawing", "Painting", "Digital Art", "Sculpture"]),
    C("bpa", "BPA — Bachelor of Performing Arts", "BPA", "3 years", "Audition / Merit", false, "₹20K-3L", "₹2-15 LPA", 2, "Music, dance, drama, theatre arts.", ["Musician", "Dancer", "Theatre Artist", "Choreographer"], ["National School of Drama", "Kalakshetra Chennai", "Shantiniketan"], ["Performance", "Music/Dance", "Theatre"]),
    C("bsc-film", "B.Sc Film & Television", "B.Sc Film/TV", "3 years", "Entrance / Portfolio", true, "₹1-8L", "₹3-15 LPA", 3, "Film direction, screenplay, cinematography, editing.", ["Film Director", "Cinematographer", "Editor", "Screenwriter"], ["FTII Pune", "LV Prasad Film Academy", "Adyar Film Institute"], ["Cinematography", "Direction", "Editing", "Screenplay"]),
  ],
};

// ═══ 15. TEACHING & EDUCATION (4 courses) ═══
const teachingCourses: CourseCategory = {
  name: "Teaching & Education",
  icon: "👨‍🏫",
  courses: [
    C("bed", "B.Ed — Bachelor of Education", "B.Ed", "2 years (after grad)", "State Entrance", true, "₹20K-2L", "₹3-10 LPA", 4, "Mandatory for govt school teaching jobs. TGT/PGT eligibility.", ["School Teacher", "TGT/PGT", "Education Officer"], ["Govt B.Ed Colleges", "Central Universities"], ["Pedagogy", "Subject Knowledge", "Classroom"]),
    C("integrated-bed", "Integrated B.A/B.Sc/B.Com + B.Ed", "BA/BSc B.Ed", "4 years", "State Entrance", true, "₹50K-3L", "₹3-8 LPA", 4, "Combined degree — save 1 year vs separate BA + B.Ed.", ["School Teacher", "Primary Teacher"], ["RIEs", "Central Universities", "State Universities"], ["Teaching", "Subject Knowledge", "Child Psychology"]),
    C("deled", "D.El.Ed — Diploma in Elementary Education", "D.El.Ed", "2 years", "State Entrance", true, "₹15K-1L", "₹2.5-6 LPA", 3, "Teach primary school (Class 1-5). Required for TET.", ["Primary Teacher", "Govt School Teacher"], ["DIETs (Govt)", "Private Colleges"], ["Primary Teaching", "Child Development"]),
    C("ma-net", "M.A + NET (College Lecturer)", "MA + NET", "2+1 years", "University + UGC NET", true, "₹50K-3L", "₹8-18 LPA", 3, "Become a college professor with UGC NET qualification.", ["Assistant Professor", "Lecturer", "Researcher"], ["JNU", "DU", "Central Universities"], ["Research", "Subject Expertise", "Publishing"]),
  ],
};

// ═══ 16. SOCIAL WORK (3 courses) ═══
const socialWorkCourses: CourseCategory = {
  name: "Social Work & Community",
  icon: "🤝",
  courses: [
    C("bsw", "BSW — Bachelor of Social Work", "BSW", "3 years", "Merit / CUET", false, "₹30K-2L", "₹3-12 LPA", 3, "Work for social causes, NGOs, community development, CSR.", ["Social Worker", "NGO Manager", "Community Developer", "CSR"], ["TISS Mumbai", "Delhi School of Social Work", "Loyola"], ["Community Work", "Counseling", "Project Management"]),
    C("ba-criminology", "B.A Criminology & Criminal Justice", "B.A Criminology", "3 years", "Merit / CUET", false, "₹30K-2L", "₹4-12 LPA", 3, "Study crime, criminal behavior, forensic psychology, justice system.", ["Police", "Forensic Analyst", "Detective", "Prison Administration"], ["University of Madras", "Gujarat Forensic Sciences Univ"], ["Criminal Law", "Investigation", "Psychology", "Forensics"]),
    C("ba-public-admin", "B.A Public Administration", "B.A Pub Admin", "3 years", "Merit / CUET", false, "₹10K-2L", "₹3-12 LPA", 3, "Study governance, public policy, bureaucracy. Best UPSC optional.", ["UPSC (IAS/IPS)", "Policy Analyst", "Govt Officer", "NGO"], ["JNU", "DU", "University of Madras"], ["Public Policy", "Governance", "Administration"]),
  ],
};

// ═══ 17. ARTS & HUMANITIES UG (12 courses) ═══
const artsUGCourses: CourseCategory = {
  name: "Humanities & Liberal Arts",
  icon: "📚",
  courses: [
    C("ba-history", "B.A History", "B.A History", "3 years", "Merit / CUET", false, "₹10K-2L", "₹3-15 LPA", 3, "Indian & world history. Excellent UPSC optional.", ["Historian", "UPSC", "Archaeologist", "Museum Curator"], ["St. Stephen's", "Hindu College", "Presidency", "Loyola"], ["Historical Analysis", "Research", "Writing"]),
    C("ba-polsci", "B.A Political Science", "B.A Pol Sci", "3 years", "Merit / CUET", false, "₹10K-2L", "₹3-15 LPA", 3, "Governance, politics, international relations.", ["UPSC", "Political Analyst", "Journalist", "Diplomat"], ["St. Stephen's", "Hindu College", "JNU", "Loyola"], ["Political Theory", "IR", "Public Policy"]),
    C("ba-economics-arts", "B.A Economics", "B.A Economics", "3 years", "Merit / CUET", false, "₹15K-5L", "₹4-20 LPA", 4, "Economic theory, policy analysis. High demand in analytics.", ["Economist", "Policy Analyst", "RBI", "UPSC", "Banking"], ["St. Stephen's", "Presidency", "DSE"], ["Economic Analysis", "Statistics", "Policy"]),
    C("ba-sociology", "B.A Sociology", "B.A Sociology", "3 years", "Merit / CUET", false, "₹10K-2L", "₹3-12 LPA", 3, "Study society, social structures, human behavior.", ["Social Worker", "HR", "NGO", "UPSC"], ["JNU", "Delhi School of Economics", "TISS"], ["Social Research", "Analysis", "Communication"]),
    C("ba-psychology", "B.A Psychology", "B.A Psychology", "3 years", "Merit / CUET", false, "₹20K-4L", "₹3-15 LPA", 4, "Study human mind and behavior. Growing demand field.", ["Counselor", "HR", "Clinical Psychologist", "UX Researcher"], ["Christ Bangalore", "Fergusson", "Lady Shri Ram", "Loyola"], ["Counseling", "Research", "Communication"]),
    C("ba-english", "B.A English Literature", "B.A English", "3 years", "Merit / CUET", false, "₹15K-3L", "₹3-12 LPA", 3, "Literature, communication, critical thinking.", ["Content Writer", "Editor", "Teacher", "Journalist"], ["Loyola", "Stella Maris", "MCC", "Presidency"], ["Writing", "Critical Analysis", "Communication"]),
    C("ba-tamil", "B.A Tamil Literature", "B.A Tamil", "3 years", "Merit", false, "₹5K-1L", "₹3-8 LPA", 2, "Tamil literature, grammar, classical texts. TNPSC friendly.", ["Tamil Teacher", "TNPSC", "Translator", "Writer"], ["University of Madras", "Madurai Kamaraj Univ", "Bharathiar Univ"], ["Tamil Grammar", "Literature", "Translation"]),
    C("ba-hindi", "B.A Hindi Literature", "B.A Hindi", "3 years", "Merit / CUET", false, "₹5K-1L", "₹3-8 LPA", 2, "Hindi literature and language. Useful for central govt jobs.", ["Hindi Teacher", "Translator", "UPSC", "Doordarshan"], ["DU", "BHU", "JNU"], ["Hindi Grammar", "Literature", "Translation"]),
    C("ba-geography", "B.A Geography", "B.A Geography", "3 years", "Merit / CUET", false, "₹10K-2L", "₹3-12 LPA", 3, "Physical and human geography. Good UPSC optional.", ["Geographer", "Urban Planner", "GIS Analyst", "UPSC"], ["DU", "JNU", "BHU", "Presidency"], ["GIS", "Cartography", "Environmental Analysis"]),
    C("ba-philosophy", "B.A Philosophy", "B.A Philosophy", "3 years", "Merit / CUET", false, "₹5K-1.5L", "₹3-10 LPA", 2, "Logic, ethics, metaphysics. Develops critical thinking for UPSC/Law.", ["UPSC (Ethics paper)", "Lawyer", "Writer", "Professor"], ["St. Stephen's", "Presidency", "JNU"], ["Logic", "Ethics", "Critical Thinking"]),
    C("ba-journalism", "B.A Journalism", "B.A Journalism", "3 years", "Merit / CUET", false, "₹30K-3L", "₹3-12 LPA", 3, "News reporting, writing, digital journalism.", ["Journalist", "Reporter", "Digital Content Creator", "PR"], ["IIMC Delhi", "ACJ Chennai", "Symbiosis"], ["Writing", "Reporting", "Digital Media"]),
    C("ba-music", "B.A Music (Carnatic / Hindustani)", "B.A Music", "3 years", "Audition / Merit", false, "₹10K-2L", "₹2-10 LPA", 2, "Classical music — vocal or instrumental. Perform or teach.", ["Musician", "Music Teacher", "Performer", "Composer"], ["Kalakshetra Chennai", "University of Madras", "BHU"], ["Carnatic/Hindustani Music", "Performance", "Theory"]),
  ],
};

// ═══ 18. VOCATIONAL & DIPLOMA (10 courses) ═══
const vocationalCourses: CourseCategory = {
  name: "Diploma, Polytechnic & ITI",
  icon: "🛠️",
  courses: [
    C("diploma-cs", "Diploma in Computer Engineering", "Diploma CS", "3 years", "Merit", false, "₹20K-2L", "₹2-6 LPA", 4, "Hands-on IT skills for junior developer and tech support roles.", ["IT Technician", "Web Developer", "Help Desk"], ["Govt Polytechnics"], ["Programming", "Networking", "Hardware"]),
    C("diploma-ece", "Diploma in Electronics & Comm", "Diploma ECE", "3 years", "Merit", false, "₹20K-2L", "₹2-5 LPA", 3, "Electronics repair, installation, communication systems.", ["Electronics Technician", "IoT Installer", "Repair"], ["Govt Polytechnics"], ["Circuits", "Soldering", "Testing"]),
    C("diploma-mech", "Diploma in Mechanical Engineering", "Diploma Mech", "3 years", "Merit", false, "₹20K-2L", "₹2-6 LPA", 3, "Manufacturing, workshop, CNC, maintenance.", ["Maintenance Engineer", "CNC Operator", "Supervisor"], ["Govt Polytechnics"], ["CNC", "Workshop", "Manufacturing"]),
    C("diploma-civil", "Diploma in Civil Engineering", "Diploma Civil", "3 years", "Merit", false, "₹20K-2L", "₹2-5 LPA", 3, "Construction, surveying, drafting, site supervision.", ["Site Supervisor", "Draftsman", "Surveyor"], ["Govt Polytechnics"], ["AutoCAD", "Surveying", "Construction"]),
    C("diploma-eee", "Diploma in Electrical Engineering", "Diploma EEE", "3 years", "Merit", false, "₹20K-2L", "₹2-6 LPA", 3, "Electrical wiring, power systems, solar installation.", ["Electrician (Diploma)", "Power Tech", "Solar Installer"], ["Govt Polytechnics"], ["Wiring", "Power Systems", "Safety"]),
    C("diploma-auto", "Diploma in Automobile Engineering", "Diploma Auto", "3 years", "Merit", false, "₹20K-2L", "₹2-6 LPA", 3, "Automobile repair, EV technology, workshop management.", ["Auto Technician", "Service Advisor", "EV Specialist"], ["Govt Polytechnics"], ["Engine Repair", "Diagnostics", "EV"]),
    C("iti", "ITI — Industrial Training Institute", "ITI", "1-2 years", "Merit", false, "₹5K-50K", "₹1.5-4 LPA", 3, "Quick trade-level skills. Fitter, Electrician, Welder, Plumber.", ["Electrician", "Fitter", "Welder", "Plumber", "Turner"], ["Govt ITIs across TN"], ["Trade Skills", "Safety", "Tools"]),
    C("diploma-pharm", "Diploma in Pharmacy (D.Pharm)", "D.Pharm", "2 years", "Merit", false, "₹50K-3L", "₹2-5 LPA", 3, "Open a medical shop, work as hospital pharmacist.", ["Pharmacist", "Medical Shop Owner"], ["Govt Pharmacy Colleges"], ["Dispensing", "Drug Knowledge"]),
    C("diploma-nursing", "Diploma in Nursing (GNM/ANM)", "Diploma Nursing", "2-3 years", "Merit", false, "₹20K-3L", "₹2-4 LPA", 4, "Nursing diploma for quick hospital employment.", ["Staff Nurse", "Community Nurse"], ["Govt Nursing Schools"], ["Patient Care", "Clinical Skills"]),
    C("diploma-hotel", "Diploma in Hotel Management", "Diploma Hotel", "1-3 years", "Merit", false, "₹30K-3L", "₹2-6 LPA", 3, "Hospitality skills — cooking, front desk, housekeeping.", ["Chef", "Front Desk", "Housekeeping Manager"], ["IHMs", "Private Institutes"], ["Hospitality", "Cooking", "Service"]),
  ],
};

// ═══ 19. HOTEL MANAGEMENT & TOURISM (4 courses) ═══
const hotelTourismCourses: CourseCategory = {
  name: "Hotel Management & Tourism",
  icon: "🏨",
  courses: [
    C("bhmct", "BHMCT — Hotel Management & Catering", "BHMCT", "4 years", "NCHMCT JEE", true, "₹2-10L", "₹3-12 LPA", 4, "Manage hotels, restaurants, catering. Work globally.", ["Hotel Manager", "Chef", "F&B Manager", "Event Manager"], ["IHM Mumbai", "IHM Chennai", "IHM Delhi"], ["Hospitality", "Food Production", "Front Office"]),
    C("bsc-hotel", "B.Sc Hospitality & Hotel Administration", "B.Sc Hotel", "3 years", "Merit / NCHMCT", false, "₹1-6L", "₹3-10 LPA", 3, "Hotel operations, food & beverage, front office management.", ["Hotel Supervisor", "Restaurant Manager", "Banquet Manager"], ["IHMs", "Christ University", "Welcomgroup"], ["Hotel Ops", "F&B", "Housekeeping"]),
    C("bsc-tourism", "B.Sc Travel & Tourism", "B.Sc Tourism", "3 years", "Merit", false, "₹50K-4L", "₹3-10 LPA", 3, "Tour planning, travel management, airline operations.", ["Travel Agent", "Tour Operator", "Airline Ground Staff"], ["IGNOU", "IITTM", "Christ University"], ["Tourism", "Travel Ops", "Geography"]),
    C("bsc-culinary", "B.Sc Culinary Arts", "B.Sc Culinary", "3 years", "Merit / Entrance", false, "₹1-8L", "₹3-15 LPA", 3, "Professional cooking, baking, world cuisines, food styling.", ["Chef", "Pastry Chef", "Food Stylist", "Own Restaurant"], ["IHM Chennai", "Welcomgroup", "SRM"], ["Cooking", "Baking", "Food Presentation"]),
  ],
};

// ═══ 20. AVIATION & MARINE (3 courses) ═══
const aviationCourses: CourseCategory = {
  name: "Aviation & Marine",
  icon: "✈️",
  courses: [
    C("bsc-aviation", "B.Sc Aviation", "B.Sc Aviation", "3 years", "Merit / Entrance", false, "₹1-6L", "₹3-10 LPA", 3, "Airport management, airline operations, aviation safety.", ["Airport Manager", "Ground Staff", "Airline Operations"], ["Rajiv Gandhi Aviation Academy", "IGIA", "Hindustan Univ"], ["Aviation Ops", "Airport Mgmt", "Safety"]),
    C("cpl", "CPL — Commercial Pilot License", "CPL", "18 months", "DGCA", true, "₹25-50L", "₹15-50 LPA", 5, "Become a commercial airline pilot. India's highest paying career.", ["Airline Pilot", "Co-Pilot", "Flight Instructor"], ["Indira Gandhi Rashtriya Udaan Academy", "Rajiv Gandhi Academy"], ["Flying", "Navigation", "Aviation Theory"], { hot: true }),
    C("bsc-nautical", "B.Sc Nautical Science", "B.Sc Nautical", "3 years", "IMU CET", true, "₹3-15L", "₹8-40 LPA", 4, "Navigation officer on merchant ships. Travel the world.", ["Navigation Officer", "Ship Captain"], ["IMU Chennai", "TMI Pune"], ["Navigation", "Maritime Law", "Ship Handling"]),
  ],
};

// ═══ 21. SPORTS & PHYSICAL EDUCATION (3 courses) ═══
const sportsCourses: CourseCategory = {
  name: "Sports & Physical Education",
  icon: "⚽",
  courses: [
    C("bped", "B.P.Ed — Physical Education", "B.P.Ed", "2 years (after grad)", "State Entrance", true, "₹15K-2L", "₹3-8 LPA", 3, "Become a PE teacher in schools. Mandatory for govt PE teaching.", ["PE Teacher", "Sports Coach", "Fitness Trainer"], ["LNIPE Gwalior", "State Universities"], ["Sports Training", "Fitness", "Coaching"]),
    C("bsc-sports", "B.Sc Sports Science", "B.Sc Sports", "3 years", "Merit / Entrance", false, "₹50K-4L", "₹3-12 LPA", 3, "Sports physiology, biomechanics, coaching, sports management.", ["Sports Scientist", "Fitness Coach", "Sports Analyst"], ["LNIPE Gwalior", "Tamil Nadu Physical Education Univ"], ["Biomechanics", "Physiology", "Coaching"]),
    C("integrated-bped", "Integrated B.A/B.Sc + B.P.Ed", "BA B.P.Ed", "4 years", "State Entrance", true, "₹30K-2L", "₹3-8 LPA", 3, "Combined degree for PE teaching. Save 1 year.", ["PE Teacher", "Sports Instructor"], ["State Universities", "Central Universities"], ["Physical Education", "Sports", "Teaching"]),
  ],
};

// ═══ MAP GROUP CODES TO COURSES ═══
export const getCoursesForGroup = (groupCode: string): CourseCategory[] => {
  const code = parseInt(groupCode);

  // ─── TN State Board (100-400 series) ───
  if (code >= 101 && code <= 106) {
    const base = [engineeringCourses, architectureCourses, pureScienceCourses, defenseCourses, aviationCourses];
    if (code === 103 || code === 104) base.push(lifeScienceCourses);
    if (code === 106) base.push(hotelTourismCourses);
    return base;
  }
  if (code >= 201 && code <= 208) {
    const base = [medicalCourses, nursingCourses, pharmacyCourses, alliedHealthCourses, lifeScienceCourses];
    if (code === 201) base.push(pureScienceCourses);
    if (code === 205 || code === 207) base.push(hotelTourismCourses);
    return base;
  }
  if (code >= 301 && code <= 308) {
    return [professionalCourses, ugCommerceCourses, lawCourses, govtJobsCourses, teachingCourses, hotelTourismCourses];
  }
  if (code >= 401 && code <= 406) {
    return [artsUGCourses, lawCourses, govtJobsCourses, mediaCourses, teachingCourses, socialWorkCourses, sportsCourses];
  }
  if (groupCode === "VOC") {
    return [vocationalCourses, pureScienceCourses, govtJobsCourses, hotelTourismCourses];
  }

  // ─── CBSE / ICSE / NIOS / Other (named codes) ───
  if (groupCode === "PCM") {
    return [engineeringCourses, architectureCourses, pureScienceCourses, defenseCourses, aviationCourses];
  }
  if (groupCode === "PCB") {
    return [medicalCourses, nursingCourses, pharmacyCourses, alliedHealthCourses, lifeScienceCourses];
  }
  if (groupCode === "PCMB") {
    return [engineeringCourses, architectureCourses, pureScienceCourses, defenseCourses, aviationCourses, medicalCourses, nursingCourses, pharmacyCourses, alliedHealthCourses, lifeScienceCourses];
  }
  if (groupCode === "COM_MATH") {
    return [professionalCourses, ugCommerceCourses, lawCourses, govtJobsCourses, teachingCourses, hotelTourismCourses, pureScienceCourses];
  }
  if (groupCode === "COM") {
    return [professionalCourses, ugCommerceCourses, lawCourses, govtJobsCourses, teachingCourses, hotelTourismCourses];
  }
  if (groupCode === "HUMANITIES") {
    return [artsUGCourses, lawCourses, govtJobsCourses, mediaCourses, teachingCourses, socialWorkCourses, sportsCourses];
  }

  return [];
};

// ═══ BOARD DEFINITIONS ═══
export const boards = [
  { id: "tn", name: "Tamil Nadu State Board", icon: "🏛️", isDefault: true },
  { id: "cbse", name: "CBSE", icon: "📘" },
  { id: "icse", name: "ICSE / ISC", icon: "📗" },
  { id: "nios", name: "NIOS (Open School)", icon: "📖" },
  { id: "other", name: "Other State Boards", icon: "📚" },
];

// ═══ CBSE / ICSE / NIOS / OTHER — Simpler stream structure ═══
const cbseStreams: Record<string, StreamData> = {
  cbse_science_pcm: {
    title: "🔬 Science (PCM)",
    subtitle: "Physics, Chemistry, Mathematics",
    color: "blue",
    bgClass: "bg-blue-50", borderClass: "border-blue-200", accentClass: "bg-blue-600",
    textClass: "text-blue-600", selectedBorder: "border-blue-500", selectedBg: "bg-blue-50",
    dotClass: "bg-blue-400", tagBg: "bg-blue-100", tagText: "text-blue-700",
    groups: [
      { code: "PCM", subjects: ["Physics", "Chemistry", "Mathematics", "English", "Optional (CS/PE/Eco)"], careers: ["Engineering", "B.Sc", "NDA", "Merchant Navy", "Architecture"], courseCount: 55, popular: true, badge: "Most Popular" },
    ],
  },
  cbse_science_pcb: {
    title: "🧬 Science (PCB)",
    subtitle: "Physics, Chemistry, Biology",
    color: "green",
    bgClass: "bg-emerald-50", borderClass: "border-emerald-200", accentClass: "bg-emerald-600",
    textClass: "text-emerald-600", selectedBorder: "border-emerald-500", selectedBg: "bg-emerald-50",
    dotClass: "bg-emerald-400", tagBg: "bg-emerald-100", tagText: "text-emerald-700",
    groups: [
      { code: "PCB", subjects: ["Physics", "Chemistry", "Biology", "English", "Optional (Maths/PE)"], careers: ["MBBS", "BDS", "Nursing", "Pharmacy", "Agriculture", "Veterinary"], courseCount: 48, popular: true, badge: "Medical" },
    ],
  },
  cbse_science_pcmb: {
    title: "🔬🧬 Science (PCMB)",
    subtitle: "Physics, Chemistry, Maths + Biology",
    color: "violet",
    bgClass: "bg-violet-50", borderClass: "border-violet-200", accentClass: "bg-violet-600",
    textClass: "text-violet-600", selectedBorder: "border-violet-500", selectedBg: "bg-violet-50",
    dotClass: "bg-violet-400", tagBg: "bg-violet-100", tagText: "text-violet-700",
    groups: [
      { code: "PCMB", subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English"], careers: ["Engineering + Medical both eligible", "Maximum flexibility"], courseCount: 95, badge: "Most Flexible" },
    ],
  },
  cbse_commerce: {
    title: "💼 Commerce",
    subtitle: "Accountancy, Economics, Business Studies",
    color: "orange",
    bgClass: "bg-amber-50", borderClass: "border-amber-200", accentClass: "bg-amber-600",
    textClass: "text-amber-600", selectedBorder: "border-amber-500", selectedBg: "bg-amber-50",
    dotClass: "bg-amber-400", tagBg: "bg-amber-100", tagText: "text-amber-700",
    groups: [
      { code: "COM_MATH", subjects: ["Accountancy", "Economics", "Business Studies", "Mathematics", "English"], careers: ["CA", "CS", "CMA", "B.Com", "BBA", "Finance", "Banking"], courseCount: 62, popular: true, badge: "With Maths" },
      { code: "COM", subjects: ["Accountancy", "Economics", "Business Studies", "Informatics/PE", "English"], careers: ["CA", "CS", "B.Com", "BBA", "Law"], courseCount: 55 },
    ],
  },
  cbse_humanities: {
    title: "📚 Humanities / Arts",
    subtitle: "History, Political Science, Geography & more",
    color: "purple",
    bgClass: "bg-purple-50", borderClass: "border-purple-200", accentClass: "bg-purple-600",
    textClass: "text-purple-600", selectedBorder: "border-purple-500", selectedBg: "bg-purple-50",
    dotClass: "bg-purple-400", tagBg: "bg-purple-100", tagText: "text-purple-700",
    groups: [
      { code: "HUMANITIES", subjects: ["History", "Political Science", "Geography", "Economics", "English", "Psychology/Sociology"], careers: ["UPSC/IAS", "Law", "Journalism", "Teaching", "Social Work", "Civil Services"], courseCount: 72, popular: true, badge: "Best for UPSC" },
    ],
  },
};

// ICSE uses the same structure as CBSE (same courses available)
const icseStreams: Record<string, StreamData> = {
  icse_science_pcm: { ...cbseStreams.cbse_science_pcm, title: "🔬 Science (PCM)", subtitle: "Physics, Chemistry, Mathematics (ISC)" },
  icse_science_pcb: { ...cbseStreams.cbse_science_pcb, title: "🧬 Science (PCB)", subtitle: "Physics, Chemistry, Biology (ISC)" },
  icse_science_pcmb: { ...cbseStreams.cbse_science_pcmb, title: "🔬🧬 Science (PCMB)", subtitle: "All Science Subjects (ISC)" },
  icse_commerce: { ...cbseStreams.cbse_commerce, title: "💼 Commerce", subtitle: "Accounts, Economics, Business (ISC)" },
  icse_humanities: { ...cbseStreams.cbse_humanities, title: "📚 Humanities", subtitle: "History, Geography, Languages (ISC)" },
};

const niosStreams: Record<string, StreamData> = {
  nios_science: {
    title: "🔬 Science Stream",
    subtitle: "Choose your subjects flexibly",
    color: "blue",
    bgClass: "bg-blue-50", borderClass: "border-blue-200", accentClass: "bg-blue-600",
    textClass: "text-blue-600", selectedBorder: "border-blue-500", selectedBg: "bg-blue-50",
    dotClass: "bg-blue-400", tagBg: "bg-blue-100", tagText: "text-blue-700",
    groups: [
      { code: "PCM", subjects: ["Physics", "Chemistry", "Mathematics", "English", "Any Optional"], careers: ["Engineering", "B.Sc", "IT", "Defence"], courseCount: 55, badge: "PCM" },
      { code: "PCB", subjects: ["Physics", "Chemistry", "Biology", "English", "Any Optional"], careers: ["Medical", "Nursing", "Pharmacy", "Agriculture"], courseCount: 48, badge: "PCB" },
      { code: "PCMB", subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English"], careers: ["All Science courses eligible"], courseCount: 95, badge: "All Science" },
    ],
  },
  nios_commerce: { ...cbseStreams.cbse_commerce, title: "💼 Commerce", subtitle: "Flexible Commerce Subjects" },
  nios_humanities: { ...cbseStreams.cbse_humanities, title: "📚 Arts / Humanities", subtitle: "Flexible Arts Subjects" },
  nios_vocational: {
    title: "🛠️ Vocational",
    subtitle: "Skill-based courses",
    color: "teal",
    bgClass: "bg-teal-50", borderClass: "border-teal-200", accentClass: "bg-teal-600",
    textClass: "text-teal-600", selectedBorder: "border-teal-500", selectedBg: "bg-teal-50",
    dotClass: "bg-teal-400", tagBg: "bg-teal-100", tagText: "text-teal-700",
    groups: [
      { code: "VOC", subjects: ["Computer Science", "Electronics", "Data Entry", "Others"], careers: ["Technician", "IT Support", "Skill-based jobs"], courseCount: 35 },
    ],
  },
};

// ═══ GET STREAMS FOR SELECTED BOARD ═══
export const getStreamsForBoard = (boardId: string): Record<string, StreamData> => {
  switch (boardId) {
    case 'tn': return streamsData;           // TN State Board — 100/200/300/400 series
    case 'cbse': return cbseStreams;          // CBSE — PCM/PCB/Commerce/Humanities
    case 'icse': return icseStreams;          // ICSE — Same as CBSE with ISC labels
    case 'nios': return niosStreams;          // NIOS — Flexible
    case 'other': return cbseStreams;         // Other state boards — similar to CBSE
    default: return streamsData;
  }
};
