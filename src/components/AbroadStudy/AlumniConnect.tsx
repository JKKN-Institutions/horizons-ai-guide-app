import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Search, MapPin, GraduationCap, Briefcase, MessageCircle, Linkedin, Star } from 'lucide-react';

interface Alumni {
  id: string;
  name: string;
  photo?: string;
  university: string;
  country: string;
  countryFlag: string;
  course: string;
  graduationYear: number;
  currentRole: string;
  currentCompany: string;
  rating: number;
  specialties: string[];
}

const mockAlumni: Alumni[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    university: 'MIT',
    country: 'USA',
    countryFlag: '🇺🇸',
    course: 'MS Computer Science',
    graduationYear: 2023,
    currentRole: 'Software Engineer',
    currentCompany: 'Google',
    rating: 4.9,
    specialties: ['SOP Review', 'Interview Prep', 'Visa Tips'],
  },
  {
    id: '2',
    name: 'Rahul Kumar',
    university: 'University of Toronto',
    country: 'Canada',
    countryFlag: '🇨🇦',
    course: 'MBA',
    graduationYear: 2022,
    currentRole: 'Product Manager',
    currentCompany: 'Shopify',
    rating: 4.8,
    specialties: ['MBA Applications', 'Scholarships', 'Part-time Jobs'],
  },
  {
    id: '3',
    name: 'Ananya Patel',
    university: 'University of Melbourne',
    country: 'Australia',
    countryFlag: '🇦🇺',
    course: 'MS Data Science',
    graduationYear: 2024,
    currentRole: 'Data Scientist',
    currentCompany: 'Atlassian',
    rating: 4.7,
    specialties: ['GTE Statement', 'Living in Australia', 'PR Process'],
  },
  {
    id: '4',
    name: 'Vikram Singh',
    university: 'TU Munich',
    country: 'Germany',
    countryFlag: '🇩🇪',
    course: 'MS Mechanical Engineering',
    graduationYear: 2023,
    currentRole: 'Engineer',
    currentCompany: 'BMW',
    rating: 4.9,
    specialties: ['Blocked Account', 'Free Education', 'German Culture'],
  },
  {
    id: '5',
    name: 'Sneha Gupta',
    university: 'Oxford',
    country: 'UK',
    countryFlag: '🇬🇧',
    course: 'MSc Finance',
    graduationYear: 2022,
    currentRole: 'Investment Analyst',
    currentCompany: 'Goldman Sachs',
    rating: 5.0,
    specialties: ['Chevening Scholarship', 'Oxbridge Applications', 'Finance Careers'],
  },
];

export const AlumniConnect = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const filteredAlumni = mockAlumni.filter(alumni => {
    const matchesSearch = 
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCountry = !selectedCountry || alumni.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  const countries = [...new Set(mockAlumni.map(a => a.country))];

  return (
    <Card className="border-2 border-cyan-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-500" />
          Alumni Connect
        </CardTitle>
        <CardDescription>Connect with students who've been through the journey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name, university, or specialty..."
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
            {countries.map(c => {
              const alumni = mockAlumni.find(a => a.country === c);
              return (
                <Button
                  key={c}
                  variant={selectedCountry === c ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCountry(c)}
                >
                  {alumni?.countryFlag} {c}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Alumni Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredAlumni.map((alumni) => (
            <Card key={alumni.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={alumni.photo} />
                    <AvatarFallback className="bg-cyan-100 text-cyan-700 font-bold">
                      {alumni.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold">{alumni.name}</h3>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-amber-500" />
                        <span className="text-sm font-medium">{alumni.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <span className="text-lg">{alumni.countryFlag}</span>
                      <GraduationCap className="w-3 h-3" />
                      <span>{alumni.university}, {alumni.graduationYear}</span>
                    </div>
                    
                    <p className="text-sm text-indigo-600 font-medium mt-1">{alumni.course}</p>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <Briefcase className="w-3 h-3" />
                      <span>{alumni.currentRole} @ {alumni.currentCompany}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {alumni.specialties.map((specialty, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{specialty}</Badge>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Connect
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No alumni found matching your criteria</p>
          </div>
        )}

        <div className="bg-cyan-50 rounded-xl p-4 text-center">
          <h4 className="font-semibold text-cyan-800 mb-2">Are you a Study Abroad Alumni? 🎓</h4>
          <p className="text-sm text-cyan-700 mb-3">
            Help fellow students by sharing your experience and insights
          </p>
          <Button variant="outline">Register as Alumni Mentor</Button>
        </div>
      </CardContent>
    </Card>
  );
};
