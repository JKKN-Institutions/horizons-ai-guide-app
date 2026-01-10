import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp,
  Users,
  Target,
  Clock,
  Loader2,
  RefreshCw,
  Shield,
  Train,
  Building2,
  Landmark,
  Users2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface LeaderboardEntry {
  id: string;
  display_name: string;
  category: string;
  score: number;
  total_questions: number;
  accuracy: number;
  time_taken: number;
  created_at: string;
  user_id?: string;
}

interface GovtLeaderboardProps {
  language?: 'en' | 'ta';
}

const categoryData: Record<string, { icon: React.ElementType; label: string; labelTa: string; color: string }> = {
  all: { icon: Trophy, label: 'All Categories', labelTa: 'அனைத்து வகைகள்', color: 'text-yellow-500' },
  defence: { icon: Shield, label: 'Defence', labelTa: 'பாதுகாப்பு', color: 'text-green-500' },
  railway: { icon: Train, label: 'Railway', labelTa: 'ரயில்வே', color: 'text-blue-500' },
  ssc: { icon: Building2, label: 'SSC', labelTa: 'எஸ்எஸ்சி', color: 'text-purple-500' },
  banking: { icon: Landmark, label: 'Banking', labelTa: 'வங்கி', color: 'text-orange-500' },
  state: { icon: Users2, label: 'State Govt', labelTa: 'மாநில அரசு', color: 'text-red-500' }
};

export const GovtLeaderboard = ({ language = 'en' }: GovtLeaderboardProps) => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month' | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [userRank, setUserRank] = useState<number | null>(null);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('govt_mock_test_scores')
        .select('*')
        .order('score', { ascending: false })
        .order('accuracy', { ascending: false })
        .order('time_taken', { ascending: true })
        .limit(100);

      // Apply category filter
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      // Apply time filter
      const now = new Date();
      if (timeFilter === 'today') {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
        query = query.gte('created_at', today);
      } else if (timeFilter === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        query = query.gte('created_at', weekAgo);
      } else if (timeFilter === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
        query = query.gte('created_at', monthAgo);
      }

      const { data, error } = await query;

      if (error) throw error;

      setLeaderboard(data || []);

      // Find user's rank
      if (user && data) {
        const userEntry = data.findIndex(entry => entry.user_id === user.id);
        setUserRank(userEntry !== -1 ? userEntry + 1 : null);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      toast.error(language === 'ta' ? 'லீடர்போர்டு ஏற்ற முடியவில்லை' : 'Failed to load leaderboard');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [selectedCategory, timeFilter]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBackground = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-950/20 border-yellow-300';
      case 2: return 'bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800/50 dark:to-gray-900/30 border-gray-300';
      case 3: return 'bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-950/20 border-amber-300';
      default: return 'bg-white dark:bg-gray-800 border-transparent';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500 rounded-lg">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">
                {language === 'ta' ? 'லீடர்போர்டு' : 'Leaderboard'}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'ta' 
                  ? `${leaderboard.length} பங்கேற்பாளர்கள்`
                  : `${leaderboard.length} Participants`}
              </p>
            </div>
          </div>
          
          <Button 
            size="sm" 
            variant="outline"
            onClick={fetchLeaderboard}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            {language === 'ta' ? 'புதுப்பி' : 'Refresh'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-6 h-auto p-1">
            {Object.entries(categoryData).map(([key, { icon: Icon, label, labelTa }]) => (
              <TabsTrigger 
                key={key} 
                value={key}
                className="flex flex-col gap-1 py-2 text-xs data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'ta' ? labelTa : label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Time Filter */}
        <div className="flex gap-2">
          {(['today', 'week', 'month', 'all'] as const).map(filter => (
            <Button
              key={filter}
              size="sm"
              variant={timeFilter === filter ? 'default' : 'outline'}
              onClick={() => setTimeFilter(filter)}
              className={timeFilter === filter ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
            >
              {filter === 'today' ? (language === 'ta' ? 'இன்று' : 'Today') :
               filter === 'week' ? (language === 'ta' ? 'வாரம்' : 'Week') :
               filter === 'month' ? (language === 'ta' ? 'மாதம்' : 'Month') :
               (language === 'ta' ? 'அனைத்தும்' : 'All Time')}
            </Button>
          ))}
        </div>

        {/* User's Rank */}
        {user && userRank && (
          <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 border border-yellow-300">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {language === 'ta' ? 'உங்கள் தரவரிசை' : 'Your Rank'}
              </span>
              <Badge className="bg-yellow-500">#{userRank}</Badge>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>{language === 'ta' ? 'இன்னும் மதிப்பெண்கள் இல்லை' : 'No scores yet'}</p>
            <p className="text-sm mt-1">
              {language === 'ta' 
                ? 'போலி தேர்வு எழுதி லீடர்போர்டில் இடம்பிடியுங்கள்!'
                : 'Take a mock test to appear on the leaderboard!'}
            </p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {topThree.length > 0 && (
              <div className="flex justify-center items-end gap-4 py-6">
                {/* 2nd Place */}
                {topThree[1] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center"
                  >
                    <Avatar className="h-14 w-14 mx-auto border-4 border-gray-300">
                      <AvatarFallback className="bg-gray-200 text-gray-700">
                        {getInitials(topThree[1].display_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-2">
                      <Medal className="h-6 w-6 mx-auto text-gray-400" />
                      <p className="text-sm font-medium truncate max-w-[80px]">{topThree[1].display_name}</p>
                      <p className="text-lg font-bold text-gray-600">{topThree[1].score}</p>
                    </div>
                    <div className="h-16 w-20 bg-gray-300 rounded-t-lg mt-2" />
                  </motion.div>
                )}

                {/* 1st Place */}
                {topThree[0] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center -mt-4"
                  >
                    <Avatar className="h-16 w-16 mx-auto border-4 border-yellow-400">
                      <AvatarFallback className="bg-yellow-200 text-yellow-700">
                        {getInitials(topThree[0].display_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-2">
                      <Crown className="h-7 w-7 mx-auto text-yellow-500" />
                      <p className="text-sm font-medium truncate max-w-[80px]">{topThree[0].display_name}</p>
                      <p className="text-xl font-bold text-yellow-600">{topThree[0].score}</p>
                    </div>
                    <div className="h-24 w-20 bg-yellow-400 rounded-t-lg mt-2" />
                  </motion.div>
                )}

                {/* 3rd Place */}
                {topThree[2] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <Avatar className="h-12 w-12 mx-auto border-4 border-amber-400">
                      <AvatarFallback className="bg-amber-200 text-amber-700">
                        {getInitials(topThree[2].display_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-2">
                      <Medal className="h-5 w-5 mx-auto text-amber-600" />
                      <p className="text-sm font-medium truncate max-w-[80px]">{topThree[2].display_name}</p>
                      <p className="text-lg font-bold text-amber-600">{topThree[2].score}</p>
                    </div>
                    <div className="h-12 w-20 bg-amber-400 rounded-t-lg mt-2" />
                  </motion.div>
                )}
              </div>
            )}

            {/* Rest of Leaderboard */}
            <ScrollArea className="h-[250px]">
              <div className="space-y-2">
                {rest.map((entry, idx) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <Card className={`p-3 border ${getRankBackground(idx + 4)} ${
                      user && entry.user_id === user.id ? 'ring-2 ring-yellow-400' : ''
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 flex justify-center">
                          {getRankIcon(idx + 4)}
                        </div>
                        
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gray-200 text-gray-700 text-sm">
                            {getInitials(entry.display_name)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium truncate">{entry.display_name}</span>
                            {user && entry.user_id === user.id && (
                              <Badge variant="secondary" className="text-xs">
                                {language === 'ta' ? 'நீங்கள்' : 'You'}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              {entry.accuracy}%
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTime(entry.time_taken)}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-bold text-yellow-600">{entry.score}</div>
                          <div className="text-xs text-muted-foreground">
                            /{entry.total_questions}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t">
          <div className="text-center p-3 rounded-lg bg-white/60 dark:bg-gray-800/60">
            <div className="flex items-center justify-center gap-1">
              <Users className="h-4 w-4 text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-600">{leaderboard.length}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {language === 'ta' ? 'பங்கேற்பாளர்கள்' : 'Participants'}
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/60 dark:bg-gray-800/60">
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="h-4 w-4 text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-600">
                {leaderboard[0]?.score || 0}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {language === 'ta' ? 'சிறந்த மதிப்பெண்' : 'Top Score'}
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/60 dark:bg-gray-800/60">
            <div className="flex items-center justify-center gap-1">
              <Target className="h-4 w-4 text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-600">
                {leaderboard.length > 0 
                  ? Math.round(leaderboard.reduce((sum, e) => sum + Number(e.accuracy), 0) / leaderboard.length)
                  : 0}%
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {language === 'ta' ? 'சராசரி துல்லியம்' : 'Avg Accuracy'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
