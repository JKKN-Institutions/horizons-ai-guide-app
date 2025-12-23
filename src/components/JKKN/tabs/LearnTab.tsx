import { useState, useEffect } from 'react';
import { Search, Star, Users, Clock, ExternalLink, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface Course {
  id: string;
  title: string;
  description: string | null;
  category: string;
  instructor_name: string | null;
  thumbnail_url: string | null;
  duration_hours: number | null;
  lessons_count: number | null;
  rating: number | null;
  students_count: number | null;
  level: string | null;
  external_link: string | null;
  is_free: boolean | null;
}

const categoryFilters = ['All', 'Programming', 'Web', 'Data', 'Cloud'];

export function LearnTab() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === 'All' ||
      course.category.toLowerCase().includes(activeFilter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
            <Skeleton className="w-full h-40" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-3 rounded-xl border-gray-200 bg-white"
        />
      </div>

      {/* Filter Chips */}
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

      {/* Count */}
      <p className="text-sm text-gray-500">{filteredCourses.length}+ Free Courses</p>

      {/* Course Cards */}
      <div className="grid gap-4">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            {/* Thumbnail */}
            <div className="relative h-40 bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9]">
              {course.thumbnail_url ? (
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-[#2E7D32]/50" />
                </div>
              )}
              {course.is_free && (
                <Badge className="absolute top-3 left-3 bg-[#2E7D32] text-white">
                  FREE
                </Badge>
              )}
              {course.level && (
                <Badge className="absolute top-3 right-3 bg-white/90 text-gray-700">
                  {course.level}
                </Badge>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
              
              {course.instructor_name && (
                <p className="text-sm text-gray-500 mt-1">{course.instructor_name}</p>
              )}

              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                {course.rating && (
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    {course.rating.toFixed(1)}
                  </span>
                )}
                {course.students_count && (
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students_count.toLocaleString()}
                  </span>
                )}
                {course.duration_hours && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration_hours}h
                  </span>
                )}
              </div>

              <Button
                className="w-full mt-4 bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
                onClick={() => course.external_link && window.open(course.external_link, '_blank')}
              >
                Start Learning
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No courses found</p>
        </div>
      )}
    </div>
  );
}
