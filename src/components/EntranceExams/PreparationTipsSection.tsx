import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EntranceExam } from './types';
import { entranceExams } from './examData';
import { 
  BookOpen, 
  GraduationCap, 
  Lightbulb, 
  Target, 
  ExternalLink,
  Youtube,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Default preparation tips for exams without specific tips
const getDefaultTips = (examId: string, category: string) => {
  const categoryTips: Record<string, { books: string[], courses: string[], strategy: string[], topics: string[] }> = {
    engineering: {
      books: ['HC Verma (Physics)', 'RD Sharma (Maths)', 'NCERT Chemistry', 'Arihant Previous Papers'],
      courses: ['Physics Wallah', 'Unacademy JEE', 'Vedantu', 'BYJU\'s'],
      strategy: ['Complete NCERT thoroughly', 'Practice 50+ questions daily', 'Take weekly mock tests', 'Focus on problem-solving speed'],
      topics: ['Mechanics & Thermodynamics', 'Organic Chemistry', 'Calculus & Algebra', 'Modern Physics']
    },
    medical: {
      books: ['NCERT Biology (11th & 12th)', 'Trueman Biology', 'MTG NEET Guide', 'DC Pandey Physics'],
      courses: ['NEET Allen', 'Aakash NEET', 'Physics Wallah NEET', 'Unacademy NEET'],
      strategy: ['Master NCERT line by line', 'Practice MCQs from previous years', 'Focus on Biology (50% weightage)', 'Regular revision cycles'],
      topics: ['Human Physiology', 'Genetics & Evolution', 'Plant Biology', 'Organic Chemistry']
    },
    management: {
      books: ['Arun Sharma Quant', 'Word Power Made Easy', 'Logical Reasoning by RS Aggarwal', 'Current Affairs Monthly'],
      courses: ['Career Launcher CAT', 'TIME CAT', 'IMS CAT', 'Unacademy CAT'],
      strategy: ['Build strong vocab (20 words/day)', 'Practice Data Interpretation daily', 'Read newspapers for RC & GK', 'Take sectional mocks'],
      topics: ['Quantitative Ability', 'Verbal Ability', 'Logical Reasoning', 'Data Interpretation']
    },
    design: {
      books: ['A Modern Approach to Verbal Reasoning', 'Drawing for Beginners', 'Design Fundamentals', 'Aptitude Test Papers'],
      courses: ['NATA Online Coaching', 'Sketch Bubble', 'NID Preparation Course', 'Architecture Drawing Classes'],
      strategy: ['Practice sketching daily', 'Study design principles', 'Work on spatial visualization', 'Build creative portfolio'],
      topics: ['Drawing & Sketching', 'Visual Perception', 'Design Aptitude', 'Creative Problem Solving']
    },
    agriculture: {
      books: ['NCERT Biology', 'Agriculture at a Glance', 'Objective Agriculture', 'ICAR Previous Papers'],
      courses: ['Unacademy ICAR', 'AgriNote', 'Aakash Agriculture', 'Online Agriculture Courses'],
      strategy: ['Focus on practical agriculture', 'Study crop science thoroughly', 'Learn about Indian agriculture', 'Practice objective questions'],
      topics: ['Crop Science', 'Soil Science', 'Agricultural Economics', 'Horticulture']
    },
    other: {
      books: ['NCERT All Subjects', 'Lucent GK', 'RS Aggarwal Reasoning', 'Arihant Preparation Books'],
      courses: ['Unacademy', 'BYJU\'s', 'Vedantu', 'Khan Academy'],
      strategy: ['Understand exam pattern first', 'Focus on core subjects', 'Practice previous year papers', 'Time management is key'],
      topics: ['General Knowledge', 'Reasoning Ability', 'English Language', 'Subject-specific topics']
    }
  };

  return categoryTips[category] || categoryTips.other;
};

// Specific preparation data for popular exams
const examSpecificTips: Record<string, { books: string[], courses: string[], strategy: string[], topics: string[] }> = {
  'jee-main': {
    books: ['HC Verma - Concepts of Physics', 'Cengage Mathematics', 'MS Chouhan Organic Chemistry', 'NCERT Physics, Chemistry, Maths'],
    courses: ['Physics Wallah JEE', 'Unacademy JEE Main', 'Vedantu JEE', 'Allen DLP'],
    strategy: ['Complete NCERT first', 'Solve 100+ problems daily', 'Take NTA mock tests', 'Focus on January attempt'],
    topics: ['Mechanics (25%)', 'Electromagnetism', 'Calculus & Coordinate Geometry', 'Organic & Physical Chemistry']
  },
  'jee-advanced': {
    books: ['Irodov Physics', 'SL Loney Trigonometry', 'Peter Sykes Organic Chemistry', 'ML Khanna Mathematics'],
    courses: ['Allen JEE Advanced', 'FIITJEE RSM', 'Resonance DLP', 'Unacademy JEE Advanced'],
    strategy: ['Focus on conceptual understanding', 'Practice integer type questions', 'Solve previous 20 years papers', 'Time each section carefully'],
    topics: ['Advanced Mechanics', 'Electrochemistry', 'Complex Numbers', 'Thermodynamics']
  },
  'neet-ug': {
    books: ['NCERT Biology (Word by Word)', 'Trueman\'s Biology', 'MTG Fingertips', 'DC Pandey NEET Physics'],
    courses: ['Aakash NEET', 'Allen NEET', 'Physics Wallah NEET', 'Unacademy NEET'],
    strategy: ['Memorize NCERT Biology', 'Practice diagrams daily', 'Solve 200+ MCQs per subject', 'Focus on high-weightage chapters'],
    topics: ['Human Physiology', 'Genetics & Evolution', 'Ecology', 'Cell Biology']
  },
  'mht-cet': {
    books: ['Target MHT-CET', 'Marvel Physics', 'Chemistry Marvel', 'Mathematics Marvel'],
    courses: ['Chate Classes', 'IIT Bombay Coaching', 'Unacademy MHT-CET', 'Online MHT-CET'],
    strategy: ['Focus on Maharashtra Board syllabus', 'Practice MHT-CET previous papers', 'Balance between JEE and CET prep', 'Master calculation speed'],
    topics: ['Rotational Motion', 'Chemical Thermodynamics', 'Integration', 'Wave Optics']
  },
  'wbjee': {
    books: ['WBJEE Previous Papers', 'Das Gupta Mathematics', 'ABC Physics', 'Chemistry WBJEE Guide'],
    courses: ['Pathfinder WBJEE', 'Aakash WBJEE', 'Unacademy WBJEE', 'Career Point'],
    strategy: ['Study WB Board pattern', 'Focus on Mathematics (50 marks)', 'Practice West Bengal style questions', 'Complete syllabus by March'],
    topics: ['Differential Equations', 'Modern Physics', 'Inorganic Chemistry', 'Probability']
  },
  'cat': {
    books: ['Arun Sharma Quantitative Aptitude', 'Nishit Sinha Logical Reasoning', 'Word Power Made Easy', 'How to Prepare for Verbal Ability'],
    courses: ['TIME CAT', 'Career Launcher', 'IMS Learning', 'Unacademy CAT'],
    strategy: ['Build strong vocabulary', 'Practice 50 DI sets weekly', 'Read economic newspapers', 'Take 100+ mocks'],
    topics: ['VARC (40%)', 'DILR (32%)', 'Quantitative Ability (28%)', 'Slot-wise preparation']
  }
};

export const PreparationTipsSection = () => {
  const popularExams = entranceExams.filter(e => 
    ['jee-main', 'jee-advanced', 'neet-ug', 'cat', 'clat', 'nata', 'cuet-ug'].includes(e.id)
  );

  return (
    <Card className="bg-white border-[#E8F5E9] shadow-lg mt-6">
      <CardHeader className="bg-gradient-to-r from-[#E8F5E9] to-[#FFF8E1]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#2E7D32] rounded-lg">
            <Lightbulb className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl text-[#1B5E20]">📚 Exam Preparation Resources</CardTitle>
            <p className="text-sm text-[#6B7280] mt-1">Recommended books, online courses & study strategies</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="jee-main" className="w-full">
          <TabsList className="w-full flex-wrap h-auto gap-2 bg-[#F9FBF9] p-2 rounded-xl">
            {popularExams.map(exam => (
              <TabsTrigger 
                key={exam.id}
                value={exam.id}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#2E7D32] data-[state=active]:to-[#1B5E20] data-[state=active]:text-white px-4 py-2 rounded-lg"
              >
                {exam.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {popularExams.map(exam => {
            const tips = examSpecificTips[exam.id] || getDefaultTips(exam.id, exam.category);
            
            return (
              <TabsContent key={exam.id} value={exam.id} className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Recommended Books */}
                  <div className="bg-[#E3F2FD] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="h-5 w-5 text-[#1976D2]" />
                      <h4 className="font-semibold text-[#1976D2]">Recommended Books</h4>
                    </div>
                    <ul className="space-y-2">
                      {tips.books.map((book, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#374151]">
                          <FileText className="h-4 w-4 text-[#1976D2] mt-0.5 flex-shrink-0" />
                          {book}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Online Courses */}
                  <div className="bg-[#FFF8E1] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Youtube className="h-5 w-5 text-[#D32F2F]" />
                      <h4 className="font-semibold text-[#F59E0B]">Online Courses & Coaching</h4>
                    </div>
                    <ul className="space-y-2">
                      {tips.courses.map((course, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#374151]">
                          <GraduationCap className="h-4 w-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Study Strategy */}
                  <div className="bg-[#E8F5E9] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="h-5 w-5 text-[#2E7D32]" />
                      <h4 className="font-semibold text-[#2E7D32]">Study Strategy</h4>
                    </div>
                    <ul className="space-y-2">
                      {tips.strategy.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#374151]">
                          <span className="text-[#2E7D32] font-bold">{i + 1}.</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Important Topics */}
                  <div className="bg-[#F3E5F5] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="h-5 w-5 text-[#7B1FA2]" />
                      <h4 className="font-semibold text-[#7B1FA2]">Important Topics</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tips.topics.map((topic, i) => (
                        <Badge key={i} className="bg-white text-[#7B1FA2] border border-[#CE93D8]">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Official Resources Link */}
                <div className="mt-6 flex justify-center">
                  <a 
                    href={exam.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white rounded-xl hover:from-[#D97706] hover:to-[#B8860B] transition-all shadow-md hover:shadow-lg"
                  >
                    Visit Official {exam.name} Website
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
};
