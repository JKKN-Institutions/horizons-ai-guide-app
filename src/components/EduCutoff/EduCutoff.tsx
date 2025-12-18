import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { GroupSelector } from './GroupSelector';
import { MarksEntryForm } from './MarksEntryForm';
import { CategorySelector } from './CategorySelector';
import { CutoffResults } from './CutoffResults';
import { EligibleCourses } from './EligibleCourses';
import { StudentGroup, Category, CutoffResult } from './types';
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
    setResult(null); // Reset result when marks change
  }, []);

  const calculateCutoff = () => {
    if (!selectedGroup) return;

    setIsCalculating(true);

    // Simulate calculation delay for animation
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

      // Calculate TNEA cutoff for PCM/PCMB
      if (selectedGroup === 'pcm' || selectedGroup === 'pcmb') {
        const maths = marks.Mathematics ?? 0;
        const physics = marks.Physics ?? 0;
        const chemistry = marks.Chemistry ?? 0;
        tneaCutoff = maths + (physics / 2) + (chemistry / 2);
        tneaCutoff = Math.round(tneaCutoff * 10) / 10;
      }

      // Estimate percentile based on percentage
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
        overallPercentage,
        percentile,
        neetScore: marks.neet ?? undefined,
      });

      setIsCalculating(false);
    }, 800);
  };

  const canCalculate = () => {
    if (!selectedGroup) return false;
    
    // Check if at least core subjects have marks
    const requiredSubjects = {
      pcm: ['Mathematics', 'Physics', 'Chemistry'],
      pcb: ['Physics', 'Chemistry', 'Biology'],
      pcmb: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
      commerce: ['Accountancy', 'Business Studies', 'Economics'],
      arts: [], // Handled separately
      vocational: [], // Handled separately
    };

    if (selectedGroup === 'arts') {
      const artsMarks = Object.entries(marks).filter(([k, v]) => v !== null);
      return artsMarks.length >= 3;
    }

    if (selectedGroup === 'vocational') {
      return marks.theory !== null || marks.practical !== null || marks.overall !== null;
    }

    const required = requiredSubjects[selectedGroup];
    return required.every(subject => marks[subject] !== null && marks[subject] !== undefined);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="h-8 w-8" />
          <h2 className="text-2xl md:text-3xl font-bold">EduCutoff - Universal Eligibility Calculator</h2>
        </div>
        <p className="text-violet-100 text-lg mb-1">கல்வி கட்ஆஃப் - அனைத்து மாணவர்களுக்கும்</p>
        <p className="text-violet-200 text-sm mb-6">
          Calculate your cutoff & discover courses you're eligible for
        </p>
        <p className="text-violet-200 text-sm">
          உங்கள் தகுதியை கணக்கிட்டு சரியான படிப்பை கண்டறியுங்கள்
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <GraduationCap className="h-6 w-6 mx-auto mb-2 text-violet-200" />
            <div className="text-2xl font-bold">1000+</div>
            <div className="text-xs text-violet-200">Colleges</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <Building2 className="h-6 w-6 mx-auto mb-2 text-violet-200" />
            <div className="text-2xl font-bold">200+</div>
            <div className="text-xs text-violet-200">Courses</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <MapPin className="h-6 w-6 mx-auto mb-2 text-violet-200" />
            <div className="text-2xl font-bold">38</div>
            <div className="text-xs text-violet-200">Districts</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <CheckCircle className="h-6 w-6 mx-auto mb-2 text-violet-200" />
            <div className="text-2xl font-bold">All</div>
            <div className="text-xs text-violet-200">Groups</div>
          </div>
        </div>
      </div>

      {/* Step 1: Group Selection */}
      <GroupSelector selectedGroup={selectedGroup} onSelectGroup={setSelectedGroup} />

      {/* Step 2: Marks Entry (shown after group selection) */}
      {selectedGroup && (
        <MarksEntryForm group={selectedGroup} onMarksChange={handleMarksChange} />
      )}

      {/* Step 3: Category Selection (shown after group selection) */}
      {selectedGroup && (
        <CategorySelector
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          additionalOptions={additionalOptions}
          onAdditionalOptionsChange={setAdditionalOptions}
        />
      )}

      {/* Calculate Button */}
      {selectedGroup && (
        <div className="flex justify-center">
          <Button
            size="lg"
            className="px-12 py-6 text-lg bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
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
        </>
      )}
    </div>
  );
};
