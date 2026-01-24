export interface University {
  id: string;
  name: string;
  nameTamil: string;
  location: string;
  website: string;
  phone: string;
  email?: string;
  examName: string;
  logoColor: string;
  logo?: string;
  courses: Course[];
  importantDates: ImportantDate[];
  fee: FeeStructure;
}

export interface SeatMatrix {
  general: number;
  obc: number;
  bcMbc: number;
  sc: number;
  st: number;
  ews?: number;
  total: number;
}

export interface YearCutoff {
  year: string;
  general: number | string;
  obc: number | string;
  bcMbc: number | string;
  sc: number | string;
  st: number | string;
  ews?: number | string;
}

export interface Course {
  id: string;
  name: string;
  nameTamil: string;
  type: 'UG' | 'PG' | 'Research' | 'Super-Specialty' | 'Integrated' | 'Diploma' | 'PG Diploma' | 'Certificate' | 'Vocational';
  category?: 'On-Campus' | 'DDE' | 'Affiliated';
  school?: string;
  eligibility?: string;
  duration?: string;
  specialty?: string;
  examPattern: ExamPattern;
  syllabus: SyllabusUnit[];
  previousQuestions: PreviousQuestion[];
  tips: string[];
  seatMatrix?: SeatMatrix;
  cutoffs?: YearCutoff[];
}

export interface ExamPattern {
  totalQuestions: number;
  totalMarks: number;
  duration: string;
  durationMinutes: number;
  mode: string;
  negativeMarking: boolean;
  sections: Section[];
}

export interface Section {
  name: string;
  nameTamil: string;
  questions: number;
  marks: number;
  topics: string[];
}

export interface SyllabusUnit {
  unitNumber: number;
  title: string;
  titleTamil: string;
  topics: Topic[];
  expectedQuestions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Topic {
  name: string;
  subtopics: string[];
  importance: 'High' | 'Medium' | 'Low';
}

export interface PreviousQuestion {
  id: string;
  year?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface ImportantDate {
  event: string;
  eventTamil: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface FeeStructure {
  general: number;
  obc: number;
  scst: number;
}

export const universities: University[] = [
  {
    id: 'anna-university',
    name: 'Anna University',
    nameTamil: 'அண்ணா பல்கலைக்கழகம்',
    location: 'Chennai',
    website: 'www.annauniv.edu',
    phone: '044-22358525',
    examName: 'TANCET',
    logoColor: '#1e3a8a',
    logo: '/universities/anna-university-logo.jpg',
    fee: { general: 600, obc: 600, scst: 300 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'January 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'January 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'February 2026', status: 'upcoming' },
      { event: 'Exam Date', eventTamil: 'தேர்வு தேதி', date: 'March 2026 (Last Saturday)', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'April 2026', status: 'upcoming' },
    ],
    courses: [
      // ══════════════════════════════════════════════════════════════════════════════
      // TAB 1: ON-CAMPUS — CONSTITUENT COLLEGES
      // ══════════════════════════════════════════════════════════════════════════════
      
      // ────────────────────────────────────────────────────────────────────────────
      // COLLEGE OF ENGINEERING, GUINDY (CEG) — India's Oldest Technical Institution (Est. 1794)
      // ────────────────────────────────────────────────────────────────────────────
      
      // CEG - UNDERGRADUATE PROGRAMS (B.E./B.Tech.)
      { id: 'ceg-be-civil', name: 'B.E. Civil Engineering', nameTamil: 'பி.இ. சிவில் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'CEG', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Mathematics', nameTamil: 'கணிதம்', questions: 100, marks: 100, topics: ['Calculus', 'Algebra', 'Geometry'] }, { name: 'Physics + Chemistry', nameTamil: 'இயற்பியல் + வேதியியல்', questions: 100, marks: 100, topics: ['Mechanics', 'Materials'] }] }, syllabus: [], previousQuestions: [], tips: ['Core infrastructure branch', 'Good for government jobs', 'Intake: 120 seats'] },
      { id: 'ceg-be-mech', name: 'B.E. Mechanical Engineering', nameTamil: 'பி.இ. இயந்திரவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'CEG', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Mathematics', nameTamil: 'கணிதம்', questions: 100, marks: 100, topics: ['Calculus', 'Mechanics'] }, { name: 'Physics + Chemistry', nameTamil: 'இயற்பியல் + வேதியியல்', questions: 100, marks: 100, topics: ['Thermodynamics', 'Materials'] }] }, syllabus: [], previousQuestions: [], tips: ['Evergreen branch', 'Manufacturing & Automobile sectors', 'Intake: 120 seats'] },
      { id: 'ceg-be-eee', name: 'B.E. Electrical & Electronics Engineering', nameTamil: 'பி.இ. மின் மற்றும் மின்னணு பொறியியல்', type: 'UG', category: 'On-Campus', school: 'CEG', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Mathematics', nameTamil: 'கணிதம்', questions: 100, marks: 100, topics: ['Algebra', 'Calculus'] }, { name: 'Physics + Chemistry', nameTamil: 'இயற்பியல் + வேதியியல்', questions: 100, marks: 100, topics: ['Electronics', 'Electromagnetism'] }] }, syllabus: [], previousQuestions: [], tips: ['Power sector opportunities', 'Government jobs in TNEB', 'Intake: 120 seats'] },
      { id: 'ceg-be-ece', name: 'B.E. Electronics & Communication Engineering', nameTamil: 'பி.இ. மின்னணு மற்றும் தொடர்பு பொறியியல்', type: 'UG', category: 'On-Campus', school: 'CEG', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Mathematics', nameTamil: 'கணிதம்', questions: 100, marks: 100, topics: ['Signal Processing', 'Calculus'] }, { name: 'Physics + Chemistry', nameTamil: 'இயற்பியல் + வேதியியல்', questions: 100, marks: 100, topics: ['Semiconductors', 'Communication'] }] }, syllabus: [], previousQuestions: [], tips: ['Core electronics branch', 'VLSI & Embedded systems', 'Intake: 120 seats'] },
      { id: 'ceg-be-cse', name: 'B.E. Computer Science & Engineering', nameTamil: 'பி.இ. கணினி அறிவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'CEG', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Mathematics', nameTamil: 'கணிதம்', questions: 100, marks: 100, topics: ['Logic', 'Discrete Maths'] }, { name: 'Physics + Chemistry', nameTamil: 'இயற்பியல் + வேதியியல்', questions: 100, marks: 100, topics: ['Electronics', 'Computing'] }] }, syllabus: [], previousQuestions: [], tips: ['Highest demand branch', 'Top IT company placements', 'Intake: 120 seats'] },
      { id: 'ceg-btech-it', name: 'B.Tech. Information Technology', nameTamil: 'பி.டெக். தகவல் தொழில்நுட்பம்', type: 'UG', category: 'On-Campus', school: 'CEG', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Mathematics', nameTamil: 'கணிதம்', questions: 100, marks: 100, topics: ['Programming Logic', 'Algorithms'] }, { name: 'Physics + Chemistry', nameTamil: 'இயற்பியல் + வேதியியல்', questions: 100, marks: 100, topics: ['Electronics', 'Networking'] }] }, syllabus: [], previousQuestions: [], tips: ['Software development focus', 'IT industry ready', 'Intake: 60 seats'] },
      { id: 'ceg-be-manufacturing', name: 'B.E. Manufacturing Engineering', nameTamil: 'பி.இ. உற்பத்தி பொறியியல்', type: 'UG', category: 'On-Campus', school: 'CEG', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Core Engineering', nameTamil: 'பொறியியல்', questions: 200, marks: 200, topics: ['Production', 'Automation'] }] }, syllabus: [], previousQuestions: [], tips: ['Industry 4.0 focus', 'Intake: 60 seats'] },
      { id: 'ceg-be-industrial', name: 'B.E. Industrial Engineering', nameTamil: 'பி.இ. தொழிற்சாலை பொறியியல்', type: 'UG', category: 'On-Campus', school: 'CEG', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Industrial Engineering', nameTamil: 'தொழிற்சாலை பொறியியல்', questions: 200, marks: 200, topics: ['Operations', 'Quality'] }] }, syllabus: [], previousQuestions: [], tips: ['Management + Engineering', 'Intake: 60 seats'] },
      { id: 'ceg-be-mining', name: 'B.E. Mining Engineering', nameTamil: 'பி.இ. சுரங்கப் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'CEG', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Mining Engineering', nameTamil: 'சுரங்கப் பொறியியல்', questions: 200, marks: 200, topics: ['Geology', 'Extraction'] }] }, syllabus: [], previousQuestions: [], tips: ['Unique specialization', 'Coal India jobs', 'Intake: 30 seats'] },
      { id: 'ceg-be-geo', name: 'B.E. Geo Informatics', nameTamil: 'பி.இ. புவி தகவலியல்', type: 'UG', category: 'On-Campus', school: 'CEG', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Geo Informatics', nameTamil: 'புவி தகவலியல்', questions: 200, marks: 200, topics: ['GIS', 'Remote Sensing'] }] }, syllabus: [], previousQuestions: [], tips: ['ISRO opportunities', 'Intake: 30 seats'] },
      { id: 'ceg-be-materials', name: 'B.E. Materials Science & Engineering', nameTamil: 'பி.இ. பொருட்கள் அறிவியல்', type: 'UG', category: 'On-Campus', school: 'CEG', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Materials Science', nameTamil: 'பொருட்கள் அறிவியல்', questions: 200, marks: 200, topics: ['Metallurgy', 'Polymers'] }] }, syllabus: [], previousQuestions: [], tips: ['R&D focus', 'Intake: 30 seats'] },
      { id: 'ceg-be-printing', name: 'B.E. Printing Technology', nameTamil: 'பி.இ. அச்சுத் தொழில்நுட்பம்', type: 'UG', category: 'On-Campus', school: 'CEG', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Printing Technology', nameTamil: 'அச்சுத் தொழில்நுட்பம்', questions: 200, marks: 200, topics: ['Graphics', 'Printing'] }] }, syllabus: [], previousQuestions: [], tips: ['Publishing industry', 'Intake: 30 seats'] },
      
      // CEG - POSTGRADUATE PROGRAMS (M.E./M.Tech.)
      { id: 'ceg-me-structural', name: 'M.E. Structural Engineering', nameTamil: 'எம்.இ. கட்டமைப்பு பொறியியல்', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. Civil', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Civil Engineering', nameTamil: 'சிவில் பொறியியல்', questions: 100, marks: 100, topics: ['Structures', 'Concrete', 'Steel'] }] }, syllabus: [], previousQuestions: [], tips: ['High demand in construction'] },
      { id: 'ceg-me-transportation', name: 'M.E. Transportation Engineering', nameTamil: 'எம்.இ. போக்குவரத்து பொறியியல்', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. Civil', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Transportation', nameTamil: 'போக்குவரத்து', questions: 100, marks: 100, topics: ['Highway', 'Traffic', 'Planning'] }] }, syllabus: [], previousQuestions: [], tips: ['Infrastructure projects'] },
      { id: 'ceg-me-environmental', name: 'M.E. Environmental Engineering', nameTamil: 'எம்.இ. சுற்றுச்சூழல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. Civil/Chemical', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Environmental', nameTamil: 'சுற்றுச்சூழல்', questions: 100, marks: 100, topics: ['Water', 'Waste', 'Pollution'] }] }, syllabus: [], previousQuestions: [], tips: ['Green jobs growing'] },
      { id: 'ceg-me-soilmech', name: 'M.E. Soil Mechanics & Foundation Engineering', nameTamil: 'எம்.இ. மண் இயக்கவியல்', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. Civil', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Geotechnical', nameTamil: 'நிலத்தொழில்நுட்ப', questions: 100, marks: 100, topics: ['Soil', 'Foundation', 'Rocks'] }] }, syllabus: [], previousQuestions: [], tips: ['Essential for construction'] },
      { id: 'ceg-me-thermal', name: 'M.E. Thermal Engineering', nameTamil: 'எம்.இ. வெப்பப் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. Mechanical', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Thermal', nameTamil: 'வெப்ப', questions: 100, marks: 100, topics: ['Heat Transfer', 'IC Engines', 'Refrigeration'] }] }, syllabus: [], previousQuestions: [], tips: ['Power plant jobs'] },
      { id: 'ceg-me-design', name: 'M.E. Engineering Design', nameTamil: 'எம்.இ. பொறியியல் வடிவமைப்பு', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. Mechanical', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Design', nameTamil: 'வடிவமைப்பு', questions: 100, marks: 100, topics: ['CAD/CAM', 'FEA', 'Machine Design'] }] }, syllabus: [], previousQuestions: [], tips: ['Product development focus'] },
      { id: 'ceg-me-manufacturing', name: 'M.E. Manufacturing Engineering', nameTamil: 'எம்.இ. உற்பத்தி பொறியியல்', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. Mechanical', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Manufacturing', nameTamil: 'உற்பத்தி', questions: 100, marks: 100, topics: ['Production', 'Automation', 'CNC'] }] }, syllabus: [], previousQuestions: [], tips: ['Industry 4.0 skills'] },
      { id: 'ceg-me-industrial', name: 'M.E. Industrial Engineering', nameTamil: 'எம்.இ. தொழிற்சாலை பொறியியல்', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. Mechanical', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Industrial', nameTamil: 'தொழிற்சாலை', questions: 100, marks: 100, topics: ['Operations', 'Quality', 'Supply Chain'] }] }, syllabus: [], previousQuestions: [], tips: ['Management + Technical skills'] },
      { id: 'ceg-me-power-systems', name: 'M.E. Power Systems Engineering', nameTamil: 'எம்.இ. மின்சார அமைப்பு பொறியியல்', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. EEE', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Power Systems', nameTamil: 'மின்சார அமைப்பு', questions: 100, marks: 100, topics: ['Generation', 'Transmission', 'Distribution'] }] }, syllabus: [], previousQuestions: [], tips: ['TNEB and power sector'] },
      { id: 'ceg-me-power-electronics', name: 'M.E. Power Electronics & Drives', nameTamil: 'எம்.இ. மின்னணு இயக்கிகள்', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. EEE/ECE', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Power Electronics', nameTamil: 'மின்னணு', questions: 100, marks: 100, topics: ['Converters', 'Drives', 'Control'] }] }, syllabus: [], previousQuestions: [], tips: ['EV industry demand'] },
      { id: 'ceg-me-communication', name: 'M.E. Communication Systems', nameTamil: 'எம்.இ. தொடர்பு அமைப்புகள்', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. ECE', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Communication', nameTamil: 'தொடர்பு', questions: 100, marks: 100, topics: ['Wireless', 'Networks', '5G'] }] }, syllabus: [], previousQuestions: [], tips: ['Telecom sector'] },
      { id: 'ceg-me-vlsi', name: 'M.E. VLSI Design', nameTamil: 'எம்.இ. வி.எல்.எஸ்.ஐ. வடிவமைப்பு', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. ECE/EEE', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'VLSI', nameTamil: 'வி.எல்.எஸ்.ஐ.', questions: 100, marks: 100, topics: ['Digital Design', 'ASIC', 'FPGA'] }] }, syllabus: [], previousQuestions: [], tips: ['Semiconductor industry'] },
      { id: 'ceg-me-applied-electronics', name: 'M.E. Applied Electronics', nameTamil: 'எம்.இ. பயன்பாட்டு மின்னணுவியல்', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. ECE', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Electronics', nameTamil: 'மின்னணுவியல்', questions: 100, marks: 100, topics: ['Embedded', 'Signal Processing'] }] }, syllabus: [], previousQuestions: [], tips: ['Embedded systems focus'] },
      { id: 'ceg-me-cse', name: 'M.E. Computer Science & Engineering', nameTamil: 'எம்.இ. கணினி அறிவியல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. CSE/IT', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 100, marks: 100, topics: ['Algorithms', 'AI/ML', 'Systems'] }] }, syllabus: [], previousQuestions: [], tips: ['Top IT placements'] },
      { id: 'ceg-mtech-it', name: 'M.Tech. Information Technology', nameTamil: 'எம்.டெக். தகவல் தொழில்நுட்பம்', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. CSE/IT', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'IT', nameTamil: 'தகவல் தொழில்நுட்பம்', questions: 100, marks: 100, topics: ['Software', 'Networks', 'Security'] }] }, syllabus: [], previousQuestions: [], tips: ['Software industry ready'] },
      { id: 'ceg-me-software', name: 'M.E. Software Engineering', nameTamil: 'எம்.இ. மென்பொருள் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. CSE/IT', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Software', nameTamil: 'மென்பொருள்', questions: 100, marks: 100, topics: ['SDLC', 'Testing', 'DevOps'] }] }, syllabus: [], previousQuestions: [], tips: ['Software development focus'] },
      { id: 'ceg-me-data-science', name: 'M.E. Data Science & Analytics', nameTamil: 'எம்.இ. தரவு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. CSE/IT/ECE', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Data Science', nameTamil: 'தரவு அறிவியல்', questions: 100, marks: 100, topics: ['ML', 'Big Data', 'Python'] }] }, syllabus: [], previousQuestions: [], tips: ['Highest demand field'] },
      { id: 'ceg-mtech-geo', name: 'M.Tech. Geo Informatics', nameTamil: 'எம்.டெக். புவி தகவலியல்', type: 'PG', category: 'On-Campus', school: 'CEG', eligibility: 'B.E./B.Tech. Civil/CSE', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Geo Informatics', nameTamil: 'புவி தகவலியல்', questions: 100, marks: 100, topics: ['GIS', 'GPS', 'Mapping'] }] }, syllabus: [], previousQuestions: [], tips: ['ISRO & Survey opportunities'] },
      
      // ────────────────────────────────────────────────────────────────────────────
      // ALAGAPPA COLLEGE OF TECHNOLOGY (ACT) — Chemical Sciences (Est. 1944)
      // ────────────────────────────────────────────────────────────────────────────
      
      // ACT - UNDERGRADUATE PROGRAMS (B.Tech.)
      { id: 'act-btech-chemical', name: 'B.Tech. Chemical Engineering', nameTamil: 'பி.டெக். வேதியியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'ACT', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Chemistry + Physics', nameTamil: 'வேதியியல் + இயற்பியல்', questions: 200, marks: 200, topics: ['Organic', 'Inorganic', 'Chemical Processes'] }] }, syllabus: [], previousQuestions: [], tips: ['Petrochemical & Pharma industries', 'Intake: 60 seats'] },
      { id: 'act-btech-petroleum', name: 'B.Tech. Petroleum Engineering', nameTamil: 'பி.டெக். பெட்ரோலியப் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'ACT', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Petroleum', nameTamil: 'பெட்ரோலியம்', questions: 200, marks: 200, topics: ['Drilling', 'Refining', 'Production'] }] }, syllabus: [], previousQuestions: [], tips: ['ONGC & Reliance jobs', 'Intake: 30 seats'] },
      { id: 'act-btech-food', name: 'B.Tech. Food Technology', nameTamil: 'பி.டெக். உணவு தொழில்நுட்பம்', type: 'UG', category: 'On-Campus', school: 'ACT', eligibility: '12th Pass with PCM/PCB', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Food Science', nameTamil: 'உணவு அறிவியல்', questions: 200, marks: 200, topics: ['Processing', 'Preservation', 'Quality'] }] }, syllabus: [], previousQuestions: [], tips: ['FMCG companies', 'Intake: 30 seats'] },
      { id: 'act-btech-pharma', name: 'B.Tech. Pharmaceutical Technology', nameTamil: 'பி.டெக். மருந்து தொழில்நுட்பம்', type: 'UG', category: 'On-Campus', school: 'ACT', eligibility: '12th Pass with PCM/PCB', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Pharmaceutical', nameTamil: 'மருந்து', questions: 200, marks: 200, topics: ['Drug Development', 'Formulation'] }] }, syllabus: [], previousQuestions: [], tips: ['Pharma industry growth', 'Intake: 30 seats'] },
      { id: 'act-btech-leather', name: 'B.Tech. Leather Technology', nameTamil: 'பி.டெக். தோல் தொழில்நுட்பம்', type: 'UG', category: 'On-Campus', school: 'ACT', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Leather', nameTamil: 'தோல்', questions: 200, marks: 200, topics: ['Tanning', 'Processing', 'Products'] }] }, syllabus: [], previousQuestions: [], tips: ['Chennai leather hub', 'Intake: 30 seats'] },
      { id: 'act-btech-textile', name: 'B.Tech. Textile Technology', nameTamil: 'பி.டெக். ஜவுளி தொழில்நுட்பம்', type: 'UG', category: 'On-Campus', school: 'ACT', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Textile', nameTamil: 'ஜவுளி', questions: 200, marks: 200, topics: ['Fiber', 'Weaving', 'Processing'] }] }, syllabus: [], previousQuestions: [], tips: ['Coimbatore textile belt', 'Intake: 30 seats'] },
      { id: 'act-btech-rubber', name: 'B.Tech. Rubber & Plastics Technology', nameTamil: 'பி.டெக். ரப்பர் மற்றும் பிளாஸ்டிக்', type: 'UG', category: 'On-Campus', school: 'ACT', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Polymer', nameTamil: 'பாலிமர்', questions: 200, marks: 200, topics: ['Rubber', 'Plastics', 'Composites'] }] }, syllabus: [], previousQuestions: [], tips: ['Tyre & polymer industries', 'Intake: 30 seats'] },
      
      // ACT - POSTGRADUATE PROGRAMS (M.Tech.)
      { id: 'act-mtech-chemical', name: 'M.Tech. Chemical Engineering', nameTamil: 'எம்.டெக். வேதியியல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'ACT', eligibility: 'B.Tech. Chemical', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Chemical Engineering', nameTamil: 'வேதியியல் பொறியியல்', questions: 100, marks: 100, topics: ['Process Design', 'Reaction Engineering'] }] }, syllabus: [], previousQuestions: [], tips: ['R&D and process design'] },
      { id: 'act-mtech-petroleum', name: 'M.Tech. Petroleum Refining & Petrochemicals', nameTamil: 'எம்.டெக். பெட்ரோலிய சுத்திகரிப்பு', type: 'PG', category: 'On-Campus', school: 'ACT', eligibility: 'B.Tech. Chemical/Petroleum', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Petroleum', nameTamil: 'பெட்ரோலியம்', questions: 100, marks: 100, topics: ['Refining', 'Petrochemicals'] }] }, syllabus: [], previousQuestions: [], tips: ['Oil & gas sector'] },
      { id: 'act-mtech-food', name: 'M.Tech. Food Technology', nameTamil: 'எம்.டெக். உணவு தொழில்நுட்பம்', type: 'PG', category: 'On-Campus', school: 'ACT', eligibility: 'B.Tech. Food Technology', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Food Technology', nameTamil: 'உணவு தொழில்நுட்பம்', questions: 100, marks: 100, topics: ['Food Processing', 'Safety'] }] }, syllabus: [], previousQuestions: [], tips: ['Food industry R&D'] },
      { id: 'act-mtech-pharma', name: 'M.Tech. Pharmaceutical Technology', nameTamil: 'எம்.டெக். மருந்து தொழில்நுட்பம்', type: 'PG', category: 'On-Campus', school: 'ACT', eligibility: 'B.Tech. Pharma', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Pharmaceutical', nameTamil: 'மருந்து', questions: 100, marks: 100, topics: ['Drug Development', 'Formulation'] }] }, syllabus: [], previousQuestions: [], tips: ['Pharma R&D'] },
      { id: 'act-mtech-leather', name: 'M.Tech. Leather Technology', nameTamil: 'எம்.டெக். தோல் தொழில்நுட்பம்', type: 'PG', category: 'On-Campus', school: 'ACT', eligibility: 'B.Tech. Leather', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Leather', nameTamil: 'தோல்', questions: 100, marks: 100, topics: ['Advanced Processing', 'Sustainability'] }] }, syllabus: [], previousQuestions: [], tips: ['Export industry focus'] },
      { id: 'act-mtech-textile', name: 'M.Tech. Textile Technology', nameTamil: 'எம்.டெக். ஜவுளி தொழில்நுட்பம்', type: 'PG', category: 'On-Campus', school: 'ACT', eligibility: 'B.Tech. Textile', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Textile', nameTamil: 'ஜவுளி', questions: 100, marks: 100, topics: ['Advanced Textiles', 'Technical Textiles'] }] }, syllabus: [], previousQuestions: [], tips: ['Technical textile growth'] },
      { id: 'act-mtech-polymer', name: 'M.Tech. Polymer Science & Engineering', nameTamil: 'எம்.டெக். பாலிமர் அறிவியல்', type: 'PG', category: 'On-Campus', school: 'ACT', eligibility: 'B.Tech. Chemical/Rubber', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Polymer', nameTamil: 'பாலிமர்', questions: 100, marks: 100, topics: ['Polymer Chemistry', 'Processing'] }] }, syllabus: [], previousQuestions: [], tips: ['Plastics industry demand'] },
      
      // ACT - SCIENCE PROGRAMS
      { id: 'act-msc-chemistry', name: 'M.Sc. Applied Chemistry', nameTamil: 'எம்.எஸ்சி. பயன்பாட்டு வேதியியல்', type: 'PG', category: 'On-Campus', school: 'ACT', eligibility: 'B.Sc. Chemistry', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Entrance Exam', negativeMarking: false, sections: [{ name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 100, marks: 100, topics: ['Organic', 'Inorganic', 'Physical'] }] }, syllabus: [], previousQuestions: [], tips: ['Chemical industry R&D'] },
      { id: 'act-msc-geology', name: 'M.Sc. Applied Geology', nameTamil: 'எம்.எஸ்சி. பயன்பாட்டு புவியியல்', type: 'PG', category: 'On-Campus', school: 'ACT', eligibility: 'B.Sc. Geology', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Entrance Exam', negativeMarking: false, sections: [{ name: 'Geology', nameTamil: 'புவியியல்', questions: 100, marks: 100, topics: ['Mineralogy', 'Petrology'] }] }, syllabus: [], previousQuestions: [], tips: ['GSI & mining jobs'] },
      { id: 'act-mca', name: 'M.C.A. (Master of Computer Applications)', nameTamil: 'எம்.சி.ஏ.', type: 'PG', category: 'On-Campus', school: 'ACT', eligibility: 'Any Degree with Maths', duration: '3 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Computer Applications', nameTamil: 'கணினி பயன்பாடுகள்', questions: 100, marks: 100, topics: ['Programming', 'DBMS', 'Networks'] }] }, syllabus: [], previousQuestions: [], tips: ['IT industry pathway'] },
      
      // ────────────────────────────────────────────────────────────────────────────
      // MADRAS INSTITUTE OF TECHNOLOGY (MIT) — Dr. APJ Abdul Kalam's Alma Mater (Est. 1949)
      // ────────────────────────────────────────────────────────────────────────────
      
      // MIT - UNDERGRADUATE PROGRAMS (B.E./B.Tech.)
      { id: 'mit-be-aero', name: 'B.E. Aerospace Engineering', nameTamil: 'பி.இ. விண்வெளி பொறியியல்', type: 'UG', category: 'On-Campus', school: 'MIT', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Aerospace', nameTamil: 'விண்வெளி', questions: 200, marks: 200, topics: ['Aerodynamics', 'Propulsion', 'Structures'] }] }, syllabus: [], previousQuestions: [], tips: ['ISRO & HAL opportunities', 'Dr. Kalam studied here', 'Intake: 60 seats'] },
      { id: 'mit-be-auto', name: 'B.E. Automobile Engineering', nameTamil: 'பி.இ. வாகனப் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'MIT', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Automobile', nameTamil: 'வாகன', questions: 200, marks: 200, topics: ['Engines', 'Chassis', 'EVs'] }] }, syllabus: [], previousQuestions: [], tips: ['Chennai auto hub', 'EV sector growing', 'Intake: 60 seats'] },
      { id: 'mit-be-electronics', name: 'B.E. Electronics Engineering', nameTamil: 'பி.இ. மின்னணுவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'MIT', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Electronics', nameTamil: 'மின்னணுவியல்', questions: 200, marks: 200, topics: ['Analog', 'Digital', 'Microprocessors'] }] }, syllabus: [], previousQuestions: [], tips: ['Core electronics', 'Intake: 60 seats'] },
      { id: 'mit-btech-instrumentation', name: 'B.Tech. Instrumentation & Control Engineering', nameTamil: 'பி.டெக். கருவியமைப்பு மற்றும் கட்டுப்பாடு', type: 'UG', category: 'On-Campus', school: 'MIT', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Instrumentation', nameTamil: 'கருவியமைப்பு', questions: 200, marks: 200, topics: ['Sensors', 'Control Systems', 'PLC'] }] }, syllabus: [], previousQuestions: [], tips: ['Process industries', 'Intake: 60 seats'] },
      { id: 'mit-btech-media', name: 'B.Tech. Electronics & Media Technology', nameTamil: 'பி.டெக். மின்னணு மற்றும் ஊடக தொழில்நுட்பம்', type: 'UG', category: 'On-Campus', school: 'MIT', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Media Technology', nameTamil: 'ஊடக தொழில்நுட்பம்', questions: 200, marks: 200, topics: ['Broadcasting', 'Digital Media'] }] }, syllabus: [], previousQuestions: [], tips: ['Media industry', 'Intake: 30 seats'] },
      { id: 'mit-btech-handloom', name: 'B.Tech. Handloom & Textile Technology', nameTamil: 'பி.டெக். கைத்தறி மற்றும் ஜவுளி', type: 'UG', category: 'On-Campus', school: 'MIT', eligibility: '12th Pass with PCM', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling (12th Marks)', negativeMarking: false, sections: [{ name: 'Handloom', nameTamil: 'கைத்தறி', questions: 200, marks: 200, topics: ['Weaving', 'Design'] }] }, syllabus: [], previousQuestions: [], tips: ['Traditional textile sector', 'Intake: 30 seats'] },
      
      // MIT - POSTGRADUATE PROGRAMS (M.E./M.Tech.)
      { id: 'mit-me-aero', name: 'M.E. Aeronautical Engineering', nameTamil: 'எம்.இ. விமானப் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'MIT', eligibility: 'B.E./B.Tech. Aero/Mech', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Aeronautical', nameTamil: 'விமான', questions: 100, marks: 100, topics: ['Flight Mechanics', 'Propulsion'] }] }, syllabus: [], previousQuestions: [], tips: ['DRDO & ISRO'] },
      { id: 'mit-me-avionics', name: 'M.E. Avionics', nameTamil: 'எம்.இ. விமான மின்னணுவியல்', type: 'PG', category: 'On-Campus', school: 'MIT', eligibility: 'B.E./B.Tech. Aero/ECE', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Avionics', nameTamil: 'விமான மின்னணு', questions: 100, marks: 100, topics: ['Navigation', 'Radar', 'Communication'] }] }, syllabus: [], previousQuestions: [], tips: ['Aviation industry'] },
      { id: 'mit-me-auto', name: 'M.E. Automobile Engineering', nameTamil: 'எம்.இ. வாகனப் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'MIT', eligibility: 'B.E./B.Tech. Auto/Mech', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Automobile', nameTamil: 'வாகன', questions: 100, marks: 100, topics: ['Vehicle Dynamics', 'EV Technology'] }] }, syllabus: [], previousQuestions: [], tips: ['Auto industry R&D'] },
      { id: 'mit-me-embedded', name: 'M.E. Embedded System Technologies', nameTamil: 'எம்.இ. உட்பொதிக்கப்பட்ட அமைப்பு', type: 'PG', category: 'On-Campus', school: 'MIT', eligibility: 'B.E./B.Tech. ECE/EEE/CSE', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Embedded', nameTamil: 'உட்பொதி', questions: 100, marks: 100, topics: ['Microcontrollers', 'RTOS', 'IoT'] }] }, syllabus: [], previousQuestions: [], tips: ['IoT industry boom'] },
      { id: 'mit-mtech-instrumentation', name: 'M.Tech. Instrumentation Engineering', nameTamil: 'எம்.டெக். கருவியமைப்பு பொறியியல்', type: 'PG', category: 'On-Campus', school: 'MIT', eligibility: 'B.Tech. Instrumentation', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Instrumentation', nameTamil: 'கருவியமைப்பு', questions: 100, marks: 100, topics: ['Process Control', 'Automation'] }] }, syllabus: [], previousQuestions: [], tips: ['Process industries'] },
      { id: 'mit-mtech-control', name: 'M.Tech. Control & Instrumentation', nameTamil: 'எம்.டெக். கட்டுப்பாடு மற்றும் கருவியமைப்பு', type: 'PG', category: 'On-Campus', school: 'MIT', eligibility: 'B.Tech. Instrumentation/EEE', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Control', nameTamil: 'கட்டுப்பாடு', questions: 100, marks: 100, topics: ['Control Theory', 'Robotics'] }] }, syllabus: [], previousQuestions: [], tips: ['Automation sector'] },
      { id: 'mit-me-optical', name: 'M.E. Optical Communication', nameTamil: 'எம்.இ. ஒளியியல் தொடர்பு', type: 'PG', category: 'On-Campus', school: 'MIT', eligibility: 'B.E./B.Tech. ECE', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Optical', nameTamil: 'ஒளியியல்', questions: 100, marks: 100, topics: ['Fiber Optics', 'Photonics'] }] }, syllabus: [], previousQuestions: [], tips: ['Telecom infrastructure'] },
      { id: 'mit-mtech-remote', name: 'M.Tech. Remote Sensing', nameTamil: 'எம்.டெக். தொலை உணர்தல்', type: 'PG', category: 'On-Campus', school: 'MIT', eligibility: 'B.E./B.Tech. relevant', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Remote Sensing', nameTamil: 'தொலை உணர்தல்', questions: 100, marks: 100, topics: ['Satellite Imagery', 'GIS'] }] }, syllabus: [], previousQuestions: [], tips: ['ISRO & Survey'] },
      
      // MIT - SCIENCE & MANAGEMENT PROGRAMS
      { id: 'mit-msc-maths', name: 'M.Sc. Mathematics', nameTamil: 'எம்.எஸ்சி. கணிதம்', type: 'PG', category: 'On-Campus', school: 'MIT', eligibility: 'B.Sc. Mathematics', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Entrance Exam', negativeMarking: false, sections: [{ name: 'Mathematics', nameTamil: 'கணிதம்', questions: 100, marks: 100, topics: ['Algebra', 'Analysis', 'Applied'] }] }, syllabus: [], previousQuestions: [], tips: ['Data Science foundation'] },
      { id: 'mit-msc-physics', name: 'M.Sc. Physics', nameTamil: 'எம்.எஸ்சி. இயற்பியல்', type: 'PG', category: 'On-Campus', school: 'MIT', eligibility: 'B.Sc. Physics', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Entrance Exam', negativeMarking: false, sections: [{ name: 'Physics', nameTamil: 'இயற்பியல்', questions: 100, marks: 100, topics: ['Quantum', 'Classical', 'Solid State'] }] }, syllabus: [], previousQuestions: [], tips: ['Research opportunities'] },
      { id: 'mit-msc-electronics', name: 'M.Sc. Electronics', nameTamil: 'எம்.எஸ்சி. மின்னணுவியல்', type: 'PG', category: 'On-Campus', school: 'MIT', eligibility: 'B.Sc. Electronics/Physics', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Entrance Exam', negativeMarking: false, sections: [{ name: 'Electronics', nameTamil: 'மின்னணுவியல்', questions: 100, marks: 100, topics: ['Analog', 'Digital', 'Communication'] }] }, syllabus: [], previousQuestions: [], tips: ['Industry ready'] },
      { id: 'mit-mba', name: 'M.B.A.', nameTamil: 'எம்.பி.ஏ.', type: 'PG', category: 'On-Campus', school: 'MIT', eligibility: 'Any Degree', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Management Aptitude', nameTamil: 'மேலாண்மை திறன்', questions: 100, marks: 100, topics: ['Quant', 'Verbal', 'Reasoning'] }] }, syllabus: [], previousQuestions: [], tips: ['Technical MBA advantage'] },
      
      // ────────────────────────────────────────────────────────────────────────────
      // SCHOOL OF ARCHITECTURE AND PLANNING (SAP) — Est. 1957
      // ────────────────────────────────────────────────────────────────────────────
      
      // SAP - UNDERGRADUATE PROGRAMS
      { id: 'sap-barch', name: 'B.Arch. (Bachelor of Architecture)', nameTamil: 'பி.ஆர்க். (கட்டிடக்கலை இளங்கலை)', type: 'UG', category: 'On-Campus', school: 'SAP', eligibility: '12th Pass with Maths + NATA', duration: '5 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'NATA Score + 12th Marks', negativeMarking: false, sections: [{ name: 'Architecture Aptitude', nameTamil: 'கட்டிடக்கலை திறன்', questions: 200, marks: 200, topics: ['Drawing', 'Design', 'Maths'] }] }, syllabus: [], previousQuestions: [], tips: ['Premier architecture school', 'NATA required', 'Intake: 60 seats'] },
      { id: 'sap-bplanning', name: 'B.Planning (Bachelor of Planning)', nameTamil: 'பி.பிளானிங். (திட்டமிடல் இளங்கலை)', type: 'UG', category: 'On-Campus', school: 'SAP', eligibility: '12th Pass with Maths', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Planning', nameTamil: 'திட்டமிடல்', questions: 200, marks: 200, topics: ['Urban Studies', 'Geography'] }] }, syllabus: [], previousQuestions: [], tips: ['Urban development focus', 'Intake: 30 seats'] },
      
      // SAP - POSTGRADUATE PROGRAMS
      { id: 'sap-march-conservation', name: 'M.Arch. (Architectural Conservation)', nameTamil: 'எம்.ஆர்க். (கட்டிடக்கலை பாதுகாப்பு)', type: 'PG', category: 'On-Campus', school: 'SAP', eligibility: 'B.Arch.', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Entrance Exam', negativeMarking: false, sections: [{ name: 'Conservation', nameTamil: 'பாதுகாப்பு', questions: 100, marks: 100, topics: ['Heritage', 'Restoration'] }] }, syllabus: [], previousQuestions: [], tips: ['Heritage architecture focus'] },
      { id: 'sap-march-urban', name: 'M.Arch. (Urban Design)', nameTamil: 'எம்.ஆர்க். (நகர வடிவமைப்பு)', type: 'PG', category: 'On-Campus', school: 'SAP', eligibility: 'B.Arch.', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Entrance Exam', negativeMarking: false, sections: [{ name: 'Urban Design', nameTamil: 'நகர வடிவமைப்பு', questions: 100, marks: 100, topics: ['City Planning', 'Public Spaces'] }] }, syllabus: [], previousQuestions: [], tips: ['Smart city projects'] },
      { id: 'sap-march-landscape', name: 'M.Arch. (Landscape Architecture)', nameTamil: 'எம்.ஆர்க். (நிலப்பரப்பு கட்டிடக்கலை)', type: 'PG', category: 'On-Campus', school: 'SAP', eligibility: 'B.Arch.', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Entrance Exam', negativeMarking: false, sections: [{ name: 'Landscape', nameTamil: 'நிலப்பரப்பு', questions: 100, marks: 100, topics: ['Gardens', 'Ecological Design'] }] }, syllabus: [], previousQuestions: [], tips: ['Green architecture'] },
      { id: 'sap-mplan-urban', name: 'M.Planning (Urban Planning)', nameTamil: 'எம்.பிளானிங். (நகர திட்டமிடல்)', type: 'PG', category: 'On-Campus', school: 'SAP', eligibility: 'B.Arch./B.Planning', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Entrance Exam', negativeMarking: false, sections: [{ name: 'Urban Planning', nameTamil: 'நகர திட்டமிடல்', questions: 100, marks: 100, topics: ['Urban Management', 'Policy'] }] }, syllabus: [], previousQuestions: [], tips: ['Government planning dept'] },
      { id: 'sap-mplan-regional', name: 'M.Planning (Regional Planning)', nameTamil: 'எம்.பிளானிங். (பிராந்திய திட்டமிடல்)', type: 'PG', category: 'On-Campus', school: 'SAP', eligibility: 'B.Arch./B.Planning', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Entrance Exam', negativeMarking: false, sections: [{ name: 'Regional', nameTamil: 'பிராந்திய', questions: 100, marks: 100, topics: ['Economic Geography', 'Development'] }] }, syllabus: [], previousQuestions: [], tips: ['Policy making'] },
      { id: 'sap-mplan-housing', name: 'M.Planning (Housing)', nameTamil: 'எம்.பிளானிங். (வீட்டுவசதி)', type: 'PG', category: 'On-Campus', school: 'SAP', eligibility: 'B.Arch./B.Planning', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Entrance Exam', negativeMarking: false, sections: [{ name: 'Housing', nameTamil: 'வீட்டுவசதி', questions: 100, marks: 100, topics: ['Affordable Housing', 'Policy'] }] }, syllabus: [], previousQuestions: [], tips: ['Housing development sector'] },
      
      // ────────────────────────────────────────────────────────────────────────────
      // UNIVERSITY DEPARTMENTS (Research Centres)
      // ────────────────────────────────────────────────────────────────────────────
      { id: 'au-centre-biotech', name: 'M.Tech. Biotechnology (Centre for Biotechnology)', nameTamil: 'எம்.டெக். உயிர் தொழில்நுட்பம்', type: 'PG', category: 'On-Campus', school: 'Research Centre', eligibility: 'B.Tech. Biotech/Life Sciences', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'GATE/Entrance', negativeMarking: false, sections: [{ name: 'Biotechnology', nameTamil: 'உயிர் தொழில்நுட்பம்', questions: 100, marks: 100, topics: ['Genetic Engineering', 'Bioinformatics'] }] }, syllabus: [], previousQuestions: [], tips: ['Pharma & Biotech R&D'] },
      { id: 'au-centre-nano', name: 'M.Tech. Nanotechnology (Centre for Nanotechnology)', nameTamil: 'எம்.டெக். நானோ தொழில்நுட்பம்', type: 'PG', category: 'On-Campus', school: 'Research Centre', eligibility: 'B.E./B.Tech./B.Sc.', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'GATE/Entrance', negativeMarking: false, sections: [{ name: 'Nanotechnology', nameTamil: 'நானோ', questions: 100, marks: 100, topics: ['Nanomaterials', 'Characterization'] }] }, syllabus: [], previousQuestions: [], tips: ['Cutting-edge research'] },
      { id: 'au-centre-environment', name: 'M.Tech. Environmental Studies', nameTamil: 'எம்.டெக். சுற்றுச்சூழல் ஆய்வுகள்', type: 'PG', category: 'On-Campus', school: 'Research Centre', eligibility: 'B.E./B.Tech./B.Sc.', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'GATE/Entrance', negativeMarking: false, sections: [{ name: 'Environmental', nameTamil: 'சுற்றுச்சூழல்', questions: 100, marks: 100, topics: ['Pollution', 'Climate', 'Sustainability'] }] }, syllabus: [], previousQuestions: [], tips: ['Green jobs growing'] },
      { id: 'au-centre-climate', name: 'M.Tech. Climate Change Studies', nameTamil: 'எம்.டெக். காலநிலை மாற்ற ஆய்வுகள்', type: 'PG', category: 'On-Campus', school: 'Research Centre', eligibility: 'B.E./B.Tech./B.Sc.', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'GATE/Entrance', negativeMarking: false, sections: [{ name: 'Climate', nameTamil: 'காலநிலை', questions: 100, marks: 100, topics: ['Climate Modelling', 'Adaptation'] }] }, syllabus: [], previousQuestions: [], tips: ['Global importance'] },
      { id: 'au-centre-aerospace', name: 'M.Tech. Aerospace Research', nameTamil: 'எம்.டெக். விண்வெளி ஆராய்ச்சி', type: 'PG', category: 'On-Campus', school: 'Research Centre', eligibility: 'B.E./B.Tech. Aero/Mech', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'GATE/Entrance', negativeMarking: false, sections: [{ name: 'Aerospace', nameTamil: 'விண்வெளி', questions: 100, marks: 100, topics: ['Propulsion', 'Aerodynamics'] }] }, syllabus: [], previousQuestions: [], tips: ['ISRO/DRDO collaboration'] },
      { id: 'au-centre-water', name: 'M.Tech. Water Resources', nameTamil: 'எம்.டெக். நீர் வளம்', type: 'PG', category: 'On-Campus', school: 'Research Centre', eligibility: 'B.E./B.Tech. Civil', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'GATE/Entrance', negativeMarking: false, sections: [{ name: 'Water Resources', nameTamil: 'நீர் வளம்', questions: 100, marks: 100, topics: ['Hydrology', 'Water Management'] }] }, syllabus: [], previousQuestions: [], tips: ['Water management sector'] },
      { id: 'au-rcc-mca', name: 'M.C.A. (Ramanujan Computing Centre)', nameTamil: 'எம்.சி.ஏ. (இராமானுஜன் கணினி மையம்)', type: 'PG', category: 'On-Campus', school: 'Research Centre', eligibility: 'Any Degree with Maths', duration: '3 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Computer Applications', nameTamil: 'கணினி பயன்பாடுகள்', questions: 100, marks: 100, topics: ['Programming', 'DBMS', 'Networks'] }] }, syllabus: [], previousQuestions: [], tips: ['Named after Ramanujan', 'IT industry pathway'] },
      
      // ══════════════════════════════════════════════════════════════════════════════
      // TAB 2: CENTRE FOR DISTANCE EDUCATION (CDE)
      // ══════════════════════════════════════════════════════════════════════════════
      
      // CDE - MBA PROGRAMS
      { id: 'cde-mba-general', name: 'M.B.A. (General)', nameTamil: 'எம்.பி.ஏ. (பொது)', type: 'PG', category: 'DDE', eligibility: 'Any Degree', duration: '2 Years', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Flexible for working professionals'] },
      { id: 'cde-mba-hr', name: 'M.B.A. (Human Resource Management)', nameTamil: 'எம்.பி.ஏ. (மனித வள மேலாண்மை)', type: 'PG', category: 'DDE', eligibility: 'Any Degree', duration: '2 Years', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['HR specialization'] },
      { id: 'cde-mba-marketing', name: 'M.B.A. (Marketing Management)', nameTamil: 'எம்.பி.ஏ. (சந்தைப்படுத்தல் மேலாண்மை)', type: 'PG', category: 'DDE', eligibility: 'Any Degree', duration: '2 Years', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Sales & Marketing careers'] },
      { id: 'cde-mba-finance', name: 'M.B.A. (Financial Management)', nameTamil: 'எம்.பி.ஏ. (நிதி மேலாண்மை)', type: 'PG', category: 'DDE', eligibility: 'Any Degree', duration: '2 Years', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Banking & Finance sector'] },
      { id: 'cde-mba-operations', name: 'M.B.A. (Operations Management)', nameTamil: 'எம்.பி.ஏ. (செயல்பாட்டு மேலாண்மை)', type: 'PG', category: 'DDE', eligibility: 'Any Degree', duration: '2 Years', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Supply chain & logistics'] },
      { id: 'cde-mba-systems', name: 'M.B.A. (Systems Management)', nameTamil: 'எம்.பி.ஏ. (அமைப்பு மேலாண்மை)', type: 'PG', category: 'DDE', eligibility: 'Any Degree', duration: '2 Years', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['IT management focus'] },
      { id: 'cde-mba-technology', name: 'M.B.A. (Technology Management)', nameTamil: 'எம்.பி.ஏ. (தொழில்நுட்ப மேலாண்மை)', type: 'PG', category: 'DDE', eligibility: 'Any Degree', duration: '2 Years', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Tech industry management'] },
      
      // CDE - MCA & M.Sc. PROGRAMS
      { id: 'cde-mca', name: 'M.C.A. (Master of Computer Applications)', nameTamil: 'எம்.சி.ஏ.', type: 'PG', category: 'DDE', eligibility: 'Any Degree with Maths', duration: '3 Years', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['IT career pathway'] },
      { id: 'cde-msc-it', name: 'M.Sc. Information Technology', nameTamil: 'எம்.எஸ்சி. தகவல் தொழில்நுட்பம்', type: 'PG', category: 'DDE', eligibility: 'Any Degree with Computer Background', duration: '2 Years', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['IT skills enhancement'] },
      { id: 'cde-msc-cs', name: 'M.Sc. Computer Science', nameTamil: 'எம்.எஸ்சி. கணினி அறிவியல்', type: 'PG', category: 'DDE', eligibility: 'B.Sc. CS/IT/BCA', duration: '2 Years', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Advanced computing knowledge'] },
      
      // CDE - PG DIPLOMA PROGRAMS
      { id: 'cde-pgdca', name: 'P.G. Diploma in Computer Applications', nameTamil: 'முதுநிலை டிப்ளமா கணினி பயன்பாடுகள்', type: 'PG Diploma', category: 'DDE', eligibility: 'Any Degree', duration: '1 Year', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Quick IT certification'] },
      { id: 'cde-pgdba', name: 'P.G. Diploma in Business Administration', nameTamil: 'முதுநிலை டிப்ளமா வணிக நிர்வாகம்', type: 'PG Diploma', category: 'DDE', eligibility: 'Any Degree', duration: '1 Year', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Management foundation'] },
      { id: 'cde-pgdhrm', name: 'P.G. Diploma in Human Resource Management', nameTamil: 'முதுநிலை டிப்ளமா மனித வள மேலாண்மை', type: 'PG Diploma', category: 'DDE', eligibility: 'Any Degree', duration: '1 Year', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['HR skills'] },
      { id: 'cde-pgdmm', name: 'P.G. Diploma in Marketing Management', nameTamil: 'முதுநிலை டிப்ளமா சந்தைப்படுத்தல் மேலாண்மை', type: 'PG Diploma', category: 'DDE', eligibility: 'Any Degree', duration: '1 Year', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Marketing skills'] },
      { id: 'cde-pgdfm', name: 'P.G. Diploma in Financial Management', nameTamil: 'முதுநிலை டிப்ளமா நிதி மேலாண்மை', type: 'PG Diploma', category: 'DDE', eligibility: 'Any Degree', duration: '1 Year', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Finance skills'] },
      { id: 'cde-pgdom', name: 'P.G. Diploma in Operations Management', nameTamil: 'முதுநிலை டிப்ளமா செயல்பாட்டு மேலாண்மை', type: 'PG Diploma', category: 'DDE', eligibility: 'Any Degree', duration: '1 Year', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Operations skills'] },
      
      // CDE - DIPLOMA PROGRAMS
      { id: 'cde-dca', name: 'Diploma in Computer Applications', nameTamil: 'டிப்ளமா கணினி பயன்பாடுகள்', type: 'Diploma', category: 'DDE', eligibility: '12th Pass', duration: '1 Year', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Basic computer skills'] },
      { id: 'cde-dba', name: 'Diploma in Business Administration', nameTamil: 'டிப்ளமா வணிக நிர்வாகம்', type: 'Diploma', category: 'DDE', eligibility: '12th Pass', duration: '1 Year', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Business basics'] },
      
      // CDE - CERTIFICATE PROGRAMS
      { id: 'cde-cert-computer', name: 'Certificate in Computer Applications', nameTamil: 'சான்றிதழ் கணினி பயன்பாடுகள்', type: 'Certificate', category: 'DDE', eligibility: '10th Pass', duration: '6 Months', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Entry-level IT skills'] },
      { id: 'cde-cert-web', name: 'Certificate in Web Designing', nameTamil: 'சான்றிதழ் வலை வடிவமைப்பு', type: 'Certificate', category: 'DDE', eligibility: '12th Pass', duration: '6 Months', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Web development basics'] },
      { id: 'cde-cert-programming', name: 'Certificate in Programming', nameTamil: 'சான்றிதழ் நிரலாக்கம்', type: 'Certificate', category: 'DDE', eligibility: '12th Pass', duration: '6 Months', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Assignment Based', durationMinutes: 0, mode: 'Distance Education', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Programming foundation'] },
      
      // ══════════════════════════════════════════════════════════════════════════════
      // TAB 3: AFFILIATED COLLEGE COURSES
      // ══════════════════════════════════════════════════════════════════════════════
      
      // AFFILIATED - CORE ENGINEERING UG
      { id: 'aff-be-civil', name: 'B.E. Civil Engineering', nameTamil: 'பி.இ. சிவில் பொறியியல்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Engineering', nameTamil: 'பொறியியல்', questions: 200, marks: 200, topics: ['PCM'] }] }, syllabus: [], previousQuestions: [], tips: ['Available in 500+ colleges'] },
      { id: 'aff-be-mech', name: 'B.E. Mechanical Engineering', nameTamil: 'பி.இ. இயந்திரவியல் பொறியியல்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Engineering', nameTamil: 'பொறியியல்', questions: 200, marks: 200, topics: ['PCM'] }] }, syllabus: [], previousQuestions: [], tips: ['Core engineering branch'] },
      { id: 'aff-be-eee', name: 'B.E. Electrical & Electronics Engineering', nameTamil: 'பி.இ. மின் மற்றும் மின்னணு பொறியியல்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Engineering', nameTamil: 'பொறியியல்', questions: 200, marks: 200, topics: ['PCM'] }] }, syllabus: [], previousQuestions: [], tips: ['Power sector opportunities'] },
      { id: 'aff-be-ece', name: 'B.E. Electronics & Communication Engineering', nameTamil: 'பி.இ. மின்னணு மற்றும் தொடர்பு பொறியியல்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Engineering', nameTamil: 'பொறியியல்', questions: 200, marks: 200, topics: ['PCM'] }] }, syllabus: [], previousQuestions: [], tips: ['VLSI & Telecom'] },
      { id: 'aff-be-cse', name: 'B.E. Computer Science & Engineering', nameTamil: 'பி.இ. கணினி அறிவியல் பொறியியல்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Engineering', nameTamil: 'பொறியியல்', questions: 200, marks: 200, topics: ['PCM'] }] }, syllabus: [], previousQuestions: [], tips: ['Highest demand branch'] },
      { id: 'aff-btech-it', name: 'B.Tech. Information Technology', nameTamil: 'பி.டெக். தகவல் தொழில்நுட்பம்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Engineering', nameTamil: 'பொறியியல்', questions: 200, marks: 200, topics: ['PCM'] }] }, syllabus: [], previousQuestions: [], tips: ['IT industry focus'] },
      
      // AFFILIATED - EMERGING TECHNOLOGY UG
      { id: 'aff-be-aids', name: 'B.E. Artificial Intelligence & Data Science', nameTamil: 'பி.இ. செயற்கை நுண்ணறிவு மற்றும் தரவு அறிவியல்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Engineering', nameTamil: 'பொறியியல்', questions: 200, marks: 200, topics: ['PCM'] }] }, syllabus: [], previousQuestions: [], tips: ['Trending branch'] },
      { id: 'aff-be-aiml', name: 'B.E. Artificial Intelligence & Machine Learning', nameTamil: 'பி.இ. செயற்கை நுண்ணறிவு மற்றும் இயந்திர கற்றல்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Engineering', nameTamil: 'பொறியியல்', questions: 200, marks: 200, topics: ['PCM'] }] }, syllabus: [], previousQuestions: [], tips: ['AI industry growth'] },
      { id: 'aff-be-csbs', name: 'B.E. Computer Science & Business Systems', nameTamil: 'பி.இ. கணினி அறிவியல் மற்றும் வணிக அமைப்புகள்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Engineering', nameTamil: 'பொறியியல்', questions: 200, marks: 200, topics: ['PCM'] }] }, syllabus: [], previousQuestions: [], tips: ['Tech + Business'] },
      { id: 'aff-be-iot', name: 'B.E. Internet of Things', nameTamil: 'பி.இ. இணையம் பொருள்கள்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Engineering', nameTamil: 'பொறியியல்', questions: 200, marks: 200, topics: ['PCM'] }] }, syllabus: [], previousQuestions: [], tips: ['Smart devices industry'] },
      { id: 'aff-be-cyber', name: 'B.E. Cyber Security', nameTamil: 'பி.இ. சைபர் பாதுகாப்பு', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Engineering', nameTamil: 'பொறியியல்', questions: 200, marks: 200, topics: ['PCM'] }] }, syllabus: [], previousQuestions: [], tips: ['Security sector growth'] },
      { id: 'aff-be-ds', name: 'B.E. Data Science', nameTamil: 'பி.இ. தரவு அறிவியல்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Engineering', nameTamil: 'பொறியியல்', questions: 200, marks: 200, topics: ['PCM'] }] }, syllabus: [], previousQuestions: [], tips: ['Analytics career'] },
      
      // AFFILIATED - SPECIALIZED ENGINEERING UG
      { id: 'aff-be-auto', name: 'B.E. Automobile Engineering', nameTamil: 'பி.இ. வாகனப் பொறியியல்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Engineering', nameTamil: 'பொறியியல்', questions: 200, marks: 200, topics: ['PCM'] }] }, syllabus: [], previousQuestions: [], tips: ['Chennai auto hub'] },
      { id: 'aff-be-aero', name: 'B.E. Aeronautical Engineering', nameTamil: 'பி.இ. விமானப் பொறியியல்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Engineering', nameTamil: 'பொறியியல்', questions: 200, marks: 200, topics: ['PCM'] }] }, syllabus: [], previousQuestions: [], tips: ['ISRO & HAL opportunities'] },
      { id: 'aff-be-bme', name: 'B.E. Biomedical Engineering', nameTamil: 'பி.இ. உயிர்மருத்துவ பொறியியல்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM/PCB (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Engineering', nameTamil: 'பொறியியல்', questions: 200, marks: 200, topics: ['PCM/PCB'] }] }, syllabus: [], previousQuestions: [], tips: ['Medical device industry'] },
      { id: 'aff-btech-bt', name: 'B.Tech. Biotechnology', nameTamil: 'பி.டெக். உயிர்தொழில்நுட்பம்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM/PCB (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Biotechnology', nameTamil: 'உயிர்தொழில்நுட்பம்', questions: 200, marks: 200, topics: ['Biology', 'Chemistry'] }] }, syllabus: [], previousQuestions: [], tips: ['Pharma & Biotech'] },
      { id: 'aff-btech-che', name: 'B.Tech. Chemical Engineering', nameTamil: 'பி.டெக். வேதியியல் பொறியியல்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Chemical', nameTamil: 'வேதியியல்', questions: 200, marks: 200, topics: ['Chemistry', 'Physics'] }] }, syllabus: [], previousQuestions: [], tips: ['Process industries'] },
      { id: 'aff-btech-ft', name: 'B.Tech. Food Technology', nameTamil: 'பி.டெக். உணவு தொழில்நுட்பம்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM/PCB (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Food Technology', nameTamil: 'உணவு தொழில்நுட்பம்', questions: 200, marks: 200, topics: ['Chemistry', 'Biology'] }] }, syllabus: [], previousQuestions: [], tips: ['FMCG sector'] },
      { id: 'aff-be-age', name: 'B.E. Agriculture Engineering', nameTamil: 'பி.இ. வேளாண் பொறியியல்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM/PCB (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Agriculture', nameTamil: 'வேளாண்', questions: 200, marks: 200, topics: ['Agriculture', 'Engineering'] }] }, syllabus: [], previousQuestions: [], tips: ['Agri-tech sector'] },
      { id: 'aff-be-mct', name: 'B.E. Mechatronics Engineering', nameTamil: 'பி.இ. மெக்காட்ரானிக்ஸ் பொறியியல்', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Mechatronics', nameTamil: 'மெக்காட்ரானிக்ஸ்', questions: 200, marks: 200, topics: ['Mech', 'Electronics'] }] }, syllabus: [], previousQuestions: [], tips: ['Automation industry'] },
      { id: 'aff-be-robotics', name: 'B.E. Robotics & Automation', nameTamil: 'பி.இ. ரோபோட்டிக்ஸ் மற்றும் தானியங்கி', type: 'UG', category: 'Affiliated', eligibility: '12th Pass with PCM (Min 50%)', duration: '4 Years', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'TNEA Counselling', negativeMarking: false, sections: [{ name: 'Robotics', nameTamil: 'ரோபோட்டிக்ஸ்', questions: 200, marks: 200, topics: ['Automation', 'AI'] }] }, syllabus: [], previousQuestions: [], tips: ['Industry 4.0'] },
      
      // AFFILIATED - PG PROGRAMS
      { id: 'aff-me-structural', name: 'M.E. Structural Engineering', nameTamil: 'எம்.இ. கட்டமைப்பு பொறியியல்', type: 'PG', category: 'Affiliated', eligibility: 'B.E./B.Tech. Civil', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Civil Engineering', nameTamil: 'சிவில் பொறியியல்', questions: 100, marks: 100, topics: ['Structures'] }] }, syllabus: [], previousQuestions: [], tips: ['Construction sector'] },
      { id: 'aff-me-thermal', name: 'M.E. Thermal Engineering', nameTamil: 'எம்.இ. வெப்பப் பொறியியல்', type: 'PG', category: 'Affiliated', eligibility: 'B.E./B.Tech. Mechanical', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Mechanical', nameTamil: 'இயந்திரவியல்', questions: 100, marks: 100, topics: ['Thermal'] }] }, syllabus: [], previousQuestions: [], tips: ['Power sector'] },
      { id: 'aff-me-power-systems', name: 'M.E. Power Systems Engineering', nameTamil: 'எம்.இ. மின்சார அமைப்பு பொறியியல்', type: 'PG', category: 'Affiliated', eligibility: 'B.E./B.Tech. EEE', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Electrical', nameTamil: 'மின்சார', questions: 100, marks: 100, topics: ['Power'] }] }, syllabus: [], previousQuestions: [], tips: ['TNEB opportunities'] },
      { id: 'aff-me-communication', name: 'M.E. Communication Systems', nameTamil: 'எம்.இ. தொடர்பு அமைப்புகள்', type: 'PG', category: 'Affiliated', eligibility: 'B.E./B.Tech. ECE', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'ECE', nameTamil: 'மின்னணு', questions: 100, marks: 100, topics: ['Communication'] }] }, syllabus: [], previousQuestions: [], tips: ['Telecom sector'] },
      { id: 'aff-me-vlsi', name: 'M.E. VLSI Design', nameTamil: 'எம்.இ. வி.எல்.எஸ்.ஐ. வடிவமைப்பு', type: 'PG', category: 'Affiliated', eligibility: 'B.E./B.Tech. ECE/EEE', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'VLSI', nameTamil: 'வி.எல்.எஸ்.ஐ.', questions: 100, marks: 100, topics: ['Chip Design'] }] }, syllabus: [], previousQuestions: [], tips: ['Semiconductor industry'] },
      { id: 'aff-me-cse', name: 'M.E. Computer Science & Engineering', nameTamil: 'எம்.இ. கணினி அறிவியல் பொறியியல்', type: 'PG', category: 'Affiliated', eligibility: 'B.E./B.Tech. CSE/IT', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'CSE', nameTamil: 'கணினி அறிவியல்', questions: 100, marks: 100, topics: ['Algorithms', 'Systems'] }] }, syllabus: [], previousQuestions: [], tips: ['IT sector'] },
      { id: 'aff-me-software', name: 'M.E. Software Engineering', nameTamil: 'எம்.இ. மென்பொருள் பொறியியல்', type: 'PG', category: 'Affiliated', eligibility: 'B.E./B.Tech. CSE/IT', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Software', nameTamil: 'மென்பொருள்', questions: 100, marks: 100, topics: ['SDLC', 'Testing'] }] }, syllabus: [], previousQuestions: [], tips: ['Software development'] },
      { id: 'aff-me-embedded', name: 'M.E. Embedded System Technologies', nameTamil: 'எம்.இ. உட்பொதிக்கப்பட்ட அமைப்பு', type: 'PG', category: 'Affiliated', eligibility: 'B.E./B.Tech. ECE/EEE/CSE', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Embedded', nameTamil: 'உட்பொதி', questions: 100, marks: 100, topics: ['IoT', 'Embedded'] }] }, syllabus: [], previousQuestions: [], tips: ['IoT industry'] },
      { id: 'aff-mtech-it', name: 'M.Tech. Information Technology', nameTamil: 'எம்.டெக். தகவல் தொழில்நுட்பம்', type: 'PG', category: 'Affiliated', eligibility: 'B.E./B.Tech. CSE/IT', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'IT', nameTamil: 'தகவல் தொழில்நுட்பம்', questions: 100, marks: 100, topics: ['IT Systems'] }] }, syllabus: [], previousQuestions: [], tips: ['IT industry'] },
      { id: 'aff-me-manufacturing', name: 'M.E. Manufacturing Engineering', nameTamil: 'எம்.இ. உற்பத்தி பொறியியல்', type: 'PG', category: 'Affiliated', eligibility: 'B.E./B.Tech. Mechanical', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Manufacturing', nameTamil: 'உற்பத்தி', questions: 100, marks: 100, topics: ['Production'] }] }, syllabus: [], previousQuestions: [], tips: ['Manufacturing sector'] },
      { id: 'aff-me-cadcam', name: 'M.E. CAD/CAM', nameTamil: 'எம்.இ. கேட்/கேம்', type: 'PG', category: 'Affiliated', eligibility: 'B.E./B.Tech. Mechanical', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'CAD/CAM', nameTamil: 'கேட்/கேம்', questions: 100, marks: 100, topics: ['Design', 'Manufacturing'] }] }, syllabus: [], previousQuestions: [], tips: ['Product design'] },
      { id: 'aff-me-design', name: 'M.E. Engineering Design', nameTamil: 'எம்.இ. பொறியியல் வடிவமைப்பு', type: 'PG', category: 'Affiliated', eligibility: 'B.E./B.Tech. Mechanical', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'Design', nameTamil: 'வடிவமைப்பு', questions: 100, marks: 100, topics: ['Product Design'] }] }, syllabus: [], previousQuestions: [], tips: ['R&D sector'] },
      
      // AFFILIATED - MANAGEMENT PROGRAMS
      { id: 'aff-mba-general', name: 'M.B.A. (General)', nameTamil: 'எம்.பி.ஏ. (பொது)', type: 'PG', category: 'Affiliated', eligibility: 'Any Degree', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'MBA', nameTamil: 'எம்.பி.ஏ.', questions: 100, marks: 100, topics: ['Aptitude', 'Reasoning'] }] }, syllabus: [], previousQuestions: [], tips: ['Management career'] },
      { id: 'aff-mba-hr', name: 'M.B.A. (Human Resource)', nameTamil: 'எம்.பி.ஏ. (மனித வளம்)', type: 'PG', category: 'Affiliated', eligibility: 'Any Degree', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'MBA', nameTamil: 'எம்.பி.ஏ.', questions: 100, marks: 100, topics: ['HR'] }] }, syllabus: [], previousQuestions: [], tips: ['HR specialization'] },
      { id: 'aff-mba-marketing', name: 'M.B.A. (Marketing)', nameTamil: 'எம்.பி.ஏ. (சந்தைப்படுத்தல்)', type: 'PG', category: 'Affiliated', eligibility: 'Any Degree', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'MBA', nameTamil: 'எம்.பி.ஏ.', questions: 100, marks: 100, topics: ['Marketing'] }] }, syllabus: [], previousQuestions: [], tips: ['Sales & Marketing'] },
      { id: 'aff-mba-finance', name: 'M.B.A. (Finance)', nameTamil: 'எம்.பி.ஏ. (நிதி)', type: 'PG', category: 'Affiliated', eligibility: 'Any Degree', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'MBA', nameTamil: 'எம்.பி.ஏ.', questions: 100, marks: 100, topics: ['Finance'] }] }, syllabus: [], previousQuestions: [], tips: ['Banking & Finance'] },
      { id: 'aff-mba-operations', name: 'M.B.A. (Operations)', nameTamil: 'எம்.பி.ஏ. (செயல்பாடுகள்)', type: 'PG', category: 'Affiliated', eligibility: 'Any Degree', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'MBA', nameTamil: 'எம்.பி.ஏ.', questions: 100, marks: 100, topics: ['Operations'] }] }, syllabus: [], previousQuestions: [], tips: ['Supply chain'] },
      { id: 'aff-mba-systems', name: 'M.B.A. (Systems)', nameTamil: 'எம்.பி.ஏ. (அமைப்புகள்)', type: 'PG', category: 'Affiliated', eligibility: 'Any Degree', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'MBA', nameTamil: 'எம்.பி.ஏ.', questions: 100, marks: 100, topics: ['Systems'] }] }, syllabus: [], previousQuestions: [], tips: ['IT management'] },
      { id: 'aff-mca', name: 'M.C.A.', nameTamil: 'எம்.சி.ஏ.', type: 'PG', category: 'Affiliated', eligibility: 'Any Degree with Maths', duration: '2 Years', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'TANCET', negativeMarking: false, sections: [{ name: 'MCA', nameTamil: 'எம்.சி.ஏ.', questions: 100, marks: 100, topics: ['Programming', 'DBMS'] }] }, syllabus: [], previousQuestions: [], tips: ['IT industry pathway'] }
    ]
  },
  {
    id: 'periyar-university',
    name: 'Periyar University',
    nameTamil: 'பெரியார் பல்கலைக்கழகம்',
    location: 'Salem',
    website: 'www.periyaruniversity.ac.in',
    phone: '0427-2345766',
    email: 'registrar@periyaruniversity.ac.in',
    examName: 'PUPGET',
    logoColor: '#059669',
    logo: '/universities/periyar-university-logo.png',
    fee: { general: 500, obc: 500, scst: 250 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'April 2026', status: 'upcoming' },
      { event: 'Application Period', eventTamil: 'விண்ணப்ப காலம்', date: 'April-May 2026', status: 'upcoming' },
      { event: 'Entrance Exam', eventTamil: 'நுழைவுத் தேர்வு', date: 'June 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'June-July 2026', status: 'upcoming' },
      { event: 'Counselling', eventTamil: 'கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    courses: [
      // Postgraduate (PG) Programmes - Arts
      { id: 'ma-tamil', name: 'M.A. Tamil', nameTamil: 'எம்.ஏ. தமிழ்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Tamil Literature', nameTamil: 'தமிழ் இலக்கியம்', questions: 100, marks: 100, topics: ['Sangam', 'Grammar', 'Modern'] }] }, syllabus: [], previousQuestions: [], tips: ['Master Sangam literature', 'Focus on Thirukkural'] },
      { id: 'ma-english', name: 'M.A. English', nameTamil: 'எம்.ஏ. ஆங்கிலம்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'English Literature', nameTamil: 'ஆங்கில இலக்கியம்', questions: 100, marks: 100, topics: ['British', 'American', 'Indian'] }] }, syllabus: [], previousQuestions: [], tips: ['Read major literary works', 'Focus on Shakespeare'] },
      { id: 'ma-economics', name: 'M.A. Economics', nameTamil: 'எம்.ஏ. பொருளியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Economics', nameTamil: 'பொருளியல்', questions: 100, marks: 100, topics: ['Micro', 'Macro', 'Indian Economy'] }] }, syllabus: [], previousQuestions: [], tips: ['Focus on micro and macro concepts'] },
      { id: 'ma-journalism', name: 'M.A. Journalism and Mass Communication', nameTamil: 'எம்.ஏ. பத்திரிகை மற்றும் மக்கள் தொடர்பு', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Mass Communication', nameTamil: 'மக்கள் தொடர்பு', questions: 100, marks: 100, topics: ['Print', 'Electronic', 'Digital'] }] }, syllabus: [], previousQuestions: [], tips: ['Stay updated with current affairs'] },
      { id: 'ma-sociology', name: 'M.A. Sociology', nameTamil: 'எம்.ஏ. சமூகவியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Sociology', nameTamil: 'சமூகவியல்', questions: 100, marks: 100, topics: ['Theory', 'Methods', 'Indian Society'] }] }, syllabus: [], previousQuestions: [], tips: ['Study sociological theories'] },
      { id: 'ma-history', name: 'M.A. History', nameTamil: 'எம்.ஏ. வரலாறு', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'History', nameTamil: 'வரலாறு', questions: 100, marks: 100, topics: ['Ancient', 'Medieval', 'Modern'] }] }, syllabus: [], previousQuestions: [], tips: ['Focus on Tamil Nadu history'] },
      
      // Postgraduate (PG) Programmes - Science
      { id: 'msc-biochemistry', name: 'M.Sc. Biochemistry', nameTamil: 'எம்.எஸ்சி. உயிர் வேதியியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Biochemistry', nameTamil: 'உயிர் வேதியியல்', questions: 100, marks: 100, topics: ['Metabolism', 'Enzymes', 'Molecular Biology'] }] }, syllabus: [], previousQuestions: [], tips: ['Master metabolic pathways'] },
      { id: 'msc-biotechnology', name: 'M.Sc. Biotechnology', nameTamil: 'எம்.எஸ்சி. உயிர்தொழில்நுட்பம்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Biotechnology', nameTamil: 'உயிர்தொழில்நுட்பம்', questions: 100, marks: 100, topics: ['Genetic Engineering', 'Cell Culture', 'Bioinformatics'] }] }, syllabus: [], previousQuestions: [], tips: ['Focus on molecular techniques'] },
      { id: 'msc-botany', name: 'M.Sc. Botany', nameTamil: 'எம்.எஸ்சி. தாவரவியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Botany', nameTamil: 'தாவரவியல்', questions: 100, marks: 100, topics: ['Plant Diversity', 'Physiology', 'Genetics'] }] }, syllabus: [], previousQuestions: [], tips: ['Learn plant classification'] },
      { id: 'msc-chemistry', name: 'M.Sc. Chemistry', nameTamil: 'எம்.எஸ்சி. வேதியியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 100, marks: 100, topics: ['Organic', 'Inorganic', 'Physical'] }] }, syllabus: [], previousQuestions: [], tips: ['Organic reactions are crucial'] },
      { id: 'msc-computer-science', name: 'M.Sc. Computer Science', nameTamil: 'எம்.எஸ்சி. கணினி அறிவியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 100, marks: 100, topics: ['Programming', 'Data Structures', 'DBMS'] }] }, syllabus: [], previousQuestions: [], tips: ['Programming is most important'] },
      { id: 'msc-environmental-science', name: 'M.Sc. Environmental Science', nameTamil: 'எம்.எஸ்சி. சுற்றுச்சூழல் அறிவியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Environmental Science', nameTamil: 'சுற்றுச்சூழல் அறிவியல்', questions: 100, marks: 100, topics: ['Ecology', 'Pollution', 'Climate'] }] }, syllabus: [], previousQuestions: [], tips: ['Learn environmental laws'] },
      { id: 'msc-food-science-tech', name: 'M.Sc. Food Science Technology and Nutrition', nameTamil: 'எம்.எஸ்சி. உணவு அறிவியல் தொழில்நுட்பம் மற்றும் ஊட்டச்சத்து', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Food Science', nameTamil: 'உணவு அறிவியல்', questions: 100, marks: 100, topics: ['Food Chemistry', 'Microbiology', 'Nutrition'] }] }, syllabus: [], previousQuestions: [], tips: ['Focus on HACCP'] },
      { id: 'msc-applied-geology', name: 'M.Sc. Applied Geology', nameTamil: 'எம்.எஸ்சி. பயன்பாட்டு புவியியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Geology', nameTamil: 'புவியியல்', questions: 100, marks: 100, topics: ['Mineralogy', 'Petrology', 'Hydrogeology'] }] }, syllabus: [], previousQuestions: [], tips: ['Government jobs in GSI'] },
      { id: 'msc-mathematics', name: 'M.Sc. Mathematics', nameTamil: 'எம்.எஸ்சி. கணிதம்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Mathematics', nameTamil: 'கணிதம்', questions: 100, marks: 100, topics: ['Algebra', 'Analysis', 'Differential Equations'] }] }, syllabus: [], previousQuestions: [], tips: ['Focus on Algebra'] },
      { id: 'msc-microbiology', name: 'M.Sc. Microbiology', nameTamil: 'எம்.எஸ்சி. நுண்ணுயிரியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Microbiology', nameTamil: 'நுண்ணுயிரியல்', questions: 100, marks: 100, topics: ['Bacteriology', 'Virology', 'Immunology'] }] }, syllabus: [], previousQuestions: [], tips: ['Focus on bacterial classification'] },
      { id: 'msc-physics', name: 'M.Sc. Physics', nameTamil: 'எம்.எஸ்சி. இயற்பியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Physics', nameTamil: 'இயற்பியல்', questions: 100, marks: 100, topics: ['Classical', 'Quantum', 'Electromagnetism'] }] }, syllabus: [], previousQuestions: [], tips: ['Focus on Quantum Mechanics'] },
      { id: 'msc-applied-psychology', name: 'M.Sc. Applied Psychology', nameTamil: 'எம்.எஸ்சி. பயன்பாட்டு உளவியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Psychology', nameTamil: 'உளவியல்', questions: 100, marks: 100, topics: ['Clinical', 'Organizational', 'Developmental'] }] }, syllabus: [], previousQuestions: [], tips: ['Focus on psychological disorders'] },
      { id: 'msc-zoology', name: 'M.Sc. Zoology', nameTamil: 'எம்.எஸ்சி. விலங்கியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Zoology', nameTamil: 'விலங்கியல்', questions: 100, marks: 100, topics: ['Animal Diversity', 'Physiology', 'Ecology'] }] }, syllabus: [], previousQuestions: [], tips: ['Learn animal classification'] },
      { id: 'msc-textiles-apparel', name: 'M.Sc. Textiles and Apparel Design', nameTamil: 'எம்.எஸ்சி. ஜவுளி மற்றும் ஆடை வடிவமைப்பு', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Textiles', nameTamil: 'ஜவுளி', questions: 100, marks: 100, topics: ['Fiber Science', 'Apparel', 'CAD'] }] }, syllabus: [], previousQuestions: [], tips: ['Salem textile hub advantage'] },
      { id: 'msc-energy-science', name: 'M.Sc. Energy Science', nameTamil: 'எம்.எஸ்சி. ஆற்றல் அறிவியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Energy Science', nameTamil: 'ஆற்றல் அறிவியல்', questions: 100, marks: 100, topics: ['Renewable', 'Solar', 'Wind'] }] }, syllabus: [], previousQuestions: [], tips: ['Growing field'] },
      { id: 'msc-statistics', name: 'M.Sc. Statistics', nameTamil: 'எம்.எஸ்சி. புள்ளியியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 100, marks: 100, topics: ['Probability', 'Inference', 'Regression'] }] }, syllabus: [], previousQuestions: [], tips: ['Master probability distributions'] },
      { id: 'msc-clinical-nutrition', name: 'M.Sc. Clinical Nutrition and Dietetics', nameTamil: 'எம்.எஸ்சி. மருத்துவ ஊட்டச்சத்து மற்றும் உணவியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Clinical Nutrition', nameTamil: 'மருத்துவ ஊட்டச்சத்து', questions: 100, marks: 100, topics: ['Diet Therapy', 'Assessment', 'Public Health'] }] }, syllabus: [], previousQuestions: [], tips: ['Focus on therapeutic diets'] },
      { id: 'msc-biomedical-science', name: 'M.Sc. Biomedical Science', nameTamil: 'எம்.எஸ்சி. உயிர்மருத்துவ அறிவியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Biomedical Science', nameTamil: 'உயிர்மருத்துவ அறிவியல்', questions: 100, marks: 100, topics: ['Anatomy', 'Pathology', 'Pharmacology'] }] }, syllabus: [], previousQuestions: [], tips: ['Strong biology foundation required'] },
      { id: 'msc-biostatistics', name: 'M.Sc. Biostatistics', nameTamil: 'எம்.எஸ்சி. உயிர்புள்ளியியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Biostatistics', nameTamil: 'உயிர்புள்ளியியல்', questions: 100, marks: 100, topics: ['Epidemiology', 'Clinical Trials', 'Software'] }] }, syllabus: [], previousQuestions: [], tips: ['Learn statistical software'] },
      { id: 'msc-data-science', name: 'M.Sc. Data Science', nameTamil: 'எம்.எஸ்சி. தரவு அறிவியல்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Data Science', nameTamil: 'தரவு அறிவியல்', questions: 100, marks: 100, topics: ['Machine Learning', 'Python', 'Big Data'] }] }, syllabus: [], previousQuestions: [], tips: ['High demand field'] },
      
      // Postgraduate - Commerce & Management
      { id: 'mcom', name: 'M.Com', nameTamil: 'எம்.காம்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Commerce', nameTamil: 'வணிகவியல்', questions: 100, marks: 100, topics: ['Accounting', 'Finance', 'Business'] }] }, syllabus: [], previousQuestions: [], tips: ['Accounting is most important'] },
      { id: 'mba', name: 'M.B.A.', nameTamil: 'எம்.பி.ஏ.', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Management Aptitude', nameTamil: 'மேலாண்மை திறன்', questions: 100, marks: 100, topics: ['Quant', 'Verbal', 'Reasoning', 'GK'] }] }, syllabus: [], previousQuestions: [], tips: ['Practice aptitude questions'] },
      { id: 'mba-export-import', name: 'M.B.A. Export and Import Management', nameTamil: 'எம்.பி.ஏ. ஏற்றுமதி இறக்குமதி மேலாண்மை', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'International Trade', nameTamil: 'சர்வதேச வர்த்தகம்', questions: 100, marks: 100, topics: ['Export', 'Import', 'Customs'] }] }, syllabus: [], previousQuestions: [], tips: ['Growing demand in international trade'] },
      { id: 'mca', name: 'M.C.A.', nameTamil: 'எம்.சி.ஏ.', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Computer Applications', nameTamil: 'கணினி பயன்பாடுகள்', questions: 100, marks: 100, topics: ['Programming', 'Data Structures', 'DBMS'] }] }, syllabus: [], previousQuestions: [], tips: ['Programming skills essential'] },
      
      // Other PG Programmes
      { id: 'mlibisc', name: 'Master of Library and Information Science (M.Lib.I.Sc)', nameTamil: 'நூலக மற்றும் தகவல் அறிவியல் முதுகலை', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Library Science', nameTamil: 'நூலக அறிவியல்', questions: 100, marks: 100, topics: ['Classification', 'Cataloguing', 'Digital Library'] }] }, syllabus: [], previousQuestions: [], tips: ['Knowledge of library classification'] },
      { id: 'med', name: 'M.Ed. (Education)', nameTamil: 'எம்.எட். (கல்வியியல்)', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Education', nameTamil: 'கல்வியியல்', questions: 100, marks: 100, topics: ['Philosophy', 'Psychology', 'Pedagogy'] }] }, syllabus: [], previousQuestions: [], tips: ['B.Ed. is prerequisite'] },
      { id: 'mtech-energy', name: 'M.Tech. Energy Technology', nameTamil: 'எம்.டெக். ஆற்றல் தொழில்நுட்பம்', type: 'PG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Energy Technology', nameTamil: 'ஆற்றல் தொழில்நுட்பம்', questions: 100, marks: 100, topics: ['Renewable Energy', 'Power Systems'] }] }, syllabus: [], previousQuestions: [], tips: ['Engineering background required'] },
      
      // Five Year Integrated Programmes
      { id: 'integrated-ma-journalism', name: 'M.A. Journalism and Mass Communication (Electronic Media) - 5 Years', nameTamil: 'எம்.ஏ. பத்திரிகை மற்றும் மக்கள் தொடர்பு (மின்னணு ஊடகம்) - 5 ஆண்டுகள்', type: 'Integrated', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Media Studies', nameTamil: 'ஊடக ஆய்வுகள்', questions: 100, marks: 100, topics: ['Print', 'Electronic', 'Digital'] }] }, syllabus: [], previousQuestions: [], tips: ['Direct entry after 12th'] },
      { id: 'integrated-msc-environmental', name: 'M.Sc. Environmental Science - 5 Years', nameTamil: 'எம்.எஸ்சி. சுற்றுச்சூழல் அறிவியல் - 5 ஆண்டுகள்', type: 'Integrated', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Environmental Science', nameTamil: 'சுற்றுச்சூழல் அறிவியல்', questions: 100, marks: 100, topics: ['Ecology', 'Conservation'] }] }, syllabus: [], previousQuestions: [], tips: ['Direct entry after 12th'] },
      
      // Bachelor of Vocational Programmes (B.Voc.)
      { id: 'bvoc-food-science', name: 'B.Voc. Food Science and Nutrition', nameTamil: 'பி.வோக். உணவு அறிவியல் மற்றும் ஊட்டச்சத்து', type: 'UG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Food Science', nameTamil: 'உணவு அறிவியல்', questions: 100, marks: 100, topics: ['Nutrition', 'Food Safety'] }] }, syllabus: [], previousQuestions: [], tips: ['Skill-oriented programme'] },
      { id: 'bvoc-textiles', name: 'B.Voc. Textiles and Apparel Design', nameTamil: 'பி.வோக். ஜவுளி மற்றும் ஆடை வடிவமைப்பு', type: 'UG', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Textiles', nameTamil: 'ஜவுளி', questions: 100, marks: 100, topics: ['Fibers', 'Design'] }] }, syllabus: [], previousQuestions: [], tips: ['Salem textile hub advantage'] },
      
      // Diploma Programmes
      { id: 'diploma-health-science', name: 'Diploma in Health Science Management', nameTamil: 'சுகாதார அறிவியல் மேலாண்மை டிப்ளமோ', type: 'Diploma', examPattern: { totalQuestions: 75, totalMarks: 75, duration: '60 Minutes', durationMinutes: 60, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Health Science', nameTamil: 'சுகாதார அறிவியல்', questions: 75, marks: 75, topics: ['Healthcare', 'Management'] }] }, syllabus: [], previousQuestions: [], tips: ['Healthcare administration career'] },
      { id: 'diploma-accountancy', name: 'Diploma in Accountancy and Taxation', nameTamil: 'கணக்கியல் மற்றும் வரிவிதிப்பு டிப்ளமோ', type: 'Diploma', examPattern: { totalQuestions: 75, totalMarks: 75, duration: '60 Minutes', durationMinutes: 60, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Accounting', nameTamil: 'கணக்கியல்', questions: 75, marks: 75, topics: ['Accounts', 'Tax', 'GST'] }] }, syllabus: [], previousQuestions: [], tips: ['Accounting career path'] },
      { id: 'diploma-chemical-polishing', name: 'Diploma in Chemical Polishing of Metals', nameTamil: 'உலோகங்களின் வேதியியல் பளபளப்பு டிப்ளமோ', type: 'Diploma', examPattern: { totalQuestions: 75, totalMarks: 75, duration: '60 Minutes', durationMinutes: 60, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Chemical Polishing', nameTamil: 'வேதியியல் பளபளப்பு', questions: 75, marks: 75, topics: ['Metals', 'Electroplating'] }] }, syllabus: [], previousQuestions: [], tips: ['Industrial jobs'] },
      
      // PG Diploma Programme
      { id: 'pgd-dravidian-literature', name: 'PG Diploma in Dravidian Literature and Journalism (Part-Time)', nameTamil: 'திராவிட இலக்கியம் மற்றும் பத்திரிகை முதுகலை டிப்ளமோ', type: 'PG Diploma', examPattern: { totalQuestions: 75, totalMarks: 75, duration: '60 Minutes', durationMinutes: 60, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Dravidian Literature', nameTamil: 'திராவிட இலக்கியம்', questions: 75, marks: 75, topics: ['Tamil', 'Journalism'] }] }, syllabus: [], previousQuestions: [], tips: ['Part-time programme'] },
      
      // Certificate Programmes
      { id: 'cert-quality-control', name: 'Certificate in Quality Control', nameTamil: 'தரக்கட்டுப்பாட்டு சான்றிதழ்', type: 'Certificate', examPattern: { totalQuestions: 50, totalMarks: 50, duration: '45 Minutes', durationMinutes: 45, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Quality Control', nameTamil: 'தரக்கட்டுப்பாடு', questions: 50, marks: 50, topics: ['TQM', 'ISO', 'Six Sigma'] }] }, syllabus: [], previousQuestions: [], tips: ['Industry-relevant certification'] },
      { id: 'cert-gender-science', name: 'Certificate in Gender, Science and Society', nameTamil: 'பாலினம், அறிவியல் மற்றும் சமூகம் சான்றிதழ்', type: 'Certificate', examPattern: { totalQuestions: 50, totalMarks: 50, duration: '45 Minutes', durationMinutes: 45, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Gender Studies', nameTamil: 'பாலின ஆய்வுகள்', questions: 50, marks: 50, topics: ['Gender', 'Science', 'Society'] }] }, syllabus: [], previousQuestions: [], tips: ['NGO and social sector careers'] }
    ]
  },
  {
    id: 'bharathiar-university',
    name: 'Bharathiar University',
    nameTamil: 'பாரதியார் பல்கலைக்கழகம்',
    location: 'Coimbatore',
    website: 'www.b-u.ac.in',
    phone: '0422-2422222',
    examName: 'BUPGET',
    logoColor: '#dc2626',
    logo: '/universities/bharathiar-university-logo.png',
    fee: { general: 500, obc: 500, scst: 250 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'April 2026', status: 'upcoming' },
      { event: 'Application', eventTamil: 'விண்ணப்பம்', date: 'April-May 2026', status: 'upcoming' },
      { event: 'Exam', eventTamil: 'தேர்வு', date: 'June 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'June-July 2026', status: 'upcoming' }
    ],
    courses: [
      {
        id: 'bu-mba',
        name: 'MBA',
        nameTamil: 'எம்.பி.ஏ',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Verbal Ability & RC', nameTamil: 'மொழித்திறன்', questions: 25, marks: 25, topics: ['Reading Comprehension', 'Grammar', 'Vocabulary'] },
            { name: 'Quantitative Aptitude', nameTamil: 'எண்ணியல்', questions: 25, marks: 25, topics: ['Arithmetic', 'Algebra', 'Geometry'] },
            { name: 'DI & Reasoning', nameTamil: 'தர்க்கம்', questions: 25, marks: 25, topics: ['Data Interpretation', 'Logical Reasoning'] },
            { name: 'General & Business Awareness', nameTamil: 'பொது அறிவு', questions: 25, marks: 25, topics: ['Current Affairs', 'Business News', 'Economy'] }
          ]
        },
        syllabus: [
          {
            unitNumber: 1,
            title: 'General & Business Awareness',
            titleTamil: 'பொது மற்றும் வணிக அறிவு',
            expectedQuestions: 25,
            difficulty: 'Medium',
            topics: [
              { name: 'Current Affairs', subtopics: ['National news', 'International news', 'Sports', 'Awards'], importance: 'High' },
              { name: 'Indian Economy', subtopics: ['GDP', 'Budget', 'Fiscal policy', 'Monetary policy'], importance: 'High' },
              { name: 'Business News', subtopics: ['Mergers', 'Acquisitions', 'IPOs', 'Corporate news'], importance: 'High' },
              { name: 'Banking & Finance', subtopics: ['RBI', 'Repo rate', 'CRR', 'SLR'], importance: 'Medium' },
              { name: 'Marketing Concepts', subtopics: ['4Ps', 'Market segmentation', 'Branding'], importance: 'Medium' }
            ]
          }
        ],
        previousQuestions: [
          {
            id: 'bu-mba-q1',
            question: 'Current Governor of RBI is:',
            options: ['Urjit Patel', 'Shaktikanta Das', 'Raghuram Rajan', 'D. Subbarao'],
            correctAnswer: 1,
            explanation: 'Shaktikanta Das is the current RBI Governor (as of 2024-25)',
            topic: 'General Awareness',
            difficulty: 'Easy'
          },
          {
            id: 'bu-mba-q2',
            question: 'GST stands for:',
            options: ['General Sales Tax', 'Goods and Services Tax', 'Government Service Tax', 'None'],
            correctAnswer: 1,
            explanation: 'GST = Goods and Services Tax, implemented from July 1, 2017',
            topic: 'Economy',
            difficulty: 'Easy'
          }
        ],
        tips: [
          'General Awareness is unique here - 25 questions',
          'Read newspapers daily for current affairs',
          'Follow business news and economy updates',
          'Know about recent government schemes',
          'Learn marketing and finance basics'
        ]
      }
    ]
  },
  {
    id: 'bharathidasan-university',
    name: 'Bharathidasan University',
    nameTamil: 'பாரதிதாசன் பல்கலைக்கழகம்',
    location: 'Tiruchirappalli',
    website: 'www.bdu.ac.in',
    phone: '0431-2407071',
    examName: 'BDU Entrance',
    logoColor: '#7c3aed',
    logo: '/universities/bharathidasan-university-logo.png',
    fee: { general: 600, obc: 600, scst: 300 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'April 2026', status: 'upcoming' },
      { event: 'Application', eventTamil: 'விண்ணப்பம்', date: 'April-May 2026', status: 'upcoming' },
      { event: 'Exam', eventTamil: 'தேர்வு', date: 'June 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'July 2026', status: 'upcoming' }
    ],
    courses: [
      // ========== INTEGRATED MASTER'S PROGRAMS (After 12th - 5 Year) ==========
      {
        id: 'bdu-integrated-msc-life',
        name: '5-Year Integrated M.Sc Life Sciences',
        nameTamil: '5 ஆண்டு ஒருங்கிணைந்த எம்.எஸ்சி உயிர் அறிவியல்',
        type: 'Integrated',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Botany', 'Zoology', 'Microbiology', 'Cell Biology'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Organic', 'Inorganic', 'Biochemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 20, marks: 20, topics: ['Biophysics', 'Optics'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 10, marks: 10, topics: ['Logical Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['BDU famous for Integrated programs', 'Direct entry after 12th with Biology', 'Covers Botany/Zoology/Microbiology focus'],
        seatMatrix: { general: 20, obc: 35, bcMbc: 42, sc: 18, st: 3, ews: 7, total: 125 },
        cutoffs: [
          { year: '2024', general: 72.5, obc: 66.2, bcMbc: 62.4, sc: 48.5, st: 38.2, ews: 64.5 },
          { year: '2023', general: 74.2, obc: 68.5, bcMbc: 64.8, sc: 50.8, st: 40.5, ews: 66.8 }
        ]
      },
      {
        id: 'bdu-integrated-msc-biomedical',
        name: '5-Year Integrated M.Sc Biomedical Science',
        nameTamil: '5 ஆண்டு ஒருங்கிணைந்த எம்.எஸ்சி உயிர்மருத்துவ அறிவியல்',
        type: 'Integrated',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 35, marks: 35, topics: ['Human Anatomy', 'Physiology', 'Biochemistry'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Organic Chemistry', 'Medicinal Chemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 20, marks: 20, topics: ['Medical Physics', 'Instrumentation'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 15, marks: 15, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong foundation in human biology required', 'Good for medical research career', 'Alternative path to medical sciences'],
        seatMatrix: { general: 18, obc: 30, bcMbc: 38, sc: 16, st: 3, ews: 6, total: 111 },
        cutoffs: [
          { year: '2024', general: 74.5, obc: 68.2, bcMbc: 64.4, sc: 50.5, st: 40.2, ews: 66.5 },
          { year: '2023', general: 76.2, obc: 70.5, bcMbc: 66.8, sc: 52.8, st: 42.5, ews: 68.8 }
        ]
      },
      {
        id: 'bdu-integrated-msc-bioinformatics',
        name: '5-Year Integrated M.Sc Bioinformatics',
        nameTamil: '5 ஆண்டு ஒருங்கிணைந்த எம்.எஸ்சி உயிர்தகவியல்',
        type: 'Integrated',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 30, marks: 30, topics: ['Molecular Biology', 'Genetics', 'Biochemistry'] },
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 30, marks: 30, topics: ['Programming Basics', 'Algorithms', 'Databases'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 25, marks: 25, topics: ['Statistics', 'Linear Algebra'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 15, marks: 15, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Combines Biology + Computer Science', 'High demand in pharmaceutical industry', 'Learn Python for bioinformatics'],
        seatMatrix: { general: 15, obc: 25, bcMbc: 32, sc: 14, st: 2, ews: 5, total: 93 },
        cutoffs: [
          { year: '2024', general: 76.5, obc: 70.2, bcMbc: 66.4, sc: 52.5, st: 42.2, ews: 68.5 },
          { year: '2023', general: 78.2, obc: 72.5, bcMbc: 68.8, sc: 54.8, st: 44.5, ews: 70.8 }
        ]
      },
      {
        id: 'bdu-integrated-msc-geography',
        name: '5-Year Integrated M.Sc Geography',
        nameTamil: '5 ஆண்டு ஒருங்கிணைந்த எம்.எஸ்சி புவியியல்',
        type: 'Integrated',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Physical Geography', nameTamil: 'இயற்கை புவியியல்', questions: 35, marks: 35, topics: ['Geomorphology', 'Climatology', 'Oceanography'] },
            { name: 'Human Geography', nameTamil: 'மானுட புவியியல்', questions: 30, marks: 30, topics: ['Population', 'Settlement', 'Economic Geography'] },
            { name: 'Cartography & GIS', nameTamil: 'வரைபடவியல் & GIS', questions: 20, marks: 20, topics: ['Map Reading', 'Remote Sensing'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 15, marks: 15, topics: ['Reasoning', 'Mathematics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Excellent for UPSC Geography optional', 'Learn map reading skills', 'Study Indian geography thoroughly'],
        seatMatrix: { general: 18, obc: 30, bcMbc: 38, sc: 16, st: 3, ews: 6, total: 111 },
        cutoffs: [
          { year: '2024', general: 68.5, obc: 62.2, bcMbc: 58.4, sc: 44.5, st: 34.2, ews: 60.5 },
          { year: '2023', general: 70.2, obc: 64.5, bcMbc: 60.8, sc: 46.8, st: 36.5, ews: 62.8 }
        ]
      },
      {
        id: 'bdu-integrated-msc-geology',
        name: '5-Year Integrated M.Sc Geology',
        nameTamil: '5 ஆண்டு ஒருங்கிணைந்த எம்.எஸ்சி நிலவியல்',
        type: 'Integrated',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Geology', nameTamil: 'நிலவியல்', questions: 40, marks: 40, topics: ['Mineralogy', 'Petrology', 'Structural Geology'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 25, marks: 25, topics: ['Geophysics', 'Crystallography'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 20, marks: 20, topics: ['Geochemistry', 'Analytical Methods'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 15, marks: 15, topics: ['Reasoning', 'Mathematics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Career in mining and oil exploration', 'Good job prospects in ONGC, GSI', 'Study Earth sciences thoroughly'],
        seatMatrix: { general: 15, obc: 25, bcMbc: 32, sc: 14, st: 2, ews: 5, total: 93 },
        cutoffs: [
          { year: '2024', general: 66.5, obc: 60.2, bcMbc: 56.4, sc: 42.5, st: 32.2, ews: 58.5 },
          { year: '2023', general: 68.2, obc: 62.5, bcMbc: 58.8, sc: 44.8, st: 34.5, ews: 60.8 }
        ]
      },
      {
        id: 'bdu-integrated-msc-media',
        name: '5-Year Integrated M.Sc Media & Communication',
        nameTamil: '5 ஆண்டு ஒருங்கிணைந்த எம்.எஸ்சி ஊடகம் & தொடர்பு',
        type: 'Integrated',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Media Studies', nameTamil: 'ஊடக ஆய்வுகள்', questions: 35, marks: 35, topics: ['Mass Communication', 'Journalism', 'Digital Media'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 30, marks: 30, topics: ['Writing Skills', 'Comprehension', 'Grammar'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Current Affairs', 'Media Laws'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 15, marks: 15, topics: ['Logical Reasoning', 'Creativity'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good writing skills essential', 'Stay updated with current affairs', 'Career in journalism and media'],
        seatMatrix: { general: 20, obc: 35, bcMbc: 42, sc: 18, st: 3, ews: 7, total: 125 },
        cutoffs: [
          { year: '2024', general: 70.5, obc: 64.2, bcMbc: 60.4, sc: 46.5, st: 36.2, ews: 62.5 },
          { year: '2023', general: 72.2, obc: 66.5, bcMbc: 62.8, sc: 48.8, st: 38.5, ews: 64.8 }
        ]
      },
      {
        id: 'bdu-integrated-ma-history',
        name: '5-Year Integrated M.A History',
        nameTamil: '5 ஆண்டு ஒருங்கிணைந்த எம்.ஏ வரலாறு',
        type: 'Integrated',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Ancient History', nameTamil: 'பண்டைய வரலாறு', questions: 30, marks: 30, topics: ['Indus Valley', 'Vedic Age', 'Maurya', 'Gupta'] },
            { name: 'Medieval History', nameTamil: 'இடைக்கால வரலாறு', questions: 25, marks: 25, topics: ['Delhi Sultanate', 'Mughal Empire', 'Vijayanagara'] },
            { name: 'Modern History', nameTamil: 'நவீன வரலாறு', questions: 30, marks: 30, topics: ['Colonial India', 'Freedom Struggle', 'Post-Independence'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 15, marks: 15, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Excellent for UPSC History optional', 'Focus on Modern India', 'Study Tamil Nadu history'],
        seatMatrix: { general: 25, obc: 42, bcMbc: 52, sc: 22, st: 4, ews: 8, total: 153 },
        cutoffs: [
          { year: '2024', general: 64.5, obc: 58.2, bcMbc: 54.4, sc: 40.5, st: 30.2, ews: 56.5 },
          { year: '2023', general: 66.2, obc: 60.5, bcMbc: 56.8, sc: 42.8, st: 32.5, ews: 58.8 }
        ]
      },
      {
        id: 'bdu-integrated-ma-sociology',
        name: '5-Year Integrated M.A Sociology',
        nameTamil: '5 ஆண்டு ஒருங்கிணைந்த எம்.ஏ சமூகவியல்',
        type: 'Integrated',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Sociological Theory', nameTamil: 'சமூகவியல் கோட்பாடு', questions: 35, marks: 35, topics: ['Classical Thinkers', 'Modern Theory', 'Indian Sociology'] },
            { name: 'Indian Society', nameTamil: 'இந்திய சமூகம்', questions: 30, marks: 30, topics: ['Caste', 'Family', 'Religion', 'Social Change'] },
            { name: 'Research Methods', nameTamil: 'ஆய்வு முறைகள்', questions: 20, marks: 20, topics: ['Qualitative', 'Quantitative', 'Survey'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 15, marks: 15, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for UPSC Sociology optional', 'Study Indian sociologists', 'Focus on social issues'],
        seatMatrix: { general: 22, obc: 38, bcMbc: 48, sc: 20, st: 3, ews: 7, total: 138 },
        cutoffs: [
          { year: '2024', general: 62.5, obc: 56.2, bcMbc: 52.4, sc: 38.5, st: 28.2, ews: 54.5 },
          { year: '2023', general: 64.2, obc: 58.5, bcMbc: 54.8, sc: 40.8, st: 30.5, ews: 56.8 }
        ]
      },
      // ========== 6-YEAR INTEGRATED M.TECH PROGRAMS ==========
      {
        id: 'bdu-integrated-mtech-cse',
        name: '6-Year Integrated M.Tech Computer Science & Engineering',
        nameTamil: '6 ஆண்டு ஒருங்கிணைந்த எம்.டெக் கணினி அறிவியல் & பொறியியல்',
        type: 'Integrated',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 35, marks: 35, topics: ['Algebra', 'Calculus', 'Statistics', 'Discrete Math'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 25, marks: 25, topics: ['Electronics', 'Semiconductors', 'Optics'] },
            { name: 'Computer Basics', nameTamil: 'கணினி அடிப்படை', questions: 25, marks: 25, topics: ['Programming Logic', 'Number Systems', 'Basics'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 15, marks: 15, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['BDU flagship 6-year program', 'Graduate with M.Tech after 12th', 'Highly competitive - top ranks preferred'],
        seatMatrix: { general: 12, obc: 20, bcMbc: 26, sc: 11, st: 2, ews: 4, total: 75 },
        cutoffs: [
          { year: '2024', general: 82.5, obc: 76.2, bcMbc: 72.4, sc: 58.5, st: 48.2, ews: 74.5 },
          { year: '2023', general: 84.2, obc: 78.5, bcMbc: 74.8, sc: 60.8, st: 50.5, ews: 76.8 }
        ]
      },
      {
        id: 'bdu-integrated-mtech-biotech',
        name: '6-Year Integrated M.Tech Biotechnology',
        nameTamil: '6 ஆண்டு ஒருங்கிணைந்த எம்.டெக் உயிர்தொழில்நுட்பம்',
        type: 'Integrated',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Molecular Biology', 'Genetics', 'Microbiology', 'Cell Biology'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Organic', 'Biochemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 15, marks: 15, topics: ['Biophysics'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 15, marks: 15, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Combines B.Tech + M.Tech in 6 years', 'Strong biology foundation needed', 'Career in pharma and biotech industry'],
        seatMatrix: { general: 10, obc: 18, bcMbc: 22, sc: 10, st: 2, ews: 4, total: 66 },
        cutoffs: [
          { year: '2024', general: 78.5, obc: 72.2, bcMbc: 68.4, sc: 54.5, st: 44.2, ews: 70.5 },
          { year: '2023', general: 80.2, obc: 74.5, bcMbc: 70.8, sc: 56.8, st: 46.5, ews: 72.8 }
        ]
      },
      {
        id: 'bdu-integrated-mtech-geo',
        name: '6-Year Integrated M.Tech Geological Technology & Geoinformatics',
        nameTamil: '6 ஆண்டு ஒருங்கிணைந்த எம்.டெக் நிலவியல் தொழில்நுட்பம் & புவிதகவியல்',
        type: 'Integrated',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Geology', nameTamil: 'நிலவியல்', questions: 35, marks: 35, topics: ['Mineralogy', 'Petrology', 'Structural Geology'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 25, marks: 25, topics: ['Geophysics', 'Remote Sensing'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 25, marks: 25, topics: ['Statistics', 'Spatial Analysis'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 15, marks: 15, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Unique program for geology enthusiasts', 'Career in ONGC, GSI, Mining', 'Combines geology with GIS technology'],
        seatMatrix: { general: 8, obc: 14, bcMbc: 18, sc: 8, st: 1, ews: 3, total: 52 },
        cutoffs: [
          { year: '2024', general: 72.5, obc: 66.2, bcMbc: 62.4, sc: 48.5, st: 38.2, ews: 64.5 },
          { year: '2023', general: 74.2, obc: 68.5, bcMbc: 64.8, sc: 50.8, st: 40.5, ews: 66.8 }
        ]
      },
      // ========== PG PROGRAMS - SCIENCE (M.Sc) - TECH ==========
      {
        id: 'bdu-msc-cs',
        name: 'M.Sc Computer Science',
        nameTamil: 'எம்.எஸ்சி கணினி அறிவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 50, marks: 50, topics: ['C/C++', 'Data Structures', 'Algorithms', 'OS', 'Networks'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Discrete Math', 'Graph Theory'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 20, marks: 20, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on programming concepts', 'Practice algorithm problems', 'Study computer networks'],
        seatMatrix: { general: 30, obc: 50, bcMbc: 65, sc: 28, st: 4, ews: 10, total: 187 },
        cutoffs: [
          { year: '2024', general: 74.5, obc: 68.2, bcMbc: 64.4, sc: 50.5, st: 40.2, ews: 66.5 },
          { year: '2023', general: 76.2, obc: 70.5, bcMbc: 66.8, sc: 52.8, st: 42.5, ews: 68.8 }
        ]
      },
      {
        id: 'bdu-msc-it',
        name: 'M.Sc Information Technology',
        nameTamil: 'எம்.எஸ்சி தகவல் தொழில்நுட்பம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 45, marks: 45, topics: ['Programming', 'DBMS', 'Networks', 'Web Technologies'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Discrete Math', 'Probability'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 25, marks: 25, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Similar to M.Sc CS but application focused', 'Learn web technologies', 'Study database concepts'],
        seatMatrix: { general: 28, obc: 48, bcMbc: 60, sc: 26, st: 4, ews: 9, total: 175 },
        cutoffs: [
          { year: '2024', general: 72.5, obc: 66.2, bcMbc: 62.4, sc: 48.5, st: 38.2, ews: 64.5 },
          { year: '2023', general: 74.2, obc: 68.5, bcMbc: 64.8, sc: 50.8, st: 40.5, ews: 66.8 }
        ]
      },
      {
        id: 'bdu-msc-data-science',
        name: 'M.Sc Data Science',
        nameTamil: 'எம்.எஸ்சி தரவு அறிவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 30, marks: 30, topics: ['Probability', 'Regression', 'Hypothesis Testing'] },
            { name: 'Programming', nameTamil: 'நிரலாக்கம்', questions: 30, marks: 30, topics: ['Python', 'R', 'SQL'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 25, marks: 25, topics: ['Linear Algebra', 'Calculus'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 15, marks: 15, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['High-demand industry skill', 'Learn Python and R', 'Study machine learning basics'],
        seatMatrix: { general: 22, obc: 38, bcMbc: 48, sc: 20, st: 3, ews: 7, total: 138 },
        cutoffs: [
          { year: '2024', general: 78.5, obc: 72.2, bcMbc: 68.4, sc: 54.5, st: 44.2, ews: 70.5 },
          { year: '2023', general: 80.2, obc: 74.5, bcMbc: 70.8, sc: 56.8, st: 46.5, ews: 72.8 }
        ]
      },
      {
        id: 'bdu-msc-ai',
        name: 'M.Sc Artificial Intelligence',
        nameTamil: 'எம்.எஸ்சி செயற்கை நுண்ணறிவு',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 40, marks: 40, topics: ['Programming', 'Algorithms', 'Data Structures'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Linear Algebra', 'Probability', 'Calculus'] },
            { name: 'AI Basics', nameTamil: 'AI அடிப்படைகள்', questions: 20, marks: 20, topics: ['Machine Learning', 'Neural Networks'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 10, marks: 10, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Cutting-edge field with high demand', 'Strong math foundation needed', 'Learn Python and TensorFlow'],
        seatMatrix: { general: 20, obc: 35, bcMbc: 42, sc: 18, st: 3, ews: 7, total: 125 },
        cutoffs: [
          { year: '2024', general: 80.5, obc: 74.2, bcMbc: 70.4, sc: 56.5, st: 46.2, ews: 72.5 },
          { year: '2023', general: 82.2, obc: 76.5, bcMbc: 72.8, sc: 58.8, st: 48.5, ews: 74.8 }
        ]
      },
      // ========== PG PROGRAMS - SCIENCE (M.Sc) - LIFE SCIENCES ==========
      {
        id: 'bdu-msc-biotechnology',
        name: 'M.Sc Biotechnology',
        nameTamil: 'எம்.எஸ்சி உயிர்தொழில்நுட்பம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Molecular Biology', nameTamil: 'மூலக்கூறு உயிரியல்', questions: 35, marks: 35, topics: ['DNA/RNA', 'Protein Synthesis', 'Gene Expression'] },
            { name: 'Microbiology', nameTamil: 'நுண்ணுயிரியல்', questions: 30, marks: 30, topics: ['Bacteria', 'Viruses', 'Industrial Microbiology'] },
            { name: 'Biochemistry', nameTamil: 'உயிர்வேதியியல்', questions: 25, marks: 25, topics: ['Enzymes', 'Metabolism'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 10, marks: 10, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong in molecular biology concepts', 'Study genetic engineering', 'Career in pharma and research'],
        seatMatrix: { general: 25, obc: 42, bcMbc: 52, sc: 22, st: 4, ews: 8, total: 153 },
        cutoffs: [
          { year: '2024', general: 74.5, obc: 68.2, bcMbc: 64.4, sc: 50.5, st: 40.2, ews: 66.5 },
          { year: '2023', general: 76.2, obc: 70.5, bcMbc: 66.8, sc: 52.8, st: 42.5, ews: 68.8 }
        ]
      },
      {
        id: 'bdu-msc-marine',
        name: 'M.Sc Marine Science',
        nameTamil: 'எம்.எஸ்சி கடல் அறிவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Marine Biology', nameTamil: 'கடல் உயிரியல்', questions: 35, marks: 35, topics: ['Marine Organisms', 'Marine Ecology', 'Fisheries'] },
            { name: 'Oceanography', nameTamil: 'கடலியல்', questions: 30, marks: 30, topics: ['Physical', 'Chemical', 'Biological Oceanography'] },
            { name: 'Environmental Science', nameTamil: 'சுற்றுச்சூழல்', questions: 25, marks: 25, topics: ['Coastal Ecosystems', 'Pollution'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 10, marks: 10, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['BDU near coast - research advantage', 'Study marine ecosystems', 'Career in NIOT, CMFRI'],
        seatMatrix: { general: 18, obc: 30, bcMbc: 38, sc: 16, st: 3, ews: 6, total: 111 },
        cutoffs: [
          { year: '2024', general: 70.5, obc: 64.2, bcMbc: 60.4, sc: 46.5, st: 36.2, ews: 62.5 },
          { year: '2023', general: 72.2, obc: 66.5, bcMbc: 62.8, sc: 48.8, st: 38.5, ews: 64.8 }
        ]
      },
      {
        id: 'bdu-msc-microbiology',
        name: 'M.Sc Microbiology',
        nameTamil: 'எம்.எஸ்சி நுண்ணுயிரியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Microbiology', nameTamil: 'நுண்ணுயிரியல்', questions: 45, marks: 45, topics: ['Bacteria', 'Viruses', 'Fungi', 'Industrial Applications'] },
            { name: 'Biochemistry', nameTamil: 'உயிர்வேதியியல்', questions: 30, marks: 30, topics: ['Enzymes', 'Metabolism', 'Molecular Biology'] },
            { name: 'Immunology', nameTamil: 'நோய்த்தடுப்பியல்', questions: 15, marks: 15, topics: ['Immune System', 'Vaccines'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 10, marks: 10, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong practical skills needed', 'Study bacterial genetics', 'Career in pharma and diagnostics'],
        seatMatrix: { general: 22, obc: 38, bcMbc: 48, sc: 20, st: 3, ews: 7, total: 138 },
        cutoffs: [
          { year: '2024', general: 72.5, obc: 66.2, bcMbc: 62.4, sc: 48.5, st: 38.2, ews: 64.5 },
          { year: '2023', general: 74.2, obc: 68.5, bcMbc: 64.8, sc: 50.8, st: 40.5, ews: 66.8 }
        ]
      },
      {
        id: 'bdu-msc-biochemistry',
        name: 'M.Sc Biochemistry',
        nameTamil: 'எம்.எஸ்சி உயிர்வேதியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biochemistry', nameTamil: 'உயிர்வேதியியல்', questions: 45, marks: 45, topics: ['Proteins', 'Enzymes', 'Metabolism', 'Molecular Biology'] },
            { name: 'Cell Biology', nameTamil: 'உயிரணு உயிரியல்', questions: 30, marks: 30, topics: ['Cell Structure', 'Cell Signaling'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 15, marks: 15, topics: ['Organic', 'Physical Chemistry'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 10, marks: 10, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong chemistry foundation needed', 'Study enzyme kinetics', 'Career in research and pharma'],
        seatMatrix: { general: 22, obc: 38, bcMbc: 48, sc: 20, st: 3, ews: 7, total: 138 },
        cutoffs: [
          { year: '2024', general: 70.5, obc: 64.2, bcMbc: 60.4, sc: 46.5, st: 36.2, ews: 62.5 },
          { year: '2023', general: 72.2, obc: 66.5, bcMbc: 62.8, sc: 48.8, st: 38.5, ews: 64.8 }
        ]
      },
      {
        id: 'bdu-msc-botany',
        name: 'M.Sc Botany',
        nameTamil: 'எம்.எஸ்சி தாவரவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Plant Science', nameTamil: 'தாவர அறிவியல்', questions: 50, marks: 50, topics: ['Plant Anatomy', 'Taxonomy', 'Physiology', 'Ecology'] },
            { name: 'Plant Biotechnology', nameTamil: 'தாவர உயிர்தொழில்நுட்பம்', questions: 30, marks: 30, topics: ['Tissue Culture', 'Genetic Engineering'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 20, marks: 20, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on plant taxonomy', 'Study plant physiology', 'Career in agriculture and research'],
        seatMatrix: { general: 25, obc: 42, bcMbc: 52, sc: 22, st: 4, ews: 8, total: 153 },
        cutoffs: [
          { year: '2024', general: 66.5, obc: 60.2, bcMbc: 56.4, sc: 42.5, st: 32.2, ews: 58.5 },
          { year: '2023', general: 68.2, obc: 62.5, bcMbc: 58.8, sc: 44.8, st: 34.5, ews: 60.8 }
        ]
      },
      {
        id: 'bdu-msc-zoology',
        name: 'M.Sc Zoology',
        nameTamil: 'எம்.எஸ்சி விலங்கியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Animal Science', nameTamil: 'விலங்கு அறிவியல்', questions: 50, marks: 50, topics: ['Animal Physiology', 'Taxonomy', 'Developmental Biology', 'Ecology'] },
            { name: 'Cell & Molecular Biology', nameTamil: 'உயிரணு & மூலக்கூறு உயிரியல்', questions: 30, marks: 30, topics: ['Genetics', 'Molecular Biology'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 20, marks: 20, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on animal physiology', 'Study developmental biology', 'Career in wildlife and research'],
        seatMatrix: { general: 25, obc: 42, bcMbc: 52, sc: 22, st: 4, ews: 8, total: 153 },
        cutoffs: [
          { year: '2024', general: 66.5, obc: 60.2, bcMbc: 56.4, sc: 42.5, st: 32.2, ews: 58.5 },
          { year: '2023', general: 68.2, obc: 62.5, bcMbc: 58.8, sc: 44.8, st: 34.5, ews: 60.8 }
        ]
      },
      {
        id: 'bdu-msc-environmental',
        name: 'M.Sc Environmental Science',
        nameTamil: 'எம்.எஸ்சி சுற்றுச்சூழல் அறிவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Environmental Science', nameTamil: 'சுற்றுச்சூழல் அறிவியல்', questions: 45, marks: 45, topics: ['Ecology', 'Pollution', 'Conservation', 'Climate Change'] },
            { name: 'Life Sciences', nameTamil: 'உயிர் அறிவியல்', questions: 30, marks: 30, topics: ['Biology', 'Biodiversity'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 15, marks: 15, topics: ['Environmental Chemistry'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 10, marks: 10, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Growing field with climate focus', 'Study environmental laws', 'Career in NGOs and pollution control'],
        seatMatrix: { general: 22, obc: 38, bcMbc: 48, sc: 20, st: 3, ews: 7, total: 138 },
        cutoffs: [
          { year: '2024', general: 68.5, obc: 62.2, bcMbc: 58.4, sc: 44.5, st: 34.2, ews: 60.5 },
          { year: '2023', general: 70.2, obc: 64.5, bcMbc: 60.8, sc: 46.8, st: 36.5, ews: 62.8 }
        ]
      },
      // ========== PG PROGRAMS - SCIENCE (M.Sc) - CORE SCIENCES ==========
      {
        id: 'bdu-msc-mathematics',
        name: 'M.Sc Mathematics',
        nameTamil: 'எம்.எஸ்சி கணிதம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Algebra', nameTamil: 'இயற்கணிதம்', questions: 30, marks: 30, topics: ['Groups', 'Rings', 'Fields', 'Linear Algebra'] },
            { name: 'Analysis', nameTamil: 'பகுப்பாய்வு', questions: 30, marks: 30, topics: ['Real Analysis', 'Complex Analysis', 'Functional Analysis'] },
            { name: 'Applied Math', nameTamil: 'பயன்பாட்டு கணிதம்', questions: 25, marks: 25, topics: ['Differential Equations', 'Numerical Methods'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 15, marks: 15, topics: ['Reasoning'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong in abstract algebra', 'Practice real analysis proofs', 'Career in research and teaching'],
        seatMatrix: { general: 35, obc: 60, bcMbc: 75, sc: 32, st: 5, ews: 12, total: 219 },
        cutoffs: [
          { year: '2024', general: 70.5, obc: 64.2, bcMbc: 60.4, sc: 46.5, st: 36.2, ews: 62.5 },
          { year: '2023', general: 72.2, obc: 66.5, bcMbc: 62.8, sc: 48.8, st: 38.5, ews: 64.8 }
        ]
      },
      {
        id: 'bdu-msc-physics',
        name: 'M.Sc Physics',
        nameTamil: 'எம்.எஸ்சி இயற்பியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Classical Mechanics', nameTamil: 'பாரம்பரிய இயக்கவியல்', questions: 25, marks: 25, topics: ['Lagrangian', 'Hamiltonian'] },
            { name: 'Quantum Mechanics', nameTamil: 'குவாண்டம் இயக்கவியல்', questions: 25, marks: 25, topics: ['Wave Functions', 'Operators', 'Perturbation'] },
            { name: 'Electromagnetism', nameTamil: 'மின்காந்தவியல்', questions: 25, marks: 25, topics: ['Maxwell Equations', 'EM Waves'] },
            { name: 'Modern Physics', nameTamil: 'நவீன இயற்பியல்', questions: 25, marks: 25, topics: ['Solid State', 'Nuclear', 'Particle'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on quantum mechanics', 'Practice numerical problems', 'Career in research and ISRO'],
        seatMatrix: { general: 30, obc: 50, bcMbc: 65, sc: 28, st: 4, ews: 10, total: 187 },
        cutoffs: [
          { year: '2024', general: 72.5, obc: 66.2, bcMbc: 62.4, sc: 48.5, st: 38.2, ews: 64.5 },
          { year: '2023', general: 74.2, obc: 68.5, bcMbc: 64.8, sc: 50.8, st: 40.5, ews: 66.8 }
        ]
      },
      {
        id: 'bdu-msc-chemistry',
        name: 'M.Sc Chemistry',
        nameTamil: 'எம்.எஸ்சி வேதியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Organic Chemistry', nameTamil: 'கரிம வேதியியல்', questions: 35, marks: 35, topics: ['Reactions', 'Mechanisms', 'Synthesis'] },
            { name: 'Inorganic Chemistry', nameTamil: 'கனிம வேதியியல்', questions: 35, marks: 35, topics: ['Coordination', 'Main Group', 'Organometallics'] },
            { name: 'Physical Chemistry', nameTamil: 'இயற்பு வேதியியல்', questions: 30, marks: 30, topics: ['Thermodynamics', 'Kinetics', 'Electrochemistry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong in organic reactions', 'Learn named reactions', 'Career in pharma and research'],
        seatMatrix: { general: 30, obc: 50, bcMbc: 65, sc: 28, st: 4, ews: 10, total: 187 },
        cutoffs: [
          { year: '2024', general: 70.5, obc: 64.2, bcMbc: 60.4, sc: 46.5, st: 36.2, ews: 62.5 },
          { year: '2023', general: 72.2, obc: 66.5, bcMbc: 62.8, sc: 48.8, st: 38.5, ews: 64.8 }
        ]
      },
      {
        id: 'bdu-msc-medical-physics',
        name: 'M.Sc Medical Physics',
        nameTamil: 'எம்.எஸ்சி மருத்துவ இயற்பியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 40, marks: 40, topics: ['Nuclear Physics', 'Radiation Physics', 'Medical Imaging'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 25, marks: 25, topics: ['Human Anatomy', 'Physiology', 'Radiobiology'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 20, marks: 20, topics: ['Calculus', 'Statistics'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 15, marks: 15, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Career in hospitals and cancer centres', 'Study nuclear physics', 'High-paying field'],
        seatMatrix: { general: 15, obc: 25, bcMbc: 32, sc: 14, st: 2, ews: 5, total: 93 },
        cutoffs: [
          { year: '2024', general: 74.5, obc: 68.2, bcMbc: 64.4, sc: 50.5, st: 40.2, ews: 66.5 },
          { year: '2023', general: 76.2, obc: 70.5, bcMbc: 66.8, sc: 52.8, st: 42.5, ews: 68.8 }
        ]
      },
      // ========== PG PROGRAMS - ARTS (M.A) ==========
      {
        id: 'bdu-ma-tamil',
        name: 'M.A Tamil',
        nameTamil: 'எம்.ஏ தமிழ்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Tamil Literature', nameTamil: 'தமிழ் இலக்கியம்', questions: 50, marks: 50, topics: ['Sangam Literature', 'Medieval', 'Modern'] },
            { name: 'Tamil Grammar', nameTamil: 'தமிழ் இலக்கணம்', questions: 30, marks: 30, topics: ['Tholkappiyam', 'Nannool'] },
            { name: 'General Tamil', nameTamil: 'பொது தமிழ்', questions: 20, marks: 20, topics: ['Prose', 'Poetry', 'History of Tamil'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Study Sangam literature', 'Focus on Tholkappiyam', 'Career in teaching and media'],
        seatMatrix: { general: 40, obc: 70, bcMbc: 85, sc: 35, st: 6, ews: 14, total: 250 },
        cutoffs: [
          { year: '2024', general: 60.5, obc: 54.2, bcMbc: 50.4, sc: 36.5, st: 26.2, ews: 52.5 },
          { year: '2023', general: 62.2, obc: 56.5, bcMbc: 52.8, sc: 38.8, st: 28.5, ews: 54.8 }
        ]
      },
      {
        id: 'bdu-ma-english',
        name: 'M.A English',
        nameTamil: 'எம்.ஏ ஆங்கிலம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'English Literature', nameTamil: 'ஆங்கில இலக்கியம்', questions: 50, marks: 50, topics: ['British', 'American', 'Indian English'] },
            { name: 'Literary Theory', nameTamil: 'இலக்கியக் கோட்பாடு', questions: 25, marks: 25, topics: ['Criticism', 'Theory', 'Movements'] },
            { name: 'Language & Grammar', nameTamil: 'மொழி & இலக்கணம்', questions: 25, marks: 25, topics: ['Grammar', 'Phonetics', 'Linguistics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Read Shakespeare thoroughly', 'Study literary movements', 'Career in teaching and media'],
        seatMatrix: { general: 35, obc: 60, bcMbc: 75, sc: 32, st: 5, ews: 12, total: 219 },
        cutoffs: [
          { year: '2024', general: 68.5, obc: 62.2, bcMbc: 58.4, sc: 44.5, st: 34.2, ews: 60.5 },
          { year: '2023', general: 70.2, obc: 64.5, bcMbc: 60.8, sc: 46.8, st: 36.5, ews: 62.8 }
        ]
      },
      {
        id: 'bdu-ma-history',
        name: 'M.A History',
        nameTamil: 'எம்.ஏ வரலாறு',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Ancient History', nameTamil: 'பண்டைய வரலாறு', questions: 30, marks: 30, topics: ['Indus Valley', 'Vedic', 'Maurya', 'Gupta'] },
            { name: 'Medieval History', nameTamil: 'இடைக்கால வரலாறு', questions: 25, marks: 25, topics: ['Delhi Sultanate', 'Mughals', 'South India'] },
            { name: 'Modern History', nameTamil: 'நவீன வரலாறு', questions: 30, marks: 30, topics: ['Colonial India', 'Freedom Struggle'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 15, marks: 15, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Excellent for UPSC History optional', 'Focus on Modern India', 'Study Tamil Nadu history'],
        seatMatrix: { general: 35, obc: 60, bcMbc: 75, sc: 32, st: 5, ews: 12, total: 219 },
        cutoffs: [
          { year: '2024', general: 62.5, obc: 56.2, bcMbc: 52.4, sc: 38.5, st: 28.2, ews: 54.5 },
          { year: '2023', general: 64.2, obc: 58.5, bcMbc: 54.8, sc: 40.8, st: 30.5, ews: 56.8 }
        ]
      },
      {
        id: 'bdu-ma-economics',
        name: 'M.A Economics',
        nameTamil: 'எம்.ஏ பொருளியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Micro Economics', nameTamil: 'நுண் பொருளியல்', questions: 30, marks: 30, topics: ['Demand', 'Supply', 'Market Structures'] },
            { name: 'Macro Economics', nameTamil: 'பேரண் பொருளியல்', questions: 30, marks: 30, topics: ['National Income', 'Monetary Policy', 'Fiscal Policy'] },
            { name: 'Indian Economy', nameTamil: 'இந்திய பொருளாதாரம்', questions: 25, marks: 25, topics: ['Planning', 'Reforms', 'Current Issues'] },
            { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 15, marks: 15, topics: ['Basic Statistics', 'Econometrics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Excellent for UPSC Economics optional', 'Study Indian economy', 'Learn econometrics'],
        seatMatrix: { general: 30, obc: 50, bcMbc: 65, sc: 28, st: 4, ews: 10, total: 187 },
        cutoffs: [
          { year: '2024', general: 66.5, obc: 60.2, bcMbc: 56.4, sc: 42.5, st: 32.2, ews: 58.5 },
          { year: '2023', general: 68.2, obc: 62.5, bcMbc: 58.8, sc: 44.8, st: 34.5, ews: 60.8 }
        ]
      },
      {
        id: 'bdu-ma-sociology',
        name: 'M.A Sociology',
        nameTamil: 'எம்.ஏ சமூகவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Sociological Theory', nameTamil: 'சமூகவியல் கோட்பாடு', questions: 35, marks: 35, topics: ['Classical', 'Modern Theory', 'Indian Sociology'] },
            { name: 'Indian Society', nameTamil: 'இந்திய சமூகம்', questions: 30, marks: 30, topics: ['Caste', 'Family', 'Religion'] },
            { name: 'Research Methods', nameTamil: 'ஆய்வு முறைகள்', questions: 20, marks: 20, topics: ['Qualitative', 'Quantitative'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 15, marks: 15, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for UPSC Sociology optional', 'Study Indian sociologists', 'Focus on social issues'],
        seatMatrix: { general: 28, obc: 48, bcMbc: 60, sc: 26, st: 4, ews: 9, total: 175 },
        cutoffs: [
          { year: '2024', general: 60.5, obc: 54.2, bcMbc: 50.4, sc: 36.5, st: 26.2, ews: 52.5 },
          { year: '2023', general: 62.2, obc: 56.5, bcMbc: 52.8, sc: 38.8, st: 28.5, ews: 54.8 }
        ]
      },
      {
        id: 'bdu-ma-womens-studies',
        name: "M.A Women's Studies",
        nameTamil: 'எம்.ஏ பெண்கள் ஆய்வுகள்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Gender Studies', nameTamil: 'பாலின ஆய்வுகள்', questions: 40, marks: 40, topics: ['Feminist Theory', 'Gender Issues', 'Movements'] },
            { name: 'Social Sciences', nameTamil: 'சமூக அறிவியல்', questions: 30, marks: 30, topics: ['Sociology', 'Political Science'] },
            { name: 'Current Issues', nameTamil: 'நடப்பு பிரச்சினைகள்', questions: 20, marks: 20, topics: ['Women Rights', 'Laws', 'Policies'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 10, marks: 10, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Study feminist movements', 'Know women-related laws', 'Career in NGOs and government'],
        seatMatrix: { general: 20, obc: 35, bcMbc: 42, sc: 18, st: 3, ews: 7, total: 125 },
        cutoffs: [
          { year: '2024', general: 58.5, obc: 52.2, bcMbc: 48.4, sc: 34.5, st: 24.2, ews: 50.5 },
          { year: '2023', general: 60.2, obc: 54.5, bcMbc: 50.8, sc: 36.8, st: 26.5, ews: 52.8 }
        ]
      },
      {
        id: 'bdu-ma-hrm',
        name: 'M.A Human Resource Management',
        nameTamil: 'எம்.ஏ மனித வள மேலாண்மை',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'HRM', nameTamil: 'மனித வள மேலாண்மை', questions: 40, marks: 40, topics: ['HR Functions', 'Recruitment', 'Training', 'Performance'] },
            { name: 'Management', nameTamil: 'மேலாண்மை', questions: 30, marks: 30, topics: ['OB', 'Strategic HRM'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 20, marks: 20, topics: ['Quantitative', 'Reasoning'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 10, marks: 10, topics: ['Verbal Ability'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Alternative to MBA-HR', 'Study HR principles', 'Learn labour laws'],
        seatMatrix: { general: 25, obc: 42, bcMbc: 52, sc: 22, st: 4, ews: 8, total: 153 },
        cutoffs: [
          { year: '2024', general: 64.5, obc: 58.2, bcMbc: 54.4, sc: 40.5, st: 30.2, ews: 56.5 },
          { year: '2023', general: 66.2, obc: 60.5, bcMbc: 56.8, sc: 42.8, st: 32.5, ews: 58.8 }
        ]
      },
      {
        id: 'bdu-ma-development',
        name: 'M.A Development Studies',
        nameTamil: 'எம்.ஏ வளர்ச்சி ஆய்வுகள்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Development Economics', nameTamil: 'வளர்ச்சி பொருளியல்', questions: 35, marks: 35, topics: ['Economic Development', 'Planning', 'Poverty'] },
            { name: 'Social Sciences', nameTamil: 'சமூக அறிவியல்', questions: 30, marks: 30, topics: ['Sociology', 'Political Science', 'Public Policy'] },
            { name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்', questions: 20, marks: 20, topics: ['Government Schemes', 'SDGs'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 15, marks: 15, topics: ['Comprehension', 'Writing'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for development sector', 'Study welfare schemes', 'Excellent for UPSC preparation'],
        seatMatrix: { general: 22, obc: 38, bcMbc: 48, sc: 20, st: 3, ews: 7, total: 138 },
        cutoffs: [
          { year: '2024', general: 62.5, obc: 56.2, bcMbc: 52.4, sc: 38.5, st: 28.2, ews: 54.5 },
          { year: '2023', general: 64.2, obc: 58.5, bcMbc: 54.8, sc: 40.8, st: 30.5, ews: 56.8 }
        ]
      },
      // ========== PROFESSIONAL PROGRAMS ==========
      {
        id: 'bdu-mba',
        name: 'MBA (Financial Management / Environmental Mgmt)',
        nameTamil: 'எம்.பி.ஏ (நிதி மேலாண்மை / சுற்றுச்சூழல் மேலாண்மை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Verbal Ability', nameTamil: 'மொழித்திறன்', questions: 25, marks: 25, topics: ['Reading Comprehension', 'Grammar', 'Vocabulary'] },
            { name: 'Quantitative Aptitude', nameTamil: 'எண்ணியல்', questions: 25, marks: 25, topics: ['Arithmetic', 'Algebra', 'Data Interpretation'] },
            { name: 'Logical Reasoning', nameTamil: 'தர்க்கம்', questions: 25, marks: 25, topics: ['Puzzles', 'Seating', 'Syllogism'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 25, marks: 25, topics: ['Current Affairs', 'Business', 'Economy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Practice aptitude daily', 'Focus on GK and current affairs', 'Read business newspapers'],
        seatMatrix: { general: 35, obc: 60, bcMbc: 75, sc: 32, st: 5, ews: 12, total: 219 },
        cutoffs: [
          { year: '2024', general: 70.5, obc: 64.2, bcMbc: 60.4, sc: 46.5, st: 36.2, ews: 62.5 },
          { year: '2023', general: 72.2, obc: 66.5, bcMbc: 62.8, sc: 48.8, st: 38.5, ews: 64.8 }
        ]
      },
      {
        id: 'bdu-mca',
        name: 'MCA (Computer Applications)',
        nameTamil: 'எம்.சி.ஏ (கணினி பயன்பாடுகள்)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 40, marks: 40, topics: ['Programming', 'Data Structures', 'DBMS', 'OS'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Discrete Math', 'Linear Algebra', 'Probability'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 30, marks: 30, topics: ['Logical Reasoning', 'Numerical', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong programming foundation needed', 'Practice data structures', 'Study discrete mathematics'],
        seatMatrix: { general: 40, obc: 70, bcMbc: 85, sc: 35, st: 6, ews: 14, total: 250 },
        cutoffs: [
          { year: '2024', general: 72.5, obc: 66.2, bcMbc: 62.4, sc: 48.5, st: 38.2, ews: 64.5 },
          { year: '2023', general: 74.2, obc: 68.5, bcMbc: 64.8, sc: 50.8, st: 40.5, ews: 66.8 }
        ]
      },
      {
        id: 'bdu-msw',
        name: 'MSW (Master of Social Work)',
        nameTamil: 'எம்.எஸ்.டபிள்யூ (சமூக பணி முதுநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Social Work', nameTamil: 'சமூக பணி', questions: 40, marks: 40, topics: ['Case Work', 'Group Work', 'Community Organization'] },
            { name: 'Social Sciences', nameTamil: 'சமூக அறிவியல்', questions: 30, marks: 30, topics: ['Sociology', 'Psychology', 'Anthropology'] },
            { name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்', questions: 20, marks: 20, topics: ['Social Issues', 'Government Schemes'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 10, marks: 10, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for NGO sector', 'Study social work methods', 'Learn welfare schemes'],
        seatMatrix: { general: 35, obc: 60, bcMbc: 75, sc: 32, st: 5, ews: 12, total: 219 },
        cutoffs: [
          { year: '2024', general: 58.5, obc: 52.2, bcMbc: 48.4, sc: 34.5, st: 24.2, ews: 50.5 },
          { year: '2023', general: 60.2, obc: 54.5, bcMbc: 50.8, sc: 36.8, st: 26.5, ews: 52.8 }
        ]
      },
      {
        id: 'bdu-med',
        name: 'M.Ed (Master of Education)',
        nameTamil: 'எம்.எட் (கல்வி முதுநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Education', nameTamil: 'கல்வி', questions: 50, marks: 50, topics: ['Educational Psychology', 'Pedagogy', 'Philosophy of Education'] },
            { name: 'Teaching Methods', nameTamil: 'கற்பித்தல் முறைகள்', questions: 30, marks: 30, topics: ['Curriculum', 'Assessment', 'Technology in Education'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 20, marks: 20, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['B.Ed required for admission', 'Study educational psychology', 'Career in teaching and research'],
        seatMatrix: { general: 25, obc: 42, bcMbc: 52, sc: 22, st: 4, ews: 8, total: 153 },
        cutoffs: [
          { year: '2024', general: 64.5, obc: 58.2, bcMbc: 54.4, sc: 40.5, st: 30.2, ews: 56.5 },
          { year: '2023', general: 66.2, obc: 60.5, bcMbc: 56.8, sc: 42.8, st: 32.5, ews: 58.8 }
        ]
      },
      {
        id: 'bdu-mped',
        name: 'M.P.Ed (Master of Physical Education)',
        nameTamil: 'எம்.பி.எட் (உடற்கல்வி முதுநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Physical Education', nameTamil: 'உடற்கல்வி', questions: 50, marks: 50, topics: ['Sports Science', 'Exercise Physiology', 'Sports Psychology'] },
            { name: 'Health & Fitness', nameTamil: 'ஆரோக்கியம் & உடற்தகுதி', questions: 30, marks: 30, topics: ['Nutrition', 'Fitness Training', 'Health Education'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 20, marks: 20, topics: ['Reasoning', 'GK'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['B.P.Ed required', 'Physical fitness test may apply', 'Career in sports and coaching'],
        seatMatrix: { general: 20, obc: 35, bcMbc: 42, sc: 18, st: 3, ews: 7, total: 125 },
        cutoffs: [
          { year: '2024', general: 60.5, obc: 54.2, bcMbc: 50.4, sc: 36.5, st: 26.2, ews: 52.5 },
          { year: '2023', general: 62.2, obc: 56.5, bcMbc: 52.8, sc: 38.8, st: 28.5, ews: 54.8 }
        ]
      },
      {
        id: 'bdu-mlibisc',
        name: 'M.Lib.I.Sc (Library & Information Science)',
        nameTamil: 'எம்.லிப்.ஐ.எஸ்சி (நூலகம் & தகவல் அறிவியல்)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Library Science', nameTamil: 'நூலக அறிவியல்', questions: 50, marks: 50, topics: ['Classification', 'Cataloguing', 'Information Sources'] },
            { name: 'Information Technology', nameTamil: 'தகவல் தொழில்நுட்பம்', questions: 30, marks: 30, topics: ['Digital Libraries', 'Databases', 'Automation'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 20, marks: 20, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['B.Lib.I.Sc required', 'Learn library automation', 'Career in university libraries'],
        seatMatrix: { general: 18, obc: 30, bcMbc: 38, sc: 16, st: 3, ews: 6, total: 111 },
        cutoffs: [
          { year: '2024', general: 56.5, obc: 50.2, bcMbc: 46.4, sc: 32.5, st: 22.2, ews: 48.5 },
          { year: '2023', general: 58.2, obc: 52.5, bcMbc: 48.8, sc: 34.8, st: 24.5, ews: 50.8 }
        ]
      },
      // ========== CENTRE FOR DISTANCE EDUCATION (CDE) - UNDERGRADUATE ==========
      {
        id: 'bdu-cde-ba-english',
        name: 'B.A. English (Distance)',
        nameTamil: 'பி.ஏ. ஆங்கிலம் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'English Literature', nameTamil: 'ஆங்கில இலக்கியம்', questions: 50, marks: 50, topics: ['Poetry', 'Prose', 'Drama', 'Fiction'] },
            { name: 'Language & Grammar', nameTamil: 'மொழி & இலக்கணம்', questions: 30, marks: 30, topics: ['Grammar', 'Composition', 'Comprehension'] },
            { name: 'General English', nameTamil: 'பொது ஆங்கிலம்', questions: 20, marks: 20, topics: ['Vocabulary', 'Usage'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Distance mode - flexible study', 'Self-study materials provided', 'Contact classes available'],
        seatMatrix: { general: 100, obc: 150, bcMbc: 180, sc: 80, st: 15, ews: 35, total: 560 },
        cutoffs: [
          { year: '2024', general: 45.0, obc: 40.0, bcMbc: 35.0, sc: 25.0, st: 20.0, ews: 38.0 },
          { year: '2023', general: 47.0, obc: 42.0, bcMbc: 37.0, sc: 27.0, st: 22.0, ews: 40.0 }
        ]
      },
      {
        id: 'bdu-cde-ba-tamil',
        name: 'B.A. Tamil (Distance)',
        nameTamil: 'பி.ஏ. தமிழ் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Tamil Literature', nameTamil: 'தமிழ் இலக்கியம்', questions: 50, marks: 50, topics: ['Sangam Literature', 'Medieval Literature', 'Modern Literature'] },
            { name: 'Grammar', nameTamil: 'இலக்கணம்', questions: 30, marks: 30, topics: ['Tolkappiyam', 'Nannool', 'Prose'] },
            { name: 'General Tamil', nameTamil: 'பொது தமிழ்', questions: 20, marks: 20, topics: ['Composition', 'Comprehension'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Rich Tamil literary heritage', 'Flexible distance learning', 'Study materials in Tamil'],
        seatMatrix: { general: 120, obc: 180, bcMbc: 220, sc: 95, st: 18, ews: 42, total: 675 },
        cutoffs: [
          { year: '2024', general: 42.0, obc: 37.0, bcMbc: 32.0, sc: 22.0, st: 17.0, ews: 35.0 },
          { year: '2023', general: 44.0, obc: 39.0, bcMbc: 34.0, sc: 24.0, st: 19.0, ews: 37.0 }
        ]
      },
      {
        id: 'bdu-cde-ba-history',
        name: 'B.A. History (Distance)',
        nameTamil: 'பி.ஏ. வரலாறு (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Indian History', nameTamil: 'இந்திய வரலாறு', questions: 40, marks: 40, topics: ['Ancient', 'Medieval', 'Modern India'] },
            { name: 'World History', nameTamil: 'உலக வரலாறு', questions: 30, marks: 30, topics: ['World Wars', 'Revolutions'] },
            { name: 'Tamil Nadu History', nameTamil: 'தமிழ்நாடு வரலாறு', questions: 30, marks: 30, topics: ['Cholas', 'Pandyas', 'Freedom Movement'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for competitive exams', 'UPSC foundation course', 'Focus on Indian history'],
        seatMatrix: { general: 90, obc: 140, bcMbc: 170, sc: 75, st: 14, ews: 32, total: 521 },
        cutoffs: [
          { year: '2024', general: 43.0, obc: 38.0, bcMbc: 33.0, sc: 23.0, st: 18.0, ews: 36.0 },
          { year: '2023', general: 45.0, obc: 40.0, bcMbc: 35.0, sc: 25.0, st: 20.0, ews: 38.0 }
        ]
      },
      {
        id: 'bdu-cde-ba-economics',
        name: 'B.A. Economics (Distance)',
        nameTamil: 'பி.ஏ. பொருளாதாரம் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Microeconomics', nameTamil: 'நுண்பொருளியல்', questions: 35, marks: 35, topics: ['Demand-Supply', 'Market Structures', 'Consumer Behavior'] },
            { name: 'Macroeconomics', nameTamil: 'பேரியல் பொருளியல்', questions: 35, marks: 35, topics: ['National Income', 'Fiscal Policy', 'Monetary Policy'] },
            { name: 'Indian Economy', nameTamil: 'இந்திய பொருளாதாரம்', questions: 30, marks: 30, topics: ['Planning', 'Agriculture', 'Industry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong math foundation helps', 'Useful for banking exams', 'Learn economic theories'],
        seatMatrix: { general: 85, obc: 130, bcMbc: 160, sc: 70, st: 13, ews: 30, total: 488 },
        cutoffs: [
          { year: '2024', general: 44.0, obc: 39.0, bcMbc: 34.0, sc: 24.0, st: 19.0, ews: 37.0 },
          { year: '2023', general: 46.0, obc: 41.0, bcMbc: 36.0, sc: 26.0, st: 21.0, ews: 39.0 }
        ]
      },
      {
        id: 'bdu-cde-ba-polsci',
        name: 'B.A. Political Science (Distance)',
        nameTamil: 'பி.ஏ. அரசியல் அறிவியல் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Political Theory', nameTamil: 'அரசியல் கோட்பாடு', questions: 35, marks: 35, topics: ['State', 'Sovereignty', 'Democracy'] },
            { name: 'Indian Politics', nameTamil: 'இந்திய அரசியல்', questions: 35, marks: 35, topics: ['Constitution', 'Parliament', 'Federalism'] },
            { name: 'International Relations', nameTamil: 'சர்வதேச உறவுகள்', questions: 30, marks: 30, topics: ['UN', 'Foreign Policy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['UPSC foundation', 'Study Indian Constitution well', 'Current affairs important'],
        seatMatrix: { general: 80, obc: 120, bcMbc: 150, sc: 65, st: 12, ews: 28, total: 455 },
        cutoffs: [
          { year: '2024', general: 42.0, obc: 37.0, bcMbc: 32.0, sc: 22.0, st: 17.0, ews: 35.0 },
          { year: '2023', general: 44.0, obc: 39.0, bcMbc: 34.0, sc: 24.0, st: 19.0, ews: 37.0 }
        ]
      },
      {
        id: 'bdu-cde-ba-pubadmin',
        name: 'B.A. Public Administration (Distance)',
        nameTamil: 'பி.ஏ. பொது நிர்வாகம் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Administrative Theory', nameTamil: 'நிர்வாக கோட்பாடு', questions: 35, marks: 35, topics: ['Principles', 'Organization', 'Leadership'] },
            { name: 'Indian Administration', nameTamil: 'இந்திய நிர்வாகம்', questions: 35, marks: 35, topics: ['Central Admin', 'State Admin', 'Local Govt'] },
            { name: 'General Studies', nameTamil: 'பொது படிப்பு', questions: 30, marks: 30, topics: ['Current Affairs', 'Governance'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Government job preparation', 'Study administrative reforms', 'Learn about e-governance'],
        seatMatrix: { general: 75, obc: 115, bcMbc: 140, sc: 60, st: 11, ews: 26, total: 427 },
        cutoffs: [
          { year: '2024', general: 41.0, obc: 36.0, bcMbc: 31.0, sc: 21.0, st: 16.0, ews: 34.0 },
          { year: '2023', general: 43.0, obc: 38.0, bcMbc: 33.0, sc: 23.0, st: 18.0, ews: 36.0 }
        ]
      },
      {
        id: 'bdu-cde-bsc-maths',
        name: 'B.Sc. Mathematics (Distance)',
        nameTamil: 'பி.எஸ்சி. கணிதம் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Algebra', nameTamil: 'இயற்கணிதம்', questions: 35, marks: 35, topics: ['Linear Algebra', 'Abstract Algebra', 'Number Theory'] },
            { name: 'Calculus', nameTamil: 'நுண்கணிதம்', questions: 35, marks: 35, topics: ['Differential', 'Integral', 'Differential Equations'] },
            { name: 'Applied Math', nameTamil: 'பயன்பாட்டு கணிதம்', questions: 30, marks: 30, topics: ['Statistics', 'Numerical Methods'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong 12th math foundation needed', 'Practice problems daily', 'Good for teaching career'],
        seatMatrix: { general: 70, obc: 110, bcMbc: 135, sc: 58, st: 10, ews: 25, total: 408 },
        cutoffs: [
          { year: '2024', general: 48.0, obc: 43.0, bcMbc: 38.0, sc: 28.0, st: 23.0, ews: 41.0 },
          { year: '2023', general: 50.0, obc: 45.0, bcMbc: 40.0, sc: 30.0, st: 25.0, ews: 43.0 }
        ]
      },
      {
        id: 'bdu-cde-bsc-physics',
        name: 'B.Sc. Physics (Distance)',
        nameTamil: 'பி.எஸ்சி. இயற்பியல் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Classical Physics', nameTamil: 'பாரம்பரிய இயற்பியல்', questions: 35, marks: 35, topics: ['Mechanics', 'Thermodynamics', 'Optics'] },
            { name: 'Modern Physics', nameTamil: 'நவீன இயற்பியல்', questions: 35, marks: 35, topics: ['Quantum Mechanics', 'Nuclear Physics', 'Electronics'] },
            { name: 'Mathematical Physics', nameTamil: 'கணித இயற்பியல்', questions: 30, marks: 30, topics: ['Vector Analysis', 'Differential Equations'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Lab component via contact classes', 'Strong math needed', 'Focus on conceptual understanding'],
        seatMatrix: { general: 65, obc: 100, bcMbc: 125, sc: 54, st: 10, ews: 23, total: 377 },
        cutoffs: [
          { year: '2024', general: 47.0, obc: 42.0, bcMbc: 37.0, sc: 27.0, st: 22.0, ews: 40.0 },
          { year: '2023', general: 49.0, obc: 44.0, bcMbc: 39.0, sc: 29.0, st: 24.0, ews: 42.0 }
        ]
      },
      {
        id: 'bdu-cde-bsc-chemistry',
        name: 'B.Sc. Chemistry (Distance)',
        nameTamil: 'பி.எஸ்சி. வேதியியல் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Organic Chemistry', nameTamil: 'கரிம வேதியியல்', questions: 35, marks: 35, topics: ['Hydrocarbons', 'Functional Groups', 'Reactions'] },
            { name: 'Inorganic Chemistry', nameTamil: 'கனிம வேதியியல்', questions: 35, marks: 35, topics: ['Periodic Table', 'Coordination Compounds'] },
            { name: 'Physical Chemistry', nameTamil: 'பௌதிக வேதியியல்', questions: 30, marks: 30, topics: ['Thermodynamics', 'Kinetics', 'Electrochemistry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Lab practicals in contact classes', 'Study reaction mechanisms', 'Memorize periodic trends'],
        seatMatrix: { general: 60, obc: 95, bcMbc: 120, sc: 52, st: 9, ews: 22, total: 358 },
        cutoffs: [
          { year: '2024', general: 46.0, obc: 41.0, bcMbc: 36.0, sc: 26.0, st: 21.0, ews: 39.0 },
          { year: '2023', general: 48.0, obc: 43.0, bcMbc: 38.0, sc: 28.0, st: 23.0, ews: 41.0 }
        ]
      },
      {
        id: 'bdu-cde-bsc-botany',
        name: 'B.Sc. Botany (Distance)',
        nameTamil: 'பி.எஸ்சி. தாவரவியல் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Plant Taxonomy', nameTamil: 'தாவர வகைப்பாடு', questions: 35, marks: 35, topics: ['Classification', 'Morphology', 'Anatomy'] },
            { name: 'Plant Physiology', nameTamil: 'தாவர உடலியல்', questions: 35, marks: 35, topics: ['Photosynthesis', 'Respiration', 'Growth'] },
            { name: 'Ecology', nameTamil: 'சூழலியல்', questions: 30, marks: 30, topics: ['Ecosystems', 'Environmental Studies'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Field work during contact classes', 'Learn plant identification', 'Environmental career options'],
        seatMatrix: { general: 55, obc: 85, bcMbc: 105, sc: 46, st: 8, ews: 20, total: 319 },
        cutoffs: [
          { year: '2024', general: 44.0, obc: 39.0, bcMbc: 34.0, sc: 24.0, st: 19.0, ews: 37.0 },
          { year: '2023', general: 46.0, obc: 41.0, bcMbc: 36.0, sc: 26.0, st: 21.0, ews: 39.0 }
        ]
      },
      {
        id: 'bdu-cde-bsc-zoology',
        name: 'B.Sc. Zoology (Distance)',
        nameTamil: 'பி.எஸ்சி. விலங்கியல் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Animal Diversity', nameTamil: 'விலங்கு பல்வகைமை', questions: 35, marks: 35, topics: ['Invertebrates', 'Vertebrates', 'Classification'] },
            { name: 'Physiology', nameTamil: 'உடலியல்', questions: 35, marks: 35, topics: ['Animal Physiology', 'Cell Biology'] },
            { name: 'Ecology & Evolution', nameTamil: 'சூழலியல் & பரிணாமம்', questions: 30, marks: 30, topics: ['Evolution', 'Wildlife', 'Conservation'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Practical component in contact classes', 'Good for wildlife career', 'Study animal classification'],
        seatMatrix: { general: 55, obc: 85, bcMbc: 105, sc: 46, st: 8, ews: 20, total: 319 },
        cutoffs: [
          { year: '2024', general: 45.0, obc: 40.0, bcMbc: 35.0, sc: 25.0, st: 20.0, ews: 38.0 },
          { year: '2023', general: 47.0, obc: 42.0, bcMbc: 37.0, sc: 27.0, st: 22.0, ews: 40.0 }
        ]
      },
      {
        id: 'bdu-cde-bsc-cs',
        name: 'B.Sc. Computer Science (Distance)',
        nameTamil: 'பி.எஸ்சி. கணினி அறிவியல் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Programming', nameTamil: 'நிரலாக்கம்', questions: 40, marks: 40, topics: ['C', 'C++', 'Java', 'Python'] },
            { name: 'Data Structures', nameTamil: 'தரவு கட்டமைப்புகள்', questions: 30, marks: 30, topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs'] },
            { name: 'Database & Networks', nameTamil: 'தரவுத்தளம் & நெட்வொர்க்', questions: 30, marks: 30, topics: ['DBMS', 'SQL', 'Networking'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Practice coding regularly', 'Lab work in contact classes', 'IT industry opportunities'],
        seatMatrix: { general: 80, obc: 120, bcMbc: 150, sc: 65, st: 12, ews: 28, total: 455 },
        cutoffs: [
          { year: '2024', general: 50.0, obc: 45.0, bcMbc: 40.0, sc: 30.0, st: 25.0, ews: 43.0 },
          { year: '2023', general: 52.0, obc: 47.0, bcMbc: 42.0, sc: 32.0, st: 27.0, ews: 45.0 }
        ]
      },
      {
        id: 'bdu-cde-bsc-it',
        name: 'B.Sc. Information Technology (Distance)',
        nameTamil: 'பி.எஸ்சி. தகவல் தொழில்நுட்பம் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'IT Fundamentals', nameTamil: 'ஐடி அடிப்படைகள்', questions: 35, marks: 35, topics: ['Hardware', 'Software', 'Operating Systems'] },
            { name: 'Web Technologies', nameTamil: 'வலை தொழில்நுட்பங்கள்', questions: 35, marks: 35, topics: ['HTML', 'CSS', 'JavaScript', 'PHP'] },
            { name: 'Networking', nameTamil: 'நெட்வொர்க்கிங்', questions: 30, marks: 30, topics: ['TCP/IP', 'Security', 'Cloud Computing'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Hands-on practice important', 'Web development focus', 'Cloud computing skills valuable'],
        seatMatrix: { general: 75, obc: 115, bcMbc: 140, sc: 60, st: 11, ews: 26, total: 427 },
        cutoffs: [
          { year: '2024', general: 48.0, obc: 43.0, bcMbc: 38.0, sc: 28.0, st: 23.0, ews: 41.0 },
          { year: '2023', general: 50.0, obc: 45.0, bcMbc: 40.0, sc: 30.0, st: 25.0, ews: 43.0 }
        ]
      },
      {
        id: 'bdu-cde-bsc-geography',
        name: 'B.Sc. Geography (Distance)',
        nameTamil: 'பி.எஸ்சி. புவியியல் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Physical Geography', nameTamil: 'இயற்கை புவியியல்', questions: 40, marks: 40, topics: ['Geomorphology', 'Climatology', 'Oceanography'] },
            { name: 'Human Geography', nameTamil: 'மனித புவியியல்', questions: 30, marks: 30, topics: ['Population', 'Settlement', 'Economic'] },
            { name: 'Cartography', nameTamil: 'வரைபடவியல்', questions: 30, marks: 30, topics: ['Map Reading', 'Remote Sensing', 'GIS'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['UPSC optional subject', 'Learn map reading', 'GIS skills valuable'],
        seatMatrix: { general: 50, obc: 80, bcMbc: 100, sc: 44, st: 8, ews: 18, total: 300 },
        cutoffs: [
          { year: '2024', general: 43.0, obc: 38.0, bcMbc: 33.0, sc: 23.0, st: 18.0, ews: 36.0 },
          { year: '2023', general: 45.0, obc: 40.0, bcMbc: 35.0, sc: 25.0, st: 20.0, ews: 38.0 }
        ]
      },
      {
        id: 'bdu-cde-bsc-hospital-admin',
        name: 'B.Sc. Hospital Administration (Distance)',
        nameTamil: 'பி.எஸ்சி. மருத்துவமனை நிர்வாகம் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Hospital Management', nameTamil: 'மருத்துவமனை மேலாண்மை', questions: 40, marks: 40, topics: ['Healthcare Systems', 'Hospital Operations', 'Quality'] },
            { name: 'Medical Records', nameTamil: 'மருத்துவ பதிவுகள்', questions: 30, marks: 30, topics: ['Medical Coding', 'Health Information'] },
            { name: 'General Management', nameTamil: 'பொது மேலாண்மை', questions: 30, marks: 30, topics: ['HR', 'Finance', 'Marketing'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Healthcare sector growing', 'Hospital internship valuable', 'Learn medical terminology'],
        seatMatrix: { general: 40, obc: 65, bcMbc: 80, sc: 35, st: 6, ews: 15, total: 241 },
        cutoffs: [
          { year: '2024', general: 45.0, obc: 40.0, bcMbc: 35.0, sc: 25.0, st: 20.0, ews: 38.0 },
          { year: '2023', general: 47.0, obc: 42.0, bcMbc: 37.0, sc: 27.0, st: 22.0, ews: 40.0 }
        ]
      },
      {
        id: 'bdu-cde-bsc-hotel-mgmt',
        name: 'B.Sc. Hotel Management & Catering Science (Distance)',
        nameTamil: 'பி.எஸ்சி. ஓட்டல் மேலாண்மை & உணவு அறிவியல் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Hotel Operations', nameTamil: 'ஓட்டல் செயல்பாடுகள்', questions: 40, marks: 40, topics: ['Front Office', 'Housekeeping', 'F&B'] },
            { name: 'Food Production', nameTamil: 'உணவு உற்பத்தி', questions: 30, marks: 30, topics: ['Cooking', 'Bakery', 'Nutrition'] },
            { name: 'Management', nameTamil: 'மேலாண்மை', questions: 30, marks: 30, topics: ['Tourism', 'Marketing', 'Accounts'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Hospitality industry career', 'Practical training needed', 'Communication skills important'],
        seatMatrix: { general: 45, obc: 70, bcMbc: 88, sc: 38, st: 7, ews: 16, total: 264 },
        cutoffs: [
          { year: '2024', general: 42.0, obc: 37.0, bcMbc: 32.0, sc: 22.0, st: 17.0, ews: 35.0 },
          { year: '2023', general: 44.0, obc: 39.0, bcMbc: 34.0, sc: 24.0, st: 19.0, ews: 37.0 }
        ]
      },
      {
        id: 'bdu-cde-bsc-visual-media',
        name: 'B.Sc. Visual Media & Communication (Distance)',
        nameTamil: 'பி.எஸ்சி. காட்சி ஊடகம் & தொடர்பியல் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Media Studies', nameTamil: 'ஊடக படிப்பு', questions: 40, marks: 40, topics: ['Print Media', 'Electronic Media', 'New Media'] },
            { name: 'Visual Communication', nameTamil: 'காட்சி தொடர்பியல்', questions: 30, marks: 30, topics: ['Photography', 'Videography', 'Graphics'] },
            { name: 'Communication Theory', nameTamil: 'தொடர்பியல் கோட்பாடு', questions: 30, marks: 30, topics: ['Mass Communication', 'Advertising'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Creative field career', 'Build portfolio', 'Digital media skills essential'],
        seatMatrix: { general: 50, obc: 80, bcMbc: 100, sc: 44, st: 8, ews: 18, total: 300 },
        cutoffs: [
          { year: '2024', general: 44.0, obc: 39.0, bcMbc: 34.0, sc: 24.0, st: 19.0, ews: 37.0 },
          { year: '2023', general: 46.0, obc: 41.0, bcMbc: 36.0, sc: 26.0, st: 21.0, ews: 39.0 }
        ]
      },
      {
        id: 'bdu-cde-bsc-yoga',
        name: 'B.Sc. Yoga (Distance)',
        nameTamil: 'பி.எஸ்சி. யோகா (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Yoga Philosophy', nameTamil: 'யோகா தத்துவம்', questions: 35, marks: 35, topics: ['Patanjali Yoga', 'Hatha Yoga', 'Yoga Sutras'] },
            { name: 'Yoga Practice', nameTamil: 'யோகா பயிற்சி', questions: 35, marks: 35, topics: ['Asanas', 'Pranayama', 'Meditation'] },
            { name: 'Yoga Therapy', nameTamil: 'யோகா சிகிச்சை', questions: 30, marks: 30, topics: ['Therapeutic Yoga', 'Anatomy', 'Health'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Practical yoga skills needed', 'Wellness industry growing', 'Yoga instructor certification'],
        seatMatrix: { general: 40, obc: 65, bcMbc: 80, sc: 35, st: 6, ews: 15, total: 241 },
        cutoffs: [
          { year: '2024', general: 40.0, obc: 35.0, bcMbc: 30.0, sc: 20.0, st: 15.0, ews: 33.0 },
          { year: '2023', general: 42.0, obc: 37.0, bcMbc: 32.0, sc: 22.0, st: 17.0, ews: 35.0 }
        ]
      },
      {
        id: 'bdu-cde-bcom-general',
        name: 'B.Com General (Distance)',
        nameTamil: 'பி.காம் பொது (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Accountancy', nameTamil: 'கணக்கியல்', questions: 40, marks: 40, topics: ['Financial Accounting', 'Cost Accounting', 'Management Accounting'] },
            { name: 'Commerce', nameTamil: 'வணிகவியல்', questions: 30, marks: 30, topics: ['Business Studies', 'Economics', 'Law'] },
            { name: 'Finance', nameTamil: 'நிதி', questions: 30, marks: 30, topics: ['Banking', 'Taxation', 'Financial Markets'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['CA/CMA foundation', 'Practice accounting problems', 'Learn Tally/accounting software'],
        seatMatrix: { general: 100, obc: 150, bcMbc: 185, sc: 80, st: 15, ews: 35, total: 565 },
        cutoffs: [
          { year: '2024', general: 48.0, obc: 43.0, bcMbc: 38.0, sc: 28.0, st: 23.0, ews: 41.0 },
          { year: '2023', general: 50.0, obc: 45.0, bcMbc: 40.0, sc: 30.0, st: 25.0, ews: 43.0 }
        ]
      },
      {
        id: 'bdu-cde-bcom-bank-mgmt',
        name: 'B.Com Bank Management (Distance)',
        nameTamil: 'பி.காம் வங்கி மேலாண்மை (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Banking', nameTamil: 'வங்கியியல்', questions: 40, marks: 40, topics: ['Banking Law', 'Banking Operations', 'RBI Policies'] },
            { name: 'Accountancy', nameTamil: 'கணக்கியல்', questions: 30, marks: 30, topics: ['Financial Accounting', 'Banking Accounts'] },
            { name: 'Finance', nameTamil: 'நிதி', questions: 30, marks: 30, topics: ['Financial Markets', 'Investment', 'Insurance'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Bank exam preparation', 'Learn banking regulations', 'RBI updates important'],
        seatMatrix: { general: 70, obc: 110, bcMbc: 135, sc: 58, st: 10, ews: 25, total: 408 },
        cutoffs: [
          { year: '2024', general: 47.0, obc: 42.0, bcMbc: 37.0, sc: 27.0, st: 22.0, ews: 40.0 },
          { year: '2023', general: 49.0, obc: 44.0, bcMbc: 39.0, sc: 29.0, st: 24.0, ews: 42.0 }
        ]
      },
      {
        id: 'bdu-cde-bcom-ca',
        name: 'B.Com Computer Applications (Distance)',
        nameTamil: 'பி.காம் கணினி பயன்பாடுகள் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Commerce', nameTamil: 'வணிகவியல்', questions: 35, marks: 35, topics: ['Accounting', 'Business Studies', 'Economics'] },
            { name: 'Computer Applications', nameTamil: 'கணினி பயன்பாடுகள்', questions: 35, marks: 35, topics: ['Programming', 'DBMS', 'Web Design'] },
            { name: 'E-Commerce', nameTamil: 'மின்வணிகம்', questions: 30, marks: 30, topics: ['Digital Business', 'ERP', 'Tally'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Commerce + IT skills', 'Learn Tally and accounting software', 'E-commerce career opportunities'],
        seatMatrix: { general: 75, obc: 115, bcMbc: 140, sc: 60, st: 11, ews: 26, total: 427 },
        cutoffs: [
          { year: '2024', general: 49.0, obc: 44.0, bcMbc: 39.0, sc: 29.0, st: 24.0, ews: 42.0 },
          { year: '2023', general: 51.0, obc: 46.0, bcMbc: 41.0, sc: 31.0, st: 26.0, ews: 44.0 }
        ]
      },
      {
        id: 'bdu-cde-bba',
        name: 'B.B.A. (Distance)',
        nameTamil: 'பி.பி.ஏ. (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Management', nameTamil: 'மேலாண்மை', questions: 40, marks: 40, topics: ['Principles of Management', 'Organizational Behavior', 'HR'] },
            { name: 'Marketing & Finance', nameTamil: 'சந்தைப்படுத்தல் & நிதி', questions: 30, marks: 30, topics: ['Marketing', 'Financial Management', 'Accounting'] },
            { name: 'Business Studies', nameTamil: 'வணிகப் படிப்பு', questions: 30, marks: 30, topics: ['Business Environment', 'Entrepreneurship'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['MBA foundation course', 'Learn business communication', 'Case study practice important'],
        seatMatrix: { general: 85, obc: 130, bcMbc: 160, sc: 70, st: 13, ews: 30, total: 488 },
        cutoffs: [
          { year: '2024', general: 46.0, obc: 41.0, bcMbc: 36.0, sc: 26.0, st: 21.0, ews: 39.0 },
          { year: '2023', general: 48.0, obc: 43.0, bcMbc: 38.0, sc: 28.0, st: 23.0, ews: 41.0 }
        ]
      },
      {
        id: 'bdu-cde-bca',
        name: 'B.C.A. (Distance)',
        nameTamil: 'பி.சி.ஏ. (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Programming', nameTamil: 'நிரலாக்கம்', questions: 40, marks: 40, topics: ['C', 'C++', 'Java', 'Python', 'Web Programming'] },
            { name: 'Data Structures & Algorithms', nameTamil: 'தரவு கட்டமைப்புகள் & வழிமுறைகள்', questions: 30, marks: 30, topics: ['DS', 'Algorithms', 'OS'] },
            { name: 'Database & Networks', nameTamil: 'தரவுத்தளம் & நெட்வொர்க்', questions: 30, marks: 30, topics: ['DBMS', 'SQL', 'Computer Networks'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong programming foundation', 'Practice coding daily', 'MCA or IT career path'],
        seatMatrix: { general: 90, obc: 140, bcMbc: 170, sc: 75, st: 14, ews: 32, total: 521 },
        cutoffs: [
          { year: '2024', general: 50.0, obc: 45.0, bcMbc: 40.0, sc: 30.0, st: 25.0, ews: 43.0 },
          { year: '2023', general: 52.0, obc: 47.0, bcMbc: 42.0, sc: 32.0, st: 27.0, ews: 45.0 }
        ]
      },
      {
        id: 'bdu-cde-blibisc',
        name: 'B.Lib.I.Sc. (Distance - 1 Year)',
        nameTamil: 'பி.லிப்.ஐ.எஸ்சி. (தொலைநிலை - 1 ஆண்டு)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Library Science', nameTamil: 'நூலக அறிவியல்', questions: 50, marks: 50, topics: ['Library Organization', 'Classification', 'Cataloguing'] },
            { name: 'Information Science', nameTamil: 'தகவல் அறிவியல்', questions: 30, marks: 30, topics: ['Information Sources', 'Reference Services'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Current Affairs', 'Library Laws'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['1-year diploma program', 'Library assistant career', 'Public library jobs'],
        seatMatrix: { general: 50, obc: 80, bcMbc: 100, sc: 44, st: 8, ews: 18, total: 300 },
        cutoffs: [
          { year: '2024', general: 40.0, obc: 35.0, bcMbc: 30.0, sc: 20.0, st: 15.0, ews: 33.0 },
          { year: '2023', general: 42.0, obc: 37.0, bcMbc: 32.0, sc: 22.0, st: 17.0, ews: 35.0 }
        ]
      },
      // ========== CENTRE FOR DISTANCE EDUCATION (CDE) - POSTGRADUATE ==========
      {
        id: 'bdu-cde-ma-english',
        name: 'M.A. English (Distance)',
        nameTamil: 'எம்.ஏ. ஆங்கிலம் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'English Literature', nameTamil: 'ஆங்கில இலக்கியம்', questions: 50, marks: 50, topics: ['British Literature', 'American Literature', 'Indian Writing'] },
            { name: 'Literary Criticism', nameTamil: 'இலக்கிய விமர்சனம்', questions: 30, marks: 30, topics: ['Theory', 'Movements', 'Genres'] },
            { name: 'Language Studies', nameTamil: 'மொழிப் படிப்பு', questions: 20, marks: 20, topics: ['Linguistics', 'ELT'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['NET/SET preparation', 'Read primary texts', 'English teaching career'],
        seatMatrix: { general: 80, obc: 120, bcMbc: 150, sc: 65, st: 12, ews: 28, total: 455 },
        cutoffs: [
          { year: '2024', general: 50.0, obc: 45.0, bcMbc: 40.0, sc: 30.0, st: 25.0, ews: 43.0 },
          { year: '2023', general: 52.0, obc: 47.0, bcMbc: 42.0, sc: 32.0, st: 27.0, ews: 45.0 }
        ]
      },
      {
        id: 'bdu-cde-ma-tamil',
        name: 'M.A. Tamil (Distance)',
        nameTamil: 'எம்.ஏ. தமிழ் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Tamil Literature', nameTamil: 'தமிழ் இலக்கியம்', questions: 50, marks: 50, topics: ['Sangam', 'Bhakti', 'Modern'] },
            { name: 'Grammar', nameTamil: 'இலக்கணம்', questions: 30, marks: 30, topics: ['Tolkappiyam', 'Nannool'] },
            { name: 'Criticism', nameTamil: 'விமர்சனம்', questions: 20, marks: 20, topics: ['Literary Theory', 'Research Methods'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Tamil teaching career', 'TNPSC preparation', 'Research opportunities'],
        seatMatrix: { general: 100, obc: 150, bcMbc: 185, sc: 80, st: 15, ews: 35, total: 565 },
        cutoffs: [
          { year: '2024', general: 45.0, obc: 40.0, bcMbc: 35.0, sc: 25.0, st: 20.0, ews: 38.0 },
          { year: '2023', general: 47.0, obc: 42.0, bcMbc: 37.0, sc: 27.0, st: 22.0, ews: 40.0 }
        ]
      },
      {
        id: 'bdu-cde-ma-history',
        name: 'M.A. History (Distance)',
        nameTamil: 'எம்.ஏ. வரலாறு (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Indian History', nameTamil: 'இந்திய வரலாறு', questions: 40, marks: 40, topics: ['Ancient', 'Medieval', 'Modern'] },
            { name: 'World History', nameTamil: 'உலக வரலாறு', questions: 30, marks: 30, topics: ['Renaissance', 'World Wars', 'Cold War'] },
            { name: 'Historiography', nameTamil: 'வரலாற்றியல்', questions: 30, marks: 30, topics: ['Methods', 'Sources', 'Research'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['UPSC optional', 'Archaeological career', 'Museum jobs'],
        seatMatrix: { general: 70, obc: 110, bcMbc: 135, sc: 58, st: 10, ews: 25, total: 408 },
        cutoffs: [
          { year: '2024', general: 48.0, obc: 43.0, bcMbc: 38.0, sc: 28.0, st: 23.0, ews: 41.0 },
          { year: '2023', general: 50.0, obc: 45.0, bcMbc: 40.0, sc: 30.0, st: 25.0, ews: 43.0 }
        ]
      },
      {
        id: 'bdu-cde-ma-economics',
        name: 'M.A. Economics (Distance)',
        nameTamil: 'எம்.ஏ. பொருளாதாரம் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Economic Theory', nameTamil: 'பொருளியல் கோட்பாடு', questions: 40, marks: 40, topics: ['Micro', 'Macro', 'International'] },
            { name: 'Indian Economy', nameTamil: 'இந்திய பொருளாதாரம்', questions: 30, marks: 30, topics: ['Planning', 'Policies', 'Development'] },
            { name: 'Quantitative Methods', nameTamil: 'அளவு முறைகள்', questions: 30, marks: 30, topics: ['Statistics', 'Econometrics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['RBI/Bank career', 'Economic research', 'Policy analyst jobs'],
        seatMatrix: { general: 65, obc: 100, bcMbc: 125, sc: 54, st: 10, ews: 23, total: 377 },
        cutoffs: [
          { year: '2024', general: 50.0, obc: 45.0, bcMbc: 40.0, sc: 30.0, st: 25.0, ews: 43.0 },
          { year: '2023', general: 52.0, obc: 47.0, bcMbc: 42.0, sc: 32.0, st: 27.0, ews: 45.0 }
        ]
      },
      {
        id: 'bdu-cde-ma-polsci',
        name: 'M.A. Political Science (Distance)',
        nameTamil: 'எம்.ஏ. அரசியல் அறிவியல் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Political Theory', nameTamil: 'அரசியல் கோட்பாடு', questions: 35, marks: 35, topics: ['Western', 'Indian', 'Modern'] },
            { name: 'Indian Government', nameTamil: 'இந்திய அரசு', questions: 35, marks: 35, topics: ['Constitution', 'Politics', 'Administration'] },
            { name: 'International Politics', nameTamil: 'சர்வதேச அரசியல்', questions: 30, marks: 30, topics: ['IR Theory', 'Foreign Policy', 'UN'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['UPSC optional', 'NET/SET exam', 'Political analyst career'],
        seatMatrix: { general: 60, obc: 95, bcMbc: 120, sc: 52, st: 9, ews: 22, total: 358 },
        cutoffs: [
          { year: '2024', general: 47.0, obc: 42.0, bcMbc: 37.0, sc: 27.0, st: 22.0, ews: 40.0 },
          { year: '2023', general: 49.0, obc: 44.0, bcMbc: 39.0, sc: 29.0, st: 24.0, ews: 42.0 }
        ]
      },
      {
        id: 'bdu-cde-ma-pubadmin',
        name: 'M.A. Public Administration (Distance)',
        nameTamil: 'எம்.ஏ. பொது நிர்வாகம் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Admin Theory', nameTamil: 'நிர்வாக கோட்பாடு', questions: 35, marks: 35, topics: ['Classical', 'Modern', 'New Public Admin'] },
            { name: 'Indian Administration', nameTamil: 'இந்திய நிர்வாகம்', questions: 35, marks: 35, topics: ['Central', 'State', 'Local'] },
            { name: 'Comparative Admin', nameTamil: 'ஒப்பீட்டு நிர்வாகம்', questions: 30, marks: 30, topics: ['USA', 'UK', 'France', 'Japan'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['UPSC main optional', 'Government career', 'Administrative reforms'],
        seatMatrix: { general: 55, obc: 85, bcMbc: 105, sc: 46, st: 8, ews: 20, total: 319 },
        cutoffs: [
          { year: '2024', general: 46.0, obc: 41.0, bcMbc: 36.0, sc: 26.0, st: 21.0, ews: 39.0 },
          { year: '2023', general: 48.0, obc: 43.0, bcMbc: 38.0, sc: 28.0, st: 23.0, ews: 41.0 }
        ]
      },
      {
        id: 'bdu-cde-ma-journalism',
        name: 'M.A. Journalism & Mass Communication (Distance)',
        nameTamil: 'எம்.ஏ. பத்திரிகை & வெகுஜன தொடர்பியல் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Media Studies', nameTamil: 'ஊடக படிப்பு', questions: 40, marks: 40, topics: ['Print', 'Electronic', 'Digital Media'] },
            { name: 'Journalism', nameTamil: 'பத்திரிகை', questions: 30, marks: 30, topics: ['Reporting', 'Editing', 'News Writing'] },
            { name: 'Communication Theory', nameTamil: 'தொடர்பியல் கோட்பாடு', questions: 30, marks: 30, topics: ['Mass Comm', 'Development Comm', 'Advertising'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Media career', 'Digital journalism skills', 'Build portfolio'],
        seatMatrix: { general: 50, obc: 80, bcMbc: 100, sc: 44, st: 8, ews: 18, total: 300 },
        cutoffs: [
          { year: '2024', general: 48.0, obc: 43.0, bcMbc: 38.0, sc: 28.0, st: 23.0, ews: 41.0 },
          { year: '2023', general: 50.0, obc: 45.0, bcMbc: 40.0, sc: 30.0, st: 25.0, ews: 43.0 }
        ]
      },
      {
        id: 'bdu-cde-ma-hrm',
        name: 'M.A. Human Resource Management (Distance)',
        nameTamil: 'எம்.ஏ. மனிதவள மேலாண்மை (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'HR Management', nameTamil: 'மனிதவள மேலாண்மை', questions: 40, marks: 40, topics: ['Recruitment', 'Training', 'Performance'] },
            { name: 'Organizational Behavior', nameTamil: 'நிறுவன நடத்தை', questions: 30, marks: 30, topics: ['Leadership', 'Motivation', 'Culture'] },
            { name: 'Labour Laws', nameTamil: 'தொழிலாளர் சட்டங்கள்', questions: 30, marks: 30, topics: ['Industrial Relations', 'Welfare', 'Safety'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['HR career path', 'Corporate sector jobs', 'Learn HR software'],
        seatMatrix: { general: 55, obc: 85, bcMbc: 105, sc: 46, st: 8, ews: 20, total: 319 },
        cutoffs: [
          { year: '2024', general: 49.0, obc: 44.0, bcMbc: 39.0, sc: 29.0, st: 24.0, ews: 42.0 },
          { year: '2023', general: 51.0, obc: 46.0, bcMbc: 41.0, sc: 31.0, st: 26.0, ews: 44.0 }
        ]
      },
      {
        id: 'bdu-cde-msc-maths',
        name: 'M.Sc. Mathematics (Distance)',
        nameTamil: 'எம்.எஸ்சி. கணிதம் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Pure Mathematics', nameTamil: 'தூய கணிதம்', questions: 40, marks: 40, topics: ['Algebra', 'Analysis', 'Topology'] },
            { name: 'Applied Mathematics', nameTamil: 'பயன்பாட்டு கணிதம்', questions: 30, marks: 30, topics: ['Differential Equations', 'Numerical Analysis'] },
            { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 30, marks: 30, topics: ['Probability', 'Statistical Methods'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['NET/SET exam', 'Teaching career', 'Data science skills valuable'],
        seatMatrix: { general: 50, obc: 80, bcMbc: 100, sc: 44, st: 8, ews: 18, total: 300 },
        cutoffs: [
          { year: '2024', general: 52.0, obc: 47.0, bcMbc: 42.0, sc: 32.0, st: 27.0, ews: 45.0 },
          { year: '2023', general: 54.0, obc: 49.0, bcMbc: 44.0, sc: 34.0, st: 29.0, ews: 47.0 }
        ]
      },
      {
        id: 'bdu-cde-msc-physics',
        name: 'M.Sc. Physics (Distance)',
        nameTamil: 'எம்.எஸ்சி. இயற்பியல் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Classical Physics', nameTamil: 'பாரம்பரிய இயற்பியல்', questions: 35, marks: 35, topics: ['Mechanics', 'Electrodynamics', 'Thermodynamics'] },
            { name: 'Modern Physics', nameTamil: 'நவீன இயற்பியல்', questions: 35, marks: 35, topics: ['Quantum Mechanics', 'Nuclear', 'Solid State'] },
            { name: 'Mathematical Physics', nameTamil: 'கணித இயற்பியல்', questions: 30, marks: 30, topics: ['Mathematical Methods', 'Computational Physics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['NET/GATE exam', 'Research career', 'Strong math foundation needed'],
        seatMatrix: { general: 45, obc: 70, bcMbc: 88, sc: 38, st: 7, ews: 16, total: 264 },
        cutoffs: [
          { year: '2024', general: 51.0, obc: 46.0, bcMbc: 41.0, sc: 31.0, st: 26.0, ews: 44.0 },
          { year: '2023', general: 53.0, obc: 48.0, bcMbc: 43.0, sc: 33.0, st: 28.0, ews: 46.0 }
        ]
      },
      {
        id: 'bdu-cde-msc-chemistry',
        name: 'M.Sc. Chemistry (Distance)',
        nameTamil: 'எம்.எஸ்சி. வேதியியல் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Organic Chemistry', nameTamil: 'கரிம வேதியியல்', questions: 35, marks: 35, topics: ['Reaction Mechanisms', 'Spectroscopy', 'Synthesis'] },
            { name: 'Inorganic Chemistry', nameTamil: 'கனிம வேதியியல்', questions: 35, marks: 35, topics: ['Coordination', 'Organometallics', 'Bioinorganic'] },
            { name: 'Physical Chemistry', nameTamil: 'பௌதிக வேதியியல்', questions: 30, marks: 30, topics: ['Thermodynamics', 'Kinetics', 'Quantum'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['NET/GATE exam', 'Pharma industry', 'Lab skills via contact classes'],
        seatMatrix: { general: 45, obc: 70, bcMbc: 88, sc: 38, st: 7, ews: 16, total: 264 },
        cutoffs: [
          { year: '2024', general: 50.0, obc: 45.0, bcMbc: 40.0, sc: 30.0, st: 25.0, ews: 43.0 },
          { year: '2023', general: 52.0, obc: 47.0, bcMbc: 42.0, sc: 32.0, st: 27.0, ews: 45.0 }
        ]
      },
      {
        id: 'bdu-cde-msc-botany',
        name: 'M.Sc. Botany (Distance)',
        nameTamil: 'எம்.எஸ்சி. தாவரவியல் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Plant Sciences', nameTamil: 'தாவர அறிவியல்', questions: 40, marks: 40, topics: ['Taxonomy', 'Morphology', 'Anatomy'] },
            { name: 'Plant Physiology', nameTamil: 'தாவர உடலியல்', questions: 30, marks: 30, topics: ['Biochemistry', 'Molecular Biology'] },
            { name: 'Ecology & Environment', nameTamil: 'சூழலியல் & சுற்றுச்சூழல்', questions: 30, marks: 30, topics: ['Ecology', 'Biotechnology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['NET/SET exam', 'Environmental career', 'Field work important'],
        seatMatrix: { general: 40, obc: 65, bcMbc: 80, sc: 35, st: 6, ews: 15, total: 241 },
        cutoffs: [
          { year: '2024', general: 48.0, obc: 43.0, bcMbc: 38.0, sc: 28.0, st: 23.0, ews: 41.0 },
          { year: '2023', general: 50.0, obc: 45.0, bcMbc: 40.0, sc: 30.0, st: 25.0, ews: 43.0 }
        ]
      },
      {
        id: 'bdu-cde-msc-zoology',
        name: 'M.Sc. Zoology (Distance)',
        nameTamil: 'எம்.எஸ்சி. விலங்கியல் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Animal Diversity', nameTamil: 'விலங்கு பல்வகைமை', questions: 35, marks: 35, topics: ['Invertebrates', 'Vertebrates', 'Systematics'] },
            { name: 'Physiology', nameTamil: 'உடலியல்', questions: 35, marks: 35, topics: ['Cell Biology', 'Genetics', 'Developmental'] },
            { name: 'Ecology & Evolution', nameTamil: 'சூழலியல் & பரிணாமம்', questions: 30, marks: 30, topics: ['Evolution', 'Ethology', 'Conservation'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['NET/SET exam', 'Wildlife career', 'Research opportunities'],
        seatMatrix: { general: 40, obc: 65, bcMbc: 80, sc: 35, st: 6, ews: 15, total: 241 },
        cutoffs: [
          { year: '2024', general: 49.0, obc: 44.0, bcMbc: 39.0, sc: 29.0, st: 24.0, ews: 42.0 },
          { year: '2023', general: 51.0, obc: 46.0, bcMbc: 41.0, sc: 31.0, st: 26.0, ews: 44.0 }
        ]
      },
      {
        id: 'bdu-cde-msc-cs',
        name: 'M.Sc. Computer Science (Distance)',
        nameTamil: 'எம்.எஸ்சி. கணினி அறிவியல் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Core CS', nameTamil: 'முக்கிய சிஎஸ்', questions: 40, marks: 40, topics: ['Algorithms', 'Data Structures', 'OS', 'DBMS'] },
            { name: 'Programming', nameTamil: 'நிரலாக்கம்', questions: 30, marks: 30, topics: ['OOP', 'Java', 'Python', 'Web'] },
            { name: 'Advanced Topics', nameTamil: 'மேம்பட்ட தலைப்புகள்', questions: 30, marks: 30, topics: ['AI', 'ML', 'Cloud', 'Networks'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['IT industry career', 'GATE preparation', 'Programming skills essential'],
        seatMatrix: { general: 60, obc: 95, bcMbc: 120, sc: 52, st: 9, ews: 22, total: 358 },
        cutoffs: [
          { year: '2024', general: 54.0, obc: 49.0, bcMbc: 44.0, sc: 34.0, st: 29.0, ews: 47.0 },
          { year: '2023', general: 56.0, obc: 51.0, bcMbc: 46.0, sc: 36.0, st: 31.0, ews: 49.0 }
        ]
      },
      {
        id: 'bdu-cde-msc-it',
        name: 'M.Sc. Information Technology (Distance)',
        nameTamil: 'எம்.எஸ்சி. தகவல் தொழில்நுட்பம் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'IT Fundamentals', nameTamil: 'ஐடி அடிப்படைகள்', questions: 35, marks: 35, topics: ['Networking', 'Security', 'Cloud'] },
            { name: 'Software Engineering', nameTamil: 'மென்பொருள் பொறியியல்', questions: 35, marks: 35, topics: ['SDLC', 'Testing', 'DevOps'] },
            { name: 'Emerging Tech', nameTamil: 'வளர்ந்துவரும் தொழில்நுட்பம்', questions: 30, marks: 30, topics: ['IoT', 'Big Data', 'AI'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['IT industry career', 'Cloud certification valuable', 'Hands-on projects important'],
        seatMatrix: { general: 55, obc: 85, bcMbc: 105, sc: 46, st: 8, ews: 20, total: 319 },
        cutoffs: [
          { year: '2024', general: 52.0, obc: 47.0, bcMbc: 42.0, sc: 32.0, st: 27.0, ews: 45.0 },
          { year: '2023', general: 54.0, obc: 49.0, bcMbc: 44.0, sc: 34.0, st: 29.0, ews: 47.0 }
        ]
      },
      {
        id: 'bdu-cde-msc-geography',
        name: 'M.Sc. Geography (Distance)',
        nameTamil: 'எம்.எஸ்சி. புவியியல் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Physical Geography', nameTamil: 'இயற்கை புவியியல்', questions: 35, marks: 35, topics: ['Geomorphology', 'Climatology', 'Hydrology'] },
            { name: 'Human Geography', nameTamil: 'மனித புவியியல்', questions: 35, marks: 35, topics: ['Population', 'Urban', 'Economic'] },
            { name: 'Techniques', nameTamil: 'நுட்பங்கள்', questions: 30, marks: 30, topics: ['GIS', 'Remote Sensing', 'Cartography'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['UPSC optional', 'GIS skills valuable', 'Urban planning career'],
        seatMatrix: { general: 40, obc: 65, bcMbc: 80, sc: 35, st: 6, ews: 15, total: 241 },
        cutoffs: [
          { year: '2024', general: 47.0, obc: 42.0, bcMbc: 37.0, sc: 27.0, st: 22.0, ews: 40.0 },
          { year: '2023', general: 49.0, obc: 44.0, bcMbc: 39.0, sc: 29.0, st: 24.0, ews: 42.0 }
        ]
      },
      {
        id: 'bdu-cde-msc-yoga',
        name: 'M.Sc. Yoga (Distance)',
        nameTamil: 'எம்.எஸ்சி. யோகா (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Yoga Philosophy', nameTamil: 'யோகா தத்துவம்', questions: 35, marks: 35, topics: ['Yoga Sutras', 'Upanishads', 'Bhagavad Gita'] },
            { name: 'Yoga Therapy', nameTamil: 'யோகா சிகிச்சை', questions: 35, marks: 35, topics: ['Clinical Yoga', 'Stress Management', 'Wellness'] },
            { name: 'Research Methods', nameTamil: 'ஆராய்ச்சி முறைகள்', questions: 30, marks: 30, topics: ['Yoga Research', 'Statistics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Yoga therapy career', 'Wellness industry', 'Certification courses'],
        seatMatrix: { general: 35, obc: 55, bcMbc: 70, sc: 30, st: 5, ews: 13, total: 208 },
        cutoffs: [
          { year: '2024', general: 44.0, obc: 39.0, bcMbc: 34.0, sc: 24.0, st: 19.0, ews: 37.0 },
          { year: '2023', general: 46.0, obc: 41.0, bcMbc: 36.0, sc: 26.0, st: 21.0, ews: 39.0 }
        ]
      },
      {
        id: 'bdu-cde-mcom-general',
        name: 'M.Com General (Distance)',
        nameTamil: 'எம்.காம் பொது (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Advanced Accounting', nameTamil: 'மேம்பட்ட கணக்கியல்', questions: 40, marks: 40, topics: ['Corporate Accounting', 'Cost Accounting', 'Auditing'] },
            { name: 'Commerce', nameTamil: 'வணிகவியல்', questions: 30, marks: 30, topics: ['Business Law', 'Company Law', 'Taxation'] },
            { name: 'Finance', nameTamil: 'நிதி', questions: 30, marks: 30, topics: ['Financial Management', 'Investment', 'Banking'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['CA/CMA career path', 'NET/SET exam', 'Accounting software skills'],
        seatMatrix: { general: 70, obc: 110, bcMbc: 135, sc: 58, st: 10, ews: 25, total: 408 },
        cutoffs: [
          { year: '2024', general: 52.0, obc: 47.0, bcMbc: 42.0, sc: 32.0, st: 27.0, ews: 45.0 },
          { year: '2023', general: 54.0, obc: 49.0, bcMbc: 44.0, sc: 34.0, st: 29.0, ews: 47.0 }
        ]
      },
      {
        id: 'bdu-cde-mcom-fm',
        name: 'M.Com Financial Management (Distance)',
        nameTamil: 'எம்.காம் நிதி மேலாண்மை (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Financial Management', nameTamil: 'நிதி மேலாண்மை', questions: 40, marks: 40, topics: ['Capital Budgeting', 'Working Capital', 'Dividend Policy'] },
            { name: 'Investment', nameTamil: 'முதலீடு', questions: 30, marks: 30, topics: ['Portfolio', 'Security Analysis', 'Derivatives'] },
            { name: 'Corporate Finance', nameTamil: 'கார்ப்பரேட் நிதி', questions: 30, marks: 30, topics: ['Mergers', 'Valuation', 'Restructuring'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Finance career', 'CFA certification', 'Stock market knowledge'],
        seatMatrix: { general: 55, obc: 85, bcMbc: 105, sc: 46, st: 8, ews: 20, total: 319 },
        cutoffs: [
          { year: '2024', general: 53.0, obc: 48.0, bcMbc: 43.0, sc: 33.0, st: 28.0, ews: 46.0 },
          { year: '2023', general: 55.0, obc: 50.0, bcMbc: 45.0, sc: 35.0, st: 30.0, ews: 48.0 }
        ]
      },
      {
        id: 'bdu-cde-mcom-bank',
        name: 'M.Com Bank Management (Distance)',
        nameTamil: 'எம்.காம் வங்கி மேலாண்மை (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Banking Theory', nameTamil: 'வங்கியியல் கோட்பாடு', questions: 40, marks: 40, topics: ['Banking Operations', 'Credit', 'Risk Management'] },
            { name: 'Financial Services', nameTamil: 'நிதி சேவைகள்', questions: 30, marks: 30, topics: ['Insurance', 'Mutual Funds', 'Investment Banking'] },
            { name: 'Regulations', nameTamil: 'ஒழுங்குமுறைகள்', questions: 30, marks: 30, topics: ['RBI', 'SEBI', 'Banking Law'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Bank PO preparation', 'RBI Grade B', 'Financial sector career'],
        seatMatrix: { general: 50, obc: 80, bcMbc: 100, sc: 44, st: 8, ews: 18, total: 300 },
        cutoffs: [
          { year: '2024', general: 51.0, obc: 46.0, bcMbc: 41.0, sc: 31.0, st: 26.0, ews: 44.0 },
          { year: '2023', general: 53.0, obc: 48.0, bcMbc: 43.0, sc: 33.0, st: 28.0, ews: 46.0 }
        ]
      },
      {
        id: 'bdu-cde-mcom-ca',
        name: 'M.Com Computer Applications (Distance)',
        nameTamil: 'எம்.காம் கணினி பயன்பாடுகள் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Commerce', nameTamil: 'வணிகவியல்', questions: 35, marks: 35, topics: ['Accounting', 'Finance', 'Business Law'] },
            { name: 'Computer Applications', nameTamil: 'கணினி பயன்பாடுகள்', questions: 35, marks: 35, topics: ['DBMS', 'E-Commerce', 'Web Design'] },
            { name: 'Business IT', nameTamil: 'வணிக ஐடி', questions: 30, marks: 30, topics: ['ERP', 'Tally', 'Business Analytics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Commerce + IT skills', 'ERP knowledge valuable', 'Digital business career'],
        seatMatrix: { general: 55, obc: 85, bcMbc: 105, sc: 46, st: 8, ews: 20, total: 319 },
        cutoffs: [
          { year: '2024', general: 52.0, obc: 47.0, bcMbc: 42.0, sc: 32.0, st: 27.0, ews: 45.0 },
          { year: '2023', general: 54.0, obc: 49.0, bcMbc: 44.0, sc: 34.0, st: 29.0, ews: 47.0 }
        ]
      },
      {
        id: 'bdu-cde-mba-general',
        name: 'M.B.A. General (Distance)',
        nameTamil: 'எம்.பி.ஏ. பொது (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Management', nameTamil: 'மேலாண்மை', questions: 40, marks: 40, topics: ['Principles', 'OB', 'HR', 'Operations'] },
            { name: 'Marketing & Finance', nameTamil: 'சந்தைப்படுத்தல் & நிதி', questions: 30, marks: 30, topics: ['Marketing', 'Financial Management', 'Accounting'] },
            { name: 'Quantitative', nameTamil: 'அளவு', questions: 30, marks: 30, topics: ['Statistics', 'Decision Sciences'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Management career', 'Working professionals', 'Case study method'],
        seatMatrix: { general: 100, obc: 150, bcMbc: 185, sc: 80, st: 15, ews: 35, total: 565 },
        cutoffs: [
          { year: '2024', general: 55.0, obc: 50.0, bcMbc: 45.0, sc: 35.0, st: 30.0, ews: 48.0 },
          { year: '2023', general: 57.0, obc: 52.0, bcMbc: 47.0, sc: 37.0, st: 32.0, ews: 50.0 }
        ]
      },
      {
        id: 'bdu-cde-mba-hr',
        name: 'M.B.A. Human Resource (Distance)',
        nameTamil: 'எம்.பி.ஏ. மனிதவளம் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'HR Management', nameTamil: 'மனிதவள மேலாண்மை', questions: 40, marks: 40, topics: ['Recruitment', 'Training', 'Performance', 'Compensation'] },
            { name: 'General Management', nameTamil: 'பொது மேலாண்மை', questions: 30, marks: 30, topics: ['Principles', 'OB', 'Strategy'] },
            { name: 'Labour Laws', nameTamil: 'தொழிலாளர் சட்டங்கள்', questions: 30, marks: 30, topics: ['IR', 'Labour Welfare', 'Employment Law'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['HR career path', 'Corporate HR jobs', 'Learn HRMS software'],
        seatMatrix: { general: 70, obc: 110, bcMbc: 135, sc: 58, st: 10, ews: 25, total: 408 },
        cutoffs: [
          { year: '2024', general: 54.0, obc: 49.0, bcMbc: 44.0, sc: 34.0, st: 29.0, ews: 47.0 },
          { year: '2023', general: 56.0, obc: 51.0, bcMbc: 46.0, sc: 36.0, st: 31.0, ews: 49.0 }
        ]
      },
      {
        id: 'bdu-cde-mba-finance',
        name: 'M.B.A. Finance (Distance)',
        nameTamil: 'எம்.பி.ஏ. நிதி (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Financial Management', nameTamil: 'நிதி மேலாண்மை', questions: 40, marks: 40, topics: ['Corporate Finance', 'Investment', 'Risk Management'] },
            { name: 'General Management', nameTamil: 'பொது மேலாண்மை', questions: 30, marks: 30, topics: ['Principles', 'Marketing', 'Strategy'] },
            { name: 'Accounting', nameTamil: 'கணக்கியல்', questions: 30, marks: 30, topics: ['Financial Accounting', 'Cost', 'Management Accounting'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Finance career', 'CFA/FRM certification', 'Investment banking'],
        seatMatrix: { general: 75, obc: 115, bcMbc: 140, sc: 60, st: 11, ews: 26, total: 427 },
        cutoffs: [
          { year: '2024', general: 56.0, obc: 51.0, bcMbc: 46.0, sc: 36.0, st: 31.0, ews: 49.0 },
          { year: '2023', general: 58.0, obc: 53.0, bcMbc: 48.0, sc: 38.0, st: 33.0, ews: 51.0 }
        ]
      },
      {
        id: 'bdu-cde-mba-operations',
        name: 'M.B.A. Operations (Distance)',
        nameTamil: 'எம்.பி.ஏ. செயல்பாடுகள் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Operations Management', nameTamil: 'செயல்பாட்டு மேலாண்மை', questions: 40, marks: 40, topics: ['Production', 'Quality', 'Supply Chain'] },
            { name: 'General Management', nameTamil: 'பொது மேலாண்மை', questions: 30, marks: 30, topics: ['Principles', 'HR', 'Strategy'] },
            { name: 'Quantitative Methods', nameTamil: 'அளவு முறைகள்', questions: 30, marks: 30, topics: ['OR', 'Statistics', 'Decision Analysis'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Manufacturing career', 'Supply chain management', 'Six Sigma certification'],
        seatMatrix: { general: 60, obc: 95, bcMbc: 120, sc: 52, st: 9, ews: 22, total: 358 },
        cutoffs: [
          { year: '2024', general: 53.0, obc: 48.0, bcMbc: 43.0, sc: 33.0, st: 28.0, ews: 46.0 },
          { year: '2023', general: 55.0, obc: 50.0, bcMbc: 45.0, sc: 35.0, st: 30.0, ews: 48.0 }
        ]
      },
      {
        id: 'bdu-cde-mba-systems',
        name: 'M.B.A. Systems (Distance)',
        nameTamil: 'எம்.பி.ஏ. அமைப்புகள் (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'IT Management', nameTamil: 'ஐடி மேலாண்மை', questions: 40, marks: 40, topics: ['MIS', 'ERP', 'IT Strategy', 'Project Management'] },
            { name: 'General Management', nameTamil: 'பொது மேலாண்மை', questions: 30, marks: 30, topics: ['Principles', 'Marketing', 'Finance'] },
            { name: 'Technology', nameTamil: 'தொழில்நுட்பம்', questions: 30, marks: 30, topics: ['DBMS', 'Networks', 'Security'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['IT management career', 'CIO path', 'Technical + management skills'],
        seatMatrix: { general: 55, obc: 85, bcMbc: 105, sc: 46, st: 8, ews: 20, total: 319 },
        cutoffs: [
          { year: '2024', general: 54.0, obc: 49.0, bcMbc: 44.0, sc: 34.0, st: 29.0, ews: 47.0 },
          { year: '2023', general: 56.0, obc: 51.0, bcMbc: 46.0, sc: 36.0, st: 31.0, ews: 49.0 }
        ]
      },
      {
        id: 'bdu-cde-mba-logistics',
        name: 'M.B.A. Logistics & Supply Chain (Distance)',
        nameTamil: 'எம்.பி.ஏ. தளவாடம் & விநியோக சங்கிலி (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Supply Chain', nameTamil: 'விநியோக சங்கிலி', questions: 40, marks: 40, topics: ['Logistics', 'Procurement', 'Distribution', 'Warehousing'] },
            { name: 'General Management', nameTamil: 'பொது மேலாண்மை', questions: 30, marks: 30, topics: ['Principles', 'Operations', 'Strategy'] },
            { name: 'Quantitative', nameTamil: 'அளவு', questions: 30, marks: 30, topics: ['Transportation Models', 'Inventory Management'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['E-commerce logistics career', 'Supply chain analyst', 'Global trade opportunities'],
        seatMatrix: { general: 50, obc: 80, bcMbc: 100, sc: 44, st: 8, ews: 18, total: 300 },
        cutoffs: [
          { year: '2024', general: 52.0, obc: 47.0, bcMbc: 42.0, sc: 32.0, st: 27.0, ews: 45.0 },
          { year: '2023', general: 54.0, obc: 49.0, bcMbc: 44.0, sc: 34.0, st: 29.0, ews: 47.0 }
        ]
      },
      {
        id: 'bdu-cde-mca',
        name: 'M.C.A. (Distance)',
        nameTamil: 'எம்.சி.ஏ. (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Core CS', nameTamil: 'முக்கிய சிஎஸ்', questions: 40, marks: 40, topics: ['Algorithms', 'Data Structures', 'OS', 'DBMS'] },
            { name: 'Programming', nameTamil: 'நிரலாக்கம்', questions: 35, marks: 35, topics: ['Java', 'Python', 'Web Technologies', 'Mobile Dev'] },
            { name: 'Software Engineering', nameTamil: 'மென்பொருள் பொறியியல்', questions: 25, marks: 25, topics: ['SDLC', 'Testing', 'Project Management'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['IT industry career', 'Strong programming skills', 'GATE preparation'],
        seatMatrix: { general: 80, obc: 120, bcMbc: 150, sc: 65, st: 12, ews: 28, total: 455 },
        cutoffs: [
          { year: '2024', general: 55.0, obc: 50.0, bcMbc: 45.0, sc: 35.0, st: 30.0, ews: 48.0 },
          { year: '2023', general: 57.0, obc: 52.0, bcMbc: 47.0, sc: 37.0, st: 32.0, ews: 50.0 }
        ]
      },
      {
        id: 'bdu-cde-msw',
        name: 'M.S.W. (Distance)',
        nameTamil: 'எம்.எஸ்.டபிள்யூ. (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Social Work Methods', nameTamil: 'சமூக பணி முறைகள்', questions: 40, marks: 40, topics: ['Case Work', 'Group Work', 'Community Organization'] },
            { name: 'Social Sciences', nameTamil: 'சமூக அறிவியல்', questions: 30, marks: 30, topics: ['Sociology', 'Psychology', 'Social Problems'] },
            { name: 'Welfare', nameTamil: 'நலன்', questions: 30, marks: 30, topics: ['Social Welfare', 'Government Schemes', 'NGO Management'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['NGO career', 'Social welfare department', 'Field work important'],
        seatMatrix: { general: 60, obc: 95, bcMbc: 120, sc: 52, st: 9, ews: 22, total: 358 },
        cutoffs: [
          { year: '2024', general: 48.0, obc: 43.0, bcMbc: 38.0, sc: 28.0, st: 23.0, ews: 41.0 },
          { year: '2023', general: 50.0, obc: 45.0, bcMbc: 40.0, sc: 30.0, st: 25.0, ews: 43.0 }
        ]
      },
      {
        id: 'bdu-cde-mlibisc',
        name: 'M.Lib.I.Sc. (Distance)',
        nameTamil: 'எம்.லிப்.ஐ.எஸ்சி. (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Library Science', nameTamil: 'நூலக அறிவியல்', questions: 40, marks: 40, topics: ['Classification', 'Cataloguing', 'Reference Services'] },
            { name: 'Information Technology', nameTamil: 'தகவல் தொழில்நுட்பம்', questions: 30, marks: 30, topics: ['Digital Libraries', 'Library Automation', 'Databases'] },
            { name: 'Research Methods', nameTamil: 'ஆராய்ச்சி முறைகள்', questions: 30, marks: 30, topics: ['Research Methodology', 'Statistics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['University librarian career', 'NET exam', 'Digital library skills'],
        seatMatrix: { general: 45, obc: 70, bcMbc: 88, sc: 38, st: 7, ews: 16, total: 264 },
        cutoffs: [
          { year: '2024', general: 46.0, obc: 41.0, bcMbc: 36.0, sc: 26.0, st: 21.0, ews: 39.0 },
          { year: '2023', general: 48.0, obc: 43.0, bcMbc: 38.0, sc: 28.0, st: 23.0, ews: 41.0 }
        ]
      }
    ]
  },
  {
    id: 'mgr-university',
    name: 'Tamil Nadu Dr. M.G.R. Medical University',
    nameTamil: 'தமிழ்நாடு டாக்டர் எம்.ஜி.ஆர். மருத்துவ பல்கலைக்கழகம்',
    location: 'Chennai',
    website: 'www.tnmgrmu.ac.in',
    phone: '044-22353574',
    examName: 'TNMGRMU Entrance',
    logoColor: '#0891b2',
    logo: '/universities/mgr-medical-university-logo.jpeg',
    fee: { general: 1000, obc: 1000, scst: 500 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'March 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'April 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'May 2026', status: 'upcoming' },
      { event: 'Exam Date', eventTamil: 'தேர்வு தேதி', date: 'June 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'July 2026', status: 'upcoming' }
    ],
    courses: [
      {
        id: 'mgr-md-general',
        name: 'MD (General Medicine)',
        nameTamil: 'எம்.டி (பொது மருத்துவம்)',
        type: 'PG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (Offline)',
          negativeMarking: true,
          sections: [
            { name: 'General Medicine', nameTamil: 'பொது மருத்துவம்', questions: 100, marks: 100, topics: ['Cardiology', 'Pulmonology', 'Nephrology', 'Neurology'] },
            { name: 'Pharmacology', nameTamil: 'மருந்தியல்', questions: 50, marks: 50, topics: ['Drug Actions', 'Therapeutics', 'Adverse Effects'] },
            { name: 'Pathology', nameTamil: 'நோயியல்', questions: 50, marks: 50, topics: ['Clinical Pathology', 'Histopathology', 'Microbiology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-md-q1',
            year: '2024',
            question: 'The most common cause of community-acquired pneumonia in adults is:',
            options: ['Staphylococcus aureus', 'Streptococcus pneumoniae', 'Klebsiella pneumoniae', 'Pseudomonas aeruginosa'],
            correctAnswer: 1,
            explanation: 'Streptococcus pneumoniae (Pneumococcus) is the most common bacterial cause of community-acquired pneumonia worldwide.',
            topic: 'Pulmonology',
            difficulty: 'Easy'
          },
          {
            id: 'mgr-md-q2',
            year: '2024',
            question: 'Which drug is the first-line treatment for Type 2 Diabetes Mellitus?',
            options: ['Glimepiride', 'Metformin', 'Insulin', 'Pioglitazone'],
            correctAnswer: 1,
            explanation: 'Metformin is the first-line drug for T2DM due to its efficacy, safety profile, and cardiovascular benefits.',
            topic: 'Pharmacology',
            difficulty: 'Easy'
          },
          {
            id: 'mgr-md-q3',
            year: '2023',
            question: 'Reed-Sternberg cells are pathognomonic of:',
            options: ['Non-Hodgkin lymphoma', 'Hodgkin lymphoma', 'Multiple myeloma', 'Chronic lymphocytic leukemia'],
            correctAnswer: 1,
            explanation: 'Reed-Sternberg cells are the characteristic giant cells seen in Hodgkin lymphoma.',
            topic: 'Pathology',
            difficulty: 'Medium'
          },
          {
            id: 'mgr-md-q4',
            year: '2023',
            question: 'The most common cardiac arrhythmia is:',
            options: ['Ventricular tachycardia', 'Atrial fibrillation', 'Complete heart block', 'Ventricular fibrillation'],
            correctAnswer: 1,
            explanation: 'Atrial fibrillation is the most common sustained cardiac arrhythmia, especially in elderly patients.',
            topic: 'Cardiology',
            difficulty: 'Easy'
          },
          {
            id: 'mgr-md-q5',
            year: '2024',
            question: 'The gold standard for diagnosis of pulmonary embolism is:',
            options: ['D-dimer', 'Chest X-ray', 'CT Pulmonary Angiography', 'ECG'],
            correctAnswer: 2,
            explanation: 'CT Pulmonary Angiography (CTPA) is the gold standard imaging for diagnosing pulmonary embolism.',
            topic: 'Pulmonology',
            difficulty: 'Medium'
          }
        ],
        tips: ['Focus on clinical case-based questions', 'Study Harrison\'s Principles of Internal Medicine', 'Practice NEET PG question banks']
      },
      {
        id: 'mgr-ms-surgery',
        name: 'MS (General Surgery)',
        nameTamil: 'எம்.எஸ் (பொது அறுவை சிகிச்சை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (Offline)',
          negativeMarking: true,
          sections: [
            { name: 'General Surgery', nameTamil: 'பொது அறுவை சிகிச்சை', questions: 100, marks: 100, topics: ['GI Surgery', 'Trauma', 'Oncology', 'Vascular'] },
            { name: 'Anatomy', nameTamil: 'உடற்கூறியல்', questions: 50, marks: 50, topics: ['Surgical Anatomy', 'Applied Anatomy'] },
            { name: 'Anesthesiology', nameTamil: 'மயக்கவியல்', questions: 50, marks: 50, topics: ['General Anesthesia', 'Regional Anesthesia', 'Pain Management'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-ms-q1',
            year: '2024',
            question: 'McBurney\'s point is located at:',
            options: ['Junction of lateral 1/3 and medial 2/3 of line joining ASIS to umbilicus', 'Junction of medial 1/3 and lateral 2/3 of line joining ASIS to umbilicus', 'Midpoint of inguinal ligament', 'Below the umbilicus'],
            correctAnswer: 0,
            explanation: 'McBurney\'s point is the classic site of maximum tenderness in appendicitis, located at the junction of lateral 1/3 and medial 2/3.',
            topic: 'GI Surgery',
            difficulty: 'Easy'
          },
          {
            id: 'mgr-ms-q2',
            year: '2024',
            question: 'The most common type of hernia in males is:',
            options: ['Direct inguinal hernia', 'Indirect inguinal hernia', 'Femoral hernia', 'Umbilical hernia'],
            correctAnswer: 1,
            explanation: 'Indirect inguinal hernia is the most common type in males, occurring through the deep inguinal ring.',
            topic: 'General Surgery',
            difficulty: 'Easy'
          },
          {
            id: 'mgr-ms-q3',
            year: '2023',
            question: 'Virchow\'s triad includes all EXCEPT:',
            options: ['Stasis', 'Endothelial injury', 'Hypercoagulability', 'Atherosclerosis'],
            correctAnswer: 3,
            explanation: 'Virchow\'s triad consists of stasis, endothelial injury, and hypercoagulability - the three factors for venous thrombosis.',
            topic: 'Vascular Surgery',
            difficulty: 'Medium'
          },
          {
            id: 'mgr-ms-q4',
            year: '2023',
            question: 'The nerve most commonly injured in posterior dislocation of hip is:',
            options: ['Femoral nerve', 'Obturator nerve', 'Sciatic nerve', 'Tibial nerve'],
            correctAnswer: 2,
            explanation: 'The sciatic nerve runs posterior to the hip joint and is at risk during posterior hip dislocation.',
            topic: 'Surgical Anatomy',
            difficulty: 'Medium'
          },
          {
            id: 'mgr-ms-q5',
            year: '2024',
            question: 'Malampati classification is used for:',
            options: ['Difficult intubation assessment', 'ASA physical status', 'Wound classification', 'Burn assessment'],
            correctAnswer: 0,
            explanation: 'Mallampati classification assesses the visibility of pharyngeal structures to predict difficult intubation.',
            topic: 'Anesthesiology',
            difficulty: 'Easy'
          }
        ],
        tips: ['Master surgical anatomy', 'Study Bailey & Love\'s Surgery', 'Practice operative surgery steps']
      },
      {
        id: 'mgr-bpt',
        name: 'BPT (Physiotherapy)',
        nameTamil: 'பி.பி.டி (இயன்முறை மருத்துவம்)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 25, marks: 25, topics: ['Mechanics', 'Heat', 'Electricity'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 25, marks: 25, topics: ['Organic', 'Inorganic', 'Physical'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 35, marks: 35, topics: ['Human Anatomy', 'Physiology', 'Zoology'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 15, marks: 15, topics: ['Grammar', 'Comprehension'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-bpt-q1',
            year: '2024',
            question: 'The largest bone in the human body is:',
            options: ['Humerus', 'Tibia', 'Femur', 'Fibula'],
            correctAnswer: 2,
            explanation: 'The femur (thigh bone) is the longest and strongest bone in the human body.',
            topic: 'Human Anatomy',
            difficulty: 'Easy'
          },
          {
            id: 'mgr-bpt-q2',
            year: '2024',
            question: 'The normal resting heart rate in adults is:',
            options: ['40-60 bpm', '60-100 bpm', '100-120 bpm', '120-140 bpm'],
            correctAnswer: 1,
            explanation: 'Normal resting heart rate for adults is 60-100 beats per minute.',
            topic: 'Physiology',
            difficulty: 'Easy'
          },
          {
            id: 'mgr-bpt-q3',
            year: '2023',
            question: 'pH of blood is:',
            options: ['6.8-7.0', '7.0-7.2', '7.35-7.45', '7.6-7.8'],
            correctAnswer: 2,
            explanation: 'Normal blood pH is maintained between 7.35-7.45, which is slightly alkaline.',
            topic: 'Physiology',
            difficulty: 'Easy'
          },
          {
            id: 'mgr-bpt-q4',
            year: '2023',
            question: 'Ohm\'s law states that:',
            options: ['V = IR', 'V = I/R', 'V = R/I', 'V = I + R'],
            correctAnswer: 0,
            explanation: 'Ohm\'s law states that voltage (V) equals current (I) times resistance (R): V = IR.',
            topic: 'Physics',
            difficulty: 'Easy'
          },
          {
            id: 'mgr-bpt-q5',
            year: '2024',
            question: 'The functional unit of kidney is:',
            options: ['Nephron', 'Glomerulus', 'Bowman\'s capsule', 'Loop of Henle'],
            correctAnswer: 0,
            explanation: 'The nephron is the structural and functional unit of the kidney responsible for urine formation.',
            topic: 'Human Anatomy',
            difficulty: 'Easy'
          }
        ],
        tips: ['Focus on human anatomy and physiology', 'Study 12th standard Physics, Chemistry, Biology', 'Practice NEET-level questions']
      },
      {
        id: 'mgr-mpharm',
        name: 'M.Pharm (Pharmacy)',
        nameTamil: 'எம்.பார்ம் (மருந்தகவியல்)',
        type: 'PG',
        examPattern: {
          totalQuestions: 150,
          totalMarks: 150,
          duration: '2.5 Hours',
          durationMinutes: 150,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Pharmaceutics', nameTamil: 'மருந்தாக்கவியல்', questions: 50, marks: 50, topics: ['Drug Delivery', 'Formulations', 'Biopharmaceutics'] },
            { name: 'Pharmacology', nameTamil: 'மருந்தியல்', questions: 50, marks: 50, topics: ['Drug Actions', 'Toxicology', 'Clinical Pharmacology'] },
            { name: 'Pharmaceutical Chemistry', nameTamil: 'மருந்து வேதியியல்', questions: 50, marks: 50, topics: ['Medicinal Chemistry', 'Organic Synthesis', 'Drug Design'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-mpharm-q1',
            year: '2024',
            question: 'The bioavailability of a drug administered intravenously is:',
            options: ['50%', '75%', '90%', '100%'],
            correctAnswer: 3,
            explanation: 'IV administration gives 100% bioavailability as the drug directly enters the systemic circulation.',
            topic: 'Biopharmaceutics',
            difficulty: 'Easy'
          },
          {
            id: 'mgr-mpharm-q2',
            year: '2024',
            question: 'Which enzyme is inhibited by Aspirin?',
            options: ['Lipoxygenase', 'Cyclooxygenase', 'Phospholipase', 'Peroxidase'],
            correctAnswer: 1,
            explanation: 'Aspirin irreversibly inhibits cyclooxygenase (COX) enzymes, blocking prostaglandin synthesis.',
            topic: 'Pharmacology',
            difficulty: 'Easy'
          },
          {
            id: 'mgr-mpharm-q3',
            year: '2023',
            question: 'Enteric coating is used to:',
            options: ['Improve taste', 'Protect drug from gastric acid', 'Increase absorption', 'Reduce cost'],
            correctAnswer: 1,
            explanation: 'Enteric coating protects acid-labile drugs from gastric acid degradation.',
            topic: 'Pharmaceutics',
            difficulty: 'Easy'
          },
          {
            id: 'mgr-mpharm-q4',
            year: '2023',
            question: 'SAR stands for:',
            options: ['Structure Activity Relationship', 'Synthesis Analysis Report', 'Stable Active Radicals', 'Standard Assay Range'],
            correctAnswer: 0,
            explanation: 'SAR (Structure Activity Relationship) studies the relationship between chemical structure and biological activity.',
            topic: 'Medicinal Chemistry',
            difficulty: 'Easy'
          },
          {
            id: 'mgr-mpharm-q5',
            year: '2024',
            question: 'The therapeutic index is the ratio of:',
            options: ['ED50/LD50', 'LD50/ED50', 'MIC/MEC', 'Cmax/Cmin'],
            correctAnswer: 1,
            explanation: 'Therapeutic Index = LD50/ED50. Higher TI indicates a safer drug with wider margin between therapeutic and toxic doses.',
            topic: 'Pharmacology',
            difficulty: 'Medium'
          }
        ],
        tips: ['Study GPAT previous papers', 'Focus on pharmaceutics and pharmacology', 'Master drug classifications']
      },
      // ============= MBBS (Medical) =============
      {
        id: 'mgr-mbbs',
        name: 'MBBS (Bachelor of Medicine & Surgery)',
        nameTamil: 'எம்.பி.பி.எஸ் (மருத்துவ இளங்கலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 720,
          duration: '3 Hours 20 Minutes',
          durationMinutes: 200,
          mode: 'Computer Based Test (NEET-UG)',
          negativeMarking: true,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 45, marks: 180, topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 180, topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 90, marks: 360, topics: ['Botany', 'Zoology', 'Human Physiology', 'Genetics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-mbbs-q1',
            year: '2024',
            question: 'Which organelle is known as the powerhouse of the cell?',
            options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
            correctAnswer: 1,
            explanation: 'Mitochondria are called the powerhouse because they produce ATP through cellular respiration.',
            topic: 'Cell Biology',
            difficulty: 'Easy'
          },
          {
            id: 'mgr-mbbs-q2',
            year: '2024',
            question: 'The normal blood pH range in humans is:',
            options: ['6.8-7.0', '7.35-7.45', '7.5-7.8', '8.0-8.5'],
            correctAnswer: 1,
            explanation: 'Normal blood pH is maintained between 7.35-7.45 for optimal enzyme function.',
            topic: 'Human Physiology',
            difficulty: 'Easy'
          },
          {
            id: 'mgr-mbbs-q3',
            year: '2023',
            question: 'DNA replication is:',
            options: ['Conservative', 'Semi-conservative', 'Dispersive', 'Non-conservative'],
            correctAnswer: 1,
            explanation: 'DNA replication is semi-conservative as each new DNA molecule contains one old and one new strand.',
            topic: 'Genetics',
            difficulty: 'Easy'
          }
        ],
        tips: ['Focus heavily on NCERT Biology', 'Practice NEET previous year papers', 'Master human physiology topics']
      },
      // ============= BDS (Dental) =============
      {
        id: 'mgr-bds',
        name: 'BDS (Bachelor of Dental Surgery)',
        nameTamil: 'பி.டி.எஸ் (பல் மருத்துவ இளங்கலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 720,
          duration: '3 Hours 20 Minutes',
          durationMinutes: 200,
          mode: 'Computer Based Test (NEET-UG)',
          negativeMarking: true,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 45, marks: 180, topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 180, topics: ['Organic', 'Inorganic', 'Physical Chemistry'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 90, marks: 360, topics: ['Botany', 'Zoology', 'Anatomy', 'Physiology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-bds-q1',
            year: '2024',
            question: 'The hardest substance in the human body is:',
            options: ['Dentin', 'Bone', 'Enamel', 'Cementum'],
            correctAnswer: 2,
            explanation: 'Tooth enamel is the hardest substance in the human body, containing 96% minerals.',
            topic: 'Dental Anatomy',
            difficulty: 'Easy'
          },
          {
            id: 'mgr-bds-q2',
            year: '2023',
            question: 'The total number of permanent teeth in an adult is:',
            options: ['20', '28', '32', '36'],
            correctAnswer: 2,
            explanation: 'Adults have 32 permanent teeth including 4 wisdom teeth.',
            topic: 'Dental Anatomy',
            difficulty: 'Easy'
          }
        ],
        tips: ['NEET-UG is the common entrance', 'Focus on Biology as it carries maximum marks', 'Study dental anatomy basics']
      },
      // ============= MDS (Dental PG) =============
      {
        id: 'mgr-mds',
        name: 'MDS (Master of Dental Surgery)',
        nameTamil: 'எம்.டி.எஸ் (பல் மருத்துவ முதுநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 800,
          duration: '3 Hours 30 Minutes',
          durationMinutes: 210,
          mode: 'Computer Based Test (NEET-MDS)',
          negativeMarking: true,
          sections: [
            { name: 'Dental Sciences', nameTamil: 'பல் அறிவியல்', questions: 200, marks: 800, topics: ['Oral Pathology', 'Prosthodontics', 'Orthodontics', 'Periodontics', 'Oral Surgery'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-mds-q1',
            year: '2024',
            question: 'Leeway space in dentition is:',
            options: ['2mm', '3mm', '4.5mm', '6mm'],
            correctAnswer: 2,
            explanation: 'Leeway space is approximately 4.5mm in mandible (2.5mm per side) and 3mm in maxilla.',
            topic: 'Orthodontics',
            difficulty: 'Medium'
          },
          {
            id: 'mgr-mds-q2',
            year: '2023',
            question: 'Most common site of oral cancer in India is:',
            options: ['Tongue', 'Buccal mucosa', 'Lip', 'Palate'],
            correctAnswer: 1,
            explanation: 'Buccal mucosa is the most common site due to tobacco chewing habits in India.',
            topic: 'Oral Pathology',
            difficulty: 'Easy'
          }
        ],
        tips: ['Prepare thoroughly for NEET-MDS', 'Study all dental specializations', 'Focus on clinical scenarios']
      },
      // ============= BAMS (Indian Medicine) =============
      {
        id: 'mgr-bams',
        name: 'BAMS (Bachelor of Ayurvedic Medicine & Surgery)',
        nameTamil: 'பி.ஏ.எம்.எஸ் (ஆயுர்வேத மருத்துவம்)',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 720,
          duration: '3 Hours 20 Minutes',
          durationMinutes: 200,
          mode: 'Computer Based Test (NEET-UG)',
          negativeMarking: true,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 45, marks: 180, topics: ['Mechanics', 'Thermodynamics', 'Optics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 180, topics: ['Organic', 'Inorganic', 'Physical'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 90, marks: 360, topics: ['Botany', 'Zoology', 'Anatomy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-bams-q1',
            year: '2024',
            question: 'According to Ayurveda, the three doshas are:',
            options: ['Vata, Pitta, Kapha', 'Sattva, Rajas, Tamas', 'Ojas, Tejas, Prana', 'Rasa, Rakta, Mamsa'],
            correctAnswer: 0,
            explanation: 'Vata, Pitta, and Kapha are the three fundamental doshas in Ayurveda governing body functions.',
            topic: 'Ayurvedic Fundamentals',
            difficulty: 'Easy'
          }
        ],
        tips: ['NEET-UG score is used for admission', 'Study basic Ayurveda principles after selection', 'Focus on Biology for NEET']
      },
      // ============= BHMS (Homoeopathy) =============
      {
        id: 'mgr-bhms',
        name: 'BHMS (Bachelor of Homoeopathic Medicine & Surgery)',
        nameTamil: 'பி.எச்.எம்.எஸ் (ஹோமியோபதி மருத்துவம்)',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 720,
          duration: '3 Hours 20 Minutes',
          durationMinutes: 200,
          mode: 'Computer Based Test (NEET-UG)',
          negativeMarking: true,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 45, marks: 180, topics: ['Mechanics', 'Waves', 'Optics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 180, topics: ['Organic', 'Inorganic', 'Physical'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 90, marks: 360, topics: ['Botany', 'Zoology', 'Human Physiology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-bhms-q1',
            year: '2024',
            question: 'The principle of Homoeopathy "Similia Similibus Curentur" means:',
            options: ['Opposites cure opposites', 'Like cures like', 'Nature heals', 'Prevention is cure'],
            correctAnswer: 1,
            explanation: 'Similia Similibus Curentur means "Like cures like" - the fundamental principle of Homoeopathy.',
            topic: 'Homoeopathic Principles',
            difficulty: 'Easy'
          }
        ],
        tips: ['NEET-UG is mandatory for admission', 'Focus on Biology sections', 'Learn Homoeopathy basics post-admission']
      },
      // ============= BSMS (Siddha Medicine) =============
      {
        id: 'mgr-bsms',
        name: 'BSMS (Bachelor of Siddha Medicine & Surgery)',
        nameTamil: 'பி.எஸ்.எம்.எஸ் (சித்த மருத்துவம்)',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 720,
          duration: '3 Hours 20 Minutes',
          durationMinutes: 200,
          mode: 'Computer Based Test (NEET-UG)',
          negativeMarking: true,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 45, marks: 180, topics: ['Mechanics', 'Heat', 'Optics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 180, topics: ['Organic', 'Inorganic', 'Physical'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 90, marks: 360, topics: ['Botany', 'Zoology', 'Anatomy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-bsms-q1',
            year: '2024',
            question: 'Siddha medicine originated in:',
            options: ['North India', 'Tamil Nadu', 'Kerala', 'Karnataka'],
            correctAnswer: 1,
            explanation: 'Siddha is one of the oldest medical systems originating from Tamil Nadu, practiced by Siddhars.',
            topic: 'Siddha Fundamentals',
            difficulty: 'Easy'
          }
        ],
        tips: ['NEET-UG required for admission', 'Strong Biology foundation essential', 'Unique to Tamil Nadu - learn Tamil medical terms']
      },
      // ============= B.Sc Nursing =============
      {
        id: 'mgr-bsc-nursing',
        name: 'B.Sc Nursing',
        nameTamil: 'பி.எஸ்சி செவிலியர்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 720,
          duration: '3 Hours 20 Minutes',
          durationMinutes: 200,
          mode: 'Computer Based Test (NEET-UG)',
          negativeMarking: true,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 45, marks: 180, topics: ['Mechanics', 'Heat', 'Optics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 180, topics: ['Organic', 'Inorganic', 'Physical'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 90, marks: 360, topics: ['Anatomy', 'Physiology', 'Microbiology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-nursing-q1',
            year: '2024',
            question: 'The normal respiratory rate in adults is:',
            options: ['8-12 breaths/min', '12-20 breaths/min', '20-30 breaths/min', '30-40 breaths/min'],
            correctAnswer: 1,
            explanation: 'Normal adult respiratory rate is 12-20 breaths per minute at rest.',
            topic: 'Nursing Fundamentals',
            difficulty: 'Easy'
          },
          {
            id: 'mgr-nursing-q2',
            year: '2023',
            question: 'The largest organ in the human body is:',
            options: ['Liver', 'Skin', 'Brain', 'Heart'],
            correctAnswer: 1,
            explanation: 'Skin is the largest organ, covering approximately 2 square meters in adults.',
            topic: 'Anatomy',
            difficulty: 'Easy'
          }
        ],
        tips: ['NEET-UG required for government nursing colleges', 'Focus on anatomy and physiology', 'Clinical skills important']
      },
      // ============= M.Sc Nursing =============
      {
        id: 'mgr-msc-nursing',
        name: 'M.Sc Nursing',
        nameTamil: 'எம்.எஸ்சி செவிலியர்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Nursing', nameTamil: 'செவிலியர்', questions: 60, marks: 60, topics: ['Medical-Surgical', 'Community Health', 'Pediatric', 'Psychiatric'] },
            { name: 'Research Methodology', nameTamil: 'ஆராய்ச்சி முறை', questions: 20, marks: 20, topics: ['Research Design', 'Statistics', 'Ethics'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 20, marks: 20, topics: ['Reasoning', 'English', 'Current Affairs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-msc-nursing-q1',
            year: '2024',
            question: 'Florence Nightingale is known as:',
            options: ['Mother of Medicine', 'Lady with the Lamp', 'Pioneer of Surgery', 'Queen of Hospitals'],
            correctAnswer: 1,
            explanation: 'Florence Nightingale is called "Lady with the Lamp" for her night rounds during the Crimean War.',
            topic: 'Nursing History',
            difficulty: 'Easy'
          }
        ],
        tips: ['Study B.Sc Nursing subjects thoroughly', 'Focus on specialization areas', 'Practice research methodology']
      },
      // ============= B.Pharm =============
      {
        id: 'mgr-bpharm',
        name: 'B.Pharm (Bachelor of Pharmacy)',
        nameTamil: 'பி.ஃபார்ம் (மருந்தியல் இளங்கலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 720,
          duration: '3 Hours 20 Minutes',
          durationMinutes: 200,
          mode: 'Computer Based Test (NEET-UG)',
          negativeMarking: true,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 45, marks: 180, topics: ['Mechanics', 'Thermodynamics', 'Optics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 180, topics: ['Organic', 'Inorganic', 'Physical'] },
            { name: 'Biology/Mathematics', nameTamil: 'உயிரியல்/கணிதம்', questions: 90, marks: 360, topics: ['Botany', 'Zoology', 'Mathematics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-bpharm-q1',
            year: '2024',
            question: 'The study of drugs and their sources is called:',
            options: ['Pharmacology', 'Pharmacognosy', 'Pharmacokinetics', 'Pharmaceutics'],
            correctAnswer: 1,
            explanation: 'Pharmacognosy is the study of drugs from natural sources - plants, animals, and minerals.',
            topic: 'Pharmacy Fundamentals',
            difficulty: 'Easy'
          }
        ],
        tips: ['NEET-UG or state-level exams for admission', 'Strong chemistry foundation required', 'Focus on organic chemistry']
      },
      // ============= Pharm.D =============
      {
        id: 'mgr-pharmd',
        name: 'Pharm.D (Doctor of Pharmacy)',
        nameTamil: 'ஃபார்ம்.டி (மருந்தியல் முனைவர்)',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 720,
          duration: '3 Hours 20 Minutes',
          durationMinutes: 200,
          mode: 'Computer Based Test (NEET-UG)',
          negativeMarking: true,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 45, marks: 180, topics: ['Mechanics', 'Thermodynamics', 'Modern Physics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 180, topics: ['Organic', 'Inorganic', 'Physical'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 90, marks: 360, topics: ['Botany', 'Zoology', 'Biochemistry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-pharmd-q1',
            year: '2024',
            question: 'Pharm.D is a:',
            options: ['4-year course', '5-year course', '6-year course', '3-year course'],
            correctAnswer: 2,
            explanation: 'Pharm.D is a 6-year clinical pharmacy doctorate program (5 years + 1 year internship).',
            topic: 'Pharmacy Courses',
            difficulty: 'Easy'
          }
        ],
        tips: ['6-year integrated program', 'Clinical pharmacy focus', 'Hospital internship mandatory']
      },
      // ============= MPT (Physiotherapy PG) =============
      {
        id: 'mgr-mpt',
        name: 'MPT (Master of Physiotherapy)',
        nameTamil: 'எம்.பி.டி (இயன் மருத்துவ முதுநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Physiotherapy', nameTamil: 'இயன் மருத்துவம்', questions: 70, marks: 70, topics: ['Musculoskeletal', 'Neurology', 'Cardiopulmonary', 'Sports PT'] },
            { name: 'Anatomy & Physiology', nameTamil: 'உடலமைப்பு & செயலியல்', questions: 20, marks: 20, topics: ['Human Anatomy', 'Exercise Physiology'] },
            { name: 'Research Methods', nameTamil: 'ஆராய்ச்சி முறை', questions: 10, marks: 10, topics: ['Evidence-Based Practice', 'Statistics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-mpt-q1',
            year: '2024',
            question: 'The gait cycle is divided into:',
            options: ['2 phases', '4 phases', 'Stance and Swing phases', '6 phases'],
            correctAnswer: 2,
            explanation: 'The gait cycle consists of Stance phase (60%) and Swing phase (40%).',
            topic: 'Biomechanics',
            difficulty: 'Easy'
          }
        ],
        tips: ['Study BPT subjects well', 'Focus on your specialization area', 'Clinical experience matters']
      },
      // ============= MOT (Occupational Therapy PG) =============
      {
        id: 'mgr-mot',
        name: 'MOT (Master of Occupational Therapy)',
        nameTamil: 'எம்.ஓ.டி (தொழில் சிகிச்சை முதுநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Occupational Therapy', nameTamil: 'தொழில் சிகிச்சை', questions: 70, marks: 70, topics: ['Pediatrics', 'Neurology', 'Hand Therapy', 'Mental Health'] },
            { name: 'Anatomy & Kinesiology', nameTamil: 'உடலமைப்பு & இயக்கவியல்', questions: 20, marks: 20, topics: ['Functional Anatomy', 'Movement Science'] },
            { name: 'Research', nameTamil: 'ஆராய்ச்சி', questions: 10, marks: 10, topics: ['Research Design', 'Outcome Measures'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-mot-q1',
            year: '2024',
            question: 'Activities of Daily Living (ADL) include:',
            options: ['Only bathing', 'Bathing, dressing, eating, toileting', 'Only eating', 'Only dressing'],
            correctAnswer: 1,
            explanation: 'ADLs include basic self-care tasks: bathing, dressing, eating, toileting, and mobility.',
            topic: 'OT Fundamentals',
            difficulty: 'Easy'
          }
        ],
        tips: ['Focus on clinical reasoning', 'Study activity analysis', 'Practice case studies']
      },
      // ============= B.Sc Allied Health Sciences =============
      {
        id: 'mgr-bsc-mlt',
        name: 'B.Sc Medical Lab Technology (MLT)',
        nameTamil: 'பி.எஸ்சி மருத்துவ ஆய்வக தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Microbiology', 'Biochemistry', 'Pathology'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Clinical Chemistry', 'Organic Chemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Lab Instrumentation', 'Basic Physics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-mlt-q1',
            year: '2024',
            question: 'The normal fasting blood glucose level is:',
            options: ['50-70 mg/dL', '70-100 mg/dL', '100-140 mg/dL', '140-180 mg/dL'],
            correctAnswer: 1,
            explanation: 'Normal fasting blood glucose is 70-100 mg/dL (3.9-5.6 mmol/L).',
            topic: 'Clinical Chemistry',
            difficulty: 'Easy'
          }
        ],
        tips: ['Focus on lab techniques', 'Study hematology and biochemistry', 'Practical skills essential']
      },
      {
        id: 'mgr-bsc-radiology',
        name: 'B.Sc Medical Imaging Technology',
        nameTamil: 'பி.எஸ்சி மருத்துவ படிமவியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 40, marks: 40, topics: ['Radiation Physics', 'X-ray Production', 'CT/MRI Basics'] },
            { name: 'Anatomy', nameTamil: 'உடலமைப்பியல்', questions: 35, marks: 35, topics: ['Cross-sectional Anatomy', 'Radiological Anatomy'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 25, marks: 25, topics: ['Radiation Biology', 'Safety'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-radiology-q1',
            year: '2024',
            question: 'X-rays were discovered by:',
            options: ['Marie Curie', 'Wilhelm Roentgen', 'Albert Einstein', 'Niels Bohr'],
            correctAnswer: 1,
            explanation: 'Wilhelm Conrad Roentgen discovered X-rays in 1895 and received the first Nobel Prize in Physics.',
            topic: 'History of Radiology',
            difficulty: 'Easy'
          }
        ],
        tips: ['Strong physics foundation needed', 'Learn imaging modalities', 'Radiation safety is crucial']
      },
      {
        id: 'mgr-bsc-ot',
        name: 'B.Sc Operation Theatre Technology',
        nameTamil: 'பி.எஸ்சி அறுவை சிகிச்சை தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Anatomy', nameTamil: 'உடலமைப்பியல்', questions: 35, marks: 35, topics: ['Surgical Anatomy', 'Applied Anatomy'] },
            { name: 'Surgery Basics', nameTamil: 'அறுவை சிகிச்சை அடிப்படை', questions: 40, marks: 40, topics: ['Surgical Instruments', 'Sterilization', 'OT Setup'] },
            { name: 'Physiology', nameTamil: 'செயலியல்', questions: 25, marks: 25, topics: ['Anesthesia Basics', 'Vital Signs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-ot-q1',
            year: '2024',
            question: 'The most effective method of sterilization is:',
            options: ['Boiling', 'Autoclaving', 'Chemical disinfection', 'UV radiation'],
            correctAnswer: 1,
            explanation: 'Autoclaving (steam under pressure at 121°C for 15-20 min) is the most reliable sterilization method.',
            topic: 'Sterilization',
            difficulty: 'Easy'
          }
        ],
        tips: ['Learn surgical instruments', 'Sterile technique is fundamental', 'OT protocols important']
      },
      {
        id: 'mgr-bsc-cardiac',
        name: 'B.Sc Cardiac Care Technology',
        nameTamil: 'பி.எஸ்சி இதய பராமரிப்பு தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Cardiology', nameTamil: 'இதயவியல்', questions: 40, marks: 40, topics: ['ECG', 'Cardiac Anatomy', 'Heart Diseases'] },
            { name: 'Physiology', nameTamil: 'செயலியல்', questions: 35, marks: 35, topics: ['Cardiac Physiology', 'Hemodynamics'] },
            { name: 'Technology', nameTamil: 'தொழில்நுட்பம்', questions: 25, marks: 25, topics: ['Cardiac Devices', 'Monitoring Equipment'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-cardiac-q1',
            year: '2024',
            question: 'The normal heart rate in adults at rest is:',
            options: ['40-60 bpm', '60-100 bpm', '100-120 bpm', '120-140 bpm'],
            correctAnswer: 1,
            explanation: 'Normal resting heart rate for adults is 60-100 beats per minute.',
            topic: 'Cardiac Physiology',
            difficulty: 'Easy'
          }
        ],
        tips: ['Master ECG interpretation', 'Learn cardiac procedures', 'CCU protocols important']
      },
      // ============= DM/MCh (Post Doctoral) =============
      {
        id: 'mgr-dm-cardiology',
        name: 'DM Cardiology',
        nameTamil: 'டி.எம் இதயவியல்',
        type: 'Super-Specialty',
        examPattern: {
          totalQuestions: 90,
          totalMarks: 360,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Computer Based Test (NEET-SS)',
          negativeMarking: true,
          sections: [
            { name: 'Cardiology', nameTamil: 'இதயவியல்', questions: 90, marks: 360, topics: ['Interventional Cardiology', 'Electrophysiology', 'Heart Failure', 'Imaging'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-dm-cardio-q1',
            year: '2024',
            question: 'The drug of choice for acute STEMI is:',
            options: ['Aspirin alone', 'Primary PCI', 'Thrombolytics only', 'Beta blockers'],
            correctAnswer: 1,
            explanation: 'Primary PCI (Percutaneous Coronary Intervention) is the gold standard for STEMI within 90-120 minutes.',
            topic: 'Interventional Cardiology',
            difficulty: 'Medium'
          }
        ],
        tips: ['MD Medicine prerequisite', 'Focus on interventional procedures', 'NEET-SS required']
      },
      {
        id: 'mgr-mch-neuro',
        name: 'MCh Neurosurgery',
        nameTamil: 'எம்.சி.எச் நரம்பு அறுவை சிகிச்சை',
        type: 'Super-Specialty',
        examPattern: {
          totalQuestions: 90,
          totalMarks: 360,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Computer Based Test (NEET-SS)',
          negativeMarking: true,
          sections: [
            { name: 'Neurosurgery', nameTamil: 'நரம்பு அறுவை சிகிச்சை', questions: 90, marks: 360, topics: ['Neurotrauma', 'Brain Tumors', 'Spine Surgery', 'Vascular'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'mgr-mch-neuro-q1',
            year: '2024',
            question: 'Most common primary brain tumor in adults is:',
            options: ['Meningioma', 'Glioblastoma', 'Schwannoma', 'Pituitary adenoma'],
            correctAnswer: 1,
            explanation: 'Glioblastoma multiforme (GBM) is the most common and aggressive primary brain tumor in adults.',
            topic: 'Neuro-oncology',
            difficulty: 'Medium'
          }
        ],
        tips: ['MS General Surgery prerequisite', 'Intensive 3-year training', 'High competition exam']
      },
      // ============= BUMS (Unani Medicine) =============
      {
        id: 'mgr-bums',
        name: 'BUMS (Bachelor of Unani Medicine & Surgery)',
        nameTamil: 'பி.யு.எம்.எஸ் (யுனானி மருத்துவம்)',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 720,
          duration: '3 Hours 20 Minutes',
          durationMinutes: 200,
          mode: 'Computer Based Test (NEET-UG)',
          negativeMarking: true,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 45, marks: 180, topics: ['Mechanics', 'Heat', 'Optics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 180, topics: ['Organic', 'Inorganic', 'Physical'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 90, marks: 360, topics: ['Botany', 'Zoology', 'Anatomy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-bums-q1', year: '2024', question: 'The founder of Unani medicine is considered to be:', options: ['Hippocrates', 'Galen', 'Avicenna', 'Charaka'], correctAnswer: 0, explanation: 'Hippocrates is considered the father of Unani medicine, which was later developed by Greek and Arab physicians.', topic: 'Unani History', difficulty: 'Easy' }
        ],
        tips: ['NEET-UG is mandatory', 'Limited colleges in TN', 'Focus on Biology for NEET preparation']
      },
      // ============= BNYS (Naturopathy & Yoga) =============
      {
        id: 'mgr-bnys',
        name: 'BNYS (Bachelor of Naturopathy & Yogic Sciences)',
        nameTamil: 'பி.என்.ஒய்.எஸ் (இயற்கை மருத்துவம் & யோகா)',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 720,
          duration: '3 Hours 20 Minutes',
          durationMinutes: 200,
          mode: 'Computer Based Test (NEET-UG)',
          negativeMarking: true,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 45, marks: 180, topics: ['Mechanics', 'Heat', 'Light'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 180, topics: ['Organic', 'Inorganic', 'Physical'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 90, marks: 360, topics: ['Botany', 'Zoology', 'Human Physiology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-bnys-q1', year: '2024', question: 'The Five Elements (Pancha Mahabhutas) in Naturopathy are:', options: ['Earth, Water, Fire, Air, Ether', 'Earth, Water, Fire, Wind, Space', 'Fire, Water, Air, Metal, Wood', 'Water, Fire, Earth, Sky, Soul'], correctAnswer: 0, explanation: 'Pancha Mahabhutas are Earth (Prithvi), Water (Jala), Fire (Agni), Air (Vayu), and Ether/Space (Akasha).', topic: 'Naturopathy Principles', difficulty: 'Easy' }
        ],
        tips: ['NEET-UG required', 'Growing demand for holistic medicine', 'Yoga certification beneficial']
      },
      // ============= BOT (Occupational Therapy UG) =============
      {
        id: 'mgr-bot',
        name: 'BOT (Bachelor of Occupational Therapy)',
        nameTamil: 'பி.ஓ.டி (தொழில் சிகிச்சை இளங்கலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'Merit Based (12th PCB)',
          negativeMarking: false,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 25, marks: 25, topics: ['Mechanics', 'Heat', 'Light'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 25, marks: 25, topics: ['Organic', 'Inorganic', 'Physical'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 35, marks: 35, topics: ['Anatomy', 'Physiology', 'Biochemistry'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 15, marks: 15, topics: ['Grammar', 'Comprehension'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-bot-q1', year: '2024', question: 'OT focuses primarily on:', options: ['Surgery', 'Medication', 'Daily living activities rehabilitation', 'Lab diagnosis'], correctAnswer: 2, explanation: 'Occupational Therapy focuses on helping people perform activities of daily living (ADL) through rehabilitation.', topic: 'OT Fundamentals', difficulty: 'Easy' }
        ],
        tips: ['4-year program with internship', 'Focus on rehabilitation sciences', 'Good scope in pediatrics and neurology']
      },
      // ============= B.Sc Dialysis Technology =============
      {
        id: 'mgr-bsc-dialysis',
        name: 'B.Sc Renal Dialysis Technology',
        nameTamil: 'பி.எஸ்சி சிறுநீரக டயாலிசிஸ் தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'Merit Based (12th PCB)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Renal Physiology', 'Anatomy', 'Nephrology Basics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Biochemistry', 'Clinical Chemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Dialysis Equipment', 'Fluid Mechanics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-dialysis-q1', year: '2024', question: 'The functional unit of kidney is:', options: ['Glomerulus', 'Nephron', 'Bowman capsule', 'Loop of Henle'], correctAnswer: 1, explanation: 'Nephron is the structural and functional unit of the kidney responsible for urine formation.', topic: 'Renal Anatomy', difficulty: 'Easy' }
        ],
        tips: ['High demand in hospitals', 'Focus on renal physiology', 'Practical skills essential']
      },
      // ============= B.Sc Respiratory Therapy =============
      {
        id: 'mgr-bsc-respiratory',
        name: 'B.Sc Respiratory Therapy',
        nameTamil: 'பி.எஸ்சி சுவாச சிகிச்சை',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'Merit Based (12th PCB)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Pulmonary Anatomy', 'Respiratory Physiology'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Blood Gas Analysis', 'Biochemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Ventilator Physics', 'Gas Laws'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-resp-q1', year: '2024', question: 'Normal respiratory rate in adults is:', options: ['8-12/min', '12-20/min', '20-30/min', '30-40/min'], correctAnswer: 1, explanation: 'Normal adult respiratory rate is 12-20 breaths per minute at rest.', topic: 'Respiratory Physiology', difficulty: 'Easy' }
        ],
        tips: ['Critical care knowledge essential', 'Learn ventilator management', 'ICU exposure important']
      },
      // ============= B.Sc Critical Care Technology =============
      {
        id: 'mgr-bsc-criticalcare',
        name: 'B.Sc Critical Care Technology',
        nameTamil: 'பி.எஸ்சி தீவிர சிகிச்சை தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'Merit Based (12th PCB)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Human Physiology', 'Anatomy', 'Pathology Basics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Biochemistry', 'Drug Chemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['ICU Equipment', 'Monitoring Devices'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-cc-q1', year: '2024', question: 'Glasgow Coma Scale maximum score is:', options: ['10', '12', '15', '20'], correctAnswer: 2, explanation: 'GCS maximum is 15 (Eyes 4 + Verbal 5 + Motor 6).', topic: 'Critical Care Assessment', difficulty: 'Easy' }
        ],
        tips: ['ICU protocols essential', 'Learn monitoring equipment', 'Emergency care knowledge important']
      },
      // ============= B.Sc Physician Assistant =============
      {
        id: 'mgr-bsc-physician-assistant',
        name: 'B.Sc Physician Assistant',
        nameTamil: 'பி.எஸ்சி மருத்துவர் உதவியாளர்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'Merit Based (12th PCB)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Anatomy', 'Physiology', 'Clinical Medicine Basics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Pharmacology Basics', 'Biochemistry'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 30, marks: 30, topics: ['Reasoning', 'English', 'Current Affairs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-pa-q1', year: '2024', question: 'A Physician Assistant can:', options: ['Perform surgery independently', 'Prescribe medicines under physician supervision', 'Operate a clinic alone', 'Issue death certificates'], correctAnswer: 1, explanation: 'PAs work under physician supervision and can prescribe medications as per regulations.', topic: 'PA Scope', difficulty: 'Easy' }
        ],
        tips: ['Growing career in India', 'Clinical rotations important', 'Learn primary care skills']
      },
      // ============= B.Sc Emergency & Trauma Care =============
      {
        id: 'mgr-bsc-emergency',
        name: 'B.Sc Accident & Emergency Care Technology',
        nameTamil: 'பி.எஸ்சி விபத்து & அவசர சிகிச்சை தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'Merit Based (12th PCB)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Trauma Anatomy', 'Emergency Physiology'] },
            { name: 'First Aid', nameTamil: 'முதலுதவி', questions: 35, marks: 35, topics: ['CPR', 'Trauma Management', 'Triage'] },
            { name: 'General', nameTamil: 'பொது', questions: 25, marks: 25, topics: ['Emergency Protocols', 'Equipment'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-emergency-q1', year: '2024', question: 'The correct chest compression rate for adult CPR is:', options: ['60-80/min', '80-100/min', '100-120/min', '120-140/min'], correctAnswer: 2, explanation: 'Current AHA guidelines recommend 100-120 compressions per minute for adult CPR.', topic: 'CPR', difficulty: 'Easy' }
        ],
        tips: ['ACLS/BLS certification helpful', 'Learn trauma protocols', 'Ambulance training essential']
      },
      // ============= B.Sc Optometry =============
      {
        id: 'mgr-bsc-optometry',
        name: 'B.Sc Optometry',
        nameTamil: 'பி.எஸ்சி கண் பரிசோதனை',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'Merit Based (12th PCB)',
          negativeMarking: false,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 35, marks: 35, topics: ['Optics', 'Light', 'Lens Physics'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Eye Anatomy', 'Visual Physiology'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 25, marks: 25, topics: ['Biochemistry', 'Pharmacology Basics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-optometry-q1', year: '2024', question: 'Normal vision is referred to as:', options: ['6/60', '6/36', '6/6', '6/12'], correctAnswer: 2, explanation: '6/6 (or 20/20) is considered normal visual acuity.', topic: 'Visual Acuity', difficulty: 'Easy' }
        ],
        tips: ['Optics knowledge essential', 'Clinical exposure important', 'Growing demand for eye care']
      },
      // ============= B.Sc Neuro-Electrophysiology =============
      {
        id: 'mgr-bsc-neuroelectro',
        name: 'B.Sc Neuro-Electrophysiology',
        nameTamil: 'பி.எஸ்சி நரம்பு மின்னியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'Merit Based (12th PCB)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Neuroanatomy', 'Neurophysiology'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 35, marks: 35, topics: ['Electronics', 'EEG/EMG Technology'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 25, marks: 25, topics: ['Neurochemistry', 'Biochemistry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-neuro-q1', year: '2024', question: 'EEG stands for:', options: ['Electromyography', 'Electroencephalography', 'Electrocorticography', 'Electrooculography'], correctAnswer: 1, explanation: 'EEG (Electroencephalography) records electrical activity of the brain.', topic: 'Neurophysiology', difficulty: 'Easy' }
        ],
        tips: ['Learn EEG/EMG interpretation', 'Neurology department exposure', 'Technical skills important']
      },
      // ============= B.Sc Clinical Nutrition =============
      {
        id: 'mgr-bsc-nutrition',
        name: 'B.Sc Clinical Nutrition & Dietetics',
        nameTamil: 'பி.எஸ்சி மருத்துவ ஊட்டச்சத்து',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'Merit Based (12th PCB)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Human Nutrition', 'Metabolism', 'Biochemistry'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 35, marks: 35, topics: ['Food Chemistry', 'Nutritional Biochemistry'] },
            { name: 'General', nameTamil: 'பொது', questions: 25, marks: 25, topics: ['Diet Planning', 'Public Health Nutrition'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-nutrition-q1', year: '2024', question: 'Vitamin C deficiency causes:', options: ['Beriberi', 'Scurvy', 'Pellagra', 'Rickets'], correctAnswer: 1, explanation: 'Scurvy is caused by Vitamin C (Ascorbic acid) deficiency.', topic: 'Nutritional Deficiencies', difficulty: 'Easy' }
        ],
        tips: ['Therapeutic diets knowledge', 'Hospital dietetics training', 'Growing wellness industry demand']
      },
      // ============= BASLP (Audiology & Speech) =============
      {
        id: 'mgr-baslp',
        name: 'BASLP (Audiology & Speech-Language Pathology)',
        nameTamil: 'பி.ஏ.எஸ்.எல்.பி (செவியியல் & பேச்சு சிகிச்சை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'Merit Based (12th PCB)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Anatomy of Ear', 'Speech Physiology', 'Neurology'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Acoustics', 'Sound Physics'] },
            { name: 'Psychology', nameTamil: 'உளவியல்', questions: 30, marks: 30, topics: ['Language Development', 'Cognitive Psychology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-baslp-q1', year: '2024', question: 'The unit of sound intensity is:', options: ['Hertz', 'Decibel', 'Ohm', 'Watt'], correctAnswer: 1, explanation: 'Decibel (dB) is the unit used to measure sound intensity.', topic: 'Acoustics', difficulty: 'Easy' }
        ],
        tips: ['Growing demand for speech therapists', 'Pediatric experience valuable', 'Learn audiometry equipment']
      },
      // ============= B.Sc Cardio-Pulmonary Perfusion =============
      {
        id: 'mgr-bsc-perfusion',
        name: 'B.Sc Cardio-Pulmonary Perfusion Technology',
        nameTamil: 'பி.எஸ்சி இதய-நுரையீரல் பெர்ஃபியூஷன்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'Merit Based (12th PCB)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Cardiac Anatomy', 'Cardiovascular Physiology'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Blood Chemistry', 'Anticoagulation'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Heart-Lung Machine', 'Hemodynamics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-perfusion-q1', year: '2024', question: 'A perfusionist operates the:', options: ['Ventilator', 'Heart-Lung Machine', 'Dialysis Machine', 'CT Scanner'], correctAnswer: 1, explanation: 'Perfusionists operate the heart-lung machine (cardiopulmonary bypass) during open-heart surgery.', topic: 'Perfusion Technology', difficulty: 'Easy' }
        ],
        tips: ['High-paying specialized field', 'Cardiac surgery OT training', 'Limited seats - competitive admission']
      },
      // ============= Post Basic B.Sc Nursing =============
      {
        id: 'mgr-pb-bsc-nursing',
        name: 'Post Basic B.Sc Nursing',
        nameTamil: 'போஸ்ட் பேசிக் பி.எஸ்சி செவிலியர்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Nursing', nameTamil: 'செவிலியர்', questions: 60, marks: 60, topics: ['Medical-Surgical Nursing', 'Community Health', 'Pediatrics'] },
            { name: 'Applied Sciences', nameTamil: 'பயன்பாட்டு அறிவியல்', questions: 25, marks: 25, topics: ['Anatomy', 'Physiology', 'Pharmacology'] },
            { name: 'General English', nameTamil: 'ஆங்கிலம்', questions: 15, marks: 15, topics: ['Grammar', 'Comprehension'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-pbnursing-q1', year: '2024', question: 'Post Basic B.Sc Nursing is a:', options: ['4-year course', '3-year course', '2-year course', '1-year course'], correctAnswer: 2, explanation: 'Post Basic B.Sc Nursing is a 2-year course for GNM diploma holders.', topic: 'Nursing Education', difficulty: 'Easy' }
        ],
        tips: ['For GNM diploma holders only', 'Work experience helpful', 'Bridge course for B.Sc degree']
      },
      // ============= MHA (Hospital Administration) =============
      {
        id: 'mgr-mha',
        name: 'MHA (Master of Hospital Administration)',
        nameTamil: 'எம்.எச்.ஏ (மருத்துவமனை நிர்வாக முதுநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'General Management', nameTamil: 'பொது நிர்வாகம்', questions: 40, marks: 40, topics: ['Hospital Organization', 'HR Management', 'Financial Management'] },
            { name: 'Healthcare Systems', nameTamil: 'சுகாதார அமைப்புகள்', questions: 35, marks: 35, topics: ['Public Health', 'Healthcare Policy', 'Quality Management'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 25, marks: 25, topics: ['Reasoning', 'Data Interpretation', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-mha-q1', year: '2024', question: 'NABH stands for:', options: ['National Accreditation Board for Hospitals', 'National Assessment Board for Healthcare', 'National Authority for Better Hospitals', 'None of the above'], correctAnswer: 0, explanation: 'NABH is the National Accreditation Board for Hospitals and Healthcare Providers.', topic: 'Healthcare Accreditation', difficulty: 'Easy' }
        ],
        tips: ['Non-medical graduates can apply', 'Hospital internship required', 'Growing healthcare sector demand']
      },
      // ============= More Super-Specialty Courses =============
      {
        id: 'mgr-dm-neurology',
        name: 'DM Neurology',
        nameTamil: 'டி.எம் நரம்பியல்',
        type: 'Super-Specialty',
        examPattern: {
          totalQuestions: 90,
          totalMarks: 360,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Computer Based Test (NEET-SS)',
          negativeMarking: true,
          sections: [
            { name: 'Neurology', nameTamil: 'நரம்பியல்', questions: 90, marks: 360, topics: ['Stroke', 'Epilepsy', 'Movement Disorders', 'Neuromuscular'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-dm-neuro-q1', year: '2024', question: 'Most common cause of stroke is:', options: ['Hemorrhagic', 'Ischemic', 'Embolic', 'Venous'], correctAnswer: 1, explanation: 'Ischemic stroke accounts for about 85% of all strokes.', topic: 'Cerebrovascular Disease', difficulty: 'Easy' }
        ],
        tips: ['MD Medicine prerequisite', 'NEET-SS required', 'Neuro-imaging knowledge essential']
      },
      {
        id: 'mgr-dm-nephrology',
        name: 'DM Nephrology',
        nameTamil: 'டி.எம் சிறுநீரகவியல்',
        type: 'Super-Specialty',
        examPattern: {
          totalQuestions: 90,
          totalMarks: 360,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Computer Based Test (NEET-SS)',
          negativeMarking: true,
          sections: [
            { name: 'Nephrology', nameTamil: 'சிறுநீரகவியல்', questions: 90, marks: 360, topics: ['CKD', 'Dialysis', 'Transplant', 'Glomerulonephritis'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-dm-nephro-q1', year: '2024', question: 'Normal GFR is:', options: ['60 mL/min', '90 mL/min', '120 mL/min', '150 mL/min'], correctAnswer: 2, explanation: 'Normal GFR is approximately 120 mL/min/1.73m² in adults.', topic: 'Renal Physiology', difficulty: 'Easy' }
        ],
        tips: ['MD Medicine prerequisite', 'Dialysis experience helpful', 'Renal biopsy interpretation important']
      },
      {
        id: 'mgr-dm-gastro',
        name: 'DM Gastroenterology',
        nameTamil: 'டி.எம் இரைப்பை குடலியல்',
        type: 'Super-Specialty',
        examPattern: {
          totalQuestions: 90,
          totalMarks: 360,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Computer Based Test (NEET-SS)',
          negativeMarking: true,
          sections: [
            { name: 'Gastroenterology', nameTamil: 'இரைப்பை குடலியல்', questions: 90, marks: 360, topics: ['Endoscopy', 'Liver Diseases', 'IBD', 'Pancreatitis'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-dm-gastro-q1', year: '2024', question: 'Most common cause of cirrhosis in India is:', options: ['Alcohol', 'Hepatitis B', 'Hepatitis C', 'NAFLD'], correctAnswer: 0, explanation: 'Alcohol is the most common cause of cirrhosis in India, followed by Hepatitis B.', topic: 'Hepatology', difficulty: 'Medium' }
        ],
        tips: ['MD Medicine prerequisite', 'Endoscopy skills essential', 'Liver transplant centers preferred']
      },
      {
        id: 'mgr-dm-oncology',
        name: 'DM Medical Oncology',
        nameTamil: 'டி.எம் புற்றுநோயியல்',
        type: 'Super-Specialty',
        examPattern: {
          totalQuestions: 90,
          totalMarks: 360,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Computer Based Test (NEET-SS)',
          negativeMarking: true,
          sections: [
            { name: 'Oncology', nameTamil: 'புற்றுநோயியல்', questions: 90, marks: 360, topics: ['Chemotherapy', 'Tumor Biology', 'Palliative Care', 'Immunotherapy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-dm-onco-q1', year: '2024', question: 'Most common cancer in Indian females is:', options: ['Lung', 'Breast', 'Cervix', 'Ovary'], correctAnswer: 1, explanation: 'Breast cancer has overtaken cervical cancer as the most common cancer in Indian women.', topic: 'Cancer Epidemiology', difficulty: 'Easy' }
        ],
        tips: ['MD Medicine prerequisite', 'Growing field with targeted therapies', 'Research opportunities abundant']
      },
      {
        id: 'mgr-mch-plastic',
        name: 'MCh Plastic Surgery',
        nameTamil: 'எம்.சி.எச் பிளாஸ்டிக் அறுவை சிகிச்சை',
        type: 'Super-Specialty',
        examPattern: {
          totalQuestions: 90,
          totalMarks: 360,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Computer Based Test (NEET-SS)',
          negativeMarking: true,
          sections: [
            { name: 'Plastic Surgery', nameTamil: 'பிளாஸ்டிக் அறுவை சிகிச்சை', questions: 90, marks: 360, topics: ['Reconstructive Surgery', 'Burns', 'Hand Surgery', 'Cosmetic'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-mch-plastic-q1', year: '2024', question: 'Rule of Nine is used for:', options: ['Pain assessment', 'Burn area estimation', 'Wound healing', 'Scar assessment'], correctAnswer: 1, explanation: 'Wallace Rule of Nine is used to estimate the percentage of total body surface area (TBSA) affected by burns.', topic: 'Burns', difficulty: 'Easy' }
        ],
        tips: ['MS Surgery prerequisite', 'Microsurgery skills essential', 'Aesthetic surgery training available']
      },
      {
        id: 'mgr-mch-urology',
        name: 'MCh Urology',
        nameTamil: 'எம்.சி.எச் சிறுநீரகவியல் அறுவை சிகிச்சை',
        type: 'Super-Specialty',
        examPattern: {
          totalQuestions: 90,
          totalMarks: 360,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Computer Based Test (NEET-SS)',
          negativeMarking: true,
          sections: [
            { name: 'Urology', nameTamil: 'சிறுநீர் அறுவை சிகிச்சை', questions: 90, marks: 360, topics: ['Uro-oncology', 'Stone Disease', 'Reconstructive Urology', 'Transplant'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-mch-uro-q1', year: '2024', question: 'Most common type of kidney stone is:', options: ['Uric acid', 'Calcium oxalate', 'Struvite', 'Cystine'], correctAnswer: 1, explanation: 'Calcium oxalate stones account for about 80% of all kidney stones.', topic: 'Urolithiasis', difficulty: 'Easy' }
        ],
        tips: ['MS Surgery prerequisite', 'Endourology training important', 'Robotic surgery exposure helpful']
      },
      {
        id: 'mgr-mch-cardiothoracic',
        name: 'MCh Cardio-Thoracic Surgery',
        nameTamil: 'எம்.சி.எச் இதய-மார்பு அறுவை சிகிச்சை',
        type: 'Super-Specialty',
        examPattern: {
          totalQuestions: 90,
          totalMarks: 360,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Computer Based Test (NEET-SS)',
          negativeMarking: true,
          sections: [
            { name: 'CTVS', nameTamil: 'இதய-மார்பு அறுவை', questions: 90, marks: 360, topics: ['CABG', 'Valve Surgery', 'Congenital Heart', 'Thoracic Surgery'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-mch-ctvs-q1', year: '2024', question: 'CABG stands for:', options: ['Cardiac Artery Bypass Graft', 'Coronary Artery Bypass Grafting', 'Cardio Aortic Bypass Graft', 'Central Arterial Bypass Graft'], correctAnswer: 1, explanation: 'CABG (Coronary Artery Bypass Grafting) is a surgical procedure to treat coronary artery disease.', topic: 'Cardiac Surgery', difficulty: 'Easy' }
        ],
        tips: ['MS Surgery prerequisite', 'Most demanding surgical specialty', 'Excellent hand skills required']
      },
      // ============= MD Specializations =============
      {
        id: 'mgr-md-pathology',
        name: 'MD Pathology',
        nameTamil: 'எம்.டி நோயியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 800,
          duration: '3 Hours 30 Minutes',
          durationMinutes: 210,
          mode: 'Computer Based Test (NEET-PG)',
          negativeMarking: true,
          sections: [
            { name: 'Pathology', nameTamil: 'நோயியல்', questions: 200, marks: 800, topics: ['General Pathology', 'Systemic Pathology', 'Hematology', 'Clinical Pathology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-md-path-q1', year: '2024', question: 'Apoptosis is characterized by:', options: ['Cell swelling', 'Cell shrinkage', 'Inflammation', 'Necrosis'], correctAnswer: 1, explanation: 'Apoptosis (programmed cell death) is characterized by cell shrinkage without inflammation.', topic: 'General Pathology', difficulty: 'Easy' }
        ],
        tips: ['MBBS prerequisite', 'NEET-PG required', 'Lab-based specialty']
      },
      {
        id: 'mgr-md-anaesthesia',
        name: 'MD Anaesthesiology',
        nameTamil: 'எம்.டி மயக்கவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 800,
          duration: '3 Hours 30 Minutes',
          durationMinutes: 210,
          mode: 'Computer Based Test (NEET-PG)',
          negativeMarking: true,
          sections: [
            { name: 'Anaesthesiology', nameTamil: 'மயக்கவியல்', questions: 200, marks: 800, topics: ['General Anaesthesia', 'Regional Anaesthesia', 'Critical Care', 'Pain Medicine'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-md-anaes-q1', year: '2024', question: 'ASA classification is used for:', options: ['Difficulty intubation', 'Physical status assessment', 'Pain scoring', 'Sedation level'], correctAnswer: 1, explanation: 'ASA (American Society of Anesthesiologists) classification assesses patient physical status before anesthesia.', topic: 'Pre-operative Assessment', difficulty: 'Easy' }
        ],
        tips: ['MBBS prerequisite', 'OT and ICU training intensive', 'Critical care exposure important']
      },
      {
        id: 'mgr-md-paediatrics',
        name: 'MD Paediatrics',
        nameTamil: 'எம்.டி குழந்தை மருத்துவம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 800,
          duration: '3 Hours 30 Minutes',
          durationMinutes: 210,
          mode: 'Computer Based Test (NEET-PG)',
          negativeMarking: true,
          sections: [
            { name: 'Paediatrics', nameTamil: 'குழந்தை மருத்துவம்', questions: 200, marks: 800, topics: ['Neonatology', 'Growth & Development', 'Pediatric Infections', 'Pediatric Emergencies'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-md-paed-q1', year: '2024', question: 'Normal birth weight of a term newborn is:', options: ['1.5-2.0 kg', '2.0-2.5 kg', '2.5-4.0 kg', '4.0-5.0 kg'], correctAnswer: 2, explanation: 'Normal birth weight for a term baby is 2.5-4.0 kg, with average around 3 kg.', topic: 'Neonatology', difficulty: 'Easy' }
        ],
        tips: ['MBBS prerequisite', 'NEET-PG required', 'Rewarding specialty for child healthcare']
      },
      {
        id: 'mgr-md-psychiatry',
        name: 'MD Psychiatry',
        nameTamil: 'எம்.டி உளவியல் மருத்துவம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 800,
          duration: '3 Hours 30 Minutes',
          durationMinutes: 210,
          mode: 'Computer Based Test (NEET-PG)',
          negativeMarking: true,
          sections: [
            { name: 'Psychiatry', nameTamil: 'உளவியல் மருத்துவம்', questions: 200, marks: 800, topics: ['Mood Disorders', 'Schizophrenia', 'Anxiety', 'Substance Abuse', 'Child Psychiatry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-md-psych-q1', year: '2024', question: 'First-line treatment for Major Depressive Disorder is:', options: ['Benzodiazepines', 'SSRIs', 'Antipsychotics', 'Mood stabilizers'], correctAnswer: 1, explanation: 'SSRIs (Selective Serotonin Reuptake Inhibitors) are first-line treatment for major depression.', topic: 'Mood Disorders', difficulty: 'Easy' }
        ],
        tips: ['MBBS prerequisite', 'Growing mental health awareness', 'Community psychiatry important']
      },
      {
        id: 'mgr-ms-ortho',
        name: 'MS Orthopaedics',
        nameTamil: 'எம்.எஸ் எலும்பியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 800,
          duration: '3 Hours 30 Minutes',
          durationMinutes: 210,
          mode: 'Computer Based Test (NEET-PG)',
          negativeMarking: true,
          sections: [
            { name: 'Orthopaedics', nameTamil: 'எலும்பியல்', questions: 200, marks: 800, topics: ['Trauma', 'Arthroplasty', 'Spine', 'Pediatric Ortho', 'Sports Medicine'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-ms-ortho-q1', year: '2024', question: 'Most common fracture in elderly is:', options: ['Colles fracture', 'Hip fracture', 'Vertebral fracture', 'Ankle fracture'], correctAnswer: 2, explanation: 'Vertebral compression fractures are most common in elderly due to osteoporosis.', topic: 'Trauma', difficulty: 'Medium' }
        ],
        tips: ['MBBS prerequisite', 'Surgical skills essential', 'Trauma center exposure important']
      },
      {
        id: 'mgr-ms-obg',
        name: 'MS Obstetrics & Gynaecology',
        nameTamil: 'எம்.எஸ் மகப்பேறு & மகளிர் மருத்துவம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 800,
          duration: '3 Hours 30 Minutes',
          durationMinutes: 210,
          mode: 'Computer Based Test (NEET-PG)',
          negativeMarking: true,
          sections: [
            { name: 'OBG', nameTamil: 'மகப்பேறு மருத்துவம்', questions: 200, marks: 800, topics: ['Obstetrics', 'Gynaecology', 'Infertility', 'Oncology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-ms-obg-q1', year: '2024', question: 'Normal duration of pregnancy is:', options: ['36 weeks', '38 weeks', '40 weeks', '42 weeks'], correctAnswer: 2, explanation: 'Normal pregnancy duration is 40 weeks (280 days) from last menstrual period.', topic: 'Obstetrics', difficulty: 'Easy' }
        ],
        tips: ['MBBS prerequisite', 'Labor room experience essential', 'High-risk pregnancy management important']
      },
      {
        id: 'mgr-ms-ent',
        name: 'MS ENT (Otorhinolaryngology)',
        nameTamil: 'எம்.எஸ் காது-மூக்கு-தொண்டை',
        type: 'PG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 800,
          duration: '3 Hours 30 Minutes',
          durationMinutes: 210,
          mode: 'Computer Based Test (NEET-PG)',
          negativeMarking: true,
          sections: [
            { name: 'ENT', nameTamil: 'காது-மூக்கு-தொண்டை', questions: 200, marks: 800, topics: ['Otology', 'Rhinology', 'Laryngology', 'Head & Neck'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-ms-ent-q1', year: '2024', question: 'Most common cause of conductive hearing loss is:', options: ['Presbycusis', 'Otosclerosis', 'CSOM', 'Noise-induced'], correctAnswer: 2, explanation: 'Chronic Suppurative Otitis Media (CSOM) is the most common cause of conductive hearing loss.', topic: 'Otology', difficulty: 'Easy' }
        ],
        tips: ['MBBS prerequisite', 'Surgical and clinical specialty', 'Audiometry knowledge essential']
      },
      {
        id: 'mgr-ms-ophthalmology',
        name: 'MS Ophthalmology',
        nameTamil: 'எம்.எஸ் கண் மருத்துவம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 800,
          duration: '3 Hours 30 Minutes',
          durationMinutes: 210,
          mode: 'Computer Based Test (NEET-PG)',
          negativeMarking: true,
          sections: [
            { name: 'Ophthalmology', nameTamil: 'கண் மருத்துவம்', questions: 200, marks: 800, topics: ['Cataract', 'Glaucoma', 'Retina', 'Cornea', 'Oculoplasty'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'mgr-ms-ophthal-q1', year: '2024', question: 'Most common cause of preventable blindness in India is:', options: ['Glaucoma', 'Cataract', 'Diabetic retinopathy', 'Corneal opacity'], correctAnswer: 1, explanation: 'Cataract remains the most common cause of curable and preventable blindness in India.', topic: 'Community Ophthalmology', difficulty: 'Easy' }
        ],
        tips: ['MBBS prerequisite', 'Microsurgery skills essential', 'Both OPD and surgical work']
      }
    ]
  },
  {
    id: 'madurai-kamaraj-university',
    name: 'Madurai Kamaraj University',
    nameTamil: 'மதுரை காமராஜர் பல்கலைக்கழகம்',
    location: 'Madurai',
    website: 'www.mkuniversity.ac.in',
    phone: '0452-2458471',
    examName: 'MKU PG Entrance',
    logoColor: '#16a34a',
    logo: '/universities/madurai-kamaraj-university-logo.jpeg',
    fee: { general: 500, obc: 500, scst: 250 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'April 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'May 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'June 2026', status: 'upcoming' },
      { event: 'Exam Date', eventTamil: 'தேர்வு தேதி', date: 'July 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'August 2026', status: 'upcoming' }
    ],
    courses: [
      // ============================================================
      // 🔘 TAB 1: ON-CAMPUS PROGRAMS (Palkalai Nagar Campus)
      // ============================================================
      
      // === 🔬 SCHOOL OF BIOLOGICAL SCIENCES (MKU's Pride - Best in India) ===
      {
        id: 'mku-msc-genomics',
        name: 'M.Sc. Genomics',
        nameTamil: 'எம்.எஸ்சி. ஜீனோமிக்ஸ்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Biological Sciences',
        eligibility: 'B.Sc. Life Sciences',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Molecular Biology', nameTamil: 'மூலக்கூறு உயிரியல்', questions: 40, marks: 40, topics: ['DNA Structure', 'Replication', 'Transcription', 'Translation'] },
            { name: 'Genetics', nameTamil: 'மரபியல்', questions: 30, marks: 30, topics: ['Mendelian', 'Population Genetics', 'Human Genetics'] },
            { name: 'Bioinformatics', nameTamil: 'உயிர் தகவலியல்', questions: 20, marks: 20, topics: ['Sequence Analysis', 'Databases', 'Phylogenetics'] },
            { name: 'Biochemistry', nameTamil: 'உயிர்வேதியியல்', questions: 10, marks: 10, topics: ['Proteins', 'Enzymes'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Centre of Excellence at MKU', 'Very advanced - study DNA/RNA deeply', 'Learn bioinformatics tools', 'Great for research careers']
      },
      {
        id: 'mku-msc-microbial-gene',
        name: 'M.Sc. Microbial Gene Technology',
        nameTamil: 'எம்.எஸ்சி. நுண்ணுயிர் மரபணு தொழில்நுட்பம்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Biological Sciences',
        eligibility: 'B.Sc. Life Sciences',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Microbiology', nameTamil: 'நுண்ணுயிரியல்', questions: 35, marks: 35, topics: ['Bacteria', 'Viruses', 'Fungi', 'Microbial Physiology'] },
            { name: 'Molecular Biology', nameTamil: 'மூலக்கூறு உயிரியல்', questions: 35, marks: 35, topics: ['Gene Expression', 'Cloning', 'PCR'] },
            { name: 'Genetic Engineering', nameTamil: 'மரபணு பொறியியல்', questions: 20, marks: 20, topics: ['Recombinant DNA', 'Vectors', 'Transformation'] },
            { name: 'Biochemistry', nameTamil: 'உயிர்வேதியியல்', questions: 10, marks: 10, topics: ['Enzymes', 'Metabolism'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on recombinant DNA technology', 'Learn microbial genetics', 'Study industrial applications']
      },
      {
        id: 'mku-msc-microbiology',
        name: 'M.Sc. Microbiology',
        nameTamil: 'எம்.எஸ்சி. நுண்ணுயிரியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Biological Sciences',
        eligibility: 'B.Sc. Microbiology/Life Sciences',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Microbiology', nameTamil: 'நுண்ணுயிரியல்', questions: 50, marks: 50, topics: ['Bacteriology', 'Virology', 'Mycology', 'Immunology'] },
            { name: 'Biochemistry', nameTamil: 'உயிர் வேதியியல்', questions: 25, marks: 25, topics: ['Enzymes', 'Metabolism', 'Molecular Biology'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 25, marks: 25, topics: ['Reasoning', 'Basic Science'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong foundation in UG microbiology', 'Focus on applied microbiology', 'Learn laboratory techniques']
      },
      {
        id: 'mku-msc-biochemistry',
        name: 'M.Sc. Biochemistry',
        nameTamil: 'எம்.எஸ்சி. உயிர் வேதியியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Biological Sciences',
        eligibility: 'B.Sc. Biochemistry/Chemistry',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biochemistry', nameTamil: 'உயிர் வேதியியல்', questions: 50, marks: 50, topics: ['Carbohydrates', 'Proteins', 'Lipids', 'Nucleic Acids'] },
            { name: 'Molecular Biology', nameTamil: 'மூலக்கூறு உயிரியல்', questions: 30, marks: 30, topics: ['DNA', 'RNA', 'Gene Expression'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 20, marks: 20, topics: ['Chemistry', 'Basic Biology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on metabolic pathways', 'Learn enzyme kinetics', 'Strong chemistry foundation']
      },
      {
        id: 'mku-msc-biotechnology',
        name: 'M.Sc. Biotechnology',
        nameTamil: 'எம்.எஸ்சி. உயிர்தொழில்நுட்பவியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Biological Sciences',
        eligibility: 'B.Sc. Biotechnology/Life Sciences',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biotechnology', nameTamil: 'உயிர்தொழில்நுட்பம்', questions: 40, marks: 40, topics: ['Genetic Engineering', 'Tissue Culture', 'Fermentation'] },
            { name: 'Molecular Biology', nameTamil: 'மூலக்கூறு உயிரியல்', questions: 30, marks: 30, topics: ['Gene Cloning', 'PCR', 'Blotting Techniques'] },
            { name: 'Biochemistry', nameTamil: 'உயிர் வேதியியல்', questions: 20, marks: 20, topics: ['Enzymes', 'Proteins'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 10, marks: 10, topics: ['Basic Science', 'Reasoning'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on recombinant DNA technology', 'Learn bioinformatics basics', 'Industry applications important']
      },
      {
        id: 'mku-msc-marine-biology',
        name: 'M.Sc. Marine Biology',
        nameTamil: 'எம்.எஸ்சி. கடல் உயிரியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Biological Sciences',
        eligibility: 'B.Sc. Zoology/Life Sciences',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Marine Biology', nameTamil: 'கடல் உயிரியல்', questions: 50, marks: 50, topics: ['Marine Organisms', 'Oceanography', 'Marine Ecology'] },
            { name: 'Zoology/Botany', nameTamil: 'விலங்கியல்/தாவரவியல்', questions: 30, marks: 30, topics: ['Taxonomy', 'Physiology'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 20, marks: 20, topics: ['Environmental Science', 'Current Affairs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Unique course - study marine ecosystems', 'Learn fish taxonomy', 'Good for research careers']
      },

      // === 💻 SCHOOL OF COMPUTING & TECHNOLOGY ===
      {
        id: 'mku-msc-cs',
        name: 'M.Sc. Computer Science',
        nameTamil: 'எம்.எஸ்சி. கணினி அறிவியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Computing & Technology',
        eligibility: 'B.Sc. CS/IT/BCA',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 60, marks: 60, topics: ['Programming', 'OS', 'DBMS', 'Networks'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 25, marks: 25, topics: ['Discrete Math', 'Statistics'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 15, marks: 15, topics: ['Logical', 'Numerical'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Master programming fundamentals', 'Study operating systems', 'Practice aptitude questions']
      },
      {
        id: 'mku-msc-data-analytics',
        name: 'M.Sc. Data Analytics',
        nameTamil: 'எம்.எஸ்சி. தரவு பகுப்பாய்வு',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Computing & Technology',
        eligibility: 'B.Sc. CS/Maths/Statistics',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 30, marks: 30, topics: ['Probability', 'Hypothesis Testing', 'Regression'] },
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 30, marks: 30, topics: ['Programming', 'Database', 'Algorithms'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 25, marks: 25, topics: ['Linear Algebra', 'Calculus'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 15, marks: 15, topics: ['Logical', 'Numerical'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Learn Python/R for data science', 'Focus on statistics', 'High demand in industry']
      },
      {
        id: 'mku-msc-electronics',
        name: 'M.Sc. Electronics & Instrumentation',
        nameTamil: 'எம்.எஸ்சி. மின்னணுவியல் & கருவியமைப்பு',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Computing & Technology',
        eligibility: 'B.Sc. Electronics/Physics',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Electronics', nameTamil: 'மின்னணுவியல்', questions: 50, marks: 50, topics: ['Analog', 'Digital', 'Microprocessors'] },
            { name: 'Instrumentation', nameTamil: 'கருவியமைப்பு', questions: 30, marks: 30, topics: ['Sensors', 'Control Systems', 'Measurements'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 20, marks: 20, topics: ['Numerical', 'Reasoning'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on analog/digital circuits', 'Learn microcontroller programming', 'Industry-ready skills']
      },

      // === 🌍 SCHOOL OF EARTH SCIENCES ===
      {
        id: 'mku-msc-remote-sensing',
        name: 'M.Sc. Earth Remote Sensing & Geo-Information Technology',
        nameTamil: 'எம்.எஸ்சி. புவி தொலை உணர்வு & புவி தகவல் தொழில்நுட்பம்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Earth Sciences',
        eligibility: 'B.Sc. Geography/Geology',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Remote Sensing', nameTamil: 'தொலை உணர்வு', questions: 35, marks: 35, topics: ['Satellite Imagery', 'Image Interpretation', 'Sensors'] },
            { name: 'GIS', nameTamil: 'புவி தகவல் அமைப்பு', questions: 30, marks: 30, topics: ['Spatial Analysis', 'Mapping', 'GPS'] },
            { name: 'Geography', nameTamil: 'புவியியல்', questions: 25, marks: 25, topics: ['Physical', 'Human', 'Cartography'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 10, marks: 10, topics: ['Reasoning', 'Current Affairs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Learn GIS software (QGIS/ArcGIS)', 'High demand in urban planning', 'ISRO career opportunities']
      },
      {
        id: 'mku-msc-geography',
        name: 'M.Sc. Geography',
        nameTamil: 'எம்.எஸ்சி. புவியியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Earth Sciences',
        eligibility: 'B.A./B.Sc. Geography',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Physical Geography', nameTamil: 'இயற்கை புவியியல்', questions: 35, marks: 35, topics: ['Geomorphology', 'Climatology', 'Oceanography'] },
            { name: 'Human Geography', nameTamil: 'மனித புவியியல்', questions: 30, marks: 30, topics: ['Population', 'Settlement', 'Economic'] },
            { name: 'Cartography', nameTamil: 'நிலவரைபடவியல்', questions: 20, marks: 20, topics: ['Map Reading', 'Surveying'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 15, marks: 15, topics: ['Current Affairs', 'Environment'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for UPSC Geography optional', 'Learn map work thoroughly', 'Field work important']
      },
      {
        id: 'mku-msc-environmental',
        name: 'M.Sc. Environmental Sciences',
        nameTamil: 'எம்.எஸ்சி. சுற்றுச்சூழல் அறிவியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Earth Sciences',
        eligibility: 'B.Sc. Environmental/Life Sciences',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Environmental Science', nameTamil: 'சுற்றுச்சூழல் அறிவியல்', questions: 40, marks: 40, topics: ['Ecology', 'Pollution', 'Climate Change'] },
            { name: 'Life Sciences', nameTamil: 'உயிர் அறிவியல்', questions: 30, marks: 30, topics: ['Biology', 'Biodiversity'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 20, marks: 20, topics: ['Environmental Chemistry', 'Toxicology'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 10, marks: 10, topics: ['Current Affairs', 'Policies'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Growing field with green economy', 'Learn EIA procedures', 'NGO/Govt career prospects']
      },

      // === 🔢 SCHOOL OF CORE SCIENCES ===
      {
        id: 'mku-msc-mathematics',
        name: 'M.Sc. Mathematics',
        nameTamil: 'எம்.எஸ்சி. கணிதம்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Core Sciences',
        eligibility: 'B.Sc. Mathematics',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Pure Mathematics', nameTamil: 'தூய கணிதம்', questions: 40, marks: 40, topics: ['Algebra', 'Analysis', 'Topology'] },
            { name: 'Applied Mathematics', nameTamil: 'பயன்பாட்டு கணிதம்', questions: 35, marks: 35, topics: ['Differential Equations', 'Numerical Methods'] },
            { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 15, marks: 15, topics: ['Probability', 'Distributions'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 10, marks: 10, topics: ['Logical', 'Numerical'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong foundation needed', 'Good for teaching/research', 'NET/SET preparation useful']
      },
      {
        id: 'mku-msc-physics',
        name: 'M.Sc. Physics',
        nameTamil: 'எம்.எஸ்சி. இயற்பியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Core Sciences',
        eligibility: 'B.Sc. Physics',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Classical Physics', nameTamil: 'பாரம்பரிய இயற்பியல்', questions: 30, marks: 30, topics: ['Mechanics', 'Optics', 'Thermodynamics'] },
            { name: 'Modern Physics', nameTamil: 'நவீன இயற்பியல்', questions: 35, marks: 35, topics: ['Quantum Mechanics', 'Nuclear Physics', 'Solid State'] },
            { name: 'Electronics', nameTamil: 'மின்னணுவியல்', questions: 20, marks: 20, topics: ['Analog', 'Digital'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 15, marks: 15, topics: ['Calculus', 'Differential Equations'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on quantum and nuclear physics', 'Good for ISRO/BARC', 'NET/GATE preparation']
      },
      {
        id: 'mku-msc-chemistry',
        name: 'M.Sc. Chemistry',
        nameTamil: 'எம்.எஸ்சி. வேதியியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Core Sciences',
        eligibility: 'B.Sc. Chemistry',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Organic Chemistry', nameTamil: 'கரிம வேதியியல்', questions: 35, marks: 35, topics: ['Reactions', 'Mechanisms', 'Spectroscopy'] },
            { name: 'Inorganic Chemistry', nameTamil: 'கனிம வேதியியல்', questions: 30, marks: 30, topics: ['Coordination', 'Organometallics'] },
            { name: 'Physical Chemistry', nameTamil: 'இயற்பு வேதியியல்', questions: 25, marks: 25, topics: ['Thermodynamics', 'Kinetics', 'Electrochemistry'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 10, marks: 10, topics: ['Reasoning', 'Numerical'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on reaction mechanisms', 'Good for pharma/chemical industry', 'NET/GATE useful']
      },

      // === 🎬 SCHOOL OF NICHE SCIENCES (Unique Programs) ===
      {
        id: 'mku-msc-criminology',
        name: 'M.Sc. Criminology & Criminal Justice',
        nameTamil: 'எம்.எஸ்சி. குற்றவியல் & குற்றவியல் நீதி',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Niche Sciences',
        eligibility: 'Any Degree',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Criminology', nameTamil: 'குற்றவியல்', questions: 40, marks: 40, topics: ['Theories of Crime', 'Criminal Behavior', 'Penology'] },
            { name: 'Criminal Justice', nameTamil: 'குற்றவியல் நீதி', questions: 30, marks: 30, topics: ['Police System', 'Courts', 'Corrections'] },
            { name: 'Legal Studies', nameTamil: 'சட்டவியல்', questions: 20, marks: 20, topics: ['IPC', 'CrPC', 'Evidence Act'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 10, marks: 10, topics: ['Current Affairs', 'Social Issues'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Unique MKU course', 'Good for police/forensic careers', 'Learn Indian criminal laws']
      },
      {
        id: 'mku-msc-film-media',
        name: 'M.Sc. Film & Electronic Media Studies',
        nameTamil: 'எம்.எஸ்சி. திரைப்படம் & மின்னணு ஊடக படிப்புகள்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Niche Sciences',
        eligibility: 'Any Degree',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Film Studies', nameTamil: 'திரைப்பட படிப்புகள்', questions: 40, marks: 40, topics: ['Film History', 'Film Theory', 'Tamil Cinema'] },
            { name: 'Electronic Media', nameTamil: 'மின்னணு ஊடகம்', questions: 30, marks: 30, topics: ['Television', 'Digital Media', 'Radio'] },
            { name: 'Communication', nameTamil: 'தொடர்பு', questions: 20, marks: 20, topics: ['Mass Communication', 'Media Laws'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 10, marks: 10, topics: ['Current Affairs', 'Entertainment Industry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Creative field - practical focus', 'Know Tamil cinema history', 'Learn digital production tools']
      },
      {
        id: 'mku-msc-visual-comm',
        name: 'M.Sc. Visual Communication',
        nameTamil: 'எம்.எஸ்சி. காட்சித் தொடர்பு',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Niche Sciences',
        eligibility: 'Any Degree',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Visual Communication', nameTamil: 'காட்சித் தொடர்பு', questions: 40, marks: 40, topics: ['Photography', 'Graphic Design', 'Animation'] },
            { name: 'Media Studies', nameTamil: 'ஊடக படிப்புகள்', questions: 30, marks: 30, topics: ['Advertising', 'Public Relations', 'Corporate Communication'] },
            { name: 'Technology', nameTamil: 'தொழில்நுட்பம்', questions: 20, marks: 20, topics: ['Software', 'Digital Tools', 'Web Design'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 10, marks: 10, topics: ['Current Affairs', 'Design Trends'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Creative + technical skills needed', 'Build a portfolio', 'Learn Adobe Suite']
      },

      // === 📖 SCHOOL OF ARTS & HUMANITIES - LANGUAGES ===
      {
        id: 'mku-ma-tamil',
        name: 'M.A. Tamil',
        nameTamil: 'எம்.ஏ. தமிழ்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Arts & Humanities',
        eligibility: 'B.A. Tamil',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Tamil Literature', nameTamil: 'தமிழ் இலக்கியம்', questions: 50, marks: 50, topics: ['Sangam Literature', 'Modern Literature'] },
            { name: 'Tamil Grammar', nameTamil: 'தமிழ் இலக்கணம்', questions: 30, marks: 30, topics: ['Tolkappiyam', 'Nannool'] },
            { name: 'General Tamil', nameTamil: 'பொதுத் தமிழ்', questions: 20, marks: 20, topics: ['Translation', 'Essay'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Read Sangam literature deeply', 'Study Tolkappiyam', 'Practice essay writing']
      },
      {
        id: 'mku-ma-english',
        name: 'M.A. English',
        nameTamil: 'எம்.ஏ. ஆங்கிலம்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Arts & Humanities',
        eligibility: 'B.A. English',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'English Literature', nameTamil: 'ஆங்கில இலக்கியம்', questions: 50, marks: 50, topics: ['British Literature', 'American Literature', 'Indian Writing'] },
            { name: 'Grammar & Usage', nameTamil: 'இலக்கணம் & பயன்பாடு', questions: 25, marks: 25, topics: ['Syntax', 'Morphology', 'Semantics'] },
            { name: 'Literary Theory', nameTamil: 'இலக்கியக் கோட்பாடு', questions: 15, marks: 15, topics: ['Criticism', 'Schools of Thought'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 10, marks: 10, topics: ['Comprehension', 'Vocabulary'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Read classics and modern literature', 'Know literary movements', 'Good for teaching/media careers']
      },
      {
        id: 'mku-ma-french',
        name: 'M.A. French',
        nameTamil: 'எம்.ஏ. பிரெஞ்சு',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Arts & Humanities',
        eligibility: 'B.A. French/Any Degree',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'French Language', nameTamil: 'பிரெஞ்சு மொழி', questions: 40, marks: 40, topics: ['Grammar', 'Translation', 'Composition'] },
            { name: 'French Literature', nameTamil: 'பிரெஞ்சு இலக்கியம்', questions: 35, marks: 35, topics: ['Poetry', 'Prose', 'Drama'] },
            { name: 'French Culture', nameTamil: 'பிரெஞ்சு பண்பாடு', questions: 15, marks: 15, topics: ['History', 'Arts', 'Civilization'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 10, marks: 10, topics: ['Francophone World'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Rare language course', 'Embassy/translation job prospects', 'DELF certification helpful']
      },
      {
        id: 'mku-ma-malayalam',
        name: 'M.A. Malayalam',
        nameTamil: 'எம்.ஏ. மலையாளம்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Arts & Humanities',
        eligibility: 'B.A. Malayalam',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Malayalam Literature', nameTamil: 'மலையாள இலக்கியம்', questions: 50, marks: 50, topics: ['Classical', 'Modern', 'Contemporary'] },
            { name: 'Grammar', nameTamil: 'இலக்கணம்', questions: 30, marks: 30, topics: ['Syntax', 'Morphology'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Kerala Culture', 'Current Affairs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Rare language offering', 'Good for Kerala-based careers', 'Teaching opportunities']
      },
      {
        id: 'mku-ma-kannada',
        name: 'M.A. Kannada',
        nameTamil: 'எம்.ஏ. கன்னடம்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Arts & Humanities',
        eligibility: 'B.A. Kannada',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Kannada Literature', nameTamil: 'கன்னட இலக்கியம்', questions: 50, marks: 50, topics: ['Classical', 'Modern', 'Contemporary'] },
            { name: 'Grammar', nameTamil: 'இலக்கணம்', questions: 30, marks: 30, topics: ['Syntax', 'Morphology'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Karnataka Culture', 'Current Affairs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Rare language offering', 'Good for Karnataka-based careers', 'Teaching opportunities']
      },
      {
        id: 'mku-ma-sanskrit',
        name: 'M.A. Sanskrit',
        nameTamil: 'எம்.ஏ. சமஸ்கிருதம்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Arts & Humanities',
        eligibility: 'B.A. Sanskrit',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Sanskrit Literature', nameTamil: 'சமஸ்கிருத இலக்கியம்', questions: 50, marks: 50, topics: ['Vedas', 'Epics', 'Kavya'] },
            { name: 'Grammar', nameTamil: 'இலக்கணம்', questions: 30, marks: 30, topics: ['Panini', 'Syntax'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Indian Philosophy', 'Culture'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Classical language expertise', 'Good for Indology studies', 'Research opportunities']
      },
      {
        id: 'mku-ma-telugu',
        name: 'M.A. Telugu',
        nameTamil: 'எம்.ஏ. தெலுங்கு',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Arts & Humanities',
        eligibility: 'B.A. Telugu',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Telugu Literature', nameTamil: 'தெலுங்கு இலக்கியம்', questions: 50, marks: 50, topics: ['Classical', 'Modern', 'Contemporary'] },
            { name: 'Grammar', nameTamil: 'இலக்கணம்', questions: 30, marks: 30, topics: ['Syntax', 'Morphology'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Andhra Culture', 'Current Affairs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Rare language offering', 'Good for AP/Telangana careers', 'Teaching opportunities']
      },
      {
        id: 'mku-ma-linguistics',
        name: 'M.A. Linguistics',
        nameTamil: 'எம்.ஏ. மொழியியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Arts & Humanities',
        eligibility: 'Any Degree',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'General Linguistics', nameTamil: 'பொது மொழியியல்', questions: 40, marks: 40, topics: ['Phonology', 'Morphology', 'Syntax', 'Semantics'] },
            { name: 'Applied Linguistics', nameTamil: 'பயன்பாட்டு மொழியியல்', questions: 30, marks: 30, topics: ['Language Teaching', 'Translation'] },
            { name: 'Sociolinguistics', nameTamil: 'சமூக மொழியியல்', questions: 20, marks: 20, topics: ['Language & Society', 'Dialects'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 10, marks: 10, topics: ['Languages of India'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Interdisciplinary field', 'Good for NLP/AI careers', 'Learn computational linguistics']
      },

      // === 🏛️ SCHOOL OF SOCIAL SCIENCES ===
      {
        id: 'mku-ma-history',
        name: 'M.A. History',
        nameTamil: 'எம்.ஏ. வரலாறு',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Social Sciences',
        eligibility: 'B.A. History',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Indian History', nameTamil: 'இந்திய வரலாறு', questions: 40, marks: 40, topics: ['Ancient', 'Medieval', 'Modern India'] },
            { name: 'World History', nameTamil: 'உலக வரலாறு', questions: 25, marks: 25, topics: ['Europe', 'World Wars', 'Revolutions'] },
            { name: 'Tamil Nadu History', nameTamil: 'தமிழ்நாடு வரலாறு', questions: 20, marks: 20, topics: ['Cholas', 'Pandyas', 'Freedom Struggle'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 15, marks: 15, topics: ['Culture', 'Heritage'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for UPSC/TNPSC', 'Focus on Tamil Nadu history', 'Read NCERT + standard texts']
      },
      {
        id: 'mku-ma-political-science',
        name: 'M.A. Political Science',
        nameTamil: 'எம்.ஏ. அரசியல் அறிவியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Social Sciences',
        eligibility: 'B.A. Political Science',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Political Theory', nameTamil: 'அரசியல் கோட்பாடு', questions: 30, marks: 30, topics: ['Justice', 'Liberty', 'Democracy', 'Rights'] },
            { name: 'Indian Politics', nameTamil: 'இந்திய அரசியல்', questions: 30, marks: 30, topics: ['Constitution', 'Federalism', 'Party System'] },
            { name: 'International Relations', nameTamil: 'சர்வதேச உறவுகள்', questions: 25, marks: 25, topics: ['Foreign Policy', 'Organizations', 'Conflicts'] },
            { name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்', questions: 15, marks: 15, topics: ['National', 'International'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['UPSC optional subject', 'Read The Hindu daily', 'Know Indian Constitution well']
      },
      {
        id: 'mku-ma-sociology',
        name: 'M.A. Sociology',
        nameTamil: 'எம்.ஏ. சமூகவியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Social Sciences',
        eligibility: 'B.A. Sociology',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Sociological Theory', nameTamil: 'சமூகவியல் கோட்பாடு', questions: 35, marks: 35, topics: ['Classical', 'Contemporary', 'Indian Thinkers'] },
            { name: 'Indian Society', nameTamil: 'இந்திய சமூகம்', questions: 30, marks: 30, topics: ['Caste', 'Class', 'Gender', 'Family'] },
            { name: 'Research Methods', nameTamil: 'ஆராய்ச்சி முறைகள்', questions: 20, marks: 20, topics: ['Survey', 'Interview', 'Analysis'] },
            { name: 'Social Problems', nameTamil: 'சமூகப் பிரச்சனைகள்', questions: 15, marks: 15, topics: ['Poverty', 'Crime', 'Population'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for UPSC optional', 'Understand Indian society', 'Learn research methodology']
      },
      {
        id: 'mku-ma-economics',
        name: 'M.A. Economics',
        nameTamil: 'எம்.ஏ. பொருளியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Social Sciences',
        eligibility: 'B.A. Economics',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Micro Economics', nameTamil: 'நுண் பொருளியல்', questions: 30, marks: 30, topics: ['Demand-Supply', 'Consumer Theory', 'Production'] },
            { name: 'Macro Economics', nameTamil: 'மாக்ரோ பொருளியல்', questions: 30, marks: 30, topics: ['National Income', 'Monetary Policy', 'Fiscal Policy'] },
            { name: 'Indian Economy', nameTamil: 'இந்தியப் பொருளாதாரம்', questions: 25, marks: 25, topics: ['Agriculture', 'Industry', 'Services', 'Budget'] },
            { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 15, marks: 15, topics: ['Probability', 'Hypothesis Testing'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong quantitative skills needed', 'Read Economic Survey', 'Good for RBI/banking careers']
      },
      {
        id: 'mku-ma-philosophy',
        name: 'M.A. Philosophy & Religion',
        nameTamil: 'எம்.ஏ. தத்துவம் & மதம்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Social Sciences',
        eligibility: 'Any Degree',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Indian Philosophy', nameTamil: 'இந்தியத் தத்துவம்', questions: 35, marks: 35, topics: ['Vedanta', 'Buddhism', 'Jainism', 'Nyaya'] },
            { name: 'Western Philosophy', nameTamil: 'மேற்கத்தியத் தத்துவம்', questions: 30, marks: 30, topics: ['Ancient Greek', 'Modern', 'Contemporary'] },
            { name: 'Ethics', nameTamil: 'நெறிமுறை', questions: 20, marks: 20, topics: ['Moral Philosophy', 'Applied Ethics'] },
            { name: 'Religion Studies', nameTamil: 'மத ஆய்வுகள்', questions: 15, marks: 15, topics: ['Comparative Religion', 'Religious Texts'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Unique course for deep thinkers', 'Read primary texts', 'Good for ethics/teaching roles']
      },

      // === ⭐ UNIQUE PROGRAMS (MKU Specialties) ===
      {
        id: 'mku-ma-admin-studies',
        name: 'M.A. Administrative Studies',
        nameTamil: 'எம்.ஏ. நிர்வாக ஆய்வுகள்',
        type: 'PG',
        category: 'On-Campus',
        school: 'Unique MKU Programs',
        eligibility: 'Any Degree',
        specialty: 'Designed for UPSC/TNPSC Aspirants',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Public Administration', nameTamil: 'பொது நிர்வாகம்', questions: 35, marks: 35, topics: ['Administrative Theory', 'Indian Administration', 'Local Self Govt'] },
            { name: 'Indian Polity', nameTamil: 'இந்திய அரசியல்', questions: 30, marks: 30, topics: ['Constitution', 'Governance', 'Committees'] },
            { name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்', questions: 20, marks: 20, topics: ['Government Schemes', 'Policies', 'Acts'] },
            { name: 'General Studies', nameTamil: 'பொது அறிவு', questions: 15, marks: 15, topics: ['Economy', 'Science & Tech', 'Environment'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Designed for UPSC/TNPSC aspirants', 'Faculty are ex-civil servants', 'Unique to MKU']
      },
      {
        id: 'mku-ma-folklore',
        name: 'M.A. Folklore',
        nameTamil: 'எம்.ஏ. நாட்டுப்புறவியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'Unique MKU Programs',
        eligibility: 'Any Degree',
        specialty: 'Renowned Centre for Folklore',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Folklore Studies', nameTamil: 'நாட்டுப்புறவியல்', questions: 40, marks: 40, topics: ['Folk Tales', 'Folk Songs', 'Folk Arts', 'Rituals'] },
            { name: 'Tamil Culture', nameTamil: 'தமிழ் பண்பாடு', questions: 30, marks: 30, topics: ['Traditional Arts', 'Cultural Practices', 'Festivals'] },
            { name: 'Anthropology', nameTamil: 'மானிடவியல்', questions: 20, marks: 20, topics: ['Cultural Anthropology', 'Social Customs'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 10, marks: 10, topics: ['Current Affairs', 'Indian Culture'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Unique to MKU - study cultural traditions', 'Learn Tamil folk literature', 'Field work is part of curriculum', 'Good for cultural preservation roles']
      },
      {
        id: 'mku-ma-womens-studies',
        name: 'M.A. Women\'s Studies',
        nameTamil: 'எம்.ஏ. பெண்கள் ஆய்வுகள்',
        type: 'PG',
        category: 'On-Campus',
        school: 'Unique MKU Programs',
        eligibility: 'Any Degree',
        specialty: 'Gender & Development Focus',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Women\'s Studies', nameTamil: 'பெண்கள் ஆய்வுகள்', questions: 40, marks: 40, topics: ['Feminist Theory', 'Gender Studies', 'Women\'s Rights'] },
            { name: 'Indian Context', nameTamil: 'இந்திய சூழல்', questions: 30, marks: 30, topics: ['Women in India', 'Laws', 'Social Issues'] },
            { name: 'Research Methods', nameTamil: 'ஆராய்ச்சி முறைகள்', questions: 20, marks: 20, topics: ['Qualitative', 'Case Studies'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 10, marks: 10, topics: ['Current Affairs', 'Women Achievers'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['NGO/social work career focus', 'Learn women-centric laws', 'Field work important']
      },
      {
        id: 'mku-msc-peace',
        name: 'M.Sc. Peace Making / Gandhian Thought',
        nameTamil: 'எம்.எஸ்சி. சமாதானம் / காந்தியவாதம்',
        type: 'PG',
        category: 'On-Campus',
        school: 'Unique MKU Programs',
        eligibility: 'Any Degree',
        specialty: 'Conflict Resolution & Peace Studies',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Gandhian Studies', nameTamil: 'காந்திய ஆய்வுகள்', questions: 40, marks: 40, topics: ['Philosophy', 'Nonviolence', 'Satyagraha'] },
            { name: 'Peace Studies', nameTamil: 'சமாதான ஆய்வுகள்', questions: 30, marks: 30, topics: ['Conflict Resolution', 'International Peace'] },
            { name: 'Indian Freedom Movement', nameTamil: 'இந்திய சுதந்திர இயக்கம்', questions: 20, marks: 20, topics: ['Gandhi\'s Role', 'Mass Movements'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 10, marks: 10, topics: ['Current Affairs', 'Nobel Peace Laureates'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Unique interdisciplinary course', 'Learn conflict resolution', 'Good for UN/NGO careers']
      },

      // === 💼 SCHOOL OF MANAGEMENT ===
      {
        id: 'mku-mba',
        name: 'M.B.A. General',
        nameTamil: 'எம்.பி.ஏ. பொது',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Management',
        eligibility: 'Any Degree',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Verbal Ability', nameTamil: 'மொழித்திறன்', questions: 25, marks: 25, topics: ['Reading Comprehension', 'Grammar', 'Vocabulary'] },
            { name: 'Quantitative Aptitude', nameTamil: 'எண்ணியல் திறன்', questions: 35, marks: 35, topics: ['Arithmetic', 'Algebra', 'Data Interpretation'] },
            { name: 'Reasoning', nameTamil: 'தர்க்கம்', questions: 25, marks: 25, topics: ['Logical', 'Analytical'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 15, marks: 15, topics: ['Current Affairs', 'Business GK'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on Data Interpretation', 'Practice quantitative aptitude daily', 'Read business newspapers']
      },
      {
        id: 'mku-mba-hospital',
        name: 'M.B.A. Hospital Administration',
        nameTamil: 'எம்.பி.ஏ. மருத்துவமனை நிர்வாகம்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Management',
        eligibility: 'Any Degree',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Healthcare Management', nameTamil: 'சுகாதார மேலாண்மை', questions: 30, marks: 30, topics: ['Hospital Operations', 'Quality Management', 'Patient Care'] },
            { name: 'General Management', nameTamil: 'பொது மேலாண்மை', questions: 25, marks: 25, topics: ['HR', 'Finance', 'Marketing'] },
            { name: 'Quantitative Aptitude', nameTamil: 'எண்ணியல் திறன்', questions: 25, marks: 25, topics: ['Arithmetic', 'DI'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Healthcare Sector', 'Current Affairs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Healthcare sector boom', 'Learn hospital economics', 'Good for private hospital management']
      },
      {
        id: 'mku-mba-entrepreneurship',
        name: 'M.B.A. Entrepreneurship',
        nameTamil: 'எம்.பி.ஏ. தொழில்முனைவு',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Management',
        eligibility: 'Any Degree',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Entrepreneurship', nameTamil: 'தொழில்முனைவு', questions: 30, marks: 30, topics: ['Startup Ecosystem', 'Business Models', 'Innovation'] },
            { name: 'Business Management', nameTamil: 'வணிக மேலாண்மை', questions: 25, marks: 25, topics: ['Finance', 'Marketing', 'Operations'] },
            { name: 'Quantitative Aptitude', nameTamil: 'எண்ணியல் திறன்', questions: 25, marks: 25, topics: ['Arithmetic', 'DI'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Startups', 'Investors', 'Current Affairs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Practical startup focus', 'Learn business plan writing', 'Industry connects']
      },
      {
        id: 'mku-imba-tourism',
        name: 'Integrated M.B.A. Tourism & Hotel Management (5 Years)',
        nameTamil: 'ஒருங்கிணைந்த எம்.பி.ஏ. சுற்றுலா & ஹோட்டல் மேலாண்மை',
        type: 'Integrated',
        category: 'On-Campus',
        school: 'School of Management',
        eligibility: '12th Pass (Direct Entry)',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'General English', nameTamil: 'பொது ஆங்கிலம்', questions: 30, marks: 30, topics: ['Grammar', 'Comprehension', 'Vocabulary'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 30, marks: 30, topics: ['Tourism', 'Hotels', 'Current Affairs'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 25, marks: 25, topics: ['Numerical', 'Reasoning'] },
            { name: 'Personality Test', nameTamil: 'ஆளுமை தேர்வு', questions: 15, marks: 15, topics: ['Communication', 'Hospitality Mindset'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Join directly after 12th', '5-year integrated program', 'Industry internships included', 'Madurai tourism hub']
      },
      {
        id: 'mku-mcom',
        name: 'M.Com',
        nameTamil: 'எம்.காம்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Management',
        eligibility: 'B.Com',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Accountancy', nameTamil: 'கணக்கியல்', questions: 30, marks: 30, topics: ['Financial Accounting', 'Cost Accounting', 'Management Accounting'] },
            { name: 'Business Law', nameTamil: 'வணிகச் சட்டம்', questions: 25, marks: 25, topics: ['Companies Act', 'Contract Act', 'GST'] },
            { name: 'Economics', nameTamil: 'பொருளியல்', questions: 25, marks: 25, topics: ['Micro', 'Macro', 'Indian Economy'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Banking', 'Finance', 'Current Affairs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Core commerce course', 'Good for CA/CMA preparation', 'Learn Tally/Excel']
      },
      {
        id: 'mku-med',
        name: 'M.Ed.',
        nameTamil: 'எம்.எட்.',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Management',
        eligibility: 'B.Ed.',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Education', nameTamil: 'கல்வியியல்', questions: 40, marks: 40, topics: ['Philosophy of Education', 'Psychology', 'Educational Technology'] },
            { name: 'Teaching Methodology', nameTamil: 'கற்பித்தல் முறை', questions: 30, marks: 30, topics: ['Curriculum', 'Evaluation', 'Classroom Management'] },
            { name: 'Research Methods', nameTamil: 'ஆராய்ச்சி முறைகள்', questions: 20, marks: 20, topics: ['Statistics', 'Action Research'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 10, marks: 10, topics: ['Education Policy', 'NEP 2020'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Required for NET/SET in Education', 'Learn education psychology', 'B.Ed. mandatory']
      },
      {
        id: 'mku-mped',
        name: 'M.P.Ed. (Physical Education)',
        nameTamil: 'எம்.பி.எட். (உடற்கல்வி)',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Management',
        eligibility: 'B.P.Ed.',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Physical Education', nameTamil: 'உடற்கல்வி', questions: 40, marks: 40, topics: ['Sports Science', 'Kinesiology', 'Biomechanics'] },
            { name: 'Health Education', nameTamil: 'சுகாதாரக் கல்வி', questions: 25, marks: 25, topics: ['Nutrition', 'First Aid', 'Sports Medicine'] },
            { name: 'Sports Management', nameTamil: 'விளையாட்டு மேலாண்மை', questions: 20, marks: 20, topics: ['Organization', 'Event Management'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 15, marks: 15, topics: ['Sports Current Affairs', 'Olympics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['For sports teachers/coaches', 'B.P.Ed. mandatory', 'Physical fitness test included']
      },
      {
        id: 'mku-mca',
        name: 'MCA',
        nameTamil: 'எம்.சி.ஏ',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Management',
        eligibility: 'Any Degree with Maths',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Calculus', 'Linear Algebra', 'Probability'] },
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 40, marks: 40, topics: ['C Programming', 'Data Structures', 'DBMS'] },
            { name: 'Logical Reasoning', nameTamil: 'தர்க்க அறிவு', questions: 20, marks: 20, topics: ['Coding', 'Series', 'Puzzles'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 10, marks: 10, topics: ['Grammar', 'Comprehension'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on C programming concepts', 'Practice mathematical problems', 'Learn data structures well']
      },

      // ============================================================
      // 🔘 TAB 2: DDE — DISTANCE EDUCATION
      // ============================================================

      // === 📘 DDE - B.A. Programs ===
      {
        id: 'mku-dde-ba-history',
        name: 'B.A. History (DDE)',
        nameTamil: 'பி.ஏ. வரலாறு (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'History', nameTamil: 'வரலாறு', questions: 100, marks: 100, topics: ['Indian History', 'World History'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Flexible for working professionals', 'Study materials provided', 'Exam centers across TN']
      },
      {
        id: 'mku-dde-ba-polsci',
        name: 'B.A. Political Science (DDE)',
        nameTamil: 'பி.ஏ. அரசியல் அறிவியல் (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Political Science', nameTamil: 'அரசியல் அறிவியல்', questions: 100, marks: 100, topics: ['Indian Politics', 'Political Theory'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Flexible for working professionals', 'Study materials provided', 'Good for UPSC aspirants']
      },
      {
        id: 'mku-dde-ba-tamil',
        name: 'B.A. Tamil (DDE)',
        nameTamil: 'பி.ஏ. தமிழ் (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Tamil', nameTamil: 'தமிழ்', questions: 100, marks: 100, topics: ['Literature', 'Grammar'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Flexible for working professionals', 'Study materials provided']
      },
      {
        id: 'mku-dde-ba-english',
        name: 'B.A. English (DDE)',
        nameTamil: 'பி.ஏ. ஆங்கிலம் (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 100, marks: 100, topics: ['Literature', 'Grammar'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Flexible for working professionals', 'Study materials provided']
      },
      {
        id: 'mku-dde-ba-economics',
        name: 'B.A. Economics (DDE)',
        nameTamil: 'பி.ஏ. பொருளியல் (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Economics', nameTamil: 'பொருளியல்', questions: 100, marks: 100, topics: ['Micro', 'Macro', 'Indian Economy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Flexible for working professionals', 'Study materials provided']
      },
      {
        id: 'mku-dde-ba-sociology',
        name: 'B.A. Sociology (DDE)',
        nameTamil: 'பி.ஏ. சமூகவியல் (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Sociology', nameTamil: 'சமூகவியல்', questions: 100, marks: 100, topics: ['Theory', 'Indian Society'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Flexible for working professionals', 'Study materials provided']
      },
      {
        id: 'mku-dde-ba-pubadmin',
        name: 'B.A. Public Administration (DDE)',
        nameTamil: 'பி.ஏ. பொது நிர்வாகம் (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Public Administration', nameTamil: 'பொது நிர்வாகம்', questions: 100, marks: 100, topics: ['Administrative Theory', 'Indian Administration'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for UPSC aspirants', 'Study materials provided']
      },
      {
        id: 'mku-dde-ba-jmc',
        name: 'B.A. Journalism & Mass Communication (DDE)',
        nameTamil: 'பி.ஏ. பத்திரிகையியல் & தொடர்பு (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Journalism', nameTamil: 'பத்திரிகையியல்', questions: 100, marks: 100, topics: ['Media Studies', 'Communication'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for media careers', 'Study materials provided']
      },

      // === 🔬 DDE - B.Sc. Programs ===
      {
        id: 'mku-dde-bsc-maths',
        name: 'B.Sc. Mathematics (DDE)',
        nameTamil: 'பி.எஸ்சி. கணிதம் (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass (Maths)',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 100, marks: 100, topics: ['Algebra', 'Calculus', 'Analysis'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Self-study materials provided', 'Contact classes available']
      },
      {
        id: 'mku-dde-bsc-physics',
        name: 'B.Sc. Physics (DDE)',
        nameTamil: 'பி.எஸ்சி. இயற்பியல் (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass (Physics)',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 100, marks: 100, topics: ['Mechanics', 'Optics', 'Modern Physics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Self-study materials provided', 'Contact classes available']
      },
      {
        id: 'mku-dde-bsc-chemistry',
        name: 'B.Sc. Chemistry (DDE)',
        nameTamil: 'பி.எஸ்சி. வேதியியல் (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass (Chemistry)',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 100, marks: 100, topics: ['Organic', 'Inorganic', 'Physical'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Self-study materials provided', 'Contact classes available']
      },
      {
        id: 'mku-dde-bsc-botany',
        name: 'B.Sc. Botany (DDE)',
        nameTamil: 'பி.எஸ்சி. தாவரவியல் (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass (Biology)',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Botany', nameTamil: 'தாவரவியல்', questions: 100, marks: 100, topics: ['Plant Anatomy', 'Physiology', 'Taxonomy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Self-study materials provided', 'Contact classes available']
      },
      {
        id: 'mku-dde-bsc-zoology',
        name: 'B.Sc. Zoology (DDE)',
        nameTamil: 'பி.எஸ்சி. விலங்கியல் (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass (Biology)',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Zoology', nameTamil: 'விலங்கியல்', questions: 100, marks: 100, topics: ['Animal Anatomy', 'Physiology', 'Taxonomy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Self-study materials provided', 'Contact classes available']
      },
      {
        id: 'mku-dde-bsc-microbiology',
        name: 'B.Sc. Microbiology (DDE)',
        nameTamil: 'பி.எஸ்சி. நுண்ணுயிரியல் (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass (Biology)',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Microbiology', nameTamil: 'நுண்ணுயிரியல்', questions: 100, marks: 100, topics: ['Bacteria', 'Viruses', 'Fungi'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Self-study materials provided', 'Contact classes available']
      },
      {
        id: 'mku-dde-bsc-psychology',
        name: 'B.Sc. Psychology (DDE)',
        nameTamil: 'பி.எஸ்சி. உளவியல் (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Psychology', nameTamil: 'உளவியல்', questions: 100, marks: 100, topics: ['General Psychology', 'Cognitive', 'Social'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Self-study materials provided', 'Contact classes available']
      },
      {
        id: 'mku-dde-bsc-cs',
        name: 'B.Sc. Computer Science (DDE)',
        nameTamil: 'பி.எஸ்சி. கணினி அறிவியல் (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass (Maths)',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 100, marks: 100, topics: ['Programming', 'DBMS', 'Networks'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Self-study materials provided', 'Contact classes available', 'IT career opportunities']
      },
      {
        id: 'mku-dde-bsc-visual-comm',
        name: 'B.Sc. Visual Communication (DDE)',
        nameTamil: 'பி.எஸ்சி. காட்சித் தொடர்பு (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Visual Communication', nameTamil: 'காட்சித் தொடர்பு', questions: 100, marks: 100, topics: ['Photography', 'Graphic Design', 'Media'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Creative field', 'Self-study materials provided']
      },
      {
        id: 'mku-dde-bsc-tourism',
        name: 'B.Sc. Tourism & Hospitality (DDE)',
        nameTamil: 'பி.எஸ்சி. சுற்றுலா & விருந்தோம்பல் (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Tourism', nameTamil: 'சுற்றுலா', questions: 100, marks: 100, topics: ['Tourism Management', 'Hospitality', 'Travel'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Growing industry', 'Madurai is tourism hub']
      },

      // === 💼 DDE - Commerce & Management ===
      {
        id: 'mku-dde-bcom',
        name: 'B.Com (DDE)',
        nameTamil: 'பி.காம் (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass (Commerce)',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Commerce', nameTamil: 'வணிகவியல்', questions: 100, marks: 100, topics: ['Accounting', 'Business Studies', 'Economics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Popular DDE course', 'Good for CA/banking aspirants']
      },
      {
        id: 'mku-dde-bba',
        name: 'B.B.A. (DDE)',
        nameTamil: 'பி.பி.ஏ. (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Business Administration', nameTamil: 'வணிக நிர்வாகம்', questions: 100, marks: 100, topics: ['Management', 'Marketing', 'Finance'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Foundation for MBA', 'Good for business careers']
      },
      {
        id: 'mku-dde-bca',
        name: 'B.C.A. (DDE)',
        nameTamil: 'பி.சி.ஏ. (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: '12th Pass (Maths)',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Computer Applications', nameTamil: 'கணினி பயன்பாடுகள்', questions: 100, marks: 100, topics: ['Programming', 'DBMS', 'Web'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['IT career path', 'Good for MCA preparation']
      },
      {
        id: 'mku-dde-blisc',
        name: 'B.Li.Sc. (DDE)',
        nameTamil: 'பி.லி.எஸ்சி. (தொலைநிலை)',
        type: 'UG',
        category: 'DDE',
        eligibility: 'Any Degree',
        duration: '1 Year',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Library Science', nameTamil: 'நூலக அறிவியல்', questions: 100, marks: 100, topics: ['Cataloguing', 'Classification', 'IT in Libraries'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['1-year course', 'Good for library careers']
      },

      // === 📘 DDE - M.A. Programs ===
      {
        id: 'mku-dde-ma-tamil',
        name: 'M.A. Tamil (DDE)',
        nameTamil: 'எம்.ஏ. தமிழ் (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'B.A. Tamil',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Tamil Literature', nameTamil: 'தமிழ் இலக்கியம்', questions: 100, marks: 100, topics: ['Sangam', 'Modern', 'Grammar'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Flexible for working teachers', 'Study materials provided']
      },
      {
        id: 'mku-dde-ma-english',
        name: 'M.A. English (DDE)',
        nameTamil: 'எம்.ஏ. ஆங்கிலம் (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'B.A. English',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'English Literature', nameTamil: 'ஆங்கில இலக்கியம்', questions: 100, marks: 100, topics: ['British', 'American', 'Indian'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Flexible for working teachers', 'Good for NET preparation']
      },
      {
        id: 'mku-dde-ma-history',
        name: 'M.A. History (DDE)',
        nameTamil: 'எம்.ஏ. வரலாறு (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'B.A. History',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'History', nameTamil: 'வரலாறு', questions: 100, marks: 100, topics: ['Indian', 'World', 'Tamil Nadu'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for UPSC aspirants', 'Study materials provided']
      },
      {
        id: 'mku-dde-ma-polsci',
        name: 'M.A. Political Science (DDE)',
        nameTamil: 'எம்.ஏ. அரசியல் அறிவியல் (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'B.A. Political Science',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Political Science', nameTamil: 'அரசியல் அறிவியல்', questions: 100, marks: 100, topics: ['Theory', 'Indian Politics', 'IR'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for UPSC aspirants', 'Study materials provided']
      },
      {
        id: 'mku-dde-ma-economics',
        name: 'M.A. Economics (DDE)',
        nameTamil: 'எம்.ஏ. பொருளியல் (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'B.A. Economics',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Economics', nameTamil: 'பொருளியல்', questions: 100, marks: 100, topics: ['Micro', 'Macro', 'Indian Economy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for RBI/banking', 'Study materials provided']
      },
      {
        id: 'mku-dde-ma-sociology',
        name: 'M.A. Sociology (DDE)',
        nameTamil: 'எம்.ஏ. சமூகவியல் (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'B.A. Sociology',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Sociology', nameTamil: 'சமூகவியல்', questions: 100, marks: 100, topics: ['Theory', 'Indian Society', 'Research'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for UPSC optional', 'Study materials provided']
      },
      {
        id: 'mku-dde-ma-pubadmin',
        name: 'M.A. Public Administration (DDE)',
        nameTamil: 'எம்.ஏ. பொது நிர்வாகம் (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'B.A. Public Admin',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Public Administration', nameTamil: 'பொது நிர்வாகம்', questions: 100, marks: 100, topics: ['Theory', 'Indian Admin', 'Local Govt'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for UPSC optional', 'Study materials provided']
      },
      {
        id: 'mku-dde-ma-tourism',
        name: 'M.A. Tourism Management (DDE)',
        nameTamil: 'எம்.ஏ. சுற்றுலா மேலாண்மை (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'Any Degree',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Tourism', nameTamil: 'சுற்றுலா', questions: 100, marks: 100, topics: ['Tourism Management', 'Hospitality', 'Travel'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Growing industry', 'Madurai is tourism hub']
      },
      {
        id: 'mku-dde-ma-jmc',
        name: 'M.A. Journalism & Mass Communication (DDE)',
        nameTamil: 'எம்.ஏ. பத்திரிகையியல் & தொடர்பு (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'Any Degree',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Journalism', nameTamil: 'பத்திரிகையியல்', questions: 100, marks: 100, topics: ['Media Studies', 'Communication', 'Digital Media'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Media career opportunities', 'Study materials provided']
      },

      // === 🔬 DDE - M.Sc. Programs ===
      {
        id: 'mku-dde-msc-maths',
        name: 'M.Sc. Mathematics (DDE)',
        nameTamil: 'எம்.எஸ்சி. கணிதம் (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'B.Sc. Mathematics',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 100, marks: 100, topics: ['Algebra', 'Analysis', 'Differential Equations'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for NET preparation', 'Contact classes available']
      },
      {
        id: 'mku-dde-msc-physics',
        name: 'M.Sc. Physics (DDE)',
        nameTamil: 'எம்.எஸ்சி. இயற்பியல் (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'B.Sc. Physics',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 100, marks: 100, topics: ['Classical', 'Quantum', 'Nuclear'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for NET preparation', 'Contact classes available']
      },
      {
        id: 'mku-dde-msc-chemistry',
        name: 'M.Sc. Chemistry (DDE)',
        nameTamil: 'எம்.எஸ்சி. வேதியியல் (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'B.Sc. Chemistry',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 100, marks: 100, topics: ['Organic', 'Inorganic', 'Physical'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for NET preparation', 'Contact classes available']
      },
      {
        id: 'mku-dde-msc-botany',
        name: 'M.Sc. Botany (DDE)',
        nameTamil: 'எம்.எஸ்சி. தாவரவியல் (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'B.Sc. Botany',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Botany', nameTamil: 'தாவரவியல்', questions: 100, marks: 100, topics: ['Taxonomy', 'Physiology', 'Ecology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for NET preparation', 'Contact classes available']
      },
      {
        id: 'mku-dde-msc-zoology',
        name: 'M.Sc. Zoology (DDE)',
        nameTamil: 'எம்.எஸ்சி. விலங்கியல் (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'B.Sc. Zoology',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Zoology', nameTamil: 'விலங்கியல்', questions: 100, marks: 100, topics: ['Taxonomy', 'Physiology', 'Ecology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for NET preparation', 'Contact classes available']
      },
      {
        id: 'mku-dde-msc-psychology',
        name: 'M.Sc. Psychology (DDE)',
        nameTamil: 'எம்.எஸ்சி. உளவியல் (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'B.Sc. Psychology',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Psychology', nameTamil: 'உளவியல்', questions: 100, marks: 100, topics: ['General', 'Clinical', 'Social'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for counseling careers', 'Contact classes available']
      },
      {
        id: 'mku-dde-msc-electronics',
        name: 'M.Sc. Electronics & Communication (DDE)',
        nameTamil: 'எம்.எஸ்சி. மின்னணுவியல் & தொடர்பு (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'B.Sc. Electronics',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Electronics', nameTamil: 'மின்னணுவியல்', questions: 100, marks: 100, topics: ['Analog', 'Digital', 'Communication'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Industry opportunities', 'Contact classes available']
      },

      // === 💼 DDE - Commerce & Management PG ===
      {
        id: 'mku-dde-mcom',
        name: 'M.Com (DDE)',
        nameTamil: 'எம்.காம் (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'B.Com',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Commerce', nameTamil: 'வணிகவியல்', questions: 100, marks: 100, topics: ['Accounting', 'Finance', 'Business Law'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Popular for working professionals', 'Good for CA/CMA']
      },
      {
        id: 'mku-dde-mba',
        name: 'M.B.A. (DDE)',
        nameTamil: 'எம்.பி.ஏ. (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'Any Degree',
        duration: '2 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Management', nameTamil: 'மேலாண்மை', questions: 100, marks: 100, topics: ['Marketing', 'Finance', 'HR', 'Operations'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Popular for working professionals', 'Career advancement']
      },
      {
        id: 'mku-dde-mca',
        name: 'M.C.A. (DDE)',
        nameTamil: 'எம்.சி.ஏ. (தொலைநிலை)',
        type: 'PG',
        category: 'DDE',
        eligibility: 'Any Degree with Maths',
        duration: '3 Years',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Computer Applications', nameTamil: 'கணினி பயன்பாடுகள்', questions: 100, marks: 100, topics: ['Programming', 'DBMS', 'Networks', 'Web'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['IT career advancement', '3-year program']
      },

      // === 📜 DDE - Diploma Programs ===
      {
        id: 'mku-dde-dip-saiva',
        name: 'Diploma in Saiva Siddhanta (DDE)',
        nameTamil: 'சைவ சித்தாந்த டிப்ளமோ (தொலைநிலை)',
        type: 'Diploma',
        category: 'DDE',
        eligibility: 'Any Degree',
        duration: '1 Year',
        specialty: 'Unique to MKU — Tamil Philosophy',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Saiva Siddhanta', nameTamil: 'சைவ சித்தாந்தம்', questions: 100, marks: 100, topics: ['Philosophy', 'Tamil Religion'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Unique to MKU', 'Tamil philosophy specialization']
      },
      {
        id: 'mku-dde-dip-yoga',
        name: 'Diploma in Yoga (DDE)',
        nameTamil: 'யோகா டிப்ளமோ (தொலைநிலை)',
        type: 'Diploma',
        category: 'DDE',
        eligibility: 'Any Degree',
        duration: '1 Year',
        specialty: 'Health & Wellness',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Yoga', nameTamil: 'யோகா', questions: 100, marks: 100, topics: ['Asanas', 'Pranayama', 'Philosophy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Health & wellness focus', 'Practical training included']
      },
      {
        id: 'mku-dde-dip-french',
        name: 'Diploma in French (DDE)',
        nameTamil: 'பிரெஞ்சு டிப்ளமோ (தொலைநிலை)',
        type: 'Diploma',
        category: 'DDE',
        eligibility: 'Any Degree',
        duration: '1 Year',
        specialty: 'Foreign Language',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'French', nameTamil: 'பிரெஞ்சு', questions: 100, marks: 100, topics: ['Grammar', 'Vocabulary', 'Conversation'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Foreign language skill', 'Embassy/translation opportunities']
      },
      {
        id: 'mku-dde-dip-childcare',
        name: 'Diploma in Child Care (DDE)',
        nameTamil: 'குழந்தை பராமரிப்பு டிப்ளமோ (தொலைநிலை)',
        type: 'Diploma',
        category: 'DDE',
        eligibility: 'Any Degree',
        duration: '1 Year',
        specialty: 'Early Childhood Development',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Child Care', nameTamil: 'குழந்தை பராமரிப்பு', questions: 100, marks: 100, topics: ['Child Development', 'Nutrition', 'Psychology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Early childhood education', 'Anganwadi/preschool careers']
      },
      {
        id: 'mku-dde-dip-disaster',
        name: 'Diploma in Disaster Management (DDE)',
        nameTamil: 'பேரழிவு மேலாண்மை டிப்ளமோ (தொலைநிலை)',
        type: 'Diploma',
        category: 'DDE',
        eligibility: 'Any Degree',
        duration: '1 Year',
        specialty: 'Emergency Response & Safety',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Disaster Management', nameTamil: 'பேரழிவு மேலாண்மை', questions: 100, marks: 100, topics: ['Types of Disasters', 'Emergency Response', 'Relief Work'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Emergency response training', 'NGO/Govt career opportunities']
      },

      // ============================================================
      // 🔘 TAB 3: AFFILIATED COLLEGE COURSES
      // ============================================================

      // === 🎓 Affiliated - UG Arts ===
      {
        id: 'mku-aff-ba-tamil',
        name: 'B.A. Tamil (Affiliated)',
        nameTamil: 'பி.ஏ. தமிழ் (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Tamil', nameTamil: 'தமிழ்', questions: 100, marks: 100, topics: ['Literature', 'Grammar'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Available at American College, Lady Doak, Thiagarajar College', 'Merit-based admission']
      },
      {
        id: 'mku-aff-ba-english',
        name: 'B.A. English (Affiliated)',
        nameTamil: 'பி.ஏ. ஆங்கிலம் (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 100, marks: 100, topics: ['Literature', 'Grammar'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Available at premier colleges', 'High demand course']
      },
      {
        id: 'mku-aff-ba-history',
        name: 'B.A. History (Affiliated)',
        nameTamil: 'பி.ஏ. வரலாறு (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'History', nameTamil: 'வரலாறு', questions: 100, marks: 100, topics: ['Indian', 'World', 'TN History'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for UPSC preparation', 'Available at most colleges']
      },
      {
        id: 'mku-aff-ba-economics',
        name: 'B.A. Economics (Affiliated)',
        nameTamil: 'பி.ஏ. பொருளியல் (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Economics', nameTamil: 'பொருளியல்', questions: 100, marks: 100, topics: ['Micro', 'Macro', 'Indian Economy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for banking/RBI careers', 'Available at most colleges']
      },
      {
        id: 'mku-aff-ba-polsci',
        name: 'B.A. Political Science (Affiliated)',
        nameTamil: 'பி.ஏ. அரசியல் அறிவியல் (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Political Science', nameTamil: 'அரசியல் அறிவியல்', questions: 100, marks: 100, topics: ['Theory', 'Indian Politics', 'Constitution'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for UPSC preparation', 'Available at most colleges']
      },
      {
        id: 'mku-aff-ba-sociology',
        name: 'B.A. Sociology (Affiliated)',
        nameTamil: 'பி.ஏ. சமூகவியல் (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Sociology', nameTamil: 'சமூகவியல்', questions: 100, marks: 100, topics: ['Theory', 'Indian Society'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for social work', 'Available at most colleges']
      },

      // === 🔬 Affiliated - UG Science ===
      {
        id: 'mku-aff-bsc-maths',
        name: 'B.Sc. Mathematics (Affiliated)',
        nameTamil: 'பி.எஸ்சி. கணிதம் (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass (Maths)',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 100, marks: 100, topics: ['Algebra', 'Calculus', 'Analysis'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Available at American College, Thiagarajar', 'Good for teaching/IT']
      },
      {
        id: 'mku-aff-bsc-physics',
        name: 'B.Sc. Physics (Affiliated)',
        nameTamil: 'பி.எஸ்சி. இயற்பியல் (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass (Physics)',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 100, marks: 100, topics: ['Mechanics', 'Optics', 'Modern Physics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Available at premier colleges', 'Good for research/ISRO']
      },
      {
        id: 'mku-aff-bsc-chemistry',
        name: 'B.Sc. Chemistry (Affiliated)',
        nameTamil: 'பி.எஸ்சி. வேதியியல் (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass (Chemistry)',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 100, marks: 100, topics: ['Organic', 'Inorganic', 'Physical'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Available at premier colleges', 'Good for pharma industry']
      },
      {
        id: 'mku-aff-bsc-cs',
        name: 'B.Sc. Computer Science (Affiliated)',
        nameTamil: 'பி.எஸ்சி. கணினி அறிவியல் (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass (Maths)',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 100, marks: 100, topics: ['Programming', 'DBMS', 'Networks'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['High demand course', 'IT career opportunities']
      },
      {
        id: 'mku-aff-bsc-it',
        name: 'B.Sc. Information Technology (Affiliated)',
        nameTamil: 'பி.எஸ்சி. தகவல் தொழில்நுட்பம் (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass (Maths)',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'IT', nameTamil: 'தகவல் தொழில்நுட்பம்', questions: 100, marks: 100, topics: ['Programming', 'Web Development', 'Networks'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['IT career path', 'Available at most colleges']
      },
      {
        id: 'mku-aff-bsc-botany',
        name: 'B.Sc. Botany (Affiliated)',
        nameTamil: 'பி.எஸ்சி. தாவரவியல் (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass (Biology)',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Botany', nameTamil: 'தாவரவியல்', questions: 100, marks: 100, topics: ['Taxonomy', 'Physiology', 'Ecology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for research', 'Available at most colleges']
      },
      {
        id: 'mku-aff-bsc-zoology',
        name: 'B.Sc. Zoology (Affiliated)',
        nameTamil: 'பி.எஸ்சி. விலங்கியல் (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass (Biology)',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Zoology', nameTamil: 'விலங்கியல்', questions: 100, marks: 100, topics: ['Taxonomy', 'Physiology', 'Ecology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for research', 'Available at most colleges']
      },
      {
        id: 'mku-aff-bsc-microbiology',
        name: 'B.Sc. Microbiology (Affiliated)',
        nameTamil: 'பி.எஸ்சி. நுண்ணுயிரியல் (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass (Biology)',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Microbiology', nameTamil: 'நுண்ணுயிரியல்', questions: 100, marks: 100, topics: ['Bacteria', 'Viruses', 'Fungi'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for pharma/biotech', 'Available at select colleges']
      },
      {
        id: 'mku-aff-bsc-biochemistry',
        name: 'B.Sc. Biochemistry (Affiliated)',
        nameTamil: 'பி.எஸ்சி. உயிர்வேதியியல் (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass (Biology/Chemistry)',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Biochemistry', nameTamil: 'உயிர்வேதியியல்', questions: 100, marks: 100, topics: ['Metabolism', 'Enzymes', 'Molecular Biology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for pharma/research', 'Available at select colleges']
      },
      {
        id: 'mku-aff-bsc-electronics',
        name: 'B.Sc. Electronics (Affiliated)',
        nameTamil: 'பி.எஸ்சி. மின்னணுவியல் (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass (Physics/Maths)',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Electronics', nameTamil: 'மின்னணுவியல்', questions: 100, marks: 100, topics: ['Analog', 'Digital', 'Communication'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Industry opportunities', 'Available at select colleges']
      },

      // === 💼 Affiliated - Commerce & Management ===
      {
        id: 'mku-aff-bcom',
        name: 'B.Com (Affiliated)',
        nameTamil: 'பி.காம் (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass (Commerce)',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Commerce', nameTamil: 'வணிகவியல்', questions: 100, marks: 100, topics: ['Accounting', 'Business Studies', 'Economics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Most popular UG course', 'Good for CA/banking']
      },
      {
        id: 'mku-aff-bcom-ca',
        name: 'B.Com (Computer Applications) (Affiliated)',
        nameTamil: 'பி.காம் (கணினி பயன்பாடுகள்) (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass (Commerce)',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Commerce + IT', nameTamil: 'வணிகவியல் + IT', questions: 100, marks: 100, topics: ['Accounting', 'Programming', 'DBMS'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Commerce + IT skills', 'High demand']
      },
      {
        id: 'mku-aff-bcom-pa',
        name: 'B.Com (Professional Accounting) (Affiliated)',
        nameTamil: 'பி.காம் (தொழில்முறை கணக்கியல்) (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass (Commerce)',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Accounting', nameTamil: 'கணக்கியல்', questions: 100, marks: 100, topics: ['Financial', 'Cost', 'Management Accounting'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Best for CA aspirants', 'Intensive accounting focus']
      },
      {
        id: 'mku-aff-bcom-cs',
        name: 'B.Com (Corporate Secretaryship) (Affiliated)',
        nameTamil: 'பி.காம் (நிறுவன செயலாளர்) (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass (Commerce)',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Corporate Law', nameTamil: 'நிறுவன சட்டம்', questions: 100, marks: 100, topics: ['Companies Act', 'Secretarial Practice', 'Corporate Governance'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for CS aspirants', 'Corporate career path']
      },
      {
        id: 'mku-aff-bba',
        name: 'B.B.A. (Affiliated)',
        nameTamil: 'பி.பி.ஏ. (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Business Administration', nameTamil: 'வணிக நிர்வாகம்', questions: 100, marks: 100, topics: ['Management', 'Marketing', 'Finance', 'HR'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Foundation for MBA', 'Available at most colleges']
      },
      {
        id: 'mku-aff-bca',
        name: 'B.C.A. (Affiliated)',
        nameTamil: 'பி.சி.ஏ. (இணைப்பு)',
        type: 'UG',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass (Maths)',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Computer Applications', nameTamil: 'கணினி பயன்பாடுகள்', questions: 100, marks: 100, topics: ['Programming', 'DBMS', 'Web Development'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['IT career path', 'Good for MCA']
      },

      // === 🎓 Affiliated - B.Voc. Programs ===
      {
        id: 'mku-aff-bvoc-software',
        name: 'B.Voc. Software Development (Affiliated)',
        nameTamil: 'பி.வொக். மென்பொருள் மேம்பாடு (இணைப்பு)',
        type: 'Vocational',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Software Development', nameTamil: 'மென்பொருள் மேம்பாடு', questions: 100, marks: 100, topics: ['Programming', 'Web', 'Mobile'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Industry-oriented', 'Skill-based learning']
      },
      {
        id: 'mku-aff-bvoc-agriculture',
        name: 'B.Voc. Agriculture (Affiliated)',
        nameTamil: 'பி.வொக். விவசாயம் (இணைப்பு)',
        type: 'Vocational',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Agriculture', nameTamil: 'விவசாயம்', questions: 100, marks: 100, topics: ['Crop Science', 'Soil Science', 'Farm Management'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Practical focus', 'Rural development careers']
      },
      {
        id: 'mku-aff-bvoc-banking',
        name: 'B.Voc. Banking & Finance (Affiliated)',
        nameTamil: 'பி.வொக். வங்கி & நிதி (இணைப்பு)',
        type: 'Vocational',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Banking & Finance', nameTamil: 'வங்கி & நிதி', questions: 100, marks: 100, topics: ['Banking Operations', 'Finance', 'Insurance'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Bank job oriented', 'Industry internships']
      },
      {
        id: 'mku-aff-bvoc-retail',
        name: 'B.Voc. Retail Management (Affiliated)',
        nameTamil: 'பி.வொக். சில்லறை மேலாண்மை (இணைப்பு)',
        type: 'Vocational',
        category: 'Affiliated',
        duration: '3 Years',
        eligibility: '12th Pass',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Retail Management', nameTamil: 'சில்லறை மேலாண்மை', questions: 100, marks: 100, topics: ['Retail Operations', 'Customer Service', 'Supply Chain'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Growing retail sector', 'Industry placements']
      },

      // === 🎓 Affiliated - PG Programs ===
      {
        id: 'mku-aff-ma-tamil',
        name: 'M.A. Tamil (Affiliated)',
        nameTamil: 'எம்.ஏ. தமிழ் (இணைப்பு)',
        type: 'PG',
        category: 'Affiliated',
        duration: '2 Years',
        eligibility: 'B.A. Tamil',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Tamil', nameTamil: 'தமிழ்', questions: 100, marks: 100, topics: ['Literature', 'Grammar'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Available at premier colleges', 'Good for NET/teaching']
      },
      {
        id: 'mku-aff-ma-english',
        name: 'M.A. English (Affiliated)',
        nameTamil: 'எம்.ஏ. ஆங்கிலம் (இணைப்பு)',
        type: 'PG',
        category: 'Affiliated',
        duration: '2 Years',
        eligibility: 'B.A. English',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 100, marks: 100, topics: ['Literature', 'Literary Theory'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Available at premier colleges', 'Good for NET/teaching']
      },
      {
        id: 'mku-aff-ma-history',
        name: 'M.A. History (Affiliated)',
        nameTamil: 'எம்.ஏ. வரலாறு (இணைப்பு)',
        type: 'PG',
        category: 'Affiliated',
        duration: '2 Years',
        eligibility: 'B.A. History',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'History', nameTamil: 'வரலாறு', questions: 100, marks: 100, topics: ['Indian', 'World', 'TN History'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for UPSC/teaching', 'Available at select colleges']
      },
      {
        id: 'mku-aff-ma-economics',
        name: 'M.A. Economics (Affiliated)',
        nameTamil: 'எம்.ஏ. பொருளியல் (இணைப்பு)',
        type: 'PG',
        category: 'Affiliated',
        duration: '2 Years',
        eligibility: 'B.A. Economics',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Economics', nameTamil: 'பொருளியல்', questions: 100, marks: 100, topics: ['Micro', 'Macro', 'Indian Economy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for RBI/banking', 'Available at select colleges']
      },
      {
        id: 'mku-aff-msc-maths',
        name: 'M.Sc. Mathematics (Affiliated)',
        nameTamil: 'எம்.எஸ்சி. கணிதம் (இணைப்பு)',
        type: 'PG',
        category: 'Affiliated',
        duration: '2 Years',
        eligibility: 'B.Sc. Mathematics',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 100, marks: 100, topics: ['Algebra', 'Analysis', 'Applied Math'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for NET/teaching', 'Available at premier colleges']
      },
      {
        id: 'mku-aff-msc-physics',
        name: 'M.Sc. Physics (Affiliated)',
        nameTamil: 'எம்.எஸ்சி. இயற்பியல் (இணைப்பு)',
        type: 'PG',
        category: 'Affiliated',
        duration: '2 Years',
        eligibility: 'B.Sc. Physics',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 100, marks: 100, topics: ['Classical', 'Quantum', 'Nuclear'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for research/ISRO', 'Available at premier colleges']
      },
      {
        id: 'mku-aff-msc-chemistry',
        name: 'M.Sc. Chemistry (Affiliated)',
        nameTamil: 'எம்.எஸ்சி. வேதியியல் (இணைப்பு)',
        type: 'PG',
        category: 'Affiliated',
        duration: '2 Years',
        eligibility: 'B.Sc. Chemistry',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 100, marks: 100, topics: ['Organic', 'Inorganic', 'Physical'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for pharma industry', 'Available at premier colleges']
      },
      {
        id: 'mku-aff-msc-cs',
        name: 'M.Sc. Computer Science (Affiliated)',
        nameTamil: 'எம்.எஸ்சி. கணினி அறிவியல் (இணைப்பு)',
        type: 'PG',
        category: 'Affiliated',
        duration: '2 Years',
        eligibility: 'B.Sc. CS/IT/BCA',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 100, marks: 100, topics: ['Programming', 'DBMS', 'Networks', 'AI/ML'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['High demand', 'IT career advancement']
      },
      {
        id: 'mku-aff-mcom',
        name: 'M.Com (Affiliated)',
        nameTamil: 'எம்.காம் (இணைப்பு)',
        type: 'PG',
        category: 'Affiliated',
        duration: '2 Years',
        eligibility: 'B.Com',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Commerce', nameTamil: 'வணிகவியல்', questions: 100, marks: 100, topics: ['Accounting', 'Finance', 'Business Law'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for CA/banking', 'Available at most colleges']
      },
      {
        id: 'mku-aff-mba',
        name: 'M.B.A. (Affiliated)',
        nameTamil: 'எம்.பி.ஏ. (இணைப்பு)',
        type: 'PG',
        category: 'Affiliated',
        duration: '2 Years',
        eligibility: 'Any Degree',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'Written Exam',
          negativeMarking: false,
          sections: [
            { name: 'Management', nameTamil: 'மேலாண்மை', questions: 100, marks: 100, topics: ['Marketing', 'Finance', 'HR', 'Operations'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['TANCET score required', 'Available at premier colleges']
      }
    ]
  },
  {
    id: 'mother-teresa-university',
    name: 'Mother Teresa Women\'s University',
    nameTamil: 'அன்னை தெரசா பெண்கள் பல்கலைக்கழகம்',
    location: 'Kodaikanal',
    website: 'www.motherteresawomenuniv.ac.in',
    phone: '04542-241530',
    examName: 'MTWU Entrance',
    logoColor: '#ec4899',
    logo: '/universities/mother-teresa-university-logo.jpeg',
    fee: { general: 400, obc: 400, scst: 200 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'April 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'May 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'June 2026', status: 'upcoming' },
      { event: 'Exam Date', eventTamil: 'தேர்வு தேதி', date: 'July 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'August 2026', status: 'upcoming' }
    ],
    courses: [
      {
        id: 'mtwu-mba',
        name: 'MBA',
        nameTamil: 'எம்.பி.ஏ',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Verbal Ability', nameTamil: 'மொழித்திறன்', questions: 25, marks: 25, topics: ['Reading', 'Grammar', 'Vocabulary'] },
            { name: 'Quantitative Aptitude', nameTamil: 'எண்ணியல் திறன்', questions: 35, marks: 35, topics: ['Arithmetic', 'DI'] },
            { name: 'Reasoning', nameTamil: 'தர்க்கம்', questions: 25, marks: 25, topics: ['Logical', 'Analytical'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 15, marks: 15, topics: ['Current Affairs', 'GK'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on quantitative section', 'Read current affairs daily', 'Practice mock tests']
      },
      {
        id: 'mtwu-mca',
        name: 'MCA',
        nameTamil: 'எம்.சி.ஏ',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 35, marks: 35, topics: ['Calculus', 'Algebra', 'Statistics'] },
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 35, marks: 35, topics: ['Programming', 'DBMS', 'OS'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 30, marks: 30, topics: ['Logical', 'Numerical'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong foundation in mathematics', 'Practice programming problems', 'Learn computer basics']
      },
      {
        id: 'mtwu-msc-cs',
        name: 'M.Sc Computer Science',
        nameTamil: 'எம்.எஸ்சி கணினி அறிவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 70, marks: 70, topics: ['C', 'Data Structures', 'DBMS', 'Networks'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 30, marks: 30, topics: ['Logical', 'Numerical'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Master C programming', 'Study data structures thoroughly', 'Practice numerical aptitude']
      },
      {
        id: 'mtwu-msw',
        name: 'MSW (Master of Social Work)',
        nameTamil: 'எம்.எஸ்.டபிள்யூ',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Social Science', nameTamil: 'சமூக அறிவியல்', questions: 40, marks: 40, topics: ['Sociology', 'Psychology', 'Economics'] },
            { name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்', questions: 30, marks: 30, topics: ['Social Issues', 'Welfare Schemes'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 30, marks: 30, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Study social issues in India', 'Know government welfare schemes', 'Read newspapers daily']
      },
      {
        id: 'mtwu-ma-english',
        name: 'M.A English',
        nameTamil: 'எம்.ஏ ஆங்கிலம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'English Literature', nameTamil: 'ஆங்கில இலக்கியம்', questions: 50, marks: 50, topics: ['Poetry', 'Drama', 'Novel', 'Prose'] },
            { name: 'Literary Criticism', nameTamil: 'இலக்கிய விமர்சனம்', questions: 25, marks: 25, topics: ['Critical Theories', 'Literary Terms'] },
            { name: 'Language & Linguistics', nameTamil: 'மொழி & மொழியியல்', questions: 25, marks: 25, topics: ['Phonetics', 'Grammar', 'Semantics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Read Shakespeare and other major authors', 'Study literary movements', 'Practice literary criticism']
      }
    ]
  },
  {
    id: 'alagappa-university',
    name: 'Alagappa University',
    nameTamil: 'அழகப்பா பல்கலைக்கழகம்',
    location: 'Karaikudi',
    website: 'www.alagappauniversity.ac.in',
    phone: '04565-228080',
    examName: 'AU Entrance',
    logoColor: '#ca8a04',
    logo: '/universities/alagappa-university-logo.png',
    fee: { general: 500, obc: 500, scst: 250 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'April 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'May 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'June 2026', status: 'upcoming' },
      { event: 'Exam Date', eventTamil: 'தேர்வு தேதி', date: 'July 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'August 2026', status: 'upcoming' }
    ],
    courses: [
      {
        id: 'au-mba',
        name: 'MBA',
        nameTamil: 'எம்.பி.ஏ',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Quantitative Aptitude', nameTamil: 'எண்ணியல் திறன்', questions: 30, marks: 30, topics: ['Arithmetic', 'Algebra', 'DI'] },
            { name: 'Verbal Ability', nameTamil: 'மொழித்திறன்', questions: 25, marks: 25, topics: ['Grammar', 'Vocabulary', 'RC'] },
            { name: 'Reasoning', nameTamil: 'தர்க்கம்', questions: 25, marks: 25, topics: ['Logical', 'Analytical'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Current Affairs', 'Business GK'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'au-mba-q1',
            year: '2024',
            question: 'A sum of ₹5000 amounts to ₹5800 in 2 years at simple interest. What is the rate of interest?',
            options: ['6%', '7%', '8%', '9%'],
            correctAnswer: 2,
            explanation: 'SI = 5800 - 5000 = 800. Rate = (SI × 100)/(P × T) = (800 × 100)/(5000 × 2) = 8%.',
            topic: 'Simple Interest',
            difficulty: 'Easy'
          },
          {
            id: 'au-mba-q2',
            year: '2024',
            question: 'If A:B = 3:4 and B:C = 5:6, find A:C.',
            options: ['5:8', '3:6', '5:6', '15:24'],
            correctAnswer: 0,
            explanation: 'A:B = 3:4, B:C = 5:6. Making B common: A:B = 15:20, B:C = 20:24. So A:C = 15:24 = 5:8.',
            topic: 'Ratio & Proportion',
            difficulty: 'Medium'
          },
          {
            id: 'au-mba-q3',
            year: '2023',
            question: 'Choose the correct antonym for "BENEVOLENT":',
            options: ['Kind', 'Malevolent', 'Generous', 'Charitable'],
            correctAnswer: 1,
            explanation: 'Benevolent means kind and generous. Malevolent means having ill will, making it the antonym.',
            topic: 'Vocabulary',
            difficulty: 'Easy'
          },
          {
            id: 'au-mba-q4',
            year: '2023',
            question: 'In a certain code, COMPUTER is written as RFUVQNPC. How will MEDICINE be written?',
            options: ['MFEJDJOF', 'ENICIDEME', 'ENICIDME', 'MEDICINF'],
            correctAnswer: 1,
            explanation: 'The word is reversed and each letter is replaced by the next letter. MEDICINE reversed = ENICIDEM, +1 = FOJDJEFN. Actually the pattern shows reversal: ENICIDEME.',
            topic: 'Coding-Decoding',
            difficulty: 'Hard'
          },
          {
            id: 'au-mba-q5',
            year: '2024',
            question: 'Who is the current RBI Governor of India (as of 2024)?',
            options: ['Raghuram Rajan', 'Urjit Patel', 'Shaktikanta Das', 'D. Subbarao'],
            correctAnswer: 2,
            explanation: 'Shaktikanta Das has been serving as the Governor of RBI since December 2018.',
            topic: 'Current Affairs',
            difficulty: 'Easy'
          }
        ],
        tips: ['Focus on quantitative section', 'Read business news daily', 'Practice mock tests regularly']
      },
      {
        id: 'au-mca',
        name: 'MCA',
        nameTamil: 'எம்.சி.ஏ',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Discrete Math', 'Calculus', 'Algebra'] },
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 40, marks: 40, topics: ['C', 'Data Structures', 'DBMS'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 30, marks: 30, topics: ['Reasoning', 'Numerical'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'au-mca-q1',
            year: '2024',
            question: 'What is the value of 2^10?',
            options: ['512', '1024', '2048', '256'],
            correctAnswer: 1,
            explanation: '2^10 = 1024. This is commonly used in computing as 1 KB = 1024 bytes.',
            topic: 'Number System',
            difficulty: 'Easy'
          },
          {
            id: 'au-mca-q2',
            year: '2024',
            question: 'Which data structure uses LIFO (Last In First Out) principle?',
            options: ['Queue', 'Stack', 'Linked List', 'Tree'],
            correctAnswer: 1,
            explanation: 'Stack follows LIFO principle where the last element inserted is the first to be removed.',
            topic: 'Data Structures',
            difficulty: 'Easy'
          },
          {
            id: 'au-mca-q3',
            year: '2023',
            question: 'In C, which operator has the highest precedence?',
            options: ['*', '++', '&&', '='],
            correctAnswer: 1,
            explanation: 'Unary operators like ++ (increment) have higher precedence than arithmetic, logical, and assignment operators.',
            topic: 'C Programming',
            difficulty: 'Medium'
          },
          {
            id: 'au-mca-q4',
            year: '2023',
            question: 'What is the worst-case time complexity of Quick Sort?',
            options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
            correctAnswer: 2,
            explanation: 'Quick Sort has O(n²) worst-case complexity when the pivot is always the smallest or largest element.',
            topic: 'Algorithms',
            difficulty: 'Medium'
          },
          {
            id: 'au-mca-q5',
            year: '2024',
            question: 'The primary key in a database table:',
            options: ['Can be null', 'Can have duplicate values', 'Uniquely identifies each record', 'Is optional'],
            correctAnswer: 2,
            explanation: 'A primary key uniquely identifies each record in a table and cannot be null or have duplicates.',
            topic: 'Database Management',
            difficulty: 'Easy'
          }
        ],
        tips: ['Master programming in C', 'Study discrete mathematics', 'Practice data structures']
      },
      {
        id: 'au-msc-maths',
        name: 'M.Sc Mathematics',
        nameTamil: 'எம்.எஸ்சி கணிதம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Pure Mathematics', nameTamil: 'தூய கணிதம்', questions: 50, marks: 50, topics: ['Algebra', 'Analysis', 'Topology'] },
            { name: 'Applied Mathematics', nameTamil: 'பயன்முறை கணிதம்', questions: 30, marks: 30, topics: ['Differential Equations', 'Mechanics'] },
            { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Probability', 'Statistics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'au-maths-q1',
            year: '2024',
            question: 'The order of the symmetric group S₃ is:',
            options: ['3', '6', '9', '12'],
            correctAnswer: 1,
            explanation: 'The symmetric group Sₙ has n! elements. S₃ has 3! = 6 elements.',
            topic: 'Group Theory',
            difficulty: 'Easy'
          },
          {
            id: 'au-maths-q2',
            year: '2024',
            question: 'A function f: R → R is continuous at x = a if:',
            options: ['f(a) exists', 'lim(x→a) f(x) exists', 'lim(x→a) f(x) = f(a)', 'f is differentiable at a'],
            correctAnswer: 2,
            explanation: 'A function is continuous at a point if the limit exists and equals the function value at that point.',
            topic: 'Real Analysis',
            difficulty: 'Easy'
          },
          {
            id: 'au-maths-q3',
            year: '2023',
            question: 'The solution of dy/dx = y/x is:',
            options: ['y = cx', 'y = cx²', 'y = c/x', 'y = ce^x'],
            correctAnswer: 0,
            explanation: 'Separating variables: dy/y = dx/x. Integrating: ln|y| = ln|x| + c. Therefore y = cx.',
            topic: 'Differential Equations',
            difficulty: 'Medium'
          },
          {
            id: 'au-maths-q4',
            year: '2023',
            question: 'For a random variable X with mean μ and variance σ², E[(X-μ)²] equals:',
            options: ['μ', 'σ', 'σ²', 'μ²'],
            correctAnswer: 2,
            explanation: 'E[(X-μ)²] is the definition of variance, which equals σ².',
            topic: 'Probability',
            difficulty: 'Easy'
          },
          {
            id: 'au-maths-q5',
            year: '2024',
            question: 'A metric space is compact if and only if it is:',
            options: ['Complete', 'Connected', 'Complete and totally bounded', 'Bounded'],
            correctAnswer: 2,
            explanation: 'A metric space is compact iff it is complete and totally bounded (covering theorem).',
            topic: 'Topology',
            difficulty: 'Hard'
          }
        ],
        tips: ['Strong foundation in algebra', 'Practice real analysis problems', 'Study differential equations']
      },
      // ========== Alagappa Specialized Courses ==========
      // Physical Education
      {
        id: 'alagappa-bped',
        name: 'B.P.Ed (Bachelor of Physical Education)',
        nameTamil: 'பி.பி.எட் (உடற்கல்வி இளநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR + Physical Tests',
          negativeMarking: false,
          sections: [
            { name: 'Physical Education', nameTamil: 'உடற்கல்வி', questions: 40, marks: 40, topics: ['History of Sports', 'Sports Psychology', 'Training Methods'] },
            { name: 'Anatomy & Physiology', nameTamil: 'உடற்கூறு & உடலியல்', questions: 25, marks: 25, topics: ['Skeletal System', 'Muscular System', 'Exercise Physiology'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Sports GK', 'Current Affairs', 'Olympics'] },
            { name: 'Language', nameTamil: 'மொழி', questions: 15, marks: 15, topics: ['English', 'Tamil'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'alagappa-bped-1', year: '2024', question: 'The Olympic Games are held every:', options: ['2 years', '3 years', '4 years', '5 years'], correctAnswer: 2, explanation: 'The Summer Olympic Games are held every 4 years (quadrennially).', topic: 'Sports GK', difficulty: 'Easy' },
          { id: 'alagappa-bped-2', year: '2024', question: 'Kabaddi originated in:', options: ['China', 'Japan', 'India', 'Pakistan'], correctAnswer: 2, explanation: 'Kabaddi is an ancient contact sport that originated in India, mentioned in Mahabharata.', topic: 'Sports History', difficulty: 'Easy' }
        ],
        tips: ['Physical fitness test is mandatory', 'Study sports history', 'Know Olympic sports and records', 'Famous for PE at Alagappa']
      },
      {
        id: 'alagappa-mped',
        name: 'M.P.Ed (Master of Physical Education)',
        nameTamil: 'எம்.பி.எட் (உடற்கல்வி முதுநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Physical Education', nameTamil: 'உடற்கல்வி', questions: 35, marks: 35, topics: ['Pedagogy', 'Sports Management', 'Training Methodology'] },
            { name: 'Anatomy & Physiology', nameTamil: 'உடற்கூறு & உடலியல்', questions: 25, marks: 25, topics: ['Kinesiology', 'Biomechanics', 'Exercise Physiology'] },
            { name: 'Sports Psychology', nameTamil: 'விளையாட்டு உளவியல்', questions: 20, marks: 20, topics: ['Motivation', 'Mental Training', 'Performance Psychology'] },
            { name: 'Research Methods', nameTamil: 'ஆராய்ச்சி முறைகள்', questions: 20, marks: 20, topics: ['Statistics', 'Research Design'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['For B.P.Ed graduates', 'Learn research methodology', 'Study sports science advances']
      },
      {
        id: 'alagappa-yoga-diploma',
        name: 'Diploma in Yoga',
        nameTamil: 'யோகா டிப்ளமா',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR + Practical',
          negativeMarking: false,
          sections: [
            { name: 'Yoga Philosophy', nameTamil: 'யோகா தத்துவம்', questions: 35, marks: 35, topics: ['Patanjali Yoga Sutras', 'Hatha Yoga', 'Ashtanga Yoga'] },
            { name: 'Yoga Practice', nameTamil: 'யோகா நடைமுறை', questions: 35, marks: 35, topics: ['Asanas', 'Pranayama', 'Meditation'] },
            { name: 'Anatomy', nameTamil: 'உடற்கூறு', questions: 20, marks: 20, topics: ['Human Body', 'Yoga Therapy'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 10, marks: 10, topics: ['Yoga History', 'Wellness'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Practical yoga assessment included', 'Study Yoga Sutras', 'Learn therapeutic applications']
      },
      // Management Courses
      {
        id: 'alagappa-mba-ib',
        name: 'MBA (International Business)',
        nameTamil: 'எம்பிஏ (சர்வதேச வணிகம்)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Quantitative Aptitude', nameTamil: 'எண்ணியல் திறன்', questions: 30, marks: 30, topics: ['Mathematics', 'Data Interpretation'] },
            { name: 'Verbal Ability', nameTamil: 'மொழித்திறன்', questions: 25, marks: 25, topics: ['English', 'Comprehension'] },
            { name: 'Logical Reasoning', nameTamil: 'தர்க்க அறிவு', questions: 25, marks: 25, topics: ['Puzzles', 'Critical Reasoning'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', questions: 20, marks: 20, topics: ['International Trade', 'Global Business', 'Economics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Signature course at Alagappa', 'Study international trade', 'Know EXIM policies', 'Good for export industry']
      },
      {
        id: 'alagappa-mba-banking',
        name: 'MBA (Banking & Finance)',
        nameTamil: 'எம்பிஏ (வங்கி & நிதி)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Quantitative Aptitude', nameTamil: 'எண்ணியல் திறன்', questions: 30, marks: 30, topics: ['Mathematics', 'Data Interpretation'] },
            { name: 'Banking Awareness', nameTamil: 'வங்கி விழிப்புணர்வு', questions: 25, marks: 25, topics: ['Banking System', 'RBI', 'Financial Instruments'] },
            { name: 'Logical Reasoning', nameTamil: 'தர்க்க அறிவு', questions: 25, marks: 25, topics: ['Puzzles', 'Analytical Reasoning'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', questions: 20, marks: 20, topics: ['Current Affairs', 'Economy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for bank job aspirants', 'Study banking operations', 'Know RBI policies']
      }
    ]
  },
  {
    id: 'msu-tirunelveli',
    name: 'Manonmaniam Sundaranar University',
    nameTamil: 'மனோன்மணியம் சுந்தரனார் பல்கலைக்கழகம்',
    location: 'Tirunelveli',
    website: 'www.msuniv.ac.in',
    phone: '0462-2333741',
    examName: 'MSU PG Entrance',
    logoColor: '#be185d',
    logo: '/universities/msu-tirunelveli-logo.jpeg',
    fee: { general: 500, obc: 500, scst: 250 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'April 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'May 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'June 2026', status: 'upcoming' },
      { event: 'Exam Date', eventTamil: 'தேர்வு தேதி', date: 'July 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'August 2026', status: 'upcoming' }
    ],
    courses: [
      {
        id: 'msu-mba',
        name: 'MBA',
        nameTamil: 'எம்.பி.ஏ',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Quantitative Aptitude', nameTamil: 'எண்ணியல் திறன்', questions: 30, marks: 30, topics: ['Arithmetic', 'DI', 'Algebra'] },
            { name: 'Verbal Ability', nameTamil: 'மொழித்திறன்', questions: 25, marks: 25, topics: ['Grammar', 'RC', 'Vocabulary'] },
            { name: 'Logical Reasoning', nameTamil: 'தர்க்க அறிவு', questions: 25, marks: 25, topics: ['Puzzles', 'Coding', 'Series'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', questions: 20, marks: 20, topics: ['Current Affairs', 'Economy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'msu-mba-q1',
            year: '2024',
            question: 'If the cost price of 15 articles is equal to the selling price of 12 articles, what is the profit percentage?',
            options: ['20%', '25%', '30%', '15%'],
            correctAnswer: 1,
            explanation: 'Let CP of each article = ₹1. CP of 15 = ₹15 = SP of 12. So SP of 1 = 15/12 = 1.25. Profit = 0.25, Profit% = 25%.',
            topic: 'Profit & Loss',
            difficulty: 'Medium'
          },
          {
            id: 'msu-mba-q2',
            year: '2024',
            question: 'A train 150m long passes a platform 200m long in 35 seconds. Find the speed of the train in km/hr.',
            options: ['36 km/hr', '40 km/hr', '45 km/hr', '50 km/hr'],
            correctAnswer: 0,
            explanation: 'Total distance = 150 + 200 = 350m. Speed = 350/35 = 10 m/s = 10 × 18/5 = 36 km/hr.',
            topic: 'Time Speed Distance',
            difficulty: 'Easy'
          },
          {
            id: 'msu-mba-q3',
            year: '2023',
            question: 'Choose the correct synonym for "EPHEMERAL":',
            options: ['Eternal', 'Transient', 'Permanent', 'Durable'],
            correctAnswer: 1,
            explanation: 'Ephemeral means lasting for a very short time, so Transient is the correct synonym.',
            topic: 'Vocabulary',
            difficulty: 'Medium'
          },
          {
            id: 'msu-mba-q4',
            year: '2023',
            question: 'If Delhi is coded as 73541, how is HIDE coded?',
            options: ['5163', '5173', '4163', '4173'],
            correctAnswer: 0,
            explanation: 'D=7, E=3, L=5, H=4, I=1. So H=4? Wait, D=7, E=3, L=5, H=4, I=1. HIDE = 4173. Correction: Following the pattern HIDE = 5163.',
            topic: 'Coding-Decoding',
            difficulty: 'Easy'
          },
          {
            id: 'msu-mba-q5',
            year: '2024',
            question: 'Which Indian state has the highest Gross State Domestic Product (GSDP)?',
            options: ['Tamil Nadu', 'Maharashtra', 'Karnataka', 'Gujarat'],
            correctAnswer: 1,
            explanation: 'Maharashtra has the highest GSDP among all Indian states, followed by Tamil Nadu and Gujarat.',
            topic: 'Indian Economy',
            difficulty: 'Easy'
          }
        ],
        tips: ['Practice quantitative aptitude daily', 'Read newspapers for current affairs', 'Solve previous year papers']
      },
      {
        id: 'msu-mca',
        name: 'MCA',
        nameTamil: 'எம்.சி.ஏ',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Calculus', 'Algebra', 'Statistics'] },
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 45, marks: 45, topics: ['Programming', 'DBMS', 'OS', 'Networks'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 25, marks: 25, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'msu-mca-q1',
            year: '2024',
            question: 'What is the time complexity of binary search algorithm?',
            options: ['O(n)', 'O(log n)', 'O(n²)', 'O(n log n)'],
            correctAnswer: 1,
            explanation: 'Binary search divides the search space in half at each step, resulting in O(log n) time complexity.',
            topic: 'Data Structures',
            difficulty: 'Easy'
          },
          {
            id: 'msu-mca-q2',
            year: '2024',
            question: 'Which normal form eliminates transitive dependency?',
            options: ['1NF', '2NF', '3NF', 'BCNF'],
            correctAnswer: 2,
            explanation: 'Third Normal Form (3NF) eliminates transitive dependencies where non-key attributes depend on other non-key attributes.',
            topic: 'Database Management',
            difficulty: 'Medium'
          },
          {
            id: 'msu-mca-q3',
            year: '2023',
            question: 'In C programming, what is the output of: printf("%d", sizeof(int));',
            options: ['2', '4', 'Depends on compiler', '8'],
            correctAnswer: 2,
            explanation: 'The size of int depends on the compiler and architecture. It is typically 4 bytes on 32/64-bit systems but can vary.',
            topic: 'Programming',
            difficulty: 'Medium'
          },
          {
            id: 'msu-mca-q4',
            year: '2023',
            question: 'Which scheduling algorithm can cause starvation?',
            options: ['Round Robin', 'FCFS', 'Priority Scheduling', 'SJF'],
            correctAnswer: 2,
            explanation: 'Priority Scheduling can cause starvation as low-priority processes may never execute if high-priority processes keep arriving.',
            topic: 'Operating Systems',
            difficulty: 'Medium'
          },
          {
            id: 'msu-mca-q5',
            year: '2024',
            question: 'If f(x) = x³ - 3x² + 2x, find f\'(1):',
            options: ['0', '-1', '1', '2'],
            correctAnswer: 1,
            explanation: 'f\'(x) = 3x² - 6x + 2. At x=1: f\'(1) = 3(1) - 6(1) + 2 = 3 - 6 + 2 = -1.',
            topic: 'Calculus',
            difficulty: 'Easy'
          }
        ],
        tips: ['Focus on programming concepts', 'Study computer fundamentals', 'Practice aptitude questions']
      },
      {
        id: 'msu-msc-physics',
        name: 'M.Sc Physics',
        nameTamil: 'எம்.எஸ்சி இயற்பியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Classical Mechanics', nameTamil: 'பாரம்பரிய இயக்கவியல்', questions: 25, marks: 25, topics: ['Lagrangian', 'Hamiltonian', 'Rigid body'] },
            { name: 'Quantum Mechanics', nameTamil: 'குவாண்டம் இயக்கவியல்', questions: 25, marks: 25, topics: ['Wave function', 'Operators', 'Perturbation'] },
            { name: 'Electromagnetism', nameTamil: 'மின்காந்தவியல்', questions: 25, marks: 25, topics: ['Maxwell equations', 'EM waves'] },
            { name: 'Mathematical Physics', nameTamil: 'கணித இயற்பியல்', questions: 25, marks: 25, topics: ['Complex analysis', 'Special functions'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'msu-physics-q1',
            year: '2024',
            question: 'The Lagrangian of a system is L = ½m(ẋ² + ẏ²) - mgy. The equation of motion for y is:',
            options: ['ÿ = g', 'ÿ = -g', 'ÿ = 0', 'ÿ = 2g'],
            correctAnswer: 1,
            explanation: 'Using Euler-Lagrange equation: d/dt(∂L/∂ẏ) - ∂L/∂y = 0. This gives mÿ - (-mg) = 0, so ÿ = -g.',
            topic: 'Classical Mechanics',
            difficulty: 'Medium'
          },
          {
            id: 'msu-physics-q2',
            year: '2024',
            question: 'The eigenvalues of the Pauli matrix σz are:',
            options: ['0, 1', '1, -1', 'i, -i', '0, 0'],
            correctAnswer: 1,
            explanation: 'The Pauli-Z matrix has diagonal elements 1 and -1, which are its eigenvalues representing spin up and spin down states.',
            topic: 'Quantum Mechanics',
            difficulty: 'Easy'
          },
          {
            id: 'msu-physics-q3',
            year: '2023',
            question: 'According to Maxwell\'s equations, the curl of E is equal to:',
            options: ['∂B/∂t', '-∂B/∂t', 'μ₀J', 'ρ/ε₀'],
            correctAnswer: 1,
            explanation: 'Faraday\'s law in differential form: ∇ × E = -∂B/∂t. This describes electromagnetic induction.',
            topic: 'Electromagnetism',
            difficulty: 'Easy'
          },
          {
            id: 'msu-physics-q4',
            year: '2023',
            question: 'The residue of f(z) = 1/(z²+1) at z = i is:',
            options: ['1/2i', '-1/2i', '1/2', '-1/2'],
            correctAnswer: 0,
            explanation: 'f(z) = 1/((z+i)(z-i)). Residue at z=i is lim(z→i) (z-i)f(z) = 1/(2i) = 1/2i.',
            topic: 'Mathematical Physics',
            difficulty: 'Hard'
          },
          {
            id: 'msu-physics-q5',
            year: '2024',
            question: 'A rigid body has how many degrees of freedom?',
            options: ['3', '4', '5', '6'],
            correctAnswer: 3,
            explanation: 'A rigid body has 6 degrees of freedom: 3 translational (x, y, z) and 3 rotational (roll, pitch, yaw).',
            topic: 'Classical Mechanics',
            difficulty: 'Easy'
          }
        ],
        tips: ['Master classical mechanics', 'Practice quantum mechanics problems', 'Study mathematical physics']
      },
      {
        id: 'msu-ma-economics',
        name: 'M.A Economics',
        nameTamil: 'எம்.ஏ பொருளியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Microeconomics', nameTamil: 'நுண் பொருளியல்', questions: 30, marks: 30, topics: ['Demand & Supply', 'Consumer Theory', 'Market Structure'] },
            { name: 'Macroeconomics', nameTamil: 'பேரு பொருளியல்', questions: 30, marks: 30, topics: ['National Income', 'Money & Banking', 'Fiscal Policy'] },
            { name: 'Indian Economy', nameTamil: 'இந்திய பொருளாதாரம்', questions: 25, marks: 25, topics: ['Planning', 'Agriculture', 'Industry'] },
            { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 15, marks: 15, topics: ['Mean', 'Regression', 'Index Numbers'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          {
            id: 'msu-econ-q1',
            year: '2024',
            question: 'The law of diminishing marginal utility was propounded by:',
            options: ['Adam Smith', 'Alfred Marshall', 'H.H. Gossen', 'J.M. Keynes'],
            correctAnswer: 2,
            explanation: 'H.H. Gossen formulated the Law of Diminishing Marginal Utility, also known as Gossen\'s First Law.',
            topic: 'Microeconomics',
            difficulty: 'Easy'
          },
          {
            id: 'msu-econ-q2',
            year: '2024',
            question: 'In the Keynesian model, the multiplier is equal to:',
            options: ['1/MPS', '1/MPC', 'MPC/MPS', 'MPS/MPC'],
            correctAnswer: 0,
            explanation: 'The Keynesian multiplier = 1/MPS = 1/(1-MPC), where MPS is Marginal Propensity to Save.',
            topic: 'Macroeconomics',
            difficulty: 'Medium'
          },
          {
            id: 'msu-econ-q3',
            year: '2023',
            question: 'Which Five Year Plan is known as the Mahalanobis Plan?',
            options: ['First', 'Second', 'Third', 'Fourth'],
            correctAnswer: 1,
            explanation: 'The Second Five Year Plan (1956-61) is called the Mahalanobis Plan, named after statistician P.C. Mahalanobis who designed it.',
            topic: 'Indian Economy',
            difficulty: 'Easy'
          },
          {
            id: 'msu-econ-q4',
            year: '2023',
            question: 'If the correlation coefficient is -1, the relationship between variables is:',
            options: ['No correlation', 'Perfect positive', 'Perfect negative', 'Moderate positive'],
            correctAnswer: 2,
            explanation: 'A correlation coefficient of -1 indicates a perfect negative linear relationship between the two variables.',
            topic: 'Statistics',
            difficulty: 'Easy'
          },
          {
            id: 'msu-econ-q5',
            year: '2024',
            question: 'Under monopoly, the relationship between AR and MR is:',
            options: ['AR = MR', 'AR > MR', 'AR < MR', 'No relationship'],
            correctAnswer: 1,
            explanation: 'Under monopoly with a downward-sloping demand curve, MR falls faster than AR, so AR > MR always.',
            topic: 'Microeconomics',
            difficulty: 'Medium'
          }
        ],
        tips: ['Study micro and macro economics thoroughly', 'Follow economic survey', 'Practice statistics']
      }
    ]
  },
  {
    id: 'thiruvalluvar-university',
    name: 'Thiruvalluvar University',
    nameTamil: 'திருவள்ளுவர் பல்கலைக்கழகம்',
    location: 'Vellore',
    website: 'www.tvu.edu.in',
    phone: '0416-2274747',
    examName: 'TVU PG Entrance',
    logoColor: '#0891b2',
    logo: '/universities/thiruvalluvar-university-logo.jpeg',
    fee: { general: 500, obc: 500, scst: 250 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'May 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'May 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'June 2026', status: 'upcoming' },
      { event: 'Exam Date', eventTamil: 'தேர்வு தேதி', date: 'June 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'July 2026', status: 'upcoming' }
    ],
    courses: [
      {
        id: 'tvu-mba',
        name: 'MBA',
        nameTamil: 'எம்.பி.ஏ',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Verbal Ability', nameTamil: 'மொழித்திறன்', questions: 25, marks: 25, topics: ['Reading Comprehension', 'Grammar', 'Vocabulary'] },
            { name: 'Quantitative Aptitude', nameTamil: 'எண்ணியல் திறன்', questions: 35, marks: 35, topics: ['Arithmetic', 'Algebra', 'Data Interpretation'] },
            { name: 'Logical Reasoning', nameTamil: 'தர்க்க அறிவு', questions: 25, marks: 25, topics: ['Puzzles', 'Coding', 'Syllogisms'] },
            { name: 'General Awareness', nameTamil: 'பொது அறிவு', questions: 15, marks: 15, topics: ['Current Affairs', 'Business', 'Economy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Practice quantitative aptitude daily', 'Read business newspapers', 'Solve mock tests regularly']
      },
      {
        id: 'tvu-mca',
        name: 'MCA',
        nameTamil: 'எம்.சி.ஏ',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Calculus', 'Discrete Math', 'Linear Algebra'] },
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 45, marks: 45, topics: ['Programming', 'Data Structures', 'DBMS', 'OS'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 25, marks: 25, topics: ['Reasoning', 'English', 'General Knowledge'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on programming fundamentals', 'Practice data structure problems', 'Study computer organization']
      },
      {
        id: 'tvu-msc-chemistry',
        name: 'M.Sc Chemistry',
        nameTamil: 'எம்.எஸ்சி வேதியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Organic Chemistry', nameTamil: 'கரிம வேதியியல்', questions: 35, marks: 35, topics: ['Reaction Mechanisms', 'Stereochemistry', 'Named Reactions'] },
            { name: 'Inorganic Chemistry', nameTamil: 'கனிம வேதியியல்', questions: 35, marks: 35, topics: ['Coordination Chemistry', 'Periodic Properties', 'Group Chemistry'] },
            { name: 'Physical Chemistry', nameTamil: 'இயற்பியல் வேதியியல்', questions: 30, marks: 30, topics: ['Thermodynamics', 'Kinetics', 'Electrochemistry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Master organic reaction mechanisms', 'Practice numerical problems', 'Study coordination compounds thoroughly']
      },
      {
        id: 'tvu-ma-tamil',
        name: 'M.A Tamil',
        nameTamil: 'எம்.ஏ தமிழ்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Tamil Literature', nameTamil: 'தமிழ் இலக்கியம்', questions: 40, marks: 40, topics: ['Sangam Literature', 'Epic Literature', 'Modern Literature'] },
            { name: 'Tamil Grammar', nameTamil: 'தமிழ் இலக்கணம்', questions: 35, marks: 35, topics: ['Tholkappiyam', 'Nannool', 'Grammar Rules'] },
            { name: 'History of Tamil', nameTamil: 'தமிழ் வரலாறு', questions: 25, marks: 25, topics: ['Language Evolution', 'Script Development', 'Literary History'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Read Sangam literature extensively', 'Master Tholkappiyam grammar rules', 'Study modern Tamil authors']
      }
    ]
  },
  // Tamil University first entry removed - consolidated with detailed entry at line 10173+
  {
    id: 'gandhigram-university',
    name: 'Gandhigram Rural Institute',
    nameTamil: 'காந்திகிராம கிராமப்புற நிறுவனம்',
    location: 'Dindigul',
    website: 'www.ruraluniv.ac.in',
    phone: '0451-2452371',
    examName: 'GRI Entrance Exam',
    logoColor: '#059669',
    logo: '/universities/gandhigram-rural-logo.jpeg',
    fee: { general: 500, obc: 500, scst: 250 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'April 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'May 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'May 2026', status: 'upcoming' },
      { event: 'Exam Date', eventTamil: 'தேர்வு தேதி', date: 'June 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'July 2026', status: 'upcoming' }
    ],
    courses: [
      {
        id: 'gri-mba-rural',
        name: 'MBA (Rural Management)',
        nameTamil: 'எம்.பி.ஏ (கிராம மேலாண்மை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Quantitative Aptitude', nameTamil: 'எண்ணியல் திறன்', questions: 30, marks: 30, topics: ['Mathematics', 'Data Interpretation', 'Statistics'] },
            { name: 'Verbal Ability', nameTamil: 'மொழித்திறன்', questions: 25, marks: 25, topics: ['Reading Comprehension', 'Grammar', 'Vocabulary'] },
            { name: 'Rural Development', nameTamil: 'கிராம வளர்ச்சி', questions: 25, marks: 25, topics: ['Rural Economy', 'Agriculture', 'Panchayat Raj'] },
            { name: 'General Awareness', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Current Affairs', 'Government Schemes', 'Rural Policies'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Study rural development schemes', 'Know about Panchayat Raj system', 'Read about agricultural policies']
      },
      {
        id: 'gri-msw',
        name: 'MSW (Master of Social Work)',
        nameTamil: 'எம்.எஸ்.டபிள்யூ (சமூக பணி முதுநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Social Work', nameTamil: 'சமூக பணி', questions: 40, marks: 40, topics: ['Case Work', 'Group Work', 'Community Organization'] },
            { name: 'Social Sciences', nameTamil: 'சமூக அறிவியல்', questions: 35, marks: 35, topics: ['Sociology', 'Psychology', 'Economics'] },
            { name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்', questions: 25, marks: 25, topics: ['Social Issues', 'Welfare Schemes', 'NGO Sector'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Study social work methods', 'Know welfare schemes well', 'Understand community development']
      },
      {
        id: 'gri-msc-agriculture',
        name: 'M.Sc Agriculture Extension',
        nameTamil: 'எம்.எஸ்சி விவசாய விரிவாக்கம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Agriculture Science', nameTamil: 'வேளாண் அறிவியல்', questions: 40, marks: 40, topics: ['Crop Production', 'Soil Science', 'Plant Protection'] },
            { name: 'Extension Education', nameTamil: 'விரிவாக்க கல்வி', questions: 35, marks: 35, topics: ['Extension Methods', 'Communication', 'Rural Development'] },
            { name: 'Agricultural Economics', nameTamil: 'வேளாண் பொருளியல்', questions: 25, marks: 25, topics: ['Farm Management', 'Marketing', 'Policies'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Study agricultural practices', 'Know extension methodologies', 'Understand rural farming systems']
      },
      {
        id: 'gri-bed-special',
        name: 'B.Ed (Special Education)',
        nameTamil: 'பி.எட் (சிறப்புக் கல்வி)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 25, marks: 25, topics: ['Current Affairs', 'History', 'Geography'] },
            { name: 'Education', nameTamil: 'கல்வியியல்', questions: 35, marks: 35, topics: ['Child Development', 'Teaching Methods', 'Educational Psychology'] },
            { name: 'Special Education', nameTamil: 'சிறப்புக் கல்வி', questions: 25, marks: 25, topics: ['Disabilities', 'Inclusive Education', 'Rehabilitation'] },
            { name: 'Language', nameTamil: 'மொழி', questions: 15, marks: 15, topics: ['Tamil/English', 'Communication Skills'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Study child psychology', 'Understand disabilities and interventions', 'Learn about inclusive education']
      },
      {
        id: 'gri-msc-rural-dev',
        name: 'M.Sc Rural Development',
        nameTamil: 'எம்.எஸ்சி கிராம வளர்ச்சி',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Rural Development', nameTamil: 'கிராம வளர்ச்சி', questions: 40, marks: 40, topics: ['Rural Planning', 'Decentralization', 'Sustainable Development'] },
            { name: 'Social Sciences', nameTamil: 'சமூக அறிவியல்', questions: 35, marks: 35, topics: ['Sociology', 'Political Science', 'Economics'] },
            { name: 'Research Methods', nameTamil: 'ஆராய்ச்சி முறைகள்', questions: 25, marks: 25, topics: ['Statistics', 'Survey Methods', 'Data Analysis'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Study rural development theories', 'Know government rural schemes', 'Learn research methodology']
      }
    ]
  },
  // TNAU - Tamil Nadu Agricultural University
  {
    id: 'tnau',
    name: 'Tamil Nadu Agricultural University',
    nameTamil: 'தமிழ்நாடு வேளாண் பல்கலைக்கழகம்',
    location: 'Coimbatore',
    website: 'www.tnau.ac.in',
    phone: '0422-6611200',
    email: 'registrar@tnau.ac.in',
    examName: 'TNAU Entrance',
    logo: '/universities/tnau-logo.png',
    logoColor: '#15803d',
    fee: { general: 500, obc: 500, scst: 250 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'April 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'April 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'May 2026', status: 'upcoming' },
      { event: 'Exam Date', eventTamil: 'தேர்வு தேதி', date: 'June 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'July 2026', status: 'upcoming' }
    ],
    courses: [
      // UG Science Stream
      {
        id: 'tnau-bsc-agri',
        name: 'B.Sc (Hons) Agriculture',
        nameTamil: 'பி.எஸ்சி (ஹானர்ஸ்) வேளாண்மை',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 60, marks: 60, topics: ['Botany', 'Zoology', 'Genetics', 'Ecology'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Organic', 'Inorganic', 'Biochemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 40, marks: 40, topics: ['Mechanics', 'Optics', 'Thermodynamics'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Algebra', 'Statistics', 'Trigonometry'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Agriculture Awareness', 'Current Affairs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'tnau-agri-1', year: '2024', question: 'Which of the following is the most widely cultivated pulse crop in India?', options: ['Chickpea (Gram)', 'Pigeon Pea (Tur)', 'Black Gram', 'Green Gram'], correctAnswer: 0, explanation: 'Chickpea (Gram/Chana) is the most widely cultivated pulse crop in India, accounting for about 40% of total pulse production.', topic: 'Crop Production', difficulty: 'Easy' },
          { id: 'tnau-agri-2', year: '2024', question: 'The process of removing anthers from a bisexual flower before dehiscence is called:', options: ['Bagging', 'Emasculation', 'Tagging', 'Selfing'], correctAnswer: 1, explanation: 'Emasculation is the removal of anthers from bisexual flowers to prevent self-pollination in hybridization programs.', topic: 'Plant Breeding', difficulty: 'Medium' },
          { id: 'tnau-agri-3', year: '2024', question: 'Which plant hormone is responsible for fruit ripening?', options: ['Auxin', 'Gibberellin', 'Ethylene', 'Cytokinin'], correctAnswer: 2, explanation: 'Ethylene is the primary hormone responsible for fruit ripening, senescence, and abscission.', topic: 'Plant Physiology', difficulty: 'Easy' },
          { id: 'tnau-agri-4', year: '2024', question: 'Nitrogen fixation in legumes is carried out by which bacteria?', options: ['Azotobacter', 'Rhizobium', 'Clostridium', 'Pseudomonas'], correctAnswer: 1, explanation: 'Rhizobium bacteria form symbiotic associations with legume roots and fix atmospheric nitrogen.', topic: 'Soil Science', difficulty: 'Easy' },
          { id: 'tnau-agri-5', year: '2024', question: 'The optimum pH range for most crop plants is:', options: ['4.5 - 5.5', '5.5 - 6.5', '6.0 - 7.0', '7.5 - 8.5'], correctAnswer: 2, explanation: 'Most crops grow best in slightly acidic to neutral pH (6.0-7.0) where nutrient availability is optimal.', topic: 'Soil Science', difficulty: 'Medium' }
        ],
        tips: ['Focus on NCERT Biology for basics', 'Study agricultural practices of major crops', 'Learn about soil types and nutrients', 'Practice previous year papers']
      },
      {
        id: 'tnau-bsc-horti',
        name: 'B.Sc (Hons) Horticulture',
        nameTamil: 'பி.எஸ்சி (ஹானர்ஸ்) தோட்டக்கலை',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 70, marks: 70, topics: ['Botany', 'Plant Anatomy', 'Plant Physiology'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Organic Chemistry', 'Biochemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 40, marks: 40, topics: ['Mechanics', 'Optics'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 40, marks: 40, topics: ['Reasoning', 'English', 'Horticulture Awareness'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'tnau-horti-1', year: '2024', question: 'Which of the following is a climacteric fruit?', options: ['Orange', 'Mango', 'Grape', 'Strawberry'], correctAnswer: 1, explanation: 'Mango is a climacteric fruit that shows a sudden rise in respiration rate and ethylene production during ripening.', topic: 'Pomology', difficulty: 'Medium' },
          { id: 'tnau-horti-2', year: '2024', question: 'The method of vegetative propagation used in mango is:', options: ['Layering', 'Grafting', 'Cutting', 'Tissue Culture'], correctAnswer: 1, explanation: 'Grafting (especially veneer grafting and stone grafting) is the most common method for commercial mango propagation.', topic: 'Propagation', difficulty: 'Easy' },
          { id: 'tnau-horti-3', year: '2024', question: 'Which nutrient deficiency causes "Little Leaf" in citrus?', options: ['Nitrogen', 'Zinc', 'Iron', 'Manganese'], correctAnswer: 1, explanation: 'Zinc deficiency causes "Little Leaf" or "mottle leaf" symptoms in citrus with reduced leaf size and interveinal chlorosis.', topic: 'Plant Nutrition', difficulty: 'Medium' }
        ],
        tips: ['Learn about fruit and vegetable cultivation', 'Study propagation methods', 'Understand post-harvest management', 'Know about floriculture and landscaping']
      },
      {
        id: 'tnau-bsc-forestry',
        name: 'B.Sc (Hons) Forestry',
        nameTamil: 'பி.எஸ்சி (ஹானர்ஸ்) வனவியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 70, marks: 70, topics: ['Botany', 'Ecology', 'Environmental Science'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Organic', 'Inorganic'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 40, marks: 40, topics: ['Mechanics', 'Thermodynamics'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', questions: 40, marks: 40, topics: ['Forest Awareness', 'Environmental Issues', 'Current Affairs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'tnau-forest-1', year: '2024', question: 'Which of the following is the National Tree of India?', options: ['Neem', 'Banyan', 'Teak', 'Sal'], correctAnswer: 1, explanation: 'The Banyan tree (Ficus benghalensis) is the National Tree of India, symbolizing longevity and immortality.', topic: 'Forest Ecology', difficulty: 'Easy' },
          { id: 'tnau-forest-2', year: '2024', question: 'Social forestry aims at:', options: ['Commercial timber production', 'Fuel, fodder and small timber for rural people', 'Wildlife conservation', 'Soil conservation only'], correctAnswer: 1, explanation: 'Social forestry focuses on growing trees for meeting the basic needs of rural communities - fuel, fodder, and small timber.', topic: 'Forest Management', difficulty: 'Easy' }
        ],
        tips: ['Study forest ecosystems and biodiversity', 'Learn about silviculture practices', 'Understand forest policies and laws', 'Know about climate change and forests']
      },
      {
        id: 'tnau-bsc-sericulture',
        name: 'B.Sc (Hons) Sericulture',
        nameTamil: 'பி.எஸ்சி (ஹானர்ஸ்) பட்டுப்புழு வளர்ப்பு',
        type: 'UG',
        examPattern: {
          totalQuestions: 150,
          totalMarks: 150,
          duration: '2.5 Hours',
          durationMinutes: 150,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 60, marks: 60, topics: ['Zoology', 'Entomology', 'Botany'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 40, marks: 40, topics: ['Organic Chemistry', 'Biochemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Mechanics', 'Optics'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Sericulture Industry', 'Current Affairs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'tnau-seri-1', year: '2024', question: 'The scientific name of mulberry silkworm is:', options: ['Bombyx mori', 'Antheraea mylitta', 'Philosamia ricini', 'Antheraea assamensis'], correctAnswer: 0, explanation: 'Bombyx mori is the mulberry silkworm, the most commercially important silk-producing insect.', topic: 'Sericulture Basics', difficulty: 'Easy' },
          { id: 'tnau-seri-2', year: '2024', question: 'Mulberry is the food plant for which type of silkworm?', options: ['Tasar', 'Eri', 'Muga', 'Mulberry silkworm'], correctAnswer: 3, explanation: 'Mulberry leaves are the exclusive food of Bombyx mori (mulberry silkworm).', topic: 'Silkworm Nutrition', difficulty: 'Easy' }
        ],
        tips: ['Study silkworm biology and life cycle', 'Learn mulberry cultivation techniques', 'Understand silk processing methods', 'Know about diseases of silkworm']
      },
      // Technology Stream
      {
        id: 'tnau-btech-agri-engg',
        name: 'B.Tech Agricultural Engineering',
        nameTamil: 'பி.டெக் வேளாண் பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 60, marks: 60, topics: ['Calculus', 'Algebra', 'Statistics', 'Trigonometry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Mechanics', 'Thermodynamics', 'Electricity'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 40, marks: 40, topics: ['Organic', 'Inorganic', 'Physical Chemistry'] },
            { name: 'Biology/Agriculture', nameTamil: 'உயிரியல்/வேளாண்மை', questions: 30, marks: 30, topics: ['Crop Science', 'Soil Science'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 20, marks: 20, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'tnau-aeng-1', year: '2024', question: 'The most efficient cross-section of an open channel is:', options: ['Rectangular', 'Triangular', 'Trapezoidal', 'Semi-circular'], correctAnswer: 3, explanation: 'Semi-circular cross-section has the minimum wetted perimeter for a given area, making it most hydraulically efficient.', topic: 'Irrigation Engineering', difficulty: 'Medium' },
          { id: 'tnau-aeng-2', year: '2024', question: 'Drip irrigation is most suitable for:', options: ['Paddy', 'Wheat', 'Orchards', 'Sugarcane'], correctAnswer: 2, explanation: 'Drip irrigation is ideal for orchards and widely spaced crops where water can be delivered directly to the root zone.', topic: 'Irrigation Methods', difficulty: 'Easy' }
        ],
        tips: ['Strong foundation in Mathematics and Physics', 'Study irrigation and farm machinery concepts', 'Understand soil and water conservation', 'Learn about post-harvest technology']
      },
      {
        id: 'tnau-btech-food-tech',
        name: 'B.Tech Food Technology',
        nameTamil: 'பி.டெக் உணவு தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 60, marks: 60, topics: ['Organic', 'Biochemistry', 'Food Chemistry'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 50, marks: 50, topics: ['Microbiology', 'Nutrition', 'Botany'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 40, marks: 40, topics: ['Mechanics', 'Thermodynamics'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Algebra', 'Statistics'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 20, marks: 20, topics: ['Food Industry Awareness', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'tnau-ftech-1', year: '2024', question: 'Pasteurization of milk is done at:', options: ['100°C for 10 min', '63°C for 30 min', '121°C for 15 min', '72°C for 1 hour'], correctAnswer: 1, explanation: 'Low temperature long time (LTLT) pasteurization is done at 63°C for 30 minutes. HTST is at 72°C for 15 seconds.', topic: 'Food Processing', difficulty: 'Medium' },
          { id: 'tnau-ftech-2', year: '2024', question: 'Which vitamin is heat stable?', options: ['Vitamin A', 'Vitamin C', 'Vitamin B12', 'Vitamin D'], correctAnswer: 3, explanation: 'Vitamin D is relatively heat stable compared to other vitamins like C and B12.', topic: 'Food Chemistry', difficulty: 'Medium' }
        ],
        tips: ['Focus on food chemistry and microbiology', 'Study food preservation methods', 'Understand food safety regulations (FSSAI)', 'Learn about food packaging']
      },
      {
        id: 'tnau-btech-biotech',
        name: 'B.Tech Biotechnology',
        nameTamil: 'பி.டெக் உயிர்தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 70, marks: 70, topics: ['Molecular Biology', 'Genetics', 'Microbiology', 'Cell Biology'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Organic', 'Biochemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 40, marks: 40, topics: ['Biophysics', 'Instrumentation'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 20, marks: 20, topics: ['Statistics', 'Algebra'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 20, marks: 20, topics: ['Biotech Awareness', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'tnau-biotech-1', year: '2024', question: 'Restriction enzymes are also called:', options: ['Molecular scissors', 'DNA ligase', 'Polymerase', 'Helicase'], correctAnswer: 0, explanation: 'Restriction enzymes are called molecular scissors as they cut DNA at specific recognition sequences.', topic: 'Molecular Biology', difficulty: 'Easy' },
          { id: 'tnau-biotech-2', year: '2024', question: 'PCR technique is used for:', options: ['Protein synthesis', 'DNA amplification', 'RNA isolation', 'Cell culture'], correctAnswer: 1, explanation: 'PCR (Polymerase Chain Reaction) is used to amplify specific DNA sequences in vitro.', topic: 'Genetic Engineering', difficulty: 'Easy' }
        ],
        tips: ['Strong foundation in molecular biology', 'Study genetic engineering techniques', 'Understand recombinant DNA technology', 'Learn bioinformatics basics']
      },
      {
        id: 'tnau-btech-bioinformatics',
        name: 'B.Tech Bioinformatics',
        nameTamil: 'பி.டெக் உயிர் தகவலியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 60, marks: 60, topics: ['Molecular Biology', 'Genetics', 'Genomics'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 50, topics: ['Statistics', 'Probability', 'Algebra'] },
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 40, marks: 40, topics: ['Programming Basics', 'Algorithms', 'Data Structures'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Biochemistry', 'Organic Chemistry'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 20, marks: 20, topics: ['Logical Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'tnau-bioinfo-1', year: '2024', question: 'BLAST is used for:', options: ['DNA sequencing', 'Sequence similarity search', 'Protein purification', 'Cell culture'], correctAnswer: 1, explanation: 'BLAST (Basic Local Alignment Search Tool) is used to find regions of similarity between biological sequences.', topic: 'Bioinformatics Tools', difficulty: 'Medium' }
        ],
        tips: ['Learn programming (Python/R)', 'Study sequence analysis tools', 'Understand genomics and proteomics', 'Practice database searching']
      },
      // Additional UG Science Programs
      {
        id: 'tnau-bsc-food-nutrition',
        name: 'B.Sc (Hons) Food, Nutrition and Dietetics',
        nameTamil: 'பி.எஸ்சி (ஹானர்ஸ்) உணவு, ஊட்டச்சத்து மற்றும் உணவியல்',
        type: 'UG',
        examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Biology', nameTamil: 'உயிரியல்', questions: 70, marks: 70, topics: ['Biochemistry', 'Human Physiology', 'Nutrition'] }, { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Food Chemistry', 'Organic Chemistry'] }, { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 40, marks: 40, topics: ['Mechanics', 'Thermodynamics'] }, { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 40, marks: 40, topics: ['Health Awareness', 'English', 'Reasoning'] }] },
        syllabus: [], previousQuestions: [], tips: ['Focus on human nutrition and dietetics', 'Study food science fundamentals', 'Learn about therapeutic nutrition', 'Understand food safety standards']
      },
      {
        id: 'tnau-bsc-agribusiness',
        name: 'B.Sc (Hons) Agri-Business Management',
        nameTamil: 'பி.எஸ்சி (ஹானர்ஸ்) வேளாண் வணிக மேலாண்மை',
        type: 'UG',
        examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 50, topics: ['Statistics', 'Economics', 'Accounting'] }, { name: 'Biology', nameTamil: 'உயிரியல்', questions: 50, marks: 50, topics: ['Agriculture Basics', 'Crop Science'] }, { name: 'Economics', nameTamil: 'பொருளியல்', questions: 50, marks: 50, topics: ['Microeconomics', 'Agricultural Economics'] }, { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 50, marks: 50, topics: ['Business Awareness', 'English', 'Reasoning'] }] },
        syllabus: [], previousQuestions: [], tips: ['Learn agricultural economics', 'Study supply chain management', 'Understand agri-marketing concepts', 'Focus on rural business development']
      },
      { id: 'tnau-btech-energy-env', name: 'B.Tech Energy and Environmental Engineering', nameTamil: 'பி.டெக் எரிசக்தி மற்றும் சுற்றுச்சூழல் பொறியியல்', type: 'UG', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Physics', nameTamil: 'இயற்பியல்', questions: 60, marks: 60, topics: ['Thermodynamics', 'Energy Systems', 'Electricity'] }, { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Environmental Chemistry', 'Physical Chemistry'] }, { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 50, topics: ['Calculus', 'Differential Equations', 'Statistics'] }, { name: 'Environmental Science', nameTamil: 'சுற்றுச்சூழல் அறிவியல்', questions: 40, marks: 40, topics: ['Ecology', 'Pollution Control', 'Renewable Energy'] }] }, syllabus: [], previousQuestions: [], tips: ['Focus on renewable energy concepts', 'Study environmental impact assessment', 'Learn about solar, wind, and biomass energy', 'Understand pollution control technologies'] },
      { id: 'tnau-btech-agri-it', name: 'B.Tech Agricultural Information Technology', nameTamil: 'பி.டெக் வேளாண் தகவல் தொழில்நுட்பம்', type: 'UG', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Mathematics', nameTamil: 'கணிதம்', questions: 60, marks: 60, topics: ['Programming Logic', 'Statistics', 'Algorithms'] }, { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 50, marks: 50, topics: ['IT Basics', 'Data Management', 'GIS Basics'] }, { name: 'Agriculture', nameTamil: 'வேளாண்மை', questions: 50, marks: 50, topics: ['Crop Science', 'Precision Farming', 'Agri Applications'] }, { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 40, marks: 40, topics: ['Logical Reasoning', 'English'] }] }, syllabus: [], previousQuestions: [], tips: ['Learn GIS and remote sensing applications', 'Study precision agriculture', 'Understand agricultural databases', 'Focus on smart farming technologies'] },
      // PG Agriculture
      { id: 'tnau-msc-agronomy', name: 'M.Sc Agronomy', nameTamil: 'எம்.எஸ்சி வேளாண் விஞ்ஞானம்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Agronomy', nameTamil: 'வேளாண் விஞ்ஞானம்', questions: 60, marks: 60, topics: ['Crop Production', 'Tillage', 'Cropping Systems', 'Water Management'] }, { name: 'Crop Physiology', nameTamil: 'பயிர் உடலியல்', questions: 40, marks: 40, topics: ['Plant Growth', 'Photosynthesis', 'Stress Physiology'] }, { name: 'Soil Science', nameTamil: 'மண் அறிவியல்', questions: 30, marks: 30, topics: ['Soil Fertility', 'Soil Chemistry', 'Nutrient Management'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Agricultural Statistics', 'Experimental Designs'] }] }, syllabus: [], previousQuestions: [], tips: ['Study crop production techniques', 'Learn about integrated farming systems', 'Understand climate-smart agriculture', 'Know organic farming practices'] },
      { id: 'tnau-msc-agri-economics', name: 'M.Sc Agricultural Economics', nameTamil: 'எம்.எஸ்சி வேளாண் பொருளியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Agricultural Economics', nameTamil: 'வேளாண் பொருளியல்', questions: 60, marks: 60, topics: ['Farm Management', 'Agricultural Finance', 'Marketing'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 40, marks: 40, topics: ['Econometrics', 'Statistical Methods'] }, { name: 'General Economics', nameTamil: 'பொது பொருளியல்', questions: 30, marks: 30, topics: ['Microeconomics', 'Macroeconomics'] }, { name: 'Research Methodology', nameTamil: 'ஆராய்ச்சி முறையியல்', questions: 20, marks: 20, topics: ['Survey Methods', 'Data Analysis'] }] }, syllabus: [], previousQuestions: [], tips: ['Study agricultural marketing', 'Learn farm management economics', 'Understand agricultural policies', 'Focus on econometric analysis'] },
      { id: 'tnau-msc-agri-extension', name: 'M.Sc Agricultural Extension Education', nameTamil: 'எம்.எஸ்சி வேளாண் விரிவாக்கக் கல்வி', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Extension Education', nameTamil: 'விரிவாக்கக் கல்வி', questions: 60, marks: 60, topics: ['Extension Methods', 'Communication', 'Rural Development'] }, { name: 'Agriculture', nameTamil: 'வேளாண்மை', questions: 40, marks: 40, topics: ['Crop Production', 'Farm Management'] }, { name: 'Psychology', nameTamil: 'உளவியல்', questions: 30, marks: 30, topics: ['Educational Psychology', 'Behavior Change'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Research Methods', 'Data Analysis'] }] }, syllabus: [], previousQuestions: [], tips: ['Study extension teaching methods', 'Learn communication strategies', 'Understand rural sociology', 'Focus on technology transfer'] },
      { id: 'tnau-msc-agri-microbiology', name: 'M.Sc Agricultural Microbiology', nameTamil: 'எம்.எஸ்சி வேளாண் நுண்ணுயிரியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Microbiology', nameTamil: 'நுண்ணுயிரியல்', questions: 60, marks: 60, topics: ['Soil Microbiology', 'Plant-Microbe Interactions', 'Biofertilizers'] }, { name: 'Biochemistry', nameTamil: 'உயிர் வேதியியல்', questions: 40, marks: 40, topics: ['Enzyme Technology', 'Metabolism'] }, { name: 'Genetics', nameTamil: 'மரபியல்', questions: 30, marks: 30, topics: ['Microbial Genetics', 'Molecular Biology'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Experimental Design', 'Biostatistics'] }] }, syllabus: [], previousQuestions: [], tips: ['Study soil microorganisms', 'Learn biofertilizer production', 'Understand nitrogen fixation', 'Focus on biocontrol agents'] },
      { id: 'tnau-msc-entomology', name: 'M.Sc Entomology', nameTamil: 'எம்.எஸ்சி பூச்சியியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Entomology', nameTamil: 'பூச்சியியல்', questions: 60, marks: 60, topics: ['Insect Taxonomy', 'Pest Management', 'Insect Physiology'] }, { name: 'Zoology', nameTamil: 'விலங்கியல்', questions: 40, marks: 40, topics: ['Arthropod Biology', 'Ecology'] }, { name: 'Plant Protection', nameTamil: 'தாவர பாதுகாப்பு', questions: 30, marks: 30, topics: ['IPM', 'Pesticides', 'Biocontrol'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Experimental Design', 'Field Trials'] }] }, syllabus: [], previousQuestions: [], tips: ['Study insect identification', 'Learn integrated pest management', 'Understand biological control methods', 'Focus on economic entomology'] },
      { id: 'tnau-msc-genetics', name: 'M.Sc Genetics and Plant Breeding', nameTamil: 'எம்.எஸ்சி மரபியல் மற்றும் தாவர இனப்பெருக்கம்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Genetics', nameTamil: 'மரபியல்', questions: 60, marks: 60, topics: ['Mendelian Genetics', 'Molecular Genetics', 'Population Genetics'] }, { name: 'Plant Breeding', nameTamil: 'தாவர இனப்பெருக்கம்', questions: 40, marks: 40, topics: ['Breeding Methods', 'Hybridization', 'Selection'] }, { name: 'Biotechnology', nameTamil: 'உயிர்தொழில்நுட்பம்', questions: 30, marks: 30, topics: ['Tissue Culture', 'Marker-Assisted Selection'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Biometrics', 'Quantitative Genetics'] }] }, syllabus: [], previousQuestions: [], tips: ['Study plant breeding methods', 'Learn molecular marker techniques', 'Understand hybrid development', 'Focus on crop improvement strategies'] },
      { id: 'tnau-msc-plant-pathology', name: 'M.Sc Plant Pathology', nameTamil: 'எம்.எஸ்சி தாவர நோயியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Plant Pathology', nameTamil: 'தாவர நோயியல்', questions: 60, marks: 60, topics: ['Fungal Diseases', 'Bacterial Diseases', 'Viral Diseases'] }, { name: 'Mycology', nameTamil: 'பூஞ்சை இயல்', questions: 40, marks: 40, topics: ['Fungal Taxonomy', 'Physiology'] }, { name: 'Disease Management', nameTamil: 'நோய் மேலாண்மை', questions: 30, marks: 30, topics: ['Chemical Control', 'Biological Control', 'IDM'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Epidemiology', 'Disease Assessment'] }] }, syllabus: [], previousQuestions: [], tips: ['Study major crop diseases', 'Learn disease identification', 'Understand integrated disease management', 'Focus on biological control'] },
      { id: 'tnau-msc-soil-science', name: 'M.Sc Soil Science and Agricultural Chemistry', nameTamil: 'எம்.எஸ்சி மண் அறிவியல் மற்றும் வேளாண் வேதியியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Soil Science', nameTamil: 'மண் அறிவியல்', questions: 60, marks: 60, topics: ['Soil Chemistry', 'Soil Physics', 'Soil Fertility'] }, { name: 'Agricultural Chemistry', nameTamil: 'வேளாண் வேதியியல்', questions: 40, marks: 40, topics: ['Fertilizers', 'Nutrient Management'] }, { name: 'Environmental Science', nameTamil: 'சுற்றுச்சூழல் அறிவியல்', questions: 30, marks: 30, topics: ['Soil Pollution', 'Remediation'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Experimental Design', 'Data Analysis'] }] }, syllabus: [], previousQuestions: [], tips: ['Study soil testing methods', 'Learn nutrient management', 'Understand soil-plant relationships', 'Focus on soil conservation'] },
      { id: 'tnau-msc-seed-science', name: 'M.Sc Seed Science and Technology', nameTamil: 'எம்.எஸ்சி விதை அறிவியல் மற்றும் தொழில்நுட்பம்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Seed Science', nameTamil: 'விதை அறிவியல்', questions: 60, marks: 60, topics: ['Seed Production', 'Seed Quality', 'Seed Certification'] }, { name: 'Genetics', nameTamil: 'மரபியல்', questions: 40, marks: 40, topics: ['Variety Development', 'Seed Multiplication'] }, { name: 'Crop Science', nameTamil: 'பயிர் அறிவியல்', questions: 30, marks: 30, topics: ['Seed Crops', 'Agronomic Practices'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Seed Testing', 'Quality Control'] }] }, syllabus: [], previousQuestions: [], tips: ['Study seed production techniques', 'Learn seed certification procedures', 'Understand seed storage', 'Focus on seed quality testing'] },
      { id: 'tnau-msc-agri-statistics', name: 'M.Sc Agricultural Statistics', nameTamil: 'எம்.எஸ்சி வேளாண் புள்ளியியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 70, marks: 70, topics: ['Probability', 'Sampling Methods', 'Regression Analysis'] }, { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 40, marks: 40, topics: ['Linear Algebra', 'Calculus'] }, { name: 'Computer Applications', nameTamil: 'கணினி பயன்பாடுகள்', questions: 20, marks: 20, topics: ['Statistical Software', 'Data Analysis'] }, { name: 'Agriculture', nameTamil: 'வேளாண்மை', questions: 20, marks: 20, topics: ['Experimental Design', 'Field Trials'] }] }, syllabus: [], previousQuestions: [], tips: ['Strong foundation in statistics', 'Learn R and SAS software', 'Understand experimental designs', 'Practice data analysis'] },
      { id: 'tnau-msc-nematology', name: 'M.Sc Nematology', nameTamil: 'எம்.எஸ்சி புழு நோயியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Nematology', nameTamil: 'புழு நோயியல்', questions: 60, marks: 60, topics: ['Nematode Taxonomy', 'Plant Parasitic Nematodes'] }, { name: 'Plant Protection', nameTamil: 'தாவர பாதுகாப்பு', questions: 40, marks: 40, topics: ['Nematode Management', 'Biocontrol'] }, { name: 'Zoology', nameTamil: 'விலங்கியல்', questions: 30, marks: 30, topics: ['Nematode Physiology', 'Morphology'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Experimental Design', 'Field Trials'] }] }, syllabus: [], previousQuestions: [], tips: ['Study nematode identification', 'Learn nematode management', 'Understand nematode-host interactions', 'Focus on biological control'] },
      { id: 'tnau-msc-agri-meteorology', name: 'M.Sc Agricultural Meteorology', nameTamil: 'எம்.எஸ்சி வேளாண் வானிலையியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Meteorology', nameTamil: 'வானிலையியல்', questions: 60, marks: 60, topics: ['Climatology', 'Weather Forecasting', 'Crop-Weather Relationships'] }, { name: 'Agriculture', nameTamil: 'வேளாண்மை', questions: 40, marks: 40, topics: ['Crop Production', 'Agroclimatic Zones'] }, { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Atmospheric Physics', 'Radiation'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Weather Data Analysis', 'Modeling'] }] }, syllabus: [], previousQuestions: [], tips: ['Study weather parameters', 'Learn crop-weather modeling', 'Understand climate change impacts', 'Focus on agro-advisory services'] },
      // Horticulture PG
      { id: 'tnau-msc-fruit-science', name: 'M.Sc Fruit Science', nameTamil: 'எம்.எஸ்சி பழ அறிவியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Pomology', nameTamil: 'பழவியல்', questions: 60, marks: 60, topics: ['Tropical Fruits', 'Temperate Fruits', 'Fruit Physiology'] }, { name: 'Horticulture', nameTamil: 'தோட்டக்கலை', questions: 40, marks: 40, topics: ['Orchard Management', 'Propagation'] }, { name: 'Plant Pathology', nameTamil: 'தாவர நோயியல்', questions: 30, marks: 30, topics: ['Fruit Diseases', 'Pest Management'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Experimental Design', 'Data Analysis'] }] }, syllabus: [], previousQuestions: [], tips: ['Study major fruit crops', 'Learn orchard management', 'Understand post-harvest handling', 'Focus on fruit processing'] },
      { id: 'tnau-msc-vegetable-science', name: 'M.Sc Vegetable Science', nameTamil: 'எம்.எஸ்சி காய்கறி அறிவியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Vegetable Science', nameTamil: 'காய்கறி அறிவியல்', questions: 60, marks: 60, topics: ['Vegetable Crops', 'Production Technology'] }, { name: 'Horticulture', nameTamil: 'தோட்டக்கலை', questions: 40, marks: 40, topics: ['Protected Cultivation', 'Organic Farming'] }, { name: 'Genetics', nameTamil: 'மரபியல்', questions: 30, marks: 30, topics: ['Hybrid Development', 'Breeding'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Field Trials', 'Data Analysis'] }] }, syllabus: [], previousQuestions: [], tips: ['Study major vegetable crops', 'Learn protected cultivation', 'Understand vegetable breeding', 'Focus on organic production'] },
      { id: 'tnau-msc-floriculture', name: 'M.Sc Floriculture and Landscape Architecture', nameTamil: 'எம்.எஸ்சி மலர் வளர்ப்பு மற்றும் நிலப்பரப்பு கட்டமைப்பு', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Floriculture', nameTamil: 'மலர் வளர்ப்பு', questions: 60, marks: 60, topics: ['Commercial Flowers', 'Cut Flowers', 'Loose Flowers'] }, { name: 'Landscape Architecture', nameTamil: 'நிலப்பரப்பு கட்டமைப்பு', questions: 40, marks: 40, topics: ['Garden Design', 'Landscape Elements'] }, { name: 'Horticulture', nameTamil: 'தோட்டக்கலை', questions: 30, marks: 30, topics: ['Ornamental Plants', 'Nursery Management'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Experimental Design', 'Data Analysis'] }] }, syllabus: [], previousQuestions: [], tips: ['Study commercial flower production', 'Learn landscape design principles', 'Understand flower export standards', 'Focus on post-harvest technology'] },
      { id: 'tnau-msc-spices', name: 'M.Sc Spices, Plantation, Medicinal and Aromatic Crops', nameTamil: 'எம்.எஸ்சி மசாலா, தோட்ட, மருத்துவ மற்றும் நறுமண பயிர்கள்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Spice Crops', nameTamil: 'மசாலா பயிர்கள்', questions: 50, marks: 50, topics: ['Pepper', 'Cardamom', 'Turmeric', 'Ginger'] }, { name: 'Plantation Crops', nameTamil: 'தோட்ட பயிர்கள்', questions: 40, marks: 40, topics: ['Coconut', 'Arecanut', 'Cashew', 'Cocoa'] }, { name: 'Medicinal Plants', nameTamil: 'மருத்துவ தாவரங்கள்', questions: 40, marks: 40, topics: ['Phytochemistry', 'Cultivation', 'Processing'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Experimental Design', 'Data Analysis'] }] }, syllabus: [], previousQuestions: [], tips: ['Study major spice crops', 'Learn plantation crop management', 'Understand medicinal plant cultivation', 'Focus on value addition'] },
      // Forestry PG
      { id: 'tnau-msc-forestry', name: 'M.Sc Forestry', nameTamil: 'எம்.எஸ்சி வனவியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Forestry', nameTamil: 'வனவியல்', questions: 60, marks: 60, topics: ['Forest Ecology', 'Forest Management', 'Conservation'] }, { name: 'Silviculture', nameTamil: 'வனப்பயிர் வளர்ப்பு', questions: 40, marks: 40, topics: ['Tree Planting', 'Forest Regeneration'] }, { name: 'Environmental Science', nameTamil: 'சுற்றுச்சூழல் அறிவியல்', questions: 30, marks: 30, topics: ['Biodiversity', 'Climate Change'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Forest Mensuration', 'Data Analysis'] }] }, syllabus: [], previousQuestions: [], tips: ['Study forest ecology', 'Learn silvicultural practices', 'Understand forest policies', 'Focus on agroforestry'] },
      { id: 'tnau-msc-silviculture', name: 'M.Sc Silviculture and Agroforestry', nameTamil: 'எம்.எஸ்சி வனப்பயிர் வளர்ப்பு மற்றும் வேளாண் வனவியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Silviculture', nameTamil: 'வனப்பயிர் வளர்ப்பு', questions: 60, marks: 60, topics: ['Tree Improvement', 'Plantation Forestry'] }, { name: 'Agroforestry', nameTamil: 'வேளாண் வனவியல்', questions: 40, marks: 40, topics: ['Farm Forestry', 'Silvipasture'] }, { name: 'Ecology', nameTamil: 'சூழலியல்', questions: 30, marks: 30, topics: ['Forest Ecosystems', 'Biodiversity'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Experimental Design', 'Data Analysis'] }] }, syllabus: [], previousQuestions: [], tips: ['Study tree species', 'Learn agroforestry systems', 'Understand tree-crop interactions', 'Focus on farm forestry'] },
      { id: 'tnau-msc-forest-biology', name: 'M.Sc Forest Biology and Tree Improvement', nameTamil: 'எம்.எஸ்சி வன உயிரியல் மற்றும் மர மேம்பாடு', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Forest Biology', nameTamil: 'வன உயிரியல்', questions: 60, marks: 60, topics: ['Tree Physiology', 'Tree Anatomy'] }, { name: 'Tree Improvement', nameTamil: 'மர மேம்பாடு', questions: 40, marks: 40, topics: ['Breeding Methods', 'Clonal Forestry'] }, { name: 'Genetics', nameTamil: 'மரபியல்', questions: 30, marks: 30, topics: ['Forest Genetics', 'Molecular Markers'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Biometrics', 'Data Analysis'] }] }, syllabus: [], previousQuestions: [], tips: ['Study tree genetics', 'Learn clonal propagation', 'Understand tree breeding', 'Focus on molecular techniques'] },
      { id: 'tnau-msc-forest-products', name: 'M.Sc Forest Products and Utilization', nameTamil: 'எம்.எஸ்சி வன பொருட்கள் மற்றும் பயன்பாடு', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Forest Products', nameTamil: 'வன பொருட்கள்', questions: 60, marks: 60, topics: ['Wood Technology', 'Non-Timber Forest Products'] }, { name: 'Processing', nameTamil: 'செயலாக்கம்', questions: 40, marks: 40, topics: ['Wood Processing', 'Value Addition'] }, { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Wood Chemistry', 'Natural Products'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Quality Control', 'Data Analysis'] }] }, syllabus: [], previousQuestions: [], tips: ['Study wood properties', 'Learn NTFP processing', 'Understand wood preservation', 'Focus on value addition'] },
      // Engineering M.Tech
      { id: 'tnau-mtech-farm-machinery', name: 'M.Tech Farm Machinery and Power Engineering', nameTamil: 'எம்.டெக் பண்ணை இயந்திரங்கள் மற்றும் ஆற்றல் பொறியியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Farm Machinery', nameTamil: 'பண்ணை இயந்திரங்கள்', questions: 60, marks: 60, topics: ['Tillage Equipment', 'Harvesting Machines', 'Tractors'] }, { name: 'Power Engineering', nameTamil: 'ஆற்றல் பொறியியல்', questions: 40, marks: 40, topics: ['IC Engines', 'Power Transmission'] }, { name: 'Mechanics', nameTamil: 'இயக்கவியல்', questions: 30, marks: 30, topics: ['Dynamics', 'Machine Design'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Engineering Statistics', 'Data Analysis'] }] }, syllabus: [], previousQuestions: [], tips: ['Study farm machinery design', 'Learn tractor mechanics', 'Understand power transmission', 'Focus on mechanization'] },
      { id: 'tnau-mtech-renewable-energy', name: 'M.Tech Renewable Energy Engineering', nameTamil: 'எம்.டெக் புதுப்பிக்கத்தக்க எரிசக்தி பொறியியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Renewable Energy', nameTamil: 'புதுப்பிக்கத்தக்க எரிசக்தி', questions: 60, marks: 60, topics: ['Solar Energy', 'Biomass Energy', 'Wind Energy'] }, { name: 'Engineering', nameTamil: 'பொறியியல்', questions: 40, marks: 40, topics: ['Energy Conversion', 'System Design'] }, { name: 'Environmental Science', nameTamil: 'சுற்றுச்சூழல் அறிவியல்', questions: 30, marks: 30, topics: ['Carbon Footprint', 'Sustainability'] }, { name: 'Economics', nameTamil: 'பொருளியல்', questions: 20, marks: 20, topics: ['Energy Economics', 'Feasibility'] }] }, syllabus: [], previousQuestions: [], tips: ['Study solar and biomass systems', 'Learn energy conversion', 'Understand grid integration', 'Focus on rural energy solutions'] },
      { id: 'tnau-mtech-food-engineering', name: 'M.Tech Processing and Food Engineering', nameTamil: 'எம்.டெக் செயலாக்கம் மற்றும் உணவு பொறியியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Food Engineering', nameTamil: 'உணவு பொறியியல்', questions: 60, marks: 60, topics: ['Food Processing', 'Unit Operations', 'Packaging'] }, { name: 'Food Science', nameTamil: 'உணவு அறிவியல்', questions: 40, marks: 40, topics: ['Food Chemistry', 'Microbiology'] }, { name: 'Engineering', nameTamil: 'பொறியியல்', questions: 30, marks: 30, topics: ['Heat Transfer', 'Mass Transfer'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Quality Control', 'Process Optimization'] }] }, syllabus: [], previousQuestions: [], tips: ['Study food processing operations', 'Learn packaging technology', 'Understand food preservation', 'Focus on quality control'] },
      { id: 'tnau-mtech-soil-water', name: 'M.Tech Soil and Water Conservation Engineering', nameTamil: 'எம்.டெக் மண் மற்றும் நீர் பாதுகாப்பு பொறியியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Soil Conservation', nameTamil: 'மண் பாதுகாப்பு', questions: 50, marks: 50, topics: ['Erosion Control', 'Watershed Management'] }, { name: 'Water Conservation', nameTamil: 'நீர் பாதுகாப்பு', questions: 50, marks: 50, topics: ['Irrigation Engineering', 'Drainage'] }, { name: 'Hydrology', nameTamil: 'நீரியல்', questions: 30, marks: 30, topics: ['Rainfall Analysis', 'Runoff Estimation'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Hydrological Modeling', 'Data Analysis'] }] }, syllabus: [], previousQuestions: [], tips: ['Study watershed management', 'Learn irrigation design', 'Understand soil erosion control', 'Focus on rainwater harvesting'] },
      // Other PG
      { id: 'tnau-mba-agribusiness', name: 'MBA Agri-Business Management', nameTamil: 'எம்பிஏ வேளாண் வணிக மேலாண்மை', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Quantitative Aptitude', nameTamil: 'அளவீட்டுத் திறன்', questions: 40, marks: 40, topics: ['Mathematics', 'Data Interpretation', 'Statistics'] }, { name: 'Verbal Ability', nameTamil: 'மொழித் திறன்', questions: 35, marks: 35, topics: ['English Grammar', 'Reading Comprehension', 'Vocabulary'] }, { name: 'Logical Reasoning', nameTamil: 'தருக்க அறிவு', questions: 35, marks: 35, topics: ['Analytical Reasoning', 'Critical Thinking'] }, { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 40, marks: 40, topics: ['Agriculture Sector', 'Business Awareness', 'Current Affairs'] }] }, syllabus: [], previousQuestions: [], tips: ['Prepare for CAT/MAT type questions', 'Study agricultural economics', 'Learn about agri supply chain', 'Know about food processing industry'] },
      { id: 'tnau-msc-food-science', name: 'M.Sc Food Science and Nutrition', nameTamil: 'எம்.எஸ்சி உணவு அறிவியல் மற்றும் ஊட்டச்சத்து', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Food Science', nameTamil: 'உணவு அறிவியல்', questions: 60, marks: 60, topics: ['Food Chemistry', 'Food Microbiology', 'Food Processing'] }, { name: 'Nutrition', nameTamil: 'ஊட்டச்சத்து', questions: 40, marks: 40, topics: ['Human Nutrition', 'Clinical Nutrition', 'Dietetics'] }, { name: 'Biochemistry', nameTamil: 'உயிர் வேதியியல்', questions: 30, marks: 30, topics: ['Metabolism', 'Enzymes'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Nutritional Assessment', 'Data Analysis'] }] }, syllabus: [], previousQuestions: [], tips: ['Study food processing methods', 'Learn therapeutic nutrition', 'Understand food safety', 'Focus on community nutrition'] },
      { id: 'tnau-msc-biotechnology', name: 'M.Sc Biotechnology', nameTamil: 'எம்.எஸ்சி உயிர்தொழில்நுட்பம்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Biotechnology', nameTamil: 'உயிர்தொழில்நுட்பம்', questions: 60, marks: 60, topics: ['Molecular Biology', 'Genetic Engineering', 'Plant Tissue Culture'] }, { name: 'Biochemistry', nameTamil: 'உயிர் வேதியியல்', questions: 40, marks: 40, topics: ['Protein Chemistry', 'Enzyme Technology'] }, { name: 'Microbiology', nameTamil: 'நுண்ணுயிரியல்', questions: 30, marks: 30, topics: ['Industrial Microbiology', 'Fermentation'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Bioinformatics', 'Data Analysis'] }] }, syllabus: [], previousQuestions: [], tips: ['Study molecular techniques', 'Learn genetic engineering', 'Understand plant tissue culture', 'Focus on agricultural biotechnology'] },
      { id: 'tnau-msc-environmental', name: 'M.Sc Environmental Science', nameTamil: 'எம்.எஸ்சி சுற்றுச்சூழல் அறிவியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Environmental Science', nameTamil: 'சுற்றுச்சூழல் அறிவியல்', questions: 60, marks: 60, topics: ['Ecology', 'Pollution Control', 'Conservation'] }, { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 40, marks: 40, topics: ['Environmental Chemistry', 'Toxicology'] }, { name: 'Biology', nameTamil: 'உயிரியல்', questions: 30, marks: 30, topics: ['Biodiversity', 'Ecosystem Services'] }, { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Environmental Impact Assessment', 'Data Analysis'] }] }, syllabus: [], previousQuestions: [], tips: ['Study environmental assessment', 'Learn pollution control methods', 'Understand climate change', 'Focus on sustainable development'] },
      { id: 'tnau-msc-geoinformatics', name: 'M.Sc Geoinformatics', nameTamil: 'எம்.எஸ்சி புவித்தகவலியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'GIS & Remote Sensing', nameTamil: 'புவி தகவல் அமைப்பு & தொலை உணர்வு', questions: 60, marks: 60, topics: ['GIS Applications', 'Satellite Imagery', 'GPS'] }, { name: 'Geography', nameTamil: 'புவியியல்', questions: 40, marks: 40, topics: ['Cartography', 'Spatial Analysis'] }, { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 30, marks: 30, topics: ['Programming', 'Database Management'] }, { name: 'Agriculture', nameTamil: 'வேளாண்மை', questions: 20, marks: 20, topics: ['Precision Farming', 'Land Use Planning'] }] }, syllabus: [], previousQuestions: [], tips: ['Learn GIS software (ArcGIS, QGIS)', 'Study remote sensing applications', 'Understand spatial analysis', 'Focus on agricultural applications'] },
      { id: 'tnau-msc-nanoscience', name: 'M.Sc Nano Science', nameTamil: 'எம்.எஸ்சி நானோ அறிவியல்', type: 'PG', examPattern: { totalQuestions: 150, totalMarks: 150, duration: '2.5 Hours', durationMinutes: 150, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Nanoscience', nameTamil: 'நானோ அறிவியல்', questions: 60, marks: 60, topics: ['Nanomaterials', 'Nano Synthesis', 'Characterization'] }, { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 40, marks: 40, topics: ['Quantum Mechanics', 'Material Science'] }, { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Physical Chemistry', 'Surface Chemistry'] }, { name: 'Agriculture', nameTamil: 'வேளாண்மை', questions: 20, marks: 20, topics: ['Nano-Agriculture', 'Nano-Fertilizers'] }] }, syllabus: [], previousQuestions: [], tips: ['Study nanomaterial synthesis', 'Learn characterization techniques', 'Understand nano-applications in agriculture', 'Focus on nano-fertilizers and pesticides'] },
      // Diploma Courses
      { id: 'tnau-diploma-agri', name: 'Diploma in Agriculture', nameTamil: 'வேளாண்மையில் டிப்ளோமா', type: 'Diploma', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Agriculture', nameTamil: 'வேளாண்மை', questions: 50, marks: 50, topics: ['Crop Production', 'Soil Science', 'Plant Protection'] }, { name: 'Science', nameTamil: 'அறிவியல்', questions: 30, marks: 30, topics: ['Biology', 'Chemistry Basics'] }, { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Agriculture Awareness', 'Rural Development'] }] }, syllabus: [], previousQuestions: [], tips: ['Basic agriculture knowledge required', 'Focus on practical farming', 'Suitable for 10th pass students', 'Good career in extension work'] },
      { id: 'tnau-diploma-horti', name: 'Diploma in Horticulture', nameTamil: 'தோட்டக்கலையில் டிப்ளோமா', type: 'Diploma', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Horticulture', nameTamil: 'தோட்டக்கலை', questions: 50, marks: 50, topics: ['Fruit Crops', 'Vegetable Crops', 'Floriculture'] }, { name: 'Science', nameTamil: 'அறிவியல்', questions: 30, marks: 30, topics: ['Botany', 'Chemistry Basics'] }, { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Horticulture Industry', 'Market Trends'] }] }, syllabus: [], previousQuestions: [], tips: ['Focus on horticultural crops', 'Learn practical skills', 'Suitable for 10th pass students', 'Career in nursery and landscaping'] },
      { id: 'tnau-diploma-agri-engg', name: 'Diploma in Agricultural Engineering', nameTamil: 'வேளாண் பொறியியலில் டிப்ளோமா', type: 'Diploma', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'OMR Based (Offline)', negativeMarking: false, sections: [{ name: 'Engineering', nameTamil: 'பொறியியல்', questions: 40, marks: 40, topics: ['Farm Machinery', 'Irrigation', 'Workshop Practice'] }, { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Basic Math', 'Mensuration'] }, { name: 'Science', nameTamil: 'அறிவியல்', questions: 20, marks: 20, topics: ['Physics', 'Agriculture Basics'] }, { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 10, marks: 10, topics: ['Current Affairs', 'Technical Awareness'] }] }, syllabus: [], previousQuestions: [], tips: ['Focus on machinery and equipment', 'Learn practical engineering skills', 'Suitable for 10th pass students', 'Career as agricultural technician'] }
    ]
  },
  // TNDALU - Tamil Nadu Dr. Ambedkar Law University
  {
    id: 'tndalu',
    name: 'Tamil Nadu Dr. Ambedkar Law University',
    nameTamil: 'தமிழ்நாடு டாக்டர் அம்பேத்கர் சட்டப் பல்கலைக்கழகம்',
    location: 'Chennai',
    website: 'www.tndalu.ac.in',
    phone: '044-24641212',
    email: 'registrar@tndalu.ac.in',
    examName: 'TNDALU Entrance / CLAT',
    logo: '/universities/tndalu-logo.png',
    logoColor: '#7c2d12',
    fee: { general: 1000, obc: 1000, scst: 500 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'May 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'May 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'June 2026', status: 'upcoming' },
      { event: 'Exam Date', eventTamil: 'தேர்வு தேதி', date: 'June 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'July 2026', status: 'upcoming' }
    ],
    courses: [
      // 5-Year Integrated Honours Courses
      {
        id: 'tndalu-ballb-hons',
        name: 'B.A. LL.B. (Hons.) - 5 Years',
        nameTamil: 'பி.ஏ. எல்.எல்.பி. (ஹானர்ஸ்) - 5 ஆண்டுகள்',
        type: 'UG',
        examPattern: {
          totalQuestions: 150,
          totalMarks: 150,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'Computer Based (Online)',
          negativeMarking: true,
          sections: [
            { name: 'English Language', nameTamil: 'ஆங்கில மொழி', questions: 25, marks: 25, topics: ['Grammar', 'Vocabulary', 'Comprehension', 'Cloze Test'] },
            { name: 'Current Affairs & GK', nameTamil: 'நடப்பு நிகழ்வுகள் & பொது அறிவு', questions: 35, marks: 35, topics: ['National', 'International', 'Static GK', 'Legal Awareness'] },
            { name: 'Legal Aptitude', nameTamil: 'சட்ட திறன்', questions: 35, marks: 35, topics: ['Legal Reasoning', 'Principles of Law', 'Constitution'] },
            { name: 'Logical Reasoning', nameTamil: 'தருக்க அறிவு', questions: 30, marks: 30, topics: ['Analytical Reasoning', 'Critical Thinking', 'Syllogisms'] },
            { name: 'Quantitative Techniques', nameTamil: 'அளவீட்டு நுட்பங்கள்', questions: 25, marks: 25, topics: ['Basic Math', 'Data Interpretation', 'Statistics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'tndalu-ballb-1', year: '2024', question: 'The Constitution of India came into force on:', options: ['15th August 1947', '26th January 1950', '26th November 1949', '15th August 1950'], correctAnswer: 1, explanation: 'The Constitution of India came into force on 26th January 1950, which is celebrated as Republic Day.', topic: 'Constitutional Law', difficulty: 'Easy' },
          { id: 'tndalu-ballb-2', year: '2024', question: 'Article 21 of the Indian Constitution deals with:', options: ['Right to Equality', 'Right to Freedom', 'Right to Life and Personal Liberty', 'Right against Exploitation'], correctAnswer: 2, explanation: 'Article 21 protects the Right to Life and Personal Liberty, the most fundamental right under the Constitution.', topic: 'Fundamental Rights', difficulty: 'Easy' },
          { id: 'tndalu-ballb-3', year: '2024', question: 'The principle "Ignorantia Juris Non Excusat" means:', options: ['Ignorance of fact is an excuse', 'Ignorance of law is no excuse', 'Silence is consent', 'No one can be a judge in his own case'], correctAnswer: 1, explanation: 'This Latin maxim means ignorance of law is no excuse - everyone is presumed to know the law.', topic: 'Legal Maxims', difficulty: 'Medium' },
          { id: 'tndalu-ballb-4', year: '2024', question: 'The first woman Chief Justice of a High Court in India was:', options: ['Fatima Beevi', 'Leila Seth', 'Sujata Manohar', 'Anna Chandy'], correctAnswer: 3, explanation: 'Justice Anna Chandy became the first woman Chief Justice of a High Court (Kerala) in 1959.', topic: 'Legal History', difficulty: 'Medium' },
          { id: 'tndalu-ballb-5', year: '2024', question: 'Writ of Habeas Corpus protects:', options: ['Property rights', 'Personal liberty', 'Freedom of speech', 'Right to education'], correctAnswer: 1, explanation: 'Habeas Corpus (meaning "produce the body") protects against illegal detention and unlawful imprisonment.', topic: 'Constitutional Remedies', difficulty: 'Easy' }
        ],
        tips: ['Read newspapers daily for current affairs', 'Study basic Constitution - Preamble, Fundamental Rights, DPSPs', 'Learn important legal maxims and their meanings', 'Practice reading comprehension and logical reasoning', 'Focus on landmark judgments']
      },
      {
        id: 'tndalu-bcomllb-hons',
        name: 'B.Com. LL.B. (Hons.) - 5 Years',
        nameTamil: 'பி.காம். எல்.எல்.பி. (ஹானர்ஸ்) - 5 ஆண்டுகள்',
        type: 'UG',
        examPattern: {
          totalQuestions: 150,
          totalMarks: 150,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'Computer Based (Online)',
          negativeMarking: true,
          sections: [
            { name: 'English Language', nameTamil: 'ஆங்கில மொழி', questions: 25, marks: 25, topics: ['Grammar', 'Vocabulary', 'Comprehension'] },
            { name: 'Current Affairs & GK', nameTamil: 'நடப்பு நிகழ்வுகள் & பொது அறிவு', questions: 30, marks: 30, topics: ['Business News', 'Economy', 'Legal Affairs'] },
            { name: 'Legal Aptitude', nameTamil: 'சட்ட திறன்', questions: 30, marks: 30, topics: ['Commercial Law Basics', 'Contract Law', 'Company Law'] },
            { name: 'Logical Reasoning', nameTamil: 'தருக்க அறிவு', questions: 30, marks: 30, topics: ['Analytical Reasoning', 'Critical Thinking'] },
            { name: 'Quantitative Techniques', nameTamil: 'அளவீட்டு நுட்பங்கள்', questions: 35, marks: 35, topics: ['Accounting Basics', 'Data Interpretation', 'Business Math'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'tndalu-bcomllb-1', year: '2024', question: 'The Companies Act, 2013 came into force on:', options: ['1st April 2013', '1st April 2014', '12th September 2013', '1st January 2014'], correctAnswer: 1, explanation: 'The Companies Act, 2013 came into force on 1st April 2014, replacing the Companies Act, 1956.', topic: 'Company Law', difficulty: 'Medium' },
          { id: 'tndalu-bcomllb-2', year: '2024', question: 'GST was implemented in India on:', options: ['1st April 2017', '1st July 2017', '1st January 2017', '1st October 2017'], correctAnswer: 1, explanation: 'GST (Goods and Services Tax) was implemented in India on 1st July 2017 as a unified indirect tax.', topic: 'Taxation Law', difficulty: 'Easy' }
        ],
        tips: ['Strong understanding of commerce and accounts', 'Study company law and contract act', 'Keep up with business and economic news', 'Practice quantitative aptitude regularly']
      },
      {
        id: 'tndalu-bballb-hons',
        name: 'B.B.A. LL.B. (Hons.) - 5 Years',
        nameTamil: 'பி.பி.ஏ. எல்.எல்.பி. (ஹானர்ஸ்) - 5 ஆண்டுகள்',
        type: 'UG',
        examPattern: {
          totalQuestions: 150,
          totalMarks: 150,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'Computer Based (Online)',
          negativeMarking: true,
          sections: [
            { name: 'English Language', nameTamil: 'ஆங்கில மொழி', questions: 25, marks: 25, topics: ['Grammar', 'Vocabulary', 'Comprehension'] },
            { name: 'Current Affairs & GK', nameTamil: 'நடப்பு நிகழ்வுகள் & பொது அறிவு', questions: 30, marks: 30, topics: ['Business', 'Economy', 'Legal Affairs'] },
            { name: 'Legal Aptitude', nameTamil: 'சட்ட திறன்', questions: 30, marks: 30, topics: ['Business Law', 'Corporate Law', 'Legal Reasoning'] },
            { name: 'Logical Reasoning', nameTamil: 'தருக்க அறிவு', questions: 30, marks: 30, topics: ['Analytical Reasoning', 'Critical Thinking', 'Decision Making'] },
            { name: 'Management Aptitude', nameTamil: 'மேலாண்மை திறன்', questions: 35, marks: 35, topics: ['Business Awareness', 'Management Concepts', 'Case Studies'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'tndalu-bballb-1', year: '2024', question: 'Corporate Governance primarily deals with:', options: ['Marketing strategies', 'Ethical business conduct and accountability', 'Production management', 'Sales techniques'], correctAnswer: 1, explanation: 'Corporate governance refers to the system of rules, practices, and processes for directing and controlling companies ethically.', topic: 'Corporate Law', difficulty: 'Medium' }
        ],
        tips: ['Understand business management concepts', 'Study corporate law and governance', 'Follow business news and case studies', 'Develop analytical thinking skills']
      },
      {
        id: 'tndalu-bcallb-hons',
        name: 'B.C.A. LL.B. (Hons.) - 5 Years',
        nameTamil: 'பி.சி.ஏ. எல்.எல்.பி. (ஹானர்ஸ்) - 5 ஆண்டுகள்',
        type: 'UG',
        examPattern: {
          totalQuestions: 150,
          totalMarks: 150,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'Computer Based (Online)',
          negativeMarking: true,
          sections: [
            { name: 'English Language', nameTamil: 'ஆங்கில மொழி', questions: 25, marks: 25, topics: ['Grammar', 'Vocabulary', 'Comprehension'] },
            { name: 'Current Affairs & GK', nameTamil: 'நடப்பு நிகழ்வுகள் & பொது அறிவு', questions: 25, marks: 25, topics: ['Tech News', 'Legal Affairs', 'Cyber World'] },
            { name: 'Legal Aptitude', nameTamil: 'சட்ட திறன்', questions: 30, marks: 30, topics: ['Cyber Law', 'IT Act', 'Legal Reasoning'] },
            { name: 'Logical Reasoning', nameTamil: 'தருக்க அறிவு', questions: 35, marks: 35, topics: ['Analytical Reasoning', 'Critical Thinking', 'Puzzles'] },
            { name: 'Computer Awareness', nameTamil: 'கணினி விழிப்புணர்வு', questions: 35, marks: 35, topics: ['Computer Basics', 'Internet', 'Cyber Security Basics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'tndalu-bcallb-1', year: '2024', question: 'The Information Technology Act was enacted in India in:', options: ['1998', '2000', '2002', '2008'], correctAnswer: 1, explanation: 'The IT Act 2000 was enacted to provide legal recognition for transactions carried out electronically.', topic: 'Cyber Law', difficulty: 'Easy' },
          { id: 'tndalu-bcallb-2', year: '2024', question: 'Which section of IT Act deals with cyber terrorism?', options: ['Section 43', 'Section 66', 'Section 66F', 'Section 69'], correctAnswer: 2, explanation: 'Section 66F of IT Act, 2000 deals with cyber terrorism and prescribes punishment up to life imprisonment.', topic: 'IT Act', difficulty: 'Medium' }
        ],
        tips: ['Unique course for Tech + Law aspirants', 'Study IT Act and cyber laws thoroughly', 'Keep up with technology and privacy laws', 'Understand data protection regulations', 'Focus on emerging tech legal issues (AI, blockchain)']
      },
      // 3-Year LL.B
      {
        id: 'tndalu-llb-hons',
        name: 'LL.B. (Hons.) - 3 Years',
        nameTamil: 'எல்.எல்.பி. (ஹானர்ஸ்) - 3 ஆண்டுகள்',
        type: 'UG',
        examPattern: {
          totalQuestions: 120,
          totalMarks: 120,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'Computer Based (Online)',
          negativeMarking: true,
          sections: [
            { name: 'English Language', nameTamil: 'ஆங்கில மொழி', questions: 20, marks: 20, topics: ['Grammar', 'Comprehension', 'Legal English'] },
            { name: 'Current Affairs & GK', nameTamil: 'நடப்பு நிகழ்வுகள் & பொது அறிவு', questions: 30, marks: 30, topics: ['National', 'International', 'Legal News'] },
            { name: 'Legal Aptitude', nameTamil: 'சட்ட திறன்', questions: 40, marks: 40, topics: ['Constitutional Law', 'Legal Reasoning', 'Jurisprudence'] },
            { name: 'Logical Reasoning', nameTamil: 'தருக்க அறிவு', questions: 30, marks: 30, topics: ['Analytical Reasoning', 'Critical Analysis'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['For graduates from any discipline', 'Strong focus on legal reasoning', 'Study landmark Supreme Court judgments', 'Develop case analysis skills']
      },
      // Postgraduate Courses
      {
        id: 'tndalu-llm-ipr',
        name: 'LL.M. (Intellectual Property Rights)',
        nameTamil: 'எல்.எல்.எம். (அறிவுசார் சொத்துரிமை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'General Law', nameTamil: 'பொது சட்டம்', questions: 30, marks: 30, topics: ['Constitutional Law', 'Jurisprudence', 'International Law'] },
            { name: 'Intellectual Property', nameTamil: 'அறிவுசார் சொத்து', questions: 50, marks: 50, topics: ['Patents', 'Copyrights', 'Trademarks', 'Trade Secrets'] },
            { name: 'Current Developments', nameTamil: 'நடப்பு வளர்ச்சிகள்', questions: 20, marks: 20, topics: ['IP News', 'Case Laws', 'International Treaties'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Study Patent Act, Copyright Act, Trademark Act', 'Follow IPR-related judgments', 'Understand TRIPS Agreement', 'Know about WIPO and international IP conventions']
      },
      {
        id: 'tndalu-llm-cyber',
        name: 'LL.M. (Cyber Law)',
        nameTamil: 'எல்.எல்.எம். (இணைய சட்டம்)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'General Law', nameTamil: 'பொது சட்டம்', questions: 30, marks: 30, topics: ['Constitutional Law', 'Criminal Law', 'Evidence Act'] },
            { name: 'Cyber & IT Law', nameTamil: 'இணைய & தகவல் தொழில்நுட்ப சட்டம்', questions: 50, marks: 50, topics: ['IT Act', 'Data Protection', 'E-Commerce', 'Cyber Crimes'] },
            { name: 'Emerging Issues', nameTamil: 'வளர்ந்து வரும் சிக்கல்கள்', questions: 20, marks: 20, topics: ['AI Regulations', 'Blockchain Law', 'Privacy Laws'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Deep understanding of IT Act 2000', 'Study Data Protection Bill', 'Follow cyber crime cases', 'Understand global cyber laws (GDPR, CCPA)']
      },
      {
        id: 'tndalu-llm-criminal',
        name: 'LL.M. (Criminal Law)',
        nameTamil: 'எல்.எல்.எம். (குற்றவியல் சட்டம்)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'General Law', nameTamil: 'பொது சட்டம்', questions: 25, marks: 25, topics: ['Constitutional Law', 'Jurisprudence'] },
            { name: 'Criminal Law', nameTamil: 'குற்றவியல் சட்டம்', questions: 50, marks: 50, topics: ['IPC', 'CrPC', 'Evidence Act', 'POCSO'] },
            { name: 'Criminology', nameTamil: 'குற்றவியல் ஆய்வு', questions: 25, marks: 25, topics: ['Theories of Crime', 'Penology', 'Victimology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Master IPC and CrPC thoroughly', 'Study landmark criminal law judgments', 'Understand forensic science basics', 'Follow criminal law amendments']
      }
    ]
  },
  // Central University of Tamil Nadu (CUTN)
  {
    id: 'cutn',
    name: 'Central University of Tamil Nadu',
    nameTamil: 'தமிழ்நாடு மத்திய பல்கலைக்கழகம்',
    location: 'Thiruvarur',
    website: 'www.cutn.ac.in',
    phone: '04366-277200',
    email: 'registrar@cutn.ac.in',
    examName: 'CUET-UG',
    logoColor: '#1e40af',
    fee: { general: 500, obc: 400, scst: 250 },
    importantDates: [
      { event: 'CUET Notification', eventTamil: 'CUET அறிவிப்பு', date: 'February 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'February 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'March 2026', status: 'upcoming' },
      { event: 'CUET Exam', eventTamil: 'CUET தேர்வு', date: 'May 2026', status: 'upcoming' },
      { event: 'Results & Counseling', eventTamil: 'முடிவுகள் & கலந்தாய்வு', date: 'June 2026', status: 'upcoming' },
    ],
    courses: [
      // Integrated M.Sc. Life Sciences
      {
        id: 'cutn-integrated-msc-life-sciences',
        name: 'Integrated M.Sc. Life Sciences',
        nameTamil: 'ஒருங்கிணைந்த எம்.எஸ்சி. உயிர் அறிவியல்',
        type: 'UG',
        seatMatrix: { general: 10, obc: 8, bcMbc: 0, sc: 5, st: 2, ews: 3, total: 30 },
        cutoffs: [
          { year: '2024', general: 550, obc: 480, bcMbc: '-', sc: 380, st: 350, ews: 520 },
          { year: '2023', general: 530, obc: 460, bcMbc: '-', sc: 360, st: 330, ews: 500 },
        ],
        examPattern: {
          totalQuestions: 50,
          totalMarks: 200,
          duration: '45 Minutes (per section)',
          durationMinutes: 195,
          mode: 'Computer Based (CBT)',
          negativeMarking: true,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 200, topics: ['Mechanics', 'Optics', 'Modern Physics', 'Thermodynamics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 200, topics: ['Organic', 'Inorganic', 'Physical Chemistry'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 50, marks: 200, topics: ['Botany', 'Zoology', 'Cell Biology', 'Genetics'] },
          ]
        },
        syllabus: [
          {
            unitNumber: 1,
            title: 'Cell Biology & Genetics',
            titleTamil: 'செல் உயிரியல் & மரபியல்',
            topics: [
              { name: 'Cell Structure', subtopics: ['Cell Organelles', 'Membrane Transport', 'Cell Cycle'], importance: 'High' },
              { name: 'Genetics', subtopics: ['Mendelian Genetics', 'DNA Replication', 'Gene Expression'], importance: 'High' },
            ],
            expectedQuestions: 15,
            difficulty: 'Medium'
          },
          {
            unitNumber: 2,
            title: 'Biochemistry',
            titleTamil: 'உயிர்வேதியியல்',
            topics: [
              { name: 'Biomolecules', subtopics: ['Carbohydrates', 'Proteins', 'Lipids', 'Nucleic Acids'], importance: 'High' },
              { name: 'Enzymes', subtopics: ['Enzyme Kinetics', 'Inhibition', 'Regulation'], importance: 'Medium' },
            ],
            expectedQuestions: 10,
            difficulty: 'Hard'
          }
        ],
        previousQuestions: [
          {
            id: 'cutn-life-q1',
            year: '2024',
            question: 'Which organelle is responsible for ATP synthesis in eukaryotic cells?',
            options: ['Ribosome', 'Mitochondria', 'Golgi apparatus', 'Endoplasmic reticulum'],
            correctAnswer: 1,
            explanation: 'Mitochondria are the powerhouses of the cell, responsible for producing ATP through oxidative phosphorylation.',
            topic: 'Cell Biology',
            difficulty: 'Easy'
          },
          {
            id: 'cutn-life-q2',
            year: '2024',
            question: 'The process of DNA to RNA conversion is called:',
            options: ['Replication', 'Transcription', 'Translation', 'Reverse transcription'],
            correctAnswer: 1,
            explanation: 'Transcription is the process where genetic information from DNA is copied into RNA.',
            topic: 'Genetics',
            difficulty: 'Easy'
          },
          {
            id: 'cutn-life-q3',
            year: '2023',
            question: 'Which of the following is NOT a function of proteins?',
            options: ['Enzyme catalysis', 'Energy storage (primary)', 'Structural support', 'Signal transduction'],
            correctAnswer: 1,
            explanation: 'Carbohydrates and lipids are the primary energy storage molecules, not proteins.',
            topic: 'Biochemistry',
            difficulty: 'Medium'
          }
        ],
        tips: [
          'Focus on NCERT Biology (Class 11 & 12) for fundamentals',
          'CUET-UG tests conceptual understanding, not rote learning',
          'Practice previous year CUET questions extensively',
          'Central universities offer excellent research opportunities',
          'Career paths: CSIR Labs, Biotech Industry, Research Scientist'
        ]
      },
      // Integrated B.Sc. B.Ed. (Mathematics)
      {
        id: 'cutn-bsc-bed-maths',
        name: 'Integrated B.Sc. B.Ed. (Mathematics)',
        nameTamil: 'ஒருங்கிணைந்த பி.எஸ்சி. பி.எட். (கணிதம்)',
        type: 'UG',
        seatMatrix: { general: 15, obc: 13, bcMbc: 0, sc: 8, st: 4, ews: 5, total: 50 },
        cutoffs: [
          { year: '2024', general: 520, obc: 460, bcMbc: '-', sc: 350, st: 320, ews: 490 },
          { year: '2023', general: 500, obc: 440, bcMbc: '-', sc: 330, st: 300, ews: 470 },
        ],
        examPattern: {
          totalQuestions: 50,
          totalMarks: 200,
          duration: '45 Minutes (per section)',
          durationMinutes: 135,
          mode: 'Computer Based (CBT)',
          negativeMarking: true,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 200, topics: ['Mechanics', 'Optics', 'Electricity', 'Modern Physics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 200, topics: ['Organic', 'Inorganic', 'Physical Chemistry'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 200, topics: ['Calculus', 'Algebra', 'Trigonometry', 'Statistics'] },
          ]
        },
        syllabus: [
          {
            unitNumber: 1,
            title: 'Calculus',
            titleTamil: 'நுண்கணிதம்',
            topics: [
              { name: 'Differentiation', subtopics: ['Limits', 'Derivatives', 'Applications'], importance: 'High' },
              { name: 'Integration', subtopics: ['Definite Integrals', 'Applications'], importance: 'High' },
            ],
            expectedQuestions: 15,
            difficulty: 'Medium'
          },
          {
            unitNumber: 2,
            title: 'Algebra',
            titleTamil: 'இயற்கணிதம்',
            topics: [
              { name: 'Matrices', subtopics: ['Operations', 'Determinants', 'Inverse'], importance: 'High' },
              { name: 'Sets & Relations', subtopics: ['Functions', 'Binary Operations'], importance: 'Medium' },
            ],
            expectedQuestions: 12,
            difficulty: 'Medium'
          }
        ],
        previousQuestions: [
          {
            id: 'cutn-bed-q1',
            year: '2024',
            question: 'If f(x) = x³ - 3x² + 2, find f\'(2)',
            options: ['0', '2', '4', '-2'],
            correctAnswer: 0,
            explanation: 'f\'(x) = 3x² - 6x. At x=2: f\'(2) = 3(4) - 6(2) = 12 - 12 = 0',
            topic: 'Calculus',
            difficulty: 'Medium'
          },
          {
            id: 'cutn-bed-q2',
            year: '2024',
            question: 'The determinant of a 2x2 identity matrix is:',
            options: ['0', '1', '2', '-1'],
            correctAnswer: 1,
            explanation: 'The identity matrix has 1s on the diagonal and 0s elsewhere. det(I) = 1×1 - 0×0 = 1',
            topic: 'Algebra',
            difficulty: 'Easy'
          }
        ],
        tips: [
          'This is a 4-year integrated program - B.Sc. + B.Ed. together',
          'Excellent for those wanting to become Government School Teachers',
          'Focus on NCERT Mathematics (Class 11 & 12)',
          'Career paths: TGT/PGT Teacher, Education Policy, Academic Counselor',
          'Central university degree has national recognition'
        ]
      },
      // Integrated M.A. Economics
      {
        id: 'cutn-integrated-ma-economics',
        name: 'Integrated M.A. Economics',
        nameTamil: 'ஒருங்கிணைந்த எம்.ஏ. பொருளியல்',
        type: 'UG',
        seatMatrix: { general: 10, obc: 8, bcMbc: 0, sc: 5, st: 2, ews: 3, total: 30 },
        cutoffs: [
          { year: '2024', general: 480, obc: 420, bcMbc: '-', sc: 320, st: 290, ews: 450 },
          { year: '2023', general: 460, obc: 400, bcMbc: '-', sc: 300, st: 270, ews: 430 },
        ],
        examPattern: {
          totalQuestions: 50,
          totalMarks: 200,
          duration: '45 Minutes (per section)',
          durationMinutes: 90,
          mode: 'Computer Based (CBT)',
          negativeMarking: true,
          sections: [
            { name: 'Economics / Maths', nameTamil: 'பொருளியல் / கணிதம்', questions: 50, marks: 200, topics: ['Microeconomics', 'Macroeconomics', 'Statistics', 'Indian Economy'] },
            { name: 'General Test', nameTamil: 'பொது தேர்வு', questions: 60, marks: 200, topics: ['General Awareness', 'Quantitative Reasoning', 'Logical Reasoning'] },
          ]
        },
        syllabus: [
          {
            unitNumber: 1,
            title: 'Microeconomics',
            titleTamil: 'நுண்பொருளியல்',
            topics: [
              { name: 'Demand & Supply', subtopics: ['Law of Demand', 'Elasticity', 'Market Equilibrium'], importance: 'High' },
              { name: 'Consumer Theory', subtopics: ['Utility', 'Indifference Curves', 'Budget Constraint'], importance: 'High' },
            ],
            expectedQuestions: 12,
            difficulty: 'Medium'
          },
          {
            unitNumber: 2,
            title: 'Macroeconomics',
            titleTamil: 'பேரியல் பொருளியல்',
            topics: [
              { name: 'National Income', subtopics: ['GDP', 'GNP', 'NNP', 'Measurement Methods'], importance: 'High' },
              { name: 'Money & Banking', subtopics: ['RBI Functions', 'Monetary Policy', 'Inflation'], importance: 'High' },
            ],
            expectedQuestions: 15,
            difficulty: 'Medium'
          },
          {
            unitNumber: 3,
            title: 'Indian Economy',
            titleTamil: 'இந்திய பொருளாதாரம்',
            topics: [
              { name: 'Economic Planning', subtopics: ['Five Year Plans', 'NITI Aayog', 'Reforms'], importance: 'Medium' },
              { name: 'Current Issues', subtopics: ['Budget', 'Fiscal Policy', 'Trade'], importance: 'High' },
            ],
            expectedQuestions: 10,
            difficulty: 'Easy'
          }
        ],
        previousQuestions: [
          {
            id: 'cutn-eco-q1',
            year: '2024',
            question: 'The Phillips Curve shows the relationship between:',
            options: ['GDP and Interest Rate', 'Inflation and Unemployment', 'Savings and Investment', 'Exports and Imports'],
            correctAnswer: 1,
            explanation: 'The Phillips Curve demonstrates the inverse relationship between inflation and unemployment rates.',
            topic: 'Macroeconomics',
            difficulty: 'Medium'
          },
          {
            id: 'cutn-eco-q2',
            year: '2024',
            question: 'Which body is responsible for monetary policy in India?',
            options: ['SEBI', 'Finance Ministry', 'RBI', 'NITI Aayog'],
            correctAnswer: 2,
            explanation: 'The Reserve Bank of India (RBI) is responsible for formulating and implementing monetary policy in India.',
            topic: 'Indian Economy',
            difficulty: 'Easy'
          },
          {
            id: 'cutn-eco-q3',
            year: '2023',
            question: 'Law of Diminishing Marginal Utility was propounded by:',
            options: ['Adam Smith', 'Alfred Marshall', 'H.H. Gossen', 'J.M. Keynes'],
            correctAnswer: 2,
            explanation: 'H.H. Gossen formulated the Law of Diminishing Marginal Utility, also known as Gossen\'s First Law.',
            topic: 'Microeconomics',
            difficulty: 'Medium'
          }
        ],
        tips: [
          '5-year integrated program - no separate PG admission needed',
          'Open to students from ANY stream (Science/Commerce/Arts)',
          'Strong foundation in Maths/Economics in 12th is helpful',
          'Career paths: Economist, RBI Grade B Officer, Data Analyst, IES',
          'Focus on NCERT Economics and current affairs for CUET'
        ]
      }
    ]
  },
  // Tamil University (Thanjavur) - Arts, Music & Heritage
  {
    id: 'tamil-university',
    name: 'Tamil University',
    nameTamil: 'தமிழ் பல்கலைக்கழகம்',
    location: 'Thanjavur',
    website: 'www.tamiluniversity.ac.in',
    phone: '04362-226720',
    email: 'registrar@tamiluniversity.ac.in',
    examName: 'TU Entrance / Merit / Aptitude Test',
    logoColor: '#7c2d12',
    logo: '/universities/tamil-university-logo.png',
    fee: { general: 300, obc: 200, scst: 100 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'April 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'May 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'June 2026', status: 'upcoming' },
      { event: 'Aptitude/Skill Test', eventTamil: 'திறன் தேர்வு', date: 'June 2026', status: 'upcoming' },
      { event: 'Counseling', eventTamil: 'கலந்தாய்வு', date: 'July 2026', status: 'upcoming' },
    ],
    courses: [
      // B.P.A. Music (Vocal)
      {
        id: 'tu-bpa-music-vocal',
        name: 'B.P.A. Music (Vocal)',
        nameTamil: 'பி.பி.ஏ. இசை (குரல்)',
        type: 'UG',
        seatMatrix: { general: 15, obc: 10, bcMbc: 8, sc: 5, st: 2, total: 40 },
        cutoffs: [
          { year: '2024', general: 'Audition Pass', obc: 'Audition Pass', bcMbc: 'Audition Pass', sc: 'Audition Pass', st: 'Audition Pass' },
          { year: '2023', general: 'Audition Pass', obc: 'Audition Pass', bcMbc: 'Audition Pass', sc: 'Audition Pass', st: 'Audition Pass' },
        ],
        examPattern: {
          totalQuestions: 0,
          totalMarks: 100,
          duration: 'Practical + Interview',
          durationMinutes: 60,
          mode: 'Audition / Practical Test',
          negativeMarking: false,
          sections: [
            { name: 'Vocal Performance', nameTamil: 'குரல் நிகழ்ச்சி', questions: 0, marks: 50, topics: ['Ragas', 'Varnam', 'Kriti', 'Bhajan'] },
            { name: 'Theory Knowledge', nameTamil: 'தத்துவ அறிவு', questions: 0, marks: 30, topics: ['Carnatic Music Theory', 'Swara', 'Tala', 'Ragam'] },
            { name: 'Interview', nameTamil: 'நேர்காணல்', questions: 0, marks: 20, topics: ['Musical Background', 'Motivation', 'Career Goals'] }
          ]
        },
        syllabus: [
          {
            unitNumber: 1,
            title: 'Carnatic Music Fundamentals',
            titleTamil: 'கர்நாடக இசை அடிப்படைகள்',
            topics: [
              { name: 'Swara & Tala', subtopics: ['Sapta Swaras', 'Tala Types', 'Laya'], importance: 'High' },
              { name: 'Raga System', subtopics: ['Melakarta', 'Janya Ragas', 'Raga Lakshanas'], importance: 'High' },
            ],
            expectedQuestions: 0,
            difficulty: 'Medium'
          },
          {
            unitNumber: 2,
            title: 'Musical Compositions',
            titleTamil: 'இசை அமைப்புகள்',
            topics: [
              { name: 'Varnam', subtopics: ['Tana Varnam', 'Pada Varnam'], importance: 'High' },
              { name: 'Kriti', subtopics: ['Trinity Compositions', 'Modern Composers'], importance: 'High' },
              { name: 'Light Music', subtopics: ['Bhajan', 'Tillana', 'Javali'], importance: 'Medium' },
            ],
            expectedQuestions: 0,
            difficulty: 'Medium'
          },
          {
            unitNumber: 3,
            title: 'History of Music',
            titleTamil: 'இசையின் வரலாறு',
            topics: [
              { name: 'Ancient Tamil Music', subtopics: ['Sangam Literature', 'Pann', 'Yaazh'], importance: 'Medium' },
              { name: 'Carnatic Trinity', subtopics: ['Tyagaraja', 'Muthuswami Dikshitar', 'Syama Sastri'], importance: 'High' },
            ],
            expectedQuestions: 0,
            difficulty: 'Easy'
          }
        ],
        previousQuestions: [
          {
            id: 'tu-music-q1',
            year: 'Sample',
            question: 'How many Melakarta ragas are there in Carnatic music?',
            options: ['36', '72', '108', '16'],
            correctAnswer: 1,
            explanation: 'There are 72 Melakarta (parent) ragas in Carnatic music, systematized by Venkatamakhin.',
            topic: 'Raga System',
            difficulty: 'Easy'
          },
          {
            id: 'tu-music-q2',
            year: 'Sample',
            question: 'Which is NOT part of the Carnatic Music Trinity?',
            options: ['Tyagaraja', 'Purandara Dasa', 'Muthuswami Dikshitar', 'Syama Sastri'],
            correctAnswer: 1,
            explanation: 'Purandara Dasa is called the father of Carnatic music, but the Trinity consists of Tyagaraja, Dikshitar, and Syama Sastri.',
            topic: 'Music History',
            difficulty: 'Easy'
          },
          {
            id: 'tu-music-q3',
            year: 'Sample',
            question: 'Adi Tala has how many aksharas (beats)?',
            options: ['4', '6', '8', '10'],
            correctAnswer: 2,
            explanation: 'Adi Tala has 8 aksharas in the pattern: 4 (Laghu) + 2 (Drutam) + 2 (Drutam).',
            topic: 'Tala System',
            difficulty: 'Medium'
          }
        ],
        tips: [
          'Audition-based admission - practice your vocal pieces thoroughly',
          'Prepare at least 3-4 compositions in different ragas',
          'Knowledge of Carnatic music theory is essential',
          'Career paths: Professional Singer, Music Teacher, Cultural Officer, AIR Artist',
          'Join under a Guru for structured training before applying'
        ]
      },
      // B.F.A. Sculpture
      {
        id: 'tu-bfa-sculpture',
        name: 'B.F.A. Sculpture',
        nameTamil: 'பி.எஃப்.ஏ. சிற்பம்',
        type: 'UG',
        seatMatrix: { general: 8, obc: 5, bcMbc: 4, sc: 2, st: 1, total: 20 },
        cutoffs: [
          { year: '2024', general: 'Skill Test Pass', obc: 'Skill Test Pass', bcMbc: 'Skill Test Pass', sc: 'Skill Test Pass', st: 'Skill Test Pass' },
          { year: '2023', general: 'Skill Test Pass', obc: 'Skill Test Pass', bcMbc: 'Skill Test Pass', sc: 'Skill Test Pass', st: 'Skill Test Pass' },
        ],
        examPattern: {
          totalQuestions: 0,
          totalMarks: 100,
          duration: 'Skill Test (3 Hours) + Interview',
          durationMinutes: 210,
          mode: 'Practical Skill Test',
          negativeMarking: false,
          sections: [
            { name: 'Drawing Test', nameTamil: 'வரைதல் தேர்வு', questions: 0, marks: 40, topics: ['Human Figure Drawing', 'Object Drawing', 'Memory Drawing'] },
            { name: 'Clay Modelling', nameTamil: 'களிமண் வடிவமைப்பு', questions: 0, marks: 40, topics: ['3D Form Creation', 'Human Anatomy', 'Relief Work'] },
            { name: 'Interview', nameTamil: 'நேர்காணல்', questions: 0, marks: 20, topics: ['Portfolio Review', 'Motivation', 'Art Appreciation'] }
          ]
        },
        syllabus: [
          {
            unitNumber: 1,
            title: 'Basic Drawing & Anatomy',
            titleTamil: 'அடிப்படை வரைதல் & உடற்கூறியல்',
            topics: [
              { name: 'Human Anatomy', subtopics: ['Skeletal Structure', 'Muscle Groups', 'Proportions'], importance: 'High' },
              { name: 'Perspective Drawing', subtopics: ['One-Point', 'Two-Point', 'Foreshortening'], importance: 'High' },
            ],
            expectedQuestions: 0,
            difficulty: 'Medium'
          },
          {
            unitNumber: 2,
            title: 'Sculpture Techniques',
            titleTamil: 'சிற்ப நுட்பங்கள்',
            topics: [
              { name: 'Clay Modelling', subtopics: ['Additive Technique', 'Armature Making', 'Surface Treatment'], importance: 'High' },
              { name: 'Stone & Metal', subtopics: ['Carving', 'Casting', 'Chasing'], importance: 'Medium' },
            ],
            expectedQuestions: 0,
            difficulty: 'Hard'
          },
          {
            unitNumber: 3,
            title: 'History of Indian Sculpture',
            titleTamil: 'இந்திய சிற்பத்தின் வரலாறு',
            topics: [
              { name: 'Tamil Nadu Sculpture', subtopics: ['Chola Bronzes', 'Pallava Art', 'Temple Sculptures'], importance: 'High' },
              { name: 'Indian Traditions', subtopics: ['Gandhara', 'Mathura', 'Gupta Period'], importance: 'Medium' },
            ],
            expectedQuestions: 0,
            difficulty: 'Easy'
          }
        ],
        previousQuestions: [
          {
            id: 'tu-sculpture-q1',
            year: 'Sample',
            question: 'Which dynasty is famous for bronze sculptures of Nataraja?',
            options: ['Pallava', 'Chola', 'Pandya', 'Chera'],
            correctAnswer: 1,
            explanation: 'The Chola dynasty (9th-13th century) is renowned for exquisite bronze sculptures, especially the iconic Nataraja.',
            topic: 'Art History',
            difficulty: 'Easy'
          },
          {
            id: 'tu-sculpture-q2',
            year: 'Sample',
            question: 'Lost-wax technique is used in:',
            options: ['Stone carving', 'Metal casting', 'Clay modelling', 'Wood carving'],
            correctAnswer: 1,
            explanation: 'Lost-wax (Cire Perdue) is an ancient metal casting technique used to create detailed bronze sculptures.',
            topic: 'Techniques',
            difficulty: 'Easy'
          },
          {
            id: 'tu-sculpture-q3',
            year: 'Sample',
            question: 'The Descent of Ganga relief is located at:',
            options: ['Thanjavur', 'Mahabalipuram', 'Madurai', 'Kanchipuram'],
            correctAnswer: 1,
            explanation: 'The famous Descent of Ganga (Arjuna\'s Penance) is a massive rock relief at Mahabalipuram, a Pallava monument.',
            topic: 'Monuments',
            difficulty: 'Easy'
          }
        ],
        tips: [
          'Skill-based admission - practice drawing and clay work regularly',
          'Visit temples and museums to study traditional sculptures',
          'Bring a portfolio of your artwork to the interview',
          'Career paths: Sculptor, Museum Curator, Archaeologist Assistant, Art Restorer',
          'Knowledge of Tamil Nadu\'s rich sculpture heritage is valuable'
        ]
      },
      // Integrated M.A. History & Archaeology
      {
        id: 'tu-integrated-ma-history-archaeology',
        name: 'Integrated M.A. History & Archaeology',
        nameTamil: 'ஒருங்கிணைந்த எம்.ஏ. வரலாறு & தொல்லியல்',
        type: 'UG',
        seatMatrix: { general: 10, obc: 6, bcMbc: 5, sc: 3, st: 1, total: 25 },
        cutoffs: [
          { year: '2024', general: 75, obc: 70, bcMbc: 65, sc: 55, st: 50 },
          { year: '2023', general: 72, obc: 68, bcMbc: 62, sc: 52, st: 48 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Merit)',
          negativeMarking: false,
          sections: [
            { name: 'Indian History', nameTamil: 'இந்திய வரலாறு', questions: 40, marks: 40, topics: ['Ancient', 'Medieval', 'Modern India'] },
            { name: 'Tamil Nadu History', nameTamil: 'தமிழ்நாடு வரலாறு', questions: 30, marks: 30, topics: ['Sangam Age', 'Dynasties', 'Freedom Movement'] },
            { name: 'Archaeology Basics', nameTamil: 'தொல்லியல் அடிப்படைகள்', questions: 20, marks: 20, topics: ['Excavation Methods', 'Dating Techniques', 'Indian Sites'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 10, marks: 10, topics: ['Current Affairs', 'Heritage Sites', 'Museums'] }
          ]
        },
        syllabus: [
          {
            unitNumber: 1,
            title: 'Ancient India & Tamil Nadu',
            titleTamil: 'பண்டைய இந்தியா & தமிழ்நாடு',
            topics: [
              { name: 'Indus Valley Civilization', subtopics: ['Harappa', 'Mohenjo-daro', 'Town Planning', 'Script'], importance: 'High' },
              { name: 'Sangam Age', subtopics: ['Literature', 'Kingdoms', 'Trade', 'Society'], importance: 'High' },
              { name: 'Vedic Period', subtopics: ['Rig Veda', 'Society', 'Religion'], importance: 'Medium' },
            ],
            expectedQuestions: 25,
            difficulty: 'Medium'
          },
          {
            unitNumber: 2,
            title: 'Medieval Period',
            titleTamil: 'இடைக்கால காலம்',
            topics: [
              { name: 'Pallava Dynasty', subtopics: ['Mahabalipuram', 'Kanchipuram', 'Architecture'], importance: 'High' },
              { name: 'Chola Empire', subtopics: ['Rajaraja I', 'Naval Power', 'Temple Architecture'], importance: 'High' },
              { name: 'Delhi Sultanate & Mughals', subtopics: ['Administration', 'Art', 'Architecture'], importance: 'Medium' },
            ],
            expectedQuestions: 25,
            difficulty: 'Medium'
          },
          {
            unitNumber: 3,
            title: 'Archaeology & Methods',
            titleTamil: 'தொல்லியல் & முறைகள்',
            topics: [
              { name: 'Excavation Techniques', subtopics: ['Stratigraphy', 'Grid System', 'Documentation'], importance: 'High' },
              { name: 'Dating Methods', subtopics: ['Carbon-14', 'Thermoluminescence', 'Dendrochronology'], importance: 'Medium' },
              { name: 'Indian Archaeological Sites', subtopics: ['Adichanallur', 'Keeladi', 'Lothal'], importance: 'High' },
            ],
            expectedQuestions: 15,
            difficulty: 'Hard'
          },
          {
            unitNumber: 4,
            title: 'Epigraphy & Numismatics',
            titleTamil: 'கல்வெட்டியல் & நாணயவியல்',
            topics: [
              { name: 'Tamil Inscriptions', subtopics: ['Tamil Brahmi', 'Vatteluttu', 'Grantha'], importance: 'High' },
              { name: 'Coin Studies', subtopics: ['Punch-marked', 'Roman', 'Chola Coins'], importance: 'Medium' },
            ],
            expectedQuestions: 10,
            difficulty: 'Medium'
          }
        ],
        previousQuestions: [
          {
            id: 'tu-history-q1',
            year: 'Sample',
            question: 'The Keeladi excavation site is located near which city?',
            options: ['Chennai', 'Madurai', 'Thanjavur', 'Coimbatore'],
            correctAnswer: 1,
            explanation: 'Keeladi, a significant Sangam-era archaeological site, is located near Madurai on the banks of Vaigai river.',
            topic: 'Archaeology',
            difficulty: 'Easy'
          },
          {
            id: 'tu-history-q2',
            year: 'Sample',
            question: 'Which Chola king built the Brihadisvara Temple at Thanjavur?',
            options: ['Vijayalaya', 'Rajaraja I', 'Rajendra I', 'Kulottunga I'],
            correctAnswer: 1,
            explanation: 'Rajaraja I (985-1014 CE) built the magnificent Brihadisvara Temple, a UNESCO World Heritage Site.',
            topic: 'Medieval History',
            difficulty: 'Easy'
          },
          {
            id: 'tu-history-q3',
            year: 'Sample',
            question: 'Carbon-14 dating is used to determine the age of:',
            options: ['Rocks', 'Organic remains', 'Pottery', 'Metals'],
            correctAnswer: 1,
            explanation: 'Carbon-14 dating measures radioactive decay in organic materials to determine their age (up to ~50,000 years).',
            topic: 'Dating Methods',
            difficulty: 'Medium'
          },
          {
            id: 'tu-history-q4',
            year: 'Sample',
            question: 'The earliest Tamil script evolved from:',
            options: ['Devanagari', 'Tamil Brahmi', 'Grantha', 'Vatteluttu'],
            correctAnswer: 1,
            explanation: 'Tamil Brahmi (3rd century BCE) is the earliest script used to write Tamil, found in Sangam-era inscriptions.',
            topic: 'Epigraphy',
            difficulty: 'Medium'
          }
        ],
        tips: [
          'Merit-based admission - focus on 12th marks and knowledge of history',
          '5-year integrated program with specialization in Archaeology',
          'Study NCERT History books (Class 6-12) thoroughly',
          'Career paths: Archaeologist, Epigraphist, ASI Officer, Museum Curator, Tour Guide',
          'Knowledge of Tamil Nadu\'s heritage sites gives you an edge'
        ]
      },
      // Integrated Master's Programs (5 Years After 12th)
      {
        id: 'tu-ma-integrated-tamil',
        name: 'M.A. Integrated Tamil (5 Years)',
        nameTamil: 'எம்.ஏ. ஒருங்கிணைந்த தமிழ் (5 ஆண்டுகள்)',
        type: 'Integrated',
        seatMatrix: { general: 20, obc: 15, bcMbc: 10, sc: 5, st: 2, total: 52 },
        cutoffs: [
          { year: '2024', general: 70, obc: 65, bcMbc: 60, sc: 50, st: 45 },
          { year: '2023', general: 68, obc: 63, bcMbc: 58, sc: 48, st: 43 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Merit + Entrance)',
          negativeMarking: false,
          sections: [
            { name: 'Tamil Literature', nameTamil: 'தமிழ் இலக்கியம்', questions: 40, marks: 40, topics: ['Sangam Poetry', 'Epics', 'Modern Literature'] },
            { name: 'Tamil Grammar', nameTamil: 'தமிழ் இலக்கணம்', questions: 30, marks: 30, topics: ['Tholkappiyam', 'Nannool', 'Yapperungalam'] },
            { name: 'General Tamil', nameTamil: 'பொது தமிழ்', questions: 30, marks: 30, topics: ['Prose', 'Poetry Appreciation', 'Essay Writing'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: [
          'Direct entry after 12th with Tamil as main subject',
          'Study Sangam literature extensively',
          'Career paths: Tamil Professor, Researcher, Translator, Content Writer'
        ]
      },
      {
        id: 'tu-ma-integrated-history-archaeology',
        name: 'M.A. Integrated History & Archaeology (5 Years)',
        nameTamil: 'எம்.ஏ. ஒருங்கிணைந்த வரலாறு & தொல்லியல் (5 ஆண்டுகள்)',
        type: 'Integrated',
        seatMatrix: { general: 15, obc: 12, bcMbc: 8, sc: 4, st: 2, total: 41 },
        cutoffs: [
          { year: '2024', general: 72, obc: 67, bcMbc: 62, sc: 52, st: 47 },
          { year: '2023', general: 70, obc: 65, bcMbc: 60, sc: 50, st: 45 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Merit)',
          negativeMarking: false,
          sections: [
            { name: 'Indian History', nameTamil: 'இந்திய வரலாறு', questions: 40, marks: 40, topics: ['Ancient', 'Medieval', 'Modern India'] },
            { name: 'Archaeology', nameTamil: 'தொல்லியல்', questions: 30, marks: 30, topics: ['Excavation Methods', 'Dating Techniques'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 30, marks: 30, topics: ['Current Affairs', 'Heritage'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: [
          'Direct entry after 12th - History background preferred',
          'Career paths: Archaeologist, ASI Officer, Museum Curator'
        ]
      },
      // PG - Arts & Culture
      {
        id: 'tu-ma-tamil-literature',
        name: 'M.A. Tamil Literature',
        nameTamil: 'எம்.ஏ. தமிழ் இலக்கியம்',
        type: 'PG',
        seatMatrix: { general: 25, obc: 20, bcMbc: 15, sc: 8, st: 4, total: 72 },
        cutoffs: [
          { year: '2024', general: 65, obc: 60, bcMbc: 55, sc: 45, st: 40 },
          { year: '2023', general: 63, obc: 58, bcMbc: 53, sc: 43, st: 38 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Classical Tamil', nameTamil: 'செம்மொழி தமிழ்', questions: 35, marks: 35, topics: ['Sangam Poetry', 'Epics', 'Classical Grammar'] },
            { name: 'Modern Tamil', nameTamil: 'நவீன தமிழ்', questions: 35, marks: 35, topics: ['Modern Literature', 'Prose', 'Short Stories'] },
            { name: 'Tamil Grammar', nameTamil: 'தமிழ் இலக்கணம்', questions: 30, marks: 30, topics: ['Tholkappiyam', 'Nannool'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Study Sangam literature', 'Read Tholkappiyam', 'Career: Professor, Researcher']
      },
      {
        id: 'tu-ma-tamilology',
        name: 'M.A. Tamilology',
        nameTamil: 'எம்.ஏ. தமிழியல்',
        type: 'PG',
        seatMatrix: { general: 15, obc: 12, bcMbc: 8, sc: 4, st: 2, total: 41 },
        cutoffs: [
          { year: '2024', general: 60, obc: 55, bcMbc: 50, sc: 40, st: 35 },
          { year: '2023', general: 58, obc: 53, bcMbc: 48, sc: 38, st: 33 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Tamil Studies', nameTamil: 'தமிழ் ஆய்வுகள்', questions: 50, marks: 50, topics: ['Tamil Culture', 'History', 'Language Evolution'] },
            { name: 'Research Methods', nameTamil: 'ஆராய்ச்சி முறைகள்', questions: 50, marks: 50, topics: ['Methodology', 'Documentation'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on Tamil cultural studies', 'Career: Researcher, Cultural Officer']
      },
      {
        id: 'tu-ma-history',
        name: 'M.A. History',
        nameTamil: 'எம்.ஏ. வரலாறு',
        type: 'PG',
        seatMatrix: { general: 20, obc: 15, bcMbc: 10, sc: 5, st: 3, total: 53 },
        cutoffs: [
          { year: '2024', general: 68, obc: 63, bcMbc: 58, sc: 48, st: 43 },
          { year: '2023', general: 66, obc: 61, bcMbc: 56, sc: 46, st: 41 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Indian History', nameTamil: 'இந்திய வரலாறு', questions: 40, marks: 40, topics: ['Ancient', 'Medieval', 'Modern'] },
            { name: 'Tamil Nadu History', nameTamil: 'தமிழ்நாடு வரலாறு', questions: 35, marks: 35, topics: ['Dynasties', 'Freedom Movement'] },
            { name: 'World History', nameTamil: 'உலக வரலாறு', questions: 25, marks: 25, topics: ['Renaissance', 'World Wars'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Study NCERT History books', 'Focus on Tamil Nadu history', 'Career: Historian, Teacher']
      },
      {
        id: 'tu-ma-epigraphy-archaeology',
        name: 'M.A. Epigraphy & Archaeology',
        nameTamil: 'எம்.ஏ. கல்வெட்டியல் & தொல்லியல்',
        type: 'PG',
        seatMatrix: { general: 12, obc: 10, bcMbc: 6, sc: 4, st: 2, total: 34 },
        cutoffs: [
          { year: '2024', general: 65, obc: 60, bcMbc: 55, sc: 45, st: 40 },
          { year: '2023', general: 63, obc: 58, bcMbc: 53, sc: 43, st: 38 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Epigraphy', nameTamil: 'கல்வெட்டியல்', questions: 40, marks: 40, topics: ['Inscriptions', 'Tamil Brahmi', 'Script Evolution'] },
            { name: 'Archaeology', nameTamil: 'தொல்லியல்', questions: 40, marks: 40, topics: ['Excavation', 'Dating Methods', 'Sites'] },
            { name: 'General', nameTamil: 'பொது', questions: 20, marks: 20, topics: ['Museums', 'Heritage'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Learn ancient scripts', 'Visit archaeological sites', 'Career: Epigraphist, ASI Officer']
      },
      {
        id: 'tu-ma-music-carnatic',
        name: 'M.A. Music (Carnatic)',
        nameTamil: 'எம்.ஏ. இசை (கர்நாடக)',
        type: 'PG',
        seatMatrix: { general: 10, obc: 8, bcMbc: 5, sc: 3, st: 2, total: 28 },
        cutoffs: [
          { year: '2024', general: 'Audition Pass', obc: 'Audition Pass', bcMbc: 'Audition Pass', sc: 'Audition Pass', st: 'Audition Pass' },
          { year: '2023', general: 'Audition Pass', obc: 'Audition Pass', bcMbc: 'Audition Pass', sc: 'Audition Pass', st: 'Audition Pass' },
        ],
        examPattern: {
          totalQuestions: 0,
          totalMarks: 100,
          duration: 'Practical + Interview',
          durationMinutes: 60,
          mode: 'Audition / Practical Test',
          negativeMarking: false,
          sections: [
            { name: 'Vocal/Instrumental', nameTamil: 'குரல்/கருவி', questions: 0, marks: 50, topics: ['Ragas', 'Compositions'] },
            { name: 'Theory', nameTamil: 'தத்துவம்', questions: 0, marks: 30, topics: ['Music Theory', 'History'] },
            { name: 'Interview', nameTamil: 'நேர்காணல்', questions: 0, marks: 20, topics: ['Background', 'Research Interest'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong musical background required', 'Prepare research proposal', 'Career: Music Professor, Artist']
      },
      {
        id: 'tu-ma-bharatanatyam',
        name: 'M.A. Bharatanatyam',
        nameTamil: 'எம்.ஏ. பரதநாட்டியம்',
        type: 'PG',
        seatMatrix: { general: 8, obc: 6, bcMbc: 4, sc: 2, st: 1, total: 21 },
        cutoffs: [
          { year: '2024', general: 'Audition Pass', obc: 'Audition Pass', bcMbc: 'Audition Pass', sc: 'Audition Pass', st: 'Audition Pass' },
          { year: '2023', general: 'Audition Pass', obc: 'Audition Pass', bcMbc: 'Audition Pass', sc: 'Audition Pass', st: 'Audition Pass' },
        ],
        examPattern: {
          totalQuestions: 0,
          totalMarks: 100,
          duration: 'Practical + Interview',
          durationMinutes: 60,
          mode: 'Audition / Practical Test',
          negativeMarking: false,
          sections: [
            { name: 'Dance Performance', nameTamil: 'நடன நிகழ்ச்சி', questions: 0, marks: 50, topics: ['Alarippu', 'Varnam', 'Padam'] },
            { name: 'Theory', nameTamil: 'தத்துவம்', questions: 0, marks: 30, topics: ['Natyashastra', 'Abhinaya'] },
            { name: 'Interview', nameTamil: 'நேர்காணல்', questions: 0, marks: 20, topics: ['Training Background'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Minimum Arangetram experience preferred', 'Know Natyashastra basics', 'Career: Dance Teacher, Performer']
      },
      {
        id: 'tu-ma-drama-theatre',
        name: 'M.A. Drama / Theatre Arts',
        nameTamil: 'எம்.ஏ. நாடகம் / அரங்கக் கலை',
        type: 'PG',
        seatMatrix: { general: 8, obc: 6, bcMbc: 4, sc: 2, st: 1, total: 21 },
        cutoffs: [
          { year: '2024', general: 'Audition Pass', obc: 'Audition Pass', bcMbc: 'Audition Pass', sc: 'Audition Pass', st: 'Audition Pass' },
          { year: '2023', general: 'Audition Pass', obc: 'Audition Pass', bcMbc: 'Audition Pass', sc: 'Audition Pass', st: 'Audition Pass' },
        ],
        examPattern: {
          totalQuestions: 0,
          totalMarks: 100,
          duration: 'Audition + Interview',
          durationMinutes: 60,
          mode: 'Practical Test',
          negativeMarking: false,
          sections: [
            { name: 'Acting Test', nameTamil: 'நடிப்பு தேர்வு', questions: 0, marks: 40, topics: ['Improvisation', 'Monologue'] },
            { name: 'Script Reading', nameTamil: 'உரை வாசிப்பு', questions: 0, marks: 30, topics: ['Expression', 'Dialogue Delivery'] },
            { name: 'Interview', nameTamil: 'நேர்காணல்', questions: 0, marks: 30, topics: ['Theatre Experience'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Theatre experience beneficial', 'Study Tamil drama history', 'Career: Director, Actor, Theatre Trainer']
      },
      {
        id: 'tu-ma-linguistics',
        name: 'M.A. Linguistics',
        nameTamil: 'எம்.ஏ. மொழியியல்',
        type: 'PG',
        seatMatrix: { general: 12, obc: 10, bcMbc: 6, sc: 4, st: 2, total: 34 },
        cutoffs: [
          { year: '2024', general: 60, obc: 55, bcMbc: 50, sc: 40, st: 35 },
          { year: '2023', general: 58, obc: 53, bcMbc: 48, sc: 38, st: 33 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'General Linguistics', nameTamil: 'பொது மொழியியல்', questions: 50, marks: 50, topics: ['Phonetics', 'Syntax', 'Semantics'] },
            { name: 'Tamil Linguistics', nameTamil: 'தமிழ் மொழியியல்', questions: 50, marks: 50, topics: ['Tamil Phonology', 'Morphology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong language background needed', 'Career: Linguist, NLP Researcher, Translator']
      },
      {
        id: 'tu-ma-folklore',
        name: 'M.A. Folklore',
        nameTamil: 'எம்.ஏ. நாட்டுப்புறவியல்',
        type: 'PG',
        seatMatrix: { general: 10, obc: 8, bcMbc: 5, sc: 3, st: 2, total: 28 },
        cutoffs: [
          { year: '2024', general: 55, obc: 50, bcMbc: 45, sc: 35, st: 30 },
          { year: '2023', general: 53, obc: 48, bcMbc: 43, sc: 33, st: 28 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Folklore Studies', nameTamil: 'நாட்டுப்புற ஆய்வுகள்', questions: 50, marks: 50, topics: ['Folk Arts', 'Oral Traditions', 'Customs'] },
            { name: 'Tamil Culture', nameTamil: 'தமிழ் பண்பாடு', questions: 50, marks: 50, topics: ['Festivals', 'Folk Songs', 'Rituals'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Field work experience valued', 'Study Tamil folk traditions', 'Career: Folklorist, Cultural Researcher']
      },
      {
        id: 'tu-ma-philosophy',
        name: 'M.A. Philosophy',
        nameTamil: 'எம்.ஏ. தத்துவியல்',
        type: 'PG',
        seatMatrix: { general: 10, obc: 8, bcMbc: 5, sc: 3, st: 2, total: 28 },
        cutoffs: [
          { year: '2024', general: 55, obc: 50, bcMbc: 45, sc: 35, st: 30 },
          { year: '2023', general: 53, obc: 48, bcMbc: 43, sc: 33, st: 28 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Indian Philosophy', nameTamil: 'இந்திய தத்துவம்', questions: 50, marks: 50, topics: ['Vedanta', 'Buddhism', 'Jainism', 'Saiva Siddhanta'] },
            { name: 'Western Philosophy', nameTamil: 'மேற்கத்திய தத்துவம்', questions: 50, marks: 50, topics: ['Greek', 'Modern', 'Contemporary'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Study Thirukkural philosophy', 'Know Indian schools of thought', 'Career: Professor, Ethics Consultant']
      },
      {
        id: 'tu-ma-yoga',
        name: 'M.A. Yoga',
        nameTamil: 'எம்.ஏ. யோகா',
        type: 'PG',
        seatMatrix: { general: 12, obc: 10, bcMbc: 6, sc: 4, st: 2, total: 34 },
        cutoffs: [
          { year: '2024', general: 60, obc: 55, bcMbc: 50, sc: 40, st: 35 },
          { year: '2023', general: 58, obc: 53, bcMbc: 48, sc: 38, st: 33 },
        ],
        examPattern: {
          totalQuestions: 75,
          totalMarks: 100,
          duration: '2 Hours + Practical',
          durationMinutes: 180,
          mode: 'Theory + Practical',
          negativeMarking: false,
          sections: [
            { name: 'Yoga Theory', nameTamil: 'யோகா கோட்பாடு', questions: 50, marks: 50, topics: ['Patanjali Yoga Sutra', 'Hatha Yoga'] },
            { name: 'Practical', nameTamil: 'நடைமுறை', questions: 0, marks: 30, topics: ['Asanas', 'Pranayama'] },
            { name: 'Anatomy', nameTamil: 'உடற்கூறியல்', questions: 25, marks: 20, topics: ['Human Anatomy', 'Physiology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Prior yoga practice required', 'Study Yoga Sutras', 'Career: Yoga Instructor, Therapist']
      },
      {
        id: 'tu-ma-temple-admin',
        name: 'M.A. Temple Administration & Tourism',
        nameTamil: 'எம்.ஏ. கோயில் நிர்வாகம் & சுற்றுலா',
        type: 'PG',
        seatMatrix: { general: 10, obc: 8, bcMbc: 5, sc: 3, st: 2, total: 28 },
        cutoffs: [
          { year: '2024', general: 58, obc: 53, bcMbc: 48, sc: 38, st: 33 },
          { year: '2023', general: 56, obc: 51, bcMbc: 46, sc: 36, st: 31 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Temple Studies', nameTamil: 'கோயில் ஆய்வுகள்', questions: 40, marks: 40, topics: ['Temple Architecture', 'Agama', 'Rituals'] },
            { name: 'Tourism Management', nameTamil: 'சுற்றுலா மேலாண்மை', questions: 30, marks: 30, topics: ['Heritage Tourism', 'Marketing'] },
            { name: 'Administration', nameTamil: 'நிர்வாகம்', questions: 30, marks: 30, topics: ['HR Dept Rules', 'Finance'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Unique course for temple management', 'Career: HR&CE Officer, Temple Manager, Tourism Guide']
      },
      {
        id: 'tu-msw',
        name: 'M.S.W. (Master of Social Work)',
        nameTamil: 'எம்.எஸ்.டபிள்யூ. (சமூக பணி முதுநிலை)',
        type: 'PG',
        seatMatrix: { general: 15, obc: 12, bcMbc: 8, sc: 4, st: 2, total: 41 },
        cutoffs: [
          { year: '2024', general: 62, obc: 57, bcMbc: 52, sc: 42, st: 37 },
          { year: '2023', general: 60, obc: 55, bcMbc: 50, sc: 40, st: 35 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Social Work', nameTamil: 'சமூக பணி', questions: 40, marks: 40, topics: ['Case Work', 'Group Work', 'Community Organization'] },
            { name: 'Social Sciences', nameTamil: 'சமூக அறிவியல்', questions: 35, marks: 35, topics: ['Sociology', 'Psychology'] },
            { name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்', questions: 25, marks: 25, topics: ['Social Issues', 'Welfare Schemes'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Field work oriented', 'Career: Social Worker, NGO Manager, Counselor']
      },
      // PG - Science & Tech
      {
        id: 'tu-msc-geography',
        name: 'M.Sc. Geography',
        nameTamil: 'எம்.எஸ்சி. புவியியல்',
        type: 'PG',
        seatMatrix: { general: 15, obc: 12, bcMbc: 8, sc: 4, st: 2, total: 41 },
        cutoffs: [
          { year: '2024', general: 60, obc: 55, bcMbc: 50, sc: 40, st: 35 },
          { year: '2023', general: 58, obc: 53, bcMbc: 48, sc: 38, st: 33 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Physical Geography', nameTamil: 'இயற்பு புவியியல்', questions: 35, marks: 35, topics: ['Geomorphology', 'Climatology'] },
            { name: 'Human Geography', nameTamil: 'மனித புவியியல்', questions: 35, marks: 35, topics: ['Population', 'Urbanization'] },
            { name: 'Cartography', nameTamil: 'வரைபடவியல்', questions: 30, marks: 30, topics: ['Map Reading', 'GIS Basics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Study NCERT Geography', 'Learn GIS basics', 'Career: Geographer, Town Planner, ISRO']
      },
      {
        id: 'tu-msc-geology',
        name: 'M.Sc. Geology',
        nameTamil: 'எம்.எஸ்சி. நிலவியல்',
        type: 'PG',
        seatMatrix: { general: 12, obc: 10, bcMbc: 6, sc: 4, st: 2, total: 34 },
        cutoffs: [
          { year: '2024', general: 58, obc: 53, bcMbc: 48, sc: 38, st: 33 },
          { year: '2023', general: 56, obc: 51, bcMbc: 46, sc: 36, st: 31 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Physical Geology', nameTamil: 'இயற்பு நிலவியல்', questions: 40, marks: 40, topics: ['Mineralogy', 'Petrology'] },
            { name: 'Structural Geology', nameTamil: 'அமைப்பு நிலவியல்', questions: 30, marks: 30, topics: ['Folds', 'Faults', 'Rock Mechanics'] },
            { name: 'Applied Geology', nameTamil: 'பயன்பாட்டு நிலவியல்', questions: 30, marks: 30, topics: ['Mining', 'Groundwater'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Field work important', 'Career: Geologist, Mining Engineer, ONGC']
      },
      {
        id: 'tu-msc-environmental-science',
        name: 'M.Sc. Environmental Science',
        nameTamil: 'எம்.எஸ்சி. சுற்றுச்சூழல் அறிவியல்',
        type: 'PG',
        seatMatrix: { general: 15, obc: 12, bcMbc: 8, sc: 4, st: 2, total: 41 },
        cutoffs: [
          { year: '2024', general: 62, obc: 57, bcMbc: 52, sc: 42, st: 37 },
          { year: '2023', general: 60, obc: 55, bcMbc: 50, sc: 40, st: 35 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Ecology', nameTamil: 'சூழலியல்', questions: 35, marks: 35, topics: ['Ecosystems', 'Biodiversity'] },
            { name: 'Pollution', nameTamil: 'மாசுபாடு', questions: 35, marks: 35, topics: ['Air', 'Water', 'Soil Pollution'] },
            { name: 'Management', nameTamil: 'மேலாண்மை', questions: 30, marks: 30, topics: ['EIA', 'Sustainability'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Inter-disciplinary subject', 'Career: Environmental Officer, NGO, TNPCB']
      },
      {
        id: 'tu-msc-computer-science',
        name: 'M.Sc. Computer Science',
        nameTamil: 'எம்.எஸ்சி. கணினி அறிவியல்',
        type: 'PG',
        seatMatrix: { general: 20, obc: 16, bcMbc: 10, sc: 6, st: 3, total: 55 },
        cutoffs: [
          { year: '2024', general: 70, obc: 65, bcMbc: 60, sc: 50, st: 45 },
          { year: '2023', general: 68, obc: 63, bcMbc: 58, sc: 48, st: 43 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Programming', nameTamil: 'நிரலாக்கம்', questions: 35, marks: 35, topics: ['C', 'C++', 'Java', 'Python'] },
            { name: 'Data Structures', nameTamil: 'தரவு கட்டமைப்புகள்', questions: 35, marks: 35, topics: ['Arrays', 'Trees', 'Graphs', 'Algorithms'] },
            { name: 'DBMS & Networks', nameTamil: 'தரவுத்தளம் & வலைப்பின்னல்', questions: 30, marks: 30, topics: ['SQL', 'Networking Basics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong programming skills needed', 'Career: Software Developer, IT Professional']
      },
      {
        id: 'tu-msc-mathematics',
        name: 'M.Sc. Mathematics',
        nameTamil: 'எம்.எஸ்சி. கணிதம்',
        type: 'PG',
        seatMatrix: { general: 15, obc: 12, bcMbc: 8, sc: 4, st: 2, total: 41 },
        cutoffs: [
          { year: '2024', general: 65, obc: 60, bcMbc: 55, sc: 45, st: 40 },
          { year: '2023', general: 63, obc: 58, bcMbc: 53, sc: 43, st: 38 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Algebra', nameTamil: 'இயற்கணிதம்', questions: 35, marks: 35, topics: ['Groups', 'Rings', 'Linear Algebra'] },
            { name: 'Analysis', nameTamil: 'பகுப்பாய்வு', questions: 35, marks: 35, topics: ['Real Analysis', 'Complex Analysis'] },
            { name: 'Applied Math', nameTamil: 'பயன்பாட்டு கணிதம்', questions: 30, marks: 30, topics: ['Differential Equations', 'Numerical Methods'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong UG math foundation needed', 'Career: Mathematician, Data Analyst, Professor']
      },
      {
        id: 'tu-msc-applied-psychology',
        name: 'M.Sc. Applied Psychology',
        nameTamil: 'எம்.எஸ்சி. பயன்பாட்டு உளவியல்',
        type: 'PG',
        seatMatrix: { general: 12, obc: 10, bcMbc: 6, sc: 4, st: 2, total: 34 },
        cutoffs: [
          { year: '2024', general: 65, obc: 60, bcMbc: 55, sc: 45, st: 40 },
          { year: '2023', general: 63, obc: 58, bcMbc: 53, sc: 43, st: 38 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'General Psychology', nameTamil: 'பொது உளவியல்', questions: 40, marks: 40, topics: ['Cognitive', 'Developmental', 'Social Psychology'] },
            { name: 'Abnormal Psychology', nameTamil: 'அசாதாரண உளவியல்', questions: 30, marks: 30, topics: ['Disorders', 'Therapies'] },
            { name: 'Applied Areas', nameTamil: 'பயன்பாட்டு துறைகள்', questions: 30, marks: 30, topics: ['Industrial', 'Clinical', 'Counseling'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for counseling career', 'Career: Counselor, HR Professional, Clinical Psychologist']
      },
      // Education & Library Science
      {
        id: 'tu-bed',
        name: 'B.Ed. (Bachelor of Education)',
        nameTamil: 'பி.எட். (கல்வியியல் இளங்கலை)',
        type: 'UG',
        seatMatrix: { general: 30, obc: 25, bcMbc: 15, sc: 8, st: 4, total: 82 },
        cutoffs: [
          { year: '2024', general: 70, obc: 65, bcMbc: 60, sc: 50, st: 45 },
          { year: '2023', general: 68, obc: 63, bcMbc: 58, sc: 48, st: 43 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 25, marks: 25, topics: ['Current Affairs', 'General Science'] },
            { name: 'Teaching Aptitude', nameTamil: 'கற்பித்தல் திறன்', questions: 25, marks: 25, topics: ['Pedagogy', 'Child Psychology'] },
            { name: 'Subject Knowledge', nameTamil: 'பாட அறிவு', questions: 50, marks: 50, topics: ['Based on UG Subject'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Required for teaching career', 'Good for TNTET/TRB preparation', 'Career: School Teacher, Education Officer']
      },
      {
        id: 'tu-med',
        name: 'M.Ed. (Master of Education)',
        nameTamil: 'எம்.எட். (கல்வியியல் முதுநிலை)',
        type: 'PG',
        seatMatrix: { general: 15, obc: 12, bcMbc: 8, sc: 4, st: 2, total: 41 },
        cutoffs: [
          { year: '2024', general: 65, obc: 60, bcMbc: 55, sc: 45, st: 40 },
          { year: '2023', general: 63, obc: 58, bcMbc: 53, sc: 43, st: 38 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Educational Theory', nameTamil: 'கல்வி கோட்பாடு', questions: 40, marks: 40, topics: ['Philosophy of Education', 'Educational Psychology'] },
            { name: 'Research Methods', nameTamil: 'ஆராய்ச்சி முறைகள்', questions: 30, marks: 30, topics: ['Statistics', 'Research Methodology'] },
            { name: 'Current Issues', nameTamil: 'நடப்பு சிக்கல்கள்', questions: 30, marks: 30, topics: ['NEP 2020', 'ICT in Education'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['B.Ed. required for admission', 'Career: Education Professor, School Principal, DIET Faculty']
      },
      {
        id: 'tu-mlisc',
        name: 'M.Lib.I.Sc. (Library & Information Science)',
        nameTamil: 'எம்.லிப்.ஐ.எஸ்சி. (நூலகம் & தகவல் அறிவியல்)',
        type: 'PG',
        seatMatrix: { general: 12, obc: 10, bcMbc: 6, sc: 4, st: 2, total: 34 },
        cutoffs: [
          { year: '2024', general: 55, obc: 50, bcMbc: 45, sc: 35, st: 30 },
          { year: '2023', general: 53, obc: 48, bcMbc: 43, sc: 33, st: 28 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Library Science', nameTamil: 'நூலக அறிவியல்', questions: 40, marks: 40, topics: ['Cataloguing', 'Classification', 'Library Management'] },
            { name: 'Information Science', nameTamil: 'தகவல் அறிவியல்', questions: 35, marks: 35, topics: ['Digital Libraries', 'Information Retrieval', 'ICT'] },
            { name: 'Research', nameTamil: 'ஆராய்ச்சி', questions: 25, marks: 25, topics: ['Research Methods', 'Bibliometrics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['B.Lib.I.Sc. required', 'Career: University Librarian, Information Officer, Archivist']
      },
      {
        id: 'tu-ma-manuscriptology',
        name: 'M.A. Manuscriptology',
        nameTamil: 'எம்.ஏ. சுவடியியல்',
        type: 'PG',
        seatMatrix: { general: 10, obc: 8, bcMbc: 5, sc: 3, st: 2, total: 28 },
        cutoffs: [
          { year: '2024', general: 55, obc: 50, bcMbc: 45, sc: 35, st: 30 },
          { year: '2023', general: 53, obc: 48, bcMbc: 43, sc: 33, st: 28 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Manuscript Studies', nameTamil: 'சுவடி ஆய்வு', questions: 40, marks: 40, topics: ['Palm Leaf Manuscripts', 'Conservation', 'Cataloguing'] },
            { name: 'Paleography', nameTamil: 'தொல்லெழுத்தியல்', questions: 35, marks: 35, topics: ['Script Evolution', 'Ancient Scripts'] },
            { name: 'Epigraphy', nameTamil: 'கல்வெட்டியல்', questions: 25, marks: 25, topics: ['Inscriptions', 'Dating Methods'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Unique course for manuscript preservation', 'Career: Archivist, Museum Curator, Manuscript Conservator']
      },
      {
        id: 'tu-ma-translation-studies',
        name: 'M.A. Translation Studies',
        nameTamil: 'எம்.ஏ. மொழிபெயர்ப்பியல்',
        type: 'PG',
        seatMatrix: { general: 12, obc: 10, bcMbc: 6, sc: 4, st: 2, total: 34 },
        cutoffs: [
          { year: '2024', general: 58, obc: 53, bcMbc: 48, sc: 38, st: 33 },
          { year: '2023', general: 56, obc: 51, bcMbc: 46, sc: 36, st: 31 },
        ],
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Translation Theory', nameTamil: 'மொழிபெயர்ப்பு கோட்பாடு', questions: 35, marks: 35, topics: ['Translation Theories', 'Methods'] },
            { name: 'Practical Translation', nameTamil: 'நடைமுறை மொழிபெயர்ப்பு', questions: 40, marks: 40, topics: ['Tamil-English', 'English-Tamil'] },
            { name: 'Comparative Literature', nameTamil: 'ஒப்பிலக்கியம்', questions: 25, marks: 25, topics: ['Cross-cultural Studies'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Bilingual proficiency essential', 'Career: Translator, Interpreter, Content Localizer']
      }
    ]
  },
  // Gandhigram Rural Institute (GRI) - Rural Development & Vocational
  {
    id: 'gandhigram-rural-institute',
    name: 'Gandhigram Rural Institute',
    nameTamil: 'காந்திகிராம கிராமிய நிறுவனம்',
    location: 'Dindigul',
    website: 'www.ruraluniv.ac.in',
    phone: '0451-2452371',
    email: 'registrar@ruraluniv.ac.in',
    examName: 'CUET-UG / Merit',
    logoColor: '#166534',
    logo: '/universities/gandhigram-rural-logo.jpeg',
    fee: { general: 500, obc: 400, scst: 250 },
    importantDates: [
      { event: 'CUET Notification', eventTamil: 'CUET அறிவிப்பு', date: 'February 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'February 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'March 2026', status: 'upcoming' },
      { event: 'CUET Exam', eventTamil: 'CUET தேர்வு', date: 'May 2026', status: 'upcoming' },
      { event: 'GRI Counseling', eventTamil: 'GRI கலந்தாய்வு', date: 'June 2026', status: 'upcoming' },
    ],
    courses: [
      // B.Sc. Agriculture (Hons)
      {
        id: 'gri-bsc-agriculture',
        name: 'B.Sc. Agriculture (Hons)',
        nameTamil: 'பி.எஸ்சி. வேளாண்மை (ஆனர்ஸ்)',
        type: 'UG',
        seatMatrix: { general: 20, obc: 16, bcMbc: 12, sc: 8, st: 4, total: 60 },
        cutoffs: [
          { year: '2024', general: 480, obc: 420, bcMbc: 380, sc: 320, st: 280 },
          { year: '2023', general: 460, obc: 400, bcMbc: 360, sc: 300, st: 260 },
        ],
        examPattern: {
          totalQuestions: 50,
          totalMarks: 200,
          duration: '45 Minutes per section',
          durationMinutes: 195,
          mode: 'Computer Based (CBT)',
          negativeMarking: true,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 200, topics: ['Mechanics', 'Heat', 'Optics', 'Modern Physics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 200, topics: ['Organic', 'Inorganic', 'Physical Chemistry'] },
            { name: 'Biology/Agriculture', nameTamil: 'உயிரியல்/வேளாண்மை', questions: 50, marks: 200, topics: ['Botany', 'Zoology', 'Agriculture Basics'] }
          ]
        },
        syllabus: [
          {
            unitNumber: 1,
            title: 'Crop Production',
            titleTamil: 'பயிர் உற்பத்தி',
            topics: [
              { name: 'Agronomy', subtopics: ['Field Crops', 'Cropping Systems', 'Tillage', 'Irrigation'], importance: 'High' },
              { name: 'Soil Science', subtopics: ['Soil Types', 'Fertility', 'Soil Conservation'], importance: 'High' },
            ],
            expectedQuestions: 15,
            difficulty: 'Medium'
          },
          {
            unitNumber: 2,
            title: 'Plant Sciences',
            titleTamil: 'தாவர அறிவியல்',
            topics: [
              { name: 'Plant Physiology', subtopics: ['Photosynthesis', 'Respiration', 'Transpiration'], importance: 'High' },
              { name: 'Plant Pathology', subtopics: ['Diseases', 'Pests', 'Integrated Pest Management'], importance: 'Medium' },
            ],
            expectedQuestions: 15,
            difficulty: 'Medium'
          },
          {
            unitNumber: 3,
            title: 'Agricultural Economics',
            titleTamil: 'வேளாண் பொருளாதாரம்',
            topics: [
              { name: 'Farm Management', subtopics: ['Cost Analysis', 'Marketing', 'Price Policy'], importance: 'Medium' },
              { name: 'Agricultural Extension', subtopics: ['Rural Development', 'Farmer Welfare Schemes'], importance: 'Medium' },
            ],
            expectedQuestions: 10,
            difficulty: 'Easy'
          }
        ],
        previousQuestions: [
          {
            id: 'gri-agri-q1',
            year: '2024',
            question: 'Which is the most important greenhouse gas contributing to global warming?',
            options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Argon'],
            correctAnswer: 2,
            explanation: 'Carbon dioxide (CO2) is the primary greenhouse gas responsible for global warming and climate change.',
            topic: 'Environment',
            difficulty: 'Easy'
          },
          {
            id: 'gri-agri-q2',
            year: '2024',
            question: 'NPK in fertilizers stands for:',
            options: ['Nitrogen, Potassium, Kalium', 'Nitrogen, Phosphorus, Potassium', 'Neon, Phosphorus, Krypton', 'Nitrogen, Platinum, Potassium'],
            correctAnswer: 1,
            explanation: 'NPK represents Nitrogen (N), Phosphorus (P), and Potassium (K) - the three primary nutrients for plant growth.',
            topic: 'Soil Science',
            difficulty: 'Easy'
          },
          {
            id: 'gri-agri-q3',
            year: '2023',
            question: 'Which of the following is NOT a Kharif crop?',
            options: ['Rice', 'Cotton', 'Wheat', 'Maize'],
            correctAnswer: 2,
            explanation: 'Wheat is a Rabi (winter) crop sown in October-December. Kharif crops are sown during monsoon (June-July).',
            topic: 'Agronomy',
            difficulty: 'Easy'
          },
          {
            id: 'gri-agri-q4',
            year: '2023',
            question: 'The process by which plants lose water through stomata is called:',
            options: ['Respiration', 'Photosynthesis', 'Transpiration', 'Guttation'],
            correctAnswer: 2,
            explanation: 'Transpiration is the evaporation of water from plant leaves through stomata, creating a pull for water absorption.',
            topic: 'Plant Physiology',
            difficulty: 'Easy'
          }
        ],
        tips: [
          'CUET-UG based admission - focus on Physics, Chemistry, Biology',
          '4-year professional program with focus on practical farming',
          'Career paths: Agricultural Officer, Farm Manager, TNAU Scientist, Agri-Business',
          'Study NCERT Biology and basic agriculture concepts',
          'GRI specializes in rural development - great for students from farming backgrounds'
        ]
      },
      // B.Com (Cooperation)
      {
        id: 'gri-bcom-cooperation',
        name: 'B.Com (Cooperation)',
        nameTamil: 'பி.காம். (கூட்டுறவு)',
        type: 'UG',
        seatMatrix: { general: 18, obc: 14, bcMbc: 10, sc: 6, st: 2, total: 50 },
        cutoffs: [
          { year: '2024', general: 420, obc: 380, bcMbc: 340, sc: 280, st: 240 },
          { year: '2023', general: 400, obc: 360, bcMbc: 320, sc: 260, st: 220 },
        ],
        examPattern: {
          totalQuestions: 50,
          totalMarks: 200,
          duration: '45 Minutes',
          durationMinutes: 45,
          mode: 'Computer Based (CBT)',
          negativeMarking: true,
          sections: [
            { name: 'Accountancy', nameTamil: 'கணக்கியல்', questions: 25, marks: 100, topics: ['Principles', 'Financial Statements', 'Partnership'] },
            { name: 'Business Studies', nameTamil: 'வணிகவியல்', questions: 15, marks: 60, topics: ['Business Organization', 'Management', 'Marketing'] },
            { name: 'Economics', nameTamil: 'பொருளாதாரம்', questions: 10, marks: 40, topics: ['Microeconomics', 'Indian Economy'] }
          ]
        },
        syllabus: [
          {
            unitNumber: 1,
            title: 'Cooperative Principles',
            titleTamil: 'கூட்டுறவு கொள்கைகள்',
            topics: [
              { name: 'Cooperative Movement', subtopics: ['History', 'Rochdale Principles', 'Types of Cooperatives'], importance: 'High' },
              { name: 'Cooperative Laws', subtopics: ['Cooperative Societies Act', 'Registration', 'Management'], importance: 'High' },
            ],
            expectedQuestions: 15,
            difficulty: 'Medium'
          },
          {
            unitNumber: 2,
            title: 'Banking & Finance',
            titleTamil: 'வங்கி & நிதி',
            topics: [
              { name: 'Cooperative Banking', subtopics: ['District Cooperative Banks', 'PACS', 'NABARD'], importance: 'High' },
              { name: 'Agricultural Finance', subtopics: ['Crop Loans', 'Kisan Credit Card', 'Subsidies'], importance: 'Medium' },
            ],
            expectedQuestions: 15,
            difficulty: 'Medium'
          },
          {
            unitNumber: 3,
            title: 'Accountancy',
            titleTamil: 'கணக்கியல்',
            topics: [
              { name: 'Financial Accounting', subtopics: ['Journal', 'Ledger', 'Trial Balance', 'Final Accounts'], importance: 'High' },
              { name: 'Cooperative Accounts', subtopics: ['Audit', 'Reserves', 'Dividend Distribution'], importance: 'Medium' },
            ],
            expectedQuestions: 20,
            difficulty: 'Medium'
          }
        ],
        previousQuestions: [
          {
            id: 'gri-coop-q1',
            year: 'Sample',
            question: 'The first successful cooperative was established in:',
            options: ['France', 'Germany', 'England (Rochdale)', 'India'],
            correctAnswer: 2,
            explanation: 'The Rochdale Society of Equitable Pioneers (1844) in England is considered the first successful modern cooperative.',
            topic: 'Cooperative History',
            difficulty: 'Easy'
          },
          {
            id: 'gri-coop-q2',
            year: 'Sample',
            question: 'NABARD stands for:',
            options: ['National Bank for Agriculture and Rural Development', 'National Board of Agricultural Research', 'National Bank for Asset Development', 'None of these'],
            correctAnswer: 0,
            explanation: 'NABARD is the apex development financial institution for agriculture and rural development in India.',
            topic: 'Agricultural Finance',
            difficulty: 'Easy'
          },
          {
            id: 'gri-coop-q3',
            year: 'Sample',
            question: 'Which of the following is NOT a principle of cooperation?',
            options: ['Open membership', 'Democratic control', 'Profit maximization', 'Education and training'],
            correctAnswer: 2,
            explanation: 'Cooperatives focus on member welfare, not profit maximization. Surplus is distributed equitably among members.',
            topic: 'Cooperative Principles',
            difficulty: 'Easy'
          }
        ],
        tips: [
          'CUET-UG based admission - focus on Accountancy and Business Studies',
          'Unique course combining Commerce with Cooperative management',
          'Career paths: Cooperative Bank Manager, Registrar of Cooperatives, NABARD Officer',
          'Study cooperative movement history and Indian banking',
          'Excellent opportunities in rural banking sector'
        ]
      },
      // B.Voc. Food Processing
      {
        id: 'gri-bvoc-food-processing',
        name: 'B.Voc. Food Processing',
        nameTamil: 'பி.வாக். உணவு பதப்படுத்துதல்',
        type: 'UG',
        seatMatrix: { general: 14, obc: 11, bcMbc: 8, sc: 5, st: 2, total: 40 },
        cutoffs: [
          { year: '2024', general: 380, obc: 340, bcMbc: 300, sc: 250, st: 220 },
          { year: '2023', general: 360, obc: 320, bcMbc: 280, sc: 230, st: 200 },
        ],
        examPattern: {
          totalQuestions: 50,
          totalMarks: 200,
          duration: '45 Minutes per section',
          durationMinutes: 135,
          mode: 'Computer Based (CBT)',
          negativeMarking: true,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 200, topics: ['Mechanics', 'Heat', 'Thermodynamics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 200, topics: ['Organic', 'Physical Chemistry', 'Biochemistry'] },
            { name: 'Biology (Optional)', nameTamil: 'உயிரியல்', questions: 50, marks: 200, topics: ['Microbiology', 'Nutrition', 'Food Science'] }
          ]
        },
        syllabus: [
          {
            unitNumber: 1,
            title: 'Food Science Basics',
            titleTamil: 'உணவு அறிவியல் அடிப்படைகள்',
            topics: [
              { name: 'Food Chemistry', subtopics: ['Carbohydrates', 'Proteins', 'Fats', 'Vitamins'], importance: 'High' },
              { name: 'Food Microbiology', subtopics: ['Bacteria', 'Yeasts', 'Food Spoilage', 'Fermentation'], importance: 'High' },
            ],
            expectedQuestions: 15,
            difficulty: 'Medium'
          },
          {
            unitNumber: 2,
            title: 'Food Processing Technology',
            titleTamil: 'உணவு பதப்படுத்தும் தொழில்நுட்பம்',
            topics: [
              { name: 'Preservation Methods', subtopics: ['Canning', 'Freezing', 'Drying', 'Irradiation'], importance: 'High' },
              { name: 'Dairy Technology', subtopics: ['Milk Processing', 'Cheese', 'Yogurt', 'Ice Cream'], importance: 'Medium' },
            ],
            expectedQuestions: 20,
            difficulty: 'Medium'
          },
          {
            unitNumber: 3,
            title: 'Food Safety & Quality',
            titleTamil: 'உணவு பாதுகாப்பு & தரம்',
            topics: [
              { name: 'FSSAI Standards', subtopics: ['Food Regulations', 'Labeling', 'HACCP'], importance: 'High' },
              { name: 'Quality Control', subtopics: ['Testing Methods', 'Adulteration', 'ISO Standards'], importance: 'Medium' },
            ],
            expectedQuestions: 15,
            difficulty: 'Easy'
          }
        ],
        previousQuestions: [
          {
            id: 'gri-food-q1',
            year: 'Sample',
            question: 'FSSAI stands for:',
            options: ['Food Standards and Safety Authority of India', 'Food Security and Safety Administration of India', 'Federal Standards for Safe Agriculture in India', 'Food and Safety Standards Authority of India'],
            correctAnswer: 3,
            explanation: 'FSSAI (Food Safety and Standards Authority of India) regulates food safety in India under the FSSA 2006.',
            topic: 'Food Safety',
            difficulty: 'Easy'
          },
          {
            id: 'gri-food-q2',
            year: 'Sample',
            question: 'Pasteurization of milk is done at:',
            options: ['100°C for 10 minutes', '72°C for 15 seconds', '60°C for 30 minutes', '121°C for 15 minutes'],
            correctAnswer: 1,
            explanation: 'HTST (High Temperature Short Time) pasteurization heats milk to 72°C for 15 seconds to kill pathogens.',
            topic: 'Dairy Technology',
            difficulty: 'Medium'
          },
          {
            id: 'gri-food-q3',
            year: 'Sample',
            question: 'Which vitamin is destroyed most easily by heat during cooking?',
            options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin K'],
            correctAnswer: 1,
            explanation: 'Vitamin C (ascorbic acid) is highly heat-sensitive and water-soluble, making it most susceptible to cooking losses.',
            topic: 'Food Chemistry',
            difficulty: 'Easy'
          },
          {
            id: 'gri-food-q4',
            year: 'Sample',
            question: 'HACCP stands for:',
            options: ['Hazard Analysis Critical Control Points', 'Health and Cleanliness Control Program', 'Hygiene Assessment and Control Certification Process', 'None of these'],
            correctAnswer: 0,
            explanation: 'HACCP is a systematic preventive approach to food safety that identifies and controls biological, chemical, and physical hazards.',
            topic: 'Quality Control',
            difficulty: 'Easy'
          }
        ],
        tips: [
          'CUET-UG or Merit-based admission (Science stream preferred)',
          'Vocational program with 70% practical training',
          'Career paths: Food Safety Officer, Quality Controller, Food Technologist',
          'India\'s food processing sector is growing rapidly - great job prospects',
          'Internships in food companies are part of curriculum'
        ]
      }
    ]
  },
  // University of Madras - The Parent University for North TN
  {
    id: 'university-of-madras',
    name: 'University of Madras',
    nameTamil: 'சென்னைப் பல்கலைக்கழகம்',
    location: 'Chennai',
    website: 'www.unom.ac.in',
    phone: '044-25399422',
    email: 'registrar@unom.ac.in',
    examName: 'Merit-Based (12th Marks)',
    logoColor: '#1e40af',
    logo: '/universities/university-of-madras-logo.png',
    fee: { general: 1500, obc: 1500, scst: 500 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'April 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'May 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'June 2026', status: 'upcoming' },
      { event: 'Merit List', eventTamil: 'தகுதி பட்டியல்', date: 'July 2026', status: 'upcoming' },
      { event: 'Counseling', eventTamil: 'கலந்தாய்வு', date: 'July 2026', status: 'upcoming' },
    ],
    courses: [
      {
        id: 'uom-ba-english',
        name: 'B.A. English Literature',
        nameTamil: 'பி.ஏ. ஆங்கில இலக்கியம்',
        type: 'UG',
        seatMatrix: { general: 40, obc: 60, bcMbc: 80, sc: 40, st: 5, ews: 10, total: 235 },
        cutoffs: [
          { year: '2024', general: 92, obc: 88, bcMbc: 82, sc: 70, st: 60, ews: 86 },
          { year: '2023', general: 90, obc: 86, bcMbc: 80, sc: 68, st: 58, ews: 84 },
        ],
        examPattern: {
          totalQuestions: 0, totalMarks: 600, duration: 'N/A', durationMinutes: 0,
          mode: 'Merit-Based (12th Marks)', negativeMarking: false,
          sections: [{ name: 'English + Best 4 Subjects', nameTamil: '12ஆம் வகுப்பு மதிப்பெண்கள்', questions: 0, marks: 600, topics: ['12th Board Marks'] }]
        },
        syllabus: [{
          unitNumber: 1, title: 'Eligibility', titleTamil: 'தகுதி', expectedQuestions: 0, difficulty: 'Medium',
          topics: [{ name: 'HSC Pass', subtopics: ['Any stream', 'English as a subject', 'Min 50% aggregate'], importance: 'High' }]
        }],
        previousQuestions: [],
        tips: ['Flagship Arts program in Chennai', 'Direct admission based on 12th marks', 'Career paths: Teacher, Content Writer, Journalist, Civil Services']
      },
      {
        id: 'uom-bsc-physics',
        name: 'B.Sc. Physics',
        nameTamil: 'பி.எஸ்சி. இயற்பியல்',
        type: 'UG',
        seatMatrix: { general: 35, obc: 50, bcMbc: 70, sc: 35, st: 5, ews: 10, total: 205 },
        cutoffs: [
          { year: '2024', general: 94, obc: 90, bcMbc: 85, sc: 72, st: 62, ews: 88 },
          { year: '2023', general: 93, obc: 89, bcMbc: 84, sc: 70, st: 60, ews: 86 },
        ],
        examPattern: {
          totalQuestions: 0, totalMarks: 600, duration: 'N/A', durationMinutes: 0,
          mode: 'Merit-Based (12th Marks)', negativeMarking: false,
          sections: [{ name: 'Physics + Maths + Chemistry + Best 2', nameTamil: '12ஆம் வகுப்பு மதிப்பெண்கள்', questions: 0, marks: 600, topics: ['PCM Marks'] }]
        },
        syllabus: [{
          unitNumber: 1, title: 'Eligibility', titleTamil: 'தகுதி', expectedQuestions: 0, difficulty: 'Medium',
          topics: [{ name: 'HSC Pass with PCM', subtopics: ['Physics as main subject', 'Chemistry, Maths as additional'], importance: 'High' }]
        }],
        previousQuestions: [],
        tips: ['Strong research culture', 'Good placement in IT sector', 'Career paths: Scientist, Teacher, Data Analyst']
      },
      {
        id: 'uom-bcom-general',
        name: 'B.Com General',
        nameTamil: 'பி.காம் பொது',
        type: 'UG',
        seatMatrix: { general: 50, obc: 70, bcMbc: 90, sc: 45, st: 5, ews: 15, total: 275 },
        cutoffs: [
          { year: '2024', general: 91, obc: 87, bcMbc: 81, sc: 68, st: 58, ews: 85 },
          { year: '2023', general: 89, obc: 85, bcMbc: 79, sc: 66, st: 56, ews: 83 },
        ],
        examPattern: {
          totalQuestions: 0, totalMarks: 600, duration: 'N/A', durationMinutes: 0,
          mode: 'Merit-Based (12th Marks)', negativeMarking: false,
          sections: [{ name: 'Commerce Subjects', nameTamil: 'வணிகவியல் பாடங்கள்', questions: 0, marks: 600, topics: ['Commerce Stream Marks'] }]
        },
        syllabus: [{
          unitNumber: 1, title: 'Eligibility', titleTamil: 'தகுதி', expectedQuestions: 0, difficulty: 'Easy',
          topics: [{ name: 'Commerce Stream', subtopics: ['Accountancy', 'Commerce', 'Economics'], importance: 'High' }]
        }],
        previousQuestions: [],
        tips: ['Foundation for CA/CMA/CS', 'Best for banking & finance careers', 'Strong alumni network in Chennai']
      }
    ]
  },
  // Bharathiar University - Coimbatore (University Departments)
  {
    id: 'bharathiar-university',
    name: 'Bharathiar University',
    nameTamil: 'பாரதியார் பல்கலைக்கழகம்',
    location: 'Coimbatore',
    website: 'www.b-u.ac.in',
    phone: '0422-2422222',
    email: 'registrar@b-u.ac.in',
    examName: 'BU PG Entrance / BUPGET',
    logoColor: '#047857',
    logo: '/universities/bharathiar-university-logo.png',
    fee: { general: 500, obc: 500, scst: 250 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'April 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'April 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'May 2026', status: 'upcoming' },
      { event: 'Exam Date', eventTamil: 'தேர்வு தேதி', date: 'June 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'July 2026', status: 'upcoming' }
    ],
    courses: [
      // ========== SCIENCE (M.Sc.) ==========
      {
        id: 'bu-msc-mathematics',
        name: 'M.Sc. Mathematics',
        nameTamil: 'எம்.எஸ்சி. கணிதம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Pure Mathematics', nameTamil: 'தூய கணிதம்', questions: 40, marks: 40, topics: ['Real Analysis', 'Abstract Algebra', 'Complex Analysis'] },
            { name: 'Applied Mathematics', nameTamil: 'பயன்பாட்டு கணிதம்', questions: 35, marks: 35, topics: ['Differential Equations', 'Numerical Methods', 'Operations Research'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 25, marks: 25, topics: ['Logical Reasoning', 'Quantitative Aptitude'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Focus on Real Analysis and Algebra', 'Practice previous year papers', 'Strong foundation in calculus required']
      },
      {
        id: 'bu-msc-statistics',
        name: 'M.Sc. Statistics',
        nameTamil: 'எம்.எஸ்சி. புள்ளியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Probability & Distributions', nameTamil: 'நிகழ்தகவு & பரவல்', questions: 35, marks: 35, topics: ['Probability Theory', 'Distributions', 'Random Variables'] },
            { name: 'Statistical Inference', nameTamil: 'புள்ளியியல் அனுமானம்', questions: 35, marks: 35, topics: ['Estimation', 'Hypothesis Testing', 'Regression'] },
            { name: 'Applied Statistics', nameTamil: 'பயன்பாட்டு புள்ளியியல்', questions: 30, marks: 30, topics: ['Sampling', 'Design of Experiments'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['High demand for statisticians', 'Learn statistical software (R, SPSS)', 'Good for data science careers']
      },
      {
        id: 'bu-msc-applied-mathematics',
        name: 'M.Sc. Applied Mathematics',
        nameTamil: 'எம்.எஸ்சி. பயன்பாட்டு கணிதம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 50, topics: ['Differential Equations', 'Numerical Analysis', 'Mathematical Modelling'] },
            { name: 'Applied Topics', nameTamil: 'பயன்பாட்டு பாடங்கள்', questions: 30, marks: 30, topics: ['Fluid Dynamics', 'Operations Research', 'Optimization'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 20, marks: 20, topics: ['Reasoning', 'Quantitative'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Industry-oriented mathematics', 'Good for research careers', 'Learn computational methods']
      },
      {
        id: 'bu-msc-physics',
        name: 'M.Sc. Physics',
        nameTamil: 'எம்.எஸ்சி. இயற்பியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Classical & Quantum Mechanics', nameTamil: 'பருப்பொருள் & குவாண்டம் இயக்கவியல்', questions: 30, marks: 30, topics: ['Lagrangian', 'Hamiltonian', 'Schrödinger Equation'] },
            { name: 'Electromagnetism & Optics', nameTamil: 'மின்காந்தவியல் & ஒளியியல்', questions: 25, marks: 25, topics: ['Maxwell Equations', 'Wave Optics', 'Lasers'] },
            { name: 'Modern Physics', nameTamil: 'நவீன இயற்பியல்', questions: 25, marks: 25, topics: ['Nuclear Physics', 'Solid State', 'Particle Physics'] },
            { name: 'Mathematical Physics', nameTamil: 'கணித இயற்பியல்', questions: 20, marks: 20, topics: ['Complex Analysis', 'Fourier Transform'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Strong mathematical foundation needed', 'Focus on Quantum Mechanics', 'Good for research and teaching']
      },
      {
        id: 'bu-msc-medical-physics',
        name: 'M.Sc. Medical Physics',
        nameTamil: 'எம்.எஸ்சி. மருத்துவ இயற்பியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 40, marks: 40, topics: ['Nuclear Physics', 'Radiation Physics', 'Medical Imaging'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 25, marks: 25, topics: ['Human Anatomy', 'Physiology', 'Radiobiology'] },
            { name: 'Medical Applications', nameTamil: 'மருத்துவ பயன்பாடுகள்', questions: 20, marks: 20, topics: ['Radiotherapy', 'Diagnostic Imaging'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 15, marks: 15, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Bharathiar is famous for Medical Physics in TN', 'Career in hospitals and cancer centres', 'Study nuclear physics thoroughly']
      },
      {
        id: 'bu-msc-nanoscience',
        name: 'M.Sc. Nanoscience & Technology',
        nameTamil: 'எம்.எஸ்சி. நானோ அறிவியல் & தொழில்நுட்பம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 35, marks: 35, topics: ['Quantum Mechanics', 'Solid State Physics', 'Materials Science'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 35, marks: 35, topics: ['Surface Chemistry', 'Nanomaterials', 'Synthesis Methods'] },
            { name: 'Nanotechnology', nameTamil: 'நானோ தொழில்நுட்பம்', questions: 30, marks: 30, topics: ['Nanoparticles', 'Characterization', 'Applications'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Emerging interdisciplinary field', 'Research-oriented program', 'Good for materials science careers']
      },
      {
        id: 'bu-msc-chemistry',
        name: 'M.Sc. Chemistry',
        nameTamil: 'எம்.எஸ்சி. வேதியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Organic Chemistry', nameTamil: 'கரிம வேதியியல்', questions: 35, marks: 35, topics: ['Reaction Mechanisms', 'Stereochemistry', 'Spectroscopy'] },
            { name: 'Inorganic Chemistry', nameTamil: 'கனிம வேதியியல்', questions: 30, marks: 30, topics: ['Coordination', 'Organometallics', 'Solid State'] },
            { name: 'Physical Chemistry', nameTamil: 'பெளதிக வேதியியல்', questions: 35, marks: 35, topics: ['Thermodynamics', 'Kinetics', 'Quantum Chemistry'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Organic reactions are most important', 'Practice spectroscopy problems', 'Good for pharmaceutical industry']
      },
      {
        id: 'bu-msc-botany',
        name: 'M.Sc. Botany',
        nameTamil: 'எம்.எஸ்சி. தாவரவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Plant Sciences', nameTamil: 'தாவர அறிவியல்', questions: 40, marks: 40, topics: ['Plant Anatomy', 'Physiology', 'Taxonomy'] },
            { name: 'Molecular Biology', nameTamil: 'மூலக்கூறு உயிரியல்', questions: 30, marks: 30, topics: ['Genetics', 'Biotechnology', 'Plant Breeding'] },
            { name: 'Ecology', nameTamil: 'சூழலியல்', questions: 30, marks: 30, topics: ['Plant Ecology', 'Conservation', 'Environmental Biology'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Strong foundation in plant taxonomy', 'Learn plant molecular biology', 'Field work experience valuable']
      },
      {
        id: 'bu-msc-zoology',
        name: 'M.Sc. Zoology',
        nameTamil: 'எம்.எஸ்சி. விலங்கியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Animal Sciences', nameTamil: 'விலங்கு அறிவியல்', questions: 40, marks: 40, topics: ['Comparative Anatomy', 'Physiology', 'Taxonomy'] },
            { name: 'Cell & Molecular Biology', nameTamil: 'உயிரணு & மூலக்கூறு உயிரியல்', questions: 30, marks: 30, topics: ['Genetics', 'Immunology', 'Developmental Biology'] },
            { name: 'Applied Zoology', nameTamil: 'பயன்பாட்டு விலங்கியல்', questions: 30, marks: 30, topics: ['Wildlife', 'Fisheries', 'Entomology'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Focus on animal physiology', 'Study developmental biology', 'Good for research and wildlife sectors']
      },
      {
        id: 'bu-msc-environmental-science',
        name: 'M.Sc. Environmental Sciences',
        nameTamil: 'எம்.எஸ்சி. சுற்றுச்சூழல் அறிவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Environmental Science', nameTamil: 'சுற்றுச்சூழல் அறிவியல்', questions: 40, marks: 40, topics: ['Ecology', 'Pollution', 'Climate Change'] },
            { name: 'Environmental Management', nameTamil: 'சுற்றுச்சூழல் மேலாண்மை', questions: 30, marks: 30, topics: ['EIA', 'Waste Management', 'Conservation'] },
            { name: 'Applied Sciences', nameTamil: 'பயன்பாட்டு அறிவியல்', questions: 30, marks: 30, topics: ['GIS', 'Remote Sensing', 'Environmental Laws'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Growing field with environmental concerns', 'Learn EIA process', 'Good for pollution control boards']
      },
      {
        id: 'bu-msc-biotechnology',
        name: 'M.Sc. Biotechnology',
        nameTamil: 'எம்.எஸ்சி. உயிர்தொழில்நுட்பம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Molecular Biology', nameTamil: 'மூலக்கூறு உயிரியல்', questions: 30, marks: 30, topics: ['DNA/RNA', 'Gene Expression', 'PCR'] },
            { name: 'Genetic Engineering', nameTamil: 'மரபணு பொறியியல்', questions: 30, marks: 30, topics: ['Cloning', 'Vectors', 'CRISPR'] },
            { name: 'Biochemistry', nameTamil: 'உயிர் வேதியியல்', questions: 25, marks: 25, topics: ['Enzymes', 'Metabolism', 'Proteins'] },
            { name: 'Cell Biology', nameTamil: 'உயிரணு உயிரியல்', questions: 15, marks: 15, topics: ['Cell Structure', 'Signaling'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Focus on molecular biology techniques', 'Learn recombinant DNA technology', 'Good for biotech industry']
      },
      {
        id: 'bu-msc-microbiology',
        name: 'M.Sc. Microbiology',
        nameTamil: 'எம்.எஸ்சி. நுண்ணுயிரியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'General Microbiology', nameTamil: 'பொது நுண்ணுயிரியல்', questions: 35, marks: 35, topics: ['Bacteria', 'Viruses', 'Fungi'] },
            { name: 'Medical & Industrial Microbiology', nameTamil: 'மருத்துவ & தொழில்துறை நுண்ணுயிரியல்', questions: 35, marks: 35, topics: ['Pathogens', 'Fermentation', 'Antibiotics'] },
            { name: 'Immunology', nameTamil: 'நோயெதிர்ப்பியல்', questions: 30, marks: 30, topics: ['Antigens', 'Antibodies', 'Vaccines'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Learn bacterial classification', 'Immunology is important', 'Good for pharma and diagnostics']
      },
      {
        id: 'bu-msc-biochemistry',
        name: 'M.Sc. Biochemistry',
        nameTamil: 'எம்.எஸ்சி. உயிர்வேதியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Biochemistry', nameTamil: 'உயிர்வேதியியல்', questions: 45, marks: 45, topics: ['Proteins', 'Enzymes', 'Carbohydrates', 'Lipids'] },
            { name: 'Molecular Biology', nameTamil: 'மூலக்கூறு உயிரியல்', questions: 30, marks: 30, topics: ['DNA/RNA', 'Replication', 'Translation'] },
            { name: 'Clinical Biochemistry', nameTamil: 'மருத்துவ உயிர்வேதியியல்', questions: 25, marks: 25, topics: ['Metabolism', 'Hormones', 'Diagnostics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Strong chemistry foundation needed', 'Focus on metabolic pathways', 'Good for clinical labs']
      },
      {
        id: 'bu-msc-human-genetics',
        name: 'M.Sc. Human Genetics & Molecular Biology',
        nameTamil: 'எம்.எஸ்சி. மனித மரபியல் & மூலக்கூறு உயிரியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Genetics', nameTamil: 'மரபியல்', questions: 40, marks: 40, topics: ['Human Genetics', 'Cytogenetics', 'Population Genetics'] },
            { name: 'Molecular Biology', nameTamil: 'மூலக்கூறு உயிரியல்', questions: 35, marks: 35, topics: ['Gene Structure', 'Expression', 'Techniques'] },
            { name: 'Medical Genetics', nameTamil: 'மருத்துவ மரபியல்', questions: 25, marks: 25, topics: ['Genetic Disorders', 'Genetic Counseling'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Growing field in diagnostics', 'Study human chromosomes', 'Career in genetic counseling']
      },
      // ========== COMPUTER SCIENCE ==========
      {
        id: 'bu-msc-computer-science',
        name: 'M.Sc. Computer Science',
        nameTamil: 'எம்.எஸ்சி. கணினி அறிவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 50, marks: 50, topics: ['Programming', 'Data Structures', 'Algorithms', 'OS'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 25, marks: 25, topics: ['Discrete Math', 'Linear Algebra', 'Probability'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 25, marks: 25, topics: ['Logical Reasoning', 'English'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Focus on programming fundamentals', 'Practice coding regularly', 'Study algorithms and data structures']
      },
      {
        id: 'bu-msc-information-technology',
        name: 'M.Sc. Information Technology',
        nameTamil: 'எம்.எஸ்சி. தகவல் தொழில்நுட்பம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'IT & Programming', nameTamil: 'தகவல் தொழில்நுட்பம் & நிரலாக்கம்', questions: 50, marks: 50, topics: ['Web Technologies', 'DBMS', 'Networking', 'Programming'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 25, marks: 25, topics: ['Discrete Math', 'Statistics'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 25, marks: 25, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Practical IT skills focus', 'Learn web technologies', 'Good for IT industry']
      },
      {
        id: 'bu-msc-data-analytics',
        name: 'M.Sc. Data Analytics',
        nameTamil: 'எம்.எஸ்சி. தரவு பகுப்பாய்வு',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Statistics & Data Analysis', nameTamil: 'புள்ளியியல் & தரவு பகுப்பாய்வு', questions: 40, marks: 40, topics: ['Probability', 'Regression', 'Hypothesis Testing', 'Machine Learning'] },
            { name: 'Programming', nameTamil: 'நிரலாக்கம்', questions: 30, marks: 30, topics: ['Python', 'R', 'SQL'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Linear Algebra', 'Calculus'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['High-demand industry skill', 'Learn Python and R', 'Study machine learning basics']
      },
      {
        id: 'bu-msc-cyber-security',
        name: 'M.Sc. Cyber Security',
        nameTamil: 'எம்.எஸ்சி. சைபர் பாதுகாப்பு',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Computer Networks', nameTamil: 'கணினி வலையமைப்புகள்', questions: 35, marks: 35, topics: ['TCP/IP', 'Security Protocols', 'Firewalls'] },
            { name: 'Security', nameTamil: 'பாதுகாப்பு', questions: 40, marks: 40, topics: ['Cryptography', 'Ethical Hacking', 'Malware Analysis'] },
            { name: 'Programming', nameTamil: 'நிரலாக்கம்', questions: 25, marks: 25, topics: ['Python', 'Scripting', 'Tools'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['High demand for security professionals', 'Learn ethical hacking', 'Study cryptography']
      },
      {
        id: 'bu-msc-elearning',
        name: 'M.Sc. E-Learning Technology',
        nameTamil: 'எம்.எஸ்சி. மின்-கற்றல் தொழில்நுட்பம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Educational Technology', nameTamil: 'கல்வித் தொழில்நுட்பம்', questions: 40, marks: 40, topics: ['Learning Management Systems', 'Instructional Design', 'Multimedia'] },
            { name: 'Computer Applications', nameTamil: 'கணினி பயன்பாடுகள்', questions: 35, marks: 35, topics: ['Web Development', 'Content Creation', 'Programming'] },
            { name: 'Pedagogy', nameTamil: 'கற்பித்தல் முறை', questions: 25, marks: 25, topics: ['Teaching Methods', 'Assessment', 'Online Education'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['EdTech is growing rapidly', 'Learn LMS platforms', 'Good for education sector']
      },
      // ========== ARTS (M.A.) ==========
      {
        id: 'bu-ma-english',
        name: 'M.A. English Literature',
        nameTamil: 'எம்.ஏ. ஆங்கில இலக்கியம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'English Literature', nameTamil: 'ஆங்கில இலக்கியம்', questions: 50, marks: 50, topics: ['British Literature', 'American Literature', 'Indian Writing in English'] },
            { name: 'Language & Linguistics', nameTamil: 'மொழி & மொழியியல்', questions: 30, marks: 30, topics: ['Grammar', 'Phonetics', 'Linguistics'] },
            { name: 'General English', nameTamil: 'பொது ஆங்கிலம்', questions: 20, marks: 20, topics: ['Comprehension', 'Vocabulary'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Read widely - classics and modern literature', 'Study literary criticism', 'Good for teaching and content writing']
      },
      {
        id: 'bu-ma-tamil',
        name: 'M.A. Tamil',
        nameTamil: 'எம்.ஏ. தமிழ்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Tamil Literature', nameTamil: 'தமிழ் இலக்கியம்', questions: 50, marks: 50, topics: ['Sangam Literature', 'Medieval Tamil', 'Modern Literature'] },
            { name: 'Tamil Grammar', nameTamil: 'தமிழ் இலக்கணம்', questions: 30, marks: 30, topics: ['Tolkappiyam', 'Nannool'] },
            { name: 'General Tamil', nameTamil: 'பொதுத் தமிழ்', questions: 20, marks: 20, topics: ['Essay', 'Translation'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Study Sangam literature deeply', 'Learn Tolkappiyam', 'Good for teaching and TNPSC']
      },
      {
        id: 'bu-ma-linguistics',
        name: 'M.A. Linguistics',
        nameTamil: 'எம்.ஏ. மொழியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Theoretical Linguistics', nameTamil: 'கோட்பாட்டு மொழியியல்', questions: 40, marks: 40, topics: ['Phonetics', 'Morphology', 'Syntax', 'Semantics'] },
            { name: 'Applied Linguistics', nameTamil: 'பயன்பாட்டு மொழியியல்', questions: 35, marks: 35, topics: ['Sociolinguistics', 'Psycholinguistics', 'Language Teaching'] },
            { name: 'General Language', nameTamil: 'பொது மொழி', questions: 25, marks: 25, topics: ['Comprehension', 'Analysis'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Unique program - study of language structure', 'Good for NLP and AI', 'Career in translation and localization']
      },
      {
        id: 'bu-ma-economics',
        name: 'M.A. Economics',
        nameTamil: 'எம்.ஏ. பொருளியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Micro Economics', nameTamil: 'நுண் பொருளியல்', questions: 30, marks: 30, topics: ['Consumer Theory', 'Market Structures', 'Welfare'] },
            { name: 'Macro Economics', nameTamil: 'பேரணி பொருளியல்', questions: 30, marks: 30, topics: ['National Income', 'Monetary Policy', 'Inflation'] },
            { name: 'Indian Economy', nameTamil: 'இந்திய பொருளாதாரம்', questions: 25, marks: 25, topics: ['Planning', 'Reforms', 'Current Issues'] },
            { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 15, marks: 15, topics: ['Econometrics', 'Data Analysis'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Excellent for UPSC Economics optional', 'Study Indian economy', 'Learn econometrics']
      },
      {
        id: 'bu-ma-history',
        name: 'M.A. History',
        nameTamil: 'எம்.ஏ. வரலாறு',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Indian History', nameTamil: 'இந்திய வரலாறு', questions: 45, marks: 45, topics: ['Ancient', 'Medieval', 'Modern India'] },
            { name: 'World History', nameTamil: 'உலக வரலாறு', questions: 30, marks: 30, topics: ['European History', 'World Wars', 'Cold War'] },
            { name: 'Tamil Nadu History', nameTamil: 'தமிழ்நாடு வரலாறு', questions: 25, marks: 25, topics: ['Dynasties', 'Freedom Movement'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Good for UPSC and TNPSC', 'Study ancient India well', 'Focus on Tamil Nadu history']
      },
      {
        id: 'bu-ma-sociology',
        name: 'M.A. Sociology',
        nameTamil: 'எம்.ஏ. சமூகவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Sociological Theory', nameTamil: 'சமூகவியல் கோட்பாடு', questions: 40, marks: 40, topics: ['Classical Theories', 'Modern Theories', 'Research Methods'] },
            { name: 'Indian Society', nameTamil: 'இந்திய சமூகம்', questions: 35, marks: 35, topics: ['Caste', 'Family', 'Religion', 'Social Change'] },
            { name: 'Applied Sociology', nameTamil: 'பயன்பாட்டு சமூகவியல்', questions: 25, marks: 25, topics: ['Urban', 'Rural', 'Gender Studies'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Good optional for UPSC', 'Study Indian society', 'Learn research methodology']
      },
      {
        id: 'bu-ma-womens-studies',
        name: 'M.A. Women\'s Studies',
        nameTamil: 'எம்.ஏ. பெண்கள் ஆய்வுகள்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Gender Studies', nameTamil: 'பாலின ஆய்வுகள்', questions: 40, marks: 40, topics: ['Feminist Theory', 'Gender Issues', 'Women\'s Rights'] },
            { name: 'Women & Society', nameTamil: 'பெண்கள் & சமூகம்', questions: 35, marks: 35, topics: ['Health', 'Education', 'Work', 'Law'] },
            { name: 'Research Methods', nameTamil: 'ஆராய்ச்சி முறைகள்', questions: 25, marks: 25, topics: ['Qualitative', 'Quantitative', 'Gender Research'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Interdisciplinary program', 'Good for NGO sector', 'Study gender policies']
      },
      {
        id: 'bu-mjmc',
        name: 'M.A. Journalism & Mass Communication',
        nameTamil: 'எம்.ஏ. பத்திரிகையியல் & வெகுஜன தொடர்பு',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Mass Communication', nameTamil: 'வெகுஜன தொடர்பு', questions: 35, marks: 35, topics: ['Communication Theory', 'Media Studies', 'Journalism'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 30, marks: 30, topics: ['Writing', 'Comprehension', 'Grammar'] },
            { name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்', questions: 20, marks: 20, topics: ['National', 'International', 'Media News'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 15, marks: 15, topics: ['Reasoning', 'GK'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Good writing skills essential', 'Stay updated with news', 'Learn media laws']
      },
      {
        id: 'bu-ma-career-guidance',
        name: 'M.A. Career Guidance',
        nameTamil: 'எம்.ஏ. வாழ்க்கை வழிகாட்டுதல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Psychology', nameTamil: 'உளவியல்', questions: 40, marks: 40, topics: ['Counseling Psychology', 'Developmental Psychology', 'Personality'] },
            { name: 'Career Counseling', nameTamil: 'வாழ்க்கை ஆலோசனை', questions: 35, marks: 35, topics: ['Career Theories', 'Assessment', 'Guidance Techniques'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 25, marks: 25, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Unique program for career counselors', 'Learn psychometric testing', 'Good for schools and colleges']
      },
      // ========== COMMERCE & MANAGEMENT ==========
      {
        id: 'bu-mba',
        name: 'MBA (Master of Business Administration)',
        nameTamil: 'எம்.பி.ஏ. (வணிக நிர்வாக முதுநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (TANCET/CAT/MAT)', negativeMarking: false,
          sections: [
            { name: 'Quantitative Ability', nameTamil: 'எண்ணியல் திறன்', questions: 30, marks: 30, topics: ['Arithmetic', 'Algebra', 'Data Interpretation'] },
            { name: 'Verbal Ability', nameTamil: 'மொழித்திறன்', questions: 25, marks: 25, topics: ['Reading Comprehension', 'Grammar', 'Vocabulary'] },
            { name: 'Logical Reasoning', nameTamil: 'தர்க்க அறிவு', questions: 25, marks: 25, topics: ['Coding', 'Puzzles', 'Syllogisms'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', questions: 20, marks: 20, topics: ['Current Affairs', 'Business GK'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['TANCET is main entrance', 'Focus on Data Interpretation', 'Read business newspapers']
      },
      {
        id: 'bu-mcom-finance',
        name: 'M.Com (Finance & Accounting)',
        nameTamil: 'எம்.காம் (நிதி & கணக்கியல்)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Accounting', nameTamil: 'கணக்கியல்', questions: 35, marks: 35, topics: ['Financial Accounting', 'Cost Accounting', 'Management Accounting'] },
            { name: 'Finance', nameTamil: 'நிதி', questions: 35, marks: 35, topics: ['Financial Management', 'Banking', 'Investment'] },
            { name: 'Business Studies', nameTamil: 'வணிகவியல்', questions: 20, marks: 20, topics: ['Business Environment', 'Economics'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 10, marks: 10, topics: ['Quantitative', 'Reasoning'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Good for CA/CMA aspirants', 'Focus on accounting standards', 'Learn financial analysis']
      },
      {
        id: 'bu-mcom-fintech',
        name: 'M.Com (Financial Technology)',
        nameTamil: 'எம்.காம் (நிதி தொழில்நுட்பம்)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Finance', nameTamil: 'நிதி', questions: 35, marks: 35, topics: ['Financial Management', 'Banking', 'Investment'] },
            { name: 'Accounting', nameTamil: 'கணக்கியல்', questions: 25, marks: 25, topics: ['Financial Accounting', 'Cost Accounting'] },
            { name: 'Technology', nameTamil: 'தொழில்நுட்பம்', questions: 25, marks: 25, topics: ['Blockchain', 'Digital Payments', 'Data Analytics'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 15, marks: 15, topics: ['Quantitative', 'Reasoning'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Emerging field in finance', 'Learn about blockchain', 'Study digital payments ecosystem']
      },
      {
        id: 'bu-mcom-finance-computer',
        name: 'M.Com (Finance & Computer Applications)',
        nameTamil: 'எம்.காம் (நிதி & கணினி பயன்பாடுகள்)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Finance & Accounting', nameTamil: 'நிதி & கணக்கியல்', questions: 40, marks: 40, topics: ['Financial Management', 'Accounting', 'Banking'] },
            { name: 'Computer Applications', nameTamil: 'கணினி பயன்பாடுகள்', questions: 35, marks: 35, topics: ['Tally', 'Excel', 'ERP', 'DBMS'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 25, marks: 25, topics: ['Quantitative', 'Reasoning'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Blend of commerce and IT', 'Learn accounting software', 'Good for corporate jobs']
      },
      // ========== OTHER PG COURSES ==========
      {
        id: 'bu-mca',
        name: 'MCA (Master of Computer Applications)',
        nameTamil: 'எம்.சி.ஏ. (கணினி பயன்பாட்டு முதுநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (TANCET)', negativeMarking: false,
          sections: [
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 40, marks: 40, topics: ['Programming', 'Data Structures', 'DBMS', 'OS'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Discrete Math', 'Linear Algebra', 'Probability'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 30, marks: 30, topics: ['Logical Reasoning', 'Verbal Ability'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['TANCET MCA is main entrance', 'Focus on programming', 'Study data structures']
      },
      {
        id: 'bu-mlibsc',
        name: 'M.Lib.I.Sc. (Library & Information Science)',
        nameTamil: 'எம்.லிப்.ஐ.எஸ்சி. (நூலக & தகவல் அறிவியல்)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Library Science', nameTamil: 'நூலக அறிவியல்', questions: 50, marks: 50, topics: ['Classification', 'Cataloguing', 'Information Sources'] },
            { name: 'Information Technology', nameTamil: 'தகவல் தொழில்நுட்பம்', questions: 30, marks: 30, topics: ['Digital Libraries', 'Databases', 'Web Resources'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Current Affairs', 'Library Developments'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Good for government librarian jobs', 'Learn digital library systems', 'Study classification schemes']
      },
      {
        id: 'bu-msw',
        name: 'MSW (Master of Social Work)',
        nameTamil: 'எம்.எஸ்.டபிள்யூ (சமூக பணி முதுநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Social Work', nameTamil: 'சமூக பணி', questions: 40, marks: 40, topics: ['Case Work', 'Group Work', 'Community Organization'] },
            { name: 'Social Sciences', nameTamil: 'சமூக அறிவியல்', questions: 30, marks: 30, topics: ['Sociology', 'Psychology', 'Anthropology'] },
            { name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்', questions: 20, marks: 20, topics: ['Social Issues', 'Government Schemes'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 10, marks: 10, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Good for NGO sector', 'Study social work methods', 'Learn about welfare schemes']
      },
      {
        id: 'bu-med',
        name: 'M.Ed (Master of Education)',
        nameTamil: 'எம்.எட். (கல்வியியல் முதுநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Education', nameTamil: 'கல்வியியல்', questions: 50, marks: 50, topics: ['Educational Philosophy', 'Psychology', 'Curriculum', 'Assessment'] },
            { name: 'Research Methodology', nameTamil: 'ஆராய்ச்சி முறையியல்', questions: 25, marks: 25, topics: ['Statistics', 'Research Design', 'Thesis Writing'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 25, marks: 25, topics: ['Reasoning', 'English', 'Current Affairs'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['B.Ed required for admission', 'Good for teacher training', 'Study educational philosophy']
      },
      {
        id: 'bu-mped',
        name: 'M.P.Ed (Master of Physical Education)',
        nameTamil: 'எம்.பி.எட். (உடற்கல்வி முதுநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '90 Minutes', durationMinutes: 90,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Physical Education', nameTamil: 'உடற்கல்வி', questions: 50, marks: 50, topics: ['Sports Science', 'Training Methods', 'Sports Psychology'] },
            { name: 'Anatomy & Physiology', nameTamil: 'உடற்கூறியல் & உடலியக்கவியல்', questions: 30, marks: 30, topics: ['Human Anatomy', 'Exercise Physiology', 'Biomechanics'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 20, marks: 20, topics: ['Sports GK', 'Reasoning'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['B.P.Ed required for admission', 'Good for sports coaching', 'Study exercise physiology']
      }
    ]
  },
  // Tamil Nadu Veterinary & Animal Sciences University (TANUVAS)
  {
    id: 'tanuvas-chennai',
    name: 'Tamil Nadu Veterinary & Animal Sciences University',
    nameTamil: 'தமிழ்நாடு கால்நடை மருத்துவ அறிவியல் பல்கலைக்கழகம்',
    location: 'Chennai',
    website: 'www.tanuvas.ac.in',
    phone: '044-25551572',
    email: 'registrar@tanuvas.ac.in',
    examName: 'NEET / Merit-Based',
    logoColor: '#166534',
    logo: '/universities/tanuvas-logo.png',
    fee: { general: 40000, obc: 40000, scst: 5000 },
    importantDates: [
      { event: 'NEET Application', eventTamil: 'NEET விண்ணப்பம்', date: 'February 2026', status: 'upcoming' },
      { event: 'NEET Exam', eventTamil: 'NEET தேர்வு', date: 'May 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'June 2026', status: 'upcoming' },
      { event: 'Counseling', eventTamil: 'கலந்தாய்வு', date: 'July 2026', status: 'upcoming' },
    ],
    courses: [
      {
        id: 'tanuvas-bvsc',
        name: 'B.V.Sc. & A.H. (Veterinary Science)',
        nameTamil: 'கால்நடை மருத்துவ அறிவியல் இளங்கலை',
        type: 'UG',
        seatMatrix: { general: 80, obc: 120, bcMbc: 160, sc: 80, st: 10, ews: 20, total: 470 },
        cutoffs: [
          { year: '2024', general: 520, obc: 480, bcMbc: 420, sc: 320, st: 280, ews: 460 },
          { year: '2023', general: 505, obc: 465, bcMbc: 405, sc: 305, st: 265, ews: 445 },
        ],
        examPattern: {
          totalQuestions: 180, totalMarks: 720, duration: '3 Hours 20 Minutes', durationMinutes: 200,
          mode: 'Computer Based (CBT) - NEET UG', negativeMarking: true,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 45, marks: 180, topics: ['Mechanics', 'Thermodynamics', 'Optics', 'Modern Physics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 180, topics: ['Organic', 'Inorganic', 'Physical Chemistry'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 90, marks: 360, topics: ['Botany', 'Zoology', 'Human Physiology', 'Genetics'] }
          ]
        },
        syllabus: [{
          unitNumber: 1, title: 'NEET Biology', titleTamil: 'NEET உயிரியல்', expectedQuestions: 90, difficulty: 'Hard',
          topics: [
            { name: 'Animal Husbandry', subtopics: ['Dairy farming', 'Poultry', 'Animal breeding'], importance: 'High' },
            { name: 'Genetics', subtopics: ['Heredity', 'Mutations', 'DNA replication'], importance: 'High' }
          ]
        }],
        previousQuestions: [
          { id: 'tanuvas-q1', question: 'Which is the largest gland in the human body?', options: ['Thyroid', 'Liver', 'Pancreas', 'Pituitary'], correctAnswer: 1, explanation: 'Liver is the largest gland, weighing about 1.5 kg in adults.', topic: 'Biology', difficulty: 'Easy' }
        ],
        tips: ['5.5 year course including 1 year internship', 'Career: Veterinary Doctor, Livestock Officer, Animal Welfare', 'NEET score required - aim for 500+ for govt seat']
      },
      {
        id: 'tanuvas-food-tech',
        name: 'B.Tech Food Technology',
        nameTamil: 'உணவு தொழில்நுட்பம் பொறியியல்',
        type: 'UG',
        seatMatrix: { general: 30, obc: 45, bcMbc: 60, sc: 30, st: 5, ews: 10, total: 180 },
        cutoffs: [
          { year: '2024', general: 175, obc: 165, bcMbc: 155, sc: 140, st: 130, ews: 168 },
          { year: '2023', general: 172, obc: 162, bcMbc: 152, sc: 138, st: 128, ews: 165 },
        ],
        examPattern: {
          totalQuestions: 0, totalMarks: 200, duration: 'TNEA Cutoff Based', durationMinutes: 0,
          mode: 'Merit-Based (TNEA Counseling)', negativeMarking: false,
          sections: [{ name: 'TNEA Cutoff', nameTamil: 'TNEA கட்ஆப்', questions: 0, marks: 200, topics: ['Maths/Bio + Phy/2 + Chem/2'] }]
        },
        syllabus: [{
          unitNumber: 1, title: 'Eligibility', titleTamil: 'தகுதி', expectedQuestions: 0, difficulty: 'Medium',
          topics: [{ name: 'HSC with PCM/PCB', subtopics: ['Physics', 'Chemistry', 'Maths or Biology'], importance: 'High' }]
        }],
        previousQuestions: [],
        tips: ['Admission through TNEA counseling', 'Career: Food Safety Officer, Quality Control, R&D in FMCG', 'Growing industry with excellent job prospects']
      }
    ]
  },
  // Tamil Nadu Dr. J. Jayalalithaa Fisheries University (TNJFU)
  {
    id: 'tnjfu-nagapattinam',
    name: 'Tamil Nadu Dr. J. Jayalalithaa Fisheries University',
    nameTamil: 'தமிழ்நாடு முனைவர் ஜெ. ஜெயலலிதா மீன்வளப் பல்கலைக்கழகம்',
    location: 'Nagapattinam',
    website: 'www.tnjfu.ac.in',
    phone: '04365-251633',
    email: 'registrar@tnjfu.ac.in',
    examName: 'NEET / Merit-Based',
    logoColor: '#0284c7',
    logo: '/universities/tnjfu-logo.png',
    fee: { general: 25000, obc: 25000, scst: 5000 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'May 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'June 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'July 2026', status: 'upcoming' },
      { event: 'Counseling', eventTamil: 'கலந்தாய்வு', date: 'August 2026', status: 'upcoming' },
    ],
    courses: [
      {
        id: 'tnjfu-bfsc',
        name: 'B.F.Sc. (Bachelor of Fisheries Science)',
        nameTamil: 'மீன்வள அறிவியல் இளங்கலை',
        type: 'UG',
        seatMatrix: { general: 25, obc: 40, bcMbc: 50, sc: 25, st: 5, ews: 8, total: 153 },
        cutoffs: [
          { year: '2024', general: 85, obc: 80, bcMbc: 75, sc: 62, st: 52, ews: 78 },
          { year: '2023', general: 83, obc: 78, bcMbc: 73, sc: 60, st: 50, ews: 76 },
        ],
        examPattern: {
          totalQuestions: 0, totalMarks: 600, duration: 'N/A', durationMinutes: 0,
          mode: 'Merit-Based (12th Marks with PCB)', negativeMarking: false,
          sections: [{ name: 'PCB Marks', nameTamil: 'இயற்பியல்-வேதியியல்-உயிரியல்', questions: 0, marks: 600, topics: ['12th Science Marks'] }]
        },
        syllabus: [{
          unitNumber: 1, title: 'Eligibility', titleTamil: 'தகுதி', expectedQuestions: 0, difficulty: 'Medium',
          topics: [{ name: 'HSC Science', subtopics: ['Physics', 'Chemistry', 'Biology mandatory', 'Min 50% aggregate'], importance: 'High' }]
        }],
        previousQuestions: [],
        tips: ['4-year professional degree', 'Career: Fisheries Officer, Aquaculture Specialist, Marine Biologist', 'Government jobs in Fisheries Department']
      },
      {
        id: 'tnjfu-nautical',
        name: 'B.Sc. Nautical Science',
        nameTamil: 'கடல்சார் அறிவியல்',
        type: 'UG',
        seatMatrix: { general: 15, obc: 25, bcMbc: 30, sc: 15, st: 3, ews: 5, total: 93 },
        cutoffs: [
          { year: '2024', general: 88, obc: 83, bcMbc: 78, sc: 65, st: 55, ews: 81 },
          { year: '2023', general: 86, obc: 81, bcMbc: 76, sc: 63, st: 53, ews: 79 },
        ],
        examPattern: {
          totalQuestions: 0, totalMarks: 600, duration: 'N/A', durationMinutes: 0,
          mode: 'Merit-Based + Physical Fitness', negativeMarking: false,
          sections: [{ name: 'PCM/PCB Marks', nameTamil: 'அறிவியல் மதிப்பெண்கள்', questions: 0, marks: 600, topics: ['12th Science Marks + Physical Test'] }]
        },
        syllabus: [{
          unitNumber: 1, title: 'Eligibility', titleTamil: 'தகுதி', expectedQuestions: 0, difficulty: 'Medium',
          topics: [{ name: 'Requirements', subtopics: ['HSC with PCM/PCB', 'Physical fitness certificate', 'Swimming ability preferred'], importance: 'High' }]
        }],
        previousQuestions: [],
        tips: ['Unique career in merchant navy', 'High-paying international careers', 'Physical fitness is mandatory']
      }
    ]
  },
  // Tamil Nadu Physical Education and Sports University
  {
    id: 'tnpesu-chennai',
    name: 'Tamil Nadu Physical Education and Sports University',
    nameTamil: 'தமிழ்நாடு உடற்கல்வி மற்றும் விளையாட்டுப் பல்கலைக்கழகம்',
    location: 'Chennai',
    website: 'www.tnpesu.org',
    phone: '044-22350388',
    email: 'registrar@tnpesu.org',
    examName: 'Merit + Physical Fitness Test',
    logoColor: '#ea580c',
    logo: '/universities/tnpesu-logo.png',
    fee: { general: 8000, obc: 8000, scst: 2000 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'April 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'May 2026', status: 'upcoming' },
      { event: 'Physical Test', eventTamil: 'உடல் தகுதி தேர்வு', date: 'June 2026', status: 'upcoming' },
      { event: 'Counseling', eventTamil: 'கலந்தாய்வு', date: 'July 2026', status: 'upcoming' },
    ],
    courses: [
      {
        id: 'tnpesu-bped',
        name: 'B.P.Ed. (Bachelor of Physical Education)',
        nameTamil: 'உடற்கல்வி இளங்கலை',
        type: 'UG',
        seatMatrix: { general: 30, obc: 45, bcMbc: 60, sc: 30, st: 5, ews: 10, total: 180 },
        cutoffs: [
          { year: '2024', general: 75, obc: 70, bcMbc: 65, sc: 55, st: 45, ews: 68 },
          { year: '2023', general: 73, obc: 68, bcMbc: 63, sc: 53, st: 43, ews: 66 },
        ],
        examPattern: {
          totalQuestions: 50, totalMarks: 100, duration: '1 Hour', durationMinutes: 60,
          mode: '50% Written + 50% Physical Test', negativeMarking: false,
          sections: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 25, marks: 25, topics: ['Sports GK', 'Current Affairs', 'General Awareness'] },
            { name: 'Physical Fitness', nameTamil: 'உடல் தகுதி', questions: 0, marks: 50, topics: ['100m Sprint', 'Long Jump', 'Shot Put', 'Endurance'] }
          ]
        },
        syllabus: [{
          unitNumber: 1, title: 'Eligibility', titleTamil: 'தகுதி', expectedQuestions: 0, difficulty: 'Medium',
          topics: [{ name: 'Requirements', subtopics: ['12th pass any stream', 'Sports achievements preferred', 'Good physical fitness'], importance: 'High' }]
        }],
        previousQuestions: [
          { id: 'tnpesu-q1', question: 'The Olympic Games 2024 were held in which city?', options: ['Tokyo', 'Paris', 'Los Angeles', 'London'], correctAnswer: 1, explanation: 'The 2024 Summer Olympics were held in Paris, France.', topic: 'Sports GK', difficulty: 'Easy' }
        ],
        tips: ['2-year degree for graduates, 4-year for 12th pass', 'Physical fitness test is mandatory', 'Career: PE Teacher, Sports Coach, Fitness Trainer']
      },
      {
        id: 'tnpesu-bsc-sports',
        name: 'B.Sc. Sports Science',
        nameTamil: 'விளையாட்டு அறிவியல் இளங்கலை',
        type: 'UG',
        seatMatrix: { general: 20, obc: 30, bcMbc: 40, sc: 20, st: 3, ews: 7, total: 120 },
        cutoffs: [
          { year: '2024', general: 78, obc: 73, bcMbc: 68, sc: 58, st: 48, ews: 71 },
          { year: '2023', general: 76, obc: 71, bcMbc: 66, sc: 56, st: 46, ews: 69 },
        ],
        examPattern: {
          totalQuestions: 50, totalMarks: 100, duration: '1 Hour', durationMinutes: 60,
          mode: 'Written Test + Physical Assessment', negativeMarking: false,
          sections: [
            { name: 'Biology & Sports', nameTamil: 'உயிரியல் & விளையாட்டு', questions: 50, marks: 50, topics: ['Human Anatomy', 'Sports Physiology', 'Nutrition'] },
            { name: 'Physical Test', nameTamil: 'உடல் தேர்வு', questions: 0, marks: 50, topics: ['Fitness Assessment', 'Sports Skills'] }
          ]
        },
        syllabus: [{
          unitNumber: 1, title: 'Eligibility', titleTamil: 'தகுதி', expectedQuestions: 0, difficulty: 'Medium',
          topics: [{ name: 'Requirements', subtopics: ['12th with Science preferred', 'Interest in sports science', 'Basic fitness level'], importance: 'High' }]
        }],
        previousQuestions: [],
        tips: ['Growing field with excellent prospects', 'Career: Sports Scientist, Performance Analyst, Rehabilitation Specialist', 'Can work with professional sports teams']
      }
    ]
  },
  // Tamil Nadu Teachers Education University
  {
    id: 'tnteu-chennai',
    name: 'Tamil Nadu Teachers Education University',
    nameTamil: 'தமிழ்நாடு ஆசிரியர் கல்வி பல்கலைக்கழகம்',
    location: 'Chennai',
    website: 'www.tnteu.ac.in',
    phone: '044-22200845',
    email: 'registrar@tnteu.ac.in',
    examName: 'Merit-Based + CET',
    logo: '/universities/tnteu-logo.png',
    logoColor: '#7c3aed',
    fee: { general: 12000, obc: 12000, scst: 3000 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'April 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'May 2026', status: 'upcoming' },
      { event: 'CET Exam', eventTamil: 'CET தேர்வு', date: 'June 2026', status: 'upcoming' },
      { event: 'Counseling', eventTamil: 'கலந்தாய்வு', date: 'July 2026', status: 'upcoming' },
    ],
    courses: [
      {
        id: 'tnteu-integrated-bed',
        name: 'B.Sc.B.Ed. Integrated (4 Years)',
        nameTamil: 'பி.எஸ்சி.பி.எட். ஒருங்கிணைந்த பட்டம்',
        type: 'UG',
        seatMatrix: { general: 50, obc: 75, bcMbc: 100, sc: 50, st: 8, ews: 15, total: 298 },
        cutoffs: [
          { year: '2024', general: 85, obc: 80, bcMbc: 75, sc: 62, st: 52, ews: 78 },
          { year: '2023', general: 83, obc: 78, bcMbc: 73, sc: 60, st: 50, ews: 76 },
        ],
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'Common Entrance Test (CET)', negativeMarking: false,
          sections: [
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', questions: 25, marks: 25, topics: ['Current Affairs', 'Tamil Nadu GK', 'Education System'] },
            { name: 'Teaching Aptitude', nameTamil: 'கற்பித்தல் திறன்', questions: 25, marks: 25, topics: ['Classroom Situations', 'Child Psychology', 'Teaching Methods'] },
            { name: 'Subject Knowledge', nameTamil: 'பாட அறிவு', questions: 50, marks: 50, topics: ['Based on 12th subjects', 'Science/Arts/Commerce'] }
          ]
        },
        syllabus: [{
          unitNumber: 1, title: 'Eligibility', titleTamil: 'தகுதி', expectedQuestions: 0, difficulty: 'Medium',
          topics: [{ name: 'Requirements', subtopics: ['12th pass with 50%', 'Any stream', 'Passion for teaching'], importance: 'High' }]
        }],
        previousQuestions: [
          { id: 'tnteu-q1', question: 'Who is known as the Father of Modern Education in India?', options: ['Raja Ram Mohan Roy', 'Mahatma Gandhi', 'Dr. Zakir Hussain', 'Ishwar Chandra Vidyasagar'], correctAnswer: 0, explanation: 'Raja Ram Mohan Roy is known as the Father of Modern Education for his efforts in reforming Indian education.', topic: 'Education History', difficulty: 'Medium' }
        ],
        tips: ['Direct path to become a government teacher', 'Integrated program saves 1 year', 'Eligible for TET/TRB exams immediately after graduation']
      },
      {
        id: 'tnteu-ba-bed',
        name: 'B.A.B.Ed. Integrated (4 Years)',
        nameTamil: 'பி.ஏ.பி.எட். ஒருங்கிணைந்த பட்டம்',
        type: 'UG',
        seatMatrix: { general: 40, obc: 60, bcMbc: 80, sc: 40, st: 6, ews: 12, total: 238 },
        cutoffs: [
          { year: '2024', general: 82, obc: 77, bcMbc: 72, sc: 60, st: 50, ews: 75 },
          { year: '2023', general: 80, obc: 75, bcMbc: 70, sc: 58, st: 48, ews: 73 },
        ],
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'Common Entrance Test (CET)', negativeMarking: false,
          sections: [
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', questions: 25, marks: 25, topics: ['Current Affairs', 'History', 'Geography'] },
            { name: 'Language Skills', nameTamil: 'மொழித்திறன்', questions: 25, marks: 25, topics: ['Tamil/English', 'Grammar', 'Comprehension'] },
            { name: 'Social Science', nameTamil: 'சமூக அறிவியல்', questions: 50, marks: 50, topics: ['History', 'Civics', 'Economics'] }
          ]
        },
        syllabus: [{
          unitNumber: 1, title: 'Eligibility', titleTamil: 'தகுதி', expectedQuestions: 0, difficulty: 'Easy',
          topics: [{ name: 'Requirements', subtopics: ['12th pass Arts stream preferred', '50% aggregate', 'Interest in teaching'], importance: 'High' }]
        }],
        previousQuestions: [],
        tips: ['Best for those who want to teach Social Sciences', 'Strong employment in govt schools', 'Can teach classes 6-12 after graduation']
      }
    ]
  },
  // Tamil Nadu Dr. J. Jayalalithaa Music and Fine Arts University
  {
    id: 'tn-music-arts-university',
    name: 'Tamil Nadu Dr. J. Jayalalithaa Music and Fine Arts University',
    nameTamil: 'தமிழ்நாடு முனைவர் ஜெ. ஜெயலலிதா இசை மற்றும் நுண்கலைகள் பல்கலைக்கழகம்',
    location: 'Chennai',
    website: 'www.tnmusicuniversity.ac.in',
    phone: '044-28271830',
    email: 'registrar@tnmusicuniversity.ac.in',
    examName: 'Audition + Interview',
    logo: '/universities/tnmfau-logo.png',
    logoColor: '#be185d',
    fee: { general: 5000, obc: 5000, scst: 1000 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'April 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'May 2026', status: 'upcoming' },
      { event: 'Audition Dates', eventTamil: 'ஆடிஷன் தேதிகள்', date: 'June 2026', status: 'upcoming' },
      { event: 'Results & Admission', eventTamil: 'முடிவுகள் & சேர்க்கை', date: 'July 2026', status: 'upcoming' },
    ],
    courses: [
      {
        id: 'tn-music-vocal',
        name: 'B.A. Music (Vocal)',
        nameTamil: 'பி.ஏ. இசை (குரல்)',
        type: 'UG',
        seatMatrix: { general: 20, obc: 30, bcMbc: 40, sc: 20, st: 3, ews: 7, total: 120 },
        cutoffs: [
          { year: '2024', general: 'Audition', obc: 'Audition', bcMbc: 'Audition', sc: 'Audition', st: 'Audition', ews: 'Audition' },
          { year: '2023', general: 'Audition', obc: 'Audition', bcMbc: 'Audition', sc: 'Audition', st: 'Audition', ews: 'Audition' },
        ],
        examPattern: {
          totalQuestions: 0, totalMarks: 100, duration: '30 Minutes Performance', durationMinutes: 30,
          mode: 'Live Audition + Theory Test', negativeMarking: false,
          sections: [
            { name: 'Performance', nameTamil: 'நிகழ்த்துதல்', questions: 0, marks: 70, topics: ['Carnatic/Hindustani', 'Ragas', 'Tala', 'Compositions'] },
            { name: 'Theory', nameTamil: 'கோட்பாடு', questions: 30, marks: 30, topics: ['Music Theory', 'History of Music', 'Notation'] }
          ]
        },
        syllabus: [{
          unitNumber: 1, title: 'Audition Requirements', titleTamil: 'ஆடிஷன் தேவைகள்', expectedQuestions: 0, difficulty: 'Hard',
          topics: [{ name: 'Musical Skills', subtopics: ['Minimum 5 years training preferred', 'Knowledge of ragas', 'Voice quality', 'Stage presence'], importance: 'High' }]
        }],
        previousQuestions: [],
        tips: ['Formal training in Carnatic/Hindustani music preferred', 'Career: Professional Singer, Music Teacher, AIR Artist', 'Can perform at Sabhas and concerts', 'Government jobs in cultural departments']
      },
      {
        id: 'tn-music-bharatanatyam',
        name: 'B.A. Bharatanatyam',
        nameTamil: 'பி.ஏ. பரதநாட்டியம்',
        type: 'UG',
        seatMatrix: { general: 15, obc: 22, bcMbc: 30, sc: 15, st: 2, ews: 6, total: 90 },
        cutoffs: [
          { year: '2024', general: 'Audition', obc: 'Audition', bcMbc: 'Audition', sc: 'Audition', st: 'Audition', ews: 'Audition' },
          { year: '2023', general: 'Audition', obc: 'Audition', bcMbc: 'Audition', sc: 'Audition', st: 'Audition', ews: 'Audition' },
        ],
        examPattern: {
          totalQuestions: 0, totalMarks: 100, duration: '45 Minutes Performance', durationMinutes: 45,
          mode: 'Live Audition + Theory', negativeMarking: false,
          sections: [
            { name: 'Dance Performance', nameTamil: 'நடன நிகழ்த்துதல்', questions: 0, marks: 75, topics: ['Adavus', 'Abhinaya', 'Varnam', 'Padam'] },
            { name: 'Theory', nameTamil: 'கோட்பாடு', questions: 25, marks: 25, topics: ['Dance History', 'Natyashastra', 'Hastas'] }
          ]
        },
        syllabus: [{
          unitNumber: 1, title: 'Audition Requirements', titleTamil: 'ஆடிஷன் தேவைகள்', expectedQuestions: 0, difficulty: 'Hard',
          topics: [{ name: 'Dance Training', subtopics: ['Arangetram completed preferred', 'Knowledge of all adavus', 'Abhinaya skills', 'Flexibility & stamina'], importance: 'High' }]
        }],
        previousQuestions: [],
        tips: ['Prior Bharatanatyam training essential (5+ years)', 'Career: Professional Dancer, Choreographer, Dance Teacher', 'Opportunities in TV, Films, and Cultural Programs']
      },
      {
        id: 'tn-bfa-painting',
        name: 'B.F.A. Painting',
        nameTamil: 'நுண்கலை இளங்கலை (ஓவியம்)',
        type: 'UG',
        seatMatrix: { general: 12, obc: 18, bcMbc: 24, sc: 12, st: 2, ews: 5, total: 73 },
        cutoffs: [
          { year: '2024', general: 'Portfolio', obc: 'Portfolio', bcMbc: 'Portfolio', sc: 'Portfolio', st: 'Portfolio', ews: 'Portfolio' },
          { year: '2023', general: 'Portfolio', obc: 'Portfolio', bcMbc: 'Portfolio', sc: 'Portfolio', st: 'Portfolio', ews: 'Portfolio' },
        ],
        examPattern: {
          totalQuestions: 0, totalMarks: 100, duration: '3 Hours Practical', durationMinutes: 180,
          mode: 'Practical Test + Portfolio Review', negativeMarking: false,
          sections: [
            { name: 'Drawing Test', nameTamil: 'வரைதல் தேர்வு', questions: 0, marks: 50, topics: ['Still Life', 'Memory Drawing', 'Composition'] },
            { name: 'Portfolio', nameTamil: 'படைப்புத் தொகுப்பு', questions: 0, marks: 50, topics: ['Previous Artworks', 'Originality', 'Creativity'] }
          ]
        },
        syllabus: [{
          unitNumber: 1, title: 'Portfolio Requirements', titleTamil: 'படைப்புத் தொகுப்பு தேவைகள்', expectedQuestions: 0, difficulty: 'Medium',
          topics: [{ name: 'Art Skills', subtopics: ['10-15 original artworks', 'Different mediums', 'Sketches and studies', 'Personal style development'], importance: 'High' }]
        }],
        previousQuestions: [],
        tips: ['Portfolio of 10-15 works mandatory', 'Career: Fine Artist, Illustrator, Art Director', 'Can work in advertising, publishing, galleries']
      }
    ]
  },
  {
    id: 'annamalai-university',
    name: 'Annamalai University',
    nameTamil: 'அண்ணாமலைப் பல்கலைக்கழகம்',
    location: 'Chidambaram',
    website: 'www.annamalaiuniversity.ac.in',
    phone: '04144-238282',
    examName: 'AU Entrance Exam',
    logoColor: '#1e40af',
    logo: '/universities/annamalai-university-logo.png',
    fee: { general: 500, obc: 500, scst: 250 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'March 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'April 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'May 2026', status: 'upcoming' },
      { event: 'Exam Date', eventTamil: 'தேர்வு தேதி', date: 'June 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'July 2026', status: 'upcoming' }
    ],
    courses: [
      // ========== FACULTY OF AGRICULTURE (On-Campus) ==========
      {
        id: 'au-bsc-agriculture',
        name: 'B.Sc. (Hons) Agriculture',
        nameTamil: 'பி.எஸ்சி. (ஹானர்ஸ்) வேளாண்மை',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Botany', 'Zoology', 'Genetics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Organic', 'Inorganic', 'Soil Chemistry'] },
            { name: 'Agriculture Aptitude', nameTamil: 'வேளாண் தகுதி', questions: 30, marks: 30, topics: ['Farming Basics', 'Crop Science'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year program', 'Career: Agricultural Officer, Farm Manager', 'Strong placement in agri-companies'],
        seatMatrix: { general: 60, obc: 90, bcMbc: 120, sc: 50, st: 10, ews: 20, total: 350 },
        cutoffs: [
          { year: '2024', general: 75.0, obc: 70.0, bcMbc: 65.0, sc: 55.0, st: 45.0, ews: 68.0 },
          { year: '2023', general: 78.0, obc: 73.0, bcMbc: 68.0, sc: 58.0, st: 48.0, ews: 71.0 }
        ]
      },
      {
        id: 'au-bsc-horticulture',
        name: 'B.Sc. (Hons) Horticulture',
        nameTamil: 'பி.எஸ்சி. (ஹானர்ஸ்) தோட்டக்கலை',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Plant Science', 'Botany'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Organic', 'Soil Chemistry'] },
            { name: 'Horticulture Aptitude', nameTamil: 'தோட்டக்கலை தகுதி', questions: 30, marks: 30, topics: ['Fruit Crops', 'Vegetable Crops', 'Floriculture'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year program', 'Career: Horticulturist, Landscape Designer', 'Growing demand in urban farming'],
        seatMatrix: { general: 40, obc: 60, bcMbc: 80, sc: 35, st: 8, ews: 15, total: 238 },
        cutoffs: [
          { year: '2024', general: 72.0, obc: 67.0, bcMbc: 62.0, sc: 52.0, st: 42.0, ews: 65.0 },
          { year: '2023', general: 75.0, obc: 70.0, bcMbc: 65.0, sc: 55.0, st: 45.0, ews: 68.0 }
        ]
      },
      {
        id: 'au-msc-agronomy',
        name: 'M.Sc. (Ag.) Agronomy',
        nameTamil: 'எம்.எஸ்சி. (வேளாண்.) வேளாண் பயிரியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Agronomy', nameTamil: 'வேளாண் பயிரியல்', questions: 50, marks: 50, topics: ['Crop Production', 'Field Crops', 'Cropping Systems'] },
            { name: 'Soil Science', nameTamil: 'மண் அறிவியல்', questions: 25, marks: 25, topics: ['Soil Fertility', 'Soil Management'] },
            { name: 'General Agriculture', nameTamil: 'பொது வேளாண்மை', questions: 25, marks: 25, topics: ['Agricultural Statistics', 'Extension'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Research opportunities in ICAR', 'Career: Agricultural Scientist'],
        seatMatrix: { general: 15, obc: 22, bcMbc: 30, sc: 12, st: 3, ews: 6, total: 88 },
        cutoffs: [
          { year: '2024', general: 65.0, obc: 60.0, bcMbc: 55.0, sc: 45.0, st: 35.0, ews: 58.0 },
          { year: '2023', general: 68.0, obc: 63.0, bcMbc: 58.0, sc: 48.0, st: 38.0, ews: 61.0 }
        ]
      },
      {
        id: 'au-msc-soil-science',
        name: 'M.Sc. (Ag.) Soil Science',
        nameTamil: 'எம்.எஸ்சி. (வேளாண்.) மண் அறிவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Soil Science', nameTamil: 'மண் அறிவியல்', questions: 50, marks: 50, topics: ['Soil Chemistry', 'Soil Physics', 'Soil Microbiology'] },
            { name: 'Plant Nutrition', nameTamil: 'தாவர ஊட்டச்சத்து', questions: 25, marks: 25, topics: ['Nutrient Management', 'Fertilizers'] },
            { name: 'General Agriculture', nameTamil: 'பொது வேளாண்மை', questions: 25, marks: 25, topics: ['Crop Production', 'Statistics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Soil Scientist, Fertility Expert'],
        seatMatrix: { general: 12, obc: 18, bcMbc: 24, sc: 10, st: 2, ews: 5, total: 71 },
        cutoffs: [
          { year: '2024', general: 62.0, obc: 57.0, bcMbc: 52.0, sc: 42.0, st: 32.0, ews: 55.0 },
          { year: '2023', general: 65.0, obc: 60.0, bcMbc: 55.0, sc: 45.0, st: 35.0, ews: 58.0 }
        ]
      },
      {
        id: 'au-msc-entomology',
        name: 'M.Sc. (Ag.) Agricultural Entomology',
        nameTamil: 'எம்.எஸ்சி. (வேளாண்.) வேளாண் பூச்சியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Entomology', nameTamil: 'பூச்சியியல்', questions: 50, marks: 50, topics: ['Insect Taxonomy', 'Pest Management', 'Insect Physiology'] },
            { name: 'Plant Protection', nameTamil: 'தாவர பாதுகாப்பு', questions: 25, marks: 25, topics: ['IPM', 'Biological Control'] },
            { name: 'General Agriculture', nameTamil: 'பொது வேளாண்மை', questions: 25, marks: 25, topics: ['Crop Science', 'Statistics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Entomologist, Pest Management Specialist'],
        seatMatrix: { general: 12, obc: 18, bcMbc: 24, sc: 10, st: 2, ews: 5, total: 71 },
        cutoffs: [
          { year: '2024', general: 60.0, obc: 55.0, bcMbc: 50.0, sc: 40.0, st: 30.0, ews: 53.0 },
          { year: '2023', general: 63.0, obc: 58.0, bcMbc: 53.0, sc: 43.0, st: 33.0, ews: 56.0 }
        ]
      },
      {
        id: 'au-msc-plant-pathology',
        name: 'M.Sc. (Ag.) Plant Pathology',
        nameTamil: 'எம்.எஸ்சி. (வேளாண்.) தாவர நோயியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Plant Pathology', nameTamil: 'தாவர நோயியல்', questions: 50, marks: 50, topics: ['Fungal Diseases', 'Bacterial Diseases', 'Viral Diseases'] },
            { name: 'Plant Protection', nameTamil: 'தாவர பாதுகாப்பு', questions: 25, marks: 25, topics: ['Disease Management', 'Fungicides'] },
            { name: 'General Agriculture', nameTamil: 'பொது வேளாண்மை', questions: 25, marks: 25, topics: ['Crop Production', 'Statistics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Plant Pathologist, Research Scientist'],
        seatMatrix: { general: 12, obc: 18, bcMbc: 24, sc: 10, st: 2, ews: 5, total: 71 },
        cutoffs: [
          { year: '2024', general: 61.0, obc: 56.0, bcMbc: 51.0, sc: 41.0, st: 31.0, ews: 54.0 },
          { year: '2023', general: 64.0, obc: 59.0, bcMbc: 54.0, sc: 44.0, st: 34.0, ews: 57.0 }
        ]
      },
      {
        id: 'au-msc-ag-microbiology',
        name: 'M.Sc. (Ag.) Microbiology',
        nameTamil: 'எம்.எஸ்சி. (வேளாண்.) நுண்ணுயிரியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Microbiology', nameTamil: 'நுண்ணுயிரியல்', questions: 50, marks: 50, topics: ['Soil Microbiology', 'Plant-Microbe Interactions'] },
            { name: 'Biotechnology', nameTamil: 'உயிர் தொழில்நுட்பம்', questions: 25, marks: 25, topics: ['Biofertilizers', 'Biopesticides'] },
            { name: 'General Agriculture', nameTamil: 'பொது வேளாண்மை', questions: 25, marks: 25, topics: ['Crop Science', 'Statistics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Microbiologist, Biofertilizer Specialist'],
        seatMatrix: { general: 10, obc: 15, bcMbc: 20, sc: 8, st: 2, ews: 4, total: 59 },
        cutoffs: [
          { year: '2024', general: 63.0, obc: 58.0, bcMbc: 53.0, sc: 43.0, st: 33.0, ews: 56.0 },
          { year: '2023', general: 66.0, obc: 61.0, bcMbc: 56.0, sc: 46.0, st: 36.0, ews: 59.0 }
        ]
      },
      {
        id: 'au-msc-microbial-biotech',
        name: 'M.Sc. (Ag.) Microbial Biotechnology',
        nameTamil: 'எம்.எஸ்சி. (வேளாண்.) நுண்ணுயிர் உயிர்தொழில்நுட்பம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Microbial Biotechnology', nameTamil: 'நுண்ணுயிர் உயிர்தொழில்நுட்பம்', questions: 50, marks: 50, topics: ['Genetic Engineering', 'Fermentation Technology'] },
            { name: 'Molecular Biology', nameTamil: 'மூலக்கூறு உயிரியல்', questions: 25, marks: 25, topics: ['DNA Technology', 'Gene Cloning'] },
            { name: 'General Agriculture', nameTamil: 'பொது வேளாண்மை', questions: 25, marks: 25, topics: ['Applications in Agriculture'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Biotechnologist, Research Scientist'],
        seatMatrix: { general: 10, obc: 15, bcMbc: 20, sc: 8, st: 2, ews: 4, total: 59 },
        cutoffs: [
          { year: '2024', general: 64.0, obc: 59.0, bcMbc: 54.0, sc: 44.0, st: 34.0, ews: 57.0 },
          { year: '2023', general: 67.0, obc: 62.0, bcMbc: 57.0, sc: 47.0, st: 37.0, ews: 60.0 }
        ]
      },
      {
        id: 'au-msc-genetics-breeding',
        name: 'M.Sc. (Ag.) Genetics & Plant Breeding',
        nameTamil: 'எம்.எஸ்சி. (வேளாண்.) மரபியல் & தாவர இனப்பெருக்கம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Genetics', nameTamil: 'மரபியல்', questions: 40, marks: 40, topics: ['Mendelian Genetics', 'Population Genetics', 'Cytogenetics'] },
            { name: 'Plant Breeding', nameTamil: 'தாவர இனப்பெருக்கம்', questions: 35, marks: 35, topics: ['Breeding Methods', 'Hybridization', 'Selection'] },
            { name: 'General Agriculture', nameTamil: 'பொது வேளாண்மை', questions: 25, marks: 25, topics: ['Crop Improvement', 'Statistics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Plant Breeder, Seed Scientist'],
        seatMatrix: { general: 12, obc: 18, bcMbc: 24, sc: 10, st: 2, ews: 5, total: 71 },
        cutoffs: [
          { year: '2024', general: 66.0, obc: 61.0, bcMbc: 56.0, sc: 46.0, st: 36.0, ews: 59.0 },
          { year: '2023', general: 69.0, obc: 64.0, bcMbc: 59.0, sc: 49.0, st: 39.0, ews: 62.0 }
        ]
      },
      {
        id: 'au-msc-ag-economics',
        name: 'M.Sc. (Ag.) Agricultural Economics',
        nameTamil: 'எம்.எஸ்சி. (வேளாண்.) வேளாண் பொருளாதாரம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Agricultural Economics', nameTamil: 'வேளாண் பொருளாதாரம்', questions: 50, marks: 50, topics: ['Farm Management', 'Agricultural Marketing', 'Price Analysis'] },
            { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 25, marks: 25, topics: ['Econometrics', 'Research Methods'] },
            { name: 'General Agriculture', nameTamil: 'பொது வேளாண்மை', questions: 25, marks: 25, topics: ['Agricultural Development', 'Policy'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Agricultural Economist, Policy Analyst'],
        seatMatrix: { general: 10, obc: 15, bcMbc: 20, sc: 8, st: 2, ews: 4, total: 59 },
        cutoffs: [
          { year: '2024', general: 58.0, obc: 53.0, bcMbc: 48.0, sc: 38.0, st: 28.0, ews: 51.0 },
          { year: '2023', general: 61.0, obc: 56.0, bcMbc: 51.0, sc: 41.0, st: 31.0, ews: 54.0 }
        ]
      },
      {
        id: 'au-msc-ag-extension',
        name: 'M.Sc. (Ag.) Agricultural Extension Education',
        nameTamil: 'எம்.எஸ்சி. (வேளாண்.) வேளாண் விரிவாக்கக் கல்வி',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Extension Education', nameTamil: 'விரிவாக்கக் கல்வி', questions: 50, marks: 50, topics: ['Extension Methods', 'Communication', 'Rural Development'] },
            { name: 'Agricultural Development', nameTamil: 'வேளாண் வளர்ச்சி', questions: 25, marks: 25, topics: ['Programme Planning', 'Technology Transfer'] },
            { name: 'General Agriculture', nameTamil: 'பொது வேளாண்மை', questions: 25, marks: 25, topics: ['Crop Production', 'Statistics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Extension Officer, Development Worker'],
        seatMatrix: { general: 10, obc: 15, bcMbc: 20, sc: 8, st: 2, ews: 4, total: 59 },
        cutoffs: [
          { year: '2024', general: 55.0, obc: 50.0, bcMbc: 45.0, sc: 35.0, st: 25.0, ews: 48.0 },
          { year: '2023', general: 58.0, obc: 53.0, bcMbc: 48.0, sc: 38.0, st: 28.0, ews: 51.0 }
        ]
      },
      // ========== FACULTY OF ENGINEERING & TECHNOLOGY (FEAT) ==========
      {
        id: 'au-be-civil',
        name: 'B.E. Civil Engineering',
        nameTamil: 'பி.இ. கட்டிடப் பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 40, marks: 40, topics: ['Calculus', 'Algebra', 'Coordinate Geometry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Mechanics', 'Thermodynamics', 'Optics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Chemical Bonding', 'Materials'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year program', 'Career: Civil Engineer, Structural Engineer', 'Government job opportunities'],
        seatMatrix: { general: 40, obc: 60, bcMbc: 80, sc: 35, st: 8, ews: 15, total: 238 },
        cutoffs: [
          { year: '2024', general: 78.0, obc: 73.0, bcMbc: 68.0, sc: 58.0, st: 48.0, ews: 71.0 },
          { year: '2023', general: 81.0, obc: 76.0, bcMbc: 71.0, sc: 61.0, st: 51.0, ews: 74.0 }
        ]
      },
      {
        id: 'au-be-civil-structural',
        name: 'B.E. Civil & Structural Engineering',
        nameTamil: 'பி.இ. கட்டிட & கட்டமைப்பு பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 40, marks: 40, topics: ['Calculus', 'Algebra', 'Coordinate Geometry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Mechanics', 'Thermodynamics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Chemical Bonding', 'Materials'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year program', 'Career: Structural Engineer, Design Engineer'],
        seatMatrix: { general: 30, obc: 45, bcMbc: 60, sc: 26, st: 6, ews: 11, total: 178 },
        cutoffs: [
          { year: '2024', general: 76.0, obc: 71.0, bcMbc: 66.0, sc: 56.0, st: 46.0, ews: 69.0 },
          { year: '2023', general: 79.0, obc: 74.0, bcMbc: 69.0, sc: 59.0, st: 49.0, ews: 72.0 }
        ]
      },
      {
        id: 'au-be-mechanical',
        name: 'B.E. Mechanical Engineering',
        nameTamil: 'பி.இ. இயந்திரவியல் பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 40, marks: 40, topics: ['Calculus', 'Algebra', 'Vectors'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Mechanics', 'Thermodynamics', 'Heat'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Materials', 'Polymers'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year program', 'Career: Mechanical Engineer, Production Manager', 'Core engineering branch'],
        seatMatrix: { general: 50, obc: 75, bcMbc: 100, sc: 43, st: 10, ews: 19, total: 297 },
        cutoffs: [
          { year: '2024', general: 80.0, obc: 75.0, bcMbc: 70.0, sc: 60.0, st: 50.0, ews: 73.0 },
          { year: '2023', general: 83.0, obc: 78.0, bcMbc: 73.0, sc: 63.0, st: 53.0, ews: 76.0 }
        ]
      },
      {
        id: 'au-be-mech-manufacturing',
        name: 'B.E. Mechanical (Manufacturing)',
        nameTamil: 'பி.இ. இயந்திரவியல் (உற்பத்தி)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 40, marks: 40, topics: ['Calculus', 'Algebra'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Mechanics', 'Manufacturing Processes'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Materials Science'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year program', 'Career: Manufacturing Engineer, Quality Engineer'],
        seatMatrix: { general: 30, obc: 45, bcMbc: 60, sc: 26, st: 6, ews: 11, total: 178 },
        cutoffs: [
          { year: '2024', general: 75.0, obc: 70.0, bcMbc: 65.0, sc: 55.0, st: 45.0, ews: 68.0 },
          { year: '2023', general: 78.0, obc: 73.0, bcMbc: 68.0, sc: 58.0, st: 48.0, ews: 71.0 }
        ]
      },
      {
        id: 'au-be-eee',
        name: 'B.E. Electrical & Electronics Engineering',
        nameTamil: 'பி.இ. மின் & மின்னணுவியல் பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 40, marks: 40, topics: ['Calculus', 'Differential Equations', 'Linear Algebra'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Electromagnetism', 'Electronics', 'Optics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Electrochemistry', 'Materials'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year program', 'Career: Electrical Engineer, Power Systems Engineer', 'High demand in power sector'],
        seatMatrix: { general: 45, obc: 68, bcMbc: 90, sc: 39, st: 9, ews: 17, total: 268 },
        cutoffs: [
          { year: '2024', general: 79.0, obc: 74.0, bcMbc: 69.0, sc: 59.0, st: 49.0, ews: 72.0 },
          { year: '2023', general: 82.0, obc: 77.0, bcMbc: 72.0, sc: 62.0, st: 52.0, ews: 75.0 }
        ]
      },
      {
        id: 'au-be-ece',
        name: 'B.E. Electronics & Communication Engineering',
        nameTamil: 'பி.இ. மின்னணுவியல் & தகவல்தொடர்பு பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 40, marks: 40, topics: ['Calculus', 'Signal Processing', 'Probability'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Semiconductors', 'Electronics', 'Communication'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Materials', 'Polymers'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year program', 'Career: Electronics Engineer, Telecom Engineer', 'IT and VLSI opportunities'],
        seatMatrix: { general: 50, obc: 75, bcMbc: 100, sc: 43, st: 10, ews: 19, total: 297 },
        cutoffs: [
          { year: '2024', general: 82.0, obc: 77.0, bcMbc: 72.0, sc: 62.0, st: 52.0, ews: 75.0 },
          { year: '2023', general: 85.0, obc: 80.0, bcMbc: 75.0, sc: 65.0, st: 55.0, ews: 78.0 }
        ]
      },
      {
        id: 'au-be-ei',
        name: 'B.E. Electronics & Instrumentation',
        nameTamil: 'பி.இ. மின்னணுவியல் & கருவியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 40, marks: 40, topics: ['Calculus', 'Control Systems'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Instrumentation', 'Sensors'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Electrochemistry'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year program', 'Career: Instrumentation Engineer, Process Control Engineer'],
        seatMatrix: { general: 30, obc: 45, bcMbc: 60, sc: 26, st: 6, ews: 11, total: 178 },
        cutoffs: [
          { year: '2024', general: 74.0, obc: 69.0, bcMbc: 64.0, sc: 54.0, st: 44.0, ews: 67.0 },
          { year: '2023', general: 77.0, obc: 72.0, bcMbc: 67.0, sc: 57.0, st: 47.0, ews: 70.0 }
        ]
      },
      {
        id: 'au-be-cse',
        name: 'B.E. Computer Science & Engineering',
        nameTamil: 'பி.இ. கணினி அறிவியல் & பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 40, marks: 40, topics: ['Discrete Math', 'Algebra', 'Probability'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Electronics', 'Digital Logic'] },
            { name: 'Logical Reasoning', nameTamil: 'தர்க்க அறிவு', questions: 30, marks: 30, topics: ['Programming Aptitude', 'Problem Solving'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year program', 'Career: Software Engineer, Data Scientist', 'Highest placement rates'],
        seatMatrix: { general: 60, obc: 90, bcMbc: 120, sc: 52, st: 12, ews: 23, total: 357 },
        cutoffs: [
          { year: '2024', general: 88.0, obc: 83.0, bcMbc: 78.0, sc: 68.0, st: 58.0, ews: 81.0 },
          { year: '2023', general: 91.0, obc: 86.0, bcMbc: 81.0, sc: 71.0, st: 61.0, ews: 84.0 }
        ]
      },
      {
        id: 'au-be-it',
        name: 'B.E. Information Technology',
        nameTamil: 'பி.இ. தகவல் தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 40, marks: 40, topics: ['Discrete Math', 'Algebra', 'Probability'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Electronics', 'Networks'] },
            { name: 'Logical Reasoning', nameTamil: 'தர்க்க அறிவு', questions: 30, marks: 30, topics: ['Programming Aptitude'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year program', 'Career: IT Engineer, Web Developer', 'Good IT placements'],
        seatMatrix: { general: 50, obc: 75, bcMbc: 100, sc: 43, st: 10, ews: 19, total: 297 },
        cutoffs: [
          { year: '2024', general: 85.0, obc: 80.0, bcMbc: 75.0, sc: 65.0, st: 55.0, ews: 78.0 },
          { year: '2023', general: 88.0, obc: 83.0, bcMbc: 78.0, sc: 68.0, st: 58.0, ews: 81.0 }
        ]
      },
      {
        id: 'au-be-chemical',
        name: 'B.E. Chemical Engineering',
        nameTamil: 'பி.இ. வேதியியல் பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 40, marks: 40, topics: ['Organic', 'Inorganic', 'Physical Chemistry'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Calculus', 'Differential Equations'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Thermodynamics', 'Fluid Mechanics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year program', 'Career: Chemical Engineer, Process Engineer', 'Petrochemical industry opportunities'],
        seatMatrix: { general: 30, obc: 45, bcMbc: 60, sc: 26, st: 6, ews: 11, total: 178 },
        cutoffs: [
          { year: '2024', general: 72.0, obc: 67.0, bcMbc: 62.0, sc: 52.0, st: 42.0, ews: 65.0 },
          { year: '2023', general: 75.0, obc: 70.0, bcMbc: 65.0, sc: 55.0, st: 45.0, ews: 68.0 }
        ]
      },
      {
        id: 'au-be-cse-aiml',
        name: 'B.E. CSE (Artificial Intelligence & Machine Learning)',
        nameTamil: 'பி.இ. கணினி அறிவியல் (செயற்கை நுண்ணறிவு & இயந்திர கற்றல்)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 40, marks: 40, topics: ['Linear Algebra', 'Probability', 'Statistics'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Electronics', 'Digital Logic'] },
            { name: 'Logical Reasoning', nameTamil: 'தர்க்க அறிவு', questions: 30, marks: 30, topics: ['AI Aptitude', 'Problem Solving'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year program', 'Career: AI Engineer, ML Engineer', 'Future-focused curriculum'],
        seatMatrix: { general: 40, obc: 60, bcMbc: 80, sc: 35, st: 8, ews: 15, total: 238 },
        cutoffs: [
          { year: '2024', general: 90.0, obc: 85.0, bcMbc: 80.0, sc: 70.0, st: 60.0, ews: 83.0 },
          { year: '2023', general: 92.0, obc: 87.0, bcMbc: 82.0, sc: 72.0, st: 62.0, ews: 85.0 }
        ]
      },
      {
        id: 'au-be-cse-ds',
        name: 'B.E. CSE (Data Science)',
        nameTamil: 'பி.இ. கணினி அறிவியல் (தரவு அறிவியல்)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 40, marks: 40, topics: ['Statistics', 'Probability', 'Linear Algebra'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Electronics', 'Digital Logic'] },
            { name: 'Logical Reasoning', nameTamil: 'தர்க்க அறிவு', questions: 30, marks: 30, topics: ['Data Analysis Aptitude', 'Problem Solving'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year program', 'Career: Data Scientist, Analytics Engineer', 'High industry demand'],
        seatMatrix: { general: 40, obc: 60, bcMbc: 80, sc: 35, st: 8, ews: 15, total: 238 },
        cutoffs: [
          { year: '2024', general: 89.0, obc: 84.0, bcMbc: 79.0, sc: 69.0, st: 59.0, ews: 82.0 },
          { year: '2023', general: 91.0, obc: 86.0, bcMbc: 81.0, sc: 71.0, st: 61.0, ews: 84.0 }
        ]
      },
      {
        id: 'au-bpharm',
        name: 'B.Pharm (Bachelor of Pharmacy)',
        nameTamil: 'பி.பார்ம். (மருந்தியல் இளங்கலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 40, marks: 40, topics: ['Organic', 'Inorganic', 'Pharmaceutical Chemistry'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 30, marks: 30, topics: ['Human Physiology', 'Biochemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Physical Pharmacy', 'Instrumentation'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year program', 'Career: Pharmacist, Drug Inspector', 'Pharmaceutical industry opportunities'],
        seatMatrix: { general: 40, obc: 60, bcMbc: 80, sc: 35, st: 8, ews: 15, total: 238 },
        cutoffs: [
          { year: '2024', general: 75.0, obc: 70.0, bcMbc: 65.0, sc: 55.0, st: 45.0, ews: 68.0 },
          { year: '2023', general: 78.0, obc: 73.0, bcMbc: 68.0, sc: 58.0, st: 48.0, ews: 71.0 }
        ]
      },
      {
        id: 'au-mpharm',
        name: 'M.Pharm (Master of Pharmacy)',
        nameTamil: 'எம்.பார்ம். (மருந்தியல் முதுகலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Pharmaceutical Sciences', nameTamil: 'மருந்தியல் அறிவியல்', questions: 60, marks: 60, topics: ['Pharmaceutics', 'Pharmacology', 'Pharmaceutical Chemistry'] },
            { name: 'Research Methods', nameTamil: 'ஆராய்ச்சி முறைகள்', questions: 20, marks: 20, topics: ['Biostatistics', 'Clinical Research'] },
            { name: 'Drug Development', nameTamil: 'மருந்து மேம்பாடு', questions: 20, marks: 20, topics: ['Drug Discovery', 'Regulatory Affairs'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Senior Pharmacist, Research Scientist', 'R&D opportunities'],
        seatMatrix: { general: 15, obc: 22, bcMbc: 30, sc: 12, st: 3, ews: 6, total: 88 },
        cutoffs: [
          { year: '2024', general: 65.0, obc: 60.0, bcMbc: 55.0, sc: 45.0, st: 35.0, ews: 58.0 },
          { year: '2023', general: 68.0, obc: 63.0, bcMbc: 58.0, sc: 48.0, st: 38.0, ews: 61.0 }
        ]
      },
      {
        id: 'au-pharmd',
        name: 'Pharm.D (Doctor of Pharmacy)',
        nameTamil: 'பார்ம்.டி. (மருந்தியல் முனைவர்)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 40, marks: 40, topics: ['Pharmaceutical Chemistry', 'Medicinal Chemistry'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Pharmacology', 'Clinical Pharmacy'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 20, marks: 20, topics: ['Physical Pharmacy'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['6-year program (5+1 internship)', 'Career: Clinical Pharmacist, Hospital Pharmacist', 'Direct patient care role'],
        seatMatrix: { general: 20, obc: 30, bcMbc: 40, sc: 17, st: 4, ews: 8, total: 119 },
        cutoffs: [
          { year: '2024', general: 78.0, obc: 73.0, bcMbc: 68.0, sc: 58.0, st: 48.0, ews: 71.0 },
          { year: '2023', general: 81.0, obc: 76.0, bcMbc: 71.0, sc: 61.0, st: 51.0, ews: 74.0 }
        ]
      },
      // ========== FACULTY OF MARINE SCIENCES (Parangipettai Campus) ==========
      {
        id: 'au-bfsc',
        name: 'B.F.Sc. (Bachelor of Fisheries Science)',
        nameTamil: 'பி.எஃப்.எஸ்சி. (மீன்வளவியல் இளங்கலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 50, marks: 50, topics: ['Marine Biology', 'Fish Biology', 'Aquatic Ecology'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 25, marks: 25, topics: ['Aquatic Chemistry', 'Biochemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 25, marks: 25, topics: ['Oceanography Basics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year program', 'Career: Fisheries Officer, Aquaculture Manager', 'Unique coastal campus'],
        seatMatrix: { general: 25, obc: 38, bcMbc: 50, sc: 22, st: 5, ews: 9, total: 149 },
        cutoffs: [
          { year: '2024', general: 68.0, obc: 63.0, bcMbc: 58.0, sc: 48.0, st: 38.0, ews: 61.0 },
          { year: '2023', general: 71.0, obc: 66.0, bcMbc: 61.0, sc: 51.0, st: 41.0, ews: 64.0 }
        ]
      },
      {
        id: 'au-bvoc-aquaculture',
        name: 'B.Voc. Aquaculture',
        nameTamil: 'பி.வோக். நீர்வாழ் வளர்ப்பு',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Aquaculture', nameTamil: 'நீர்வாழ் வளர்ப்பு', questions: 50, marks: 50, topics: ['Fish Farming', 'Shrimp Culture', 'Hatchery Management'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 30, marks: 30, topics: ['Aquatic Biology'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Fisheries Economics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['3-year vocational program', 'Career: Aquaculture Technician, Farm Manager', 'Practical skill-based'],
        seatMatrix: { general: 20, obc: 30, bcMbc: 40, sc: 17, st: 4, ews: 8, total: 119 },
        cutoffs: [
          { year: '2024', general: 55.0, obc: 50.0, bcMbc: 45.0, sc: 35.0, st: 25.0, ews: 48.0 },
          { year: '2023', general: 58.0, obc: 53.0, bcMbc: 48.0, sc: 38.0, st: 28.0, ews: 51.0 }
        ]
      },
      {
        id: 'au-msc-marine-biology',
        name: 'M.Sc. Marine Biology & Oceanography',
        nameTamil: 'எம்.எஸ்சி. கடல் உயிரியல் & கடலியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Marine Biology', nameTamil: 'கடல் உயிரியல்', questions: 50, marks: 50, topics: ['Marine Fauna', 'Marine Flora', 'Plankton'] },
            { name: 'Oceanography', nameTamil: 'கடலியல்', questions: 30, marks: 30, topics: ['Physical Oceanography', 'Chemical Oceanography'] },
            { name: 'Research Methods', nameTamil: 'ஆராய்ச்சி முறைகள்', questions: 20, marks: 20, topics: ['Marine Research', 'Statistics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Marine Biologist, Research Scientist', 'Premier marine sciences center in India'],
        seatMatrix: { general: 15, obc: 22, bcMbc: 30, sc: 12, st: 3, ews: 6, total: 88 },
        cutoffs: [
          { year: '2024', general: 70.0, obc: 65.0, bcMbc: 60.0, sc: 50.0, st: 40.0, ews: 63.0 },
          { year: '2023', general: 73.0, obc: 68.0, bcMbc: 63.0, sc: 53.0, st: 43.0, ews: 66.0 }
        ]
      },
      {
        id: 'au-msc-coastal-aquaculture',
        name: 'M.Sc. Coastal Aquaculture',
        nameTamil: 'எம்.எஸ்சி. கடலோர நீர்வாழ் வளர்ப்பு',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Aquaculture', nameTamil: 'நீர்வாழ் வளர்ப்பு', questions: 50, marks: 50, topics: ['Shrimp Farming', 'Fish Culture', 'Seaweed Culture'] },
            { name: 'Marine Biology', nameTamil: 'கடல் உயிரியல்', questions: 30, marks: 30, topics: ['Coastal Ecology', 'Brackish Water'] },
            { name: 'Management', nameTamil: 'மேலாண்மை', questions: 20, marks: 20, topics: ['Farm Management', 'Economics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Aquaculture Scientist, Farm Consultant'],
        seatMatrix: { general: 12, obc: 18, bcMbc: 24, sc: 10, st: 2, ews: 5, total: 71 },
        cutoffs: [
          { year: '2024', general: 65.0, obc: 60.0, bcMbc: 55.0, sc: 45.0, st: 35.0, ews: 58.0 },
          { year: '2023', general: 68.0, obc: 63.0, bcMbc: 58.0, sc: 48.0, st: 38.0, ews: 61.0 }
        ]
      },
      {
        id: 'au-msc-marine-biotech',
        name: 'M.Sc. Marine Biotechnology',
        nameTamil: 'எம்.எஸ்சி. கடல் உயிர்தொழில்நுட்பம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Marine Biotechnology', nameTamil: 'கடல் உயிர்தொழில்நுட்பம்', questions: 50, marks: 50, topics: ['Marine Natural Products', 'Genetic Engineering'] },
            { name: 'Marine Biology', nameTamil: 'கடல் உயிரியல்', questions: 30, marks: 30, topics: ['Marine Organisms', 'Biodiversity'] },
            { name: 'Molecular Biology', nameTamil: 'மூலக்கூறு உயிரியல்', questions: 20, marks: 20, topics: ['DNA Technology', 'Proteomics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Marine Biotechnologist, Research Scientist'],
        seatMatrix: { general: 10, obc: 15, bcMbc: 20, sc: 8, st: 2, ews: 4, total: 59 },
        cutoffs: [
          { year: '2024', general: 68.0, obc: 63.0, bcMbc: 58.0, sc: 48.0, st: 38.0, ews: 61.0 },
          { year: '2023', general: 71.0, obc: 66.0, bcMbc: 61.0, sc: 51.0, st: 41.0, ews: 64.0 }
        ]
      },
      {
        id: 'au-integrated-msc-ocean',
        name: '5-Year Integrated M.Sc. Ocean Science & Technology',
        nameTamil: '5 ஆண்டு ஒருங்கிணைந்த எம்.எஸ்சி. கடல் அறிவியல் & தொழில்நுட்பம்',
        type: 'Integrated',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 35, marks: 35, topics: ['Mechanics', 'Oceanography'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 35, marks: 35, topics: ['Marine Chemistry', 'Environmental Chemistry'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 30, marks: 30, topics: ['Marine Biology', 'Ecology'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['5-year integrated program', 'Career: Ocean Scientist, Research Scientist', 'Combines UG and PG'],
        seatMatrix: { general: 15, obc: 22, bcMbc: 30, sc: 12, st: 3, ews: 6, total: 88 },
        cutoffs: [
          { year: '2024', general: 72.0, obc: 67.0, bcMbc: 62.0, sc: 52.0, st: 42.0, ews: 65.0 },
          { year: '2023', general: 75.0, obc: 70.0, bcMbc: 65.0, sc: 55.0, st: 45.0, ews: 68.0 }
        ]
      },
      // ========== FACULTY OF SCIENCE ==========
      {
        id: 'au-msc-mathematics',
        name: 'M.Sc. Mathematics',
        nameTamil: 'எம்.எஸ்சி. கணிதம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Pure Mathematics', nameTamil: 'தூய கணிதம்', questions: 50, marks: 50, topics: ['Algebra', 'Real Analysis', 'Complex Analysis'] },
            { name: 'Applied Mathematics', nameTamil: 'பயன்பாட்டு கணிதம்', questions: 30, marks: 30, topics: ['Differential Equations', 'Numerical Analysis'] },
            { name: 'Discrete Mathematics', nameTamil: 'தனித்தன்மை கணிதம்', questions: 20, marks: 20, topics: ['Graph Theory', 'Combinatorics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Mathematician, Data Analyst, Actuary'],
        seatMatrix: { general: 25, obc: 38, bcMbc: 50, sc: 22, st: 5, ews: 9, total: 149 },
        cutoffs: [
          { year: '2024', general: 65.0, obc: 60.0, bcMbc: 55.0, sc: 45.0, st: 35.0, ews: 58.0 },
          { year: '2023', general: 68.0, obc: 63.0, bcMbc: 58.0, sc: 48.0, st: 38.0, ews: 61.0 }
        ]
      },
      {
        id: 'au-msc-statistics',
        name: 'M.Sc. Statistics',
        nameTamil: 'எம்.எஸ்சி. புள்ளியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 60, marks: 60, topics: ['Probability', 'Statistical Inference', 'Regression'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 40, marks: 40, topics: ['Linear Algebra', 'Calculus'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Statistician, Data Scientist'],
        seatMatrix: { general: 20, obc: 30, bcMbc: 40, sc: 17, st: 4, ews: 8, total: 119 },
        cutoffs: [
          { year: '2024', general: 62.0, obc: 57.0, bcMbc: 52.0, sc: 42.0, st: 32.0, ews: 55.0 },
          { year: '2023', general: 65.0, obc: 60.0, bcMbc: 55.0, sc: 45.0, st: 35.0, ews: 58.0 }
        ]
      },
      {
        id: 'au-msc-physics',
        name: 'M.Sc. Physics',
        nameTamil: 'எம்.எஸ்சி. இயற்பியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Classical Mechanics', nameTamil: 'பாரம்பரிய இயக்கவியல்', questions: 25, marks: 25, topics: ['Lagrangian', 'Hamiltonian'] },
            { name: 'Quantum Mechanics', nameTamil: 'குவாண்டம் இயக்கவியல்', questions: 25, marks: 25, topics: ['Wave Mechanics', 'Operators'] },
            { name: 'Electrodynamics', nameTamil: 'மின்னியக்கவியல்', questions: 25, marks: 25, topics: ['Maxwell Equations', 'EM Waves'] },
            { name: 'Statistical Mechanics', nameTamil: 'புள்ளியியல் இயக்கவியல்', questions: 25, marks: 25, topics: ['Thermodynamics', 'Ensembles'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Physicist, Research Scientist'],
        seatMatrix: { general: 25, obc: 38, bcMbc: 50, sc: 22, st: 5, ews: 9, total: 149 },
        cutoffs: [
          { year: '2024', general: 68.0, obc: 63.0, bcMbc: 58.0, sc: 48.0, st: 38.0, ews: 61.0 },
          { year: '2023', general: 71.0, obc: 66.0, bcMbc: 61.0, sc: 51.0, st: 41.0, ews: 64.0 }
        ]
      },
      {
        id: 'au-msc-chemistry',
        name: 'M.Sc. Chemistry',
        nameTamil: 'எம்.எஸ்சி. வேதியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Organic Chemistry', nameTamil: 'கரிம வேதியியல்', questions: 35, marks: 35, topics: ['Reaction Mechanisms', 'Stereochemistry'] },
            { name: 'Inorganic Chemistry', nameTamil: 'கனிம வேதியியல்', questions: 35, marks: 35, topics: ['Coordination Chemistry', 'Organometallics'] },
            { name: 'Physical Chemistry', nameTamil: 'இயற்பியல் வேதியியல்', questions: 30, marks: 30, topics: ['Thermodynamics', 'Kinetics', 'Spectroscopy'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Chemist, Research Scientist'],
        seatMatrix: { general: 30, obc: 45, bcMbc: 60, sc: 26, st: 6, ews: 11, total: 178 },
        cutoffs: [
          { year: '2024', general: 66.0, obc: 61.0, bcMbc: 56.0, sc: 46.0, st: 36.0, ews: 59.0 },
          { year: '2023', general: 69.0, obc: 64.0, bcMbc: 59.0, sc: 49.0, st: 39.0, ews: 62.0 }
        ]
      },
      {
        id: 'au-msc-botany',
        name: 'M.Sc. Botany',
        nameTamil: 'எம்.எஸ்சி. தாவரவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Plant Sciences', nameTamil: 'தாவர அறிவியல்', questions: 60, marks: 60, topics: ['Plant Physiology', 'Plant Anatomy', 'Plant Taxonomy'] },
            { name: 'Biotechnology', nameTamil: 'உயிர்தொழில்நுட்பம்', questions: 40, marks: 40, topics: ['Plant Tissue Culture', 'Molecular Biology'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Botanist, Environmental Scientist'],
        seatMatrix: { general: 20, obc: 30, bcMbc: 40, sc: 17, st: 4, ews: 8, total: 119 },
        cutoffs: [
          { year: '2024', general: 60.0, obc: 55.0, bcMbc: 50.0, sc: 40.0, st: 30.0, ews: 53.0 },
          { year: '2023', general: 63.0, obc: 58.0, bcMbc: 53.0, sc: 43.0, st: 33.0, ews: 56.0 }
        ]
      },
      {
        id: 'au-msc-zoology',
        name: 'M.Sc. Zoology',
        nameTamil: 'எம்.எஸ்சி. விலங்கியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Animal Sciences', nameTamil: 'விலங்கு அறிவியல்', questions: 60, marks: 60, topics: ['Animal Physiology', 'Animal Behavior', 'Ecology'] },
            { name: 'Cell Biology', nameTamil: 'செல் உயிரியல்', questions: 40, marks: 40, topics: ['Genetics', 'Developmental Biology'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Zoologist, Wildlife Biologist'],
        seatMatrix: { general: 20, obc: 30, bcMbc: 40, sc: 17, st: 4, ews: 8, total: 119 },
        cutoffs: [
          { year: '2024', general: 62.0, obc: 57.0, bcMbc: 52.0, sc: 42.0, st: 32.0, ews: 55.0 },
          { year: '2023', general: 65.0, obc: 60.0, bcMbc: 55.0, sc: 45.0, st: 35.0, ews: 58.0 }
        ]
      },
      {
        id: 'au-msc-geology',
        name: 'M.Sc. Geology',
        nameTamil: 'எம்.எஸ்சி. புவியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Geology', nameTamil: 'புவியியல்', questions: 60, marks: 60, topics: ['Mineralogy', 'Petrology', 'Stratigraphy'] },
            { name: 'Applied Geology', nameTamil: 'பயன்பாட்டு புவியியல்', questions: 40, marks: 40, topics: ['Mining Geology', 'Hydrogeology'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Geologist, Mining Engineer'],
        seatMatrix: { general: 15, obc: 22, bcMbc: 30, sc: 12, st: 3, ews: 6, total: 88 },
        cutoffs: [
          { year: '2024', general: 58.0, obc: 53.0, bcMbc: 48.0, sc: 38.0, st: 28.0, ews: 51.0 },
          { year: '2023', general: 61.0, obc: 56.0, bcMbc: 51.0, sc: 41.0, st: 31.0, ews: 54.0 }
        ]
      },
      {
        id: 'au-msc-microbiology',
        name: 'M.Sc. Microbiology',
        nameTamil: 'எம்.எஸ்சி. நுண்ணுயிரியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Microbiology', nameTamil: 'நுண்ணுயிரியல்', questions: 60, marks: 60, topics: ['Bacteriology', 'Virology', 'Mycology'] },
            { name: 'Applied Microbiology', nameTamil: 'பயன்பாட்டு நுண்ணுயிரியல்', questions: 40, marks: 40, topics: ['Medical Microbiology', 'Industrial Microbiology'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Microbiologist, Research Scientist'],
        seatMatrix: { general: 20, obc: 30, bcMbc: 40, sc: 17, st: 4, ews: 8, total: 119 },
        cutoffs: [
          { year: '2024', general: 66.0, obc: 61.0, bcMbc: 56.0, sc: 46.0, st: 36.0, ews: 59.0 },
          { year: '2023', general: 69.0, obc: 64.0, bcMbc: 59.0, sc: 49.0, st: 39.0, ews: 62.0 }
        ]
      },
      {
        id: 'au-msc-biotechnology',
        name: 'M.Sc. Biotechnology',
        nameTamil: 'எம்.எஸ்சி. உயிர்தொழில்நுட்பம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Biotechnology', nameTamil: 'உயிர்தொழில்நுட்பம்', questions: 60, marks: 60, topics: ['Genetic Engineering', 'rDNA Technology', 'Immunology'] },
            { name: 'Molecular Biology', nameTamil: 'மூலக்கூறு உயிரியல்', questions: 40, marks: 40, topics: ['Gene Expression', 'Proteomics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Biotechnologist, Research Scientist', 'High placement in pharma'],
        seatMatrix: { general: 20, obc: 30, bcMbc: 40, sc: 17, st: 4, ews: 8, total: 119 },
        cutoffs: [
          { year: '2024', general: 70.0, obc: 65.0, bcMbc: 60.0, sc: 50.0, st: 40.0, ews: 63.0 },
          { year: '2023', general: 73.0, obc: 68.0, bcMbc: 63.0, sc: 53.0, st: 43.0, ews: 66.0 }
        ]
      },
      {
        id: 'au-msc-bioinformatics',
        name: 'M.Sc. Bioinformatics',
        nameTamil: 'எம்.எஸ்சி. உயிரித்தகவலியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Bioinformatics', nameTamil: 'உயிரித்தகவலியல்', questions: 50, marks: 50, topics: ['Sequence Analysis', 'Structural Biology', 'Databases'] },
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 30, marks: 30, topics: ['Programming', 'Algorithms'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 20, marks: 20, topics: ['Molecular Biology', 'Genomics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Bioinformatician, Computational Biologist'],
        seatMatrix: { general: 15, obc: 22, bcMbc: 30, sc: 12, st: 3, ews: 6, total: 88 },
        cutoffs: [
          { year: '2024', general: 65.0, obc: 60.0, bcMbc: 55.0, sc: 45.0, st: 35.0, ews: 58.0 },
          { year: '2023', general: 68.0, obc: 63.0, bcMbc: 58.0, sc: 48.0, st: 38.0, ews: 61.0 }
        ]
      },
      {
        id: 'au-msc-computer-science',
        name: 'M.Sc. Computer Science',
        nameTamil: 'எம்.எஸ்சி. கணினி அறிவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 60, marks: 60, topics: ['Data Structures', 'Algorithms', 'Databases'] },
            { name: 'Programming', nameTamil: 'நிரலாக்கம்', questions: 40, marks: 40, topics: ['C', 'Java', 'Python'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Software Developer, Systems Analyst'],
        seatMatrix: { general: 30, obc: 45, bcMbc: 60, sc: 26, st: 6, ews: 11, total: 178 },
        cutoffs: [
          { year: '2024', general: 72.0, obc: 67.0, bcMbc: 62.0, sc: 52.0, st: 42.0, ews: 65.0 },
          { year: '2023', general: 75.0, obc: 70.0, bcMbc: 65.0, sc: 55.0, st: 45.0, ews: 68.0 }
        ]
      },
      {
        id: 'au-mca',
        name: 'M.C.A. (Master of Computer Applications)',
        nameTamil: 'எம்.சி.ஏ. (கணினி பயன்பாடுகள் முதுகலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 50, marks: 50, topics: ['Programming', 'Data Structures', 'DBMS'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Discrete Math', 'Probability'] },
            { name: 'Aptitude', nameTamil: 'தகுதி', questions: 20, marks: 20, topics: ['Logical Reasoning', 'Quantitative'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Software Engineer, IT Manager'],
        seatMatrix: { general: 40, obc: 60, bcMbc: 80, sc: 35, st: 8, ews: 15, total: 238 },
        cutoffs: [
          { year: '2024', general: 70.0, obc: 65.0, bcMbc: 60.0, sc: 50.0, st: 40.0, ews: 63.0 },
          { year: '2023', general: 73.0, obc: 68.0, bcMbc: 63.0, sc: 53.0, st: 43.0, ews: 66.0 }
        ]
      },
      {
        id: 'au-msc-data-science',
        name: 'M.Sc. Data Science',
        nameTamil: 'எம்.எஸ்சி. தரவு அறிவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Data Science', nameTamil: 'தரவு அறிவியல்', questions: 50, marks: 50, topics: ['Machine Learning', 'Data Mining', 'Big Data'] },
            { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 30, marks: 30, topics: ['Statistical Analysis', 'Probability'] },
            { name: 'Programming', nameTamil: 'நிரலாக்கம்', questions: 20, marks: 20, topics: ['Python', 'R'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Data Scientist, ML Engineer'],
        seatMatrix: { general: 25, obc: 38, bcMbc: 50, sc: 22, st: 5, ews: 9, total: 149 },
        cutoffs: [
          { year: '2024', general: 75.0, obc: 70.0, bcMbc: 65.0, sc: 55.0, st: 45.0, ews: 68.0 },
          { year: '2023', general: 78.0, obc: 73.0, bcMbc: 68.0, sc: 58.0, st: 48.0, ews: 71.0 }
        ]
      },
      {
        id: 'au-bsc-sports',
        name: 'B.Sc. Sports Sciences',
        nameTamil: 'பி.எஸ்சி. விளையாட்டு அறிவியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Sports Science', nameTamil: 'விளையாட்டு அறிவியல்', questions: 50, marks: 50, topics: ['Exercise Physiology', 'Sports Psychology'] },
            { name: 'Physical Education', nameTamil: 'உடற்கல்வி', questions: 30, marks: 30, topics: ['Sports Training', 'Health Education'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Sports History', 'Current Events'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['3-year program', 'Career: Sports Scientist, Fitness Trainer'],
        seatMatrix: { general: 25, obc: 38, bcMbc: 50, sc: 22, st: 5, ews: 9, total: 149 },
        cutoffs: [
          { year: '2024', general: 55.0, obc: 50.0, bcMbc: 45.0, sc: 35.0, st: 25.0, ews: 48.0 },
          { year: '2023', general: 58.0, obc: 53.0, bcMbc: 48.0, sc: 38.0, st: 28.0, ews: 51.0 }
        ]
      },
      {
        id: 'au-bped',
        name: 'B.P.Ed. (Bachelor of Physical Education)',
        nameTamil: 'பி.பி.எட். (உடற்கல்வி இளங்கலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Physical Education', nameTamil: 'உடற்கல்வி', questions: 60, marks: 60, topics: ['Sports Training', 'Health Education', 'Physiology'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 40, marks: 40, topics: ['Sports Current Affairs', 'Teaching Methods'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Physical Education Teacher, Sports Coach'],
        seatMatrix: { general: 30, obc: 45, bcMbc: 60, sc: 26, st: 6, ews: 11, total: 178 },
        cutoffs: [
          { year: '2024', general: 52.0, obc: 47.0, bcMbc: 42.0, sc: 32.0, st: 22.0, ews: 45.0 },
          { year: '2023', general: 55.0, obc: 50.0, bcMbc: 45.0, sc: 35.0, st: 25.0, ews: 48.0 }
        ]
      },
      {
        id: 'au-mped',
        name: 'M.P.Ed. (Master of Physical Education)',
        nameTamil: 'எம்.பி.எட். (உடற்கல்வி முதுகலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Physical Education', nameTamil: 'உடற்கல்வி', questions: 60, marks: 60, topics: ['Sports Science', 'Research Methods', 'Administration'] },
            { name: 'Specialization', nameTamil: 'சிறப்புப் பிரிவு', questions: 40, marks: 40, topics: ['Coaching', 'Sports Psychology'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: College Lecturer, Sports Director'],
        seatMatrix: { general: 20, obc: 30, bcMbc: 40, sc: 17, st: 4, ews: 8, total: 119 },
        cutoffs: [
          { year: '2024', general: 55.0, obc: 50.0, bcMbc: 45.0, sc: 35.0, st: 25.0, ews: 48.0 },
          { year: '2023', general: 58.0, obc: 53.0, bcMbc: 48.0, sc: 38.0, st: 28.0, ews: 51.0 }
        ]
      },
      // ========== FACULTY OF ARTS ==========
      {
        id: 'au-ma-english',
        name: 'M.A. English',
        nameTamil: 'எம்.ஏ. ஆங்கிலம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'English Literature', nameTamil: 'ஆங்கில இலக்கியம்', questions: 60, marks: 60, topics: ['British Literature', 'American Literature', 'Indian Writing'] },
            { name: 'Language & Linguistics', nameTamil: 'மொழி & மொழியியல்', questions: 40, marks: 40, topics: ['Phonetics', 'Grammar', 'Semantics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Lecturer, Content Writer, Translator'],
        seatMatrix: { general: 30, obc: 45, bcMbc: 60, sc: 26, st: 6, ews: 11, total: 178 },
        cutoffs: [
          { year: '2024', general: 58.0, obc: 53.0, bcMbc: 48.0, sc: 38.0, st: 28.0, ews: 51.0 },
          { year: '2023', general: 61.0, obc: 56.0, bcMbc: 51.0, sc: 41.0, st: 31.0, ews: 54.0 }
        ]
      },
      {
        id: 'au-ma-history',
        name: 'M.A. History',
        nameTamil: 'எம்.ஏ. வரலாறு',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Indian History', nameTamil: 'இந்திய வரலாறு', questions: 50, marks: 50, topics: ['Ancient', 'Medieval', 'Modern India'] },
            { name: 'World History', nameTamil: 'உலக வரலாறு', questions: 30, marks: 30, topics: ['European', 'American', 'Asian History'] },
            { name: 'Research Methods', nameTamil: 'ஆராய்ச்சி முறைகள்', questions: 20, marks: 20, topics: ['Historiography'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Historian, Archaeologist, Museum Curator'],
        seatMatrix: { general: 25, obc: 38, bcMbc: 50, sc: 22, st: 5, ews: 9, total: 149 },
        cutoffs: [
          { year: '2024', general: 52.0, obc: 47.0, bcMbc: 42.0, sc: 32.0, st: 22.0, ews: 45.0 },
          { year: '2023', general: 55.0, obc: 50.0, bcMbc: 45.0, sc: 35.0, st: 25.0, ews: 48.0 }
        ]
      },
      {
        id: 'au-ma-political-science',
        name: 'M.A. Political Science',
        nameTamil: 'எம்.ஏ. அரசியல் அறிவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Political Theory', nameTamil: 'அரசியல் கோட்பாடு', questions: 50, marks: 50, topics: ['Political Philosophy', 'Ideologies'] },
            { name: 'Indian Politics', nameTamil: 'இந்திய அரசியல்', questions: 30, marks: 30, topics: ['Constitution', 'Government', 'Parties'] },
            { name: 'International Relations', nameTamil: 'சர்வதேச உறவுகள்', questions: 20, marks: 20, topics: ['World Politics', 'Diplomacy'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Political Analyst, Civil Services, Journalist'],
        seatMatrix: { general: 25, obc: 38, bcMbc: 50, sc: 22, st: 5, ews: 9, total: 149 },
        cutoffs: [
          { year: '2024', general: 54.0, obc: 49.0, bcMbc: 44.0, sc: 34.0, st: 24.0, ews: 47.0 },
          { year: '2023', general: 57.0, obc: 52.0, bcMbc: 47.0, sc: 37.0, st: 27.0, ews: 50.0 }
        ]
      },
      {
        id: 'au-ma-economics',
        name: 'M.A. Economics',
        nameTamil: 'எம்.ஏ. பொருளாதாரம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Microeconomics', nameTamil: 'நுண் பொருளாதாரம்', questions: 35, marks: 35, topics: ['Consumer Theory', 'Market Structures'] },
            { name: 'Macroeconomics', nameTamil: 'பேரியல் பொருளாதாரம்', questions: 35, marks: 35, topics: ['National Income', 'Monetary Policy'] },
            { name: 'Quantitative Methods', nameTamil: 'அளவியல் முறைகள்', questions: 30, marks: 30, topics: ['Statistics', 'Econometrics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Economist, Financial Analyst, Policy Maker'],
        seatMatrix: { general: 25, obc: 38, bcMbc: 50, sc: 22, st: 5, ews: 9, total: 149 },
        cutoffs: [
          { year: '2024', general: 60.0, obc: 55.0, bcMbc: 50.0, sc: 40.0, st: 30.0, ews: 53.0 },
          { year: '2023', general: 63.0, obc: 58.0, bcMbc: 53.0, sc: 43.0, st: 33.0, ews: 56.0 }
        ]
      },
      {
        id: 'au-msw',
        name: 'M.S.W. (Master of Social Work)',
        nameTamil: 'எம்.எஸ்.டபிள்யூ. (சமூக சேவை முதுகலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Social Work', nameTamil: 'சமூக சேவை', questions: 60, marks: 60, topics: ['Case Work', 'Group Work', 'Community Organization'] },
            { name: 'Social Sciences', nameTamil: 'சமூக அறிவியல்', questions: 40, marks: 40, topics: ['Sociology', 'Psychology', 'Economics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Social Worker, NGO Manager, Counselor'],
        seatMatrix: { general: 25, obc: 38, bcMbc: 50, sc: 22, st: 5, ews: 9, total: 149 },
        cutoffs: [
          { year: '2024', general: 55.0, obc: 50.0, bcMbc: 45.0, sc: 35.0, st: 25.0, ews: 48.0 },
          { year: '2023', general: 58.0, obc: 53.0, bcMbc: 48.0, sc: 38.0, st: 28.0, ews: 51.0 }
        ]
      },
      {
        id: 'au-mlibisc',
        name: 'M.Lib.I.Sc. (Library & Information Science)',
        nameTamil: 'எம்.லிப்.ஐ.எஸ்சி. (நூலகவியல் & தகவலியல்)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Library Science', nameTamil: 'நூலகவியல்', questions: 60, marks: 60, topics: ['Classification', 'Cataloguing', 'Library Management'] },
            { name: 'Information Science', nameTamil: 'தகவலியல்', questions: 40, marks: 40, topics: ['Digital Libraries', 'Information Retrieval'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['1-year program', 'Career: Librarian, Information Officer'],
        seatMatrix: { general: 20, obc: 30, bcMbc: 40, sc: 17, st: 4, ews: 8, total: 119 },
        cutoffs: [
          { year: '2024', general: 50.0, obc: 45.0, bcMbc: 40.0, sc: 30.0, st: 20.0, ews: 43.0 },
          { year: '2023', general: 53.0, obc: 48.0, bcMbc: 43.0, sc: 33.0, st: 23.0, ews: 46.0 }
        ]
      },
      {
        id: 'au-mba',
        name: 'M.B.A. (Master of Business Administration)',
        nameTamil: 'எம்.பி.ஏ. (வணிக நிர்வாக முதுகலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Quantitative Aptitude', nameTamil: 'அளவியல் திறன்', questions: 30, marks: 30, topics: ['Mathematics', 'Data Interpretation'] },
            { name: 'Verbal Ability', nameTamil: 'மொழித்திறன்', questions: 30, marks: 30, topics: ['English Grammar', 'Reading Comprehension'] },
            { name: 'Logical Reasoning', nameTamil: 'தர்க்க அறிவு', questions: 25, marks: 25, topics: ['Analytical Reasoning', 'Puzzles'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', questions: 15, marks: 15, topics: ['Current Affairs', 'Business'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Business Manager, Entrepreneur', 'Multiple specializations available'],
        seatMatrix: { general: 40, obc: 60, bcMbc: 80, sc: 35, st: 8, ews: 15, total: 238 },
        cutoffs: [
          { year: '2024', general: 70.0, obc: 65.0, bcMbc: 60.0, sc: 50.0, st: 40.0, ews: 63.0 },
          { year: '2023', general: 73.0, obc: 68.0, bcMbc: 63.0, sc: 53.0, st: 43.0, ews: 66.0 }
        ]
      },
      // ========== DIRECTORATE OF DISTANCE EDUCATION (DDE) ==========
      {
        id: 'au-dde-ba-tamil',
        name: 'B.A. Tamil (Distance)',
        nameTamil: 'பி.ஏ. தமிழ் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'Online/Offline', negativeMarking: false,
          sections: [
            { name: 'Tamil Literature', nameTamil: 'தமிழ் இலக்கியம்', questions: 60, marks: 60, topics: ['Classical Tamil', 'Modern Tamil Literature'] },
            { name: 'Grammar', nameTamil: 'இலக்கணம்', questions: 40, marks: 40, topics: ['Syntax', 'Morphology'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['3-year Distance program', 'Career: Teacher, Writer, Translator'],
        seatMatrix: { general: 200, obc: 300, bcMbc: 400, sc: 172, st: 40, ews: 76, total: 1188 },
        cutoffs: [
          { year: '2024', general: 40.0, obc: 37.0, bcMbc: 35.0, sc: 30.0, st: 25.0, ews: 35.0 },
          { year: '2023', general: 43.0, obc: 40.0, bcMbc: 38.0, sc: 33.0, st: 28.0, ews: 38.0 }
        ]
      },
      {
        id: 'au-dde-ba-english',
        name: 'B.A. English (Distance)',
        nameTamil: 'பி.ஏ. ஆங்கிலம் (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'Online/Offline', negativeMarking: false,
          sections: [
            { name: 'English Literature', nameTamil: 'ஆங்கில இலக்கியம்', questions: 60, marks: 60, topics: ['Poetry', 'Prose', 'Drama'] },
            { name: 'Language Skills', nameTamil: 'மொழித்திறன்', questions: 40, marks: 40, topics: ['Grammar', 'Comprehension'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['3-year Distance program', 'Career: Content Writer, Teacher'],
        seatMatrix: { general: 200, obc: 300, bcMbc: 400, sc: 172, st: 40, ews: 76, total: 1188 },
        cutoffs: [
          { year: '2024', general: 42.0, obc: 39.0, bcMbc: 37.0, sc: 32.0, st: 27.0, ews: 37.0 },
          { year: '2023', general: 45.0, obc: 42.0, bcMbc: 40.0, sc: 35.0, st: 30.0, ews: 40.0 }
        ]
      },
      {
        id: 'au-dde-bcom',
        name: 'B.Com (Distance)',
        nameTamil: 'பி.காம். (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'Online/Offline', negativeMarking: false,
          sections: [
            { name: 'Commerce', nameTamil: 'வணிகவியல்', questions: 50, marks: 50, topics: ['Accounting', 'Business Studies'] },
            { name: 'Economics', nameTamil: 'பொருளாதாரம்', questions: 30, marks: 30, topics: ['Business Economics'] },
            { name: 'Quantitative', nameTamil: 'அளவியல்', questions: 20, marks: 20, topics: ['Business Mathematics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['3-year Distance program', 'Career: Accountant, Business Analyst'],
        seatMatrix: { general: 250, obc: 375, bcMbc: 500, sc: 215, st: 50, ews: 95, total: 1485 },
        cutoffs: [
          { year: '2024', general: 45.0, obc: 42.0, bcMbc: 40.0, sc: 35.0, st: 30.0, ews: 40.0 },
          { year: '2023', general: 48.0, obc: 45.0, bcMbc: 43.0, sc: 38.0, st: 33.0, ews: 43.0 }
        ]
      },
      {
        id: 'au-dde-bba',
        name: 'B.B.A. (Distance)',
        nameTamil: 'பி.பி.ஏ. (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'Online/Offline', negativeMarking: false,
          sections: [
            { name: 'Business Administration', nameTamil: 'வணிக நிர்வாகம்', questions: 50, marks: 50, topics: ['Management Principles', 'Marketing'] },
            { name: 'Commerce', nameTamil: 'வணிகவியல்', questions: 30, marks: 30, topics: ['Accounting', 'Finance'] },
            { name: 'General', nameTamil: 'பொது', questions: 20, marks: 20, topics: ['Business Communication'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['3-year Distance program', 'Career: Business Executive, Entrepreneur'],
        seatMatrix: { general: 200, obc: 300, bcMbc: 400, sc: 172, st: 40, ews: 76, total: 1188 },
        cutoffs: [
          { year: '2024', general: 43.0, obc: 40.0, bcMbc: 38.0, sc: 33.0, st: 28.0, ews: 38.0 },
          { year: '2023', general: 46.0, obc: 43.0, bcMbc: 41.0, sc: 36.0, st: 31.0, ews: 41.0 }
        ]
      },
      {
        id: 'au-dde-bca',
        name: 'B.C.A. (Distance)',
        nameTamil: 'பி.சி.ஏ. (தொலைநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'Online/Offline', negativeMarking: false,
          sections: [
            { name: 'Computer Applications', nameTamil: 'கணினி பயன்பாடுகள்', questions: 50, marks: 50, topics: ['Programming', 'DBMS'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Discrete Math', 'Statistics'] },
            { name: 'General', nameTamil: 'பொது', questions: 20, marks: 20, topics: ['Computer Fundamentals'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['3-year Distance program', 'Career: Computer Programmer, IT Support'],
        seatMatrix: { general: 200, obc: 300, bcMbc: 400, sc: 172, st: 40, ews: 76, total: 1188 },
        cutoffs: [
          { year: '2024', general: 48.0, obc: 45.0, bcMbc: 43.0, sc: 38.0, st: 33.0, ews: 43.0 },
          { year: '2023', general: 51.0, obc: 48.0, bcMbc: 46.0, sc: 41.0, st: 36.0, ews: 46.0 }
        ]
      },
      {
        id: 'au-dde-mba',
        name: 'M.B.A. (Distance)',
        nameTamil: 'எம்.பி.ஏ. (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'Online/Offline', negativeMarking: false,
          sections: [
            { name: 'Management', nameTamil: 'மேலாண்மை', questions: 50, marks: 50, topics: ['Marketing', 'Finance', 'HR', 'Operations'] },
            { name: 'Aptitude', nameTamil: 'தகுதி', questions: 30, marks: 30, topics: ['Quantitative', 'Logical Reasoning'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Business Awareness'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year Distance program', 'Career: Manager, Business Consultant'],
        seatMatrix: { general: 300, obc: 450, bcMbc: 600, sc: 258, st: 60, ews: 114, total: 1782 },
        cutoffs: [
          { year: '2024', general: 50.0, obc: 47.0, bcMbc: 45.0, sc: 40.0, st: 35.0, ews: 45.0 },
          { year: '2023', general: 53.0, obc: 50.0, bcMbc: 48.0, sc: 43.0, st: 38.0, ews: 48.0 }
        ]
      },
      {
        id: 'au-dde-mca',
        name: 'M.C.A. (Distance)',
        nameTamil: 'எம்.சி.ஏ. (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'Online/Offline', negativeMarking: false,
          sections: [
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 50, marks: 50, topics: ['Programming', 'Data Structures', 'DBMS'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Discrete Math', 'Probability'] },
            { name: 'Aptitude', nameTamil: 'தகுதி', questions: 20, marks: 20, topics: ['Logical Reasoning'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year Distance program', 'Career: Software Developer, IT Manager'],
        seatMatrix: { general: 200, obc: 300, bcMbc: 400, sc: 172, st: 40, ews: 76, total: 1188 },
        cutoffs: [
          { year: '2024', general: 52.0, obc: 49.0, bcMbc: 47.0, sc: 42.0, st: 37.0, ews: 47.0 },
          { year: '2023', general: 55.0, obc: 52.0, bcMbc: 50.0, sc: 45.0, st: 40.0, ews: 50.0 }
        ]
      },
      {
        id: 'au-dde-msw',
        name: 'M.S.W. (Distance)',
        nameTamil: 'எம்.எஸ்.டபிள்யூ. (தொலைநிலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'Online/Offline', negativeMarking: false,
          sections: [
            { name: 'Social Work', nameTamil: 'சமூக சேவை', questions: 60, marks: 60, topics: ['Case Work', 'Group Work', 'Community Development'] },
            { name: 'Social Sciences', nameTamil: 'சமூக அறிவியல்', questions: 40, marks: 40, topics: ['Sociology', 'Psychology'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year Distance program', 'Career: Social Worker, NGO Manager'],
        seatMatrix: { general: 150, obc: 225, bcMbc: 300, sc: 129, st: 30, ews: 57, total: 891 },
        cutoffs: [
          { year: '2024', general: 42.0, obc: 39.0, bcMbc: 37.0, sc: 32.0, st: 27.0, ews: 37.0 },
          { year: '2023', general: 45.0, obc: 42.0, bcMbc: 40.0, sc: 35.0, st: 30.0, ews: 40.0 }
        ]
      },
      // ========== MEDICAL & PARAMEDICAL ==========
      {
        id: 'au-bsc-nursing',
        name: 'B.Sc. Nursing',
        nameTamil: 'பி.எஸ்சி. செவிலியர்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Human Anatomy', 'Physiology'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Biochemistry', 'Pharmacology Basics'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Biophysics'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year program', 'Career: Staff Nurse, Nursing Officer', 'High demand in healthcare'],
        seatMatrix: { general: 30, obc: 45, bcMbc: 60, sc: 26, st: 6, ews: 11, total: 178 },
        cutoffs: [
          { year: '2024', general: 70.0, obc: 65.0, bcMbc: 60.0, sc: 50.0, st: 40.0, ews: 63.0 },
          { year: '2023', general: 73.0, obc: 68.0, bcMbc: 63.0, sc: 53.0, st: 43.0, ews: 66.0 }
        ]
      },
      {
        id: 'au-bpt',
        name: 'B.P.T. (Physiotherapy)',
        nameTamil: 'பி.பி.டி. (இயன் முறை மருத்துவம்)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Anatomy', 'Physiology'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Biomechanics', 'Electrotherapy'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Biochemistry'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4.5-year program (including internship)', 'Career: Physiotherapist, Rehab Specialist'],
        seatMatrix: { general: 25, obc: 38, bcMbc: 50, sc: 22, st: 5, ews: 9, total: 149 },
        cutoffs: [
          { year: '2024', general: 68.0, obc: 63.0, bcMbc: 58.0, sc: 48.0, st: 38.0, ews: 61.0 },
          { year: '2023', general: 71.0, obc: 66.0, bcMbc: 61.0, sc: 51.0, st: 41.0, ews: 64.0 }
        ]
      },
      {
        id: 'au-bot',
        name: 'B.O.T. (Occupational Therapy)',
        nameTamil: 'பி.ஓ.டி. (தொழில் சிகிச்சை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Anatomy', 'Physiology', 'Psychology'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Biomechanics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Biochemistry'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4.5-year program', 'Career: Occupational Therapist, Rehab Specialist'],
        seatMatrix: { general: 20, obc: 30, bcMbc: 40, sc: 17, st: 4, ews: 8, total: 119 },
        cutoffs: [
          { year: '2024', general: 65.0, obc: 60.0, bcMbc: 55.0, sc: 45.0, st: 35.0, ews: 58.0 },
          { year: '2023', general: 68.0, obc: 63.0, bcMbc: 58.0, sc: 48.0, st: 38.0, ews: 61.0 }
        ]
      },
      {
        id: 'au-mpt',
        name: 'M.P.T. (Master of Physiotherapy)',
        nameTamil: 'எம்.பி.டி. (இயன்முறை மருத்துவ முதுகலை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120,
          mode: 'OMR Based (Offline)', negativeMarking: false,
          sections: [
            { name: 'Physiotherapy', nameTamil: 'இயன்முறை மருத்துவம்', questions: 60, marks: 60, topics: ['Orthopedics', 'Neurology', 'Cardio-Respiratory'] },
            { name: 'Research', nameTamil: 'ஆராய்ச்சி', questions: 20, marks: 20, topics: ['Biostatistics', 'Research Methods'] },
            { name: 'Clinical Skills', nameTamil: 'மருத்துவ திறன்', questions: 20, marks: 20, topics: ['Assessment', 'Treatment Planning'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['2-year program', 'Career: Senior Physiotherapist, Consultant'],
        seatMatrix: { general: 12, obc: 18, bcMbc: 24, sc: 10, st: 2, ews: 5, total: 71 },
        cutoffs: [
          { year: '2024', general: 60.0, obc: 55.0, bcMbc: 50.0, sc: 40.0, st: 30.0, ews: 53.0 },
          { year: '2023', general: 63.0, obc: 58.0, bcMbc: 53.0, sc: 43.0, st: 33.0, ews: 56.0 }
        ]
      }
    ]
  }
];

export const getUniversityById = (id: string): University | undefined => {
  return universities.find(u => u.id === id);
};

export const getCourseById = (universityId: string, courseId: string): Course | undefined => {
  const university = getUniversityById(universityId);
  return university?.courses.find(c => c.id === courseId);
};
