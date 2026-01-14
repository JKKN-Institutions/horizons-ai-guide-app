import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scale, Plus, X, DollarSign, Clock, TrendingUp, GraduationCap, Briefcase, Sun } from 'lucide-react';
import { countries } from './data';

export const CountryComparison = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['usa', 'uk', 'canada']);

  const addCountry = (id: string) => {
    if (selectedCountries.length < 4 && !selectedCountries.includes(id)) {
      setSelectedCountries(prev => [...prev, id]);
    }
  };

  const removeCountry = (id: string) => {
    setSelectedCountries(prev => prev.filter(c => c !== id));
  };

  const selected = selectedCountries.map(id => countries.find(c => c.id === id)!).filter(Boolean);
  const available = countries.filter(c => !selectedCountries.includes(c.id));

  const criteria = [
    { key: 'avgTuition', label: 'Tuition Cost', icon: DollarSign, iconColor: 'text-green-500' },
    { key: 'avgLiving', label: 'Living Cost', icon: DollarSign, iconColor: 'text-blue-500' },
    { key: 'workHours', label: 'Work Allowed', icon: Clock, iconColor: 'text-purple-500' },
    { key: 'prDuration', label: 'PR Path', icon: TrendingUp, iconColor: 'text-amber-500' },
    { key: 'universities', label: 'Universities', icon: GraduationCap, iconColor: 'text-indigo-500' },
  ];

  return (
    <Card className="border-2 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-orange-500" />
          Country Comparison
        </CardTitle>
        <CardDescription>Compare study abroad destinations side by side</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Country Selector */}
        <div className="flex flex-wrap gap-2">
          {selected.map(country => (
            <Badge key={country.id} variant="secondary" className="py-2 px-3 gap-2 text-base">
              <span className="text-lg">{country.flag}</span>
              {country.name.en}
              <button onClick={() => removeCountry(country.id)} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          
          {selectedCountries.length < 4 && available.length > 0 && (
            <div className="relative group">
              <Button variant="outline" size="sm" className="gap-1">
                <Plus className="w-4 h-4" /> Add Country
              </Button>
              <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[200px]">
                {available.map(country => (
                  <button
                    key={country.id}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                    onClick={() => addCountry(country.id)}
                  >
                    <span className="text-lg">{country.flag}</span>
                    {country.name.en}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Comparison Table */}
        {selected.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 min-w-[140px]">Criteria</th>
                  {selected.map(country => (
                    <th key={country.id} className="text-center py-3 px-4 min-w-[150px]">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-3xl">{country.flag}</span>
                        <span className="font-bold">{country.name.en}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {criteria.map(({ key, label, icon: Icon, iconColor }, index) => (
                  <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${iconColor}`} />
                        {label}
                      </div>
                    </td>
                    {selected.map(country => (
                      <td key={country.id} className="text-center py-3 px-4 text-sm">
                        {key === 'universities' 
                          ? `${country.universities}+`
                          : key === 'avgTuition' ? country.avgTuition
                          : key === 'avgLiving' ? country.avgLiving
                          : key === 'workHours' ? country.workHours
                          : key === 'prDuration' ? country.prDuration
                          : ''
                        }
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t bg-white">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-500" />
                      Top Courses
                    </div>
                  </td>
                  {selected.map(country => (
                    <td key={country.id} className="text-center py-3 px-4">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {country.popularCourses.slice(0, 2).map((course, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{course}</Badge>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-yellow-500" />
                      Scholarships
                    </div>
                  </td>
                  {selected.map(country => (
                    <td key={country.id} className="text-center py-3 px-4">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {country.scholarships.slice(0, 2).map((sch, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{sch}</Badge>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {selected.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Scale className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Add countries above to compare</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
