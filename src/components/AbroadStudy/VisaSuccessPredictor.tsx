import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Shield, TrendingUp, AlertTriangle, CheckCircle, XCircle, Lightbulb, ArrowRight } from 'lucide-react';
import { countries } from './data';

interface VisaFactor {
  id: string;
  label: string;
  options: { value: string; score: number; label: string }[];
}

const visaFactors: VisaFactor[] = [
  {
    id: 'university',
    label: 'University Ranking',
    options: [
      { value: 'top50', score: 25, label: 'Top 50 World Ranking' },
      { value: 'top100', score: 20, label: 'Top 100 World Ranking' },
      { value: 'top500', score: 15, label: 'Top 500 World Ranking' },
      { value: 'other', score: 10, label: 'Other Accredited' },
    ]
  },
  {
    id: 'academics',
    label: 'Academic Background',
    options: [
      { value: 'excellent', score: 25, label: 'Above 85%' },
      { value: 'good', score: 20, label: '75-85%' },
      { value: 'average', score: 15, label: '60-75%' },
      { value: 'below', score: 10, label: 'Below 60%' },
    ]
  },
  {
    id: 'english',
    label: 'English Proficiency',
    options: [
      { value: 'high', score: 20, label: 'IELTS 7.5+ / TOEFL 110+' },
      { value: 'good', score: 15, label: 'IELTS 7.0 / TOEFL 100' },
      { value: 'minimum', score: 10, label: 'IELTS 6.5 / TOEFL 90' },
      { value: 'below', score: 5, label: 'Below Minimum' },
    ]
  },
  {
    id: 'funds',
    label: 'Financial Proof',
    options: [
      { value: 'excellent', score: 20, label: 'Full funds ready + surplus' },
      { value: 'good', score: 15, label: 'Loan approved + some funds' },
      { value: 'pending', score: 10, label: 'Loan in progress' },
      { value: 'unclear', score: 5, label: 'Funding unclear' },
    ]
  },
  {
    id: 'ties',
    label: 'Ties to Home Country',
    options: [
      { value: 'strong', score: 10, label: 'Family business/property' },
      { value: 'moderate', score: 7, label: 'Family here, clear return plans' },
      { value: 'weak', score: 4, label: 'Minimal ties' },
    ]
  },
];

export const VisaSuccessPredictor = () => {
  const [selectedCountry, setSelectedCountry] = useState('usa');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const calculateScore = () => {
    let score = 0;
    visaFactors.forEach(factor => {
      const answer = answers[factor.id];
      const option = factor.options.find(o => o.value === answer);
      if (option) score += option.score;
    });
    return score;
  };

  const score = calculateScore();
  const maxScore = 100;
  const percentage = Math.round((score / maxScore) * 100);

  const getResultColor = () => {
    if (percentage >= 80) return 'green';
    if (percentage >= 60) return 'amber';
    if (percentage >= 40) return 'orange';
    return 'red';
  };

  const getResultMessage = () => {
    if (percentage >= 80) return { title: 'Excellent Chances!', desc: 'Your profile is very strong for visa approval' };
    if (percentage >= 60) return { title: 'Good Chances', desc: 'Your profile is competitive, consider improvements' };
    if (percentage >= 40) return { title: 'Moderate Chances', desc: 'There are areas that need strengthening' };
    return { title: 'Needs Improvement', desc: 'Consider addressing weak points before applying' };
  };

  const isComplete = Object.keys(answers).length === visaFactors.length;
  const country = countries.find(c => c.id === selectedCountry);
  const result = getResultMessage();
  const color = getResultColor();

  return (
    <Card className="border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-500" />
          Visa Success Predictor
        </CardTitle>
        <CardDescription>Estimate your visa approval chances based on your profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Country Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Target Country</label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countries.map(c => (
                <SelectItem key={c.id} value={c.id}>
                  {c.flag} {c.name.en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Factors */}
        <div className="space-y-4">
          {visaFactors.map((factor) => (
            <div key={factor.id} className="space-y-2">
              <label className="text-sm font-medium">{factor.label}</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {factor.options.map((option) => (
                  <Button
                    key={option.value}
                    variant={answers[factor.id] === option.value ? 'default' : 'outline'}
                    size="sm"
                    className="h-auto py-2 px-3 text-xs"
                    onClick={() => setAnswers(prev => ({ ...prev, [factor.id]: option.value }))}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Result */}
        {isComplete && (
          <div className={`p-6 rounded-xl border-2 ${
            color === 'green' ? 'bg-green-50 border-green-300' :
            color === 'amber' ? 'bg-amber-50 border-amber-300' :
            color === 'orange' ? 'bg-orange-50 border-orange-300' :
            'bg-red-50 border-red-300'
          }`}>
            <div className="text-center mb-4">
              <div className={`text-5xl font-bold ${
                color === 'green' ? 'text-green-600' :
                color === 'amber' ? 'text-amber-600' :
                color === 'orange' ? 'text-orange-600' :
                'text-red-600'
              }`}>
                {percentage}%
              </div>
              <Progress value={percentage} className="h-3 mt-3" />
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                {percentage >= 60 ? (
                  <CheckCircle className={`w-6 h-6 ${color === 'green' ? 'text-green-500' : 'text-amber-500'}`} />
                ) : (
                  <AlertTriangle className={`w-6 h-6 ${color === 'orange' ? 'text-orange-500' : 'text-red-500'}`} />
                )}
                <h3 className="font-bold text-xl">{result.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{result.desc}</p>
            </div>

            <div className="mt-4 p-3 bg-white/50 rounded-lg">
              <div className="flex items-start gap-2 text-sm">
                <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5" />
                <p>
                  {percentage >= 80 
                    ? `Your profile is well-suited for ${country?.name.en}. Prepare your documents and apply confidently!`
                    : percentage >= 60
                    ? `Consider improving your English scores or financial documentation to strengthen your case.`
                    : `Focus on getting a stronger admission offer and ensuring clear financial proof before applying.`
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {!isComplete && (
          <div className="text-center py-8 text-gray-500">
            <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Complete all fields above to see your visa success prediction</p>
          </div>
        )}

        <div className="text-xs text-gray-500 text-center">
          * This is an estimate based on common factors. Actual visa decisions depend on many variables and consular discretion.
        </div>
      </CardContent>
    </Card>
  );
};
