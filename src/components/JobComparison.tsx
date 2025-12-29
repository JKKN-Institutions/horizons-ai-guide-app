import { X, MapPin, Banknote, Briefcase, Building2, ArrowLeftRight, GraduationCap, TrendingUp, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { useMemo } from 'react';

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

const sectorColors: Record<string, { bg: string; text: string; border: string }> = {
  tech: { bg: 'bg-blue-50 dark:bg-blue-500/10', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-500/30' },
  healthcare: { bg: 'bg-green-50 dark:bg-green-500/10', text: 'text-green-700 dark:text-green-400', border: 'border-green-200 dark:border-green-500/30' },
  manufacturing: { bg: 'bg-orange-50 dark:bg-orange-500/10', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-500/30' },
  bfsi: { bg: 'bg-purple-50 dark:bg-purple-500/10', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-500/30' },
  ecommerce: { bg: 'bg-pink-50 dark:bg-pink-500/10', text: 'text-pink-700 dark:text-pink-400', border: 'border-pink-200 dark:border-pink-500/30' },
  logistics: { bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-500/30' },
  gaming: { bg: 'bg-red-50 dark:bg-red-500/10', text: 'text-red-700 dark:text-red-400', border: 'border-red-200 dark:border-red-500/30' },
  agritech: { bg: 'bg-lime-50 dark:bg-lime-500/10', text: 'text-lime-700 dark:text-lime-400', border: 'border-lime-200 dark:border-lime-500/30' },
  edtech: { bg: 'bg-indigo-50 dark:bg-indigo-500/10', text: 'text-indigo-700 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-500/30' },
  renewable: { bg: 'bg-teal-50 dark:bg-teal-500/10', text: 'text-teal-700 dark:text-teal-400', border: 'border-teal-200 dark:border-teal-500/30' },
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
  const getSectorInfo = (sectorId: string) => {
    const sector = sectors.find(s => s.id === sectorId);
    const colors = sectorColors[sectorId] || { bg: 'bg-gray-50 dark:bg-gray-500/10', text: 'text-gray-700 dark:text-gray-400', border: 'border-gray-200 dark:border-gray-500/30' };
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
                    className={`relative overflow-hidden transition-all hover:shadow-lg ${
                      isBestMatch 
                        ? 'ring-2 ring-amber-400 border-amber-300 dark:border-amber-500' 
                        : `${sectorInfo.border} border-2`
                    }`}
                  >
                    {/* Best Match Banner */}
                    {isBestMatch && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white text-xs font-semibold py-1.5 px-3 flex items-center justify-center gap-1.5 z-20">
                        <Crown className="w-3.5 h-3.5" />
                        Best Match
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute ${isBestMatch ? 'top-9' : 'top-2'} right-2 h-7 w-7 rounded-full bg-background/80 hover:bg-destructive hover:text-destructive-foreground z-10`}
                      onClick={() => onRemoveJob(idx)}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    {/* Hot Badge */}
                    {job.isHot && (
                      <div className={`absolute ${isBestMatch ? 'top-9' : 'top-2'} left-2 z-10`}>
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 gap-1">
                          🔥 Hot
                        </Badge>
                      </div>
                    )}

                    <CardContent className={`p-4 ${isBestMatch ? 'pt-12' : 'pt-10'}`}>
                      {/* Best Match Reasons */}
                      {isBestMatch && bestMatchReasons.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1">
                          {bestMatchReasons.map((reason, rIdx) => (
                            <Badge key={rIdx} variant="secondary" className="text-xs bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-0">
                              {reason}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {/* Job Title & Company */}
                      <div className="mb-4">
                        <h3 className="font-bold text-foreground text-base leading-tight mb-1 line-clamp-2">
                          {job.title}
                        </h3>
                        <p className="text-primary font-medium text-sm flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {job.company}
                        </p>
                      </div>

                      {/* Details */}
                      <div className="space-y-3">
                        {/* Location */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Location</p>
                            <p className="text-sm font-medium">{job.location}</p>
                          </div>
                        </div>

                        {/* Salary */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <Banknote className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Salary</p>
                            <p className="text-sm font-semibold text-green-600 dark:text-green-400">{job.salary}</p>
                          </div>
                        </div>

                        {/* Requirement */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                            <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Requirements</p>
                            <p className="text-sm font-medium">{job.requirement}</p>
                          </div>
                        </div>
                      </div>

                      {/* Sector Badge */}
                      <div className="mt-4 pt-4 border-t">
                        <Badge 
                          variant="outline" 
                          className={`${sectorInfo.bg} ${sectorInfo.text} ${sectorInfo.border} border text-xs px-3 py-1`}
                        >
                          {sectorInfo.icon} {sectorInfo.name}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Comparison Summary Table */}
            {jobs.length >= 2 && (
              <div className="mt-6 rounded-xl border overflow-hidden">
                <div className="bg-muted/50 px-4 py-3 border-b">
                  <h4 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Quick Comparison
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Attribute</th>
                        {jobs.map((job, idx) => (
                          <th key={idx} className={`text-left p-3 text-sm font-semibold min-w-[150px] ${idx === bestMatchIndex ? 'bg-amber-50 dark:bg-amber-500/10' : ''}`}>
                            <div className="flex items-center gap-2">
                              {job.title.length > 20 ? job.title.slice(0, 20) + '...' : job.title}
                              {idx === bestMatchIndex && (
                                <Crown className="w-4 h-4 text-amber-500" />
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3 text-sm text-muted-foreground font-medium">Company</td>
                        {jobs.map((job, idx) => (
                          <td key={idx} className="p-3 text-sm font-medium text-primary">{job.company}</td>
                        ))}
                      </tr>
                      <tr className="border-t bg-muted/20">
                        <td className="p-3 text-sm text-muted-foreground font-medium">Location</td>
                        {jobs.map((job, idx) => (
                          <td key={idx} className="p-3 text-sm">{job.location}</td>
                        ))}
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 text-sm text-muted-foreground font-medium">Salary</td>
                        {jobs.map((job, idx) => (
                          <td key={idx} className="p-3 text-sm font-semibold text-green-600 dark:text-green-400">{job.salary}</td>
                        ))}
                      </tr>
                      <tr className="border-t bg-muted/20">
                        <td className="p-3 text-sm text-muted-foreground font-medium">Requirements</td>
                        {jobs.map((job, idx) => (
                          <td key={idx} className="p-3 text-sm">{job.requirement}</td>
                        ))}
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 text-sm text-muted-foreground font-medium">Sector</td>
                        {jobs.map((job, idx) => {
                          const sectorInfo = getSectorInfo(job.sector);
                          return (
                            <td key={idx} className="p-3">
                              <Badge variant="outline" className={`${sectorInfo.bg} ${sectorInfo.text} text-xs`}>
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
        <div className="flex justify-end gap-3 p-4 border-t bg-muted/30">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
