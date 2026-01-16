import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, TrendingUp, Target, Award, ChevronRight, 
  Sparkles, Building2, MapPin, Calculator, Check, AlertCircle,
  Star, Trophy, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface CollegePrediction {
  name: string;
  course: string;
  chance: number;
  cutoff: number;
  ranking: string;
  location: string;
  type: 'safe' | 'moderate' | 'reach';
}

interface PredictionResult {
  predictions: CollegePrediction[];
  summary: {
    safeCount: number;
    moderateCount: number;
    reachCount: number;
    topChance: number;
  };
}

const EXAMS = [
  { id: 'tnea', name: 'TNEA (Engineering)', maxMarks: 200 },
  { id: 'neet', name: 'NEET (Medical)', maxMarks: 720 },
  { id: 'jee-main', name: 'JEE Main', maxMarks: 300 },
  { id: 'tancet', name: 'TANCET (PG)', maxMarks: 100 },
];

const CATEGORIES = [
  { id: 'oc', name: 'OC (General)' },
  { id: 'bc', name: 'BC' },
  { id: 'bcm', name: 'BCM' },
  { id: 'mbc', name: 'MBC' },
  { id: 'sc', name: 'SC' },
  { id: 'sca', name: 'SCA' },
  { id: 'st', name: 'ST' },
];

const COLLEGE_DATABASE: Record<string, CollegePrediction[]> = {
  'tnea': [
    { name: 'CEG, Anna University', course: 'Computer Science', chance: 0, cutoff: 197, ranking: '#1 in TN', location: 'Chennai', type: 'reach' },
    { name: 'MIT, Anna University', course: 'Computer Science', chance: 0, cutoff: 195, ranking: '#2 in TN', location: 'Chennai', type: 'reach' },
    { name: 'PSG College of Technology', course: 'Computer Science', chance: 0, cutoff: 192, ranking: '#3 in TN', location: 'Coimbatore', type: 'reach' },
    { name: 'SSN College of Engineering', course: 'Computer Science', chance: 0, cutoff: 190, ranking: '#4 in TN', location: 'Chennai', type: 'moderate' },
    { name: 'Coimbatore IT', course: 'Computer Science', chance: 0, cutoff: 185, ranking: '#5 in TN', location: 'Coimbatore', type: 'moderate' },
    { name: 'Thiagarajar College', course: 'Computer Science', chance: 0, cutoff: 180, ranking: '#6 in TN', location: 'Madurai', type: 'moderate' },
    { name: 'Kongu Engineering College', course: 'Computer Science', chance: 0, cutoff: 175, ranking: '#7 in TN', location: 'Erode', type: 'safe' },
    { name: 'Sri Krishna College', course: 'Computer Science', chance: 0, cutoff: 170, ranking: '#8 in TN', location: 'Coimbatore', type: 'safe' },
    { name: 'Bannari Amman IT', course: 'Computer Science', chance: 0, cutoff: 165, ranking: '#9 in TN', location: 'Erode', type: 'safe' },
    { name: 'Kumaraguru College', course: 'Computer Science', chance: 0, cutoff: 160, ranking: '#10 in TN', location: 'Coimbatore', type: 'safe' },
  ],
  'neet': [
    { name: 'Madras Medical College', course: 'MBBS', chance: 0, cutoff: 680, ranking: '#1 in TN', location: 'Chennai', type: 'reach' },
    { name: 'Stanley Medical College', course: 'MBBS', chance: 0, cutoff: 665, ranking: '#2 in TN', location: 'Chennai', type: 'reach' },
    { name: 'Kilpauk Medical College', course: 'MBBS', chance: 0, cutoff: 650, ranking: '#3 in TN', location: 'Chennai', type: 'moderate' },
    { name: 'Coimbatore Medical College', course: 'MBBS', chance: 0, cutoff: 630, ranking: '#4 in TN', location: 'Coimbatore', type: 'moderate' },
    { name: 'Madurai Medical College', course: 'MBBS', chance: 0, cutoff: 610, ranking: '#5 in TN', location: 'Madurai', type: 'safe' },
    { name: 'Tirunelveli Medical College', course: 'MBBS', chance: 0, cutoff: 590, ranking: '#6 in TN', location: 'Tirunelveli', type: 'safe' },
    { name: 'Thanjavur Medical College', course: 'MBBS', chance: 0, cutoff: 570, ranking: '#7 in TN', location: 'Thanjavur', type: 'safe' },
    { name: 'Chengalpattu Medical College', course: 'MBBS', chance: 0, cutoff: 550, ranking: '#8 in TN', location: 'Chengalpattu', type: 'safe' },
  ],
  'jee-main': [
    { name: 'IIT Madras', course: 'Computer Science', chance: 0, cutoff: 280, ranking: '#1 in India', location: 'Chennai', type: 'reach' },
    { name: 'NIT Trichy', course: 'Computer Science', chance: 0, cutoff: 250, ranking: '#1 NIT', location: 'Trichy', type: 'reach' },
    { name: 'IIIT Hyderabad', course: 'Computer Science', chance: 0, cutoff: 230, ranking: 'Top 10', location: 'Hyderabad', type: 'moderate' },
    { name: 'NIT Surathkal', course: 'Computer Science', chance: 0, cutoff: 210, ranking: '#2 NIT', location: 'Karnataka', type: 'moderate' },
    { name: 'IIIT Bangalore', course: 'Computer Science', chance: 0, cutoff: 190, ranking: 'Top 20', location: 'Bangalore', type: 'safe' },
    { name: 'NIT Warangal', course: 'Computer Science', chance: 0, cutoff: 170, ranking: '#3 NIT', location: 'Telangana', type: 'safe' },
  ],
  'tancet': [
    { name: 'CEG, Anna University', course: 'M.E. CSE', chance: 0, cutoff: 85, ranking: '#1 in TN', location: 'Chennai', type: 'reach' },
    { name: 'MIT, Anna University', course: 'M.E. CSE', chance: 0, cutoff: 80, ranking: '#2 in TN', location: 'Chennai', type: 'reach' },
    { name: 'PSG College of Technology', course: 'M.E. CSE', chance: 0, cutoff: 75, ranking: '#3 in TN', location: 'Coimbatore', type: 'moderate' },
    { name: 'Thiagarajar College', course: 'M.E. CSE', chance: 0, cutoff: 65, ranking: '#4 in TN', location: 'Madurai', type: 'safe' },
    { name: 'Kongu Engineering College', course: 'M.E. CSE', chance: 0, cutoff: 55, ranking: '#5 in TN', location: 'Erode', type: 'safe' },
  ],
};

const AIAdmissionPredictor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  const [formData, setFormData] = useState({
    exam: '',
    marks: '',
    category: '',
    state: 'tamil-nadu',
  });

  const selectedExam = EXAMS.find(e => e.id === formData.exam);

  const calculatePrediction = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const marks = parseInt(formData.marks);
      const colleges = COLLEGE_DATABASE[formData.exam] || [];
      
      // Calculate chances based on marks vs cutoff
      const predictions = colleges.map(college => {
        const diff = marks - college.cutoff;
        let chance = 50 + (diff * 2); // Base 50% + adjustment
        
        // Category bonus
        if (formData.category !== 'oc') {
          chance += 10;
        }
        
        chance = Math.max(5, Math.min(98, chance));
        
        let type: 'safe' | 'moderate' | 'reach' = 'moderate';
        if (chance >= 75) type = 'safe';
        else if (chance < 40) type = 'reach';
        
        return { ...college, chance: Math.round(chance), type };
      }).sort((a, b) => b.chance - a.chance);
      
      const summary = {
        safeCount: predictions.filter(p => p.type === 'safe').length,
        moderateCount: predictions.filter(p => p.type === 'moderate').length,
        reachCount: predictions.filter(p => p.type === 'reach').length,
        topChance: predictions[0]?.chance || 0,
      };
      
      setResult({ predictions, summary });
      setIsAnalyzing(false);
      setStep(3);
    }, 2000);
  };

  const getChanceColor = (chance: number) => {
    if (chance >= 75) return 'text-green-500';
    if (chance >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getTypeBadge = (type: 'safe' | 'moderate' | 'reach') => {
    const styles = {
      safe: 'bg-green-100 text-green-700 border-green-300',
      moderate: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      reach: 'bg-red-100 text-red-700 border-red-300',
    };
    const labels = { safe: 'Safe', moderate: 'Moderate', reach: 'Reach' };
    return <Badge variant="outline" className={styles[type]}>{labels[type]}</Badge>;
  };

  const resetPredictor = () => {
    setStep(1);
    setResult(null);
    setFormData({ exam: '', marks: '', category: '', state: 'tamil-nadu' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-800 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-purple-600 transition-colors">
                  AI Admission Predictor
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Know your college admission chances based on marks & category
                </p>
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-sm font-medium">
                  <span>Predict Now</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">TNEA</Badge>
              <Badge variant="secondary" className="text-xs">NEET</Badge>
              <Badge variant="secondary" className="text-xs">JEE</Badge>
              <Badge variant="secondary" className="text-xs">TANCET</Badge>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-purple-600" />
            AI Admission Predictor
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 py-4"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Enter Your Details</h3>
                <p className="text-sm text-muted-foreground">
                  We'll predict your admission chances in top colleges
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Exam</Label>
                  <Select value={formData.exam} onValueChange={(v) => setFormData({ ...formData, exam: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your exam" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXAMS.map(exam => (
                        <SelectItem key={exam.id} value={exam.id}>{exam.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Your Marks / Score {selectedExam && `(out of ${selectedExam.maxMarks})`}</Label>
                  <Input
                    type="number"
                    placeholder="Enter your marks"
                    value={formData.marks}
                    onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
                    max={selectedExam?.maxMarks}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category / Community</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                onClick={() => setStep(2)}
                disabled={!formData.exam || !formData.marks || !formData.category}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Analyze My Chances
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-8"
              onAnimationComplete={calculatePrediction}
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center"
                >
                  <Sparkles className="h-10 w-10 text-white" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">Analyzing Your Profile...</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comparing with previous year cutoffs and trends
                </p>
                <div className="space-y-2 max-w-xs mx-auto text-left">
                  {['Fetching cutoff data...', 'Analyzing category trends...', 'Calculating probabilities...'].map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.5 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, delay: i * 0.5 }}
                      >
                        <Check className="h-4 w-4 text-green-500" />
                      </motion.div>
                      {text}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && result && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 py-4"
            >
              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-3">
                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">{result.summary.safeCount}</div>
                    <div className="text-xs text-green-700">Safe Colleges</div>
                  </CardContent>
                </Card>
                <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold text-yellow-600">{result.summary.moderateCount}</div>
                    <div className="text-xs text-yellow-700">Moderate</div>
                  </CardContent>
                </Card>
                <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold text-red-600">{result.summary.reachCount}</div>
                    <div className="text-xs text-red-700">Reach</div>
                  </CardContent>
                </Card>
              </div>

              {/* College List */}
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {result.predictions.map((college, index) => (
                  <motion.div
                    key={college.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <h4 className="font-semibold text-sm">{college.name}</h4>
                              {getTypeBadge(college.type)}
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{college.course}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Trophy className="h-3 w-3" />
                                {college.ranking}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {college.location}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${getChanceColor(college.chance)}`}>
                              {college.chance}%
                            </div>
                            <div className="text-xs text-muted-foreground">chance</div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Progress value={college.chance} className="h-1.5" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={resetPredictor} className="flex-1">
                  Try Different Score
                </Button>
                <Button onClick={() => setIsOpen(false)} className="flex-1">
                  Close
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default AIAdmissionPredictor;
