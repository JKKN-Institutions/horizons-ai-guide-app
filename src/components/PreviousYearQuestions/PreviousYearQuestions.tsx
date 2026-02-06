import { useState } from 'react';
import { 
  BookOpen, Search, Download, Filter, FileText, 
  GraduationCap, Calendar, Star, ChevronRight, ChevronDown,
  Clock, Bookmark, BookmarkCheck, Sparkles, SortAsc, 
  Eye, ExternalLink, TrendingUp, Award, Users
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

// ---------- DATA ----------

interface QuestionPaper {
  id: number;
  exam: string;
  year: number;
  session: string;
  subjects: string[];
  downloads: number;
  rating: number;
  category: string;
  subcategory: string;
  isNew: boolean;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Very Hard';
  questions: number;
  duration: string;
  language: string[];
}

interface CategoryNode {
  id: string;
  label: string;
  icon: string;
  children: { id: string; label: string }[];
}

const sidebarCategories: CategoryNode[] = [
  {
    id: 'engineering',
    label: 'Engineering',
    icon: '⚙️',
    children: [
      { id: 'jee-main', label: 'JEE Main' },
      { id: 'jee-advanced', label: 'JEE Advanced' },
      { id: 'tnea', label: 'TNEA / Anna Univ' },
      { id: 'bitsat', label: 'BITSAT' },
      { id: 'viteee', label: 'VITEEE' },
      { id: 'srmjeee', label: 'SRMJEEE' },
    ],
  },
  {
    id: 'medical',
    label: 'Medical / Health',
    icon: '🏥',
    children: [
      { id: 'neet-ug', label: 'NEET UG' },
      { id: 'neet-pg', label: 'NEET PG' },
      { id: 'aiims', label: 'AIIMS (old pattern)' },
      { id: 'nursing', label: 'Nursing Entrance' },
      { id: 'pharmacy', label: 'Pharmacy Entrance' },
    ],
  },
  {
    id: 'management',
    label: 'Management',
    icon: '📊',
    children: [
      { id: 'cat', label: 'CAT' },
      { id: 'xat', label: 'XAT' },
      { id: 'mat', label: 'MAT' },
      { id: 'tancet-mba', label: 'TANCET MBA' },
      { id: 'snap', label: 'SNAP' },
    ],
  },
  {
    id: 'law',
    label: 'Law',
    icon: '⚖️',
    children: [
      { id: 'clat', label: 'CLAT' },
      { id: 'ailet', label: 'AILET' },
      { id: 'tnnlu', label: 'TNNLU Entrance' },
    ],
  },
  {
    id: 'civil',
    label: 'Civil Services',
    icon: '🏛️',
    children: [
      { id: 'upsc-prelims', label: 'UPSC Prelims' },
      { id: 'upsc-mains', label: 'UPSC Mains' },
      { id: 'tnpsc-group1', label: 'TNPSC Group 1' },
      { id: 'tnpsc-group2', label: 'TNPSC Group 2/2A' },
      { id: 'tnpsc-group4', label: 'TNPSC Group 4' },
    ],
  },
  {
    id: 'banking',
    label: 'Banking & SSC',
    icon: '🏦',
    children: [
      { id: 'sbi-po', label: 'SBI PO' },
      { id: 'ibps-po', label: 'IBPS PO' },
      { id: 'ibps-clerk', label: 'IBPS Clerk' },
      { id: 'ssc-cgl', label: 'SSC CGL' },
      { id: 'ssc-chsl', label: 'SSC CHSL' },
      { id: 'rrb-ntpc', label: 'RRB NTPC' },
    ],
  },
  {
    id: 'defence',
    label: 'Defence',
    icon: '🎖️',
    children: [
      { id: 'nda', label: 'NDA' },
      { id: 'cds', label: 'CDS' },
      { id: 'afcat', label: 'AFCAT' },
    ],
  },
  {
    id: 'university',
    label: 'TN University',
    icon: '🎓',
    children: [
      { id: 'tancet-mca', label: 'TANCET MCA' },
      { id: 'tancet-me', label: 'TANCET M.E/M.Tech' },
      { id: 'tnau', label: 'TNAU Entrance' },
      { id: 'cuet', label: 'CUET' },
    ],
  },
];

const questionPapers: QuestionPaper[] = [
  { id: 1, exam: 'JEE Main', year: 2025, session: 'January Session 1 - Shift 1', subjects: ['Physics', 'Chemistry', 'Mathematics'], downloads: 24580, rating: 4.9, category: 'engineering', subcategory: 'jee-main', isNew: true, difficulty: 'Moderate', questions: 90, duration: '3 hrs', language: ['English', 'Hindi', 'Tamil'] },
  { id: 2, exam: 'JEE Main', year: 2025, session: 'January Session 1 - Shift 2', subjects: ['Physics', 'Chemistry', 'Mathematics'], downloads: 21300, rating: 4.8, category: 'engineering', subcategory: 'jee-main', isNew: true, difficulty: 'Hard', questions: 90, duration: '3 hrs', language: ['English', 'Hindi'] },
  { id: 3, exam: 'JEE Main', year: 2024, session: 'January Session 1', subjects: ['Physics', 'Chemistry', 'Mathematics'], downloads: 35420, rating: 4.8, category: 'engineering', subcategory: 'jee-main', isNew: false, difficulty: 'Moderate', questions: 90, duration: '3 hrs', language: ['English', 'Hindi', 'Tamil'] },
  { id: 4, exam: 'JEE Main', year: 2024, session: 'April Session 2', subjects: ['Physics', 'Chemistry', 'Mathematics'], downloads: 28100, rating: 4.7, category: 'engineering', subcategory: 'jee-main', isNew: false, difficulty: 'Hard', questions: 90, duration: '3 hrs', language: ['English', 'Hindi'] },
  { id: 5, exam: 'JEE Main', year: 2023, session: 'January Session', subjects: ['Physics', 'Chemistry', 'Mathematics'], downloads: 42000, rating: 4.7, category: 'engineering', subcategory: 'jee-main', isNew: false, difficulty: 'Moderate', questions: 90, duration: '3 hrs', language: ['English', 'Hindi'] },
  { id: 6, exam: 'JEE Advanced', year: 2024, session: 'Paper 1 & 2', subjects: ['Physics', 'Chemistry', 'Mathematics'], downloads: 18900, rating: 4.9, category: 'engineering', subcategory: 'jee-advanced', isNew: false, difficulty: 'Very Hard', questions: 54, duration: '3+3 hrs', language: ['English', 'Hindi'] },
  { id: 7, exam: 'JEE Advanced', year: 2023, session: 'Paper 1 & 2', subjects: ['Physics', 'Chemistry', 'Mathematics'], downloads: 22100, rating: 4.8, category: 'engineering', subcategory: 'jee-advanced', isNew: false, difficulty: 'Very Hard', questions: 54, duration: '3+3 hrs', language: ['English', 'Hindi'] },
  { id: 8, exam: 'NEET UG', year: 2025, session: 'May Session', subjects: ['Physics', 'Chemistry', 'Biology'], downloads: 38500, rating: 4.9, category: 'medical', subcategory: 'neet-ug', isNew: true, difficulty: 'Hard', questions: 200, duration: '3 hrs 20 min', language: ['English', 'Hindi', 'Tamil'] },
  { id: 9, exam: 'NEET UG', year: 2024, session: 'May Session', subjects: ['Physics', 'Chemistry', 'Biology'], downloads: 52350, rating: 4.9, category: 'medical', subcategory: 'neet-ug', isNew: false, difficulty: 'Hard', questions: 200, duration: '3 hrs 20 min', language: ['English', 'Hindi', 'Tamil'] },
  { id: 10, exam: 'NEET UG', year: 2023, session: 'May Session', subjects: ['Physics', 'Chemistry', 'Biology'], downloads: 61000, rating: 4.8, category: 'medical', subcategory: 'neet-ug', isNew: false, difficulty: 'Moderate', questions: 200, duration: '3 hrs 20 min', language: ['English', 'Hindi', 'Tamil'] },
  { id: 11, exam: 'CAT', year: 2024, session: 'Slot 1, 2, 3', subjects: ['VARC', 'DILR', 'QA'], downloads: 14450, rating: 4.7, category: 'management', subcategory: 'cat', isNew: false, difficulty: 'Hard', questions: 66, duration: '2 hrs', language: ['English'] },
  { id: 12, exam: 'CAT', year: 2023, session: 'Slot 1, 2, 3', subjects: ['VARC', 'DILR', 'QA'], downloads: 18200, rating: 4.6, category: 'management', subcategory: 'cat', isNew: false, difficulty: 'Hard', questions: 66, duration: '2 hrs', language: ['English'] },
  { id: 13, exam: 'UPSC CSE Prelims', year: 2024, session: 'Paper I (GS) & Paper II (CSAT)', subjects: ['GS', 'CSAT'], downloads: 45900, rating: 4.9, category: 'civil', subcategory: 'upsc-prelims', isNew: false, difficulty: 'Very Hard', questions: 200, duration: '2+2 hrs', language: ['English', 'Hindi'] },
  { id: 14, exam: 'UPSC CSE Prelims', year: 2023, session: 'Paper I & II', subjects: ['GS', 'CSAT'], downloads: 52800, rating: 4.9, category: 'civil', subcategory: 'upsc-prelims', isNew: false, difficulty: 'Very Hard', questions: 200, duration: '2+2 hrs', language: ['English', 'Hindi'] },
  { id: 15, exam: 'TNPSC Group 1', year: 2024, session: 'Prelims', subjects: ['GS', 'Aptitude', 'Tamil'], downloads: 32100, rating: 4.8, category: 'civil', subcategory: 'tnpsc-group1', isNew: false, difficulty: 'Hard', questions: 200, duration: '3 hrs', language: ['English', 'Tamil'] },
  { id: 16, exam: 'TNPSC Group 2/2A', year: 2024, session: 'Full Paper', subjects: ['GS', 'Tamil', 'Aptitude'], downloads: 28400, rating: 4.7, category: 'civil', subcategory: 'tnpsc-group2', isNew: false, difficulty: 'Moderate', questions: 200, duration: '3 hrs', language: ['English', 'Tamil'] },
  { id: 17, exam: 'TNPSC Group 4', year: 2024, session: 'Combined Exam', subjects: ['GS', 'Tamil', 'Aptitude'], downloads: 38900, rating: 4.6, category: 'civil', subcategory: 'tnpsc-group4', isNew: false, difficulty: 'Easy', questions: 200, duration: '3 hrs', language: ['English', 'Tamil'] },
  { id: 18, exam: 'CLAT', year: 2025, session: 'UG Exam', subjects: ['English', 'Legal Reasoning', 'GK', 'Quantitative', 'Logical'], downloads: 12540, rating: 4.6, category: 'law', subcategory: 'clat', isNew: true, difficulty: 'Moderate', questions: 150, duration: '2 hrs', language: ['English'] },
  { id: 19, exam: 'CLAT', year: 2024, session: 'UG Exam', subjects: ['English', 'Legal Reasoning', 'GK', 'Quantitative'], downloads: 15200, rating: 4.5, category: 'law', subcategory: 'clat', isNew: false, difficulty: 'Moderate', questions: 150, duration: '2 hrs', language: ['English'] },
  { id: 20, exam: 'SBI PO', year: 2024, session: 'Prelims + Mains', subjects: ['Reasoning', 'Quantitative', 'English', 'Banking'], downloads: 22800, rating: 4.7, category: 'banking', subcategory: 'sbi-po', isNew: false, difficulty: 'Moderate', questions: 155, duration: '1+3 hrs', language: ['English', 'Hindi'] },
  { id: 21, exam: 'SSC CGL', year: 2024, session: 'Tier 1', subjects: ['Reasoning', 'Quantitative', 'English', 'GK'], downloads: 31200, rating: 4.6, category: 'banking', subcategory: 'ssc-cgl', isNew: false, difficulty: 'Moderate', questions: 100, duration: '1 hr', language: ['English', 'Hindi'] },
  { id: 22, exam: 'NDA', year: 2024, session: 'Paper I & II', subjects: ['Maths', 'GAT'], downloads: 16700, rating: 4.5, category: 'defence', subcategory: 'nda', isNew: false, difficulty: 'Moderate', questions: 270, duration: '2.5+2.5 hrs', language: ['English'] },
  { id: 23, exam: 'TANCET MBA', year: 2024, session: 'Full Paper', subjects: ['Verbal', 'Quantitative', 'Analytical'], downloads: 8900, rating: 4.4, category: 'management', subcategory: 'tancet-mba', isNew: false, difficulty: 'Moderate', questions: 100, duration: '2 hrs', language: ['English'] },
  { id: 24, exam: 'CUET', year: 2024, session: 'Domain Subjects', subjects: ['GS', 'Domain', 'Language'], downloads: 19500, rating: 4.5, category: 'university', subcategory: 'cuet', isNew: false, difficulty: 'Moderate', questions: 175, duration: '3 hrs 15 min', language: ['English', 'Hindi', 'Tamil'] },
  { id: 25, exam: 'BITSAT', year: 2024, session: 'Online Test', subjects: ['Physics', 'Chemistry', 'Maths', 'English', 'Logical'], downloads: 11200, rating: 4.6, category: 'engineering', subcategory: 'bitsat', isNew: false, difficulty: 'Hard', questions: 130, duration: '3 hrs', language: ['English'] },
  { id: 26, exam: 'TNAU Entrance', year: 2024, session: 'Agriculture Stream', subjects: ['Physics', 'Chemistry', 'Biology/Maths'], downloads: 9800, rating: 4.3, category: 'university', subcategory: 'tnau', isNew: false, difficulty: 'Moderate', questions: 200, duration: '3 hrs', language: ['English', 'Tamil'] },
  { id: 27, exam: 'RRB NTPC', year: 2024, session: 'CBT 1', subjects: ['Maths', 'Reasoning', 'GK'], downloads: 27600, rating: 4.5, category: 'banking', subcategory: 'rrb-ntpc', isNew: false, difficulty: 'Easy', questions: 100, duration: '90 min', language: ['English', 'Hindi', 'Tamil'] },
  { id: 28, exam: 'IBPS PO', year: 2024, session: 'Prelims', subjects: ['Reasoning', 'Quantitative', 'English'], downloads: 19400, rating: 4.6, category: 'banking', subcategory: 'ibps-po', isNew: false, difficulty: 'Moderate', questions: 100, duration: '1 hr', language: ['English', 'Hindi'] },
];

// ---------- HELPERS ----------

const getDifficultyColor = (d: string) => {
  switch (d) {
    case 'Easy': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Moderate': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Hard': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'Very Hard': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getCategoryGradient = (cat: string) => {
  switch (cat) {
    case 'engineering': return 'from-blue-500 to-cyan-500';
    case 'medical': return 'from-emerald-500 to-teal-500';
    case 'management': return 'from-purple-500 to-pink-500';
    case 'law': return 'from-amber-500 to-orange-500';
    case 'civil': return 'from-rose-500 to-pink-500';
    case 'banking': return 'from-indigo-500 to-blue-500';
    case 'defence': return 'from-green-600 to-emerald-600';
    case 'university': return 'from-violet-500 to-purple-500';
    default: return 'from-gray-500 to-gray-600';
  }
};

// ---------- COMPONENT ----------

export const PreviousYearQuestions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['engineering', 'medical']);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('latest');
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev =>
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  const handleSubcategoryClick = (catId: string, subId: string) => {
    if (selectedSubcategory === subId) {
      setSelectedSubcategory(null);
      setSelectedCategory(null);
    } else {
      setSelectedSubcategory(subId);
      setSelectedCategory(catId);
    }
    setShowMobileSidebar(false);
  };

  const handleCategoryClick = (catId: string) => {
    if (selectedCategory === catId && !selectedSubcategory) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(catId);
      setSelectedSubcategory(null);
    }
  };

  const toggleBookmark = (id: number) => {
    setBookmarked(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  // Filter
  const filtered = questionPapers.filter(p => {
    const matchesCat = !selectedCategory || p.category === selectedCategory;
    const matchesSub = !selectedSubcategory || p.subcategory === selectedSubcategory;
    const matchesSearch = !searchQuery || 
      p.exam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSub && matchesSearch;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'latest': return b.year - a.year || b.id - a.id;
      case 'popular': return b.downloads - a.downloads;
      case 'rating': return b.rating - a.rating;
      default: return 0;
    }
  });

  const activeLabelParts: string[] = [];
  if (selectedCategory) {
    const cat = sidebarCategories.find(c => c.id === selectedCategory);
    if (cat) activeLabelParts.push(cat.label);
  }
  if (selectedSubcategory) {
    const sub = sidebarCategories.flatMap(c => c.children).find(s => s.id === selectedSubcategory);
    if (sub) activeLabelParts.push(sub.label);
  }
  const breadcrumb = activeLabelParts.length ? activeLabelParts.join(' › ') : 'All Exams';

  // Sidebar content (shared between desktop & mobile)
  const SidebarContent = () => (
    <div className="space-y-1">
      {/* All exams link */}
      <button
        onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); setShowMobileSidebar(false); }}
        className={cn(
          "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          !selectedCategory && !selectedSubcategory
            ? "bg-rose-50 text-rose-700 border border-rose-200"
            : "text-gray-700 hover:bg-gray-100"
        )}
      >
        📚 All Exams
      </button>

      {sidebarCategories.map(cat => {
        const isExpanded = expandedCategories.includes(cat.id);
        const isActive = selectedCategory === cat.id && !selectedSubcategory;
        const hasActiveSub = selectedCategory === cat.id && !!selectedSubcategory;
        const paperCount = questionPapers.filter(p => p.category === cat.id).length;

        return (
          <div key={cat.id}>
            <button
              onClick={() => { toggleCategory(cat.id); handleCategoryClick(cat.id); }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                  : hasActiveSub
                    ? "bg-gray-50 text-gray-800"
                    : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <span className="flex items-center gap-2">
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-gray-100 text-gray-500">
                  {paperCount}
                </Badge>
                <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isExpanded && "rotate-180")} />
              </span>
            </button>

            {isExpanded && (
              <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-gray-100 pl-3">
                {cat.children.map(sub => {
                  const subCount = questionPapers.filter(p => p.subcategory === sub.id).length;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleSubcategoryClick(cat.id, sub.id)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                        selectedSubcategory === sub.id
                          ? "bg-rose-50 text-rose-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                      )}
                    >
                      <span className="flex items-center justify-between">
                        <span>{sub.label}</span>
                        {subCount > 0 && (
                          <span className="text-[10px] text-gray-400">{subCount}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6 content-fade-in">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-300/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-amber-900 border-none font-semibold">
              <Sparkles className="w-3 h-3 mr-1" /> 2025 Updated
            </Badge>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Previous Year Questions</h2>
          <p className="text-rose-100 text-lg mb-1">
            Access 10,000+ question papers from 50+ entrance exams
          </p>
          <p className="text-pink-200 font-tamil text-sm">
            முந்தைய ஆண்டு கேள்விகள் - சிறந்த நுழைவுத் தேர்வுகளிலிருந்து
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Question Papers', value: '10K+', icon: FileText, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Exams Covered', value: '50+', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Years Archive', value: '15+', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Daily Downloads', value: '5K+', icon: Download, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, i) => (
          <Card key={i} className="border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={cn("p-2.5 rounded-xl", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + Sort Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search exams, subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl border-gray-200"
          />
        </div>
        <div className="flex gap-2">
          {/* Mobile filter toggle */}
          <Button 
            variant="outline" 
            className="md:hidden rounded-xl"
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
          >
            <Filter className="w-4 h-4 mr-1" />
            Filters
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] rounded-xl border-gray-200 bg-white">
              <SortAsc className="w-4 h-4 mr-2 text-gray-400" />
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Most Downloaded</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div className="md:hidden">
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowMobileSidebar(false)} />
          <div className="fixed inset-y-0 left-0 w-72 bg-white z-50 shadow-xl overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Filters</h3>
              <button onClick={() => setShowMobileSidebar(false)} className="p-1 rounded-md hover:bg-gray-100">
                ✕
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Layout: Sidebar + Grid */}
      <div className="flex gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm max-h-[calc(100vh-6rem)] overflow-y-auto">
            <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">Category</h3>
            <SidebarContent />
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumb + Count */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-800 text-lg">{breadcrumb}</h3>
              <p className="text-sm text-gray-500">
                Showing "{sorted.length}" items
              </p>
            </div>
            {(selectedCategory || selectedSubcategory) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); }}
                className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
              >
                Clear filter
              </Button>
            )}
          </div>

          {/* Papers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {sorted.map((paper) => (
              <Card 
                key={paper.id}
                className="bg-white border shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] overflow-hidden group"
              >
                {/* Top color bar */}
                <div className={cn("h-1.5 bg-gradient-to-r", getCategoryGradient(paper.category))} />
                <CardContent className="p-5">
                  {/* Title row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-bold text-gray-800">{paper.exam}</h4>
                        {paper.isNew && (
                          <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] border-none px-1.5 py-0">
                            NEW
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{paper.year} • {paper.session}</p>
                    </div>
                    <button
                      onClick={() => toggleBookmark(paper.id)}
                      className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      {bookmarked.includes(paper.id) ? (
                        <BookmarkCheck className="w-5 h-5 text-rose-500 fill-rose-500" />
                      ) : (
                        <Bookmark className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Subject tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {paper.subjects.map((s, i) => (
                      <Badge key={i} variant="outline" className="text-[11px] font-medium bg-gray-50">
                        {s}
                      </Badge>
                    ))}
                  </div>

                  {/* Meta row */}
                  <div className="grid grid-cols-3 gap-2 mb-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {paper.questions} Qs
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {paper.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      {paper.rating}
                    </span>
                  </div>

                  {/* Difficulty + Downloads */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={cn("text-[11px] border", getDifficultyColor(paper.difficulty))}>
                      {paper.difficulty}
                    </Badge>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {paper.downloads.toLocaleString()}
                    </span>
                  </div>

                  {/* Language tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {paper.language.map((l, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
                        {l}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 pt-2 border-t border-gray-100">
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-lg">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-lg border-gray-200">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty state */}
          {sorted.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500 font-medium">No papers found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search</p>
            </div>
          )}

          {/* Load more hint */}
          {sorted.length > 0 && (
            <div className="flex justify-center mt-6">
              <Button variant="outline" size="lg" className="rounded-xl">
                View More Papers
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
