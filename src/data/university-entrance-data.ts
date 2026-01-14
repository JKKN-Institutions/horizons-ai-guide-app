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

export interface Course {
  id: string;
  name: string;
  nameTamil: string;
  type: 'UG' | 'PG' | 'Research';
  examPattern: ExamPattern;
  syllabus: SyllabusUnit[];
  previousQuestions: PreviousQuestion[];
  tips: string[];
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
      {
        id: 'tancet-mba',
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
            {
              name: 'Verbal Ability',
              nameTamil: 'மொழித்திறன்',
              questions: 30,
              marks: 30,
              topics: ['Reading Comprehension', 'Synonyms & Antonyms', 'Fill in the Blanks', 'Sentence Correction', 'Para Jumbles', 'Idioms & Phrases']
            },
            {
              name: 'Quantitative Aptitude',
              nameTamil: 'எண்ணியல் திறன்',
              questions: 35,
              marks: 35,
              topics: ['Number System', 'Percentage', 'Profit & Loss', 'Time & Work', 'Time Speed Distance', 'Ratio & Proportion', 'Data Interpretation']
            },
            {
              name: 'Logical Reasoning',
              nameTamil: 'தர்க்க அறிவு',
              questions: 35,
              marks: 35,
              topics: ['Coding-Decoding', 'Blood Relations', 'Seating Arrangement', 'Syllogisms', 'Puzzles', 'Series']
            }
          ]
        },
        syllabus: [
          {
            unitNumber: 1,
            title: 'Verbal Ability',
            titleTamil: 'மொழித்திறன்',
            expectedQuestions: 30,
            difficulty: 'Medium',
            topics: [
              { name: 'Reading Comprehension', subtopics: ['Main idea', 'Inference', 'Vocabulary in context', 'Author tone'], importance: 'High' },
              { name: 'Synonyms & Antonyms', subtopics: ['Common words', 'Contextual meaning'], importance: 'Medium' },
              { name: 'Sentence Correction', subtopics: ['Subject-verb agreement', 'Tense errors', 'Modifier errors'], importance: 'High' },
              { name: 'Para Jumbles', subtopics: ['Logical sequencing', 'Connectors'], importance: 'Medium' },
              { name: 'Fill in the Blanks', subtopics: ['Single blank', 'Double blank', 'Grammar-based'], importance: 'Medium' }
            ]
          },
          {
            unitNumber: 2,
            title: 'Quantitative Aptitude',
            titleTamil: 'எண்ணியல் திறன்',
            expectedQuestions: 35,
            difficulty: 'Medium',
            topics: [
              { name: 'Number System', subtopics: ['LCM & HCF', 'Divisibility', 'Remainders'], importance: 'High' },
              { name: 'Percentage', subtopics: ['Basic percentage', 'Successive percentage', 'Population problems'], importance: 'High' },
              { name: 'Profit & Loss', subtopics: ['Basic P&L', 'Discount', 'Marked Price'], importance: 'High' },
              { name: 'Simple & Compound Interest', subtopics: ['SI formulas', 'CI formulas', 'Difference between SI & CI'], importance: 'Medium' },
              { name: 'Time & Work', subtopics: ['Individual work', 'Combined work', 'Pipes & Cisterns'], importance: 'High' },
              { name: 'Time Speed Distance', subtopics: ['Average speed', 'Relative speed', 'Trains', 'Boats & Streams'], importance: 'High' },
              { name: 'Ratio & Proportion', subtopics: ['Basic ratio', 'Partnership', 'Mixtures'], importance: 'Medium' },
              { name: 'Data Interpretation', subtopics: ['Tables', 'Bar graphs', 'Pie charts', 'Line graphs'], importance: 'High' }
            ]
          },
          {
            unitNumber: 3,
            title: 'Logical Reasoning',
            titleTamil: 'தர்க்க அறிவு',
            expectedQuestions: 35,
            difficulty: 'Medium',
            topics: [
              { name: 'Coding-Decoding', subtopics: ['Letter coding', 'Number coding', 'Mixed coding'], importance: 'High' },
              { name: 'Blood Relations', subtopics: ['Family tree', 'Coded relations'], importance: 'Medium' },
              { name: 'Direction Sense', subtopics: ['Basic directions', 'Shadow-based'], importance: 'Low' },
              { name: 'Seating Arrangement', subtopics: ['Linear', 'Circular', 'Rectangular'], importance: 'High' },
              { name: 'Syllogisms', subtopics: ['All/Some/No statements', 'Conclusions'], importance: 'High' },
              { name: 'Puzzles', subtopics: ['Floor puzzles', 'Scheduling', 'Comparison'], importance: 'High' },
              { name: 'Series', subtopics: ['Number series', 'Letter series', 'Mixed series'], importance: 'Medium' }
            ]
          }
        ],
        previousQuestions: [
          {
            id: 'mba-q1',
            question: 'A shopkeeper marks up his goods by 40% and gives 20% discount. What is his profit percentage?',
            options: ['8%', '10%', '12%', '15%'],
            correctAnswer: 2,
            explanation: 'Let CP = ₹100. Marked Price = 100 + 40% = ₹140. Discount = 20% of 140 = ₹28. SP = 140 - 28 = ₹112. Profit = ₹12. Profit% = 12%',
            topic: 'Profit & Loss',
            difficulty: 'Medium'
          },
          {
            id: 'mba-q2',
            question: '15 workers can complete a work in 10 days. How many workers are needed to complete the same work in 6 days?',
            options: ['20', '25', '30', '18'],
            correctAnswer: 1,
            explanation: 'Workers × Days = Constant. 15 × 10 = x × 6. 150 = 6x. x = 25 workers',
            topic: 'Time & Work',
            difficulty: 'Easy'
          },
          {
            id: 'mba-q3',
            question: 'A train 150m long passes a pole in 15 seconds. Find its speed in km/hr.',
            options: ['36 km/hr', '40 km/hr', '45 km/hr', '54 km/hr'],
            correctAnswer: 0,
            explanation: 'Speed = Distance/Time = 150/15 = 10 m/s. Speed in km/hr = 10 × (18/5) = 36 km/hr',
            topic: 'Time Speed Distance',
            difficulty: 'Easy'
          },
          {
            id: 'mba-q4',
            question: 'Pointing to a man, Sita said "His mother is the only daughter of my mother". How is Sita related to the man?',
            options: ['Mother', 'Daughter', 'Sister', 'Aunt'],
            correctAnswer: 0,
            explanation: 'Only daughter of my mother = Sita herself. His mother = Sita. So Sita is the man\'s mother.',
            topic: 'Blood Relations',
            difficulty: 'Medium'
          },
          {
            id: 'mba-q5',
            question: 'Choose the synonym of "BENEVOLENT":',
            options: ['Cruel', 'Kind', 'Strict', 'Proud'],
            correctAnswer: 1,
            explanation: 'Benevolent means well-meaning and kindly. Kind is the correct synonym.',
            topic: 'Synonyms',
            difficulty: 'Easy'
          },
          {
            id: 'mba-q6',
            question: 'If the price of an item increases by 20% and then decreases by 20%, what is the net change?',
            options: ['No change', '4% increase', '4% decrease', '2% decrease'],
            correctAnswer: 2,
            explanation: 'Using formula: Net change = -ab/100 = -(20×20)/100 = -4%. There is a 4% decrease.',
            topic: 'Percentage',
            difficulty: 'Medium'
          },
          {
            id: 'mba-q7',
            question: 'In a certain code, COMPUTER is written as RFUVQNPC. How is MEDICINE written in that code?',
            options: ['EDJDJOFM', 'FNDJDJOF', 'MFEJDJOF', 'FNDJDJEM'],
            correctAnswer: 2,
            explanation: 'Pattern: Each letter is replaced by the next letter and the word is reversed.',
            topic: 'Coding-Decoding',
            difficulty: 'Hard'
          },
          {
            id: 'mba-q8',
            question: 'The average of 5 numbers is 20. If one number is excluded, the average becomes 18. What is the excluded number?',
            options: ['24', '26', '28', '30'],
            correctAnswer: 2,
            explanation: 'Sum of 5 numbers = 5 × 20 = 100. Sum of 4 numbers = 4 × 18 = 72. Excluded number = 100 - 72 = 28',
            topic: 'Average',
            difficulty: 'Easy'
          }
        ],
        tips: [
          'Focus more on Quantitative Aptitude - it has 35 questions',
          'Practice Data Interpretation daily - usually 4-5 questions',
          'Learn shortcuts for Time & Work, Percentage problems',
          'Read newspapers for vocabulary improvement',
          'Solve previous year papers under timed conditions'
        ]
      },
      {
        id: 'tancet-mca',
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
            {
              name: 'Quantitative Aptitude',
              nameTamil: 'எண்ணியல் திறன்',
              questions: 30,
              marks: 30,
              topics: ['Number System', 'Algebra', 'Geometry', 'Arithmetic']
            },
            {
              name: 'Logical Reasoning',
              nameTamil: 'தர்க்க அறிவு',
              questions: 25,
              marks: 25,
              topics: ['Coding', 'Series', 'Puzzles', 'Syllogisms']
            },
            {
              name: 'Computer Awareness',
              nameTamil: 'கணினி அறிவு',
              questions: 25,
              marks: 25,
              topics: ['Fundamentals', 'Programming', 'Data Structures', 'DBMS', 'Networks']
            },
            {
              name: 'Verbal Ability',
              nameTamil: 'மொழித்திறன்',
              questions: 20,
              marks: 20,
              topics: ['Grammar', 'Vocabulary', 'Comprehension']
            }
          ]
        },
        syllabus: [
          {
            unitNumber: 1,
            title: 'Computer Awareness',
            titleTamil: 'கணினி அறிவு',
            expectedQuestions: 25,
            difficulty: 'Medium',
            topics: [
              { name: 'Computer Fundamentals', subtopics: ['Hardware components', 'Software types', 'Memory types', 'I/O devices'], importance: 'High' },
              { name: 'Operating Systems', subtopics: ['Windows basics', 'Linux basics', 'Process management', 'Memory management'], importance: 'Medium' },
              { name: 'Programming Concepts', subtopics: ['C basics', 'C++ OOP', 'Java basics', 'Python basics'], importance: 'High' },
              { name: 'Data Structures', subtopics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs'], importance: 'High' },
              { name: 'Database Concepts', subtopics: ['DBMS basics', 'SQL queries', 'Normalization', 'ER diagrams'], importance: 'High' },
              { name: 'Computer Networks', subtopics: ['OSI model', 'TCP/IP', 'Protocols', 'Network devices'], importance: 'Medium' },
              { name: 'Number Systems', subtopics: ['Binary', 'Octal', 'Hexadecimal', 'Conversions'], importance: 'Medium' }
            ]
          }
        ],
        previousQuestions: [
          {
            id: 'mca-q1',
            question: 'Which data structure uses LIFO principle?',
            options: ['Queue', 'Stack', 'Linked List', 'Array'],
            correctAnswer: 1,
            explanation: 'Stack follows Last In First Out (LIFO) principle. Queue follows First In First Out (FIFO).',
            topic: 'Data Structures',
            difficulty: 'Easy'
          },
          {
            id: 'mca-q2',
            question: 'Convert binary 1011 to decimal:',
            options: ['9', '10', '11', '12'],
            correctAnswer: 2,
            explanation: '1011 = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11',
            topic: 'Number Systems',
            difficulty: 'Easy'
          },
          {
            id: 'mca-q3',
            question: 'Primary key in a database is used for:',
            options: ['Sorting data', 'Unique identification', 'Indexing only', 'None of these'],
            correctAnswer: 1,
            explanation: 'Primary key uniquely identifies each record in a database table.',
            topic: 'Database',
            difficulty: 'Easy'
          },
          {
            id: 'mca-q4',
            question: 'Which is NOT an operating system?',
            options: ['Windows', 'Linux', 'Oracle', 'macOS'],
            correctAnswer: 2,
            explanation: 'Oracle is a Database Management System (DBMS), not an operating system.',
            topic: 'Operating Systems',
            difficulty: 'Easy'
          },
          {
            id: 'mca-q5',
            question: 'Time complexity of binary search is:',
            options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
            correctAnswer: 1,
            explanation: 'Binary search divides the array in half each time, giving O(log n) complexity.',
            topic: 'Data Structures',
            difficulty: 'Medium'
          },
          {
            id: 'mca-q6',
            question: 'Which normal form removes partial dependency?',
            options: ['1NF', '2NF', '3NF', 'BCNF'],
            correctAnswer: 1,
            explanation: '2NF (Second Normal Form) removes partial dependency. 3NF removes transitive dependency.',
            topic: 'Database',
            difficulty: 'Medium'
          },
          {
            id: 'mca-q7',
            question: 'In C programming, which operator has highest precedence?',
            options: ['++', '*', '&&', '='],
            correctAnswer: 0,
            explanation: 'Unary operators like ++ and -- have higher precedence than binary operators.',
            topic: 'Programming',
            difficulty: 'Medium'
          },
          {
            id: 'mca-q8',
            question: 'Which layer of OSI model is responsible for routing?',
            options: ['Physical', 'Data Link', 'Network', 'Transport'],
            correctAnswer: 2,
            explanation: 'Network layer (Layer 3) handles routing and IP addressing.',
            topic: 'Networks',
            difficulty: 'Easy'
          }
        ],
        tips: [
          'Computer Awareness is unique to MCA - prepare well',
          'Focus on Data Structures and Algorithms',
          'Practice number system conversions',
          'Learn basic SQL queries',
          'Understand OOP concepts clearly'
        ]
      },
      {
        id: 'tancet-me-mtech',
        name: 'M.E./M.Tech',
        nameTamil: 'எம்.இ./எம்.டெக்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Linear Algebra', 'Calculus', 'Differential Equations', 'Probability'] },
            { name: 'Core Engineering', nameTamil: 'முக்கிய பொறியியல்', questions: 80, marks: 80, topics: ['Branch Specific Topics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on Engineering Mathematics - common for all branches', 'Core engineering section is branch specific', 'Practice previous year papers']
      },
      {
        id: 'tancet-mphil',
        name: 'M.Phil',
        nameTamil: 'எம்.ஃபில்',
        type: 'Research',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Research Methodology', nameTamil: 'ஆராய்ச்சி முறையியல்', questions: 50, marks: 50, topics: ['Research Design', 'Data Collection', 'Statistical Analysis', 'Report Writing'] },
            { name: 'Subject Specific', nameTamil: 'பாடம் சார்ந்த', questions: 50, marks: 50, topics: ['Domain Specific Topics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Research methodology is common for all', 'Focus on statistical methods', 'Understand research ethics']
      },
      {
        id: 'barch',
        name: 'B.Arch',
        nameTamil: 'பி.ஆர்க்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 25, marks: 25, topics: ['Algebra', 'Trigonometry', 'Coordinate Geometry', 'Calculus'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 50, marks: 50, topics: ['Spatial Ability', 'Observation', 'Aesthetic Sense', 'Drawing'] },
            { name: 'Drawing', nameTamil: 'வரைதல்', questions: 25, marks: 25, topics: ['Sketching', '3D Perception', 'Design'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Practice sketching daily', 'Develop spatial visualization', 'Focus on aesthetic sense questions']
      },
      {
        id: 'msc-physics',
        name: 'M.Sc. Physics',
        nameTamil: 'எம்.எஸ்சி. இயற்பியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Classical Mechanics', nameTamil: 'இயற்பியல் இயக்கவியல்', questions: 20, marks: 20, topics: ['Lagrangian', 'Hamiltonian', 'Central Forces'] },
            { name: 'Quantum Mechanics', nameTamil: 'குவாண்டம் இயக்கவியல்', questions: 20, marks: 20, topics: ['Wave Functions', 'Operators', 'Schrödinger Equation'] },
            { name: 'Electromagnetism', nameTamil: 'மின்காந்தவியல்', questions: 20, marks: 20, topics: ['Maxwell Equations', 'EM Waves', 'Radiation'] },
            { name: 'Statistical Mechanics', nameTamil: 'புள்ளியியல் இயக்கவியல்', questions: 20, marks: 20, topics: ['Ensembles', 'Quantum Statistics', 'Phase Transitions'] },
            { name: 'Modern Physics', nameTamil: 'நவீன இயற்பியல்', questions: 20, marks: 20, topics: ['Special Relativity', 'Atomic Physics', 'Nuclear Physics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'phy-q1', question: 'The Lagrangian L = T - V is invariant under translation. The conserved quantity is:', options: ['Energy', 'Linear Momentum', 'Angular Momentum', 'Mass'], correctAnswer: 1, explanation: 'By Noether theorem, translational invariance leads to conservation of linear momentum.', topic: 'Classical Mechanics', difficulty: 'Medium' },
          { id: 'phy-q2', question: 'The ground state energy of a particle in a 1D infinite potential well of width L is:', options: ['ℏ²π²/2mL²', 'ℏ²π²/mL²', '2ℏ²π²/mL²', 'ℏ²π²/4mL²'], correctAnswer: 0, explanation: 'En = n²ℏ²π²/2mL². For n=1, E₁ = ℏ²π²/2mL²', topic: 'Quantum Mechanics', difficulty: 'Easy' }
        ],
        tips: ['Focus on Quantum Mechanics - high weightage', 'Practice mathematical physics', 'Understand Classical Mechanics concepts well']
      },
      {
        id: 'msc-chemistry',
        name: 'M.Sc. Chemistry',
        nameTamil: 'எம்.எஸ்சி. வேதியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Organic Chemistry', nameTamil: 'கரிம வேதியியல்', questions: 30, marks: 30, topics: ['Reaction Mechanisms', 'Stereochemistry', 'Named Reactions', 'Spectroscopy'] },
            { name: 'Inorganic Chemistry', nameTamil: 'கனிம வேதியியல்', questions: 30, marks: 30, topics: ['Coordination Chemistry', 'Organometallics', 'Bioinorganic', 'Solid State'] },
            { name: 'Physical Chemistry', nameTamil: 'பெளதிக வேதியியல்', questions: 30, marks: 30, topics: ['Thermodynamics', 'Kinetics', 'Quantum Chemistry', 'Electrochemistry'] },
            { name: 'Analytical Chemistry', nameTamil: 'பகுப்பாய்வு வேதியியல்', questions: 10, marks: 10, topics: ['Instrumental Analysis', 'Separation Techniques'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'chem-q1', question: 'The product of Aldol condensation is:', options: ['α-hydroxy ketone', 'β-hydroxy aldehyde', 'α,β-unsaturated aldehyde', 'Both B & C'], correctAnswer: 3, explanation: 'Aldol condensation gives β-hydroxy aldehyde which on heating gives α,β-unsaturated aldehyde.', topic: 'Organic Chemistry', difficulty: 'Easy' }
        ],
        tips: ['Organic reactions and mechanisms are most important', 'Practice spectroscopy problems', 'Learn coordination compounds well']
      },
      {
        id: 'msc-biotechnology',
        name: 'M.Sc. Biotechnology',
        nameTamil: 'எம்.எஸ்சி. உயிரி தொழில்நுட்பம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Molecular Biology', nameTamil: 'மூலக்கூறு உயிரியல்', questions: 25, marks: 25, topics: ['DNA Replication', 'Transcription', 'Translation', 'Gene Regulation'] },
            { name: 'Genetic Engineering', nameTamil: 'மரபணு பொறியியல்', questions: 25, marks: 25, topics: ['Cloning Vectors', 'PCR', 'DNA Sequencing', 'CRISPR'] },
            { name: 'Biochemistry', nameTamil: 'உயிர் வேதியியல்', questions: 25, marks: 25, topics: ['Enzymes', 'Metabolism', 'Proteins', 'Lipids'] },
            { name: 'Cell Biology', nameTamil: 'உயிரணு உயிரியல்', questions: 25, marks: 25, topics: ['Cell Structure', 'Cell Cycle', 'Signaling', 'Apoptosis'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on Molecular Biology techniques', 'Learn recombinant DNA technology', 'Understand CRISPR and modern techniques']
      },
      {
        id: 'msc-microbiology',
        name: 'M.Sc. Microbiology',
        nameTamil: 'எம்.எஸ்சி. நுண்ணுயிரியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'General Microbiology', nameTamil: 'பொது நுண்ணுயிரியல்', questions: 30, marks: 30, topics: ['Bacteria', 'Fungi', 'Viruses', 'Parasites'] },
            { name: 'Immunology', nameTamil: 'நோயெதிர்ப்பியல்', questions: 25, marks: 25, topics: ['Antibodies', 'Antigens', 'Immunity Types', 'Vaccines'] },
            { name: 'Medical Microbiology', nameTamil: 'மருத்துவ நுண்ணுயிரியல்', questions: 25, marks: 25, topics: ['Pathogenic Bacteria', 'Diagnostic Tests', 'Antibiotics'] },
            { name: 'Industrial Microbiology', nameTamil: 'தொழில்துறை நுண்ணுயிரியல்', questions: 20, marks: 20, topics: ['Fermentation', 'Enzyme Production', 'Bioprocessing'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Learn bacterial classification thoroughly', 'Immunology concepts are important', 'Understand diagnostic techniques']
      },
      {
        id: 'msc-electronics',
        name: 'M.Sc. Electronics',
        nameTamil: 'எம்.எஸ்சி. மின்னணுவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Analog Electronics', nameTamil: 'அனலாக் மின்னணுவியல்', questions: 25, marks: 25, topics: ['Amplifiers', 'Oscillators', 'Op-Amps', 'Power Supplies'] },
            { name: 'Digital Electronics', nameTamil: 'டிஜிட்டல் மின்னணுவியல்', questions: 25, marks: 25, topics: ['Logic Gates', 'Flip-Flops', 'Counters', 'Microprocessors'] },
            { name: 'Communication Systems', nameTamil: 'தொடர்பு அமைப்புகள்', questions: 25, marks: 25, topics: ['AM/FM', 'Digital Modulation', 'Fiber Optics'] },
            { name: 'Semiconductor Devices', nameTamil: 'குறைகடத்தி சாதனங்கள்', questions: 25, marks: 25, topics: ['Diodes', 'Transistors', 'FETs', 'ICs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Practice circuit analysis', 'Understand semiconductor physics', 'Learn microprocessor concepts']
      }
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
      {
        id: 'msc-mathematics',
        name: 'M.Sc. Mathematics',
        nameTamil: 'எம்.எஸ்சி. கணிதம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Algebra', nameTamil: 'இயற்கணிதம்', questions: 20, marks: 20, topics: ['Groups', 'Rings', 'Fields', 'Vector Spaces'] },
            { name: 'Real Analysis', nameTamil: 'மெய் பகுப்பாய்வு', questions: 20, marks: 20, topics: ['Sequences', 'Series', 'Limits', 'Continuity'] },
            { name: 'Complex Analysis', nameTamil: 'கலப்பு பகுப்பாய்வு', questions: 15, marks: 15, topics: ['Analytic Functions', 'Cauchy Theorem', 'Residues'] },
            { name: 'Differential Equations', nameTamil: 'வகைக்கெழு சமன்பாடுகள்', questions: 15, marks: 15, topics: ['ODE', 'PDE', 'Laplace Transform'] },
            { name: 'Numerical Analysis', nameTamil: 'எண் பகுப்பாய்வு', questions: 15, marks: 15, topics: ['Interpolation', 'Numerical Integration'] },
            { name: 'Discrete Mathematics', nameTamil: 'தனித்த கணிதம்', questions: 15, marks: 15, topics: ['Set Theory', 'Graph Theory', 'Combinatorics'] }
          ]
        },
        syllabus: [
          {
            unitNumber: 1,
            title: 'Algebra',
            titleTamil: 'இயற்கணிதம்',
            expectedQuestions: 20,
            difficulty: 'Medium',
            topics: [
              { name: 'Group Theory', subtopics: ['Groups', 'Subgroups', 'Normal Subgroups', 'Cyclic Groups', 'Permutation Groups', 'Lagrange Theorem', 'Homomorphisms'], importance: 'High' },
              { name: 'Ring Theory', subtopics: ['Rings', 'Integral Domains', 'Fields', 'Polynomial Rings', 'UFD', 'PID'], importance: 'High' },
              { name: 'Linear Algebra', subtopics: ['Vector Spaces', 'Linear Transformations', 'Eigenvalues', 'Eigenvectors', 'Inner Product Spaces'], importance: 'High' }
            ]
          },
          {
            unitNumber: 2,
            title: 'Real Analysis',
            titleTamil: 'மெய் பகுப்பாய்வு',
            expectedQuestions: 20,
            difficulty: 'Hard',
            topics: [
              { name: 'Sequences & Series', subtopics: ['Convergence tests', 'Cauchy sequences', 'Power series'], importance: 'High' },
              { name: 'Continuity & Differentiability', subtopics: ['Limits', 'Continuity', 'Uniform continuity', 'Differentiability'], importance: 'High' },
              { name: 'Integration', subtopics: ['Riemann Integration', 'Improper integrals'], importance: 'Medium' },
              { name: 'Metric Spaces', subtopics: ['Open sets', 'Closed sets', 'Compactness', 'Connectedness'], importance: 'Medium' }
            ]
          },
          {
            unitNumber: 3,
            title: 'Complex Analysis',
            titleTamil: 'கலப்பு பகுப்பாய்வு',
            expectedQuestions: 15,
            difficulty: 'Medium',
            topics: [
              { name: 'Analytic Functions', subtopics: ['Cauchy-Riemann equations', 'Harmonic functions'], importance: 'High' },
              { name: 'Complex Integration', subtopics: ['Cauchy theorem', 'Cauchy integral formula'], importance: 'High' },
              { name: 'Series & Residues', subtopics: ['Taylor series', 'Laurent series', 'Residue theorem'], importance: 'High' }
            ]
          }
        ],
        previousQuestions: [
          {
            id: 'math-q1',
            question: 'The number of generators of a cyclic group of order 12 is:',
            options: ['2', '4', '6', '12'],
            correctAnswer: 1,
            explanation: 'Number of generators = φ(12) = 12 × (1-1/2) × (1-1/3) = 4. Generators are {1, 5, 7, 11}',
            topic: 'Group Theory',
            difficulty: 'Medium'
          },
          {
            id: 'math-q2',
            question: 'If f(z) = u + iv is analytic and u = x² - y², then v equals:',
            options: ['2xy', '-2xy', 'x² + y²', 'xy'],
            correctAnswer: 0,
            explanation: 'By Cauchy-Riemann: ∂u/∂x = ∂v/∂y. ∂u/∂x = 2x, so ∂v/∂y = 2x. Integrating: v = 2xy',
            topic: 'Complex Analysis',
            difficulty: 'Medium'
          },
          {
            id: 'math-q3',
            question: 'The order of the element (1 2 3) in S₃ is:',
            options: ['1', '2', '3', '6'],
            correctAnswer: 2,
            explanation: '(1 2 3) is a 3-cycle. Order of a k-cycle is k. So order = 3',
            topic: 'Group Theory',
            difficulty: 'Easy'
          },
          {
            id: 'math-q4',
            question: 'The radius of convergence of Σ(x^n/n!) is:',
            options: ['0', '1', 'e', '∞'],
            correctAnswer: 3,
            explanation: 'Using ratio test: lim|a_{n+1}/a_n| = lim|x/(n+1)| = 0 for all x. So R = ∞',
            topic: 'Real Analysis',
            difficulty: 'Medium'
          }
        ],
        tips: [
          'Focus heavily on Algebra - 20 questions',
          'Real Analysis is considered tough - practice theorems',
          'Complex Analysis - master Cauchy-Riemann equations',
          'Numerical methods - learn formulas by heart',
          'Practice proof-based questions'
        ]
      },
      {
        id: 'msc-computer-science',
        name: 'M.Sc. Computer Science',
        nameTamil: 'எம்.எஸ்சி. கணினி அறிவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Programming', nameTamil: 'நிரலாக்கம்', questions: 25, marks: 25, topics: ['C', 'C++', 'Java', 'Python basics'] },
            { name: 'Data Structures', nameTamil: 'தரவு கட்டமைப்புகள்', questions: 20, marks: 20, topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs'] },
            { name: 'Database', nameTamil: 'தரவுத்தளம்', questions: 15, marks: 15, topics: ['SQL', 'Normalization', 'ER Diagrams'] },
            { name: 'Operating Systems', nameTamil: 'இயங்குதளம்', questions: 15, marks: 15, topics: ['Process', 'Memory', 'File Systems'] },
            { name: 'Networks', nameTamil: 'வலையமைப்பு', questions: 15, marks: 15, topics: ['OSI', 'TCP/IP', 'Protocols'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 10, marks: 10, topics: ['Discrete Math', 'Probability'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'cs-q1', question: 'Time complexity of Quick Sort in average case is:', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], correctAnswer: 1, explanation: 'Quick Sort has O(n log n) average case.', topic: 'Data Structures', difficulty: 'Easy' },
          { id: 'cs-q2', question: 'Which scheduling algorithm may cause starvation?', options: ['Round Robin', 'FCFS', 'Priority Scheduling', 'SJF'], correctAnswer: 2, explanation: 'Priority Scheduling can cause starvation of low priority processes.', topic: 'Operating Systems', difficulty: 'Medium' }
        ],
        tips: ['Programming section is most important - 25 questions', 'Practice Data Structure problems', 'Learn SQL queries thoroughly']
      },
      {
        id: 'msc-physics-pu',
        name: 'M.Sc. Physics',
        nameTamil: 'எம்.எஸ்சி. இயற்பியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Classical Mechanics', nameTamil: 'இயக்கவியல்', questions: 20, marks: 20, topics: ['Lagrangian', 'Hamiltonian', 'Central Forces'] },
            { name: 'Quantum Mechanics', nameTamil: 'குவாண்டம் இயக்கவியல்', questions: 25, marks: 25, topics: ['Wave Functions', 'Operators', 'Schrödinger Equation'] },
            { name: 'Electromagnetism', nameTamil: 'மின்காந்தவியல்', questions: 25, marks: 25, topics: ['Maxwell Equations', 'EM Waves'] },
            { name: 'Thermodynamics', nameTamil: 'வெப்ப இயக்கவியல்', questions: 15, marks: 15, topics: ['Laws of Thermodynamics', 'Entropy'] },
            { name: 'Modern Physics', nameTamil: 'நவீன இயற்பியல்', questions: 15, marks: 15, topics: ['Relativity', 'Atomic Physics', 'Nuclear Physics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on Quantum Mechanics', 'Practice numerical problems', 'Learn classical mechanics derivations']
      },
      {
        id: 'msc-chemistry-pu',
        name: 'M.Sc. Chemistry',
        nameTamil: 'எம்.எஸ்சி. வேதியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Organic Chemistry', nameTamil: 'கரிம வேதியியல்', questions: 35, marks: 35, topics: ['Reactions', 'Mechanisms', 'Spectroscopy'] },
            { name: 'Inorganic Chemistry', nameTamil: 'கனிம வேதியியல்', questions: 35, marks: 35, topics: ['Coordination', 'Organometallics'] },
            { name: 'Physical Chemistry', nameTamil: 'பெளதிக வேதியியல்', questions: 30, marks: 30, topics: ['Thermodynamics', 'Kinetics', 'Electrochemistry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Organic reactions are crucial', 'Practice spectroscopy problems', 'Learn coordination chemistry well']
      },
      {
        id: 'msc-zoology',
        name: 'M.Sc. Zoology',
        nameTamil: 'எம்.எஸ்சி. விலங்கியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Animal Diversity', nameTamil: 'விலங்கு பன்முகத்தன்மை', questions: 25, marks: 25, topics: ['Invertebrates', 'Vertebrates', 'Classification'] },
            { name: 'Cell Biology', nameTamil: 'உயிரணு உயிரியல்', questions: 25, marks: 25, topics: ['Cell Structure', 'Cell Division', 'Genetics'] },
            { name: 'Physiology', nameTamil: 'உடலியல்', questions: 25, marks: 25, topics: ['Digestive', 'Respiratory', 'Nervous System'] },
            { name: 'Ecology', nameTamil: 'சூழலியல்', questions: 25, marks: 25, topics: ['Ecosystems', 'Population', 'Conservation'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Learn animal classification', 'Focus on cell biology concepts', 'Understand physiological processes']
      },
      {
        id: 'msc-botany',
        name: 'M.Sc. Botany',
        nameTamil: 'எம்.எஸ்சி. தாவரவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Plant Diversity', nameTamil: 'தாவர பன்முகத்தன்மை', questions: 25, marks: 25, topics: ['Algae', 'Fungi', 'Bryophytes', 'Pteridophytes', 'Angiosperms'] },
            { name: 'Plant Physiology', nameTamil: 'தாவர உடலியல்', questions: 25, marks: 25, topics: ['Photosynthesis', 'Respiration', 'Transpiration'] },
            { name: 'Genetics', nameTamil: 'மரபியல்', questions: 25, marks: 25, topics: ['Mendelian Genetics', 'Molecular Genetics', 'Plant Breeding'] },
            { name: 'Ecology', nameTamil: 'சூழலியல்', questions: 25, marks: 25, topics: ['Plant Communities', 'Ecosystems'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Learn plant classification', 'Focus on photosynthesis mechanisms', 'Understand genetics well']
      },
      {
        id: 'ma-english',
        name: 'M.A. English',
        nameTamil: 'எம்.ஏ. ஆங்கிலம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'British Literature', nameTamil: 'பிரிட்டிஷ் இலக்கியம்', questions: 30, marks: 30, topics: ['Shakespeare', 'Romantic Period', 'Victorian Era', 'Modern British'] },
            { name: 'American Literature', nameTamil: 'அமெரிக்க இலக்கியம்', questions: 20, marks: 20, topics: ['American Renaissance', 'Modern American'] },
            { name: 'Indian Writing in English', nameTamil: 'இந்திய ஆங்கில எழுத்துகள்', questions: 20, marks: 20, topics: ['Pre-Independence', 'Post-Independence', 'Contemporary'] },
            { name: 'Literary Theory', nameTamil: 'இலக்கியக் கோட்பாடு', questions: 15, marks: 15, topics: ['Criticism', 'Theory'] },
            { name: 'Language & Linguistics', nameTamil: 'மொழி & மொழியியல்', questions: 15, marks: 15, topics: ['Phonetics', 'Morphology', 'Syntax'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Read major literary works', 'Focus on Shakespeare plays', 'Learn literary theories']
      },
      {
        id: 'ma-economics',
        name: 'M.A. Economics',
        nameTamil: 'எம்.ஏ. பொருளியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Microeconomics', nameTamil: 'நுண்பொருளியல்', questions: 25, marks: 25, topics: ['Demand & Supply', 'Consumer Theory', 'Production', 'Market Structures'] },
            { name: 'Macroeconomics', nameTamil: 'பெரும்பொருளியல்', questions: 25, marks: 25, topics: ['National Income', 'Inflation', 'Monetary Policy', 'Fiscal Policy'] },
            { name: 'Indian Economy', nameTamil: 'இந்திய பொருளியல்', questions: 25, marks: 25, topics: ['Agriculture', 'Industry', 'Planning', 'Reforms'] },
            { name: 'Statistics & Econometrics', nameTamil: 'புள்ளியியல்', questions: 25, marks: 25, topics: ['Regression', 'Correlation', 'Hypothesis Testing'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on micro and macro concepts', 'Know Indian economy well', 'Practice statistics problems']
      },
      {
        id: 'mcom',
        name: 'M.Com',
        nameTamil: 'எம்.காம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Accounting', nameTamil: 'கணக்கியல்', questions: 30, marks: 30, topics: ['Financial Accounting', 'Cost Accounting', 'Management Accounting'] },
            { name: 'Finance', nameTamil: 'நிதி', questions: 25, marks: 25, topics: ['Financial Management', 'Investment', 'Banking'] },
            { name: 'Business Studies', nameTamil: 'வணிகவியல்', questions: 25, marks: 25, topics: ['Management', 'Marketing', 'HRM'] },
            { name: 'Economics', nameTamil: 'பொருளியல்', questions: 20, marks: 20, topics: ['Business Economics', 'Indian Economy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Accounting is most important', 'Learn financial ratios', 'Understand business concepts']
      }
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
    courses: []
  },
  {
    id: 'annamalai-university',
    name: 'Annamalai University',
    nameTamil: 'அண்ணாமலை பல்கலைக்கழகம்',
    location: 'Chidambaram',
    website: 'www.annamalaiuniversity.ac.in',
    phone: '04144-238282',
    examName: 'AUET',
    logoColor: '#ea580c',
    logo: '/universities/annamalai-university-logo.png',
    fee: { general: 500, obc: 500, scst: 250 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'March-April 2026', status: 'upcoming' },
      { event: 'Application', eventTamil: 'விண்ணப்பம்', date: 'April-May 2026', status: 'upcoming' },
      { event: 'Exam', eventTamil: 'தேர்வு', date: 'May-June 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'June 2026', status: 'upcoming' }
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
            { name: 'Verbal Ability', nameTamil: 'மொழித்திறன்', questions: 25, marks: 25, topics: ['Reading Comprehension', 'Vocabulary', 'Grammar'] },
            { name: 'Quantitative Aptitude', nameTamil: 'எண்ணியல்', questions: 25, marks: 25, topics: ['Arithmetic', 'Algebra', 'DI'] },
            { name: 'Logical Reasoning', nameTamil: 'தர்க்கம்', questions: 25, marks: 25, topics: ['Puzzles', 'Seating', 'Syllogism'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 25, marks: 25, topics: ['Current Affairs', 'Business', 'Economy'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'au-mba-q1', question: 'What is the full form of SEBI?', options: ['Securities and Exchange Board of India', 'Stock Exchange Board of India', 'Securities and Equity Board of India', 'None'], correctAnswer: 0, explanation: 'SEBI = Securities and Exchange Board of India', topic: 'General Knowledge', difficulty: 'Easy' }
        ],
        tips: ['Focus on GK and current affairs', 'Practice aptitude daily', 'Read business newspapers']
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
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 40, marks: 40, topics: ['Programming', 'Data Structures', 'DBMS', 'Networks'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Discrete Math', 'Probability', 'Statistics'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 30, marks: 30, topics: ['Verbal', 'Quantitative', 'Reasoning'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Computer Science has maximum weightage', 'Practice programming concepts', 'Learn data structures well']
      },
      {
        id: 'au-msc-physics',
        name: 'M.Sc. Physics',
        nameTamil: 'எம்.எஸ்சி. இயற்பியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Classical Mechanics', nameTamil: 'இயக்கவியல்', questions: 20, marks: 20, topics: ['Lagrangian', 'Hamiltonian'] },
            { name: 'Quantum Mechanics', nameTamil: 'குவாண்டம்', questions: 25, marks: 25, topics: ['Wave Functions', 'Operators'] },
            { name: 'Electromagnetism', nameTamil: 'மின்காந்தம்', questions: 25, marks: 25, topics: ['Maxwell Equations', 'EM Waves'] },
            { name: 'Electronics', nameTamil: 'மின்னணுவியல்', questions: 15, marks: 15, topics: ['Semiconductors', 'Amplifiers'] },
            { name: 'Modern Physics', nameTamil: 'நவீன இயற்பியல்', questions: 15, marks: 15, topics: ['Atomic', 'Nuclear', 'Solid State'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on quantum mechanics', 'Practice numerical problems', 'Learn derivations']
      },
      {
        id: 'au-msc-chemistry',
        name: 'M.Sc. Chemistry',
        nameTamil: 'எம்.எஸ்சி. வேதியியல்',
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
            { name: 'Inorganic Chemistry', nameTamil: 'கனிம வேதியியல்', questions: 35, marks: 35, topics: ['Coordination', 'Organometallics', 'Main Group'] },
            { name: 'Physical Chemistry', nameTamil: 'பெளதிக வேதியியல்', questions: 30, marks: 30, topics: ['Thermodynamics', 'Kinetics', 'Electrochemistry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Organic chemistry reactions are most important', 'Learn named reactions', 'Practice thermodynamics numericals']
      },
      {
        id: 'au-msc-mathematics',
        name: 'M.Sc. Mathematics',
        nameTamil: 'எம்.எஸ்சி. கணிதம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Algebra', nameTamil: 'இயற்கணிதம்', questions: 25, marks: 25, topics: ['Groups', 'Rings', 'Fields'] },
            { name: 'Analysis', nameTamil: 'பகுப்பாய்வு', questions: 25, marks: 25, topics: ['Real Analysis', 'Complex Analysis'] },
            { name: 'Differential Equations', nameTamil: 'வகைக்கெழு', questions: 25, marks: 25, topics: ['ODE', 'PDE'] },
            { name: 'Numerical Analysis', nameTamil: 'எண் பகுப்பாய்வு', questions: 25, marks: 25, topics: ['Interpolation', 'Integration'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on algebra and analysis', 'Practice proof-based questions', 'Learn theorems thoroughly']
      },
      {
        id: 'au-msc-zoology',
        name: 'M.Sc. Zoology',
        nameTamil: 'எம்.எஸ்சி. விலங்கியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Animal Diversity', nameTamil: 'விலங்கு பன்முகம்', questions: 30, marks: 30, topics: ['Invertebrates', 'Vertebrates'] },
            { name: 'Cell Biology', nameTamil: 'உயிரணு உயிரியல்', questions: 25, marks: 25, topics: ['Cell Structure', 'Genetics'] },
            { name: 'Physiology', nameTamil: 'உடலியல்', questions: 25, marks: 25, topics: ['Organ Systems'] },
            { name: 'Ecology', nameTamil: 'சூழலியல்', questions: 20, marks: 20, topics: ['Ecosystems', 'Conservation'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Learn animal classification', 'Focus on cell biology', 'Understand physiology concepts']
      },
      {
        id: 'au-msc-botany',
        name: 'M.Sc. Botany',
        nameTamil: 'எம்.எஸ்சி. தாவரவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Plant Diversity', nameTamil: 'தாவர பன்முகம்', questions: 30, marks: 30, topics: ['Algae', 'Fungi', 'Angiosperms'] },
            { name: 'Plant Physiology', nameTamil: 'தாவர உடலியல்', questions: 30, marks: 30, topics: ['Photosynthesis', 'Respiration'] },
            { name: 'Genetics & Biotechnology', nameTamil: 'மரபியல்', questions: 25, marks: 25, topics: ['Mendelian', 'Molecular'] },
            { name: 'Ecology', nameTamil: 'சூழலியல்', questions: 15, marks: 15, topics: ['Ecosystems'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Plant classification is important', 'Learn photosynthesis in detail', 'Understand plant breeding']
      },
      {
        id: 'au-msc-biochemistry',
        name: 'M.Sc. Biochemistry',
        nameTamil: 'எம்.எஸ்சி. உயிர்வேதியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biomolecules', nameTamil: 'உயிர் மூலக்கூறுகள்', questions: 30, marks: 30, topics: ['Carbohydrates', 'Proteins', 'Lipids', 'Nucleic Acids'] },
            { name: 'Enzymology', nameTamil: 'நொதியியல்', questions: 25, marks: 25, topics: ['Enzyme Kinetics', 'Mechanisms'] },
            { name: 'Metabolism', nameTamil: 'வளர்சிதை மாற்றம்', questions: 30, marks: 30, topics: ['Glycolysis', 'TCA Cycle', 'Oxidative Phosphorylation'] },
            { name: 'Molecular Biology', nameTamil: 'மூலக்கூறு உயிரியல்', questions: 15, marks: 15, topics: ['DNA Replication', 'Transcription', 'Translation'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Learn metabolic pathways', 'Understand enzyme kinetics', 'Focus on molecular biology techniques']
      },
      {
        id: 'au-ma-english',
        name: 'M.A. English',
        nameTamil: 'எம்.ஏ. ஆங்கிலம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'British Literature', nameTamil: 'பிரிட்டிஷ் இலக்கியம்', questions: 35, marks: 35, topics: ['Shakespeare', 'Romantic', 'Victorian', 'Modern'] },
            { name: 'American & World Literature', nameTamil: 'உலக இலக்கியம்', questions: 25, marks: 25, topics: ['American', 'Commonwealth'] },
            { name: 'Indian Writing in English', nameTamil: 'இந்திய எழுத்துகள்', questions: 20, marks: 20, topics: ['Novels', 'Poetry', 'Drama'] },
            { name: 'Literary Theory', nameTamil: 'இலக்கியக் கோட்பாடு', questions: 20, marks: 20, topics: ['Criticism', 'Theory'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Read Shakespeare plays', 'Know major literary movements', 'Understand literary theories']
      },
      {
        id: 'au-ma-history',
        name: 'M.A. History',
        nameTamil: 'எம்.ஏ. வரலாறு',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Ancient India', nameTamil: 'பண்டைய இந்தியா', questions: 25, marks: 25, topics: ['Indus Valley', 'Vedic Age', 'Mauryas', 'Guptas'] },
            { name: 'Medieval India', nameTamil: 'இடைக்கால இந்தியா', questions: 25, marks: 25, topics: ['Delhi Sultanate', 'Mughals', 'Regional Kingdoms'] },
            { name: 'Modern India', nameTamil: 'நவீன இந்தியா', questions: 30, marks: 30, topics: ['British Rule', 'Freedom Struggle', 'Post-Independence'] },
            { name: 'World History', nameTamil: 'உலக வரலாறு', questions: 20, marks: 20, topics: ['World Wars', 'Revolutions', 'Cold War'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on Modern India', 'Learn freedom struggle in detail', 'Know important dates and events']
      },
      {
        id: 'au-mcom',
        name: 'M.Com',
        nameTamil: 'எம்.காம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Accounting', nameTamil: 'கணக்கியல்', questions: 35, marks: 35, topics: ['Financial', 'Cost', 'Management Accounting'] },
            { name: 'Finance', nameTamil: 'நிதி', questions: 25, marks: 25, topics: ['Financial Management', 'Banking'] },
            { name: 'Business', nameTamil: 'வணிகம்', questions: 25, marks: 25, topics: ['Marketing', 'HRM', 'Business Law'] },
            { name: 'Economics', nameTamil: 'பொருளியல்', questions: 15, marks: 15, topics: ['Business Economics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Accounting is most important', 'Practice financial problems', 'Learn business concepts']
      },
      {
        id: 'au-bed',
        name: 'B.Ed',
        nameTamil: 'பி.எட்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 25, marks: 25, topics: ['Current Affairs', 'GK'] },
            { name: 'Teaching Aptitude', nameTamil: 'கற்பித்தல் திறன்', questions: 25, marks: 25, topics: ['Pedagogy', 'Child Psychology'] },
            { name: 'Subject Knowledge', nameTamil: 'பாட அறிவு', questions: 25, marks: 25, topics: ['Chosen Subject'] },
            { name: 'Language', nameTamil: 'மொழி', questions: 25, marks: 25, topics: ['English', 'Tamil'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on teaching aptitude', 'Learn child psychology', 'Know education policies']
      }
    ]
  },
  {
    id: 'mgr-university',
    name: 'MGR Medical University',
    nameTamil: 'எம்.ஜி.ஆர். மருத்துவ பல்கலைக்கழகம்',
    location: 'Chennai',
    website: 'www.tnmgrmu.ac.in',
    phone: '044-22353574',
    examName: 'State Counselling',
    logoColor: '#0891b2',
    fee: { general: 0, obc: 0, scst: 0 },
    importantDates: [
      { event: 'Counselling', eventTamil: 'கலந்தாய்வு', date: 'August-September 2026', status: 'upcoming' }
    ],
    courses: []
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
      {
        id: 'mku-mba',
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
            { name: 'Logical Reasoning', nameTamil: 'தர்க்க அறிவு', questions: 25, marks: 25, topics: ['Coding', 'Puzzles', 'Syllogisms'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', questions: 15, marks: 15, topics: ['Current Affairs', 'Business GK'] }
          ]
        },
        syllabus: [
          {
            unitNumber: 1,
            title: 'Verbal Ability',
            titleTamil: 'மொழித்திறன்',
            expectedQuestions: 25,
            difficulty: 'Medium',
            topics: [
              { name: 'Reading Comprehension', subtopics: ['Passage analysis', 'Inference', 'Vocabulary'], importance: 'High' },
              { name: 'Grammar', subtopics: ['Tenses', 'Voice', 'Articles'], importance: 'Medium' },
              { name: 'Vocabulary', subtopics: ['Synonyms', 'Antonyms', 'Idioms'], importance: 'High' }
            ]
          },
          {
            unitNumber: 2,
            title: 'Quantitative Aptitude',
            titleTamil: 'எண்ணியல் திறன்',
            expectedQuestions: 35,
            difficulty: 'Medium',
            topics: [
              { name: 'Arithmetic', subtopics: ['Percentage', 'Profit & Loss', 'Simple & Compound Interest'], importance: 'High' },
              { name: 'Algebra', subtopics: ['Equations', 'Polynomials', 'Quadratic equations'], importance: 'Medium' },
              { name: 'Data Interpretation', subtopics: ['Tables', 'Graphs', 'Charts'], importance: 'High' }
            ]
          }
        ],
        previousQuestions: [
          { id: 'mku-mba-q1', question: 'A sum of ₹5000 amounts to ₹6050 in 2 years at simple interest. What is the rate of interest?', options: ['8%', '9%', '10.5%', '11%'], correctAnswer: 2, explanation: 'SI = 6050-5000 = 1050. R = (SI×100)/(P×T) = (1050×100)/(5000×2) = 10.5%', topic: 'Simple Interest', difficulty: 'Easy' },
          { id: 'mku-mba-q2', question: 'If the ratio of cost price to selling price is 5:6, find the profit percentage.', options: ['16.67%', '20%', '25%', '30%'], correctAnswer: 1, explanation: 'If CP:SP = 5:6, then Profit = 6-5 = 1. Profit% = (1/5)×100 = 20%', topic: 'Profit & Loss', difficulty: 'Easy' }
        ],
        tips: ['Focus on Data Interpretation', 'Practice quantitative aptitude daily', 'Read business newspapers']
      },
      {
        id: 'mku-mca',
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
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Calculus', 'Linear Algebra', 'Probability'] },
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 40, marks: 40, topics: ['C Programming', 'Data Structures', 'DBMS'] },
            { name: 'Logical Reasoning', nameTamil: 'தர்க்க அறிவு', questions: 20, marks: 20, topics: ['Coding', 'Series', 'Puzzles'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 10, marks: 10, topics: ['Grammar', 'Comprehension'] }
          ]
        },
        syllabus: [
          {
            unitNumber: 1,
            title: 'Mathematics',
            titleTamil: 'கணிதம்',
            expectedQuestions: 30,
            difficulty: 'Hard',
            topics: [
              { name: 'Calculus', subtopics: ['Differentiation', 'Integration', 'Applications'], importance: 'High' },
              { name: 'Linear Algebra', subtopics: ['Matrices', 'Determinants', 'Eigenvalues'], importance: 'High' }
            ]
          }
        ],
        previousQuestions: [],
        tips: ['Focus on C programming concepts', 'Practice mathematical problems', 'Learn data structures well']
      },
      {
        id: 'mku-msc-cs',
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
        id: 'mku-ma-tamil',
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
            { name: 'Tamil Literature', nameTamil: 'தமிழ் இலக்கியம்', questions: 50, marks: 50, topics: ['Sangam Literature', 'Modern Literature'] },
            { name: 'Tamil Grammar', nameTamil: 'தமிழ் இலக்கணம்', questions: 30, marks: 30, topics: ['Tolkappiyam', 'Nannool'] },
            { name: 'General Tamil', nameTamil: 'பொதுத் தமிழ்', questions: 20, marks: 20, topics: ['Translation', 'Essay'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Read Sangam literature deeply', 'Study Tolkappiyam', 'Practice essay writing']
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
        previousQuestions: [],
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
        previousQuestions: [],
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
        previousQuestions: [],
        tips: ['Strong foundation in algebra', 'Practice real analysis problems', 'Study differential equations']
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
        previousQuestions: [],
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
        previousQuestions: [],
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
        previousQuestions: [],
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
        previousQuestions: [],
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
  {
    id: 'tamil-university',
    name: 'Tamil University',
    nameTamil: 'தமிழ்ப் பல்கலைக்கழகம்',
    location: 'Thanjavur',
    website: 'www.tamiluniversity.ac.in',
    phone: '04362-226720',
    examName: 'TU Entrance Exam',
    logoColor: '#9333ea',
    fee: { general: 400, obc: 400, scst: 200 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'April 2026', status: 'upcoming' },
      { event: 'Application Start', eventTamil: 'விண்ணப்பம் தொடக்கம்', date: 'April 2026', status: 'upcoming' },
      { event: 'Application End', eventTamil: 'விண்ணப்பம் முடிவு', date: 'May 2026', status: 'upcoming' },
      { event: 'Exam Date', eventTamil: 'தேர்வு தேதி', date: 'June 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'June 2026', status: 'upcoming' }
    ],
    courses: [
      {
        id: 'tu-ma-tamil',
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
            { name: 'Classical Tamil', nameTamil: 'செம்மொழி தமிழ்', questions: 35, marks: 35, topics: ['Sangam Poetry', 'Epics', 'Classical Grammar'] },
            { name: 'Modern Tamil', nameTamil: 'நவீன தமிழ்', questions: 35, marks: 35, topics: ['Modern Literature', 'Prose', 'Short Stories'] },
            { name: 'Tamil Grammar', nameTamil: 'தமிழ் இலக்கணம்', questions: 30, marks: 30, topics: ['Tholkappiyam', 'Nannool', 'Yapperungalam'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Specialize in Sangam literature', 'Study Tholkappiyam in depth', 'Read modern Tamil classics']
      },
      {
        id: 'tu-mphil-tamil',
        name: 'M.Phil Tamil',
        nameTamil: 'எம்.ஃபில் தமிழ்',
        type: 'Research',
        examPattern: {
          totalQuestions: 75,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Research Methodology', nameTamil: 'ஆராய்ச்சி முறையியல்', questions: 25, marks: 35, topics: ['Research Methods', 'Data Analysis', 'Thesis Writing'] },
            { name: 'Tamil Literature', nameTamil: 'தமிழ் இலக்கியம்', questions: 30, marks: 40, topics: ['Critical Analysis', 'Literary Criticism', 'Comparative Literature'] },
            { name: 'Language Studies', nameTamil: 'மொழியியல்', questions: 20, marks: 25, topics: ['Linguistics', 'Semantics', 'Etymology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Develop strong research methodology skills', 'Read literary criticism extensively', 'Study comparative literature']
      },
      {
        id: 'tu-ma-manuscript',
        name: 'M.A Manuscriptology',
        nameTamil: 'எம்.ஏ சுவடியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Manuscript Studies', nameTamil: 'சுவடி ஆய்வு', questions: 40, marks: 40, topics: ['Palm Leaf Manuscripts', 'Conservation', 'Cataloguing'] },
            { name: 'Paleography', nameTamil: 'தொல்லெழுத்தியல்', questions: 35, marks: 35, topics: ['Script Evolution', 'Reading Ancient Scripts', 'Inscriptions'] },
            { name: 'Epigraphy', nameTamil: 'கல்வெட்டியல்', questions: 25, marks: 25, topics: ['Stone Inscriptions', 'Copper Plates', 'Dating Methods'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Learn palm leaf preservation techniques', 'Study ancient Tamil scripts', 'Visit manuscript libraries']
      },
      {
        id: 'tu-ma-translation',
        name: 'M.A Translation Studies',
        nameTamil: 'எம்.ஏ மொழிபெயர்ப்பியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Translation Theory', nameTamil: 'மொழிபெயர்ப்பு கோட்பாடு', questions: 35, marks: 35, topics: ['Translation Theories', 'Methods', 'Approaches'] },
            { name: 'Practical Translation', nameTamil: 'நடைமுறை மொழிபெயர்ப்பு', questions: 40, marks: 40, topics: ['Tamil-English', 'English-Tamil', 'Technical Translation'] },
            { name: 'Comparative Literature', nameTamil: 'ஒப்பிலக்கியம்', questions: 25, marks: 25, topics: ['Cross-cultural Studies', 'Adaptation', 'Localization'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Practice translation daily', 'Build strong vocabulary in both languages', 'Study translation theory']
      }
    ]
  },
  {
    id: 'gandhigram-university',
    name: 'Gandhigram Rural Institute',
    nameTamil: 'காந்திகிராம கிராமப்புற நிறுவனம்',
    location: 'Dindigul',
    website: 'www.ruraluniv.ac.in',
    phone: '0451-2452371',
    examName: 'GRI Entrance Exam',
    logoColor: '#059669',
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
  }
];

export const getUniversityById = (id: string): University | undefined => {
  return universities.find(u => u.id === id);
};

export const getCourseById = (universityId: string, courseId: string): Course | undefined => {
  const university = getUniversityById(universityId);
  return university?.courses.find(c => c.id === courseId);
};
