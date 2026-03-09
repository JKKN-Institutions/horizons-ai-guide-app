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
    location: 'Chennai, Tamil Nadu',
    website: 'https://www.iitm.ac.in',
    phone: '044-22578200',
    email: 'info@iitm.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG) / CAT (MBA)',
    logoColor: '#0066CC',
    logo: '/universities/iit-madras-logo.png',
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
    location: 'Tiruchirappalli, Tamil Nadu',
    website: 'https://www.nitt.edu',
    phone: '0431-2503000',
    email: 'registrar@nitt.edu',
    examName: 'JEE Main (UG) / GATE (PG) / CAT (MBA) / NIMCET (MCA)',
    logoColor: '#1E3A8A',
    logo: '/universities/nit-trichy-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026 Application', eventTamil: 'JEE மெயின் 2026 விண்ணப்பம்', date: 'November 2026', status: 'upcoming' },
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
    location: 'Tiruchirappalli, Tamil Nadu',
    website: 'https://www.iimtrichy.ac.in',
    phone: '0431-2505000',
    email: 'pgpadmissions@iimtrichy.ac.in',
    examName: 'CAT (Common Admission Test)',
    logoColor: '#8B0000',
    logo: '/universities/iim-trichy-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' },
      { event: 'CAT 2026 Results', eventTamil: 'CAT 2026 முடிவுகள்', date: 'January 2026', status: 'upcoming' },
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
    location: 'Chennai, Tamil Nadu',
    website: 'https://www.imu.edu.in',
    phone: '044-24538433',
    email: 'admission@imu.edu.in',
    examName: 'IMU-CET (UG) / GATE/CAT (PG)',
    logoColor: '#003366',
    logo: '/universities/imu-chennai-logo.png',
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
    location: 'Kancheepuram, Tamil Nadu',
    website: 'https://www.iiitdm.ac.in',
    phone: '044-27476346',
    email: 'admin@iiitdm.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#2E7D32',
    logo: '/universities/iiitdm-kancheepuram-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026 Application', eventTamil: 'JEE மெயின் 2026 விண்ணப்பம்', date: 'November 2026', status: 'upcoming' },
      { event: 'JEE Main 2026 Exam', eventTamil: 'JEE மெயின் 2026 தேர்வு', date: 'January/April 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      // ========== UNDERGRADUATE - B.Tech (4 Years) ==========
      { id: 'iiitdm-btech-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['CSE specialization'] },
      { id: 'iiitdm-btech-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல்தொடர்பு பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['ECE specialization'] },
      { id: 'iiitdm-btech-mech', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரப் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Mechanical specialization'] },
      { id: 'iiitdm-btech-smart', name: 'B.Tech Smart Manufacturing', nameTamil: 'B.Tech திறன் உற்பத்தி', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Manufacturing specialization'] },
      { id: 'iiitdm-btech-ce', name: 'B.Tech Computer Engineering', nameTamil: 'B.Tech கணினி பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Hardware + Software specialization'] },
      { id: 'iiitdm-bdes', name: 'B.Des', nameTamil: 'B.Des வடிவமைப்பு', type: 'UG', category: 'On-Campus', school: 'Design', duration: '4 Years', eligibility: 'JEE Main / UCEED qualified, 12th Pass', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Product Design specialization'] },
      // ========== POSTGRADUATE - M.Tech (2 Years) ==========
      { id: 'iiitdm-mtech-cse', name: 'M.Tech Computer Science & Engineering', nameTamil: 'M.Tech கணினி அறிவியல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['CSE specialization'] },
      { id: 'iiitdm-mtech-ece', name: 'M.Tech Electronics & Communication', nameTamil: 'M.Tech மின்னணு & தகவல்தொடர்பு', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['ECE specialization'] },
      { id: 'iiitdm-mtech-mech', name: 'M.Tech Mechanical Engineering', nameTamil: 'M.Tech இயந்திரப் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Mechanical specialization'] },
      { id: 'iiitdm-mtech-vlsi', name: 'M.Tech VLSI Design', nameTamil: 'M.Tech VLSI வடிவமைப்பு', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['VLSI specialization'] },
      { id: 'iiitdm-mtech-ds', name: 'M.Tech Data Science', nameTamil: 'M.Tech தரவு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Data Science specialization'] },
      { id: 'iiitdm-mdes', name: 'M.Des', nameTamil: 'M.Des வடிவமைப்பு', type: 'PG', category: 'On-Campus', school: 'Design', duration: '2 Years', eligibility: 'B.Des/B.Tech + CEED qualified', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'CEED + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Design specialization'] },
      // ========== RESEARCH - Ph.D. (3-5 Years) ==========
      { id: 'iiitdm-phd-cse', name: 'Ph.D. Computer Science', nameTamil: 'Ph.D. கணினி அறிவியல்', type: 'Research', category: 'On-Campus', school: 'Research', duration: '3-5 Years', eligibility: 'M.Tech/M.Sc. + GATE/Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in Computer Science'] },
      { id: 'iiitdm-phd-ece', name: 'Ph.D. Electronics', nameTamil: 'Ph.D. மின்னணு', type: 'Research', category: 'On-Campus', school: 'Research', duration: '3-5 Years', eligibility: 'M.Tech/M.Sc. + GATE/Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in Electronics'] },
      { id: 'iiitdm-phd-mech', name: 'Ph.D. Mechanical', nameTamil: 'Ph.D. இயந்திர', type: 'Research', category: 'On-Campus', school: 'Research', duration: '3-5 Years', eligibility: 'M.Tech/M.Sc. + GATE/Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in Mechanical'] }
    ]
  },

  // ============================================
  // 7. IIIT TRICHY
  // ============================================
  {
    id: 'iiit-trichy',
    name: 'Indian Institute of Information Technology, Tiruchirappalli',
    nameTamil: 'இந்திய தகவல் தொழில்நுட்ப நிறுவனம், திருச்சிராப்பள்ளி',
    location: 'Tiruchirappalli, Tamil Nadu',
    website: 'https://www.iiitt.ac.in',
    phone: '0431-2500355',
    email: 'admin@iiitt.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#1565C0',
    logo: '/universities/iiit-trichy-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026 Application', eventTamil: 'JEE மெயின் 2026 விண்ணப்பம்', date: 'November 2026', status: 'upcoming' },
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
  // Institute of National Importance (INI) under Ministry of Food Processing Industries
  // Best institute in Tamil Nadu for Food Processing and Food Engineering
  {
    id: 'niftem-thanjavur',
    name: 'NIFTEM Thanjavur (formerly IICPT)',
    nameTamil: 'தேசிய உணவு தொழில்நுட்ப நிறுவனம் தஞ்சாவூர் (முன்னர் IICPT)',
    location: 'Thanjavur, Tamil Nadu',
    website: 'https://www.niftem-t.ac.in',
    phone: '04362-228155',
    email: 'admissions@niftem-t.ac.in',
    examName: 'JEE Main (UG) / GATE / NIFTEM-T Entrance (PG)',
    logoColor: '#2E7D32',
    logo: '/universities/niftem-thanjavur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026 Application', eventTamil: 'JEE மெயின் 2026 விண்ணப்பம்', date: 'November 2026', status: 'upcoming' },
      { event: 'JoSAA/CSAB Counselling', eventTamil: 'JoSAA/CSAB கலந்தாய்வு', date: 'June 2026', status: 'upcoming' },
      { event: 'M.Tech GATE Admission', eventTamil: 'M.Tech GATE சேர்க்கை', date: 'April-May 2026', status: 'upcoming' },
      { event: 'Spot Round (if seats available)', eventTamil: 'ஸ்பாட் சுற்று (இடங்கள் இருந்தால்)', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 125000, obc: 125000, scst: 62500 },
    courses: [
      // ========== UNDERGRADUATE - B.Tech (4 Years) ==========
      // Admission strictly via JEE Main Ranks (JoSAA/CSAB Counselling)
      { id: 'niftem-btech-ft', name: 'B.Tech Food Technology', nameTamil: 'B.Tech உணவு தொழில்நுட்பம்', type: 'UG', category: 'On-Campus', school: 'Food Technology', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM/PCB (60% aggregate)', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [{ name: 'Physics', nameTamil: 'இயற்பியல்', questions: 25, marks: 100, topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism'] }, { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 25, marks: 100, topics: ['Physical', 'Organic', 'Inorganic Chemistry'] }, { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 25, marks: 100, topics: ['Calculus', 'Algebra', 'Statistics'] }] }, syllabus: [], previousQuestions: [], tips: ['~90 Seats available via JoSAA/CSAB', 'Admission similar to NITs and IIITs', 'Spot round if seats remain after JoSAA', 'Excellent placement in Nestle, ITC, Britannia, Amul, Coca-Cola'] },

      // ========== POSTGRADUATE - M.Tech (2 Years) ==========
      // Priority: GATE Score (XL/XE/AG) | Non-GATE: NIFTEM-T Entrance Exam
      // Famous for Pilot Plants (mini-factories) on campus for hands-on learning
      { id: 'niftem-mtech-fpe', name: 'M.Tech Food Process Engineering', nameTamil: 'M.Tech உணவு செயலாக்கப் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Food Technology', duration: '2 Years', eligibility: 'B.Tech (Food Tech/Chemical/Biotech/Agri Engg) + GATE (XL/XE/AG) or NIFTEM-T Entrance', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Focus: Designing food processing machinery, factory layout, thermal processing', 'Learn on Pilot Plants (mini-factories) on campus', 'Hands-on manufacturing experience'] },
      { id: 'niftem-mtech-fpt', name: 'M.Tech Food Process Technology', nameTamil: 'M.Tech உணவு செயலாக்க தொழில்நுட்பம்', type: 'PG', category: 'On-Campus', school: 'Food Technology', duration: '2 Years', eligibility: 'B.Tech (Food Tech/Chemical/Biotech) + GATE (XL/XE/AG) or NIFTEM-T Entrance', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Focus: Product development, food chemistry, preservation techniques', 'Learn to make jams, juices, dairy products', 'R&D careers in FMCG companies'] },
      { id: 'niftem-mtech-fsqa', name: 'M.Tech Food Safety & Quality Assurance', nameTamil: 'M.Tech உணவு பாதுகாப்பு & தர உத்தரவாதம்', type: 'PG', category: 'On-Campus', school: 'Food Technology', duration: '2 Years', eligibility: 'B.Tech/B.Sc. (Food/Life Sciences) + GATE (XL/XE) or NIFTEM-T Entrance', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Focus: Food testing, FSSAI regulations, quality control, safety audits', 'NABL-accredited food testing labs on campus', 'Careers as Quality Managers, Food Safety Officers'] },

      // ========== RESEARCH - Ph.D. ==========
      // Admission via GATE/NET or Institute Entrance Exam + Interview
      { id: 'niftem-phd-fpe', name: 'Ph.D. Food Process Engineering', nameTamil: 'Ph.D. உணவு செயலாக்கப் பொறியியல்', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-6 Years', eligibility: 'M.Tech (Food/Related) + GATE/NET or Institute Entrance + Interview', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in food processing machinery and technology', 'Fellowship provided'] },
      { id: 'niftem-phd-fpt', name: 'Ph.D. Food Process Technology', nameTamil: 'Ph.D. உணவு செயலாக்க தொழில்நுட்பம்', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-6 Years', eligibility: 'M.Tech (Food/Related) + GATE/NET or Institute Entrance + Interview', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in product development and preservation', 'Fellowship provided'] },
      { id: 'niftem-phd-fsqa', name: 'Ph.D. Food Safety & Quality Assurance', nameTamil: 'Ph.D. உணவு பாதுகாப்பு & தர உத்தரவாதம்', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-6 Years', eligibility: 'M.Tech (Food/Related) + GATE/NET or Institute Entrance + Interview', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in food safety regulations and testing', 'Fellowship provided'] },

      // ========== SHORT-TERM SKILL TRAINING (For Entrepreneurs) ==========
      // Practical training for people wanting to start food businesses
      { id: 'niftem-cert-bakery', name: 'Certificate in Bakery & Confectionery', nameTamil: 'பேக்கரி & இனிப்பு பயிற்சி சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '1-5 Days', eligibility: 'Open to all (Entrepreneurs, Home bakers, Startups)', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Training', durationMinutes: 0, mode: 'Hands-on Workshop', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Hands-on practical training', 'Use institute machinery to manufacture products', 'For aspiring food entrepreneurs'] },
      { id: 'niftem-cert-dairy', name: 'Certificate in Dairy Processing', nameTamil: 'பால் பதப்படுத்துதல் பயிற்சி சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '1-5 Days', eligibility: 'Open to all', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Training', durationMinutes: 0, mode: 'Hands-on Workshop', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Dairy product manufacturing', 'Incubation center support available'] },
      { id: 'niftem-cert-fvp', name: 'Certificate in Fruit & Vegetable Processing', nameTamil: 'பழம் & காய்கறி பதப்படுத்துதல் சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '1-5 Days', eligibility: 'Open to all', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Training', durationMinutes: 0, mode: 'Hands-on Workshop', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Jams, juices, pickles manufacturing', 'Test your product in the market'] },
      { id: 'niftem-cert-millet', name: 'Certificate in Millet Processing', nameTamil: 'தினை பதப்படுத்துதல் சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '1-5 Days', eligibility: 'Open to all', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Training', durationMinutes: 0, mode: 'Hands-on Workshop', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['HIGH DEMAND: Millet-based products trending', 'Value-added millet foods', 'Government schemes for millet startups'] },
      { id: 'niftem-cert-rte', name: 'Certificate in Ready-to-Eat (RTE) Foods', nameTamil: 'ஆயத்த உணவுகள் (RTE) சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '1-5 Days', eligibility: 'Open to all', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Training', durationMinutes: 0, mode: 'Hands-on Workshop', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Packaged food manufacturing', 'Shelf-life extension techniques'] },
      { id: 'niftem-cert-packaging', name: 'Certificate in Packaging Technology', nameTamil: 'பேக்கேஜிங் தொழில்நுட்ப சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '1-5 Days', eligibility: 'Open to all', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Training', durationMinutes: 0, mode: 'Hands-on Workshop', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Food packaging materials and design', 'Regulatory compliance for packaging'] }
    ]
  },

  // ============================================
  // 9. DAKSHINA BHARAT HINDI PRACHAR SABHA (DBHPS)
  // ============================================
  // Institution of National Importance (Deemed University) by Act of Parliament
  // Two modes: Sabha Exams (Certificate/Diploma) + University Wing (UGC Degrees)
  {
    id: 'dbhps-chennai',
    name: 'Dakshina Bharat Hindi Prachar Sabha',
    nameTamil: 'தக்ஷிண பாரத இந்தி பிரச்சார சபை',
    location: 'Chennai, Tamil Nadu',
    website: 'https://www.dbhpsabha.org',
    phone: '044-24993727',
    email: 'info@dbhpsabha.org',
    examName: 'DBHPS Entrance Exam / Sabha Proficiency Exams',
    logoColor: '#C41E3A',
    logo: '/universities/dbhps-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'Sabha Exams (Session 1)', eventTamil: 'சபா தேர்வுகள் (அமர்வு 1)', date: 'February 2026', status: 'upcoming' },
      { event: 'Sabha Exams (Session 2)', eventTamil: 'சபா தேர்வுகள் (அமர்வு 2)', date: 'August 2026', status: 'upcoming' },
      { event: 'University B.Ed/M.A. Admission', eventTamil: 'பல்கலைக்கழக B.Ed/M.A. சேர்க்கை', date: 'May-June 2026', status: 'upcoming' },
      { event: 'B.Ed. Entrance Exam', eventTamil: 'B.Ed. நுழைவுத் தேர்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 15000, obc: 15000, scst: 7500 },
    courses: [
      // ========== UNIVERSITY WING - TEACHER EDUCATION (UGC Recognized) ==========
      // These degrees are valid for government teacher jobs across India
      { id: 'dbhps-bed', name: 'B.Ed. (Shiksha Snatak) - Hindi Medium', nameTamil: 'B.Ed. (சிக்ஷா ஸ்னாதக்) - இந்தி வழி', type: 'UG', category: 'On-Campus', school: 'Teacher Education', duration: '2 Years', eligibility: 'Graduation (B.A./B.Sc./B.Com) with 50% marks + Hindi as a subject or Sabha Exams', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Offline', negativeMarking: false, sections: [{ name: 'Hindi Language', nameTamil: 'இந்தி மொழி', questions: 40, marks: 40, topics: ['Grammar', 'Literature', 'Comprehension'] }, { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 30, marks: 30, topics: ['Current Affairs', 'Education', 'History'] }, { name: 'Teaching Aptitude', nameTamil: 'கற்பித்தல் திறன்', questions: 30, marks: 30, topics: ['Pedagogy', 'Child Psychology', 'Teaching Methods'] }] }, syllabus: [], previousQuestions: [], tips: ['HIGHLY POPULAR: Valid for govt teacher jobs across India', 'Entrance Exam held in May/June', 'Hindi medium instruction', 'Best path for becoming Hindi teacher'] },
      { id: 'dbhps-med', name: 'M.Ed. (Shiksha Nishnat)', nameTamil: 'M.Ed. (சிக்ஷா நிஷ்ணத்)', type: 'PG', category: 'On-Campus', school: 'Teacher Education', duration: '2 Years', eligibility: 'B.Ed. with 50% marks', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Advanced teacher training', 'For education research and administration', 'College lecturer eligibility'] },

      // ========== UNIVERSITY WING - POSTGRADUATE (M.A.) ==========
      { id: 'dbhps-ma-hindi', name: 'M.A. Hindi', nameTamil: 'M.A. இந்தி', type: 'PG', category: 'On-Campus', school: 'Hindi Studies', duration: '2 Years', eligibility: 'Graduation (B.A./B.Sc./B.Com) + Rashtrabhasha Praveen OR Hindi as college subject', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test', durationMinutes: 180, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Important: Praveen certificate makes you eligible (no B.A. Hindi needed)', 'Hindi literature and linguistics', 'Path to NET/SET and teaching careers'] },
      { id: 'dbhps-ma-hindi-dde', name: 'M.A. Hindi (Distance Education)', nameTamil: 'M.A. இந்தி (தொலைநிலை கல்வி)', type: 'PG', category: 'DDE', school: 'Hindi Studies', duration: '2 Years', eligibility: 'Graduation + Praveen/Hindi subject', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Term-end Exam', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Distance mode for working professionals', 'Same degree value as regular M.A.', 'Flexible study schedule'] },

      // ========== UNIVERSITY WING - PG DIPLOMA (1 Year) ==========
      { id: 'dbhps-pgd-translation', name: 'PG Diploma in Translation (Anuvad)', nameTamil: 'மொழிபெயர்ப்பு முதுநிலை டிப்ளோமா (அனுவாத்)', type: 'PG Diploma', category: 'On-Campus', school: 'Hindi Studies', duration: '1 Year', eligibility: 'Graduation with Hindi proficiency', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Hindi-English-Tamil translation skills', 'Government and private sector translation jobs', 'Court translator, official translator careers'] },
      { id: 'dbhps-pgd-journalism', name: 'PG Diploma in Journalism (Hindi)', nameTamil: 'பத்திரிகையியல் முதுநிலை டிப்ளோமா (இந்தி)', type: 'PG Diploma', category: 'On-Campus', school: 'Hindi Studies', duration: '1 Year', eligibility: 'Graduation with Hindi proficiency', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Hindi media and journalism', 'Hindi news channels: Aaj Tak, Zee News, ABP', 'Print media: Dainik Bhaskar, Amar Ujala'] },

      // ========== UNIVERSITY WING - RESEARCH ==========
      { id: 'dbhps-mphil', name: 'M.Phil. Hindi', nameTamil: 'M.Phil. இந்தி', type: 'Research', category: 'On-Campus', school: 'Research', duration: '1-2 Years', eligibility: 'M.A. Hindi with 55% marks', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Pre-doctoral research degree', 'Dissertation-based evaluation'] },
      { id: 'dbhps-phd', name: 'Ph.D. Hindi', nameTamil: 'Ph.D. இந்தி', type: 'Research', category: 'On-Campus', school: 'Research', duration: '3-5 Years', eligibility: 'M.A. Hindi with 55% + UGC NET/SLET or M.Phil.', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Doctoral research in Hindi literature/linguistics', 'Academia and publishing careers', 'Fellowship may be available'] },

      // ========== SABHA EXAMS - 8 LEVELS OF HINDI PROFICIENCY ==========
      // Famous nationwide exams taken by millions of students
      { id: 'dbhps-parichaya', name: 'Parichaya (Level 1 - Basic)', nameTamil: 'பரிச்சய (நிலை 1 - அடிப்படை)', type: 'Certificate', category: 'On-Campus', school: 'Sabha Exams', duration: '6 Months - 1 Year', eligibility: 'Open to all (No prior Hindi knowledge required)', examPattern: { totalQuestions: 0, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Entry level - Kindergarten equivalent', 'Learn Hindi alphabets and basic words', 'Exams held Feb & Aug'] },
      { id: 'dbhps-prathmic', name: 'Prathmic (Level 2 - Primary)', nameTamil: 'பிராத்மிக் (நிலை 2 - ஆரம்ப)', type: 'Certificate', category: 'On-Campus', school: 'Sabha Exams', duration: '6 Months - 1 Year', eligibility: 'Parichaya pass or equivalent', examPattern: { totalQuestions: 0, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Primary school level Hindi', 'Basic reading and writing', 'Foundation for higher exams'] },
      { id: 'dbhps-madhyama', name: 'Madhyama (Level 3 - Middle)', nameTamil: 'மத்யமா (நிலை 3 - நடுத்தர)', type: 'Certificate', category: 'On-Campus', school: 'Sabha Exams', duration: '6 Months - 1 Year', eligibility: 'Prathmic pass or equivalent', examPattern: { totalQuestions: 0, totalMarks: 100, duration: '2.5 Hours', durationMinutes: 150, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Middle school level proficiency', 'Grammar and composition introduced'] },
      { id: 'dbhps-rashtrabhasha', name: 'Rashtrabhasha (Level 4 - High School)', nameTamil: 'ராஷ்ட்ரபாஷா (நிலை 4 - உயர்நிலை)', type: 'Certificate', category: 'On-Campus', school: 'Sabha Exams', duration: '1 Year', eligibility: 'Madhyama pass or equivalent', examPattern: { totalQuestions: 0, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['High school level Hindi', 'Advanced grammar and literature', 'Strong foundation for Praveshika'] },
      { id: 'dbhps-praveshika', name: 'Praveshika (Level 5 - 10th Equivalent)', nameTamil: 'பிரவேஷிகா (நிலை 5 - 10ஆம் வகுப்புக்கு இணை)', type: 'Certificate', category: 'On-Campus', school: 'Sabha Exams', duration: '1 Year', eligibility: 'Rashtrabhasha pass or equivalent', examPattern: { totalQuestions: 0, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['IMPORTANT: Equivalent to 10th Standard (Matric)', 'Recognized by government for Hindi proficiency', 'Gateway to Visharad level'] },
      { id: 'dbhps-visharad-p', name: 'Visharad Poorvardh (Level 6 - 11th Equivalent)', nameTamil: 'விஷாரத் பூர்வார்த் (நிலை 6 - 11ஆம் வகுப்புக்கு இணை)', type: 'Diploma', category: 'On-Campus', school: 'Sabha Exams', duration: '1 Year', eligibility: 'Praveshika pass', examPattern: { totalQuestions: 0, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Higher secondary level (Part 1)', 'Literature and advanced grammar'] },
      { id: 'dbhps-visharad-u', name: 'Visharad Uttarardh (Level 7 - 12th Equivalent)', nameTamil: 'விஷாரத் உத்தரார்த் (நிலை 7 - 12ஆம் வகுப்புக்கு இணை)', type: 'Diploma', category: 'On-Campus', school: 'Sabha Exams', duration: '1 Year', eligibility: 'Visharad Poorvardh pass', examPattern: { totalQuestions: 0, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['IMPORTANT: Equivalent to 12th Standard (HSC)', 'Complete Visharad = +2 level proficiency', 'Prepares for Praveen'] },
      { id: 'dbhps-praveen', name: 'Praveen (Level 8 - B.A. Equivalent)', nameTamil: 'பிரவீண் (நிலை 8 - B.A.க்கு இணை)', type: 'Diploma', category: 'On-Campus', school: 'Sabha Exams', duration: '2 Years (Poorvardh + Uttarardh)', eligibility: 'Visharad Uttarardh pass', examPattern: { totalQuestions: 0, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['HIGHEST SABHA EXAM: Rashtrabhasha Praveen = B.A. Hindi equivalent', 'Government of India recognition', 'Direct eligibility for M.A. Hindi and B.Ed.', 'Alternative path to graduation for Hindi teachers'] },

      // ========== SKILL COURSES ==========
      { id: 'dbhps-spoken-prelim', name: 'Spoken Hindi (Preliminary)', nameTamil: 'பேச்சு இந்தி (ஆரம்ப)', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '3-6 Months', eligibility: 'Open to all', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Assessment', durationMinutes: 0, mode: 'Oral', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Conversational Hindi for beginners', 'Useful for daily communication', 'No written exam focus'] },
      { id: 'dbhps-spoken-adv', name: 'Spoken Hindi (Advanced)', nameTamil: 'பேச்சு இந்தி (மேம்பட்ட)', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '3-6 Months', eligibility: 'Spoken Hindi Preliminary or equivalent', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Assessment', durationMinutes: 0, mode: 'Oral', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Fluent Hindi conversation', 'Formal and informal speech', 'Interview preparation in Hindi'] },
      { id: 'dbhps-typing', name: 'Certificate in Hindi Typewriting', nameTamil: 'இந்தி தட்டச்சு சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '3-6 Months', eligibility: 'Basic Hindi knowledge', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Typing Test', durationMinutes: 0, mode: 'Computer-based', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Hindi typing on computer/typewriter', 'Government office jobs', 'Data entry in Hindi'] },
      { id: 'dbhps-shorthand', name: 'Certificate in Hindi Shorthand', nameTamil: 'இந்தி சுருக்கெழுத்து சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '6 Months - 1 Year', eligibility: 'Hindi proficiency (Madhyama level recommended)', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Dictation Test', durationMinutes: 0, mode: 'Practical', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Stenography in Hindi', 'Court reporter, PA/Steno jobs', 'Government secretariat positions'] }
    ]
  },

  // ============================================
  // 9. DELHI UNIVERSITY
  // ============================================

  // ============================================
  // 10. JAWAHARLAL NEHRU UNIVERSITY (JNU)
  // ============================================

  // ============================================
  // 11. JAMIA MILLIA ISLAMIA
  // ============================================

  // ============================================
  // 12. BANARAS HINDU UNIVERSITY (BHU)
  // ============================================

  // ============================================
  // 13. ALIGARH MUSLIM UNIVERSITY
  // ============================================

  // ============================================
  // 14. UNIVERSITY OF HYDERABAD
  // ============================================

  // ============================================
  // 15. PONDICHERRY UNIVERSITY
  // ============================================

  // ============================================
  // 16. CENTRAL UNIVERSITY OF KERALA
  // ============================================

  // ============================================
  // 17. CENTRAL UNIVERSITY OF KARNATAKA
  // ============================================

  // ============================================
  // 18. CENTRAL UNIVERSITY OF ANDHRA PRADESH
  // ============================================

  // ============================================
  // 19. CENTRAL UNIVERSITY OF PUNJAB
  // ============================================

  // ============================================
  // 20. CENTRAL UNIVERSITY OF RAJASTHAN
  // ============================================

  // ============================================
  // 21. CENTRAL UNIVERSITY OF GUJARAT
  // ============================================

  // ============================================
  // 22. CENTRAL UNIVERSITY OF HARYANA
  // ============================================

  // ============================================
  // 23. CENTRAL UNIVERSITY OF HIMACHAL PRADESH
  // ============================================

  // ============================================
  // 24. CENTRAL UNIVERSITY OF JHARKHAND
  // ============================================

  // ============================================
  // 25. CENTRAL UNIVERSITY OF BIHAR
  // ============================================

  // ============================================
  // 26. CENTRAL UNIVERSITY OF ODISHA
  // ============================================

  // ============================================
  // 27. CENTRAL UNIVERSITY OF KASHMIR
  // ============================================

  // ============================================
  // 28. VISVA-BHARATI UNIVERSITY
  // ============================================

  // ============================================
  // 29. TEZPUR UNIVERSITY
  // ============================================

  // ============================================
  // 30. ASSAM UNIVERSITY
  // ============================================

  // ============================================
  // 31. NORTH EASTERN HILL UNIVERSITY (NEHU)
  // ============================================

  // ============================================
  // 32. MANIPUR UNIVERSITY
  // ============================================

  // ============================================
  // 33. MIZORAM UNIVERSITY
  // ============================================

  // ============================================
  // 34. NAGALAND UNIVERSITY
  // ============================================

  // ============================================
  // 35. TRIPURA UNIVERSITY
  // ============================================

  // ============================================
  // 36. SIKKIM UNIVERSITY
  // ============================================

  // ============================================
  // 37. RAJIV GANDHI UNIVERSITY
  // ============================================

  // ============================================
  // IIT BOMBAY
  // ============================================
  {
    id: 'iit-bombay',
    name: 'Indian Institute of Technology Bombay',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் மும்பை',
    location: 'Mumbai, Maharashtra',
    website: 'https://www.iitb.ac.in',
    phone: '022-25722545',
    email: 'registrar@iitb.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG) / CAT (MBA)',
    logoColor: '#003366',
    logo: '/universities/iit-bombay-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitb-aero', name: 'B.Tech Aerospace Engineering', nameTamil: 'B.Tech விண்வெளி பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['ISRO & HAL opportunities'] },
      { id: 'iitb-chem', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Petrochemical & Pharma'] },
      { id: 'iitb-civil', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitb-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand, AIR <70'] },
      { id: 'iitb-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitb-energy', name: 'B.Tech Energy Engineering', nameTamil: 'B.Tech ஆற்றல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Renewable energy focus'] },
      { id: 'iitb-ep', name: 'B.Tech Engineering Physics', nameTamil: 'B.Tech பொறியியல் இயற்பியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitb-env', name: 'B.Tech Environmental Science & Engineering', nameTamil: 'B.Tech சுற்றுச்சூழல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Green technology'] },
      { id: 'iitb-ie', name: 'B.Tech Industrial Engineering & Operations Research', nameTamil: 'B.Tech தொழிற்சாலை பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Analytics & Operations'] },
      { id: 'iitb-mech', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitb-meta', name: 'B.Tech Metallurgical Engineering & Materials Science', nameTamil: 'B.Tech உலோகவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Materials R&D'] },
      { id: 'iitb-bsc-chem', name: 'B.Sc. Chemistry', nameTamil: 'B.Sc. வேதியியல்', type: 'UG', category: 'On-Campus', school: 'Science', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research pathway'] },
      { id: 'iitb-bsc-econ', name: 'B.Sc. Economics', nameTamil: 'B.Sc. பொருளாதாரம்', type: 'UG', category: 'On-Campus', school: 'HSS', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Economics + Tech'] },
      { id: 'iitb-bsc-math', name: 'B.Sc. Mathematics', nameTamil: 'B.Sc. கணிதம்', type: 'UG', category: 'On-Campus', school: 'Science', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pure Mathematics'] },
      { id: 'iitb-dd-ee', name: 'B.Tech+M.Tech (Dual Degree) Electrical Engineering', nameTamil: 'B.Tech+M.Tech இரட்டை பட்டம் மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '5 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['5-year integrated program'] },
      { id: 'iitb-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['50+ specializations via GATE'] },
      { id: 'iitb-mba', name: 'MBA (Shailesh J. Mehta School of Management)', nameTamil: 'MBA (மேலாண்மை)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/GMAT qualified', tips: ['Top MBA program'] },
      { id: 'iitb-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitb-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. (முனைவர் பட்டம்)', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Strong research ecosystem'] }
    ]
  },

  // ============================================
  // IIT DELHI
  // ============================================
  {
    id: 'iit-delhi',
    name: 'Indian Institute of Technology Delhi',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் டெல்லி',
    location: 'Delhi',
    website: 'https://www.iitd.ac.in',
    phone: '011-26591000',
    email: 'registrar@iitd.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG) / CAT (MBA)',
    logoColor: '#00205B',
    logo: '/universities/iit-delhi-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitd-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitd-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitd-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitd-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitd-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitd-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitd-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitd-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitd-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT KANPUR
  // ============================================
  {
    id: 'iit-kanpur',
    name: 'Indian Institute of Technology Kanpur',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் கான்பூர்',
    location: 'Kanpur, Uttar Pradesh',
    website: 'https://www.iitk.ac.in',
    phone: '0512-2590111',
    email: 'registrar@iitk.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG) / CAT (MBA)',
    logoColor: '#C41E3A',
    logo: '/universities/iit-kanpur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitk-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitk-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitk-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitk-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitk-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitk-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitk-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitk-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitk-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT KHARAGPUR
  // ============================================
  {
    id: 'iit-kharagpur',
    name: 'Indian Institute of Technology Kharagpur',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் கரக்பூர்',
    location: 'Kharagpur, West Bengal',
    website: 'https://www.iitkgp.ac.in',
    phone: '03222-255221',
    email: 'registrar@iitkgp.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG) / CAT (MBA)',
    logoColor: '#800000',
    logo: '/universities/iit-kharagpur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitkgp-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitkgp-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitkgp-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitkgp-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitkgp-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitkgp-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitkgp-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitkgp-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitkgp-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT ROORKEE
  // ============================================
  {
    id: 'iit-roorkee',
    name: 'Indian Institute of Technology Roorkee',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் ரூர்கி',
    location: 'Roorkee, Uttarakhand',
    website: 'https://www.iitr.ac.in',
    phone: '01332-285311',
    email: 'registrar@iitr.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG) / CAT (MBA)',
    logoColor: '#0033A0',
    logo: '/universities/iit-roorkee-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitr-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitr-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitr-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitr-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitr-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitr-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitr-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitr-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitr-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT GUWAHATI
  // ============================================
  {
    id: 'iit-guwahati',
    name: 'Indian Institute of Technology Guwahati',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் குவாஹாட்டி',
    location: 'Guwahati, Assam',
    website: 'https://www.iitg.ac.in',
    phone: '0361-2582000',
    email: 'registrar@iitg.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG) / CAT (MBA)',
    logoColor: '#006633',
    logo: '/universities/iit-guwahati-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitg-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitg-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitg-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitg-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitg-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitg-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitg-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitg-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitg-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT HYDERABAD
  // ============================================
  {
    id: 'iit-hyderabad',
    name: 'Indian Institute of Technology Hyderabad',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் ஹைதராபாத்',
    location: 'Hyderabad, Telangana',
    website: 'https://www.iith.ac.in',
    phone: '040-23016000',
    email: 'registrar@iith.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG)',
    logoColor: '#8B0000',
    logo: '/universities/iit-hyderabad-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iith-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iith-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iith-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iith-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iith-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iith-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iith-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iith-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iith-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT TIRUPATI
  // ============================================
  {
    id: 'iit-tirupati',
    name: 'Indian Institute of Technology Tirupati',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் திருப்பதி',
    location: 'Tirupati, Andhra Pradesh',
    website: 'https://www.iittp.ac.in',
    phone: '0877-2500400',
    email: 'registrar@iittp.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG)',
    logoColor: '#4B0082',
    logo: '/universities/iit-tirupati-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitt-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitt-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitt-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitt-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitt-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitt-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitt-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitt-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitt-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT PALAKKAD
  // ============================================
  {
    id: 'iit-palakkad',
    name: 'Indian Institute of Technology Palakkad',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் பாலக்காடு',
    location: 'Palakkad, Kerala',
    website: 'https://www.iitpkd.ac.in',
    phone: '04923-226000',
    email: 'registrar@iitpkd.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG)',
    logoColor: '#228B22',
    logo: '/universities/iit-palakkad-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitp-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitp-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitp-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitp-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitp-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitp-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitp-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitp-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitp-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT DHARWAD
  // ============================================
  {
    id: 'iit-dharwad',
    name: 'Indian Institute of Technology Dharwad',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் தார்வாட்',
    location: 'Dharwad, Karnataka',
    website: 'https://www.iitdh.ac.in',
    phone: '0836-2212001',
    email: 'registrar@iitdh.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG)',
    logoColor: '#DC143C',
    logo: '/universities/iit-dharwad-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitdw-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitdw-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitdw-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitdw-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitdw-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitdw-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitdw-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitdw-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitdw-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT INDORE
  // ============================================
  {
    id: 'iit-indore',
    name: 'Indian Institute of Technology Indore',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் இந்தோர்',
    location: 'Indore, Madhya Pradesh',
    website: 'https://www.iiti.ac.in',
    phone: '0731-6603100',
    email: 'registrar@iiti.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG)',
    logoColor: '#0066CC',
    logo: '/universities/iit-indore-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iiti-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iiti-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iiti-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iiti-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iiti-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iiti-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iiti-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iiti-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iiti-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT BHU VARANASI
  // ============================================
  {
    id: 'iit-bhu',
    name: 'Indian Institute of Technology (BHU) Varanasi',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் வாரணாசி',
    location: 'Varanasi, Uttar Pradesh',
    website: 'https://www.iitbhu.ac.in',
    phone: '0542-2368106',
    email: 'registrar@iitbhu.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG)',
    logoColor: '#8B0000',
    logo: '/universities/iit-bhu-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitbhu-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitbhu-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitbhu-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitbhu-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitbhu-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitbhu-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitbhu-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitbhu-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitbhu-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT PATNA
  // ============================================
  {
    id: 'iit-patna',
    name: 'Indian Institute of Technology Patna',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் பாட்னா',
    location: 'Patna, Bihar',
    website: 'https://www.iitp.ac.in',
    phone: '0612-3028000',
    email: 'registrar@iitp.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG)',
    logoColor: '#006400',
    logo: '/universities/iit-patna-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitpat-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitpat-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitpat-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitpat-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitpat-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitpat-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitpat-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitpat-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitpat-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT GANDHINAGAR
  // ============================================
  {
    id: 'iit-gandhinagar',
    name: 'Indian Institute of Technology Gandhinagar',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் காந்திநகர்',
    location: 'Gandhinagar, Gujarat',
    website: 'https://www.iitgn.ac.in',
    phone: '079-23952000',
    email: 'registrar@iitgn.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG)',
    logoColor: '#FF6600',
    logo: '/universities/iit-gandhinagar-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitgn-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitgn-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitgn-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitgn-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitgn-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitgn-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitgn-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitgn-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitgn-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT JODHPUR
  // ============================================
  {
    id: 'iit-jodhpur',
    name: 'Indian Institute of Technology Jodhpur',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் ஜோத்பூர்',
    location: 'Jodhpur, Rajasthan',
    website: 'https://www.iitj.ac.in',
    phone: '0291-2801000',
    email: 'registrar@iitj.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG)',
    logoColor: '#DAA520',
    logo: '/universities/iit-jodhpur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitj-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitj-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitj-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitj-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitj-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitj-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitj-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitj-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitj-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT ROPAR
  // ============================================
  {
    id: 'iit-ropar',
    name: 'Indian Institute of Technology Ropar',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் ரோப்பர்',
    location: 'Rupnagar, Punjab',
    website: 'https://www.iitrpr.ac.in',
    phone: '01881-231000',
    email: 'registrar@iitrpr.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG)',
    logoColor: '#4682B4',
    logo: '/universities/iit-ropar-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitrop-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitrop-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitrop-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitrop-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitrop-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitrop-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitrop-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitrop-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitrop-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT BHUBANESWAR
  // ============================================
  {
    id: 'iit-bhubaneswar',
    name: 'Indian Institute of Technology Bhubaneswar',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் புவனேஸ்வர்',
    location: 'Bhubaneswar, Odisha',
    website: 'https://www.iitbbs.ac.in',
    phone: '0674-2306000',
    email: 'registrar@iitbbs.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG)',
    logoColor: '#2E8B57',
    logo: '/universities/iit-bhubaneswar-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitbbs-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitbbs-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitbbs-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitbbs-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitbbs-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitbbs-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitbbs-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitbbs-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitbbs-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT MANDI
  // ============================================
  {
    id: 'iit-mandi',
    name: 'Indian Institute of Technology Mandi',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் மண்டி',
    location: 'Mandi, Himachal Pradesh',
    website: 'https://www.iitmandi.ac.in',
    phone: '01905-267001',
    email: 'registrar@iitmandi.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG)',
    logoColor: '#20B2AA',
    logo: '/universities/iit-mandi-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitman-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitman-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitman-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitman-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitman-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitman-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitman-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitman-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitman-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT JAMMU
  // ============================================
  {
    id: 'iit-jammu',
    name: 'Indian Institute of Technology Jammu',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் ஜம்மு',
    location: 'Jammu, J&K',
    website: 'https://www.iitjammu.ac.in',
    phone: '0191-2570001',
    email: 'registrar@iitjammu.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG)',
    logoColor: '#4169E1',
    logo: '/universities/iit-jammu-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitjm-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitjm-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitjm-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitjm-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitjm-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitjm-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitjm-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitjm-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitjm-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT BHILAI
  // ============================================
  {
    id: 'iit-bhilai',
    name: 'Indian Institute of Technology Bhilai',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் பிலாய்',
    location: 'Bhilai, Chhattisgarh',
    website: 'https://www.iitbhilai.ac.in',
    phone: '0788-2291000',
    email: 'registrar@iitbhilai.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG)',
    logoColor: '#FF6347',
    logo: '/universities/iit-bhilai-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitbh-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitbh-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitbh-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitbh-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitbh-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitbh-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitbh-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitbh-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitbh-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT GOA
  // ============================================
  {
    id: 'iit-goa',
    name: 'Indian Institute of Technology Goa',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் கோவா',
    location: 'Goa',
    website: 'https://www.iitgoa.ac.in',
    phone: '0832-2490000',
    email: 'registrar@iitgoa.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG)',
    logoColor: '#228B22',
    logo: '/universities/iit-goa-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitgoa-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitgoa-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitgoa-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitgoa-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitgoa-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitgoa-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitgoa-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitgoa-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitgoa-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // IIT DHANBAD (ISM)
  // ============================================
  {
    id: 'iit-dhanbad',
    name: 'Indian Institute of Technology (ISM) Dhanbad',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் தன்பாத்',
    location: 'Dhanbad, Jharkhand',
    website: 'https://www.iitism.ac.in',
    phone: '0326-2235200',
    email: 'registrar@iitism.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG)',
    logoColor: '#006633',
    logo: '/universities/iit-dhanbad-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iitism-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'iitism-ee', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Power & Electronics'] },
      { id: 'iitism-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Automobile & Manufacturing'] },
      { id: 'iitism-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Infrastructure sector'] },
      { id: 'iitism-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Pharma & Petrochemical'] },
      { id: 'iitism-mse', name: 'B.Tech Materials Science & Engineering', nameTamil: 'B.Tech பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced, 12th PCM', tips: ['Research-oriented'] },
      { id: 'iitism-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['Multiple PG specializations via GATE'] },
      { id: 'iitism-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - பல்வேறு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM qualified', tips: ['Physics, Chemistry, Mathematics'] },
      { id: 'iitism-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research programmes'] }
    ]
  },

  // ============================================
  // NIT SURATHKAL (NITK)
  // ============================================
  {
    id: 'nit-surathkal',
    name: 'National Institute of Technology Karnataka, Surathkal',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் சூரத்கல்',
    location: 'Mangalore, Karnataka',
    website: 'https://www.nitk.ac.in',
    phone: '0824-2474000',
    email: 'registrar@nitk.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#003366',
    logo: '/universities/nit-surathkal-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitk-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitk-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitk-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitk-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitk-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitk-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitk-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitk-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitk-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitk-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitk-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT WARANGAL
  // ============================================
  {
    id: 'nit-warangal',
    name: 'National Institute of Technology Warangal',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் வாரங்கல்',
    location: 'Warangal, Telangana',
    website: 'https://www.nitw.ac.in',
    phone: '0870-2462000',
    email: 'registrar@nitw.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#8B0000',
    logo: '/universities/nit-warangal-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitw-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitw-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitw-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitw-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitw-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitw-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitw-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitw-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitw-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitw-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitw-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT CALICUT
  // ============================================
  {
    id: 'nit-calicut',
    name: 'National Institute of Technology Calicut',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் கோழிக்கோடு',
    location: 'Kozhikode, Kerala',
    website: 'https://www.nitc.ac.in',
    phone: '0495-2286100',
    email: 'registrar@nitc.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#006400',
    logo: '/universities/nit-calicut-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitc-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitc-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitc-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitc-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitc-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitc-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitc-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitc-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitc-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitc-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitc-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT ROURKELA
  // ============================================
  {
    id: 'nit-rourkela',
    name: 'National Institute of Technology Rourkela',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் ரூர்கேலா',
    location: 'Rourkela, Odisha',
    website: 'https://www.nitrkl.ac.in',
    phone: '0661-2462000',
    email: 'registrar@nitrkl.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#4B0082',
    logo: '/universities/nit-rourkela-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitr-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitr-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitr-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitr-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitr-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitr-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitr-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitr-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitr-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitr-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitr-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT DURGAPUR
  // ============================================
  {
    id: 'nit-durgapur',
    name: 'National Institute of Technology Durgapur',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் துர்காபூர்',
    location: 'Durgapur, West Bengal',
    website: 'https://www.nitdgp.ac.in',
    phone: '0343-2546339',
    email: 'registrar@nitdgp.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#1E90FF',
    logo: '/universities/nit-durgapur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitd-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitd-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitd-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitd-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitd-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitd-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitd-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitd-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitd-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitd-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitd-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // MNNIT ALLAHABAD
  // ============================================
  {
    id: 'mnnit-allahabad',
    name: 'Motilal Nehru National Institute of Technology Allahabad',
    nameTamil: 'மோதிலால் நேரு தேசிய தொழில்நுட்ப நிறுவனம்',
    location: 'Prayagraj, Uttar Pradesh',
    website: 'https://www.mnnit.ac.in',
    phone: '0532-2545404',
    email: 'registrar@mnnit.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#800020',
    logo: '/universities/mnnit-allahabad-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'mnnit-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'mnnit-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'mnnit-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'mnnit-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'mnnit-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'mnnit-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'mnnit-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'mnnit-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'mnnit-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'mnnit-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'mnnit-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT KURUKSHETRA
  // ============================================
  {
    id: 'nit-kurukshetra',
    name: 'National Institute of Technology Kurukshetra',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் குருக்ஷேத்ரா',
    location: 'Kurukshetra, Haryana',
    website: 'https://www.nitkkr.ac.in',
    phone: '01744-238091',
    email: 'registrar@nitkkr.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#FF8C00',
    logo: '/universities/nit-kurukshetra-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitkk-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitkk-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitkk-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitkk-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitkk-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitkk-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitkk-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitkk-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitkk-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitkk-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitkk-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT JAMSHEDPUR
  // ============================================
  {
    id: 'nit-jamshedpur',
    name: 'National Institute of Technology Jamshedpur',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் ஜாம்ஷெட்பூர்',
    location: 'Jamshedpur, Jharkhand',
    website: 'https://www.nitjsr.ac.in',
    phone: '0657-2374100',
    email: 'registrar@nitjsr.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#2F4F4F',
    logo: '/universities/nit-jamshedpur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitjsr-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitjsr-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitjsr-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitjsr-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitjsr-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitjsr-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitjsr-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitjsr-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitjsr-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitjsr-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitjsr-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT SILCHAR
  // ============================================
  {
    id: 'nit-silchar',
    name: 'National Institute of Technology Silchar',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் சில்சார்',
    location: 'Silchar, Assam',
    website: 'https://www.nits.ac.in',
    phone: '03842-242273',
    email: 'registrar@nits.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#228B22',
    logo: '/universities/nit-silchar-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nits-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nits-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nits-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nits-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nits-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nits-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nits-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nits-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nits-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nits-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nits-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT HAMIRPUR
  // ============================================
  {
    id: 'nit-hamirpur',
    name: 'National Institute of Technology Hamirpur',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் ஹமிர்பூர்',
    location: 'Hamirpur, Himachal Pradesh',
    website: 'https://www.nith.ac.in',
    phone: '01972-254001',
    email: 'registrar@nith.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#4169E1',
    logo: '/universities/nit-hamirpur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nith-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nith-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nith-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nith-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nith-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nith-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nith-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nith-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nith-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nith-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nith-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT SRINAGAR
  // ============================================
  {
    id: 'nit-srinagar',
    name: 'National Institute of Technology Srinagar',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் ஸ்ரீநகர்',
    location: 'Srinagar, J&K',
    website: 'https://www.nitsri.ac.in',
    phone: '0194-2422032',
    email: 'registrar@nitsri.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#006633',
    logo: '/universities/nit-srinagar-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitsr-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitsr-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitsr-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitsr-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitsr-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitsr-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitsr-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitsr-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitsr-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitsr-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitsr-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT JALANDHAR
  // ============================================
  {
    id: 'nit-jalandhar',
    name: 'Dr. B.R. Ambedkar National Institute of Technology Jalandhar',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் ஜலந்தர்',
    location: 'Jalandhar, Punjab',
    website: 'https://www.nitj.ac.in',
    phone: '0181-2690301',
    email: 'registrar@nitj.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#DC143C',
    logo: '/universities/nit-jalandhar-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitj-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitj-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitj-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitj-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitj-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitj-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitj-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitj-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitj-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitj-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitj-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT PATNA
  // ============================================
  {
    id: 'nit-patna',
    name: 'National Institute of Technology Patna',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் பாட்னா',
    location: 'Patna, Bihar',
    website: 'https://www.nitp.ac.in',
    phone: '0612-2371929',
    email: 'registrar@nitp.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#B22222',
    logo: '/universities/nit-patna-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitp-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitp-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitp-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitp-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitp-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitp-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitp-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitp-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitp-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitp-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitp-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT RAIPUR
  // ============================================
  {
    id: 'nit-raipur',
    name: 'National Institute of Technology Raipur',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் ராய்பூர்',
    location: 'Raipur, Chhattisgarh',
    website: 'https://www.nitrr.ac.in',
    phone: '0771-2254200',
    email: 'registrar@nitrr.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#2E8B57',
    logo: '/universities/nit-raipur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitrp-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitrp-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitrp-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitrp-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitrp-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitrp-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitrp-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitrp-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitrp-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitrp-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitrp-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT AGARTALA
  // ============================================
  {
    id: 'nit-agartala',
    name: 'National Institute of Technology Agartala',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் அகர்தலா',
    location: 'Agartala, Tripura',
    website: 'https://www.nita.ac.in',
    phone: '0381-2346630',
    email: 'registrar@nita.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#556B2F',
    logo: '/universities/nit-agartala-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nita-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nita-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nita-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nita-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nita-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nita-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nita-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nita-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nita-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nita-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nita-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // VNIT NAGPUR
  // ============================================
  {
    id: 'vnit-nagpur',
    name: 'Visvesvaraya National Institute of Technology Nagpur',
    nameTamil: 'விஸ்வேஸ்வரய்யா தேசிய தொழில்நுட்ப நிறுவனம்',
    location: 'Nagpur, Maharashtra',
    website: 'https://www.vnit.ac.in',
    phone: '0712-2801258',
    email: 'registrar@vnit.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#FF6347',
    logo: '/universities/vnit-nagpur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'vnit-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'vnit-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'vnit-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'vnit-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'vnit-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'vnit-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'vnit-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'vnit-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'vnit-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'vnit-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'vnit-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT GOA
  // ============================================
  {
    id: 'nit-goa',
    name: 'National Institute of Technology Goa',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் கோவா',
    location: 'Goa',
    website: 'https://www.nitgoa.ac.in',
    phone: '0832-2404200',
    email: 'registrar@nitgoa.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#20B2AA',
    logo: '/universities/nit-goa-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitg-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitg-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitg-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitg-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitg-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitg-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitg-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitg-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitg-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitg-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitg-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT DELHI
  // ============================================
  {
    id: 'nit-delhi',
    name: 'National Institute of Technology Delhi',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் டெல்லி',
    location: 'Delhi',
    website: 'https://www.nitdelhi.ac.in',
    phone: '011-33861100',
    email: 'registrar@nitdelhi.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#4682B4',
    logo: '/universities/nit-delhi-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitdel-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitdel-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitdel-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitdel-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitdel-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitdel-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitdel-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitdel-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitdel-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitdel-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitdel-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT UTTARAKHAND
  // ============================================
  {
    id: 'nit-uttarakhand',
    name: 'National Institute of Technology Uttarakhand',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் உத்தரகண்ட்',
    location: 'Srinagar, Uttarakhand',
    website: 'https://www.nituk.ac.in',
    phone: '01346-252170',
    email: 'registrar@nituk.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#3CB371',
    logo: '/universities/nit-uttarakhand-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nituk-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nituk-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nituk-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nituk-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nituk-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nituk-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nituk-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nituk-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nituk-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nituk-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nituk-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT MEGHALAYA
  // ============================================
  {
    id: 'nit-meghalaya',
    name: 'National Institute of Technology Meghalaya',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் மேகாலயா',
    location: 'Shillong, Meghalaya',
    website: 'https://www.nitm.ac.in',
    phone: '0364-2501294',
    email: 'registrar@nitm.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#6B8E23',
    logo: '/universities/nit-meghalaya-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitmeg-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitmeg-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitmeg-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitmeg-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitmeg-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitmeg-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitmeg-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitmeg-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitmeg-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitmeg-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitmeg-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT MANIPUR
  // ============================================
  {
    id: 'nit-manipur',
    name: 'National Institute of Technology Manipur',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் மணிப்பூர்',
    location: 'Imphal, Manipur',
    website: 'https://www.nitmanipur.ac.in',
    phone: '0385-2445812',
    email: 'registrar@nitmanipur.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#8B4513',
    logo: '/universities/nit-manipur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitmani-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitmani-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitmani-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitmani-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitmani-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitmani-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitmani-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitmani-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitmani-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitmani-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitmani-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT MIZORAM
  // ============================================
  {
    id: 'nit-mizoram',
    name: 'National Institute of Technology Mizoram',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் மிசோரம்',
    location: 'Aizawl, Mizoram',
    website: 'https://www.nitmz.ac.in',
    phone: '0389-2391236',
    email: 'registrar@nitmz.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#228B22',
    logo: '/universities/nit-mizoram-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitmz-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitmz-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitmz-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitmz-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitmz-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitmz-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitmz-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitmz-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitmz-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitmz-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitmz-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT NAGALAND
  // ============================================
  {
    id: 'nit-nagaland',
    name: 'National Institute of Technology Nagaland',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் நாகாலாந்து',
    location: 'Dimapur, Nagaland',
    website: 'https://www.nitnagaland.ac.in',
    phone: '03862-240156',
    email: 'registrar@nitnagaland.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#2F4F4F',
    logo: '/universities/nit-nagaland-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitnag-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitnag-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitnag-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitnag-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitnag-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitnag-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitnag-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitnag-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitnag-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitnag-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitnag-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT ARUNACHAL PRADESH
  // ============================================
  {
    id: 'nit-arunachal',
    name: 'National Institute of Technology Arunachal Pradesh',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் அருணாச்சல பிரதேசம்',
    location: 'Yupia, Arunachal Pradesh',
    website: 'https://www.nitap.ac.in',
    phone: '0360-2284801',
    email: 'registrar@nitap.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#006633',
    logo: '/universities/nit-arunachal-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitar-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitar-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitar-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitar-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitar-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitar-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitar-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitar-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitar-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitar-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitar-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT SIKKIM
  // ============================================
  {
    id: 'nit-sikkim',
    name: 'National Institute of Technology Sikkim',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் சிக்கிம்',
    location: 'Ravangla, Sikkim',
    website: 'https://www.nitsikkim.ac.in',
    phone: '03595-260042',
    email: 'registrar@nitsikkim.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#4682B4',
    logo: '/universities/nit-sikkim-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitsk-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitsk-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitsk-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitsk-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitsk-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitsk-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitsk-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitsk-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitsk-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitsk-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitsk-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT ANDHRA PRADESH
  // ============================================
  {
    id: 'nit-andhra',
    name: 'National Institute of Technology Andhra Pradesh',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் ஆந்திர பிரதேசம்',
    location: 'Tadepalligudem, Andhra Pradesh',
    website: 'https://www.nitandhra.ac.in',
    phone: '08818-284700',
    email: 'registrar@nitandhra.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#DC143C',
    logo: '/universities/nit-andhra-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitap-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitap-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitap-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitap-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitap-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitap-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitap-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitap-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitap-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitap-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitap-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // NIT PUDUCHERRY
  // ============================================
  {
    id: 'nit-puducherry',
    name: 'National Institute of Technology Puducherry',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம் புதுச்சேரி',
    location: 'Karaikal, Puducherry',
    website: 'https://www.nitpy.ac.in',
    phone: '04368-231126',
    email: 'registrar@nitpy.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#0000CD',
    logo: '/universities/nit-puducherry-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'nitpy-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'nitpy-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'nitpy-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'nitpy-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'nitpy-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'nitpy-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'nitpy-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'nitpy-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'nitpy-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'nitpy-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'nitpy-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // MNIT JAIPUR
  // ============================================
  {
    id: 'mnit-jaipur',
    name: 'Malaviya National Institute of Technology Jaipur',
    nameTamil: 'மாளவியா தேசிய தொழில்நுட்ப நிறுவனம்',
    location: 'Jaipur, Rajasthan',
    website: 'https://www.mnit.ac.in',
    phone: '0141-2713137',
    email: 'registrar@mnit.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#C71585',
    logo: '/universities/mnit-jaipur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026', eventTamil: 'JEE மெயின் 2026', date: 'January/April 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      { id: 'mnit-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Highest demand branch'] },
      { id: 'mnit-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல் தொடர்பு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['VLSI & Telecom'] },
      { id: 'mnit-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணு', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Power sector'] },
      { id: 'mnit-me', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரவியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Manufacturing & Design'] },
      { id: 'mnit-ce', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Infrastructure'] },
      { id: 'mnit-che', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main, 12th PCM', tips: ['Chemical & Pharma'] },
      { id: 'mnit-mtech', name: 'M.Tech - Various Specializations', nameTamil: 'M.Tech - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'GATE qualified', tips: ['PG specializations'] },
      { id: 'mnit-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA கணினி பயன்பாடுகள்', type: 'PG', category: 'On-Campus', school: 'IT', duration: '2 Years', eligibility: 'NIMCET / University Entrance', tips: ['IT industry pathway'] },
      { id: 'mnit-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'CAT/MAT qualified', tips: ['Management programme'] },
      { id: 'mnit-msc', name: 'M.Sc. - Various Sciences', nameTamil: 'M.Sc. - அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Science', duration: '2 Years', eligibility: 'IIT JAM / University Entrance', tips: ['Science programmes'] },
      { id: 'mnit-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. முனைவர் பட்டம்', type: 'PG', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'GATE/NET + Interview', tips: ['Research'] }
    ]
  },

  // ============================================
  // AIIMS DELHI
  // ============================================
  {
    id: 'aiims-delhi',
    name: 'All India Institute of Medical Sciences, New Delhi',
    nameTamil: 'எய்ம்ஸ் டெல்லி',
    location: 'Delhi',
    website: 'https://www.aiims.edu',
    phone: '011-26588500',
    email: 'director@aiims.ac.in',
    examName: 'NEET UG (MBBS) / NEET PG / INI-CET',
    logoColor: '#1E3A8A',
    logo: '/universities/aiims-delhi-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'NEET PG 2026', eventTamil: 'NEET PG 2026', date: 'March 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsd-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['20+ courses', 'Premier medical institute of India', 'Highest ranked medical college'] },
      { id: 'aiimsd-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Top nursing program'] },
      { id: 'aiimsd-md', name: 'MD/MS - Various Specializations', nameTamil: 'MD/MS - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Medical Sciences', duration: '3 Years', eligibility: 'MBBS + INI-CET qualified', tips: ['Super specialty training', 'Research opportunities'] },
      { id: 'aiimsd-phd', name: 'Ph.D. Medical Sciences', nameTamil: 'Ph.D. மருத்துவ அறிவியல்', type: 'Research', category: 'On-Campus', school: 'Research', duration: '3-5 Years', eligibility: 'MD/MS or M.Sc.', tips: ['World-class research facilities'] }
    ]
  },

  // ============================================
  // AIIMS MADURAI
  // ============================================
  {
    id: 'aiims-madurai',
    name: 'All India Institute of Medical Sciences, Madurai',
    nameTamil: 'எய்ம்ஸ் மதுரை',
    location: 'Madurai, Tamil Nadu',
    website: 'https://aiimsmadurai.edu.in',
    phone: '0452-2530001',
    email: 'director@aiimsmadurai.edu.in',
    examName: 'NEET UG (MBBS) / NEET PG',
    logoColor: '#800000',
    logo: '/universities/aiims-madurai-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'NEET PG 2026', eventTamil: 'NEET PG 2026', date: 'March 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsm-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['7+ courses', 'AIIMS in Tamil Nadu', 'Modern infrastructure'] },
      { id: 'aiimsm-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Quality nursing education'] }
    ]
  },

  // ============================================
  // AIIMS BHOPAL
  // ============================================
  {
    id: 'aiims-bhopal',
    name: 'All India Institute of Medical Sciences, Bhopal',
    nameTamil: 'எய்ம்ஸ் போபால்',
    location: 'Bhopal, Madhya Pradesh',
    website: 'https://www.aiimsbhopal.edu.in',
    phone: '0755-2672355',
    email: 'director@aiimsbhopal.edu.in',
    examName: 'NEET UG (MBBS) / NEET PG / INI-CET',
    logoColor: '#006400',
    logo: '/universities/aiims-bhopal-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'NEET PG 2026', eventTamil: 'NEET PG 2026', date: 'March 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsb-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['15+ courses', 'First new AIIMS (2012)', 'Well-established'] },
      { id: 'aiimsb-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Quality nursing program'] },
      { id: 'aiimsb-md', name: 'MD/MS - Various Specializations', nameTamil: 'MD/MS - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Medical Sciences', duration: '3 Years', eligibility: 'MBBS + INI-CET qualified', tips: ['Good PG programs'] }
    ]
  },

  // ============================================
  // AIIMS JODHPUR
  // ============================================
  {
    id: 'aiims-jodhpur',
    name: 'All India Institute of Medical Sciences, Jodhpur',
    nameTamil: 'எய்ம்ஸ் ஜோத்பூர்',
    location: 'Jodhpur, Rajasthan',
    website: 'https://www.aiimsjodhpur.edu.in',
    phone: '0291-2740741',
    email: 'director@aiimsjodhpur.edu.in',
    examName: 'NEET UG (MBBS) / NEET PG / INI-CET',
    logoColor: '#B8860B',
    logo: '/universities/aiims-jodhpur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'NEET PG 2026', eventTamil: 'NEET PG 2026', date: 'March 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsj-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['15+ courses', 'Blue City location', 'Modern facilities'] },
      { id: 'aiimsj-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Quality nursing education'] },
      { id: 'aiimsj-md', name: 'MD/MS - Various Specializations', nameTamil: 'MD/MS - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Medical Sciences', duration: '3 Years', eligibility: 'MBBS + INI-CET qualified', tips: ['Strong PG programs'] }
    ]
  },

  // ============================================
  // AIIMS PATNA
  // ============================================
  {
    id: 'aiims-patna',
    name: 'All India Institute of Medical Sciences, Patna',
    nameTamil: 'எய்ம்ஸ் பாட்னா',
    location: 'Patna, Bihar',
    website: 'https://www.aiimspatna.edu.in',
    phone: '0612-2451070',
    email: 'director@aiimspatna.edu.in',
    examName: 'NEET UG (MBBS) / NEET PG / INI-CET',
    logoColor: '#8B0000',
    logo: '/universities/aiims-patna-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'NEET PG 2026', eventTamil: 'NEET PG 2026', date: 'March 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsp-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['15+ courses', 'Bihar state capital', 'Growing institute'] },
      { id: 'aiimsp-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Quality nursing program'] },
      { id: 'aiimsp-md', name: 'MD/MS - Various Specializations', nameTamil: 'MD/MS - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Medical Sciences', duration: '3 Years', eligibility: 'MBBS + INI-CET qualified', tips: ['Good specialty programs'] }
    ]
  },

  // ============================================
  // AIIMS RAIPUR
  // ============================================
  {
    id: 'aiims-raipur',
    name: 'All India Institute of Medical Sciences, Raipur',
    nameTamil: 'எய்ம்ஸ் ராய்பூர்',
    location: 'Raipur, Chhattisgarh',
    website: 'https://www.aiimsraipur.edu.in',
    phone: '0771-2577200',
    email: 'director@aiimsraipur.edu.in',
    examName: 'NEET UG (MBBS) / NEET PG / INI-CET',
    logoColor: '#2E8B57',
    logo: '/universities/aiims-raipur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'NEET PG 2026', eventTamil: 'NEET PG 2026', date: 'March 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsr-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['15+ courses', 'Central India location', 'Modern campus'] },
      { id: 'aiimsr-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Quality nursing education'] },
      { id: 'aiimsr-md', name: 'MD/MS - Various Specializations', nameTamil: 'MD/MS - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Medical Sciences', duration: '3 Years', eligibility: 'MBBS + INI-CET qualified', tips: ['Strong PG programs'] }
    ]
  },

  // ============================================
  // AIIMS RISHIKESH
  // ============================================
  {
    id: 'aiims-rishikesh',
    name: 'All India Institute of Medical Sciences, Rishikesh',
    nameTamil: 'எய்ம்ஸ் ரிஷிகேஷ்',
    location: 'Rishikesh, Uttarakhand',
    website: 'https://www.aiimsrishikesh.edu.in',
    phone: '0135-2460929',
    email: 'director@aiimsrishikesh.edu.in',
    examName: 'NEET UG (MBBS) / NEET PG / INI-CET',
    logoColor: '#4682B4',
    logo: '/universities/aiims-rishikesh-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'NEET PG 2026', eventTamil: 'NEET PG 2026', date: 'March 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsrk-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['15+ courses', 'Yoga capital of world', 'Himalayan location'] },
      { id: 'aiimsrk-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Scenic location'] },
      { id: 'aiimsrk-md', name: 'MD/MS - Various Specializations', nameTamil: 'MD/MS - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Medical Sciences', duration: '3 Years', eligibility: 'MBBS + INI-CET qualified', tips: ['Good PG programs'] }
    ]
  },

  // ============================================
  // AIIMS BHUBANESWAR
  // ============================================
  {
    id: 'aiims-bhubaneswar',
    name: 'All India Institute of Medical Sciences, Bhubaneswar',
    nameTamil: 'எய்ம்ஸ் புவனேஸ்வர்',
    location: 'Bhubaneswar, Odisha',
    website: 'https://www.aiimsbhubaneswar.nic.in',
    phone: '0674-2476789',
    email: 'director@aiimsbhubaneswar.edu.in',
    examName: 'NEET UG (MBBS) / NEET PG / INI-CET',
    logoColor: '#DC143C',
    logo: '/universities/aiims-bhubaneswar-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'NEET PG 2026', eventTamil: 'NEET PG 2026', date: 'March 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsbb-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['15+ courses', 'Temple city', 'Strong hospital'] },
      { id: 'aiimsbb-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Quality nursing program'] },
      { id: 'aiimsbb-md', name: 'MD/MS - Various Specializations', nameTamil: 'MD/MS - பல்வேறு சிறப்புகள்', type: 'PG', category: 'On-Campus', school: 'Medical Sciences', duration: '3 Years', eligibility: 'MBBS + INI-CET qualified', tips: ['Growing PG programs'] }
    ]
  },

  // ============================================
  // AIIMS MANGALAGIRI
  // ============================================
  {
    id: 'aiims-mangalagiri',
    name: 'All India Institute of Medical Sciences, Mangalagiri',
    nameTamil: 'எய்ம்ஸ் மங்களகிரி',
    location: 'Mangalagiri, Andhra Pradesh',
    website: 'https://www.aiimsmangalagiri.edu.in',
    phone: '0863-2287800',
    email: 'director@aiimsmangalagiri.edu.in',
    examName: 'NEET UG (MBBS) / NEET PG',
    logoColor: '#228B22',
    logo: '/universities/aiims-mangalagiri-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'NEET PG 2026', eventTamil: 'NEET PG 2026', date: 'March 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsmg-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['10+ courses', 'Near Amaravati', 'Modern infrastructure'] },
      { id: 'aiimsmg-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Quality nursing education'] }
    ]
  },

  // ============================================
  // AIIMS NAGPUR
  // ============================================
  {
    id: 'aiims-nagpur',
    name: 'All India Institute of Medical Sciences, Nagpur',
    nameTamil: 'எய்ம்ஸ் நாக்பூர்',
    location: 'Nagpur, Maharashtra',
    website: 'https://www.aiimsnagpur.edu.in',
    phone: '0712-2296600',
    email: 'director@aiimsnagpur.edu.in',
    examName: 'NEET UG (MBBS) / NEET PG',
    logoColor: '#FF6347',
    logo: '/universities/aiims-nagpur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'NEET PG 2026', eventTamil: 'NEET PG 2026', date: 'March 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsng-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['10+ courses', 'Orange city', 'Central India hub'] },
      { id: 'aiimsng-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Quality nursing program'] }
    ]
  },

  // ============================================
  // AIIMS GORAKHPUR
  // ============================================
  {
    id: 'aiims-gorakhpur',
    name: 'All India Institute of Medical Sciences, Gorakhpur',
    nameTamil: 'எய்ம்ஸ் கோரக்பூர்',
    location: 'Gorakhpur, Uttar Pradesh',
    website: 'https://www.aiimsgorakhpur.edu.in',
    phone: '0551-2500200',
    email: 'director@aiimsgorakhpur.edu.in',
    examName: 'NEET UG (MBBS)',
    logoColor: '#8B4513',
    logo: '/universities/aiims-gorakhpur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsgk-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['8+ courses', 'Eastern UP location', 'New AIIMS'] },
      { id: 'aiimsgk-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Growing program'] }
    ]
  },

  // ============================================
  // AIIMS BATHINDA
  // ============================================
  {
    id: 'aiims-bathinda',
    name: 'All India Institute of Medical Sciences, Bathinda',
    nameTamil: 'எய்ம்ஸ் பதிண்டா',
    location: 'Bathinda, Punjab',
    website: 'https://www.aiimsbathinda.edu.in',
    phone: '0164-2880001',
    email: 'director@aiimsbathinda.edu.in',
    examName: 'NEET UG (MBBS)',
    logoColor: '#DC143C',
    logo: '/universities/aiims-bathinda-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsbth-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['8+ courses', 'Punjab location', 'New AIIMS'] },
      { id: 'aiimsbth-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Growing program'] }
    ]
  },

  // ============================================
  // AIIMS RAEBARELI
  // ============================================
  {
    id: 'aiims-raebareli',
    name: 'All India Institute of Medical Sciences, Raebareli',
    nameTamil: 'எய்ம்ஸ் ராய்பரேலி',
    location: 'Raebareli, Uttar Pradesh',
    website: 'https://www.aiimsraebareli.edu.in',
    phone: '0535-2700001',
    email: 'director@aiimsraebareli.edu.in',
    examName: 'NEET UG (MBBS)',
    logoColor: '#4682B4',
    logo: '/universities/aiims-raebareli-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsrb-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['8+ courses', 'UP location', 'New AIIMS'] },
      { id: 'aiimsrb-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Growing program'] }
    ]
  },

  // ============================================
  // AIIMS KALYANI
  // ============================================
  {
    id: 'aiims-kalyani',
    name: 'All India Institute of Medical Sciences, Kalyani',
    nameTamil: 'எய்ம்ஸ் கல்யாணி',
    location: 'Kalyani, West Bengal',
    website: 'https://www.aiimskalyani.edu.in',
    phone: '033-2582-2100',
    email: 'director@aiimskalyani.edu.in',
    examName: 'NEET UG (MBBS)',
    logoColor: '#006400',
    logo: '/universities/aiims-kalyani-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimskal-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['8+ courses', 'Near Kolkata', 'New AIIMS'] },
      { id: 'aiimskal-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Growing program'] }
    ]
  },

  // ============================================
  // AIIMS DEOGHAR
  // ============================================
  {
    id: 'aiims-deoghar',
    name: 'All India Institute of Medical Sciences, Deoghar',
    nameTamil: 'எய்ம்ஸ் தேவ்கர்',
    location: 'Deoghar, Jharkhand',
    website: 'https://www.aiimsdeoghar.edu.in',
    phone: '06432-250001',
    email: 'director@aiimsdeoghar.edu.in',
    examName: 'NEET UG (MBBS)',
    logoColor: '#8B0000',
    logo: '/universities/aiims-deoghar-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsdg-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['5+ courses', 'Temple town', 'New AIIMS'] },
      { id: 'aiimsdg-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Developing program'] }
    ]
  },

  // ============================================
  // AIIMS BILASPUR
  // ============================================
  {
    id: 'aiims-bilaspur',
    name: 'All India Institute of Medical Sciences, Bilaspur',
    nameTamil: 'எய்ம்ஸ் பிலாஸ்பூர்',
    location: 'Bilaspur, Himachal Pradesh',
    website: 'https://www.aiimsbilaspur.edu.in',
    phone: '01978-250001',
    email: 'director@aiimsbilaspur.edu.in',
    examName: 'NEET UG (MBBS)',
    logoColor: '#4169E1',
    logo: '/universities/aiims-bilaspur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsbp-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['5+ courses', 'Hill state', 'Scenic location'] },
      { id: 'aiimsbp-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Developing program'] }
    ]
  },

  // ============================================
  // AIIMS GUWAHATI
  // ============================================
  {
    id: 'aiims-guwahati',
    name: 'All India Institute of Medical Sciences, Guwahati',
    nameTamil: 'எய்ம்ஸ் குவாஹாட்டி',
    location: 'Guwahati, Assam',
    website: 'https://www.aiimsguwahati.ac.in',
    phone: '0361-2680001',
    email: 'director@aiimsguwahati.ac.in',
    examName: 'NEET UG (MBBS)',
    logoColor: '#228B22',
    logo: '/universities/aiims-guwahati-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsgw-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['5+ courses', 'Northeast hub', 'New AIIMS'] },
      { id: 'aiimsgw-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Developing program'] }
    ]
  },

  // ============================================
  // AIIMS RAJKOT
  // ============================================
  {
    id: 'aiims-rajkot',
    name: 'All India Institute of Medical Sciences, Rajkot',
    nameTamil: 'எய்ம்ஸ் ராஜ்கோட்',
    location: 'Rajkot, Gujarat',
    website: 'https://www.aiimsrajkot.edu.in',
    phone: '0281-2580001',
    email: 'director@aiimsrajkot.edu.in',
    examName: 'NEET UG (MBBS)',
    logoColor: '#FF8C00',
    logo: '/universities/aiims-rajkot-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsrj-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['5+ courses', 'Saurashtra region', 'New AIIMS'] },
      { id: 'aiimsrj-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Developing program'] }
    ]
  },

  // ============================================
  // AIIMS BIBINAGAR
  // ============================================
  {
    id: 'aiims-bibinagar',
    name: 'All India Institute of Medical Sciences, Bibinagar',
    nameTamil: 'எய்ம்ஸ் பிபிநகர்',
    location: 'Bibinagar, Telangana',
    website: 'https://www.aiimsbibinagar.edu.in',
    phone: '08685-250001',
    email: 'director@aiimsbibinagar.edu.in',
    examName: 'NEET UG (MBBS)',
    logoColor: '#DC143C',
    logo: '/universities/aiims-bibinagar-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsbbn-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['5+ courses', 'Near Hyderabad', 'New AIIMS'] },
      { id: 'aiimsbbn-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Developing program'] }
    ]
  },

  // ============================================
  // AIIMS JAMMU
  // ============================================
  {
    id: 'aiims-jammu',
    name: 'All India Institute of Medical Sciences, Jammu',
    nameTamil: 'எய்ம்ஸ் ஜம்மு',
    location: 'Jammu, J&K',
    website: 'https://www.aiimsjammu.edu.in',
    phone: '0191-2580001',
    email: 'director@aiimsjammu.edu.in',
    examName: 'NEET UG (MBBS)',
    logoColor: '#006633',
    logo: '/universities/aiims-jammu-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsjm-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['5+ courses', 'Gateway to Kashmir', 'New AIIMS'] },
      { id: 'aiimsjm-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Developing program'] }
    ]
  },

  // ============================================
  // AIIMS DARBHANGA
  // ============================================
  {
    id: 'aiims-darbhanga',
    name: 'All India Institute of Medical Sciences, Darbhanga',
    nameTamil: 'எய்ம்ஸ் தர்பங்கா',
    location: 'Darbhanga, Bihar',
    website: 'https://www.aiimsdarbhanga.edu.in',
    phone: '06272-250001',
    email: 'director@aiimsdarbhanga.edu.in',
    examName: 'NEET UG (MBBS)',
    logoColor: '#B22222',
    logo: '/universities/aiims-darbhanga-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsdb-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['5+ courses', 'Mithila region', 'New AIIMS'] },
      { id: 'aiimsdb-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Developing program'] }
    ]
  },

  // ============================================
  // AIIMS REWARI
  // ============================================
  {
    id: 'aiims-rewari',
    name: 'All India Institute of Medical Sciences, Rewari',
    nameTamil: 'எய்ம்ஸ் ரேவாரி',
    location: 'Rewari, Haryana',
    website: 'https://www.aiimsrewari.edu.in',
    phone: '01274-250001',
    email: 'director@aiimsrewari.edu.in',
    examName: 'NEET UG (MBBS)',
    logoColor: '#2F4F4F',
    logo: '/universities/aiims-rewari-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsrw-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['5+ courses', 'Near Delhi NCR', 'New AIIMS'] },
      { id: 'aiimsrw-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Developing program'] }
    ]
  },

  // ============================================
  // JIPMER PUDUCHERRY
  // ============================================

  // ============================================
  // INDIAN INSTITUTES OF MANAGEMENT (IIMs)
  // ============================================

  // IIM AHMEDABAD
  {
    id: 'iim-ahmedabad',
    name: 'Indian Institute of Management Ahmedabad',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் அகமதாபாத்',
    location: 'Ahmedabad, Gujarat',
    website: 'https://www.iima.ac.in',
    phone: '079-66324600',
    email: 'admissions@iima.ac.in',
    examName: 'CAT (MBA) / GMAT (Executive Programs)',
    logoColor: '#1E3A8A',
    logo: '/universities/iim-ahmedabad-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Registration', eventTamil: 'CAT 2026 பதிவு', date: 'August 2026', status: 'upcoming' },
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' },
      { event: 'IIM Interviews', eventTamil: 'IIM நேர்முகத்தேர்வு', date: 'February-March 2026', status: 'upcoming' }
    ],
    fee: { general: 2500000, obc: 2500000, scst: 1250000 },
    courses: [
      { id: 'iima-pgp', name: 'PGP (Post Graduate Programme in Management)', nameTamil: 'PGP மேலாண்மை முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['10+ courses', 'Ranked #1 B-School in India', 'Highest placement packages', 'Top recruiters: McKinsey, BCG, Goldman Sachs'] },
      { id: 'iima-pgpx', name: 'PGPX (One Year MBA)', nameTamil: 'PGPX (ஒரு வருட MBA)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '1 Year', eligibility: 'Graduation + GMAT + 5+ years work exp', tips: ['For senior professionals', 'Global MBA network'] },
      { id: 'iima-fabm', name: 'PGP-FABM (Food & Agribusiness Management)', nameTamil: 'PGP-FABM (உணவு & விவசாய வணிக மேலாண்மை)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['Specialized in agribusiness', 'Industry partnerships'] },
      { id: 'iima-phd', name: 'Ph.D. (Fellow Programme in Management)', nameTamil: 'Ph.D. (FPM)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation + CAT/GMAT', tips: ['Doctoral research in management', 'Fellowship provided'] }
    ]
  },

  // IIM BANGALORE
  {
    id: 'iim-bangalore',
    name: 'Indian Institute of Management Bangalore',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் பெங்களூர்',
    location: 'Bangalore, Karnataka',
    website: 'https://www.iimb.ac.in',
    phone: '080-26993000',
    email: 'admission@iimb.ac.in',
    examName: 'CAT (MBA) / GMAT (Executive Programs)',
    logoColor: '#003366',
    logo: '/universities/iim-bangalore-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' },
      { event: 'IIMB Selection Process', eventTamil: 'IIMB தேர்வு செயல்முறை', date: 'February-March 2026', status: 'upcoming' }
    ],
    fee: { general: 2500000, obc: 2500000, scst: 1250000 },
    courses: [
      { id: 'iimb-pgp', name: 'PGP (Post Graduate Programme in Management)', nameTamil: 'PGP மேலாண்மை முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['10+ courses', 'Strong analytics focus', 'Tech startup ecosystem in Bangalore'] },
      { id: 'iimb-pgpba', name: 'PGP in Business Analytics', nameTamil: 'PGP வணிக பகுப்பாய்வு', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['Data science + management', 'Industry-focused curriculum'] },
      { id: 'iimb-epgp', name: 'EPGP (Executive PGP)', nameTamil: 'EPGP (நிர்வாக PGP)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '1 Year', eligibility: 'Graduation + GMAT + 5+ years exp', tips: ['For working professionals'] },
      { id: 'iimb-phd', name: 'Ph.D. (Doctoral Programme)', nameTamil: 'Ph.D. (முனைவர் பட்டம்)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation + CAT/GMAT', tips: ['Research excellence'] }
    ]
  },

  // IIM CALCUTTA
  {
    id: 'iim-calcutta',
    name: 'Indian Institute of Management Calcutta',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் கொல்கத்தா',
    location: 'Kolkata, West Bengal',
    website: 'https://www.iimcal.ac.in',
    phone: '033-24678300',
    email: 'pgpadmission@iimcal.ac.in',
    examName: 'CAT (MBA) / GMAT (Executive Programs)',
    logoColor: '#8B0000',
    logo: '/universities/iim-calcutta-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' },
      { event: 'IIMC Selection Process', eventTamil: 'IIMC தேர்வு செயல்முறை', date: 'February-March 2026', status: 'upcoming' }
    ],
    fee: { general: 2500000, obc: 2500000, scst: 1250000 },
    courses: [
      { id: 'iimc-pgp', name: 'PGP (Post Graduate Programme)', nameTamil: 'PGP முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['10+ courses', 'First IIM established (1961)', 'Strong finance placements'] },
      { id: 'iimc-pgdm', name: 'PGDM (Executive)', nameTamil: 'PGDM (நிர்வாக)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '1 Year', eligibility: 'Graduation + GMAT + work exp', tips: ['For working executives'] },
      { id: 'iimc-mba', name: 'MBA (Evening Programme)', nameTamil: 'MBA (மாலை நேர பட்டம்)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '3 Years', eligibility: 'Graduation + work exp', tips: ['For Kolkata-based professionals'] },
      { id: 'iimc-phd', name: 'Ph.D. (Fellow Programme)', nameTamil: 'Ph.D. (FPM)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation + CAT/GMAT', tips: ['Doctoral research'] }
    ]
  },

  // IIM LUCKNOW
  {
    id: 'iim-lucknow',
    name: 'Indian Institute of Management Lucknow',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் லக்னோ',
    location: 'Lucknow, Uttar Pradesh',
    website: 'https://www.iiml.ac.in',
    phone: '0522-2734101',
    email: 'pgpadmissions@iiml.ac.in',
    examName: 'CAT (MBA)',
    logoColor: '#003366',
    logo: '/universities/iim-lucknow-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' },
      { event: 'IIML Selection Process', eventTamil: 'IIML தேர்வு செயல்முறை', date: 'February-March 2026', status: 'upcoming' }
    ],
    fee: { general: 2200000, obc: 2200000, scst: 1100000 },
    courses: [
      { id: 'iiml-pgp', name: 'PGP (Post Graduate Programme)', nameTamil: 'PGP முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['8+ courses', 'Consistent top 5 B-School', 'Strong alumni network'] },
      { id: 'iiml-pgp-abm', name: 'PGP-ABM (Agri-Business Management)', nameTamil: 'PGP-ABM (விவசாய வணிக மேலாண்மை)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['Agribusiness specialization'] },
      { id: 'iiml-pgp-sm', name: 'PGP-SM (Sustainable Management)', nameTamil: 'PGP-SM (நிலையான மேலாண்மை)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['Focus on sustainability'] },
      { id: 'iiml-phd', name: 'Ph.D. (Fellow Programme)', nameTamil: 'Ph.D. (FPM)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation + CAT/GMAT', tips: ['Doctoral research'] }
    ]
  },

  // IIM KOZHIKODE
  {
    id: 'iim-kozhikode',
    name: 'Indian Institute of Management Kozhikode',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் கோழிக்கோடு',
    location: 'Kozhikode, Kerala',
    website: 'https://www.iimk.ac.in',
    phone: '0495-2809100',
    email: 'admissions@iimk.ac.in',
    examName: 'CAT (MBA)',
    logoColor: '#006633',
    logo: '/universities/iim-kozhikode-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' },
      { event: 'IIMK Selection Process', eventTamil: 'IIMK தேர்வு செயல்முறை', date: 'February-March 2026', status: 'upcoming' }
    ],
    fee: { general: 2200000, obc: 2200000, scst: 1100000 },
    courses: [
      { id: 'iimk-pgp', name: 'PGP (Post Graduate Programme)', nameTamil: 'PGP முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['8+ courses', 'God\'s Own Campus - scenic location', 'Strong in consulting placements'] },
      { id: 'iimk-pgp-bl', name: 'PGP-BL (Business Leadership)', nameTamil: 'PGP-BL (வணிக தலைமை)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT + work exp', tips: ['Leadership focus program'] },
      { id: 'iimk-pgp-f', name: 'PGP-F (Finance)', nameTamil: 'PGP-F (நிதி)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '1 Year', eligibility: 'CA/CFA/Graduation + work exp', tips: ['Specialized finance program'] },
      { id: 'iimk-phd', name: 'Ph.D. (Fellow Programme)', nameTamil: 'Ph.D. (FPM)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation + CAT/GMAT', tips: ['Doctoral research'] }
    ]
  },

  // IIM INDORE
  {
    id: 'iim-indore',
    name: 'Indian Institute of Management Indore',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் இந்தோர்',
    location: 'Indore, Madhya Pradesh',
    website: 'https://www.iimidr.ac.in',
    phone: '0731-2439500',
    email: 'pgpadmissions@iimidr.ac.in',
    examName: 'CAT (MBA) / IPMAT (IPM)',
    logoColor: '#8B4513',
    logo: '/universities/iim-indore-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'IPMAT 2026 Registration', eventTamil: 'IPMAT 2026 பதிவு', date: 'March 2026', status: 'upcoming' },
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' }
    ],
    fee: { general: 2100000, obc: 2100000, scst: 1050000 },
    courses: [
      { id: 'iimi-pgp', name: 'PGP (Post Graduate Programme)', nameTamil: 'PGP முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['8+ courses', 'Known for IPM program', 'Dual campus (Indore + Mumbai)'] },
      { id: 'iimi-ipm', name: 'IPM (Integrated Programme in Management)', nameTamil: 'IPM (ஒருங்கிணைந்த மேலாண்மை பட்டம்)', type: 'Integrated', category: 'On-Campus', school: 'Management', duration: '5 Years', eligibility: '12th Pass + IPMAT qualified', tips: ['After 12th entry to IIM', 'BA + MBA integrated'] },
      { id: 'iimi-epgp', name: 'EPGP (Executive PGP)', nameTamil: 'EPGP (நிர்வாக PGP)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '1 Year', eligibility: 'Graduation + work exp', tips: ['For working professionals'] },
      { id: 'iimi-phd', name: 'Ph.D. (Fellow Programme)', nameTamil: 'Ph.D. (FPM)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation + CAT/GMAT', tips: ['Doctoral research'] }
    ]
  },

  // IIM SHILLONG
  {
    id: 'iim-shillong',
    name: 'Indian Institute of Management Shillong',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் ஷில்லாங்',
    location: 'Shillong, Meghalaya',
    website: 'https://www.iimshillong.ac.in',
    phone: '0364-2308000',
    email: 'admissions@iimshillong.ac.in',
    examName: 'CAT (MBA)',
    logoColor: '#2E8B57',
    logo: '/universities/iim-shillong-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' }
    ],
    fee: { general: 1800000, obc: 1800000, scst: 900000 },
    courses: [
      { id: 'iims-pgp', name: 'PGP (Post Graduate Programme)', nameTamil: 'PGP முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['5+ courses', 'Scotland of the East', 'Sustainability focus'] },
      { id: 'iims-pgpex', name: 'PGPEX (Executive)', nameTamil: 'PGPEX (நிர்வாக)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '1 Year', eligibility: 'Graduation + work exp', tips: ['For working professionals'] },
      { id: 'iims-phd', name: 'Ph.D. (Doctoral Programme)', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation', tips: ['Research program'] }
    ]
  },

  // IIM RANCHI
  {
    id: 'iim-ranchi',
    name: 'Indian Institute of Management Ranchi',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் ராஞ்சி',
    location: 'Ranchi, Jharkhand',
    website: 'https://www.iimranchi.ac.in',
    phone: '0651-2280111',
    email: 'admissions@iimranchi.ac.in',
    examName: 'CAT (MBA)',
    logoColor: '#4B0082',
    logo: '/universities/iim-ranchi-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' }
    ],
    fee: { general: 1800000, obc: 1800000, scst: 900000 },
    courses: [
      { id: 'iimr-pgdhrm', name: 'PGDHRM (HR Management)', nameTamil: 'PGDHRM (மனிதவள மேலாண்மை)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['5+ courses', 'Specialized HR program', 'Strong HR placements'] },
      { id: 'iimr-pgdm', name: 'PGDM (General Management)', nameTamil: 'PGDM (பொது மேலாண்மை)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['General management program'] },
      { id: 'iimr-phd', name: 'Ph.D. (Doctoral Programme)', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation', tips: ['Research program'] }
    ]
  },

  // IIM RAIPUR
  {
    id: 'iim-raipur',
    name: 'Indian Institute of Management Raipur',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் ராய்பூர்',
    location: 'Raipur, Chhattisgarh',
    website: 'https://www.iimraipur.ac.in',
    phone: '0771-2474700',
    email: 'admissions@iimraipur.ac.in',
    examName: 'CAT (MBA)',
    logoColor: '#FF6600',
    logo: '/universities/iim-raipur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' }
    ],
    fee: { general: 1600000, obc: 1600000, scst: 800000 },
    courses: [
      { id: 'iimrai-pgp', name: 'PGP (Post Graduate Programme)', nameTamil: 'PGP முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['5+ courses', 'Growing reputation', 'Good placement record'] },
      { id: 'iimrai-pgpwe', name: 'PGPWE (Working Executives)', nameTamil: 'PGPWE (பணிபுரியும் நிர்வாகிகள்)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + work exp', tips: ['Weekend program'] },
      { id: 'iimrai-phd', name: 'Ph.D. (Doctoral Programme)', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation', tips: ['Research program'] }
    ]
  },

  // IIM ROHTAK
  {
    id: 'iim-rohtak',
    name: 'Indian Institute of Management Rohtak',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் ரோஹ்தக்',
    location: 'Rohtak, Haryana',
    website: 'https://www.iimrohtak.ac.in',
    phone: '01onal-274780',
    email: 'admissions@iimrohtak.ac.in',
    examName: 'CAT (MBA) / IPMAT (IPM)',
    logoColor: '#800000',
    logo: '/universities/iim-rohtak-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' },
      { event: 'IPMAT 2026', eventTamil: 'IPMAT 2026', date: 'May 2026', status: 'upcoming' }
    ],
    fee: { general: 1700000, obc: 1700000, scst: 850000 },
    courses: [
      { id: 'iimro-pgp', name: 'PGP (Post Graduate Programme)', nameTamil: 'PGP முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['5+ courses', 'Near Delhi NCR', 'IPM program available'] },
      { id: 'iimro-ipm', name: 'IPM (Integrated Programme)', nameTamil: 'IPM (ஒருங்கிணைந்த பட்டம்)', type: 'Integrated', category: 'On-Campus', school: 'Management', duration: '5 Years', eligibility: '12th Pass + IPMAT', tips: ['After 12th entry'] },
      { id: 'iimro-epgp', name: 'EPGP (Executive PGP)', nameTamil: 'EPGP', type: 'PG', category: 'On-Campus', school: 'Management', duration: '1 Year', eligibility: 'Graduation + work exp', tips: ['Executive program'] },
      { id: 'iimro-phd', name: 'Ph.D. (Doctoral Programme)', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation', tips: ['Research program'] }
    ]
  },

  // IIM KASHIPUR
  {
    id: 'iim-kashipur',
    name: 'Indian Institute of Management Kashipur',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் காசிபூர்',
    location: 'Kashipur, Uttarakhand',
    website: 'https://www.iimkashipur.ac.in',
    phone: '05947-262111',
    email: 'admissions@iimkashipur.ac.in',
    examName: 'CAT (MBA)',
    logoColor: '#006400',
    logo: '/universities/iim-kashipur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' }
    ],
    fee: { general: 1700000, obc: 1700000, scst: 850000 },
    courses: [
      { id: 'iimk-pgp', name: 'PGP (Post Graduate Programme)', nameTamil: 'PGP முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['5+ courses', 'Near Jim Corbett Park', 'Scenic Himalayan foothills'] },
      { id: 'iimk-mba-a', name: 'MBA (Analytics)', nameTamil: 'MBA (பகுப்பாய்வு)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['Analytics specialization'] },
      { id: 'iimk-phd', name: 'Ph.D. (Doctoral Programme)', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation', tips: ['Research program'] }
    ]
  },

  // IIM UDAIPUR
  {
    id: 'iim-udaipur',
    name: 'Indian Institute of Management Udaipur',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் உதய்பூர்',
    location: 'Udaipur, Rajasthan',
    website: 'https://www.iimu.ac.in',
    phone: '0294-2477100',
    email: 'admissions@iimu.ac.in',
    examName: 'CAT (MBA)',
    logoColor: '#4169E1',
    logo: '/universities/iim-udaipur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' }
    ],
    fee: { general: 1900000, obc: 1900000, scst: 950000 },
    courses: [
      { id: 'iimu-pgp', name: 'PGP (Post Graduate Programme)', nameTamil: 'PGP முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['5+ courses', 'City of Lakes', 'Global accreditations'] },
      { id: 'iimu-pgpx', name: 'PGPX (One Year MBA)', nameTamil: 'PGPX', type: 'PG', category: 'On-Campus', school: 'Management', duration: '1 Year', eligibility: 'Graduation + work exp', tips: ['Executive MBA'] },
      { id: 'iimu-phd', name: 'Ph.D. (Doctoral Programme)', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation', tips: ['Research program'] }
    ]
  },

  // IIM NAGPUR
  {
    id: 'iim-nagpur',
    name: 'Indian Institute of Management Nagpur',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் நாக்பூர்',
    location: 'Nagpur, Maharashtra',
    website: 'https://www.iimnagpur.ac.in',
    phone: '0712-2806444',
    email: 'admissions@iimnagpur.ac.in',
    examName: 'CAT (MBA)',
    logoColor: '#FF4500',
    logo: '/universities/iim-nagpur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' }
    ],
    fee: { general: 1600000, obc: 1600000, scst: 800000 },
    courses: [
      { id: 'iimn-pgp', name: 'PGP (Post Graduate Programme)', nameTamil: 'PGP முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['5+ courses', 'Orange City', 'Mentored by IIM Ahmedabad'] },
      { id: 'iimn-phd', name: 'Ph.D. (Doctoral Programme)', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation', tips: ['Research program'] }
    ]
  },

  // IIM VISAKHAPATNAM
  {
    id: 'iim-visakhapatnam',
    name: 'Indian Institute of Management Visakhapatnam',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் விசாகப்பட்டினம்',
    location: 'Visakhapatnam, Andhra Pradesh',
    website: 'https://www.iimv.ac.in',
    phone: '0891-2868100',
    email: 'admissions@iimv.ac.in',
    examName: 'CAT (MBA)',
    logoColor: '#0066CC',
    logo: '/universities/iim-visakhapatnam-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' }
    ],
    fee: { general: 1600000, obc: 1600000, scst: 800000 },
    courses: [
      { id: 'iimv-pgp', name: 'PGP (Post Graduate Programme)', nameTamil: 'PGP முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['5+ courses', 'Port city', 'Mentored by IIM Bangalore'] },
      { id: 'iimv-phd', name: 'Ph.D. (Doctoral Programme)', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation', tips: ['Research program'] }
    ]
  },

  // IIM BODH GAYA
  {
    id: 'iim-bodhgaya',
    name: 'Indian Institute of Management Bodh Gaya',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் போத் கயா',
    location: 'Bodh Gaya, Bihar',
    website: 'https://www.iimbg.ac.in',
    phone: '0631-2200567',
    email: 'admissions@iimbg.ac.in',
    examName: 'CAT (MBA)',
    logoColor: '#DAA520',
    logo: '/universities/iim-bodhgaya-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' }
    ],
    fee: { general: 1500000, obc: 1500000, scst: 750000 },
    courses: [
      { id: 'iimbg-pgp', name: 'PGP (Post Graduate Programme)', nameTamil: 'PGP முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['5+ courses', 'Buddhist heritage site', 'Mentored by IIM Calcutta'] },
      { id: 'iimbg-phd', name: 'Ph.D. (Doctoral Programme)', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation', tips: ['Research program'] }
    ]
  },

  // IIM AMRITSAR
  {
    id: 'iim-amritsar',
    name: 'Indian Institute of Management Amritsar',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் அமிர்தசரஸ்',
    location: 'Amritsar, Punjab',
    website: 'https://www.iimamritsar.ac.in',
    phone: '0183-2546100',
    email: 'admissions@iimamritsar.ac.in',
    examName: 'CAT (MBA)',
    logoColor: '#FF6347',
    logo: '/universities/iim-amritsar-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' }
    ],
    fee: { general: 1500000, obc: 1500000, scst: 750000 },
    courses: [
      { id: 'iima-pgp', name: 'PGP (Post Graduate Programme)', nameTamil: 'PGP முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['5+ courses', 'Near Golden Temple', 'Mentored by IIM Kozhikode'] },
      { id: 'iima-mba-ba', name: 'MBA (Business Analytics)', nameTamil: 'MBA (வணிக பகுப்பாய்வு)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['Analytics focus'] },
      { id: 'iima-phd', name: 'Ph.D. (Doctoral Programme)', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation', tips: ['Research program'] }
    ]
  },

  // IIM SAMBALPUR
  {
    id: 'iim-sambalpur',
    name: 'Indian Institute of Management Sambalpur',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் சம்பல்பூர்',
    location: 'Sambalpur, Odisha',
    website: 'https://www.iimsambalpur.ac.in',
    phone: '0663-2430567',
    email: 'admissions@iimsambalpur.ac.in',
    examName: 'CAT (MBA)',
    logoColor: '#228B22',
    logo: '/universities/iim-sambalpur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' }
    ],
    fee: { general: 1500000, obc: 1500000, scst: 750000 },
    courses: [
      { id: 'iimsam-pgp', name: 'PGP (Post Graduate Programme)', nameTamil: 'PGP முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['5+ courses', 'Scenic Sambalpur', 'Mentored by IIM Indore'] },
      { id: 'iimsam-phd', name: 'Ph.D. (Doctoral Programme)', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation', tips: ['Research program'] }
    ]
  },

  // IIM SIRMAUR
  {
    id: 'iim-sirmaur',
    name: 'Indian Institute of Management Sirmaur',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் சிர்மௌர்',
    location: 'Sirmaur, Himachal Pradesh',
    website: 'https://www.iimsirmaur.ac.in',
    phone: '01702-241500',
    email: 'admissions@iimsirmaur.ac.in',
    examName: 'CAT (MBA)',
    logoColor: '#4682B4',
    logo: '/universities/iim-sirmaur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' }
    ],
    fee: { general: 1400000, obc: 1400000, scst: 700000 },
    courses: [
      { id: 'iimsir-pgp', name: 'PGP (Post Graduate Programme)', nameTamil: 'PGP முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['5+ courses', 'Himalayan campus', 'Focus on tourism & hospitality'] },
      { id: 'iimsir-phd', name: 'Ph.D. (Doctoral Programme)', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation', tips: ['Research program'] }
    ]
  },

  // IIM JAMMU
  {
    id: 'iim-jammu',
    name: 'Indian Institute of Management Jammu',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் ஜம்மு',
    location: 'Jammu, J&K',
    website: 'https://www.iimj.ac.in',
    phone: '0191-2585100',
    email: 'admissions@iimj.ac.in',
    examName: 'CAT (MBA) / IPMAT (IPM)',
    logoColor: '#8B0000',
    logo: '/universities/iim-jammu-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' },
      { event: 'IPMAT 2026', eventTamil: 'IPMAT 2026', date: 'May 2026', status: 'upcoming' }
    ],
    fee: { general: 1500000, obc: 1500000, scst: 750000 },
    courses: [
      { id: 'iimj-pgp', name: 'PGP (Post Graduate Programme)', nameTamil: 'PGP முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['5+ courses', 'Gateway to Kashmir', 'IPM program available'] },
      { id: 'iimj-ipm', name: 'IPM (Integrated Programme)', nameTamil: 'IPM', type: 'Integrated', category: 'On-Campus', school: 'Management', duration: '5 Years', eligibility: '12th Pass + IPMAT', tips: ['After 12th entry'] },
      { id: 'iimj-phd', name: 'Ph.D. (Doctoral Programme)', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation', tips: ['Research program'] }
    ]
  },

  // IIM MUMBAI
  {
    id: 'iim-mumbai',
    name: 'Indian Institute of Management Mumbai',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் மும்பை',
    location: 'Mumbai, Maharashtra',
    website: 'https://www.iimmumbai.ac.in',
    phone: '022-26543000',
    email: 'admissions@iimmumbai.ac.in',
    examName: 'CAT (MBA)',
    logoColor: '#000080',
    logo: '/universities/iim-mumbai-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' }
    ],
    fee: { general: 1800000, obc: 1800000, scst: 900000 },
    courses: [
      { id: 'iimm-pgp', name: 'PGP (Post Graduate Programme)', nameTamil: 'PGP முதுநிலை பட்டம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', tips: ['5+ courses', 'Newest IIM', 'Financial capital of India', 'Strong industry connections'] },
      { id: 'iimm-phd', name: 'Ph.D. (Doctoral Programme)', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-5 Years', eligibility: 'Post-graduation', tips: ['Research program'] }
    ]
  },

  // ============================================
  // INDIAN INSTITUTES OF SCIENCE EDUCATION AND RESEARCH (IISERs)
  // ============================================

  // IISER PUNE
  {
    id: 'iiser-pune',
    name: 'Indian Institute of Science Education and Research (IISER) Pune',
    nameTamil: 'இந்திய அறிவியல் கல்வி ஆராய்ச்சி நிறுவனம் புனே',
    location: 'Pune, Maharashtra',
    website: 'https://www.iiserpune.ac.in',
    phone: '020-25908000',
    email: 'admissions@iiserpune.ac.in',
    examName: 'IAT / JEE Advanced / KVPY',
    logoColor: '#0066CC',
    logo: '/universities/iiser-pune-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'IISER Aptitude Test (IAT) 2026', eventTamil: 'IAT 2026', date: 'June 2026', status: 'upcoming' },
      { event: 'JEE Advanced Channel', eventTamil: 'JEE அட்வான்ஸ்டு வழி', date: 'May 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iiserp-bsms', name: 'BS-MS (Dual Degree in Science)', nameTamil: 'BS-MS (அறிவியல் இரட்டை பட்டம்)', type: 'Integrated', category: 'On-Campus', school: 'Sciences', duration: '5 Years', eligibility: '12th PCM/PCB + IAT/JEE Advanced/KVPY', tips: ['10+ courses', 'Premier science research institute', 'Path to Ph.D. and academia', 'Strong research culture'] },
      { id: 'iiserp-phd', name: 'Ph.D. (Integrated Ph.D.)', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '5-6 Years', eligibility: 'B.Sc./M.Sc. + JEST/CSIR-NET', tips: ['Doctoral research in sciences'] }
    ]
  },

  // IISER KOLKATA
  {
    id: 'iiser-kolkata',
    name: 'Indian Institute of Science Education and Research (IISER) Kolkata',
    nameTamil: 'இந்திய அறிவியல் கல்வி ஆராய்ச்சி நிறுவனம் கொல்கத்தா',
    location: 'Kolkata, West Bengal',
    website: 'https://www.iiserkol.ac.in',
    phone: '033-25873000',
    email: 'admissions@iiserkol.ac.in',
    examName: 'IAT / JEE Advanced / KVPY',
    logoColor: '#8B0000',
    logo: '/universities/iiser-kolkata-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'IISER Aptitude Test (IAT) 2026', eventTamil: 'IAT 2026', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iiserk-bsms', name: 'BS-MS (Dual Degree in Science)', nameTamil: 'BS-MS (அறிவியல் இரட்டை பட்டம்)', type: 'Integrated', category: 'On-Campus', school: 'Sciences', duration: '5 Years', eligibility: '12th PCM/PCB + IAT/JEE Advanced/KVPY', tips: ['10+ courses', 'Strong research in biology & chemistry', 'Collaborative research with global institutes'] },
      { id: 'iiserk-phd', name: 'Ph.D.', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '5-6 Years', eligibility: 'B.Sc./M.Sc. + JEST/CSIR-NET', tips: ['Research excellence'] }
    ]
  },

  // IISER MOHALI
  {
    id: 'iiser-mohali',
    name: 'Indian Institute of Science Education and Research (IISER) Mohali',
    nameTamil: 'இந்திய அறிவியல் கல்வி ஆராய்ச்சி நிறுவனம் மொஹாலி',
    location: 'Mohali, Punjab',
    website: 'https://www.iisermohali.ac.in',
    phone: '0172-2293100',
    email: 'admissions@iisermohali.ac.in',
    examName: 'IAT / JEE Advanced / KVPY',
    logoColor: '#006633',
    logo: '/universities/iiser-mohali-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'IISER Aptitude Test (IAT) 2026', eventTamil: 'IAT 2026', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iiserm-bsms', name: 'BS-MS (Dual Degree in Science)', nameTamil: 'BS-MS (அறிவியல் இரட்டை பட்டம்)', type: 'Integrated', category: 'On-Campus', school: 'Sciences', duration: '5 Years', eligibility: '12th PCM/PCB + IAT/JEE Advanced/KVPY', tips: ['10+ courses', 'Strong in chemical sciences', 'Near Chandigarh'] },
      { id: 'iiserm-phd', name: 'Ph.D.', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '5-6 Years', eligibility: 'B.Sc./M.Sc. + JEST/CSIR-NET', tips: ['Research program'] }
    ]
  },

  // IISER BHOPAL
  {
    id: 'iiser-bhopal',
    name: 'Indian Institute of Science Education and Research (IISER) Bhopal',
    nameTamil: 'இந்திய அறிவியல் கல்வி ஆராய்ச்சி நிறுவனம் போபால்',
    location: 'Bhopal, Madhya Pradesh',
    website: 'https://www.iiserb.ac.in',
    phone: '0755-6692000',
    email: 'admissions@iiserb.ac.in',
    examName: 'IAT / JEE Advanced / KVPY',
    logoColor: '#4B0082',
    logo: '/universities/iiser-bhopal-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'IISER Aptitude Test (IAT) 2026', eventTamil: 'IAT 2026', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iiserb-bsms', name: 'BS-MS (Dual Degree in Science)', nameTamil: 'BS-MS (அறிவியல் இரட்டை பட்டம்)', type: 'Integrated', category: 'On-Campus', school: 'Sciences', duration: '5 Years', eligibility: '12th PCM/PCB + IAT/JEE Advanced/KVPY', tips: ['10+ courses', 'Beautiful campus', 'Strong physics & EE research'] },
      { id: 'iiserb-phd', name: 'Ph.D.', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '5-6 Years', eligibility: 'B.Sc./M.Sc. + JEST/CSIR-NET', tips: ['Research program'] }
    ]
  },

  // IISER THIRUVANANTHAPURAM
  {
    id: 'iiser-tvm',
    name: 'Indian Institute of Science Education and Research (IISER) Thiruvananthapuram',
    nameTamil: 'இந்திய அறிவியல் கல்வி ஆராய்ச்சி நிறுவனம் திருவனந்தபுரம்',
    location: 'Thiruvananthapuram, Kerala',
    website: 'https://www.iisertvm.ac.in',
    phone: '0471-2778000',
    email: 'admissions@iisertvm.ac.in',
    examName: 'IAT / JEE Advanced / KVPY',
    logoColor: '#006400',
    logo: '/universities/iiser-tvm-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'IISER Aptitude Test (IAT) 2026', eventTamil: 'IAT 2026', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iisert-bsms', name: 'BS-MS (Dual Degree in Science)', nameTamil: 'BS-MS (அறிவியல் இரட்டை பட்டம்)', type: 'Integrated', category: 'On-Campus', school: 'Sciences', duration: '5 Years', eligibility: '12th PCM/PCB + IAT/JEE Advanced/KVPY', tips: ['10+ courses', 'Scenic Kerala location', 'Near Tamil Nadu border'] },
      { id: 'iisert-phd', name: 'Ph.D.', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '5-6 Years', eligibility: 'B.Sc./M.Sc. + JEST/CSIR-NET', tips: ['Research program'] }
    ]
  },

  // IISER TIRUPATI
  {
    id: 'iiser-tirupati',
    name: 'Indian Institute of Science Education and Research (IISER) Tirupati',
    nameTamil: 'இந்திய அறிவியல் கல்வி ஆராய்ச்சி நிறுவனம் திருப்பதி',
    location: 'Tirupati, Andhra Pradesh',
    website: 'https://www.iisertirupati.ac.in',
    phone: '0877-2500900',
    email: 'admissions@iisertirupati.ac.in',
    examName: 'IAT / JEE Advanced / KVPY',
    logoColor: '#FF6600',
    logo: '/universities/iiser-tirupati-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'IISER Aptitude Test (IAT) 2026', eventTamil: 'IAT 2026', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iisertp-bsms', name: 'BS-MS (Dual Degree in Science)', nameTamil: 'BS-MS (அறிவியல் இரட்டை பட்டம்)', type: 'Integrated', category: 'On-Campus', school: 'Sciences', duration: '5 Years', eligibility: '12th PCM/PCB + IAT/JEE Advanced/KVPY', tips: ['10+ courses', 'Near Chennai/TN border', 'Growing research hub'] },
      { id: 'iisertp-phd', name: 'Ph.D.', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '5-6 Years', eligibility: 'B.Sc./M.Sc. + JEST/CSIR-NET', tips: ['Research program'] }
    ]
  },

  // IISER BERHAMPUR
  {
    id: 'iiser-berhampur',
    name: 'Indian Institute of Science Education and Research (IISER) Berhampur',
    nameTamil: 'இந்திய அறிவியல் கல்வி ஆராய்ச்சி நிறுவனம் பெரம்பூர்',
    location: 'Berhampur, Odisha',
    website: 'https://www.iiserbpr.ac.in',
    phone: '0680-2227500',
    email: 'admissions@iiserbpr.ac.in',
    examName: 'IAT / JEE Advanced / KVPY',
    logoColor: '#4169E1',
    logo: '/universities/iiser-berhampur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'IISER Aptitude Test (IAT) 2026', eventTamil: 'IAT 2026', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      { id: 'iiserbr-bsms', name: 'BS-MS (Dual Degree in Science)', nameTamil: 'BS-MS (அறிவியல் இரட்டை பட்டம்)', type: 'Integrated', category: 'On-Campus', school: 'Sciences', duration: '5 Years', eligibility: '12th PCM/PCB + IAT/JEE Advanced/KVPY', tips: ['10+ courses', 'Newest IISER', 'Developing campus'] },
      { id: 'iiserbr-phd', name: 'Ph.D.', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '5-6 Years', eligibility: 'B.Sc./M.Sc. + JEST/CSIR-NET', tips: ['Research program'] }
    ]
  },

  // ============================================
  // OTHER CENTRAL INSTITUTIONS
  // ============================================

  // CENTRAL INSTITUTE OF CLASSICAL TAMIL
  {
    id: 'cict-chennai',
    name: 'Central Institute of Classical Tamil',
    nameTamil: 'செம்மொழித் தமிழாய்வு மத்திய நிறுவனம்',
    location: 'Chennai, Tamil Nadu',
    website: 'https://www.cict.in',
    phone: '044-24412315',
    email: 'cict@cict.in',
    examName: 'Direct Application',
    logoColor: '#8B4513',
    logo: '/universities/cict-chennai-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'Ph.D. Admission 2026', eventTamil: 'Ph.D. சேர்க்கை 2026', date: 'March 2026', status: 'upcoming' },
      { event: 'Certificate Courses', eventTamil: 'சான்றிதழ் படிப்புகள்', date: 'Year-round', status: 'ongoing' }
    ],
    fee: { general: 10000, obc: 10000, scst: 5000 },
    courses: [
      { id: 'cict-phd-tamil', name: 'Ph.D. in Classical Tamil', nameTamil: 'Ph.D. செந்தமிழ்', type: 'Research', category: 'On-Campus', school: 'Tamil Studies', duration: '3-5 Years', eligibility: 'M.A. Tamil/Literature', tips: ['7+ courses', 'Premier Tamil research institute', 'Sangam literature expertise'] },
      { id: 'cict-cert-sangam', name: 'Certificate in Sangam Literature', nameTamil: 'சங்க இலக்கிய சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Tamil Studies', duration: '6 Months', eligibility: 'Graduate in any discipline', tips: ['Classical Tamil heritage'] },
      { id: 'cict-cert-epigraphy', name: 'Certificate in Tamil Epigraphy', nameTamil: 'தமிழ் கல்வெட்டியல் சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Tamil Studies', duration: '6 Months', eligibility: 'Graduate', tips: ['Stone inscriptions study'] },
      { id: 'cict-diploma-classical', name: 'Diploma in Classical Tamil', nameTamil: 'செந்தமிழ் டிப்ளமா', type: 'Diploma', category: 'On-Campus', school: 'Tamil Studies', duration: '1 Year', eligibility: 'Graduate', tips: ['In-depth classical study'] },
      { id: 'cict-pdp', name: 'Post-Doctoral Programme', nameTamil: 'முனைவர் பட்ட பின் படிப்பு', type: 'Research', category: 'On-Campus', school: 'Research', duration: '2 Years', eligibility: 'Ph.D. in Tamil', tips: ['Advanced research fellowship'] }
    ]
  },

  // NITTTR CHENNAI
  {
    id: 'nitttr-chennai',
    name: 'National Institute of Technical Teachers Training and Research (NITTTR) Chennai',
    nameTamil: 'தேசிய தொழில்நுட்ப ஆசிரியர் பயிற்சி மற்றும் ஆராய்ச்சி நிறுவனம்',
    location: 'Chennai, Tamil Nadu',
    website: 'https://www.nitttrc.ac.in',
    phone: '044-22542994',
    email: 'nitttrcinfo@gmail.com',
    examName: 'GATE (M.Tech) / Direct Application',
    logoColor: '#006400',
    logo: '/universities/nitttr-chennai-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'M.Tech Admission 2026', eventTamil: 'M.Tech சேர்க்கை 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'Short Term Courses', eventTamil: 'குறுகிய கால பயிற்சி', date: 'Year-round', status: 'ongoing' },
      { event: 'Faculty Development Programmes', eventTamil: 'ஆசிரியர் மேம்பாட்டு பயிற்சி', date: 'Year-round', status: 'ongoing' }
    ],
    fee: { general: 50000, obc: 50000, scst: 25000 },
    courses: [
      { id: 'nitttr-mtech-edu', name: 'M.Tech (Educational Technology)', nameTamil: 'M.Tech (கல்வி தொழில்நுட்பம்)', type: 'PG', category: 'On-Campus', school: 'Education', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', tips: ['10+ courses', 'Technical teacher training', 'Focus on pedagogy + technology'] },
      { id: 'nitttr-mtech-cad', name: 'M.Tech (CAD/CAM)', nameTamil: 'M.Tech (CAD/CAM)', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', tips: ['Design & manufacturing'] },
      { id: 'nitttr-mtech-comm', name: 'M.Tech (Communication Engineering)', nameTamil: 'M.Tech (தொடர்பு பொறியியல்)', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', tips: ['Communication systems'] },
      { id: 'nitttr-pgdm', name: 'PGDM (Technical Education Management)', nameTamil: 'PGDM (தொழில்நுட்ப கல்வி மேலாண்மை)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '1 Year', eligibility: 'B.Tech/BE with teaching exp', tips: ['For engineering faculty'] },
      { id: 'nitttr-phd', name: 'Ph.D. (Various Disciplines)', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '3-5 Years', eligibility: 'M.Tech/M.E.', tips: ['Research in technical education'] },
      { id: 'nitttr-fdp', name: 'Faculty Development Programmes', nameTamil: 'ஆசிரியர் மேம்பாட்டு நிகழ்ச்சிகள்', type: 'Certificate', category: 'On-Campus', school: 'Professional Development', duration: '1-4 Weeks', eligibility: 'Engineering faculty members', tips: ['AICTE-sponsored training'] }
    ]
  }
];
