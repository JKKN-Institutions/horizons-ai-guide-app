import { useState, useEffect } from 'react';
import { Search, Star, Users, Clock, ExternalLink, BookOpen, Bookmark, BookmarkCheck, Play, FileText, Video, Code, Database, Cloud, Globe } from 'lucide-react';
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

const categoryConfig: Record<string, { gradient: string; icon: any }> = {
  'Programming': { gradient: 'from-blue-500 to-indigo-600', icon: Code },
  'Web': { gradient: 'from-purple-500 to-pink-600', icon: Globe },
  'Data': { gradient: 'from-emerald-500 to-teal-600', icon: Database },
  'Cloud': { gradient: 'from-orange-500 to-red-600', icon: Cloud },
};

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

const categoryFilters = [
  { name: 'All', icon: BookOpen, gradient: 'from-[#2E7D32] to-[#4CAF50]' },
  { name: 'Programming', icon: Code, gradient: 'from-blue-500 to-indigo-600' },
  { name: 'Web', icon: Globe, gradient: 'from-purple-500 to-pink-600' },
  { name: 'Data', icon: Database, gradient: 'from-emerald-500 to-teal-600' },
  { name: 'Cloud', icon: Cloud, gradient: 'from-orange-500 to-red-600' },
];

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

  const getCategoryConfig = (category: string) => {
    return categoryConfig[category] || { gradient: 'from-gray-500 to-slate-600', icon: BookOpen };
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-24 h-10 rounded-full flex-shrink-0" />
          ))}
        </div>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-64 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-5 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Colorful Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-5 text-white shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-6 h-6" />
            <span className="text-sm font-medium text-white/80">Skill Development</span>
          </div>
          <h2 className="text-2xl font-bold">Learn & Grow</h2>
          <p className="text-sm text-white/80 mt-1">Free courses to boost your career</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 text-white text-center shadow-md">
          <p className="text-2xl font-bold">{courses.length}+</p>
          <p className="text-xs text-blue-100">Courses</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 text-white text-center shadow-md">
          <p className="text-2xl font-bold">{categoryFilters.length - 1}</p>
          <p className="text-xs text-purple-100">Categories</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-3 text-white text-center shadow-md">
          <p className="text-2xl font-bold">100%</p>
          <p className="text-xs text-emerald-100">Free</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-3 rounded-xl border-gray-200 bg-white shadow-sm"
        />
      </div>

      {/* Colorful Filter Chips */}
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
                  ? `bg-gradient-to-r ${filter.gradient} text-white shadow-md scale-105`
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {filter.name}
            </button>
          );
        })}
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500 font-medium">{filteredCourses.length}+ Free Courses</p>

      {/* Course Cards */}
      <div className="grid gap-4">
        {filteredCourses.map((course) => {
          const config = getCategoryConfig(course.category);
          const IconComponent = config.icon;
          
          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              {/* Colorful Top Banner */}
              <div className={`h-2 bg-gradient-to-r ${config.gradient}`} />
              
              {/* Thumbnail */}
              <div className={`relative h-40 bg-gradient-to-br ${config.gradient}`}>
                {course.thumbnail_url ? (
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <IconComponent className="w-16 h-16 text-white/30" />
                  </div>
                )}
                {course.is_free && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-md">
                    FREE
                  </Badge>
                )}
                {course.level && (
                  <Badge className="absolute top-3 right-3 bg-white/90 text-gray-700 shadow-md">
                    {course.level}
                  </Badge>
                )}
                {/* Bookmark Button */}
                <button
                  onClick={() => handleBookmark(course.id, course.title)}
                  className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-md"
                >
                  {isCourseBookmarked(course.id) ? (
                    <BookmarkCheck className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Bookmark className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                {/* Play Icon Overlay */}
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => handleStartLearning(course)}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${config.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                    <Play className="w-7 h-7 text-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 line-clamp-2">{course.title}</h3>
                    {course.instructor_name && (
                      <p className="text-sm text-gray-500 mt-1">{course.instructor_name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  {course.rating && (
                    <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      {course.rating.toFixed(1)}
                    </span>
                  )}
                  {course.students_count && (
                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                      <Users className="w-4 h-4" />
                      {course.students_count >= 1000000 
                        ? `${(course.students_count / 1000000).toFixed(1)}M` 
                        : `${(course.students_count / 1000).toFixed(0)}K`}
                    </span>
                  )}
                  {course.duration_hours && (
                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                      <Clock className="w-4 h-4" />
                      {course.duration_hours}h
                    </span>
                  )}
                </div>

                {/* Course includes */}
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                    <Video className="w-3 h-3" />
                    Videos
                  </span>
                  <span className="flex items-center gap-1 bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
                    <FileText className="w-3 h-3" />
                    Notes
                  </span>
                  <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">
                    <BookOpen className="w-3 h-3" />
                    {course.lessons_count || 'Many'} Lessons
                  </span>
                </div>

                <Button
                  className={`w-full mt-4 bg-gradient-to-r ${config.gradient} hover:opacity-90 text-white shadow-md`}
                  onClick={() => handleStartLearning(course)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Learning
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">No courses found</p>
          <p className="text-gray-400 text-sm mt-1">Try a different category</p>
        </div>
      )}
    </div>
  );
}
