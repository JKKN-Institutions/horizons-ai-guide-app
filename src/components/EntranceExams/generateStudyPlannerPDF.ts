import jsPDF from 'jspdf';
import { EntranceExam } from './types';

interface StudyPhase {
  phase: string;
  duration: string;
  topics: string[];
  dailyHours: string;
  tips: string[];
}

interface ExamResources {
  youtubeChannels: { name: string; url: string; description: string }[];
  books: { title: string; author: string; purpose: string }[];
  websites: { name: string; url: string; description: string }[];
}

const getExamResources = (examId: string): ExamResources => {
  const resources: Record<string, ExamResources> = {
    'tnea': {
      youtubeChannels: [
        { name: 'Xylem TN', url: 'youtube.com/@XylemTN', description: 'TN State Board focused content' },
        { name: 'Learn with Tamil', url: 'youtube.com/@LearnwithTamil', description: '12th Maths & Science in Tamil' },
        { name: 'Kalvi TV', url: 'youtube.com/@KalviTV', description: 'Official TN Govt educational channel' }
      ],
      books: [
        { title: 'TN State Board Textbooks', author: 'TN Govt', purpose: 'Primary study material' },
        { title: 'Sura\'s 12th Guides', author: 'Sura Publications', purpose: 'Question bank & solutions' },
        { title: 'Perfect 12th Physics/Chemistry/Maths', author: 'Various', purpose: 'Practice problems' }
      ],
      websites: [
        { name: 'TNEA Official', url: 'tneaonline.org', description: 'Counseling portal' },
        { name: 'College Dunia', url: 'collegedunia.com/tnea', description: 'Cutoff analysis & college info' },
        { name: 'Shiksha', url: 'shiksha.com/tnea', description: 'College comparison & reviews' }
      ]
    },
    'jee-main': {
      youtubeChannels: [
        { name: 'Physics Wallah', url: 'youtube.com/@PhysicsWallah', description: 'Complete JEE preparation' },
        { name: 'Unacademy JEE', url: 'youtube.com/@UnacademyJEE', description: 'Expert faculty lectures' },
        { name: 'Mohit Tyagi', url: 'youtube.com/@MohitTyagi', description: 'Advanced Maths concepts' }
      ],
      books: [
        { title: 'HC Verma - Concepts of Physics', author: 'HC Verma', purpose: 'Physics fundamentals' },
        { title: 'RD Sharma Mathematics', author: 'RD Sharma', purpose: 'Maths practice' },
        { title: 'OP Tandon Organic Chemistry', author: 'OP Tandon', purpose: 'Organic chemistry' },
        { title: 'Cengage Series', author: 'G. Tewani', purpose: 'Advanced problem solving' }
      ],
      websites: [
        { name: 'NTA Official', url: 'nta.ac.in', description: 'Official exam portal' },
        { name: 'JEE Main NIC', url: 'jeemain.nta.nic.in', description: 'Registration & results' },
        { name: 'Embibe', url: 'embibe.com', description: 'Free mock tests & analysis' }
      ]
    },
    'neet': {
      youtubeChannels: [
        { name: 'Physics Wallah NEET', url: 'youtube.com/@PhysicsWallah', description: 'NEET-focused lectures' },
        { name: 'Unacademy NEET', url: 'youtube.com/@UnacademyNEET', description: 'Biology master classes' },
        { name: 'Dr. Sanjay Phogat', url: 'youtube.com/@DrSanjayPhogat', description: 'Biology diagrams & concepts' }
      ],
      books: [
        { title: 'NCERT Biology 11th & 12th', author: 'NCERT', purpose: 'Must-read for NEET' },
        { title: 'MTG Objective Biology', author: 'MTG', purpose: 'MCQ practice' },
        { title: 'Trueman\'s Biology', author: 'Trueman', purpose: 'Detailed explanations' },
        { title: 'DC Pandey Physics', author: 'DC Pandey', purpose: 'Physics for NEET' }
      ],
      websites: [
        { name: 'NTA NEET', url: 'neet.nta.nic.in', description: 'Official NEET portal' },
        { name: 'Allen NEET', url: 'allen.ac.in/neet', description: 'Free resources & tests' },
        { name: 'Aakash NEET', url: 'aakash.ac.in', description: 'Test series & notes' }
      ]
    },
    'viteee': {
      youtubeChannels: [
        { name: 'VIT Official', url: 'youtube.com/@VITUniversity', description: 'Official VIT content' },
        { name: 'Examly', url: 'youtube.com/@Examly', description: 'VITEEE preparation' },
        { name: 'Physics Wallah', url: 'youtube.com/@PhysicsWallah', description: 'Basics & concepts' }
      ],
      books: [
        { title: 'NCERT 11th & 12th', author: 'NCERT', purpose: 'Core concepts' },
        { title: 'Arihant VITEEE Guide', author: 'Arihant', purpose: 'Practice papers' },
        { title: 'MTG VITEEE Explorer', author: 'MTG', purpose: 'Previous year papers' }
      ],
      websites: [
        { name: 'VIT Official', url: 'vit.ac.in', description: 'Official VIT website' },
        { name: 'VITEEE Portal', url: 'viteee.vit.ac.in', description: 'Registration portal' },
        { name: 'Careers360', url: 'careers360.com/viteee', description: 'Cutoffs & analysis' }
      ]
    },
    'tnau': {
      youtubeChannels: [
        { name: 'TNAU Official', url: 'youtube.com/@TNAUofficial', description: 'University content' },
        { name: 'Agri Learner', url: 'youtube.com/@AgriLearner', description: 'Agriculture basics' },
        { name: 'Kalvi TV', url: 'youtube.com/@KalviTV', description: 'TN Board preparation' }
      ],
      books: [
        { title: 'TN 12th Biology', author: 'TN Govt', purpose: 'Primary textbook' },
        { title: 'TNAU UG Guide', author: 'Sura', purpose: 'Counseling preparation' },
        { title: 'Agriculture at a Glance', author: 'R. Barla', purpose: 'Quick revision' }
      ],
      websites: [
        { name: 'TNAU Official', url: 'tnau.ac.in', description: 'University website' },
        { name: 'TNAU Counseling', url: 'tnagriculture.in', description: 'Admission portal' },
        { name: 'Agriinfo', url: 'agriinfo.in', description: 'Agriculture news & info' }
      ]
    },
    'clat': {
      youtubeChannels: [
        { name: 'LegalEdge', url: 'youtube.com/@LegalEdge', description: 'CLAT preparation expert' },
        { name: 'Unacademy Law', url: 'youtube.com/@UnacademyLaw', description: 'Legal reasoning & GK' },
        { name: 'Law Prep Tutorial', url: 'youtube.com/@LawPrepTutorial', description: 'CLAT strategies' }
      ],
      books: [
        { title: 'Word Power Made Easy', author: 'Norman Lewis', purpose: 'Vocabulary building' },
        { title: 'Legal Aptitude for CLAT', author: 'AP Bhardwaj', purpose: 'Legal reasoning' },
        { title: 'Universal\'s CLAT Guide', author: 'Universal', purpose: 'Complete preparation' },
        { title: 'Manorama Yearbook', author: 'Manorama', purpose: 'Current affairs & GK' }
      ],
      websites: [
        { name: 'CLAT Consortium', url: 'consortiumofnlus.ac.in', description: 'Official CLAT portal' },
        { name: 'CLATapult', url: 'clatapult.com', description: 'Free mocks & resources' },
        { name: 'Legal Edge', url: 'toprankers.com/clat', description: 'Test series' }
      ]
    },
    'nda': {
      youtubeChannels: [
        { name: 'Defence Adda247', url: 'youtube.com/@DefenceAdda247', description: 'NDA preparation' },
        { name: 'MKC NDA', url: 'youtube.com/@MajorKalshiClasses', description: 'Defence exam expert' },
        { name: 'Unacademy Defence', url: 'youtube.com/@UnacademyDefence', description: 'Complete NDA course' }
      ],
      books: [
        { title: 'Pathfinder NDA', author: 'Arihant', purpose: 'Complete guide' },
        { title: 'RS Aggarwal Maths', author: 'RS Aggarwal', purpose: 'Maths practice' },
        { title: 'Lucent\'s GK', author: 'Lucent', purpose: 'General knowledge' },
        { title: 'Let\'s Crack SSB', author: 'Rajveer Singh', purpose: 'SSB interview prep' }
      ],
      websites: [
        { name: 'UPSC NDA', url: 'upsc.gov.in', description: 'Official UPSC portal' },
        { name: 'Join Indian Army', url: 'joinindianarmy.nic.in', description: 'Army recruitment' },
        { name: 'SSBCrack', url: 'ssbcrack.com', description: 'SSB preparation tips' }
      ]
    },
    'nift': {
      youtubeChannels: [
        { name: 'NIFT Prep', url: 'youtube.com/@NIFTPrep', description: 'NIFT exam strategies' },
        { name: 'Design Mentor', url: 'youtube.com/@DesignMentor', description: 'Creative ability tips' },
        { name: 'Sketch Art', url: 'youtube.com/@SketchArt', description: 'Drawing techniques' }
      ],
      books: [
        { title: 'Arihant NIFT Guide', author: 'Arihant', purpose: 'Complete preparation' },
        { title: 'Fashion Designing by B.P. Singh', author: 'B.P. Singh', purpose: 'Fashion fundamentals' },
        { title: 'Human Figure Drawing', author: 'Jack Hamm', purpose: 'Figure sketching' }
      ],
      websites: [
        { name: 'NIFT Official', url: 'nift.ac.in', description: 'Official NIFT website' },
        { name: 'NIFT Admissions', url: 'niftadmissions.in', description: 'Registration portal' },
        { name: 'Design Adda', url: 'designadda.in', description: 'Design resources' }
      ]
    }
  };

  return resources[examId] || getDefaultResources();
};

const getDefaultResources = (): ExamResources => ({
  youtubeChannels: [
    { name: 'Khan Academy', url: 'youtube.com/@khanacademy', description: 'Free educational content' },
    { name: 'Byju\'s', url: 'youtube.com/@BYJUS', description: 'Concept explanations' }
  ],
  books: [
    { title: 'NCERT Textbooks', author: 'NCERT', purpose: 'Foundation building' },
    { title: 'Previous Year Papers', author: 'Various', purpose: 'Exam pattern familiarity' }
  ],
  websites: [
    { name: 'Official Exam Website', url: 'Check exam notification', description: 'Registration & updates' }
  ]
});

const getStudyPlan = (examId: string): StudyPhase[] => {
  const studyPlans: Record<string, StudyPhase[]> = {
    'tnea': [
      {
        phase: 'Phase 1: Foundation (12th Board Focus)',
        duration: 'Aug - Feb (During 12th)',
        topics: ['Focus on 12th board exams', 'Master Physics, Chemistry, Maths', 'Solve NCERT thoroughly'],
        dailyHours: '3-4 hours',
        tips: ['Board marks = TNEA rank', 'No separate exam to prepare', 'Focus on scoring 95%+ in PCM']
      },
      {
        phase: 'Phase 2: Board Exam Prep',
        duration: 'Jan - March',
        topics: ['Previous year board papers', 'Important derivations', 'Numerical practice'],
        dailyHours: '6-8 hours',
        tips: ['Every mark counts for TNEA', 'Revise formulas daily', 'Attempt mock tests']
      },
      {
        phase: 'Phase 3: Counseling Prep',
        duration: 'May - July',
        topics: ['Research colleges & branches', 'Understand cutoff trends', 'Document preparation'],
        dailyHours: '2 hours',
        tips: ['List top 20 college choices', 'Check placement records', 'JKKN Engineering College is top choice']
      }
    ],
    'jee-main': [
      {
        phase: 'Phase 1: Concept Building',
        duration: '6 months before exam',
        topics: ['NCERT for basics', 'HC Verma for Physics', 'RD Sharma for Maths', 'NCERT Chemistry'],
        dailyHours: '4-5 hours',
        tips: ['Understand concepts deeply', 'Make formula sheets', 'Solve examples first']
      },
      {
        phase: 'Phase 2: Practice & Problem Solving',
        duration: '3 months before exam',
        topics: ['Previous year papers', 'Mock tests weekly', 'Focus on weak areas', 'JEE level problems'],
        dailyHours: '6-7 hours',
        tips: ['Time management practice', 'Analyze mistakes', 'Focus on high-weightage topics']
      },
      {
        phase: 'Phase 3: Revision & Mock Tests',
        duration: 'Last 1 month',
        topics: ['Full syllabus revision', 'Daily mock tests', 'Formula revision', 'Quick tips & tricks'],
        dailyHours: '8-10 hours',
        tips: ['Solve full papers in 3 hours', 'Don\'t learn new topics', 'Stay calm and confident']
      }
    ],
    'neet': [
      {
        phase: 'Phase 1: NCERT Mastery',
        duration: '6 months before exam',
        topics: ['NCERT Biology (11th & 12th)', 'NCERT Chemistry', 'NCERT Physics', 'Line by line reading'],
        dailyHours: '5-6 hours',
        tips: ['NCERT is Bible for NEET', 'Highlight important lines', 'Make chapter summaries']
      },
      {
        phase: 'Phase 2: Advanced Practice',
        duration: '3 months before exam',
        topics: ['MTG, Trueman for Biology', 'Previous 10 year papers', 'Topic-wise tests', 'Diagrams practice'],
        dailyHours: '7-8 hours',
        tips: ['Biology = 360 marks (Focus!)', 'Master human physiology', 'Learn all diagrams']
      },
      {
        phase: 'Phase 3: Intensive Revision',
        duration: 'Last 1 month',
        topics: ['NCERT re-reading', 'Mock tests every 2 days', 'Weak topic focus', 'Formula charts'],
        dailyHours: '10-12 hours',
        tips: ['Revise NCERT diagrams', 'Practice OMR filling', 'No negative marking panic']
      }
    ],
    'viteee': [
      {
        phase: 'Phase 1: Basics & NCERT',
        duration: '4 months before exam',
        topics: ['NCERT 11th & 12th', 'Basic concept clarity', 'Formula memorization'],
        dailyHours: '3-4 hours',
        tips: ['Easier than JEE', 'Focus on NCERT level', 'Aptitude section is easy']
      },
      {
        phase: 'Phase 2: Practice Phase',
        duration: '2 months before exam',
        topics: ['VITEEE previous papers', 'Online test practice', 'Speed improvement'],
        dailyHours: '4-5 hours',
        tips: ['Online exam practice', 'Time each section', 'English & Aptitude = bonus marks']
      },
      {
        phase: 'Phase 3: Final Prep',
        duration: 'Last 2 weeks',
        topics: ['Quick revision', 'Mock tests', 'Weak areas focus'],
        dailyHours: '5-6 hours',
        tips: ['Stay calm', 'Slot booking strategy', 'Early slots recommended']
      }
    ],
    'tnau': [
      {
        phase: 'Phase 1: Board Exam Focus',
        duration: 'Aug - Feb',
        topics: ['12th Biology - thorough', '12th Chemistry', '12th Physics/Maths', 'Practical exams'],
        dailyHours: '4-5 hours',
        tips: ['No separate exam!', 'Board marks = admission', 'Target 95%+ in PCB/PCM']
      },
      {
        phase: 'Phase 2: Board Preparation',
        duration: 'Jan - March',
        topics: ['Previous year papers', 'Important questions', 'Diagram practice', 'Lab records'],
        dailyHours: '6-8 hours',
        tips: ['Every mark counts', 'Focus on Biology', 'Practice diagrams']
      },
      {
        phase: 'Phase 3: Counseling Prep',
        duration: 'May - July',
        topics: ['Research TNAU courses', 'Know all campuses', 'Document preparation'],
        dailyHours: '2 hours',
        tips: ['Coimbatore main campus best', 'Horticulture is popular', 'JKKN College of Agri Science']
      }
    ],
    'clat': [
      {
        phase: 'Phase 1: Foundation',
        duration: '6 months before exam',
        topics: ['Legal Reasoning basics', 'English comprehension', 'Current affairs habit', 'Logical reasoning'],
        dailyHours: '3-4 hours',
        tips: ['Read The Hindu daily', 'Legal awareness from news', 'Build vocabulary']
      },
      {
        phase: 'Phase 2: Practice Phase',
        duration: '3 months before exam',
        topics: ['CLAT previous papers', 'Mock tests weekly', 'GK compilation', 'Reading speed improvement'],
        dailyHours: '5-6 hours',
        tips: ['Speed reading essential', 'Current affairs last 1 year', 'Legal GK important']
      },
      {
        phase: 'Phase 3: Final Sprint',
        duration: 'Last 1 month',
        topics: ['Daily mock tests', 'Current affairs revision', 'Weak section focus', 'Time management'],
        dailyHours: '6-8 hours',
        tips: ['150 questions in 2 hours', 'Accuracy over speed', 'TNNLU Trichy is target']
      }
    ],
    'nda': [
      {
        phase: 'Phase 1: Basics & Fitness',
        duration: '6 months before exam',
        topics: ['Maths (10+2 level)', 'General Ability basics', 'Physical fitness routine', 'English grammar'],
        dailyHours: '4 hours study + 2 hours fitness',
        tips: ['Start running daily', 'Push-ups, pull-ups practice', 'Current affairs habit']
      },
      {
        phase: 'Phase 2: Intensive Prep',
        duration: '3 months before exam',
        topics: ['Previous year papers', 'Mock tests', 'GK & History focus', 'Geography maps'],
        dailyHours: '5-6 hours + fitness',
        tips: ['Maths = 300 marks', 'GAT = 600 marks', 'Physical fitness crucial']
      },
      {
        phase: 'Phase 3: SSB Awareness',
        duration: 'Last 1 month',
        topics: ['Written exam focus', 'SSB interview prep start', 'Current affairs revision', 'Mock interviews'],
        dailyHours: '6-7 hours',
        tips: ['Confidence is key', 'Leadership qualities', 'Be genuine in SSB']
      }
    ],
    'nift': [
      {
        phase: 'Phase 1: Creative Development',
        duration: '6 months before exam',
        topics: ['Drawing & sketching daily', 'Color theory', 'Fashion awareness', 'Current design trends'],
        dailyHours: '3-4 hours',
        tips: ['Sketch daily', 'Follow fashion magazines', 'Visit exhibitions']
      },
      {
        phase: 'Phase 2: CAT & GAT Prep',
        duration: '3 months before exam',
        topics: ['Creative Ability Test practice', 'General Ability Test prep', 'Situation-based drawings', 'GK & English'],
        dailyHours: '4-5 hours',
        tips: ['Practice timed sketches', 'Color pencil techniques', 'Creativity matters most']
      },
      {
        phase: 'Phase 3: Situation Test',
        duration: 'Last 1 month',
        topics: ['Mock situation tests', 'Portfolio preparation', 'Interview prep', 'Design thinking'],
        dailyHours: '5-6 hours',
        tips: ['Think out of the box', 'Express uniquely', 'Chennai campus available!']
      }
    ]
  };

  return studyPlans[examId] || getDefaultStudyPlan();
};

const getDefaultStudyPlan = (): StudyPhase[] => [
  {
    phase: 'Phase 1: Foundation Building',
    duration: '4-6 months before exam',
    topics: ['Master basics from NCERT/textbooks', 'Understand syllabus thoroughly', 'Make notes & formula sheets'],
    dailyHours: '3-4 hours',
    tips: ['Consistency is key', 'Understand, don\'t memorize', 'Clear doubts immediately']
  },
  {
    phase: 'Phase 2: Practice & Strengthen',
    duration: '2-3 months before exam',
    topics: ['Previous year papers', 'Mock tests', 'Focus on weak areas'],
    dailyHours: '5-6 hours',
    tips: ['Analyze mistakes', 'Time management practice', 'Topic-wise tests']
  },
  {
    phase: 'Phase 3: Revision & Final Prep',
    duration: 'Last 1 month',
    topics: ['Complete revision', 'Daily mock tests', 'Formula revision'],
    dailyHours: '6-8 hours',
    tips: ['Stay calm', 'Sleep well', 'Believe in yourself']
  }
];

const getWeeklyChecklist = (examId: string): string[] => {
  const commonTasks = [
    '[ ] Complete daily study hours target',
    '[ ] Solve at least 20 practice problems',
    '[ ] Revise previous day\'s topics',
    '[ ] Make/update formula sheet',
    '[ ] Clear any pending doubts',
    '[ ] Take one timed test',
    '[ ] Analyze test performance',
    '[ ] Physical exercise (30 mins)',
    '[ ] Read current affairs (if applicable)',
    '[ ] Review week\'s progress'
  ];

  const examSpecific: Record<string, string[]> = {
    'neet': [
      '[ ] Read 2 NCERT chapters thoroughly',
      '[ ] Practice Biology diagrams',
      '[ ] Solve Chemistry numericals',
      '[ ] Physics formula revision'
    ],
    'jee-main': [
      '[ ] Solve JEE level problems',
      '[ ] Practice calculus daily',
      '[ ] Organic chemistry mechanisms',
      '[ ] Physics derivations practice'
    ],
    'clat': [
      '[ ] Read newspaper (The Hindu)',
      '[ ] Legal reasoning practice',
      '[ ] Vocabulary building',
      '[ ] Current affairs notes'
    ],
    'nda': [
      '[ ] Physical fitness training',
      '[ ] Maths problem solving',
      '[ ] History & Geography revision',
      '[ ] English grammar practice'
    ]
  };

  return [...(examSpecific[examId] || []), ...commonTasks];
};

export const generateStudyPlannerPDF = (exam: EntranceExam) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  let yPos = 20;

  // Header with gradient effect
  doc.setFillColor(46, 125, 50); // Green
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  doc.setFillColor(245, 158, 11); // Amber accent
  doc.rect(0, 42, pageWidth, 3, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(`${exam.name} Study Planner`, pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Preparation Guide for Tamil Nadu Students`, pageWidth / 2, 30, { align: 'center' });
  doc.text(`Exam Date: ${exam.importantDates.examDate}`, pageWidth / 2, 38, { align: 'center' });

  yPos = 55;

  // Exam Quick Info Box
  doc.setFillColor(232, 245, 233);
  doc.roundedRect(10, yPos, pageWidth - 20, 25, 3, 3, 'F');
  
  doc.setTextColor(27, 94, 32);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Quick Info:', 15, yPos + 8);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);
  const infoText = [
    `Duration: ${exam.duration}`,
    `Mode: ${exam.examMode}`,
    `Fee: ${exam.applicationFee.general}`,
    `Registration: ${exam.importantDates.registration}`
  ];
  doc.text(infoText.join('  |  '), 15, yPos + 18);

  yPos += 35;

  // Study Phases
  doc.setTextColor(27, 94, 32);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('PREPARATION TIMELINE', 15, yPos);
  yPos += 10;

  const studyPlan = getStudyPlan(exam.id);

  studyPlan.forEach((phase, index) => {
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }

    // Phase header
    doc.setFillColor(255, 248, 225);
    doc.roundedRect(10, yPos, pageWidth - 20, 10, 2, 2, 'F');
    
    doc.setTextColor(184, 134, 11);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${phase.phase}`, 15, yPos + 7);
    
    doc.setTextColor(107, 114, 128);
    doc.setFontSize(9);
    doc.text(`(${phase.duration})`, pageWidth - 15, yPos + 7, { align: 'right' });
    
    yPos += 15;

    // Daily hours
    doc.setTextColor(46, 125, 50);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Daily Study: ${phase.dailyHours}`, 15, yPos);
    yPos += 8;

    // Topics
    doc.setTextColor(55, 65, 81);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    phase.topics.forEach(topic => {
      doc.text(`• ${topic}`, 20, yPos);
      yPos += 5;
    });

    yPos += 3;

    // Tips
    doc.setTextColor(107, 114, 128);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    phase.tips.forEach(tip => {
      doc.text(`Tip: ${tip}`, 20, yPos);
      yPos += 5;
    });

    yPos += 8;
  });

  // Weekly Checklist
  if (yPos > pageHeight - 80) {
    doc.addPage();
    yPos = 20;
  }

  doc.setTextColor(27, 94, 32);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('WEEKLY CHECKLIST', 15, yPos);
  yPos += 10;

  const checklist = getWeeklyChecklist(exam.id);
  
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(10, yPos, pageWidth - 20, checklist.length * 6 + 10, 3, 3, 'F');
  yPos += 8;

  doc.setTextColor(55, 65, 81);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  checklist.forEach(item => {
    doc.text(item, 15, yPos);
    yPos += 6;
  });

  yPos += 10;

  // Important Dates Section
  if (yPos > pageHeight - 50) {
    doc.addPage();
    yPos = 20;
  }

  doc.setTextColor(27, 94, 32);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('IMPORTANT DATES 2025', 15, yPos);
  yPos += 10;

  doc.setFillColor(232, 245, 233);
  doc.roundedRect(10, yPos, pageWidth - 20, 25, 3, 3, 'F');
  yPos += 8;

  doc.setTextColor(55, 65, 81);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Registration Opens: ${exam.importantDates.registration}`, 15, yPos);
  yPos += 7;
  doc.text(`Exam Date: ${exam.importantDates.examDate}`, 15, yPos);
  yPos += 7;
  doc.text(`Result: ${exam.importantDates.resultDate}`, 15, yPos);

  yPos += 15;

  // Resources Section - New Page
  doc.addPage();
  yPos = 20;

  // Resources Header
  doc.setFillColor(46, 125, 50);
  doc.rect(0, 0, pageWidth, 30, 'F');
  doc.setFillColor(245, 158, 11);
  doc.rect(0, 27, pageWidth, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('STUDY RESOURCES', pageWidth / 2, 18, { align: 'center' });

  yPos = 40;

  const resources = getExamResources(exam.id);

  // YouTube Channels Section
  doc.setTextColor(220, 38, 38); // Red for YouTube
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('YOUTUBE CHANNELS', 15, yPos);
  yPos += 8;

  doc.setFillColor(254, 242, 242);
  const ytHeight = resources.youtubeChannels.length * 18 + 8;
  doc.roundedRect(10, yPos, pageWidth - 20, ytHeight, 3, 3, 'F');
  yPos += 8;

  resources.youtubeChannels.forEach((channel) => {
    doc.setTextColor(55, 65, 81);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(channel.name, 15, yPos);
    
    doc.setTextColor(107, 114, 128);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(channel.url, pageWidth - 15, yPos, { align: 'right' });
    yPos += 6;
    
    doc.setTextColor(75, 85, 99);
    doc.setFontSize(9);
    doc.text(`  - ${channel.description}`, 15, yPos);
    yPos += 12;
  });

  yPos += 10;

  // Books Section
  doc.setTextColor(124, 58, 237); // Purple for books
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('RECOMMENDED BOOKS', 15, yPos);
  yPos += 8;

  doc.setFillColor(245, 243, 255);
  const booksHeight = resources.books.length * 18 + 8;
  doc.roundedRect(10, yPos, pageWidth - 20, booksHeight, 3, 3, 'F');
  yPos += 8;

  resources.books.forEach((book) => {
    doc.setTextColor(55, 65, 81);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(book.title, 15, yPos);
    
    doc.setTextColor(107, 114, 128);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.text(`by ${book.author}`, pageWidth - 15, yPos, { align: 'right' });
    yPos += 6;
    
    doc.setTextColor(75, 85, 99);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`  Purpose: ${book.purpose}`, 15, yPos);
    yPos += 12;
  });

  yPos += 10;

  // Check if we need a new page for websites
  if (yPos > pageHeight - 80) {
    doc.addPage();
    yPos = 20;
  }

  // Websites Section
  doc.setTextColor(37, 99, 235); // Blue for websites
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('USEFUL WEBSITES', 15, yPos);
  yPos += 8;

  doc.setFillColor(239, 246, 255);
  const webHeight = resources.websites.length * 18 + 8;
  doc.roundedRect(10, yPos, pageWidth - 20, webHeight, 3, 3, 'F');
  yPos += 8;

  resources.websites.forEach((website) => {
    doc.setTextColor(55, 65, 81);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(website.name, 15, yPos);
    
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(website.url, pageWidth - 15, yPos, { align: 'right' });
    yPos += 6;
    
    doc.setTextColor(75, 85, 99);
    doc.setFontSize(9);
    doc.text(`  - ${website.description}`, 15, yPos);
    yPos += 12;
  });

  yPos += 15;

  // Pro Tips Box
  doc.setFillColor(255, 251, 235);
  doc.roundedRect(10, yPos, pageWidth - 20, 35, 3, 3, 'F');
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.5);
  doc.roundedRect(10, yPos, pageWidth - 20, 35, 3, 3, 'S');
  
  doc.setTextColor(180, 83, 9);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('PRO TIPS', 15, yPos + 10);
  
  doc.setTextColor(75, 85, 99);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('* Subscribe to YouTube channels and turn on notifications for new content', 15, yPos + 18);
  doc.text('* Buy second-hand books from seniors to save money', 15, yPos + 25);
  doc.text('* Bookmark official websites and check regularly for updates', 15, yPos + 32);

  // Footer
  const addFooter = (pageNum: number) => {
    doc.setFillColor(245, 158, 11);
    doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated by JKKN Career Guide | ${exam.officialWebsite}`, pageWidth / 2, pageHeight - 7, { align: 'center' });
    doc.text(`Page ${pageNum}`, pageWidth - 15, pageHeight - 7, { align: 'right' });
  };

  // Add footer to all pages
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(i);
  }

  // Save the PDF
  doc.save(`${exam.id}-study-planner-2025.pdf`);
};
