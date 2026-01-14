import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, ArrowRight, RotateCcw, CheckCircle, Globe } from 'lucide-react';
import { quizQuestions, countries } from './data';
import { useLanguage } from '@/hooks/useLanguage';

export const CountryMatcherQuiz = () => {
  const { language } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const calculateResults = () => {
    const countryScores: Record<string, number> = {};
    
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = quizQuestions.find(q => q.id === questionId);
      const option = question?.options.find(o => o.value === answer);
      option?.countries.forEach(country => {
        countryScores[country] = (countryScores[country] || 0) + 1;
      });
    });

    return Object.entries(countryScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([countryId, score]) => ({
        country: countries.find(c => c.id === countryId)!,
        score,
        matchPercent: Math.round((score / quizQuestions.length) * 100)
      }));
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const results = calculateResults();
    
    return (
      <Card className="border-2 border-indigo-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Target className="w-6 h-6 text-indigo-500" />
            Your Perfect Destinations
          </CardTitle>
          <CardDescription>Based on your preferences, here are your top matches</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.map((result, index) => (
            <div 
              key={result.country.id}
              className={`p-4 rounded-xl border-2 ${
                index === 0 
                  ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300' 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{result.country.flag}</span>
                  <div>
                    <h3 className="font-bold text-lg">{result.country.name[language]}</h3>
                    <p className="text-sm text-gray-500">{result.country.universities}+ Universities</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">{result.matchPercent}%</div>
                  <div className="text-xs text-gray-500">Match</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white/80 rounded-lg p-2">
                  <span className="text-gray-500">Tuition:</span>
                  <span className="ml-1 font-medium">{result.country.avgTuition}</span>
                </div>
                <div className="bg-white/80 rounded-lg p-2">
                  <span className="text-gray-500">PR Path:</span>
                  <span className="ml-1 font-medium text-xs">{result.country.prDuration}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-3">
                {result.country.popularCourses.slice(0, 3).map((course, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{course}</Badge>
                ))}
              </div>
            </div>
          ))}
          
          <Button onClick={reset} variant="outline" className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" />
            Take Quiz Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <Card className="border-2 border-indigo-200">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline">Question {currentQuestion + 1} of {quizQuestions.length}</Badge>
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
        <Progress value={progress} className="h-2" />
        <CardTitle className="text-xl mt-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-500" />
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {question.options.map((option) => (
            <Button
              key={option.value}
              variant="outline"
              className={`h-auto py-4 justify-start text-left hover:border-indigo-300 hover:bg-indigo-50 ${
                answers[question.id] === option.value ? 'border-indigo-500 bg-indigo-50' : ''
              }`}
              onClick={() => handleAnswer(question.id, option.value)}
            >
              <div className="flex items-center gap-3 w-full">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  answers[question.id] === option.value ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'
                }`}>
                  {answers[question.id] === option.value && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="flex-1">{option.label}</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
