import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  field: string;
  subDomain: string;
  location: string;
  experience: string;
}

export interface WeeklyTask {
  day: number;
  taskTitle: string;
  taskDescription: string;
  goal: string;
  isCompleted: boolean;
}

export interface DetectedProblem {
  problemStatement: string;
  painScore: number;
  targetCustomer: string;
  marketSize: number;
  uniqueness: number;
  existingGaps: number;
  validated: boolean;
}

export interface Survey {
  id: string;
  questions: any[];
  shareLink: string;
  problemStatement: string;
  targetCustomer: string;
  responseCount: number;
}

export interface ProductRoadmap {
  mvpTitle: string;
  mvpDescription: string;
  buildTool: string;
  businessModel: string;
  weeklySteps: { week: number; title: string; actions: string[] }[];
  recommendedTools: { name: string; purpose: string }[];
}

export interface StartupScore {
  total: number;
  onboarding: number;
  tasks: number;
  problem: number;
  survey: number;
  mvp: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const useStartupGuideData = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tasks, setTasks] = useState<WeeklyTask[]>([]);
  const [reflections, setReflections] = useState<Record<number, string>>({});
  const [problem, setProblem] = useState<DetectedProblem | null>(null);
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [roadmap, setRoadmap] = useState<ProductRoadmap | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [score, setScore] = useState<StartupScore>({ total: 0, onboarding: 0, tasks: 0, problem: 0, survey: 0, mvp: 0 });

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student');
      }
      setLoading(false);
    };
    getUser();
  }, []);

  // Load all data when user is available
  useEffect(() => {
    if (!userId) return;
    loadAllData();
  }, [userId]);

  const loadAllData = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      // Load profile
      const { data: profileData } = await supabase
        .from('startup_user_profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      if (profileData) {
        setProfile({ field: profileData.field, subDomain: profileData.sub_domain, location: profileData.location, experience: profileData.experience });
      }

      // Load tasks
      const { data: tasksData } = await supabase
        .from('startup_weekly_tasks')
        .select('*')
        .eq('user_id', userId)
        .order('day');
      if (tasksData && tasksData.length > 0) {
        setTasks(tasksData.map(t => ({ day: t.day, taskTitle: t.task_title, taskDescription: t.task_description, goal: t.goal, isCompleted: t.is_completed })));
      }

      // Load reflections
      const { data: reflData } = await supabase
        .from('startup_daily_reflections')
        .select('*')
        .eq('user_id', userId);
      if (reflData) {
        const reflMap: Record<number, string> = {};
        reflData.forEach(r => { reflMap[r.day] = r.reflection_text; });
        setReflections(reflMap);
      }

      // Load problem
      const { data: problemData } = await supabase
        .from('startup_detected_problems')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      if (problemData) {
        setProblem({
          problemStatement: problemData.problem_statement,
          painScore: problemData.pain_score,
          targetCustomer: problemData.target_customer,
          marketSize: problemData.market_size,
          uniqueness: problemData.uniqueness,
          existingGaps: problemData.existing_gaps,
          validated: problemData.validated,
        });
      }

      // Load survey
      const { data: surveyData } = await supabase
        .from('startup_surveys')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      if (surveyData) {
        setSurvey({
          id: surveyData.id,
          questions: surveyData.questions,
          shareLink: surveyData.share_link,
          problemStatement: surveyData.problem_statement,
          targetCustomer: surveyData.target_customer,
          responseCount: surveyData.response_count,
        });
      }

      // Load roadmap
      const { data: roadmapData } = await supabase
        .from('startup_product_roadmaps')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      if (roadmapData) {
        setRoadmap({
          mvpTitle: roadmapData.mvp_title,
          mvpDescription: roadmapData.mvp_description,
          buildTool: roadmapData.build_tool,
          businessModel: roadmapData.business_model,
          weeklySteps: roadmapData.week_steps as any,
          recommendedTools: roadmapData.recommended_tools as any,
        });
      }

      // Load chat history
      const { data: chatData } = await supabase
        .from('startup_chat_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at');
      if (chatData) {
        setChatHistory(chatData.map(c => ({ role: c.role as 'user' | 'assistant', content: c.content, timestamp: c.created_at })));
      }

      // Load score
      const { data: scoreData } = await supabase
        .from('startup_scores')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      if (scoreData) {
        setScore({
          total: scoreData.score,
          onboarding: scoreData.onboarding_points,
          tasks: scoreData.task_points,
          problem: scoreData.problem_points,
          survey: scoreData.survey_points,
          mvp: scoreData.mvp_points,
        });
      }
    } catch (err) {
      console.error('Error loading startup data:', err);
    }
    setLoading(false);
  };

  // Save profile after onboarding
  const saveProfile = useCallback(async (p: UserProfile) => {
    if (!userId) return;
    await supabase.from('startup_user_profiles').upsert({ user_id: userId, field: p.field, sub_domain: p.subDomain, location: p.location, experience: p.experience }, { onConflict: 'user_id' });
    setProfile(p);
    await updateScore({ onboarding: 10 });
  }, [userId]);

  // Save tasks
  const saveTasks = useCallback(async (newTasks: WeeklyTask[]) => {
    if (!userId) return;
    for (const t of newTasks) {
      await supabase.from('startup_weekly_tasks').upsert({ user_id: userId, day: t.day, task_title: t.taskTitle, task_description: t.taskDescription, goal: t.goal, is_completed: t.isCompleted }, { onConflict: 'user_id,day' });
    }
    setTasks(newTasks);
  }, [userId]);

  // Complete a task
  const completeTask = useCallback(async (day: number) => {
    if (!userId) return;
    await supabase.from('startup_weekly_tasks').update({ is_completed: true }).eq('user_id', userId).eq('day', day);
    setTasks(prev => prev.map(t => t.day === day ? { ...t, isCompleted: true } : t));
    const completedCount = tasks.filter(t => t.isCompleted).length + 1;
    await updateScore({ tasks: completedCount * 5 });
  }, [userId, tasks]);

  // Save reflection
  const saveReflection = useCallback(async (day: number, text: string) => {
    if (!userId) return;
    await supabase.from('startup_daily_reflections').upsert({ user_id: userId, day, reflection_text: text }, { onConflict: 'user_id,day' });
    setReflections(prev => ({ ...prev, [day]: text }));
    await completeTask(day);
  }, [userId, completeTask]);

  // Save problem
  const saveProblem = useCallback(async (p: DetectedProblem) => {
    if (!userId) return;
    await supabase.from('startup_detected_problems').upsert({
      user_id: userId, problem_statement: p.problemStatement, pain_score: p.painScore, target_customer: p.targetCustomer,
      market_size: p.marketSize, uniqueness: p.uniqueness, existing_gaps: p.existingGaps, validated: p.validated,
    }, { onConflict: 'user_id' });
    setProblem(p);
    await updateScore({ problem: 15 });
  }, [userId]);

  // Save survey
  const saveSurvey = useCallback(async (questions: any[], problemStatement: string, targetCustomer: string) => {
    if (!userId) return;
    const shareLink = `${window.location.origin}/survey/${userId}`;
    const { data } = await supabase.from('startup_surveys').upsert({
      user_id: userId, questions, share_link: shareLink, problem_statement: problemStatement, target_customer: targetCustomer || '',
    }, { onConflict: 'user_id' }).select().single();
    if (data) {
      setSurvey({ id: data.id, questions, shareLink, problemStatement, targetCustomer: targetCustomer || '', responseCount: 0 });
      await updateScore({ survey: 10 });
    }
  }, [userId]);

  // Save roadmap
  const saveRoadmap = useCallback(async (r: ProductRoadmap) => {
    if (!userId) return;
    await supabase.from('startup_product_roadmaps').upsert({
      user_id: userId, mvp_title: r.mvpTitle, mvp_description: r.mvpDescription, build_tool: r.buildTool,
      business_model: r.businessModel, week_steps: r.weeklySteps as any, recommended_tools: r.recommendedTools as any,
    }, { onConflict: 'user_id' });
    setRoadmap(r);
    await updateScore({ mvp: 10 });
  }, [userId]);

  // Save chat message
  const saveChatMessage = useCallback(async (role: 'user' | 'assistant', content: string) => {
    if (!userId) return;
    await supabase.from('startup_chat_history').insert({ user_id: userId, role, content });
    setChatHistory(prev => [...prev, { role, content, timestamp: new Date().toISOString() }]);
  }, [userId]);

  // Update score
  const updateScore = useCallback(async (updates: Partial<StartupScore>) => {
    if (!userId) return;
    setScore(prev => {
      const next = { ...prev, ...updates };
      next.total = (next.onboarding || 0) + (next.tasks || 0) + (next.problem || 0) + (next.survey || 0) + (next.mvp || 0);
      supabase.from('startup_scores').upsert({
        user_id: userId, score: next.total, onboarding_points: next.onboarding, task_points: next.tasks,
        problem_points: next.problem, survey_points: next.survey, mvp_points: next.mvp,
      }, { onConflict: 'user_id' });
      return next;
    });
  }, [userId]);

  // Refresh survey response count
  const refreshSurveyCount = useCallback(async () => {
    if (!userId || !survey) return;
    const { data } = await supabase.from('startup_surveys').select('response_count').eq('user_id', userId).maybeSingle();
    if (data) {
      setSurvey(prev => prev ? { ...prev, responseCount: data.response_count } : prev);
      const responsePoints = Math.min(20, Math.floor(data.response_count / 5) * 5);
      await updateScore({ survey: 10 + responsePoints });
    }
  }, [userId, survey, updateScore]);

  // Computed states
  const onboardingComplete = !!profile;
  const currentDay = tasks.filter(t => t.isCompleted).length + 1;
  const allReflectionsDone = Object.keys(reflections).length >= 7;
  const surveyUnlocked = allReflectionsDone;
  const buildUnlocked = (survey?.responseCount || 0) >= 20;

  return {
    userId, userName, loading, profile, tasks, reflections, problem, survey, roadmap, chatHistory, score,
    onboardingComplete, currentDay, allReflectionsDone, surveyUnlocked, buildUnlocked,
    saveProfile, saveTasks, completeTask, saveReflection, saveProblem, saveSurvey, saveRoadmap,
    saveChatMessage, refreshSurveyCount, loadAllData,
  };
};
