import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, GraduationCap, ArrowRight, BookmarkCheck } from 'lucide-react';
import { useCareerPredictorFavorites } from '@/hooks/useCareerPredictorFavorites';
import { courseDatabase } from '@/data/courseDatabase';

const DashboardSavedItems = () => {
  const navigate = useNavigate();
  const { favorites } = useCareerPredictorFavorites();
  
  // Convert Set to Array and get actual course data for favorites
  const favoritesArray = Array.from(favorites);
  const savedCourses = favoritesArray.slice(0, 3).map(courseId => {
    const course = courseDatabase.find(c => c.id === courseId);
    return course || null;
  }).filter(Boolean);

  const getStreamColor = (stream: string) => {
    const colors: Record<string, string> = {
      pcm: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      pcb: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
      pcmb: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      commerce: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
      commerce_math: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
      arts: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
    };
    return colors[stream] || 'bg-muted text-muted-foreground';
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-500" />
          Saved Items
          <span className="text-sm font-normal text-muted-foreground font-tamil ml-auto">
            சேமித்தவை
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {savedCourses.length === 0 ? (
          <div className="text-center py-6">
            <BookmarkCheck className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">
              No saved courses yet
            </p>
            <p className="text-xs text-muted-foreground font-tamil">
              இன்னும் படிப்புகள் சேமிக்கப்படவில்லை
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3"
              onClick={() => navigate('/career-assessment/ai-predictor')}
            >
              Explore Courses
            </Button>
          </div>
        ) : (
          <>
            {/* Saved Courses Preview */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <GraduationCap className="h-4 w-4" />
                Saved Courses ({favoritesArray.length})
              </div>
              {savedCourses.map((course: any) => (
                <div 
                  key={course.id}
                  className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => navigate('/career-assessment/saved-courses')}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{course.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{course.description}</p>
                    </div>
                    <Badge className={`${getStreamColor(course.stream)} text-[10px] shrink-0`}>
                      {course.stream.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/career-assessment/saved-courses')}
            >
              View All Saved Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardSavedItems;
