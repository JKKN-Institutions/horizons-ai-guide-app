import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ChapterWeightageProps {
  language: 'en' | 'ta';
}

interface TopicData {
  name: string;
  weightage: number;
  questions: number;
  trend: 'up' | 'stable' | 'down';
}

interface SubjectWeightage {
  subject: string;
  subjectTa: string;
  color: string;
  topics: TopicData[];
}

interface ExamWeightage {
  id: string;
  name: string;
  subjects: SubjectWeightage[];
}

const weightageData: ExamWeightage[] = [
  {
    id: 'neet',
    name: 'NEET UG',
    subjects: [
      {
        subject: 'Physics',
        subjectTa: 'இயற்பியல்',
        color: '#3b82f6',
        topics: [
          { name: 'Mechanics', weightage: 22, questions: 10, trend: 'stable' },
          { name: 'Electrodynamics', weightage: 18, questions: 8, trend: 'up' },
          { name: 'Modern Physics', weightage: 14, questions: 6, trend: 'up' },
          { name: 'Thermodynamics', weightage: 12, questions: 5, trend: 'stable' },
          { name: 'Optics', weightage: 12, questions: 5, trend: 'stable' },
          { name: 'Waves & Oscillations', weightage: 10, questions: 4, trend: 'down' },
          { name: 'Properties of Matter', weightage: 8, questions: 4, trend: 'stable' },
          { name: 'Semiconductors', weightage: 4, questions: 2, trend: 'stable' },
        ]
      },
      {
        subject: 'Chemistry',
        subjectTa: 'வேதியியல்',
        color: '#8b5cf6',
        topics: [
          { name: 'Organic Chemistry', weightage: 32, questions: 14, trend: 'stable' },
          { name: 'Inorganic Chemistry', weightage: 30, questions: 13, trend: 'up' },
          { name: 'Physical Chemistry', weightage: 28, questions: 12, trend: 'stable' },
          { name: 'Biomolecules', weightage: 6, questions: 3, trend: 'up' },
          { name: 'Environmental', weightage: 4, questions: 2, trend: 'down' },
        ]
      },
      {
        subject: 'Biology',
        subjectTa: 'உயிரியல்',
        color: '#22c55e',
        topics: [
          { name: 'Human Physiology', weightage: 20, questions: 18, trend: 'stable' },
          { name: 'Genetics & Evolution', weightage: 18, questions: 16, trend: 'up' },
          { name: 'Plant Physiology', weightage: 12, questions: 11, trend: 'stable' },
          { name: 'Cell Biology', weightage: 10, questions: 9, trend: 'stable' },
          { name: 'Ecology', weightage: 10, questions: 9, trend: 'up' },
          { name: 'Reproduction', weightage: 10, questions: 9, trend: 'stable' },
          { name: 'Biotechnology', weightage: 8, questions: 7, trend: 'stable' },
          { name: 'Diversity', weightage: 7, questions: 6, trend: 'down' },
          { name: 'Structural Org.', weightage: 5, questions: 5, trend: 'stable' },
        ]
      }
    ]
  },
  {
    id: 'jee-main',
    name: 'JEE Main',
    subjects: [
      {
        subject: 'Physics',
        subjectTa: 'இயற்பியல்',
        color: '#3b82f6',
        topics: [
          { name: 'Mechanics', weightage: 25, questions: 7, trend: 'stable' },
          { name: 'Electromagnetism', weightage: 22, questions: 6, trend: 'up' },
          { name: 'Modern Physics', weightage: 15, questions: 4, trend: 'up' },
          { name: 'Optics', weightage: 12, questions: 3, trend: 'stable' },
          { name: 'Thermodynamics', weightage: 10, questions: 3, trend: 'stable' },
          { name: 'Waves & SHM', weightage: 10, questions: 3, trend: 'stable' },
          { name: 'Semiconductors', weightage: 6, questions: 2, trend: 'down' },
        ]
      },
      {
        subject: 'Chemistry',
        subjectTa: 'வேதியியல்',
        color: '#8b5cf6',
        topics: [
          { name: 'Organic Chemistry', weightage: 35, questions: 10, trend: 'stable' },
          { name: 'Physical Chemistry', weightage: 35, questions: 10, trend: 'up' },
          { name: 'Inorganic Chemistry', weightage: 30, questions: 8, trend: 'stable' },
        ]
      },
      {
        subject: 'Mathematics',
        subjectTa: 'கணிதம்',
        color: '#f97316',
        topics: [
          { name: 'Calculus', weightage: 28, questions: 8, trend: 'up' },
          { name: 'Algebra', weightage: 24, questions: 7, trend: 'stable' },
          { name: 'Coordinate Geometry', weightage: 18, questions: 5, trend: 'stable' },
          { name: 'Vectors & 3D', weightage: 12, questions: 3, trend: 'stable' },
          { name: 'Trigonometry', weightage: 10, questions: 3, trend: 'stable' },
          { name: 'Probability & Stats', weightage: 8, questions: 2, trend: 'up' },
        ]
      }
    ]
  },
  {
    id: 'jee-advanced',
    name: 'JEE Advanced',
    subjects: [
      {
        subject: 'Physics',
        subjectTa: 'இயற்பியல்',
        color: '#06b6d4',
        topics: [
          { name: 'Mechanics', weightage: 28, questions: 8, trend: 'stable' },
          { name: 'Electromagnetism', weightage: 25, questions: 7, trend: 'up' },
          { name: 'Modern Physics', weightage: 15, questions: 4, trend: 'stable' },
          { name: 'Optics', weightage: 12, questions: 3, trend: 'stable' },
          { name: 'Thermodynamics', weightage: 12, questions: 3, trend: 'up' },
          { name: 'Waves', weightage: 8, questions: 2, trend: 'stable' },
        ]
      },
      {
        subject: 'Chemistry',
        subjectTa: 'வேதியியல்',
        color: '#a855f7',
        topics: [
          { name: 'Organic Chemistry', weightage: 38, questions: 11, trend: 'stable' },
          { name: 'Physical Chemistry', weightage: 32, questions: 9, trend: 'up' },
          { name: 'Inorganic Chemistry', weightage: 30, questions: 8, trend: 'stable' },
        ]
      },
      {
        subject: 'Mathematics',
        subjectTa: 'கணிதம்',
        color: '#ec4899',
        topics: [
          { name: 'Calculus', weightage: 32, questions: 9, trend: 'up' },
          { name: 'Algebra', weightage: 28, questions: 8, trend: 'stable' },
          { name: 'Coordinate Geometry', weightage: 18, questions: 5, trend: 'stable' },
          { name: 'Vectors & 3D', weightage: 14, questions: 4, trend: 'stable' },
          { name: 'Trigonometry', weightage: 8, questions: 2, trend: 'down' },
        ]
      }
    ]
  }
];

const getTrendIcon = (trend: 'up' | 'stable' | 'down') => {
  if (trend === 'up') return '↑';
  if (trend === 'down') return '↓';
  return '→';
};

const getTrendColor = (trend: 'up' | 'stable' | 'down') => {
  if (trend === 'up') return 'text-emerald-600';
  if (trend === 'down') return 'text-rose-500';
  return 'text-gray-400';
};

export const ChapterWeightage: React.FC<ChapterWeightageProps> = ({ language }) => {
  const [selectedExam, setSelectedExam] = useState('neet');
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const currentExam = weightageData.find(e => e.id === selectedExam);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 shadow-lg">
          <p className="font-medium text-sm text-gray-900">{data.name}</p>
          <p className="text-xs text-gray-600">{data.weightage}% • ~{data.questions} questions</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {language === 'en' ? 'Chapter-wise Weightage' : 'அத்தியாயம் வாரியான எடை'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === 'en' ? 'Based on past 5 years trends' : 'கடந்த 5 ஆண்டு போக்குகளின் அடிப்படையில்'}
          </p>
        </div>
        <Badge className="ml-auto bg-amber-100 text-amber-700 border-amber-200">
          {language === 'en' ? '2020-2024 Data' : '2020-2024 தரவு'}
        </Badge>
      </div>

      {/* Exam Tabs */}
      <Tabs value={selectedExam} onValueChange={setSelectedExam} className="w-full">
        <TabsList className="w-full justify-start bg-gray-100/80 p-1 rounded-lg mb-6">
          {weightageData.map(exam => (
            <TabsTrigger 
              key={exam.id} 
              value={exam.id}
              className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              {exam.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {weightageData.map(exam => (
          <TabsContent key={exam.id} value={exam.id} className="space-y-4">
            {exam.subjects.map((subject, idx) => (
              <Card key={idx} className="border border-gray-200 shadow-sm overflow-hidden">
                <Collapsible
                  open={expandedSubject === subject.subject}
                  onOpenChange={(open) => setExpandedSubject(open ? subject.subject : null)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: subject.color }}
                          />
                          <CardTitle className="text-base font-semibold text-gray-800">
                            {language === 'en' ? subject.subject : subject.subjectTa}
                          </CardTitle>
                          <span className="text-xs text-gray-500">
                            {subject.topics.length} {language === 'en' ? 'chapters' : 'அத்தியாயங்கள்'}
                          </span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${expandedSubject === subject.subject ? 'rotate-180' : ''}`} />
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-6">
                      {/* Chart */}
                      <div className="h-48 mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={subject.topics} 
                            layout="vertical"
                            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                          >
                            <XAxis type="number" domain={[0, 40]} hide />
                            <YAxis 
                              type="category" 
                              dataKey="name" 
                              width={110}
                              tick={{ fontSize: 11, fill: '#6b7280' }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                            <Bar dataKey="weightage" radius={[0, 4, 4, 0]} barSize={16}>
                              {subject.topics.map((_, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={subject.color}
                                  fillOpacity={0.8 - (index * 0.06)}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Topic Table */}
                      <div className="border border-gray-100 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-4 gap-2 px-3 py-2 bg-gray-50 text-xs font-medium text-gray-600">
                          <span>{language === 'en' ? 'Chapter' : 'அத்தியாயம்'}</span>
                          <span className="text-center">{language === 'en' ? 'Weight' : 'எடை'}</span>
                          <span className="text-center">{language === 'en' ? 'Questions' : 'கேள்விகள்'}</span>
                          <span className="text-center">{language === 'en' ? 'Trend' : 'போக்கு'}</span>
                        </div>
                        {subject.topics.map((topic, topicIdx) => (
                          <div 
                            key={topicIdx} 
                            className={`grid grid-cols-4 gap-2 px-3 py-2 text-sm ${topicIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                          >
                            <span className="text-gray-700 truncate">{topic.name}</span>
                            <span className="text-center font-medium text-gray-800">{topic.weightage}%</span>
                            <span className="text-center text-gray-600">~{topic.questions}</span>
                            <span className={`text-center font-medium ${getTrendColor(topic.trend)}`}>
                              {getTrendIcon(topic.trend)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 pt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="text-emerald-600">↑</span> {language === 'en' ? 'Increasing' : 'அதிகரிப்பு'}
              </span>
              <span className="flex items-center gap-1">
                <span className="text-gray-400">→</span> {language === 'en' ? 'Stable' : 'நிலையான'}
              </span>
              <span className="flex items-center gap-1">
                <span className="text-rose-500">↓</span> {language === 'en' ? 'Decreasing' : 'குறைவு'}
              </span>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ChapterWeightage;
