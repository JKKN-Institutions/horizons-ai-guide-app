import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  BookOpen, 
  Target, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  Video,
  FileText,
  TrendingUp,
  Users,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

type CounsellingType = 'tnea' | 'neet' | 'josaa';

interface VideoTutorial {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  youtubeUrl: string;
  category: string;
}

interface StrategyTip {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
}

const videoTutorials: Record<CounsellingType, VideoTutorial[]> = {
  tnea: [
    {
      id: '1',
      title: 'TNEA 2025 Complete Counselling Guide',
      duration: '15:30',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Complete Guide'
    },
    {
      id: '2',
      title: 'How to Choose the Right College in TNEA',
      duration: '12:45',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'College Selection'
    },
    {
      id: '3',
      title: 'TNEA Branch Selection Strategy',
      duration: '10:20',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Branch Selection'
    },
    {
      id: '4',
      title: 'Understanding TNEA Cutoff Trends',
      duration: '8:15',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Cutoff Analysis'
    },
    {
      id: '5',
      title: 'Preference Order Tips for TNEA',
      duration: '11:00',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Preference Strategy'
    }
  ],
  neet: [
    {
      id: '1',
      title: 'NEET UG 2025 Counselling Process Explained',
      duration: '18:00',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Complete Guide'
    },
    {
      id: '2',
      title: 'AIIMS vs Government Medical Colleges',
      duration: '14:30',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'College Comparison'
    },
    {
      id: '3',
      title: 'State Quota vs All India Quota Strategy',
      duration: '12:00',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Quota Strategy'
    },
    {
      id: '4',
      title: 'MBBS vs BDS - Making the Right Choice',
      duration: '10:45',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Course Selection'
    },
    {
      id: '5',
      title: 'Documents Required for NEET Counselling',
      duration: '7:30',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Documentation'
    }
  ],
  josaa: [
    {
      id: '1',
      title: 'JoSAA 2025 Complete Counselling Process',
      duration: '20:00',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Complete Guide'
    },
    {
      id: '2',
      title: 'IIT vs NIT vs IIIT - Which to Choose?',
      duration: '16:30',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Institute Comparison'
    },
    {
      id: '3',
      title: 'Branch vs College Priority Strategy',
      duration: '14:15',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Priority Strategy'
    },
    {
      id: '4',
      title: 'Understanding JoSAA Rounds & Upgrades',
      duration: '11:45',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Rounds System'
    },
    {
      id: '5',
      title: 'Freeze, Float, Slide Options Explained',
      duration: '9:00',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Seat Options'
    }
  ]
};

const strategyTips: Record<CounsellingType, StrategyTip[]> = {
  tnea: [
    {
      id: '1',
      title: 'Prioritize Top Autonomous Colleges',
      description: 'Anna University affiliated autonomous colleges often have better placements. Consider CEG, MIT, PSG, CIT in your top preferences.',
      priority: 'high',
      icon: <Target className="h-5 w-5" />
    },
    {
      id: '2',
      title: 'Consider Location & Commute',
      description: 'Choose colleges within reasonable distance to reduce hostel costs and enable family support during studies.',
      priority: 'medium',
      icon: <Clock className="h-5 w-5" />
    },
    {
      id: '3',
      title: 'Research Placement Records',
      description: 'Check last 3 years placement statistics, average package, and companies visiting each college.',
      priority: 'high',
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      id: '4',
      title: 'Branch Over College for IT/CS',
      description: 'For Computer Science and IT branches, even a Tier-2 college with CS is better than Tier-1 with other branches.',
      priority: 'high',
      icon: <Lightbulb className="h-5 w-5" />
    },
    {
      id: '5',
      title: 'Keep 15-20 Preferences Ready',
      description: 'Always fill maximum preferences to ensure you get a seat. Don\'t limit yourself to just 5-6 choices.',
      priority: 'medium',
      icon: <CheckCircle2 className="h-5 w-5" />
    }
  ],
  neet: [
    {
      id: '1',
      title: 'Government Colleges First Priority',
      description: 'Government medical colleges have lower fees (₹15K-50K/year) compared to private (₹10L-25L/year). Prioritize them.',
      priority: 'high',
      icon: <Target className="h-5 w-5" />
    },
    {
      id: '2',
      title: 'Consider State Quota Colleges',
      description: 'Your home state quota colleges have higher chances of admission. Apply for both AIQ and State quota.',
      priority: 'high',
      icon: <Users className="h-5 w-5" />
    },
    {
      id: '3',
      title: 'AIIMS/JIPMER Strategy',
      description: 'If your rank is within top 1000, prioritize AIIMS Delhi, then other AIIMS, then top government colleges.',
      priority: 'high',
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      id: '4',
      title: 'MBBS vs BDS Decision',
      description: 'If MBBS is not possible in government, consider private MBBS or government BDS based on career goals.',
      priority: 'medium',
      icon: <Lightbulb className="h-5 w-5" />
    },
    {
      id: '5',
      title: 'Keep Documents Ready',
      description: 'Prepare all documents early - 10th, 12th marksheets, rank card, category certificates, domicile proof.',
      priority: 'medium',
      icon: <FileText className="h-5 w-5" />
    }
  ],
  josaa: [
    {
      id: '1',
      title: 'Old IITs vs New IITs',
      description: 'Old IITs (Bombay, Delhi, Madras, Kanpur, Kharagpur) have better brand value. Prioritize them for non-CS branches.',
      priority: 'high',
      icon: <Target className="h-5 w-5" />
    },
    {
      id: '2',
      title: 'CS/AI at NIT vs Non-CS at IIT',
      description: 'For career in tech, CS at top NITs (Trichy, Warangal, Surathkal) may be better than non-CS at new IITs.',
      priority: 'high',
      icon: <Lightbulb className="h-5 w-5" />
    },
    {
      id: '3',
      title: 'Use Freeze, Float, Slide Wisely',
      description: 'Use Float/Slide to upgrade in subsequent rounds. Freeze only when you get your dream choice.',
      priority: 'high',
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      id: '4',
      title: 'Consider IIIT for Tech',
      description: 'IIIT Hyderabad and IIIT Delhi have excellent CS programs. Don\'t overlook them for tech careers.',
      priority: 'medium',
      icon: <CheckCircle2 className="h-5 w-5" />
    },
    {
      id: '5',
      title: 'Fill All 6 Rounds',
      description: 'Participate in all rounds for potential upgrades. Many good seats become available in later rounds.',
      priority: 'medium',
      icon: <Clock className="h-5 w-5" />
    }
  ]
};

const commonMistakes = [
  {
    title: 'Not Filling Enough Preferences',
    description: 'Students often fill only 5-10 preferences, limiting their chances. Fill maximum allowed preferences.'
  },
  {
    title: 'Ignoring Cutoff Trends',
    description: 'Past year cutoffs change. Don\'t assume same cutoff will apply. Check 3-year trends.'
  },
  {
    title: 'Following Friends Blindly',
    description: 'Your rank and category are different. Make independent decisions based on your eligibility.'
  },
  {
    title: 'Rushing the Process',
    description: 'Take time to research each college. Don\'t submit preferences at the last minute.'
  },
  {
    title: 'Not Keeping Documents Ready',
    description: 'Missing documents can disqualify you. Prepare all required documents well in advance.'
  }
];

interface CounsellingTipsGuideProps {
  counsellingType: CounsellingType;
  onClose?: () => void;
}

const CounsellingTipsGuide: React.FC<CounsellingTipsGuideProps> = ({ counsellingType, onClose }) => {
  const [activeTab, setActiveTab] = useState('videos');
  
  const videos = videoTutorials[counsellingType];
  const tips = strategyTips[counsellingType];
  
  const counsellingLabels: Record<CounsellingType, string> = {
    tnea: 'TNEA',
    neet: 'NEET UG',
    josaa: 'JoSAA'
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
            <BookOpen className="h-3 w-3 mr-1" />
            Strategy Guide
          </Badge>
          {onClose && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              Close
            </Button>
          )}
        </div>
        <h2 className="text-xl font-bold">
          {counsellingLabels[counsellingType]} Counselling Tips & Strategies
        </h2>
        <p className="text-white/80 text-sm mt-1">
          Learn expert strategies to maximize your chances of getting your dream college
        </p>
      </div>

      <CardContent className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="videos" className="flex items-center gap-1.5">
              <Video className="h-4 w-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-1.5">
              <Lightbulb className="h-4 w-4" />
              Tips
            </TabsTrigger>
            <TabsTrigger value="mistakes" className="flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              Mistakes
            </TabsTrigger>
          </TabsList>

          {/* Video Tutorials Tab */}
          <TabsContent value="videos" className="space-y-3 mt-0">
            <div className="grid gap-3">
              {videos.map((video) => (
                <a
                  key={video.id}
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-md transition-all border hover:border-primary/30">
                    <div className="flex">
                      <div className="relative w-32 h-20 flex-shrink-0 bg-muted">
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-3 flex-1">
                        <Badge variant="secondary" className="text-xs mb-1">
                          {video.category}
                        </Badge>
                        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {video.title}
                        </h4>
                      </div>
                      <div className="flex items-center pr-3">
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </TabsContent>

          {/* Strategy Tips Tab */}
          <TabsContent value="tips" className="space-y-3 mt-0">
            {tips.map((tip) => (
              <Card key={tip.id} className="overflow-hidden hover:shadow-sm transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      tip.priority === 'high' ? 'bg-red-100 text-red-600' :
                      tip.priority === 'medium' ? 'bg-amber-100 text-amber-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {tip.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{tip.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs capitalize ${getPriorityColor(tip.priority)}`}
                        >
                          {tip.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Common Mistakes Tab */}
          <TabsContent value="mistakes" className="space-y-3 mt-0">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 text-amber-700">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">Avoid These Common Mistakes</span>
              </div>
              <p className="text-sm text-amber-600 mt-1">
                Many students make these errors during counselling. Learn from them!
              </p>
            </div>
            
            {commonMistakes.map((mistake, index) => (
              <Card key={index} className="overflow-hidden border-l-4 border-l-red-400">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{mistake.title}</h4>
                      <p className="text-sm text-muted-foreground">{mistake.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CounsellingTipsGuide;
