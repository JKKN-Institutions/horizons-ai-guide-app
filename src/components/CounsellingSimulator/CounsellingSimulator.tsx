import { useState, useMemo } from 'react';
import { 
  Users, School, TrendingUp, Target, BookOpen, Award, 
  ChevronRight, ChevronLeft, Play, CheckCircle, Lightbulb, Star,
  GraduationCap, Building2, Calculator, ArrowRight, ArrowLeft,
  MapPin, Briefcase, Trophy, AlertCircle, RefreshCw, GripVertical,
  X, Plus, Check, Info, Sparkles, Stethoscope, Atom, Video
} from 'lucide-react';
import CounsellingTipsGuide from './CounsellingTipsGuide';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  getCollegesByType,
  getEligibleColleges, 
  getRankPercentile, 
  getTierClassification,
  simulateSeatAllocation,
  getCounsellingInfo,
  type College,
  type Branch,
  type CollegePreference,
  type AllotmentResult,
  type CounsellingType
} from './collegeData';
import { toast } from 'sonner';

type SimulationStep = 'home' | 'rank-entry' | 'college-selection' | 'preference-order' | 'allotment' | 'result';
type Category = 'oc' | 'bc' | 'mbc' | 'sc' | 'st';
type Gender = 'male' | 'female';

const categoryLabels: Record<Category, string> = {
  oc: 'OC (Open Category)',
  bc: 'BC (Backward Class)',
  mbc: 'MBC (Most Backward Class)',
  sc: 'SC (Scheduled Caste)',
  st: 'ST (Scheduled Tribe)'
};

const communityOptions = [
  { value: 'oc', label: 'OC - Open Category' },
  { value: 'bc', label: 'BC - Backward Class' },
  { value: 'bca', label: 'BC(A)' },
  { value: 'bcb', label: 'BC(B)' },
  { value: 'bcm', label: 'BCM - Backward Class Muslim' },
  { value: 'mbc', label: 'MBC - Most Backward Class' },
  { value: 'dnc', label: 'DNC - Denotified Communities' },
  { value: 'sc', label: 'SC - Scheduled Caste' },
  { value: 'sca', label: 'SC(A)' },
  { value: 'st', label: 'ST - Scheduled Tribe' }
];

const stepInfo = [
  { id: 1, title: 'Your Profile', icon: Users },
  { id: 2, title: 'Select Colleges', icon: School },
  { id: 3, title: 'Order Preferences', icon: GripVertical },
  { id: 4, title: 'View Allotment', icon: Award },
  { id: 5, title: 'Result', icon: Trophy },
];

const counsellingTypes: { type: CounsellingType; icon: any; label: string; description: string }[] = [
  { type: 'tnea', icon: Building2, label: 'TNEA', description: 'Tamil Nadu Engineering' },
  { type: 'neet', icon: Stethoscope, label: 'NEET UG', description: 'Medical Admissions' },
  { type: 'josaa', icon: Atom, label: 'JoSAA', description: 'IIT/NIT/IIIT' }
];

export const CounsellingSimulator = () => {
  const [currentStep, setCurrentStep] = useState<SimulationStep>('home');
  const [counsellingType, setCounsellingType] = useState<CounsellingType>('tnea');
  const [rank, setRank] = useState<string>('');
  const [category, setCategory] = useState<Category>('oc');
  const [selectedPreferences, setSelectedPreferences] = useState<CollegePreference[]>([]);
  const [allotmentResult, setAllotmentResult] = useState<AllotmentResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTipsGuide, setShowTipsGuide] = useState(false);

  const counsellingInfo = getCounsellingInfo(counsellingType);
  const colleges = getCollegesByType(counsellingType);
  const parsedRank = parseInt(rank) || 0;
  const [gender, setGender] = useState<Gender>('male');
  const [community, setCommunity] = useState<string>('oc');
  const [isFirstGraduate, setIsFirstGraduate] = useState(false);
  const [isGovtSchool, setIsGovtSchool] = useState(false);
  
  const percentile = useMemo(() => getRankPercentile(parsedRank, counsellingType), [parsedRank, counsellingType]);
  const tierInfo = useMemo(() => getTierClassification(parsedRank, counsellingType), [parsedRank, counsellingType]);
  const eligibleColleges = useMemo(() => 
    parsedRank > 0 ? getEligibleColleges(parsedRank, category, counsellingType) : [], 
    [parsedRank, category, counsellingType]
  );

  const handleStartSimulation = (type: CounsellingType) => {
    setCounsellingType(type);
    setCurrentStep('rank-entry');
    setRank('');
    setCategory('oc');
    setSelectedPreferences([]);
    setAllotmentResult(null);
  };

  const handleRankSubmit = () => {
    if (parsedRank < 1 || parsedRank > counsellingInfo.maxRank) {
      toast.error(`Please enter a valid rank between 1 and ${counsellingInfo.maxRank.toLocaleString()}`);
      return;
    }
    setCurrentStep('college-selection');
  };

  const addPreference = (collegeId: string, branchId: string) => {
    if (selectedPreferences.length >= 15) {
      toast.error('Maximum 15 preferences allowed');
      return;
    }
    
    const exists = selectedPreferences.find(
      p => p.collegeId === collegeId && p.branchId === branchId
    );
    
    if (exists) {
      toast.error('This option is already added');
      return;
    }
    
    setSelectedPreferences([
      ...selectedPreferences,
      { collegeId, branchId, priority: selectedPreferences.length + 1 }
    ]);
    toast.success('Preference added!');
  };

  const removePreference = (index: number) => {
    const updated = selectedPreferences.filter((_, i) => i !== index);
    setSelectedPreferences(updated.map((p, i) => ({ ...p, priority: i + 1 })));
  };

  const movePreference = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= selectedPreferences.length) return;
    
    const updated = [...selectedPreferences];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setSelectedPreferences(updated.map((p, i) => ({ ...p, priority: i + 1 })));
  };

  const handleProceedToOrder = () => {
    if (selectedPreferences.length === 0) {
      toast.error('Please add at least one preference');
      return;
    }
    setCurrentStep('preference-order');
  };

  const handleSimulateAllotment = () => {
    setIsProcessing(true);
    setCurrentStep('allotment');
    
    // Simulate processing delay
    setTimeout(() => {
      const result = simulateSeatAllocation(parsedRank, category, selectedPreferences, counsellingType);
      setAllotmentResult(result);
      setIsProcessing(false);
      setCurrentStep('result');
    }, 3000);
  };

  const getCollegeBranchName = (pref: CollegePreference) => {
    const college = colleges.find(c => c.id === pref.collegeId);
    const branch = college?.branches.find(b => b.id === pref.branchId);
    return { collegeName: college?.shortName || '', branchName: branch?.shortName || '' };
  };

  const renderHome = () => (
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
            Practice TNEA, NEET & JoSAA counselling with real college data and cutoffs
          </p>
          <p className="text-cyan-200 font-tamil text-base">
            உண்மையான கல்லூரி தரவுகளுடன் கலந்தாய்வை பயிற்சி செய்யுங்கள்
          </p>
        </div>
      </div>

      {/* Counselling Type Selection */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-teal-600" />
          Choose Counselling Type
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {counsellingTypes.map((ct) => (
            <Card 
              key={ct.type} 
              className={`cursor-pointer border-2 transition-all hover:shadow-lg ${
                ct.type === 'tnea' ? 'hover:border-teal-400' :
                ct.type === 'neet' ? 'hover:border-rose-400' :
                'hover:border-indigo-400'
              }`}
              onClick={() => handleStartSimulation(ct.type)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                  ct.type === 'tnea' ? 'bg-gradient-to-br from-teal-500 to-cyan-600' :
                  ct.type === 'neet' ? 'bg-gradient-to-br from-rose-500 to-pink-600' :
                  'bg-gradient-to-br from-indigo-500 to-violet-600'
                }`}>
                  <ct.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-lg text-gray-800 mb-1">{ct.label}</h4>
                <p className="text-sm text-gray-500">{ct.description}</p>
                {ct.type === 'tnea' && <Badge className="mt-2 bg-teal-100 text-teal-700">25+ Colleges</Badge>}
                {ct.type === 'neet' && <Badge className="mt-2 bg-rose-100 text-rose-700">20+ Medical Colleges</Badge>}
                {ct.type === 'josaa' && <Badge className="mt-2 bg-indigo-100 text-indigo-700">15+ IITs/NITs</Badge>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-teal-600" />
          How It Works
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {stepInfo.map((step, index) => (
            <Card key={step.id} className="relative bg-gradient-to-br from-white to-slate-50 border-none shadow-md">
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-3">
                  <step.icon className="w-5 h-5 text-white" />
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-700">
                  {step.id}
                </div>
                <h4 className="font-bold text-gray-800">{step.title}</h4>
                {index < stepInfo.length - 1 && (
                  <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 text-gray-300 hidden md:block" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Tips & Strategy Guide Button */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <Lightbulb className="w-5 h-5" />
              Counselling Tips
            </CardTitle>
            <Button 
              onClick={() => setShowTipsGuide(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
            >
              <Video className="w-4 h-4 mr-2" />
              Video Tutorials & Strategy Guide
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              'Add 10-15 preferences for better chances',
              'Include backup colleges from different tiers',
              'Prioritize branch over college for better placements'
            ].map((tip, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-white/60 rounded-lg">
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );

  const renderRankEntry = () => (
    <div className="space-y-6 content-fade-in max-w-2xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => setCurrentStep('home')} className="mb-2">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>

      {/* Main Card */}
      <Card className="border-none shadow-xl overflow-hidden bg-gradient-to-br from-white to-slate-50">
        {/* Step Indicator Header */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-b border-emerald-100">
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Step 1 of 5
            </Badge>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((step) => (
                <div 
                  key={step}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    step === 1 ? 'bg-emerald-600 w-3 h-3' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${counsellingInfo.color}`}>
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-emerald-800">Your Profile</h2>
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          {/* Cutoff/Rank Input */}
          <div className="space-y-2">
            <Label className="text-base font-semibold flex items-center gap-2 text-gray-700">
              <Target className="w-4 h-4 text-emerald-600" />
              Your {counsellingType === 'tnea' ? 'TNEA Cutoff' : counsellingInfo.examName}
            </Label>
            <div className="relative">
              <Input
                type="number"
                placeholder="Enter your cutoff"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="text-lg py-6 pr-20 border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                min={1}
                max={counsellingInfo.maxRank}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-bold text-sm">
                /{counsellingType === 'tnea' ? '200' : counsellingInfo.maxRank.toLocaleString()}
              </div>
            </div>
            {parsedRank > 0 && (
              <div className="flex items-center gap-4 mt-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-center">
                  <p className="text-xs text-emerald-600 font-medium">Percentile</p>
                  <p className="text-xl font-bold text-emerald-700">{percentile}%</p>
                </div>
                <div className="h-10 w-px bg-emerald-200" />
                <div className="text-center">
                  <p className="text-xs text-emerald-600 font-medium">Classification</p>
                  <p className={`text-lg font-bold ${tierInfo.color}`}>{tierInfo.tier}</p>
                </div>
                <div className="h-10 w-px bg-emerald-200" />
                <div className="flex-1">
                  <p className="text-sm text-emerald-700">{tierInfo.description}</p>
                </div>
              </div>
            )}
          </div>

          {/* Community Dropdown */}
          <div className="space-y-2">
            <Label className="text-base font-semibold flex items-center gap-2 text-gray-700">
              <Users className="w-4 h-4 text-emerald-600" />
              Community
            </Label>
            <select
              value={community}
              onChange={(e) => {
                setCommunity(e.target.value);
                // Map community to category for eligibility check
                const catMap: Record<string, Category> = {
                  'oc': 'oc', 'bc': 'bc', 'bca': 'bc', 'bcb': 'bc', 'bcm': 'bc',
                  'mbc': 'mbc', 'dnc': 'mbc', 'sc': 'sc', 'sca': 'sc', 'st': 'st'
                };
                setCategory(catMap[e.target.value] || 'oc');
              }}
              className="w-full p-4 text-base border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none bg-white cursor-pointer"
            >
              <option value="" disabled>Select your community</option>
              {communityOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Gender Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2 text-gray-700">
              <Users className="w-4 h-4 text-emerald-600" />
              Gender
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  gender === 'male' 
                    ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <span className="text-2xl">👨</span>
                <span className="font-semibold text-gray-700">Male</span>
                {gender === 'male' && (
                  <div className="ml-auto w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  gender === 'female' 
                    ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <span className="text-2xl">👩</span>
                <span className="font-semibold text-gray-700">Female</span>
                {gender === 'female' && (
                  <div className="ml-auto w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Special Category */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2 text-gray-700">
              <Award className="w-4 h-4 text-emerald-600" />
              Special Category
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isFirstGraduate ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-white hover:border-gray-300'
              }`}>
                <input
                  type="checkbox"
                  checked={isFirstGraduate}
                  onChange={(e) => setIsFirstGraduate(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium text-gray-700">First Graduate</span>
              </label>
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isGovtSchool ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-white hover:border-gray-300'
              }`}>
                <input
                  type="checkbox"
                  checked={isGovtSchool}
                  onChange={(e) => setIsGovtSchool(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium text-gray-700">7.5% Govt School</span>
              </label>
            </div>
          </div>

          {/* Eligible Colleges Preview */}
          {parsedRank > 0 && eligibleColleges.length > 0 && (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-emerald-800">
                  {eligibleColleges.length} Colleges Eligible
                </span>
              </div>
              <p className="text-sm text-emerald-700">
                Based on your cutoff, you are eligible for {eligibleColleges.reduce((acc, c) => acc + c.eligibleBranches.length, 0)} branch options.
              </p>
            </div>
          )}

          <Button 
            onClick={handleRankSubmit}
            disabled={parsedRank < 1}
            className={`w-full bg-gradient-to-r ${counsellingInfo.color} py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all`}
          >
            Proceed to College Selection
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderCollegeSelection = () => (
    <div className="space-y-6 content-fade-in">
      {/* Step Header Card */}
      <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-white to-slate-50">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentStep('rank-entry')} className="h-8">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Badge className="bg-blue-600 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full">
                <School className="w-3.5 h-3.5 mr-1.5" />
                Step 2 of 5
              </Badge>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((step) => (
                <div 
                  key={step}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    step <= 2 ? 'bg-blue-600' : 'bg-gray-300'
                  } ${step === 2 ? 'w-3 h-3' : ''}`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600">
                <School className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-800">Select Colleges</h2>
                <p className="text-blue-600 text-sm">Choose your preferred colleges and branches</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm px-3 py-1.5 bg-white shadow-sm">
              Cutoff: {parsedRank} | {community.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-white border-b">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Preferences Added:</span>
            <Badge className="bg-blue-500">{selectedPreferences.length}/15</Badge>
            <Progress value={(selectedPreferences.length / 15) * 100} className="flex-1 h-2" />
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* College List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Eligible Colleges ({eligibleColleges.length})
          </h3>
          
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {eligibleColleges.map(({ college, eligibleBranches }) => (
              <Card key={college.id} className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-800 flex items-center gap-2">
                        {college.name}
                        {college.naacGrade && (
                          <Badge variant="outline" className="text-xs">NAAC {college.naacGrade}</Badge>
                        )}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {college.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" /> {college.placementRate}% Placed
                        </span>
                        <span className="flex items-center gap-1">
                          <Trophy className="w-3 h-3" /> {college.avgPackage}
                        </span>
                      </div>
                    </div>
                    <Badge className={
                      college.type === 'Government' || college.type === 'IIT' || college.type === 'AIIMS' ? 'bg-emerald-500' :
                      college.type === 'Government-Aided' || college.type === 'NIT' ? 'bg-blue-500' :
                      college.type === 'Self-Financing' || college.type === 'IIIT' ? 'bg-purple-500' : 'bg-amber-500'
                    }>
                      {college.type}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {eligibleBranches.map((branch) => {
                      const isAdded = selectedPreferences.some(
                        p => p.collegeId === college.id && p.branchId === branch.id
                      );
                      return (
                        <Button
                          key={branch.id}
                          variant={isAdded ? "default" : "outline"}
                          size="sm"
                          disabled={isAdded}
                          onClick={() => addPreference(college.id, branch.id)}
                          className={`justify-start text-left h-auto py-2 ${isAdded ? 'bg-blue-500' : ''}`}
                        >
                          {isAdded ? <Check className="w-3 h-3 mr-1" /> : <Plus className="w-3 h-3 mr-1" />}
                          <span className="truncate">{branch.shortName}</span>
                          <span className="ml-auto text-xs opacity-70">#{branch.cutoffs[category]}</span>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Selected Preferences Panel */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <GripVertical className="w-5 h-5 text-purple-600" />
            Your Preferences
          </h3>
          
          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-4">
              {selectedPreferences.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Info className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="font-medium">No preferences added yet</p>
                  <p className="text-sm">Click on branches to add</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[350px] overflow-y-auto">
                  {selectedPreferences.map((pref, index) => {
                    const { collegeName, branchName } = getCollegeBranchName(pref);
                    return (
                      <div
                        key={`${pref.collegeId}-${pref.branchId}`}
                        className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm"
                      >
                        <span className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{collegeName}</p>
                          <p className="text-xs text-gray-500">{branchName}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removePreference(index)}>
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Button 
            onClick={handleProceedToOrder}
            disabled={selectedPreferences.length === 0}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-6 rounded-xl shadow-lg"
          >
            Review & Order Preferences
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPreferenceOrder = () => (
    <div className="space-y-6 content-fade-in max-w-2xl mx-auto">
      {/* Step Header Card */}
      <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-white to-slate-50">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentStep('college-selection')} className="h-8">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Badge className="bg-purple-600 hover:bg-purple-600 text-white px-4 py-1.5 rounded-full">
                <GripVertical className="w-3.5 h-3.5 mr-1.5" />
                Step 3 of 5
              </Badge>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((step) => (
                <div 
                  key={step}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    step <= 3 ? 'bg-purple-600' : 'bg-gray-300'
                  } ${step === 3 ? 'w-3 h-3' : ''}`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <GripVertical className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-purple-800">Order Preferences</h2>
              <p className="text-purple-600 text-sm">Arrange your choices by priority</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border-none shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 p-3 mb-4 bg-amber-50 rounded-xl border border-amber-200">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <p className="text-sm text-amber-700">
              Use arrows to reorder. Higher priority = Better chance of allotment.
            </p>
          </div>
          
          <div className="space-y-2 mb-6">
            {selectedPreferences.map((pref, index) => {
              const { collegeName, branchName } = getCollegeBranchName(pref);
              const college = colleges.find(c => c.id === pref.collegeId);
              const branch = college?.branches.find(b => b.id === pref.branchId);
              
              return (
                <div
                  key={`${pref.collegeId}-${pref.branchId}`}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-purple-200 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      disabled={index === 0}
                      onClick={() => movePreference(index, 'up')}
                    >
                      <ChevronLeft className="w-4 h-4 rotate-90" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      disabled={index === selectedPreferences.length - 1}
                      onClick={() => movePreference(index, 'down')}
                    >
                      <ChevronRight className="w-4 h-4 rotate-90" />
                    </Button>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{college?.name}</p>
                    <p className="text-sm text-gray-500">{branch?.name}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Cutoff</p>
                    <p className="font-bold text-purple-600">#{branch?.cutoffs[category]}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <Button 
            onClick={handleSimulateAllotment}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 py-6 text-lg rounded-xl shadow-lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Simulate Seat Allotment
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderAllotment = () => (
    <div className="space-y-6 content-fade-in max-w-2xl mx-auto">
      {/* Step Header */}
      <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-white to-slate-50">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 border-b border-amber-100">
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-amber-600 hover:bg-amber-600 text-white px-4 py-1.5 rounded-full">
              <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              Step 4 of 5
            </Badge>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((step) => (
                <div 
                  key={step}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    step <= 4 ? 'bg-amber-600' : 'bg-gray-300'
                  } ${step === 4 ? 'w-3 h-3' : ''}`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-amber-800">Processing Allotment</h2>
              <p className="text-amber-600 text-sm">Simulating {counsellingInfo.name} Round 1</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center animate-pulse">
            <RefreshCw className="w-12 h-12 text-white animate-spin" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Analyzing your preferences...</h3>
            <p className="text-gray-500">Matching with available seats</p>
          </div>
          <Progress value={66} className="w-64 mx-auto" />
        </div>
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="space-y-6 content-fade-in max-w-2xl mx-auto">
      {/* Step Header */}
      <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-white to-slate-50">
        <div className={`p-6 border-b ${
          allotmentResult?.status === 'allotted' ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-100' :
          allotmentResult?.status === 'waitlisted' ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-100' :
          'bg-gradient-to-r from-red-50 to-rose-50 border-red-100'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <Badge className={`px-4 py-1.5 rounded-full ${
              allotmentResult?.status === 'allotted' ? 'bg-emerald-600 hover:bg-emerald-600' :
              allotmentResult?.status === 'waitlisted' ? 'bg-amber-600 hover:bg-amber-600' :
              'bg-red-600 hover:bg-red-600'
            } text-white`}>
              <Trophy className="w-3.5 h-3.5 mr-1.5" />
              Step 5 of 5
            </Badge>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((step) => (
                <div 
                  key={step}
                  className={`w-2.5 h-2.5 rounded-full ${
                    allotmentResult?.status === 'allotted' ? 'bg-emerald-600' :
                    allotmentResult?.status === 'waitlisted' ? 'bg-amber-600' :
                    'bg-red-600'
                  } ${step === 5 ? 'w-3 h-3' : ''}`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${
              allotmentResult?.status === 'allotted' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' :
              allotmentResult?.status === 'waitlisted' ? 'bg-gradient-to-br from-amber-500 to-orange-500' :
              'bg-gradient-to-br from-red-500 to-rose-600'
            }`}>
              {allotmentResult?.status === 'allotted' ? (
                <CheckCircle className="w-6 h-6 text-white" />
              ) : allotmentResult?.status === 'waitlisted' ? (
                <AlertCircle className="w-6 h-6 text-white" />
              ) : (
                <X className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${
                allotmentResult?.status === 'allotted' ? 'text-emerald-800' :
                allotmentResult?.status === 'waitlisted' ? 'text-amber-800' :
                'text-red-800'
              }`}>
                {allotmentResult?.status === 'allotted' ? '🎉 Congratulations!' :
                 allotmentResult?.status === 'waitlisted' ? '⏳ Waitlisted' :
                 '❌ Not Allotted'}
              </h2>
              <p className={`text-sm ${
                allotmentResult?.status === 'allotted' ? 'text-emerald-600' :
                allotmentResult?.status === 'waitlisted' ? 'text-amber-600' :
                'text-red-600'
              }`}>
                {counsellingInfo.name} - Round 1 Result
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border-none shadow-xl overflow-hidden">
        <CardContent className="p-6 space-y-6">
          {allotmentResult?.college && allotmentResult?.branch ? (
            <>
              <div className="text-center py-4 bg-gradient-to-br from-slate-50 to-white rounded-xl">
                <p className="text-gray-500 mb-1 text-sm">Allotted College</p>
                <h3 className="text-xl font-bold text-gray-800">{allotmentResult.college.name}</h3>
                <p className="text-lg text-emerald-600 font-semibold">{allotmentResult.branch.name}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <MapPin className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-xs text-blue-600 font-medium">Location</p>
                  <p className="font-bold text-gray-800">{allotmentResult.college.location}</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <Briefcase className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                  <p className="text-xs text-emerald-600 font-medium">Avg Package</p>
                  <p className="font-bold text-emerald-700">{allotmentResult.branch.avgPackage}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <TrendingUp className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                  <p className="text-xs text-purple-600 font-medium">Placement</p>
                  <p className="font-bold text-gray-800">{allotmentResult.college.placementRate}%</p>
                </div>
              </div>
              
              {allotmentResult.branch.topRecruiters && (
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2 font-medium">Top Recruiters</p>
                  <div className="flex flex-wrap gap-2">
                    {allotmentResult.branch.topRecruiters.map((company, i) => (
                      <Badge key={i} variant="outline" className="bg-white">{company}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 mb-2">{allotmentResult?.message}</p>
              <p className="text-sm text-gray-500">Try adding more preferences or adjusting your choices.</p>
            </div>
          )}
          
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              className="flex-1 py-6 rounded-xl"
              onClick={() => handleStartSimulation(counsellingType)}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button 
              className={`flex-1 py-6 rounded-xl bg-gradient-to-r ${counsellingInfo.color}`}
              onClick={() => setCurrentStep('home')}
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-[600px]">
      {showTipsGuide ? (
        <div className="space-y-4">
          <Button variant="ghost" onClick={() => setShowTipsGuide(false)} className="mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Simulator
          </Button>
          <CounsellingTipsGuide 
            counsellingType={counsellingType} 
            onClose={() => setShowTipsGuide(false)} 
          />
        </div>
      ) : (
        <>
          {currentStep === 'home' && renderHome()}
          {currentStep === 'rank-entry' && renderRankEntry()}
          {currentStep === 'college-selection' && renderCollegeSelection()}
          {currentStep === 'preference-order' && renderPreferenceOrder()}
          {currentStep === 'allotment' && renderAllotment()}
          {currentStep === 'result' && renderResult()}
        </>
      )}
    </div>
  );
};
