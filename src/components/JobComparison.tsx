import { X, MapPin, Banknote, Briefcase, Building2, ArrowLeftRight, GraduationCap, TrendingUp, Crown, Sparkles, Download, Loader2, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { useMemo, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateComparisonPDF } from '@/components/JobComparison/generateComparisonPDF';

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
                      <Tooltip 
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
