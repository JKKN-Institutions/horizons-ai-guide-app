import { useState } from 'react';
import { 
  Users, School, TrendingUp, Target, BookOpen, Award, 
  ChevronRight, Play, CheckCircle, Lightbulb, Star,
  GraduationCap, Building2, Calculator, ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const counsellingSteps = [
  {
    id: 1,
    title: 'Rank Analysis',
    description: 'Understand your rank percentile and expected colleges',
    icon: TrendingUp,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 2,
    title: 'College Preference',
    description: 'Select and order your preferred colleges',
    icon: School,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
  },
  {
    id: 3,
    title: 'Branch Selection',
    description: 'Choose branches based on interest and cutoffs',
    icon: BookOpen,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
  },
  {
    id: 4,
    title: 'Seat Allotment',
    description: 'Simulate the actual seat allocation process',
    icon: Award,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
  },
];

const simulationModes = [
  {
    id: 'tnea',
    name: 'TNEA Counselling',
    description: 'Tamil Nadu Engineering Admissions counselling simulator',
    icon: '🎓',
    colleges: '500+ Colleges',
    branches: '100+ Branches',
    color: 'border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50',
  },
  {
    id: 'neet',
    name: 'NEET UG Counselling',
    description: 'Medical college admission counselling for MBBS/BDS',
    icon: '🏥',
    colleges: '600+ Colleges',
    branches: 'MBBS, BDS, BAMS, BHMS',
    color: 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50',
  },
  {
    id: 'josaa',
    name: 'JoSAA Counselling',
    description: 'IIT/NIT/IIIT seat allocation simulator',
    icon: '🏛️',
    colleges: '100+ Premier Institutes',
    branches: 'All Engineering Branches',
    color: 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50',
  },
];

const quickTips = [
  'Always have backup choices ready',
  'Research placement records before choosing',
  'Consider location and living costs',
  'Check faculty and infrastructure',
  'Look at industry connections',
];

export const CounsellingSimulator = () => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="space-y-8 content-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-600 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-300/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <Badge className="bg-amber-400 text-amber-900 hover:bg-amber-400">
              <Star className="w-3 h-3 mr-1" /> Featured Tool
            </Badge>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Counselling Simulator</h2>
          <p className="text-teal-100 text-lg mb-4">
            Practice and prepare for real counselling with our interactive simulator
          </p>
          <p className="text-cyan-200 font-tamil text-base">
            கலந்தாய்வு சிமுலேட்டர் - உண்மையான கலந்தாய்வுக்கு தயாராகுங்கள்
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Students Practiced', value: '25K+', icon: Users, color: 'text-blue-600' },
          { label: 'Accuracy Rate', value: '95%', icon: Target, color: 'text-emerald-600' },
          { label: 'Colleges Covered', value: '1000+', icon: Building2, color: 'text-purple-600' },
          { label: 'Success Stories', value: '10K+', icon: Award, color: 'text-amber-600' },
        ].map((stat, index) => (
          <Card key={index} className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Simulation Modes */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-teal-600" />
          Choose Counselling Type
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {simulationModes.map((mode) => (
            <Card 
              key={mode.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-2 ${mode.color} ${
                selectedMode === mode.id ? 'ring-2 ring-teal-500 ring-offset-2' : ''
              }`}
              onClick={() => setSelectedMode(mode.id)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{mode.icon}</span>
                  {selectedMode === mode.id && (
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                  )}
                </div>
                <h4 className="font-bold text-gray-800 mb-1">{mode.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{mode.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">{mode.colleges}</Badge>
                  <Badge variant="outline" className="text-xs">{mode.branches}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Counselling Steps */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-purple-600" />
          How It Works
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {counsellingSteps.map((step, index) => (
            <Card 
              key={step.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${step.bgColor} border-none`}
            >
              <CardContent className="p-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-3`}>
                  <step.icon className="w-5 h-5 text-white" />
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center font-bold text-gray-600">
                  {step.id}
                </div>
                <h4 className="font-bold text-gray-800 mb-1">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
                {index < counsellingSteps.length - 1 && (
                  <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 text-gray-300 hidden md:block" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <Lightbulb className="w-5 h-5" />
            Quick Counselling Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-3">
            {quickTips.map((tip, index) => (
              <div 
                key={index}
                className="flex items-start gap-2 p-3 bg-white/60 rounded-lg"
              >
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <div className="flex justify-center">
        <Button 
          size="lg"
          disabled={!selectedMode}
          className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Simulation
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};
