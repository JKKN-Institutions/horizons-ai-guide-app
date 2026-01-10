import { useState } from 'react';
import { X, TrendingUp, Bookmark, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface IndustryTrendsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const industryGrowthData = [
  {
    id: 'ai_ml',
    title: 'AI & Machine Learning',
    growth: '+42%',
    icon: '🤖',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    id: 'cloud',
    title: 'Cloud Computing',
    growth: '+38%',
    icon: '☁️',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    growth: '+35%',
    icon: '🔒',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    id: 'ev',
    title: 'Electric Vehicles',
    growth: '+48%',
    icon: '🔋',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  {
    id: 'healthcare',
    title: 'Healthcare Tech',
    growth: '+32%',
    icon: '🏥',
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
  },
  {
    id: 'digital_marketing',
    title: 'Digital Marketing',
    growth: '+28%',
    icon: '📱',
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
  },
];

export const IndustryTrendsModal = ({ open, onOpenChange }: IndustryTrendsModalProps) => {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    const saved = localStorage.getItem('industryTrendsSavedJobs');
    return saved ? JSON.parse(saved) : [];
  });

  const handleViewAllJobs = () => {
    onOpenChange(false);
    navigate('/career-assessment/industry-trends');
  };

  const handleViewSavedJobs = () => {
    onOpenChange(false);
    navigate('/career-assessment/industry-trends?view=saved');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white p-6 rounded-t-lg relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl transform -translate-x-1/2 translate-y-1/2" />
          
          <DialogHeader className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                India's Job Market 2026
              </Badge>
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-white">
              🚀 Trending Career Opportunities
            </DialogTitle>
            <p className="text-emerald-100 mt-2">
              Explore high-demand roles in AI, Cloud, EV, Healthcare & more
            </p>
            <p className="text-amber-300 text-sm mt-1 font-tamil">
              AI, மேகக்கணினி, EV, சுகாதாரம் போன்ற துறைகளில் உயர் தேவையான பணிகளை ஆராயுங்கள்
            </p>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Industry Growth Cards */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              Industry Growth Trends 2026
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {industryGrowthData.map((industry) => (
                <Card 
                  key={industry.id}
                  className={`${industry.bgColor} ${industry.borderColor} border-2 hover:shadow-md transition-all duration-200 cursor-pointer group`}
                >
                  <CardContent className="p-4 text-center">
                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">
                      {industry.icon}
                    </span>
                    <h4 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">
                      {industry.title}
                    </h4>
                    <Badge className={`bg-gradient-to-r ${industry.color} text-white border-0 text-sm font-bold`}>
                      {industry.growth}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              variant="outline"
              className="flex-1 py-6 border-2 border-amber-300 text-amber-700 hover:bg-amber-50 font-semibold"
              onClick={handleViewSavedJobs}
            >
              <Bookmark className="h-5 w-5 mr-2" />
              Saved Jobs
              {savedJobs.length > 0 && (
                <Badge className="ml-2 bg-amber-500 text-white">{savedJobs.length}</Badge>
              )}
            </Button>
            <Button
              className="flex-1 py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold"
              onClick={handleViewAllJobs}
            >
              View All Jobs
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
