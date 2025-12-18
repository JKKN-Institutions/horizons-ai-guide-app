import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X } from 'lucide-react';
import { ScholarshipFilters as FiltersType, scholarshipTypes, educationLevels, categories, incomeRanges, genderOptions } from './types';

interface ScholarshipFiltersProps {
  filters: FiltersType;
  onFilterChange: (filters: FiltersType) => void;
  onClear: () => void;
}

export const ScholarshipFilters = ({ filters, onFilterChange, onClear }: ScholarshipFiltersProps) => {
  const handleTypeChange = (typeId: string, checked: boolean) => {
    const newTypes = checked
      ? [...filters.types, typeId]
      : filters.types.filter(t => t !== typeId);
    onFilterChange({ ...filters, types: newTypes });
  };

  const handleEducationChange = (levelId: string, checked: boolean) => {
    const newLevels = checked
      ? [...filters.educationLevels, levelId]
      : filters.educationLevels.filter(l => l !== levelId);
    onFilterChange({ ...filters, educationLevels: newLevels });
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(c => c !== categoryId);
    onFilterChange({ ...filters, categories: newCategories });
  };

  const hasActiveFilters = filters.types.length > 0 || filters.educationLevels.length > 0 || 
    filters.categories.length > 0 || filters.incomeRange || filters.gender !== 'all';

  return (
    <div className="glass-card-premium dark-card-gold space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2 text-slate-800">
          <Filter className="h-4 w-4 text-orange-500" />
          Filter Scholarships
        </h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClear} className="text-slate-500 hover:text-slate-800">
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Scholarship Type */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-orange-600">📂 SCHOLARSHIP TYPE</Label>
        <div className="space-y-2">
          {scholarshipTypes.map(type => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type.id}`}
                checked={filters.types.includes(type.id)}
                onCheckedChange={(checked) => handleTypeChange(type.id, checked as boolean)}
              />
              <Label htmlFor={`type-${type.id}`} className="text-sm cursor-pointer text-slate-700">{type.label}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Education Level */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-orange-600">🎓 EDUCATION LEVEL</Label>
        <div className="space-y-2">
          {educationLevels.map(level => (
            <div key={level.id} className="flex items-center space-x-2">
              <Checkbox
                id={`edu-${level.id}`}
                checked={filters.educationLevels.includes(level.id)}
                onCheckedChange={(checked) => handleEducationChange(level.id, checked as boolean)}
              />
              <Label htmlFor={`edu-${level.id}`} className="text-sm cursor-pointer text-slate-700">{level.label}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-orange-600">👥 CATEGORY</Label>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category.id}`}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
              />
              <Label htmlFor={`cat-${category.id}`} className="text-sm cursor-pointer text-slate-700">{category.label}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Income Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-orange-600">💰 FAMILY ANNUAL INCOME</Label>
        <RadioGroup
          value={filters.incomeRange}
          onValueChange={(value) => onFilterChange({ ...filters, incomeRange: value })}
        >
          {incomeRanges.map(range => (
            <div key={range.id} className="flex items-center space-x-2">
              <RadioGroupItem value={range.id} id={`income-${range.id}`} />
              <Label htmlFor={`income-${range.id}`} className="text-sm cursor-pointer text-slate-700">{range.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Gender */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-orange-600">👤 GENDER</Label>
        <RadioGroup
          value={filters.gender}
          onValueChange={(value) => onFilterChange({ ...filters, gender: value })}
        >
          {genderOptions.map(option => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={`gender-${option.id}`} />
              <Label htmlFor={`gender-${option.id}`} className="text-sm cursor-pointer text-slate-700">{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* State */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-orange-600">📍 STATE</Label>
        <Select
          value={filters.state}
          onValueChange={(value) => onFilterChange({ ...filters, state: value })}
        >
          <SelectTrigger className="bg-white border-slate-300 text-slate-800">
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
            <SelectItem value="Karnataka">Karnataka</SelectItem>
            <SelectItem value="Kerala">Kerala</SelectItem>
            <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
            <SelectItem value="Maharashtra">Maharashtra</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
