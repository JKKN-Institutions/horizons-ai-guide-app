import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Scale, Plus, X, Trophy, DollarSign, GraduationCap, Award } from 'lucide-react';
import { universities, countries } from './data';

export const UniversityComparison = () => {
  const [selectedUnis, setSelectedUnis] = useState<string[]>([]);

  const addUniversity = (id: string) => {
    if (selectedUnis.length < 3 && !selectedUnis.includes(id)) {
      setSelectedUnis(prev => [...prev, id]);
    }
  };

  const removeUniversity = (id: string) => {
    setSelectedUnis(prev => prev.filter(u => u !== id));
  };

  const getCountryFlag = (countryId: string) => {
    return countries.find(c => c.id === countryId)?.flag || '';
  };

  const selectedUniversities = selectedUnis.map(id => universities.find(u => u.id === id)!).filter(Boolean);

  return (
    <Card className="border-2 border-indigo-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-500" />
          University Comparison
        </CardTitle>
        <CardDescription>Compare up to 3 universities side by side</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* University Selector */}
        <div className="flex flex-wrap gap-2 items-center">
          <Select onValueChange={addUniversity}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Add a university to compare" />
            </SelectTrigger>
            <SelectContent>
              {universities.filter(u => !selectedUnis.includes(u.id)).map(uni => (
                <SelectItem key={uni.id} value={uni.id}>
                  {getCountryFlag(uni.country)} {uni.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedUnis.map(id => {
            const uni = universities.find(u => u.id === id);
            return (
              <Badge key={id} variant="secondary" className="py-2 px-3 gap-2">
                {getCountryFlag(uni?.country || '')} {uni?.name}
                <button onClick={() => removeUniversity(id)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            );
          })}
        </div>

        {/* Comparison Table */}
        {selectedUniversities.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Criteria</th>
                  {selectedUniversities.map(uni => (
                    <th key={uni.id} className="text-center py-3 px-4">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl">{getCountryFlag(uni.country)}</span>
                        <span className="font-bold text-sm">{uni.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    World Ranking
                  </td>
                  {selectedUniversities.map(uni => (
                    <td key={uni.id} className="text-center py-3 px-4">
                      <Badge className="bg-amber-100 text-amber-700">#{uni.ranking}</Badge>
                    </td>
                  ))}
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    Tuition/Year
                  </td>
                  {selectedUniversities.map(uni => (
                    <td key={uni.id} className="text-center py-3 px-4 font-medium">{uni.tuition}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-500" />
                    Acceptance Rate
                  </td>
                  {selectedUniversities.map(uni => (
                    <td key={uni.id} className="text-center py-3 px-4">
                      <Badge variant="outline">{uni.acceptance}</Badge>
                    </td>
                  ))}
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-500" />
                    Scholarships
                  </td>
                  {selectedUniversities.map(uni => (
                    <td key={uni.id} className="text-center py-3 px-4">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {uni.scholarships.map((s, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{s}</Badge>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4">Popular Courses</td>
                  {selectedUniversities.map(uni => (
                    <td key={uni.id} className="text-center py-3 px-4">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {uni.courses.map((c, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{c}</Badge>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {selectedUniversities.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Scale className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Select universities above to compare</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
