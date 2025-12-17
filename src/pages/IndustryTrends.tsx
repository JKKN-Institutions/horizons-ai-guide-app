import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, TrendingUp, Building2, IndianRupee, Target, Flame, 
  Cloud, Shield, Database, Laptop, Heart, Zap, Briefcase, 
  LineChart, BarChart3, Brain, Rocket, AlertTriangle, CheckCircle2,
  MapPin, Sparkles, RefreshCw, Loader2, WifiOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Cache configuration
const CACHE_KEY = 'industry_trends_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

interface CacheData {
  data: MarketData;
  timestamp: number;
}

const getCache = (): MarketData | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const { data, timestamp }: CacheData = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;
    
    if (isExpired) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    
    return data;
  } catch {
    return null;
  }
};

const setCache = (data: MarketData): void => {
  try {
    const cacheData: CacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (e) {
    console.warn('Failed to cache data:', e);
  }
};
// Icon mapping for industries
const industryIcons: Record<string, React.ElementType> = {
  'artificial intelligence': Brain,
  'machine learning': Brain,
  'ai/ml': Brain,
  'cloud': Cloud,
  'devops': Cloud,
  'healthcare': Heart,
  'life sciences': Heart,
  'cybersecurity': Shield,
  'security': Shield,
  'data science': Database,
  'analytics': Database,
  'fintech': IndianRupee,
  'banking': IndianRupee,
  'renewable': Zap,
  'energy': Zap,
  'default': TrendingUp,
};

const getIndustryIcon = (name: string): React.ElementType => {
  const lowerName = name.toLowerCase();
  for (const [key, icon] of Object.entries(industryIcons)) {
    if (lowerName.includes(key)) return icon;
  }
  return industryIcons.default;
};

const industryColors = ['#FF6B35', '#0A2E1F', '#E91E63', '#9C27B0', '#2196F3', '#4CAF50', '#FF9800'];

interface MarketData {
  lastUpdated: string;
  keyMetrics: {
    totalJobOpenings: string;
    jobOpeningsChange: string;
    companiesHiring: string;
    companiesChange: string;
    avgFresherSalary: string;
    salaryChange: string;
    placementRate: string;
  };
  trendingIndustries: Array<{
    name: string;
    growth: number;
    salaryRange: string;
    openings: string;
    demand: string;
    topSkills: string[];
    topRecruiters: string[];
  }>;
  topJobs: Array<{
    rank: number;
    role: string;
    salaryRange: string;
    openings: string;
    demand: string;
  }>;
  technicalSkills: Array<{
    name: string;
    status: string;
  }>;
  futurePredictions: {
    rising: Array<{ career: string; growth: string }>;
    stable: Array<{ career: string; note: string }>;
    declining: Array<{ career: string; risk: string }>;
  };
  tamilNaduData: {
    cities: Array<{ name: string; openings: string }>;
    industries: Array<{ name: string; percentage: number }>;
  };
}

// Fallback static data
const fallbackData: MarketData = {
  lastUpdated: new Date().toISOString(),
  keyMetrics: {
    totalJobOpenings: '2.5M+',
    jobOpeningsChange: '↑ 12% YoY',
    companiesHiring: '45,000+',
    companiesChange: '↑ 8% QoQ',
    avgFresherSalary: '₹6.2 LPA',
    salaryChange: '↑ 15% YoY',
    placementRate: '94%',
  },
  trendingIndustries: [
    { name: 'Artificial Intelligence & Machine Learning', growth: 42, salaryRange: '₹8-35 LPA', openings: '125,000+', demand: 'Very High', topSkills: ['Python', 'TensorFlow', 'Deep Learning', 'NLP'], topRecruiters: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys'] },
    { name: 'Cloud Computing & DevOps', growth: 38, salaryRange: '₹7-30 LPA', openings: '98,000+', demand: 'Very High', topSkills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD'], topRecruiters: ['AWS', 'Microsoft', 'Accenture', 'Wipro', 'HCL'] },
    { name: 'Healthcare & Life Sciences', growth: 35, salaryRange: '₹5-25 LPA', openings: '200,000+', demand: 'Very High', topSkills: ['Clinical Research', 'Biotech', 'Healthcare IT'], topRecruiters: ['Apollo', 'Fortis', 'Sun Pharma', 'Biocon', 'Cipla'] },
    { name: 'Cybersecurity', growth: 32, salaryRange: '₹6-28 LPA', openings: '75,000+', demand: 'Very High', topSkills: ['Ethical Hacking', 'SIEM', 'Network Security'], topRecruiters: ['Deloitte', 'EY', 'KPMG', 'IBM', 'Cisco'] },
    { name: 'Data Science & Analytics', growth: 30, salaryRange: '₹6-25 LPA', openings: '110,000+', demand: 'High', topSkills: ['Python', 'SQL', 'Tableau', 'Power BI', 'Statistics'], topRecruiters: ['Amazon', 'Flipkart', 'Mu Sigma', 'Fractal'] },
    { name: 'FinTech & Banking', growth: 28, salaryRange: '₹6-30 LPA', openings: '85,000+', demand: 'High', topSkills: ['Blockchain', 'Financial Modeling', 'Risk Analysis'], topRecruiters: ['PayTM', 'Razorpay', 'PhonePe', 'HDFC', 'ICICI'] },
    { name: 'Renewable Energy', growth: 35, salaryRange: '₹5-22 LPA', openings: '45,000+', demand: 'High', topSkills: ['Solar Technology', 'Wind Energy', 'Sustainability'], topRecruiters: ['Tata Power', 'Adani Green', 'ReNew Power'] },
  ],
  topJobs: [
    { rank: 1, role: 'AI/ML Engineer', salaryRange: '₹8-35 LPA', openings: '45,000+', demand: 'Very High' },
    { rank: 2, role: 'Full Stack Developer', salaryRange: '₹5-25 LPA', openings: '120,000+', demand: 'Very High' },
    { rank: 3, role: 'Cloud Solutions Architect', salaryRange: '₹12-40 LPA', openings: '25,000+', demand: 'Very High' },
    { rank: 4, role: 'Data Scientist', salaryRange: '₹6-28 LPA', openings: '55,000+', demand: 'Very High' },
    { rank: 5, role: 'Cybersecurity Analyst', salaryRange: '₹5-22 LPA', openings: '35,000+', demand: 'High' },
    { rank: 6, role: 'DevOps Engineer', salaryRange: '₹7-30 LPA', openings: '40,000+', demand: 'High' },
    { rank: 7, role: 'Product Manager', salaryRange: '₹10-35 LPA', openings: '18,000+', demand: 'High' },
    { rank: 8, role: 'Digital Marketing Manager', salaryRange: '₹4-18 LPA', openings: '65,000+', demand: 'High' },
    { rank: 9, role: 'Business Analyst', salaryRange: '₹5-20 LPA', openings: '50,000+', demand: 'Medium' },
    { rank: 10, role: 'UI/UX Designer', salaryRange: '₹4-18 LPA', openings: '30,000+', demand: 'Medium' },
  ],
  technicalSkills: [
    { name: 'Python', status: 'Hot' },
    { name: 'AWS', status: 'Hot' },
    { name: 'React', status: 'Hot' },
    { name: 'SQL', status: 'Rising' },
    { name: 'Java', status: 'Rising' },
    { name: 'Docker', status: 'Rising' },
    { name: 'Kubernetes', status: 'Rising' },
    { name: 'Node.js', status: 'Hot' },
    { name: 'TensorFlow', status: 'Hot' },
    { name: 'Power BI', status: 'Rising' },
  ],
  futurePredictions: {
    rising: [
      { career: 'AI Specialist', growth: '50%+' },
      { career: 'Sustainability Manager', growth: '45%+' },
      { career: 'Robotics Engineer', growth: '40%+' },
      { career: 'Blockchain Developer', growth: '35%+' },
      { career: 'Mental Health Counselor', growth: '30%+' },
    ],
    stable: [
      { career: 'Software Developer', note: 'Steady demand' },
      { career: 'Healthcare Professional', note: 'Always needed' },
      { career: 'Financial Analyst', note: 'Consistent growth' },
      { career: 'Teacher/Educator', note: 'Essential role' },
    ],
    declining: [
      { career: 'Data Entry Operator', risk: 'Automation risk' },
      { career: 'Basic Accounting', risk: 'AI replacing' },
      { career: 'Manual Testing', risk: 'Shifting to automation' },
    ],
  },
  tamilNaduData: {
    cities: [
      { name: 'Chennai', openings: '150,000+' },
      { name: 'Coimbatore', openings: '45,000+' },
      { name: 'Madurai', openings: '18,000+' },
      { name: 'Tiruchirappalli', openings: '12,000+' },
      { name: 'Salem', openings: '8,000+' },
    ],
    industries: [
      { name: 'IT & Software', percentage: 40 },
      { name: 'Manufacturing', percentage: 25 },
      { name: 'Healthcare', percentage: 15 },
      { name: 'Education', percentage: 10 },
      { name: 'Others', percentage: 10 },
    ],
  },
};

const salaryData = [
  { experience: 'Fresher', IT: 6, Healthcare: 4, Finance: 5, Manufacturing: 3.5 },
  { experience: '2-5 yrs', IT: 12, Healthcare: 8, Finance: 10, Manufacturing: 7 },
  { experience: '5-10 yrs', IT: 22, Healthcare: 15, Finance: 18, Manufacturing: 12 },
  { experience: '10+ yrs', IT: 35, Healthcare: 25, Finance: 30, Manufacturing: 20 },
];

const softSkills = [
  { name: 'Communication', status: 'Essential' },
  { name: 'Problem Solving', status: 'Essential' },
  { name: 'Leadership', status: 'Essential' },
  { name: 'Teamwork', status: 'Essential' },
];

const CHART_COLORS = ['#FF6B35', '#0A2E1F', '#FFB800', '#2196F3'];

const IndustryTrends = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initialize with cached data if available, otherwise fallback
  const [marketData, setMarketData] = useState<MarketData>(() => {
    const cached = getCache();
    return cached || fallbackData;
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLiveData, setIsLiveData] = useState(() => !!getCache());
  const [isCachedData, setIsCachedData] = useState(() => !!getCache());
  const [selectedChartView, setSelectedChartView] = useState<'line' | 'bar'>('line');

  const fetchMarketData = async (showToast = false, forceRefresh = false) => {
    try {
      // Check cache first (unless force refresh)
      if (!forceRefresh) {
        const cached = getCache();
        if (cached) {
          setMarketData(cached);
          setIsLiveData(true);
          setIsCachedData(true);
          return;
        }
      }

      if (showToast) setRefreshing(true);

      // Create a timeout promise (15 seconds)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 15000);
      });

      // Race between the API call and timeout
      const result = await Promise.race([
        supabase.functions.invoke('industry-trends'),
        timeoutPromise
      ]) as { data: MarketData | null; error: Error | null };

      const { data, error } = result;

      if (error) {
        console.error('Error fetching market data:', error);
        throw error;
      }

      if (data && !('error' in data)) {
        setMarketData(data);
        setCache(data); // Cache the new data
        setIsLiveData(true);
        setIsCachedData(false);
        if (showToast) {
          toast({
            title: "Data Refreshed",
            description: "Latest job market data has been fetched and cached.",
          });
        }
      } else {
        throw new Error((data as any)?.error || 'Failed to fetch data');
      }
    } catch (error) {
      console.error('Failed to fetch live data, using fallback:', error);
      setIsLiveData(false);
      setIsCachedData(false);
      if (showToast) {
        toast({
          title: "Using Offline Data",
          description: "Couldn't refresh. Showing cached information.",
          variant: "destructive",
        });
      }
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // If no cache exists, fetch fresh data in background
    const cached = getCache();
    if (!cached) {
      fetchMarketData();
    }
  }, []);

  // Prepare comparison chart data from market data
  const comparisonChartData = marketData.trendingIndustries.slice(0, 6).map(industry => ({
    name: industry.name.split(' ')[0], // Shorten name for chart
    fullName: industry.name,
    growth: industry.growth,
    openings: parseInt(industry.openings.replace(/[^0-9]/g, '')) / 1000, // Convert to K
  }));

  const keyMetrics = [
    { icon: TrendingUp, value: marketData.keyMetrics.totalJobOpenings, label: 'Job Openings', sublabel: 'in India', change: marketData.keyMetrics.jobOpeningsChange, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { icon: Building2, value: marketData.keyMetrics.companiesHiring, label: 'Companies', sublabel: 'Hiring Now', change: marketData.keyMetrics.companiesChange, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { icon: IndianRupee, value: marketData.keyMetrics.avgFresherSalary, label: 'Avg Salary', sublabel: 'for Freshers', change: marketData.keyMetrics.salaryChange, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { icon: Target, value: marketData.keyMetrics.placementRate, label: 'Placement', sublabel: 'Top Colleges', change: 'Rate', color: 'text-violet-500', bg: 'bg-violet-500/10' },
  ];

  const getDemandColor = (demand: string) => {
    switch (demand.toLowerCase()) {
      case 'very high': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <header className="bg-gradient-to-r from-[#0A2E1F] via-[#0A2E1F] to-[#0A2E1F]/90 text-white py-8">
          <div className="container mx-auto px-4">
            <Skeleton className="h-8 w-24 bg-white/20 mb-4" />
            <Skeleton className="h-10 w-96 bg-white/20 mb-2" />
            <Skeleton className="h-6 w-64 bg-white/20" />
          </div>
        </header>
        <div className="container mx-auto px-4 py-8 space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-8 rounded-lg mb-3" />
                  <Skeleton className="h-8 w-24 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-[#FF6B35]" />
              <p className="text-muted-foreground">Fetching live job market data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0A2E1F] via-[#0A2E1F] to-[#0A2E1F]/90 text-white py-8 relative overflow-hidden">
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
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#FF6B35] rounded-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h1 className="font-playfair text-3xl md:text-4xl font-bold italic">
                  Industry Trends & Career Insights
                </h1>
              </div>
              <p className="text-white/80 text-lg font-tamil mb-1">
                தொழில்துறை போக்குகள் & வேலைவாய்ப்பு நுண்ணறிவு
              </p>
              <div className="flex items-center gap-2 text-sm text-white/60 mt-3">
                {isLiveData ? (
                  <Sparkles className="h-4 w-4 text-[#FFB800]" />
                ) : (
                  <WifiOff className="h-4 w-4 text-white/40" />
                )}
                <span>
                  {isLiveData 
                    ? (isCachedData ? 'Showing cached data' : 'Real-time analytics powered by AI')
                    : 'Showing offline data'
                  }
                </span>
                {isCachedData && (
                  <Badge className="bg-blue-500 text-white text-xs">Cached</Badge>
                )}
                {isLiveData && !isCachedData && (
                  <Badge className="bg-[#FFB800] text-black text-xs">Live</Badge>
                )}
                <span className="mx-2">•</span>
                <span>Last updated: {new Date(marketData.lastUpdated).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => fetchMarketData(true, true)}
              disabled={refreshing}
            >
              {refreshing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              {isCachedData ? 'Refresh Data' : 'Fetch Latest'}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Key Metrics Dashboard */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {keyMetrics.map((metric, index) => (
              <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className={`absolute inset-0 ${metric.bg} opacity-50`}></div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full"></div>
                <CardContent className="p-6 relative">
                  <div className={`inline-flex p-2 rounded-lg ${metric.bg} mb-3`}>
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{metric.value}</div>
                  <div className="text-sm font-medium text-foreground">{metric.label}</div>
                  <div className="text-xs text-muted-foreground">{metric.sublabel}</div>
                  <Badge variant="secondary" className="mt-2 text-xs font-medium">
                    {metric.change}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trending Industries */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Flame className="h-6 w-6 text-[#FF6B35]" />
            <h2 className="text-2xl font-bold text-foreground">Hot Industries in 2025</h2>
            {isLiveData && <Badge className="bg-[#FFB800] text-black">Live</Badge>}
          </div>
          <div className="grid gap-4">
            {marketData.trendingIndustries.map((industry, index) => {
              const Icon = getIndustryIcon(industry.name);
              const color = industryColors[index % industryColors.length];
              return (
                <Card key={index} className="overflow-hidden border-l-4 hover:shadow-lg transition-all duration-300" style={{ borderLeftColor: color }}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}15` }}>
                          <Icon className="h-6 w-6" style={{ color }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-foreground">{industry.name}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1">
                              <IndianRupee className="h-3 w-3" />
                              {industry.salaryRange}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {industry.openings}
                            </span>
                            <Badge variant={industry.demand === 'Very High' ? 'destructive' : 'secondary'} className="text-xs">
                              {industry.demand}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="lg:w-64">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Growth</span>
                          <span className="font-semibold text-foreground">+{industry.growth}%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${industry.growth}%`, backgroundColor: color }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Top Skills</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {industry.topSkills.map((skill, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Top Recruiters</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {industry.topRecruiters.map((recruiter, i) => (
                              <span key={i} className="text-xs text-muted-foreground">{recruiter}{i < industry.topRecruiters.length - 1 ? ',' : ''}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Top In-Demand Jobs Table */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="h-6 w-6 text-[#0A2E1F]" />
            <h2 className="text-2xl font-bold text-foreground">Most In-Demand Jobs - 2025</h2>
          </div>
          <Card className="overflow-hidden border-0 shadow-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#0A2E1F] hover:bg-[#0A2E1F]">
                  <TableHead className="text-white font-semibold w-16">#</TableHead>
                  <TableHead className="text-white font-semibold">Job Role</TableHead>
                  <TableHead className="text-white font-semibold">Salary Range</TableHead>
                  <TableHead className="text-white font-semibold">Openings</TableHead>
                  <TableHead className="text-white font-semibold text-right">Demand</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketData.topJobs.map((job) => (
                  <TableRow key={job.rank} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-bold text-[#FF6B35]">{job.rank}</TableCell>
                    <TableCell className="font-medium">{job.role}</TableCell>
                    <TableCell>{job.salaryRange}</TableCell>
                    <TableCell>{job.openings}</TableCell>
                    <TableCell className="text-right">
                      <Badge className={`${getDemandColor(job.demand)} text-white`}>{job.demand}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>

        {/* Salary Comparison Chart */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <LineChart className="h-6 w-6 text-[#FFB800]" />
            <h2 className="text-2xl font-bold text-foreground">Salary Trends by Experience</h2>
          </div>
          <Card className="p-6 border-0 shadow-lg">
            <ResponsiveContainer width="100%" height={400}>
              <RechartsLineChart data={salaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="experience" tick={{ fill: '#666' }} />
                <YAxis tick={{ fill: '#666' }} label={{ value: 'Salary (LPA)', angle: -90, position: 'insideLeft', fill: '#666' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
                  formatter={(value) => [`₹${value} LPA`, '']}
                />
                <Legend />
                <Line type="monotone" dataKey="IT" stroke="#FF6B35" strokeWidth={3} dot={{ fill: '#FF6B35', strokeWidth: 2, r: 6 }} />
                <Line type="monotone" dataKey="Healthcare" stroke="#E91E63" strokeWidth={3} dot={{ fill: '#E91E63', strokeWidth: 2, r: 6 }} />
                <Line type="monotone" dataKey="Finance" stroke="#0A2E1F" strokeWidth={3} dot={{ fill: '#0A2E1F', strokeWidth: 2, r: 6 }} />
                <Line type="monotone" dataKey="Manufacturing" stroke="#FFB800" strokeWidth={3} dot={{ fill: '#FFB800', strokeWidth: 2, r: 6 }} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </Card>
        </section>

        {/* Industry Comparison Charts */}
        <section>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-[#0A2E1F]" />
              <h2 className="text-2xl font-bold text-foreground">Industry Comparison</h2>
            </div>
            <Tabs value={selectedChartView} onValueChange={(v) => setSelectedChartView(v as 'line' | 'bar')}>
              <TabsList className="bg-muted/50">
                <TabsTrigger value="bar" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Bar Chart
                </TabsTrigger>
                <TabsTrigger value="line" className="gap-2">
                  <LineChart className="h-4 w-4" />
                  Line Chart
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <Card className="p-6 border-0 shadow-lg">
            <p className="text-sm text-muted-foreground mb-4">
              Compare growth rates and job openings across top industries
            </p>
            <ResponsiveContainer width="100%" height={350}>
              {selectedChartView === 'bar' ? (
                <BarChart data={comparisonChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" tick={{ fill: '#666', fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fill: '#666' }} label={{ value: 'Growth %', angle: -90, position: 'insideLeft', fill: '#666' }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: '#666' }} label={{ value: 'Openings (K)', angle: 90, position: 'insideRight', fill: '#666' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
                    formatter={(value, name) => {
                      if (name === 'growth') return [`${value}%`, 'Growth Rate'];
                      if (name === 'openings') return [`${value}K`, 'Job Openings'];
                      return [value, name];
                    }}
                    labelFormatter={(label) => {
                      const item = comparisonChartData.find(d => d.name === label);
                      return item?.fullName || label;
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="growth" fill="#FF6B35" name="Growth %" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="openings" fill="#0A2E1F" name="Openings (K)" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <RechartsLineChart data={comparisonChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" tick={{ fill: '#666', fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fill: '#666' }} label={{ value: 'Growth %', angle: -90, position: 'insideLeft', fill: '#666' }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: '#666' }} label={{ value: 'Openings (K)', angle: 90, position: 'insideRight', fill: '#666' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
                    formatter={(value, name) => {
                      if (name === 'growth') return [`${value}%`, 'Growth Rate'];
                      if (name === 'openings') return [`${value}K`, 'Job Openings'];
                      return [value, name];
                    }}
                    labelFormatter={(label) => {
                      const item = comparisonChartData.find(d => d.name === label);
                      return item?.fullName || label;
                    }}
                  />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="growth" stroke="#FF6B35" strokeWidth={3} dot={{ fill: '#FF6B35', strokeWidth: 2, r: 6 }} name="Growth %" />
                  <Line yAxisId="right" type="monotone" dataKey="openings" stroke="#0A2E1F" strokeWidth={3} dot={{ fill: '#0A2E1F', strokeWidth: 2, r: 6 }} name="Openings (K)" />
                </RechartsLineChart>
              )}
            </ResponsiveContainer>
          </Card>
        </section>

        {/* Skills in Demand */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Target className="h-6 w-6 text-[#FF6B35]" />
            <h2 className="text-2xl font-bold text-foreground">Most Sought-After Skills</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-0 shadow-lg">
              <h3 className="font-semibold text-lg mb-4 text-foreground">Technical Skills</h3>
              <div className="flex flex-wrap gap-3">
                {marketData.technicalSkills.map((skill, index) => (
                  <div key={index} className="relative group">
                    <Badge 
                      variant="outline" 
                      className="px-4 py-2 text-sm font-medium hover:shadow-md transition-all cursor-default"
                    >
                      {skill.name}
                      <span className={`ml-2 inline-block w-2 h-2 rounded-full ${skill.status === 'Hot' ? 'bg-red-500' : 'bg-orange-500'}`}></span>
                    </Badge>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {skill.status === 'Hot' ? '🔥 Hot' : '📈 Rising'}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6 border-0 shadow-lg">
              <h3 className="font-semibold text-lg mb-4 text-foreground">Soft Skills</h3>
              <div className="flex flex-wrap gap-3">
                {softSkills.map((skill, index) => (
                  <Badge 
                    key={index}
                    variant="secondary" 
                    className="px-4 py-2 text-sm font-medium"
                  >
                    {skill.name}
                    <span className="ml-2 text-xs opacity-60">Essential</span>
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Future Job Predictions */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Rocket className="h-6 w-6 text-[#9C27B0]" />
            <h2 className="text-2xl font-bold text-foreground">Career Outlook 2025-2030</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-0 shadow-lg border-t-4 border-t-emerald-500">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                <h3 className="font-semibold text-emerald-600">Rising Careers</h3>
              </div>
              <ul className="space-y-3">
                {marketData.futurePredictions.rising.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span className="flex-1">{item.career}</span>
                    <Badge variant="outline" className="text-emerald-600 border-emerald-300 text-xs">
                      {item.growth}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6 border-0 shadow-lg border-t-4 border-t-blue-500">
              <div className="flex items-center gap-2 mb-4">
                <Laptop className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-blue-600">Stable Careers</h3>
              </div>
              <ul className="space-y-3">
                {marketData.futurePredictions.stable.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <span className="text-blue-500">➡️</span>
                    <span className="flex-1">{item.career}</span>
                    <span className="text-xs text-muted-foreground">{item.note}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6 border-0 shadow-lg border-t-4 border-t-amber-500">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold text-amber-600">Transforming Careers</h3>
              </div>
              <ul className="space-y-3">
                {marketData.futurePredictions.declining.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <span className="text-amber-500">⚠️</span>
                    <span className="flex-1">{item.career}</span>
                    <span className="text-xs text-muted-foreground">{item.risk}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* Regional Insights - Tamil Nadu */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="h-6 w-6 text-[#FF6B35]" />
            <h2 className="text-2xl font-bold text-foreground">Tamil Nadu Job Market</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-0 shadow-lg">
              <h3 className="font-semibold text-lg mb-4">Top Hiring Cities</h3>
              <div className="space-y-4">
                {marketData.tamilNaduData.cities.map((city, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#0A2E1F] text-white text-xs flex items-center justify-center font-semibold">
                        {index + 1}
                      </span>
                      <span className="font-medium">{city.name}</span>
                    </div>
                    <Badge variant="secondary">{city.openings} openings</Badge>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6 border-0 shadow-lg">
              <h3 className="font-semibold text-lg mb-4">Top Industries in TN</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={marketData.tamilNaduData.industries}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="percentage"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    labelLine={false}
                  >
                    {marketData.tamilNaduData.industries.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-8">
          <Card className="bg-gradient-to-r from-[#0A2E1F] to-[#0A2E1F]/90 border-0 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
            <CardContent className="p-8 text-center relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Target className="h-6 w-6 text-[#FFB800]" />
                <h3 className="text-2xl font-bold text-white">Ready to start your career journey?</h3>
              </div>
              <p className="text-white/70 mb-6">Take the next step towards your dream career</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
                  onClick={() => navigate('/career-assessment/12th-learners')}
                >
                  Take Career Assessment
                </Button>
                <Button 
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => navigate('/career-assessment/colleges')}
                >
                  Explore Colleges
                </Button>
                <Button 
                  variant="outline"
                  className="border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800]/10"
                  onClick={() => navigate('/career-assessment/chat')}
                >
                  Chat with AI
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default IndustryTrends;
