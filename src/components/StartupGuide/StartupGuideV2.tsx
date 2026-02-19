import { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, BadgeCheck, ListTodo, BarChart3, Rocket, User, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useStartupGuideData } from './useStartupGuideData';
import { DashboardTab } from './tabs/DashboardTab';
import { AIMentorTab } from './tabs/AIMentorTab';
import { MyTasksTab } from './tabs/MyTasksTab';
import { ProblemSurveyTab } from './tabs/ProblemSurveyTab';
import { BuildStartupTab } from './tabs/BuildStartupTab';
import { ProfileTab } from './tabs/ProfileTab';

export const StartupGuide = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [taskLoading, setTaskLoading] = useState(false);
  const data = useStartupGuideData();

  // Call Claude API
  const callAI = useCallback(async (action: string, payload: any) => {
    try {
      const res = await fetch('/api/startup-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, data: payload }),
      });
      return await res.json();
    } catch (err) {
      console.error('AI API error:', err);
      toast.error('AI service is temporarily unavailable. Please try again.');
      return null;
    }
  }, []);

  // AI Mentor: Send message
  const handleSendMessage = useCallback(async (message: string, history: { role: string; content: string }[]) => {
    const result = await callAI('onboarding_chat', { message, history });
    return result?.reply || 'Sorry, I could not process that. Please try again.';
  }, [callAI]);

  // Onboarding: Profile detected from chat
  const handleProfileDetected = useCallback(async (profileData: any) => {
    await data.saveProfile(profileData);
    toast.success('🎉 Onboarding complete! Generating your weekly tasks...');

    // Auto-generate tasks
    setTaskLoading(true);
    const result = await callAI('generate_tasks', profileData);
    if (result?.tasks && result.tasks.length > 0) {
      const tasks = result.tasks.map((t: any) => ({ ...t, isCompleted: false }));
      await data.saveTasks(tasks);
      toast.success('📋 7 personalized tasks generated! Check the My Tasks tab.');
    }
    setTaskLoading(false);
  }, [data, callAI]);

  // Generate tasks manually
  const handleGenerateTasks = useCallback(async () => {
    if (!data.profile) {
      toast.error('Complete onboarding first via AI Mentor tab.');
      return;
    }
    setTaskLoading(true);
    const result = await callAI('generate_tasks', data.profile);
    if (result?.tasks && result.tasks.length > 0) {
      const tasks = result.tasks.map((t: any) => ({ ...t, isCompleted: false }));
      await data.saveTasks(tasks);
      toast.success('📋 Tasks generated!');
    }
    setTaskLoading(false);
  }, [data, callAI]);

  // Detect problem from reflections
  const handleDetectProblem = useCallback(async () => {
    const reflArray = Array.from({ length: 7 }, (_, i) => data.reflections[i + 1] || '').filter(Boolean);
    if (reflArray.length < 7) {
      toast.error('Complete all 7 reflections first.');
      return;
    }
    const result = await callAI('detect_problem', {
      field: data.profile?.field || '',
      subDomain: data.profile?.subDomain || '',
      location: data.profile?.location || '',
      reflections: reflArray,
    });
    if (result?.problem) {
      await data.saveProblem(result.problem);
      toast.success('🎯 Problem detected! Now generate your validation survey.');
    }
  }, [data, callAI]);

  // Generate survey
  const handleGenerateSurvey = useCallback(async () => {
    if (!data.problem) return;
    const result = await callAI('generate_survey', {
      problemStatement: data.problem.problemStatement,
      targetCustomer: data.problem.targetCustomer,
    });
    if (result?.questions && result.questions.length > 0) {
      await data.saveSurvey(result.questions, data.problem.problemStatement, data.problem.targetCustomer);
      toast.success('📊 Survey generated! Share it to collect responses.');
    }
  }, [data, callAI]);

  // Generate roadmap
  const handleGenerateRoadmap = useCallback(async () => {
    if (!data.problem) return;
    const result = await callAI('generate_roadmap', {
      problemStatement: data.problem.problemStatement,
      targetCustomer: data.problem.targetCustomer,
      field: data.profile?.field || '',
      location: data.profile?.location || '',
    });
    if (result?.roadmap) {
      await data.saveRoadmap(result.roadmap);
      toast.success('🚀 MVP Roadmap generated!');
    }
  }, [data, callAI]);

  const taskStreak = data.tasks.filter(t => t.isCompleted).length;
  const surveyResponseCount = data.survey?.responseCount || 0;

  const tabStyle = "text-[11px] md:text-xs flex-1 min-w-[60px] px-2 py-2.5 text-white/50 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400 data-[state=active]:text-green-900 data-[state=active]:font-bold data-[state=active]:shadow-lg data-[state=active]:shadow-amber-400/25 hover:text-white/80 font-medium gap-1";

  return (
    <div className="space-y-0">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#14532d] via-[#166534] to-[#1a4731] px-6 py-8 md:py-10 text-center mb-4 shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-amber-400/10 to-yellow-400/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            AI-Powered Startup Guide
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight font-serif italic">
            Build Your <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">Startup</span> in 40 Days
          </h2>
          <p className="text-xs text-white/50 mt-2 max-w-md mx-auto">From idea to validated MVP — powered by AI mentoring</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-gradient-to-r from-[#14532d] via-[#166534] to-[#14532d] rounded-xl p-1.5 mb-4 border border-emerald-700/30 shadow-lg">
          <TabsList className="w-full flex overflow-x-auto gap-0.5 bg-transparent p-0 h-auto">
            <TabsTrigger value="dashboard" className={tabStyle}>
              <Brain className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Home</span>
            </TabsTrigger>
            <TabsTrigger value="mentor" className={tabStyle}>
              <BadgeCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Mentor</span>
              <span className="sm:hidden">Mentor</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className={tabStyle} disabled={!data.onboardingComplete}>
              {!data.onboardingComplete && <Lock className="w-3 h-3" />}
              <ListTodo className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">My Tasks</span>
              <span className="sm:hidden">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="survey" className={tabStyle} disabled={!data.onboardingComplete}>
              {!data.surveyUnlocked && <Lock className="w-3 h-3" />}
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Problem & Survey</span>
              <span className="sm:hidden">Survey</span>
            </TabsTrigger>
            <TabsTrigger value="build" className={tabStyle} disabled={!data.onboardingComplete}>
              {!data.buildUnlocked && <Lock className="w-3 h-3" />}
              <Rocket className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Build Startup</span>
              <span className="sm:hidden">Build</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className={tabStyle}>
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Profile</span>
              <span className="sm:hidden">Me</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="mt-0">
          <DashboardTab
            userName={data.userName}
            profile={data.profile}
            score={data.score}
            currentDay={data.currentDay}
            tasks={data.tasks}
            onboardingComplete={data.onboardingComplete}
            allReflectionsDone={data.allReflectionsDone}
            surveyResponseCount={surveyResponseCount}
            onStartJourney={() => setActiveTab('mentor')}
          />
        </TabsContent>

        <TabsContent value="mentor" className="mt-0">
          <AIMentorTab
            chatHistory={data.chatHistory}
            profile={data.profile}
            onSendMessage={handleSendMessage}
            onSaveChatMessage={data.saveChatMessage}
            onProfileDetected={handleProfileDetected}
          />
        </TabsContent>

        <TabsContent value="tasks" className="mt-0">
          <MyTasksTab
            tasks={data.tasks}
            currentDay={data.currentDay}
            reflections={data.reflections}
            onSubmitReflection={data.saveReflection}
            onGenerateTasks={handleGenerateTasks}
            loading={taskLoading}
          />
        </TabsContent>

        <TabsContent value="survey" className="mt-0">
          <ProblemSurveyTab
            unlocked={data.surveyUnlocked}
            problem={data.problem}
            survey={data.survey}
            reflections={data.reflections}
            field={data.profile?.field || ''}
            subDomain={data.profile?.subDomain || ''}
            location={data.profile?.location || ''}
            onDetectProblem={handleDetectProblem}
            onGenerateSurvey={handleGenerateSurvey}
            onRefreshCount={data.refreshSurveyCount}
          />
        </TabsContent>

        <TabsContent value="build" className="mt-0">
          <BuildStartupTab
            unlocked={data.buildUnlocked}
            roadmap={data.roadmap}
            surveyResponseCount={surveyResponseCount}
            onGenerateRoadmap={handleGenerateRoadmap}
          />
        </TabsContent>

        <TabsContent value="profile" className="mt-0">
          <ProfileTab
            userName={data.userName}
            profile={data.profile}
            score={data.score}
            taskStreak={taskStreak}
            surveyResponseCount={surveyResponseCount}
            onboardingComplete={data.onboardingComplete}
            allReflectionsDone={data.allReflectionsDone}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
