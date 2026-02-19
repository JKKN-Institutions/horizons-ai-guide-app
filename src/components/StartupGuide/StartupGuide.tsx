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
  Brain, Compass, BadgeCheck, Layers, Route, Globe
} from 'lucide-react';
import { DailyLesson } from './DailyLesson';
import { AIProblemFinder } from './AIProblemFinder';
import { MoneyMinuteQuiz } from './MoneyMinuteQuiz';
import { ProblemOfTheDay } from './ProblemOfTheDay';
import { StartupSimulator } from './StartupSimulator';
import { FounderStories } from './FounderStories';
import { FounderJourney } from './FounderJourney';
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
      {/* ===== JKKN GREEN HERO SECTION ===== */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#14532d] via-[#166534] to-[#1a4731] px-6 py-10 md:py-14 text-center mb-6 shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-amber-400/10 to-yellow-400/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-emerald-300/10 to-green-400/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Complete Startup App Blueprint · India 2025
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight font-serif italic">
              The <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">Complete</span> Startup
            </h2>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight font-serif italic">
              App for <span className="bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">Student Founders</span>
            </h2>
          </div>

          <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto leading-relaxed">
            From identifying a problem with AI to finding funding from government, corporate & NGO schemes — every feature your app needs, in one blueprint.
          </p>

          <div className="flex justify-center gap-6 md:gap-10 pt-2">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-amber-300">
                <Zap className="w-4 h-4" />
                <span className="text-lg font-bold text-white">{progress.xp}</span>
              </div>
              <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider mt-0.5">XP Earned</p>
            </div>
            <div className="w-px h-8 bg-white/15 self-center" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-yellow-300">
                <Flame className="w-4 h-4" />
                <span className="text-lg font-bold text-white">{progress.streak}</span>
              </div>
              <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider mt-0.5">Day Streak</p>
            </div>
            <div className="w-px h-8 bg-white/15 self-center" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-emerald-300">
                <BookOpen className="w-4 h-4" />
                <span className="text-lg font-bold text-white">{progress.completedLessons.length}</span>
              </div>
              <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider mt-0.5">Lessons</p>
            </div>
            <div className="w-px h-8 bg-white/15 self-center" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-green-300">
                <Activity className="w-4 h-4" />
                <span className="text-lg font-bold text-white">{progress.overallScore}</span>
              </div>
              <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider mt-0.5">Readiness</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FEATURE TABS ===== */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-gradient-to-r from-[#14532d] via-[#166534] to-[#14532d] rounded-xl p-1.5 mb-5 border border-emerald-700/30 shadow-lg">
          <TabsList className="w-full flex overflow-x-auto gap-1 bg-transparent p-0 h-auto">
            <TabsTrigger value="learn" className="text-[11px] md:text-xs flex-1 min-w-[80px] px-2.5 py-2.5 text-white/50 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400 data-[state=active]:text-green-900 data-[state=active]:font-bold data-[state=active]:shadow-lg data-[state=active]:shadow-amber-400/25 hover:text-white/80 font-medium gap-1.5">
              <Brain className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="discover" className="text-[11px] md:text-xs flex-1 min-w-[80px] px-2.5 py-2.5 text-white/50 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400 data-[state=active]:text-green-900 data-[state=active]:font-bold data-[state=active]:shadow-lg data-[state=active]:shadow-amber-400/25 hover:text-white/80 font-medium gap-1.5">
              <BadgeCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Mentor</span>
              <span className="sm:hidden">AI Mentor</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="text-[11px] md:text-xs flex-1 min-w-[80px] px-2.5 py-2.5 text-white/50 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400 data-[state=active]:text-green-900 data-[state=active]:font-bold data-[state=active]:shadow-lg data-[state=active]:shadow-amber-400/25 hover:text-white/80 font-medium gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">My Tasks</span>
              <span className="sm:hidden">My Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="simulate" className="text-[11px] md:text-xs flex-1 min-w-[80px] px-2.5 py-2.5 text-white/50 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400 data-[state=active]:text-green-900 data-[state=active]:font-bold data-[state=active]:shadow-lg data-[state=active]:shadow-amber-400/25 hover:text-white/80 font-medium gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Problem and Survey</span>
              <span className="sm:hidden">Survey</span>
            </TabsTrigger>
            <TabsTrigger value="mentors" className="text-[11px] md:text-xs flex-1 min-w-[80px] px-2.5 py-2.5 text-white/50 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400 data-[state=active]:text-green-900 data-[state=active]:font-bold data-[state=active]:shadow-lg data-[state=active]:shadow-amber-400/25 hover:text-white/80 font-medium gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Build My Startup</span>
              <span className="sm:hidden">Build</span>
            </TabsTrigger>
            <TabsTrigger value="readiness" className="text-[11px] md:text-xs flex-1 min-w-[80px] px-2.5 py-2.5 text-white/50 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400 data-[state=active]:text-green-900 data-[state=active]:font-bold data-[state=active]:shadow-lg data-[state=active]:shadow-amber-400/25 hover:text-white/80 font-medium gap-1.5">
              <Route className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">TN Inspiration Founder Journey</span>
              <span className="sm:hidden">TN Founders</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-[11px] md:text-xs flex-1 min-w-[80px] px-2.5 py-2.5 text-white/50 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400 data-[state=active]:text-green-900 data-[state=active]:font-bold data-[state=active]:shadow-lg data-[state=active]:shadow-amber-400/25 hover:text-white/80 font-medium gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Profile</span>
              <span className="sm:hidden">Profile</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="learn" className="mt-4">
          <AIProblemFinder />
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

        <TabsContent value="readiness" className="mt-4">
          <FounderJourney />
        </TabsContent>

        <TabsContent value="profile" className="mt-4">
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-[#14532d] via-[#166534] to-[#1a4731] rounded-xl p-5 border border-emerald-700/30 text-center shadow-lg">
              <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/25 text-amber-300 px-4 py-1.5 rounded-full text-[11px] font-semibold mb-3">
                <Users className="w-3.5 h-3.5" />
                Startup Profile
              </div>
              <h3 className="text-lg font-bold text-white mb-1">My Founder Profile</h3>
              <p className="text-xs text-white/50 max-w-md mx-auto">
                Track your startup journey progress, achievements, and milestones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Progress Card */}
              <Card className="border-border/40 overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">My Progress</p>
                      <p className="text-xs text-muted-foreground">Your startup readiness score</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Overall Readiness</span>
                      <span className="font-bold text-foreground">{progress.overallScore}%</span>
                    </div>
                    <Progress value={progress.overallScore} className="h-2" />
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="bg-amber-50 rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-amber-700">{progress.xp}</p>
                        <p className="text-[10px] text-amber-600 font-medium">XP Earned</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-orange-700">{progress.streak}</p>
                        <p className="text-[10px] text-orange-600 font-medium">Day Streak</p>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-emerald-700">{progress.completedLessons.length}</p>
                        <p className="text-[10px] text-emerald-600 font-medium">Lessons Done</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-blue-700">{progress.completedScenarios.length}</p>
                        <p className="text-[10px] text-blue-600 font-medium">Scenarios</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements Card */}
              <Card className="border-border/40 overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-md">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Achievements</p>
                      <p className="text-xs text-muted-foreground">Badges & milestones unlocked</p>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { title: 'First Problem Identified', desc: 'Found your first problem to solve', icon: '🎯', done: progress.xp > 0 },
                      { title: 'Quiz Champion', desc: 'Completed a funding quiz', icon: '🧠', done: progress.completedLessons.length > 0 },
                      { title: 'Week Warrior', desc: '7-day learning streak', icon: '🔥', done: progress.streak >= 7 },
                      { title: 'Scenario Master', desc: 'Completed 3 startup scenarios', icon: '🚀', done: progress.completedScenarios.length >= 3 },
                      { title: 'Startup Ready', desc: 'Reached 80% readiness score', icon: '⭐', done: progress.overallScore >= 80 },
                    ].map((badge, i) => (
                      <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg border ${badge.done ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200 opacity-50'}`}>
                        <span className="text-xl">{badge.icon}</span>
                        <div className="flex-1">
                          <p className={`text-xs font-semibold ${badge.done ? 'text-emerald-800' : 'text-gray-500'}`}>{badge.title}</p>
                          <p className="text-[10px] text-muted-foreground">{badge.desc}</p>
                        </div>
                        {badge.done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Journey Stages */}
            <Card className="border-border/40 overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md">
                    <Map className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">My Startup Journey</p>
                    <p className="text-xs text-muted-foreground">40-week roadmap to launching your startup</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {journeyStages.map((stage) => (
                    <div key={stage.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/40 hover:border-emerald-300/50 transition-all">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center text-white text-xs font-bold shadow-md flex-shrink-0`}>
                        {stage.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground">{stage.title}</p>
                        <p className="text-[10px] text-muted-foreground">Weeks {stage.weeks}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium px-2 py-1 bg-gray-100 rounded-full">Upcoming</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* ===== LAUNCH RESOURCES ===== */}
      <div className="mt-6">
        <div className="bg-gradient-to-r from-[#14532d] via-[#166534] to-[#14532d] rounded-xl p-4 mb-4 border border-emerald-700/30 shadow-lg">
          <h3 className="text-sm font-bold text-white text-center flex items-center justify-center gap-2">
            <Rocket className="w-4 h-4 text-amber-300" />
            Real-World Launchkit
          </h3>
          <p className="text-[10px] text-white/50 text-center mt-1">Step-by-step guidance to start a business in India</p>
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
            <Card key={i} className="group border-border/40 hover:border-green-300/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 overflow-hidden">
              <CardContent className="p-3.5 flex items-start gap-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${guide.gradient} text-white flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                  {guide.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{guide.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{guide.desc}</p>
                  {guide.link && (
                    <Button variant="link" size="sm" className="text-xs p-0 h-auto mt-1 text-green-700 hover:text-green-800" onClick={() => window.open(guide.link, '_blank')}>
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
