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

// Cutoff range categories for engineering
const cutoffRanges = [
  { label: '🔵 TOP COLLEGES', range: '195 – 200', color: 'bg-blue-50 border-blue-300 text-blue-800', colleges: 'Anna University (CEG), PSG Tech, SSN, MIT Campus — CSE/ECE only at this range' },
  { label: '🟢 VERY GOOD', range: '185 – 195', color: 'bg-green-50 border-green-300 text-green-800', colleges: 'Thiagarajar, CIT Coimbatore, Kumaraguru, Velammal — CSE/ECE/EEE' },
  { label: '🟡 GOOD', range: '170 – 185', color: 'bg-yellow-50 border-yellow-300 text-yellow-800', colleges: 'Kongu, KPR, Sri Krishna — All core branches available' },
  { label: '🟠 AVERAGE', range: '150 – 170', color: 'bg-orange-50 border-orange-300 text-orange-800', colleges: 'Bannari Amman, SNS, Karpagam + BioTech at top colleges (PSG, CIT, Thiagarajar ~150-175)' },
  { label: '🔴 PRIVATE SEATS', range: '120 – 150', color: 'bg-red-50 border-red-300 text-red-800', colleges: 'Many private colleges — seats available in most branches including Biomedical' },
];

export const CutoffResults = ({ result, group, marks, category }: CutoffResultsProps) => {
  const [animatedCutoff, setAnimatedCutoff] = useState(0);
  const [animatedCutoff100, setAnimatedCutoff100] = useState(0);
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
      if (result.tneaCutoff100) {
        setAnimatedCutoff100(Math.round(result.tneaCutoff100 * easeOut * 10) / 10);
      }
      setAnimatedPercentage(Math.round(result.overallPercentage * easeOut * 10) / 10);
      setAnimatedPercentile(Math.round(result.percentile * easeOut));

      if (step >= steps) {
        clearInterval(timer);
        if (result.tneaCutoff) setAnimatedCutoff(result.tneaCutoff);
        if (result.tneaCutoff100) setAnimatedCutoff100(result.tneaCutoff100);
        setAnimatedPercentage(result.overallPercentage);
        setAnimatedPercentile(result.percentile);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [result]);

  const getFormulaText = () => {
    if (showTNEA && result.tneaCutoff100 && result.tneaCutoff) {
      const maths = marks.Mathematics ?? 0;
      const physics = marks.Physics ?? 0;
      const chemistry = marks.Chemistry ?? 0;
      return `TNEA Normalised Marks Formula:\n\nStep 1: Take your PCM marks (out of 100 each)\n  Maths    = ${maths}  → ${maths} ÷ 2 = ${(maths/2).toFixed(1)}\n  Physics  = ${physics}  → ${physics} ÷ 4 = ${(physics/4).toFixed(1)}\n  Chemistry = ${chemistry}  → ${chemistry} ÷ 4 = ${(chemistry/4).toFixed(1)}\n\nStep 2: Add the components\n  ${(maths/2).toFixed(1)} + ${(physics/4).toFixed(1)} + ${(chemistry/4).toFixed(1)} = ${result.tneaCutoff100} / 100\n\nStep 3: Scale to 200\n  ${result.tneaCutoff100} × 2 = ${result.tneaCutoff} / 200\n\n⚠️ Only Maths + Physics + Chemistry marks used.\n   Biology marks are NOT counted for Engineering.`;
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

  // Determine which cutoff band the student falls into
  const getUserCutoffBand = () => {
    if (!result.tneaCutoff) return null;
    const c = result.tneaCutoff;
    if (c >= 195) return 0;
    if (c >= 185) return 1;
    if (c >= 170) return 2;
    if (c >= 150) return 3;
    if (c >= 120) return 4;
    return null;
  };

  const userBand = getUserCutoffBand();

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

      {/* ─── BIO-MATHS WARNING ─── */}
      {showTNEA && (group === '103' || group === '104') && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-4 mb-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h4 className="font-bold text-red-800 text-sm mb-1">
                Bio-Maths Student — Important Notice!
              </h4>
              <p className="text-xs text-red-700">
                Engineering counselling uses <strong>only Physics + Chemistry + Maths</strong> marks. Your Biology / Bio-Chemistry marks are <strong>NOT counted</strong> for TNEA cutoff calculation. However, you are eligible for both Engineering AND Medical pathways.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── SCORE CARDS ─── */}
      <div className={`grid ${showTNEA && result.tneaCutoff ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'} gap-2 md:gap-4 mb-6`}>
        {showTNEA && result.tneaCutoff100 && (
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg md:rounded-xl p-2 md:p-4 text-center border border-indigo-200">
            <div className="text-[10px] md:text-sm text-indigo-600 font-medium">Cutoff</div>
            <div className="text-xl md:text-3xl font-bold text-indigo-700">{animatedCutoff100}</div>
            <div className="text-[9px] md:text-sm text-indigo-500">/100</div>
            <Progress value={animatedCutoff100} className="h-1.5 mt-1.5 bg-indigo-200" />
          </div>
        )}
        {showTNEA && result.tneaCutoff && (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg md:rounded-xl p-2 md:p-4 text-center border border-blue-200">
            <div className="text-[10px] md:text-sm text-blue-600 font-medium">TNEA Scale</div>
            <div className="text-xl md:text-3xl font-bold text-blue-700">{animatedCutoff}</div>
            <div className="text-[9px] md:text-sm text-blue-500">/200</div>
            <Progress value={(animatedCutoff / 200) * 100} className="h-1.5 mt-1.5 bg-blue-200" />
          </div>
        )}

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg md:rounded-xl p-2 md:p-4 text-center border border-green-200">
          <div className="text-[10px] md:text-sm text-green-600 font-medium">
            {(groupCategory === 'commerce' || groupCategory === 'arts') ? 'Score' : 'Overall'}
          </div>
          <div className="text-xl md:text-3xl font-bold text-green-700">{animatedPercentage}%</div>
          <Progress value={animatedPercentage} className="h-1.5 mt-1.5 bg-green-200" />
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg md:rounded-xl p-2 md:p-4 text-center border border-purple-200">
          <div className="text-[10px] md:text-sm text-purple-600 font-medium">Rank</div>
          <div className="text-xl md:text-3xl font-bold text-purple-700">{animatedPercentile}th</div>
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

      {/* ─── CUTOFF RANGE GUIDE (Engineering only) ─── */}
      {showTNEA && result.tneaCutoff && (
        <div className="mt-5 rounded-xl border-2 border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-2.5">
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
              📊 Previous Year Cutoff Range — Where Do You Stand?
            </h4>
            <p className="text-gray-300 text-xs font-tamil">கடந்த ஆண்டு கட்ஆஃப் அடிப்படையில் உங்கள் நிலை</p>
          </div>
          <div className="p-3 bg-white space-y-2">
            {cutoffRanges.map((band, idx) => (
              <div
                key={idx}
                className={`rounded-lg border-2 p-3 transition-all ${band.color} ${userBand === idx ? 'ring-2 ring-offset-1 ring-gray-400 scale-[1.02]' : 'opacity-80'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">{band.label}</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 bg-white/60 rounded">{band.range}</span>
                </div>
                <p className="text-xs">{band.colleges}</p>
                {userBand === idx && (
                  <div className="mt-2 text-xs font-bold flex items-center gap-1">
                    👉 You are here! Your cutoff: {result.tneaCutoff}/200
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TNEA COUNSELLING PROCESS TIMELINE ─── */}
      {showTNEA && result.tneaCutoff && (
        <div className="mt-5 rounded-xl border-2 border-emerald-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-2.5">
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
              📅 TNEA Counselling Process (Previous Years Pattern)
            </h4>
            <p className="text-emerald-100 text-xs font-tamil">TNEA கலந்தாய்வு செயல்முறை</p>
          </div>
          <div className="p-4 bg-white">
            <div className="relative">
              {[
                { step: '1️⃣', title: 'Application', time: 'May / June', desc: 'Apply online with 12th marks & community certificate' },
                { step: '2️⃣', title: 'Rank List Release', time: 'July', desc: 'TNEA publishes rank list based on cutoff marks' },
                { step: '3️⃣', title: 'Choice Filling', time: 'July / August', desc: 'Select preferred colleges + courses (choose wisely!)' },
                { step: '4️⃣', title: 'Seat Allotment', time: 'August', desc: 'Seats allotted based on cutoff + rank + community' },
                { step: '5️⃣', title: 'College Reporting', time: 'August / September', desc: 'Report to allotted college with documents & fees' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 mb-3 last:mb-0">
                  <span className="text-lg flex-shrink-0">{item.step}</span>
                  <div className="flex-1 pb-3 border-b last:border-b-0 border-gray-100">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-gray-800">{item.title}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">{item.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2.5 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-800">
                <strong>💡 Note:</strong> Usually 4 rounds of counselling happen. If you don't get a seat in Round 1, you can try in subsequent rounds. Cutoffs may reduce in later rounds.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── COLLEGE SELECTION STRATEGY ─── */}
      {showTNEA && result.tneaCutoff && (
        <div className="mt-5 rounded-xl border-2 border-violet-200 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-purple-700 px-4 py-2.5">
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
              🎯 Smart College Selection Strategy
            </h4>
            <p className="text-violet-100 text-xs font-tamil">கல்லூரி தேர்வு உத்தி — Dream, Safe, Backup</p>
          </div>
          <div className="p-4 bg-white space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Dream */}
              <div className="rounded-xl border-2 border-blue-300 bg-blue-50/50 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🎯</span>
                  <span className="font-bold text-blue-800 text-sm">DREAM COLLEGES</span>
                </div>
                <p className="text-xs text-blue-700 mb-2">Score close to or slightly below cutoff. Worth trying — aim high!</p>
                <div className="bg-white rounded-lg p-2 border border-blue-200">
                  <p className="text-[10px] text-gray-600">
                    Your cutoff: <strong>{result.tneaCutoff}</strong> → Target colleges with cutoff <strong>{Math.min(200, result.tneaCutoff + 5)} – {Math.min(200, result.tneaCutoff + 10)}</strong>
                  </p>
                </div>
              </div>
              {/* Safe */}
              <div className="rounded-xl border-2 border-green-300 bg-green-50/50 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">✅</span>
                  <span className="font-bold text-green-800 text-sm">SAFE COLLEGES</span>
                </div>
                <p className="text-xs text-green-700 mb-2">Score higher than cutoff. Very good chance of getting in.</p>
                <div className="bg-white rounded-lg p-2 border border-green-200">
                  <p className="text-[10px] text-gray-600">
                    Your cutoff: <strong>{result.tneaCutoff}</strong> → Target colleges with cutoff <strong>{Math.max(0, result.tneaCutoff - 10)} – {result.tneaCutoff}</strong>
                  </p>
                </div>
              </div>
              {/* Backup */}
              <div className="rounded-xl border-2 border-orange-300 bg-orange-50/50 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🛡️</span>
                  <span className="font-bold text-orange-800 text-sm">BACKUP COLLEGES</span>
                </div>
                <p className="text-xs text-orange-700 mb-2">Score much higher. Guaranteed — use as safety net.</p>
                <div className="bg-white rounded-lg p-2 border border-orange-200">
                  <p className="text-[10px] text-gray-600">
                    Your cutoff: <strong>{result.tneaCutoff}</strong> → Target colleges with cutoff <strong>&lt; {Math.max(0, result.tneaCutoff - 15)}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-violet-50 rounded-lg border border-violet-200">
              <p className="text-xs text-violet-800">
                <strong>💡 Pro Tip:</strong> During TNEA choice filling, list <strong>3–4 Dream</strong> colleges first, then <strong>5–6 Safe</strong> colleges, and keep <strong>3–4 Backup</strong> options at the bottom. This maximizes your chance of getting the best possible college.
              </p>
            </div>

            {/* Bio branch info */}
            <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
              <p className="text-xs text-teal-800">
                <strong>🧬 Bio-Related Branches (BioTech / Biomedical):</strong> These branches have much lower cutoffs (~150–175) compared to CSE/ECE (190+). If you're a Bio+Maths student, these are excellent options at top colleges like PSG Tech, Thiagarajar, CIT, Kumaraguru, and Velammal — you can enter a top-tier college through a Bio branch!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
