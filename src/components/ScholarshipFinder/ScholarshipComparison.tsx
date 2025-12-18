import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Scholarship } from './types';
import { X, ExternalLink, CheckCircle2, XCircle } from 'lucide-react';

interface ScholarshipComparisonProps {
  scholarships: Scholarship[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRemove: (id: string) => void;
}

const comparisonFields = [
  { key: 'amount', label: 'Amount' },
  { key: 'provider', label: 'Provider' },
  { key: 'deadline', label: 'Deadline' },
  { key: 'educationLevel', label: 'Education Level' },
  { key: 'category', label: 'Category' },
  { key: 'gender', label: 'Gender' },
  { key: 'incomeLimit', label: 'Income Limit' },
  { key: 'state', label: 'State' },
  { key: 'eligibility', label: 'Eligibility' },
  { key: 'documents', label: 'Documents Required' },
];

export const ScholarshipComparison = ({ 
  scholarships, 
  open, 
  onOpenChange,
  onRemove 
}: ScholarshipComparisonProps) => {
  const renderValue = (scholarship: Scholarship, key: string) => {
    const value = scholarship[key as keyof Scholarship];
    
    if (Array.isArray(value)) {
      return (
        <div className="space-y-1">
          {value.slice(0, 4).map((item, idx) => (
            <div key={idx} className="flex items-start gap-1 text-xs">
              <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
          {value.length > 4 && (
            <span className="text-xs text-muted-foreground">+{value.length - 4} more</span>
          )}
        </div>
      );
    }
    
    if (key === 'gender') {
      return value === 'all' ? 'All Genders' : value === 'female' ? 'Female Only' : 'Male Only';
    }
    
    return value || '-';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            📊 Compare Scholarships ({scholarships.length})
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[70vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px] sticky left-0 bg-background z-10">Feature</TableHead>
                {scholarships.map((scholarship) => (
                  <TableHead key={scholarship.id} className="min-w-[200px]">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-sm line-clamp-2">{scholarship.name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 flex-shrink-0"
                          onClick={() => onRemove(scholarship.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {scholarship.type === 'jkkn' ? 'JKKN' : 
                         scholarship.type === 'government' ? 'Government' :
                         scholarship.type === 'corporate' ? 'Corporate' : 'NGO'}
                      </Badge>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonFields.map((field) => (
                <TableRow key={field.key}>
                  <TableCell className="font-medium sticky left-0 bg-background">
                    {field.label}
                  </TableCell>
                  {scholarships.map((scholarship) => (
                    <TableCell key={scholarship.id} className="text-sm">
                      {renderValue(scholarship, field.key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-medium sticky left-0 bg-background">
                  Apply
                </TableCell>
                {scholarships.map((scholarship) => (
                  <TableCell key={scholarship.id}>
                    <Button
                      size="sm"
                      className="bg-[#FF6B35] hover:bg-[#FF6B35]/90"
                      onClick={() => window.open(scholarship.applicationUrl, '_blank')}
                    >
                      Apply Now <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
