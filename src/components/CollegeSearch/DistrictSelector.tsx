import { useState, useMemo } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TAMIL_NADU_DISTRICTS } from './types';
import { cn } from '@/lib/utils';

interface DistrictSelectorProps {
  selectedDistrict: string | null;
  onDistrictSelect: (district: string) => void;
}

export const DistrictSelector = ({ selectedDistrict, onDistrictSelect }: DistrictSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDistricts = useMemo(() => {
    if (!searchQuery) return TAMIL_NADU_DISTRICTS;
    return TAMIL_NADU_DISTRICTS.filter(district =>
      district.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="w-full max-w-md">
      <label className="block text-sm font-medium text-foreground mb-2">
        Select District
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-12 text-left font-normal bg-background"
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              {selectedDistrict ? (
                <span>{selectedDistrict}</span>
              ) : (
                <span className="text-muted-foreground">Search and select a district...</span>
              )}
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-background z-50" align="start">
          <Command>
            <CommandInput 
              placeholder="Search districts..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>No district found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-y-auto">
                {filteredDistricts.map((district) => (
                  <CommandItem
                    key={district}
                    value={district}
                    onSelect={() => {
                      onDistrictSelect(district);
                      setOpen(false);
                      setSearchQuery('');
                    }}
                    className={cn(
                      "cursor-pointer",
                      selectedDistrict === district && "bg-accent"
                    )}
                  >
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    {district}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
