import { useState, useMemo } from 'react';
import { 
  Users, School, TrendingUp, Target, BookOpen, Award, 
  ChevronRight, ChevronLeft, Play, CheckCircle, Lightbulb, Star,
  GraduationCap, Building2, Calculator, ArrowRight, ArrowLeft,
  MapPin, Briefcase, Trophy, AlertCircle, RefreshCw, GripVertical,
  X, Plus, Check, Info, Sparkles, Stethoscope, Atom
} from 'lucide-react';
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

const categoryLabels: Record<Category, string> = {
  oc: 'OC (Open Category)',
  bc: 'BC (Backward Class)',
  mbc: 'MBC (Most Backward Class)',
  sc: 'SC (Scheduled Caste)',
  st: 'ST (Scheduled Tribe)'
};

const stepInfo = [
  { id: 1, title: 'Enter Rank', icon: TrendingUp },
  { id: 2, title: 'Select Colleges', icon: School },
  { id: 3, title: 'Order Preferences', icon: GripVertical },
  { id: 4, title: 'View Allotment', icon: Award },
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

  const counsellingInfo = getCounsellingInfo(counsellingType);
  const colleges = getCollegesByType(counsellingType);
  const parsedRank = parseInt(rank) || 0;
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

      {/* Quick Tips */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <Lightbulb className="w-5 h-5" />
            Counselling Tips
          </CardTitle>
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
      <Button variant="ghost" onClick={() => setCurrentStep('home')} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>

      <Card className="border-none shadow-xl">
        <CardHeader className={`bg-gradient-to-r ${counsellingInfo.color} text-white rounded-t-xl`}>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Step 1: Enter Your {counsellingInfo.examName}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Rank Input */}
          <div className="space-y-2">
            <Label htmlFor="rank" className="text-base font-semibold">Your {counsellingInfo.examName}</Label>
            <Input
              id="rank"
              type="number"
              placeholder={counsellingType === 'tnea' ? 'e.g., 5000' : counsellingType === 'neet' ? 'e.g., 10000' : 'e.g., 3000'}
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="text-lg py-6"
              min={1}
              max={counsellingInfo.maxRank}
            />
            {parsedRank > 0 && (
              <div className="flex items-center gap-4 mt-3 p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Percentile</p>
                  <p className="text-xl font-bold text-teal-600">{percentile}%</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div>
                  <p className="text-sm text-gray-500">Classification</p>
                  <p className={`text-xl font-bold ${tierInfo.color}`}>{tierInfo.tier}</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{tierInfo.description}</p>
                </div>
              </div>
            )}
          </div>

          {/* Category Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Select Your Category</Label>
            <RadioGroup value={category} onValueChange={(v) => setCategory(v as Category)}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {(Object.keys(categoryLabels) as Category[]).map((cat) => (
                  <div key={cat} className="flex items-center space-x-2">
                    <RadioGroupItem value={cat} id={cat} />
                    <Label htmlFor={cat} className="cursor-pointer text-sm">{categoryLabels[cat]}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Eligible Colleges Preview */}
          {parsedRank > 0 && (
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-emerald-800">
                  {eligibleColleges.length} Colleges Eligible
                </span>
              </div>
              <p className="text-sm text-emerald-700">
                Based on your rank, you are eligible for {eligibleColleges.reduce((acc, c) => acc + c.eligibleBranches.length, 0)} branch options across {eligibleColleges.length} colleges.
              </p>
            </div>
          )}

          <Button 
            onClick={handleRankSubmit}
            disabled={parsedRank < 1}
            className={`w-full bg-gradient-to-r ${counsellingInfo.color} py-6 text-lg`}
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
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => setCurrentStep('rank-entry')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          Rank: {parsedRank} | {categoryLabels[category]}
        </Badge>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-500">Selected:</span>
        <Badge className="bg-teal-500">{selectedPreferences.length}/15</Badge>
        <Progress value={(selectedPreferences.length / 15) * 100} className="flex-1 h-2" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* College List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <School className="w-5 h-5 text-teal-600" />
            Eligible Colleges ({eligibleColleges.length})
          </h3>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {eligibleColleges.map(({ college, eligibleBranches }) => (
              <Card key={college.id} className="border-l-4 border-l-teal-500 shadow-md hover:shadow-lg transition-all">
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
                      college.type === 'Government' ? 'bg-emerald-500' :
                      college.type === 'Government-Aided' ? 'bg-blue-500' :
                      college.type === 'Self-Financing' ? 'bg-purple-500' : 'bg-amber-500'
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
                          className={`justify-start text-left h-auto py-2 ${isAdded ? 'bg-teal-500' : ''}`}
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
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <GripVertical className="w-5 h-5 text-purple-600" />
            Your Preferences
          </h3>
          
          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-4">
              {selectedPreferences.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Info className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>No preferences added yet</p>
                  <p className="text-sm">Click on branches to add</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
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
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-6"
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
      <Button variant="ghost" onClick={() => setCurrentStep('college-selection')}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Selection
      </Button>

      <Card className="border-none shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-xl">
          <CardTitle className="flex items-center gap-2">
            <GripVertical className="w-5 h-5" />
            Step 3: Order Your Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 mb-4">
            Drag or use arrows to reorder. Higher priority = Better chance of allotment.
          </p>
          
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
                    <p className="text-xs text-gray-500">Cutoff Rank</p>
                    <p className="font-bold text-purple-600">#{branch?.cutoffs[category]}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <Button 
            onClick={handleSimulateAllotment}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 py-6 text-lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Simulate Seat Allotment
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderAllotment = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] content-fade-in">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center animate-pulse">
          <RefreshCw className="w-12 h-12 text-white animate-spin" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Processing Allotment...</h3>
          <p className="text-gray-500">Simulating {counsellingInfo.name} Round 1 seat allocation</p>
        </div>
        <Progress value={66} className="w-64 mx-auto" />
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="space-y-6 content-fade-in max-w-2xl mx-auto">
      <Card className={`border-none shadow-xl overflow-hidden ${
        allotmentResult?.status === 'allotted' ? 'ring-4 ring-emerald-200' :
        allotmentResult?.status === 'waitlisted' ? 'ring-4 ring-amber-200' :
        'ring-4 ring-red-200'
      }`}>
        <div className={`p-6 text-white ${
          allotmentResult?.status === 'allotted' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
          allotmentResult?.status === 'waitlisted' ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
          'bg-gradient-to-r from-red-500 to-rose-600'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            {allotmentResult?.status === 'allotted' ? (
              <CheckCircle className="w-12 h-12" />
            ) : allotmentResult?.status === 'waitlisted' ? (
              <AlertCircle className="w-12 h-12" />
            ) : (
              <X className="w-12 h-12" />
            )}
            <div>
              <h2 className="text-2xl font-bold">
                {allotmentResult?.status === 'allotted' ? '🎉 Seat Allotted!' :
                 allotmentResult?.status === 'waitlisted' ? '⏳ Waitlisted' :
                 '❌ Not Allotted'}
              </h2>
              <p className="opacity-90">Round 1 Result</p>
            </div>
          </div>
        </div>
        
        <CardContent className="p-6 space-y-6">
          {allotmentResult?.college && allotmentResult?.branch ? (
            <>
              <div className="text-center py-4">
                <p className="text-gray-500 mb-1">Allotted College</p>
                <h3 className="text-xl font-bold text-gray-800">{allotmentResult.college.name}</h3>
                <p className="text-lg text-teal-600 font-semibold">{allotmentResult.branch.name}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-bold">{allotmentResult.college.location}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-gray-500">Avg Package</p>
                  <p className="font-bold text-emerald-600">{allotmentResult.branch.avgPackage}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-gray-500">Placement</p>
                  <p className="font-bold">{allotmentResult.college.placementRate}%</p>
                </div>
              </div>
              
              {allotmentResult.branch.topRecruiters && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Top Recruiters</p>
                  <div className="flex flex-wrap gap-2">
                    {allotmentResult.branch.topRecruiters.map((company, i) => (
                      <Badge key={i} variant="outline">{company}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600">{allotmentResult?.message}</p>
            </div>
          )}
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => handleStartSimulation(counsellingType)}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button 
              className={`flex-1 bg-gradient-to-r ${counsellingInfo.color}`}
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
      {currentStep === 'home' && renderHome()}
      {currentStep === 'rank-entry' && renderRankEntry()}
      {currentStep === 'college-selection' && renderCollegeSelection()}
      {currentStep === 'preference-order' && renderPreferenceOrder()}
      {currentStep === 'allotment' && renderAllotment()}
      {currentStep === 'result' && renderResult()}
    </div>
  );
};
