// Comprehensive Government Exams Data for 12th Pass Students

export interface Question {
  id: string;
  question: string;
  questionTamil?: string;
  options: string[];
  optionsTamil?: string[];
  answer: number;
  explanation: string;
  explanationTamil?: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Topic {
  name: string;
  nameTamil: string;
  subtopics: string[];
  subtopicsTamil?: string[];
}

export interface SyllabusSection {
  name: string;
  nameTamil: string;
  topics: Topic[];
}

export interface Syllabus {
  [key: string]: SyllabusSection[];
}

export interface ExamPattern {
  paper: string;
  paperTamil: string;
  marks: number;
  duration: string;
  questions: number;
}

export interface Exam {
  id: string;
  name: string;
  nameTamil: string;
  qualification: string;
  qualificationTamil: string;
  age: string;
  salary: string;
  selectionProcess: string;
  selectionProcessTamil: string;
  posts?: string[];
  postsTamil?: string[];
  examPattern?: ExamPattern[];
  syllabus: Syllabus;
  pyq: Question[];
}

export interface Category {
  id: string;
  name: string;
  nameTamil: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  exams: Exam[];
}

// ==================== DEFENCE & PARAMILITARY ====================
const defenceExams: Exam[] = [
  {
    id: 'nda',
    name: 'NDA (National Defence Academy)',
    nameTamil: 'NDA (தேசிய பாதுகாப்பு அகாடமி)',
    qualification: '12th Pass (PCM for Navy/Air Force)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (கடற்படை/விமானப்படைக்கு PCM)',
    age: '16.5 - 19.5 years',
    salary: '₹56,100/month',
    selectionProcess: 'Written Exam → SSB Interview → Medical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → SSB நேர்காணல் → மருத்துவப் பரிசோதனை',
    examPattern: [
      { paper: 'Mathematics', paperTamil: 'கணிதம்', marks: 300, duration: '2.5 hours', questions: 120 },
      { paper: 'General Ability Test', paperTamil: 'பொது திறன் தேர்வு', marks: 600, duration: '2.5 hours', questions: 150 }
    ],
    syllabus: {
      mathematics: [
        {
          name: 'Paper 1: Mathematics (300 Marks)',
          nameTamil: 'தாள் 1: கணிதம் (300 மதிப்பெண்கள்)',
          topics: [
            { name: 'Algebra', nameTamil: 'இயற்கணிதம்', subtopics: ['Sets, Relations, Functions', 'Complex Numbers', 'Quadratic Equations', 'Permutation & Combination', 'Binomial Theorem', 'Logarithms', 'Sequences & Series'] },
            { name: 'Matrices & Determinants', nameTamil: 'அணிகள் & அணிக்கோவைகள்', subtopics: ['Types of Matrices', 'Matrix Operations', 'Determinants', 'Cramers Rule', 'Inverse of Matrix'] },
            { name: 'Trigonometry', nameTamil: 'முக்கோணவியல்', subtopics: ['Angles & Measurements', 'Trigonometric Ratios', 'Identities', 'Inverse Functions', 'Heights & Distances', 'Properties of Triangles'] },
            { name: 'Analytical Geometry 2D', nameTamil: '2D பகுப்பாய்வு வடிவியல்', subtopics: ['Straight Lines', 'Circle', 'Parabola', 'Ellipse', 'Hyperbola', 'Coordinate Geometry'] },
            { name: 'Analytical Geometry 3D', nameTamil: '3D பகுப்பாய்வு வடிவியல்', subtopics: ['Distance Formula', 'Direction Cosines', 'Equation of Plane', 'Straight Line in Space'] },
            { name: 'Differential Calculus', nameTamil: 'வகையீட்டுக் கணிதம்', subtopics: ['Limits', 'Continuity', 'Differentiation', 'Application of Derivatives', 'Maxima & Minima'] },
            { name: 'Integral Calculus', nameTamil: 'தொகையீட்டுக் கணிதம்', subtopics: ['Integration Methods', 'Definite Integrals', 'Area under Curves', 'Differential Equations'] },
            { name: 'Vector Algebra', nameTamil: 'வெக்டர் இயற்கணிதம்', subtopics: ['Vector Operations', 'Scalar Product', 'Vector Product', 'Applications'] },
            { name: 'Statistics & Probability', nameTamil: 'புள்ளியியல் & நிகழ்தகவு', subtopics: ['Mean, Median, Mode', 'Variance, Standard Deviation', 'Probability Basics', 'Conditional Probability'] }
          ]
        }
      ],
      generalAbility: [
        {
          name: 'Paper 2: General Ability Test (600 Marks)',
          nameTamil: 'தாள் 2: பொது திறன் தேர்வு (600 மதிப்பெண்கள்)',
          topics: [
            { name: 'English (200 Marks)', nameTamil: 'ஆங்கிலம் (200 மதிப்பெண்கள்)', subtopics: ['Grammar & Usage', 'Vocabulary', 'Comprehension', 'Sentence Correction', 'Synonyms & Antonyms', 'Idioms & Phrases', 'Spotting Errors'] },
            { name: 'General Knowledge (400 Marks)', nameTamil: 'பொது அறிவு (400 மதிப்பெண்கள்)', subtopics: ['Physics: Mechanics, Heat, Optics, Electricity, Modern Physics', 'Chemistry: Physical, Organic, Inorganic Chemistry', 'Biology: Botany, Zoology, Human Physiology', 'History: Ancient, Medieval, Modern India, World History', 'Geography: Physical, Indian, World Geography', 'Current Affairs: National & International Events'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'nda-math-1', question: 'If sin θ + cos θ = √2, then tan θ + cot θ = ?', questionTamil: 'sin θ + cos θ = √2 எனில், tan θ + cot θ = ?', options: ['1', '2', '√2', '2√2'], answer: 1, explanation: 'sin θ + cos θ = √2 means θ = 45°. tan 45° + cot 45° = 1 + 1 = 2', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'nda-math-2', question: 'The number of ways to arrange the letters of the word "MATHEMATICS" is:', questionTamil: '"MATHEMATICS" என்ற வார்த்தையின் எழுத்துக்களை வரிசைப்படுத்தும் வழிகளின் எண்ணிக்கை:', options: ['11!/2!2!2!', '11!/2!2!', '11!/2!', '11!'], answer: 0, explanation: 'MATHEMATICS has 11 letters with M(2), A(2), T(2) repeating. So 11!/(2!×2!×2!)', subject: 'Mathematics', difficulty: 'hard' },
      { id: 'nda-math-3', question: 'If A = [1 2; 3 4], then A² - 5A + 4I = ?', options: ['0', 'I', 'A', '2A'], answer: 0, explanation: 'Using Cayley-Hamilton theorem, the characteristic equation gives A² - 5A + 4I = 0', subject: 'Mathematics', difficulty: 'hard' },
      { id: 'nda-math-4', question: 'The area bounded by y = x², x-axis, x = 1 and x = 2 is:', options: ['7/3 sq units', '8/3 sq units', '3 sq units', '7 sq units'], answer: 0, explanation: 'Area = ∫₁² x² dx = [x³/3]₁² = 8/3 - 1/3 = 7/3', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'nda-math-5', question: 'Two dice are thrown. Probability of getting sum 7 is:', questionTamil: 'இரு பகடைகள் எறியப்படுகின்றன. கூட்டுத்தொகை 7 கிடைக்கும் நிகழ்தகவு:', options: ['1/6', '5/36', '1/12', '7/36'], answer: 0, explanation: 'Favorable outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6. Total = 36. P = 6/36 = 1/6', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'nda-math-6', question: 'The value of lim(x→0) (sin x)/x is:', options: ['1', '0', '∞', '-1'], answer: 0, explanation: 'Standard limit: lim(x→0) sin x/x = 1', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'nda-math-7', question: 'If log₁₀2 = 0.3010, then log₁₀8 = ?', options: ['0.9030', '0.6020', '0.3010', '2.4080'], answer: 0, explanation: 'log₁₀8 = log₁₀2³ = 3×log₁₀2 = 3×0.3010 = 0.9030', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'nda-math-8', question: 'The derivative of x³ + 3x² + 3x + 1 at x = -1 is:', options: ['0', '1', '2', '3'], answer: 0, explanation: "f'(x) = 3x² + 6x + 3. At x = -1: f'(-1) = 3 - 6 + 3 = 0", subject: 'Mathematics', difficulty: 'medium' },
      { id: 'nda-math-9', question: 'In a GP, if a = 2 and r = 3, the 5th term is:', options: ['162', '81', '243', '54'], answer: 0, explanation: '5th term = ar⁴ = 2 × 3⁴ = 2 × 81 = 162', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'nda-math-10', question: 'The distance between points (2,3) and (5,7) is:', options: ['5', '4', '6', '7'], answer: 0, explanation: 'd = √[(5-2)² + (7-3)²] = √[9+16] = √25 = 5', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'nda-gk-1', question: 'The chemical formula of Washing Soda is:', questionTamil: 'சலவை சோடாவின் வேதிச் சூத்திரம்:', options: ['Na₂CO₃', 'NaHCO₃', 'Na₂CO₃.10H₂O', 'CaCO₃'], answer: 2, explanation: 'Washing Soda is Sodium Carbonate Decahydrate - Na₂CO₃.10H₂O', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'nda-gk-2', question: 'Who was the founder of the Maurya Empire?', questionTamil: 'மௌரிய பேரரசை நிறுவியவர் யார்?', options: ['Ashoka', 'Bindusara', 'Chandragupta Maurya', 'Bimbisara'], answer: 2, explanation: 'Chandragupta Maurya founded the Maurya Empire in 321 BCE with help from Chanakya', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'nda-gk-3', question: 'The Palk Strait separates India from:', options: ['Sri Lanka', 'Maldives', 'Bangladesh', 'Myanmar'], answer: 0, explanation: 'Palk Strait is between Tamil Nadu (India) and northern Sri Lanka', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'nda-gk-4', question: 'The Battle of Plassey was fought in:', options: ['1757', '1764', '1857', '1947'], answer: 0, explanation: 'Battle of Plassey (1757) - Robert Clive defeated Siraj-ud-Daulah', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'nda-gk-5', question: 'Which planet is known as the "Red Planet"?', options: ['Mars', 'Jupiter', 'Venus', 'Saturn'], answer: 0, explanation: 'Mars appears red due to iron oxide (rust) on its surface', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'nda-eng-1', question: 'Choose the correct synonym of "ABUNDANT":', options: ['Scarce', 'Plentiful', 'Limited', 'Rare'], answer: 1, explanation: 'Abundant means existing in large quantities; plentiful', subject: 'English', difficulty: 'easy' },
      { id: 'nda-eng-2', question: 'Choose the correct antonym of "ANCIENT":', options: ['Old', 'Antique', 'Modern', 'Historic'], answer: 2, explanation: 'Ancient means very old; its opposite is Modern (new/recent)', subject: 'English', difficulty: 'easy' },
      { id: 'nda-eng-3', question: 'One word for "A person who loves books":', options: ['Bibliophile', 'Philatelist', 'Numismatist', 'Connoisseur'], answer: 0, explanation: 'Bibliophile = book lover. Philatelist = stamp collector. Numismatist = coin collector', subject: 'English', difficulty: 'medium' },
      { id: 'nda-eng-4', question: 'Idiom "To burn the midnight oil" means:', options: ['To waste oil', 'To work late at night', 'To sleep', 'To waste time'], answer: 1, explanation: 'It means to work or study late into the night', subject: 'English', difficulty: 'easy' },
      { id: 'nda-eng-5', question: 'Spot the error: "He has been working (a)/ in this office (b)/ since five years (c)/ No error (d)"', options: ['a', 'b', 'c', 'd'], answer: 2, explanation: '"Since" is used for point of time. "For" is used for period of time. Correct: "for five years"', subject: 'English', difficulty: 'medium' }
    ]
  },
  {
    id: 'agniveer-army',
    name: 'Agniveer Army',
    nameTamil: 'அக்னிவீர் ராணுவம்',
    qualification: '12th Pass (50%)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (50%)',
    age: '17.5 - 23 years',
    salary: '₹30,000/month',
    selectionProcess: 'CEE → Physical → Medical',
    selectionProcessTamil: 'CEE → உடற்தகுதி → மருத்துவம்',
    syllabus: {
      generalDuty: [
        {
          name: 'Agniveer General Duty Syllabus',
          nameTamil: 'அக்னிவீர் பொது கடமை பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Indian History', 'Geography', 'Indian Polity', 'Economy Basics', 'Current Affairs', 'Sports & Awards', 'Important Days', 'Books & Authors'] },
            { name: 'General Science', nameTamil: 'பொது அறிவியல்', subtopics: ['Physics: Motion, Force, Energy, Light, Sound, Electricity', 'Chemistry: Elements, Compounds, Acids & Bases, Metals', 'Biology: Human Body, Diseases, Nutrition, Environment'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', subtopics: ['Number System', 'HCF & LCM', 'Percentage', 'Average', 'Ratio & Proportion', 'Simple & Compound Interest', 'Time & Work', 'Time & Distance', 'Profit & Loss'] },
            { name: 'Reasoning', nameTamil: 'தர்க்கம்', subtopics: ['Coding-Decoding', 'Analogy', 'Series Completion', 'Blood Relations', 'Direction Sense', 'Alphabet Test', 'Classification'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'agni-1', question: 'Which is the longest river in India?', questionTamil: 'இந்தியாவின் மிக நீளமான ஆறு எது?', options: ['Ganga', 'Godavari', 'Brahmaputra', 'Yamuna'], answer: 0, explanation: 'Ganga is the longest river in India (2525 km)', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'agni-2', question: 'If 15% of x = 45, then x = ?', options: ['300', '250', '200', '350'], answer: 0, explanation: '15% of x = 45 → x = 45 × 100/15 = 300', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'agni-3', question: 'Find the next term: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], answer: 1, explanation: 'Differences: 4, 6, 8, 10, 12. Next: 30 + 12 = 42', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'agni-4', question: 'The chemical symbol of Gold is:', questionTamil: 'தங்கத்தின் வேதியியல் குறியீடு:', options: ['Go', 'Gd', 'Au', 'Ag'], answer: 2, explanation: 'Au (from Latin "Aurum") is Gold. Ag is Silver', subject: 'General Science', difficulty: 'easy' },
      { id: 'agni-5', question: 'Who is known as "Father of Indian Constitution"?', questionTamil: '"இந்திய அரசியலமைப்பின் தந்தை" என்று அறியப்படுபவர்?', options: ['Jawaharlal Nehru', 'B.R. Ambedkar', 'Mahatma Gandhi', 'Sardar Patel'], answer: 1, explanation: 'Dr. B.R. Ambedkar was the Chairman of Drafting Committee', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'agni-6', question: 'The capital of Arunachal Pradesh is:', options: ['Itanagar', 'Imphal', 'Shillong', 'Kohima'], answer: 0, explanation: 'Itanagar is the capital of Arunachal Pradesh', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'agni-7', question: 'Which gas is released during photosynthesis?', questionTamil: 'ஒளிச்சேர்க்கையின் போது எந்த வாயு வெளியிடப்படுகிறது?', options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], answer: 1, explanation: 'Plants release Oxygen during photosynthesis', subject: 'General Science', difficulty: 'easy' },
      { id: 'agni-8', question: 'COMPUTER is coded as RFUVQNPC, then PRINTER is:', options: ['QSJOUFQ', 'QSJOUFS', 'OQJOUFS', 'SFUOJQR'], answer: 1, explanation: 'Each letter is replaced by +1, -1, +1, -1... pattern', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'agni-9', question: 'A train 200m long passes a pole in 20 seconds. Find speed in km/hr:', options: ['36 km/hr', '40 km/hr', '45 km/hr', '50 km/hr'], answer: 0, explanation: 'Speed = 200/20 = 10 m/s = 10 × 18/5 = 36 km/hr', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'agni-10', question: 'The Quit India movement was started by Mahatma Gandhi in:', questionTamil: 'வெள்ளையனே வெளியேறு இயக்கம் தொடங்கப்பட்ட ஆண்டு:', options: ['1940', '1942', '1944', '1946'], answer: 1, explanation: 'Quit India Movement started on 8th August 1942', subject: 'General Knowledge', difficulty: 'easy' }
    ]
  },
  {
    id: 'agniveer-navy',
    name: 'Agniveer Navy',
    nameTamil: 'அக்னிவீர் கடற்படை',
    qualification: '12th Pass (PCM - 50%)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (PCM - 50%)',
    age: '17.5 - 23 years',
    salary: '₹30,000/month',
    selectionProcess: 'Written → Physical → Medical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → உடற்தகுதி → மருத்துவம்',
    syllabus: {
      main: [
        {
          name: 'Agniveer Navy Syllabus',
          nameTamil: 'அக்னிவீர் கடற்படை பாடத்திட்டம்',
          topics: [
            { name: 'Science', nameTamil: 'அறிவியல்', subtopics: ['Physics', 'Chemistry', 'Mathematics'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', subtopics: ['Grammar', 'Vocabulary', 'Comprehension'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Current Affairs', 'Geography', 'History'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'agniveer-airforce',
    name: 'Agniveer Air Force',
    nameTamil: 'அக்னிவீர் விமானப்படை',
    qualification: '12th Pass (PCM - 50%)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (PCM - 50%)',
    age: '17.5 - 23 years',
    salary: '₹30,000/month',
    selectionProcess: 'Written → Physical → Medical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → உடற்தகுதி → மருத்துவம்',
    syllabus: {
      main: [
        {
          name: 'Agniveer Air Force Syllabus',
          nameTamil: 'அக்னிவீர் விமானப்படை பாடத்திட்டம்',
          topics: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', subtopics: ['Mechanics', 'Thermodynamics', 'Optics', 'Electricity'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', subtopics: ['Algebra', 'Trigonometry', 'Calculus', 'Geometry'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', subtopics: ['Grammar', 'Vocabulary', 'Comprehension'] },
            { name: 'Reasoning', nameTamil: 'தர்க்கம்', subtopics: ['Verbal', 'Non-Verbal', 'Spatial'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'coastguard',
    name: 'Indian Coast Guard Navik',
    nameTamil: 'இந்திய கடலோர காவல் நாவிக்',
    qualification: '12th Pass (PCM)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (PCM)',
    age: '18 - 22 years',
    salary: '₹29,200/month',
    selectionProcess: 'Written → Physical → Medical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → உடற்தகுதி → மருத்துவம்',
    syllabus: {
      main: [
        {
          name: 'Coast Guard Syllabus',
          nameTamil: 'கடலோர காவல் பாடத்திட்டம்',
          topics: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', subtopics: ['Algebra', 'Trigonometry', 'Geometry', 'Mensuration'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', subtopics: ['Mechanics', 'Heat', 'Light', 'Electricity'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', subtopics: ['Elements', 'Compounds', 'Reactions'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', subtopics: ['Grammar', 'Vocabulary'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'bsf-constable',
    name: 'BSF/CRPF/CISF Constable',
    nameTamil: 'BSF/CRPF/CISF காவலர்',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 23 years',
    salary: '₹23,527/month',
    selectionProcess: 'Written → Physical → Medical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → உடற்தகுதி → மருத்துவம்',
    syllabus: {
      main: [
        {
          name: 'Constable Exam Syllabus',
          nameTamil: 'காவலர் தேர்வு பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['History', 'Geography', 'Polity', 'Current Affairs'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', subtopics: ['Number System', 'Arithmetic', 'Algebra'] },
            { name: 'Reasoning', nameTamil: 'தர்க்கம்', subtopics: ['Verbal', 'Non-Verbal', 'Analytical'] },
            { name: 'English/Hindi', nameTamil: 'ஆங்கிலம்/இந்தி', subtopics: ['Grammar', 'Vocabulary', 'Comprehension'] }
          ]
        }
      ]
    },
    pyq: []
  }
];

// ==================== RAILWAY JOBS ====================
const railwayExams: Exam[] = [
  {
    id: 'rrb-ntpc',
    name: 'RRB NTPC (Non-Technical Popular Categories)',
    nameTamil: 'RRB NTPC (தொழில்நுட்பமற்ற பிரபலமான பிரிவுகள்)',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 33 years',
    salary: '₹19,900 - ₹35,400/month',
    selectionProcess: 'CBT 1 → CBT 2 → Typing Test → Document Verification',
    selectionProcessTamil: 'CBT 1 → CBT 2 → தட்டச்சு சோதனை → ஆவண சரிபார்ப்பு',
    posts: ['Commercial Cum Ticket Clerk', 'Accounts Clerk', 'Junior Clerk', 'Trains Clerk'],
    postsTamil: ['வணிக மற்றும் டிக்கெட் எழுத்தர்', 'கணக்கு எழுத்தர்', 'இளநிலை எழுத்தர்', 'ரயில் எழுத்தர்'],
    examPattern: [
      { paper: 'CBT Stage 1', paperTamil: 'CBT நிலை 1', marks: 100, duration: '90 mins', questions: 100 },
      { paper: 'CBT Stage 2', paperTamil: 'CBT நிலை 2', marks: 120, duration: '90 mins', questions: 120 }
    ],
    syllabus: {
      cbt1: [
        {
          name: 'CBT Stage 1 (100 Questions, 90 Minutes)',
          nameTamil: 'CBT நிலை 1 (100 கேள்விகள், 90 நிமிடங்கள்)',
          topics: [
            { name: 'General Awareness (40 Questions)', nameTamil: 'பொது விழிப்புணர்வு (40 கேள்விகள்)', subtopics: ['Current Affairs - National & International', 'Indian History - Ancient, Medieval, Modern', 'Indian Geography - Physical, Economic', 'Indian Polity - Constitution, Governance', 'Indian Economy - Banking, Budget', 'General Science - Physics, Chemistry, Biology', 'Sports & Games', 'Art & Culture', 'Important Days & Dates', 'Awards & Honours'] },
            { name: 'Mathematics (30 Questions)', nameTamil: 'கணிதம் (30 கேள்விகள்)', subtopics: ['Number System, BODMAS', 'Decimals, Fractions', 'LCM, HCF', 'Ratio & Proportion', 'Percentage', 'Mensuration', 'Time & Work', 'Time & Distance', 'Simple & Compound Interest', 'Profit & Loss', 'Elementary Algebra', 'Geometry & Trigonometry', 'Elementary Statistics'] },
            { name: 'General Intelligence & Reasoning (30 Questions)', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம் (30 கேள்விகள்)', subtopics: ['Analogies', 'Coding-Decoding', 'Syllogism', 'Puzzles', 'Data Sufficiency', 'Statement-Conclusion', 'Blood Relations', 'Venn Diagrams', 'Alphabet & Number Series', 'Mathematical Operations', 'Similarities & Differences', 'Analytical Reasoning', 'Classification', 'Directions', 'Decision Making'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'rrb-ga-1', question: 'Who is known as the "Iron Man of India"?', questionTamil: '"இந்தியாவின் இரும்பு மனிதர்" என்று அறியப்படுபவர்?', options: ['Jawaharlal Nehru', 'Sardar Vallabhbhai Patel', 'Subhash Chandra Bose', 'Mahatma Gandhi'], answer: 1, explanation: 'Sardar Vallabhbhai Patel is called Iron Man for unifying 562 princely states', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rrb-ga-2', question: 'Which is the largest gland in human body?', options: ['Thyroid', 'Liver', 'Pancreas', 'Pituitary'], answer: 1, explanation: 'Liver is the largest gland (weighs about 1.5 kg)', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rrb-ga-3', question: 'The headquarters of ISRO is located in:', options: ['Chennai', 'Mumbai', 'Bengaluru', 'Hyderabad'], answer: 2, explanation: 'ISRO HQ is in Bengaluru, Karnataka', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rrb-ga-4', question: 'Which Article of Constitution abolishes untouchability?', questionTamil: 'தீண்டாமையை ஒழிக்கும் அரசியலமைப்பு சட்டப்பிரிவு எது?', options: ['Article 14', 'Article 15', 'Article 17', 'Article 21'], answer: 2, explanation: 'Article 17 abolishes untouchability and makes it punishable', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'rrb-ga-5', question: 'Who invented the telephone?', options: ['Thomas Edison', 'Alexander Graham Bell', 'Marconi', 'Wright Brothers'], answer: 1, explanation: 'Alexander Graham Bell invented telephone in 1876', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rrb-math-1', question: 'A train 150m long passes a pole in 15 seconds. Find its speed in km/hr.', options: ['36 km/hr', '40 km/hr', '45 km/hr', '50 km/hr'], answer: 0, explanation: 'Speed = 150/15 = 10 m/s = 10 × 18/5 = 36 km/hr', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'rrb-math-2', question: 'The average of 5 consecutive odd numbers is 27. Find the largest number.', options: ['29', '31', '33', '35'], answer: 1, explanation: 'If average is 27, middle number is 27. So: 23, 25, 27, 29, 31. Largest = 31', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'rrb-math-3', question: 'A sum becomes ₹6050 in 2 years at 10% compound interest. Find the sum.', options: ['₹5000', '₹4500', '₹5500', '₹4000'], answer: 0, explanation: 'P(1+10/100)² = 6050 → P × 1.21 = 6050 → P = 5000', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'rrb-reason-1', question: 'APPLE : ELPPA :: MANGO : ?', options: ['OGNAM', 'OGANM', 'MANOG', 'NAGOM'], answer: 0, explanation: 'Reverse of MANGO = OGNAM', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'rrb-reason-2', question: 'Find the odd one out: 8, 27, 64, 100, 125', options: ['27', '64', '100', '125'], answer: 2, explanation: '8=2³, 27=3³, 64=4³, 125=5³. 100 is not a perfect cube', subject: 'Reasoning', difficulty: 'medium' }
    ]
  },
  {
    id: 'rrb-group-d',
    name: 'RRB Group D',
    nameTamil: 'RRB குழு D',
    qualification: '10th Pass + ITI OR 12th Pass',
    qualificationTamil: '10ஆம் வகுப்பு + ITI அல்லது 12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 33 years',
    salary: '₹18,000/month',
    selectionProcess: 'CBT → PET → Document Verification',
    selectionProcessTamil: 'CBT → உடற்தகுதி → ஆவண சரிபார்ப்பு',
    posts: ['Track Maintainer', 'Helper', 'Porter', 'Pointsman'],
    postsTamil: ['பாதை பராமரிப்பாளர்', 'உதவியாளர்', 'போர்ட்டர்', 'பாயின்ட்ஸ்மேன்'],
    syllabus: {
      main: [
        {
          name: 'RRB Group D Syllabus',
          nameTamil: 'RRB குழு D பாடத்திட்டம்',
          topics: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', subtopics: ['Number System', 'BODMAS', 'Percentage', 'Ratio & Proportion', 'Time & Work', 'Time & Distance', 'Simple Interest', 'Profit & Loss', 'Geometry', 'Mensuration'] },
            { name: 'General Intelligence & Reasoning', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்', subtopics: ['Analogies', 'Classification', 'Coding-Decoding', 'Series', 'Blood Relations', 'Directions', 'Syllogism'] },
            { name: 'General Science', nameTamil: 'பொது அறிவியல்', subtopics: ['Physics', 'Chemistry', 'Biology'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', subtopics: ['Current Affairs', 'History', 'Geography', 'Polity', 'Economy'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'rpf-constable',
    name: 'RPF Constable',
    nameTamil: 'RPF காவலர்',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 25 years',
    salary: '₹21,700/month',
    selectionProcess: 'CBT → PET/PMT → Document Verification',
    selectionProcessTamil: 'CBT → உடற்தகுதி → ஆவண சரிபார்ப்பு',
    syllabus: {
      main: [
        {
          name: 'RPF Constable Syllabus',
          nameTamil: 'RPF காவலர் பாடத்திட்டம்',
          topics: [
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', subtopics: ['Current Affairs', 'History', 'Geography', 'Polity', 'Science'] },
            { name: 'Arithmetic', nameTamil: 'எண்கணிதம்', subtopics: ['Number System', 'Percentage', 'Ratio', 'Time & Work', 'Time & Distance'] },
            { name: 'General Intelligence & Reasoning', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்', subtopics: ['Analogies', 'Classification', 'Coding-Decoding', 'Series'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'railway-apprentice',
    name: 'Railway Apprentice',
    nameTamil: 'ரயில்வே பயிற்சியாளர்',
    qualification: '10th/12th Pass',
    qualificationTamil: '10/12ஆம் வகுப்பு தேர்ச்சி',
    age: '15 - 24 years',
    salary: '₹8,000 Stipend',
    selectionProcess: 'Merit Based',
    selectionProcessTamil: 'தகுதி அடிப்படையில்',
    syllabus: {
      main: [
        {
          name: 'Railway Apprentice Selection',
          nameTamil: 'ரயில்வே பயிற்சியாளர் தேர்வு',
          topics: [
            { name: 'Selection Criteria', nameTamil: 'தேர்வு அளவுகோல்', subtopics: ['Based on 10th/12th marks', 'ITI qualification preferred', 'No written exam'] }
          ]
        }
      ]
    },
    pyq: []
  }
];

// ==================== SSC ====================
const sscExams: Exam[] = [
  {
    id: 'ssc-chsl',
    name: 'SSC CHSL (Combined Higher Secondary Level)',
    nameTamil: 'SSC CHSL (ஒருங்கிணைந்த மேல்நிலை தேர்வு)',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 27 years',
    salary: '₹25,500 - ₹81,100/month',
    selectionProcess: 'Tier 1 (CBT) → Tier 2 (Descriptive) → Typing Test',
    selectionProcessTamil: 'நிலை 1 (CBT) → நிலை 2 (விளக்க) → தட்டச்சு சோதனை',
    posts: ['LDC (Lower Division Clerk)', 'DEO (Data Entry Operator)', 'PA (Postal Assistant)', 'SA (Sorting Assistant)'],
    postsTamil: ['கீழ் பிரிவு எழுத்தர்', 'தரவு உள்ளீட்டு ஆபரேட்டர்', 'தபால் உதவியாளர்', 'வரிசைப்படுத்தும் உதவியாளர்'],
    examPattern: [
      { paper: 'Tier 1 - CBT', paperTamil: 'நிலை 1 - CBT', marks: 200, duration: '60 mins', questions: 100 },
      { paper: 'Tier 2 - Descriptive', paperTamil: 'நிலை 2 - விளக்க', marks: 200, duration: '60 mins', questions: 2 }
    ],
    syllabus: {
      tier1: [
        {
          name: 'Tier 1 - Computer Based Test (100 Questions, 60 Minutes)',
          nameTamil: 'நிலை 1 - கணினி அடிப்படை தேர்வு (100 கேள்விகள், 60 நிமிடங்கள்)',
          topics: [
            { name: 'General Intelligence (25 Questions)', nameTamil: 'பொது புத்திசாலித்தனம் (25 கேள்விகள்)', subtopics: ['Semantic Analogy', 'Symbolic/Number Analogy', 'Semantic Classification', 'Symbolic/Number Classification', 'Figural Classification', 'Semantic Series', 'Number Series', 'Figural Series', 'Problem Solving', 'Word Building', 'Coding & Decoding', 'Numerical Operations', 'Venn Diagrams', 'Figural Pattern', 'Embedded Figures', 'Critical Thinking'] },
            { name: 'English Language (25 Questions)', nameTamil: 'ஆங்கில மொழி (25 கேள்விகள்)', subtopics: ['Spot the Error', 'Fill in the Blanks', 'Synonyms', 'Antonyms', 'Spelling/Detecting Misspelt Words', 'Idioms & Phrases', 'One Word Substitution', 'Improvement of Sentences', 'Active/Passive Voice', 'Direct/Indirect Speech', 'Shuffling of Sentence Parts', 'Cloze Passage', 'Comprehension Passage'] },
            { name: 'Quantitative Aptitude (25 Questions)', nameTamil: 'அளவு திறன் (25 கேள்விகள்)', subtopics: ['Number Systems', 'Fundamental Operations', 'Percentages', 'Ratio & Proportion', 'Square Roots', 'Averages', 'Interest', 'Profit & Loss', 'Discount', 'Partnership', 'Mixture & Alligation', 'Time & Distance', 'Time & Work', 'Geometry', 'Mensuration', 'Trigonometry', 'Data Interpretation'] },
            { name: 'General Awareness (25 Questions)', nameTamil: 'பொது விழிப்புணர்வு (25 கேள்விகள்)', subtopics: ['India & its Neighbours', 'History', 'Culture', 'Geography', 'Economic Scene', 'General Polity', 'Indian Constitution', 'Scientific Research', 'Current Affairs'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'ssc-gi-1', question: 'Select the related word: Doctor : Hospital :: Teacher : ?', options: ['School', 'Student', 'Books', 'Education'], answer: 0, explanation: 'Doctor works in Hospital, Teacher works in School', subject: 'General Intelligence', difficulty: 'easy' },
      { id: 'ssc-gi-2', question: 'Arrange in meaningful order: 1.Sentence 2.Word 3.Paragraph 4.Letter 5.Chapter', options: ['4-2-1-3-5', '4-2-3-1-5', '4-1-2-3-5', '2-4-1-3-5'], answer: 0, explanation: 'Letter → Word → Sentence → Paragraph → Chapter', subject: 'General Intelligence', difficulty: 'easy' },
      { id: 'ssc-gi-3', question: 'Find the missing number: 4, 9, 16, 25, ?', options: ['30', '36', '49', '64'], answer: 1, explanation: 'Pattern: 2², 3², 4², 5², 6² = 36', subject: 'General Intelligence', difficulty: 'easy' },
      { id: 'ssc-eng-1', question: 'Choose the correct synonym of "ABUNDANT":', options: ['Scarce', 'Plentiful', 'Limited', 'Rare'], answer: 1, explanation: 'Abundant = existing in large quantities = Plentiful', subject: 'English', difficulty: 'easy' },
      { id: 'ssc-eng-2', question: 'One word for "A person who loves books":', options: ['Bibliophile', 'Philatelist', 'Numismatist', 'Connoisseur'], answer: 0, explanation: 'Bibliophile = book lover', subject: 'English', difficulty: 'medium' },
      { id: 'ssc-quant-1', question: 'If a:b = 2:3 and b:c = 4:5, then a:b:c = ?', options: ['8:12:15', '2:3:5', '4:6:5', '8:12:10'], answer: 0, explanation: 'a:b = 2:3 = 8:12, b:c = 4:5 = 12:15. So a:b:c = 8:12:15', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'ssc-quant-2', question: 'Compound interest on ₹5000 for 2 years at 10% p.a. is:', options: ['₹1000', '₹1050', '₹1100', '₹1025'], answer: 1, explanation: 'CI = 5000(1.1)² - 5000 = 6050 - 5000 = ₹1050', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'ssc-ga-1', question: 'The currency of Japan is:', options: ['Yuan', 'Yen', 'Won', 'Ringgit'], answer: 1, explanation: "Japan's currency is Yen", subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ssc-ga-2', question: 'First woman Prime Minister of India:', questionTamil: 'இந்தியாவின் முதல் பெண் பிரதமர்:', options: ['Sarojini Naidu', 'Indira Gandhi', 'Pratibha Patil', 'Sushma Swaraj'], answer: 1, explanation: 'Indira Gandhi was first and only woman PM of India', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ssc-ga-3', question: 'National Animal of India is:', options: ['Lion', 'Elephant', 'Tiger', 'Peacock'], answer: 2, explanation: 'Bengal Tiger is the National Animal of India', subject: 'General Awareness', difficulty: 'easy' }
    ]
  },
  {
    id: 'ssc-mts',
    name: 'SSC MTS (Multi Tasking Staff)',
    nameTamil: 'SSC MTS (பல்பணி ஊழியர்)',
    qualification: '10th Pass',
    qualificationTamil: '10ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 25 years',
    salary: '₹18,000 - ₹56,900/month',
    selectionProcess: 'Paper 1 (CBT) → Paper 2 (Descriptive) → Document Verification',
    selectionProcessTamil: 'தாள் 1 (CBT) → தாள் 2 (விளக்க) → ஆவண சரிபார்ப்பு',
    posts: ['Peon', 'Watchman', 'Gardener', 'Sweeper'],
    postsTamil: ['பியூன்', 'காவலாளி', 'தோட்டக்காரர்', 'சுத்தப்படுத்துபவர்'],
    syllabus: {
      main: [
        {
          name: 'SSC MTS Syllabus',
          nameTamil: 'SSC MTS பாடத்திட்டம்',
          topics: [
            { name: 'General Intelligence & Reasoning', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்', subtopics: ['Analogy', 'Classification', 'Series', 'Coding-Decoding', 'Directions', 'Blood Relations'] },
            { name: 'Numerical Aptitude', nameTamil: 'எண் திறன்', subtopics: ['Number System', 'Percentage', 'Ratio', 'Time & Work', 'Average', 'Profit & Loss'] },
            { name: 'General English', nameTamil: 'பொது ஆங்கிலம்', subtopics: ['Grammar', 'Vocabulary', 'Comprehension'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', subtopics: ['Current Affairs', 'History', 'Geography', 'Polity', 'Science'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'ssc-gd',
    name: 'SSC GD Constable',
    nameTamil: 'SSC GD காவலர்',
    qualification: '10th/12th Pass',
    qualificationTamil: '10/12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 23 years',
    salary: '₹23,527/month',
    selectionProcess: 'CBT → PET/PST → Medical → Document Verification',
    selectionProcessTamil: 'CBT → உடற்தகுதி → மருத்துவம் → ஆவண சரிபார்ப்பு',
    posts: ['BSF', 'CRPF', 'CISF', 'ITBP', 'SSB', 'Assam Rifles'],
    syllabus: {
      main: [
        {
          name: 'SSC GD Constable Syllabus',
          nameTamil: 'SSC GD காவலர் பாடத்திட்டம்',
          topics: [
            { name: 'General Intelligence & Reasoning', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்', subtopics: ['Analogy', 'Classification', 'Series', 'Coding-Decoding', 'Blood Relations', 'Directions'] },
            { name: 'General Knowledge & Awareness', nameTamil: 'பொது அறிவு & விழிப்புணர்வு', subtopics: ['Current Affairs', 'History', 'Geography', 'Polity', 'Economy', 'Science'] },
            { name: 'Elementary Mathematics', nameTamil: 'அடிப்படை கணிதம்', subtopics: ['Number System', 'Percentage', 'Ratio', 'Average', 'Time & Work', 'Mensuration'] },
            { name: 'English/Hindi', nameTamil: 'ஆங்கிலம்/இந்தி', subtopics: ['Grammar', 'Vocabulary', 'Comprehension'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'ssc-steno',
    name: 'SSC Stenographer',
    nameTamil: 'SSC சுருக்கெழுத்தாளர்',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 27 years',
    salary: '₹25,500 - ₹81,100/month',
    selectionProcess: 'CBT → Skill Test (Stenography)',
    selectionProcessTamil: 'CBT → திறன் தேர்வு (சுருக்கெழுத்து)',
    posts: ['Stenographer Grade C', 'Stenographer Grade D'],
    postsTamil: ['சுருக்கெழுத்தாளர் தரம் C', 'சுருக்கெழுத்தாளர் தரம் D'],
    syllabus: {
      main: [
        {
          name: 'SSC Stenographer Syllabus',
          nameTamil: 'SSC சுருக்கெழுத்தாளர் பாடத்திட்டம்',
          topics: [
            { name: 'General Intelligence & Reasoning', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்', subtopics: ['Analogy', 'Classification', 'Series', 'Coding-Decoding', 'Directions'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', subtopics: ['Current Affairs', 'History', 'Geography', 'Polity', 'Science'] },
            { name: 'English Language', nameTamil: 'ஆங்கில மொழி', subtopics: ['Grammar', 'Vocabulary', 'Comprehension', 'Error Spotting'] }
          ]
        }
      ]
    },
    pyq: []
  }
];

// ==================== BANKING & INSURANCE ====================
const bankingExams: Exam[] = [
  {
    id: 'ibps-clerk',
    name: 'IBPS Clerk',
    nameTamil: 'IBPS எழுத்தர்',
    qualification: 'Any Graduate (12th for age)',
    qualificationTamil: 'ஏதேனும் பட்டதாரி',
    age: '20 - 28 years',
    salary: '₹28,000 - ₹35,000/month',
    selectionProcess: 'Prelims → Mains → Provisional Allotment',
    selectionProcessTamil: 'முதநிலை → முதன்மை → தற்காலிக ஒதுக்கீடு',
    syllabus: {
      main: [
        {
          name: 'IBPS Clerk Syllabus',
          nameTamil: 'IBPS எழுத்தர் பாடத்திட்டம்',
          topics: [
            { name: 'English Language', nameTamil: 'ஆங்கில மொழி', subtopics: ['Reading Comprehension', 'Cloze Test', 'Error Spotting', 'Sentence Improvement', 'Para Jumbles'] },
            { name: 'Quantitative Aptitude', nameTamil: 'அளவு திறன்', subtopics: ['Simplification', 'Number Series', 'Data Interpretation', 'Quadratic Equations', 'Arithmetic'] },
            { name: 'Reasoning Ability', nameTamil: 'தர்க்க திறன்', subtopics: ['Puzzles', 'Seating Arrangement', 'Syllogism', 'Blood Relations', 'Inequality'] },
            { name: 'General/Banking Awareness', nameTamil: 'பொது/வங்கி விழிப்புணர்வு', subtopics: ['Banking Terms', 'RBI', 'Current Affairs', 'Financial Awareness'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'sbi-clerk',
    name: 'SBI Clerk (Junior Associate)',
    nameTamil: 'SBI எழுத்தர் (இளநிலை உதவியாளர்)',
    qualification: 'Any Graduate',
    qualificationTamil: 'ஏதேனும் பட்டதாரி',
    age: '20 - 28 years',
    salary: '₹30,000 - ₹40,000/month',
    selectionProcess: 'Prelims → Mains → Local Language Test',
    selectionProcessTamil: 'முதநிலை → முதன்மை → உள்ளூர் மொழி தேர்வு',
    syllabus: {
      main: [
        {
          name: 'SBI Clerk Syllabus',
          nameTamil: 'SBI எழுத்தர் பாடத்திட்டம்',
          topics: [
            { name: 'English Language', nameTamil: 'ஆங்கில மொழி', subtopics: ['Reading Comprehension', 'Cloze Test', 'Error Spotting', 'Vocabulary'] },
            { name: 'Quantitative Aptitude', nameTamil: 'அளவு திறன்', subtopics: ['Simplification', 'Number Series', 'Data Interpretation', 'Arithmetic'] },
            { name: 'Reasoning Ability', nameTamil: 'தர்க்க திறன்', subtopics: ['Puzzles', 'Seating Arrangement', 'Syllogism', 'Coding-Decoding'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', subtopics: ['Banking Awareness', 'Current Affairs', 'Static GK'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'india-post-gds',
    name: 'India Post GDS (Gramin Dak Sevak)',
    nameTamil: 'இந்திய தபால் GDS (கிராமிய தாக் சேவக்)',
    qualification: '10th Pass',
    qualificationTamil: '10ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 40 years',
    salary: '₹12,000 - ₹14,500/month',
    selectionProcess: 'Merit Based (10th Marks)',
    selectionProcessTamil: 'தகுதி அடிப்படையில் (10ஆம் வகுப்பு மதிப்பெண்கள்)',
    syllabus: {
      main: [
        {
          name: 'India Post GDS Selection',
          nameTamil: 'இந்திய தபால் GDS தேர்வு',
          topics: [
            { name: 'Selection Criteria', nameTamil: 'தேர்வு அளவுகோல்', subtopics: ['No written exam', 'Merit based on 10th class percentage', 'Preference to local candidates', 'Computer knowledge certificate required'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'lic-ado',
    name: 'LIC ADO (Apprentice Development Officer)',
    nameTamil: 'LIC ADO (பயிற்சி மேம்பாட்டு அதிகாரி)',
    qualification: 'Graduate',
    qualificationTamil: 'பட்டதாரி',
    age: '21 - 30 years',
    salary: '₹35,000+/month',
    selectionProcess: 'Prelims → Mains → Interview',
    selectionProcessTamil: 'முதநிலை → முதன்மை → நேர்காணல்',
    syllabus: {
      main: [
        {
          name: 'LIC ADO Syllabus',
          nameTamil: 'LIC ADO பாடத்திட்டம்',
          topics: [
            { name: 'Reasoning Ability', nameTamil: 'தர்க்க திறன்', subtopics: ['Puzzles', 'Seating Arrangement', 'Syllogism', 'Blood Relations'] },
            { name: 'Quantitative Aptitude', nameTamil: 'அளவு திறன்', subtopics: ['Simplification', 'Number Series', 'Data Interpretation'] },
            { name: 'English Language', nameTamil: 'ஆங்கில மொழி', subtopics: ['Reading Comprehension', 'Error Spotting', 'Vocabulary'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Current Affairs', 'Insurance Awareness', 'Economy'] }
          ]
        }
      ]
    },
    pyq: []
  }
];

// ==================== TAMIL NADU STATE GOVT ====================
const stateExams: Exam[] = [
  {
    id: 'tnpsc-group4',
    name: 'TNPSC Group 4',
    nameTamil: 'TNPSC குழு 4',
    qualification: 'SSLC / 12th Pass (varies by post)',
    qualificationTamil: 'SSLC / 12ஆம் வகுப்பு தேர்ச்சி (பதவிக்கு ஏற்ப)',
    age: '18 - 30 years',
    salary: '₹19,500 - ₹62,000/month',
    selectionProcess: 'Written Exam → Certificate Verification',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → சான்றிதழ் சரிபார்ப்பு',
    posts: ['VAO (Village Administrative Officer)', 'Junior Assistant', 'Typist', 'Steno-Typist', 'Field Surveyor'],
    postsTamil: ['கிராம நிர்வாக அலுவலர்', 'இளநிலை உதவியாளர்', 'தட்டச்சர்', 'சுருக்கெழுத்து-தட்டச்சர்', 'கள ஆய்வாளர்'],
    examPattern: [
      { paper: 'Combined Exam', paperTamil: 'ஒருங்கிணைந்த தேர்வு', marks: 300, duration: '3 hours', questions: 200 }
    ],
    syllabus: {
      main: [
        {
          name: 'TNPSC Group 4 Syllabus',
          nameTamil: 'TNPSC குழு 4 பாடத்திட்டம்',
          topics: [
            { name: 'Tamil (100 Questions)', nameTamil: 'தமிழ் (100 கேள்விகள்)', subtopics: ['Tamil Grammar (இலக்கணம்)', 'Tamil Literature (இலக்கியம்)', 'Comprehension', 'Translation', 'Synonyms & Antonyms', 'Proverbs', 'Sangam Literature', 'Modern Tamil Literature'] },
            { name: 'General Studies (75 Questions)', nameTamil: 'பொது அறிவு (75 கேள்விகள்)', subtopics: ['History - Indian & Tamil Nadu History', 'Geography - Indian & TN Geography', 'Indian Polity & Constitution', 'Indian Economy', 'General Science (Physics, Chemistry, Biology)', 'Current Affairs - National & State'] },
            { name: 'Aptitude & Mental Ability (25 Questions)', nameTamil: 'திறன் & மன திறன் (25 கேள்விகள்)', subtopics: ['Number Series', 'Logical Reasoning', 'Analogies', 'Coding-Decoding', 'Blood Relations', 'Direction Sense', 'Simple Math'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'tnpsc-gs-1', question: 'Who founded the Self-Respect Movement?', questionTamil: 'சுயமரியாதை இயக்கத்தை தொடங்கியவர் யார்?', options: ['E.V. Ramasamy Periyar', 'C.N. Annadurai', 'Kamaraj', 'Rajaji'], answer: 0, explanation: 'E.V. Ramasamy (Periyar) started Self-Respect Movement in 1925', subject: 'General Studies', difficulty: 'easy' },
      { id: 'tnpsc-gs-2', question: 'The capital of Chola dynasty was:', questionTamil: 'சோழ வம்சத்தின் தலைநகரம்:', options: ['Madurai', 'Thanjavur', 'Kanchipuram', 'Trichy'], answer: 1, explanation: 'Thanjavur (Tanjore) was the capital of Chola dynasty', subject: 'General Studies', difficulty: 'easy' },
      { id: 'tnpsc-gs-3', question: 'Which river is known as "Dakshina Ganga"?', questionTamil: '"தட்சிண கங்கா" என்று அழைக்கப்படும் ஆறு எது?', options: ['Krishna', 'Kaveri', 'Godavari', 'Tungabhadra'], answer: 2, explanation: 'Godavari is called Dakshina Ganga (Ganges of South)', subject: 'General Studies', difficulty: 'easy' },
      { id: 'tnpsc-gs-4', question: 'The highest peak in Tamil Nadu is:', questionTamil: 'தமிழ்நாட்டின் மிக உயரமான சிகரம்:', options: ['Doddabetta', 'Anaimudi', 'Nilgiri Peak', 'Agasthyamalai'], answer: 0, explanation: 'Doddabetta (2,637m) is highest peak in Tamil Nadu', subject: 'General Studies', difficulty: 'easy' },
      { id: 'tnpsc-gs-5', question: 'Who built the Brihadeeswara Temple?', questionTamil: 'பிரகதீஸ்வரர் கோயிலைக் கட்டியவர்?', options: ['Rajendra Chola', 'Rajaraja Chola I', 'Kulottunga Chola', 'Vijayalaya Chola'], answer: 1, explanation: 'Rajaraja Chola I built Brihadeeswara Temple in Thanjavur', subject: 'General Studies', difficulty: 'easy' },
      { id: 'tnpsc-tamil-1', question: '"ஆத்திசூடி" யை எழுதியவர் யார்?', options: ['திருவள்ளுவர்', 'ஔவையார்', 'கம்பர்', 'இளங்கோவடிகள்'], answer: 1, explanation: 'ஔவையார் ஆத்திசூடியை எழுதினார்', subject: 'Tamil', difficulty: 'easy' },
      { id: 'tnpsc-tamil-2', question: 'தமிழின் முதல் இலக்கண நூல்:', options: ['நன்னூல்', 'தொல்காப்பியம்', 'அகத்தியம்', 'யாப்பருங்கலம்'], answer: 1, explanation: 'தொல்காப்பியம் தமிழின் முதல் இலக்கண நூல்', subject: 'Tamil', difficulty: 'easy' },
      { id: 'tnpsc-tamil-3', question: 'சிலப்பதிகாரத்தை எழுதியவர்:', options: ['கம்பர்', 'இளங்கோவடிகள்', 'சீத்தலைச்சாத்தனார்', 'திருதக்கதேவர்'], answer: 1, explanation: 'இளங்கோவடிகள் சிலப்பதிகாரத்தை எழுதினார்', subject: 'Tamil', difficulty: 'easy' },
      { id: 'tnpsc-tamil-4', question: 'திருக்குறளில் உள்ள அதிகாரங்கள்:', options: ['133', '108', '120', '100'], answer: 0, explanation: 'திருக்குறளில் 133 அதிகாரங்கள் உள்ளன', subject: 'Tamil', difficulty: 'easy' },
      { id: 'tnpsc-tamil-5', question: '"மணிமேகலை" யை எழுதியவர்:', options: ['இளங்கோவடிகள்', 'சீத்தலைச்சாத்தனார்', 'கம்பர்', 'திருவள்ளுவர்'], answer: 1, explanation: 'சீத்தலைச்சாத்தனார் மணிமேகலையை எழுதினார்', subject: 'Tamil', difficulty: 'easy' }
    ]
  },
  {
    id: 'tn-police-constable',
    name: 'TN Police Constable',
    nameTamil: 'தமிழ்நாடு காவல் காவலர்',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 24 years',
    salary: '₹22,000/month',
    selectionProcess: 'Written → Physical → Medical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → உடற்தகுதி → மருத்துவம்',
    syllabus: {
      main: [
        {
          name: 'TN Police Constable Syllabus',
          nameTamil: 'தமிழ்நாடு காவல் காவலர் பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Tamil Nadu History', 'Indian History', 'Geography', 'Polity', 'Current Affairs'] },
            { name: 'Aptitude & Mental Ability', nameTamil: 'திறன் & மன திறன்', subtopics: ['Number Series', 'Reasoning', 'Logical Ability'] },
            { name: 'Tamil', nameTamil: 'தமிழ்', subtopics: ['Grammar', 'Literature', 'Comprehension'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'tn-forest-guard',
    name: 'TN Forest Guard',
    nameTamil: 'தமிழ்நாடு வன காவலர்',
    qualification: '10th/12th Pass',
    qualificationTamil: '10/12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 30 years',
    salary: '₹20,000/month',
    selectionProcess: 'Written → Physical → Medical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → உடற்தகுதி → மருத்துவம்',
    syllabus: {
      main: [
        {
          name: 'TN Forest Guard Syllabus',
          nameTamil: 'தமிழ்நாடு வன காவலர் பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Forest & Wildlife', 'Environment', 'TN Geography', 'Current Affairs'] },
            { name: 'Aptitude', nameTamil: 'திறன்', subtopics: ['Mathematics', 'Reasoning'] },
            { name: 'Tamil', nameTamil: 'தமிழ்', subtopics: ['Grammar', 'Comprehension'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'tneb-assessor',
    name: 'TNEB Assessor',
    nameTamil: 'TNEB மதிப்பீட்டாளர்',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 30 years',
    salary: '₹20,000/month',
    selectionProcess: 'Written Exam',
    selectionProcessTamil: 'எழுத்துத் தேர்வு',
    syllabus: {
      main: [
        {
          name: 'TNEB Assessor Syllabus',
          nameTamil: 'TNEB மதிப்பீட்டாளர் பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Current Affairs', 'History', 'Geography', 'Science'] },
            { name: 'Aptitude', nameTamil: 'திறன்', subtopics: ['Mathematics', 'Reasoning'] },
            { name: 'Tamil', nameTamil: 'தமிழ்', subtopics: ['Grammar', 'Literature'] }
          ]
        }
      ]
    },
    pyq: []
  }
];

// ==================== OTHER CENTRAL GOVT ====================
const centralExams: Exam[] = [
  {
    id: 'army-clerk',
    name: 'Indian Army Clerk/SKT',
    nameTamil: 'இந்திய ராணுவ எழுத்தர்/SKT',
    qualification: '12th Pass (60%)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (60%)',
    age: '17.5 - 23 years',
    salary: '₹25,000/month',
    selectionProcess: 'Written → Physical → Medical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → உடற்தகுதி → மருத்துவம்',
    syllabus: {
      main: [
        {
          name: 'Army Clerk Syllabus',
          nameTamil: 'ராணுவ எழுத்தர் பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['History', 'Geography', 'Polity', 'Current Affairs', 'Defence'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', subtopics: ['Arithmetic', 'Algebra', 'Geometry', 'Statistics'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', subtopics: ['Grammar', 'Vocabulary', 'Comprehension'] },
            { name: 'Computer', nameTamil: 'கணினி', subtopics: ['MS Office', 'Internet', 'Basics'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'fci-watchman',
    name: 'FCI Watchman',
    nameTamil: 'FCI காவலாளி',
    qualification: '10th/12th Pass',
    qualificationTamil: '10/12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 25 years',
    salary: '₹18,000/month',
    selectionProcess: 'Written → Physical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → உடற்தகுதி',
    syllabus: {
      main: [
        {
          name: 'FCI Watchman Syllabus',
          nameTamil: 'FCI காவலாளி பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Current Affairs', 'History', 'Geography'] },
            { name: 'Reasoning', nameTamil: 'தர்க்கம்', subtopics: ['Verbal', 'Non-Verbal'] },
            { name: 'Numerical Ability', nameTamil: 'எண் திறன்', subtopics: ['Basic Mathematics'] }
          ]
        }
      ]
    },
    pyq: []
  }
];

// ==================== CATEGORIES ====================
export const governmentExamCategories: Category[] = [
  {
    id: 'defence',
    name: 'Defence & Paramilitary',
    nameTamil: 'பாதுகாப்பு & துணை ராணுவம்',
    icon: '🛡️',
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    exams: defenceExams
  },
  {
    id: 'railway',
    name: 'Railway Jobs',
    nameTamil: 'ரயில்வே வேலைகள்',
    icon: '🚂',
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    exams: railwayExams
  },
  {
    id: 'ssc',
    name: 'SSC',
    nameTamil: 'SSC',
    icon: '📋',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    exams: sscExams
  },
  {
    id: 'banking',
    name: 'Banking & Insurance',
    nameTamil: 'வங்கி & காப்பீடு',
    icon: '🏦',
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    exams: bankingExams
  },
  {
    id: 'state',
    name: 'Tamil Nadu State Govt',
    nameTamil: 'தமிழ்நாடு மாநில அரசு',
    icon: '🏛️',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-300',
    exams: stateExams
  },
  {
    id: 'central',
    name: 'Other Central Govt',
    nameTamil: 'பிற மத்திய அரசு',
    icon: '🏢',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    exams: centralExams
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  return governmentExamCategories.find(cat => cat.id === id);
};

export const getExamById = (categoryId: string, examId: string): Exam | undefined => {
  const category = getCategoryById(categoryId);
  return category?.exams.find(exam => exam.id === examId);
};
