import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, TrendingUp, Target, Briefcase, Star, Laptop, 
  Heart, Cog, Building2, ShoppingCart, Brain, Cloud, Shield,
  Database, Code, MessageSquare, Users, Lightbulb, RefreshCw, Handshake,
  Download, MapPin, Banknote, Search, X, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateIndustryTrendsPDF } from './generateIndustryTrendsPDF';
import { useToast } from '@/hooks/use-toast';

// Sector data with all details
const sectors = [
  {
    id: 'tech',
    icon: '💻',
    borderColor: '#2196F3',
    badge: '🔥 Highest Demand',
    badgeVariant: 'destructive' as const,
    title: 'Technology & IT Services',
    tamilTitle: 'தொழில்நுட்பம் & ஐடி சேவைகள்',
    subSectors: ['Artificial Intelligence & ML (AI/ML)', 'Cloud Computing', 'Cybersecurity', 'Data Science & Analytics'],
    salaryRange: '₹4 LPA - ₹25 LPA (Entry to Mid)',
    topCompanies: ['TCS', 'Infosys', 'Wipro', 'HCL', 'Cognizant', 'Zoho', 'Freshworks'],
    courses: ['B.E/B.Tech Computer Science', 'B.E/B.Tech IT', 'BCA + MCA', 'B.Sc Computer Science'],
    colleges: ['IIT Madras', 'NIT Trichy', 'Anna University', 'VIT Vellore', 'SRM Chennai', 'JKKN Engineering ⭐'],
    careerPaths: [
      'Software Developer → Senior Developer → Tech Lead → Architect',
      'Data Analyst → Data Scientist → ML Engineer → AI Lead'
    ]
  },
  {
    id: 'healthcare',
    icon: '🏥',
    borderColor: '#4CAF50',
    badge: '📈 Growing Fast',
    badgeVariant: 'secondary' as const,
    title: 'Healthcare & Life Sciences',
    tamilTitle: 'சுகாதாரம் & உயிரியல் அறிவியல்',
    subSectors: ['Pharmaceuticals', 'Biotechnology', 'Telemedicine', 'Healthcare IT'],
    salaryRange: '₹3 LPA - ₹20 LPA',
    topCompanies: ['Sun Pharma', 'Cipla', "Dr. Reddy's", 'Biocon', 'Apollo', 'Fortis'],
    courses: ['MBBS / BDS', 'B.Pharm / Pharm.D', 'B.Sc Nursing', 'B.Sc Biotechnology', 'Allied Health Sciences'],
    colleges: ['Madras Medical College', 'JKKN College of Pharmacy ⭐', 'JKKN College of Nursing ⭐', 'JKKN Allied Health Sciences ⭐'],
    careerPaths: [
      'Pharmacist → Clinical Research → Drug Safety → R&D Lead',
      'Nurse → Senior Nurse → Nursing Supervisor → Healthcare Manager'
    ]
  },
  {
    id: 'manufacturing',
    icon: '⚙️',
    borderColor: '#FF9800',
    badge: '🌟 Emerging',
    badgeVariant: 'outline' as const,
    title: 'Manufacturing & Engineering',
    tamilTitle: 'உற்பத்தி & பொறியியல்',
    subSectors: ['Electric Vehicles (EV) 🔋', 'Renewable Energy ☀️', 'Semiconductors', 'Aerospace & Defence'],
    salaryRange: '₹4 LPA - ₹18 LPA',
    topCompanies: ['Tata Motors', 'Mahindra', 'Ola Electric', 'L&T', 'BHEL', 'HAL', 'ISRO'],
    courses: ['B.E Mechanical Engineering', 'B.E Electrical Engineering', 'B.E Electronics', 'B.E Automobile Engineering'],
    colleges: ['IIT Madras', 'NIT Trichy', 'Anna University', 'PSG Tech Coimbatore', 'JKKN Engineering ⭐'],
    careerPaths: [
      'Graduate Engineer → Senior Engineer → Project Manager → Director',
      'EV Technician → EV Engineer → Design Lead → R&D Head'
    ],
    whyGrowing: [
      "India's EV push (30% by 2030)",
      'Make in India initiative',
      'Semiconductor fabs coming to India',
      'Defence indigenization'
    ]
  },
  {
    id: 'bfsi',
    icon: '🏦',
    borderColor: '#9C27B0',
    badge: '💰 High Paying',
    badgeVariant: 'default' as const,
    title: 'BFSI - Banking & Finance',
    tamilTitle: 'வங்கி & நிதி சேவைகள்',
    subSectors: ['Fintech 📱', 'Digital Banking', 'InsurTech', 'Wealth Management'],
    salaryRange: '₹3.5 LPA - ₹20 LPA',
    topCompanies: ['HDFC', 'ICICI', 'SBI', 'Paytm', 'PhonePe', 'Razorpay', 'Zerodha', 'PolicyBazaar'],
    courses: ['B.Com / B.Com (Hons)', 'BBA Finance', 'CA / CS / CMA', 'B.Sc Economics', 'MBA Finance'],
    colleges: ['Loyola College Chennai', 'Madras Christian College', 'JKKN Arts & Science College ⭐'],
    careerPaths: [
      'Analyst → Senior Analyst → Manager → VP Finance',
      'CA Intern → CA → CFO'
    ],
    whyGrowing: [
      'Digital India push',
      'UPI revolution',
      'Fintech startups boom',
      'Insurance penetration increasing'
    ]
  },
  {
    id: 'ecommerce',
    icon: '🛒',
    borderColor: '#E91E63',
    badge: '🚀 Booming',
    badgeVariant: 'destructive' as const,
    title: 'E-commerce & Retail',
    tamilTitle: 'இ-காமர்ஸ் & சில்லறை வணிகம்',
    subSectors: ['Quick Commerce (10-min delivery)', 'Supply Chain & Logistics', 'D2C Brands', 'Warehouse Management'],
    salaryRange: '₹3 LPA - ₹15 LPA',
    topCompanies: ['Amazon', 'Flipkart', 'Meesho', 'Swiggy', 'Zomato', 'BigBasket', 'Zepto', 'Blinkit'],
    courses: ['BBA', 'B.Com', 'MBA Operations', 'B.Tech + MBA'],
    colleges: ['JKKN Arts & Science College ⭐', 'Loyola College Chennai', 'Christ University'],
    careerPaths: [
      'Operations Exec → Team Lead → Manager → Regional Head',
      'Supply Chain Analyst → Manager → Director'
    ],
    whyGrowing: [
      "India's internet users growing",
      'Tier 2/3 city demand',
      'Quick commerce revolution',
      'Rural e-commerce expanding'
    ]
  },
  {
    id: 'logistics',
    icon: '🚚',
    borderColor: '#607D8B',
    badge: '📦 Expanding',
    badgeVariant: 'secondary' as const,
    title: 'Logistics & Supply Chain',
    tamilTitle: 'தளவாடம் & விநியோகச் சங்கிலி',
    subSectors: ['Warehousing', 'Last Mile Delivery', 'Cold Chain', 'Fleet Management'],
    salaryRange: '₹3 LPA - ₹18 LPA',
    topCompanies: ['Delhivery', 'Blue Dart', 'Ecom Express', 'Rivigo', 'Amazon Logistics', 'XpressBees'],
    courses: ['MBA Logistics', 'BBA Supply Chain', 'B.Tech Industrial Engineering'],
    colleges: ['IIM Bangalore', 'NITIE Mumbai', 'JKKN Arts & Science College ⭐'],
    careerPaths: [
      'Operations Executive → Manager → Regional Head → VP Operations',
      'Supply Chain Analyst → Planning Manager → Director'
    ],
    whyGrowing: [
      'E-commerce boom driving demand',
      'Quick commerce revolution',
      'Make in India supply chains',
      'Infrastructure development'
    ]
  },
  {
    id: 'gaming',
    icon: '🎮',
    borderColor: '#9C27B0',
    badge: '🔥 Hot Industry',
    badgeVariant: 'destructive' as const,
    title: 'Gaming & Esports',
    tamilTitle: 'கேமிங் & ஈஸ்போர்ட்ஸ்',
    subSectors: ['Mobile Gaming', 'Esports', 'Game Development', 'VR/AR Gaming'],
    salaryRange: '₹4 LPA - ₹25 LPA',
    topCompanies: ['Games24x7', 'Nazara', 'Dream11', 'MPL', 'Zynga India', 'Ubisoft'],
    courses: ['B.Tech Game Development', 'B.Des Animation', 'BCA + Game Design'],
    colleges: ['DSK Supinfocom', 'MIT Institute of Design', 'Whistling Woods'],
    careerPaths: [
      'Junior Developer → Game Developer → Lead Developer → Technical Director',
      'Game Tester → QA Lead → Production Manager'
    ],
    whyGrowing: [
      'India 2nd largest gaming market',
      'Mobile gaming explosion',
      'Esports investment growing',
      'Youth demographic advantage'
    ]
  },
  {
    id: 'agritech',
    icon: '🌾',
    borderColor: '#4CAF50',
    badge: '🌱 Emerging',
    badgeVariant: 'outline' as const,
    title: 'AgriTech & Food Tech',
    tamilTitle: 'வேளாண் தொழில்நுட்பம்',
    subSectors: ['Precision Farming', 'Agri Marketplaces', 'Food Processing', 'Smart Irrigation'],
    salaryRange: '₹3 LPA - ₹20 LPA',
    topCompanies: ['DeHaat', 'Ninjacart', 'CropIn', 'BigBasket', 'Stellapps', 'AgroStar'],
    courses: ['B.Sc Agriculture', 'B.Tech Agricultural Engineering', 'MBA Agribusiness'],
    colleges: ['TNAU Coimbatore', 'ICAR Institutions', 'JKKN Arts & Science College ⭐'],
    careerPaths: [
      'Field Officer → Area Manager → Regional Head → Business Head',
      'Agri Data Analyst → Data Scientist → AI Lead'
    ],
    whyGrowing: [
      '60% workforce in agriculture',
      'Government push for farm tech',
      'Startup funding increasing',
      'Climate tech integration'
    ]
  },
  {
    id: 'edtech',
    icon: '📚',
    borderColor: '#3F51B5',
    badge: '📈 Growing',
    badgeVariant: 'secondary' as const,
    title: 'EdTech & Online Learning',
    tamilTitle: 'கல்வி தொழில்நுட்பம்',
    subSectors: ['K-12 Learning', 'Test Prep', 'Skill Development', 'Corporate Training'],
    salaryRange: '₹4 LPA - ₹22 LPA',
    topCompanies: ["BYJU'S", 'Unacademy', 'Vedantu', 'upGrad', 'Physics Wallah', 'Simplilearn'],
    courses: ['B.Ed', 'M.Ed', 'MBA Education', 'B.Tech + Education'],
    colleges: ['IGNOU', 'Regional Institutes of Education', 'JKKN Education College ⭐'],
    careerPaths: [
      'Content Creator → Subject Expert → Content Head',
      'EdTech Sales → Team Lead → Regional Manager → VP Sales'
    ],
    whyGrowing: [
      'Digital learning adoption',
      'Upskilling demand',
      'Hybrid learning models',
      'Tier 2/3 city reach'
    ]
  },
  {
    id: 'renewable',
    icon: '☀️',
    borderColor: '#FF9800',
    badge: '🌍 Sustainable',
    badgeVariant: 'default' as const,
    title: 'Renewable Energy & CleanTech',
    tamilTitle: 'புதுப்பிக்கத்தக்க எரிசக்தி',
    subSectors: ['Solar Power', 'Wind Energy', 'Energy Storage', 'Green Hydrogen'],
    salaryRange: '₹4 LPA - ₹22 LPA',
    topCompanies: ['Adani Green', 'Tata Power Solar', 'ReNew Power', 'Suzlon', 'Azure Power'],
    courses: ['B.Tech Renewable Energy', 'B.Tech Electrical', 'M.Tech Energy Systems'],
    colleges: ['IIT Delhi', 'TERI University', 'NIT Trichy', 'JKKN Engineering ⭐'],
    careerPaths: [
      'Site Engineer → Project Manager → Program Director',
      'Energy Analyst → Consultant → Strategy Lead'
    ],
    whyGrowing: [
      'India 500 GW renewable target by 2030',
      'Global sustainability push',
      'Green financing growth',
      'Carbon neutrality commitments'
    ]
  }
];

// Technical skills data
const technicalSkills = [
  { name: '🤖 AI/ML & Generative AI', description: 'ChatGPT, Claude, Gemini understanding, Prompt Engineering, AI tool integration', demand: 95 },
  { name: '☁️ Cloud Architecture', description: 'AWS, Microsoft Azure, Google Cloud Platform (GCP)', demand: 90 },
  { name: '🔒 Cybersecurity', description: 'Network Security, Ethical Hacking, Security Compliance', demand: 85 },
  { name: '📊 Data Engineering & Analytics', description: 'Python, SQL, Power BI, Tableau, Big Data tools', demand: 88 },
  { name: '💻 Full-Stack Development', description: 'React, Angular, Vue (Frontend), Node.js, Python, Java (Backend)', demand: 82 }
];

// Soft skills data
const softSkills = [
  { name: '🗣️ Communication', description: 'English fluency, Presentation skills, Written communication', importance: 95 },
  { name: '👥 Leadership', description: 'Team management, Decision making, Conflict resolution', importance: 85 },
  { name: '🧩 Problem Solving', description: 'Critical thinking, Analytical ability, Creative solutions', importance: 92 },
  { name: '🔄 Adaptability', description: 'Learning new tools, Handling change, Flexibility', importance: 88 },
  { name: '🤝 Teamwork', description: 'Collaboration, Remote work skills, Cross-functional work', importance: 80 }
];

// Stream roadmaps
const streamRoadmaps = {
  pcm: {
    title: 'PCM (Maths Group) Students',
    bestPaths: ['Software Engineering', 'Data Science', 'Cloud Computing', 'EV & Renewable Energy', 'Aerospace'],
    courses: ['B.E/B.Tech CS/IT', 'B.E/B.Tech ECE/EEE', 'B.Sc Computer Science'],
    skills: [
      'Year 1: Programming basics (Python, C++)',
      'Year 2: Data Structures, Web Development',
      'Year 3: Cloud, AI/ML basics',
      'Year 4: Specialization + Internship'
    ]
  },
  pcb: {
    title: 'PCB (Biology Group) Students',
    bestPaths: ['Healthcare Professional', 'Pharmaceutical Industry', 'Biotechnology', 'Healthcare IT'],
    courses: ['MBBS / BDS', 'B.Pharm', 'B.Sc Nursing', 'B.Sc Biotechnology'],
    skills: [
      'Year 1: Biology fundamentals, Lab skills',
      'Year 2: Clinical knowledge',
      'Year 3: Research methodology',
      'Year 4: Specialization + Internship'
    ]
  },
  commerce: {
    title: 'Commerce Students',
    bestPaths: ['Fintech', 'Banking & Finance', 'Chartered Accountancy', 'Business Analytics'],
    courses: ['B.Com + CA/CS', 'BBA Finance', 'B.Com Banking'],
    skills: [
      'Year 1: Accounting, Excel, Tally',
      'Year 2: Financial analysis, Taxation',
      'Year 3: Fintech tools, Data analysis',
      'Year 4: Professional certification'
    ]
  },
  arts: {
    title: 'Arts Students',
    bestPaths: ['Digital Marketing', 'Content Creation', 'UI/UX Design', 'HR & Management'],
    courses: ['BA + MBA', 'BA Mass Communication', 'BBA'],
    skills: [
      'Year 1: Communication, Basic digital tools',
      'Year 2: Marketing, Social media',
      'Year 3: Analytics, Design thinking',
      'Year 4: Leadership + Internship'
    ]
  }
};

// Salary data
const salaryData = [
  { industry: '💻 Technology & IT', icon: Laptop, entry: '₹4-8 LPA', experienced: '₹15-30 LPA' },
  { industry: '🤖 AI/ML Specialist', icon: Brain, entry: '₹8-15 LPA', experienced: '₹25-50 LPA' },
  { industry: '🏥 Healthcare', icon: Heart, entry: '₹3-6 LPA', experienced: '₹10-25 LPA' },
  { industry: '💊 Pharma', icon: Heart, entry: '₹3-5 LPA', experienced: '₹8-18 LPA' },
  { industry: '⚙️ Manufacturing', icon: Cog, entry: '₹4-7 LPA', experienced: '₹12-22 LPA' },
  { industry: '🔋 EV Industry', icon: Cog, entry: '₹5-9 LPA', experienced: '₹15-28 LPA' },
  { industry: '🏦 BFSI', icon: Building2, entry: '₹3.5-7 LPA', experienced: '₹12-25 LPA' },
  { industry: '🛒 E-commerce', icon: ShoppingCart, entry: '₹3-6 LPA', experienced: '₹10-20 LPA' }
];

// Job listings data mapped to sectors
const jobListings = [
  // Technology & IT
  { title: 'AI/ML Engineer', company: 'Infosys', location: 'Bangalore', salary: '₹8-15 LPA', requirement: 'B.Tech/M.Tech', sector: 'tech', isHot: true },
  { title: 'Data Scientist', company: 'Wipro', location: 'Hyderabad', salary: '₹10-18 LPA', requirement: 'M.Sc/M.Tech', sector: 'tech', isHot: true },
  { title: 'Cloud Architect', company: 'TCS', location: 'Chennai', salary: '₹12-22 LPA', requirement: 'B.Tech + AWS/Azure', sector: 'tech', isHot: true },
  { title: 'Full Stack Developer', company: 'Cognizant', location: 'Pune', salary: '₹6-12 LPA', requirement: 'B.Tech/BCA', sector: 'tech', isHot: false },
  { title: 'Cybersecurity Analyst', company: 'HCL', location: 'Noida', salary: '₹7-14 LPA', requirement: 'B.Tech + Certifications', sector: 'tech', isHot: true },
  
  // Healthcare
  { title: 'Clinical Research Associate', company: 'Apollo', location: 'Chennai', salary: '₹5-10 LPA', requirement: 'Life Sciences Degree', sector: 'healthcare', isHot: false },
  { title: 'Healthcare Data Analyst', company: 'Fortis', location: 'Delhi', salary: '₹6-12 LPA', requirement: 'B.Sc + Analytics', sector: 'healthcare', isHot: true },
  { title: 'Medical AI Developer', company: 'Practo', location: 'Bangalore', salary: '₹12-20 LPA', requirement: 'B.Tech + Healthcare', sector: 'healthcare', isHot: true },
  { title: 'Telemedicine Specialist', company: '1mg', location: 'Gurgaon', salary: '₹8-15 LPA', requirement: 'MBBS/Healthcare', sector: 'healthcare', isHot: false },
  
  // Manufacturing
  { title: 'EV Engineer', company: 'Tata Motors', location: 'Pune', salary: '₹8-16 LPA', requirement: 'B.Tech Mechanical/EV', sector: 'manufacturing', isHot: true },
  { title: 'Battery Systems Engineer', company: 'Ola Electric', location: 'Bangalore', salary: '₹10-18 LPA', requirement: 'B.Tech + Battery Tech', sector: 'manufacturing', isHot: true },
  { title: 'Renewable Energy Engineer', company: 'Adani Green', location: 'Ahmedabad', salary: '₹8-15 LPA', requirement: 'B.Tech Electrical', sector: 'manufacturing', isHot: true },
  { title: 'Semiconductor Engineer', company: 'Intel', location: 'Bangalore', salary: '₹12-22 LPA', requirement: 'M.Tech VLSI', sector: 'manufacturing', isHot: true },
  
  // BFSI
  { title: 'FinTech Product Manager', company: 'Razorpay', location: 'Bangalore', salary: '₹18-30 LPA', requirement: 'MBA + Tech', sector: 'bfsi', isHot: true },
  { title: 'Investment Banking Analyst', company: 'ICICI Bank', location: 'Mumbai', salary: '₹12-20 LPA', requirement: 'MBA Finance', sector: 'bfsi', isHot: false },
  { title: 'Blockchain Developer', company: 'Polygon', location: 'Bangalore', salary: '₹20-35 LPA', requirement: 'B.Tech + Blockchain', sector: 'bfsi', isHot: true },
  { title: 'Risk Analyst', company: 'HDFC Bank', location: 'Mumbai', salary: '₹8-15 LPA', requirement: 'CA/CFA/MBA', sector: 'bfsi', isHot: false },
  
  // E-commerce
  { title: 'E-Commerce Manager', company: 'Amazon', location: 'Bangalore', salary: '₹15-28 LPA', requirement: 'MBA + E-Commerce', sector: 'ecommerce', isHot: true },
  { title: 'Supply Chain Analyst', company: 'Flipkart', location: 'Bangalore', salary: '₹8-15 LPA', requirement: 'MBA Operations', sector: 'ecommerce', isHot: false },
  { title: 'Quick Commerce Lead', company: 'Zepto', location: 'Mumbai', salary: '₹12-22 LPA', requirement: 'MBA + Operations', sector: 'ecommerce', isHot: true },
  
  // Logistics
  { title: 'Supply Chain Manager', company: 'Delhivery', location: 'Gurgaon', salary: '₹15-25 LPA', requirement: 'MBA Operations', sector: 'logistics', isHot: true },
  { title: 'Logistics Analyst', company: 'Blue Dart', location: 'Mumbai', salary: '₹6-12 LPA', requirement: 'B.Tech/MBA', sector: 'logistics', isHot: false },
  { title: 'Warehouse Operations Lead', company: 'Amazon Logistics', location: 'Bangalore', salary: '₹8-14 LPA', requirement: 'Any Graduate + Experience', sector: 'logistics', isHot: true },
  
  // Gaming
  { title: 'Game Developer', company: 'Games24x7', location: 'Mumbai', salary: '₹12-22 LPA', requirement: 'B.Tech + Unity/Unreal', sector: 'gaming', isHot: true },
  { title: 'Mobile Game Developer', company: 'MPL', location: 'Bangalore', salary: '₹15-28 LPA', requirement: 'B.Tech + Mobile Dev', sector: 'gaming', isHot: true },
  { title: 'Esports Manager', company: 'JetSynthesys', location: 'Pune', salary: '₹8-15 LPA', requirement: 'Sports Management', sector: 'gaming', isHot: true },
  
  // AgriTech
  { title: 'AgriTech Product Manager', company: 'DeHaat', location: 'Patna', salary: '₹12-22 LPA', requirement: 'MBA + AgriTech', sector: 'agritech', isHot: true },
  { title: 'Agricultural Data Scientist', company: 'Ninjacart', location: 'Bangalore', salary: '₹15-25 LPA', requirement: 'M.Sc + Data Science', sector: 'agritech', isHot: true },
  { title: 'IoT Engineer - Smart Farming', company: 'Stellapps', location: 'Bangalore', salary: '₹10-18 LPA', requirement: 'B.Tech + IoT', sector: 'agritech', isHot: false },
  
  // EdTech
  { title: 'EdTech Product Manager', company: 'Unacademy', location: 'Bangalore', salary: '₹15-25 LPA', requirement: 'MBA + EdTech', sector: 'edtech', isHot: true },
  { title: 'Curriculum Designer', company: "BYJU'S", location: 'Bangalore', salary: '₹8-14 LPA', requirement: 'M.Ed/MA Education', sector: 'edtech', isHot: false },
  { title: 'Learning Experience Designer', company: 'upGrad', location: 'Mumbai', salary: '₹10-18 LPA', requirement: 'MA/M.Ed', sector: 'edtech', isHot: true },
  
  // Renewable Energy
  { title: 'Solar Project Engineer', company: 'Adani Green', location: 'Ahmedabad', salary: '₹8-15 LPA', requirement: 'B.Tech Electrical', sector: 'renewable', isHot: true },
  { title: 'Wind Energy Specialist', company: 'Suzlon', location: 'Pune', salary: '₹10-18 LPA', requirement: 'B.Tech Mechanical', sector: 'renewable', isHot: true },
  { title: 'Sustainability Consultant', company: 'ReNew Power', location: 'Gurgaon', salary: '₹15-25 LPA', requirement: 'MBA + Sustainability', sector: 'renewable', isHot: false },
];

const IndustryTrends = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [expandedSector, setExpandedSector] = useState<string | null>(null);
  const [selectedJobSector, setSelectedJobSector] = useState<string>('all');
  const [jobSearchQuery, setJobSearchQuery] = useState('');

  const handleDownloadPDF = () => {
    generateIndustryTrendsPDF(sectors, streamRoadmaps, salaryData);
    toast({
      title: "PDF Downloaded",
      description: "Industry Trends report has been downloaded successfully!",
    });
  };

  const filteredJobs = jobListings.filter(job => {
    const matchesSector = selectedJobSector === 'all' || job.sector === selectedJobSector;
    const matchesSearch = jobSearchQuery === '' || 
      job.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(jobSearchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button 
              onClick={handleDownloadPDF}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
          
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              🚀 India's Job Market 2026 - Career Trends
            </h1>
            <p className="text-lg text-amber-300 font-medium">
              இந்தியாவின் வேலை வாய்ப்பு 2026 - தொழில் போக்குகள்
            </p>
            <p className="text-primary-foreground/90">
              Know which industries are hiring & skills you need
            </p>
            <p className="text-amber-300/80 text-sm">
              எந்த துறைகள் வேலை வழங்குகின்றன என்பதை அறியுங்கள்
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: '📈', value: '10 Top', label: 'Sectors' },
              { icon: '🎯', value: '15+', label: 'Skills' },
              { icon: '💼', value: 'Lakhs of', label: 'New Jobs' },
              { icon: '🌟', value: 'Future', label: 'Ready' }
            ].map((stat, idx) => (
              <Card key={idx} className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardContent className="p-4 text-center">
                  <span className="text-2xl">{stat.icon}</span>
                  <p className="font-bold text-lg text-primary-foreground">{stat.value}</p>
                  <p className="text-sm text-primary-foreground/80">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Section 1: High Growth Sectors */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center justify-center gap-2">
              🔥 Sectors with High Hiring Growth
            </h2>
            <p className="text-amber-600 dark:text-amber-400 mt-2 font-medium">
              அதிக வேலை வளர்ச்சி உள்ள துறைகள்
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sectors.map((sector) => (
              <Card 
                key={sector.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                style={{ borderLeft: `4px solid ${sector.borderColor}` }}
                onClick={() => setExpandedSector(expandedSector === sector.id ? null : sector.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{sector.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{sector.title}</CardTitle>
                        <p className="text-amber-600 dark:text-amber-400 text-sm font-medium">
                          {sector.tamilTitle}
                        </p>
                      </div>
                    </div>
                    <Badge variant={sector.badgeVariant} className="whitespace-nowrap">
                      {sector.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Sub-sectors */}
                  <div className="flex flex-wrap gap-2">
                    {sector.subSectors.map((sub, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {sub}
                      </Badge>
                    ))}
                  </div>

                  {/* Salary Range */}
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm font-medium">💰 Salary Range: <span className="text-primary">{sector.salaryRange}</span></p>
                  </div>

                  {/* Expanded Content */}
                  {expandedSector === sector.id && (
                    <div className="space-y-4 pt-4 border-t animate-in fade-in-50">
                      {/* Top Companies */}
                      <div>
                        <p className="font-semibold text-sm mb-2">🏢 Top Companies Hiring:</p>
                        <p className="text-sm text-muted-foreground">{sector.topCompanies.join(' | ')}</p>
                      </div>

                      {/* Courses */}
                      <div>
                        <p className="font-semibold text-sm mb-2">📚 Courses to Consider:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {sector.courses.map((course, idx) => (
                            <li key={idx}>• {course}</li>
                          ))}
                        </ul>
                      </div>

                      {/* TN Colleges */}
                      <div>
                        <p className="font-semibold text-sm mb-2">🎓 TN Colleges:</p>
                        <div className="flex flex-wrap gap-2">
                          {sector.colleges.map((college, idx) => (
                            <Badge 
                              key={idx} 
                              variant={college.includes('JKKN') ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {college}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Career Paths */}
                      <div>
                        <p className="font-semibold text-sm mb-2">📈 Career Paths:</p>
                        <div className="space-y-1">
                          {sector.careerPaths.map((path, idx) => (
                            <p key={idx} className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                              {path}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Why Growing */}
                      {sector.whyGrowing && (
                        <div>
                          <p className="font-semibold text-sm mb-2">🚀 Why Growing:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {sector.whyGrowing.map((reason, idx) => (
                              <li key={idx}>• {reason}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-xs text-center text-muted-foreground">
                    {expandedSector === sector.id ? 'Click to collapse' : 'Click to expand details'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 2: Skills That Matter */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center justify-center gap-2">
              🎯 Skills That Will Matter Most in 2026
            </h2>
            <p className="text-amber-600 dark:text-amber-400 mt-2 font-medium">
              2026-ல் மிக முக்கியமான திறன்கள்
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Technical Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {technicalSkills.map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-sm">{skill.name}</p>
                      <span className="text-xs text-muted-foreground">{skill.demand}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{skill.description}</p>
                    <Progress value={skill.demand} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Soft Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Soft Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {softSkills.map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-sm">{skill.name}</p>
                      <span className="text-xs text-muted-foreground">{skill.importance}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{skill.description}</p>
                    <Progress value={skill.importance} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 3: Skill Roadmap by Stream */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center justify-center gap-2">
              📍 Your Skill Roadmap Based on 12th Stream
            </h2>
            <p className="text-amber-600 dark:text-amber-400 mt-2 font-medium">
              உங்கள் 12-ஆம் வகுப்பு பிரிவின் அடிப்படையில் திறன் வழிகாட்டி
            </p>
          </div>

          <Tabs defaultValue="pcm" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="pcm">PCM (Maths)</TabsTrigger>
              <TabsTrigger value="pcb">PCB (Biology)</TabsTrigger>
              <TabsTrigger value="commerce">Commerce</TabsTrigger>
              <TabsTrigger value="arts">Arts</TabsTrigger>
            </TabsList>

            {Object.entries(streamRoadmaps).map(([key, roadmap]) => (
              <TabsContent key={key} value={key}>
                <Card>
                  <CardHeader>
                    <CardTitle>{roadmap.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Best Career Paths */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        Best Career Paths:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {roadmap.bestPaths.map((path, idx) => (
                          <Badge key={idx} variant="default">{path}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Courses */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        Recommended Courses:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {roadmap.courses.map((course, idx) => (
                          <Badge key={idx} variant="secondary">{course}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Skills to Learn */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        Skills to Learn:
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {roadmap.skills.map((skill, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                              {idx + 1}
                            </div>
                            <p className="text-sm">{skill}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Section 4: Job Listings */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center justify-center gap-2">
              💼 Trending Job Opportunities
            </h2>
            <p className="text-amber-600 dark:text-amber-400 mt-2 font-medium">
              பிரபலமான வேலை வாய்ப்புகள்
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search jobs by title, company, location..."
                value={jobSearchQuery}
                onChange={(e) => setJobSearchQuery(e.target.value)}
                className="pl-10"
              />
              {jobSearchQuery && (
                <button
                  onClick={() => setJobSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Select value={selectedJobSector} onValueChange={setSelectedJobSector}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Filter by sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                {sectors.map((sector) => (
                  <SelectItem key={sector.id} value={sector.id}>
                    {sector.icon} {sector.title.split(' ')[0]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active filter indicator */}
          {(selectedJobSector !== 'all' || jobSearchQuery) && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-sm text-muted-foreground">Showing:</span>
              {selectedJobSector !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {sectors.find(s => s.id === selectedJobSector)?.title || selectedJobSector}
                  <button onClick={() => setSelectedJobSector('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {jobSearchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {jobSearchQuery}
                  <button onClick={() => setJobSearchQuery('')}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              <span className="text-sm text-muted-foreground">({filteredJobs.length} jobs)</span>
            </div>
          )}

          {/* Job Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.slice(0, 12).map((job, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{job.title}</h3>
                      <p className="text-sm text-primary font-medium">{job.company}</p>
                    </div>
                    {job.isHot && (
                      <Badge variant="destructive" className="text-xs">
                        🔥 Hot
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Banknote className="w-4 h-4" />
                      <span className="text-primary font-medium">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.requirement}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <Badge variant="outline" className="text-xs">
                      {sectors.find(s => s.id === job.sector)?.title.split(' ')[0] || job.sector}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No jobs found matching your criteria.</p>
              <Button variant="link" onClick={() => { setSelectedJobSector('all'); setJobSearchQuery(''); }}>
                Clear filters
              </Button>
            </div>
          )}

          {filteredJobs.length > 12 && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Showing 12 of {filteredJobs.length} jobs. Visit the main Jobs section for more.
            </p>
          )}
        </section>

        {/* Section 5: Salary Insights */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center justify-center gap-2">
              💰 Expected Salaries by Industry (2026)
            </h2>
            <p className="text-amber-600 dark:text-amber-400 mt-2 font-medium">
              துறை வாரியாக எதிர்பார்க்கப்படும் சம்பளம்
            </p>
          </div>

          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold">Industry</th>
                    <th className="text-left p-4 font-semibold">Entry Level</th>
                    <th className="text-left p-4 font-semibold">5 Years Exp</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryData.map((row, idx) => (
                    <tr key={idx} className="border-b last:border-b-0 hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-medium">{row.industry}</td>
                      <td className="p-4 text-muted-foreground">{row.entry}</td>
                      <td className="p-4 text-primary font-semibold">{row.experienced}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          <p className="text-center text-sm text-muted-foreground mt-4">
            LPA = Lakhs Per Annum | சம்பளம் அனுபவம் மற்றும் நிறுவனத்தைப் பொறுத்து மாறுபடும்
          </p>
        </section>

      </div>
    </div>
  );
};

export default IndustryTrends;
