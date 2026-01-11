import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Brain, Target, TrendingUp, BookOpen, Clock, Zap,
  AlertTriangle, CheckCircle2, Lightbulb, Calendar,
  ArrowRight, Star, Flame, Award, BarChart3
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useGovtMockTestScores } from '@/hooks/useGovtMockTestScores';

// Subject study resources and strategies
const SUBJECT_STRATEGIES = {
  'General Knowledge': {
    priority: 'high',
    dailyTime: 45,
    resources: [
      { type: 'Daily News', en: 'Read The Hindu or Indian Express daily', ta: 'தினமும் தி இந்து அல்லது இந்தியன் எக்ஸ்பிரஸ் படிக்கவும்' },
      { type: 'Monthly Magazine', en: 'Pratiyogita Darpan or Competition Success Review', ta: 'பிரதியோகிதா தர்பன் அல்லது கம்பிட்டிஷன் சக்சஸ் ரிவியூ' },
      { type: 'YouTube', en: 'Study IQ, Unacademy Static GK', ta: 'ஸ்டடி IQ, அனாகெடமி நிலையான GK' },
    ],
    topics: [
      { en: 'Current Affairs (Last 6 months)', ta: 'நடப்பு நிகழ்வுகள் (கடந்த 6 மாதங்கள்)' },
      { en: 'Static GK - History, Geography, Polity', ta: 'நிலையான GK - வரலாறு, புவியியல், அரசியல்' },
      { en: 'Science & Technology', ta: 'அறிவியல் & தொழில்நுட்பம்' },
    ],
    quickTips: [
      { en: 'Make flashcards for dates and events', ta: 'தேதிகள் மற்றும் நிகழ்வுகளுக்கு ஃபிளாஷ் கார்டுகள் செய்யுங்கள்' },
      { en: 'Practice 20 MCQs daily', ta: 'தினமும் 20 MCQ பயிற்சி செய்யுங்கள்' },
    ],
  },
  'Mathematics': {
    priority: 'high',
    dailyTime: 60,
    resources: [
      { type: 'Book', en: 'RS Aggarwal Quantitative Aptitude', ta: 'RS அகர்வால் குவாண்டிடேட்டிவ் ஆப்டிட்யூட்' },
      { type: 'App', en: 'Gradeup, Adda247 for practice', ta: 'கிரேடப், அடா247 பயிற்சிக்கு' },
      { type: 'YouTube', en: 'Dear Sir, Rakesh Yadav Readers', ta: 'டியர் சார், ராகேஷ் யாதவ் ரீடர்ஸ்' },
    ],
    topics: [
      { en: 'Number System & Simplification', ta: 'எண் அமைப்பு & எளிமைப்படுத்துதல்' },
      { en: 'Percentage, Ratio, Profit & Loss', ta: 'சதவீதம், விகிதம், லாபம் & நஷ்டம்' },
      { en: 'Time, Speed & Distance', ta: 'நேரம், வேகம் & தூரம்' },
      { en: 'Data Interpretation', ta: 'தரவு விளக்கம்' },
    ],
    quickTips: [
      { en: 'Learn multiplication tables up to 30', ta: '30 வரை பெருக்கல் வாய்ப்பாடுகளைக் கற்றுக்கொள்ளுங்கள்' },
      { en: 'Practice mental math daily', ta: 'தினமும் மனக்கணக்கு பயிற்சி செய்யுங்கள்' },
      { en: 'Time yourself while solving', ta: 'தீர்வு காணும்போது நேரத்தை அளவிடுங்கள்' },
    ],
  },
  'Reasoning': {
    priority: 'high',
    dailyTime: 45,
    resources: [
      { type: 'Book', en: 'RS Aggarwal Verbal & Non-Verbal Reasoning', ta: 'RS அகர்வால் வெர்பல் & நான்-வெர்பல் ரீசனிங்' },
      { type: 'App', en: 'LogiQ by Testbook', ta: 'டெஸ்ட்புக் மூலம் லாஜிக்' },
      { type: 'YouTube', en: 'Reasoning by Ashish Sir', ta: 'அஷிஷ் சார் மூலம் ரீசனிங்' },
    ],
    topics: [
      { en: 'Coding-Decoding & Series', ta: 'குறியீடு-குறியீட்டு & தொடர்' },
      { en: 'Blood Relations & Direction', ta: 'இரத்த உறவுகள் & திசை' },
      { en: 'Syllogism & Puzzles', ta: 'சிலோஜிசம் & புதிர்கள்' },
      { en: 'Seating Arrangement', ta: 'அமர்வு ஏற்பாடு' },
    ],
    quickTips: [
      { en: 'Draw diagrams for puzzles', ta: 'புதிர்களுக்கு வரைபடங்கள் வரையுங்கள்' },
      { en: 'Practice pattern recognition', ta: 'மாதிரி அங்கீகாரத்தை பயிற்சி செய்யுங்கள்' },
    ],
  },
  'English': {
    priority: 'medium',
    dailyTime: 30,
    resources: [
      { type: 'Book', en: 'Wren & Martin English Grammar', ta: 'வ்ரென் & மார்ட்டின் ஆங்கில இலக்கணம்' },
      { type: 'App', en: 'Vocabulary.com, Word Power Made Easy', ta: 'Vocabulary.com, வேர்ட் பவர் மேட் ஈஸி' },
      { type: 'Practice', en: 'Daily English newspaper reading', ta: 'தினசரி ஆங்கில செய்தித்தாள் படித்தல்' },
    ],
    topics: [
      { en: 'Grammar Rules & Error Spotting', ta: 'இலக்கண விதிகள் & பிழை கண்டறிதல்' },
      { en: 'Vocabulary & Synonyms', ta: 'சொல்வளம் & ஒத்த சொற்கள்' },
      { en: 'Reading Comprehension', ta: 'படிப்பு புரிதல்' },
      { en: 'Cloze Test & Fill in Blanks', ta: 'க்ளோஸ் டெஸ்ட் & வெற்றிடம் நிரப்புக' },
    ],
    quickTips: [
      { en: 'Learn 10 new words daily', ta: 'தினமும் 10 புதிய வார்த்தைகளைக் கற்றுக்கொள்ளுங்கள்' },
      { en: 'Read editorial sections', ta: 'தலையங்கப் பகுதிகளைப் படிக்கவும்' },
    ],
  },
  'Polity': {
    priority: 'medium',
    dailyTime: 30,
    resources: [
      { type: 'Book', en: 'Indian Polity by M. Laxmikanth', ta: 'எம். லக்ஷ்மிகாந்த் எழுதிய இந்திய அரசியல்' },
      { type: 'YouTube', en: 'Polity by Pawan Sir (PW)', ta: 'பவன் சார் (PW) மூலம் அரசியல்' },
    ],
    topics: [
      { en: 'Indian Constitution - Parts & Schedules', ta: 'இந்திய அரசியலமைப்பு - பகுதிகள் & அட்டவணைகள்' },
      { en: 'Fundamental Rights & Duties', ta: 'அடிப்படை உரிமைகள் & கடமைகள்' },
      { en: 'Parliament & Judiciary', ta: 'நாடாளுமன்றம் & நீதித்துறை' },
    ],
    quickTips: [
      { en: 'Memorize important Articles', ta: 'முக்கிய கட்டுரைகளை மனப்பாடம் செய்யுங்கள்' },
    ],
  },
  'Geography': {
    priority: 'medium',
    dailyTime: 30,
    resources: [
      { type: 'Book', en: 'NCERT Geography Class 11 & 12', ta: 'NCERT புவியியல் வகுப்பு 11 & 12' },
      { type: 'Map', en: 'Practice with blank India maps', ta: 'வெற்று இந்தியா வரைபடங்களுடன் பயிற்சி' },
    ],
    topics: [
      { en: 'Indian Physical Features', ta: 'இந்திய இயற்கை அம்சங்கள்' },
      { en: 'Rivers, Mountains & Climate', ta: 'ஆறுகள், மலைகள் & காலநிலை' },
      { en: 'Agriculture & Industries', ta: 'விவசாயம் & தொழில்கள்' },
    ],
    quickTips: [
      { en: 'Use maps for visual learning', ta: 'காட்சி கற்றலுக்கு வரைபடங்களைப் பயன்படுத்துங்கள்' },
    ],
  },
  'Banking': {
    priority: 'medium',
    dailyTime: 20,
    resources: [
      { type: 'Website', en: 'RBI website, Banking Awareness PDFs', ta: 'RBI இணையதளம், வங்கி விழிப்புணர்வு PDFகள்' },
    ],
    topics: [
      { en: 'RBI Policies & Functions', ta: 'RBI கொள்கைகள் & செயல்பாடுகள்' },
      { en: 'Banking Schemes & Regulations', ta: 'வங்கி திட்டங்கள் & ஒழுங்குமுறைகள்' },
    ],
    quickTips: [
      { en: 'Follow RBI announcements', ta: 'RBI அறிவிப்புகளைப் பின்தொடரவும்' },
    ],
  },
  'Physics': {
    priority: 'low',
    dailyTime: 20,
    resources: [
      { type: 'Book', en: 'NCERT Physics Class 11 & 12', ta: 'NCERT இயற்பியல் வகுப்பு 11 & 12' },
    ],
    topics: [
      { en: 'Basic Concepts & Units', ta: 'அடிப்படை கருத்துகள் & அலகுகள்' },
      { en: 'Motion & Forces', ta: 'இயக்கம் & விசைகள்' },
    ],
    quickTips: [
      { en: 'Focus on formulas and units', ta: 'சூத்திரங்கள் மற்றும் அலகுகளில் கவனம் செலுத்துங்கள்' },
    ],
  },
};

interface SmartStudyRecommendationsProps {
  language?: 'en' | 'ta';
}

export const SmartStudyRecommendations = ({ language: propLanguage }: SmartStudyRecommendationsProps) => {
  const { language: hookLanguage } = useLanguage();
  const language = propLanguage || hookLanguage;
  const { scores, getAveragePercentage, totalAttempts } = useGovtMockTestScores();

  // Analyze subject performance
  const subjectAnalysis = useMemo(() => {
    const subjects: Record<string, { total: number; correct: number; attempts: number }> = {};
    
    scores.forEach(score => {
      Object.entries(score.subjectWise).forEach(([subject, data]) => {
        if (!subjects[subject]) {
          subjects[subject] = { total: 0, correct: 0, attempts: 0 };
        }
        subjects[subject].total += data.total;
        subjects[subject].correct += data.correct;
        subjects[subject].attempts++;
      });
    });

    return Object.entries(subjects)
      .map(([subject, data]) => ({
        subject,
        accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
        total: data.total,
        correct: data.correct,
        attempts: data.attempts,
        strategy: SUBJECT_STRATEGIES[subject as keyof typeof SUBJECT_STRATEGIES],
      }))
      .sort((a, b) => a.accuracy - b.accuracy);
  }, [scores]);

  // Identify weak subjects (accuracy < 50%)
  const weakSubjects = useMemo(() => {
    return subjectAnalysis.filter(s => s.accuracy < 50 && s.total >= 3);
  }, [subjectAnalysis]);

  // Identify moderate subjects (accuracy 50-70%)
  const moderateSubjects = useMemo(() => {
    return subjectAnalysis.filter(s => s.accuracy >= 50 && s.accuracy < 70 && s.total >= 3);
  }, [subjectAnalysis]);

  // Identify strong subjects (accuracy >= 70%)
  const strongSubjects = useMemo(() => {
    return subjectAnalysis.filter(s => s.accuracy >= 70 && s.total >= 3);
  }, [subjectAnalysis]);

  // Generate personalized study plan
  const studyPlan = useMemo(() => {
    const plan: Array<{
      subject: string;
      priority: 'critical' | 'high' | 'medium' | 'maintenance';
      dailyTime: number;
      accuracy: number;
      improvement: string;
      improvementTamil: string;
    }> = [];

    // Critical priority for weak subjects
    weakSubjects.forEach(s => {
      plan.push({
        subject: s.subject,
        priority: 'critical',
        dailyTime: s.strategy?.dailyTime ? s.strategy.dailyTime + 15 : 45,
        accuracy: s.accuracy,
        improvement: `Improve ${s.subject} by focusing on fundamentals`,
        improvementTamil: `அடிப்படைகளில் கவனம் செலுத்தி ${s.subject} மேம்படுத்துங்கள்`,
      });
    });

    // High priority for moderate subjects
    moderateSubjects.forEach(s => {
      plan.push({
        subject: s.subject,
        priority: 'high',
        dailyTime: s.strategy?.dailyTime || 30,
        accuracy: s.accuracy,
        improvement: `Practice more ${s.subject} questions daily`,
        improvementTamil: `தினமும் மேலும் ${s.subject} கேள்விகளை பயிற்சி செய்யுங்கள்`,
      });
    });

    // Maintenance for strong subjects
    strongSubjects.forEach(s => {
      plan.push({
        subject: s.subject,
        priority: 'maintenance',
        dailyTime: Math.max(15, (s.strategy?.dailyTime || 30) - 15),
        accuracy: s.accuracy,
        improvement: `Maintain ${s.subject} with regular practice`,
        improvementTamil: `வழக்கமான பயிற்சியுடன் ${s.subject} பராமரிக்கவும்`,
      });
    });

    return plan.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, maintenance: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [weakSubjects, moderateSubjects, strongSubjects]);

  // Calculate total study time recommendation
  const totalDailyTime = useMemo(() => {
    return studyPlan.reduce((sum, item) => sum + item.dailyTime, 0);
  }, [studyPlan]);

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'maintenance': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityLabel = (priority: string) => {
    const labels = {
      critical: { en: 'Critical', ta: 'முக்கியமான' },
      high: { en: 'High Priority', ta: 'அதிக முன்னுரிமை' },
      medium: { en: 'Medium', ta: 'நடுத்தர' },
      maintenance: { en: 'Maintain', ta: 'பராமரிப்பு' },
    };
    return labels[priority as keyof typeof labels]?.[language] || priority;
  };

  if (totalAttempts === 0) {
    return (
      <Card className="border-2 border-dashed border-purple-300 bg-gradient-to-br from-purple-50/50 to-indigo-50/50">
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
            <Brain className="h-8 w-8 text-purple-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {language === 'ta' ? 'பரிந்துரைகள் இல்லை' : 'No Recommendations Yet'}
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            {language === 'ta' 
              ? 'தனிப்பயனாக்கப்பட்ட படிப்பு பரிந்துரைகளைப் பெற மாக் டெஸ்ட் எடுக்கவும்'
              : 'Take a mock test to get personalized study recommendations'}
          </p>
          <Badge variant="outline" className="gap-2">
            <Lightbulb className="h-3 w-3" />
            {language === 'ta' ? 'AI-இயக்கப்படும் பரிந்துரைகள்' : 'AI-Powered Recommendations'}
          </Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            {language === 'ta' ? 'ஸ்மார்ட் படிப்பு பரிந்துரைகள்' : 'Smart Study Recommendations'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white/80 rounded-lg p-3 text-center">
              <BarChart3 className="h-5 w-5 mx-auto mb-1 text-purple-600" />
              <p className="text-xl font-bold text-purple-700">{getAveragePercentage()}%</p>
              <p className="text-xs text-gray-500">{language === 'ta' ? 'சராசரி மதிப்பெண்' : 'Avg Score'}</p>
            </div>
            <div className="bg-white/80 rounded-lg p-3 text-center">
              <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-red-500" />
              <p className="text-xl font-bold text-red-600">{weakSubjects.length}</p>
              <p className="text-xs text-gray-500">{language === 'ta' ? 'பலவீன பாடங்கள்' : 'Weak Subjects'}</p>
            </div>
            <div className="bg-white/80 rounded-lg p-3 text-center">
              <Target className="h-5 w-5 mx-auto mb-1 text-orange-500" />
              <p className="text-xl font-bold text-orange-600">{moderateSubjects.length}</p>
              <p className="text-xs text-gray-500">{language === 'ta' ? 'நடுத்தர' : 'Moderate'}</p>
            </div>
            <div className="bg-white/80 rounded-lg p-3 text-center">
              <CheckCircle2 className="h-5 w-5 mx-auto mb-1 text-green-500" />
              <p className="text-xl font-bold text-green-600">{strongSubjects.length}</p>
              <p className="text-xs text-gray-500">{language === 'ta' ? 'வலுவான' : 'Strong'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Study Time Recommendation */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட தினசரி படிப்பு நேரம்' : 'Recommended Daily Study Time'}
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'ta' ? 'உங்கள் செயல்திறன் அடிப்படையில்' : 'Based on your performance'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-700">
                {Math.floor(totalDailyTime / 60)}h {totalDailyTime % 60}m
              </p>
              <p className="text-xs text-gray-500">{language === 'ta' ? 'தினமும்' : 'per day'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Priority-based Study Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4 text-purple-600" />
            {language === 'ta' ? 'முன்னுரிமை படிப்பு திட்டம்' : 'Priority Study Plan'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-[400px]">
            <div className="space-y-3">
              {studyPlan.map((item, index) => (
                <motion.div
                  key={item.subject}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getPriorityColor(item.priority)}>
                          {getPriorityLabel(item.priority)}
                        </Badge>
                        <span className="font-semibold text-gray-800">{item.subject}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {language === 'ta' ? 'துல்லியம்' : 'Accuracy'}: {item.accuracy}%
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.dailyTime} {language === 'ta' ? 'நிமிடம்/நாள்' : 'min/day'}
                        </span>
                      </div>
                      <Progress 
                        value={item.accuracy} 
                        className="h-2 mb-2"
                      />
                      <p className="text-xs text-gray-500 italic">
                        {language === 'ta' ? item.improvementTamil : item.improvement}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Detailed Weak Subject Recommendations */}
      {weakSubjects.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-4 w-4" />
              {language === 'ta' ? 'கவனம் தேவை - விரிவான வழிகாட்டுதல்' : 'Focus Areas - Detailed Guidance'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {weakSubjects.map((subject, index) => (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="p-4 bg-red-50/50 rounded-xl border border-red-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <Flame className="h-4 w-4 text-red-600" />
                      </div>
                      <h4 className="font-semibold text-gray-800">{subject.subject}</h4>
                    </div>
                    <Badge className="bg-red-100 text-red-700">{subject.accuracy}%</Badge>
                  </div>

                  {subject.strategy && (
                    <div className="space-y-4">
                      {/* Topics to Focus */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {language === 'ta' ? 'கவனம் செலுத்த வேண்டிய தலைப்புகள்' : 'Topics to Focus'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {subject.strategy.topics.map((topic, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {language === 'ta' ? topic.ta : topic.en}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Resources */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட வளங்கள்' : 'Recommended Resources'}
                        </p>
                        <div className="space-y-1">
                          {subject.strategy.resources.map((resource, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                              <ArrowRight className="h-3 w-3 text-purple-500" />
                              <span className="font-medium text-purple-700">{resource.type}:</span>
                              <span>{language === 'ta' ? resource.ta : resource.en}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Tips */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          {language === 'ta' ? 'விரைவு குறிப்புகள்' : 'Quick Tips'}
                        </p>
                        <div className="space-y-1">
                          {subject.strategy.quickTips.map((tip, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                              <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5" />
                              <span>{language === 'ta' ? tip.ta : tip.en}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Improvement Milestones */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50/50 to-emerald-50/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-green-700">
            <Award className="h-4 w-4" />
            {language === 'ta' ? 'மேம்பாடு இலக்குகள்' : 'Improvement Milestones'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {language === 'ta' ? 'வார இலக்கு' : 'Weekly Goal'}
                </span>
                <Badge className="bg-green-100 text-green-700">
                  +5% {language === 'ta' ? 'துல்லியம்' : 'accuracy'}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">
                {language === 'ta' 
                  ? 'ஒவ்வொரு பலவீன பாடத்திலும் 5% துல்லியத்தை மேம்படுத்தவும்'
                  : 'Improve 5% accuracy in each weak subject'}
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {language === 'ta' ? 'மாத இலக்கு' : 'Monthly Goal'}
                </span>
                <Badge className="bg-blue-100 text-blue-700">
                  {language === 'ta' ? 'எல்லா பாடங்களும் 60%+' : 'All subjects 60%+'}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">
                {language === 'ta' 
                  ? 'அனைத்து பாடங்களிலும் குறைந்தது 60% துல்லியத்தை அடையுங்கள்'
                  : 'Achieve at least 60% accuracy in all subjects'}
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {language === 'ta' ? 'இறுதி இலக்கு' : 'Ultimate Goal'}
                </span>
                <Badge className="bg-purple-100 text-purple-700">
                  {language === 'ta' ? 'தேர்வுக்கு தயார்' : 'Exam Ready'}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">
                {language === 'ta' 
                  ? 'அனைத்து பாடங்களிலும் 75%+ துல்லியம் - தேர்வுக்கு தயார்!'
                  : 'Achieve 75%+ accuracy in all subjects - Exam Ready!'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
