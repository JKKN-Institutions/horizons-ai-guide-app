import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, TrendingUp, Building2, IndianRupee, Target, Flame, 
  Cloud, Shield, Database, Laptop, Heart, Zap, Briefcase, 
  LineChart, BarChart3, Brain, Rocket, AlertTriangle, CheckCircle2,
  MapPin, Filter, ChevronDown, ExternalLink, Sparkles
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const keyMetrics = [
  { icon: TrendingUp, value: '2.5M+', label: 'Job Openings', sublabel: 'in India', change: '↑ 12% YoY', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { icon: Building2, value: '45,000+', label: 'Companies', sublabel: 'Hiring Now', change: '↑ 8% QoQ', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { icon: IndianRupee, value: '₹6.2 LPA', label: 'Avg Salary', sublabel: 'for Freshers', change: '↑ 15% YoY', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { icon: Target, value: '94%', label: 'Placement', sublabel: 'Top Colleges', change: 'Rate', color: 'text-violet-500', bg: 'bg-violet-500/10' },
];

const trendingIndustries = [
  { 
    icon: Brain, 
    name: 'Artificial Intelligence & Machine Learning', 
    growth: 42, 
    salary: '₹8-35 LPA', 
    openings: '125,000+', 
    demand: 'Very High',
    skills: ['Python', 'TensorFlow', 'Deep Learning', 'NLP'],
    recruiters: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys'],
    color: '#FF6B35'
  },
  { 
    icon: Cloud, 
    name: 'Cloud Computing & DevOps', 
    growth: 38, 
    salary: '₹7-30 LPA', 
    openings: '98,000+', 
    demand: 'Very High',
    skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD'],
    recruiters: ['AWS', 'Microsoft', 'Accenture', 'Wipro', 'HCL'],
    color: '#0A2E1F'
  },
  { 
    icon: Heart, 
    name: 'Healthcare & Life Sciences', 
    growth: 35, 
    salary: '₹5-25 LPA', 
    openings: '200,000+', 
    demand: 'Very High',
    skills: ['Clinical Research', 'Biotech', 'Healthcare IT'],
    recruiters: ['Apollo', 'Fortis', 'Sun Pharma', 'Biocon', 'Cipla'],
    color: '#E91E63'
  },
  { 
    icon: Shield, 
    name: 'Cybersecurity', 
    growth: 32, 
    salary: '₹6-28 LPA', 
    openings: '75,000+', 
    demand: 'Very High',
    skills: ['Ethical Hacking', 'SIEM', 'Network Security'],
    recruiters: ['Deloitte', 'EY', 'KPMG', 'IBM', 'Cisco'],
    color: '#9C27B0'
  },
  { 
    icon: Database, 
    name: 'Data Science & Analytics', 
    growth: 30, 
    salary: '₹6-25 LPA', 
    openings: '110,000+', 
    demand: 'High',
    skills: ['Python', 'SQL', 'Tableau', 'Power BI', 'Statistics'],
    recruiters: ['Amazon', 'Flipkart', 'Mu Sigma', 'Fractal'],
    color: '#2196F3'
  },
  { 
    icon: IndianRupee, 
    name: 'FinTech & Banking', 
    growth: 28, 
    salary: '₹6-30 LPA', 
    openings: '85,000+', 
    demand: 'High',
    skills: ['Blockchain', 'Financial Modeling', 'Risk Analysis'],
    recruiters: ['PayTM', 'Razorpay', 'PhonePe', 'HDFC', 'ICICI'],
    color: '#4CAF50'
  },
  { 
    icon: Zap, 
    name: 'Renewable Energy', 
    growth: 35, 
    salary: '₹5-22 LPA', 
    openings: '45,000+', 
    demand: 'High',
    skills: ['Solar Technology', 'Wind Energy', 'Sustainability'],
    recruiters: ['Tata Power', 'Adani Green', 'ReNew Power'],
    color: '#FF9800'
  },
];

const topJobs = [
  { rank: 1, role: 'AI/ML Engineer', salary: '₹8-35 LPA', openings: '45,000+', demand: 'Very High', demandColor: 'bg-red-500' },
  { rank: 2, role: 'Full Stack Developer', salary: '₹5-25 LPA', openings: '120,000+', demand: 'Very High', demandColor: 'bg-red-500' },
  { rank: 3, role: 'Cloud Solutions Architect', salary: '₹12-40 LPA', openings: '25,000+', demand: 'Very High', demandColor: 'bg-red-500' },
  { rank: 4, role: 'Data Scientist', salary: '₹6-28 LPA', openings: '55,000+', demand: 'Very High', demandColor: 'bg-red-500' },
  { rank: 5, role: 'Cybersecurity Analyst', salary: '₹5-22 LPA', openings: '35,000+', demand: 'High', demandColor: 'bg-orange-500' },
  { rank: 6, role: 'DevOps Engineer', salary: '₹7-30 LPA', openings: '40,000+', demand: 'High', demandColor: 'bg-orange-500' },
  { rank: 7, role: 'Product Manager', salary: '₹10-35 LPA', openings: '18,000+', demand: 'High', demandColor: 'bg-orange-500' },
  { rank: 8, role: 'Digital Marketing Manager', salary: '₹4-18 LPA', openings: '65,000+', demand: 'High', demandColor: 'bg-orange-500' },
  { rank: 9, role: 'Business Analyst', salary: '₹5-20 LPA', openings: '50,000+', demand: 'Medium', demandColor: 'bg-yellow-500' },
  { rank: 10, role: 'UI/UX Designer', salary: '₹4-18 LPA', openings: '30,000+', demand: 'Medium', demandColor: 'bg-yellow-500' },
];

const salaryData = [
  { experience: 'Fresher', IT: 6, Healthcare: 4, Finance: 5, Manufacturing: 3.5 },
  { experience: '2-5 yrs', IT: 12, Healthcare: 8, Finance: 10, Manufacturing: 7 },
  { experience: '5-10 yrs', IT: 22, Healthcare: 15, Finance: 18, Manufacturing: 12 },
  { experience: '10+ yrs', IT: 35, Healthcare: 25, Finance: 30, Manufacturing: 20 },
];

const technicalSkills = [
  { name: 'Python', status: 'Hot', color: 'bg-red-500' },
  { name: 'AWS', status: 'Hot', color: 'bg-red-500' },
  { name: 'React', status: 'Hot', color: 'bg-red-500' },
  { name: 'SQL', status: 'Rising', color: 'bg-orange-500' },
  { name: 'Java', status: 'Rising', color: 'bg-orange-500' },
  { name: 'Docker', status: 'Rising', color: 'bg-orange-500' },
  { name: 'Kubernetes', status: 'Rising', color: 'bg-orange-500' },
  { name: 'Node.js', status: 'Hot', color: 'bg-red-500' },
  { name: 'TensorFlow', status: 'Hot', color: 'bg-red-500' },
  { name: 'Power BI', status: 'Rising', color: 'bg-orange-500' },
];

const softSkills = [
  { name: 'Communication', status: 'Essential' },
  { name: 'Problem Solving', status: 'Essential' },
  { name: 'Leadership', status: 'Essential' },
  { name: 'Teamwork', status: 'Essential' },
];

const futurePredictions = {
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
};

const tamilNaduData = {
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
};

const CHART_COLORS = ['#FF6B35', '#0A2E1F', '#FFB800', '#2196F3'];

const IndustryTrends = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');

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
            <Sparkles className="h-4 w-4 text-[#FFB800]" />
            <span>Real-time analytics powered by AI</span>
            <span className="mx-2">•</span>
            <span>Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
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
          </div>
          <div className="grid gap-4">
            {trendingIndustries.map((industry, index) => (
              <Card key={index} className="overflow-hidden border-l-4 hover:shadow-lg transition-all duration-300" style={{ borderLeftColor: industry.color }}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 rounded-xl" style={{ backgroundColor: `${industry.color}15` }}>
                        <industry.icon className="h-6 w-6" style={{ color: industry.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground">{industry.name}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1">
                            <IndianRupee className="h-3 w-3" />
                            {industry.salary}
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
                          style={{ width: `${industry.growth}%`, backgroundColor: industry.color }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Top Skills</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {industry.skills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Top Recruiters</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {industry.recruiters.map((recruiter, i) => (
                            <span key={i} className="text-xs text-muted-foreground">{recruiter}{i < industry.recruiters.length - 1 ? ',' : ''}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
                {topJobs.map((job) => (
                  <TableRow key={job.rank} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-bold text-[#FF6B35]">{job.rank}</TableCell>
                    <TableCell className="font-medium">{job.role}</TableCell>
                    <TableCell>{job.salary}</TableCell>
                    <TableCell>{job.openings}</TableCell>
                    <TableCell className="text-right">
                      <Badge className={`${job.demandColor} text-white`}>{job.demand}</Badge>
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
                {technicalSkills.map((skill, index) => (
                  <div key={index} className="relative group">
                    <Badge 
                      variant="outline" 
                      className="px-4 py-2 text-sm font-medium hover:shadow-md transition-all cursor-default"
                    >
                      {skill.name}
                      <span className={`ml-2 inline-block w-2 h-2 rounded-full ${skill.color}`}></span>
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
                {futurePredictions.rising.map((item, index) => (
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
                {futurePredictions.stable.map((item, index) => (
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
                {futurePredictions.declining.map((item, index) => (
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
                {tamilNaduData.cities.map((city, index) => (
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
                    data={tamilNaduData.industries}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="percentage"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    labelLine={false}
                  >
                    {tamilNaduData.industries.map((_, index) => (
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
