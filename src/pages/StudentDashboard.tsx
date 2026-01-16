import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, User, HelpCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  DashboardProgressCard,
  DashboardSavedItems,
  DashboardQuickActions,
  DashboardRecommendations,
  DashboardUpcomingExams,
} from '@/components/Dashboard';

const StudentDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState<string>('Student');
  const [assessmentProgress, setAssessmentProgress] = useState<{
    completedAssessments: number;
    totalPracticeQuestions: number;
  }>({ completedAssessments: 0, totalPracticeQuestions: 0 });

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

      if (attempts) {
        setAssessmentProgress({
          completedAssessments: attempts.filter(a => a.completed_at).length,
          totalPracticeQuestions: 0, // Would be fetched from practice history in production
        });
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold">Welcome, {displayName}!</h1>
                <p className="text-sm text-muted-foreground font-tamil">வணக்கம், {displayName}!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Progress & Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Card */}
            <DashboardProgressCard 
              completedAssessments={assessmentProgress.completedAssessments}
              totalPracticeQuestions={assessmentProgress.totalPracticeQuestions}
            />

            {/* Quick Actions */}
            <DashboardQuickActions />

            {/* Recommendations */}
            <DashboardRecommendations />
          </div>

          {/* Right Column - Saved Items & Upcoming */}
          <div className="space-y-6">
            {/* Saved Items */}
            <DashboardSavedItems />

            {/* Upcoming Exams */}
            <DashboardUpcomingExams />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
