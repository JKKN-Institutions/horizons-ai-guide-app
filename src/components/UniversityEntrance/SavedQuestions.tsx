import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Bookmark, Trash2, Download, Eye, EyeOff, 
  Filter, BookOpen, ChevronDown, AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { useTNUniversityBookmarks, BookmarkedQuestion } from '@/hooks/useTNUniversityBookmarks';
import { generateBookmarkedPDF } from './generateTNUniversityPDF';
import { toast } from '@/hooks/use-toast';

export const SavedQuestions = () => {
  const navigate = useNavigate();
  const { bookmarks, removeBookmark, clearAllBookmarks, totalBookmarks } = useTNUniversityBookmarks();
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const [filterUniversity, setFilterUniversity] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  // Get unique universities for filter
  const universities = [...new Set(bookmarks.map(b => b.universityName))];
  
  // Filter bookmarks
  const filteredBookmarks = bookmarks.filter(b => {
    if (filterUniversity !== 'all' && b.universityName !== filterUniversity) return false;
    if (filterDifficulty !== 'all' && b.difficulty !== filterDifficulty) return false;
    return true;
  });

  const toggleAnswer = (id: string) => {
    setShowAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRemoveBookmark = (id: string) => {
    removeBookmark(id);
    toast({
      title: 'Bookmark removed',
      description: 'Question removed from saved list',
    });
  };

  const handleDownloadPDF = () => {
    if (filteredBookmarks.length === 0) {
      toast({
        title: 'No questions to export',
        description: 'Save some questions first',
        variant: 'destructive',
      });
      return;
    }
    generateBookmarkedPDF(filteredBookmarks);
    toast({
      title: 'PDF Downloaded',
      description: `${filteredBookmarks.length} questions exported successfully`,
    });
  };

  const handleClearAll = () => {
    clearAllBookmarks();
    toast({
      title: 'All bookmarks cleared',
      description: 'Your saved questions list is now empty',
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500 text-white';
      case 'Medium': return 'bg-amber-500 text-white';
      case 'Hard': return 'bg-red-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/career-assessment/colleges')}
            className="gap-2 -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Badge variant="secondary" className="gap-1">
            <Bookmark className="h-3 w-3" />
            {totalBookmarks} Saved
          </Badge>
        </div>

        {/* Page Title */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#6a0dad] to-[#9333ea] flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Saved Questions
          </h1>
          <p className="text-muted-foreground">
            Your bookmarked PYQs for revision / மறுபரிசீலனைக்கான சேமிக்கப்பட்ட கேள்விகள்
          </p>
        </div>

        {/* Actions Bar */}
        <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Filters */}
              <div className="flex items-center gap-2 flex-1">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filterUniversity} onValueChange={setFilterUniversity}>
                  <SelectTrigger className="w-[140px] h-9">
                    <SelectValue placeholder="University" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Universities</SelectItem>
                    {universities.map(uni => (
                      <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                  <SelectTrigger className="w-[120px] h-9">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDownloadPDF}
                  className="gap-1"
                  disabled={filteredBookmarks.length === 0}
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export PDF</span>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1 text-red-600 hover:text-red-700"
                      disabled={totalBookmarks === 0}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Clear All</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear all bookmarks?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove all {totalBookmarks} saved questions. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearAll} className="bg-red-600 hover:bg-red-700">
                        Clear All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {bookmarks.length === 0 && (
          <Card className="bg-slate-50 dark:bg-slate-900 border-dashed border-2 border-slate-200 dark:border-slate-700 rounded-xl">
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No saved questions yet</h3>
              <p className="text-muted-foreground mb-4">
                Bookmark questions while practicing to save them here for revision
              </p>
              <Button onClick={() => navigate('/tn-university-entrance')} className="bg-[#6a0dad] hover:bg-[#5a0b9d]">
                Browse PYQs
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Filtered Empty State */}
        {bookmarks.length > 0 && filteredBookmarks.length === 0 && (
          <Card className="bg-slate-50 dark:bg-slate-900 rounded-xl">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No questions match your filters</p>
              <Button 
                variant="link" 
                onClick={() => { setFilterUniversity('all'); setFilterDifficulty('all'); }}
              >
                Clear filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Questions List */}
        <div className="space-y-4">
          {filteredBookmarks.map((q, index) => (
            <Card 
              key={q.id} 
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
            >
              <CardContent className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {q.universityName}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {q.courseName}
                    </Badge>
                    <Badge className={getDifficultyColor(q.difficulty)}>
                      {q.difficulty}
                    </Badge>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleRemoveBookmark(q.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Question */}
                <p className="text-foreground font-medium mb-3">
                  <span className="text-[#6a0dad] font-bold">Q{index + 1}.</span> {q.question}
                </p>

                {/* Options */}
                <div className="space-y-2 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = optIdx === q.correctAnswer;
                    const showingAnswer = showAnswers[q.id];

                    return (
                      <div 
                        key={optIdx}
                        className={`p-3 rounded-lg border transition-all ${
                          showingAnswer && isCorrect 
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                            : 'border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <span className="font-semibold text-muted-foreground mr-2">
                          ({String.fromCharCode(97 + optIdx)})
                        </span>
                        <span className={showingAnswer && isCorrect ? 'text-green-700 dark:text-green-400 font-medium' : 'text-foreground'}>
                          {opt}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Toggle Answer Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleAnswer(q.id)}
                  className="w-full gap-2"
                >
                  {showAnswers[q.id] ? (
                    <>
                      <EyeOff className="h-4 w-4" />
                      Hide Answer
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" />
                      Show Answer
                    </>
                  )}
                </Button>

                {/* Explanation */}
                {showAnswers[q.id] && (
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-800 dark:text-green-300">
                      <span className="font-semibold">Answer: </span>
                      ({String.fromCharCode(97 + q.correctAnswer)}) {q.options[q.correctAnswer]}
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-400 mt-2">
                      <span className="font-semibold">Explanation: </span>
                      {q.explanation}
                    </p>
                  </div>
                )}

                {/* Topic Tag */}
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    📌 {q.topic}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
