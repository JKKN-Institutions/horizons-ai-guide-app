// Central Government Universities & Institutes in Tamil Nadu
// This file contains data for all central government institutions

import type { University } from './university-entrance-data';

export const centralUniversities: University[] = [
  // ============================================
  // 1. INDIAN INSTITUTE OF TECHNOLOGY MADRAS (IITM)
  // ============================================
  {
    id: 'iitm',
    name: 'Indian Institute of Technology Madras',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் சென்னை',
    location: 'Chennai',
    website: 'https://www.iitm.ac.in',
    phone: '044-22578200',
    email: 'info@iitm.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG) / CAT (MBA)',
    logoColor: '#0066CC',
    logo: '/universities/iitm-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026 (Session 1)', eventTamil: 'JEE மெயின் 2026 (அமர்வு 1)', date: 'January 2026', status: 'upcoming' },
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'BS Online Degree Admission', eventTamil: 'BS ஆன்லைன் பட்டப்படிப்பு சேர்க்கை', date: 'Year-round', status: 'ongoing' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      // ========== UNDERGRADUATE (B.Tech - 4 Years) ==========
      { id: 'iitm-btech-aerospace', name: 'B.Tech Aerospace Engineering', nameTamil: 'B.Tech விண்வெளி பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours (each paper)', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [{ name: 'Physics', nameTamil: 'இயற்பியல்', questions: 18, marks: 60, topics: ['Mechanics', 'Electrodynamics', 'Optics', 'Modern Physics'] }, { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 18, marks: 60, topics: ['Physical', 'Organic', 'Inorganic Chemistry'] }, { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 18, marks: 60, topics: ['Calculus', 'Algebra', 'Coordinate Geometry', 'Vectors'] }] }, syllabus: [], previousQuestions: [], tips: ['Ranked #1 Engineering Institute in India', 'Strong placement in aviation & defense sectors', 'Research opportunities with ISRO, DRDO'] },
      { id: 'iitm-btech-chemical', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதிப் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Core placements in Reliance, ONGC, refineries'] },
      { id: 'iitm-btech-civil', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech குடிசார் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Strong focus on sustainable infrastructure', 'GATE preparation support for PSUs'] },
      { id: 'iitm-btech-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Highest placement packages (₹50L+ avg)', 'Strong AI/ML research ecosystem', 'Top recruiters: Google, Microsoft, Amazon'] },
      { id: 'iitm-btech-electrical', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Focus on Power Systems, VLSI, Control Systems'] },
      { id: 'iitm-btech-engphy', name: 'B.Tech Engineering Physics', nameTamil: 'B.Tech பொறியியல் இயற்பியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Interdisciplinary: Physics + Engineering', 'Research-oriented curriculum'] },
      { id: 'iitm-btech-mechanical', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரப் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Core manufacturing & automotive placements', 'Strong research in robotics, thermal systems'] },
      { id: 'iitm-btech-metallurgy', name: 'B.Tech Metallurgical & Materials Engineering', nameTamil: 'B.Tech உலோகவியல் & பொருட்கள் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Placements in Steel, Aerospace materials sectors', 'Research in nanomaterials, composites'] },
      { id: 'iitm-btech-naval', name: 'B.Tech Naval Architecture & Ocean Engineering', nameTamil: 'B.Tech கப்பல் கட்டடக்கலை & கடல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Unique course for shipbuilding industry', 'Collaborations with Indian Navy, shipyards'] },

      // ========== DUAL DEGREE (B.Tech + M.Tech - 5 Years) ==========
      { id: 'iitm-dd-bioeng', name: 'Dual Degree (B.Tech + M.Tech) Biological Engineering', nameTamil: 'இரட்டை பட்டம் (B.Tech + M.Tech) உயிரியல் பொறியியல்', type: 'Integrated', category: 'On-Campus', school: 'Engineering', duration: '5 Years', eligibility: 'JEE Advanced qualified, 12th PCM/PCB', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Biotech + Engineering interdisciplinary', 'Research in biopharma, medical devices'] },
      { id: 'iitm-dd-design', name: 'Dual Degree (B.Tech + M.Tech) Engineering Design', nameTamil: 'இரட்டை பட்டம் (B.Tech + M.Tech) பொறியியல் வடிவமைப்பு', type: 'Integrated', category: 'On-Campus', school: 'Engineering', duration: '5 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Product design + Engineering', 'Industry-linked capstone projects'] },

      // ========== BS PROGRAMS (4 Years) ==========
      { id: 'iitm-bs-medical', name: 'BS Medical Sciences & Engineering', nameTamil: 'BS மருத்துவ அறிவியல் & பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Interdisciplinary', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM/PCB', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['NEW program combining medicine & engineering', 'Focus on medical devices, healthcare tech'] },
      { id: 'iitm-bs-electronic', name: 'BS Electronic Systems', nameTamil: 'BS மின்னணு அமைப்புகள்', type: 'UG', category: 'On-Campus', school: 'Interdisciplinary', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['NEW program for electronics specialization', 'Industry-oriented curriculum'] },

      // ========== ONLINE DEGREE ==========
      { id: 'iitm-bs-online-ds', name: 'BS in Data Science and Applications (Online)', nameTamil: 'BS தரவு அறிவியல் & பயன்பாடுகள் (ஆன்லைன்)', type: 'UG', category: 'DDE', school: 'Online Education', duration: '3-6 Years (Flexible)', eligibility: '12th Pass (Any Stream) - Open to all ages', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Semester Exams', durationMinutes: 0, mode: 'Online Proctored', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ["World's first online degree from an IIT", 'Open to working professionals & students', 'Affordable: ~₹30,000 per term', 'Exit options: Certificate, Diploma, Degree'] },

      // ========== POSTGRADUATE (M.Tech) ==========
      { id: 'iitm-mtech-cse', name: 'M.Tech Computer Science & Engineering', nameTamil: 'M.Tech கணினி அறிவியல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Specializations in AI/ML, Systems, Theory', 'Research-focused curriculum'] },
      { id: 'iitm-mtech-vlsi', name: 'M.Tech VLSI Design', nameTamil: 'M.Tech VLSI வடிவமைப்பு', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE (ECE/EEE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Semiconductor industry placements', 'Collaboration with chip design companies'] },
      { id: 'iitm-mtech-clinical', name: 'M.Tech Clinical Engineering', nameTamil: 'M.Tech மருத்துவ பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Interdisciplinary', duration: '2 Years', eligibility: 'B.Tech/BE/MBBS + GATE/Valid Score', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Healthcare technology focus', 'Hospital equipment management'] },

      // ========== M.Sc. (2 Years) ==========
      { id: 'iitm-msc-math', name: 'M.Sc. Mathematics', nameTamil: 'M.Sc. கணிதம்', type: 'PG', category: 'On-Campus', school: 'Sciences', duration: '2 Years', eligibility: 'B.Sc. Mathematics + JAM qualified', examPattern: { totalQuestions: 60, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in Pure/Applied Mathematics', 'Path to Ph.D. and academia'] },
      { id: 'iitm-msc-physics', name: 'M.Sc. Physics', nameTamil: 'M.Sc. இயற்பியல்', type: 'PG', category: 'On-Campus', school: 'Sciences', duration: '2 Years', eligibility: 'B.Sc. Physics + JAM qualified', examPattern: { totalQuestions: 60, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in Quantum, Condensed Matter', 'Collaboration with ISRO, BARC'] },
      { id: 'iitm-msc-chemistry', name: 'M.Sc. Chemistry', nameTamil: 'M.Sc. வேதியியல்', type: 'PG', category: 'On-Campus', school: 'Sciences', duration: '2 Years', eligibility: 'B.Sc. Chemistry + JAM qualified', examPattern: { totalQuestions: 60, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in materials, catalysis', 'Industry-linked projects'] },

      // ========== M.A. (2 Years) ==========
      { id: 'iitm-ma-development', name: 'M.A. Development Studies', nameTamil: 'M.A. வளர்ச்சி ஆய்வுகள்', type: 'PG', category: 'On-Campus', school: 'Humanities & Social Sciences', duration: '2 Years', eligibility: 'Graduation in any discipline', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Policy research & development economics', 'NGO and public sector careers'] },
      { id: 'iitm-ma-english', name: 'M.A. English Studies', nameTamil: 'M.A. ஆங்கில ஆய்வுகள்', type: 'PG', category: 'On-Campus', school: 'Humanities & Social Sciences', duration: '2 Years', eligibility: 'Graduation in English/Literature', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Literature and language research', 'Academia and publishing careers'] },
      { id: 'iitm-ma-economics', name: 'M.A. Economics', nameTamil: 'M.A. பொருளாதாரம்', type: 'PG', category: 'On-Campus', school: 'Humanities & Social Sciences', duration: '2 Years', eligibility: 'Graduation with Mathematics/Economics', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Quantitative economics focus', 'Research and policy careers'] },

      // ========== MBA ==========
      { id: 'iitm-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA (வணிக நிர்வாகத் துறை முதுகலை)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', examPattern: { totalQuestions: 66, totalMarks: 198, duration: '2 Hours', durationMinutes: 120, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['DoMS IIT Madras - Premier B-School', 'Strong tech + management blend'] },
      { id: 'iitm-emba', name: 'Executive MBA', nameTamil: 'நிர்வாக MBA', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years (Weekend)', eligibility: 'Graduation + 5+ years work experience', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Interview-based', durationMinutes: 0, mode: 'Interview', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['For working professionals', 'Weekend classes in Chennai'] },

      // ========== RESEARCH ==========
      { id: 'iitm-ms-research', name: 'M.S. (by Research)', nameTamil: 'M.S. (ஆய்வு)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '2-3 Years', eligibility: 'B.Tech/BE/M.Sc. + GATE/Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research-focused masters', 'Thesis-based evaluation'] },
      { id: 'iitm-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. (முனைவர் பட்டம்)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-6 Years', eligibility: 'M.Tech/M.Sc./M.A. + GATE/NET/Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Doctoral research in all disciplines', 'Fellowship provided (₹37,000+ per month)'] }
    ]
  },

  // ============================================
  // 2. NATIONAL INSTITUTE OF TECHNOLOGY (NIT) TRICHY
  // ============================================
  // Widely considered the top NIT in India
  {
    id: 'nit-trichy',
    name: 'National Institute of Technology, Tiruchirappalli',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம், திருச்சிராப்பள்ளி',
    location: 'Tiruchirappalli',
    website: 'https://www.nitt.edu',
    phone: '0431-2503000',
    email: 'registrar@nitt.edu',
    examName: 'JEE Main (UG) / GATE (PG) / CAT (MBA) / NIMCET (MCA)',
    logoColor: '#1E3A8A',
    logo: '/universities/nit-trichy-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026 Application', eventTamil: 'JEE மெயின் 2026 விண்ணப்பம்', date: 'November 2025', status: 'upcoming' },
      { event: 'JEE Main 2026 Exam', eventTamil: 'JEE மெயின் 2026 தேர்வு', date: 'January/April 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' },
      { event: 'GATE 2026 Exam', eventTamil: 'GATE 2026 தேர்வு', date: 'February 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      // ========== UNDERGRADUATE - B.Tech (4 Years) ==========
      // Admission via JEE Main (JoSAA/CSAB Counselling)
      { id: 'nitt-btech-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Highest demand branch', 'Top IT company placements', 'Minor degrees available in other departments'] },
      { id: 'nitt-btech-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல்தொடர்பு பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Communication systems and VLSI sectors'] },
      { id: 'nitt-btech-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணுப் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Power sector and electronics'] },
      { id: 'nitt-btech-mechanical', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரப் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Core manufacturing sector'] },
      { id: 'nitt-btech-chemical', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதிப் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Core placements in Refineries, Petrochemicals'] },
      { id: 'nitt-btech-civil', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech குடிசார் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Infrastructure and construction sector'] },
      { id: 'nitt-btech-ice', name: 'B.Tech Instrumentation & Control Engineering', nameTamil: 'B.Tech கருவியியல் & கட்டுப்பாட்டு பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['One of few NITs offering dedicated ICE degree', 'Highly valued in Oil & Gas, Automation industries'] },
      { id: 'nitt-btech-metallurgy', name: 'B.Tech Metallurgical & Materials Engineering', nameTamil: 'B.Tech உலோகவியல் & பொருட்கள் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Steel and materials industry'] },
      { id: 'nitt-btech-production', name: 'B.Tech Production Engineering', nameTamil: 'B.Tech உற்பத்தி பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['One of few NITs offering dedicated Production Engineering', 'Highly valued in Manufacturing industries'] },

      // ========== UNDERGRADUATE - B.Arch (5 Years) ==========
      { id: 'nitt-barch', name: 'B.Arch Architecture', nameTamil: 'B.Arch கட்டடக்கலை', type: 'UG', category: 'On-Campus', school: 'Architecture', duration: '5 Years', eligibility: 'JEE Main Paper-2 (B.Arch) qualified, 12th PCM', examPattern: { totalQuestions: 77, totalMarks: 400, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Architecture design and planning', 'Note: AAT is for IITs only'] },

      // ========== UNDERGRADUATE - ITEP (4 Years) ==========
      // Integrated Teacher Education Programme - Admission via NCET (NTA)
      { id: 'nitt-itep-physics', name: 'B.Sc. B.Ed. (Integrated) - Physics', nameTamil: 'B.Sc. B.Ed. (ஒருங்கிணைந்த) - இயற்பியல்', type: 'UG', category: 'On-Campus', school: 'Education', duration: '4 Years', eligibility: 'NCET qualified, 12th PCM', examPattern: { totalQuestions: 100, totalMarks: 400, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['To produce quality science teachers', 'Admission via NCET conducted by NTA'] },
      { id: 'nitt-itep-chemistry', name: 'B.Sc. B.Ed. (Integrated) - Chemistry', nameTamil: 'B.Sc. B.Ed. (ஒருங்கிணைந்த) - வேதியியல்', type: 'UG', category: 'On-Campus', school: 'Education', duration: '4 Years', eligibility: 'NCET qualified, 12th PCM', examPattern: { totalQuestions: 100, totalMarks: 400, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['To produce quality science teachers', 'Admission via NCET conducted by NTA'] },
      { id: 'nitt-itep-maths', name: 'B.Sc. B.Ed. (Integrated) - Mathematics', nameTamil: 'B.Sc. B.Ed. (ஒருங்கிணைந்த) - கணிதம்', type: 'UG', category: 'On-Campus', school: 'Education', duration: '4 Years', eligibility: 'NCET qualified, 12th PCM', examPattern: { totalQuestions: 100, totalMarks: 400, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['To produce quality mathematics teachers', 'Admission via NCET conducted by NTA'] },

      // ========== POSTGRADUATE - M.Tech (2 Years) ==========
      // Admission via GATE (CCMT Counselling)
      // -- Computer Science Department --
      { id: 'nitt-mtech-cse', name: 'M.Tech Computer Science & Engineering', nameTamil: 'M.Tech கணினி அறிவியல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Computer Science', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Core CS specialization'] },
      { id: 'nitt-mtech-data', name: 'M.Tech Data Analytics', nameTamil: 'M.Tech தரவு பகுப்பாய்வு', type: 'PG', category: 'On-Campus', school: 'Computer Science', duration: '2 Years', eligibility: 'B.Tech/BE/MCA + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Big data and analytics focus'] },
      // -- Electronics (ECE) Department --
      { id: 'nitt-mtech-comm', name: 'M.Tech Communication Systems', nameTamil: 'M.Tech தகவல்தொடர்பு அமைப்புகள்', type: 'PG', category: 'On-Campus', school: 'Electronics (ECE)', duration: '2 Years', eligibility: 'B.Tech/BE (ECE/EEE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Wireless, 5G, Signal Processing'] },
      { id: 'nitt-mtech-vlsi', name: 'M.Tech VLSI Systems', nameTamil: 'M.Tech VLSI அமைப்புகள்', type: 'PG', category: 'On-Campus', school: 'Electronics (ECE)', duration: '2 Years', eligibility: 'B.Tech/BE (ECE/EEE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Chip design and semiconductor'] },
      // -- Electrical (EEE) Department --
      { id: 'nitt-mtech-power-sys', name: 'M.Tech Power Systems', nameTamil: 'M.Tech மின் அமைப்புகள்', type: 'PG', category: 'On-Campus', school: 'Electrical (EEE)', duration: '2 Years', eligibility: 'B.Tech/BE (EEE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Power grid and transmission systems'] },
      { id: 'nitt-mtech-power-elec', name: 'M.Tech Power Electronics', nameTamil: 'M.Tech மின்னணு சக்தி', type: 'PG', category: 'On-Campus', school: 'Electrical (EEE)', duration: '2 Years', eligibility: 'B.Tech/BE (EEE/ECE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['EV, Drives, Power converters'] },
      // -- Mechanical Department --
      { id: 'nitt-mtech-thermal', name: 'M.Tech Thermal Power Engineering', nameTamil: 'M.Tech வெப்ப சக்தி பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Mechanical', duration: '2 Years', eligibility: 'B.Tech/BE (Mechanical) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Thermal systems, power plants'] },
      { id: 'nitt-mtech-safety', name: 'M.Tech Industrial Safety Engineering', nameTamil: 'M.Tech தொழில்துறை பாதுகாப்பு பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Mechanical', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Safety management in industries'] },
      // -- Production Department --
      { id: 'nitt-mtech-manufacturing', name: 'M.Tech Manufacturing Technology', nameTamil: 'M.Tech உற்பத்தி தொழில்நுட்பம்', type: 'PG', category: 'On-Campus', school: 'Production', duration: '2 Years', eligibility: 'B.Tech/BE (Mech/Prod) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Advanced manufacturing processes'] },
      { id: 'nitt-mtech-iem', name: 'M.Tech Industrial Engineering & Management', nameTamil: 'M.Tech தொழில்துறை பொறியியல் & மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Production', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Operations research, supply chain'] },
      // -- Civil Department --
      { id: 'nitt-mtech-transport', name: 'M.Tech Transportation Engineering & Management', nameTamil: 'M.Tech போக்குவரத்து பொறியியல் & மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Civil', duration: '2 Years', eligibility: 'B.Tech/BE (Civil) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Highway, traffic engineering'] },
      { id: 'nitt-mtech-structural', name: 'M.Tech Structural Engineering', nameTamil: 'M.Tech கட்டமைப்பு பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Civil', duration: '2 Years', eligibility: 'B.Tech/BE (Civil) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Design of structures, earthquake engineering'] },
      { id: 'nitt-mtech-env', name: 'M.Tech Environmental Engineering', nameTamil: 'M.Tech சுற்றுச்சூழல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Civil', duration: '2 Years', eligibility: 'B.Tech/BE (Civil/Env) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Water, waste management'] },
      { id: 'nitt-mtech-ctm', name: 'M.Tech Construction Technology & Management', nameTamil: 'M.Tech கட்டுமான தொழில்நுட்பம் & மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Civil', duration: '2 Years', eligibility: 'B.Tech/BE (Civil) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Project management, construction'] },
      { id: 'nitt-mtech-geotech', name: 'M.Tech Geotechnical Engineering', nameTamil: 'M.Tech புவித்தொழில்நுட்ப பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Civil', duration: '2 Years', eligibility: 'B.Tech/BE (Civil) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Soil mechanics, foundation engineering'] },
      // -- Chemical Department --
      { id: 'nitt-mtech-chem', name: 'M.Tech Chemical Engineering', nameTamil: 'M.Tech வேதிப் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Chemical', duration: '2 Years', eligibility: 'B.Tech/BE (Chemical) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Process design, reaction engineering'] },
      { id: 'nitt-mtech-pci', name: 'M.Tech Process Control & Instrumentation', nameTamil: 'M.Tech செயல்முறை கட்டுப்பாடு & கருவியியல்', type: 'PG', category: 'On-Campus', school: 'Chemical', duration: '2 Years', eligibility: 'B.Tech/BE (Chemical/ICE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Process automation, control systems'] },
      // -- Energy Department --
      { id: 'nitt-mtech-energy', name: 'M.Tech Energy Engineering', nameTamil: 'M.Tech ஆற்றல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Energy', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Renewable energy and sustainability'] },
      // -- Instrumentation Department --
      { id: 'nitt-mtech-automation', name: 'M.Tech Industrial Automation', nameTamil: 'M.Tech தொழில்துறை தானியங்கி', type: 'PG', category: 'On-Campus', school: 'Instrumentation', duration: '2 Years', eligibility: 'B.Tech/BE (ICE/EEE/ECE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['NEW/Interdisciplinary program', 'Industry 4.0, Robotics'] },
      // -- Physics Department --
      { id: 'nitt-mtech-ndt', name: 'M.Tech Non-Destructive Testing (NDT)', nameTamil: 'M.Tech அழிவில்லா சோதனை (NDT)', type: 'PG', category: 'On-Campus', school: 'Physics', duration: '2 Years', eligibility: 'B.Tech/BE/M.Sc. (Physics) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Quality testing without damage', 'Aerospace, nuclear industry demand'] },

      // ========== POSTGRADUATE - M.Arch (2 Years) ==========
      { id: 'nitt-march', name: 'M.Arch Energy Efficient & Sustainable Architecture', nameTamil: 'M.Arch ஆற்றல் திறன் & நிலையான கட்டடக்கலை', type: 'PG', category: 'On-Campus', school: 'Architecture', duration: '2 Years', eligibility: 'B.Arch + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Green building design'] },

      // ========== POSTGRADUATE - M.Sc. (2 Years) ==========
      // Admission via IIT JAM (CCMN Counselling)
      { id: 'nitt-msc-cs', name: 'M.Sc. Computer Science', nameTamil: 'M.Sc. கணினி அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Sciences', duration: '2 Years', eligibility: 'B.Sc. CS/IT/Maths + JAM qualified', examPattern: { totalQuestions: 60, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Theoretical CS and programming'] },
      { id: 'nitt-msc-chemistry', name: 'M.Sc. Chemistry', nameTamil: 'M.Sc. வேதியியல்', type: 'PG', category: 'On-Campus', school: 'Sciences', duration: '2 Years', eligibility: 'B.Sc. Chemistry + JAM qualified', examPattern: { totalQuestions: 60, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in chemical sciences'] },
      { id: 'nitt-msc-physics', name: 'M.Sc. Physics', nameTamil: 'M.Sc. இயற்பியல்', type: 'PG', category: 'On-Campus', school: 'Sciences', duration: '2 Years', eligibility: 'B.Sc. Physics + JAM qualified', examPattern: { totalQuestions: 60, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Condensed matter and applied physics'] },
      { id: 'nitt-msc-maths', name: 'M.Sc. Mathematics', nameTamil: 'M.Sc. கணிதம்', type: 'PG', category: 'On-Campus', school: 'Sciences', duration: '2 Years', eligibility: 'B.Sc. Mathematics + JAM qualified', examPattern: { totalQuestions: 60, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Pure and applied mathematics'] },

      // ========== POSTGRADUATE - Management & Humanities ==========
      { id: 'nitt-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA (வணிக நிர்வாக முதுகலை)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', examPattern: { totalQuestions: 66, totalMarks: 198, duration: '2 Hours', durationMinutes: 120, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Management + Technology blend', 'Strong industry connect'] },
      { id: 'nitt-ma-english', name: 'M.A. English (Language and Literature)', nameTamil: 'M.A. ஆங்கிலம் (மொழி மற்றும் இலக்கியம்)', type: 'PG', category: 'On-Campus', school: 'Humanities', duration: '2 Years', eligibility: 'Graduation + CUET-PG qualified', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Language and literature studies', 'Admission via CUET-PG'] },
      { id: 'nitt-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA (கணினி பயன்பாடுகள் முதுகலை)', type: 'PG', category: 'On-Campus', school: 'Computer Applications', duration: '2 Years', eligibility: 'BCA/B.Sc. CS + NIMCET qualified', examPattern: { totalQuestions: 120, totalMarks: 480, duration: '2 Hours', durationMinutes: 120, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Software development focus', 'Strictly via NIMCET rank'] },

      // ========== RESEARCH PROGRAMMES ==========
      // M.S. (by Research) - Available in all Engineering departments
      { id: 'nitt-ms-research', name: 'M.S. (by Research)', nameTamil: 'M.S. (ஆய்வு மூலம்)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '2-3 Years', eligibility: 'B.Tech/BE + GATE/Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research-heavy (unlike M.Tech which is course-heavy)', 'Ideal for pursuing Ph.D. or R&D roles', 'Available in all Engineering departments'] },
      // Ph.D. - Available across all departments
      { id: 'nitt-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. (முனைவர் பட்டம்)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-6 Years', eligibility: 'M.Tech/M.Sc./M.A./MBA + GATE/NET/Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Available in: All Engineering (Civil, Mech, CSE, EEE, ECE, ICE, Chem, Prod, MME)', 'Sciences (Maths, Physics, Chemistry)', 'Humanities (English, Economics)', 'Management, Computer Applications, Energy & Environment'] }
    ]
  },

  // ============================================
  // 3. INDIAN INSTITUTE OF MANAGEMENT (IIM) TRICHY
  // ============================================
  // Premier "Second Generation" IIM, renowned for academic rigour
  {
    id: 'iim-trichy',
    name: 'Indian Institute of Management Tiruchirappalli',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் திருச்சிராப்பள்ளி',
    location: 'Tiruchirappalli (Main) / Chennai (Executive)',
    website: 'https://www.iimtrichy.ac.in',
    phone: '0431-2505000',
    email: 'pgpadmissions@iimtrichy.ac.in',
    examName: 'CAT (Common Admission Test)',
    logoColor: '#8B0000',
    logo: '/universities/iim-trichy-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2025 Exam', eventTamil: 'CAT 2025 தேர்வு', date: 'November 2025', status: 'upcoming' },
      { event: 'CAT 2025 Results', eventTamil: 'CAT 2025 முடிவுகள்', date: 'January 2026', status: 'upcoming' },
      { event: 'PGPM/PGPM-HR Interviews', eventTamil: 'PGPM/PGPM-HR நேர்காணல்கள்', date: 'February-March 2026', status: 'upcoming' },
      { event: 'Academic Session Begins', eventTamil: 'கல்வி அமர்வு தொடக்கம்', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 2200000, obc: 2200000, scst: 1100000 },
    courses: [
      // ========== 1. FLAGSHIP RESIDENTIAL PROGRAMMES (Full-Time MBA) ==========
      // Admission strictly through CAT (Common Admission Test)
      { 
        id: 'iimt-pgpm', 
        name: 'PGPM (Post Graduate Programme in Management)', 
        nameTamil: 'PGPM (மேலாண்மை முதுகலை திட்டம்)', 
        type: 'PG', 
        category: 'On-Campus', 
        school: 'Management', 
        duration: '2 Years (Residential)', 
        eligibility: 'Graduation (any discipline) + CAT qualified', 
        examPattern: { 
          totalQuestions: 66, 
          totalMarks: 198, 
          duration: '2 Hours', 
          durationMinutes: 120, 
          mode: 'Online (CBT)', 
          negativeMarking: true, 
          sections: [
            { name: 'VARC (Verbal Ability & Reading Comprehension)', nameTamil: 'வாசிப்பு புரிதல் & சொல் திறன்', questions: 24, marks: 72, topics: ['Reading Comprehension', 'Para Jumbles', 'Para Summary', 'Sentence Correction'] }, 
            { name: 'DILR (Data Interpretation & Logical Reasoning)', nameTamil: 'தரவு விளக்கம் & தர்க்க ரீதியான பகுத்தறிவு', questions: 20, marks: 60, topics: ['Tables', 'Charts', 'Graphs', 'Puzzles', 'Arrangements'] }, 
            { name: 'QA (Quantitative Aptitude)', nameTamil: 'அளவு திறன்', questions: 22, marks: 66, topics: ['Arithmetic', 'Algebra', 'Geometry', 'Number System', 'Modern Maths'] }
          ] 
        }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: [
          '🎓 Flagship 2-Year MBA (Master of Business Administration)',
          '📊 Specializations: Finance, Marketing, Operations, Strategy, IT & Analytics, OB/HR',
          '💰 Median package: ₹18+ LPA | Top packages: ₹35+ LPA',
          '🏢 Top recruiters: McKinsey, BCG, Goldman Sachs, Amazon, Deloitte'
        ] 
      },
      { 
        id: 'iimt-pgpm-hr', 
        name: 'PGPM-HR (Human Resources Specialization)', 
        nameTamil: 'PGPM-HR (மனிதவள மேலாண்மை நிபுணத்துவம்)', 
        type: 'PG', 
        category: 'On-Campus', 
        school: 'Management', 
        duration: '2 Years (Residential)', 
        eligibility: 'Graduation + CAT qualified', 
        examPattern: { 
          totalQuestions: 66, 
          totalMarks: 198, 
          duration: '2 Hours', 
          durationMinutes: 120, 
          mode: 'Online (CBT)', 
          negativeMarking: true, 
          sections: [] 
        }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: [
          '👥 Specialized MBA dedicated entirely to Human Resources',
          '📋 DIFFERENCE: Unlike general PGPM where HR is an elective, this is a full HR program',
          '🏢 HR Leadership roles in Fortune 500 companies',
          '💼 Admission: CAT Score + Personal Interview (PI)'
        ] 
      },

      // ========== 2. EXECUTIVE PROGRAMME (Chennai Campus) ==========
      // Satellite campus at Chennai (Ekkattuthangal) for working professionals
      { 
        id: 'iimt-pgpbm', 
        name: 'PGPBM (Executive MBA - Chennai Campus)', 
        nameTamil: 'PGPBM (நிர்வாக MBA - சென்னை வளாகம்)', 
        type: 'PG', 
        category: 'On-Campus', 
        school: 'Executive Education', 
        duration: '2 Years (Weekend Classes)', 
        eligibility: 'Graduation + 3+ years work experience + IIMT Written Test/CAT/GMAT score', 
        examPattern: { 
          totalQuestions: 0, 
          totalMarks: 100, 
          duration: 'Written Test (by IIMT) OR CAT/GMAT + Interview', 
          durationMinutes: 0, 
          mode: 'Interview', 
          negativeMarking: false, 
          sections: [] 
        }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: [
          '🏢 CHENNAI CAMPUS: Dedicated satellite campus at Ekkattuthangal',
          '📅 Format: Weekend classes (Saturdays & Sundays)',
          '🎓 Degree: Full MBA (Master of Business Administration) from IIM',
          '💡 WHY POPULAR: Get an IIM Degree without quitting your job!',
          '👔 Target: Working executives with 3+ years experience'
        ] 
      },

      // ========== 3. DOCTORAL PROGRAMMES (Research) ==========
      { 
        id: 'iimt-dpm', 
        name: 'DPM (Doctoral Programme in Management)', 
        nameTamil: 'DPM (மேலாண்மை முனைவர் திட்டம்)', 
        type: 'Research', 
        category: 'On-Campus', 
        school: 'Research', 
        duration: '4-5 Years (Full-Time, Residential)', 
        eligibility: 'PG degree + CAT/GMAT/GRE/GATE/UGC-JRF score', 
        examPattern: { 
          totalQuestions: 0, 
          totalMarks: 100, 
          duration: 'Written Test + Research Proposal + Interview', 
          durationMinutes: 0, 
          mode: 'Offline', 
          negativeMarking: false, 
          sections: [] 
        }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: [
          '🎓 Full-time Ph.D. in Management (Residential)',
          '💰 Stipend: ₹30,000 - ₹35,000/month + No tuition fee',
          '📚 Specializations: Economics, Finance, Marketing, Strategy, Operations, IT, OB & HR',
          '🎯 Ideal for: Academia, consulting, senior research roles'
        ] 
      },
      { 
        id: 'iimt-edpm', 
        name: 'E-DPM (Executive Doctoral Programme)', 
        nameTamil: 'E-DPM (நிர்வாக முனைவர் திட்டம்)', 
        type: 'Research', 
        category: 'On-Campus', 
        school: 'Research', 
        duration: '4-6 Years (Part-Time)', 
        eligibility: 'PG degree + 10+ years senior executive experience', 
        examPattern: { 
          totalQuestions: 0, 
          totalMarks: 100, 
          duration: 'Application Review + Interview', 
          durationMinutes: 0, 
          mode: 'Hybrid', 
          negativeMarking: false, 
          sections: [] 
        }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: [
          '👔 Part-time Ph.D. for Senior Executives',
          '🎯 Target: Working professionals with 10+ years experience',
          '📅 Format: Campus visits once per term; rest is remote research',
          '💼 Goal: Move into teaching or senior advisory/research roles'
        ] 
      },

      // ========== 4. LONG DURATION CERTIFICATE PROGRAMMES (Hybrid/Online) ==========
      // 6-month to 1-year certification courses for upskilling
      { 
        id: 'iimt-cert-shrm', 
        name: 'PG Certificate in Strategic Human Resource Management', 
        nameTamil: 'PG சான்றிதழ் மூலோபாய மனிதவள மேலாண்மை', 
        type: 'Certificate', 
        category: 'DDE', 
        school: 'Executive Education', 
        duration: '1 Year (Hybrid)', 
        eligibility: 'Graduation + Work Experience', 
        examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Online Modules + Campus Sessions', durationMinutes: 0, mode: 'Hybrid', negativeMarking: false, sections: [] }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: ['HR strategy and leadership skills', 'Online + Campus hybrid format'] 
      },
      { 
        id: 'iimt-cert-pcsm', 
        name: 'PG Certificate in Senior Management (PCSM)', 
        nameTamil: 'PG சான்றிதழ் மூத்த மேலாண்மை', 
        type: 'Certificate', 
        category: 'DDE', 
        school: 'Executive Education', 
        duration: '1 Year (Hybrid)', 
        eligibility: 'Graduation + Work Experience', 
        examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Online Modules + Campus Sessions', durationMinutes: 0, mode: 'Hybrid', negativeMarking: false, sections: [] }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: ['General management for senior roles', 'Strategic leadership focus'] 
      },
      { 
        id: 'iimt-cert-scm', 
        name: 'PG Certificate in Supply Chain Management', 
        nameTamil: 'PG சான்றிதழ் விநியோக சங்கிலி மேலாண்மை', 
        type: 'Certificate', 
        category: 'DDE', 
        school: 'Executive Education', 
        duration: '6-12 Months (Hybrid)', 
        eligibility: 'Graduation + Work Experience', 
        examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Online Modules', durationMinutes: 0, mode: 'Hybrid', negativeMarking: false, sections: [] }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: ['Operations and logistics management', 'Industry-relevant curriculum'] 
      },
      { 
        id: 'iimt-cert-mma', 
        name: 'PG Certificate in Manufacturing Management & Analytics', 
        nameTamil: 'PG சான்றிதழ் உற்பத்தி மேலாண்மை & பகுப்பாய்வு', 
        type: 'Certificate', 
        category: 'DDE', 
        school: 'Executive Education', 
        duration: '6-12 Months (Hybrid)', 
        eligibility: 'Graduation in Engineering/Science + Work Experience', 
        examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Online Modules', durationMinutes: 0, mode: 'Hybrid', negativeMarking: false, sections: [] }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: ['For manufacturing sector professionals', 'Analytics-driven operations'] 
      },
      { 
        id: 'iimt-cert-bfsi', 
        name: 'PG Certificate in Banking & Financial Services', 
        nameTamil: 'PG சான்றிதழ் வங்கி & நிதி சேவைகள்', 
        type: 'Certificate', 
        category: 'DDE', 
        school: 'Executive Education', 
        duration: '6-12 Months (Hybrid)', 
        eligibility: 'Graduation + Work Experience in BFSI', 
        examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Online Modules', durationMinutes: 0, mode: 'Hybrid', negativeMarking: false, sections: [] }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: ['Banking sector upskilling', 'Financial services expertise'] 
      },
      { 
        id: 'iimt-cert-dm', 
        name: 'Certificate in Digital Marketing & Analytics', 
        nameTamil: 'சான்றிதழ் டிஜிட்டல் மார்க்கெட்டிங் & பகுப்பாய்வு', 
        type: 'Certificate', 
        category: 'DDE', 
        school: 'Executive Education', 
        duration: '6 Months (Online)', 
        eligibility: 'Graduation', 
        examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Online Modules', durationMinutes: 0, mode: 'Online', negativeMarking: false, sections: [] }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: ['Digital marketing strategy', 'Marketing analytics skills'] 
      },
      { 
        id: 'iimt-cert-ba', 
        name: 'Certificate in Business Analytics & Applications', 
        nameTamil: 'சான்றிதழ் வணிக பகுப்பாய்வு & பயன்பாடுகள்', 
        type: 'Certificate', 
        category: 'DDE', 
        school: 'Executive Education', 
        duration: '6 Months (Online)', 
        eligibility: 'Graduation', 
        examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Online Modules', durationMinutes: 0, mode: 'Online', negativeMarking: false, sections: [] }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: ['Data-driven decision making', 'Business intelligence skills'] 
      }
    ]
  },

  // ============================================
  // 5. INDIAN MARITIME UNIVERSITY (IMU), CHENNAI
  // ============================================
  {
    id: 'imu-chennai',
    name: 'Indian Maritime University',
    nameTamil: 'இந்திய கடல்சார் பல்கலைக்கழகம்',
    location: 'Chennai (Headquarters)',
    website: 'https://www.imu.edu.in',
    phone: '044-24538433',
    email: 'admission@imu.edu.in',
    examName: 'IMU-CET (UG) / GATE/CAT (PG)',
    logoColor: '#003366',
    logo: '/universities/imu-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'IMU-CET 2026 Application', eventTamil: 'IMU-CET 2026 விண்ணப்பம்', date: 'March 2026', status: 'upcoming' },
      { event: 'IMU-CET 2026 Exam', eventTamil: 'IMU-CET 2026 தேர்வு', date: 'May 2026', status: 'upcoming' },
      { event: 'Counselling', eventTamil: 'கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 280000, obc: 280000, scst: 140000 },
    courses: [
      // ========== UNDERGRADUATE ==========
      { id: 'imu-btech-marine', name: 'B.Tech Marine Engineering', nameTamil: 'B.Tech கடல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'IMU-CET qualified, 12th PCM (60%)', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: false, sections: [{ name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 50, topics: ['Calculus', 'Algebra', 'Trigonometry'] }, { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Mechanics', 'Thermodynamics', 'Waves'] }, { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 25, marks: 25, topics: ['Physical', 'Organic', 'Inorganic'] }, { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 25, marks: 25, topics: ['Comprehension', 'Grammar', 'Vocabulary'] }, { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 50, marks: 50, topics: ['Reasoning', 'GK', 'Maritime Awareness'] }] }, syllabus: [], previousQuestions: [], tips: ['Training to become Ship Engineers', 'High-paying merchant navy career', 'On-board training mandatory'] },
      { id: 'imu-btech-naval', name: 'B.Tech Naval Architecture & Ocean Engineering', nameTamil: 'B.Tech கப்பல் கட்டடக்கலை & கடல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'IMU-CET qualified, 12th PCM', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Shipbuilding and design', 'Placements in shipyards, ports'] },
      { id: 'imu-bsc-nautical', name: 'B.Sc. Nautical Science', nameTamil: 'B.Sc. கடற்பயண அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Nautical Sciences', duration: '3 Years + 1 Year On-Board Training', eligibility: 'IMU-CET qualified, 12th PCM (60%), Medical Fitness', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Training to become Ship Captains', 'High salary (₹50L+ as Captain)', 'Vision: 6/6 without glasses required'] },
      { id: 'imu-bba-logistics', name: 'BBA Logistics, Retailing & E-Commerce', nameTamil: 'BBA தளவாடம், சில்லறை விற்பனை & மின்வணிகம்', type: 'UG', category: 'On-Campus', school: 'Management', duration: '3 Years', eligibility: 'IMU-CET qualified, 12th Pass (50%)', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Supply chain management', 'E-commerce sector careers'] },
      // ========== POSTGRADUATE ==========
      { id: 'imu-mba-itl', name: 'MBA International Transportation & Logistics', nameTamil: 'MBA சர்வதேச போக்குவரத்து & தளவாடம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT/MAT/GMAT qualified', examPattern: { totalQuestions: 66, totalMarks: 198, duration: '2 Hours', durationMinutes: 120, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Maritime logistics specialization', 'Global shipping industry careers'] },
      { id: 'imu-mba-psm', name: 'MBA Port & Shipping Management', nameTamil: 'MBA துறைமுகம் & கப்பல் மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT/MAT/GMAT qualified', examPattern: { totalQuestions: 66, totalMarks: 198, duration: '2 Hours', durationMinutes: 120, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Port operations management', 'Shipping company placements'] },
      { id: 'imu-mtech-naoe', name: 'M.Tech Naval Architecture & Ocean Engineering', nameTamil: 'M.Tech கப்பல் கட்டடக்கலை & கடல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Advanced shipbuilding', 'Research in ocean engineering'] },
      { id: 'imu-mtech-dredging', name: 'M.Tech Dredging & Harbour Engineering', nameTamil: 'M.Tech துறைமுக & கடலோரப் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech (Civil/Mechanical) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Port infrastructure', 'Coastal engineering'] }
    ]
  },

  // ============================================
  // 6. IIITDM KANCHEEPURAM
  // ============================================
  {
    id: 'iiitdm-kancheepuram',
    name: 'IIITDM Kancheepuram',
    nameTamil: 'இந்திய தகவல் தொழில்நுட்ப நிறுவனம் (வடிவமைப்பு & உற்பத்தி) காஞ்சிபுரம்',
    location: 'Kancheepuram (Chennai)',
    website: 'https://www.iiitdm.ac.in',
    phone: '044-27476346',
    email: 'admin@iiitdm.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#2E7D32',
    logo: '/universities/iiitdm-kancheepuram-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026 Application', eventTamil: 'JEE மெயின் 2026 விண்ணப்பம்', date: 'November 2025', status: 'upcoming' },
      { event: 'JEE Main 2026 Exam', eventTamil: 'JEE மெயின் 2026 தேர்வு', date: 'January/April 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      // ========== UNDERGRADUATE - B.Tech (4 Years) ==========
      // Admission strictly via JEE Main (JoSAA/CSAB Counselling)
      { id: 'iiitdm-btech-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Computer Science', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [{ name: 'Physics', nameTamil: 'இயற்பியல்', questions: 25, marks: 100, topics: ['Mechanics', 'Electrodynamics', 'Optics', 'Modern Physics'] }, { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 25, marks: 100, topics: ['Physical', 'Organic', 'Inorganic Chemistry'] }, { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 25, marks: 100, topics: ['Calculus', 'Algebra', 'Coordinate Geometry', 'Statistics'] }] }, syllabus: [], previousQuestions: [], tips: ['Strong focus on design + technology', 'Design Spine: Build a prototype every semester', 'Industry-ready curriculum'] },
      { id: 'iiitdm-btech-cse-ai', name: 'B.Tech CSE with Major in Artificial Intelligence', nameTamil: 'B.Tech CSE செயற்கை நுண்ணறிவு முக்கியத்துவத்துடன்', type: 'UG', category: 'On-Campus', school: 'Computer Science', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM (High demand - competitive cutoff)', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['HIGH DEMAND: Most competitive cutoff at IIITDM', 'Specialization in ML, Deep Learning, NLP', 'Strong placement in AI/ML roles'] },
      { id: 'iiitdm-btech-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல்தொடர்பு பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Electronics', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Communication systems and VLSI design focus', 'Hands-on hardware projects each semester', 'Strong semiconductor industry placements'] },
      { id: 'iiitdm-btech-mechanical', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரப் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Mechanical', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Design-focused mechanical engineering', 'CAD/CAM and Product Design emphasis', 'Prototype building every semester'] },
      { id: 'iiitdm-btech-smart', name: 'B.Tech Smart Manufacturing', nameTamil: 'B.Tech திறன் உற்பத்தி', type: 'UG', category: 'On-Campus', school: 'Mechanical', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['UNIQUE: Industry 4.0 focused program', 'IoT, Automation, AI in modern factories', 'One of few institutes offering dedicated Smart Mfg B.Tech'] },
      { id: 'iiitdm-btech-design', name: 'B.Tech Design Engineering', nameTamil: 'B.Tech வடிவமைப்பு பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Design', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['NEW: Launched for 2025-26', 'Product design + Engineering fusion', 'Design thinking in curriculum'] },
      { id: 'iiitdm-btech-engphy', name: 'B.Tech Engineering Physics', nameTamil: 'B.Tech பொறியியல் இயற்பியல்', type: 'UG', category: 'On-Campus', school: 'Sciences', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['NEW: Launched for 2025-26', 'Interdisciplinary physics + engineering', 'Research-oriented pathway'] },

      // ========== DUAL DEGREE (B.Tech + M.Tech - 5 Years) ==========
      // Integrated course - exit with both Bachelor's and Master's degree
      { id: 'iiitdm-dd-cse', name: 'B.Tech + M.Tech (Dual Degree) CSE', nameTamil: 'B.Tech + M.Tech (இரட்டை பட்டம்) CSE', type: 'Integrated', category: 'On-Campus', school: 'Computer Science', duration: '5 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Integrated UG + PG in 5 years', 'Research-oriented curriculum', 'M.Tech in Computer Science'] },
      { id: 'iiitdm-dd-ece-comm', name: 'B.Tech + M.Tech (Dual Degree) ECE - Communication Systems', nameTamil: 'B.Tech + M.Tech (இரட்டை பட்டம்) ECE - தகவல்தொடர்பு அமைப்புகள்', type: 'Integrated', category: 'On-Campus', school: 'Electronics', duration: '5 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Integrated UG + PG in 5 years', 'Specialization in Communication Systems'] },
      { id: 'iiitdm-dd-ece-vlsi', name: 'B.Tech + M.Tech (Dual Degree) ECE - Microelectronics & VLSI', nameTamil: 'B.Tech + M.Tech (இரட்டை பட்டம்) ECE - நுண்மின்னணு & VLSI', type: 'Integrated', category: 'On-Campus', school: 'Electronics', duration: '5 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Integrated UG + PG in 5 years', 'Chip design and semiconductor industry'] },
      { id: 'iiitdm-dd-mech-robotics', name: 'B.Tech + M.Tech (Dual Degree) Mech - AI & Robotics', nameTamil: 'B.Tech + M.Tech (இரட்டை பட்டம்) இயந்திர - AI & ரோபோட்டிக்ஸ்', type: 'Integrated', category: 'On-Campus', school: 'Mechanical', duration: '5 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Integrated UG + PG in 5 years', 'AI and Robotics specialization', 'Strong research in automation'] },

      // ========== POSTGRADUATE - M.Tech (2 Years) ==========
      // Admission via GATE Score (CCMT Counselling)
      { id: 'iiitdm-mtech-cse-dsai', name: 'M.Tech CSE (Data Science & Artificial Intelligence)', nameTamil: 'M.Tech CSE (தரவு அறிவியல் & செயற்கை நுண்ணறிவு)', type: 'PG', category: 'On-Campus', school: 'Computer Science', duration: '2 Years', eligibility: 'B.Tech/BE (CSE/IT) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Specialization in Data Science & AI', 'Research in ML, Deep Learning, NLP'] },
      { id: 'iiitdm-mtech-ece-comm', name: 'M.Tech ECE (Communication Systems Design)', nameTamil: 'M.Tech ECE (தகவல்தொடர்பு அமைப்பு வடிவமைப்பு)', type: 'PG', category: 'On-Campus', school: 'Electronics', duration: '2 Years', eligibility: 'B.Tech/BE (ECE/EEE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Communication systems and signal processing', 'Wireless and 5G technologies'] },
      { id: 'iiitdm-mtech-ece-vlsi', name: 'M.Tech ECE (Microelectronics & VLSI Systems)', nameTamil: 'M.Tech ECE (நுண்மின்னணு & VLSI அமைப்புகள்)', type: 'PG', category: 'On-Campus', school: 'Electronics', duration: '2 Years', eligibility: 'B.Tech/BE (ECE/EEE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Chip design and fabrication', 'Semiconductor industry placements'] },
      { id: 'iiitdm-mtech-ece-rfmw', name: 'M.Tech ECE (RF & Microwave Engineering)', nameTamil: 'M.Tech ECE (RF & மைக்ரோவேவ் பொறியியல்)', type: 'PG', category: 'On-Campus', school: 'Electronics', duration: '2 Years', eligibility: 'B.Tech/BE (ECE/EEE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['NEW: Launched for 2025-26', 'Antenna design, radar systems', 'Defense and telecom sector careers'] },
      { id: 'iiitdm-mtech-mech-sm', name: 'M.Tech Mechanical (Smart Manufacturing)', nameTamil: 'M.Tech இயந்திர (திறன் உற்பத்தி)', type: 'PG', category: 'On-Campus', school: 'Mechanical', duration: '2 Years', eligibility: 'B.Tech/BE (Mech/Production) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Industry 4.0 and IoT in manufacturing', 'Automation and CNC technologies'] },
      { id: 'iiitdm-mtech-mech-imsd', name: 'M.Tech Mechanical (Intelligent Mechanical Systems Design)', nameTamil: 'M.Tech இயந்திர (புத்திசாலி இயந்திர அமைப்பு வடிவமைப்பு)', type: 'PG', category: 'On-Campus', school: 'Mechanical', duration: '2 Years', eligibility: 'B.Tech/BE (Mech/Production) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Mechatronics and intelligent systems', 'Design optimization and CAD/CAM'] },

      // ========== POSTGRADUATE - M.Des (2 Years) ==========
      // Admission via CEED (Common Entrance Examination for Design)
      { id: 'iiitdm-mdes-ipd', name: 'M.Des Integrated Product Design', nameTamil: 'M.Des ஒருங்கிணைந்த பொருள் வடிவமைப்பு', type: 'PG', category: 'On-Campus', school: 'Design', duration: '2 Years', eligibility: 'B.Tech/B.Des/B.Arch + CEED qualified', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Portfolio + Interview', durationMinutes: 0, mode: 'CEED + Interview', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['FLAGSHIP design course at IIITDM', 'Learn to design products combining aesthetics (look), electronics (brain), and mechanical (body)', 'Design thinking and UX focus'] },

      // ========== RESEARCH ==========
      { id: 'iiitdm-phd', name: 'Ph.D. (Engineering, Design & Sciences)', nameTamil: 'Ph.D. (பொறியியல், வடிவமைப்பு & அறிவியல்)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-6 Years', eligibility: 'M.Tech/M.Des/M.Sc. + GATE/Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Doctoral research in CSE, ECE, Mechanical, Smart Manufacturing', 'Also available in Mathematics, Physics, English/Humanities', 'Fellowship provided'] }
    ]
  },

  // ============================================
  // 7. IIIT TRICHY
  // ============================================
  {
    id: 'iiit-trichy',
    name: 'Indian Institute of Information Technology, Tiruchirappalli',
    nameTamil: 'இந்திய தகவல் தொழில்நுட்ப நிறுவனம், திருச்சிராப்பள்ளி',
    location: 'Tiruchirappalli (Sethambur Campus)',
    website: 'https://www.iiitt.ac.in',
    phone: '0431-2500355',
    email: 'admin@iiitt.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#1565C0',
    logo: '/universities/iiit-trichy-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026 Application', eventTamil: 'JEE மெயின் 2026 விண்ணப்பம்', date: 'November 2025', status: 'upcoming' },
      { event: 'JEE Main 2026 Exam', eventTamil: 'JEE மெயின் 2026 தேர்வு', date: 'January/April 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      // ========== UNDERGRADUATE ==========
      { id: 'iiitt-btech-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Core CSE with AI/ML focus', 'Strong placement record'] },
      { id: 'iiitt-btech-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல்தொடர்பு பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Communication and embedded systems'] },
      // ========== POSTGRADUATE ==========
      { id: 'iiitt-mtech-cse', name: 'M.Tech Computer Science & Engineering', nameTamil: 'M.Tech கணினி அறிவியல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE (CSE/IT) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Advanced computing research'] },
      { id: 'iiitt-mtech-vlsi', name: 'M.Tech VLSI Systems', nameTamil: 'M.Tech VLSI அமைப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE (ECE/EEE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Chip design specialization'] },
      { id: 'iiitt-phd', name: 'Ph.D. (Engineering & Humanities)', nameTamil: 'Ph.D. (பொறியியல் & மனிதநேயம்)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-6 Years', eligibility: 'M.Tech/M.Phil + GATE/NET qualified', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Doctoral research programs', 'Fellowship available'] }
    ]
  },

  // ============================================
  // 8. NIFTEM THANJAVUR (formerly IICPT)
  // ============================================
  {
    id: 'niftem-thanjavur',
    name: 'NIFTEM Thanjavur (formerly IICPT)',
    nameTamil: 'தேசிய உணவு தொழில்நுட்ப நிறுவனம் தஞ்சாவூர்',
    location: 'Thanjavur',
    website: 'https://www.niftem-t.ac.in',
    phone: '04362-228155',
    email: 'admissions@niftem-t.ac.in',
    examName: 'JEE Main / CUET (UG) / GATE (PG)',
    logoColor: '#FF6F00',
    logo: '/universities/niftem-thanjavur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'Application 2026', eventTamil: 'விண்ணப்பம் 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'Entrance Exam', eventTamil: 'நுழைவுத் தேர்வு', date: 'June 2026', status: 'upcoming' },
      { event: 'Counselling', eventTamil: 'கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 100000, obc: 100000, scst: 50000 },
    courses: [
      { id: 'niftem-btech-ft', name: 'B.Tech Food Technology', nameTamil: 'B.Tech உணவு தொழில்நுட்பம்', type: 'UG', category: 'On-Campus', school: 'Food Technology', duration: '4 Years', eligibility: 'JEE Main / CUET qualified, 12th PCM/PCB', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Food processing industry', 'FMCG sector placements', 'Growing sector in India'] },
      { id: 'niftem-mtech-fpe', name: 'M.Tech Food Process Engineering', nameTamil: 'M.Tech உணவு செயலாக்கப் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Food Technology', duration: '2 Years', eligibility: 'B.Tech (Food Tech/Chemical/Biotech) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Advanced food processing', 'Research opportunities'] },
      { id: 'niftem-mtech-fsqa', name: 'M.Tech Food Safety & Quality Assurance', nameTamil: 'M.Tech உணவு பாதுகாப்பு & தர உத்தரவாதம்', type: 'PG', category: 'On-Campus', school: 'Food Technology', duration: '2 Years', eligibility: 'B.Tech/B.Sc. (Food/Life Sciences) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['FSSAI and quality control', 'Food safety regulations'] },
      { id: 'niftem-phd', name: 'Ph.D. Food Process Engineering', nameTamil: 'Ph.D. உணவு செயலாக்கப் பொறியியல்', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-6 Years', eligibility: 'M.Tech (Food/Related) + GATE/Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Food science research', 'Fellowship provided'] }
    ]
  },

  // ============================================
  // 9. DAKSHINA BHARAT HINDI PRACHAR SABHA
  // ============================================
  {
    id: 'dbhps-chennai',
    name: 'Dakshina Bharat Hindi Prachar Sabha',
    nameTamil: 'தக்ஷிண பாரத இந்தி பிரச்சார சபை',
    location: 'Chennai',
    website: 'https://www.dbhpsabha.org',
    phone: '044-24993727',
    email: 'info@dbhpsabha.org',
    examName: 'Hindi Proficiency Test + Interview',
    logoColor: '#FF9933',
    logo: '/universities/dbhps-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'Application 2026', eventTamil: 'விண்ணப்பம் 2026', date: 'April 2026', status: 'upcoming' },
      { event: 'Entrance Test', eventTamil: 'நுழைவுத் தேர்வு', date: 'June 2026', status: 'upcoming' },
      { event: 'Admission', eventTamil: 'சேர்க்கை', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 15000, obc: 15000, scst: 7500 },
    courses: [
      { id: 'dbhps-ma-hindi', name: 'M.A. Hindi', nameTamil: 'M.A. இந்தி', type: 'PG', category: 'On-Campus', school: 'Hindi Studies', duration: '2 Years', eligibility: 'Graduation with Hindi', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test', durationMinutes: 180, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Hindi literature and language', 'Teaching and translation careers'] },
      { id: 'dbhps-bed', name: 'B.Ed. (Shiksha Snatak) - Hindi Medium', nameTamil: 'B.Ed. (கல்வி பட்டம்) - இந்தி வழி', type: 'UG', category: 'On-Campus', school: 'Education', duration: '2 Years', eligibility: 'Graduation with Hindi knowledge', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Hindi medium teacher training', 'School teaching careers'] },
      { id: 'dbhps-phd', name: 'Ph.D. Hindi', nameTamil: 'Ph.D. இந்தி', type: 'Research', category: 'On-Campus', school: 'Research', duration: '3-5 Years', eligibility: 'M.A. Hindi + UGC NET/SLET', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Hindi language research', 'Academia and publishing'] },
      { id: 'dbhps-pgd-translation', name: 'PG Diploma in Translation', nameTamil: 'மொழிபெயர்ப்பு முதுநிலை டிப்ளோமா', type: 'PG Diploma', category: 'On-Campus', school: 'Hindi Studies', duration: '1 Year', eligibility: 'Graduation with Hindi proficiency', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Hindi-English translation skills', 'Government and private sector translation jobs'] },
      { id: 'dbhps-pgd-journalism', name: 'PG Diploma in Journalism (Hindi)', nameTamil: 'பத்திரிகையியல் முதுநிலை டிப்ளோமா (இந்தி)', type: 'PG Diploma', category: 'On-Campus', school: 'Hindi Studies', duration: '1 Year', eligibility: 'Graduation with Hindi proficiency', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Hindi media and journalism', 'Hindi news channels and newspapers'] }
    ]
  },

  // ============================================
  // 10. INDIAN MARITIME UNIVERSITY (IMU) CHENNAI
  // ============================================
  // India's premier central university for maritime education, training & research
  // Headquarters at Chennai (Semmencherry, ECR)
  {
    id: 'imu-chennai',
    name: 'Indian Maritime University',
    nameTamil: 'இந்திய கடல்சார் பல்கலைக்கழகம்',
    location: 'Chennai (Headquarters)',
    website: 'https://www.imu.edu.in',
    phone: '044-24530343',
    email: 'admissions@imu.edu.in',
    examName: 'IMU-CET (UG/PG) / GATE / CAT / MAT',
    logoColor: '#003366',
    logo: '/universities/imu-chennai-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'IMU-CET 2026 Registration', eventTamil: 'IMU-CET 2026 பதிவு', date: 'February 2026', status: 'upcoming' },
      { event: 'IMU-CET 2026 Exam', eventTamil: 'IMU-CET 2026 தேர்வு', date: 'May/June 2026', status: 'upcoming' },
      { event: 'Counselling & Admission', eventTamil: 'கலந்தாய்வு & சேர்க்கை', date: 'July 2026', status: 'upcoming' },
      { event: 'Session Begins', eventTamil: 'வகுப்புகள் தொடக்கம்', date: 'August 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 100000 },
    courses: [
      // ========== UNDERGRADUATE - ENGINEERING (4 Years) ==========
      // Admission via IMU-CET
      { id: 'imu-btech-marine', name: 'B.Tech Marine Engineering', nameTamil: 'B.Tech கடல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Marine Engineering', duration: '4 Years', eligibility: 'IMU-CET qualified, 12th PCM (60% aggregate), Age < 25, Physical Fitness', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: false, sections: [{ name: 'English', nameTamil: 'ஆங்கிலம்', questions: 25, marks: 25, topics: ['Grammar', 'Comprehension', 'Vocabulary'] }, { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 50, marks: 50, topics: ['Reasoning', 'Numerical Ability', 'General Knowledge'] }, { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 50, topics: ['Algebra', 'Trigonometry', 'Calculus', 'Coordinate Geometry'] }, { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics'] }, { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 25, marks: 25, topics: ['Physical', 'Organic', 'Inorganic Chemistry'] }] }, syllabus: [], previousQuestions: [], tips: ['Career as Marine Engineer (Fourth Engineer) on merchant ships', 'Campuses: Chennai, Kolkata, Mumbai Port', 'Strict 6/6 eyesight required', 'Excellent placement in Maersk, Anglo-Eastern, Fleet Management'] },
      { id: 'imu-btech-naval', name: 'B.Tech Naval Architecture & Ocean Engineering', nameTamil: 'B.Tech கப்பல் கட்டடக்கலை & கடல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Naval Architecture', duration: '4 Years', eligibility: 'IMU-CET qualified, 12th PCM (60% aggregate), Age < 25', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Design and construct ships, offshore structures, oil rigs', 'Campus: Visakhapatnam', 'Career in shipyards, offshore companies, Navy'] },

      // ========== UNDERGRADUATE - SCIENCE (3 Years) ==========
      { id: 'imu-bsc-nautical', name: 'B.Sc. Nautical Science', nameTamil: 'B.Sc. கப்பல் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Nautical Science', duration: '3 Years', eligibility: 'IMU-CET qualified, 12th PCM (60% aggregate), Age < 25, 6/6 Eyesight mandatory', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Career as Navigating Officer → Captain on merchant ships', 'Campuses: Chennai, Kochi, Navi Mumbai', 'Strict medical fitness (especially eyesight) required', 'Top shipping company placements: Maersk, SCI'] },
      { id: 'imu-bsc-maritime', name: 'B.Sc. Maritime Science', nameTamil: 'B.Sc. கடல்சார் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Nautical Science', duration: '3 Years', eligibility: 'IMU-CET qualified, 12th PCM (60% aggregate), Age < 25', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Campus: Mumbai Port', 'Alternative pathway to maritime careers'] },
      { id: 'imu-bsc-shipbuilding', name: 'B.Sc. Ship Building & Repair', nameTamil: 'B.Sc. கப்பல் கட்டுதல் & பழுதுபார்த்தல்', type: 'UG', category: 'Affiliated', school: 'Naval Architecture', duration: '3 Years', eligibility: 'IMU-CET qualified, 12th PCM', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Offered at Affiliated Institutes only', 'Career in shipyard operations and maintenance'] },

      // ========== UNDERGRADUATE - MANAGEMENT (3 Years) ==========
      { id: 'imu-bba-logistics', name: 'B.B.A. (Logistics, Retailing and E-Commerce)', nameTamil: 'B.B.A. (தளவாடம், சில்லறை & மின்வணிகம்)', type: 'UG', category: 'On-Campus', school: 'Management', duration: '3 Years', eligibility: '12th Pass (Any stream) - Based on 12th marks / CUET-UG', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Merit-based', durationMinutes: 0, mode: 'Merit/CUET', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['No IMU-CET required (check notification)', 'Campuses: Chennai, Kochi', 'Career in supply chain, logistics, e-commerce'] },

      // ========== DIPLOMA (1 Year) ==========
      { id: 'imu-dns', name: 'Diploma in Nautical Science (DNS)', nameTamil: 'கப்பல் அறிவியல் டிப்ளோமா (DNS)', type: 'Diploma', category: 'On-Campus', school: 'Nautical Science', duration: '1 Year + 18 months sea training', eligibility: 'IMU-CET qualified, 12th PCM (60%), Shipping Company Sponsorship required', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['IMPORTANT: Must have Sponsorship before joining', 'Leads to B.Sc. (Applied Nautical Science) degree', 'Campuses: Chennai, Navi Mumbai', 'Fast-track route to Captain career'] },

      // ========== POSTGRADUATE - M.Tech (2 Years) ==========
      // Admission via IMU-CET (PG) / GATE
      { id: 'imu-mtech-naval', name: 'M.Tech Naval Architecture & Ocean Engineering', nameTamil: 'M.Tech கப்பல் கட்டடக்கலை & கடல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Naval Architecture', duration: '2 Years', eligibility: 'B.Tech/BE (Naval Arch/Mechanical/Civil) + GATE/IMU-CET(PG)', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Campus: Visakhapatnam', 'Advanced ship design research'] },
      { id: 'imu-mtech-dredging', name: 'M.Tech Dredging & Harbour Engineering', nameTamil: 'M.Tech தூர்வாரல் & துறைமுக பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Naval Architecture', duration: '2 Years', eligibility: 'B.Tech/BE (Civil/Mechanical/Naval Arch) + GATE/IMU-CET(PG)', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Campus: Visakhapatnam', 'Port development and coastal engineering'] },
      { id: 'imu-mtech-marine-mgmt', name: 'M.Tech Marine Engineering & Management', nameTamil: 'M.Tech கடல் பொறியியல் & மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Marine Engineering', duration: '2 Years', eligibility: 'B.Tech/BE (Marine/Mechanical) + GATE/IMU-CET(PG)', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Campus: Kolkata', 'Marine systems and fleet management'] },

      // ========== POSTGRADUATE - MBA (2 Years) ==========
      // Specialized maritime management degrees
      { id: 'imu-mba-itlm', name: 'MBA International Transportation & Logistics Management', nameTamil: 'MBA சர்வதேச போக்குவரத்து & தளவாட மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT/MAT/IMU-CET(PG) score', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Campuses: Chennai, Kolkata, Kochi, Visakhapatnam', 'Premier MBA for logistics sector', 'Placements in DHL, Maersk, shipping companies'] },
      { id: 'imu-mba-psm', name: 'MBA Port & Shipping Management', nameTamil: 'MBA துறைமுக & கப்பல் மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT/MAT/IMU-CET(PG) score', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Campuses: Chennai, Kochi', 'Port operations and maritime logistics', 'Career in major ports, shipping lines'] },

      // ========== POSTGRADUATE - M.Sc. (2 Years) ==========
      { id: 'imu-msc-csl', name: 'M.Sc. Commercial Shipping & Logistics', nameTamil: 'M.Sc. வணிகக் கப்பல் & தளவாடவியல்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + IMU-CET(PG) score', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Online (CBT)', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Campus: Mumbai Port', 'Commercial aspects of shipping industry'] },

      // ========== RESEARCH ==========
      { id: 'imu-ms-research', name: 'M.S. (by Research)', nameTamil: 'M.S. (ஆய்வு)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '2-3 Years', eligibility: 'B.Tech/M.Tech (Marine/Naval/Related) + Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in Marine Engineering, Nautical Science, Naval Architecture, Maritime Management', 'Thesis-based evaluation'] },
      { id: 'imu-phd', name: 'Ph.D. (Maritime Studies)', nameTamil: 'Ph.D. (கடல்சார் ஆய்வுகள்)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-6 Years', eligibility: 'M.Tech/M.Sc./MBA (Maritime/Related) + Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Doctoral research in maritime disciplines', 'Fellowship provided', 'Areas: Marine Engineering, Nautical Science, Naval Architecture, Maritime Management'] }
    ]
  }
];
