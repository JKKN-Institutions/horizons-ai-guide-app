import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { COLLEGE_CATEGORIES, COLLEGE_TYPE_INFO, CollegeCategory } from './types';

interface CollegeFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTypes: string[];
  onTypeChange: (types: string[]) => void;
  selectedCategories: CollegeCategory[];
  onCategoryChange: (categories: CollegeCategory[]) => void;
  selectedNaacGrade: string | null;
  onNaacGradeChange: (grade: string | null) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  typeCounts: Record<string, number>;
}

export const CollegeFilters = ({
  searchQuery,
  onSearchChange,
  selectedTypes,
  onTypeChange,
  selectedCategories,
  onCategoryChange,
  selectedNaacGrade,
  onNaacGradeChange,
  sortBy,
  onSortChange,
  typeCounts,
}: CollegeFiltersProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter(t => t !== type));
    } else {
      onTypeChange([...selectedTypes, type]);
    }
  };

  const toggleCategory = (category: CollegeCategory) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const clearAllFilters = () => {
    onSearchChange('');
    onTypeChange([]);
    onCategoryChange([]);
    onNaacGradeChange(null);
    onSortChange('name');
  };

  const hasActiveFilters = searchQuery || selectedTypes.length > 0 || selectedCategories.length > 0 || selectedNaacGrade;

  return (
    <div className="space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search college by name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11"
          />
        </div>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full sm:w-48 h-11">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-background z-50">
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="name_desc">Name Z-A</SelectItem>
            <SelectItem value="established">Oldest First</SelectItem>
            <SelectItem value="established_desc">Newest First</SelectItem>
            <SelectItem value="naac">NAAC Grade</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Type Filter Badges */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(COLLEGE_TYPE_INFO).map(([type, info]) => (
          <Badge
            key={type}
            variant={selectedTypes.includes(type) ? "default" : "outline"}
            className={`cursor-pointer transition-all ${
              selectedTypes.includes(type) 
                ? 'bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white border-[#2E7D32]' 
                : 'border-[#C8E6C9] text-[#374151] hover:bg-[#E8F5E9] hover:border-[#2E7D32]'
            }`}
            onClick={() => toggleType(type)}
          >
            {info.badge} {info.label} ({typeCounts[type] || 0})
          </Badge>
        ))}
      </div>

      {/* Collapsible Advanced Filters */}
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2">
                  Active
                </Badge>
              )}
            </span>
            {isFiltersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-4">
          {/* Category Filters */}
          <div>
            <Label className="text-sm font-medium mb-2 block text-[#1B5E20]">College Categories</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {COLLEGE_CATEGORIES.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <label
                    htmlFor={category.id}
                    className="text-xs cursor-pointer leading-tight"
                  >
                    {category.icon} {category.name.replace(' Colleges', '').replace(' (MBBS)', '').replace(' (B.Ed)', '').replace(' (AHS)', '')}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* NAAC Grade Filter */}
          <div>
            <Label className="text-sm font-medium mb-2 block text-[#1B5E20]">NAAC Grade</Label>
            <div className="flex flex-wrap gap-2">
              {['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C'].map((grade) => (
                <Badge
                  key={grade}
                  variant={selectedNaacGrade === grade ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedNaacGrade === grade 
                      ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white border-[#F59E0B]' 
                      : 'border-[#FFE082] text-[#374151] hover:bg-[#FFF8E1] hover:border-[#F59E0B]'
                  }`}
                  onClick={() => onNaacGradeChange(selectedNaacGrade === grade ? null : grade)}
                >
                  {grade}
                </Badge>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-destructive hover:text-destructive"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
