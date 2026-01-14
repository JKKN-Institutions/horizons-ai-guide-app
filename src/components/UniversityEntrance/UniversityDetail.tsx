import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Globe, Phone, Mail, Calendar, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { universities } from '@/data/university-entrance-data';

export const UniversityDetail = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const navigate = useNavigate();

  const university = universities.find(u => u.id === universityId);

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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/career-assessment/colleges')}
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

        {/* Courses */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">
            📚 Select Course / பாடநெறியைத் தேர்ந்தெடுக்கவும்
          </h2>
          {university.courses.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {university.courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => navigate(`/tn-university-entrance/${universityId}/${course.id}`)}
                  className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-[#6a0dad] hover:shadow-lg hover:shadow-[#6a0dad]/10 transition-all text-left group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {course.type}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-foreground group-hover:text-[#6a0dad] transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-tamil">{course.nameTamil}</p>
                  <p className="text-xs text-primary mt-2">
                    {course.previousQuestions.length} PYQs →
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground bg-slate-50 dark:bg-slate-900 rounded-xl">
              <p>Course details coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
