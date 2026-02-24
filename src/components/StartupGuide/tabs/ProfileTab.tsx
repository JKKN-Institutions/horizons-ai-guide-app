import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Target, BarChart3, LogOut, MapPin, Briefcase, GraduationCap, CheckCircle2, Circle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import type { UserProfile, StartupScore, WeeklyTask, DetectedProblem, Survey, ProductRoadmap } from '../useStartupGuideData';

interface ProfileTabProps {
  userName: string;
  profile: UserProfile | null;
  score: StartupScore;
  taskStreak: number;
  surveyResponseCount: number;
  onboardingComplete: boolean;
  allReflectionsDone: boolean;
  onReset: () => void;
  tasks: WeeklyTask[];
  reflections: Record<string, string>;
  problem: DetectedProblem | null;
  survey: Survey | null;
  roadmap: ProductRoadmap | null;
}

export const ProfileTab = (props: ProfileTabProps) => {
  const { userName, profile, score, taskStreak, surveyResponseCount, tasks, reflections, problem, survey, roadmap } = props;
  const navigate = useNavigate();
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const completedTasks = tasks.filter(t => t.isCompleted).length;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // Journey steps with status
  const journeySteps = [
    {
      step: 1,
      title: 'Onboarding',
      icon: '🎯',
      done: props.onboardingComplete,
      details: profile ? [
        `Field: ${profile.field}`,
        `Sub-domain: ${profile.subDomain}`,
        `Location: ${profile.location}`,
        `Experience: ${profile.experience}`,
      ] : [],
    },
    {
      step: 2,
      title: 'Daily Observation Tasks',
      icon: '📋',
      done: completedTasks >= 7,
      details: tasks.length > 0
        ? tasks.map(t => `Day ${t.day}: ${t.taskTitle} ${t.isCompleted ? '✅' : '⬜'}`)
        : ['No tasks assigned yet'],
    },
    {
      step: 3,
      title: 'Daily Reflections',
      icon: '✍️',
      done: props.allReflectionsDone,
      details: Object.keys(reflections).length > 0
        ? Object.entries(reflections).map(([day, text]) => `Day ${day}: "${text.length > 60 ? text.slice(0, 60) + '...' : text}"`)
        : ['No reflections submitted yet'],
    },
    {
      step: 4,
      title: 'Problem Detection',
      icon: '🔍',
      done: !!problem,
      details: problem ? [
        `"${problem.problemStatement.length > 80 ? problem.problemStatement.slice(0, 80) + '...' : problem.problemStatement}"`,
        `Pain Level: ${problem.painScore}/10 | Market: ${problem.marketSize}%`,
        `Target: ${problem.targetCustomer}`,
      ] : ['Complete 7 reflections to detect your problem'],
    },
    {
      step: 5,
      title: 'Survey Validation',
      icon: '📊',
      done: surveyResponseCount >= 1,
      details: survey ? [
        `${survey.questions?.length || 8} questions generated`,
        `${surveyResponseCount} response(s) collected`,
        surveyResponseCount >= 1 ? '✅ Validation complete!' : '⏳ Waiting for responses...',
      ] : ['Generate a survey after problem detection'],
    },
    {
      step: 6,
      title: 'MVP Blueprint',
      icon: '🚀',
      done: !!roadmap,
      details: roadmap ? [
        `Plan: ${roadmap.mvpTitle}`,
        `Model: ${roadmap.businessModel.length > 50 ? roadmap.businessModel.slice(0, 50) + '...' : roadmap.businessModel}`,
        `${roadmap.weeklySteps?.length || 4} weeks action plan`,
      ] : ['Unlock by getting 1 survey response'],
    },
  ];

  const currentStepIndex = journeySteps.findIndex(s => !s.done);
  const doneCount = journeySteps.filter(s => s.done).length;
  const progressPercent = Math.round((doneCount / journeySteps.length) * 100);

  return (
    <div className="space-y-4">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#14532d] via-[#166534] to-[#1a4731] rounded-xl p-6 text-center shadow-lg border border-emerald-700/30">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center mx-auto shadow-lg mb-3">
          <span className="text-2xl font-bold text-green-900">{initials}</span>
        </div>
        <h2 className="text-xl font-bold text-white">{userName}</h2>
        {profile && (
          <div className="mt-2 space-y-1">
            <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 px-3 py-0.5 rounded-full text-[11px] font-semibold">
              <Target className="w-3 h-3" /> {profile.field} — {profile.subDomain}
            </span>
            <p className="text-xs text-white/40 flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3" /> {profile.location}
            </p>
          </div>
        )}

        {/* Stats Row */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-amber-300">
              <Flame className="w-4 h-4" />
              <span className="text-lg font-bold text-white">{taskStreak}</span>
            </div>
            <p className="text-[9px] text-white/40 font-medium uppercase">Day Streak</p>
          </div>
          <div className="w-px h-8 bg-white/15 self-center" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-300">
              <Target className="w-4 h-4" />
              <span className="text-lg font-bold text-white">{score.total}</span>
            </div>
            <p className="text-[9px] text-white/40 font-medium uppercase">Score</p>
          </div>
          <div className="w-px h-8 bg-white/15 self-center" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-300">
              <BarChart3 className="w-4 h-4" />
              <span className="text-lg font-bold text-white">{progressPercent}%</span>
            </div>
            <p className="text-[9px] text-white/40 font-medium uppercase">Progress</p>
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <Card className="border-border/40">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-foreground">🎯 Startup Journey Progress</p>
            <p className="text-xs font-bold text-emerald-600">{doneCount}/{journeySteps.length} Steps</p>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
            {progressPercent === 100 
              ? '🎉 Congratulations! Your startup journey is complete!' 
              : currentStepIndex >= 0 ? `Next: Step ${journeySteps[currentStepIndex].step} — ${journeySteps[currentStepIndex].title}` : 'All done!'}
          </p>
        </CardContent>
      </Card>

      {/* Journey Timeline */}
      <Card className="border-border/40">
        <CardContent className="p-4">
          <p className="text-xs font-bold text-foreground mb-4">📍 Your Complete Journey</p>
          
          <div className="space-y-0">
            {journeySteps.map((step, index) => {
              const isActive = index === currentStepIndex;
              const isDone = step.done;
              const isFuture = !isDone && index > (currentStepIndex >= 0 ? currentStepIndex : journeySteps.length);
              
              return (
                <div key={step.step} className="relative">
                  {/* Connecting Line */}
                  {index < journeySteps.length - 1 && (
                    <div className={`absolute left-[15px] top-[32px] w-0.5 h-[calc(100%-16px)] ${isDone ? 'bg-emerald-400' : 'bg-gray-200'}`} />
                  )}
                  
                  <div className={`flex gap-3 pb-4 ${isFuture ? 'opacity-40' : ''}`}>
                    {/* Step Indicator */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                      isDone 
                        ? 'bg-emerald-100 border-2 border-emerald-400' 
                        : isActive 
                          ? 'bg-amber-100 border-2 border-amber-400 animate-pulse' 
                          : 'bg-gray-100 border-2 border-gray-200'
                    }`}>
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isActive ? (
                        <Clock className="w-4 h-4 text-amber-600" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-300" />
                      )}
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base">{step.icon}</span>
                        <p className={`text-sm font-bold ${isDone ? 'text-emerald-700' : isActive ? 'text-amber-700' : 'text-gray-400'}`}>
                          Step {step.step}: {step.title}
                        </p>
                        {isDone && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-semibold">Done ✓</span>
                        )}
                        {isActive && (
                          <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-semibold">In Progress</span>
                        )}
                      </div>
                      
                      {/* Details (show for completed and active steps) */}
                      {(isDone || isActive) && step.details.length > 0 && (
                        <div className={`mt-1.5 rounded-lg p-2.5 ${isDone ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`}>
                          {step.details.map((detail, i) => (
                            <p key={i} className="text-[11px] text-foreground/70 leading-relaxed">
                              {detail}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <Card className="border-border/40">
        <CardContent className="p-4">
          <p className="text-xs font-bold text-foreground mb-3">📊 Score Breakdown</p>
          <div className="space-y-2">
            {[
              { label: 'Onboarding', points: score.onboarding, max: 10, color: 'bg-emerald-500' },
              { label: 'Daily Tasks', points: score.tasks, max: 35, color: 'bg-blue-500' },
              { label: 'Problem Validated', points: score.problem, max: 15, color: 'bg-purple-500' },
              { label: 'Survey Responses', points: score.survey, max: 30, color: 'bg-amber-500' },
              { label: 'MVP Viewed', points: score.mvp, max: 10, color: 'bg-rose-500' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <p className="text-xs text-muted-foreground w-28">{item.label}</p>
                <div className="flex-1">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all`} style={{ width: `${(item.points / item.max) * 100}%` }} />
                  </div>
                </div>
                <p className="text-xs font-bold text-foreground w-12 text-right">{item.points}/{item.max}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border/50 flex justify-between items-center">
            <p className="text-xs font-bold text-foreground">Total Score</p>
            <p className="text-lg font-bold text-emerald-600">{score.total}/100</p>
          </div>
        </CardContent>
      </Card>

      {/* Start Fresh */}
      <Button onClick={() => {
        if (window.confirm('⚠️ This will reset your entire Startup Guide and start from the beginning.\n\nAll your data (profile, tasks, reflections, problem, survey) will be cleared.\n\nAre you sure?')) {
          props.onReset();
        }
      }} variant="outline" className="w-full text-amber-600 border-amber-200 hover:bg-amber-50">
        🔄 Start Fresh (Reset All Data)
      </Button>

      {/* Sign Out */}
      <Button onClick={handleSignOut} variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
        <LogOut className="w-4 h-4 mr-2" /> Sign Out
      </Button>
    </div>
  );
};
