import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const SurveyPublic = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const [survey, setSurvey] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSurvey();
  }, [surveyId]);

  const loadSurvey = async () => {
    try {
      // Try loading by user_id (share link format)
      const { data } = await supabase
        .from('startup_surveys')
        .select('*')
        .eq('user_id', surveyId)
        .maybeSingle();

      if (data) {
        setSurvey(data);
      } else {
        // Try by survey id
        const { data: d2 } = await supabase
          .from('startup_surveys')
          .select('*')
          .eq('id', surveyId)
          .maybeSingle();
        if (d2) setSurvey(d2);
        else setError('Survey not found.');
      }
    } catch (e) {
      setError('Could not load survey.');
    }
    setLoading(false);
  };

  const handleAnswer = (questionNum: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionNum]: value }));
  };

  const handleSubmit = async () => {
    if (!survey) return;
    const questions = survey.questions || [];
    const unanswered = questions.filter((q: any) => !answers[q.questionNumber]);
    if (unanswered.length > 0) {
      setError('Please answer all questions before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      await supabase.from('startup_survey_responses').insert({
        survey_id: survey.id,
        respondent_answers: answers,
      });
      setSubmitted(true);
    } catch (e) {
      setError('Failed to submit. Please try again.');
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-xl border-0">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Thank You! 🎉</h2>
            <p className="text-muted-foreground mb-4">
              You just helped a young founder validate their startup idea. Your response matters!
            </p>
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
              <p className="text-sm font-semibold text-emerald-800">Want to build your own startup idea?</p>
              <p className="text-xs text-emerald-600 mt-1">Join VAZHIKATTI and get AI-powered guidance!</p>
              <Button className="mt-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl" onClick={() => window.location.href = '/'}>
                🚀 Start My Journey
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && !survey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <p className="text-4xl mb-4">😕</p>
            <h2 className="text-lg font-bold text-foreground">{error}</h2>
            <p className="text-sm text-muted-foreground mt-2">This survey link may be invalid or expired.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const questions = survey?.questions || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-6 px-4">
      <div className="max-w-lg mx-auto space-y-4">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#14532d] via-[#166534] to-[#1a4731] rounded-2xl p-6 text-center shadow-lg">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-3 py-1 rounded-full text-[10px] font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            VAZHIKATTI — Startup Validation Survey
          </div>
          <h1 className="text-lg font-bold text-white mb-2">Help Validate This Startup Idea!</h1>
          <div className="bg-white/10 rounded-xl p-3 mt-3">
            <p className="text-sm text-white/80 italic">"{survey?.problem_statement}"</p>
          </div>
          <p className="text-[11px] text-white/40 mt-3">Takes only 2 minutes • Your answers help a student founder</p>
        </div>

        {/* Questions */}
        {questions.map((q: any, i: number) => (
          <Card key={i} className="border-border/40 shadow-sm">
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-foreground mb-3">
                <span className="text-emerald-600">Q{q.questionNumber}.</span> {q.questionText}
              </p>
              {q.type === 'mcq' && q.options ? (
                <div className="space-y-2">
                  {q.options.map((opt: string, j: number) => (
                    <label key={j} className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${answers[q.questionNumber] === opt ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${answers[q.questionNumber] === opt ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'}`}>
                        {answers[q.questionNumber] === opt && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="text-sm text-foreground">{opt}</span>
                      <input type="radio" name={`q${q.questionNumber}`} value={opt} onChange={() => handleAnswer(q.questionNumber, opt)} className="hidden" />
                    </label>
                  ))}
                </div>
              ) : (
                <Textarea
                  value={answers[q.questionNumber] || ''}
                  onChange={(e) => handleAnswer(q.questionNumber, e.target.value)}
                  placeholder="Type your answer..."
                  className="min-h-[70px] text-sm"
                />
              )}
            </CardContent>
          </Card>
        ))}

        {/* Error */}
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        {/* Submit */}
        <Button onClick={handleSubmit} disabled={submitting} className="w-full h-12 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl shadow-lg text-base">
          {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</> : '✅ Submit Survey'}
        </Button>

        <p className="text-[10px] text-center text-muted-foreground">
          Powered by <strong>VAZHIKATTI</strong> — AI Career Guide by JKKN Institutions
        </p>
      </div>
    </div>
  );
};

export default SurveyPublic;
