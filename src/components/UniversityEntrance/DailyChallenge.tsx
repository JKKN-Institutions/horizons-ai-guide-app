import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Flame, Star, CheckCircle, XCircle, Gift, Zap, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { universities } from '@/data/university-entrance-data';
import confetti from 'canvas-confetti';

interface DailyChallengeData {
  date: string;
  completed: boolean;
  correct: boolean;
  streak: number;
  totalPoints: number;
  history: Array<{
    date: string;
    correct: boolean;
    points: number;
  }>;
}

// Generate a deterministic question based on date
const generateDailyQuestion = (dateString: string) => {
  const allQuestions: Array<{
    question: string;
    options: string[];
    answer: number;
    explanation: string;
    university: string;
    topic: string;
  }> = [];

  universities.forEach(uni => {
    uni.courses.forEach(course => {
      course.previousQuestions?.forEach(q => {
        allQuestions.push({
          question: q.question,
          options: q.options,
          answer: q.correctAnswer,
          explanation: q.explanation || 'No explanation available.',
          university: uni.name,
          topic: course.name
        });
      });
    });
  });

  // Use date to pick a question deterministically
  const dateHash = dateString.split('-').reduce((acc, val) => acc + parseInt(val), 0);
  const questionIndex = dateHash % Math.max(allQuestions.length, 1);
  
  return allQuestions[questionIndex] || {
    question: "Which of the following is the capital of Tamil Nadu?",
    options: ["Chennai", "Coimbatore", "Madurai", "Trichy"],
    answer: 0,
    explanation: "Chennai is the capital city of Tamil Nadu.",
    university: "General Knowledge",
    topic: "Tamil Nadu"
  };
};

const getStreakMultiplier = (streak: number): number => {
  if (streak >= 30) return 3;
  if (streak >= 14) return 2.5;
  if (streak >= 7) return 2;
  if (streak >= 3) return 1.5;
  return 1;
};

const getStreakBadge = (streak: number): { label: string; color: string; icon: string } => {
  if (streak >= 30) return { label: '🔥 Legendary', color: 'bg-gradient-to-r from-yellow-500 to-orange-500', icon: '👑' };
  if (streak >= 14) return { label: '⚡ Champion', color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: '🏆' };
  if (streak >= 7) return { label: '🌟 Rising Star', color: 'bg-gradient-to-r from-blue-500 to-cyan-500', icon: '⭐' };
  if (streak >= 3) return { label: '🎯 Consistent', color: 'bg-gradient-to-r from-green-500 to-emerald-500', icon: '✨' };
  return { label: '🌱 Beginner', color: 'bg-muted', icon: '🌱' };
};

export const DailyChallenge = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  
  const [data, setData] = useState<DailyChallengeData>(() => {
    const saved = localStorage.getItem('tn-daily-challenge');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Check if it's a new day
      if (parsed.date !== today) {
        // Check if yesterday was completed to maintain streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        const newStreak = parsed.date === yesterdayStr && parsed.completed ? parsed.streak : 0;
        
        return {
          date: today,
          completed: false,
          correct: false,
          streak: newStreak,
          totalPoints: parsed.totalPoints || 0,
          history: parsed.history || []
        };
      }
      return parsed;
    }
    return {
      date: today,
      completed: false,
      correct: false,
      streak: 0,
      totalPoints: 0,
      history: []
    };
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(data.completed);

  const question = generateDailyQuestion(today);
  const multiplier = getStreakMultiplier(data.streak);
  const basePoints = 100;
  const streakBadge = getStreakBadge(data.streak);

  useEffect(() => {
    localStorage.setItem('tn-daily-challenge', JSON.stringify(data));
  }, [data]);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === question.answer;
    const earnedPoints = isCorrect ? Math.round(basePoints * multiplier) : 0;
    const newStreak = isCorrect ? data.streak + 1 : 0;

    setData(prev => ({
      ...prev,
      completed: true,
      correct: isCorrect,
      streak: newStreak,
      totalPoints: prev.totalPoints + earnedPoints,
      history: [
        { date: today, correct: isCorrect, points: earnedPoints },
        ...prev.history.slice(0, 29) // Keep last 30 days
      ]
    }));

    setShowResult(true);

    if (isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const getWeeklyProgress = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const entry = data.history.find(h => h.date === dateStr);
      last7Days.push({
        date: dateStr,
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        completed: !!entry,
        correct: entry?.correct || false
      });
    }
    return last7Days;
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Daily Challenge
          </h2>
          <p className="text-sm text-muted-foreground font-tamil">தினசரி சவால்</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center">
          <CardContent className="p-3">
            <Flame className="h-6 w-6 mx-auto text-orange-500 mb-1" />
            <p className="text-2xl font-bold">{data.streak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-3">
            <Star className="h-6 w-6 mx-auto text-yellow-500 mb-1" />
            <p className="text-2xl font-bold">{data.totalPoints}</p>
            <p className="text-xs text-muted-foreground">Total Points</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-3">
            <Zap className="h-6 w-6 mx-auto text-purple-500 mb-1" />
            <p className="text-2xl font-bold">{multiplier}x</p>
            <p className="text-xs text-muted-foreground">Multiplier</p>
          </CardContent>
        </Card>
      </div>

      {/* Streak Badge */}
      <Card className={`${streakBadge.color} text-white`}>
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{streakBadge.icon}</span>
            <div>
              <p className="font-bold">{streakBadge.label}</p>
              <p className="text-sm opacity-90">
                {data.streak >= 7 
                  ? `${multiplier}x bonus on correct answers!`
                  : `${7 - data.streak} more days for 2x bonus!`
                }
              </p>
            </div>
          </div>
          <Trophy className="h-8 w-8 opacity-50" />
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            {getWeeklyProgress().map((day, idx) => (
              <div key={idx} className="text-center">
                <p className="text-xs text-muted-foreground mb-1">{day.day}</p>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  day.completed
                    ? day.correct
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                    : day.date === today
                      ? 'bg-primary/20 text-primary border-2 border-primary'
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {day.completed ? (
                    day.correct ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />
                  ) : day.date === today ? (
                    '?'
                  ) : (
                    '-'
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{question.university}</Badge>
            <Badge>{question.topic}</Badge>
          </div>
          <CardTitle className="text-lg mt-3">Today's Challenge</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground font-medium">{question.question}</p>

          {!showResult ? (
            <>
              <div className="space-y-2">
                {question.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAnswer(idx)}
                    className={`w-full p-3 text-left rounded-lg border transition-all ${
                      selectedAnswer === idx
                        ? 'border-primary bg-primary/10'
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                ))}
              </div>

              <Button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="w-full"
              >
                Submit Answer
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Correct answer = <span className="font-bold text-primary">{Math.round(basePoints * multiplier)} points</span>
              </p>
            </>
          ) : (
            <div className="space-y-4">
              {/* Result */}
              <div className={`p-4 rounded-lg text-center ${
                data.correct
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
              }`}>
                {data.correct ? (
                  <>
                    <CheckCircle className="h-12 w-12 mx-auto mb-2" />
                    <p className="font-bold text-lg">Correct! 🎉</p>
                    <p>You earned {Math.round(basePoints * multiplier)} points</p>
                  </>
                ) : (
                  <>
                    <XCircle className="h-12 w-12 mx-auto mb-2" />
                    <p className="font-bold text-lg">Not quite!</p>
                    <p>Streak reset. Try again tomorrow!</p>
                  </>
                )}
              </div>

              {/* Correct Answer */}
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Correct Answer:</p>
                <p className="text-primary font-bold">
                  {String.fromCharCode(65 + question.answer)}. {question.options[question.answer]}
                </p>
              </div>

              {/* Explanation */}
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">Explanation:</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">{question.explanation}</p>
              </div>

              <p className="text-center text-muted-foreground text-sm">
                Come back tomorrow for a new challenge!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Streak Milestones */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Streak Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { days: 3, bonus: '1.5x', label: 'Consistent' },
              { days: 7, bonus: '2x', label: 'Rising Star' },
              { days: 14, bonus: '2.5x', label: 'Champion' },
              { days: 30, bonus: '3x', label: 'Legendary' }
            ].map((milestone) => (
              <div key={milestone.days} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  data.streak >= milestone.days
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {data.streak >= milestone.days ? '✓' : milestone.days}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{milestone.label}</p>
                  <p className="text-xs text-muted-foreground">{milestone.days} day streak</p>
                </div>
                <Badge variant={data.streak >= milestone.days ? 'default' : 'outline'}>
                  {milestone.bonus}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
