import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Lock, Loader2, CheckCircle2, Wrench, Rocket, Award, ArrowRight } from 'lucide-react';
import type { ProductRoadmap } from '../useStartupGuideData';

interface BuildStartupTabProps {
  unlocked: boolean;
  roadmap: ProductRoadmap | null;
  surveyResponseCount: number;
  onGenerateRoadmap: () => Promise<void>;
}

const badges = [
  { key: 'validated', label: 'Idea Validated', icon: '🎯', desc: 'Problem validated by survey' },
  { key: 'mvp', label: 'MVP Planned', icon: '📋', desc: 'MVP roadmap generated' },
  { key: 'first_user', label: 'First User', icon: '👤', desc: 'Get your first user' },
  { key: 'launched', label: 'Launch Ready', icon: '🚀', desc: 'Ready to launch' },
];

export const BuildStartupTab = ({ unlocked, roadmap, surveyResponseCount, onGenerateRoadmap }: BuildStartupTabProps) => {
  const [generating, setGenerating] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<Set<string>>(new Set());

  const toggleStep = (key: string) => {
    setCheckedSteps(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  if (!unlocked) {
    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl p-8 text-center border border-gray-200">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-500">Locked 🔒</h3>
          <p className="text-sm text-gray-400 mt-2 max-w-sm mx-auto">
            Collect 20+ survey responses to unlock your MVP roadmap and startup builder.
          </p>
          <div className="mt-4 max-w-xs mx-auto">
            <Progress value={Math.min(100, (surveyResponseCount / 20) * 100)} className="h-2" />
            <p className="text-xs text-gray-400 mt-1">{surveyResponseCount}/20 responses</p>
          </div>
        </div>

        {/* Preview of what's coming */}
        <Card className="border-dashed border-2 border-gray-300 opacity-60">
          <CardContent className="p-5">
            <h4 className="text-sm font-bold text-gray-400 mb-3">🔮 Coming Soon: Your Startup Blueprint</h4>
            <div className="space-y-2">
              {['MVP Title & Description', 'No-Code Build Tools', 'Week-by-Week Action Plan', 'Business Model', 'Milestone Badges'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-4 h-4 rounded border border-gray-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleGenerate = async () => {
    setGenerating(true);
    await onGenerateRoadmap();
    setGenerating(false);
  };

  if (!roadmap) {
    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-[#14532d] via-[#166534] to-[#1a4731] rounded-xl p-6 text-center shadow-lg border border-emerald-700/30">
          <div className="text-4xl mb-3">🚀</div>
          <h3 className="text-lg font-bold text-white mb-2">Build Your Startup!</h3>
          <p className="text-xs text-white/50 mb-4">Your survey has {surveyResponseCount}+ responses. Let AI create your MVP roadmap!</p>
          <Button onClick={handleGenerate} disabled={generating} className="bg-gradient-to-r from-amber-400 to-yellow-400 text-green-900 font-bold rounded-xl">
            {generating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Building Roadmap...</> : '🤖 Generate My MVP Roadmap'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* MVP Header */}
      <div className="bg-gradient-to-br from-[#14532d] via-[#166534] to-[#1a4731] rounded-xl p-5 shadow-lg border border-emerald-700/30">
        <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/25 text-amber-300 px-4 py-1.5 rounded-full text-[11px] font-semibold mb-3">
          <Rocket className="w-3.5 h-3.5" />
          Your MVP Blueprint
        </div>
        <h3 className="text-xl font-bold text-white">{roadmap.mvpTitle}</h3>
        <p className="text-sm text-white/60 mt-2">{roadmap.mvpDescription}</p>
      </div>

      {/* Build Tool & Business Model */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-border/40">
          <CardContent className="p-3.5">
            <div className="flex items-center gap-2 mb-1">
              <Wrench className="w-4 h-4 text-emerald-600" />
              <p className="text-[10px] text-muted-foreground font-medium">BUILD WITH</p>
            </div>
            <p className="text-sm font-bold text-foreground">{roadmap.buildTool}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40">
          <CardContent className="p-3.5">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-amber-600" />
              <p className="text-[10px] text-muted-foreground font-medium">BUSINESS MODEL</p>
            </div>
            <p className="text-sm font-bold text-foreground">{roadmap.businessModel}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Tools */}
      {roadmap.recommendedTools && roadmap.recommendedTools.length > 0 && (
        <Card className="border-border/40">
          <CardContent className="p-4">
            <p className="text-xs font-bold text-foreground mb-3">🛠 Recommended Tools</p>
            <div className="grid grid-cols-2 gap-2">
              {roadmap.recommendedTools.map((tool, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-2.5">
                  <p className="text-xs font-semibold text-foreground">{tool.name}</p>
                  <p className="text-[10px] text-muted-foreground">{tool.purpose}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Action Plan */}
      <Card className="border-border/40">
        <CardContent className="p-4">
          <p className="text-xs font-bold text-foreground mb-3">📅 Week-by-Week Action Plan</p>
          <div className="space-y-3">
            {roadmap.weeklySteps?.map((step) => (
              <div key={step.week} className="bg-gray-50 rounded-lg p-3 border border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-xs font-bold">
                    {step.week}
                  </div>
                  <p className="text-xs font-bold text-foreground">{step.title}</p>
                </div>
                <div className="space-y-1.5 pl-9">
                  {step.actions?.map((action, j) => {
                    const key = `${step.week}-${j}`;
                    const checked = checkedSteps.has(key);
                    return (
                      <label key={j} className="flex items-start gap-2 cursor-pointer group">
                        <input type="checkbox" checked={checked} onChange={() => toggleStep(key)} className="mt-0.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                        <span className={`text-xs ${checked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{action}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Milestone Badges */}
      <Card className="border-border/40">
        <CardContent className="p-4">
          <p className="text-xs font-bold text-foreground mb-3">🏆 Milestone Badges</p>
          <div className="grid grid-cols-4 gap-2">
            {badges.map((badge, i) => {
              const earned = i === 0; // First badge always earned if build tab unlocked
              return (
                <div key={badge.key} className={`text-center p-3 rounded-lg border ${earned ? 'bg-amber-50 border-amber-300' : 'bg-gray-50 border-gray-200 opacity-50'}`}>
                  <span className={`text-2xl ${earned ? '' : 'grayscale'}`}>{badge.icon}</span>
                  <p className={`text-[9px] font-bold mt-1 ${earned ? 'text-amber-700' : 'text-gray-400'}`}>{badge.label}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
