import React, { useState } from 'react';
import { Target, Flame, Clock, TrendingUp, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface HighYieldTopicsProps {
  language: 'en' | 'ta';
}

interface TopicData {
  name: string;
  nameTa: string;
  subject: string;
  subjectTa: string;
  frequency: number; // % of questions from this topic
  effort: 'low' | 'medium' | 'high'; // Time to master
  roi: number; // 1-5 score
  avgQuestions: number;
  keyAreas: string[];
}

interface ExamData {
  id: string;
  name: string;
  topics: TopicData[];
}

const highYieldData: ExamData[] = [
  {
    id: 'neet',
    name: 'NEET UG',
    topics: [
      { name: 'Human Physiology', nameTa: 'மனித உடலியல்', subject: 'Biology', subjectTa: 'உயிரியல்', frequency: 20, effort: 'medium', roi: 5, avgQuestions: 18, keyAreas: ['Digestive System', 'Excretory System', 'Neural Control'] },
      { name: 'Genetics & Molecular Biology', nameTa: 'மரபியல் & மூலக்கூறு உயிரியல்', subject: 'Biology', subjectTa: 'உயிரியல்', frequency: 16, effort: 'medium', roi: 5, avgQuestions: 14, keyAreas: ['Mendelian Genetics', 'DNA Replication', 'Transcription'] },
      { name: 'Organic Chemistry Reactions', nameTa: 'கரிம வேதியியல் வினைகள்', subject: 'Chemistry', subjectTa: 'வேதியியல்', frequency: 14, effort: 'high', roi: 4, avgQuestions: 12, keyAreas: ['Named Reactions', 'Mechanism', 'Functional Groups'] },
      { name: 'Electrodynamics', nameTa: 'மின்னியக்கவியல்', subject: 'Physics', subjectTa: 'இயற்பியல்', frequency: 12, effort: 'medium', roi: 4, avgQuestions: 10, keyAreas: ['Current Electricity', 'Magnetism', 'EMI'] },
      { name: 'Chemical Bonding', nameTa: 'வேதியியல் பிணைப்பு', subject: 'Chemistry', subjectTa: 'வேதியியல்', frequency: 10, effort: 'low', roi: 5, avgQuestions: 8, keyAreas: ['VSEPR', 'Hybridization', 'MOT Basics'] },
      { name: 'Ecology & Environment', nameTa: 'சூழலியல் & சுற்றுச்சூழல்', subject: 'Biology', subjectTa: 'உயிரியல்', frequency: 10, effort: 'low', roi: 5, avgQuestions: 9, keyAreas: ['Ecosystem', 'Biodiversity', 'Environmental Issues'] },
      { name: 'Plant Physiology', nameTa: 'தாவர உடலியல்', subject: 'Biology', subjectTa: 'உயிரியல்', frequency: 9, effort: 'medium', roi: 4, avgQuestions: 8, keyAreas: ['Photosynthesis', 'Respiration', 'Plant Hormones'] },
      { name: 'Mechanics', nameTa: 'இயக்கவியல்', subject: 'Physics', subjectTa: 'இயற்பியல்', frequency: 8, effort: 'high', roi: 3, avgQuestions: 7, keyAreas: ['Newton\'s Laws', 'Rotational Motion', 'Work-Energy'] },
    ]
  },
  {
    id: 'jee-main',
    name: 'JEE Main',
    topics: [
      { name: 'Calculus', nameTa: 'கால்குலஸ்', subject: 'Mathematics', subjectTa: 'கணிதம்', frequency: 22, effort: 'high', roi: 4, avgQuestions: 8, keyAreas: ['Definite Integrals', 'Differential Equations', 'Applications'] },
      { name: 'Electromagnetism', nameTa: 'மின்காந்தவியல்', subject: 'Physics', subjectTa: 'இயற்பியல்', frequency: 18, effort: 'high', roi: 4, avgQuestions: 6, keyAreas: ['EMI', 'AC Circuits', 'Magnetic Force'] },
      { name: 'Coordinate Geometry', nameTa: 'ஆய வடிவியல்', subject: 'Mathematics', subjectTa: 'கணிதம்', frequency: 15, effort: 'medium', roi: 5, avgQuestions: 5, keyAreas: ['Conic Sections', 'Straight Lines', 'Circles'] },
      { name: 'Organic Chemistry', nameTa: 'கரிம வேதியியல்', subject: 'Chemistry', subjectTa: 'வேதியியல்', frequency: 14, effort: 'high', roi: 4, avgQuestions: 10, keyAreas: ['GOC', 'Reactions', 'Name Reactions'] },
      { name: 'Modern Physics', nameTa: 'நவீன இயற்பியல்', subject: 'Physics', subjectTa: 'இயற்பியல்', frequency: 12, effort: 'low', roi: 5, avgQuestions: 4, keyAreas: ['Photoelectric Effect', 'Atomic Structure', 'Nuclear Physics'] },
      { name: 'Algebra', nameTa: 'இயற்கணிதம்', subject: 'Mathematics', subjectTa: 'கணிதம்', frequency: 12, effort: 'medium', roi: 4, avgQuestions: 4, keyAreas: ['Matrices', 'Complex Numbers', 'P&C'] },
      { name: 'Chemical Equilibrium', nameTa: 'வேதியியல் சமநிலை', subject: 'Chemistry', subjectTa: 'வேதியியல்', frequency: 10, effort: 'medium', roi: 5, avgQuestions: 5, keyAreas: ['Ionic Equilibrium', 'pH', 'Buffers'] },
      { name: 'Thermodynamics', nameTa: 'வெப்பவியக்கவியல்', subject: 'Chemistry', subjectTa: 'வேதியியல்', frequency: 8, effort: 'medium', roi: 4, avgQuestions: 4, keyAreas: ['Enthalpy', 'Entropy', 'Gibbs Energy'] },
    ]
  },
  {
    id: 'jee-advanced',
    name: 'JEE Advanced',
    topics: [
      { name: 'Mechanics (Advanced)', nameTa: 'இயக்கவியல் (மேம்பட்ட)', subject: 'Physics', subjectTa: 'இயற்பியல்', frequency: 20, effort: 'high', roi: 4, avgQuestions: 6, keyAreas: ['Rotation', 'Collisions', 'Constraints'] },
      { name: 'Calculus (Advanced)', nameTa: 'கால்குலஸ் (மேம்பட்ட)', subject: 'Mathematics', subjectTa: 'கணிதம்', frequency: 18, effort: 'high', roi: 4, avgQuestions: 5, keyAreas: ['Multiple Integrals', 'Limits', 'Continuity'] },
      { name: 'Organic Mechanisms', nameTa: 'கரிம பொறிமுறைகள்', subject: 'Chemistry', subjectTa: 'வேதியியல்', frequency: 16, effort: 'high', roi: 5, avgQuestions: 5, keyAreas: ['Stereochemistry', 'Reaction Mechanisms', 'Synthesis'] },
      { name: 'Electromagnetism', nameTa: 'மின்காந்தவியல்', subject: 'Physics', subjectTa: 'இயற்பியல்', frequency: 15, effort: 'high', roi: 4, avgQuestions: 4, keyAreas: ['Complex Circuits', 'Inductance', 'EM Waves'] },
      { name: 'Electrochemistry', nameTa: 'மின்வேதியியல்', subject: 'Chemistry', subjectTa: 'வேதியியல்', frequency: 12, effort: 'medium', roi: 5, avgQuestions: 3, keyAreas: ['Nernst Equation', 'Electrolysis', 'Cells'] },
      { name: 'Algebra & Functions', nameTa: 'இயற்கணிதம் & சார்புகள்', subject: 'Mathematics', subjectTa: 'கணிதம்', frequency: 12, effort: 'medium', roi: 4, avgQuestions: 3, keyAreas: ['Functions', 'Quadratics', 'Inequalities'] },
      { name: 'Coordination Chemistry', nameTa: 'ஒருங்கிணைப்பு வேதியியல்', subject: 'Chemistry', subjectTa: 'வேதியியல்', frequency: 10, effort: 'medium', roi: 4, avgQuestions: 3, keyAreas: ['Isomerism', 'CFT', 'Stability'] },
      { name: 'Optics', nameTa: 'ஒளியியல்', subject: 'Physics', subjectTa: 'இயற்பியல்', frequency: 8, effort: 'medium', roi: 4, avgQuestions: 2, keyAreas: ['Wave Optics', 'Interference', 'Diffraction'] },
    ]
  }
];

const getEffortLabel = (effort: 'low' | 'medium' | 'high', lang: 'en' | 'ta') => {
  const labels = {
    low: { en: 'Quick Win', ta: 'விரைவான வெற்றி' },
    medium: { en: 'Moderate', ta: 'மிதமான' },
    high: { en: 'Deep Study', ta: 'ஆழ்ந்த படிப்பு' }
  };
  return labels[effort][lang];
};

const getEffortColor = (effort: 'low' | 'medium' | 'high') => {
  if (effort === 'low') return 'bg-emerald-600 text-white border-emerald-700';
  if (effort === 'medium') return 'bg-amber-500 text-white border-amber-600';
  return 'bg-rose-600 text-white border-rose-700';
};

const getSubjectColor = (subject: string) => {
  if (subject === 'Physics') return 'bg-blue-600 border-blue-700 text-white';
  if (subject === 'Chemistry') return 'bg-purple-600 border-purple-700 text-white';
  if (subject === 'Biology') return 'bg-green-600 border-green-700 text-white';
  if (subject === 'Mathematics') return 'bg-orange-500 border-orange-600 text-white';
  return 'bg-gray-600 border-gray-700 text-white';
};

export const HighYieldTopics: React.FC<HighYieldTopicsProps> = ({ language }) => {
  const [selectedExam, setSelectedExam] = useState('neet');
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const currentExam = highYieldData.find(e => e.id === selectedExam);

  return (
    <div className="mt-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-rose-500 to-red-600 rounded-lg shadow">
          <Flame className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {language === 'en' ? 'High-Yield Topics' : 'அதிக மதிப்புள்ள தலைப்புகள்'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === 'en' ? 'Must-study chapters with highest ROI' : 'அதிகபட்ச ROI கொண்ட கட்டாய படிப்பு அத்தியாயங்கள்'}
          </p>
        </div>
        <Badge className="ml-auto bg-rose-600 text-white border-rose-700">
          <Target className="w-3 h-3 mr-1" />
          {language === 'en' ? 'Priority List' : 'முன்னுரிமை பட்டியல்'}
        </Badge>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-3 bg-muted/50 border border-border rounded-lg text-xs">
        <span className="font-medium text-foreground">{language === 'en' ? 'Effort Required:' : 'தேவையான முயற்சி:'}</span>
        <span className="flex items-center gap-1.5 text-foreground">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          {language === 'en' ? 'Quick Win (Low)' : 'விரைவான வெற்றி'}
        </span>
        <span className="flex items-center gap-1.5 text-foreground">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          {language === 'en' ? 'Moderate' : 'மிதமான'}
        </span>
        <span className="flex items-center gap-1.5 text-foreground">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          {language === 'en' ? 'Deep Study (High)' : 'ஆழ்ந்த படிப்பு'}
        </span>
      </div>

      {/* Exam Tabs */}
      <Tabs value={selectedExam} onValueChange={setSelectedExam} className="w-full">
        <TabsList className="w-full justify-start bg-muted p-1 rounded-lg mb-6">
          {highYieldData.map(exam => (
            <TabsTrigger 
              key={exam.id} 
              value={exam.id}
              className="flex-1 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              {exam.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {highYieldData.map(exam => (
          <TabsContent key={exam.id} value={exam.id} className="space-y-3">
            {exam.topics.map((topic, idx) => (
              <Card 
                key={idx} 
                className={`border border-border bg-card shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-md ${expandedTopic === topic.name ? 'ring-1 ring-ring' : ''}`}
                onClick={() => setExpandedTopic(expandedTopic === topic.name ? null : topic.name)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-foreground text-sm">
                      {idx + 1}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">
                            {language === 'en' ? topic.name : topic.nameTa}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getSubjectColor(topic.subject)}`}>
                              {language === 'en' ? topic.subject : topic.subjectTa}
                            </Badge>
                            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getEffortColor(topic.effort)}`}>
                              <Clock className="w-2.5 h-2.5 mr-0.5" />
                              {getEffortLabel(topic.effort, language)}
                            </Badge>
                          </div>
                        </div>

                        {/* ROI Score */}
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <div 
                                key={i} 
                                className={`w-1.5 h-4 rounded-sm ${i < topic.roi ? 'bg-emerald-500' : 'bg-muted-foreground/30'}`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-muted-foreground mt-0.5 block">ROI</span>
                        </div>
                      </div>

                      {/* Stats Bar */}
                      <div className="flex items-center gap-4 text-xs text-foreground">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-emerald-500" />
                          <span className="font-medium">{topic.frequency}%</span>
                          <span className="text-muted-foreground">{language === 'en' ? 'frequency' : 'அதிர்வெண்'}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-3 h-3 text-blue-500" />
                          <span className="font-medium">~{topic.avgQuestions}</span>
                          <span className="text-muted-foreground">{language === 'en' ? 'questions' : 'கேள்விகள்'}</span>
                        </span>
                      </div>

                      {/* Frequency Bar */}
                      <div className="mt-2">
                        <Progress value={topic.frequency * 2.5} className="h-1.5" />
                      </div>

                      {/* Expanded Content */}
                      {expandedTopic === topic.name && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-xs font-medium text-foreground mb-2">
                            {language === 'en' ? 'Key Areas to Focus:' : 'கவனம் செலுத்த வேண்டிய முக்கிய பகுதிகள்:'}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {topic.keyAreas.map((area, areaIdx) => (
                              <span 
                                key={areaIdx}
                                className="text-xs bg-muted text-foreground px-2 py-1 rounded-md"
                              >
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Expand Icon */}
                    <ChevronRight className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${expandedTopic === topic.name ? 'rotate-90' : ''}`} />
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Summary Card */}
            <Card className="border-dashed border-2 border-border bg-muted/30 mt-4">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-foreground">
                    {language === 'en' 
                      ? `Focus on these ${exam.topics.length} high-yield topics to cover ~${exam.topics.reduce((sum, t) => sum + t.frequency, 0)}% of typical exam questions`
                      : `வழக்கமான தேர்வு கேள்விகளில் ~${exam.topics.reduce((sum, t) => sum + t.frequency, 0)}% உள்ளடக்க இந்த ${exam.topics.length} உயர்-விளைச்சல் தலைப்புகளில் கவனம் செலுத்துங்கள்`
                    }
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{language === 'en' ? 'Quick Wins:' : 'விரைவான வெற்றிகள்:'} <strong className="text-emerald-600">{exam.topics.filter(t => t.effort === 'low').length}</strong></span>
                    <span>{language === 'en' ? 'High ROI:' : 'உயர் ROI:'} <strong className="text-blue-600">{exam.topics.filter(t => t.roi >= 5).length}</strong></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default HighYieldTopics;
