import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Award, Search, Globe, Calendar, DollarSign, ExternalLink, Star, Filter } from 'lucide-react';
import { scholarships, countries } from './data';

export const ScholarshipFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const filteredScholarships = scholarships.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.eligibility.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !selectedCountry || s.country.toLowerCase().includes(selectedCountry.toLowerCase());
    return matchesSearch && matchesCountry;
  });

  const getCountryFlag = (countryName: string) => {
    const countryMap: Record<string, string> = {
      'USA': '🇺🇸', 'UK': '🇬🇧', 'Canada': '🇨🇦', 'Australia': '🇦🇺',
      'Germany': '🇩🇪', 'Singapore': '🇸🇬', 'Europe': '🇪🇺'
    };
    return countryMap[countryName] || '🌍';
  };

  return (
    <Card className="border-2 border-amber-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Scholarship Finder
        </CardTitle>
        <CardDescription>Discover scholarships that match your profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCountry === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCountry(null)}
            >
              All
            </Button>
            {['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Europe'].map(c => (
              <Button
                key={c}
                variant={selectedCountry === c ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCountry(c)}
              >
                {getCountryFlag(c)} {c}
              </Button>
            ))}
          </div>
        </div>

        {/* Scholarship Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredScholarships.map((scholarship, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      {scholarship.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <span className="text-lg">{getCountryFlag(scholarship.country)}</span>
                      <span>{scholarship.country}</span>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">{scholarship.amount}</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>Deadline: {scholarship.deadline}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <Filter className="w-4 h-4 text-purple-500 mt-0.5" />
                    <span>{scholarship.eligibility}</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full mt-3">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredScholarships.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No scholarships found matching your criteria</p>
          </div>
        )}

        <div className="bg-amber-50 rounded-xl p-4 text-center">
          <h4 className="font-semibold text-amber-800 mb-2">Pro Tip 💡</h4>
          <p className="text-sm text-amber-700">
            Apply to multiple scholarships to increase your chances. Most successful students apply to 10+ scholarships!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
