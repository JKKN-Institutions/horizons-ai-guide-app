import { useState } from 'react';
import { 
  BookOpen, Search, Download, Filter, FileText, 
  GraduationCap, Calendar, Star, ChevronRight,
  Clock, Eye, Bookmark, ExternalLink, Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const examCategories = [
  { id: 'all', label: 'All Exams', icon: '📚', count: 150 },
  { id: 'engineering', label: 'Engineering', icon: '⚙️', count: 45 },
  { id: 'medical', label: 'Medical', icon: '🏥', count: 35 },
  { id: 'management', label: 'Management', icon: '📊', count: 25 },
  { id: 'law', label: 'Law', icon: '⚖️', count: 20 },
  { id: 'civil', label: 'Civil Services', icon: '🏛️', count: 25 },
];

const questionPapers = [
  {
    id: 1,
    exam: 'JEE Main',
    year: 2024,
    session: 'January Session 1',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    downloads: 15420,
    rating: 4.8,
    category: 'engineering',
    isNew: true,
    difficulty: 'Moderate',
  },
  {
    id: 2,
    exam: 'NEET UG',
    year: 2024,
    session: 'May Session',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    downloads: 22350,
    rating: 4.9,
    category: 'medical',
    isNew: true,
    difficulty: 'Hard',
  },
  {
    id: 3,
    exam: 'JEE Advanced',
    year: 2023,
    session: 'Paper 1 & 2',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    downloads: 18900,
    rating: 4.7,
    category: 'engineering',
    isNew: false,
    difficulty: 'Very Hard',
  },
  {
    id: 4,
    exam: 'CAT',
    year: 2023,
    session: 'Slot 1, 2, 3',
    subjects: ['VARC', 'DILR', 'QA'],
    downloads: 12450,
    rating: 4.6,
    category: 'management',
    isNew: false,
    difficulty: 'Hard',
  },
  {
    id: 5,
    exam: 'UPSC CSE Prelims',
    year: 2023,
    session: 'Paper I & II',
    subjects: ['GS', 'CSAT'],
    downloads: 28900,
    rating: 4.9,
    category: 'civil',
    isNew: false,
    difficulty: 'Very Hard',
  },
  {
    id: 6,
    exam: 'CLAT',
    year: 2024,
    session: 'UG Exam',
    subjects: ['English', 'Legal Reasoning', 'GK', 'Quantitative'],
    downloads: 8540,
    rating: 4.5,
    category: 'law',
    isNew: true,
    difficulty: 'Moderate',
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'bg-green-100 text-green-700';
    case 'Moderate': return 'bg-amber-100 text-amber-700';
    case 'Hard': return 'bg-orange-100 text-orange-700';
    case 'Very Hard': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export const PreviousYearQuestions = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedPapers, setBookmarkedPapers] = useState<number[]>([]);

  const filteredPapers = questionPapers.filter(paper => {
    const matchesCategory = selectedCategory === 'all' || paper.category === selectedCategory;
    const matchesSearch = paper.exam.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleBookmark = (id: number) => {
    setBookmarkedPapers(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8 content-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-300/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <Badge className="bg-gradient-to-r from-rose-400 to-pink-400 text-white hover:from-rose-500 hover:to-pink-500 border-none">
              <Sparkles className="w-3 h-3 mr-1" /> NEW
            </Badge>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Previous Year Questions</h2>
          <p className="text-rose-100 text-lg mb-4">
            Access 10,000+ question papers from top entrance exams
          </p>
          <p className="text-pink-200 font-tamil text-base">
            முந்தைய ஆண்டு கேள்விகள் - சிறந்த நுழைவுத் தேர்வுகளிலிருந்து
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search exams, subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6 rounded-xl border-gray-200"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 py-6 rounded-xl">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {examCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
            <Badge 
              variant="secondary" 
              className={`ml-1 ${selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-100'}`}
            >
              {cat.count}
            </Badge>
          </button>
        ))}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Question Papers', value: '10K+', icon: FileText, color: 'text-rose-600' },
          { label: 'Exams Covered', value: '50+', icon: GraduationCap, color: 'text-purple-600' },
          { label: 'Years Archive', value: '15+', icon: Calendar, color: 'text-blue-600' },
          { label: 'Daily Downloads', value: '5K+', icon: Download, color: 'text-emerald-600' },
        ].map((stat, index) => (
          <Card key={index} className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Question Papers List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPapers.map((paper) => (
          <Card 
            key={paper.id}
            className="bg-white border-none shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden group"
          >
            <div className={`h-2 bg-gradient-to-r ${
              paper.category === 'engineering' ? 'from-blue-500 to-cyan-500' :
              paper.category === 'medical' ? 'from-emerald-500 to-teal-500' :
              paper.category === 'management' ? 'from-purple-500 to-pink-500' :
              paper.category === 'law' ? 'from-amber-500 to-orange-500' :
              'from-rose-500 to-pink-500'
            }`} />
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-800 text-lg">{paper.exam}</h4>
                    {paper.isNew && (
                      <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px]">NEW</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{paper.year} • {paper.session}</p>
                </div>
                <button 
                  onClick={() => toggleBookmark(paper.id)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Bookmark 
                    className={`w-5 h-5 ${bookmarkedPapers.includes(paper.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} 
                  />
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {paper.subjects.map((subject, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs font-medium">
                    {subject}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <Badge className={`${getDifficultyColor(paper.difficulty)} border-none text-xs`}>
                  {paper.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-medium text-gray-700">{paper.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    {paper.downloads.toLocaleString()}
                  </span>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View More */}
      <div className="flex justify-center">
        <Button variant="outline" size="lg" className="rounded-xl">
          View All Papers
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};
