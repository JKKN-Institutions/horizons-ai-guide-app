import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, GraduationCap, FileText, Building2, Bookmark, CalendarDays, Scale, MapPin } from 'lucide-react';
import { ExamCard } from './ExamCard';
import { ExamCompare } from './ExamCompare';
import { PreparationTipsSection } from './PreparationTipsSection';
import { ExamCalendar } from './ExamCalendar';
import { examCategories, entranceExams, getExamsByCategory } from './examData';
import { ExamCategory } from './types';
import { useBookmarkedExams } from './useBookmarkedExams';
import { cn } from '@/lib/utils';

export const EntranceExams = () => {
  const [activeCategory, setActiveCategory] = useState<ExamCategory>('engineering');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompare, setShowCompare] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  
  const { isBookmarked, toggleBookmark, getBookmarkedCount } = useBookmarkedExams();

  const stats = useMemo(() => ({
    total: entranceExams.length,
    colleges: '500+',
    updated: '2025',
    streams: 'PCM, PCB, Arts',
  }), []);

  const filteredExams = useMemo(() => {
    let exams = getExamsByCategory(activeCategory);
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      exams = exams.filter(exam => 
        exam.name.toLowerCase().includes(query) ||
        exam.fullForm.toLowerCase().includes(query) ||
        exam.conductingBody.toLowerCase().includes(query) ||
        exam.tamilName.toLowerCase().includes(query)
      );
    }
    
    if (showBookmarksOnly) {
      exams = exams.filter(exam => isBookmarked(exam.id));
    }
    
    return exams;
  }, [activeCategory, searchQuery, showBookmarksOnly, isBookmarked]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    examCategories.forEach(cat => {
      counts[cat.id] = getExamsByCategory(cat.id).length;
    });
    return counts;
  }, []);

  const bookmarkedCount = getBookmarkedCount();

  return (
    <div className="space-y-6">
      {/* Header Section - Light Green + Golden Theme */}
      <div className="text-center space-y-4 bg-gradient-to-br from-[#E8F5E9] via-[#F0FDF4] to-[#FFF8E1] rounded-2xl p-6 border border-[#C8E6C9]">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1B5E20]">
          📝 Entrance Exams for Tamil Nadu 12th Students
        </h2>
        <p className="text-lg md:text-xl text-[#B8860B] font-tamil">
          தமிழ்நாடு 12-ஆம் வகுப்பு மாணவர்களுக்கான நுழைவுத் தேர்வுகள்
        </p>
        
        {/* TN Focus Badge */}
        <div className="flex justify-center">
          <Badge className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white px-4 py-2 text-sm shadow-md">
            <MapPin className="h-4 w-4 mr-2" />
            தமிழ்நாடு மாணவர்களுக்கான விரிவான வழிகாட்டி
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-6">
          <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-[#C8E6C9] shadow-sm">
            <div className="flex items-center justify-center gap-2">
              <FileText className="h-5 w-5 text-[#2E7D32]" />
              <div className="text-2xl font-bold text-[#2E7D32]">{stats.total}</div>
            </div>
            <div className="text-sm text-[#6B7280]">Exams</div>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-[#C8E6C9] shadow-sm">
            <div className="flex items-center justify-center gap-2">
              <Building2 className="h-5 w-5 text-[#B8860B]" />
              <div className="text-2xl font-bold text-[#B8860B]">{stats.colleges}</div>
            </div>
            <div className="text-sm text-[#6B7280]">TN Colleges</div>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-[#C8E6C9] shadow-sm">
            <div className="flex items-center justify-center gap-2">
              <CalendarDays className="h-5 w-5 text-[#1976D2]" />
              <div className="text-2xl font-bold text-[#1976D2]">{stats.updated}</div>
            </div>
            <div className="text-sm text-[#6B7280]">Updated</div>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-[#C8E6C9] shadow-sm">
            <div className="flex items-center justify-center gap-2">
              <GraduationCap className="h-5 w-5 text-[#7B1FA2]" />
              <div className="text-2xl font-bold text-[#7B1FA2]">{stats.streams}</div>
            </div>
            <div className="text-sm text-[#6B7280]">Streams</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <Button
            onClick={() => setShowCompare(true)}
            className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] hover:from-[#1B5E20] hover:to-[#0D3F12] text-white shadow-md"
          >
            <Scale className="h-4 w-4 mr-2" />
            Compare Exams
          </Button>
          <Button
            onClick={() => setShowCalendar(true)}
            className="bg-gradient-to-r from-[#B8860B] to-[#8B6914] hover:from-[#8B6914] hover:to-[#6B5210] text-white shadow-md"
          >
            <CalendarDays className="h-4 w-4 mr-2" />
            Exam Calendar
          </Button>
          <Button
            variant={showBookmarksOnly ? "default" : "outline"}
            onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
            className={cn(
              "shadow-md",
              showBookmarksOnly 
                ? "bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white" 
                : "border-[#F59E0B] text-[#B8860B] hover:bg-[#FFF8E1] bg-white"
            )}
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Saved ({bookmarkedCount})
          </Button>
        </div>
      </div>

      {/* 6 Category Sub-tabs with Tamil */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max justify-center">
          {examCategories.map((category) => {
            const isActive = activeCategory === category.id;
            const count = categoryCounts[category.id];
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'flex flex-col items-center gap-1 px-4 py-3 rounded-xl border-2 transition-all duration-300',
                  'hover:scale-[1.02] hover:shadow-lg whitespace-nowrap min-w-[120px]',
                  isActive 
                    ? `bg-gradient-to-br from-[#E8F5E9] to-[#FFF8E1] border-[#2E7D32] shadow-md` 
                    : 'bg-white border-[#E8F5E9] text-[#4B5563] hover:border-[#C8E6C9]'
                )}
              >
                <span className="text-xl">{category.icon}</span>
                <span className={cn(
                  'font-semibold text-sm',
                  isActive ? 'text-[#1B5E20]' : 'text-[#1F2937]'
                )}>{category.label}</span>
                <span className={cn(
                  'text-xs font-tamil',
                  isActive ? 'text-[#B8860B]' : 'text-[#6B7280]'
                )}>{category.tamilLabel}</span>
                <Badge className={cn(
                  'text-xs mt-1',
                  isActive 
                    ? 'bg-[#2E7D32] text-white' 
                    : 'bg-[#E8F5E9] text-[#2E7D32]'
                )}>
                  {count}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
          <Input
            placeholder="Search exams... (English or Tamil)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-[#C8E6C9] focus:border-[#2E7D32] focus:ring-[#2E7D32]/20 shadow-sm"
          />
        </div>
      </div>

      {/* Exams Grid */}
      {filteredExams.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-[#C8E6C9] shadow-md">
          <p className="text-lg text-[#4B5563]">
            {showBookmarksOnly 
              ? "No saved exams in this category"
              : "No exams found matching your criteria"
            }
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {searchQuery && (
              <Button
                variant="link"
                className="text-[#2E7D32]"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </Button>
            )}
            {showBookmarksOnly && (
              <Button
                variant="link"
                className="text-[#2E7D32]"
                onClick={() => setShowBookmarksOnly(false)}
              >
                Show all exams
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <ExamCard 
              key={exam.id} 
              exam={exam} 
              isBookmarked={isBookmarked(exam.id)}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      )}

      {/* Preparation Tips Section */}
      <PreparationTipsSection />

      {/* Info Note */}
      <div className="bg-gradient-to-r from-[#FFF8E1] to-[#FFFDE7] border border-[#FFE082] rounded-xl p-4 text-center shadow-sm">
        <p className="text-sm text-[#B8860B]">
          💡 <strong>குறிப்பு:</strong> தேதிகள் தற்காலிகமானவை. விண்ணப்பிக்கும் முன் அதிகாரப்பூர்வ இணையதளங்களில் சரிபார்க்கவும்.
        </p>
        <p className="text-xs text-[#6B7280] mt-1">
          Note: Dates are tentative. Always verify from official websites before applying.
        </p>
      </div>

      {/* Compare Modal */}
      <ExamCompare isOpen={showCompare} onClose={() => setShowCompare(false)} />
      
      {/* Calendar Modal */}
      <ExamCalendar isOpen={showCalendar} onClose={() => setShowCalendar(false)} />
    </div>
  );
};
