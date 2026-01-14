import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, BookOpen, Target, TrendingUp, TrendingDown, Lightbulb, BarChart3, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  topicWise?: Record<string, { correct: number; wrong: number; total: number }>;
}

interface TopicAnalysis {
  topic: string;
  totalAttempted: number;
  correct: number;
  wrong: number;
  accuracy: number;
  trend: 'improving' | 'declining' | 'stable';
  lastAttempted: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
}

const STORAGE_KEY = 'tn-mock-test-scores';

export const WeakTopicIdentifier = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<TestScore[]>([]);
  const [activeTab, setActiveTab] = useState('weak');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setScores(Array.isArray(parsed) ? parsed : []);
      } catch {
        setScores([]);
      }
    }
  }, []);

  // Analyze topics from questions in tests
  const topicAnalysis = useMemo(() => {
    const topicStats: Record<string, { correct: number; wrong: number; attempts: string[] }> = {};

    // Get all questions from universities and map performance
    scores.forEach((score) => {
      const university = universities.find(u => u.id === score.universityId);
      const course = university?.courses.find(c => c.id === score.courseId);
      
      if (course) {
        // Simulate topic distribution based on sections
        course.examPattern.sections.forEach((section) => {
          section.topics.forEach((topic) => {
            if (!topicStats[topic]) {
              topicStats[topic] = { correct: 0, wrong: 0, attempts: [] };
            }
            // Estimate performance based on overall score
            const topicShare = Math.ceil(score.total / course.examPattern.sections.length / section.topics.length);
            const correctShare = Math.round((score.correct / score.total) * topicShare);
            const wrongShare = Math.round((score.wrong / score.total) * topicShare);
            
            topicStats[topic].correct += correctShare;
            topicStats[topic].wrong += wrongShare;
            topicStats[topic].attempts.push(score.date);
          });
        });
      }
    });

    // Convert to analysis array
    const analysisArray: TopicAnalysis[] = Object.entries(topicStats).map(([topic, stats]) => {
      const total = stats.correct + stats.wrong;
      const accuracy = total > 0 ? Math.round((stats.correct / total) * 100) : 0;
      
      // Determine trend (simplified - based on attempts count)
      const trend: 'improving' | 'declining' | 'stable' = 
        stats.attempts.length > 2 && accuracy > 70 ? 'improving' :
        accuracy < 50 ? 'declining' : 'stable';

      // Priority based on accuracy
      const priority: 'high' | 'medium' | 'low' = 
        accuracy < 40 ? 'high' : 
        accuracy < 60 ? 'medium' : 'low';

      // Generate recommendation
      const recommendations = {
        high: `Focus on ${topic} - practice at least 20 questions daily. Review fundamental concepts first.`,
        medium: `Strengthen ${topic} - solve 10-15 practice problems and review weak areas.`,
        low: `Good progress in ${topic} - maintain with regular revision and advanced problems.`
      };

      return {
        topic,
        totalAttempted: total,
        correct: stats.correct,
        wrong: stats.wrong,
        accuracy,
        trend,
        lastAttempted: stats.attempts[stats.attempts.length - 1] || '',
        recommendation: recommendations[priority],
        priority
      };
    });

    return analysisArray.sort((a, b) => a.accuracy - b.accuracy);
  }, [scores]);

  const weakTopics = topicAnalysis.filter(t => t.priority === 'high');
  const moderateTopics = topicAnalysis.filter(t => t.priority === 'medium');
  const strongTopics = topicAnalysis.filter(t => t.priority === 'low');

  const overallStats = useMemo(() => {
    if (scores.length === 0) return { avgScore: 0, totalTests: 0, improvement: 0 };
    
    const avgScore = Math.round(scores.reduce((sum, s) => sum + s.percentage, 0) / scores.length);
    const recentScores = scores.slice(-5);
    const olderScores = scores.slice(0, -5);
    const recentAvg = recentScores.length > 0 
      ? recentScores.reduce((sum, s) => sum + s.percentage, 0) / recentScores.length 
      : 0;
    const olderAvg = olderScores.length > 0 
      ? olderScores.reduce((sum, s) => sum + s.percentage, 0) / olderScores.length 
      : avgScore;
    
    return {
      avgScore,
      totalTests: scores.length,
      improvement: Math.round(recentAvg - olderAvg)
    };
  }, [scores]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-slate-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <BarChart3 className="h-4 w-4 text-slate-500" />;
    }
  };

  if (scores.length === 0) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-lg mx-auto space-y-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          <Card className="rounded-2xl text-center p-8">
            <Brain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">No Test Data Yet</h2>
            <p className="text-muted-foreground mb-4">Take some mock tests first to analyze your weak topics.</p>
            <Button 
              onClick={() => navigate('/tn-university-entrance/mock-test')}
              className="bg-[#6a0dad] hover:bg-[#5a0b9d]"
            >
              Start Mock Test
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <div className="text-center">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <Target className="h-6 w-6 text-[#6a0dad]" />
            Weak Topic Identifier
          </h1>
          <p className="text-muted-foreground font-tamil">பலவீனமான பாடங்கள் கண்டறிதல்</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#6a0dad]">{overallStats.avgScore}%</div>
              <p className="text-xs text-muted-foreground">Avg Score</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{overallStats.totalTests}</div>
              <p className="text-xs text-muted-foreground">Tests Taken</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/5">
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold ${overallStats.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {overallStats.improvement >= 0 ? '+' : ''}{overallStats.improvement}%
              </div>
              <p className="text-xs text-muted-foreground">Trend</p>
            </CardContent>
          </Card>
        </div>

        {/* Priority Summary */}
        <Card className="rounded-2xl border-red-200 dark:border-red-900/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Priority Focus Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {weakTopics.length > 0 ? (
                weakTopics.slice(0, 5).map((topic) => (
                  <Badge key={topic.topic} variant="destructive" className="text-xs">
                    {topic.topic} ({topic.accuracy}%)
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Great job! No critical weak areas found.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Topic Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 rounded-xl">
            <TabsTrigger value="weak" className="rounded-lg gap-1">
              <AlertTriangle className="h-3 w-3" />
              Weak ({weakTopics.length})
            </TabsTrigger>
            <TabsTrigger value="moderate" className="rounded-lg gap-1">
              <BookOpen className="h-3 w-3" />
              Moderate ({moderateTopics.length})
            </TabsTrigger>
            <TabsTrigger value="strong" className="rounded-lg gap-1">
              <TrendingUp className="h-3 w-3" />
              Strong ({strongTopics.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weak" className="space-y-3 mt-4">
            {weakTopics.length === 0 ? (
              <Card className="rounded-xl p-6 text-center">
                <p className="text-muted-foreground">No weak topics identified! Keep practicing.</p>
              </Card>
            ) : (
              weakTopics.map((topic) => (
                <TopicCard key={topic.topic} topic={topic} getPriorityColor={getPriorityColor} getTrendIcon={getTrendIcon} />
              ))
            )}
          </TabsContent>

          <TabsContent value="moderate" className="space-y-3 mt-4">
            {moderateTopics.length === 0 ? (
              <Card className="rounded-xl p-6 text-center">
                <p className="text-muted-foreground">No moderate topics.</p>
              </Card>
            ) : (
              moderateTopics.map((topic) => (
                <TopicCard key={topic.topic} topic={topic} getPriorityColor={getPriorityColor} getTrendIcon={getTrendIcon} />
              ))
            )}
          </TabsContent>

          <TabsContent value="strong" className="space-y-3 mt-4">
            {strongTopics.length === 0 ? (
              <Card className="rounded-xl p-6 text-center">
                <p className="text-muted-foreground">Take more tests to identify strong topics.</p>
              </Card>
            ) : (
              strongTopics.map((topic) => (
                <TopicCard key={topic.topic} topic={topic} getPriorityColor={getPriorityColor} getTrendIcon={getTrendIcon} />
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Personalized Study Plan */}
        <Card className="rounded-2xl bg-gradient-to-br from-[#6a0dad]/5 to-purple-600/10">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Personalized Study Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {weakTopics.slice(0, 3).map((topic, idx) => (
              <div key={topic.topic} className="flex items-start gap-3 p-3 bg-background rounded-xl">
                <div className="w-6 h-6 rounded-full bg-[#6a0dad] text-white flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{topic.topic}</p>
                  <p className="text-xs text-muted-foreground">{topic.recommendation}</p>
                </div>
              </div>
            ))}
            {weakTopics.length === 0 && (
              <p className="text-sm text-muted-foreground text-center">
                You're doing great! Focus on maintaining your strong performance.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const TopicCard = ({ 
  topic, 
  getPriorityColor, 
  getTrendIcon 
}: { 
  topic: TopicAnalysis; 
  getPriorityColor: (p: string) => string;
  getTrendIcon: (t: string) => React.ReactNode;
}) => (
  <Card className="rounded-xl">
    <CardContent className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getPriorityColor(topic.priority)}`} />
          <h3 className="font-medium">{topic.topic}</h3>
        </div>
        <div className="flex items-center gap-1">
          {getTrendIcon(topic.trend)}
          <Badge variant={topic.accuracy >= 70 ? 'default' : topic.accuracy >= 50 ? 'secondary' : 'destructive'}>
            {topic.accuracy}%
          </Badge>
        </div>
      </div>
      
      <Progress 
        value={topic.accuracy} 
        className={`h-2 mb-3 ${topic.accuracy < 50 ? '[&>div]:bg-red-500' : topic.accuracy < 70 ? '[&>div]:bg-amber-500' : '[&>div]:bg-green-500'}`}
      />
      
      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-2">
        <span>✅ {topic.correct} correct</span>
        <span>❌ {topic.wrong} wrong</span>
      </div>
      
      <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-lg">
        💡 {topic.recommendation}
      </p>
    </CardContent>
  </Card>
);

export default WeakTopicIdentifier;
