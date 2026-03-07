import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { GroupSelector, groupCategories } from './GroupSelector';
import { MarksEntryForm } from './MarksEntryForm';
import { CategorySelector } from './CategorySelector';
import { CutoffResults } from './CutoffResults';
import { EligibleCourses } from './EligibleCourses';
import { CollegePredictor } from './CollegePredictor';
import { StudentGroup, Category, CutoffResult, getGroupCategory, isEligibleForTNEA } from './types';
import { Calculator, GraduationCap, Building2, MapPin, CheckCircle } from 'lucide-react';

export const EduCutoff = () => {
  const [selectedGroup, setSelectedGroup] = useState<StudentGroup | null>(null);
  const [marks, setMarks] = useState<Record<string, number | null>>({});
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [additionalOptions, setAdditionalOptions] = useState<string[]>([]);
  const [result, setResult] = useState<CutoffResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleMarksChange = useCallback((newMarks: Record<string, number | null>) => {
    setMarks(newMarks);
    setResult(null);
  }, []);

  const calculateCutoff = () => {
    if (!selectedGroup) return;

    setIsCalculating(true);

    setTimeout(() => {
      let tneaCutoff: number | undefined;
      let overallPercentage = 0;
      let percentile = 0;

      const validMarks = Object.entries(marks)
        .filter(([key, val]) => val !== null && !['tamil', 'english', 'neet'].includes(key))
        .map(([_, val]) => val as number);

      if (validMarks.length > 0) {
        overallPercentage = Math.round((validMarks.reduce((a, b) => a + b, 0) / validMarks.length) * 10) / 10;
      }

      // TNEA Engineering Cutoff Formula:
      // Maths/2 + Physics/4 + Chemistry/4 = out of 100
      // Scaled to 200: multiply by 2
      let tneaCutoff100: number | undefined;
      if (isEligibleForTNEA(selectedGroup)) {
        const maths = marks.Mathematics ?? 0;
        const physics = marks.Physics ?? 0;
        const chemistry = marks.Chemistry ?? 0;
        tneaCutoff100 = (maths / 2) + (physics / 4) + (chemistry / 4);
        tneaCutoff100 = Math.round(tneaCutoff100 * 10) / 10;
        tneaCutoff = Math.round(tneaCutoff100 * 2 * 10) / 10;
      }

      if (overallPercentage >= 95) percentile = 99;
      else if (overallPercentage >= 90) percentile = 95;
      else if (overallPercentage >= 85) percentile = 90;
      else if (overallPercentage >= 80) percentile = 85;
      else if (overallPercentage >= 75) percentile = 75;
      else if (overallPercentage >= 70) percentile = 65;
      else if (overallPercentage >= 60) percentile = 50;
      else if (overallPercentage >= 50) percentile = 35;
      else percentile = 20;

      setResult({
        tneaCutoff,
        tneaCutoff100,
        overallPercentage,
        percentile,
        neetScore: marks.neet ?? undefined,
      });

      setIsCalculating(false);
    }, 800);
  };

  const canCalculate = () => {
    if (!selectedGroup) return false;
    
    const category = getGroupCategory(selectedGroup);
    
    // For engineering groups: specifically require Maths + Physics + Chemistry
    if (isEligibleForTNEA(selectedGroup)) {
      return marks.Mathematics != null && marks.Physics != null && marks.Chemistry != null;
    }
    
    // For other groups: at least 3 out of 4 subjects filled
    let requiredSubjects: string[] = [];
    for (const cat of groupCategories) {
      const group = cat.groups.find(g => g.id === selectedGroup);
      if (group) {
        requiredSubjects = group.subjects;
        break;
      }
    }
    const filledSubjects = requiredSubjects.filter(
      subject => marks[subject] !== null && marks[subject] !== undefined
    );
    return filledSubjects.length >= 3;
  };

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Premium Header Section */}
      <div className="fresh-page-header rounded-xl md:rounded-2xl p-4 md:p-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Calculator className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <h2 className="text-base md:text-2xl lg:text-3xl font-serif font-bold text-white">Cutoff & College Predictor</h2>
          </div>
          <p className="text-fresh-gold-medium text-sm md:text-lg mb-1 font-tamil">கல்வி கட்ஆஃப் - அனைத்து மாணவர்களுக்கும்</p>
          <p className="text-white/90 text-xs md:text-sm mb-4 md:mb-6">
            Calculate your cutoff & discover courses you're eligible for
          </p>

          <div className="grid grid-cols-4 gap-1.5 md:gap-4 mt-4 md:mt-6">
            <div className="bg-white rounded-lg p-1.5 md:p-4 text-center shadow-sm border border-green-100">
              <GraduationCap className="h-4 w-4 md:h-6 md:w-6 mx-auto mb-0.5 md:mb-2 text-fresh-gold-dark" />
              <div className="text-sm md:text-2xl font-bold text-fresh-green-dark">1000+</div>
              <div className="text-[8px] md:text-xs text-gray-500">Colleges</div>
            </div>
            <div className="bg-white rounded-lg p-1.5 md:p-4 text-center shadow-sm border border-green-100">
              <Building2 className="h-4 w-4 md:h-6 md:w-6 mx-auto mb-0.5 md:mb-2 text-fresh-gold-dark" />
              <div className="text-sm md:text-2xl font-bold text-fresh-green-dark">200+</div>
              <div className="text-[8px] md:text-xs text-gray-500">Courses</div>
            </div>
            <div className="bg-white rounded-lg p-1.5 md:p-4 text-center shadow-sm border border-green-100">
              <MapPin className="h-4 w-4 md:h-6 md:w-6 mx-auto mb-0.5 md:mb-2 text-fresh-gold-dark" />
              <div className="text-sm md:text-2xl font-bold text-fresh-green-dark">38</div>
              <div className="text-[8px] md:text-xs text-gray-500">Districts</div>
            </div>
            <div className="bg-white rounded-lg p-1.5 md:p-4 text-center shadow-sm border border-green-100">
              <CheckCircle className="h-4 w-4 md:h-6 md:w-6 mx-auto mb-0.5 md:mb-2 text-fresh-gold-dark" />
              <div className="text-sm md:text-2xl font-bold text-fresh-green-dark">All</div>
              <div className="text-[8px] md:text-xs text-gray-500">Groups</div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CLEAR CUTOFF EXPLANATION BANNER ─── */}
      <div className="rounded-xl md:rounded-2xl overflow-hidden border-2 border-emerald-200">
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 px-4 py-2 md:px-6 md:py-3">
          <h3 className="text-white font-bold text-xs md:text-base flex items-center gap-2">💡 Who Needs Cutoff?</h3>
        </div>
        <div className="bg-white p-3 md:p-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            {/* Cutoff Required */}
            <div className="border-2 border-blue-200 rounded-xl p-3 md:p-4 bg-blue-50/50">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <span className="bg-blue-600 text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full">CUTOFF REQUIRED</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">1.</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">Engineering (B.E / B.Tech) - TNEA</p>
                    <p className="text-xs text-gray-500">Cutoff = Maths/2 + Physics/4 + Chemistry/4 = Out of 100 → ×2 = Out of 200</p>
                    <p className="text-xs text-gray-500">Groups: 100 Series (101-106) & Bio-Maths (103, 104)</p>
                    <p className="text-xs text-red-500 font-medium mt-0.5">⚠️ Only PCM marks used. Biology NOT counted for Engineering cutoff.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">2.</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">Medical (MBBS / BDS) - NEET</p>
                    <p className="text-xs text-gray-500">NEET Score required (Out of 720) + Min 50% in PCB</p>
                    <p className="text-xs text-gray-500">Groups: 200 Series (201-208) & 103, 104</p>
                  </div>
                </div>
              </div>
            </div>
            {/* No Cutoff */}
            <div className="border-2 border-green-200 rounded-xl p-3 md:p-4 bg-green-50/50">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <span className="bg-green-600 text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full">NO CUTOFF NEEDED</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">1.</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">Arts / Humanities Courses (BA, BLit, etc.)</p>
                    <p className="text-xs text-gray-500">Admission based on 12th mark percentage only</p>
                    <p className="text-xs text-gray-500">Groups: 400 Series (401-406)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">2.</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">Commerce Courses (B.Com, BBA, CA, etc.)</p>
                    <p className="text-xs text-gray-500">Admission based on 12th mark percentage only</p>
                    <p className="text-xs text-gray-500">Groups: 300 Series (301-308)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">3.</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">B.Sc / Nursing / Agriculture / B.Pharm</p>
                    <p className="text-xs text-gray-500">Admission based on 12th mark percentage + entrance (if any)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">Select your group below to calculate your eligibility score</p>
        </div>
      </div>

      {/* Step 1: Group Selection */}
      <div className="fresh-card p-4 md:p-6 rounded-xl md:rounded-2xl">
        <GroupSelector selectedGroup={selectedGroup} onSelectGroup={setSelectedGroup} />
      </div>

      {/* Step 2: Marks Entry */}
      {selectedGroup && (
        <div className="fresh-card p-4 md:p-6 rounded-xl md:rounded-2xl">
          <MarksEntryForm group={selectedGroup} onMarksChange={handleMarksChange} />
        </div>
      )}

      {/* Step 3: Category Selection */}
      {selectedGroup && (
        <div className="fresh-card p-4 md:p-6 rounded-xl md:rounded-2xl">
          <CategorySelector
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            additionalOptions={additionalOptions}
            onAdditionalOptionsChange={setAdditionalOptions}
          />
        </div>
      )}

      {/* Calculate Button */}
      {selectedGroup && (
        <div className="flex justify-center">
          <Button
            size="lg"
            className="btn-premium-primary w-full md:w-auto px-8 md:px-12 py-4 md:py-6 text-base md:text-lg rounded-xl md:rounded-full"
            onClick={calculateCutoff}
            disabled={!canCalculate() || isCalculating}
          >
            {isCalculating ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Calculating...
              </>
            ) : (
              <>
                🧮 Calculate Eligibility
              </>
            )}
          </Button>
        </div>
      )}

      {/* Results Section */}
      {result && selectedGroup && (
        <>
          <CutoffResults result={result} group={selectedGroup} marks={marks} category={selectedCategory || undefined} />
          <EligibleCourses
            group={selectedGroup}
            cutoffScore={result.tneaCutoff ?? 0}
            percentage={result.overallPercentage}
            neetScore={result.neetScore}
          />
          {/* College Predictor — shows predicted colleges based on cutoff */}
          {isEligibleForTNEA(selectedGroup) && result.tneaCutoff && (
            <CollegePredictor
              cutoffScore={result.tneaCutoff}
              categoryCode={selectedCategory || 'OC'}
            />
          )}
        </>
      )}
    </div>
  );
};
