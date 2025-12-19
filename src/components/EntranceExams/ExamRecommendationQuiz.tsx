import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, ChevronRight, ChevronLeft, RefreshCw, Star, ExternalLink } from 'lucide-react';

type Stream = 'pcm' | 'pcb' | 'pcmb' | 'commerce' | 'arts' | null;
type Interest = string[];
type CareerGoal = string | null;

interface ExamRecommendation {
  name: string;
  priority: 'must' | 'recommended' | 'optional';
  reason: string;
  website?: string;
}

const streamOptions = [
  { id: 'pcm', label: 'PCM (Physics, Chemistry, Maths)', emoji: '⚙️', color: 'bg-blue-100 border-blue-400 text-blue-800' },
  { id: 'pcb', label: 'PCB (Physics, Chemistry, Biology)', emoji: '🧬', color: 'bg-red-100 border-red-400 text-red-800' },
  { id: 'pcmb', label: 'PCMB (Maths + Biology)', emoji: '🔬', color: 'bg-green-100 border-green-400 text-green-800' },
  { id: 'commerce', label: 'Commerce', emoji: '💼', color: 'bg-purple-100 border-purple-400 text-purple-800' },
  { id: 'arts', label: 'Arts / Humanities', emoji: '🎨', color: 'bg-amber-100 border-amber-400 text-amber-800' },
];

const interestOptions: Record<string, { id: string; label: string; labelTamil: string }[]> = {
  pcm: [
    { id: 'software', label: 'Software/IT', labelTamil: 'மென்பொருள்' },
    { id: 'mechanical', label: 'Mechanical/Automobile', labelTamil: 'இயந்திரவியல்' },
    { id: 'civil', label: 'Civil/Construction', labelTamil: 'கட்டுமானம்' },
    { id: 'electrical', label: 'Electrical/Electronics', labelTamil: 'மின்னணு' },
    { id: 'research', label: 'Research/Science', labelTamil: 'ஆராய்ச்சி' },
    { id: 'defence', label: 'Defence/Military', labelTamil: 'பாதுகாப்பு படை' },
  ],
  pcb: [
    { id: 'doctor', label: 'Doctor/MBBS', labelTamil: 'மருத்துவர்' },
    { id: 'nursing', label: 'Nursing/Healthcare', labelTamil: 'செவிலியர்' },
    { id: 'pharmacy', label: 'Pharmacy', labelTamil: 'மருந்தியல்' },
    { id: 'agriculture', label: 'Agriculture/Farming', labelTamil: 'வேளாண்மை' },
    { id: 'veterinary', label: 'Veterinary/Animals', labelTamil: 'கால்நடை' },
    { id: 'research', label: 'Research/Biotech', labelTamil: 'உயிரி தொழில்நுட்பம்' },
  ],
  pcmb: [
    { id: 'doctor', label: 'Doctor/MBBS', labelTamil: 'மருத்துவர்' },
    { id: 'engineering', label: 'Engineering', labelTamil: 'பொறியியல்' },
    { id: 'pharmacy', label: 'Pharmacy', labelTamil: 'மருந்தியல்' },
    { id: 'agriculture', label: 'Agriculture', labelTamil: 'வேளாண்மை' },
    { id: 'research', label: 'Research', labelTamil: 'ஆராய்ச்சி' },
    { id: 'undecided', label: 'Still Exploring', labelTamil: 'இன்னும் முடிவெடுக்கவில்லை' },
  ],
  commerce: [
    { id: 'ca', label: 'Chartered Accountant', labelTamil: 'பட்டய கணக்காளர்' },
    { id: 'business', label: 'Business/Entrepreneur', labelTamil: 'வணிகம்' },
    { id: 'banking', label: 'Banking/Finance', labelTamil: 'வங்கி' },
    { id: 'law', label: 'Law/Legal', labelTamil: 'சட்டம்' },
    { id: 'management', label: 'Management/MBA', labelTamil: 'மேலாண்மை' },
    { id: 'govt', label: 'Government Job', labelTamil: 'அரசு வேலை' },
  ],
  arts: [
    { id: 'law', label: 'Law/Legal', labelTamil: 'சட்டம்' },
    { id: 'design', label: 'Design/Fashion', labelTamil: 'வடிவமைப்பு' },
    { id: 'journalism', label: 'Journalism/Media', labelTamil: 'ஊடகவியல்' },
    { id: 'civil', label: 'Civil Services/IAS', labelTamil: 'குடிமைப் பணி' },
    { id: 'teaching', label: 'Teaching', labelTamil: 'ஆசிரியர்' },
    { id: 'social', label: 'Social Work', labelTamil: 'சமூக சேவை' },
  ],
};

const careerGoalOptions: Record<string, { id: string; label: string }[]> = {
  pcm: [
    { id: 'govt_college', label: '🎓 Govt Engineering College (Low fees)' },
    { id: 'top_iit', label: '🏆 IIT/NIT (Top institutes)' },
    { id: 'private_good', label: '🏫 Good Private College (VIT, SRM, etc.)' },
    { id: 'quick_job', label: '💼 Quick Job after degree' },
    { id: 'higher_studies', label: '📚 Higher Studies/Research' },
  ],
  pcb: [
    { id: 'govt_medical', label: '🏥 Govt Medical College (MBBS)' },
    { id: 'any_medical', label: '🩺 Any Medical Seat (Govt/Private)' },
    { id: 'alternative', label: '🌿 AYUSH/Alternative Medicine' },
    { id: 'paramedical', label: '💉 Nursing/Paramedical' },
    { id: 'agriculture', label: '🌾 Agriculture/Veterinary' },
  ],
  pcmb: [
    { id: 'medical_first', label: '🏥 Medical is priority' },
    { id: 'engineering_first', label: '⚙️ Engineering is priority' },
    { id: 'flexible', label: '🔄 Flexible - best opportunity' },
    { id: 'research', label: '🔬 Pure Sciences/Research' },
  ],
  commerce: [
    { id: 'professional', label: '📊 Professional Degree (CA/CS/CMA)' },
    { id: 'graduation', label: '🎓 Regular Graduation (BBA/B.Com)' },
    { id: 'law', label: '⚖️ Law/Legal career' },
    { id: 'business', label: '🏢 Start own business' },
  ],
  arts: [
    { id: 'competitive', label: '📝 Competitive Exams (UPSC/TNPSC)' },
    { id: 'creative', label: '🎨 Creative/Design field' },
    { id: 'law', label: '⚖️ Law/Legal career' },
    { id: 'teaching', label: '👩‍🏫 Teaching/Academia' },
  ],
};

const getRecommendations = (stream: Stream, interests: Interest, goal: CareerGoal): ExamRecommendation[] => {
  const recommendations: ExamRecommendation[] = [];

  if (stream === 'pcm') {
    recommendations.push({
      name: 'TNEA',
      priority: 'must',
      reason: '100% TN quota, all govt engineering colleges',
      website: 'tneaonline.org'
    });

    if (goal === 'top_iit' || interests.includes('research')) {
      recommendations.push({
        name: 'JEE Main',
        priority: 'must',
        reason: 'Required for NITs, IIITs, and JEE Advanced eligibility',
        website: 'jeemain.nta.ac.in'
      });
      recommendations.push({
        name: 'JEE Advanced',
        priority: 'recommended',
        reason: 'Only way to get into IITs',
        website: 'jeeadv.ac.in'
      });
    } else if (goal === 'private_good') {
      recommendations.push({
        name: 'VITEEE',
        priority: 'must',
        reason: 'VIT is top private - Chennai & Vellore campuses',
        website: 'vit.ac.in'
      });
      recommendations.push({
        name: 'SRMJEEE',
        priority: 'recommended',
        reason: 'SRM Chennai - good placements',
        website: 'srmist.edu.in'
      });
    }

    if (interests.includes('defence')) {
      recommendations.push({
        name: 'NDA',
        priority: 'must',
        reason: 'Only route to join defence after 12th',
        website: 'upsc.gov.in'
      });
    }
  }

  if (stream === 'pcb') {
    recommendations.push({
      name: 'NEET-UG',
      priority: 'must',
      reason: 'ONLY exam for MBBS/BDS - No alternative!',
      website: 'neet.nta.nic.in'
    });

    if (goal === 'agriculture' || interests.includes('agriculture')) {
      recommendations.push({
        name: 'TNAU',
        priority: 'must',
        reason: 'No exam needed! Based on 12th marks only',
        website: 'tnau.ac.in'
      });
    }

    if (interests.includes('veterinary')) {
      recommendations.push({
        name: 'TANUVAS',
        priority: 'recommended',
        reason: 'Through NEET score - Veterinary colleges',
        website: 'tanuvas.ac.in'
      });
    }

    if (interests.includes('nursing') || goal === 'paramedical') {
      recommendations.push({
        name: 'B.Sc Nursing (Direct)',
        priority: 'recommended',
        reason: 'Based on 12th marks - JKKN College available',
        website: 'tnhealth.tn.gov.in'
      });
    }
  }

  if (stream === 'pcmb') {
    recommendations.push({
      name: 'NEET-UG',
      priority: goal === 'medical_first' ? 'must' : 'recommended',
      reason: 'Keep medical option open - you have Biology!',
      website: 'neet.nta.nic.in'
    });
    recommendations.push({
      name: 'TNEA',
      priority: goal === 'engineering_first' ? 'must' : 'recommended',
      reason: 'Engineering backup with your Maths',
      website: 'tneaonline.org'
    });
    recommendations.push({
      name: 'TNAU',
      priority: 'optional',
      reason: 'Agriculture option - No exam, marks based',
      website: 'tnau.ac.in'
    });
  }

  if (stream === 'commerce') {
    if (goal === 'professional' || interests.includes('ca')) {
      recommendations.push({
        name: 'CA Foundation',
        priority: 'must',
        reason: 'Start CA journey right after 12th',
        website: 'icai.org'
      });
      recommendations.push({
        name: 'CS Foundation',
        priority: 'optional',
        reason: 'Company Secretary - can do alongside CA',
        website: 'icsi.edu'
      });
    }

    if (interests.includes('law') || goal === 'law') {
      recommendations.push({
        name: 'CLAT',
        priority: 'must',
        reason: 'For TNNLU Trichy - TN National Law University',
        website: 'consortiumofnlus.ac.in'
      });
    }

    recommendations.push({
      name: 'BBA/B.Com (Direct)',
      priority: 'recommended',
      reason: 'No exam - Direct admission based on 12th marks',
      website: 'Various Universities'
    });
  }

  if (stream === 'arts') {
    if (interests.includes('law') || goal === 'law') {
      recommendations.push({
        name: 'CLAT',
        priority: 'must',
        reason: 'Best path to law - TNNLU Trichy',
        website: 'consortiumofnlus.ac.in'
      });
    }

    if (interests.includes('design')) {
      recommendations.push({
        name: 'NIFT',
        priority: 'must',
        reason: 'NIFT Chennai campus - Fashion Design',
        website: 'nift.ac.in'
      });
      recommendations.push({
        name: 'NID DAT',
        priority: 'recommended',
        reason: 'National Institute of Design',
        website: 'nid.edu'
      });
    }

    if (goal === 'competitive' || interests.includes('civil')) {
      recommendations.push({
        name: 'BA/BSW (Direct)',
        priority: 'must',
        reason: 'Foundation for UPSC/TNPSC preparation',
        website: 'Various Universities'
      });
    }
  }

  return recommendations;
};

export const ExamRecommendationQuiz = () => {
  const [step, setStep] = useState(0);
  const [stream, setStream] = useState<Stream>(null);
  const [interests, setInterests] = useState<Interest>([]);
  const [careerGoal, setCareerGoal] = useState<CareerGoal>(null);
  const [showResults, setShowResults] = useState(false);

  const handleStreamSelect = (selectedStream: Stream) => {
    setStream(selectedStream);
    setInterests([]);
    setCareerGoal(null);
  };

  const handleInterestToggle = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : prev.length < 3 ? [...prev, interest] : prev
    );
  };

  const handleNext = () => {
    if (step === 2) {
      setShowResults(true);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
    } else {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setStream(null);
    setInterests([]);
    setCareerGoal(null);
    setShowResults(false);
  };

  const canProceed = () => {
    if (step === 0) return stream !== null;
    if (step === 1) return interests.length > 0;
    if (step === 2) return careerGoal !== null;
    return false;
  };

  const recommendations = showResults ? getRecommendations(stream, interests, careerGoal) : [];

  return (
    <Card className="bg-gradient-to-br from-[#FFF8E1] to-[#FFFDE7] border-2 border-[#FFD54F] shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-[#B8860B]">
          <HelpCircle className="h-5 w-5" />
          Which Exam Should I Write?
          <span className="text-sm font-normal text-[#6B4423] font-tamil ml-2">(எந்த தேர்வு எழுத வேண்டும்?)</span>
        </CardTitle>
        {!showResults && (
          <div className="flex gap-1 mt-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= step ? 'bg-[#FFB300]' : 'bg-[#FFE082]'
                }`}
              />
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {!showResults ? (
          <div className="space-y-4">
            {/* Step 0: Stream Selection */}
            {step === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-[#5D4037] font-medium">
                  Step 1: What's your 12th stream? <span className="font-tamil">(உங்கள் பிரிவு என்ன?)</span>
                </p>
                <div className="grid gap-2">
                  {streamOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleStreamSelect(option.id as Stream)}
                      className={`p-3 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${
                        stream === option.id
                          ? `${option.color} border-2 shadow-md scale-[1.02]`
                          : 'bg-white border-gray-200 hover:border-[#FFB300] hover:bg-[#FFF8E1]'
                      }`}
                    >
                      <span className="text-xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                      {stream === option.id && <span className="ml-auto text-lg">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Interests */}
            {step === 1 && stream && (
              <div className="space-y-3">
                <p className="text-sm text-[#5D4037] font-medium">
                  Step 2: What interests you? (Select up to 3) <span className="font-tamil">(உங்கள் ஆர்வம்?)</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {interestOptions[stream]?.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleInterestToggle(option.id)}
                      className={`p-2.5 rounded-lg border-2 text-left transition-all text-sm ${
                        interests.includes(option.id)
                          ? 'bg-[#E8F5E9] border-[#4CAF50] text-[#2E7D32] shadow-md'
                          : 'bg-white border-gray-200 hover:border-[#FFB300]'
                      }`}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500 font-tamil">{option.labelTamil}</div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[#8D6E63]">Selected: {interests.length}/3</p>
              </div>
            )}

            {/* Step 2: Career Goal */}
            {step === 2 && stream && (
              <div className="space-y-3">
                <p className="text-sm text-[#5D4037] font-medium">
                  Step 3: What's your goal? <span className="font-tamil">(உங்கள் இலக்கு என்ன?)</span>
                </p>
                <div className="grid gap-2">
                  {careerGoalOptions[stream]?.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setCareerGoal(option.id)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        careerGoal === option.id
                          ? 'bg-[#E3F2FD] border-[#1976D2] text-[#1565C0] shadow-md'
                          : 'bg-white border-gray-200 hover:border-[#FFB300]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                disabled={step === 0}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
              <Button
                size="sm"
                onClick={handleNext}
                disabled={!canProceed()}
                className="gap-1 bg-[#FFB300] hover:bg-[#FFA000] text-[#5D4037]"
              >
                {step === 2 ? 'See Results' : 'Next'} <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          /* Results */
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-3 border border-[#E0E0E0]">
              <p className="text-sm text-[#5D4037]">
                <strong>Your Profile:</strong> {streamOptions.find(s => s.id === stream)?.label}
                {interests.length > 0 && ` → ${interests.join(', ')}`}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-[#1B5E20] flex items-center gap-2">
                <Star className="h-4 w-4 fill-[#FFD54F] text-[#FFD54F]" />
                Recommended Exams for You
                <span className="font-tamil text-xs font-normal">(பரிந்துரைக்கப்பட்ட தேர்வுகள்)</span>
              </h4>

              {recommendations.map((exam, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-l-4 ${
                    exam.priority === 'must'
                      ? 'bg-[#FFEBEE] border-[#D32F2F]'
                      : exam.priority === 'recommended'
                      ? 'bg-[#E3F2FD] border-[#1976D2]'
                      : 'bg-[#F5F5F5] border-[#9E9E9E]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#374151]">{exam.name}</span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            exam.priority === 'must'
                              ? 'bg-[#D32F2F] text-white border-[#D32F2F]'
                              : exam.priority === 'recommended'
                              ? 'bg-[#1976D2] text-white border-[#1976D2]'
                              : 'bg-[#9E9E9E] text-white border-[#9E9E9E]'
                          }`}
                        >
                          {exam.priority === 'must' ? '⭐ MUST WRITE' : exam.priority === 'recommended' ? '👍 Recommended' : 'Optional'}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#5D4037] mt-1">{exam.reason}</p>
                    </div>
                    {exam.website && exam.website !== 'Various Universities' && (
                      <a
                        href={`https://${exam.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1976D2] hover:text-[#1565C0] shrink-0"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {recommendations.length === 0 && (
                <p className="text-center text-[#8D6E63] py-4">
                  No specific recommendations yet. Please complete all steps.
                </p>
              )}
            </div>

            <div className="flex justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Modify Answers
              </Button>
              <Button
                size="sm"
                onClick={handleReset}
                className="gap-1 bg-[#4CAF50] hover:bg-[#43A047] text-white"
              >
                <RefreshCw className="h-4 w-4" /> Start Over
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
