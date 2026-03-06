import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { CutoffResult, StudentGroup, getGroupCategory, isEligibleForTNEA } from './types';
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

  const groupCategory = getGroupCategory(group);
  const showTNEA = isEligibleForTNEA(group);

  useEffect(() => {
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
    if (showTNEA && result.tneaCutoff) {
      const maths = marks.Mathematics ?? 0;
      const physics = marks.Physics ?? 0;
      const chemistry = marks.Chemistry ?? 0;
      return `Cutoff = Maths + (Physics/2) + (Chemistry/2)\n= ${maths} + (${physics}/2) + (${chemistry}/2) = ${result.tneaCutoff}`;
    }
    
    switch (groupCategory) {
      case 'science_bio':
        return 'Medical: Based on NEET Score (Out of 720)\n12th Marks: Minimum 50% in PCB required for NEET eligibility\nOther courses (B.Sc, Nursing): Based on 12th % directly';
      case 'commerce':
        return 'No Cutoff Formula needed!\nAdmission = Your 12th Overall Percentage directly\nPopular colleges rank by % — Higher marks = Better college';
      case 'arts':
        return 'No Cutoff Formula needed!\nAdmission = Your 12th Overall Percentage directly\nMost arts colleges admit with pass marks (35% per subject)';
      default:
        return 'Based on Overall Percentage';
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
            🎯 Your Eligibility Results (Group {group})
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

      {/* ─── CLEAR MESSAGE FOR ARTS/COMMERCE: NO CUTOFF ─── */}
      {(groupCategory === 'commerce' || groupCategory === 'arts') && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-5 mb-5">
          <div className="flex items-start gap-3">
            <span className="text-3xl">✅</span>
            <div>
              <h4 className="font-bold text-green-800 text-base mb-1">
                No Cutoff Needed for {groupCategory === 'arts' ? 'Arts/Humanities' : 'Commerce'} Students!
              </h4>
              <p className="text-sm text-green-700 mb-3">
                {groupCategory === 'arts' 
                  ? 'Arts courses (BA, B.Lit, B.A History, B.A English, etc.) admit students purely based on your 12th mark percentage. There is NO separate cutoff formula like Engineering (TNEA).'
                  : 'Commerce courses (B.Com, BBA, CA Foundation, CS, etc.) admit students purely based on your 12th mark percentage. There is NO separate cutoff formula like Engineering (TNEA).'
                }
              </p>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-sm font-bold text-green-800 mb-2">How Admission Works for You:</p>
                <div className="space-y-1.5">
                  <p className="text-sm text-gray-700">1. Your <strong className="text-green-700">12th Overall Percentage = {result.overallPercentage}%</strong> — This IS your admission score</p>
                  <p className="text-sm text-gray-700">2. Colleges rank students from highest % to lowest and fill seats</p>
                  <p className="text-sm text-gray-700">3. Popular colleges may need <strong>60-80%</strong> for top courses</p>
                  <p className="text-sm text-gray-700">4. Most colleges admit with just <strong>pass marks (35%/subject)</strong></p>
                  <p className="text-sm text-gray-700">5. SC/ST/BC/MBC students get <strong>additional seat reservation</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── NEET MESSAGE FOR BIO STUDENTS ─── */}
      {groupCategory === 'science_bio' && (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-xl p-5 mb-5">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🩺</span>
            <div>
              <h4 className="font-bold text-amber-800 text-base mb-1">
                Medical Admission = NEET Score (Not 12th Cutoff!)
              </h4>
              <p className="text-sm text-amber-700 mb-3">
                For MBBS, BDS, BAMS, BHMS, B.Pharm — admission is based on your <strong>NEET score (out of 720)</strong>, not on a 12th mark cutoff formula. You need minimum 50% in PCB in 12th to be eligible for NEET counselling.
              </p>
              <div className="bg-white rounded-lg p-4 border border-amber-200">
                <p className="text-sm font-bold text-amber-800 mb-2">For Non-Medical Courses (B.Sc, Nursing, Agriculture):</p>
                <p className="text-sm text-gray-700">Your 12th percentage (<strong>{result.overallPercentage}%</strong>) is used directly for admission — no separate cutoff formula needed.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── SCORE CARDS ─── */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
        {showTNEA && result.tneaCutoff && (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg md:rounded-xl p-2 md:p-4 text-center border border-blue-200">
            <div className="text-[10px] md:text-sm text-blue-600 font-medium">TNEA</div>
            <div className="text-xl md:text-4xl font-bold text-blue-700">{animatedCutoff}</div>
            <div className="text-[9px] md:text-sm text-blue-500">/200</div>
            <Progress value={(animatedCutoff / 200) * 100} className="h-1.5 mt-1.5 bg-blue-200" />
          </div>
        )}

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg md:rounded-xl p-2 md:p-4 text-center border border-green-200">
          <div className="text-[10px] md:text-sm text-green-600 font-medium">
            {(groupCategory === 'commerce' || groupCategory === 'arts') ? 'Score' : 'Overall'}
          </div>
          <div className="text-xl md:text-4xl font-bold text-green-700">{animatedPercentage}%</div>
          <Progress value={animatedPercentage} className="h-1.5 mt-1.5 bg-green-200" />
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg md:rounded-xl p-2 md:p-4 text-center border border-purple-200">
          <div className="text-[10px] md:text-sm text-purple-600 font-medium">Rank</div>
          <div className="text-xl md:text-4xl font-bold text-purple-700">{animatedPercentile}th</div>
          <Progress value={animatedPercentile} className="h-1.5 mt-1.5 bg-purple-200" />
        </div>
      </div>

      {/* ─── FORMULA BOX ─── */}
      <div className="bg-gray-50 rounded-lg p-4 border">
        <div className="text-sm font-medium text-gray-700 mb-2">
          {(groupCategory === 'commerce' || groupCategory === 'arts') ? 'ADMISSION METHOD:' : 'FORMULA USED:'}
        </div>
        <pre className="text-sm text-gray-600 whitespace-pre-wrap font-mono">
          {getFormulaText()}
        </pre>
      </div>
    </div>
  );
};
