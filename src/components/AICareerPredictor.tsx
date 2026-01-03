import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, ArrowLeft, ArrowRight, GraduationCap, Clock, IndianRupee, FileText, Building, ChevronRight, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { courseDatabase, Course, interestToCourseCategories, priorityFeesMapping, durationMapping } from '@/data/courseDatabase';

// Types
interface FormData {
  stream: string;
  percentage: string;
  interests: string[];
  priorities: string[];
  budget: string;
  duration: string;
}

interface CourseMatch extends Course {
  matchScore: number;
  matchReasons: string[];
}

// Interest cards data
const interestCards = [
  { id: 'technology', icon: '🖥️', label: 'Technology & Computers' },
  { id: 'science', icon: '🔬', label: 'Science & Research' },
  { id: 'healthcare', icon: '💊', label: 'Healthcare & Medicine' },
  { id: 'business', icon: '💰', label: 'Business & Finance' },
  { id: 'law', icon: '⚖️', label: 'Law & Justice' },
  { id: 'arts', icon: '🎨', label: 'Arts & Design' },
  { id: 'aviation', icon: '✈️', label: 'Aviation & Travel' },
  { id: 'construction', icon: '🏗️', label: 'Building & Construction' },
  { id: 'media', icon: '📰', label: 'Media & Journalism' },
  { id: 'teaching', icon: '👨‍🏫', label: 'Teaching & Education' },
  { id: 'agriculture', icon: '🌾', label: 'Agriculture & Nature' },
  { id: 'defence', icon: '🛡️', label: 'Defence & Security' },
  { id: 'hospitality', icon: '🏨', label: 'Hotel & Hospitality' },
  { id: 'data', icon: '📊', label: 'Data & Analytics' },
];

const priorityOptions = [
  { id: 'salary', icon: '💵', label: 'High Salary' },
  { id: 'security', icon: '🛡️', label: 'Job Security' },
  { id: 'balance', icon: '⚖️', label: 'Work-Life Balance' },
  { id: 'growth', icon: '🚀', label: 'Fast Growth' },
  { id: 'helping', icon: '🤝', label: 'Helping Others' },
];

const streamOptions = [
  { value: 'pcm', label: 'Science (PCM - Physics, Chemistry, Mathematics)' },
  { value: 'pcb', label: 'Science (PCB - Physics, Chemistry, Biology)' },
  { value: 'pcmb', label: 'Science (PCMB - All four subjects)' },
  { value: 'commerce_math', label: 'Commerce (with Mathematics)' },
  { value: 'commerce', label: 'Commerce (without Mathematics)' },
  { value: 'arts', label: 'Arts / Humanities' },
];

const percentageOptions = [
  { value: 'above90', label: 'Above 90%' },
  { value: '80to90', label: '80-90%' },
  { value: '70to80', label: '70-80%' },
  { value: '60to70', label: '60-70%' },
  { value: '50to60', label: '50-60%' },
  { value: 'below50', label: 'Below 50%' },
];

const budgetOptions = [
  { value: 'under1l', label: 'Under ₹1 Lakh (Government college)' },
  { value: '1to3l', label: '₹1-3 Lakh (Moderate fees)' },
  { value: '3to5l', label: '₹3-5 Lakh (Private college)' },
  { value: 'above5l', label: 'Above ₹5 Lakh (Premium institute)' },
];

const durationOptions = [
  { value: 'short', label: '2-3 years (Diploma/Short)' },
  { value: 'bachelor', label: '3-4 years (Bachelor\'s)' },
  { value: 'professional', label: '5+ years (Professional - MBBS, Law, Architecture)' },
];

const loadingMessages = [
  { message: '🧠 Analyzing your interests...', duration: 2000 },
  { message: '📊 Matching with 200+ courses...', duration: 2000 },
  { message: '🎓 Finding best courses for you...', duration: 2000 },
  { message: '✨ Generating recommendations...', duration: 2000 },
];

const AICareerPredictor: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'form' | 'loading' | 'results'>('intro');
  const [formStep, setFormStep] = useState(1);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<CourseMatch | null>(null);
  const [recommendations, setRecommendations] = useState<CourseMatch[]>([]);
  
  const [formData, setFormData] = useState<FormData>({
    stream: '',
    percentage: '',
    interests: [],
    priorities: [],
    budget: '',
    duration: '',
  });

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => {
      const interests = prev.interests.includes(interestId)
        ? prev.interests.filter(i => i !== interestId)
        : prev.interests.length < 3
          ? [...prev.interests, interestId]
          : prev.interests;
      return { ...prev, interests };
    });
  };

  const handlePriorityToggle = (priorityId: string) => {
    setFormData(prev => {
      const priorities = prev.priorities.includes(priorityId)
        ? prev.priorities.filter(p => p !== priorityId)
        : prev.priorities.length < 2
          ? [...prev.priorities, priorityId]
          : prev.priorities;
      return { ...prev, priorities };
    });
  };

  const calculateRecommendations = (): CourseMatch[] => {
    // Filter courses based on stream
    let eligibleCourses = courseDatabase.filter(course => {
      if (formData.stream === 'pcm') return course.stream === 'pcm';
      if (formData.stream === 'pcb') return course.stream === 'pcb';
      if (formData.stream === 'pcmb') return course.stream === 'pcm' || course.stream === 'pcb' || course.stream === 'pcmb';
      if (formData.stream === 'commerce_math') return course.stream === 'commerce' || course.stream === 'commerce_math';
      if (formData.stream === 'commerce') return course.stream === 'commerce';
      if (formData.stream === 'arts') return course.stream === 'arts';
      return true;
    });

    // Calculate match scores
    const scoredCourses: CourseMatch[] = eligibleCourses.map(course => {
      let score = 50; // Base score
      const matchReasons: string[] = [];

      // Interest matching (up to 30 points)
      formData.interests.forEach(interest => {
        const categories = interestToCourseCategories[interest] || [];
        if (categories.includes(course.category)) {
          score += 10;
          matchReasons.push(`Matches your interest in ${interestCards.find(i => i.id === interest)?.label || interest}`);
        }
      });

      // Budget matching (up to 10 points)
      const budgetLimit = priorityFeesMapping[formData.budget]?.maxFees || 1000000;
      const courseFees = parseInt(course.feesRange.replace(/[^\d]/g, '')) || 100000;
      if (courseFees <= budgetLimit) {
        score += 10;
        matchReasons.push('Fits within your budget');
      }

      // Duration matching (up to 10 points)
      const durationPref = durationMapping[formData.duration];
      if (durationPref) {
        const courseDuration = parseInt(course.duration) || 3;
        if (courseDuration >= durationPref.minYears && courseDuration <= durationPref.maxYears) {
          score += 10;
          matchReasons.push('Matches your preferred duration');
        }
      }

      // Priority-based adjustments
      if (formData.priorities.includes('salary')) {
        if (['Engineering', 'Medical', 'Management', 'Law'].includes(course.category)) {
          score += 5;
          matchReasons.push('High earning potential');
        }
      }
      if (formData.priorities.includes('security')) {
        if (['Medical', 'Education', 'Defence', 'Agriculture'].includes(course.category)) {
          score += 5;
          matchReasons.push('Offers job security');
        }
      }
      if (formData.priorities.includes('helping')) {
        if (['Medical', 'Nursing', 'Social Work', 'Education', 'Allied Health'].includes(course.category)) {
          score += 5;
          matchReasons.push('Involves helping others');
        }
      }
      if (formData.priorities.includes('growth')) {
        if (['Engineering', 'Management', 'Computer Applications', 'Design'].includes(course.category)) {
          score += 5;
          matchReasons.push('Fast-growing field');
        }
      }

      return {
        ...course,
        matchScore: Math.min(score, 100),
        matchReasons: matchReasons.length > 0 ? matchReasons : ['Based on your stream eligibility']
      };
    });

    // Sort by match score and return top 10
    return scoredCourses
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10);
  };

  const handlePredict = async () => {
    setStep('loading');
    setLoadingMessageIndex(0);
    setLoadingProgress(0);

    // Simulate loading animation
    for (let i = 0; i < loadingMessages.length; i++) {
      setLoadingMessageIndex(i);
      setLoadingProgress((i + 1) * 25);
      await new Promise(resolve => setTimeout(resolve, loadingMessages[i].duration));
    }

    // Calculate recommendations
    const results = calculateRecommendations();
    setRecommendations(results);
    setStep('results');
  };

  const canProceedToStep2 = formData.stream && formData.percentage;
  const canPredict = formData.interests.length > 0 && formData.priorities.length > 0 && formData.budget && formData.duration;

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-amber-600 bg-amber-100';
    return 'text-blue-600 bg-blue-100';
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto max-w-4xl">
        <AnimatePresence mode="wait">
          {/* Intro Step */}
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
                <CardContent className="pt-8 pb-8">
                  {/* Header */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Brain className="w-10 h-10 text-white" />
                      </div>
                      <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-amber-400" />
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                    AI Career Predictor
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                    Get AI-powered career predictions based on your interests and skills
                  </p>

                  <Button
                    onClick={() => setStep('form')}
                    size="lg"
                    className="w-full max-w-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg py-6 rounded-xl"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Predict My Career
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Form Step */}
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => formStep === 1 ? setStep('intro') : setFormStep(1)}
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Back
                    </Button>
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${formStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>1</span>
                      <div className={`w-12 h-1 rounded ${formStep >= 2 ? 'bg-primary' : 'bg-muted'}`} />
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${formStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>2</span>
                    </div>
                    <div className="w-16" />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <AnimatePresence mode="wait">
                    {formStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-foreground">Academic Details</h3>
                          <p className="text-muted-foreground text-sm">Tell us about your 12th standard education</p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="stream">Your 12th Stream *</Label>
                            <Select
                              value={formData.stream}
                              onValueChange={(value) => setFormData(prev => ({ ...prev, stream: value }))}
                            >
                              <SelectTrigger id="stream">
                                <SelectValue placeholder="Select your stream" />
                              </SelectTrigger>
                              <SelectContent>
                                {streamOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="percentage">Expected/Obtained Percentage</Label>
                            <Select
                              value={formData.percentage}
                              onValueChange={(value) => setFormData(prev => ({ ...prev, percentage: value }))}
                            >
                              <SelectTrigger id="percentage">
                                <SelectValue placeholder="Select your percentage" />
                              </SelectTrigger>
                              <SelectContent>
                                {percentageOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <Button
                          onClick={() => setFormStep(2)}
                          disabled={!canProceedToStep2}
                          className="w-full"
                          size="lg"
                        >
                          Continue
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    )}

                    {formStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        {/* Interest Selection */}
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">What interests you? (Select up to 3)</h3>
                          <p className="text-muted-foreground text-sm mb-4">Choose fields that excite you the most</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {interestCards.map(interest => (
                              <button
                                key={interest.id}
                                onClick={() => handleInterestToggle(interest.id)}
                                className={`p-3 rounded-xl border-2 text-center transition-all ${
                                  formData.interests.includes(interest.id)
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border hover:border-primary/50'
                                } ${formData.interests.length >= 3 && !formData.interests.includes(interest.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={formData.interests.length >= 3 && !formData.interests.includes(interest.id)}
                              >
                                <span className="text-2xl block mb-1">{interest.icon}</span>
                                <span className="text-xs font-medium">{interest.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Priorities */}
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">What matters most to you? (Select top 2)</h3>
                          <div className="flex flex-wrap gap-2">
                            {priorityOptions.map(priority => (
                              <button
                                key={priority.id}
                                onClick={() => handlePriorityToggle(priority.id)}
                                className={`px-4 py-2 rounded-full border-2 flex items-center gap-2 transition-all ${
                                  formData.priorities.includes(priority.id)
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border hover:border-primary/50'
                                } ${formData.priorities.length >= 2 && !formData.priorities.includes(priority.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={formData.priorities.length >= 2 && !formData.priorities.includes(priority.id)}
                              >
                                <span>{priority.icon}</span>
                                <span className="text-sm font-medium">{priority.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Budget */}
                        <div className="space-y-2">
                          <Label>Education budget per year?</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {budgetOptions.map(option => (
                              <button
                                key={option.value}
                                onClick={() => setFormData(prev => ({ ...prev, budget: option.value }))}
                                className={`p-3 rounded-lg border-2 text-left transition-all ${
                                  formData.budget === option.value
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border hover:border-primary/50'
                                }`}
                              >
                                <span className="text-sm font-medium">{option.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Duration */}
                        <div className="space-y-2">
                          <Label>Preferred course duration?</Label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {durationOptions.map(option => (
                              <button
                                key={option.value}
                                onClick={() => setFormData(prev => ({ ...prev, duration: option.value }))}
                                className={`p-3 rounded-lg border-2 text-center transition-all ${
                                  formData.duration === option.value
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border hover:border-primary/50'
                                }`}
                              >
                                <span className="text-sm font-medium">{option.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <Button
                          onClick={handlePredict}
                          disabled={!canPredict}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          size="lg"
                        >
                          🔮 Predict Courses
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Loading Step */}
          {step === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="py-16">
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-8">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse" />
                      <div className="absolute inset-2 rounded-full bg-card flex items-center justify-center">
                        <Brain className="w-10 h-10 text-primary animate-pulse" />
                      </div>
                    </div>
                    
                    <motion.p
                      key={loadingMessageIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl font-medium text-foreground mb-6"
                    >
                      {loadingMessages[loadingMessageIndex]?.message}
                    </motion.p>

                    <div className="max-w-xs mx-auto">
                      <Progress value={loadingProgress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Results Step */}
          {step === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setStep('form');
                        setFormStep(1);
                      }}
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Start Over
                    </Button>
                    <div className="text-center">
                      <CardTitle className="text-xl flex items-center gap-2 justify-center">
                        <GraduationCap className="w-6 h-6" />
                        Recommended Courses for You
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Based on your stream, interests & preferences
                      </p>
                    </div>
                    <div className="w-24" />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {recommendations.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card
                          className="cursor-pointer hover:shadow-md transition-all border-l-4"
                          style={{ borderLeftColor: course.matchScore >= 80 ? '#16a34a' : course.matchScore >= 60 ? '#d97706' : '#2563eb' }}
                          onClick={() => setSelectedCourse(course)}
                        >
                          <CardContent className="py-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-semibold text-foreground">{course.name}</h4>
                                  <Badge className={getMatchColor(course.matchScore)}>
                                    {course.matchScore}% Match
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {course.duration}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <IndianRupee className="w-3 h-3" />
                                    {course.feesRange}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <FileText className="w-3 h-3" />
                                    {course.entranceExam}
                                  </span>
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Course Details Modal */}
        <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                {selectedCourse?.name}
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh] pr-4">
              {selectedCourse && (
                <div className="space-y-6">
                  {/* Match Score */}
                  <div className="flex items-center gap-3">
                    <Badge className={`${getMatchColor(selectedCourse.matchScore)} text-lg px-4 py-1`}>
                      {selectedCourse.matchScore}% Match
                    </Badge>
                    <Badge variant="outline">{selectedCourse.category}</Badge>
                  </div>

                  {/* Match Reasons */}
                  <div>
                    <h4 className="font-medium mb-2 text-foreground">Why this is recommended:</h4>
                    <ul className="space-y-1">
                      {selectedCourse.matchReasons.map((reason, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-green-500" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-medium mb-2 text-foreground">About this course</h4>
                    <p className="text-sm text-muted-foreground">{selectedCourse.description}</p>
                  </div>

                  {/* Key Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Duration</p>
                      <p className="font-medium flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedCourse.duration}
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Fees Range (per year)</p>
                      <p className="font-medium flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" />
                        {selectedCourse.feesRange}
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Entrance Exam</p>
                      <p className="font-medium flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {selectedCourse.entranceExam}
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Eligibility</p>
                      <p className="font-medium">{selectedCourse.eligibility}</p>
                    </div>
                  </div>

                  {/* Career Prospects */}
                  {selectedCourse.careerProspects && (
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">Career Prospects</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCourse.careerProspects.map((career, i) => (
                          <Badge key={i} variant="secondary">{career}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Top Colleges */}
                  {selectedCourse.topColleges && (
                    <div>
                      <h4 className="font-medium mb-2 text-foreground flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Top Colleges
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCourse.topColleges.map((college, i) => (
                          <Badge key={i} variant="outline">{college}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default AICareerPredictor;
