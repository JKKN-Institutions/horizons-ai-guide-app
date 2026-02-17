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
  Star, Flame, ArrowRight, Sparkles, GraduationCap, Building2, Zap
} from 'lucide-react';
import { DailyLesson } from './DailyLesson';
import { MoneyMinuteQuiz } from './MoneyMinuteQuiz';
import { ProblemOfTheDay } from './ProblemOfTheDay';
import { StartupSimulator } from './StartupSimulator';
import { FounderStories } from './FounderStories';
import { useStartupProgress } from './useStartupProgress';

// Journey stages data
const journeyStages = [
  { id: 1, weeks: '1–2', title: 'What Even Is Entrepreneurship?', description: 'Shatter myths. Discover that entrepreneurs are problem-solvers.', outcome: '"Wait… maybe I could do this too."', color: 'from-amber-500 to-orange-500' },
  { id: 2, weeks: '3–6', title: 'Find a Problem Worth Solving', description: 'Learn customer discovery, observation, and problem validation.', outcome: '2–3 validated problems worth solving.', color: 'from-blue-500 to-indigo-600' },
  { id: 3, weeks: '7–10', title: 'Turn a Problem Into a Business', description: 'Business Model Canvas, MVPs, and unit economics.', outcome: '1 strong idea with a validated model.', color: 'from-emerald-500 to-green-600' },
  { id: 4, weeks: '11–16', title: 'Plan and Build It', description: 'Business plan, brand identity, marketing, financials.', outcome: 'Complete business plan + confident pitch.', color: 'from-purple-500 to-violet-600' },
  { id: 5, weeks: '17–24', title: 'Test in the Real World', description: 'Simulation, mentors, and real-world testing.', outcome: 'Experience the startup rollercoaster safely.', color: 'from-rose-500 to-pink-600' },
  { id: 6, weeks: '25–40', title: 'Actually Launch', description: 'Startup India, MSME, TANSIM, competitions.', outcome: 'Launch-ready or know exactly what to develop.', color: 'from-cyan-500 to-teal-600' },
];

export const StartupGuide = () => {
  const [activeTab, setActiveTab] = useState('learn');
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const progress = useStartupProgress();

  return (
    <div className="space-y-4">
      {/* Hero + Stats Bar */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-2 rounded-full text-xs font-semibold shadow-lg shadow-emerald-500/20 border border-emerald-400/20">
          <Rocket className="w-3.5 h-3.5" />
          Complete Entrepreneurship Guidance System
        </div>
        <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
          From Curious Learner to Successful Founder
        </h2>
      </div>

      {/* XP / Streak Bar */}
      <div className="grid grid-cols-4 gap-2">
        <Card className="text-center p-2 border-emerald-200/50 bg-gradient-to-br from-emerald-50/50 to-white shadow-sm">
          <div className="flex items-center justify-center gap-1 text-emerald-600">
            <Zap className="w-3.5 h-3.5" />
            <span className="text-sm font-bold">{progress.xp}</span>
          </div>
          <p className="text-[10px] text-emerald-700/60 font-medium">XP</p>
        </Card>
        <Card className="text-center p-2 border-amber-200/50 bg-gradient-to-br from-amber-50/50 to-white shadow-sm">
          <div className="flex items-center justify-center gap-1 text-amber-600">
            <Flame className="w-3.5 h-3.5" />
            <span className="text-sm font-bold">{progress.streak}</span>
          </div>
          <p className="text-[10px] text-amber-700/60 font-medium">Streak</p>
        </Card>
        <Card className="text-center p-2 border-teal-200/50 bg-gradient-to-br from-teal-50/50 to-white shadow-sm">
          <div className="flex items-center justify-center gap-1 text-teal-600">
            <BookOpen className="w-3.5 h-3.5" />
            <span className="text-sm font-bold">{progress.completedLessons.length}</span>
          </div>
          <p className="text-[10px] text-teal-700/60 font-medium">Lessons</p>
        </Card>
        <Card className="text-center p-2 border-indigo-200/50 bg-gradient-to-br from-indigo-50/50 to-white shadow-sm">
          <div className="flex items-center justify-center gap-1 text-indigo-600">
            <Activity className="w-3.5 h-3.5" />
            <span className="text-sm font-bold">{progress.overallScore}</span>
          </div>
          <p className="text-[10px] text-indigo-700/60 font-medium">Readiness</p>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full flex overflow-x-auto gap-0.5 bg-emerald-50/80 p-1 h-auto flex-wrap border border-emerald-100/60 rounded-xl">
          <TabsTrigger value="learn" className="text-[11px] flex-1 min-w-[60px] px-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all">📚 Learn</TabsTrigger>
          <TabsTrigger value="discover" className="text-[11px] flex-1 min-w-[60px] px-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all">🔍 Discover</TabsTrigger>
          <TabsTrigger value="quiz" className="text-[11px] flex-1 min-w-[60px] px-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all">💰 Quiz</TabsTrigger>
          <TabsTrigger value="simulate" className="text-[11px] flex-1 min-w-[60px] px-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all">🎮 Simulate</TabsTrigger>
          <TabsTrigger value="mentors" className="text-[11px] flex-1 min-w-[60px] px-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all">👥 Mentors</TabsTrigger>
          <TabsTrigger value="readiness" className="text-[11px] flex-1 min-w-[60px] px-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all">📊 Score</TabsTrigger>
          <TabsTrigger value="launch" className="text-[11px] flex-1 min-w-[60px] px-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all">🚀 Launch</TabsTrigger>
        </TabsList>

        {/* LEARN TAB */}
        <TabsContent value="learn" className="mt-4">
          <DailyLesson
            completedLessons={progress.completedLessons}
            onCompleteLesson={progress.completeLesson}
            currentStage={progress.currentStage}
          />
        </TabsContent>

        {/* DISCOVER TAB */}
        <TabsContent value="discover" className="mt-4">
          <ProblemOfTheDay onSubmit={progress.submitProblem} />
        </TabsContent>

        {/* QUIZ TAB */}
        <TabsContent value="quiz" className="mt-4">
          <MoneyMinuteQuiz onComplete={progress.completeQuiz} />
        </TabsContent>

        {/* SIMULATE TAB */}
        <TabsContent value="simulate" className="mt-4">
          <StartupSimulator
            completedScenarios={progress.completedScenarios}
            onCompleteScenario={progress.completeScenario}
          />
        </TabsContent>

        {/* MENTORS TAB */}
        <TabsContent value="mentors" className="mt-4">
          <FounderStories />
        </TabsContent>

        {/* READINESS TAB */}
        <TabsContent value="readiness" className="space-y-4 mt-4">
          <Card className="border-border/50">
            <CardContent className="p-4 space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-teal-50 border-2 border-emerald-400/40 shadow-lg shadow-emerald-500/10 mb-2">
                  <span className="text-2xl font-bold bg-gradient-to-br from-emerald-700 to-teal-600 bg-clip-text text-transparent">{progress.overallScore}</span>
                </div>
                <p className="text-sm font-medium text-foreground">Overall Readiness Score</p>
                <p className="text-xs text-muted-foreground">
                  {progress.overallScore === 0 ? 'Complete activities to build your score' :
                    progress.overallScore < 30 ? 'You\'re just getting started — keep going!' :
                      progress.overallScore < 60 ? 'Making great progress! 💪' :
                        'You\'re becoming launch-ready! 🚀'}
                </p>
              </div>

              <div className="space-y-3">
                {Object.entries(progress.readinessScores).map(([name, score]) => (
                  <div key={name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-foreground">{name}</span>
                      <span className="text-xs font-medium text-muted-foreground">{score}/100</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Journey Stages */}
          <div>
            <h3 className="text-sm font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-2">Your Journey Progress</h3>
            <div className="space-y-2">
              {journeyStages.map((stage) => {
                const isActive = stage.id === progress.currentStage;
                const isLocked = stage.id > progress.currentStage;
                const isDone = stage.id < progress.currentStage;
                const isOpen = expandedStage === stage.id;

                return (
                  <button
                    key={stage.id}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${isActive ? 'border-emerald-400/50 bg-emerald-50/50 shadow-sm shadow-emerald-500/10' : isLocked ? 'border-border/30 opacity-50' : 'border-emerald-500/30 bg-emerald-500/5'}`}
                    onClick={() => setExpandedStage(isOpen ? null : stage.id)}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${isDone ? 'bg-emerald-500/10 text-emerald-600' : isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-muted text-muted-foreground'}`}>
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : isLocked ? <Lock className="w-3.5 h-3.5" /> : stage.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{stage.title}</p>
                      <p className="text-[10px] text-muted-foreground">Weeks {stage.weeks}</p>
                    </div>
                    {isActive && <Badge className="text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200/60">Current</Badge>}
                  </button>
                );
              })}
            </div>
          </div>
        </TabsContent>

        {/* LAUNCH TAB */}
        <TabsContent value="launch" className="space-y-3 mt-4">
          <div className="text-center mb-2 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 rounded-xl p-4 border border-emerald-100/50">
            <h3 className="text-sm font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">Real-World Launchkit</h3>
            <p className="text-[10px] text-emerald-600/70">Step-by-step guidance to start a business in India</p>
          </div>

          {[
            { title: 'Startup India Registration', desc: 'DPIIT recognition, tax benefits, IPR support.', icon: <Building2 className="w-4 h-4" />, link: 'https://www.startupindia.gov.in/' },
            { title: 'MSME/Udyam Registration', desc: 'Free registration. Priority lending & subsidies.', icon: <Award className="w-4 h-4" />, link: 'https://udyamregistration.gov.in/' },
            { title: 'TANSIM Programs', desc: 'Tamil Nadu startup grants up to ₹30L & mentorship.', icon: <Map className="w-4 h-4" />, link: 'https://www.startuptn.in/' },
            { title: 'PMMY Mudra Loans', desc: 'Up to ₹10L without collateral. Shishu/Kishore/Tarun.', icon: <DollarSign className="w-4 h-4" />, link: 'https://www.mudra.org.in/' },
            { title: 'GST Registration', desc: 'When needed (₹20L+ turnover) and how to register.', icon: <BarChart3 className="w-4 h-4" /> },
            { title: 'TANSIM Incubation', desc: 'Access TN startup incubators, mentors, and seed funding.', icon: <GraduationCap className="w-4 h-4" /> },
            { title: 'College E-Cells', desc: 'Best startup incubators: IIT-M, IIM-A, NSRCEL, EDII.', icon: <Building2 className="w-4 h-4" /> },
            { title: 'Startup Competitions', desc: 'Smart India Hackathon, TiE, NASSCOM & more.', icon: <Trophy className="w-4 h-4" /> },
          ].map((guide, i) => (
            <Card key={i} className="border-emerald-100/60 hover:border-emerald-300/60 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-200">
              <CardContent className="p-3 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex-shrink-0 shadow-md shadow-emerald-500/20">
                  {guide.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{guide.title}</p>
                  <p className="text-xs text-muted-foreground">{guide.desc}</p>
                  {guide.link && (
                    <Button variant="link" size="sm" className="text-xs p-0 h-auto mt-0.5" onClick={() => window.open(guide.link, '_blank')}>
                      Visit Portal <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
