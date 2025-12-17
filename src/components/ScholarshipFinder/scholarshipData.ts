import { Scholarship } from './types';

export const scholarships: Scholarship[] = [
  // JKKN EXCLUSIVE SCHOLARSHIPS
  {
    id: 'jkkn-merit',
    name: 'JKKN Merit Scholarship',
    provider: 'JKKN Educational Institutions',
    type: 'jkkn',
    amount: '25% - 100% Tuition Waiver',
    eligibility: ['12th Marks > 85%', 'All JKKN Courses'],
    deadline: 'Always Open',
    deadlineStatus: 'always-open',
    educationLevel: ['12th-passed', 'ug'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Merit-based scholarship for high-performing students joining JKKN institutions with 25% to 100% tuition fee waiver based on academic performance.',
    applicationUrl: 'https://jkkn.ac.in/scholarships',
    helpline: '04286-266266',
    documents: ['12th Marksheet', 'Community Certificate', 'Income Certificate', 'Aadhaar Card', 'Passport Photo'],
    howToApply: [
      'Visit JKKN admission office or website',
      'Fill scholarship application form',
      'Submit academic documents',
      'Attend merit verification',
      'Receive scholarship confirmation'
    ],
    benefits: [
      { label: 'Tuition Fee Waiver', value: '25% - 100%' },
      { label: 'Eligibility', value: '85%+ in 12th' },
      { label: 'Courses', value: 'All JKKN Programs' }
    ]
  },
  {
    id: 'jkkn-sports',
    name: 'JKKN Sports Excellence Scholarship',
    provider: 'JKKN Educational Institutions',
    type: 'jkkn',
    amount: '50% - 100% Tuition Waiver',
    eligibility: ['State/National Level Players', 'All JKKN Courses'],
    deadline: 'Always Open',
    deadlineStatus: 'always-open',
    educationLevel: ['12th-passed', 'ug', 'pg'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Special scholarship for students with excellence in sports at state or national level competing in recognized sports events.',
    applicationUrl: 'https://jkkn.ac.in/sports-scholarship',
    helpline: '04286-266266',
    documents: ['Sports Certificates', 'Medal/Trophy Copies', '12th Marksheet', 'Aadhaar Card', 'Photo'],
    howToApply: [
      'Submit sports achievements proof',
      'Fill sports scholarship form',
      'Undergo sports trial if required',
      'Verification of certificates',
      'Scholarship approval'
    ],
    benefits: [
      { label: 'Tuition Waiver', value: '50% - 100%' },
      { label: 'Requirement', value: 'State/National Level' },
      { label: 'Sports Kit', value: 'Provided' }
    ]
  },
  {
    id: 'jkkn-girls',
    name: 'JKKN Girls Education Grant',
    provider: 'JKKN Educational Institutions',
    type: 'jkkn',
    amount: 'Up to ₹50,000 per year',
    eligibility: ['Female Students', 'Income < ₹3 Lakh'],
    deadline: 'Always Open',
    deadlineStatus: 'always-open',
    educationLevel: ['12th-passed', 'ug'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    incomeLimit: '3',
    gender: 'female',
    state: 'Tamil Nadu',
    description: 'Special financial grant for girl students to promote women education and empowerment.',
    applicationUrl: 'https://jkkn.ac.in/girls-grant',
    helpline: '04286-266266',
    documents: ['Income Certificate', 'Aadhaar Card', '12th Marksheet', 'Community Certificate', 'Bank Passbook'],
    howToApply: [
      'Apply during admission process',
      'Submit income proof',
      'Document verification',
      'Grant approval notification',
      'Amount credited to fee account'
    ],
    benefits: [
      { label: 'Annual Grant', value: 'Up to ₹50,000' },
      { label: 'Income Limit', value: '< ₹3 Lakh' },
      { label: 'For', value: 'Female Students' }
    ]
  },
  {
    id: 'jkkn-rural',
    name: 'JKKN Rural Student Support',
    provider: 'JKKN Educational Institutions',
    type: 'jkkn',
    amount: 'Up to ₹30,000 per year',
    eligibility: ['Rural Background', 'Government School Students'],
    deadline: 'Always Open',
    deadlineStatus: 'always-open',
    educationLevel: ['12th-passed', 'ug'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Financial support for students from rural areas and government schools to pursue higher education.',
    applicationUrl: 'https://jkkn.ac.in/rural-support',
    helpline: '04286-266266',
    documents: ['Rural Certificate', 'School TC', 'Income Certificate', 'Aadhaar Card'],
    howToApply: [
      'Submit rural area proof',
      'Government school certificate',
      'Income verification',
      'Approval and disbursement'
    ],
    benefits: [
      { label: 'Annual Support', value: 'Up to ₹30,000' },
      { label: 'Background', value: 'Rural Areas' },
      { label: 'School Type', value: 'Government' }
    ]
  },
  {
    id: 'jkkn-first-graduate',
    name: 'JKKN First Graduate Award',
    provider: 'JKKN Educational Institutions',
    type: 'jkkn',
    amount: 'Up to ₹25,000 per year',
    eligibility: ['First in Family to Graduate', 'Income < ₹2 Lakh'],
    deadline: 'Always Open',
    deadlineStatus: 'always-open',
    educationLevel: ['12th-passed', 'ug'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    incomeLimit: '2',
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Special award for students who are the first in their family to pursue a graduate degree.',
    applicationUrl: 'https://jkkn.ac.in/first-graduate',
    helpline: '04286-266266',
    documents: ['Parent Education Declaration', 'Income Certificate', 'Aadhaar Card', '12th Marksheet'],
    howToApply: [
      'Submit first graduate declaration',
      'Parent education affidavit',
      'Income verification',
      'Award approval'
    ],
    benefits: [
      { label: 'Annual Award', value: 'Up to ₹25,000' },
      { label: 'Income Limit', value: '< ₹2 Lakh' },
      { label: 'Criteria', value: 'First Graduate' }
    ]
  },
  {
    id: 'jkkn-financial',
    name: 'JKKN Financial Assistance',
    provider: 'JKKN Educational Institutions',
    type: 'jkkn',
    amount: 'Need-based Support',
    eligibility: ['Economically Weak Students', 'Good Academic Record'],
    deadline: 'Always Open',
    deadlineStatus: 'always-open',
    educationLevel: ['12th-passed', 'ug', 'pg'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Need-based financial assistance for economically weak students with good academic potential.',
    applicationUrl: 'https://jkkn.ac.in/financial-aid',
    helpline: '04286-266266',
    documents: ['Income Certificate', 'Bank Statement', 'Family Background Declaration', 'Academic Records'],
    howToApply: [
      'Apply with financial need proof',
      'Academic record submission',
      'Interview if required',
      'Assistance approval'
    ],
    benefits: [
      { label: 'Support Type', value: 'Need-based' },
      { label: 'Criteria', value: 'Financial Need' },
      { label: 'Academic', value: 'Good Record' }
    ]
  },

  // TAMIL NADU GOVERNMENT SCHOLARSHIPS
  {
    id: 'tn-post-matric-sc-st',
    name: 'Post Matric Scholarship for SC/ST',
    provider: 'Ministry of Social Justice & Empowerment',
    type: 'government',
    amount: 'Up to ₹35,000/year',
    eligibility: ['SC/ST Category', 'Income < ₹2.5 Lakh', 'TN Domicile'],
    deadline: 'Dec 31, 2025',
    deadlineStatus: 'closing-soon',
    educationLevel: ['12th-studying', '12th-passed', 'ug', 'pg', 'diploma', 'professional'],
    category: ['sc', 'st'],
    incomeLimit: '2.5',
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Government scholarship for SC/ST students pursuing post-matric education including maintenance allowance, tuition fee and book grant.',
    applicationUrl: 'https://scholarships.gov.in',
    helpline: '1800-121-3513',
    documents: ['Community/Caste Certificate', 'Income Certificate', 'Aadhaar Card', '10th & 12th Marksheets', 'College Admission Letter', 'Bank Passbook', 'Passport Photo'],
    howToApply: [
      'Visit National Scholarship Portal (scholarships.gov.in)',
      'Register with valid Mobile Number & Email',
      'Complete the Application Form',
      'Upload all Required Documents',
      'Submit & Note your Application ID',
      'Track status on portal'
    ],
    benefits: [
      { label: 'Maintenance Allowance', value: '₹550 - ₹1,200/month' },
      { label: 'Tuition Fee', value: 'Full Reimbursement' },
      { label: 'Book Grant', value: '₹1,500/year' }
    ]
  },
  {
    id: 'tn-post-matric-obc',
    name: 'Post Matric Scholarship for OBC',
    provider: 'Tamil Nadu Government',
    type: 'government',
    amount: 'Up to ₹25,000/year',
    eligibility: ['OBC Category', 'Income < ₹2 Lakh', 'TN Domicile'],
    deadline: 'Dec 31, 2025',
    deadlineStatus: 'closing-soon',
    educationLevel: ['12th-studying', '12th-passed', 'ug', 'pg', 'diploma'],
    category: ['obc'],
    incomeLimit: '2',
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'State government scholarship for OBC students pursuing higher education after 10th standard.',
    applicationUrl: 'https://scholarships.gov.in',
    helpline: '1800-121-3513',
    documents: ['OBC Certificate', 'Income Certificate', 'Aadhaar Card', 'Marksheets', 'Bank Passbook'],
    howToApply: [
      'Apply on National Scholarship Portal',
      'Fill application form',
      'Upload documents',
      'Institute verification',
      'Amount disbursement'
    ],
    benefits: [
      { label: 'Annual Scholarship', value: 'Up to ₹25,000' },
      { label: 'Income Limit', value: '< ₹2 Lakh' },
      { label: 'Category', value: 'OBC Students' }
    ]
  },
  {
    id: 'tn-bc-mbc-welfare',
    name: 'BC/MBC Welfare Scholarship',
    provider: 'BC/MBC Welfare Department, TN',
    type: 'government',
    amount: 'Up to ₹20,000/year',
    eligibility: ['BC/MBC Category', 'Income < ₹2 Lakh', 'TN Domicile'],
    deadline: 'Dec 31, 2025',
    deadlineStatus: 'closing-soon',
    educationLevel: ['12th-passed', 'ug', 'pg', 'diploma', 'professional'],
    category: ['bc-mbc'],
    incomeLimit: '2',
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Welfare scholarship for BC/MBC students to support their higher education expenses.',
    applicationUrl: 'https://bcmbcmw.tn.gov.in',
    helpline: '044-25670065',
    documents: ['BC/MBC Certificate', 'Income Certificate', 'Aadhaar Card', 'Marksheets', 'Bank Details'],
    howToApply: [
      'Apply through BC/MBC Welfare Portal',
      'Submit required certificates',
      'College verification',
      'Department approval',
      'Scholarship disbursement'
    ],
    benefits: [
      { label: 'Annual Amount', value: 'Up to ₹20,000' },
      { label: 'Income Criteria', value: '< ₹2 Lakh' },
      { label: 'Renewable', value: 'Yearly' }
    ]
  },
  {
    id: 'tn-first-graduate',
    name: 'First Graduate Scholarship',
    provider: 'Tamil Nadu Government',
    type: 'government',
    amount: 'Up to ₹10,000/year',
    eligibility: ['First in Family', 'Income < ₹2 Lakh', 'UG Students'],
    deadline: 'Jan 15, 2026',
    deadlineStatus: 'one-month',
    educationLevel: ['ug'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    incomeLimit: '2',
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Special scholarship for students who are the first generation graduates in their family.',
    applicationUrl: 'https://scholarships.gov.in',
    helpline: '1800-121-3513',
    documents: ['Parent Education Declaration', 'Income Certificate', 'College Bonafide', 'Aadhaar Card'],
    howToApply: [
      'Apply on scholarship portal',
      'Submit first graduate declaration',
      'Income verification',
      'College attestation',
      'Receive scholarship'
    ],
    benefits: [
      { label: 'Annual Grant', value: 'Up to ₹10,000' },
      { label: 'Criteria', value: 'First in Family' },
      { label: 'For', value: 'UG Students' }
    ]
  },
  {
    id: 'tn-cm-scheme',
    name: "Chief Minister's Higher Education Scheme",
    provider: 'Tamil Nadu Government',
    type: 'government',
    amount: '₹12,000/year',
    eligibility: ['Government School Students', 'Income < ₹2.5 Lakh', 'UG Students'],
    deadline: 'Jan 31, 2026',
    deadlineStatus: 'open',
    educationLevel: ['ug'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    incomeLimit: '2.5',
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Scholarship for students from government schools pursuing undergraduate education.',
    applicationUrl: 'https://scholarships.gov.in',
    helpline: '1800-121-3513',
    documents: ['School TC', 'Income Certificate', 'College Admission', 'Aadhaar Card', 'Bank Details'],
    howToApply: [
      'Apply through scholarship portal',
      'Submit government school proof',
      'Income verification',
      'College verification',
      'Amount credited to bank'
    ],
    benefits: [
      { label: 'Annual Amount', value: '₹12,000' },
      { label: 'From', value: 'Govt Schools' },
      { label: 'For', value: 'UG Studies' }
    ]
  },
  {
    id: 'tn-minority',
    name: 'Minority Welfare Scholarship',
    provider: 'Minority Welfare Department, TN',
    type: 'government',
    amount: 'Up to ₹15,000/year',
    eligibility: ['Minority Community', 'Income < ₹2 Lakh', 'TN Domicile'],
    deadline: 'Feb 15, 2026',
    deadlineStatus: 'open',
    educationLevel: ['12th-passed', 'ug', 'pg', 'diploma'],
    category: ['minority'],
    incomeLimit: '2',
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Scholarship for students belonging to minority communities pursuing higher education.',
    applicationUrl: 'https://scholarships.gov.in',
    helpline: '1800-121-3513',
    documents: ['Minority Certificate', 'Income Certificate', 'Aadhaar Card', 'College Bonafide', 'Bank Details'],
    howToApply: [
      'Apply on NSP portal',
      'Submit minority proof',
      'Income verification',
      'College attestation',
      'Scholarship disbursement'
    ],
    benefits: [
      { label: 'Annual Amount', value: 'Up to ₹15,000' },
      { label: 'Income Limit', value: '< ₹2 Lakh' },
      { label: 'Community', value: 'Minority' }
    ]
  },
  {
    id: 'tn-moovalur',
    name: 'Moovalur Ramamirtham Scheme (Girls)',
    provider: 'Tamil Nadu Government',
    type: 'government',
    amount: '₹1,000/month',
    eligibility: ['Female Students', 'Government School', 'UG Studies'],
    deadline: 'Mar 1, 2026',
    deadlineStatus: 'open',
    educationLevel: ['ug'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    gender: 'female',
    state: 'Tamil Nadu',
    description: 'Monthly financial support for girl students from government schools pursuing graduation.',
    applicationUrl: 'https://scholarships.gov.in',
    helpline: '044-25361520',
    documents: ['School TC', 'College Admission', 'Aadhaar Card', 'Bank Account', 'Photo'],
    howToApply: [
      'Apply through college',
      'Submit government school TC',
      'Bank account verification',
      'Monthly disbursement starts'
    ],
    benefits: [
      { label: 'Monthly Amount', value: '₹1,000' },
      { label: 'Annual Total', value: '₹12,000' },
      { label: 'For', value: 'Girl Students' }
    ]
  },

  // CENTRAL GOVERNMENT SCHOLARSHIPS
  {
    id: 'nmms',
    name: 'National Merit Scholarship (NMMS)',
    provider: 'Ministry of Education, Govt of India',
    type: 'government',
    amount: '₹12,000/year',
    eligibility: ['Class 9-12 Students', 'Merit Based', 'Income < ₹3.5 Lakh'],
    deadline: 'Nov 30, 2025',
    deadlineStatus: 'closing-soon',
    educationLevel: ['12th-studying'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    incomeLimit: '3.5',
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'National level merit scholarship for meritorious students from economically weaker sections.',
    applicationUrl: 'https://scholarships.gov.in',
    helpline: '1800-121-3513',
    documents: ['Income Certificate', 'Marksheets', 'Aadhaar Card', 'School Bonafide', 'Bank Details'],
    howToApply: [
      'Clear NMMS selection test',
      'Apply through NSP',
      'Submit documents',
      'State verification',
      'Scholarship awarded'
    ],
    benefits: [
      { label: 'Annual Amount', value: '₹12,000' },
      { label: 'Duration', value: 'Class 9-12' },
      { label: 'Selection', value: 'Merit Test' }
    ]
  },
  {
    id: 'central-sector',
    name: 'Central Sector Scholarship',
    provider: 'Ministry of Education, Govt of India',
    type: 'government',
    amount: '₹10,000 - ₹20,000/year',
    eligibility: ['Top 20% in Board Exam', 'Income < ₹8 Lakh', 'UG/PG Students'],
    deadline: 'Dec 31, 2025',
    deadlineStatus: 'closing-soon',
    educationLevel: ['ug', 'pg'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    incomeLimit: '8',
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Central scholarship for students in top 20 percentile of board exam pursuing regular college courses.',
    applicationUrl: 'https://scholarships.gov.in',
    helpline: '1800-121-3513',
    documents: ['12th Marksheet', 'Income Certificate', 'College Admission', 'Aadhaar Card', 'Bank Details'],
    howToApply: [
      'Apply on NSP after 12th results',
      'Upload 12th marksheet',
      'Income verification',
      'College verification',
      'Merit-based selection'
    ],
    benefits: [
      { label: 'UG Amount', value: '₹10,000/year' },
      { label: 'PG Amount', value: '₹20,000/year' },
      { label: 'Duration', value: 'Course Duration' }
    ]
  },
  {
    id: 'aicte-pragati',
    name: 'AICTE Pragati Scholarship (Girls in Tech)',
    provider: 'AICTE',
    type: 'government',
    amount: '₹50,000/year',
    eligibility: ['Female Students', 'Technical/Engineering', 'Income < ₹8 Lakh'],
    deadline: 'Dec 31, 2025',
    deadlineStatus: 'closing-soon',
    educationLevel: ['ug', 'diploma', 'professional'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    incomeLimit: '8',
    gender: 'female',
    state: 'Tamil Nadu',
    description: 'Scholarship to promote girls education in technical courses including engineering and polytechnic.',
    applicationUrl: 'https://scholarships.gov.in',
    helpline: '011-29581000',
    documents: ['12th Marksheet', 'Income Certificate', 'AICTE College Admission', 'Aadhaar Card', 'Bank Details'],
    howToApply: [
      'Apply through NSP',
      'Select AICTE Pragati scheme',
      'Upload documents',
      'Institute verification',
      'AICTE approval'
    ],
    benefits: [
      { label: 'Annual Amount', value: '₹50,000' },
      { label: 'For', value: 'Girls in Tech' },
      { label: 'Courses', value: 'Engineering/Diploma' }
    ]
  },
  {
    id: 'aicte-saksham',
    name: 'AICTE Saksham Scholarship (Disabled)',
    provider: 'AICTE',
    type: 'government',
    amount: '₹50,000/year',
    eligibility: ['Differently Abled (40%+)', 'Technical Courses', 'Income < ₹8 Lakh'],
    deadline: 'Dec 31, 2025',
    deadlineStatus: 'closing-soon',
    educationLevel: ['ug', 'diploma', 'professional'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    incomeLimit: '8',
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Scholarship for differently abled students pursuing technical education.',
    applicationUrl: 'https://scholarships.gov.in',
    helpline: '011-29581000',
    documents: ['Disability Certificate (40%+)', 'Income Certificate', 'College Admission', 'Aadhaar Card'],
    howToApply: [
      'Apply through NSP',
      'Submit disability certificate',
      'Income verification',
      'Institute verification',
      'Scholarship approval'
    ],
    benefits: [
      { label: 'Annual Amount', value: '₹50,000' },
      { label: 'Disability', value: '40%+ Required' },
      { label: 'Courses', value: 'Technical' }
    ]
  },
  {
    id: 'inspire',
    name: 'INSPIRE Scholarship (Science)',
    provider: 'Department of Science & Technology',
    type: 'government',
    amount: '₹80,000/year',
    eligibility: ['Top 1% in Board', 'Science/Research', 'BSc/BS/Int MSc'],
    deadline: 'Oct 31, 2025',
    deadlineStatus: 'closing-soon',
    educationLevel: ['ug'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Prestigious scholarship for students in top 1% pursuing natural and basic science courses.',
    applicationUrl: 'https://online-inspire.gov.in',
    helpline: '011-26590369',
    documents: ['12th Marksheet (Top 1%)', 'Science Course Admission', 'Aadhaar Card', 'Bank Details'],
    howToApply: [
      'Apply on INSPIRE portal',
      'Submit board exam proof',
      'Science college admission',
      'DST verification',
      'Scholarship award'
    ],
    benefits: [
      { label: 'Annual Amount', value: '₹80,000' },
      { label: 'Summer Project', value: '₹20,000' },
      { label: 'Eligibility', value: 'Top 1%' }
    ]
  },

  // CORPORATE SCHOLARSHIPS
  {
    id: 'hdfc-crisis',
    name: 'HDFC Educational Crisis Scholarship',
    provider: 'HDFC Ltd',
    type: 'corporate',
    amount: 'Up to ₹75,000',
    eligibility: ['Income < ₹6 Lakh', 'School/UG Students', 'Financial Crisis'],
    deadline: 'Jan 31, 2026',
    deadlineStatus: 'open',
    educationLevel: ['12th-studying', 'ug'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    incomeLimit: '6',
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Financial support for students facing educational crisis due to family financial difficulties.',
    applicationUrl: 'https://www.buddy4study.com/page/hdfc-ltd-educational-crisis-scholarship-program',
    helpline: '011-430-92248',
    documents: ['Income Proof', 'Crisis Documentation', 'Admission Proof', 'Aadhaar Card', 'Bank Details'],
    howToApply: [
      'Apply on Buddy4Study',
      'Document financial crisis',
      'Submit income proof',
      'Verification process',
      'Scholarship approval'
    ],
    benefits: [
      { label: 'Maximum Amount', value: '₹75,000' },
      { label: 'Income Limit', value: '< ₹6 Lakh' },
      { label: 'Purpose', value: 'Crisis Support' }
    ]
  },
  {
    id: 'tata-trusts',
    name: 'Tata Trusts Scholarship',
    provider: 'Tata Trusts',
    type: 'corporate',
    amount: 'Up to ₹50,000',
    eligibility: ['Income < ₹4 Lakh', 'UG/PG Students', 'Merit Based'],
    deadline: 'Feb 15, 2026',
    deadlineStatus: 'open',
    educationLevel: ['ug', 'pg'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    incomeLimit: '4',
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Prestigious scholarship from Tata Trusts for meritorious students from economically weaker sections.',
    applicationUrl: 'https://www.tatatrusts.org/our-work/individual-grants-programme',
    helpline: '022-66658282',
    documents: ['Marksheets', 'Income Certificate', 'College Admission', 'Aadhaar Card', 'Bank Details'],
    howToApply: [
      'Apply on Tata Trusts portal',
      'Submit academic records',
      'Income verification',
      'Interview if shortlisted',
      'Scholarship grant'
    ],
    benefits: [
      { label: 'Maximum Amount', value: '₹50,000' },
      { label: 'Income Limit', value: '< ₹4 Lakh' },
      { label: 'Selection', value: 'Merit Based' }
    ]
  },
  {
    id: 'reliance-foundation',
    name: 'Reliance Foundation UG Scholarship',
    provider: 'Reliance Foundation',
    type: 'corporate',
    amount: 'Up to ₹2,00,000',
    eligibility: ['UG Students', 'Merit Based', 'Top Institutes'],
    deadline: 'Mar 1, 2026',
    deadlineStatus: 'open',
    educationLevel: ['ug', 'professional'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'High-value scholarship for meritorious undergraduate students in premier institutions.',
    applicationUrl: 'https://www.reliancefoundation.org/scholarships',
    helpline: '1800-419-8800',
    documents: ['12th Marksheet', 'Entrance Exam Score', 'College Admission', 'Income Proof', 'Aadhaar Card'],
    howToApply: [
      'Apply on Reliance Foundation portal',
      'Submit academic achievements',
      'Upload entrance exam scores',
      'Interview round',
      'Final selection'
    ],
    benefits: [
      { label: 'Total Amount', value: 'Up to ₹2,00,000' },
      { label: 'Covers', value: 'Tuition + Living' },
      { label: 'Mentorship', value: 'Included' }
    ]
  },
  {
    id: 'lt-build-india',
    name: 'L&T Build India Scholarship',
    provider: 'Larsen & Toubro',
    type: 'corporate',
    amount: '₹1,25,000/year',
    eligibility: ['Engineering Students', 'Income < ₹6 Lakh', 'Good Academic Record'],
    deadline: 'Feb 28, 2026',
    deadlineStatus: 'open',
    educationLevel: ['professional'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    incomeLimit: '6',
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Scholarship for engineering students to build careers in infrastructure and construction.',
    applicationUrl: 'https://www.buddy4study.com/page/lt-build-india-scholarship',
    helpline: '011-430-92248',
    documents: ['Engineering Admission', 'Income Certificate', 'Marksheets', 'Aadhaar Card', 'Bank Details'],
    howToApply: [
      'Apply through Buddy4Study',
      'Submit engineering admission',
      'Income verification',
      'Academic verification',
      'Scholarship award'
    ],
    benefits: [
      { label: 'Annual Amount', value: '₹1,25,000' },
      { label: 'Income Limit', value: '< ₹6 Lakh' },
      { label: 'Field', value: 'Engineering' }
    ]
  },
  {
    id: 'kotak-kanya',
    name: 'Kotak Kanya Scholarship (Girls)',
    provider: 'Kotak Mahindra Group',
    type: 'corporate',
    amount: 'Up to ₹1,50,000',
    eligibility: ['Female Students', 'Professional Courses', 'Income < ₹6 Lakh'],
    deadline: 'Jan 31, 2026',
    deadlineStatus: 'open',
    educationLevel: ['professional'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    incomeLimit: '6',
    gender: 'female',
    state: 'Tamil Nadu',
    description: 'Scholarship for girl students pursuing professional courses like engineering, medicine, law.',
    applicationUrl: 'https://www.buddy4study.com/page/kotak-kanya-scholarship',
    helpline: '011-430-92248',
    documents: ['Professional Course Admission', 'Income Certificate', 'Marksheets', 'Aadhaar Card', 'Bank Details'],
    howToApply: [
      'Apply on Buddy4Study',
      'Submit professional course proof',
      'Income verification',
      'Academic check',
      'Scholarship grant'
    ],
    benefits: [
      { label: 'Maximum Amount', value: '₹1,50,000' },
      { label: 'For', value: 'Girl Students' },
      { label: 'Courses', value: 'Professional' }
    ]
  },
  {
    id: 'adobe-women-tech',
    name: 'Adobe India Women in Tech',
    provider: 'Adobe Systems',
    type: 'corporate',
    amount: '$10,000 (≈₹8,30,000)',
    eligibility: ['Female CS/IT Students', 'UG Students', 'Academic Excellence'],
    deadline: 'Sep 30, 2025',
    deadlineStatus: 'coming-soon',
    educationLevel: ['ug'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    gender: 'female',
    state: 'Tamil Nadu',
    description: 'International scholarship for women pursuing computer science or related fields.',
    applicationUrl: 'https://research.adobe.com/scholarship/',
    helpline: 'scholarship@adobe.com',
    documents: ['CS/IT Enrollment Proof', 'Academic Transcripts', 'Statement of Purpose', 'Recommendation Letters'],
    howToApply: [
      'Apply on Adobe Research portal',
      'Submit academic transcripts',
      'Write statement of purpose',
      'Get recommendation letters',
      'Interview if selected'
    ],
    benefits: [
      { label: 'Award Amount', value: '$10,000' },
      { label: 'Mentorship', value: 'Adobe Mentors' },
      { label: 'Internship', value: 'Opportunity' }
    ]
  },
  {
    id: 'google-generation',
    name: 'Google Generation Scholarship',
    provider: 'Google',
    type: 'corporate',
    amount: '$10,000 (≈₹8,30,000)',
    eligibility: ['CS/IT Students', 'Underrepresented Groups', 'Strong Academics'],
    deadline: 'Dec 15, 2025',
    deadlineStatus: 'one-month',
    educationLevel: ['ug'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Google scholarship for students from underrepresented groups in computer science.',
    applicationUrl: 'https://buildyourfuture.withgoogle.com/scholarships',
    helpline: 'scholarships@google.com',
    documents: ['CS Enrollment Proof', 'Academic Records', 'Essay', 'Community Involvement Proof'],
    howToApply: [
      'Apply on Google Scholarships portal',
      'Submit academic records',
      'Write required essays',
      'Document community work',
      'Selection by Google team'
    ],
    benefits: [
      { label: 'Award Amount', value: '$10,000' },
      { label: 'Google Retreat', value: 'Invited' },
      { label: 'Network', value: 'Alumni Community' }
    ]
  },
  {
    id: 'samsung-star',
    name: 'Samsung Star Scholarship',
    provider: 'Samsung India',
    type: 'corporate',
    amount: '₹1,00,000',
    eligibility: ['Engineering Students', 'Electronics/CS/IT', 'Top Academic Performance'],
    deadline: 'Mar 15, 2026',
    deadlineStatus: 'open',
    educationLevel: ['ug', 'professional'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Samsung scholarship for top engineering students in electronics and computer science.',
    applicationUrl: 'https://www.samsung.com/in/about-us/corporate-citizenship/',
    helpline: '1800-40-7267864',
    documents: ['Engineering Admission', 'Academic Records', 'Project Portfolio', 'Aadhaar Card'],
    howToApply: [
      'Apply through Samsung portal',
      'Submit academic achievements',
      'Share project portfolio',
      'Technical assessment',
      'Interview round'
    ],
    benefits: [
      { label: 'Scholarship', value: '₹1,00,000' },
      { label: 'Internship', value: 'Priority' },
      { label: 'Mentorship', value: 'Samsung Engineers' }
    ]
  },

  // NGO/TRUST SCHOLARSHIPS
  {
    id: 'vidyasaarathi',
    name: 'Vidyasaarathi Scholarship',
    provider: 'Vidyasaarathi (NSDL e-Gov)',
    type: 'ngo',
    amount: '₹10,000 - ₹75,000',
    eligibility: ['Various Criteria', 'Multiple Schemes', 'UG/PG Students'],
    deadline: 'Rolling',
    deadlineStatus: 'open',
    educationLevel: ['12th-passed', 'ug', 'pg', 'diploma', 'professional'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Platform offering multiple scholarships from various corporates and trusts.',
    applicationUrl: 'https://www.vidyasaarathi.co.in',
    helpline: '022-24994200',
    documents: ['Varies by Scheme', 'Common: Aadhaar, Marksheets, Income Proof'],
    howToApply: [
      'Register on Vidyasaarathi',
      'Browse available scholarships',
      'Apply to eligible schemes',
      'Upload documents',
      'Track applications'
    ],
    benefits: [
      { label: 'Amount Range', value: '₹10K - ₹75K' },
      { label: 'Schemes', value: 'Multiple' },
      { label: 'Platform', value: 'Single Portal' }
    ]
  },
  {
    id: 'fair-lovely',
    name: 'Fair & Lovely Career Foundation',
    provider: 'Hindustan Unilever',
    type: 'ngo',
    amount: 'Up to ₹50,000',
    eligibility: ['Female Students', 'Income < ₹6 Lakh', 'Post-12th Courses'],
    deadline: 'Feb 28, 2026',
    deadlineStatus: 'open',
    educationLevel: ['12th-passed', 'ug', 'pg', 'diploma', 'professional'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    incomeLimit: '6',
    gender: 'female',
    state: 'Tamil Nadu',
    description: 'Foundation supporting women education through scholarships and career guidance.',
    applicationUrl: 'https://www.fairandlovelycareer.in',
    helpline: '1800-102-2221',
    documents: ['Income Certificate', '12th Marksheet', 'Course Admission', 'Aadhaar Card', 'Photo'],
    howToApply: [
      'Apply on foundation portal',
      'Submit income proof',
      'Upload course admission',
      'Document verification',
      'Selection announcement'
    ],
    benefits: [
      { label: 'Maximum Amount', value: '₹50,000' },
      { label: 'Career Guidance', value: 'Included' },
      { label: 'For', value: 'Women Only' }
    ]
  },
  {
    id: 'sitaram-jindal',
    name: 'Sitaram Jindal Foundation',
    provider: 'Sitaram Jindal Foundation',
    type: 'ngo',
    amount: '₹10,000 - ₹50,000',
    eligibility: ['Merit Based', 'Need Based', 'Various Courses'],
    deadline: 'Rolling',
    deadlineStatus: 'open',
    educationLevel: ['12th-studying', '12th-passed', 'ug', 'pg', 'professional'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Foundation providing scholarships based on merit and financial need.',
    applicationUrl: 'https://www.sitaramjindalfoundation.org',
    helpline: '011-26163696',
    documents: ['Academic Records', 'Income Proof', 'Course Admission', 'Recommendation Letter'],
    howToApply: [
      'Apply on foundation website',
      'Submit academic records',
      'Document financial need',
      'Get recommendations',
      'Foundation review'
    ],
    benefits: [
      { label: 'Amount Range', value: '₹10K - ₹50K' },
      { label: 'Criteria', value: 'Merit + Need' },
      { label: 'Courses', value: 'Various' }
    ]
  },
  {
    id: 'keep-india-smiling',
    name: 'Keep India Smiling Foundation',
    provider: 'Colgate-Palmolive',
    type: 'ngo',
    amount: 'Up to ₹75,000',
    eligibility: ['Income < ₹5 Lakh', 'UG/Professional Students', 'Good Academics'],
    deadline: 'Jan 15, 2026',
    deadlineStatus: 'one-month',
    educationLevel: ['ug', 'professional'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    incomeLimit: '5',
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Scholarship supporting students pursuing professional and undergraduate courses.',
    applicationUrl: 'https://www.buddy4study.com/page/colgate-keep-india-smiling-foundational-scholarship',
    helpline: '011-430-92248',
    documents: ['Income Certificate', 'Academic Records', 'Course Admission', 'Aadhaar Card', 'Bank Details'],
    howToApply: [
      'Apply on Buddy4Study',
      'Submit income proof',
      'Upload academic records',
      'Course verification',
      'Selection process'
    ],
    benefits: [
      { label: 'Maximum Amount', value: '₹75,000' },
      { label: 'Income Limit', value: '< ₹5 Lakh' },
      { label: 'Courses', value: 'UG/Professional' }
    ]
  },
  {
    id: 'foundation-excellence',
    name: 'Foundation for Excellence',
    provider: 'Foundation for Excellence (FFE)',
    type: 'ngo',
    amount: 'Full Tuition',
    eligibility: ['Engineering/Medical', 'Income < ₹3 Lakh', 'Top Entrance Ranks'],
    deadline: 'Jun 30, 2026',
    deadlineStatus: 'open',
    educationLevel: ['professional'],
    category: ['general', 'sc', 'st', 'obc', 'bc-mbc', 'ews', 'minority'],
    incomeLimit: '3',
    gender: 'all',
    state: 'Tamil Nadu',
    description: 'Full scholarship covering entire tuition for meritorious students in engineering and medical.',
    applicationUrl: 'https://www.ffe.org',
    helpline: '080-25598260',
    documents: ['Entrance Rank Proof', 'Income Certificate', 'College Admission', 'Aadhaar Card', 'Interview'],
    howToApply: [
      'Apply on FFE website',
      'Submit entrance exam rank',
      'Income verification',
      'Document submission',
      'Interview round',
      'Full scholarship if selected'
    ],
    benefits: [
      { label: 'Coverage', value: 'Full Tuition' },
      { label: 'Income Limit', value: '< ₹3 Lakh' },
      { label: 'Courses', value: 'Eng/Medical' }
    ]
  }
];

export const getScholarshipsByType = (type: string) => {
  return scholarships.filter(s => s.type === type);
};

export const getJKKNScholarships = () => {
  return scholarships.filter(s => s.type === 'jkkn');
};

export const getGovernmentScholarships = () => {
  return scholarships.filter(s => s.type === 'government');
};

export const getCorporateScholarships = () => {
  return scholarships.filter(s => s.type === 'corporate');
};

export const getNGOScholarships = () => {
  return scholarships.filter(s => s.type === 'ngo');
};
