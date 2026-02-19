import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Zap, Flame, CheckCircle2, Lock, ArrowRight, Sparkles, Target, BookOpen, BarChart3, Rocket } from 'lucide-react';
import type { StartupScore, UserProfile } from './useStartupGuideData';

interface DashboardTabProps {
  userName: string;
  profile: UserProfile | null;
  score: StartupScore;
  currentDay: number;
  tasks: { day: number; taskTitle: string; isCompleted: boolean }[];
  onboardingComplete: boolean;
  allReflectionsDone: boolean;
  surveyResponseCount: number;
  onStartJourney: () => void;
}

const milestones = [
  { key: 'onboarding', label: 'Onboarding', icon: '🚀' },
  { key: 'tasks', label: 'Week Tasks', icon: '📋' },
  { key: 'problem', label: 'Problem Found', icon: '🎯' },
  { key: 'survey', label: 'Survey Done', icon: '📊' },
  { key: 'build', label: 'MVP Built', icon: '⭐' },
];

export const DashboardTab = ({ userName, profile, score, currentDay, tasks, onboardingComplete, allReflectionsDone, surveyResponseCount, onStartJourney }: DashboardTabProps) => {
  const streak = tasks.filter(t => t.isCompleted).length;
  const todayTask = tasks.find(t => t.day === currentDay);

  const getMilestoneStatus = (key: string) => {
    switch (key) {
      case 'onboarding': return onboardingComplete;
      case 'tasks': return streak >= 7;
      case 'problem': return allReflectionsDone;
      case 'survey': return surveyResponseCount >= 20;
      case 'build': return false;
      default: return false;
    }
  };

  if (!onboardingComplete) {
    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-[#14532d] via-[#166534] to-[#1a4731] rounded-xl p-8 text-center shadow-lg border border-emerald-700/30">
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to Your Startup Journey!</h2>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            In 40 days, you'll go from an idea to a validated startup. Let's start by understanding your interests.
          </p>
          <Button onClick={onStartJourney} className="bg-gradient-to-r from-amber-400 to-yellow-400 text-green-900 font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all text-base">
            Start Your Journey <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Score Card */}
      <div className="bg-gradient-to-br from-[#14532d] via-[#166534] to-[#1a4731] rounded-xl p-5 shadow-lg border border-emerald-700/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Hi, {userName}! 👋</h2>
            {profile && (
              <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 px-3 py-0.5 rounded-full text-[11px] font-semibold mt-1">
                <Target className="w-3 h-3" /> {profile.field} — {profile.subDomain}
              </span>
            )}
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center shadow-lg">
              <span className="text-green-900 font-bold text-xl">{score.total}</span>
            </div>
            <p className="text-[10px] text-white/40 mt-1 font-medium">STARTUP SCORE</p>
          </div>
        </div>
        <Progress value={score.total} className="h-2 bg-white/10" />
        <div className="flex justify-between mt-3 gap-2">
          {[
            { icon: <Zap className="w-3.5 h-3.5" />, label: 'XP', value: score.total, color: 'text-amber-300' },
            { icon: <Flame className="w-3.5 h-3.5" />, label: 'Streak', value: `${streak}d`, color: 'text-orange-300' },
            { icon: <BookOpen className="w-3.5 h-3.5" />, label: 'Day', value: `${Math.min(currentDay, 7)}/7`, color: 'text-emerald-300' },
            { icon: <BarChart3 className="w-3.5 h-3.5" />, label: 'Surveys', value: surveyResponseCount, color: 'text-blue-300' },
          ].map((stat, i) => (
            <div key={i} className="flex-1 text-center">
              <div className={`flex items-center justify-center gap-1 ${stat.color}`}>
                {stat.icon}
                <span className="text-sm font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-[9px] text-white/40 font-medium uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Task */}
      {todayTask && currentDay <= 7 && (
        <Card className="border-emerald-300/50 border-2 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-700">TODAY'S TASK — Day {currentDay}</p>
              </div>
            </div>
            <h3 className="text-sm font-bold text-foreground">{todayTask.taskTitle}</h3>
            <p className="text-xs text-muted-foreground mt-1">{todayTask.taskDescription}</p>
            <div className="mt-2 bg-emerald-50 rounded-lg p-2">
              <p className="text-[11px] text-emerald-700 font-medium">🎯 Goal: {todayTask.goal}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 7-Day Streak Tracker */}
      <Card className="border-border/40">
        <CardContent className="p-4">
          <p className="text-xs font-bold text-foreground mb-3">📅 7-Day Progress</p>
          <div className="flex gap-2">
            {Array.from({ length: 7 }, (_, i) => i + 1).map(day => {
              const task = tasks.find(t => t.day === day);
              const completed = task?.isCompleted;
              const isToday = day === currentDay;
              return (
                <div key={day} className={`flex-1 text-center p-2 rounded-lg border-2 transition-all ${completed ? 'bg-emerald-50 border-emerald-400' : isToday ? 'bg-amber-50 border-amber-400' : 'bg-gray-50 border-gray-200'}`}>
                  {completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                  ) : isToday ? (
                    <Flame className="w-4 h-4 text-amber-500 mx-auto" />
                  ) : (
                    <Lock className="w-4 h-4 text-gray-300 mx-auto" />
                  )}
                  <p className={`text-[10px] font-bold mt-1 ${completed ? 'text-emerald-700' : isToday ? 'text-amber-700' : 'text-gray-400'}`}>D{day}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Journey Milestones */}
      <Card className="border-border/40">
        <CardContent className="p-4">
          <p className="text-xs font-bold text-foreground mb-3">🗺️ Journey Milestones</p>
          <div className="flex items-center gap-1">
            {milestones.map((m, i) => {
              const done = getMilestoneStatus(m.key);
              return (
                <div key={m.key} className="flex items-center">
                  <div className={`flex flex-col items-center p-2 rounded-lg ${done ? 'bg-emerald-50' : 'bg-gray-50'}`}>
                    <span className={`text-lg ${done ? '' : 'grayscale opacity-40'}`}>{m.icon}</span>
                    <p className={`text-[9px] font-medium mt-1 ${done ? 'text-emerald-700' : 'text-gray-400'}`}>{m.label}</p>
                  </div>
                  {i < milestones.length - 1 && (
                    <div className={`w-4 h-0.5 ${done ? 'bg-emerald-400' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
