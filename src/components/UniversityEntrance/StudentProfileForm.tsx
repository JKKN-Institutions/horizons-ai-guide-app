import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, Calculator, GraduationCap, User, BookOpen } from 'lucide-react';
import {
  Stream,
  Community,
  StudentMarks,
  StudentProfile,
  calculateEngineeringCutoff,
  calculateMedicalCutoff,
  calculateTotalMarks,
  hasPassedAllSubjects,
  communityLabels,
  streamLabels,
} from './eligibilityTypes';

interface StudentProfileFormProps {
  onProfileComplete: (profile: StudentProfile) => void;
}

const scienceSubjects = [
  { key: 'maths', label: 'Mathematics', labelTamil: 'கணிதம்', icon: '📘', forPCM: true, forPCB: false },
  { key: 'physics', label: 'Physics', labelTamil: 'இயற்பியல்', icon: '📗', forPCM: true, forPCB: true },
  { key: 'chemistry', label: 'Chemistry', labelTamil: 'வேதியியல்', icon: '📕', forPCM: true, forPCB: true },
  { key: 'biology', label: 'Biology', labelTamil: 'உயிரியல்', icon: '🧬', forPCM: false, forPCB: true },
];

const commerceSubjects = [
  { key: 'accountancy', label: 'Accountancy', labelTamil: 'கணக்கியல்', icon: '📊' },
  { key: 'businessStudies', label: 'Business Studies', labelTamil: 'வணிகவியல்', icon: '📈' },
  { key: 'economics', label: 'Economics', labelTamil: 'பொருளியல்', icon: '📉' },
];

const languageSubjects = [
  { key: 'tamil', label: 'Tamil', labelTamil: 'தமிழ்', icon: '📙' },
  { key: 'english', label: 'English', labelTamil: 'ஆங்கிலம்', icon: '📓' },
];

export const StudentProfileForm = ({ onProfileComplete }: StudentProfileFormProps) => {
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [marks, setMarks] = useState<StudentMarks>({});
  const [scienceType, setScienceType] = useState<'PCM' | 'PCB' | 'PCMB'>('PCM');
  const [isCalculating, setIsCalculating] = useState(false);

  // Reset marks when stream changes
  useEffect(() => {
    setMarks({});
  }, [selectedStream]);

  const handleMarkChange = (key: string, value: string) => {
    const numValue = value === '' ? undefined : Math.min(100, Math.max(0, parseInt(value) || 0));
    setMarks(prev => ({ ...prev, [key]: numValue }));
  };

  const isValidMark = (value: number | undefined) => value !== undefined && value >= 0 && value <= 100;
  const isPassingMark = (value: number | undefined) => value !== undefined && value >= 35;

  const getRequiredSubjects = (): string[] => {
    if (selectedStream === 'Science') {
      if (scienceType === 'PCM') return ['maths', 'physics', 'chemistry'];
      if (scienceType === 'PCB') return ['physics', 'chemistry', 'biology'];
      return ['maths', 'physics', 'chemistry', 'biology'];
    }
    if (selectedStream === 'Commerce') return ['accountancy', 'businessStudies', 'economics'];
    return [];
  };

  const canCalculate = (): boolean => {
    if (!selectedStream || !selectedCommunity) return false;
    const required = getRequiredSubjects();
    return required.every(sub => marks[sub] !== undefined && marks[sub]! >= 0);
  };

  const handleCalculate = () => {
    if (!selectedStream || !selectedCommunity) return;

    setIsCalculating(true);

    setTimeout(() => {
      const profile: StudentProfile = {
        marks,
        community: selectedCommunity,
        stream: selectedStream,
        totalMarks: calculateTotalMarks(marks),
        engineeringCutoff: calculateEngineeringCutoff(marks),
        medicalCutoff: calculateMedicalCutoff(marks),
      };

      onProfileComplete(profile);
      setIsCalculating(false);
    }, 800);
  };

  const renderMarkInput = (key: string, label: string, labelTamil: string, icon: string) => (
    <div className="space-y-2" key={key}>
      <Label className="text-sm font-medium flex items-center gap-2">
        <span>{icon}</span> {label}
        <span className="text-xs text-muted-foreground font-tamil">({labelTamil})</span>
      </Label>
      <div className="relative">
        <Input
          type="number"
          min={0}
          max={100}
          placeholder="/100"
          value={marks[key] ?? ''}
          onChange={(e) => handleMarkChange(key, e.target.value)}
          className={cn(
            'text-lg font-semibold pr-10',
            marks[key] !== undefined && (
              isPassingMark(marks[key]) 
                ? 'border-green-500 focus:border-green-500' 
                : 'border-red-500 focus:border-red-500'
            )
          )}
        />
        {marks[key] !== undefined && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isPassingMark(marks[key]) ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Step 1: Select Stream */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Step 1: Select Your 12th Stream</h3>
            <span className="text-sm text-muted-foreground font-tamil">(உங்கள் 12-ஆம் வகுப்பு பிரிவு)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(Object.keys(streamLabels) as Stream[]).map((stream) => {
              const isSelected = selectedStream === stream;
              const { en, ta, icon } = streamLabels[stream];
              return (
                <motion.button
                  key={stream}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedStream(stream)}
                  className={cn(
                    'p-4 rounded-xl border-2 text-left transition-all',
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{icon}</span>
                    <div>
                      <p className="font-semibold">{en}</p>
                      <p className="text-sm text-muted-foreground font-tamil">{ta}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <Badge className="mt-2" variant="default">Selected ✓</Badge>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Science Type Selector */}
          {selectedStream === 'Science' && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <Label className="text-sm font-medium mb-3 block">Select Science Combination:</Label>
              <div className="flex gap-3 flex-wrap">
                {(['PCM', 'PCB', 'PCMB'] as const).map((type) => (
                  <Button
                    key={type}
                    variant={scienceType === type ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setScienceType(type)}
                  >
                    {type === 'PCM' && '🔬 PCM (Maths)'}
                    {type === 'PCB' && '🧬 PCB (Bio)'}
                    {type === 'PCMB' && '🔬🧬 PCMB (Both)'}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 2: Select Community */}
      {selectedStream && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Step 2: Select Your Community</h3>
                <span className="text-sm text-muted-foreground font-tamil">(உங்கள் சமூகம்)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(Object.keys(communityLabels) as Community[]).map((community) => {
                  const isSelected = selectedCommunity === community;
                  const { en, ta } = communityLabels[community];
                  return (
                    <button
                      key={community}
                      onClick={() => setSelectedCommunity(community)}
                      className={cn(
                        'p-3 rounded-lg border-2 text-left transition-all text-sm',
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <p className="font-semibold">{community}</p>
                      <p className="text-xs text-muted-foreground truncate">{en}</p>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Step 3: Enter Marks */}
      {selectedStream && selectedCommunity && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Step 3: Enter Your 12th Marks</h3>
                <span className="text-sm text-muted-foreground font-tamil">(உங்கள் 12-ஆம் வகுப்பு மதிப்பெண்கள்)</span>
              </div>

              <div className="space-y-6">
                {/* Core Subjects */}
                <div>
                  <Label className="text-sm font-medium text-muted-foreground mb-3 block">
                    CORE SUBJECTS (முக்கிய பாடங்கள்)
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {selectedStream === 'Science' && scienceSubjects
                      .filter(sub => {
                        if (scienceType === 'PCM') return sub.forPCM;
                        if (scienceType === 'PCB') return sub.forPCB;
                        return true; // PCMB shows all
                      })
                      .map(sub => renderMarkInput(sub.key, sub.label, sub.labelTamil, sub.icon))}
                    
                    {selectedStream === 'Commerce' && commerceSubjects.map(sub => 
                      renderMarkInput(sub.key, sub.label, sub.labelTamil, sub.icon)
                    )}
                  </div>
                </div>

                {/* Language Subjects (Optional) */}
                <div>
                  <Label className="text-sm font-medium text-muted-foreground mb-3 block">
                    LANGUAGE SUBJECTS - Optional (மொழி பாடங்கள்)
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {languageSubjects.map(sub => 
                      renderMarkInput(sub.key, sub.label, sub.labelTamil, sub.icon)
                    )}
                  </div>
                </div>

                {/* Cutoff Preview */}
                {selectedStream === 'Science' && (
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg">
                    <p className="text-sm font-medium mb-2">📊 Your Cutoff Preview:</p>
                    <div className="flex gap-6 flex-wrap">
                      {(scienceType === 'PCM' || scienceType === 'PCMB') && (
                        <div>
                          <span className="text-xs text-muted-foreground">Engineering Cutoff (TNEA):</span>
                          <p className="text-xl font-bold text-blue-600">
                            {calculateEngineeringCutoff(marks) || '—'} / 200
                          </p>
                        </div>
                      )}
                      {(scienceType === 'PCB' || scienceType === 'PCMB') && (
                        <div>
                          <span className="text-xs text-muted-foreground">Medical Cutoff:</span>
                          <p className="text-xl font-bold text-green-600">
                            {calculateMedicalCutoff(marks) || '—'} / 200
                          </p>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Formula: Maths + (Physics/2) + (Chemistry/2) for Engineering | Bio + (Physics/2) + (Chemistry/2) for Medical
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Calculate Button */}
      {selectedStream && selectedCommunity && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button
            size="lg"
            className="px-12 py-6 text-lg rounded-full gap-2"
            onClick={handleCalculate}
            disabled={!canCalculate() || isCalculating}
          >
            {isCalculating ? (
              <>
                <span className="animate-spin">⏳</span>
                Calculating Eligibility...
              </>
            ) : (
              <>
                <Calculator className="h-5 w-5" />
                🎯 Find Eligible Universities
              </>
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
};
