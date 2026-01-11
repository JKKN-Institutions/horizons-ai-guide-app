import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Download, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface ScheduleDay {
  day: number;
  date: string;
  topics: {
    topicId: string;
    topicName: string;
    subject: string;
    hoursAllocated: number;
    keyAreas: string[];
  }[];
  totalHours: number;
}

interface StudyPlanCalendarProps {
  language: 'en' | 'ta';
  schedule: ScheduleDay[];
  examName: string;
  studyTime: string;
}

const getSubjectColor = (subject: string) => {
  if (subject === 'Physics') return 'bg-blue-100 text-blue-700 border-blue-200';
  if (subject === 'Chemistry') return 'bg-purple-100 text-purple-700 border-purple-200';
  if (subject === 'Biology') return 'bg-green-100 text-green-700 border-green-200';
  if (subject === 'Mathematics') return 'bg-orange-100 text-orange-700 border-orange-200';
  return 'bg-gray-100 text-gray-700 border-gray-200';
};

const getSubjectBgColor = (subject: string) => {
  if (subject === 'Physics') return 'bg-blue-50 border-blue-200';
  if (subject === 'Chemistry') return 'bg-purple-50 border-purple-200';
  if (subject === 'Biology') return 'bg-green-50 border-green-200';
  if (subject === 'Mathematics') return 'bg-orange-50 border-orange-200';
  return 'bg-gray-50 border-gray-200';
};

// Parse date string like "Sat, Jan 11" to Date object
const parseDateString = (dateStr: string, baseDate: Date): Date => {
  const parts = dateStr.replace(',', '').split(' ');
  const month = parts[1];
  const day = parseInt(parts[2]);
  
  const monthMap: Record<string, number> = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  
  const result = new Date(baseDate.getFullYear(), monthMap[month] || 0, day);
  // If the resulting date is in the past, it's likely next year
  if (result < baseDate && result.getMonth() < baseDate.getMonth()) {
    result.setFullYear(baseDate.getFullYear() + 1);
  }
  return result;
};

// Generate .ics file content
const generateICSContent = (
  schedule: ScheduleDay[], 
  examName: string, 
  studyTime: string
): string => {
  const today = new Date();
  const [hours, minutes] = studyTime.split(':').map(Number);
  
  let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//PYQ Practice//Study Planner//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${examName} Study Plan
X-WR-TIMEZONE:Asia/Kolkata
`;

  schedule.forEach((day) => {
    const eventDate = parseDateString(day.date, today);
    eventDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(eventDate);
    endDate.setHours(eventDate.getHours() + Math.ceil(day.totalHours));
    
    const topicsList = day.topics.map(t => `${t.topicName} (${t.hoursAllocated}h)`).join(', ');
    const keyAreasList = day.topics.flatMap(t => t.keyAreas).join(', ');
    
    const formatDate = (d: Date) => {
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const uid = `study-plan-day-${day.day}-${Date.now()}@pyqpractice`;
    
    icsContent += `BEGIN:VEVENT
DTSTART:${formatDate(eventDate)}
DTEND:${formatDate(endDate)}
DTSTAMP:${formatDate(new Date())}
UID:${uid}
SUMMARY:📚 Day ${day.day}: ${examName} Study Session
DESCRIPTION:Topics: ${topicsList}\\n\\nKey Areas: ${keyAreasList}\\n\\nTotal Hours: ${day.totalHours}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Study session reminder
TRIGGER:-PT15M
END:VALARM
END:VEVENT
`;
  });

  icsContent += 'END:VCALENDAR';
  return icsContent;
};

// Generate Google Calendar URL
const generateGoogleCalendarUrl = (
  day: ScheduleDay,
  examName: string,
  studyTime: string
): string => {
  const today = new Date();
  const [hours, minutes] = studyTime.split(':').map(Number);
  
  const eventDate = parseDateString(day.date, today);
  eventDate.setHours(hours, minutes, 0, 0);
  
  const endDate = new Date(eventDate);
  endDate.setHours(eventDate.getHours() + Math.ceil(day.totalHours));
  
  const formatForGoogle = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  const topicsList = day.topics.map(t => `${t.topicName} (${t.hoursAllocated}h)`).join(', ');
  const keyAreasList = day.topics.flatMap(t => t.keyAreas).join(', ');
  
  const title = encodeURIComponent(`📚 Day ${day.day}: ${examName} Study Session`);
  const details = encodeURIComponent(`Topics: ${topicsList}\n\nKey Areas: ${keyAreasList}\n\nTotal Hours: ${day.totalHours}`);
  const dates = `${formatForGoogle(eventDate)}/${formatForGoogle(endDate)}`;
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dates}`;
};

export const StudyPlanCalendar: React.FC<StudyPlanCalendarProps> = ({
  language,
  schedule,
  examName,
  studyTime
}) => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState<ScheduleDay | null>(null);
  
  // Group schedule by weeks
  const weeklySchedule = useMemo(() => {
    const weeks: ScheduleDay[][] = [];
    for (let i = 0; i < schedule.length; i += 7) {
      weeks.push(schedule.slice(i, i + 7));
    }
    return weeks;
  }, [schedule]);

  const currentWeekSchedule = weeklySchedule[currentWeek] || [];
  const totalWeeks = weeklySchedule.length;

  const handleExportICS = () => {
    const icsContent = generateICSContent(schedule, examName, studyTime);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${examName.replace(/\s+/g, '-').toLowerCase()}-study-plan.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success(language === 'en' 
      ? 'Calendar file downloaded! Import it to your calendar app.' 
      : 'காலெண்டர் கோப்பு பதிவிறக்கப்பட்டது!'
    );
  };

  const handleExportAllToGoogle = () => {
    // Open all events in new tabs (limited to prevent popup blocking)
    const eventsToOpen = schedule.slice(0, 5); // First 5 events
    eventsToOpen.forEach((day, index) => {
      setTimeout(() => {
        window.open(generateGoogleCalendarUrl(day, examName, studyTime), '_blank');
      }, index * 500);
    });
    
    if (schedule.length > 5) {
      toast.info(language === 'en' 
        ? `Opened first 5 events. Download .ics file for all ${schedule.length} events.`
        : `முதல் 5 நிகழ்வுகள் திறக்கப்பட்டன. அனைத்து ${schedule.length} நிகழ்வுகளுக்கும் .ics கோப்பைப் பதிவிறக்கவும்.`
      );
    }
  };

  const handleAddToGoogle = (day: ScheduleDay) => {
    window.open(generateGoogleCalendarUrl(day, examName, studyTime), '_blank');
    toast.success(language === 'en' ? 'Opening Google Calendar...' : 'Google Calendar திறக்கிறது...');
  };

  if (schedule.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6 border-2 border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-indigo-600" />
            {language === 'en' ? 'Calendar View' : 'காலெண்டர் காட்சி'}
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportICS}
              className="text-xs"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              {language === 'en' ? 'Export .ics' : '.ics ஏற்றுமதி'}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportAllToGoogle}
              className="text-xs bg-white hover:bg-red-50 border-red-200 text-red-600 hover:text-red-700"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              {language === 'en' ? 'Add to Google Calendar' : 'Google Calendar-ல் சேர்'}
            </Button>
          </div>
        </div>
        
        {/* Week Navigation */}
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
            disabled={currentWeek === 0}
          >
            <ChevronLeft className="w-4 h-4" />
            {language === 'en' ? 'Previous' : 'முந்தைய'}
          </Button>
          <span className="text-sm font-medium text-muted-foreground">
            {language === 'en' ? `Week ${currentWeek + 1} of ${totalWeeks}` : `வாரம் ${currentWeek + 1} / ${totalWeeks}`}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentWeek(Math.min(totalWeeks - 1, currentWeek + 1))}
            disabled={currentWeek === totalWeeks - 1}
          >
            {language === 'en' ? 'Next' : 'அடுத்த'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
          
          {/* Week Days */}
          {currentWeekSchedule.map((day) => {
            const dayName = day.date.split(',')[0];
            const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(dayName);
            const primarySubject = day.topics[0]?.subject || '';
            
            return (
              <Dialog key={day.day}>
                <DialogTrigger asChild>
                  <button
                    className={`relative p-2 min-h-[100px] rounded-lg border-2 transition-all hover:shadow-md cursor-pointer ${getSubjectBgColor(primarySubject)}`}
                    onClick={() => setSelectedDay(day)}
                  >
                    <div className="text-xs font-medium text-muted-foreground mb-1">
                      {day.date.split(', ')[1]}
                    </div>
                    <div className="space-y-1">
                      {day.topics.slice(0, 2).map((topic, idx) => (
                        <div 
                          key={idx}
                          className={`text-xs px-1.5 py-0.5 rounded truncate ${getSubjectColor(topic.subject)}`}
                        >
                          {topic.topicName.length > 12 ? topic.topicName.substring(0, 12) + '...' : topic.topicName}
                        </div>
                      ))}
                      {day.topics.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{day.topics.length - 2} more
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-1 right-1 text-[10px] font-medium text-muted-foreground">
                      {day.totalHours}h
                    </div>
                  </button>
                </DialogTrigger>
                
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-indigo-600" />
                      {language === 'en' ? `Day ${day.day}: ${day.date}` : `நாள் ${day.day}: ${day.date}`}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                      <span className="text-sm font-medium">
                        {language === 'en' ? 'Total Study Time' : 'மொத்த படிப்பு நேரம்'}
                      </span>
                      <Badge className="bg-indigo-100 text-indigo-700">
                        {day.totalHours} {language === 'en' ? 'hours' : 'மணி'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">
                        {language === 'en' ? 'Topics to Study' : 'படிக்க வேண்டிய தலைப்புகள்'}
                      </h4>
                      {day.topics.map((topic, idx) => (
                        <div key={idx} className={`p-3 rounded-lg border ${getSubjectBgColor(topic.subject)}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{topic.topicName}</span>
                            <Badge variant="outline" className={getSubjectColor(topic.subject)}>
                              {topic.hoursAllocated}h
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {topic.keyAreas.map((area, areaIdx) => (
                              <span key={areaIdx} className="text-xs px-2 py-0.5 bg-white/50 rounded">
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                      onClick={() => handleAddToGoogle(day)}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {language === 'en' ? 'Add to Google Calendar' : 'Google Calendar-ல் சேர்'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
          
          {/* Fill empty cells for proper grid alignment */}
          {currentWeekSchedule.length < 7 && 
            Array.from({ length: 7 - currentWeekSchedule.length }).map((_, idx) => (
              <div key={`empty-${idx}`} className="min-h-[100px] rounded-lg border-2 border-dashed border-muted/50" />
            ))
          }
        </div>
        
        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-muted/30">
          <div className="flex flex-wrap gap-3 justify-center text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-blue-100 border border-blue-200" />
              <span>Physics</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-purple-100 border border-purple-200" />
              <span>Chemistry</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-green-100 border border-green-200" />
              <span>Biology</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-orange-100 border border-orange-200" />
              <span>Mathematics</span>
            </div>
          </div>
        </div>
        
        {/* Integration Info */}
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">
                {language === 'en' ? 'Calendar Integration' : 'காலெண்டர் ஒருங்கிணைப்பு'}
              </p>
              <p>
                {language === 'en' 
                  ? 'Export as .ics file to import into Apple Calendar, Outlook, or any calendar app. Or add events directly to Google Calendar.'
                  : '.ics கோப்பாக ஏற்றுமதி செய்து Apple Calendar, Outlook அல்லது எந்த காலெண்டர் பயன்பாட்டிலும் இறக்குமதி செய்யவும்.'
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
