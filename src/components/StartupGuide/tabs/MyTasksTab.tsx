import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Lock, Flame, Target, Send, Loader2 } from 'lucide-react';
import type { WeeklyTask } from '../useStartupGuideData';

interface MyTasksTabProps {
  tasks: WeeklyTask[];
  currentDay: number;
  reflections: Record<number, string>;
  onSubmitReflection: (day: number, text: string) => void;
  onGenerateTasks: () => Promise<void>;
  loading: boolean;
}

export const MyTasksTab = ({ tasks, currentDay, reflections, onSubmitReflection, onGenerateTasks, loading }: MyTasksTabProps) => {
  const [reflectionText, setReflectionText] = useState('');
  const [activeReflectionDay, setActiveReflectionDay] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (tasks.length === 0) {
    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-[#14532d] via-[#166534] to-[#1a4731] rounded-xl p-6 text-center shadow-lg border border-emerald-700/30">
          <div className="text-4xl mb-3">📋</div>
          <h3 className="text-lg font-bold text-white mb-2">Your Weekly Tasks</h3>
          <p className="text-xs text-white/50 mb-4 max-w-sm mx-auto">
            Your AI mentor will generate 7 personalized tasks based on your field and location. Complete the onboarding chat first!
          </p>
          <Button onClick={onGenerateTasks} disabled={loading} className="bg-gradient-to-r from-amber-400 to-yellow-400 text-green-900 font-bold rounded-xl">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</> : '🚀 Generate My Tasks'}
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmitReflection = async (day: number) => {
    if (!reflectionText.trim()) return;
    setSubmitting(true);
    await onSubmitReflection(day, reflectionText.trim());
    setReflectionText('');
    setActiveReflectionDay(null);
    setSubmitting(false);
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#14532d] via-[#166534] to-[#1a4731] rounded-xl p-4 text-center shadow-lg border border-emerald-700/30">
        <h3 className="text-base font-bold text-white">📋 Your 7-Day Challenge</h3>
        <p className="text-[11px] text-white/50 mt-1">Complete each task and submit a reflection to unlock the next day</p>
        <div className="flex justify-center gap-4 mt-3">
          <div className="text-center">
            <p className="text-lg font-bold text-amber-300">{tasks.filter(t => t.isCompleted).length}/7</p>
            <p className="text-[9px] text-white/40">COMPLETED</p>
          </div>
          <div className="w-px h-8 bg-white/15 self-center" />
          <div className="text-center">
            <p className="text-lg font-bold text-emerald-300">Day {Math.min(currentDay, 7)}</p>
            <p className="text-[9px] text-white/40">CURRENT</p>
          </div>
        </div>
      </div>

      {/* Task Cards */}
      {tasks.map((task) => {
        const completed = task.isCompleted;
        const isActive = task.day === currentDay && !completed;
        const isLocked = task.day > currentDay;
        const hasReflection = !!reflections[task.day];

        return (
          <Card key={task.day} className={`overflow-hidden transition-all ${completed ? 'border-emerald-300 bg-emerald-50/50' : isActive ? 'border-amber-400 border-2 shadow-md' : 'border-gray-200 opacity-60'}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${completed ? 'bg-emerald-100' : isActive ? 'bg-gradient-to-br from-amber-400 to-yellow-400' : 'bg-gray-100'}`}>
                  {completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : isActive ? (
                    <Flame className="w-5 h-5 text-green-900" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase ${completed ? 'text-emerald-600' : isActive ? 'text-amber-600' : 'text-gray-400'}`}>
                      Day {task.day}
                    </span>
                    {completed && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">✓ Done</span>}
                    {isActive && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium animate-pulse">Active</span>}
                  </div>
                  <h4 className="text-sm font-bold text-foreground mt-1">{task.taskTitle}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{task.taskDescription}</p>
                  <div className="mt-2 bg-emerald-50 rounded-lg p-2">
                    <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                      <Target className="w-3 h-3" /> Goal: {task.goal}
                    </p>
                  </div>

                  {/* Reflection input for active day */}
                  {isActive && !hasReflection && (
                    <div className="mt-3">
                      {activeReflectionDay === task.day ? (
                        <div className="space-y-2">
                          <Textarea
                            value={reflectionText}
                            onChange={(e) => setReflectionText(e.target.value)}
                            placeholder="What did you observe today? What problem did you notice? Write your reflection..."
                            className="text-sm min-h-[80px] border-amber-200"
                          />
                          <div className="flex gap-2">
                            <Button onClick={() => handleSubmitReflection(task.day)} disabled={submitting || !reflectionText.trim()} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs">
                              {submitting ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Send className="w-3 h-3 mr-1" />}
                              Submit Reflection
                            </Button>
                            <Button onClick={() => setActiveReflectionDay(null)} variant="outline" size="sm" className="text-xs">Cancel</Button>
                          </div>
                        </div>
                      ) : (
                        <Button onClick={() => setActiveReflectionDay(task.day)} size="sm" className="mt-1 bg-gradient-to-r from-amber-400 to-yellow-400 text-green-900 font-bold text-xs rounded-lg">
                          ✍️ Submit Today's Reflection
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Show submitted reflection */}
                  {hasReflection && (
                    <div className="mt-2 bg-blue-50 rounded-lg p-2 border border-blue-200">
                      <p className="text-[10px] font-medium text-blue-600 mb-1">📝 Your Reflection:</p>
                      <p className="text-xs text-blue-800">{reflections[task.day]}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
