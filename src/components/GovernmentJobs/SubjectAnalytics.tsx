import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Cell, PieChart, Pie, Legend
} from 'recharts';
import {
  BookOpen, TrendingUp, TrendingDown, Target, AlertTriangle,
  CheckCircle2, XCircle, Brain, Calculator, Languages, Lightbulb,
  Award, Zap
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useGovtMockTestScores } from '@/hooks/useGovtMockTestScores';

// Define subject categories for government exams
const SUBJECT_CATEGORIES = {
  'General Knowledge': { 
    icon: Brain, 
    color: '#8B5CF6', 
    colorTamil: 'பொது அறிவு',
    tips: [
      'Read daily newspapers and current affairs magazines',
      'Focus on last 6 months current events',
      'Practice static GK regularly'
    ],
    tipsTamil: [
      'தினசரி செய்தித்தாள்கள் மற்றும் நடப்பு நிகழ்வுகள் இதழ்களைப் படிக்கவும்',
      'கடந்த 6 மாத நடப்பு நிகழ்வுகளில் கவனம் செலுத்துங்கள்',
      'நிலையான பொது அறிவை தொடர்ந்து பயிற்சி செய்யுங்கள்'
    ]
  },
  'Mathematics': { 
    icon: Calculator, 
    color: '#10B981', 
    colorTamil: 'கணிதம்',
    tips: [
      'Practice speed calculation techniques',
      'Master shortcuts for percentage, ratio, and averages',
      'Solve previous year questions daily'
    ],
    tipsTamil: [
      'வேக கணக்கீடு நுட்பங்களை பயிற்சி செய்யுங்கள்',
      'சதவீதம், விகிதம் மற்றும் சராசரிக்கான குறுக்குவழிகளை கற்றுக்கொள்ளுங்கள்',
      'முந்தைய ஆண்டு கேள்விகளை தினமும் தீர்க்கவும்'
    ]
  },
  'Reasoning': { 
    icon: Lightbulb, 
    color: '#F97316', 
    colorTamil: 'தர்க்கம்',
    tips: [
      'Practice logical reasoning puzzles daily',
      'Improve pattern recognition skills',
      'Focus on blood relations and seating arrangements'
    ],
    tipsTamil: [
      'தர்க்க புதிர்களை தினமும் பயிற்சி செய்யுங்கள்',
      'மாதிரி அங்கீகார திறன்களை மேம்படுத்துங்கள்',
      'இரத்த உறவுகள் மற்றும் அமர்வு ஏற்பாடுகளில் கவனம் செலுத்துங்கள்'
    ]
  },
  'English': { 
    icon: Languages, 
    color: '#3B82F6', 
    colorTamil: 'ஆங்கிலம்',
    tips: [
      'Read English newspapers for comprehension',
      'Practice grammar rules and vocabulary',
      'Focus on error spotting and sentence correction'
    ],
    tipsTamil: [
      'புரிதலுக்காக ஆங்கில செய்தித்தாள்களைப் படிக்கவும்',
      'இலக்கண விதிகள் மற்றும் சொல்வளத்தை பயிற்சி செய்யுங்கள்',
      'பிழை கண்டறிதல் மற்றும் வாக்கிய திருத்தத்தில் கவனம் செலுத்துங்கள்'
    ]
  },
  'Polity': { 
    icon: BookOpen, 
    color: '#EC4899', 
    colorTamil: 'அரசியல்',
    tips: [
      'Study Indian Constitution thoroughly',
      'Focus on Fundamental Rights and Duties',
      'Learn about Parliament and State Legislature'
    ],
    tipsTamil: [
      'இந்திய அரசியலமைப்பை முழுமையாக படிக்கவும்',
      'அடிப்படை உரிமைகள் மற்றும் கடமைகளில் கவனம் செலுத்துங்கள்',
      'நாடாளுமன்றம் மற்றும் மாநில சட்டமன்றம் பற்றி அறிந்து கொள்ளுங்கள்'
    ]
  },
  'Geography': { 
    icon: Target, 
    color: '#6366F1', 
    colorTamil: 'புவியியல்',
    tips: [
      'Practice map-based questions',
      'Focus on Indian physical features',
      'Study climate patterns and resources'
    ],
    tipsTamil: [
      'வரைபட அடிப்படையிலான கேள்விகளை பயிற்சி செய்யுங்கள்',
      'இந்திய இயற்கை அம்சங்களில் கவனம் செலுத்துங்கள்',
      'காலநிலை மாதிரிகள் மற்றும் வளங்களைப் படிக்கவும்'
    ]
  },
  'Banking': { 
    icon: Target, 
    color: '#14B8A6', 
    colorTamil: 'வங்கி',
    tips: [
      'Stay updated with RBI policies',
      'Learn about banking schemes and regulations',
      'Practice banking awareness questions'
    ],
    tipsTamil: [
      'RBI கொள்கைகளுடன் புதுப்பித்த நிலையில் இருங்கள்',
      'வங்கி திட்டங்கள் மற்றும் ஒழுங்குமுறைகளைப் பற்றி அறிந்து கொள்ளுங்கள்',
      'வங்கி விழிப்புணர்வு கேள்விகளை பயிற்சி செய்யுங்கள்'
    ]
  },
  'Physics': { 
    icon: Zap, 
    color: '#EAB308', 
    colorTamil: 'இயற்பியல்',
    tips: [
      'Focus on basic concepts and formulas',
      'Practice numerical problems',
      'Understand SI units and conversions'
    ],
    tipsTamil: [
      'அடிப்படை கருத்துகள் மற்றும் சூத்திரங்களில் கவனம் செலுத்துங்கள்',
      'எண்ணியல் சிக்கல்களை பயிற்சி செய்யுங்கள்',
      'SI அலகுகள் மற்றும் மாற்றங்களைப் புரிந்து கொள்ளுங்கள்'
    ]
  }
};

const COLORS = ['#8B5CF6', '#10B981', '#F97316', '#3B82F6', '#EC4899', '#6366F1', '#14B8A6', '#EAB308'];

export const SubjectAnalytics = () => {
  const { language } = useLanguage();
  const { scores } = useGovtMockTestScores();

  // Aggregate subject-wise data
  const subjectData = useMemo(() => {
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
        subjectShort: subject.length > 12 ? subject.substring(0, 10) + '...' : subject,
        accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
        correct: data.correct,
        incorrect: data.total - data.correct,
        total: data.total,
        attempts: data.attempts,
        ...SUBJECT_CATEGORIES[subject as keyof typeof SUBJECT_CATEGORIES]
      }))
      .sort((a, b) => b.total - a.total);
  }, [scores]);

  // Radar chart data for core subjects
  const radarData = useMemo(() => {
    const coreSubjects = ['General Knowledge', 'Mathematics', 'Reasoning', 'English'];
    return coreSubjects.map(subject => {
      const data = subjectData.find(s => s.subject === subject);
      return {
        subject: language === 'ta' 
          ? SUBJECT_CATEGORIES[subject as keyof typeof SUBJECT_CATEGORIES]?.colorTamil || subject
          : subject,
        accuracy: data?.accuracy || 0,
        fullMark: 100,
      };
    });
  }, [subjectData, language]);

  // Pie chart data for question distribution
  const pieData = useMemo(() => {
    return subjectData.slice(0, 6).map((subject, index) => ({
      name: subject.subject,
      value: subject.total,
      fill: COLORS[index % COLORS.length],
    }));
  }, [subjectData]);

  // Identify strengths and weaknesses
  const strengths = useMemo(() => {
    return subjectData
      .filter(s => s.accuracy >= 60 && s.total >= 3)
      .slice(0, 3);
  }, [subjectData]);

  const weaknesses = useMemo(() => {
    return subjectData
      .filter(s => s.accuracy < 50 && s.total >= 3)
      .slice(0, 3);
  }, [subjectData]);

  // Difficulty analysis
  const difficultyData = useMemo(() => {
    const difficulties: Record<string, { total: number; correct: number }> = {
      easy: { total: 0, correct: 0 },
      medium: { total: 0, correct: 0 },
      hard: { total: 0, correct: 0 },
    };

    scores.forEach(score => {
      Object.entries(score.difficultyWise).forEach(([diff, data]) => {
        if (difficulties[diff]) {
          difficulties[diff].total += data.total;
          difficulties[diff].correct += data.correct;
        }
      });
    });

    return Object.entries(difficulties).map(([difficulty, data]) => ({
      difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
      difficultyTamil: difficulty === 'easy' ? 'எளிதான' : difficulty === 'medium' ? 'நடுத்தர' : 'கடினமான',
      accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      total: data.total,
      correct: data.correct,
      color: difficulty === 'easy' ? '#10B981' : difficulty === 'medium' ? '#F97316' : '#EF4444',
    }));
  }, [scores]);

  if (scores.length === 0) {
    return (
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Brain className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {language === 'ta' ? 'பகுப்பாய்வு தரவு இல்லை' : 'No Analytics Data'}
          </h3>
          <p className="text-gray-500 text-sm">
            {language === 'ta' 
              ? 'பாட வாரியான பகுப்பாய்வைப் பார்க்க மாக் டெஸ்ட் எடுக்கவும்'
              : 'Take a mock test to see subject-wise analytics'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50/50 to-indigo-50/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            {language === 'ta' ? 'பாட வாரியான பகுப்பாய்வு' : 'Subject-wise Analytics'}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Core Subjects Radar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="h-4 w-4 text-purple-600" />
            {language === 'ta' ? 'முக்கிய பாடங்கள் ஒப்பீடு' : 'Core Subjects Comparison'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar
                name={language === 'ta' ? 'துல்லியம்' : 'Accuracy'}
                dataKey="accuracy"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.4}
                strokeWidth={2}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <Card className="border-green-200 bg-green-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 text-green-700">
              <CheckCircle2 className="h-4 w-4" />
              {language === 'ta' ? 'வலிமைகள்' : 'Strengths'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {strengths.length > 0 ? (
              <div className="space-y-3">
                {strengths.map((subject, index) => (
                  <motion.div
                    key={subject.subject}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-2 bg-white rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{subject.subject}</p>
                      <p className="text-xs text-gray-500">{subject.total} questions</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">{subject.accuracy}%</Badge>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">
                {language === 'ta' ? 'அதிக தரவு தேவை' : 'Need more practice data'}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card className="border-red-200 bg-red-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-4 w-4" />
              {language === 'ta' ? 'மேம்படுத்த வேண்டியவை' : 'Needs Improvement'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {weaknesses.length > 0 ? (
              <div className="space-y-3">
                {weaknesses.map((subject, index) => (
                  <motion.div
                    key={subject.subject}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-2 bg-white rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{subject.subject}</p>
                      <p className="text-xs text-gray-500">{subject.total} questions</p>
                    </div>
                    <Badge className="bg-red-100 text-red-700">{subject.accuracy}%</Badge>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">
                {language === 'ta' ? 'எல்லா பாடங்களிலும் நல்ல செயல்திறன்!' : 'Good performance in all subjects!'}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-600" />
            {language === 'ta' ? 'அனைத்து பாடங்களின் துல்லியம்' : 'All Subjects Accuracy'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectData.slice(0, 8)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
              <YAxis 
                dataKey="subjectShort" 
                type="category" 
                width={80} 
                tick={{ fontSize: 10 }} 
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border text-xs">
                        <p className="font-semibold">{data.subject}</p>
                        <p className="text-purple-600">{data.accuracy}% Accuracy</p>
                        <p className="text-gray-500">{data.correct}/{data.total} correct</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="accuracy" radius={[0, 4, 4, 0]}>
                {subjectData.slice(0, 8).map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.accuracy >= 70 ? '#10B981' : entry.accuracy >= 50 ? '#F97316' : '#EF4444'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Difficulty Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="h-4 w-4 text-orange-600" />
            {language === 'ta' ? 'கடினநிலை பகுப்பாய்வு' : 'Difficulty Analysis'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {difficultyData.map((diff, index) => (
              <motion.div
                key={diff.difficulty}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 rounded-xl bg-gray-50 border"
              >
                <div 
                  className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${diff.color}20` }}
                >
                  <span className="text-2xl">
                    {diff.difficulty === 'Easy' ? '🟢' : diff.difficulty === 'Medium' ? '🟡' : '🔴'}
                  </span>
                </div>
                <p className="font-medium text-gray-800">
                  {language === 'ta' ? diff.difficultyTamil : diff.difficulty}
                </p>
                <p className="text-2xl font-bold" style={{ color: diff.color }}>
                  {diff.accuracy}%
                </p>
                <p className="text-xs text-gray-500">{diff.total} questions</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Question Distribution Pie */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="h-4 w-4 text-indigo-600" />
            {language === 'ta' ? 'கேள்வி விநியோகம்' : 'Question Distribution'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${name.substring(0, 8)}... (${value})`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 rounded-lg shadow-lg border text-xs">
                        <p className="font-semibold">{payload[0].name}</p>
                        <p>{payload[0].value} questions</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Improvement Tips */}
      {weaknesses.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/30">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-amber-700">
              <Lightbulb className="h-4 w-4" />
              {language === 'ta' ? 'மேம்பாட்டு குறிப்புகள்' : 'Improvement Tips'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48">
              <div className="space-y-4">
                {weaknesses.map(subject => {
                  const subjectInfo = SUBJECT_CATEGORIES[subject.subject as keyof typeof SUBJECT_CATEGORIES];
                  if (!subjectInfo) return null;
                  
                  return (
                    <div key={subject.subject} className="p-3 bg-white rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <subjectInfo.icon className="h-4 w-4" style={{ color: subjectInfo.color }} />
                        <span className="font-medium text-gray-800">{subject.subject}</span>
                        <Badge variant="outline" className="text-xs">{subject.accuracy}%</Badge>
                      </div>
                      <ul className="space-y-1">
                        {(language === 'ta' ? subjectInfo.tipsTamil : subjectInfo.tips).map((tip, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
