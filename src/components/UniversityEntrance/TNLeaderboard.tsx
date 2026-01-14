import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Medal, Crown, Flame, Star, Filter, Calendar, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { universities } from '@/data/university-entrance-data';

interface LeaderboardEntry {
  id: string;
  name: string;
  universityId: string;
  courseId: string;
  score: number;
  accuracy: number;
  testsCompleted: number;
  streak: number;
  achievements: string[];
  date: string;
}

interface TopicLeaderboard {
  topic: string;
  entries: {
    name: string;
    accuracy: number;
    questionsAttempted: number;
  }[];
}

const STORAGE_KEY = 'tn-mock-test-scores';
const LEADERBOARD_KEY = 'tn-leaderboard-entries';

// Achievement definitions
const ACHIEVEMENTS = {
  'first-test': { name: 'First Steps', icon: '🎯', description: 'Completed first mock test' },
  'perfect-score': { name: 'Perfectionist', icon: '💯', description: 'Scored 100% in a test' },
  'streak-3': { name: 'On Fire', icon: '🔥', description: '3-day practice streak' },
  'streak-7': { name: 'Week Warrior', icon: '⚔️', description: '7-day practice streak' },
  'tests-10': { name: 'Dedicated', icon: '📚', description: 'Completed 10 mock tests' },
  'top-scorer': { name: 'Champion', icon: '🏆', description: 'Ranked #1 in leaderboard' },
  'fast-finisher': { name: 'Speed Demon', icon: '⚡', description: 'Finished test in under 50% time' },
  'topic-master': { name: 'Topic Master', icon: '🧠', description: '90%+ accuracy in any topic' },
};

const SAMPLE_NAMES = [
  'Arun Kumar', 'Priya S', 'Karthik R', 'Deepa M', 'Vijay A', 
  'Lakshmi N', 'Raj K', 'Meena P', 'Santhosh V', 'Anitha R'
];

export const TNLeaderboard = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState<'weekly' | 'monthly' | 'all'>('weekly');
  const [universityFilter, setUniversityFilter] = useState<string>('all');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('overall');

  // Get user's scores
  const [userScores, setUserScores] = useState<any[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // Load user scores
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserScores(Array.isArray(parsed) ? parsed : []);
      } catch {
        setUserScores([]);
      }
    }

    // Generate or load leaderboard
    const leaderboardStored = localStorage.getItem(LEADERBOARD_KEY);
    if (leaderboardStored) {
      try {
        setLeaderboardData(JSON.parse(leaderboardStored));
      } catch {
        generateSampleLeaderboard();
      }
    } else {
      generateSampleLeaderboard();
    }
  }, []);

  const generateSampleLeaderboard = () => {
    const entries: LeaderboardEntry[] = SAMPLE_NAMES.map((name, idx) => ({
      id: `user-${idx}`,
      name,
      universityId: universities[Math.floor(Math.random() * universities.length)].id,
      courseId: 'tancet-mba',
      score: Math.floor(Math.random() * 40) + 60,
      accuracy: Math.floor(Math.random() * 30) + 70,
      testsCompleted: Math.floor(Math.random() * 20) + 5,
      streak: Math.floor(Math.random() * 14) + 1,
      achievements: Object.keys(ACHIEVEMENTS).slice(0, Math.floor(Math.random() * 4) + 1),
      date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    }));

    // Add user's entry if they have scores
    if (userScores.length > 0) {
      const userEntry: LeaderboardEntry = {
        id: 'current-user',
        name: 'You',
        universityId: userScores[0]?.universityId || 'anna-university',
        courseId: userScores[0]?.courseId || 'tancet-mba',
        score: Math.round(userScores.reduce((sum, s) => sum + s.percentage, 0) / userScores.length),
        accuracy: Math.round(userScores.reduce((sum, s) => sum + s.percentage, 0) / userScores.length),
        testsCompleted: userScores.length,
        streak: 1,
        achievements: ['first-test'],
        date: new Date().toISOString(),
      };
      entries.push(userEntry);
    }

    setLeaderboardData(entries);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
  };

  // Filter and sort leaderboard
  const filteredLeaderboard = useMemo(() => {
    let filtered = [...leaderboardData];

    // Time filter
    const now = new Date();
    if (timeFilter === 'weekly') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(e => new Date(e.date) >= weekAgo);
    } else if (timeFilter === 'monthly') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(e => new Date(e.date) >= monthAgo);
    }

    // University filter
    if (universityFilter !== 'all') {
      filtered = filtered.filter(e => e.universityId === universityFilter);
    }

    // Sort by score
    return filtered.sort((a, b) => b.score - a.score);
  }, [leaderboardData, timeFilter, universityFilter]);

  // Topic-wise leaderboard
  const topicLeaderboards = useMemo(() => {
    const topics: string[] = [];
    universities.forEach(uni => {
      uni.courses.forEach(course => {
        course.examPattern.sections.forEach(section => {
          section.topics.forEach(topic => {
            if (!topics.includes(topic)) topics.push(topic);
          });
        });
      });
    });

    return topics.slice(0, 10).map(topic => ({
      topic,
      entries: leaderboardData
        .map(entry => ({
          name: entry.name,
          accuracy: Math.floor(Math.random() * 30) + 70, // Simulated per-topic accuracy
          questionsAttempted: Math.floor(Math.random() * 50) + 10,
        }))
        .sort((a, b) => b.accuracy - a.accuracy)
        .slice(0, 5),
    }));
  }, [leaderboardData]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-amber-400" />;
      case 2: return <Medal className="h-5 w-5 text-slate-400" />;
      case 3: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-amber-100 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/10 border-amber-300';
      case 2: return 'bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800/50 dark:to-slate-900/30 border-slate-300';
      case 3: return 'bg-gradient-to-r from-orange-100 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/10 border-orange-300';
      default: return 'bg-background';
    }
  };

  const currentUserRank = filteredLeaderboard.findIndex(e => e.id === 'current-user') + 1;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <div className="text-center">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <Trophy className="h-6 w-6 text-amber-500" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground font-tamil">தரவரிசை</p>
        </div>

        {/* User's Rank Card */}
        {currentUserRank > 0 && (
          <Card className="rounded-2xl bg-gradient-to-r from-[#6a0dad]/10 to-purple-600/5 border-[#6a0dad]/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#6a0dad] flex items-center justify-center text-white text-xl font-bold">
                    #{currentUserRank}
                  </div>
                  <div>
                    <p className="font-semibold">Your Rank</p>
                    <p className="text-sm text-muted-foreground">
                      Score: {filteredLeaderboard.find(e => e.id === 'current-user')?.score || 0}%
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Flame className="h-4 w-4" />
                    <span className="text-sm font-medium">{userScores.length} tests</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <Select value={timeFilter} onValueChange={(v: any) => setTimeFilter(v)}>
            <SelectTrigger className="w-32 rounded-xl">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>

          <Select value={universityFilter} onValueChange={setUniversityFilter}>
            <SelectTrigger className="flex-1 rounded-xl">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Universities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Universities</SelectItem>
              {universities.map(uni => (
                <SelectItem key={uni.id} value={uni.id}>{uni.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 rounded-xl">
            <TabsTrigger value="overall" className="rounded-lg gap-1">
              <Trophy className="h-3 w-3" />
              Overall
            </TabsTrigger>
            <TabsTrigger value="topics" className="rounded-lg gap-1">
              <TrendingUp className="h-3 w-3" />
              Topics
            </TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-lg gap-1">
              <Award className="h-3 w-3" />
              Badges
            </TabsTrigger>
          </TabsList>

          {/* Overall Leaderboard */}
          <TabsContent value="overall" className="mt-4 space-y-3">
            {/* Top 3 Podium */}
            {filteredLeaderboard.length >= 3 && (
              <div className="flex items-end justify-center gap-2 mb-6">
                {/* 2nd Place */}
                <div className="text-center">
                  <Avatar className="h-14 w-14 mx-auto mb-2 border-2 border-slate-400">
                    <AvatarFallback className="bg-slate-100 text-slate-700">
                      {filteredLeaderboard[1]?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Medal className="h-5 w-5 mx-auto text-slate-400" />
                  <p className="text-xs font-medium truncate max-w-16">{filteredLeaderboard[1]?.name}</p>
                  <Badge variant="secondary">{filteredLeaderboard[1]?.score}%</Badge>
                </div>

                {/* 1st Place */}
                <div className="text-center -mt-4">
                  <Avatar className="h-18 w-18 mx-auto mb-2 border-2 border-amber-400 ring-2 ring-amber-200">
                    <AvatarFallback className="bg-amber-100 text-amber-700 text-xl">
                      {filteredLeaderboard[0]?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Crown className="h-6 w-6 mx-auto text-amber-400" />
                  <p className="text-sm font-semibold truncate max-w-20">{filteredLeaderboard[0]?.name}</p>
                  <Badge className="bg-amber-500">{filteredLeaderboard[0]?.score}%</Badge>
                </div>

                {/* 3rd Place */}
                <div className="text-center">
                  <Avatar className="h-14 w-14 mx-auto mb-2 border-2 border-orange-400">
                    <AvatarFallback className="bg-orange-100 text-orange-700">
                      {filteredLeaderboard[2]?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Medal className="h-5 w-5 mx-auto text-orange-400" />
                  <p className="text-xs font-medium truncate max-w-16">{filteredLeaderboard[2]?.name}</p>
                  <Badge variant="secondary">{filteredLeaderboard[2]?.score}%</Badge>
                </div>
              </div>
            )}

            {/* Full Leaderboard */}
            <div className="space-y-2">
              {filteredLeaderboard.map((entry, idx) => (
                <Card 
                  key={entry.id} 
                  className={`rounded-xl border ${getRankBg(idx + 1)} ${entry.id === 'current-user' ? 'ring-2 ring-[#6a0dad]' : ''}`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 flex justify-center">
                        {getRankIcon(idx + 1)}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className={entry.id === 'current-user' ? 'bg-[#6a0dad] text-white' : ''}>
                          {entry.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {entry.name}
                          {entry.id === 'current-user' && <Badge className="ml-2 text-xs bg-[#6a0dad]">You</Badge>}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{entry.testsCompleted} tests</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Flame className="h-3 w-3 text-orange-500" />
                            {entry.streak} day streak
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#6a0dad]">{entry.score}%</div>
                        <div className="flex gap-0.5 justify-end">
                          {entry.achievements.slice(0, 3).map((ach) => (
                            <span key={ach} className="text-xs" title={ACHIEVEMENTS[ach as keyof typeof ACHIEVEMENTS]?.name}>
                              {ACHIEVEMENTS[ach as keyof typeof ACHIEVEMENTS]?.icon}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Topic-wise Leaderboard */}
          <TabsContent value="topics" className="mt-4 space-y-4">
            <Select value={topicFilter} onValueChange={setTopicFilter}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                {topicLeaderboards.map(tl => (
                  <SelectItem key={tl.topic} value={tl.topic}>{tl.topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(topicFilter === 'all' ? topicLeaderboards : topicLeaderboards.filter(t => t.topic === topicFilter))
              .map((topicLB) => (
                <Card key={topicLB.topic} className="rounded-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Star className="h-4 w-4 text-amber-500" />
                      {topicLB.topic}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {topicLB.entries.map((entry, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            {getRankIcon(idx + 1)}
                            <span>{entry.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground text-xs">{entry.questionsAttempted}q</span>
                            <Badge variant={idx === 0 ? 'default' : 'secondary'}>{entry.accuracy}%</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements" className="mt-4">
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(ACHIEVEMENTS).map(([key, ach]) => {
                const isUnlocked = userScores.length > 0 && (
                  key === 'first-test' ||
                  (key === 'tests-10' && userScores.length >= 10) ||
                  (key === 'perfect-score' && userScores.some(s => s.percentage === 100))
                );

                return (
                  <Card 
                    key={key} 
                    className={`rounded-xl ${isUnlocked ? 'border-amber-300 bg-amber-50/50 dark:bg-amber-900/10' : 'opacity-60'}`}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">{ach.icon}</div>
                      <p className="font-medium text-sm">{ach.name}</p>
                      <p className="text-xs text-muted-foreground">{ach.description}</p>
                      {isUnlocked && (
                        <Badge className="mt-2 bg-amber-500 text-xs">Unlocked!</Badge>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TNLeaderboard;
