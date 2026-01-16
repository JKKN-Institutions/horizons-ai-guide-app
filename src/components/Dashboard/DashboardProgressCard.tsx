import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Flame, Target, BookOpen, Trophy } from 'lucide-react';
import { useStudyStreak } from '@/hooks/useStudyStreak';

interface DashboardProgressCardProps {
  completedAssessments: number;
  totalPracticeQuestions: number;
}

const DashboardProgressCard = ({ 
  completedAssessments, 
  totalPracticeQuestions 
}: DashboardProgressCardProps) => {
  const streakData = useStudyStreak();
  const unlockedAchievements = streakData.getUnlockedAchievements();
  
  const stats = [
    {
      icon: Flame,
      label: 'Current Streak',
      labelTamil: 'தற்போதைய தொடர்',
      value: `${streakData.currentStreak} days`,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    },
    {
      icon: Target,
      label: 'Best Streak',
      labelTamil: 'சிறந்த தொடர்',
      value: `${streakData.bestStreak} days`,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
    },
    {
      icon: BookOpen,
      label: 'Assessments',
      labelTamil: 'மதிப்பீடுகள்',
      value: `${completedAssessments} done`,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      icon: Trophy,
      label: 'Achievements',
      labelTamil: 'சாதனைகள்',
      value: `${unlockedAchievements.length} earned`,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    },
  ];

  // Weekly progress visualization
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const dayOfWeek = (today.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
  
  const getWeeklyProgress = () => {
    const weekProgress = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - dayOfWeek + i);
      const dateStr = date.toISOString().split('T')[0];
      const practiced = streakData.practiceHistory.includes(dateStr);
      weekProgress.push({
        day: weekDays[i],
        practiced,
        isToday: i === dayOfWeek,
        isFuture: i > dayOfWeek
      });
    }
    return weekProgress;
  };

  const weeklyProgress = getWeeklyProgress();
  const weeklyPracticed = weeklyProgress.filter(d => d.practiced).length;
  const weeklyGoal = 5; // Goal: practice 5 days a week
  const progressPercent = Math.min((weeklyPracticed / weeklyGoal) * 100, 100);

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Your Progress
          <span className="text-sm font-normal text-muted-foreground font-tamil ml-auto">
            உங்கள் முன்னேற்றம்
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`${stat.bgColor} rounded-lg p-3 text-center`}
            >
              <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-1`} />
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">This Week's Goal</span>
            <span className="font-medium">{weeklyPracticed}/{weeklyGoal} days</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          
          {/* Day indicators */}
          <div className="flex justify-between mt-2">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
                    ${day.practiced 
                      ? 'bg-emerald-500 text-white' 
                      : day.isToday 
                        ? 'border-2 border-primary bg-background' 
                        : day.isFuture
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-muted/50 text-muted-foreground'
                    }`}
                >
                  {day.practiced ? '✓' : ''}
                </div>
                <span className={`text-[10px] ${day.isToday ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        {unlockedAchievements.length > 0 && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Recent Achievements</p>
            <div className="flex gap-2 flex-wrap">
              {unlockedAchievements.slice(-3).map((achievement) => (
                <span 
                  key={achievement.id}
                  className="inline-flex items-center gap-1 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full"
                >
                  {achievement.icon} {achievement.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardProgressCard;
