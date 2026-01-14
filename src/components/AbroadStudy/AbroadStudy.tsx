import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { 
  Plane, GraduationCap, DollarSign, Globe, BookOpen, FileText, 
  CheckCircle, Clock, MapPin, Building2, Users, Award, TrendingUp,
  ExternalLink, Star, Sparkles, Target, Calendar, Wallet
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface Country {
  id: string;
  name: { en: string; ta: string };
  flag: string;
  universities: number;
  avgTuition: string;
  avgLiving: string;
  workHours: string;
  prDuration: string;
  popularCourses: string[];
  requirements: string[];
  topUniversities: string[];
  scholarships: string[];
  gradient: string;
}

const countries: Country[] = [
  {
    id: 'usa',
    name: { en: 'United States', ta: 'அமெரிக்கா' },
    flag: '🇺🇸',
    universities: 5000,
    avgTuition: '$20,000 - $55,000/yr',
    avgLiving: '$15,000 - $25,000/yr',
    workHours: '20 hrs/week',
    prDuration: '3-5 years (OPT + H1B)',
    popularCourses: ['Computer Science', 'MBA', 'Data Science', 'Engineering', 'Medicine'],
    requirements: ['GRE/GMAT', 'TOEFL/IELTS', 'SOP', 'LORs', 'Transcripts'],
    topUniversities: ['MIT', 'Stanford', 'Harvard', 'UC Berkeley', 'CMU'],
    scholarships: ['Fulbright', 'Hubert Humphrey', 'University Merit'],
    gradient: 'from-blue-500 to-red-500'
  },
  {
    id: 'uk',
    name: { en: 'United Kingdom', ta: 'இங்கிலாந்து' },
    flag: '🇬🇧',
    universities: 160,
    avgTuition: '£12,000 - £35,000/yr',
    avgLiving: '£12,000 - £15,000/yr',
    workHours: '20 hrs/week',
    prDuration: '2 years Graduate Route',
    popularCourses: ['Business', 'Law', 'Medicine', 'Arts', 'Finance'],
    requirements: ['IELTS/PTE', 'SOP', 'LORs', 'Transcripts'],
    topUniversities: ['Oxford', 'Cambridge', 'Imperial College', 'UCL', 'LSE'],
    scholarships: ['Chevening', 'Commonwealth', 'GREAT Scholarships'],
    gradient: 'from-blue-600 to-red-600'
  },
  {
    id: 'canada',
    name: { en: 'Canada', ta: 'கனடா' },
    flag: '🇨🇦',
    universities: 100,
    avgTuition: 'CAD 15,000 - 35,000/yr',
    avgLiving: 'CAD 12,000 - 18,000/yr',
    workHours: '20 hrs/week',
    prDuration: '1-3 years PGWP → PR',
    popularCourses: ['IT', 'Business Analytics', 'Healthcare', 'Engineering', 'Hospitality'],
    requirements: ['IELTS/PTE', 'SOP', 'LORs', 'Transcripts', 'GIC'],
    topUniversities: ['U of Toronto', 'UBC', 'McGill', 'Waterloo', 'Alberta'],
    scholarships: ['Vanier CGS', 'Banting', 'Ontario Graduate'],
    gradient: 'from-red-500 to-white'
  },
  {
    id: 'australia',
    name: { en: 'Australia', ta: 'ஆஸ்திரேலியா' },
    flag: '🇦🇺',
    universities: 43,
    avgTuition: 'AUD 20,000 - 45,000/yr',
    avgLiving: 'AUD 21,000 - 25,000/yr',
    workHours: '48 hrs/fortnight',
    prDuration: '2-4 years (485 visa → PR)',
    popularCourses: ['Data Science', 'Nursing', 'Engineering', 'Accounting', 'IT'],
    requirements: ['IELTS/PTE', 'SOP', 'LORs', 'Transcripts', 'GTE'],
    topUniversities: ['Melbourne', 'Sydney', 'ANU', 'UNSW', 'Monash'],
    scholarships: ['Australia Awards', 'Destination Australia', 'Research Training'],
    gradient: 'from-blue-500 to-yellow-500'
  },
  {
    id: 'germany',
    name: { en: 'Germany', ta: 'ஜெர்மனி' },
    flag: '🇩🇪',
    universities: 400,
    avgTuition: '€0 - €3,000/yr (Public)',
    avgLiving: '€10,000 - €12,000/yr',
    workHours: '20 hrs/week',
    prDuration: '18 months Job Seeker → PR',
    popularCourses: ['Engineering', 'Automotive', 'AI/ML', 'Renewable Energy', 'Research'],
    requirements: ['German (B1/B2) or English', 'APS', 'Blocked Account'],
    topUniversities: ['TU Munich', 'RWTH Aachen', 'Heidelberg', 'LMU Munich', 'TU Berlin'],
    scholarships: ['DAAD', 'Erasmus Mundus', 'Heinrich Böll'],
    gradient: 'from-black to-yellow-500'
  },
  {
    id: 'ireland',
    name: { en: 'Ireland', ta: 'அயர்லாந்து' },
    flag: '🇮🇪',
    universities: 34,
    avgTuition: '€10,000 - €25,000/yr',
    avgLiving: '€10,000 - €15,000/yr',
    workHours: '20 hrs/week',
    prDuration: '2 years Stay Back → Stamp 4',
    popularCourses: ['Pharma', 'IT', 'Business', 'Data Analytics', 'Biotech'],
    requirements: ['IELTS/PTE', 'SOP', 'LORs', 'Transcripts'],
    topUniversities: ['Trinity College Dublin', 'UCD', 'NUI Galway', 'DCU', 'UCC'],
    scholarships: ['Government of Ireland', 'Science Foundation', 'University Scholarships'],
    gradient: 'from-green-500 to-orange-500'
  },
  {
    id: 'newzealand',
    name: { en: 'New Zealand', ta: 'நியூசிலாந்து' },
    flag: '🇳🇿',
    universities: 8,
    avgTuition: 'NZD 22,000 - 35,000/yr',
    avgLiving: 'NZD 15,000 - 20,000/yr',
    workHours: '20 hrs/week',
    prDuration: '1-3 years Post-Study Work',
    popularCourses: ['Agriculture', 'Tourism', 'Engineering', 'IT', 'Healthcare'],
    requirements: ['IELTS/PTE', 'SOP', 'LORs', 'Transcripts'],
    topUniversities: ['Auckland', 'Otago', 'Victoria Wellington', 'Canterbury', 'Massey'],
    scholarships: ['New Zealand Excellence', 'MFAT', 'University Scholarships'],
    gradient: 'from-blue-600 to-black'
  },
  {
    id: 'singapore',
    name: { en: 'Singapore', ta: 'சிங்கப்பூர்' },
    flag: '🇸🇬',
    universities: 6,
    avgTuition: 'SGD 15,000 - 50,000/yr',
    avgLiving: 'SGD 12,000 - 18,000/yr',
    workHours: '16 hrs/week',
    prDuration: 'Employment Pass → PR',
    popularCourses: ['Finance', 'Engineering', 'Business', 'Biotech', 'IT'],
    requirements: ['IELTS/TOEFL', 'SOP', 'LORs', 'Transcripts'],
    topUniversities: ['NUS', 'NTU', 'SMU', 'SUTD', 'SIT'],
    scholarships: ['A*STAR', 'MOE Tuition Grant', 'University Merit'],
    gradient: 'from-red-500 to-white'
  }
];

const exams = [
  { name: 'IELTS', fullForm: 'International English Language Testing System', countries: 'UK, Australia, Canada, NZ', score: '6.5-7.5', icon: '📝' },
  { name: 'TOEFL', fullForm: 'Test of English as a Foreign Language', countries: 'USA, Canada', score: '90-110', icon: '📚' },
  { name: 'PTE', fullForm: 'Pearson Test of English', countries: 'Australia, UK, NZ, Canada', score: '58-79', icon: '💻' },
  { name: 'GRE', fullForm: 'Graduate Record Examination', countries: 'USA, Canada, Germany', score: '310-330', icon: '🎯' },
  { name: 'GMAT', fullForm: 'Graduate Management Admission Test', countries: 'USA, UK, Singapore', score: '650-750', icon: '📊' },
  { name: 'SAT', fullForm: 'Scholastic Assessment Test', countries: 'USA (UG)', score: '1200-1600', icon: '✏️' },
  { name: 'Duolingo', fullForm: 'Duolingo English Test', countries: 'USA, UK, Australia', score: '110-130', icon: '🦉' },
];

const applicationSteps = [
  { step: 1, title: 'Research', desc: 'Research countries, universities, and courses', duration: '2-3 months' },
  { step: 2, title: 'Exams', desc: 'Prepare and appear for IELTS/GRE/GMAT', duration: '3-4 months' },
  { step: 3, title: 'Documents', desc: 'Prepare SOP, LORs, transcripts, certificates', duration: '1-2 months' },
  { step: 4, title: 'Apply', desc: 'Submit applications to shortlisted universities', duration: '1-2 months' },
  { step: 5, title: 'Admit', desc: 'Receive admission offers and accept', duration: '2-4 months' },
  { step: 6, title: 'Visa', desc: 'Apply for student visa with required documents', duration: '1-2 months' },
  { step: 7, title: 'Travel', desc: 'Book tickets, find accommodation, depart', duration: '1 month' },
];

export const AbroadStudy = () => {
  const { language, t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [activeTab, setActiveTab] = useState('countries');

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white border-0 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.08%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <CardContent className="p-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Plane className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Study Abroad Guide</h2>
              <p className="text-white/80 font-tamil">
                {language === 'ta' ? 'வெளிநாடு படிப்பு வழிகாட்டி' : 'Complete Guide for International Education'}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <Globe className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">8+</div>
              <div className="text-xs text-white/80">Countries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <Building2 className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">5000+</div>
              <div className="text-xs text-white/80">Universities</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <Award className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">100+</div>
              <div className="text-xs text-white/80">Scholarships</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">1M+</div>
              <div className="text-xs text-white/80">Indian Students</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="bg-white/80 backdrop-blur-sm p-1.5 rounded-xl shadow-sm border inline-flex w-auto">
            <TabsTrigger value="countries" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg px-4">
              <Globe className="w-4 h-4 mr-2" />
              Countries
            </TabsTrigger>
            <TabsTrigger value="exams" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg px-4">
              <FileText className="w-4 h-4 mr-2" />
              Exams
            </TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg px-4">
              <Calendar className="w-4 h-4 mr-2" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="costs" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg px-4">
              <Wallet className="w-4 h-4 mr-2" />
              Costs & Loans
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Countries Tab */}
        <TabsContent value="countries" className="mt-6">
          {selectedCountry ? (
            <Card className="border-2 border-indigo-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{selectedCountry.flag}</span>
                    <div>
                      <CardTitle className="text-2xl">
                        {selectedCountry.name[language]}
                      </CardTitle>
                      <CardDescription>{selectedCountry.universities}+ Universities</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedCountry(null)}>
                    ← Back to Countries
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <DollarSign className="w-5 h-5 mx-auto mb-2 text-blue-600" />
                    <div className="text-sm font-semibold text-blue-800">Tuition</div>
                    <div className="text-xs text-blue-600">{selectedCountry.avgTuition}</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <Wallet className="w-5 h-5 mx-auto mb-2 text-green-600" />
                    <div className="text-sm font-semibold text-green-800">Living Cost</div>
                    <div className="text-xs text-green-600">{selectedCountry.avgLiving}</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <Clock className="w-5 h-5 mx-auto mb-2 text-purple-600" />
                    <div className="text-sm font-semibold text-purple-800">Work Hours</div>
                    <div className="text-xs text-purple-600">{selectedCountry.workHours}</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <TrendingUp className="w-5 h-5 mx-auto mb-2 text-amber-600" />
                    <div className="text-sm font-semibold text-amber-800">PR Path</div>
                    <div className="text-xs text-amber-600">{selectedCountry.prDuration}</div>
                  </div>
                </div>

                {/* Popular Courses */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    Popular Courses
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCountry.popularCourses.map((course, i) => (
                      <Badge key={i} variant="secondary" className="bg-indigo-100 text-indigo-700">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-500" />
                    Requirements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCountry.requirements.map((req, i) => (
                      <Badge key={i} variant="outline" className="border-green-300 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Top Universities */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-purple-500" />
                    Top Universities
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {selectedCountry.topUniversities.map((uni, i) => (
                      <div key={i} className="bg-purple-50 rounded-lg p-3 text-center text-sm font-medium text-purple-800">
                        {uni}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scholarships */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    Major Scholarships
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCountry.scholarships.map((sch, i) => (
                      <Badge key={i} className="bg-gradient-to-r from-amber-400 to-orange-400 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        {sch}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {countries.map((country) => (
                <Card 
                  key={country.id}
                  className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 hover:border-indigo-300"
                  onClick={() => setSelectedCountry(country)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">{country.flag}</span>
                      <div>
                        <h3 className="font-bold text-lg">{country.name[language]}</h3>
                        <p className="text-sm text-gray-500">{country.universities}+ Universities</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <span>{country.avgTuition}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>{country.workHours}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <TrendingUp className="w-4 h-4 text-purple-500" />
                        <span className="text-xs">{country.prDuration}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1">
                      {country.popularCourses.slice(0, 2).map((course, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                      {country.popularCourses.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{country.popularCourses.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Exams Tab */}
        <TabsContent value="exams" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exams.map((exam, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{exam.icon}</span>
                    <div>
                      <h3 className="font-bold text-lg">{exam.name}</h3>
                      <p className="text-xs text-gray-500">{exam.fullForm}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                      <span className="text-gray-600">Target Score</span>
                      <Badge className="bg-green-100 text-green-700">{exam.score}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{exam.countries}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-500" />
                Application Timeline (12-18 months)
              </CardTitle>
              <CardDescription>Start early for best results!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {applicationSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 mb-6 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        i === 0 ? 'bg-green-500' : 
                        i === applicationSteps.length - 1 ? 'bg-indigo-500' : 
                        'bg-gray-400'
                      }`}>
                        {step.step}
                      </div>
                      {i !== applicationSteps.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-lg">{step.title}</h4>
                        <Badge variant="outline">{step.duration}</Badge>
                      </div>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Costs & Loans Tab */}
        <TabsContent value="costs" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-green-500" />
                  Education Loans
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Collateral-Free Loans</h4>
                  <p className="text-sm text-gray-600 mb-3">Up to ₹7.5 Lakhs without security</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">SBI Scholar</Badge>
                    <Badge variant="outline">HDFC Credila</Badge>
                    <Badge variant="outline">Prodigy Finance</Badge>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">With Collateral</h4>
                  <p className="text-sm text-gray-600 mb-3">Up to ₹1.5 Crore with property/FD</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">SBI Global Ed-Vantage</Badge>
                    <Badge variant="outline">Bank of Baroda</Badge>
                    <Badge variant="outline">Axis Bank</Badge>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Government Schemes</h4>
                  <p className="text-sm text-gray-600 mb-3">Interest subsidies & grants</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Vidya Lakshmi Portal</Badge>
                    <Badge variant="outline">PM CARES</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-purple-500" />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Exam Fees (IELTS/GRE)</span>
                    <span className="font-semibold">₹15,000 - ₹25,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Application Fees (per uni)</span>
                    <span className="font-semibold">₹5,000 - ₹15,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Visa Fee</span>
                    <span className="font-semibold">₹10,000 - ₹30,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Health Insurance (annual)</span>
                    <span className="font-semibold">₹30,000 - ₹80,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Flight Tickets</span>
                    <span className="font-semibold">₹40,000 - ₹1,00,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-indigo-100 rounded-lg font-semibold">
                    <span>Initial Setup Total</span>
                    <span className="text-indigo-700">₹1,00,000 - ₹2,50,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Tips Section */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Pro Tips for Study Abroad
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">📅</div>
              <h4 className="font-semibold text-sm mb-1">Start Early</h4>
              <p className="text-xs text-gray-600">Begin preparation 18-24 months before intake</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-sm mb-1">Target Score</h4>
              <p className="text-xs text-gray-600">Aim for 7+ IELTS and 320+ GRE for top universities</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">💰</div>
              <h4 className="font-semibold text-sm mb-1">Apply Scholarships</h4>
              <p className="text-xs text-gray-600">Apply to 10+ scholarships - don't rely on just one</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">📝</div>
              <h4 className="font-semibold text-sm mb-1">SOP Matters</h4>
              <p className="text-xs text-gray-600">Your Statement of Purpose can make or break admission</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
