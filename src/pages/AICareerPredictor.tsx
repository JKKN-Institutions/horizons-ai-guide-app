import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Sparkles, ArrowLeft, Lightbulb, Target, TrendingUp, BookOpen, Briefcase, Stethoscope, Calculator, Palette, ChevronRight, Loader2, GitCompare, X, Check, DollarSign, BarChart3, Clock, Users, GraduationCap, Award, RotateCcw, Volume2, VolumeX, Download } from "lucide-react";
import confetti from "canvas-confetti";
import { generateCareerComparisonPDF } from "./generateCareerComparisonPDF";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts";

// Web Audio API celebration sound generator
const createCelebrationSound = (audioContext: AudioContext) => {
  const now = audioContext.currentTime;
  
  // Create ascending tones for celebration
  const frequencies = [523.25, 659.25, 783.99, 1046.50];
  
  frequencies.forEach((freq, i) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, now + i * 0.1);
    
    gainNode.gain.setValueAtTime(0, now + i * 0.1);
    gainNode.gain.linearRampToValueAtTime(0.15, now + i * 0.1 + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, now + i * 0.1 + 0.3);
    
    oscillator.start(now + i * 0.1);
    oscillator.stop(now + i * 0.1 + 0.35);
  });

  // Final chord
  setTimeout(() => {
    const chordFreqs = [523.25, 659.25, 783.99];
    chordFreqs.forEach((freq) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      
      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
      gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.8);
      
      osc.start(audioContext.currentTime);
      osc.stop(audioContext.currentTime + 0.9);
    });
  }, 500);
};

interface CareerPrediction {
  career: string;
  matchScore: number;
  icon: string;
  color: string;
  description: string;
  avgSalary: string;
  growthRate: string;
  // Extended comparison data
  workLifeBalance?: number;
  jobDemand?: number;
  entryDifficulty?: number;
  avgWorkHours?: string;
  topSkills?: string[];
  educationRequired?: string;
}

interface SkillRecommendation {
  skill: string;
  importance: number;
  currentLevel: number;
  resources: string[];
}

// Career comparison metrics
const getCareerMetrics = (career: CareerPrediction): CareerPrediction => {
  // Add default metrics if not present
  return {
    ...career,
    workLifeBalance: career.workLifeBalance || Math.floor(Math.random() * 30) + 60,
    jobDemand: career.jobDemand || Math.floor(Math.random() * 25) + 70,
    entryDifficulty: career.entryDifficulty || Math.floor(Math.random() * 40) + 40,
    avgWorkHours: career.avgWorkHours || `${Math.floor(Math.random() * 10) + 40}-${Math.floor(Math.random() * 10) + 45} hrs/week`,
    topSkills: career.topSkills || getDefaultSkills(career.career),
    educationRequired: career.educationRequired || getDefaultEducation(career.career),
  };
};

const getDefaultSkills = (career: string): string[] => {
  const skillMap: Record<string, string[]> = {
    "Software Developer": ["Programming", "Problem Solving", "System Design"],
    "Data Analyst": ["SQL", "Statistics", "Data Visualization"],
    "Product Manager": ["Communication", "Strategy", "User Research"],
    "Doctor": ["Medical Knowledge", "Patient Care", "Diagnosis"],
    "CA": ["Accounting", "Tax Planning", "Auditing"],
    "Engineer": ["Technical Skills", "Mathematics", "Design"],
  };
  return skillMap[career] || ["Analytical Skills", "Communication", "Technical Knowledge"];
};

const getDefaultEducation = (career: string): string => {
  const eduMap: Record<string, string> = {
    "Software Developer": "B.Tech/BCA/MCA",
    "Data Analyst": "B.Tech/B.Sc Statistics",
    "Product Manager": "MBA/B.Tech",
    "Doctor": "MBBS + MD/MS",
    "CA": "CA Foundation + Inter + Final",
    "Engineer": "B.Tech/B.E",
  };
  return eduMap[career] || "Bachelor's Degree";
};

const streams = [
  { id: "pcm", label: "Science (PCM)", icon: Calculator, description: "Physics, Chemistry, Mathematics" },
  { id: "pcb", label: "Science (PCB)", icon: Stethoscope, description: "Physics, Chemistry, Biology" },
  { id: "commerce", label: "Commerce", icon: Briefcase, description: "Business, Accounts, Economics" },
  { id: "arts", label: "Arts/Humanities", icon: Palette, description: "Literature, History, Languages" },
];

const workPreferences = [
  { id: "tech", label: "Technology" },
  { id: "healthcare", label: "Healthcare" },
  { id: "design", label: "Design" },
  { id: "business", label: "Business" },
  { id: "education", label: "Education" },
  { id: "research", label: "Research" },
];

const workStyles = [
  { id: "team", label: "Team Player" },
  { id: "solo", label: "Independent" },
  { id: "hybrid", label: "Hybrid" },
  { id: "lead", label: "Leadership" },
];

export default function AICareerPredictor() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // Start at intro step (0)
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [interests, setInterests] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState<CareerPrediction[]>([]);
  const [skills, setSkills] = useState<SkillRecommendation[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<number[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [showErrorState, setShowErrorState] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  const loadingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // AbortController for cancelling API requests
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Sound effects state (persisted in localStorage)
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('careerPredictor_soundEnabled');
      return stored !== null ? stored === 'true' : true;
    }
    return true;
  });
  
  // Audio context ref
  const audioContextRef = useRef<AudioContext | null>(null);
  
  // Persist sound preference
  useEffect(() => {
    localStorage.setItem('careerPredictor_soundEnabled', String(soundEnabled));
  }, [soundEnabled]);
  
  // Cleanup audio context on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  // Play celebration sound
  const playCelebrationSound = useCallback(() => {
    if (!soundEnabled) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      createCelebrationSound(audioContextRef.current);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }, [soundEnabled]);

  const togglePreference = (id: string) => {
    setSelectedPreferences(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const cancelAnalysis = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (loadingIntervalRef.current) {
      clearInterval(loadingIntervalRef.current);
      loadingIntervalRef.current = null;
    }
    setIsLoading(false);
    setLoadingProgress(0);
    toast.info("Analysis cancelled");
  };

  const loadingMessages = [
    "Analyzing your stream preferences...",
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
      progress += Math.random() * 8 + 2; // Random increment between 2-10
      if (progress > 95) progress = 95; // Cap at 95% until complete
      
      // Update message based on progress
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

  const getAIPredictions = async () => {
    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();
    
    setIsLoading(true);
    startLoadingProgress();
    try {
      const streamLabel = streams.find(s => s.id === selectedStream)?.label || "";
      const prefLabels = selectedPreferences.map(p => workPreferences.find(wp => wp.id === p)?.label).join(", ");
      const styleLabel = workStyles.find(s => s.id === selectedStyle)?.label || "";

      console.log("Fetching career predictions...");
      
      const { data, error } = await supabase.functions.invoke("career-predictor", {
        body: {
          interests: `${streamLabel} student interested in ${interests || prefLabels}`,
          workPreference: prefLabels,
          workStyle: styleLabel,
        },
      });

      // Check if cancelled
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      console.log("Career predictor response:", { data, error });

      if (error) {
        console.error("Supabase function error:", error);
        throw error;
      }

      if (data?.predictions && data.predictions.length > 0) {
        setPredictions(data.predictions);
        
        // Get skill recommendations for top career
        const topCareer = data.predictions[0]?.career;
        if (topCareer && !abortControllerRef.current?.signal.aborted) {
          try {
            const skillData = await supabase.functions.invoke("career-predictor", {
              body: { type: "skills", career: topCareer },
            });
            if (skillData.data?.skills) {
              setSkills(skillData.data.skills);
            }
          } catch (skillError) {
            console.error("Failed to fetch skills:", skillError);
          }
        }
        
        setShowResults(true);
      } else {
        console.warn("No predictions in response, using fallback");
        throw new Error("No predictions received");
      }
    } catch (error) {
      // Don't show error if cancelled
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }
      console.error("Error getting predictions:", error);
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
      {
        career: "Software Developer",
        matchScore: 87,
        icon: "💻",
        color: "from-blue-500 to-indigo-600",
        description: "Build applications and solve problems through code",
        avgSalary: "₹8-25 LPA",
        growthRate: "+35%",
      },
      {
        career: "Data Analyst",
        matchScore: 82,
        icon: "📊",
        color: "from-purple-500 to-pink-600",
        description: "Analyze data to drive business decisions",
        avgSalary: "₹6-18 LPA",
        growthRate: "+28%",
      },
      {
        career: "Product Manager",
        matchScore: 78,
        icon: "🎯",
        color: "from-emerald-500 to-teal-600",
        description: "Lead product development and strategy",
        avgSalary: "₹12-35 LPA",
        growthRate: "+25%",
      },
    ]);
    setShowResults(true);
  };

  const handleRetry = () => {
    setShowErrorState(false);
    setRetryCount(prev => prev + 1);
    getAIPredictions();
  };


  const canProceed = () => {
    if (step === 0) return true; // Intro step can always proceed
    if (step === 1) return selectedStream !== "";
    if (step === 2) return selectedPreferences.length > 0;
    if (step === 3) return selectedStyle !== "";
    return true;
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      getAIPredictions();
    }
  };

  const handleBack = () => {
    if (showCompareModal) {
      setShowCompareModal(false);
    } else if (showResults) {
      setShowResults(false);
      setSelectedForCompare([]);
    } else if (step > 0) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const toggleCompareSelection = (index: number) => {
    setSelectedForCompare(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      if (prev.length >= 2) {
        return [prev[1], index]; // Replace oldest selection
      }
      return [...prev, index];
    });
  };

  const handleOpenComparison = () => {
    if (selectedForCompare.length === 2) {
      setShowCompareModal(true);
    } else {
      toast.info("Select 2 careers to compare");
    }
  };

  // Confetti animation function
  const triggerConfetti = () => {
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      // Left side burst
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF6347', '#32CD32', '#1E90FF'],
      });
      // Right side burst
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF6347', '#32CD32', '#1E90FF'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Initial big burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#FFD700', '#FFA500', '#FF6347', '#32CD32', '#1E90FF', '#9370DB'],
    });

    frame();
  };

  // Trigger confetti and sound when comparison modal opens
  useEffect(() => {
    if (showCompareModal) {
      triggerConfetti();
      playCelebrationSound();
    }
  }, [showCompareModal, playCelebrationSound]);

  // Replay animation handler
  const handleReplayAnimation = () => {
    setAnimationKey(prev => prev + 1);
    triggerConfetti();
    playCelebrationSound();
  };

  const getComparisonCareers = () => {
    return selectedForCompare.map(i => getCareerMetrics(predictions[i]));
  };

  const getWinner = (metric: 'matchScore' | 'workLifeBalance' | 'jobDemand', careers: CareerPrediction[]) => {
    if (careers.length < 2) return -1;
    const val0 = careers[0][metric] || 0;
    const val1 = careers[1][metric] || 0;
    if (val0 > val1) return 0;
    if (val1 > val0) return 1;
    return -1;
  };

  // Calculate overall winner with weighted scores
  const calculateOverallScore = (career: CareerPrediction) => {
    const matchWeight = 0.30;
    const salaryWeight = 0.25;
    const growthWeight = 0.20;
    const balanceWeight = 0.15;
    const demandWeight = 0.10;

    const matchScore = career.matchScore || 0;
    const growthScore = parseInt(career.growthRate?.replace(/[^0-9]/g, '') || '0');
    const balanceScore = career.workLifeBalance || 70;
    const demandScore = career.jobDemand || 75;
    
    // Normalize salary to 0-100 scale (assuming ₹5-50 LPA range)
    const salaryMatch = career.avgSalary?.match(/(\d+)/g);
    const avgSalary = salaryMatch ? (parseInt(salaryMatch[0]) + parseInt(salaryMatch[1] || salaryMatch[0])) / 2 : 15;
    const salaryScore = Math.min((avgSalary / 50) * 100, 100);

    return Math.round(
      matchScore * matchWeight +
      salaryScore * salaryWeight +
      growthScore * growthWeight +
      balanceScore * balanceWeight +
      demandScore * demandWeight
    );
  };

  const getOverallWinner = () => {
    const careers = getComparisonCareers();
    if (careers.length < 2) return { winner: -1, scores: [0, 0], margin: 0 };
    
    const score0 = calculateOverallScore(careers[0]);
    const score1 = calculateOverallScore(careers[1]);
    
    return {
      winner: score0 > score1 ? 0 : score1 > score0 ? 1 : -1,
      scores: [score0, score1],
      margin: Math.abs(score0 - score1)
    };
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={handleBack} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI Analysis Complete</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Career Matches</h1>
            <p className="text-muted-foreground">Based on your stream, interests, and work style</p>
          </div>

          {/* Compare Button */}
          {predictions.length > 1 && (
            <div className="flex justify-center mb-6">
              <Button 
                variant={selectedForCompare.length === 2 ? "default" : "outline"}
                onClick={handleOpenComparison}
                className="gap-2"
              >
                <GitCompare className="h-4 w-4" />
                Compare Careers {selectedForCompare.length > 0 && `(${selectedForCompare.length}/2)`}
              </Button>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {predictions.map((prediction, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedForCompare.includes(index) 
                    ? "border-primary ring-2 ring-primary/20" 
                    : "hover:border-primary/50"
                }`}
                onClick={() => toggleCompareSelection(index)}
              >
                {/* Selection indicator */}
                <div className={`absolute top-3 left-3 z-10 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedForCompare.includes(index) 
                    ? "bg-primary border-primary" 
                    : "border-muted-foreground/30 bg-background"
                }`}>
                  {selectedForCompare.includes(index) && (
                    <Check className="h-4 w-4 text-primary-foreground" />
                  )}
                </div>

                {index === 0 && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                    Best Match
                  </div>
                )}
                <CardContent className="p-6 pt-10">
                  <div className="text-4xl mb-4">{prediction.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{prediction.career}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${prediction.color}`}
                        style={{ width: `${prediction.matchScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold">{prediction.matchScore}%</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{prediction.description}</p>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Salary</p>
                      <p className="font-semibold">{prediction.avgSalary}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Growth</p>
                      <p className="font-semibold text-green-600">{prediction.growthRate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Modal */}
          <Dialog open={showCompareModal} onOpenChange={setShowCompareModal}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center justify-between gap-4">
                  <DialogTitle className="flex items-center gap-2 text-xl">
                    <GitCompare className="h-5 w-5 text-primary" />
                    Career Comparison
                  </DialogTitle>
                  <div className="flex items-center gap-3">
                    {/* Sound Toggle */}
                    <div className="flex items-center gap-2">
                      <Switch
                        id="sound-toggle"
                        checked={soundEnabled}
                        onCheckedChange={setSoundEnabled}
                        className="data-[state=checked]:bg-primary"
                      />
                      <Label
                        htmlFor="sound-toggle"
                        className="text-xs text-muted-foreground cursor-pointer flex items-center gap-1"
                      >
                        {soundEnabled ? (
                          <Volume2 className="h-3.5 w-3.5" />
                        ) : (
                          <VolumeX className="h-3.5 w-3.5" />
                        )}
                        Sound
                      </Label>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReplayAnimation}
                      className="gap-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Replay
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const careers = getComparisonCareers();
                        const result = getOverallWinner();
                        generateCareerComparisonPDF(careers, result);
                        toast.success("PDF downloaded successfully!");
                      }}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      PDF
                    </Button>
                  </div>
                </div>
              </DialogHeader>
              
              {selectedForCompare.length === 2 && (
                <div className="space-y-6 pt-4">
                  {/* Career Headers */}
                  <div className="grid grid-cols-2 gap-4">
                    {getComparisonCareers().map((career, i) => (
                      <Card key={i} className={`p-4 ${i === 0 ? 'border-blue-200 bg-blue-50/50' : 'border-purple-200 bg-purple-50/50'}`}>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{career.icon}</span>
                          <div>
                            <h3 className="font-bold text-lg">{career.career}</h3>
                            <Badge variant="secondary" className="mt-1">
                              {career.matchScore}% Match
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Overall Winner Section with Animated Score Reveal */}
                  {(() => {
                    const result = getOverallWinner();
                    const careers = getComparisonCareers();
                    return (
                      <Card className="overflow-hidden border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
                        <CardHeader className="pb-3 bg-gradient-to-r from-amber-100/80 to-orange-100/80">
                          <CardTitle className="text-center flex items-center justify-center gap-2">
                            <Award className="h-5 w-5 text-amber-600" />
                            Overall Comparison Score
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 pb-6">
                          <div key={animationKey} className="grid grid-cols-2 gap-6 mb-6">
                            {careers.map((career, i) => {
                              const isWinner = result.winner === i;
                              return (
                                <div 
                                  key={i} 
                                  className={`relative text-center p-6 rounded-2xl transition-all duration-500 ${
                                    isWinner 
                                      ? 'bg-gradient-to-br from-green-100 to-emerald-100 ring-4 ring-green-500 shadow-lg shadow-green-200 scale-105' 
                                      : 'bg-muted/50'
                                  }`}
                                  style={{ 
                                    animation: 'fade-in 0.5s ease-out forwards',
                                    animationDelay: `${i * 0.2}s`,
                                    opacity: 0
                                  }}
                                >
                                  {isWinner && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full animate-scale-in">
                                      🏆 WINNER
                                    </div>
                                  )}
                                  <span className="text-3xl block mb-2">{career.icon}</span>
                                  <p className="font-semibold text-sm mb-3 truncate">{career.career}</p>
                                  
                                  {/* Animated Score Circle */}
                                  <div className="relative w-24 h-24 mx-auto">
                                    <svg className="w-full h-full transform -rotate-90">
                                      <circle
                                        cx="48"
                                        cy="48"
                                        r="42"
                                        fill="none"
                                        stroke="#e5e7eb"
                                        strokeWidth="8"
                                      />
                                      <circle
                                        cx="48"
                                        cy="48"
                                        r="42"
                                        fill="none"
                                        stroke={isWinner ? "#22c55e" : i === 0 ? "#3b82f6" : "#a855f7"}
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray={`${2 * Math.PI * 42}`}
                                        strokeDashoffset={`${2 * Math.PI * 42 * (1 - result.scores[i] / 100)}`}
                                        style={{
                                          transition: 'stroke-dashoffset 1.5s ease-out',
                                          transitionDelay: `${0.5 + i * 0.3}s`
                                        }}
                                      />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span 
                                        className={`text-2xl font-bold ${isWinner ? 'text-green-600' : 'text-foreground'}`}
                                        style={{
                                          animation: 'scale-in 0.5s ease-out forwards',
                                          animationDelay: `${0.8 + i * 0.3}s`,
                                          opacity: 0
                                        }}
                                      >
                                        {result.scores[i]}
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-2">out of 100</p>
                                </div>
                              );
                            })}
                          </div>

                          {/* Score Breakdown */}
                          <div 
                            className="text-center p-4 bg-white/60 rounded-xl"
                            style={{
                              animation: 'fade-in 0.5s ease-out forwards',
                              animationDelay: '1.2s',
                              opacity: 0
                            }}
                          >
                            {result.winner !== -1 ? (
                              <p className="text-sm">
                                <span className="font-bold text-green-600">{careers[result.winner]?.career}</span>
                                {' '}wins by{' '}
                                <span className="font-bold">{result.margin} points</span>
                                {' '}based on salary, growth, balance, and demand factors.
                              </p>
                            ) : (
                              <p className="text-sm font-medium text-amber-700">
                                It's a tie! Both careers score equally well.
                              </p>
                            )}
                          </div>

                          {/* Scoring Criteria */}
                          <div 
                            className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground"
                            style={{
                              animation: 'fade-in 0.5s ease-out forwards',
                              animationDelay: '1.5s',
                              opacity: 0
                            }}
                          >
                            <Badge variant="outline" className="bg-white/50">Match 30%</Badge>
                            <Badge variant="outline" className="bg-white/50">Salary 25%</Badge>
                            <Badge variant="outline" className="bg-white/50">Growth 20%</Badge>
                            <Badge variant="outline" className="bg-white/50">Balance 15%</Badge>
                            <Badge variant="outline" className="bg-white/50">Demand 10%</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })()}

                  {/* Radar Chart Visualization */}
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-purple-50">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        Skills & Metrics Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart 
                            data={(() => {
                              const careers = getComparisonCareers();
                              return [
                                { metric: 'Match Score', career1: careers[0]?.matchScore || 0, career2: careers[1]?.matchScore || 0 },
                                { metric: 'Work-Life Balance', career1: careers[0]?.workLifeBalance || 0, career2: careers[1]?.workLifeBalance || 0 },
                                { metric: 'Job Demand', career1: careers[0]?.jobDemand || 0, career2: careers[1]?.jobDemand || 0 },
                                { metric: 'Entry Ease', career1: 100 - (careers[0]?.entryDifficulty || 50), career2: 100 - (careers[1]?.entryDifficulty || 50) },
                                { metric: 'Growth Potential', career1: parseInt(careers[0]?.growthRate?.replace(/[^0-9]/g, '') || '0'), career2: parseInt(careers[1]?.growthRate?.replace(/[^0-9]/g, '') || '0') },
                              ];
                            })()}
                            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                          >
                            <PolarGrid stroke="#e5e7eb" />
                            <PolarAngleAxis 
                              dataKey="metric" 
                              tick={{ fill: '#6b7280', fontSize: 11 }}
                            />
                            <PolarRadiusAxis 
                              angle={90} 
                              domain={[0, 100]} 
                              tick={{ fill: '#9ca3af', fontSize: 10 }}
                            />
                            <Radar
                              name={getComparisonCareers()[0]?.career || 'Career 1'}
                              dataKey="career1"
                              stroke="#3b82f6"
                              fill="#3b82f6"
                              fillOpacity={0.3}
                              strokeWidth={2}
                            />
                            <Radar
                              name={getComparisonCareers()[1]?.career || 'Career 2'}
                              dataKey="career2"
                              stroke="#a855f7"
                              fill="#a855f7"
                              fillOpacity={0.3}
                              strokeWidth={2}
                            />
                            <Legend 
                              wrapperStyle={{ paddingTop: '10px' }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-center gap-6 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          <span>{getComparisonCareers()[0]?.career}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500" />
                          <span>{getComparisonCareers()[1]?.career}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Comparison Metrics */}
                  <div className="space-y-4">
                    {/* Salary Comparison */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          Salary Range
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4">
                          {getComparisonCareers().map((career, i) => (
                            <div key={i} className="text-center py-3 bg-muted/50 rounded-lg">
                              <p className="text-2xl font-bold text-green-600">{career.avgSalary}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Growth Rate */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          Growth Rate
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4">
                          {getComparisonCareers().map((career, i) => (
                            <div key={i} className="text-center py-3 bg-muted/50 rounded-lg">
                              <p className="text-2xl font-bold text-blue-600">{career.growthRate}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Work-Life Balance */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-600" />
                          Work-Life Balance
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4">
                          {getComparisonCareers().map((career, i) => {
                            const winner = getWinner('workLifeBalance', getComparisonCareers());
                            return (
                              <div key={i} className={`text-center py-3 rounded-lg ${winner === i ? 'bg-green-100 ring-2 ring-green-500' : 'bg-muted/50'}`}>
                                <p className="text-2xl font-bold">{career.workLifeBalance}%</p>
                                {winner === i && <Badge className="mt-1 bg-green-600">Better</Badge>}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Job Demand */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-600" />
                          Job Market Demand
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4">
                          {getComparisonCareers().map((career, i) => {
                            const winner = getWinner('jobDemand', getComparisonCareers());
                            return (
                              <div key={i} className={`text-center py-3 rounded-lg ${winner === i ? 'bg-green-100 ring-2 ring-green-500' : 'bg-muted/50'}`}>
                                <p className="text-2xl font-bold">{career.jobDemand}%</p>
                                {winner === i && <Badge className="mt-1 bg-green-600">Higher</Badge>}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Education Required */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-indigo-600" />
                          Education Required
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4">
                          {getComparisonCareers().map((career, i) => (
                            <div key={i} className="text-center py-3 bg-muted/50 rounded-lg">
                              <p className="font-semibold">{career.educationRequired}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Top Skills */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Award className="h-4 w-4 text-amber-600" />
                          Key Skills Required
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4">
                          {getComparisonCareers().map((career, i) => (
                            <div key={i} className="py-3">
                              <div className="flex flex-wrap gap-2 justify-center">
                                {career.topSkills?.map((skill, si) => (
                                  <Badge key={si} variant="outline">{skill}</Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center pt-4">
                    <Button onClick={() => setShowCompareModal(false)}>
                      Close Comparison
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {skills.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Skills to Develop
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {skills.map((skill, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold">{skill.skill}</h4>
                        <Badge variant="secondary">{skill.importance}% Important</Badge>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Current Level</span>
                          <span>{skill.currentLevel}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary"
                            style={{ width: `${skill.currentLevel}%` }}
                          />
                        </div>
                      </div>
                      {skill.resources.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {skill.resources.slice(0, 2).map((resource, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {resource}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            <Button size="lg" onClick={() => navigate("/career-assessment")}>
              Take Full Career Assessment
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {step > 0 && (
          <Button variant="ghost" onClick={handleBack} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}

        {/* Intro Step */}
        {step === 0 && (
          <div className="max-w-xl mx-auto text-center py-12">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-200">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-amber-400" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              AI Career Predictor
            </h1>
            <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
              Get AI-powered career predictions based on your interests and skills
            </p>

            <Button
              onClick={() => setStep(1)}
              size="lg"
              className="w-full max-w-md bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white text-lg py-6 rounded-xl shadow-lg shadow-purple-200"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Predict My Career
            </Button>
          </div>
        )}

        {/* Form Steps */}
        {step >= 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI Career Predictor</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Discover Your Career Path</h1>
              <p className="text-muted-foreground">Answer a few questions to get AI-powered career recommendations</p>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-2 w-12 rounded-full transition-colors ${
                    s <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

          {/* Step 1: Stream Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center mb-6">Choose Your Stream</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {streams.map((stream) => (
                  <Card
                    key={stream.id}
                    className={`cursor-pointer transition-all hover:border-primary/50 ${
                      selectedStream === stream.id ? "border-2 border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedStream(stream.id)}
                  >
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${selectedStream === stream.id ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        <stream.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{stream.label}</h3>
                        <p className="text-sm text-muted-foreground">{stream.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Work Preferences */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center mb-6">What interests you? (Select multiple)</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {workPreferences.map((pref) => (
                  <Badge
                    key={pref.id}
                    variant={selectedPreferences.includes(pref.id) ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
                    onClick={() => togglePreference(pref.id)}
                  >
                    {pref.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Work Style */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center mb-6">How do you prefer to work?</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {workStyles.map((style) => (
                  <Card
                    key={style.id}
                    className={`cursor-pointer transition-all hover:border-primary/50 ${
                      selectedStyle === style.id ? "border-2 border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <span className="font-medium">{style.label}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Additional Interests */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center mb-6">Tell us more (optional)</h2>
              <Input
                placeholder="E.g., I enjoy solving puzzles, creating art, helping people..."
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="text-center"
              />
              <p className="text-sm text-muted-foreground text-center">
                This helps our AI provide more personalized recommendations
              </p>
            </div>
          )}

          {/* Error State with Retry */}
          {showErrorState && !isLoading && (
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mb-4">
                  <X className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Failed to get AI predictions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {retryCount >= 2 
                    ? "Multiple attempts failed. You can try again or view sample career results."
                    : "The AI service is temporarily unavailable. You can retry or view sample results."}
                </p>
                <div className="flex justify-center gap-3">
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

          {/* Loading Progress Card */}
          {isLoading && (
            <Card className="border-primary/30 bg-primary/5 animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <Brain className="h-4 w-4 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary">AI Analyzing Your Profile</h3>
                    <p className="text-sm text-muted-foreground">{loadingMessage}</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 ease-out"
                      style={{ width: `${loadingProgress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{Math.round(loadingProgress)}% complete</span>
                  <span>Est. {Math.max(1, Math.ceil((100 - loadingProgress) / 10))}s remaining</span>
                </div>
                
                <div className="flex justify-center mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={cancelAnalysis}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          {!showErrorState && !isLoading && (
            <div className="flex justify-center gap-3 mt-8">
              <Button
                size="lg"
                onClick={handleNext}
                disabled={!canProceed()}
                className="min-w-[200px]"
              >
                {step === 4 ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get Predictions
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="h-4 w-4 ml-2" />
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
}
