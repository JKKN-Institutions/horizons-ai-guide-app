import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { GroupSelector, groupCategories } from './GroupSelector';
import { MarksEntryForm } from './MarksEntryForm';
import { CategorySelector } from './CategorySelector';
import { CutoffResults } from './CutoffResults';
import { EligibleCourses } from './EligibleCourses';
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

      // Calculate TNEA cutoff for science maths groups (100 series)
      if (isEligibleForTNEA(selectedGroup)) {
        const maths = marks.Mathematics ?? 0;
        const physics = marks.Physics ?? 0;
        const chemistry = marks.Chemistry ?? 0;
        tneaCutoff = maths + (physics / 2) + (chemistry / 2);
        tneaCutoff = Math.round(tneaCutoff * 10) / 10;
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
        overallPercentage,
        percentile,
        neetScore: marks.neet ?? undefined,
      });

      setIsCalculating(false);
    }, 800);
  };

  const canCalculate = () => {
    if (!selectedGroup) return false;
    
    // Get subjects for the selected group
    let requiredSubjects: string[] = [];
    for (const cat of groupCategories) {
      const group = cat.groups.find(g => g.id === selectedGroup);
      if (group) {
        requiredSubjects = group.subjects;
        break;
      }
    }

    // Check if at least 3 core subjects are filled
    const filledSubjects = requiredSubjects.filter(
      subject => marks[subject] !== null && marks[subject] !== undefined
    );
    return filledSubjects.length >= 3;
  };

  return (
    <div className="space-y-8">
      {/* Premium Header Section */}
      <div className="fresh-page-header rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">EduCutoff - Universal Eligibility Calculator</h2>
          </div>
          <p className="text-fresh-gold-medium text-lg mb-1 font-tamil">கல்வி கட்ஆஃப் - அனைத்து மாணவர்களுக்கும்</p>
          <p className="text-white/90 text-sm mb-6">
            Calculate your cutoff & discover courses you're eligible for
          </p>
          <p className="text-white/80 text-sm font-tamil">
            உங்கள் தகுதியை கணக்கிட்டு சரியான படிப்பை கண்டறியுங்கள்
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="fresh-card p-4 text-center">
              <GraduationCap className="h-6 w-6 mx-auto mb-2 text-fresh-gold-dark" />
              <div className="text-2xl font-bold text-fresh-green-dark">1000+</div>
              <div className="text-xs fresh-muted">Colleges</div>
            </div>
            <div className="fresh-card p-4 text-center">
              <Building2 className="h-6 w-6 mx-auto mb-2 text-fresh-gold-dark" />
              <div className="text-2xl font-bold text-fresh-green-dark">200+</div>
              <div className="text-xs fresh-muted">Courses</div>
            </div>
            <div className="fresh-card p-4 text-center">
              <MapPin className="h-6 w-6 mx-auto mb-2 text-fresh-gold-dark" />
              <div className="text-2xl font-bold text-fresh-green-dark">38</div>
              <div className="text-xs fresh-muted">Districts</div>
            </div>
            <div className="fresh-card p-4 text-center">
              <CheckCircle className="h-6 w-6 mx-auto mb-2 text-fresh-gold-dark" />
              <div className="text-2xl font-bold text-fresh-green-dark">All</div>
              <div className="text-xs fresh-muted">Groups</div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1: Group Selection */}
      <div className="fresh-card p-6 rounded-2xl">
        <GroupSelector selectedGroup={selectedGroup} onSelectGroup={setSelectedGroup} />
      </div>

      {/* Step 2: Marks Entry */}
      {selectedGroup && (
        <div className="fresh-card p-6 rounded-2xl">
          <MarksEntryForm group={selectedGroup} onMarksChange={handleMarksChange} />
        </div>
      )}

      {/* Step 3: Category Selection */}
      {selectedGroup && (
        <div className="fresh-card p-6 rounded-2xl">
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
            className="btn-premium-primary px-12 py-6 text-lg rounded-full"
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
