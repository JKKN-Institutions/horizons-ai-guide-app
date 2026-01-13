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
    selectionProcessTamil: 'பொது நுழைவுத் தேர்வு → உடற்தகுதி → மருத்துவம்',
    examPattern: [
      { paper: 'Common Entrance Exam', paperTamil: 'பொது நுழைவுத் தேர்வு', marks: 100, duration: '1 hour', questions: 50 }
    ],
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
      ],
      clerkSKT: [
        {
          name: 'Agniveer Clerk/SKT Syllabus',
          nameTamil: 'அக்னிவீர் எழுத்தர்/SKT பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge + Computer', nameTamil: 'பொது அறிவு + கணினி', subtopics: ['All GK Topics + Computer Awareness'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', subtopics: ['Arithmetic', 'Algebra', 'Geometry', 'Mensuration', 'Statistics'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', subtopics: ['Grammar', 'Vocabulary', 'Comprehension', 'Sentence Formation', 'Error Spotting'] },
            { name: 'Computer', nameTamil: 'கணினி', subtopics: ['MS Word', 'MS Excel', 'MS PowerPoint', 'Internet Basics', 'Computer Shortcuts', 'Operating System Basics'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'agni-gk-1', question: 'Which is the longest river in India?', questionTamil: 'இந்தியாவின் மிக நீளமான நதி எது?', options: ['Ganga', 'Godavari', 'Brahmaputra', 'Yamuna'], optionsTamil: ['கங்கை', 'கோதாவரி', 'பிரம்மபுத்ரா', 'யமுனா'], answer: 0, explanation: 'Ganga is the longest river in India (2525 km)', explanationTamil: 'கங்கை இந்தியாவின் மிக நீளமான நதி (2525 கி.மீ)', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'agni-math-1', question: 'If 15% of x = 45, then x = ?', questionTamil: 'x இன் 15% = 45 எனில், x = ?', options: ['300', '250', '200', '350'], optionsTamil: ['300', '250', '200', '350'], answer: 0, explanation: '15% of x = 45 → x = 45 × 100/15 = 300', explanationTamil: 'x இன் 15% = 45 → x = 45 × 100/15 = 300', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'agni-reas-1', question: 'Find the next term: 2, 6, 12, 20, 30, ?', questionTamil: 'அடுத்த எண்ணைக் கண்டறியவும்: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], optionsTamil: ['40', '42', '44', '46'], answer: 1, explanation: 'Differences: 4, 6, 8, 10, 12. Next: 30 + 12 = 42', explanationTamil: 'வேறுபாடுகள்: 4, 6, 8, 10, 12. அடுத்தது: 30 + 12 = 42', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'agni-sci-1', question: 'The chemical symbol of Gold is:', questionTamil: 'தங்கத்தின் வேதியியல் குறியீடு:', options: ['Go', 'Gd', 'Au', 'Ag'], optionsTamil: ['Go', 'Gd', 'Au', 'Ag'], answer: 2, explanation: 'Au (from Latin "Aurum") is Gold. Ag is Silver', explanationTamil: 'Au (லத்தீன் "Aurum" இலிருந்து) தங்கம். Ag என்பது வெள்ளி', subject: 'General Science', difficulty: 'easy' },
      { id: 'agni-gk-2', question: 'Who is known as "Father of Indian Constitution"?', questionTamil: '"இந்திய அரசியலமைப்பின் தந்தை" என அழைக்கப்படுபவர் யார்?', options: ['Jawaharlal Nehru', 'B.R. Ambedkar', 'Mahatma Gandhi', 'Sardar Patel'], optionsTamil: ['ஜவஹர்லால் நேரு', 'பி.ஆர். அம்பேத்கர்', 'மகாத்மா காந்தி', 'சர்தார் படேல்'], answer: 1, explanation: 'Dr. B.R. Ambedkar was the Chairman of Drafting Committee', explanationTamil: 'டாக்டர் பி.ஆர். அம்பேத்கர் வரைவுக் குழுவின் தலைவராக இருந்தார்', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'agni-gk-3', question: 'The capital of Arunachal Pradesh is:', questionTamil: 'அருணாச்சல பிரதேசத்தின் தலைநகரம்:', options: ['Itanagar', 'Imphal', 'Shillong', 'Kohima'], optionsTamil: ['இட்டாநகர்', 'இம்பால்', 'ஷில்லாங்', 'கோஹிமா'], answer: 0, explanation: 'Itanagar is the capital of Arunachal Pradesh', explanationTamil: 'இட்டாநகர் அருணாச்சல பிரதேசத்தின் தலைநகரம்', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'agni-sci-2', question: 'Which gas is released during photosynthesis?', questionTamil: 'ஒளிச்சேர்க்கையின் போது வெளியிடப்படும் வாயு எது?', options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], optionsTamil: ['கார்பன் டை ஆக்சைடு', 'ஆக்சிஜன்', 'நைட்ரஜன்', 'ஹைட்ரஜன்'], answer: 1, explanation: 'Plants release Oxygen during photosynthesis', explanationTamil: 'தாவரங்கள் ஒளிச்சேர்க்கையின் போது ஆக்சிஜனை வெளியிடுகின்றன', subject: 'General Science', difficulty: 'easy' },
      { id: 'agni-reas-2', question: 'COMPUTER is coded as RFUVQNPC, then PRINTER is:', questionTamil: 'COMPUTER என்பது RFUVQNPC என குறியீடு செய்யப்பட்டால், PRINTER என்பது:', options: ['QSJOUFQ', 'QSJOUFS', 'OQJOUFS', 'SFUOJQR'], optionsTamil: ['QSJOUFQ', 'QSJOUFS', 'OQJOUFS', 'SFUOJQR'], answer: 1, explanation: 'Each letter is replaced by +1, -1, +1, -1... pattern', explanationTamil: 'ஒவ்வொரு எழுத்தும் +1, -1, +1, -1... முறையில் மாற்றப்படுகிறது', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'agni-math-2', question: 'A train 200m long passes a pole in 20 seconds. Find speed in km/hr:', questionTamil: '200 மீ நீளமுள்ள ரயில் ஒரு கம்பத்தை 20 வினாடிகளில் கடக்கிறது. கி.மீ/மணியில் வேகம்:', options: ['36 km/hr', '40 km/hr', '45 km/hr', '50 km/hr'], optionsTamil: ['36 கி.மீ/மணி', '40 கி.மீ/மணி', '45 கி.மீ/மணி', '50 கி.மீ/மணி'], answer: 0, explanation: 'Speed = 200/20 = 10 m/s = 10 × 18/5 = 36 km/hr', explanationTamil: 'வேகம் = 200/20 = 10 மீ/வி = 10 × 18/5 = 36 கி.மீ/மணி', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'agni-gk-4', question: 'The "Quit India" movement was started by Mahatma Gandhi in:', questionTamil: '"வெள்ளையனே வெளியேறு" இயக்கம் மகாத்மா காந்தியால் தொடங்கப்பட்ட ஆண்டு:', options: ['1940', '1942', '1944', '1946'], optionsTamil: ['1940', '1942', '1944', '1946'], answer: 1, explanation: 'Quit India Movement started on 8th August 1942', explanationTamil: 'வெள்ளையனே வெளியேறு இயக்கம் 1942 ஆகஸ்ட் 8 அன்று தொடங்கியது', subject: 'General Knowledge', difficulty: 'easy' }
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
    examPattern: [
      { paper: 'Written Exam', paperTamil: 'எழுத்துத் தேர்வு', marks: 100, duration: '1 hour', questions: 100 }
    ],
    syllabus: {
      main: [
        {
          name: 'Agniveer Navy Syllabus',
          nameTamil: 'அக்னிவீர் கடற்படை பாடத்திட்டம்',
          topics: [
            { name: 'Science', nameTamil: 'அறிவியல்', subtopics: ['Physics: Mechanics, Heat, Light, Sound, Electricity', 'Chemistry: Elements, Compounds, Reactions', 'Mathematics: Algebra, Trigonometry, Geometry'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', subtopics: ['Grammar', 'Vocabulary', 'Comprehension', 'Synonyms & Antonyms'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Current Affairs', 'Geography', 'History', 'Indian Polity', 'Defence'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'navy-phy-1', question: 'The SI unit of electric current is:', questionTamil: 'மின்னோட்டத்தின் SI அலகு:', options: ['Ampere', 'Volt', 'Ohm', 'Watt'], optionsTamil: ['ஆம்பியர்', 'வோல்ட்', 'ஓம்', 'வாட்'], answer: 0, explanation: 'Ampere (A) is the SI unit of electric current', explanationTamil: 'ஆம்பியர் (A) மின்னோட்டத்தின் SI அலகு', subject: 'Physics', difficulty: 'easy' },
      { id: 'navy-chem-1', question: 'The chemical formula of water is:', questionTamil: 'நீரின் வேதிச் சூத்திரம்:', options: ['H₂O', 'CO₂', 'NaCl', 'H₂SO₄'], optionsTamil: ['H₂O', 'CO₂', 'NaCl', 'H₂SO₄'], answer: 0, explanation: 'Water is composed of 2 hydrogen and 1 oxygen atom: H₂O', explanationTamil: 'நீர் 2 ஹைட்ரஜன் மற்றும் 1 ஆக்சிஜன் அணுவால் ஆனது: H₂O', subject: 'Chemistry', difficulty: 'easy' },
      { id: 'navy-gk-1', question: 'Indian Navy Day is celebrated on:', questionTamil: 'இந்திய கடற்படை தினம் கொண்டாடப்படும் நாள்:', options: ['December 4', 'January 15', 'October 8', 'November 14'], optionsTamil: ['டிசம்பர் 4', 'ஜனவரி 15', 'அக்டோபர் 8', 'நவம்பர் 14'], answer: 0, explanation: 'Navy Day is on December 4 to commemorate Operation Trident (1971)', explanationTamil: 'கடற்படை தினம் டிசம்பர் 4 - ஆபரேஷன் ட்ரைடன்ட் (1971) நினைவாக', subject: 'General Knowledge', difficulty: 'easy' }
    ]
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
    examPattern: [
      { paper: 'Written Exam', paperTamil: 'எழுத்துத் தேர்வு', marks: 100, duration: '1 hour', questions: 100 }
    ],
    syllabus: {
      main: [
        {
          name: 'Agniveer Air Force Syllabus',
          nameTamil: 'அக்னிவீர் விமானப்படை பாடத்திட்டம்',
          topics: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', subtopics: ['Mechanics', 'Thermodynamics', 'Optics', 'Electricity', 'Magnetism'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', subtopics: ['Algebra', 'Trigonometry', 'Calculus', 'Geometry', 'Probability'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', subtopics: ['Grammar', 'Vocabulary', 'Comprehension'] },
            { name: 'Reasoning', nameTamil: 'தர்க்கம்', subtopics: ['Verbal', 'Non-Verbal', 'Spatial Reasoning'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'af-gk-1', question: 'Indian Air Force was established in:', questionTamil: 'இந்திய விமானப்படை நிறுவப்பட்ட ஆண்டு:', options: ['1932', '1947', '1950', '1962'], optionsTamil: ['1932', '1947', '1950', '1962'], answer: 0, explanation: 'IAF was established on 8 October 1932 as the Royal Indian Air Force', explanationTamil: 'IAF 1932 அக்டோபர் 8 அன்று ராயல் இந்திய விமானப்படையாக நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'af-phy-1', question: 'The principle behind airplane flight is:', questionTamil: 'விமான பறப்பின் பின்னால் உள்ள கொள்கை:', options: ['Bernoulli\'s principle', 'Newton\'s law', 'Pascal\'s law', 'Archimedes\' principle'], optionsTamil: ['பெர்னூலியின் கொள்கை', 'நியூட்டன் விதி', 'பாஸ்கல் விதி', 'ஆர்க்கிமிடிஸ் கொள்கை'], answer: 0, explanation: 'Bernoulli\'s principle explains lift in airplane wings', explanationTamil: 'பெர்னூலியின் கொள்கை விமான இறக்கைகளில் லிஃப்ட் விளக்குகிறது', subject: 'Physics', difficulty: 'medium' }
    ]
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
    examPattern: [
      { paper: 'Written Exam', paperTamil: 'எழுத்துத் தேர்வு', marks: 100, duration: '1 hour', questions: 100 }
    ],
    syllabus: {
      main: [
        {
          name: 'Coast Guard Syllabus',
          nameTamil: 'கடலோர காவல் பாடத்திட்டம்',
          topics: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', subtopics: ['Algebra', 'Trigonometry', 'Geometry', 'Mensuration'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', subtopics: ['Mechanics', 'Heat', 'Light', 'Electricity'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', subtopics: ['Elements', 'Compounds', 'Reactions'] },
            { name: 'English & GK', nameTamil: 'ஆங்கிலம் & பொது அறிவு', subtopics: ['Grammar', 'Vocabulary', 'Current Affairs', 'Coast Guard Info'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'cg-gk-1', question: 'Indian Coast Guard was established in:', questionTamil: 'இந்திய கடலோர காவல் நிறுவப்பட்ட ஆண்டு:', options: ['1978', '1965', '1947', '1990'], optionsTamil: ['1978', '1965', '1947', '1990'], answer: 0, explanation: 'Indian Coast Guard was established on 18th August 1978', explanationTamil: 'இந்திய கடலோர காவல் 1978 ஆகஸ்ட் 18 அன்று நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'cg-gk-2', question: 'The motto of Indian Coast Guard is:', questionTamil: 'இந்திய கடலோர காவலின் குறிக்கோள்:', options: ['Vayam Rakshamah', 'Satyameva Jayate', 'Service Before Self', 'Jai Hind'], optionsTamil: ['வயம் ரக்ஷாமஹ்', 'சத்யமேவ ஜயதே', 'சேவை முதலில்', 'ஜெய் ஹிந்த்'], answer: 0, explanation: '"Vayam Rakshamah" means "We Protect"', explanationTamil: '"வயம் ரக்ஷாமஹ்" என்றால் "நாங்கள் பாதுகாக்கிறோம்"', subject: 'General Knowledge', difficulty: 'medium' }
    ]
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
    posts: ['BSF Constable', 'CRPF Constable', 'CISF Constable', 'ITBP Constable'],
    postsTamil: ['BSF காவலர்', 'CRPF காவலர்', 'CISF காவலர்', 'ITBP காவலர்'],
    syllabus: {
      main: [
        {
          name: 'Paramilitary Constable Syllabus',
          nameTamil: 'துணை ராணுவ காவலர் பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Current Affairs', 'History', 'Geography', 'Polity', 'Defence'] },
            { name: 'Elementary Mathematics', nameTamil: 'அடிப்படை கணிதம்', subtopics: ['Arithmetic', 'Number System', 'Percentage', 'Average'] },
            { name: 'Reasoning', nameTamil: 'தர்க்கம்', subtopics: ['Verbal', 'Non-Verbal', 'Analytical'] },
            { name: 'English/Hindi', nameTamil: 'ஆங்கிலம்/இந்தி', subtopics: ['Grammar', 'Vocabulary', 'Comprehension'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'bsf-gk-1', question: 'BSF stands for:', questionTamil: 'BSF என்பதன் விரிவாக்கம்:', options: ['Border Security Force', 'Border Safety Force', 'Border Surveillance Force', 'Basic Security Force'], optionsTamil: ['எல்லை பாதுகாப்புப் படை', 'எல்லை பாதுகாப்பு படை', 'எல்லை கண்காணிப்பு படை', 'அடிப்படை பாதுகாப்பு படை'], answer: 0, explanation: 'BSF = Border Security Force, established in 1965', explanationTamil: 'BSF = எல்லை பாதுகாப்புப் படை, 1965 இல் நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'bsf-gk-2', question: 'CRPF headquarters is located at:', questionTamil: 'CRPF தலைமையகம் அமைந்துள்ள இடம்:', options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'], optionsTamil: ['புது தில்லி', 'மும்பை', 'கொல்கத்தா', 'சென்னை'], answer: 0, explanation: 'CRPF Headquarters is at CGO Complex, New Delhi', explanationTamil: 'CRPF தலைமையகம் CGO வளாகம், புது தில்லியில் உள்ளது', subject: 'General Knowledge', difficulty: 'easy' }
    ]
  }
];

// ==================== RAILWAY JOBS ====================
const railwayExams: Exam[] = [
  {
    id: 'rrb-ntpc',
    name: 'RRB NTPC (Non-Technical Popular Categories)',
    nameTamil: 'RRB NTPC (தொழில்நுட்பமற்ற பிரபலப் பிரிவுகள்)',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 33 years',
    salary: '₹19,900 - ₹35,400/month',
    selectionProcess: 'CBT 1 → CBT 2 → Typing Test → Document Verification',
    selectionProcessTamil: 'CBT 1 → CBT 2 → தட்டச்சு சோதனை → ஆவண சரிபார்ப்பு',
    posts: ['Commercial Cum Ticket Clerk', 'Accounts Clerk', 'Junior Clerk', 'Trains Clerk'],
    postsTamil: ['வணிக டிக்கெட் எழுத்தர்', 'கணக்கு எழுத்தர்', 'இளநிலை எழுத்தர்', 'ரயில் எழுத்தர்'],
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
            { name: 'General Intelligence & Reasoning (30 Questions)', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம் (30 கேள்விகள்)', subtopics: ['Analogies', 'Coding-Decoding', 'Syllogism', 'Puzzles', 'Data Sufficiency', 'Statement-Conclusion', 'Blood Relations', 'Venn Diagrams', 'Alphabet & Number Series', 'Mathematical Operations', 'Analytical Reasoning', 'Classification', 'Directions', 'Decision Making'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'ntpc-ga-1', question: 'Who is known as the "Iron Man of India"?', questionTamil: '"இந்தியாவின் இரும்பு மனிதர்" என்று அறியப்படுபவர் யார்?', options: ['Jawaharlal Nehru', 'Sardar Vallabhbhai Patel', 'Subhash Chandra Bose', 'Mahatma Gandhi'], optionsTamil: ['ஜவஹர்லால் நேரு', 'சர்தார் வல்லபாய் படேல்', 'சுபாஷ் சந்திர போஸ்', 'மகாத்மா காந்தி'], answer: 1, explanation: 'Sardar Vallabhbhai Patel is called Iron Man for unifying 562 princely states', explanationTamil: '562 சமஸ்தானங்களை ஒன்றிணைத்ததற்காக சர்தார் வல்லபாய் படேல் இரும்பு மனிதர் என அழைக்கப்படுகிறார்', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ntpc-ga-2', question: 'Which is the largest gland in human body?', questionTamil: 'மனித உடலில் மிகப்பெரிய சுரப்பி எது?', options: ['Thyroid', 'Liver', 'Pancreas', 'Pituitary'], optionsTamil: ['தைராய்டு', 'கல்லீரல்', 'கணையம்', 'பிட்யூட்டரி'], answer: 1, explanation: 'Liver is the largest gland (weighs about 1.5 kg)', explanationTamil: 'கல்லீரல் மிகப்பெரிய சுரப்பி (சுமார் 1.5 கிலோ எடை)', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ntpc-ga-3', question: 'The headquarters of ISRO is located in:', questionTamil: 'ISRO இன் தலைமையகம் அமைந்துள்ள இடம்:', options: ['Chennai', 'Mumbai', 'Bengaluru', 'Hyderabad'], optionsTamil: ['சென்னை', 'மும்பை', 'பெங்களூரு', 'ஹைதராபாத்'], answer: 2, explanation: 'ISRO HQ is in Bengaluru, Karnataka', explanationTamil: 'ISRO தலைமையகம் கர்நாடகாவில் பெங்களூருவில் உள்ளது', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ntpc-ga-4', question: 'Which Article of Constitution abolishes untouchability?', questionTamil: 'எந்த அரசியலமைப்பு சட்டப்பிரிவு தீண்டாமையை ஒழிக்கிறது?', options: ['Article 14', 'Article 15', 'Article 17', 'Article 21'], optionsTamil: ['சட்டப்பிரிவு 14', 'சட்டப்பிரிவு 15', 'சட்டப்பிரிவு 17', 'சட்டப்பிரிவு 21'], answer: 2, explanation: 'Article 17 abolishes untouchability and makes it punishable', explanationTamil: 'சட்டப்பிரிவு 17 தீண்டாமையை ஒழித்து தண்டனைக்குரியதாக்குகிறது', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'ntpc-ga-5', question: 'The Quit India Movement was launched in:', questionTamil: 'வெள்ளையனே வெளியேறு இயக்கம் தொடங்கப்பட்ட ஆண்டு:', options: ['1940', '1942', '1944', '1946'], optionsTamil: ['1940', '1942', '1944', '1946'], answer: 1, explanation: 'Quit India Movement - 8 August 1942 (Do or Die)', explanationTamil: 'வெள்ளையனே வெளியேறு இயக்கம் - 1942 ஆகஸ்ட் 8 (செய் அல்லது சாவு)', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ntpc-ga-6', question: 'Who invented the telephone?', questionTamil: 'தொலைபேசியைக் கண்டுபிடித்தவர் யார்?', options: ['Thomas Edison', 'Alexander Graham Bell', 'Marconi', 'Wright Brothers'], optionsTamil: ['தாமஸ் எடிசன்', 'அலெக்சாண்டர் கிரகாம் பெல்', 'மார்கோனி', 'ரைட் சகோதரர்கள்'], answer: 1, explanation: 'Alexander Graham Bell invented telephone in 1876', explanationTamil: 'அலெக்சாண்டர் கிரகாம் பெல் 1876 இல் தொலைபேசியைக் கண்டுபிடித்தார்', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ntpc-ga-7', question: 'Which river is called "Sorrow of Bengal"?', questionTamil: '"வங்காளத்தின் துக்கம்" என்று அழைக்கப்படும் நதி எது?', options: ['Ganga', 'Brahmaputra', 'Damodar', 'Hooghly'], optionsTamil: ['கங்கை', 'பிரம்மபுத்ரா', 'தாமோதர்', 'ஹூக்லி'], answer: 2, explanation: 'Damodar river caused frequent floods in Bengal', explanationTamil: 'தாமோதர் நதி வங்காளத்தில் அடிக்கடி வெள்ளத்தை ஏற்படுத்தியது', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'ntpc-math-1', question: 'A train 150m long passes a pole in 15 seconds. Find its speed in km/hr.', questionTamil: '150 மீ நீளமுள்ள ரயில் ஒரு கம்பத்தை 15 வினாடிகளில் கடக்கிறது. கி.மீ/மணியில் வேகம்:', options: ['36 km/hr', '40 km/hr', '45 km/hr', '50 km/hr'], optionsTamil: ['36 கி.மீ/மணி', '40 கி.மீ/மணி', '45 கி.மீ/மணி', '50 கி.மீ/மணி'], answer: 0, explanation: 'Speed = 150/15 = 10 m/s = 10 × 18/5 = 36 km/hr', explanationTamil: 'வேகம் = 150/15 = 10 மீ/வி = 10 × 18/5 = 36 கி.மீ/மணி', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'ntpc-math-2', question: 'The average of 5 consecutive odd numbers is 27. Find the largest number.', questionTamil: '5 தொடர்ச்சியான ஒற்றைப்படை எண்களின் சராசரி 27. மிகப்பெரிய எண்ணைக் கண்டறியவும்.', options: ['29', '31', '33', '35'], optionsTamil: ['29', '31', '33', '35'], answer: 1, explanation: 'If average is 27, middle number is 27. So: 23, 25, 27, 29, 31. Largest = 31', explanationTamil: 'சராசரி 27 எனில், நடு எண் 27. எனவே: 23, 25, 27, 29, 31. மிகப்பெரியது = 31', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'ntpc-math-3', question: 'A sum becomes ₹6050 in 2 years at 10% compound interest. Find the sum.', questionTamil: 'ஒரு தொகை 10% கூட்டு வட்டியில் 2 ஆண்டுகளில் ₹6050 ஆகிறது. தொகையைக் கண்டறியவும்.', options: ['₹5000', '₹4500', '₹5500', '₹4000'], optionsTamil: ['₹5000', '₹4500', '₹5500', '₹4000'], answer: 0, explanation: 'P(1+10/100)² = 6050 → P × 1.21 = 6050 → P = 5000', explanationTamil: 'P(1+10/100)² = 6050 → P × 1.21 = 6050 → P = 5000', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'ntpc-reas-1', question: 'APPLE : ELPPA :: MANGO : ?', questionTamil: 'APPLE : ELPPA :: MANGO : ?', options: ['OGNAM', 'OGANM', 'MANOG', 'NAGOM'], optionsTamil: ['OGNAM', 'OGANM', 'MANOG', 'NAGOM'], answer: 0, explanation: 'Reverse of MANGO = OGNAM', explanationTamil: 'MANGO இன் தலைகீழ் = OGNAM', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'ntpc-reas-2', question: 'Find the odd one out: 8, 27, 64, 100, 125', questionTamil: 'வித்தியாசமானதைக் கண்டறியவும்: 8, 27, 64, 100, 125', options: ['27', '64', '100', '125'], optionsTamil: ['27', '64', '100', '125'], answer: 2, explanation: '8=2³, 27=3³, 64=4³, 125=5³. 100 is not a perfect cube', explanationTamil: '8=2³, 27=3³, 64=4³, 125=5³. 100 ஒரு முழு கனசதுரம் அல்ல', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'ntpc-reas-3', question: 'A is B\'s brother. C is A\'s mother. D is C\'s father. What is B to D?', questionTamil: 'A என்பவர் B இன் சகோதரன். C என்பவர் A இன் தாய். D என்பவர் C இன் தந்தை. B, D க்கு என்ன உறவு?', options: ['Grandfather', 'Grandson/Granddaughter', 'Son', 'Father'], optionsTamil: ['தாத்தா', 'பேரன்/பேத்தி', 'மகன்', 'தந்தை'], answer: 1, explanation: 'D is grandfather of A and B. So B is grandchild of D', explanationTamil: 'D என்பவர் A மற்றும் B இன் தாத்தா. எனவே B என்பவர் D இன் பேரன்/பேத்தி', subject: 'Reasoning', difficulty: 'medium' }
    ]
  },
  {
    id: 'rrb-group-d',
    name: 'RRB Group D',
    nameTamil: 'RRB குரூப் D',
    qualification: '10th Pass + ITI OR 12th Pass',
    qualificationTamil: '10ஆம் வகுப்பு + ITI அல்லது 12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 33 years',
    salary: '₹18,000/month',
    selectionProcess: 'CBT → PET → Document Verification',
    selectionProcessTamil: 'CBT → உடல் தகுதி → ஆவண சரிபார்ப்பு',
    posts: ['Track Maintainer', 'Helper', 'Porter', 'Pointsman'],
    postsTamil: ['தடம் பராமரிப்பாளர்', 'உதவியாளர்', 'போர்ட்டர்', 'பாயின்ட்ஸ்மேன்'],
    examPattern: [
      { paper: 'CBT', paperTamil: 'CBT', marks: 100, duration: '90 mins', questions: 100 }
    ],
    syllabus: {
      main: [
        {
          name: 'Group D CBT Syllabus',
          nameTamil: 'குரூப் D CBT பாடத்திட்டம்',
          topics: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', subtopics: ['Number System', 'BODMAS', 'Decimals', 'Fractions', 'LCM, HCF', 'Ratio & Proportion', 'Percentages', 'Mensuration', 'Time & Work', 'Time & Distance', 'Simple & Compound Interest', 'Profit & Loss'] },
            { name: 'General Intelligence & Reasoning', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்', subtopics: ['Analogies', 'Alphabetical & Number Series', 'Coding & Decoding', 'Mathematical Operations', 'Relationships', 'Syllogism', 'Jumbling', 'Venn Diagram', 'Data Interpretation', 'Conclusions', 'Similarities & Differences'] },
            { name: 'General Science', nameTamil: 'பொது அறிவியல்', subtopics: ['Physics', 'Chemistry', 'Life Sciences (Biology)'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', subtopics: ['Current Affairs', 'Indian History', 'Indian Geography', 'Indian Polity', 'Sports', 'Art & Culture'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'grpd-math-1', question: 'The LCM of 12, 15, and 20 is:', questionTamil: '12, 15, மற்றும் 20 இன் மீச்சிறு பொது மடங்கு:', options: ['60', '120', '180', '240'], optionsTamil: ['60', '120', '180', '240'], answer: 0, explanation: 'LCM = 60 (12=2²×3, 15=3×5, 20=2²×5, LCM=2²×3×5=60)', explanationTamil: 'மீச்சிறு பொது மடங்கு = 60', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'grpd-sci-1', question: 'The chemical symbol for Iron is:', questionTamil: 'இரும்பின் வேதியியல் குறியீடு:', options: ['Ir', 'Fe', 'In', 'I'], optionsTamil: ['Ir', 'Fe', 'In', 'I'], answer: 1, explanation: 'Fe is from Latin "Ferrum"', explanationTamil: 'Fe என்பது லத்தீன் "Ferrum" இலிருந்து வந்தது', subject: 'General Science', difficulty: 'easy' }
    ]
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
    selectionProcessTamil: 'CBT → உடல் தகுதி → ஆவண சரிபார்ப்பு',
    examPattern: [
      { paper: 'CBT', paperTamil: 'CBT', marks: 120, duration: '90 mins', questions: 120 }
    ],
    syllabus: {
      main: [
        {
          name: 'RPF Constable Syllabus',
          nameTamil: 'RPF காவலர் பாடத்திட்டம்',
          topics: [
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', subtopics: ['Current Affairs', 'Railway Information', 'History', 'Geography', 'Polity'] },
            { name: 'Arithmetic', nameTamil: 'எண்கணிதம்', subtopics: ['Number System', 'Percentage', 'Ratio', 'Time & Work', 'Profit & Loss'] },
            { name: 'General Intelligence & Reasoning', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்', subtopics: ['Coding-Decoding', 'Analogy', 'Series', 'Blood Relations', 'Puzzles'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'rpf-gk-1', question: 'RPF stands for:', questionTamil: 'RPF என்பதன் விரிவாக்கம்:', options: ['Railway Protection Force', 'Railway Police Force', 'Railway Patrol Force', 'Railway Police Federation'], optionsTamil: ['ரயில்வே பாதுகாப்புப் படை', 'ரயில்வே போலீஸ் படை', 'ரயில்வே ரோந்து படை', 'ரயில்வே போலீஸ் கூட்டமைப்பு'], answer: 0, explanation: 'Railway Protection Force protects railway property and passengers', explanationTamil: 'ரயில்வே பாதுகாப்புப் படை ரயில்வே சொத்து மற்றும் பயணிகளை பாதுகாக்கிறது', subject: 'General Awareness', difficulty: 'easy' }
    ]
  },
  {
    id: 'railway-apprentice',
    name: 'Railway Apprentice',
    nameTamil: 'ரயில்வே பயிற்சி',
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
          nameTamil: 'ரயில்வே பயிற்சி தேர்வு',
          topics: [
            { name: 'Selection Criteria', nameTamil: 'தேர்வு அளவுகோல்கள்', subtopics: ['10th/12th Marks Merit', 'ITI Qualification (if applicable)', 'Age Criteria', 'Physical Standards'] }
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
            { name: 'General Intelligence (25 Questions, 50 Marks)', nameTamil: 'பொது புத்திசாலித்தனம் (25 கேள்விகள், 50 மதிப்பெண்கள்)', subtopics: ['Semantic Analogy', 'Symbolic/Number Analogy', 'Semantic Classification', 'Symbolic/Number Classification', 'Figural Classification', 'Semantic Series', 'Number Series', 'Figural Series', 'Problem Solving', 'Word Building', 'Coding & Decoding', 'Numerical Operations', 'Trends', 'Space Orientation', 'Venn Diagrams', 'Figural Pattern', 'Embedded Figures', 'Critical Thinking'] },
            { name: 'English Language (25 Questions, 50 Marks)', nameTamil: 'ஆங்கில மொழி (25 கேள்விகள், 50 மதிப்பெண்கள்)', subtopics: ['Spot the Error', 'Fill in the Blanks', 'Synonyms', 'Antonyms', 'Spelling/Detecting Misspelt Words', 'Idioms & Phrases', 'One Word Substitution', 'Improvement of Sentences', 'Active/Passive Voice', 'Direct/Indirect Speech', 'Shuffling of Sentence Parts', 'Cloze Passage', 'Comprehension Passage'] },
            { name: 'Quantitative Aptitude (25 Questions, 50 Marks)', nameTamil: 'அளவு திறன் (25 கேள்விகள், 50 மதிப்பெண்கள்)', subtopics: ['Number Systems', 'Fundamental Operations', 'Percentages', 'Ratio & Proportion', 'Square Roots', 'Averages', 'Interest', 'Profit & Loss', 'Discount', 'Partnership', 'Mixture & Alligation', 'Time & Distance', 'Time & Work', 'Geometry', 'Mensuration', 'Trigonometry', 'Statistical Charts', 'Data Interpretation'] },
            { name: 'General Awareness (25 Questions, 50 Marks)', nameTamil: 'பொது விழிப்புணர்வு (25 கேள்விகள், 50 மதிப்பெண்கள்)', subtopics: ['India & its Neighbours', 'History', 'Culture', 'Geography', 'Economic Scene', 'General Polity', 'Indian Constitution', 'Scientific Research', 'Current Affairs'] }
          ]
        }
      ],
      tier2: [
        {
          name: 'Tier 2 - Descriptive Paper (60 Minutes)',
          nameTamil: 'நிலை 2 - விளக்க தாள் (60 நிமிடங்கள்)',
          topics: [
            { name: 'Essay Writing (100 Marks)', nameTamil: 'கட்டுரை எழுதுதல் (100 மதிப்பெண்கள்)', subtopics: ['200-250 words on given topics'] },
            { name: 'Letter/Application Writing (100 Marks)', nameTamil: 'கடிதம்/விண்ணப்பம் எழுதுதல் (100 மதிப்பெண்கள்)', subtopics: ['Formal Letter', 'Informal Letter', 'Application Writing'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'ssc-gi-1', question: 'Select the related word: Doctor : Hospital :: Teacher : ?', questionTamil: 'தொடர்புடைய சொல்லைத் தேர்ந்தெடுக்கவும்: மருத்துவர் : மருத்துவமனை :: ஆசிரியர் : ?', options: ['School', 'Student', 'Books', 'Education'], optionsTamil: ['பள்ளி', 'மாணவர்', 'புத்தகங்கள்', 'கல்வி'], answer: 0, explanation: 'Doctor works in Hospital, Teacher works in School', explanationTamil: 'மருத்துவர் மருத்துவமனையில் பணிபுரிகிறார், ஆசிரியர் பள்ளியில் பணிபுரிகிறார்', subject: 'General Intelligence', difficulty: 'easy' },
      { id: 'ssc-gi-2', question: 'Arrange in meaningful order: 1.Sentence 2.Word 3.Paragraph 4.Letter 5.Chapter', questionTamil: 'அர்த்தமுள்ள வரிசையில் அமைக்கவும்: 1.வாக்கியம் 2.சொல் 3.பத்தி 4.எழுத்து 5.அத்தியாயம்', options: ['4-2-1-3-5', '4-2-3-1-5', '4-1-2-3-5', '2-4-1-3-5'], optionsTamil: ['4-2-1-3-5', '4-2-3-1-5', '4-1-2-3-5', '2-4-1-3-5'], answer: 0, explanation: 'Letter → Word → Sentence → Paragraph → Chapter', explanationTamil: 'எழுத்து → சொல் → வாக்கியம் → பத்தி → அத்தியாயம்', subject: 'General Intelligence', difficulty: 'easy' },
      { id: 'ssc-gi-3', question: 'Find the missing number: 4, 9, 16, 25, ?', questionTamil: 'விடுபட்ட எண்ணைக் கண்டறியவும்: 4, 9, 16, 25, ?', options: ['30', '36', '49', '64'], optionsTamil: ['30', '36', '49', '64'], answer: 1, explanation: 'Pattern: 2², 3², 4², 5², 6² = 36', explanationTamil: 'முறை: 2², 3², 4², 5², 6² = 36', subject: 'General Intelligence', difficulty: 'easy' },
      { id: 'ssc-eng-1', question: 'Choose the correct synonym of "ABUNDANT":', questionTamil: '"ABUNDANT" இன் சரியான ஒத்த சொல்:', options: ['Scarce', 'Plentiful', 'Limited', 'Rare'], optionsTamil: ['பற்றாக்குறை', 'ஏராளமான', 'குறைந்த', 'அரிதான'], answer: 1, explanation: 'Abundant = existing in large quantities = Plentiful', explanationTamil: 'Abundant = அதிக அளவில் உள்ளது = Plentiful', subject: 'English', difficulty: 'easy' },
      { id: 'ssc-eng-2', question: 'Choose the correct antonym of "ANCIENT":', questionTamil: '"ANCIENT" இன் எதிர்ச்சொல்:', options: ['Old', 'Antique', 'Modern', 'Historic'], optionsTamil: ['பழைய', 'தொன்மையான', 'நவீன', 'வரலாற்று'], answer: 2, explanation: 'Ancient means old; opposite is Modern', explanationTamil: 'Ancient என்றால் பழமையான; எதிர்ச்சொல் Modern (நவீன)', subject: 'English', difficulty: 'easy' },
      { id: 'ssc-eng-3', question: 'One word for "A person who loves books":', questionTamil: '"புத்தகங்களை விரும்புபவர்" என்பதற்கான ஒரு சொல்:', options: ['Bibliophile', 'Philatelist', 'Numismatist', 'Connoisseur'], optionsTamil: ['Bibliophile', 'Philatelist', 'Numismatist', 'Connoisseur'], answer: 0, explanation: 'Bibliophile = book lover', explanationTamil: 'Bibliophile = புத்தக ஆர்வலர்', subject: 'English', difficulty: 'medium' },
      { id: 'ssc-eng-4', question: 'Idiom "To burn the midnight oil" means:', questionTamil: '"To burn the midnight oil" என்ற மரபுத்தொடரின் பொருள்:', options: ['To waste oil', 'To work late at night', 'To sleep', 'To waste time'], optionsTamil: ['எண்ணெயை வீணாக்குவது', 'இரவில் தாமதமாக வேலை செய்வது', 'தூங்குவது', 'நேரத்தை வீணாக்குவது'], answer: 1, explanation: 'It means to work or study late into the night', explanationTamil: 'இரவில் தாமதமாக வேலை செய்வது அல்லது படிப்பது', subject: 'English', difficulty: 'easy' },
      { id: 'ssc-quant-1', question: 'If a:b = 2:3 and b:c = 4:5, then a:b:c = ?', questionTamil: 'a:b = 2:3 மற்றும் b:c = 4:5 எனில், a:b:c = ?', options: ['8:12:15', '2:3:5', '4:6:5', '8:12:10'], optionsTamil: ['8:12:15', '2:3:5', '4:6:5', '8:12:10'], answer: 0, explanation: 'a:b = 2:3 = 8:12, b:c = 4:5 = 12:15. So a:b:c = 8:12:15', explanationTamil: 'a:b = 2:3 = 8:12, b:c = 4:5 = 12:15. எனவே a:b:c = 8:12:15', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'ssc-quant-2', question: 'Compound interest on ₹5000 for 2 years at 10% p.a. is:', questionTamil: '₹5000 க்கு 2 வருடங்களுக்கு 10% கூட்டு வட்டி:', options: ['₹1000', '₹1050', '₹1100', '₹1025'], optionsTamil: ['₹1000', '₹1050', '₹1100', '₹1025'], answer: 1, explanation: 'CI = 5000(1.1)² - 5000 = 6050 - 5000 = ₹1050', explanationTamil: 'கூட்டு வட்டி = 5000(1.1)² - 5000 = 6050 - 5000 = ₹1050', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'ssc-ga-1', question: 'The currency of Japan is:', questionTamil: 'ஜப்பானின் நாணயம்:', options: ['Yuan', 'Yen', 'Won', 'Ringgit'], optionsTamil: ['யுவான்', 'யென்', 'வோன்', 'ரிங்கிட்'], answer: 1, explanation: 'Japan\'s currency is Yen (JPY)', explanationTamil: 'ஜப்பானின் நாணயம் யென் (JPY)', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ssc-ga-2', question: 'First woman Prime Minister of India:', questionTamil: 'இந்தியாவின் முதல் பெண் பிரதமர்:', options: ['Sarojini Naidu', 'Indira Gandhi', 'Pratibha Patil', 'Sushma Swaraj'], optionsTamil: ['சரோஜினி நாயுடு', 'இந்திரா காந்தி', 'பிரதிபா பாட்டீல்', 'சுஷ்மா ஸ்வராஜ்'], answer: 1, explanation: 'Indira Gandhi was first and only woman PM of India', explanationTamil: 'இந்திரா காந்தி இந்தியாவின் முதல் மற்றும் ஒரே பெண் பிரதமர்', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ssc-ga-3', question: 'Dandi March was associated with:', questionTamil: 'தண்டி யாத்திரை எந்த இயக்கத்துடன் தொடர்புடையது:', options: ['Non-Cooperation Movement', 'Civil Disobedience Movement', 'Quit India Movement', 'Swadeshi Movement'], optionsTamil: ['ஒத்துழையாமை இயக்கம்', 'சிவில் சட்டமறுப்பு இயக்கம்', 'வெள்ளையனே வெளியேறு இயக்கம்', 'சுதேசி இயக்கம்'], answer: 1, explanation: 'Dandi March (1930) started Civil Disobedience Movement', explanationTamil: 'தண்டி யாத்திரை (1930) சிவில் சட்டமறுப்பு இயக்கத்தை தொடங்கியது', subject: 'General Awareness', difficulty: 'easy' }
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
    postsTamil: ['பியூன்', 'காவலாளி', 'தோட்டக்காரர்', 'துப்புரவாளர்'],
    syllabus: {
      main: [
        {
          name: 'SSC MTS Syllabus',
          nameTamil: 'SSC MTS பாடத்திட்டம்',
          topics: [
            { name: 'General Intelligence & Reasoning', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்', subtopics: ['Analogies', 'Similarities & Differences', 'Space Visualization', 'Problem Solving', 'Analysis', 'Judgement', 'Decision Making', 'Visual Memory', 'Discriminating Observation', 'Relationship Concepts'] },
            { name: 'Numerical Aptitude', nameTamil: 'எண் திறன்', subtopics: ['Number Systems', 'Computation of Whole Numbers', 'Decimals and Fractions', 'Relationship between Numbers', 'Fundamental Arithmetical Operations', 'Percentage', 'Ratio & Proportion', 'Averages', 'Interest', 'Profit & Loss', 'Discount', 'Time & Distance', 'Ratio & Time', 'Time & Work'] },
            { name: 'English Language', nameTamil: 'ஆங்கில மொழி', subtopics: ['Vocabulary', 'Grammar', 'Sentence Structure', 'Spot the Error', 'Fill in the Blanks', 'Synonyms/Homonyms', 'Antonyms', 'Spellings', 'Comprehension'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', subtopics: ['Current Affairs', 'India & its Neighbouring Countries', 'History', 'Geography', 'Culture', 'General Polity', 'Constitution', 'Scientific Research'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'mts-gi-1', question: 'Which one is different from others? 25, 36, 49, 60, 81', questionTamil: 'மற்றவற்றிலிருந்து வேறுபட்டது எது? 25, 36, 49, 60, 81', options: ['25', '36', '60', '81'], optionsTamil: ['25', '36', '60', '81'], answer: 2, explanation: '25=5², 36=6², 49=7², 81=9². 60 is not a perfect square', explanationTamil: '25=5², 36=6², 49=7², 81=9². 60 முழு வர்க்கம் அல்ல', subject: 'General Intelligence', difficulty: 'easy' }
    ]
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
    selectionProcessTamil: 'CBT → உடல் தகுதி → மருத்துவம் → ஆவண சரிபார்ப்பு',
    posts: ['BSF', 'CRPF', 'CISF', 'ITBP', 'SSB', 'Assam Rifles'],
    postsTamil: ['BSF', 'CRPF', 'CISF', 'ITBP', 'SSB', 'அசாம் ரைபிள்ஸ்'],
    syllabus: {
      main: [
        {
          name: 'SSC GD Constable Syllabus',
          nameTamil: 'SSC GD காவலர் பாடத்திட்டம்',
          topics: [
            { name: 'General Intelligence & Reasoning', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்', subtopics: ['Analogies', 'Similarities & Differences', 'Spatial Visualization', 'Analysis', 'Judgment', 'Decision Making', 'Problem Solving', 'Discrimination', 'Relationship Concepts', 'Arithmetical Number Series', 'Figure Classification'] },
            { name: 'General Knowledge & General Awareness', nameTamil: 'பொது அறிவு & பொது விழிப்புணர்வு', subtopics: ['India & its Neighbouring Countries', 'History', 'Culture', 'Geography', 'Economic Scene', 'General Polity', 'Indian Constitution', 'Scientific Research'] },
            { name: 'Elementary Mathematics', nameTamil: 'அடிப்படை கணிதம்', subtopics: ['Number Systems', 'Decimals & Fractions', 'LCM, HCF', 'Percentages', 'Ratio & Proportion', 'Averages', 'Interest', 'Profit & Loss', 'Discount', 'Mensuration', 'Time & Distance', 'Time & Work'] },
            { name: 'English/Hindi', nameTamil: 'ஆங்கிலம்/இந்தி', subtopics: ['Error Detection', 'Fill in the Blanks', 'Synonyms/Antonyms', 'Spelling', 'Idioms', 'One Word Substitution', 'Sentence Improvement', 'Comprehension'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'gd-gk-1', question: 'CRPF was established in:', questionTamil: 'CRPF நிறுவப்பட்ட ஆண்டு:', options: ['1939', '1947', '1950', '1962'], optionsTamil: ['1939', '1947', '1950', '1962'], answer: 0, explanation: 'CRPF was established on 27 July 1939 as Crown Representative Police', explanationTamil: 'CRPF 1939 ஜூலை 27 அன்று Crown Representative Police ஆக நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'easy' }
    ]
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
    selectionProcessTamil: 'CBT → திறன் சோதனை (சுருக்கெழுத்து)',
    posts: ['Stenographer Grade C', 'Stenographer Grade D'],
    postsTamil: ['சுருக்கெழுத்தாளர் தரம் C', 'சுருக்கெழுத்தாளர் தரம் D'],
    syllabus: {
      main: [
        {
          name: 'SSC Stenographer Syllabus',
          nameTamil: 'SSC சுருக்கெழுத்தாளர் பாடத்திட்டம்',
          topics: [
            { name: 'General Intelligence & Reasoning', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்', subtopics: ['Analogies', 'Similarities & Differences', 'Spatial Visualization', 'Decision Making', 'Problem Solving', 'Analysis', 'Judgment', 'Coding-Decoding', 'Series'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', subtopics: ['Current Events', 'History', 'Geography', 'Culture', 'General Polity', 'Constitution', 'Economic Scene', 'Scientific Research'] },
            { name: 'English Language & Comprehension', nameTamil: 'ஆங்கில மொழி & புரிதல்', subtopics: ['Spot the Error', 'Fill in Blanks', 'Synonyms', 'Antonyms', 'Spelling', 'Idioms & Phrases', 'One Word Substitution', 'Sentence Improvement', 'Active/Passive Voice', 'Direct/Indirect Speech', 'Comprehension'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'steno-eng-1', question: 'Choose the synonym of "ELOQUENT":', questionTamil: '"ELOQUENT" இன் ஒத்த சொல்:', options: ['Shy', 'Fluent', 'Silent', 'Dumb'], optionsTamil: ['வெட்கமான', 'சரளமான', 'அமைதியான', 'ஊமை'], answer: 1, explanation: 'Eloquent means fluent or persuasive in speaking or writing', explanationTamil: 'Eloquent என்றால் பேச்சு அல்லது எழுத்தில் சரளமான அல்லது நம்பகமான', subject: 'English', difficulty: 'easy' }
    ]
  }
];

// ==================== BANKING & INSURANCE ====================
const bankingExams: Exam[] = [
  {
    id: 'ibps-clerk',
    name: 'IBPS Clerk',
    nameTamil: 'IBPS எழுத்தர்',
    qualification: 'Any Graduate (12th for age)',
    qualificationTamil: 'எந்த பட்டதாரியும் (வயதுக்கு 12ஆம் வகுப்பு)',
    age: '20 - 28 years',
    salary: '₹28,000 - ₹35,000/month',
    selectionProcess: 'Prelims → Mains → Provisional Allotment',
    selectionProcessTamil: 'முதல்நிலை → முக்கிய → தற்காலிக ஒதுக்கீடு',
    examPattern: [
      { paper: 'Prelims', paperTamil: 'முதல்நிலை', marks: 100, duration: '60 mins', questions: 100 },
      { paper: 'Mains', paperTamil: 'முக்கிய', marks: 200, duration: '160 mins', questions: 190 }
    ],
    syllabus: {
      prelims: [
        {
          name: 'IBPS Clerk Prelims (100 Questions, 60 Minutes)',
          nameTamil: 'IBPS எழுத்தர் முதல்நிலை (100 கேள்விகள், 60 நிமிடங்கள்)',
          topics: [
            { name: 'English Language (30 Questions)', nameTamil: 'ஆங்கில மொழி (30 கேள்விகள்)', subtopics: ['Reading Comprehension', 'Cloze Test', 'Jumbled Sentences', 'Error Spotting', 'Fill in the Blanks'] },
            { name: 'Numerical Ability (35 Questions)', nameTamil: 'எண் திறன் (35 கேள்விகள்)', subtopics: ['Number Series', 'Simplification', 'Percentage', 'Ratio & Proportion', 'Profit & Loss', 'Interest', 'Time & Work', 'Time & Distance', 'Data Interpretation'] },
            { name: 'Reasoning Ability (35 Questions)', nameTamil: 'தர்க்க திறன் (35 கேள்விகள்)', subtopics: ['Puzzles', 'Seating Arrangement', 'Syllogism', 'Coding-Decoding', 'Blood Relations', 'Direction Sense', 'Inequalities', 'Alphabet Series'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'ibps-eng-1', question: 'Choose the correct synonym of "LUCID":', questionTamil: '"LUCID" இன் சரியான ஒத்த சொல்:', options: ['Vague', 'Clear', 'Complex', 'Obscure'], optionsTamil: ['தெளிவற்ற', 'தெளிவான', 'சிக்கலான', 'மறைவான'], answer: 1, explanation: 'Lucid means clear and easy to understand', explanationTamil: 'Lucid என்றால் தெளிவான மற்றும் புரிந்துகொள்ள எளிதான', subject: 'English', difficulty: 'easy' },
      { id: 'ibps-quant-1', question: 'Find the next number in the series: 2, 5, 11, 23, 47, ?', questionTamil: 'தொடரில் அடுத்த எண்ணைக் கண்டறியவும்: 2, 5, 11, 23, 47, ?', options: ['95', '94', '93', '96'], optionsTamil: ['95', '94', '93', '96'], answer: 0, explanation: 'Pattern: ×2+1, ×2+1. 47×2+1 = 95', explanationTamil: 'முறை: ×2+1. 47×2+1 = 95', subject: 'Numerical Ability', difficulty: 'medium' },
      { id: 'ibps-reas-1', question: 'If A is the sister of B, B is the brother of C, how is C related to A?', questionTamil: 'A என்பவர் B இன் சகோதரி, B என்பவர் C இன் சகோதரன் எனில், C என்பவர் A க்கு என்ன உறவு?', options: ['Brother', 'Sister', 'Brother or Sister', 'Cannot be determined'], optionsTamil: ['சகோதரன்', 'சகோதரி', 'சகோதரன் அல்லது சகோதரி', 'தீர்மானிக்க இயலாது'], answer: 2, explanation: 'C could be brother or sister of A (gender of C is not specified)', explanationTamil: 'C ஆனது A இன் சகோதரன் அல்லது சகோதரியாக இருக்கலாம் (C இன் பாலினம் குறிப்பிடப்படவில்லை)', subject: 'Reasoning', difficulty: 'medium' }
    ]
  },
  {
    id: 'sbi-clerk',
    name: 'SBI Clerk (Junior Associate)',
    nameTamil: 'SBI எழுத்தர் (இளநிலை கூட்டாளர்)',
    qualification: 'Any Graduate',
    qualificationTamil: 'எந்த பட்டதாரியும்',
    age: '20 - 28 years',
    salary: '₹30,000 - ₹40,000/month',
    selectionProcess: 'Prelims → Mains → Local Language Test',
    selectionProcessTamil: 'முதல்நிலை → முக்கிய → உள்ளூர் மொழி தேர்வு',
    examPattern: [
      { paper: 'Prelims', paperTamil: 'முதல்நிலை', marks: 100, duration: '60 mins', questions: 100 },
      { paper: 'Mains', paperTamil: 'முக்கிய', marks: 200, duration: '160 mins', questions: 190 }
    ],
    syllabus: {
      main: [
        {
          name: 'SBI Clerk Syllabus',
          nameTamil: 'SBI எழுத்தர் பாடத்திட்டம்',
          topics: [
            { name: 'English Language', nameTamil: 'ஆங்கில மொழி', subtopics: ['Reading Comprehension', 'Error Detection', 'Para Jumbles', 'Cloze Test', 'Fill in the Blanks', 'Vocabulary'] },
            { name: 'Numerical Ability', nameTamil: 'எண் திறன்', subtopics: ['Number Series', 'Data Interpretation', 'Simplification', 'Quadratic Equations', 'Arithmetic Problems'] },
            { name: 'Reasoning Ability', nameTamil: 'தர்க்க திறன்', subtopics: ['Puzzles & Seating Arrangement', 'Syllogism', 'Inequality', 'Input-Output', 'Coding-Decoding', 'Blood Relations'] },
            { name: 'General/Financial Awareness', nameTamil: 'பொது/நிதி விழிப்புணர்வு', subtopics: ['Banking Awareness', 'Current Affairs', 'Static GK', 'Financial Terms'] },
            { name: 'Computer Aptitude', nameTamil: 'கணினி திறன்', subtopics: ['Computer Fundamentals', 'MS Office', 'Internet', 'Networking Basics'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'sbi-gk-1', question: 'SBI was established in:', questionTamil: 'SBI நிறுவப்பட்ட ஆண்டு:', options: ['1955', '1947', '1935', '1969'], optionsTamil: ['1955', '1947', '1935', '1969'], answer: 0, explanation: 'State Bank of India was established on 1 July 1955', explanationTamil: 'ஸ்டேட் பாங்க் ஆஃப் இந்தியா 1955 ஜூலை 1 அன்று நிறுவப்பட்டது', subject: 'Banking Awareness', difficulty: 'easy' },
      { id: 'sbi-gk-2', question: 'The headquarters of SBI is located at:', questionTamil: 'SBI இன் தலைமையகம் அமைந்துள்ள இடம்:', options: ['New Delhi', 'Mumbai', 'Chennai', 'Kolkata'], optionsTamil: ['புது தில்லி', 'மும்பை', 'சென்னை', 'கொல்கத்தா'], answer: 1, explanation: 'SBI Headquarters is in Mumbai, Maharashtra', explanationTamil: 'SBI தலைமையகம் மகாராஷ்டிராவில் மும்பையில் உள்ளது', subject: 'Banking Awareness', difficulty: 'easy' }
    ]
  },
  {
    id: 'india-post-gds',
    name: 'India Post GDS (Gramin Dak Sevak)',
    nameTamil: 'இந்திய தபால் GDS (கிராமின் டாக் சேவக்)',
    qualification: '10th Pass',
    qualificationTamil: '10ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 40 years',
    salary: '₹12,000 - ₹14,500/month',
    selectionProcess: 'Merit Based (10th Marks)',
    selectionProcessTamil: 'தகுதி அடிப்படையில் (10ஆம் வகுப்பு மதிப்பெண்கள்)',
    syllabus: {
      main: [
        {
          name: 'Selection Based on 10th Class Marks',
          nameTamil: '10ஆம் வகுப்பு மதிப்பெண்கள் அடிப்படையில் தேர்வு',
          topics: [
            { name: 'Selection Criteria', nameTamil: 'தேர்வு அளவுகோல்கள்', subtopics: ['No written exam', 'Merit based on 10th class percentage', 'Preference to local candidates', 'Computer knowledge certificate required'] },
            { name: 'General Knowledge (for Interview)', nameTamil: 'பொது அறிவு (நேர்காணலுக்கு)', subtopics: ['Postal System in India', 'History of Indian Post', 'Types of Post Offices', 'Postal Services (Speed Post, Registered, etc.)', 'Indian Geography', 'Current Affairs'] }
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
    selectionProcessTamil: 'முதல்நிலை → முக்கிய → நேர்காணல்',
    syllabus: {
      main: [
        {
          name: 'LIC ADO Syllabus',
          nameTamil: 'LIC ADO பாடத்திட்டம்',
          topics: [
            { name: 'Reasoning Ability', nameTamil: 'தர்க்க திறன்', subtopics: ['Puzzles', 'Seating Arrangement', 'Syllogism', 'Blood Relations', 'Coding-Decoding', 'Inequalities', 'Input-Output'] },
            { name: 'Quantitative Aptitude', nameTamil: 'அளவு திறன்', subtopics: ['Number Series', 'Data Interpretation', 'Simplification', 'Percentage', 'Profit & Loss', 'Time & Work', 'Time & Distance'] },
            { name: 'English Language', nameTamil: 'ஆங்கில மொழி', subtopics: ['Reading Comprehension', 'Error Detection', 'Fill in the Blanks', 'Vocabulary', 'Cloze Test'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Current Affairs', 'Insurance Awareness', 'Static GK', 'Banking & Finance'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'lic-gk-1', question: 'LIC was established in:', questionTamil: 'LIC நிறுவப்பட்ட ஆண்டு:', options: ['1956', '1950', '1947', '1969'], optionsTamil: ['1956', '1950', '1947', '1969'], answer: 0, explanation: 'Life Insurance Corporation of India was established on 1 September 1956', explanationTamil: 'இந்திய ஆயுள் காப்பீட்டு கழகம் 1956 செப்டம்பர் 1 அன்று நிறுவப்பட்டது', subject: 'Insurance Awareness', difficulty: 'easy' }
    ]
  }
];

// ==================== TAMIL NADU STATE GOVT ====================
const stateExams: Exam[] = [
  {
    id: 'tnpsc-group4',
    name: 'TNPSC Group 4',
    nameTamil: 'TNPSC குரூப் 4',
    qualification: 'SSLC / 12th Pass (varies by post)',
    qualificationTamil: 'SSLC / 12ஆம் வகுப்பு தேர்ச்சி (பதவிக்கேற்ப மாறுபடும்)',
    age: '18 - 30 years',
    salary: '₹19,500 - ₹62,000/month',
    selectionProcess: 'Written Exam → Certificate Verification',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → சான்றிதழ் சரிபார்ப்பு',
    posts: ['VAO (Village Administrative Officer)', 'Junior Assistant', 'Typist', 'Steno-Typist', 'Field Surveyor'],
    postsTamil: ['கிராம நிர்வாக அலுவலர்', 'இளநிலை உதவியாளர்', 'தட்டச்சர்', 'சுருக்கெழுத்து தட்டச்சர்', 'களப்புல அளவீட்டாளர்'],
    examPattern: [
      { paper: 'Combined Exam', paperTamil: 'ஒருங்கிணைந்த தேர்வு', marks: 300, duration: '3 hours', questions: 200 }
    ],
    syllabus: {
      main: [
        {
          name: 'TNPSC Group 4 Syllabus (200 Questions, 3 Hours)',
          nameTamil: 'TNPSC குரூப் 4 பாடத்திட்டம் (200 கேள்விகள், 3 மணி நேரம்)',
          topics: [
            { name: 'Tamil (100 Questions)', nameTamil: 'தமிழ் (100 கேள்விகள்)', subtopics: ['Tamil Grammar (இலக்கணம்)', 'Tamil Literature (இலக்கியம்)', 'Comprehension', 'Translation', 'Synonyms & Antonyms', 'Proverbs', 'Sangam Literature', 'Modern Tamil Literature'] },
            { name: 'General Studies (75 Questions)', nameTamil: 'பொது அறிவு (75 கேள்விகள்)', subtopics: ['History - Indian & Tamil Nadu History', 'Geography - Indian & TN Geography', 'Indian Polity & Constitution', 'Indian Economy', 'General Science (Physics, Chemistry, Biology)', 'Current Affairs - National & State'] },
            { name: 'Aptitude & Mental Ability (25 Questions)', nameTamil: 'திறன் & மன திறன் (25 கேள்விகள்)', subtopics: ['Number Series', 'Logical Reasoning', 'Analogies', 'Coding-Decoding', 'Blood Relations', 'Direction Sense', 'Simple Math'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'tnpsc-gs-1', question: 'Who founded the Self-Respect Movement?', questionTamil: 'சுயமரியாதை இயக்கத்தை நிறுவியவர் யார்?', options: ['E.V. Ramasamy Periyar', 'C.N. Annadurai', 'Kamaraj', 'Rajaji'], optionsTamil: ['ஈ.வெ. ராமசாமி பெரியார்', 'சி.என். அண்ணாதுரை', 'காமராஜ்', 'ராஜாஜி'], answer: 0, explanation: 'E.V. Ramasamy (Periyar) started Self-Respect Movement in 1925', explanationTamil: 'ஈ.வெ. ராமசாமி (பெரியார்) 1925 இல் சுயமரியாதை இயக்கத்தை தொடங்கினார்', subject: 'Tamil Nadu History', difficulty: 'easy' },
      { id: 'tnpsc-gs-2', question: 'The capital of Chola dynasty was:', questionTamil: 'சோழ வம்சத்தின் தலைநகரம்:', options: ['Madurai', 'Thanjavur', 'Kanchipuram', 'Trichy'], optionsTamil: ['மதுரை', 'தஞ்சாவூர்', 'காஞ்சிபுரம்', 'திருச்சி'], answer: 1, explanation: 'Thanjavur (Tanjore) was the capital of Chola dynasty', explanationTamil: 'தஞ்சாவூர் சோழ வம்சத்தின் தலைநகரமாக இருந்தது', subject: 'Tamil Nadu History', difficulty: 'easy' },
      { id: 'tnpsc-gs-3', question: 'Which river is known as "Dakshina Ganga"?', questionTamil: '"தட்சிண கங்கா" என்று அழைக்கப்படும் நதி எது?', options: ['Krishna', 'Kaveri', 'Godavari', 'Tungabhadra'], optionsTamil: ['கிருஷ்ணா', 'காவிரி', 'கோதாவரி', 'துங்கபத்ரா'], answer: 2, explanation: 'Godavari is called Dakshina Ganga (Ganges of South)', explanationTamil: 'கோதாவரி தட்சிண கங்கா (தெற்கின் கங்கை) என்று அழைக்கப்படுகிறது', subject: 'Geography', difficulty: 'medium' },
      { id: 'tnpsc-gs-4', question: 'The highest peak in Tamil Nadu is:', questionTamil: 'தமிழ்நாட்டின் உயரமான சிகரம்:', options: ['Doddabetta', 'Anaimudi', 'Nilgiri Peak', 'Agasthyamalai'], optionsTamil: ['தொட்டபெட்டா', 'ஆனைமுடி', 'நீலகிரி சிகரம்', 'அகஸ்தியமலை'], answer: 0, explanation: 'Doddabetta (2,637m) is highest peak in Tamil Nadu', explanationTamil: 'தொட்டபெட்டா (2,637 மீ) தமிழ்நாட்டின் உயரமான சிகரம்', subject: 'Geography', difficulty: 'easy' },
      { id: 'tnpsc-gs-5', question: 'First Chief Minister of Tamil Nadu was:', questionTamil: 'தமிழ்நாட்டின் முதல் முதலமைச்சர்:', options: ['C.N. Annadurai', 'O.P. Ramaswamy Reddiyar', 'Kamaraj', 'Rajaji'], optionsTamil: ['சி.என். அண்ணாதுரை', 'ஓ.பி. ராமசாமி ரெட்டியார்', 'காமராஜ்', 'ராஜாஜி'], answer: 1, explanation: 'O.P. Ramaswamy Reddiyar was first CM of Madras State (1947)', explanationTamil: 'ஓ.பி. ராமசாமி ரெட்டியார் மெட்ராஸ் மாநிலத்தின் முதல் முதலமைச்சர் (1947)', subject: 'Tamil Nadu History', difficulty: 'medium' },
      { id: 'tnpsc-gs-6', question: 'Who built the Brihadeeswara Temple?', questionTamil: 'பிரகதீஸ்வரர் கோவிலை கட்டியவர் யார்?', options: ['Rajendra Chola', 'Rajaraja Chola I', 'Kulottunga Chola', 'Vijayalaya Chola'], optionsTamil: ['ராஜேந்திர சோழன்', 'முதலாம் ராஜராஜ சோழன்', 'குலோத்துங்க சோழன்', 'விஜயாலய சோழன்'], answer: 1, explanation: 'Rajaraja Chola I built Brihadeeswara Temple in Thanjavur', explanationTamil: 'முதலாம் ராஜராஜ சோழன் தஞ்சாவூரில் பிரகதீஸ்வரர் கோவிலை கட்டினார்', subject: 'Tamil Nadu History', difficulty: 'easy' },
      { id: 'tnpsc-ta-1', question: '"ஆத்திசூடி" யை எழுதியவர் யார்?', options: ['திருவள்ளுவர்', 'ஔவையார்', 'கம்பர்', 'இளங்கோவடிகள்'], answer: 1, explanation: 'ஔவையார் ஆத்திசூடியை எழுதினார்', subject: 'Tamil Literature', difficulty: 'easy' },
      { id: 'tnpsc-ta-2', question: 'தமிழின் முதல் இலக்கண நூல்:', options: ['நன்னூல்', 'தொல்காப்பியம்', 'அகத்தியம்', 'யாப்பருங்கலம்'], answer: 1, explanation: 'தொல்காப்பியம் தமிழின் முதல் இலக்கண நூல்', subject: 'Tamil Literature', difficulty: 'easy' },
      { id: 'tnpsc-ta-3', question: 'சிலப்பதிகாரத்தை எழுதியவர்:', options: ['கம்பர்', 'இளங்கோவடிகள்', 'சீத்தலைச்சாத்தனார்', 'திருதக்கதேவர்'], answer: 1, explanation: 'இளங்கோவடிகள் சிலப்பதிகாரத்தை எழுதினார்', subject: 'Tamil Literature', difficulty: 'easy' },
      { id: 'tnpsc-ta-4', question: 'திருக்குறளில் உள்ள அதிகாரங்கள்:', options: ['133', '108', '120', '100'], answer: 0, explanation: 'திருக்குறளில் 133 அதிகாரங்கள் உள்ளன', subject: 'Tamil Literature', difficulty: 'easy' }
    ]
  },
  {
    id: 'tn-police-constable',
    name: 'TN Police Constable',
    nameTamil: 'TN போலீஸ் காவலர்',
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
          nameTamil: 'TN போலீஸ் காவலர் பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Current Affairs', 'History', 'Geography', 'Polity', 'Science'] },
            { name: 'Tamil', nameTamil: 'தமிழ்', subtopics: ['Grammar', 'Literature', 'Comprehension'] },
            { name: 'Aptitude', nameTamil: 'திறன்', subtopics: ['Mathematics', 'Reasoning', 'Mental Ability'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'tnp-gk-1', question: 'Who was the first Director General of Police in Tamil Nadu?', questionTamil: 'தமிழ்நாட்டின் முதல் காவல் துறை தலைவர் யார்?', options: ['C.V. Narasimhan', 'R. Natarajan', 'T.K. Rajendran', 'K. Vijay Kumar'], optionsTamil: ['சி.வி. நரசிம்மன்', 'ஆர். நடராஜன்', 'டி.கே. ராஜேந்திரன்', 'கே. விஜய் குமார்'], answer: 0, explanation: 'C.V. Narasimhan was the first DGP of Tamil Nadu', explanationTamil: 'சி.வி. நரசிம்மன் தமிழ்நாட்டின் முதல் DGP ஆவார்', subject: 'General Knowledge', difficulty: 'medium' }
    ]
  },
  {
    id: 'tn-forest-guard',
    name: 'TN Forest Guard',
    nameTamil: 'TN வனக் காவலர்',
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
          nameTamil: 'TN வனக் காவலர் பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Current Affairs', 'Geography', 'Environment', 'Forest & Wildlife'] },
            { name: 'Tamil', nameTamil: 'தமிழ்', subtopics: ['Grammar', 'Comprehension'] },
            { name: 'Aptitude', nameTamil: 'திறன்', subtopics: ['Mathematics', 'Reasoning'] }
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
    pyq: [
      { id: 'army-gk-1', question: 'Indian Army Day is celebrated on:', questionTamil: 'இந்திய ராணுவ தினம் கொண்டாடப்படும் நாள்:', options: ['January 15', 'October 8', 'December 4', 'November 14'], optionsTamil: ['ஜனவரி 15', 'அக்டோபர் 8', 'டிசம்பர் 4', 'நவம்பர் 14'], answer: 0, explanation: 'Army Day is on January 15, commemorating first Indian Army Chief K.M. Cariappa', explanationTamil: 'ராணுவ தினம் ஜனவரி 15 - முதல் இந்திய ராணுவ தலைவர் கே.எம். காரியப்பா நினைவாக', subject: 'General Knowledge', difficulty: 'easy' }
    ]
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
    pyq: [
      { id: 'fci-gk-1', question: 'FCI stands for:', questionTamil: 'FCI என்பதன் விரிவாக்கம்:', options: ['Food Corporation of India', 'Food Commission of India', 'Farm Corporation of India', 'Federal Corporation of India'], optionsTamil: ['இந்திய உணவு கழகம்', 'இந்திய உணவு ஆணையம்', 'இந்திய பண்ணை கழகம்', 'கூட்டாட்சி கழகம்'], answer: 0, explanation: 'FCI = Food Corporation of India, established in 1965', explanationTamil: 'FCI = இந்திய உணவு கழகம், 1965 இல் நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'easy' }
    ]
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
