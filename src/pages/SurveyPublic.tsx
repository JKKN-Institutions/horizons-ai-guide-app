import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Loader2 } from 'lucide-react';

// Generate standard validation questions from a problem statement
function generateQuestions(problem: string, target: string) {
  return [
    { questionNumber: 1, questionText: `Have you experienced this problem: "${problem}"?`, type: 'mcq', options: ['Yes, frequently', 'Sometimes', 'Rarely', 'Never'] },
    { questionNumber: 2, questionText: 'How much does this problem affect your daily life?', type: 'mcq', options: ["Very much — it's a major pain", 'Moderately', 'Slightly', 'Not at all'] },
    { questionNumber: 3, questionText: 'What solutions have you tried so far?', type: 'text', options: [] },
    { questionNumber: 4, questionText: 'How much would you pay monthly for a good solution?', type: 'mcq', options: ['₹0 — should be free', '₹50-100', '₹100-500', '₹500+'] },
    { questionNumber: 5, questionText: 'Which feature would be most important to you?', type: 'mcq', options: ['Easy to use', 'Affordable price', 'Fast service', 'Reliable quality'] },
    { questionNumber: 6, questionText: 'How do you currently deal with this problem?', type: 'text', options: [] },
    { questionNumber: 7, questionText: 'Would you recommend a solution to others if it worked well?', type: 'mcq', options: ['Definitely yes', 'Probably yes', 'Maybe', 'Probably not'] },
    { questionNumber: 8, questionText: 'Any other suggestions or ideas for solving this problem?', type: 'text', options: [] },
  ];
}

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
    if (!surveyId) { setError('No survey ID provided.'); setLoading(false); return; }
    
    // Try to decode problem statement from the URL path (URL-safe base64 encoded)
    try {
      // Restore standard base64 from URL-safe format
      let b64 = surveyId.replace(/-/g, '+').replace(/_/g, '/');
      while (b64.length % 4) b64 += '=';
      const decoded = JSON.parse(decodeURIComponent(escape(atob(b64))));
      if (decoded.p) {
        const questions = generateQuestions(decoded.p, decoded.t || '');
        setSurvey({
          id: surveyId,
          questions,
          problem_statement: decoded.p,
          target_customer: decoded.t || '',
        });
        setLoading(false);
        return;
      }
    } catch (e) {
      // Not base64 encoded — might be a UUID, try other methods
    }
    
    // Try localStorage (same device)
    try {
      const localData = localStorage.getItem('vazhikatti_startup_v2');
      if (localData) {
        const parsed = JSON.parse(localData);
        if (parsed.survey && (parsed.survey.id === surveyId || surveyId === 'demo')) {
          setSurvey({
            id: parsed.survey.id,
            questions: parsed.survey.questions,
            problem_statement: parsed.survey.problemStatement,
            target_customer: parsed.survey.targetCustomer,
          });
          setLoading(false);
          return;
        }
      }
    } catch (e) {}
    
    setError('Survey not found.');
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
      // Save response to localStorage
      const existing = JSON.parse(localStorage.getItem('vazhikatti_survey_responses') || '[]');
      existing.push({ survey_id: survey.id, answers, submitted_at: new Date().toISOString() });
      localStorage.setItem('vazhikatti_survey_responses', JSON.stringify(existing));
      
      // Also update the main startup data's response count
      try {
        const mainData = JSON.parse(localStorage.getItem('vazhikatti_startup_v2') || '{}');
        if (mainData.survey) {
          mainData.survey.responseCount = (mainData.survey.responseCount || 0) + 1;
          localStorage.setItem('vazhikatti_startup_v2', JSON.stringify(mainData));
        }
      } catch (e2) {}
      
      // Trigger notification for the startup guide (cross-tab communication)
      try {
        localStorage.setItem('vazhikatti_survey_notification', JSON.stringify({
          type: 'response_submitted',
          count: existing.length,
          timestamp: Date.now(),
        }));
        // BroadcastChannel for instant cross-tab notification
        const bc = new BroadcastChannel('vazhikatti_survey');
        bc.postMessage({ type: 'response_submitted', count: existing.length });
        bc.close();
      } catch (e3) {}
      
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
              <p className="text-xs text-emerald-600 mt-1">Join VAZHIKAATTI and get AI-powered guidance!</p>
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
            VAZHIKAATTI — Startup Validation Survey
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
          Powered by <strong>VAZHIKAATTI</strong> — AI Career Guide by JKKN Institutions
        </p>
      </div>
    </div>
  );
};

export default SurveyPublic;
