import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, TrendingUp, Target, Briefcase, Star, Laptop, 
  Heart, Cog, Building2, ShoppingCart, Brain, Cloud, Shield,
  Database, Code, MessageSquare, Users, Lightbulb, RefreshCw, Handshake,
  Download, MapPin, Banknote, Search, X, Filter, Bell, BellRing, Mail, Loader2, Check, ArrowLeftRight
} from 'lucide-react';
import { JobComparison } from '@/components/JobComparison';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { generateIndustryTrendsPDF } from './generateIndustryTrendsPDF';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  { title: 'DevOps Engineer', company: 'Zoho', location: 'Chennai', salary: '₹8-16 LPA', requirement: 'B.Tech + DevOps Tools', sector: 'tech', isHot: true },
  { title: 'Backend Developer', company: 'Freshworks', location: 'Chennai', salary: '₹10-20 LPA', requirement: 'B.Tech CS/IT', sector: 'tech', isHot: false },
  { title: 'Frontend Developer', company: 'Swiggy', location: 'Bangalore', salary: '₹8-15 LPA', requirement: 'B.Tech + React/Angular', sector: 'tech', isHot: false },
  { title: 'Data Engineer', company: 'PhonePe', location: 'Bangalore', salary: '₹12-22 LPA', requirement: 'B.Tech + Big Data', sector: 'tech', isHot: true },
  { title: 'QA Automation Engineer', company: 'Accenture', location: 'Mumbai', salary: '₹6-12 LPA', requirement: 'B.Tech + Testing', sector: 'tech', isHot: false },
  { title: 'Site Reliability Engineer', company: 'Google', location: 'Bangalore', salary: '₹25-45 LPA', requirement: 'B.Tech + Cloud', sector: 'tech', isHot: true },
  { title: 'Solutions Architect', company: 'Microsoft', location: 'Hyderabad', salary: '₹30-50 LPA', requirement: 'B.Tech + Azure', sector: 'tech', isHot: true },
  
  // Healthcare
  { title: 'Clinical Research Associate', company: 'Apollo', location: 'Chennai', salary: '₹5-10 LPA', requirement: 'Life Sciences Degree', sector: 'healthcare', isHot: false },
  { title: 'Healthcare Data Analyst', company: 'Fortis', location: 'Delhi', salary: '₹6-12 LPA', requirement: 'B.Sc + Analytics', sector: 'healthcare', isHot: true },
  { title: 'Medical AI Developer', company: 'Practo', location: 'Bangalore', salary: '₹12-20 LPA', requirement: 'B.Tech + Healthcare', sector: 'healthcare', isHot: true },
  { title: 'Telemedicine Specialist', company: '1mg', location: 'Gurgaon', salary: '₹8-15 LPA', requirement: 'MBBS/Healthcare', sector: 'healthcare', isHot: false },
  { title: 'Pharmacovigilance Associate', company: 'Sun Pharma', location: 'Mumbai', salary: '₹4-8 LPA', requirement: 'B.Pharm', sector: 'healthcare', isHot: false },
  { title: 'Medical Coder', company: 'Cognizant Healthcare', location: 'Chennai', salary: '₹3-6 LPA', requirement: 'Any Science Degree', sector: 'healthcare', isHot: false },
  { title: 'Clinical Data Manager', company: 'Biocon', location: 'Bangalore', salary: '₹8-14 LPA', requirement: 'M.Pharm/M.Sc', sector: 'healthcare', isHot: true },
  { title: 'Drug Safety Specialist', company: 'Cipla', location: 'Mumbai', salary: '₹6-12 LPA', requirement: 'Pharm.D', sector: 'healthcare', isHot: true },
  { title: 'Healthcare IT Consultant', company: 'Deloitte', location: 'Hyderabad', salary: '₹12-22 LPA', requirement: 'B.Tech + Healthcare', sector: 'healthcare', isHot: true },
  
  // Manufacturing
  { title: 'EV Engineer', company: 'Tata Motors', location: 'Pune', salary: '₹8-16 LPA', requirement: 'B.Tech Mechanical/EV', sector: 'manufacturing', isHot: true },
  { title: 'Battery Systems Engineer', company: 'Ola Electric', location: 'Bangalore', salary: '₹10-18 LPA', requirement: 'B.Tech + Battery Tech', sector: 'manufacturing', isHot: true },
  { title: 'Renewable Energy Engineer', company: 'Adani Green', location: 'Ahmedabad', salary: '₹8-15 LPA', requirement: 'B.Tech Electrical', sector: 'manufacturing', isHot: true },
  { title: 'Semiconductor Engineer', company: 'Intel', location: 'Bangalore', salary: '₹12-22 LPA', requirement: 'M.Tech VLSI', sector: 'manufacturing', isHot: true },
  { title: 'Robotics Engineer', company: 'Mahindra', location: 'Chennai', salary: '₹8-15 LPA', requirement: 'B.Tech Mechatronics', sector: 'manufacturing', isHot: true },
  { title: 'Production Manager', company: 'L&T', location: 'Mumbai', salary: '₹12-20 LPA', requirement: 'B.Tech + MBA', sector: 'manufacturing', isHot: false },
  { title: 'Quality Control Engineer', company: 'BHEL', location: 'Trichy', salary: '₹6-10 LPA', requirement: 'B.Tech Mechanical', sector: 'manufacturing', isHot: false },
  { title: 'Aerospace Engineer', company: 'HAL', location: 'Bangalore', salary: '₹10-18 LPA', requirement: 'B.Tech Aerospace', sector: 'manufacturing', isHot: true },
  { title: 'VLSI Design Engineer', company: 'Qualcomm', location: 'Hyderabad', salary: '₹15-28 LPA', requirement: 'M.Tech VLSI', sector: 'manufacturing', isHot: true },
  { title: 'Embedded Systems Engineer', company: 'Bosch', location: 'Coimbatore', salary: '₹6-12 LPA', requirement: 'B.Tech ECE', sector: 'manufacturing', isHot: false },
  
  // BFSI
  { title: 'FinTech Product Manager', company: 'Razorpay', location: 'Bangalore', salary: '₹18-30 LPA', requirement: 'MBA + Tech', sector: 'bfsi', isHot: true },
  { title: 'Investment Banking Analyst', company: 'ICICI Bank', location: 'Mumbai', salary: '₹12-20 LPA', requirement: 'MBA Finance', sector: 'bfsi', isHot: false },
  { title: 'Blockchain Developer', company: 'Polygon', location: 'Bangalore', salary: '₹20-35 LPA', requirement: 'B.Tech + Blockchain', sector: 'bfsi', isHot: true },
  { title: 'Risk Analyst', company: 'HDFC Bank', location: 'Mumbai', salary: '₹8-15 LPA', requirement: 'CA/CFA/MBA', sector: 'bfsi', isHot: false },
  { title: 'Quantitative Analyst', company: 'Goldman Sachs', location: 'Bangalore', salary: '₹25-45 LPA', requirement: 'M.Tech + Finance', sector: 'bfsi', isHot: true },
  { title: 'Credit Analyst', company: 'SBI', location: 'Mumbai', salary: '₹6-12 LPA', requirement: 'B.Com/MBA', sector: 'bfsi', isHot: false },
  { title: 'UPI Product Lead', company: 'PhonePe', location: 'Bangalore', salary: '₹20-35 LPA', requirement: 'MBA + Payments', sector: 'bfsi', isHot: true },
  { title: 'Insurance Underwriter', company: 'PolicyBazaar', location: 'Gurgaon', salary: '₹8-15 LPA', requirement: 'B.Com/MBA', sector: 'bfsi', isHot: false },
  { title: 'Wealth Manager', company: 'Zerodha', location: 'Bangalore', salary: '₹10-20 LPA', requirement: 'CFA/CFP', sector: 'bfsi', isHot: true },
  { title: 'Compliance Officer', company: 'Kotak Bank', location: 'Mumbai', salary: '₹8-15 LPA', requirement: 'LLB/CA', sector: 'bfsi', isHot: false },
  
  // E-commerce
  { title: 'E-Commerce Manager', company: 'Amazon', location: 'Bangalore', salary: '₹15-28 LPA', requirement: 'MBA + E-Commerce', sector: 'ecommerce', isHot: true },
  { title: 'Supply Chain Analyst', company: 'Flipkart', location: 'Bangalore', salary: '₹8-15 LPA', requirement: 'MBA Operations', sector: 'ecommerce', isHot: false },
  { title: 'Quick Commerce Lead', company: 'Zepto', location: 'Mumbai', salary: '₹12-22 LPA', requirement: 'MBA + Operations', sector: 'ecommerce', isHot: true },
  { title: 'Category Manager', company: 'Meesho', location: 'Bangalore', salary: '₹12-20 LPA', requirement: 'MBA', sector: 'ecommerce', isHot: true },
  { title: 'Digital Marketing Manager', company: 'Myntra', location: 'Bangalore', salary: '₹10-18 LPA', requirement: 'MBA Marketing', sector: 'ecommerce', isHot: false },
  { title: 'Marketplace Operations', company: 'BigBasket', location: 'Bangalore', salary: '₹6-12 LPA', requirement: 'Any Graduate', sector: 'ecommerce', isHot: false },
  { title: 'Seller Success Manager', company: 'Shopify India', location: 'Bangalore', salary: '₹8-15 LPA', requirement: 'B.Com/MBA', sector: 'ecommerce', isHot: true },
  { title: 'Delivery Operations Head', company: 'Blinkit', location: 'Delhi', salary: '₹15-25 LPA', requirement: 'MBA Operations', sector: 'ecommerce', isHot: true },
  
  // Logistics
  { title: 'Supply Chain Manager', company: 'Delhivery', location: 'Gurgaon', salary: '₹15-25 LPA', requirement: 'MBA Operations', sector: 'logistics', isHot: true },
  { title: 'Logistics Analyst', company: 'Blue Dart', location: 'Mumbai', salary: '₹6-12 LPA', requirement: 'B.Tech/MBA', sector: 'logistics', isHot: false },
  { title: 'Warehouse Operations Lead', company: 'Amazon Logistics', location: 'Bangalore', salary: '₹8-14 LPA', requirement: 'Any Graduate + Experience', sector: 'logistics', isHot: true },
  { title: 'Fleet Manager', company: 'Rivigo', location: 'Gurgaon', salary: '₹10-18 LPA', requirement: 'MBA Operations', sector: 'logistics', isHot: false },
  { title: 'Last Mile Delivery Head', company: 'Ecom Express', location: 'Delhi', salary: '₹12-20 LPA', requirement: 'MBA + Logistics', sector: 'logistics', isHot: true },
  { title: 'Cold Chain Manager', company: 'Snowman Logistics', location: 'Mumbai', salary: '₹10-18 LPA', requirement: 'B.Tech + MBA', sector: 'logistics', isHot: true },
  { title: 'Route Optimization Analyst', company: 'XpressBees', location: 'Pune', salary: '₹6-12 LPA', requirement: 'B.Tech + Analytics', sector: 'logistics', isHot: false },
  
  // Gaming
  { title: 'Game Developer', company: 'Games24x7', location: 'Mumbai', salary: '₹12-22 LPA', requirement: 'B.Tech + Unity/Unreal', sector: 'gaming', isHot: true },
  { title: 'Mobile Game Developer', company: 'MPL', location: 'Bangalore', salary: '₹15-28 LPA', requirement: 'B.Tech + Mobile Dev', sector: 'gaming', isHot: true },
  { title: 'Esports Manager', company: 'JetSynthesys', location: 'Pune', salary: '₹8-15 LPA', requirement: 'Sports Management', sector: 'gaming', isHot: true },
  { title: '3D Game Artist', company: 'Zynga India', location: 'Bangalore', salary: '₹10-18 LPA', requirement: 'B.Des + 3D Tools', sector: 'gaming', isHot: false },
  { title: 'Game Producer', company: 'Nazara', location: 'Mumbai', salary: '₹15-25 LPA', requirement: 'MBA + Gaming', sector: 'gaming', isHot: true },
  { title: 'VR/AR Developer', company: 'Dream11', location: 'Mumbai', salary: '₹12-22 LPA', requirement: 'B.Tech + VR/AR', sector: 'gaming', isHot: true },
  { title: 'Game QA Tester', company: 'Ubisoft', location: 'Pune', salary: '₹4-8 LPA', requirement: 'Any Graduate', sector: 'gaming', isHot: false },
  
  // AgriTech
  { title: 'AgriTech Product Manager', company: 'DeHaat', location: 'Patna', salary: '₹12-22 LPA', requirement: 'MBA + AgriTech', sector: 'agritech', isHot: true },
  { title: 'Agricultural Data Scientist', company: 'Ninjacart', location: 'Bangalore', salary: '₹15-25 LPA', requirement: 'M.Sc + Data Science', sector: 'agritech', isHot: true },
  { title: 'IoT Engineer - Smart Farming', company: 'Stellapps', location: 'Bangalore', salary: '₹10-18 LPA', requirement: 'B.Tech + IoT', sector: 'agritech', isHot: false },
  { title: 'Agronomy Specialist', company: 'CropIn', location: 'Bangalore', salary: '₹8-14 LPA', requirement: 'B.Sc Agriculture', sector: 'agritech', isHot: false },
  { title: 'Supply Chain Lead - Agri', company: 'AgroStar', location: 'Pune', salary: '₹10-18 LPA', requirement: 'MBA + Agri', sector: 'agritech', isHot: true },
  { title: 'Farm Tech Advisor', company: 'Samunnati', location: 'Chennai', salary: '₹5-10 LPA', requirement: 'B.Sc Agriculture', sector: 'agritech', isHot: false },
  { title: 'Drone Pilot - Agriculture', company: 'TartanSense', location: 'Bangalore', salary: '₹6-12 LPA', requirement: 'Drone License + Agri', sector: 'agritech', isHot: true },
  
  // EdTech
  { title: 'EdTech Product Manager', company: 'Unacademy', location: 'Bangalore', salary: '₹15-25 LPA', requirement: 'MBA + EdTech', sector: 'edtech', isHot: true },
  { title: 'Curriculum Designer', company: "BYJU'S", location: 'Bangalore', salary: '₹8-14 LPA', requirement: 'M.Ed/MA Education', sector: 'edtech', isHot: false },
  { title: 'Learning Experience Designer', company: 'upGrad', location: 'Mumbai', salary: '₹10-18 LPA', requirement: 'MA/M.Ed', sector: 'edtech', isHot: true },
  { title: 'Academic Content Lead', company: 'Vedantu', location: 'Bangalore', salary: '₹12-20 LPA', requirement: 'M.Sc/M.Ed', sector: 'edtech', isHot: false },
  { title: 'EdTech Sales Manager', company: 'Physics Wallah', location: 'Noida', salary: '₹8-15 LPA', requirement: 'MBA Sales', sector: 'edtech', isHot: true },
  { title: 'Online Tutor - STEM', company: 'Cuemath', location: 'Remote', salary: '₹4-8 LPA', requirement: 'B.Sc/B.Tech', sector: 'edtech', isHot: false },
  { title: 'Corporate Training Lead', company: 'Simplilearn', location: 'Bangalore', salary: '₹12-22 LPA', requirement: 'MBA + Training', sector: 'edtech', isHot: true },
  
  // Renewable Energy
  { title: 'Solar Project Engineer', company: 'Adani Green', location: 'Ahmedabad', salary: '₹8-15 LPA', requirement: 'B.Tech Electrical', sector: 'renewable', isHot: true },
  { title: 'Wind Energy Specialist', company: 'Suzlon', location: 'Pune', salary: '₹10-18 LPA', requirement: 'B.Tech Mechanical', sector: 'renewable', isHot: true },
  { title: 'Sustainability Consultant', company: 'ReNew Power', location: 'Gurgaon', salary: '₹15-25 LPA', requirement: 'MBA + Sustainability', sector: 'renewable', isHot: false },
  { title: 'Energy Storage Engineer', company: 'Tata Power', location: 'Mumbai', salary: '₹10-18 LPA', requirement: 'B.Tech + Battery', sector: 'renewable', isHot: true },
  { title: 'Green Hydrogen Specialist', company: 'NTPC', location: 'Delhi', salary: '₹12-22 LPA', requirement: 'M.Tech Energy', sector: 'renewable', isHot: true },
  { title: 'Carbon Footprint Analyst', company: 'Infosys Green', location: 'Bangalore', salary: '₹8-14 LPA', requirement: 'Environmental Science', sector: 'renewable', isHot: false },
  { title: 'Solar Installation Manager', company: 'Azure Power', location: 'Jaipur', salary: '₹8-15 LPA', requirement: 'B.Tech Electrical', sector: 'renewable', isHot: false },
  { title: 'Climate Tech Researcher', company: 'IISc Bangalore', location: 'Bangalore', salary: '₹6-12 LPA', requirement: 'M.Tech/PhD', sector: 'renewable', isHot: true },
];

const IndustryTrends = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [expandedSector, setExpandedSector] = useState<string | null>(null);
  const [selectedJobSector, setSelectedJobSector] = useState<string>('all');
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  
  // Job alerts state
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertEmail, setAlertEmail] = useState('');
  const [alertName, setAlertName] = useState('');
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [alertSalaryMin, setAlertSalaryMin] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [newJobsCount, setNewJobsCount] = useState(0);

  // Saved jobs state
  const [savedJobs, setSavedJobs] = useState<typeof jobListings>([]);
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  
  // Job comparison state
  const [compareJobs, setCompareJobs] = useState<typeof jobListings>([]);
  const [showCompareDialog, setShowCompareDialog] = useState(false);

  const locations = ['Bangalore', 'Chennai', 'Mumbai', 'Hyderabad', 'Delhi', 'Pune', 'Noida', 'Gurgaon', 'Coimbatore', 'Ahmedabad'];

  // Load saved jobs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('industryTrendsSavedJobs');
    if (saved) {
      try {
        const savedJobIds = JSON.parse(saved) as string[];
        const jobs = jobListings.filter((_, idx) => savedJobIds.includes(idx.toString()));
        setSavedJobs(jobs);
      } catch (e) {
        console.error('Error loading saved jobs:', e);
      }
    }
  }, []);

  // Check for existing subscription
  useEffect(() => {
    const savedEmail = localStorage.getItem('jobAlertEmail');
    if (savedEmail) {
      setIsSubscribed(true);
      setAlertEmail(savedEmail);
    }
  }, []);

  // Listen for real-time job updates (simulated with new jobs notification)
  useEffect(() => {
    const channel = supabase
      .channel('job-alerts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'industry_job_subscriptions'
        },
        () => {
          // Show notification for new subscribers
          setNewJobsCount(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSectorToggle = (sectorId: string) => {
    setSelectedSectors(prev => 
      prev.includes(sectorId) 
        ? prev.filter(s => s !== sectorId)
        : [...prev, sectorId]
    );
  };

  const handleLocationToggle = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const handleSubscribe = async () => {
    if (!alertEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      });
      return;
    }

    if (selectedSectors.length === 0) {
      toast({
        title: "Select Sectors",
        description: "Please select at least one sector to receive job alerts.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);

    try {
      const { error } = await supabase
        .from('industry_job_subscriptions')
        .insert({
          email: alertEmail,
          name: alertName || null,
          sectors: selectedSectors,
          locations: selectedLocations.length > 0 ? selectedLocations : null,
          salary_min: alertSalaryMin ? parseInt(alertSalaryMin) : null,
        });

      if (error) throw error;

      localStorage.setItem('jobAlertEmail', alertEmail);
      setIsSubscribed(true);
      setAlertDialogOpen(false);
      
      toast({
        title: "🎉 Subscribed Successfully!",
        description: `You'll receive job alerts for ${selectedSectors.length} sector(s) at ${alertEmail}`,
      });
    } catch (error: any) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleUnsubscribe = async () => {
    const savedEmail = localStorage.getItem('jobAlertEmail');
    if (!savedEmail) return;

    try {
      await supabase
        .from('industry_job_subscriptions')
        .update({ is_active: false })
        .eq('email', savedEmail);

      localStorage.removeItem('jobAlertEmail');
      setIsSubscribed(false);
      setAlertEmail('');
      setSelectedSectors([]);
      
      toast({
        title: "Unsubscribed",
        description: "You've been unsubscribed from job alerts.",
      });
    } catch (error) {
      console.error('Unsubscribe error:', error);
    }
  };

  const handleDownloadPDF = () => {
    generateIndustryTrendsPDF(sectors, streamRoadmaps, salaryData);
    toast({
      title: "PDF Downloaded",
      description: "Industry Trends report has been downloaded successfully!",
    });
  };

  const isJobSaved = (jobIdx: number) => {
    const saved = localStorage.getItem('industryTrendsSavedJobs');
    if (!saved) return false;
    try {
      const savedJobIds = JSON.parse(saved) as string[];
      return savedJobIds.includes(jobIdx.toString());
    } catch {
      return false;
    }
  };

  const toggleSaveJob = (jobIdx: number, job: typeof jobListings[0]) => {
    const saved = localStorage.getItem('industryTrendsSavedJobs');
    let savedJobIds: string[] = [];
    
    try {
      if (saved) savedJobIds = JSON.parse(saved);
    } catch {
      savedJobIds = [];
    }

    if (savedJobIds.includes(jobIdx.toString())) {
      // Remove from saved
      savedJobIds = savedJobIds.filter(id => id !== jobIdx.toString());
      setSavedJobs(prev => prev.filter((_, idx) => idx !== jobIdx));
      toast({
        title: "Job Removed",
        description: `${job.title} removed from saved jobs.`,
      });
    } else {
      // Add to saved
      savedJobIds.push(jobIdx.toString());
      setSavedJobs(prev => [...prev, job]);
      toast({
        title: "Job Saved! 🔖",
        description: `${job.title} at ${job.company} saved successfully.`,
      });
    }

    localStorage.setItem('industryTrendsSavedJobs', JSON.stringify(savedJobIds));
  };

  const toggleCompareJob = (job: typeof jobListings[0]) => {
    const isInCompare = compareJobs.some(j => j.title === job.title && j.company === job.company);
    
    if (isInCompare) {
      setCompareJobs(prev => prev.filter(j => !(j.title === job.title && j.company === job.company)));
      toast({
        title: "Removed from Compare",
        description: `${job.title} removed from comparison.`,
      });
    } else {
      if (compareJobs.length >= 4) {
        toast({
          title: "Maximum 4 Jobs",
          description: "You can compare up to 4 jobs at a time. Remove one to add another.",
          variant: "destructive",
        });
        return;
      }
      setCompareJobs(prev => [...prev, job]);
      toast({
        title: "Added to Compare",
        description: `${job.title} added for comparison.`,
      });
    }
  };

  const isJobInCompare = (job: typeof jobListings[0]) => {
    return compareJobs.some(j => j.title === job.title && j.company === job.company);
  };

  const handleRemoveFromCompare = (index: number) => {
    setCompareJobs(prev => prev.filter((_, i) => i !== index));
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 page-transition">
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
            <div className="flex items-center gap-2">
              {/* Job Alerts Button */}
              <Dialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className={isSubscribed 
                      ? "bg-green-500 hover:bg-green-600 text-white relative" 
                      : "bg-blue-500 hover:bg-blue-600 text-white relative"
                    }
                  >
                    {isSubscribed ? <BellRing className="mr-2 h-4 w-4" /> : <Bell className="mr-2 h-4 w-4" />}
                    {isSubscribed ? 'Subscribed' : 'Job Alerts'}
                    {newJobsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {newJobsCount}
                      </span>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      {isSubscribed ? 'Manage Job Alerts' : 'Subscribe to Job Alerts'}
                    </DialogTitle>
                    <DialogDescription>
                      {isSubscribed 
                        ? 'You are currently subscribed to job alerts. புதிய வேலைகளுக்கு நீங்கள் குழுசேர்ந்துள்ளீர்கள்'
                        : 'Get notified when new jobs matching your preferences are posted. உங்கள் விருப்பத்திற்கு ஏற்ற வேலைகள் வெளியிடப்படும்போது அறிவிப்புகளைப் பெறுங்கள்'
                      }
                    </DialogDescription>
                  </DialogHeader>
                  
                  {isSubscribed ? (
                    <div className="space-y-4 pt-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                        <Check className="h-6 w-6 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">Active Subscription</p>
                          <p className="text-sm text-green-600">{alertEmail}</p>
                        </div>
                      </div>
                      <Button 
                        variant="destructive" 
                        onClick={handleUnsubscribe}
                        className="w-full"
                      >
                        Unsubscribe from Alerts
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 pt-4">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">Name (Optional) / பெயர்</Label>
                        <Input 
                          id="name"
                          placeholder="Enter your name"
                          value={alertName}
                          onChange={(e) => setAlertName(e.target.value)}
                        />
                      </div>
                      
                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address * / மின்னஞ்சல்</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={alertEmail}
                            onChange={(e) => setAlertEmail(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      {/* Sectors */}
                      <div className="space-y-2">
                        <Label>Select Sectors * / துறைகளைத் தேர்ந்தெடுக்கவும்</Label>
                        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                          {sectors.map((sector) => (
                            <div key={sector.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={sector.id}
                                checked={selectedSectors.includes(sector.id)}
                                onCheckedChange={() => handleSectorToggle(sector.id)}
                              />
                              <label 
                                htmlFor={sector.id}
                                className="text-sm cursor-pointer"
                              >
                                {sector.icon} {sector.title.split(' ')[0]}
                              </label>
                            </div>
                          ))}
                        </div>
                        {selectedSectors.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            {selectedSectors.length} sector(s) selected
                          </p>
                        )}
                      </div>
                      
                      {/* Locations */}
                      <div className="space-y-2">
                        <Label>Preferred Locations / விருப்பமான இடங்கள்</Label>
                        <div className="flex flex-wrap gap-2">
                          {locations.map((location) => (
                            <Badge 
                              key={location}
                              variant={selectedLocations.includes(location) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => handleLocationToggle(location)}
                            >
                              {location}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* Min Salary */}
                      <div className="space-y-2">
                        <Label htmlFor="salary">Minimum Salary (LPA) / குறைந்தபட்ச சம்பளம்</Label>
                        <Select value={alertSalaryMin} onValueChange={setAlertSalaryMin}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any salary" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Salary</SelectItem>
                            <SelectItem value="3">₹3 LPA+</SelectItem>
                            <SelectItem value="5">₹5 LPA+</SelectItem>
                            <SelectItem value="8">₹8 LPA+</SelectItem>
                            <SelectItem value="10">₹10 LPA+</SelectItem>
                            <SelectItem value="15">₹15 LPA+</SelectItem>
                            <SelectItem value="20">₹20 LPA+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button 
                        onClick={handleSubscribe}
                        disabled={isSubscribing}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        {isSubscribing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Subscribing...
                          </>
                        ) : (
                          <>
                            <Bell className="mr-2 h-4 w-4" />
                            Subscribe to Alerts
                          </>
                        )}
                      </Button>
                      
                      <p className="text-xs text-muted-foreground text-center">
                        We'll send you relevant job alerts. You can unsubscribe anytime.
                      </p>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
              
              <Button 
                onClick={handleDownloadPDF}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
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

          {/* Toggle between All Jobs and Saved Jobs */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant={!showSavedJobs ? "default" : "outline"}
              onClick={() => setShowSavedJobs(false)}
              className="gap-2"
            >
              <Briefcase className="w-4 h-4" />
              All Jobs ({jobListings.length})
            </Button>
            <Button
              variant={showSavedJobs ? "default" : "outline"}
              onClick={() => setShowSavedJobs(true)}
              className="gap-2 relative"
            >
              <Star className="w-4 h-4" />
              Saved Jobs
              {savedJobs.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {savedJobs.length}
                </span>
              )}
            </Button>
          </div>

          {!showSavedJobs ? (
            <>
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
                {filteredJobs.slice(0, 18).map((job, idx) => {
                  const originalIdx = jobListings.findIndex(j => j.title === job.title && j.company === job.company);
                  const isSaved = isJobSaved(originalIdx);
                  
                  return (
                    <Card key={idx} className="hover:shadow-lg transition-all duration-300 overflow-hidden group">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{job.title}</h3>
                            <p className="text-sm text-primary font-medium">{job.company}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {job.isHot && (
                              <Badge variant="destructive" className="text-xs">
                                🔥 Hot
                              </Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`h-8 w-8 ${isSaved ? 'text-amber-500' : 'text-muted-foreground opacity-0 group-hover:opacity-100'} transition-all`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSaveJob(originalIdx, job);
                              }}
                            >
                              <Star className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                            </Button>
                          </div>
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
                        <div className="mt-3 pt-3 border-t flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {sectors.find(s => s.id === job.sector)?.title.split(' ')[0] || job.sector}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-7 px-2"
                            onClick={() => toggleSaveJob(originalIdx, job)}
                          >
                            {isSaved ? 'Saved ✓' : 'Save Job'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          ) : (
            /* Saved Jobs View */
            <div>
              {savedJobs.length === 0 ? (
                <div className="text-center py-16 bg-muted/30 rounded-xl">
                  <Star className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Saved Jobs</h3>
                  <p className="text-muted-foreground mb-2">சேமிக்கப்பட்ட வேலைகள் இல்லை</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Click the star icon on any job card to save it for later.
                  </p>
                  <Button variant="outline" onClick={() => setShowSavedJobs(false)}>
                    Browse Jobs
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-lg p-4 flex-1">
                      <p className="text-sm text-amber-800 dark:text-amber-300">
                        💡 You have {savedJobs.length} saved job(s). Select jobs to compare side by side.
                      </p>
                    </div>
                    {compareJobs.length >= 2 && (
                      <Button
                        onClick={() => setShowCompareDialog(true)}
                        className="gap-2"
                      >
                        <ArrowLeftRight className="w-4 h-4" />
                        Compare ({compareJobs.length})
                      </Button>
                    )}
                  </div>
                  
                  {/* Compare selection hint */}
                  {compareJobs.length > 0 && compareJobs.length < 2 && (
                    <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg p-3 mb-4">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        ℹ️ Select at least 2 jobs to compare. {compareJobs.length}/4 selected
                      </p>
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedJobs.map((job, idx) => {
                      const originalIdx = jobListings.findIndex(j => j.title === job.title && j.company === job.company);
                      const isInCompare = isJobInCompare(job);
                      
                      return (
                        <Card 
                          key={idx} 
                          className={`hover:shadow-lg transition-all duration-300 overflow-hidden ${
                            isInCompare 
                              ? 'ring-2 ring-primary border-primary' 
                              : 'border-amber-200 dark:border-amber-500/30'
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="font-semibold text-foreground">{job.title}</h3>
                                <p className="text-sm text-primary font-medium">{job.company}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                {job.isHot && (
                                  <Badge variant="destructive" className="text-xs">
                                    🔥 Hot
                                  </Badge>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-amber-500"
                                  onClick={() => toggleSaveJob(originalIdx, job)}
                                >
                                  <Star className="w-5 h-5 fill-current" />
                                </Button>
                              </div>
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
                            <div className="mt-3 pt-3 border-t flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {sectors.find(s => s.id === job.sector)?.title.split(' ')[0] || job.sector}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant={isInCompare ? "default" : "outline"}
                                  size="sm"
                                  className="text-xs h-7 px-2 gap-1"
                                  onClick={() => toggleCompareJob(job)}
                                >
                                  <ArrowLeftRight className="w-3 h-3" />
                                  {isInCompare ? 'Selected' : 'Compare'}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs h-7 px-2 text-destructive hover:text-destructive"
                                  onClick={() => toggleSaveJob(originalIdx, job)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Job Comparison Dialog */}
          <JobComparison
            jobs={compareJobs}
            open={showCompareDialog}
            onOpenChange={setShowCompareDialog}
            onRemoveJob={handleRemoveFromCompare}
            sectors={sectors}
          />

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
