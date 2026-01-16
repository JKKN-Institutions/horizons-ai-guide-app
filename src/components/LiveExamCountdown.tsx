import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, Calendar, Bell, ChevronRight, Timer, AlertCircle,
  GraduationCap, Briefcase, Building2, BookOpen, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

interface Exam {
  id: string;
  name: string;
  fullName: string;
  date: Date;
  category: 'engineering' | 'medical' | 'government' | 'management' | 'law';
  icon: React.ReactNode;
  color: string;
  importance: 'high' | 'medium' | 'low';
}

const EXAMS: Exam[] = [
  // Engineering
  { id: 'jee-main-jan', name: 'JEE Main', fullName: 'JEE Main 2026 - Session 1', date: new Date('2026-01-23'), category: 'engineering', icon: <GraduationCap className="h-4 w-4" />, color: 'blue', importance: 'high' },
  { id: 'jee-main-apr', name: 'JEE Main', fullName: 'JEE Main 2026 - Session 2', date: new Date('2026-04-10'), category: 'engineering', icon: <GraduationCap className="h-4 w-4" />, color: 'blue', importance: 'high' },
  { id: 'jee-advanced', name: 'JEE Advanced', fullName: 'JEE Advanced 2026', date: new Date('2026-05-18'), category: 'engineering', icon: <GraduationCap className="h-4 w-4" />, color: 'indigo', importance: 'high' },
  { id: 'bitsat', name: 'BITSAT', fullName: 'BITSAT 2026', date: new Date('2026-05-22'), category: 'engineering', icon: <GraduationCap className="h-4 w-4" />, color: 'purple', importance: 'medium' },
  { id: 'tnea', name: 'TNEA', fullName: 'TNEA Counselling 2026', date: new Date('2026-06-15'), category: 'engineering', icon: <GraduationCap className="h-4 w-4" />, color: 'green', importance: 'high' },
  
  // Medical
  { id: 'neet-ug', name: 'NEET UG', fullName: 'NEET UG 2026', date: new Date('2026-05-04'), category: 'medical', icon: <BookOpen className="h-4 w-4" />, color: 'red', importance: 'high' },
  { id: 'neet-pg', name: 'NEET PG', fullName: 'NEET PG 2026', date: new Date('2026-06-15'), category: 'medical', icon: <BookOpen className="h-4 w-4" />, color: 'rose', importance: 'high' },
  { id: 'aiims', name: 'AIIMS MBBS', fullName: 'AIIMS MBBS Counselling', date: new Date('2026-07-01'), category: 'medical', icon: <BookOpen className="h-4 w-4" />, color: 'pink', importance: 'medium' },
  
  // Government
  { id: 'upsc-prelims', name: 'UPSC Prelims', fullName: 'UPSC Civil Services Prelims', date: new Date('2026-05-26'), category: 'government', icon: <Building2 className="h-4 w-4" />, color: 'amber', importance: 'high' },
  { id: 'ssc-cgl', name: 'SSC CGL', fullName: 'SSC CGL 2026', date: new Date('2026-03-15'), category: 'government', icon: <Briefcase className="h-4 w-4" />, color: 'orange', importance: 'high' },
  { id: 'tnpsc-group1', name: 'TNPSC Group 1', fullName: 'TNPSC Group 1 Prelims', date: new Date('2026-04-20'), category: 'government', icon: <Building2 className="h-4 w-4" />, color: 'teal', importance: 'high' },
  { id: 'tnpsc-group2', name: 'TNPSC Group 2', fullName: 'TNPSC Group 2', date: new Date('2026-02-28'), category: 'government', icon: <Building2 className="h-4 w-4" />, color: 'cyan', importance: 'medium' },
  { id: 'rrb-ntpc', name: 'RRB NTPC', fullName: 'RRB NTPC 2026', date: new Date('2026-03-10'), category: 'government', icon: <Briefcase className="h-4 w-4" />, color: 'lime', importance: 'medium' },
  
  // Management
  { id: 'cat', name: 'CAT', fullName: 'CAT 2026', date: new Date('2026-11-24'), category: 'management', icon: <Briefcase className="h-4 w-4" />, color: 'emerald', importance: 'high' },
  { id: 'xat', name: 'XAT', fullName: 'XAT 2027', date: new Date('2027-01-05'), category: 'management', icon: <Briefcase className="h-4 w-4" />, color: 'green', importance: 'medium' },
  { id: 'tancet-mba', name: 'TANCET MBA', fullName: 'TANCET MBA 2026', date: new Date('2026-03-08'), category: 'management', icon: <Briefcase className="h-4 w-4" />, color: 'sky', importance: 'medium' },
  
  // Law
  { id: 'clat', name: 'CLAT', fullName: 'CLAT 2026', date: new Date('2026-05-11'), category: 'law', icon: <BookOpen className="h-4 w-4" />, color: 'violet', importance: 'high' },
  { id: 'ailet', name: 'AILET', fullName: 'AILET 2026', date: new Date('2026-05-25'), category: 'law', icon: <BookOpen className="h-4 w-4" />, color: 'fuchsia', importance: 'medium' },
];

const LiveExamCountdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('exam_reminders');
    if (saved) setReminders(JSON.parse(saved));
  }, []);

  const getTimeRemaining = (examDate: Date) => {
    const diff = examDate.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds, isPast: false };
  };

  const toggleReminder = (examId: string) => {
    const newReminders = { ...reminders, [examId]: !reminders[examId] };
    setReminders(newReminders);
    localStorage.setItem('exam_reminders', JSON.stringify(newReminders));
    
    toast({
      title: newReminders[examId] ? 'Reminder Set!' : 'Reminder Removed',
      description: newReminders[examId] 
        ? "We'll notify you before the exam" 
        : 'Reminder has been removed',
    });
  };

  const sortedExams = [...EXAMS].sort((a, b) => a.date.getTime() - b.date.getTime());
  const upcomingExams = sortedExams.filter(e => e.date.getTime() > now.getTime()).slice(0, 3);

  const getColorClass = (color: string, type: 'bg' | 'text' | 'border') => {
    return `${type}-${color}-500`;
  };

  const categories = [
    { id: 'all', name: 'All Exams' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'medical', name: 'Medical' },
    { id: 'government', name: 'Government' },
    { id: 'management', name: 'Management' },
    { id: 'law', name: 'Law' },
  ];

  const getUrgencyBadge = (days: number) => {
    if (days <= 7) return <Badge variant="destructive" className="animate-pulse">This Week!</Badge>;
    if (days <= 30) return <Badge className="bg-orange-500">This Month</Badge>;
    if (days <= 90) return <Badge className="bg-yellow-500 text-yellow-900">3 Months</Badge>;
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg">
                <Clock className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-blue-600 transition-colors">
                  Live Exam Countdown
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Track all major exam dates with live countdowns
                </p>
                <div className="space-y-2">
                  {upcomingExams.slice(0, 2).map(exam => {
                    const time = getTimeRemaining(exam.date);
                    return (
                      <div key={exam.id} className="flex items-center justify-between text-sm">
                        <span className="font-medium">{exam.name}</span>
                        <span className="text-blue-600 font-mono">{time.days}d {time.hours}h</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Live Exam Countdown Dashboard
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="all" className="mt-4">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-1">
            {categories.map(cat => (
              <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(cat => (
            <TabsContent key={cat.id} value={cat.id} className="space-y-3 mt-4">
              {sortedExams
                .filter(e => cat.id === 'all' || e.category === cat.id)
                .filter(e => e.date.getTime() > now.getTime())
                .map((exam, index) => {
                  const time = getTimeRemaining(exam.date);
                  
                  return (
                    <motion.div
                      key={exam.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className={`hover:shadow-md transition-all ${time.days <= 7 ? 'border-red-300 bg-red-50/50 dark:bg-red-900/10' : ''}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div className={`p-1.5 rounded-lg bg-${exam.color}-100 text-${exam.color}-600`}>
                                  {exam.icon}
                                </div>
                                <h4 className="font-semibold">{exam.fullName}</h4>
                                {getUrgencyBadge(time.days)}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {exam.date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="grid grid-cols-4 gap-1 text-center">
                                <div className="bg-muted rounded px-2 py-1">
                                  <div className="text-lg font-bold font-mono">{time.days}</div>
                                  <div className="text-[10px] text-muted-foreground">DAYS</div>
                                </div>
                                <div className="bg-muted rounded px-2 py-1">
                                  <div className="text-lg font-bold font-mono">{time.hours}</div>
                                  <div className="text-[10px] text-muted-foreground">HRS</div>
                                </div>
                                <div className="bg-muted rounded px-2 py-1">
                                  <div className="text-lg font-bold font-mono">{time.minutes}</div>
                                  <div className="text-[10px] text-muted-foreground">MIN</div>
                                </div>
                                <div className="bg-muted rounded px-2 py-1">
                                  <motion.div 
                                    key={time.seconds}
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    className="text-lg font-bold font-mono"
                                  >
                                    {time.seconds}
                                  </motion.div>
                                  <div className="text-[10px] text-muted-foreground">SEC</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-end gap-2 mt-2">
                                <Bell className={`h-4 w-4 ${reminders[exam.id] ? 'text-primary' : 'text-muted-foreground'}`} />
                                <Switch
                                  checked={reminders[exam.id] || false}
                                  onCheckedChange={() => toggleReminder(exam.id)}
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LiveExamCountdown;
