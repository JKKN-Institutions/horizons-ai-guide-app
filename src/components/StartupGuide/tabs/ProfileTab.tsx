import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Target, BarChart3, LogOut, MapPin, Briefcase, GraduationCap, CheckCircle2, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import type { UserProfile, StartupScore } from '../useStartupGuideData';

interface ProfileTabProps {
  userName: string;
  profile: UserProfile | null;
  score: StartupScore;
  taskStreak: number;
  surveyResponseCount: number;
  onboardingComplete: boolean;
  allReflectionsDone: boolean;
}

const allBadges = [
  { key: 'explorer', label: 'Explorer', icon: '🔍', desc: 'Completed onboarding', check: (p: ProfileTabProps) => p.onboardingComplete },
  { key: 'taskmaster', label: 'Task Master', icon: '📋', desc: 'Completed all 7 tasks', check: (p: ProfileTabProps) => p.taskStreak >= 7 },
  { key: 'problemfinder', label: 'Problem Finder', icon: '🎯', desc: 'AI detected your problem', check: (p: ProfileTabProps) => p.allReflectionsDone },
  { key: 'validator', label: 'Validator', icon: '📊', desc: '20+ survey responses', check: (p: ProfileTabProps) => p.surveyResponseCount >= 20 },
  { key: 'builder', label: 'Builder', icon: '🔨', desc: 'MVP plan generated', check: () => false },
  { key: 'founder', label: 'Founder', icon: '🚀', desc: 'Launched your startup', check: () => false },
];

export const ProfileTab = (props: ProfileTabProps) => {
  const { userName, profile, score, taskStreak, surveyResponseCount } = props;
  const navigate = useNavigate();
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

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
              <span className="text-lg font-bold text-white">{surveyResponseCount}</span>
            </div>
            <p className="text-[9px] text-white/40 font-medium uppercase">Surveys</p>
          </div>
        </div>
      </div>

      {/* Badge Grid */}
      <Card className="border-border/40">
        <CardContent className="p-4">
          <p className="text-xs font-bold text-foreground mb-3">🏆 Achievement Badges</p>
          <div className="grid grid-cols-3 gap-3">
            {allBadges.map((badge) => {
              const earned = badge.check(props);
              return (
                <div key={badge.key} className={`text-center p-3 rounded-xl border-2 transition-all ${earned ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300 shadow-sm' : 'bg-gray-50 border-gray-200 opacity-40'}`}>
                  <span className={`text-3xl ${earned ? 'drop-shadow-md' : 'grayscale'}`}>{badge.icon}</span>
                  <p className={`text-[10px] font-bold mt-1 ${earned ? 'text-amber-700' : 'text-gray-400'}`}>{badge.label}</p>
                  <p className="text-[9px] text-muted-foreground">{badge.desc}</p>
                  {earned && <CheckCircle2 className="w-3 h-3 text-emerald-500 mx-auto mt-1" />}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Profile Details */}
      {profile && (
        <Card className="border-border/40">
          <CardContent className="p-4">
            <p className="text-xs font-bold text-foreground mb-3">📄 Profile Details</p>
            <div className="space-y-2.5">
              {[
                { icon: <Target className="w-4 h-4 text-emerald-600" />, label: 'Field', value: profile.field },
                { icon: <Briefcase className="w-4 h-4 text-blue-600" />, label: 'Sub-domain', value: profile.subDomain },
                { icon: <MapPin className="w-4 h-4 text-red-500" />, label: 'Location', value: profile.location },
                { icon: <GraduationCap className="w-4 h-4 text-purple-600" />, label: 'Experience', value: profile.experience },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 bg-gray-50 rounded-lg p-2.5">
                  {item.icon}
                  <div>
                    <p className="text-[10px] text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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

      {/* Sign Out */}
      <Button onClick={handleSignOut} variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
        <LogOut className="w-4 h-4 mr-2" /> Sign Out
      </Button>
    </div>
  );
};
