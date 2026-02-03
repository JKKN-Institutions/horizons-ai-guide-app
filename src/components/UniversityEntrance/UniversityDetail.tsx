import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Globe, Phone, Mail, Calendar, IndianRupee, GraduationCap, BookOpen, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { universities } from '@/data/university-entrance-data';
import { motion, AnimatePresence } from 'framer-motion';

export const UniversityDetail = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState<'on-campus' | 'dde' | 'affiliated' | 'collaborative' | null>(null);

  const university = universities.find(u => u.id === universityId);

  // Group courses by category
  const coursesByCategory = useMemo(() => {
    if (!university) return { onCampus: [], dde: [], affiliated: [], collaborative: [] };
    
    return {
      onCampus: university.courses.filter(c => c.category === 'On-Campus' || !c.category),
      dde: university.courses.filter(c => c.category === 'DDE'),
      affiliated: university.courses.filter(c => c.category === 'Affiliated'),
      collaborative: university.courses.filter(c => c.category === 'Collaborative')
    };
  }, [university]);

  if (!university) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">University Not Found</h1>
          <p className="text-muted-foreground mb-4">The university you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/career-assessment/colleges')}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'ongoing': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'completed': return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const toggleCategory = (category: 'on-campus' | 'dde' | 'affiliated' | 'collaborative') => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const CourseGrid = ({ courses }: { courses: typeof university.courses }) => {
    // Group by school if available
    const groupedBySchool = useMemo(() => {
      const groups: Record<string, typeof courses> = {};
      courses.forEach(course => {
        const school = course.school || 'General';
        if (!groups[school]) groups[school] = [];
        groups[school].push(course);
      });
      return groups;
    }, [courses]);

    const hasSchools = Object.keys(groupedBySchool).length > 1 || !groupedBySchool['General'];

    if (courses.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground bg-slate-50 dark:bg-slate-900 rounded-xl">
          <p>No courses available in this category.</p>
        </div>
      );
    }

    if (hasSchools) {
      return (
        <div className="space-y-6">
          {Object.entries(groupedBySchool).map(([school, schoolCourses]) => (
            <div key={school}>
              <h3 className="text-md font-semibold text-foreground mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                {school}
                <Badge variant="outline" className="text-xs">{schoolCourses.length}</Badge>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {schoolCourses.map((course) => (
                  <CourseCard key={course.id} course={course} universityId={universityId!} />
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} universityId={universityId!} />
        ))}
      </div>
    );
  };

  const CourseCard = ({ course, universityId }: { course: typeof university.courses[0], universityId: string }) => {
    return (
      <button
        onClick={() => navigate(`/tn-university-entrance/${universityId}/${course.id}`)}
        className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary hover:shadow-lg transition-all text-left group"
      >
        <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs">
            {course.type}
          </Badge>
          {course.duration && (
            <span className="text-xs text-muted-foreground">{course.duration}</span>
          )}
        </div>
        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">
          {course.name}
        </h3>
        <p className="text-xs text-muted-foreground font-tamil mt-1">{course.nameTamil}</p>
        {course.eligibility && (
          <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
            📋 {course.eligibility}
          </p>
        )}
        <p className="text-xs text-primary mt-2">
          {course.previousQuestions?.length ?? 0} PYQs →
        </p>
      </button>
    );
  };

  const CategoryCard = ({ 
    category, 
    count, 
    label, 
    icon: Icon, 
    gradientFrom, 
    gradientTo, 
    borderColor,
    textColor,
    description
  }: { 
    category: 'on-campus' | 'dde' | 'affiliated' | 'collaborative';
    count: number;
    label: string;
    icon: typeof GraduationCap;
    gradientFrom: string;
    gradientTo: string;
    borderColor: string;
    textColor: string;
    description: string;
  }) => {
    const isExpanded = expandedCategory === category;
    const courses = category === 'on-campus' ? coursesByCategory.onCampus : 
                    category === 'dde' ? coursesByCategory.dde : 
                    category === 'collaborative' ? coursesByCategory.collaborative :
                    coursesByCategory.affiliated;

    if (count === 0) return null;

    return (
      <div className="space-y-3">
        <button
          onClick={() => toggleCategory(category)}
          className={`w-full p-4 rounded-2xl border-2 transition-all ${
            isExpanded 
              ? `${borderColor} shadow-lg` 
              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
          } ${gradientFrom} ${gradientTo}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-white/50 dark:bg-slate-800/50`}>
                <Icon className={`h-5 w-5 ${textColor}`} />
              </div>
              <div className="text-left">
                <p className={`text-2xl font-bold ${textColor}`}>{count}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            </div>
            <div className={`p-2 rounded-full ${isExpanded ? 'bg-white/50' : 'bg-transparent'}`}>
              {isExpanded ? (
                <ChevronUp className={`h-5 w-5 ${textColor}`} />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </div>
          {!isExpanded && (
            <p className="text-xs text-muted-foreground mt-2 text-left">
              Tap to view courses →
            </p>
          )}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Card className={`${borderColor} border`}>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    {description}
                  </p>
                  <CourseGrid courses={courses} />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/tn-university-entrance/browse')}
          className="gap-2 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* University Header */}
        <div className="flex items-start gap-4">
          {university.logo ? (
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shrink-0 bg-white overflow-hidden p-2 shadow-md">
              <img 
                src={university.logo} 
                alt={`${university.name} logo`}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div 
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shrink-0"
              style={{ backgroundColor: university.logoColor }}
            >
              {university.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {university.name}
            </h1>
            <p className="text-muted-foreground font-tamil text-lg">{university.nameTamil}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {university.location}
              </span>
              <a 
                href={`https://${university.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
              >
                <Globe className="h-4 w-4" />
                {university.website}
              </a>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                {university.phone}
              </span>
              {university.email && (
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  {university.email}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Important Dates */}
        {university.importantDates.length > 0 && (
          <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white p-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Important Dates / முக்கிய தேதிகள்
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {university.importantDates.map((date, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        date.status === 'upcoming' ? 'bg-amber-500' :
                        date.status === 'ongoing' ? 'bg-green-500' : 'bg-slate-400'
                      }`} />
                      <div>
                        <p className="font-medium text-foreground">{date.event}</p>
                        <p className="text-xs text-muted-foreground font-tamil">{date.eventTamil}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground text-sm">{date.date}</p>
                      <Badge className={`text-xs ${getStatusColor(date.status)}`}>
                        {date.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Applicable Entrance Exams - Prominently displayed */}
        <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-300 dark:border-emerald-700 rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <BookOpen className="h-5 w-5" />
              Applicable Entrance Exams / நுழைவுத் தேர்வுகள்
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {/* Primary exam for this university */}
              <Badge className="px-4 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white border-0">
                ✅ {university.examName}
              </Badge>
              
              {/* Show additional exams based on university type */}
              {university.type === 'Central Government' && (
                <>
                  {university.examName !== 'CUET-UG' && university.courses.some(c => c.type === 'UG') && (
                    <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-emerald-400 text-emerald-700 dark:text-emerald-400">
                      CUET-UG (for UG courses)
                    </Badge>
                  )}
                  {university.examName !== 'CUET-PG' && university.courses.some(c => c.type === 'PG') && (
                    <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-emerald-400 text-emerald-700 dark:text-emerald-400">
                      CUET-PG (for PG courses)
                    </Badge>
                  )}
                </>
              )}
              
              {/* Merit-based admission indicator */}
              {(university.examName === 'Merit-Based' || university.examName.includes('12th Marks')) && (
                <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-blue-400 text-blue-700 dark:text-blue-400">
                  📋 Based on 12th Marks
                </Badge>
              )}
            </div>
            
            {/* Exam details note */}
            <p className="text-xs text-muted-foreground mt-3">
              💡 நுழைவுத் தேர்வு தேவைகள் பாடநெறியைப் பொறுத்து மாறுபடும். விவரங்களுக்கு கீழே உள்ள பாடநெறிகளைப் பார்க்கவும்.
            </p>
          </CardContent>
        </Card>

        {/* Fee Structure */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <IndianRupee className="h-5 w-5 text-amber-600" />
              <h3 className="font-semibold text-foreground">Application Fee</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600">₹{university.fee.general}</p>
                <p className="text-xs text-muted-foreground">General / OBC</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">₹{university.fee.scst}</p>
                <p className="text-xs text-muted-foreground">SC / ST</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courses - Tap to Expand */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">
            📚 Select Course Category / பாடநெறி வகையைத் தேர்வு செய்க
          </h2>
          
          <div className="space-y-4">
            <CategoryCard 
              category="on-campus"
              count={coursesByCategory.onCampus.length}
              label="On-Campus Programs"
              icon={GraduationCap}
              gradientFrom="bg-gradient-to-br from-purple-50"
              gradientTo="to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20"
              borderColor="border-purple-400 dark:border-purple-600"
              textColor="text-purple-600"
              description="🏛️ On-Campus Programs are offered directly at the university's main campus with regular classroom teaching."
            />

            <CategoryCard 
              category="dde"
              count={coursesByCategory.dde.length}
              label="Distance Education"
              icon={BookOpen}
              gradientFrom="bg-gradient-to-br from-blue-50"
              gradientTo="to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
              borderColor="border-blue-400 dark:border-blue-600"
              textColor="text-blue-600"
              description="📖 Distance Education programs for working professionals who cannot attend regular classes."
            />

            <CategoryCard 
              category="affiliated"
              count={coursesByCategory.affiliated.length}
              label="Affiliated Colleges"
              icon={Building2}
              gradientFrom="bg-gradient-to-br from-green-50"
              gradientTo="to-green-100 dark:from-green-900/20 dark:to-green-800/20"
              borderColor="border-green-400 dark:border-green-600"
              textColor="text-green-600"
              description="🏫 Affiliated College Courses offered at colleges affiliated to this university across Tamil Nadu."
            />

            <CategoryCard 
              category="collaborative"
              count={coursesByCategory.collaborative.length}
              label="Collaborative Programmes"
              icon={Building2}
              gradientFrom="bg-gradient-to-br from-orange-50"
              gradientTo="to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20"
              borderColor="border-orange-400 dark:border-orange-600"
              textColor="text-orange-600"
              description="🤝 Collaborative Programs offered through partner institutes with a University degree."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
