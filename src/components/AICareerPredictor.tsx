import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Sparkles, ArrowLeft, ArrowRight, GraduationCap, Clock, 
  IndianRupee, FileText, Building, ChevronRight, Check, Heart, 
  Search, SlidersHorizontal, ArrowUpDown, X, Download, Share2, 
  Printer, MessageCircle, Scale, Bookmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { toast } from '@/hooks/use-toast';
import { courseDatabase, Course, interestToCourseCategories, priorityFeesMapping, durationMapping } from '@/data/courseDatabase';
import { useCareerPredictorFavorites } from '@/hooks/useCareerPredictorFavorites';
import { generateCareerPredictorPDF } from '@/pages/generateCareerPredictorPDF';
import { useLanguage } from '@/hooks/useLanguage';

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

// Interest cards data with translation keys
const interestCardsData = [
  { id: 'technology', icon: '🖥️', labelKey: 'interest.technology' },
  { id: 'science', icon: '🔬', labelKey: 'interest.science' },
  { id: 'healthcare', icon: '💊', labelKey: 'interest.healthcare' },
  { id: 'business', icon: '💰', labelKey: 'interest.business' },
  { id: 'law', icon: '⚖️', labelKey: 'interest.law' },
  { id: 'arts', icon: '🎨', labelKey: 'interest.arts' },
  { id: 'aviation', icon: '✈️', labelKey: 'interest.aviation' },
  { id: 'construction', icon: '🏗️', labelKey: 'interest.construction' },
  { id: 'media', icon: '📰', labelKey: 'interest.media' },
  { id: 'teaching', icon: '👨‍🏫', labelKey: 'interest.teaching' },
  { id: 'agriculture', icon: '🌾', labelKey: 'interest.agriculture' },
  { id: 'defence', icon: '🛡️', labelKey: 'interest.defence' },
  { id: 'hospitality', icon: '🏨', labelKey: 'interest.hospitality' },
  { id: 'data', icon: '📊', labelKey: 'interest.data' },
];

const priorityOptionsData = [
  { id: 'salary', icon: '💵', labelKey: 'priority.salary' },
  { id: 'security', icon: '🛡️', labelKey: 'priority.security' },
  { id: 'balance', icon: '⚖️', labelKey: 'priority.balance' },
  { id: 'growth', icon: '🚀', labelKey: 'priority.growth' },
  { id: 'helping', icon: '🤝', labelKey: 'priority.helping' },
];

const streamOptionsData = [
  { value: 'pcm', labelKey: 'stream.pcm' },
  { value: 'pcb', labelKey: 'stream.pcb' },
  { value: 'pcmb', labelKey: 'stream.pcmb' },
  { value: 'commerce_math', labelKey: 'stream.commerce_math' },
  { value: 'commerce', labelKey: 'stream.commerce' },
  { value: 'arts', labelKey: 'stream.arts' },
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

type SortOption = 'match' | 'fees-asc' | 'fees-desc' | 'duration';

const AICareerPredictor: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState<'intro' | 'form' | 'loading' | 'results'>('intro');
  const [formStep, setFormStep] = useState(1);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<CourseMatch | null>(null);
  const [recommendations, setRecommendations] = useState<CourseMatch[]>([]);
  
  // New state for features
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('match');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<Set<string>>(new Set());
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [filterDuration, setFilterDuration] = useState<string>('all');
  const [filterExam, setFilterExam] = useState<string>('all');
  const [filterFees, setFilterFees] = useState<string>('all');
  
  const { favorites, toggleFavorite, isFavorite, getFavoritesCount } = useCareerPredictorFavorites();
  
  // Translated data arrays
  const interestCards = interestCardsData.map(item => ({
    ...item,
    label: t(item.labelKey)
  }));
  
  const priorityOptions = priorityOptionsData.map(item => ({
    ...item,
    label: t(item.labelKey)
  }));
  
  const streamOptions = streamOptionsData.map(item => ({
    ...item,
    label: t(item.labelKey)
  }));
  
  const loadingMessages = [
    { message: t('predictor.analyzing'), duration: 2000 },
    { message: t('predictor.matching'), duration: 2000 },
    { message: t('predictor.finding'), duration: 2000 },
    { message: t('predictor.generating'), duration: 2000 },
  ];
  
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
    let eligibleCourses = courseDatabase.filter(course => {
      if (formData.stream === 'pcm') return course.stream === 'pcm';
      if (formData.stream === 'pcb') return course.stream === 'pcb';
      if (formData.stream === 'pcmb') return course.stream === 'pcm' || course.stream === 'pcb' || course.stream === 'pcmb';
      if (formData.stream === 'commerce_math') return course.stream === 'commerce' || course.stream === 'commerce_math';
      if (formData.stream === 'commerce') return course.stream === 'commerce';
      if (formData.stream === 'arts') return course.stream === 'arts';
      return true;
    });

    const scoredCourses: CourseMatch[] = eligibleCourses.map(course => {
      let score = 50;
      const matchReasons: string[] = [];

      formData.interests.forEach(interest => {
        const categories = interestToCourseCategories[interest] || [];
        if (categories.includes(course.category)) {
          score += 10;
          matchReasons.push(`Matches your interest in ${interestCards.find(i => i.id === interest)?.label || interest}`);
        }
      });

      const budgetLimit = priorityFeesMapping[formData.budget]?.maxFees || 1000000;
      const courseFees = parseInt(course.feesRange.replace(/[^\d]/g, '')) || 100000;
      if (courseFees <= budgetLimit) {
        score += 10;
        matchReasons.push('Fits within your budget');
      }

      const durationPref = durationMapping[formData.duration];
      if (durationPref) {
        const courseDuration = parseInt(course.duration) || 3;
        if (courseDuration >= durationPref.minYears && courseDuration <= durationPref.maxYears) {
          score += 10;
          matchReasons.push('Matches your preferred duration');
        }
      }

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

    return scoredCourses.sort((a, b) => b.matchScore - a.matchScore).slice(0, 15);
  };

  const handlePredict = async () => {
    setStep('loading');
    setLoadingMessageIndex(0);
    setLoadingProgress(0);

    for (let i = 0; i < loadingMessages.length; i++) {
      setLoadingMessageIndex(i);
      setLoadingProgress((i + 1) * 25);
      await new Promise(resolve => setTimeout(resolve, loadingMessages[i].duration));
    }

    const results = calculateRecommendations();
    setRecommendations(results);
    setStep('results');
  };

  // Get unique filter options from recommendations
  const uniqueExams = useMemo(() => {
    const exams = new Set(recommendations.map(c => c.entranceExam));
    return Array.from(exams);
  }, [recommendations]);

  // Filtered and sorted recommendations
  const filteredRecommendations = useMemo(() => {
    let filtered = [...recommendations];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query)
      );
    }

    // Favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter(c => isFavorite(c.id));
    }

    // Duration filter
    if (filterDuration !== 'all') {
      filtered = filtered.filter(c => {
        const duration = parseInt(c.duration) || 3;
        if (filterDuration === 'short') return duration <= 3;
        if (filterDuration === 'medium') return duration > 3 && duration <= 4;
        if (filterDuration === 'long') return duration > 4;
        return true;
      });
    }

    // Exam filter
    if (filterExam !== 'all') {
      filtered = filtered.filter(c => c.entranceExam === filterExam);
    }

    // Fees filter
    if (filterFees !== 'all') {
      filtered = filtered.filter(c => {
        const fees = parseInt(c.feesRange.replace(/[^\d]/g, '')) || 100000;
        if (filterFees === 'low') return fees <= 100000;
        if (filterFees === 'medium') return fees > 100000 && fees <= 300000;
        if (filterFees === 'high') return fees > 300000;
        return true;
      });
    }

    // Sort
    if (sortBy === 'match') {
      filtered.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === 'fees-asc') {
      filtered.sort((a, b) => {
        const feesA = parseInt(a.feesRange.replace(/[^\d]/g, '')) || 0;
        const feesB = parseInt(b.feesRange.replace(/[^\d]/g, '')) || 0;
        return feesA - feesB;
      });
    } else if (sortBy === 'fees-desc') {
      filtered.sort((a, b) => {
        const feesA = parseInt(a.feesRange.replace(/[^\d]/g, '')) || 0;
        const feesB = parseInt(b.feesRange.replace(/[^\d]/g, '')) || 0;
        return feesB - feesA;
      });
    } else if (sortBy === 'duration') {
      filtered.sort((a, b) => {
        const durA = parseInt(a.duration) || 3;
        const durB = parseInt(b.duration) || 3;
        return durA - durB;
      });
    }

    return filtered;
  }, [recommendations, searchQuery, showFavoritesOnly, filterDuration, filterExam, filterFees, sortBy, isFavorite]);

  const handleToggleCompare = (courseId: string) => {
    setSelectedForCompare(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else if (newSet.size < 3) {
        newSet.add(courseId);
      } else {
        toast({
          title: "Maximum 3 courses",
          description: "You can compare up to 3 courses at a time.",
          variant: "destructive"
        });
      }
      return newSet;
    });
  };

  const coursesForCompare = useMemo(() => {
    return recommendations.filter(c => selectedForCompare.has(c.id));
  }, [recommendations, selectedForCompare]);

  const handleDownloadPDF = () => {
    generateCareerPredictorPDF(filteredRecommendations, formData);
    toast({
      title: "PDF Downloaded",
      description: "Your career recommendations have been saved as PDF."
    });
  };

  const handleShareWhatsApp = () => {
    const topCourses = filteredRecommendations.slice(0, 3).map(c => `• ${c.name} (${c.matchScore}% match)`).join('\n');
    const message = encodeURIComponent(
      `🎓 My AI Career Predictor Results:\n\n${topCourses}\n\nDiscover your career path at VAZHIKATTI!`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const canProceedToStep2 = formData.stream && formData.percentage;
  const canPredict = formData.interests.length > 0 && formData.priorities.length > 0 && formData.budget && formData.duration;

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-amber-600 bg-amber-100';
    return 'text-blue-600 bg-blue-100';
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterDuration('all');
    setFilterExam('all');
    setFilterFees('all');
    setSortBy('match');
    setShowFavoritesOnly(false);
  };

  const hasActiveFilters = searchQuery || filterDuration !== 'all' || filterExam !== 'all' || filterFees !== 'all' || showFavoritesOnly;

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
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Brain className="w-10 h-10 text-white" />
                      </div>
                      <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-amber-400" />
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                    {t('predictor.title')}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                    {t('predictor.subtitle')}
                  </p>

                  <Button
                    onClick={() => setStep('form')}
                    size="lg"
                    className="w-full max-w-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg py-6 rounded-xl"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    {t('predictor.predictCareer')}
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
                      {t('common.back')}
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
                          <h3 className="text-xl font-semibold text-foreground">{t('predictor.basicInfo')}</h3>
                          <p className="text-muted-foreground text-sm">{t('assessment12.selectStreamDesc')}</p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="stream">{t('predictor.selectStream')} *</Label>
                            <Select
                              value={formData.stream}
                              onValueChange={(value) => setFormData(prev => ({ ...prev, stream: value }))}
                            >
                              <SelectTrigger id="stream">
                                <SelectValue placeholder={t('predictor.selectStream')} />
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
                            <Label htmlFor="percentage">{t('predictor.selectPercentage')}</Label>
                            <Select
                              value={formData.percentage}
                              onValueChange={(value) => setFormData(prev => ({ ...prev, percentage: value }))}
                            >
                              <SelectTrigger id="percentage">
                                <SelectValue placeholder={t('predictor.selectPercentage')} />
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
                          {t('common.next')}
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
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{t('predictor.selectInterests')}</h3>
                          <p className="text-muted-foreground text-sm mb-4">{t('predictor.selectInterestsDesc')}</p>
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

                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{t('predictor.selectPriorities')}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{t('predictor.selectPrioritiesDesc')}</p>
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

                        <div className="space-y-2">
                          <Label>{t('predictor.budget')}</Label>
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

                        <div className="space-y-2">
                          <Label>{t('predictor.duration')}</Label>
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
                          🔮 {t('predictor.predictCareer')}
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
              className="space-y-4"
            >
              {/* Header Card */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setStep('form');
                        setFormStep(1);
                        setSelectedForCompare(new Set());
                        clearFilters();
                      }}
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      {t('common.back')}
                    </Button>
                    <div className="text-center flex-1">
                      <CardTitle className="text-xl flex items-center gap-2 justify-center">
                        <GraduationCap className="w-6 h-6" />
                        {t('predictor.yourRecommendations')}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {filteredRecommendations.length} {t('assessment12.courses').toLowerCase()}
                      </p>
                    </div>
                    {/* Share Actions */}
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={handleDownloadPDF} title={t('predictor.downloadPdf')}>
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={handleShareWhatsApp} title={t('predictor.shareWhatsApp')}>
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={handlePrint} title={t('predictor.print')}>
                        <Printer className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Search & Filter Bar */}
                <CardContent className="pt-4 pb-3 border-b">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder={`${t('common.search')}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {/* Sort */}
                    <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                      <SelectTrigger className="w-full sm:w-[160px]">
                        <ArrowUpDown className="w-4 h-4 mr-2" />
                        <SelectValue placeholder={t('predictor.sortBy')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="match">{t('predictor.matchScore')}</SelectItem>
                        <SelectItem value="fees-asc">{t('predictor.fees')}: ↑</SelectItem>
                        <SelectItem value="fees-desc">{t('predictor.fees')}: ↓</SelectItem>
                        <SelectItem value="duration">{t('predictor.duration')}</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Filters Sheet */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="relative">
                          <SlidersHorizontal className="w-4 h-4 mr-2" />
                          {t('common.filter')}
                          {hasActiveFilters && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                          )}
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>{t('predictor.filterBy')}</SheetTitle>
                        </SheetHeader>
                        <div className="space-y-6 mt-6">
                          {/* Favorites Toggle */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Checkbox
                                id="favorites"
                                checked={showFavoritesOnly}
                                onCheckedChange={(checked) => setShowFavoritesOnly(checked === true)}
                              />
                              <Label htmlFor="favorites" className="flex items-center gap-2">
                                <Heart className="w-4 h-4 text-red-500" />
                                {t('predictor.showFavorites')} ({getFavoritesCount()})
                              </Label>
                            </div>
                            {getFavoritesCount() > 0 && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full"
                                onClick={() => navigate('/career-assessment/saved-courses')}
                              >
                                <Bookmark className="w-4 h-4 mr-2" />
                                {t('common.viewAll')}
                              </Button>
                            )}
                          </div>

                          {/* Duration Filter */}
                          <div className="space-y-2">
                            <Label>{t('predictor.duration')}</Label>
                            <Select value={filterDuration} onValueChange={setFilterDuration}>
                              <SelectTrigger>
                                <SelectValue placeholder={t('predictor.allDurations')} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">{t('predictor.allDurations')}</SelectItem>
                                <SelectItem value="short">{t('predictor.shortCourses')}</SelectItem>
                                <SelectItem value="medium">{t('predictor.mediumCourses')}</SelectItem>
                                <SelectItem value="long">{t('predictor.longCourses')}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Entrance Exam Filter */}
                          <div className="space-y-2">
                            <Label>{t('predictor.entranceExam')}</Label>
                            <Select value={filterExam} onValueChange={setFilterExam}>
                              <SelectTrigger>
                                <SelectValue placeholder={t('predictor.allExams')} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">{t('predictor.allExams')}</SelectItem>
                                {uniqueExams.map(exam => (
                                  <SelectItem key={exam} value={exam}>{exam}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Fees Filter */}
                          <div className="space-y-2">
                            <Label>{t('predictor.fees')}</Label>
                            <Select value={filterFees} onValueChange={setFilterFees}>
                              <SelectTrigger>
                                <SelectValue placeholder={t('predictor.allFees')} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">{t('predictor.allFees')}</SelectItem>
                                <SelectItem value="low">{t('predictor.lowFees')}</SelectItem>
                                <SelectItem value="medium">{t('predictor.mediumFees')}</SelectItem>
                                <SelectItem value="high">{t('predictor.highFees')}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Button variant="outline" className="w-full" onClick={clearFilters}>
                            <X className="w-4 h-4 mr-2" />
                            {t('predictor.clearFilters')}
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>

                  {/* Compare Bar */}
                  {selectedForCompare.size > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 bg-primary/10 rounded-lg flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">
                        {selectedForCompare.size} {t('assessment12.courses').toLowerCase()}
                      </span>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedForCompare(new Set())}
                        >
                          {t('predictor.clearFilters')}
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => setShowCompareModal(true)}
                          disabled={selectedForCompare.size < 2}
                        >
                          <Scale className="w-4 h-4 mr-1" />
                          {t('predictor.compare')}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </CardContent>

                {/* Course List */}
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {filteredRecommendations.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>{t('predictor.showingResults')}</p>
                        <Button variant="link" onClick={clearFilters}>{t('predictor.clearFilters')}</Button>
                      </div>
                    ) : (
                      filteredRecommendations.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card
                            className="hover:shadow-md transition-all border-l-4"
                            style={{ borderLeftColor: course.matchScore >= 80 ? '#16a34a' : course.matchScore >= 60 ? '#d97706' : '#2563eb' }}
                          >
                            <CardContent className="py-4">
                              <div className="flex items-start gap-3">
                                {/* Compare Checkbox */}
                                <Checkbox
                                  checked={selectedForCompare.has(course.id)}
                                  onCheckedChange={() => handleToggleCompare(course.id)}
                                  className="mt-1"
                                />

                                {/* Course Info */}
                                <div 
                                  className="flex-1 cursor-pointer"
                                  onClick={() => setSelectedCourse(course)}
                                >
                                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <h4 className="font-semibold text-foreground">{course.name}</h4>
                                    <Badge className={getMatchColor(course.matchScore)}>
                                      {course.matchScore}% Match
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
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

                                {/* Actions */}
                                <div className="flex flex-col gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleFavorite(course.id);
                                      toast({
                                        title: isFavorite(course.id) ? "Removed from saved" : "Saved!",
                                        description: isFavorite(course.id) 
                                          ? `${course.name} removed from your saved courses`
                                          : `${course.name} added to your saved courses`
                                      });
                                    }}
                                    className="h-8 w-8"
                                  >
                                    <Heart className={`w-4 h-4 ${isFavorite(course.id) ? 'fill-red-500 text-red-500' : ''}`} />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSelectedCourse(course)}
                                    className="h-8 w-8"
                                  >
                                    <ChevronRight className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    )}
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
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge className={`${getMatchColor(selectedCourse.matchScore)} text-lg px-4 py-1`}>
                      {selectedCourse.matchScore}% Match
                    </Badge>
                    <Badge variant="outline">{selectedCourse.category}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toggleFavorite(selectedCourse.id);
                        toast({
                          title: isFavorite(selectedCourse.id) ? "Removed" : "Saved!",
                        });
                      }}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${isFavorite(selectedCourse.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      {isFavorite(selectedCourse.id) ? 'Saved' : 'Save'}
                    </Button>
                  </div>

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

                  <div>
                    <h4 className="font-medium mb-2 text-foreground">About this course</h4>
                    <p className="text-sm text-muted-foreground">{selectedCourse.description}</p>
                  </div>

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

        {/* Compare Modal */}
        <Dialog open={showCompareModal} onOpenChange={setShowCompareModal}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                Compare Courses
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {coursesForCompare.map(course => (
                  <Card key={course.id} className="border-t-4" style={{ borderTopColor: course.matchScore >= 80 ? '#16a34a' : course.matchScore >= 60 ? '#d97706' : '#2563eb' }}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{course.name}</CardTitle>
                      <Badge className={getMatchColor(course.matchScore)}>
                        {course.matchScore}% Match
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-medium">{course.duration}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fees:</span>
                        <p className="font-medium">{course.feesRange}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Entrance Exam:</span>
                        <p className="font-medium">{course.entranceExam}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Eligibility:</span>
                        <p className="font-medium">{course.eligibility}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <p className="font-medium">{course.category}</p>
                      </div>
                      {course.careerProspects && (
                        <div>
                          <span className="text-muted-foreground">Careers:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {course.careerProspects.slice(0, 3).map((c, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{c}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default AICareerPredictor;
