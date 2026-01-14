import { Country, University } from './types';

export const countries: Country[] = [
  {
    id: 'usa',
    name: { en: 'United States', ta: 'அமெரிக்கா' },
    flag: '🇺🇸',
    universities: 5000,
    avgTuition: '$20,000 - $55,000/yr',
    avgLiving: '$15,000 - $25,000/yr',
    workHours: '20 hrs/week',
    prDuration: '3-5 years (OPT + H1B)',
    popularCourses: ['Computer Science', 'MBA', 'Data Science', 'Engineering', 'Medicine'],
    requirements: ['GRE/GMAT', 'TOEFL/IELTS', 'SOP', 'LORs', 'Transcripts'],
    topUniversities: ['MIT', 'Stanford', 'Harvard', 'UC Berkeley', 'CMU'],
    scholarships: ['Fulbright', 'Hubert Humphrey', 'University Merit'],
    gradient: 'from-blue-500 to-red-500'
  },
  {
    id: 'uk',
    name: { en: 'United Kingdom', ta: 'இங்கிலாந்து' },
    flag: '🇬🇧',
    universities: 160,
    avgTuition: '£12,000 - £35,000/yr',
    avgLiving: '£12,000 - £15,000/yr',
    workHours: '20 hrs/week',
    prDuration: '2 years Graduate Route',
    popularCourses: ['Business', 'Law', 'Medicine', 'Arts', 'Finance'],
    requirements: ['IELTS/PTE', 'SOP', 'LORs', 'Transcripts'],
    topUniversities: ['Oxford', 'Cambridge', 'Imperial College', 'UCL', 'LSE'],
    scholarships: ['Chevening', 'Commonwealth', 'GREAT Scholarships'],
    gradient: 'from-blue-600 to-red-600'
  },
  {
    id: 'canada',
    name: { en: 'Canada', ta: 'கனடா' },
    flag: '🇨🇦',
    universities: 100,
    avgTuition: 'CAD 15,000 - 35,000/yr',
    avgLiving: 'CAD 12,000 - 18,000/yr',
    workHours: '20 hrs/week',
    prDuration: '1-3 years PGWP → PR',
    popularCourses: ['IT', 'Business Analytics', 'Healthcare', 'Engineering', 'Hospitality'],
    requirements: ['IELTS/PTE', 'SOP', 'LORs', 'Transcripts', 'GIC'],
    topUniversities: ['U of Toronto', 'UBC', 'McGill', 'Waterloo', 'Alberta'],
    scholarships: ['Vanier CGS', 'Banting', 'Ontario Graduate'],
    gradient: 'from-red-500 to-white'
  },
  {
    id: 'australia',
    name: { en: 'Australia', ta: 'ஆஸ்திரேலியா' },
    flag: '🇦🇺',
    universities: 43,
    avgTuition: 'AUD 20,000 - 45,000/yr',
    avgLiving: 'AUD 21,000 - 25,000/yr',
    workHours: '48 hrs/fortnight',
    prDuration: '2-4 years (485 visa → PR)',
    popularCourses: ['Data Science', 'Nursing', 'Engineering', 'Accounting', 'IT'],
    requirements: ['IELTS/PTE', 'SOP', 'LORs', 'Transcripts', 'GTE'],
    topUniversities: ['Melbourne', 'Sydney', 'ANU', 'UNSW', 'Monash'],
    scholarships: ['Australia Awards', 'Destination Australia', 'Research Training'],
    gradient: 'from-blue-500 to-yellow-500'
  },
  {
    id: 'germany',
    name: { en: 'Germany', ta: 'ஜெர்மனி' },
    flag: '🇩🇪',
    universities: 400,
    avgTuition: '€0 - €3,000/yr (Public)',
    avgLiving: '€10,000 - €12,000/yr',
    workHours: '20 hrs/week',
    prDuration: '18 months Job Seeker → PR',
    popularCourses: ['Engineering', 'Automotive', 'AI/ML', 'Renewable Energy', 'Research'],
    requirements: ['German (B1/B2) or English', 'APS', 'Blocked Account'],
    topUniversities: ['TU Munich', 'RWTH Aachen', 'Heidelberg', 'LMU Munich', 'TU Berlin'],
    scholarships: ['DAAD', 'Erasmus Mundus', 'Heinrich Böll'],
    gradient: 'from-black to-yellow-500'
  },
  {
    id: 'ireland',
    name: { en: 'Ireland', ta: 'அயர்லாந்து' },
    flag: '🇮🇪',
    universities: 34,
    avgTuition: '€10,000 - €25,000/yr',
    avgLiving: '€10,000 - €15,000/yr',
    workHours: '20 hrs/week',
    prDuration: '2 years Stay Back → Stamp 4',
    popularCourses: ['Pharma', 'IT', 'Business', 'Data Analytics', 'Biotech'],
    requirements: ['IELTS/PTE', 'SOP', 'LORs', 'Transcripts'],
    topUniversities: ['Trinity College Dublin', 'UCD', 'NUI Galway', 'DCU', 'UCC'],
    scholarships: ['Government of Ireland', 'Science Foundation', 'University Scholarships'],
    gradient: 'from-green-500 to-orange-500'
  },
  {
    id: 'newzealand',
    name: { en: 'New Zealand', ta: 'நியூசிலாந்து' },
    flag: '🇳🇿',
    universities: 8,
    avgTuition: 'NZD 22,000 - 35,000/yr',
    avgLiving: 'NZD 15,000 - 20,000/yr',
    workHours: '20 hrs/week',
    prDuration: '1-3 years Post-Study Work',
    popularCourses: ['Agriculture', 'Tourism', 'Engineering', 'IT', 'Healthcare'],
    requirements: ['IELTS/PTE', 'SOP', 'LORs', 'Transcripts'],
    topUniversities: ['Auckland', 'Otago', 'Victoria Wellington', 'Canterbury', 'Massey'],
    scholarships: ['New Zealand Excellence', 'MFAT', 'University Scholarships'],
    gradient: 'from-blue-600 to-black'
  },
  {
    id: 'singapore',
    name: { en: 'Singapore', ta: 'சிங்கப்பூர்' },
    flag: '🇸🇬',
    universities: 6,
    avgTuition: 'SGD 15,000 - 50,000/yr',
    avgLiving: 'SGD 12,000 - 18,000/yr',
    workHours: '16 hrs/week',
    prDuration: 'Employment Pass → PR',
    popularCourses: ['Finance', 'Engineering', 'Business', 'Biotech', 'IT'],
    requirements: ['IELTS/TOEFL', 'SOP', 'LORs', 'Transcripts'],
    topUniversities: ['NUS', 'NTU', 'SMU', 'SUTD', 'SIT'],
    scholarships: ['A*STAR', 'MOE Tuition Grant', 'University Merit'],
    gradient: 'from-red-500 to-white'
  }
];

export const exams = [
  { name: 'IELTS', fullForm: 'International English Language Testing System', countries: 'UK, Australia, Canada, NZ', score: '6.5-7.5', icon: '📝', fee: '₹16,250', validity: '2 years' },
  { name: 'TOEFL', fullForm: 'Test of English as a Foreign Language', countries: 'USA, Canada', score: '90-110', icon: '📚', fee: '$185', validity: '2 years' },
  { name: 'PTE', fullForm: 'Pearson Test of English', countries: 'Australia, UK, NZ, Canada', score: '58-79', icon: '💻', fee: '₹15,900', validity: '2 years' },
  { name: 'GRE', fullForm: 'Graduate Record Examination', countries: 'USA, Canada, Germany', score: '310-330', icon: '🎯', fee: '$220', validity: '5 years' },
  { name: 'GMAT', fullForm: 'Graduate Management Admission Test', countries: 'USA, UK, Singapore', score: '650-750', icon: '📊', fee: '$275', validity: '5 years' },
  { name: 'SAT', fullForm: 'Scholastic Assessment Test', countries: 'USA (UG)', score: '1200-1600', icon: '✏️', fee: '$60', validity: '5 years' },
  { name: 'Duolingo', fullForm: 'Duolingo English Test', countries: 'USA, UK, Australia', score: '110-130', icon: '🦉', fee: '$59', validity: '2 years' },
];

export const applicationSteps = [
  { step: 1, title: 'Research', desc: 'Research countries, universities, and courses', duration: '2-3 months' },
  { step: 2, title: 'Exams', desc: 'Prepare and appear for IELTS/GRE/GMAT', duration: '3-4 months' },
  { step: 3, title: 'Documents', desc: 'Prepare SOP, LORs, transcripts, certificates', duration: '1-2 months' },
  { step: 4, title: 'Apply', desc: 'Submit applications to shortlisted universities', duration: '1-2 months' },
  { step: 5, title: 'Admit', desc: 'Receive admission offers and accept', duration: '2-4 months' },
  { step: 6, title: 'Visa', desc: 'Apply for student visa with required documents', duration: '1-2 months' },
  { step: 7, title: 'Travel', desc: 'Book tickets, find accommodation, depart', duration: '1 month' },
];

export const universities: University[] = [
  { id: '1', name: 'MIT', country: 'usa', ranking: 1, tuition: '$57,986', acceptance: '4%', scholarships: ['Merit', 'Need-based'], courses: ['CS', 'Engineering', 'Physics'] },
  { id: '2', name: 'Stanford University', country: 'usa', ranking: 3, tuition: '$56,169', acceptance: '4%', scholarships: ['Knight-Hennessy', 'Merit'], courses: ['CS', 'MBA', 'Medicine'] },
  { id: '3', name: 'University of Oxford', country: 'uk', ranking: 2, tuition: '£28,950', acceptance: '17%', scholarships: ['Rhodes', 'Clarendon'], courses: ['Law', 'PPE', 'Medicine'] },
  { id: '4', name: 'University of Cambridge', country: 'uk', ranking: 4, tuition: '£24,507', acceptance: '21%', scholarships: ['Gates Cambridge', 'Commonwealth'], courses: ['Engineering', 'Natural Sciences', 'Economics'] },
  { id: '5', name: 'University of Toronto', country: 'canada', ranking: 18, tuition: 'CAD 57,020', acceptance: '43%', scholarships: ['Lester B. Pearson', 'President\'s'], courses: ['Engineering', 'Computer Science', 'Medicine'] },
  { id: '6', name: 'University of Melbourne', country: 'australia', ranking: 14, tuition: 'AUD 46,560', acceptance: '70%', scholarships: ['Melbourne Chancellor\'s', 'Graduate Research'], courses: ['Medicine', 'Law', 'Engineering'] },
  { id: '7', name: 'TU Munich', country: 'germany', ranking: 30, tuition: '€0', acceptance: '8%', scholarships: ['DAAD', 'Deutschlandstipendium'], courses: ['Engineering', 'Computer Science', 'Physics'] },
  { id: '8', name: 'NUS Singapore', country: 'singapore', ranking: 8, tuition: 'SGD 38,050', acceptance: '6%', scholarships: ['ASEAN', 'Global Merit'], courses: ['Business', 'Computing', 'Engineering'] },
];

export const quizQuestions = [
  {
    id: 'budget',
    question: 'What is your annual budget for education?',
    options: [
      { value: 'low', label: 'Under ₹15 Lakhs', countries: ['germany', 'ireland'] },
      { value: 'medium', label: '₹15-30 Lakhs', countries: ['canada', 'australia', 'newzealand'] },
      { value: 'high', label: '₹30-50 Lakhs', countries: ['uk', 'singapore'] },
      { value: 'premium', label: 'Above ₹50 Lakhs', countries: ['usa'] },
    ]
  },
  {
    id: 'pr',
    question: 'Is permanent residency (PR) important to you?',
    options: [
      { value: 'very', label: 'Yes, very important', countries: ['canada', 'australia', 'newzealand', 'germany'] },
      { value: 'somewhat', label: 'Would be nice to have', countries: ['ireland', 'uk'] },
      { value: 'no', label: 'No, will return to India', countries: ['usa', 'singapore', 'uk'] },
    ]
  },
  {
    id: 'work',
    question: 'Do you want to work part-time while studying?',
    options: [
      { value: 'yes', label: 'Yes, essential', countries: ['australia', 'canada', 'ireland', 'newzealand'] },
      { value: 'maybe', label: 'If possible', countries: ['uk', 'germany', 'usa'] },
      { value: 'no', label: 'Not necessary', countries: ['singapore'] },
    ]
  },
  {
    id: 'field',
    question: 'What field do you want to study?',
    options: [
      { value: 'stem', label: 'STEM/Engineering', countries: ['usa', 'germany', 'canada', 'australia'] },
      { value: 'business', label: 'Business/MBA', countries: ['usa', 'uk', 'singapore'] },
      { value: 'healthcare', label: 'Healthcare/Medicine', countries: ['uk', 'australia', 'ireland'] },
      { value: 'arts', label: 'Arts/Humanities', countries: ['uk', 'canada', 'newzealand'] },
    ]
  },
  {
    id: 'weather',
    question: 'What climate do you prefer?',
    options: [
      { value: 'warm', label: 'Warm & Sunny', countries: ['australia', 'singapore'] },
      { value: 'moderate', label: 'Moderate', countries: ['uk', 'ireland', 'newzealand'] },
      { value: 'cold', label: 'Don\'t mind cold', countries: ['canada', 'germany'] },
      { value: 'any', label: 'Doesn\'t matter', countries: ['usa'] },
    ]
  },
];

export const documentChecklist = {
  common: [
    { id: 'passport', name: 'Valid Passport', required: true, description: 'Minimum 6 months validity beyond study period', tips: 'Apply early if renewal needed' },
    { id: 'transcripts', name: 'Academic Transcripts', required: true, description: 'All semesters with attestation', tips: 'Get extra attested copies' },
    { id: 'degree', name: 'Degree Certificate', required: true, description: 'Original degree or provisional', tips: 'Keep scanned copies handy' },
    { id: 'sop', name: 'Statement of Purpose', required: true, description: '500-1000 words explaining goals', tips: 'Customize for each university' },
    { id: 'lor', name: 'Letters of Recommendation', required: true, description: '2-3 letters from professors/employers', tips: 'Request 2 months in advance' },
    { id: 'resume', name: 'CV/Resume', required: true, description: 'Academic and professional achievements', tips: 'Use consistent formatting' },
    { id: 'photo', name: 'Passport Photos', required: true, description: 'White background, recent', tips: 'Different countries have different size requirements' },
    { id: 'english', name: 'English Score', required: true, description: 'IELTS/TOEFL/PTE score report', tips: 'Send official score to universities' },
  ],
  usa: [
    { id: 'gre', name: 'GRE/GMAT Score', required: false, description: 'For graduate programs', tips: 'Check if university requires it' },
    { id: 'i20', name: 'I-20 Form', required: true, description: 'Issued by university after admission', tips: 'Needed for visa application' },
    { id: 'financial', name: 'Financial Documents', required: true, description: 'Bank statements, loan sanction letter', tips: 'Show funds for first year' },
  ],
  uk: [
    { id: 'cas', name: 'CAS Letter', required: true, description: 'Confirmation of Acceptance for Studies', tips: 'Check reference number carefully' },
    { id: 'tb', name: 'TB Test Certificate', required: true, description: 'From approved clinic', tips: 'Valid for 6 months' },
  ],
  canada: [
    { id: 'gic', name: 'GIC Certificate', required: true, description: 'Guaranteed Investment Certificate', tips: 'CAD 20,635 minimum' },
    { id: 'medical', name: 'Medical Exam', required: true, description: 'From panel physician', tips: 'Book early during peak season' },
  ],
  australia: [
    { id: 'gte', name: 'GTE Statement', required: true, description: 'Genuine Temporary Entrant statement', tips: 'Explain study and return plans' },
    { id: 'coe', name: 'CoE', required: true, description: 'Confirmation of Enrolment', tips: 'Needed before visa lodgement' },
    { id: 'oshc', name: 'OSHC Insurance', required: true, description: 'Overseas Student Health Cover', tips: 'Must cover entire study duration' },
  ],
  germany: [
    { id: 'blocked', name: 'Blocked Account', required: true, description: '€11,208 minimum balance', tips: 'Use Expatrio or Deutsche Bank' },
    { id: 'aps', name: 'APS Certificate', required: true, description: 'Academic evaluation certificate', tips: 'Apply 2-3 months before visa' },
  ],
};

export const scholarships = [
  { name: 'Fulbright-Nehru', country: 'USA', amount: 'Full funding', deadline: 'February', eligibility: 'Indian citizens with 3+ years work experience' },
  { name: 'Chevening', country: 'UK', amount: 'Full funding', deadline: 'November', eligibility: '2+ years work experience, returning to India' },
  { name: 'DAAD', country: 'Germany', amount: '€934/month', deadline: 'Varies', eligibility: 'Bachelor\'s degree holders' },
  { name: 'Australia Awards', country: 'Australia', amount: 'Full funding', deadline: 'April', eligibility: 'Development focus areas' },
  { name: 'Vanier CGS', country: 'Canada', amount: 'CAD 50,000/year', deadline: 'November', eligibility: 'PhD students with leadership' },
  { name: 'Commonwealth', country: 'UK', amount: 'Full funding', deadline: 'December', eligibility: 'From developing countries' },
  { name: 'Erasmus Mundus', country: 'Europe', amount: 'Full funding', deadline: 'Varies', eligibility: 'Joint master\'s programs' },
  { name: 'A*STAR', country: 'Singapore', amount: 'Full funding', deadline: 'March', eligibility: 'STEM PhD candidates' },
];

export const sopTips = [
  { section: 'Introduction', tip: 'Start with a compelling hook - a personal story or moment that sparked your interest', dos: ['Be authentic', 'Show passion', 'Be specific'], donts: ['Use clichés', 'Be generic', 'Quote famous people'] },
  { section: 'Academic Background', tip: 'Highlight relevant coursework, projects, and achievements', dos: ['Mention specific courses', 'Describe research', 'Show grades if strong'], donts: ['List everything', 'Make excuses for low grades', 'Be vague'] },
  { section: 'Professional Experience', tip: 'Connect work experience to your field of study', dos: ['Quantify achievements', 'Show leadership', 'Highlight skills'], donts: ['Just list job duties', 'Include irrelevant jobs', 'Exaggerate'] },
  { section: 'Why This Program', tip: 'Show specific knowledge about the program, faculty, and research areas', dos: ['Mention specific faculty', 'Reference courses', 'Show fit'], donts: ['Copy university website', 'Be generic', 'Seem desperate'] },
  { section: 'Career Goals', tip: 'Show clear short-term and long-term goals and how the program helps', dos: ['Be realistic', 'Show impact', 'Connect to program'], donts: ['Be vague', 'Just say "get a job"', 'Ignore return plans'] },
  { section: 'Conclusion', tip: 'Summarize your fit and enthusiasm, end memorably', dos: ['Reiterate fit', 'Show gratitude', 'Be confident'], donts: ['Introduce new topics', 'Be repetitive', 'Beg for admission'] },
];

export const languageRequirements = {
  ielts: {
    academic: { listening: 6.0, reading: 6.0, writing: 5.5, speaking: 5.5, overall: 6.5 },
    topUniversities: { listening: 7.0, reading: 7.0, writing: 7.0, speaking: 7.0, overall: 7.5 },
  },
  toefl: {
    minimum: { reading: 18, listening: 17, speaking: 20, writing: 17, total: 80 },
    competitive: { reading: 24, listening: 24, speaking: 24, writing: 24, total: 100 },
  },
  pte: {
    minimum: { overall: 58 },
    competitive: { overall: 70 },
  },
};
