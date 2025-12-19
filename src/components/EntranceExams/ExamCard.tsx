import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EntranceExam } from './types';
import { examCategories, indianStates } from './examData';
import { 
  ExternalLink, 
  Calendar, 
  IndianRupee, 
  Clock, 
  FileText, 
  Bell, 
  Building2,
  BookOpen,
  Users,
  Download,
  Bookmark,
  BookmarkCheck,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ExamCardProps {
  exam: EntranceExam;
  isBookmarked?: boolean;
  onToggleBookmark?: (examId: string) => void;
}

export const ExamCard = ({ exam, isBookmarked = false, onToggleBookmark }: ExamCardProps) => {
  const { toast } = useToast();
  const categoryInfo = examCategories.find(c => c.id === exam.category);
  const stateInfo = exam.state ? indianStates.find(s => s.id === exam.state) : null;

  const handleSetReminder = () => {
    toast({
      title: "Reminder Set! 🔔",
      description: `You'll be notified about ${exam.name} important dates.`,
    });
  };

  const handleDownloadSyllabus = () => {
    if (exam.syllabusUrl) {
      window.open(exam.syllabusUrl, '_blank');
    } else {
      toast({
        title: "Syllabus Download",
        description: `Visit ${exam.officialWebsite} to download the official syllabus.`,
      });
    }
  };

  const handleToggleBookmark = () => {
    if (onToggleBookmark) {
      onToggleBookmark(exam.id);
      toast({
        title: isBookmarked ? "Removed from Saved" : "Saved! ⭐",
        description: isBookmarked 
          ? `${exam.name} removed from your saved exams.`
          : `${exam.name} added to your saved exams.`,
      });
    }
  };

  return (
    <Card className={cn(
      "bg-white border-l-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1",
      categoryInfo?.borderColor
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={cn("text-xs font-medium", categoryInfo?.bgColor, categoryInfo?.color)}>
              {categoryInfo?.icon} {categoryInfo?.label}
            </Badge>
            {stateInfo && stateInfo.id !== 'national' && (
              <Badge variant="outline" className="text-xs bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]">
                <MapPin className="h-3 w-3 mr-1" />
                {stateInfo.shortCode}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                isBookmarked 
                  ? "text-[#F59E0B] hover:text-[#D97706]" 
                  : "text-[#6B7280] hover:text-[#F59E0B]"
              )}
              onClick={handleToggleBookmark}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 fill-current" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </Button>
            <Badge variant="outline" className="text-xs bg-[#FFF8E1] text-[#F59E0B] border-[#FFE082]">
              2025
            </Badge>
          </div>
        </div>
        
        <h3 className="font-bold text-xl mt-3 text-[#1B5E20]">
          {exam.name}
        </h3>
        <p className="text-sm text-[#6B7280]">{exam.fullForm}</p>
        <p className="text-sm text-[#4B5563] flex items-center gap-1 mt-1">
          <Building2 className="h-3 w-3" />
          {exam.conductingBody}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Exam Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#2E7D32]" />
            <div>
              <p className="text-[#6B7280] text-xs">Mode</p>
              <p className="text-[#1F2937] font-medium">{exam.examMode}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#2E7D32]" />
            <div>
              <p className="text-[#6B7280] text-xs">Duration</p>
              <p className="text-[#1F2937] font-medium">{exam.duration}</p>
            </div>
          </div>
        </div>

        {/* Syllabus */}
        <div className="bg-[#E8F5E9] rounded-lg p-3">
          <p className="text-xs font-semibold text-[#1B5E20] mb-2 flex items-center gap-1">
            <BookOpen className="h-3 w-3" /> Syllabus
          </p>
          <div className="flex flex-wrap gap-1">
            {exam.syllabus.slice(0, 4).map((item, idx) => (
              <Badge key={idx} variant="outline" className="text-xs bg-white text-[#374151] border-[#C8E6C9]">
                {item}
              </Badge>
            ))}
            {exam.syllabus.length > 4 && (
              <Badge variant="outline" className="text-xs bg-white text-[#2E7D32] border-[#2E7D32]">
                +{exam.syllabus.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Eligibility */}
        <div className="bg-[#FFF8E1] rounded-lg p-3">
          <p className="text-xs font-semibold text-[#F59E0B] mb-2 flex items-center gap-1">
            <Users className="h-3 w-3" /> Eligibility
          </p>
          <ul className="text-xs text-[#374151] space-y-1">
            {exam.eligibility.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-1">
                <span className="text-[#2E7D32]">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Important Dates */}
        <div className="bg-[#E3F2FD] rounded-lg p-3">
          <p className="text-xs font-semibold text-[#1976D2] mb-2 flex items-center gap-1">
            <Calendar className="h-3 w-3" /> Important Dates 2025
          </p>
          <div className="grid grid-cols-1 gap-1 text-xs">
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Registration:</span>
              <span className="font-medium text-[#1F2937]">{exam.importantDates.registration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Exam Date:</span>
              <span className="font-medium text-[#1F2937]">{exam.importantDates.examDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Results:</span>
              <span className="font-medium text-[#1F2937]">{exam.importantDates.resultDate}</span>
            </div>
          </div>
        </div>

        {/* Application Fee */}
        <div className="flex items-center justify-between text-sm bg-[#F3E5F5] rounded-lg p-3">
          <div className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4 text-[#7B1FA2]" />
            <span className="text-[#6B7280]">Application Fee:</span>
          </div>
          <div className="text-right">
            <p className="font-bold text-[#7B1FA2]">{exam.applicationFee.general}</p>
            <p className="text-xs text-[#6B7280]">SC/ST: {exam.applicationFee.scst}</p>
          </div>
        </div>

        {/* Colleges Accepting */}
        <div>
          <p className="text-xs font-semibold text-[#1B5E20] mb-2">🏛️ Colleges Accepting</p>
          <div className="flex flex-wrap gap-1">
            {exam.collegesAccepting.slice(0, 3).map((college, idx) => (
              <Badge key={idx} variant="outline" className="text-xs bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]">
                {college}
              </Badge>
            ))}
            {exam.collegesAccepting.length > 3 && (
              <Badge variant="outline" className="text-xs bg-white text-[#2E7D32] border-[#2E7D32]">
                +{exam.collegesAccepting.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9]"
              onClick={handleDownloadSyllabus}
            >
              <Download className="h-3 w-3 mr-1" />
              Syllabus
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 border-[#F59E0B] text-[#F59E0B] hover:bg-[#FFF8E1]"
              onClick={handleSetReminder}
            >
              <Bell className="h-3 w-3 mr-1" />
              Reminder
            </Button>
          </div>
          <Button 
            size="sm" 
            className="w-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B8860B] text-white"
            onClick={() => window.open(exam.officialWebsite, '_blank')}
          >
            Apply Now <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
