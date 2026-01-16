import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Brain, 
  Calendar, 
  Clock, 
  Target, 
  Sparkles, 
  BookOpen, 
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Zap,
  Trophy,
  Star,
  ChevronRight,
  Play,
  RotateCcw,
  Download,
  Bell,
  Flame,
  ArrowRight,
  GraduationCap,
  Timer,
  BarChart3,
  Lightbulb
} from 'lucide-react';

interface WeakTopic {
  id: string;
  name: string;
  nameTamil: string;
  subject: string;
  currentScore: number;
  targetScore: number;
  priority: 'high' | 'medium' | 'low';
  estimatedHours: number;
}

interface DailyTask {
  id: string;
  topic: string;
  topicTamil: string;
  subject: string;
  duration: number;
  type: 'learn' | 'practice' | 'revision' | 'mock';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  aiTip?: string;
}

interface StudyDay {
  date: string;
  dayName: string;
  tasks: DailyTask[];
  totalHours: number;
  focusArea: string;
  isToday: boolean;
  isCompleted: boolean;
}

interface StudyPlan {
  id: string;
  examName: string;
  examDate: string;
  daysRemaining: number;
  dailyStudyHours: number;
  weakTopics: WeakTopic[];
  schedule: StudyDay[];
  progress: number;
  streak: number;
  createdAt: string;
}

const STORAGE_KEY = 'ai-smart-study-plan';

// Exam options
const EXAMS = [
  { id: 'neet', name: 'NEET 2026', nameTamil: 'நீட் 2026', subjects: ['Physics', 'Chemistry', 'Biology'] },
  { id: 'jee-main', name: 'JEE Main 2026', nameTamil: 'ஜேஇஇ மெயின் 2026', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
  { id: 'jee-adv', name: 'JEE Advanced 2026', nameTamil: 'ஜேஇஇ அட்வான்ஸ்ட் 2026', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
  { id: 'tnea', name: 'TNEA Counselling', nameTamil: 'டிஎன்இஏ கலந்தாய்வு', subjects: ['Aptitude', 'Engineering Basics'] },
  { id: 'tancet', name: 'TANCET 2026', nameTamil: 'தான்செட் 2026', subjects: ['Aptitude', 'Quantitative', 'Verbal'] },
  { id: 'tnpsc', name: 'TNPSC Group 4', nameTamil: 'டிஎன்பிஎஸ்சி குரூப் 4', subjects: ['GK', 'Tamil', 'Aptitude'] },
  { id: 'ssc', name: 'SSC CHSL', nameTamil: 'எஸ்எஸ்சி சிஹெச்எஸ்எல்', subjects: ['GK', 'Reasoning', 'English', 'Maths'] },
];

// Topic database for AI to suggest
const TOPIC_DATABASE: Record<string, WeakTopic[]> = {
  'neet': [
    { id: 'phy-mech', name: 'Mechanics', nameTamil: 'இயக்கவியல்', subject: 'Physics', currentScore: 45, targetScore: 85, priority: 'high', estimatedHours: 25 },
    { id: 'phy-optics', name: 'Optics', nameTamil: 'ஒளியியல்', subject: 'Physics', currentScore: 60, targetScore: 85, priority: 'medium', estimatedHours: 15 },
    { id: 'chem-organic', name: 'Organic Chemistry', nameTamil: 'கரிம வேதியியல்', subject: 'Chemistry', currentScore: 40, targetScore: 80, priority: 'high', estimatedHours: 30 },
    { id: 'chem-inorganic', name: 'Inorganic Chemistry', nameTamil: 'கனிம வேதியியல்', subject: 'Chemistry', currentScore: 55, targetScore: 80, priority: 'medium', estimatedHours: 18 },
    { id: 'bio-genetics', name: 'Genetics', nameTamil: 'மரபியல்', subject: 'Biology', currentScore: 50, targetScore: 90, priority: 'high', estimatedHours: 22 },
    { id: 'bio-ecology', name: 'Ecology', nameTamil: 'சூழலியல்', subject: 'Biology', currentScore: 65, targetScore: 85, priority: 'low', estimatedHours: 12 },
  ],
  'jee-main': [
    { id: 'phy-electro', name: 'Electromagnetism', nameTamil: 'மின்காந்தவியல்', subject: 'Physics', currentScore: 35, targetScore: 85, priority: 'high', estimatedHours: 28 },
    { id: 'phy-thermo', name: 'Thermodynamics', nameTamil: 'வெப்ப இயக்கவியல்', subject: 'Physics', currentScore: 55, targetScore: 80, priority: 'medium', estimatedHours: 18 },
    { id: 'chem-physical', name: 'Physical Chemistry', nameTamil: 'இயற்பியல் வேதியியல்', subject: 'Chemistry', currentScore: 40, targetScore: 85, priority: 'high', estimatedHours: 25 },
    { id: 'math-calculus', name: 'Calculus', nameTamil: 'நுண்கணிதம்', subject: 'Mathematics', currentScore: 45, targetScore: 90, priority: 'high', estimatedHours: 30 },
    { id: 'math-algebra', name: 'Algebra', nameTamil: 'இயற்கணிதம்', subject: 'Mathematics', currentScore: 60, targetScore: 85, priority: 'medium', estimatedHours: 20 },
    { id: 'math-coord', name: 'Coordinate Geometry', nameTamil: 'ஆயத்தொகை வடிவியல்', subject: 'Mathematics', currentScore: 50, targetScore: 80, priority: 'medium', estimatedHours: 15 },
  ],
  'jee-adv': [
    { id: 'phy-modern', name: 'Modern Physics', nameTamil: 'நவீன இயற்பியல்', subject: 'Physics', currentScore: 30, targetScore: 90, priority: 'high', estimatedHours: 35 },
    { id: 'phy-waves', name: 'Waves & SHM', nameTamil: 'அலைகள் & SHM', subject: 'Physics', currentScore: 45, targetScore: 85, priority: 'high', estimatedHours: 22 },
    { id: 'chem-coord', name: 'Coordination Chemistry', nameTamil: 'ஒருங்கிணைப்பு வேதியியல்', subject: 'Chemistry', currentScore: 35, targetScore: 80, priority: 'high', estimatedHours: 20 },
    { id: 'math-3d', name: '3D Geometry', nameTamil: '3D வடிவியல்', subject: 'Mathematics', currentScore: 40, targetScore: 85, priority: 'high', estimatedHours: 25 },
  ],
  'tnea': [
    { id: 'apt-quant', name: 'Quantitative Aptitude', nameTamil: 'எண்ணியல் திறன்', subject: 'Aptitude', currentScore: 50, targetScore: 85, priority: 'high', estimatedHours: 20 },
    { id: 'apt-logical', name: 'Logical Reasoning', nameTamil: 'தர்க்க ஆய்வு', subject: 'Aptitude', currentScore: 55, targetScore: 80, priority: 'medium', estimatedHours: 15 },
  ],
  'tancet': [
    { id: 'tan-verbal', name: 'Verbal Ability', nameTamil: 'மொழித்திறன்', subject: 'Verbal', currentScore: 45, targetScore: 80, priority: 'high', estimatedHours: 18 },
    { id: 'tan-quant', name: 'Quantitative Aptitude', nameTamil: 'எண்ணியல் திறன்', subject: 'Quantitative', currentScore: 50, targetScore: 85, priority: 'high', estimatedHours: 22 },
    { id: 'tan-di', name: 'Data Interpretation', nameTamil: 'தரவு விளக்கம்', subject: 'Aptitude', currentScore: 55, targetScore: 80, priority: 'medium', estimatedHours: 15 },
  ],
  'tnpsc': [
    { id: 'tnp-tamil', name: 'Tamil Language', nameTamil: 'தமிழ் மொழி', subject: 'Tamil', currentScore: 60, targetScore: 85, priority: 'medium', estimatedHours: 20 },
    { id: 'tnp-gk', name: 'General Knowledge', nameTamil: 'பொது அறிவு', subject: 'GK', currentScore: 45, targetScore: 80, priority: 'high', estimatedHours: 25 },
    { id: 'tnp-apt', name: 'Aptitude & Reasoning', nameTamil: 'திறன் & தர்க்கம்', subject: 'Aptitude', currentScore: 50, targetScore: 80, priority: 'high', estimatedHours: 18 },
  ],
  'ssc': [
    { id: 'ssc-eng', name: 'English Language', nameTamil: 'ஆங்கில மொழி', subject: 'English', currentScore: 45, targetScore: 80, priority: 'high', estimatedHours: 20 },
    { id: 'ssc-reason', name: 'Reasoning', nameTamil: 'தர்க்கம்', subject: 'Reasoning', currentScore: 55, targetScore: 85, priority: 'medium', estimatedHours: 22 },
    { id: 'ssc-math', name: 'Quantitative Aptitude', nameTamil: 'எண்ணியல் திறன்', subject: 'Maths', currentScore: 40, targetScore: 80, priority: 'high', estimatedHours: 25 },
    { id: 'ssc-gk', name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', subject: 'GK', currentScore: 50, targetScore: 75, priority: 'medium', estimatedHours: 18 },
  ],
};

// AI Tips for different scenarios
const AI_TIPS = {
  morning: [
    'Start with difficult topics when your mind is fresh',
    'Begin with a 5-minute quick revision of yesterday\'s topics',
    'Tackle conceptual subjects like Physics/Chemistry in the morning',
  ],
  afternoon: [
    'Use the Pomodoro technique: 25 min study, 5 min break',
    'Practice numerical problems during this time',
    'Review formulas before solving problems',
  ],
  evening: [
    'Focus on revision and making notes',
    'Attempt practice tests to reinforce learning',
    'Review weak areas identified during the day',
  ],
  general: [
    'Interleave subjects to improve retention',
    'Teach concepts to someone else to solidify understanding',
    'Take short breaks to avoid burnout',
    'Use mnemonics for memorizing formulas',
    'Practice past papers under timed conditions',
  ],
};

export const AISmartStudyPlanner = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'select' | 'customize' | 'generating' | 'plan'>('select');
  const [selectedExam, setSelectedExam] = useState('');
  const [examDate, setExamDate] = useState('');
  const [dailyHours, setDailyHours] = useState([4]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [activePlan, setActivePlan] = useState<StudyPlan | null>(null);
  const [activeTab, setActiveTab] = useState('today');

  // Load saved plan
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const plan = JSON.parse(saved);
        // Update isToday flags
        const today = new Date().toISOString().split('T')[0];
        plan.schedule = plan.schedule.map((day: StudyDay) => ({
          ...day,
          isToday: day.date === today,
        }));
        // Update days remaining
        const examDateObj = new Date(plan.examDate);
        plan.daysRemaining = Math.ceil((examDateObj.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        setActivePlan(plan);
        setStep('plan');
      } catch (e) {
        console.error('Failed to load plan:', e);
      }
    }
  }, []);

  // Get available topics for selected exam
  const availableTopics = useMemo(() => {
    return TOPIC_DATABASE[selectedExam] || [];
  }, [selectedExam]);

  // Generate AI study plan
  const generatePlan = () => {
    setStep('generating');
    
    // Simulate AI processing
    setTimeout(() => {
      const exam = EXAMS.find(e => e.id === selectedExam);
      if (!exam || !examDate) return;

      const examDateObj = new Date(examDate);
      const today = new Date();
      const daysRemaining = Math.ceil((examDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      // Get selected weak topics
      const weakTopics = availableTopics.filter(t => selectedTopics.includes(t.id));
      
      // Calculate total hours needed
      const totalHoursNeeded = weakTopics.reduce((sum, t) => sum + t.estimatedHours, 0);
      const hoursPerDay = dailyHours[0];
      const studyDays = Math.min(daysRemaining - 3, Math.ceil(totalHoursNeeded / hoursPerDay)); // Reserve 3 days for revision
      
      // Generate daily schedule
      const schedule: StudyDay[] = [];
      let topicIndex = 0;
      let topicHoursRemaining = weakTopics[0]?.estimatedHours || 0;
      
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayNamesTamil = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];
      
      for (let d = 0; d < studyDays && topicIndex < weakTopics.length; d++) {
        const dayDate = new Date(today);
        dayDate.setDate(today.getDate() + d);
        const dateStr = dayDate.toISOString().split('T')[0];
        const dayOfWeek = dayDate.getDay();
        
        const tasks: DailyTask[] = [];
        let dayHoursRemaining = hoursPerDay;
        
        while (dayHoursRemaining > 0 && topicIndex < weakTopics.length) {
          const topic = weakTopics[topicIndex];
          const hoursToAllocate = Math.min(topicHoursRemaining, dayHoursRemaining, 2); // Max 2 hours per topic per session
          
          if (hoursToAllocate > 0) {
            const taskType: DailyTask['type'] = 
              topicHoursRemaining > topic.estimatedHours * 0.6 ? 'learn' :
              topicHoursRemaining > topic.estimatedHours * 0.3 ? 'practice' : 'revision';
            
            tasks.push({
              id: `${topic.id}-${d}-${tasks.length}`,
              topic: topic.name,
              topicTamil: topic.nameTamil,
              subject: topic.subject,
              duration: Math.round(hoursToAllocate * 60),
              type: taskType,
              priority: topic.priority,
              completed: false,
              aiTip: AI_TIPS.general[Math.floor(Math.random() * AI_TIPS.general.length)],
            });
            
            dayHoursRemaining -= hoursToAllocate;
            topicHoursRemaining -= hoursToAllocate;
          }
          
          if (topicHoursRemaining <= 0) {
            topicIndex++;
            if (topicIndex < weakTopics.length) {
              topicHoursRemaining = weakTopics[topicIndex].estimatedHours;
            }
          }
        }
        
        schedule.push({
          date: dateStr,
          dayName: language === 'ta' ? dayNamesTamil[dayOfWeek] : dayNames[dayOfWeek],
          tasks,
          totalHours: hoursPerDay - dayHoursRemaining,
          focusArea: tasks[0]?.subject || 'Revision',
          isToday: d === 0,
          isCompleted: false,
        });
      }
      
      // Add revision days
      for (let i = 0; i < 3; i++) {
        const revDate = new Date(examDateObj);
        revDate.setDate(examDateObj.getDate() - (3 - i));
        const dateStr = revDate.toISOString().split('T')[0];
        const dayOfWeek = revDate.getDay();
        
        const revTasks: DailyTask[] = [
          {
            id: `rev-${i}-0`,
            topic: i === 0 ? 'High Priority Topics' : i === 1 ? 'Mock Test' : 'Formula Revision',
            topicTamil: i === 0 ? 'உயர் முன்னுரிமை தலைப்புகள்' : i === 1 ? 'மாக் தேர்வு' : 'சூத்திர மீட்பு',
            subject: 'All',
            duration: hoursPerDay * 60,
            type: i === 1 ? 'mock' : 'revision',
            priority: 'high',
            completed: false,
            aiTip: i === 1 ? 'Take this mock test under real exam conditions' : 'Focus only on formulas and key concepts',
          },
        ];
        
        schedule.push({
          date: dateStr,
          dayName: language === 'ta' ? dayNamesTamil[dayOfWeek] : dayNames[dayOfWeek],
          tasks: revTasks,
          totalHours: hoursPerDay,
          focusArea: 'Revision',
          isToday: false,
          isCompleted: false,
        });
      }
      
      const plan: StudyPlan = {
        id: `plan-${Date.now()}`,
        examName: language === 'ta' ? exam.nameTamil : exam.name,
        examDate: examDate,
        daysRemaining,
        dailyStudyHours: hoursPerDay,
        weakTopics,
        schedule,
        progress: 0,
        streak: 0,
        createdAt: new Date().toISOString(),
      };
      
      setActivePlan(plan);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
      setStep('plan');
      
      // Celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      toast({
        title: language === 'ta' ? '🎯 படிப்பு திட்டம் தயார்!' : '🎯 Study Plan Ready!',
        description: language === 'ta' 
          ? `${schedule.length} நாட்கள் திட்டம் உருவாக்கப்பட்டது`
          : `${schedule.length} day personalized plan created`,
      });
    }, 2500);
  };

  // Toggle task completion
  const toggleTask = (dayIndex: number, taskId: string) => {
    if (!activePlan) return;
    
    const updatedSchedule = [...activePlan.schedule];
    const day = updatedSchedule[dayIndex];
    const taskIndex = day.tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex >= 0) {
      day.tasks[taskIndex].completed = !day.tasks[taskIndex].completed;
      
      // Check if day is completed
      day.isCompleted = day.tasks.every(t => t.completed);
      
      // Calculate overall progress
      const totalTasks = updatedSchedule.reduce((sum, d) => sum + d.tasks.length, 0);
      const completedTasks = updatedSchedule.reduce(
        (sum, d) => sum + d.tasks.filter(t => t.completed).length, 0
      );
      const progress = Math.round((completedTasks / totalTasks) * 100);
      
      const updatedPlan = {
        ...activePlan,
        schedule: updatedSchedule,
        progress,
      };
      
      setActivePlan(updatedPlan);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlan));
      
      // Milestone celebrations
      if ([25, 50, 75, 100].includes(progress) && day.tasks[taskIndex].completed) {
        confetti({
          particleCount: progress === 100 ? 200 : 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        toast({
          title: progress === 100 
            ? (language === 'ta' ? '🎉 திட்டம் முடிந்தது!' : '🎉 Plan Complete!') 
            : `🎯 ${progress}% ${language === 'ta' ? 'முடிந்தது!' : 'Done!'}`,
          description: progress === 100 
            ? (language === 'ta' ? 'உங்கள் படிப்பு திட்டத்தை முடித்துவிட்டீர்கள்!' : 'You\'ve completed your study plan!')
            : (language === 'ta' ? 'தொடர்ந்து நல்ல வேலை!' : 'Keep up the great work!'),
        });
      }
    }
  };

  // Reset plan
  const resetPlan = () => {
    setActivePlan(null);
    setStep('select');
    setSelectedExam('');
    setExamDate('');
    setDailyHours([4]);
    setSelectedTopics([]);
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: language === 'ta' ? 'திட்டம் மீட்டமைக்கப்பட்டது' : 'Plan Reset',
      description: language === 'ta' ? 'புதிய திட்டத்தை உருவாக்கலாம்' : 'You can create a new study plan',
    });
  };

  // Get today's tasks
  const todaysTasks = useMemo(() => {
    if (!activePlan) return [];
    const today = activePlan.schedule.find(d => d.isToday);
    return today?.tasks || [];
  }, [activePlan]);

  // Get task type badge color
  const getTaskTypeColor = (type: DailyTask['type']) => {
    switch (type) {
      case 'learn': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'practice': return 'bg-green-100 text-green-700 border-green-200';
      case 'revision': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'mock': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return <Badge className="bg-red-500 text-white text-xs">🔥 High</Badge>;
      case 'medium': return <Badge className="bg-yellow-500 text-white text-xs">⚡ Medium</Badge>;
      case 'low': return <Badge className="bg-green-500 text-white text-xs">✓ Low</Badge>;
    }
  };

  return (
    <>
      {/* Trigger Card on Homepage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card 
          className="relative overflow-hidden cursor-pointer group border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-primary/5 via-background to-accent/5"
          onClick={() => setIsOpen(true)}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Sparkle Effect */}
          <div className="absolute top-4 right-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-8 w-8 text-primary/30" />
            </motion.div>
          </div>
          
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-lg">
                <Brain className="h-8 w-8" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold">
                    {language === 'ta' ? 'AI ஸ்மார்ட் ஸ்டடி பிளானர்' : 'AI Smart Study Planner'}
                  </h3>
                  <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                    <Zap className="h-3 w-3 mr-1" />
                    NEW
                  </Badge>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {language === 'ta' 
                    ? 'உங்கள் தேர்வு தேதி, பலவீனமான தலைப்புகள் மற்றும் கிடைக்கும் நேரத்தின் அடிப்படையில் தனிப்பயனாக்கப்பட்ட தினசரி படிப்பு திட்டத்தை AI உருவாக்குகிறது'
                    : 'AI creates personalized daily study schedules based on your exam date, weak topics, and available time'}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    <Target className="h-3 w-3 mr-1" />
                    {language === 'ta' ? 'பலவீன தலைப்பு கண்டறிதல்' : 'Weak Topic Detection'}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    {language === 'ta' ? 'தினசரி திட்டம்' : 'Daily Schedule'}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {language === 'ta' ? 'முன்னேற்ற கண்காணிப்பு' : 'Progress Tracking'}
                  </Badge>
                </div>
                
                {activePlan ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{activePlan.examName}</span>
                      <span className="font-semibold text-primary">{activePlan.progress}% Complete</span>
                    </div>
                    <Progress value={activePlan.progress} className="h-2" />
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activePlan.daysRemaining} days left
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="h-3 w-3 text-orange-500" />
                        {activePlan.streak} day streak
                      </span>
                    </div>
                  </div>
                ) : (
                  <Button className="group/btn">
                    <Play className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    {language === 'ta' ? 'இப்போது தொடங்கு' : 'Start Now'}
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Brain className="h-6 w-6 text-primary" />
              {language === 'ta' ? 'AI ஸ்மார்ட் ஸ்டடி பிளானர்' : 'AI Smart Study Planner'}
              <Badge className="bg-gradient-to-r from-primary to-accent text-white ml-2">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 pr-4">
            <AnimatePresence mode="wait">
              {/* Step 1: Select Exam */}
              {step === 'select' && (
                <motion.div
                  key="select"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 py-4"
                >
                  <div className="text-center mb-6">
                    <GraduationCap className="h-16 w-16 mx-auto text-primary mb-4" />
                    <h3 className="text-2xl font-bold">
                      {language === 'ta' ? 'உங்கள் தேர்வைத் தேர்ந்தெடுங்கள்' : 'Select Your Exam'}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'ta' 
                        ? 'AI உங்கள் தேர்வுக்கு ஏற்ற படிப்பு திட்டத்தை உருவாக்கும்'
                        : 'AI will create a personalized study plan for your exam'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {EXAMS.map((exam) => (
                      <Card
                        key={exam.id}
                        className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                          selectedExam === exam.id 
                            ? 'border-primary ring-2 ring-primary/20 bg-primary/5' 
                            : 'hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedExam(exam.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{language === 'ta' ? exam.nameTamil : exam.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                {exam.subjects.join(' • ')}
                              </p>
                            </div>
                            {selectedExam === exam.id && (
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-4 pt-4">
                    <div>
                      <Label>{language === 'ta' ? 'தேர்வு தேதி' : 'Exam Date'}</Label>
                      <Input
                        type="date"
                        value={examDate}
                        onChange={(e) => setExamDate(e.target.value)}
                        min={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="flex items-center justify-between">
                        <span>{language === 'ta' ? 'தினசரி படிப்பு நேரம்' : 'Daily Study Hours'}</span>
                        <span className="text-primary font-bold">{dailyHours[0]} hours</span>
                      </Label>
                      <Slider
                        value={dailyHours}
                        onValueChange={setDailyHours}
                        min={1}
                        max={10}
                        step={0.5}
                        className="mt-3"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1 hr</span>
                        <span>10 hrs</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!selectedExam || !examDate}
                    onClick={() => setStep('customize')}
                  >
                    {language === 'ta' ? 'தொடரவும்' : 'Continue'}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Customize Topics */}
              {step === 'customize' && (
                <motion.div
                  key="customize"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 py-4"
                >
                  <div className="text-center mb-6">
                    <Target className="h-16 w-16 mx-auto text-primary mb-4" />
                    <h3 className="text-2xl font-bold">
                      {language === 'ta' ? 'பலவீனமான தலைப்புகளைத் தேர்ந்தெடுங்கள்' : 'Select Weak Topics'}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'ta' 
                        ? 'AI இந்த தலைப்புகளுக்கு அதிக முன்னுரிமை கொடுக்கும்'
                        : 'AI will prioritize these topics in your study plan'}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {availableTopics.map((topic) => (
                      <Card
                        key={topic.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedTopics.includes(topic.id) 
                            ? 'border-primary ring-2 ring-primary/20 bg-primary/5' 
                            : 'hover:border-primary/50'
                        }`}
                        onClick={() => {
                          setSelectedTopics(prev => 
                            prev.includes(topic.id)
                              ? prev.filter(id => id !== topic.id)
                              : [...prev, topic.id]
                          );
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Checkbox
                              checked={selectedTopics.includes(topic.id)}
                              className="h-5 w-5"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">
                                  {language === 'ta' ? topic.nameTamil : topic.name}
                                </h4>
                                {getPriorityBadge(topic.priority)}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {topic.subject} • ~{topic.estimatedHours} hours needed
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-red-500">
                                {topic.currentScore}%
                              </div>
                              <div className="text-xs text-muted-foreground">
                                → {topic.targetScore}%
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep('select')}>
                      {language === 'ta' ? 'பின்செல்' : 'Back'}
                    </Button>
                    <Button
                      className="flex-1"
                      size="lg"
                      disabled={selectedTopics.length === 0}
                      onClick={generatePlan}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {language === 'ta' ? 'AI திட்டத்தை உருவாக்கு' : 'Generate AI Plan'}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Generating */}
              {step === 'generating' && (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="py-16 text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    <Brain className="h-20 w-20 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mt-6">
                    {language === 'ta' ? 'AI உங்கள் திட்டத்தை உருவாக்குகிறது...' : 'AI is creating your plan...'}
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    {language === 'ta' 
                      ? 'உங்கள் தேர்வு தேதி மற்றும் பலவீனமான தலைப்புகளை பகுப்பாய்வு செய்கிறது'
                      : 'Analyzing your exam date and weak topics'}
                  </p>
                  <div className="flex justify-center gap-2 mt-8">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                      className="w-3 h-3 rounded-full bg-primary"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                      className="w-3 h-3 rounded-full bg-primary"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
                      className="w-3 h-3 rounded-full bg-primary"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 4: View Plan */}
              {step === 'plan' && activePlan && (
                <motion.div
                  key="plan"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 py-4"
                >
                  {/* Plan Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{activePlan.examName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {activePlan.daysRemaining} {language === 'ta' ? 'நாட்கள் மீதமுள்ளன' : 'days remaining'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{activePlan.progress}%</div>
                      <div className="flex items-center gap-1 text-sm text-orange-500">
                        <Flame className="h-4 w-4" />
                        {activePlan.streak} {language === 'ta' ? 'நாள் ஸ்ட்ரீக்' : 'day streak'}
                      </div>
                    </div>
                  </div>

                  <Progress value={activePlan.progress} className="h-3" />

                  {/* Tabs */}
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="today" className="flex items-center gap-1">
                        <Timer className="h-4 w-4" />
                        {language === 'ta' ? 'இன்று' : 'Today'}
                      </TabsTrigger>
                      <TabsTrigger value="schedule" className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {language === 'ta' ? 'அட்டவணை' : 'Schedule'}
                      </TabsTrigger>
                      <TabsTrigger value="insights" className="flex items-center gap-1">
                        <BarChart3 className="h-4 w-4" />
                        {language === 'ta' ? 'நுண்ணறிவு' : 'Insights'}
                      </TabsTrigger>
                    </TabsList>

                    {/* Today's Tasks */}
                    <TabsContent value="today" className="space-y-4 mt-4">
                      {todaysTasks.length > 0 ? (
                        <>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Target className="h-4 w-4" />
                            {todaysTasks.filter(t => t.completed).length} / {todaysTasks.length} tasks completed
                          </div>
                          
                          {todaysTasks.map((task, idx) => {
                            const todayIndex = activePlan.schedule.findIndex(d => d.isToday);
                            return (
                              <Card
                                key={task.id}
                                className={`transition-all duration-200 ${
                                  task.completed ? 'bg-green-50 border-green-200 dark:bg-green-950/20' : ''
                                }`}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-3">
                                    <Checkbox
                                      checked={task.completed}
                                      onCheckedChange={() => toggleTask(todayIndex, task.id)}
                                      className="mt-1"
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                          {language === 'ta' ? task.topicTamil : task.topic}
                                        </span>
                                        <Badge variant="outline" className={getTaskTypeColor(task.type)}>
                                          {task.type}
                                        </Badge>
                                        {getPriorityBadge(task.priority)}
                                      </div>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {task.subject} • {task.duration} min
                                      </p>
                                      {task.aiTip && !task.completed && (
                                        <div className="flex items-start gap-2 mt-2 p-2 bg-primary/5 rounded-lg">
                                          <Lightbulb className="h-4 w-4 text-primary mt-0.5" />
                                          <p className="text-xs text-primary">{task.aiTip}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <Trophy className="h-16 w-16 mx-auto text-primary/30 mb-4" />
                          <p className="text-muted-foreground">
                            {language === 'ta' ? 'இன்று பணிகள் இல்லை!' : 'No tasks for today!'}
                          </p>
                        </div>
                      )}
                    </TabsContent>

                    {/* Full Schedule */}
                    <TabsContent value="schedule" className="space-y-3 mt-4">
                      {activePlan.schedule.map((day, dayIndex) => (
                        <Card
                          key={day.date}
                          className={`${
                            day.isToday 
                              ? 'border-primary ring-2 ring-primary/20' 
                              : day.isCompleted 
                                ? 'bg-green-50 border-green-200 dark:bg-green-950/20' 
                                : ''
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{day.dayName}</span>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(day.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                                </span>
                                {day.isToday && (
                                  <Badge className="bg-primary text-primary-foreground">Today</Badge>
                                )}
                                {day.isCompleted && (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                )}
                              </div>
                              <Badge variant="outline">{day.focusArea}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {day.tasks.map(task => (
                                <Badge
                                  key={task.id}
                                  variant="outline"
                                  className={`text-xs ${task.completed ? 'line-through opacity-50' : ''}`}
                                >
                                  {language === 'ta' ? task.topicTamil : task.topic}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    {/* Insights */}
                    <TabsContent value="insights" className="space-y-4 mt-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-primary" />
                            {language === 'ta' ? 'தலைப்பு முன்னேற்றம்' : 'Topic Progress'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {activePlan.weakTopics.map(topic => {
                            const topicTasks = activePlan.schedule.flatMap(d => 
                              d.tasks.filter(t => t.topic === topic.name)
                            );
                            const completedTasks = topicTasks.filter(t => t.completed).length;
                            const progress = topicTasks.length > 0 
                              ? Math.round((completedTasks / topicTasks.length) * 100)
                              : 0;
                            
                            return (
                              <div key={topic.id}>
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span>{language === 'ta' ? topic.nameTamil : topic.name}</span>
                                  <span className="font-semibold">{progress}%</span>
                                </div>
                                <Progress value={progress} className="h-2" />
                              </div>
                            );
                          })}
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Lightbulb className="h-5 w-5 text-primary" />
                            <span className="font-semibold">
                              {language === 'ta' ? 'AI பரிந்துரை' : 'AI Recommendation'}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {activePlan.progress < 30 
                              ? (language === 'ta' 
                                  ? 'நீங்கள் நல்ல தொடக்கத்தில் இருக்கிறீர்கள்! தினசரி இலக்குகளை அடைய முயற்சி செய்யுங்கள்.'
                                  : 'You\'re off to a good start! Try to complete daily goals consistently.')
                              : activePlan.progress < 70
                                ? (language === 'ta'
                                    ? 'சிறப்பான முன்னேற்றம்! உயர் முன்னுரிமை தலைப்புகளில் கவனம் செலுத்துங்கள்.'
                                    : 'Great progress! Focus more on high priority topics for better results.')
                                : (language === 'ta'
                                    ? 'அருமை! நீங்கள் இலக்கை நோக்கி செல்கிறீர்கள். மாக் தேர்வுகளை எழுதுங்கள்.'
                                    : 'Excellent! You\'re on track. Start taking full mock tests now.')
                            }
                          </p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={resetPlan}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      {language === 'ta' ? 'மீட்டமை' : 'Reset'}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      {language === 'ta' ? 'காலண்டரில் ஏற்றுமதி' : 'Export to Calendar'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AISmartStudyPlanner;
