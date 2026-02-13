import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Rocket, Lightbulb, Users, TrendingUp, BookOpen, Target, DollarSign, Award,
  ExternalLink, ChevronDown, ChevronUp, Brain, Search, BarChart3, Mic,
  Gamepad2, Map, MessageCircle, Trophy, Activity, CheckCircle2, Lock,
  Star, Flame, Clock, ArrowRight, Sparkles, GraduationCap, Building2
} from 'lucide-react';

// ── 6-Stage Journey Data ──
const journeyStages = [
  {
    id: 1, weeks: '1–2', title: 'What Even Is Entrepreneurship?',
    description: 'Shatter myths. Discover that entrepreneurs are problem-solvers. Take a self-assessment to find your entrepreneurial personality.',
    outcome: '"Wait… maybe I could do this too."',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 2, weeks: '3–6', title: 'How Do I Find a Problem Worth Solving?',
    description: 'Learn customer discovery, observation techniques, and problem validation. Identify 5–10 real problems in your neighbourhood.',
    outcome: '2–3 validated problems worth solving.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 3, weeks: '7–10', title: 'How Do I Turn a Problem Into a Business Idea?',
    description: 'Study the Business Model Canvas, learn about MVPs, and understand unit economics. Evaluate 10+ ideas systematically.',
    outcome: '1 strong idea with a validated business model.',
    color: 'from-emerald-500 to-green-600',
  },
  {
    id: 4, weeks: '11–16', title: 'How Do I Plan and Build It?',
    description: 'Build a business plan, create brand identity, design marketing strategy, and build financial projections. Practice your elevator pitch.',
    outcome: 'A complete, peer-reviewed business plan and a confident pitch.',
    color: 'from-purple-500 to-violet-600',
  },
  {
    id: 5, weeks: '17–24', title: 'How Do I Test It in the Real World?',
    description: 'Enter simulation and real-world testing. Handle cash flow crises, hiring decisions, and competition. Connect with mentors.',
    outcome: 'Experience the emotional rollercoaster of entrepreneurship safely.',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 6, weeks: '25–40', title: 'How Do I Actually Launch?',
    description: 'Connect to Startup India, MSME schemes, TANSIM programs, JKKN incubation. Prepare for startup competitions.',
    outcome: 'Launch-ready or know exactly what skills to develop in college.',
    color: 'from-cyan-500 to-teal-600',
  },
];

// ── 10 Features Data ──
const features = [
  {
    id: 'mastery', title: 'Entrepreneurship Mastery Path', icon: <GraduationCap className="w-5 h-5" />,
    category: 'Learn', color: 'from-amber-500 to-orange-500',
    tagline: '180 daily lessons • 5–7 min each',
    description: 'A structured curriculum following Y Combinator & NSRCEL methodology — simplified for 17-year-olds. Topics: Problem-Solution Fit, Value Proposition, Revenue Models, MVP, Go-to-Market, Legal Basics, Fundraising.',
    dailyPractice: 'Observe one business near your school. What problem does it solve? Who are its customers? Write 2 sentences in your Entrepreneurship Journal.',
    outcome: 'After 180 days: comprehensive understanding of how businesses work — equivalent to a semester-long college course.',
    sampleLessons: ['What is Problem-Solution Fit?', 'Revenue Models: 8 Types with Indian Examples', 'Unit Economics: Will You Make Money?', 'Go-to-Market Strategy Basics', 'GST & MSME Registration Guide'],
  },
  {
    id: 'discovery', title: 'Problem Discovery Lab', icon: <Search className="w-5 h-5" />,
    category: 'Discover', color: 'from-blue-500 to-indigo-600',
    tagline: 'Find problems worth solving',
    description: 'Uses the "10x Problem Framework": Is this problem frequent? Intense? Are people paying for bad solutions? Can tech improve it? Is the market growing? AI asks smart questions to help YOU discover ideas.',
    dailyPractice: '"Problem of the Day" — a real problem faced in Tamil Nadu. Brainstorm solutions and vote on the best ones.',
    outcome: 'Develop an "entrepreneurial eye" — see business opportunities everywhere. Build a personal Problem Bank of 20–30 validated problems.',
    sampleLessons: ['The 10x Problem Framework', 'Customer Interview Techniques', 'Pain-Point Mapping Exercise', 'Must-Have vs Nice-to-Have', 'Opportunity Sizing Guide'],
  },
  {
    id: 'canvas', title: 'Business Model Workshop', icon: <BarChart3 className="w-5 h-5" />,
    category: 'Build', color: 'from-emerald-500 to-green-600',
    tagline: '9-week guided Business Model Canvas',
    description: 'Fill out each of the 9 Canvas sections with AI-assisted guidance. For each section: a 3-minute explanation, 2 Indian startup examples, an AI coach that challenges assumptions, and peer review.',
    dailyPractice: 'Refine one Canvas section per week. After 9 weeks: complete, peer-reviewed Business Model Canvas. Auto-generates a one-page business plan.',
    outcome: 'Present a professional Business Model Canvas to any investor, mentor, or competition judge — and defend every section.',
    sampleLessons: ['Customer Segments Deep Dive', 'Crafting Your Value Proposition', 'Revenue Streams: How Will You Earn?', 'Cost Structure & Break-Even', 'Your One-Page Business Plan'],
  },
  {
    id: 'money', title: 'Money Mastery Lab', icon: <DollarSign className="w-5 h-5" />,
    category: 'Finance', color: 'from-green-600 to-emerald-700',
    tagline: 'Personal Finance + Startup Finance',
    description: 'Two tracks: Personal (budgeting, saving, EMIs, tax basics) and Startup (revenue vs profit, cash flow, pricing strategies, unit economics with real Indian scenarios).',
    dailyPractice: 'Money Minute Quiz + daily budget simulation. Weekly "Startup CFO Challenge" managing a fictional company\'s cash flow.',
    outcome: 'Create realistic financial projections, understand profitability, make informed decisions — skills 90% of first-time founders lack.',
    sampleLessons: ['Budgeting 101: Where Does Money Go?', 'Compound Interest & SIP vs FD', 'Unit Economics: Cost per Delivery', 'Break-Even Analysis Workshop', 'Reading Financial Statements'],
  },
  {
    id: 'pitch', title: 'Communication Forge', icon: <Mic className="w-5 h-5" />,
    category: 'Communicate', color: 'from-purple-500 to-violet-600',
    tagline: '5 communication modules',
    description: 'Beyond pitching: Elevator Pitch (60s), Investor Pitch (5 min), Customer Pitch (selling the product), Partner/Mentor Email (cold outreach), Storytelling (your founder narrative).',
    dailyPractice: 'Daily: pitch a random product in 60 seconds. Weekly: submit a full pitch for peer feedback. Monthly: virtual pitch day with judges.',
    outcome: 'Confidently communicate your idea to any audience — investors, customers, partners, mentors, family — adapting for each.',
    sampleLessons: ['The 60-Second Elevator Pitch', 'Problem-Solution-Market-Ask Framework', 'Writing Emails That Get Replies', 'Storytelling for Founders', 'Handling Tough Questions'],
  },
  {
    id: 'simulator', title: 'Startup Simulator', icon: <Gamepad2 className="w-5 h-5" />,
    category: 'Practice', color: 'from-rose-500 to-pink-600',
    tagline: '24 real-world scenarios',
    description: '24 scenarios across 12 simulated months based on REAL Indian startup situations. After each decision: detailed debrief on what successful founders typically do.',
    dailyPractice: 'Daily Decision: 2-minute scenario + debrief. Weekend: 15-minute session continuing your virtual company.',
    outcome: 'Experience 24 critical business situations before risking real money. Build decision-making muscle memory and emotional resilience.',
    sampleLessons: ['Cash Flow Crisis (82% of startups fail here)', 'Hire vs Outsource Decision', 'Dealing With a Copycat Competitor', 'Pivoting When Your Idea Fails', 'Supplier Negotiation Challenge'],
  },
  {
    id: 'launchkit', title: 'Real-World Launchkit', icon: <Map className="w-5 h-5" />,
    category: 'Launch', color: 'from-red-500 to-orange-600',
    tagline: '8 actionable guides • India-specific',
    description: 'Step-by-step guidance for ACTUALLY starting a business in India. No other EdTech platform offers this level of practical, regulatory guidance.',
    dailyPractice: '"Scheme of the Week" spotlight explaining one government program in simple language. Weekly updates with new opportunities and deadlines.',
    outcome: 'Know EXACTLY how to register a business, access government support, find funding, and connect with the startup ecosystem.',
    guides: [
      'Startup India Registration', 'MSME/Udyam Registration', 'GST Registration Guide',
      'TANSIM Programs (Tamil Nadu)', 'JKKN Incubation Pathway', 'Funding Guide (Mudra, Stand-Up India, CGTMSE)',
      'College Entrepreneurship Programs', 'Startup Competitions Calendar'
    ],
  },
  {
    id: 'mentors', title: 'Mentor & Community Network', icon: <Users className="w-5 h-5" />,
    category: 'Connect', color: 'from-indigo-500 to-blue-600',
    tagline: '3-layer mentorship system',
    description: 'Founder Stories Library (50+ deep-dive case studies), Monthly Mentor Sessions (live Q&A with real TN founders & JKKN alumni), and Peer Matching (skills-based co-founder matching + Accountability Pairs).',
    dailyPractice: 'Daily: read one founder insight card. Weekly: peer discussion on a case study. Monthly: attend mentor session and ask one question.',
    outcome: 'Build a real entrepreneurial network before starting a business — mentors, co-founders, and fellow aspiring entrepreneurs.',
    sampleLessons: ['How Zerodha Disrupted Broking', 'FreshToHome: Farm-to-Fork Story', 'Local Hero: TN Founder Spotlight', 'Finding Your Co-Founder', 'The Art of Asking for Help'],
  },
  {
    id: 'challenges', title: 'Startup Challenge League', icon: <Trophy className="w-5 h-5" />,
    category: 'Compete', color: 'from-yellow-500 to-amber-600',
    tagline: '12 monthly challenges = 12 real outputs',
    description: 'Monthly challenges that mirror real startup activities producing actual portfolio pieces for college applications, competitions, and investor meetings.',
    dailyPractice: 'Each challenge: Week 1 teaches the skill, Week 2 is creation, Week 3 is peer review. Winners enter external competitions.',
    outcome: 'After 12 months: a complete startup portfolio — research, business plan, financials, pitch deck, brand kit, launch plan.',
    monthlyChallengeTitles: [
      '1. Customer Discovery Report', '2. Competitive Analysis', '3. Brand Identity Kit',
      '4. Social Media Strategy', '5. MVP Wireframe', '6. Financial Model',
      '7. Pitch Deck (5 slides)', '8. Partnership Proposal', '9. Growth Hack Plan',
      '10. Investor One-Pager', '11. Demo Day Video Pitch', '12. Launch Plan'
    ],
  },
  {
    id: 'readiness', title: 'Readiness Dashboard', icon: <Activity className="w-5 h-5" />,
    category: 'Assess', color: 'from-teal-500 to-cyan-600',
    tagline: '10 dimensions • data-backed score',
    description: 'Honest, data-backed assessment across 10 entrepreneurial dimensions scored 1–100 based on ACTUAL activity — not self-assessment.',
    dailyPractice: 'Daily 3-question Skill Check. Weekly dashboard review. Monthly detailed report with specific improvement recommendations.',
    outcome: 'Know your strengths to leverage and gaps to fill — with exactly which features to use to improve each area.',
    dimensions: [
      'Problem Identification', 'Solution Design', 'Financial Literacy', 'Communication',
      'Market Awareness', 'Team Building', 'Resilience', 'Execution Skills',
      'Legal/Regulatory Knowledge', 'Network Strength'
    ],
  },
];

// ── Comparison Table ──
const comparison = [
  { bad: 'Random startup tips and quizzes', good: 'Structured 180-day curriculum following accelerator methodology' },
  { bad: 'AI generates ideas FOR the student', good: 'AI guides the student to DISCOVER ideas themselves' },
  { bad: 'Template-based business plan', good: 'Business Model Canvas workshop with AI coaching & peer review' },
  { bad: 'Gamification for engagement only', good: 'Gamification that tracks REAL skill development' },
  { bad: 'Simple simulation games', good: 'Scenario-based decisions modeled on real Indian startup situations' },
  { bad: '"Start a business" advice', good: 'Step-by-step Indian regulatory guidance with govt scheme access' },
];

export const StartupGuide = () => {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('journey');

  // Simulated readiness scores
  const readinessScores = [
    { name: 'Problem Identification', score: 0 },
    { name: 'Solution Design', score: 0 },
    { name: 'Financial Literacy', score: 0 },
    { name: 'Communication', score: 0 },
    { name: 'Market Awareness', score: 0 },
    { name: 'Team Building', score: 0 },
    { name: 'Resilience', score: 0 },
    { name: 'Execution Skills', score: 0 },
    { name: 'Legal/Regulatory', score: 0 },
    { name: 'Network Strength', score: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
          <Rocket className="w-4 h-4" />
          Complete Entrepreneurship Guidance System
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          From Curious Learner to Successful Founder
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
          A 12-month journey with 180 daily lessons, 10 powerful features, and a real startup portfolio. Not just engagement — real transformation.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Daily Lessons', value: '180', icon: <BookOpen className="w-4 h-4" /> },
          { label: 'Features', value: '10', icon: <Sparkles className="w-4 h-4" /> },
          { label: 'Journey Stages', value: '6', icon: <Map className="w-4 h-4" /> },
          { label: 'Portfolio Pieces', value: '12', icon: <Trophy className="w-4 h-4" /> },
        ].map((stat, i) => (
          <Card key={i} className="text-center p-3 border-border/50 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-primary mb-1">
              {stat.icon}
              <span className="text-xl font-bold">{stat.value}</span>
            </div>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full flex overflow-x-auto gap-1 bg-muted/50 p-1 h-auto flex-wrap">
          <TabsTrigger value="journey" className="text-xs flex-1 min-w-[80px]">🗺️ Journey</TabsTrigger>
          <TabsTrigger value="features" className="text-xs flex-1 min-w-[80px]">⚡ Features</TabsTrigger>
          <TabsTrigger value="readiness" className="text-xs flex-1 min-w-[80px]">📊 Readiness</TabsTrigger>
          <TabsTrigger value="launchkit" className="text-xs flex-1 min-w-[80px]">🚀 Launchkit</TabsTrigger>
        </TabsList>

        {/* ── JOURNEY TAB ── */}
        <TabsContent value="journey" className="space-y-4 mt-4">
          <div className="text-center mb-2">
            <h3 className="text-lg font-bold text-foreground">The 6-Stage Entrepreneurship Journey</h3>
            <p className="text-xs text-muted-foreground">40 weeks from "zero business knowledge" to "launch-ready"</p>
          </div>

          <div className="space-y-3">
            {journeyStages.map((stage) => {
              const isOpen = expandedStage === stage.id;
              return (
                <Card key={stage.id} className="overflow-hidden border-border/50">
                  <button
                    className="w-full text-left p-4 flex items-start gap-3"
                    onClick={() => setExpandedStage(isOpen ? null : stage.id)}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${stage.color} text-white flex items-center justify-center font-bold text-sm shadow-md`}>
                      {stage.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge variant="secondary" className="text-[10px]">Weeks {stage.weeks}</Badge>
                      </div>
                      <h4 className="font-semibold text-sm text-foreground">{stage.title}</h4>
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />}
                  </button>
                  {isOpen && (
                    <CardContent className="pt-0 pb-4 px-4 space-y-3">
                      <p className="text-sm text-muted-foreground">{stage.description}</p>
                      <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                        <p className="text-xs font-medium text-primary flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5" /> Outcome
                        </p>
                        <p className="text-sm text-foreground mt-1 italic">{stage.outcome}</p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Comparison Table */}
          <Card className="overflow-hidden border-border/50 mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">What Makes JKKN Different</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {comparison.map((row, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-destructive/5 rounded-lg p-2 flex items-start gap-1.5">
                    <span className="text-destructive mt-0.5">✕</span>
                    <span className="text-muted-foreground">{row.bad}</span>
                  </div>
                  <div className="bg-emerald-500/5 rounded-lg p-2 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{row.good}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── FEATURES TAB ── */}
        <TabsContent value="features" className="space-y-4 mt-4">
          <div className="text-center mb-2">
            <h3 className="text-lg font-bold text-foreground">10 Guidance-First Features</h3>
            <p className="text-xs text-muted-foreground">Every feature provides genuine entrepreneurial guidance AND daily engagement</p>
          </div>

          <div className="space-y-3">
            {features.map((feature) => {
              const isOpen = expandedFeature === feature.id;
              return (
                <Card key={feature.id} className="overflow-hidden border-border/50 hover:shadow-md transition-shadow">
                  <button
                    className="w-full text-left p-4 flex items-start gap-3"
                    onClick={() => setExpandedFeature(isOpen ? null : feature.id)}
                  >
                    <div className={`flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-md`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <Badge variant="secondary" className="text-[10px]">{feature.category}</Badge>
                        <span className="text-[10px] text-muted-foreground">{feature.tagline}</span>
                      </div>
                      <h4 className="font-semibold text-sm text-foreground">{feature.title}</h4>
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />}
                  </button>

                  {isOpen && (
                    <CardContent className="pt-0 pb-4 px-4 space-y-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>

                      {/* Daily Practice */}
                      <div className="bg-amber-500/5 rounded-lg p-3 border border-amber-500/10">
                        <p className="text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-1">
                          <Flame className="w-3.5 h-3.5" /> Daily Practice
                        </p>
                        <p className="text-xs text-muted-foreground">{feature.dailyPractice}</p>
                      </div>

                      {/* Outcome */}
                      <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                        <p className="text-xs font-medium text-primary flex items-center gap-1.5 mb-1">
                          <Star className="w-3.5 h-3.5" /> Learner Outcome
                        </p>
                        <p className="text-xs text-foreground">{feature.outcome}</p>
                      </div>

                      {/* Sample Lessons / Guides / Challenges */}
                      {'sampleLessons' in feature && feature.sampleLessons && (
                        <div className="space-y-1.5">
                          <p className="text-xs font-medium text-muted-foreground">Sample Lessons:</p>
                          {feature.sampleLessons.map((lesson, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-foreground">
                              <BookOpen className="w-3 h-3 text-primary flex-shrink-0" />
                              {lesson}
                            </div>
                          ))}
                        </div>
                      )}

                      {'guides' in feature && feature.guides && (
                        <div className="space-y-1.5">
                          <p className="text-xs font-medium text-muted-foreground">8 Actionable Guides:</p>
                          {feature.guides.map((guide, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-foreground">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                              {guide}
                            </div>
                          ))}
                        </div>
                      )}

                      {'monthlyChallengeTitles' in feature && feature.monthlyChallengeTitles && (
                        <div className="space-y-1.5">
                          <p className="text-xs font-medium text-muted-foreground">12 Monthly Challenges:</p>
                          <div className="grid grid-cols-2 gap-1.5">
                            {feature.monthlyChallengeTitles.map((ch, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-[11px] text-foreground bg-muted/50 rounded px-2 py-1">
                                <Trophy className="w-3 h-3 text-amber-500 flex-shrink-0" />
                                <span className="truncate">{ch}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {'dimensions' in feature && feature.dimensions && (
                        <div className="space-y-1.5">
                          <p className="text-xs font-medium text-muted-foreground">10 Assessment Dimensions:</p>
                          <div className="grid grid-cols-2 gap-1.5">
                            {feature.dimensions.map((dim, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-[11px] text-foreground bg-muted/50 rounded px-2 py-1">
                                <Activity className="w-3 h-3 text-teal-500 flex-shrink-0" />
                                {dim}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* ── READINESS TAB ── */}
        <TabsContent value="readiness" className="space-y-4 mt-4">
          <div className="text-center mb-2">
            <h3 className="text-lg font-bold text-foreground">Entrepreneurship Readiness Dashboard</h3>
            <p className="text-xs text-muted-foreground">10 dimensions scored 1–100 based on your actual activity</p>
          </div>

          <Card className="border-border/50">
            <CardContent className="p-4 space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 mb-2">
                  <span className="text-2xl font-bold text-primary">0</span>
                </div>
                <p className="text-sm font-medium text-foreground">Overall Readiness Score</p>
                <p className="text-xs text-muted-foreground">Complete features to increase your score</p>
              </div>

              <div className="space-y-3">
                {readinessScores.map((dim, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-foreground">{dim.name}</span>
                      <span className="text-xs font-medium text-muted-foreground">{dim.score}/100</span>
                    </div>
                    <Progress value={dim.score} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-lg p-3 text-center">
                <Lock className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Start the Mastery Path and complete daily lessons to unlock your readiness scores</p>
              </div>
            </CardContent>
          </Card>

          {/* Gamification Preview */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" /> Meaningful Gamification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { bad: '+10 XP for opening the app', good: '+25 XP for completing a lesson WITH the micro-task' },
                { bad: 'Badge for 7-day streak', good: 'Badge for completing your first Customer Discovery Report' },
                { bad: 'Leaderboard by total XP', good: 'Leaderboard by Readiness Score improvement %' },
                { bad: 'Level 10 unlocks a title', good: 'Level 10 unlocks mentor session access' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-destructive/5 rounded p-2 line-through text-muted-foreground">{row.bad}</div>
                  <div className="bg-emerald-500/5 rounded p-2 text-foreground font-medium">{row.good}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── LAUNCHKIT TAB ── */}
        <TabsContent value="launchkit" className="space-y-4 mt-4">
          <div className="text-center mb-2">
            <h3 className="text-lg font-bold text-foreground">Real-World Launchkit</h3>
            <p className="text-xs text-muted-foreground">Step-by-step guidance to ACTUALLY start a business in India</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { title: 'Startup India Registration', desc: 'Step-by-step DPIIT recognition with screenshots. Get tax benefits, IPR support, and govt tender eligibility.', icon: <Building2 className="w-5 h-5" />, link: 'https://www.startupindia.gov.in/' },
              { title: 'MSME/Udyam Registration', desc: 'Free online registration. Access priority sector lending, subsidies, and govt procurement benefits.', icon: <Award className="w-5 h-5" />, link: 'https://udyamregistration.gov.in/' },
              { title: 'GST Registration', desc: 'When you need it (₹20L+ turnover), how to get it, and compliance basics for new businesses.', icon: <DollarSign className="w-5 h-5" /> },
              { title: 'TANSIM Programs', desc: 'Tamil Nadu Startup & Innovation Mission — state-level incubation, grants up to ₹30L, and mentorship.', icon: <Map className="w-5 h-5" />, link: 'https://www.startuptn.in/' },
              { title: 'JKKN Incubation Pathway', desc: 'Access JKKN\'s own incubation support, labs, mentors, and seed funding for student startups.', icon: <GraduationCap className="w-5 h-5" /> },
              { title: 'Funding Guide', desc: 'Bootstrapping → Mudra Loans → Stand-Up India → Angel Investors → CGTMSE. Know every option.', icon: <TrendingUp className="w-5 h-5" /> },
              { title: 'College E-Cells & Incubators', desc: 'Which colleges have the best startup support — IIT Madras, IIM-A, NSRCEL, EDII, and more.', icon: <Building2 className="w-5 h-5" /> },
              { title: 'Startup Competitions', desc: 'Constantly updated calendar of competitions you can enter — Smart India Hackathon, TiE, NASSCOM, and more.', icon: <Trophy className="w-5 h-5" /> },
            ].map((guide, i) => (
              <Card key={i} className="border-border/50 hover:shadow-md transition-shadow">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 text-white flex-shrink-0">
                      {guide.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-foreground">{guide.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{guide.desc}</p>
                    </div>
                  </div>
                  {guide.link && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs justify-center mt-1"
                      onClick={() => window.open(guide.link, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-1.5" /> Visit Official Portal
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Scheme of the Week */}
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500 text-white flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <Badge className="bg-amber-500 text-white text-[10px] mb-1">Scheme of the Week</Badge>
                  <h4 className="font-semibold text-sm text-foreground">PMMY Mudra Loans</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Loans up to ₹10 lakh without collateral for micro/small enterprises. Three categories: Shishu (up to ₹50K), Kishore (₹50K–₹5L), Tarun (₹5L–₹10L). No processing fee.
                  </p>
                  <Button variant="link" size="sm" className="text-xs p-0 h-auto mt-1" onClick={() => window.open('https://www.mudra.org.in/', '_blank')}>
                    Learn more <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom CTA */}
      <Card className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border-pink-200 dark:border-pink-800">
        <CardContent className="p-6 text-center space-y-3">
          <Rocket className="w-8 h-8 text-pink-600 mx-auto" />
          <h3 className="text-lg font-bold text-foreground">Your Entrepreneurship Journey Starts Now</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            After 12 months, you won't just "know about" entrepreneurship — you'll be genuinely prepared to launch, or enter any college program as the most prepared person in the room.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button
              className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white"
              onClick={() => window.open('https://www.startupindia.gov.in/', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Startup India Portal
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('https://www.startuptn.in/', '_blank')}
            >
              <Map className="w-4 h-4 mr-2" />
              TANSIM Tamil Nadu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
