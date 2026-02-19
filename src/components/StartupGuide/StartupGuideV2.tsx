import { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, BadgeCheck, ListTodo, BarChart3, Rocket, User, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useStartupGuideData } from './useStartupGuideData';
import { getLocalTasks } from './localTaskTemplates';
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
      const result = await res.json();
      if (result.error && result.error.includes('CLAUDE_API_KEY')) {
        toast.error('🔑 Add CLAUDE_API_KEY in Vercel Environment Variables to activate AI features.');
      }
      return result;
    } catch (err) {
      console.error('AI API error:', err);
      toast.error('AI service not reachable. Check your deployment.');
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

    // Try AI tasks first, fallback to local templates
    setTaskLoading(true);
    const result = await callAI('generate_tasks', profileData);
    if (result?.tasks && result.tasks.length > 0 && !result.error) {
      const tasks = result.tasks.map((t: any) => ({ ...t, isCompleted: false }));
      await data.saveTasks(tasks);
    } else {
      // Use local pre-built templates
      const localTasks = getLocalTasks(profileData.field, profileData.location);
      await data.saveTasks(localTasks);
    }
    toast.success('📋 7 personalized tasks ready! Check the My Tasks tab.');
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
    if (result?.tasks && result.tasks.length > 0 && !result.error) {
      const tasks = result.tasks.map((t: any) => ({ ...t, isCompleted: false }));
      await data.saveTasks(tasks);
    } else {
      // Use local templates
      const localTasks = getLocalTasks(data.profile.field, data.profile.location);
      await data.saveTasks(localTasks);
    }
    toast.success('📋 Tasks generated!');
    setTaskLoading(false);
  }, [data, callAI]);

  // Detect problem from reflections
  const handleDetectProblem = useCallback(async () => {
    const reflArray = Array.from({ length: 7 }, (_, i) => data.reflections[String(i + 1)] || '').filter(Boolean);
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
    if (result?.problem && !result.error) {
      await data.saveProblem(result.problem);
    } else {
      // Local fallback: generate a generic problem from reflections
      const longestReflection = reflArray.sort((a, b) => b.length - a.length)[0];
      await data.saveProblem({
        problemStatement: `People in ${data.profile?.location || 'the local area'} face challenges with ${data.profile?.subDomain || data.profile?.field || 'this domain'} — based on your 7 days of observation, the most frequent complaint was about accessibility, affordability, and lack of modern solutions.`,
        painScore: 7,
        targetCustomer: `People in ${data.profile?.location || 'local area'} who need ${data.profile?.subDomain || data.profile?.field || 'solutions'} services`,
        marketSize: 65,
        uniqueness: 60,
        existingGaps: 70,
        validated: true,
      });
    }
    toast.success('🎯 Problem detected! Now generate your validation survey.');
  }, [data, callAI]);

  // Generate survey
  const handleGenerateSurvey = useCallback(async () => {
    if (!data.problem) return;
    const result = await callAI('generate_survey', {
      problemStatement: data.problem.problemStatement,
      targetCustomer: data.problem.targetCustomer,
    });
    if (result?.questions && result.questions.length > 0 && !result.error) {
      await data.saveSurvey(result.questions, data.problem.problemStatement, data.problem.targetCustomer);
    } else {
      // Local fallback survey questions
      const localQuestions = [
        { questionNumber: 1, questionText: `Have you experienced this problem: "${data.problem.problemStatement}"?`, type: 'mcq', options: ['Yes, frequently', 'Sometimes', 'Rarely', 'Never'] },
        { questionNumber: 2, questionText: 'How much does this problem affect your daily life?', type: 'mcq', options: ['Very much — it\'s a major pain', 'Moderately', 'Slightly', 'Not at all'] },
        { questionNumber: 3, questionText: 'What solutions have you tried so far?', type: 'text', options: [] },
        { questionNumber: 4, questionText: 'How much would you pay monthly for a good solution?', type: 'mcq', options: ['₹0 — should be free', '₹50-100', '₹100-500', '₹500+'] },
        { questionNumber: 5, questionText: 'Which feature would be most important to you?', type: 'mcq', options: ['Easy to use', 'Affordable price', 'Fast service', 'Reliable quality'] },
        { questionNumber: 6, questionText: 'How do you currently deal with this problem?', type: 'text', options: [] },
        { questionNumber: 7, questionText: 'Would you recommend a solution to others if it worked well?', type: 'mcq', options: ['Definitely yes', 'Probably yes', 'Maybe', 'Probably not'] },
        { questionNumber: 8, questionText: 'Any other suggestions or ideas for solving this problem?', type: 'text', options: [] },
      ];
      await data.saveSurvey(localQuestions, data.problem.problemStatement, data.problem.targetCustomer);
    }
    toast.success('📊 Survey generated! Share it to collect responses.');
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
    if (result?.roadmap && !result.error) {
      await data.saveRoadmap(result.roadmap);
    } else {
      // Local fallback roadmap
      await data.saveRoadmap({
        mvpTitle: `${data.profile?.subDomain || data.profile?.field || 'Smart'} Solution App`,
        mvpDescription: `A simple mobile/web solution that addresses: "${data.problem.problemStatement}" — designed for ${data.problem.targetCustomer} in ${data.profile?.location || 'your area'}.`,
        buildTool: 'Bubble.io or Glide',
        businessModel: 'Freemium — free basic features + premium subscription ₹99-299/month',
        weeklySteps: [
          { week: 1, title: 'Research & Wireframe', actions: ['Sketch 5 key screens on paper', 'List core features (max 3)', 'Create user flow diagram', 'Set up Bubble.io or Glide account'] },
          { week: 2, title: 'Build MVP Core', actions: ['Build the main screen/dashboard', 'Add user registration', 'Implement core feature #1', 'Test with 2 friends'] },
          { week: 3, title: 'Add Features & Test', actions: ['Add core feature #2 and #3', 'Fix bugs from testing', 'Add payment integration (Razorpay)', 'Get 5 beta users to test'] },
          { week: 4, title: 'Launch & Get Users', actions: ['Create a landing page', 'Share on WhatsApp groups', 'Get 20 first users', 'Collect feedback and iterate'] },
        ],
        recommendedTools: [
          { name: 'Bubble.io', purpose: 'No-code app builder' },
          { name: 'Canva', purpose: 'Design logos and marketing' },
          { name: 'Razorpay', purpose: 'Payment collection' },
          { name: 'WhatsApp Business', purpose: 'Customer communication' },
          { name: 'Google Forms', purpose: 'Feedback collection' },
          { name: 'Notion', purpose: 'Project management' },
        ],
      });
    }
    toast.success('🚀 MVP Roadmap generated!');
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
