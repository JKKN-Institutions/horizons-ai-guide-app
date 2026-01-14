import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Languages, Target, BookOpen, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { exams, languageRequirements } from './data';

export const LanguageRequirementsGuide = () => {
  const [activeExam, setActiveExam] = useState('ielts');

  const prepResources = {
    ielts: [
      { name: 'British Council', type: 'Free', url: '#' },
      { name: 'IELTS Liz', type: 'Free', url: '#' },
      { name: 'Magoosh IELTS', type: 'Paid', url: '#' },
      { name: 'Cambridge Practice Tests', type: 'Paid', url: '#' },
    ],
    toefl: [
      { name: 'ETS Official Prep', type: 'Free', url: '#' },
      { name: 'Magoosh TOEFL', type: 'Paid', url: '#' },
      { name: 'Barron\'s TOEFL', type: 'Paid', url: '#' },
    ],
    pte: [
      { name: 'Pearson Official', type: 'Free', url: '#' },
      { name: 'E2Language', type: 'Paid', url: '#' },
      { name: 'PTE Tutorials', type: 'Free', url: '#' },
    ],
    gre: [
      { name: 'ETS PowerPrep', type: 'Free', url: '#' },
      { name: 'Magoosh GRE', type: 'Paid', url: '#' },
      { name: 'Manhattan Prep', type: 'Paid', url: '#' },
      { name: 'Gregmat', type: 'Affordable', url: '#' },
    ],
  };

  return (
    <Card className="border-2 border-teal-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-teal-500" />
          Language & Exam Requirements
        </CardTitle>
        <CardDescription>Understand score requirements and prepare effectively</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Exam Quick Reference */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {exams.slice(0, 4).map((exam) => (
            <div
              key={exam.name}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                activeExam === exam.name.toLowerCase()
                  ? 'border-teal-400 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setActiveExam(exam.name.toLowerCase())}
            >
              <div className="text-3xl mb-2">{exam.icon}</div>
              <h4 className="font-bold">{exam.name}</h4>
              <p className="text-xs text-gray-500">{exam.fullForm}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">{exam.fee}</Badge>
                <Badge variant="secondary" className="text-xs">{exam.validity}</Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Score Requirements */}
        <Tabs value={activeExam} onValueChange={setActiveExam}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ielts">IELTS</TabsTrigger>
            <TabsTrigger value="toefl">TOEFL</TabsTrigger>
            <TabsTrigger value="pte">PTE</TabsTrigger>
            <TabsTrigger value="gre">GRE</TabsTrigger>
          </TabsList>

          <TabsContent value="ielts" className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  Minimum (Most Universities)
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-white rounded-lg">Listening: <span className="font-bold">6.0</span></div>
                  <div className="p-2 bg-white rounded-lg">Reading: <span className="font-bold">6.0</span></div>
                  <div className="p-2 bg-white rounded-lg">Writing: <span className="font-bold">5.5</span></div>
                  <div className="p-2 bg-white rounded-lg">Speaking: <span className="font-bold">5.5</span></div>
                </div>
                <div className="mt-3 p-2 bg-blue-100 rounded-lg text-center font-bold text-blue-700">
                  Overall: 6.5
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                  Competitive (Top Universities)
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-white rounded-lg">Listening: <span className="font-bold">7.0</span></div>
                  <div className="p-2 bg-white rounded-lg">Reading: <span className="font-bold">7.0</span></div>
                  <div className="p-2 bg-white rounded-lg">Writing: <span className="font-bold">7.0</span></div>
                  <div className="p-2 bg-white rounded-lg">Speaking: <span className="font-bold">7.0</span></div>
                </div>
                <div className="mt-3 p-2 bg-amber-200 rounded-lg text-center font-bold text-amber-800">
                  Overall: 7.5+
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="toefl" className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold mb-3">Minimum Scores</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-white rounded-lg">Reading: <span className="font-bold">18</span></div>
                  <div className="p-2 bg-white rounded-lg">Listening: <span className="font-bold">17</span></div>
                  <div className="p-2 bg-white rounded-lg">Speaking: <span className="font-bold">20</span></div>
                  <div className="p-2 bg-white rounded-lg">Writing: <span className="font-bold">17</span></div>
                </div>
                <div className="mt-3 p-2 bg-blue-100 rounded-lg text-center font-bold text-blue-700">
                  Total: 80+
                </div>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl">
                <h4 className="font-semibold mb-3">Competitive Scores</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-white rounded-lg">Reading: <span className="font-bold">24</span></div>
                  <div className="p-2 bg-white rounded-lg">Listening: <span className="font-bold">24</span></div>
                  <div className="p-2 bg-white rounded-lg">Speaking: <span className="font-bold">24</span></div>
                  <div className="p-2 bg-white rounded-lg">Writing: <span className="font-bold">24</span></div>
                </div>
                <div className="mt-3 p-2 bg-amber-200 rounded-lg text-center font-bold text-amber-800">
                  Total: 100+
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pte" className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl text-center">
                <h4 className="font-semibold mb-3">Minimum Score</h4>
                <div className="text-4xl font-bold text-blue-600">58</div>
                <p className="text-sm text-gray-500 mt-2">Overall</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl text-center">
                <h4 className="font-semibold mb-3">Competitive Score</h4>
                <div className="text-4xl font-bold text-amber-600">70+</div>
                <p className="text-sm text-gray-500 mt-2">Overall</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gre" className="mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl text-center">
                <h4 className="font-semibold mb-2">Verbal</h4>
                <div className="text-2xl font-bold text-blue-600">155-165</div>
                <p className="text-xs text-gray-500">Target Range</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl text-center">
                <h4 className="font-semibold mb-2">Quantitative</h4>
                <div className="text-2xl font-bold text-green-600">165-170</div>
                <p className="text-xs text-gray-500">Target Range</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl text-center">
                <h4 className="font-semibold mb-2">AWA</h4>
                <div className="text-2xl font-bold text-purple-600">4.0+</div>
                <p className="text-xs text-gray-500">Writing</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Prep Resources */}
        <div className="bg-teal-50 rounded-xl p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-teal-600" />
            Recommended Resources for {activeExam.toUpperCase()}
          </h4>
          <div className="flex flex-wrap gap-2">
            {prepResources[activeExam as keyof typeof prepResources]?.map((resource, i) => (
              <Badge 
                key={i} 
                variant={resource.type === 'Free' ? 'secondary' : 'outline'}
                className="py-2 px-3"
              >
                {resource.name}
                <span className={`ml-1 text-xs ${resource.type === 'Free' ? 'text-green-600' : 'text-gray-500'}`}>
                  ({resource.type})
                </span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Prep Timeline */}
        <div className="flex items-center gap-2 bg-blue-50 p-4 rounded-xl">
          <Clock className="w-5 h-5 text-blue-500" />
          <div>
            <span className="font-semibold">Recommended Prep Time: </span>
            <span className="text-gray-600">2-3 months for English tests, 3-4 months for GRE/GMAT</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
