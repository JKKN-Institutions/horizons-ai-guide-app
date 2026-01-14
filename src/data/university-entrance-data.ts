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
            {
              name: 'Engineering Mathematics',
              nameTamil: 'பொறியியல் கணிதம்',
              questions: 20,
              marks: 20,
              topics: ['Matrices', 'Calculus', 'Differential Equations', 'Probability']
            },
            {
              name: 'Basic Engineering',
              nameTamil: 'அடிப்படை பொறியியல்',
              questions: 35,
              marks: 35,
              topics: ['Applied Mechanics', 'Engineering Physics', 'Engineering Chemistry']
            },
            {
              name: 'Subject Specialization',
              nameTamil: 'துறை சிறப்பு',
              questions: 45,
              marks: 45,
              topics: ['Based on branch - CSE/ECE/Mech/Civil/EEE']
            }
          ]
        },
        syllabus: [
          {
            unitNumber: 1,
            title: 'Engineering Mathematics',
            titleTamil: 'பொறியியல் கணிதம்',
            expectedQuestions: 20,
            difficulty: 'Medium',
            topics: [
              { name: 'Matrices & Determinants', subtopics: ['Eigenvalues', 'Eigenvectors', 'Matrix operations'], importance: 'High' },
              { name: 'Calculus', subtopics: ['Differentiation', 'Integration', 'Multiple integrals'], importance: 'High' },
              { name: 'Differential Equations', subtopics: ['First order', 'Higher order', 'PDE basics'], importance: 'High' },
              { name: 'Complex Variables', subtopics: ['Analytic functions', 'Contour integration'], importance: 'Medium' },
              { name: 'Probability & Statistics', subtopics: ['Distributions', 'Mean', 'Variance'], importance: 'Medium' },
              { name: 'Numerical Methods', subtopics: ['Newton-Raphson', 'Interpolation', 'Integration'], importance: 'Medium' }
            ]
          }
        ],
        previousQuestions: [
          {
            id: 'me-q1',
            question: 'The eigenvalues of matrix [[2,1],[1,2]] are:',
            options: ['1, 2', '1, 3', '2, 3', '0, 4'],
            correctAnswer: 1,
            explanation: 'det(A - λI) = 0. (2-λ)² - 1 = 0. λ² - 4λ + 3 = 0. λ = 1, 3',
            topic: 'Matrices',
            difficulty: 'Medium'
          },
          {
            id: 'me-q2',
            question: 'The Laplace transform of e^(at) is:',
            options: ['1/(s-a)', '1/(s+a)', 's/(s-a)', 'a/(s-a)'],
            correctAnswer: 0,
            explanation: 'L{e^(at)} = 1/(s-a) for s > a',
            topic: 'Laplace Transforms',
            difficulty: 'Easy'
          }
        ],
        tips: [
          'Engineering Mathematics is common for all branches',
          'Focus on your branch specialization (45 marks)',
          'Revise UG subjects thoroughly',
          'Practice numerical problems',
          'Time management is crucial'
        ]
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
          {
            id: 'cs-q1',
            question: 'Time complexity of Quick Sort in average case is:',
            options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
            correctAnswer: 1,
            explanation: 'Quick Sort has O(n log n) average case. Worst case is O(n²) when already sorted.',
            topic: 'Data Structures',
            difficulty: 'Easy'
          },
          {
            id: 'cs-q2',
            question: 'Which scheduling algorithm may cause starvation?',
            options: ['Round Robin', 'FCFS', 'Priority Scheduling', 'SJF'],
            correctAnswer: 2,
            explanation: 'Priority Scheduling can cause starvation of low priority processes.',
            topic: 'Operating Systems',
            difficulty: 'Medium'
          }
        ],
        tips: [
          'Programming section is most important - 25 questions',
          'Practice Data Structure problems',
          'Learn SQL queries thoroughly',
          'Understand OS concepts clearly',
          'Network protocols - memorize layers'
        ]
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
    fee: { general: 500, obc: 500, scst: 250 },
    importantDates: [
      { event: 'Notification', eventTamil: 'அறிவிப்பு', date: 'March-April 2026', status: 'upcoming' },
      { event: 'Application', eventTamil: 'விண்ணப்பம்', date: 'April-May 2026', status: 'upcoming' },
      { event: 'Exam', eventTamil: 'தேர்வு', date: 'May-June 2026', status: 'upcoming' },
      { event: 'Results', eventTamil: 'முடிவுகள்', date: 'June 2026', status: 'upcoming' }
    ],
    courses: []
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
    fee: { general: 500, obc: 500, scst: 250 },
    importantDates: [],
    courses: []
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
    importantDates: [],
    courses: []
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
    fee: { general: 500, obc: 500, scst: 250 },
    importantDates: [],
    courses: []
  }
];

export const getUniversityById = (id: string): University | undefined => {
  return universities.find(u => u.id === id);
};

export const getCourseById = (universityId: string, courseId: string): Course | undefined => {
  const university = getUniversityById(universityId);
  return university?.courses.find(c => c.id === courseId);
};
