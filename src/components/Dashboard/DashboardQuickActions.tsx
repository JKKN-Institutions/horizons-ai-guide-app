import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  Building2, 
  MessageCircle, 
  FileQuestion, 
  TrendingUp, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const DashboardQuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: Brain,
      label: 'Career Assessment',
      labelTamil: 'தொழில் மதிப்பீடு',
      description: 'Discover your ideal career path',
      path: '/career-assessment/12th-learners',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20 hover:bg-purple-100 dark:hover:bg-purple-950/40',
    },
    {
      icon: Sparkles,
      label: 'AI Career Predictor',
      labelTamil: 'AI தொழில் கணிப்பான்',
      description: 'Get personalized course recommendations',
      path: '/career-assessment/ai-predictor',
      color: 'text-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20 hover:bg-amber-100 dark:hover:bg-amber-950/40',
    },
    {
      icon: Building2,
      label: 'College Search',
      labelTamil: 'கல்லூரி தேடல்',
      description: 'Find colleges in Tamil Nadu',
      path: '/career-assessment/colleges',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-950/40',
    },
    {
      icon: FileQuestion,
      label: 'PYQ Practice',
      labelTamil: 'முந்தைய ஆண்டு கேள்விகள்',
      description: 'Practice with previous year questions',
      path: '/career-assessment/pyq-practice',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 dark:hover:bg-emerald-950/40',
    },
    {
      icon: TrendingUp,
      label: 'Industry Trends',
      labelTamil: 'தொழில்துறை போக்குகள்',
      description: 'Explore job market insights',
      path: '/career-assessment/industry-trends',
      color: 'text-rose-500',
      bgColor: 'bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/40',
    },
    {
      icon: Calendar,
      label: 'Exam Calendar',
      labelTamil: 'தேர்வு காலண்டர்',
      description: 'Track important exam dates',
      path: '/tn-university-entrance/exam-calendar',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/20 hover:bg-cyan-100 dark:hover:bg-cyan-950/40',
    },
  ];

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Quick Actions
          <span className="text-sm font-normal text-muted-foreground font-tamil ml-auto">
            விரைவு செயல்கள்
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className={`${action.bgColor} rounded-lg p-4 text-left transition-all group`}
            >
              <action.icon className={`h-6 w-6 ${action.color} mb-2`} />
              <p className="font-medium text-sm">{action.label}</p>
              <p className="text-[10px] text-muted-foreground font-tamil">{action.labelTamil}</p>
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                <span className="hidden md:inline">{action.description}</span>
                <ArrowRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardQuickActions;
