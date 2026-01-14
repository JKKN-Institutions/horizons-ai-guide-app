import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, 
  Calendar, 
  Filter, 
  MapPin, 
  Bell,
  CheckCircle2,
  Clock,
  AlertCircle,
  BellPlus,
  BellRing
} from 'lucide-react';
import { universities } from '@/data/university-entrance-data';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useExamReminders } from '@/hooks/useExamReminders';
import ReminderDialog from './ReminderDialog';

interface CalendarEvent {
  universityId: string;
  universityName: string;
  universityNameTamil: string;
  examName: string;
  event: string;
  eventTamil: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  logoColor: string;
}

const ExamCalendar = () => {
  const navigate = useNavigate();
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>(
    universities.map(u => u.id)
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  
  const { reminders, hasReminder, notificationPermission, requestPermission } = useExamReminders();

  // Flatten all events from all universities
  const allEvents = useMemo(() => {
    const events: CalendarEvent[] = [];
    
    universities.forEach(uni => {
      uni.importantDates.forEach(date => {
        events.push({
          universityId: uni.id,
          universityName: uni.name,
          universityNameTamil: uni.nameTamil,
          examName: uni.examName,
          event: date.event,
          eventTamil: date.eventTamil,
          date: date.date,
          status: date.status,
          logoColor: uni.logoColor
        });
      });
    });

    // Sort by date (approximate since dates are strings like "January 2026")
    const monthOrder: Record<string, number> = {
      'January': 1, 'February': 2, 'March': 3, 'April': 4,
      'May': 5, 'June': 6, 'July': 7, 'August': 8,
      'September': 9, 'October': 10, 'November': 11, 'December': 12
    };

    return events.sort((a, b) => {
      const aMonth = Object.keys(monthOrder).find(m => a.date.includes(m)) || '';
      const bMonth = Object.keys(monthOrder).find(m => b.date.includes(m)) || '';
      return (monthOrder[aMonth] || 0) - (monthOrder[bMonth] || 0);
    });
  }, []);

  // Filter events based on selected universities
  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => selectedUniversities.includes(event.universityId));
  }, [allEvents, selectedUniversities]);

  // Group events by month
  const groupedEvents = useMemo(() => {
    const groups: Record<string, CalendarEvent[]> = {};
    
    filteredEvents.forEach(event => {
      // Extract month-year from date string
      const monthMatch = event.date.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s*(\d{4})?/);
      const monthKey = monthMatch ? `${monthMatch[1]} ${monthMatch[2] || '2026'}` : 'Other';
      
      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      groups[monthKey].push(event);
    });

    return groups;
  }, [filteredEvents]);

  const toggleUniversity = (universityId: string) => {
    setSelectedUniversities(prev => 
      prev.includes(universityId)
        ? prev.filter(id => id !== universityId)
        : [...prev, universityId]
    );
  };

  const selectAll = () => {
    setSelectedUniversities(universities.map(u => u.id));
  };

  const clearAll = () => {
    setSelectedUniversities([]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'ongoing':
        return <Clock className="w-4 h-4 text-amber-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'ongoing':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Ongoing</Badge>;
      default:
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Upcoming</Badge>;
    }
  };

  const handleSetReminder = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setReminderDialogOpen(true);
  };

  const activeRemindersCount = reminders.filter(r => r.isActive).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/career-assessment/colleges')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Exam Calendar
              </h1>
              <p className="text-sm text-muted-foreground">தேர்வு நாட்காட்டி</p>
            </div>
            
            {/* My Reminders Button */}
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => navigate('/tn-university-entrance/my-reminders')}
            >
              <Bell className="w-4 h-4" />
              {activeRemindersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeRemindersCount}
                </Badge>
              )}
            </Button>
            
            {/* Filter Button */}
            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                  {selectedUniversities.length < universities.length && (
                    <Badge variant="secondary" className="ml-1">
                      {selectedUniversities.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter by University</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <div className="flex gap-2 mb-4">
                    <Button variant="outline" size="sm" onClick={selectAll}>
                      Select All
                    </Button>
                    <Button variant="outline" size="sm" onClick={clearAll}>
                      Clear All
                    </Button>
                  </div>
                  <ScrollArea className="h-[calc(100vh-200px)]">
                    <div className="space-y-3">
                      {universities.map(uni => (
                        <label
                          key={uni.id}
                          className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors"
                        >
                          <Checkbox
                            checked={selectedUniversities.includes(uni.id)}
                            onCheckedChange={() => toggleUniversity(uni.id)}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
                                style={{ backgroundColor: uni.logoColor }}
                              >
                                {uni.name.charAt(0)}
                              </div>
                              <span className="font-medium text-sm truncate">{uni.name}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              {uni.location}
                              <span className="text-primary">• {uni.examName}</span>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="container max-w-4xl mx-auto px-4 py-4">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {filteredEvents.filter(e => e.status === 'upcoming').length}
              </div>
              <div className="text-xs text-blue-600">Upcoming</div>
            </CardContent>
          </Card>
          <Card className="bg-amber-50 border-amber-100">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-amber-600">
                {filteredEvents.filter(e => e.status === 'ongoing').length}
              </div>
              <div className="text-xs text-amber-600">Ongoing</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-100">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-green-600">
                {filteredEvents.filter(e => e.status === 'completed').length}
              </div>
              <div className="text-xs text-green-600">Completed</div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline View */}
        {Object.keys(groupedEvents).length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No events to show</p>
              <p className="text-sm text-muted-foreground mt-1">
                Select universities from the filter to see their exam dates
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedEvents).map(([month, events]) => (
              <div key={month}>
                {/* Month Header */}
                <div className="sticky top-[73px] z-[5] bg-background py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold">{month}</h2>
                    <Badge variant="secondary">{events.length} events</Badge>
                  </div>
                </div>

                {/* Events List */}
                <div className="ml-5 border-l-2 border-primary/20 pl-6 space-y-3 mt-3">
                  {events.map((event, idx) => {
                    const eventHasReminder = hasReminder(event.universityId, event.event);
                    
                    return (
                      <Card 
                        key={`${event.universityId}-${event.event}-${idx}`}
                        className="cursor-pointer hover:shadow-md transition-shadow relative"
                        onClick={() => navigate(`/tn-university-entrance/${event.universityId}`)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                              {getStatusIcon(event.status)}
                            </div>
                            
                            {/* University Logo */}
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shrink-0"
                              style={{ backgroundColor: event.logoColor }}
                            >
                              {event.universityName.charAt(0)}
                            </div>

                            {/* Event Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h3 className="font-medium">{event.event}</h3>
                                  <p className="text-xs text-muted-foreground">{event.eventTamil}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {eventHasReminder && (
                                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                      <BellRing className="w-3 h-3 mr-1" />
                                      Set
                                    </Badge>
                                  )}
                                  {getStatusBadge(event.status)}
                                </div>
                              </div>
                              
                              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                                <span className="font-medium text-primary">{event.universityName}</span>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-muted-foreground">{event.examName}</span>
                              </div>
                              
                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  <span>{event.date}</span>
                                </div>
                                
                                {event.status !== 'completed' && !eventHasReminder && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-1 text-primary hover:text-primary"
                                    onClick={(e) => handleSetReminder(event, e)}
                                  >
                                    <BellPlus className="w-4 h-4" />
                                    Remind
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Set Reminder CTA */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
          <CardContent className="p-6 text-center">
            <Bell className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Never Miss an Exam Date!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {activeRemindersCount > 0 
                ? `You have ${activeRemindersCount} active reminder${activeRemindersCount > 1 ? 's' : ''}. Manage them anytime.`
                : 'Get notified about application deadlines and exam dates'
              }
            </p>
            <Button 
              className="gap-2"
              onClick={() => navigate('/tn-university-entrance/my-reminders')}
            >
              <Bell className="w-4 h-4" />
              {activeRemindersCount > 0 ? 'Manage Reminders' : 'View My Reminders'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Reminder Dialog */}
      <ReminderDialog
        open={reminderDialogOpen}
        onOpenChange={setReminderDialogOpen}
        eventData={selectedEvent}
      />
    </div>
  );
};

export default ExamCalendar;
