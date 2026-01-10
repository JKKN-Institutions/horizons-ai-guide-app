import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import {
  BookOpen, Clock, Target, ChevronRight, ChevronLeft, Calendar,
  Shield, Train, FileText, Landmark, MapPin, Download, Users,
  CheckCircle2, BookMarked, Laptop, GraduationCap, Loader2, Trophy
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { categoryInfo } from './governmentExamsData';
import { CategoryType } from './types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface StudyPhase {
  week: string;
  title: string;
  subjects: string[];
  focus: string;
}

interface Resource {
  type: string;
  name: string;
  priority: string;
}

interface StudyPlan {
  id: string;
  category: string;
  exam_name: string;
  title: string;
  description: string;
  duration_weeks: number;
  difficulty: string;
  daily_hours: number;
  phases: StudyPhase[];
  resources: Resource[];
  followers_count: number;
}

interface PhaseProgress {
  [planId: string]: {
    [phaseIndex: number]: boolean;
  };
}

export const GovtStudyPlans = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [followedPlans, setFollowedPlans] = useState<string[]>(() => {
    const stored = localStorage.getItem('govt_followed_plans');
    return stored ? JSON.parse(stored) : [];
  });
  const [phaseProgress, setPhaseProgress] = useState<PhaseProgress>(() => {
    const stored = localStorage.getItem('govt_phase_progress');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    fetchStudyPlans();
  }, []);

  const fetchStudyPlans = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('govt_study_plans')
      .select('*')
      .order('followers_count', { ascending: false });

    if (!error && data) {
      setStudyPlans(data.map(plan => ({
        ...plan,
        phases: (plan.phases as unknown) as StudyPhase[],
        resources: (plan.resources as unknown) as Resource[]
      })));
    }
    setIsLoading(false);
  };

  const toggleFollow = (planId: string) => {
    setFollowedPlans(prev => {
      const updated = prev.includes(planId)
        ? prev.filter(id => id !== planId)
        : [...prev, planId];
      localStorage.setItem('govt_followed_plans', JSON.stringify(updated));
      return updated;
    });
  };

  const togglePhaseComplete = (planId: string, phaseIndex: number) => {
    setPhaseProgress(prev => {
      const planProgress = prev[planId] || {};
      const updated = {
        ...prev,
        [planId]: {
          ...planProgress,
          [phaseIndex]: !planProgress[phaseIndex]
        }
      };
      localStorage.setItem('govt_phase_progress', JSON.stringify(updated));
      
      // Check if all phases are completed
      const plan = studyPlans.find(p => p.id === planId);
      if (plan) {
        const completedCount = Object.values(updated[planId] || {}).filter(Boolean).length;
        if (completedCount === plan.phases.length) {
          toast.success(language === 'ta' ? '🎉 வாழ்த்துக்கள்! திட்டம் நிறைவடைந்தது!' : '🎉 Congratulations! Plan completed!');
        }
      }
      
      return updated;
    });
  };

  const getPlanProgress = (planId: string, totalPhases: number): number => {
    const planProgress = phaseProgress[planId] || {};
    const completed = Object.values(planProgress).filter(Boolean).length;
    return totalPhases > 0 ? Math.round((completed / totalPhases) * 100) : 0;
  };

  const isPhaseCompleted = (planId: string, phaseIndex: number): boolean => {
    return phaseProgress[planId]?.[phaseIndex] || false;
  };

  const resetPlanProgress = (planId: string) => {
    setPhaseProgress(prev => {
      const updated = { ...prev };
      delete updated[planId];
      localStorage.setItem('govt_phase_progress', JSON.stringify(updated));
      return updated;
    });
    toast.success(language === 'ta' ? 'முன்னேற்றம் மீட்டமைக்கப்பட்டது!' : 'Progress reset successfully!');
  };

  const filteredPlans = studyPlans.filter(
    plan => selectedCategory === 'all' || plan.category === selectedCategory
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'defence': return Shield;
      case 'railway': return Train;
      case 'ssc': return FileText;
      case 'banking': return Landmark;
      case 'state': return MapPin;
      default: return BookOpen;
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'book': return BookMarked;
      case 'online': return Laptop;
      case 'app': return Laptop;
      case 'practice': return Target;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700 border-green-300';
      case 'intermediate': return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  if (selectedPlan) {
    return (
      <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" onClick={() => setSelectedPlan(null)}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              {language === 'ta' ? 'திரும்பு' : 'Back'}
            </Button>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl mb-2">{selectedPlan.title}</CardTitle>
              <p className="text-gray-600 text-sm">{selectedPlan.description}</p>
            </div>
            <Badge className={getDifficultyColor(selectedPlan.difficulty)}>
              {selectedPlan.difficulty}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              {selectedPlan.duration_weeks} {language === 'ta' ? 'வாரங்கள்' : 'weeks'}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              {selectedPlan.daily_hours} {language === 'ta' ? 'மணி/நாள்' : 'hrs/day'}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              {selectedPlan.followers_count} {language === 'ta' ? 'பின்தொடர்வோர்' : 'followers'}
            </div>
          </div>
          
          {/* Progress Tracker */}
          <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                {language === 'ta' ? 'உங்கள் முன்னேற்றம்' : 'Your Progress'}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-indigo-600">
                  {getPlanProgress(selectedPlan.id, selectedPlan.phases.length)}%
                </span>
                {getPlanProgress(selectedPlan.id, selectedPlan.phases.length) > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => resetPlanProgress(selectedPlan.id)}
                    className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 h-7 px-2"
                  >
                    {language === 'ta' ? 'மீட்டமை' : 'Reset'}
                  </Button>
                )}
              </div>
            </div>
            <Progress 
              value={getPlanProgress(selectedPlan.id, selectedPlan.phases.length)} 
              className="h-3 mb-2"
            />
            <p className="text-xs text-gray-500">
              {Object.values(phaseProgress[selectedPlan.id] || {}).filter(Boolean).length} / {selectedPlan.phases.length}{' '}
              {language === 'ta' ? 'கட்டங்கள் நிறைவு' : 'phases completed'}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {/* Study Phases */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-indigo-600" />
              {language === 'ta' ? 'படிப்பு கட்டங்கள்' : 'Study Phases'}
            </h3>
            <div className="space-y-4">
              {selectedPlan.phases.map((phase, index) => {
                const completed = isPhaseCompleted(selectedPlan.id, index);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-xl p-4 border-2 transition-all ${
                      completed 
                        ? 'bg-green-50 border-green-300' 
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center text-white ${
                        completed
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                          : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                      }`}>
                        <span className="text-xs">Week</span>
                        <span className="font-bold">{phase.week}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${completed ? 'text-green-800' : 'text-gray-800'}`}>
                          {phase.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">{phase.focus}</p>
                        <div className="flex flex-wrap gap-1">
                          {phase.subjects.map((subject, i) => (
                            <Badge 
                              key={i} 
                              variant="outline" 
                              className={`text-xs ${completed ? 'border-green-300 text-green-700' : ''}`}
                            >
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={completed}
                          onCheckedChange={() => togglePhaseComplete(selectedPlan.id, index)}
                          className="h-6 w-6 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Resources */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BookMarked className="h-5 w-5 text-indigo-600" />
              {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட வளங்கள்' : 'Recommended Resources'}
            </h3>
            <div className="grid gap-3">
              {selectedPlan.resources.map((resource, index) => {
                const Icon = getResourceIcon(resource.type);
                return (
                  <div
                    key={index}
                    className={`p-3 rounded-xl border ${
                      resource.priority === 'essential'
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${
                        resource.priority === 'essential' ? 'text-green-600' : 'text-gray-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-800">{resource.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{resource.type}</p>
                      </div>
                      <Badge className={
                        resource.priority === 'essential'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }>
                        {resource.priority}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Button
            onClick={() => toggleFollow(selectedPlan.id)}
            className={`w-full gap-2 ${
              followedPlans.includes(selectedPlan.id)
                ? 'bg-green-600 hover:bg-green-700'
                : ''
            }`}
          >
            {followedPlans.includes(selectedPlan.id) ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                {language === 'ta' ? 'பின்தொடர்கிறது' : 'Following'}
              </>
            ) : (
              <>
                <GraduationCap className="h-4 w-4" />
                {language === 'ta' ? 'இந்த திட்டத்தைப் பின்தொடரவும்' : 'Follow This Plan'}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          {language === 'ta' ? 'தேர்வு படிப்பு திட்டங்கள்' : 'Exam Study Plans'}
        </CardTitle>
        <p className="text-gray-600 text-sm mt-1">
          {language === 'ta'
            ? 'வல்லுநர்களால் வடிவமைக்கப்பட்ட படிப்பு திட்டங்களைப் பின்பற்றுங்கள்'
            : 'Follow expert-designed study plans for systematic preparation'}
        </p>
      </CardHeader>
      <CardContent>
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            size="sm"
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
          >
            {language === 'ta' ? 'அனைத்தும்' : 'All'}
          </Button>
          {Object.entries(categoryInfo).map(([key, info]) => (
            <Button
              key={key}
              size="sm"
              variant={selectedCategory === key ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(key as CategoryType)}
              className="gap-1"
            >
              <span>{info.emoji}</span>
              {info.label.split(' ')[0]}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="space-y-4 pr-4">
              {filteredPlans.map((plan) => {
                const Icon = getCategoryIcon(plan.category);
                const info = categoryInfo[plan.category as CategoryType];
                const isFollowed = followedPlans.includes(plan.id);
                const progress = getPlanProgress(plan.id, plan.phases.length);

                return (
                  <motion.div
                    key={plan.id}
                    whileHover={{ scale: 1.01 }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isFollowed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white border-gray-200 hover:border-indigo-200'
                    }`}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${info?.bgColor || 'bg-gray-100'}`}>
                        <Icon className="h-6 w-6 text-gray-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-800 truncate">{plan.title}</h4>
                          {isFollowed && (
                            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{plan.exam_name}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className={getDifficultyColor(plan.difficulty)}>
                            {plan.difficulty}
                          </Badge>
                          <Badge variant="outline" className="gap-1">
                            <Calendar className="h-3 w-3" />
                            {plan.duration_weeks} weeks
                          </Badge>
                          <Badge variant="outline" className="gap-1">
                            <Clock className="h-3 w-3" />
                            {plan.daily_hours} hrs/day
                          </Badge>
                        </div>
                        {/* Progress Bar for followed plans */}
                        {isFollowed && progress > 0 && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                              <span>{language === 'ta' ? 'முன்னேற்றம்' : 'Progress'}</span>
                              <span className="font-medium text-green-600">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                        )}
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
