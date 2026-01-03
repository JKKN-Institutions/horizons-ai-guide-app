import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ArrowLeft, 
  Search, 
  Trash2, 
  GraduationCap,
  Clock,
  IndianRupee,
  FileText,
  BookOpen,
  Filter,
  SortAsc,
  X,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useCareerPredictorFavorites } from '@/hooks/useCareerPredictorFavorites';
import { courseDatabase, Course } from '@/data/courseDatabase';

const SavedCourses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { favorites, toggleFavorite, clearAllFavorites, getFavoritesCount } = useCareerPredictorFavorites();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [streamFilter, setStreamFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Get saved courses from database
  const savedCourses = useMemo(() => {
    return courseDatabase.filter(course => favorites.has(course.id));
  }, [favorites]);

  // Apply filters and sorting
  const filteredCourses = useMemo(() => {
    let result = [...savedCourses];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(course =>
        course.name.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        (course.description?.toLowerCase().includes(query))
      );
    }

    // Stream filter
    if (streamFilter !== 'all') {
      result = result.filter(course => course.stream === streamFilter);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'duration':
          return a.duration.localeCompare(b.duration);
        case 'stream':
          return a.stream.localeCompare(b.stream);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return result;
  }, [savedCourses, searchQuery, streamFilter, sortBy]);

  const handleRemoveCourse = (courseId: string, courseName: string) => {
    toggleFavorite(courseId);
    toast({
      title: "Course Removed",
      description: `${courseName} has been removed from your saved courses.`,
    });
  };

  const handleClearAll = () => {
    clearAllFavorites();
    toast({
      title: "All Courses Cleared",
      description: "Your saved courses list has been cleared.",
    });
  };

  const getStreamLabel = (stream: string) => {
    const labels: Record<string, string> = {
      pcm: 'Science (PCM)',
      pcb: 'Science (PCB)',
      pcmb: 'Science (PCMB)',
      commerce: 'Commerce',
      commerce_math: 'Commerce (Math)',
      arts: 'Arts/Humanities',
    };
    return labels[stream] || stream;
  };

  const getStreamColor = (stream: string) => {
    const colors: Record<string, string> = {
      pcm: 'bg-blue-100 text-blue-800',
      pcb: 'bg-green-100 text-green-800',
      pcmb: 'bg-purple-100 text-purple-800',
      commerce: 'bg-amber-100 text-amber-800',
      commerce_math: 'bg-orange-100 text-orange-800',
      arts: 'bg-pink-100 text-pink-800',
    };
    return colors[stream] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                  My Saved Courses
                </h1>
                <p className="text-sm text-muted-foreground">
                  {getFavoritesCount()} course{getFavoritesCount() !== 1 ? 's' : ''} saved
                </p>
              </div>
            </div>
            
            {savedCourses.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear all saved courses?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove all {getFavoritesCount()} saved courses. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearAll} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Clear All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          {/* Search and Filters */}
          {savedCourses.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search saved courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2">
                <Select value={streamFilter} onValueChange={setStreamFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Stream" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Streams</SelectItem>
                    <SelectItem value="pcm">PCM</SelectItem>
                    <SelectItem value="pcb">PCB</SelectItem>
                    <SelectItem value="pcmb">PCMB</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[130px]">
                    <SortAsc className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                    <SelectItem value="stream">Stream</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {savedCourses.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Saved Courses Yet</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Start exploring courses and save your favorites to see them here.
            </p>
            <Button onClick={() => navigate('/career-assessment/ai-predictor')}>
              <Sparkles className="h-4 w-4 mr-2" />
              Explore AI Career Predictor
            </Button>
          </motion.div>
        ) : filteredCourses.length === 0 ? (
          /* No Results */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Courses Found</h2>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters.
            </p>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setStreamFilter('all'); }}>
              Clear Filters
            </Button>
          </motion.div>
        ) : (
          /* Course Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <Badge className={getStreamColor(course.stream)}>
                          {getStreamLabel(course.stream)}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveCourse(course.id, course.name);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div onClick={() => setSelectedCourse(course)}>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {course.name}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {course.description || 'No description available'}
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <IndianRupee className="h-3.5 w-3.5" />
                            <span>{course.feesRange}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground col-span-2">
                            <FileText className="h-3.5 w-3.5" />
                            <span className="truncate">{course.entranceExam}</span>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t">
                          <Badge variant="outline" className="text-xs">
                            {course.category}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Course Details Modal */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          {selectedCourse && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className={`mb-2 ${getStreamColor(selectedCourse.stream)}`}>
                      {getStreamLabel(selectedCourse.stream)}
                    </Badge>
                    <DialogTitle className="text-xl">{selectedCourse.name}</DialogTitle>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                {/* Description */}
                <p className="text-muted-foreground">
                  {selectedCourse.description || 'No description available'}
                </p>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium">{selectedCourse.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <IndianRupee className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Fees/Year</p>
                      <p className="text-sm font-medium">{selectedCourse.feesRange}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg col-span-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Entrance Exam</p>
                      <p className="text-sm font-medium">{selectedCourse.entranceExam}</p>
                    </div>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Eligibility</p>
                  <p className="text-sm font-medium">{selectedCourse.eligibility}</p>
                </div>

                {/* Career Prospects */}
                {selectedCourse.careerProspects && selectedCourse.careerProspects.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      Career Prospects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse.careerProspects.map((career, i) => (
                        <Badge key={i} variant="secondary">{career}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top Colleges */}
                {selectedCourse.topColleges && selectedCourse.topColleges.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Top Colleges
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse.topColleges.map((college, i) => (
                        <Badge key={i} variant="outline">{college}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      handleRemoveCourse(selectedCourse.id, selectedCourse.name);
                      setSelectedCourse(null);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove from Saved
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCourse(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavedCourses;
