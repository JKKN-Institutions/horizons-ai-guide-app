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
  borderColor: string;
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
      icon: <GraduationCap className="h-12 w-12 text-fresh-green-medium" />,
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
      buttonText: 'Start Assessment',
      borderColor: 'border-l-fresh-green-medium'
    },
    {
      id: 'college-search',
      icon: <Building2 className="h-12 w-12 text-blue-600" />,
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
      buttonText: 'Explore Colleges',
      borderColor: 'border-l-blue-500'
    },
    {
      id: 'ai-chat',
      icon: <MessageCircle className="h-12 w-12 text-fresh-gold-dark" />,
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
      buttonText: 'Start Chat',
      borderColor: 'border-l-fresh-gold-dark'
    }
  ];

  return (
    <div className="fresh-page-wrapper">
      {/* Header */}
      <header className="fresh-page-header">
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-fresh-gold-dark to-fresh-gold-medium flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-white">JKKN AI Horizons</h1>
                <p className="text-sm text-white/80">Career Discovery Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Need Help?
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-fresh-green-dark mb-2">
            Welcome, {displayName}! 👋
          </h2>
          <p className="text-xl fresh-body mb-1">
            Choose your career discovery path
          </p>
          <p className="text-lg fresh-tamil">
            உங்கள் தொழில் கண்டறிதல் பாதையை தேர்வு செய்யுங்கள்
          </p>

          {/* Progress Indicator */}
          {assessmentProgress.hasStarted12th && (
            <div className="mt-4 inline-flex items-center gap-2 fresh-badge-premium px-4 py-2">
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
              className={`fresh-card group cursor-pointer overflow-hidden ${option.borderColor}`}
              onClick={() => navigate(option.link)}
            >
              <CardHeader className="pb-4">
                <div className="mb-4">{option.icon}</div>
                <CardTitle className="text-xl fresh-card-title group-hover:text-fresh-green-medium transition-colors">
                  {option.title}
                </CardTitle>
                <CardDescription className="text-base font-tamil fresh-tamil">
                  {option.titleTamil}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {option.description.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm fresh-body">
                      <span className="text-fresh-gold-dark mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-sm fresh-muted fresh-stat-card p-3">
                  {option.badgeIcon}
                  <span>{option.badge}</span>
                </div>

                <Button 
                  className="w-full btn-fresh-primary"
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
          <p className="fresh-muted mb-4">
            Not sure where to start? Try the 12th Learner Assessment first!
          </p>
          <Button
            variant="link"
            onClick={() => navigate('/')}
            className="text-fresh-green-medium hover:text-fresh-green-dark"
          >
            ← Back to Home
          </Button>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
