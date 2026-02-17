import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Rocket, Lightbulb, Users, TrendingUp, BookOpen, Target, DollarSign, Award,
  ExternalLink, ChevronDown, ChevronUp, Search, BarChart3, Mic,
  Gamepad2, Map, Trophy, Activity, CheckCircle2, Lock,
  Star, Flame, ArrowRight, Sparkles, GraduationCap, Building2, Zap,
  Brain, Compass, BadgeCheck, Layers, Route
} from 'lucide-react';
import { DailyLesson } from './DailyLesson';
import { MoneyMinuteQuiz } from './MoneyMinuteQuiz';
import { ProblemOfTheDay } from './ProblemOfTheDay';
import { StartupSimulator } from './StartupSimulator';
import { FounderStories } from './FounderStories';
import { useStartupProgress } from './useStartupProgress';

const journeyStages = [
  { id: 1, weeks: '1–2', title: 'What Even Is Entrepreneurship?', description: 'Shatter myths. Discover that entrepreneurs are problem-solvers.', outcome: '"Wait… maybe I could do this too."', color: 'from-amber-500 to-orange-500' },
  { id: 2, weeks: '3–6', title: 'Find a Problem Worth Solving', description: 'Learn customer discovery, observation, and problem validation.', outcome: '2–3 validated problems worth solving.', color: 'from-blue-500 to-indigo-600' },
  { id: 3, weeks: '7–10', title: 'Turn a Problem Into a Business', description: 'Business Model Canvas, MVPs, and unit economics.', outcome: '1 strong idea with a validated model.', color: 'from-orange-500 to-green-600' },
  { id: 4, weeks: '11–16', title: 'Plan and Build It', description: 'Business plan, brand identity, marketing, financials.', outcome: 'Complete business plan + confident pitch.', color: 'from-purple-500 to-violet-600' },
  { id: 5, weeks: '17–24', title: 'Test in the Real World', description: 'Simulation, mentors, and real-world testing.', outcome: 'Experience the startup rollercoaster safely.', color: 'from-rose-500 to-pink-600' },
  { id: 6, weeks: '25–40', title: 'Actually Launch', description: 'Startup India, MSME, TANSIM, competitions.', outcome: 'Launch-ready or know exactly what to develop.', color: 'from-cyan-500 to-amber-600' },
];

export const StartupGuide = () => {
  const [activeTab, setActiveTab] = useState('learn');
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const progress = useStartupProgress();

  return (
    <div className="space-y-0">
      {/* ===== DARK HERO SECTION ===== */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 px-6 py-10 md:py-14 text-center mb-6">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-orange-500/10 to-amber-500/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-emerald-500/8 to-teal-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M20 20h20v20H20z%22/%3E%3C/g%3E%3C/svg%3E')]" />

        <div className="relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2.5 bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] text-white/90 px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Complete Startup App Blueprint · India 2025
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight font-serif italic">
              The <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Complete</span> Startup
            </h2>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight font-serif italic">
              App for <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Student Founders</span>
            </h2>
          </div>

          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
            From identifying a problem with AI to finding funding from government, corporate & NGO schemes — every feature your app needs, in one blueprint.
          </p>

          <div className="flex justify-center gap-6 md:gap-10 pt-2">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-orange-400">
                <Zap className="w-4 h-4" />
                <span className="text-lg font-bold text-white">{progress.xp}</span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-0.5">XP Earned</p>
            </div>
            <div className="w-px h-8 bg-white/10 self-center" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-amber-400">
                <Flame className="w-4 h-4" />
                <span className="text-lg font-bold text-white">{progress.streak}</span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-0.5">Day Streak</p>
            </div>
            <div className="w-px h-8 bg-white/10 self-center" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-emerald-400">
                <BookOpen className="w-4 h-4" />
                <span className="text-lg font-bold text-white">{progress.completedLessons.length}</span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-0.5">Lessons</p>
            </div>
            <div className="w-px h-8 bg-white/10 self-center" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-violet-400">
                <Activity className="w-4 h-4" />
                <span className="text-lg font-bold text-white">{progress.overallScore}</span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-0.5">Readiness</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FEATURE TABS ===== */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 rounded-xl p-1.5 mb-5 border border-white/[0.06] shadow-lg">
          <TabsList className="w-full flex overflow-x-auto gap-1 bg-transparent p-0 h-auto">
            <TabsTrigger value="learn" className="text-[11px] md:text-xs flex-1 min-w-[80px] px-2.5 py-2.5 text-gray-400 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-orange-500/25 hover:text-white/80 font-medium gap-1.5">
              <Brain className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Problem Finder</span>
              <span className="sm:hidden">Learn</span>
            </TabsTrigger>
            <TabsTrigger value="discover" className="text-[11px] md:text-xs flex-1 min-w-[80px] px-2.5 py-2.5 text-gray-400 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/25 hover:text-white/80 font-medium gap-1.5">
              <BadgeCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Validate Solution</span>
              <span className="sm:hidden">Validate</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="text-[11px] md:text-xs flex-1 min-w-[80px] px-2.5 py-2.5 text-gray-400 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-yellow-500/25 hover:text-white/80 font-medium gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Get Funding</span>
              <span className="sm:hidden">Fund</span>
            </TabsTrigger>
            <TabsTrigger value="simulate" className="text-[11px] md:text-xs flex-1 min-w-[80px] px-2.5 py-2.5 text-gray-400 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/25 hover:text-white/80 font-medium gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Govt & Corp Schemes</span>
              <span className="sm:hidden">Schemes</span>
            </TabsTrigger>
            <TabsTrigger value="mentors" className="text-[11px] md:text-xs flex-1 min-w-[80px] px-2.5 py-2.5 text-gray-400 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-violet-500/25 hover:text-white/80 font-medium gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">All App Features</span>
              <span className="sm:hidden">Features</span>
            </TabsTrigger>
            <TabsTrigger value="readiness" className="text-[11px] md:text-xs flex-1 min-w-[80px] px-2.5 py-2.5 text-gray-400 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-rose-500/25 hover:text-white/80 font-medium gap-1.5">
              <Route className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Founder Journey</span>
              <span className="sm:hidden">Journey</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="learn" className="mt-4">
          <DailyLesson completedLessons={progress.completedLessons} onCompleteLesson={progress.completeLesson} currentStage={progress.currentStage} />
        </TabsContent>

        <TabsContent value="discover" className="mt-4">
          <ProblemOfTheDay onSubmit={progress.submitProblem} />
        </TabsContent>

        <TabsContent value="quiz" className="mt-4">
          <MoneyMinuteQuiz onComplete={progress.completeQuiz} />
        </TabsContent>

        <TabsContent value="simulate" className="mt-4">
          <StartupSimulator completedScenarios={progress.completedScenarios} onCompleteScenario={progress.completeScenario} />
        </TabsContent>

        <TabsContent value="mentors" className="mt-4">
          <FounderStories />
        </TabsContent>

        <TabsContent value="readiness" className="space-y-4 mt-4">
          <Card className="border-border/50 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-900 to-slate-900 p-4 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/10 border-2 border-orange-400/30 shadow-lg shadow-orange-500/10 mb-2">
                <span className="text-2xl font-bold text-orange-400">{progress.overallScore}</span>
              </div>
              <p className="text-sm font-medium text-white">Overall Readiness Score</p>
              <p className="text-xs text-gray-400 mt-1">
                {progress.overallScore === 0 ? 'Complete activities to build your score' :
                  progress.overallScore < 30 ? 'You\'re just getting started — keep going!' :
                    progress.overallScore < 60 ? 'Making great progress! 💪' :
                      'You\'re becoming launch-ready! 🚀'}
              </p>
            </div>
            <CardContent className="p-4 space-y-3">
              {Object.entries(progress.readinessScores).map(([name, score]) => (
                <div key={name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-foreground">{name}</span>
                    <span className="text-xs font-medium text-muted-foreground">{score}/100</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <div>
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Route className="w-4 h-4 text-orange-500" />
              Your Founder Journey
            </h3>
            <div className="space-y-2">
              {journeyStages.map((stage) => {
                const isActive = stage.id === progress.currentStage;
                const isLocked = stage.id > progress.currentStage;
                const isDone = stage.id < progress.currentStage;
                const isOpen = expandedStage === stage.id;
                return (
                  <button key={stage.id} className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${isActive ? 'border-orange-400/50 bg-gradient-to-r from-orange-50/60 to-amber-50/40 shadow-sm shadow-orange-500/10' : isLocked ? 'border-border/30 opacity-50' : 'border-orange-400/20 bg-orange-50/20'}`} onClick={() => setExpandedStage(isOpen ? null : stage.id)}>
                    <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${isDone ? 'bg-gradient-to-br from-emerald-500 to-green-500 text-white' : isActive ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : isLocked ? <Lock className="w-3.5 h-3.5" /> : stage.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">{stage.title}</p>
                      <p className="text-[10px] text-muted-foreground">Weeks {stage.weeks}</p>
                    </div>
                    {isActive && <Badge className="text-[10px] bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-sm">Current</Badge>}
                  </button>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* ===== LAUNCH RESOURCES ===== */}
      <div className="mt-6">
        <div className="bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 rounded-xl p-4 mb-4 border border-white/[0.06]">
          <h3 className="text-sm font-bold text-white text-center flex items-center justify-center gap-2">
            <Rocket className="w-4 h-4 text-orange-400" />
            Real-World Launchkit
          </h3>
          <p className="text-[10px] text-gray-400 text-center mt-1">Step-by-step guidance to start a business in India</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: 'Startup India Registration', desc: 'DPIIT recognition, tax benefits, IPR support.', icon: <Building2 className="w-4 h-4" />, link: 'https://www.startupindia.gov.in/', gradient: 'from-orange-500 to-amber-500' },
            { title: 'MSME/Udyam Registration', desc: 'Free registration. Priority lending & subsidies.', icon: <Award className="w-4 h-4" />, link: 'https://udyamregistration.gov.in/', gradient: 'from-emerald-500 to-green-500' },
            { title: 'TANSIM Programs', desc: 'Tamil Nadu startup grants up to ₹30L & mentorship.', icon: <Map className="w-4 h-4" />, link: 'https://www.startuptn.in/', gradient: 'from-blue-500 to-indigo-500' },
            { title: 'PMMY Mudra Loans', desc: 'Up to ₹10L without collateral. Shishu/Kishore/Tarun.', icon: <DollarSign className="w-4 h-4" />, link: 'https://www.mudra.org.in/', gradient: 'from-violet-500 to-purple-500' },
            { title: 'GST Registration', desc: 'When needed (₹20L+ turnover) and how to register.', icon: <BarChart3 className="w-4 h-4" />, gradient: 'from-rose-500 to-pink-500' },
            { title: 'TANSIM Incubation', desc: 'Access TN startup incubators, mentors, and seed funding.', icon: <GraduationCap className="w-4 h-4" />, gradient: 'from-cyan-500 to-teal-500' },
            { title: 'College E-Cells', desc: 'Best startup incubators: IIT-M, IIM-A, NSRCEL, EDII.', icon: <Building2 className="w-4 h-4" />, gradient: 'from-amber-500 to-yellow-500' },
            { title: 'Startup Competitions', desc: 'Smart India Hackathon, TiE, NASSCOM & more.', icon: <Trophy className="w-4 h-4" />, gradient: 'from-red-500 to-orange-500' },
          ].map((guide, i) => (
            <Card key={i} className="group border-border/40 hover:border-orange-300/50 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 overflow-hidden">
              <CardContent className="p-3.5 flex items-start gap-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${guide.gradient} text-white flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                  {guide.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{guide.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{guide.desc}</p>
                  {guide.link && (
                    <Button variant="link" size="sm" className="text-xs p-0 h-auto mt-1 text-orange-600 hover:text-orange-700" onClick={() => window.open(guide.link, '_blank')}>
                      Visit Portal <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
