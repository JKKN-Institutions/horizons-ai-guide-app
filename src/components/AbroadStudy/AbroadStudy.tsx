import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { 
  Plane, GraduationCap, DollarSign, Globe, BookOpen, FileText, 
  CheckCircle, Clock, MapPin, Building2, Users, Award, TrendingUp,
  Star, Sparkles, Target, Calendar, Wallet, Scale, Shield, Languages,
  ClipboardList, Calculator
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { countries, exams, applicationSteps } from './data';
import { CountryMatcherQuiz } from './CountryMatcherQuiz';
import { UniversityComparison } from './UniversityComparison';
import { CostCalculator } from './CostCalculator';
import { DocumentChecklist } from './DocumentChecklist';
import { ScholarshipFinder } from './ScholarshipFinder';
import { VisaSuccessPredictor } from './VisaSuccessPredictor';
import { SOPReviewTool } from './SOPReviewTool';
import { LanguageRequirementsGuide } from './LanguageRequirementsGuide';
import { BudgetPlanner } from './BudgetPlanner';
import { CountryComparison } from './CountryComparison';
import { ApplicationTracker } from './ApplicationTracker';
import { AlumniConnect } from './AlumniConnect';
import { Country } from './types';

export const AbroadStudy = () => {
  const { language } = useLanguage();
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
            <TabsTrigger value="countries" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg px-3">
              <Globe className="w-4 h-4 mr-1" />
              Countries
            </TabsTrigger>
            <TabsTrigger value="quiz" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg px-3">
              <Target className="w-4 h-4 mr-1" />
              Quiz
            </TabsTrigger>
            <TabsTrigger value="compare" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg px-3">
              <Scale className="w-4 h-4 mr-1" />
              Compare
            </TabsTrigger>
            <TabsTrigger value="costs" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg px-3">
              <Calculator className="w-4 h-4 mr-1" />
              Costs
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg px-3">
              <FileText className="w-4 h-4 mr-1" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="scholarships" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg px-3">
              <Award className="w-4 h-4 mr-1" />
              Scholarships
            </TabsTrigger>
            <TabsTrigger value="visa" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg px-3">
              <Shield className="w-4 h-4 mr-1" />
              Visa
            </TabsTrigger>
            <TabsTrigger value="sop" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg px-3">
              <BookOpen className="w-4 h-4 mr-1" />
              SOP
            </TabsTrigger>
            <TabsTrigger value="exams" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg px-3">
              <Languages className="w-4 h-4 mr-1" />
              Exams
            </TabsTrigger>
            <TabsTrigger value="budget" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg px-3">
              <Wallet className="w-4 h-4 mr-1" />
              Budget
            </TabsTrigger>
            <TabsTrigger value="tracker" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg px-3">
              <ClipboardList className="w-4 h-4 mr-1" />
              Tracker
            </TabsTrigger>
            <TabsTrigger value="alumni" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg px-3">
              <Users className="w-4 h-4 mr-1" />
              Alumni
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <TabsContent value="countries" className="mt-6">
          {selectedCountry ? (
            <Card className="border-2 border-indigo-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{selectedCountry.flag}</span>
                    <div>
                      <CardTitle className="text-2xl">{selectedCountry.name[language]}</CardTitle>
                      <CardDescription>{selectedCountry.universities}+ Universities</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedCountry(null)}>← Back</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
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
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4 text-indigo-500" />Popular Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCountry.popularCourses.map((course, i) => (
                      <Badge key={i} variant="secondary" className="bg-indigo-100 text-indigo-700">{course}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-purple-500" />Top Universities</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {selectedCountry.topUniversities.map((uni, i) => (
                      <div key={i} className="bg-purple-50 rounded-lg p-3 text-center text-sm font-medium text-purple-800">{uni}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-amber-500" />Scholarships</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCountry.scholarships.map((sch, i) => (
                      <Badge key={i} className="bg-gradient-to-r from-amber-400 to-orange-400 text-white"><Star className="w-3 h-3 mr-1" />{sch}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {countries.map((country) => (
                <Card key={country.id} className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 hover:border-indigo-300" onClick={() => setSelectedCountry(country)}>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">{country.flag}</span>
                      <div>
                        <h3 className="font-bold text-lg">{country.name[language]}</h3>
                        <p className="text-sm text-gray-500">{country.universities}+ Universities</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600"><DollarSign className="w-4 h-4 text-green-500" /><span>{country.avgTuition}</span></div>
                      <div className="flex items-center gap-2 text-gray-600"><Clock className="w-4 h-4 text-blue-500" /><span>{country.workHours}</span></div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1">
                      {country.popularCourses.slice(0, 2).map((course, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{course}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="quiz" className="mt-6"><CountryMatcherQuiz /></TabsContent>
        <TabsContent value="compare" className="mt-6 space-y-6"><UniversityComparison /><CountryComparison /></TabsContent>
        <TabsContent value="costs" className="mt-6"><CostCalculator /></TabsContent>
        <TabsContent value="documents" className="mt-6"><DocumentChecklist /></TabsContent>
        <TabsContent value="scholarships" className="mt-6"><ScholarshipFinder /></TabsContent>
        <TabsContent value="visa" className="mt-6"><VisaSuccessPredictor /></TabsContent>
        <TabsContent value="sop" className="mt-6"><SOPReviewTool /></TabsContent>
        <TabsContent value="exams" className="mt-6"><LanguageRequirementsGuide /></TabsContent>
        <TabsContent value="budget" className="mt-6"><BudgetPlanner /></TabsContent>
        <TabsContent value="tracker" className="mt-6"><ApplicationTracker /></TabsContent>
        <TabsContent value="alumni" className="mt-6"><AlumniConnect /></TabsContent>
      </Tabs>

      {/* Tips Section */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-amber-500" />Pro Tips</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm"><div className="text-2xl mb-2">📅</div><h4 className="font-semibold text-sm mb-1">Start Early</h4><p className="text-xs text-gray-600">Begin 18-24 months before intake</p></div>
            <div className="bg-white rounded-lg p-4 shadow-sm"><div className="text-2xl mb-2">🎯</div><h4 className="font-semibold text-sm mb-1">Target Score</h4><p className="text-xs text-gray-600">Aim for 7+ IELTS and 320+ GRE</p></div>
            <div className="bg-white rounded-lg p-4 shadow-sm"><div className="text-2xl mb-2">💰</div><h4 className="font-semibold text-sm mb-1">Apply Scholarships</h4><p className="text-xs text-gray-600">Apply to 10+ scholarships</p></div>
            <div className="bg-white rounded-lg p-4 shadow-sm"><div className="text-2xl mb-2">📝</div><h4 className="font-semibold text-sm mb-1">SOP Matters</h4><p className="text-xs text-gray-600">Customize for each university</p></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
