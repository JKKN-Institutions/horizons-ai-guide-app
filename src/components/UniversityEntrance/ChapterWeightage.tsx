import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, BarChart3, Zap, BookOpen, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { universities } from '@/data/university-entrance-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface TopicWeight {
  topic: string;
  topicTamil: string;
  frequency: number;
  avgQuestions: number;
  importance: 'high' | 'medium' | 'low';
  effort: 'Quick Win' | 'Moderate' | 'Deep Study';
}

// Simulated weightage data - in production, this would come from analyzing PYQ database
const getTopicWeightage = (universityId: string, courseId: string): TopicWeight[] => {
  const baseTopics: TopicWeight[] = [
    { topic: 'Quantitative Aptitude', topicTamil: 'அளவுக் கணக்கு', frequency: 85, avgQuestions: 15, importance: 'high', effort: 'Moderate' },
    { topic: 'Reasoning & Logic', topicTamil: 'நியாயம் & தர்க்கம்', frequency: 78, avgQuestions: 12, importance: 'high', effort: 'Quick Win' },
    { topic: 'English Comprehension', topicTamil: 'ஆங்கில புரிதல்', frequency: 72, avgQuestions: 10, importance: 'medium', effort: 'Moderate' },
    { topic: 'General Awareness', topicTamil: 'பொது விழிப்புணர்வு', frequency: 65, avgQuestions: 8, importance: 'medium', effort: 'Quick Win' },
    { topic: 'Data Interpretation', topicTamil: 'தரவு விளக்கம்', frequency: 60, avgQuestions: 8, importance: 'medium', effort: 'Moderate' },
    { topic: 'Verbal Ability', topicTamil: 'வாய்மொழி திறன்', frequency: 55, avgQuestions: 7, importance: 'medium', effort: 'Quick Win' },
    { topic: 'Computer Basics', topicTamil: 'கணினி அடிப்படைகள்', frequency: 45, avgQuestions: 5, importance: 'low', effort: 'Quick Win' },
    { topic: 'Current Affairs', topicTamil: 'நடப்பு நிகழ்வுகள்', frequency: 40, avgQuestions: 5, importance: 'low', effort: 'Moderate' },
  ];

  // Vary data slightly based on university
  return baseTopics.map(t => ({
    ...t,
    frequency: Math.min(100, t.frequency + Math.floor(Math.random() * 10 - 5)),
    avgQuestions: Math.max(3, t.avgQuestions + Math.floor(Math.random() * 3 - 1)),
  }));
};

const getImportanceColor = (importance: string) => {
  switch (importance) {
    case 'high': return '#22c55e';
    case 'medium': return '#f59e0b';
    case 'low': return '#94a3b8';
    default: return '#94a3b8';
  }
};

const getEffortBadge = (effort: string) => {
  switch (effort) {
    case 'Quick Win': return 'bg-emerald-500 text-white';
    case 'Moderate': return 'bg-amber-500 text-white';
    case 'Deep Study': return 'bg-rose-500 text-white';
    default: return 'bg-slate-500 text-white';
  }
};

export const ChapterWeightage = () => {
  const navigate = useNavigate();
  const [selectedUniversity, setSelectedUniversity] = useState(universities[0]?.id || '');
  const [selectedCourse, setSelectedCourse] = useState('');

  const university = universities.find(u => u.id === selectedUniversity);
  const courses = university?.courses || [];
  const weightageData = selectedCourse ? getTopicWeightage(selectedUniversity, selectedCourse) : [];

  const chartData = weightageData.map(t => ({
    name: t.topic.length > 12 ? t.topic.slice(0, 12) + '...' : t.topic,
    fullName: t.topic,
    frequency: t.frequency,
    importance: t.importance,
  }));

  const highYieldTopics = weightageData.filter(t => t.importance === 'high');
  const quickWins = weightageData.filter(t => t.effort === 'Quick Win');

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <div className="text-center">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <BarChart3 className="h-6 w-6 text-[#6a0dad]" />
            Chapter Weightage
          </h1>
          <p className="text-muted-foreground font-tamil">அத்தியாய முக்கியத்துவம்</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-3">
          <Select value={selectedUniversity} onValueChange={(v) => { setSelectedUniversity(v); setSelectedCourse(''); }}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select University" />
            </SelectTrigger>
            <SelectContent>
              {universities.map(uni => (
                <SelectItem key={uni.id} value={uni.id}>{uni.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCourse} onValueChange={setSelectedCourse} disabled={!selectedUniversity}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map(course => (
                <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCourse && (
          <>
            {/* Chart */}
            <Card className="rounded-2xl">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#6a0dad]" />
                  Question Frequency by Topic
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                      <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11 }} />
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, 'Frequency']}
                        labelFormatter={(label) => chartData.find(d => d.name === label)?.fullName || label}
                      />
                      <Bar dataKey="frequency" radius={[0, 4, 4, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getImportanceColor(entry.importance)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-3 text-xs">
                  <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-500" /> High</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-amber-500" /> Medium</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-slate-400" /> Low</span>
                </div>
              </CardContent>
            </Card>

            {/* High Yield Topics */}
            <Card className="rounded-2xl border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-600" />
                  High-Yield Topics (Focus First!)
                </h3>
                <div className="space-y-2">
                  {highYieldTopics.map((topic, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <div>
                        <p className="font-medium text-sm">{topic.topic}</p>
                        <p className="text-xs text-muted-foreground font-tamil">{topic.topicTamil}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-600 text-white">{topic.avgQuestions} Q/exam</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Wins */}
            <Card className="rounded-2xl border-amber-200 dark:border-amber-800">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-600" />
                  Quick Wins (Easy to Master)
                </h3>
                <div className="space-y-2">
                  {quickWins.map((topic, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                      <div>
                        <p className="font-medium text-sm">{topic.topic}</p>
                        <p className="text-xs text-muted-foreground">{topic.frequency}% frequency</p>
                      </div>
                      <Badge className={getEffortBadge(topic.effort)}>{topic.effort}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* All Topics Table */}
            <Card className="rounded-2xl">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Complete Topic Analysis
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Topic</th>
                        <th className="text-center py-2">Freq</th>
                        <th className="text-center py-2">Avg Q</th>
                        <th className="text-center py-2">Effort</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weightageData.map((topic, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-2">
                            <p className="font-medium">{topic.topic}</p>
                          </td>
                          <td className="text-center py-2">
                            <Badge variant="outline">{topic.frequency}%</Badge>
                          </td>
                          <td className="text-center py-2">{topic.avgQuestions}</td>
                          <td className="text-center py-2">
                            <Badge className={getEffortBadge(topic.effort)} variant="secondary">
                              {topic.effort}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {!selectedCourse && (
          <div className="text-center py-12 text-muted-foreground">
            <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Select a university and course to view chapter weightage</p>
          </div>
        )}
      </div>
    </div>
  );
};
