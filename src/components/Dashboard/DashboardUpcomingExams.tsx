import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Bell, ArrowRight, Clock } from 'lucide-react';
import { differenceInDays, format, parseISO } from 'date-fns';

interface ExamEvent {
  id: string;
  name: string;
  nameTamil: string;
  date: string;
  type: 'exam' | 'application' | 'result';
}

const DashboardUpcomingExams = () => {
  const navigate = useNavigate();

  // Upcoming exam events (would come from API/database in production)
  const upcomingEvents: ExamEvent[] = [
    {
      id: '1',
      name: 'JEE Main Session 1',
      nameTamil: 'ஜேஇஇ மெயின் அமர்வு 1',
      date: '2026-01-22',
      type: 'exam',
    },
    {
      id: '2',
      name: 'NEET UG Application',
      nameTamil: 'நீட் UG விண்ணப்பம்',
      date: '2026-02-15',
      type: 'application',
    },
    {
      id: '3',
      name: 'TNEA Counselling',
      nameTamil: 'TNEA கவுன்சிலிங்',
      date: '2026-06-01',
      type: 'application',
    },
    {
      id: '4',
      name: 'JEE Advanced',
      nameTamil: 'ஜேஇஇ அட்வான்ஸ்ட்',
      date: '2026-05-25',
      type: 'exam',
    },
  ];

  // Sort by date and get next 3
  const sortedEvents = [...upcomingEvents]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter(event => new Date(event.date) > new Date())
    .slice(0, 3);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300';
      case 'application':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'result':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getDaysRemaining = (dateStr: string) => {
    const days = differenceInDays(parseISO(dateStr), new Date());
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days < 0) return 'Passed';
    return `${days} days`;
  };

  const getUrgencyClass = (dateStr: string) => {
    const days = differenceInDays(parseISO(dateStr), new Date());
    if (days <= 7) return 'text-rose-500 font-semibold';
    if (days <= 30) return 'text-amber-500 font-medium';
    return 'text-muted-foreground';
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          Upcoming Exams
          <span className="text-sm font-normal text-muted-foreground font-tamil ml-auto">
            வரவிருக்கும் தேர்வுகள்
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedEvents.length === 0 ? (
          <div className="text-center py-6">
            <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">
              No upcoming exams
            </p>
          </div>
        ) : (
          <>
            {sortedEvents.map((event) => (
              <div 
                key={event.id}
                className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer group"
                onClick={() => navigate('/tn-university-entrance/exam-calendar')}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm truncate">{event.name}</p>
                      <Badge className={`${getTypeColor(event.type)} text-[10px] shrink-0`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground font-tamil truncate">
                      {event.nameTamil}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(parseISO(event.date), 'MMM d, yyyy')}
                      </span>
                      <span className={`flex items-center gap-1 ${getUrgencyClass(event.date)}`}>
                        <Clock className="h-3 w-3" />
                        {getDaysRemaining(event.date)}
                      </span>
                    </div>
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/tn-university-entrance/my-reminders');
                    }}
                  >
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/tn-university-entrance/exam-calendar')}
            >
              View Full Calendar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardUpcomingExams;
