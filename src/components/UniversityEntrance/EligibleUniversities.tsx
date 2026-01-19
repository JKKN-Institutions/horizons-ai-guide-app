import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  GraduationCap, 
  MapPin, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  School,
  FileText,
  Sparkles,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  StudentProfile, 
  EligibilityResult, 
  EligibleCourseResult,
  communityLabels,
  streamLabels 
} from './eligibilityTypes';

interface EligibleUniversitiesProps {
  profile: StudentProfile;
  results: EligibilityResult[];
  onReset: () => void;
}

const ChanceBadge = ({ level }: { level: 'High' | 'Medium' | 'Low' }) => {
  const config = {
    High: { bg: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', icon: '🎯', label: 'High Chance' },
    Medium: { bg: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400', icon: '⚡', label: 'Medium Chance' },
    Low: { bg: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', icon: '⚠️', label: 'Low Chance' },
  };
  
  return (
    <Badge variant="outline" className={cn('text-xs', config[level].bg)}>
      {config[level].icon} {config[level].label}
    </Badge>
  );
};

const CourseCard = ({ course, onViewDetails }: { course: EligibleCourseResult; onViewDetails: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        'p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer',
        course.eligibilityStatus === 'eligible' ? 'border-green-200 bg-green-50/50 dark:bg-green-950/20' :
        course.eligibilityStatus === 'borderline' ? 'border-yellow-200 bg-yellow-50/50 dark:bg-yellow-950/20' :
        'border-red-200 bg-red-50/50 dark:bg-red-950/20'
      )}
      onClick={onViewDetails}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-xs">
              {course.courseType}
            </Badge>
            <ChanceBadge level={course.chanceLevel} />
          </div>
          
          <h4 className="font-semibold text-foreground">{course.courseName}</h4>
          <p className="text-sm text-muted-foreground font-tamil">{course.courseNameTamil}</p>
          
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <School className="h-3 w-3" />
              {course.admissionMode}
            </span>
            
            {course.yourCutoff !== undefined && (
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Your Cutoff: <strong>{course.yourCutoff}</strong>
                {course.requiredCutoff && ` / ${course.requiredCutoff} req.`}
              </span>
            )}
          </div>
          
          {course.reasons.length > 0 && course.eligibilityStatus !== 'eligible' && (
            <div className="mt-2 text-xs text-orange-600 dark:text-orange-400">
              ⚠️ {course.reasons[0]}
            </div>
          )}
        </div>
        
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </motion.div>
  );
};

export const EligibleUniversities = ({ profile, results, onReset }: EligibleUniversitiesProps) => {
  const navigate = useNavigate();
  const [expandedUniversity, setExpandedUniversity] = useState<string | null>(
    results.length > 0 ? results[0].universityId : null
  );
  const [filter, setFilter] = useState<'all' | 'high' | 'medium'>('all');

  const totalEligibleCourses = results.reduce((sum, r) => sum + r.eligibleCourses.length, 0);
  const highChanceCourses = results.reduce(
    (sum, r) => sum + r.eligibleCourses.filter(c => c.chanceLevel === 'High').length, 
    0
  );

  const filteredResults = results.map(result => ({
    ...result,
    eligibleCourses: result.eligibleCourses.filter(course => {
      if (filter === 'all') return true;
      if (filter === 'high') return course.chanceLevel === 'High';
      if (filter === 'medium') return course.chanceLevel === 'High' || course.chanceLevel === 'Medium';
      return true;
    })
  })).filter(result => result.eligibleCourses.length > 0);

  return (
    <div className="space-y-6">
      {/* Profile Summary Card */}
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Your Eligibility Results
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {streamLabels[profile.stream].en} • {communityLabels[profile.community].en}
              </p>
            </div>
            
            <div className="flex gap-4 text-center">
              <div className="px-4 py-2 bg-background rounded-lg border">
                <p className="text-2xl font-bold text-primary">{filteredResults.length}</p>
                <p className="text-xs text-muted-foreground">Universities</p>
              </div>
              <div className="px-4 py-2 bg-background rounded-lg border">
                <p className="text-2xl font-bold text-green-600">{totalEligibleCourses}</p>
                <p className="text-xs text-muted-foreground">Courses</p>
              </div>
              <div className="px-4 py-2 bg-background rounded-lg border">
                <p className="text-2xl font-bold text-blue-600">{highChanceCourses}</p>
                <p className="text-xs text-muted-foreground">High Chance</p>
              </div>
            </div>
          </div>
          
          {/* Cutoff Summary */}
          <div className="mt-4 flex flex-wrap gap-4">
            {profile.engineeringCutoff > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Engineering Cutoff:</span>
                <Badge variant="secondary" className="font-mono">
                  {profile.engineeringCutoff} / 200
                </Badge>
              </div>
            )}
            {profile.medicalCutoff > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Medical Cutoff:</span>
                <Badge variant="secondary" className="font-mono">
                  {profile.medicalCutoff} / 200
                </Badge>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" onClick={onReset}>
              🔄 Recalculate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filter Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Filter:</span>
        {(['all', 'high', 'medium'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f === 'all' && '📚 All Courses'}
            {f === 'high' && '🎯 High Chance Only'}
            {f === 'medium' && '⚡ Medium+ Chance'}
          </Button>
        ))}
      </div>

      {/* Results List */}
      {filteredResults.length === 0 ? (
        <Card className="text-center p-8">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Eligible Courses Found</h3>
          <p className="text-muted-foreground mb-4">
            Based on your marks and stream, we couldn't find matching courses with the current filter.
          </p>
          <Button variant="outline" onClick={() => setFilter('all')}>
            Show All Results
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredResults.map((result, index) => (
            <motion.div
              key={result.universityId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Collapsible
                open={expandedUniversity === result.universityId}
                onOpenChange={(open) => setExpandedUniversity(open ? result.universityId : null)}
              >
                <Card className="overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* University Logo */}
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                            style={{ backgroundColor: result.logoColor }}
                          >
                            {result.universityLogo ? (
                              <img 
                                src={result.universityLogo} 
                                alt={result.universityName}
                                className="w-full h-full object-contain rounded-lg"
                              />
                            ) : (
                              result.universityName.charAt(0)
                            )}
                          </div>
                          
                          <div>
                            <CardTitle className="text-lg">{result.universityName}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="font-tamil">{result.universityNameTamil}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {result.universityLocation}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="text-sm">
                            {result.eligibleCourses.length} courses
                          </Badge>
                          <ChevronDown className={cn(
                            'h-5 w-5 transition-transform',
                            expandedUniversity === result.universityId && 'rotate-180'
                          )} />
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-4">
                      <div className="space-y-3">
                        {result.eligibleCourses.map((course) => (
                          <CourseCard 
                            key={course.courseId} 
                            course={course}
                            onViewDetails={() => navigate(`/tn-university-entrance/${result.universityId}/${course.courseId}`)}
                          />
                        ))}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={() => navigate(`/tn-university-entrance/${result.universityId}`)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View University Details
                      </Button>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
