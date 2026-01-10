import { useState, useEffect, useRef, useCallback, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles, ArrowLeft, Lightbulb, Target, TrendingUp, BookOpen, Briefcase, Stethoscope, Calculator, Palette, ChevronRight, ChevronLeft, Loader2, GitCompare, X, Check, DollarSign, BarChart3, Clock, Users, GraduationCap, Award, RotateCcw, Volume2, VolumeX, Download, FileText, MapPin, Quote } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts";
import TamilNaduMap from "@/components/TamilNaduMap";

// Animation variants
const stepVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 }
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

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
  { id: "pcm", label: "Science (PCM)", icon: Calculator, description: "Physics, Chemistry, Mathematics", color: "from-blue-500 to-cyan-500", bgLight: "bg-blue-50", borderColor: "border-blue-300", textColor: "text-blue-700" },
  { id: "pcb", label: "Science (PCB)", icon: Stethoscope, description: "Physics, Chemistry, Biology", color: "from-emerald-500 to-teal-500", bgLight: "bg-emerald-50", borderColor: "border-emerald-300", textColor: "text-emerald-700" },
  { id: "pcmb", label: "Science (PCMB)", icon: GraduationCap, description: "Physics, Chemistry, Math & Biology", color: "from-violet-500 to-purple-500", bgLight: "bg-violet-50", borderColor: "border-violet-300", textColor: "text-violet-700" },
  { id: "commerce", label: "Commerce", icon: Briefcase, description: "Business, Accounts, Economics", color: "from-amber-500 to-orange-500", bgLight: "bg-amber-50", borderColor: "border-amber-300", textColor: "text-amber-700" },
  { id: "arts", label: "Arts/Humanities", icon: Palette, description: "Literature, History, Languages", color: "from-pink-500 to-rose-500", bgLight: "bg-pink-50", borderColor: "border-pink-300", textColor: "text-pink-700" },
];

const percentageRanges = [
  { id: "above90", label: "Above 90%", description: "Excellent", color: "from-emerald-500 to-green-500", emoji: "🌟" },
  { id: "80-90", label: "80% - 90%", description: "Very Good", color: "from-blue-500 to-cyan-500", emoji: "✨" },
  { id: "70-80", label: "70% - 80%", description: "Good", color: "from-violet-500 to-purple-500", emoji: "👍" },
  { id: "60-70", label: "60% - 70%", description: "Average", color: "from-amber-500 to-orange-500", emoji: "📚" },
  { id: "below60", label: "Below 60%", description: "Pass", color: "from-pink-500 to-rose-500", emoji: "💪" },
];

const workPreferences = [
  { id: "tech", label: "Technology", icon: "💻", color: "from-blue-500 to-cyan-500", bgLight: "bg-blue-50", borderColor: "border-blue-300" },
  { id: "healthcare", label: "Healthcare", icon: "🏥", color: "from-emerald-500 to-teal-500", bgLight: "bg-emerald-50", borderColor: "border-emerald-300" },
  { id: "design", label: "Design", icon: "🎨", color: "from-pink-500 to-rose-500", bgLight: "bg-pink-50", borderColor: "border-pink-300" },
  { id: "business", label: "Business", icon: "📊", color: "from-amber-500 to-orange-500", bgLight: "bg-amber-50", borderColor: "border-amber-300" },
  { id: "education", label: "Education", icon: "📚", color: "from-violet-500 to-purple-500", bgLight: "bg-violet-50", borderColor: "border-violet-300" },
  { id: "research", label: "Research", icon: "🔬", color: "from-indigo-500 to-blue-500", bgLight: "bg-indigo-50", borderColor: "border-indigo-300" },
  { id: "law", label: "Law", icon: "⚖️", color: "from-slate-500 to-gray-600", bgLight: "bg-slate-50", borderColor: "border-slate-300" },
  { id: "media", label: "Media & Arts", icon: "🎬", color: "from-fuchsia-500 to-pink-500", bgLight: "bg-fuchsia-50", borderColor: "border-fuchsia-300" },
];

const workStyles = [
  { id: "team", label: "Team Player", icon: "👥", color: "from-blue-500 to-cyan-500", description: "Collaborate with others" },
  { id: "solo", label: "Independent", icon: "🎯", color: "from-violet-500 to-purple-500", description: "Work on your own" },
  { id: "hybrid", label: "Hybrid", icon: "🔄", color: "from-emerald-500 to-teal-500", description: "Mix of both" },
  { id: "lead", label: "Leadership", icon: "👑", color: "from-amber-500 to-orange-500", description: "Lead and manage" },
];

const budgetRanges = [
  { id: "low", label: "Under ₹50K/year", icon: DollarSign, description: "Government/Low-cost colleges", color: "from-emerald-500 to-green-500", emoji: "💰" },
  { id: "medium", label: "₹50K - ₹2L/year", icon: DollarSign, description: "Private colleges", color: "from-blue-500 to-cyan-500", emoji: "💵" },
  { id: "high", label: "₹2L - ₹5L/year", icon: DollarSign, description: "Premier institutions", color: "from-violet-500 to-purple-500", emoji: "💎" },
  { id: "premium", label: "Above ₹5L/year", icon: DollarSign, description: "Top private/International", color: "from-amber-500 to-orange-500", emoji: "🌟" },
  { id: "flexible", label: "No Budget Constraint", icon: DollarSign, description: "Open to all options", color: "from-pink-500 to-rose-500", emoji: "✨" },
];

const courseDurations = [
  { id: "3years", label: "3 Years", description: "Bachelor's degree", icon: "📖", color: "from-emerald-500 to-teal-500" },
  { id: "4years", label: "4 Years", description: "B.Tech/B.E/MBBS etc.", icon: "🎓", color: "from-blue-500 to-cyan-500" },
  { id: "5years", label: "5+ Years", description: "Integrated courses", icon: "🏆", color: "from-violet-500 to-purple-500" },
  { id: "flexible", label: "Any Duration", description: "Open to all options", icon: "🔓", color: "from-amber-500 to-orange-500" },
];

const careerGoals = [
  { id: "job", label: "Get a Job", icon: Briefcase, description: "Start working after graduation", color: "from-blue-500 to-cyan-500", emoji: "💼" },
  { id: "higher", label: "Higher Studies", icon: GraduationCap, description: "Masters, PhD, Research", color: "from-violet-500 to-purple-500", emoji: "🎓" },
  { id: "govt", label: "Government Job", icon: Award, description: "UPSC, State PSC, Bank exams", color: "from-emerald-500 to-teal-500", emoji: "🏛️" },
  { id: "startup", label: "Entrepreneurship", icon: TrendingUp, description: "Start your own business", color: "from-amber-500 to-orange-500", emoji: "🚀" },
  { id: "abroad", label: "Study Abroad", icon: Target, description: "International education", color: "from-pink-500 to-rose-500", emoji: "✈️" },
];

const locationPreferences = [
  { id: "tamilnadu", label: "Tamil Nadu", description: "Any district in TN", isGroup: true, color: "from-emerald-500 to-green-600", bgColor: "bg-emerald-50", borderColor: "border-emerald-400", emoji: "🌴" },
  { id: "chennai", label: "Chennai", description: "Capital city", color: "from-rose-500 to-pink-600", bgColor: "bg-rose-50", borderColor: "border-rose-400", emoji: "🏛️" },
  { id: "coimbatore", label: "Coimbatore", description: "Manchester of South India", color: "from-blue-500 to-indigo-600", bgColor: "bg-blue-50", borderColor: "border-blue-400", emoji: "🏭" },
  { id: "madurai", label: "Madurai", description: "Cultural hub", color: "from-amber-500 to-orange-600", bgColor: "bg-amber-50", borderColor: "border-amber-400", emoji: "🛕" },
  { id: "tiruchirappalli", label: "Tiruchirappalli", description: "Central TN", color: "from-purple-500 to-violet-600", bgColor: "bg-purple-50", borderColor: "border-purple-400", emoji: "🏰" },
  { id: "salem", label: "Salem", description: "Steel city", color: "from-slate-500 to-gray-600", bgColor: "bg-slate-50", borderColor: "border-slate-400", emoji: "⚙️" },
  { id: "namakkal", label: "Namakkal", description: "Education hub - JKKN", color: "from-yellow-500 to-amber-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-400", emoji: "📚" },
  { id: "erode", label: "Erode", description: "Textile city", color: "from-cyan-500 to-teal-600", bgColor: "bg-cyan-50", borderColor: "border-cyan-400", emoji: "🧵" },
  { id: "tirupur", label: "Tirupur", description: "Knitwear capital", color: "from-fuchsia-500 to-pink-600", bgColor: "bg-fuchsia-50", borderColor: "border-fuchsia-400", emoji: "👕" },
  { id: "vellore", label: "Vellore", description: "VIT hub", color: "from-green-500 to-emerald-600", bgColor: "bg-green-50", borderColor: "border-green-400", emoji: "🎓" },
  { id: "thanjavur", label: "Thanjavur", description: "Rice bowl", color: "from-lime-500 to-green-600", bgColor: "bg-lime-50", borderColor: "border-lime-400", emoji: "🌾" },
];

const nearbyStates = [
  { id: "karnataka", label: "Karnataka", description: "Bangalore, Mysore", color: "from-red-500 to-rose-600", bgColor: "bg-red-50", borderColor: "border-red-400", emoji: "🏙️" },
  { id: "kerala", label: "Kerala", description: "Kochi, Trivandrum", color: "from-emerald-500 to-green-600", bgColor: "bg-emerald-50", borderColor: "border-emerald-400", emoji: "🌴" },
  { id: "andhra", label: "Andhra Pradesh", description: "Vizag, Tirupati", color: "from-blue-500 to-sky-600", bgColor: "bg-blue-50", borderColor: "border-blue-400", emoji: "⛰️" },
  { id: "telangana", label: "Telangana", description: "Hyderabad", color: "from-orange-500 to-amber-600", bgColor: "bg-orange-50", borderColor: "border-orange-400", emoji: "🕌" },
  { id: "pondicherry", label: "Pondicherry", description: "Union territory", color: "from-indigo-500 to-purple-600", bgColor: "bg-indigo-50", borderColor: "border-indigo-400", emoji: "🏖️" },
];

// Testimonial data
const testimonials = [
  {
    name: "Priya Sharma",
    role: "B.Tech CSE Student",
    college: "JKKN College of Engineering",
    quote: "This tool helped me discover my passion for Data Science. Now I'm pursuing my dream career!",
    avatar: "PS",
    color: "from-emerald-500 to-teal-500"
  },
  {
    name: "Karthik Raja",
    role: "MBBS Student",
    college: "JKKN Medical College",
    quote: "I was confused between Engineering and Medicine. The AI predictor showed me my true calling.",
    avatar: "KR",
    color: "from-violet-500 to-purple-500"
  },
  {
    name: "Anitha Devi",
    role: "B.Pharm Graduate",
    college: "JKKN Pharmacy College",
    quote: "Got personalized course recommendations that matched my interests perfectly. Highly recommend!",
    avatar: "AD",
    color: "from-amber-500 to-orange-500"
  },
  {
    name: "Surya Kumar",
    role: "MBA Student",
    college: "JKKN Business School",
    quote: "The career predictions were spot-on. It helped me choose the right specialization.",
    avatar: "SK",
    color: "from-pink-500 to-rose-500"
  }
];

// Testimonial Carousel Component
const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <motion.div 
      className="mt-10 pt-8 border-t border-border/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Quote className="w-4 h-4 text-muted-foreground" />
        <p className="text-sm font-medium text-muted-foreground">Student Success Stories</p>
      </div>
      
      <div className="relative max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-6 border border-border/50"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[currentIndex].color} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
                {testimonials[currentIndex].avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  &quot;{testimonials[currentIndex].quote}&quot;
                </p>
                <div>
                  <p className="font-semibold text-sm text-foreground">{testimonials[currentIndex].name}</p>
                  <p className="text-xs text-muted-foreground">{testimonials[currentIndex].role}</p>
                  <p className="text-xs text-primary">{testimonials[currentIndex].college}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 rounded-full bg-background border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 rounded-full bg-background border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-primary w-6" 
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

const AICareerPredictor = forwardRef<HTMLDivElement>(function AICareerPredictor(_props, ref) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // Start at intro step (0)
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedPercentage, setSelectedPercentage] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
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

  const toggleLocation = (id: string) => {
    setSelectedLocations(prev => 
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const selectAllTamilNadu = () => {
    const tnDistrictIds = locationPreferences.map(loc => loc.id);
    setSelectedLocations(prev => {
      const allSelected = tnDistrictIds.every(id => prev.includes(id));
      if (allSelected) {
        // Deselect all TN districts
        return prev.filter(id => !tnDistrictIds.includes(id));
      } else {
        // Select all TN districts (keeping existing nearby states)
        const existingStates = prev.filter(id => nearbyStates.some(s => s.id === id));
        return [...new Set([...existingStates, ...tnDistrictIds])];
      }
    });
  };

  const isAllTamilNaduSelected = locationPreferences.every(loc => selectedLocations.includes(loc.id));

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
    if (step === 2) return selectedPercentage !== "";
    if (step === 3) return selectedPreferences.length > 0;
    if (step === 4) return selectedStyle !== "";
    if (step === 5) return selectedLocations.length > 0;
    if (step === 6) return selectedBudget !== "";
    if (step === 7) return selectedDuration !== "";
    if (step === 8) return selectedGoal !== "";
    return true;
  };

  const handleNext = () => {
    if (step < 9) {
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Subtle decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {step > 0 && (
          <Button variant="ghost" onClick={handleBack} className="mb-6 hover:bg-primary/5">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}

        {/* Intro Step - Colorful Enhanced */}
        {step === 0 && (
          <motion.div 
            className="max-w-2xl mx-auto text-center py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8 hover:bg-primary/5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            {/* Colorful Icon Grid */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Main Brain Icon */}
                <motion.div 
                  className="w-28 h-28 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-teal-500/30 rotate-3"
                  whileHover={{ rotate: 6, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Brain className="w-14 h-14 text-white" />
                </motion.div>
                
                {/* Floating decorative elements */}
                <motion.div 
                  className="absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-300/50 -rotate-12"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-2 -left-4 w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-400/50 rotate-12"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <Target className="w-4 h-4 text-white" />
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/2 -right-8 w-6 h-6 rounded-md bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-md shadow-pink-400/50"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <TrendingUp className="w-3 h-3 text-white" />
                </motion.div>
              </div>
            </div>
            
            {/* Colorful Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                AI Career Predictor
              </span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
              Get AI-powered career predictions based on your interests and skills
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <motion.div 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>100+ Courses</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 text-violet-700 text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Smart Matching</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-700 text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Personalized</span>
              </motion.div>
            </div>

            {/* Gradient CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={() => setStep(1)}
                size="lg"
                className="w-full max-w-md bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white text-lg py-6 rounded-xl shadow-lg shadow-teal-500/25 transition-all hover:shadow-xl hover:shadow-teal-500/35"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Predict My Career
              </Button>
            </motion.div>

            {/* Stats Row */}
            <motion.div 
              className="flex justify-center gap-8 mt-10 pt-8 border-t border-border/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center">
                <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">50K+</p>
                <p className="text-xs text-muted-foreground">Students Helped</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">95%</p>
                <p className="text-xs text-muted-foreground">Accuracy Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">100+</p>
                <p className="text-xs text-muted-foreground">Career Paths</p>
              </div>
            </motion.div>

            {/* Testimonial Carousel */}
            <TestimonialCarousel />
          </motion.div>
        )}

        {/* Form Steps */}
        {step >= 1 && (
          <div className="max-w-2xl mx-auto">
            {/* Enhanced Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/20 rounded-full mb-6 shadow-sm">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI Career Predictor</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent italic">
                Discover Your Career Path
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Answer a few questions to get AI-powered career recommendations
              </p>
            </div>

            {/* Enhanced Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`h-2 w-8 md:w-10 rounded-full transition-all duration-500 ${
                      s < step 
                        ? "bg-primary shadow-sm shadow-primary/30" 
                        : s === step 
                        ? "bg-primary animate-pulse" 
                        : "bg-muted"
                    }`}
                  />
                </div>
              ))}
            </div>

          <AnimatePresence mode="wait">
          {/* Step 1: Stream Selection */}
          {step === 1 && (
            <motion.div
              key="step-1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-center mb-2">Choose Your Stream</h2>
              <p className="text-sm text-muted-foreground text-center mb-8">Select your 12th standard stream</p>
              <motion.div 
                className="grid gap-4 md:grid-cols-2"
                variants={containerVariants}
                initial="initial"
                animate="animate"
              >
                {streams.map((stream, index) => (
                  <motion.div key={stream.id} variants={itemVariants} transition={{ delay: index * 0.05 }}>
                    <Card
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden ${
                        selectedStream === stream.id 
                          ? `border-2 ${stream.borderColor} ${stream.bgLight} shadow-lg` 
                          : "hover:border-primary/30 hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedStream(stream.id)}
                    >
                      <CardContent className="p-5 flex items-center gap-4">
                        <div className={`p-3.5 rounded-xl transition-all bg-gradient-to-br ${stream.color} text-white shadow-lg`}>
                          <stream.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold text-base ${selectedStream === stream.id ? stream.textColor : ''}`}>{stream.label}</h3>
                          <p className="text-sm text-muted-foreground">{stream.description}</p>
                        </div>
                        {selectedStream === stream.id && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`h-7 w-7 rounded-full bg-gradient-to-br ${stream.color} flex items-center justify-center shadow-md`}
                          >
                            <Check className="h-4 w-4 text-white" />
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Step 2: 12th Percentage */}
          {step === 2 && (
            <motion.div
              key="step-2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-center mb-2">Your 12th Percentage</h2>
              <p className="text-sm text-muted-foreground text-center mb-8">Select your expected or obtained marks</p>
              <motion.div 
                className="grid gap-3 max-w-md mx-auto"
                variants={containerVariants}
                initial="initial"
                animate="animate"
              >
                {percentageRanges.map((range, index) => (
                  <motion.div key={range.id} variants={itemVariants} transition={{ delay: index * 0.05 }}>
                    <Card
                      className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                        selectedPercentage === range.id 
                          ? "border-2 border-transparent shadow-lg" 
                          : "hover:border-primary/30 hover:bg-muted/50"
                      }`}
                      style={{
                        borderImage: selectedPercentage === range.id ? `linear-gradient(135deg, var(--tw-gradient-stops)) 1` : undefined,
                      }}
                      onClick={() => setSelectedPercentage(range.id)}
                    >
                      <CardContent className={`p-4 flex items-center justify-between ${
                        selectedPercentage === range.id ? 'bg-gradient-to-r from-muted/80 to-muted/40' : ''
                      }`}>
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{range.emoji}</span>
                          <div>
                            <span className="font-medium">{range.label}</span>
                            <Badge 
                              variant="outline" 
                              className={`ml-2 text-xs ${
                                selectedPercentage === range.id 
                                  ? 'bg-gradient-to-r ' + range.color + ' text-white border-0' 
                                  : ''
                              }`}
                            >
                              {range.description}
                            </Badge>
                          </div>
                        </div>
                        {selectedPercentage === range.id && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`h-6 w-6 rounded-full bg-gradient-to-br ${range.color} flex items-center justify-center shadow-md`}
                          >
                            <Check className="h-3.5 w-3.5 text-white" />
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Step 3: Work Preferences/Interests */}
          {step === 3 && (
            <motion.div
              key="step-3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-center mb-2">What interests you?</h2>
              <p className="text-sm text-muted-foreground text-center mb-6">Select multiple options</p>
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-3"
                variants={containerVariants}
                initial="initial"
                animate="animate"
              >
                {workPreferences.map((pref, index) => (
                  <motion.div key={pref.id} variants={itemVariants} transition={{ delay: index * 0.03 }}>
                    <Card
                      className={`cursor-pointer transition-all duration-300 h-full ${
                        selectedPreferences.includes(pref.id)
                          ? `${pref.borderColor} ${pref.bgLight} border-2 shadow-lg`
                          : "hover:border-primary/30 hover:bg-muted/50"
                      }`}
                      onClick={() => togglePreference(pref.id)}
                    >
                      <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${pref.color} shadow-lg`}>
                          {pref.icon}
                        </div>
                        <span className="font-medium text-sm">{pref.label}</span>
                        {selectedPreferences.includes(pref.id) && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`h-5 w-5 rounded-full bg-gradient-to-br ${pref.color} flex items-center justify-center`}
                          >
                            <Check className="h-3 w-3 text-white" />
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              {selectedPreferences.length > 0 && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                  {selectedPreferences.length} selected
                </p>
              )}
            </motion.div>
          )}

          {/* Step 4: Work Style */}
          {step === 4 && (
            <motion.div
              key="step-4"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-center mb-2">How do you prefer to work?</h2>
              <p className="text-sm text-muted-foreground text-center mb-8">Choose your ideal work environment</p>
              <motion.div 
                className="grid gap-4 md:grid-cols-2 max-w-xl mx-auto"
                variants={containerVariants}
                initial="initial"
                animate="animate"
              >
                {workStyles.map((style, index) => (
                  <motion.div key={style.id} variants={itemVariants} transition={{ delay: index * 0.05 }}>
                    <Card
                      className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                        selectedStyle === style.id 
                          ? "border-2 border-transparent shadow-lg" 
                          : "hover:border-primary/30 hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedStyle(style.id)}
                    >
                      <CardContent className={`p-5 flex items-center gap-4 ${
                        selectedStyle === style.id ? 'bg-gradient-to-r from-muted/60 to-transparent' : ''
                      }`}>
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${style.color} shadow-lg`}>
                          {style.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{style.label}</p>
                          <p className="text-xs text-muted-foreground">{style.description}</p>
                        </div>
                        {selectedStyle === style.id && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`h-6 w-6 rounded-full bg-gradient-to-br ${style.color} flex items-center justify-center shadow-md`}
                          >
                            <Check className="h-3.5 w-3.5 text-white" />
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Step 5: Location Preference */}
          {step === 5 && (
            <motion.div
              key="step-5"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-center mb-4">Preferred Study Location</h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <p className="text-sm text-muted-foreground">Select districts or states where you'd like to study</p>
                {selectedLocations.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedLocations([])}
                    className="text-xs h-6 px-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>
              
              {/* Interactive Map Visualization */}
              <TamilNaduMap
                districts={locationPreferences}
                selectedLocations={selectedLocations}
                onToggleLocation={toggleLocation}
              />
              
              {/* Tamil Nadu Districts */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-primary flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Tamil Nadu Districts
                  </p>
                  <Button
                    variant={isAllTamilNaduSelected ? "default" : "outline"}
                    size="sm"
                    onClick={selectAllTamilNadu}
                    className="text-xs h-7 px-3"
                  >
                    {isAllTamilNaduSelected ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        All TN Selected
                      </>
                    ) : (
                      "Select All Tamil Nadu"
                    )}
                  </Button>
                </div>
                <motion.div 
                  className="flex flex-wrap justify-center gap-2"
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                >
                  {locationPreferences.map((loc, index) => (
                    <motion.div key={loc.id} variants={itemVariants} transition={{ delay: index * 0.02 }}>
                      <div
                        className={`cursor-pointer px-3 py-2 text-xs rounded-full transition-all duration-300 flex items-center gap-1.5 border-2 ${
                          selectedLocations.includes(loc.id)
                            ? `${loc.bgColor} ${loc.borderColor} shadow-lg`
                            : `bg-background border-muted-foreground/20 hover:${loc.bgColor} hover:${loc.borderColor}`
                        } ${loc.id === 'namakkal' ? 'ring-2 ring-amber-400 ring-offset-1' : ''}`}
                        onClick={() => toggleLocation(loc.id)}
                      >
                        {selectedLocations.includes(loc.id) ? (
                          <span className={`h-5 w-5 rounded-full bg-gradient-to-br ${loc.color} flex items-center justify-center shadow-sm`}>
                            <Check className="h-3 w-3 text-white" />
                          </span>
                        ) : (
                          <span className="text-base">{loc.emoji}</span>
                        )}
                        <span className={`font-medium ${selectedLocations.includes(loc.id) ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {loc.label}
                        </span>
                        {loc.id === 'namakkal' && <span className="ml-0.5">⭐</span>}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Nearby States */}
              <div className="space-y-3 pt-4">
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Nearby States
                </p>
                <motion.div 
                  className="flex flex-wrap justify-center gap-2"
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                >
                  {nearbyStates.map((state, index) => (
                    <motion.div key={state.id} variants={itemVariants} transition={{ delay: index * 0.03 }}>
                      <div
                        className={`cursor-pointer px-4 py-2.5 text-sm rounded-full transition-all duration-300 flex items-center gap-2 border-2 ${
                          selectedLocations.includes(state.id)
                            ? `${state.bgColor} ${state.borderColor} shadow-lg`
                            : `bg-background border-muted-foreground/20 hover:${state.bgColor} hover:${state.borderColor}`
                        }`}
                        onClick={() => toggleLocation(state.id)}
                      >
                        {selectedLocations.includes(state.id) ? (
                          <span className={`h-6 w-6 rounded-full bg-gradient-to-br ${state.color} flex items-center justify-center shadow-sm`}>
                            <Check className="h-3.5 w-3.5 text-white" />
                          </span>
                        ) : (
                          <span className="text-lg">{state.emoji}</span>
                        )}
                        <span className={`font-medium ${selectedLocations.includes(state.id) ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {state.label}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {selectedLocations.length > 0 && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-center text-muted-foreground mt-4"
                >
                  Selected: {selectedLocations.length} location{selectedLocations.length > 1 ? 's' : ''}
                </motion.p>
              )}
            </motion.div>
          )}

          {/* Step 6: Budget Range */}
          {step === 6 && (
            <motion.div
              key="step-6"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-center mb-2">Your Budget for Education</h2>
              <p className="text-sm text-muted-foreground text-center mb-8">Select your annual education budget</p>
              <motion.div 
                className="grid gap-3 max-w-lg mx-auto"
                variants={containerVariants}
                initial="initial"
                animate="animate"
              >
                {budgetRanges.map((budget, index) => (
                  <motion.div key={budget.id} variants={itemVariants} transition={{ delay: index * 0.05 }}>
                    <Card
                      className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                        selectedBudget === budget.id 
                          ? "border-2 border-transparent shadow-lg" 
                          : "hover:border-primary/30 hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedBudget(budget.id)}
                    >
                      <CardContent className={`p-4 flex items-center gap-4 ${
                        selectedBudget === budget.id ? 'bg-gradient-to-r from-muted/60 to-transparent' : ''
                      }`}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${budget.color} shadow-lg`}>
                          {budget.emoji}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{budget.label}</p>
                          <p className="text-xs text-muted-foreground">{budget.description}</p>
                        </div>
                        {selectedBudget === budget.id && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`h-6 w-6 rounded-full bg-gradient-to-br ${budget.color} flex items-center justify-center shadow-md`}
                          >
                            <Check className="h-3.5 w-3.5 text-white" />
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Step 7: Course Duration */}
          {step === 7 && (
            <motion.div
              key="step-7"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-center mb-2">Preferred Course Duration</h2>
              <p className="text-sm text-muted-foreground text-center mb-8">How long do you want to study?</p>
              <motion.div 
                className="grid gap-4 grid-cols-2 max-w-lg mx-auto"
                variants={containerVariants}
                initial="initial"
                animate="animate"
              >
                {courseDurations.map((duration, index) => (
                  <motion.div key={duration.id} variants={itemVariants} transition={{ delay: index * 0.05 }}>
                    <Card
                      className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                        selectedDuration === duration.id 
                          ? "border-2 border-transparent shadow-lg" 
                          : "hover:border-primary/30 hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedDuration(duration.id)}
                    >
                      <CardContent className={`p-5 text-center ${
                        selectedDuration === duration.id ? 'bg-gradient-to-br from-muted/60 to-transparent' : ''
                      }`}>
                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-3 text-2xl bg-gradient-to-br ${duration.color} shadow-lg`}>
                          {duration.icon}
                        </div>
                        <p className="font-semibold">{duration.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">{duration.description}</p>
                        {selectedDuration === duration.id && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`h-6 w-6 rounded-full bg-gradient-to-br ${duration.color} flex items-center justify-center mx-auto mt-3 shadow-md`}
                          >
                            <Check className="h-3.5 w-3.5 text-white" />
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Step 8: Career Goal */}
          {step === 8 && (
            <motion.div
              key="step-8"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-center mb-2">What's Your Career Goal?</h2>
              <p className="text-sm text-muted-foreground text-center mb-8">Where do you see yourself after graduation?</p>
              <motion.div 
                className="grid gap-3 max-w-lg mx-auto"
                variants={containerVariants}
                initial="initial"
                animate="animate"
              >
                {careerGoals.map((goal, index) => (
                  <motion.div key={goal.id} variants={itemVariants} transition={{ delay: index * 0.05 }}>
                    <Card
                      className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                        selectedGoal === goal.id 
                          ? "border-2 border-transparent shadow-lg" 
                          : "hover:border-primary/30 hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedGoal(goal.id)}
                    >
                      <CardContent className={`p-4 flex items-center gap-4 ${
                        selectedGoal === goal.id ? 'bg-gradient-to-r from-muted/60 to-transparent' : ''
                      }`}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${goal.color} shadow-lg`}>
                          {goal.emoji}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{goal.label}</p>
                          <p className="text-xs text-muted-foreground">{goal.description}</p>
                        </div>
                        {selectedGoal === goal.id && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`h-6 w-6 rounded-full bg-gradient-to-br ${goal.color} flex items-center justify-center shadow-md`}
                          >
                            <Check className="h-3.5 w-3.5 text-white" />
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Step 9: Additional Info + Summary */}
          {step === 9 && (
            <motion.div
              key="step-9"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-center mb-4">Anything else?</h2>
              <p className="text-sm text-muted-foreground text-center mb-6">Optional - share any additional preferences</p>
              <div className="relative max-w-md mx-auto">
                <Input
                  placeholder="E.g., I enjoy solving puzzles, prefer a quiet campus..."
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="text-center py-6 pr-12 rounded-xl border-2 focus:border-primary transition-colors"
                />
                <Lightbulb className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
              </div>

              {/* Summary Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="mt-8 border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-muted/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Your Selection Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-3 md:grid-cols-2">
                    {/* Stream */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        {(() => {
                          const stream = streams.find(s => s.id === selectedStream);
                          if (stream) {
                            const Icon = stream.icon;
                            return <Icon className="h-4 w-4 text-primary" />;
                          }
                          return <GraduationCap className="h-4 w-4 text-primary" />;
                        })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Stream</p>
                        <p className="font-medium text-sm truncate">
                          {streams.find(s => s.id === selectedStream)?.label || "-"}
                        </p>
                      </div>
                    </div>

                    {/* Percentage */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">12th Marks</p>
                        <p className="font-medium text-sm truncate">
                          {percentageRanges.find(p => p.id === selectedPercentage)?.label || "-"}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="font-medium text-sm truncate">
                          {selectedLocations.length > 0 
                            ? `${selectedLocations.length} selected` 
                            : "-"}
                        </p>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Budget</p>
                        <p className="font-medium text-sm truncate">
                          {budgetRanges.find(b => b.id === selectedBudget)?.label || "-"}
                        </p>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="font-medium text-sm truncate">
                          {courseDurations.find(d => d.id === selectedDuration)?.label || "-"}
                        </p>
                      </div>
                    </div>

                    {/* Goal */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Target className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Career Goal</p>
                        <p className="font-medium text-sm truncate">
                          {careerGoals.find(g => g.id === selectedGoal)?.label || "-"}
                        </p>
                      </div>
                    </div>

                    {/* Work Style */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Work Style</p>
                        <p className="font-medium text-sm truncate">
                          {workStyles.find(s => s.id === selectedStyle)?.label || "-"}
                        </p>
                      </div>
                    </div>

                    {/* Interests - full width */}
                    <div className="md:col-span-2 flex items-start gap-3 p-3 rounded-lg bg-background/50">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">Interests</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedPreferences.length > 0 ? (
                            selectedPreferences.map(p => (
                              <Badge key={p} variant="secondary" className="text-xs">
                                {workPreferences.find(wp => wp.id === p)?.label}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
          </AnimatePresence>

          {/* Error State with Retry */}
          {showErrorState && !isLoading && (
            <Card className="border-destructive/50 bg-destructive/5 animate-fade-in">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-destructive/10 mb-5">
                  <X className="h-7 w-7 text-destructive" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Failed to get AI predictions</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                  {retryCount >= 2 
                    ? "Multiple attempts failed. You can try again or view sample career results."
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

          {/* Loading Progress Card */}
          {isLoading && (
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 animate-fade-in overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    </div>
                    <Brain className="h-4 w-4 text-primary absolute -bottom-1 -right-1 bg-background rounded-full p-0.5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary text-lg">AI Analyzing Your Profile</h3>
                    <p className="text-sm text-muted-foreground">{loadingMessage}</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary via-primary/90 to-primary/70 transition-all duration-500 ease-out rounded-full"
                      style={{ width: `${loadingProgress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span className="font-medium">{Math.round(loadingProgress)}% complete</span>
                  <span>Est. {Math.max(1, Math.ceil((100 - loadingProgress) / 10))}s remaining</span>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={cancelAnalysis}
                    className="gap-2 bg-background/80"
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
            <div className="flex justify-center gap-3 mt-10">
              <Button
                size="lg"
                onClick={handleNext}
                disabled={!canProceed()}
                className="min-w-[220px] py-6 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                {step === 9 ? (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Get Predictions
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="h-5 w-5 ml-2" />
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
});

export default AICareerPredictor;
