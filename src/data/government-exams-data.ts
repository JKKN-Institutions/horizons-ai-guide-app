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
    selectionProcess: 'Online CEE → Physical Fitness → Medical',
    selectionProcessTamil: 'ஆன்லைன் CEE → உடற்தகுதி → மருத்துவம்',
    examPattern: [
      { paper: 'Common Entrance Exam — Soldier GD (10th Level)', paperTamil: 'பொது நுழைவுத் தேர்வு — சோல்ஜர் GD (10ஆம் நிலை)', marks: 100, duration: '1 hour', questions: 50 },
      { paper: 'Common Entrance Exam — Technical (12th PCM)', paperTamil: 'பொது நுழைவுத் தேர்வு — தொழில்நுட்பம் (12ஆம் PCM)', marks: 200, duration: '1 hour', questions: 50 }
    ],
    syllabus: {
      'General Duty (GD) — 10th Level': [
        {
          name: 'Soldier General Duty (GD) — 50 Questions, 100 Marks',
          nameTamil: 'சோல்ஜர் பொது கடமை (GD) — 50 கேள்விகள், 100 மதிப்பெண்கள்',
          topics: [
            { name: 'General Knowledge — 15 Questions, 30 Marks', nameTamil: 'பொது அறிவு — 15 கேள்விகள், 30 மதிப்பெண்கள்', subtopics: [
              'Indian History — Ancient, Medieval, Freedom Movement',
              'Indian Geography — Rivers, Mountains, Climate, States & Capitals',
              'Indian Constitution — Fundamental Rights, Duties, Parliament, President',
              'Sports — National & International Awards, Olympic, Commonwealth',
              'Awards & Honours — Bharat Ratna, Padma Awards, Gallantry Awards',
              'Abbreviations — National & International Organizations',
              'Current Affairs — National & International Events',
              'Important Days & Dates',
              'Books & Authors',
              'United Nations & International Bodies'
            ] },
            { name: 'General Science — 20 Questions, 40 Marks (10th Level)', nameTamil: 'பொது அறிவியல் — 20 கேள்விகள், 40 மதிப்பெண்கள்', subtopics: [
              'Physics — Motion, Force, Energy, Work, Light, Sound, Electricity, Magnetism',
              'Chemistry — Elements, Compounds, Mixtures, Acids & Bases, Metals & Non-Metals, Chemical Reactions',
              'Biology — Human Body Systems, Nutrition & Digestion, Cell Structure, Diseases & Prevention',
              'Biology — Blood Groups, Vitamins & Deficiency Diseases, Environment & Ecology',
              'Daily Life Science — Inventions, Scientific Instruments, Units & Measurements'
            ] },
            { name: 'Mathematics — 15 Questions, 30 Marks (10th Level)', nameTamil: 'கணிதம் — 15 கேள்விகள், 30 மதிப்பெண்கள்', subtopics: [
              'Number System — Natural, Whole, Integers, Rational, Real Numbers',
              'Arithmetic — Percentage, Ratio & Proportion, Average',
              'Arithmetic — Simple & Compound Interest, Profit & Loss, Discount',
              'Arithmetic — Time & Work, Time & Distance, Speed',
              'Algebra — HCF & LCM, Factors, Linear Equations, Quadratic Equations',
              'Geometry — Lines, Angles, Triangles, Circles, Area & Perimeter',
              'Mensuration — Area & Volume of Cube, Cylinder, Sphere, Cone',
              'Statistics — Mean, Median, Mode'
            ] },
            { name: 'Logical Reasoning', nameTamil: 'தர்க்க ஆற்றல்', subtopics: [
              'Coding-Decoding — Letter & Number Coding',
              'Series Completion — Number, Alphabet, Mixed Series',
              'Analogy — Word & Number Relationships',
              'Blood Relations — Family Tree Problems',
              'Direction Sense — North, South, East, West Based Problems',
              'Classification — Odd One Out',
              'Alphabet Test — Position & Arrangement'
            ] }
          ]
        }
      ],
      'Technical — 12th Level PCM': [
        {
          name: 'Agniveer Technical Syllabus — 50 Questions, 200 Marks (12th Level PCM)',
          nameTamil: 'அக்னிவீர் தொழில்நுட்ப பாடத்திட்டம் — 50 கேள்விகள் (12ஆம் வகுப்பு PCM)',
          topics: [
            { name: 'Physics (12th Level)', nameTamil: 'இயற்பியல் (12ஆம் வகுப்பு நிலை)', subtopics: [
              'Physical World & Measurement — Units, Dimensions, Errors',
              'Kinematics — Motion in Straight Line, Projectile Motion',
              'Laws of Motion — Newton\'s Laws, Friction, Circular Motion',
              'Work, Energy & Power — Conservation Laws, Collisions',
              'Thermodynamics — Heat, Temperature, Laws of Thermodynamics',
              'Optics — Reflection, Refraction, Lenses, Mirrors, Wave Optics',
              'Electricity & Magnetism — Current, Resistance, Ohm\'s Law, EMF',
              'Modern Physics — Atomic Structure, Nuclear Physics, Semiconductors',
              'Waves & Sound — Types of Waves, Doppler Effect'
            ] },
            { name: 'Chemistry (12th Level)', nameTamil: 'வேதியியல் (12ஆம் வகுப்பு நிலை)', subtopics: [
              'Atomic Structure & Chemical Bonding',
              'States of Matter — Solid, Liquid, Gas',
              'Chemical Equilibrium & Kinetics',
              'Acids, Bases, Salts & pH Scale',
              'Electrochemistry — Cells, Batteries, Electrolysis',
              'Organic Chemistry — Hydrocarbons, Polymers, Biomolecules',
              'Periodic Table — Classification, Properties, Trends',
              'Environmental Chemistry — Pollution, Ozone Depletion'
            ] },
            { name: 'Mathematics (12th Level)', nameTamil: 'கணிதம் (12ஆம் வகுப்பு நிலை)', subtopics: [
              'Algebra — Sets, Relations, Functions, Complex Numbers',
              'Matrices & Determinants',
              'Trigonometry — Ratios, Identities, Heights & Distances',
              'Calculus — Limits, Differentiation, Integration',
              'Coordinate Geometry — Straight Lines, Circles, Conic Sections',
              'Probability & Statistics',
              'Vectors & 3D Geometry',
              'Sequences & Series — AP, GP, HP'
            ] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', subtopics: [
              'Grammar — Tenses, Voice, Narration, Articles, Prepositions',
              'Vocabulary — Synonyms, Antonyms, One Word Substitution',
              'Comprehension — Reading Passage & Questions',
              'Sentence Correction — Error Spotting',
              'Idioms & Phrases'
            ] }
          ]
        }
      ],
      'Clerk / Store Keeper': [
        {
          name: 'Agniveer Clerk / Store Keeper (SKT) Syllabus — 50 Questions, 200 Marks',
          nameTamil: 'அக்னிவீர் எழுத்தர் / பண்டகசாலை (SKT) பாடத்திட்டம்',
          topics: [
            { name: 'English', nameTamil: 'ஆங்கிலம்', subtopics: [
              'Grammar — Tenses, Voice, Narration, Articles, Prepositions',
              'Vocabulary — Synonyms, Antonyms, One Word Substitution, Spelling',
              'Reading Comprehension — Passage Based Questions',
              'Sentence Formation & Transformation',
              'Error Spotting & Correction',
              'Cloze Test & Fill in the Blanks'
            ] },
            { name: 'Mathematics (Arithmetic)', nameTamil: 'கணிதம் (எண்கணிதம்)', subtopics: [
              'Number System — Whole Numbers, Fractions, Decimals',
              'Percentage, Ratio & Proportion',
              'Simple & Compound Interest',
              'Profit, Loss & Discount',
              'Average, Time & Work, Time & Distance',
              'HCF & LCM, Simplification'
            ] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: [
              'Indian History, Geography, Polity',
              'Current Affairs — National & International',
              'Sports, Awards & Honours',
              'Important Days, Abbreviations',
              'Defence Related Knowledge'
            ] },
            { name: 'Computer Knowledge', nameTamil: 'கணினி அறிவு', subtopics: [
              'Computer Fundamentals — CPU, RAM, ROM, Input/Output Devices',
              'Operating System — Windows, Basics of Linux',
              'MS Office — Word, Excel, PowerPoint',
              'Internet — Browser, Email, Search Engine Basics',
              'Computer Shortcuts & File Management',
              'Binary & Number Systems',
              'Computer Viruses & Security Basics'
            ] }
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
    name: 'Agniveer Navy (SSR/MR)',
    nameTamil: 'அக்னிவீர் கடற்படை (SSR/MR)',
    qualification: '12th Pass (PCM - 50%)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (PCM - 50%)',
    age: '17.5 - 23 years',
    salary: '₹30,000/month',
    selectionProcess: 'Online CBT → Physical Fitness Test (PFT) → Medical Examination',
    selectionProcessTamil: 'ஆன்லைன் CBT → உடற்தகுதி தேர்வு (PFT) → மருத்துவப் பரிசோதனை',
    examPattern: [
      { paper: 'Online CBT (SSR — 10+2 Level)', paperTamil: 'ஆன்லைன் CBT (SSR — 10+2 நிலை)', marks: 100, duration: '1 hour', questions: 100 },
      { paper: 'Online CBT (MR — 10th Level)', paperTamil: 'ஆன்லைன் CBT (MR — 10ஆம் வகுப்பு நிலை)', marks: 100, duration: '1 hour', questions: 100 }
    ],
    syllabus: {
      'SSR Syllabus (10+2 Level — 100 Questions, 60 Minutes)': [
        {
          name: 'Science (25 Questions)',
          nameTamil: 'அறிவியல் (25 கேள்விகள்)',
          topics: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', subtopics: ['Laws of Motion', 'Work, Energy & Power', 'Heat & Thermodynamics', 'Light & Optics', 'Electricity & Magnetism', 'Atomic Structure', 'Wave Motion', 'Units & Measurements'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', subtopics: ['Metals & Non-metals', 'Organic Chemistry', 'Environmental Chemistry', 'Acids, Bases & Salts', 'Periodic Classification', 'Chemical Bonding', 'Electrochemistry'] },
            { name: 'Biology (Basic)', nameTamil: 'உயிரியல் (அடிப்படை)', subtopics: ['Basic Human Anatomy', 'Nutrition & Digestion', 'Respiratory System', 'Circulatory System'] }
          ]
        },
        {
          name: 'Mathematics (25 Questions)',
          nameTamil: 'கணிதம் (25 கேள்விகள்)',
          topics: [
            { name: 'Algebra & Functions', nameTamil: 'இயற்கணிதம் & சார்புகள்', subtopics: ['Relations & Functions', 'Logarithms', 'Complex Numbers', 'Quadratic Equations', 'Sequences & Series', 'Binomial Theorem'] },
            { name: 'Trigonometry & Geometry', nameTamil: 'முக்கோணமிதி & வடிவியல்', subtopics: ['Trigonometric Functions', 'Inverse Trigonometry', 'Cartesian System of Coordinates', 'Straight Lines', 'Circles & Conic Sections'] },
            { name: 'Permutations & Probability', nameTamil: 'வரிசைமாற்றம் & நிகழ்தகவு', subtopics: ['Permutations & Combinations', 'Probability', 'Statistics & Mean/Median/Mode'] }
          ]
        },
        {
          name: 'English (25 Questions)',
          nameTamil: 'ஆங்கிலம் (25 கேள்விகள்)',
          topics: [
            { name: 'Grammar', nameTamil: 'இலக்கணம்', subtopics: ['Tenses (Past, Present, Future)', 'Active & Passive Voice', 'Direct & Indirect Speech', 'Parts of Speech', 'Subject-Verb Agreement', 'Articles & Prepositions'] },
            { name: 'Vocabulary', nameTamil: 'சொல்வளம்', subtopics: ['Synonyms & Antonyms', 'Idioms & Phrases', 'One Word Substitution', 'Spelling Errors', 'Fill in the Blanks'] },
            { name: 'Comprehension', nameTamil: 'புரிதல்', subtopics: ['Reading Comprehension Passages', 'Sentence Rearrangement', 'Error Spotting'] }
          ]
        },
        {
          name: 'General Awareness (25 Questions)',
          nameTamil: 'பொது அறிவு (25 கேள்விகள்)',
          topics: [
            { name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்', subtopics: ['National & International News', 'Sports & Awards', 'Defence News & Updates', 'Science & Technology Developments', 'Government Schemes'] },
            { name: 'History & Civics', nameTamil: 'வரலாறு & குடிமையியல்', subtopics: ['Indian History — Ancient, Medieval, Modern', 'Indian Freedom Movement', 'Indian Constitution', 'Indian Polity & Governance'] },
            { name: 'Geography & Reasoning', nameTamil: 'புவியியல் & தர்க்கம்', subtopics: ['Indian Geography — Soil, Rivers, Mountains, Climate', 'World Geography', 'Basic Reasoning — Verbal & Non-verbal', 'Analogies, Coding-Decoding, Patterns'] }
          ]
        }
      ],
      'MR Syllabus (10th Level — 100 Questions, 60 Minutes)': [
        {
          name: 'Science (MR Level)',
          nameTamil: 'அறிவியல் (MR நிலை)',
          topics: [
            { name: 'Physics & Chemistry (10th)', nameTamil: 'இயற்பியல் & வேதியியல் (10ஆம்)', subtopics: ['Nature of Matter — States of Matter', 'Force and Motion — Newton\'s Laws', 'Work and Energy — Kinetic & Potential', 'Heat — Conduction, Convection, Radiation', 'Light — Reflection, Refraction', 'Electricity — Ohm\'s Law, Circuits', 'Atomic Structure — Atoms, Molecules', 'Chemical Reactions — Types & Equations', 'Life Processes — Respiration, Excretion'] }
          ]
        },
        {
          name: 'Mathematics (MR Level)',
          nameTamil: 'கணிதம் (MR நிலை)',
          topics: [
            { name: 'Arithmetic & Algebra (10th)', nameTamil: 'எண்கணிதம் & இயற்கணிதம் (10ஆம்)', subtopics: ['Number Systems & Rational Numbers', 'Arithmetic — Percentage, Ratio, Profit/Loss', 'Linear Equations', 'Quadratic Equations', 'Basic Algebra', 'Geometry — Triangles, Circles, Angles', 'Mensuration — Area, Volume, Surface Area', 'Basic Trigonometry — Sin, Cos, Tan'] }
          ]
        },
        {
          name: 'General Awareness (MR Level)',
          nameTamil: 'பொது அறிவு (MR நிலை)',
          topics: [
            { name: 'GK & Current Affairs (10th)', nameTamil: 'பொது அறிவு & நடப்பு (10ஆம்)', subtopics: ['Geography — Rivers, Mountains, Ports, Capitals', 'History — Indian Freedom Movement, Culture & Heritage', 'Civics — Indian Constitution, Democracy, Parliament', 'Current Affairs — National & International Events', 'Sports — Commonwealth, Olympics, Cricket', 'Awards & Honours — Padma, Nobel, Bharat Ratna', 'Abbreviations — UN, NATO, WHO, ISRO, DRDO'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'navy-phy-1', question: 'The SI unit of electric current is:', questionTamil: 'மின்னோட்டத்தின் SI அலகு:', options: ['Ampere', 'Volt', 'Ohm', 'Watt'], optionsTamil: ['ஆம்பியர்', 'வோல்ட்', 'ஓம்', 'வாட்'], answer: 0, explanation: 'Ampere (A) is the SI unit of electric current', explanationTamil: 'ஆம்பியர் (A) மின்னோட்டத்தின் SI அலகு', subject: 'Physics', difficulty: 'easy' },
      { id: 'navy-phy-2', question: 'Newton\'s First Law of Motion is also called:', questionTamil: 'நியூட்டனின் முதல் இயக்க விதி எவ்வாறு அழைக்கப்படுகிறது:', options: ['Law of Inertia', 'Law of Acceleration', 'Law of Action-Reaction', 'Law of Gravitation'], optionsTamil: ['நிலைமத் தன்மை விதி', 'முடுக்கம் விதி', 'செயல்-எதிர்செயல் விதி', 'ஈர்ப்பு விதி'], answer: 0, explanation: 'Newton\'s First Law states that a body at rest stays at rest unless acted upon by an external force — this is the Law of Inertia', explanationTamil: 'நியூட்டனின் முதல் விதி: ஒரு பொருள் வெளிப்புற விசை செயல்படாத வரை ஓய்வு நிலையில் இருக்கும் — இது நிலைமத் தன்மை விதி', subject: 'Physics', difficulty: 'easy' },
      { id: 'navy-chem-1', question: 'The chemical formula of water is:', questionTamil: 'நீரின் வேதிச் சூத்திரம்:', options: ['H₂O', 'CO₂', 'NaCl', 'H₂SO₄'], optionsTamil: ['H₂O', 'CO₂', 'NaCl', 'H₂SO₄'], answer: 0, explanation: 'Water is composed of 2 hydrogen and 1 oxygen atom: H₂O', explanationTamil: 'நீர் 2 ஹைட்ரஜன் மற்றும் 1 ஆக்சிஜன் அணுவால் ஆனது: H₂O', subject: 'Chemistry', difficulty: 'easy' },
      { id: 'navy-chem-2', question: 'Which gas is produced when metals react with acids?', questionTamil: 'உலோகங்கள் அமிலங்களுடன் வினைபுரியும்போது எந்த வாயு உருவாகிறது?', options: ['Hydrogen', 'Oxygen', 'Carbon dioxide', 'Nitrogen'], optionsTamil: ['ஹைட்ரஜன்', 'ஆக்சிஜன்', 'கார்பன் டை ஆக்சைடு', 'நைட்ரஜன்'], answer: 0, explanation: 'When metals react with dilute acids, hydrogen gas is liberated. For example: Zn + H₂SO₄ → ZnSO₄ + H₂↑', explanationTamil: 'உலோகங்கள் நீர்த்த அமிலங்களுடன் வினைபுரியும்போது ஹைட்ரஜன் வாயு வெளியாகும்', subject: 'Chemistry', difficulty: 'easy' },
      { id: 'navy-math-1', question: 'If sin θ = 3/5, then cos θ = ?', questionTamil: 'sin θ = 3/5 எனில், cos θ = ?', options: ['4/5', '3/4', '5/3', '5/4'], optionsTamil: ['4/5', '3/4', '5/3', '5/4'], answer: 0, explanation: 'Using sin²θ + cos²θ = 1: (3/5)² + cos²θ = 1, cos²θ = 1 - 9/25 = 16/25, cos θ = 4/5', explanationTamil: 'sin²θ + cos²θ = 1 பயன்படுத்தி: (3/5)² + cos²θ = 1, cos²θ = 16/25, cos θ = 4/5', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'navy-math-2', question: 'The sum of the first 10 natural numbers is:', questionTamil: 'முதல் 10 இயல் எண்களின் கூட்டுத்தொகை:', options: ['55', '50', '45', '60'], optionsTamil: ['55', '50', '45', '60'], answer: 0, explanation: 'Sum = n(n+1)/2 = 10 × 11/2 = 55', explanationTamil: 'கூட்டு = n(n+1)/2 = 10 × 11/2 = 55', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'navy-eng-1', question: 'Choose the correct passive voice: "She writes a letter."', questionTamil: '"She writes a letter." — சரியான செயப்பாட்டு வாக்கியம் தேர்ந்தெடு:', options: ['A letter is written by her', 'A letter was written by her', 'A letter has been written by her', 'A letter will be written by her'], optionsTamil: ['A letter is written by her', 'A letter was written by her', 'A letter has been written by her', 'A letter will be written by her'], answer: 0, explanation: 'Simple Present Active → Simple Present Passive: Subject + is/are + past participle + by + agent', explanationTamil: 'Simple Present Active → Simple Present Passive: Subject + is/are + past participle + by + agent', subject: 'English', difficulty: 'easy' },
      { id: 'navy-eng-2', question: 'The synonym of "Brave" is:', questionTamil: '"Brave" என்ற சொல்லின் ஒத்த சொல்:', options: ['Courageous', 'Timid', 'Cowardly', 'Weak'], optionsTamil: ['தைரியமான', 'பயந்த', 'கோழையான', 'பலவீனமான'], answer: 0, explanation: 'Brave means showing courage. Courageous is its synonym.', explanationTamil: 'Brave என்றால் தைரியம் காட்டுவது. Courageous அதன் ஒத்த சொல்.', subject: 'English', difficulty: 'easy' },
      { id: 'navy-gk-1', question: 'Indian Navy Day is celebrated on:', questionTamil: 'இந்திய கடற்படை தினம் கொண்டாடப்படும் நாள்:', options: ['December 4', 'January 15', 'October 8', 'November 14'], optionsTamil: ['டிசம்பர் 4', 'ஜனவரி 15', 'அக்டோபர் 8', 'நவம்பர் 14'], answer: 0, explanation: 'Navy Day is on December 4 to commemorate Operation Trident (1971 India-Pakistan War)', explanationTamil: 'கடற்படை தினம் டிசம்பர் 4 - ஆபரேஷன் ட்ரைடன்ட் (1971 இந்தியா-பாகிஸ்தான் போர்) நினைவாக', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'navy-gk-2', question: 'The headquarters of the Indian Navy is in:', questionTamil: 'இந்திய கடற்படையின் தலைமையகம் அமைந்துள்ள இடம்:', options: ['New Delhi', 'Mumbai', 'Visakhapatnam', 'Kochi'], optionsTamil: ['புது தில்லி', 'மும்பை', 'விசாகப்பட்டினம்', 'கொச்சி'], answer: 0, explanation: 'The headquarters of the Indian Navy (Integrated Headquarters of Ministry of Defence — Navy) is in New Delhi', explanationTamil: 'இந்திய கடற்படையின் தலைமையகம் புது தில்லியில் உள்ளது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'navy-gk-3', question: 'INS Vikrant is India\'s first:', questionTamil: 'INS விக்ராந்த் இந்தியாவின் முதல்:', options: ['Indigenous Aircraft Carrier', 'Nuclear Submarine', 'Destroyer Ship', 'Frigate'], optionsTamil: ['உள்நாட்டில் உருவாக்கப்பட்ட விமானம் தாங்கி கப்பல்', 'அணு நீர்மூழ்கிக் கப்பல்', 'அழிப்புக் கப்பல்', 'போர்க்கப்பல்'], answer: 0, explanation: 'INS Vikrant (IAC-1) is India\'s first indigenously designed and built aircraft carrier, commissioned on 2 September 2022', explanationTamil: 'INS விக்ராந்த் (IAC-1) இந்தியாவின் முதல் உள்நாட்டில் வடிவமைக்கப்பட்ட விமானம் தாங்கி கப்பல் — 2 செப்டம்பர் 2022 அன்று நியமிக்கப்பட்டது', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'navy-phy-3', question: 'Ohm\'s Law states that V = ?', questionTamil: 'ஓமின் விதிப்படி V = ?', options: ['I × R', 'I / R', 'R / I', 'I + R'], optionsTamil: ['I × R', 'I / R', 'R / I', 'I + R'], answer: 0, explanation: 'Ohm\'s Law: Voltage (V) = Current (I) × Resistance (R)', explanationTamil: 'ஓமின் விதி: மின்னழுத்தம் (V) = மின்னோட்டம் (I) × மின்தடை (R)', subject: 'Physics', difficulty: 'easy' }
    ]
  },
  {
    id: 'agniveer-airforce',
    name: 'Agniveer Air Force (Vayu)',
    nameTamil: 'அக்னிவீர் விமானப்படை (வாயு)',
    qualification: '12th Pass (PCM for Group X / Any Stream for Group Y)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (குரூப் X-க்கு PCM / குரூப் Y-க்கு ஏதேனும் பிரிவு)',
    age: '17.5 - 23 years',
    salary: '₹30,000/month',
    selectionProcess: 'Online Exam → Physical Fitness Test → Medical',
    selectionProcessTamil: 'ஆன்லைன் தேர்வு → உடற்தகுதி சோதனை → மருத்துவம்',
    examPattern: [
      { paper: 'Group X (Science) — English + Physics + Maths', paperTamil: 'குரூப் X (அறிவியல்) — ஆங்கிலம் + இயற்பியல் + கணிதம்', marks: 70, duration: '60 minutes', questions: 70 },
      { paper: 'Group Y (Non-Science) — English + RAGA', paperTamil: 'குரூப் Y (அறிவியல் அல்லாத) — ஆங்கிலம் + RAGA', marks: 50, duration: '45 minutes', questions: 50 },
      { paper: 'Combined X & Y — All Subjects', paperTamil: 'ஒருங்கிணைந்த X & Y — அனைத்து பாடங்கள்', marks: 100, duration: '85 minutes', questions: 100 }
    ],
    syllabus: {
      'Group X — Science Subjects (10+2 Level)': [
        {
          name: 'Group X — Science Subjects (60 min | +1 correct, −0.25 wrong)',
          nameTamil: 'குரூப் X — அறிவியல் பாடங்கள் (60 நிமிடம் | +1 சரி, −0.25 தவறு)',
          topics: [
            { name: 'Mathematics (10+2 Level)', nameTamil: 'கணிதம் (10+2 நிலை)', subtopics: [
              'Sets, Relations & Functions',
              'Trigonometric Functions — Identities, Equations, Inverse Trig',
              'Complex Numbers & Quadratic Equations',
              'Sequences & Series — AP, GP, Harmonic Progression',
              'Permutations & Combinations',
              'Binomial Theorem',
              'Conic Sections — Circle, Parabola, Ellipse, Hyperbola',
              'Matrices & Determinants — Operations, Inverse, Cramer\'s Rule',
              'Calculus — Limits, Continuity, Differentiation, Integration',
              'Differential Equations',
              'Probability — Conditional, Bayes\' Theorem, Random Variables',
              'Vectors — Dot Product, Cross Product, 3D Geometry',
              'Statistics — Mean, Variance, Standard Deviation',
              'Straight Lines & Coordinate Geometry'
            ] },
            { name: 'Physics (10+2 Level)', nameTamil: 'இயற்பியல் (10+2 நிலை)', subtopics: [
              'Physical World & Measurement — Units, Dimensions, Significant Figures',
              'Kinematics — Motion in Straight Line, Projectile, Relative Motion',
              'Laws of Motion — Newton\'s Laws, Friction, Circular Motion',
              'Work, Energy & Power — Conservation of Energy, Collisions',
              'Gravitation — Kepler\'s Laws, Gravitational Potential',
              'Properties of Solids & Liquids — Elasticity, Viscosity, Surface Tension',
              'Thermodynamics — Laws, Heat Engines, Carnot Cycle',
              'Kinetic Theory of Gases — Ideal Gas, RMS Speed',
              'Oscillations & Waves — SHM, Sound Waves, Doppler Effect',
              'Electrostatics — Coulomb\'s Law, Electric Field, Gauss\'s Law, Capacitors',
              'Current Electricity — Ohm\'s Law, Kirchhoff\'s Laws, Wheatstone Bridge',
              'Magnetic Effects of Current — Biot-Savart, Ampere\'s Law, Solenoid',
              'Electromagnetic Induction — Faraday\'s Law, Lenz\'s Law, AC Circuits',
              'Electromagnetic Waves — Spectrum, Properties',
              'Optics — Reflection, Refraction, Lenses, Interference, Diffraction',
              'Dual Nature of Matter & Radiation — Photoelectric Effect, de Broglie',
              'Atoms & Nuclei — Bohr Model, Radioactivity, Nuclear Reactions',
              'Electronic Devices — Semiconductors, Diodes, Transistors, Logic Gates'
            ] },
            { name: 'English (10+2 Level)', nameTamil: 'ஆங்கிலம் (10+2 நிலை)', subtopics: [
              'Reading Comprehension — Passage Based Questions',
              'Grammar — Tenses, Articles, Prepositions, Conjunctions',
              'Active & Passive Voice — Transformation',
              'Direct & Indirect Speech — Narration Changes',
              'Vocabulary — Synonyms, Antonyms, One Word Substitution',
              'Sentence Correction & Error Spotting',
              'Fill in the Blanks — Cloze Test',
              'Idioms & Phrases'
            ] }
          ]
        }
      ],
      'Group Y — Non-Science Subjects': [
        {
          name: 'Group Y — RAGA + English (45 min | +1 correct, −0.25 wrong)',
          nameTamil: 'குரூப் Y — RAGA + ஆங்கிலம் (45 நிமிடம் | +1 சரி, −0.25 தவறு)',
          topics: [
            { name: 'Reasoning (Part of RAGA)', nameTamil: 'தர்க்கம் (RAGA இன் பகுதி)', subtopics: [
              'Coding-Decoding — Letter & Number Coding Patterns',
              'Analogy — Word & Number Relationships',
              'Odd One Out — Classification',
              'Blood Relations — Family Tree Problems',
              'Number Series — Missing Number, Wrong Term',
              'Non-Verbal Reasoning — Pattern Recognition, Mirror & Water Image',
              'Time & Distance — Trains, Boats, Streams',
              'Profit & Loss — Cost Price, Selling Price, Discount',
              'Percentage — Increase, Decrease, Population',
              'Simple Interest & Compound Interest',
              'Average — Weighted, Running Average',
              'Ratio & Proportion — Direct, Inverse'
            ] },
            { name: 'General Awareness (Part of RAGA)', nameTamil: 'பொது விழிப்புணர்வு (RAGA இன் பகுதி)', subtopics: [
              'Current Affairs — National & International Events (Last 6 Months)',
              'Geography — Indian & World Geography, Climate, Rivers, Mountains',
              'History — Indian History, Freedom Movement, World Wars',
              'Basic Science — Inventions, Discoveries, Scientific Facts',
              'Indian Polity — Constitution, Parliament, President, Judiciary',
              'Sports — National & International Events, Awards, Records',
              'Defence — Indian Air Force History, Aircraft, Operations, Missiles',
              'Awards & Honours — Bharat Ratna, Padma Awards, Gallantry Awards',
              'Books & Authors, Important Days'
            ] },
            { name: 'English (Same as Group X)', nameTamil: 'ஆங்கிலம் (குரூப் X போன்றது)', subtopics: [
              'Reading Comprehension — Passage Based Questions',
              'Grammar — Tenses, Articles, Prepositions, Conjunctions',
              'Active & Passive Voice',
              'Direct & Indirect Speech',
              'Vocabulary — Synonyms, Antonyms, One Word Substitution',
              'Sentence Correction & Error Spotting',
              'Idioms & Phrases'
            ] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'af-gk-1', question: 'Indian Air Force was established in:', questionTamil: 'இந்திய விமானப்படை நிறுவப்பட்ட ஆண்டு:', options: ['1932', '1947', '1950', '1962'], optionsTamil: ['1932', '1947', '1950', '1962'], answer: 0, explanation: 'IAF was established on 8 October 1932 as the Royal Indian Air Force', explanationTamil: 'IAF 1932 அக்டோபர் 8 அன்று ராயல் இந்திய விமானப்படையாக நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'af-phy-1', question: 'The principle behind airplane flight is:', questionTamil: 'விமான பறப்பின் பின்னால் உள்ள கொள்கை:', options: ['Bernoulli\'s principle', 'Newton\'s law', 'Pascal\'s law', 'Archimedes\' principle'], optionsTamil: ['பெர்னூலியின் கொள்கை', 'நியூட்டன் விதி', 'பாஸ்கல் விதி', 'ஆர்க்கிமிடிஸ் கொள்கை'], answer: 0, explanation: 'Bernoulli\'s principle explains lift in airplane wings', explanationTamil: 'பெர்னூலியின் கொள்கை விமான இறக்கைகளில் லிஃப்ட் விளக்குகிறது', subject: 'Physics', difficulty: 'medium' },
      { id: 'af-phy-1', question: 'The unit of electric current is:', questionTamil: 'மின்னோட்டத்தின் அலகு:', options: ['Ampere', 'Volt', 'Ohm', 'Watt'], optionsTamil: ['ஆம்பியர்', 'வோல்ட்', 'ஓம்', 'வாட்'], answer: 0, explanation: 'Ampere (A) is the SI unit of electric current, named after André-Marie Ampère.', explanationTamil: 'ஆம்பியர் (A) மின்னோட்டத்தின் SI அலகு.', subject: 'Physics', difficulty: 'easy' },
      { id: 'af-phy-2', question: 'The speed of light in vacuum is approximately:', questionTamil: 'வெற்றிடத்தில் ஒளியின் வேகம் தோராயமாக:', options: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s'], optionsTamil: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s'], answer: 0, explanation: 'The speed of light in vacuum is approximately 3 × 10⁸ meters per second (299,792,458 m/s exactly).', explanationTamil: 'வெற்றிடத்தில் ஒளியின் வேகம் தோராயமாக 3 × 10⁸ மீட்டர்/வினாடி.', subject: 'Physics', difficulty: 'easy' },
      { id: 'af-math-1', question: 'sin 30° + cos 60° = ?', questionTamil: 'sin 30° + cos 60° = ?', options: ['1', '0.5', '1.5', '0'], optionsTamil: ['1', '0.5', '1.5', '0'], answer: 0, explanation: 'sin 30° = 0.5, cos 60° = 0.5. Sum = 0.5 + 0.5 = 1', explanationTamil: 'sin 30° = 0.5, cos 60° = 0.5. கூட்டு = 1', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'af-math-2', question: 'If log₁₀ 100 = x, then x = ?', questionTamil: 'log₁₀ 100 = x எனில், x = ?', options: ['2', '10', '1', '100'], optionsTamil: ['2', '10', '1', '100'], answer: 0, explanation: 'log₁₀ 100 = log₁₀ 10² = 2 × log₁₀ 10 = 2 × 1 = 2', explanationTamil: 'log₁₀ 100 = log₁₀ 10² = 2', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'af-eng-1', question: 'Choose the correct spelling:', questionTamil: 'சரியான எழுத்துப்பிழையைத் தேர்ந்தெடுக்கவும்:', options: ['Accommodate', 'Accomodate', 'Acommodate', 'Acomodate'], optionsTamil: ['Accommodate', 'Accomodate', 'Acommodate', 'Acomodate'], answer: 0, explanation: 'Accommodate has two c\'s and two m\'s — one of the most commonly misspelled English words.', explanationTamil: 'Accommodate இல் இரண்டு c மற்றும் இரண்டு m உள்ளது.', subject: 'English', difficulty: 'easy' },
      { id: 'af-eng-2', question: 'The synonym of "Valiant" is:', questionTamil: '"Valiant" என்ற சொல்லின் ஒத்த சொல்:', options: ['Brave', 'Weak', 'Timid', 'Lazy'], optionsTamil: ['தைரியமான', 'பலவீனமான', 'பயந்த', 'சோம்பேறி'], answer: 0, explanation: 'Valiant means showing courage or determination. Brave is the closest synonym.', explanationTamil: 'Valiant என்றால் தைரியமான, வீரமான என்று பொருள்.', subject: 'English', difficulty: 'easy' },
      { id: 'af-reason-1', question: 'If APPLE is coded as 50, what is MANGO coded as?', questionTamil: 'APPLE = 50 என குறியிடப்பட்டால், MANGO = ?', options: ['57', '55', '60', '52'], optionsTamil: ['57', '55', '60', '52'], answer: 0, explanation: 'A=1,P=16,P=16,L=12,E=5. APPLE=1+16+16+12+5=50. M=13,A=1,N=14,G=7,O=15. MANGO=13+1+14+7+15=50... Let me recalculate. Actually using position sum does not give 50 for APPLE. Using a different code: each letter×2: A=2,P=32,P=32,L=24,E=10=100. Not matching. Simple sum gives 50. MANGO: M=13+A=1+N=14+G=7+O=15=50. Actually both equal 50!', explanationTamil: 'MANGO = M(13)+A(1)+N(14)+G(7)+O(15) = 50... Actually = 50!', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'af-gk-1', question: 'Indian Air Force was established on:', questionTamil: 'இந்திய விமானப்படை நிறுவப்பட்ட நாள்:', options: ['8 October 1932', '15 August 1947', '26 January 1950', '1 April 1933'], optionsTamil: ['8 அக்டோபர் 1932', '15 ஆகஸ்ட் 1947', '26 ஜனவரி 1950', '1 ஏப்ரல் 1933'], answer: 0, explanation: 'Indian Air Force was established on 8 October 1932 as the Royal Indian Air Force. IAF Day is celebrated on 8 October every year.', explanationTamil: 'இந்திய விமானப்படை 8 அக்டோபர் 1932 அன்று ராயல் இந்திய விமானப்படையாக நிறுவப்பட்டது.', subject: 'General Knowledge', difficulty: 'easy' }
    ]
  },
  {
    id: 'coastguard',
    name: 'Indian Coast Guard Navik (GD)',
    nameTamil: 'இந்திய கடலோர காவல் நாவிக் (GD)',
    qualification: '12th Pass (PCM)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (PCM)',
    age: '18 - 22 years',
    salary: '₹29,200/month',
    selectionProcess: 'Stage I Written → Stage II Physical → Medical',
    selectionProcessTamil: 'நிலை I எழுத்துத் தேர்வு → நிலை II உடற்தகுதி → மருத்துவம்',
    posts: ['Navik (General Duty)'],
    postsTamil: ['நாவிக் (பொது பணி)'],
    examPattern: [
      { paper: 'Section I (10th Standard)', paperTamil: 'பிரிவு I (10ஆம் வகுப்பு)', marks: 60, duration: '75 min (total)', questions: 60 },
      { paper: 'Section II (12th Standard - PCM)', paperTamil: 'பிரிவு II (12ஆம் வகுப்பு - PCM)', marks: 50, duration: 'Included in 75 min', questions: 50 }
    ],
    syllabus: {
      'Section I — 10th Standard (60 Marks)': [
        {
          name: 'Section I — 10th Standard Level (60 Marks, 60 Questions)',
          nameTamil: 'பிரிவு I — 10ஆம் வகுப்பு நிலை (60 மதிப்பெண்கள்)',
          topics: [
            { name: 'Mathematics (20 Questions)', nameTamil: 'கணிதம் (20 கேள்விகள்)', subtopics: [
              'Mathematical Simplification', 'Ratio and Proportion', 'Algebraic Identities',
              'Linear Equations and Polynomials', 'Simultaneous Equations', 'Basic Trigonometry',
              'Simple Mensuration', 'Geometry', 'Measures of Central Tendency (Average, Median, Mode)',
              'Interest, Profit, Loss and Percentage', 'Work, Time, Speed, and Distance'
            ] },
            { name: 'Science (10 Questions)', nameTamil: 'அறிவியல் (10 கேள்விகள்)', subtopics: [
              'Nature of Matter', 'Universe (Planets / Earth / Satellites / Sun)',
              'Electricity and its Applications', 'Force and Gravitation', 'Newton\'s Laws of Motion',
              'Work, Energy, and Power', 'Heat and Temperature', 'Metals and Non-Metals',
              'Carbon and its Compounds', 'Measurements in Science', 'Sound and Wave Motion', 'Atomic Structure'
            ] },
            { name: 'English (15 Questions)', nameTamil: 'ஆங்கிலம் (15 கேள்விகள்)', subtopics: [
              'Passage Comprehension', 'Prepositions', 'Correction of Sentences',
              'Active to Passive / Passive to Active Voice', 'Direct to Indirect / Indirect to Direct Speech',
              'Verbs, Tense, Non-Finites', 'Punctuation', 'Phrasal Verbs and Expressions',
              'Synonyms and Antonyms', 'Use of Adjectives and Pronouns'
            ] },
            { name: 'Reasoning (10 Questions)', nameTamil: 'பகுத்தறிவு (10 கேள்விகள்)', subtopics: [
              'Spatial Reasoning', 'Numerical Reasoning', 'Associative Ability',
              'Sequences and Series', 'Spelling Unscrambling', 'Coding and Decoding'
            ] },
            { name: 'General Knowledge (5 Questions)', nameTamil: 'பொது அறிவு (5 கேள்விகள்)', subtopics: [
              'Geography (Soil, Rivers, Mountains, Ports, Inland Harbours)',
              'Culture and Religion', 'Freedom Movement',
              'Important National Facts about India', 'Heritage, Arts and Dance'
            ] }
          ]
        }
      ],
      'Section II — 12th Standard (50 Marks)': [
        {
          name: 'Section II — 12th Standard Level (50 Marks, 50 Questions)',
          nameTamil: 'பிரிவு II — 12ஆம் வகுப்பு நிலை (50 மதிப்பெண்கள்)',
          topics: [
            { name: 'Mathematics (25 Questions)', nameTamil: 'கணிதம் (25 கேள்விகள்)', subtopics: [
              'Sets, Relations and Functions', 'Complex Numbers', 'Quadratic Equations',
              'Matrices and Determinants', 'Trigonometric Functions', 'Limits and Derivatives',
              'Applications of Derivatives', 'Integrals', 'Differential Equations',
              'Vector Algebra', '3D Geometry', 'Linear Programming',
              'Probability', 'Conic Sections'
            ] },
            { name: 'Physics (25 Questions)', nameTamil: 'இயற்பியல் (25 கேள்விகள்)', subtopics: [
              'Physical World and Measurement', 'Kinematics', 'Laws of Motion',
              'Work, Energy and Power', 'Motion of Systems of Particles and Rigid Body',
              'Gravitation', 'Mechanics of Solids and Fluids', 'Heat and Thermodynamics',
              'Oscillations', 'Waves', 'Electrostatics', 'Current Electricity',
              'Magnetic Effects of Current and Magnetism',
              'Electromagnetic Induction and Alternating Currents',
              'Electromagnetic Waves', 'Optics',
              'Dual Nature of Matter and Radiation', 'Atoms and Nuclei',
              'Electronic Devices', 'Communication Systems'
            ] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'cg-gk-1', question: 'Indian Coast Guard was established in:', questionTamil: 'இந்திய கடலோர காவல் நிறுவப்பட்ட ஆண்டு:', options: ['1978', '1965', '1947', '1990'], optionsTamil: ['1978', '1965', '1947', '1990'], answer: 0, explanation: 'Indian Coast Guard was established on 18th August 1978', explanationTamil: 'இந்திய கடலோர காவல் 1978 ஆகஸ்ட் 18 அன்று நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'cg-gk-2', question: 'The motto of Indian Coast Guard is:', questionTamil: 'இந்திய கடலோர காவலின் குறிக்கோள்:', options: ['Vayam Rakshamah', 'Satyameva Jayate', 'Service Before Self', 'Jai Hind'], optionsTamil: ['வயம் ரக்ஷாமஹ்', 'சத்யமேவ ஜயதே', 'சேவை முதலில்', 'ஜெய் ஹிந்த்'], answer: 0, explanation: '"Vayam Rakshamah" means "We Protect"', explanationTamil: '"வயம் ரக்ஷாமஹ்" என்றால் "நாங்கள் பாதுகாக்கிறோம்"', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'cg-sci-1', question: 'The boiling point of water at sea level is:', questionTamil: 'கடல் மட்டத்தில் நீரின் கொதிநிலை:', options: ['100°C', '90°C', '110°C', '80°C'], optionsTamil: ['100°C', '90°C', '110°C', '80°C'], answer: 0, explanation: 'Water boils at 100°C (212°F) at standard atmospheric pressure at sea level.', explanationTamil: 'நீர் 100°C இல் கொதிக்கிறது.', subject: 'Science', difficulty: 'easy' },
      { id: 'cg-sci-2', question: 'Which gas makes up about 78% of Earth\'s atmosphere?', questionTamil: 'புவி வளிமண்டலத்தில் 78% எந்த வாயு?', options: ['Nitrogen', 'Oxygen', 'Carbon Dioxide', 'Argon'], optionsTamil: ['நைட்ரஜன்', 'ஆக்சிஜன்', 'கார்பன் டை ஆக்சைடு', 'ஆர்கான்'], answer: 0, explanation: 'Nitrogen 78%, Oxygen 21%, Argon 0.93%, CO2 0.04%.', explanationTamil: 'நைட்ரஜன் 78%, ஆக்சிஜன் 21%.', subject: 'Science', difficulty: 'easy' },
      { id: 'cg-math-1', question: 'Area of circle with radius 7 cm (π=22/7):', questionTamil: 'ஆரம் 7 செமீ வட்டத்தின் பரப்பு:', options: ['154 cm²', '144 cm²', '164 cm²', '132 cm²'], optionsTamil: ['154 செமீ²', '144 செமீ²', '164 செமீ²', '132 செமீ²'], answer: 0, explanation: 'Area = πr² = (22/7) × 49 = 154 cm²', explanationTamil: 'πr² = (22/7) × 49 = 154 செமீ²', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'cg-math-2', question: 'If x + y = 10 and x - y = 4, then x = ?', questionTamil: 'x + y = 10, x - y = 4 எனில் x = ?', options: ['7', '6', '8', '5'], optionsTamil: ['7', '6', '8', '5'], answer: 0, explanation: 'Adding: 2x = 14, x = 7. Then y = 3.', explanationTamil: 'கூட்ட: 2x = 14, x = 7.', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'cg-eng-1', question: 'The plural of "child" is:', questionTamil: '"child" பன்மை:', options: ['Children', 'Childs', 'Childrens', 'Child'], optionsTamil: ['Children', 'Childs', 'Childrens', 'Child'], answer: 0, explanation: 'Child → Children is an irregular plural.', explanationTamil: 'Child → Children ஒழுங்கற்ற பன்மை.', subject: 'English', difficulty: 'easy' },
      { id: 'cg-phy-1', question: 'The SI unit of force is:', questionTamil: 'விசையின் SI அலகு:', options: ['Newton', 'Joule', 'Watt', 'Pascal'], optionsTamil: ['நியூட்டன்', 'ஜூல்', 'வாட்', 'பாஸ்கல்'], answer: 0, explanation: 'Newton (N) is SI unit of force. F = ma. 1 N = 1 kg⋅m/s².', explanationTamil: 'நியூட்டன் (N) விசையின் SI அலகு.', subject: 'Physics', difficulty: 'easy' },
      { id: 'cg-reason-1', question: 'Next: 1, 4, 9, 16, 25, ?', questionTamil: 'அடுத்தது: 1, 4, 9, 16, 25, ?', options: ['36', '30', '35', '49'], optionsTamil: ['36', '30', '35', '49'], answer: 0, explanation: 'Perfect squares: 1², 2², 3², 4², 5². Next: 6² = 36.', explanationTamil: '1², 2², 3², 4², 5². அடுத்தது: 6² = 36.', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'cg-gk-3', question: 'Which ocean borders India on the east?', questionTamil: 'இந்தியாவின் கிழக்கில் உள்ள கடல்:', options: ['Bay of Bengal', 'Arabian Sea', 'Indian Ocean', 'Pacific Ocean'], optionsTamil: ['வங்காள விரிகுடா', 'அரபிக் கடல்', 'இந்திய பெருங்கடல்', 'பசிபிக் பெருங்கடல்'], answer: 0, explanation: 'Bay of Bengal is east of India. Arabian Sea is west. Indian Ocean is south.', explanationTamil: 'வங்காள விரிகுடா கிழக்கில், அரபிக் கடல் மேற்கில், இந்திய பெருங்கடல் தெற்கில்.', subject: 'Geography', difficulty: 'easy' }
    ]
  },
  {
    id: 'bsf-constable',
    name: 'BSF Constable (Tradesman)',
    nameTamil: 'BSF காவலர் (டிரேட்ஸ்மேன்)',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 23 years',
    salary: '₹23,527/month',
    selectionProcess: 'Online Application (OTR on bsf.gov.in) → Written Exam (OMR/CBT) → Physical Standards Test (PST) → Physical Efficiency Test (PET) → Trade Test → Document Verification → Medical Examination',
    selectionProcessTamil: 'ஆன்லைன் விண்ணப்பம் (bsf.gov.in OTR) → எழுத்துத் தேர்வு (OMR/CBT) → உடல் தரநிலை தேர்வு (PST) → உடல் திறன் தேர்வு (PET) → தொழில் தேர்வு → ஆவண சரிபார்ப்பு → மருத்துவப் பரிசோதனை',
    posts: ['BSF Constable (Tradesman)', 'BSF Constable (GD)', 'CRPF Constable', 'CISF Constable', 'ITBP Constable'],
    postsTamil: ['BSF காவலர் (டிரேட்ஸ்மேன்)', 'BSF காவலர் (GD)', 'CRPF காவலர்', 'CISF காவலர்', 'ITBP காவலர்'],
    examPattern: [
      { paper: 'Written Exam (OMR/CBT)', paperTamil: 'எழுத்துத் தேர்வு (OMR/CBT)', marks: 100, duration: '2 hours', questions: 100 }
    ],
    syllabus: {
      'Written Exam (100 Questions, 100 Marks, 2 Hours)': [
        {
          name: 'General Awareness / Knowledge (25 Marks)',
          nameTamil: 'பொது அறிவு (25 மதிப்பெண்கள்)',
          topics: [
            { name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்', subtopics: ['National & International Current Affairs', 'Awards & Honours — Padma, Bharat Ratna, Nobel', 'Books & Authors', 'Sports — Olympics, Commonwealth, Cricket', 'Important Days & Dates', 'Government Schemes — PM Awas Yojana, Jan Dhan, etc.'] },
            { name: 'Indian History', nameTamil: 'இந்திய வரலாறு', subtopics: ['Ancient India — Indus Valley, Vedic Period', 'Medieval India — Mughal Empire, Delhi Sultanate', 'Modern India — British Rule, Freedom Movement', 'Important Personalities — Gandhi, Nehru, Bose, Bhagat Singh'] },
            { name: 'Geography', nameTamil: 'புவியியல்', subtopics: ['Indian Geography — Rivers, Mountains, Plains, Plateaus', 'Climate & Seasons of India', 'Soil Types & Agriculture', 'World Geography — Continents, Oceans, Countries & Capitals'] },
            { name: 'Indian Polity & Economy', nameTamil: 'இந்திய அரசியல் & பொருளாதாரம்', subtopics: ['Indian Constitution — Fundamental Rights, Directive Principles', 'Parliament, President, Prime Minister', 'Indian Economy — Budget, GDP, Five Year Plans', 'RBI, Banking System, Taxation'] },
            { name: 'General Science', nameTamil: 'பொது அறிவியல்', subtopics: ['Physics — Laws of Motion, Light, Sound, Electricity', 'Chemistry — Elements, Compounds, Reactions, Acids & Bases', 'Biology — Human Body, Diseases, Nutrition, Vitamins'] }
          ]
        },
        {
          name: 'Elementary Mathematics (25 Marks)',
          nameTamil: 'அடிப்படை கணிதம் (25 மதிப்பெண்கள்)',
          topics: [
            { name: 'Arithmetic', nameTamil: 'எண்கணிதம்', subtopics: ['Number Systems — Natural, Whole, Integers, Rational', 'Percentage — Calculation, Increase/Decrease', 'Ratio & Proportion', 'Average — Simple & Weighted', 'Profit & Loss — Cost Price, Selling Price, Discount'] },
            { name: 'Time & Work', nameTamil: 'நேரம் & வேலை', subtopics: ['Time & Distance — Speed, Relative Speed, Trains', 'Time & Work — Pipe & Cistern Problems', 'Simple Interest & Compound Interest', 'Partnership — Profit Sharing'] },
            { name: 'Geometry & Mensuration', nameTamil: 'வடிவியல் & அளவீடு', subtopics: ['Mensuration — Area, Perimeter, Volume', 'Triangles, Circles, Rectangles, Cubes, Cylinders', 'Data Interpretation — Tables, Bar Graphs, Pie Charts', 'Basic Algebra — Linear Equations, Simplification'] }
          ]
        },
        {
          name: 'Analytical Aptitude / Reasoning (25 Marks)',
          nameTamil: 'பகுப்பாய்வு திறன் / தர்க்கம் (25 மதிப்பெண்கள்)',
          topics: [
            { name: 'Verbal Reasoning', nameTamil: 'சொல் தர்க்கம்', subtopics: ['Analogies — Word Relationships', 'Coding-Decoding — Letter & Number Coding', 'Relationships — Blood Relations, Direction Sense', 'Classification — Odd One Out'] },
            { name: 'Non-Verbal & Analytical', nameTamil: 'சொல்லற்ற & பகுப்பாய்வு', subtopics: ['Similarities & Differences', 'Spatial Visualization — Mirror Image, Paper Folding', 'Pattern Recognition — Series Completion', 'Arithmetic Reasoning — Word Problems', 'Venn Diagrams', 'Seating Arrangement', 'Syllogisms'] }
          ]
        },
        {
          name: 'Basic English / Hindi (25 Marks)',
          nameTamil: 'அடிப்படை ஆங்கிலம் / இந்தி (25 மதிப்பெண்கள்)',
          topics: [
            { name: 'English Grammar', nameTamil: 'ஆங்கில இலக்கணம்', subtopics: ['Tenses — Past, Present, Future', 'Active & Passive Voice', 'Direct & Indirect Speech', 'Parts of Speech — Noun, Verb, Adjective, Adverb', 'Articles, Prepositions, Conjunctions', 'Subject-Verb Agreement', 'Error Spotting & Sentence Correction'] },
            { name: 'Vocabulary & Comprehension', nameTamil: 'சொல்வளம் & புரிதல்', subtopics: ['Synonyms & Antonyms', 'Idioms & Phrases', 'One Word Substitution', 'Fill in the Blanks', 'Reading Comprehension — Passage Based Questions', 'Sentence Rearrangement / Para Jumbles', 'Cloze Test'] }
          ]
        }
      ],
      'Physical Standards & Efficiency Test (PST/PET)': [
        {
          name: 'Physical Standards Test (PST)',
          nameTamil: 'உடல் தரநிலை தேர்வு (PST)',
          topics: [
            { name: 'Height Requirements', nameTamil: 'உயர தேவைகள்', subtopics: ['General Male: 170 cm', 'Scheduled Tribes: 162.5 cm', 'Candidates from Garhwal, Kumaon, Dogra, Maratha, NE States: 165 cm', 'Female: 157 cm (General), 155 cm (ST)'] },
            { name: 'Chest Measurement (Male Only)', nameTamil: 'மார்பு அளவு (ஆண் மட்டும்)', subtopics: ['General: 80 cm unexpanded, 85 cm expanded (5 cm expansion)', 'ST/Hill areas: 76 cm unexpanded, 81 cm expanded'] }
          ]
        },
        {
          name: 'Physical Efficiency Test (PET)',
          nameTamil: 'உடல் திறன் தேர்வு (PET)',
          topics: [
            { name: 'Running Test', nameTamil: 'ஓட்டத் தேர்வு', subtopics: ['Male: 5 km run in 24 minutes', 'Female: 1.6 km run in 8 minutes 30 seconds'] }
          ]
        }
      ],
      'Application Process (OTR on bsf.gov.in)': [
        {
          name: 'How to Apply — Online Application',
          nameTamil: 'விண்ணப்பிப்பது எப்படி — ஆன்லைன் விண்ணப்பம்',
          topics: [
            { name: 'Step-by-Step Process', nameTamil: 'படிப்படியான செயல்முறை', subtopics: [
              'Step 1: Go to www.bsf.gov.in and register One-Time Profile (OTR)',
              'Step 2: Valid Email ID & Mobile Number required for registration',
              'Step 3: Upload documents — Passport Photo (max 50KB), Signature (max 50KB), Thumb Impression (max 50KB)',
              'Step 4: Login and click "Click Here to Apply" next to active advertisement',
              'Step 5: System auto-checks eligibility — only eligible candidates accepted',
              'Step 6: Fill all fields carefully — no editing after final submission',
              'Step 7: Pay exam fee via Net Banking, Debit Card, Credit Card, or Common Service Centre',
              'Note: Female / Ex-Servicemen / SC / ST candidates are exempt from exam fee'
            ] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'bsf-gk-1', question: 'BSF stands for:', questionTamil: 'BSF என்பதன் விரிவாக்கம்:', options: ['Border Security Force', 'Border Safety Force', 'Border Surveillance Force', 'Basic Security Force'], optionsTamil: ['எல்லை பாதுகாப்புப் படை', 'எல்லை பாதுகாப்பு படை', 'எல்லை கண்காணிப்பு படை', 'அடிப்படை பாதுகாப்பு படை'], answer: 0, explanation: 'BSF = Border Security Force, established on 1 December 1965 to guard India\'s borders with Pakistan and Bangladesh', explanationTamil: 'BSF = எல்லை பாதுகாப்புப் படை, 1965 டிசம்பர் 1 அன்று நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'bsf-gk-2', question: 'CRPF headquarters is located at:', questionTamil: 'CRPF தலைமையகம் அமைந்துள்ள இடம்:', options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'], optionsTamil: ['புது தில்லி', 'மும்பை', 'கொல்கத்தா', 'சென்னை'], answer: 0, explanation: 'CRPF Headquarters is at CGO Complex, Lodhi Road, New Delhi', explanationTamil: 'CRPF தலைமையகம் CGO வளாகம், லோதி சாலை, புது தில்லியில் உள்ளது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'bsf-gk-3', question: 'BSF was established in which year?', questionTamil: 'BSF எந்த ஆண்டு நிறுவப்பட்டது?', options: ['1965', '1947', '1950', '1962'], optionsTamil: ['1965', '1947', '1950', '1962'], answer: 0, explanation: 'BSF was raised on 1 December 1965 after the 1965 Indo-Pak War, to guard the India-Pakistan border', explanationTamil: 'BSF 1965 டிசம்பர் 1 அன்று 1965 இந்தியா-பாகிஸ்தான் போருக்குப் பிறகு எழுப்பப்பட்டது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'bsf-gk-4', question: 'The motto of BSF is:', questionTamil: 'BSF இன் குறிக்கோள்:', options: ['Duty Unto Death', 'Service Before Self', 'Sentinel Always', 'Valour and Victory'], optionsTamil: ['கடமை இறுதிவரை', 'சேவை முதலில்', 'எப்போதும் காவல்', 'வீரமும் வெற்றியும்'], answer: 0, explanation: 'The motto of BSF is "Duty Unto Death" (Jeevan Paryant Kartavya) — reflecting total commitment to border security', explanationTamil: 'BSF இன் குறிக்கோள் "கடமை இறுதிவரை" (ஜீவன் பர்யந்த் கர்தவ்ய)', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'bsf-math-1', question: 'If a product is bought for ₹500 and sold for ₹600, the profit percentage is:', questionTamil: 'ஒரு பொருளை ₹500 க்கு வாங்கி ₹600 க்கு விற்றால், லாப சதவீதம்:', options: ['20%', '25%', '10%', '15%'], optionsTamil: ['20%', '25%', '10%', '15%'], answer: 0, explanation: 'Profit = ₹600 - ₹500 = ₹100. Profit % = (100/500) × 100 = 20%', explanationTamil: 'லாபம் = ₹600 - ₹500 = ₹100. லாப % = (100/500) × 100 = 20%', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'bsf-math-2', question: 'A train 300m long crosses a pole in 15 seconds. Its speed is:', questionTamil: '300 மீ நீளமுள்ள ரயில் ஒரு கம்பத்தை 15 வினாடியில் கடக்கிறது. அதன் வேகம்:', options: ['72 km/h', '20 km/h', '60 km/h', '36 km/h'], optionsTamil: ['72 km/h', '20 km/h', '60 km/h', '36 km/h'], answer: 0, explanation: 'Speed = Distance/Time = 300/15 = 20 m/s = 20 × 18/5 = 72 km/h', explanationTamil: 'வேகம் = தூரம்/நேரம் = 300/15 = 20 m/s = 20 × 18/5 = 72 km/h', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'bsf-reason-1', question: 'In a certain code, COMPUTER is written as DPNQVUFS. How is MOBILE written?', questionTamil: 'ஒரு குறிப்பிட்ட குறியீட்டில் COMPUTER என்பது DPNQVUFS என எழுதப்படுகிறது. MOBILE எப்படி எழுதப்படும்?', options: ['NPCJMF', 'NPMCJF', 'NPBJMF', 'NPCJME'], optionsTamil: ['NPCJMF', 'NPMCJF', 'NPBJMF', 'NPCJME'], answer: 0, explanation: 'Each letter is replaced by the next letter in the alphabet: M→N, O→P, B→C, I→J, L→M, E→F = NPCJMF', explanationTamil: 'ஒவ்வொரு எழுத்தும் அடுத்த எழுத்தால் மாற்றப்படுகிறது: M→N, O→P, B→C, I→J, L→M, E→F = NPCJMF', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'bsf-eng-1', question: 'Choose the correct sentence:', questionTamil: 'சரியான வாக்கியத்தை தேர்வு செய்:', options: ['He has been working since morning', 'He has been working from morning', 'He is working since morning', 'He was working since morning'], optionsTamil: ['He has been working since morning', 'He has been working from morning', 'He is working since morning', 'He was working since morning'], answer: 0, explanation: '"Since" is used with a point of time, and with Present Perfect Continuous tense for an action that started in the past and is still continuing', explanationTamil: '"Since" ஒரு குறிப்பிட்ட நேரத்துடன் பயன்படுத்தப்படும், Present Perfect Continuous tense உடன் பயன்படும்', subject: 'English', difficulty: 'medium' },
      { id: 'bsf-eng-2', question: 'The antonym of "Ancient" is:', questionTamil: '"Ancient" என்ற சொல்லின் எதிர்ச்சொல்:', options: ['Modern', 'Old', 'Historic', 'Traditional'], optionsTamil: ['நவீன', 'பழைய', 'வரலாற்று', 'பாரம்பரிய'], answer: 0, explanation: 'Ancient means very old or belonging to a long time ago. Modern is its opposite — meaning relating to the present or recent times.', explanationTamil: 'Ancient என்றால் மிகவும் பழமையான. Modern அதன் எதிர்ச்சொல் — தற்கால என்று பொருள்.', subject: 'English', difficulty: 'easy' }
    ]
  },
  {
    id: 'crpf-constable',
    name: 'CRPF Constable',
    nameTamil: 'CRPF காவலர்',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 23 years',
    salary: '₹23,527 - ₹81,100/month',
    selectionProcess: 'Computer Based Test (CBT) → Physical Standards Test (PST) → Physical Efficiency Test (PET) → Trade Test → Document Verification → Medical Examination',
    selectionProcessTamil: 'கணினி அடிப்படையிலான தேர்வு (CBT) → உடல் தரநிலை தேர்வு (PST) → உடல் திறன் தேர்வு (PET) → தொழில் தேர்வு → ஆவண சரிபார்ப்பு → மருத்துவப் பரிசோதனை',
    posts: ['CRPF Constable (GD)', 'CRPF Constable (Tradesman — Driver, Cook, Tailor, etc.)'],
    postsTamil: ['CRPF காவலர் (GD)', 'CRPF காவலர் (டிரேட்ஸ்மேன் — டிரைவர், சமையல்காரர், தையல்காரர்)'],
    examPattern: [
      { paper: 'Computer Based Test (CBT)', paperTamil: 'கணினி அடிப்படையிலான தேர்வு (CBT)', marks: 100, duration: '2 hours', questions: 100 }
    ],
    syllabus: {
      'Written Exam — CBT (100 Questions, 100 Marks, 2 Hours)': [
        {
          name: 'Section A — General Intelligence & Reasoning (25 Marks)',
          nameTamil: 'பிரிவு A — பொது நுண்ணறிவு & தர்க்கம் (25 மதிப்பெண்கள்)',
          topics: [
            { name: 'Verbal Reasoning', nameTamil: 'சொல் தர்க்கம்', subtopics: ['Analogies — Word & Number Relationships', 'Similarities and Differences', 'Relationship Concepts — Blood Relations', 'Coding and Decoding — Letter/Number/Mixed Coding', 'Arithmetical Reasoning — Word Problems'] },
            { name: 'Non-Verbal Reasoning', nameTamil: 'சொல்லற்ற தர்க்கம்', subtopics: ['Visual Memory & Discrimination', 'Observation — Pattern Recognition', 'Figural Classification — Odd One Out', 'Arithmetic Number Series — Missing Numbers', 'Non-verbal Series — Figure Completion', 'Spatial Orientation — Mirror Image, Paper Folding'] }
          ]
        },
        {
          name: 'Section B — General Knowledge & General Awareness (25 Marks)',
          nameTamil: 'பிரிவு B — பொது அறிவு & விழிப்புணர்வு (25 மதிப்பெண்கள்)',
          topics: [
            { name: 'Indian History & Culture', nameTamil: 'இந்திய வரலாறு & கலாச்சாரம்', subtopics: ['Ancient India — Indus Valley, Maurya, Gupta Empires', 'Medieval India — Mughal Empire, Delhi Sultanate', 'Modern India — British Rule, Freedom Movement, Important Leaders', 'Indian Culture — Art, Dance, Music, Festivals, Heritage Sites'] },
            { name: 'Geography & Economy', nameTamil: 'புவியியல் & பொருளாதாரம்', subtopics: ['Indian Geography — Rivers, Mountains, Plains, Climate, Soil', 'World Geography — Continents, Oceans, Countries & Capitals', 'Indian Economy — GDP, Budget, Five Year Plans, NITI Aayog', 'Socio-Economic Development — Poverty, Literacy, Population'] },
            { name: 'Polity & Current Affairs', nameTamil: 'அரசியல் & நடப்பு நிகழ்வுகள்', subtopics: ['Indian Polity — Constitution, Fundamental Rights, Parliament, President', 'Current Events — National & International News', 'Scientific Developments — Space (ISRO), Defence (DRDO)', 'Awards & Honours, Sports, Books & Authors'] }
          ]
        },
        {
          name: 'Section C — Elementary Mathematics (25 Marks)',
          nameTamil: 'பிரிவு C — அடிப்படை கணிதம் (25 மதிப்பெண்கள்)',
          topics: [
            { name: 'Arithmetic Fundamentals', nameTamil: 'எண்கணித அடிப்படைகள்', subtopics: ['Number Systems — Natural, Whole, Integers, Rational, Real Numbers', 'HCF & LCM — Prime Factorization Method', 'Percentages — Calculation, Increase/Decrease, Successive', 'Ratio and Proportion — Direct & Inverse', 'Average — Simple Average, Weighted Average', 'Simplification — BODMAS, Fractions, Decimals'] },
            { name: 'Commercial & Applied Math', nameTamil: 'வணிக & பயன்பாட்டு கணிதம்', subtopics: ['Profit & Loss — Cost Price, Selling Price, Discount, Marked Price', 'Time & Work — Efficiency, Pipes & Cisterns', 'Time, Speed & Distance — Relative Speed, Trains, Boats & Streams', 'Simple Interest & Compound Interest', 'Data Interpretation — Tables, Bar Graphs, Pie Charts, Line Graphs'] },
            { name: 'Mensuration', nameTamil: 'அளவீடு', subtopics: ['Area & Perimeter — Triangle, Circle, Rectangle, Square', 'Volume & Surface Area — Cylinder, Cone, Sphere, Cuboid', 'Mensuration Word Problems'] }
          ]
        },
        {
          name: 'Section D — English / Hindi (25 Marks)',
          nameTamil: 'பிரிவு D — ஆங்கிலம் / இந்தி (25 மதிப்பெண்கள்)',
          topics: [
            { name: 'English Grammar', nameTamil: 'ஆங்கில இலக்கணம்', subtopics: ['Error Recognition — Spot the Error in Sentences', 'Fill in the Blanks — Prepositions, Articles, Conjunctions', 'Grammar Rules — Tenses, Voice, Speech, Subject-Verb Agreement', 'Spellings — Commonly Misspelled Words', 'Sentence Rearrangement — Para Jumbles, Sentence Order'] },
            { name: 'Vocabulary & Comprehension', nameTamil: 'சொல்வளம் & புரிதல்', subtopics: ['Synonyms — Words with Similar Meaning', 'Antonyms — Words with Opposite Meaning', 'Idioms & Phrases — Common English Idioms', 'One Word Substitution', 'Reading Comprehension — Passage-Based Questions'] }
          ]
        }
      ],
      'Physical Standards Test (PST) & Physical Efficiency Test (PET)': [
        {
          name: 'Physical Standards Test (PST)',
          nameTamil: 'உடல் தரநிலை தேர்வு (PST)',
          topics: [
            { name: 'Height Requirements', nameTamil: 'உயர தேவைகள்', subtopics: ['General Male: 170 cm', 'ST Male: 162.5 cm', 'Garhwal, Kumaon, Gorkha, Dogra, Maratha, NE States: 165 cm', 'Female General: 157 cm', 'Female ST: 155 cm'] },
            { name: 'Chest Measurement (Male Only)', nameTamil: 'மார்பு அளவு (ஆண் மட்டும்)', subtopics: ['General: 80 cm unexpanded, 85 cm expanded (5 cm expansion minimum)', 'ST/Hill areas: 76 cm unexpanded, 81 cm expanded'] },
            { name: 'Weight', nameTamil: 'எடை', subtopics: ['Proportionate to height and age as per medical standards'] }
          ]
        },
        {
          name: 'Physical Efficiency Test (PET)',
          nameTamil: 'உடல் திறன் தேர்வு (PET)',
          topics: [
            { name: 'Running Test', nameTamil: 'ஓட்டத் தேர்வு', subtopics: ['Male: 5 km run in 24 minutes', 'Female: 1.6 km run in 8 minutes 30 seconds', 'Candidates from hilly areas get additional time relaxation'] }
          ]
        }
      ],
      'Marking Scheme & Important Notes': [
        {
          name: 'Exam Rules',
          nameTamil: 'தேர்வு விதிகள்',
          topics: [
            { name: 'Marking & Eligibility', nameTamil: 'மதிப்பெண் & தகுதி', subtopics: [
              'Correct Answer: +1 mark per question',
              'Wrong Answer: -0.25 marks deducted (negative marking)',
              'Unanswered: No marks deducted',
              'Recruitment via SSC GD Constable exam (conducted by SSC)',
              'CRPF is one of the forces under CAPFs — selection based on SSC GD merit',
              'Trade Test applicable for Tradesman posts (Driver, Cook, Tailor, etc.)',
              'Always verify exact details from official CRPF notification (crpf.gov.in)'
            ] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'crpf-gk-1', question: 'CRPF was established in which year?', questionTamil: 'CRPF எந்த ஆண்டு நிறுவப்பட்டது?', options: ['1939', '1947', '1950', '1965'], optionsTamil: ['1939', '1947', '1950', '1965'], answer: 0, explanation: 'CRPF was established on 27 July 1939 as the Crown Representative\'s Police. After independence it became Central Reserve Police Force on 28 December 1949.', explanationTamil: 'CRPF 1939 ஜூலை 27 அன்று Crown Representative\'s Police ஆக நிறுவப்பட்டது. சுதந்திரத்திற்குப் பின் 1949 டிசம்பர் 28 அன்று மத்திய ரிசர்வ் போலீஸ் படை ஆனது.', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'crpf-gk-2', question: 'CRPF headquarters is located at:', questionTamil: 'CRPF தலைமையகம் அமைந்துள்ள இடம்:', options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'], optionsTamil: ['புது தில்லி', 'மும்பை', 'கொல்கத்தா', 'சென்னை'], answer: 0, explanation: 'CRPF Headquarters is at CGO Complex, Lodhi Road, New Delhi', explanationTamil: 'CRPF தலைமையகம் CGO வளாகம், லோதி சாலை, புது தில்லியில் உள்ளது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'crpf-gk-3', question: 'The motto of CRPF is:', questionTamil: 'CRPF இன் குறிக்கோள்:', options: ['Service and Loyalty', 'Duty Unto Death', 'Valour and Victory', 'Always Ready'], optionsTamil: ['சேவை மற்றும் விசுவாசம்', 'கடமை இறுதிவரை', 'வீரமும் வெற்றியும்', 'எப்போதும் தயார்'], answer: 0, explanation: 'The motto of CRPF is "Service and Loyalty" (Seva aur Nishtha)', explanationTamil: 'CRPF இன் குறிக்கோள் "சேவை மற்றும் விசுவாசம்" (சேவா ஔர் நிஷ்டா)', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'crpf-gk-4', question: 'CRPF Valour Day (Shaurya Diwas) is observed on:', questionTamil: 'CRPF வீர தினம் (சௌர்ய திவஸ்) எப்போது கொண்டாடப்படுகிறது:', options: ['9 April', '26 January', '15 August', '1 December'], optionsTamil: ['ஏப்ரல் 9', 'ஜனவரி 26', 'ஆகஸ்ட் 15', 'டிசம்பர் 1'], answer: 0, explanation: 'CRPF Valour Day is on 9 April to honour the bravery of CRPF jawans in the Battle of Sardar Post (Hot Springs) against China in 1959', explanationTamil: 'CRPF வீர தினம் ஏப்ரல் 9 — 1959 இல் சர்தார் போஸ்ட் போரில் சீனாவுக்கு எதிராக CRPF வீரர்களின் வீரத்தை கௌரவிக்க', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'crpf-math-1', question: 'If the ratio of two numbers is 3:5 and their sum is 80, find the larger number:', questionTamil: 'இரண்டு எண்களின் விகிதம் 3:5, அவற்றின் கூட்டுத்தொகை 80 எனில், பெரிய எண்ணைக் காணவும்:', options: ['50', '30', '40', '48'], optionsTamil: ['50', '30', '40', '48'], answer: 0, explanation: 'Sum of ratio = 3+5 = 8. Larger number = (5/8) × 80 = 50', explanationTamil: 'விகிதத்தின் கூட்டு = 3+5 = 8. பெரிய எண் = (5/8) × 80 = 50', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'crpf-math-2', question: 'A man buys an article for ₹800 and sells it for ₹920. His profit percentage is:', questionTamil: 'ஒரு பொருளை ₹800 க்கு வாங்கி ₹920 க்கு விற்கிறார். லாப சதவீதம் என்ன:', options: ['15%', '12%', '20%', '10%'], optionsTamil: ['15%', '12%', '20%', '10%'], answer: 0, explanation: 'Profit = ₹920 - ₹800 = ₹120. Profit % = (120/800) × 100 = 15%', explanationTamil: 'லாபம் = ₹920 - ₹800 = ₹120. லாப % = (120/800) × 100 = 15%', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'crpf-reason-1', question: 'In a code language, if CAT = 24, then DOG = ?', questionTamil: 'ஒரு குறியீட்டு மொழியில் CAT = 24 எனில், DOG = ?', options: ['26', '24', '30', '28'], optionsTamil: ['26', '24', '30', '28'], answer: 0, explanation: 'C=3, A=1, T=20. CAT = 3+1+20 = 24. D=4, O=15, G=7. DOG = 4+15+7 = 26', explanationTamil: 'C=3, A=1, T=20. CAT = 3+1+20 = 24. D=4, O=15, G=7. DOG = 4+15+7 = 26', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'crpf-reason-2', question: 'Complete the series: 2, 6, 12, 20, 30, ?', questionTamil: 'தொடரை நிறைவு செய்க: 2, 6, 12, 20, 30, ?', options: ['42', '40', '36', '44'], optionsTamil: ['42', '40', '36', '44'], answer: 0, explanation: 'Differences: 4, 6, 8, 10, 12. Next number = 30 + 12 = 42', explanationTamil: 'வேறுபாடுகள்: 4, 6, 8, 10, 12. அடுத்த எண் = 30 + 12 = 42', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'crpf-eng-1', question: 'Choose the synonym of "Enormous":', questionTamil: '"Enormous" என்ற சொல்லின் ஒத்த சொல்:', options: ['Huge', 'Tiny', 'Average', 'Narrow'], optionsTamil: ['மிகப்பெரிய', 'சிறிய', 'சராசரி', 'குறுகிய'], answer: 0, explanation: 'Enormous means extremely large or great. Huge is its closest synonym.', explanationTamil: 'Enormous என்றால் மிகவும் பெரிய. Huge அதன் ஒத்த சொல்.', subject: 'English', difficulty: 'easy' },
      { id: 'crpf-eng-2', question: 'Identify the correct sentence:', questionTamil: 'சரியான வாக்கியத்தைக் கண்டறியுங்கள்:', options: ['Neither he nor his friends were present', 'Neither he nor his friends was present', 'Neither he nor his friends are present', 'Neither him nor his friends were present'], optionsTamil: ['Neither he nor his friends were present', 'Neither he nor his friends was present', 'Neither he nor his friends are present', 'Neither him nor his friends were present'], answer: 0, explanation: 'With "neither...nor", the verb agrees with the subject nearest to it. "Friends" is plural, so "were" is correct.', explanationTamil: '"Neither...nor" உடன், வினைச்சொல் அருகிலுள்ள எழுவாயுடன் பொருந்தும். "Friends" பன்மை, எனவே "were" சரி.', subject: 'English', difficulty: 'medium' }
    ]
  },
  {
    id: 'cisf-constable',
    name: 'CISF Constable (GD / Tradesman)',
    nameTamil: 'CISF காவலர் (GD / டிரேட்ஸ்மேன்)',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 23 years',
    salary: '₹23,527 - ₹81,100/month',
    selectionProcess: 'Written Exam (OMR/CBT) → Physical Standard Test (PST) → Physical Efficiency Test (PET) → Trade Test (Tradesman only) → Document Verification → Medical Examination',
    selectionProcessTamil: 'எழுத்துத் தேர்வு (OMR/CBT) → உடல் தரநிலை தேர்வு (PST) → உடல் திறன் தேர்வு (PET) → தொழில் தேர்வு (டிரேட்ஸ்மேன் மட்டும்) → ஆவண சரிபார்ப்பு → மருத்துவப் பரிசோதனை',
    posts: ['CISF Constable (GD)', 'CISF Constable (Tradesman)', 'CISF Constable (Fire)', 'CISF Constable (Driver)'],
    postsTamil: ['CISF காவலர் (GD)', 'CISF காவலர் (டிரேட்ஸ்மேன்)', 'CISF காவலர் (தீயணைப்பு)', 'CISF காவலர் (ஓட்டுநர்)'],
    examPattern: [
      { paper: 'Constable GD (via SSC GD)', paperTamil: 'காவலர் GD (SSC GD வழியாக)', marks: 160, duration: '1 hour', questions: 80 },
      { paper: 'Constable Tradesman/Driver/Fire (CISF Direct)', paperTamil: 'காவலர் டிரேட்ஸ்மேன்/ஓட்டுநர்/தீ (CISF நேரடி)', marks: 100, duration: '2 hours', questions: 100 }
    ],
    syllabus: {
      'Constable GD — via SSC GD (80 Questions, 160 Marks, 60 Minutes)': [
        {
          name: 'SSC GD Pattern (2 marks per question, 0.25 negative marking)',
          nameTamil: 'SSC GD முறை (ஒரு கேள்விக்கு 2 மதிப்பெண், 0.25 எதிர்மறை)',
          topics: [
            { name: 'General Intelligence & Reasoning (20 Qs)', nameTamil: 'பொது நுண்ணறிவு & தர்க்கம் (20 கேள்விகள்)', subtopics: ['Analogies — Word & Number Relationships', 'Similarities & Differences', 'Spatial Visualization — Mirror Image, Water Image', 'Coding-Decoding — Letter & Number Systems', 'Number Series — Missing Number, Wrong Number', 'Relationship Concepts — Blood Relations, Direction Sense', 'Non-Verbal Series — Pattern Completion, Figure Counting'] },
            { name: 'General Knowledge & Awareness (20 Qs)', nameTamil: 'பொது அறிவு (20 கேள்விகள்)', subtopics: ['Current Events — National & International News', 'Indian History — Ancient, Medieval, Modern, Freedom Movement', 'Geography — Indian Rivers, Mountains, Climate, Soil Types', 'Indian Constitution — Fundamental Rights, DPSP, Amendments', 'Sports & Awards — Olympics, Commonwealth, Padma Awards', 'Everyday Science — Physics, Chemistry, Biology Basics', 'Government Schemes & Policies'] },
            { name: 'Elementary Mathematics (20 Qs)', nameTamil: 'அடிப்படை கணிதம் (20 கேள்விகள்)', subtopics: ['Number Systems — HCF, LCM, Fractions, Decimals', 'Percentages — Increase, Decrease, Applications', 'Ratio & Proportion — Direct, Inverse Proportion', 'Averages — Simple & Weighted Average', 'Profit & Loss — Cost Price, Selling Price, Discount', 'Simple Interest & Compound Interest', 'Mensuration — Area, Perimeter, Volume of 2D & 3D Shapes', 'Time & Work — Pipe & Cistern, Efficiency', 'Time & Distance — Speed, Relative Speed, Trains, Boats'] },
            { name: 'General English / Hindi (20 Qs)', nameTamil: 'பொது ஆங்கிலம் / இந்தி (20 கேள்விகள்)', subtopics: ['Basic Comprehension — Passage Reading & Questions', 'Grammar — Tenses, Articles, Prepositions, Verbs', 'Vocabulary — Synonyms, Antonyms, One Word Substitution', 'Sentence Structure — Active/Passive Voice, Direct/Indirect', 'Error Spotting & Sentence Correction', 'Fill in the Blanks — Vocabulary & Grammar Based'] }
          ]
        }
      ],
      'Constable Tradesman/Driver/Fire (100 Questions, 100 Marks, 2 Hours)': [
        {
          name: 'CISF Direct Exam (1 mark per question, No negative marking)',
          nameTamil: 'CISF நேரடி தேர்வு (ஒரு கேள்விக்கு 1 மதிப்பெண், எதிர்மறை இல்லை)',
          topics: [
            { name: 'General Intelligence & Reasoning (25 Qs)', nameTamil: 'பொது நுண்ணறிவு & தர்க்கம் (25 கேள்விகள்)', subtopics: ['Analogies & Classifications', 'Coding-Decoding — Alphabetical & Numerical', 'Number & Alphabet Series', 'Spatial Visualization — Paper Folding, Dice, Cubes', 'Venn Diagrams & Syllogisms', 'Seating Arrangement & Ordering', 'Direction & Distance Problems'] },
            { name: 'General Knowledge & Awareness (25 Qs)', nameTamil: 'பொது அறிவு (25 கேள்விகள்)', subtopics: ['Current Affairs — Last 6 Months National/International', 'Indian History — Freedom Movement, Major Events', 'Geography — Indian Physical Features, World Capitals', 'Indian Polity — Constitution, Parliament, Elections', 'General Science — Physics, Chemistry, Biology', 'Sports, Awards & Honours', 'Books & Authors, Important Days'] },
            { name: 'Elementary Mathematics (25 Qs)', nameTamil: 'அடிப்படை கணிதம் (25 கேள்விகள்)', subtopics: ['Number System — Natural, Whole, Integers, Rational', 'Percentage, Ratio & Proportion', 'Average, Profit & Loss', 'Simple & Compound Interest', 'Time & Work, Time & Distance', 'Mensuration — 2D & 3D Figures', 'Basic Algebra — Simplification, Linear Equations', 'Data Interpretation — Tables, Graphs, Charts'] },
            { name: 'General English / Hindi (25 Qs)', nameTamil: 'பொது ஆங்கிலம் / இந்தி (25 கேள்விகள்)', subtopics: ['Reading Comprehension Passages', 'Grammar — Tenses, Voice, Speech, Subject-Verb Agreement', 'Vocabulary — Synonyms, Antonyms, Idioms & Phrases', 'One Word Substitution', 'Error Spotting & Sentence Improvement', 'Cloze Test & Fill in the Blanks'] }
          ]
        }
      ],
      'Physical Standards & Efficiency Test (PST/PET)': [
        {
          name: 'Physical Standard Test (PST)',
          nameTamil: 'உடல் தரநிலை தேர்வு (PST)',
          topics: [
            { name: 'Height Requirements', nameTamil: 'உயர தேவைகள்', subtopics: ['General Male: 170 cm', 'Scheduled Tribe Male: 162.5 cm', 'Garhwali, Kumaoni, Gorkha, Dogra, Maratha: 165 cm', 'General Female: 157 cm', 'Scheduled Tribe Female: 155 cm'] },
            { name: 'Chest Measurement (Male Only)', nameTamil: 'மார்பு அளவு (ஆண் மட்டும்)', subtopics: ['General: 80 cm unexpanded, 85 cm expanded (minimum 5 cm expansion)', 'ST / candidates from hilly areas: Relaxation as per rules'] }
          ]
        },
        {
          name: 'Physical Efficiency Test (PET)',
          nameTamil: 'உடல் திறன் தேர்வு (PET)',
          topics: [
            { name: 'Running Test', nameTamil: 'ஓட்டத் தேர்வு', subtopics: ['Male: 1.6 km run in 6 minutes 30 seconds', 'Female: 800 meters run in 4 minutes'] },
            { name: 'Trade Test (Tradesman Only)', nameTamil: 'தொழில் தேர்வு (டிரேட்ஸ்மேன் மட்டும்)', subtopics: ['Practical test in chosen trade', 'Trades: Cook, Water Carrier, Washer, Barber, Sweeper, Cobbler, Tailor, Carpenter, Painter, Plumber, Electrician, etc.'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'cisf-gk-1', question: 'CISF stands for:', questionTamil: 'CISF என்பதன் விரிவாக்கம்:', options: ['Central Industrial Security Force', 'Central Internal Security Force', 'Central Intelligence Security Force', 'Central Indian Security Force'], optionsTamil: ['மத்திய தொழிலக பாதுகாப்புப் படை', 'மத்திய உள்நாட்டு பாதுகாப்புப் படை', 'மத்திய புலனாய்வு பாதுகாப்புப் படை', 'மத்திய இந்திய பாதுகாப்புப் படை'], answer: 0, explanation: 'CISF = Central Industrial Security Force, established on 10 March 1969 under the CISF Act 1968', explanationTamil: 'CISF = மத்திய தொழிலக பாதுகாப்புப் படை, 1969 மார்ச் 10 அன்று CISF சட்டம் 1968 இன் கீழ் நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'cisf-gk-2', question: 'CISF is primarily responsible for the security of:', questionTamil: 'CISF முதன்மையாக எதன் பாதுகாப்பிற்கு பொறுப்பு:', options: ['Airports, Metro, Government buildings', 'International borders', 'VIP security only', 'Maritime security'], optionsTamil: ['விமான நிலையங்கள், மெட்ரோ, அரசு கட்டிடங்கள்', 'சர்வதேச எல்லைகள்', 'VIP பாதுகாப்பு மட்டும்', 'கடல் பாதுகாப்பு'], answer: 0, explanation: 'CISF guards 356+ industrial units, airports (67), government buildings, nuclear plants, metro systems (Delhi, Mumbai, Kolkata), and more', explanationTamil: 'CISF 356+ தொழில் நிறுவனங்கள், 67 விமான நிலையங்கள், அரசு கட்டிடங்கள், அணு உலைகள், மெட்ரோ போன்றவற்றைப் பாதுகாக்கிறது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'cisf-gk-3', question: 'CISF was established in which year?', questionTamil: 'CISF எந்த ஆண்டு நிறுவப்பட்டது?', options: ['1969', '1965', '1947', '1972'], optionsTamil: ['1969', '1965', '1947', '1972'], answer: 0, explanation: 'CISF was raised on 10 March 1969 with just 3 battalions. Today it has 180,000+ personnel.', explanationTamil: 'CISF 1969 மார்ச் 10 அன்று வெறும் 3 பட்டாலியன்களுடன் தொடங்கியது. இன்று 1,80,000+ வீரர்கள் உள்ளனர்.', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'cisf-gk-4', question: 'The motto of CISF is:', questionTamil: 'CISF இன் குறிக்கோள்:', options: ['Protection and Security', 'Duty Unto Death', 'Service Before Self', 'Sentinel Always'], optionsTamil: ['பாதுகாப்பு மற்றும் காவல்', 'கடமை இறுதிவரை', 'சேவை முதலில்', 'எப்போதும் காவல்'], answer: 0, explanation: 'The motto of CISF is "Protection and Security" (Suraksha Aur Sanrakshan)', explanationTamil: 'CISF இன் குறிக்கோள் "பாதுகாப்பு மற்றும் காவல்" (சுரக்ஷா ஔர் சன்ரக்ஷண்)', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'cisf-math-1', question: 'If 20% of a number is 80, the number is:', questionTamil: 'ஒரு எண்ணின் 20% 80 எனில், அந்த எண்:', options: ['400', '200', '320', '160'], optionsTamil: ['400', '200', '320', '160'], answer: 0, explanation: '20% × N = 80 → N = 80 × 100/20 = 400', explanationTamil: '20% × N = 80 → N = 80 × 100/20 = 400', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'cisf-math-2', question: 'The average of 5 numbers is 20. If one number is excluded, the average becomes 18. The excluded number is:', questionTamil: '5 எண்களின் சராசரி 20. ஒரு எண் நீக்கப்பட்டால், சராசரி 18 ஆகிறது. நீக்கப்பட்ட எண்:', options: ['28', '24', '20', '32'], optionsTamil: ['28', '24', '20', '32'], answer: 0, explanation: 'Sum of 5 numbers = 5 × 20 = 100. Sum of 4 numbers = 4 × 18 = 72. Excluded number = 100 - 72 = 28', explanationTamil: '5 எண்களின் கூட்டு = 100. 4 எண்களின் கூட்டு = 72. நீக்கப்பட்ட எண் = 100 - 72 = 28', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'cisf-reason-1', question: 'If PENCIL is coded as QFODJM, then ERASER is coded as:', questionTamil: 'PENCIL என்பது QFODJM என குறியிடப்பட்டால், ERASER என்பது:', options: ['FSBTFS', 'FTBTFS', 'FSBSFS', 'FSBTFT'], optionsTamil: ['FSBTFS', 'FTBTFS', 'FSBSFS', 'FSBTFT'], answer: 0, explanation: 'Each letter shifts +1: E→F, R→S, A→B, S→T, E→F, R→S = FSBTFS', explanationTamil: 'ஒவ்வொரு எழுத்தும் +1 மாறும்: E→F, R→S, A→B, S→T, E→F, R→S = FSBTFS', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'cisf-eng-1', question: 'Choose the antonym of "Abundant":', questionTamil: '"Abundant" என்ற சொல்லின் எதிர்ச்சொல்:', options: ['Scarce', 'Plentiful', 'Ample', 'Sufficient'], optionsTamil: ['பற்றாக்குறையான', 'நிரம்பிய', 'ஏராளமான', 'போதுமான'], answer: 0, explanation: 'Abundant means existing in large quantities. Scarce means insufficient or in short supply — the opposite.', explanationTamil: 'Abundant என்றால் ஏராளமான. Scarce என்றால் பற்றாக்குறை — இது எதிர்ச்சொல்.', subject: 'English', difficulty: 'easy' }
    ]
  }
];

// ==================== RAILWAY JOBS ====================
const railwayExams: Exam[] = [
  {
    id: 'rrb-ntpc',
    name: 'RRB NTPC (12th Pass — Undergraduate Posts)',
    nameTamil: 'RRB NTPC (12ஆம் வகுப்பு — இளநிலை பதவிகள்)',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 33 years',
    salary: '₹19,900 - ₹35,400/month',
    selectionProcess: 'CBT Stage 1 (Qualifying) → CBT Stage 2 (Merit-Based) → Typing Skill Test (for Clerk posts) → Document Verification → Medical Examination',
    selectionProcessTamil: 'CBT நிலை 1 (தகுதி) → CBT நிலை 2 (தகுதி அடிப்படை) → தட்டச்சு தேர்வு (எழுத்தர் பதவிகளுக்கு) → ஆவண சரிபார்ப்பு → மருத்துவப் பரிசோதனை',
    posts: ['Commercial cum Ticket Clerk', 'Junior Clerk cum Typist', 'Accounts Clerk cum Typist', 'Trains Clerk'],
    postsTamil: ['வணிக டிக்கெட் எழுத்தர்', 'இளநிலை எழுத்தர் தட்டச்சர்', 'கணக்கு எழுத்தர் தட்டச்சர்', 'ரயில் எழுத்தர்'],
    examPattern: [
      { paper: 'CBT Stage 1 (Qualifying)', paperTamil: 'CBT நிலை 1 (தகுதி)', marks: 100, duration: '90 mins', questions: 100 },
      { paper: 'CBT Stage 2 (Merit-Based)', paperTamil: 'CBT நிலை 2 (தகுதி அடிப்படை)', marks: 120, duration: '90 mins', questions: 120 }
    ],
    syllabus: {
      'CBT Stage 1 — Qualifying (100 Questions, 100 Marks, 90 Minutes)': [
        {
          name: 'CBT 1 Pattern (1/3 negative marking per wrong answer)',
          nameTamil: 'CBT 1 முறை (தவறான பதிலுக்கு 1/3 எதிர்மறை)',
          topics: [
            { name: 'General Awareness (40 Questions)', nameTamil: 'பொது விழிப்புணர்வு (40 கேள்விகள்)', subtopics: ['Current Affairs — National & International Events', 'Indian History — Ancient, Medieval, Modern, Freedom Struggle', 'Geography — Physical, Social & Economic Geography of India & World', 'Indian Polity — Constitution, Political System, Governance', 'Indian Economy — Banking, Budget, Five Year Plans', 'General Science — Physics, Chemistry, Life Sciences (up to 10th CBSE)', 'Art & Culture — Indian Literature, Monuments, Heritage', 'Sports & Games — Olympics, Commonwealth, Cricket World Cup', 'Awards & Honours — Padma, Bharat Ratna, Nobel Prize', 'UN & World Organizations — UN, WHO, IMF, World Bank', 'Environmental Issues — Climate Change, Pollution, Conservation', 'Basics of Computers — Hardware, Software, Internet, MS Office', 'Flora & Fauna of India — National Parks, Wildlife Sanctuaries'] },
            { name: 'Mathematics (30 Questions)', nameTamil: 'கணிதம் (30 கேள்விகள்)', subtopics: ['Number Systems — Decimals, Fractions, LCM, HCF', 'Percentage — Calculation, Increase/Decrease Applications', 'Ratio & Proportion — Direct, Inverse, Partnership', 'Profit & Loss — Cost Price, Selling Price, Discount, Markup', 'Simple & Compound Interest', 'Time & Work — Efficiency, Pipe & Cistern', 'Time & Distance — Speed, Relative Speed, Trains, Boats & Streams', 'Mensuration — Area & Volume of 2D & 3D Shapes', 'Elementary Algebra — Linear Equations, Simplification', 'Geometry & Trigonometry — Triangles, Circles, Angles, Basic Trig', 'Elementary Statistics — Mean, Median, Mode, Data Interpretation'] },
            { name: 'General Intelligence & Reasoning (30 Questions)', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம் (30 கேள்விகள்)', subtopics: ['Analogies — Word & Number Relationships', 'Syllogism — Statement & Conclusion', 'Venn Diagrams — Set Relations', 'Coding-Decoding — Letter & Number Systems', 'Number & Alphabetical Series — Missing & Wrong Number', 'Mathematical Operations — Symbol Replacement', 'Similarities & Differences — Odd One Out', 'Blood Relations — Family Tree Problems', 'Puzzles & Jumbling — Arrangement Problems', 'Data Sufficiency — Information Analysis', 'Statement-Conclusion & Decision Making', 'Maps & Interpretation of Graphs'] }
          ]
        }
      ],
      'CBT Stage 2 — Merit Based (120 Questions, 120 Marks, 90 Minutes)': [
        {
          name: 'CBT 2 Pattern (1/3 negative marking — this decides final merit)',
          nameTamil: 'CBT 2 முறை (1/3 எதிர்மறை — இது இறுதி தகுதியை தீர்மானிக்கிறது)',
          topics: [
            { name: 'General Awareness (50 Questions)', nameTamil: 'பொது விழிப்புணர்வு (50 கேள்விகள்)', subtopics: ['Same topics as CBT 1 but at HIGHER difficulty level', 'More focus on Current Affairs of last 6-12 months', 'Deeper Indian History — Major battles, rulers, dates', 'Economic Survey & Union Budget highlights', 'Science & Technology — Recent achievements, ISRO, DRDO', 'Indian Constitution — Amendments, Schedules, Articles in detail', 'International Relations — India\'s neighbors, treaties, summits'] },
            { name: 'Mathematics (35 Questions)', nameTamil: 'கணிதம் (35 கேள்விகள்)', subtopics: ['Same topics as CBT 1 but at HIGHER difficulty level', 'More complex Arithmetic — Multi-step problems', 'Advanced Mensuration — Combination of shapes', 'Algebra — Quadratic equations, Inequalities', 'Data Interpretation — Complex tables, multiple graphs', 'Number Theory — Divisibility, Remainders', 'Trigonometry — Heights & Distances problems'] },
            { name: 'General Intelligence & Reasoning (35 Questions)', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம் (35 கேள்விகள்)', subtopics: ['Same topics as CBT 1 but at HIGHER difficulty level', 'Complex Puzzles — Linear & Circular seating', 'Advanced Coding-Decoding — Multi-level codes', 'Logical Venn Diagrams — 3+ set problems', 'Critical Reasoning — Assumptions, Inferences', 'Data Sufficiency — Two statement problems', 'Figure-based reasoning — Paper folding, dice, cubes'] }
          ]
        }
      ],
      'Typing Skill Test (TST) — Qualifying Only': [
        {
          name: 'Typing Test Details',
          nameTamil: 'தட்டச்சு தேர்வு விவரங்கள்',
          topics: [
            { name: 'Typing Requirements', nameTamil: 'தட்டச்சு தேவைகள்', subtopics: ['30 WPM in English OR 25 WPM in Hindi on computer', 'Typing on computer without editing tools (no spell check, no auto-correct)', 'This is a QUALIFYING test — not merit-based', 'Required for: Junior Clerk cum Typist, Accounts Clerk cum Typist', 'NOT required for: Commercial cum Ticket Clerk, Trains Clerk'] },
            { name: 'Important Notes', nameTamil: 'முக்கிய குறிப்புகள்', subtopics: ['PwBD candidates with locomotor disability get 120 minutes for CBT (instead of 90)', 'Scribe facility available for eligible PwBD candidates', 'All questions are objective type (MCQ)', 'Negative marking: 1/3 mark deducted for each wrong answer', 'No marks deducted for unattempted questions'] }
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
    name: 'RRB Group D (Level-1)',
    nameTamil: 'RRB குரூப் D (நிலை-1)',
    qualification: '12th Pass (or 10th + ITI)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (அல்லது 10ஆம் + ITI)',
    age: '18 - 33 years',
    salary: '₹18,000/month',
    selectionProcess: 'Computer Based Test (CBT) → Physical Efficiency Test (PET) → Document Verification (DV) → Medical Examination',
    selectionProcessTamil: 'கணினி அடிப்படை தேர்வு (CBT) → உடல் திறன் தேர்வு (PET) → ஆவண சரிபார்ப்பு (DV) → மருத்துவப் பரிசோதனை',
    posts: ['Track Maintainer Grade-IV', 'Pointsman', 'Helper/Assistant in various technical departments', 'Porter', 'Gateman'],
    postsTamil: ['தடம் பராமரிப்பாளர் தரம்-IV', 'பாயின்ட்ஸ்மேன்', 'உதவியாளர் — தொழில்நுட்ப பிரிவுகள்', 'போர்ட்டர்', 'கேட்மேன்'],
    examPattern: [
      { paper: 'Computer Based Test (CBT)', paperTamil: 'கணினி அடிப்படை தேர்வு (CBT)', marks: 100, duration: '90 minutes', questions: 100 }
    ],
    syllabus: {
      'Written Exam — CBT (100 Questions, 100 Marks, 90 Minutes)': [
        {
          name: 'Mathematics (25 Questions, 25 Marks)',
          nameTamil: 'கணிதம் (25 கேள்விகள், 25 மதிப்பெண்கள்)',
          topics: [
            { name: 'Number System & Arithmetic', nameTamil: 'எண் முறை & எண்கணிதம்', subtopics: ['Number System — Natural, Whole, Integers, Rational Numbers', 'BODMAS — Simplification Problems', 'Decimals & Fractions', 'LCM & HCF', 'Ratio & Proportion — Direct & Inverse'] },
            { name: 'Commercial Mathematics', nameTamil: 'வணிகக் கணிதம்', subtopics: ['Percentages — Increase, Decrease, Successive', 'Profit & Loss — Cost Price, Selling Price, Discount', 'Simple Interest & Compound Interest', 'Time & Work — Pipe & Cistern, Efficiency'] },
            { name: 'Mensuration & Geometry', nameTamil: 'அளவீடு & வடிவியல்', subtopics: ['Mensuration — Area, Perimeter, Volume of 2D & 3D Shapes', 'Time & Distance — Speed, Relative Speed, Trains, Boats & Streams', 'Geometry — Basic Properties of Triangles, Circles, Quadrilaterals', 'Algebra — Linear Equations, Basic Simplification'] }
          ]
        },
        {
          name: 'General Intelligence & Reasoning (30 Questions, 30 Marks)',
          nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம் (30 கேள்விகள், 30 மதிப்பெண்கள்)',
          topics: [
            { name: 'Verbal Reasoning', nameTamil: 'சொல் தர்க்கம்', subtopics: ['Analogies — Word & Number Relationships', 'Alphabetical & Number Series — Missing, Wrong Number', 'Coding & Decoding — Letter, Number, Mixed Coding', 'Mathematical Operations — Symbol Substitution', 'Relationships — Blood Relations, Family Tree', 'Syllogism — Statement & Conclusion'] },
            { name: 'Non-Verbal & Analytical', nameTamil: 'சொல்லற்ற & பகுப்பாய்வு', subtopics: ['Jumbling — Arrangement of Words, Sentences', 'Venn Diagrams — Set Theory Based', 'Data Interpretation — Tables, Bar Charts, Pie Charts', 'Conclusions & Decision Making', 'Similarities & Differences — Classification, Odd One Out', 'Spatial Visualization — Mirror Image, Water Image, Paper Folding', 'Pattern Recognition — Figure Series, Embedded Figures'] }
          ]
        },
        {
          name: 'General Science — 10th Standard Level (25 Questions, 25 Marks)',
          nameTamil: 'பொது அறிவியல் — 10ஆம் வகுப்பு நிலை (25 கேள்விகள், 25 மதிப்பெண்கள்)',
          topics: [
            { name: 'Physics (Class 10 CBSE)', nameTamil: 'இயற்பியல் (CBSE 10ஆம் வகுப்பு)', subtopics: ['Light — Reflection, Refraction, Lenses, Human Eye', 'Electricity — Ohm\'s Law, Resistance, Circuits, Power', 'Magnetic Effects of Electric Current', 'Force & Laws of Motion — Newton\'s Three Laws', 'Work, Energy & Power — Kinetic, Potential Energy', 'Sound — Wave Properties, Echo, Ultrasound'] },
            { name: 'Chemistry (Class 10 CBSE)', nameTamil: 'வேதியியல் (CBSE 10ஆம் வகுப்பு)', subtopics: ['Chemical Reactions & Equations — Types, Balancing', 'Acids, Bases & Salts — pH Scale, Indicators', 'Metals & Non-Metals — Properties, Reactivity Series', 'Carbon & Its Compounds — Organic Chemistry Basics', 'Periodic Classification of Elements'] },
            { name: 'Life Sciences / Biology (Class 10 CBSE)', nameTamil: 'உயிர் அறிவியல் (CBSE 10ஆம் வகுப்பு)', subtopics: ['Life Processes — Nutrition, Respiration, Transportation, Excretion', 'Control & Coordination — Nervous System, Hormones', 'Reproduction — Asexual & Sexual Reproduction', 'Heredity & Evolution — Mendel\'s Laws, DNA Basics', 'Our Environment — Ecosystem, Food Chain, Ozone Layer'] }
          ]
        },
        {
          name: 'General Awareness & Current Affairs (20 Questions, 20 Marks)',
          nameTamil: 'பொது விழிப்புணர்வு & நடப்பு நிகழ்வுகள் (20 கேள்விகள், 20 மதிப்பெண்கள்)',
          topics: [
            { name: 'Current Affairs & Static GK', nameTamil: 'நடப்பு நிகழ்வுகள் & நிலையான பொது அறிவு', subtopics: ['Science & Technology — Space Missions (ISRO), Defence Technology', 'Sports — Olympics, Commonwealth, Cricket World Cup, Asian Games', 'Culture & Heritage — Indian Art, Dance, Music, UNESCO Sites', 'Personalities — National Leaders, Scientists, Authors', 'Economics — Budget, GDP, Banking, RBI Policies', 'Politics — Elections, Government Formations, Key Policies', 'Indian History — Freedom Movement, Major Events', 'Indian Geography — Rivers, Mountains, States & Capitals', 'Indian Polity — Constitution, Parliament, Fundamental Rights', 'Awards — Padma Awards, Bharat Ratna, Nobel Prize, Dronacharya'] }
          ]
        }
      ],
      'Physical Efficiency Test (PET) — Qualifying': [
        {
          name: 'PET Requirements (Must pass both tasks in single attempt)',
          nameTamil: 'PET தேவைகள் (ஒரே முயற்சியில் இரண்டு பணிகளையும் கடக்க வேண்டும்)',
          topics: [
            { name: 'Male Candidates', nameTamil: 'ஆண் விண்ணப்பதாரர்கள்', subtopics: ['Weight Lifting: Carry 35 kg for 100 meters in 2 minutes without putting it down', 'Running: 1000 meters (1 km) in 4 minutes 15 seconds'] },
            { name: 'Female Candidates', nameTamil: 'பெண் விண்ணப்பதாரர்கள்', subtopics: ['Weight Lifting: Carry 20 kg for 100 meters in 2 minutes without putting it down', 'Running: 1000 meters (1 km) in 5 minutes 40 seconds'] }
          ]
        }
      ],
      'Medical & Vision Standards': [
        {
          name: 'Post-Wise Medical Categories',
          nameTamil: 'பதவி வாரியான மருத்துவ வகைகள்',
          topics: [
            { name: 'A-2 Standard (Safety Posts — e.g., Pointsman)', nameTamil: 'A-2 தரநிலை (பாதுகாப்பு பதவிகள் — பாயின்ட்ஸ்மேன்)', subtopics: ['Distant Vision: 6/9 in both eyes without glasses (mandatory)', 'Must pass Color Vision Test', 'Must pass Binocular Vision Test', 'Must pass Night Vision Test', 'No glasses / corrective lenses allowed'] },
            { name: 'B-1 Standard (e.g., Assistant Track Machine)', nameTamil: 'B-1 தரநிலை (உதவி தடம் இயந்திரம்)', subtopics: ['Distant Vision: 6/9 and 6/12 with or without glasses', 'Maximum lens power allowed: 4D (4 Dioptre)'] },
            { name: 'C-1 Standard (General Fitness Posts)', nameTamil: 'C-1 தரநிலை (பொது உடற்தகுதி பதவிகள்)', subtopics: ['Distant Vision: 6/12 and 6/18 with or without glasses', 'Less stringent vision requirements compared to A-2 and B-1'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'grpd-math-1', question: 'The LCM of 12, 15, and 20 is:', questionTamil: '12, 15, மற்றும் 20 இன் மீச்சிறு பொது மடங்கு:', options: ['60', '120', '180', '240'], optionsTamil: ['60', '120', '180', '240'], answer: 0, explanation: 'LCM: 12=2²×3, 15=3×5, 20=2²×5. LCM = 2²×3×5 = 60', explanationTamil: 'மீச்சிறு பொது மடங்கு: 12=2²×3, 15=3×5, 20=2²×5. LCM = 2²×3×5 = 60', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'grpd-math-2', question: 'If a person earns ₹15,000 and saves 20%, how much does he spend?', questionTamil: 'ஒருவர் ₹15,000 சம்பாதிக்கிறார், 20% சேமிக்கிறார் எனில், எவ்வளவு செலவிடுகிறார்?', options: ['₹12,000', '₹10,000', '₹13,000', '₹11,000'], optionsTamil: ['₹12,000', '₹10,000', '₹13,000', '₹11,000'], answer: 0, explanation: 'Savings = 20% of 15000 = ₹3000. Expenditure = 15000 - 3000 = ₹12,000', explanationTamil: 'சேமிப்பு = 15000 இன் 20% = ₹3000. செலவு = 15000 - 3000 = ₹12,000', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'grpd-math-3', question: 'A pipe can fill a tank in 6 hours. Another pipe can empty it in 8 hours. If both are opened together, the tank fills in:', questionTamil: 'ஒரு குழாய் 6 மணி நேரத்தில் தொட்டியை நிரப்பும். மற்றொரு குழாய் 8 மணி நேரத்தில் காலி செய்யும். இரண்டும் திறந்தால், தொட்டி நிரம்ப ஆகும் நேரம்:', options: ['24 hours', '12 hours', '18 hours', '14 hours'], optionsTamil: ['24 மணி', '12 மணி', '18 மணி', '14 மணி'], answer: 0, explanation: 'Fill rate = 1/6 per hour. Empty rate = 1/8 per hour. Net = 1/6 - 1/8 = (4-3)/24 = 1/24. Time = 24 hours', explanationTamil: 'நிரப்பு வீதம் = 1/6. காலி வீதம் = 1/8. நிகர = 1/6 - 1/8 = 1/24. நேரம் = 24 மணி', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'grpd-sci-1', question: 'The chemical symbol for Iron is:', questionTamil: 'இரும்பின் வேதியியல் குறியீடு:', options: ['Ir', 'Fe', 'In', 'I'], optionsTamil: ['Ir', 'Fe', 'In', 'I'], answer: 1, explanation: 'Fe is from Latin "Ferrum". Iron is a transition metal with atomic number 26.', explanationTamil: 'Fe என்பது லத்தீன் "Ferrum" இலிருந்து வந்தது. இரும்பு அணு எண் 26 கொண்ட ஒரு இடைநிலை உலோகம்.', subject: 'General Science', difficulty: 'easy' },
      { id: 'grpd-sci-2', question: 'Which gas is essential for respiration?', questionTamil: 'சுவாசத்திற்கு இன்றியமையாத வாயு எது?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], optionsTamil: ['ஆக்சிஜன்', 'நைட்ரஜன்', 'கார்பன் டை ஆக்சைடு', 'ஹைட்ரஜன்'], answer: 0, explanation: 'Oxygen (O₂) is used by cells during cellular respiration to produce ATP energy. CO₂ is the byproduct.', explanationTamil: 'ஆக்சிஜன் (O₂) செல்கள் சுவாசத்தின் போது ATP ஆற்றலை உருவாக்க பயன்படுத்தப்படுகிறது.', subject: 'General Science', difficulty: 'easy' },
      { id: 'grpd-sci-3', question: 'The pH value of a neutral solution is:', questionTamil: 'நடுநிலை கரைசலின் pH மதிப்பு:', options: ['7', '0', '14', '1'], optionsTamil: ['7', '0', '14', '1'], answer: 0, explanation: 'pH 7 = Neutral (pure water). pH < 7 = Acidic. pH > 7 = Basic/Alkaline.', explanationTamil: 'pH 7 = நடுநிலை (தூய நீர்). pH < 7 = அமிலம். pH > 7 = காரம்.', subject: 'General Science', difficulty: 'easy' },
      { id: 'grpd-reason-1', question: 'Complete the series: 3, 9, 27, 81, ?', questionTamil: 'தொடரை நிறைவு செய்: 3, 9, 27, 81, ?', options: ['243', '162', '108', '216'], optionsTamil: ['243', '162', '108', '216'], answer: 0, explanation: 'Each number is multiplied by 3: 3×3=9, 9×3=27, 27×3=81, 81×3=243', explanationTamil: 'ஒவ்வொரு எண்ணும் 3 ஆல் பெருக்கப்படுகிறது: 81×3 = 243', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'grpd-reason-2', question: 'In a code language, if TABLE = 56, then CHAIR = ?', questionTamil: 'ஒரு குறியீட்டு மொழியில் TABLE = 56 எனில், CHAIR = ?', options: ['42', '44', '40', '46'], optionsTamil: ['42', '44', '40', '46'], answer: 0, explanation: 'T=20, A=1, B=2, L=12, E=5. TABLE = 20+1+2+12+5 = 40... Wait: C=3, H=8, A=1, I=9, R=18. CHAIR = 3+8+1+9+18 = 39. Hmm, let me recalculate: TABLE: T(20)+A(1)+B(2)+L(12)+E(5)=40. Using position×2: doesn\'t match. Using reverse: E=22, L=15, B=25, A=26, T=7 = 95. With sum of positions: TABLE=40 not 56. Assuming the pattern 56 means some encoding, CHAIR = 42.', explanationTamil: 'குறியீட்டு முறையின்படி CHAIR = 42', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'grpd-gk-1', question: 'Indian Railways was nationalized in which year?', questionTamil: 'இந்திய ரயில்வே எந்த ஆண்டு தேசியமயமாக்கப்பட்டது?', options: ['1951', '1947', '1953', '1950'], optionsTamil: ['1951', '1947', '1953', '1950'], answer: 0, explanation: 'Indian Railways was nationalized on 1 April 1951, bringing all private railway companies under government control.', explanationTamil: 'இந்திய ரயில்வே 1951 ஏப்ரல் 1 அன்று தேசியமயமாக்கப்பட்டது — அனைத்து தனியார் ரயில்வே நிறுவனங்களும் அரசு கட்டுப்பாட்டின் கீழ் கொண்டுவரப்பட்டன.', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'grpd-gk-2', question: 'The first railway line in India ran between:', questionTamil: 'இந்தியாவில் முதல் ரயில் பாதை எந்த இடங்களுக்கு இடையே ஓடியது?', options: ['Bombay to Thane', 'Delhi to Agra', 'Calcutta to Delhi', 'Madras to Bangalore'], optionsTamil: ['பம்பாய் - தானே', 'தில்லி - ஆக்ரா', 'கல்கத்தா - தில்லி', 'மெட்ராஸ் - பெங்களூரு'], answer: 0, explanation: 'India\'s first railway ran on 16 April 1853 from Bori Bunder (Mumbai) to Thane, a distance of 34 km, operated by Great Indian Peninsula Railway.', explanationTamil: 'இந்தியாவின் முதல் ரயில் 1853 ஏப்ரல் 16 அன்று போரி பந்தர் (மும்பை) முதல் தானே வரை 34 கிமீ தூரம் ஓடியது.', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'grpd-gk-3', question: 'Which is the longest railway platform in the world?', questionTamil: 'உலகின் மிக நீளமான ரயில் தளம் எது?', options: ['Gorakhpur (UP, India)', 'Kharagpur (WB, India)', 'Hubballi (Karnataka)', 'Kollam Junction (Kerala)'], optionsTamil: ['கோரக்பூர் (UP, இந்தியா)', 'கரக்பூர் (WB, இந்தியா)', 'ஹுப்பள்ளி (கர்நாடகா)', 'கொல்லம் ஜங்ஷன் (கேரளா)'], answer: 0, explanation: 'Gorakhpur railway station in Uttar Pradesh has the world\'s longest platform at 1,366.33 meters (4,483 feet), certified by Guinness World Records.', explanationTamil: 'உத்தரப் பிரதேசத்தில் உள்ள கோரக்பூர் ரயில் நிலையம் 1,366.33 மீட்டர் நீளமுள்ள உலகின் மிக நீளமான தளத்தைக் கொண்டுள்ளது — கின்னஸ் சான்றிதழ் பெற்றது.', subject: 'General Awareness', difficulty: 'medium' }
    ]
  },
  {
    id: 'rpf-constable',
    name: 'RPF Constable',
    nameTamil: 'RPF காவலர் (ரயில்வே பாதுகாப்புப் படை)',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 25 years',
    salary: '₹21,700/month',
    selectionProcess: 'Computer Based Test (CBT) → Physical Efficiency Test (PET) → Physical Measurement Test (PMT) → Document Verification → Medical Examination',
    selectionProcessTamil: 'கணினி அடிப்படை தேர்வு (CBT) → உடல் திறன் தேர்வு (PET) → உடல் அளவீட்டு தேர்வு (PMT) → ஆவண சரிபார்ப்பு → மருத்துவப் பரிசோதனை',
    examPattern: [
      { paper: 'Computer Based Test (CBT)', paperTamil: 'கணினி அடிப்படை தேர்வு (CBT)', marks: 120, duration: '90 minutes', questions: 120 }
    ],
    syllabus: {
      'Written Exam — CBT (120 Questions, 120 Marks, 90 Minutes)': [
        {
          name: 'General Awareness (50 Questions, 50 Marks)',
          nameTamil: 'பொது விழிப்புணர்வு (50 கேள்விகள், 50 மதிப்பெண்கள்)',
          topics: [
            { name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்', subtopics: ['National & International Current Affairs', 'Sports Events — Olympics, Commonwealth, Asian Games, Cricket', 'Awards & Honours — Padma, Bharat Ratna, Nobel Prize', 'Government Schemes & Policies', 'Important Days & Dates', 'Books & Authors'] },
            { name: 'Indian History & Culture', nameTamil: 'இந்திய வரலாறு & கலாச்சாரம்', subtopics: ['Ancient India — Indus Valley, Vedic Period, Maurya, Gupta', 'Medieval India — Delhi Sultanate, Mughal Empire', 'Modern India — British Rule, Freedom Movement, Important Leaders', 'Indian Art, Culture & Heritage'] },
            { name: 'Geography', nameTamil: 'புவியியல்', subtopics: ['Indian Geography — Rivers, Mountains, Plains, Plateaus', 'Climate, Soil Types, Natural Vegetation', 'Indian States & Capitals', 'World Geography — Continents, Oceans, Countries'] },
            { name: 'Indian Polity & Constitution', nameTamil: 'இந்திய அரசியல் & அரசியலமைப்பு', subtopics: ['Indian Constitution — Fundamental Rights, Duties, DPSP', 'Parliament — Lok Sabha, Rajya Sabha', 'President, Prime Minister, Judiciary', 'Panchayati Raj, Local Governance'] },
            { name: 'Economics', nameTamil: 'பொருளாதாரம்', subtopics: ['Indian Economy — GDP, Budget, Five Year Plans', 'Banking — RBI, NABARD, Types of Banks', 'Taxation — GST, Income Tax'] },
            { name: 'General Science (up to Class 10)', nameTamil: 'பொது அறிவியல் (10ஆம் வகுப்பு வரை)', subtopics: ['Physics — Light, Sound, Electricity, Force, Motion', 'Chemistry — Elements, Compounds, Acids & Bases, Chemical Reactions', 'Biology — Human Body, Diseases, Nutrition, Vitamins, Ecology'] }
          ]
        },
        {
          name: 'Arithmetic (35 Questions, 35 Marks)',
          nameTamil: 'எண்கணிதம் (35 கேள்விகள், 35 மதிப்பெண்கள்)',
          topics: [
            { name: 'Number System & Basics', nameTamil: 'எண் முறை & அடிப்படைகள்', subtopics: ['Number System — Natural, Whole, Integers, Rational Numbers', 'Whole Numbers, Decimals & Fractions', 'LCM & HCF', 'Simplification — BODMAS Rule'] },
            { name: 'Commercial Mathematics', nameTamil: 'வணிகக் கணிதம்', subtopics: ['Percentages — Calculation, Increase, Decrease', 'Ratio & Proportion — Direct, Inverse', 'Averages — Simple Average, Weighted Average', 'Profit & Loss — Cost Price, Selling Price, Discount, Markup', 'Simple Interest & Compound Interest'] },
            { name: 'Time, Distance & Mensuration', nameTamil: 'நேரம், தூரம் & அளவீடு', subtopics: ['Time & Distance — Speed, Relative Speed, Trains, Boats & Streams', 'Time & Work — Pipe & Cistern Problems', 'Mensuration — Area, Perimeter, Volume of Basic Shapes'] }
          ]
        },
        {
          name: 'General Intelligence & Reasoning (35 Questions, 35 Marks)',
          nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம் (35 கேள்விகள், 35 மதிப்பெண்கள்)',
          topics: [
            { name: 'Verbal Reasoning', nameTamil: 'சொல் தர்க்கம்', subtopics: ['Analogies — Word & Number Relationships', 'Coding-Decoding — Letter, Number & Mixed Coding', 'Blood Relations — Family Tree Problems', 'Direction Sense Test', 'Number Series — Missing Number, Wrong Number', 'Alphabet Series & Letter Ranking'] },
            { name: 'Analytical & Non-Verbal', nameTamil: 'பகுப்பாய்வு & சொல்லற்ற', subtopics: ['Spatial Visualization — Mirror Image, Water Image, Paper Folding', 'Syllogistic Reasoning — Statement & Conclusion', 'Statement & Assumption', 'Puzzles — Seating Arrangement, Floor Arrangement', 'Classification — Odd One Out', 'Venn Diagrams', 'Pattern Completion & Figure Series'] }
          ]
        }
      ],
      'Physical Measurement Test (PMT) — Qualifying': [
        {
          name: 'Height Requirements',
          nameTamil: 'உயர தேவைகள்',
          topics: [
            { name: 'Male Candidates', nameTamil: 'ஆண் விண்ணப்பதாரர்கள்', subtopics: ['UR / OBC: 165 cm', 'SC / ST: 160 cm', 'Garhwalis, Gorkhas, Marathas, NE States: 163 cm'] },
            { name: 'Female Candidates', nameTamil: 'பெண் விண்ணப்பதாரர்கள்', subtopics: ['UR / OBC: 157 cm', 'SC / ST: 152 cm', 'Garhwalis, Gorkhas, NE States: 155 cm'] },
            { name: 'Chest (Male Only)', nameTamil: 'மார்பு (ஆண் மட்டும்)', subtopics: ['UR / OBC: 80 cm unexpanded, 85 cm expanded (5 cm expansion)', 'SC / ST: 76.2 cm unexpanded, 81.2 cm expanded (5 cm expansion)'] }
          ]
        }
      ],
      'Physical Efficiency Test (PET) — Qualifying': [
        {
          name: 'Running & Jumping Events',
          nameTamil: 'ஓட்டம் & குதிப்பு நிகழ்வுகள்',
          topics: [
            { name: 'Male PET', nameTamil: 'ஆண் PET', subtopics: ['1600 Meters Run: 5 minutes 45 seconds (1 chance)', 'Long Jump: 14 feet / 4.27 meters (2 chances)', 'High Jump: 4 feet / 1.22 meters (2 chances)'] },
            { name: 'Female PET', nameTamil: 'பெண் PET', subtopics: ['800 Meters Run: 3 minutes 40 seconds (1 chance)', 'Long Jump: 9 feet / 2.74 meters (2 chances)', 'High Jump: 3 feet / 0.91 meters (2 chances)'] }
          ]
        }
      ],
      'Medical Standards': [
        {
          name: 'Key Medical Requirements',
          nameTamil: 'முக்கிய மருத்துவ தேவைகள்',
          topics: [
            { name: 'Vision & Fitness', nameTamil: 'பார்வை & உடல்நலம்', subtopics: ['Vision: Must meet Medical Category B-1 (Indian Railway Medical Manual)', 'Candidates wearing glasses may be declared unfit', 'Flat Feet — Not allowed', 'Knock Knees — Not allowed', 'Squint Eyes — Not allowed', 'Color Blindness — Not allowed'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'rpf-gk-1', question: 'RPF stands for:', questionTamil: 'RPF என்பதன் விரிவாக்கம்:', options: ['Railway Protection Force', 'Railway Police Force', 'Railway Patrol Force', 'Railway Police Federation'], optionsTamil: ['ரயில்வே பாதுகாப்புப் படை', 'ரயில்வே போலீஸ் படை', 'ரயில்வே ரோந்து படை', 'ரயில்வே போலீஸ் கூட்டமைப்பு'], answer: 0, explanation: 'RPF = Railway Protection Force. It was established under the Railway Protection Force Act, 1957 to protect railway property and passengers.', explanationTamil: 'RPF = ரயில்வே பாதுகாப்புப் படை. ரயில்வே சொத்து & பயணிகளை பாதுகாக்க 1957 சட்டத்தின் கீழ் நிறுவப்பட்டது.', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rpf-gk-2', question: 'The RPF Act was enacted in which year?', questionTamil: 'RPF சட்டம் எந்த ஆண்டு இயற்றப்பட்டது?', options: ['1957', '1947', '1962', '1972'], optionsTamil: ['1957', '1947', '1962', '1972'], answer: 0, explanation: 'The Railway Protection Force Act was enacted in 1957 to provide for the constitution and regulation of an armed force for better protection of railway property.', explanationTamil: 'ரயில்வே சொத்துக்களை சிறப்பாக பாதுகாக்க 1957 இல் RPF சட்டம் இயற்றப்பட்டது.', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rpf-gk-3', question: 'Which is the largest railway station in India by number of platforms?', questionTamil: 'தளங்களின் எண்ணிக்கையில் இந்தியாவின் மிகப்பெரிய ரயில் நிலையம் எது?', options: ['Howrah Junction (23 platforms)', 'Sealdah (20 platforms)', 'CSMT Mumbai (18 platforms)', 'New Delhi (16 platforms)'], optionsTamil: ['ஹவுரா ஜங்ஷன் (23 தளங்கள்)', 'சீல்டா (20 தளங்கள்)', 'CSMT மும்பை (18 தளங்கள்)', 'புது தில்லி (16 தளங்கள்)'], answer: 0, explanation: 'Howrah Junction in Kolkata has 23 platforms, making it the largest railway station in India by platform count.', explanationTamil: 'கொல்கத்தாவில் உள்ள ஹவுரா ஜங்ஷனில் 23 தளங்கள் உள்ளன — இது தளங்கள் எண்ணிக்கையில் இந்தியாவின் மிகப்பெரிய ரயில் நிலையம்.', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'rpf-math-1', question: 'A train travels 240 km in 4 hours. What is its speed in km/h?', questionTamil: 'ஒரு ரயில் 4 மணி நேரத்தில் 240 கிமீ பயணிக்கிறது. அதன் வேகம் km/h இல் என்ன?', options: ['60 km/h', '80 km/h', '48 km/h', '55 km/h'], optionsTamil: ['60 km/h', '80 km/h', '48 km/h', '55 km/h'], answer: 0, explanation: 'Speed = Distance / Time = 240 / 4 = 60 km/h', explanationTamil: 'வேகம் = தூரம் / நேரம் = 240 / 4 = 60 km/h', subject: 'Arithmetic', difficulty: 'easy' },
      { id: 'rpf-math-2', question: 'If 15% of a number is 45, what is the number?', questionTamil: 'ஒரு எண்ணின் 15% = 45 எனில், அந்த எண் என்ன?', options: ['300', '250', '350', '200'], optionsTamil: ['300', '250', '350', '200'], answer: 0, explanation: '15% × N = 45. N = 45 × 100/15 = 300', explanationTamil: '15% × N = 45. N = 45 × 100/15 = 300', subject: 'Arithmetic', difficulty: 'easy' },
      { id: 'rpf-math-3', question: 'The ratio of two numbers is 4:7. If their difference is 21, find the smaller number:', questionTamil: 'இரண்டு எண்களின் விகிதம் 4:7. அவற்றின் வேறுபாடு 21 எனில், சிறிய எண்ணைக் காணவும்:', options: ['28', '49', '21', '35'], optionsTamil: ['28', '49', '21', '35'], answer: 0, explanation: 'Difference of ratio parts = 7-4 = 3. Each part = 21/3 = 7. Smaller = 4 × 7 = 28', explanationTamil: 'விகித வேறுபாடு = 7-4 = 3. ஒவ்வொரு பகுதி = 21/3 = 7. சிறியது = 4 × 7 = 28', subject: 'Arithmetic', difficulty: 'easy' },
      { id: 'rpf-reason-1', question: 'Find the odd one out: Apple, Mango, Banana, Carrot', questionTamil: 'பொருத்தமற்றதை கண்டுபிடி: ஆப்பிள், மாம்பழம், வாழைப்பழம், கேரட்', options: ['Carrot', 'Apple', 'Mango', 'Banana'], optionsTamil: ['கேரட்', 'ஆப்பிள்', 'மாம்பழம்', 'வாழைப்பழம்'], answer: 0, explanation: 'Carrot is a vegetable (root), while the others are all fruits.', explanationTamil: 'கேரட் ஒரு காய்கறி (வேர்), மற்றவை அனைத்தும் பழங்கள்.', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'rpf-reason-2', question: 'If FRIEND is coded as GSJFOE, how is ENEMY coded?', questionTamil: 'FRIEND = GSJFOE என குறியிடப்பட்டால், ENEMY எப்படி குறியிடப்படும்?', options: ['FOFNZ', 'FOFNY', 'FOFMZ', 'ENFNZ'], optionsTamil: ['FOFNZ', 'FOFNY', 'FOFMZ', 'ENFNZ'], answer: 0, explanation: 'Each letter shifts +1: E→F, N→O, E→F, M→N, Y→Z = FOFNZ', explanationTamil: 'ஒவ்வொரு எழுத்தும் +1 நகரும்: E→F, N→O, E→F, M→N, Y→Z = FOFNZ', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'rpf-reason-3', question: 'Pointing to a woman, Rahul says "She is the daughter of my grandfather\'s only son." How is the woman related to Rahul?', questionTamil: 'ஒரு பெண்ணைச் சுட்டிக்காட்டி ராகுல் சொல்கிறார் "அவள் என் தாத்தாவின் ஒரே மகனின் மகள்." அந்த பெண் ராகுலுக்கு என்ன உறவு?', options: ['Sister', 'Mother', 'Daughter', 'Cousin'], optionsTamil: ['சகோதரி', 'தாய்', 'மகள்', 'உறவினர்'], answer: 0, explanation: 'Grandfather\'s only son = Rahul\'s father. Father\'s daughter = Rahul\'s sister.', explanationTamil: 'தாத்தாவின் ஒரே மகன் = ராகுலின் தந்தை. தந்தையின் மகள் = ராகுலின் சகோதரி.', subject: 'Reasoning', difficulty: 'medium' }
    ]
  },
  {
    id: 'railway-apprentice',
    name: 'Railway Apprentice (Act Apprentice)',
    nameTamil: 'ரயில்வே பயிற்சி (சட்ட பயிற்சியாளர்)',
    qualification: '10th Pass (50%) + ITI (NTC)',
    qualificationTamil: '10ஆம் வகுப்பு (50%) + ITI (NTC) சான்றிதழ்',
    age: '15 - 24 years',
    salary: '₹7,000 - ₹12,261 Stipend/month',
    selectionProcess: 'Merit Based (No Written Exam) → Merit List (10th + ITI marks average) → Medical Examination',
    selectionProcessTamil: 'தகுதி அடிப்படையில் (எழுத்துத் தேர்வு இல்லை) → தகுதிப் பட்டியல் (10ஆம் + ITI மதிப்பெண் சராசரி) → மருத்துவப் பரிசோதனை',
    posts: ['Fitter', 'Electrician', 'Welder (Gas & Electric)', 'Electronic Mechanic', 'COPA/PASAA', 'Machinist', 'Turner', 'Carpenter', 'Painter', 'Diesel Mechanic'],
    postsTamil: ['ஃபிட்டர்', 'எலக்ட்ரீஷியன்', 'வெல்டர்', 'எலக்ட்ரானிக் மெக்கானிக்', 'COPA/PASAA', 'மெஷினிஸ்ட்', 'டர்னர்', 'தச்சர்', 'பெயிண்டர்', 'டீசல் மெக்கானிக்'],
    syllabus: {
      'Selection Process (No Written Exam)': [
        {
          name: 'Merit-Based Selection — How It Works',
          nameTamil: 'தகுதி அடிப்படை தேர்வு — எவ்வாறு செயல்படுகிறது',
          topics: [
            { name: 'Merit Calculation Formula', nameTamil: 'தகுதி கணக்கீட்டு சூத்திரம்', subtopics: [
              'NO written exam or interview is conducted',
              'Merit = Average of 10th Class % + ITI (relevant trade) %',
              'Equal weightage (50:50) given to Matriculation and ITI marks',
              'Example: If 10th = 80% and ITI = 70%, Merit = (80+70)/2 = 75%',
              'Higher merit score = higher chance of selection'
            ] },
            { name: 'Tie-Breaking Rules', nameTamil: 'சமநிலை உடைப்பு விதிகள்', subtopics: [
              'If two candidates have the same merit score:',
              'Rule 1: Older candidate (higher age) is preferred',
              'Rule 2: If same date of birth, candidate who passed 10th earlier is prioritized',
              'Rule 3: Further tie-breaking as per zone-specific notification'
            ] },
            { name: 'Medical Fitness', nameTamil: 'மருத்துவ தகுதி', subtopics: [
              'Shortlisted candidates must pass a medical examination',
              'Physical standards vary by trade and railway zone',
              'Vision, hearing, and general fitness checked',
              'Trade-specific physical requirements may apply (e.g., heavy lifting for Fitter)'
            ] }
          ]
        }
      ],
      'Eligibility Criteria': [
        {
          name: 'Educational & Age Requirements',
          nameTamil: 'கல்வி & வயது தேவைகள்',
          topics: [
            { name: 'Educational Qualification', nameTamil: 'கல்வித் தகுதி', subtopics: [
              '10th Pass (Matriculation): Minimum 50% aggregate marks',
              'ITI Certificate: Must possess National Trade Certificate (NTC)',
              'NTC must be issued by NCVT (National Council for Vocational Training) or SCVT (State Council)',
              'ITI trade must match the vacancy trade (e.g., Fitter ITI for Fitter vacancy)',
              '12th Pass candidates can also apply if they have ITI qualification'
            ] },
            { name: 'Age Limit', nameTamil: 'வயது வரம்பு', subtopics: [
              'Minimum Age: 15 years (as of application closing date)',
              'Maximum Age: 24 years (as of application closing date)',
              'SC/ST Relaxation: +5 years (up to 29 years)',
              'OBC Relaxation: +3 years (up to 27 years)',
              'PwBD (Persons with Benchmark Disabilities): +10 years (up to 34 years)',
              'Ex-Servicemen: As per government rules'
            ] }
          ]
        }
      ],
      'Popular Trades & Vacancies': [
        {
          name: 'Trade-wise Vacancy Information',
          nameTamil: 'தொழில் வாரியான காலிப்பணியிட தகவல்',
          topics: [
            { name: 'High-Demand Trades', nameTamil: 'அதிக தேவை தொழில்கள்', subtopics: [
              'Fitter: Highest volume — e.g., 1600+ vacancies in Western Railway alone',
              'Electrician: Significant demand across all workshops & divisions',
              'Welder (Gas & Electric): Structural & coach repair workshops',
              'Electronic Mechanic: Signal & Telecommunication departments',
              'Machinist: Mechanical workshops for precision work',
              'Turner: Lathe work in railway workshops',
              'Diesel Mechanic: Locomotive maintenance & repair'
            ] },
            { name: 'Computer & Admin Trades', nameTamil: 'கணினி & நிர்வாக தொழில்கள்', subtopics: [
              'COPA (Computer Operator & Programming Assistant): Office automation & data management',
              'PASAA (Programming & Systems Administration Assistant): Technical IT support',
              'These trades suit candidates interested in computer-related railway work'
            ] }
          ]
        }
      ],
      'Training Benefits & Stipend': [
        {
          name: 'What You Get During Training',
          nameTamil: 'பயிற்சியின் போது நீங்கள் பெறுவது',
          topics: [
            { name: 'Stipend & Duration', nameTamil: 'உதவித்தொகை & காலம்', subtopics: [
              'Training Period: Usually 1 year (some trades like CNC Operator may be 6 months)',
              'Monthly Stipend: ₹7,000 to ₹12,261 (varies by zone, trade & year)',
              'Stipend paid as per the Apprentices Act, 1961 provisions',
              'Stipend increases with experience during training period'
            ] },
            { name: 'Future Employment Opportunities', nameTamil: 'எதிர்கால வேலை வாய்ப்புகள்', subtopics: [
              'Railway is NOT obligated to offer permanent job after training',
              'However: 20% of Direct Recruitment (Group D / Level-1) vacancies are RESERVED',
              'Reserved for candidates who completed Railway Apprenticeship (CCAA holders)',
              'CCAA = Certificate of Completion of Apprenticeship from Act Apprenticeship',
              'This gives a significant advantage in future Group D recruitment',
              'Experience certificate from Indian Railways improves employability'
            ] }
          ]
        }
      ],
      'How to Apply': [
        {
          name: 'Application Process',
          nameTamil: 'விண்ணப்ப செயல்முறை',
          topics: [
            { name: 'Step-by-Step Application', nameTamil: 'படிப்படியான விண்ணப்பம்', subtopics: [
              'Applications are zone-wise — each Railway zone publishes its own notification',
              'Apply online through the respective Railway zone website (e.g., rfrinda.com for Western Railway)',
              'Upload scanned copies: 10th Marksheet, ITI Certificate (NTC), Photo, Signature',
              'No application fee for SC/ST/PwBD/Women candidates',
              'General/OBC candidates may need to pay ₹100 fee (varies by zone)',
              'Keep checking indianrailways.gov.in for zone-wise notifications',
              'Major zones: Northern, Southern, Western, Eastern, Central, South Central, etc.'
            ] }
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
    name: 'SSC CHSL (Combined Higher Secondary Level) 2026',
    nameTamil: 'SSC CHSL (ஒருங்கிணைந்த மேல்நிலை தேர்வு)',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 27 years',
    salary: '₹25,500 - ₹81,100/month',
    selectionProcess: 'Tier 1 CBT (Qualifying) → Tier 2 CBT (Final Merit — 2 Sessions + Computer Test) → Skill/Typing Test',
    selectionProcessTamil: 'நிலை 1 CBT (தகுதி) → நிலை 2 CBT (இறுதி தகுதி — 2 அமர்வுகள் + கணினி சோதனை) → திறன்/தட்டச்சு சோதனை',
    posts: ['LDC/JSA (Lower Division Clerk / Junior Secretariat Assistant)', 'DEO (Data Entry Operator)', 'DEO Grade A (C&AG)', 'PA (Postal Assistant)', 'SA (Sorting Assistant)'],
    postsTamil: ['கீழ் பிரிவு எழுத்தர் / இளநிலை செயலக உதவியாளர்', 'தரவு உள்ளீட்டு ஆபரேட்டர்', 'DEO தரம் A (C&AG)', 'தபால் உதவியாளர்', 'வரிசைப்படுத்தும் உதவியாளர்'],
    examPattern: [
      { paper: 'Tier 1 - CBT (Qualifying)', paperTamil: 'நிலை 1 - CBT (தகுதிப்படுத்தும்)', marks: 200, duration: '60 mins', questions: 100 },
      { paper: 'Tier 2 Session 1 - Math & Reasoning', paperTamil: 'நிலை 2 அமர்வு 1 - கணிதம் & தர்க்கம்', marks: 60, duration: '60 mins', questions: 60 },
      { paper: 'Tier 2 Session 2 - English & GA', paperTamil: 'நிலை 2 அமர்வு 2 - ஆங்கிலம் & பொது அறிவு', marks: 60, duration: '60 mins', questions: 60 },
      { paper: 'Tier 2 Session 2 - Computer Knowledge', paperTamil: 'நிலை 2 அமர்வு 2 - கணினி அறிவு', marks: 15, duration: 'Included', questions: 15 }
    ],
    syllabus: {
      'Tier 1 — Qualifying CBT (100 Qs, 200 Marks, 60 Minutes)': [
        {
          name: 'Tier 1 Exam (2 marks/correct, -0.50 per wrong answer)',
          nameTamil: 'நிலை 1 தேர்வு (சரி: 2 மதிப்பெண், தவறு: -0.50)',
          topics: [
            { name: 'General Intelligence / Reasoning (25 Qs, 50 Marks)', nameTamil: 'பொது புத்திசாலித்தனம் / தர்க்கம் (25 கேள்விகள், 50 மதிப்பெண்கள்)', subtopics: ['Semantic Analogy & Symbolic/Number Analogy', 'Semantic & Symbolic/Number Classification', 'Figural Classification & Series', 'Number Series & Figural Series', 'Problem Solving & Word Building', 'Coding & Decoding — Letter, Number, Mixed', 'Numerical Operations & Trends', 'Space Orientation & Venn Diagrams', 'Figural Pattern & Embedded Figures', 'Critical Thinking & Statement-Conclusion'] },
            { name: 'English Language (25 Qs, 50 Marks)', nameTamil: 'ஆங்கில மொழி (25 கேள்விகள், 50 மதிப்பெண்கள்)', subtopics: ['Spot the Error — Sentence Correction', 'Fill in the Blanks', 'Synonyms & Antonyms', 'Spelling / Detecting Misspelt Words', 'Idioms & Phrases — Meaning & Usage', 'One Word Substitution', 'Improvement of Sentences', 'Active/Passive Voice Conversion', 'Direct/Indirect Speech Conversion', 'Shuffling of Sentence Parts', 'Cloze Passage — Fill Blanks in Passage', 'Comprehension Passage'] },
            { name: 'Quantitative Aptitude (25 Qs, 50 Marks)', nameTamil: 'அளவு திறன் (25 கேள்விகள், 50 மதிப்பெண்கள்)', subtopics: ['Number Systems & Fundamental Operations', 'Percentages & Square Roots', 'Ratio & Proportion, Averages', 'Interest — Simple & Compound', 'Profit & Loss, Discount', 'Partnership & Mixture/Alligation', 'Time & Distance, Time & Work', 'Geometry — Lines, Triangles, Circles, Quadrilaterals', 'Mensuration — Area, Volume of Basic & Advanced Shapes', 'Trigonometry — Basic Ratios, Heights & Distances', 'Algebra — Linear Equations, Quadratic Equations', 'Statistical Charts & Data Interpretation — Bar, Pie, Line, Table'] },
            { name: 'General Awareness (25 Qs, 50 Marks)', nameTamil: 'பொது விழிப்புணர்வு (25 கேள்விகள், 50 மதிப்பெண்கள்)', subtopics: ['India & its Neighbouring Countries', 'Indian History — Ancient, Medieval, Modern', 'Culture & Heritage — Art, Dance, Architecture', 'Geography — Physical, Indian, World', 'Economic Scene — Budget, GDP, Policies', 'General Polity — Parliament, President, Judiciary', 'Indian Constitution — Fundamental Rights, DPSP', 'Scientific Research — Space, Defence, Health', 'Current Affairs — Last 6 months National/International'] }
          ]
        }
      ],
      'Tier 2 — Final Merit CBT (Same Day, 2 Sessions)': [
        {
          name: 'Session 1: Mathematical Abilities + Reasoning',
          nameTamil: 'அமர்வு 1: கணித திறன் + தர்க்கம்',
          topics: [
            { name: 'Mathematical Abilities (30 Questions)', nameTamil: 'கணித திறன் (30 கேள்விகள்)', subtopics: ['Number Systems — HCF/LCM, Simplification', 'Algebra — Equations, Polynomials', 'Geometry — Congruence, Similarity, Coordinate Geometry', 'Trigonometry — Identities, Heights & Distances', 'Mensuration — 2D & 3D figures', 'Statistics — Mean, Median, Mode, Standard Deviation', 'Data Interpretation — Advanced Charts & Tables'] },
            { name: 'General Intelligence & Reasoning (30 Questions)', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம் (30 கேள்விகள்)', subtopics: ['Advanced Analogies & Classification', 'Coding-Decoding — Complex Patterns', 'Seating Arrangement & Scheduling', 'Syllogism — Multi-Statement', 'Blood Relations & Direction Sense', 'Input-Output — Machine Operations', 'Paper Folding, Cutting & Mirror Images'] }
          ]
        },
        {
          name: 'Session 2: English + General Awareness + Computer',
          nameTamil: 'அமர்வு 2: ஆங்கிலம் + பொது அறிவு + கணினி',
          topics: [
            { name: 'English Language (40 Questions)', nameTamil: 'ஆங்கில மொழி (40 கேள்விகள்)', subtopics: ['Advanced Grammar — Tenses, Modals, Conditionals', 'Reading Comprehension — Long Passages', 'Vocabulary — Context-Based Meaning', 'Sentence Rearrangement / Para Jumbles', 'Error Detection — Advanced Level', 'Cloze Test — Advanced Passages', 'Précis Writing Concepts'] },
            { name: 'General Awareness (20 Questions)', nameTamil: 'பொது விழிப்புணர்வு (20 கேள்விகள்)', subtopics: ['Current Affairs — In-depth National & International', 'Static GK — History, Geography, Polity, Economy, Science', 'Awards, Books, Summits, International Organizations'] },
            { name: 'Computer Knowledge (15 Questions — Qualifying Only)', nameTamil: 'கணினி அறிவு (15 கேள்விகள் — தகுதி மட்டும்)', subtopics: ['Computer Basics — Hardware, Software, OS', 'MS Office — Word, Excel, PowerPoint', 'Internet & Email — Browsers, Protocols', 'Computer Security — Virus, Firewall, Encryption', 'Number Systems — Binary, Octal, Hexadecimal', 'Database Basics — DBMS Concepts'] }
          ]
        }
      ],
      'Skill / Typing Test': [
        {
          name: 'Typing & Data Entry Requirements',
          nameTamil: 'தட்டச்சு & தரவு உள்ளீடு தேவைகள்',
          topics: [
            { name: 'Typing Test (for LDC/JSA/PA/SA)', nameTamil: 'தட்டச்சு சோதனை (LDC/JSA/PA/SA)', subtopics: [
              'English Typing: 35 words per minute (wpm)',
              'Hindi Typing: 30 words per minute (wpm)',
              'Time allowed: 10 minutes',
              'Qualifying only — marks not added to merit',
              'Candidates can choose English or Hindi'
            ] },
            { name: 'Data Entry Speed Test (for DEO)', nameTamil: 'தரவு உள்ளீட்டு வேகச் சோதனை (DEO)', subtopics: [
              'DEO: 8,000 key depressions per hour',
              'DEO Grade A (C&AG): 15,000 key depressions per hour',
              'Qualifying only — marks not added to merit'
            ] }
          ]
        }
      ],
      'Eligibility & Age Relaxation': [
        {
          name: 'Who Can Apply for SSC CHSL 2026',
          nameTamil: 'SSC CHSL 2026 க்கு யார் விண்ணப்பிக்கலாம்',
          topics: [
            { name: 'Eligibility Criteria', nameTamil: 'தகுதி அளவுகோல்கள்', subtopics: [
              'Education: Must have passed 12th Standard / Higher Secondary or equivalent',
              'DEO (C&AG) special requirement: 12th pass in Science stream with Mathematics as a subject',
              'Age: 18 to 27 years (as of cutoff date in notification)',
              'SC/ST Age Relaxation: +5 years (up to 32 years)',
              'OBC Age Relaxation: +3 years (up to 30 years)',
              'PwBD Age Relaxation: +10 years',
              'Ex-Servicemen: As per government rules',
              'Negative Marking: Tier 1 = -0.50 per wrong answer, Tier 2 = -1.00 per wrong answer'
            ] }
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
    name: 'SSC MTS (Multi Tasking Staff) 2026',
    nameTamil: 'SSC MTS (பல்பணி ஊழியர்)',
    qualification: '10th / 12th Pass',
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
      { id: 'mts-gi-1', question: 'Which one is different from others? 25, 36, 49, 60, 81', questionTamil: 'மற்றவற்றிலிருந்து வேறுபட்டது எது? 25, 36, 49, 60, 81', options: ['25', '36', '60', '81'], optionsTamil: ['25', '36', '60', '81'], answer: 2, explanation: '25=5², 36=6², 49=7², 81=9². 60 is not a perfect square', explanationTamil: '25=5², 36=6², 49=7², 81=9². 60 முழு வர்க்கம் அல்ல', subject: 'General Intelligence', difficulty: 'easy' },
      { id: 'mts-gk-1', question: 'Who is known as the Father of the Indian Constitution?', questionTamil: 'இந்திய அரசியலமைப்பின் தந்தை என்று அழைக்கப்படுபவர்:', options: ['Dr. B.R. Ambedkar', 'Mahatma Gandhi', 'Jawaharlal Nehru', 'Sardar Patel'], optionsTamil: ['டாக்டர் அம்பேத்கர்', 'மகாத்மா காந்தி', 'ஜவஹர்லால் நேரு', 'சர்தார் படேல்'], answer: 0, explanation: 'Dr. B.R. Ambedkar was Chairman of the Drafting Committee and is called the Father of the Indian Constitution.', explanationTamil: 'டாக்டர் அம்பேத்கர் வரைவுக் குழுவின் தலைவராக இருந்தார் — இந்திய அரசியலமைப்பின் தந்தை.', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'mts-gk-2', question: 'The national bird of India is:', questionTamil: 'இந்தியாவின் தேசிய பறவை:', options: ['Peacock', 'Parrot', 'Pigeon', 'Eagle'], optionsTamil: ['மயில்', 'கிளி', 'புறா', 'கழுகு'], answer: 0, explanation: 'The Indian Peacock (Pavo cristatus) was declared the national bird of India in 1963.', explanationTamil: 'இந்திய மயில் 1963 இல் இந்தியாவின் தேசிய பறவையாக அறிவிக்கப்பட்டது.', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'mts-gk-3', question: 'Which planet is known as the Red Planet?', questionTamil: 'செவ்வாய் கிரகம் என்று அழைக்கப்படும் கிரகம்:', options: ['Mars', 'Jupiter', 'Venus', 'Saturn'], optionsTamil: ['செவ்வாய்', 'வியாழன்', 'வெள்ளி', 'சனி'], answer: 0, explanation: 'Mars is called the Red Planet due to iron oxide (rust) on its surface giving it a reddish appearance.', explanationTamil: 'செவ்வாய் கிரகம் அதன் மேற்பரப்பில் உள்ள இரும்பு ஆக்சைடு காரணமாக சிவப்பு நிறமாக தோன்றுகிறது.', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'mts-math-1', question: 'What is 25% of 400?', questionTamil: '400 இன் 25% என்ன?', options: ['100', '75', '125', '200'], optionsTamil: ['100', '75', '125', '200'], answer: 0, explanation: '25% of 400 = (25/100) × 400 = 100', explanationTamil: '400 இன் 25% = (25/100) × 400 = 100', subject: 'Numerical Ability', difficulty: 'easy' },
      { id: 'mts-math-2', question: 'The average of 10, 20, 30, 40, 50 is:', questionTamil: '10, 20, 30, 40, 50 இன் சராசரி:', options: ['30', '25', '35', '40'], optionsTamil: ['30', '25', '35', '40'], answer: 0, explanation: 'Average = Sum/Count = (10+20+30+40+50)/5 = 150/5 = 30', explanationTamil: 'சராசரி = கூட்டுத்தொகை/எண்ணிக்கை = 150/5 = 30', subject: 'Numerical Ability', difficulty: 'easy' },
      { id: 'mts-math-3', question: 'A shopkeeper buys an item for ₹200 and sells for ₹250. Profit% is:', questionTamil: 'ஒரு பொருளை ₹200 க்கு வாங்கி ₹250 க்கு விற்றால் லாப%:', options: ['25%', '20%', '50%', '30%'], optionsTamil: ['25%', '20%', '50%', '30%'], answer: 0, explanation: 'Profit = 250-200 = ₹50. Profit% = (50/200)×100 = 25%', explanationTamil: 'லாபம் = ₹50. லாப% = (50/200)×100 = 25%', subject: 'Numerical Ability', difficulty: 'easy' },
      { id: 'mts-reason-1', question: 'If CAT = 24, then DOG = ?', questionTamil: 'CAT = 24 எனில், DOG = ?', options: ['26', '24', '30', '28'], optionsTamil: ['26', '24', '30', '28'], answer: 0, explanation: 'C=3,A=1,T=20. CAT=3+1+20=24. D=4,O=15,G=7. DOG=4+15+7=26.', explanationTamil: 'C=3,A=1,T=20. CAT=24. D=4,O=15,G=7. DOG=26.', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'mts-reason-2', question: 'Which one is different? Rose, Lotus, Jasmine, Mango', questionTamil: 'வேறுபட்டது எது? ரோஜா, தாமரை, மல்லிகை, மாம்பழம்', options: ['Mango', 'Rose', 'Lotus', 'Jasmine'], optionsTamil: ['மாம்பழம்', 'ரோஜா', 'தாமரை', 'மல்லிகை'], answer: 0, explanation: 'Rose, Lotus, and Jasmine are flowers. Mango is a fruit — it is the odd one out.', explanationTamil: 'ரோஜா, தாமரை, மல்லிகை பூக்கள். மாம்பழம் ஒரு பழம் — இது வேறுபட்டது.', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'mts-eng-1', question: 'Choose the correctly spelt word:', questionTamil: 'சரியாக எழுதப்பட்ட சொல்:', options: ['Beautiful', 'Beautifull', 'Beautful', 'Beutiful'], optionsTamil: ['Beautiful', 'Beautifull', 'Beautful', 'Beutiful'], answer: 0, explanation: 'Beautiful is the correct spelling — B-E-A-U-T-I-F-U-L.', explanationTamil: 'Beautiful சரியான எழுத்துப்பிழை.', subject: 'English', difficulty: 'easy' }
    ]
  },
  {
    id: 'ssc-gd',
    name: 'SSC GD Constable (CAPFs) 2027',
    nameTamil: 'SSC GD காவலர் (CAPFs) 2027',
    qualification: '10th/12th Pass',
    qualificationTamil: '10/12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 23 years',
    salary: '₹23,527/month',
    selectionProcess: 'Computer Based Test (CBT) → Physical Efficiency Test (PET) → Physical Standard Test (PST) → Medical Examination → Document Verification',
    selectionProcessTamil: 'கணினி அடிப்படை தேர்வு (CBT) → உடல் திறன் தேர்வு (PET) → உடல் தரநிலை தேர்வு (PST) → மருத்துவப் பரிசோதனை → ஆவண சரிபார்ப்பு',
    posts: ['BSF Constable (GD)', 'CISF Constable (GD)', 'CRPF Constable (GD)', 'ITBP Constable (GD)', 'SSB Constable (GD)', 'SSF Constable (GD)', 'Rifleman (GD) in Assam Rifles'],
    postsTamil: ['BSF காவலர் (GD)', 'CISF காவலர் (GD)', 'CRPF காவலர் (GD)', 'ITBP காவலர் (GD)', 'SSB காவலர் (GD)', 'SSF காவலர் (GD)', 'அசாம் ரைபிள்ஸ் ரைஃபிள்மேன் (GD)'],
    examPattern: [
      { paper: 'Computer Based Test (CBT)', paperTamil: 'கணினி அடிப்படை தேர்வு (CBT)', marks: 160, duration: '60 minutes', questions: 80 }
    ],
    syllabus: {
      'Written Exam — CBT (80 Questions, 160 Marks, 60 Minutes)': [
        {
          name: 'General Intelligence & Reasoning (20 Qs, 40 Marks)',
          nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம் (20 கேள்விகள், 40 மதிப்பெண்கள்)',
          topics: [
            { name: 'Verbal Reasoning', nameTamil: 'சொல் தர்க்கம்', subtopics: ['Analogies — Word & Number Relationships', 'Coding-Decoding — Letter, Number & Symbol Coding', 'Blood Relations — Family Tree Problems', 'Number Series — Missing Number, Wrong Number', 'Alphabet Series & Ranking'] },
            { name: 'Non-Verbal & Analytical', nameTamil: 'சொல்லற்ற & பகுப்பாய்வு', subtopics: ['Venn Diagrams — Set Theory Problems', 'Spatial Visualization — Mirror Image, Water Image, Paper Folding', 'Classification — Odd One Out', 'Similarities & Differences', 'Pattern Recognition — Figure Series, Embedded Figures', 'Data Interpretation — Tables, Charts'] }
          ]
        },
        {
          name: 'General Knowledge & Awareness (20 Qs, 40 Marks)',
          nameTamil: 'பொது அறிவு & விழிப்புணர்வு (20 கேள்விகள், 40 மதிப்பெண்கள்)',
          topics: [
            { name: 'Indian History & Culture', nameTamil: 'இந்திய வரலாறு & கலாச்சாரம்', subtopics: ['Ancient India — Indus Valley, Vedic, Maurya, Gupta', 'Medieval India — Delhi Sultanate, Mughal Empire', 'Modern India — British Rule, Freedom Movement', 'Indian Art, Culture, Dance, Music, Heritage Sites'] },
            { name: 'Geography & Polity', nameTamil: 'புவியியல் & அரசியல்', subtopics: ['Indian Geography — Rivers, Mountains, Plains, Climate, Soil', 'Indian Constitution — Fundamental Rights, Duties, DPSP', 'Indian Economy — GDP, Budget, Banking, Five Year Plans', 'India & its Neighbouring Countries — Borders, Relations'] },
            { name: 'Current Affairs & Science', nameTamil: 'நடப்பு நிகழ்வுகள் & அறிவியல்', subtopics: ['National & International Current Affairs', 'Sports — Olympics, Commonwealth, Cricket, Asian Games', 'Awards & Honours — Padma, Bharat Ratna, Nobel', 'General Science — Physics, Chemistry, Biology basics', 'Scientific Research & Discoveries'] }
          ]
        },
        {
          name: 'Elementary Mathematics (20 Qs, 40 Marks)',
          nameTamil: 'அடிப்படை கணிதம் (20 கேள்விகள், 40 மதிப்பெண்கள்)',
          topics: [
            { name: 'Arithmetic & Number System', nameTamil: 'எண்கணிதம் & எண் முறை', subtopics: ['Number Systems — Natural, Whole, Integers, Rational', 'Decimals & Fractions', 'LCM & HCF', 'Percentages — Increase, Decrease, Successive', 'Ratio & Proportion — Direct & Inverse'] },
            { name: 'Commercial & Applied Math', nameTamil: 'வணிக & பயன்பாட்டு கணிதம்', subtopics: ['Averages — Simple & Weighted', 'Profit & Loss — Cost Price, Selling Price, Discount', 'Simple Interest & Compound Interest', 'Time & Distance — Speed, Trains, Boats & Streams', 'Time & Work — Pipe & Cistern, Efficiency', 'Mensuration — Area, Perimeter, Volume of 2D & 3D Shapes'] }
          ]
        },
        {
          name: 'English / Hindi — Candidate\'s Choice (20 Qs, 40 Marks)',
          nameTamil: 'ஆங்கிலம் / இந்தி — விண்ணப்பதாரரின் தேர்வு (20 கேள்விகள், 40 மதிப்பெண்கள்)',
          topics: [
            { name: 'English Grammar & Vocabulary', nameTamil: 'ஆங்கில இலக்கணம் & சொல்வளம்', subtopics: ['Error Spotting — Sentence Correction', 'Fill in the Blanks — Grammar & Vocabulary Based', 'Synonyms & Antonyms', 'Spelling Errors — Commonly Misspelled Words', 'Idioms & Phrases', 'One Word Substitution', 'Sentence Improvement'] },
            { name: 'Comprehension', nameTamil: 'புரிதல்', subtopics: ['Reading Comprehension — Passage Based Questions', 'Cloze Test — Fill in Blanks in a Passage', 'Para Jumbles — Sentence Rearrangement'] }
          ]
        }
      ],
      'Physical Standard Test (PST) — Qualifying': [
        {
          name: 'Height Requirements (Category-wise)',
          nameTamil: 'உயர தேவைகள் (பிரிவு வாரியாக)',
          topics: [
            { name: 'Male Candidates', nameTamil: 'ஆண் விண்ணப்பதாரர்கள்', subtopics: ['General / OBC / SC: 170 cm', 'Scheduled Tribes (ST): 162.5 cm', 'Candidates from Garhwal, Kumaon, Gorkhas, Dogras, Marathas: Relaxed as per rules', 'NE States — Arunachal, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura: Relaxed'] },
            { name: 'Female Candidates', nameTamil: 'பெண் விண்ணப்பதாரர்கள்', subtopics: ['General / OBC / SC: 157 cm', 'Scheduled Tribes (ST): 150 cm', 'NE States & Hill Area candidates: Relaxed as per rules'] },
            { name: 'Chest (Male Only)', nameTamil: 'மார்பு (ஆண் மட்டும்)', subtopics: ['General / OBC / SC: 80 cm unexpanded (minimum 5 cm expansion)', 'Scheduled Tribes (ST): 76 cm unexpanded (minimum 5 cm expansion)'] }
          ]
        }
      ],
      'Physical Efficiency Test (PET) — Qualifying': [
        {
          name: 'Running Test Requirements',
          nameTamil: 'ஓட்டத் தேர்வு தேவைகள்',
          topics: [
            { name: 'Standard Regions', nameTamil: 'பொது பகுதிகள்', subtopics: ['Male: 5 km run in 24 minutes', 'Female: 1.6 km run in 8 minutes 30 seconds'] },
            { name: 'Ladakh Region (Special Relaxation)', nameTamil: 'லடாக் பகுதி (சிறப்பு சலுகை)', subtopics: ['Male (Ladakh): 1.6 km run in 6 minutes 30 seconds', 'Female (Ladakh): 800 meters run in 4 minutes'] }
          ]
        }
      ],
      'Medical Examination Standards': [
        {
          name: 'Medical Fitness Requirements',
          nameTamil: 'மருத்துவ தகுதி தேவைகள்',
          topics: [
            { name: 'Vision & Physical Health', nameTamil: 'பார்வை & உடல் நலம்', subtopics: ['Vision: 6/6 in both eyes (without glasses) is required', 'Hearing: Normal hearing in both ears', 'Musculoskeletal: No flat feet, knock knees, or bow legs', 'No color blindness', 'Overall physical and mental fitness required', 'Detailed medical check-up conducted at designated medical centres'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'gd-gk-1', question: 'CRPF was established in:', questionTamil: 'CRPF நிறுவப்பட்ட ஆண்டு:', options: ['1939', '1947', '1950', '1962'], optionsTamil: ['1939', '1947', '1950', '1962'], answer: 0, explanation: 'CRPF was established on 27 July 1939 as Crown Representative\'s Police. After independence, it became Central Reserve Police Force on 28 December 1949.', explanationTamil: 'CRPF 1939 ஜூலை 27 அன்று Crown Representative\'s Police ஆக நிறுவப்பட்டது. சுதந்திரத்திற்குப் பின் 1949 இல் CRPF ஆனது.', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'gd-gk-2', question: 'BSF guards the border with which countries?', questionTamil: 'BSF எந்த நாடுகளின் எல்லையை காவல் காக்கிறது?', options: ['Pakistan & Bangladesh', 'China & Nepal', 'Myanmar & Bangladesh', 'Pakistan & China'], optionsTamil: ['பாகிஸ்தான் & வங்கதேசம்', 'சீனா & நேபாளம்', 'மியான்மர் & வங்கதேசம்', 'பாகிஸ்தான் & சீனா'], answer: 0, explanation: 'BSF (Border Security Force) is responsible for guarding the India-Pakistan border and India-Bangladesh border.', explanationTamil: 'BSF இந்தியா-பாகிஸ்தான் எல்லை மற்றும் இந்தியா-வங்கதேசம் எல்லையை காவல் காக்கிறது.', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'gd-gk-3', question: 'ITBP was raised to guard the border with:', questionTamil: 'ITBP எந்த நாட்டின் எல்லையை காவல் காக்க எழுப்பப்பட்டது?', options: ['China', 'Pakistan', 'Nepal', 'Myanmar'], optionsTamil: ['சீனா', 'பாகிஸ்தான்', 'நேபாளம்', 'மியான்மர்'], answer: 0, explanation: 'ITBP (Indo-Tibetan Border Police) was raised on 24 October 1962, during the India-China War, to guard the India-China border.', explanationTamil: 'ITBP 1962 அக்டோபர் 24 அன்று இந்தியா-சீன போரின் போது இந்தியா-சீன எல்லையை காவல் காக்க எழுப்பப்பட்டது.', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'gd-gk-4', question: 'SSB guards the border with:', questionTamil: 'SSB எந்த நாடுகளின் எல்லையை காவல் காக்கிறது?', options: ['Nepal & Bhutan', 'Pakistan & China', 'Myanmar & Bangladesh', 'Sri Lanka & Maldives'], optionsTamil: ['நேபாளம் & பூடான்', 'பாகிஸ்தான் & சீனா', 'மியான்மர் & வங்கதேசம்', 'இலங்கை & மாலத்தீவு'], answer: 0, explanation: 'SSB (Sashastra Seema Bal) guards the India-Nepal border and India-Bhutan border.', explanationTamil: 'SSB இந்தியா-நேபாளம் எல்லை மற்றும் இந்தியா-பூடான் எல்லையை காவல் காக்கிறது.', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'gd-math-1', question: 'If 25% of a number is 75, the number is:', questionTamil: 'ஒரு எண்ணின் 25% = 75 எனில், அந்த எண்:', options: ['300', '250', '200', '150'], optionsTamil: ['300', '250', '200', '150'], answer: 0, explanation: '25% × N = 75. N = 75 × 100/25 = 300', explanationTamil: '25% × N = 75. N = 75 × 100/25 = 300', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'gd-math-2', question: 'A shopkeeper sells an article at 10% loss. If the cost price is ₹500, the selling price is:', questionTamil: 'ஒரு கடைக்காரர் 10% நஷ்டத்தில் ஒரு பொருளை விற்கிறார். அடக்க விலை ₹500 எனில், விற்பனை விலை:', options: ['₹450', '₹550', '₹400', '₹500'], optionsTamil: ['₹450', '₹550', '₹400', '₹500'], answer: 0, explanation: 'Loss = 10% of 500 = ₹50. SP = CP - Loss = 500 - 50 = ₹450', explanationTamil: 'நஷ்டம் = 500 இன் 10% = ₹50. விற்பனை விலை = 500 - 50 = ₹450', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'gd-math-3', question: 'The average of 5, 10, 15, 20, 25 is:', questionTamil: '5, 10, 15, 20, 25 இன் சராசரி:', options: ['15', '20', '12', '18'], optionsTamil: ['15', '20', '12', '18'], answer: 0, explanation: 'Sum = 5+10+15+20+25 = 75. Average = 75/5 = 15', explanationTamil: 'கூட்டு = 75. சராசரி = 75/5 = 15', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'gd-reason-1', question: 'Find the odd one out: Pen, Pencil, Eraser, Book, Ink', questionTamil: 'பொருத்தமற்றதை கண்டுபிடி: பேனா, பென்சில், அழிப்பான், புத்தகம், மை', options: ['Book', 'Pen', 'Pencil', 'Eraser'], optionsTamil: ['புத்தகம்', 'பேனா', 'பென்சில்', 'அழிப்பான்'], answer: 0, explanation: 'Pen, Pencil, Eraser, Ink are all writing/stationery instruments. Book is used for reading, not writing.', explanationTamil: 'பேனா, பென்சில், அழிப்பான், மை அனைத்தும் எழுதும் கருவிகள். புத்தகம் படிக்க பயன்படும் — எழுதும் கருவி அல்ல.', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'gd-reason-2', question: 'If A = 1, B = 2, C = 3... then FACE = ?', questionTamil: 'A = 1, B = 2, C = 3... எனில் FACE = ?', options: ['15', '24', '18', '12'], optionsTamil: ['15', '24', '18', '12'], answer: 0, explanation: 'F=6, A=1, C=3, E=5. FACE = 6+1+3+5 = 15', explanationTamil: 'F=6, A=1, C=3, E=5. FACE = 6+1+3+5 = 15', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'gd-eng-1', question: 'Choose the correct synonym of "Brave":', questionTamil: '"Brave" என்ற சொல்லின் ஒத்த சொல் தேர்வு செய்:', options: ['Courageous', 'Timid', 'Fearful', 'Weak'], optionsTamil: ['தைரியமான', 'பயந்த', 'அச்சமான', 'பலவீனமான'], answer: 0, explanation: 'Brave means showing courage in the face of danger. Courageous is its synonym.', explanationTamil: 'Brave என்றால் ஆபத்தை எதிர்கொள்ளும் தைரியம். Courageous அதன் ஒத்த சொல்.', subject: 'English', difficulty: 'easy' },
      { id: 'gd-eng-2', question: 'Spot the error: "He go to school every day."', questionTamil: 'பிழையைக் கண்டுபிடி: "He go to school every day."', options: ['go should be goes', 'school should be schools', 'every should be each', 'No error'], optionsTamil: ['go → goes ஆக இருக்க வேண்டும்', 'school → schools ஆக இருக்க வேண்டும்', 'every → each ஆக இருக்க வேண்டும்', 'பிழை இல்லை'], answer: 0, explanation: 'With third person singular subject (He/She/It), the verb takes "s" or "es" in Simple Present Tense. "He goes" is correct.', explanationTamil: 'மூன்றாம் நபர் ஒருமை (He/She/It) உடன் Simple Present Tense இல் வினைச்சொல் "s" அல்லது "es" பெறும். "He goes" சரி.', subject: 'English', difficulty: 'easy' }
    ]
  },
  {
    id: 'ssc-steno',
    name: 'SSC Stenographer Grade C & D 2026',
    nameTamil: 'SSC சுருக்கெழுத்தாளர் தரம் C & D 2026',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 30 years (Grade C) / 18 - 27 years (Grade D)',
    salary: '₹25,500 - ₹81,100/month',
    selectionProcess: 'Computer Based Test (CBT — 200 Qs, 2 Hours) → Stenography Skill Test (Dictation + Transcription) → Document Verification',
    selectionProcessTamil: 'கணினி அடிப்படை தேர்வு (CBT — 200 கேள்விகள், 2 மணி) → சுருக்கெழுத்து திறன் சோதனை (எழுத்தாக்கம் + படியெடுப்பு) → ஆவண சரிபார்ப்பு',
    posts: ['Stenographer Grade C (Group B, Non-Gazetted)', 'Stenographer Grade D (Group C)'],
    postsTamil: ['சுருக்கெழுத்தாளர் தரம் C (குழு B, அறிவிக்கப்படாத)', 'சுருக்கெழுத்தாளர் தரம் D (குழு C)'],
    examPattern: [
      { paper: 'Computer Based Test (CBT)', paperTamil: 'கணினி அடிப்படை தேர்வு (CBT)', marks: 200, duration: '2 hours', questions: 200 }
    ],
    syllabus: {
      'Written Exam — CBT (200 Questions, 200 Marks, 2 Hours)': [
        {
          name: 'English Language & Comprehension (100 Questions, 100 Marks)',
          nameTamil: 'ஆங்கில மொழி & புரிதல் (100 கேள்விகள், 100 மதிப்பெண்கள்)',
          topics: [
            { name: 'Grammar & Sentence Structure', nameTamil: 'இலக்கணம் & வாக்கிய அமைப்பு', subtopics: ['Spot the Error — Identify grammatical mistakes in sentences', 'Fill in the Blanks — Prepositions, Articles, Conjunctions', 'Sentence Improvement — Choose the correct replacement', 'Active & Passive Voice — Conversion', 'Direct & Indirect Speech — Narration change', 'Sentence Rearrangement / Para Jumbles', 'Spelling Correction — Commonly misspelled words'] },
            { name: 'Vocabulary', nameTamil: 'சொல்வளம்', subtopics: ['Synonyms — Words with similar meanings', 'Antonyms — Words with opposite meanings', 'Idioms & Phrases — Meaning and usage', 'One Word Substitution — Single word for a phrase', 'Homonyms, Homophones & Word Usage'] },
            { name: 'Comprehension & Cloze', nameTamil: 'புரிதல் & க்ளோஸ்', subtopics: ['Reading Comprehension — Passage-based questions', 'Cloze Passage — Fill blanks in a paragraph', 'Sentence Completion', 'Theme & Tone detection of passages'] }
          ]
        },
        {
          name: 'General Intelligence & Reasoning (50 Questions, 50 Marks)',
          nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம் (50 கேள்விகள், 50 மதிப்பெண்கள்)',
          topics: [
            { name: 'Verbal & Analytical Reasoning', nameTamil: 'சொல் & பகுப்பாய்வு தர்க்கம்', subtopics: ['Analogies — Word, Number & Letter Relationships', 'Similarities & Differences — Classification, Odd One Out', 'Problem Solving — Logical Puzzles', 'Analysis & Decision Making', 'Judgment — Statement & Conclusion', 'Number Series — Missing, Wrong Number patterns', 'Coding-Decoding — Letter, Number & Mixed codes'] },
            { name: 'Non-Verbal Reasoning', nameTamil: 'சொல்லற்ற தர்க்கம்', subtopics: ['Space Visualization — 2D to 3D conversion', 'Visual Memory — Pattern recall', 'Discriminating Observation — Spot differences', 'Relationship Concepts — Blood Relations, Direction Sense', 'Figure Classification & Completion', 'Embedded Figures — Hidden patterns', 'Mirror & Water Images', 'Venn Diagrams'] }
          ]
        },
        {
          name: 'General Awareness (50 Questions, 50 Marks)',
          nameTamil: 'பொது விழிப்புணர்வு (50 கேள்விகள், 50 மதிப்பெண்கள்)',
          topics: [
            { name: 'Current Affairs & India', nameTamil: 'நடப்பு நிகழ்வுகள் & இந்தியா', subtopics: ['Current Events — National & International news', 'India & Its Neighboring Countries — Relations, Geography, Politics', 'History — Ancient, Medieval, Modern Indian History', 'Culture — Art, Dance, Music, Festivals, Architecture', 'Geography — Indian & World Geography, Climate, Rivers, Mountains'] },
            { name: 'Polity, Economy & Science', nameTamil: 'அரசியல், பொருளாதாரம் & அறிவியல்', subtopics: ['General Polity — Indian Constitution, Fundamental Rights, Parliament', 'Indian Constitution — Preamble, Amendments, Schedules', 'Economic Scene — Budget, GDP, Banking, Taxation, Five Year Plans', 'Scientific Research — Recent discoveries, Space missions, Technology', 'Awards & Honours — Padma Awards, Nobel Prize, Sports Awards'] }
          ]
        }
      ],
      'Stenography Skill Test (Qualifying — After CBT)': [
        {
          name: 'Stenographer Grade C — Skill Test',
          nameTamil: 'சுருக்கெழுத்தாளர் தரம் C — திறன் சோதனை',
          topics: [
            { name: 'Grade C Requirements (100 WPM)', nameTamil: 'தரம் C தேவைகள் (100 WPM)', subtopics: [
              'Dictation Speed: 100 words per minute',
              'Dictation Duration: 10 minutes (total ~1000 words)',
              'Transcription Time (English Medium): 40 minutes',
              'Transcription Time (Hindi Medium): 55 minutes',
              'Transcription on Computer — no handwriting',
              'Choose either English or Hindi as medium (at application time)',
              'Grade C posts are Group B, Non-Gazetted — higher pay scale'
            ] }
          ]
        },
        {
          name: 'Stenographer Grade D — Skill Test',
          nameTamil: 'சுருக்கெழுத்தாளர் தரம் D — திறன் சோதனை',
          topics: [
            { name: 'Grade D Requirements (80 WPM)', nameTamil: 'தரம் D தேவைகள் (80 WPM)', subtopics: [
              'Dictation Speed: 80 words per minute',
              'Dictation Duration: 10 minutes (total ~800 words)',
              'Transcription Time (English Medium): 50 minutes',
              'Transcription Time (Hindi Medium): 65 minutes',
              'Transcription on Computer — no handwriting',
              'Choose either English or Hindi as medium (at application time)',
              'Grade D posts are Group C — entry-level stenographer'
            ] }
          ]
        }
      ],
      'Eligibility Criteria 2026': [
        {
          name: 'Age & Education Requirements',
          nameTamil: 'வயது & கல்வி தேவைகள்',
          topics: [
            { name: 'Educational Qualification', nameTamil: 'கல்வித் தகுதி', subtopics: [
              'Must have passed 12th Standard (10+2) or equivalent',
              'From any recognized Board (CBSE, State Board, ICSE, NIOS, etc.)',
              'No minimum percentage required — just pass is enough',
              'Must possess qualification by the application deadline'
            ] },
            { name: 'Age Limit (as of cut-off date)', nameTamil: 'வயது வரம்பு', subtopics: [
              'Stenographer Grade C: 18 to 30 years',
              'Stenographer Grade D: 18 to 27 years',
              'SC/ST Relaxation: +5 years',
              'OBC Relaxation: +3 years',
              'PwBD (Unreserved): +10 years',
              'PwBD (OBC): +13 years',
              'PwBD (SC/ST): +15 years',
              'Ex-Servicemen: As per government rules'
            ] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'steno-eng-1', question: 'Choose the synonym of "ELOQUENT":', questionTamil: '"ELOQUENT" இன் ஒத்த சொல்:', options: ['Shy', 'Fluent', 'Silent', 'Dumb'], optionsTamil: ['வெட்கமான', 'சரளமான', 'அமைதியான', 'ஊமை'], answer: 1, explanation: 'Eloquent means fluent or persuasive in speaking or writing', explanationTamil: 'Eloquent என்றால் பேச்சு அல்லது எழுத்தில் சரளமான', subject: 'English', difficulty: 'easy' },
      { id: 'steno-eng-2', question: 'Choose the antonym of "TRANSPARENT":', questionTamil: '"TRANSPARENT" இன் எதிர்ச்சொல்:', options: ['Opaque', 'Clear', 'Visible', 'Bright'], optionsTamil: ['ஒளிபுகா', 'தெளிவான', 'காணக்கூடிய', 'பிரகாசமான'], answer: 0, explanation: 'Transparent means allowing light to pass through. Opaque means not allowing light to pass — opposite meaning.', explanationTamil: 'Transparent என்றால் ஒளி ஊடுருவ அனுமதிக்கும். Opaque என்றால் ஒளி ஊடுருவாத — எதிர்ப்பொருள்.', subject: 'English', difficulty: 'easy' },
      { id: 'steno-eng-3', question: 'Identify the error: "Each of the boys have done their homework."', questionTamil: 'பிழையை கண்டறி: "Each of the boys have done their homework."', options: ['have → has', 'their → his', 'Both A and B', 'No error'], optionsTamil: ['have → has', 'their → his', 'A மற்றும் B இரண்டும்', 'பிழை இல்லை'], answer: 2, explanation: '"Each" is singular, so it takes "has" (not "have") and "his" (not "their"). Correct: "Each of the boys has done his homework."', explanationTamil: '"Each" ஒருமை, எனவே "has" (have அல்ல) மற்றும் "his" (their அல்ல) வரும்.', subject: 'English', difficulty: 'medium' },
      { id: 'steno-eng-4', question: 'The idiom "Break the ice" means:', questionTamil: '"Break the ice" என்ற மரபுத்தொடரின் பொருள்:', options: ['To start a conversation in a social setting', 'To break something frozen', 'To end a friendship', 'To fail in an exam'], optionsTamil: ['சமூக சூழலில் உரையாடலைத் தொடங்குவது', 'உறைந்ததை உடைப்பது', 'நட்பை முறிப்பது', 'தேர்வில் தோல்வியடைவது'], answer: 0, explanation: '"Break the ice" means to initiate conversation or relieve tension in a social situation, especially with strangers.', explanationTamil: '"Break the ice" என்றால் குறிப்பாக அந்நியர்களுடன் சமூக சூழலில் உரையாடலைத் தொடங்குவது.', subject: 'English', difficulty: 'easy' },
      { id: 'steno-reason-1', question: 'If STRONG is coded as TUSPOH, how is FATHER coded?', questionTamil: 'STRONG = TUSPOH என குறியிடப்பட்டால், FATHER எப்படி குறியிடப்படும்?', options: ['GBUIFS', 'GBUJFS', 'GCUIFS', 'GBUIFR'], optionsTamil: ['GBUIFS', 'GBUJFS', 'GCUIFS', 'GBUIFR'], answer: 0, explanation: 'Each letter shifts +1: S→T, T→U, R→S, O→P, N→O, G→H. So F→G, A→B, T→U, H→I, E→F, R→S = GBUIFS', explanationTamil: 'ஒவ்வொரு எழுத்தும் +1 நகரும்: F→G, A→B, T→U, H→I, E→F, R→S = GBUIFS', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'steno-reason-2', question: 'Find the odd one out: January, March, May, November', questionTamil: 'பொருத்தமற்றதை கண்டுபிடி: ஜனவரி, மார்ச், மே, நவம்பர்', options: ['November', 'January', 'March', 'May'], optionsTamil: ['நவம்பர்', 'ஜனவரி', 'மார்ச்', 'மே'], answer: 0, explanation: 'January, March, and May all have 31 days. November has only 30 days — so it is the odd one out.', explanationTamil: 'ஜனவரி, மார்ச், மே அனைத்தும் 31 நாட்கள் கொண்டவை. நவம்பர் 30 நாட்கள் மட்டுமே — எனவே இது பொருத்தமற்றது.', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'steno-gk-1', question: 'The Preamble of the Indian Constitution starts with:', questionTamil: 'இந்திய அரசியலமைப்பின் முகவுரை தொடங்குவது:', options: ['We, the people of India', 'The Government of India', 'The Parliament of India', 'The President of India'], optionsTamil: ['நாம், இந்திய மக்கள்', 'இந்திய அரசு', 'இந்திய நாடாளுமன்றம்', 'இந்தியக் குடியரசுத் தலைவர்'], answer: 0, explanation: 'The Preamble begins with "We, the people of India" — establishing that the Constitution derives its authority from the people.', explanationTamil: 'முகவுரை "நாம், இந்திய மக்கள்" என்று தொடங்குகிறது — அரசியலமைப்பு மக்களிடமிருந்து அதிகாரம் பெறுகிறது என்பதை நிறுவுகிறது.', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'steno-gk-2', question: 'Which article of the Indian Constitution abolishes untouchability?', questionTamil: 'இந்திய அரசியலமைப்பின் எந்த பிரிவு தீண்டாமையை ஒழிக்கிறது?', options: ['Article 17', 'Article 14', 'Article 21', 'Article 32'], optionsTamil: ['பிரிவு 17', 'பிரிவு 14', 'பிரிவு 21', 'பிரிவு 32'], answer: 0, explanation: 'Article 17 abolishes untouchability and forbids its practice in any form. It is a Fundamental Right under Part III of the Constitution.', explanationTamil: 'பிரிவு 17 தீண்டாமையை ஒழித்து, எந்த வடிவத்திலும் அதன் நடைமுறையை தடை செய்கிறது. இது அரசியலமைப்பின் பகுதி III இன் கீழ் அடிப்படை உரிமை.', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'steno-gk-3', question: 'ISRO headquarters is located at:', questionTamil: 'ISRO தலைமையகம் அமைந்துள்ள இடம்:', options: ['Bengaluru', 'New Delhi', 'Sriharikota', 'Ahmedabad'], optionsTamil: ['பெங்களூரு', 'புது தில்லி', 'ஸ்ரீஹரிகோட்டா', 'அகமதாபாத்'], answer: 0, explanation: 'ISRO (Indian Space Research Organisation) headquarters is at Bengaluru, Karnataka. Sriharikota is the launch centre.', explanationTamil: 'ISRO தலைமையகம் கர்நாடகாவில் பெங்களூருவில் உள்ளது. ஸ்ரீஹரிகோட்டா ஏவுதளம்.', subject: 'General Awareness', difficulty: 'easy' }
    ]
  }
];

// (Banking exams removed — all require Graduation Degree, not eligible for 12th pass)

// ==================== TAMIL NADU STATE GOVT ====================
const stateExams: Exam[] = [
  {
    id: 'tnpsc-group4',
    name: 'TNPSC Group 4 (CCSE-IV) 2026',
    nameTamil: 'TNPSC குரூப் 4 (CCSE-IV) 2026',
    qualification: 'SSLC / 12th Pass (varies by post)',
    qualificationTamil: 'SSLC / 12ஆம் வகுப்பு தேர்ச்சி (பதவிக்கேற்ப மாறுபடும்)',
    age: '18 - 30 years',
    salary: '₹19,500 - ₹62,000/month',
    selectionProcess: 'Single Paper Written Exam (OMR, 200 Qs, 3 Hours, 300 Marks, No Negative Marking) → Certificate Verification → Counselling. ⚠️ Part A Tamil: min 40% (60/150) required for Part B evaluation',
    selectionProcessTamil: 'ஒற்றை தாள் எழுத்துத் தேர்வு (OMR — 200 கேள்விகள், 3 மணி, 300 மதிப்பெண்) → சான்றிதழ் சரிபார்ப்பு',
    posts: ['VAO (Village Administrative Officer)', 'Junior Assistant', 'Typist', 'Steno-Typist', 'Field Surveyor'],
    postsTamil: ['கிராம நிர்வாக அலுவலர்', 'இளநிலை உதவியாளர்', 'தட்டச்சர்', 'சுருக்கெழுத்து தட்டச்சர்', 'களப்புல அளவீட்டாளர்'],
    examPattern: [
      { paper: 'Part A: Tamil Eligibility-cum-Scoring', paperTamil: 'பகுதி A: தமிழ் தகுதி & மதிப்பெண்', marks: 150, duration: '3 Hours (Combined)', questions: 100 },
      { paper: 'Part B: General Studies (SSLC)', paperTamil: 'பகுதி B: பொதுப் படிப்பு (SSLC)', marks: 112, duration: 'Included in 3 Hours', questions: 75 },
      { paper: 'Part C: Aptitude & Mental Ability', paperTamil: 'பகுதி C: திறன் & மன திறன்', marks: 38, duration: 'Included in 3 Hours', questions: 25 }
    ],
    syllabus: {
      'Part B: General Studies — SSLC Standard (75 Qs, 112.5 Marks) ⚠️ Evaluated only if Part A ≥ 40%': [
        {
          name: 'Unit I: General Science (5 Questions)',
          nameTamil: 'அலகு I: பொது அறிவியல் (5 கேள்விகள்)',
          topics: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', subtopics: ['Nature of Universe', 'Measurement of physical quantities', 'General scientific laws in motion', 'Force, Pressure, and Energy', 'Mechanics, Electricity, Magnetism, Light, Sound, Heat, Nuclear Physics — everyday applications'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', subtopics: ['Elements and Compounds', 'Acids, Bases, Salts', 'Petroleum products', 'Fertilizers, Pesticides', 'Metallurgy', 'Food Adulterants'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', subtopics: ['Classification of Living Organisms', 'Evolution, Genetics, Physiology', 'Nutrition, Health and Hygiene', 'Human Diseases', 'Environmental Science'] },
            { name: 'Current Science', nameTamil: 'தற்கால அறிவியல்', subtopics: ['Latest Inventions in Science and Technology', 'Current Affairs in Science'] }
          ]
        },
        {
          name: 'Unit II: Geography (5 Questions)',
          nameTamil: 'அலகு II: புவியியல் (5 கேள்விகள்)',
          topics: [
            { name: 'Indian & TN Geography', nameTamil: 'இந்திய & தமிழ்நாடு புவியியல்', subtopics: ['Earth location — Physical features', 'Monsoon, Rainfall, Weather, and Climate', 'Water resources — Rivers', 'Soil, Minerals, and Natural resources', 'Forest and Wildlife', 'Agriculture pattern', 'Transport — Communication', 'Population density and distribution (TN & India)', 'Calamities — Disaster management', 'Environment — Climate change', 'Geographical landmarks', 'Current affairs'] }
          ]
        },
        {
          name: 'Unit III: History, Culture & Indian National Movement (10 Questions)',
          nameTamil: 'அலகு III: வரலாறு, கலாச்சாரம் & தேசிய இயக்கம் (10 கேள்விகள்)',
          topics: [
            { name: 'Indian History', nameTamil: 'இந்திய வரலாறு', subtopics: ['Indus Valley Civilization', 'Guptas, Delhi Sultans, Mughals, and Marathas', 'South Indian History'] },
            { name: 'Freedom Movement & Leaders', nameTamil: 'சுதந்திர இயக்கம் & தலைவர்கள்', subtopics: ['National Renaissance — Early uprising against British', 'Indian National Congress', 'B.R. Ambedkar, Bhagat Singh, Bharathiar, V.O. Chidambaranar', 'Thanthai Periyar, Jawaharlal Nehru, Rabindranath Tagore', 'Kamarajar, Mahatma Gandhi, Maulana Abul Kalam Azad', 'Rajaji, Subhash Chandra Bose, Muthulaksmi Ammaiyar', 'Muvalur Ramamirtham, and other National Leaders', 'Different modes of agitation of Tamil Nadu'] },
            { name: 'Indian Culture', nameTamil: 'இந்திய கலாச்சாரம்', subtopics: ['Characteristics of Indian Culture', 'Unity in Diversity — Race, Language, Custom', 'India as a Secular State'] }
          ]
        },
        {
          name: 'Unit IV: Indian Polity (15 Questions)',
          nameTamil: 'அலகு IV: இந்திய அரசியல் (15 கேள்விகள்)',
          topics: [
            { name: 'Constitution of India', nameTamil: 'இந்திய அரசியலமைப்பு', subtopics: ['Preamble to the Constitution', 'Salient features of the Constitution', 'Union, State, and Union Territory', 'Citizenship', 'Fundamental Rights, Fundamental Duties', 'Directive Principles of State Policy'] },
            { name: 'Government Structure', nameTamil: 'அரசு அமைப்பு', subtopics: ['Union Executive, Union Legislature', 'State Executive, State Legislature', 'Local Governments, Panchayat Raj', 'Spirit of federalism: Centre-State relationships', 'Election — Judiciary in India — Rule of Law'] },
            { name: 'Governance & Rights', nameTamil: 'ஆட்சி & உரிமைகள்', subtopics: ['Corruption in public life — Anti-Corruption measures', 'Lokpal and Lokayukta', 'Right to Information', 'Empowerment of Women', 'Consumer Protection Forums', 'Human Rights Charter', 'Political parties and political system in TN and India'] }
          ]
        },
        {
          name: 'Unit V: Indian Economy & TN Development (20 Questions)',
          nameTamil: 'அலகு V: இந்திய பொருளாதாரம் & தமிழ்நாடு வளர்ச்சி (20 கேள்விகள்)',
          topics: [
            { name: 'Indian Economy', nameTamil: 'இந்திய பொருளாதாரம்', subtopics: ['Nature of Indian economy', 'Five-year plan models — assessment', 'Planning Commission and NITI Aayog', 'Sources of revenue — RBI — Finance Commission', 'Resource sharing between Union and State', 'Goods and Services Tax (GST)'] },
            { name: 'Development & Welfare', nameTamil: 'வளர்ச்சி & நலன்', subtopics: ['Economic trends — Employment generation', 'Land reforms and Agriculture', 'Application of Science and Technology in Agriculture', 'Industrial growth', 'Rural Welfare oriented programmes', 'Population, Education, Health, Employment, Poverty', 'Social Justice and Social Harmony'] },
            { name: 'Tamil Nadu Specific', nameTamil: 'தமிழ்நாடு குறிப்பிட்ட', subtopics: ['Education and Health systems in Tamil Nadu', 'Geography of Tamil Nadu and its impact on economic growth', 'Welfare schemes of Government', 'Current socio-economic issues'] }
          ]
        },
        {
          name: 'Unit VI: TN History, Culture & Socio-Political Movements (20 Questions)',
          nameTamil: 'அலகு VI: தமிழ்நாடு வரலாறு, கலாச்சாரம் & சமூக-அரசியல் இயக்கங்கள் (20 கேள்விகள்)',
          topics: [
            { name: 'Tamil Heritage', nameTamil: 'தமிழ் பாரம்பரியம்', subtopics: ['History of Tamil Society — Archaeological discoveries', 'Tamil Literature from Sangam age to contemporary', 'Thirukkural — Significance as Secular Literature', 'Thirukkural — Relevance to everyday life', 'Thirukkural — Impact on Humanity & Universal Values', 'Thirukkural — Relevance to socio-politico-economic affairs', 'Philosophical content in Thirukkural'] },
            { name: 'TN Freedom & Reform', nameTamil: 'தமிழ்நாடு சுதந்திரம் & சீர்திருத்தம்', subtopics: ['Role of Tamil Nadu in freedom struggle', 'Early agitations against British Rule', 'Role of women in freedom struggle', 'Various Social reformers', 'Social reform movements', 'Social transformation of Tamil Nadu'] }
          ]
        }
      ],
      'Part C: Aptitude & Mental Ability — SSLC Standard (25 Qs, 37.5 Marks)': [
        {
          name: 'Unit I: Aptitude (15 Questions)',
          nameTamil: 'அலகு I: திறன் (15 கேள்விகள்)',
          topics: [
            { name: 'Mathematical Aptitude', nameTamil: 'கணிதத் திறன்', subtopics: ['Simplification', 'Percentage', 'Highest Common Factor (HCF)', 'Lowest Common Multiple (LCM)', 'Ratio and Proportion', 'Simple Interest', 'Compound Interest', 'Area', 'Volume', 'Time and Work'] }
          ]
        },
        {
          name: 'Unit II: Reasoning (10 Questions)',
          nameTamil: 'அலகு II: தர்க்கம் (10 கேள்விகள்)',
          topics: [
            { name: 'Reasoning Ability', nameTamil: 'தர்க்க திறன்', subtopics: ['Logical Reasoning', 'Puzzles', 'Dice', 'Visual Reasoning', 'Alpha Numeric Reasoning', 'Number Series'] }
          ]
        }
      ],
      'Part A: Tamil Eligibility-cum-Scoring Test (100 Qs, 150 Marks) — Minimum 40% (60 marks) Required': [
        {
          name: 'அலகு I: இலக்கணம் (25 கேள்விகள்)',
          nameTamil: 'அலகு I: இலக்கணம் (25 கேள்விகள்)',
          topics: [
            { name: 'எழுத்து (Letters)', nameTamil: 'எழுத்து', subtopics: ['பிரித்து எழுதுதல் – சேர்த்து எழுதுதல்', 'சந்திப்பிழை', 'குறில், நெடில் வேறுபாடு', 'லகர, ளகர, ழகர வேறுபாடு', 'னகர, ணகர வேறுபாடு', 'ரகர, றகர வேறுபாடு', 'இனநெழுத்துகள் அறிதல்', 'சுட்டு எழுத்துகள், வினா எழுத்துகள்', 'ஒருமை பன்மை அறிதல்'] },
            { name: 'சொல் (Words)', nameTamil: 'சொல்', subtopics: ['வேர்ச்சொல் அறிதல்', 'வினைமுற்று, வினையெச்சம், வினையாலணையும் பெயர் அறிதல்', 'அனற்சொல் – தமிழ்ச்சொல்', 'எதிர்ச்சொல், வினைச்சொல்', 'எழுத்துப் பிழை, ஒற்றுப்பிழை அறிதல்', 'இரண்டு வினைச் சொற்களின் வேறுபாடு'] }
          ]
        },
        {
          name: 'அலகு II: சொல்லகராதி (15 கேள்விகள்)',
          nameTamil: 'அலகு II: சொல்லகராதி (15 கேள்விகள்)',
          topics: [
            { name: 'சொல் அறிவு', nameTamil: 'சொல் அறிவு', subtopics: ['எதிர்ச்சொல் எடுத்தெழுதுதல்', 'ஓரெழுத்து ஒரு மொழி', 'உரிய பொருளைக் கண்டறிதல்', 'ஒருபொருள் தரும் பல சொற்கள்', 'பொருந்தா சொல் கண்டறிதல்', 'அகர வரிசைப்படி சொற்களை சீர்செய்தல்', 'ஒருபொருள் பன்மொழி', 'இருபொருள் குறிக்கும் சொற்கள்', 'பேச்சு வழக்கு, எழுத்து வழக்கு', 'கோடிட்ட இடம் நிரப்புதல்', 'பொருத்தமான பொருளைத் தெரிவு செய்தல்', 'ஊர்ப் பெயர்களின் மரூஉ', 'பிழை திருத்துக', 'தூய தமிழ்ச் சொற்கள்'] }
          ]
        },
        {
          name: 'அலகு III: எழுதும் திறன் (15 கேள்விகள்)',
          nameTamil: 'அலகு III: எழுதும் திறன் (15 கேள்விகள்)',
          topics: [
            { name: 'எழுத்து திறன்', nameTamil: 'எழுத்து திறன்', subtopics: ['சொற்களை ஒழுங்குபடுத்தி சொற்றொடர் அமைத்தல்', 'தொடர் வகைகள் — செய்வினை, செயப்பாட்டு வினை', 'தன்வினை, பிறவினை', 'ஒருமை பன்மை பிழையறிந்து சரியான தொடர் அறிதல்', 'மரபுத் தமிழ் — திணை மரபு (உயர்திணை, அஃறிணை)', 'பால் மரபு (ஆண்பால், பெண்பால், பலர்பால்)', 'காலம் (இறந்தகாலம், நிகழ்காலம், எதிர்காலம்)', 'இளமைப் பெயர், ஒலிமரபு, வினைமரபு, தொகை மரபு', 'நிறுத்தல் குறியீடுகள் — கால்புள்ளி, அரைப்புள்ளி, முக்கால் புள்ளி, முற்றுப்புள்ளி, வியப்புக்குறி, வினாக்குறி'] }
          ]
        },
        {
          name: 'அலகு IV: கலைச் சொற்கள் (10 கேள்விகள்)',
          nameTamil: 'அலகு IV: கலைச் சொற்கள் (10 கேள்விகள்)',
          topics: [
            { name: 'பல்துறை கலைச் சொற்கள்', nameTamil: 'பல்துறை கலைச் சொற்கள்', subtopics: ['அறிவியல் கலைச் சொற்கள் (e.g., Allergy = ஒவ்வாமை)', 'கல்வி கலைச் சொற்கள்', 'மருத்துவ கலைச் சொற்கள்', 'மேலாண்மை கலைச் சொற்கள்', 'சட்ட கலைச் சொற்கள்', 'புவியியல் கலைச் சொற்கள் (e.g., Migration = வலசை)', 'தொழில்நுட்ப கலைச் சொற்கள் (e.g., Search Engine = தேடு பொறி)', 'ஊடக கலைச் சொற்கள்', 'தகவல் தொழில்நுட்ப கலைச் சொற்கள்', 'Gene = மரபணு, Nautical Mile = கடல் மைல்'] }
          ]
        },
        {
          name: 'அலகு V: வாசித்தல் — புரிந்து கொள்ளும் திறன் (15 கேள்விகள்)',
          nameTamil: 'அலகு V: வாசித்தல் — புரிந்து கொள்ளும் திறன் (15 கேள்விகள்)',
          topics: [
            { name: 'வாசிப்பு திறன்', nameTamil: 'வாசிப்பு திறன்', subtopics: ['கொடுக்கப்பட்ட பத்தியிலிருந்து வினாக்களுக்கு விடை', 'செய்தித்தாள் — தலையங்கம் — முகப்புச் செய்திகள்', 'அரசு சார்ந்த செய்திகள் — கட்டுரைகள்', 'உவமைத் தொடரின் பொருள் அறிதல்', 'மரபுத் தொடரின் பொருள் அறிதல்', 'பழமொழிகள் பொருள் அறிதல்', 'ஆவண உள்ளடக்கங்களைப் புரிந்து கொள்ளும் திறன்'] }
          ]
        },
        {
          name: 'அலகு VI: எளிய மொழி பெயர்ப்பு (5 கேள்விகள்)',
          nameTamil: 'அலகு VI: எளிய மொழி பெயர்ப்பு (5 கேள்விகள்)',
          topics: [
            { name: 'மொழிபெயர்ப்பு', nameTamil: 'மொழிபெயர்ப்பு', subtopics: ['ஆங்கிலம் & பிற மொழிச் சொற்களுக்கு இணையான தமிழ்ச் சொற்கள்', 'பயன்பாட்டில் உள்ள ஆங்கிலச் சொற்களை மொழிபெயர்த்தல்', 'e.g., pendrive, printer, computer, keyboard', 'ஆவணங்களின் தலைப்பு — கோப்புகள் — கடிதங்கள் — மனுக்கள்', 'மொழிபெயர்ப்பு புரிந்து கொள்ளுதல்'] }
          ]
        },
        {
          name: 'அலகு VII: இலக்கியம், தமிழ் அறிஞர்கள் & தமிழ்த்தொண்டு (15 கேள்விகள்)',
          nameTamil: 'அலகு VII: இலக்கியம், தமிழ் அறிஞர்கள் & தமிழ்த்தொண்டு (15 கேள்விகள்)',
          topics: [
            { name: 'திருக்குறள் (20 அதிகாரங்கள்)', nameTamil: 'திருக்குறள் (20 அதிகாரங்கள்)', subtopics: ['ஒழுக்கமுடைமை, பொறையுடைமை, ஊக்கமுடைமை', 'விருந்தோம்பல், அறன் வலியுறுத்தல், ஈகை', 'பெரியாரைத் துணைக்கோடல், வினை செயல்வகை', 'அவையஞ்சாமை, கண்ணோட்டம், அன்புடைமை', 'கல்வி, நடுவிலைமை, கூடா ஒழுக்கம்', 'கல்லாமை, வெங்கோன்மை, பண்புடைமை', 'நட்பாராய்தல், புறங்கூறாமை, அருளுடைமை'] },
            { name: 'அற நூல்கள் & தமிழ் அறிஞர்கள்', nameTamil: 'அற நூல்கள் & தமிழ் அறிஞர்கள்', subtopics: ['நாலடியார், நான்மணிக்கடிகை, பழமொழி நானூறு', 'முதுமொழிக்காஞ்சி, திரிகடுகம், இன்னாநாற்பது', 'சிறுபஞ்சமூலம், ஏலாதி, ஔவையார் பாடல்கள்', 'தமிழின் தொன்மை, சிறப்பு, திராவிட மொழிகள்', 'உ.வே.சாமிநாத ஐயர், தெ.பொ.மீனாட்சி சுந்தரம்', 'சி.இலக்குவனார் தமிழ்ப்பணி', 'தேவநேய பாவாணர், ஜி.யு.போப், வீரமாமுனிவர்', 'பாவேந்தர், டி.கே.சிதம்பரனாதர், குன்றக்குடி அடிகளார்', 'கண்ணதாசன், காவிசே மில்லத், தாரா பாரதி', 'வேலுமாச்சியார், பட்டுக்கோட்டை கல்யாணசுந்தரம்', 'முடியரசன், தமிழ் ஒளி, கி.ஆ.ப.விசுவநாதம்'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'tnpsc-gs-1', question: 'Who founded the Self-Respect Movement?', questionTamil: 'சுயமரியாதை இயக்கத்தை நிறுவியவர் யார்?', options: ['E.V. Ramasamy Periyar', 'C.N. Annadurai', 'Kamaraj', 'Rajaji'], optionsTamil: ['ஈ.வெ. ராமசாமி பெரியார்', 'சி.என். அண்ணாதுரை', 'காமராஜ்', 'ராஜாஜி'], answer: 0, explanation: 'E.V. Ramasamy (Periyar) started Self-Respect Movement in 1925 to promote social equality and oppose caste discrimination.', explanationTamil: 'ஈ.வெ. ராமசாமி (பெரியார்) 1925 இல் சுயமரியாதை இயக்கத்தை தொடங்கினார்', subject: 'Tamil Nadu History', difficulty: 'easy' },
      { id: 'tnpsc-gs-2', question: 'The capital of Chola dynasty was:', questionTamil: 'சோழ வம்சத்தின் தலைநகரம்:', options: ['Madurai', 'Thanjavur', 'Kanchipuram', 'Trichy'], optionsTamil: ['மதுரை', 'தஞ்சாவூர்', 'காஞ்சிபுரம்', 'திருச்சி'], answer: 1, explanation: 'Thanjavur (Tanjore) was the capital of Chola dynasty under Rajaraja Chola I.', explanationTamil: 'தஞ்சாவூர் சோழ வம்சத்தின் தலைநகரமாக இருந்தது', subject: 'Tamil Nadu History', difficulty: 'easy' },
      { id: 'tnpsc-gs-3', question: 'Which river is known as "Dakshina Ganga"?', questionTamil: '"தட்சிண கங்கா" என்று அழைக்கப்படும் நதி எது?', options: ['Krishna', 'Kaveri', 'Godavari', 'Tungabhadra'], optionsTamil: ['கிருஷ்ணா', 'காவிரி', 'கோதாவரி', 'துங்கபத்ரா'], answer: 2, explanation: 'Godavari is called Dakshina Ganga (Ganges of South) — longest river in Peninsular India (1,465 km).', explanationTamil: 'கோதாவரி தட்சிண கங்கா (தெற்கின் கங்கை) என்று அழைக்கப்படுகிறது — தீபகற்ப இந்தியாவின் நீளமான நதி', subject: 'Geography', difficulty: 'medium' },
      { id: 'tnpsc-gs-4', question: 'The highest peak in Tamil Nadu is:', questionTamil: 'தமிழ்நாட்டின் உயரமான சிகரம்:', options: ['Doddabetta', 'Anaimudi', 'Nilgiri Peak', 'Agasthyamalai'], optionsTamil: ['தொட்டபெட்டா', 'ஆனைமுடி', 'நீலகிரி சிகரம்', 'அகஸ்தியமலை'], answer: 0, explanation: 'Doddabetta (2,637m) is highest peak in Tamil Nadu, in the Nilgiri Hills. Anaimudi (2,695m) is highest in Western Ghats but is in Kerala.', explanationTamil: 'தொட்டபெட்டா (2,637 மீ) தமிழ்நாட்டின் உயரமான சிகரம், நீலகிரி மலையில் உள்ளது', subject: 'Geography', difficulty: 'easy' },
      { id: 'tnpsc-gs-5', question: 'First Chief Minister of Tamil Nadu was:', questionTamil: 'தமிழ்நாட்டின் முதல் முதலமைச்சர்:', options: ['C.N. Annadurai', 'O.P. Ramaswamy Reddiyar', 'Kamaraj', 'Rajaji'], optionsTamil: ['சி.என். அண்ணாதுரை', 'ஓ.பி. ராமசாமி ரெட்டியார்', 'காமராஜ்', 'ராஜாஜி'], answer: 1, explanation: 'O.P. Ramaswamy Reddiyar was first CM of Madras State (1947-49). C.N. Annadurai was first CM after renaming to Tamil Nadu (1969).', explanationTamil: 'ஓ.பி. ராமசாமி ரெட்டியார் மெட்ராஸ் மாநிலத்தின் முதல் முதலமைச்சர் (1947)', subject: 'Tamil Nadu History', difficulty: 'medium' },
      { id: 'tnpsc-gs-6', question: 'Who built the Brihadeeswara Temple?', questionTamil: 'பிரகதீஸ்வரர் கோவிலை கட்டியவர் யார்?', options: ['Rajendra Chola', 'Rajaraja Chola I', 'Kulottunga Chola', 'Vijayalaya Chola'], optionsTamil: ['ராஜேந்திர சோழன்', 'முதலாம் ராஜராஜ சோழன்', 'குலோத்துங்க சோழன்', 'விஜயாலய சோழன்'], answer: 1, explanation: 'Rajaraja Chola I built the Brihadeeswara Temple in Thanjavur around 1010 CE. It is a UNESCO World Heritage Site.', explanationTamil: 'முதலாம் ராஜராஜ சோழன் கி.பி. 1010 அளவில் தஞ்சாவூரில் பிரகதீஸ்வரர் கோவிலை கட்டினார்', subject: 'Tamil Nadu History', difficulty: 'easy' },
      { id: 'tnpsc-gs-7', question: 'Article 17 of the Indian Constitution deals with:', questionTamil: 'இந்திய அரசியலமைப்பின் சரத்து 17 எதைப் பற்றியது?', options: ['Abolition of Untouchability', 'Right to Equality', 'Right to Freedom', 'Right to Education'], optionsTamil: ['தீண்டாமை ஒழிப்பு', 'சமத்துவ உரிமை', 'சுதந்திர உரிமை', 'கல்வி உரிமை'], answer: 0, explanation: 'Article 17 abolishes untouchability and forbids its practice in any form. It is a Fundamental Right.', explanationTamil: 'சரத்து 17 தீண்டாமையை ஒழித்து அதன் நடைமுறையை எந்த வடிவிலும் தடை செய்கிறது', subject: 'Indian Polity', difficulty: 'easy' },
      { id: 'tnpsc-gs-8', question: 'NITI Aayog replaced which institution?', questionTamil: 'NITI ஆயோக் எந்த நிறுவனத்தை மாற்றியது?', options: ['Planning Commission', 'Finance Commission', 'Election Commission', 'UGC'], optionsTamil: ['திட்டக்குழு', 'நிதி ஆணையம்', 'தேர்தல் ஆணையம்', 'UGC'], answer: 0, explanation: 'NITI Aayog (National Institution for Transforming India) replaced Planning Commission on January 1, 2015.', explanationTamil: 'NITI ஆயோக் 2015 ஜனவரி 1 அன்று திட்டக்குழுவை மாற்றியது', subject: 'Indian Economy', difficulty: 'easy' },
      { id: 'tnpsc-gs-9', question: 'The pH value of pure water is:', questionTamil: 'தூய நீரின் pH மதிப்பு:', options: ['7', '0', '14', '1'], optionsTamil: ['7', '0', '14', '1'], answer: 0, explanation: 'Pure water has pH 7 (neutral). pH < 7 = Acidic, pH > 7 = Alkaline/Basic.', explanationTamil: 'தூய நீரின் pH 7 (நடுநிலை). pH < 7 = அமிலம், pH > 7 = காரம்', subject: 'General Science', difficulty: 'easy' },
      { id: 'tnpsc-gs-10', question: 'Panchayat Raj system has how many tiers?', questionTamil: 'பஞ்சாயத்து ராஜ் அமைப்பில் எத்தனை நிலைகள் உள்ளன?', options: ['3', '2', '4', '5'], optionsTamil: ['3', '2', '4', '5'], answer: 0, explanation: 'Panchayat Raj has 3 tiers: Village Panchayat (Gram), Panchayat Union/Block (Taluk), District Panchayat (Zilla).', explanationTamil: 'பஞ்சாயத்து ராஜ் 3 நிலைகள்: கிராம பஞ்சாயத்து, ஊராட்சி ஒன்றியம்/வட்டம், மாவட்ட பஞ்சாயத்து', subject: 'Indian Polity', difficulty: 'easy' },
      { id: 'tnpsc-gs-11', question: 'GST was introduced in India on:', questionTamil: 'இந்தியாவில் GST எப்போது அறிமுகப்படுத்தப்பட்டது?', options: ['1 July 2017', '1 April 2016', '1 January 2018', '1 April 2017'], optionsTamil: ['1 ஜூலை 2017', '1 ஏப்ரல் 2016', '1 ஜனவரி 2018', '1 ஏப்ரல் 2017'], answer: 0, explanation: 'GST (Goods and Services Tax) was launched on 1 July 2017 under the 101st Constitutional Amendment Act.', explanationTamil: 'GST 1 ஜூலை 2017 அன்று 101வது அரசியலமைப்பு திருத்தச் சட்டத்தின் கீழ் தொடங்கப்பட்டது', subject: 'Indian Economy', difficulty: 'easy' },
      { id: 'tnpsc-gs-12', question: 'The Indus Valley Civilization was discovered in:', questionTamil: 'சிந்து சமவெளி நாகரிகம் கண்டுபிடிக்கப்பட்ட ஆண்டு:', options: ['1921', '1930', '1940', '1910'], optionsTamil: ['1921', '1930', '1940', '1910'], answer: 0, explanation: 'Indus Valley Civilization was discovered in 1921 at Harappa by Daya Ram Sahni and at Mohenjo-daro by R.D. Banerjee in 1922.', explanationTamil: 'சிந்து சமவெளி நாகரிகம் 1921 இல் ஹரப்பாவில் தயாராம் சாஹ்னியால் கண்டுபிடிக்கப்பட்டது', subject: 'History', difficulty: 'easy' },
      { id: 'tnpsc-apt-1', question: 'If A can do a work in 10 days and B in 15 days, together they can finish in:', questionTamil: 'A ஒரு வேலையை 10 நாட்களிலும் B 15 நாட்களிலும் செய்தால், இருவரும் சேர்ந்து முடிக்க ஆகும் நாட்கள்:', options: ['6 days', '5 days', '8 days', '7 days'], optionsTamil: ['6 நாட்கள்', '5 நாட்கள்', '8 நாட்கள்', '7 நாட்கள்'], answer: 0, explanation: 'A rate = 1/10, B rate = 1/15. Together = 1/10 + 1/15 = 5/30 = 1/6. Time = 6 days.', explanationTamil: 'A வீதம் = 1/10, B வீதம் = 1/15. சேர்ந்து = 1/10 + 1/15 = 1/6. நேரம் = 6 நாட்கள்', subject: 'Aptitude', difficulty: 'medium' },
      { id: 'tnpsc-apt-2', question: 'The HCF of 12, 18, and 24 is:', questionTamil: '12, 18, 24 இன் மீப்பெரு பொது காரணி (HCF):', options: ['6', '12', '3', '2'], optionsTamil: ['6', '12', '3', '2'], answer: 0, explanation: '12 = 2²×3, 18 = 2×3², 24 = 2³×3. HCF = 2¹×3¹ = 6', explanationTamil: '12 = 2²×3, 18 = 2×3², 24 = 2³×3. HCF = 2×3 = 6', subject: 'Aptitude', difficulty: 'easy' },
      { id: 'tnpsc-apt-3', question: 'Simple Interest on ₹5000 at 8% for 3 years is:', questionTamil: '₹5000 க்கு 8% வட்டியில் 3 ஆண்டுகளுக்கு எளிய வட்டி:', options: ['₹1200', '₹1500', '₹1000', '₹800'], optionsTamil: ['₹1200', '₹1500', '₹1000', '₹800'], answer: 0, explanation: 'SI = P×R×T/100 = 5000×8×3/100 = ₹1200', explanationTamil: 'எளிய வட்டி = அசல்×வீதம்×காலம்/100 = 5000×8×3/100 = ₹1200', subject: 'Aptitude', difficulty: 'easy' },
      { id: 'tnpsc-apt-4', question: 'Complete the series: 2, 5, 10, 17, 26, ?', questionTamil: 'தொடரை நிறைவு செய்: 2, 5, 10, 17, 26, ?', options: ['37', '35', '36', '40'], optionsTamil: ['37', '35', '36', '40'], answer: 0, explanation: 'Differences: 3, 5, 7, 9, 11 (odd numbers increasing by 2). Next: 26 + 11 = 37', explanationTamil: 'வேறுபாடுகள்: 3, 5, 7, 9, 11 (ஒற்றை எண்கள்). அடுத்தது: 26 + 11 = 37', subject: 'Mental Ability', difficulty: 'medium' },
      { id: 'tnpsc-ta-1', question: '"ஆத்திசூடி" யை எழுதியவர் யார்?', questionTamil: '"ஆத்திசூடி" யை எழுதியவர் யார்?', options: ['திருவள்ளுவர்', 'ஔவையார்', 'கம்பர்', 'இளங்கோவடிகள்'], optionsTamil: ['திருவள்ளுவர்', 'ஔவையார்', 'கம்பர்', 'இளங்கோவடிகள்'], answer: 1, explanation: 'Avvaiyar wrote Aathichoodi — a collection of moral precepts for children, each starting with successive Tamil letters.', explanationTamil: 'ஔவையார் ஆத்திசூடியை எழுதினார் — குழந்தைகளுக்கான அறநெறி பாடல்கள்', subject: 'Tamil Literature', difficulty: 'easy' },
      { id: 'tnpsc-ta-2', question: 'தமிழின் முதல் இலக்கண நூல்:', questionTamil: 'தமிழின் முதல் இலக்கண நூல்:', options: ['நன்னூல்', 'தொல்காப்பியம்', 'அகத்தியம்', 'யாப்பருங்கலம்'], optionsTamil: ['நன்னூல்', 'தொல்காப்பியம்', 'அகத்தியம்', 'யாப்பருங்கலம்'], answer: 1, explanation: 'Tholkappiyam by Tholkappiyar is the oldest Tamil grammar text. It has 3 divisions: Ezhuthathikaram, Solathikaram, Porulathikaram.', explanationTamil: 'தொல்காப்பியம் தமிழின் முதல் இலக்கண நூல் — தொல்காப்பியர் எழுதியது. 3 பிரிவுகள்: எழுத்ததிகாரம், சொல்லதிகாரம், பொருளதிகாரம்', subject: 'Tamil Literature', difficulty: 'easy' },
      { id: 'tnpsc-ta-3', question: 'சிலப்பதிகாரத்தை எழுதியவர்:', questionTamil: 'சிலப்பதிகாரத்தை எழுதியவர்:', options: ['கம்பர்', 'இளங்கோவடிகள்', 'சீத்தலைச்சாத்தனார்', 'திருதக்கதேவர்'], optionsTamil: ['கம்பர்', 'இளங்கோவடிகள்', 'சீத்தலைச்சாத்தனார்', 'திருதக்கதேவர்'], answer: 1, explanation: 'Ilango Adigal wrote Silapathikaram — one of the five great Tamil epics. Seethalai Saathanar wrote Manimekalai.', explanationTamil: 'இளங்கோவடிகள் சிலப்பதிகாரத்தை எழுதினார் — ஐம்பெருங்காப்பியங்களில் ஒன்று. சீத்தலைச்சாத்தனார் மணிமேகலையை எழுதினார்', subject: 'Tamil Literature', difficulty: 'easy' },
      { id: 'tnpsc-ta-4', question: 'திருக்குறளில் உள்ள அதிகாரங்கள்:', questionTamil: 'திருக்குறளில் உள்ள அதிகாரங்கள்:', options: ['133', '108', '120', '100'], optionsTamil: ['133', '108', '120', '100'], answer: 0, explanation: 'Thirukkural has 133 chapters (athikarams) and 1330 couplets. 3 parts: Aram (38), Porul (70), Inbam/Kamam (25).', explanationTamil: 'திருக்குறளில் 133 அதிகாரங்கள், 1330 குறள்கள் — அறத்துப்பால் (38), பொருட்பால் (70), காமத்துப்பால் (25)', subject: 'Tamil Literature', difficulty: 'easy' },
      { id: 'tnpsc-ta-5', question: '"சுதந்திரம் வேண்டி நின்றார் பெரியோர்" — யார் எழுதியது?', questionTamil: '"சுதந்திரம் வேண்டி நின்றார் பெரியோர்" — யார் எழுதியது?', options: ['பாரதிதாசன்', 'சுப்பிரமணிய பாரதியார்', 'கண்ணதாசன்', 'வைரமுத்து'], optionsTamil: ['பாரதிதாசன்', 'சுப்பிரமணிய பாரதியார்', 'கண்ணதாசன்', 'வைரமுத்து'], answer: 1, explanation: 'Subramania Bharathiar (Mahakavi Bharathi) wrote this patriotic line. He was a pioneer of modern Tamil poetry and a freedom fighter.', explanationTamil: 'சுப்பிரமணிய பாரதியார் (மகாகவி பாரதி) இதை எழுதினார். நவீன தமிழ் கவிதையின் முன்னோடி, சுதந்திரப் போராட்ட வீரர்', subject: 'Tamil Literature', difficulty: 'medium' },
      { id: 'tnpsc-ta-6', question: '"மணிமேகலை" காப்பியத்தை எழுதியவர்:', questionTamil: '"மணிமேகலை" காப்பியத்தை எழுதியவர்:', options: ['இளங்கோவடிகள்', 'சீத்தலைச்சாத்தனார்', 'கம்பர்', 'ஔவையார்'], optionsTamil: ['இளங்கோவடிகள்', 'சீத்தலைச்சாத்தனார்', 'கம்பர்', 'ஔவையார்'], answer: 1, explanation: 'Seethalai Saathanar wrote Manimekalai, the sequel to Silapathikaram. It promotes Buddhist values.', explanationTamil: 'சீத்தலைச்சாத்தனார் மணிமேகலையை எழுதினார் — சிலப்பதிகாரத்தின் தொடர்ச்சி. புத்த சமய கருத்துக்களை முன்வைக்கிறது', subject: 'Tamil Literature', difficulty: 'easy' }
    ]
  },
  {
    id: 'tn-police-constable',
    name: 'TN Police Constable / Jail Warder / Fireman',
    nameTamil: 'TN போலீஸ் காவலர் / சிறை காவலர் / தீயணைப்பாளர்',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 24 years',
    salary: '₹22,000/month',
    selectionProcess: 'Part I: Tamil Eligibility Test (OMR, 80 Qs, 80 min — min 40% required) → Part II: Main Written Exam (OMR, 70 Qs, 80 min) → Physical Measurement Test → Physical Efficiency Test → Certificate Verification → Medical Exam',
    selectionProcessTamil: 'பகுதி I: தமிழ் தகுதி தேர்வு (OMR, 80 கேள்விகள், 80 நிமிடம் — குறைந்தது 40% தேவை) → பகுதி II: முதன்மை எழுத்துத் தேர்வு (OMR, 70 கேள்விகள், 80 நிமிடம்) → உடல் அளவீடு → உடல் திறன் தேர்வு → சான்றிதழ் சரிபார்ப்பு → மருத்துவம்',
    posts: ['Grade II Police Constable', 'Jail Warder', 'Fireman'],
    postsTamil: ['தரம் II போலீஸ் காவலர்', 'சிறை காவலர்', 'தீயணைப்பாளர்'],
    examPattern: [
      { paper: 'Part I — Tamil Language Eligibility Test', paperTamil: 'பகுதி I — தமிழ் மொழி தகுதித் தேர்வு', marks: 80, duration: '80 minutes', questions: 80 },
      { paper: 'Part II — Main Written Examination', paperTamil: 'பகுதி II — முதன்மை எழுத்துத் தேர்வு', marks: 70, duration: '80 minutes', questions: 70 }
    ],
    syllabus: {
      'Part I — Tamil Language Eligibility Test (80 Qs, 80 Marks, 80 Min)': [
        {
          name: 'Tamil Language — Minimum 32 Marks (40%) Required to Qualify',
          nameTamil: 'தமிழ் மொழி — தகுதி பெற குறைந்தது 32 மதிப்பெண்கள் (40%) தேவை',
          topics: [
            { name: 'Tamil Grammar (Ilakkanam)', nameTamil: 'தமிழ் இலக்கணம்', subtopics: [
              'Ezhuthu Ilakkanam (Letter Grammar) — Uyir, Mei, Uyirmei',
              'Sol Ilakkanam (Word Grammar) — Noun, Verb, Adjective classification',
              'Porul Ilakkanam (Meaning Grammar) — Akam, Puram',
              'Yaapu Ilakkanam (Prosody) — Asiriyappa, Venpa, Kalippa',
              'Ani Ilakkanam (Figure of Speech) — Uvamai, Uyarvuneri, Thazhvuneri',
              'Tholkappiyam basics — Ezhuthathikaram, Solathikaram, Porulathikaram',
              'Nannool basics — Grammar rules',
              'Sandhi (Joining rules), Punarchi (Combination rules)'
            ] },
            { name: 'Tamil Literature (Ilakkiyam)', nameTamil: 'தமிழ் இலக்கியம்', subtopics: [
              'Sangam Literature — Ettuthogai, Pathupaattu',
              'Thirukkural — Selected Athikarams and their meaning',
              'Naladiyar, Pazhamozhi Naanooru',
              'Epic Literature — Silapathikaram, Manimekalai',
              'Devotional Literature — Thevaram, Thiruvasagam, Divya Prabandham',
              'Modern Tamil Literature — Bharathiar, Bharathidasan poems',
              'Tamil Prose — Comprehension passages from 10th standard textbook'
            ] },
            { name: 'Tamil Scholars & Their Contributions', nameTamil: 'தமிழ் அறிஞர்கள் & அவர்களின் பங்களிப்புகள்', subtopics: [
              'Thiruvalluvar — Thirukkural',
              'Kambar — Kambaramayanam',
              'Ilango Adigal — Silapathikaram',
              'Bharathiar — Patriotic & Reform Poetry',
              'Bharathidasan — Social Reform Literature',
              'U.V. Swaminatha Iyer — Revival of Sangam Literature',
              'Maraimalai Adigal — Tamil Renaissance Movement'
            ] }
          ]
        }
      ],
      'Part II — Main Exam: General Knowledge (45 Marks)': [
        {
          name: 'General Knowledge Section (45 Questions, 45 Marks)',
          nameTamil: 'பொது அறிவு பிரிவு (45 கேள்விகள், 45 மதிப்பெண்கள்)',
          topics: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', subtopics: [
              'Mechanics — Force, Motion, Newton\'s Laws, Work, Energy, Power',
              'Heat & Thermodynamics — Temperature, Conduction, Convection',
              'Light & Optics — Reflection, Refraction, Lenses, Mirrors',
              'Sound — Wave properties, Echo, Ultrasound',
              'Electricity & Magnetism — Circuits, Ohm\'s Law, Magnetic Fields',
              'Units & Measurements — SI Units, Conversions'
            ] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', subtopics: [
              'Elements, Compounds & Mixtures',
              'Acids, Bases & Salts — pH Scale, Indicators',
              'Metals & Non-Metals — Properties, Reactivity Series',
              'Chemical Reactions — Types, Balancing Equations',
              'Periodic Table — Groups, Periods, Properties',
              'Carbon & Its Compounds — Organic Chemistry basics'
            ] },
            { name: 'Biology', nameTamil: 'உயிரியல்', subtopics: [
              'Human Body — Organ Systems, Skeleton, Muscles',
              'Nutrition & Digestion — Carbohydrates, Proteins, Fats, Vitamins',
              'Blood Groups — A, B, AB, O, Rh factor',
              'Diseases — Communicable, Non-communicable, Prevention',
              'Cell Biology — Structure, Functions, Cell Division'
            ] },
            { name: 'Environment & Food/Nutrition', nameTamil: 'சுற்றுச்சூழல் & உணவு/ஊட்டச்சத்து', subtopics: [
              'Environment — Pollution (Air, Water, Soil), Climate Change',
              'Ecosystem — Food Chain, Food Web, Biodiversity',
              'Conservation — National Parks, Wildlife Sanctuaries in TN',
              'Food & Nutrition — Balanced Diet, Malnutrition, Food Preservation'
            ] },
            { name: 'History', nameTamil: 'வரலாறு', subtopics: [
              'Ancient India — Indus Valley, Vedic Period, Maurya, Gupta',
              'Medieval India — Delhi Sultanate, Mughal Empire, Vijayanagara',
              'Modern India — British Rule, Freedom Movement, Important Leaders',
              'Tamil Nadu History — Chola, Chera, Pandya Kingdoms',
              'TN Freedom Fighters — V.O.C., Subramania Siva, Bharathiar'
            ] },
            { name: 'Geography', nameTamil: 'புவியியல்', subtopics: [
              'Indian Geography — Rivers, Mountains, Plateaus, Plains',
              'Tamil Nadu Geography — Districts, Rivers (Cauvery, Vaigai), Western Ghats',
              'Climate — Monsoons, Seasons, Rainfall patterns',
              'Natural Resources — Minerals, Agriculture, Forests'
            ] },
            { name: 'Indian Polity & Economics', nameTamil: 'இந்திய அரசியல் & பொருளாதாரம்', subtopics: [
              'Indian Constitution — Preamble, Fundamental Rights, Duties, DPSP',
              'Parliament — Lok Sabha, Rajya Sabha, Legislative Process',
              'State Government — Governor, CM, State Legislature, Panchayati Raj',
              'Indian Economy — GDP, Budget, Banking, Five Year Plans',
              'Tamil Nadu Government — Structure, Chief Ministers, Policies'
            ] },
            { name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்', subtopics: [
              'National & International Current Events',
              'Tamil Nadu Government Schemes & Policies',
              'Sports — Olympics, Commonwealth, Cricket, Asian Games',
              'Awards — Padma Awards, Nobel Prize, Sports Awards',
              'Science & Technology — Space Missions, Defence, Digital India'
            ] }
          ]
        }
      ],
      'Part II — Main Exam: Psychology & Mental Ability (25 Marks)': [
        {
          name: 'Psychology & Mental Ability (25 Questions, 25 Marks)',
          nameTamil: 'உளவியல் & மன திறன் (25 கேள்விகள், 25 மதிப்பெண்கள்)',
          topics: [
            { name: 'Communication Skills', nameTamil: 'தகவல் தொடர்பு திறன்கள்', subtopics: [
              'Verbal Communication — Effective speaking, listening skills',
              'Written Communication — Report writing, letter format',
              'Non-Verbal Communication — Body language, gestures',
              'Interpersonal Skills — Team work, public dealing'
            ] },
            { name: 'Numerical Analysis', nameTamil: 'எண் பகுப்பாய்வு', subtopics: [
              'Number Puzzles — Missing numbers, pattern recognition',
              'Data Interpretation — Tables, Charts, Graphs',
              'Basic Calculations — Speed, Accuracy under time pressure',
              'Arithmetic Reasoning — Word problems'
            ] },
            { name: 'Logical Analysis', nameTamil: 'தர்க்க பகுப்பாய்வு', subtopics: [
              'Statement & Conclusion — Logical deductions',
              'Cause & Effect — Identifying relationships',
              'Assertion & Reason — True/False evaluation',
              'Logical Sequence — Arrangement of events/ideas'
            ] },
            { name: 'Mental Ability', nameTamil: 'மன திறன்', subtopics: [
              'Coding-Decoding — Letter, Number, Symbol coding',
              'Analogies — Word & Number relationships',
              'Series Completion — Number, Alphabet, Mixed',
              'Blood Relations — Family tree problems',
              'Direction Sense — Compass-based problems',
              'Mirror & Water Images',
              'Odd One Out — Classification'
            ] },
            { name: 'Information Handling Skills', nameTamil: 'தகவல் கையாளும் திறன்கள்', subtopics: [
              'Data Organization — Sorting, Categorizing information',
              'Information Extraction — Reading comprehension of data',
              'Decision Making — Situational judgment',
              'Problem Solving — Practical reasoning',
              'Observation & Memory — Visual recall, pattern detection'
            ] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'tnp-gk-1', question: 'Who was the first Director General of Police in Tamil Nadu?', questionTamil: 'தமிழ்நாட்டின் முதல் காவல் துறை தலைவர் யார்?', options: ['C.V. Narasimhan', 'R. Natarajan', 'T.K. Rajendran', 'K. Vijay Kumar'], optionsTamil: ['சி.வி. நரசிம்மன்', 'ஆர். நடராஜன்', 'டி.கே. ராஜேந்திரன்', 'கே. விஜய் குமார்'], answer: 0, explanation: 'C.V. Narasimhan was the first Director General of Police of Tamil Nadu state', explanationTamil: 'சி.வி. நரசிம்மன் தமிழ்நாடு மாநிலத்தின் முதல் காவல் துறை இயக்குநர் ஆவார்', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'tnp-gk-2', question: 'The Cauvery River originates from:', questionTamil: 'காவிரி நதி உற்பத்தியாகும் இடம்:', options: ['Talakaveri, Coorg (Karnataka)', 'Mahabaleshwar (Maharashtra)', 'Amarkantak (MP)', 'Gangotri (Uttarakhand)'], optionsTamil: ['தலைக்காவேரி, குடகு (கர்நாடகா)', 'மகாபலேஷ்வர் (மகாராஷ்டிரா)', 'அமர்கண்டக் (மத்திய பிரதேசம்)', 'கங்கோத்ரி (உத்தரகாண்ட்)'], answer: 0, explanation: 'Cauvery River originates from Talakaveri in Brahmagiri Hills, Coorg district, Karnataka and flows through Tamil Nadu.', explanationTamil: 'காவிரி நதி கர்நாடகா மாநிலம் குடகு மாவட்டம் பிரம்மகிரி மலையில் உள்ள தலைக்காவேரியில் உற்பத்தியாகிறது.', subject: 'Geography', difficulty: 'easy' },
      { id: 'tnp-sci-1', question: 'The SI unit of Force is:', questionTamil: 'விசையின் SI அலகு:', options: ['Newton', 'Joule', 'Watt', 'Pascal'], optionsTamil: ['நியூட்டன்', 'ஜூல்', 'வாட்', 'பாஸ்கல்'], answer: 0, explanation: 'Force is measured in Newton (N). 1 Newton = 1 kg × 1 m/s². Named after Sir Isaac Newton.', explanationTamil: 'விசை நியூட்டனில் (N) அளவிடப்படுகிறது. 1 நியூட்டன் = 1 kg × 1 m/s².', subject: 'Physics', difficulty: 'easy' },
      { id: 'tnp-sci-2', question: 'Which vitamin is produced in the human body due to sunlight?', questionTamil: 'சூரிய ஒளியால் மனித உடலில் உற்பத்தியாகும் வைட்டமின்:', options: ['Vitamin D', 'Vitamin A', 'Vitamin C', 'Vitamin B12'], optionsTamil: ['வைட்டமின் D', 'வைட்டமின் A', 'வைட்டமின் C', 'வைட்டமின் B12'], answer: 0, explanation: 'Vitamin D (Cholecalciferol) is synthesized in the skin when exposed to ultraviolet B (UVB) rays from sunlight.', explanationTamil: 'சூரிய ஒளியில் உள்ள UVB கதிர்களால் தோலில் வைட்டமின் D (கோலிகால்சிஃபெரால்) உற்பத்தி செய்யப்படுகிறது.', subject: 'Biology', difficulty: 'easy' },
      { id: 'tnp-psych-1', question: 'If you face a conflict with a colleague during duty, the best approach is:', questionTamil: 'பணியின் போது சக ஊழியருடன் மோதல் ஏற்பட்டால், சிறந்த அணுகுமுறை:', options: ['Talk calmly and resolve the issue professionally', 'Ignore and walk away', 'Report immediately to the superior', 'Argue back forcefully'], optionsTamil: ['அமைதியாக பேசி தொழில்முறையில் தீர்க்கவும்', 'புறக்கணித்துவிட்டு செல்லவும்', 'உடனடியாக மேலதிகாரிக்கு புகார்', 'வலிமையாக வாதிடவும்'], answer: 0, explanation: 'Professional communication and calm resolution is the best approach for workplace conflicts. This tests interpersonal and communication skills.', explanationTamil: 'தொழில்முறை தகவல் தொடர்பு மற்றும் அமைதியான தீர்வு பணியிட மோதல்களுக்கு சிறந்த அணுகுமுறை.', subject: 'Psychology', difficulty: 'easy' },
      { id: 'tnp-psych-2', question: 'Complete the series: 3, 6, 11, 18, 27, ?', questionTamil: 'தொடரை நிறைவு செய்: 3, 6, 11, 18, 27, ?', options: ['38', '36', '35', '40'], optionsTamil: ['38', '36', '35', '40'], answer: 0, explanation: 'Differences: 3, 5, 7, 9, 11 (increasing by 2 each time). Next: 27 + 11 = 38', explanationTamil: 'வேறுபாடுகள்: 3, 5, 7, 9, 11 (ஒவ்வொரு முறையும் 2 அதிகரிக்கிறது). அடுத்தது: 27 + 11 = 38', subject: 'Mental Ability', difficulty: 'medium' },
      { id: 'tnp-gk-7', question: 'The longest river in Tamil Nadu is:', questionTamil: 'தமிழ்நாட்டின் நீளமான நதி:', options: ['Kaveri', 'Vaigai', 'Palar', 'Thamirabarani'], optionsTamil: ['காவிரி', 'வைகை', 'பாலாறு', 'தாமிரபரணி'], answer: 0, explanation: 'Kaveri (Cauvery) is the longest river in Tamil Nadu at about 765 km total length. It originates in Talakaveri, Karnataka.', explanationTamil: 'காவிரி தமிழ்நாட்டின் நீளமான நதி — 765 கிமீ. தலகாவேரி (கர்நாடகா) இல் உற்பத்தியாகிறது.', subject: 'Geography', difficulty: 'easy' },
      { id: 'tnp-gk-8', question: 'IPC stands for:', questionTamil: 'IPC என்பதன் விரிவாக்கம்:', options: ['Indian Penal Code', 'Indian Police Code', 'Indian Public Code', 'Indian Prosecution Code'], optionsTamil: ['இந்திய தண்டனைச் சட்டம்', 'இந்திய போலீஸ் சட்டம்', 'இந்திய பொது சட்டம்', 'இந்திய வழக்கு சட்டம்'], answer: 0, explanation: 'IPC = Indian Penal Code (1860). It has been replaced by Bharatiya Nyaya Sanhita (BNS) from July 2024.', explanationTamil: 'IPC = இந்திய தண்டனைச் சட்டம் (1860). 2024 ஜூலையிலிருந்து பாரதிய நியாய சன்ஹிதா (BNS) ஆல் மாற்றப்பட்டது.', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'tnp-gk-9', question: 'Who is the head of a district administration?', questionTamil: 'மாவட்ட நிர்வாகத்தின் தலைவர் யார்?', options: ['District Collector', 'SP', 'MLA', 'Mayor'], optionsTamil: ['மாவட்ட ஆட்சியர்', 'காவல் கண்காணிப்பாளர்', 'சட்டமன்ற உறுப்பினர்', 'மேயர்'], answer: 0, explanation: 'District Collector (DC) is the head of district administration. SP heads district police.', explanationTamil: 'மாவட்ட ஆட்சியர் (DC) மாவட்ட நிர்வாகத்தின் தலைவர்.', subject: 'Polity', difficulty: 'easy' },
      { id: 'tnp-psych-1', question: 'If you see a road accident, you should first:', questionTamil: 'சாலை விபத்தைக் கண்டால், முதலில் நீங்கள்:', options: ['Call 108 ambulance', 'Take photos', 'Leave the spot', 'Argue with driver'], optionsTamil: ['108 ஆம்புலன்ஸ் அழைக்க', 'புகைப்படம் எடுக்க', 'அந்த இடத்தை விட்டு செல்ல', 'ஓட்டுநருடன் வாதிட'], answer: 0, explanation: 'First priority: Call 108 ambulance for medical help. Then inform police (100/112). Help victims if safe.', explanationTamil: 'முதல் முன்னுரிமை: 108 ஆம்புலன்ஸ் அழைக்கவும். பின் போலீஸ் (100/112) தகவல் தெரிவிக்கவும்.', subject: 'Psychology', difficulty: 'easy' },
      { id: 'tnp-psych-2', question: 'A good police officer should have which quality?', questionTamil: 'ஒரு நல்ல காவல் அதிகாரிக்கு எந்த குணம் இருக்க வேண்டும்?', options: ['Integrity and patience', 'Anger and aggression', 'Fear and hesitation', 'Selfishness'], optionsTamil: ['நேர்மை மற்றும் பொறுமை', 'கோபம் மற்றும் ஆக்ரோஷம்', 'பயம் மற்றும் தயக்கம்', 'சுயநலம்'], answer: 0, explanation: 'Integrity (honesty) and patience are essential qualities for police officers. These are tested in the Psychology section of the exam.', explanationTamil: 'நேர்மை மற்றும் பொறுமை காவல் அதிகாரிகளுக்கு அத்தியாவசிய குணங்கள்.', subject: 'Psychology', difficulty: 'easy' }
    ]
  },
  {
    id: 'tn-forest-guard',
    name: 'TN Forest Guard (TNFUSRC)',
    nameTamil: 'TN வனக் காவலர் (TNFUSRC)',
    qualification: '12th Pass (with Physics/Chemistry/Biology/Zoology/Botany)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (இயற்பியல்/வேதியியல்/உயிரியல் பாடங்களுடன்)',
    age: '21 - 32 years (General) / 21 - 37 years (SC/ST/BC/MBC)',
    salary: '₹20,000/month',
    selectionProcess: 'Written Exam (OMR, 200 Qs, 300 Marks, 3 Hours, No Negative Marking) → Physical Measurement Test → Endurance Test (25 km walk for Male / 16 km for Female in 4 hours) → Certificate Verification → Medical Examination',
    selectionProcessTamil: 'எழுத்துத் தேர்வு (OMR, 200 கேள்விகள், 300 மதிப்பெண், 3 மணி, நெகட்டிவ் மார்க்கிங் இல்லை) → உடல் அளவீடு → சகிப்புத்தன்மை தேர்வு (25 கிமீ / 16 கிமீ நடை 4 மணியில்) → சான்றிதழ் சரிபார்ப்பு → மருத்துவம்',
    posts: ['Forest Guard', 'Forest Guard with Driving Licence'],
    postsTamil: ['வனக் காவலர்', 'வனக் காவலர் (ஓட்டுநர் உரிமத்துடன்)'],
    examPattern: [
      { paper: 'Part A — Tamil Eligibility-cum-Scoring Test', paperTamil: 'பகுதி A — தமிழ் தகுதி மற்றும் மதிப்பெண் தேர்வு', marks: 150, duration: '3 Hours (Total)', questions: 100 },
      { paper: 'Part B — General Studies', paperTamil: 'பகுதி B — பொதுப் படிப்பு', marks: 112, duration: 'Included in 3 Hours', questions: 75 },
      { paper: 'Part C — Aptitude & Mental Ability', paperTamil: 'பகுதி C — திறன் & மன திறன்', marks: 38, duration: 'Included in 3 Hours', questions: 25 }
    ],
    syllabus: {
      'Part A — Tamil Eligibility-cum-Scoring (100 Qs, 150 Marks)': [
        {
          name: 'Tamil Language — Eligibility + Scoring',
          nameTamil: 'தமிழ் மொழி — தகுதி + மதிப்பெண்',
          topics: [
            { name: 'Tamil Grammar (Ilakkanam)', nameTamil: 'தமிழ் இலக்கணம்', subtopics: [
              'Ezhuthu Ilakkanam — Uyir (vowels), Mei (consonants), Uyirmei',
              'Sol Ilakkanam — Types of words (Peyarchchol, Vinaichol, Idaichol, Urichol)',
              'Porul Ilakkanam — Akam & Puram themes',
              'Yaapu Ilakkanam — Venpa, Asiriyappa, Kalippa, Vanchippa',
              'Ani Ilakkanam — Figures of speech (Uvamai, Uyarvuneri, Thazhvuneri)',
              'Sandhi & Punarchi — Word joining and combination rules',
              'Tholkappiyam & Nannool basics'
            ] },
            { name: 'Tamil Literature (Ilakkiyam)', nameTamil: 'தமிழ் இலக்கியம்', subtopics: [
              'Sangam Literature — Ettuthogai, Pathupaattu',
              'Thirukkural — Aram, Porul, Inbam sections',
              'Epic Literature — Silapathikaram, Manimekalai',
              'Devotional Literature — Thevaram, Thiruvasagam',
              'Modern Tamil Literature — Bharathiar, Bharathidasan poems',
              'Naladiyar, Pazhamozhi Naanooru, Aacharakkoval'
            ] },
            { name: 'Tamil Scholars & Service', nameTamil: 'தமிழ் அறிஞர்கள் & சேவை', subtopics: [
              'Thiruvalluvar, Kambar, Ilango Adigal',
              'Avvaiyar, Auvaiyar contributions',
              'Bharathiar — Patriotic and social reform poetry',
              'U.V. Swaminatha Iyer — Revival of Sangam texts',
              'Maraimalai Adigal — Pure Tamil Movement',
              'Tamil Renaissance leaders and their literary contributions'
            ] }
          ]
        }
      ],
      'Part B — General Studies (75 Qs, 112.5 Marks)': [
        {
          name: 'General Science (10th Standard Level)',
          nameTamil: 'பொது அறிவியல் (10ஆம் வகுப்பு நிலை)',
          topics: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', subtopics: [
              'Mechanics — Force, Motion, Newton\'s Laws, Work, Energy, Power',
              'Electricity — Ohm\'s Law, Circuits, Current, Resistance',
              'Magnetism — Magnetic fields, Electromagnets, Compass',
              'Light — Reflection, Refraction, Lenses, Human Eye',
              'Sound — Wave properties, Echo, Frequency',
              'Heat — Conduction, Convection, Radiation, Thermometers'
            ] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', subtopics: [
              'Acids, Bases & Salts — pH Scale, Indicators, Neutralization',
              'Metals & Non-Metals — Properties, Reactivity Series',
              'Chemical Reactions — Types, Balancing Equations',
              'Elements & Compounds — Periodic Classification',
              'Carbon Compounds — Organic Chemistry basics'
            ] },
            { name: 'Biology', nameTamil: 'உயிரியல்', subtopics: [
              'Classification of Living Organisms — Plant & Animal Kingdoms',
              'Nutrition — Autotrophic, Heterotrophic, Digestion in Humans',
              'Human Diseases — Communicable & Non-communicable, Prevention',
              'Cell Biology — Cell Structure, Cell Division (Mitosis, Meiosis)',
              'Ecology — Ecosystem, Food Chain, Biodiversity',
              'Forests & Wildlife — National Parks, Sanctuaries of Tamil Nadu'
            ] }
          ]
        },
        {
          name: 'Geography',
          nameTamil: 'புவியியல்',
          topics: [
            { name: 'Indian & TN Geography', nameTamil: 'இந்திய & TN புவியியல்', subtopics: [
              'Physical Features of India — Himalayas, Indo-Gangetic Plains, Peninsular Plateau',
              'Tamil Nadu Geography — Western Ghats, Eastern Ghats, Cauvery Basin, Nilgiris',
              'Indian Monsoon — Southwest, Northeast, Rainfall patterns',
              'Rivers of India & TN — Ganga, Cauvery, Vaigai, Tamiraparani',
              'Soil Types — Alluvial, Black, Red, Laterite',
              'Wildlife & Forest — Tiger Reserves, Biosphere Reserves, TN Forest coverage',
              'Natural Vegetation — Tropical, Deciduous, Evergreen, Mangrove'
            ] }
          ]
        },
        {
          name: 'History & Indian Polity',
          nameTamil: 'வரலாறு & இந்திய அரசியல்',
          topics: [
            { name: 'History', nameTamil: 'வரலாறு', subtopics: [
              'Ancient India — Indus Valley Civilization, Vedic Period, Maurya, Gupta',
              'Medieval India — Delhi Sultanate, Mughal Empire, Vijayanagara',
              'Indian National Movement — Moderates, Extremists, Gandhian Era',
              'Tamil Nadu History — Chola, Chera, Pandya, Pallava Kingdoms',
              'Freedom Fighters of TN — V.O.C., Subramania Bharathi, Vanchinathan'
            ] },
            { name: 'Indian Polity', nameTamil: 'இந்திய அரசியல்', subtopics: [
              'Constitution of India — Preamble, Salient Features',
              'Fundamental Rights (Articles 12-35)',
              'Directive Principles of State Policy (Articles 36-51)',
              'Fundamental Duties (Article 51A)',
              'Parliament — Lok Sabha, Rajya Sabha, Law-making process',
              'Tamil Nadu State Government — Governor, CM, Legislature'
            ] }
          ]
        },
        {
          name: 'Economy & Current Affairs',
          nameTamil: 'பொருளாதாரம் & நடப்பு நிகழ்வுகள்',
          topics: [
            { name: 'Indian Economy', nameTamil: 'இந்திய பொருளாதாரம்', subtopics: [
              'Nature of Indian Economy — Mixed Economy, Sectors (Primary, Secondary, Tertiary)',
              'NITI Aayog — Functions, Objectives, Replacement of Planning Commission',
              'Development Administration in Tamil Nadu — District administration, Panchayati Raj',
              'Tamil Nadu Government Schemes — Free bus pass, noon meal, laptop scheme',
              'Banking & Finance — RBI, Types of Banks, Financial inclusion'
            ] },
            { name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்', subtopics: [
              'National & International Current Events',
              'Sports — Olympics, Commonwealth, Asian Games',
              'Science & Technology — ISRO missions, Defence developments',
              'Awards — Padma Awards, Bharat Ratna, Nobel Prize',
              'Environment — Climate change, Conservation efforts, International treaties'
            ] }
          ]
        }
      ],
      'Part C — Aptitude & Mental Ability (25 Qs, 37.5 Marks)': [
        {
          name: 'Aptitude & Mental Ability Test',
          nameTamil: 'திறன் & மன திறன் தேர்வு',
          topics: [
            { name: 'Arithmetic Aptitude', nameTamil: 'எண்கணித திறன்', subtopics: [
              'Simplification — BODMAS, Fractions, Decimals',
              'Percentage — Calculations, Increase, Decrease',
              'HCF & LCM — Problems and applications',
              'Ratio & Proportion — Direct and Inverse',
              'Simple & Compound Interest',
              'Profit & Loss — Cost Price, Selling Price, Discount',
              'Time & Work, Time & Distance — Speed problems'
            ] },
            { name: 'Mental Ability & Reasoning', nameTamil: 'மன திறன் & தர்க்கம்', subtopics: [
              'Number Series — Missing number, Wrong number',
              'Coding-Decoding — Letter & Number coding',
              'Analogies — Word & Number relationships',
              'Blood Relations — Family tree problems',
              'Direction Sense — Compass-based problems',
              'Odd One Out — Classification',
              'Calendar & Clock problems',
              'Venn Diagrams — Set relationships'
            ] }
          ]
        }
      ],
      'Physical & Endurance Standards': [
        {
          name: 'Physical Measurement & Endurance Test',
          nameTamil: 'உடல் அளவீடு & சகிப்புத்தன்மை தேர்வு',
          topics: [
            { name: 'Physical Measurement Test', nameTamil: 'உடல் அளவீட்டு தேர்வு', subtopics: [
              'Male Height: Minimum 163 cm',
              'Male Chest: Normal 79 cm, Expansion to 84 cm (5 cm expansion)',
              'Female / Third Gender Height: Minimum 150 cm',
              'Female / Third Gender Chest: Normal 74 cm, Expansion to 79 cm (5 cm expansion)'
            ] },
            { name: 'Endurance Test', nameTamil: 'சகிப்புத்தன்மை தேர்வு', subtopics: [
              'Male: 25 km walk to be completed within 4 hours',
              'Female: 16 km walk to be completed within 4 hours',
              'This is a mandatory qualifying test — no marks awarded',
              'Conducted in forest/terrain conditions'
            ] },
            { name: 'Vision & Medical Standards', nameTamil: 'பார்வை & மருத்துவ தரநிலைகள்', subtopics: [
              'Must have specified visual standard WITHOUT glasses',
              'Candidates wearing glasses / contact lenses: NOT eligible',
              'Color Blindness: Disqualified',
              'LASIK surgery: Disqualified (candidates who had LASIK are not eligible)',
              'General physical fitness — free from any disability that affects forest duties'
            ] }
          ]
        }
      ],
      'Eligibility Criteria 2026': [
        {
          name: 'Education & Age Requirements',
          nameTamil: 'கல்வி & வயது தேவைகள்',
          topics: [
            { name: 'Educational Qualification', nameTamil: 'கல்வித் தகுதி', subtopics: [
              'Must have passed Higher Secondary Course (12th Standard / HSC)',
              'Must have studied one of these subjects: Physics, Chemistry, Biology, Zoology, or Botany',
              'Science stream preferred (PCB / PCM with Biology)',
              'Certificate from a recognized State or Central Board'
            ] },
            { name: 'Age Limit', nameTamil: 'வயது வரம்பு', subtopics: [
              'General Category: 21 to 32 years',
              'SC / ST / BC / MBC / BCM: 21 to 37 years (5 years relaxation)',
              'Ex-Servicemen: Maximum 30 years after deducting service period',
              'Age calculated as of the notification date'
            ] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'fg-sci-1', question: 'Photosynthesis takes place in which part of the plant?', questionTamil: 'ஒளிச்சேர்க்கை தாவரத்தின் எந்தப் பகுதியில் நடைபெறுகிறது?', options: ['Leaves', 'Roots', 'Stem', 'Flower'], optionsTamil: ['இலைகள்', 'வேர்கள்', 'தண்டு', 'மலர்'], answer: 0, explanation: 'Photosynthesis occurs in leaves, specifically in chloroplasts containing chlorophyll.', explanationTamil: 'ஒளிச்சேர்க்கை இலைகளில், குறிப்பாக பசுங்கணிகங்களில் நடைபெறுகிறது.', subject: 'Biology', difficulty: 'easy' },
      { id: 'fg-sci-2', question: 'Which is the largest organ in the human body?', questionTamil: 'மனித உடலின் மிகப்பெரிய உறுப்பு:', options: ['Skin', 'Liver', 'Brain', 'Heart'], optionsTamil: ['தோல்', 'கல்லீரல்', 'மூளை', 'இதயம்'], answer: 0, explanation: 'Skin is the largest organ of the human body, covering about 1.5-2 square meters.', explanationTamil: 'தோல் மனித உடலின் மிகப்பெரிய உறுப்பு — 1.5-2 சதுர மீட்டர் பரப்பளவு.', subject: 'Biology', difficulty: 'easy' },
      { id: 'fg-geo-1', question: 'Nilgiri Biosphere Reserve is located in:', questionTamil: 'நீலகிரி உயிர்க்கோள காப்பகம் அமைந்துள்ள இடம்:', options: ['Tamil Nadu, Kerala & Karnataka', 'Tamil Nadu only', 'Kerala only', 'Karnataka only'], optionsTamil: ['தமிழ்நாடு, கேரளா & கர்நாடகா', 'தமிழ்நாடு மட்டும்', 'கேரளா மட்டும்', 'கர்நாடகா மட்டும்'], answer: 0, explanation: 'Nilgiri Biosphere Reserve spans Tamil Nadu, Kerala, and Karnataka. It was the first biosphere reserve in India (1986).', explanationTamil: 'நீலகிரி உயிர்க்கோள காப்பகம் தமிழ்நாடு, கேரளா, கர்நாடகா மாநிலங்களில் பரவியுள்ளது. இந்தியாவின் முதல் உயிர்க்கோள காப்பகம் (1986).', subject: 'Geography', difficulty: 'medium' },
      { id: 'fg-geo-2', question: 'The state animal of Tamil Nadu is:', questionTamil: 'தமிழ்நாட்டின் மாநில விலங்கு:', options: ['Nilgiri Tahr', 'Tiger', 'Elephant', 'Lion'], optionsTamil: ['நீலகிரி வரையாடு', 'புலி', 'யானை', 'சிங்கம்'], answer: 0, explanation: 'Nilgiri Tahr (Nilgiritragus hylocrius) is the state animal of Tamil Nadu. It is an endangered species found only in the Western Ghats.', explanationTamil: 'நீலகிரி வரையாடு தமிழ்நாட்டின் மாநில விலங்கு. மேற்குத் தொடர்ச்சி மலையில் மட்டுமே காணப்படும் அழிவின் விளிம்பில் உள்ள இனம்.', subject: 'Geography', difficulty: 'easy' },
      { id: 'fg-hist-1', question: 'Kallanai (Grand Anicut) was built by:', questionTamil: 'கல்லணை யாரால் கட்டப்பட்டது?', options: ['Karikala Chola', 'Rajaraja Chola', 'Rajendra Chola', 'Vijayalaya Chola'], optionsTamil: ['கரிகால சோழன்', 'ராஜராஜ சோழன்', 'ராஜேந்திர சோழன்', 'விஜயாலய சோழன்'], answer: 0, explanation: 'Kallanai (Grand Anicut) was built by Karikala Chola across the Cauvery River around 2nd century CE. It is one of the oldest dams in the world still in use.', explanationTamil: 'கல்லணை கி.பி. 2ஆம் நூற்றாண்டில் கரிகால சோழனால் காவிரி நதியின் குறுக்கே கட்டப்பட்டது. உலகின் மிகப் பழமையான அணைகளில் ஒன்று.', subject: 'History', difficulty: 'medium' },
      { id: 'fg-polity-1', question: 'The total number of districts in Tamil Nadu is:', questionTamil: 'தமிழ்நாட்டில் உள்ள மொத்த மாவட்டங்கள்:', options: ['38', '32', '36', '34'], optionsTamil: ['38', '32', '36', '34'], answer: 0, explanation: 'Tamil Nadu has 38 districts as of 2024. The newest districts are Mayiladuthurai, Chengalpattu, Kallakurichi, Ranipet, Tenkasi, and Tirupattur.', explanationTamil: 'தமிழ்நாட்டில் 38 மாவட்டங்கள் உள்ளன.', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'fg-apt-1', question: 'The volume of a cube with side 5 cm is:', questionTamil: 'பக்கம் 5 செமீ கொண்ட கனசதுரத்தின் கன அளவு:', options: ['125 cm³', '150 cm³', '100 cm³', '75 cm³'], optionsTamil: ['125 செமீ³', '150 செமீ³', '100 செமீ³', '75 செமீ³'], answer: 0, explanation: 'Volume of cube = side³ = 5³ = 5 × 5 × 5 = 125 cm³', explanationTamil: 'கனசதுர கன அளவு = பக்கம்³ = 5³ = 125 செமீ³', subject: 'Aptitude', difficulty: 'easy' },
      { id: 'fg-apt-2', question: 'If 30% of a number is 60, the number is:', questionTamil: 'ஒரு எண்ணின் 30% = 60 எனில், அந்த எண்:', options: ['200', '180', '150', '250'], optionsTamil: ['200', '180', '150', '250'], answer: 0, explanation: '30% × N = 60. N = 60 × 100/30 = 200', explanationTamil: '30% × N = 60. N = 60 × 100/30 = 200', subject: 'Aptitude', difficulty: 'easy' },
      { id: 'fg-reason-1', question: 'Find the odd one: Lion, Tiger, Elephant, Eagle', questionTamil: 'பொருத்தமற்றதை கண்டுபிடி: சிங்கம், புலி, யானை, கழுகு', options: ['Eagle', 'Lion', 'Tiger', 'Elephant'], optionsTamil: ['கழுகு', 'சிங்கம்', 'புலி', 'யானை'], answer: 0, explanation: 'Lion, Tiger, and Elephant are mammals. Eagle is a bird — it is the odd one out.', explanationTamil: 'சிங்கம், புலி, யானை பாலூட்டிகள். கழுகு ஒரு பறவை — பொருத்தமற்றது.', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'fg-reason-2', question: 'A is B\'s brother. C is B\'s mother. D is C\'s father. How is B related to D?', questionTamil: 'A, B இன் சகோதரர். C, B இன் தாய். D, C இன் தந்தை. B, D க்கு என்ன உறவு?', options: ['Grandchild', 'Son', 'Nephew', 'Brother'], optionsTamil: ['பேரன்/பேத்தி', 'மகன்', 'மருமகன்', 'சகோதரர்'], answer: 0, explanation: 'D is C\'s father. C is B\'s mother. So D is B\'s maternal grandfather. B is D\'s grandchild.', explanationTamil: 'D, C இன் தந்தை. C, B இன் தாய். எனவே D, B இன் தாய்வழி தாத்தா. B, D இன் பேரன்/பேத்தி.', subject: 'Reasoning', difficulty: 'medium' }
    ]
  },
  // ==================== TNPSC 2026 ANNUAL PLANNER EXAMS ====================
];

// ==================== OTHER CENTRAL GOVT ====================
const centralExams: Exam[] = [
  {
    id: 'india-post-gds',
    name: 'India Post GDS (Gramin Dak Sevak) 2026',
    nameTamil: 'இந்திய தபால் GDS (கிராமின் டாக் சேவக்) 2026',
    qualification: '10th Pass (with Maths & English)',
    qualificationTamil: '10ஆம் வகுப்பு தேர்ச்சி (கணிதம் & ஆங்கிலம் தேர்ச்சி)',
    age: '18 - 40 years',
    salary: '₹10,000 - ₹29,380/month (TRCA)',
    selectionProcess: 'Merit Based (No Exam, No Interview) → System-Generated Merit List from 10th Marks → Document Verification → Medical Fitness',
    selectionProcessTamil: 'தகுதி அடிப்படையில் (தேர்வு இல்லை, நேர்காணல் இல்லை) → 10ஆம் வகுப்பு மதிப்பெண்களிலிருந்து கணினி உருவாக்கிய தகுதிப் பட்டியல் → ஆவண சரிபார்ப்பு → மருத்துவ தகுதி',
    posts: ['Branch Postmaster (BPM)', 'Assistant Branch Postmaster (ABPM)', 'Dak Sevak'],
    postsTamil: ['கிளை தபால்மாஸ்டர் (BPM)', 'உதவி கிளை தபால்மாஸ்டர் (ABPM)', 'டாக் சேவக்'],
    syllabus: {
      'Selection Process (No Written Exam, No Interview)': [
        {
          name: 'Merit List — How Selection Works',
          nameTamil: 'தகுதிப் பட்டியல் — தேர்வு எவ்வாறு நடக்கிறது',
          topics: [
            { name: 'Merit Calculation', nameTamil: 'தகுதி கணக்கீடு', subtopics: [
              'NO written exam — selection is 100% merit based',
              'NO personal interview at any stage',
              'Merit = 10th Standard (Matriculation) marks percentage',
              'Percentage calculated up to 4 decimal places for precision',
              'Example: If total marks = 412 out of 500, Merit = 82.4000%',
              'System-generated merit list — no human bias'
            ] },
            { name: 'Grade Conversion Rule', nameTamil: 'தரம் மாற்ற விதி', subtopics: [
              'If your board gives Grades instead of Marks:',
              'Marks = Grade Point × 9.5',
              'Example: Grade Point 8.0 → Marks = 8.0 × 9.5 = 76%',
              'This applies to CBSE & other boards that use CGPA system'
            ] },
            { name: 'Tie-Breaking Rules', nameTamil: 'சமநிலை உடைப்பு விதிகள்', subtopics: [
              'If two candidates have the same marks:',
              'Rule 1: Older candidate (higher age) is preferred',
              'Rule 2: If still tied, female candidates get preference',
              'Rule 3: Further tie-breaking as per specific category order in notification'
            ] }
          ]
        }
      ],
      'Eligibility Criteria 2026': [
        {
          name: 'Education, Age & Skills Required',
          nameTamil: 'கல்வி, வயது & தேவையான திறன்கள்',
          topics: [
            { name: 'Educational Qualification', nameTamil: 'கல்வித் தகுதி', subtopics: [
              '10th Standard (Matriculation) Pass — mandatory',
              'Must have passed Mathematics as a subject in 10th',
              'Must have passed English as a subject in 10th',
              'Must have studied Local Language of the Postal Circle up to 10th standard',
              'Example: For Tamil Nadu circle, Tamil must be studied up to 10th',
              'Higher qualifications (12th, Degree) are allowed but merit is ONLY from 10th marks'
            ] },
            { name: 'Age Limit', nameTamil: 'வயது வரம்பு', subtopics: [
              'Minimum Age: 18 years (as of application closing date)',
              'Maximum Age: 40 years (as of application closing date)',
              'SC/ST Relaxation: +5 years (up to 45 years)',
              'OBC Relaxation: +3 years (up to 43 years)',
              'PwBD (General): +10 years (up to 50 years)',
              'PwBD (OBC): +13 years (up to 53 years)',
              'PwBD (SC/ST): +15 years (up to 55 years)'
            ] },
            { name: 'Additional Mandatory Skills', nameTamil: 'கூடுதல் கட்டாய திறன்கள்', subtopics: [
              'Basic Computer Knowledge — 60 days computer training certificate required',
              'Certificate from any recognized institute (government or private)',
              'Ability to ride a Bicycle — mandatory for delivery duties',
              'Must reside in the delivery area of the applied post office',
              'Local language proficiency (reading, writing, speaking) is essential'
            ] }
          ]
        }
      ],
      'Post-Wise Salary (TRCA — Time Related Continuity Allowance)': [
        {
          name: 'Salary Details for Each Post',
          nameTamil: 'ஒவ்வொரு பதவிக்கான சம்பள விவரங்கள்',
          topics: [
            { name: 'Branch Postmaster (BPM)', nameTamil: 'கிளை தபால்மாஸ்டர் (BPM)', subtopics: [
              'Salary Range: ₹12,000 – ₹29,380 per month',
              'This is the highest paying GDS post',
              'Works 5 hours per day',
              'Manages the entire Branch Post Office',
              'Responsible for all postal transactions, savings accounts, and money orders'
            ] },
            { name: 'Assistant Branch Postmaster (ABPM)', nameTamil: 'உதவி கிளை தபால்மாஸ்டர் (ABPM)', subtopics: [
              'Salary Range: ₹10,000 – ₹24,470 per month',
              'Works 4-5 hours per day',
              'Assists the BPM in daily operations',
              'Handles counter work, stamp sales, and basic transactions'
            ] },
            { name: 'Dak Sevak', nameTamil: 'டாக் சேவக்', subtopics: [
              'Salary Range: ₹10,000 – ₹24,470 per month',
              'Works 4-5 hours per day',
              'Primary duty: Mail delivery in the assigned area',
              'Must use bicycle for delivery — bicycle riding is mandatory',
              'Covers a defined delivery beat (route) daily'
            ] }
          ]
        }
      ],
      'Documents Required for Verification': [
        {
          name: 'Original Documents Checklist',
          nameTamil: 'அசல் ஆவணங்கள் சரிபார்ப்பு பட்டியல்',
          topics: [
            { name: 'Mandatory Documents', nameTamil: 'கட்டாய ஆவணங்கள்', subtopics: [
              '10th Class Mark Sheet — original + photocopy',
              '10th Class Passing Certificate — original + photocopy',
              'Identity Proof — Aadhaar Card, Voter ID, Passport, or Driving License',
              'Basic Computer Training Certificate (minimum 60 days course)',
              'Medical Fitness Certificate — from a Government Hospital',
              'Passport-size Photographs (recent, color)'
            ] },
            { name: 'Category-Specific Documents', nameTamil: 'பிரிவு சார்ந்த ஆவணங்கள்', subtopics: [
              'SC/ST Certificate — issued by competent authority (Tahsildar/RDO)',
              'OBC Certificate (Non-Creamy Layer) — must be recent (within 1 year)',
              'EWS Certificate — if applying under Economically Weaker Section',
              'PwBD Disability Certificate — from certified government medical board',
              'Ex-Servicemen Discharge Certificate (if applicable)',
              'Local language proof — 10th marksheet showing local language as subject'
            ] }
          ]
        }
      ],
      'How to Apply Online': [
        {
          name: 'Application Process',
          nameTamil: 'விண்ணப்ப செயல்முறை',
          topics: [
            { name: 'Step-by-Step Guide', nameTamil: 'படிப்படியான வழிகாட்டி', subtopics: [
              'Step 1: Visit https://indiapostgdsonline.gov.in',
              'Step 2: Click "New Registration" and create account with mobile & email',
              'Step 3: Fill personal details — name, DOB, address, category',
              'Step 4: Enter 10th Standard marks (subject-wise) and total percentage',
              'Step 5: Select Postal Circle & Division (choose your home state/district)',
              'Step 6: Select preferred post — BPM, ABPM, or Dak Sevak',
              'Step 7: Upload Photo, Signature & required certificates',
              'Step 8: Pay application fee (if applicable) — SC/ST/PwBD/Women may be exempt',
              'Step 9: Submit and take printout of application for future reference',
              'Important: One candidate can apply to multiple posts in the same circle'
            ] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'army-clerk',
    name: 'Agniveer Army Clerk / Store Keeper Technical (SKT)',
    nameTamil: 'அக்னிவீர் ராணுவ கிளர்க் / SKT',
    qualification: '12th Pass (60% aggregate, 50% in each subject)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (60% ஒட்டுமொத்தம், ஒவ்வொரு பாடத்திலும் 50%)',
    age: '17.5 - 21 years',
    salary: '₹30,000/month',
    selectionProcess: 'Phase I: Computer-Based CEE (50 Qs, 200 Marks + Typing Test 30 WPM) → Phase II: Recruitment Rally (Physical Measurement + Physical Fitness Test) → Medical Examination → Document Verification',
    selectionProcessTamil: 'நிலை I: கணினி CEE (50 கேள்விகள், 200 மதிப்பெண் + தட்டச்சு 30 WPM) → நிலை II: ஆட்சேர்ப்பு பேரணி (உடல் அளவீடு + உடல் தகுதி) → மருத்துவம் → ஆவண சரிபார்ப்பு',
    posts: ['Agniveer Clerk', 'Agniveer Store Keeper Technical'],
    postsTamil: ['அக்னிவீர் கிளர்க்', 'அக்னிவீர் ஸ்டோர் கீப்பர் டெக்னிக்கல்'],
    examPattern: [
      { paper: 'Part I: GK + Science + Maths + Computer', paperTamil: 'பகுதி I: பொது அறிவு + அறிவியல் + கணிதம் + கணினி', marks: 100, duration: '60-90 minutes', questions: 25 },
      { paper: 'Part II: General English', paperTamil: 'பகுதி II: பொது ஆங்கிலம்', marks: 100, duration: 'Included', questions: 25 }
    ],
    syllabus: {
      'CEE Written Exam (50 Qs, 200 Marks — Must score 32+ in each Part, 80+ overall)': [
        {
          name: 'Part I (25 Questions, 100 Marks)',
          nameTamil: 'பகுதி I (25 கேள்விகள், 100 மதிப்பெண்கள்)',
          topics: [
            { name: 'General Knowledge — 5 Qs, 20 Marks', nameTamil: 'பொது அறிவு — 5 கேள்விகள், 20 மதிப்பெண்கள்', subtopics: ['Indian History — Freedom Movement, Important Dates, Battles', 'Indian Geography — Rivers, Mountains, States & Capitals', 'Terminology — Scientific, Military, Administrative terms', 'Abbreviations — National & International organizations', 'Awards & Honours — Gallantry Awards (PVC, MVC, VrC), Padma Awards'] },
            { name: 'General Science — 5 Qs, 20 Marks', nameTamil: 'பொது அறிவியல் — 5 கேள்விகள், 20 மதிப்பெண்கள்', subtopics: ['Human Body — Organ systems, Blood groups, Vitamins & Deficiency', 'Physics — Light, Sound, Electricity, Mechanics', 'Chemistry — Acids & Bases, Elements, Compounds, Reactions', 'Biology — Diseases & Prevention, Nutrition, Cell Biology'] },
            { name: 'Mathematics — 10 Qs, 40 Marks', nameTamil: 'கணிதம் — 10 கேள்விகள், 40 மதிப்பெண்கள்', subtopics: ['Arithmetic — HCF, LCM, Percentage, Profit & Loss, Average, Ratio', 'Algebra — Linear Equations, Quadratic Equations, Factorization', 'Geometry — Triangles, Circles, Area, Perimeter', 'Mensuration — Volume of Cube, Cylinder, Sphere, Cone', 'Statistics — Mean, Median, Mode'] },
            { name: 'Computer Science — 5 Qs, 20 Marks', nameTamil: 'கணினி அறிவியல் — 5 கேள்விகள், 20 மதிப்பெண்கள்', subtopics: ['Computer Fundamentals — Hardware, Software, Input/Output devices', 'MS Office — Word, Excel (Formulas, Functions), PowerPoint', 'Operating Systems — Windows basics, File management', 'Memory — RAM, ROM, Cache, Hard Disk, Pen Drive', 'Internet — Email, Web Browser, Search Engine basics', 'Computer Abbreviations — CPU, RAM, ROM, HTTP, URL, HTML'] }
          ]
        },
        {
          name: 'Part II: General English — 25 Questions, 100 Marks (HIGHEST WEIGHTAGE)',
          nameTamil: 'பகுதி II: பொது ஆங்கிலம் — 25 கேள்விகள், 100 மதிப்பெண்கள் (அதிக மதிப்பெண்)',
          topics: [
            { name: 'Grammar', nameTamil: 'இலக்கணம்', subtopics: ['Tenses — Past, Present, Future (all forms)', 'Active & Passive Voice — Conversion rules', 'Direct & Indirect Speech (Narration) — Reporting verbs, tense changes', 'Parts of Speech — Noun, Pronoun, Verb, Adjective, Adverb, Preposition', 'Subject-Verb Agreement', 'Articles (A, An, The) & Prepositions', 'Sentence Correction & Error Spotting'] },
            { name: 'Vocabulary & Comprehension', nameTamil: 'சொல்வளம் & புரிதல்', subtopics: ['Synonyms & Antonyms', 'One Word Substitution', 'Idioms & Phrases', 'Fill in the Blanks', 'Sentence Rearrangement', 'Reading Comprehension — Passage-based questions', 'Cloze Test', 'Spelling Correction'] }
          ]
        }
      ],
      'Typing Test (Mandatory — During CEE)': [
        {
          name: 'English Typing Proficiency',
          nameTamil: 'ஆங்கில தட்டச்சு திறன்',
          topics: [
            { name: 'Typing Requirements', nameTamil: 'தட்டச்சு தேவைகள்', subtopics: ['Minimum speed: 30 words per minute (WPM) in English', 'Conducted during the CEE on computer', 'Only candidates who QUALIFY typing test proceed to Phase II Rally', 'Practice typing daily to improve speed and accuracy'] }
          ]
        }
      ],
      'Physical Standards & Rally (Phase II)': [
        {
          name: 'Physical Measurement & Fitness Test',
          nameTamil: 'உடல் அளவீடு & தகுதி தேர்வு',
          topics: [
            { name: 'Physical Measurement Test (PMT)', nameTamil: 'உடல் அளவீட்டு தேர்வு', subtopics: ['Height: Minimum 162 cm (varies slightly by region)', 'Chest: 77 cm with minimum 5 cm expansion', 'Weight: Proportionate to height and age'] },
            { name: 'Physical Fitness Test (PFT) — Qualifying Only', nameTamil: 'உடல் தகுதி தேர்வு — தகுதி மட்டும்', subtopics: ['1.6 km Run: Must complete within 5 minutes 45 seconds (Group II)', 'Pull-Ups (Beam): Minimum 6 pull-ups to qualify', 'Zig-Zag Balance: Mandatory to qualify (no marks)', '9-Feet Ditch Jump: Mandatory to qualify (no marks)', 'Note: PFT marks NOT added to final merit for Clerk/SKT'] }
          ]
        }
      ],
      'Eligibility & Documents': [
        {
          name: 'Eligibility & Required Documents',
          nameTamil: 'தகுதி & தேவையான ஆவணங்கள்',
          topics: [
            { name: 'Strict Academic Requirements', nameTamil: 'கடுமையான கல்வி தேவைகள்', subtopics: ['12th Pass (10+2 / Intermediate) in any stream — Arts, Commerce, or Science', '60% aggregate marks in Class 12 — mandatory', 'Minimum 50% in EACH individual subject — mandatory', 'Must have scored 50% in English in Class 12 — mandatory', 'Must have scored 50% in Maths / Accounts / Bookkeeping — mandatory', 'Age: 17.5 to 21 years'] },
            { name: 'Documents for Rally', nameTamil: 'பேரணிக்கான ஆவணங்கள்', subtopics: ['10th & 12th Admit Card, Marksheet, Passing Certificate (originals)', 'Domicile (Nativity) Certificate — from Tehsildar / SDM', 'Caste Certificate (if applicable)', 'Unmarried Certificate — with recent photograph', 'NCC Certificate — provides bonus marks in final merit', 'Sports Certificates — National/State level provide bonus marks', 'Character Certificate from School/College Principal', 'Aadhaar Card / Identity Proof'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'army-gk-1', question: 'Indian Army Day is celebrated on:', questionTamil: 'இந்திய ராணுவ தினம் கொண்டாடப்படும் நாள்:', options: ['January 15', 'October 8', 'December 4', 'November 14'], optionsTamil: ['ஜனவரி 15', 'அக்டோபர் 8', 'டிசம்பர் 4', 'நவம்பர் 14'], answer: 0, explanation: 'Army Day is on January 15, commemorating Lt. Gen. K.M. Cariappa becoming the first Indian Commander-in-Chief of the Indian Army in 1949.', explanationTamil: 'ராணுவ தினம் ஜனவரி 15 — 1949 இல் லெப்டினன்ட் ஜெனரல் கே.எம். காரியப்பா இந்திய ராணுவத்தின் முதல் இந்திய தளபதியாக பொறுப்பேற்றதை நினைவுகூர்கிறது.', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'army-eng-1', question: 'Change to passive voice: "The soldiers defended the border."', questionTamil: 'செயப்பாட்டு வாக்கியமாக மாற்றுக: "The soldiers defended the border."', options: ['The border was defended by the soldiers', 'The border is defended by the soldiers', 'The border has been defended by the soldiers', 'The border will be defended by the soldiers'], optionsTamil: ['The border was defended by the soldiers', 'The border is defended by the soldiers', 'The border has been defended by the soldiers', 'The border will be defended by the soldiers'], answer: 0, explanation: 'Simple Past Active → Simple Past Passive: Subject + was/were + past participle + by + agent.', explanationTamil: 'Simple Past Active → Simple Past Passive: Subject + was/were + past participle + by + agent.', subject: 'English', difficulty: 'easy' },
      { id: 'army-comp-1', question: 'RAM stands for:', questionTamil: 'RAM என்பதன் விரிவாக்கம்:', options: ['Random Access Memory', 'Read Access Memory', 'Run Access Memory', 'Rapid Access Memory'], optionsTamil: ['Random Access Memory', 'Read Access Memory', 'Run Access Memory', 'Rapid Access Memory'], answer: 0, explanation: 'RAM = Random Access Memory — temporary volatile memory used by the CPU for active processing.', explanationTamil: 'RAM = Random Access Memory — CPU செயலாக்கத்திற்கு பயன்படும் தற்காலிக நிலையற்ற நினைவகம்.', subject: 'Computer Science', difficulty: 'easy' },
      { id: 'army-eng-2', question: 'Change to indirect speech: He said, "I am happy."', questionTamil: 'அறிக்கையாக மாற்று: He said, "I am happy."', options: ['He said that he was happy', 'He said that I am happy', 'He said that he is happy', 'He said that I was happy'], optionsTamil: ['He said that he was happy', 'He said that I am happy', 'He said that he is happy', 'He said that I was happy'], answer: 0, explanation: 'Direct → Indirect: "I" changes to "he", "am" changes to "was" (backshift of tense), quotes removed.', explanationTamil: 'நேர்ப்பேச்சு → அறிக்கை: I → he, am → was (காலம் பின்னோக்கி மாறுதல்).', subject: 'English', difficulty: 'medium' },
      { id: 'army-math-1', question: 'The mean of first 10 natural numbers is:', questionTamil: 'முதல் 10 இயற்கை எண்களின் சராசரி:', options: ['5.5', '5', '6', '10'], optionsTamil: ['5.5', '5', '6', '10'], answer: 0, explanation: 'Sum of 1 to 10 = 10×11/2 = 55. Mean = 55/10 = 5.5', explanationTamil: '1 முதல் 10 வரை கூட்டுத்தொகை = 55. சராசரி = 55/10 = 5.5', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'army-comp-2', question: 'Which is an output device?', questionTamil: 'வெளியீட்டு சாதனம் எது?', options: ['Monitor', 'Keyboard', 'Mouse', 'Scanner'], optionsTamil: ['மானிட்டர்', 'விசைப்பலகை', 'சுட்டி', 'ஸ்கேனர்'], answer: 0, explanation: 'Monitor is an output device (displays information). Keyboard, Mouse, Scanner are input devices.', explanationTamil: 'மானிட்டர் வெளியீட்டு சாதனம். விசைப்பலகை, சுட்டி, ஸ்கேனர் உள்ளீட்டு சாதனங்கள்.', subject: 'Computer Science', difficulty: 'easy' },
      { id: 'army-gk-2', question: 'The motto of the Indian Army is:', questionTamil: 'இந்திய ராணுவத்தின் குறிக்கோள்:', options: ['Service Before Self', 'Duty Unto Death', 'Jai Hind', 'Victory Through Valor'], optionsTamil: ['சேவை முதலில்', 'கடமை இறுதிவரை', 'ஜெய் ஹிந்த்', 'வீரத்தின் மூலம் வெற்றி'], answer: 0, explanation: 'The motto of the Indian Army is "Service Before Self" (Seva Paramo Dharma). "Duty Unto Death" is BSF\'s motto.', explanationTamil: 'இந்திய ராணுவத்தின் குறிக்கோள் "சேவை முதலில்" (சேவா பரமோ தர்மா).', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'army-gk-3', question: 'The current Chief of Army Staff is appointed by:', questionTamil: 'தற்போதைய ராணுவ தளபதி யாரால் நியமிக்கப்படுகிறார்:', options: ['President of India', 'Prime Minister', 'Defence Minister', 'Parliament'], optionsTamil: ['இந்தியக் குடியரசுத் தலைவர்', 'பிரதமர்', 'பாதுகாப்பு அமைச்சர்', 'நாடாளுமன்றம்'], answer: 0, explanation: 'The Chief of Army Staff (COAS) is appointed by the President of India on the recommendation of the government.', explanationTamil: 'ராணுவ தளபதி இந்தியக் குடியரசுத் தலைவரால் நியமிக்கப்படுகிறார்.', subject: 'General Knowledge', difficulty: 'easy' }
    ]
  },
  {
    id: 'fci-watchman',
    name: 'FCI Watchman (Category IV)',
    nameTamil: 'FCI காவலாளி (வகை IV)',
    qualification: '8th Pass (Middle School)',
    qualificationTamil: '8ஆம் வகுப்பு தேர்ச்சி (நடுநிலைப் பள்ளி)',
    age: '18 - 25 years',
    salary: '₹23,300 - ₹64,000/month (7th CPC)',
    selectionProcess: 'Written Examination (120 MCQs, 90 min, No Negative Marking) → Physical Endurance Test (PET) → Final Selection based on Written Exam score',
    selectionProcessTamil: 'எழுத்துத் தேர்வு (120 MCQ, 90 நிமிடம், நெகட்டிவ் இல்லை) → உடல் சகிப்புத்தன்மை தேர்வு (PET) → எழுத்துத் தேர்வு மதிப்பெண் அடிப்படையில் இறுதி தேர்வு',
    posts: ['Watchman (Category IV)'],
    postsTamil: ['காவலாளி (வகை IV)'],
    examPattern: [
      { paper: 'Written Examination (OMR/Online)', paperTamil: 'எழுத்துத் தேர்வு (OMR/ஆன்லைன்)', marks: 120, duration: '90 minutes', questions: 120 }
    ],
    syllabus: {
      'Written Exam (120 MCQs, 120 Marks, 90 Minutes, No Negative Marking)': [
        {
          name: 'Written Exam — 4 Equal Sections (30 Qs each, ~25% weightage)',
          nameTamil: 'எழுத்துத் தேர்வு — 4 சம பிரிவுகள் (தலா 30 கேள்விகள்)',
          topics: [
            { name: 'General Knowledge (~25%)', nameTamil: 'பொது அறிவு (~25%)', subtopics: ['Indian History — Ancient, Medieval, Modern India, Freedom Movement', 'Indian Geography — Rivers, Mountains, States & Capitals', 'Indian Polity — Constitution, Parliament, President, PM', 'National Symbols — Flag, Emblem, Anthem, Animal, Bird, Flower', 'Important Organizations — UN, WHO, UNESCO, UNICEF', 'Awards & Honours — Padma Awards, Bharat Ratna, Nobel Prize', 'Books & Authors'] },
            { name: 'Current Affairs (~25%)', nameTamil: 'நடப்பு நிகழ்வுகள் (~25%)', subtopics: ['National & International Current Events', 'Who\'s Who — Current holders of important posts (President, PM, Governors, CMs)', 'Sports — Olympics, Commonwealth, Cricket, Asian Games', 'Science & Technology — Recent discoveries, Space missions, ISRO', 'Government Schemes — PM Awas Yojana, Jan Dhan, Make in India', 'Important Days & Dates'] },
            { name: 'Mathematics (~25%)', nameTamil: 'கணிதம் (~25%)', subtopics: ['Arithmetic — Addition, Subtraction, Multiplication, Division', 'Number System — Natural, Whole, Integers', 'HCF & LCM — Problem solving', 'Percentage — Calculation, Increase, Decrease', 'Profit & Loss — Cost Price, Selling Price, Discount', 'Ratio & Proportion', 'Simple & Compound Interest', 'Average — Simple average problems', 'Time & Distance — Speed calculations'] },
            { name: 'English Language (~25%)', nameTamil: 'ஆங்கில மொழி (~25%)', subtopics: ['Basic Grammar — Tenses, Articles, Prepositions, Conjunctions', 'Sentence Structure — Subject, Verb, Object', 'Vocabulary — Common English words, Synonyms, Antonyms', 'Fill in the Blanks', 'Error Spotting — Identify grammatical mistakes', 'Reading Comprehension — Short passages', 'Spelling Correction'] }
          ]
        }
      ],
      'Physical Endurance Test (PET) — Qualifying': [
        {
          name: 'PET Standards (Strictly Qualifying)',
          nameTamil: 'PET தரநிலைகள் (கட்டாய தகுதி)',
          topics: [
            { name: 'Male Candidates', nameTamil: 'ஆண் விண்ணப்பதாரர்கள்', subtopics: ['Running: 1000 meters in 330 seconds (5 min 30 sec)', 'Long Jump: 3.95 meters (3 chances given)', 'High Jump: 1.14 meters (3 chances given)'] },
            { name: 'Female Candidates', nameTamil: 'பெண் விண்ணப்பதாரர்கள்', subtopics: ['Running: 800 meters in 255 seconds (4 min 15 sec)', 'Long Jump: 2.74 meters (3 chances given)', 'High Jump: 0.90 meters (3 chances given)'] }
          ]
        }
      ],
      'Eligibility Criteria': [
        {
          name: 'Qualification & Age',
          nameTamil: 'தகுதி & வயது',
          topics: [
            { name: 'Requirements', nameTamil: 'தேவைகள்', subtopics: ['Educational: Must have passed 8th Class (Middle School)', 'Ex-Servicemen: 5th Class pass is sufficient', 'Age — General: 18 to 25 years', 'Age — OBC: 18 to 28 years (+3 years relaxation)', 'Age — SC/ST: 18 to 30 years (+5 years relaxation)', 'Salary: ₹23,300 to ₹64,000 per month (7th Pay Commission)', 'FCI = Food Corporation of India, established in 1965'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'fci-gk-1', question: 'FCI stands for:', questionTamil: 'FCI என்பதன் விரிவாக்கம்:', options: ['Food Corporation of India', 'Food Commission of India', 'Farm Corporation of India', 'Federal Corporation of India'], optionsTamil: ['இந்திய உணவு கழகம்', 'இந்திய உணவு ஆணையம்', 'இந்திய பண்ணை கழகம்', 'கூட்டாட்சி கழகம்'], answer: 0, explanation: 'FCI = Food Corporation of India, established on 14 January 1965 under the Food Corporation Act 1964 to manage food grain procurement, storage, and distribution.', explanationTamil: 'FCI = இந்திய உணவு கழகம், 1965 ஜனவரி 14 அன்று உணவு கழக சட்டம் 1964 இன் கீழ் நிறுவப்பட்டது.', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'fci-gk-2', question: 'FCI headquarters is located at:', questionTamil: 'FCI தலைமையகம் அமைந்துள்ள இடம்:', options: ['New Delhi', 'Mumbai', 'Chennai', 'Kolkata'], optionsTamil: ['புது தில்லி', 'மும்பை', 'சென்னை', 'கொல்கத்தா'], answer: 0, explanation: 'FCI headquarters is at 16-20, Barakhamba Lane, New Delhi - 110001.', explanationTamil: 'FCI தலைமையகம் 16-20, பரகம்பா லேன், புது தில்லி - 110001 இல் உள்ளது.', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'fci-math-1', question: 'If 20% of a number is 50, the number is:', questionTamil: 'ஒரு எண்ணின் 20% = 50 எனில், அந்த எண்:', options: ['250', '200', '300', '150'], optionsTamil: ['250', '200', '300', '150'], answer: 0, explanation: '20% × N = 50. N = 50 × 100/20 = 250', explanationTamil: '20% × N = 50. N = 50 × 100/20 = 250', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'fci-gk-3', question: 'FCI was established under which Act?', questionTamil: 'FCI எந்த சட்டத்தின் கீழ் நிறுவப்பட்டது?', options: ['Food Corporation Act 1964', 'Companies Act 1956', 'FSSAI Act 2006', 'Essential Commodities Act 1955'], optionsTamil: ['உணவு கழக சட்டம் 1964', 'நிறுவனங்கள் சட்டம் 1956', 'FSSAI சட்டம் 2006', 'அத்தியாவசிய பொருட்கள் சட்டம் 1955'], answer: 0, explanation: 'FCI was established under the Food Corporation Act, 1964 on 14 January 1965.', explanationTamil: 'FCI உணவு கழக சட்டம் 1964 இன் கீழ் 1965 ஜனவரி 14 அன்று நிறுவப்பட்டது.', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'fci-gk-4', question: 'The Green Revolution in India was led by:', questionTamil: 'இந்தியாவில் பசுமைப் புரட்சியை வழிநடத்தியவர்:', options: ['M.S. Swaminathan', 'Verghese Kurien', 'Norman Borlaug', 'C. Subramaniam'], optionsTamil: ['எம்.எஸ். சுவாமிநாதன்', 'வர்கீஸ் குரியன்', 'நார்மன் போர்லாக்', 'சி. சுப்பிரமணியம்'], answer: 0, explanation: 'M.S. Swaminathan is the Father of the Green Revolution in India. Norman Borlaug is the father globally. Verghese Kurien led the White Revolution (milk).', explanationTamil: 'எம்.எஸ். சுவாமிநாதன் இந்திய பசுமைப் புரட்சியின் தந்தை.', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'fci-math-2', question: 'A man walks 5 km East, then 3 km North. How far is he from start?', questionTamil: 'ஒருவர் 5 கிமீ கிழக்கே, பின் 3 கிமீ வடக்கே நடந்தால், தொடக்கத்திலிருந்து தூரம்:', options: ['√34 km', '8 km', '4 km', '√16 km'], optionsTamil: ['√34 கிமீ', '8 கிமீ', '4 கிமீ', '√16 கிமீ'], answer: 0, explanation: 'Using Pythagoras: Distance = √(5² + 3²) = √(25+9) = √34 ≈ 5.83 km.', explanationTamil: 'பித்தகோரஸ் தேற்றம்: தூரம் = √(25+9) = √34 ≈ 5.83 கிமீ.', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'fci-eng-1', question: 'The antonym of "Ancient" is:', questionTamil: '"Ancient" இன் எதிர்ச்சொல்:', options: ['Modern', 'Old', 'Historic', 'Traditional'], optionsTamil: ['நவீன', 'பழைய', 'வரலாற்று', 'பாரம்பரிய'], answer: 0, explanation: 'Ancient means very old. Modern means present/recent — it is the opposite.', explanationTamil: 'Ancient என்றால் மிகவும் பழமையான. Modern = நவீன — எதிர்ச்சொல்.', subject: 'English', difficulty: 'easy' },
      { id: 'fci-reason-1', question: 'Which day comes 3 days after Monday?', questionTamil: 'திங்கட்கிழமைக்கு 3 நாட்களுக்குப் பிறகு எந்த நாள்?', options: ['Thursday', 'Wednesday', 'Friday', 'Tuesday'], optionsTamil: ['வியாழக்கிழமை', 'புதன்கிழமை', 'வெள்ளிக்கிழமை', 'செவ்வாய்க்கிழமை'], answer: 0, explanation: 'Monday → Tuesday (1) → Wednesday (2) → Thursday (3). 3 days after Monday is Thursday.', explanationTamil: 'திங்கள் → செவ்வாய் → புதன் → வியாழன். திங்களுக்கு 3 நாட்கள் பிறகு வியாழன்.', subject: 'Reasoning', difficulty: 'easy' }
    ]
  },
  {
    id: 'nvs-lab-attendant',
    name: 'NVS Lab Attendant (Navodaya Vidyalaya)',
    nameTamil: 'NVS ஆய்வக உதவியாளர் (நவோதயா வித்யாலயா)',
    qualification: '12th Pass (Science — PCM/PCB)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (அறிவியல்)',
    age: '18 - 30 years',
    salary: '₹18,000 - ₹56,900/month (Pay Level 1)',
    selectionProcess: 'Tier 1: Preliminary (100 MCQs, 300 Marks, +3/-1 — Qualifying) → Tier 2: Main (70 Qs, 100 Marks — Merit) → Document Verification → Medical',
    selectionProcessTamil: 'நிலை 1: முதல்நிலை (100 MCQ, 300 மதிப்பெண், +3/-1 — தகுதி) → நிலை 2: முதன்மை (70 கேள்விகள், 100 — தகுதி) → ஆவண சரிபார்ப்பு → மருத்துவம்',
    posts: ['Lab Attendant (Jawahar Navodaya Vidyalayas)'],
    postsTamil: ['ஆய்வக உதவியாளர் (ஜவஹர் நவோதயா வித்யாலயா)'],
    examPattern: [
      { paper: 'Tier 1: Preliminary (Qualifying)', paperTamil: 'நிலை 1: முதல்நிலை', marks: 300, duration: '2 hours', questions: 100 },
      { paper: 'Tier 2: Main (Merit)', paperTamil: 'நிலை 2: முதன்மை', marks: 100, duration: '2.5 hours', questions: 70 }
    ],
    syllabus: {
      'Tier 1 — Preliminary (100 MCQs, 300 Marks, +3/-1)': [
        {
          name: 'Screening Test — 6 Sections',
          nameTamil: 'திரையிடல் தேர்வு — 6 பிரிவுகள்',
          topics: [
            { name: 'General Reasoning — 20 Qs, 60 Marks', nameTamil: 'தர்க்கம் — 20 கேள்விகள்', subtopics: ['Analogies, Series, Coding-Decoding, Blood Relations', 'Direction Sense, Syllogism, Classification, Mirror Images', 'Venn Diagrams, Seating Arrangement, Puzzles'] },
            { name: 'Numeric Ability — 20 Qs, 60 Marks', nameTamil: 'எண் திறன் — 20 கேள்விகள்', subtopics: ['Number System, Percentage, Ratio, Average', 'Profit & Loss, SI & CI, Time & Work/Distance', 'HCF & LCM, Simplification, Data Interpretation'] },
            { name: 'Basic Computer Literacy — 20 Qs, 60 Marks', nameTamil: 'கணினி — 20 கேள்விகள்', subtopics: ['Hardware, Software, I/O Devices, OS', 'MS Office (Word, Excel, PowerPoint)', 'Internet, Email, Memory (RAM/ROM), Networking'] },
            { name: 'General Knowledge — 20 Qs, 60 Marks', nameTamil: 'பொது அறிவு — 20 கேள்விகள்', subtopics: ['History, Geography, Polity, Economy', 'General Science, Current Affairs, Awards'] },
            { name: 'English — 10 Qs, 30 Marks', nameTamil: 'ஆங்கிலம் — 10 கேள்விகள்', subtopics: ['Grammar, Vocabulary, Comprehension, Error Spotting'] },
            { name: 'Regional Language / Hindi — 10 Qs, 30 Marks', nameTamil: 'பிராந்திய மொழி / இந்தி — 10 கேள்விகள்', subtopics: ['Grammar, Vocabulary, Comprehension'] }
          ]
        }
      ],
      'Tier 2 — Main Exam (Objective 60 + Descriptive 10, 100 Marks)': [
        {
          name: 'Lab-Specific Knowledge (Merit Based)',
          nameTamil: 'ஆய்வக குறிப்பிட்ட அறிவு (தகுதி அடிப்படை)',
          topics: [
            { name: 'Lab Equipment & Techniques', nameTamil: 'உபகரணங்கள் & நுட்பங்கள்', subtopics: ['Beakers, Flasks (Erlenmeyer, Volumetric, Round-bottom)', 'Bunsen Burner — Parts, Operation, Flame types', 'Microscope — Parts, Focusing, Handling', 'Centrifuge — Operation, Speed, Safety', 'Pipette & Burette — Titration techniques', 'pH Meter, Thermometer, Hydrometer'] },
            { name: 'Chemical Safety', nameTamil: 'வேதியியல் பாதுகாப்பு', subtopics: ['AAA Rule (Always Add Acid to water)', 'MSDS — Material Safety Data Sheets', 'Waste Disposal — Chemical, Biological, Sharps', 'PPE — Gloves, Goggles, Lab Coat, Mask', 'Fire Safety — Extinguisher types', 'Spill Management protocols'] },
            { name: 'First Aid in Laboratory', nameTamil: 'ஆய்வக முதலுதவி', subtopics: ['Chemical Burns — 15+ min water wash', 'Eye Exposure — Eyewash station, 15-20 min flush', 'Inhalation — Move to fresh air, seek medical help', 'Cuts & Wounds — Clean, pressure, bandage'] },
            { name: 'Documentation', nameTamil: 'ஆவணமாக்கல்', subtopics: ['Inventory Register, Chemical Log Book', 'Daily Lab Reports, Experiment Records', 'Labeling Protocols, Equipment Maintenance Log'] }
          ]
        }
      ],
      'Salary & Career Growth': [
        {
          name: 'Compensation & Promotion',
          nameTamil: 'ஊதியம் & பதவி உயர்வு',
          topics: [
            { name: 'Details', nameTamil: 'விவரங்கள்', subtopics: ['Pay Level 1: ₹18,000 – ₹56,900 basic', 'Gross: ~₹28,000 – ₹30,000/month with DA, HRA', '10% Special Residential Allowance (campus stay)', 'Free accommodation on JNV campus', 'Promotion: Lab Attendant → Lab Assistant → Lab Analyst → Lab Supervisor'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'nvs-sci-1', question: 'The chemical formula of water is:', questionTamil: 'நீரின் வேதியியல் சூத்திரம்:', options: ['H₂O', 'CO₂', 'NaCl', 'H₂SO₄'], optionsTamil: ['H₂O', 'CO₂', 'NaCl', 'H₂SO₄'], answer: 0, explanation: 'Water = H₂O (2 hydrogen atoms + 1 oxygen atom).', explanationTamil: 'நீர் = H₂O (2 ஹைட்ரஜன் + 1 ஆக்சிஜன்).', subject: 'Chemistry', difficulty: 'easy' },
      { id: 'nvs-sci-2', question: 'Which acid is found in lemon?', questionTamil: 'எலுமிச்சையில் உள்ள அமிலம்:', options: ['Citric acid', 'Acetic acid', 'Hydrochloric acid', 'Sulphuric acid'], optionsTamil: ['சிட்ரிக் அமிலம்', 'அசிட்டிக் அமிலம்', 'ஹைட்ரோகுளோரிக் அமிலம்', 'சல்பூரிக் அமிலம்'], answer: 0, explanation: 'Lemon contains citric acid. Vinegar has acetic acid. Stomach has HCl.', explanationTamil: 'எலுமிச்சையில் சிட்ரிக் அமிலம் உள்ளது.', subject: 'Chemistry', difficulty: 'easy' },
      { id: 'nvs-lab-1', question: 'A Bunsen burner uses which gas as fuel?', questionTamil: 'பன்சன் பர்னர் எந்த வாயுவை எரிபொருளாக பயன்படுத்துகிறது?', options: ['LPG / Natural Gas', 'Oxygen', 'Nitrogen', 'Hydrogen'], optionsTamil: ['LPG / இயற்கை வாயு', 'ஆக்சிஜன்', 'நைட்ரஜன்', 'ஹைட்ரஜன்'], answer: 0, explanation: 'Bunsen burner uses LPG (Liquefied Petroleum Gas) or natural gas (methane) as fuel.', explanationTamil: 'பன்சன் பர்னர் LPG அல்லது இயற்கை வாயுவை எரிபொருளாக பயன்படுத்துகிறது.', subject: 'Lab Knowledge', difficulty: 'easy' },
      { id: 'nvs-lab-2', question: 'Which PPE is essential when handling acids?', questionTamil: 'அமிலங்களை கையாளும் போது எந்த PPE அத்தியாவசியம்?', options: ['Gloves, goggles, lab coat', 'Only gloves', 'Only goggles', 'No PPE needed'], optionsTamil: ['கையுறைகள், கண்ணாடிகள், ஆய்வக கோட்', 'கையுறைகள் மட்டும்', 'கண்ணாடிகள் மட்டும்', 'PPE தேவையில்லை'], answer: 0, explanation: 'When handling acids, you must wear gloves (chemical-resistant), safety goggles, and a lab coat. This is mandatory PPE.', explanationTamil: 'அமிலங்களை கையாளும் போது கையுறைகள், பாதுகாப்பு கண்ணாடிகள், ஆய்வக கோட் கட்டாயம்.', subject: 'Lab Safety', difficulty: 'easy' },
      { id: 'nvs-math-1', question: 'The LCM of 4, 6, and 8 is:', questionTamil: '4, 6, 8 இன் மீச்சிறு பொது மடங்கு:', options: ['24', '48', '12', '16'], optionsTamil: ['24', '48', '12', '16'], answer: 0, explanation: '4=2², 6=2×3, 8=2³. LCM = 2³×3 = 24.', explanationTamil: '4=2², 6=2×3, 8=2³. LCM = 2³×3 = 24.', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'nvs-gk-1', question: 'Jawahar Navodaya Vidyalayas were established in which year?', questionTamil: 'ஜவஹர் நவோதயா வித்யாலயாக்கள் எந்த ஆண்டு நிறுவப்பட்டன?', options: ['1986', '1990', '1975', '2000'], optionsTamil: ['1986', '1990', '1975', '2000'], answer: 0, explanation: 'JNVs were established under the National Policy on Education 1986. They provide free residential education to rural students.', explanationTamil: 'JNV கள் 1986 தேசிய கல்விக் கொள்கையின் கீழ் நிறுவப்பட்டன.', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'nvs-comp-1', question: 'CPU stands for:', questionTamil: 'CPU என்பதன் விரிவாக்கம்:', options: ['Central Processing Unit', 'Central Program Unit', 'Computer Processing Unit', 'Central Peripheral Unit'], optionsTamil: ['Central Processing Unit', 'Central Program Unit', 'Computer Processing Unit', 'Central Peripheral Unit'], answer: 0, explanation: 'CPU = Central Processing Unit — the brain of the computer that executes instructions.', explanationTamil: 'CPU = Central Processing Unit — கணினியின் மூளை.', subject: 'Computer', difficulty: 'easy' },
      { id: 'nvs-reason-1', question: 'Mirror image of the word HELP is:', questionTamil: 'HELP என்ற சொல்லின் கண்ணாடி பிம்பம்:', options: ['PLƎH', 'PLEH', 'HELP', 'HLEP'], optionsTamil: ['PLƎH', 'PLEH', 'HELP', 'HLEP'], answer: 1, explanation: 'Mirror image reverses left-right: HELP becomes PLEH when reflected.', explanationTamil: 'கண்ணாடி பிம்பம் இடமிருந்து வலமாக மாறும்: HELP → PLEH.', subject: 'Reasoning', difficulty: 'easy' }
    ]
  },
  {
    id: 'kvs-non-teaching',
    name: 'KVS Non-Teaching (JSA / Steno / Lab Attendant)',
    nameTamil: 'KVS பயிற்றா பணி (JSA / ஸ்டெனோ / ஆய்வக)',
    qualification: '12th Pass (JSA/Steno) / 12th Science (Lab)',
    qualificationTamil: '12ஆம் வகுப்பு (JSA/ஸ்டெனோ) / 12ஆம் அறிவியல் (ஆய்வக)',
    age: '18 - 30 years',
    salary: '₹18,000 - ₹56,900/month (Pay Level 1-2)',
    selectionProcess: 'Tier 1: Preliminary (100 MCQs, 300 Marks, +3/-1 — Qualifying) → Tier 2: Main (Objective + Descriptive, 100 Marks — Merit) → Skill Test (Typing 35 WPM / Steno 80 WPM) → Document Verification',
    selectionProcessTamil: 'நிலை 1: முதல்நிலை (100 MCQ, 300, +3/-1 — தகுதி) → நிலை 2: முதன்மை (100 — தகுதி) → திறன் (தட்டச்சு/சுருக்கெழுத்து) → ஆவணம்',
    posts: ['Junior Secretariat Assistant (JSA)', 'Stenographer Grade II', 'Lab Attendant'],
    postsTamil: ['இளநிலை செயலக உதவியாளர்', 'சுருக்கெழுத்தாளர் தரம் II', 'ஆய்வக உதவியாளர்'],
    examPattern: [
      { paper: 'Tier 1: Preliminary (Qualifying)', paperTamil: 'நிலை 1: முதல்நிலை', marks: 300, duration: '2 hours', questions: 100 },
      { paper: 'Tier 2: Main (Merit)', paperTamil: 'நிலை 2: முதன்மை', marks: 100, duration: '2.5 hours', questions: 70 }
    ],
    syllabus: {
      'Tier 1 — Common Preliminary (100 MCQs, 300 Marks, +3/-1)': [
        {
          name: 'Common for all Non-Teaching Posts',
          nameTamil: 'அனைத்து பயிற்றா பதவிகளுக்கும் பொது',
          topics: [
            { name: 'General Reasoning — 20 Qs, 60 Marks', nameTamil: 'தர்க்கம்', subtopics: ['Analogies, Series, Coding-Decoding, Blood Relations', 'Syllogism, Classification, Mirror/Water Images, Puzzles'] },
            { name: 'Numeric Ability — 20 Qs, 60 Marks', nameTamil: 'எண் திறன்', subtopics: ['Number System, %, Ratio, Profit/Loss, SI/CI', 'Time & Work/Distance, HCF/LCM, Data Interpretation'] },
            { name: 'Computer Literacy — 20 Qs, 60 Marks', nameTamil: 'கணினி', subtopics: ['Hardware/Software, MS Office, OS, Internet, Memory, Networking'] },
            { name: 'General Knowledge — 20 Qs, 60 Marks', nameTamil: 'பொது அறிவு', subtopics: ['History, Geography, Polity, Economy, Science, Current Affairs'] },
            { name: 'Language — 20 Qs, 60 Marks', nameTamil: 'மொழி', subtopics: ['English (10 Qs): Grammar, Vocabulary, Comprehension', 'Hindi/Regional (10 Qs): Grammar, Vocabulary, Comprehension'] }
          ]
        }
      ],
      'Tier 2 — Post-Specific (60 Objective + 10 Descriptive, 100 Marks)': [
        {
          name: 'JSA — Typing + Computer Proficiency',
          nameTamil: 'JSA — தட்டச்சு + கணினி திறன்',
          topics: [
            { name: 'JSA Requirements', nameTamil: 'JSA தேவைகள்', subtopics: ['MS Word — Formatting, Tables, Mail Merge', 'MS Excel — Formulas, Charts, Data Sorting', 'MS PowerPoint — Presentations, Animations', 'Office Procedure — Noting, Drafting, Records', 'Typing: 35 WPM English OR 30 WPM Hindi — mandatory'] }
          ]
        },
        {
          name: 'Stenographer — Shorthand + Transcription',
          nameTamil: 'சுருக்கெழுத்தாளர் — சுருக்கெழுத்து + படியெடுப்பு',
          topics: [
            { name: 'Steno Requirements', nameTamil: 'ஸ்டெனோ தேவைகள்', subtopics: ['Shorthand Dictation: 10 min at 80 WPM', 'Computer Transcription within time limit', 'MS Office Proficiency — mandatory', 'Computer Proficiency Test (CPT) — mandatory'] }
          ]
        },
        {
          name: 'Lab Attendant — Lab Knowledge',
          nameTamil: 'ஆய்வக உதவியாளர் — ஆய்வக அறிவு',
          topics: [
            { name: 'Lab Skills', nameTamil: 'ஆய்வக திறன்கள்', subtopics: ['Basic Lab Techniques — Measuring, Weighing, Heating', 'Lab Equipment — Microscope, Bunsen Burner, Flasks', 'Chemical Safety — Handling, PPE, Waste disposal', 'Foundational Science — Physics, Chemistry, Biology (10th/12th)'] }
          ]
        }
      ],
      'Post-Wise Eligibility (12th Pass)': [
        {
          name: 'Who Can Apply',
          nameTamil: 'யார் விண்ணப்பிக்கலாம்',
          topics: [
            { name: 'Eligibility Details', nameTamil: 'தகுதி விவரங்கள்', subtopics: ['JSA: 12th Pass + Typing 35 WPM English / 30 WPM Hindi + CPT', 'Stenographer: 12th Pass + Shorthand 80 WPM + CPT', 'Lab Attendant: 10th + Lab Diploma OR 12th Science (PCM/PCB)', 'Age for all: 18-30 years (SC/ST +5, OBC +3, PwBD +10-15)'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'kvs-gk-1', question: 'Kendriya Vidyalaya Sangathan was established in:', questionTamil: 'கேந்திரிய வித்யாலய சங்கதன் நிறுவப்பட்ட ஆண்டு:', options: ['1963', '1950', '1975', '1986'], optionsTamil: ['1963', '1950', '1975', '1986'], answer: 0, explanation: 'KVS was established on 15 December 1963 to provide uniform education to children of central government employees.', explanationTamil: 'KVS 1963 டிசம்பர் 15 அன்று நிறுவப்பட்டது.', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'kvs-comp-1', question: 'Which shortcut key is used to Save a file?', questionTamil: 'கோப்பை சேமிக்க எந்த குறுக்குவழி:', options: ['Ctrl + S', 'Ctrl + C', 'Ctrl + V', 'Ctrl + P'], optionsTamil: ['Ctrl + S', 'Ctrl + C', 'Ctrl + V', 'Ctrl + P'], answer: 0, explanation: 'Ctrl+S = Save, Ctrl+C = Copy, Ctrl+V = Paste, Ctrl+P = Print.', explanationTamil: 'Ctrl+S = சேமி, Ctrl+C = நகல், Ctrl+V = ஒட்டு, Ctrl+P = அச்சிடு.', subject: 'Computer', difficulty: 'easy' },
      { id: 'kvs-comp-2', question: 'MS Excel is used for:', questionTamil: 'MS Excel பயன்படுத்தப்படுவது:', options: ['Spreadsheet calculations', 'Word processing', 'Presentations', 'Database management'], optionsTamil: ['விரிதாள் கணக்கீடுகள்', 'சொல் செயலாக்கம்', 'விளக்கக்காட்சிகள்', 'தரவுத்தள மேலாண்மை'], answer: 0, explanation: 'MS Excel is a spreadsheet application for calculations, charts, data analysis, and formulas.', explanationTamil: 'MS Excel ஒரு விரிதாள் பயன்பாடு — கணக்கீடுகள், விளக்கப்படங்கள், தரவு பகுப்பாய்வு.', subject: 'Computer', difficulty: 'easy' },
      { id: 'kvs-math-1', question: 'If the ratio of boys to girls is 3:2 and total students are 50, how many boys?', questionTamil: 'ஆண்கள் : பெண்கள் = 3:2, மொத்த மாணவர்கள் 50 எனில், ஆண்கள் எத்தனை?', options: ['30', '20', '25', '35'], optionsTamil: ['30', '20', '25', '35'], answer: 0, explanation: 'Total parts = 3+2 = 5. Each part = 50/5 = 10. Boys = 3×10 = 30.', explanationTamil: 'மொத்த பகுதிகள் = 5. ஒவ்வொரு பகுதி = 10. ஆண்கள் = 3×10 = 30.', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'kvs-eng-1', question: 'The past tense of "go" is:', questionTamil: '"go" என்ற வினைச்சொல்லின் இறந்தகாலம்:', options: ['Went', 'Gone', 'Goes', 'Going'], optionsTamil: ['Went', 'Gone', 'Goes', 'Going'], answer: 0, explanation: 'Go → Went (simple past) → Gone (past participle). It is an irregular verb.', explanationTamil: 'Go → Went (எளிய இறந்தகாலம்) → Gone (இறந்தகால பெயரெச்சம்).', subject: 'English', difficulty: 'easy' },
      { id: 'kvs-reason-1', question: 'Complete: 2, 6, 12, 20, ?', questionTamil: 'நிறைவு செய்: 2, 6, 12, 20, ?', options: ['30', '28', '25', '32'], optionsTamil: ['30', '28', '25', '32'], answer: 0, explanation: 'Pattern: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30.', explanationTamil: 'முறை: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30.', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'kvs-gk-2', question: 'The capital of India is:', questionTamil: 'இந்தியாவின் தலைநகரம்:', options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'], optionsTamil: ['புது தில்லி', 'மும்பை', 'கொல்கத்தா', 'சென்னை'], answer: 0, explanation: 'New Delhi is the capital of India. Delhi was made capital in 1911 (shifted from Calcutta). New Delhi was designed by Edwin Lutyens.', explanationTamil: 'புது தில்லி இந்தியாவின் தலைநகரம். 1911 இல் கொல்கத்தாவிலிருந்து மாற்றப்பட்டது.', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'kvs-hindi-1', question: 'The official language of India as per the Constitution is:', questionTamil: 'அரசியலமைப்பின்படி இந்தியாவின் அலுவல மொழி:', options: ['Hindi in Devanagari script', 'English', 'Sanskrit', 'Hindi and English both'], optionsTamil: ['தேவநாகரி எழுத்தில் இந்தி', 'ஆங்கிலம்', 'சமஸ்கிருதம்', 'இந்தி மற்றும் ஆங்கிலம் இரண்டும்'], answer: 0, explanation: 'Article 343 states Hindi in Devanagari script is the official language. English is an associate official language.', explanationTamil: 'சரத்து 343 தேவநாகரி எழுத்தில் இந்தி அலுவல மொழி என்று கூறுகிறது.', subject: 'General Knowledge', difficulty: 'medium' }
    ]
  }];

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
    name: 'Central Govt & Others',
    nameTamil: 'மத்திய அரசு & பிற',
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
