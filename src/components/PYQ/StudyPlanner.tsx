import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, Clock, Target, CheckCircle2, Play, Pause, RotateCcw, BookOpen, Flame, ChevronDown, Download, Sparkles, Bell, BellOff, BellRing, Settings, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useStudyReminders } from '@/hooks/useStudyReminders';

interface StudyPlannerProps {
  language: 'en' | 'ta';
}

interface TopicData {
  id: string;
  name: string;
  nameTa: string;
  subject: string;
  subjectTa: string;
  frequency: number;
  effort: 'low' | 'medium' | 'high';
  roi: number;
  avgQuestions: number;
  keyAreas: string[];
  estimatedHours: number;
}

interface ExamData {
  id: string;
  name: string;
  topics: TopicData[];
}

// Topics data with estimated study hours
const studyTopicsData: ExamData[] = [
  {
    id: 'neet',
    name: 'NEET UG',
    topics: [
      { id: 'neet-1', name: 'Human Physiology', nameTa: 'மனித உடலியல்', subject: 'Biology', subjectTa: 'உயிரியல்', frequency: 20, effort: 'medium', roi: 5, avgQuestions: 18, keyAreas: ['Digestive System', 'Excretory System', 'Neural Control'], estimatedHours: 25 },
      { id: 'neet-2', name: 'Genetics & Molecular Biology', nameTa: 'மரபியல் & மூலக்கூறு உயிரியல்', subject: 'Biology', subjectTa: 'உயிரியல்', frequency: 16, effort: 'medium', roi: 5, avgQuestions: 14, keyAreas: ['Mendelian Genetics', 'DNA Replication', 'Transcription'], estimatedHours: 30 },
      { id: 'neet-3', name: 'Organic Chemistry Reactions', nameTa: 'கரிம வேதியியல் வினைகள்', subject: 'Chemistry', subjectTa: 'வேதியியல்', frequency: 14, effort: 'high', roi: 4, avgQuestions: 12, keyAreas: ['Named Reactions', 'Mechanism', 'Functional Groups'], estimatedHours: 40 },
      { id: 'neet-4', name: 'Electrodynamics', nameTa: 'மின்னியக்கவியல்', subject: 'Physics', subjectTa: 'இயற்பியல்', frequency: 12, effort: 'medium', roi: 4, avgQuestions: 10, keyAreas: ['Current Electricity', 'Magnetism', 'EMI'], estimatedHours: 20 },
      { id: 'neet-5', name: 'Chemical Bonding', nameTa: 'வேதியியல் பிணைப்பு', subject: 'Chemistry', subjectTa: 'வேதியியல்', frequency: 10, effort: 'low', roi: 5, avgQuestions: 8, keyAreas: ['VSEPR', 'Hybridization', 'MOT Basics'], estimatedHours: 12 },
      { id: 'neet-6', name: 'Ecology & Environment', nameTa: 'சூழலியல் & சுற்றுச்சூழல்', subject: 'Biology', subjectTa: 'உயிரியல்', frequency: 10, effort: 'low', roi: 5, avgQuestions: 9, keyAreas: ['Ecosystem', 'Biodiversity', 'Environmental Issues'], estimatedHours: 10 },
      { id: 'neet-7', name: 'Plant Physiology', nameTa: 'தாவர உடலியல்', subject: 'Biology', subjectTa: 'உயிரியல்', frequency: 9, effort: 'medium', roi: 4, avgQuestions: 8, keyAreas: ['Photosynthesis', 'Respiration', 'Plant Hormones'], estimatedHours: 18 },
      { id: 'neet-8', name: 'Mechanics', nameTa: 'இயக்கவியல்', subject: 'Physics', subjectTa: 'இயற்பியல்', frequency: 8, effort: 'high', roi: 3, avgQuestions: 7, keyAreas: ['Newton\'s Laws', 'Rotational Motion', 'Work-Energy'], estimatedHours: 35 },
    ]
  },
  {
    id: 'jee-main',
    name: 'JEE Main',
    topics: [
      { id: 'jee-1', name: 'Calculus', nameTa: 'கால்குலஸ்', subject: 'Mathematics', subjectTa: 'கணிதம்', frequency: 22, effort: 'high', roi: 4, avgQuestions: 8, keyAreas: ['Definite Integrals', 'Differential Equations', 'Applications'], estimatedHours: 45 },
      { id: 'jee-2', name: 'Electromagnetism', nameTa: 'மின்காந்தவியல்', subject: 'Physics', subjectTa: 'இயற்பியல்', frequency: 18, effort: 'high', roi: 4, avgQuestions: 6, keyAreas: ['EMI', 'AC Circuits', 'Magnetic Force'], estimatedHours: 35 },
      { id: 'jee-3', name: 'Coordinate Geometry', nameTa: 'ஆய வடிவியல்', subject: 'Mathematics', subjectTa: 'கணிதம்', frequency: 15, effort: 'medium', roi: 5, avgQuestions: 5, keyAreas: ['Conic Sections', 'Straight Lines', 'Circles'], estimatedHours: 25 },
      { id: 'jee-4', name: 'Organic Chemistry', nameTa: 'கரிம வேதியியல்', subject: 'Chemistry', subjectTa: 'வேதியியல்', frequency: 14, effort: 'high', roi: 4, avgQuestions: 10, keyAreas: ['GOC', 'Reactions', 'Name Reactions'], estimatedHours: 40 },
      { id: 'jee-5', name: 'Modern Physics', nameTa: 'நவீன இயற்பியல்', subject: 'Physics', subjectTa: 'இயற்பியல்', frequency: 12, effort: 'low', roi: 5, avgQuestions: 4, keyAreas: ['Photoelectric Effect', 'Atomic Structure', 'Nuclear Physics'], estimatedHours: 15 },
      { id: 'jee-6', name: 'Algebra', nameTa: 'இயற்கணிதம்', subject: 'Mathematics', subjectTa: 'கணிதம்', frequency: 12, effort: 'medium', roi: 4, avgQuestions: 4, keyAreas: ['Matrices', 'Complex Numbers', 'P&C'], estimatedHours: 28 },
      { id: 'jee-7', name: 'Chemical Equilibrium', nameTa: 'வேதியியல் சமநிலை', subject: 'Chemistry', subjectTa: 'வேதியியல்', frequency: 10, effort: 'medium', roi: 5, avgQuestions: 5, keyAreas: ['Ionic Equilibrium', 'pH', 'Buffers'], estimatedHours: 18 },
      { id: 'jee-8', name: 'Thermodynamics', nameTa: 'வெப்பவியக்கவியல்', subject: 'Chemistry', subjectTa: 'வேதியியல்', frequency: 8, effort: 'medium', roi: 4, avgQuestions: 4, keyAreas: ['Enthalpy', 'Entropy', 'Gibbs Energy'], estimatedHours: 16 },
    ]
  },
  {
    id: 'jee-advanced',
    name: 'JEE Advanced',
    topics: [
      { id: 'adv-1', name: 'Mechanics (Advanced)', nameTa: 'இயக்கவியல் (மேம்பட்ட)', subject: 'Physics', subjectTa: 'இயற்பியல்', frequency: 20, effort: 'high', roi: 4, avgQuestions: 6, keyAreas: ['Rotation', 'Collisions', 'Constraints'], estimatedHours: 50 },
      { id: 'adv-2', name: 'Calculus (Advanced)', nameTa: 'கால்குலஸ் (மேம்பட்ட)', subject: 'Mathematics', subjectTa: 'கணிதம்', frequency: 18, effort: 'high', roi: 4, avgQuestions: 5, keyAreas: ['Multiple Integrals', 'Limits', 'Continuity'], estimatedHours: 55 },
      { id: 'adv-3', name: 'Organic Mechanisms', nameTa: 'கரிம பொறிமுறைகள்', subject: 'Chemistry', subjectTa: 'வேதியியல்', frequency: 16, effort: 'high', roi: 5, avgQuestions: 5, keyAreas: ['Stereochemistry', 'Reaction Mechanisms', 'Synthesis'], estimatedHours: 45 },
      { id: 'adv-4', name: 'Electromagnetism', nameTa: 'மின்காந்தவியல்', subject: 'Physics', subjectTa: 'இயற்பியல்', frequency: 15, effort: 'high', roi: 4, avgQuestions: 4, keyAreas: ['Complex Circuits', 'Inductance', 'EM Waves'], estimatedHours: 40 },
      { id: 'adv-5', name: 'Electrochemistry', nameTa: 'மின்வேதியியல்', subject: 'Chemistry', subjectTa: 'வேதியியல்', frequency: 12, effort: 'medium', roi: 5, avgQuestions: 3, keyAreas: ['Nernst Equation', 'Electrolysis', 'Cells'], estimatedHours: 20 },
      { id: 'adv-6', name: 'Algebra & Functions', nameTa: 'இயற்கணிதம் & சார்புகள்', subject: 'Mathematics', subjectTa: 'கணிதம்', frequency: 12, effort: 'medium', roi: 4, avgQuestions: 3, keyAreas: ['Functions', 'Quadratics', 'Inequalities'], estimatedHours: 30 },
      { id: 'adv-7', name: 'Coordination Chemistry', nameTa: 'ஒருங்கிணைப்பு வேதியியல்', subject: 'Chemistry', subjectTa: 'வேதியியல்', frequency: 10, effort: 'medium', roi: 4, avgQuestions: 3, keyAreas: ['Isomerism', 'CFT', 'Stability'], estimatedHours: 22 },
      { id: 'adv-8', name: 'Optics', nameTa: 'ஒளியியல்', subject: 'Physics', subjectTa: 'இயற்பியல்', frequency: 8, effort: 'medium', roi: 4, avgQuestions: 2, keyAreas: ['Wave Optics', 'Interference', 'Diffraction'], estimatedHours: 25 },
    ]
  }
];

interface ScheduleDay {
  day: number;
  date: string;
  topics: {
    topicId: string;
    topicName: string;
    subject: string;
    hoursAllocated: number;
    keyAreas: string[];
  }[];
  totalHours: number;
}

const getSubjectColor = (subject: string) => {
  if (subject === 'Physics') return 'bg-blue-100 text-blue-700 border-blue-200';
  if (subject === 'Chemistry') return 'bg-purple-100 text-purple-700 border-purple-200';
  if (subject === 'Biology') return 'bg-green-100 text-green-700 border-green-200';
  if (subject === 'Mathematics') return 'bg-orange-100 text-orange-700 border-orange-200';
  return 'bg-gray-100 text-gray-700 border-gray-200';
};

const getEffortColor = (effort: 'low' | 'medium' | 'high') => {
  if (effort === 'low') return 'bg-emerald-100 text-emerald-700';
  if (effort === 'medium') return 'bg-amber-100 text-amber-700';
  return 'bg-rose-100 text-rose-700';
};

export const StudyPlanner: React.FC<StudyPlannerProps> = ({ language }) => {
  const [selectedExam, setSelectedExam] = useState('neet');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [dailyHours, setDailyHours] = useState([3]);
  const [weeklyDays, setWeeklyDays] = useState([6]);
  const [scheduleGenerated, setScheduleGenerated] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);

  // Study reminders hook
  const {
    settings: reminderSettings,
    updateSettings: updateReminderSettings,
    permissionStatus,
    enableReminders,
    disableReminders,
    scheduleReminders,
    scheduledReminders,
    getNextReminder,
    testNotification,
    clearReminders
  } = useStudyReminders();

  const currentExam = studyTopicsData.find(e => e.id === selectedExam);

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
    setScheduleGenerated(false);
  };

  const selectAllTopics = () => {
    if (currentExam) {
      setSelectedTopics(currentExam.topics.map(t => t.id));
      setScheduleGenerated(false);
    }
  };

  const clearAllTopics = () => {
    setSelectedTopics([]);
    setScheduleGenerated(false);
  };

  // Calculate total study time needed
  const totalHoursNeeded = useMemo(() => {
    if (!currentExam) return 0;
    return currentExam.topics
      .filter(t => selectedTopics.includes(t.id))
      .reduce((sum, t) => sum + t.estimatedHours, 0);
  }, [currentExam, selectedTopics]);

  // Calculate estimated completion time
  const estimatedDays = useMemo(() => {
    const hoursPerWeek = dailyHours[0] * weeklyDays[0];
    if (hoursPerWeek === 0) return 0;
    return Math.ceil(totalHoursNeeded / hoursPerWeek * 7);
  }, [totalHoursNeeded, dailyHours, weeklyDays]);

  const estimatedWeeks = Math.ceil(estimatedDays / 7);

  // Generate personalized schedule
  const generateSchedule = () => {
    if (!currentExam || selectedTopics.length === 0) {
      toast.error(language === 'en' ? 'Please select at least one topic' : 'குறைந்தபட்சம் ஒரு தலைப்பைத் தேர்ந்தெடுக்கவும்');
      return;
    }

    const selectedTopicData = currentExam.topics.filter(t => selectedTopics.includes(t.id));
    
    // Sort by ROI (highest first) then by effort (low first for quick wins)
    const sortedTopics = [...selectedTopicData].sort((a, b) => {
      if (b.roi !== a.roi) return b.roi - a.roi;
      const effortOrder = { low: 0, medium: 1, high: 2 };
      return effortOrder[a.effort] - effortOrder[b.effort];
    });

    const generatedSchedule: ScheduleDay[] = [];
    let currentDay = 0;
    let currentDayHours = 0;
    const today = new Date();

    const dailyLimit = dailyHours[0];
    let topicIndex = 0;
    let topicHoursRemaining = sortedTopics[0]?.estimatedHours || 0;

    while (topicIndex < sortedTopics.length) {
      // Start new day
      currentDay++;
      currentDayHours = 0;
      const dayDate = new Date(today);
      dayDate.setDate(today.getDate() + currentDay - 1);
      
      const daySchedule: ScheduleDay = {
        day: currentDay,
        date: dayDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        topics: [],
        totalHours: 0
      };

      // Fill the day with topics
      while (currentDayHours < dailyLimit && topicIndex < sortedTopics.length) {
        const topic = sortedTopics[topicIndex];
        const hoursToAllocate = Math.min(topicHoursRemaining, dailyLimit - currentDayHours);

        if (hoursToAllocate > 0) {
          // Check if topic already added to this day
          const existingEntry = daySchedule.topics.find(t => t.topicId === topic.id);
          if (existingEntry) {
            existingEntry.hoursAllocated += hoursToAllocate;
          } else {
            daySchedule.topics.push({
              topicId: topic.id,
              topicName: language === 'en' ? topic.name : topic.nameTa,
              subject: topic.subject,
              hoursAllocated: hoursToAllocate,
              keyAreas: topic.keyAreas
            });
          }

          currentDayHours += hoursToAllocate;
          topicHoursRemaining -= hoursToAllocate;
        }

        // Move to next topic if current one is complete
        if (topicHoursRemaining <= 0) {
          topicIndex++;
          if (topicIndex < sortedTopics.length) {
            topicHoursRemaining = sortedTopics[topicIndex].estimatedHours;
          }
        }
      }

      daySchedule.totalHours = currentDayHours;
      generatedSchedule.push(daySchedule);
    }

    setSchedule(generatedSchedule);
    setScheduleGenerated(true);
    
    // Schedule reminders if enabled
    if (reminderSettings.enabled) {
      scheduleReminders(generatedSchedule);
      toast.success(language === 'en' 
        ? `Study plan generated with reminders! ${generatedSchedule.length} days of focused learning` 
        : `நினைவூட்டல்களுடன் படிப்புத் திட்டம் உருவாக்கப்பட்டது! ${generatedSchedule.length} நாட்கள்`
      );
    } else {
      toast.success(language === 'en' 
        ? `Study plan generated! ${generatedSchedule.length} days of focused learning` 
        : `படிப்புத் திட்டம் உருவாக்கப்பட்டது! ${generatedSchedule.length} நாட்கள்`
      );
    }
  };

  // Handle enabling reminders
  const handleEnableReminders = async () => {
    const enabled = await enableReminders();
    if (enabled) {
      toast.success(language === 'en' ? 'Reminders enabled!' : 'நினைவூட்டல்கள் இயக்கப்பட்டது!');
      // Reschedule if we already have a schedule
      if (schedule.length > 0) {
        scheduleReminders(schedule);
      }
    } else {
      toast.error(language === 'en' 
        ? 'Please allow notifications to enable reminders' 
        : 'நினைவூட்டல்களை இயக்க அறிவிப்புகளை அனுமதிக்கவும்'
      );
    }
  };

  // Handle disabling reminders
  const handleDisableReminders = () => {
    disableReminders();
    toast.success(language === 'en' ? 'Reminders disabled' : 'நினைவூட்டல்கள் முடக்கப்பட்டது');
  };

  const resetPlanner = () => {
    setSelectedTopics([]);
    setScheduleGenerated(false);
    setSchedule([]);
    setDailyHours([3]);
    setWeeklyDays([6]);
    clearReminders();
  };

  const nextReminder = getNextReminder();
  const formatReminderTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="mt-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {language === 'en' ? 'Smart Study Planner' : 'ஸ்மார்ட் படிப்பு திட்டமிடுபவர்'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === 'en' ? 'Create a personalized schedule based on high-yield topics' : 'உயர்-விளைச்சல் தலைப்புகளின் அடிப்படையில் தனிப்பயனாக்கப்பட்ட அட்டவணையை உருவாக்கவும்'}
          </p>
        </div>
        <Badge className="ml-auto bg-indigo-100 text-indigo-700 border-indigo-200">
          <Sparkles className="w-3 h-3 mr-1" />
          {language === 'en' ? 'AI-Powered' : 'AI-இயக்கப்படுகிறது'}
        </Badge>
      </div>

      {/* Exam Selection Tabs */}
      <Tabs value={selectedExam} onValueChange={(v) => { setSelectedExam(v); setSelectedTopics([]); setScheduleGenerated(false); }} className="w-full">
        <TabsList className="w-full justify-start bg-gray-100/80 p-1 rounded-lg mb-6">
          {studyTopicsData.map(exam => (
            <TabsTrigger 
              key={exam.id} 
              value={exam.id}
              className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              {exam.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {studyTopicsData.map(exam => (
          <TabsContent key={exam.id} value={exam.id}>
            {!scheduleGenerated ? (
              <div className="space-y-6">
                {/* Topic Selection */}
                <Card className="border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <Target className="w-4 h-4 text-indigo-600" />
                        {language === 'en' ? 'Select Topics to Study' : 'படிக்க வேண்டிய தலைப்புகளைத் தேர்ந்தெடுக்கவும்'}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={selectAllTopics} className="text-xs">
                          {language === 'en' ? 'Select All' : 'அனைத்தும்'}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={clearAllTopics} className="text-xs text-muted-foreground">
                          {language === 'en' ? 'Clear' : 'அழி'}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid gap-3">
                      {exam.topics.map((topic) => (
                        <div 
                          key={topic.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                            selectedTopics.includes(topic.id) 
                              ? 'border-indigo-300 bg-indigo-50/50' 
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                          onClick={() => toggleTopic(topic.id)}
                        >
                          <Checkbox 
                            checked={selectedTopics.includes(topic.id)}
                            className="pointer-events-none"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-sm text-gray-900">
                                {language === 'en' ? topic.name : topic.nameTa}
                              </span>
                              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getSubjectColor(topic.subject)}`}>
                                {topic.subject}
                              </Badge>
                              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getEffortColor(topic.effort)}`}>
                                {topic.estimatedHours}h
                              </Badge>
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Flame className="w-3 h-3 text-orange-500" />
                                {topic.frequency}% frequency
                              </span>
                              <span className="flex items-center gap-1">
                                ROI: {topic.roi}/5
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Time Configuration */}
                <Card className="border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-600" />
                      {language === 'en' ? 'Study Time Configuration' : 'படிப்பு நேர கட்டமைப்பு'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Daily Hours */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          {language === 'en' ? 'Hours per day' : 'ஒரு நாளைக்கு மணி'}
                        </span>
                        <Badge className="bg-indigo-100 text-indigo-700">
                          {dailyHours[0]} {language === 'en' ? 'hours' : 'மணி'}
                        </Badge>
                      </div>
                      <Slider
                        value={dailyHours}
                        onValueChange={setDailyHours}
                        min={1}
                        max={10}
                        step={0.5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>1h</span>
                        <span>5h</span>
                        <span>10h</span>
                      </div>
                    </div>

                    {/* Days per week */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          {language === 'en' ? 'Study days per week' : 'வாரத்திற்கு படிப்பு நாட்கள்'}
                        </span>
                        <Badge className="bg-indigo-100 text-indigo-700">
                          {weeklyDays[0]} {language === 'en' ? 'days' : 'நாட்கள்'}
                        </Badge>
                      </div>
                      <Slider
                        value={weeklyDays}
                        onValueChange={setWeeklyDays}
                        min={1}
                        max={7}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>1</span>
                        <span>4</span>
                        <span>7</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Summary & Generate Button */}
                {selectedTopics.length > 0 && (
                  <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-indigo-700">{selectedTopics.length}</p>
                          <p className="text-xs text-gray-600">{language === 'en' ? 'Topics Selected' : 'தலைப்புகள்'}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-700">{totalHoursNeeded}h</p>
                          <p className="text-xs text-gray-600">{language === 'en' ? 'Total Study Time' : 'மொத்த நேரம்'}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-emerald-700">{estimatedDays}</p>
                          <p className="text-xs text-gray-600">{language === 'en' ? 'Days to Complete' : 'நாட்கள்'}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-amber-700">~{estimatedWeeks}</p>
                          <p className="text-xs text-gray-600">{language === 'en' ? 'Weeks' : 'வாரங்கள்'}</p>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
                        size="lg"
                        onClick={generateSchedule}
                      >
                        <Play className="w-5 h-5 mr-2" />
                        {language === 'en' ? 'Generate Study Plan' : 'படிப்புத் திட்டத்தை உருவாக்கு'}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              /* Generated Schedule View */
              <div className="space-y-6">
                {/* Schedule Header */}
                <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          {language === 'en' ? 'Your Personalized Study Plan' : 'உங்கள் தனிப்பயனாக்கப்பட்ட படிப்புத் திட்டம்'}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {language === 'en' 
                            ? `${schedule.length} days • ${totalHoursNeeded} hours • ${selectedTopics.length} topics`
                            : `${schedule.length} நாட்கள் • ${totalHoursNeeded} மணி • ${selectedTopics.length} தலைப்புகள்`
                          }
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={resetPlanner}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'New Plan' : 'புதிய திட்டம்'}
                      </Button>
                    </div>
                    
                    {/* Overall Progress */}
                    <div className="bg-white rounded-lg p-4 border border-indigo-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {language === 'en' ? 'Completion Timeline' : 'முடிவு காலவரிசை'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {schedule[0]?.date} → {schedule[schedule.length - 1]?.date}
                        </span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Reminders Card */}
                <Card className={`border ${reminderSettings.enabled ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50' : 'border-gray-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${reminderSettings.enabled ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                          {reminderSettings.enabled ? (
                            <BellRing className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <BellOff className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm text-gray-900">
                            {language === 'en' ? 'Study Reminders' : 'படிப்பு நினைவூட்டல்கள்'}
                          </h5>
                          {reminderSettings.enabled && nextReminder ? (
                            <p className="text-xs text-gray-600">
                              {language === 'en' ? 'Next reminder: ' : 'அடுத்த நினைவூட்டல்: '}
                              <span className="font-medium text-emerald-700">
                                Day {nextReminder.dayNumber} at {formatReminderTime(nextReminder.scheduledTime)}
                              </span>
                            </p>
                          ) : reminderSettings.enabled ? (
                            <p className="text-xs text-emerald-600">
                              {language === 'en' ? 'Reminders active' : 'நினைவூட்டல்கள் செயலில்'}
                            </p>
                          ) : (
                            <p className="text-xs text-gray-500">
                              {language === 'en' ? 'Get notified before each study session' : 'ஒவ்வொரு படிப்பு அமர்வுக்கும் முன் அறிவிக்கப்படும்'}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {reminderSettings.enabled && (
                          <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-gray-500">
                                <Settings className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <Bell className="w-5 h-5 text-indigo-600" />
                                  {language === 'en' ? 'Reminder Settings' : 'நினைவூட்டல் அமைப்புகள்'}
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6 py-4">
                                {/* Study Time */}
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">
                                    {language === 'en' ? 'Preferred Study Time' : 'விருப்பமான படிப்பு நேரம்'}
                                  </Label>
                                  <Select
                                    value={reminderSettings.studyTime}
                                    onValueChange={(value) => {
                                      updateReminderSettings({ studyTime: value });
                                      if (schedule.length > 0) {
                                        scheduleReminders(schedule);
                                      }
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="06:00">6:00 AM</SelectItem>
                                      <SelectItem value="07:00">7:00 AM</SelectItem>
                                      <SelectItem value="08:00">8:00 AM</SelectItem>
                                      <SelectItem value="09:00">9:00 AM</SelectItem>
                                      <SelectItem value="10:00">10:00 AM</SelectItem>
                                      <SelectItem value="14:00">2:00 PM</SelectItem>
                                      <SelectItem value="16:00">4:00 PM</SelectItem>
                                      <SelectItem value="17:00">5:00 PM</SelectItem>
                                      <SelectItem value="18:00">6:00 PM</SelectItem>
                                      <SelectItem value="19:00">7:00 PM</SelectItem>
                                      <SelectItem value="20:00">8:00 PM</SelectItem>
                                      <SelectItem value="21:00">9:00 PM</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                {/* Reminder Lead Time */}
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">
                                    {language === 'en' ? 'Remind me before' : 'முன்பு நினைவூட்டு'}
                                  </Label>
                                  <Select
                                    value={reminderSettings.reminderMinutesBefore.toString()}
                                    onValueChange={(value) => {
                                      updateReminderSettings({ reminderMinutesBefore: parseInt(value) });
                                      if (schedule.length > 0) {
                                        scheduleReminders(schedule);
                                      }
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="5">5 minutes</SelectItem>
                                      <SelectItem value="10">10 minutes</SelectItem>
                                      <SelectItem value="15">15 minutes</SelectItem>
                                      <SelectItem value="30">30 minutes</SelectItem>
                                      <SelectItem value="60">1 hour</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                {/* Test Notification */}
                                <div className="pt-2 border-t">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => {
                                      testNotification();
                                      toast.success(language === 'en' ? 'Test notification sent!' : 'சோதனை அறிவிப்பு அனுப்பப்பட்டது!');
                                    }}
                                    className="w-full"
                                  >
                                    <Bell className="w-4 h-4 mr-2" />
                                    {language === 'en' ? 'Send Test Notification' : 'சோதனை அறிவிப்பை அனுப்பு'}
                                  </Button>
                                </div>

                                {/* Active Reminders Count */}
                                <div className="text-center text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                                  {language === 'en' 
                                    ? `${scheduledReminders.filter(r => !r.notified).length} reminders scheduled`
                                    : `${scheduledReminders.filter(r => !r.notified).length} நினைவூட்டல்கள் திட்டமிடப்பட்டுள்ளன`
                                  }
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                        
                        <Switch
                          checked={reminderSettings.enabled}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleEnableReminders();
                            } else {
                              handleDisableReminders();
                            }
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Permission denied warning */}
                    {permissionStatus === 'denied' && (
                      <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-xs text-amber-700">
                          {language === 'en' 
                            ? '⚠️ Notifications are blocked. Please enable them in your browser settings.'
                            : '⚠️ அறிவிப்புகள் தடுக்கப்பட்டுள்ளன. உலாவி அமைப்புகளில் இயக்கவும்.'
                          }
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Daily Schedule */}
                <div className="space-y-3">
                  {schedule.map((day) => (
                    <Collapsible key={day.day} open={expandedDay === day.day} onOpenChange={() => setExpandedDay(expandedDay === day.day ? null : day.day)}>
                      <Card className={`border transition-all ${expandedDay === day.day ? 'border-indigo-300 shadow-md' : 'border-gray-200'}`}>
                        <CollapsibleTrigger asChild>
                          <CardContent className="p-4 cursor-pointer hover:bg-gray-50/50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                  {day.day}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{day.date}</p>
                                  <p className="text-xs text-gray-500">
                                    {day.topics.length} {language === 'en' ? 'topics' : 'தலைப்புகள்'} • {day.totalHours.toFixed(1)}h
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                  {day.topics.slice(0, 3).map((t, idx) => (
                                    <Badge key={idx} variant="outline" className={`text-[10px] ${getSubjectColor(t.subject)}`}>
                                      {t.subject.slice(0, 3)}
                                    </Badge>
                                  ))}
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedDay === day.day ? 'rotate-180' : ''}`} />
                              </div>
                            </div>
                          </CardContent>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="px-4 pb-4 pt-0 border-t border-gray-100">
                            <div className="space-y-3 mt-4">
                              {day.topics.map((topic, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                  <BookOpen className="w-4 h-4 text-indigo-600 mt-0.5" />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium text-sm text-gray-900">{topic.topicName}</span>
                                      <Badge className="bg-indigo-100 text-indigo-700 text-xs">
                                        {topic.hoursAllocated.toFixed(1)}h
                                      </Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {topic.keyAreas.map((area, areaIdx) => (
                                        <span key={areaIdx} className="text-[10px] bg-white px-2 py-0.5 rounded border border-gray-200 text-gray-600">
                                          {area}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  ))}
                </div>

                {/* Tips Card */}
                <Card className="border-dashed border-2 border-gray-200 bg-gray-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <Flame className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900 mb-1">
                          {language === 'en' ? 'Pro Tips for Success' : 'வெற்றிக்கான ப்ரோ குறிப்புகள்'}
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• {language === 'en' ? 'Topics are ordered by ROI - highest value first!' : 'தலைப்புகள் ROI படி வரிசைப்படுத்தப்பட்டுள்ளன'}</li>
                          <li>• {language === 'en' ? 'Take 5-minute breaks every hour' : 'ஒவ்வொரு மணி நேரமும் 5 நிமிட இடைவெளி எடுங்கள்'}</li>
                          <li>• {language === 'en' ? 'Practice PYQs after completing each topic' : 'ஒவ்வொரு தலைப்பையும் முடித்த பிறகு PYQ பயிற்சி செய்யுங்கள்'}</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default StudyPlanner;
