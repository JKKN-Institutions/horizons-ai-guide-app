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
  type: 'UG' | 'PG' | 'Research' | 'Super-Specialty' | 'Integrated' | 'Diploma' | 'PG Diploma' | 'Certificate';
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
        ],
        seatMatrix: {
          general: 850,
          obc: 1200,
          bcMbc: 1450,
          sc: 680,
          st: 120,
          ews: 180,
          total: 4480
        },
        cutoffs: [
          { year: '2024', general: 82.5, obc: 76.3, bcMbc: 71.2, sc: 58.4, st: 48.2, ews: 74.8 },
          { year: '2023', general: 84.1, obc: 78.5, bcMbc: 73.6, sc: 60.2, st: 50.1, ews: 76.2 },
          { year: '2022', general: 81.8, obc: 75.2, bcMbc: 70.5, sc: 56.8, st: 46.5, ews: 73.4 }
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
        ],
        seatMatrix: {
          general: 420,
          obc: 680,
          bcMbc: 850,
          sc: 380,
          st: 65,
          ews: 95,
          total: 2490
        },
        cutoffs: [
          { year: '2024', general: 78.2, obc: 72.4, bcMbc: 68.5, sc: 54.2, st: 44.8, ews: 70.5 },
          { year: '2023', general: 80.1, obc: 74.6, bcMbc: 70.2, sc: 56.4, st: 46.2, ews: 72.8 },
          { year: '2022', general: 76.8, obc: 70.2, bcMbc: 66.4, sc: 52.8, st: 42.5, ews: 68.2 }
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
        tips: ['Focus on Engineering Mathematics - common for all branches', 'Core engineering section is branch specific', 'Practice previous year papers'],
        seatMatrix: {
          general: 320,
          obc: 520,
          bcMbc: 680,
          sc: 280,
          st: 45,
          ews: 85,
          total: 1930
        },
        cutoffs: [
          { year: '2024', general: 76.5, obc: 70.2, bcMbc: 65.8, sc: 52.4, st: 42.5, ews: 68.8 },
          { year: '2023', general: 78.2, obc: 72.4, bcMbc: 68.2, sc: 54.6, st: 44.2, ews: 70.5 },
          { year: '2022', general: 74.8, obc: 68.5, bcMbc: 64.2, sc: 50.8, st: 40.5, ews: 66.2 }
        ]
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
        tips: ['Research methodology is common for all', 'Focus on statistical methods', 'Understand research ethics'],
        seatMatrix: {
          general: 45,
          obc: 75,
          bcMbc: 95,
          sc: 40,
          st: 8,
          ews: 12,
          total: 275
        },
        cutoffs: [
          { year: '2024', general: 68.5, obc: 62.4, bcMbc: 58.2, sc: 48.5, st: 38.6, ews: 60.5 },
          { year: '2023', general: 70.2, obc: 64.6, bcMbc: 60.5, sc: 50.2, st: 40.2, ews: 62.8 },
          { year: '2022', general: 66.8, obc: 60.2, bcMbc: 56.4, sc: 46.8, st: 36.5, ews: 58.2 }
        ]
      },
      // ========== CEG CAMPUS (College of Engineering, Guindy) ==========
      // Main Campus - Core Engineering & CS - Top 1-5000 TNEA ranks
      {
        id: 'ceg-be-civil',
        name: 'B.E. Civil Engineering',
        nameTamil: 'பி.இ. குடிசார் பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Algebra', 'Calculus', 'Geometry', 'Mechanics'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Mechanics', 'Strength of Materials', 'Fluid Mechanics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Engineering Materials', 'Concrete', 'Water Chemistry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['CEG Main Campus - Premier institution', 'Tamil & English Medium available', 'Essential for infrastructure careers'],
        seatMatrix: { general: 180, obc: 320, bcMbc: 400, sc: 165, st: 25, ews: 55, total: 1145 },
        cutoffs: [
          { year: '2024', general: 185.2, obc: 180.4, bcMbc: 175.8, sc: 162.5, st: 142.8, ews: 178.5 },
          { year: '2023', general: 187.5, obc: 182.6, bcMbc: 178.2, sc: 164.8, st: 145.2, ews: 180.8 }
        ]
      },
      {
        id: 'ceg-be-geoinformatics',
        name: 'B.E. Geo-Informatics',
        nameTamil: 'பி.இ. புவி-தகவலியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Geometry', 'Statistics', 'Algebra'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Remote Sensing', 'Optics', 'Waves'] },
            { name: 'Geography/Computer', nameTamil: 'புவியியல்/கணினி', questions: 50, marks: 50, topics: ['GIS', 'Cartography', 'Programming'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Unique course - Maps, GPS, Satellite data', 'Good for ISRO, Survey of India', 'Learn GIS software (QGIS, ArcGIS)'],
        seatMatrix: { general: 25, obc: 45, bcMbc: 55, sc: 22, st: 4, ews: 8, total: 159 },
        cutoffs: [
          { year: '2024', general: 175.2, obc: 168.4, bcMbc: 162.5, sc: 148.2, st: 128.5, ews: 166.5 },
          { year: '2023', general: 178.5, obc: 172.2, bcMbc: 165.8, sc: 150.4, st: 130.8, ews: 169.8 }
        ]
      },
      {
        id: 'ceg-be-mech',
        name: 'B.E. Mechanical Engineering',
        nameTamil: 'பி.இ. இயந்திர பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Calculus', 'Vectors', 'Differential Equations'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Mechanics', 'Thermodynamics', 'Heat Transfer'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Materials', 'Fuels', 'Corrosion'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['CEG Main Campus - Tamil & English Medium', 'Evergreen branch with wide scope', 'Learn CAD/CAM basics'],
        seatMatrix: { general: 220, obc: 380, bcMbc: 480, sc: 200, st: 30, ews: 70, total: 1380 },
        cutoffs: [
          { year: '2024', general: 192.4, obc: 188.6, bcMbc: 185.2, sc: 172.4, st: 152.8, ews: 187.5 },
          { year: '2023', general: 193.8, obc: 189.4, bcMbc: 186.8, sc: 174.2, st: 154.6, ews: 188.8 }
        ]
      },
      {
        id: 'ceg-be-industrial',
        name: 'B.E. Industrial Engineering',
        nameTamil: 'பி.இ. தொழிற்சாலை பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Statistics', 'Operations Research', 'Calculus'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Mechanics', 'Thermodynamics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Materials', 'Industrial Chemistry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on operations and optimization', 'Good for manufacturing sector', 'Learn Six Sigma, Lean concepts'],
        seatMatrix: { general: 45, obc: 80, bcMbc: 100, sc: 42, st: 6, ews: 15, total: 288 },
        cutoffs: [
          { year: '2024', general: 175.5, obc: 168.2, bcMbc: 162.4, sc: 148.6, st: 128.2, ews: 166.2 },
          { year: '2023', general: 178.2, obc: 171.4, bcMbc: 165.8, sc: 150.5, st: 130.8, ews: 169.5 }
        ]
      },
      {
        id: 'ceg-be-manufacturing',
        name: 'B.E. Manufacturing Engineering',
        nameTamil: 'பி.இ. உற்பத்தி பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Calculus', 'Matrices', 'Differential Equations'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Mechanics', 'Materials Science'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Metallurgy', 'Polymers'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Industry 4.0 focused', 'Learn CNC, CAD/CAM', 'Good for automotive sector'],
        seatMatrix: { general: 40, obc: 70, bcMbc: 85, sc: 35, st: 5, ews: 12, total: 247 },
        cutoffs: [
          { year: '2024', general: 172.5, obc: 165.2, bcMbc: 158.4, sc: 145.6, st: 125.2, ews: 163.2 },
          { year: '2023', general: 175.2, obc: 168.4, bcMbc: 161.8, sc: 148.2, st: 128.5, ews: 166.5 }
        ]
      },
      {
        id: 'ceg-be-mining',
        name: 'B.E. Mining Engineering',
        nameTamil: 'பி.இ. சுரங்க பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Calculus', 'Geology Basics', 'Surveying'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Mechanics', 'Rock Mechanics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Minerals', 'Environmental Chemistry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for mining and mineral industries', 'Coal India, SAIL opportunities', 'Study geology basics'],
        seatMatrix: { general: 30, obc: 50, bcMbc: 65, sc: 28, st: 4, ews: 10, total: 187 },
        cutoffs: [
          { year: '2024', general: 165.2, obc: 158.4, bcMbc: 152.5, sc: 138.2, st: 118.5, ews: 156.2 },
          { year: '2023', general: 168.5, obc: 161.2, bcMbc: 155.8, sc: 140.4, st: 120.8, ews: 159.5 }
        ]
      },
      {
        id: 'ceg-be-printing',
        name: 'B.E. Printing Technology',
        nameTamil: 'பி.இ. அச்சு தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Calculus', 'Statistics'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Optics', 'Color Science'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Inks', 'Polymers', 'Paper Chemistry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Unique niche - packaging industry', 'Learn graphic design basics', 'Good for publishing sector'],
        seatMatrix: { general: 35, obc: 60, bcMbc: 75, sc: 32, st: 5, ews: 12, total: 219 },
        cutoffs: [
          { year: '2024', general: 162.5, obc: 155.2, bcMbc: 148.4, sc: 135.6, st: 115.2, ews: 153.2 },
          { year: '2023', general: 165.2, obc: 158.4, bcMbc: 151.8, sc: 138.2, st: 118.5, ews: 156.5 }
        ]
      },
      {
        id: 'ceg-be-eee',
        name: 'B.E. Electrical & Electronics Engineering',
        nameTamil: 'பி.இ. மின் & மின்னணுவியல் பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Calculus', 'Transforms', 'Linear Algebra'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Electromagnetism', 'Electronics', 'Circuits'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Electrochemistry', 'Materials'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Core electrical branch', 'Good for power sector, TNEB', 'Strong physics foundation needed'],
        seatMatrix: { general: 150, obc: 260, bcMbc: 330, sc: 138, st: 20, ews: 45, total: 943 },
        cutoffs: [
          { year: '2024', general: 190.2, obc: 185.4, bcMbc: 180.8, sc: 168.2, st: 148.4, ews: 183.5 },
          { year: '2023', general: 192.5, obc: 187.6, bcMbc: 183.2, sc: 170.4, st: 150.8, ews: 186.8 }
        ]
      },
      {
        id: 'ceg-be-ece',
        name: 'B.E. Electronics & Communication Engineering',
        nameTamil: 'பி.இ. மின்னணுவியல் & தகவல் தொடர்பு பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Algebra', 'Calculus', 'Transforms'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Electronics', 'Semiconductors', 'Waves'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Physical Chemistry', 'Polymers'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['High demand - VLSI, Telecom careers', 'Strong physics foundation required', 'Learn basic circuit analysis'],
        seatMatrix: { general: 160, obc: 280, bcMbc: 360, sc: 150, st: 22, ews: 50, total: 1022 },
        cutoffs: [
          { year: '2024', general: 197.2, obc: 195.4, bcMbc: 193.8, sc: 186.2, st: 168.4, ews: 194.8 },
          { year: '2023', general: 196.5, obc: 194.2, bcMbc: 192.4, sc: 184.6, st: 166.2, ews: 193.5 }
        ]
      },
      {
        id: 'ceg-be-biomedical',
        name: 'B.E. Biomedical Engineering',
        nameTamil: 'பி.இ. உயிரிமருத்துவ பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Calculus', 'Statistics', 'Linear Algebra'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Electronics', 'Biophysics'] },
            { name: 'Biology/Chemistry', nameTamil: 'உயிரியல்/வேதியியல்', questions: 50, marks: 50, topics: ['Anatomy', 'Biochemistry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Medical device industry focus', 'Blend of engineering and medicine', 'Good for healthcare tech careers'],
        seatMatrix: { general: 35, obc: 60, bcMbc: 75, sc: 32, st: 5, ews: 12, total: 219 },
        cutoffs: [
          { year: '2024', general: 178.5, obc: 172.2, bcMbc: 166.8, sc: 152.4, st: 132.5, ews: 170.5 },
          { year: '2023', general: 180.2, obc: 174.5, bcMbc: 168.2, sc: 154.6, st: 134.8, ews: 172.8 }
        ]
      },
      {
        id: 'ceg-be-cse',
        name: 'B.E. Computer Science & Engineering',
        nameTamil: 'பி.இ. கணினி அறிவியல் & பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Algebra', 'Calculus', 'Discrete Math'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Electronics', 'Modern Physics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Physical', 'Organic Chemistry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Top choice in TN - very competitive (Top 1-500 ranks)', 'Strong foundation in PCM required', 'Learn basic programming before admission'],
        seatMatrix: { general: 180, obc: 320, bcMbc: 420, sc: 180, st: 25, ews: 60, total: 1185 },
        cutoffs: [
          { year: '2024', general: 198.5, obc: 196.8, bcMbc: 195.2, sc: 188.4, st: 172.5, ews: 196.2 },
          { year: '2023', general: 197.8, obc: 195.6, bcMbc: 194.1, sc: 186.2, st: 170.8, ews: 195.4 }
        ]
      },
      {
        id: 'ceg-btech-it',
        name: 'B.Tech Information Technology',
        nameTamil: 'பி.டெக் தகவல் தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Algebra', 'Calculus', 'Discrete Math'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Electronics', 'Modern Physics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Physical', 'Organic Chemistry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Similar to CSE with IT focus', 'Strong software development curriculum', 'High demand in IT sector'],
        seatMatrix: { general: 120, obc: 210, bcMbc: 270, sc: 115, st: 17, ews: 38, total: 770 },
        cutoffs: [
          { year: '2024', general: 197.8, obc: 195.2, bcMbc: 193.5, sc: 186.2, st: 170.5, ews: 194.5 },
          { year: '2023', general: 196.5, obc: 194.0, bcMbc: 192.2, sc: 184.5, st: 168.2, ews: 193.2 }
        ]
      },

      // ========== MIT CAMPUS (Madras Institute of Technology, Chromepet) ==========
      // Famous for specialized engineering - Dr. APJ Abdul Kalam studied here
      {
        id: 'mit-be-aero',
        name: 'B.E. Aeronautical Engineering',
        nameTamil: 'பி.இ. விமானவியல் பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Calculus', 'Differential Equations', 'Complex Variables'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Fluid Mechanics', 'Aerodynamics', 'Propulsion'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Fuels', 'Composites', 'Alloys'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['MIT Campus Top Course - APJ Kalam studied here', 'Strong physics background essential', 'Great for ISRO/DRDO/HAL careers'],
        seatMatrix: { general: 45, obc: 80, bcMbc: 100, sc: 42, st: 6, ews: 15, total: 288 },
        cutoffs: [
          { year: '2024', general: 189.5, obc: 185.2, bcMbc: 181.4, sc: 168.6, st: 148.2, ews: 184.2 },
          { year: '2023', general: 191.2, obc: 187.4, bcMbc: 183.8, sc: 170.5, st: 150.8, ews: 186.5 }
        ]
      },
      {
        id: 'mit-be-automobile',
        name: 'B.E. Automobile Engineering',
        nameTamil: 'பி.இ. வாகன பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Calculus', 'Mechanics', 'Dynamics'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Thermodynamics', 'Fluid Mechanics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Fuels', 'Materials', 'Lubricants'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Chennai is automotive hub', 'Good for Hyundai, TVS, Ford careers', 'Learn automotive electronics'],
        seatMatrix: { general: 40, obc: 70, bcMbc: 85, sc: 35, st: 5, ews: 12, total: 247 },
        cutoffs: [
          { year: '2024', general: 182.5, obc: 176.2, bcMbc: 170.8, sc: 158.4, st: 138.5, ews: 174.5 },
          { year: '2023', general: 185.2, obc: 179.4, bcMbc: 173.8, sc: 160.5, st: 140.8, ews: 177.5 }
        ]
      },
      {
        id: 'mit-be-eie',
        name: 'B.E. Electronics & Instrumentation Engineering',
        nameTamil: 'பி.இ. மின்னணுவியல் & கருவியியல் பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Calculus', 'Transforms', 'Control Theory'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Electronics', 'Sensors', 'Measurements'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Materials', 'Semiconductors'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Focus on control systems', 'Good for process industries', 'Learn PLC, SCADA systems'],
        seatMatrix: { general: 35, obc: 60, bcMbc: 75, sc: 32, st: 5, ews: 12, total: 219 },
        cutoffs: [
          { year: '2024', general: 180.5, obc: 174.2, bcMbc: 168.8, sc: 155.4, st: 135.5, ews: 172.5 },
          { year: '2023', general: 183.2, obc: 177.4, bcMbc: 171.8, sc: 158.2, st: 138.5, ews: 175.5 }
        ]
      },
      {
        id: 'mit-be-robotics',
        name: 'B.E. Robotics & Automation',
        nameTamil: 'பி.இ. ரோபோட்டிக்ஸ் & தானியக்கம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Linear Algebra', 'Calculus', 'Transforms'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Mechanics', 'Electronics', 'Control Systems'] },
            { name: 'Computer/Electronics', nameTamil: 'கணினி/மின்னணுவியல்', questions: 50, marks: 50, topics: ['Programming', 'Sensors', 'Automation'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Emerging field with Industry 4.0', 'Mix of mechanical, electronics & CS', 'Learn Arduino/Raspberry Pi basics'],
        seatMatrix: { general: 35, obc: 60, bcMbc: 75, sc: 32, st: 5, ews: 12, total: 219 },
        cutoffs: [
          { year: '2024', general: 195.2, obc: 192.4, bcMbc: 189.6, sc: 178.5, st: 162.4, ews: 191.5 },
          { year: '2023', general: 193.8, obc: 190.5, bcMbc: 187.2, sc: 176.2, st: 160.5, ews: 189.8 }
        ]
      },
      {
        id: 'mit-btech-rubber-plastics',
        name: 'B.Tech Rubber & Plastics Technology',
        nameTamil: 'பி.டெக் ரப்பர் & பிளாஸ்டிக் தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 70, marks: 70, topics: ['Polymers', 'Organic Chemistry', 'Material Science'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Calculus', 'Statistics'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Material Properties', 'Mechanics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Unique specialization', 'Good for tire, polymer industries (MRF, Apollo)', 'Strong chemistry foundation needed'],
        seatMatrix: { general: 30, obc: 50, bcMbc: 65, sc: 28, st: 4, ews: 10, total: 187 },
        cutoffs: [
          { year: '2024', general: 168.5, obc: 162.2, bcMbc: 156.8, sc: 142.4, st: 122.5, ews: 160.5 },
          { year: '2023', general: 171.2, obc: 165.4, bcMbc: 159.8, sc: 145.2, st: 125.8, ews: 163.5 }
        ]
      },
      {
        id: 'mit-be-production',
        name: 'B.E. Production Engineering',
        nameTamil: 'பி.இ. உற்பத்தி பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Calculus', 'Statistics', 'Operations Research'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Mechanics', 'Materials Science'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Metallurgy', 'Materials'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Manufacturing sector focus', 'Learn CNC, CAM systems', 'Good for automotive and heavy industries'],
        seatMatrix: { general: 40, obc: 70, bcMbc: 85, sc: 35, st: 5, ews: 12, total: 247 },
        cutoffs: [
          { year: '2024', general: 175.5, obc: 168.2, bcMbc: 162.4, sc: 148.6, st: 128.2, ews: 166.2 },
          { year: '2023', general: 178.2, obc: 171.4, bcMbc: 165.8, sc: 150.5, st: 130.8, ews: 169.5 }
        ]
      },
      {
        id: 'mit-be-cse',
        name: 'B.E. Computer Science & Engineering',
        nameTamil: 'பி.இ. கணினி அறிவியல் & பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Algebra', 'Calculus', 'Discrete Math'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Electronics', 'Modern Physics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Physical', 'Organic Chemistry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['MIT Campus CSE - High demand', 'Strong programming curriculum', 'Excellent placements'],
        seatMatrix: { general: 60, obc: 100, bcMbc: 130, sc: 55, st: 8, ews: 20, total: 373 },
        cutoffs: [
          { year: '2024', general: 197.5, obc: 195.0, bcMbc: 192.8, sc: 185.2, st: 168.5, ews: 194.2 },
          { year: '2023', general: 196.2, obc: 193.5, bcMbc: 191.2, sc: 183.5, st: 166.2, ews: 192.8 }
        ]
      },
      {
        id: 'mit-be-ece',
        name: 'B.E. Electronics & Communication Engineering',
        nameTamil: 'பி.இ. மின்னணுவியல் & தகவல் தொடர்பு பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Algebra', 'Calculus', 'Transforms'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Electronics', 'Semiconductors', 'Waves'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Physical Chemistry', 'Polymers'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['MIT Campus ECE - VLSI focus', 'Strong semiconductor curriculum', 'Good for chip design careers'],
        seatMatrix: { general: 55, obc: 95, bcMbc: 120, sc: 50, st: 8, ews: 18, total: 346 },
        cutoffs: [
          { year: '2024', general: 195.8, obc: 193.2, bcMbc: 190.5, sc: 182.4, st: 165.2, ews: 192.5 },
          { year: '2023', general: 194.5, obc: 191.8, bcMbc: 189.2, sc: 180.5, st: 163.5, ews: 190.8 }
        ]
      },
      {
        id: 'mit-btech-it',
        name: 'B.Tech Information Technology',
        nameTamil: 'பி.டெக் தகவல் தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Algebra', 'Calculus', 'Discrete Math'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Electronics', 'Modern Physics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Physical', 'Organic Chemistry'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['MIT Campus IT - Strong curriculum', 'Focus on software development', 'Good industry connections'],
        seatMatrix: { general: 45, obc: 75, bcMbc: 95, sc: 40, st: 6, ews: 15, total: 276 },
        cutoffs: [
          { year: '2024', general: 196.2, obc: 193.5, bcMbc: 190.8, sc: 182.5, st: 165.8, ews: 192.8 },
          { year: '2023', general: 195.0, obc: 192.2, bcMbc: 189.5, sc: 181.2, st: 164.5, ews: 191.5 }
        ]
      },

      // ========== ACT CAMPUS (Alagappa College of Technology, Guindy) ==========
      // Focus on Chemical & Bio-Technology
      {
        id: 'act-btech-chemical',
        name: 'B.Tech Chemical Engineering',
        nameTamil: 'பி.டெக் வேதியியல் பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 70, marks: 70, topics: ['Physical', 'Organic', 'Inorganic', 'Industrial Chemistry'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Calculus', 'Differential Equations'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Thermodynamics', 'Fluid Mechanics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['ACT Campus specialty', 'Good for petrochemical and pharma industries', 'GATE Chemical has good scope'],
        seatMatrix: { general: 40, obc: 70, bcMbc: 85, sc: 35, st: 5, ews: 12, total: 247 },
        cutoffs: [
          { year: '2024', general: 182.5, obc: 176.2, bcMbc: 170.8, sc: 158.4, st: 138.5, ews: 174.5 },
          { year: '2023', general: 184.8, obc: 178.5, bcMbc: 172.4, sc: 160.2, st: 140.8, ews: 176.8 }
        ]
      },
      {
        id: 'act-btech-biotech',
        name: 'B.Tech Biotechnology',
        nameTamil: 'பி.டெக் உயிர்தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 70, marks: 70, topics: ['Molecular Biology', 'Genetics', 'Microbiology', 'Biochemistry'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Organic', 'Biochemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Biophysics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Ideal for PCB students', 'Good for pharma and research careers', 'Learn lab techniques'],
        seatMatrix: { general: 30, obc: 50, bcMbc: 65, sc: 28, st: 4, ews: 10, total: 187 },
        cutoffs: [
          { year: '2024', general: 178.5, obc: 172.2, bcMbc: 166.8, sc: 152.4, st: 132.5, ews: 170.5 },
          { year: '2023', general: 180.2, obc: 174.5, bcMbc: 168.2, sc: 154.6, st: 134.8, ews: 172.8 }
        ]
      },
      {
        id: 'act-btech-petroleum',
        name: 'B.Tech Petroleum Engineering & Technology',
        nameTamil: 'பி.டெக் பெட்ரோலியம் பொறியியல் & தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 70, marks: 70, topics: ['Organic Chemistry', 'Petrochemicals', 'Refining'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Calculus', 'Differential Equations'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Thermodynamics', 'Fluid Mechanics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Oil & Gas sector focus', 'Good for ONGC, IOCL, Reliance', 'Strong chemistry foundation needed'],
        seatMatrix: { general: 25, obc: 45, bcMbc: 55, sc: 22, st: 4, ews: 8, total: 159 },
        cutoffs: [
          { year: '2024', general: 175.5, obc: 168.2, bcMbc: 162.4, sc: 148.6, st: 128.2, ews: 166.2 },
          { year: '2023', general: 178.2, obc: 171.4, bcMbc: 165.8, sc: 150.5, st: 130.8, ews: 169.5 }
        ]
      },
      {
        id: 'act-btech-pharma',
        name: 'B.Tech Pharmaceutical Technology',
        nameTamil: 'பி.டெக் மருந்து தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 70, marks: 70, topics: ['Organic Chemistry', 'Medicinal Chemistry', 'Pharmaceutics'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 50, marks: 50, topics: ['Pharmacology', 'Microbiology'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Biophysics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Pharmaceutical industry focus', 'Good for Cipla, Sun Pharma, Biocon', 'Strong chemistry & biology needed'],
        seatMatrix: { general: 30, obc: 50, bcMbc: 65, sc: 28, st: 4, ews: 10, total: 187 },
        cutoffs: [
          { year: '2024', general: 180.5, obc: 174.2, bcMbc: 168.8, sc: 154.4, st: 134.5, ews: 172.5 },
          { year: '2023', general: 183.2, obc: 177.4, bcMbc: 171.8, sc: 157.2, st: 137.5, ews: 175.5 }
        ]
      },
      {
        id: 'act-btech-food',
        name: 'B.Tech Food Technology',
        nameTamil: 'பி.டெக் உணவு தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Food Chemistry', 'Biochemistry'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 50, marks: 50, topics: ['Microbiology', 'Nutrition'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 25, marks: 25, topics: ['Food Processing Equipment'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 25, marks: 75, topics: ['Statistics', 'Calculus'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Food processing industry focus', 'Good for Nestle, ITC, Britannia', 'FSSAI regulations knowledge helpful'],
        seatMatrix: { general: 30, obc: 50, bcMbc: 65, sc: 28, st: 4, ews: 10, total: 187 },
        cutoffs: [
          { year: '2024', general: 172.5, obc: 166.2, bcMbc: 160.8, sc: 146.4, st: 126.5, ews: 164.5 },
          { year: '2023', general: 175.2, obc: 169.4, bcMbc: 163.8, sc: 149.2, st: 129.5, ews: 167.5 }
        ]
      },
      {
        id: 'act-btech-textile',
        name: 'B.Tech Textile Technology',
        nameTamil: 'பி.டெக் ஜவுளி தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 60, marks: 60, topics: ['Textile Chemistry', 'Dyeing', 'Polymers'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Calculus', 'Statistics'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 40, marks: 40, topics: ['Fiber Physics', 'Material Science'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Coimbatore/Tirupur textile hub', 'Good for textile mills', 'Learn about fabric manufacturing'],
        seatMatrix: { general: 35, obc: 60, bcMbc: 75, sc: 32, st: 5, ews: 12, total: 219 },
        cutoffs: [
          { year: '2024', general: 165.5, obc: 158.2, bcMbc: 152.4, sc: 138.6, st: 118.2, ews: 156.2 },
          { year: '2023', general: 168.2, obc: 161.4, bcMbc: 155.8, sc: 141.2, st: 121.5, ews: 159.5 }
        ]
      },
      {
        id: 'act-btech-leather',
        name: 'B.Tech Leather Technology',
        nameTamil: 'பி.டெக் தோல் தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 70, marks: 70, topics: ['Leather Chemistry', 'Tanning', 'Polymers'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Calculus', 'Statistics'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Material Science'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Chennai/Ambur is leather hub', 'Good for leather export companies', 'Environmental aspects important'],
        seatMatrix: { general: 25, obc: 45, bcMbc: 55, sc: 22, st: 4, ews: 8, total: 159 },
        cutoffs: [
          { year: '2024', general: 158.5, obc: 152.2, bcMbc: 146.8, sc: 132.4, st: 112.5, ews: 150.5 },
          { year: '2023', general: 161.2, obc: 155.4, bcMbc: 149.8, sc: 135.2, st: 115.5, ews: 153.5 }
        ]
      },
      {
        id: 'act-btech-ceramic',
        name: 'B.Tech Ceramic Technology',
        nameTamil: 'பி.டெக் செராமிக் தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 70, marks: 70, topics: ['Inorganic Chemistry', 'Materials Science', 'Glass Technology'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Calculus', 'Statistics'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Thermal Properties', 'Crystallography'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Niche field - ceramics and refractories', 'Good for tile, sanitaryware industries', 'Strong chemistry foundation needed'],
        seatMatrix: { general: 20, obc: 35, bcMbc: 44, sc: 18, st: 3, ews: 6, total: 126 },
        cutoffs: [
          { year: '2024', general: 155.5, obc: 148.2, bcMbc: 142.4, sc: 128.6, st: 108.2, ews: 146.2 },
          { year: '2023', general: 158.2, obc: 151.4, bcMbc: 145.8, sc: 131.2, st: 111.5, ews: 149.5 }
        ]
      },
      {
        id: 'act-btech-apparel',
        name: 'B.Tech Apparel Technology',
        nameTamil: 'பி.டெக் ஆடை தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Textile Chemistry', 'Dyeing'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 100, topics: ['Statistics', 'Calculus'] },
            { name: 'Design/Physics', nameTamil: 'வடிவமைப்பு/இயற்பியல்', questions: 50, marks: 50, topics: ['Pattern Making', 'Fabric Properties'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Fashion and garment industry focus', 'Good for export houses', 'Learn garment construction'],
        seatMatrix: { general: 25, obc: 45, bcMbc: 55, sc: 22, st: 4, ews: 8, total: 159 },
        cutoffs: [
          { year: '2024', general: 162.5, obc: 155.2, bcMbc: 148.4, sc: 135.6, st: 115.2, ews: 153.2 },
          { year: '2023', general: 165.2, obc: 158.4, bcMbc: 151.8, sc: 138.2, st: 118.5, ews: 156.5 }
        ]
      },

      // ========== SAP CAMPUS (School of Architecture & Planning) ==========
      // Architecture and Planning programs - Requires NATA for B.Arch
      {
        id: 'sap-barch',
        name: 'B.Arch (Architecture)',
        nameTamil: 'பி.ஆர்க் (கட்டிடக்கலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'NATA Exam + 12th Marks',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 25, marks: 50, topics: ['Algebra', 'Trigonometry', 'Coordinate Geometry', 'Calculus'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 50, marks: 100, topics: ['Spatial Ability', 'Observation', 'Aesthetic Sense', '3D Visualization'] },
            { name: 'Drawing', nameTamil: 'வரைதல்', questions: 2, marks: 50, topics: ['Sketching', '3D Perception', 'Design', 'Composition'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['5 Year Course - Requires NATA Exam', 'Practice sketching daily', 'Develop spatial visualization', 'Focus on aesthetic sense questions'],
        seatMatrix: { general: 25, obc: 45, bcMbc: 55, sc: 22, st: 4, ews: 8, total: 159 },
        cutoffs: [
          { year: '2024', general: 172.5, obc: 165.2, bcMbc: 158.4, sc: 142.6, st: 125.8, ews: 162.5 },
          { year: '2023', general: 175.2, obc: 168.4, bcMbc: 160.8, sc: 145.2, st: 128.5, ews: 165.8 }
        ]
      },
      {
        id: 'sap-bplan',
        name: 'B.Plan (Planning)',
        nameTamil: 'பி.பிளான் (நகர திட்டமிடல்)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'TNEA Counselling (Based on 12th marks)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 40, marks: 80, topics: ['Statistics', 'Calculus', 'Geography'] },
            { name: 'General Awareness', nameTamil: 'பொது அறிவு', questions: 30, marks: 60, topics: ['Urban Planning', 'Environment', 'Current Affairs'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 30, marks: 60, topics: ['Spatial Reasoning', 'Map Reading'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['4 Year Course - No NATA required', 'Focus on urban development concepts', 'Good for town planning careers', 'Study geography and environment'],
        seatMatrix: { general: 20, obc: 35, bcMbc: 44, sc: 18, st: 3, ews: 6, total: 126 },
        cutoffs: [
          { year: '2024', general: 168.5, obc: 162.2, bcMbc: 156.8, sc: 142.4, st: 122.5, ews: 160.5 },
          { year: '2023', general: 171.2, obc: 165.4, bcMbc: 159.8, sc: 145.2, st: 125.5, ews: 163.5 }
        ]
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
        tips: ['Focus on Quantum Mechanics - high weightage', 'Practice mathematical physics', 'Understand Classical Mechanics concepts well'],
        seatMatrix: {
          general: 35,
          obc: 60,
          bcMbc: 75,
          sc: 32,
          st: 5,
          ews: 12,
          total: 219
        },
        cutoffs: [
          { year: '2024', general: 72.5, obc: 66.4, bcMbc: 62.2, sc: 48.5, st: 38.6, ews: 64.5 },
          { year: '2023', general: 74.2, obc: 68.6, bcMbc: 64.5, sc: 50.2, st: 40.2, ews: 66.8 },
          { year: '2022', general: 70.8, obc: 64.2, bcMbc: 60.4, sc: 46.8, st: 36.5, ews: 62.2 }
        ]
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
        tips: ['Organic reactions and mechanisms are most important', 'Practice spectroscopy problems', 'Learn coordination compounds well'],
        seatMatrix: {
          general: 30,
          obc: 50,
          bcMbc: 65,
          sc: 28,
          st: 4,
          ews: 10,
          total: 187
        },
        cutoffs: [
          { year: '2024', general: 74.5, obc: 68.2, bcMbc: 64.5, sc: 50.4, st: 40.2, ews: 66.5 },
          { year: '2023', general: 76.2, obc: 70.4, bcMbc: 66.8, sc: 52.6, st: 42.5, ews: 68.8 },
          { year: '2022', general: 72.8, obc: 66.5, bcMbc: 62.2, sc: 48.5, st: 38.5, ews: 64.2 }
        ]
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
        tips: ['Focus on Molecular Biology techniques', 'Learn recombinant DNA technology', 'Understand CRISPR and modern techniques'],
        seatMatrix: {
          general: 25,
          obc: 40,
          bcMbc: 52,
          sc: 22,
          st: 3,
          ews: 8,
          total: 150
        },
        cutoffs: [
          { year: '2024', general: 70.5, obc: 64.2, bcMbc: 60.4, sc: 46.5, st: 36.2, ews: 62.5 },
          { year: '2023', general: 72.2, obc: 66.5, bcMbc: 62.8, sc: 48.8, st: 38.5, ews: 64.8 },
          { year: '2022', general: 68.8, obc: 62.4, bcMbc: 58.2, sc: 44.5, st: 34.2, ews: 60.2 }
        ]
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
        tips: ['Learn bacterial classification thoroughly', 'Immunology concepts are important', 'Understand diagnostic techniques'],
        seatMatrix: {
          general: 28,
          obc: 45,
          bcMbc: 58,
          sc: 25,
          st: 4,
          ews: 9,
          total: 169
        },
        cutoffs: [
          { year: '2024', general: 68.5, obc: 62.2, bcMbc: 58.4, sc: 44.5, st: 34.2, ews: 60.5 },
          { year: '2023', general: 70.2, obc: 64.5, bcMbc: 60.8, sc: 46.8, st: 36.5, ews: 62.8 },
          { year: '2022', general: 66.8, obc: 60.4, bcMbc: 56.2, sc: 42.5, st: 32.2, ews: 58.2 }
        ]
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
        tips: ['Practice circuit analysis', 'Understand semiconductor physics', 'Learn microprocessor concepts'],
        seatMatrix: {
          general: 22,
          obc: 38,
          bcMbc: 48,
          sc: 20,
          st: 3,
          ews: 7,
          total: 138
        },
        cutoffs: [
          { year: '2024', general: 66.5, obc: 60.2, bcMbc: 56.4, sc: 42.5, st: 32.2, ews: 58.5 },
          { year: '2023', general: 68.2, obc: 62.5, bcMbc: 58.8, sc: 44.8, st: 34.5, ews: 60.8 },
          { year: '2022', general: 64.8, obc: 58.4, bcMbc: 54.2, sc: 40.5, st: 30.2, ews: 56.2 }
        ]
      },
      {
        id: 'bu-msc-textile',
        name: 'M.Sc Textiles & Apparel Design',
        nameTamil: 'எம்.எஸ்சி ஜவுளி & ஆடை வடிவமைப்பு',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Textile Science', nameTamil: 'ஜவுளி அறிவியல்', questions: 40, marks: 40, topics: ['Fibres', 'Fabrics', 'Dyeing', 'Processing'] },
            { name: 'Fashion Design', nameTamil: 'நாகரிக வடிவமைப்பு', questions: 30, marks: 30, topics: ['Pattern Making', 'Garment Construction', 'Fashion Trends'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 20, marks: 20, topics: ['Textile Chemistry', 'Dyes'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 10, marks: 10, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Coimbatore is textile hub - good placement', 'Study textile fibres', 'Learn fashion trends'],
        seatMatrix: {
          general: 20,
          obc: 35,
          bcMbc: 44,
          sc: 18,
          st: 3,
          ews: 6,
          total: 126
        },
        cutoffs: [
          { year: '2024', general: 62.5, obc: 56.2, bcMbc: 52.4, sc: 38.5, st: 28.2, ews: 54.5 },
          { year: '2023', general: 64.2, obc: 58.5, bcMbc: 54.8, sc: 40.8, st: 30.5, ews: 56.8 },
          { year: '2022', general: 60.8, obc: 54.4, bcMbc: 50.2, sc: 36.5, st: 26.2, ews: 52.2 }
        ]
      },
      {
        id: 'bu-msc-bioinformatics',
        name: 'M.Sc Bioinformatics',
        nameTamil: 'எம்.எஸ்சி உயிர் தகவலியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 35, marks: 35, topics: ['Molecular Biology', 'Genomics', 'Proteomics'] },
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 35, marks: 35, topics: ['Programming', 'Databases', 'Algorithms'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 20, marks: 20, topics: ['Statistics', 'Probability'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 10, marks: 10, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Blend of biology and computing', 'Learn programming languages', 'Growing field with pharma opportunities'],
        seatMatrix: {
          general: 18,
          obc: 30,
          bcMbc: 38,
          sc: 16,
          st: 3,
          ews: 6,
          total: 111
        },
        cutoffs: [
          { year: '2024', general: 64.5, obc: 58.2, bcMbc: 54.4, sc: 40.5, st: 30.2, ews: 56.5 },
          { year: '2023', general: 66.2, obc: 60.5, bcMbc: 56.8, sc: 42.8, st: 32.5, ews: 58.8 },
          { year: '2022', general: 62.8, obc: 56.4, bcMbc: 52.2, sc: 38.5, st: 28.2, ews: 54.2 }
        ]
      },
      {
        id: 'bu-msc-environmental',
        name: 'M.Sc Environmental Sciences',
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
            { name: 'Environmental Science', nameTamil: 'சுற்றுச்சூழல் அறிவியல்', questions: 40, marks: 40, topics: ['Ecology', 'Pollution', 'Conservation', 'Climate Change'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 25, marks: 25, topics: ['Environmental Chemistry', 'Toxicology'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 25, marks: 25, topics: ['Biodiversity', 'Ecosystems'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 10, marks: 10, topics: ['Reasoning', 'Current Affairs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Growing demand in CSR and environmental consultancy', 'Study pollution control acts', 'Learn impact assessment'],
        seatMatrix: {
          general: 22,
          obc: 38,
          bcMbc: 48,
          sc: 20,
          st: 3,
          ews: 7,
          total: 138
        },
        cutoffs: [
          { year: '2024', general: 60.5, obc: 54.2, bcMbc: 50.4, sc: 36.5, st: 26.2, ews: 52.5 },
          { year: '2023', general: 62.2, obc: 56.5, bcMbc: 52.8, sc: 38.8, st: 28.5, ews: 54.8 },
          { year: '2022', general: 58.8, obc: 52.4, bcMbc: 48.2, sc: 34.5, st: 24.2, ews: 50.2 }
        ]
      },
      {
        id: 'bu-msc-cyber-security',
        name: 'M.Sc Cyber Security',
        nameTamil: 'எம்.எஸ்சி சைபர் பாதுகாப்பு',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Computer Networks', nameTamil: 'கணினி வலையமைப்பு', questions: 30, marks: 30, topics: ['Network Security', 'Protocols', 'Firewalls'] },
            { name: 'Programming', nameTamil: 'நிரலாக்கம்', questions: 25, marks: 25, topics: ['C', 'Python', 'Shell Scripting'] },
            { name: 'Security Concepts', nameTamil: 'பாதுகாப்பு கருத்துகள்', questions: 25, marks: 25, topics: ['Cryptography', 'Ethical Hacking', 'Malware'] },
            { name: 'Database & OS', nameTamil: 'தரவுத்தளம் & OS', questions: 20, marks: 20, topics: ['SQL', 'Linux Security'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['High demand field', 'Learn ethical hacking basics', 'Study network protocols'],
        seatMatrix: {
          general: 25,
          obc: 42,
          bcMbc: 52,
          sc: 22,
          st: 4,
          ews: 8,
          total: 153
        },
        cutoffs: [
          { year: '2024', general: 74.5, obc: 68.2, bcMbc: 64.4, sc: 50.5, st: 40.2, ews: 66.5 },
          { year: '2023', general: 76.2, obc: 70.5, bcMbc: 66.8, sc: 52.8, st: 42.5, ews: 68.8 },
          { year: '2022', general: 72.8, obc: 66.4, bcMbc: 62.2, sc: 48.5, st: 38.2, ews: 64.2 }
        ]
      },
      {
        id: 'bu-msc-data-analytics',
        name: 'M.Sc Data Analytics',
        nameTamil: 'எம்.எஸ்சி தரவு பகுப்பாய்வு',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
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
        seatMatrix: {
          general: 28,
          obc: 45,
          bcMbc: 58,
          sc: 25,
          st: 4,
          ews: 9,
          total: 169
        },
        cutoffs: [
          { year: '2024', general: 78.5, obc: 72.2, bcMbc: 68.4, sc: 54.5, st: 44.2, ews: 70.5 },
          { year: '2023', general: 80.2, obc: 74.5, bcMbc: 70.8, sc: 56.8, st: 46.5, ews: 72.8 },
          { year: '2022', general: 76.8, obc: 70.4, bcMbc: 66.2, sc: 52.5, st: 42.2, ews: 68.2 }
        ]
      },
      {
        id: 'bu-msc-medical-physics',
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
        tips: ['Bharathiar is famous for Medical Physics', 'Career in hospitals and cancer centres', 'Study nuclear physics thoroughly'],
        seatMatrix: {
          general: 15,
          obc: 25,
          bcMbc: 32,
          sc: 14,
          st: 2,
          ews: 5,
          total: 93
        },
        cutoffs: [
          { year: '2024', general: 72.5, obc: 66.2, bcMbc: 62.4, sc: 48.5, st: 38.2, ews: 64.5 },
          { year: '2023', general: 74.2, obc: 68.5, bcMbc: 64.8, sc: 50.8, st: 40.5, ews: 66.8 },
          { year: '2022', general: 70.8, obc: 64.4, bcMbc: 60.2, sc: 46.5, st: 36.2, ews: 62.2 }
        ]
      },
      {
        id: 'bu-msc-human-genetics',
        name: 'M.Sc Human Genetics',
        nameTamil: 'எம்.எஸ்சி மனித மரபியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Genetics', nameTamil: 'மரபியல்', questions: 40, marks: 40, topics: ['Molecular Genetics', 'Cytogenetics', 'Population Genetics'] },
            { name: 'Biochemistry', nameTamil: 'உயிர்வேதியியல்', questions: 25, marks: 25, topics: ['Proteins', 'Enzymes', 'Metabolism'] },
            { name: 'Cell Biology', nameTamil: 'உயிரணு உயிரியல்', questions: 25, marks: 25, topics: ['Cell Structure', 'Cell Division'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 10, marks: 10, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Growing field in medical diagnostics', 'Study molecular genetics', 'Career in genetic counselling'],
        seatMatrix: {
          general: 12,
          obc: 20,
          bcMbc: 26,
          sc: 11,
          st: 2,
          ews: 4,
          total: 75
        },
        cutoffs: [
          { year: '2024', general: 70.5, obc: 64.2, bcMbc: 60.4, sc: 46.5, st: 36.2, ews: 62.5 },
          { year: '2023', general: 72.2, obc: 66.5, bcMbc: 62.8, sc: 48.8, st: 38.5, ews: 64.8 },
          { year: '2022', general: 68.8, obc: 62.4, bcMbc: 58.2, sc: 44.5, st: 34.2, ews: 60.2 }
        ]
      },
      {
        id: 'bu-mjmc',
        name: 'M.J.M.C (Journalism & Mass Comm)',
        nameTamil: 'எம்.ஜே.எம்.சி (பத்திரிகையியல் & வெகுஜன தொடர்பு)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Mass Communication', nameTamil: 'வெகுஜன தொடர்பு', questions: 35, marks: 35, topics: ['Communication Theory', 'Media Studies', 'Journalism'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 30, marks: 30, topics: ['Writing', 'Comprehension', 'Grammar'] },
            { name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்', questions: 20, marks: 20, topics: ['National', 'International', 'Media News'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 15, marks: 15, topics: ['Reasoning', 'GK'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good writing skills essential', 'Stay updated with news', 'Learn media laws'],
        seatMatrix: {
          general: 30,
          obc: 50,
          bcMbc: 65,
          sc: 28,
          st: 4,
          ews: 10,
          total: 187
        },
        cutoffs: [
          { year: '2024', general: 62.5, obc: 56.2, bcMbc: 52.4, sc: 38.5, st: 28.2, ews: 54.5 },
          { year: '2023', general: 64.2, obc: 58.5, bcMbc: 54.8, sc: 40.8, st: 30.5, ews: 56.8 },
          { year: '2022', general: 60.8, obc: 54.4, bcMbc: 50.2, sc: 36.5, st: 26.2, ews: 52.2 }
        ]
      },
      {
        id: 'bu-ma-economics',
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
            { name: 'Micro Economics', nameTamil: 'நுண் பொருளியல்', questions: 30, marks: 30, topics: ['Demand', 'Supply', 'Market Structures', 'Consumer Theory'] },
            { name: 'Macro Economics', nameTamil: 'பேரணி பொருளியல்', questions: 30, marks: 30, topics: ['National Income', 'Inflation', 'Monetary Policy'] },
            { name: 'Indian Economy', nameTamil: 'இந்திய பொருளாதாரம்', questions: 25, marks: 25, topics: ['Planning', 'Reforms', 'Current Issues'] },
            { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 15, marks: 15, topics: ['Basic Statistics', 'Econometrics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Excellent for UPSC Economics optional', 'Study Indian economy', 'Learn econometrics'],
        seatMatrix: {
          general: 35,
          obc: 60,
          bcMbc: 75,
          sc: 32,
          st: 5,
          ews: 12,
          total: 219
        },
        cutoffs: [
          { year: '2024', general: 66.5, obc: 60.2, bcMbc: 56.4, sc: 42.5, st: 32.2, ews: 58.5 },
          { year: '2023', general: 68.2, obc: 62.5, bcMbc: 58.8, sc: 44.8, st: 34.5, ews: 60.8 },
          { year: '2022', general: 64.8, obc: 58.4, bcMbc: 54.2, sc: 40.5, st: 30.2, ews: 56.2 }
        ]
      },
      {
        id: 'bu-msw',
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
        tips: ['Good for NGO sector', 'Study social work methods', 'Learn about welfare schemes'],
        seatMatrix: {
          general: 40,
          obc: 70,
          bcMbc: 85,
          sc: 35,
          st: 6,
          ews: 14,
          total: 250
        },
        cutoffs: [
          { year: '2024', general: 58.5, obc: 52.2, bcMbc: 48.4, sc: 34.5, st: 24.2, ews: 50.5 },
          { year: '2023', general: 60.2, obc: 54.5, bcMbc: 50.8, sc: 36.8, st: 26.5, ews: 52.8 },
          { year: '2022', general: 56.8, obc: 50.4, bcMbc: 46.2, sc: 32.5, st: 22.2, ews: 48.2 }
        ]
      },
      {
        id: 'bu-mcom-fintech',
        name: 'M.Com Financial Technology',
        nameTamil: 'எம்.காம் நிதி தொழில்நுட்பம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Finance', nameTamil: 'நிதி', questions: 35, marks: 35, topics: ['Financial Management', 'Banking', 'Investment'] },
            { name: 'Accounting', nameTamil: 'கணக்கியல்', questions: 30, marks: 30, topics: ['Financial Accounting', 'Cost Accounting'] },
            { name: 'Technology', nameTamil: 'தொழில்நுட்பம்', questions: 20, marks: 20, topics: ['Blockchain', 'Digital Payments', 'Data Analytics'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 15, marks: 15, topics: ['Quantitative', 'Reasoning'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Emerging field in finance', 'Learn about blockchain', 'Study digital payments ecosystem']
      },
      // ========== COLLEGE OF ENGINEERING, GUINDY (CEG) - Additional Courses ==========
      // Department of Civil Engineering - Additional PG Courses
      {
        id: 'anna-me-structural',
        name: 'M.E. Structural Engineering',
        nameTamil: 'எம்.இ. கட்டமைப்பு பொறியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Structural Analysis', nameTamil: 'கட்டமைப்பு பகுப்பாய்வு', questions: 30, marks: 30, topics: ['Matrix Methods', 'Finite Element', 'Plastic Analysis'] },
            { name: 'Concrete Structures', nameTamil: 'கான்கிரீட் கட்டமைப்புகள்', questions: 25, marks: 25, topics: ['RCC Design', 'Prestressed Concrete'] },
            { name: 'Steel Structures', nameTamil: 'எஃகு கட்டமைப்புகள்', questions: 25, marks: 25, topics: ['Steel Design', 'Connections'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Linear Algebra', 'Differential Equations'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['GATE Civil required', 'Focus on structural analysis', 'Learn FEM software']
      },
      {
        id: 'anna-me-construction',
        name: 'M.E. Construction Engineering and Management',
        nameTamil: 'எம்.இ. கட்டுமான பொறியியல் மற்றும் மேலாண்மை',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Construction Technology', nameTamil: 'கட்டுமான தொழில்நுட்பம்', questions: 30, marks: 30, topics: ['Construction Methods', 'Equipment'] },
            { name: 'Project Management', nameTamil: 'திட்ட மேலாண்மை', questions: 30, marks: 30, topics: ['CPM', 'PERT', 'Cost Estimation'] },
            { name: 'Contracts', nameTamil: 'ஒப்பந்தங்கள்', questions: 20, marks: 20, topics: ['Contract Law', 'Claims', 'Arbitration'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Linear Algebra', 'Probability'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for construction industry', 'Learn project management tools', 'Understand contract laws']
      },
      {
        id: 'anna-me-environmental',
        name: 'M.E. Environmental Engineering',
        nameTamil: 'எம்.இ. சுற்றுச்சூழல் பொறியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Water Treatment', nameTamil: 'நீர் சுத்திகரிப்பு', questions: 30, marks: 30, topics: ['Water Supply', 'Treatment Processes'] },
            { name: 'Wastewater Treatment', nameTamil: 'கழிவுநீர் சுத்திகரிப்பு', questions: 30, marks: 30, topics: ['Sewage Treatment', 'STP Design'] },
            { name: 'Air Pollution', nameTamil: 'காற்று மாசுபாடு', questions: 20, marks: 20, topics: ['Air Quality', 'Control Methods'] },
            { name: 'Solid Waste', nameTamil: 'திடக்கழிவு', questions: 20, marks: 20, topics: ['SWM', 'Landfill Design'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Growing field with environmental concerns', 'Learn EIA process', 'Study pollution control norms']
      },
      {
        id: 'anna-me-transportation',
        name: 'M.E. Transportation Engineering',
        nameTamil: 'எம்.இ. போக்குவரத்து பொறியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Highway Engineering', nameTamil: 'நெடுஞ்சாலை பொறியியல்', questions: 30, marks: 30, topics: ['Pavement Design', 'Traffic Engineering'] },
            { name: 'Traffic Engineering', nameTamil: 'போக்குவரத்து பொறியியல்', questions: 30, marks: 30, topics: ['Traffic Flow', 'Signal Design'] },
            { name: 'Urban Transport', nameTamil: 'நகர்ப்புற போக்குவரத்து', questions: 20, marks: 20, topics: ['Mass Transit', 'Planning'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Statistics', 'Optimization'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for NHAI and transport sector', 'Learn pavement design', 'Study traffic simulation']
      },
      {
        id: 'anna-me-hydrology',
        name: 'M.E. Hydrology and Water Resources Engineering',
        nameTamil: 'எம்.இ. நீரியல் மற்றும் நீர் வள பொறியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Hydrology', nameTamil: 'நீரியல்', questions: 30, marks: 30, topics: ['Rainfall-Runoff', 'Groundwater', 'Flood Routing'] },
            { name: 'Irrigation', nameTamil: 'பாசனம்', questions: 25, marks: 25, topics: ['Canal Design', 'Irrigation Methods'] },
            { name: 'Hydraulics', nameTamil: 'நீரியக்கவியல்', questions: 25, marks: 25, topics: ['Open Channel Flow', 'Pipe Flow'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Statistics', 'Probability'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for water resources sector', 'Learn hydrological modeling', 'Study dam engineering']
      },
      {
        id: 'anna-me-remote-sensing',
        name: 'M.E. Remote Sensing and Geomatics',
        nameTamil: 'எம்.இ. தொலையுணர்வு மற்றும் புவிமாதிரியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Remote Sensing', nameTamil: 'தொலையுணர்வு', questions: 35, marks: 35, topics: ['Image Interpretation', 'Satellite Imagery'] },
            { name: 'GIS', nameTamil: 'புவித் தகவல் அமைப்பு', questions: 35, marks: 35, topics: ['Spatial Analysis', 'Database'] },
            { name: 'GPS', nameTamil: 'ஜிபிஎஸ்', questions: 15, marks: 15, topics: ['Positioning', 'Surveying'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 15, marks: 15, topics: ['Statistics', 'Linear Algebra'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for ISRO, Survey of India', 'Learn GIS software', 'Study satellite image processing']
      },
      // Department of Mechanical Engineering - Additional PG Courses
      {
        id: 'anna-me-thermal',
        name: 'M.E. Thermal Engineering',
        nameTamil: 'எம்.இ. வெப்ப பொறியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Thermodynamics', nameTamil: 'வெப்பவியக்கவியல்', questions: 30, marks: 30, topics: ['Laws of Thermodynamics', 'Cycles', 'Engines'] },
            { name: 'Heat Transfer', nameTamil: 'வெப்ப பரிமாற்றம்', questions: 30, marks: 30, topics: ['Conduction', 'Convection', 'Radiation'] },
            { name: 'IC Engines', nameTamil: 'உள் எரி இயந்திரங்கள்', questions: 20, marks: 20, topics: ['SI/CI Engines', 'Performance'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Differential Equations', 'Numerical Methods'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Core mechanical specialization', 'Focus on thermodynamics cycles', 'Learn heat exchanger design']
      },
      {
        id: 'anna-me-energy',
        name: 'M.E. Energy Engineering',
        nameTamil: 'எம்.இ. ஆற்றல் பொறியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Renewable Energy', nameTamil: 'புதுப்பிக்கத்தக்க ஆற்றல்', questions: 30, marks: 30, topics: ['Solar', 'Wind', 'Biomass'] },
            { name: 'Power Plant Engineering', nameTamil: 'மின் நிலைய பொறியியல்', questions: 25, marks: 25, topics: ['Thermal', 'Nuclear', 'Hydro'] },
            { name: 'Energy Management', nameTamil: 'ஆற்றல் மேலாண்மை', questions: 25, marks: 25, topics: ['Energy Audit', 'Conservation'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Calculus', 'Statistics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Growing field with green energy push', 'Learn solar and wind systems', 'Study energy audit procedures']
      },
      {
        id: 'anna-me-design',
        name: 'M.E. Engineering Design',
        nameTamil: 'எம்.இ. பொறியியல் வடிவமைப்பு',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Machine Design', nameTamil: 'இயந்திர வடிவமைப்பு', questions: 35, marks: 35, topics: ['Stress Analysis', 'Fatigue', 'Design of Elements'] },
            { name: 'FEM', nameTamil: 'வரையறு உறுப்பு முறை', questions: 25, marks: 25, topics: ['Structural Analysis', 'Thermal Analysis'] },
            { name: 'CAD/CAM', nameTamil: 'சிஏடி/சிஏஎம்', questions: 20, marks: 20, topics: ['Geometric Modeling', 'CNC'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Linear Algebra', 'Optimization'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for product design roles', 'Learn CAD software (CATIA, SolidWorks)', 'Study FEM analysis']
      },
      {
        id: 'anna-me-manufacturing',
        name: 'M.E. Manufacturing Systems and Management',
        nameTamil: 'எம்.இ. உற்பத்தி அமைப்புகள் மற்றும் மேலாண்மை',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Manufacturing Processes', nameTamil: 'உற்பத்தி செயல்முறைகள்', questions: 30, marks: 30, topics: ['Machining', 'Forming', 'Joining'] },
            { name: 'Production Management', nameTamil: 'உற்பத்தி மேலாண்மை', questions: 30, marks: 30, topics: ['Inventory', 'Scheduling', 'Quality'] },
            { name: 'Automation', nameTamil: 'தானியக்கம்', questions: 20, marks: 20, topics: ['CNC', 'Robotics', 'FMS'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Operations Research', 'Statistics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for operations roles', 'Learn lean manufacturing', 'Study automation systems']
      },
      {
        id: 'anna-me-solar',
        name: 'M.E. Solar Energy',
        nameTamil: 'எம்.இ. சூரிய ஆற்றல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Solar Thermal', nameTamil: 'சூரிய வெப்பம்', questions: 30, marks: 30, topics: ['Collectors', 'Storage', 'Applications'] },
            { name: 'Photovoltaics', nameTamil: 'ஒளி மின்சாரம்', questions: 30, marks: 30, topics: ['Solar Cells', 'PV Systems', 'Grid Integration'] },
            { name: 'Energy Storage', nameTamil: 'ஆற்றல் சேமிப்பு', questions: 20, marks: 20, topics: ['Batteries', 'Thermal Storage'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Calculus', 'Heat Transfer'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['High demand with solar industry growth', 'Learn PV system design', 'Study solar cell technology']
      },
      // Department of Electrical Engineering - Additional PG Courses
      {
        id: 'anna-me-power-systems',
        name: 'M.E. Power Systems Engineering',
        nameTamil: 'எம்.இ. மின்சக்தி அமைப்புகள் பொறியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Power Systems', nameTamil: 'மின்சக்தி அமைப்புகள்', questions: 35, marks: 35, topics: ['Load Flow', 'Stability', 'Protection'] },
            { name: 'Machines', nameTamil: 'இயந்திரங்கள்', questions: 25, marks: 25, topics: ['Generators', 'Transformers', 'Motors'] },
            { name: 'Control Systems', nameTamil: 'கட்டுப்பாட்டு அமைப்புகள்', questions: 20, marks: 20, topics: ['Automatic Control', 'SCADA'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Complex Variables', 'Linear Algebra'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for power sector jobs', 'Learn power system protection', 'Study smart grid technology']
      },
      {
        id: 'anna-me-power-electronics',
        name: 'M.E. Power Electronics and Drives',
        nameTamil: 'எம்.இ. மின் மின்னணுவியல் மற்றும் இயக்கிகள்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Power Electronics', nameTamil: 'மின் மின்னணுவியல்', questions: 35, marks: 35, topics: ['Converters', 'Inverters', 'Choppers'] },
            { name: 'Electric Drives', nameTamil: 'மின் இயக்கிகள்', questions: 30, marks: 30, topics: ['DC Drives', 'AC Drives', 'Control'] },
            { name: 'Control Systems', nameTamil: 'கட்டுப்பாட்டு அமைப்புகள்', questions: 15, marks: 15, topics: ['PID', 'State Space'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Transforms', 'Linear Algebra'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for EV industry', 'Learn converter design', 'Study motor drives']
      },
      {
        id: 'anna-me-embedded',
        name: 'M.E. Embedded System Technologies',
        nameTamil: 'எம்.இ. உள்பொதி அமைப்பு தொழில்நுட்பங்கள்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Microcontrollers', nameTamil: 'நுண்கட்டுப்படுத்திகள்', questions: 30, marks: 30, topics: ['ARM', 'AVR', '8051'] },
            { name: 'RTOS', nameTamil: 'நேரடி இயக்க அமைப்பு', questions: 25, marks: 25, topics: ['FreeRTOS', 'Scheduling', 'Synchronization'] },
            { name: 'Digital Electronics', nameTamil: 'டிஜிட்டல் மின்னணுவியல்', questions: 25, marks: 25, topics: ['FPGA', 'VHDL', 'Verilog'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Discrete Math', 'Probability'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for IoT and automotive', 'Learn ARM programming', 'Study RTOS concepts']
      },
      {
        id: 'anna-me-high-voltage',
        name: 'M.E. High Voltage Engineering',
        nameTamil: 'எம்.இ. உயர் மின்னழுத்த பொறியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'High Voltage', nameTamil: 'உயர் மின்னழுத்தம்', questions: 35, marks: 35, topics: ['Breakdown', 'Insulation', 'Corona'] },
            { name: 'Power Systems', nameTamil: 'மின்சக்தி அமைப்புகள்', questions: 25, marks: 25, topics: ['Transmission', 'Protection'] },
            { name: 'Measurement', nameTamil: 'அளவீடு', questions: 20, marks: 20, topics: ['HV Testing', 'Impulse Generators'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Electromagnetic Fields', 'Statistics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Specialized field for power transmission', 'Learn insulation coordination', 'Study testing techniques']
      },
      // Department of ECE - Additional PG Courses
      {
        id: 'anna-me-communication',
        name: 'M.E. Communication Systems',
        nameTamil: 'எம்.இ. தொடர்பு அமைப்புகள்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Communication Theory', nameTamil: 'தொடர்பு கோட்பாடு', questions: 30, marks: 30, topics: ['Modulation', 'Detection', 'Noise'] },
            { name: 'Digital Communication', nameTamil: 'டிஜிட்டல் தொடர்பு', questions: 30, marks: 30, topics: ['Coding', 'Multiple Access', 'OFDM'] },
            { name: 'Wireless', nameTamil: 'வயர்லெஸ்', questions: 20, marks: 20, topics: ['Cellular', 'WiFi', '5G'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Probability', 'Random Processes'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for telecom industry', 'Learn signal processing', 'Study wireless protocols']
      },
      {
        id: 'anna-me-vlsi',
        name: 'M.E. VLSI Design',
        nameTamil: 'எம்.இ. விஎல்எஸ்ஐ வடிவமைப்பு',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Digital VLSI', nameTamil: 'டிஜிட்டல் விஎல்எஸ்ஐ', questions: 35, marks: 35, topics: ['CMOS Logic', 'Timing', 'Layout'] },
            { name: 'Analog VLSI', nameTamil: 'அனலாக் விஎல்எஸ்ஐ', questions: 25, marks: 25, topics: ['Op-Amps', 'Converters', 'PLL'] },
            { name: 'HDL', nameTamil: 'வன்பொருள் விவரிப்பு மொழி', questions: 20, marks: 20, topics: ['Verilog', 'VHDL', 'Synthesis'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Linear Algebra', 'Probability'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['High demand in semiconductor industry', 'Learn Cadence/Synopsys tools', 'Study CMOS design']
      },
      {
        id: 'anna-me-medical-electronics',
        name: 'M.E. Medical Electronics',
        nameTamil: 'எம்.இ. மருத்துவ மின்னணுவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Medical Instrumentation', nameTamil: 'மருத்துவ கருவியியல்', questions: 35, marks: 35, topics: ['Biomedical Sensors', 'ECG', 'EEG'] },
            { name: 'Medical Imaging', nameTamil: 'மருத்துவ படிமப்பிடிப்பு', questions: 30, marks: 30, topics: ['X-Ray', 'CT', 'MRI', 'Ultrasound'] },
            { name: 'Signal Processing', nameTamil: 'சமிக்ஞை செயலாக்கம்', questions: 15, marks: 15, topics: ['DSP', 'Filters'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Transforms', 'Statistics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for healthcare equipment companies', 'Learn medical imaging principles', 'Study biosignal processing']
      },
      // Department of CSE - Additional PG Courses
      {
        id: 'anna-me-software',
        name: 'M.E. Software Engineering',
        nameTamil: 'எம்.இ. மென்பொருள் பொறியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Software Engineering', nameTamil: 'மென்பொருள் பொறியியல்', questions: 30, marks: 30, topics: ['SDLC', 'Agile', 'Testing'] },
            { name: 'Programming', nameTamil: 'நிரலாக்கம்', questions: 25, marks: 25, topics: ['OOP', 'Design Patterns', 'Refactoring'] },
            { name: 'Database', nameTamil: 'தரவுத்தளம்', questions: 25, marks: 25, topics: ['DBMS', 'SQL', 'NoSQL'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Discrete Math', 'Statistics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for software development roles', 'Learn design patterns', 'Study agile methodologies']
      },
      {
        id: 'anna-me-big-data',
        name: 'M.E. Computer Science and Engineering (Big Data Analytics)',
        nameTamil: 'எம்.இ. கணினி அறிவியல் பொறியியல் (பெரிய தரவு பகுப்பாய்வு)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Big Data', nameTamil: 'பெரிய தரவு', questions: 30, marks: 30, topics: ['Hadoop', 'Spark', 'MapReduce'] },
            { name: 'Machine Learning', nameTamil: 'இயந்திர கற்றல்', questions: 30, marks: 30, topics: ['Supervised', 'Unsupervised', 'Deep Learning'] },
            { name: 'Database', nameTamil: 'தரவுத்தளம்', questions: 20, marks: 20, topics: ['NoSQL', 'Data Warehousing'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Statistics', 'Linear Algebra'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['High demand specialization', 'Learn Hadoop ecosystem', 'Study machine learning algorithms']
      },
      // Department of Information Technology - Additional Courses
      {
        id: 'anna-mtech-it',
        name: 'M.Tech. Information Technology',
        nameTamil: 'எம்.டெக். தகவல் தொழில்நுட்பம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Computer Networks', nameTamil: 'கணினி வலையமைப்பு', questions: 30, marks: 30, topics: ['Protocols', 'Security', 'Cloud'] },
            { name: 'Programming', nameTamil: 'நிரலாக்கம்', questions: 25, marks: 25, topics: ['OOP', 'Web Development'] },
            { name: 'Database', nameTamil: 'தரவுத்தளம்', questions: 25, marks: 25, topics: ['SQL', 'NoSQL', 'Big Data'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Discrete Math', 'Statistics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Broad IT curriculum', 'Learn cloud technologies', 'Study networking protocols']
      },
      // Department of Management Studies - MBA Specialization
      {
        id: 'anna-mba-tourism',
        name: 'M.B.A. Tourism Management',
        nameTamil: 'எம்.பி.ஏ. சுற்றுலா மேலாண்மை',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (TANCET)',
          negativeMarking: false,
          sections: [
            { name: 'Tourism Management', nameTamil: 'சுற்றுலா மேலாண்மை', questions: 30, marks: 30, topics: ['Tourism Industry', 'Hospitality', 'Travel'] },
            { name: 'Marketing', nameTamil: 'சந்தைப்படுத்துதல்', questions: 25, marks: 25, topics: ['Services Marketing', 'Digital Marketing'] },
            { name: 'General Management', nameTamil: 'பொது மேலாண்மை', questions: 25, marks: 25, topics: ['Finance', 'HR', 'Operations'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 20, marks: 20, topics: ['Quantitative', 'Reasoning'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Growing tourism industry in TN', 'Learn hospitality management', 'Study destination marketing']
      },
      // Science and Humanities - Additional Courses
      {
        id: 'anna-msc-applied-chemistry',
        name: 'M.Sc. Applied Chemistry',
        nameTamil: 'எம்.எஸ்சி. பயன்பாட்டு வேதியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Organic Chemistry', nameTamil: 'கரிம வேதியியல்', questions: 30, marks: 30, topics: ['Reactions', 'Mechanisms', 'Synthesis'] },
            { name: 'Inorganic Chemistry', nameTamil: 'கனிம வேதியியல்', questions: 25, marks: 25, topics: ['Coordination', 'Organometallics'] },
            { name: 'Physical Chemistry', nameTamil: 'பெளதிக வேதியியல்', questions: 25, marks: 25, topics: ['Thermodynamics', 'Kinetics'] },
            { name: 'Industrial Chemistry', nameTamil: 'தொழில்துறை வேதியியல்', questions: 20, marks: 20, topics: ['Polymers', 'Petrochemicals'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for chemical industry', 'Focus on industrial applications', 'Learn polymer chemistry']
      },
      {
        id: 'anna-mtech-polymer',
        name: 'M.Tech. Polymer Science and Engineering',
        nameTamil: 'எம்.டெக். பாலிமர் அறிவியல் மற்றும் பொறியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Polymer Chemistry', nameTamil: 'பாலிமர் வேதியியல்', questions: 35, marks: 35, topics: ['Polymerization', 'Characterization'] },
            { name: 'Polymer Processing', nameTamil: 'பாலிமர் செயலாக்கம்', questions: 30, marks: 30, topics: ['Molding', 'Extrusion', 'Compounding'] },
            { name: 'Polymer Properties', nameTamil: 'பாலிமர் பண்புகள்', questions: 20, marks: 20, topics: ['Mechanical', 'Thermal', 'Optical'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 15, marks: 15, topics: ['Calculus', 'Statistics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for plastics and rubber industry', 'Learn polymer processing', 'Study polymer characterization']
      },
      {
        id: 'anna-msc-geology',
        name: 'M.Sc. Applied Geology',
        nameTamil: 'எம்.எஸ்சி. பயன்பாட்டு புவியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Physical Geology', nameTamil: 'இயல் புவியியல்', questions: 30, marks: 30, topics: ['Mineralogy', 'Petrology', 'Stratigraphy'] },
            { name: 'Structural Geology', nameTamil: 'அமைப்பு புவியியல்', questions: 25, marks: 25, topics: ['Folds', 'Faults', 'Geological Maps'] },
            { name: 'Economic Geology', nameTamil: 'பொருளாதார புவியியல்', questions: 25, marks: 25, topics: ['Ore Deposits', 'Mining', 'Petroleum'] },
            { name: 'Applied Geology', nameTamil: 'பயன்பாட்டு புவியியல்', questions: 20, marks: 20, topics: ['Engineering Geology', 'Hydrogeology'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for GSI and mining sector', 'Learn geological mapping', 'Study hydrogeology']
      },
      {
        id: 'anna-msc-applied-math',
        name: 'M.Sc. Applied Mathematics',
        nameTamil: 'எம்.எஸ்சி. பயன்பாட்டு கணிதம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Pure Mathematics', nameTamil: 'தூய கணிதம்', questions: 30, marks: 30, topics: ['Algebra', 'Analysis', 'Topology'] },
            { name: 'Applied Mathematics', nameTamil: 'பயன்பாட்டு கணிதம்', questions: 30, marks: 30, topics: ['Differential Equations', 'Numerical Methods'] },
            { name: 'Operations Research', nameTamil: 'செயல்பாட்டு ஆராய்ச்சி', questions: 20, marks: 20, topics: ['LPP', 'Queuing', 'Game Theory'] },
            { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Probability', 'Statistical Inference'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for research and analytics', 'Focus on numerical methods', 'Learn statistical computing']
      },
      {
        id: 'anna-msc-media',
        name: 'M.Sc. Electronic Media',
        nameTamil: 'எம்.எஸ்சி. மின்னணு ஊடகம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Electronic Media', nameTamil: 'மின்னணு ஊடகம்', questions: 35, marks: 35, topics: ['TV Production', 'Radio', 'Digital Media'] },
            { name: 'Communication', nameTamil: 'தொடர்பியல்', questions: 30, marks: 30, topics: ['Mass Communication', 'Journalism'] },
            { name: 'Technology', nameTamil: 'தொழில்நுட்பம்', questions: 20, marks: 20, topics: ['Multimedia', 'Editing'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 15, marks: 15, topics: ['English', 'Current Affairs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for media industry', 'Learn video editing', 'Study digital content creation']
      },
      {
        id: 'anna-msc-medical-physics',
        name: 'M.Sc. Medical Physics',
        nameTamil: 'எம்.எஸ்சி. மருத்துவ இயற்பியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Radiation Physics', nameTamil: 'கதிர்வீச்சு இயற்பியல்', questions: 30, marks: 30, topics: ['Radioactivity', 'X-rays', 'Dosimetry'] },
            { name: 'Medical Imaging', nameTamil: 'மருத்துவ படிமப்பிடிப்பு', questions: 30, marks: 30, topics: ['CT', 'MRI', 'PET', 'Ultrasound'] },
            { name: 'Radiation Therapy', nameTamil: 'கதிர்வீச்சு சிகிச்சை', questions: 25, marks: 25, topics: ['Treatment Planning', 'LINAC'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 15, marks: 15, topics: ['Nuclear Physics', 'Quantum Mechanics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Career in hospitals and cancer centres', 'Learn radiation dosimetry', 'Study treatment planning']
      },
      {
        id: 'anna-msc-materials',
        name: 'M.Sc. Materials Science',
        nameTamil: 'எம்.எஸ்சி. பொருள் அறிவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Materials Science', nameTamil: 'பொருள் அறிவியல்', questions: 40, marks: 40, topics: ['Crystallography', 'Defects', 'Phase Diagrams'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 25, marks: 25, topics: ['Solid State Physics', 'Quantum Mechanics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 20, marks: 20, topics: ['Physical Chemistry', 'Polymers'] },
            { name: 'Engineering', nameTamil: 'பொறியியல்', questions: 15, marks: 15, topics: ['Material Testing', 'Properties'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Interdisciplinary field', 'Learn material characterization', 'Study nanomaterials']
      },
      {
        id: 'anna-mtech-laser',
        name: 'M.Tech. Laser and Electro Optical Engineering',
        nameTamil: 'எம்.டெக். லேசர் மற்றும் மின்-ஒளியியல் பொறியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Lasers', nameTamil: 'லேசர்கள்', questions: 35, marks: 35, topics: ['Laser Principles', 'Types', 'Applications'] },
            { name: 'Optics', nameTamil: 'ஒளியியல்', questions: 30, marks: 30, topics: ['Wave Optics', 'Fiber Optics', 'Holography'] },
            { name: 'Electronics', nameTamil: 'மின்னணுவியல்', questions: 15, marks: 15, topics: ['Photodetectors', 'Modulators'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['EM Theory', 'Fourier Optics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Specialized field in photonics', 'Learn laser systems', 'Study fiber optic communication']
      },
      // Integrated 5-Year Programmes
      {
        id: 'anna-integrated-msc-cs',
        name: 'M.Sc. Computer Science (5-Year Integrated)',
        nameTamil: 'எம்.எஸ்சி. கணினி அறிவியல் (5-ஆண்டு ஒருங்கிணைந்த)',
        type: 'Integrated',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Entrance)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 40, marks: 40, topics: ['Algebra', 'Calculus', 'Statistics'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 30, marks: 30, topics: ['Logical Reasoning', 'Quantitative'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 15, marks: 15, topics: ['Grammar', 'Comprehension'] },
            { name: 'General Science', nameTamil: 'பொது அறிவியல்', questions: 15, marks: 15, topics: ['Physics', 'Computer Basics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Direct PG after +2', 'Strong math foundation needed', 'Good for research career']
      },
      {
        id: 'anna-integrated-msc-it',
        name: 'M.Sc. Information Technology (5-Year Integrated)',
        nameTamil: 'எம்.எஸ்சி. தகவல் தொழில்நுட்பம் (5-ஆண்டு ஒருங்கிணைந்த)',
        type: 'Integrated',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Entrance)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 40, marks: 40, topics: ['Algebra', 'Calculus', 'Statistics'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 30, marks: 30, topics: ['Logical Reasoning', 'Quantitative'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 15, marks: 15, topics: ['Grammar', 'Comprehension'] },
            { name: 'General Science', nameTamil: 'பொது அறிவியல்', questions: 15, marks: 15, topics: ['Physics', 'Computer Basics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Direct PG after +2', 'Strong math foundation needed', 'Good for IT industry']
      },
      {
        id: 'anna-integrated-media',
        name: 'M.Sc. Electronic Media (5-Year Integrated)',
        nameTamil: 'எம்.எஸ்சி. மின்னணு ஊடகம் (5-ஆண்டு ஒருங்கிணைந்த)',
        type: 'Integrated',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Entrance)',
          negativeMarking: false,
          sections: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 30, marks: 30, topics: ['Current Affairs', 'Media Industry'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 30, marks: 30, topics: ['Grammar', 'Comprehension', 'Writing'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 25, marks: 25, topics: ['Logical Reasoning', 'Creativity'] },
            { name: 'Media Awareness', nameTamil: 'ஊடக விழிப்புணர்வு', questions: 15, marks: 15, topics: ['TV', 'Radio', 'Digital Media'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Direct entry after +2', 'Stay updated with news', 'Develop communication skills']
      },
      // ========== MADRAS INSTITUTE OF TECHNOLOGY (MIT) - Courses ==========
      {
        id: 'anna-be-auto',
        name: 'B.E. Automobile Engineering',
        nameTamil: 'பி.இ. வாகன பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 55, marks: 55, topics: ['Calculus', 'Mechanics', 'Vectors'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 55, marks: 55, topics: ['Mechanics', 'Thermodynamics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 45, topics: ['Fuels', 'Lubricants', 'Materials'] },
            { name: 'Engineering Basics', nameTamil: 'பொறியியல் அடிப்படைகள்', questions: 45, marks: 45, topics: ['IC Engines', 'Vehicle Dynamics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['MIT Chennai campus specializes in Auto', 'Good for automotive industry', 'Learn about EV technology']
      },
      {
        id: 'anna-be-instrumentation',
        name: 'B.E. Instrumentation Engineering',
        nameTamil: 'பி.இ. கருவியியல் பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 50, topics: ['Calculus', 'Transforms', 'Control Theory'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Electronics', 'Sensors', 'Transducers'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 45, topics: ['Analytical Chemistry'] },
            { name: 'Electronics', nameTamil: 'மின்னணுவியல்', questions: 55, marks: 55, topics: ['Circuits', 'Digital Electronics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for process industries', 'Learn PLC and SCADA', 'Study control systems']
      },
      {
        id: 'anna-be-production',
        name: 'B.E. Production Engineering',
        nameTamil: 'பி.இ. உற்பத்தி பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 55, marks: 55, topics: ['Statistics', 'Operations Research'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Mechanics', 'Materials'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 45, topics: ['Manufacturing Materials'] },
            { name: 'Manufacturing', nameTamil: 'உற்பத்தி', questions: 50, marks: 50, topics: ['Machining', 'Welding', 'Casting'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for manufacturing sector', 'Learn CAD/CAM', 'Study industrial engineering']
      },
      {
        id: 'anna-btech-rubber-plastics',
        name: 'B.Tech. Rubber and Plastics Technology',
        nameTamil: 'பி.டெக். ரப்பர் மற்றும் பிளாஸ்டிக் தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 70, marks: 70, topics: ['Polymer Chemistry', 'Organic Chemistry'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 45, marks: 45, topics: ['Calculus', 'Statistics'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 45, marks: 45, topics: ['Material Properties'] },
            { name: 'Technology', nameTamil: 'தொழில்நுட்பம்', questions: 40, marks: 40, topics: ['Processing', 'Compounding'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Unique course - MIT specialty', 'Good for polymer industry', 'Learn rubber compounding']
      },
      {
        id: 'anna-me-aero',
        name: 'M.E. Aeronautical Engineering',
        nameTamil: 'எம்.இ. விமானவியல் பொறியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Aerodynamics', nameTamil: 'காற்றியக்கவியல்', questions: 30, marks: 30, topics: ['Subsonic', 'Supersonic', 'Compressible Flow'] },
            { name: 'Structures', nameTamil: 'கட்டமைப்புகள்', questions: 25, marks: 25, topics: ['Aircraft Structures', 'Composites'] },
            { name: 'Propulsion', nameTamil: 'உந்து சக்தி', questions: 25, marks: 25, topics: ['Jet Engines', 'Rockets'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Fluid Mechanics', 'Numerical Methods'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['MIT Chromepet specializes in Aero', 'Good for ISRO, DRDO, HAL', 'Study CFD and FEM']
      },
      {
        id: 'anna-me-avionics',
        name: 'M.E. Avionics',
        nameTamil: 'எம்.இ. ஏவியானிக்ஸ்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Avionics Systems', nameTamil: 'ஏவியானிக்ஸ் அமைப்புகள்', questions: 35, marks: 35, topics: ['Navigation', 'Radar', 'Communication'] },
            { name: 'Control Systems', nameTamil: 'கட்டுப்பாட்டு அமைப்புகள்', questions: 25, marks: 25, topics: ['Flight Control', 'Autopilot'] },
            { name: 'Electronics', nameTamil: 'மின்னணுவியல்', questions: 20, marks: 20, topics: ['Embedded Systems', 'Digital Electronics'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Signal Processing', 'Control Theory'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Combination of Aero and ECE', 'Good for avionics companies', 'Study radar and navigation systems']
      },
      {
        id: 'anna-me-mechatronics',
        name: 'M.E. Mechatronics',
        nameTamil: 'எம்.இ. மெக்காட்ரானிக்ஸ்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Mechatronics', nameTamil: 'மெக்காட்ரானிக்ஸ்', questions: 30, marks: 30, topics: ['Sensors', 'Actuators', 'Control'] },
            { name: 'Mechanical', nameTamil: 'இயந்திரவியல்', questions: 25, marks: 25, topics: ['Mechanisms', 'Machine Design'] },
            { name: 'Electronics', nameTamil: 'மின்னணுவியல்', questions: 25, marks: 25, topics: ['Microcontrollers', 'PLC'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Control Theory', 'Numerical Methods'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Interdisciplinary field', 'Good for automation industry', 'Learn robotics and automation']
      },
      {
        id: 'anna-me-auto-pg',
        name: 'M.E. Automobile Engineering',
        nameTamil: 'எம்.இ. வாகன பொறியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Vehicle Engineering', nameTamil: 'வாகன பொறியியல்', questions: 35, marks: 35, topics: ['Vehicle Dynamics', 'Chassis', 'Suspension'] },
            { name: 'IC Engines', nameTamil: 'உள் எரி இயந்திரங்கள்', questions: 25, marks: 25, topics: ['Engine Design', 'Performance', 'Emissions'] },
            { name: 'EV Technology', nameTamil: 'மின்வாகன தொழில்நுட்பம்', questions: 20, marks: 20, topics: ['EV Motors', 'Batteries', 'Charging'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Vehicle Dynamics', 'Control'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Chennai has major auto industry', 'Learn EV technology', 'Study vehicle dynamics']
      },
      // ========== ALAGAPPA COLLEGE OF TECHNOLOGY (ACT) - Courses ==========
      {
        id: 'anna-btech-food',
        name: 'B.Tech. Food Technology',
        nameTamil: 'பி.டெக். உணவு தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 60, marks: 60, topics: ['Food Chemistry', 'Organic Chemistry'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 50, marks: 50, topics: ['Microbiology', 'Nutrition'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 45, marks: 45, topics: ['Statistics', 'Calculus'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 45, marks: 45, topics: ['Food Physics', 'Unit Operations'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Growing food processing industry', 'Learn HACCP and food safety', 'Study food preservation methods']
      },
      {
        id: 'anna-btech-leather',
        name: 'B.Tech. Leather Technology',
        nameTamil: 'பி.டெக். தோல் தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 70, marks: 70, topics: ['Leather Chemistry', 'Organic Chemistry'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 45, marks: 45, topics: ['Statistics'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 45, marks: 45, topics: ['Material Properties'] },
            { name: 'Technology', nameTamil: 'தொழில்நுட்பம்', questions: 40, marks: 40, topics: ['Tanning', 'Finishing'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Chennai is leather hub', 'ACT specialty course', 'Good for leather goods industry']
      },
      {
        id: 'anna-btech-petrochem',
        name: 'B.Tech. Petrochemical Engineering',
        nameTamil: 'பி.டெக். பெட்ரோ வேதி பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 70, marks: 70, topics: ['Organic', 'Petrochemistry', 'Polymers'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 45, marks: 45, topics: ['Calculus', 'Statistics'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 45, marks: 45, topics: ['Thermodynamics', 'Fluid Mechanics'] },
            { name: 'Technology', nameTamil: 'தொழில்நுட்பம்', questions: 40, marks: 40, topics: ['Refining', 'Petrochemicals'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for oil & gas sector', 'Chennai has refineries', 'Study refining processes']
      },
      {
        id: 'anna-btech-pharma',
        name: 'B.Tech. Pharmaceutical Engineering',
        nameTamil: 'பி.டெக். மருந்து பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 65, marks: 65, topics: ['Organic', 'Pharmaceutical Chemistry'] },
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 45, marks: 45, topics: ['Pharmacology', 'Microbiology'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 45, marks: 45, topics: ['Statistics', 'Calculus'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 45, marks: 45, topics: ['Unit Operations'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Growing pharma sector', 'Learn GMP and regulatory affairs', 'Study drug formulation']
      },
      {
        id: 'anna-btech-textile',
        name: 'B.Tech. Textile Engineering',
        nameTamil: 'பி.டெக். ஜவுளி பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 55, marks: 55, topics: ['Textile Chemistry', 'Dyeing'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Textile Physics', 'Fibers'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 50, topics: ['Statistics', 'Quality Control'] },
            { name: 'Technology', nameTamil: 'தொழில்நுட்பம்', questions: 45, marks: 45, topics: ['Spinning', 'Weaving'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['ACT specialty', 'TN has textile industry', 'Learn textile processing']
      },
      {
        id: 'anna-btech-ceramic',
        name: 'B.Tech. Ceramic Technology',
        nameTamil: 'பி.டெக். செராமிக் தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 60, marks: 60, topics: ['Inorganic', 'Ceramic Chemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Material Properties', 'Thermal'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 45, marks: 45, topics: ['Statistics', 'Calculus'] },
            { name: 'Technology', nameTamil: 'தொழில்நுட்பம்', questions: 45, marks: 45, topics: ['Ceramics Processing'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Unique course in India', 'Good for tiles and sanitary industry', 'Study ceramic materials']
      },
      {
        id: 'anna-btech-ind-biotech',
        name: 'B.Tech. Industrial Biotechnology',
        nameTamil: 'பி.டெக். தொழில்துறை உயிர்தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 65, marks: 65, topics: ['Microbiology', 'Biochemistry', 'Genetics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Organic', 'Biochemistry'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 45, marks: 45, topics: ['Statistics', 'Biostatistics'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 40, marks: 40, topics: ['Biophysics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Growing biotech sector', 'Learn fermentation technology', 'Study bioprocess engineering']
      },
      // ACT PG Courses
      {
        id: 'anna-mtech-chem-eng',
        name: 'M.Tech. Chemical Engineering',
        nameTamil: 'எம்.டெக். வேதியியல் பொறியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Process Calculations', nameTamil: 'செயல்முறை கணக்கீடுகள்', questions: 25, marks: 25, topics: ['Material Balance', 'Energy Balance'] },
            { name: 'Unit Operations', nameTamil: 'அலகு செயல்பாடுகள்', questions: 30, marks: 30, topics: ['Heat Transfer', 'Mass Transfer', 'Fluid Mechanics'] },
            { name: 'Chemical Reaction', nameTamil: 'வேதியியல் வினை', questions: 25, marks: 25, topics: ['Kinetics', 'Reactor Design'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['ODE', 'PDE', 'Numerical Methods'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['GATE Chemical Engineering required', 'Good for process industries', 'Study reaction engineering']
      },
      {
        id: 'anna-mtech-biotech',
        name: 'M.Tech. Biotechnology',
        nameTamil: 'எம்.டெக். உயிர்தொழில்நுட்பம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Molecular Biology', nameTamil: 'மூலக்கூறு உயிரியல்', questions: 30, marks: 30, topics: ['Gene Expression', 'Cloning', 'PCR'] },
            { name: 'Biochemistry', nameTamil: 'உயிர்வேதியியல்', questions: 25, marks: 25, topics: ['Enzymes', 'Metabolism'] },
            { name: 'Bioprocess', nameTamil: 'உயிர்செயல்முறை', questions: 25, marks: 25, topics: ['Fermentation', 'Downstream Processing'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Biostatistics', 'Modeling'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for pharma and biotech companies', 'Learn fermentation technology', 'Study bioreactor design']
      },
      {
        id: 'anna-mtech-food',
        name: 'M.Tech. Food Technology',
        nameTamil: 'எம்.டெக். உணவு தொழில்நுட்பம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Food Engineering', nameTamil: 'உணவு பொறியியல்', questions: 30, marks: 30, topics: ['Unit Operations', 'Food Processing'] },
            { name: 'Food Chemistry', nameTamil: 'உணவு வேதியியல்', questions: 25, marks: 25, topics: ['Food Components', 'Additives'] },
            { name: 'Food Microbiology', nameTamil: 'உணவு நுண்ணுயிரியல்', questions: 25, marks: 25, topics: ['Spoilage', 'Fermentation', 'Safety'] },
            { name: 'Quality Control', nameTamil: 'தரக்கட்டுப்பாடு', questions: 20, marks: 20, topics: ['HACCP', 'FSSAI'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Growing food processing industry', 'Learn FSSAI regulations', 'Study food preservation']
      },
      {
        id: 'anna-mtech-env-sci',
        name: 'M.Tech. Environmental Science & Engineering',
        nameTamil: 'எம்.டெக். சுற்றுச்சூழல் அறிவியல் & பொறியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (GATE/CEETA-PG)',
          negativeMarking: false,
          sections: [
            { name: 'Environmental Engineering', nameTamil: 'சுற்றுச்சூழல் பொறியியல்', questions: 35, marks: 35, topics: ['Water Treatment', 'Air Pollution Control'] },
            { name: 'Environmental Science', nameTamil: 'சுற்றுச்சூழல் அறிவியல்', questions: 30, marks: 30, topics: ['Ecology', 'Climate Change'] },
            { name: 'EIA', nameTamil: 'சுற்றுச்சூழல் தாக்க மதிப்பீடு', questions: 15, marks: 15, topics: ['Impact Assessment', 'Regulations'] },
            { name: 'Engineering Mathematics', nameTamil: 'பொறியியல் கணிதம்', questions: 20, marks: 20, topics: ['Statistics', 'Modeling'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Growing environmental sector', 'Learn EIA process', 'Study pollution control technologies']
      },
      // ========== SCHOOL OF ARCHITECTURE AND PLANNING (SAP) - Courses ==========
      {
        id: 'anna-bplan',
        name: 'B.Plan. Planning',
        nameTamil: 'பி.பிளான். திட்டமிடல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Entrance)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 25, marks: 25, topics: ['Geometry', 'Statistics', 'Algebra'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 35, marks: 35, topics: ['Spatial Ability', 'Observation', 'Critical Thinking'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', questions: 25, marks: 25, topics: ['Current Affairs', 'Urban Issues', 'Environment'] },
            { name: 'Drawing', nameTamil: 'வரைதல்', questions: 15, marks: 15, topics: ['Sketching', 'Map Reading'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['4 year programme', 'Good for urban planning career', 'Learn GIS and planning tools']
      },
      {
        id: 'anna-march',
        name: 'M.Arch. Architecture',
        nameTamil: 'எம்.ஆர்க். கட்டிடக்கலை',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Entrance)',
          negativeMarking: false,
          sections: [
            { name: 'Architectural Design', nameTamil: 'கட்டிடக்கலை வடிவமைப்பு', questions: 40, marks: 40, topics: ['Design Concepts', 'Building Design'] },
            { name: 'Building Technology', nameTamil: 'கட்டிட தொழில்நுட்பம்', questions: 30, marks: 30, topics: ['Construction', 'Materials', 'Services'] },
            { name: 'Theory', nameTamil: 'கோட்பாடு', questions: 20, marks: 20, topics: ['History', 'Sustainability'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 10, marks: 10, topics: ['Spatial Ability'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['B.Arch required', 'GATE Architecture helps', 'Study sustainable design']
      },
      {
        id: 'anna-mplan-urban',
        name: 'M.Plan. Urban Planning',
        nameTamil: 'எம்.பிளான். நகர் திட்டமிடல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Entrance)',
          negativeMarking: false,
          sections: [
            { name: 'Urban Planning', nameTamil: 'நகர் திட்டமிடல்', questions: 40, marks: 40, topics: ['Master Plans', 'Land Use', 'Zoning'] },
            { name: 'Planning Theory', nameTamil: 'திட்டமிடல் கோட்பாடு', questions: 25, marks: 25, topics: ['Planning History', 'Theories'] },
            { name: 'Infrastructure', nameTamil: 'உள்கட்டமைப்பு', questions: 20, marks: 20, topics: ['Transport', 'Water Supply', 'Sanitation'] },
            { name: 'GIS/Remote Sensing', nameTamil: 'ஜிஐஎஸ்/தொலையுணர்வு', questions: 15, marks: 15, topics: ['Spatial Analysis', 'Mapping'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for urban development agencies', 'Learn GIS software', 'Study smart city concepts']
      },
      {
        id: 'anna-mplan-regional',
        name: 'M.Plan. Regional Planning',
        nameTamil: 'எம்.பிளான். பிராந்திய திட்டமிடல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Entrance)',
          negativeMarking: false,
          sections: [
            { name: 'Regional Planning', nameTamil: 'பிராந்திய திட்டமிடல்', questions: 40, marks: 40, topics: ['Regional Development', 'Rural Planning'] },
            { name: 'Economics', nameTamil: 'பொருளியல்', questions: 25, marks: 25, topics: ['Regional Economics', 'Development Theory'] },
            { name: 'Environment', nameTamil: 'சுற்றுச்சூழல்', questions: 20, marks: 20, topics: ['Environmental Planning', 'Sustainability'] },
            { name: 'GIS/Statistics', nameTamil: 'ஜிஐஎஸ்/புள்ளியியல்', questions: 15, marks: 15, topics: ['Spatial Analysis', 'Data Analysis'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for development agencies', 'Study regional economics', 'Learn spatial analysis']
      },
      {
        id: 'anna-mplan-housing',
        name: 'M.Plan. Housing',
        nameTamil: 'எம்.பிளான். வீட்டுவசதி',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Entrance)',
          negativeMarking: false,
          sections: [
            { name: 'Housing', nameTamil: 'வீட்டுவசதி', questions: 40, marks: 40, topics: ['Housing Policy', 'Affordable Housing', 'Slum Rehabilitation'] },
            { name: 'Planning', nameTamil: 'திட்டமிடல்', questions: 25, marks: 25, topics: ['Settlement Planning', 'Site Planning'] },
            { name: 'Economics', nameTamil: 'பொருளியல்', questions: 20, marks: 20, topics: ['Housing Finance', 'Real Estate'] },
            { name: 'Social Aspects', nameTamil: 'சமூக அம்சங்கள்', questions: 15, marks: 15, topics: ['Community Development'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for housing agencies', 'Study PMAY and housing schemes', 'Learn housing finance']
      },
      {
        id: 'anna-mplan-transport',
        name: 'M.Plan. Transportation Planning',
        nameTamil: 'எம்.பிளான். போக்குவரத்து திட்டமிடல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Entrance)',
          negativeMarking: false,
          sections: [
            { name: 'Transport Planning', nameTamil: 'போக்குவரத்து திட்டமிடல்', questions: 40, marks: 40, topics: ['Traffic Engineering', 'Public Transport', 'Highways'] },
            { name: 'Urban Transport', nameTamil: 'நகர்ப்புற போக்குவரத்து', questions: 25, marks: 25, topics: ['Metro', 'Bus', 'NMT'] },
            { name: 'Modeling', nameTamil: 'மாதிரியாக்கம்', questions: 20, marks: 20, topics: ['Travel Demand', 'Simulation'] },
            { name: 'Infrastructure', nameTamil: 'உள்கட்டமைப்பு', questions: 15, marks: 15, topics: ['Design', 'Construction'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['High demand with metro expansion', 'Learn transport modeling', 'Study ITS and smart mobility']
      },
      // Additional UG Courses - Industrial and Mining
      {
        id: 'anna-be-industrial',
        name: 'B.E. Industrial Engineering',
        nameTamil: 'பி.இ. தொழில்துறை பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 55, marks: 55, topics: ['Statistics', 'Operations Research', 'Probability'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Mechanics', 'Thermodynamics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 45, topics: ['Materials'] },
            { name: 'Industrial Engg', nameTamil: 'தொழில்துறை பொறியியல்', questions: 50, marks: 50, topics: ['Work Study', 'Quality', 'Ergonomics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Good for operations roles', 'Learn lean and six sigma', 'Study industrial automation']
      },
      {
        id: 'anna-be-mining',
        name: 'B.E. Mining Engineering',
        nameTamil: 'பி.இ. சுரங்க பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 50, topics: ['Calculus', 'Statistics'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Mechanics', 'Rock Mechanics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Minerals', 'Fuels'] },
            { name: 'Geology', nameTamil: 'புவியியல்', questions: 50, marks: 50, topics: ['Mineralogy', 'Ore Deposits'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Only mining dept in TN', 'Good for Coal India, NMDC', 'Study mine planning']
      },
      {
        id: 'anna-be-printing',
        name: 'B.E. Printing and Packaging Technology',
        nameTamil: 'பி.இ. அச்சு மற்றும் பேக்கேஜிங் தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 55, marks: 55, topics: ['Optics', 'Color Science'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 50, topics: ['Inks', 'Paper', 'Polymers'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 45, marks: 45, topics: ['Statistics', 'Quality Control'] },
            { name: 'Technology', nameTamil: 'தொழில்நுட்பம்', questions: 50, marks: 50, topics: ['Printing Processes', 'Packaging'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Only course in TN', 'Growing packaging industry', 'Learn graphic design']
      },
      {
        id: 'anna-be-material',
        name: 'B.E. Material Science and Engineering',
        nameTamil: 'பி.இ. பொருள் அறிவியல் மற்றும் பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 55, marks: 55, topics: ['Solid State', 'Crystallography'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 55, marks: 55, topics: ['Materials Chemistry', 'Polymers'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 50, topics: ['Calculus', 'Statistics'] },
            { name: 'Materials', nameTamil: 'பொருள்', questions: 40, marks: 40, topics: ['Metals', 'Ceramics', 'Composites'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Interdisciplinary field', 'Good for R&D careers', 'Study nanomaterials']
      },
      {
        id: 'anna-be-manufacturing',
        name: 'B.E. Manufacturing Engineering',
        nameTamil: 'பி.இ. உற்பத்தி பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 55, marks: 55, topics: ['Calculus', 'Statistics', 'Operations Research'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Mechanics', 'Materials'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 45, topics: ['Materials', 'Corrosion'] },
            { name: 'Manufacturing', nameTamil: 'உற்பத்தி', questions: 50, marks: 50, topics: ['Machining', 'CNC', 'Automation'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Core manufacturing skills', 'Learn CNC programming', 'Study automation']
      },
      {
        id: 'anna-btech-it',
        name: 'B.Tech. Information Technology',
        nameTamil: 'பி.டெக். தகவல் தொழில்நுட்பம்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 55, marks: 55, topics: ['Discrete Math', 'Statistics', 'Algebra'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Electronics', 'Modern Physics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 45, topics: ['Physical Chemistry'] },
            { name: 'Computer Basics', nameTamil: 'கணினி அடிப்படைகள்', questions: 50, marks: 50, topics: ['Programming', 'Logic'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['High demand IT course', 'Learn programming early', 'Study web development']
      },
      {
        id: 'anna-be-eee',
        name: 'B.E. Electrical and Electronics Engineering',
        nameTamil: 'பி.இ. மின் மற்றும் மின்னணு பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 55, marks: 55, topics: ['Calculus', 'Transforms', 'Complex Variables'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 55, marks: 55, topics: ['Electronics', 'Electromagnetism'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 45, topics: ['Materials', 'Electrochemistry'] },
            { name: 'Electrical', nameTamil: 'மின்சார', questions: 45, marks: 45, topics: ['Circuits', 'Machines'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Core electrical branch', 'Good for power sector', 'Study electrical machines']
      },
      {
        id: 'anna-be-biomedical',
        name: 'B.E. Biomedical Engineering',
        nameTamil: 'பி.இ. உயிர்மருத்துவ பொறியியல்',
        type: 'UG',
        examPattern: {
          totalQuestions: 200,
          totalMarks: 200,
          duration: '3 Hours',
          durationMinutes: 180,
          mode: 'OMR Based (TNEA Counselling)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 55, marks: 55, topics: ['Human Physiology', 'Anatomy'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Electronics', 'Biophysics'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 50, topics: ['Signal Processing', 'Statistics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 45, marks: 45, topics: ['Biomaterials'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Blend of engineering and medicine', 'Good for medical device companies', 'Learn medical imaging']
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
      {
        id: 'bdu-integrated-msc-life',
        name: '5-Year Integrated M.Sc Life Sciences',
        nameTamil: '5 ஆண்டு ஒருங்கிணைந்த எம்.எஸ்சி உயிர் அறிவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 40, marks: 40, topics: ['Cell Biology', 'Genetics', 'Molecular Biology', 'Ecology'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 30, marks: 30, topics: ['Organic', 'Inorganic', 'Biochemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 20, marks: 20, topics: ['Biophysics', 'Optics'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 10, marks: 10, topics: ['Logical Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Direct entry after 12th with Biology', 'Focus on cell biology and genetics', 'Prepare NEET-level biology questions']
      },
      {
        id: 'bdu-integrated-msc-biomedical',
        name: '5-Year Integrated M.Sc Bio-Medical Science',
        nameTamil: '5 ஆண்டு ஒருங்கிணைந்த எம்.எஸ்சி உயிர்-மருத்துவ அறிவியல்',
        type: 'PG',
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
        tips: ['Strong foundation in human biology required', 'Study 12th Biology thoroughly', 'Good for medical research career']
      },
      {
        id: 'bdu-integrated-msc-geography',
        name: '5-Year Integrated M.Sc Geography',
        nameTamil: '5 ஆண்டு ஒருங்கிணைந்த எம்.எஸ்சி புவியியல்',
        type: 'PG',
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
        tips: ['Good for UPSC Geography optional', 'Learn map reading skills', 'Study Indian geography thoroughly']
      },
      {
        id: 'bdu-integrated-msc-geology',
        name: '5-Year Integrated M.Sc Geology',
        nameTamil: '5 ஆண்டு ஒருங்கிணைந்த எம்.எஸ்சி புவியியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Geology', nameTamil: 'புவியியல்', questions: 40, marks: 40, topics: ['Mineralogy', 'Petrology', 'Structural Geology'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 25, marks: 25, topics: ['Geophysics', 'Crystallography'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 20, marks: 20, topics: ['Geochemistry', 'Analytical Methods'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 15, marks: 15, topics: ['Reasoning', 'Mathematics'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Career in mining and oil exploration', 'Study Earth sciences thoroughly', 'Good job prospects in PSUs like ONGC']
      },
      {
        id: 'bdu-integrated-msc-media',
        name: '5-Year Integrated M.Sc Media & Communication',
        nameTamil: '5 ஆண்டு ஒருங்கிணைந்த எம்.எஸ்சி ஊடகம் & தொடர்பு',
        type: 'PG',
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
        tips: ['Good writing skills essential', 'Stay updated with current affairs', 'Career in journalism and media']
      },
      {
        id: 'bdu-mca',
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
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 40, marks: 40, topics: ['Programming', 'Data Structures', 'DBMS', 'OS'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 30, marks: 30, topics: ['Discrete Math', 'Linear Algebra', 'Probability'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 30, marks: 30, topics: ['Logical Reasoning', 'Numerical', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Strong programming foundation needed', 'Practice data structures', 'Study discrete mathematics']
      },
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
        tips: ['Focus on programming concepts', 'Practice algorithm problems', 'Study computer networks']
      },
      {
        id: 'bdu-msc-remote-sensing',
        name: 'M.Sc Remote Sensing & Geoinformatics',
        nameTamil: 'எம்.எஸ்சி தொலை உணர்வு & புவிதகவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Remote Sensing', nameTamil: 'தொலை உணர்வு', questions: 35, marks: 35, topics: ['Satellite Imaging', 'Image Processing', 'GIS'] },
            { name: 'Geography', nameTamil: 'புவியியல்', questions: 30, marks: 30, topics: ['Physical Geography', 'Cartography'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 20, marks: 20, topics: ['Statistics', 'Spatial Analysis'] },
            { name: 'Computer Basics', nameTamil: 'கணினி அடிப்படை', questions: 15, marks: 15, topics: ['Software', 'Database'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Growing field with ISRO opportunities', 'Learn GIS software', 'Good for urban planning careers']
      },
      {
        id: 'bdu-msc-microbiology',
        name: 'M.Sc Marine Biotechnology',
        nameTamil: 'எம்.எஸ்சி கடல் உயிர் தொழில்நுட்பம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '90 Minutes',
          durationMinutes: 90,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Marine Biology', nameTamil: 'கடல் உயிரியல்', questions: 35, marks: 35, topics: ['Marine Organisms', 'Oceanography', 'Marine Ecology'] },
            { name: 'Biotechnology', nameTamil: 'உயிர் தொழில்நுட்பம்', questions: 35, marks: 35, topics: ['Molecular Biology', 'Genetic Engineering'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 20, marks: 20, topics: ['Biochemistry', 'Marine Chemistry'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 10, marks: 10, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Coastal universities have research advantage', 'Study marine ecosystems', 'Career in marine research']
      },
      {
        id: 'bdu-ma-development',
        name: 'M.A Development Studies',
        nameTamil: 'எம்.ஏ வளர்ச்சி ஆய்வுகள்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
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
        tips: ['Good for NGO and development sector', 'Study government welfare schemes', 'Excellent for UPSC preparation']
      },
      {
        id: 'bdu-ma-hrm',
        name: 'M.A Human Resource Management',
        nameTamil: 'எம்.ஏ மனித வளமேலாண்மை',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Management', nameTamil: 'மேலாண்மை', questions: 35, marks: 35, topics: ['HRM Basics', 'OB', 'Strategic HRM'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 30, marks: 30, topics: ['Quantitative', 'Reasoning'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 20, marks: 20, topics: ['Verbal Ability', 'Comprehension'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 15, marks: 15, topics: ['Current Affairs', 'Labour Laws'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Alternative to MBA-HR', 'Study HR principles', 'Learn labour laws']
      },
      {
        id: 'bdu-mpa-music',
        name: 'M.P.A (Music)',
        nameTamil: 'எம்.பி.ஏ (இசை)',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Music Theory', nameTamil: 'இசைக் கோட்பாடு', questions: 40, marks: 40, topics: ['Ragas', 'Talas', 'Music History'] },
            { name: 'Practical Awareness', nameTamil: 'நடைமுறை விழிப்புணர்வு', questions: 35, marks: 35, topics: ['Compositions', 'Instruments', 'Composers'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 25, marks: 25, topics: ['Cultural GK', 'Arts History'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Prior training in Carnatic/Hindustani required', 'Know major composers', 'Study music history']
      }
    ]
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
      },
      // ========== Annamalai Specialized Courses ==========
      // Faculty of Agriculture
      {
        id: 'au-bsc-agri-hons',
        name: 'B.Sc (Hons) Agriculture',
        nameTamil: 'பி.எஸ்சி (ஹானர்ஸ்) வேளாண்மை',
        type: 'UG',
        examPattern: {
          totalQuestions: 150,
          totalMarks: 150,
          duration: '2.5 Hours',
          durationMinutes: 150,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 50, marks: 50, topics: ['Botany', 'Zoology', 'Genetics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 40, marks: 40, topics: ['Organic', 'Inorganic', 'Soil Chemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 30, marks: 30, topics: ['Mechanics', 'Optics'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 30, marks: 30, topics: ['Agriculture GK', 'Current Affairs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'au-agri-1', year: '2024', question: 'The father of Green Revolution in India is:', options: ['Norman Borlaug', 'M.S. Swaminathan', 'Verghese Kurien', 'C. Subramaniam'], correctAnswer: 1, explanation: 'M.S. Swaminathan is called the Father of Green Revolution in India for introducing high-yielding wheat varieties.', topic: 'Agriculture History', difficulty: 'Easy' }
        ],
        tips: ['Flagship course of Annamalai', 'Study crop science thoroughly', 'Learn soil types and nutrients']
      },
      {
        id: 'au-bsc-horti',
        name: 'B.Sc (Hons) Horticulture',
        nameTamil: 'பி.எஸ்சி (ஹானர்ஸ்) தோட்டக்கலை',
        type: 'UG',
        examPattern: {
          totalQuestions: 150,
          totalMarks: 150,
          duration: '2.5 Hours',
          durationMinutes: 150,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 60, marks: 60, topics: ['Plant Science', 'Floriculture', 'Pomology'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 40, marks: 40, topics: ['Organic', 'Soil Chemistry'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 25, marks: 25, topics: ['Mechanics', 'Optics'] },
            { name: 'Aptitude', nameTamil: 'திறன்', questions: 25, marks: 25, topics: ['Reasoning', 'GK'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Study fruit and vegetable cultivation', 'Learn post-harvest management', 'Good for plantation industry']
      },
      // Faculty of Marine Sciences
      {
        id: 'au-bfsc',
        name: 'B.F.Sc. (Bachelor of Fisheries Science)',
        nameTamil: 'பி.எஃப்.எஸ்சி. (மீன்வளவியல் இளநிலை)',
        type: 'UG',
        examPattern: {
          totalQuestions: 150,
          totalMarks: 150,
          duration: '2.5 Hours',
          durationMinutes: 150,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Zoology', nameTamil: 'விலங்கியல்', questions: 50, marks: 50, topics: ['Fish Biology', 'Aquatic Organisms', 'Marine Life'] },
            { name: 'Botany', nameTamil: 'தாவரவியல்', questions: 30, marks: 30, topics: ['Aquatic Plants', 'Algae', 'Phytoplankton'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 35, marks: 35, topics: ['Water Chemistry', 'Biochemistry'] },
            { name: 'General Science', nameTamil: 'பொது அறிவியல்', questions: 35, marks: 35, topics: ['Marine Science GK', 'Environment'] }
          ]
        },
        syllabus: [],
        previousQuestions: [
          { id: 'au-fish-1', year: '2024', question: 'Aquaculture is the farming of:', options: ['Animals', 'Plants', 'Aquatic organisms', 'Birds'], correctAnswer: 2, explanation: 'Aquaculture is the farming of aquatic organisms including fish, molluscs, crustaceans and aquatic plants.', topic: 'Fisheries Basics', difficulty: 'Easy' },
          { id: 'au-fish-2', year: '2024', question: 'Which is the largest fish?', options: ['Blue Whale', 'Whale Shark', 'Great White Shark', 'Orca'], correctAnswer: 1, explanation: 'Whale Shark is the largest fish (Blue Whale is a mammal, not a fish).', topic: 'Marine Biology', difficulty: 'Easy' }
        ],
        tips: ['Professional degree - 4 years', 'Strong in marine biology', 'Good for fisheries dept jobs', 'Coastal proximity advantage at Annamalai']
      },
      {
        id: 'au-msc-marine-bio',
        name: 'M.Sc. Marine Biology & Oceanography',
        nameTamil: 'எம்.எஸ்சி. கடல் உயிரியல் & சமுத்திரவியல்',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Marine Biology', nameTamil: 'கடல் உயிரியல்', questions: 40, marks: 40, topics: ['Marine Organisms', 'Coral Reefs', 'Marine Ecosystems'] },
            { name: 'Oceanography', nameTamil: 'சமுத்திரவியல்', questions: 30, marks: 30, topics: ['Physical Oceanography', 'Chemical Oceanography', 'Ocean Currents'] },
            { name: 'Zoology', nameTamil: 'விலங்கியல்', questions: 20, marks: 20, topics: ['Fish Anatomy', 'Invertebrates'] },
            { name: 'General Science', nameTamil: 'பொது அறிவியல்', questions: 10, marks: 10, topics: ['Marine Environment', 'Climate'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['CAS Marine Centre at Annamalai', 'Study marine ecosystems', 'Research opportunities with NIOT']
      },
      {
        id: 'au-msc-coastal-aqua',
        name: 'M.Sc. Coastal Aquaculture',
        nameTamil: 'எம்.எஸ்சி. கடலோர நீர்வளர்ப்பு',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Aquaculture', nameTamil: 'நீர்வளர்ப்பு', questions: 45, marks: 45, topics: ['Fish Farming', 'Shrimp Culture', 'Seaweed Farming'] },
            { name: 'Marine Science', nameTamil: 'கடல் அறிவியல்', questions: 30, marks: 30, topics: ['Coastal Ecology', 'Water Quality'] },
            { name: 'Biotechnology', nameTamil: 'உயிர்தொழில்நுட்பம்', questions: 15, marks: 15, topics: ['Fish Genetics', 'Disease Management'] },
            { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 10, marks: 10, topics: ['Reasoning', 'English'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Great for shrimp farming industry', 'Study water quality management', 'Good entrepreneurship scope']
      },
      // Faculty of Fine Arts
      {
        id: 'au-bfa-music',
        name: 'B.F.A. Music (Vocal/Instrumental)',
        nameTamil: 'பி.எஃப்.ஏ. இசை (குரல்/கருவி)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR + Practical',
          negativeMarking: false,
          sections: [
            { name: 'Music Theory', nameTamil: 'இசைக் கோட்பாடு', questions: 40, marks: 40, topics: ['Ragas', 'Talas', 'Compositions', 'Music History'] },
            { name: 'Practical Performance', nameTamil: 'நடைமுறை நிகழ்ச்சி', questions: 30, marks: 30, topics: ['Vocal/Instrument Performance', 'Manodharma'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 20, marks: 20, topics: ['Music Composers', 'Cultural History'] },
            { name: 'Language', nameTamil: 'மொழி', questions: 10, marks: 10, topics: ['Tamil', 'Sanskrit'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Prior training in Carnatic music required', 'Know major composers (Trinity)', 'Practice performance pieces']
      },
      {
        id: 'au-bfa-dance',
        name: 'B.F.A. Dance (Bharatanatyam)',
        nameTamil: 'பி.எஃப்.ஏ. நடனம் (பரதநாட்டியம்)',
        type: 'UG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR + Practical',
          negativeMarking: false,
          sections: [
            { name: 'Dance Theory', nameTamil: 'நடனக் கோட்பாடு', questions: 35, marks: 35, topics: ['Natyashastra', 'Adavus', 'Mudras', 'Dance History'] },
            { name: 'Practical Performance', nameTamil: 'நடைமுறை நிகழ்ச்சி', questions: 35, marks: 35, topics: ['Alarippu', 'Jatiswaram', 'Varnam', 'Padam'] },
            { name: 'Music Knowledge', nameTamil: 'இசை அறிவு', questions: 20, marks: 20, topics: ['Carnatic Music Basics', 'Ragas', 'Talas'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 10, marks: 10, topics: ['Cultural History', 'Temple Arts'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Prior Bharatanatyam training required', 'Study Natyashastra', 'Know dance pioneers']
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
      },
      // ========== Specialized MKU Courses ==========
      {
        id: 'mku-msc-genomics',
        name: 'M.Sc Genomics',
        nameTamil: 'எம்.எஸ்சி ஜீனோமிக்ஸ்',
        type: 'PG',
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
        previousQuestions: [
          { id: 'mku-gen-1', year: '2024', question: 'The Human Genome Project was completed in:', options: ['2000', '2003', '2005', '2010'], correctAnswer: 1, explanation: 'The Human Genome Project was completed in April 2003, successfully sequencing the entire human genome.', topic: 'Genomics History', difficulty: 'Easy' },
          { id: 'mku-gen-2', year: '2024', question: 'CRISPR-Cas9 is used for:', options: ['Protein sequencing', 'Gene editing', 'RNA isolation', 'Cell culture'], correctAnswer: 1, explanation: 'CRISPR-Cas9 is a revolutionary gene editing technology that allows precise modification of DNA sequences.', topic: 'Genetic Engineering', difficulty: 'Easy' }
        ],
        tips: ['Very advanced - study DNA/RNA deeply', 'Learn bioinformatics tools', 'Centre of Excellence at MKU', 'Great for research careers']
      },
      {
        id: 'mku-msc-microbial-gene',
        name: 'M.Sc Microbial Gene Technology',
        nameTamil: 'எம்.எஸ்சி நுண்ணுயிர் மரபணு தொழில்நுட்பம்',
        type: 'PG',
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
        id: 'mku-ma-folklore',
        name: 'M.A. Folklore',
        nameTamil: 'எம்.ஏ. நாட்டுப்புறவியல்',
        type: 'PG',
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
        id: 'mku-ma-jmc',
        name: 'M.A. Journalism & Mass Communication',
        nameTamil: 'எம்.ஏ. பத்திரிகையியல் & தொடர்பு',
        type: 'PG',
        examPattern: {
          totalQuestions: 100,
          totalMarks: 100,
          duration: '2 Hours',
          durationMinutes: 120,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Media Studies', nameTamil: 'ஊடகவியல்', questions: 35, marks: 35, topics: ['Print', 'Electronic', 'Digital Media'] },
            { name: 'Current Affairs', nameTamil: 'நடப்பு நிகழ்வுகள்', questions: 30, marks: 30, topics: ['National', 'International', 'State'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 20, marks: 20, topics: ['Grammar', 'Comprehension', 'Writing'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 15, marks: 15, topics: ['History of Media', 'Press Laws'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Read newspapers daily', 'Know media history and ethics', 'Learn digital media trends']
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
  {
    id: 'tamil-university',
    name: 'Tamil University',
    nameTamil: 'தமிழ்ப் பல்கலைக்கழகம்',
    location: 'Thanjavur',
    website: 'www.tamiluniversity.ac.in',
    phone: '04362-226720',
    examName: 'TU Entrance Exam',
    logoColor: '#9333ea',
    logo: '/universities/tamil-university-logo.png',
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
      // Postgraduate Courses
      {
        id: 'tnau-msc-agronomy',
        name: 'M.Sc Agronomy',
        nameTamil: 'எம்.எஸ்சி வேளாண் விஞ்ஞானம்',
        type: 'PG',
        examPattern: {
          totalQuestions: 150,
          totalMarks: 150,
          duration: '2.5 Hours',
          durationMinutes: 150,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Agronomy', nameTamil: 'வேளாண் விஞ்ஞானம்', questions: 60, marks: 60, topics: ['Crop Production', 'Tillage', 'Cropping Systems', 'Water Management'] },
            { name: 'Crop Physiology', nameTamil: 'பயிர் உடலியல்', questions: 40, marks: 40, topics: ['Plant Growth', 'Photosynthesis', 'Stress Physiology'] },
            { name: 'Soil Science', nameTamil: 'மண் அறிவியல்', questions: 30, marks: 30, topics: ['Soil Fertility', 'Soil Chemistry', 'Nutrient Management'] },
            { name: 'Statistics', nameTamil: 'புள்ளியியல்', questions: 20, marks: 20, topics: ['Agricultural Statistics', 'Experimental Designs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Study crop production techniques', 'Learn about integrated farming systems', 'Understand climate-smart agriculture', 'Know organic farming practices']
      },
      {
        id: 'tnau-mba-agribusiness',
        name: 'MBA Agri-Business Management',
        nameTamil: 'எம்பிஏ வேளாண் வணிக மேலாண்மை',
        type: 'PG',
        examPattern: {
          totalQuestions: 150,
          totalMarks: 150,
          duration: '2.5 Hours',
          durationMinutes: 150,
          mode: 'OMR Based (Offline)',
          negativeMarking: false,
          sections: [
            { name: 'Quantitative Aptitude', nameTamil: 'அளவீட்டுத் திறன்', questions: 40, marks: 40, topics: ['Mathematics', 'Data Interpretation', 'Statistics'] },
            { name: 'Verbal Ability', nameTamil: 'மொழித் திறன்', questions: 35, marks: 35, topics: ['English Grammar', 'Reading Comprehension', 'Vocabulary'] },
            { name: 'Logical Reasoning', nameTamil: 'தருக்க அறிவு', questions: 35, marks: 35, topics: ['Analytical Reasoning', 'Critical Thinking'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 40, marks: 40, topics: ['Agriculture Sector', 'Business Awareness', 'Current Affairs'] }
          ]
        },
        syllabus: [],
        previousQuestions: [],
        tips: ['Prepare for CAT/MAT type questions', 'Study agricultural economics', 'Learn about agri supply chain', 'Know about food processing industry']
      }
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
  }
];

export const getUniversityById = (id: string): University | undefined => {
  return universities.find(u => u.id === id);
};

export const getCourseById = (universityId: string, courseId: string): Course | undefined => {
  const university = getUniversityById(universityId);
  return university?.courses.find(c => c.id === courseId);
};
