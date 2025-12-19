import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EntranceExam } from './types';
import { examCategories } from './examData';
import { 
  ExternalLink, 
  Calendar, 
  IndianRupee, 
  Clock, 
  FileText, 
  Bell, 
  Building2,
  Users,
  Bookmark,
  BookmarkCheck,
  Star,
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

  const handleSetReminder = () => {
    toast({
      title: "Reminder Set! 🔔",
      description: `You'll be notified about ${exam.name} important dates.`,
    });
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
      "bg-white border-l-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
      "border-[#2E7D32]"
    )}>
      <CardHeader className="pb-3 bg-gradient-to-r from-[#E8F5E9] to-[#FFF8E1]">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={cn("text-xs font-medium", categoryInfo?.bgColor, categoryInfo?.color)}>
              {categoryInfo?.icon} {categoryInfo?.label}
            </Badge>
            {exam.hasJKKN && (
              <Badge className="text-xs bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white border-0">
                <Star className="h-3 w-3 mr-1 fill-white" />
                JKKN
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
            <Badge variant="outline" className="text-xs bg-[#FFF8E1] text-[#B8860B] border-[#F59E0B]">
              2025
            </Badge>
          </div>
        </div>
        
        {/* Exam Name - English & Tamil */}
        <div className="mt-3">
          <h3 className="font-bold text-xl text-[#1B5E20]">
            {exam.name}
          </h3>
          <p className="text-sm text-[#B8860B] font-tamil">{exam.tamilName}</p>
          <p className="text-xs text-[#6B7280] mt-1">{exam.fullForm}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-4">
        {/* Conducting Body */}
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="h-4 w-4 text-[#2E7D32]" />
          <span className="text-[#374151] font-medium">{exam.conductingBody}</span>
        </div>

        {/* Exam Mode & Duration */}
        <div className="grid grid-cols-2 gap-3 text-sm bg-[#F0FDF4] rounded-lg p-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#2E7D32]" />
            <div>
              <p className="text-[#6B7280] text-xs">Mode</p>
              <p className="text-[#1F2937] font-medium text-xs">{exam.examMode}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#2E7D32]" />
            <div>
              <p className="text-[#6B7280] text-xs">Duration</p>
              <p className="text-[#1F2937] font-medium text-xs">{exam.duration}</p>
            </div>
          </div>
        </div>

        {/* TN Student Eligibility */}
        <div className="bg-gradient-to-r from-[#FFF8E1] to-[#FFFDE7] rounded-lg p-3 border border-[#FFE082]">
          <p className="text-xs font-semibold text-[#B8860B] mb-1 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> TN Student Eligibility
          </p>
          <p className="text-xs text-[#374151]">{exam.tnEligibility}</p>
        </div>

        {/* Important Dates 2025 */}
        <div className="bg-[#E8F5E9] rounded-lg p-3">
          <p className="text-xs font-semibold text-[#1B5E20] mb-2 flex items-center gap-1">
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
        <div className="flex items-center justify-between text-sm bg-[#F0FDF4] rounded-lg p-3 border border-[#C8E6C9]">
          <div className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4 text-[#2E7D32]" />
            <span className="text-[#6B7280] text-xs">Application Fee:</span>
          </div>
          <div className="text-right">
            <p className="font-bold text-[#1B5E20]">{exam.applicationFee.general}</p>
            <p className="text-xs text-[#6B7280]">SC/ST: {exam.applicationFee.scst}</p>
          </div>
        </div>

        {/* JKKN Colleges */}
        {exam.hasJKKN && exam.jkknColleges && exam.jkknColleges.length > 0 && (
          <div className="bg-gradient-to-r from-[#FFF8E1] to-[#FFFDE7] rounded-lg p-3 border border-[#FFD54F]">
            <p className="text-xs font-semibold text-[#F59E0B] mb-2 flex items-center gap-1">
              <Star className="h-3 w-3 fill-[#F59E0B]" /> JKKN Colleges
            </p>
            <div className="flex flex-wrap gap-1">
              {exam.jkknColleges.map((college, idx) => (
                <Badge key={idx} className="text-xs bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white border-0">
                  {college}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* TN Colleges Accepting */}
        <div>
          <p className="text-xs font-semibold text-[#1B5E20] mb-2 flex items-center gap-1">
            <Users className="h-3 w-3" /> TN Colleges Accepting
          </p>
          <div className="flex flex-wrap gap-1">
            {exam.tnCollegesAccepting.slice(0, 3).map((college, idx) => (
              <Badge key={idx} variant="outline" className="text-xs bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]">
                {college}
              </Badge>
            ))}
            {exam.tnCollegesAccepting.length > 3 && (
              <Badge variant="outline" className="text-xs bg-white text-[#2E7D32] border-[#2E7D32]">
                +{exam.tnCollegesAccepting.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Official Website */}
        <div className="text-xs text-[#6B7280] flex items-center gap-1">
          <ExternalLink className="h-3 w-3" />
          <a href={exam.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-[#1976D2] hover:underline truncate">
            {exam.officialWebsite}
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9]"
            onClick={handleSetReminder}
          >
            <Bell className="h-3 w-3 mr-1" />
            Reminder
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B8860B] text-white"
            onClick={() => window.open(exam.officialWebsite, '_blank')}
          >
            Apply Now <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
