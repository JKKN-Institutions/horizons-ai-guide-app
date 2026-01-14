import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Lightbulb, Clock, Target, AlertTriangle, 
  BookOpen, CheckCircle2, XCircle, Brain, Calendar,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { universities } from '@/data/university-entrance-data';

interface TipCategory {
  id: string;
  title: string;
  titleTamil: string;
  icon: React.ReactNode;
  color: string;
  tips: {
    priority: 'high' | 'medium' | 'low';
    tip: string;
    tipTamil: string;
  }[];
}

interface CommonMistake {
  mistake: string;
  mistakeTamil: string;
  solution: string;
  solutionTamil: string;
}

const generalTips: TipCategory[] = [
  {
    id: 'time-management',
    title: 'Time Management',
    titleTamil: 'நேர மேலாண்மை',
    icon: <Clock className="h-5 w-5" />,
    color: 'bg-blue-500',
    tips: [
      { priority: 'high', tip: 'Allocate 1-1.5 minutes per question in objective exams', tipTamil: 'புறநிலை தேர்வுகளில் ஒரு கேள்விக்கு 1-1.5 நிமிடம் ஒதுக்குங்கள்' },
      { priority: 'high', tip: 'Attempt easy questions first to build confidence', tipTamil: 'நம்பிக்கையை வளர்க்க எளிய கேள்விகளை முதலில் எழுதுங்கள்' },
      { priority: 'medium', tip: 'Keep 10-15 minutes for revision at the end', tipTamil: 'முடிவில் திருத்தத்திற்கு 10-15 நிமிடங்கள் வைத்திருங்கள்' },
      { priority: 'medium', tip: 'Don\'t spend more than 2 minutes on any single question', tipTamil: 'ஒரு கேள்வியில் 2 நிமிடங்களுக்கு மேல் செலவழிக்காதீர்கள்' },
      { priority: 'low', tip: 'Practice with a timer during mock tests', tipTamil: 'போலி தேர்வுகளின் போது டைமருடன் பயிற்சி செய்யுங்கள்' },
    ]
  },
  {
    id: 'study-strategy',
    title: 'Study Strategy',
    titleTamil: 'படிப்பு உத்தி',
    icon: <Brain className="h-5 w-5" />,
    color: 'bg-purple-500',
    tips: [
      { priority: 'high', tip: 'Focus on high-weightage topics first', tipTamil: 'அதிக மதிப்பெண் தலைப்புகளில் முதலில் கவனம் செலுத்துங்கள்' },
      { priority: 'high', tip: 'Solve at least 5 years of previous papers', tipTamil: 'குறைந்தது 5 ஆண்டு முந்தைய வினாத்தாள்களை தீர்க்கவும்' },
      { priority: 'high', tip: 'Make short notes for quick revision', tipTamil: 'விரைவான மறுபார்வைக்கு சுருக்கக் குறிப்புகள் எழுதுங்கள்' },
      { priority: 'medium', tip: 'Study in 45-minute focused sessions with breaks', tipTamil: '45 நிமிட கவனமான அமர்வுகளில் இடைவேளைகளுடன் படியுங்கள்' },
      { priority: 'medium', tip: 'Revise formulas and shortcuts daily', tipTamil: 'சூத்திரங்கள் மற்றும் குறுக்குவழிகளை தினமும் மறுபடியுங்கள்' },
    ]
  },
  {
    id: 'exam-day',
    title: 'Exam Day Tips',
    titleTamil: 'தேர்வு நாள் குறிப்புகள்',
    icon: <Calendar className="h-5 w-5" />,
    color: 'bg-green-500',
    tips: [
      { priority: 'high', tip: 'Reach exam center 30 minutes early', tipTamil: 'தேர்வு மையத்திற்கு 30 நிமிடங்கள் முன்னதாக செல்லுங்கள்' },
      { priority: 'high', tip: 'Carry all required documents and admit card', tipTamil: 'அனைத்து தேவையான ஆவணங்கள் மற்றும் அட்மிட் கார்டு எடுத்துச்செல்லுங்கள்' },
      { priority: 'high', tip: 'Read all instructions on the question paper carefully', tipTamil: 'வினாத்தாளில் உள்ள அனைத்து வழிமுறைகளையும் கவனமாக படியுங்கள்' },
      { priority: 'medium', tip: 'Stay calm and take deep breaths if stressed', tipTamil: 'மன அழுத்தம் இருந்தால் அமைதியாக இருங்கள், ஆழமாக சுவாசியுங்கள்' },
      { priority: 'low', tip: 'Don\'t discuss answers with others after the exam', tipTamil: 'தேர்வுக்குப் பிறகு மற்றவர்களுடன் பதில்களை விவாதிக்காதீர்கள்' },
    ]
  },
  {
    id: 'answering-technique',
    title: 'Answering Techniques',
    titleTamil: 'பதில் நுட்பங்கள்',
    icon: <Target className="h-5 w-5" />,
    color: 'bg-orange-500',
    tips: [
      { priority: 'high', tip: 'Eliminate obviously wrong options first', tipTamil: 'முதலில் தெளிவாக தவறான விருப்பங்களை நீக்குங்கள்' },
      { priority: 'high', tip: 'Mark difficult questions and return to them later', tipTamil: 'கடினமான கேள்விகளை குறித்து பின்னர் திரும்பி வாருங்கள்' },
      { priority: 'medium', tip: 'Check for negative marking before guessing', tipTamil: 'ஊகிப்பதற்கு முன் எதிர்மறை மதிப்பெண் உள்ளதா சரிபாருங்கள்' },
      { priority: 'medium', tip: 'Use approximation for complex calculations', tipTamil: 'சிக்கலான கணக்குகளுக்கு தோராயத்தைப் பயன்படுத்துங்கள்' },
      { priority: 'low', tip: 'Trust your first instinct for uncertain answers', tipTamil: 'நிச்சயமற்ற பதில்களுக்கு உங்கள் முதல் உள்ளுணர்வை நம்புங்கள்' },
    ]
  },
];

const commonMistakes: CommonMistake[] = [
  {
    mistake: 'Not reading the question completely',
    mistakeTamil: 'கேள்வியை முழுமையாக படிக்காமல் இருப்பது',
    solution: 'Read each question twice before answering',
    solutionTamil: 'பதிலளிப்பதற்கு முன் ஒவ்வொரு கேள்வியும் இரண்டு முறை படியுங்கள்',
  },
  {
    mistake: 'Spending too much time on difficult questions',
    mistakeTamil: 'கடினமான கேள்விகளில் அதிக நேரம் செலவிடுவது',
    solution: 'Skip and mark for review, complete easy ones first',
    solutionTamil: 'தவிர்த்து மறுபரிசீலனைக்கு குறியுங்கள், எளியவற்றை முதலில் முடியுங்கள்',
  },
  {
    mistake: 'Ignoring negative marking in guessing',
    mistakeTamil: 'ஊகிக்கும்போது எதிர்மறை மதிப்பெண்ணை புறக்கணிப்பது',
    solution: 'Only guess when you can eliminate 2 or more options',
    solutionTamil: '2 அல்லது அதற்கு மேற்பட்ட விருப்பங்களை நீக்க முடியும்போது மட்டுமே ஊகியுங்கள்',
  },
  {
    mistake: 'Not revising before submission',
    mistakeTamil: 'சமர்ப்பிப்பதற்கு முன் மறுபரிசீலனை செய்யாமல் இருப்பது',
    solution: 'Keep last 10-15 minutes for checking answers',
    solutionTamil: 'பதில்களை சரிபார்க்க கடைசி 10-15 நிமிடங்களை வைத்திருங்கள்',
  },
  {
    mistake: 'Panicking when seeing unfamiliar questions',
    mistakeTamil: 'அறிமுகமில்லாத கேள்விகளைப் பார்க்கும்போது பீதியடைவது',
    solution: 'Stay calm, use elimination method, move to next',
    solutionTamil: 'அமைதியாக இருங்கள், நீக்குதல் முறையைப் பயன்படுத்துங்கள், அடுத்ததற்கு செல்லுங்கள்',
  },
  {
    mistake: 'Wrong bubbling/marking on OMR sheet',
    mistakeTamil: 'OMR தாளில் தவறாக குறிப்பது',
    solution: 'Double-check question number before marking answer',
    solutionTamil: 'பதிலைக் குறிப்பதற்கு முன் கேள்வி எண்ணை இரண்டு முறை சரிபாருங்கள்',
  },
];

export const PreparationTips = () => {
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState<string | null>('time-management');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('general');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return '⚡ Must Do';
      case 'medium': return '📌 Important';
      case 'low': return '💡 Good to Know';
      default: return priority;
    }
  };

  // Get university-specific tips
  const getUniversityTips = (universityId: string) => {
    const university = universities.find(u => u.id === universityId);
    if (!university) return [];
    
    // Collect tips from all courses
    const allTips: string[] = [];
    university.courses.forEach(course => {
      allTips.push(...course.tips);
    });
    return [...new Set(allTips)]; // Remove duplicates
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Header */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/career-assessment/colleges')}
          className="gap-2 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Page Title */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Preparation Tips & Strategy
          </h1>
          <p className="text-muted-foreground">
            Expert strategies for TN University Entrance Exams / தேர்வு தந்திரங்கள்
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
            <TabsTrigger 
              value="general" 
              className="gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">General Tips</span>
              <span className="sm:hidden">Tips</span>
            </TabsTrigger>
            <TabsTrigger 
              value="university" 
              className="gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">University-Wise</span>
              <span className="sm:hidden">Specific</span>
            </TabsTrigger>
            <TabsTrigger 
              value="mistakes" 
              className="gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Common Mistakes</span>
              <span className="sm:hidden">Mistakes</span>
            </TabsTrigger>
          </TabsList>

          {/* General Tips Tab */}
          <TabsContent value="general" className="mt-4 space-y-4">
            {generalTips.map((category) => (
              <Card 
                key={category.id}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                  className="w-full"
                >
                  <CardHeader className="p-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${category.color} flex items-center justify-center text-white`}>
                        {category.icon}
                      </div>
                      <div className="text-left">
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <p className="text-sm text-muted-foreground font-tamil">{category.titleTamil}</p>
                      </div>
                    </div>
                    {expandedCategory === category.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </CardHeader>
                </button>

                {expandedCategory === category.id && (
                  <CardContent className="px-4 pb-4 pt-0 space-y-3">
                    {category.tips.map((tip, idx) => (
                      <div 
                        key={idx}
                        className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                      >
                        <div className="flex items-start gap-3">
                          <Badge className={`${getPriorityColor(tip.priority)} shrink-0 text-xs`}>
                            {getPriorityLabel(tip.priority)}
                          </Badge>
                          <div>
                            <p className="text-foreground text-sm">{tip.tip}</p>
                            <p className="text-muted-foreground text-xs mt-1 font-tamil">{tip.tipTamil}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>

          {/* University-Wise Tips Tab */}
          <TabsContent value="university" className="mt-4 space-y-4">
            {/* University Selector */}
            <div className="flex flex-wrap gap-2">
              {universities.map((uni) => (
                <Button
                  key={uni.id}
                  variant={selectedUniversity === uni.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedUniversity(uni.id)}
                  className={selectedUniversity === uni.id ? 'bg-[#6a0dad] hover:bg-[#5a0b9d]' : ''}
                >
                  {uni.examName}
                </Button>
              ))}
            </div>

            {/* University Tips */}
            {selectedUniversity && (
              <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: universities.find(u => u.id === selectedUniversity)?.logoColor || '#6a0dad' }}
                    >
                      {universities.find(u => u.id === selectedUniversity)?.examName.slice(0, 2)}
                    </div>
                    <div>
                      <CardTitle>{universities.find(u => u.id === selectedUniversity)?.name}</CardTitle>
                      <p className="text-sm text-muted-foreground font-tamil">
                        {universities.find(u => u.id === selectedUniversity)?.nameTamil}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getUniversityTips(selectedUniversity).length > 0 ? (
                    getUniversityTips(selectedUniversity).map((tip, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900"
                      >
                        <div className="w-7 h-7 rounded-full bg-[#6a0dad]/10 flex items-center justify-center shrink-0">
                          <span className="text-[#6a0dad] font-bold text-sm">{idx + 1}</span>
                        </div>
                        <p className="text-foreground text-sm">{tip}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">
                      Tips for this university coming soon...
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Common Mistakes Tab */}
          <TabsContent value="mistakes" className="mt-4 space-y-4">
            <Card className="bg-gradient-to-r from-red-50 to-amber-50 dark:from-red-900/20 dark:to-amber-900/20 border-red-200 dark:border-red-800 rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-semibold">Avoid These Common Mistakes!</span>
                </div>
                <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-1">
                  இந்த பொதுவான தவறுகளை தவிர்க்கவும்!
                </p>
              </CardContent>
            </Card>

            {commonMistakes.map((item, idx) => (
              <Card 
                key={idx}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                <CardContent className="p-4 space-y-3">
                  {/* Mistake */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                      <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-red-700 dark:text-red-400 font-medium text-sm">{item.mistake}</p>
                      <p className="text-red-600/70 dark:text-red-400/70 text-xs font-tamil">{item.mistakeTamil}</p>
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="flex items-start gap-3 pl-2 border-l-2 border-green-500">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-green-700 dark:text-green-400 font-medium text-sm">{item.solution}</p>
                      <p className="text-green-600/70 dark:text-green-400/70 text-xs font-tamil">{item.solutionTamil}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
