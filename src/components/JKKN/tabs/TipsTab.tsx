import { useState, useEffect } from 'react';
import { Lightbulb, Eye, Clock, ChevronRight, User, Bookmark, BookmarkCheck, TrendingUp, Target, Code, Briefcase, GraduationCap, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface Article {
  id: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  author: string | null;
  category: string;
  thumbnail_url: string | null;
  read_time_minutes: number | null;
  views_count: number | null;
  published_at: string | null;
}

const categoryConfig: Record<string, { color: string; bgColor: string; icon: any; gradient: string }> = {
  'Tech': { 
    color: 'text-blue-600', 
    bgColor: 'bg-blue-100', 
    icon: Code,
    gradient: 'from-blue-500 to-indigo-600'
  },
  'Interview': { 
    color: 'text-purple-600', 
    bgColor: 'bg-purple-100', 
    icon: Target,
    gradient: 'from-purple-500 to-pink-600'
  },
  'Career': { 
    color: 'text-emerald-600', 
    bgColor: 'bg-emerald-100', 
    icon: TrendingUp,
    gradient: 'from-emerald-500 to-teal-600'
  },
  'Resume': { 
    color: 'text-orange-600', 
    bgColor: 'bg-orange-100', 
    icon: Briefcase,
    gradient: 'from-orange-500 to-red-600'
  },
  'Skills': { 
    color: 'text-cyan-600', 
    bgColor: 'bg-cyan-100', 
    icon: GraduationCap,
    gradient: 'from-cyan-500 to-blue-600'
  },
  'Soft Skills': { 
    color: 'text-pink-600', 
    bgColor: 'bg-pink-100', 
    icon: Heart,
    gradient: 'from-pink-500 to-rose-600'
  },
};

const getRandomGradient = (category: string) => {
  const config = categoryConfig[category] || { 
    color: 'text-gray-600', 
    bgColor: 'bg-gray-100', 
    icon: Lightbulb,
    gradient: 'from-gray-500 to-slate-600'
  };
  return config;
};

const sampleArticles: Article[] = [
  { id: '1', title: 'Top 10 Interview Tips for Freshers in 2025', content: null, excerpt: 'Master these essential tips to crack your first job interview with confidence', author: 'Career Expert', category: 'Interview', thumbnail_url: null, read_time_minutes: 5, views_count: 12500, published_at: new Date().toISOString() },
  { id: '2', title: 'How to Build a Strong Resume with No Experience', content: null, excerpt: 'Create an impressive resume even as a fresher using these proven strategies', author: 'HR Professional', category: 'Resume', thumbnail_url: null, read_time_minutes: 7, views_count: 8900, published_at: new Date().toISOString() },
  { id: '3', title: 'DSA Preparation Strategy for Tech Interviews', content: null, excerpt: 'Step-by-step guide to master Data Structures & Algorithms in 3 months', author: 'Tech Lead', category: 'Tech', thumbnail_url: null, read_time_minutes: 10, views_count: 15000, published_at: new Date().toISOString() },
  { id: '4', title: '5 Soft Skills Every Fresher Must Develop', content: null, excerpt: 'Beyond technical skills - what employers really look for in candidates', author: 'Industry Mentor', category: 'Soft Skills', thumbnail_url: null, read_time_minutes: 6, views_count: 7200, published_at: new Date().toISOString() },
  { id: '5', title: 'Common Mistakes to Avoid in Technical Interviews', content: null, excerpt: 'Learn from others mistakes and ace your tech interview like a pro', author: 'Senior Developer', category: 'Interview', thumbnail_url: null, read_time_minutes: 8, views_count: 11000, published_at: new Date().toISOString() },
  { id: '6', title: 'How to Use LinkedIn for Job Hunting', content: null, excerpt: 'Optimize your LinkedIn profile and get noticed by top recruiters', author: 'Career Coach', category: 'Career', thumbnail_url: null, read_time_minutes: 6, views_count: 9500, published_at: new Date().toISOString() },
  { id: '7', title: 'System Design Basics for Freshers', content: null, excerpt: 'Introduction to system design concepts for entry-level engineers', author: 'Senior Architect', category: 'Tech', thumbnail_url: null, read_time_minutes: 12, views_count: 8200, published_at: new Date().toISOString() },
  { id: '8', title: 'Salary Negotiation Tips for First Job', content: null, excerpt: 'How to negotiate your salary even as a fresher without being awkward', author: 'HR Director', category: 'Career', thumbnail_url: null, read_time_minutes: 5, views_count: 14000, published_at: new Date().toISOString() },
];

const categoryFilters = [
  { name: 'All', icon: Lightbulb, color: 'bg-gradient-to-r from-[#2E7D32] to-[#4CAF50]' },
  { name: 'Tech', icon: Code, color: 'bg-gradient-to-r from-blue-500 to-indigo-600' },
  { name: 'Interview', icon: Target, color: 'bg-gradient-to-r from-purple-500 to-pink-600' },
  { name: 'Career', icon: TrendingUp, color: 'bg-gradient-to-r from-emerald-500 to-teal-600' },
  { name: 'Resume', icon: Briefcase, color: 'bg-gradient-to-r from-orange-500 to-red-600' },
  { name: 'Soft Skills', icon: Heart, color: 'bg-gradient-to-r from-pink-500 to-rose-600' },
];

export function TipsTab() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [savedArticles, setSavedArticles] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchArticles();
    // Load saved articles from localStorage
    const saved = localStorage.getItem('saved_tips');
    if (saved) {
      setSavedArticles(new Set(JSON.parse(saved)));
    }
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setArticles(data && data.length > 0 ? data : sampleArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles(sampleArticles);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSave = (articleId: string, title: string) => {
    setSavedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
        toast.success('Removed from saved');
      } else {
        newSet.add(articleId);
        toast.success(`"${title}" saved!`);
      }
      localStorage.setItem('saved_tips', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const filteredArticles = articles.filter((article) => {
    return activeFilter === 'All' || article.category.toLowerCase().includes(activeFilter.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-24 h-10 rounded-full flex-shrink-0" />
          ))}
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
            <Skeleton className="w-full h-32 rounded-xl mb-3" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-5 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Colorful Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2E7D32] via-[#43A047] to-[#66BB6A] p-5 text-white shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-6 h-6" />
            <span className="text-sm font-medium text-white/80">Career Guidance</span>
          </div>
          <h2 className="text-2xl font-bold">Tips & Articles</h2>
          <p className="text-sm text-white/80 mt-1">Expert advice for your career journey</p>
        </div>
      </div>

      {/* Colorful Category Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {categoryFilters.map((filter) => {
          const IconComponent = filter.icon;
          const isActive = activeFilter === filter.name;
          return (
            <button
              key={filter.name}
              onClick={() => setActiveFilter(filter.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all shadow-sm ${
                isActive
                  ? `${filter.color} text-white shadow-md scale-105`
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {filter.name}
            </button>
          );
        })}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 text-white text-center">
          <p className="text-2xl font-bold">{articles.length}+</p>
          <p className="text-xs text-blue-100">Articles</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 text-white text-center">
          <p className="text-2xl font-bold">{categoryFilters.length - 1}</p>
          <p className="text-xs text-purple-100">Categories</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-3 text-white text-center">
          <p className="text-2xl font-bold">{savedArticles.size}</p>
          <p className="text-xs text-emerald-100">Saved</p>
        </div>
      </div>

      {/* Article Cards */}
      <div className="space-y-4">
        {filteredArticles.map((article, index) => {
          const config = getRandomGradient(article.category);
          const IconComponent = config.icon;
          const isSaved = savedArticles.has(article.id);
          
          return (
            <div
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              {/* Colorful Top Banner */}
              <div className={`h-2 bg-gradient-to-r ${config.gradient}`} />
              
              <div className="p-4">
                <div className="flex gap-4">
                  {/* Colorful Icon Box */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Badge className={`${config.bgColor} ${config.color} text-xs font-medium`}>
                        {article.category}
                      </Badge>
                      <button
                        onClick={() => toggleSave(article.id, article.title)}
                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-5 h-5 text-[#2E7D32]" />
                        ) : (
                          <Bookmark className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 text-base mt-2 line-clamp-2 leading-tight">{article.title}</h3>
                    
                    {article.excerpt && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{article.excerpt}</p>
                    )}
                  </div>
                </div>

                {/* Footer with Stats */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {article.author && (
                      <span className="flex items-center gap-1.5">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-medium text-gray-700">{article.author}</span>
                      </span>
                    )}
                    {article.read_time_minutes && (
                      <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                        <Clock className="w-3 h-3" />
                        {article.read_time_minutes} min
                      </span>
                    )}
                    {article.views_count !== null && (
                      <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                        <Eye className="w-3 h-3" />
                        {article.views_count >= 1000 
                          ? `${(article.views_count / 1000).toFixed(1)}K` 
                          : article.views_count}
                      </span>
                    )}
                  </div>
                  
                  <button className={`flex items-center gap-1 text-sm font-medium ${config.color} hover:underline`}>
                    Read
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <Lightbulb className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">No articles found</p>
          <p className="text-gray-400 text-sm mt-1">Try a different category</p>
        </div>
      )}
    </div>
  );
}
