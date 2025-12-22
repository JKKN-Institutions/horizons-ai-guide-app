import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Filter, X } from 'lucide-react';
import { JobFilters } from '@/types/jobPortal';

interface JobFiltersSheetProps {
  filters: JobFilters;
  onApply: (filters: JobFilters) => void;
  onClear: () => void;
}

const states = [
  'Tamil Nadu', 'Karnataka', 'Maharashtra', 'Telangana', 'Gujarat', 
  'Kerala', 'Andhra Pradesh', 'Delhi', 'Uttar Pradesh', 'West Bengal'
];

const cities = [
  'Chennai', 'Bangalore', 'Mumbai', 'Hyderabad', 'Pune', 
  'Coimbatore', 'Delhi', 'Noida', 'Gurgaon', 'Ahmedabad', 'Kochi', 'Kolkata'
];

const jobTypes = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
];

const experienceOptions = [
  { value: '0', label: 'Fresher (0 years)' },
  { value: '1', label: '1+ years' },
  { value: '2', label: '2+ years' },
  { value: '3', label: '3+ years' },
  { value: '5', label: '5+ years' },
  { value: '10', label: '10+ years' },
];

const salaryOptions = [
  { min: 0, max: 15000, label: 'Up to ₹15,000' },
  { min: 15000, max: 25000, label: '₹15,000 - ₹25,000' },
  { min: 25000, max: 50000, label: '₹25,000 - ₹50,000' },
  { min: 50000, max: 100000, label: '₹50,000 - ₹1 Lakh' },
  { min: 100000, max: null, label: 'Above ₹1 Lakh' },
];

export const JobFiltersSheet = ({ filters, onApply, onClear }: JobFiltersSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<JobFilters>(filters);

  const handleApply = () => {
    onApply(localFilters);
    setIsOpen(false);
  };

  const handleClear = () => {
    setLocalFilters({});
    onClear();
    setIsOpen(false);
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== undefined && v !== '' && v !== null).length;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 relative">
          <Filter className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="flex items-center justify-between">
            <span>Filter Jobs</span>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 py-6 overflow-y-auto max-h-[calc(85vh-180px)]">
          {/* Location */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Location</Label>
            <Select 
              value={localFilters.city || ''} 
              onValueChange={(v) => setLocalFilters({ ...localFilters, city: v || undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Salary */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Salary Range</Label>
            <div className="grid grid-cols-2 gap-2">
              {salaryOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setLocalFilters({ 
                    ...localFilters, 
                    salaryMin: localFilters.salaryMin === opt.min ? undefined : opt.min,
                    salaryMax: localFilters.salaryMin === opt.min ? undefined : opt.max ?? undefined
                  })}
                  className={`p-3 rounded-lg text-sm text-left border transition-all ${
                    localFilters.salaryMin === opt.min 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Experience</Label>
            <Select 
              value={localFilters.experienceMin?.toString() || ''} 
              onValueChange={(v) => setLocalFilters({ ...localFilters, experienceMin: v ? parseInt(v) : undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                {experienceOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Job Type */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Job Type</Label>
            <div className="flex flex-wrap gap-2">
              {jobTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => setLocalFilters({ 
                    ...localFilters, 
                    jobType: localFilters.jobType === type.value ? undefined : type.value 
                  })}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${
                    localFilters.jobType === type.value 
                      ? 'border-primary bg-primary text-primary-foreground' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Walk-in Only */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-semibold">Walk-in Only</Label>
              <p className="text-sm text-muted-foreground">Show only walk-in interviews</p>
            </div>
            <Switch 
              checked={localFilters.isWalkin || false}
              onCheckedChange={(checked) => setLocalFilters({ ...localFilters, isWalkin: checked || undefined })}
            />
          </div>
        </div>

        <div className="pt-4 border-t flex gap-3">
          <Button variant="outline" className="flex-1" onClick={handleClear}>
            Clear All
          </Button>
          <Button className="flex-1" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
