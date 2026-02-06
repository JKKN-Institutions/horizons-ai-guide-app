import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles, ArrowLeft, ChevronRight, ChevronLeft, Loader2, X, Check, RotateCcw, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { groupToStream, skillCategories, careerPriorities } from "@/data/tnGroupTaxonomy";

import BoardSelector from "@/components/AICareerPredictor/BoardSelector";
import GroupSelector from "@/components/AICareerPredictor/GroupSelector";
import InterestAssessment from "@/components/AICareerPredictor/InterestAssessment";
import SkillAssessment from "@/components/AICareerPredictor/SkillAssessment";
import PriorityRanker from "@/components/AICareerPredictor/PriorityRanker";
import SituationForm from "@/components/AICareerPredictor/SituationForm";
import AcademicPerformance from "@/components/AICareerPredictor/AcademicPerformance";
import WizardProgress from "@/components/AICareerPredictor/WizardProgress";
import ResultsDashboard from "@/components/AICareerPredictor/ResultsDashboard";

// Animation variants
const stepVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 }
};

const TOTAL_STEPS = 7;
const STEP_LABELS = ["Board", "Group", "Interests", "Skills", "Priorities", "Situation", "Academics"];

interface CareerPrediction {
  career: string;
  matchScore: number;
  icon: string;
  color: string;
  description: string;
  avgSalary: string;
  growthRate: string;
  workLifeBalance?: number;
  jobDemand?: number;
  entryDifficulty?: number;
  topSkills?: string[];
  educationRequired?: string;
}

interface SkillRecommendation {
  skill: string;
  importance: number;
  currentLevel: number;
  resources: string[];
}

// Testimonials
const testimonials = [
  { name: "Priya Sharma", role: "B.Tech CSE Student", college: "JKKN College of Engineering", quote: "This tool helped me discover my passion for Data Science!", avatar: "PS", color: "from-emerald-500 to-teal-500" },
  { name: "Karthik Raja", role: "MBBS Student", college: "JKKN Medical College", quote: "I was confused between Engineering and Medicine. The AI predictor showed me my true calling.", avatar: "KR", color: "from-violet-500 to-purple-500" },
  { name: "Anitha Devi", role: "B.Pharm Graduate", college: "JKKN Pharmacy College", quote: "Got personalized recommendations that matched my interests perfectly!", avatar: "AD", color: "from-amber-500 to-orange-500" },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrentIndex(prev => (prev + 1) % testimonials.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div className="mt-10 pt-8 border-t border-border/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
      <div className="flex items-center justify-center gap-2 mb-4">
        <Quote className="w-4 h-4 text-muted-foreground" />
        <p className="text-sm font-medium text-muted-foreground">Student Success Stories</p>
      </div>
      <div className="relative max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-6 border border-border/50">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[currentIndex].color} flex items-center justify-center text-white font-semibold text-sm shrink-0`}>
                {testimonials[currentIndex].avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-relaxed mb-3">&quot;{testimonials[currentIndex].quote}&quot;</p>
                <p className="font-semibold text-sm">{testimonials[currentIndex].name}</p>
                <p className="text-xs text-muted-foreground">{testimonials[currentIndex].role}</p>
                <p className="text-xs text-primary">{testimonials[currentIndex].college}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"}`} />
        ))}
      </div>
    </motion.div>
  );
};

const AICareerPredictor = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0 = intro

  // Step 1: Board
  const [selectedBoard, setSelectedBoard] = useState("tn_state");
  // Step 2: Group
  const [selectedGroup, setSelectedGroup] = useState("");
  // Step 3: Interests
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  // Step 4: Skills
  const [skillRatings, setSkillRatings] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {};
    skillCategories.forEach(skill => { defaults[skill.id] = 3; });
    return defaults;
  });
  // Step 5: Priorities
  const [rankedPriorities, setRankedPriorities] = useState<string[]>([]);
  // Step 6: Situation
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [examReadiness, setExamReadiness] = useState("");
  // Step 7: Academic
  const [percentage, setPercentage] = useState("");
  const [strongestSubject, setStrongestSubject] = useState("");
  const [weakestSubject, setWeakestSubject] = useState("");
  const [entranceScore, setEntranceScore] = useState("");
  const [notAppeared, setNotAppeared] = useState(false);

  // Results
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState<CareerPrediction[]>([]);
  const [skills, setSkills] = useState<SkillRecommendation[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showErrorState, setShowErrorState] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  const loadingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const selectedStream = groupToStream[selectedGroup] || "";

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleUpdateSkill = (skillId: string, value: number) => {
    setSkillRatings(prev => ({ ...prev, [skillId]: value }));
  };

  const handleGroupSelect = (groupId: string) => {
    setSelectedGroup(groupId);
  };

  const loadingMessages = [
    "Analyzing your profile...",
    "Matching career patterns...",
    "Evaluating job market trends...",
    "Calculating skill requirements...",
    "Generating personalized recommendations...",
    "Almost there..."
  ];

  const startLoadingProgress = () => {
    setLoadingProgress(0);
    setLoadingMessage(loadingMessages[0]);
    let progress = 0;
    let messageIndex = 0;
    loadingIntervalRef.current = setInterval(() => {
      progress += Math.random() * 8 + 2;
      if (progress > 95) progress = 95;
      const newMessageIndex = Math.min(Math.floor(progress / 18), loadingMessages.length - 1);
      if (newMessageIndex !== messageIndex) {
        messageIndex = newMessageIndex;
        setLoadingMessage(loadingMessages[messageIndex]);
      }
      setLoadingProgress(progress);
    }, 500);
  };

  const stopLoadingProgress = () => {
    if (loadingIntervalRef.current) {
      clearInterval(loadingIntervalRef.current);
      loadingIntervalRef.current = null;
    }
    setLoadingProgress(100);
  };

  const cancelAnalysis = () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
    setIsLoading(false);
    setLoadingProgress(0);
    toast.info("Analysis cancelled");
  };

  const getAIPredictions = async () => {
    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    startLoadingProgress();
    try {
      const interestLabels = selectedInterests.join(", ");
      const { data, error } = await supabase.functions.invoke("career-predictor", {
        body: {
          interests: `Group ${selectedGroup} student interested in ${interestLabels}`,
          workPreference: interestLabels,
          workStyle: rankedPriorities.slice(0, 3).join(", "),
          budget, location, duration, percentage, examReadiness,
          skillRatings, strongestSubject, weakestSubject, entranceScore,
        },
      });

      if (abortControllerRef.current?.signal.aborted) return;
      if (error) throw error;

      if (data?.predictions?.length > 0) {
        const predictionsData = data.predictions;
        let skillsData: SkillRecommendation[] = [];
        const topCareer = predictionsData[0]?.career;

        if (topCareer && !abortControllerRef.current?.signal.aborted) {
          try {
            const skillResponse = await supabase.functions.invoke("career-predictor", {
              body: { type: "skills", career: topCareer },
            });
            if (skillResponse.data?.skills) skillsData = skillResponse.data.skills;
          } catch (e) { console.error("Skills fetch failed:", e); }
        }

        setPredictions(predictionsData);
        setSkills(skillsData);
        setShowResults(true);
      } else {
        throw new Error("No predictions received");
      }
    } catch (error) {
      if (abortControllerRef.current?.signal.aborted) return;
      console.error("Error:", error);
      setShowErrorState(true);
      toast.error("Failed to get predictions. You can retry or view sample results.");
    } finally {
      stopLoadingProgress();
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const useFallbackResults = () => {
    setShowErrorState(false);
    setPredictions([
      { career: "Software Developer", matchScore: 87, icon: "💻", color: "from-blue-500 to-indigo-600", description: "Build applications and solve problems through code", avgSalary: "₹8-25 LPA", growthRate: "+35%" },
      { career: "Data Analyst", matchScore: 82, icon: "📊", color: "from-purple-500 to-pink-600", description: "Analyze data to drive business decisions", avgSalary: "₹6-18 LPA", growthRate: "+28%" },
      { career: "Product Manager", matchScore: 78, icon: "🎯", color: "from-emerald-500 to-teal-600", description: "Lead product development and strategy", avgSalary: "₹12-35 LPA", growthRate: "+25%" },
    ]);
    setShowResults(true);
  };

  const handleRetry = () => {
    setShowErrorState(false);
    setRetryCount(prev => prev + 1);
    getAIPredictions();
  };

  const canProceed = (): boolean => {
    if (step === 0) return true;
    if (step === 1) return !!selectedBoard;
    if (step === 2) return !!selectedGroup;
    if (step === 3) return selectedInterests.length > 0;
    if (step === 4) return true; // Skills always have defaults
    if (step === 5) return true; // Priorities always have defaults
    if (step === 6) return !!budget && !!location && !!duration && !!examReadiness;
    if (step === 7) return !!percentage;
    return true;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      getAIPredictions();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else navigate(-1);
  };

  const handleRetake = () => {
    setShowResults(false);
    setPredictions([]);
    setSkills([]);
    setStep(0);
  };

  // Results view
  if (showResults) {
    return (
      <ResultsDashboard
        predictions={predictions}
        skills={skills}
        stream={selectedStream}
        selectedGroup={selectedGroup}
        onBack={() => setShowResults(false)}
        onRetake={handleRetake}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        {step > 0 && (
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}

        {/* Intro / Landing */}
        {step === 0 && (
          <motion.div
            className="max-w-2xl mx-auto text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Card Entry Point */}
            <Card className="border-0 shadow-xl overflow-hidden mb-8">
              <CardContent className="p-8 md:p-12">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-10 w-10 text-primary" />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-3">AI Career Predictor</h1>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Get AI-powered career predictions based on your interests, skills, and academic profile
                </p>

                <div className="flex justify-center gap-3 mb-8">
                  <Badge variant="secondary" className="text-sm px-4 py-1.5">✨ Personalized</Badge>
                  <Badge variant="secondary" className="text-sm px-4 py-1.5">💡 Smart Tips</Badge>
                </div>

                <Button
                  onClick={() => setStep(1)}
                  size="lg"
                  className="w-full max-w-sm bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground text-lg py-6 rounded-2xl shadow-lg transition-all hover:shadow-xl"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get Predictions
                </Button>

                {/* Stats */}
                <div className="flex justify-center gap-8 mt-10 pt-8 border-t border-border/50">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">50K+</p>
                    <p className="text-xs text-muted-foreground">Students Helped</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">95%</p>
                    <p className="text-xs text-muted-foreground">Accuracy Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">100+</p>
                    <p className="text-xs text-muted-foreground">Career Paths</p>
                  </div>
                </div>

                <TestimonialCarousel />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Wizard Steps */}
        {step >= 1 && (
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI Career Predictor</span>
              </div>
            </div>

            {/* Progress */}
            <WizardProgress currentStep={step} totalSteps={TOTAL_STEPS} stepLabels={STEP_LABELS} />

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                  <BoardSelector selectedBoard={selectedBoard} onSelectBoard={setSelectedBoard} />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                  <GroupSelector selectedGroup={selectedGroup} onSelectGroup={handleGroupSelect} />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                  <InterestAssessment selectedInterests={selectedInterests} onToggleInterest={toggleInterest} />
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="s4" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                  <SkillAssessment skillRatings={skillRatings} onUpdateSkill={handleUpdateSkill} />
                </motion.div>
              )}

              {step === 5 && (
                <motion.div key="s5" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                  <PriorityRanker rankedPriorities={rankedPriorities} onReorder={setRankedPriorities} />
                </motion.div>
              )}

              {step === 6 && (
                <motion.div key="s6" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                  <SituationForm
                    budget={budget} location={location} duration={duration} examReadiness={examReadiness}
                    onChangeBudget={setBudget} onChangeLocation={setLocation} onChangeDuration={setDuration} onChangeExamReadiness={setExamReadiness}
                  />
                </motion.div>
              )}

              {step === 7 && (
                <motion.div key="s7" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                  <AcademicPerformance
                    percentage={percentage} onChangePercentage={setPercentage}
                    strongestSubject={strongestSubject} onChangeStrongest={setStrongestSubject}
                    weakestSubject={weakestSubject} onChangeWeakest={setWeakestSubject}
                    entranceScore={entranceScore} onChangeEntranceScore={setEntranceScore}
                    notAppeared={notAppeared} onChangeNotAppeared={setNotAppeared}
                    selectedGroup={selectedGroup}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error State */}
            {showErrorState && !isLoading && (
              <Card className="border-destructive/50 bg-destructive/5 animate-fade-in mt-6">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-destructive/10 mb-5">
                    <X className="h-7 w-7 text-destructive" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Failed to get AI predictions</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {retryCount >= 2
                      ? "Multiple attempts failed. You can try again or view sample results."
                      : "The AI service is temporarily unavailable. You can retry or view sample results."}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <Button onClick={handleRetry} className="gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Retry {retryCount > 0 && `(${retryCount})`}
                    </Button>
                    <Button variant="outline" onClick={useFallbackResults}>
                      View Sample Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Loading */}
            {isLoading && (
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 animate-fade-in overflow-hidden mt-6">
                <CardContent className="p-8">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                      </div>
                      <Brain className="h-4 w-4 text-primary absolute -bottom-1 -right-1 bg-background rounded-full p-0.5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary text-lg">🎯 Analyzing Your Profile</h3>
                      <p className="text-sm text-muted-foreground">{loadingMessage}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 rounded-full" style={{ width: `${loadingProgress}%` }} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{Math.round(loadingProgress)}% complete</span>
                    <span>Est. {Math.max(1, Math.ceil((100 - loadingProgress) / 10))}s remaining</span>
                  </div>
                  <div className="flex justify-center mt-6">
                    <Button variant="outline" size="sm" onClick={cancelAnalysis} className="gap-2 bg-background/80">
                      <X className="h-4 w-4" /> Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            {!showErrorState && !isLoading && (
              <div className="flex justify-between gap-3 mt-10">
                <Button variant="outline" size="lg" onClick={handleBack} className="gap-2">
                  <ChevronLeft className="h-5 w-5" />
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="min-w-[180px] gap-2 shadow-lg shadow-primary/20"
                >
                  {step === TOTAL_STEPS ? (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Get My Career Recommendations
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AICareerPredictor;
