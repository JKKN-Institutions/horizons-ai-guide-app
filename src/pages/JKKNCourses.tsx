import { useState, useEffect } from 'react';
import { Search, BookOpen, Play, Clock, Users, Star, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { JKKNNavbar } from '@/components/JKKN/JKKNNavbar';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

interface Course {
  id: string;
  title: string;
  description?: string;
  category: string;
  instructor_name?: string;
  thumbnail_url?: string;
  duration_hours?: number;
  lessons_count?: number;
  rating?: number;
  students_count?: number;
  level?: string;
  external_link?: string;
  is_free?: boolean;
}

const categories = [
  'Programming',
  'Web Development',
  'Data Science',
  'Machine Learning',
  'Mobile Development',
  'DevOps',
  'Cybersecurity',
  'Soft Skills'
];

export default function JKKNCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.instructor_name || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-fresh-green-bg via-white to-fresh-gold-light">
      <JKKNNavbar />
      
      {/* Header */}
      <div className="fresh-page-header mx-4 mt-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Free Courses
            </h1>
            <p className="text-fresh-gold-medium font-tamil mt-1">
              இலவச பாடநெறிகள்
            </p>
          </div>
        </div>
        <p className="text-white/80 mt-4 max-w-2xl">
          Curated courses from YouTube, Coursera, Udemy and more. Start learning today!
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 fresh-input"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="fresh-input">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="fresh-input">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden">
                <Skeleton className="w-full h-40" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No courses found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="fresh-card overflow-hidden p-0 group">
                {/* Thumbnail */}
                <div className="relative h-40 bg-gradient-to-br from-fresh-green-bg to-fresh-gold-light overflow-hidden">
                  {course.thumbnail_url ? (
                    <img 
                      src={course.thumbnail_url} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="w-12 h-12 text-fresh-green-medium" />
                    </div>
                  )}
                  {course.is_free && (
                    <Badge className="absolute top-3 left-3 bg-fresh-green-medium text-white">
                      Free
                    </Badge>
                  )}
                  <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">
                    {course.level || 'Beginner'}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-5">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {course.category}
                  </Badge>
                  <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-fresh-green-medium transition-colors">
                    {course.title}
                  </h3>
                  {course.instructor_name && (
                    <p className="text-sm text-muted-foreground mb-3">
                      by {course.instructor_name}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    {course.duration_hours && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration_hours}h
                      </span>
                    )}
                    {course.lessons_count && (
                      <span className="flex items-center gap-1">
                        <Play className="w-4 h-4" />
                        {course.lessons_count} lessons
                      </span>
                    )}
                    {course.rating && (
                      <span className="flex items-center gap-1 text-fresh-gold-dark">
                        <Star className="w-4 h-4 fill-fresh-gold-dark" />
                        {course.rating.toFixed(1)}
                      </span>
                    )}
                  </div>

                  <Button 
                    className="w-full bg-fresh-green-medium hover:bg-fresh-green-dark"
                    onClick={() => course.external_link && window.open(course.external_link, '_blank')}
                  >
                    Start Learning
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
