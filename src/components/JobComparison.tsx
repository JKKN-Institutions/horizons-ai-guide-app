import { X, MapPin, Banknote, Briefcase, Building2, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
  sectors: Array<{ id: string; title: string; icon: string }>;
}

const comparisonFields = [
  { key: 'company', label: 'Company' },
  { key: 'location', label: 'Location' },
  { key: 'salary', label: 'Salary' },
  { key: 'requirement', label: 'Requirements' },
  { key: 'sector', label: 'Sector' },
];

export function JobComparison({ jobs, open, onOpenChange, onRemoveJob, sectors }: JobComparisonProps) {
  const getSectorName = (sectorId: string) => {
    const sector = sectors.find(s => s.id === sectorId);
    return sector ? `${sector.icon} ${sector.title.split(' ')[0]}` : sectorId;
  };

  const renderValue = (job: Job, key: string) => {
    switch (key) {
      case 'sector':
        return getSectorName(job.sector);
      case 'salary':
        return <span className="text-primary font-medium">{job.salary}</span>;
      case 'location':
        return (
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {job.location}
          </span>
        );
      default:
        return job[key as keyof Job] as string;
    }
  };

  if (jobs.length === 0) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5 text-primary" />
            Compare Jobs ({jobs.length})
          </DialogTitle>
          <DialogDescription>
            Compare saved jobs side by side to make better decisions.
            வேலைகளை ஒப்பிட்டுப் பாருங்கள்
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold w-32">Attribute</TableHead>
                {jobs.map((job, idx) => (
                  <TableHead key={idx} className="min-w-[180px]">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-foreground truncate">{job.title}</p>
                        {job.isHot && (
                          <Badge variant="destructive" className="text-xs mt-1">
                            🔥 Hot
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive flex-shrink-0"
                        onClick={() => onRemoveJob(idx)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonFields.map((field) => (
                <TableRow key={field.key} className="hover:bg-muted/30">
                  <TableCell className="font-medium text-muted-foreground">
                    {field.label}
                  </TableCell>
                  {jobs.map((job, idx) => (
                    <TableCell key={idx} className="text-sm">
                      {renderValue(job, field.key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
