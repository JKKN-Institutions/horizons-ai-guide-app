import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, TrendingUp, Laptop, Heart, Cog, Building2, ShoppingCart,
  Star, Briefcase, GraduationCap, FileText, BookOpen, Target, Users,
  MessageSquare, Lightbulb, RefreshCw, Puzzle, Handshake, Shield, Cloud,
  Database, Code, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Sector Data
const sectors = [
  {
    id: 'technology',
    icon: Laptop,
    title: 'Technology & IT Services',
    titleTamil: 'தொழில்நுட்பம் & ஐடி சேவைகள்',
    borderColor: '#2196F3',
    badge: '🔥 Highest Demand',
    badgeColor: 'bg-red-500',
    subSectors: ['Artificial Intelligence & ML (AI/ML)', 'Cloud Computing', 'Cybersecurity', 'Data Science & Analytics'],
    salaryRange: '₹4 LPA - ₹25 LPA (Entry to Mid)',
    companies: ['TCS', 'Infosys', 'Wipro', 'HCL', 'Cognizant', 'Zoho', 'Freshworks'],
    courses: ['B.E/B.Tech Computer Science', 'B.E/B.Tech IT', 'BCA + MCA', 'B.Sc Computer Science'],
    colleges: ['IIT Madras', 'NIT Trichy', 'Anna University', 'VIT Vellore', 'SRM Chennai', 'JKKN Engineering ⭐'],
    careerPaths: [
      'Software Developer → Senior Developer → Tech Lead → Architect',
      'Data Analyst → Data Scientist → ML Engineer → AI Lead'
    ]
  },
  {
    id: 'healthcare',
    icon: Heart,
    title: 'Healthcare & Life Sciences',
    titleTamil: 'சுகாதாரம் & உயிரியல் அறிவியல்',
    borderColor: '#4CAF50',
    badge: '📈 Growing Fast',
    badgeColor: 'bg-green-500',
    subSectors: ['Pharmaceuticals', 'Biotechnology', 'Telemedicine', 'Healthcare IT'],
    salaryRange: '₹3 LPA - ₹20 LPA',
    companies: ['Sun Pharma', 'Cipla', "Dr. Reddy's", 'Biocon', 'Apollo', 'Fortis'],
    courses: ['MBBS / BDS', 'B.Pharm / Pharm.D', 'B.Sc Nursing', 'B.Sc Biotechnology', 'Allied Health Sciences'],
    colleges: ['Madras Medical College', 'JKKN College of Pharmacy ⭐', 'JKKN College of Nursing ⭐', 'JKKN Allied Health Sciences ⭐'],
    careerPaths: [
      'Pharmacist → Clinical Research → Drug Safety → R&D Lead',
      'Nurse → Senior Nurse → Nursing Supervisor → Healthcare Manager'
    ]
  },
  {
    id: 'manufacturing',
    icon: Cog,
    title: 'Manufacturing & Engineering',
    titleTamil: 'உற்பத்தி & பொறியியல்',
    borderColor: '#FF9800',
    badge: '🌟 Emerging',
    badgeColor: 'bg-amber-500',
    subSectors: ['Electric Vehicles (EV) 🔋', 'Renewable Energy ☀️', 'Semiconductors', 'Aerospace & Defence'],
    salaryRange: '₹4 LPA - ₹18 LPA',
    companies: ['Tata Motors', 'Mahindra', 'Ola Electric', 'L&T', 'BHEL', 'HAL', 'ISRO'],
    courses: ['B.E Mechanical Engineering', 'B.E Electrical Engineering', 'B.E Electronics', 'B.E Automobile Engineering'],
    colleges: ['IIT Madras', 'NIT Trichy', 'Anna University', 'PSG Tech Coimbatore', 'JKKN Engineering ⭐'],
    careerPaths: [
      'Graduate Engineer → Senior Engineer → Project Manager → Director',
      'EV Technician → EV Engineer → Design Lead → R&D Head'
    ],
    whyGrowing: ["India's EV push (30% by 2030)", 'Make in India initiative', 'Semiconductor fabs coming to India', 'Defence indigenization']
  },
  {
    id: 'bfsi',
    icon: Building2,
    title: 'BFSI - Banking & Finance',
    titleTamil: 'வங்கி & நிதி சேவைகள்',
    borderColor: '#9C27B0',
    badge: '💰 High Paying',
    badgeColor: 'bg-purple-500',
    subSectors: ['Fintech 📱', 'Digital Banking', 'InsurTech', 'Wealth Management'],
    salaryRange: '₹3.5 LPA - ₹20 LPA',
    companies: ['HDFC', 'ICICI', 'SBI', 'Paytm', 'PhonePe', 'Razorpay', 'Zerodha', 'PolicyBazaar'],
    courses: ['B.Com / B.Com (Hons)', 'BBA Finance', 'CA / CS / CMA', 'B.Sc Economics', 'MBA Finance'],
    colleges: ['Loyola College Chennai', 'Madras Christian College', 'JKKN Arts & Science College ⭐'],
    careerPaths: [
      'Analyst → Senior Analyst → Manager → VP Finance',
      'CA Intern → CA → CFO'
    ],
    whyGrowing: ['Digital India push', 'UPI revolution', 'Fintech startups boom', 'Insurance penetration increasing']
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-commerce & Retail',
    titleTamil: 'இ-காமர்ஸ் & சில்லறை வணிகம்',
    borderColor: '#E91E63',
    badge: '🚀 Booming',
    badgeColor: 'bg-pink-500',
    subSectors: ['Quick Commerce (10-min delivery)', 'Supply Chain & Logistics', 'D2C Brands', 'Warehouse Management'],
    salaryRange: '₹3 LPA - ₹15 LPA',
    companies: ['Amazon', 'Flipkart', 'Meesho', 'Swiggy', 'Zomato', 'BigBasket', 'Zepto', 'Blinkit'],
    courses: ['BBA', 'B.Com', 'MBA Operations', 'B.Tech + MBA'],
    colleges: ['IIM Bangalore', 'IIM Calcutta', 'XLRI', 'JKKN Arts & Science College ⭐'],
    careerPaths: [
      'Operations Exec → Team Lead → Manager → Regional Head',
      'Supply Chain Analyst → Manager → Director'
    ],
    whyGrowing: ["India's internet users growing", 'Tier 2/3 city demand', 'Quick commerce revolution', 'Rural e-commerce expanding']
  }
];

// Technical Skills Data
const technicalSkills = [
  { name: 'AI/ML & Generative AI', description: 'ChatGPT, Claude, Gemini understanding, Prompt Engineering, AI tool integration', demand: 95 },
  { name: 'Cloud Architecture', description: 'AWS (Amazon Web Services), Microsoft Azure, Google Cloud Platform (GCP)', demand: 90 },
  { name: 'Cybersecurity', description: 'Network Security, Ethical Hacking, Security Compliance', demand: 85 },
  { name: 'Data Engineering & Analytics', description: 'Python, SQL, Power BI, Tableau, Big Data tools', demand: 88 },
  { name: 'Full-Stack Development', description: 'Frontend: React, Angular, Vue | Backend: Node.js, Python, Java | DBs: MongoDB, PostgreSQL', demand: 82 },
];

// Soft Skills Data
const softSkills = [
  { name: 'Communication', description: 'English fluency, Presentation skills, Written communication', importance: 95 },
  { name: 'Leadership', description: 'Team management, Decision making, Conflict resolution', importance: 85 },
  { name: 'Problem Solving', description: 'Critical thinking, Analytical ability, Creative solutions', importance: 92 },
  { name: 'Adaptability', description: 'Learning new tools, Handling change, Flexibility', importance: 88 },
  { name: 'Teamwork', description: 'Collaboration, Remote work skills, Cross-functional work', importance: 80 },
];

// Stream Roadmaps
const streamRoadmaps = {
  pcm: {
    title: 'PCM (Maths Group) Students',
    careerPaths: ['Software Engineering', 'Data Science', 'Cloud Computing', 'EV & Renewable Energy', 'Aerospace'],
    courses: ['B.E/B.Tech CS/IT', 'B.E/B.Tech ECE/EEE', 'B.Sc Computer Science'],
    skillsRoadmap: [
      { year: 'Year 1', skills: 'Programming basics (Python, C++)' },
      { year: 'Year 2', skills: 'Data Structures, Web Development' },
      { year: 'Year 3', skills: 'Cloud, AI/ML basics' },
      { year: 'Year 4', skills: 'Specialization + Internship' },
    ]
  },
  pcb: {
    title: 'PCB (Biology Group) Students',
    careerPaths: ['Healthcare Professional', 'Pharmaceutical Industry', 'Biotechnology', 'Healthcare IT'],
    courses: ['MBBS / BDS', 'B.Pharm', 'B.Sc Nursing', 'B.Sc Biotechnology'],
    skillsRoadmap: [
      { year: 'Year 1', skills: 'Biology fundamentals, Lab skills' },
      { year: 'Year 2', skills: 'Clinical knowledge' },
      { year: 'Year 3', skills: 'Research methodology' },
      { year: 'Year 4', skills: 'Specialization + Internship' },
    ]
  },
  commerce: {
    title: 'Commerce Students',
    careerPaths: ['Fintech', 'Banking & Finance', 'Chartered Accountancy', 'Business Analytics'],
    courses: ['B.Com + CA/CS', 'BBA Finance', 'B.Com Banking'],
    skillsRoadmap: [
      { year: 'Year 1', skills: 'Accounting, Excel, Tally' },
      { year: 'Year 2', skills: 'Financial analysis, Taxation' },
      { year: 'Year 3', skills: 'Fintech tools, Data analysis' },
      { year: 'Year 4', skills: 'Professional certification' },
    ]
  },
  arts: {
    title: 'Arts Students',
    careerPaths: ['Digital Marketing', 'Content Creation', 'UI/UX Design', 'HR & Management'],
    courses: ['BA + MBA', 'BA Mass Communication', 'BBA'],
    skillsRoadmap: [
      { year: 'Year 1', skills: 'Communication, Basic digital tools' },
      { year: 'Year 2', skills: 'Marketing, Social media' },
      { year: 'Year 3', skills: 'Analytics, Design thinking' },
      { year: 'Year 4', skills: 'Leadership + Internship' },
    ]
  }
};

// Salary Data
const salaryData = [
  { industry: 'Technology & IT', entryLevel: '₹4-8 LPA', fiveYearsExp: '₹15-30 LPA', icon: '💻' },
  { industry: 'AI/ML Specialist', entryLevel: '₹8-15 LPA', fiveYearsExp: '₹25-50 LPA', icon: '🤖' },
  { industry: 'Healthcare', entryLevel: '₹3-6 LPA', fiveYearsExp: '₹10-25 LPA', icon: '🏥' },
  { industry: 'Pharma', entryLevel: '₹3-5 LPA', fiveYearsExp: '₹8-18 LPA', icon: '💊' },
  { industry: 'Manufacturing', entryLevel: '₹4-7 LPA', fiveYearsExp: '₹12-22 LPA', icon: '⚙️' },
  { industry: 'EV Industry', entryLevel: '₹5-9 LPA', fiveYearsExp: '₹15-28 LPA', icon: '🔋' },
  { industry: 'BFSI', entryLevel: '₹3.5-7 LPA', fiveYearsExp: '₹12-25 LPA', icon: '🏦' },
  { industry: 'E-commerce', entryLevel: '₹3-6 LPA', fiveYearsExp: '₹10-20 LPA', icon: '🛒' },
];

const IndustryTrends = () => {
  const navigate = useNavigate();
  const [selectedStream, setSelectedStream] = useState<keyof typeof streamRoadmaps>('pcm');

  const getSkillIcon = (index: number) => {
    const icons = [Lightbulb, Cloud, Shield, Database, Code];
    return icons[index] || Lightbulb;
  };

  const getSoftSkillIcon = (index: number) => {
    const icons = [MessageSquare, Users, Puzzle, RefreshCw, Handshake];
    return icons[index] || MessageSquare;
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, hsl(153 40% 95%) 0%, hsl(153 35% 93%) 25%, hsl(48 100% 94%) 50%, hsl(153 35% 93%) 75%, hsl(153 40% 95%) 100%)' }}>
      {/* Page Header */}
      <header 
        className="py-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, hsl(153 69% 33%) 0%, hsl(163 64% 26%) 50%, hsl(153 79% 22%) 100%)' }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10 mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              🚀 India's Job Market 2026 - Career Trends
            </h1>
            <p className="text-lg md:text-xl text-amber-300 font-tamil mb-4">
              இந்தியாவின் வேலை வாய்ப்பு 2026 - தொழில் போக்குகள்
            </p>
            <p className="text-white/90 text-lg mb-2">Know which industries are hiring & skills you need</p>
            <p className="text-amber-200 font-tamil">எந்த துறைகள் வேலை வழங்குகின்றன என்பதை அறியுங்கள்</p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: '📈', value: '5 Top', label: 'Sectors' },
              { icon: '🎯', value: '15+', label: 'Skills' },
              { icon: '💼', value: 'Lakhs of', label: 'New Jobs' },
              { icon: '🌟', value: 'Future', label: 'Ready' },
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Section 1: High Growth Sectors */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'hsl(153 79% 22%)' }}>
              🔥 Sectors with High Hiring Growth
            </h2>
            <p className="text-amber-700 font-tamil mt-2">அதிக வேலை வளர்ச்சி உள்ள துறைகள்</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <Card 
                  key={sector.id} 
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
                  style={{ borderLeft: `4px solid ${sector.borderColor}` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-3 rounded-xl"
                          style={{ backgroundColor: `${sector.borderColor}15` }}
                        >
                          <Icon className="h-6 w-6" style={{ color: sector.borderColor }} />
                        </div>
                        <div>
                          <CardTitle className="text-lg" style={{ color: 'hsl(153 79% 22%)' }}>
                            {sector.title}
                          </CardTitle>
                          <p className="text-sm text-amber-700 font-tamil">{sector.titleTamil}</p>
                        </div>
                      </div>
                      <Badge className={`${sector.badgeColor} text-white text-xs`}>
                        {sector.badge}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Sub-sectors */}
                    <div className="flex flex-wrap gap-2">
                      {sector.subSectors.map((sub, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-gray-300">
                          {sub}
                        </Badge>
                      ))}
                    </div>

                    {/* Salary Range */}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold" style={{ color: sector.borderColor }}>💰 Salary:</span>
                      <span className="text-gray-700">{sector.salaryRange}</span>
                    </div>

                    {/* Top Companies */}
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-2">Top Companies Hiring:</p>
                      <p className="text-sm text-gray-700">{sector.companies.join(' | ')}</p>
                    </div>

                    {/* Courses */}
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-2">Courses to Consider:</p>
                      <div className="flex flex-wrap gap-1">
                        {sector.courses.map((course, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-gray-100">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* TN Colleges */}
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-2">TN Colleges:</p>
                      <p className="text-sm text-gray-700">{sector.colleges.join(' | ')}</p>
                    </div>

                    {/* Career Paths */}
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-2">Career Paths:</p>
                      {sector.careerPaths.map((path, i) => (
                        <p key={i} className="text-xs text-gray-600 flex items-center gap-1">
                          <ChevronRight className="h-3 w-3" style={{ color: sector.borderColor }} />
                          {path}
                        </p>
                      ))}
                    </div>

                    {/* Why Growing (if available) */}
                    {sector.whyGrowing && (
                      <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="text-sm font-semibold text-amber-800 mb-2">Why Growing:</p>
                        <ul className="text-xs text-amber-700 space-y-1">
                          {sector.whyGrowing.map((reason, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <Star className="h-3 w-3 text-amber-500" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Section 2: Skills That Matter */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'hsl(153 79% 22%)' }}>
              🎯 Skills That Will Matter Most in 2026
            </h2>
            <p className="text-amber-700 font-tamil mt-2">2026-ல் மிக முக்கியமான திறன்கள்</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Technical Skills */}
            <Card className="bg-white">
              <CardHeader className="border-b" style={{ backgroundColor: 'hsl(153 40% 95%)' }}>
                <CardTitle className="text-lg flex items-center gap-2" style={{ color: 'hsl(153 79% 22%)' }}>
                  <Code className="h-5 w-5" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                {technicalSkills.map((skill, index) => {
                  const Icon = getSkillIcon(index);
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: 'hsl(153 40% 95%)' }}>
                          <Icon className="h-4 w-4" style={{ color: 'hsl(153 79% 22%)' }} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm" style={{ color: 'hsl(153 79% 22%)' }}>{skill.name}</h4>
                          <p className="text-xs text-gray-600">{skill.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-16">Demand:</span>
                        <div className="flex-1">
                          <Progress value={skill.demand} className="h-2" />
                        </div>
                        <span className="text-xs font-semibold" style={{ color: 'hsl(153 79% 22%)' }}>{skill.demand}%</span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Soft Skills */}
            <Card className="bg-white">
              <CardHeader className="border-b" style={{ backgroundColor: 'hsl(48 100% 94%)' }}>
                <CardTitle className="text-lg flex items-center gap-2 text-amber-800">
                  <Users className="h-5 w-5" />
                  Soft Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                {softSkills.map((skill, index) => {
                  const Icon = getSoftSkillIcon(index);
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-amber-50">
                          <Icon className="h-4 w-4 text-amber-700" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-amber-800">{skill.name}</h4>
                          <p className="text-xs text-gray-600">{skill.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-16">Importance:</span>
                        <div className="flex-1">
                          <Progress value={skill.importance} className="h-2 [&>div]:bg-amber-500" />
                        </div>
                        <span className="text-xs font-semibold text-amber-700">{skill.importance}%</span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 3: Skill Roadmap by Stream */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'hsl(153 79% 22%)' }}>
              📍 Your Skill Roadmap Based on 12th Stream
            </h2>
            <p className="text-amber-700 font-tamil mt-2">உங்கள் 12-ஆம் வகுப்பு பிரிவின் அடிப்படையில் திறன் வழிகாட்டி</p>
          </div>

          <Card className="bg-white overflow-hidden">
            <Tabs value={selectedStream} onValueChange={(v) => setSelectedStream(v as keyof typeof streamRoadmaps)}>
              <TabsList className="w-full justify-start rounded-none border-b bg-gray-50 h-auto flex-wrap">
                <TabsTrigger value="pcm" className="data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-3">
                  PCM (Maths)
                </TabsTrigger>
                <TabsTrigger value="pcb" className="data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-3">
                  PCB (Biology)
                </TabsTrigger>
                <TabsTrigger value="commerce" className="data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-3">
                  Commerce
                </TabsTrigger>
                <TabsTrigger value="arts" className="data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-3">
                  Arts
                </TabsTrigger>
              </TabsList>

              {Object.entries(streamRoadmaps).map(([key, data]) => (
                <TabsContent key={key} value={key} className="p-6 space-y-6 mt-0">
                  <h3 className="text-xl font-bold" style={{ color: 'hsl(153 79% 22%)' }}>{data.title}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Career Paths */}
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'hsl(153 79% 22%)' }}>
                        <Target className="h-4 w-4" />
                        Best Career Paths
                      </h4>
                      <ul className="space-y-2">
                        {data.careerPaths.map((path, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                            <ChevronRight className="h-3 w-3 text-green-600" />
                            {path}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommended Courses */}
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'hsl(153 79% 22%)' }}>
                        <BookOpen className="h-4 w-4" />
                        Recommended Courses
                      </h4>
                      <ul className="space-y-2">
                        {data.courses.map((course, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                            <ChevronRight className="h-3 w-3 text-amber-600" />
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills Roadmap */}
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'hsl(153 79% 22%)' }}>
                        <GraduationCap className="h-4 w-4" />
                        Skills to Learn
                      </h4>
                      <div className="space-y-3">
                        {data.skillsRoadmap.map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Badge variant="outline" className="text-xs shrink-0" style={{ borderColor: 'hsl(153 79% 22%)', color: 'hsl(153 79% 22%)' }}>
                              {item.year}
                            </Badge>
                            <span className="text-xs text-gray-700">{item.skills}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        </section>

        {/* Section 4: Salary Insights */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'hsl(153 79% 22%)' }}>
              💰 Expected Salaries by Industry (2026)
            </h2>
            <p className="text-amber-700 font-tamil mt-2">துறை வாரியாக எதிர்பார்க்கப்படும் சம்பளம்</p>
          </div>

          <Card className="bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: 'hsl(153 40% 95%)' }}>
                    <TableHead className="font-bold" style={{ color: 'hsl(153 79% 22%)' }}>Industry</TableHead>
                    <TableHead className="font-bold" style={{ color: 'hsl(153 79% 22%)' }}>Entry Level</TableHead>
                    <TableHead className="font-bold" style={{ color: 'hsl(153 79% 22%)' }}>5 Years Experience</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salaryData.map((row, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <span className="mr-2">{row.icon}</span>
                        {row.industry}
                      </TableCell>
                      <TableCell className="text-gray-700">{row.entryLevel}</TableCell>
                      <TableCell className="font-semibold" style={{ color: 'hsl(153 79% 22%)' }}>{row.fiveYearsExp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 border-t bg-amber-50">
              <p className="text-sm text-center text-amber-800">
                <strong>Note:</strong> LPA = Lakhs Per Annum | சம்பளம் அனுபவம் மற்றும் நிறுவனத்தைப் பொறுத்து மாறுபடும்
              </p>
            </div>
          </Card>
        </section>

        {/* Section 5: Action Buttons */}
        <section className="pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className="bg-white hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
              onClick={() => navigate('/career-assessment/12th-learners')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'hsl(153 40% 95%)' }}>
                  <Target className="h-8 w-8" style={{ color: 'hsl(153 79% 22%)' }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'hsl(153 79% 22%)' }}>Take Career Assessment</h3>
                <p className="text-sm text-gray-600 mb-4">Discover your ideal career path with AI guidance</p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Start Now
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="bg-white hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
              onClick={() => navigate('/college-search')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-amber-50">
                  <Building2 className="h-8 w-8 text-amber-700" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-amber-800">Find Colleges</h3>
                <p className="text-sm text-gray-600 mb-4">Explore top colleges in Tamil Nadu</p>
                <Button variant="outline" className="w-full border-amber-500 text-amber-700 hover:bg-amber-50">
                  Explore
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="bg-white hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
              onClick={() => navigate('/entrance-exams')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-blue-50">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-blue-800">Check Entrance Exams</h3>
                <p className="text-sm text-gray-600 mb-4">View all entrance exams and deadlines</p>
                <Button variant="outline" className="w-full border-blue-500 text-blue-700 hover:bg-blue-50">
                  View All
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IndustryTrends;