import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Brain, Search, Lightbulb, Rocket, CheckCircle2, XCircle, ArrowRight,
  FileText, Shield, TrendingUp, Users, Target, Zap, AlertTriangle,
  ChevronDown, ChevronUp, Building2, Globe, DollarSign, Map,
  Loader2, Sparkles, BookOpen, Award, BarChart3, Copy, Download
} from 'lucide-react';
import { toast } from 'sonner';

// Known solutions database for matching
const knownSolutions = [
  { keywords: ['food', 'delivery', 'restaurant', 'order', 'meal'], solutions: ['Swiggy', 'Zomato', 'DoorDash', 'UberEats'], industry: 'FoodTech', status: 'saturated' },
  { keywords: ['ride', 'taxi', 'cab', 'transport', 'travel', 'commute'], solutions: ['Ola', 'Uber', 'Rapido', 'BluSmart'], industry: 'Mobility', status: 'saturated' },
  { keywords: ['education', 'learn', 'course', 'tutor', 'study', 'exam', 'school'], solutions: ['BYJU\'S', 'Unacademy', 'Vedantu', 'PhysicsWallah'], industry: 'EdTech', status: 'competitive' },
  { keywords: ['health', 'doctor', 'medicine', 'hospital', 'patient', 'medical', 'diagnosis'], solutions: ['Practo', '1mg', 'PharmEasy', 'MediBuddy'], industry: 'HealthTech', status: 'growing' },
  { keywords: ['payment', 'money', 'transfer', 'upi', 'wallet', 'bank', 'finance', 'loan'], solutions: ['PhonePe', 'Google Pay', 'Paytm', 'CRED'], industry: 'FinTech', status: 'competitive' },
  { keywords: ['farm', 'agriculture', 'crop', 'farmer', 'harvest', 'soil', 'irrigation'], solutions: ['DeHaat', 'Ninjacart', 'AgroStar', 'CropIn'], industry: 'AgriTech', status: 'growing' },
  { keywords: ['waste', 'recycle', 'garbage', 'pollution', 'environment', 'clean', 'plastic'], solutions: ['Kabadiwala Connect', 'Let\'s Recycle', 'Saahas Zero Waste'], industry: 'CleanTech', status: 'opportunity' },
  { keywords: ['mental', 'therapy', 'counseling', 'stress', 'anxiety', 'depression', 'wellness'], solutions: ['BetterHelp', 'YourDOST', 'Wysa', 'InnerHour'], industry: 'Mental Wellness', status: 'growing' },
  { keywords: ['job', 'hire', 'recruit', 'resume', 'career', 'interview', 'employment'], solutions: ['LinkedIn', 'Naukri', 'Indeed', 'Internshala'], industry: 'HR Tech', status: 'competitive' },
  { keywords: ['ecommerce', 'shop', 'buy', 'sell', 'product', 'store', 'market'], solutions: ['Amazon', 'Flipkart', 'Meesho', 'Shopify'], industry: 'E-Commerce', status: 'saturated' },
  { keywords: ['real estate', 'house', 'rent', 'property', 'flat', 'apartment', 'home'], solutions: ['99acres', 'MagicBricks', 'NoBroker', 'Housing.com'], industry: 'PropTech', status: 'competitive' },
  { keywords: ['pet', 'animal', 'vet', 'dog', 'cat', 'pet care'], solutions: ['Supertails', 'Zigly', 'PetKonnect'], industry: 'PetTech', status: 'opportunity' },
  { keywords: ['elder', 'senior', 'old age', 'retirement', 'elderly care'], solutions: ['Emoha', 'Alserv', 'Samarth'], industry: 'ElderTech', status: 'opportunity' },
  { keywords: ['water', 'purification', 'drinking', 'safe water', 'filter'], solutions: ['DrinkPrime', 'Livpure', 'AquaSure'], industry: 'WaterTech', status: 'growing' },
  { keywords: ['disability', 'accessible', 'blind', 'deaf', 'wheelchair', 'inclusive'], solutions: ['Eyeway', 'Enable India', 'AssisTech'], industry: 'Assistive Tech', status: 'opportunity' },
];

interface AnalysisResult {
  problemSummary: string;
  industry: string;
  existingSolutions: string[];
  marketStatus: 'saturated' | 'competitive' | 'growing' | 'opportunity' | 'blue-ocean';
  gapAnalysis: string[];
  uniqueAngle: string;
  roadmap: RoadmapPhase[];
  patentGuidance: PatentStep[];
  fundingSources: FundingSource[];
  riskFactors: string[];
  estimatedTimeline: string;
  estimatedCost: string;
}

interface RoadmapPhase {
  phase: number;
  title: string;
  duration: string;
  tasks: string[];
  deliverable: string;
}

interface PatentStep {
  step: number;
  title: string;
  description: string;
  cost?: string;
  timeline?: string;
}

interface FundingSource {
  name: string;
  type: string;
  amount: string;
  link?: string;
}

function analyzeProblems(problem: string, targetAudience: string, location: string): AnalysisResult {
  const lowerProblem = (problem + ' ' + targetAudience).toLowerCase();

  // Find matching existing solutions
  let matchedIndustry = 'Emerging Tech';
  let matchedSolutions: string[] = [];
  let marketStatus: AnalysisResult['marketStatus'] = 'blue-ocean';
  let maxScore = 0;

  for (const entry of knownSolutions) {
    const score = entry.keywords.filter(k => lowerProblem.includes(k)).length;
    if (score > maxScore) {
      maxScore = score;
      matchedIndustry = entry.industry;
      matchedSolutions = entry.solutions;
      marketStatus = entry.status as AnalysisResult['marketStatus'];
    }
  }

  const isNovelIdea = maxScore <= 1;

  // Generate gap analysis based on problem
  const gapAnalysis = isNovelIdea
    ? [
        'No direct competitors found — this is a potential blue-ocean opportunity',
        'Market validation is critical — conduct 50+ customer interviews first',
        'First-mover advantage possible, but market education will be needed',
        'Consider if the problem is big enough to sustain a business',
      ]
    : [
        `${matchedSolutions.length} existing players found — differentiation is key`,
        'Look for underserved segments: rural areas, specific demographics, or niche use-cases',
        'Existing solutions may lack vernacular language support or offline capability',
        'Price sensitivity in Indian market — consider freemium or subsidized model',
        'Focus on 10x better UX or solving a pain point competitors ignore',
      ];

  const uniqueAngle = isNovelIdea
    ? 'You may be entering an untapped market. Validate demand quickly with a no-code MVP before investing in development.'
    : `While ${matchedSolutions.slice(0, 2).join(' and ')} dominate this space, there are gaps in hyperlocal reach, regional language support, and affordable pricing for Tier-2/3 cities.`;

  // Build roadmap
  const roadmap: RoadmapPhase[] = [
    {
      phase: 1,
      title: 'Problem Validation & Research',
      duration: '2–4 weeks',
      tasks: [
        'Conduct 50+ customer discovery interviews',
        'Survey target audience using Google Forms / Typeform',
        'Map existing competitors — features, pricing, reviews',
        'Identify the #1 unmet need (your unique value proposition)',
        'Document problem-solution fit canvas',
      ],
      deliverable: 'Validated Problem Statement + Customer Persona',
    },
    {
      phase: 2,
      title: 'Solution Design & MVP',
      duration: '4–6 weeks',
      tasks: [
        'Design solution using Business Model Canvas',
        'Create wireframes (Figma / pen-and-paper)',
        'Build no-code MVP using Bubble.io / Glide / Adalo',
        'Or build a landing page with a waitlist (Carrd + Mailchimp)',
        'Test with 20 early adopters, collect feedback',
      ],
      deliverable: 'Working MVP / Prototype + 20 beta users',
    },
    {
      phase: 3,
      title: 'Market Testing & Iteration',
      duration: '4–8 weeks',
      tasks: [
        'Launch MVP to 100+ users',
        'Track key metrics: retention, engagement, NPS',
        'Run A/B tests on features and pricing',
        'Pivot or iterate based on data',
        'Build a community around the product (WhatsApp group, Discord)',
      ],
      deliverable: 'Product-Market Fit validation + Growth metrics',
    },
    {
      phase: 4,
      title: 'Business Registration & IP Protection',
      duration: '2–4 weeks',
      tasks: [
        'Register as Private Limited / LLP / OPC on MCA portal',
        'Get Udyam MSME Registration (free)',
        'Register on Startup India for DPIIT recognition',
        'File provisional patent if applicable (see below)',
        'Open current account + set up accounting (Zoho Books)',
      ],
      deliverable: 'Registered company + IP protection filed',
    },
    {
      phase: 5,
      title: 'Funding & Scaling',
      duration: '8–16 weeks',
      tasks: [
        'Apply to incubators: TANSIM, IIT-M Incubation Cell, T-Hub',
        'Prepare pitch deck (10 slides, problem → traction → ask)',
        'Apply for government grants: NIDHI-SSS, BIRAC, TIDE 2.0',
        'Enter competitions: Smart India Hackathon, TiE, NASSCOM',
        'Seek angel investors via AngelList, LetsVenture, Indian Angel Network',
      ],
      deliverable: 'Seed funding secured + Scaling roadmap',
    },
    {
      phase: 6,
      title: 'Launch & Growth',
      duration: '12–24 weeks',
      tasks: [
        'Full product development with tech team',
        'Digital marketing: SEO, social media, influencer partnerships',
        'Build partnerships with institutions, NGOs, or corporates',
        'Hire initial team (co-founder, developer, marketer)',
        'Set up customer support and feedback loops',
      ],
      deliverable: 'Market-ready product + Revenue generation',
    },
  ];

  // Patent guidance
  const patentGuidance: PatentStep[] = [
    {
      step: 1,
      title: 'Determine Patentability',
      description: 'Your innovation must be Novel (not existing), Inventive (non-obvious), and have Industrial Application. Software alone is not patentable in India, but a software + hardware system or a novel technical process can be.',
      cost: 'Free (self-assessment)',
      timeline: '1 week',
    },
    {
      step: 2,
      title: 'Prior Art Search',
      description: 'Search existing patents on InPASS (Indian Patent Advanced Search System) at ipindia.gov.in and Google Patents. This confirms your idea is truly novel.',
      cost: 'Free (DIY) or ₹5,000–15,000 (professional)',
      timeline: '1–2 weeks',
    },
    {
      step: 3,
      title: 'File Provisional Patent',
      description: 'File a Provisional Patent Application with the Indian Patent Office. This gives you 12 months of "Patent Pending" status while you develop the idea further. Startups get 80% fee reduction.',
      cost: '₹1,600 (startup) / ₹4,000 (small entity)',
      timeline: '1–2 days to file',
    },
    {
      step: 4,
      title: 'File Complete Specification',
      description: 'Within 12 months of provisional filing, submit the Complete Patent Application with detailed claims, drawings, and abstract.',
      cost: '₹4,000 (startup) / ₹10,000 (small entity)',
      timeline: 'Within 12 months',
    },
    {
      step: 5,
      title: 'Request Examination',
      description: 'File Form 18 to request examination by the Patent Office. For startups with DPIIT recognition, expedited examination is available.',
      cost: '₹4,000 (startup)',
      timeline: '6–18 months for examination',
    },
    {
      step: 6,
      title: 'Patent Grant',
      description: 'After examination and responding to any objections, the patent is granted for 20 years from the filing date.',
      cost: 'Renewal fees annually',
      timeline: '2–4 years total process',
    },
  ];

  // Funding sources
  const fundingSources: FundingSource[] = [
    { name: 'Startup India Seed Fund', type: 'Government Grant', amount: 'Up to ₹50 Lakhs', link: 'https://seedfund.startupindia.gov.in/' },
    { name: 'NIDHI-SSS (DST)', type: 'Government Grant', amount: 'Up to ₹30 Lakhs', link: 'https://dst.gov.in/' },
    { name: 'TANSIM Grant', type: 'State Government', amount: 'Up to ₹30 Lakhs', link: 'https://www.startuptn.in/' },
    { name: 'MUDRA Loan (Shishu)', type: 'Bank Loan', amount: 'Up to ₹50,000', link: 'https://www.mudra.org.in/' },
    { name: 'MUDRA Loan (Kishore)', type: 'Bank Loan', amount: '₹50K – ₹5 Lakhs', link: 'https://www.mudra.org.in/' },
    { name: 'PMEGP (KVIC)', type: 'Subsidy + Loan', amount: 'Up to ₹50 Lakhs', link: 'https://www.kviconline.gov.in/' },
    { name: 'BIRAC BIG Grant', type: 'Biotech/Health', amount: 'Up to ₹50 Lakhs', link: 'https://birac.nic.in/' },
    { name: 'Atal Innovation Mission', type: 'Incubation Support', amount: 'Infra + ₹10 Lakhs', link: 'https://aim.gov.in/' },
  ];

  const riskFactors = [
    isNovelIdea ? 'Market may not exist yet — validate demand before building' : 'Strong competition — need clear differentiation',
    'Regulatory compliance varies by industry (FSSAI, RBI, CDSCO etc.)',
    'Cash flow management is the #1 killer of early startups',
    'Co-founder disputes — have a clear equity & roles agreement',
    'Tech dependency — don\'t over-engineer; start with no-code if possible',
  ];

  return {
    problemSummary: problem,
    industry: matchedIndustry,
    existingSolutions: matchedSolutions,
    marketStatus: isNovelIdea ? 'blue-ocean' : marketStatus,
    gapAnalysis,
    uniqueAngle,
    roadmap,
    patentGuidance,
    fundingSources,
    riskFactors,
    estimatedTimeline: '6–12 months to MVP, 12–24 months to revenue',
    estimatedCost: '₹50,000 – ₹5,00,000 (depending on tech complexity)',
  };
}

export const AIProblemFinder = () => {
  const [step, setStep] = useState<'input' | 'analyzing' | 'results'>('input');
  const [problem, setProblem] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [location, setLocation] = useState('Tamil Nadu, India');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('existing');

  const handleAnalyze = async () => {
    if (problem.trim().length < 20) {
      toast.error('Please describe your problem in at least 20 characters.');
      return;
    }
    setStep('analyzing');

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2500));

    const analysis = analyzeProblems(problem, targetAudience, location);
    setResult(analysis);
    setStep('results');
    toast.success('AI Analysis Complete! 🚀');
  };

  const handleReset = () => {
    setStep('input');
    setProblem('');
    setTargetAudience('');
    setResult(null);
    setExpandedSection('existing');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'saturated': return 'bg-red-500/10 text-red-600 border-red-200';
      case 'competitive': return 'bg-amber-500/10 text-amber-600 border-amber-200';
      case 'growing': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'opportunity': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
      case 'blue-ocean': return 'bg-violet-500/10 text-violet-600 border-violet-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'saturated': return '🔴 Saturated Market';
      case 'competitive': return '🟡 Competitive Market';
      case 'growing': return '🔵 Growing Market';
      case 'opportunity': return '🟢 High Opportunity';
      case 'blue-ocean': return '🟣 Blue Ocean (No Direct Competitors!)';
      default: return status;
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // ===== INPUT STEP =====
  if (step === 'input') {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 rounded-xl p-5 border border-white/[0.06] text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-400/20 text-orange-400 px-4 py-1.5 rounded-full text-[11px] font-semibold mb-3">
            <Brain className="w-3.5 h-3.5" />
            AI-Powered Problem Analysis
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Describe Your Problem</h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Tell us the problem you want to solve. Our AI will check if similar solutions exist, identify gaps, and give you a complete roadmap + patent guidance.
          </p>
        </div>

        {/* Input Form */}
        <Card className="border-border/50">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-orange-500" />
                What problem do you want to solve? *
              </label>
              <Textarea
                placeholder="Example: Many rural farmers in Tamil Nadu don't know the real-time market price of their crops, so middlemen exploit them. I want to build an app that shows live mandi prices in Tamil and helps farmers sell directly to buyers..."
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="min-h-[120px] text-sm"
              />
              <p className="text-[10px] text-muted-foreground">{problem.length} characters (minimum 20)</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-500" />
                Who is your target audience?
              </label>
              <Input
                placeholder="e.g., Small farmers in rural Tamil Nadu, aged 25–55"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Map className="w-3.5 h-3.5 text-emerald-500" />
                Target Location
              </label>
              <Input
                placeholder="e.g., Tamil Nadu, India"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-sm"
              />
            </div>

            <Button
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/20 py-5 text-sm font-semibold"
              onClick={handleAnalyze}
              disabled={problem.trim().length < 20}
            >
              <Brain className="w-4 h-4 mr-2" />
              Analyze with AI — Find Existing Solutions & Build Roadmap
            </Button>
          </CardContent>
        </Card>

        {/* Example Problems */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground px-1">💡 Try these examples:</p>
          {[
            'Rural students in Tamil Nadu have no access to quality career counseling. I want to build an AI career guide in Tamil.',
            'Street food vendors don\'t have a digital menu or online ordering. I want to help them go digital easily.',
            'Elderly people living alone have no emergency alert system. I want to create a wearable panic button with GPS.',
          ].map((example, i) => (
            <button
              key={i}
              onClick={() => setProblem(example)}
              className="w-full text-left p-3 rounded-lg border border-border/50 hover:border-orange-300/50 hover:bg-orange-50/30 transition-all text-xs text-muted-foreground hover:text-foreground"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ===== ANALYZING STEP =====
  if (step === 'analyzing') {
    return (
      <div className="py-16 text-center space-y-6">
        <div className="relative inline-flex">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-xl shadow-orange-500/30 animate-pulse">
            <Brain className="w-10 h-10 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-foreground">AI is Analyzing Your Problem...</h3>
          <div className="space-y-1.5 text-xs text-muted-foreground max-w-xs mx-auto">
            <p className="flex items-center justify-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin text-orange-500" />
              Scanning existing solutions database...
            </p>
            <p className="flex items-center justify-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
              Identifying market gaps & opportunities...
            </p>
            <p className="flex items-center justify-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin text-emerald-500" />
              Generating complete roadmap & patent guidance...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ===== RESULTS STEP =====
  if (!result) return null;

  return (
    <div className="space-y-4">
      {/* Results Header */}
      <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 rounded-xl p-5 border border-white/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <Badge className="text-[10px] bg-orange-500/20 text-orange-400 border-orange-400/30">
            <Sparkles className="w-3 h-3 mr-1" /> AI Analysis Complete
          </Badge>
          <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-white" onClick={handleReset}>
            ← New Analysis
          </Button>
        </div>
        <h3 className="text-base font-bold text-white mb-1">Industry: {result.industry}</h3>
        <p className="text-xs text-gray-400 line-clamp-2">"{result.problemSummary}"</p>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge className={`text-[10px] border ${getStatusColor(result.marketStatus)}`}>
            {getStatusLabel(result.marketStatus)}
          </Badge>
          <Badge className="text-[10px] bg-white/5 text-gray-300 border-white/10">
            ⏱ {result.estimatedTimeline}
          </Badge>
          <Badge className="text-[10px] bg-white/5 text-gray-300 border-white/10">
            💰 {result.estimatedCost}
          </Badge>
        </div>
      </div>

      {/* ===== SECTION 1: Existing Solutions ===== */}
      <Card className="border-border/50 overflow-hidden">
        <button className="w-full p-3.5 flex items-center gap-3 text-left hover:bg-muted/30 transition-colors" onClick={() => toggleSection('existing')}>
          <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-rose-500 text-white">
            <Search className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Existing Solutions Found</p>
            <p className="text-[10px] text-muted-foreground">{result.existingSolutions.length > 0 ? `${result.existingSolutions.length} competitors identified` : 'No direct competitors found!'}</p>
          </div>
          {expandedSection === 'existing' ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        {expandedSection === 'existing' && (
          <CardContent className="pt-0 pb-3 px-3.5 space-y-2">
            {result.existingSolutions.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {result.existingSolutions.map((sol, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-red-50/50 border border-red-100/50">
                    <XCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    <span className="text-xs font-medium text-foreground">{sol}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200/50 text-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                <p className="text-xs font-medium text-emerald-700">No direct competitors found! This could be a blue-ocean opportunity.</p>
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* ===== SECTION 2: Gap Analysis ===== */}
      <Card className="border-border/50 overflow-hidden">
        <button className="w-full p-3.5 flex items-center gap-3 text-left hover:bg-muted/30 transition-colors" onClick={() => toggleSection('gaps')}>
          <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 text-white">
            <Target className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Gap Analysis & Your Unique Angle</p>
            <p className="text-[10px] text-muted-foreground">Where the market opportunity lies</p>
          </div>
          {expandedSection === 'gaps' ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        {expandedSection === 'gaps' && (
          <CardContent className="pt-0 pb-3 px-3.5 space-y-3">
            <div className="bg-gradient-to-r from-amber-50/80 to-orange-50/50 rounded-lg p-3 border border-amber-200/40">
              <p className="text-xs font-semibold text-amber-700 mb-1">🎯 Your Unique Angle</p>
              <p className="text-xs text-foreground leading-relaxed">{result.uniqueAngle}</p>
            </div>
            <div className="space-y-1.5">
              {result.gapAnalysis.map((gap, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-muted/30">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-foreground">{gap}</span>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* ===== SECTION 3: Complete Roadmap ===== */}
      <Card className="border-border/50 overflow-hidden">
        <button className="w-full p-3.5 flex items-center gap-3 text-left hover:bg-muted/30 transition-colors" onClick={() => toggleSection('roadmap')}>
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
            <Map className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Complete Roadmap to Build It</p>
            <p className="text-[10px] text-muted-foreground">6-phase step-by-step plan</p>
          </div>
          {expandedSection === 'roadmap' ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        {expandedSection === 'roadmap' && (
          <CardContent className="pt-0 pb-3 px-3.5 space-y-3">
            {result.roadmap.map((phase) => (
              <div key={phase.phase} className="relative pl-6 pb-3 border-l-2 border-blue-200 last:border-l-0 last:pb-0">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 border-2 border-white shadow-sm" />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">Phase {phase.phase}: {phase.title}</span>
                    <Badge variant="secondary" className="text-[9px]">{phase.duration}</Badge>
                  </div>
                  <div className="space-y-1">
                    {phase.tasks.map((task, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span className="text-[11px] text-muted-foreground">{task}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50/50 rounded-md p-2 border border-blue-100/50">
                    <span className="text-[10px] font-semibold text-blue-700">📦 Deliverable: {phase.deliverable}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        )}
      </Card>

      {/* ===== SECTION 4: Patent Application ===== */}
      <Card className="border-border/50 overflow-hidden">
        <button className="w-full p-3.5 flex items-center gap-3 text-left hover:bg-muted/30 transition-colors" onClick={() => toggleSection('patent')}>
          <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 text-white">
            <Shield className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Patent Application Guide (India)</p>
            <p className="text-[10px] text-muted-foreground">Step-by-step IP protection for startups</p>
          </div>
          {expandedSection === 'patent' ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        {expandedSection === 'patent' && (
          <CardContent className="pt-0 pb-3 px-3.5 space-y-3">
            {result.patentGuidance.map((pstep) => (
              <div key={pstep.step} className="relative pl-6 pb-3 border-l-2 border-emerald-200 last:border-l-0 last:pb-0">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 border-2 border-white shadow-sm flex items-center justify-center">
                  <span className="text-[7px] font-bold text-white">{pstep.step}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-foreground">{pstep.title}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{pstep.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {pstep.cost && (
                      <Badge variant="secondary" className="text-[9px]">💰 {pstep.cost}</Badge>
                    )}
                    {pstep.timeline && (
                      <Badge variant="secondary" className="text-[9px]">⏱ {pstep.timeline}</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-emerald-50/80 rounded-lg p-3 border border-emerald-200/50">
              <p className="text-[10px] font-semibold text-emerald-700">📌 Important Links</p>
              <div className="space-y-1 mt-1.5">
                <a href="https://ipindia.gov.in/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 hover:underline block">→ Indian Patent Office (ipindia.gov.in)</a>
                <a href="https://www.startupindia.gov.in/content/sih/en/intellectual-property.html" target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 hover:underline block">→ Startup India IP Support</a>
                <a href="https://patents.google.com/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 hover:underline block">→ Google Patents (Prior Art Search)</a>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* ===== SECTION 5: Funding Sources ===== */}
      <Card className="border-border/50 overflow-hidden">
        <button className="w-full p-3.5 flex items-center gap-3 text-left hover:bg-muted/30 transition-colors" onClick={() => toggleSection('funding')}>
          <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 text-white">
            <DollarSign className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Funding Sources & Grants</p>
            <p className="text-[10px] text-muted-foreground">{result.fundingSources.length} funding options identified</p>
          </div>
          {expandedSection === 'funding' ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        {expandedSection === 'funding' && (
          <CardContent className="pt-0 pb-3 px-3.5 space-y-2">
            {result.fundingSources.map((fund, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg border border-border/50 hover:border-violet-200/50 hover:bg-violet-50/20 transition-all">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{fund.name}</p>
                  <div className="flex gap-2 mt-0.5">
                    <Badge variant="secondary" className="text-[9px]">{fund.type}</Badge>
                    <Badge className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200/50">{fund.amount}</Badge>
                  </div>
                </div>
                {fund.link && (
                  <Button variant="ghost" size="sm" className="text-[10px] text-violet-600 h-auto p-1" onClick={() => window.open(fund.link, '_blank')}>
                    Apply <ArrowRight className="w-3 h-3 ml-0.5" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        )}
      </Card>

      {/* ===== SECTION 6: Risk Factors ===== */}
      <Card className="border-border/50 overflow-hidden">
        <button className="w-full p-3.5 flex items-center gap-3 text-left hover:bg-muted/30 transition-colors" onClick={() => toggleSection('risks')}>
          <div className="p-2 rounded-lg bg-gradient-to-br from-rose-500 to-pink-500 text-white">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Risk Factors to Watch</p>
            <p className="text-[10px] text-muted-foreground">{result.riskFactors.length} key risks identified</p>
          </div>
          {expandedSection === 'risks' ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        {expandedSection === 'risks' && (
          <CardContent className="pt-0 pb-3 px-3.5 space-y-1.5">
            {result.riskFactors.map((risk, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-rose-50/30 border border-rose-100/30">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-foreground">{risk}</span>
              </div>
            ))}
          </CardContent>
        )}
      </Card>

      {/* Analyze Another */}
      <Button
        variant="outline"
        className="w-full border-orange-300/50 text-orange-600 hover:bg-orange-50/50"
        onClick={handleReset}
      >
        <Brain className="w-4 h-4 mr-2" />
        Analyze Another Problem
      </Button>
    </div>
  );
};
