import { Question, StreamType } from './types';
import { PCM_QUESTIONS } from './pcm-questions';
import { PCB_QUESTIONS } from './pcb-questions';
import { PCMB_QUESTIONS } from './pcmb-questions';
import { COMMERCE_QUESTIONS } from './commerce-questions';
import { ARTS_QUESTIONS } from './arts-questions';

export * from './types';
export { PCM_QUESTIONS } from './pcm-questions';
export { PCB_QUESTIONS } from './pcb-questions';
export { PCMB_QUESTIONS } from './pcmb-questions';
export { COMMERCE_QUESTIONS } from './commerce-questions';
export { ARTS_QUESTIONS } from './arts-questions';

// Get questions by stream
export function getQuestionsByStream(stream: StreamType): Question[] {
  switch (stream) {
    case 'pcm':
      return PCM_QUESTIONS;
    case 'pcb':
      return PCB_QUESTIONS;
    case 'pcmb':
      return PCMB_QUESTIONS;
    case 'commerce':
      return COMMERCE_QUESTIONS;
    case 'arts':
      return ARTS_QUESTIONS;
    default:
      return PCM_QUESTIONS;
  }
}

// Select random questions excluding already seen ones
export function selectQuestionsForUser(
  allQuestions: Question[],
  seenQuestionIds: string[],
  count: number = 20
): { questions: Question[]; needsReset: boolean } {
  // Filter out questions user has already seen
  const availableQuestions = allQuestions.filter(
    q => !seenQuestionIds.includes(q.id)
  );

  // If not enough questions available, return all questions (reset scenario)
  if (availableQuestions.length < count) {
    const shuffled = shuffleArray([...allQuestions]);
    return {
      questions: shuffled.slice(0, count),
      needsReset: true
    };
  }

  // Shuffle and select random questions
  const shuffled = shuffleArray([...availableQuestions]);
  return {
    questions: shuffled.slice(0, count),
    needsReset: false
  };
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Calculate trait scores from answers
export function calculateTraitScores(
  questions: Question[],
  answers: Record<string, string>
): Record<string, number> {
  const traitScores: Record<string, number> = {};

  questions.forEach(question => {
    const selectedOptionId = answers[question.id];
    if (selectedOptionId) {
      const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
      if (selectedOption) {
        selectedOption.traits.forEach(trait => {
          traitScores[trait] = (traitScores[trait] || 0) + 1;
        });
      }
    }
  });

  return traitScores;
}

// Get top traits from scores
export function getTopTraits(
  traitScores: Record<string, number>,
  count: number = 5
): { trait: string; score: number }[] {
  return Object.entries(traitScores)
    .map(([trait, score]) => ({ trait, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

// Course recommendations based on stream and traits
export interface CourseRecommendation {
  name: string;
  matchScore: number;
  description: string;
  careers: string[];
  salaryRange: string;
}

export function getCourseRecommendations(
  stream: StreamType,
  traitScores: Record<string, number>
): CourseRecommendation[] {
  const courses = getCoursesByStream(stream);
  
  // Calculate match scores based on traits
  const scoredCourses = courses.map(course => {
    let matchScore = 0;
    course.requiredTraits.forEach(trait => {
      if (traitScores[trait]) {
        matchScore += traitScores[trait];
      }
    });
    
    // Normalize score to percentage (max possible is 20 questions * 2 traits = 40)
    const normalizedScore = Math.min(Math.round((matchScore / 20) * 100), 98);
    
    return {
      ...course,
      matchScore: Math.max(normalizedScore, 45) // Minimum 45% match
    };
  });

  // Sort by match score and return top 5
  return scoredCourses
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);
}

interface CourseData extends Omit<CourseRecommendation, 'matchScore'> {
  requiredTraits: string[];
}

function getCoursesByStream(stream: StreamType): CourseData[] {
  const coursesByStream: Record<StreamType, CourseData[]> = {
    pcm: [
      { name: "B.Tech Computer Science", requiredTraits: ["technical", "programming", "analytical", "problem-solving"], description: "Design and develop software systems", careers: ["Software Engineer", "Data Scientist", "AI Researcher"], salaryRange: "₹8-25 LPA" },
      { name: "B.Tech Electronics", requiredTraits: ["technical", "hardware", "innovative", "precision"], description: "Work with electronic systems and circuits", careers: ["Electronics Engineer", "VLSI Designer", "IoT Developer"], salaryRange: "₹6-20 LPA" },
      { name: "B.Tech Mechanical", requiredTraits: ["mechanical", "design", "practical", "engineering"], description: "Design and manufacture mechanical systems", careers: ["Mechanical Engineer", "Automotive Designer", "Robotics Engineer"], salaryRange: "₹5-18 LPA" },
      { name: "B.Sc Physics", requiredTraits: ["scientific", "research", "analytical", "theoretical"], description: "Study fundamental laws of nature", careers: ["Physicist", "Research Scientist", "Science Teacher"], salaryRange: "₹4-15 LPA" },
      { name: "B.Tech Aerospace", requiredTraits: ["engineering", "innovative", "space", "technical"], description: "Design aircraft and spacecraft", careers: ["Aerospace Engineer", "Flight Systems Designer", "Space Researcher"], salaryRange: "₹8-22 LPA" },
      { name: "B.Tech Civil Engineering", requiredTraits: ["structural", "planning", "practical", "design"], description: "Plan and construct infrastructure", careers: ["Civil Engineer", "Urban Planner", "Construction Manager"], salaryRange: "₹5-16 LPA" },
      { name: "B.Sc Mathematics", requiredTraits: ["analytical", "logical", "abstract", "theoretical"], description: "Study mathematical structures and theories", careers: ["Mathematician", "Actuary", "Data Analyst"], salaryRange: "₹5-20 LPA" },
      { name: "B.Tech AI & Machine Learning", requiredTraits: ["AI", "programming", "analytical", "innovative"], description: "Build intelligent systems", careers: ["ML Engineer", "AI Researcher", "Data Scientist"], salaryRange: "₹10-30 LPA" },
      { name: "B.E. Robotics", requiredTraits: ["robotics", "automation", "technical", "innovative"], description: "Design and program robots", careers: ["Robotics Engineer", "Automation Specialist", "Research Scientist"], salaryRange: "₹7-20 LPA" },
      { name: "B.Tech Chemical Engineering", requiredTraits: ["chemistry", "process", "industrial", "practical"], description: "Design chemical production processes", careers: ["Chemical Engineer", "Process Engineer", "Pharma Engineer"], salaryRange: "₹6-18 LPA" }
    ],
    pcb: [
      { name: "MBBS", requiredTraits: ["clinical", "caring", "patient-focused", "medical"], description: "Become a medical doctor", careers: ["Doctor", "Surgeon", "Specialist"], salaryRange: "₹8-50 LPA" },
      { name: "BDS", requiredTraits: ["precision", "caring", "medical", "patient-focused"], description: "Become a dental surgeon", careers: ["Dentist", "Orthodontist", "Oral Surgeon"], salaryRange: "₹5-25 LPA" },
      { name: "B.Sc Nursing", requiredTraits: ["caring", "patient-focused", "empathetic", "practical"], description: "Provide patient care", careers: ["Nurse", "Nurse Practitioner", "Healthcare Manager"], salaryRange: "₹3-12 LPA" },
      { name: "BAMS (Ayurveda)", requiredTraits: ["traditional", "holistic", "caring", "natural"], description: "Practice Ayurvedic medicine", careers: ["Ayurvedic Doctor", "Wellness Consultant", "Researcher"], salaryRange: "₹4-15 LPA" },
      { name: "B.Pharm", requiredTraits: ["pharmaceutical", "chemistry", "analytical", "quality"], description: "Study pharmacy and drugs", careers: ["Pharmacist", "Drug Developer", "Quality Analyst"], salaryRange: "₹4-15 LPA" },
      { name: "B.Sc Biotechnology", requiredTraits: ["research", "biological", "innovative", "scientific"], description: "Apply biology to technology", careers: ["Biotechnologist", "Researcher", "Biotech Executive"], salaryRange: "₹5-18 LPA" },
      { name: "B.Sc Microbiology", requiredTraits: ["laboratory", "research", "analytical", "scientific"], description: "Study microorganisms", careers: ["Microbiologist", "Lab Scientist", "Quality Controller"], salaryRange: "₹4-12 LPA" },
      { name: "BPT (Physiotherapy)", requiredTraits: ["therapeutic", "caring", "rehabilitation", "physical"], description: "Help patients recover movement", careers: ["Physiotherapist", "Sports Therapist", "Rehabilitation Specialist"], salaryRange: "₹4-15 LPA" },
      { name: "B.Sc Zoology", requiredTraits: ["wildlife", "research", "biological", "conservation"], description: "Study animal life", careers: ["Zoologist", "Wildlife Biologist", "Conservationist"], salaryRange: "₹3-12 LPA" },
      { name: "BHMS (Homeopathy)", requiredTraits: ["holistic", "caring", "patient-focused", "alternative"], description: "Practice homeopathic medicine", careers: ["Homeopathic Doctor", "Consultant", "Clinic Owner"], salaryRange: "₹3-12 LPA" }
    ],
    pcmb: [
      { name: "MBBS", requiredTraits: ["clinical", "caring", "medical", "patient-focused"], description: "Become a medical doctor", careers: ["Doctor", "Surgeon", "Specialist"], salaryRange: "₹8-50 LPA" },
      { name: "B.Tech Biomedical Engineering", requiredTraits: ["engineering", "medical", "innovative", "technical"], description: "Design medical devices", careers: ["Biomedical Engineer", "Medical Device Designer", "Clinical Engineer"], salaryRange: "₹6-20 LPA" },
      { name: "B.Sc Bioinformatics", requiredTraits: ["analytical", "biological", "programming", "research"], description: "Apply computing to biology", careers: ["Bioinformatician", "Data Scientist", "Genomic Analyst"], salaryRange: "₹5-18 LPA" },
      { name: "B.Tech Biotechnology", requiredTraits: ["research", "biological", "engineering", "innovative"], description: "Engineer biological systems", careers: ["Biotechnologist", "Research Scientist", "Biotech Manager"], salaryRange: "₹6-20 LPA" },
      { name: "B.Sc Biochemistry", requiredTraits: ["chemistry", "biological", "research", "analytical"], description: "Study chemistry of life", careers: ["Biochemist", "Research Scientist", "Lab Manager"], salaryRange: "₹4-15 LPA" },
      { name: "Integrated BS-MS (Science)", requiredTraits: ["research", "scientific", "academic", "analytical"], description: "Dual degree in science", careers: ["Research Scientist", "Professor", "Industry Researcher"], salaryRange: "₹5-20 LPA" },
      { name: "B.Sc Agriculture", requiredTraits: ["agricultural", "sustainable", "practical", "biological"], description: "Study modern agriculture", careers: ["Agricultural Scientist", "Farm Manager", "Agri-Business"], salaryRange: "₹4-15 LPA" },
      { name: "B.Tech Food Technology", requiredTraits: ["food-science", "quality", "process", "innovative"], description: "Develop food products", careers: ["Food Technologist", "Quality Manager", "R&D Scientist"], salaryRange: "₹5-15 LPA" },
      { name: "B.Sc Environmental Science", requiredTraits: ["environmental", "sustainable", "research", "ecological"], description: "Study environmental systems", careers: ["Environmental Scientist", "Sustainability Consultant", "Researcher"], salaryRange: "₹4-14 LPA" },
      { name: "B.Tech Genetic Engineering", requiredTraits: ["genetics", "innovative", "research", "molecular"], description: "Modify genetic material", careers: ["Genetic Engineer", "Research Scientist", "Biotech Executive"], salaryRange: "₹6-22 LPA" }
    ],
    commerce: [
      { name: "B.Com (Honours)", requiredTraits: ["analytical", "financial", "business", "accounting"], description: "Advanced commerce education", careers: ["Accountant", "Financial Analyst", "Business Manager"], salaryRange: "₹4-12 LPA" },
      { name: "BBA", requiredTraits: ["management", "leadership", "business", "entrepreneurial"], description: "Business administration basics", careers: ["Manager", "Entrepreneur", "Business Analyst"], salaryRange: "₹4-15 LPA" },
      { name: "CA (Chartered Accountancy)", requiredTraits: ["accounting", "analytical", "detail-oriented", "ethical"], description: "Professional accounting qualification", careers: ["Chartered Accountant", "CFO", "Auditor"], salaryRange: "₹8-30 LPA" },
      { name: "B.Com + CFA", requiredTraits: ["financial", "analytical", "investment", "quantitative"], description: "Finance with global certification", careers: ["Investment Analyst", "Portfolio Manager", "Equity Research"], salaryRange: "₹10-40 LPA" },
      { name: "BBA in Marketing", requiredTraits: ["marketing", "creative", "communication", "strategic"], description: "Marketing management focus", careers: ["Marketing Manager", "Brand Manager", "Digital Marketer"], salaryRange: "₹5-20 LPA" },
      { name: "B.Com in Banking & Insurance", requiredTraits: ["financial", "analytical", "customer-focused", "risk-management"], description: "Banking sector specialization", careers: ["Bank Manager", "Insurance Advisor", "Risk Analyst"], salaryRange: "₹4-15 LPA" },
      { name: "BBA in HR Management", requiredTraits: ["people-management", "empathetic", "organizational", "leadership"], description: "Human resources specialization", careers: ["HR Manager", "Talent Acquisition", "Training Manager"], salaryRange: "₹5-18 LPA" },
      { name: "B.Com + CS", requiredTraits: ["legal", "corporate", "detail-oriented", "compliance"], description: "Company secretary pathway", careers: ["Company Secretary", "Compliance Officer", "Legal Advisor"], salaryRange: "₹6-20 LPA" },
      { name: "BBA in International Business", requiredTraits: ["global", "strategic", "business", "cultural"], description: "Global business focus", careers: ["Export Manager", "International Business Manager", "Trade Analyst"], salaryRange: "₹6-22 LPA" },
      { name: "B.Com in E-Commerce", requiredTraits: ["digital", "entrepreneurial", "technical", "business"], description: "Online business management", careers: ["E-commerce Manager", "Digital Business Head", "Entrepreneur"], salaryRange: "₹5-18 LPA" }
    ],
    arts: [
      { name: "BA Psychology", requiredTraits: ["empathetic", "analytical", "patient", "understanding"], description: "Study human behavior", careers: ["Psychologist", "Counselor", "HR Professional"], salaryRange: "₹4-15 LPA" },
      { name: "BA English Literature", requiredTraits: ["writing", "literary", "creative", "analytical"], description: "Study English literature", careers: ["Writer", "Editor", "Content Strategist"], salaryRange: "₹4-12 LPA" },
      { name: "BA Political Science", requiredTraits: ["analytical", "political", "activist", "civic"], description: "Study political systems", careers: ["Political Analyst", "Civil Servant", "Journalist"], salaryRange: "₹4-15 LPA" },
      { name: "BA Sociology", requiredTraits: ["social", "research", "empathetic", "analytical"], description: "Study society and culture", careers: ["Social Worker", "Researcher", "NGO Manager"], salaryRange: "₹3-12 LPA" },
      { name: "BFA (Fine Arts)", requiredTraits: ["artistic", "creative", "expressive", "visual"], description: "Professional art education", careers: ["Artist", "Art Director", "Gallery Curator"], salaryRange: "₹3-15 LPA" },
      { name: "BA Mass Communication", requiredTraits: ["communicative", "creative", "journalism", "media"], description: "Media and journalism", careers: ["Journalist", "PR Manager", "Content Creator"], salaryRange: "₹4-18 LPA" },
      { name: "BSW (Social Work)", requiredTraits: ["social", "helping", "community-focused", "empathetic"], description: "Professional social work", careers: ["Social Worker", "NGO Director", "Community Organizer"], salaryRange: "₹3-12 LPA" },
      { name: "BA Economics", requiredTraits: ["analytical", "quantitative", "policy", "strategic"], description: "Study economic systems", careers: ["Economist", "Policy Analyst", "Financial Analyst"], salaryRange: "₹5-20 LPA" },
      { name: "BA History", requiredTraits: ["research", "analytical", "cultural", "preservationist"], description: "Study historical events", careers: ["Historian", "Archivist", "Museum Curator"], salaryRange: "₹3-12 LPA" },
      { name: "BA Philosophy", requiredTraits: ["thoughtful", "analytical", "ethical", "theoretical"], description: "Study fundamental questions", careers: ["Philosopher", "Ethics Consultant", "Academic"], salaryRange: "₹3-10 LPA" }
    ]
  };

  return coursesByStream[stream] || coursesByStream.pcm;
}
