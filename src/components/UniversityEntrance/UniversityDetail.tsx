import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Globe, Phone, Mail, Calendar, IndianRupee, GraduationCap, BookOpen, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { universities } from '@/data/university-entrance-data';

export const UniversityDetail = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const navigate = useNavigate();

  const university = universities.find(u => u.id === universityId);

  // Group courses by category
  const coursesByCategory = useMemo(() => {
    if (!university) return { onCampus: [], dde: [], affiliated: [] };
    
    return {
      onCampus: university.courses.filter(c => c.category === 'On-Campus' || !c.category),
      dde: university.courses.filter(c => c.category === 'DDE'),
      affiliated: university.courses.filter(c => c.category === 'Affiliated')
    };
  }, [university]);

  // Check if university has multiple categories
  const hasMultipleCategories = useMemo(() => {
    const categories = [
      coursesByCategory.onCampus.length > 0,
      coursesByCategory.dde.length > 0,
      coursesByCategory.affiliated.length > 0
    ].filter(Boolean).length;
    return categories > 1;
  }, [coursesByCategory]);

  // Determine default tab
  const defaultTab = useMemo(() => {
    if (coursesByCategory.onCampus.length > 0) return 'on-campus';
    if (coursesByCategory.dde.length > 0) return 'dde';
    if (coursesByCategory.affiliated.length > 0) return 'affiliated';
    return 'on-campus';
  }, [coursesByCategory]);

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
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                {school}
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
    const navigate = useNavigate();
    
    return (
      <button
        onClick={() => navigate(`/tn-university-entrance/${universityId}/${course.id}`)}
        className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-[#6a0dad] hover:shadow-lg hover:shadow-[#6a0dad]/10 transition-all text-left group"
      >
        <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs">
            {course.type}
          </Badge>
          {course.duration && (
            <span className="text-xs text-muted-foreground">{course.duration}</span>
          )}
        </div>
        <h3 className="font-bold text-foreground group-hover:text-[#6a0dad] transition-colors text-sm">
          {course.name}
        </h3>
        <p className="text-xs text-muted-foreground font-tamil mt-1">{course.nameTamil}</p>
        {course.eligibility && (
          <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
            📋 {course.eligibility}
          </p>
        )}
        <p className="text-xs text-primary mt-2">
          {course.previousQuestions.length} PYQs →
        </p>
      </button>
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

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-purple-600">{coursesByCategory.onCampus.length}</p>
              <p className="text-xs text-muted-foreground">On-Campus</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">{coursesByCategory.dde.length}</p>
              <p className="text-xs text-muted-foreground">Distance Ed.</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-green-600">{coursesByCategory.affiliated.length}</p>
              <p className="text-xs text-muted-foreground">Affiliated</p>
            </CardContent>
          </Card>
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
            <CardHeader className="bg-gradient-to-r from-[#6a0dad] to-[#9333ea] text-white p-4">
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

        {/* Courses with Tabs */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">
            📚 Select Course / பாடநெறியைத் தேர்ந்தெடுக்கவும்
          </h2>
          
          {hasMultipleCategories ? (
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger 
                  value="on-campus" 
                  className="flex items-center gap-1 text-xs sm:text-sm"
                  disabled={coursesByCategory.onCampus.length === 0}
                >
                  <GraduationCap className="h-4 w-4 hidden sm:block" />
                  On-Campus
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {coursesByCategory.onCampus.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="dde" 
                  className="flex items-center gap-1 text-xs sm:text-sm"
                  disabled={coursesByCategory.dde.length === 0}
                >
                  <BookOpen className="h-4 w-4 hidden sm:block" />
                  Distance Ed.
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {coursesByCategory.dde.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="affiliated" 
                  className="flex items-center gap-1 text-xs sm:text-sm"
                  disabled={coursesByCategory.affiliated.length === 0}
                >
                  <Building2 className="h-4 w-4 hidden sm:block" />
                  Affiliated
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {coursesByCategory.affiliated.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="on-campus" className="mt-0">
                <Card className="border-purple-200 dark:border-purple-800 mb-4">
                  <CardContent className="p-3">
                    <p className="text-sm text-muted-foreground">
                      🏛️ <strong>On-Campus Programs</strong> are offered directly at the university's main campus with regular classroom teaching.
                    </p>
                  </CardContent>
                </Card>
                <CourseGrid courses={coursesByCategory.onCampus} />
              </TabsContent>

              <TabsContent value="dde" className="mt-0">
                <Card className="border-blue-200 dark:border-blue-800 mb-4">
                  <CardContent className="p-3">
                    <p className="text-sm text-muted-foreground">
                      📖 <strong>Distance Education</strong> programs for working professionals who cannot attend regular classes.
                    </p>
                  </CardContent>
                </Card>
                <CourseGrid courses={coursesByCategory.dde} />
              </TabsContent>

              <TabsContent value="affiliated" className="mt-0">
                <Card className="border-green-200 dark:border-green-800 mb-4">
                  <CardContent className="p-3">
                    <p className="text-sm text-muted-foreground">
                      🏫 <strong>Affiliated College Courses</strong> offered at colleges affiliated to this university across Tamil Nadu.
                    </p>
                  </CardContent>
                </Card>
                <CourseGrid courses={coursesByCategory.affiliated} />
              </TabsContent>
            </Tabs>
          ) : (
            <CourseGrid courses={university.courses} />
          )}
        </div>
      </div>
    </div>
  );
};
