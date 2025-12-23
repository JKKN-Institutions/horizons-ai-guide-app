import { useState, useEffect } from 'react';
import { Lightbulb, Eye, Clock, ChevronRight, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

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

const sampleArticles: Article[] = [
  { id: '1', title: 'Top 10 Interview Tips for Freshers in 2025', content: null, excerpt: 'Master these essential tips to crack your first job interview', author: 'Career Expert', category: 'Interview', thumbnail_url: null, read_time_minutes: 5, views_count: 12500, published_at: new Date().toISOString() },
  { id: '2', title: 'How to Build a Strong Resume with No Experience', content: null, excerpt: 'Create an impressive resume even as a fresher', author: 'HR Professional', category: 'Career', thumbnail_url: null, read_time_minutes: 7, views_count: 8900, published_at: new Date().toISOString() },
  { id: '3', title: 'DSA Preparation Strategy for Tech Interviews', content: null, excerpt: 'Step-by-step guide to master Data Structures & Algorithms', author: 'Tech Lead', category: 'Tech', thumbnail_url: null, read_time_minutes: 10, views_count: 15000, published_at: new Date().toISOString() },
  { id: '4', title: '5 Soft Skills Every Fresher Must Develop', content: null, excerpt: 'Beyond technical skills - what employers really look for', author: 'Industry Mentor', category: 'Career', thumbnail_url: null, read_time_minutes: 6, views_count: 7200, published_at: new Date().toISOString() },
  { id: '5', title: 'Common Mistakes to Avoid in Technical Interviews', content: null, excerpt: 'Learn from others mistakes and ace your tech interview', author: 'Senior Developer', category: 'Interview', thumbnail_url: null, read_time_minutes: 8, views_count: 11000, published_at: new Date().toISOString() },
  { id: '6', title: 'How to Use LinkedIn for Job Hunting', content: null, excerpt: 'Optimize your LinkedIn profile and get noticed by recruiters', author: 'Career Coach', category: 'Career', thumbnail_url: null, read_time_minutes: 6, views_count: 9500, published_at: new Date().toISOString() },
];

const categoryFilters = ['All', 'Tech', 'Interview', 'Career'];

export function TipsTab() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      // Use sample data if no articles in database
      setArticles(data && data.length > 0 ? data : sampleArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles(sampleArticles);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) => {
    return activeFilter === 'All' || article.category.toLowerCase().includes(activeFilter.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm flex gap-3">
            <Skeleton className="w-24 h-20 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Career Tips & Articles</h2>
        <p className="text-sm text-gray-500 mt-1">Expert advice for your career journey</p>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {categoryFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === filter
                ? 'bg-[#2E7D32] text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Article Cards */}
      <div className="space-y-3">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex gap-3">
              {/* Thumbnail */}
              <div className="w-24 h-20 bg-gradient-to-br from-[#E8F5E9] to-[#FFF8E1] rounded-lg flex-shrink-0 overflow-hidden">
                {article.thumbnail_url ? (
                  <img
                    src={article.thumbnail_url}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Lightbulb className="w-8 h-8 text-[#2E7D32]/40" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <Badge className="bg-[#E8F5E9] text-[#2E7D32] text-xs mb-1">
                  {article.category}
                </Badge>
                
                <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{article.title}</h3>

                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  {article.author && (
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {article.author}
                    </span>
                  )}
                  {article.read_time_minutes && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.read_time_minutes} min
                    </span>
                  )}
                  {article.views_count !== null && article.views_count !== undefined && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.views_count}
                    </span>
                  )}
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 self-center" />
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Lightbulb className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No articles found</p>
        </div>
      )}
    </div>
  );
}
