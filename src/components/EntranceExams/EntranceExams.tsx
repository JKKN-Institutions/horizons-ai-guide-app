import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, GraduationCap, FileText, Building2, Calendar, Scale } from 'lucide-react';
import { ExamCard } from './ExamCard';
import { ExamCompare } from './ExamCompare';
import { PreparationTipsSection } from './PreparationTipsSection';
import { examCategories, entranceExams, getExamsByCategory } from './examData';
import { ExamCategory } from './types';
import { cn } from '@/lib/utils';

export const EntranceExams = () => {
  const [activeCategory, setActiveCategory] = useState<ExamCategory>('engineering');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompare, setShowCompare] = useState(false);

  const stats = useMemo(() => ({
    total: entranceExams.length,
    colleges: '500+',
    updated: '2025',
    streams: 'All Streams',
  }), []);

  const filteredExams = useMemo(() => {
    let exams = getExamsByCategory(activeCategory);
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      exams = exams.filter(exam => 
        exam.name.toLowerCase().includes(query) ||
        exam.fullForm.toLowerCase().includes(query) ||
        exam.conductingBody.toLowerCase().includes(query)
      );
    }
    
    return exams;
  }, [activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    examCategories.forEach(cat => {
      counts[cat.id] = getExamsByCategory(cat.id).length;
    });
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h2 className="font-playfair text-3xl font-bold text-[#1B5E20]">
          📝 Entrance Exams Guide for 12th Students
        </h2>
        <p className="text-lg text-[#B8860B] font-tamil">
          12-ஆம் வகுப்பு மாணவர்களுக்கான நுழைவுத் தேர்வு வழிகாட்டி
        </p>
        <p className="text-[#4B5563] max-w-2xl mx-auto mb-4">
          Comprehensive guide to all major entrance exams in India - Engineering, Medical, Management, Design & more
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-6">
          <div className="fresh-stat-card">
            <div className="flex items-center justify-center gap-2">
              <FileText className="h-5 w-5 text-[#2E7D32]" />
              <div className="text-2xl font-bold text-[#2E7D32]">{stats.total}+</div>
            </div>
            <div className="text-sm text-[#6B7280]">Exams Covered</div>
          </div>
          <div className="fresh-stat-card">
            <div className="flex items-center justify-center gap-2">
              <Building2 className="h-5 w-5 text-[#1976D2]" />
              <div className="text-2xl font-bold text-[#1976D2]">{stats.colleges}</div>
            </div>
            <div className="text-sm text-[#6B7280]">Colleges</div>
          </div>
          <div className="fresh-stat-card">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5 text-[#F59E0B]" />
              <div className="text-2xl font-bold text-[#F59E0B]">{stats.updated}</div>
            </div>
            <div className="text-sm text-[#6B7280]">Updated</div>
          </div>
          <div className="fresh-stat-card">
            <div className="flex items-center justify-center gap-2">
              <GraduationCap className="h-5 w-5 text-[#7B1FA2]" />
              <div className="text-2xl font-bold text-[#7B1FA2]">{stats.streams}</div>
            </div>
            <div className="text-sm text-[#6B7280]">Coverage</div>
          </div>
        </div>

        {/* Compare Button */}
        <Button
          onClick={() => setShowCompare(true)}
          className="mt-4 bg-gradient-to-r from-[#1976D2] to-[#1565C0] hover:from-[#1565C0] hover:to-[#0D47A1] text-white"
        >
          <Scale className="h-4 w-4 mr-2" />
          Compare Exams
        </Button>
      </div>

      {/* Category Sub-tabs */}
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
                  'flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300',
                  'hover:scale-[1.02] hover:shadow-md whitespace-nowrap',
                  isActive 
                    ? `${category.bgColor} ${category.color} ${category.borderColor} shadow-md` 
                    : 'bg-white border-[#E8F5E9] text-[#4B5563] hover:border-[#C8E6C9]'
                )}
              >
                <span className="text-lg">{category.icon}</span>
                <span className={cn(
                  'font-semibold text-sm',
                  isActive ? category.color : 'text-[#1F2937]'
                )}>{category.label}</span>
                <Badge className={cn(
                  'text-xs',
                  isActive 
                    ? 'bg-white/80 text-[#1F2937]' 
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
            placeholder="Search exams by name, body, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-[#C8E6C9] focus:border-[#2E7D32] focus:ring-[#2E7D32]/20"
          />
        </div>
      </div>

      {/* Exams Grid */}
      {filteredExams.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-[#C8E6C9] shadow-md">
          <p className="text-lg text-[#4B5563]">No exams found matching your search</p>
          <button 
            className="mt-4 text-[#2E7D32] hover:underline"
            onClick={() => setSearchQuery('')}
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      )}

      {/* Preparation Tips Section */}
      <PreparationTipsSection />

      {/* Info Note */}
      <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-xl p-4 text-center">
        <p className="text-sm text-[#B8860B]">
          💡 <strong>Note:</strong> Dates are tentative and subject to change. 
          Always verify from official websites before applying.
        </p>
      </div>

      {/* Compare Modal */}
      <ExamCompare isOpen={showCompare} onClose={() => setShowCompare(false)} />
    </div>
  );
};
