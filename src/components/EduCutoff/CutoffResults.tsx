import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { CutoffResult, StudentGroup } from './types';
import { generateResultsPDF } from './generateResultsPDF';

interface CutoffResultsProps {
  result: CutoffResult;
  group: StudentGroup;
  marks: Record<string, number | null>;
  category?: string;
}

export const CutoffResults = ({ result, group, marks, category }: CutoffResultsProps) => {
  const [animatedCutoff, setAnimatedCutoff] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [animatedPercentile, setAnimatedPercentile] = useState(0);

  useEffect(() => {
    // Animate numbers on mount
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      if (result.tneaCutoff) {
        setAnimatedCutoff(Math.round(result.tneaCutoff * easeOut * 10) / 10);
      }
      setAnimatedPercentage(Math.round(result.overallPercentage * easeOut * 10) / 10);
      setAnimatedPercentile(Math.round(result.percentile * easeOut));

      if (step >= steps) {
        clearInterval(timer);
        if (result.tneaCutoff) setAnimatedCutoff(result.tneaCutoff);
        setAnimatedPercentage(result.overallPercentage);
        setAnimatedPercentile(result.percentile);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [result]);

  const getFormulaText = () => {
    switch (group) {
      case 'pcm':
      case 'pcmb':
        const maths = marks.Mathematics ?? 0;
        const physics = marks.Physics ?? 0;
        const chemistry = marks.Chemistry ?? 0;
        return `Cutoff = Maths + (Physics/2) + (Chemistry/2)\n= ${maths} + (${physics}/2) + (${chemistry}/2) = ${maths} + ${physics/2} + ${chemistry/2} = ${result.tneaCutoff}`;
      case 'pcb':
        return 'Based on NEET Score (Out of 720)\n12th Marks: Minimum 50% in PCB required';
      case 'commerce':
      case 'arts':
        return 'Based on Overall Percentage in Best of 4/5 Subjects';
      case 'vocational':
        return 'Based on 10th/12th Overall Percentage';
      default:
        return '';
    }
  };

  const handleDownloadPDF = () => {
    generateResultsPDF(result, group, marks, category);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 animate-fade-in">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            🎯 Your Eligibility Results
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            உங்கள் தகுதி முடிவுகள்
          </p>
        </div>
        <Button
          onClick={handleDownloadPDF}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-violet-600 border-violet-300 hover:bg-violet-50"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {(group === 'pcm' || group === 'pcmb') && result.tneaCutoff && (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
            <div className="text-sm text-blue-600 font-medium mb-1">🎓 TNEA CUTOFF</div>
            <div className="text-xs text-blue-500 mb-2">(Engineering)</div>
            <div className="text-4xl font-bold text-blue-700">{animatedCutoff}</div>
            <div className="text-sm text-blue-500">out of 200</div>
            <Progress 
              value={(animatedCutoff / 200) * 100} 
              className="h-2 mt-3 bg-blue-200"
            />
            <div className="text-xs text-blue-600 mt-1">{((animatedCutoff / 200) * 100).toFixed(1)}%</div>
          </div>
        )}

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
          <div className="text-sm text-green-600 font-medium mb-1">📊 OVERALL %</div>
          <div className="text-4xl font-bold text-green-700 mt-4">{animatedPercentage}%</div>
          <Progress 
            value={animatedPercentage} 
            className="h-2 mt-3 bg-green-200"
          />
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
          <div className="text-sm text-purple-600 font-medium mb-1">📈 PERCENTILE</div>
          <div className="text-xs text-purple-500 mb-2">(Estimated)</div>
          <div className="text-4xl font-bold text-purple-700">{animatedPercentile}th</div>
          <Progress 
            value={animatedPercentile} 
            className="h-2 mt-3 bg-purple-200"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm font-medium text-gray-700 mb-2">FORMULA USED:</div>
        <pre className="text-sm text-gray-600 whitespace-pre-wrap font-mono">
          {getFormulaText()}
        </pre>
      </div>
    </div>
  );
};
