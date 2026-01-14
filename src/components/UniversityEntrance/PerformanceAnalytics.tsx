import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Target, Award, Calendar, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { universities } from '@/data/university-entrance-data';

interface TestScore {
  universityId: string;
  courseId: string;
  correct: number;
  wrong: number;
  unattempted: number;
  total: number;
  percentage: number;
  date: string;
}

const STORAGE_KEY = 'tn-mock-test-scores';
const COLORS = ['#22c55e', '#ef4444', '#94a3b8'];

export const PerformanceAnalytics = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<TestScore[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setScores(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load scores:', e);
      }
    }
  }, []);

  const totalTests = scores.length;
  const avgScore = totalTests > 0 ? Math.round(scores.reduce((sum, s) => sum + s.percentage, 0) / totalTests) : 0;
  const bestScore = totalTests > 0 ? Math.max(...scores.map(s => s.percentage)) : 0;
  const totalQuestions = scores.reduce((sum, s) => sum + s.total, 0);
  const totalCorrect = scores.reduce((sum, s) => sum + s.correct, 0);

  // Score trend data
  const trendData = scores.slice(-10).map((s, idx) => ({
    test: `Test ${idx + 1}`,
    score: s.percentage,
    date: new Date(s.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
  }));

  // Performance by university
  const universityPerformance = universities.map(uni => {
    const uniScores = scores.filter(s => s.universityId === uni.id);
    return {
      name: uni.name.slice(0, 15) + (uni.name.length > 15 ? '...' : ''),
      fullName: uni.name,
      tests: uniScores.length,
      avgScore: uniScores.length > 0 ? Math.round(uniScores.reduce((sum, s) => sum + s.percentage, 0) / uniScores.length) : 0,
    };
  }).filter(u => u.tests > 0);

  // Accuracy breakdown
  const accuracyData = [
    { name: 'Correct', value: totalCorrect, color: COLORS[0] },
    { name: 'Wrong', value: scores.reduce((sum, s) => sum + s.wrong, 0), color: COLORS[1] },
    { name: 'Skipped', value: scores.reduce((sum, s) => sum + s.unattempted, 0), color: COLORS[2] },
  ].filter(d => d.value > 0);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <div className="text-center">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <TrendingUp className="h-6 w-6 text-[#6a0dad]" />
            Performance Analytics
          </h1>
          <p className="text-muted-foreground font-tamil">செயல்திறன் பகுப்பாய்வு</p>
        </div>

        {totalTests === 0 ? (
          <Card className="rounded-2xl">
            <CardContent className="p-8 text-center">
              <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No Test Data Yet</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Complete mock tests to see your performance analytics
              </p>
              <Button onClick={() => navigate('/tn-university-entrance/mock-test')} className="bg-[#6a0dad] hover:bg-[#5a0b9d]">
                Take Mock Test
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card className="rounded-xl">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[#6a0dad]">{totalTests}</div>
                  <p className="text-xs text-muted-foreground">Tests Taken</p>
                </CardContent>
              </Card>
              <Card className="rounded-xl">
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(avgScore)}`}>{avgScore}%</div>
                  <p className="text-xs text-muted-foreground">Avg Score</p>
                </CardContent>
              </Card>
              <Card className="rounded-xl">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{bestScore}%</div>
                  <p className="text-xs text-muted-foreground">Best Score</p>
                </CardContent>
              </Card>
              <Card className="rounded-xl">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{totalQuestions}</div>
                  <p className="text-xs text-muted-foreground">Questions</p>
                </CardContent>
              </Card>
            </div>

            {/* Score Trend */}
            {trendData.length > 1 && (
              <Card className="rounded-2xl">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#6a0dad]" />
                    Score Trend
                  </h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#6a0dad" 
                          strokeWidth={2}
                          dot={{ fill: '#6a0dad', r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Accuracy Breakdown */}
            <Card className="rounded-2xl">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#6a0dad]" />
                  Accuracy Breakdown
                </h3>
                <div className="flex items-center gap-6">
                  <div className="h-32 w-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={accuracyData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
                          dataKey="value"
                        >
                          {accuracyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-2">
                    {accuracyData.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                          {item.name}
                        </span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between text-sm font-semibold">
                        <span>Accuracy</span>
                        <span className={getScoreColor(Math.round(totalCorrect / totalQuestions * 100))}>
                          {Math.round(totalCorrect / totalQuestions * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance by University */}
            {universityPerformance.length > 0 && (
              <Card className="rounded-2xl">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#6a0dad]" />
                    Performance by University
                  </h3>
                  <div className="space-y-3">
                    {universityPerformance.map((uni, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium" title={uni.fullName}>{uni.name}</span>
                          <span className="text-muted-foreground">{uni.tests} tests</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={uni.avgScore} className="flex-1 h-2" />
                          <Badge className={`${getScoreBadge(uni.avgScore)} text-white min-w-[50px] justify-center`}>
                            {uni.avgScore}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Tests */}
            <Card className="rounded-2xl">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#6a0dad]" />
                  Recent Tests
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {scores.slice(-5).reverse().map((score, idx) => {
                    const uni = universities.find(u => u.id === score.universityId);
                    const course = uni?.courses.find(c => c.id === score.courseId);
                    return (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                        <div>
                          <p className="font-medium text-sm">{uni?.name || 'Unknown'}</p>
                          <p className="text-xs text-muted-foreground">
                            {course?.name || 'Unknown'} • {new Date(score.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={`${getScoreBadge(score.percentage)} text-white`}>
                          {score.percentage}%
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};
