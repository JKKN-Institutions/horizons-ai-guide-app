import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Lock, Loader2, Share2, BarChart3, Eye, Link2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import type { DetectedProblem, Survey } from '../useStartupGuideData';

interface ProblemSurveyTabProps {
  unlocked: boolean;
  problem: DetectedProblem | null;
  survey: Survey | null;
  reflections: Record<string, string>;
  field: string;
  subDomain: string;
  location: string;
  onDetectProblem: () => Promise<void>;
  onGenerateSurvey: () => Promise<void>;
  onRefreshCount: () => void;
}

export const ProblemSurveyTab = ({ unlocked, problem, survey, reflections, field, subDomain, location, onDetectProblem, onGenerateSurvey, onRefreshCount }: ProblemSurveyTabProps) => {
  const [detecting, setDetecting] = useState(false);
  const [generating, setGenerating] = useState(false);

  if (!unlocked) {
    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl p-8 text-center border border-gray-200">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-500">Locked 🔒</h3>
          <p className="text-sm text-gray-400 mt-2 max-w-sm mx-auto">
            Complete all 7 daily reflections to unlock Problem Detection & Survey Generation.
          </p>
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${reflections[i + 1] ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                {reflections[i + 1] ? '✓' : i + 1}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">{Object.keys(reflections).length}/7 reflections submitted</p>
        </div>
      </div>
    );
  }

  const handleDetect = async () => {
    setDetecting(true);
    await onDetectProblem();
    setDetecting(false);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    await onGenerateSurvey();
    setGenerating(false);
  };

  const handleShare = (platform: string) => {
    if (!survey) return;
    const text = `Help me validate my startup idea! Take this quick 2-min survey: ${survey.shareLink}`;
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(survey.shareLink)}`,
      copy: '',
    };
    if (platform === 'copy') {
      navigator.clipboard.writeText(survey.shareLink);
      toast.success('Survey link copied! 📋');
    } else {
      window.open(urls[platform], '_blank');
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#14532d] via-[#166534] to-[#1a4731] rounded-xl p-5 text-center shadow-lg border border-emerald-700/30">
        <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/25 text-amber-300 px-4 py-1.5 rounded-full text-[11px] font-semibold mb-3">
          <BarChart3 className="w-3.5 h-3.5" />
          Problem Detection & Survey
        </div>
        <h3 className="text-lg font-bold text-white mb-1">Validate Your Startup Idea</h3>
        <p className="text-xs text-white/50 max-w-md mx-auto">AI analyzes your 7 reflections to find the strongest problem, then generates a survey to validate it.</p>
      </div>

      {/* Step 1: Detect Problem */}
      {!problem ? (
        <Card className="border-amber-200 border-2">
          <CardContent className="p-5 text-center">
            <div className="text-3xl mb-3">🔍</div>
            <h4 className="text-sm font-bold text-foreground">Step 1: AI Problem Detection</h4>
            <p className="text-xs text-muted-foreground mt-1 mb-4">Let AI analyze your 7 reflections and identify the strongest problem.</p>
            <Button onClick={handleDetect} disabled={detecting} className="bg-gradient-to-r from-amber-400 to-yellow-400 text-green-900 font-bold rounded-xl">
              {detecting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing Reflections...</> : '🤖 Detect My Problem'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Problem Display */}
          <Card className="border-emerald-300 border-2 overflow-hidden">
            <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-200">
              <p className="text-xs font-bold text-emerald-700 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> AI-Detected Problem</p>
            </div>
            <CardContent className="p-4">
              <h4 className="text-sm font-bold text-foreground mb-3">"{problem.problemStatement}"</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Pain Level', value: problem.painScore, max: 10, suffix: '/10', color: 'bg-red-500' },
                  { label: 'Market Size', value: problem.marketSize, max: 100, suffix: '%', color: 'bg-blue-500' },
                  { label: 'Uniqueness', value: problem.uniqueness, max: 100, suffix: '%', color: 'bg-purple-500' },
                  { label: 'Existing Gaps', value: problem.existingGaps, max: 100, suffix: '%', color: 'bg-amber-500' },
                ].map((metric) => (
                  <div key={metric.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-muted-foreground font-medium">{metric.label}</p>
                    <p className="text-lg font-bold text-foreground">{metric.value}{metric.suffix}</p>
                    <Progress value={(metric.value / metric.max) * 100} className="h-1.5 mt-1" />
                  </div>
                ))}
              </div>
              <div className="mt-3 bg-blue-50 rounded-lg p-2.5">
                <p className="text-[11px] text-blue-700"><strong>Target Customer:</strong> {problem.targetCustomer}</p>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Generate Survey */}
          {!survey ? (
            <Card className="border-amber-200 border-2">
              <CardContent className="p-5 text-center">
                <div className="text-3xl mb-3">📊</div>
                <h4 className="text-sm font-bold text-foreground">Step 2: Generate Validation Survey</h4>
                <p className="text-xs text-muted-foreground mt-1 mb-4">Create an 8-question survey to validate this problem with real people.</p>
                <Button onClick={handleGenerate} disabled={generating} className="bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl">
                  {generating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</> : '📋 Generate Survey'}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Survey Created */}
              <Card className="border-emerald-300 border-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-foreground">📊 Your Survey is Live!</h4>
                    <Button onClick={onRefreshCount} variant="ghost" size="sm" className="text-xs">
                      🔄 Refresh
                    </Button>
                  </div>

                  {/* Response Counter */}
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 text-center mb-4 border border-emerald-200">
                    <p className="text-3xl font-bold text-emerald-700">{survey.responseCount}</p>
                    <p className="text-xs text-emerald-600 font-medium">Responses Collected</p>
                    <Progress value={Math.min(100, (survey.responseCount / 20) * 100)} className="h-2 mt-2" />
                    <p className="text-[10px] text-emerald-500 mt-1">{survey.responseCount >= 20 ? '✅ Goal reached! Build tab unlocked!' : `${20 - survey.responseCount} more needed to unlock Build tab`}</p>
                  </div>

                  {/* Share Link */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-[10px] text-muted-foreground font-medium mb-1">Share Link:</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs text-foreground flex-1 truncate bg-white px-2 py-1 rounded border">{survey.shareLink}</code>
                      <Button onClick={() => handleShare('copy')} size="sm" variant="outline" className="text-xs px-2">
                        <Link2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex gap-2">
                    <Button onClick={() => handleShare('whatsapp')} className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs rounded-lg" size="sm">
                      WhatsApp
                    </Button>
                    <Button onClick={() => handleShare('linkedin')} className="flex-1 bg-[#0077B5] hover:bg-[#006699] text-white text-xs rounded-lg" size="sm">
                      LinkedIn
                    </Button>
                    <Button onClick={() => handleShare('copy')} variant="outline" className="flex-1 text-xs rounded-lg" size="sm">
                      Copy Link
                    </Button>
                  </div>

                  {/* Survey Questions Preview */}
                  <details className="mt-4">
                    <summary className="text-xs font-medium text-muted-foreground cursor-pointer flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Preview Survey Questions ({survey.questions.length})
                    </summary>
                    <div className="mt-2 space-y-2">
                      {survey.questions.map((q: any, i: number) => (
                        <div key={i} className="bg-white rounded-lg p-2.5 border border-border/50 text-xs">
                          <p className="font-medium text-foreground">Q{q.questionNumber}. {q.questionText}</p>
                          {q.type === 'mcq' && q.options && (
                            <div className="mt-1 space-y-0.5 pl-3">
                              {q.options.map((opt: string, j: number) => (
                                <p key={j} className="text-muted-foreground">○ {opt}</p>
                              ))}
                            </div>
                          )}
                          {q.type === 'text' && <p className="text-muted-foreground mt-1 italic">Short answer</p>}
                        </div>
                      ))}
                    </div>
                  </details>
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  );
};
