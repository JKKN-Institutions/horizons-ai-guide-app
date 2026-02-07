import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExamCategory } from './types';
import { GraduationCap, CheckCircle2, BookOpen, TrendingUp, Building2, IndianRupee } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryOverviewData {
  title: string;
  titleTamil: string;
  icon: string;
  courses: { name: string; duration: string; type: string }[];
  eligibility: string[];
  eligibilityTamil: string;
  keyFacts: { label: string; value: string }[];
  topCollegesTN: string[];
  salaryRange: string;
  demandLevel: 'High' | 'Very High' | 'Medium';
}

const categoryOverviews: Partial<Record<ExamCategory, CategoryOverviewData>> = {
  engineering: {
    title: 'Engineering Courses & Eligibility',
    titleTamil: 'பொறியியல் படிப்புகள் & தகுதி',
    icon: '⚙️',
    courses: [
      { name: 'B.E. / B.Tech', duration: '4 Years', type: 'UG' },
      { name: 'B.Arch', duration: '5 Years', type: 'UG' },
      { name: 'B.Tech (AI & Data Science)', duration: '4 Years', type: 'UG' },
      { name: 'B.E. (CSE / ECE / EEE / Mech / Civil)', duration: '4 Years', type: 'UG' },
      { name: 'Integrated M.Tech (Dual Degree)', duration: '5 Years', type: 'UG+PG' },
    ],
    eligibility: [
      '12th Pass with Physics, Chemistry & Mathematics (PCM)',
      'Minimum 50% aggregate in PCM (45% for reserved categories)',
      'TNEA: Based on 12th HSC marks – No entrance exam!',
      'JEE Main: For NITs, IIITs & other central colleges',
      'JEE Advanced: For IITs (must qualify JEE Main first)',
      'Private: VITEEE, SRMJEEE, BITSAT – Separate entrance exams',
    ],
    eligibilityTamil: '12-ஆம் வகுப்பு PCM (இயற்பியல், வேதியியல், கணிதம்) தேர்ச்சி அவசியம்',
    keyFacts: [
      { label: 'Total Seats in TN', value: '2,50,000+' },
      { label: 'Govt College Seats', value: '25,000+' },
      { label: 'Govt College Fees', value: '₹7,500/year' },
      { label: 'Pvt College Fees', value: '₹50K–2L/year' },
    ],
    topCollegesTN: [
      'IIT Madras, Chennai',
      'NIT Tiruchirappalli',
      'Anna University CEG',
      'PSG Tech, Coimbatore',
      'GCT Coimbatore',
      'TCE Madurai',
    ],
    salaryRange: '₹3.5L – ₹45L+ per annum',
    demandLevel: 'Very High',
  },
  medical: {
    title: 'Medical & Health Science Courses',
    titleTamil: 'மருத்துவ & சுகாதார அறிவியல் படிப்புகள்',
    icon: '🏥',
    courses: [
      { name: 'MBBS', duration: '5.5 Years', type: 'UG' },
      { name: 'BDS (Dental)', duration: '5 Years', type: 'UG' },
      { name: 'BAMS (Ayurveda)', duration: '5.5 Years', type: 'UG' },
      { name: 'BSMS (Siddha)', duration: '5.5 Years', type: 'UG' },
      { name: 'B.Pharm', duration: '4 Years', type: 'UG' },
      { name: 'B.Sc Nursing', duration: '4 Years', type: 'UG' },
    ],
    eligibility: [
      '12th Pass with Physics, Chemistry & Biology (PCB)',
      'NEET UG is MANDATORY for all medical courses',
      'Minimum 50% in PCB (40% for reserved categories)',
      'Age: 17–25 years at time of admission',
    ],
    eligibilityTamil: '12-ஆம் வகுப்பு PCB (இயற்பியல், வேதியியல், உயிரியல்) + NEET தேர்ச்சி அவசியம்',
    keyFacts: [
      { label: 'MBBS Seats in TN', value: '10,725+' },
      { label: 'Govt Medical Colleges', value: '36' },
      { label: 'Govt College Fees', value: '₹14,300/year' },
      { label: 'Pvt College Fees', value: '₹5L–25L/year' },
    ],
    topCollegesTN: [
      'Madras Medical College',
      'Stanley Medical College',
      'Kilpauk Medical College',
      'CMC Vellore',
      'JIPMER Puducherry',
    ],
    salaryRange: '₹5L – ₹50L+ per annum',
    demandLevel: 'Very High',
  },
  management: {
    title: 'Management & Law Courses',
    titleTamil: 'மேலாண்மை & சட்டப் படிப்புகள்',
    icon: '💼',
    courses: [
      { name: 'BBA / BMS', duration: '3 Years', type: 'UG' },
      { name: 'B.Com (Hons)', duration: '3 Years', type: 'UG' },
      { name: 'BA LLB (Integrated Law)', duration: '5 Years', type: 'UG' },
      { name: 'BBA LLB', duration: '5 Years', type: 'UG' },
      { name: 'CA / CS / CMA', duration: '3–5 Years', type: 'Professional' },
    ],
    eligibility: [
      '12th Pass from any stream',
      'CLAT: For NLUs (National Law Universities)',
      'CA Foundation: After 12th from any stream',
      'BBA: Direct admission / University entrance',
    ],
    eligibilityTamil: '12-ஆம் வகுப்பு எந்தப் பிரிவிலும் தேர்ச்சி பெற்றிருக்க வேண்டும்',
    keyFacts: [
      { label: 'NLU in TN', value: 'TNNLU Trichy' },
      { label: 'BBA Colleges', value: '200+' },
      { label: 'Avg CA Salary', value: '₹7–12L/year' },
      { label: 'Law Duration', value: '5 Years (Integrated)' },
    ],
    topCollegesTN: [
      'TNNLU Tiruchirappalli',
      'Loyola College, Chennai',
      'Madras Christian College',
      'PSG CAS, Coimbatore',
    ],
    salaryRange: '₹4L – ₹30L+ per annum',
    demandLevel: 'High',
  },
  agriculture: {
    title: 'Agriculture & Allied Courses',
    titleTamil: 'வேளாண்மை & தொடர்புடைய படிப்புகள்',
    icon: '🌾',
    courses: [
      { name: 'B.Sc Agriculture', duration: '4 Years', type: 'UG' },
      { name: 'B.Sc Horticulture', duration: '4 Years', type: 'UG' },
      { name: 'B.Sc Forestry', duration: '4 Years', type: 'UG' },
      { name: 'B.V.Sc (Veterinary)', duration: '5 Years', type: 'UG' },
      { name: 'B.F.Sc (Fisheries)', duration: '4 Years', type: 'UG' },
    ],
    eligibility: [
      '12th Pass with Physics, Chemistry & Biology/Maths',
      'TNAU: Based on 12th marks – No entrance exam',
      'TANUVAS: For veterinary – NEET required from 2024',
      'Minimum 50% in relevant subjects',
    ],
    eligibilityTamil: '12-ஆம் வகுப்பு PCB/PCM தேர்ச்சி – TNAU-க்கு நுழைவுத் தேர்வு இல்லை',
    keyFacts: [
      { label: 'TNAU Campuses', value: '7' },
      { label: 'Govt Fees', value: '₹5,000/year' },
      { label: 'B.Sc Agri Seats', value: '3,000+' },
      { label: 'Placement Rate', value: '85%+' },
    ],
    topCollegesTN: [
      'TNAU, Coimbatore',
      'AC&RI, Madurai',
      'TANUVAS, Chennai',
      'FC&RI, Mettupalayam',
    ],
    salaryRange: '₹3L – ₹15L+ per annum',
    demandLevel: 'High',
  },
  design: {
    title: 'Design & Arts Courses',
    titleTamil: 'வடிவமைப்பு & கலைப் படிப்புகள்',
    icon: '🎨',
    courses: [
      { name: 'B.Des (Design)', duration: '4 Years', type: 'UG' },
      { name: 'BFA (Fine Arts)', duration: '4 Years', type: 'UG' },
      { name: 'B.Sc Fashion Technology', duration: '4 Years', type: 'UG' },
      { name: 'B.Arch (Architecture)', duration: '5 Years', type: 'UG' },
    ],
    eligibility: [
      '12th Pass from any stream (Design) / PCM (Architecture)',
      'NIFT: National entrance for design',
      'NATA/JEE: For architecture courses',
      'Portfolio may be required',
    ],
    eligibilityTamil: '12-ஆம் வகுப்பு எந்தப் பிரிவிலும் (வடிவமைப்பு) / PCM (கட்டிடக்கலை)',
    keyFacts: [
      { label: 'NIFT Campus TN', value: 'Chennai' },
      { label: 'B.Des Duration', value: '4 Years' },
      { label: 'Starting Salary', value: '₹4–8L/year' },
      { label: 'Demand', value: 'Growing Fast' },
    ],
    topCollegesTN: [
      'NIFT Chennai',
      'IDC IIT Madras',
      'SRM School of Design',
      'Govt College of Fine Arts',
    ],
    salaryRange: '₹3L – ₹20L+ per annum',
    demandLevel: 'High',
  },
  defence: {
    title: 'Defence & Other Courses',
    titleTamil: 'பாதுகாப்பு படை & பிற படிப்புகள்',
    icon: '🎖️',
    courses: [
      { name: 'NDA (National Defence Academy)', duration: '3 Years + 1 Year', type: 'UG' },
      { name: 'Indian Navy (B.Tech Entry)', duration: '4 Years', type: 'UG' },
      { name: 'CDS (Combined Defence Services)', duration: 'Varies', type: 'Graduate Entry' },
      { name: 'AFCAT (Air Force)', duration: 'Varies', type: 'Graduate Entry' },
    ],
    eligibility: [
      '12th Pass (PCM for technical entries)',
      'NDA: Age 16.5–19.5 years, 12th pass/appearing',
      'Physical fitness standards required',
      'SSB Interview after written exam',
    ],
    eligibilityTamil: '12-ஆம் வகுப்பு தேர்ச்சி + உடல் தகுதி + SSB நேர்காணல்',
    keyFacts: [
      { label: 'NDA Entries/Year', value: '2 (Jan & Jul)' },
      { label: 'Training Duration', value: '3 + 1 Years' },
      { label: 'Starting Salary', value: '₹56,100/month' },
      { label: 'Perks', value: 'Free Housing, Medical' },
    ],
    topCollegesTN: [
      'Officers Training Academy (OTA), Chennai',
      'Air Force Selection Board, Mysore',
      'Naval Academy, Ezhimala',
    ],
    salaryRange: '₹6.7L – ₹25L+ per annum',
    demandLevel: 'Medium',
  },
};

interface CategoryOverviewProps {
  category: ExamCategory;
}

export const CategoryOverview = ({ category }: CategoryOverviewProps) => {
  const data = categoryOverviews[category];
  if (!data) return null;

  const demandColors = {
    'Very High': 'bg-green-100 text-green-700 border-green-300',
    'High': 'bg-blue-100 text-blue-700 border-blue-300',
    'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-300',
  };

  return (
    <Card className="border-2 border-[#C8E6C9] bg-gradient-to-br from-white to-[#F0FDF4] overflow-hidden">
      <CardContent className="p-5 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-bold text-[#1B5E20] flex items-center gap-2">
              <span className="text-2xl">{data.icon}</span> {data.title}
            </h3>
            <p className="text-sm text-[#B8860B] font-tamil">{data.titleTamil}</p>
          </div>
          <div className="flex gap-2">
            <Badge className={cn('border', demandColors[data.demandLevel])}>
              <TrendingUp className="h-3 w-3 mr-1" /> {data.demandLevel} Demand
            </Badge>
            <Badge className="bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7]">
              <IndianRupee className="h-3 w-3 mr-1" /> {data.salaryRange}
            </Badge>
          </div>
        </div>

        {/* Courses Grid */}
        <div>
          <h4 className="text-sm font-semibold text-[#1B5E20] mb-2 flex items-center gap-1">
            <BookOpen className="h-4 w-4" /> Available Courses
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {data.courses.map((course, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-[#E8F5E9] hover:border-[#A5D6A7] transition-colors">
                <GraduationCap className="h-4 w-4 text-[#2E7D32] shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#1F2937] truncate">{course.name}</p>
                  <p className="text-xs text-[#6B7280]">{course.duration} • {course.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility */}
        <div>
          <h4 className="text-sm font-semibold text-[#1B5E20] mb-2 flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" /> Eligibility & How to Get In
          </h4>
          <p className="text-xs text-[#B8860B] font-tamil mb-2">{data.eligibilityTamil}</p>
          <div className="space-y-1.5">
            {data.eligibility.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#2E7D32] mt-0.5 shrink-0" />
                <span className="text-[#374151]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Facts + Top Colleges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Key Facts */}
          <div className="bg-[#FFF8E1] rounded-xl p-3 border border-[#FFE082]">
            <h4 className="text-sm font-semibold text-[#B8860B] mb-2">📊 Key Facts</h4>
            <div className="grid grid-cols-2 gap-2">
              {data.keyFacts.map((fact, idx) => (
                <div key={idx} className="text-center p-2 bg-white/70 rounded-lg">
                  <p className="text-xs text-[#6B7280]">{fact.label}</p>
                  <p className="text-sm font-bold text-[#1B5E20]">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top TN Colleges */}
          <div className="bg-[#E8F5E9] rounded-xl p-3 border border-[#A5D6A7]">
            <h4 className="text-sm font-semibold text-[#1B5E20] mb-2 flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" /> Top TN Colleges
            </h4>
            <div className="space-y-1.5">
              {data.topCollegesTN.map((college, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <span className="text-xs text-[#2E7D32] font-bold">{idx + 1}.</span>
                  <span className="text-[#374151]">{college}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
