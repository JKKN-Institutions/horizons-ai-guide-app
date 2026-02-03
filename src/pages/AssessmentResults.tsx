import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Trophy, Target, Sparkles, TrendingUp, Calendar, Loader2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AssessmentResultsData {
  careerStory: string;
  archetype: string;
  superpowers: Array<{ title: string; icon: string; description: string }>;
  careerPaths: Array<{ title: string; match: number; description: string; nextSteps: string[] }>;
  growthAreas: Array<{ title: string; description: string }>;
  actionPlan: {
    chapter1: { title: string; tasks: string[] };
    chapter2: { title: string; tasks: string[] };
    chapter3: { title: string; tasks: string[] };
  };
  overallScore: number;
  readinessLevel: string;
}

type AssessmentType = 'psychometric' | 'career_interest' | 'emotional_intelligence' | 'skill_gap';

type LocalAttempt = {
  id: string;
  type: AssessmentType;
  attemptNumber: number;
  results?: AssessmentResultsData;
};

const assessmentNames: Record<string, string> = {
  psychometric: 'Psychometric Assessment',
  career_interest: 'Career Interest Inventory',
  emotional_intelligence: 'Emotional Intelligence',
  skill_gap: 'Skill Gap Analysis',
};

const localAttemptKey = (attemptId: string) => `college_assessment_attempt_${attemptId}`;

const AssessmentResults = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [results, setResults] = useState<AssessmentResultsData | null>(null);
  const [assessmentType, setAssessmentType] = useState<AssessmentType | ''>('');
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (!attemptId) {
      navigate('/career-assessment/colleges');
      return;
    }

    loadResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId, user]);

  const loadLocal = () => {
    try {
      const raw = localStorage.getItem(localAttemptKey(attemptId!));
      const localAttempt = raw ? (JSON.parse(raw) as LocalAttempt) : null;

      if (!localAttempt?.results) {
        toast({ title: 'Error', description: 'Results not found', variant: 'destructive' });
        navigate('/career-assessment/colleges');
        return;
      }

      setResults(localAttempt.results);
      setAssessmentType(localAttempt.type);
      setAttemptNumber(localAttempt.attemptNumber || 1);
      setUserName('Explorer');
    } catch {
      toast({ title: 'Error', description: 'Results not found', variant: 'destructive' });
      navigate('/career-assessment/colleges');
    } finally {
      setLoading(false);
    }
  };

  const loadResults = async () => {
    if (attemptId?.startsWith('local_')) {
      loadLocal();
      return;
    }

    if (!user) {
      navigate('/career-assessment/colleges');
      return;
    }

    try {
      const { data: attempt, error } = await supabase
        .from('user_assessment_attempts')
        .select('*')
        .eq('id', attemptId)
        .single();

      if (error || !attempt || !attempt.score) {
        toast({ title: 'Error', description: 'Results not found', variant: 'destructive' });
        navigate('/career-assessment/colleges');
        return;
      }

      setResults(attempt.score as unknown as AssessmentResultsData);
      setAssessmentType(attempt.assessment_type as AssessmentType);
      setAttemptNumber(attempt.attempt_number);

      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('user_id', user?.id)
        .maybeSingle();

      setUserName(profile?.display_name || 'Explorer');
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: assessmentType ? `My ${assessmentNames[assessmentType]} Results` : 'My Assessment Results',
        text: assessmentType
          ? `I just completed the ${assessmentNames[assessmentType]} and discovered I'm "${results?.archetype}"! Check out VAZHIKATTI for career guidance.`
          : 'I just completed an assessment on VAZHIKATTI!',
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copied!', description: 'Share your results with others' });
    }
  };

  const handleDownload = () => {
    toast({ title: 'Coming Soon', description: 'PDF download will be available soon!' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#FF6B35] mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!results) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A2E1F]/5 to-background">
      <header className="bg-[#0A2E1F] text-white py-6">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="text-white hover:bg-white/10 mb-4" onClick={() => navigate('/career-assessment/colleges')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assessments
          </Button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold italic mb-2">Your Career Story</h1>
              <p className="text-white/80">
                {assessmentType ? assessmentNames[assessmentType] : 'Assessment'} • Attempt #{attemptNumber}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-8 bg-gradient-to-r from-[#0A2E1F] to-[#0A2E1F]/80 text-white border-none overflow-hidden">
          <CardContent className="pt-6 pb-8 relative">
            <div className="absolute top-0 right-0 opacity-10">
              <Star className="h-32 w-32" />
            </div>
            <div className="text-center relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#FFB800] text-[#0A2E1F] px-4 py-1 rounded-full text-sm font-semibold mb-4">
                <Trophy className="h-4 w-4" />
                {results.readinessLevel}
              </div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold italic mb-2">
                Meet {userName} — The {results.archetype}
              </h2>
              <div className="flex items-center justify-center gap-2 text-[#FFB800]">
                <span className="text-2xl font-bold">{results.overallScore}%</span>
                <span className="text-white/70">Career Readiness Score</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-l-4 border-l-[#FF6B35]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#FF6B35]" />
              Your Career Story
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              {results.careerStory.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-l-4 border-l-[#FFB800]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-[#FFB800]" />
              Your Superpowers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {results.superpowers.map((power, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{power.icon}</span>
                    <h4 className="font-semibold text-foreground">{power.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{power.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Your Ideal Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {results.careerPaths.map((path, i) => (
                <div key={i} className="bg-muted/30 rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-sm text-muted-foreground">PATH {i + 1}</span>
                      <h4 className="text-xl font-semibold text-foreground">{path.title}</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{path.match}%</div>
                      <div className="text-xs text-muted-foreground">Match</div>
                    </div>
                  </div>
                  <Progress value={path.match} className="h-2 mb-3" />
                  <p className="text-muted-foreground mb-3">{path.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {path.nextSteps.map((step, j) => (
                      <span key={j} className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle>Your Growth Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.growthAreas.map((area, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{area.title}</h4>
                    <p className="text-sm text-muted-foreground">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              Your 90-Day Action Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {['chapter1', 'chapter2', 'chapter3'].map((chapter) => {
                const chapterData = results.actionPlan[chapter as keyof typeof results.actionPlan];
                return (
                  <div key={chapter} className="relative pl-8 pb-6 border-l-2 border-purple-200 last:pb-0">
                    <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-purple-500" />
                    <h4 className="font-semibold text-foreground mb-3">{chapterData.title}</h4>
                    <ul className="space-y-2">
                      {chapterData.tasks.map((task, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-purple-500 mt-1">•</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="text-center py-8">
          <Button size="lg" className="bg-[#FF6B35] hover:bg-[#FF6B35]/90" onClick={() => navigate('/career-assessment/colleges')}>
            Take Another Assessment
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AssessmentResults;
