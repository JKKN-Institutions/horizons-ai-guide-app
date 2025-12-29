import { X, MapPin, Banknote, Briefcase, Building2, ArrowLeftRight, GraduationCap, TrendingUp, Crown, Sparkles, Download, Loader2, PieChartIcon, Radar, Zap, Target, BookOpen, Percent, CheckCircle2, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as RechartsRadar, Legend } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateComparisonPDF } from '@/components/JobComparison/generateComparisonPDF';
import confetti from 'canvas-confetti';

// Tooltip descriptions for each score factor
const scoreFactorDescriptions: Record<string, { title: string; description: string; factors: string[] }> = {
  Salary: {
    title: 'Salary Score',
    description: 'Based on the maximum salary offered for this position.',
    factors: ['Higher salary = Higher score', 'Compared against industry benchmarks', 'Normalized to 100-point scale']
  },
  Growth: {
    title: 'Growth Potential',
    description: 'Evaluates career advancement opportunities in this sector.',
    factors: ['Sector growth trajectory', 'Industry expansion rate', 'Hot/trending status bonus']
  },
  Demand: {
    title: 'Market Demand',
    description: 'Measures current hiring activity and job availability.',
    factors: ['Number of open positions', 'Competition for talent', 'Sector hiring trends']
  },
  Balance: {
    title: 'Work-Life Balance',
    description: 'Estimates typical work schedule and flexibility.',
    factors: ['Industry work culture', 'Average working hours', 'Remote work potential']
  },
  Access: {
    title: 'Accessibility',
    description: 'How easily you can qualify for this role.',
    factors: ['Education requirements', 'Experience needed', 'Entry barriers']
  }
};

interface Job {
  title: string;
  company: string;
  location: string;
  salary: string;
  requirement: string;
  sector: string;
  isHot: boolean;
}

interface JobComparisonProps {
  jobs: Job[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRemoveJob: (index: number) => void;
  sectors: Array<{ id: string; title: string; icon: string; borderColor: string }>;
}

const sectorColors: Record<string, { bg: string; text: string; border: string; leftBorder: string; gradient: string; iconBg: string }> = {
  tech: { 
    bg: 'bg-blue-50 dark:bg-blue-500/10', 
    text: 'text-blue-700 dark:text-blue-400', 
    border: 'border-blue-200 dark:border-blue-500/30',
    leftBorder: 'border-l-blue-500',
    gradient: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-500/30 dark:to-blue-600/30'
  },
  healthcare: { 
    bg: 'bg-green-50 dark:bg-green-500/10', 
    text: 'text-green-700 dark:text-green-400', 
    border: 'border-green-200 dark:border-green-500/30',
    leftBorder: 'border-l-green-500',
    gradient: 'from-green-500 to-emerald-500',
    iconBg: 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-500/30 dark:to-green-600/30'
  },
  manufacturing: { 
    bg: 'bg-orange-50 dark:bg-orange-500/10', 
    text: 'text-orange-700 dark:text-orange-400', 
    border: 'border-orange-200 dark:border-orange-500/30',
    leftBorder: 'border-l-orange-500',
    gradient: 'from-orange-500 to-amber-500',
    iconBg: 'bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-500/30 dark:to-orange-600/30'
  },
  bfsi: { 
    bg: 'bg-purple-50 dark:bg-purple-500/10', 
    text: 'text-purple-700 dark:text-purple-400', 
    border: 'border-purple-200 dark:border-purple-500/30',
    leftBorder: 'border-l-purple-500',
    gradient: 'from-purple-500 to-violet-500',
    iconBg: 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-500/30 dark:to-purple-600/30'
  },
  ecommerce: { 
    bg: 'bg-pink-50 dark:bg-pink-500/10', 
    text: 'text-pink-700 dark:text-pink-400', 
    border: 'border-pink-200 dark:border-pink-500/30',
    leftBorder: 'border-l-pink-500',
    gradient: 'from-pink-500 to-rose-500',
    iconBg: 'bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-500/30 dark:to-pink-600/30'
  },
  logistics: { 
    bg: 'bg-amber-50 dark:bg-amber-500/10', 
    text: 'text-amber-700 dark:text-amber-400', 
    border: 'border-amber-200 dark:border-amber-500/30',
    leftBorder: 'border-l-amber-500',
    gradient: 'from-amber-500 to-yellow-500',
    iconBg: 'bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-500/30 dark:to-amber-600/30'
  },
  gaming: { 
    bg: 'bg-red-50 dark:bg-red-500/10', 
    text: 'text-red-700 dark:text-red-400', 
    border: 'border-red-200 dark:border-red-500/30',
    leftBorder: 'border-l-red-500',
    gradient: 'from-red-500 to-rose-500',
    iconBg: 'bg-gradient-to-br from-red-100 to-red-200 dark:from-red-500/30 dark:to-red-600/30'
  },
  agritech: { 
    bg: 'bg-lime-50 dark:bg-lime-500/10', 
    text: 'text-lime-700 dark:text-lime-400', 
    border: 'border-lime-200 dark:border-lime-500/30',
    leftBorder: 'border-l-lime-500',
    gradient: 'from-lime-500 to-green-500',
    iconBg: 'bg-gradient-to-br from-lime-100 to-lime-200 dark:from-lime-500/30 dark:to-lime-600/30'
  },
  edtech: { 
    bg: 'bg-indigo-50 dark:bg-indigo-500/10', 
    text: 'text-indigo-700 dark:text-indigo-400', 
    border: 'border-indigo-200 dark:border-indigo-500/30',
    leftBorder: 'border-l-indigo-500',
    gradient: 'from-indigo-500 to-blue-500',
    iconBg: 'bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-500/30 dark:to-indigo-600/30'
  },
  renewable: { 
    bg: 'bg-teal-50 dark:bg-teal-500/10', 
    text: 'text-teal-700 dark:text-teal-400', 
    border: 'border-teal-200 dark:border-teal-500/30',
    leftBorder: 'border-l-teal-500',
    gradient: 'from-teal-500 to-cyan-500',
    iconBg: 'bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-500/30 dark:to-teal-600/30'
  },
};

const defaultSectorColors = { 
  bg: 'bg-gray-50 dark:bg-gray-500/10', 
  text: 'text-gray-700 dark:text-gray-400', 
  border: 'border-gray-200 dark:border-gray-500/30',
  leftBorder: 'border-l-gray-500',
  gradient: 'from-gray-500 to-slate-500',
  iconBg: 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-500/30 dark:to-gray-600/30'
};

// Parse salary string to extract max value for comparison
const parseSalaryMax = (salary: string): number => {
  const matches = salary.match(/(\d+)/g);
  if (!matches) return 0;
  const numbers = matches.map(Number);
  return Math.max(...numbers);
};

// Calculate job score based on salary and other factors
const calculateJobScore = (job: Job): { score: number; reasons: string[] } => {
  let score = 0;
  const reasons: string[] = [];
  
  // Salary score (higher is better) - max 50 points
  const salaryMax = parseSalaryMax(job.salary);
  score += Math.min(salaryMax * 2, 50);
  if (salaryMax >= 20) reasons.push('High salary');
  
  // Hot jobs get bonus points
  if (job.isHot) {
    score += 15;
    reasons.push('Trending');
  }
  
  // Tech and BFSI sectors often have better growth - bonus points
  if (['tech', 'bfsi'].includes(job.sector)) {
    score += 10;
    reasons.push('High-growth sector');
  }
  
  return { score, reasons };
};

export function JobComparison({ jobs, open, onOpenChange, onRemoveJob, sectors }: JobComparisonProps) {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const getSectorInfo = (sectorId: string) => {
    const sector = sectors.find(s => s.id === sectorId);
    const colors = sectorColors[sectorId] || defaultSectorColors;
    return {
      name: sector ? sector.title.split(' ')[0] : sectorId,
      icon: sector?.icon || '💼',
      ...colors
    };
  };

  // Calculate best match based on scores
  const bestMatchIndex = useMemo(() => {
    if (jobs.length < 2) return -1;
    
    let maxScore = -1;
    let bestIdx = -1;
    
    jobs.forEach((job, idx) => {
      const { score } = calculateJobScore(job);
      if (score > maxScore) {
        maxScore = score;
        bestIdx = idx;
      }
    });
    
    return bestIdx;
  }, [jobs]);

  // Get reasons for best match
  const getBestMatchReasons = (idx: number): string[] => {
    if (idx !== bestMatchIndex) return [];
    return calculateJobScore(jobs[idx]).reasons;
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const fileName = generateComparisonPDF(jobs, bestMatchIndex);
      toast({
        title: "PDF Downloaded! 📄",
        description: `${fileName} has been saved to your downloads.`,
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "Export Failed",
        description: "Could not generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Animation state for score circles
  const [animateScores, setAnimateScores] = useState(false);

  // Confetti celebration effect
  const triggerConfetti = useCallback(() => {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Burst from left side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#fbbf24', '#f59e0b', '#d97706', '#10b981', '#3b82f6']
      });

      // Burst from right side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#fbbf24', '#f59e0b', '#d97706', '#10b981', '#3b82f6']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (open && jobs.length >= 2) {
      // Reset and trigger animation when modal opens
      setAnimateScores(false);
      const timer = setTimeout(() => {
        setAnimateScores(true);
        // Trigger confetti after score animation reveals the winner
        setTimeout(() => {
          triggerConfetti();
        }, 600);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open, jobs.length, triggerConfetti]);

  if (jobs.length === 0) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 gap-0">
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground p-6 rounded-t-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <ArrowLeftRight className="h-5 w-5" />
              </div>
              Compare Jobs ({jobs.length})
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/80 mt-2">
              Side-by-side comparison to help you make the best decision
            </DialogDescription>
          </DialogHeader>
        </div>

        <ScrollArea className="max-h-[60vh]">
          <div className="p-6">
            {/* Comparison Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {jobs.map((job, idx) => {
                const sectorInfo = getSectorInfo(job.sector);
                const isBestMatch = idx === bestMatchIndex;
                const bestMatchReasons = getBestMatchReasons(idx);
                
                return (
                  <Card 
                    key={idx} 
                    className={`relative overflow-hidden transition-all hover:shadow-xl hover-scale border-l-4 ${sectorInfo.leftBorder} ${
                      isBestMatch 
                        ? 'ring-2 ring-amber-400 shadow-amber-100 dark:shadow-amber-500/20' 
                        : ''
                    }`}
                  >
                    {/* Colored Top Gradient Bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${sectorInfo.gradient}`} />
                    
                    {/* Best Match Banner */}
                    {isBestMatch && (
                      <div className="absolute top-1 left-0 right-0 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white text-xs font-semibold py-1.5 px-3 flex items-center justify-center gap-1.5 z-20 shadow-lg">
                        <Crown className="w-3.5 h-3.5" />
                        Best Match
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      </div>
                    )}

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute ${isBestMatch ? 'top-10' : 'top-3'} right-2 h-7 w-7 rounded-full bg-background/90 hover:bg-destructive hover:text-destructive-foreground z-10 shadow-sm`}
                      onClick={() => onRemoveJob(idx)}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    {/* Hot Badge */}
                    {job.isHot && (
                      <div className={`absolute ${isBestMatch ? 'top-10' : 'top-3'} left-3 z-10`}>
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 gap-1 shadow-md animate-pulse">
                          🔥 Hot
                        </Badge>
                      </div>
                    )}

                    <CardContent className={`p-4 ${isBestMatch ? 'pt-14' : 'pt-12'}`}>
                      {/* Best Match Reasons */}
                      {isBestMatch && bestMatchReasons.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1">
                          {bestMatchReasons.map((reason, rIdx) => (
                            <Badge key={rIdx} variant="secondary" className="text-xs bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-500/20 dark:to-yellow-500/20 text-amber-700 dark:text-amber-400 border-0">
                              ✨ {reason}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      {/* Job Title & Company */}
                      <div className="mb-4">
                        <h3 className="font-bold text-foreground text-base leading-tight mb-1.5 line-clamp-2">
                          {job.title}
                        </h3>
                        <p className={`font-semibold text-sm flex items-center gap-1.5 ${sectorInfo.text}`}>
                          <div className={`w-5 h-5 rounded ${sectorInfo.iconBg} flex items-center justify-center`}>
                            <Building2 className="w-3 h-3" />
                          </div>
                          {job.company}
                        </p>
                      </div>

                      {/* Details */}
                      <div className="space-y-3">
                        {/* Location */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-500/20 dark:to-cyan-500/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                            <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Location</p>
                            <p className="text-sm font-medium">{job.location}</p>
                          </div>
                        </div>

                        {/* Salary */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-500/20 dark:to-emerald-500/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Banknote className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Salary</p>
                            <p className="text-sm font-bold text-green-600 dark:text-green-400">{job.salary}</p>
                          </div>
                        </div>

                        {/* Requirement */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-500/20 dark:to-violet-500/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                            <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Requirements</p>
                            <p className="text-sm font-medium">{job.requirement}</p>
                          </div>
                        </div>
                      </div>

                      {/* Sector Badge */}
                      <div className="mt-4 pt-4 border-t border-dashed">
                        <Badge 
                          className={`bg-gradient-to-r ${sectorInfo.gradient} text-white border-0 text-xs px-3 py-1.5 shadow-sm`}
                        >
                          {sectorInfo.icon} {sectorInfo.name}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Job Match Percentage Cards */}
            {jobs.length >= 2 && (() => {
              // Calculate comprehensive match score for each job
              const calculateMatchScore = (job: Job): { total: number; breakdown: { label: string; score: number; icon: string; color: string }[] } => {
                const breakdown: { label: string; score: number; icon: string; color: string }[] = [];
                
                // Salary Score (25% weight) - Higher salary = higher score
                const salaryMax = parseSalaryMax(job.salary);
                const salaryScore = Math.min(100, salaryMax * 4);
                breakdown.push({ label: 'Salary', score: salaryScore, icon: '💰', color: 'emerald' });
                
                // Growth Potential (25% weight) - Based on sector and hot status
                const growthScores: Record<string, number> = {
                  tech: 95, bfsi: 85, healthcare: 80, edtech: 75, ecommerce: 70,
                  renewable: 85, gaming: 65, logistics: 60, manufacturing: 55, agritech: 70
                };
                let growthScore = growthScores[job.sector] || 60;
                if (job.isHot) growthScore = Math.min(100, growthScore + 15);
                breakdown.push({ label: 'Growth', score: growthScore, icon: '📈', color: 'blue' });
                
                // Market Demand (20% weight)
                const demandScores: Record<string, number> = {
                  tech: 90, healthcare: 85, bfsi: 80, ecommerce: 75, logistics: 70,
                  manufacturing: 65, edtech: 70, renewable: 75, gaming: 60, agritech: 55
                };
                const demandScore = job.isHot ? Math.min(100, (demandScores[job.sector] || 60) + 15) : (demandScores[job.sector] || 60);
                breakdown.push({ label: 'Demand', score: demandScore, icon: '🔥', color: 'orange' });
                
                // Work-Life Balance (15% weight)
                const wlbScores: Record<string, number> = {
                  edtech: 85, healthcare: 70, bfsi: 65, tech: 60, ecommerce: 55,
                  manufacturing: 75, logistics: 50, gaming: 45, renewable: 70, agritech: 80
                };
                breakdown.push({ label: 'Balance', score: wlbScores[job.sector] || 60, icon: '⚖️', color: 'violet' });
                
                // Accessibility (15% weight) - Based on requirements
                const reqLower = job.requirement.toLowerCase();
                let accessScore = 60;
                if (reqLower.includes('12th') || reqLower.includes('diploma')) accessScore = 90;
                else if (reqLower.includes('bca') || reqLower.includes('b.tech') || reqLower.includes('b.e')) accessScore = 70;
                else if (reqLower.includes('m.tech') || reqLower.includes('mba') || reqLower.includes('m.sc')) accessScore = 50;
                else if (reqLower.includes('phd')) accessScore = 30;
                breakdown.push({ label: 'Access', score: accessScore, icon: '🎓', color: 'cyan' });
                
                // Calculate weighted total
                const total = Math.round(
                  (salaryScore * 0.25) + 
                  (growthScore * 0.25) + 
                  (demandScore * 0.20) + 
                  (wlbScores[job.sector] || 60) * 0.15 + 
                  (accessScore * 0.15)
                );
                
                return { total, breakdown };
              };

              const jobMatches = jobs.map((job, idx) => ({
                ...job,
                idx,
                matchData: calculateMatchScore(job)
              })).sort((a, b) => b.matchData.total - a.matchData.total);

              const getMatchLabel = (score: number): { text: string; color: string } => {
                if (score >= 85) return { text: 'Excellent Match', color: 'emerald' };
                if (score >= 70) return { text: 'Great Match', color: 'blue' };
                if (score >= 55) return { text: 'Good Match', color: 'amber' };
                return { text: 'Fair Match', color: 'orange' };
              };

              return (
                <div className="mt-6 rounded-2xl border border-rose-200/60 dark:border-rose-500/20 overflow-hidden shadow-xl bg-gradient-to-br from-white to-rose-50/30 dark:from-background dark:to-rose-500/5">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 px-5 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                          <Percent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg tracking-tight">Career Match Score</h4>
                          <p className="text-rose-100 text-xs">How well each job fits ideal career criteria</p>
                        </div>
                      </div>
                      <div className="hidden md:flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
                        <Star className="w-4 h-4 text-rose-200" />
                        <span className="text-white text-xs font-medium">AI-Powered Analysis</span>
                      </div>
                    </div>
                  </div>

                  {/* Match Cards */}
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {jobMatches.map((job, rankIdx) => {
                        const sectorInfo = getSectorInfo(job.sector);
                        const matchLabel = getMatchLabel(job.matchData.total);
                        const isTop = rankIdx === 0;
                        
                        return (
                          <div 
                            key={job.idx}
                            className={`relative rounded-xl overflow-hidden transition-all hover:shadow-lg ${
                              animateScores ? 'score-card-animate' : 'opacity-0'
                            } ${
                              isTop 
                                ? 'ring-2 ring-amber-400 shadow-amber-100 dark:shadow-amber-500/20' 
                                : 'border border-border/50'
                            }`}
                            style={{ animationDelay: `${rankIdx * 0.1}s` }}
                          >
                            {/* Rank Badge */}
                            <div className={`absolute top-2 left-2 z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${
                              rankIdx === 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' :
                              rankIdx === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-700' :
                              rankIdx === 2 ? 'bg-gradient-to-br from-orange-300 to-orange-400 text-orange-800' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              #{rankIdx + 1}
                            </div>

                            {/* Top Badge */}
                            {isTop && (
                              <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                                <Crown className="w-3 h-3" /> Best
                              </div>
                            )}

                            {/* Score Circle */}
                            <div className="pt-4 pb-2 px-4 bg-gradient-to-b from-muted/30 to-transparent">
                              <div className="flex items-center justify-center">
                                <div className="relative w-20 h-20">
                                  <svg className="w-20 h-20 -rotate-90">
                                    <circle
                                      cx="40"
                                      cy="40"
                                      r="35"
                                      strokeWidth="6"
                                      fill="none"
                                      className="stroke-muted"
                                    />
                                    <circle
                                      cx="40"
                                      cy="40"
                                      r="35"
                                      strokeWidth="6"
                                      fill="none"
                                      strokeLinecap="round"
                                      className={`${
                                        animateScores ? 'score-circle-animate' : ''
                                      } ${
                                        matchLabel.color === 'emerald' ? 'stroke-emerald-500' :
                                        matchLabel.color === 'blue' ? 'stroke-blue-500' :
                                        matchLabel.color === 'amber' ? 'stroke-amber-500' :
                                        'stroke-orange-500'
                                      }`}
                                      strokeDasharray={animateScores ? `${(job.matchData.total / 100) * 220} 220` : '0 220'}
                                      style={{ animationDelay: `${rankIdx * 0.15}s` }}
                                    />
                                  </svg>
                                  <div className={`absolute inset-0 flex flex-col items-center justify-center ${
                                    animateScores ? 'score-number-animate' : 'opacity-0'
                                  }`} style={{ animationDelay: `${0.5 + rankIdx * 0.1}s` }}>
                                    <span className="text-2xl font-bold text-foreground">{job.matchData.total}</span>
                                    <span className="text-[10px] text-muted-foreground">/ 100</span>
                                  </div>
                                </div>
                              </div>
                              <p className={`text-center text-xs font-semibold mt-1 ${
                                matchLabel.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
                                matchLabel.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                                matchLabel.color === 'amber' ? 'text-amber-600 dark:text-amber-400' :
                                'text-orange-600 dark:text-orange-400'
                              }`}>
                                {matchLabel.text}
                              </p>
                            </div>

                            {/* Job Info */}
                            <div className="px-4 pb-3 pt-2 border-t border-border/30">
                              <p className="font-bold text-sm text-foreground truncate">{job.title}</p>
                              <p className={`text-xs ${sectorInfo.text} truncate`}>{job.company}</p>
                            </div>

                            {/* Breakdown */}
                            <TooltipProvider delayDuration={100}>
                              <div className="px-4 pb-4 space-y-2">
                                {job.matchData.breakdown.map((item, bIdx) => {
                                  const factorInfo = scoreFactorDescriptions[item.label];
                                  const getScoreRating = (score: number) => {
                                    if (score >= 85) return { text: 'Excellent', color: 'text-emerald-500' };
                                    if (score >= 70) return { text: 'Good', color: 'text-blue-500' };
                                    if (score >= 55) return { text: 'Average', color: 'text-amber-500' };
                                    return { text: 'Below Average', color: 'text-orange-500' };
                                  };
                                  const rating = getScoreRating(item.score);
                                  
                                  return (
                                    <Tooltip key={bIdx}>
                                      <TooltipTrigger asChild>
                                        <div className="flex items-center gap-2 cursor-pointer group">
                                          <span className={`text-xs w-4 ${animateScores ? 'breakdown-icon-animate' : 'opacity-0'}`} style={{ animationDelay: `${0.8 + rankIdx * 0.1 + bIdx * 0.05}s` }}>{item.icon}</span>
                                          <div className="flex-1">
                                            <div className="flex justify-between items-center mb-0.5">
                                              <span className={`text-[10px] text-muted-foreground group-hover:text-foreground transition-colors ${animateScores ? 'breakdown-label-animate' : 'opacity-0'}`} style={{ animationDelay: `${0.8 + rankIdx * 0.1 + bIdx * 0.05}s` }}>{item.label}</span>
                                              <span className={`text-[10px] font-medium text-foreground ${animateScores ? 'breakdown-score-animate' : 'opacity-0'}`} style={{ animationDelay: `${1.0 + rankIdx * 0.1 + bIdx * 0.05}s` }}>{item.score}%</span>
                                            </div>
                                            <div className="h-1.5 rounded-full bg-muted overflow-hidden group-hover:h-2 transition-all">
                                              <div 
                                                className={`h-full rounded-full transition-all group-hover:shadow-md ${
                                                  animateScores ? 'breakdown-bar-animate' : ''
                                                } ${
                                                  item.color === 'emerald' ? 'bg-emerald-500 group-hover:bg-emerald-400' :
                                                  item.color === 'blue' ? 'bg-blue-500 group-hover:bg-blue-400' :
                                                  item.color === 'orange' ? 'bg-orange-500 group-hover:bg-orange-400' :
                                                  item.color === 'violet' ? 'bg-violet-500 group-hover:bg-violet-400' :
                                                  'bg-cyan-500 group-hover:bg-cyan-400'
                                                }`}
                                                style={{ 
                                                  width: animateScores ? `${item.score}%` : '0%',
                                                  animationDelay: `${0.9 + rankIdx * 0.1 + bIdx * 0.08}s`
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent 
                                        side="left" 
                                        className="max-w-[240px] p-0 bg-background/98 backdrop-blur-md border border-border/50 shadow-2xl"
                                      >
                                        <div className="p-3 space-y-2">
                                          <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-2">
                                              <span className="text-base">{item.icon}</span>
                                              <span className="font-bold text-sm text-foreground">{factorInfo?.title || item.label}</span>
                                            </div>
                                            <Badge variant="outline" className={`text-[10px] ${rating.color}`}>
                                              {rating.text}
                                            </Badge>
                                          </div>
                                          <p className="text-xs text-muted-foreground leading-relaxed">
                                            {factorInfo?.description || 'Score based on job characteristics.'}
                                          </p>
                                          <div className="flex items-center gap-2 py-1.5 px-2 bg-muted/50 rounded-lg">
                                            <div className={`text-xl font-bold ${rating.color}`}>{item.score}%</div>
                                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                              <div 
                                                className={`h-full rounded-full ${
                                                  item.color === 'emerald' ? 'bg-emerald-500' :
                                                  item.color === 'blue' ? 'bg-blue-500' :
                                                  item.color === 'orange' ? 'bg-orange-500' :
                                                  item.color === 'violet' ? 'bg-violet-500' :
                                                  'bg-cyan-500'
                                                }`}
                                                style={{ width: `${item.score}%` }}
                                              />
                                            </div>
                                          </div>
                                          {factorInfo?.factors && (
                                            <div className="pt-2 border-t border-border/50">
                                              <p className="text-[10px] font-medium text-muted-foreground mb-1.5">Factors considered:</p>
                                              <ul className="space-y-1">
                                                {factorInfo.factors.map((factor, fIdx) => (
                                                  <li key={fIdx} className="flex items-start gap-1.5 text-[10px] text-muted-foreground">
                                                    <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                                                    <span>{factor}</span>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}
                                        </div>
                                      </TooltipContent>
                                    </Tooltip>
                                  );
                                })}
                              </div>
                            </TooltipProvider>
                          </div>
                        );
                      })}
                    </div>

                    {/* Legend */}
                    <div className="mt-4 pt-4 border-t border-rose-100 dark:border-rose-500/10 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>85+ Excellent</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                        <span>70-84 Great</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                        <span>55-69 Good</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
                        <span>&lt;55 Fair</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Salary Insights Chart */}
            {jobs.length >= 2 && (
              <div className="mt-6 rounded-2xl border border-emerald-200/60 dark:border-emerald-500/20 overflow-hidden shadow-xl bg-gradient-to-br from-white to-emerald-50/30 dark:from-background dark:to-emerald-500/5">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <Banknote className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg tracking-tight">Salary Insights</h4>
                        <p className="text-emerald-100 text-xs">Annual Package Comparison (in Lakhs)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-200" />
                      <span className="text-white text-xs font-medium">Live Data</span>
                    </div>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="p-5">
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart 
                      data={jobs.map((job, idx) => ({
                        name: job.company,
                        salary: parseSalaryMax(job.salary),
                        fullTitle: job.title,
                        company: job.company,
                        salaryText: job.salary,
                        sector: job.sector,
                        isBest: idx === bestMatchIndex
                      }))}
                      layout="vertical"
                      margin={{ top: 5, right: 40, left: 5, bottom: 5 }}
                    >
                      <XAxis 
                        type="number" 
                        tickFormatter={(value) => `₹${value}L`}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }}
                        domain={[0, 'dataMax + 5']}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={90}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: 'hsl(var(--foreground))', fontWeight: 600 }}
                      />
                      <RechartsTooltip 
                        cursor={{ fill: 'hsl(var(--muted)/0.2)', radius: 8 }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            const sectorInfo = getSectorInfo(data.sector);
                            return (
                              <div className="bg-background/98 backdrop-blur-md border border-border/50 rounded-xl shadow-2xl p-4 min-w-[200px]">
                                <div className="flex items-start justify-between gap-3 mb-2">
                                  <div>
                                    <p className="font-bold text-foreground text-sm">{data.fullTitle}</p>
                                    <p className="text-xs text-muted-foreground">{data.company}</p>
                                  </div>
                                  {data.isBest && (
                                    <div className="flex items-center gap-1 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-500/20 dark:to-yellow-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold px-2 py-1 rounded-full">
                                      <Crown className="w-3 h-3" /> Top Pick
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${sectorInfo.gradient} flex items-center justify-center`}>
                                    <Banknote className="w-4 h-4 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">Annual Package</p>
                                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                      {data.salaryText}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar 
                        dataKey="salary" 
                        radius={[0, 12, 12, 0]}
                        maxBarSize={36}
                      >
                        {jobs.map((job, idx) => {
                          const gradientColors: Record<string, string> = {
                            tech: '#10b981',
                            healthcare: '#22c55e',
                            manufacturing: '#059669',
                            bfsi: '#14b8a6',
                            ecommerce: '#34d399',
                            logistics: '#6ee7b7',
                            gaming: '#4ade80',
                            agritech: '#22c55e',
                            edtech: '#10b981',
                            renewable: '#059669',
                          };
                          const color = gradientColors[job.sector] || '#22c55e';
                          return (
                            <Cell 
                              key={idx} 
                              fill={idx === bestMatchIndex ? '#fbbf24' : color}
                              stroke={idx === bestMatchIndex ? '#f59e0b' : 'transparent'}
                              strokeWidth={idx === bestMatchIndex ? 2 : 0}
                            />
                          );
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>

                  {/* Legend */}
                  <div className="flex flex-wrap justify-center items-center gap-4 mt-4 pt-4 border-t border-emerald-100 dark:border-emerald-500/10">
                    {jobs.map((job, idx) => {
                      const sectorInfo = getSectorInfo(job.sector);
                      const isBest = idx === bestMatchIndex;
                      return (
                        <div 
                          key={idx} 
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            isBest 
                              ? 'bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-500/20 dark:to-yellow-500/20 text-amber-700 dark:text-amber-400 shadow-sm' 
                              : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                          }`}
                        >
                          <div className={`w-2.5 h-2.5 rounded-full ${isBest ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                          <span>{job.company}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="font-bold">{job.salary}</span>
                          {isBest && <Crown className="w-3 h-3 text-amber-500" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Sector Distribution Donut Chart */}
            {jobs.length >= 2 && (() => {
              // Calculate sector distribution
              const sectorCounts: Record<string, { count: number; jobs: string[] }> = {};
              jobs.forEach(job => {
                if (!sectorCounts[job.sector]) {
                  sectorCounts[job.sector] = { count: 0, jobs: [] };
                }
                sectorCounts[job.sector].count += 1;
                sectorCounts[job.sector].jobs.push(job.title);
              });

              const sectorChartData = Object.entries(sectorCounts).map(([sector, data]) => {
                const sectorInfo = getSectorInfo(sector);
                const gradientColors: Record<string, string> = {
                  tech: '#3b82f6',
                  healthcare: '#22c55e',
                  manufacturing: '#f97316',
                  bfsi: '#a855f7',
                  ecommerce: '#ec4899',
                  logistics: '#f59e0b',
                  gaming: '#ef4444',
                  agritech: '#84cc16',
                  edtech: '#6366f1',
                  renewable: '#14b8a6',
                };
                return {
                  name: sectorInfo.name,
                  value: data.count,
                  jobs: data.jobs,
                  color: gradientColors[sector] || '#6b7280',
                  icon: sectorInfo.icon,
                  gradient: sectorInfo.gradient
                };
              });

              return (
                <div className="mt-6 rounded-2xl border border-violet-200/60 dark:border-violet-500/20 overflow-hidden shadow-xl bg-gradient-to-br from-white to-violet-50/30 dark:from-background dark:to-violet-500/5">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-5 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                          <PieChartIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg tracking-tight">Sector Distribution</h4>
                          <p className="text-violet-100 text-xs">Industry breakdown of selected jobs</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
                        <Briefcase className="w-4 h-4 text-violet-200" />
                        <span className="text-white text-xs font-medium">{Object.keys(sectorCounts).length} Sectors</span>
                      </div>
                    </div>
                  </div>

                  {/* Chart Area */}
                  <div className="p-5">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      {/* Donut Chart */}
                      <div className="relative">
                        <ResponsiveContainer width={200} height={200}>
                          <PieChart>
                            <Pie
                              data={sectorChartData}
                              cx="50%"
                              cy="50%"
                              innerRadius={55}
                              outerRadius={85}
                              paddingAngle={4}
                              dataKey="value"
                              stroke="none"
                            >
                              {sectorChartData.map((entry, idx) => (
                                <Cell key={idx} fill={entry.color} />
                              ))}
                            </Pie>
                            <RechartsTooltip
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                    <div className="bg-background/98 backdrop-blur-md border border-border/50 rounded-xl shadow-2xl p-3 min-w-[160px]">
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">{data.icon}</span>
                                        <span className="font-bold text-foreground">{data.name}</span>
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        {data.value} job{data.value > 1 ? 's' : ''} selected
                                      </p>
                                      <div className="mt-2 pt-2 border-t border-border/50 space-y-1">
                                        {data.jobs.map((job: string, jIdx: number) => (
                                          <p key={jIdx} className="text-xs text-muted-foreground truncate">• {job}</p>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        {/* Center Label */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-3xl font-bold text-foreground">{jobs.length}</span>
                          <span className="text-xs text-muted-foreground">Jobs</span>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        {sectorChartData.map((sector, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-muted/50 to-muted/20 hover:from-muted/70 hover:to-muted/40 transition-all"
                          >
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                              style={{ backgroundColor: sector.color + '20' }}
                            >
                              <span className="text-lg">{sector.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-foreground truncate">{sector.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {sector.value} job{sector.value > 1 ? 's' : ''} • {Math.round((sector.value / jobs.length) * 100)}%
                              </p>
                            </div>
                            <div 
                              className="w-3 h-3 rounded-full shadow-sm"
                              style={{ backgroundColor: sector.color }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Multi-Dimension Radar Chart */}
            {jobs.length >= 2 && (() => {
              // Calculate dimension scores for each job
              const getRequirementScore = (req: string): number => {
                const reqLower = req.toLowerCase();
                if (reqLower.includes('phd') || reqLower.includes('doctorate')) return 100;
                if (reqLower.includes('m.tech') || reqLower.includes('mba') || reqLower.includes('m.sc')) return 80;
                if (reqLower.includes('b.tech') || reqLower.includes('b.e') || reqLower.includes('bca')) return 60;
                if (reqLower.includes('diploma') || reqLower.includes('12th')) return 40;
                return 50;
              };

              const getGrowthScore = (sector: string, isHot: boolean): number => {
                const sectorGrowth: Record<string, number> = {
                  tech: 95, bfsi: 85, healthcare: 80, edtech: 75,
                  ecommerce: 70, renewable: 85, gaming: 65, logistics: 60,
                  manufacturing: 55, agritech: 70
                };
                let score = sectorGrowth[sector] || 50;
                if (isHot) score = Math.min(100, score + 15);
                return score;
              };

              const getStabilityScore = (sector: string): number => {
                const stability: Record<string, number> = {
                  healthcare: 90, bfsi: 85, manufacturing: 80, tech: 70,
                  edtech: 65, logistics: 75, renewable: 70, ecommerce: 55,
                  gaming: 50, agritech: 60
                };
                return stability[sector] || 60;
              };

              const getFlexibilityScore = (sector: string): number => {
                const flexibility: Record<string, number> = {
                  tech: 95, edtech: 90, ecommerce: 85, gaming: 80,
                  bfsi: 60, healthcare: 50, manufacturing: 40, logistics: 55,
                  renewable: 65, agritech: 50
                };
                return flexibility[sector] || 55;
              };

              const dimensions = ['Salary', 'Growth', 'Stability', 'Entry Level', 'Flexibility'];
              
              const radarData = dimensions.map(dim => {
                const dataPoint: Record<string, any> = { dimension: dim };
                jobs.forEach((job, idx) => {
                  let score = 0;
                  switch(dim) {
                    case 'Salary':
                      score = Math.min(100, parseSalaryMax(job.salary) * 4);
                      break;
                    case 'Growth':
                      score = getGrowthScore(job.sector, job.isHot);
                      break;
                    case 'Stability':
                      score = getStabilityScore(job.sector);
                      break;
                    case 'Entry Level':
                      score = 100 - getRequirementScore(job.requirement);
                      break;
                    case 'Flexibility':
                      score = getFlexibilityScore(job.sector);
                      break;
                  }
                  dataPoint[`job${idx}`] = score;
                  dataPoint[`job${idx}Name`] = job.company;
                });
                return dataPoint;
              });

              const chartColors = ['#3b82f6', '#22c55e', '#f97316', '#a855f7'];

              return (
                <div className="mt-6 rounded-2xl border border-cyan-200/60 dark:border-cyan-500/20 overflow-hidden shadow-xl bg-gradient-to-br from-white to-cyan-50/30 dark:from-background dark:to-cyan-500/5">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 px-5 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                          <Radar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg tracking-tight">Multi-Dimension Analysis</h4>
                          <p className="text-cyan-100 text-xs">Compare jobs across key career factors</p>
                        </div>
                      </div>
                      <div className="hidden md:flex items-center gap-3">
                        <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
                          <Target className="w-3.5 h-3.5 text-cyan-200" />
                          <span className="text-white text-xs font-medium">5 Factors</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chart Area */}
                  <div className="p-5">
                    <div className="flex flex-col lg:flex-row items-center gap-6">
                      {/* Radar Chart */}
                      <div className="w-full lg:w-2/3">
                        <ResponsiveContainer width="100%" height={300}>
                          <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                            <PolarGrid 
                              stroke="hsl(var(--border))" 
                              strokeDasharray="3 3"
                            />
                            <PolarAngleAxis 
                              dataKey="dimension" 
                              tick={{ 
                                fontSize: 11, 
                                fill: 'hsl(var(--foreground))',
                                fontWeight: 600
                              }}
                            />
                            <PolarRadiusAxis 
                              angle={90} 
                              domain={[0, 100]}
                              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                              tickCount={5}
                            />
                            {jobs.map((job, idx) => (
                              <RechartsRadar
                                key={idx}
                                name={job.company}
                                dataKey={`job${idx}`}
                                stroke={chartColors[idx % chartColors.length]}
                                fill={chartColors[idx % chartColors.length]}
                                fillOpacity={0.15}
                                strokeWidth={2}
                              />
                            ))}
                            <RechartsTooltip
                              content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                  return (
                                    <div className="bg-background/98 backdrop-blur-md border border-border/50 rounded-xl shadow-2xl p-3 min-w-[180px]">
                                      <p className="font-bold text-foreground text-sm mb-2">{label}</p>
                                      <div className="space-y-1.5">
                                        {payload.map((entry: any, idx: number) => (
                                          <div key={idx} className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-2">
                                              <div 
                                                className="w-2.5 h-2.5 rounded-full"
                                                style={{ backgroundColor: entry.color }}
                                              />
                                              <span className="text-xs text-muted-foreground">{entry.name}</span>
                                            </div>
                                            <span className="text-sm font-bold" style={{ color: entry.color }}>
                                              {entry.value}%
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Legend & Dimension Explanations */}
                      <div className="w-full lg:w-1/3 space-y-3">
                        {/* Job Legend */}
                        <div className="p-3 rounded-xl bg-gradient-to-r from-muted/50 to-muted/20 border border-border/50">
                          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Jobs</p>
                          <div className="space-y-2">
                            {jobs.map((job, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full shadow-sm"
                                  style={{ backgroundColor: chartColors[idx % chartColors.length] }}
                                />
                                <span className="text-sm font-medium text-foreground truncate">{job.company}</span>
                                {idx === bestMatchIndex && <Crown className="w-3.5 h-3.5 text-amber-500" />}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Dimension Guide */}
                        <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-50/50 to-blue-50/50 dark:from-cyan-500/5 dark:to-blue-500/5 border border-cyan-200/30 dark:border-cyan-500/10">
                          <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-400 mb-2 uppercase tracking-wider">Factor Guide</p>
                          <div className="space-y-1.5 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Banknote className="w-3.5 h-3.5 text-emerald-500" />
                              <span><strong>Salary</strong> – Package value</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                              <span><strong>Growth</strong> – Career trajectory</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="w-3.5 h-3.5 text-violet-500" />
                              <span><strong>Stability</strong> – Job security</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-3.5 h-3.5 text-orange-500" />
                              <span><strong>Entry Level</strong> – Accessibility</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Zap className="w-3.5 h-3.5 text-cyan-500" />
                              <span><strong>Flexibility</strong> – Work options</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Comparison Summary Table */}
            {jobs.length >= 2 && (
              <div className="mt-6 rounded-xl border-2 border-primary/20 overflow-hidden shadow-lg">
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-4 py-3 border-b border-primary/10">
                  <h4 className="font-semibold flex items-center gap-2 text-primary">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-primary-foreground" />
                    </div>
                    Quick Comparison Summary
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-muted/70 to-muted/30">
                      <tr>
                        <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Attribute</th>
                        {jobs.map((job, idx) => {
                          const sectorInfo = getSectorInfo(job.sector);
                          return (
                            <th 
                              key={idx} 
                              className={`text-left p-3 text-sm font-bold min-w-[150px] border-l-2 ${sectorInfo.leftBorder} ${
                                idx === bestMatchIndex ? 'bg-gradient-to-b from-amber-50 to-amber-100/50 dark:from-amber-500/10 dark:to-amber-500/5' : ''
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="line-clamp-1">{job.title.length > 18 ? job.title.slice(0, 18) + '...' : job.title}</span>
                                {idx === bestMatchIndex && (
                                  <Crown className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                )}
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3 text-sm text-muted-foreground font-medium flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-blue-500" /> Company
                        </td>
                        {jobs.map((job, idx) => {
                          const sectorInfo = getSectorInfo(job.sector);
                          return (
                            <td key={idx} className={`p-3 text-sm font-semibold border-l-2 ${sectorInfo.leftBorder} ${sectorInfo.text}`}>
                              {job.company}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-t bg-muted/10">
                        <td className="p-3 text-sm text-muted-foreground font-medium flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-cyan-500" /> Location
                        </td>
                        {jobs.map((job, idx) => {
                          const sectorInfo = getSectorInfo(job.sector);
                          return (
                            <td key={idx} className={`p-3 text-sm border-l-2 ${sectorInfo.leftBorder}`}>
                              {job.location}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 text-sm text-muted-foreground font-medium flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-green-500" /> Salary
                        </td>
                        {jobs.map((job, idx) => {
                          const sectorInfo = getSectorInfo(job.sector);
                          return (
                            <td key={idx} className={`p-3 text-sm font-bold text-green-600 dark:text-green-400 border-l-2 ${sectorInfo.leftBorder}`}>
                              {job.salary}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-t bg-muted/10">
                        <td className="p-3 text-sm text-muted-foreground font-medium flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-purple-500" /> Requirements
                        </td>
                        {jobs.map((job, idx) => {
                          const sectorInfo = getSectorInfo(job.sector);
                          return (
                            <td key={idx} className={`p-3 text-sm border-l-2 ${sectorInfo.leftBorder}`}>
                              {job.requirement}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-t bg-muted/10">
                        <td className="p-3 text-sm text-muted-foreground font-medium flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-indigo-500" /> Sector
                        </td>
                        {jobs.map((job, idx) => {
                          const sectorInfo = getSectorInfo(job.sector);
                          return (
                            <td key={idx} className={`p-3 border-l-2 ${sectorInfo.leftBorder}`}>
                              <Badge className={`bg-gradient-to-r ${sectorInfo.gradient} text-white text-xs border-0`}>
                                {sectorInfo.icon} {sectorInfo.name}
                              </Badge>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Footer */}
        <div className="flex justify-between items-center gap-3 p-4 border-t bg-gradient-to-r from-muted/50 to-muted/20">
          <div className="text-xs text-muted-foreground">
            {jobs.length} job{jobs.length > 1 ? 's' : ''} compared
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleExportPDF}
              disabled={isExporting}
              className="gap-2 border-primary/30 hover:bg-primary/5"
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {isExporting ? 'Generating...' : 'Download PDF'}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
