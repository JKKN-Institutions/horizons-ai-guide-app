import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gamepad2, TrendingUp, TrendingDown, Heart, DollarSign, CheckCircle2, ChevronRight, RotateCcw, Trophy } from 'lucide-react';
import { simulatorScenarios, type SimulatorChoice } from './data/simulatorData';
import { toast } from 'sonner';

interface StartupSimulatorProps {
  completedScenarios: number[];
  onCompleteScenario: (scenarioId: number) => void;
}

export const StartupSimulator = ({ completedScenarios, onCompleteScenario }: StartupSimulatorProps) => {
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<SimulatorChoice | null>(null);
  const [cash, setCash] = useState(10000);
  const [morale, setMorale] = useState(70);

  const scenario = activeScenario !== null ? simulatorScenarios.find(s => s.id === activeScenario) : null;

  const handleChoice = (choice: SimulatorChoice) => {
    if (selectedChoice) return;
    setSelectedChoice(choice);
    setCash(c => c + choice.cashImpact);
    setMorale(m => Math.max(0, Math.min(100, m + choice.moraleImpact)));
    onCompleteScenario(scenario!.id);
    toast.success(`+20 XP! Scenario completed.`);
  };

  if (scenario && activeScenario !== null) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => { setActiveScenario(null); setSelectedChoice(null); }} className="text-xs">
          ← Back to Scenarios
        </Button>

        {/* Status Bar */}
        <div className="grid grid-cols-2 gap-2">
          <Card className="border-border/50 p-2">
            <div className="flex items-center gap-2 text-xs">
              <DollarSign className="w-4 h-4 text-orange-500" />
              <div>
                <p className="text-[10px] text-muted-foreground">Cash</p>
                <p className={`font-bold ${cash < 0 ? 'text-destructive' : 'text-foreground'}`}>₹{cash.toLocaleString()}</p>
              </div>
            </div>
          </Card>
          <Card className="border-border/50 p-2">
            <div className="flex items-center gap-2 text-xs">
              <Heart className="w-4 h-4 text-rose-500" />
              <div>
                <p className="text-[10px] text-muted-foreground">Team Morale</p>
                <Progress value={morale} className="h-1.5 w-16" />
              </div>
            </div>
          </Card>
        </div>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <Badge variant="secondary" className="text-[10px] w-fit">Month {scenario.month}</Badge>
            <CardTitle className="text-base">{scenario.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">{scenario.context}</p>

            <div className="space-y-2">
              {scenario.choices.map((choice) => {
                const isSelected = selectedChoice?.id === choice.id;
                const showResult = selectedChoice !== null;

                let className = 'w-full text-left p-3 rounded-lg border text-sm transition-all ';
                if (showResult) {
                  if (choice.isOptimal) className += 'border-orange-500 bg-orange-500/5';
                  else if (isSelected) className += 'border-destructive bg-destructive/5';
                  else className += 'border-border/30 opacity-40';
                } else {
                  className += 'border-border hover:border-orange-400/50 hover:bg-orange-50/30 cursor-pointer';
                }

                return (
                  <button key={choice.id} className={className} onClick={() => handleChoice(choice)} disabled={!!selectedChoice}>
                    <p className="text-foreground">{choice.text}</p>
                    {showResult && (isSelected || choice.isOptimal) && (
                      <div className="mt-2 space-y-1">
                        <p className="text-xs text-muted-foreground">{choice.outcome}</p>
                        <div className="flex gap-2">
                          <Badge className={`text-[10px] ${choice.cashImpact >= 0 ? 'bg-orange-500/10 text-orange-600' : 'bg-destructive/10 text-destructive'}`}>
                            {choice.cashImpact >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                            ₹{Math.abs(choice.cashImpact).toLocaleString()}
                          </Badge>
                          <Badge className={`text-[10px] ${choice.moraleImpact >= 0 ? 'bg-orange-500/10 text-orange-600' : 'bg-destructive/10 text-destructive'}`}>
                            <Heart className="w-3 h-3 mr-0.5" /> {choice.moraleImpact > 0 ? '+' : ''}{choice.moraleImpact}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedChoice && (
              <div className="bg-orange-50/80 rounded-lg p-3 border border-orange-200/40">
                <p className="text-xs font-semibold text-orange-700 mb-1">📖 Debrief</p>
                <p className="text-xs text-foreground leading-relaxed">{scenario.debrief}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Scenario List
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-orange-600" /> Startup Simulator
          </h3>
          <p className="text-xs text-muted-foreground">{completedScenarios.length}/{simulatorScenarios.length} scenarios completed</p>
        </div>
      </div>

      <div className="space-y-2">
        {simulatorScenarios.map((s) => {
          const done = completedScenarios.includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => { setActiveScenario(s.id); setSelectedChoice(null); }}
              className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${done ? 'border-orange-300/40 bg-orange-50/50' : 'border-border hover:border-orange-400/50 hover:bg-orange-50/30 hover:shadow-sm'}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${done ? 'bg-orange-500/10 text-orange-600' : 'bg-muted text-muted-foreground'}`}>
                {done ? <CheckCircle2 className="w-4 h-4" /> : `M${s.month}`}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{s.title}</p>
                <p className="text-[10px] text-muted-foreground">Month {s.month} Scenario</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
