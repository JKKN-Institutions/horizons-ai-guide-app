import { useState, useEffect } from 'react';
import { Search, Star, Users, Clock, ExternalLink, BookOpen, Bookmark, BookmarkCheck, Play, FileText, Video } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useJKKNBookmarks } from '@/hooks/useJKKNBookmarks';
import { toast } from 'sonner';

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

// Real YouTube playlists with actual learning content
const realCourses: Course[] = [
  {
    id: 'python-course',
    title: 'Complete Python Programming Bootcamp',
    description: 'Learn Python from scratch to advanced level with hands-on projects',
    category: 'Programming',
    instructor_name: 'CodeWithHarry',
    thumbnail_url: 'https://i.ytimg.com/vi/gfDE2a7MKjA/hqdefault.jpg',
    duration_hours: 40,
    lessons_count: 120,
    rating: 4.8,
    students_count: 2500000,
    level: 'Beginner',
    external_link: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agICnT8t4iYVSZ3eykIAOME',
    is_free: true,
  },
  {
    id: 'fullstack-course',
    title: 'Full Stack Web Development with MERN',
    description: 'Build modern web applications with React, Node.js, Express & MongoDB',
    category: 'Web',
    instructor_name: 'freeCodeCamp',
    thumbnail_url: 'https://i.ytimg.com/vi/7CqJlxBYj-M/hqdefault.jpg',
    duration_hours: 60,
    lessons_count: 180,
    rating: 4.9,
    students_count: 1800000,
    level: 'Intermediate',
    external_link: 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbkArDMazoARtNz1aMwNWmvC',
    is_free: true,
  },
  {
    id: 'datascience-course',
    title: 'Data Science & Machine Learning',
    description: 'Master data science with Python, Pandas, NumPy & Machine Learning',
    category: 'Data',
    instructor_name: 'codebasics',
    thumbnail_url: 'https://i.ytimg.com/vi/ua-CiDNNj30/hqdefault.jpg',
    duration_hours: 50,
    lessons_count: 150,
    rating: 4.7,
    students_count: 1200000,
    level: 'Intermediate',
    external_link: 'https://www.youtube.com/playlist?list=PLeo1K3hjS3us_ELKYSj_Fth2tIEkdKXvV',
    is_free: true,
  },
  {
    id: 'aws-course',
    title: 'AWS Cloud Practitioner - Complete Course',
    description: 'Complete AWS Cloud Practitioner certification preparation',
    category: 'Cloud',
    instructor_name: 'freeCodeCamp',
    thumbnail_url: 'https://i.ytimg.com/vi/SOTamWNgDKc/hqdefault.jpg',
    duration_hours: 25,
    lessons_count: 80,
    rating: 4.6,
    students_count: 900000,
    level: 'Beginner',
    external_link: 'https://www.youtube.com/watch?v=SOTamWNgDKc',
    is_free: true,
  },
  {
    id: 'java-course',
    title: 'Java Programming for Beginners',
    description: 'Core Java concepts with practical examples and OOP',
    category: 'Programming',
    instructor_name: 'Telusko',
    thumbnail_url: 'https://i.ytimg.com/vi/BGTx91t8q50/hqdefault.jpg',
    duration_hours: 35,
    lessons_count: 100,
    rating: 4.5,
    students_count: 3000000,
    level: 'Beginner',
    external_link: 'https://www.youtube.com/playlist?list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5',
    is_free: true,
  },
  {
    id: 'dsa-course',
    title: 'Data Structures & Algorithms in Java',
    description: 'Complete DSA course for coding interviews',
    category: 'Programming',
    instructor_name: 'Kunal Kushwaha',
    thumbnail_url: 'https://i.ytimg.com/vi/rZ41y93P2Qo/hqdefault.jpg',
    duration_hours: 45,
    lessons_count: 90,
    rating: 4.8,
    students_count: 1500000,
    level: 'Intermediate',
    external_link: 'https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ',
    is_free: true,
  },
  {
    id: 'react-course',
    title: 'React JS Complete Tutorial',
    description: 'Learn React from basics to advanced with projects',
    category: 'Web',
    instructor_name: 'Codevolution',
    thumbnail_url: 'https://i.ytimg.com/vi/QFaFIcGhPoM/hqdefault.jpg',
    duration_hours: 30,
    lessons_count: 120,
    rating: 4.7,
    students_count: 2000000,
    level: 'Beginner',
    external_link: 'https://www.youtube.com/playlist?list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3',
    is_free: true,
  },
  {
    id: 'sql-course',
    title: 'SQL for Data Analysis',
    description: 'Master SQL for data analysis and database management',
    category: 'Data',
    instructor_name: 'Alex The Analyst',
    thumbnail_url: 'https://i.ytimg.com/vi/7mz73uXD9DA/hqdefault.jpg',
    duration_hours: 15,
    lessons_count: 50,
    rating: 4.6,
    students_count: 800000,
    level: 'Beginner',
    external_link: 'https://www.youtube.com/playlist?list=PLUaB-1hjhk8H48Pj32z4GZgGWyylqv85f',
    is_free: true,
  },
];

const categoryFilters = ['All', 'Programming', 'Web', 'Data', 'Cloud'];

export function LearnTab() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const { isCourseBookmarked, toggleCourseBookmark } = useJKKNBookmarks();

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
      // Use real courses with YouTube links as fallback
      setCourses(data && data.length > 0 ? data : realCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses(realCourses);
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

  const handleStartLearning = (course: Course) => {
    if (course.external_link) {
      window.open(course.external_link, '_blank');
      toast.success(`Opening "${course.title}" - enjoy learning!`);
    } else {
      toast.error('Course link not available');
    }
  };

  const handleBookmark = (courseId: string, courseTitle: string) => {
    toggleCourseBookmark(courseId);
    if (isCourseBookmarked(courseId)) {
      toast.success('Course removed from bookmarks');
    } else {
      toast.success(`"${courseTitle}" saved to bookmarks`);
    }
  };

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
              {/* Bookmark Button */}
              <button
                onClick={() => handleBookmark(course.id, course.title)}
                className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
              >
                {isCourseBookmarked(course.id) ? (
                  <BookmarkCheck className="w-5 h-5 text-[#2E7D32]" />
                ) : (
                  <Bookmark className="w-5 h-5 text-gray-600" />
                )}
              </button>
              {/* Play Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => handleStartLearning(course)}
              >
                <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-[#2E7D32] ml-1" />
                </div>
              </div>
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
                    {course.students_count >= 1000000 
                      ? `${(course.students_count / 1000000).toFixed(1)}M` 
                      : `${(course.students_count / 1000).toFixed(0)}K`}
                  </span>
                )}
                {course.duration_hours && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration_hours}h
                  </span>
                )}
              </div>

              {/* Course includes */}
              <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Video className="w-3 h-3" />
                  Videos
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Notes
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {course.lessons_count || 'Many'} Lessons
                </span>
              </div>

              <Button
                className="w-full mt-4 bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
                onClick={() => handleStartLearning(course)}
              >
                <Play className="w-4 h-4 mr-2" />
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
