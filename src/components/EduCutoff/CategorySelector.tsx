import { cn } from '@/lib/utils';
import { Category } from './types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CategorySelectorProps {
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
  additionalOptions: string[];
  onAdditionalOptionsChange: (options: string[]) => void;
}

const categories: { id: Category; name: string; fullName: string }[] = [
  { id: 'OC', name: 'OC', fullName: 'General' },
  { id: 'BC', name: 'BC', fullName: 'Backward' },
  { id: 'BCM', name: 'BCM', fullName: 'BC Muslim' },
  { id: 'MBC', name: 'MBC', fullName: 'Most BC' },
  { id: 'DNC', name: 'DNC', fullName: 'Denotified' },
  { id: 'SC', name: 'SC', fullName: 'Scheduled Caste' },
  { id: 'SCA', name: 'SCA', fullName: 'SC Arunthathiyar' },
  { id: 'ST', name: 'ST', fullName: 'Scheduled Tribe' },
  { id: 'EWS', name: 'EWS', fullName: 'Economically Weak' },
];

const additionalOptionsList = [
  { id: 'pwd', label: 'Differently Abled (PwD)' },
  { id: 'sports', label: 'Sports Quota' },
  { id: 'ex_serviceman', label: 'Ex-Serviceman' },
  { id: 'first_graduate', label: 'First Graduate' },
  { id: 'rural', label: 'Rural Student' },
  { id: 'govt_school', label: 'Government School' },
];

export const CategorySelector = ({
  selectedCategory,
  onSelectCategory,
  additionalOptions,
  onAdditionalOptionsChange,
}: CategorySelectorProps) => {
  const handleOptionToggle = (optionId: string) => {
    if (additionalOptions.includes(optionId)) {
      onAdditionalOptionsChange(additionalOptions.filter(id => id !== optionId));
    } else {
      onAdditionalOptionsChange([...additionalOptions, optionId]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          👥 Step 3: Select Your Category
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          உங்கள் சமூகப் பிரிவைத் தேர்ந்தெடுக்கவும்
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={cn(
                'p-3 rounded-lg border-2 text-center transition-all duration-200',
                'hover:scale-105 hover:shadow-md',
                isSelected
                  ? 'border-violet-500 bg-violet-50 text-violet-700'
                  : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
              )}
            >
              <div className="font-bold text-lg">{category.name}</div>
              <div className="text-[10px] text-gray-500">{category.fullName}</div>
            </button>
          );
        })}
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          ADDITIONAL OPTIONS:
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {additionalOptionsList.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={additionalOptions.includes(option.id)}
                onCheckedChange={() => handleOptionToggle(option.id)}
              />
              <label
                htmlFor={option.id}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
