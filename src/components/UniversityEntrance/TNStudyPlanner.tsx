import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Target, Clock, BookOpen, 
  CheckCircle2, Circle, Play, Pause, RotateCcw,
  Download, Bell, ChevronDown, ChevronUp, Trophy,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { universities, University, Course, SyllabusUnit } from '@/data/university-entrance-data';
import { toast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

interface StudyDay {
  date: string;
  topics: {
    unitTitle: string;
    topicName: string;
    subtopics: string[];
    importance: string;
    completed: boolean;
  }[];
  isCompleted: boolean;
}

interface StudyPlan {
  id: string;
  universityId: string;
  courseId: string;
  examDate: string;
  hoursPerDay: number;
  createdAt: string;
  days: StudyDay[];
  progress: number;
}

const STORAGE_KEY = 'tn-university-study-plans';

export const TNStudyPlanner = () => {
  const navigate = useNavigate();
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [examDate, setExamDate] = useState<string>('');
  const [hoursPerDay, setHoursPerDay] = useState<number>(3);
  const [activePlan, setActivePlan] = useState<StudyPlan | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [showGenerator, setShowGenerator] = useState(true);

  // Load saved plan
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const plans = JSON.parse(saved);
        if (plans.length > 0) {
          setActivePlan(plans[0]);
          setShowGenerator(false);
        }
      } catch (e) {
        console.error('Failed to load study plans:', e);
      }
    }
  }, []);

  // Get available courses for selected university
  const availableCourses = useMemo(() => {
    const university = universities.find(u => u.id === selectedUniversity);
    return university?.courses || [];
  }, [selectedUniversity]);

  // Get selected course data
  const courseData = useMemo(() => {
    const university = universities.find(u => u.id === selectedUniversity);
    return university?.courses.find(c => c.id === selectedCourse);
  }, [selectedUniversity, selectedCourse]);

  // Generate study plan
  const generatePlan = () => {
    if (!selectedUniversity || !selectedCourse || !examDate) {
      toast({
        title: 'Missing Information',
        description: 'Please fill all fields',
        variant: 'destructive',
      });
      return;
    }

    const course = courseData;
    if (!course) return;

    const today = new Date();
    const exam = new Date(examDate);
    const daysUntilExam = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExam < 7) {
      toast({
        title: 'Not Enough Time',
        description: 'Exam date should be at least 7 days away',
        variant: 'destructive',
      });
      return;
    }

    // Collect all topics from syllabus
    const allTopics: { unit: SyllabusUnit; topic: { name: string; subtopics: string[]; importance: string } }[] = [];
    course.syllabus.forEach(unit => {
      unit.topics.forEach(topic => {
        allTopics.push({ unit, topic });
      });
    });

    // Sort by importance (High first)
    allTopics.sort((a, b) => {
      const order = { 'High': 0, 'Medium': 1, 'Low': 2 };
      return (order[a.topic.importance as keyof typeof order] || 2) - (order[b.topic.importance as keyof typeof order] || 2);
    });

    // Distribute topics across days
    const studyDays = daysUntilExam - 3; // Keep last 3 days for revision
    const topicsPerDay = Math.ceil(allTopics.length / studyDays);
    
    const days: StudyDay[] = [];
    let topicIndex = 0;

    for (let i = 0; i < studyDays && topicIndex < allTopics.length; i++) {
      const dayDate = new Date(today);
      dayDate.setDate(today.getDate() + i + 1);

      const dayTopics = [];
      for (let j = 0; j < topicsPerDay && topicIndex < allTopics.length; j++) {
        const t = allTopics[topicIndex];
        dayTopics.push({
          unitTitle: t.unit.title,
          topicName: t.topic.name,
          subtopics: t.topic.subtopics,
          importance: t.topic.importance,
          completed: false,
        });
        topicIndex++;
      }

      days.push({
        date: dayDate.toISOString().split('T')[0],
        topics: dayTopics,
        isCompleted: false,
      });
    }

    // Add revision days
    for (let i = 0; i < 3; i++) {
      const dayDate = new Date(exam);
      dayDate.setDate(exam.getDate() - (3 - i));
      days.push({
        date: dayDate.toISOString().split('T')[0],
        topics: [{
          unitTitle: 'Revision',
          topicName: i === 0 ? 'High Priority Topics Review' : i === 1 ? 'Practice Previous Papers' : 'Quick Formula Revision',
          subtopics: [],
          importance: 'High',
          completed: false,
        }],
        isCompleted: false,
      });
    }

    const newPlan: StudyPlan = {
      id: `plan-${Date.now()}`,
      universityId: selectedUniversity,
      courseId: selectedCourse,
      examDate,
      hoursPerDay,
      createdAt: new Date().toISOString(),
      days,
      progress: 0,
    };

    setActivePlan(newPlan);
    setShowGenerator(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newPlan]));

    toast({
      title: 'Study Plan Created! 🎉',
      description: `${days.length} days planned until your exam`,
    });
  };

  // Toggle topic completion
  const toggleTopicComplete = (dayIndex: number, topicIndex: number) => {
    if (!activePlan) return;

    const updatedPlan = { ...activePlan };
    updatedPlan.days[dayIndex].topics[topicIndex].completed = 
      !updatedPlan.days[dayIndex].topics[topicIndex].completed;

    // Check if day is complete
    updatedPlan.days[dayIndex].isCompleted = 
      updatedPlan.days[dayIndex].topics.every(t => t.completed);

    // Calculate overall progress
    const totalTopics = updatedPlan.days.reduce((acc, d) => acc + d.topics.length, 0);
    const completedTopics = updatedPlan.days.reduce(
      (acc, d) => acc + d.topics.filter(t => t.completed).length, 0
    );
    updatedPlan.progress = Math.round((completedTopics / totalTopics) * 100);

    setActivePlan(updatedPlan);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([updatedPlan]));

    // Celebration at milestones
    if ([25, 50, 75, 100].includes(updatedPlan.progress) && 
        updatedPlan.days[dayIndex].topics[topicIndex].completed) {
      confetti({
        particleCount: updatedPlan.progress === 100 ? 200 : 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast({
        title: updatedPlan.progress === 100 ? '🎉 Plan Complete!' : `🎯 ${updatedPlan.progress}% Done!`,
        description: updatedPlan.progress === 100 
          ? 'You\'ve completed your study plan!' 
          : 'Keep up the great work!',
      });
    }
  };

  // Reset plan
  const resetPlan = () => {
    setActivePlan(null);
    setShowGenerator(true);
    setSelectedUniversity('');
    setSelectedCourse('');
    setExamDate('');
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: 'Plan Reset',
      description: 'You can create a new study plan',
    });
  };

  // Export to ICS
  const exportToCalendar = () => {
    if (!activePlan) return;

    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TN University Study Planner//EN
`;

    activePlan.days.forEach((day, idx) => {
      const topics = day.topics.map(t => t.topicName).join(', ');
      icsContent += `BEGIN:VEVENT
DTSTART:${day.date.replace(/-/g, '')}
SUMMARY:Study: ${topics.slice(0, 50)}${topics.length > 50 ? '...' : ''}
DESCRIPTION:Topics: ${topics}
END:VEVENT
`;
    });

    icsContent += 'END:VCALENDAR';

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'study-plan.ics';
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Calendar Exported',
      description: 'Import the .ics file to your calendar app',
    });
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'High': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'Medium': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const isToday = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
  };

  const isPast = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr < today;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Header */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/career-assessment/colleges')}
          className="gap-2 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Page Title */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Study Planner
          </h1>
          <p className="text-muted-foreground">
            Personalized study schedule for your entrance exam / தனிப்பயன் படிப்பு அட்டவணை
          </p>
        </div>

        {/* Generator Form or Active Plan */}
        {showGenerator ? (
          <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#6a0dad]" />
                Generate Your Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* University Selection */}
              <div className="space-y-2">
                <Label>Select University / Exam</Label>
                <Select value={selectedUniversity} onValueChange={(val) => { setSelectedUniversity(val); setSelectedCourse(''); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose university..." />
                  </SelectTrigger>
                  <SelectContent>
                    {universities.map(uni => (
                      <SelectItem key={uni.id} value={uni.id}>
                        {uni.name} ({uni.examName})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Course Selection */}
              {selectedUniversity && (
                <div className="space-y-2">
                  <Label>Select Course</Label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose course..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCourses.map(course => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name} ({course.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Exam Date */}
              <div className="space-y-2">
                <Label>Exam Date (Expected)</Label>
                <Input 
                  type="date" 
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  min={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                />
              </div>

              {/* Study Hours */}
              <div className="space-y-2">
                <Label>Hours per Day</Label>
                <Select value={hoursPerDay.toString()} onValueChange={(val) => setHoursPerDay(parseInt(val))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Hours</SelectItem>
                    <SelectItem value="3">3 Hours</SelectItem>
                    <SelectItem value="4">4 Hours</SelectItem>
                    <SelectItem value="5">5 Hours</SelectItem>
                    <SelectItem value="6">6+ Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Course Info Preview */}
              {courseData && (
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{courseData.name}</span> has {courseData.syllabus.length} units 
                    with {courseData.syllabus.reduce((acc, u) => acc + u.topics.length, 0)} topics to cover
                  </p>
                </div>
              )}

              <Button 
                onClick={generatePlan}
                className="w-full bg-[#6a0dad] hover:bg-[#5a0b9d] gap-2"
                disabled={!selectedUniversity || !selectedCourse || !examDate}
              >
                <Sparkles className="h-4 w-4" />
                Generate Study Plan
              </Button>
            </CardContent>
          </Card>
        ) : activePlan && (
          <>
            {/* Plan Overview */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {universities.find(u => u.id === activePlan.universityId)?.examName} - {' '}
                      {universities.find(u => u.id === activePlan.universityId)?.courses.find(c => c.id === activePlan.courseId)?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Exam on {formatDate(activePlan.examDate)}
                    </p>
                  </div>
                  <Badge className="bg-[#6a0dad]">{activePlan.progress}% Done</Badge>
                </div>
                <Progress value={activePlan.progress} className="h-2" />
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={exportToCalendar} className="gap-1">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetPlan} className="gap-1 text-red-600">
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Daily Schedule */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#6a0dad]" />
                Daily Schedule
              </h3>

              {activePlan.days.map((day, dayIndex) => (
                <Card 
                  key={dayIndex}
                  className={`bg-white dark:bg-slate-800 border rounded-xl overflow-hidden transition-all ${
                    day.isCompleted 
                      ? 'border-green-500' 
                      : isToday(day.date) 
                        ? 'border-[#6a0dad] border-2' 
                        : isPast(day.date) && !day.isCompleted 
                          ? 'border-amber-500' 
                          : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => setExpandedDay(expandedDay === dayIndex ? null : dayIndex)}
                    className="w-full p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        day.isCompleted 
                          ? 'bg-green-100 dark:bg-green-900/30' 
                          : isToday(day.date)
                            ? 'bg-[#6a0dad]/10'
                            : 'bg-slate-100 dark:bg-slate-700'
                      }`}>
                        {day.isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <span className="font-bold text-sm">{dayIndex + 1}</span>
                        )}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-foreground flex items-center gap-2">
                          {formatDate(day.date)}
                          {isToday(day.date) && (
                            <Badge className="bg-[#6a0dad] text-xs">Today</Badge>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {day.topics.length} topic{day.topics.length > 1 ? 's' : ''} • 
                          {day.topics.filter(t => t.completed).length}/{day.topics.length} done
                        </p>
                      </div>
                    </div>
                    {expandedDay === dayIndex ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>

                  {expandedDay === dayIndex && (
                    <div className="px-4 pb-4 space-y-2">
                      {day.topics.map((topic, topicIndex) => (
                        <button
                          key={topicIndex}
                          onClick={() => toggleTopicComplete(dayIndex, topicIndex)}
                          className={`w-full text-left p-3 rounded-lg border transition-all ${
                            topic.completed
                              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-[#6a0dad]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 ${topic.completed ? 'text-green-600' : 'text-slate-400'}`}>
                              {topic.completed ? (
                                <CheckCircle2 className="h-5 w-5" />
                              ) : (
                                <Circle className="h-5 w-5" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`font-medium ${topic.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                  {topic.topicName}
                                </span>
                                <Badge className={`text-xs ${getImportanceColor(topic.importance)}`}>
                                  {topic.importance}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {topic.unitTitle}
                              </p>
                              {topic.subtopics.length > 0 && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {topic.subtopics.join(' • ')}
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
