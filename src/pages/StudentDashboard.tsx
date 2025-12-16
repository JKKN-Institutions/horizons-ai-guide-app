import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Building2, MessageCircle, LogOut, User, HelpCircle, ArrowRight, Clock, MapPin, Mic } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DashboardOption {
  id: string;
  icon: React.ReactNode;
  title: string;
  titleTamil: string;
  description: string[];
  badge: string;
  badgeIcon: React.ReactNode;
  link: string;
  buttonText: string;
}

const StudentDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState<string>('Student');
  const [assessmentProgress, setAssessmentProgress] = useState<{
    hasStarted12th: boolean;
    completedAssessments: number;
  }>({ hasStarted12th: false, completedAssessments: 0 });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      // Fetch display name from profiles
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('user_id', user.id)
        .single();

      if (profile?.display_name) {
        setDisplayName(profile.display_name);
      } else if (user.email) {
        setDisplayName(user.email.split('@')[0]);
      }

      // Check for assessment progress
      const { data: attempts } = await supabase
        .from('student_assessment_attempts')
        .select('id, completed_at')
        .eq('user_id', user.id);

      if (attempts && attempts.length > 0) {
        setAssessmentProgress({
          hasStarted12th: true,
          completedAssessments: attempts.filter(a => a.completed_at).length
        });
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const dashboardOptions: DashboardOption[] = [
    {
      id: '12th-assessment',
      icon: <GraduationCap className="h-12 w-12 text-secondary" />,
      title: 'Career Assessment for 12th Students',
      titleTamil: '12-ஆம் வகுப்பு மாணவர்களுக்கான தொழில் மதிப்பீடு',
      description: [
        'Answer 20 personality questions',
        'Discover your interests & strengths',
        'Get personalized course recommendations',
        '50+ courses matched to your profile'
      ],
      badge: '15-20 minutes',
      badgeIcon: <Clock className="h-4 w-4" />,
      link: '/career-assessment/12th-learners',
      buttonText: 'Start Assessment'
    },
    {
      id: 'college-search',
      icon: <Building2 className="h-12 w-12 text-secondary" />,
      title: 'College Search by District',
      titleTamil: 'மாவட்டம் வாரியாக கல்லூரிகளை தேடுங்கள்',
      description: [
        'Search colleges in any Tamil Nadu district',
        'Filter by Government/Aided/Private',
        'Browse by category (Engineering, Medical)',
        'View college details, courses & fees'
      ],
      badge: '38 Districts | 5000+ Colleges',
      badgeIcon: <MapPin className="h-4 w-4" />,
      link: '/career-assessment/colleges',
      buttonText: 'Explore Colleges'
    },
    {
      id: 'ai-chat',
      icon: <MessageCircle className="h-12 w-12 text-secondary" />,
      title: 'Chat with AI Career Counselor',
      titleTamil: 'AI தொழில் ஆலோசகருடன் உரையாடுங்கள்',
      description: [
        'Ask any career-related questions',
        'Get instant guidance and suggestions',
        'Voice input supported',
        'Available 24/7 in Tamil & English'
      ],
      badge: 'Unlimited conversations',
      badgeIcon: <Mic className="h-4 w-4" />,
      link: '/career-assessment/chat',
      buttonText: 'Start Chat'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold">JKKN AI Horizons</h1>
                <p className="text-sm opacity-80">Career Discovery Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Need Help?
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            Welcome, {displayName}! 👋
          </h2>
          <p className="text-xl text-muted-foreground mb-1">
            Choose your career discovery path
          </p>
          <p className="text-lg text-muted-foreground font-tamil">
            உங்கள் தொழில் கண்டறிதல் பாதையை தேர்வு செய்யுங்கள்
          </p>

          {/* Progress Indicator */}
          {assessmentProgress.hasStarted12th && (
            <div className="mt-4 inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full">
              <GraduationCap className="h-4 w-4" />
              <span className="text-sm">
                {assessmentProgress.completedAssessments} assessment{assessmentProgress.completedAssessments !== 1 ? 's' : ''} completed
              </span>
            </div>
          )}
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {dashboardOptions.map((option) => (
            <Card
              key={option.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-l-primary bg-card overflow-hidden"
              onClick={() => navigate(option.link)}
            >
              <CardHeader className="pb-4">
                <div className="mb-4">{option.icon}</div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {option.title}
                </CardTitle>
                <CardDescription className="text-base font-tamil text-muted-foreground">
                  {option.titleTamil}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {option.description.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-secondary mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
                  {option.badgeIcon}
                  <span>{option.badge}</span>
                </div>

                <Button 
                  className="w-full btn-primary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors"
                >
                  {option.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Not sure where to start? Try the 12th Learner Assessment first!
          </p>
          <Button
            variant="link"
            onClick={() => navigate('/')}
            className="text-secondary hover:text-secondary/80"
          >
            ← Back to Home
          </Button>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
